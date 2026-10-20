'use strict';
// ---------- idle bits: little things Phill does when he's been left standing around ----------
// After a while with nothing pressed (and nothing around to hurt him) he picks one of these at random, never the same
// one twice in a row. Anything pressed, or getting hit, stops it on the spot and he's straight back to normal.
// Each bit is a list of steps: a frame (or 'idle' for his normal breathing), how long it holds, and what happens as it
// starts. Spots are given ahead of him (fwd, flipped with his facing) and up from his feet (up is negative).
// He straps his sword and shield on his back first (so his hands show) and takes them back after: those
// bits use the b_ copies of his frames. After 3 minutes of nothing he gets tired, lies down and sleeps for 30 seconds,
// and every 3 minutes after he wakes he can do it again.
const IDLE_WAIT = [20, 12];        // seconds of nothing before the first one, then between each one after (7 was too often)
const IDLE_SLEEP = 180, IDLE_NAP = 30;   // 3 minutes of nothing and he lies down for a 30 second nap
const idleState = { still: 0, wait: IDLE_WAIT[0], last: null, long: 0 };
const rndIn = (a, b) => a + Math.random() * (b - a);
const ilerp = (a, b, k) => a + (b - a) * k;

// the crayon he draws with: any of the ones he's found (the red from the backyard box to start with)
const IDLE_CRAYONS = { crayon_black: '#3a3640', crayon_rootwood: '#8fd88a', crayon_pond: '#7aa8f0', crayon_playground: '#f0a060', crayon_oak: '#c89060' };
// pictures he scratches in the dirt with his sword (scratched in going round from the middle, like he's drawing it)
const DOODLES = [
  ['.##.##.', '#..#..#', '#.....#', '.#...#.', '..#.#..', '...#...'],              // a heart
  ['...###...', '..#...#.#', '.#.#...##', '..#...#.#', '...###...'],                 // a fish
  ['..###..', '.#...#.', '#.#.#.#', '#.....#', '.#...#.', '..###..'],                 // a round face, like his
  ['#..#..#', '.#.#.#.', '..###..', '###.###', '..###..', '.#.#.#.'],                 // the sun
];

const ib = (f, d, go, more) => Object.assign({ f, d, go }, more);

// the map and the book: sitting down facing us with his gear still on his back, and getting it out of his backpack
const readSitDown = kind => [ib('rf_squat', 0.13, () => sfx.bump()), ib('rf_plop', 0.12), ib('rf_sit', 0.4), ib('rf_reach', 0.3), ib('rf_pull_' + kind, 0.25, () => sfx.rustle(0.4))];
// holding it up looking at it, breathing
function readHold(s, kind, d) { for (let t = 0, k = 0; t < d; t += 0.6, k++) s.push(ib(`rf_${kind}_${k % 2 ? 2 : 1}`, 0.6)); }
// round in his hands till it's upside down, a long look, still nothing, and back the right way up
function readTurnOver(s, kind) {
  s.push(ib(`rf_${kind}_turn_1`, 0.14, () => sfx.rustle(0.3)), ib(`rf_${kind}_turn_2`, 0.14), ib(`rf_${kind}_up_1`, 0.9),
    ib(`rf_${kind}_up_2`, 1.3, b => { b.huh = 1; }), ib(`rf_${kind}_up_1`, 0.35, b => { b.huh = 0; }),
    ib(`rf_${kind}_turn_2`, 0.14, () => sfx.rustle(0.3)), ib(`rf_${kind}_turn_1`, 0.14), ib(`rf_${kind}_1`, 0.5));
}
// putting it back in his backpack and getting up
const readStandUp = kind => [ib('rf_reach', 0.3, () => sfx.rustle(0.3)), ib('rf_sit', 0.3), ib('rf_squat', 0.13)];
const BACK_COPY = new Set(['look_up', 'look_down', 'reach', 'shake_1', 'shake_2', 'rise', 'top', 'fall', 'land']);
const IDLE_BITS = {
  // yawns and stretches, dozes off standing up (head drooping lower and lower), then jolts awake, shakes his head
  // and looks round to check nobody saw
  nod: {
    ok: () => true,
    steps: () => {
      const s = [ib('yawn', 1.4, () => sfx.yawn()), ib('idle', 0.7), ib('look_down', 0.5), ib('doze_1', 1.0, b => { b.zzz = true; })];
      for (let k = 0; k < 3; k++) s.push(ib('doze_2', 1.1, () => sfx.snore(false)), ib('doze_1', 1.0, () => sfx.snore(true)));   // breathing slow, his head bobbing
      s.push(ib('doze_2', 1.6, () => sfx.snore(false)), ib('jolt', 0.5, b => { b.zzz = false; sfx.bump(); puff(P.x, P.y - 2, 3, 12); }), ib('idle', 0.25),
        ib('shake_1', 0.13), ib('shake_2', 0.13), ib('shake_1', 0.13), ib('shake_2', 0.13),
        ib('idle', 0.6, null, { flip: true }), ib('idle', 0.6, null, { flip: true }), ib('idle', 0.5));
      return s;
    },
  },
  // looks himself over and pats the dust off his tummy, then bends to brush off his legs.
  // The worse off he is, the dirtier the puffs
  dust: {
    ok: () => true,
    steps: () => {
      const pat = (lo) => b => { const c = dustCol(); puff(P.x + P.facing * (lo ? 9 : 7), P.y - (lo ? 6 : 16), 4, 14, c, 22); sfx.bump(); };
      const s = [ib('look_down', 0.6)];
      for (let k = 0; k < 4; k++) s.push(ib('pat_1', 0.2), ib('pat_2', 0.2, pat()));
      s.push(ib('idle', 0.4), ib('look_down', 0.3));
      for (let k = 0; k < 4; k++) s.push(ib('pat_3', 0.22, pat(true)), ib('look_down', 0.14));
      s.push(ib('idle', 0.4), ib('look_up', 0.5), ib('idle', 0.6));
      return s;
    },
  },
  // something flutters round his head (a moth, a butterfly, a dragonfly or a ladybug, never the same one twice in a
  // row), his eyes follow it, it lands on his nose (cross-eyed) and he swats at it. It hops off but hangs about over
  // his head, so he jumps up trying to play with it, then it flies off and he waves goodbye. One bit, so the
  // visitors don't come round more often than the other bits
  moth: {
    ok: () => true,
    steps: () => [
      ib('idle', 0.7, b => { b.moth = { t: 0, kind: pickCritter(), look: Math.floor(Math.random() * 3) }; }), ib('look_up', 1.2), ib('idle', 0.9), ib('look_up', 0.9), ib('idle', 0.7), ib('look_up', 0.6), ib('idle', 0.4),
      ib('crosseyed', 2.0, b => { b.moth.land = b.t; }), ib('swat_1', 0.16), ib('swat_2', 0.4, b => { b.moth.hover = b.t; sfx.bump(); }),
      // it doesn't go: it bobs about over his head, and he jumps up trying to play with it, three goes
      ib('look_up', 0.7), ib('idle', 0.2), ib('look_up', 0.4),
      ...[0, 1, 2].flatMap(k => [ib('land', 0.14), ib('grab', 0.34, () => sfx.jump(), { hop: [0, 1, 15 + k * 3] }), ib('land', 0.16, () => sfx.bump()), ib('look_up', k === 2 ? 0.5 : 0.35)]),
      // then off it goes, and he waves it goodbye
      ib('look_up', 0.9, b => { b.moth.off = b.t; }), ...[0, 1, 2, 3].flatMap(() => [ib('wave_1', 0.2), ib('wave_2', 0.2)]), ib('idle', 0.7),
    ],
  },
  // flips the coin of wherever he is (acorn, pebble, marble, feather) up with his hand and catches it, higher each
  // time, till one comes down on his head. He's dazed for a bit (longer), shakes it off, picks it back up
  toss: {
    ok: () => sheetKind === 'gear',
    steps: () => {
      const SH_UP = [7, -28], SH_DN = [7, -22], HEAD = [4, -43], GROUND = [26, -2];   // on his hand, flicked up, caught, on his head, on the ground
      const fly = (from, to, h) => ({ coin: { from, to, h } });
      const s = [ib('catch', 0.6, b => { b.coinKind = coinHere(); b.coinAt = SH_DN; sfx.pickup(); })];
      for (const [h, d] of [[26, 0.45], [38, 0.52], [50, 0.6], [62, 0.66]]) s.push(ib('toss', 0.1, () => sfx.tick(), fly(SH_DN, SH_UP, 0)), ib('catch', d, null, fly(SH_UP, SH_DN, h)), ib('catch', 0.12));
      s.push(ib('toss', 0.12, () => sfx.tick(), fly(SH_DN, SH_UP, 0)), ib('look_up', 0.95, null, fly(SH_UP, HEAD, 90)),
        ib('bonk', 0.7, b => { b.stars = 4.2; sfx.bump(); sfx.tok(); }, fly(HEAD, GROUND, 14)));
      for (let k = 0; k < 3; k++) s.push(ib('dazed_1', 0.38), ib('dazed_2', 0.26), ib('dazed_3', 0.38), ib('dazed_2', 0.26));   // wobbling, seeing stars
      s.push(ib('shake_1', 0.13), ib('shake_2', 0.13), ib('shake_1', 0.13), ib('shake_2', 0.13), ib('idle', 0.4), ib('look_down', 0.5), ib('reach', 0.4),
        ib('idle', 0.6, b => { b.coinAt = null; sfx.pickup(); }));
      return s;
    },
  },
  // sits down and draws on his paper for a while, then puts it all away and gets back up
  sit: {
    held: true,                    // the sitting pictures lay his sword and shield down beside him
    ok: () => world.has.paper && world.has.crayons,
    steps: () => {
      const cols = ['#e2604a', ...Object.keys(IDLE_CRAYONS).filter(k => world.has[k]).map(k => IDLE_CRAYONS[k])];
      const col = cols[Math.floor(Math.random() * cols.length)];
      const draw = []; const n = Math.round(rndIn(64, 88));
      for (let i = 0; i < n; i++) {
        draw.push(ib('draw_' + ((i % 8) + 1), 0.125));
        if (i === 32) draw.push(ib('sit_look', 1.2));                    // stops to look at it, then carries on
      }
      return [ib('turn', 0.12), ib('sit_1', 0.13, () => sfx.bump()), ib('sit_2', 0.12), ib('sit_3', 0.4),
        ib('paper_1', 0.28), ib('paper_1b', 0.2, () => sfx.pickup()), ib('paper_2', 0.35), ib('paper_3', 0.55), ib('paper_4', 0.12, () => { P.paper = { marks: {} }; }),
        ib('paper_4', 0.3), ib('paper_1', 0.25, () => { P.crayon = col; }), ...draw, ib('sit_look', 1.0), ib('sit_3', 0.5),
        ib('paper_1', 0.2, () => { P.crayon = null; }), ib('paper_4', 0.25), ib('paper_3', 0.3, () => { P.paper = null; }), ib('paper_2', 0.25), ib('paper_1b', 0.15), ib('paper_1', 0.18),
        ib('sit_3', 0.3), ib('sit_1', 0.13), ib('turn', 0.12)];
    },
  },
  // squeezes his own tummy and squeaks, looks surprised, does it again and giggles (once he's learned the squeak)
  squeak: {
    ok: () => can('squeak') && !critical(),
    steps: () => {
      const sq = b => { sfx.squeak(); b.ring = 0; };
      const gig = n => { const g = []; for (let i = 0; i < n; i++) g.push(ib('giggle_1', 0.13), ib('giggle_2', 0.13)); return g; };
      return [ib('look_down', 0.5), ib('squeeze', 0.3, sq), ib('surprised', 0.9), ib('look_down', 0.5), ib('idle', 0.3), ib('squeeze', 0.25, sq), ...gig(3),
        ib('idle', 0.3), ib('squeeze', 0.18, sq), ib('idle', 0.12), ib('squeeze', 0.18, sq), ...gig(5), ib('idle', 0.6)];
    },
  },
  // scratches a little picture in the dirt with the tip of his sword, steps back and admires it, rubs it out with his foot
  scratch: {
    held: true,                    // the sword stays in his hand for this one (it's what he draws with), the shield goes on his back
    ok: () => sheetKind === 'gear' && doodleGround() !== null,
    steps: () => {
      const s = [ib('scratch_1', 0.35, b => {
        const pic = DOODLES[Math.floor(Math.random() * DOODLES.length)].map(r => P.facing < 0 ? [...r].reverse().join('') : r);
        const w = pic[0].length, h = pic.length, cx = (w - 1) / 2, cy = (h - 1) / 2, pts = [];
        pic.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === '#') pts.push([x, y]); }));
        pts.sort((a, b2) => Math.atan2(a[1] - cy, a[0] - cx) - Math.atan2(b2[1] - cy, b2[0] - cx));
        b.doodle = { pts, n: 0, a: 1, x: Math.round(P.x + P.facing * 19 - w / 2), y: doodleGround() + 2 };
      })];
      for (let i = 0; i < 26; i++) s.push(ib(i % 2 ? 'scratch_2' : 'scratch_1', 0.14, b => { b.doodle.n = Math.ceil(b.doodle.pts.length * (i + 1) / 26); if (i % 3 === 0) sfx.step(room.def.floor); }));
      s.push(ib('admire', 2.2));
      for (let i = 0; i < 6; i++) s.push(ib(i % 2 ? 'footrub_2' : 'footrub_1', 0.15, b => { b.doodle.a = 1 - (i + 1) / 6; if (i % 2) puff(b.doodle.x + 4, b.doodle.y - 3, 2, 10, dustCol(), 14); }));
      s.push(ib('admire', 0.4, b => { b.doodle = null; }));
      return s;
    },
  },
  // bounces on his toes swaying side to side, arms out, then a happy little hop (the cape swishes along)
  dance: {
    ok: () => !critical(),
    steps: () => {
      const s = [], hop = () => s.push(ib('rise', 0.14, null, { hop: [0, 0.5] }), ib('top', 0.12, null, { hop: [0.5, 0.75] }), ib('fall', 0.1, null, { hop: [0.75, 1] }),
        ib('land', 0.2, () => { sfx.bump(); puff(P.x, P.y - 1, 3, 12); }));
      const sway = n => { for (let k = 0; k < n; k++) s.push(ib('dance_1', 0.22, b => { b.notes = true; }), ib('dance_2', 0.18), ib('dance_3', 0.22), ib('dance_4', 0.18)); };
      sway(3); hop(); sway(2); hop(); s.push(ib('idle', 0.6, b => { b.notes = false; }));
      return s;
    },
  },
  // sits down facing us, gets his map out and looks at it. Can't make it out, squints, turns it round till it's
  // upside down (no better), turns it back. Then it goes on the floor and he gets on his knees over it, side on,
  // tracing a way round it with his finger, stopping to think, tracing some more, and a little nod like he's got it
  // now before he puts it away (10/15/2026)
  map: {
    ok: () => !!world.has.crayon_black,
    steps: () => {
      const s = [...readSitDown('map')];
      readHold(s, 'map', 2.2);
      s.push(ib('rf_map_puzzled', 1.3, b => { b.huh = 1; }), ib('rf_map_1', 0.35, b => { b.huh = 0; }));
      readTurnOver(s, 'map');
      s.push(ib('rf_map_lay', 0.45, () => sfx.rustle(0.4)), ib('rf_map_lay', 0.25), ib('mp_kneel', 0.55, () => sfx.bump()));
      const trace = n => { for (let k = 0; k < n; k++) for (let i = 1; i <= 4; i++) s.push(ib('mp_trace_' + i, rndIn(0.2, 0.28), i === 1 && k % 2 === 0 ? () => sfx.rustle(0.15) : null)); };
      trace(4);
      s.push(ib('mp_kneel', 0.4), ib('mp_think', 1.6, b => { b.huh = 1; }), ib('mp_kneel', 0.35, b => { b.huh = 0; }));
      trace(5);
      s.push(ib('mp_kneel', 0.35), ib('mp_nod_1', 0.18), ib('mp_nod_2', 0.22), ib('mp_nod_1', 0.18), ib('mp_nod_2', 0.5),
        ib('mp_pickup', 0.35, () => sfx.rustle(0.4)), ib('rd_up', 0.25), ib('idle', 0.4));
      return s;
    },
  },
  // sits down facing us, gets his picture book out, looks at the cover, turns it upside down, no better. He can't
  // read, he just likes the pictures: open in his lap he turns the pages, throws his hands up happy at one, turns
  // some more (10/15/2026)
  book: {
    ok: () => !!world.has.backpack,
    steps: () => {
      const s = [...readSitDown('book')];
      readHold(s, 'book', 1.8);
      s.push(ib('rf_book_puzzled', 1.2, b => { b.huh = 1; }), ib('rf_book_1', 0.35, b => { b.huh = 0; }));
      readTurnOver(s, 'book');
      s.push(ib('rf_lap_closed', 0.4, () => sfx.bump()), ib('rf_lap_1', 0.5, () => sfx.rustle(0.3)));
      const look = d => { for (let t = 0, k = 0; t < d; t += 0.7, k++) s.push(ib(k % 2 ? 'rf_lap_2' : 'rf_lap_1', 0.7)); };
      const flip = () => s.push(ib('rf_flip_1', 0.13), ib('rf_flip_2', 0.13, () => sfx.rustle(0.25)), ib('rf_flip_3', 0.13), ib('rf_lap_1', 0.2));
      const happy = () => { for (let k = 0; k < 4; k++) s.push(ib(k % 2 ? 'rf_happy_2' : 'rf_happy_1', 0.18, k === 0 ? () => sfx.pickup() : null)); s.push(ib('rf_lap_1', 0.3)); };
      look(1.4); flip(); look(1.6); flip(); look(1.0); happy(); look(1.2); flip(); look(1.4); flip(); look(0.8); happy(); look(1.0);
      s.push(ib('rf_lap_closed', 0.5, () => sfx.bump()), ...readStandUp('book'));
      return s;
    },
  },
  // after 3 minutes of nothing: very tired, he yawns, nods, sits down and lies back, and sleeps for 30 seconds (the
  // same lying down and waking up as in the nest at the start). Never picked at random, only by the 3 minute timer
  sleep: {
    timed: true,
    ok: () => true,
    steps: () => {
      const s = [ib('yawn', 1.4, () => sfx.yawn()), ib('doze_1', 0.9), ib('doze_2', 0.7), ib('jolt', 0.25), ib('idle', 0.3), ib('yawn', 1.2),
        ib('turn', 0.15), ib('sit_1', 0.13, () => sfx.bump()), ib('sit_2', 0.12), ib('sit_3', 0.6), ib('stretch', 0.6), ib('stretch_down', 0.2),
        ib('wake_up', 0.25), ib('wake_lift', 0.2), ib('lie_bleary', 0.4), ib('lie_bleary_2', 0.4), ib('lie_open', 0.3), ib('lie_bleary', 0.3),   // (curled up now, still breathing while he's awake)
        ib('lie_bleary_2', 0.3, b => { b.zzz = true; b.zAt = [-17, -24]; b.zAbs = true; b.zEvery = 1.1; })];
      for (let t = 0, k = 0; t < IDLE_NAP; t += 1.3, k++) s.push(ib(k % 2 ? 'lie_1' : 'lie_2', 1.3, () => sfx.snore(k % 2 === 1)));   // breathing slow, a soft snore in and out
      s.push(ib('lie_open', 0.15, b => { b.zzz = false; }), ib('lie_1', 0.1), ib('lie_open', 0.2), ib('lie_bleary', 0.3), ib('wake_lift', 0.2), ib('wake_up', 0.3), ib('sit_3', 0.2),
        ib('stretch', 0.6), ib('stretch_down', 0.2), ib('rub_1', 0.1), ib('rub_2', 0.1), ib('rub_1', 0.1), ib('rub_2', 0.1), ib('sit_3', 0.15), ib('sit_1', 0.12),
        ib('turn', 0.1, b => { b.slept = true; }));
      return s;
    },
  },
};

function dustCol() {
  const k = 1 - P.health / Math.max(1, P.maxHealth);
  return k > 0.6 ? '#9a8068' : k > 0.3 ? '#bcae98' : '#e9e4da';
}
// the ground right in front of him (where a doodle would go), if it's solid dirt all the way across
function doodleGround() {
  if (!P.ground) return null;
  const gy = Math.floor((P.y + 1) / T);
  const x0 = Math.floor((P.x + P.facing * 19 - 6) / T), x1 = Math.floor((P.x + P.facing * 19 + 6) / T);
  for (let x = x0; x <= x1; x++) if (tile(x, gy) !== 1 || tile(x, gy - 1) !== 0) return null;
  return gy * T;
}
function idleCalm() {
  if (!room || !P.ground || P.swim || P.story || cutscene || scene || talk || mapView || trans.state !== 'none') return false;
  if (P.atk || P.roll > 0 || P.hurtT > 0 || P.ko > 0 || P.splat > 0 || P.hang || P.cling || P.crawl || P.charge > 0 || P.held || P.respawnT > 0 || P.gbreak > 0) return false;
  if (Math.abs(P.vx) > 5 || P.winded || P.soggyT > 0) return false;
  if (typeof boss !== 'undefined' && boss && !world.flags[boss.def.flag]) return false;
  if (foes.some(f => f.state !== 'down' && Math.abs(f.x - P.x) < 260 && Math.abs(f.y - P.y) < 160)) return false;
  return true;
}
const anyInput = () => inp.any || inp.left || inp.right || inp.up || inp.down || inp.jumpH || inp.guardH || inp.atkH || inp.aim || inp.jumpP || inp.atkP || inp.dodgeP || inp.squeakP || inp.mapP || inp.upP || inp.downP;

function stopIdleBit() {
  const b = P.idleBit; if (!b) return;
  if (b.paper) { P.paper = null; P.crayon = null; }
  P.facing = b.facing0;
  P.idleBit = null;
}
function startIdleBit(name) {
  stopIdleBit();
  const d = IDLE_BITS[name], steps = d.steps();
  const strap = () => { sfx.bump(); };
  // straps his sword and shield on his back first (unless they're already there), and leaves them there after: nothing's
  // around, so they stay put away till he swings or raises the shield (10/20/2026). The sword doodle needs the sword out
  if (!d.held && !P.sheathed) steps.unshift(ib('b_stow', 0.22, strap));
  if (world.has.gear) P.sheathed = !d.held;
  const b = { name, steps, back: !d.held, i: -1, st: 0, t: 0, room, facing0: P.facing, dy: 0, paper: name === 'sit', zt: 0, nt: 0 };
  P.idleBit = b; idleState.last = name;
  nextIdleStep(b);
}
function nextIdleStep(b) {
  b.i++; b.st = 0;
  const s = b.steps[b.i];
  if (!s) { if (b.slept) idleState.long = 0; stopIdleBit(); return; }
  if (s.flip) P.facing = -P.facing;
  if (s.coin) { b.coinFly = s.coin; }
  if (s.go) s.go(b);
}
function updateIdle(dt) {
  const b = P.idleBit;
  if (anyInput()) { idleState.still = 0; idleState.long = 0; idleState.wait = IDLE_WAIT[0]; if (b) stopIdleBit(); return; }
  if (b && (b.room !== room || !idleCalm())) { stopIdleBit(); idleState.still = 0; idleState.long = 0; return; }
  if (!b || b.name !== 'sleep') idleState.long += dt;
  if (!b) {
    if (!idleCalm()) { idleState.still = 0; idleState.long = 0; return; }
    if (idleState.long >= IDLE_SLEEP) { startIdleBit('sleep'); idleState.still = 0; idleState.wait = IDLE_WAIT[1]; return; }   // worn out: a nap
    idleState.still += dt;
    if (idleState.still < idleState.wait) return;
    const names = Object.keys(IDLE_BITS).filter(n => n !== idleState.last && !IDLE_BITS[n].timed && IDLE_BITS[n].ok());
    if (!names.length) return;
    startIdleBit(names[Math.floor(Math.random() * names.length)]);
    idleState.still = 0; idleState.wait = IDLE_WAIT[1];
    return;
  }
  b.t += dt; b.st += dt;
  const s = b.steps[b.i];
  // what goes along with it
  b.dy = s.hop ? -(s.hop[2] || 11) * Math.sin(Math.PI * ilerp(s.hop[0], s.hop[1], Math.min(1, b.st / s.d))) : 0;
  if (b.zzz && (b.zt -= dt) <= 0) { const at = b.zAt || [10, -40]; b.zt = b.zEvery || 0.7; (b.zs = b.zs || []).push({ x: P.x + (b.zAbs ? 1 : P.facing) * at[0], y: P.y + at[1], t: 0 }); }
  if (b.zs) for (const z of b.zs) { z.t += dt; z.x += P.facing * -6 * dt + Math.sin(z.t * 4) * 0.3; z.y -= 14 * dt; }
  if (b.zs) b.zs = b.zs.filter(z => z.t < 1.4);
  if (b.notes && (b.nt -= dt) <= 0) { b.nt = 0.45; (b.ns = b.ns || []).push({ x: P.x + (Math.random() * 2 - 1) * 10, y: P.y - 44, t: 0, w: Math.random() * 6 }); }
  if (b.ns) { for (const n of b.ns) { n.t += dt; n.y -= 16 * dt; n.x += Math.sin(n.t * 5 + n.w) * 0.4; } b.ns = b.ns.filter(n => n.t < 1.2); }
  if (b.ring != null) { b.ring += dt; if (b.ring > 0.4) b.ring = null; }
  if (b.stars > 0) b.stars -= dt;
  if (b.moth) b.moth.t += dt;
  if (b.coinFly && b.coinKind) {
    const k = Math.min(1, b.st / s.d), c = b.coinFly;
    b.coinAt = [ilerp(c.from[0], c.to[0], k), ilerp(c.from[1], c.to[1], k) - 4 * c.h * k * (1 - k)];
    if (k >= 1) b.coinFly = null;
  }
  if (b.st >= s.d) nextIdleStep(b);
}
// the frame for right now, or null to leave him to his normal breathing
function idleFrame(f) {
  const b = P.idleBit; if (!b) return null;
  const s = b.steps[b.i]; if (!s) return null;
  if (s.f === 'idle') {
    if (!b.back) return null;                                            // his normal breathing
    const cyc = [0.45, 0.25, 0.45, 0.25]; let tt = P.idleT % 1.4, i = 0;  // the same breathing with the gear on his back
    while (tt > cyc[i]) { tt -= cyc[i]; i++; }
    return `b_idle_${i + 1}_${f}`;
  }
  if (s.f === 'turn') return 'turn';
  return (b.back && BACK_COPY.has(s.f) ? 'b_' : '') + s.f + '_' + f;
}

const CRITTERS = ['moth', 'butterfly', 'dragonfly', 'ladybug'];
let lastCritter = null;
function pickCritter() { const c = CRITTERS.filter(k => k !== lastCritter); lastCritter = c[Math.floor(Math.random() * c.length)]; return lastCritter; }
const BUTTERFLY = [['#f0a040', '#f7d08a'], ['#7ab0f0', '#c4dcf8'], ['#f4e070', '#faf2b8']];   // orange, blue, yellow (wing, the light spots)
// the visitor: flutters round his head, lands on his nose, and flits off when he swats at it. A butterfly floats
// slower and wider, a dragonfly darts from spot to spot and hangs still in between, a ladybug buzzes in tight
function mothAt(m) {
  const fx = P.facing, t = m.t;
  const orbit = (tt = t) => {
    if (m.kind === 'butterfly') { const r = 16 + Math.sin(tt * 0.9) * 4; return [P.x + fx * 4 + Math.cos(tt * 1.7) * r, P.y - 46 + Math.sin(tt * 1.3) * r * 0.5 + Math.sin(tt * 5) * 2.5]; }
    if (m.kind === 'ladybug') { const r = 10 + Math.sin(tt * 1.6) * 2; return [P.x + fx * 4 + Math.cos(tt * 3.4) * r + Math.sin(tt * 17) * 1, P.y - 42 + Math.sin(tt * 2.5) * r * 0.5]; }
    const r = 13 + Math.sin(tt * 1.3) * 3;
    return [P.x + fx * 4 + Math.cos(tt * 2.6) * r + Math.sin(tt * 11) * 1.5, P.y - 44 + Math.sin(tt * 1.9) * r * 0.55 + Math.cos(tt * 13) * 1.5];
  };
  if (m.kind === 'dragonfly' && m.land == null && t >= 0.5) {   // darts: a quick zip to the next spot, then hovers
    const hop = 0.55, t0 = Math.floor(t / hop) * hop, k = Math.min(1, (t - t0) / 0.12);
    const a = orbit(t0), c = orbit(t0 + hop);
    return [ilerp(a[0], c[0], k), ilerp(a[1], c[1], k) + Math.sin(t * 20) * 0.5];
  }
  const nose = [P.x + fx * 3, P.y - 31.5];
  // hanging about over his head while he jumps for it: it bobs, and rises out of reach as he comes up
  const above = tt => { const dy = P.idleBit ? P.idleBit.dy : 0; return [P.x + fx * (8 + Math.sin(tt * 1.6) * 6), P.y - 60 + Math.sin(tt * 3.1) * 3 + dy * 0.5 + (m.kind === 'dragonfly' ? Math.sin(tt * 20) * 0.5 : Math.sin(tt * 9) * 1)]; };
  if (t < 0.5) { const o = orbit(), k = t / 0.5; return [ilerp(P.x + fx * 80, o[0], k), ilerp(P.y - 80, o[1], k)]; }
  if (m.off != null) { const k = t - m.off, o = above(m.off); return [o[0] + fx * (34 * k) + Math.sin(k * 9) * 4, o[1] - 30 * k - 14 * k * k]; }   // off and away, up and over
  if (m.hover != null) { const k = Math.min(1, (t - m.hover) / 0.4), o = above(t); return [ilerp(nose[0], o[0], k), ilerp(nose[1], o[1], k)]; }
  if (m.land != null) { const k = Math.min(1, (t - m.land) / 0.3); const o = orbit(); return [ilerp(o[0], nose[0], k), ilerp(o[1], nose[1], k)]; }
  return orbit();
}
// the visitor itself, a few pixels
function drawCritter(m, px) {
  const [x, y] = mothAt(m), a = m.off != null ? Math.max(0, 1 - (m.t - m.off) / 2.2) : 1, sat = m.land != null && m.hover == null;
  const dir = m.off != null ? P.facing : Math.sign(mothAt({ ...m, t: m.t + 0.05 })[0] - x) || P.facing;   // which way it's going
  if (m.kind === 'butterfly') {
    const [w, l] = BUTTERFLY[m.look % BUTTERFLY.length], open = sat ? Math.floor(m.t * 1.4) % 2 === 0 : Math.floor(m.t * 7) % 2 === 0;
    px(x, y - 1, '#3a2a1e', a); px(x, y, '#3a2a1e', a); px(x, y + 1, '#3a2a1e', a);
    if (open) for (const sd of [-1, 1]) {   // spread: a big upper wing and a smaller lower one each side
      px(x + sd, y - 2, w, a); px(x + sd * 2, y - 2, w, a); px(x + sd, y - 1, l, a); px(x + sd * 2, y - 1, w, a); px(x + sd * 3, y - 1, w, a);
      px(x + sd, y + 1, w, a); px(x + sd * 2, y + 1, w, a);
    } else { px(x - 1, y - 3, w, a); px(x, y - 3, w, a); px(x - 1, y - 2, l, a); px(x, y - 2, w, a); }   // folded up over its back
    return;
  }
  if (m.kind === 'dragonfly') {
    const d = sat ? P.facing : dir, blur = Math.floor(m.t * 30) % 2;
    for (let i = 0; i < 5; i++) px(x - d * i, y, i === 0 ? '#1e4a44' : '#3ab0a0', a);   // long thin body, head first
    px(x - d * 5, y, '#2a8a80', a);
    for (const wx of [1, 2]) { px(x - d * wx, y - 1 - blur, '#e4f4f8', 0.55 * a); px(x - d * (wx + 1), y - 1 - (1 - blur), '#e4f4f8', 0.4 * a); }   // see-through wings, a blur
    return;
  }
  if (m.kind === 'ladybug') {
    px(x, y, '#d83a2a', a); px(x + 1, y, '#d83a2a', a); px(x, y + 1, '#d83a2a', a); px(x + 1, y + 1, '#1a1214', a);
    px(x + (dir > 0 ? 2 : -1), y + 1, '#1a1214', a);                     // its head
    if (!sat) { const f = Math.floor(m.t * 24) % 2; px(x - 1 + f, y - 1, '#e8eef6', 0.6 * a); px(x + 2 - f, y - 1, '#e8eef6', 0.6 * a); }   // buzzing wings
    return;
  }
  const up = sat ? Math.floor(m.t * 3) % 3 === 0 : Math.floor(m.t * 16) % 2 === 0;   // the moth
  px(x, y, '#6e5e4c', a); px(x, y + 1, '#6e5e4c', a);
  for (const sd of [-1, 1]) {
    if (up) { px(x + sd, y - 1, '#efe4cc', a); px(x + sd * 2, y - 1, '#efe4cc', a); px(x + sd, y, '#d8ccb0', a); }
    else { px(x + sd, y, '#efe4cc', a); px(x + sd * 2, y + 1, '#efe4cc', a); px(x + sd, y + 1, '#d8ccb0', a); }
  }
}
const idlePx = q => (x, y, c, a = 1) => { ctx.globalAlpha = a; ctx.fillStyle = c; ctx.fillRect(q(x), q(y), 1, 1); };
// the doodle goes on the ground under him (his feet go over it)
function drawIdleGround(q) {
  const b = P.idleBit; if (!b || !b.doodle) return;
  const px = idlePx(q), d = b.doodle;
  for (let i = 0; i < Math.min(d.n, d.pts.length); i++) {
    const [x, y] = d.pts[i];
    px(d.x + x, d.y + y + 1, '#120a06', 0.4 * d.a);      // scratched in: the fresh dirt shows lighter, with a little shadow under it
    px(d.x + x, d.y + y, '#d8c4a0', 0.6 * d.a);
  }
  ctx.globalAlpha = 1;
}
// everything else goes over him
function drawIdleBits(q) {
  const b = P.idleBit; if (!b) return;
  const px = idlePx(q);
  if (b.coinKind && b.coinAt) spr(COIN_SPR[b.coinKind] || 'acorn_small', P.x + P.facing * b.coinAt[0], P.y + b.dy + b.coinAt[1] + 3, false);
  if (b.moth) drawCritter(b.moth, px);
  if (b.zs) for (const z of b.zs) {      // little z's floating up off him
    const a = Math.min(1, (1.4 - z.t) / 0.5) * 0.85;
    const zz = [[0, 0], [1, 0], [2, 0], [3, 0], [2, 1], [1, 2], [0, 3], [1, 3], [2, 3], [3, 3]];
    for (const [x, y] of zz) px(z.x + x, z.y + y, '#e8eef6', a);
  }
  if (b.ns) for (const n of b.ns) {      // music notes while he dances
    const a = Math.min(1, (1.2 - n.t) / 0.4) * 0.9;
    for (const [x, y] of [[2, 0], [3, 0], [2, 1], [2, 2], [2, 3], [0, 3], [1, 3], [0, 4], [1, 4]]) px(n.x + x, n.y + y, '#ffe7a0', a);
  }
  if (b.ring != null) {                  // the squeak, a little ring off his tummy
    const r = 5 + b.ring * 40, a = Math.max(0, 1 - b.ring / 0.4) * 0.7;
    for (let i = 0; i < 18; i++) { const an = i / 18 * Math.PI * 2; px(P.x + Math.cos(an) * r, P.y - 15 + Math.sin(an) * r * 0.8, '#ffffff', a); }
  }
  if (b.huh) {                           // a little ? over his head while he can't make it out
    const sat = /^(rf_|mp_)/.test(b.steps[b.i] && b.steps[b.i].f || ''), y0 = P.y + (sat ? -46 : -54) + Math.round(Math.sin(b.t * 3) * 1.2), x0 = P.x - 2;
    const Q = ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'];
    Q.forEach((r, y) => [...r].forEach((c, x) => { if (c === '#') { px(x0 + x + 1, y0 + y + 1, '#2a2030', 0.6); px(x0 + x, y0 + y, '#fff4d8', 0.95); } }));
  }
  if (b.stars > 0) for (let i = 0; i < 3; i++) {   // seeing stars after the bonk
    const an = b.t * 8 + i * 2.1; ctx.globalAlpha = Math.min(1, b.stars * 2); ctx.fillStyle = '#ffd36b';
    ctx.fillRect(q(P.x + P.facing * 3 + Math.cos(an) * 9) - 1, q(P.y - 45 + Math.sin(an) * 2.5), 2, 2);
  }
  ctx.globalAlpha = 1;
}
