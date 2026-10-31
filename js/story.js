'use strict';
// ---------- little story moments, items, hints, and the room's own things (the ball) ----------
// Phill can't talk. He shows what he's thinking: he shakes his head, nods, and a thought bubble shows what he wants.
let cutscene = null;            // full-screen moments (for now just the "comes next" card for rooms that aren't built yet)
const itemPops = [];            // items flying up over his head as he picks them up
let bubble = null;              // his thought bubble: { ids, t, dur }
const STORY_TIME = { wake: 3.0, sit: 0.6, reach: 0.34, shake: 1.15, nod: 0.75, watch: 2.0 };
// waking up in his room: eyes open (a blink), groggy, lifts his head, sits up still groggy, sits, a big stretch and a
// yawn, rubs his eye, up (curled up asleep now, 10/16/2026)
const WAKE_STEPS = [[0.15, 'lie_open'], [0.25, 'lie_1'], [0.45, 'lie_open'], [0.75, 'lie_bleary'], [0.95, 'wake_lift'], [1.25, 'wake_up'], [1.45, 'sit_3'],
  [2.05, 'stretch'], [2.25, 'stretch_down'], [2.35, 'rub_1'], [2.45, 'rub_2'], [2.55, 'rub_1'], [2.65, 'rub_2'], [2.8, 'sit_3'], [2.92, 'sit_1'], [3.0, 'turn']];

function startStory(kind, extra) {
  P.story = Object.assign({ kind, t: 0 }, extra || {});
  P.atk = null; P.charge = 0; P.roll = 0; P.dash = 0;
  if (kind === 'shake') sfx.nope();
}
function updateStory(dt) {
  const s = P.story;
  if (!s) return;
  s.t += dt;
  switch (s.kind) {
    case 'sleep':                                       // asleep on his pillow until you press something
      if (Math.floor((s.t - dt) / 1.1) !== Math.floor(s.t / 1.1)) popup(P.x + 10, P.y - 30, 'z', '#cfe0ff');
      if (inp.any && s.t > 0.3) { startStory('wake'); sfx.squeak(); }
      break;
    case 'wake':
      if (!s.yawned && s.t >= 1.5) { s.yawned = true; sfx.yawn(); }
      if (s.t >= STORY_TIME.wake) { P.story = null; puff(P.x, P.y, 4, 25); }
      break;
    case 'sit': if (s.t >= STORY_TIME.sit) { P.story = null; puff(P.x, P.y, 4, 25); } break;
    case 'reach':
      if (!s.taken && s.t >= 0.16) { s.taken = true; takeItem(s.item); }
      if (s.t >= STORY_TIME.reach) {
        P.story = null;
        if (s.opened) startStory('nod');
      }
      break;
    case 'watch': {                                      // the ball rolls by under the bookcase, and he gets an idea
      const b = room.ball;
      if (b) P.facing = b.x > P.x ? 1 : -1;
      if (!s.lit && s.t >= 1.15) {
        s.lit = true; world.learned.roll = true; world.flags.watchedBall = true; saveWorld();
        popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); twinkle(P.x, P.y - 46, 8);
      }
      if (s.t >= STORY_TIME.watch) P.story = null;
      break;
    }
    case 'scene': break;                                 // a cutscene decides when it's over
    default: if (s.t >= (STORY_TIME[s.kind] || 0.5)) P.story = null;
  }
}
function storyFrame(f) {
  const s = P.story;
  switch (s.kind) {
    case 'sleep': return (Math.floor(s.t / 1.3) % 2 ? 'lie_2_' : 'lie_1_') + f;             // breathing slow
    case 'wake': { const st = WAKE_STEPS.find(w => s.t < w[0]) || WAKE_STEPS[WAKE_STEPS.length - 1]; return st[1] === 'turn' ? 'turn' : st[1] + '_' + f; }
    case 'sit': return 'sit_' + f;
    case 'reach': return 'reach_' + f;
    case 'shake': return s.t < 0.12 || s.t > 0.95 ? 'idle_1_' + f : `shake_${Math.floor((s.t - 0.12) / 0.13) % 2 + 1}_${f}`;
    case 'nod': return (Math.floor(s.t / 0.17) % 2 ? 'look_down_' : 'idle_1_') + f;
    case 'watch': return (s.lit ? 'look_up_' : 'idle_1_') + f;
    case 'scene': return !s.frame ? null : /_[RL]$/.test(s.frame) || s.frame === 'turn' ? s.frame : s.frame + '_' + f;
  }
  return null;
}

// ---------- items ----------
const ITEM_CELL = { backpack: 0, paper: 1, crayons: 2, gear: 3, ball: 4 };
const RW_ITEM = { crayon_black: 0, crayon_rootwood: 1, acorn: 2, memory_balloon: 3, cotton: 8 };   // Rootwood's item sheet (the pins sit in 4..7, drawn from the pin sheet)
const POND_ITEM = { crayon_pond: 0, pebble: 1, memory_bucket: 2, cotton: 3 };                    // the Pond's item sheet
const PG_ITEM = { crayon_playground: 0, marble: 1, memory_wand: 2, cotton: 3, raincoat: 4 };        // the Playground's
const OAK_ITEM = { crayon_oak: 0, feather: 1, memory_page: 2, cotton: 3, sneaker: 4, cape: 5 };                // the Old Oak's
const REGION_ITEMS = { rootwood: RW_ITEM, pond: POND_ITEM, playground: PG_ITEM, oak: OAK_ITEM };
const itemCell = it => ITEM_CELL[it.id] ?? (REGION_ITEMS[room && room.def.region] || RW_ITEM)[it.id] ?? (REGION_ITEMS[room && room.def.region] || RW_ITEM)[it.kind] ?? 0;
const ITEM_OUT = { backpack: 5, paper: 6, crayons: 7, gear: 8 };
function takeItem(it) {
  world.has[it.id] = true; saveWorld();
  it.got = 2;
  if (it.kind === 'acorn') { gainAcorns(1); twinkle(it.x, it.y - 6, 4, '#e8c080'); return; }
  if (it.kind === 'pebble') { gainCoin('pebbles', 1); twinkle(it.x, it.y - 6, 4, '#c8ccc0'); return; }
  if (it.kind === 'marble') { gainCoin('marbles', 1); twinkle(it.x, it.y - 6, 4, '#8ac0f0'); return; }
  if (it.kind === 'feather') { gainCoin('feathers', 1); twinkle(it.x, it.y - 6, 4, '#b0a0e0'); return; }
  if (it.kind === 'pin') { world.pins = world.pins || {}; world.pins[it.pin] = true; saveWorld(); sfx.pickup(); twinkle(it.x, it.y - 10, 10); popup(P.x, P.y - 54, 'found the ' + PINS[it.pin].name, '#e8e6f0', true); return; }
  itemPops.push({ id: it.id, kind: it.kind, x: it.x, y: it.y - 10, t: 0 });   // kind too, so a tuft of cotton floats up as cotton and not as the sheet's first cell
  sfx.pickup(); twinkle(it.x, it.y - 10, 10);
  if (it.id === 'gear') { useSheets('gear'); if (world.flags.lostGear) popup(P.x, P.y - 54, 'his sword and shield. right where they fell', '#e8e6f0', true); }   // sword and shield in hand from now on
  const before = room.gates.map(g => g.open);
  applyGates(room);
  if (room.gates.some((g, i) => g.open && !before[i])) { if (P.story) P.story.opened = true; else startStory('nod'); setTimeout(() => sfx.open(), 250); }
  if (bubble) bubble.ids = bubble.ids.filter(id => id !== it.id);
  if (it.id === 'crayon_black') setTimeout(() => { if (SCENES.blackCrayon) playScene(SCENES.blackCrayon()); }, 380);
  if (it.id === 'gall') { popup(P.x, P.y - 54, 'an old oak gall', '#c8a878', true); setTimeout(() => sfx.idea(), 200); }   // (the beetle can make stain from it: js/sword.js)
  if (it.id === 'crayon_rootwood') { popup(P.x, P.y - 54, 'the green crayon', '#8fd88a', true); setTimeout(() => sfx.idea(), 200); }
  if (it.id === 'memory_balloon') setTimeout(() => { if (SCENES.memory) playScene(SCENES.memory(it)); }, 380);
  if (it.id === 'crayon_pond') { popup(P.x, P.y - 54, 'the blue crayon', '#7aa8f0', true); setTimeout(() => sfx.idea(), 200); }
  if (it.kind === 'cotton') setTimeout(() => addCotton(), 380);
  if (it.id === 'memory_bucket') setTimeout(() => { if (SCENES.memoryBucket) playScene(SCENES.memoryBucket(it)); }, 380);
  if (it.id === 'memory_wand') setTimeout(() => { if (SCENES.memoryWand) playScene(SCENES.memoryWand(it)); }, 380);
  if (it.id === 'crayon_playground') { popup(P.x, P.y - 54, 'the orange crayon', '#f0a060', true); setTimeout(() => sfx.idea(), 200); }
  if (it.kind === 'raincoat') setTimeout(() => { if (SCENES.raincoat) playScene(SCENES.raincoat(it)); }, 380);
  if (it.id === 'crayon_oak') { popup(P.x, P.y - 54, 'the brown crayon', '#c89060', true); setTimeout(() => sfx.idea(), 200); }
  if (it.kind === 'sneaker') setTimeout(() => { if (SCENES.sneaker) playScene(SCENES.sneaker(it)); }, 380);
  if (it.kind === 'cape') setTimeout(() => { if (SCENES.cape) playScene(SCENES.cape(it)); }, 380);
  if (it.id === 'memory_page') setTimeout(() => { if (SCENES.memoryPage) playScene(SCENES.memoryPage(it)); }, 380);
}
function checkItems() {
  for (const it of room.items) if (it.hidden && world.flags[it.after]) { it.hidden = false; twinkle(it.x, it.y - 10, 10); }   // the fight's over: there it is
  if (P.story || P.ko > 0 || P.hang || P.roll > 0) return;
  for (const it of room.items) {
    if (it.got || it.hidden) continue;
    if (Math.abs(P.x - it.x) < 14 && P.y > it.y - 24 && P.y - P.h < it.y + 2) {
      if (it.kind === 'acorn' || it.kind === 'pebble' || it.kind === 'marble' || it.kind === 'feather' || it.kind === 'seed' || it.kind === 'sprinkle') { it.got = 1; takeItem(it); continue; }   // acorns, pebbles and marbles he just scoops up as he goes
      if (P.swim) { it.got = 1; takeItem(it); return; }                                    // swimming: he just grabs it
      if (P.crawl) { it.got = 1; takeItem(it); return; }   // under something low: he just grabs it and keeps crawling
      P.facing = Math.sign(it.x - P.x) || P.facing; P.vx = 0;
      it.got = 1; startStory('reach', { item: it });
      return;
    }
  }
}

// ---------- room events ----------
function checkEvents(dt) {
  for (const e of room.events) {
    const inside = P.x > e.l && P.x < e.r && P.y > e.t && P.y <= e.b + 1;
    if (e.kind === 'snap' && !e.cawed && P.x < e.r && P.y > e.b + 30) crowNotices(e);   // went off the end without snapping it: it still hears him
    if (!inside) { e.inside = false; continue; }
    const entered = !e.inside; e.inside = true;
    if (P.story || P.ko > 0) continue;
    if (e.kind === 'refuse' && entered && !hasAll(e.need)) {
      // he won't go without his things: shakes his head, and thinks about what he's missing
      P.vx = 0; P.facing = -1;
      startStory('shake');
      bubble = { ids: e.need.filter(id => !world.has[id]), t: 0, dur: 2.6 };
    } else if (e.kind === 'ball' && !world.learned[e.learn] && !e.done) {
      e.done = true; P.vx = 0;
      room.ball = { x: e.ballFrom, y: e.ballY - 7, vx: 235, vy: 0, r: 7, spin: 0, fric: 60 };   // slow enough to watch it go by
      startStory('watch');
    } else if (e.kind === 'scene' && entered && !world.flags[e.flag] && SCENES[e.name]) {   // a cutscene that plays once
      world.flags[e.flag] = true; saveWorld();
      const sc = SCENES[e.name](room.def); if (sc) playScene(sc);
    } else if (e.kind === 'rustle' && entered) {                 // falling through leaves
      sfx.rustle(1.2); for (let i = 0; i < 10; i++) part(P.x + (Math.random() * 2 - 1) * 20, P.y - 20 + Math.random() * 20, (Math.random() * 2 - 1) * 60, -Math.random() * 80, 0.9, ['#3f8a48', '#5aa84a', '#2f6a3a'][i % 3], 2, 160);
    } else if (e.kind === 'snap' && !e.done && P.ground) {       // the thin end of the branch gives way under him
      snapBranch(e);
    } else if (e.kind === 'flag' && !world.flags[e.flag] && (!e.need || world.learned[e.need] || world.has[e.need])) {
      world.flags[e.flag] = true; saveWorld();
    }
  }
}
// things a room sets up when he walks in, based on what's already happened
function setupRoomThings() {
  for (const e of room.events) {
    if (e.kind === 'ball' && world.learned[e.learn]) room.ball = { x: e.ballTo, y: e.ballY - 7, vx: 0, vy: 0, r: 7, spin: 0 };
    if (e.kind === 'snap' && e.flag && world.flags[e.flag]) {        // a branch end that already broke off stays broken
      const [x0, y0, x1, y1] = e.tiles;
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) room.map[y * room.W + x] = 0;
      e.done = true; e.cawed = true;
    }
  }
}

// ---------- the ball: rolls, bounces, gets pushed around ----------
function updateBall(dt) {
  const b = room.ball;
  if (!b) return;
  const hit = () => boxSolid(b.x - b.r, b.y - b.r, b.x + b.r, b.y + b.r);
  b.vy = Math.min(b.vy + 900 * dt, 520);
  b.x += b.vx * dt;
  if (hit()) { b.x -= b.vx * dt; if (Math.abs(b.vx) > 50) sfx.bump(); b.vx = -b.vx * 0.55; }
  b.y += b.vy * dt;
  if (hit()) {
    b.y -= b.vy * dt;
    if (b.vy > 0) { if (b.vy > 140) sfx.bump(); b.vy = Math.abs(b.vy) < 90 ? 0 : -b.vy * 0.45; }
    else b.vy = 0;
  }
  const onGround = boxSolid(b.x - b.r + 2, b.y + b.r, b.x + b.r - 2, b.y + b.r + 1);
  if (onGround) b.vx -= Math.sign(b.vx) * Math.min(Math.abs(b.vx), (b.fric || 110) * dt);
  if (b.fric && Math.abs(b.vx) < 1) b.fric = 0;
  b.spin += b.vx * dt / b.r;
  // he can nudge it along by walking into it
  const me = { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y };
  if (!P.story && overlap(me, { l: b.x - b.r, r: b.x + b.r, t: b.y - b.r, b: b.y + b.r })) {
    const dir = b.x >= P.x ? 1 : -1;
    b.vx = dir * Math.max(Math.abs(b.vx), Math.abs(P.vx) * 1.3 + 30);
    if (P.roll > 0) { b.vx = dir * 360; b.vy = -120; }
  }
}

// ---------- hints on the wall ----------
const flagged = id => !!(world.has[id] || world.learned[id] || world.flags[id]);
// a move he's learned but hasn't tried yet keeps its note till he does (the teaching audit, 10/18/2026): the note the
// lesson put up went with the room, so walking out before trying it lost it for good. Every room he walks into puts it
// back, over him, until he's done it once
const PRACTICE = [
  { learned: 'charge', done: 'chargedOnce', text: 'hold {atk} to wind up. let go when it flashes' },
  { learned: 'rollslash', done: 'bigSwingOnce', text: '{dodge} to roll, then {atk} out of it: the big swing' },
  { learned: 'airdodge', done: 'airDodgedOnce', text: '{jump}, then {dodge} in the air to dart across' },
  { learned: 'spin', done: 'spunOnce', text: '{spin}: spin. it turns cranks' },
  { learned: 'burst', done: 'burstOnce', text: '{down} + {squeak}: fluff burst. it blows sand away' },
];
// what he knows, for the Controls lists (the teaching audit, 10/18/2026): each move once he has it, how to do it and
// what it's for. {names} turn into the keyboard's or the controller's buttons
const KNOWN_MOVES = [
  { has: () => world.has.gear, name: 'Parry', how: 'tap {guard} right as a hit gets to him', what: 'knocks it off balance: an opening' },
  { has: () => world.has.gear, name: 'Bounce', how: '{down} + {atk} in the air', what: 'bounces off whatever is under him' },
  { has: () => world.has.gear, name: 'Win fluff back', how: 'hit back while fluff is loose', what: 'three hits wins a puff back, before it settles. resting sews him up' },
  { has: () => can('bash'), name: 'Shield bash', how: '{bash}', what: 'shoves the shield out in front of him. pushes things back to make room' },   // (once he's sure of his sword and shield: swordSkill, js/player.js)
  { has: () => world.has.gear && (world.swordSkill || 0) >= 3, name: 'Shield swings', how: '{atk} five times in a row', what: 'after the whirl, the shield and a low cut, then the shield up and the sword down. the last one hits hard' },
  { has: () => can('charge'), name: 'Wind up', how: 'hold {atk}, let go when it flashes', what: 'a big swing. hits harder and breaks hard things' },
  { has: () => can('rollSlash'), name: 'Big swing', how: '{dodge} to roll, then {atk}', what: 'swings as he goes' },
  { has: () => can('airDodge'), name: 'Air dodge', how: '{dodge} in the air', what: 'darts across. once a jump' },
  { has: () => can('squeak'), name: 'Squeak', how: '{squeak}', what: 'gives them a fright: a moment to hit them. pops foam and balloons' },
  { has: () => can('spin'), name: 'Spin', how: '{spin}', what: 'whirls the sword round him. turns cranks, shreds webs' },
  { has: () => can('burst'), name: 'Fluff burst', how: '{down} + {squeak}', what: 'knocks things off him and clears shots. blows sand and leaves away' },
  { has: () => can('spark'), name: 'Static spark', how: '{spark}, with {up} or {down} to aim', what: 'a crackle of static for things out of reach. cuts bramble' },
  { has: () => can('flop'), name: 'Belly flop', how: '{down} + {jump} in the air', what: 'drops him hard: knocks back what is round him, breaks crusts. flat for a moment after' },
  { has: () => can('glide'), name: 'Glide', how: 'hold {jump} falling', what: 'the cape slows him down' },
  { has: () => can('velcro'), name: 'Velcro grip', how: 'jump at rough bark', what: 'clings on. {jump} to jump off' },
  { has: () => can('swim'), name: 'Swim', how: '{up} and {down} in deep water', what: '{jump} at the top to climb out' },
];
const knownMoves = dev => KNOWN_MOVES.filter(m => { try { return m.has(); } catch (e) { return false; } })
  .map(m => ({ name: m.name, how: m.how.replace(/\{(\w+)\}/g, (x, a) => BTN_NAMES[dev][a] || a), what: m.what.replace(/\{(\w+)\}/g, (x, a) => BTN_NAMES[dev][a] || a) }));
let knownSig = '';
function refreshKnown() {                                                           // the list under the game, kept up with what he's learned
  const el = document.querySelector('#bar .keys'); if (!el) return;
  const list = knownMoves(device || 'key'), sig = (device || 'key') + list.map(m => m.name).join();
  if (sig === knownSig) return; knownSig = sig;
  el.querySelectorAll('.known').forEach(n => n.remove());
  for (const m of list) { const s = document.createElement('span'); s.className = 'known'; s.innerHTML = `<b>${m.name}</b> ${m.how}: ${m.what}`; el.appendChild(s); }
}
setInterval(refreshKnown, 1000);
function practiceHints(r) {
  for (const p of PRACTICE) if (world.learned[p.learned] && !world.flags[p.done]) r.hints.push({ text: p.text, l: 0, t: 0, r: r.pxW, b: r.pxH + 40, follow: true, a: 0, until: p.done, practice: true });
}
function updateHints(dt) {
  for (const h of room.hints) {
    if (h.sit) { h.a = Math.max(0, Math.min(1, h.a + (h.show ? 3 : -3) * dt)); continue; }   // the note over him while he sits at a resting spot
    if (h.life !== undefined && h.a > 0) h.life -= dt;                                  // (a note that's only up a few seconds once it shows. It waited on a flag nothing ever set, so they never went: 10/18/2026)
    const on = (h.life === undefined || h.life > 0) && (!h.after || flagged(h.after)) && (!h.until || !flagged(h.until)) && (!h.untilDone || !flagged(h.untilDone)) && (!P.story || P.story.free)   // a free scene (like the frog waiting for him to try the squeak) still shows its notes: that one never showed (a friend's playtest, 10/14/2026)
      && P.x > h.l && P.x < h.r && P.y > h.t && P.y <= h.b + 1;
    h.a = Math.max(0, Math.min(1, h.a + (on ? 3 : -3) * dt));
  }
}

// ---------- the card for a room that isn't built yet ----------
function showCard(def) {
  cutscene = { kind: 'card', lines: def.card, back: def.backTo.split(':'), prompt: def.prompt, t: 0 };
}
function updateCutscene(dt, jump) {
  cutscene.t += dt;
  if (cutscene.t > 0.7 && jump) { const [id, door] = cutscene.back; cutscene = null; goTo(id, door); }
}

// the thin end of the branch gives way under him
function snapBranch(e) {
  e = e || room.events.find(ev => ev.kind === 'snap');
  if (!e || e.done) return;
  e.done = true;
  if (e.flag) { world.flags[e.flag] = true; saveWorld(); }
  const [x0, y0, x1, y1] = e.tiles;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) room.map[y * room.W + x] = 0;
  sfx.snap(); shakeT = 0.2; shakeA = 2; P.ground = false; P.vy = 40;
  if (actors.twig) Object.assign(actors.twig, { vx: -20, vy: 30, spin: -1.5 });   // the broken end falls away with him
  for (let i = 0; i < 16; i++) part(x0 * T + Math.random() * (x1 - x0 + 1) * T, y0 * T + 4, (Math.random() * 2 - 1) * 60, -Math.random() * 60, 1.2, ['#553824', '#6e4a30', '#3f8a48'][i % 3], 2, 300);
  crowNotices();
}
// the crow hears him go: turns around and caws, too late
function crowNotices(e) {
  for (const ev of room.events) if (ev.kind === 'snap') ev.cawed = true;
  const c = actors.crow;
  if (!c || c.noticed) return;
  c.noticed = true; c.anim = null; c.frame = 'caw'; c.flip = true;
  setTimeout(() => sfx.caw(), 120);
}

// ---------- walls that break (and the ones that only open from the other side) ----------
function hitBreaks(box, a) {
  for (const b of room.breaks) {
    if (b.broken || a.hit.has(b)) continue;
    const r = { l: b.x0 * T, r: (b.x1 + 1) * T, t: b.y0 * T, b: (b.y1 + 1) * T };
    if (!overlap(box, r)) continue;
    a.hit.add(b); a.stopLunge = true;
    const sx = P.facing > 0 ? r.l : r.r, sy = Math.max(r.t + 4, Math.min(r.b - 4, P.y - 22));
    const wrongSide = b.oneway && (b.oneway === 'right' ? P.x < r.r : P.x > r.l);
    if (wrongSide || (b.need === 'charged' && !isCharged(a.type)) || b.need === 'squeak' || b.need === 'burst' || b.need === 'spin' || b.need === 'spark' || b.need === 'flop') {
      if (b.need === 'squeak' || b.need === 'spin') { for (let i = 0; i < 6; i++) part(sx, sy, -P.facing * Math.random() * 60, -Math.random() * 60, 0.5, b.need === 'spin' ? '#e8e4d8' : '#c8bcd8', 2, 200); sfx.splort(); }   // the sword just sinks in
      else { spark(sx, sy); sfx.tink(); P.recoilT = 0.1; P.recoilV = -P.facing * 200; }
      if (!b.told || b.told < performance.now()) {
        popup(P.x, P.y - 54, wrongSide ? "won't budge from this side" : b.need === 'squeak' ? (can('squeak') ? 'pop it. {squeak}: squeak' : b.look === 'balloons' ? 'they bounce right off the sword' : 'the sword just sinks into it') : b.need === 'burst' ? (can('burst') ? 'blow it away. {down} + {squeak}' : b.look === 'leaves' ? 'the leaves just settle back in' : 'the sand just pours back in') : b.need === 'spin' ? (can('spin') ? 'shred it. {spin}: spin' : 'the sword just sticks in the web') : b.need === 'spark' ? (can('spark') ? 'the thorns tangle the sword. zap it. {spark}: static spark' : 'the thorns tangle the sword. nothing he has cuts bramble. not yet') : b.need === 'flop' ? (can('flop') ? 'the sword skids off it. drop on it. {down} + {jump} in the air' : 'hard as glass. the sword just skids off it') : 'too hard. it needs everything he has', '#cfd6e6');
        b.told = performance.now() + 2500;
      }
      continue;
    }
    b.hp--; b.shake = 0.2; spark(sx, sy); sfx.crumble(); shakeT = 0.08; shakeA = 1.5;
    for (let i = 0; i < 8; i++) part(sx, sy, -P.facing * Math.random() * 120, -Math.random() * 120, 0.6, ['#4a3220', '#2a1c12', '#6e4a30'][i % 3], 2, 400);
    if (b.hp <= 0) breakOpen(b);
  }
  // a gate he's hitting from the side it doesn't open from
  for (const g of room.gates) {
    if (g.open || !g.oneway || a.hit.has(g)) continue;
    const r = { l: g.x0 * T, r: (g.x1 + 1) * T, t: g.y0 * T, b: (g.y1 + 1) * T };
    if (!overlap(box, r)) continue;
    a.hit.add(g); spark(P.facing > 0 ? r.l : r.r, P.y - 22); sfx.tink(); P.recoilT = 0.1; P.recoilV = -P.facing * 200;
    popup(P.x, P.y - 54, "won't budge from this side", '#cfd6e6');
  }
}
function breakOpen(b) {
  b.broken = true;
  for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) room.map[y * room.W + x] = 0;
  world.flags[b.flag || b.id] = true; saveWorld();
  const foam = b.look === 'foam' || b.look === 'balloons';
  shakeT = 0.25; shakeA = foam ? 1.5 : 3; if (foam) { sfx.pop(); setTimeout(() => sfx.pop(), 70); } else { sfx.crumble(); sfx.thud(); }
  const cols = b.look === 'balloons' ? ['#e04a5a', '#4a8ae0', '#e8c84a', '#2c1c3c'] : foam ? ['#e0d8ea', '#b8aac8', '#8a7a9e', '#4a3462'] : b.look === 'mud' ? ['#4c3b2a', '#30241a', '#5c4934', '#3e2f22'] : b.look === 'sand' ? ['#c4a674', '#dcc08a', '#a88c60', '#ecd6a4'] : b.look === 'web' ? ['#f4f0e8', '#d8d4cc', '#b8b4ac', '#2c1c3c'] : b.look === 'leaves' ? ['#8a5a2a', '#c08a3a', '#6a4a1a', '#d8a850'] : b.look === 'rot' ? ['#5a4a30', '#8a7a5a', '#3a2a1a', '#a89a78'] : ['#4a3220', '#2a1c12', '#6e4a30', '#3a2618'];
  for (let i = 0; i < 40; i++) part((b.x0 + Math.random() * (b.x1 - b.x0 + 1)) * T, (b.y0 + Math.random() * (b.y1 - b.y0 + 1)) * T, (Math.random() * 2 - 1) * 140, -Math.random() * 160, 0.9, cols[i % 4], 2, foam ? 120 : 500);
  applyGates(room);
}

// ---------- someone to talk to, somewhere to rest: press up next to it ----------
function nearby() {
  const d = room.def;
  if (d.npc && Math.abs(P.x - d.npc.x) < 40 && Math.abs(P.y - d.npc.y) < 48) return { kind: 'npc', npc: d.npc };
  if (d.rest && !bossLocked() && Math.abs(P.x - d.rest.x) < 30 && Math.abs(P.y - d.rest.y) < 20) return { kind: 'rest' };
  return null;
}
function interact() {
  const n = nearby();
  if (!n || scene) return false;
  P.vx = 0;
  if (n.kind === 'rest' && SCENES.rest) { playScene(SCENES.rest()); return true; }
  if (n.kind === 'npc' && SCENES[n.npc.kind]) { const sc = SCENES[n.npc.kind](n.npc); if (sc) playScene(sc); return true; }
  return false;
}
// near a resting spot he yawns and rubs his eyes: that's how you know (every spot looks different)
let yawnT = 0;
function updateNearby(dt) {
  yawnT = Math.max(0, yawnT - dt);
  if (npcPose) { npcPose.t -= dt; if (npcPose.t <= 0) npcPose = null; }
  const n = !P.story && nearby();
  if (n && n.kind === 'rest' && yawnT <= 0) { yawnT = 6; popup(P.x + 8, P.y - 46, 'yawn', '#cfe0ff'); sfx.yawn(); }
}

// ---------- acorns he spilled when he got knocked out: still there, walk over them to scoop them back up ----------
let pileLock = 0;                 // just spilled them: don't scoop them straight back up
// a pile can't sit in grime or on tacks where he can't get it back: it goes on the nearest dry ground instead
const wetAt = (x, y) => boxHas(x - 14, y - 24, x + 14, y + 2, 3) || boxHas(x - 14, y - 24, x + 14, y + 2, 5) || boxHas(x - 4, y - 12, x + 4, y - 2, 4);
function dryGround(x, y) {
  if (!wetAt(x, y)) return null;
  const row0 = Math.round(y / T), rows = [0, -1, 1, -2, 2, -3, 3, 4];
  for (let d = 4; d < 30 * T; d += 4) for (const cx of [x - d, x + d]) for (const k of rows) {
    const row = row0 + k, t = tile(Math.floor(cx / T), row);
    if ((t === 1 || t === 2) && !boxSolid(cx - 8, row * T - 32, cx + 8, row * T) && !wetAt(cx, row * T)) return { x: Math.round(cx), y: row * T };
  }
  return null;
}
function checkPiles() {
  pileLock = Math.max(0, pileLock - STEP);
  if (!world.piles.length || P.ko > 0 || pileLock > 0 || trans.state !== 'none') return;
  for (let i = world.piles.length - 1; i >= 0; i--) {
    const p = world.piles[i];
    if (p.room === room.id && !p.dry) { p.dry = true; const at = dryGround(p.x, p.y); if (at) { p.x = at.x; p.y = at.y; saveWorld(); } }   // older piles that landed somewhere wet
    if (p.room !== room.id || Math.abs(P.x - p.x) > 16 || Math.abs(P.y - p.y) > 24) continue;
    const kind = p.kind || 'acorns';
    world.piles.splice(i, 1); gainCoin(kind, p.n); popup(P.x, P.y - 50, `+${p.n} ${kind}`, COIN_COL[kind]); twinkle(p.x, p.y - 8, 10, COIN_COL[kind]);
  }
}
