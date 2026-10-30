'use strict';
// ---------- the journal: where every quest in js/quests.js is, worked out from the save (10/29/2026) ----------
// Nothing about the quests is saved on its own: a step is done when what it says is true in the save, so the journal
// can never disagree with the game. Story progress (the dev tab) goes the other way: it puts the save at a step,
// taking back what comes after it and doing what comes before, then starts the game again from there.
const QUEST = (() => {
  const list = () => (typeof QUESTS !== 'undefined' ? QUESTS : []);
  const byId = id => list().find(q => q.id === id);
  const mains = () => list().filter(q => q.kind === 'main');
  const COUNT = /^([A-Za-z0-9_]+)>=(\d+)$/, KIND = /^(has|learned):(.+)$/;
  // is one word true in this save
  function test(word, w = world) {
    if (word.includes('|')) return word.split('|').some(x => test(x, w));
    let m = COUNT.exec(word); if (m) return (w[m[1]] || 0) >= +m[2];
    m = KIND.exec(word); if (m) return !!(w[m[1]] && w[m[1]][m[2]]);
    return !!w.flags[word];
  }
  const all = (words, w) => (words || []).every(x => test(x, w));
  // make one word true (on) or not (off)
  function put(word, on, w = world) {
    if (word[0] === '-') { if (on) put(word.slice(1), false, w); return; }            // (taking something away only happens going forward)
    if (word.includes('|')) { const alts = word.split('|'); if (on) { if (!alts.some(x => test(x, w))) put(alts[0], true, w); } else alts.forEach(x => put(x, false, w)); return; }
    let m = COUNT.exec(word);
    if (m) { const k = m[1], n = +m[2]; if (on) w[k] = Math.max(w[k] || 0, n); else if ((w[k] || 0) >= n) w[k] = Math.max(0, n - 1); return; }
    m = KIND.exec(word);
    if (m) { const box = w[m[1]] || (w[m[1]] = {}); if (on) box[m[2]] = true; else delete box[m[2]]; return; }
    if (on) w.flags[word] = true; else delete w.flags[word];
  }
  const stepDone = (s, w = world) => all(s.done, w);
  function started(q, w = world) {
    if (q.steps.some(s => stepDone(s, w))) return true;
    if (q.starts) return all(q.starts, w);
    if (q.kind !== 'main') return false;
    const ms = mains(), i = ms.indexOf(q);
    return i <= 0 || isDone(ms[i - 1], w);
  }
  const isDone = (q, w = world) => q.steps.every(s => stepDone(s, w));
  // where a quest is: { state: 'locked' | 'active' | 'done', at: the first step not done, done: how many are }
  function status(q, w = world) {
    if (typeof q === 'string') q = byId(q);
    const done = q.steps.filter(s => stepDone(s, w)).length;
    const at = q.steps.findIndex(s => !stepDone(s, w));
    return { state: at < 0 ? 'done' : started(q, w) ? 'active' : 'locked', at, done, of: q.steps.length };
  }
  // ---- Story progress: put the save at step n of a quest (n = the number of steps: all of it done, -1: not started) ----
  // For the main story that's everything in order: every main quest before it done, every one after it not. A side
  // quest or a contract only changes itself
  function undoStep(s, w) { for (const x of (s.also || []).slice().reverse()) if (x[0] !== '-') put(x, false, w); for (const x of s.done.slice().reverse()) put(x, false, w); }
  function doStep(s, w) { for (const x of s.done) put(x, true, w); for (const x of s.also || []) put(x, true, w); }
  function setTo(id, n, w = world) {
    const q = byId(id); if (!q) return null;
    const chain = q.kind === 'main' ? mains() : [q];
    const qi = chain.indexOf(q);
    const seq = [];                                                                      // every step in order, and which quest it's in
    chain.forEach((c, ci) => c.steps.forEach((s, si) => seq.push({ c, ci, s, si })));
    const cut = seq.findIndex(x => x.ci === qi && x.si === Math.max(0, n));
    const upto = n >= q.steps.length ? seq.findIndex(x => x.ci > qi) : cut;             // (all of it done: up to the next quest)
    const stop = upto < 0 ? seq.length : upto;
    // take back everything from there on (last first), and the starts of the quests after it, then do everything before
    for (let i = seq.length - 1; i >= stop; i--) undoStep(seq[i].s, w);
    chain.forEach((c, ci) => { if (ci > qi || (ci === qi && n < 0)) (c.starts || []).forEach(x => put(x, false, w)); });
    chain.forEach((c, ci) => { if (ci < qi || (ci === qi && n >= 0)) (c.starts || []).forEach(x => put(x, true, w)); });
    for (let i = 0; i < stop; i++) doStep(seq[i].s, w);
    if (typeof AFTER_SEEN !== 'undefined') for (const f in AFTER_SEEN) if (!w.flags[f]) delete w.learned[AFTER_SEEN[f]];   // (a move that came from a lesson goes with it)
    if (typeof AFTER_HAS !== 'undefined') for (const k in AFTER_HAS) if (!w.has[k]) delete w.learned[AFTER_HAS[k]];
    if (!test('tockMet>=3', w)) w.tockSpots = {};                                        // (Tock comes back to be found again)
    const s = q.steps[Math.min(Math.max(0, n), q.steps.length - 1)];
    return n >= q.steps.length ? null : s.room || (n < 0 && q.steps[0].room) || null;  // where to put him
  }
  // Story progress, from the dev tab: change the save, put him where the step happens, and start again from there
  function jump(id, n) {
    const where = setTo(id, n);
    if (typeof settleWorld === 'function') settleWorld(world);
    const ok = where && Object.prototype.hasOwnProperty.call(window.ROOM_FILES || {}, where);
    world.room = ok ? where : (room ? room.id : world.room); world.door = '@area';
    if (typeof foesAllBack === 'function') foesAllBack();
    P.story = null; P.pinned = null; P.ko = 0; P.respawnT = 0; P.health = Math.max(P.health || 0, 1);
    if (typeof cutscene !== 'undefined') cutscene = null;
    if (typeof scene !== 'undefined') scene = null;
    trans.state = 'none';
    saveWorld(); startGame();
  }
  // where the main story is right now: the first main quest that's going and the step it's on
  function story(w = world) {
    for (const q of mains()) { const s = status(q, w); if (s.state === 'active') return { q, n: s.at }; }
    const ms = mains(), last = ms[ms.length - 1];
    return last && isDone(last, w) ? { q: last, n: last.steps.length } : { q: ms[0], n: 0 };
  }
  return { list, byId, mains, test, put, status, setTo, jump, story, isDone, started };
})();
