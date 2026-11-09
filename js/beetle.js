'use strict';
// ---------- the beetle at work ----------
// When nobody's talking to him, the stag beetle by the roots works round his door like a beetle smith would. He gnaws a
// bit of wood into shape with his jaws, knocks it on the ground to hear if it's sound, holds it up to the light through
// his spectacles, gnaws a bit more, then lifts his wing cases and buzzes the shavings off. Then he scuttles over to his
// door with it in his jaws, puts it up on the shelf inside, and comes back with the next one. Round and round. The
// shavings pile up in front of him while he gnaws, and the buzz blows them off
// He works wherever he's got to: talking to him, or a scene with him in it, stops him where he is, facing Phill, and he
// carries on after. The pictures: Sprites/beetle_work.py (beetle_chew_1 and so on)
// One step a line:
//   do     a frame or two swapped (fps), for a while (t), with what comes off it (fx: chips, knock, buzz)
//   walk   scuttle over to a spot (to: work or door), carrying the wood or not
//   face   which way he faces while he's at it (-1 left, 1 right)
const BEETLE = (() => {
  const SPOT = { work: -40, door: -4 };            // where he works (out in the light) and his door, from where the room puts him
  const SPEED = 24;                                // how fast he scuttles (px a second)
  const ROUTINE = [
    { do: ['chew_1', 'chew_2'], fps: 7, t: 3.4, fx: 'chips', face: -1 },
    { do: ['tap_1', 'tap_2'], fps: 4, t: 1.5, fx: 'knock', face: -1 },
    { do: ['inspect_1', 'inspect_2'], fps: 2.5, t: 1.6, face: -1 },
    { do: ['chew_1', 'chew_2'], fps: 7, t: 2.4, fx: 'chips', face: -1 },
    { do: ['buzz_1', 'buzz_2'], fps: 18, t: 1.1, fx: 'buzz', face: -1 },
    { do: ['idle_1'], t: 0.7, face: -1 },
    { walk: 'door', carry: true },
    { do: ['shelf_1'], t: 0.7, face: 1 },            // reaching up to put it on the shelf inside
    { do: ['shelf_2'], t: 0.5, face: 1 },            // letting go
    { do: ['idle_2'], t: 0.8, face: 1 },             // looking over what's up there
    { do: ['shelf_2'], t: 0.4, face: 1 },            // reaching for the next one
    { do: ['shelf_1'], t: 0.5, face: 1 },            // got it
    { walk: 'work', carry: true },
  ];
  let st = null;                                   // { n, home, i, t, last }
  const near = n => Math.abs(P.x - n.x) < 220;     // (only heard when he's about)
  function start(n) { st = { n, home: n.x, i: 0, t: 0, last: performance.now() / 1000, x: n.x + SPOT.work, f: -1, pile: [] }; n.x = st.x; }
  function step(n) {
    if (!st || st.n !== n) start(n);
    const now = performance.now() / 1000, dt = Math.min(0.1, now - st.last); st.last = now;
    const s = ROUTINE[st.i];
    let fr;
    if (s.walk) {
      const to = st.home + SPOT[s.walk], d = to - st.x;
      st.f = Math.sign(d) || st.f;
      st.x += Math.sign(d) * Math.min(Math.abs(d), SPEED * dt);
      fr = (s.carry ? 'carry_' : 'scuttle_') + (Math.floor(now * 12) % 4 + 1);
      if (Math.abs(to - st.x) < 0.5) next();
    } else {
      st.t += dt; st.f = s.face;
      const k = s.do.length > 1 ? Math.floor(st.t * (s.fps || 4)) % s.do.length : 0;
      fr = s.do[k];
      if (s.fx && s.do.length > 1 && k !== st.k) effect(s.fx, k, n);
      st.k = k;
      if (st.t >= s.t) next();
    }
    n.x = st.x;
    return { fr: 'beetle_' + fr, flip: st.f > 0 };
  }
  function next() { st.i = (st.i + 1) % ROUTINE.length; st.t = 0; st.k = -1; }
  function effect(fx, k, n) {
    const hx = n.x - 18 * (st.f > 0 ? -1 : 1), hy = n.y - 15;   // about where his jaws are
    if (fx === 'chips' && k === 1) {
      for (let i = 0; i < 2; i++) part(hx, hy, -st.f * (10 + Math.random() * 30), -20 - Math.random() * 30, 0.5, '#e2be82', 1, 160);
      if (st.pile.length < 12 && Math.random() < 0.6) st.pile.push({ x: Math.round(hx - st.f * (2 + Math.random() * 9)), y: n.y - (Math.random() < 0.3 ? 1 : 0), c: Math.random() < 0.5 ? '#e2be82' : '#c8a06a' });   // the shavings pile up on the ground in front of him
      if (near(n) && Math.random() < 0.4) sfx.tok();
    }
    if (fx === 'knock' && k === 1) { part(hx - 4 * st.f, n.y - 1, 0, -15, 0.3, '#9a8a70', 1, 0); if (near(n)) sfx.tok(); }
    if (fx === 'buzz') {
      part(hx + 30 * (st.f > 0 ? -1 : 1), n.y - 6, -st.f * 60, -10, 0.4, '#d8c49a', 1, 0);
      for (let i = 0; i < 3 && st.pile.length; i++) { const c = st.pile.shift(); part(c.x, c.y - 1, -st.f * (40 + Math.random() * 50), -15 - Math.random() * 25, 0.6, c.c, 1, 120); }   // and get blown away
      if (k === 0 && near(n) && st.t < 0.1) sfx.buzz();
    }
  }
  const busy = () => talk || scene || cutscene || (npcPose && npcPose.t > 0);
  const _drawNpc = drawNpc;
  drawNpc = () => {
    const n = room && room.def.npc;
    if (!n || n.kind !== 'beetle' || n.gone || busy() || !(window.RW_SPRITES && RW_SPRITES.beetle_chew_1)) { if (st && n === st.n) { st.last = performance.now() / 1000; st.x = n.x; } return _drawNpc(); }   // (a scene can move him: he carries on from there)
    const { fr, flip } = step(n);
    for (const c of st.pile) { ctx.fillStyle = c.c; ctx.fillRect(c.x, c.y - 1, 1, 1); }
    n.gone = true; try { _drawNpc(); } finally { n.gone = false; }        // (everything else drawn with whoever's there, without him)
    spr(fr, n.x, n.y, flip);
  };
  return { get state() { return st; }, ROUTINE, SPOT };
})();
