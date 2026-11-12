'use strict';
// ---------- the thread behind his sword (a feel try-out: tune.feelTrail) ----------
// While a swing is out, the end of the blade leaves a crescent of thread behind it along the way it went. The newest
// part is solid and the older part frays into a few loose fibers, and it's gone a little over a tenth of a second
// after. It starts as the swing's hits do, so it follows the blade instead of leading it, and it's drawn out to where
// the swing really reaches (the same lines the hits use), so it shows him how far he can hit from.
// From Hollow Knight's slash: a crescent, solid at the front edge and breaking up behind, up 0.05s full and 0.05s as
// wisps. Pixel by pixel so it stays as crisp as the rest of the art
const TRAIL = (() => {
  const LIFE = 0.13, SOLID = 0.05;                 // how long a bit of it lasts, and how long it's solid before it frays
  const THICK = [0.06, 0.2];                       // how thick the band is, of the blade out to its reach: at its tail, and at its newest
  const THREAD = '#f4ead2', FIBER = '#e2d4b4';
  const FIBERS = [0.25, 0.6, 0.95];                // where the loose fibers run, across the band
  let pts = [], clock = 0, lastAtk = null;
  function step(dt) {
    clock += dt;
    pts = pts.filter(p => clock - p.t < LIFE);
    const a = P.atk;
    if (!tune.feelTrail || !a || P.swim || P.crawl) { lastAtk = a; return; }
    const A = ATK[a.type]; if (!A) return;
    if (a !== lastAtk) { lastAtk = a; pts.push({ brk: true, t: clock }); }   // (a new swing doesn't join on to the last one)
    if (a.t < A.on - 0.01 || a.t > A.off + 0.03) return;
    const ls = swordLines(); if (!ls || !ls.length) return;
    // the blade's lines this frame, in order round the swing, each its base and the end of its reach
    const cx = P.x, cy = P.y - 22;
    const ang = l => Math.atan2(l[3] - cy, (l[2] - cx) * P.facing);
    for (const l of ls.slice().sort((p, q) => ang(p) - ang(q)) ) {
      const [x0, y0, x1, y1] = l;
      if ((x1 - P.x) * P.facing < 4 && a.type !== 'up' && a.type !== 'down') continue;   // (only out in front of him: a swing that starts low behind him smeared it along the floor at his heels)
      pts.push({ x0, y0, ox: x1, oy: y1, t: clock });
    }
  }
  function plot(x, y, c, al) { ctx.globalAlpha = al; ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), 1, 1); }
  function draw() {
    if (!tune.feelTrail || pts.length < 2) return;
    const sa = ctx.globalAlpha;
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1], q = pts[i];
      if (p.brk || q.brk) continue;
      const age = clock - q.t, k = Math.max(0, 1 - age / LIFE);
      const n = Math.max(1, Math.ceil(Math.hypot(q.ox - p.ox, q.oy - p.oy)));
      for (let s = 0; s <= n; s++) {
        const u = s / n, ox = p.ox + (q.ox - p.ox) * u, oy = p.oy + (q.oy - p.oy) * u, bx = p.x0 + (q.x0 - p.x0) * u, by = p.y0 + (q.y0 - p.y0) * u;
        const along = (i - 1 + u) / (pts.length - 1), th = THICK[0] + (THICK[1] - THICK[0]) * Math.min(1, along * 1.4) * k;   // a crescent: thin at its tail, thickest where the blade is now
        const ix = ox + (bx - ox) * th, iy = oy + (by - oy) * th;
        if (age < SOLID) {                                                // solid: the whole band, thickest at the outside
          const m = Math.max(1, Math.ceil(Math.hypot(ox - ix, oy - iy)));
          for (let r = 0; r <= m; r++) { const w = r / m; plot(ix + (ox - ix) * w, iy + (oy - iy) * w, THREAD, (0.25 + 0.5 * w) * k); }
        } else {                                                          // fraying: a few loose fibers along the same curve, gaps between
          for (let f = 0; f < FIBERS.length; f++) {
            if ((s + f * 2) % 5 === 0) continue;
            const w = FIBERS[f]; plot(ix + (ox - ix) * w, iy + (oy - iy) * w, FIBER, 0.6 * k);
          }
        }
      }
    }
    ctx.globalAlpha = sa;
  }
  wrapPart('update', 'trail', (next, dt) => { const r = next(dt); step(dt); return r; });
  const _drawSweeps = drawSweeps;
  drawSweeps = function () { _drawSweeps.apply(this, arguments); draw(); };
  return { get pts() { return pts; }, LIFE };
})();
