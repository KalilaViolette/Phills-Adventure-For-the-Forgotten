'use strict';
// ---------- the parts of a painted room that give when he lands on them ----------
// A mushroom cap squashes a little and springs back when he lands on it, moss presses down, and spores puff up when he
// jumps off a cap. Only the part that moves is cut out (the cap, not its stem; the moss, not the ground under it), and
// it stays fixed where it joins, the stem top or the moss's base.
// Which parts, cut from the room's own painting, and what's under each, are made by Sprites/react_pieces.py
// (js/react_pieces.js). The painting under a part still has the part in it, so while one moves, a patch of what's
// under it goes down first (made up from the painting round it: the trunk carrying on under the cap's edge, the
// dark above the moss), then the part, squashed. The parts are taken out of the painting and drawn on their own, in
// the same place, so at rest it all looks as it always did.
// How each kind moves:
//   squash   flattens toward where it joins and spreads a little, a few times smaller each bounce (amt: how far)
//   flex     a bracket growing out of the trunk: its free end dips and springs back, turning about where it joins
//            (amt: how far it turns, free: which end is free, 1 right, -1 left)
// How hard depends on how fast he came down: a hop barely moves it, a long drop flattens it the most it goes.
const REACT = (() => {
  const LIFE = 0.9;                                                                       // how long one bounce takes to settle
  const live = {};                                                                        // each part moving: how long since it was landed on, and how hard
  let wasGround = true, fallV = 0;
  const here = () => {
    const d = window.REACT_PIECES && room && REACT_PIECES[room.def.id];
    return d && d.pack === (room.def.art.sameAs || room.def.art.pack) ? d : null;           // (only for the painting they were cut from, or a copy of it)
  };
  const keyOf = p => room.def.id + ':' + p.id;
  // the bounce: 1 the moment he lands, swinging back past rest and settling
  const spring = t => Math.exp(-t * 6) * Math.cos(t * 20);
  const shape = (p, k) => p.kind === 'squash' ? { sx: 1 + p.amt * k * 0.45, sy: 1 - p.amt * k } : { sx: 1, sy: 1 };
  const onTop = p => P.x >= p.top[0] && P.x <= p.top[1] && P.y >= p.top[2] && P.y <= p.top[3];
  function hit(p, k) { live[keyOf(p)] = { t: 0, k: Math.max(k, (live[keyOf(p)] || { k: 0 }).k * 0.5) }; }

  function update(dt) {
    const d = here();
    for (const id in live) { live[id].t += dt; if (live[id].t > LIFE) delete live[id]; }
    if (!d) { wasGround = P.ground; return; }
    if (!P.ground && P.vy > 0) fallV = P.vy;
    if (P.ground && !wasGround) {                                                          // landing
      for (const p of d.parts) if (onTop(p)) hit(p, Math.max(0.3, Math.min(1, fallV / 520)));
      fallV = 0;
    }
    if (!P.ground && wasGround && P.vy < 0) {                                              // jumping off
      for (const p of d.parts) if (onTop(p) || (P.x >= p.top[0] && P.x <= p.top[1] && P.y - P.vy * dt >= p.top[2] && P.y - P.vy * dt <= p.top[3])) {
        hit(p, 0.35);
        if (p.puff && typeof puff === 'function') puff(P.x, P.y - 2, 5, 22, p.puff, 18);    // spores off a cap, bits off the moss
      }
    }
    wasGround = P.ground;
  }
  // the room's painting with the parts taken out of it (so a part moving never leaves its old self showing behind it:
  // what's behind it there is the room's back layers, or the patch of what's under it), made once a room
  let cut = null;
  function mainFor(main) {
    const d = here(); if (!d || !main) return main;
    const im = Assets.get(d.sheet);
    if (!im) { Assets.use(d.sheet); return main; }
    if (!cut || cut.main !== main || cut.im !== im) {
      const cv = document.createElement('canvas'); cv.width = main.width; cv.height = main.height;
      const g = cv.getContext('2d'); g.drawImage(main, 0, 0);
      g.globalCompositeOperation = 'destination-out';
      for (const p of d.parts) g.drawImage(im, p.piece[0], p.piece[1], p.w, p.h, p.x, p.y, p.w, p.h);
      cut = { main, im, cv };
    }
    return cut.cv;
  }
  function draw() {
    const d = here(); if (!d || !cut) return;
    for (const p of d.parts) {
      const m = live[keyOf(p)];
      if (!m) { ctx.drawImage(cut.im, p.piece[0], p.piece[1], p.w, p.h, p.x, p.y, p.w, p.h); continue; }   // at rest: just as the painting had it
      const k = m.k * spring(m.t), s = shape(p, k);
      ctx.drawImage(cut.im, p.under[0], p.under[1], p.w, p.h, p.x, p.y, p.w, p.h);         // what's under it
      ctx.save(); ctx.translate(p.anchor[0], p.anchor[1]);
      if (p.kind === 'flex') ctx.rotate(p.amt * k * (p.free || 1)); else ctx.scale(s.sx, s.sy);
      ctx.translate(-p.anchor[0], -p.anchor[1]);
      ctx.drawImage(cut.im, p.piece[0], p.piece[1], p.w, p.h, p.x, p.y, p.w, p.h);         // and it, squashed toward where it joins (or turned, a bracket)
      ctx.restore();
    }
  }
  return { update, draw, mainFor, live, here };
})();
// ---------- leaves kicked up crawling ----------
// The leaves: crawling through the leaves under the fallen log on the litter path, he scuffs a few
// up behind him that flutter and land again. The colors are the lit leaves on that floor in the painting (the darker
// ones disappear against it). Each lasts till it's back down on the floor, so none fall through it. Where: a box
// in the room's pixels (x0, x1, y0, y1, where his feet are)
const KICK = {
  litterpath: { box: [815, 962, 272, 300], cols: ['#b8783c', '#c98a44', '#d89a50', '#e8b060', '#9e6130'], every: 0.08 },
};
const KICKUP = (() => {
  let t = 0;
  function update(dt) {
    const k = room && KICK[room.def.id];
    if (!k || !P.crawl || !P.ground || Math.abs(P.vx) < 8) { t = 0; return; }
    const [x0, x1, y0, y1] = k.box;
    if (P.x < x0 || P.x > x1 || P.y < y0 || P.y > y1) return;
    if ((t -= dt) > 0) return;
    t = k.every * (0.6 + Math.random() * 0.8);
    const back = -Math.sign(P.vx);                                                          // off his feet, behind him (lying down, they're well back)
    for (let i = 0, n = Math.random() < 0.4 ? 2 : 1; i < n; i++) {
      const vy = -25 - Math.random() * 30, g = 300;
      part(P.x + back * (CRAWL_BACK + Math.random() * 6), P.y - 2, back * (10 + Math.random() * 20), vy, -2 * vy / g,
           k.cols[Math.floor(Math.random() * k.cols.length)], Math.random() < 0.6 ? 2 : 1, g);
    }
  }
  return { update, KICK };
})();
onEvents('react', dt => { REACT.update(dt); KICKUP.update(dt); });
