'use strict';
// ---------- Purl, a test run (10/23/2026) ----------
// A course in the treetops to try how she moves before the Canopy's built: her bound, the hook thrown at a knot to yank
// herself to it (tap) or swing from it (hold), the yarn reeling back in while she runs, the thrust, and her two ways of
// mending: winning loose yarn back by hitting back fast (the rally), and sitting to crochet herself closed when she's
// got a breather (sewing, which uses spare yarn). On its own page, so nothing in the game is touched.
// Her frames are made by Source/Sprites/purl_proto_sheet.py.

const T = 16, VW = 640, VH = 360;
const C = document.getElementById('c'), ctx = C.getContext('2d');
let S = 2;
function fit() { S = Math.max(1, Math.floor(Math.min(innerWidth / VW, (innerHeight - 30) / VH))); C.width = VW * S; C.height = VH * S; ctx.imageSmoothingEnabled = false; }
addEventListener('resize', fit); fit();

// ---------- tuning: first picks, all in one place ----------
const TUNE = {
  run: 150, chainBoost: 0.22, chainMax: 3, accel: 900, airAccel: 520, jumpV: 370, gravity: 1050, maxFall: 620, jumpCut: 0.45,
  reach: 208, hookSpeed: 950, yankSpeed: 470, yankMax: 0.6, holdForSwing: 0.18, reel: 1100, swingMin: 48,
  rallyTime: 4, rallyHits: 3, spareMax: 9, sewTime: 1.4, sewCost: 2, health: 5,
};

// ---------- the course: branches, twigs, knots ----------
const W = 210, H = 40;
const tiles = new Uint8Array(W * H);                     // 0 open, 1 solid wood, 2 a twig (stand on it from above)
const knots = [], foes = [], scraps = [];
const at = (x, y) => (x < 0 || x >= W) ? 1 : (y < 0 || y >= H) ? 0 : tiles[y * W + x];
function wood(x0, x1, y0, y1) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) tiles[y * W + x] = 1; }
function twig(x0, x1, y) { for (let x = x0; x <= x1; x++) if (!tiles[y * W + x]) tiles[y * W + x] = 2; }
function knot(x, y) { knots.push({ x: x * T + 8, y: y * T + 8 }); }
function foe(x, y) { foes.push({ x: x * T + 8, y: y * T, x0: x * T + 8, vx: 30, hp: 3, flash: 0, dead: 0, f: 1 }); }
function scrap(x, y) { scraps.push({ x: x * T + 8, y: y * T + 2, got: false }); }
(function build() {
  wood(0, 95, 38, 39);                                   // the first part has a floor under it: a miss is caught while she's learning
  // past that, real drops (10/23/2026): a fall costs a heart and puts her back on the safe ledge at the start of the stretch she was on
  wood(0, 40, 30, 31); knot(20, 22); knot(31, 20);      // a broad bough to start on, knots overhead to try the throw
  for (let i = 0; i < 4; i++) twig(41 + i * 4, 43 + i * 4, 34 - i);   // a way back up from the floor
  knot(48, 21);                                          // the first gap: one throw across
  wood(56, 90, 28, 29); foe(66, 28); foe(80, 28); scrap(73, 28);
  for (let i = 0; i < 6; i++) twig(84 - i * 5, 87 - i * 5, 36 - i * 1.5 | 0);
  knot(99, 19); knot(111, 16); knot(123, 18);            // the long gap: a chain, or swing it
  twig(104, 108, 33); twig(116, 120, 31);
  wood(130, 158, 24, 25); foe(144, 24); scrap(150, 24);
  wood(160, 163, 6, 30);                                 // a trunk: up the knots on its side to the top
  knot(156, 17); knot(158, 9);
  wood(150, 186, 6, 7); foe(176, 6); scrap(184, 6);
  twig(166, 172, 18); twig(170, 176, 26); twig(164, 168, 33);
  knot(192, 12);
  wood(196, W - 1, 22, 23); scrap(204, 22);              // the end
})();
const START = { x: 6 * T, y: 30 * T };
const LEDGES = [{ x0: 0, x1: 40, at: START }, { x0: 56, x1: 90, at: { x: 58 * T, y: 28 * T } }, { x0: 130, x1: 158, at: { x: 132 * T, y: 24 * T } },
  { x0: 150, x1: 186, at: { x: 152 * T, y: 6 * T }, top: true }, { x0: 196, x1: W, at: { x: 198 * T, y: 22 * T } }];   // the safe ledges each stretch starts from

// ---------- input: keyboard and a controller ----------
const keys = {};
addEventListener('keydown', e => { keys[e.code] = true; if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault(); });
addEventListener('keyup', e => { keys[e.code] = false; });
const inp = { x: 0, jump: false, attack: false, hook: false, sew: false, reset: false };
const was = {};
function readInput() {
  const pad = (navigator.getGamepads ? [...navigator.getGamepads()].find(p => p) : null);
  const b = i => !!(pad && pad.buttons[i] && pad.buttons[i].pressed);
  let x = (keys.ArrowRight || keys.KeyD ? 1 : 0) - (keys.ArrowLeft || keys.KeyA ? 1 : 0);
  if (pad) { const ax = pad.axes[0] || 0; if (Math.abs(ax) > 0.35) x = Math.sign(ax); if (b(15)) x = 1; if (b(14)) x = -1; }
  inp.x = x;
  inp.jump = keys.KeyZ || keys.Space || b(0);
  inp.attack = keys.KeyX || b(5);
  inp.hook = keys.KeyC || b(7) || b(2);
  inp.sew = keys.KeyV || b(4);
  inp.reset = keys.KeyR || b(8);
}
const pressed = k => inp[k] && !was[k];

// ---------- her ----------
const P = { x: START.x, y: START.y, vx: 0, vy: 0, f: 1, ground: false, hw: 9, h: 50, health: TUNE.health, loose: 0, looseT: 0, rally: 0,
  spare: 2, sewT: 0, sewing: false, chain: 0, airFromHook: false, still: 0, inv: 0, atk: 0, land: 0, anim: 0, hurtT: 0 };
const hook = { state: 'home', x: 0, y: 0, tx: 0, ty: 0, knot: null, held: 0, len: 0, yankT: 0, missT: 0, mode: null };

function solidAt(px, py) { return at(Math.floor(px / T), Math.floor(py / T)) === 1; }
function twigAt(px, py) { return at(Math.floor(px / T), Math.floor(py / T)) === 2; }
function boxHits(x, y) {                                   // her box with its feet at x, y
  for (let yy = y - P.h; yy < y; yy += 8) for (const xx of [x - P.hw, x, x + P.hw]) if (solidAt(xx, yy)) return true;
  for (const xx of [x - P.hw, x, x + P.hw]) if (solidAt(xx, y - 0.01)) return true;
  return false;
}
function moveX(dx) {
  const steps = Math.ceil(Math.abs(dx) / 4) || 1;
  for (let i = 0; i < steps; i++) { const nx = P.x + dx / steps; if (boxHits(nx, P.y)) { P.vx = 0; return true; } P.x = nx; }
  return false;
}
function moveY(dy) {
  const steps = Math.ceil(Math.abs(dy) / 4) || 1;
  P.ground = false;
  for (let i = 0; i < steps; i++) {
    const ny = P.y + dy / steps;
    if (dy > 0) {
      const footRowWas = Math.floor((P.y - 0.01) / T), footRow = Math.floor((ny - 0.01) / T);
      const onTwig = footRow > footRowWas && [P.x - P.hw, P.x, P.x + P.hw].some(xx => twigAt(xx, ny - 0.01)) && !(inp.x === 0 && keys.ArrowDown);
      if (boxHits(P.x, ny) || onTwig) { P.y = onTwig ? footRow * T : Math.floor(ny / T) * T; P.vy = 0; P.ground = true; return true; }
    } else if (boxHits(P.x, ny)) { P.vy = 0; return true; }
    P.y = ny;
  }
  return false;
}
function tailPoint() {                                     // where the yarn leaves her: near her tail, at her back and low
  return { x: P.x - P.f * 22, y: P.y - 14 };
}

// ---------- the hook ----------
function pickKnot() {
  let best = null, bd = 1e9;
  for (const k of knots) {
    const dx = k.x - P.x, dy = k.y - (P.y - 30), d = Math.hypot(dx, dy);
    if (d > TUNE.reach || dx * P.f < -24) continue;        // in reach, and not behind her
    const score = d - (dy < 0 ? 30 : 0) - dx * P.f * 0.2;   // up and ahead a little preferred
    if (score < bd) { bd = score; best = k; }
  }
  return best;
}
function throwHook() {
  hook.x = P.x + P.f * 10; hook.y = P.y - 40; hook.held = 0; hook.mode = null;
  const k = pickKnot();
  if (k) { hook.state = 'fly'; hook.knot = k; hook.tx = k.x; hook.ty = k.y; }
  else { hook.state = 'miss'; hook.knot = null; hook.tx = P.x + P.f * TUNE.reach * 0.85; hook.ty = P.y - 30 - TUNE.reach * 0.5; hook.missT = 0; }
  P.throwT = 0.18; P.sewing = false; P.sewT = 0;
}
function letGo() {
  if (hook.state !== 'stuck') return;
  hook.state = 'reel'; hook.mode = null; P.airFromHook = true;
}
function updateHook(dt) {
  if (hook.state === 'home') return;
  if (inp.hook) hook.held += dt;
  const tp = tailPoint();
  if (hook.state === 'fly' || hook.state === 'miss') {
    const dx = hook.tx - hook.x, dy = hook.ty - hook.y, d = Math.hypot(dx, dy), s = TUNE.hookSpeed * dt;
    if (d <= s) {
      hook.x = hook.tx; hook.y = hook.ty;
      if (hook.state === 'miss') { hook.state = 'reel'; return; }
      hook.state = 'stuck'; hook.len = Math.max(TUNE.swingMin, Math.hypot(hook.x - P.x, hook.y - (P.y - 30)));
      hook.mode = (inp.hook && hook.held >= TUNE.holdForSwing) ? 'swing' : 'yank'; hook.yankT = 0; P.sewing = false;
      return;
    }
    hook.x += dx / d * s; hook.y += dy / d * s;
    return;
  }
  if (hook.state === 'stuck') {
    if (hook.mode === 'yank' && inp.hook && hook.held >= TUNE.holdForSwing && hook.yankT < 0.08) hook.mode = 'swing';   // held on: a swing after all
    if (hook.mode === 'swing' && (!inp.hook || pressed('jump'))) { if (pressed('jump')) P.vy = Math.min(P.vy, -220); letGo(); }
    return;
  }
  if (hook.state === 'reel') {                             // back to her tail, while she keeps going
    const dx = tp.x - hook.x, dy = tp.y - hook.y, d = Math.hypot(dx, dy), s = TUNE.reel * dt;
    if (d <= s + 4) { hook.state = 'home'; return; }
    hook.x += dx / d * s; hook.y += dy / d * s;
  }
}

// ---------- her moves ----------
function hurt(fromX) {
  if (P.inv > 0) return;
  if (P.loose > 0) P.loose = 0;                            // loose yarn not won back is gone for good
  P.health -= 1; P.loose = 1; P.looseT = TUNE.rallyTime; P.rally = 0;
  P.inv = 1.0; P.hurtT = 0.25; P.vx = Math.sign(P.x - fromX || -P.f) * 180; P.vy = -220; P.chain = 0; P.sewing = false; P.sewT = 0;
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
const pops = [];
function pop(text) { pops.push({ text, x: P.x, y: P.y - 80, t: 1.2 }); }
function dropped() {                                       // off into the open: a heart, and back to the ledge the stretch started from
  P.health -= 1; P.loose = 0; P.chain = 0; P.sewing = false; P.sewT = 0; hook.state = 'home';
  if (P.health <= 0) { reset(); return; }
  const c = P.check || START; P.x = c.x; P.y = c.y; P.vx = 0; P.vy = 0; P.inv = 1.0; P.airFromHook = false; pop('a fall: lost a bit of yarn');
}
function reset() { P.check = null; Object.assign(P, { x: START.x, y: START.y, vx: 0, vy: 0, health: TUNE.health, loose: 0, chain: 0, inv: 0, sewing: false, sewT: 0 }); hook.state = 'home'; for (const f of foes) { f.dead = 0; f.hp = 3; } }

function update(dt) {
  readInput();
  if (pressed('reset')) reset();
  P.inv = Math.max(0, P.inv - dt); P.hurtT = Math.max(0, P.hurtT - dt); P.land = Math.max(0, P.land - dt); P.throwT = Math.max(0, (P.throwT || 0) - dt);
  if (P.loose > 0) { P.looseT -= dt; if (P.looseT <= 0) { P.loose = 0; pop('it frayed off'); } }

  // sewing: standing still, holding the button, with spare yarn
  const canSew = P.ground && Math.abs(P.vx) < 5 && inp.x === 0 && hook.state === 'home' && P.atk <= 0;
  if (inp.sew && canSew && P.health < TUNE.health && P.spare >= TUNE.sewCost) {
    P.sewing = true; P.sewT += dt;
    if (P.sewT >= TUNE.sewTime) { P.sewT = 0; P.spare -= TUNE.sewCost; P.health = Math.min(TUNE.health, P.health + 1); pop('sewn up'); }
  } else { P.sewing = false; P.sewT = 0; }

  // the hook
  if (pressed('hook') && hook.state === 'home' && !P.sewing) throwHook();
  updateHook(dt);
  const yank = hook.state === 'stuck' && hook.mode === 'yank', swing = hook.state === 'stuck' && hook.mode === 'swing';

  if (yank) {                                               // pulled to the knot, then let go with the speed
    hook.yankT += dt;
    const tx = hook.x, ty = hook.y + 34, dx = tx - P.x, dy = ty - P.y, d = Math.hypot(dx, dy);
    P.vx = dx / d * TUNE.yankSpeed; P.vy = dy / d * TUNE.yankSpeed; P.f = Math.sign(dx) || P.f;
    if (d < 22 || hook.yankT > TUNE.yankMax || pressed('jump')) { if (pressed('jump')) P.vy = Math.min(P.vy, -260); else P.vy = Math.min(P.vy, -120); letGo(); }
  } else if (swing) {                                       // on the line like a pendulum
    P.vy = Math.min(P.vy + TUNE.gravity * dt, TUNE.maxFall); P.vx += inp.x * 260 * dt;
    let cx = P.x, cy = P.y - 30; cx += P.vx * dt; cy += P.vy * dt;
    const dx = cx - hook.x, dy = cy - hook.y, d = Math.hypot(dx, dy);
    if (d > hook.len) { const nx = dx / d, ny = dy / d; cx = hook.x + nx * hook.len; cy = hook.y + ny * hook.len; const vr = P.vx * nx + P.vy * ny; P.vx -= vr * nx; P.vy -= vr * ny; }
    P.vx = Math.max(-520, Math.min(520, P.vx)); if (Math.abs(P.vx) > 20) P.f = Math.sign(P.vx);
    if (moveX(cx - P.x)) letGo(); if (moveY(cy + 30 - P.y)) letGo();
  } else {
    const top = TUNE.run * (1 + TUNE.chainBoost * P.chain);
    if (!P.sewing && P.atk <= 0) {
      const want = inp.x * top, a = (P.ground ? TUNE.accel : TUNE.airAccel) * dt;
      if (P.ground || inp.x) P.vx += Math.max(-a, Math.min(a, want - P.vx));
      if (inp.x) P.f = inp.x;
    } else if (P.ground) P.vx *= 0.8;
    if (pressed('jump') && P.ground && !P.sewing) { P.vy = -TUNE.jumpV; P.ground = false; }
    if (!inp.jump && P.vy < 0 && !P.airFromHook) P.vy *= (1 - TUNE.jumpCut * dt * 10);
    P.vy = Math.min(P.vy + TUNE.gravity * dt, TUNE.maxFall);
    const wasAir = !P.ground, fall = P.vy;
    moveX(P.vx * dt); moveY(P.vy * dt);
    if (P.ground && wasAir) {                               // landing: a clean one off the line keeps the speed going
      if (fall > 380) P.land = 0.12;
      if (P.airFromHook) { if (Math.abs(P.vx) > 150 && fall < 560) { P.chain = Math.min(TUNE.chainMax, P.chain + 1); if (P.chain > 1) pop('faster'); } else P.chain = 0; }
      P.airFromHook = false;
    }
    if (P.ground && Math.abs(P.vx) < 20 && !inp.x) { P.still += dt; if (P.still > 0.6) P.chain = 0; } else P.still = 0;
  }
  if (P.ground) for (const l of LEDGES) {                     // standing on a stretch's safe ledge: that's where a drop brings her back to
    const tx = P.x / T, ty = P.y / T;
    if (tx >= l.x0 && tx <= l.x1 && Math.abs(ty - l.at.y / T) < 0.6) P.check = l.at;
  }
  if (P.y > H * T + 40) dropped();

  // the thrust
  if (pressed('attack') && P.atk <= 0 && !P.sewing && !swing && !yank) { P.atk = 0.32; P.hitDone = false; }
  if (P.atk > 0) {
    P.atk -= dt;
    if (!P.hitDone && P.atk < 0.24 && P.atk > 0.12) {
      const box = { l: P.f > 0 ? P.x + 6 : P.x - 52, r: P.f > 0 ? P.x + 52 : P.x - 6, t: P.y - 48, b: P.y - 18 };
      for (const f of foes) if (!f.dead && f.x + 10 > box.l && f.x - 10 < box.r && f.y - 2 > box.t && f.y - 22 < box.b) {
        f.hp--; f.flash = 0.12; f.x += P.f * 10; P.hitDone = true; landedHit();
        if (f.hp <= 0) { f.dead = 6; pop('knocked out'); }
      }
    }
  }
  // a yank straight into one is a hit too
  if (yank) for (const f of foes) if (!f.dead && Math.abs(f.x - P.x) < 22 && Math.abs(f.y - P.y) < 30 && !f.yanked) { f.yanked = 0.5; f.hp--; f.flash = 0.12; landedHit(); if (f.hp <= 0) f.dead = 6; }

  // the litter: back and forth, a touch hurts
  for (const f of foes) {
    f.flash = Math.max(0, f.flash - dt); f.yanked = Math.max(0, (f.yanked || 0) - dt);
    if (f.dead > 0) { f.dead -= dt; if (f.dead <= 0) { f.dead = 0; f.hp = 3; f.x = f.x0; } continue; }
    f.x += f.vx * dt; if (Math.abs(f.x - f.x0) > 40) { f.vx = -f.vx; f.x = f.x0 + Math.sign(f.x - f.x0) * 40; }
    if (Math.abs(f.x - P.x) < 16 && P.y > f.y - 20 && P.y - 40 < f.y && !yank) hurt(f.x);
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

function frameFor() {
  const bare = hook.state !== 'home';
  if (P.sewing) return ['sew', Math.floor(P.sewT * 4) % 2];
  if (P.atk > 0) return ['attack', Math.min(3, Math.floor((0.32 - P.atk) / 0.08))];
  if (hook.state === 'stuck' && hook.mode === 'swing') return ['swing', 0];
  if (hook.state === 'stuck' && hook.mode === 'yank') return ['zip', 0];
  if (P.throwT > 0 && P.ground) return ['throw', P.throwT > 0.09 ? 0 : 1];
  if (!P.ground) return [bare ? 'air_bare' : 'air', 0];
  if (P.land > 0) return ['land', 0];
  if (Math.abs(P.vx) > 20) return [bare ? 'run_bare' : 'run', Math.floor(P.anim * 13) % 8];
  return ['idle', Math.floor(P.anim * 6) % 12];
}
function drawPurl() {
  if (!meta || !sheet.complete) { ctx.fillStyle = '#c87a40'; ctx.fillRect(P.x - cam.x - 8, P.y - cam.y - 60, 16, 60); return null; }
  const fac = P.f > 0 ? 'right' : 'left', fm = meta.facings[fac], [name, k] = frameFor();
  const fr = fm.anims[name][Math.min(k, fm.anims[name].length - 1)];
  const [cw, ch] = meta.cell, sx = (fr.i % meta.cols) * cw, sy = Math.floor(fr.i / meta.cols) * ch;
  const dx = Math.round(P.x - fm.feet_x - cam.x), dy = Math.round(P.y - meta.floor - cam.y);
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
  const target = hook.state === 'home' && !P.sewing ? pickKnot() : null;
  if (target) { ctx.strokeStyle = 'rgba(255,240,200,0.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(target.x - cam.x, target.y - cam.y, 10 + Math.sin(performance.now() / 120), 0, 7); ctx.stroke(); }
  for (const s of scraps) if (!s.got) { ctx.fillStyle = '#c86a9a'; ctx.fillRect(s.x - cam.x - 3, s.y - cam.y - 6, 6, 3); ctx.fillRect(s.x - cam.x - 1, s.y - cam.y - 8, 3, 7); }
  for (const f of foes) {
    if (f.dead) continue;
    const px = f.x - cam.x, py = f.y - cam.y;
    ctx.fillStyle = f.flash > 0 ? '#ffffff' : '#2a2030'; ctx.beginPath(); ctx.ellipse(px, py - 10, 12, 10, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#e04a5a'; ctx.fillRect(px - 5 + Math.sign(f.vx) * 3, py - 14, 3, 3); ctx.fillRect(px + 2 + Math.sign(f.vx) * 3, py - 14, 3, 3);
  }
}
function drawHUD() {
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
  cam.x += ((P.x + P.f * 40 - VW / 2) - cam.x) * 0.12; cam.y += ((P.y - VH * 0.6) - cam.y) * 0.1;
  cam.x = Math.max(0, Math.min(W * T - VW, cam.x)); cam.y = Math.max(-80, Math.min(H * T - VH + 40, cam.y));
  ctx.setTransform(S, 0, 0, S, 0, 0); ctx.imageSmoothingEnabled = false;
  drawWorld();
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
  while (acc >= 1 / 120) { update(1 / 120); acc -= 1 / 120; }
  render(); requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
window.__purl = { P, hook, knots, foes, TUNE, update, reset };
