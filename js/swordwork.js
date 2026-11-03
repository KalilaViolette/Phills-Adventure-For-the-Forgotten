'use strict';
// ---------- the beetle working on Phill's sword, all of it seen (10/31/2026) ----------
// Bringing the beetle what the next step needs: Phill hands it over and the beetle gets it ready first, where you can
// see how it's used (the oak gall: he cracks it in his jaws, drops the bits in an acorn cap of water and stirs till the
// water's gone dark). Then Phill hands over his sword. The beetle holds it up and turns it in his jaws, taken with how
// well it's made and how it suits Phill, lays it down and works the stain along it from the hilt to the tip, the
// sword changing as he goes, buzzes it dry, and hands it back.
// Only the next step's thing will do. Bring him one for a later step first and he won't put it on: it'd ruin the blade
// as it is. He'd trade for it, though (SWORD_TRADES, js/sword.js).
// The pictures: the beetle's in Sprites/beetle_work.py (where his jaws meet in each: js/beetle_holds.js), Phill's in
// Sprites/new_side.py (offer, present, ns_wait, ns_reach). The gall, the acorn cap and the sword he's working on are
// drawn here.
const SWORDWORK = (() => {
  // the blade's colors for each step done, dark to light (the same as his gear sheets: 0 plain pine, 1 the gall, 2 cherry, 3 etched)
  const BLADE = [
    ['#966a3c', '#c2945e', '#deb67e', '#f2d4a2'],
    ['#5c422e', '#785c40', '#947654', '#b2966e'],
    ['#76302a', '#9c4836', '#ba6248', '#d48464'],
    ['#76302a', '#9c4836', '#ba6248', '#d48464'],
  ];
  const GRIP = ['#36200f', '#5a3a1e', '#7a5430'], GUARD = ['#4a2c16', '#8a5a30'];
  const STAIN = { gall: '#4a3422' };                     // what the stain looks like in the cap
  // a little sword, hilt at (0, 0), blade along +x, about 19 long. from/to: steps done before and after, k: how far
  // along the blade the new one's got (0 none, 1 all of it), wet: the fresh stain's shine
  const cache = {};
  function swordCanvas(from, to, k, wet) {
    const key = [from, to, Math.round(k * 16), wet ? 1 : 0].join();
    if (cache[key]) return cache[key];
    const cv = document.createElement('canvas'); cv.width = 24; cv.height = 7;
    const g = cv.getContext('2d'), px = (x, y, c) => { g.fillStyle = c; g.fillRect(x, y, 1, 1); };
    for (let x = 0; x < 3; x++) { px(x, 2, GRIP[0]); px(x, 3, x % 2 ? GRIP[1] : GRIP[2]); px(x, 4, GRIP[0]); }   // the grip, wrapped
    px(-1 + 1, 3, GRIP[0]);
    for (let y = 0; y < 7; y++) px(3, y, y === 0 || y === 6 ? GUARD[0] : GUARD[1]);                           // the guard
    const L = 15;
    for (let i = 0; i < L; i++) {
      const x = 4 + i, tip = i >= L - 2, pal = BLADE[(i + 0.5) / L <= k ? to : from];
      const rows = tip ? (i === L - 1 ? [3] : [2, 3, 4]) : [1, 2, 3, 4, 5];
      for (const y of rows) px(x, y, y === rows[0] || y === rows[rows.length - 1] ? pal[0] : y === 2 ? pal[3] : y === 3 ? pal[2] : pal[1]);
      if (wet && (i + 0.5) / L <= k && i % 3 === 1) px(x, 2, '#fff2d8');                                     // the shine of it wet
      if (to === 3 && (i + 0.5) / L <= k && !tip && i % 3 === 0) { px(x, 3, pal[0]); px(x + 1, 2, pal[0]); px(x + 1, 4, pal[0]); }   // the etching, a burned zigzag
    }
    return cache[key] = cv;
  }
  function drawSword(g, x, y, ang, dir, from, to, k, wet) {
    g.save(); g.translate(Math.round(x), Math.round(y)); g.scale(dir, 1); g.rotate(ang);
    g.drawImage(swordCanvas(from, to, k, wet), -1, -3);
    g.restore();
  }
  // the acorn cap he soaks it in: a little cup of knobbly brown, the water in it going dark with stain (mix 0 to 1)
  function drawCap(g, x, y, mix, stain) {
    const px = (cx, cy, c) => { g.fillStyle = c; g.fillRect(Math.round(x + cx), Math.round(y + cy), 1, 1); };
    const W = mixColor('#7aa8b8', stain || '#4a3422', mix), W2 = mixColor('#a8ccd8', stain || '#4a3422', mix * 0.85);
    for (let cx = -4; cx <= 4; cx++) px(cx, -4, Math.abs(cx) === 4 ? '#3a2814' : cx < 0 ? W2 : W);              // the water at the top
    for (let cy = -3; cy <= 0; cy++) for (let cx = -4 + (cy > -2 ? 1 : 0) + (cy === 0 ? 1 : 0); cx <= 4 - (cy > -2 ? 1 : 0) - (cy === 0 ? 1 : 0); cx++)
      px(cx, cy, (cx + cy) % 2 ? '#6a4a26' : '#8a6234');                                                       // the cap, scaly
    px(-3, -3, '#a07a46'); px(-2, -2, '#a07a46');
  }
  function mixColor(a, b, t) {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), A = p(a), B = p(b);
    return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * Math.max(0, Math.min(1, t))).toString(16).padStart(2, '0')).join('');
  }
  // what's out right now: in Phill's hands, in the beetle's jaws, on the ground, the cap
  const S = { phill: null, held: null, ground: null, cap: null, bits: 0, turn: null, walk: null };
  const reset = () => { S.phill = S.held = S.ground = S.cap = S.turn = S.walk = null; S.bits = 0; };
  const beetleAt = () => { const n = room && room.def.npc; return n && n.kind === 'beetle' ? n : null; };
  const faceOf = n => S.walk || (P.x > n.x ? 1 : -1) * (S.turn === 'away' ? -1 : 1);   // facing Phill, or turned away to work, or the way he's scuttling
  function hold(n) {                                                                    // where his jaws meet right now
    const fr = npcPose && npcPose.t > 0 ? npcPose.frame.replace(/^beetle_/, '') : 'grip';
    const h = (window.BEETLE_HOLDS && BEETLE_HOLDS[fr]) || [-27, -18], f = faceOf(n);
    return { x: n.x - h[0] * f, y: n.y + h[1], f };                                       // (his pictures face left: turned round when he faces right)
  }
  function drawThing(g, what, x, y, f) {
    if (what.kind === 'gall') { if (what.cracked) { drawGallBits(g, x, y, what.cracked); } else drawGall(x, y - 1, 1, g); }
    else if (what.kind === 'sword') drawSword(g, x, y, what.ang || 0, f, what.from, what.to, what.k, what.wet);
  }
  function drawGallBits(g, x, y, k) {                                                   // cracked open in his jaws: bits of it
    const pcs = [[-3, -2], [2, -3], [-1, 1], [3, 1], [0, -1]];
    pcs.slice(0, Math.max(2, Math.round(5 - k * 3))).forEach(([dx, dy], i) => {
      g.fillStyle = i % 2 ? '#5a4230' : '#7a5c40'; g.fillRect(Math.round(x + dx * (1 + k)), Math.round(y + dy * (1 + k * 0.5)), 2, 2);
    });
  }
  const _drawNpc = drawNpc;
  drawNpc = () => {
    const n = beetleAt();
    if (n && (S.turn || S.walk) && npcPose && npcPose.t > 0) { n.gone = true; try { _drawNpc(); } finally { n.gone = false; } spr(npcPose.frame, n.x, n.y, faceOf(n) > 0); }   // turned away from Phill to work
    else _drawNpc();
    if (!n) return;
    if (S.cap) drawCap(ctx, S.cap.x, n.y, S.cap.mix, S.cap.stain);
    if (S.ground) drawThing(ctx, S.ground, S.ground.x, n.y - 3, S.ground.f);
    if (S.held) {
      const h = hold(n);
      if (S.held.byBlade) drawSword(ctx, h.x + h.f * 18, h.y, 0, -h.f, S.held.from, S.held.to, S.held.k, false);   // handing it back: the blade in his jaws, the grip held out to Phill
      else drawThing(ctx, S.held, h.x, h.y, h.f);                                                                   // by the grip, the blade out in front of him
    }
  };
  const _drawPhill = drawPhill;
  drawPhill = (px, py, q) => {
    _drawPhill(px, py, q);
    if (S.phill && S.phill.kind === 'sword') drawSword(ctx, px + 12 * P.facing, py - 18, 0.14, -P.facing, S.phill.from, S.phill.to, S.phill.k, false);   // the grip held out in his front hand, the blade laid back across the other (Phill's present picture): never the point at anyone
    else if (S.phill) drawThing(ctx, S.phill, px + 9 * P.facing, py - 16, P.facing);     // held out in both hands (Phill's offer picture)
  };

  // ---- the steps
  const bp = (frame, t = 99) => run(() => { npcPose = { frame: 'beetle_' + frame, t }; });  // hold the beetle in a picture
  const flick = (frames, fps, sec, each) => (t, dt) => {                                // the beetle flipping through pictures, each(k, t) on every change
    const k = Math.floor(t * fps) % frames.length, was = Math.floor((t - (dt || 0)) * fps) % frames.length;
    npcPose = { frame: 'beetle_' + frames[k], t: 0.2 };
    if (each && (t === 0 || k !== was)) each(k, t);
    return t >= sec;
  };
  // the beetle scuttles over to x (facing the way he goes), carrying whatever he's got
  const scuttleTo = x => (t, dt) => {
    const n = beetleAt(); if (!n) return true;
    const d = x - n.x; n.x += Math.sign(d) * Math.min(Math.abs(d), 34 * (dt || 0));
    S.walk = Math.sign(d) || null;
    npcPose = { frame: 'beetle_' + (S.held ? 'tote_' : 'scuttle_') + (Math.floor(t * 12) % 4 + 1), t: 0.2 };
    if (Math.abs(x - n.x) < 0.5) { S.walk = null; return true; }
    return false;
  };
  const over = (sec, fn) => (t, dt) => { fn(Math.min(1, t / sec), dt); return t >= sec; };   // something changing over a while (fn gets 0 to 1)
  // getting each thing ready before it goes on the sword: one a step (js/sword.js's process)
  const PROCESS = {
    gall: (n, w) => {
      const f = () => faceOf(n);
      return [
        run(() => { S.turn = 'away'; }), bp('set', 0.6), run(() => { S.cap = { x: n.x + f() * 22, mix: 0, stain: STAIN.gall }; sfx.bump(); }), wait(0.4),   // turns round to his work, puts down an acorn cap of water
        bp('grip'), wait(0.3),
        flick(['crunch_1', 'crunch_2'], 5, 1.8, (k, t) => {                             // cracks it in his jaws
          if (k === 0) { sfx.tok(); S.held.cracked = Math.min(1, (S.held.cracked || 0) + 0.34); const h = hold(n); for (let i = 0; i < 3; i++) part(h.x, h.y, (Math.random() - 0.5) * 40, -10 - Math.random() * 30, 0.4, '#5a4230', 1, 200); }
        }),
        bp('dab_1', 0.5), run(() => { const h = hold(n); S.held = null; for (let i = 0; i < 5; i++) part(h.x + (Math.random() - 0.5) * 4, h.y, 0, 20 + Math.random() * 20, 0.3, '#5a4230', 1, 300); }),   // drops the bits in
        wait(0.3), run(() => { for (let i = 0; i < 6; i++) part(S.cap.x + (Math.random() - 0.5) * 6, n.y - 5, (Math.random() - 0.5) * 30, -30 - Math.random() * 20, 0.35, '#a8ccd8', 1, 260); sfx.splash ? sfx.splash() : sfx.bump(); }),
        together(flick(['dab_1', 'dab_2'], 6, 2.4, k => { if (k === 0) sfx.tok(); }), over(2.4, k => { S.cap.mix = k; })),   // and stirs till it's gone dark
      ];
    },
  };
  const generic = n => [flick(['chew_1', 'chew_2'], 7, 1.8, k => { if (k) sfx.tok(); }), run(() => { S.held = null; })];   // (a step whose thing hasn't got its own yet)
  // working it onto the sword: the stain worked along from the hilt to the tip, then buzzed dry
  const apply = (n, from, to) => [
    run(() => { S.turn = 'away'; }), bp('set', 0.6),
    run(() => { S.ground = { kind: 'sword', x: n.x + faceOf(n) * 14, f: faceOf(n), from, to, k: 0, wet: true }; S.held = null; sfx.bump(); }), wait(0.3),   // turns round and lays it down in front of him
    together(flick(['dab_1', 'dab_2'], 6, 3.0, k => { if (k === 0) sfx.tok(); }), over(3.0, k => {                   // and works the stain along it, hilt to tip
      S.ground.k = k; if (Math.random() < 0.3) part(S.ground.x + S.ground.f * (4 + k * 15), n.y - 4, 0, 6, 0.4, S.cap ? S.cap.stain : '#4a3422', 1, 60);
    })),
    run(() => { if (S.cap) S.cap.mix = 0.6; }),
    flick(['buzz_1', 'buzz_2'], 18, 1.4, (k, t) => { if (t === 0) sfx.buzz(); if (k) part(n.x + faceOf(n) * 14, n.y - 10, faceOf(n) * 50, -8, 0.4, '#e8dcc8', 1, 0); }),   // buzzes it dry
    run(() => { S.ground.wet = false; }),
    bp('set', 0.4), wait(0.3), run(() => { S.held = { kind: 'sword', from: to, to, k: 1, byBlade: true }; S.ground = null; }), bp('grip', 0.4), wait(0.3),
    run(() => { S.turn = null; }), bp('grip', 0.6), wait(0.5),                          // picks it up by the blade and turns round, the grip held out to Phill
  ];
  // the whole thing: w the step, from/to how many steps are done before and after
  function steps(n, w, from, to) {
    const f = faceOf(n);
    return [
      // what he needs: Phill holds it out, the beetle takes it in his jaws
      pose('offer', 0.7), run(() => { S.phill = { kind: w.process || 'thing' }; sfx.pickup(); }), wait(0.5),
      run(() => { S.phill = null; S.held = { kind: w.process || 'thing' }; }), bp('grip', 0.6), pose(null), wait(0.4),
      ...(PROCESS[w.process] ? PROCESS[w.process](n, w) : generic(n)),
      run(() => { S.turn = null; npcPose = null; }), sayTop('beetle', w.line),
      // the sword: Phill holds it out, the beetle takes it, and turns it over, taken with it
      sayTop('beetle', 'Right. Let me have that sword.'),
      run(() => { S.phill = { kind: 'sword', from, to: from, k: 0 }; }), pose('present', 0.9),
      bp('grip', 0.5), run(() => { S.phill = null; S.held = { kind: 'sword', from, to: from, k: 0 }; sfx.pickup(); }), pose('ns_wait_1', 0.4),   // he takes it by the grip
      flick(['grip_up_1', 'grip_up_2'], 2, 1.6, () => { if (S.held) S.held.ang = -1.25 - Math.random() * 0.2;   /* (up, nearly on end: looking along it, not at Phill) */ }), bp('grip_up_1'),
      sayTop('beetle', ...w.admire),
      ...apply(n, from, to),
      // and back to him
      pose('ns_reach', 0.5), run(() => { S.held = null; refreshSheets(); sfx.pickup(); }), pose(null),
      run(() => { npcPose = null; popup(P.x, P.y - 54, w.done, '#e8c8a0', true); twinkle(P.x + P.facing * 10, P.y - 20, 10, '#e8c8a0'); sfx.idea(); }),
      wait(0.6), run(() => { S.cap = null; }),
    ];
  }
  return { steps, reset, state: S, drawSword, drawCap, PROCESS, scuttleTo };
})();

// the beetle's scene (it was in js/scenes/rootwood.js): meeting him, what each step needs, a later step's thing brought
// too soon, trading, and the work itself (SWORDWORK.steps)
SCENES.beetle = npc => {
  SWORDWORK.reset();
  const side = P.x > npc.x ? 1 : -1;
  const steps = [run(() => { P.vx = 0; }), faceTo(npc.x)];   // (Phill stays where he is: the beetle comes over when there's work)
  const job = swordNext();
  if (!world.flags.metBeetle) {
    world.flags.metBeetle = true; saveWorld();
    steps.push(run(() => { npcPose = { frame: 'beetle_idle_2', t: 0.6 }; }), wait(0.5),
      say('beetle', "*tk tk* Not a bottle cap. Good. Had enough of those chewing my roots.",
        "Let me see that stick. Pine. Somebody carved that careful. Soft, though.",
        "I can stain it. Hardens the grain, hits harder. Need something to make the stain from, though."));
  } else steps.push(say('beetle', ['Mind the shavings.', '*tk* Back. Still soft, that sword?', 'Hm.'][Math.floor(Math.random() * 3)]));
  // a later step's thing, brought before the one it goes over
  const early = swordEarly();
  if (early && !swordReady()) {
    steps.push(say('beetle', ...(early.tooSoon || ["That's good stuff. Not for that blade, though. Not yet.", `Put it on now and it'd blotch, never take right. It needs ${(job && job.under) || 'what comes before it'} underneath first.`])));
    const trade = SWORD_TRADES.find(tr => tr.for === early.needs && !world.has[tr.gives]);
    if (!trade) { steps.push(say('beetle', "I'd trade you for it, mind. Haven't got anything worth it yet. Hang on to it.")); if (job && job.hint) steps.push(say('beetle', job.hint)); return steps; }
    let pickT = -1;
    steps.push(say('beetle', "I'd trade you for it, though."), ask('beetle', trade.offer, ['trade', 'keep it'], i => { pickT = i; }));
    steps.push(t => {
      if (t > 0 || pickT !== 0) return true;
      delete world.has[early.needs]; world.has[trade.gives] = true; world.flags['traded_' + early.needs] = true; saveWorld(); sfx.pickup();
      scene.steps.splice(scene.i + 1, 0, say('beetle', trade.line), run(() => popup(P.x, P.y - 54, trade.name, '#e8c8a0', true)));
      return true;
    });
    return steps;
  }
  if (!job) return [...steps, say('beetle', "That's as good as wood from round here gets. Find me better wood somewhere else and we'll talk.")];
  if (!swordReady()) return [...steps, say('beetle', job.hint)];
  let picked = -1;
  steps.push(ask('beetle', 'Well? Want me to?', [job.offer, 'not yet'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0 || picked !== 0) return true;
    // done in the same save as it's used up (the save audit, 10/17/2026): the work after is only for show
    const from = swordLevel(); world.sword = from + 1; sfx.pickup(); saveWorld();
    const at = P.x - side * 2.75 * T;                                                     // he comes over to Phill for it
    scene.steps.splice(scene.i + 1, 0, bars(true), SWORDWORK.scuttleTo(at), faceTo(at), ...SWORDWORK.steps(npc, job, from, from + 1), bars(false), sayTop('beetle', '*tk tk* There. Go hit something.'), run(() => { npcPose = null; SWORDWORK.reset(); }),
      SWORDWORK.scuttleTo(typeof BEETLE !== 'undefined' && BEETLE.state ? BEETLE.state.home + BEETLE.SPOT.work : npc.x), run(() => { npcPose = null; SWORDWORK.reset(); }));   // and back to his own spot
    return true;
  });
  return steps;
};
