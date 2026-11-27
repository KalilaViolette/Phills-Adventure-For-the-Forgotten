'use strict';
// ---------- saves and settings from before the game had its name ----------
// they were kept under the working title's keys: copied over to the new ones once, the old ones left where they were
try {
  const OLD = 'phill-metro-', keys = [];   // (the working title)
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(OLD)) keys.push(k); }
  for (const k of keys) { const n = 'phill-forgotten-' + k.slice(OLD.length); if (localStorage.getItem(n) === null) localStorage.setItem(n, localStorage.getItem(k)); }
} catch (e) {}
// ---------- functions several parts of the game add to ----------
// Each one has a list of its parts' names in the order they wrap it, the first on the outside, and what it does itself
// in the middle (its ...Itself function). A part is added by name with wrapPart(what, name, (next, ...) => ...) and does
// its bit before or after next(...), or instead of it, so the order is the list's whatever order the files load in. A
// part with no place in its list, or one added twice, stops the page
const WRAP_ORDER = {
  update: ['trail', 'menu', 'debug', 'warren', 'oak'],
  takeItem: ['itemcard', 'hive', 'greenhouse', 'warren'],
  interact: ['homecoming', 'bear', 'warren', 'oak'],
  nearby: ['bear', 'warren', 'oak'],
  drawSoftWall: ['hive', 'playground', 'oak'],
  drawNpc: ['swordwork', 'beetle', 'homecoming', 'bear', 'hive', 'warren'],
};
const wrapParts = {}, wrapChains = {};
function wrapPart(what, name, fn) {
  const order = WRAP_ORDER[what];
  if (!order || !order.includes(name)) throw new Error('wrapPart: "' + name + '" has no place in WRAP_ORDER.' + what + ' (js/config.js)');
  const parts = wrapParts[what] || (wrapParts[what] = {});
  if (parts[name]) throw new Error('wrapPart: "' + name + '" was added to ' + what + ' twice');
  parts[name] = fn; wrapChains[what] = null;
}
function runWrapped(what, itself, args) {
  let chain = wrapChains[what];
  if (!chain) {
    chain = itself;
    const parts = wrapParts[what] || {}, order = WRAP_ORDER[what];
    for (let i = order.length - 1; i >= 0; i--) { const part = parts[order[i]], inner = chain; if (part) chain = (...a) => part(inner, ...a); }
    wrapChains[what] = chain;
  }
  return chain(...args);
}
function update(dt, ...a) { return runWrapped('update', updateItself, [dt * momentScale(dt), ...a]); }   // a step of the game (js/player.js), slowed when a held moment's easing in or out (js/fx.js)
function takeItem(...a) { return runWrapped('takeItem', takeItemItself, a); }        // picking something up (js/story.js)
function interact(...a) { return runWrapped('interact', interactItself, a); }        // pressing up by something (js/story.js)
function nearby(...a) { return runWrapped('nearby', nearbyItself, a); }              // what's close enough to use (js/story.js)
function drawSoftWall(...a) { return runWrapped('drawSoftWall', drawSoftWallItself, a); }   // a wall that can be broken (js/pond.js)
function drawNpc(...a) { return runWrapped('drawNpc', drawNpcItself, a); }           // whoever's in the room (js/render.js)

// ---------- screen ----------
// whole-number scale keeps every art pixel the same size; the view grows or shrinks a little to fill the screen
let VW = 640, VH = 360;
const T = 16, STEP = 1 / 120;
const C = document.getElementById('c'), ctx = C.getContext('2d');
let S = 1, offX = 0, offY = 0;
function resize() {
  const st = document.getElementById('stage'), box = { width: st.clientWidth, height: st.clientHeight };   // (its own size, not how it sits on the screen: full screen on a phone held upright turns it on its side)
  const dpr = window.devicePixelRatio || 1;
  C.width = Math.max(1, Math.round(box.width * dpr)); C.height = Math.max(1, Math.round(box.height * dpr));
  S = Math.max(1, Math.round(C.height / 360));
  // the view never shows more than 40 by 24 tiles: every room is at least that big, so there's never empty space past a
  // room's edge. A wider or taller window gets a thin dark border instead
  VW = Math.min(Math.ceil(C.width / S), 40 * 16); VH = Math.min(Math.ceil(C.height / S), 24 * 16);
  offX = Math.round((C.width - VW * S) / 2); offY = Math.round((C.height - VH * S) / 2);
}
window.addEventListener('resize', resize);

// ---------- tuning (same numbers the test room ended on) ----------
const DEFAULTS = {
  runSpeed: 175, accelTime: 0.05, decelTime: 0.04, airAccelTime: 0.08, airDecelTime: 0.12,
  jumpHeight: 84, apexTime: 0.36, fallMult: 1.55, maxFall: 460, jumpCut: 0.42, jumpMinTime: 0,
  coyote: 0.09, jumpBuffer: 0.12, attackCooldown: 0.36,
  rollSpeed: 330, rollTime: 0.28, airDashSpeed: 380, pogo: 420, pixelSnap: 0, guardSpeed: 110, swingLunge: 130, edgeHesitate: 0.45, parryWindow: 0.18, splatHeight: 150, downCooldown: 1.0, leapLift: 1.0, chargeTime: 0.85, swordReach: 14, backSpeed: 0.6, slowWalk: 0.32, keyWalk: 0.55, airHang: 1, crawlSpeed: 70, blockCost: 30, stamRegen: 25, guardBack: 50, iframeStart: 0.04, iframeLen: 0.12, heavyParry: 0.07,
  pressSwing: 0, feelHurt: 0, feelKill: 0, feelHits: 0, feelSkill: 0, feelTrail: 0, feelTurn: 0, feelRoll: 0, feelEase: 0, feelSnap: 0, feelSquash: 0, feelCam: 0, feelSteady: 0, feelStick: 0, feelNoStop: 0, feelSound: 0, feelFade: 0, feelSoftLand: 0, foeHealth: 1, feelStagger: 0, thinRootwood: 0, reactMore: 0, rallyTime: 4, cdSqueak: 3, cdSpin: 2.5, cdBurst: 3.5, enRegen: 55, enDelay: 0.4, rollCost: 33, airDodgeCost: 24,
};
const TUNE_ROWS = [
  ['runSpeed', 'Run speed', 100, 320, 5, ' px/s'],
  ['accelTime', 'Time to reach full speed', 0, 0.3, 0.01, ' s'],
  ['decelTime', 'Time to stop', 0, 0.3, 0.01, ' s'],
  ['airAccelTime', 'In the air: time to full speed', 0, 0.4, 0.01, ' s'],
  ['airDecelTime', 'In the air: time to stop', 0, 0.5, 0.01, ' s'],
  ['jumpHeight', 'Jump height', 40, 150, 2, ' px'],
  ['apexTime', 'Time to top of jump', 0.2, 0.6, 0.01, ' s'],
  ['fallMult', 'Falls faster than he rises', 1, 3, 0.05, 'x'],
  ['maxFall', 'Max fall speed', 250, 800, 10, ' px/s'],
  ['jumpCut', 'Short hop (lower is shorter)', 0.1, 1, 0.02, ''],
  ['jumpMinTime', 'Short hop: the rise can\'t be cut short before this long', 0, 0.15, 0.01, ' s'],
  ['coyote', 'Late jump off a ledge', 0, 0.2, 0.01, ' s'],
  ['jumpBuffer', 'Early jump before landing', 0, 0.25, 0.01, ' s'],
  ['attackCooldown', 'Attack cooldown', 0.12, 0.6, 0.01, ' s'],
  ['chargeTime', 'Hold R1 this long to fully charge', 0.3, 2, 0.05, ' s'],
  ['swordReach', 'How far a swing reaches past the sword as drawn', 0, 30, 1, ' px'],
  ['backSpeed', 'Walking backwards (facing the other way with the right stick)', 0.3, 1, 0.05, 'x'],
  ['slowWalk', 'Slowest walk, the stick barely pushed (of the run)', 0.15, 0.8, 0.01, 'x'],
  ['keyWalk', 'Walking speed holding B on the keyboard (of the run)', 0.2, 0.9, 0.01, 'x'],
  ['airHang', 'How much a swing in the air holds him where he is', 0, 1, 0.05, 'x'],
  ['swingLunge', 'How far a swing pulls him forward', 0, 300, 10, ' px/s'],
  ['guardSpeed', 'Walking speed with the shield up', 40, 200, 5, ' px/s'],
  ['parryWindow', 'Parry window after tapping L1', 0.05, 0.4, 0.01, ' s'],
  ['blockCost', 'Shield stamina a blocked hit takes (of 100)', 5, 100, 1, ''],
  ['stamRegen', 'Shield stamina refill speed with it lowered', 5, 150, 5, '/s'],
  ['guardBack', 'After a guard break, the shield comes back at this much', 10, 100, 5, '%'],
  ['enRegen', 'Stamina refill speed', 10, 120, 2, '/s'],
  ['enDelay', 'Stamina waits this long after he uses some', 0, 1.5, 0.05, ' s'],
  ['rollCost', 'Stamina: dodge roll (swings are free)', 0, 50, 1, ''],
  ['airDodgeCost', 'Stamina: air dodge', 0, 50, 1, ''],
  ['rallyTime', 'Rally: time to hit back and win fluff back', 1, 10, 0.25, ' s'],
  ['cdSqueak', 'Squeak: wait before the next one', 0, 10, 0.25, ' s'],
  ['cdSpin', 'Spin: wait before the next one', 0, 10, 0.25, ' s'],
  ['cdBurst', 'Fluff burst: wait before the next one', 0, 10, 0.25, ' s'],
  ['splatHeight', 'Falls farther than this and he splats', 90, 400, 10, ' px'],
  ['rollSpeed', 'Dodge roll speed', 200, 520, 10, ' px/s'],
  ['rollTime', 'Dodge roll length', 0.15, 0.5, 0.01, ' s'],
  ['crawlSpeed', 'Crawling speed under low things', 30, 150, 5, ' px/s'],
  ['iframeStart', 'Roll: untouchable starting this far in', 0, 0.2, 0.01, ' s'],
  ['iframeLen', 'Roll: untouchable for this long', 0.03, 0.3, 0.01, ' s'],
  ['airDashSpeed', 'Air dodge speed', 200, 560, 10, ' px/s'],
  ['pogo', 'Down attack bounce', 250, 620, 10, ' px/s'],
  ['downCooldown', 'Wait before another down swing in the air', 0.2, 2.5, 0.05, ' s'],
  ['pixelSnap', 'Snap movement to art pixels (0 off, 1 on)', 0, 1, 1, ''],
  ['pressSwing', 'Swing on the press, hold on to charge the next (0 off, 1 on)', 0, 1, 1, ''],
  // the combat feel try-outs, from what Hollow Knight and Silksong do. All off is the game as it was
  ['feelHurt', 'Feel: getting hurt is a big moment, a longer freeze, a sharp shake, a harder knock back (0 off, 1 on)', 0, 1, 1, ''],
  ['feelKill', 'Feel: the knockout is its own moment, a hitch, a shake, thrown the way it was hit (0 off, 1 on)', 0, 1, 1, ''],
  ['feelHits', 'Feel: plain hits, no shake, he bounces back off it, the flash fades out (0 off, 1 on)', 0, 1, 1, ''],
  ['feelSkill', 'Feel: his sword set changes his swing speed, how much he bounces and how far things go (0 off, 1 on)', 0, 1, 1, ''],
  ['feelTrail', 'Feel: a thread trail behind the sword, out to where it reaches (0 off, 1 on)', 0, 1, 1, ''],
  ['feelTurn', 'Feel: he can turn round sooner in a plain swing, the bigger swings stay locked (0 off, 1 on)', 0, 1, 1, ''],
  ['feelRoll', 'Feel: he can roll or air dodge sooner out of a plain swing, the bigger swings stay locked (0 off, 1 on)', 0, 1, 1, ''],
  ['feelEase', 'Feel: a knockout slows into its hitch and back out, and the long holds (getting hurt, a parry) pick back up over a moment instead of all at once (0 off, 1 on)', 0, 1, 1, ''],
  ['feelSnap', 'Feel: a plain swing hits right behind the press, most of pulling back skipped, the bigger swings as they were (0 off, 1 on)', 0, 1, 1, ''],
  ['feelSquash', 'Feel: he pulls tall and thin pushing off and presses short and wide landing, only in how he is drawn (0 off, 1 on)', 0, 1, 1, ''],
  ['feelCam', 'Feel: the view picks up speed after him as well as slowing in, with a shorter lead that swings across at a steady pace (0 off, 1 on)', 0, 1, 1, ''],
  ['feelSteady', 'Feel: he is drawn steady against the view, without the one pixel shiver as he runs (0 off, 1 on)', 0, 1, 1, ''],
  ['feelStick', 'Feel: the stick is a full run the moment it is past the middle, no wait and no slow walk (0 off, 1 on)', 0, 1, 1, ''],
  ['feelNoStop', 'Feel: no stop on a plain hit. Heavy hits, knockouts and getting hurt keep theirs (0 off, 1 on)', 0, 1, 1, ''],
  ['feelSound', 'Feel: his jump, landing, swing, hit, hurt, roll and footstep sounds come out a little higher or lower each time (0 off, 1 on)', 0, 1, 1, ''],
  ['feelFade', 'Feel: a short dip to dark when thorns or water put him back, instead of the view cutting across (0 off, 1 on)', 0, 1, 1, ''],
  ['feelSoftLand', 'Feel: a small puff and a soft sound on the little landings that have none, a step down or a tapped hop (0 off, 1 on)', 0, 1, 1, ''],
  ['feelStagger', 'Feel: a plain hit on a cap, a can or a spinner while it winds up sends it back to the start of the wind up. Its attack itself still comes through (0 off, 1 on)', 0, 1, 1, ''],
  ['foeHealth', 'How much health ordinary enemies have, times this. Counts for enemies as a room is come into. Bosses are left alone', 0.25, 1.5, 0.05, ' x'],
  ['reactMore', "More of the painted rooms giving when he lands on them, to try: the well's four glowing caps squash and puff spores, and the six brackets up its dead trunk dip at their free ends. The same for the caps, the brackets and the branches in the grime pool, the root lattice, the east edge, the moss bank and the undercroft. In the Pond the bent reeds dip and the lily pads bob, and in the Playground the dandelion leaves tip and the toys floating in the puddle bob. A pickup or an enemy standing on one goes down with it (0 off, 1 on)", 0, 1, 1, ''],
  ['thinRootwood', 'Rootwood with fewer enemies, to try: 1 leaves out eight in its four most crowded rooms (trail, eastedge, undercroft, the well). 2 also keeps the caps cornering Tock at one after the tin soldier. Counts as a room is come into (0 off)', 0, 2, 1, ''],
];
// Tuning values to try together. knight: the controls set the way Hollow Knight's measure (the swing on the press and
// hitting right behind it, no drift starting, stopping or turning, the stick a full run past the middle, the rise
// stopped when jump's let go once it's 0.08s in, turning and rolling out of a plain swing a tenth of a second in).
// knightAll: those, and the try-outs for how hits land, how the view follows and how steady he's drawn against it.
// Reset to defaults puts them all back
const KNIGHT_CONTROLS = { pressSwing: 1, feelTurn: 1, feelRoll: 1, feelSnap: 1, feelStick: 1, accelTime: 0, decelTime: 0, airAccelTime: 0, airDecelTime: 0, jumpCut: 0.1, jumpMinTime: 0.08 };
const TUNE_PRESETS = {
  knight: KNIGHT_CONTROLS,
  knightAll: { ...KNIGHT_CONTROLS, feelHurt: 1, feelKill: 1, feelHits: 1, feelNoStop: 1, feelTrail: 1, feelEase: 1, feelCam: 1, feelSteady: 1 },
};
const tune = { ...DEFAULTS };
// TUNE_V goes up when defaults change on purpose: saved numbers from before that for those few don't win over the new
// ones (stamina's only for dodging, so the roll's cost and the refill changed)
const TUNE_V = 2, TUNE_NEW = { 2: ['enRegen', 'enDelay', 'rollCost', 'airDodgeCost'] };
try {
  const s = JSON.parse(localStorage.getItem('phill-forgotten-tune') || 'null');
  if (s) { const skip = new Set(); for (let v = (s._v || 1) + 1; v <= TUNE_V; v++) for (const k of TUNE_NEW[v] || []) skip.add(k);
    for (const k in DEFAULTS) if (typeof s[k] === 'number' && !skip.has(k)) tune[k] = s[k]; }
} catch (e) {}
function saveTune() { try { localStorage.setItem('phill-forgotten-tune', JSON.stringify({ ...tune, _v: TUNE_V })); } catch (e) {} }
const gravity = () => 2 * tune.jumpHeight / (tune.apexTime * tune.apexTime);
const jumpVel = () => 2 * tune.jumpHeight / tune.apexTime;
const overlap = (a, b) => a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t;
