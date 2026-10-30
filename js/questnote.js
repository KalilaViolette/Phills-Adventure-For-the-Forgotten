'use strict';
// ---------- notes from his journal (10/30/2026) ----------
// When a quest shows up in his journal, a step of one gets done, or a whole one's finished, a little note slides in
// at the top of the screen for a few seconds, so the player knows the journal changed without having to look:
//   New in his journal: The beetle's work
//   The beetle's work: Have the beetle stain his sword with it      (the step he's on now)
//   Done: What the Warren needs
// It works it out from the save the same way the journal does (js/questlog.js), a few times a second, and waits for
// scenes, talking and windows to be over. Loading a save and Story progress jumps don't make notes.
const questNote = window.questNote = (() => {
  const api = { queue: [], shown: null };
  const stage = document.getElementById('stage');
  const root = document.createElement('div'); root.id = 'questnote'; root.setAttribute('role', 'status'); root.setAttribute('aria-live', 'polite');
  root.innerHTML = '<div class="qn-panel"><span class="qn-head"></span><span class="qn-text"></span></div>';
  stage.appendChild(root);
  let snap = null, snapWorld = null, tick = 0, showT = 0;
  const SHOW = 3.4;
  function take(w) {
    const out = {};
    for (const q of QUEST.list()) { const st = QUEST.status(q, w); out[q.id] = { state: st.state, done: st.done, at: st.at }; }
    return out;
  }
  function quiet() { snap = null; }                                                   // (start again from what's there now, without notes)
  function compare() {
    if (snapWorld !== world) { snapWorld = world; snap = null; }                        // a save loaded: start again
    const now = take(world);
    if (!snap) { snap = now; return; }
    for (const q of QUEST.list()) {
      const a = snap[q.id], b = now[q.id]; if (!a || !b) continue;
      if (b.state === 'done' && a.state !== 'done') api.queue.push(['Done:', q.title]);
      else if (b.state === 'active' && a.state === 'locked') api.queue.push(['New in his journal:', q.title]);
      else if (b.state === 'active' && b.done > a.done && b.at >= 0) api.queue.push([q.title + ':', q.steps[b.at].text]);
    }
    snap = now;
  }
  const busy = () => (typeof scene !== 'undefined' && scene) || (typeof talk !== 'undefined' && talk) || (typeof cutscene !== 'undefined' && cutscene)
    || (window.itemCard && (itemCard.open || itemCard.pending > 0)) || (window.pauseMenu && pauseMenu.open) || (typeof mapView !== 'undefined' && mapView) || paused;
  function place() {
    const dpr = window.devicePixelRatio || 1;
    root.style.setProperty('--gx', offX / dpr + 'px'); root.style.setProperty('--gy', offY / dpr + 'px');
    root.style.setProperty('--gw', VW * S / dpr + 'px'); root.style.setProperty('--gh', VH * S / dpr + 'px');
  }
  function show(n) {
    root.querySelector('.qn-head').textContent = n[0]; root.querySelector('.qn-text').textContent = n[1];
    api.shown = n; showT = SHOW; place(); root.classList.add('on');
    if (sfx.paper) sfx.paper();
  }
  // every frame the game's going (main.js calls checkEvents through update)
  function update(dt) {
    if (typeof QUEST === 'undefined' || !started || !room) return;
    if (showT > 0) { showT -= dt; if (showT <= 0) { root.classList.remove('on'); api.shown = null; } }
    if ((tick += dt) < 0.25) return;
    tick = 0;
    compare();
    if (!api.shown && api.queue.length && !busy()) show(api.queue.shift());
  }
  api.update = update; api.quiet = quiet; api.compare = compare;
  return api;
})();
const _checkEventsNote = checkEvents;
checkEvents = dt => { _checkEventsNote(dt); questNote.update(dt); };
// Story progress (the dev tab) changes a lot at once: that's not news
const _questJump = QUEST.jump;
QUEST.jump = (id, n) => { _questJump(id, n); questNote.queue.length = 0; questNote.quiet(); };
