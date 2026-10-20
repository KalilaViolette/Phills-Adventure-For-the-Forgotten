'use strict';
// ---------- the Playground: the spin, the fluff burst, cranks, the Playground's litter and the Forgotten ----------
// The squeak button does three things once he knows them: on its own the squeak, with {up} the spin (whirling round
// like the merry-go-round, hitting all round him and turning cranks), with {down} the fluff burst (a puff of his own
// stuffing that knocks everything back and blows sand away).

const specialCost = base => (wearing('party_hat') ? Math.round(base * 0.65) : base);
// each special move has its own wait before it can be used again, shown by its little icon on the screen (a friend's
// playtest, 10/14/2026: the squeak in particular could be spammed). Trying one that isn't ready just flashes its icon
const specialCD = { squeak: 0, spin: 0, burst: 0 }, specialFlash = { squeak: 0, spin: 0, burst: 0 };
const WATCH_WAIT = 0.65;   // the pocket watch pin: the special moves come back about a third sooner
const watchK = () => (wearing('watch') ? WATCH_WAIT : 1);
const SPECIAL_WAIT = { squeak: () => tune.cdSqueak * watchK(), spin: () => tune.cdSpin * watchK(), burst: () => tune.cdBurst * watchK() };
function specialReady(k) { if (specialCD[k] > 0) { specialFlash[k] = 0.35; sfx.tired(); return false; } return true; }
function specialUsed(k) { specialCD[k] = SPECIAL_WAIT[k](); }
function updateSpecialCD(dt) {
  for (const k in specialCD) { specialCD[k] = Math.max(0, specialCD[k] - dt); specialFlash[k] = Math.max(0, specialFlash[k] - dt); }
  for (const f of foes) if (f.squeakRes) { f.squeakResT -= dt; if (f.squeakResT <= 0) { f.squeakRes--; f.squeakResT = SQUEAK_FORGET; } }   // getting used to the squeak wears off
}
function startSpecial(only, down = inp.down) {
  const want = only ? (can(only) ? only : null) : down && can('burst') ? 'burst' : can('squeak') ? 'squeak' : can('burst') ? 'burst' : null;
  if (!want || !specialReady(want)) return;
  if (want === 'squeak') startSqueak();
  else if (want === 'spin') startSpin();
  else if (want === 'burst') startBurst();
}
function useBreath(n) {
  if (P.ko > 0 || P.respawnT > 0 || P.sinkT) return false;
  if (P.en <= 0) { P.enFlash = 0.3; sfx.tired(); return false; }
  P.en = Math.max(0, P.en - specialCost(n)); P.enDelay = tune.enDelay; if (P.en <= 0) P.winded = true;
  return true;
}

// ---- the spin: he whirls round with his sword out, hits everything round him a few times, and his fall slows
const spins = [];
function startSpin() {
  if (!useBreath(20)) return;
  specialUsed('spin');
  const dur = wearing('tiny_top') ? 0.62 : 0.42;
  P.spinT = dur; P.squeakCD = dur + 0.1; P.atk = null; P.charge = 0;
  if (!P.ground && P.vy > -60) P.vy = -90;
  spins.push({ t: 0, dur, tick: 0, hit: new Set() });
  sfx.whirl();
  if (!world.flags.spunOnce) { world.flags.spunOnce = true; saveWorld(); }
}
// The sword's on one side of him at a time as he whirls (the frames swap every 0.06 s), so it only hits on the side the
// sword's on: turn on the hitboxes (H) and the red box follows the blade round. Each thing it hits takes a full hit the
// first time, and the hits after that in the same spin are weaker (a friend's playtest, 10/14/2026: three or four full
// hits in a blink was too strong, the tangle especially). Shots it catches get knocked back the way they came but at a
// random angle, not aimed like a shield parry
const SPIN_REACH = 46, SPIN_HALF = 0.06, SPIN_AFTER = 0.35;
function spinSide() { return Math.floor(P.spinT / SPIN_HALF) % 2 ? -1 : 1; }   // matches the frame: odd is the L picture, the blade out to the left
function spinBox() {
  const d = spinSide();
  return d > 0 ? { l: P.x - 6, r: P.x + SPIN_REACH, t: P.y - P.h - 14, b: P.y + 6 } : { l: P.x - SPIN_REACH, r: P.x + 6, t: P.y - P.h - 14, b: P.y + 6 };
}
function updateSpins(dt) {
  for (const s of spins) {
    s.t += dt;
    const box = spinBox(); P.spinBox = box;
    s.hits = s.hits || new Map(); s.last = s.last || new Map();
    const fresh = k => !s.last.has(k) || s.t - s.last.get(k) >= SPIN_HALF * 2 - 0.001;   // once per turn at most
    for (const f of foes) {
      if (f.state === 'down' || f.state === 'hidden' || !fresh(f) || !overlap(box, foeBox(f))) continue;
      const n = s.hits.get(f) || 0; s.hits.set(f, n + 1); s.last.set(f, s.t);
      const fb = foeBox(f);
      if (specialDeflected(f, 'spin', (fb.l + fb.r) / 2, (fb.t + fb.b) / 2)) continue;    // what the sword glances off, the spin does too (10/18/2026)
      foeHurt(f, (n ? SPIN_AFTER : 1) * swordBonus(), Math.sign((fb.l + fb.r) / 2 - P.x || 1) * (n ? 70 : 140), (fb.l + fb.r) / 2, (fb.t + fb.b) / 2, !n); if (!n) rally();
    }
    if (boss && typeof bossHits === 'function' && fresh('boss')) {
      const n = s.hits.get('boss') || 0, a = { type: 'side', hit: new Set(), t: 0, scale: n ? SPIN_AFTER : 1 };
      bossHits(box, a);
      if (a.hit.has('boss')) { s.hits.set('boss', n + 1); s.last.set('boss', s.t); }
    }
    for (const sh of shots) if (!sh.reflected && overlap(box, { l: sh.x - 4, r: sh.x + 4, t: sh.y - 4, b: sh.y + 4 })) spinDeflect(sh);
    for (const ck of room.def.cranks || []) {                                              // a crank right there: round it goes
      if (s.last.has(ck.id) || world.flags[ck.flag] || Math.abs(ck.x - P.x) > 34 || Math.abs(ck.y - P.y) > 40) continue;
      s.last.set(ck.id, s.t); turnCrank(ck);
    }
    for (const b of room.breaks) {                                                             // a web overhead or beside him: the whirl shreds it
      if (b.broken || b.need !== 'spin') continue;
      const r = { l: b.x0 * T, r: (b.x1 + 1) * T, t: b.y0 * T, b: (b.y1 + 1) * T }, cx = P.x, cy = P.y - 20;
      const dx = Math.max(r.l - cx, 0, cx - r.r), dy = Math.max(r.t - cy, 0, cy - r.b);
      if (Math.hypot(dx, dy) < 80) breakOpen(b);
    }
  }
  for (let i = spins.length - 1; i >= 0; i--) if (spins[i].t >= spins[i].dur) spins.splice(i, 1);
  if (!spins.length) P.spinBox = null;
}
// batted away by the whirl: back the way it came, off at some random angle, not aimed at anything
function spinDeflect(sh) {
  sh.reflected = true;
  const sp = Math.max(220, Math.hypot(sh.vx, sh.vy)), ang = Math.atan2(-sh.vy, -sh.vx) + (Math.random() * 2 - 1) * 0.7;
  sh.vx = Math.cos(ang) * sp; sh.vy = Math.sin(ang) * sp - 60; sh.t = Math.min(sh.t || 0, 1);
  spark(sh.x, sh.y);
}
function turnCrank(ck) {
  world.flags[ck.flag] = true; saveWorld();
  crankSpin[ck.id] = 1.2;
  sfx.clunk(); setTimeout(() => sfx.open(), 300); shakeT = 0.15; shakeA = 1.5;
  applyGates(room);
  popup(ck.x, ck.y - 44, 'clunk', '#e8d890');
}
const crankSpin = {};

// ---- the fluff burst: a puff of his stuffing bursting out all round him
const bursts = [];
function startBurst() {
  if (!useBreath(24)) return;
  specialUsed('burst');
  P.burstT = 0.3; P.squeakCD = 0.5; P.atk = null; P.charge = 0;
  if (!P.ground) P.vy = Math.min(P.vy, -120);
  bursts.push({ x: P.x, y: P.y - 18, t: 0, hit: new Set() });
  sfx.poof(); puff(P.x, P.y - 18, 26, 160, '#ffffff', 90);
  for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; part(P.x, P.y - 18, Math.cos(a) * 200, Math.sin(a) * 200, 0.45, i % 2 ? '#ffffff' : '#e9e4da', 2, 0); }
  if (!world.flags.burstOnce) { world.flags.burstOnce = true; saveWorld(); }
}
const BURST_R = 76;
function updateBursts(dt) {
  for (const s of bursts) {
    s.t += dt;
    const r = Math.min(BURST_R, 14 + s.t * 360);
    for (const f of foes) {
      if (f.state === 'down' || f.state === 'hidden' || s.hit.has(f)) continue;
      const b = foeBox(f), cx = (b.l + b.r) / 2, cy = (b.t + b.b) / 2;
      if (Math.hypot(cx - s.x, cy - s.y) > r + 8) continue;
      s.hit.add(f); if (specialDeflected(f, 'burst', cx, cy)) continue;                  // what the sword glances off, the burst does too (10/18/2026)
      if (!foeHurt(f, 1, Math.sign(cx - s.x || 1) * 300, cx, cy)) foeStagger(f, 0.9);
    }
    for (const b of room.breaks) {
      if (b.broken || s.hit.has(b) || b.need !== 'burst') continue;
      const nx = Math.max(b.x0 * T, Math.min((b.x1 + 1) * T, s.x)), ny = Math.max(b.y0 * T, Math.min((b.y1 + 1) * T, s.y));
      if (Math.hypot(nx - s.x, ny - s.y) > r) continue;
      s.hit.add(b); breakOpen(b);
    }
    for (const sh of shots) if (!sh.reflected && Math.hypot(sh.x - s.x, sh.y - s.y) < r) { sh.dead = true; part(sh.x, sh.y, 0, -20, 0.3, '#ffffff', 2, 0); }
    if (!s.hit.has('boss') && bossHeard(s.x, s.y, r, 'burst')) s.hit.add('boss');
  }
  for (let i = bursts.length - 1; i >= 0; i--) if (bursts[i].t > 0.3) bursts.splice(i, 1);
}

// ---------- the Playground's litter and the Forgotten ----------
// ---- bits the Playground's new attacks share (10/16/2026)
const CONFETTI = ['#f05a5a', '#f0d040', '#5ab0f0', '#70d070', '#d070d0'];
function confettiShot(f, x, y, vx, vy, g, i) {
  const c = CONFETTI[i % CONFETTI.length];
  shots.push({ kind: 'confetti', col: c, x, y, vx, vy, g, from: f, reflected: false, t: 0, life: 2,
    draw: sh => { ctx.fillStyle = c; const w = Math.abs(Math.sin(sh.t * 14 + i)) * 3 + 1; ctx.fillRect(Math.round(sh.x - w / 2), Math.round(sh.y) - 2, Math.round(w), 4); } });
}
function screechShot(f, sc = 1) {
  sfx.screech();
  shots.push({ kind: 'screech', x: f.x + f.f * 18, y: f.y - 8, vx: f.f * 170, vy: 0, g: 0, from: f, reflected: false, t: 0,
    draw: s => { const a = Math.max(0, 1 - s.t / 2.2); ctx.strokeStyle = `rgba(255,236,160,${0.8 * a})`; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(s.x - Math.sign(s.vx) * k * 6 * sc, s.y, (5 + k * 2) * sc, -1, 1); ctx.stroke(); } } });
}

Object.assign(FOE, {
  // wind-up chattering teeth: hop about, then come snapping at him. Newer (10/16/2026): half the time a chomp that lands
  // clamps on and hangs on (mash free), a skitter along the ground at him, and three chomps in a row
  teeth: { hp: 4, hw: 9, h: 14, acorns: [1, 2], leaps: true,
    box: f => (f.state === 'bite' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 9, r: f.x + 9, t: f.y - 14, b: f.y }),
    harmless: f => ['chomp', 'skitter', 'bite'].includes(f.state),
    update(f, dt) {
      baseState(f, dt);
      if (f.state === 'bite') {                                                          // clamped on his leg, chattering
        if (!pinnedBy(f)) { setBeside(f, -P.facing * 18); setFoeState(f, 'stagger'); f.stagT = 1.2; f.air = false; return; }
        f.x = P.x + Math.sin(f.t * 40) * 1.5; f.y = P.y;
        if (f.t >= 1.4) { P.pinned = null; hurt(f.x, 'teeth', 1); setBeside(f, -P.facing * 16); setFoeState(f, 'rest'); }
        return;
      }
      if (f.air) {
        if (hopFoe(f, dt)) {
          if (heard(f)) sfx.tok(); f.air = false;
          if (f.state === 'chomp') { if (f.chomps > 1) { f.chomps--; setFoeState(f, 'wind'); f.t = 0.28; } else setFoeState(f, 'rest'); }
        }
        if (f.state === 'chomp') {
          const out = strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 16, b: f.y }, 16);
          if (out === 'hit' && hasMove(f, 2) && P.health > 0 && Math.random() < 0.5) { pinHim(f, 6); setFoeState(f, 'bite'); f.air = false; tellOnce('teethBite', f, 'mash to shake it off', 30); }
        }
        return;
      }
      if (f.state === 'walk') {
        if (f.cd <= 0) {
          const adx = Math.abs(P.x - f.x);                                               // the chomp from where it lands (was 120). Farther off it mostly hops closer, sometimes skitters in
          const m = near(f, 9 * T, 40) ? choose([[adx < 100 ? 2 : 0, 'wind'], [hasMove(f, 4) && adx < 100 ? 1.1 : 0, 'triple'], [hasMove(f, 3) && adx > 40 ? 0.7 : 0, 'skitwind'], [adx >= 100 ? 1.4 : 0, 'hop']]) : null;
          if (m && m !== 'hop') { f.f = Math.sign(P.x - f.x) || f.f; f.chomps = m === 'triple' ? 3 : 1; setFoeState(f, m === 'triple' ? 'wind' : m); sfx.ticking(); }
          else {                                                                     // hopping about: after him if he's about (off its ledge too), else round where it lives
            const on = near(f, 16 * T, 7 * T);
            if (on) f.f = Math.sign(P.x - f.x) || f.f;
            else { if (f.x < f.x0 - 4 * T) f.f = 1; else if (f.x > f.x0 + 4 * T) f.f = -1; else if (Math.random() < 0.3) f.f = -f.f; }
            f.air = true; f.vy = on && P.y < f.y - 12 ? -300 : -140; f.hopVX = f.f * (on ? 80 : 50); f.cd = 0.4 + Math.random() * 0.4;
          }
        }
      } else if (f.state === 'wind' && f.t >= 0.4) { f.f = Math.sign(P.x - f.x) || f.f; setFoeState(f, 'chomp'); f.air = true; f.vy = -180; f.hopVX = f.f * 170; sfx.chomp(); }
      else if (f.state === 'skitwind' && f.t >= 0.25) { setFoeState(f, 'skitter'); sfx.ticking(); }
      else if (f.state === 'skitter') {                                                  // down low, skittering along the ground at him, chattering
        const res = groundStep(f, f.f, 220, dt);
        if (Math.random() < dt * 14 && heard(f)) sfx.tok();
        strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 14, b: f.y }, 16);
        if (res !== 'ok' || f.t >= 0.7) setFoeState(f, 'rest');
      }
      else if (f.state === 'rest' && f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 0.8 + Math.random() * 0.6; }
    },
    draw(f) {
      if (f.state === 'bite') return;                                                    // (drawn on his leg: drawOnPhill in pond.js)
      const fr = FOE.teeth.frame(f), sh = /wind$/.test(f.state) ? Math.round(Math.sin(f.t * 60)) : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 10, 1);
      spr(fr, f.x + sh, f.y, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 7) - 1, Math.round(f.y - 20 + Math.sin(a) * 2), 2, 2); }
    },
    frame: f => ({ walk: 'teeth_walk_' + (Math.floor(f.t * 8) % 2 + 1), wind: 'teeth_wind', chomp: 'teeth_chomp', skitwind: 'teeth_wind', skitter: 'teeth_skitter', bite: 'teeth_bite', down: 'teeth_down', stagger: 'teeth_dizzy', rest: 'teeth_walk_1' })[f.state] || 'teeth_walk_1' },

  // a little jack-in-the-box: sits there shut, then pops out at him when he's close. Newer (10/16/2026): its head springs
  // right out on its spring and comes after him, the box hops at him lid shut, and it bursts open in a shower of confetti
  jack: { hp: 5, hw: 10, h: 18, acorns: [1, 2],
    box: f => (f.state === 'pop' || f.state === 'burst' ? { l: f.x - 10, r: f.x + 10, t: f.y - 44, b: f.y } : f.state === 'spring' || f.state === 'reel' ? { l: f.x - 10, r: f.x + 10, t: f.y - 30, b: f.y } : { l: f.x - 10, r: f.x + 10, t: f.y - 18 + f.yoff, b: f.y + f.yoff }),
    harmless: f => ['spring', 'reel', 'hop'].includes(f.state),
    update(f, dt) {
      baseState(f, dt);
      if (f.yoff < 0 && f.state !== 'hop') hopArc(f, dt);
      const dx = P.x - f.x, adx = Math.abs(dx);
      if (f.state === 'walk' && f.cd <= 0 && near(f, 9 * T, 60)) {
        const m = choose([[adx < 44 ? 2 : 0, 'peek'], [hasMove(f, 2) && adx < 110 ? 1.3 : 0, 'springpeek'], [hasMove(f, 3) && adx > 40 ? 1 : 0, 'hopwind'], [hasMove(f, 4) && adx < 80 ? 1.1 : 0, 'burstpeek']]);   // the pop from close enough for it to reach (it went off from 70, at nothing, and its drawn head only reaches about 12 out: 10/16/2026)
        if (m) { setFoeState(f, m); sfx.ticking(); f.f = Math.sign(dx) || f.f; }
      }
      else if (f.state === 'peek') { if (adx > 18) groundStep(f, f.f, 60, dt); if (f.t >= 0.45) { setFoeState(f, 'pop'); sfx.boing(); } }   // shuffling in as it ticks: the head only reaches about 12 out (10/16/2026). Not into touching him, that hurts on its own
      else if (f.state === 'pop') { if (f.t < 0.2) strike(f, { l: Math.min(f.x - 14, f.x + f.f * 46), r: Math.max(f.x + 14, f.x + f.f * 46), t: f.y - 50, b: f.y - 10 }, 20); if (f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.4; } }   // the head comes out toward him
      else if (f.state === 'springpeek' && f.t >= 0.4) { setFoeState(f, 'spring'); sfx.boing(); f.hx = f.x; f.hy = f.y - 36; }
      else if (f.state === 'spring') {                                                   // its head out on the spring, coming after him (it only reaches so far)
        const tx = P.x, ty = P.y - 22, ddx = tx - f.hx, ddy = ty - f.hy, d = Math.hypot(ddx, ddy) || 1;
        f.hx += ddx / d * Math.min(d, 150 * dt); f.hy += ddy / d * Math.min(d, 150 * dt);
        const ox = f.hx - f.x, oy = f.hy - (f.y - 30), od = Math.hypot(ox, oy);
        if (od > 96) { f.hx = f.x + ox / od * 96; f.hy = f.y - 30 + oy / od * 96; }
        strike(f, { l: f.hx - 9, r: f.hx + 9, t: f.hy - 12, b: f.hy + 8 }, 18);
        if (f.t >= 1.2) setFoeState(f, 'reel');
      } else if (f.state === 'reel') {                                                   // and back in
        f.hx += (f.x - f.hx) * Math.min(1, dt * 8); f.hy += (f.y - 30 - f.hy) * Math.min(1, dt * 8);
        if (f.t >= 0.35) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.4; }
      } else if (f.state === 'hopwind' && f.t >= 0.35) { setFoeState(f, 'hop'); f.range = patrol(f.x, f.y); f.vy = -280; f.hopVX = hopTo(f, P.x, -280); f.yoff = -0.01; sfx.boing(); }
      else if (f.state === 'hop') {                                                      // the whole box hops at him, lid shut, and comes down on him
        const landed = hopArc(f, dt);
        if (f.vy > -60) strike(f, { l: f.x - 11, r: f.x + 11, t: f.y + f.yoff - 20, b: f.y + f.yoff }, 18);
        if (landed) { puff(f.x, f.y, 5, 35); if (heard(f)) sfx.thud(); setFoeState(f, 'walk'); f.cd = 1.2; }
      } else if (f.state === 'burstpeek' && f.t >= 0.45) {                               // bursts open in a shower of confetti
        setFoeState(f, 'burst'); sfx.pop(); sfx.boing();
        for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.32 + f.f * 0.15, sp = 210 + (i % 2) * 40; confettiShot(f, f.x, f.y - 36, Math.cos(a) * sp, Math.sin(a) * sp, 420, i); }
      } else if (f.state === 'burst' && f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.8; }
    },
    draw(f) {
      const fr = FOE.jack.frame(f), sh = /peek$|wind$/.test(f.state) ? Math.round(Math.sin(f.t * 50)) : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 11, 1);
      if (f.state === 'spring' || f.state === 'reel') {                                  // the spring stretched out to its head
        const x0 = f.x, y0 = f.y - 28, n = 9;
        ctx.strokeStyle = '#b4b4c0'; ctx.lineWidth = 1; ctx.beginPath();
        for (let i = 0; i <= n; i++) { const t = i / n, x = x0 + (f.hx - x0) * t, y = y0 + (f.hy + 6 - y0) * t, px = -(f.hy - y0), py = f.hx - x0, pl = Math.hypot(px, py) || 1; const o = (i % 2 ? 3 : -3) * (i > 0 && i < n ? 1 : 0); ctx.lineTo(x + px / pl * o, y + py / pl * o); }
        ctx.stroke();
        spr('jack_open', f.x, f.y, f.f > 0); spr('jack_head', f.hx, f.hy, f.f > 0);
        if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr('jack_open', f.x, f.y, f.f > 0, 0.6); spr('jack_head', f.hx, f.hy, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
        return;
      }
      spr(fr, f.x + sh, f.y + f.yoff, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y + f.yoff, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 8) - 1, Math.round(f.y - 30 + Math.sin(a) * 2), 2, 2); }
    },
    frame: f => ({ walk: 'jack_closed', peek: 'jack_peek', springpeek: 'jack_peek', burstpeek: 'jack_swell', pop: 'jack_pop', burst: 'jack_pop', hopwind: 'jack_closed', hop: 'jack_hop', down: 'jack_down', stagger: 'jack_dizzy', hurt: 'jack_pop' })[f.state] || 'jack_closed' },

  // a sand bucket on goo legs: waddles, tips back and lobs a clump of sand. Newer (10/16/2026): up close it slams a little
  // spade down on him, it heaps up a wall of sand and shoves it along the ground at him, and it flips itself upside down
  // and comes down right over him, trapping him under it (mash free)
  bucket: { hp: 5, hw: 10, h: 22, acorns: [1, 2], walker: true,
    box: f => (f.state === 'trap' ? { l: f.x - 12, r: f.x + 12, t: f.y - 24, b: f.y } : { l: f.x - 10, r: f.x + 10, t: f.y - 22 + f.yoff, b: f.y + f.yoff }),
    harmless: f => ['flip', 'trap'].includes(f.state),
    update(f, dt) {
      baseState(f, dt);
      if (f.yoff < 0 && f.state !== 'flip') hopArc(f, dt);
      const dx = P.x - f.x, adx = Math.abs(dx), level = Math.abs(P.y - f.y) < 30;
      if (f.state === 'walk') {
        if (!chaseWalk(f, dt, 30, adx < 60 && hasMove(f, 2) ? 30 : 7 * T)) {           // it keeps a throw's distance
          f.x += f.f * 22 * dt;
          if (f.x <= f.range[0]) { f.x = f.range[0]; f.f = 1; } else if (f.x >= f.range[1]) { f.x = f.range[1]; f.f = -1; }
        }
        if (near(f, 220, 100) && f.cd <= 0) {
          const m = choose([[adx > 40 ? 2 : 0.5, 'tip'], [hasMove(f, 2) && adx < 38 && level ? 2 : 0, 'raise'], [hasMove(f, 3) && level && adx > 50 ? 1.1 : 0, 'pile'], [hasMove(f, 4) && adx > 30 && adx < 110 && level ? 1 : 0, 'flipwind']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); sfx.windup(); }
        }
      } else if (f.state === 'tip' && f.t >= 0.5) {
        setFoeState(f, 'dump'); sfx.whoosh();
        const sx = f.x + f.f * 10, sy = f.y - 24, tx = P.x, ty = P.y - 16, time = Math.max(0.5, Math.min(0.95, Math.abs(tx - sx) / 220));
        shots.push({ kind: 'sand', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 600 * time, g: 600, from: f, reflected: false, t: 0 });
      } else if (f.state === 'dump' && f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.8 + Math.random(); }
      else if (f.state === 'raise' && f.t < 0.4) { if (adx > 18) groundStep(f, f.f, 40, dt); }   // stepping in with the spade up: the drawn spade lands about 15 out (10/16/2026)
      else if (f.state === 'raise') { setFoeState(f, 'slam'); sfx.slam(); puff(f.x + f.f * 22, f.y, 5, 30, '#c4a674'); }
      else if (f.state === 'slam') {                                                     // the spade brought down hard in front of it
        if (f.t < 0.15) strike(f, { l: Math.min(f.x + f.f * 6, f.x + f.f * 38), r: Math.max(f.x + f.f * 6, f.x + f.f * 38), t: f.y - 30, b: f.y }, 20);
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; }
      } else if (f.state === 'pile') {                                                   // scooping up a wall of sand...
        if (Math.random() < dt * 20) part(f.x + f.f * 14, f.y - 4, f.f * 30, -60, 0.4, '#c4a674', 2, 300);
        if (f.t >= 0.6) {                                                               // ...and shoving it along the ground at him
          setFoeState(f, 'shove'); sfx.whoosh();
          const dir = f.f;
          shots.push({ kind: 'sandwall', col: '#c4a674', x: f.x + dir * 20, y: f.y - 10, vx: dir * 110, vy: 0, g: 0, from: f, reflected: false, t: 0, life: 2.6, noHit: true,
            upd: (sh, dt2) => {
              const gy = groundY(sh.x, f.y, 24, 24); if (gy !== null) sh.y = gy - 10;
              if (solidPx(sh.x + dir * 10, sh.y - 6)) sh.t = 99;                       // into a wall: it falls apart
              const b = { l: sh.x - 10, r: sh.x + 10, t: sh.y - 12, b: sh.y + 10 };
              if (f.state !== 'down') { f.atkBox = b; f.atkT = 0.08; }
              if (!sh.hit && phillAround() && overlap(b, { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y })) {
                sh.hit = true; const out = foeStrike(sh.x - dir * 10, 'bucket', { cost: 22 });
                if (out === 'hit') { P.vx = dir * 260; P.vy = -150; P.ground = false; }
                if (out !== 'hit') sh.t = 99;
              }
            },
            draw: sh => { ctx.fillStyle = '#8a7450'; ellipse(sh.x, sh.y + 9, 12, 3); ctx.fillStyle = '#c4a674'; ctx.beginPath(); ctx.moveTo(sh.x - 11, sh.y + 10); ctx.lineTo(sh.x - 6, sh.y - 10); ctx.lineTo(sh.x + 5, sh.y - 12); ctx.lineTo(sh.x + 11, sh.y + 10); ctx.fill(); ctx.fillStyle = '#dcc08a'; ctx.fillRect(Math.round(sh.x - 4), Math.round(sh.y - 9), 6, 2); } });
        }
      } else if (f.state === 'shove' && f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.8 + Math.random(); }
      else if (f.state === 'flipwind' && f.t >= 0.4) { setFoeState(f, 'flip'); f.vy = -340; f.hopVX = hopTo(f, P.x, -340); f.yoff = -0.01; sfx.boing(); }
      else if (f.state === 'flip') {                                                     // upside down, coming down over him...
        const landed = hopArc(f, dt);
        if (f.vy > -40 && !f.hitP && phillAround() && artHit(f, { l: f.x - 10, r: f.x + 10, t: f.y + f.yoff - 30, b: f.y + f.yoff })) {   // (on him, and on its drawing: artHit)
          f.hitP = true; f.atkBox = { l: f.x - 10, r: f.x + 10, t: f.y + f.yoff - 30, b: f.y + f.yoff }; f.atkT = 0.1;
          const out = foeStrike(f.x, 'bucket', { cost: 20, dmg: 1 });
          if (out === 'hit' && P.health > 0) { pinHim(f, 6); setFoeState(f, 'trap'); f.x = P.x; f.yoff = 0; tellOnce('bucketTrap', f, 'mash to get out', 40); return; }
          if (out === 'parried') { foeStagger(f, 1.4); return; }
        }
        if (landed) { puff(f.x, f.y, 6, 40, '#c4a674'); if (heard(f)) sfx.thud(); setFoeState(f, 'walk'); f.cd = 1.2; }
      } else if (f.state === 'trap') {                                                   // ...and he's under it
        if (!pinnedBy(f)) { setFoeState(f, 'stagger'); f.stagT = 1.4; setBeside(f, (P.facing || 1) * 16); puff(f.x, f.y - 10, 6, 40, '#c4a674'); return; }   // knocked it off: it's on its back a moment
        P.pinned.x = f.x; P.pinned.y = f.y;
        if (f.t >= 1.6) { P.pinned = null; hurt(f.x, 'bucket', 1); setBeside(f, -(P.facing || 1) * 18); setFoeState(f, 'walk'); f.cd = 1.6; }
      }
    },
    draw(f) {
      if (f.state === 'trap') return;                                                    // (drawn over him: drawOnPhill in pond.js)
      const fr = FOE.bucket.frame(f), sh = f.state === 'trap' ? Math.round(Math.sin(f.t * 30)) : /wind$|raise|pile|tip/.test(f.state) ? Math.round(Math.sin(f.t * 50) * 0.7) : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 11, 1);
      spr(fr, f.x + sh, f.y + f.yoff, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y + f.yoff, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 8) - 1, Math.round(f.y - 30 + Math.sin(a) * 2), 2, 2); }
    },
    frame: f => ({ walk: 'bucket_walk_' + (Math.floor(f.t * 5) % 2 + 1), tip: 'bucket_tip', dump: 'bucket_dump', raise: 'bucket_raise', slam: 'bucket_slam', pile: 'bucket_tip', shove: 'bucket_dump', flipwind: 'bucket_tip', flip: 'bucket_flip', trap: 'bucket_flip', down: 'bucket_down', stagger: 'bucket_dizzy' })[f.state] || 'bucket_walk_1' },

  // a jump rope: snakes along, rears up, and whips. Newer (10/16/2026): skips at him, the loop sweeping the ground twice
  // (jump it), throws a lasso and drags him in, and cracks twice in a row
  rope: { hp: 4, hw: 16, h: 8, acorns: [1, 1], walker: true,
    update(f, dt) {
      baseState(f, dt);
      const adx = Math.abs(P.x - f.x);
      if (f.state === 'walk') {
        if (!chaseWalk(f, dt, 60, 40)) {
          f.x += f.f * 50 * dt;
          if (f.x <= f.range[0]) { f.x = f.range[0]; f.f = 1; } else if (f.x >= f.range[1]) { f.x = f.range[1]; f.f = -1; }
        }
        if (near(f, 140, 40) && f.cd <= 0) {
          const m = choose([[adx < 100 ? 2 : 0, 'coil'], [hasMove(f, 2) && adx < 120 ? 1.2 : 0, 'skipwind'], [hasMove(f, 3) && adx > 36 ? 1.2 : 0, 'lassowind'], [hasMove(f, 4) && adx < 100 ? 1 : 0, 'crack']]);   // the whip from where it reaches (was 120)
          if (m) { f.f = Math.sign(P.x - f.x) || f.f; f.cracks = m === 'crack' ? 2 : 1; setFoeState(f, m === 'crack' ? 'coil' : m); sfx.hiss(); }
        }
      } else if (f.state === 'coil' && f.t >= 0.4) { setFoeState(f, 'whip'); sfx.whip(); }
      else if (f.state === 'whip') {
        f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.f * 260 * dt));
        strike(f, { l: f.x + (f.f > 0 ? 0 : -30), r: f.x + (f.f > 0 ? 30 : 0), t: f.y - 22, b: f.y }, 16);
        if (f.t >= 0.25) { if (f.cracks > 1) { f.cracks--; f.f = Math.sign(P.x - f.x) || f.f; setFoeState(f, 'coil'); f.t = 0.22; } else setFoeState(f, 'rest'); }   // and straight back up for the second crack
      } else if (f.state === 'skipwind' && f.t >= 0.35) { setFoeState(f, 'skip'); sfx.whoosh(); }
      else if (f.state === 'skip') {                                                     // skipping along at him, the loop coming over and down along the ground
        f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.f * 70 * dt));
        const ph = (f.t % 0.6) / 0.6, k = Math.floor(f.t / 0.6);
        if (k !== f.sweep) { f.sweep = k; f.hitP = false; }
        if (ph > 0.5) { strike(f, { l: f.x - 24, r: f.x + 24, t: f.y - 10, b: f.y }, 16); if (ph < 0.56 && heard(f)) sfx.whip(); }
        if (f.t >= 1.2) setFoeState(f, 'rest');
      } else if (f.state === 'lassowind' && f.t >= 0.4) { setFoeState(f, 'lasso'); sfx.whip(); }
      else if (f.state === 'lasso') {                                                    // the loop thrown out at him
        const out = f.t < 0.35 ? strike(f, { l: Math.min(f.x + f.f * 24, f.x + f.f * 54), r: Math.max(f.x + f.f * 24, f.x + f.f * 54), t: f.y - 22, b: f.y - 2 }, 14) : null;
        if (out === 'hit') { setFoeState(f, 'reel'); tellOnce('ropeLasso', f, 'roll or jump to slip it', 40); }
        else if (f.t >= 0.6) setFoeState(f, 'rest');
      } else if (f.state === 'reel') {                                                   // dragging him in, then the whip
        pullHim(f.x + f.f * 20, 150, dt);
        if ((f.t > 0.25 && (P.roll || P.dash || P.vy < -100)) || f.t >= 0.7) { f.f = Math.sign(P.x - f.x) || f.f; setFoeState(f, 'coil'); f.t = 0.25; f.cracks = 1; }
      }
      else if (f.state === 'rest' && f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1 + Math.random(); }
    },
    draw(f) {
      const fr = FOE.rope.frame(f), sh = f.state === 'coil' || /wind$/.test(f.state) ? Math.round(Math.sin(f.t * 60)) : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 17, 1);
      spr(fr, f.x + sh, f.y, f.f > 0);
      if (f.state === 'reel' && phillAround()) {                                       // the loop round him, the rope taut back to it
        for (const [c, w] of [['#2a2030', 3], ['#c070a8', 1]]) {
          ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(f.x + f.f * 26, f.y - 12); ctx.lineTo(P.x, P.y - 14); ctx.stroke();
          ctx.beginPath(); ctx.ellipse(P.x, P.y - 14, 9, 4, 0, 0, Math.PI * 2); ctx.stroke();
        }
      }
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 7) - 1, Math.round(f.y - 14 + Math.sin(a) * 2), 2, 2); }
    },
    frame: f => ({ walk: 'rope_slither_' + (Math.floor(f.t * 7) % 2 + 1), coil: 'rope_coil', whip: 'rope_whip', skipwind: 'rope_coil', skip: (f.t % 0.6) < 0.3 ? 'rope_loop_1' : 'rope_loop_2', lassowind: 'rope_coil', lasso: 'rope_lasso', reel: 'rope_whip', down: 'rope_down', stagger: 'rope_dizzy', rest: 'rope_slither_1' })[f.state] || 'rope_slither_1' },

  // a party balloon full of Grime: drifts toward him, swells up and pops in a splash of the stuff. Newer (10/16/2026): it
  // gets up over him and drops a splat of Grime, whips him with its string, and splits into three little balloons that
  // come after him
  balloon: { hp: 1, hw: 8, h: 22, acorns: [1, 1], free: true,
    setup(f) { f.y -= 10; f.hx = f.x; f.hy = f.y; f.ci = Math.floor(Math.abs(f.x * 7 + f.y)) % 3; },
    box: f => ({ l: f.x - 8, r: f.x + 8, t: f.y - 30, b: f.y - 8 }),
    harmless: f => f.state === 'string' && f.t > 0.3,
    update(f, dt) {
      if (f.state === 'down') { f.y = Math.min(f.y + 60 * dt, room.pxH - T); return; }
      baseState(f, dt);
      const dx = P.x - f.x, dy = (P.y - 22) - (f.y - 18);
      if (f.state === 'walk' || f.state === 'stagger' || f.state === 'hurt') {
        // up high it can see a long way: it spots him from much farther off than the ground foes do, and once it has
        // it keeps after him till he's well out of reach (a friend's playtest, 10/14/2026)
        if (near(f, 360, 260)) f.chase = true; else if (!near(f, 480, 340)) f.chase = false;
        // round walls now, not through them (10/16/2026)
        if (f.chase && f.state === 'walk') flyTo(f, P.x, P.y - 4, 30, dt);
        else flyTo(f, f.hx, f.hy, 12, dt);
        freeMove(f, 0, Math.sin(f.t * 2.4) * 10 * dt);
        if (f.state === 'walk' && f.cd <= 0) {
          const m = choose([[near(f, 40, 40) ? 2 : 0, 'swell'], [hasMove(f, 2) && near(f, 120, 120) ? 1.2 : 0, 'dropaim'], [hasMove(f, 3) && near(f, 56, 44) ? 1.3 : 0, 'stringwind'], [hasMove(f, 4) && near(f, 130, 90) && !near(f, 30, 30) ? 0.8 : 0, 'splitwind']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); sfx.inflate(); }
        }
      } else if (f.state === 'swell' && f.t >= 0.55) {                                       // pop
        sfx.pop(); setFoeState(f, 'down'); f.hp = 0;
        for (let i = 0; i < 16; i++) part(f.x, f.y - 18, (Math.random() * 2 - 1) * 160, (Math.random() * 2 - 1) * 160, 0.5, i % 2 ? '#2c1c3c' : '#4a3462', 2, 300);
        if (phillAround() && P.inv <= 0 && !dodgeSafe() && Math.hypot(P.x - f.x, P.y - 20 - (f.y - 18)) < 40 && !(P.story && !P.story.free)) foeStrike(f.x, 'balloon', { cost: 20 });
      } else if (f.state === 'dropaim') {                                                // up over his head...
        flyTo(f, P.x, P.y - 70, 70, dt);
        if (f.t >= 0.8) {                                                                // ...and lets go a splat of Grime
          setFoeState(f, 'drop'); sfx.splat();
          shots.push({ kind: 'blob', x: f.x, y: f.y - 8, vx: (P.x - f.x) * 0.6, vy: 20, g: 500, from: f, reflected: false, t: 0 });
        }
      } else if (f.state === 'drop' && f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.6; }
      else if (f.state === 'stringwind') { freeMove(f, 0, Math.sin(f.t * 2.4) * 10 * dt); if (f.t >= 0.35) { setFoeState(f, 'string'); sfx.whip(); } }
      else if (f.state === 'string') {                                                   // its string whipped round at him
        const a = Math.min(1, f.t / 0.2), tx = f.x + f.f * 30 * a, ty = f.y + 14 - a * 10;
        f.sx = tx; f.sy = ty;
        if (f.t < 0.25) strike(f, { l: Math.min(f.x, tx) - 4, r: Math.max(f.x, tx) + 4, t: f.y - 10, b: f.y + 16, area: true }, 16);   // (area: the string's a drawn line, not part of its picture)
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.5; }
      } else if (f.state === 'splitwind' && f.t >= 0.6) {                                // and pops into three little ones
        sfx.pop(); setFoeState(f, 'down'); f.hp = 0;
        const cols = [['#e05a5a', '#ff9a8a'], ['#5a8ae0', '#9ac0ff'], ['#e0c040', '#fff090']];
        for (let i = 0; i < 3; i++) { const a = -Math.PI / 2 + (i - 1) * 0.9, c = cols[(f.ci + i) % 3];
          bubbleShot(f, f.x, f.y - 18, Math.cos(a) * 90, Math.sin(a) * 90, { kind: 'mini', col: c[0], sp: 62, life: 4,
            draw: sh => { ctx.strokeStyle = '#d8d0c0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(sh.x, sh.y + 4); ctx.lineTo(sh.x + Math.sin(sh.t * 6) * 2, sh.y + 11); ctx.stroke(); ctx.fillStyle = '#2a2030'; ellipse(sh.x, sh.y, 5, 6); ctx.fillStyle = c[0]; ellipse(sh.x, sh.y, 4, 5); ctx.fillStyle = c[1]; ctx.fillRect(Math.round(sh.x - 2), Math.round(sh.y - 3), 2, 2); } }); }
      }
    },
    draw(f) {
      const fr = FOE.balloon.frame(f), sh = /wind$|aim$/.test(f.state) ? Math.round(Math.sin(f.t * 40)) : 0;
      if (f.state === 'string' && f.sx !== undefined) {                                  // the string out sideways
        ctx.strokeStyle = '#e8e0d0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(f.x, f.y - 8); ctx.quadraticCurveTo(f.x + f.f * 12, f.y + 8, f.sx, f.sy); ctx.stroke();
      }
      spr(fr, f.x + sh, f.y, false);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y, false, 0.6); ctx.globalCompositeOperation = 'source-over'; }
    },
    onDown(f) { if (f.state === 'down' && !f.popped) { f.popped = true; sfx.pop(); } },
    frame: f => `balloon${f.ci || 0}_` + ({ walk: 'float_' + (Math.floor(f.t * 2) % 2 + 1), swell: 'swell', splitwind: 'swell', dropaim: 'float_1', drop: 'float_2', stringwind: 'float_1', string: 'float_2', down: 'down', stagger: 'float_1', hurt: 'float_1' }[f.state] || 'float_1') },

  // a party horn on goo feet: blows a screech that rolls along the ground at him (jump it, or parry it back). Newer
  // (10/16/2026): up close its paper tongue shoots out and pokes him, three short toots in a row, and a cone of confetti
  horn: { hp: 5, hw: 10, h: 12, acorns: [1, 2],
    update(f, dt) {
      baseState(f, dt);
      const adx = Math.abs(P.x - f.x);
      if (f.state === 'walk') {
        if (near(f, 260, 50) && f.cd <= 0) {
          const m = choose([[adx > 40 ? 2 : 0.4, 'aim'], [hasMove(f, 2) && adx < 50 ? 2.2 : 0, 'pokewind'], [hasMove(f, 3) && adx > 50 ? 1.1 : 0, 'aim3'], [hasMove(f, 4) && adx < 130 ? 1 : 0, 'conewind']]);
          if (m) { f.f = Math.sign(P.x - f.x) || f.f; f.toots = m === 'aim3' ? 3 : 1; setFoeState(f, m); if (m === 'aim' || m === 'aim3') sfx.inhale(); }   // a breath in before it blows: its only wind up with a pose and no sound (10/16/2026)
        }
      } else if ((f.state === 'aim' || f.state === 'aim3') && f.t >= (f.state === 'aim3' ? 0.4 : 0.5)) { setFoeState(f, 'blow'); screechShot(f, f.toots > 1 ? 0.7 : 1); }
      else if (f.state === 'blow') {
        if (f.toots > 1 && f.t >= 0.24) { f.toots--; f.t = 0.01; screechShot(f, 0.7); }   // three short ones
        else if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 2 + Math.random(); }
      } else if (f.state === 'pokewind' && f.t >= 0.3) { setFoeState(f, 'poke'); sfx.whoosh(); }
      else if (f.state === 'poke') {                                                     // the paper tongue out at him
        if (f.t < 0.3) strike(f, { l: Math.min(f.x + f.f * 10, f.x + f.f * 44), r: Math.max(f.x + f.f * 10, f.x + f.f * 44), t: f.y - 16, b: f.y - 4 }, 16);
        if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; }
      } else if (f.state === 'conewind' && f.t >= 0.45) {                                // a cone of confetti out the end of it
        setFoeState(f, 'cone'); sfx.screech();
        for (let i = 0; i < 6; i++) { const a = (i - 2.5) * 0.14 - 0.12, sp = 190 + (i % 3) * 20; confettiShot(f, f.x + f.f * 18, f.y - 8, f.f * Math.cos(a) * sp, Math.sin(a) * sp, 160, i); }
      } else if (f.state === 'cone' && f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 2 + Math.random(); }
    },
    frame: f => ({ walk: 'horn_idle_' + (Math.floor(f.t * 2) % 2 + 1), aim: 'horn_idle_2', aim3: 'horn_idle_2', blow: 'horn_blow', pokewind: 'horn_idle_2', poke: 'horn_poke', conewind: 'horn_idle_2', cone: 'horn_blow', down: 'horn_down', stagger: 'horn_dizzy' })[f.state] || 'horn_idle_1' },
});

// ---------- gates the Playground draws (a chain-link gate, a hatch, a set of bars) and its soft walls ----------
function drawGateLook(gt) {
  const x0 = gt.x0 * T, y0 = gt.y0 * T, w = (gt.x1 - gt.x0 + 1) * T, h = (gt.y1 - gt.y0 + 1) * T;
  if (gt.look === 'plug') {                                                                 // the Oak: a chimney grown over with fungus and soft wood
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = '#3a261e'; ctx.fillRect(x0 + 1, y0 + 1, w - 2, h - 2);
    ctx.fillStyle = '#4c3426'; for (let x = x0 + 3; x < x0 + w - 3; x += 7) ctx.fillRect(x, y0 + 2 + (x % 3), 4, h - 6);
    for (let i = 0; i < Math.max(2, w / 22); i++) {                                       // brackets of fungus fanning out across it
      const fx = x0 + 8 + i * 22, fy = y0 + h - 6 - (i % 2) * 8;
      ctx.fillStyle = '#2a2030'; ellipse(fx, fy, 10, 5); ctx.fillStyle = '#b89a6a'; ellipse(fx, fy - 1, 9, 4); ctx.fillStyle = '#d8c090'; ctx.fillRect(Math.round(fx - 7), Math.round(fy - 4), 12, 1);
    }
    return;
  }
  if (gt.look === 'line') {                                                                 // the Pond: old fishing line, strung back and forth across the way through
    const now = performance.now() / 1000;
    ctx.fillStyle = 'rgba(220,232,236,0.75)';
    for (let k = 0; k < 9; k++) {
      for (let t = 0; t <= 1; t += 0.02) {
        const x = x0 + t * w, y = y0 + ((k * 37) % h) + Math.sin(t * 9 + k + now * 0.8) * 3 + (k % 2 ? t : 1 - t) * h * 0.4;
        if (y >= y0 && y < y0 + h) ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      }
    }
    ctx.fillStyle = '#c8402a'; ctx.fillRect(Math.round(x0 + w * 0.3), Math.round(y0 + h * 0.4), 3, 3);   // a bobber caught in it
    ctx.fillStyle = '#9aa0a8'; ctx.fillRect(Math.round(x0 + w * 0.65), Math.round(y0 + h * 0.6), 2, 4);  // a hook
    return;
  }
  if (gt.look === 'hatch') {
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = '#6e4a30'; ctx.fillRect(x0 + 1, y0 + 1, w - 2, h - 2);
    ctx.fillStyle = '#8a6040'; for (let x = x0 + 4; x < x0 + w - 4; x += 14) ctx.fillRect(x, y0 + 2, 10, 2);
    ctx.fillStyle = '#c8c0b0'; ctx.fillRect(x0 + w / 2 - 6, y0 + 4, 12, 4);
    return;
  }
  const bars = gt.look === 'bars';
  ctx.fillStyle = '#2a2030'; ctx.fillRect(x0, y0, 3, h); ctx.fillRect(x0 + w - 3, y0, 3, h);
  ctx.fillStyle = bars ? '#d0a838' : '#82828e';
  for (let x = x0 + 2; x < x0 + w - 1; x += bars ? 6 : 4) ctx.fillRect(x, y0, bars ? 3 : 1, h);
  if (!bars) { ctx.fillStyle = 'rgba(176,176,186,0.7)'; for (let y = y0; y < y0 + h; y += 6) ctx.fillRect(x0, y, w, 1); }
  ctx.fillStyle = bars ? '#a07a20' : '#5a5a66'; for (let y = y0 + 8; y < y0 + h; y += 40) ctx.fillRect(x0, y, w, 3);
}
const _drawSoftWall = drawSoftWall;
drawSoftWall = (b, jx) => {
  const x0 = b.x0 * T + jx, y0 = b.y0 * T, w = (b.x1 - b.x0 + 1) * T, h = (b.y1 - b.y0 + 1) * T, now = performance.now() / 1000;
  if (b.look === 'latch') {                                                                // a gate latch on its post: a fork the gate's bar drops into, a lever to knock it up
    const cx = x0 + w / 2, cy = y0 + h / 2;
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x0 + 3, y0 + 2, w - 6, h - 4);                  // the plate bolted to the post
    ctx.fillStyle = '#6a6a76'; ctx.fillRect(x0 + 4, y0 + 3, w - 8, h - 6);
    ctx.fillStyle = '#9a9aa6'; ctx.fillRect(x0 + 4, y0 + 3, w - 8, 1);
    ctx.fillStyle = '#2a2030'; for (const by of [y0 + 6, y0 + h - 8]) { ctx.fillRect(x0 + 6, by, 2, 2); ctx.fillRect(x0 + w - 8, by, 2, 2); }   // its bolts
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x0 + w - 6, cy - 7, 12, 4); ctx.fillRect(x0 + w - 6, cy + 3, 12, 4);   // the fork, sticking out over the gate
    ctx.fillStyle = '#b0b0ba'; ctx.fillRect(x0 + w - 5, cy - 6, 10, 2); ctx.fillRect(x0 + w - 5, cy + 4, 10, 2);
    ctx.fillStyle = '#5a5a66'; ctx.fillRect(x0 + w + 1, cy - 3, 8, 6);                      // the gate's bar, sitting in it
    ctx.save(); ctx.translate(x0 + w - 2, cy - 7); ctx.rotate(-0.5 + Math.sin(now * 2) * 0.03);   // the lever: knock it up and the bar lifts out
    ctx.fillStyle = '#2a2030'; ctx.fillRect(-2, -14, 5, 16); ctx.fillStyle = '#82828e'; ctx.fillRect(-1, -13, 3, 14);
    ctx.fillStyle = '#2a2030'; ctx.fillRect(-3, -19, 7, 7); ctx.fillStyle = '#c84a3a'; ctx.fillRect(-2, -18, 5, 5); ctx.fillStyle = '#e07a5e'; ctx.fillRect(-2, -18, 5, 1);
    ctx.restore();
    return;
  }
  if (b.look === 'balloons') {                                                             // a wall of party balloons, Grime sloshing in them
    const cols = ['#c03a5a', '#3a80c0', '#c0a830', '#e06a3a', '#5ac06a'];
    for (let i = 0; i < Math.ceil(h / 14) * 2; i++) {
      const bx = x0 + 6 + (i % 2) * (w - 12), by = y0 + 8 + Math.floor(i / 2) * 14 + Math.sin(now * 1.5 + i) * 1.5, c = cols[i % cols.length];
      ctx.fillStyle = '#2a2030'; ellipse(bx, by, 9, 10);
      ctx.fillStyle = c; ellipse(bx, by, 8, 9);
      ctx.fillStyle = '#2c1c3c'; ellipse(bx, by + 2, 4, 4);
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(Math.round(bx - 4), Math.round(by - 5), 2, 2);
    }
    ctx.fillStyle = '#e0e0e0'; for (let i = 0; i < 6; i++) ctx.fillRect(x0 + 4 + i * (w - 8) / 5, y0 + h - 20, 1, 20);
    return;
  }
  if (b.look === 'sand') {                                                                 // a drift of sand blown into the pipe, heaped right up to the top
    const cx = x0 + w / 2, foot = 22, base = y0 + h;
    const edge = k => { const u = Math.abs(k); return y0 + 3 + (h - 3) * Math.pow(Math.max(0, u - 0.28) / 0.72, 1.6); };   // the heap's outline, k from -1 (left foot) to 1
    const X = k => cx + k * (w / 2 + foot);
    ctx.fillStyle = '#5e4c32'; ctx.beginPath(); ctx.moveTo(X(-1) - 1, base);
    for (let i = 0; i <= 40; i++) { const k = -1 + i / 20; ctx.lineTo(X(k), edge(k) - 1); }
    ctx.lineTo(X(1) + 1, base); ctx.closePath(); ctx.fill();                               // a dark edge round it
    ctx.fillStyle = '#b89a68'; ctx.beginPath(); ctx.moveTo(X(-1), base);
    for (let i = 0; i <= 40; i++) { const k = -1 + i / 20; ctx.lineTo(X(k), edge(k)); }
    ctx.lineTo(X(1), base); ctx.closePath(); ctx.fill();
    ctx.save(); ctx.clip();
    ctx.fillStyle = '#d4b884'; ctx.beginPath(); ctx.moveTo(X(-1), base);                    // the lit side, toward the open end
    for (let i = 0; i <= 20; i++) { const k = -1 + i / 20; ctx.lineTo(X(k), edge(k)); }
    ctx.lineTo(cx - 4, base); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#9a7e54'; ctx.fillRect(x0 - foot, base - 5, w + foot * 2, 5);          // packed down at the bottom
    for (let j = 0; j < 6; j++) {                                                          // ripples the wind left across it
      const yy = y0 + 12 + j * (h - 16) / 6;
      ctx.fillStyle = j % 2 ? '#e8d09c' : '#a88c60';
      for (let x = x0 - foot; x < x0 + w + foot; x += 2) { const dy = Math.round(Math.sin((x - x0) * 0.22 + j * 1.7) * 1.5); ctx.fillRect(x, Math.round(yy + dy), 2, 1); }
    }
    ctx.fillStyle = '#ecd6a4'; for (let i = 0; i < 26; i++) ctx.fillRect(Math.round(x0 - foot + ((i * 37) % (w + foot * 2))), Math.round(y0 + 6 + ((i * 23) % (h - 8))), 1, 1);   // grains catching the light
    ctx.fillStyle = '#6e5a3c'; for (let i = 0; i < 14; i++) ctx.fillRect(Math.round(x0 - foot + ((i * 53 + 11) % (w + foot * 2))), Math.round(y0 + 10 + ((i * 29) % (h - 12))), 1, 1);
    ctx.fillStyle = '#7a8a5a'; ctx.fillRect(cx - 9, y0 + h * 0.45, 1, 4); ctx.fillRect(cx - 7, y0 + h * 0.45 - 2, 1, 6); ctx.fillRect(cx - 5, y0 + h * 0.45 + 1, 1, 3);   // a bit of dry grass stuck in it
    ctx.restore();
    if (Math.random() < 0.04) part(cx + (Math.random() * 2 - 1) * w * 0.3, y0 + 4, (Math.random() * 2 - 1) * 14, 12, 0.6, '#dcc08a', 1, 200);   // a trickle off the top
    return;
  }
  _drawSoftWall(b, jx);
};

// ---------- drawing the spin, the burst, the cranks turning ----------
const _drawPondFx = drawPondFx;
drawPondFx = () => {
  _drawPondFx();
  for (const s of spins) {
    const a = s.t * 30;
    ctx.strokeStyle = 'rgba(255,246,214,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(P.x, P.y - 18, 28, 10, 0, a, a + 2.4); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,211,107,0.5)'; ctx.beginPath(); ctx.ellipse(P.x, P.y - 18, 22, 7, 0, a + 3, a + 5); ctx.stroke();
  }
  for (const b of bursts) {
    const r = Math.min(BURST_R, 14 + b.t * 360), al = Math.max(0, 1 - b.t / 0.3);
    ctx.fillStyle = `rgba(255,255,255,${0.25 * al})`; ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2); ctx.fill();
  }
  for (const ck of room.def.cranks || []) {
    if (!(crankSpin[ck.id] > 0)) continue;
    crankSpin[ck.id] -= 1 / 60;
    const a = performance.now() / 60;
    ctx.fillStyle = '#d0a838'; for (let k = 0; k < 4; k++) { const ang = a + k * Math.PI / 2; ctx.fillRect(Math.round(ck.x + Math.cos(ang) * 8) - 1, Math.round(ck.y - 28 + Math.sin(ang) * 8) - 1, 3, 3); }
  }
};
const _updatePond = updatePond;
updatePond = dt => { updateSpecialCD(dt); _updatePond(dt); if (spins.length) updateSpins(dt); if (bursts.length) updateBursts(dt); };
const _setupPondRoom = setupPondRoom;
setupPondRoom = () => { spins.length = 0; bursts.length = 0; _setupPondRoom(); };

// ---------- the slide (a friend's playtest, 10/14/2026): walk off the top of the deck and he sits down on it and
// goes, arms up. Speeds up as it steepens, slows a bit on the flat at the bottom, and shoots him off the end ----------
const chuteAt = (c, t) => [c.x0 + (c.x1 - c.x0) * t, c.y0 + (c.y1 - c.y0) * (3 * t * t - 2 * t * t * t)];
const CHUTE_SIT = 7;            // his bottom sits this far up from the middle of the trough, down in the bed
function chuteStart(dir) {
  const c = room.def.chute;
  if (P.story || P.atk || P.roll > 0 || P.dash > 0 || P.ko > 0 || P.swim || P.hang || P.cling || P.vy < 0) return false;
  if (!(dir > 0 || P.vx > 20) || P.x < c.x0 - 30 || P.x > c.x0 + 10 || Math.abs(P.y - c.y0) > 6) return false;
  P.chute = { t: 0, v: 90, k: 0 }; P.facing = 1; P.vx = P.vy = 0; P.charge = 0; P.crawl = false; P.h = STAND_H;
  sfx.squeak(); sfx.whee();
  return true;
}
function updateChute(dt) {
  const c = room.def.chute, s = P.chute;
  s.k += dt;
  const dx = c.x1 - c.x0, dy = (c.y1 - c.y0) * 6 * s.t * (1 - s.t), len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx);
  s.v = Math.min(430, Math.max(40, s.v + (420 * Math.sin(ang) - 60) * dt));
  s.t = Math.min(1, s.t + s.v * dt / len);
  s.ang = ang;
  const [x, y] = chuteAt(c, s.t), sink = CHUTE_SIT * Math.min(1, s.t * 12);
  P.x = x; P.y = y - sink; P.fallTop = P.y; P.ground = false;
  if (Math.random() < dt * 14) part(P.x - 10, P.y + 2, -s.v * 0.2, -10 - Math.random() * 20, 0.35, '#ffd8c8', 1, 100);   // a little squeaky streak behind him
  if (s.t >= 1) {                                                                          // off the end, still going
    P.chute = null; P.slid = true; P.vx = Math.min(240, s.v); P.vy = -20; P.fallTop = P.y; sfx.whoosh(); puff(P.x, P.y, 5, 40);
  }
}

// ---------- the merry-go-round: he climbs on and it goes round and round, and he gets an idea ----------
SCENES.spinner = def => {
  const rd = def.ride;
  return [
    bars(true), walkTo(rd.x - 10), run(() => { P.vx = 0; sfx.creak(); }),
    (t, dt) => {                                                                             // round and round, faster and faster
      const sp = Math.min(18, 3 + t * 8);
      P.story = { kind: 'scene', frame: 'rollslash_2_' + (Math.floor(t * sp) % 2 ? 'L' : 'R'), t };
      if (Math.floor(t * 4) !== Math.floor((t - dt) * 4)) sfx.creak();
      if (Math.random() < dt * 20) part(P.x + (Math.random() * 2 - 1) * 20, P.y - 4, (Math.random() * 2 - 1) * 60, -30, 0.4, '#c4a674', 1, 200);
      return t > 2.4;
    },
    run(() => { P.story = { kind: 'scene', frame: 'ko_1', t: 0 }; sfx.thud(); puff(P.x, P.y, 8, 50); }), wait(0.9),   // flung off, dizzy
    run(() => { P.story = { kind: 'scene', frame: null, t: 0 }; }),
    pose('look_up', 0.3), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); twinkle(P.x, P.y - 46, 8); }), wait(0.8),
    run(() => { world.learned.spin = true; saveWorld(); popup(P.x, P.y - 54, 'learned to spin', '#ffd36b', true); }),
    pose(null), wait(0.4), bars(false),
    run(() => room.hints.push({ text: '{spin}: spin. it turns cranks', l: 0, t: 0, r: room.pxW, b: room.pxH, x: P.x, y: P.y - 66, a: 0, until: 'gateSpinner' })),
  ];
};

// ---------- the dandelion clocks: the wind takes the big one and it bursts into a thousand bits of fluff ----------
SCENES.dandelion = def => {
  const ck = def.clock;
  return [
    bars(true), run(() => { P.vx = 0; }), faceTo(ck.x), camTo(ck.x, ck.y - 240, 0.9), wait(0.4),
    run(() => sfx.rustle(1.4)),
    (t, dt) => {                                                                             // the seeds going everywhere
      if (Math.random() < dt * 80) { const a = Math.random() * Math.PI * 2; part(ck.x + Math.cos(a) * 20, ck.y - 300 + Math.sin(a) * 20, Math.cos(a) * (60 + Math.random() * 120) + 40, Math.sin(a) * 80 - 20, 2.2, Math.random() < 0.5 ? '#ffffff' : '#f0ece4', Math.random() < 0.3 ? 2 : 1, -10); }
      return t > 1.8;
    },
    camBack(), wait(0.5),
    pose('look_up', 0.3), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); twinkle(P.x, P.y - 46, 8); }), wait(0.7),
    run(() => { world.learned.burst = true; saveWorld(); startBurst(); }), wait(0.6),
    run(() => popup(P.x, P.y - 54, 'learned the fluff burst', '#ffd36b', true)), wait(0.6), bars(false),
    run(() => room.hints.push({ text: '{down} + {squeak}: fluff burst. it blows sand away', l: 0, t: 0, r: room.pxW, b: room.pxH, x: P.x, y: P.y - 66, a: 0, until: 'drift_drift1' })),
  ];
};

// ---------- the doll's raincoat, left in the sandbox ----------
SCENES.raincoat = it => [
  bars(true), wait(0.3),
  run(() => { popup(P.x, P.y - 54, "a doll's raincoat", '#f0d070', true); sfx.pickup(); }), wait(0.9),
  pose('look_down', 0.4), run(() => { sfx.paper(); puff(P.x, P.y - 20, 10, 40, '#f0d070', 40); }), pose('turn', 0.3), pose(null),
  run(() => { world.learned.waterproof = true; world.has.raincoat = true; saveWorld(); popup(P.x, P.y - 54, "waterproof. deep water won't sink him now", '#96d2ff', true); sfx.idea(); }),
  wait(1.0), bars(false),
];

// ---------- the old tin monkey: wandered this playground alone for years. Sells what it knows for marbles ----------
const MONKEY_SHOP = [
  { id: 'toldCrayonPg', what: 'where the orange crayon went', cost: 14, done: () => world.has.crayon_playground, mark: { room: 'slide', x: 4.5 * 16, y: 11 * 16 },
    line: "The orange one? Top of the slide. There's a hatch on the ladder, rusted shut, and a crank right by it. The kids used to spin it. I can't, I've only got the one good arm." },
  { id: 'toldFountain', what: 'a soft wall by the fountain', cost: 22, done: () => world.flags.fountain_mud, mark: { room: 'fountain', x: 55 * 16, y: 24 * 16 },
    line: "Under the drinking fountain, down the hole by the picnic tables. One wall down there's just mud. Something rolled in behind it once. I heard it go." },
  { pin: 'party_hat', line: "A party hat, from the party. Wear it and all your noisy business won't tire you out so fast." },
  { pin: 'tiny_top', line: "A tiny top. Little cousin of the big one, much better manners. Pin it on and your spin lasts longer." },
];
const MONKEY_COTTON = [24, 32, 40];
const MONKEY_CHAT = [
  ["*clang* Sorry. Old habit. The crowd used to love that one."],
  ['There were so many of us here once. Dolls, trucks, a whole set of blocks. Some went home with the kids. The rest of us just stayed.'],
  ["The left-behind ones go sour, and the Grime finds them easy. The teeth used to be a laugh, you know. Wind them up, clack clack clack. Now look at them."],
  ["The swings creak at night with nobody on them. I don't go near the swings."],
];
function monkeyList() {
  const out = [];
  for (const s of MONKEY_SHOP) {
    if (s.pin) { if (!(world.pins || {})[s.pin]) out.push({ ...s, what: PINS[s.pin].name, cost: PINS[s.pin].cost }); }
    else if (!world.flags[s.id] && !(s.done && s.done())) out.push(s);   // not once he's found it himself
  }
  const c = world.monkeyCotton || 0;
  if (world.flags.topDown && c < MONKEY_COTTON.length) out.push({ cotton: true, what: 'a tuft of stuffing', cost: MONKEY_COTTON[c], line: c ? "More stuffing. From a bear that won't be needing it." : "Stuffing, out of the lost and found box. You're leaking a little there, friend." });
  return out;
}
SCENES.monkey = npc => {
  const steps = [walkTo(npc.x - 3.5 * T), faceTo(npc.x)];
  if (!world.flags.metMonkey) {
    world.flags.metMonkey = true; saveWorld();
    steps.push(run(() => { npcPose = { frame: 'monkey_clang', t: 0.5 }; sfx.clang(); }), wait(0.6),
      say('monkey', "Oh. Oh my. A visitor. A soft one, and the Grime hasn't got him. Haven't had an audience in years.",
        "I'm the last one out here. The last one still himself, anyway. I used to do two shows a day on that bench. *clang*",
        "I take marbles now. The kids drop them in the sand. You bring me marbles and I'll tell you what I know, and I know plenty. I've had nothing but time."));
  } else steps.push(say('monkey', ...MONKEY_CHAT[Math.floor(Math.random() * MONKEY_CHAT.length)]));
  const left = monkeyList();
  if (!left.length) return [...steps, say('monkey', "That's the whole act. No more secrets, no more stuffing. Come by and keep me company sometime, though.")];
  let picked = -1;
  steps.push(ask('monkey', `What'll it be, friend? You've got ${world.marbles || 0} marbles.`, [...left.map(s => `${s.what} (${s.cost} marbles)`), 'nothing, bye'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const s = left[picked];
    if (!s) return true;
    if ((world.marbles || 0) < s.cost) { scene.steps.splice(scene.i + 1, 0, say('monkey', "Not enough marbles. I'd love to, I would, but a monkey's got to have something.")); return true; }
    world.marbles -= s.cost; sfx.marble();
    const after = [];
    if (s.pin) { world.pins = world.pins || {}; world.pins[s.pin] = true; after.push(run(() => { popup(P.x, P.y - 54, 'got the ' + PINS[s.pin].name, '#e8e6f0'); sfx.pickup(); })); }
    else if (s.cotton) { world.monkeyCotton = (world.monkeyCotton || 0) + 1; after.push(run(() => addCotton())); }
    else { world.flags[s.id] = true; world.marks.push(s.mark); after.push(run(() => popup(P.x, P.y - 54, 'marked on his map', '#e8e6f0'))); }
    saveWorld();
    scene.steps.splice(scene.i + 1, 0, say('monkey', s.line), run(() => { npcPose = { frame: 'monkey_clang', t: 0.4 }; sfx.clang(); }), ...after, ...nod());
    return true;
  });
  return steps;
};

// ---------- a memory: the bubble wand ----------
SCENES.memoryWand = it => [
  bars(true), wait(0.4),
  run(() => { sceneFade.warm = true; sfx.memory(); }),
  showText(['a bubble wand, pink plastic.', 'a summer evening on the back step. his kid blowing bubbles,', 'and holding him up so he could catch them on his nose.']),
  run(() => {
    world.maxHealth += 1; P.maxHealth = world.maxHealth - (P.worn || 0); P.health = Math.min(P.maxHealth, P.health + 1); saveWorld();
    sceneFade.warm = false; puff(P.x, P.y - 22, 14, 60, '#ffffff', 60); sfx.stitch();
    popup(P.x, P.y - 54, 'one more cotton puff', '#fbf7ec', true);
  }),
  wait(1.0), bars(false),
];
