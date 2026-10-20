'use strict';
// ---------- particles and little pop-up words ----------
// A fixed pool that gets reused: when it's full the oldest bit gets recycled, so nothing piles up.
const POOL = 600;
const parts = Array.from({ length: POOL }, () => ({ on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, c: '#fff', s: 1, g: 0, a: 1 }));
let partNext = 0;
function part(x, y, vx, vy, life, c, s = 1, g = 0, a = 1) {
  const p = parts[partNext]; partNext = (partNext + 1) % POOL;
  p.on = true; p.x = x; p.y = y; p.vx = vx; p.vy = vy; p.life = life; p.max = life; p.c = c; p.s = s; p.g = g; p.a = a;
  return p;
}
// the test room's way of adding one: parts.push({...}) becomes this
function addPart(o) { part(o.x, o.y, o.vx || 0, o.vy || 0, o.life, o.c, o.s || 1, o.g || 0, o.a || 1); }
function updateParts(dt) {
  for (const p of parts) {
    if (!p.on) continue;
    p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 1 - 2 * dt; p.life -= dt;
    if (p.life <= 0) p.on = false;
  }
}
function clearParts() { for (const p of parts) p.on = false; popups.length = 0; }
const liveParts = () => parts.reduce((n, p) => n + (p.on ? 1 : 0), 0);

const popups = [];
const popup = (x, y, text, col = '#ffffff', big = false) => { if (popups.length < 12) popups.push({ x, y, text, col, life: big ? 1.3 : 0.9, big }); };
function updatePopups(dt) {
  for (const p of popups) { p.life -= dt; p.y -= 22 * dt; }
  for (let i = popups.length - 1; i >= 0; i--) if (popups[i].life <= 0) popups.splice(i, 1);
}

function puff(x, y, n, spread, col = '#e9e4da', up = 30) {
  for (let i = 0; i < n; i++) part(x, y, (Math.random() * 2 - 1) * spread, -Math.random() * up, 0.35 + Math.random() * 0.2, col, Math.random() < 0.5 ? 2 : 1, 40);
}
function spark(x, y) {
  for (let i = 0; i < 7; i++) { const a = Math.random() * Math.PI * 2, v = 80 + Math.random() * 120; part(x, y, Math.cos(a) * v, Math.sin(a) * v, 0.16, '#fff6d8', 2, 0); }
}
// a hit landing (the combat review, 10/17/2026): one shape where the blade meets it, held through the hit's little
// pause and gone a moment after. clean: a bright burst and streaks along the swing, bits of whatever it's made of flying
// on the way it was hit. braced (it took it without stopping): smaller, a hard ring and a few bits. armor (it glanced
// off): a gray ring and sparks kicked back at him
const impacts = [];
function impact(x, y, dir, power = 1, kind = 'clean', bits) {
  impacts.push({ x, y, dir, p: power, kind, t: 0, life: kind === 'clean' ? 0.12 + 0.03 * power : 0.11 });
  const n = kind === 'clean' ? Math.round(5 + 3 * power) : kind === 'braced' ? 4 : 6, c = bits || ['#fff6d8', '#e8e0d0'];
  for (let i = 0; i < n; i++) {
    const a = (kind === 'armor' ? Math.PI : 0) + (Math.random() - 0.5) * (kind === 'armor' ? 1.4 : 1.1), v = (90 + Math.random() * 110) * (kind === 'clean' ? 0.8 + 0.25 * power : 0.8);
    part(x, y, Math.cos(a) * v * dir, Math.sin(a) * v - 30, 0.18 + Math.random() * 0.14, kind === 'armor' ? (i % 2 ? '#e8eef6' : '#9aa6b8') : c[i % c.length], i % 3 ? 1 : 2, 260);
  }
}
function updateImpacts(dt) {
  for (const m of impacts) m.t += dt; for (let i = impacts.length - 1; i >= 0; i--) if (impacts[i].t >= impacts[i].life) impacts.splice(i, 1);
  for (const w of sweeps) w.t += dt; while (sweeps.length && sweeps[0].t >= SWEEP_LIFE) sweeps.shift();
}
// a charged swing's reach (combat readability, 10/17/2026): it hits a long way past the sword as it's drawn, so it leaves
// a quick pale sweep through all of where it really reaches, from the drawn blade's tip out to the edge, gone a moment
// after. Only a picture: the hits still go by swordLines(). Drawn with the impacts, outside what an enemy's hits go by
const sweeps = [], SWEEP_LIFE = 0.14;
function sweepAdd(id, key, fan) { const l = sweeps[sweeps.length - 1]; if (l && l.id === id && l.key === key) return; sweeps.push({ id, key, fan, t: 0 }); if (sweeps.length > 40) sweeps.shift(); }
function drawSweeps() {
  for (const w of sweeps) {
    const k = 1 - w.t / SWEEP_LIFE, f = w.fan; if (k <= 0 || !f.length) continue;
    ctx.globalAlpha = 0.17 * k; ctx.fillStyle = '#fbeccb';                        // the band: faint cream, the color of his stitching
    ctx.beginPath(); ctx.moveTo(f[0][0], f[0][1]);
    for (const p of f) ctx.lineTo(p[0], p[1]);
    for (let i = f.length - 1; i >= 0; i--) ctx.lineTo(f[i][2], f[i][3]);
    ctx.closePath(); ctx.fill();
    ctx.lineCap = ctx.lineJoin = 'round';                                         // and its outer edge, where it stops reaching: a brush stroke, warm wood under cream
    for (const [al, c, lw] of [[0.5, '#c89a5a', 2.5], [0.95, '#fff2c8', 1.2]]) {
      ctx.globalAlpha = al * k; ctx.strokeStyle = c; ctx.lineWidth = lw;
      ctx.beginPath(); ctx.moveTo(f[0][2], f[0][3]); for (const p of f) ctx.lineTo(p[2], p[3]); ctx.stroke();
    }
    ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
  }
  ctx.globalAlpha = 1;
}
function drawImpacts() {
  for (const m of impacts) {
    const u = m.t / m.life, x = Math.round(m.x), y = Math.round(m.y), a = 1 - u;
    ctx.globalAlpha = Math.min(1, a * 1.4);
    if (m.kind === 'armor') {                                                    // a gray ring and a glint
      const r = Math.round(4 + 6 * u); ctx.strokeStyle = '#c8d0dc'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x + 0.5, y + 0.5, r, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#ffffff'; ctx.fillRect(x - 1, y - 3, 2, 6); ctx.fillRect(x - 3, y - 1, 6, 2);
    } else {
      const big = m.kind === 'clean' ? m.p : 0.6, r = Math.round((1.5 + 2.5 * big) * (1 - u));
      ctx.globalCompositeOperation = 'lighter';                                  // (a glow, not a gray dot)
      if (u < 0.5) { ctx.globalAlpha = 1 - u * 1.6; ctx.fillStyle = m.kind === 'braced' ? '#ffb070' : '#fff2c8'; ctx.beginPath(); ctx.arc(x + 0.5, y + 0.5, Math.max(1, r), 0, Math.PI * 2); ctx.fill(); }   // the burst at the point of contact
      ctx.globalAlpha = Math.min(1, a * 1.4);
      const L = (6 + 7 * big) * (0.6 + 0.6 * u);                                 // streaks out along the way it was hit
      ctx.fillStyle = m.kind === 'braced' ? '#ffb070' : '#fff6d8';
      for (const s of [-0.5, 0, 0.5]) { const ang = s, dx = Math.cos(ang) * m.dir, dy = Math.sin(ang); for (let k = r + 1; k < r + L; k += 1) ctx.fillRect(Math.round(x + dx * k), Math.round(y + dy * k), 1, 1); }
      if (m.kind === 'braced') { ctx.strokeStyle = '#ffb070'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x + 0.5, y + 0.5, Math.round(3 + 5 * u), 0, Math.PI * 2); ctx.stroke(); }
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.globalAlpha = 1;
  }
}
function twinkle(x, y, n = 6, col = '#fff6d8') {
  for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = 20 + Math.random() * 40; part(x, y, Math.cos(a) * v, Math.sin(a) * v - 20, 0.5 + Math.random() * 0.3, col, 1, -10); }
}
let hitstop = 0, shakeT = 0, shakeA = 0;
