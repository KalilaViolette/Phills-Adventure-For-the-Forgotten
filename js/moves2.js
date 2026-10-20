'use strict';
// ---------- static spark and the belly flop (10/18/2026: the combat kit audit) ----------
// Both are his to learn later (the spark in the Greenhouse, the flop in the Hive, neither built yet). "Unlock all moves"
// turns them on to try. Nothing here gives back loose fluff: that's still what close hits are for.

// ---- static spark: he rubs himself fuzzy and flings a crackle of static. {spark}. Aimed the way he faces, or up or down
// with up or down held. It goes so far, stops at walls, and goes by each enemy's own rules: what the sword glances off, it
// glances off too, and a boss only takes it where a sword hit would count. It cuts Bramble. Costs breath, like the specials
const SPARK = { wind: 0.16, speed: 380, reach: 190, dmg: 1, cost: 16, wait: 0.45 };
const sparks = [];
function startSpark() {
  if (!can('spark') || P.sparkT > 0 || P.sparkCD > 0 || P.ko > 0 || P.respawnT > 0 || P.swim || P.crawl || P.hang || P.cling || P.chute || P.held) return;
  if (P.en <= 0) { P.enFlash = 0.3; sfx.tired(); return; }
  P.en = Math.max(0, P.en - (typeof specialCost === 'function' ? specialCost(SPARK.cost) : SPARK.cost)); P.enDelay = tune.enDelay; if (P.en <= 0) P.winded = true;
  P.sparkT = SPARK.wind; P.sparkCD = SPARK.wind + SPARK.wait; P.atk = null; P.charge = 0;
  P.sparkAim = inp.up || inp.aimUp ? 'up' : (inp.down || inp.aimDown) && !P.ground ? 'down' : 'side';
  sfx.rustle && sfx.rustle(0.8);
  if (!world.flags.sparkedOnce) { world.flags.sparkedOnce = true; saveWorld(); }
}
function fireSpark() {
  const a = P.sparkAim, vx = a === 'side' ? P.facing * SPARK.speed : 0, vy = a === 'up' ? -SPARK.speed : a === 'down' ? SPARK.speed : 0;
  const x = P.x + (a === 'side' ? P.facing * 12 : 0), y = P.y - (a === 'up' ? 34 : a === 'down' ? 4 : 20);
  sparks.push({ x, y, x0: x, y0: y, vx, vy, t: 0, hit: new Set(), trail: [] });
  sfx.zap ? sfx.zap() : sfx.tink();
  for (let i = 0; i < 6; i++) part(x, y, (Math.random() * 2 - 1) * 80, (Math.random() * 2 - 1) * 80, 0.2, i % 2 ? '#d8f0ff' : '#fff6a0', 1, 0);
}
function updateSparkMove(dt) {
  P.sparkCD = Math.max(0, (P.sparkCD || 0) - dt);
  if (P.sparkT > 0) {
    P.sparkT -= dt; P.vx *= 0.7;
    if (Math.random() < dt * 40) part(P.x + (Math.random() * 2 - 1) * 10, P.y - 10 - Math.random() * 20, 0, -10, 0.15, Math.random() < 0.5 ? '#d8f0ff' : '#fff6a0', 1, 0);   // fuzzing up
    if (P.sparkT <= 0) { P.sparkT = 0; fireSpark(); }
  }
}
function sparkBox(s) { return { l: s.x - 4, r: s.x + 4, t: s.y - 4, b: s.y + 4 }; }
function updateSparks(dt) {
  for (const s of sparks) {
    const n = 4;
    for (let k = 0; k < n && !s.dead; k++) {
      s.x += s.vx * dt / n; s.y += s.vy * dt / n;
      if (Math.hypot(s.x - s.x0, s.y - s.y0) > SPARK.reach) { s.dead = true; break; }
      // Bramble (and anything that needs it) first, then walls
      for (const b of room.breaks) {
        if (b.broken || b.need !== 'spark') continue;
        if (s.x >= b.x0 * T && s.x <= (b.x1 + 1) * T && s.y >= b.y0 * T && s.y <= (b.y1 + 1) * T) { b.hp = (b.hp || 1) - 1; b.shake = 0.2; sfx.crumble(); if (b.hp <= 0) breakOpen(b); s.dead = true; break; }
      }
      if (s.dead) break;
      if (solidPx(s.x, s.y)) { s.dead = true; spark(s.x, s.y); break; }
      const box = sparkBox(s);
      for (const f of foes) {
        if (f.state === 'down' || f.state === 'hidden' || s.hit.has(f) || !overlap(box, foeBox(f))) continue;
        s.hit.add(f); s.dead = true;
        const fb = foeBox(f), cx = (fb.l + fb.r) / 2, cy = (fb.t + fb.b) / 2;
        if (specialDeflected(f, 'spark', s.x, s.y)) break;                                  // what the sword glances off, so does the spark
        foeHurt(f, SPARK.dmg * swordBonus(), Math.sign(s.vx || (cx - P.x)) * 90, s.x, s.y, false, { power: 0.9 });
        break;
      }
      if (s.dead) break;
      if (boss && typeof bossHits === 'function' && !s.hit.has('boss')) {               // a boss: only where a sword hit would count (its own hits() decides)
        const was = boss.hp, a = { type: 'spark', hit: new Set(), t: 0, scale: 1 };
        bossHits(box, a);
        if (a.hit.has('boss')) { s.hit.add('boss'); s.dead = true; if (boss.hp === was) spark(s.x, s.y); }
      }
    }
    s.t += dt; s.trail.push([s.x, s.y]); if (s.trail.length > 6) s.trail.shift();
    if (s.dead) for (let i = 0; i < 8; i++) part(s.x, s.y, (Math.random() * 2 - 1) * 120, (Math.random() * 2 - 1) * 120, 0.22, i % 2 ? '#d8f0ff' : '#fff6a0', 1, 0);
  }
  for (let i = sparks.length - 1; i >= 0; i--) if (sparks[i].dead) sparks.splice(i, 1);
}
function drawSparks() {
  for (const s of sparks) {                                                                // a zigzag of static, cream and pale blue
    ctx.strokeStyle = '#d8f0ff'; ctx.lineWidth = 1; ctx.globalAlpha = 0.9; ctx.beginPath();
    s.trail.forEach(([x, y], i) => { const j = (i % 2 ? 2 : -2); const px = s.vy ? x + j : x, py = s.vy ? y : y + j; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); });
    ctx.stroke(); ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff6a0'; ctx.fillRect(Math.round(s.x) - 2, Math.round(s.y) - 2, 4, 4); ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 1, 2, 2);
  }
}

// ---- the belly flop: in the air, {down} + {jump}. He tucks up for a blink, drops like a sack of stuffing and lands heavy:
// everything close by gets knocked back and hurt, and crusts (anything that needs it) break under him. It spends his
// height, unlike the bounce, and he's flat on his tummy for a moment after, so a bad one can be punished. Not into water
const FLOP = { tuck: 0.12, fall: 560, lag: 0.28, r: 44, dmg: 2, minAir: 0.08 };
function canFlop() {
  return can('flop') && !P.ground && !P.flop && !P.swim && !P.hang && !P.cling && !P.chute && !P.held && P.hurtT <= 0 && P.ko <= 0 && P.dropT <= 0 && (P.airT || 0) >= FLOP.minAir;
}
function startFlop() {
  P.flop = { phase: 'tuck', t: 0 }; P.atk = null; P.charge = 0; P.dash = 0; P.airHang = null; P.jumpBufT = 0;
  sfx.whoosh(); puff(P.x, P.y - 12, 4, 30);
  if (!world.flags.floppedOnce) { world.flags.floppedOnce = true; saveWorld(); }
}
// (called just before he moves each step: sets how he moves while flopping, and the moment on his tummy after)
function flopMotion(dt) {
  if (P.flopLag > 0) { P.flopLag -= dt; P.vx = 0; P.jumpBufT = 0; P.atkBufT = 0; P.dodgeBufT = 0; return; }
  const f = P.flop; if (!f) return;
  if (P.swim) { P.flop = null; return; }                                                   // into the water: it's just a dive
  f.t += dt;
  if (f.phase === 'tuck') { P.vx *= 0.6; P.vy = 0; if (f.t >= FLOP.tuck) { f.phase = 'drop'; f.t = 0; } }
  else { P.vx = 0; P.vy = FLOP.fall; if (Math.random() < dt * 30) part(P.x + (Math.random() * 2 - 1) * 6, P.y - 24, 0, -40, 0.25, '#ffffff', 1, 0); }
}
function flopLand() {
  if (!P.flop) return false;
  const dropped = P.flop.phase === 'drop' ? P.flop.t : 0;
  P.flop = null; P.flopLag = FLOP.lag; P.fallTop = P.y;
  shakeT = 0.18; shakeA = 3; sfx.thud(); sfx.splat && sfx.splat(); puff(P.x, P.y, 16, 110);
  for (let i = 0; i < 10; i++) part(P.x + (i - 5) * 4, P.y - 2, (i - 5) * 30, -60 - Math.random() * 60, 0.4, '#e9e4da', 2, 300);
  const box = { l: P.x - FLOP.r, r: P.x + FLOP.r, t: P.y - 24, b: P.y + 4 };
  for (const f of foes) {
    if (f.state === 'down' || f.state === 'hidden' || !overlap(box, foeBox(f))) continue;
    const fb = foeBox(f), cx = (fb.l + fb.r) / 2, cy = (fb.t + fb.b) / 2;
    if (specialDeflected(f, 'flop', cx, cy)) continue;
    foeHurt(f, FLOP.dmg * swordBonus(), Math.sign(cx - P.x || 1) * 260, cx, cy, true, { power: 1.6 });
  }
  if (boss && typeof bossHits === 'function') bossHits(box, { type: 'flop', hit: new Set(), t: 0, scale: 1 });
  for (const b of room.breaks) {                                                            // crusts and loose covers under him
    if (b.broken || b.need !== 'flop') continue;
    const r = { l: b.x0 * T, r: (b.x1 + 1) * T, t: b.y0 * T, b: (b.y1 + 1) * T };
    if (overlap({ l: P.x - 10, r: P.x + 10, t: P.y - 2, b: P.y + 6 }, r)) breakOpen(b);
  }
  return true;
}
