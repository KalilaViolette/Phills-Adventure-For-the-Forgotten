'use strict';
// ---------- saves and settings from before the game had its name (10/20/2026) ----------
// they were kept under the working title's keys: copied over to the new ones once, the old ones left where they were
try {
  const OLD = 'phill-metro-', keys = [];   // (the working title)
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(OLD)) keys.push(k); }
  for (const k of keys) { const n = 'phill-forgotten-' + k.slice(OLD.length); if (localStorage.getItem(n) === null) localStorage.setItem(n, localStorage.getItem(k)); }
} catch (e) {}
// ---------- screen ----------
// whole-number scale keeps every art pixel the same size; the view grows or shrinks a little to fill the screen
let VW = 640, VH = 360;
const T = 16, STEP = 1 / 120;
const C = document.getElementById('c'), ctx = C.getContext('2d');
let S = 1, offX = 0, offY = 0;
function resize() {
  const st = document.getElementById('stage'), box = { width: st.clientWidth, height: st.clientHeight };   // (its own size, not how it sits on the screen: full screen on a phone held upright turns it on its side, 10/17/2026)
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
  jumpHeight: 84, apexTime: 0.36, fallMult: 1.55, maxFall: 460, jumpCut: 0.42,
  coyote: 0.09, jumpBuffer: 0.12, attackCooldown: 0.36,
  rollSpeed: 330, rollTime: 0.28, airDashSpeed: 380, pogo: 420, pixelSnap: 0, guardSpeed: 110, swingLunge: 130, edgeHesitate: 0.45, parryWindow: 0.18, splatHeight: 150, downCooldown: 1.0, leapLift: 1.0, chargeTime: 0.85, swordReach: 14, backSpeed: 0.6, slowWalk: 0.32, keyWalk: 0.55, airHang: 1, crawlSpeed: 70, blockCost: 30, stamRegen: 25, guardBack: 50, iframeStart: 0.04, iframeLen: 0.12, heavyParry: 0.07,
  pressSwing: 0, rallyTime: 4, cdSqueak: 3, cdSpin: 2.5, cdBurst: 3.5, enRegen: 55, enDelay: 0.4, rollCost: 33, airDodgeCost: 24,
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
];
const tune = { ...DEFAULTS };
// TUNE_V goes up when defaults change on purpose: saved numbers from before that for those few don't win over the new
// ones (10/16/2026: stamina's only for dodging now, so the roll's cost and the refill changed)
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
