'use strict';
// ---------- soft pieces: caps, shelf fungi, a fallen branch, hanging roots, anything that gives when he lands on it ----------
// A one way piece the room marks soft (its sag, in px) isn't solid ground. The room file says where it's anchored
// (read off what it touches when the room's built, Rooms/rootwood_planes.py soft_rules): held where it grows from (the
// trunk a bracket comes out of, the earth a root hangs from, the stem under a cap), resting where it lies on something
// (the branch's end on the stump's crown). Landing on it pushes it down by how hard he came down, it springs back past
// rest and settles, and while he stands on it he rides it.
// It bends from its anchors instead of sinking whole: a held end never moves and the farther a part is from it the more
// it gives (a shelf dips at its tip), a piece anchored at both ends bows between them, most under him, and standing
// near an anchor barely moves it. A resting end holds it up when it's pushed down and lifts off on the spring back.
// A stem under a cap is much stiffer: it takes a small share of the give (stem.give) and squashes, and the cap bends
// from its top. Every column of the piece moves with the line he stands on, and never past the room's clearance for
// that column (the ground under it, the roof over it), so what's drawn and what he stands on never part and nothing
// goes through the ground.
// Caps on a stem have three looks (SOFT.mode, or ?soft=sink, tip or blend on the page): 'sink', the cap's edge droops
// where he is and its middle rides the stem; 'tip', the cap tips toward the side he's on, turning about the stem's top,
// the far edge rising, and the stem shears with it, its top following the cap and its foot staying put; 'blend' (the
// one the game uses), the droop with a little of the tip (BLEND of it) when he lands off the middle.
// A mushroom's flesh (the room's "sponge", px): where he stands, his feet sink into the top. A dent follows him along the
// cap, deeper when he's just landed, with a small rise either side of it, and the cap's flesh squashes under him instead
// of moving whole. The dent is in the line he stands on too, so he really is lower, and the dent's walls are drawn in
// front of his feet (SOFT.drawFront, after him), so they sit in the cap like feet in a cushion.
const SOFT = (() => {
  const HZ = 3.4, DAMP = 0.26;                                                // how fast it springs, and how quickly it settles (0.28: two or three visible bounces)
  const STAND = 0.5, LAND = 0.14, LIFT = 3.5;                                 // the share of the sag his weight alone takes; how much of his landing speed goes into the push (px per px/s); how much of its rise goes into his jump
  const STEM = 0.25, BLEND = 0.33;                                            // a stem's share of the give unless the room says; how much of the tip the blend has
  const DENT_R = 13, DENT_HZ = 5.5, DENT_DAMP = 0.75, DENT_LAND = 0.012, BULGE = 0.22;   // the dent's half width (px), how fast the flesh gives and settles, how much deeper a landing pushes (px per px/s), the rise beside it as a share of its depth
  const asked = typeof location !== 'undefined' && (location.search.match(/[?&]soft=(sink|tip|blend)\b/) || [])[1];
  let mode = asked || 'blend';
  let st = {}, roomId = null, lastGround = true, lastVy = 0, lastOn = null;
  const list = () => (room && room.def.soft) || null;
  function reset() {
    for (const rp of (room && room.ramps) || []) if (rp.ys0) rp.ys.set(rp.ys0);
    st = {}; roomId = room && room.id; lastGround = true; lastVy = 0; lastOn = null;
  }
  // a piece's state, made the first time it's looked at: the spring (T: how far it's pushed down under him, v: how fast),
  // where he last stood on it (xl, a column), the shapes for that, and each column's shift as drawn
  function state(i) {
    if (st[i]) return st[i];
    const d = list()[i], rp = room.ramps[i], n = rp.x1 - rp.x0 + 1;
    if (!rp.ys0) rp.ys0 = Float32Array.from(rp.ys);
    const s = st[i] = { T: 0, v: 0, xl: -1, soft: 0, S: new Float32Array(n), U: new Float32Array(n), d: new Int16Array(n), n, a: 0, av: 0, dent: new Int16Array(n), dx: -1,
                        k: d.stem ? (d.stem.give != null ? d.stem.give : STEM) : 0 };
    shapes(s, d, rp, Math.floor(n / 2));
    return s;
  }
  // the bend for him standing at column xl: S when it's pushed down (every anchor holds), U when it's sprung up past rest
  // (only the held anchors hold, a resting end lifts). Each is the shift along the piece divided by the shift under him,
  // so under him it's 1 and at an anchor 0. s.soft: how much it gives under him there against its softest spot, so
  // standing near where it's held barely moves it. With a stem, the stem's share moves every column the same
  function shapes(s, d, rp, xl) {
    s.xl = xl;
    const anchors = d.anchors.map(([a0, a1, kind]) => [a0 - rp.x0, a1 - rp.x0, kind]);
    const down = bend(s.n, anchors, xl), up = bend(s.n, anchors.filter(a => a[2] === 'held'), xl), k = s.k;
    const tips = mode !== 'sink' && d.stem;
    if (tips) tip(s, d, rp, xl, down, mode === 'blend' ? BLEND : 1);
    // under him the stem gives k and the cap's own bend (1 - k) x down.soft, so the cap's share of what moves under him is
    // that part alone: a column's shift is the stem's share plus the cap's share times its bend there. (Taking the whole
    // shift under him times the bend sent a cap's far edge way down when he stood just off its stem, where the bend's
    // ratio of edge to under him is large but the cap itself barely gives.)
    const sb = (1 - k) * down.soft, tot = Math.max(1e-6, k + sb), ks = k / tot, cs = sb / tot;
    for (let x = 0; x < s.n; x++) { s.S[x] = d.stem ? ks + cs * down.S[x] : down.S[x]; s.U[x] = d.stem ? ks + cs * (tips ? down.S[x] : up.S[x]) : up.S[x]; }
    s.soft = d.stem ? tot : down.soft;
  }
  function bend(n, anchors, xl) {
    const S = new Float32Array(n);
    if (anchors.some(a => xl >= a[0] && xl <= a[1])) return { S, soft: 0 };                  // on an anchor: nothing moves
    let left = null, right = null;
    for (const a of anchors) { if (a[1] < xl && (left === null || a[1] > left)) left = a[1]; if (a[0] > xl && (right === null || a[0] < right)) right = a[0]; }
    if (left === null && right === null) { S.fill(1); return { S, soft: 1 }; }                // nothing holds it: it moves whole
    if (left === null || right === null) {                                                   // held at one side: a shelf, its free end gives most
      const xa = left === null ? right : left, dir = left === null ? -1 : 1, xf = dir > 0 ? n - 1 : 0;
      const L = Math.abs(xf - xa), a = Math.abs(xl - xa);
      for (let x = 0; x < n; x++) {
        const t = (x - xa) * dir; if (t <= 0 || t > L) continue;
        S[x] = t <= a ? t * t * (3 * a - t) / (2 * a * a * a) : (3 * t - a) / (2 * a);
      }
      return { S, soft: Math.pow(a / L, 2) };                                               // (a beam would be the cube; flesh and rotten wood give sooner along their length)
    }
    const L = right - left, a = xl - left, b = right - xl;                                   // anchored at both sides: it bows between them, most under him
    for (let x = left + 1; x < right; x++) {
      const t = x - left;
      S[x] = t <= a ? t * (L * L - b * b - t * t) / (2 * a * a * b) : (L - t) * (L * L - a * a - (L - t) * (L - t)) / (2 * a * b * b);
    }
    return { S, soft: 16 * a * a * b * b / (L * L * L * L) };
  }
  // 'tip': the cap turns about the stem's top toward the side he's on, the more the farther off its middle he stands:
  // its edge there goes down with him and the far edge rises. Right over the stem it only sinks. most: the share of the
  // turn at the cap's edge (1 for tip, BLEND for the blend)
  function tip(s, d, rp, xl, down, most) {
    const xp = d.stem.box[0] + d.stem.box[2] / 2 - rp.x0, off = xl - xp, half = Math.max(xp, s.n - 1 - xp);
    const r = most * Math.min(1, Math.pow(Math.abs(off) / (half * 0.6), 2));                 // (squared, so a step off the middle tips it a little, the edge all the way)
    if (r < 0.001) return;
    for (let x = 0; x < s.n; x++) down.S[x] = (1 - r) * down.S[x] + r * (x - xp) / off;
  }
  // the soft line under his feet, if he's standing on one
  function under() {
    if (!room || !room.ramps || !P.ground || P.dropT > 0) return null;
    const soft = list(); if (!soft) return null;
    const xi = Math.round(P.x); let best = null, bd = 9;
    room.ramps.forEach((rp, i) => {
      if (!soft[i] || xi < rp.x0 || xi > rp.x1) return;
      const sy = rp.ys[xi - rp.x0], dd = Math.abs(sy - P.y);
      if (sy >= P.y - 0.6 && sy <= P.y + 0.6 && dd < bd) { best = i; bd = dd; }
    });
    return best;
  }
  function update(dt) {
    if (!room) return;
    if (room.id !== roomId) reset();
    const soft = list(); if (!soft) return;
    const on = under();
    // the frame he leaves a soft piece by jumping while it's rising: its speed under him goes into his jump
    if (lastGround && !P.ground && P.vy < 0 && lastOn !== null && st[lastOn] && st[lastOn].v < 0) {
      const s = st[lastOn]; P.vy += s.v * LIFT * (s.T >= 0 ? s.S[s.xl] : s.U[s.xl]);
    }
    const w = 2 * Math.PI * HZ;
    for (const key in soft) {
      const i = +key, rp = room.ramps[i]; if (!rp) continue;
      const d = soft[key], s = state(i), here = on === i, sag = d.sag;
      if (here) {
        const xl = Math.max(0, Math.min(s.n - 1, Math.round(P.x) - rp.x0));
        if (xl !== s.xl) shapes(s, d, rp, xl);
        if (!lastGround && lastVy > 0) s.v += Math.min(lastVy, 520) * LAND * sag / 4 * s.soft;   // landing: the push, by how hard he came down and how soft it is where he is
      }
      const target = here ? sag * STAND * s.soft : 0;
      const acc = -w * w * (s.T - target) - 2 * DAMP * w * s.v;
      s.v += acc * dt; s.T += s.v * dt;
      if (s.T > sag * 1.8) { s.T = sag * 1.8; s.v = Math.min(s.v, 0); }                   // it can't fold past this
      if (s.T < -sag * 0.6) { s.T = -sag * 0.6; s.v = Math.max(s.v, 0); }                 // nor spring up past this
      const was = here ? s.d[s.xl] + s.dent[s.xl] : 0, sh = s.T >= 0 ? s.S : s.U;
      if (d.sponge) {                                                                      // the flesh under his feet: a quick spring on how deep the dent is
        if (here && !lastGround && lastVy > 0) s.av += Math.min(lastVy, 520) * DENT_LAND * d.sponge;
        const wd = 2 * Math.PI * DENT_HZ, tgt = here ? d.sponge : 0;
        s.av += (-wd * wd * (s.a - tgt) - 2 * DENT_DAMP * wd * s.av) * dt; s.a += s.av * dt;
        if (s.a > 2 * d.sponge) { s.a = 2 * d.sponge; s.av = Math.min(s.av, 0); }
        if (s.a < 0) { s.a = 0; s.av = Math.max(s.av, 0); }
        if (here) s.dx = s.xl;
        s.here = here;
        for (let x = 0; x < s.n; x++) {                                                    // the dent round where he last stood: deepest under him, a small rise either side
          const t = s.dx < 0 ? 9 : Math.abs(x - s.dx) / DENT_R; let f = 0;
          if (t < 1) f = (1 - t * t) * (1 - t * t); else if (t < 2) f = -BULGE * Math.sin(Math.PI * (t - 1));
          s.dent[x] = Math.round(s.a * f);
        }
      }
      for (let x = 0; x < s.n; x++) {                                                      // every column: its shift, within the room's clearance there, into the line he stands on
        let v = Math.round(s.T * sh[x]);
        const most = Math.ceil(1.8 * d.sag);                                               // (no column of a piece ever goes past the most the piece can fold, wherever he stands)
        if (v > most) v = most; else if (v < -most) v = -most;
        if (v > d.down[x]) v = d.down[x]; else if (v < -d.up[x]) v = -d.up[x];
        s.d[x] = v;
        let dn = s.dent[x]; if (v + dn > d.down[x]) dn = d.down[x] - v;
        s.dent[x] = dn; rp.ys[x] = rp.ys0[x] + v + dn;
      }
      if (here) { const dy = s.d[s.xl] + s.dent[s.xl] - was; P.y += dy; P.py += dy; }        // he rides it, dent and all
    }
    lastGround = P.ground; lastVy = P.vy; lastOn = on;
  }
  // the pieces, bent: each column of a cap drawn at its own shift (runs of the same shift in one go), and a stem whose
  // columns follow the cap's over them at the top and stay on the ground at the foot
  function draw(ctx) {
    const soft = list(); if (!soft) return;
    const pcs = room.def.art.pieces || {}, pack = room.def.art.pack;
    for (const key in soft) {
      const d = soft[key], rp = room.ramps[+key]; if (!rp) continue;
      const s = st[+key];
      if (d.stem) {                                                                         // the stem: each of its columns' top moves with the cap's column over it, its foot stays on the ground, the rows between in proportion
        const r = pcs[d.stem.piece], im = Assets.get(pack + '#piece_' + d.stem.piece);       // (so the cap and the stem are joined at every step whatever the cap does: in 'tip' the stem shears with it)
        if (r && im) {
          if (!s || !s.T) ctx.drawImage(im, r[0], r[1]);
          else for (let c = 0; c < r[2]; c++) {
            const xi = Math.max(0, Math.min(s.n - 1, r[0] + c - rp.x0)), top = s.d[xi], h = r[3];
            let j0 = 0, v0 = top;
            for (let j = 1; j <= h; j++) {
              const v = j < h ? Math.round(top * (h - 1 - j) / Math.max(1, h - 1)) : NaN;
              if (v !== v0) { ctx.drawImage(im, c, j0, 1, j - j0, r[0] + c, r[1] + j0 + v0, 1, j - j0); j0 = j; v0 = v; }
            }
          }
        }
      }
      const r = pcs[d.piece], im = Assets.get(pack + '#piece_' + d.piece); if (!r || !im) continue;
      if (!s || (!s.T && !s.a)) { ctx.drawImage(im, r[0], r[1]); continue; }
      let c0 = 0, v0 = s.d[r[0] - rp.x0] || 0;                                            // runs of columns with the same shift in one go, the dented ones each on their own
      const flush = c => { if (c > c0) ctx.drawImage(im, c0, 0, c - c0, r[3], r[0] + c0, r[1] + v0, c - c0, r[3]); };
      for (let c = 0; c <= r[2]; c++) {
        const xi = r[0] + c - rp.x0, v = c < r[2] ? (s.d[xi] || 0) : NaN, dn = c < r[2] ? (s.dent[xi] || 0) : 0;
        if (dn) {                                                                          // the dent: the column squashed from its top, its bottom staying put (a rise stretches it a little)
          flush(c); c0 = c + 1; v0 = c + 1 < r[2] ? (s.d[xi + 1] || 0) : NaN;
          const top = colTop(im, r, c); if (top === null) continue;
          const hh = r[3] - top;
          ctx.drawImage(im, c, top, 1, hh, r[0] + c, r[1] + v + top + dn, 1, Math.max(1, hh - dn));
          continue;
        }
        if (v !== v0) { flush(c); c0 = c; v0 = v; }
      }
    }
  }
  const tops = new WeakMap();                                                                 // each piece picture's first drawn row per column, read once
  function colTop(im, r, c) {
    let t = tops.get(im);
    if (!t) {
      t = new Int16Array(im.width).fill(-1);
      const cv = document.createElement('canvas'); cv.width = im.width; cv.height = im.height; const g = cv.getContext('2d'); g.drawImage(im, 0, 0);
      try { const a = g.getImageData(0, 0, im.width, im.height).data; for (let x = 0; x < im.width; x++) for (let y = 0; y < im.height; y++) if (a[(y * im.width + x) * 4 + 3] > 0) { t[x] = y; break; } }
      catch (e) { t.fill(0); }
      tops.set(im, t);
    }
    return t[c] < 0 ? null : t[c];
  }
  // after he's drawn: the dent's walls in front of his feet, the part of the cap's top that's above where his feet are,
  // only while he's standing on that piece
  function drawFront(ctx) {
    const soft = list(); if (!soft) return;
    const pcs = room.def.art.pieces || {}, pack = room.def.art.pack;
    for (const key in soft) {
      const d = soft[key], s = st[+key], rp = room.ramps[+key]; if (!d.sponge || !s || !s.a || !s.here || !rp) continue;   // (only while he's standing on this one: stepping off, nothing covers his feet)
      const r = pcs[d.piece], im = Assets.get(pack + '#piece_' + d.piece); if (!r || !im) continue;
      const feet = Math.round(P.y);
      for (let c = 0; c < r[2]; c++) {
        const xi = r[0] + c - rp.x0, dn = s.dent[xi] || 0; if (dn <= 0 || Math.abs(r[0] + c - P.x) > DENT_R) continue;
        const top = colTop(im, r, c); if (top === null) continue;
        const hh = r[3] - top, v = s.d[xi] || 0, y0 = r[1] + v + top + dn, sc = Math.max(1, hh - dn) / hh;
        const show = Math.min(feet - y0, Math.max(1, hh - dn));                             // only what's above his feet
        if (show <= 0) continue;
        ctx.drawImage(im, c, top, 1, show / sc, r[0] + c, y0, 1, show);
      }
    }
  }
  return { update, draw, drawFront, reset, state: () => st, get mode() { return mode; }, set mode(m) { mode = m; for (const k in st) st[k].xl = -1; } };
})();
onEvents('soft', dt => SOFT.update(dt));
