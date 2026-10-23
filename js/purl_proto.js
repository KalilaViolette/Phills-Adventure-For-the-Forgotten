'use strict';
// ---------- Purl, a test run (10/23/2026) ----------
// A course in the treetops to try how she moves before the Canopy's built: her bound, the hook thrown at a knot to yank
// herself to it (tap) or swing from it (hold), the yarn reeling back in while she runs, the thrust, and her two ways of
// mending: winning loose yarn back by hitting back fast (the rally), and sitting to crochet herself closed when she's
// got a breather (sewing, which uses spare yarn). On its own page, so nothing in the game is touched.
// Her frames are made by Source/Sprites/purl_proto_sheet.py.
//
// The second pass (10/23/2026): she's a quick, agile stoat, so she moves like one. She jumps higher than she is tall,
// gets up to speed at once and turns on the spot. A jump pressed a moment early or a moment after running off an edge
// still counts. Coming up short of a ledge, she pulls herself up onto it. Against a trunk she scampers up a little,
// slides down slowly, and kicks off it with a jump. A yank flings her up and over the knot with the speed it gave her,
// and the yarn's back almost at once, so the next throw is ready. Up on the stick aims the hook higher.
//
// The third pass (10/23/2026): her attacks, built to her frames. On the ground, the thrust, the chop and the spin
// chain into a combo; up and attack is the uppercut, which flips her into the air and launches whatever it hits; in
// the air, a wheeling slash she can do again, a small uppercut that pops her higher, and down for a plunge that
// bounces her back up off whatever she lands on; down on the ground is the low sweep (a slide first if she's
// running), and down again sweeps back the other way. Every swing has its hit on the frame the art marks.

const T = 16, VW = 640, VH = 360;
const C = document.getElementById('c'), ctx = C.getContext('2d');
let S = 2;
function fit() {
  if (document.body.classList.contains('touch')) {                                  // on a phone: as big as the screen, not just whole steps (js/purl_touch.js)
    const k = Math.min(innerWidth / VW, innerHeight / VH);
    S = Math.max(1, Math.ceil(k * (window.devicePixelRatio || 1)));
    C.style.width = Math.floor(VW * k) + 'px'; C.style.height = Math.floor(VH * k) + 'px';
  } else { S = Math.max(1, Math.floor(Math.min(innerWidth / VW, (innerHeight - 30) / VH))); C.style.width = C.style.height = ''; }
  C.width = VW * S; C.height = VH * S; ctx.imageSmoothingEnabled = false;
}
addEventListener('resize', fit); fit();

// ---------- tuning: all in one place ----------
const TUNE = {
  run: 230, chainBoost: 0.18, chainMax: 3, accel: 3200, airAccel: 1500, airDrag: 700, stop: 2600,
  jumpV: 520, riseGrav: 1350, fallGrav: 1900, apexGrav: 0.55, maxFall: 720, jumpCut: 170,  // (about 100 pixels up, more than her height, and about 10 tiles across at a run)
  coyote: 0.1, jumpBuffer: 0.13, mantle: 30,
  wallSlide: 170, wallJumpX: 330, wallJumpV: 500, wallLock: 0.15, scamper: 0.3, scamperV: 300,
  reach: 240, hookSpeed: 1600, yankSpeed: 620, yankMax: 0.7, flingUp: 330, holdForSwing: 0.25, reel: 2600, hookBuffer: 0.18,
  swingMin: 48, swingPump: 420, swingLetGo: 1.12,
  rallyTime: 4, rallyHits: 3, spareMax: 9, sewTime: 1.4, sewCost: 2, health: 5,
  holdUnit: 1 / 18, comboWindow: 0.22, uppercutV: 540, launchV: 420, airUpV: 300, plungeV: 640, bounceV: 430, slideV: 300,
};
// her attacks, one per clip: what starts it, how it moves her, and what a hit does. The hit frames come from the art
// (the frames with a smear). reach: how far ahead the hook hits, and how high and low from her feet
const ATTACKS = {
  thrust:     { clip: 'combo_thrust', ground: true, next: 'chop', reach: [6, 60, -54, -12], dmg: 1, push: 10 },
  chop:       { clip: 'combo_chop', ground: true, next: 'spin', reach: [-4, 64, -70, -6], dmg: 1, push: 14, hop: 120 },
  spin:       { clip: 'combo_spin', ground: true, reach: [-40, 56, -72, -6], dmg: 2, push: 22, hop: 160, both: true },
  uppercut:   { clip: 'uppercut', ground: true, reach: [-8, 52, -96, -4], dmg: 2, launch: true, rise: 'uppercutV', airOk: true },
  airslash:   { clip: 'air_slash', air: true, reach: [-44, 60, -78, 4], dmg: 1, push: 8, both: true, again: true },
  airup:      { clip: 'air_uppercut', air: true, reach: [-10, 46, -90, -6], dmg: 1, launch: true, rise: 'airUpV' },
  plunge:     { clip: 'downstrike_bounce', air: true, reach: [-16, 18, -24, 26], dmg: 2, plunge: true },
  sweep:      { clip: 'low_sweep', ground: true, next: 'backsweep', reach: [-6, 66, -30, 0], dmg: 1, push: 16, low: true },
  slide:      { clip: 'low_slide', ground: true, next: 'sweep', reach: [-4, 50, -26, 0], dmg: 1, push: 6, low: true, slide: true },
  backsweep:  { clip: 'return_sweep', ground: true, reach: [-66, 6, -30, 0], dmg: 1, push: 16, low: true, turn: true },
};

// ---------- the course: branches, twigs, knots ----------
// One idea a stretch, each with a sign, and a safe ledge to come back to at the start of each one:
// run and jump; tap the hook to yank across; hold it to swing; chain throws without landing; up between two trunks;
// and a last run to the end. The first part has a floor far below it that catches a miss; past that, real drops.
const W = 222, H = 40;
const tiles = new Uint8Array(W * H);                     // 0 open, 1 solid wood, 2 a twig (stand on it from above)
const knots = [], foes = [], scraps = [], signs = [];
const at = (x, y) => (x < 0 || x >= W) ? 1 : (y < 0 || y >= H) ? 0 : tiles[y * W + x];
function wood(x0, x1, y0, y1) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) tiles[y * W + x] = 1; }
function twig(x0, x1, y) { for (let x = x0; x <= x1; x++) if (!tiles[y * W + x]) tiles[y * W + x] = 2; }
function knot(x, y) { knots.push({ x: x * T + 8, y: y * T + 8 }); }
function foe(x, y) { foes.push({ x: x * T + 8, y: y * T, y0: y * T, x0: x * T + 8, vx: 30, hp: 3, flash: 0, dead: 0, f: 1, air: 0, vy: 0 }); }
function scrap(x, y) { scraps.push({ x: x * T + 8, y: y * T + 2, got: false }); }
function sign(x, y, text) { signs.push({ x: x * T + 8, y: y * T, text }); }
const LEDGES = [];
function ledge(x0, x1, y, atX) { LEDGES.push({ x0, x1, at: { x: (atX ?? x0 + 2) * T, y: y * T } }); }
(function build() {
  wood(0, 95, 38, 39);                                   // a floor far below the first part, to catch a miss while she's learning
  // 1. run and jump: a broad bough, a log to hop and a stump to pull herself up onto, and a gap to jump
  wood(0, 30, 30, 31); ledge(0, 30, 30, 6);
  wood(13, 14, 28, 29); wood(21, 23, 26, 29);
  sign(6, 30, 'Run, and jump. She pulls herself up onto a ledge she nearly makes');
  twig(33, 36, 34);                                      // (a way back up from the floor)
  // 2. a tap of the hook: one knot over a gap too wide to jump
  wood(38, 60, 28, 29); ledge(38, 60, 28); foe(52, 28);
  sign(41, 28, 'Tap the hook at a knot to yank across. Up on the stick aims higher');
  knot(68, 20);
  twig(63, 66, 34); twig(69, 72, 31);
  // 3. hold the hook: a swing over the first real drop
  wood(76, 92, 28, 29); ledge(76, 92, 28); foe(86, 28);
  sign(79, 28, 'Hold the hook to swing. Let go near the top to fly');
  knot(101, 17);
  // 4. a chain: three knots, throw again before she lands
  wood(112, 126, 29, 30); ledge(112, 126, 29); scrap(124, 29);
  sign(115, 29, 'Throw again before you land. A chain with no stops makes her faster');
  knot(133, 21); knot(145, 19); knot(157, 21);
  twig(150, 152, 31);
  // 5. up between two trunks: jump at one, kick off it to the other (or hook the knots)
  wood(163, 184, 27, 28); ledge(163, 172, 27); foe(168, 27);
  sign(164, 27, 'Jump at a trunk and jump again to kick off it. Or hook the knots');
  wood(174, 175, 13, 21);                                // the left trunk, high enough to walk under
  wood(183, 186, 12, 26);                                // the right trunk, up to the top
  knot(179, 19); knot(180, 10);
  // 6. the top, and one last throw to the end
  wood(183, 202, 12, 13); ledge(187, 202, 12); foe(196, 12); scrap(200, 12);
  knot(207, 7);
  wood(212, W - 1, 16, 17); ledge(212, W - 1, 16, 214); scrap(217, 16);
  sign(214, 16, 'The end. R or Select to go again');
})();
const START = LEDGES[0].at;

// ---------- her ----------
const P = { x: START.x, y: START.y, vx: 0, vy: 0, f: 1, ground: false, hw: 9, h: 50, health: TUNE.health, loose: 0, looseT: 0, rally: 0, atk: null, airHits: 0, bigJump: false,
  spare: 2, sewT: 0, sewing: false, chain: 0, airFromHook: false, still: 0, inv: 0, atk: 0, land: 0, anim: 0, hurtT: 0,
  coyote: 0, jumpBuf: 0, hookBuf: 0, jumpHeld: false, wall: 0, wallLock: 0, scamper: 0 };
const hook = { state: 'home', x: 0, y: 0, tx: 0, ty: 0, knot: null, held: 0, let: false, len: 0, yankT: 0, mode: null };

// ---------- input: keyboard and a controller ----------
const keys = {};
addEventListener('keydown', e => { keys[e.code] = true; if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault(); });
addEventListener('keyup', e => { keys[e.code] = false; });
const inp = { x: 0, up: false, down: false, jump: false, attack: false, hook: false, sew: false, reset: false };
const was = {};
function readInput() {
  const pad = (navigator.getGamepads ? [...navigator.getGamepads()].find(p => p) : null);
  const b = i => !!(pad && pad.buttons[i] && pad.buttons[i].pressed);
  let x = (keys.ArrowRight || keys.KeyD ? 1 : 0) - (keys.ArrowLeft || keys.KeyA ? 1 : 0);
  let up = !!(keys.ArrowUp || keys.KeyW), down = !!(keys.ArrowDown || keys.KeyS);
  if (pad) {
    const ax = pad.axes[0] || 0, ay = pad.axes[1] || 0;
    if (Math.abs(ax) > 0.35) x = Math.sign(ax); if (b(15)) x = 1; if (b(14)) x = -1;
    if (ay < -0.5 || b(12)) up = true; if (ay > 0.5 || b(13)) down = true;
  }
  inp.x = x; inp.up = up; inp.down = down;
  inp.jump = !!(keys.KeyZ || keys.Space || b(0));
  inp.attack = !!(keys.KeyX || b(5) || b(2));
  inp.hook = !!(keys.KeyC || b(7) || b(1));
  inp.sew = !!(keys.KeyV || b(4));
  inp.reset = !!(keys.KeyR || b(8));
}
const pressed = k => inp[k] && !was[k];

function solidAt(px, py) { return at(Math.floor(px / T), Math.floor(py / T)) === 1; }
function twigAt(px, py) { return at(Math.floor(px / T), Math.floor(py / T)) === 2; }
function boxHits(x, y) {                                   // her box with its feet at x, y
  for (let yy = y - P.h; yy < y; yy += 8) for (const xx of [x - P.hw, x, x + P.hw]) if (solidAt(xx, yy)) return true;
  for (const xx of [x - P.hw, x, x + P.hw]) if (solidAt(xx, y - 0.01)) return true;
  return false;
}
function moveX(dx) {                                       // true if she ran into something
  const steps = Math.ceil(Math.abs(dx) / 4) || 1;
  for (let i = 0; i < steps; i++) {
    const nx = P.x + dx / steps;
    if (!boxHits(nx, P.y)) { P.x = nx; continue; }
    // a ledge she nearly makes: she pulls herself up onto it (a small step on the ground, more in the air)
    const most = P.ground ? 6 : TUNE.mantle;
    let up = 0;
    for (let k = 2; k <= most; k += 2) if (!boxHits(nx, P.y - k)) { up = k; break; }
    if (up && P.vy > -260) { P.y -= up; P.x = nx; if (!P.ground) { P.vy = Math.min(P.vy, 0); P.land = 0.06; if (up > 10) { mark('mantle', 0.2); dust(P.x + P.f * 8, P.y, 3); } } continue; }
    P.vx = 0; return true;
  }
  return false;
}
function moveY(dy) {                                       // true if she ran into something
  const steps = Math.ceil(Math.abs(dy) / 4) || 1;
  P.ground = false;
  for (let i = 0; i < steps; i++) {
    const ny = P.y + dy / steps;
    if (dy > 0) {
      const footRowWas = Math.floor((P.y - 0.01) / T), footRow = Math.floor((ny - 0.01) / T);
      const onTwig = footRow > footRowWas && [P.x - P.hw, P.x, P.x + P.hw].some(xx => twigAt(xx, ny - 0.01)) && !inp.down;
      if (boxHits(P.x, ny) || onTwig) { P.y = onTwig ? footRow * T : Math.floor(ny / T) * T; P.vy = 0; P.ground = true; return true; }
    } else if (boxHits(P.x, ny)) {
      for (const s of [4, -4, 8, -8]) if (!boxHits(P.x + s, ny)) { P.x += s; P.y = ny; break; }   // a corner just clipped: slip past it
      if (P.y !== ny) { P.vy = 0; return true; }
      continue;
    }
    P.y = ny;
  }
  return false;
}
function tailPoint() {                                     // where the yarn leaves her: near her tail, at her back and low
  return { x: P.x - P.f * 22, y: P.y - 14 };
}

// ---------- the hook ----------
function pickKnot() {
  // in reach, and not behind her; ahead and up preferred, the way she's going, and up on the stick prefers higher ones
  const fx = Math.abs(P.vx) > 40 ? Math.sign(P.vx) : P.f;
  let best = null, bd = 1e9;
  for (const k of knots) {
    const dx = k.x - P.x, dy = k.y - (P.y - 30), d = Math.hypot(dx, dy);
    if (d > TUNE.reach || dx * fx < -32 || dy > 40) continue;
    const score = d - dx * fx * 0.35 + (dy < 0 ? -40 : 0) + (inp.up ? dy * 0.6 : 0) + (k === hook.last && hook.lastT > 0 ? 400 : 0);
    if (score < bd) { bd = score; best = k; }
  }
  return best;
}
function throwHook() {
  hook.x = P.x + P.f * 10; hook.y = P.y - 40; hook.held = 0; hook.let = !inp.hook; hook.mode = null;
  const k = pickKnot();
  if (k) { hook.state = 'fly'; hook.knot = k; hook.tx = k.x; hook.ty = k.y; }
  else {
    hook.state = 'miss'; hook.knot = null; hook.tx = P.x + P.f * TUNE.reach * 0.7; hook.ty = P.y - 30 - TUNE.reach * 0.45;
    if (!pops.some(p => p.text === 'no knot in reach')) pops.push({ text: 'no knot in reach', x: P.x, y: P.y - 80, t: 0.9 });
  }
  P.throwT = 0.14; mark('throw', 0.2); P.sewing = false; P.sewT = 0;
}
function letGo() {
  if (hook.state !== 'stuck') return;
  hook.last = hook.knot; hook.lastT = 0.35;                // (the next throw goes on to a new knot, not back to this one)
  hook.state = 'reel'; hook.mode = null; P.airFromHook = true; P.scamper = TUNE.scamper;
}
function updateHook(dt) {
  hook.lastT = Math.max(0, (hook.lastT || 0) - dt);
  if (hook.state === 'home') return;
  if (inp.hook && !hook.let) hook.held += dt; else hook.let = true;   // (let: the button's been let go since the throw)
  const tp = tailPoint();
  if (hook.state === 'fly' || hook.state === 'miss') {
    const dx = hook.tx - hook.x, dy = hook.ty - hook.y, d = Math.hypot(dx, dy), s = TUNE.hookSpeed * dt;
    if (d <= s) {
      hook.x = hook.tx; hook.y = hook.ty;
      if (hook.state === 'miss') { hook.state = 'reel'; return; }
      hook.state = 'stuck'; hook.len = Math.max(TUNE.swingMin, Math.hypot(hook.x - P.x, hook.y - (P.y - 30)));
      hook.mode = (!hook.let && hook.held >= TUNE.holdForSwing) ? 'swing' : 'yank'; hook.yankT = 0; P.sewing = false;
      return;
    }
    hook.x += dx / d * s; hook.y += dy / d * s;
    return;
  }
  if (hook.state === 'stuck') {
    if (hook.mode === 'yank' && !hook.let && hook.held >= TUNE.holdForSwing) {   // still held from the throw: a swing after all
      hook.mode = 'swing'; hook.len = Math.max(TUNE.swingMin, Math.hypot(hook.x - P.x, hook.y - (P.y - 30)));
    }
    return;
  }
  if (hook.state === 'reel') {                             // back to her tail, while she keeps going
    const dx = tp.x - hook.x, dy = tp.y - hook.y, d = Math.hypot(dx, dy), s = TUNE.reel * dt;
    if (d <= s + 4) { hook.state = 'home'; mark('catch', 0.12); return; }
    hook.x += dx / d * s; hook.y += dy / d * s;
  }
}

// ---------- her moves ----------
function hurt(fromX) {
  if (P.inv > 0) return;
  if (P.loose > 0) P.loose = 0;                            // loose yarn not won back is gone for good
  P.health -= 1; P.loose = 1; P.looseT = TUNE.rallyTime; P.rally = 0;
  P.inv = 1.0; P.hurtT = 0.25; mark('hit', 0.3); P.atk = null; P.vx = Math.sign(P.x - fromX || -P.f) * 180; P.vy = -220; P.chain = 0; P.sewing = false; P.sewT = 0;
  if (hook.state === 'stuck') letGo();
  if (P.health <= 0) { reset(); }
}
function landedHit() {                                     // a hit on an enemy: winds loose yarn back in, or spins spare
  P.rally++;
  if (P.rally >= TUNE.rallyHits) {
    P.rally = 0;
    if (P.loose > 0) { P.loose = 0; P.health = Math.min(TUNE.health, P.health + 1); pop('won back'); }
    else if (P.spare < TUNE.spareMax) { P.spare++; pop('+ spare yarn'); }
  }
  if (P.loose > 0) P.looseT = Math.min(TUNE.rallyTime, P.looseT + 0.75);
}
const marks = {};                                          // (short timers for the in-between moves the frames show: a skid, a landing, a turn...)
function mark(name, t) { marks[name] = { t, of: t }; }
const marked = name => marks[name] && marks[name].t > 0;
const markT = name => marks[name] ? marks[name].of - marks[name].t : 0;       // (how long since it started)
const pops = [];
function pop(text) { pops.push({ text, x: P.x, y: P.y - 80, t: 1.2 }); }
function dropped() {                                       // off into the open: a heart, and back to the ledge the stretch started from
  P.health -= 1; P.loose = 0; P.chain = 0; P.sewing = false; P.sewT = 0; hook.state = 'home';
  if (P.health <= 0) { reset(); return; }
  const c = P.check || START; P.x = c.x; P.y = c.y; P.vx = 0; P.vy = 0; P.inv = 1.0; P.airFromHook = false; pop('a fall: lost a bit of yarn');
}
const dusts = [], scratches = [];
function dust(x, y, n) { for (let i = 0; i < n; i++) dusts.push({ x: x + (Math.random() - 0.5) * 10, y: y - 2, vx: (Math.random() - 0.5) * 70, vy: -20 - Math.random() * 30, t: 0.35 + Math.random() * 0.2 }); }
function scratch(x, y) { scratches.push({ x, y, t: 0.6 }); }
function reset() {
  P.check = null; Object.assign(P, { x: START.x, y: START.y, vx: 0, vy: 0, health: TUNE.health, loose: 0, chain: 0, inv: 0, sewing: false, sewT: 0, wall: 0, atk: null });
  hook.state = 'home'; for (const f of foes) { f.dead = 0; f.hp = 3; f.x = f.x0; } for (const s of scraps) s.got = false; P.spare = 2;
}

function atkLen() { const A = meta.facings[P.f > 0 ? 'right' : 'left'].anims[P.atk.def.clip]; return A.reduce((t, f) => t + (f.hold || 2) * TUNE.holdUnit, 0); }
function atkT() { return P.atk.t; }
function atkFrame() { const A = meta.facings[P.f > 0 ? 'right' : 'left'].anims[P.atk.def.clip]; let t = 0; for (let i = 0; i < A.length; i++) { t += (A[i].hold || 2) * TUNE.holdUnit; if (P.atk.t < t) return [i, A[i]]; } return [A.length - 1, A[A.length - 1]]; }
function startAttack(name) {
  const def = ATTACKS[name]; P.atk = { name, def, t: 0, hits: new Set(), landed: false, bounced: false }; P.sewing = false; P.sewT = 0;
  if (def.slide) { P.vx = P.f * TUNE.slideV; dust(P.x - P.f * 6, P.y, 3); }
  if (def.turn) { P.f = -P.f; }
  if (def.plunge) { P.vy = Math.max(P.vy, TUNE.plungeV * 0.6); }
}
function updateAttack(dt, busy) {
  if (!meta) return;
  // starting one: the stick says which. On the ground: neutral the combo, up the uppercut, down the sweep (a slide
  // first at a run). In the air: neutral the wheeling slash, up the small uppercut, down the plunge
  if (pressed('attack') && !P.sewing && !busy && P.wall === 0) {
    const cur = P.atk;
    if (cur && cur.def.next && atkT() > atkLen() * 0.45 && !(inp.down && !cur.def.low) && !inp.up) startAttack(cur.def.next);   // the combo: the next one, once this one's hit has landed
    else if (!cur || (cur.def.again && atkT() > atkLen() * 0.6) || (cur.def.air && P.ground)) {
      if (P.ground) startAttack(inp.up ? 'uppercut' : inp.down ? (Math.abs(P.vx) > 140 ? 'slide' : 'sweep') : 'thrust');
      else if (P.airHits < 4) { startAttack(inp.down ? 'plunge' : inp.up ? 'airup' : 'airslash'); P.airHits++; }
    }
  }
  if (!P.atk) return;
  const A = P.atk, d = A.def; A.t += dt;
  const [k, fr] = atkFrame(), hitFrame = !!fr.hit;
  // the moves the swing makes: the uppercut lifts her off the ground on its rising frame, a chop or a spin hops her
  if (d.rise && !A.rose && hitFrame && k >= 2) { A.rose = true; P.vy = -TUNE[d.rise]; P.ground = false; P.airFromHook = false; P.bigJump = true; dust(P.x, P.y, 3); }
  if (d.hop && !A.rose && hitFrame && P.ground) { A.rose = true; P.vy = -d.hop; P.ground = false; }
  if (d.plunge && !A.bounced) { P.vy = Math.max(P.vy, TUNE.plungeV); if (P.ground) { A.t = Math.max(A.t, atkLen() * 0.55); A.bounced = true; dust(P.x, P.y, 5); } }
  if (d.plunge && A.bounced && atkT() > atkLen() * 0.99) { P.atk = null; return; }
  // the hit, on the frames the art marks
  if (hitFrame) {
    const r = d.reach, l = P.f > 0 ? P.x + r[0] : P.x - r[1], rr = P.f > 0 ? P.x + r[1] : P.x - r[0], t = P.y + r[2], b = P.y + r[3];
    for (const f of foes) {
      if (f.dead || A.hits.has(f)) continue;
      const fl = d.both ? P.x - Math.max(-r[0], r[1]) : l, fr_ = d.both ? P.x + Math.max(-r[0], r[1]) : rr;
      if (f.x + 10 > fl && f.x - 10 < fr_ && f.y - 2 > t && f.y - 22 < b) {
        A.hits.add(f); A.landed = true; f.hp -= d.dmg; f.flash = 0.12; landedHit();
        if (d.push) f.x += P.f * d.push;
        if (d.launch) { f.vy = -TUNE.launchV; f.air = 0.6; }
        if (d.plunge && !A.bounced) { A.bounced = true; P.vy = -TUNE.bounceV; P.airHits = 0; A.t = Math.max(A.t, atkLen() * 0.55); pop('bounce'); }
        if (f.hp <= 0) { f.dead = 6; pop('knocked out'); }
      }
    }
  }
  if (A.t >= atkLen()) P.atk = null;
}
function update(dt) {
  readInput();
  if (pressed('reset')) reset();
  P.inv = Math.max(0, P.inv - dt); P.hurtT = Math.max(0, P.hurtT - dt); P.land = Math.max(0, P.land - dt); P.throwT = Math.max(0, (P.throwT || 0) - dt);
  P.jumpBuf = pressed('jump') ? TUNE.jumpBuffer : Math.max(0, P.jumpBuf - dt);
  P.hookBuf = pressed('hook') ? TUNE.hookBuffer : Math.max(0, P.hookBuf - dt);
  P.wallLock = Math.max(0, P.wallLock - dt);
  for (const k in marks) marks[k].t = Math.max(0, marks[k].t - dt);
  for (const d of dusts) { d.t -= dt; d.x += d.vx * dt; d.y += d.vy * dt; d.vy += 60 * dt; } while (dusts.length && dusts[0].t <= 0) dusts.shift();
  for (const c of scratches) c.t -= dt; while (scratches.length && scratches[0].t <= 0) scratches.shift();
  if (P.ground && inp.down && pressed('down') && [P.x - P.hw, P.x, P.x + P.hw].some(xx => twigAt(xx, P.y + 2))) mark('drop', 0.16);
  if (P.wall && P.vy > 60 && Math.random() < dt * 14) scratch(P.x + P.wall * 9, P.y - 24);
  if (P.loose > 0) { P.looseT -= dt; if (P.looseT <= 0) { P.loose = 0; pop('it frayed off'); } }

  // sewing: standing still, holding the button, with spare yarn
  const canSew = P.ground && Math.abs(P.vx) < 5 && inp.x === 0 && hook.state === 'home' && !P.atk;
  if (inp.sew && canSew && P.health < TUNE.health && P.spare >= TUNE.sewCost) {
    P.sewing = true; P.sewT += dt;
    if (P.sewT >= TUNE.sewTime) { P.sewT = 0; P.spare -= TUNE.sewCost; P.health = Math.min(TUNE.health, P.health + 1); pop('sewn up'); }
  } else { if (P.sewing) mark('rise', 0.14); P.sewing = false; P.sewT = 0; }

  // the hook (a press a moment before the yarn's back still throws, once it is)
  if (P.hookBuf > 0 && hook.state === 'home' && !P.sewing) { P.hookBuf = 0; throwHook(); }
  updateHook(dt);
  const yank = hook.state === 'stuck' && hook.mode === 'yank', swing = hook.state === 'stuck' && hook.mode === 'swing';

  if (yank) {                                               // pulled to the knot, then flung on up and over it
    hook.yankT += dt;
    const tx = hook.x, ty = hook.y + 34, dx = tx - P.x, dy = ty - P.y, d = Math.hypot(dx, dy) || 1;
    P.vx = dx / d * TUNE.yankSpeed; P.vy = dy / d * TUNE.yankSpeed; if (Math.abs(dx) > 4) P.f = Math.sign(dx);
    const hitX = moveX(P.vx * dt), hitY = moveY(P.vy * dt);
    if (P.jumpBuf > 0) { P.jumpBuf = 0; P.vy = -TUNE.jumpV; P.vx = Math.sign(P.vx || P.f) * Math.max(Math.abs(P.vx), TUNE.run); letGo(); }
    else if (d < 20 || hook.yankT > TUNE.yankMax || hitX || hitY) {
      const keep = Math.max(TUNE.run * 1.1, Math.abs(P.vx));
      P.vx = (inp.x || P.f) * keep; P.vy = Math.min(P.vy * 0.4, -TUNE.flingUp);
      letGo(); mark('fling', 0.3);
    }
  } else if (swing) {                                       // on the line like a pendulum
    P.vy = Math.min(P.vy + TUNE.fallGrav * 0.75 * dt, TUNE.maxFall); P.vx += inp.x * TUNE.swingPump * dt;
    let cx = P.x, cy = P.y - 30; cx += P.vx * dt; cy += P.vy * dt;
    const dx = cx - hook.x, dy = cy - hook.y, d = Math.hypot(dx, dy);
    if (d > hook.len) { const nx = dx / d, ny = dy / d; cx = hook.x + nx * hook.len; cy = hook.y + ny * hook.len; const vr = P.vx * nx + P.vy * ny; P.vx -= vr * nx; P.vy -= vr * ny; }
    P.vx = Math.max(-560, Math.min(560, P.vx)); if (Math.abs(P.vx) > 20) P.f = Math.sign(P.vx);
    const hx = moveX(cx - P.x), hy = moveY(cy + 30 - P.y);
    if (!inp.hook || P.jumpBuf > 0 || hx || hy || P.ground) {   // let go: with a lift if she's on the way up
      if (!P.ground) { P.vx *= TUNE.swingLetGo; P.vy = Math.min(P.vy * TUNE.swingLetGo, P.vy < 0 ? P.vy - 120 : -120); }
      if (P.jumpBuf > 0) { P.jumpBuf = 0; P.vy = Math.min(P.vy, -TUNE.jumpV * 0.8); }
      letGo(); if (!P.ground) mark('release', 0.22);
    }
  } else {
    // running: quick to speed, quick to turn, quick to stop
    const top = TUNE.run * (1 + TUNE.chainBoost * P.chain);
    let ix = inp.x; if (P.wallLock > 0 && ix === P.wallFrom) ix = 0;
    if (P.ground && !P.sewing && !P.atk) {                    // the in-between moves on the ground: a snap turn, a skid, a quick start
      if (ix && Math.sign(P.vx) === -ix && Math.abs(P.vx) > 150 && !marked('turn')) { mark('turn', 0.2); P.turnFrom = Math.sign(P.vx); dust(P.x, P.y, 3); }
      else if (!ix && Math.abs(P.vx) > 170 && !marked('skid')) { mark('skid', 0.2); dust(P.x - Math.sign(P.vx) * 6, P.y, 3); }
      else if (ix && Math.abs(P.vx) < 30 && !marked('start')) mark('start', 0.1);
    }
    if (P.atk && P.atk.def.slide && P.ground) { P.vx = P.f * TUNE.slideV * Math.max(0, 1 - atkT() / atkLen()); }   // the slide carries her under things, dying off
    else if (P.atk && P.ground && !P.atk.def.slide) P.vx *= 0.75;   // feet planted for a swing on the ground
    else if (!P.sewing && !P.atk) {
      if (!P.ground && Math.abs(P.vx) > top && Math.sign(P.vx) !== -ix) {   // faster than she runs, off a yank or a swing: it eases off in the air
        P.vx -= Math.sign(P.vx) * Math.min(Math.abs(P.vx) - top, TUNE.airDrag * dt);
      } else {
        const a = (P.ground ? (ix ? TUNE.accel : TUNE.stop) : (ix ? TUNE.airAccel : 300)) * dt * (ix && Math.sign(P.vx) === -ix ? 1.8 : 1);
        P.vx += Math.max(-a, Math.min(a, ix * top - P.vx));
      }
      if (ix) P.f = ix;
    } else if (P.ground) P.vx *= 0.8;

    // a trunk beside her in the air: scamper up it a little, then slide down slowly
    P.wall = 0;
    if (!P.ground && ix && boxHits(P.x + ix * 3, P.y - 4)) P.wall = ix;
    if (P.wall) {
      if (P.scamper > 0 && P.vy > -TUNE.scamperV) { P.vy = -TUNE.scamperV; P.scamper -= dt; }
      else P.vy = Math.min(P.vy, TUNE.wallSlide);
    }

    // jumping: off the ground (or just after running off it), or off a trunk
    if (P.jumpBuf > 0 && !P.sewing && !(P.atk && P.ground)) {
      if (P.ground || P.coyote > 0) { P.vy = -TUNE.jumpV; P.ground = false; P.coyote = 0; P.jumpBuf = 0; P.jumpHeld = true; mark('spring', 0.08); dust(P.x, P.y, 2); P.bigJump = true; }
      else if (P.wall || boxHits(P.x + 5, P.y - 4) || boxHits(P.x - 5, P.y - 4)) {   // (a trunk on either side: pushing away from it as she jumps still kicks off it)
        const w = P.wall || (boxHits(P.x + 5, P.y - 4) ? 1 : -1); P.vx = -w * TUNE.wallJumpX; P.vy = -TUNE.wallJumpV; P.f = -w; P.wallFrom = w; P.wallLock = TUNE.wallLock;
        P.jumpBuf = 0; P.jumpHeld = true; P.scamper = TUNE.scamper * 0.5; P.wall = 0; mark('kick', 0.22); scratch(P.x + w * 9, P.y - 20);
      }
    }
    if (P.jumpHeld && (!inp.jump || P.vy >= 0)) { if (!inp.jump && P.vy < -TUNE.jumpCut && !P.airFromHook) { P.vy = -TUNE.jumpCut; P.bigJump = false; } P.jumpHeld = false; }
    let g = P.vy < 0 ? TUNE.riseGrav : TUNE.fallGrav;
    if (inp.jump && Math.abs(P.vy) < 90) g *= TUNE.apexGrav;  // a little hang at the top of a held jump
    if (!P.wall || P.vy < 0) P.vy = Math.min(P.vy + g * dt, TUNE.maxFall);
    const wasAir = !P.ground, fall = P.vy;
    moveX(P.vx * dt); moveY(P.vy * dt);
    if (P.ground) { P.coyote = TUNE.coyote; P.scamper = TUNE.scamper; P.bigJump = false; P.airHits = 0; } else P.coyote = Math.max(0, P.coyote - dt);
    if (P.ground && wasAir) {                               // landing: a clean one off the line keeps the speed going
      if (fall > 520) P.land = 0.08;
      if (Math.abs(P.vx) > 120) mark('landrun', 0.16); else if (fall > 300) mark('landing', 0.14);
      if (fall > 300) dust(P.x, P.y, fall > 600 ? 6 : 3);
      if (P.airFromHook) { if (Math.abs(P.vx) > 160) { P.chain = Math.min(TUNE.chainMax, P.chain + 1); if (P.chain > 1) pop('faster'); } else P.chain = 0; }
      P.airFromHook = false;
    }
    if (P.ground && Math.abs(P.vx) < 20 && !inp.x) { P.still += dt; if (P.still > 0.6) P.chain = 0; } else P.still = 0;
  }
  if (P.ground) for (const l of LEDGES) {                     // standing on a stretch's safe ledge: that's where a drop brings her back to
    const tx = P.x / T, ty = P.y / T;
    if (tx >= l.x0 && tx <= l.x1 + 1 && Math.abs(ty - l.at.y / T) < 0.6) P.check = l.at;
  }
  if (P.y > H * T + 40) dropped();

  // the attacks, built to her frames (ATTACKS)
  updateAttack(dt, swing || yank);
  // a yank straight into one is a hit too
  if (yank) for (const f of foes) if (!f.dead && Math.abs(f.x - P.x) < 22 && Math.abs(f.y - P.y) < 30 && !f.yanked) { f.yanked = 0.5; f.hp--; f.flash = 0.12; landedHit(); if (f.hp <= 0) f.dead = 6; }

  // the litter: back and forth, a touch hurts
  for (const f of foes) {
    f.flash = Math.max(0, f.flash - dt); f.yanked = Math.max(0, (f.yanked || 0) - dt);
    if (f.dead > 0) { f.dead -= dt; if (f.dead <= 0) { f.dead = 0; f.hp = 3; f.x = f.x0; f.y = f.y0; f.air = 0; } continue; }
    if (f.air > 0) { f.air -= dt; f.y += (f.vy || 0) * dt; f.vy = (f.vy || 0) + 1400 * dt; if (f.y >= f.y0) { f.y = f.y0; f.air = 0; f.vy = 0; } }   // launched up by the uppercut, and falling back
    f.x += f.vx * dt; if (Math.abs(f.x - f.x0) > 40) { f.vx = -f.vx; f.x = f.x0 + Math.sign(f.x - f.x0) * 40; }
    if (Math.abs(f.x - P.x) < 16 && P.y > f.y - 20 && P.y - 40 < f.y && !yank && !(P.atk && P.atk.def.low) && !f.air) hurt(f.x);   // (low to the ground she's under its reach)
  }
  for (const s of scraps) if (!s.got && Math.abs(s.x - P.x) < 14 && Math.abs(s.y - P.y) < 30) { s.got = true; P.spare = Math.min(TUNE.spareMax, P.spare + 1); pop('a scrap of yarn'); }
  for (const p of pops) { p.t -= dt; p.y -= 20 * dt; } while (pops.length && pops[0].t <= 0) pops.shift();
  P.anim += dt * (P.ground ? Math.max(0.6, Math.abs(P.vx) / TUNE.run) : 1);
  Object.assign(was, inp);
}

// ---------- drawing ----------
const sheet = new Image(), hooksImg = new Image(); let meta = null;
sheet.src = 'art/purl/purl_proto.png'; hooksImg.src = 'art/purl/purl_hooks.png';
fetch('art/purl/purl_proto.json').then(r => r.json()).then(j => { meta = j; }).catch(() => {});
const cam = { x: 0, y: 0 };

// which frame she's in: [animation, frame, facing], the in-between moves first (they're short), then what she's doing
function clipAt(fac, name, t) {                                // the frame of a clip t seconds in, by each frame's hold (60 a second)
  const A = meta.facings[fac].anims[name]; let s = 0;
  for (let i = 0; i < A.length; i++) { s += (A[i].hold || 2) / 60; if (t < s) return i; }
  return A.length - 1;
}
function frameFor() {
  const fac = P.f > 0 ? 'right' : 'left', other = P.f > 0 ? 'left' : 'right', bare = hook.state !== 'home';
  const has = n => !!meta.facings[fac].anims[n];
  const C = (n, t, f = fac) => has(n) ? [n, clipAt(f, n, t), f] : null;
  let r = null;
  if (P.sewing) r = P.sewT < 0.12 && has('sit_to_sew') ? C('sit_to_sew', P.sewT) : ['sew', Math.floor(P.sewT * 4) % 2, fac];
  else if (marked('rise')) r = C('rise_from_sewing', markT('rise'));
  else if (marked('hit')) r = C('hit', markT('hit'));
  else if (!P.ground && P.vy > 450 && P.y > (H - 7) * T) r = C('fall_tumble', (performance.now() / 1000) % 0.25);
  else if (P.atk) { const [k] = atkFrame(); r = [P.atk.def.clip, k, fac]; }
  else if (hook.state === 'stuck' && hook.mode === 'swing') {                  // on the line: the hang turned to where she is in the swing
    const ang = -Math.atan2(P.x - hook.x, (P.y - 30) - hook.y) * 180 / Math.PI, A = meta.facings[fac].anims.line_swing;
    let best = 0; for (let i = 1; i < A.length; i++) if (Math.abs((A[i].rot || 0) - ang) < Math.abs((A[best].rot || 0) - ang)) best = i;
    r = ['line_swing', best, fac];
  }
  else if (hook.state === 'stuck' && hook.mode === 'yank') r = ['yank', hook.yankT < 0.08 ? 0 : 1, fac];
  else if (marked('fling')) r = C('over_knot', markT('fling'));
  else if (marked('release')) r = C('swing_release', 0);
  else if (marked('mantle')) r = ['ledge_pullup', 1 + Math.min(2, Math.floor(markT('mantle') / 0.07)), fac];
  else if (marked('kick')) r = ['wall_kick', markT('kick') < 0.08 ? 1 : 2, P.f > 0 ? 'left' : 'right'];   // (the clip faces the trunk; these frames face away from it)
  else if (P.wall) r = P.vy < 0 ? ['trunk_scamper', Math.floor(performance.now() / 70) % 4, P.wall > 0 ? 'right' : 'left'] : ['trunk_slide', Math.floor(performance.now() / 160) % 2, P.wall > 0 ? 'right' : 'left'];
  else if (marked('throw')) r = P.ground ? ['throw_running', Math.min(2, Math.floor(markT('throw') / 0.06)), fac] : ['throw_air', Math.min(2, Math.floor(markT('throw') / 0.06)), fac];
  else if (marked('drop')) r = ['drop_through', markT('drop') < 0.06 ? 0 : 1, fac];
  else if (!P.ground) {
    if (bare) r = ['air_bare', 0, fac];
    else if (marked('spring')) r = ['jump', 1, fac];
    else r = ['jump', P.vy < -230 ? 2 : P.vy < 230 ? (P.bigJump ? 3 : (P.vy < 0 ? 2 : 4)) : 4, fac];   // (the loose curl at the top only on a big jump; a little hop goes straight from the rise to the fall)
  }
  else if (marked('landrun')) r = C('land_run', markT('landrun'));
  else if (marked('landing')) r = ['jump', 5, fac];
  else if (P.land > 0) r = ['land', 0, fac];
  else if (marked('turn')) r = ['snap_turn', Math.min(3, Math.floor(markT('turn') / 0.05)), P.turnFrom > 0 ? 'right' : 'left'];   // (the clip of the way she was going: its last frame faces the new way)
  else if (marked('skid')) r = ['skid', markT('skid') < 0.1 ? 0 : 1, Math.abs(P.vx) > 5 ? (P.vx > 0 ? 'right' : 'left') : fac];
  else if (marked('start')) r = ['start_bound', markT('start') < 0.05 ? 0 : 1, fac];
  else if (marked('catch') && Math.abs(P.vx) > 20) r = ['yarn_return', markT('catch') < 0.06 ? 0 : 1, fac];
  else if (Math.abs(P.vx) > 20) r = [bare ? 'run_bare' : 'run', Math.floor(P.anim * 13) % 8, fac];
  else r = ['idle', Math.floor(P.anim * 6) % 12, fac];
  if (!r || !meta.facings[r[2]].anims[r[0]]) r = [P.ground ? 'idle' : 'air', 0, fac];
  return r;
}
function drawPurl() {
  if (!meta || !sheet.complete) { ctx.fillStyle = '#c87a40'; ctx.fillRect(P.x - cam.x - 8, P.y - cam.y - 60, 16, 60); return null; }
  const [name, k, fac] = frameFor(), fm = meta.facings[fac];
  const fr = fm.anims[name][Math.min(k, fm.anims[name].length - 1)];
  const [cw, ch] = meta.cell, sx = (fr.i % meta.cols) * cw, sy = Math.floor(fr.i / meta.cols) * ch;
  let dx, dy;
  if (fr.mid && !P.ground && !(hook.state === 'stuck' && hook.mode === 'swing')) { dx = Math.round(P.x - fr.mid[0] - cam.x); dy = Math.round(P.y - 28 - fr.mid[1] - cam.y); }   // in the air every frame sits on the middle of her body, so she doesn't shift between moves
  else { dx = Math.round(P.x - (fr.fx ?? fm.feet_x) - cam.x); dy = Math.round(P.y - (fr.fy ?? meta.floor) - cam.y); }
  P.frameNow = name + ' ' + k + ' ' + fac;
  if (P.inv > 0 && Math.floor(P.inv * 20) % 2) ctx.globalAlpha = 0.5;
  ctx.drawImage(sheet, sx, sy, cw, ch, dx, dy, cw, ch); ctx.globalAlpha = 1;
  return fr.tail ? { x: dx + fr.tail[0] + cam.x, y: dy + fr.tail[1] + cam.y } : tailPoint();
}
function drawYarn(from, to, slack) {
  const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2 + slack, n = Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / 1.5) + 2;
  for (let i = 0; i <= n; i++) {
    const t = i / n, x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * mx + t * t * to.x, y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * my + t * t * to.y;
    ctx.fillStyle = i % 9 === 0 ? '#a24c72' : '#7a2a52'; ctx.fillRect(Math.round(x - cam.x), Math.round(y - cam.y), 1, 1);
  }
}
function drawHook(x, y, ang) {
  if (!meta || !hooksImg.complete) { ctx.fillStyle = '#9ab4dc'; ctx.fillRect(Math.round(x - cam.x) - 2, Math.round(y - cam.y) - 2, 4, 4); return { x, y }; }
  let a = ((ang % 360) + 360) % 360; const k = Math.round(a / 22.5) % 16, h = meta.hooks[k];
  const gx = h.grip[0], gy = h.grip[1];
  ctx.drawImage(hooksImg, h.x, 0, h.w, h.h, Math.round(x - gx - cam.x), Math.round(y - gy - cam.y), h.w, h.h);
  return { x: x - gx + h.butt[0], y: y - gy + h.butt[1] };
}
function drawWorld() {
  const g = ctx.createLinearGradient(0, 0, 0, VH); g.addColorStop(0, '#f2d58a'); g.addColorStop(0.55, '#d9a860'); g.addColorStop(1, '#6a5a3a');
  ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
  for (let layer = 0; layer < 3; layer++) {                  // leaves far back, drifting with the camera at their own pace
    const f = 0.15 + layer * 0.22, col = ['#b48a4c', '#8a7038', '#5f5a2c'][layer];
    ctx.fillStyle = col;
    for (let i = 0; i < 40; i++) {
      const x = ((i * 173 + layer * 61) % 1400) - (cam.x * f) % 1400, y = 40 + ((i * 97 + layer * 37) % 260) - cam.y * f * 0.5;
      for (const ox of [0, 1400]) { ctx.beginPath(); ctx.ellipse(x + ox, y, 26 + layer * 8, 14 + layer * 5, 0, 0, 7); ctx.fill(); }
    }
  }
  for (let x = Math.floor(cam.x / T); x <= Math.floor(cam.x / T) + VW / T + 1; x++) if (!at(x, 38) && x >= 0 && x < W) {   // nothing to catch her here: the park far below, small and hazy
    const px = x * T - cam.x, py = 38 * T - cam.y; ctx.fillStyle = 'rgba(40,50,40,0.55)'; ctx.fillRect(px, py - 6, T, 200);
    ctx.fillStyle = 'rgba(90,110,80,0.5)'; if ((x * 13) % 7 < 3) ctx.fillRect(px + 3, py - 10, 8, 4);
  }
  const x0 = Math.floor(cam.x / T), x1 = x0 + VW / T + 1, y0 = Math.floor(cam.y / T), y1 = y0 + VH / T + 1;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const t = at(x, y); if (!t || y >= H) continue;
    const px = x * T - cam.x, py = y * T - cam.y;
    if (t === 1) { ctx.fillStyle = y >= 38 ? '#3a2c1e' : '#6a4a2c'; ctx.fillRect(px, py, T, T); if (at(x, y - 1) !== 1) { ctx.fillStyle = '#8a6a40'; ctx.fillRect(px, py, T, 3); } }
    else { ctx.fillStyle = '#7a5a34'; ctx.fillRect(px, py + 2, T, 4); ctx.fillStyle = '#5a7a34'; if ((x * 7) % 5 === 0) ctx.fillRect(px + 4, py - 3, 6, 4); }
  }
  for (const k of knots) {                                    // knots in the bark: always drawn the same, so they can be spotted
    const px = k.x - cam.x, py = k.y - cam.y; ctx.fillStyle = '#4a3420'; ctx.beginPath(); ctx.ellipse(px, py, 7, 6, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#8a6a40'; ctx.beginPath(); ctx.ellipse(px, py, 4, 3, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#2a1c10'; ctx.fillRect(px - 1, py - 1, 2, 2);
  }
  // what the hook will catch: every knot in reach gets a faint ring, and the one a throw goes to now gets bright
  // brackets round it and a dotted line out to it from her, so it's never a guess (10/23/2026)
  const target = hook.state === 'home' && !P.sewing ? pickKnot() : null, now = performance.now();
  for (const k of knots) {
    if (k === target || Math.hypot(k.x - P.x, k.y - (P.y - 30)) > TUNE.reach) continue;
    ctx.strokeStyle = 'rgba(255,240,200,0.35)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(k.x - cam.x, k.y - cam.y, 10, 0, 7); ctx.stroke();
  }
  if (target) {
    const tx = target.x - cam.x, ty = target.y - cam.y, r = 13 + Math.sin(now / 110) * 1.5, l = 6;
    ctx.strokeStyle = '#fff1b0'; ctx.lineWidth = 2;
    for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
      ctx.beginPath(); ctx.moveTo(tx + sx * r, ty + sy * (r - l)); ctx.lineTo(tx + sx * r, ty + sy * r); ctx.lineTo(tx + sx * (r - l), ty + sy * r); ctx.stroke();
    }
    const fx = P.x - cam.x, fy = P.y - 40 - cam.y, d = Math.hypot(tx - fx, ty - fy);
    ctx.fillStyle = 'rgba(255,241,176,0.55)';
    for (let i = 14; i < d - 16; i += 9) ctx.fillRect(fx + (tx - fx) * i / d - 1, fy + (ty - fy) * i / d - 1, 2, 2);
  }
  for (const s of signs) {                                    // the signs: a little post (what it says is shown along the top, see drawHUD)
    const px = s.x - cam.x, py = s.y - cam.y; if (px < -20 || px > VW + 20) continue;
    ctx.fillStyle = '#5a3e24'; ctx.fillRect(px - 1, py - 26, 3, 26); ctx.fillStyle = '#c9a46a'; ctx.fillRect(px - 9, py - 32, 19, 10);
  }
  for (const s of scraps) if (!s.got) { ctx.fillStyle = '#c86a9a'; ctx.fillRect(s.x - cam.x - 3, s.y - cam.y - 6, 6, 3); ctx.fillRect(s.x - cam.x - 1, s.y - cam.y - 8, 3, 7); }
  for (const f of foes) {
    if (f.dead) continue;
    const px = f.x - cam.x, py = f.y - cam.y;
    ctx.fillStyle = f.flash > 0 ? '#ffffff' : '#2a2030'; ctx.beginPath(); ctx.ellipse(px, py - 10, 12, 10, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#e04a5a'; ctx.fillRect(px - 5 + Math.sign(f.vx) * 3, py - 14, 3, 3); ctx.fillRect(px + 2 + Math.sign(f.vx) * 3, py - 14, 3, 3);
  }
}
function drawHUD() {
  // the sign she last passed (or is coming up to), along the top of the screen while she's in its stretch
  let near = null; for (const s of signs) if (P.x > s.x - 5 * T) near = s;
  if (near && P.x < near.x + 26 * T) {
    ctx.font = '12px system-ui'; const w = ctx.measureText(near.text).width, bx = Math.round(VW / 2 - w / 2);
    ctx.fillStyle = 'rgba(30,24,20,0.72)'; ctx.fillRect(bx - 8, 58, w + 16, 20);
    ctx.fillStyle = '#fff3d6'; ctx.fillText(near.text, bx, 72);
  }
  for (let i = 0; i < TUNE.health; i++) {
    const x = 12 + i * 16, y = 12, filled = i < P.health, loose = i === P.health && P.loose > 0;
    ctx.fillStyle = filled ? '#f0e6d2' : loose ? `rgba(240,230,210,${0.3 + 0.3 * Math.sin(performance.now() / 90)})` : '#3a3440';
    ctx.beginPath(); ctx.arc(x + 6, y + 6, 6, 0, 7); ctx.fill();
    if (loose) { ctx.fillStyle = '#c86a9a'; ctx.fillRect(x, y + 15, 12 * P.looseT / TUNE.rallyTime, 2); }
  }
  ctx.fillStyle = '#c86a9a'; ctx.font = '10px system-ui'; ctx.fillText(`spare yarn ${P.spare}`, 12, 40);
  if (P.chain) { ctx.fillStyle = '#ffe08a'; ctx.fillText('speed ' + '>'.repeat(P.chain), 12, 54); }
  if (P.sewing) { ctx.strokeStyle = '#f0e6d2'; ctx.beginPath(); ctx.arc(P.x - cam.x, P.y - cam.y - 84, 7, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * P.sewT / TUNE.sewTime); ctx.stroke(); }
  for (const p of pops) if (p.text) { ctx.globalAlpha = Math.min(1, p.t * 2); ctx.fillStyle = '#fff6dc'; ctx.fillText(p.text, p.x - cam.x - ctx.measureText(p.text).width / 2, p.y - cam.y); ctx.globalAlpha = 1; }
}
function render() {
  cam.x += ((P.x + P.f * (50 + Math.min(110, Math.abs(P.vx) * 0.25)) - VW / 2) - cam.x) * 0.12; cam.y += ((P.y - VH * 0.6) - cam.y) * 0.1;
  cam.x = Math.max(0, Math.min(W * T - VW, cam.x)); cam.y = Math.max(-80, Math.min(H * T - VH + 40, cam.y));
  ctx.setTransform(S, 0, 0, S, 0, 0); ctx.imageSmoothingEnabled = false;
  drawWorld();
  for (const c of scratches) { ctx.globalAlpha = Math.min(1, c.t * 2); ctx.fillStyle = '#2a1a10'; ctx.fillRect(Math.round(c.x - cam.x), Math.round(c.y - cam.y), 1, 5); ctx.fillRect(Math.round(c.x - cam.x) + 2, Math.round(c.y - cam.y) + 1, 1, 4); ctx.globalAlpha = 1; }
  for (const d of dusts) { ctx.globalAlpha = Math.min(0.8, d.t * 2); ctx.fillStyle = '#d8c39a'; const z = d.t > 0.25 ? 3 : 2; ctx.fillRect(Math.round(d.x - cam.x), Math.round(d.y - cam.y), z, z); ctx.globalAlpha = 1; }
  const tail = drawPurl() || tailPoint();
  if (hook.state !== 'home') {
    const ang = hook.state === 'reel' ? 180 + Math.atan2(tail.x - hook.x, -(tail.y - hook.y)) * 180 / Math.PI : Math.atan2(hook.x - tail.x, -(hook.y - tail.y)) * 180 / Math.PI;
    const butt = drawHook(hook.x, hook.y, ang);
    drawYarn(tail, butt, hook.state === 'stuck' && hook.mode === 'swing' ? 0 : hook.state === 'stuck' ? 2 : 10);
  }
  drawHUD();
}

let last = performance.now(), acc = 0;
function loop(now) {
  acc += Math.min(0.1, (now - last) / 1000); last = now;
  while (acc >= 1 / 120) { if (!window.__purlHold) update(1 / 120); acc -= 1 / 120; }   // (__purlHold: the tests step it themselves)
  render(); requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
window.__purl = { P, hook, knots, foes, TUNE, LEDGES, keys, update, reset, at, render, frameFor };
