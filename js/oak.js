'use strict';
// ---------- the Old Oak: the velcro grip, the cape and the crow, the owl, the litter that blows up into trees ----------
// The velcro grip (a kid's lost sneaker, in the bottom of the hollow trunk) clings to rough bark: hold toward a bark wall
// in the air to catch on, jump to jump off it. The cape (the handkerchief in the nest's lining) glides: hold {jump} on the
// way down. Finding it is where he meets the crow again, and from then on the crow flies him between the places it
// perches. The pill bug in the rot shows him the big swing out of a roll. The owl sells what it knows for feathers.

// a drift of dead leaves packed into a hole (or heaped on the ground), drawn once. Pointed leaves with their midribs,
// browns and a few red ones, the dry ones on top lighter, leaves poking out past the edge so there's no hard outline,
// spilling out of a hole onto whatever's in front of it, a couple of twigs, a few loose ones lying in front
function leafPile(b, w, h, rnd) {
  const bell = b.pile, tall = !bell && h > w;
  const open = (x, y) => !room.map || x < 0 || x >= room.W || (room.map[y * room.W + x] !== 1);
  const spill = tall ? (open(b.x0 - 1, b.y1) ? -1 : 1) : 0;                                   // which way it spills out of the hole
  const pad = bell ? Math.ceil(bell[1] * T) + 8 : 22, c = document.createElement('canvas'); c.width = w + pad * 2; c.height = h + pad * 2;
  // a heap with its own shape (pile: [peak x, width, height] in tiles): a bell, drifted up against whatever it's covering,
  // its tail running out a little longer on the right
  const bx = bell ? bell[0] * T - b.x0 * T : 0, bw = bell ? bell[1] * T / 2 : 0, bh = bell ? bell[2] * T : 0;
  const bellTop = x => { const d = x - bx, sg = bw * (d < 0 ? 0.5 : 0.62); return h - bh * Math.exp(-(d / sg) * (d / sg)) + 1.5 * Math.sin(x * 0.7); };
  const g = c.getContext('2d'), ox = pad, oy = pad;
  // the shape it fills: the hole, plus a slope of leaves spilling out at the bottom (or a dome, on open ground)
  const inside = (x, y) => {
    if (bell) return y <= h && Math.abs(x - bx) <= bw && y >= bellTop(x);
    if (tall) {
      const below = Math.max(0, (y - (h - 18)) / 18);                                         // the spill: nothing up top, a slope at the foot
      const out = 16 * below * below;
      return y >= -2 && y <= h && (spill < 0 ? (x >= -out && x <= w + 3) : (x >= -3 && x <= w + out));
    }
    const k = (x - w / 2) / (w / 2 + 6); return y <= h && y >= h - (h + 4) * Math.sqrt(Math.max(0, 1 - k * k * k * k)) - 1;
  };
  g.translate(ox, oy);
  g.fillStyle = '#2a1a0c';                                                                     // the dark of the drift deep in
  for (let y = -pad; y <= h; y += 2) for (let x = -pad; x <= w + pad; x += 2) if (inside(x, y)) g.fillRect(x, y, 2, 2);
  const cols = ['#5a3814', '#6a4218', '#8a5a2a', '#a8702e', '#c08a3a', '#d8a850', '#7a3418', '#9a4a20'];
  const X0 = bell ? bx - bw - 4 : -18, XW = bell ? bw * 2 + 8 : w + 36, Y0 = bell ? h - bh - 6 : -4, YH = bell ? bh + 8 : h + 6;
  const n = Math.round(XW * YH / 9);
  let k = 0;
  for (let i = 0; i < n * 4 && k < n; i++) {                                                   // back to front: deep ones dark, the ones on top dry and pale
    const x = X0 + rnd(i * 3 + 1) * XW, y = Y0 + rnd(i * 3 + 2) * YH;
    const edge = !inside(x + 3, y) || !inside(x - 3, y) || !inside(x, y - 3);
    if (!inside(x, y) && !(edge && inside(x - (x - w / 2) * 0.1, y + 2))) continue;
    k++;
    const depth = k / n, top = bell ? 1 - Math.min(1, Math.max(0, (y - (h - bh)) / bh)) : 1 - Math.min(1, Math.max(0, y / h));
    const ci = Math.min(cols.length - 1, Math.floor(depth * 4 + top * 2 + rnd(i * 7) * 2.5));
    const red = rnd(i * 11) < 0.12, col = red ? (rnd(i) < 0.5 ? cols[6] : cols[7]) : cols[ci];
    const L = 4 + rnd(i * 5) * 4, W2 = 1.6 + rnd(i * 13) * 1.2, a = rnd(i * 17) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
    g.fillStyle = '#1c1008';                                                                   // its outline
    g.beginPath(); g.moveTo(x - ca * (L + 1), y - sa * (L + 1)); g.quadraticCurveTo(x - sa * (W2 + 1), y + ca * (W2 + 1), x + ca * (L + 1), y + sa * (L + 1)); g.quadraticCurveTo(x + sa * (W2 + 1), y - ca * (W2 + 1), x - ca * (L + 1), y - sa * (L + 1)); g.fill();
    g.fillStyle = col;
    g.beginPath(); g.moveTo(x - ca * L, y - sa * L); g.quadraticCurveTo(x - sa * W2, y + ca * W2, x + ca * L, y + sa * L); g.quadraticCurveTo(x + sa * W2, y - ca * W2, x - ca * L, y - sa * L); g.fill();
    if (L > 5.5) { g.strokeStyle = 'rgba(40,20,8,0.7)'; g.lineWidth = 0.6; g.beginPath(); g.moveTo(x - ca * L * 0.8, y - sa * L * 0.8); g.lineTo(x + ca * L * 0.8, y + sa * L * 0.8); g.stroke(); }   // the midrib
  }
  g.strokeStyle = '#3a2412'; g.lineWidth = 1.2;                                                // a couple of twigs caught in it
  for (let t = 0; t < 2; t++) { const x = bell ? bx + (rnd(t + 90) - 0.5) * bw : w * (0.2 + rnd(t + 90) * 0.6), y = bell ? h - bh * (0.2 + rnd(t + 91) * 0.4) : h * (0.2 + rnd(t + 91) * 0.6), a = rnd(t + 92) * 3; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * 12, y + Math.sin(a) * 12); g.lineTo(x + Math.cos(a) * 12 + 3, y + Math.sin(a) * 12 - 3); g.stroke(); }
  if (tall || bell) for (let t = 0; t < 4; t++) {                                              // a few loose ones lying out in front
    const x = bell ? bx - bw - 4 - rnd(t + 70) * 14 : (spill < 0 ? -18 - rnd(t + 70) * 14 : w + 18 + rnd(t + 70) * 14), y = h - 1;
    g.fillStyle = cols[2 + (t % 4)]; g.beginPath(); g.ellipse(x, y, 3.5, 1.4, rnd(t + 71) * 0.6 - 0.3, 0, Math.PI * 2); g.fill();
  }
  return { c, ox, oy, spill: spill || 1 };
}

// ---------- the walls the Old Oak and Rootwood's gated pockets are shut with ----------
const _drawSoftWallOak = drawSoftWall;
drawSoftWall = (b, jx) => {
  const x0 = b.x0 * T + jx, y0 = b.y0 * T, w = (b.x1 - b.x0 + 1) * T, h = (b.y1 - b.y0 + 1) * T, now = performance.now() / 1000;
  const rnd = seed => { const s = Math.sin(seed * 127.1 + b.x0 * 311.7 + b.y0 * 74.7) * 43758.5453; return s - Math.floor(s); };
  if (b.look === 'web') {                                                                 // an old spider web, thick as felt
    ctx.strokeStyle = 'rgba(236,232,224,0.9)'; ctx.lineWidth = 1;
    const cx = x0 + w / 2, cy = y0 + h / 2, R = Math.max(w, h) * 0.75;
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); }
    for (let r = 5; r < R; r += 6) { ctx.beginPath(); for (let k = 0; k <= 10; k++) { const a = k / 10 * Math.PI * 2, rr = r * (1 + 0.08 * Math.sin(k * 3 + r)); ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } ctx.stroke(); }
    ctx.fillStyle = 'rgba(230,226,218,0.55)'; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = '#2c1c3c'; for (let k = 0; k < 5; k++) ctx.fillRect(x0 + rnd(k) * (w - 4), y0 + rnd(k + 9) * (h - 4), 3, 3);   // dead things in it
    return;
  }
  if (b.look === 'leaves') {                                                              // dead leaves drifted in and packed tight (redrawn 10/14/2026: it has to look natural)
    if (!b.leafArt) b.leafArt = leafPile(b, w, h, rnd);
    const A = b.leafArt;
    ctx.drawImage(A.c, Math.round(x0 - A.ox), Math.round(y0 - A.oy));
    if (Math.sin(now * 2 + b.x0) > 0.95) part(x0 + Math.random() * w, y0 + Math.random() * h, A.spill * 10, 5, 0.8, '#c08a3a', 1, 60);   // a leaf drifting loose
    return;
  }
  if (b.look === 'bramble') {                                                             // Bramble, grown right across
    ctx.fillStyle = '#1e0e16'; ctx.fillRect(x0, y0, w, h);
    ctx.strokeStyle = '#4e2436'; ctx.lineWidth = 3;
    for (let k = 0; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x0 + rnd(k) * w, y0 - 2); for (let yy = y0; yy < y0 + h + 4; yy += 8) ctx.lineTo(x0 + ((rnd(k) * w) + Math.sin(yy * 0.3 + k) * 5 + w) % w, yy); ctx.stroke(); }
    ctx.fillStyle = '#cdb8a8'; for (let k = 0; k < h / 4; k++) { const tx = x0 + rnd(k + 3) * w, ty = y0 + rnd(k + 17) * h; ctx.fillRect(tx, ty, 2, 1); ctx.fillRect(tx + 1, ty - 1, 1, 1); }
    return;
  }
  if (b.look === 'rot') {                                                                 // a rotten patch of wood: soft, pale, crumbling
    ctx.fillStyle = '#2a1c12'; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = '#5a4a30'; ctx.fillRect(x0 + 1, y0 + 1, w - 2, h - 2);
    for (let k = 0; k < w * h / 20; k++) { ctx.fillStyle = k % 3 ? '#8a7a5a' : '#3a2a1a'; ctx.fillRect(x0 + rnd(k) * (w - 3), y0 + rnd(k + 5) * (h - 2), 3, 1); }
    ctx.fillStyle = '#a89a78'; for (let k = 0; k < 4; k++) { const my = y0 + 6 + k * (h / 4); ctx.beginPath(); ctx.ellipse(x0 + w / 2, my, w * 0.6, 3, 0, 0, Math.PI * 2); ctx.fill(); }   // brackets of fungus
    if (b.hp < b.hp0) { ctx.strokeStyle = '#1a120c'; ctx.lineWidth = 1; for (let k = 0; k < (b.hp0 - b.hp) * 2; k++) { ctx.beginPath(); ctx.moveTo(x0 + rnd(k + 21) * w, y0); ctx.lineTo(x0 + rnd(k + 22) * w, y0 + h); ctx.stroke(); } }
    return;
  }
  if (b.look === 'hardroot') {                                                            // a willow root, hard as iron, grown right across the bank
    ctx.fillStyle = '#2a2018'; ctx.fillRect(x0 - 2, y0, w + 4, h);
    ctx.fillStyle = '#4a3a28'; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = '#6a5640'; ctx.fillRect(x0 + 2, y0, 4, h);
    ctx.fillStyle = '#2a2018'; for (let yy = y0 + 6; yy < y0 + h; yy += 14) ctx.fillRect(x0 + 4 + (yy % 3) * 3, yy, w - 10, 2);
    ctx.fillStyle = '#8a7a60'; for (let yy = y0 + 10; yy < y0 + h; yy += 22) ctx.fillRect(x0 + 3, yy, 2, 6);                   // a hard shine on it
    ctx.fillStyle = '#3e5a2e'; ctx.fillRect(x0 - 3, y0 + h - 6, 5, 3); ctx.fillRect(x0 + w - 2, y0 + h - 9, 5, 3);            // moss where it meets the mud
    return;
  }
  _drawSoftWallOak(b, jx);
};

// ---------- the litter that ends up in a tree ----------
Object.assign(FOE, {
  // a paper airplane: glides in long passes across the room, dipping down toward him when it comes past. Newer
  // (10/16/2026): loops the loop over him and swoops back down at him, throws a few little paper darts, and climbs up
  // and nose dives straight down at him, where it sticks in the ground a moment
  plane: { hp: 4, hw: 14, h: 10, acorns: [1, 2], free: true,
    setup(f) { f.hx = f.x; f.hy = f.y; f.f = f.f || -1; f.dir = f.f; },
    box: f => ({ l: f.x - 14, r: f.x + 14, t: f.y - 14, b: f.y - 2 }),
    harmless: f => f.state === 'stuck' || f.state === 'climb',
    update(f, dt) {
      if (f.state === 'down') { fallDown(f, dt); return; }
      baseState(f, dt);
      if (f.state === 'stagger') { freeMove(f, 0, 20 * dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx);
      if (f.state === 'walk') {
        const want = near(f, 400, 120) && adx < 120 ? P.y - 34 : f.hy + Math.sin(f.t * 1.3) * 18;   // dips at him as it comes past
        const dy = Math.sign(want - f.y) * Math.min(Math.abs(want - f.y), 70 * dt);
        const moved = freeMove(f, f.dir * 95 * dt, dy);
        if (!moved) { f.dir = -f.dir; f.f = f.dir; }
        f.dive = Math.abs(want - f.y) > 10 && want > f.y;
        strike(f, FOE.plane.box(f), 14);
        if (f.t > 0.4) f.hitP = false;
        if (f.cd <= 0 && near(f, 300, 200)) {
          const above = P.y - f.y > 10 && P.y - f.y < 120;
          const m = choose([[1.6, 'pass'], [hasMove(f, 2) && above && adx < 90 ? 1.3 : 0, 'loop'], [hasMove(f, 3) && adx > 60 && adx < 260 ? 1 : 0, 'foldwind'], [hasMove(f, 4) && adx < 200 ? 0.9 : 0, 'climb']]);
          if (m === 'pass' || !m) f.cd = 1 + Math.random() * 0.6;
          else { setFoeState(f, m); f.lx = f.x; f.ly = f.y; f.la = 0; if (m === 'foldwind') { f.dir = f.f = Math.sign(dx) || f.f; } sfx.whoosh(); }
        }
      } else if (f.state === 'loop') {                                                   // a loop the loop, up and over...
        const R = 30, d = f.dir; f.la = Math.min(Math.PI * 2, f.la + dt * 6.5);
        const tx = f.lx + d * R * Math.sin(f.la), ty = f.ly - R + R * Math.cos(f.la);
        if (!freeMove(f, tx - f.x, ty - f.y)) { setFoeState(f, 'walk'); f.cd = 1; return; }
        f.ang = Math.atan2(-R * Math.sin(f.la), d * R * Math.cos(f.la));
        if (f.la >= Math.PI * 2) { setFoeState(f, 'swoop'); f.f = f.dir = Math.sign(dx) || f.dir; const dd = Math.hypot(dx, P.y - 18 - f.y) || 1; f.svx = dx / dd * 190; f.svy = (P.y - 18 - f.y) / dd * 190; sfx.whoosh(); }
      } else if (f.state === 'swoop') {                                                  // ...and straight back down at him
        f.ang = Math.atan2(f.svy, f.svx);
        const moved = freeMove(f, f.svx * dt, f.svy * dt);
        strike(f, FOE.plane.box(f), 16);
        if (!moved || f.t >= 0.7) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; }
      } else if (f.state === 'foldwind') {                                               // hanging there a moment, then a handful of little paper darts
        freeMove(f, 0, Math.sin(f.t * 8) * 10 * dt);
        if (f.t >= 0.5) {
          sfx.whoosh(); setFoeState(f, 'throw');
          const base = Math.atan2(P.y - 20 - f.y, dx);
          for (let i = -1; i <= 1; i++) { const a2 = base + i * 0.2;
            shots.push({ kind: 'dart', col: '#e8e4d8', x: f.x + f.f * 10, y: f.y - 8, vx: Math.cos(a2) * 170, vy: Math.sin(a2) * 170, g: 0, from: f, reflected: false, t: 0, life: 2.4,
              draw: sh => { const an = Math.atan2(sh.vy, sh.vx); ctx.save(); ctx.translate(Math.round(sh.x), Math.round(sh.y)); ctx.rotate(an);
                ctx.fillStyle = '#4a4a52'; ctx.beginPath(); ctx.moveTo(5, 0); ctx.lineTo(-4, -3); ctx.lineTo(-4, 3); ctx.fill();
                ctx.fillStyle = '#f2efe6'; ctx.beginPath(); ctx.moveTo(4, 0); ctx.lineTo(-3, -2); ctx.lineTo(-2, 0); ctx.lineTo(-3, 2); ctx.fill(); ctx.restore(); } }); }
        }
      } else if (f.state === 'throw' && f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.6; }
      else if (f.state === 'climb') {                                                    // up, up...
        freeMove(f, 0, -90 * dt); f.ang = -Math.PI / 2;
        if (f.t >= 0.6) { setFoeState(f, 'nose'); f.tx = P.x; f.ty = P.y; sfx.whoosh(); }
      } else if (f.state === 'nose') {                                                   // ...and a nose dive right where he was
        const ddx = f.tx - f.x, ddy = f.ty + 4 - f.y, d = Math.hypot(ddx, ddy) || 1;
        f.ang = Math.atan2(ddy, ddx);
        const moved = freeMove(f, ddx / d * 260 * dt, ddy / d * 260 * dt);
        strike(f, { l: f.x - 8, r: f.x + 8, t: f.y - 14, b: f.y + 4 }, 18);
        if (!moved || d < 4 || f.t >= 1.6) { setFoeState(f, 'stuck'); puff(f.x, f.y, 5, 30); if (heard(f)) sfx.thud(); }
      } else if (f.state === 'stuck') {                                                  // its nose stuck in the ground: shaking itself loose
        if (f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.4; f.ang = 0; freeMove(f, 0, -8); }
      }
    },
    draw(f) {
      const turned = ['loop', 'swoop', 'climb', 'nose', 'stuck'].includes(f.state);
      if (!turned) { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 15, 1); drawFoe2(f, FOE.plane.frame(f), f.x, f.y); if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 7) - 1, Math.round(f.y - 20 + Math.sin(a) * 2), 2, 2); } return; }
      const sh = f.state === 'stuck' ? Math.sin(f.t * 40) * 0.08 : 0;
      ctx.save(); ctx.translate(Math.round(f.x), Math.round(f.y - 8)); ctx.rotate((f.state === 'stuck' ? Math.PI / 2 : f.ang || 0) + sh);   // turned to where it's headed (the picture's nose is at the left: flipped, it's at the right)
      spr(f.state === 'swoop' || f.state === 'nose' || f.state === 'stuck' ? 'plane_dive' : 'plane_fly_1', 0, 8, true);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr('plane_fly_1', 0, 8, true, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      ctx.restore();
    },
    frame: f => 'plane_' + ({ walk: f.dive ? 'dive' : 'fly_' + (Math.floor(f.t * 3) % 2 + 1), foldwind: 'fly_2', throw: 'dive', down: 'down', stagger: 'dizzy', hurt: 'fly_2' }[f.state] || 'fly_1') },

  // an old tennis ball full of Grime: bounces about the room in big arcs, harder when he's near. Newer (10/16/2026): a
  // huge bounce that comes down on him with a shock along the ground both ways (jump it), spits Grime out of its split
  // seam, and spins in place and rolls at him along the ground
  ball: { hp: 5, hw: 10, h: 20, acorns: [1, 2],
    setup(f) { f.vy = -200; f.air = true; f.hopVX = f.f * 60; },
    harmless: f => f.state === 'quake' && f.t > 0.2,
    update(f, dt) {
      baseState(f, dt);
      if (f.state === 'down') return;
      if (f.state === 'stagger') { f.air = false; return; }
      const dx = P.x - f.x, adx = Math.abs(dx);
      if (f.air) {
        if (hopFoe(f, dt, 800)) {
          if (f.state === 'slam' && f.y < f.slamY - 8 && tile(Math.floor(f.x / T), Math.round(f.y / T)) === 2) { f.air = true; f.y += 2; f.vy = Math.max(f.vy, 60); return; }   // a thin ledge up above where it started: on through it (it was landing up there every time, 10/16/2026)
          if (f.state === 'slam') { setFoeState(f, 'quake'); ringOut(f.x, f.y - 2, 55, '#b8d83a'); shakeT = 0.12; shakeA = 1.6; sfx.thud(); puff(f.x, f.y, 8, 50); return; }
          setFoeState(f, 'squash'); sfx.boing ? sfx.boing() : sfx.bump(); puff(f.x, f.y, 4, 30);
        }
        else { if (f.x <= f.range[0] + 1 || f.x >= f.range[1] - 1) f.hopVX = -f.hopVX; strike(f, foeBox(f), f.state === 'slam' ? 20 : 16); if (f.t > 0.3 && f.state !== 'slam') f.hitP = false; }
      } else if (f.state === 'squash') {
        if (f.t >= 0.14) {
          const chase = near(f, 240, 80), sees = near(f, 260, 170);                         // it goes for him from up on its ledge too, down onto the floor after him
          const m = sees ? choose([[chase ? 2 : 1, 'bounce'], [hasMove(f, 2) && adx < 220 ? 1 : 0, 'slam'], [hasMove(f, 3) && adx > 40 ? 1 : 0, 'spit'], [hasMove(f, 4) && adx > 50 && Math.abs(P.y - f.y) < 24 ? 1 : 0, 'spin']]) : 'bounce';
          if (m === 'bounce' && !chase) { f.hopVX = (Math.random() < 0.5 ? -1 : 1) * 60; f.f = Math.sign(f.hopVX); f.vy = -230; f.air = true; setFoeState(f, 'walk'); return; }
          if (m === 'spit' || m === 'spin') { f.f = Math.sign(dx) || f.f; setFoeState(f, m); f.rolls = 0; return; }
          if (m === 'slam') {                                                            // way up, and down right on him
            f.range = [2 * T, room.pxW - 2 * T]; f.slamY = f.y; f.vy = -480; f.hopVX = Math.max(-200, Math.min(200, dx / (2 * 480 / 800))); f.f = Math.sign(dx) || f.f; f.air = true; setFoeState(f, 'slam'); sfx.boing ? sfx.boing() : sfx.bump(); return;
          }
          f.hopVX = (chase ? Math.sign(dx) || f.f : (Math.random() < 0.5 ? -1 : 1)) * (chase ? 110 : 60); f.f = Math.sign(f.hopVX) || f.f;
          f.vy = chase ? -320 : -230; f.air = true; setFoeState(f, 'walk');
        }
      } else if (f.state === 'quake') {                                                  // the shock along the ground, both ways
        if (f.t < 0.18) strike(f, { l: f.x - 56, r: f.x + 56, t: f.y - 10, b: f.y + 2, area: true }, 16);   // (area: the shock along the ground)
        if (f.t >= 0.45) { f.range = patrol(f.x, f.y); setFoeState(f, 'squash'); f.t = 0.14 - 0.5; }
      } else if (f.state === 'spit') {                                                   // its seam opens and spits a glob of Grime at him
        if (f.t >= 0.45 && !f.spat) {
          f.spat = true; sfx.splat ? sfx.splat() : sfx.whoosh();
          const sx = f.x + f.f * 8, sy = f.y - 12, time = Math.max(0.45, Math.min(0.9, adx / 230));
          shots.push({ kind: 'blob', x: sx, y: sy, vx: (P.x - sx) / time, vy: (P.y - 16 - sy) / time - 0.5 * 600 * time, g: 600, from: f, reflected: false, t: 0 });
        }
        if (f.t >= 0.8) { f.spat = false; setFoeState(f, 'squash'); }
      } else if (f.state === 'spin') {                                                   // spinning on the spot...
        if (f.t >= 0.5) { setFoeState(f, 'roll'); sfx.whoosh(); }
      } else if (f.state === 'roll') {                                                   // ...then off along the ground at him, back once off a wall
        const res = groundStep(f, f.f, 230, dt);
        strike(f, foeBox(f), 18);
        if (res !== 'ok') { if (f.rolls < 1) { f.rolls++; f.f = -f.f; f.hitP = false; puff(f.x + f.f * -10, f.y - 8, 4, 30); if (heard(f)) sfx.bump(); } else { setFoeState(f, 'squash'); f.range = patrol(f.x, f.y); } }
        else if (f.t >= 1.6) { setFoeState(f, 'squash'); f.range = patrol(f.x, f.y); }
      }
    },
    draw(f) {
      const fr = FOE.ball.frame(f), sh = f.state === 'spin' || (f.state === 'spit' && f.t < 0.45) ? Math.round(Math.sin(f.t * 60)) : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 11, 1);
      drawFoe2(f, fr, f.x + sh, f.y);
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 7) - 1, Math.round(f.y - 26 + Math.sin(a) * 2), 2, 2); }
    },
    frame: f => 'ball_' + (f.state === 'down' ? 'down' : f.state === 'stagger' ? 'dizzy' : f.state === 'squash' || f.state === 'quake' ? 'squash' : f.state === 'spit' ? (f.t < 0.6 ? 'spit' : 'roll_1') : f.state === 'spin' ? 'spin' : f.state === 'roll' ? (Math.floor(f.t * 16) % 2 ? 'spin' : 'roll_' + (Math.floor(f.t * 16) % 4 < 2 ? 1 : 2)) : f.vy < -60 ? 'launch' : 'roll_' + (Math.floor(f.t * 6) % 2 + 1)) },

  // a shuttlecock hanging in the leaves. Walk under it and it drops, nose first. Then it flutters back up to where it
  // was. Newer (10/16/2026): shakes loose a few feathers that drift down after him, spirals down at him from off to the
  // side, and a drop that bounces back up off the ground and comes down on him again
  shuttle: { hp: 2, hw: 8, h: 26, acorns: [1, 2], free: true,
    setup(f) { f.hx = f.x; f.hy = f.y; },
    box: f => ({ l: f.x - 8, r: f.x + 8, t: f.y - 30, b: f.y - 4 }),
    update(f, dt) {
      if (f.state === 'down') { fallDown(f, dt); return; }
      baseState(f, dt);
      const dx = P.x - f.x, adx = Math.abs(dx), below = phillAround() && !(P.story && !P.story.free) && P.y > f.y && P.y - f.y < 460;   // (it was 300: the ones in the crown hang higher than that over the floor, and never dropped, 10/16/2026)
      if (f.state === 'walk') {                                                          // hanging there, swaying
        if (f.y > f.hy + 4) { setFoeState(f, 'rise'); return; }                          // knocked out of a drop (or off the ground) by a hit: back up home first
        f.x = f.hx + Math.sin(f.t * 1.5) * 3;
        if (f.cd <= 0 && below) {
          const under = adx < 20;
          const m = choose([[under ? 2 : 0, 'drop'], [hasMove(f, 4) && adx < 26 ? 1.2 : 0, 'drop2'], [hasMove(f, 2) && adx < 100 && !under ? 0.6 : 0, 'shake'], [hasMove(f, 3) && adx > 40 && adx < 180 ? 0.5 : 0, 'spinwind']]);
          if (m === 'drop' || m === 'drop2') { setFoeState(f, 'dropwind'); f.rebound = m === 'drop2'; sfx.rustle(1.4); }   // (it used to drop the moment he was under it: a beat first now, 10/17/2026)
          else if (m) { setFoeState(f, m); f.f = Math.sign(dx) || f.f; }
          else f.cd = 0.3;
        }
      } else if (f.state === 'dropwind') {                                             // working loose: it shivers on its string and the leaves rustle
        f.x = f.hx + Math.sin(f.t * 55) * 1.5;
        if (f.t >= 0.4) { setFoeState(f, 'drop'); f.vy = 40; sfx.whoosh(); }
      } else if (f.state === 'drop') {
        f.vy = Math.min(f.vy + 900 * dt, 420);
        if (!freeMove(f, (f.hopVX || 0) * dt, f.vy * dt)) {
          puff(f.x, f.y, 5, 30); sfx.land();
          if (f.rebound) { f.rebound = false; setFoeState(f, 'bounce'); f.vy = -280; f.hopVX = Math.max(-120, Math.min(120, (P.x - f.x) / 0.62)); }   // back up off the ground...
          else { setFoeState(f, 'stuck'); f.hopVX = 0; }                                   // nose stuck in the ground a moment: the time to hit it
        }
        strike(f, FOE.shuttle.box(f), 18);
      } else if (f.state === 'bounce') {                                                 // ...and over to come down on him again
        f.vy += 900 * dt; freeMove(f, f.hopVX * dt, f.vy * dt);
        if (f.vy > 0) { setFoeState(f, 'drop'); }
      } else if (f.state === 'stuck') {
        if (f.t >= 1.0) setFoeState(f, 'rise');
      } else if (f.state === 'rise') {
        const x0 = f.x, y0 = f.y, up = 45 + Math.min(105, Math.max(0, f.y - f.hy) * 0.4);   // faster from a long way down (it can drop a lot farther now: 11 seconds back up in the west drop, 10/16/2026)
        freeMove(f, Math.sign(f.hx - f.x) * 20 * dt, -up * dt);
        if (Math.abs(f.x - x0) + Math.abs(f.y - y0) < 0.2 || f.t > 4) { f.y -= up * dt; f.x += Math.sign(f.hx - f.x) * Math.min(Math.abs(f.hx - f.x), 20 * dt); }   // caught under a branch: it flutters up through the leaves (the bough end's never got home, 10/16/2026)
        if (f.y <= f.hy + 2) { f.y = f.hy; f.x = f.hx; setFoeState(f, 'walk'); f.cd = 1.2; }
      } else if (f.state === 'shake') {                                                  // shaking a few feathers loose, that drift down after him
        f.x = f.hx + Math.sin(f.t * 50) * 1.5;
        if (f.t >= 0.5 && !f.shook) {
          f.shook = true; sfx.whoosh();
          for (let i = 0; i < 4; i++) { const ox = (i - 1.5) * 8;
            shots.push({ kind: 'plume', col: '#eeebe4', x: f.x + ox, y: f.y - 6, vx: ox * 2, vy: 30, g: 0, from: f, reflected: false, t: 0, life: 9, ph: i,
              upd: (sh, dt2) => { if (!sh.reflected) { sh.vx += (Math.sign(P.x - sh.x) * 40 - sh.vx) * dt2 * 1.2; sh.vy = 75 + Math.sin(sh.t * 5 + sh.ph) * 25; } },
              draw: sh => { const a2 = Math.sin(sh.t * 5 + sh.ph) * 0.6; ctx.save(); ctx.translate(Math.round(sh.x), Math.round(sh.y)); ctx.rotate(a2);
                ctx.fillStyle = '#9a968e'; ctx.fillRect(-1, -4, 3, 8); ctx.fillStyle = '#f6f4ee'; ctx.fillRect(0, -4, 2, 7); ctx.fillStyle = '#c49c64'; ctx.fillRect(0, 3, 1, 2); ctx.restore(); } }); }
        }
        if (f.t >= 0.9) { f.shook = false; f.x = f.hx; setFoeState(f, 'walk'); f.cd = 2 + Math.random(); }
      } else if (f.state === 'spinwind') {                                               // twisting round on its string...
        f.x = f.hx + Math.sin(f.t * 30) * 2;
        if (f.t >= 0.45) { setFoeState(f, 'spiral'); const ddx = P.x - f.x, ddy = P.y - f.y, d = Math.hypot(ddx, ddy) || 1; f.svx = ddx / d * 260; f.svy = ddy / d * 260; sfx.whoosh(); }
      } else if (f.state === 'spiral') {                                                 // ...and down at him on a slant, spinning
        const moved = freeMove(f, f.svx * dt, f.svy * dt);
        strike(f, FOE.shuttle.box(f), 18);
        if (!moved || f.t >= 2.6) { setFoeState(f, 'rise'); puff(f.x, f.y, 5, 30); sfx.land(); }
      } else if (f.state === 'stagger') freeMove(f, 0, 30 * dt);
    },
    draw(f) {
      if (f.state === 'spiral') {                                                        // nose first along its line, its skirt spinning
        ctx.save(); ctx.translate(Math.round(f.x), Math.round(f.y - 18)); ctx.rotate(Math.atan2(f.svy, f.svx) - Math.PI / 2);
        ctx.scale(Math.cos(f.t * 30) > 0 ? 1 : -1, 1); spr('shuttle_drop', 0, 18, false);
        if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr('shuttle_drop', 0, 18, false, 0.6); ctx.globalCompositeOperation = 'source-over'; }
        ctx.restore(); return;
      }
      if (f.state === 'walk' || f.state === 'shake' || f.state === 'spinwind' || f.state === 'dropwind') { ctx.strokeStyle = 'rgba(236,232,220,0.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(f.hx, f.y - 40); ctx.lineTo(f.x, f.y - 30); ctx.stroke(); }
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 9, 1); drawFoe2(f, FOE.shuttle.frame(f), f.x, f.y);
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 7) - 1, Math.round(f.y - 36 + Math.sin(a) * 2), 2, 2); }
    },
    frame: f => 'shuttle_' + ({ walk: 'hang', dropwind: 'shake', stuck: 'drop', drop: 'drop', bounce: 'rise', rise: 'rise', shake: 'shake', spinwind: 'hang', down: 'down', stagger: 'dizzy', hurt: 'drop' }[f.state] || 'hang') },
});

// ---------- the cape, on him ----------
// A red and white check handkerchief tied round his neck. Hangs down his back; streams out behind him when he runs
// and spreads wide when he glides
// ---------- the sneaker: the velcro grip ----------
SCENES.sneaker = it => [
  bars(true), wait(0.3),
  run(() => { popup(P.x, P.y - 54, "a kid's sneaker. the straps are velcro", '#f0d070', true); sfx.pickup(); }), wait(1.0),
  pose('look_down', 0.5), run(() => { sfx.paper(); puff(P.x, P.y - 20, 8, 40, '#8a94a0', 40); }), pose('rub_1', 0.3), pose('rub_2', 0.3), pose('rub_1', 0.3), pose(null),
  run(() => { world.learned.velcro = true; saveWorld(); popup(P.x, P.y - 54, 'the velcro grip. his hands catch on rough bark now', '#96d2ff', true); sfx.idea(); twinkle(P.x, P.y - 40, 10); }),
  wait(1.0), bars(false),
  run(() => room.hints.push({ text: 'hold toward bark in the air to hang on. {jump} to jump off it', l: 0, t: 0, r: room.pxW, b: room.pxH, x: P.x, y: P.y - 70, a: 0, until: 'clungOnce' })),
];

// ---------- the pill bug: rolls up tight and springs open. That's the big swing out of a roll ----------
SCENES.pillbug = def => {
  const pb = def.pillbug, a = () => actors.pillbug;
  return [
    bars(true), run(() => { P.vx = 0; }), faceTo(pb.x), camTo(pb.x, pb.y - 20, 0.7),
    run(() => { const b = a(); b.anim = ['pillbug_crawl_1', 'pillbug_crawl_2']; b.fps = 6; }), moveActor('pillbug', pb.x - 30, pb.y, 0.9, { linear: true }), wait(0.3),
    run(() => { const b = a(); b.anim = null; b.frame = 'pillbug_ball'; sfx.tok(); }), wait(0.7),
    run(() => { const b = a(); b.frame = 'pillbug_spring'; sfx.boing ? sfx.boing() : sfx.jump(); puff(b.x, b.y, 6, 40); }),
    moveActor('pillbug', pb.x + 30, pb.y - 4, 0.25, { linear: true }), wait(0.5),
    run(() => { const b = a(); b.frame = 'pillbug_ball'; sfx.tok(); }), wait(0.6),
    run(() => { const b = a(); b.frame = 'pillbug_spring'; sfx.boing ? sfx.boing() : sfx.jump(); puff(b.x, b.y, 6, 40); }), moveActor('pillbug', pb.x - 20, pb.y - 4, 0.25, { linear: true }),
    pose('look_down', 0.4), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); twinkle(P.x, P.y - 46, 8); }), wait(0.7),
    run(() => { world.learned.rollslash = true; saveWorld(); popup(P.x, P.y - 54, 'learned the big swing out of a roll', '#ffd36b', true); }),
    run(() => { const b = a(); b.anim = ['pillbug_crawl_1', 'pillbug_crawl_2']; }), moveActor('pillbug', pb.x + 60, pb.y, 1.5, { linear: true }),
    pose(null), camBack(), wait(0.4), bars(false),
    run(() => room.hints.push({ text: '{dodge} to roll, then {atk} out of it: the big swing', l: 0, t: 0, r: room.pxW, b: room.pxH, x: pb.x, y: pb.y - 60, a: 0, until: 'bigSwingOnce' })),
  ];
};

// ---------- a memory: the storybook page ----------
SCENES.memoryPage = it => [
  bars(true), wait(0.4),
  run(() => { sceneFade.warm = true; sfx.memory(); }),
  showText(['a page torn out of his bedtime book. the one with the hill and the sun.', 'his kid read it to him every night. did all the voices.', 'he knew it by heart, but he never let on.']),
  run(() => {
    world.maxHealth += 1; P.maxHealth = world.maxHealth - (P.worn || 0); P.health = Math.min(P.maxHealth, P.health + 1); saveWorld();
    sceneFade.warm = false; puff(P.x, P.y - 22, 14, 60, '#ffffff', 60); sfx.stitch();
    popup(P.x, P.y - 54, 'one more cotton puff', '#fbf7ec', true);
  }),
  wait(1.0), bars(false),
];

// ---------- the cape, and the crow ----------
// The handkerchief's in the nest's lining. He ties it on. And the crow comes back while he's doing it
SCENES.cape = it => {
  const BR = it.y;
  return [
    bars(true), wait(0.3),
    run(() => { popup(P.x, P.y - 54, 'a handkerchief, from the lining', '#f0d070', true); sfx.pickup(); }), wait(0.9),
    pose('rub_1', 0.35), pose('rub_2', 0.35), pose('rub_1', 0.3), pose(null),
    run(() => { world.has.cape = true; saveWorld(); popup(P.x, P.y - 54, 'the cape. hold {jump} in the air to glide', '#96d2ff', true); sfx.idea(); twinkle(P.x, P.y - 40, 12); }),
    wait(1.2),
    ...crowBack(BR),
  ];
};
// and the crow, back from wherever it's been. Its own part, so if a reload cuts it off after the cape's tied on, it
// can still happen: the next time he's standing in the nest it flies in and says it all (the save audit, 10/17/2026)
function crowBack(BR) {
  const crow = () => actors.crow;
  const shakeHead = [face(-1), wait(0.18), face(1), wait(0.18), face(-1), wait(0.18), face(1), wait(0.2)];
  return [
    run(() => { sfx.caw(); if (!crow()) addActor('crow', { x: P.x + 400, y: BR - 300, frame: 'fly_1', layer: 'front' }); else Object.assign(crow(), { x: P.x + 400, y: BR - 300, anim: null, frame: 'fly_1' }); crow().anim = ['fly_1', 'fly_2', 'fly_3', 'fly_4']; crow().fps = 8; crow().flip = true; }),
    face(1), run(() => { popup(P.x + 4, P.y - 44, '!', '#ffd36b', true); sfx.squeak(); }),
    moveActor('crow', P.x + 70, BR, 1.3, { arc: -40 }), run(() => { const c = crow(); c.anim = null; c.frame = 'perch_1'; c.flip = true; sfx.flap(); puff(c.x, c.y, 8, 50); }),
    pose('hurt', 0.4), pose(null), wait(0.4),
    say('crow', 'You.', 'The soft one. You ran off.', "Thought you were fluff. For the nest. Didn't know you were anybody."),
    ...nod(), wait(0.2),
    say('crow', 'You fell a long way. I heard you land.', "Sorry. I don't say that much. I am, though."),
    wait(0.3),
    say('crow', "You'll want to go home. I can take you. Not far, for me."),
    wait(0.4), ...shakeHead, pose('look_down', 0.8), pose(null),
    say('crow', 'No?', "You've been down there, then. Seen the muck. Seen what it wakes up.", "And you're going to do something about it. Thing your size."),
    ...nod(),
    run(() => { crow().frame = 'perch_2'; }), wait(0.3), run(() => { crow().frame = 'perch_1'; }),
    say('crow', "*kraa* Alright. Then I'll take you anywhere else. Anywhere in the park, any time. Least I can do.", "Come find me. I'll be about."),
    run(() => { world.flags.crowFriend = true; world.perches = world.perches || {}; world.perches[room.id] = true; saveWorld(); popup(P.x, P.y - 54, 'the crow will fly him anywhere it has perched', '#ffd36b', true); sfx.idea(); }),
    run(() => { const c = crow(); c.anim = ['perch_1', 'perch_2', 'perch_1', 'perch_1', 'perch_2']; c.fps = 1.3; c.perch = true; }),
    wait(0.8), bars(false),
  ];
}
SCENES.crowBack = () => [bars(true), wait(0.4), ...crowBack(P.y)];

// ---------- the crow, perched: fast travel ----------
const PERCH_NAMES = { nest: 'the nest, up the oak', clearing: 'the clearing, in rootwood', dock: 'the dock, at the pond', picnic: 'the picnic tables, at the playground' };
const CROW_CHAT = [['Still in one piece. Good.'], ['Quiet up here. I like quiet.'], ["Been watching the muck. *kraa* It's spreading."], ["Say where. I'll take you."]];
function perchHere() { return world.flags.crowFriend && room.def.perch && !bossLocked(); }
function setupOakRoom() {
  const d = room.def;
  if (d.pillbug) addActor('pillbug', { kind: 'rw', x: d.pillbug.x, y: d.pillbug.y, anim: ['pillbug_crawl_1', 'pillbug_crawl_2'], fps: 6, layer: 'front' });
  if (perchHere()) {
    world.perches = world.perches || {};
    if (!world.perches[room.id]) { world.perches[room.id] = true; saveWorld(); }
    if (!actors.crow) addActor('crow', { x: d.perch.x, y: d.perch.y, anim: ['perch_1', 'perch_2', 'perch_1', 'perch_1', 'perch_2'], fps: 1.3, layer: 'back', flip: false, perch: true });
    else actors.crow.perch = true;
    if (world.flyingIn) { const to = world.flyingIn; world.flyingIn = null; saveWorld(); playScene(SCENES.crowLand(to)); }
  }
}
const _nearbyOak = nearby;
nearby = () => {
  const n = _nearbyOak();
  if (n) return n;
  if (perchHere() && actors.crow && actors.crow.perch && Math.abs(P.x - actors.crow.x) < 44 && Math.abs(P.y - actors.crow.y) < 48) return { kind: 'perch' };
  return null;
};
const _interactOak = interact;
interact = () => {
  const n = nearby();
  if (n && n.kind === 'perch' && !scene) { P.vx = 0; playScene(SCENES.crow()); return true; }
  return _interactOak();
};
SCENES.crow = () => {
  const c = actors.crow;
  const steps = [walkTo(c.x - 3 * T), faceTo(c.x), run(() => { c.anim = null; c.frame = 'perch_1'; c.flip = P.x < c.x; })];
  const known = Object.keys(world.perches || {}).filter(id => id !== room.id && PERCH_NAMES[id]);
  if (!known.length) return [...steps, say('crow', "Nowhere else I've perched yet. Go on, I'll be about."), run(() => { c.anim = ['perch_1', 'perch_2', 'perch_1', 'perch_1', 'perch_2']; })];
  steps.push(say('crow', ...CROW_CHAT[Math.floor(Math.random() * CROW_CHAT.length)]));
  let picked = -1;
  steps.push(ask('crow', 'Where to?', [...known.map(id => PERCH_NAMES[id]), 'nowhere. just saying hi'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const to = known[picked];
    if (!to) { scene.steps.splice(scene.i + 1, 0, say('crow', 'Suit yourself.'), run(() => { c.anim = ['perch_1', 'perch_2', 'perch_1', 'perch_1', 'perch_2']; })); return true; }
    scene.steps.splice(scene.i + 1, 0, ...SCENES.crowFly(to));
    return true;
  });
  return steps;
};
// it picks him up and goes. The rest happens when the next room's loaded
SCENES.crowFly = to => {
  const c = () => actors.crow;
  return [
    say('crow', 'Hold on.'),
    run(() => { const a = c(); a.frame = 'perch_2'; }), moveActor('crow', P.x, P.y - 54, 0.4, { arc: -20 }),
    run(() => { P.held = 'crow'; Object.assign(c(), { anim: ['carry_1', 'carry_2', 'carry_3', 'carry_4'], fps: 10, layer: 'front' }); sfx.flap(); puff(P.x, P.y - 10, 10, 60, '#ffffff', 50); }),
    camFollow('crow'),
    together(moveActor('crow', c().x + 200, c().y - 500, 1.6, { arc: -10 }), t => { if (Math.floor(t / 0.36) !== Math.floor((t - 1 / 120) / 0.36)) sfx.flap(); return t > 1.6; }),
    fadeTo(1, 0.5),
    run(() => { world.flyingIn = to; saveWorld(); goTo(to, '@perch'); }),
    until(() => false),
  ];
};
// coming in to land: down out of the sky with him, drops him by the perch, hops onto it
SCENES.crowLand = to => {
  const d = room.def, c = () => actors.crow;
  return [
    run(() => { sceneFade.a = 1; P.held = 'crow'; P.hidden = false; Object.assign(c(), { x: d.perch.x - 60, y: d.perch.y - 500, anim: ['carry_1', 'carry_2', 'carry_3', 'carry_4'], fps: 10, layer: 'front', perch: false, flip: false }); }),
    bars(true), camFollow('crow'), fadeTo(0, 0.6),
    together(moveActor('crow', d.perch.x - 36, d.perch.y - 50, 1.6, { arc: 20 }), t => { if (Math.floor(t / 0.36) !== Math.floor((t - 1 / 120) / 0.36)) sfx.flap(); return t > 1.6; }),
    run(() => { P.held = null; P.x = d.perch.x - 36; P.y = d.perch.y - 44; P.vx = 0; P.vy = 60; P.ground = false; P.facing = 1; puff(P.x, P.y, 6, 40, '#ffffff', 40); }),
    run(() => { const a = c(); a.anim = ['fly_1', 'fly_2', 'fly_3', 'fly_4']; a.fps = 8; }), moveActor('crow', d.perch.x, d.perch.y, 0.6, { arc: -16 }),
    run(() => { const a = c(); a.anim = ['perch_1', 'perch_2', 'perch_1', 'perch_1', 'perch_2']; a.fps = 1.3; a.layer = 'back'; a.perch = true; a.flip = true; sfx.flap(); }),
    until(() => P.ground), say('crow', 'There.'), camBack(), bars(false),
  ];
};

// ---------- the owl: sells what it knows for feathers ----------
const OWL_SHOP = [
  { id: 'toldCrayonOak', what: 'where the brown crayon went', cost: 8, done: () => world.has.crayon_oak, mark: { room: 'shaft', x: 4.5 * 16, y: 12 * 16 },
    line: "Up the inside of the trunk, past the yo-yo. There is a bracket of fungus high on the left wall, the topmost one. The bark runs all the way up. If your hands stick to bark, it is yours." },
  { id: 'toldRot', what: 'a soft patch in the heartwood', cost: 14, done: () => world.flags.rotwood, mark: { room: 'heartwood', x: 3 * 16, y: 36 * 16 },
    line: "The bottom of the trunk. Low on the left, the wood has gone soft. Something is behind it. Feathers, if I know that bird." },
  { pin: 'bark_chip', line: "A chip of my own tree. Wear it and you will slide down bark more slowly. The bark remembers you." },
];
const OWL_COTTON = [19, 27, 35];
const OWL_CHAT = [
  ['The black one brought you here. It brings all sorts home. Shiny things. Soft things.'],
  ['I do not sleep in the day. I watch. Nothing happens in this tree without my knowing.'],
  ['The muck is in the roots now. At night I can hear it. *hoo* Like something chewing.'],
  ['There is a yo-yo up the trunk that no one is holding. Mind it.'],
];
function owlList() {
  const out = [];
  for (const s of OWL_SHOP) {
    if (s.pin) { if (!(world.pins || {})[s.pin]) out.push({ ...s, what: PINS[s.pin].name, cost: PINS[s.pin].cost }); }
    else if (!world.flags[s.id] && !(s.done && s.done())) out.push(s);   // not once he's found it himself
  }
  const c = world.owlCotton || 0;
  if (world.flags.yoyoDown && c < OWL_COTTON.length) out.push({ cotton: true, what: 'a bit of nest lining', cost: OWL_COTTON[c], line: c ? 'More lining. The bird can spare it.' : 'Nest lining. You have a hole in you, you know.' });
  return out;
}
SCENES.owl = npc => {
  const steps = [walkTo(npc.x - 3 * T), faceTo(npc.x)];
  if (!world.flags.metOwl) {
    world.flags.metOwl = true; saveWorld();
    steps.push(run(() => { npcPose = { frame: 'owl_hoot', t: 0.6 }; sfx.hoot(); }), wait(0.7),
      say('owl', '*hoo* A toy. Walking about. By itself.', 'I have sat in this tree since before the park was a park. I have seen everything in it, twice.',
        'What I have seen, I sell. For feathers. The black ones. The crow drops them everywhere and I prefer a tidy tree.'));
  } else steps.push(say('owl', ...OWL_CHAT[Math.floor(Math.random() * OWL_CHAT.length)]));
  const left = owlList();
  if (!left.length) return [...steps, say('owl', 'That is everything I know, which is everything. Do come and sit with me sometime.')];
  let picked = -1;
  steps.push(ask('owl', `Well? You have ${world.feathers || 0} feathers.`, [...left.map(s => `${s.what} (${s.cost} feathers)`), 'nothing, bye'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const s = left[picked];
    if (!s) return true;
    if ((world.feathers || 0) < s.cost) { scene.steps.splice(scene.i + 1, 0, say('owl', 'That is not enough feathers. *hoo* I can count.')); return true; }
    world.feathers -= s.cost; sfx.paper();
    const after = [];
    if (s.pin) { world.pins = world.pins || {}; world.pins[s.pin] = true; after.push(run(() => { popup(P.x, P.y - 54, 'got the ' + PINS[s.pin].name, '#e8e6f0'); sfx.pickup(); })); }
    else if (s.cotton) { world.owlCotton = (world.owlCotton || 0) + 1; after.push(run(() => addCotton())); }
    else { world.flags[s.id] = true; world.marks.push(s.mark); after.push(run(() => popup(P.x, P.y - 54, 'marked on his map', '#e8e6f0'))); }
    saveWorld();
    scene.steps.splice(scene.i + 1, 0, say('owl', s.line), run(() => { npcPose = { frame: 'owl_hoot', t: 0.5 }; sfx.hoot(); }), ...after, ...nod());
    return true;
  });
  return steps;
};

// the cape's on but the crow never got to say its piece (a reload in the middle of it): it comes back once he's
// standing in the nest with nothing else going on. Only when he came into the nest that way (picking the cape up has its
// own scene that's about to start, so it mustn't jump in ahead of it)
let crowBackDue = false;
const _updCrowBack = update;
update = function (dt) {
  _updCrowBack(dt);
  if (!crowBackDue || !room || room.id !== 'nest' || !world.has.cape || world.flags.crowFriend) return;
  if (scene || cutscene || mapView || (typeof pinBoard !== 'undefined' && pinBoard) || P.story || P.ko > 0 || !P.ground || trans.state !== 'none' || P.pinned || P.swim) return;
  crowBackDue = false; playScene(SCENES.crowBack());
};

// ---------- hooking into the room ----------
const _setupPondRoomOak = setupPondRoom;
setupPondRoom = () => { _setupPondRoomOak(); setupOakRoom(); crowBackDue = room.id === 'nest' && !!world.has.cape && !world.flags.crowFriend; };
// the first time he hangs on bark, or does the big swing, the hints about them can go
const _checkEventsOak = checkEvents;
checkEvents = dt => {
  _checkEventsOak(dt);
  if (P.cling && !world.flags.clungOnce) { world.flags.clungOnce = true; saveWorld(); }
  if (P.atk && P.atk.type === 'rollslash' && !world.flags.bigSwingOnce) { world.flags.bigSwingOnce = true; saveWorld(); }
};
