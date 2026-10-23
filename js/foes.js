'use strict';
// ---------- the Grime's litter: bottle caps and soda cans it brought to life ----------
// Knocking one out only knocks it out: the Grime's still in it, so it's back the next time Phill comes into the room.
// They drop acorns (Rootwood's currency). Their hits can be blocked or parried; a parried spit flies back at them.
const foes = [], shots = [], drops = [];
const FOE = {
  cap: { hp: 4, hw: 10, h: 17, speed: 34, acorns: [1, 2], walker: true, ownAir: true, harmless: f => f.state === 'wobble' || f.state === 'pounce' || f.state === 'coin' },   // (the pounce and the roll are their own hits, so the shield can take them)   // sized to the cap after its art pass
  can: { hp: 5, hw: 7, h: 26, speed: 0, acorns: [2, 3], harmless: f => f.state === 'roll' || f.state === 'lie',
    box: f => (f.state === 'roll' || f.state === 'lie' ? { l: f.x - 10, r: f.x + 10, t: f.y - 20 + f.yoff, b: f.y + f.yoff } : { l: f.x - 7, r: f.x + 7, t: f.y - 26 + f.yoff, b: f.y + f.yoff }) },
};
const DMG = { side: 1, up: 1, low: 1, down: 1, rollslash: 2, charged: 3, chargedchop: 3, chargedwhirl: 3 };
// how many attacks an enemy has (10/16/2026): at least 3 in Rootwood, and one more for every region its room
// is from Rootwood on the map. Each kind lists its attacks in order and a copy only uses the first f.moves of them.
// Rootwood's own enemies got two new attacks each, so a few start with more than 3 (baseMoves)
const REGION_DIST = { rootwood: 0, home: 0, pond: 1, playground: 1, oak: 1, warren: 1, greenhouse: 2, hive: 2 };
const regionDist = r => REGION_DIST[r] ?? 2;
// The start of the game (10/23/2026): Rootwood's first enemies only use the two attacks they're named for till the tin
// soldier's down, and the first halves of the Pond and the Playground keep Rootwood's count (their second halves get the
// extra one). A player meets one new trick at a time, and the rest come back as the story goes on
const STARTERS = new Set(['cap', 'can', 'spinner']);
const FIRST_HALF = new Set(['reedbank', 'shallows', 'dock', 'cattails', 'dragonfly', 'overlook', 'lilypads', 'sailboat',
  'gate', 'bins', 'puddle', 'tires', 'bikes', 'woodchips', 'sandbox', 'spinner', 'slide', 'lostfound', 'balloonwall']);
const firstHalf = () => !!(room && FIRST_HALF.has(room.def.id));
const earlyRootwood = () => !!(room && room.def.region === 'rootwood' && !world.flags.soldierDown);
const movesFor = kind => {
  if (earlyRootwood() && STARTERS.has(kind)) return 2;
  return (FOE[kind].baseMoves || 3) + (firstHalf() ? 0 : regionDist(room && room.def.region));
};
const hasMove = (f, n) => n <= (f.moves || 3);
// an attack it's started, it finishes (10/16/2026: every enemy went down to button mashing, because a hit
// knocked it out of its wind-up). Hits in these states still hurt and flash but don't stop it. A parry, a wound up
// swing or a roll swing still does. The number is how far into the state that starts: Rootwood's first three only hold
// on for the back half of their wind-up, so the first enemies he meets stay gentle
const COMMIT = {
  cap: { wind: 0.21, lunge: 0, snap2: 0, crouch: 0.17, pounce: 0, tip: 0.15, coin: 0 }, can: { aim: 0.31, spit: 0, shake: 0.2, fizz: 0, tip: 0.17, roll: 0 },
  spinner: { whirl: 0.25, drop: 0, sweepwind: 0.3, sweep: 0 },
  wrapper: { aim: 0, dive: 0, feint: 0, spin: 0, wrap: 0 }, gum: { stretch: 0, fall: 0, spitwind: 0, blow: 0, climb: 0 },
  juice: { squeeze: 0, squirt: 0, lobwind: 0, lob: 0, slurp: 0, burst: 0, leapwind: 0, leap: 0 },
  fork: { wind: 0, stab: 0, sweepwind: 0, sweep: 0, lungewind: 0, lunge: 0, vaultwind: 0, vault: 0, backwind: 0 },
  lace: { coil: 0, lash: 0, rear: 0, snap: 0, throwwind: 0, lasso: 0, pull: 0, whirlwind: 0, whirl: 0 }, rings: { hop: 0, snagwind: 0, snag: 0, reel: 0, throwwind: 0 },
  nwing: { fold: 0, dash: 0, turn: 0, shriek: 0, quillwind: 0 },
  duck: { wind: 0, charge: 0, turnwind: 0, puff: 0, squeak: 0, crouch: 0, leap: 0 }, bobber: { aim: 0, spit: 0, castwind: 0, cast: 0, reel: 0, pop: 0 },
  bag: { billow: 0, wrap: 0, gustup: 0, gust: 0, inflate: 0, blast: 0 }, frog: { crouch: 0, hop: 0, flopcrouch: 0, bigcrouch: 0, quake: 0 },
  sponge: { squish: 0, spring: 0, wring: 0, tumblewind: 0, tumble: 0, poundcrouch: 0, splash: 0 }, straw: { coil: 0, lunge: 0, spitwind: 0, archwind: 0, arch: 0, blowwind: 0, blow: 0 },
  fishtoy: { aim: 0, lunge: 0, reaim: 0, mineaim: 0, spinaim: 0, corkscrew: 0 }, glove: { grabwind: 0, grab: 0, hold: 0, slapwind: 0, slap: 0, inkwind: 0 },
  pike: { aim: 0, dart: 0, shardwind: 0, splitwind: 0 }, leech: { lunge: 0, spitwind: 0, bandwind: 0, band: 0, snare: 0, blowwind: 0, bubbled: 0 }, teeth: { wind: 0, chomp: 0, skitwind: 0, skitter: 0, bite: 0 },
  jack: { peek: 0, pop: 0, springpeek: 0, spring: 0, reel: 0, hopwind: 0, hop: 0, burstpeek: 0, burst: 0 },
  bucket: { tip: 0, dump: 0, raise: 0, slam: 0, pile: 0, shove: 0, flipwind: 0, flip: 0, trap: 0 },
  rope: { coil: 0, whip: 0, skipwind: 0, skip: 0, lassowind: 0, lasso: 0, reel: 0 },
  balloon: { swell: 0, dropaim: 0, stringwind: 0, string: 0, splitwind: 0 }, horn: { aim: 0, blow: 0, aim3: 0, pokewind: 0, poke: 0, conewind: 0, cone: 0 }, plane: { loop: 0, swoop: 0, foldwind: 0, throw: 0, climb: 0, nose: 0 }, ball: { slam: 0, quake: 0, spit: 0, spin: 0, roll: 0 },
  shuttle: { drop: 0, bounce: 0, shake: 0, spinwind: 0, spiral: 0 },
};
const committed = f => { const c = COMMIT[f.kind]; return !!c && c[f.state] !== undefined && f.t >= c[f.state]; };
const SPR = 'art/rootwood/rootwood_sprites.png';

// how far it can walk either way along the ground it's standing on (stops at walls and edges)
function patrol(x, y) {
  const row = Math.round(y / T), col = Math.floor(x / T);
  if (tile(col, row - 1) === 4) return wetPatrol(col, row);
  let l = col, r = col;
  while (l > 0 && isFloor(l - 1, row) && tile(l - 1, row - 1) !== 1) l--;
  while (r < room.W - 1 && isFloor(r + 1, row) && tile(r + 1, row - 1) !== 1) r++;
  // never right up against a doorway. Only where there is one on that side, though: the grime pool's juice box was
  // being pushed four tiles in from the wall, right out of its foamed pocket and into the room (10/15/2026)
  const doorAt = e => room.def.doors.some(d => d.edge === e && y >= d.a - T && y <= d.b + 3 * T);
  let a = Math.max(l * T + 10, doorAt('left') ? 4 * T : T + 10), b = Math.min((r + 1) * T - 10, room.pxW - (doorAt('right') ? 4 * T : T + 10));
  // and not where the ground curves up into a step at the end: the moss bank's can hopped back onto the step's rounded
  // foot and sat half sunk in it, since its tiles read as open floor (10/16/2026)
  const sunk = x => boxSolid(x - 3, y - 12, x + 3, y - 3);                       // (down to 3 off the ground: a bottle cap poked into the foot of the litter path's rounded steps, now that they keep walking, the stuck sweep 10/17/2026)
  while (b > a && sunk(b)) b -= 2;
  while (a < b && sunk(a)) a += 2;
  return [a, b];
}
// on the bottom underwater the tiles over the ground are water, not open air, so the walk above found nothing and
// anything down there just turned round on the spot (the straw was stuck wriggling in place). Down there
// it follows the mud along, up and down steps a tile high
const wetFloor = (c, row) => (tile(c, row) === 1 || tile(c, row) === 2) && tile(c, row - 1) === 4 && tile(c, row - 2) !== 1;
function wetGround(c, row) { for (const g of [row, row - 1, row + 1]) if (c >= 0 && c < room.W && wetFloor(c, g)) return g; return null; }
function wetPatrol(col, row) {
  let l = col, lr = row, r = col, rr = row, g;
  while (l > 0 && (g = wetGround(l - 1, lr)) !== null) { l--; lr = g; }
  while (r < room.W - 1 && (g = wetGround(r + 1, rr)) !== null) { r++; rr = g; }
  return [Math.max(l * T + 10, 4 * T), Math.min((r + 1) * T - 10, room.pxW - 4 * T)];
}
function followBottom(f, dt) {                                                    // keeps something on the bottom on the mud as it goes along
  const c = Math.floor(f.x / T), here = Math.round(f.y / T);
  let g = null;
  for (const d of [0, -1, 1, -2, 2]) if (wetFloor(c, here + d)) { g = here + d; break; }
  if (g === null) return;
  const to = g * T, step = 140 * dt;                                              // up and down the steps smoothly, not in one jump
  f.y = Math.abs(to - f.y) <= step ? to : f.y + Math.sign(to - f.y) * step;
}
// ---- walking along the real ground (the shoelace first, 10/15/2026; every walker that follows him off its ledge,
// 10/16/2026). Where something can put itself: the ground (or a mushroom, or a root's slope) under x near height y. A
// step up of a tile is fine; thorns and the Grime pool aren't ground it'll go on
function groundFoot(x, y) {
  let best = groundY(x, y, 10, 18);
  const ry = rampY(x, y, 10, 18); if (ry !== null && (best === null || ry < best)) best = ry;
  const row = Math.round(y / T), c = Math.floor(x / T);
  for (const r of [row, row - 1, row + 1]) if (tile(c, r) === 2 && Math.abs(r * T - y) <= 18 && (best === null || r * T < best)) best = r * T;
  return best;
}
const groundHazard = (x, y) => { const c = Math.floor(x / T), r = Math.floor(y / T); return tile(c, r) === 3 || tile(c, r + 1) === 3 || tile(c, r - 1) === 3; };
// one step along the ground: 'ok', 'edge' (a drop ahead) or 'wall' (too high to step up)
function groundStep(f, dir, sp, dt) {
  const nx = f.x + dir * sp * dt, probe = nx + dir * 10;
  if (probe < 2 * T || probe > room.pxW - 2 * T) return 'wall';
  const gy = groundFoot(probe, f.y);
  if (gy === null && (solidPx(probe, f.y - 2) || solidPx(probe, f.y - 12))) return 'wall';   // the ground goes on up past a step: a wall (or a ledge to spring up)
  if (gy === null || gy > f.y + 10) return 'edge';
  if (gy < f.y - 18 || boxSolid(probe - 3, gy - 10, probe + 3, gy - 3)) return 'wall';   // (a few px of the ground's own rounded top isn't a wall: the stump's corner in the well read as one, and the cap sat on it for good, 10/16/2026)
  if (groundHazard(probe, gy)) return 'edge';
  f.x = nx; const here = groundFoot(nx, f.y); if (here !== null && here >= f.y - 18) f.y = here;
  return 'ok';
}

// in the air: it keeps going sideways once it's up past an edge (a ledge it's springing up onto), and lands on the
// ground's real bumps, a mushroom or a root
function airStep(f, dt) {
  f.vy = Math.min(f.vy + 800 * dt, 500);
  const hw = Math.max(5, (FOE[f.kind].hw || 8) - 3), inside = (x, y) => boxSolid(x - hw, y - 12, x + hw, y - 3);
  const nx = f.x + (f.hopVX || 0) * dt;
  if (nx > 2 * T && nx < room.pxW - 2 * T && !boxSolid(nx - hw, f.y - 10, nx + hw, f.y - 2)) f.x = nx;   // (its whole width, not just the middle: it went down the side of the stump in the well and into it, 10/16/2026)
  const ny = f.y + f.vy * dt;
  if (f.vy > 0 && inside(f.x, ny) && !inside(f.x, f.y)) {                              // coming down beside a ledge: slide off its side rather than into it
    for (let d = 1; d <= 2 * hw + 4; d++) { const s2 = [Math.sign(f.hopVX || 0) || 1, -(Math.sign(f.hopVX || 0) || 1)].find(s2 => !inside(f.x + s2 * d, ny)); if (s2) { f.x += s2 * d; break; } }
  }
  if (f.vy > 0) {
    let gy = groundY(f.x, f.y, Math.ceil(f.vy * dt) + 2, 0);
    const row = Math.floor(ny / T); if (tile(Math.floor(f.x / T), row) === 2 && f.y <= row * T + 0.5 && ny >= row * T) gy = gy === null ? row * T : Math.min(gy, row * T);
    const ry = rampY(f.x, ny, 0.5, ny - f.y + 1); if (ry !== null && ry >= f.y - 0.5) gy = gy === null ? ry : Math.min(gy, ry);
    if (gy !== null && gy <= ny + 0.5) { f.y = gy; f.vy = 0; f.air = false; if (!FOE[f.kind].free) { const r = patrol(f.x, f.y); if (r[1] >= r[0]) f.range = r; f.rt = 0.25; } return true; }   // its new ground's walk straight away: the cap in the moss bank lunged off the moment it landed and got pulled back to its old ledge's end, inside the step (10/16/2026)
  } else if (boxSolid(f.x - 5, ny - 12, f.x + 5, ny - 9)) { f.vy = 0; return false; }   // bumped its head
  f.y = ny;
  if (f.y > room.pxH + 30) { f.x = f.x0; f.y = f.y0; f.vy = 0; f.air = false; return true; }   // fell out the bottom: back where it started
  return false;
}

// a walker going after him off its own ledge (10/16/2026: most of them gave up the moment he stepped off).
// Up a step, down off an edge he's below, a hop up onto one he's on (up to about 3 tiles). Out of reach for 4 seconds,
// it loses interest and walks back to where it started. `keep`: how close it wants to get (the bucket stays back to
// throw). Returns false when there's nothing to chase and it's home, so the caller does its usual patrol
function chaseWalk(f, dt, sp, keep = 20) {
  const on = near(f, 16 * T, 7 * T);
  f.lost = on ? 0 : (f.lost || 0) + dt;
  let tx, home = false;
  if (on) tx = P.x;
  else if (f.lost < 4 && f.lastSeen !== undefined) tx = f.lastSeen;
  else if (f.lastSeen !== undefined && (Math.abs(f.x - f.x0) > 2 || Math.abs(f.y - f.y0) > T)) { tx = f.x0; home = true; }   // after a chase: back to where it was
  else { f.lastSeen = undefined; return false; }                     // (its own back and forth never sends it home: it was walking 16px off, heading home, counting itself there and standing still for good, the stuck sweep 10/17/2026)
  if (on) f.lastSeen = P.x;
  const dx = tx - f.x, ty = on ? P.y : f.lost < 4 ? f.y : f.y0, dy = ty - f.y;
  const settle = () => { f.x0 = f.x; f.y0 = f.y; f.lastSeen = undefined; f.homeT = 0; return false; };   // stays where it's got to and walks back and forth there
  if (home && Math.abs(dx) <= 2) { if (Math.abs(dy) <= T) { f.lastSeen = undefined; return false; } return settle(); }   // home: back to its patrol (home but a level off, it can't get up: this is home now)
  if (Math.abs(dx) <= keep && !home) { if (on) f.f = Math.sign(dx) || f.f; return true; }
  const dir = Math.sign(dx); f.f = dir;
  const res = groundStep(f, dir, sp, dt);
  if (res === 'edge') { if (dy > 8 || (on && Math.abs(dx) > 30 && safeDip(f, dir))) { f.air = true; f.vy = -110; f.hopVX = dir * Math.max(80, sp); } }   // (more than 8 down, not 20: a step down of a tile, too far to walk and not far enough to hop, left it standing at the top, the enemy audit 10/17/2026)   // a little hop off, so it clears a rounded edge (it was landing back on the corner over and over: the stump in the well)
  else if (res === 'wall') { if (dy < -6 && dy > -3.5 * T && (f.hopCd || 0) <= 0) { f.air = true; f.vy = -360; f.hopVX = dir * 90; f.hopCd = 0.8; } }   // (more than 6 up, not 12: out of the far side of a dip it was stuck at the foot of the bank, the terrain audit 10/17/2026)
  if (home && (res === 'wall' || res === 'edge') && !f.air) { f.homeT = (f.homeT || 0) + dt; if (f.homeT > 1.5) return settle(); } else f.homeT = 0;   // can't find its way home: it makes do where it is
  return true;
}

// ---- bits the new attacks share (10/16/2026)
// a hold: he's stuck where he is till he mashes his way out (see player.js) or it squeezes. `mash`: presses it takes
function pinHim(f, mash = 6) { P.pinned = { by: f, left: mash, x: P.x, y: P.y }; P.vx = P.vy = 0; P.hurtT = 0; P.atk = null; return P.pinned; }
const pinnedBy = f => !!P.pinned && P.pinned.by === f;
// let go of him: put it beside him somewhere it's clear (behind him first, then in front, a few heights), else where it
// last was clear. Its own box decides, the same one its flying uses
function placeClear(f, cands) {
  const ox = f.x, oy = f.y;
  for (const [x, y] of cands) { f.x = x; f.y = y; const b = foeBox(f); if (x > T && x < room.pxW - T && !boxSolid(b.l, b.t, b.r, b.b)) return true; }
  f.x = ox; f.y = oy; return false;
}
function releaseClear(f, dx, dy) {
  const s = -P.facing || 1, c = [];
  for (const side of [s, -s]) for (const k of [1, 0.66, 1.4]) for (const h of [dy, dy - 12, dy + 8, dy - 26]) c.push([P.x + side * dx * k, P.y + h]);
  if (!placeClear(f, c) && f.okX !== undefined) { f.x = f.okX; f.y = f.okY; }
}
// a walker going after him across a dip in the ground (both sides the same height, a little hollow between): it goes
// down and back up, as long as it's a short dip with ground to climb back out on and nothing nasty in it (the terrain
// audit, 10/17/2026: they all stopped at the lip). Not a real drop, not a pit
function safeDip(f, dir) {
  const probe = f.x + dir * 14, gy = groundY(probe, f.y, 2 * T, 0);
  if (gy === null || gy - f.y > 2 * T || groundHazard(probe, gy)) return false;
  for (let x = probe; Math.abs(x - probe) <= 4 * T; x += dir * 4) {
    const g = groundY(x, f.y + 4, 3 * T, 18); if (g === null || groundHazard(x, g)) return false;
    if (g <= f.y + 6) return true;                                                   // the far bank, back up at about its height
  }
  return false;
}
// things that fly, kept out of the rock: where it last was clear, and if it's ended up inside something a moment (let go
// somewhere tight, shoved), it goes back there
const FLY_UNSTICK = new Set(['bag', 'wrapper', 'plane', 'balloon', 'nwing']);
// let go of him: set down beside him on open ground, the side asked for first (it was being put inside the step or wall
// next to him: the audit rerun, 10/16/2026)
function setBeside(f, d) {
  const hw = Math.max(4, (FOE[f.kind].hw || 8) - 2);
  for (const ox of [d, -d, d / 2, -d / 2, 0]) {
    const x = P.x + ox, gy = groundY(x, P.y - 20, 40, 0);
    if (gy === null || boxSolid(x - hw, gy - 12, x + hw, gy - 4)) continue;
    f.x = x; f.y = gy; if (f.range && !FOE[f.kind].free) f.range = patrol(f.x, f.y); return;
  }
  f.x = P.x; f.y = P.y;
}
// reeling him in: he slides toward x (walls still stop him). Holding the shield up digs his heels in, half as fast
function pullHim(x, sp, dt) { if (!phillAround() || P.pinned || (P.story && !P.story.free) || Math.abs(x - P.x) < 16) return; moveX(Math.sign(x - P.x) * sp * (guardUp() ? 0.5 : 1) * dt); }
// one of a few attacks, by weight (a weight of 0 means it can't right now: not one of this copy's, or out of reach)
function choose(opts) { const ok = opts.filter(o => o[0] > 0), tot = ok.reduce((a, o) => a + o[0], 0); let r = Math.random() * tot; for (const o of ok) { if ((r -= o[0]) <= 0) return o[1]; } return ok.length ? ok[ok.length - 1][1] : null; }
const toHim = f => Math.sign(P.x - f.x) || f.f;
// a short hop through the air drawn as an offset (yoff), with x carried along its walk: the cap's pounce, the fork's vault
function hopArc(f, dt, g = 900) {
  f.vy += g * dt; f.yoff = Math.min(0, f.yoff + f.vy * dt);
  const nx = f.x + (f.hopVX || 0) * dt; f.x = Math.max(f.range[0], Math.min(f.range[1], nx));
  if (f.yoff >= 0 && f.vy > 0) { f.yoff = 0; f.vy = 0; return true; }
  return false;
}
// a hop that lands on him: how fast sideways, given how high it goes up (vy0) and where he is
const hopTo = (f, x, vy0, g = 900) => (x - f.x) / Math.max(0.2, 2 * -vy0 / g);

// can it stand at column c with its feet on the top of row `row`: open there, ground right under it, no thorns
const isFloor = (c, row) => tile(c, row - 1) === 0 && (tile(c, row) === 1 || tile(c, row) === 2);

// enemies come back once he's been three rooms away from theirs (10/14/2026: they came back too easily). It
// used to count rooms walked into, so two rooms out and back brought them back. Now it's real distance: each room
// remembers which of its foes were down when he left and the farthest he's been from it since, counted the shortest
// way through the doors (the same doors his map is drawn from). Resting at a cushion brings everything back as before
const foesDown = {};
const FOE_BACK_DIST = 3;
let roomLinks = null;
function roomGraph() {                                                                     // which rooms each room's doors lead to, worked out once from the map
  if (roomLinks) return roomLinks;
  roomLinks = {};
  const M = window.MAP_ROOMS || {}, ids = Object.keys(M);
  const at = (x, y) => ids.find(id => { const m = M[id]; return x >= m.x && x < m.x + m.w && y >= m.y && y < m.y + m.h; });
  for (const id of ids) {
    const m = M[id], out = new Set();
    for (const [e, a, b] of m.doors || []) {
      const mid = (a + b) / 2;
      const p = e === 'left' ? [m.x - 1, m.y + mid] : e === 'right' ? [m.x + m.w, m.y + mid] : e === 'top' ? [m.x + mid, m.y - 1] : [m.x + mid, m.y + m.h];
      const n = at(p[0], p[1]); if (n && n !== id) out.add(n);
    }
    roomLinks[id] = out;
  }
  for (const id of ids) for (const n of roomLinks[id]) if (roomLinks[n]) roomLinks[n].add(id);   // a door goes both ways
  return roomLinks;
}
function roomsApart(a, b, most = 8) {
  if (a === b) return 0;
  const G = roomGraph(); if (!G[a] || !G[b]) return most;                                  // somewhere off the map (the crow's flight): count it as far
  let seen = new Set([a]), edge = [a];
  for (let d = 1; d <= most; d++) {
    const next = [];
    for (const r of edge) for (const n of G[r] || []) { if (n === b) return d; if (!seen.has(n)) { seen.add(n); next.push(n); } }
    edge = next;
  }
  return most;
}
// the farther from the forest, the tougher the litter (a friend's playtest, 10/14/2026: they barely got harder). The
// Pond's second half (past the waterproofing) and the Old Oak are the toughest so far. One-hit things stay one-hit
const POND_DEEP = new Set(['deepwater', 'silt', 'fishline', 'grotto', 'sunken', 'drainmouth', 'foamline', 'swan', 'fenceside']);
function regionToughness() {
  const r = room.def.region;
  if (r === 'pond') return POND_DEEP.has(room.def.id) ? 2 : firstHalf() ? 1.2 : 1.6;          // (the first half was 1.5, 10/23/2026: Phill's no stronger there yet)
  if (r === 'playground') return firstHalf() ? 1.2 : 1.6;
  return { rootwood: 1, home: 1, oak: 1.75, greenhouse: 2, hive: 2 }[r] || 1;
}
// Rootwood's enemies on the way to the tin soldier keep the health they had on 10/15/2026, before it went up by one or
// two across the board; once he's down they have today's (10/23/2026, the start was getting too hard)
const EARLY_HP = { cap: 3, can: 4, spinner: 2, wrapper: 2, juice: 3 };
const foeHP = (k, kind) => {
  if (k.hp <= 1) return k.hp;
  if (kind && earlyRootwood() && EARLY_HP[kind] !== undefined) return EARLY_HP[kind];
  return Math.round(k.hp * regionToughness());
};
function spawnFoes() {
  if (foes.length && foes[0].room && foes[0].room !== room.def.id) {
    const down = new Set(foes.filter(f => f.state === 'down' || f.hp <= 0).map(f => f.i));
    const was = foesDown[foes[0].room];
    if (was && was.far < FOE_BACK_DIST) for (const i of was.down) down.add(i);              // still gone from last time, still gone now
    foesDown[foes[0].room] = { down, far: 0 };
  }
  for (const k in foesDown) if (k !== room.def.id) foesDown[k].far = Math.max(foesDown[k].far, roomsApart(k, room.def.id));   // how far he's got from each of them
  const gone = foesDown[room.def.id] && foesDown[room.def.id].far < FOE_BACK_DIST ? foesDown[room.def.id].down : null;
  foes.length = 0; shots.length = 0; drops.length = 0;
  (room.def.foes || []).forEach((d, i) => {
    const k = FOE[d.kind]; if (!k) return;
    if (d.beat && !world.flags[d.beat]) return;                       // not here yet: it turns up once the story's got that far (10/23/2026)
    if (gone && gone.has(i)) return;
    const f = { room: room.def.id, i, kind: d.kind, x: d.x, y: d.y, x0: d.x, y0: d.y, f: d.f || -1, hp: foeHP(k, d.kind), state: 'walk', t: 0, cd: 0.8 + Math.random(), flash: 0, vel: 0, yoff: 0, vy: 0, hb: null, hitP: false, range: k.free ? [2 * T, room.pxW - 2 * T] : patrol(d.x, d.y) };
    f.moves = movesFor(d.kind);
    if (d.asleep) { f.state = 'asleep'; f.wake = d.wake || 72; f.after = d.after; }   // lying still till he's met the one before it (the teaching audit, 10/18/2026): see updateFoes
    keepClearOfDoors(f, k);
    if (k.setup) k.setup(f, d);                                       // (d: anything else the room says about this one, like the reacher's stretch of the pool)
    if (k.free && d.kind !== 'gum' && !k.ownSpot) {                  // a flyer never starts inside rock: nudged down (then up) till it's clear (ownSpot: it sorts out its own)
      const box = () => foeBox(f);
      for (let n = 0; n < 24 && boxSolid(box().l, box().t, box().r, box().b); n++) f.y += 4;
      for (let n = 0; n < 24 && boxSolid(box().l, box().t, box().r, box().b); n++) f.y -= 8;
      if (f.hy !== undefined) f.hy = f.y;
    }
    foes.push(f);
  });
}
function foesAllBack() { for (const k in foesDown) delete foesDown[k]; }
// nothing waits right where he comes in (walking into a room straight into a hit is out of his hands).
// A foe on the same level as a doorway he arrives at has its walk cut back to stay 6 tiles clear, and starts there
const DOOR_CLEAR = 6 * T;
function keepClearOfDoors(f, k) {
  const zones = room.def.doors.filter(d => !d.exitOnly && Math.abs(f.y - d.y) <= 80).map(d => [d.x - DOOR_CLEAR, d.x + DOOR_CLEAR]);
  if (!zones.length) return;
  const span = k.free ? [2 * T, room.pxW - 2 * T] : f.range;
  let parts = [span];                                               // what's left of its walk once every doorway's zone is cut out
  for (const [lo, hi] of zones) parts = parts.flatMap(([a, b]) => (b < lo || a > hi) ? [[a, b]] : [[a, Math.min(b, lo)], [Math.max(a, hi), b]].filter(([x, y]) => y >= x));
  if (!parts.length) {                                              // nowhere on its ledge is far enough: the spot farthest from every doorway
    let best = span[0], bestD = -1;
    for (let x = span[0]; x <= span[1]; x += 4) { const d = Math.min(...zones.map(([lo, hi]) => Math.abs(x - (lo + hi) / 2))); if (d > bestD) { bestD = d; best = x; } }
    parts = [[best, best]];
  }
  const dist = ([a, b]) => f.x < a ? a - f.x : f.x > b ? f.x - b : 0;
  const pick = parts.reduce((p, q) => dist(q) < dist(p) ? q : p);
  if (!k.free) f.range = pick;                                      // floaters chase him anyway: only where they start moves
  f.x = f.x0 = Math.max(pick[0], Math.min(pick[1], f.x));
}
const foeBox = f => { const k = FOE[f.kind]; if (k.box) return k.box(f); return { l: f.x - k.hw, r: f.x + k.hw, t: f.y - k.h + f.yoff, b: f.y + f.yoff }; };
const phillAround = () => P.respawnT <= 0 && P.ko <= 0 && !P.hang && !P.held && !(typeof DBG !== 'undefined' && DBG.ignore);   // (the menu's Ignore him: as far as the enemies can tell he isn't there, 10/17/2026)
const guardUp = () => inp.guardH && !P.atk && !P.roll && !P.dash && P.hurtT <= 0 && P.gbreak <= 0 && !P.guardOut;
let guardHeldRaw = false;                       // the shield button as pressed (input gets cleared during little scenes)
function setFoeState(f, s) {
  if (f.state === 'down' && s !== 'down') return;   // knocked out is knocked out till the room's left and they come back. A hopper knocked out mid-hop was landing back on its feet with no health, and every hit after paid out again
  f.state = s; f.t = 0; f.hb = null; f.hitP = false;
  const hv = HEAVY[f.kind];
  if (hv && hv[0] === s) {                                                             // winding up the one the shield can't take: a red !! and a heavy sound
    f.heavy = true; popup(f.x, f.y + (f.yoff || 0) - FOE[f.kind].h - 14, '!!', '#ff6b5a', true); if (!FOE[f.kind].ownWindup && (typeof heard !== 'function' || heard(f))) sfx.heavyWindup();   // (ownWindup: the plant traps make their own, quieter, 10/17/2026)
  } else if (!hv || !hv.includes(s)) f.heavy = false;                                  // (on to anything that isn't that attack: over)
}
// Every enemy has a move the shield doesn't answer (10/16/2026): a grab, a big slam, something from above.
// These are the wind ups that start it. It's telegraphed (the red !! and a heavy sound), and a parry or a roll still
// answers it, just not holding the shield up. A few have one already without this: the reacher grabs up from below,
// the paper plane and the frog come down on top of him, the juice box lobs over the shield, and the spinner and the
// gum leech drop on him from above (only the shield held up over his head takes those)
const HEAVY = {                                                                         // [its wind up, then the attack's states]
  cap: ['crouch', 'pounce'], can: ['tip', 'roll'], fork: ['lungewind', 'lunge'], lace: ['throwwind', 'lasso'],
  rings: ['snagwind', 'snag'], sponge: ['tumblewind', 'tumble'], duck: ['crouch', 'leap'], bobber: ['under', 'pop'], bag: ['billow'], straw: ['archwind', 'arch', 'lunge'],
  fishtoy: ['spinaim', 'corkscrew'], glove: ['grabwind', 'grab'], pike: ['aim', 'dart'], leech: ['bandwind', 'band'], teeth: ['skitwind', 'skitter'], jack: ['springpeek', 'spring'],
  bucket: ['flipwind', 'flip'], rope: ['lassowind', 'lasso'], balloon: ['stringwind', 'string'], horn: ['pokewind', 'poke'], ball: ['spin', 'roll'], shuttle: ['spinwind', 'spiral'],
  wrapper: ['aim', 'feint', 'dive'], nwing: ['fold', 'dash', 'turn'],                  // (10/17/2026: the last two without one. The wrapper's dive, feint and all, and the night wing's dashes, a fresh !! before each)
};
// what a block takes off the shield goes by how heavy the hit is (10/16/2026): three normal ones empty it, the
// same as three rolls. Each attack's own number (what it was tuned at before) says which it is: the light ones (up to
// 16) take 18, the normal ones (up to 20) take 30, anything bigger takes 45
const LIGHT_COST = 18, NORMAL_COST = 30, HEAVY_COST = 45;
const weighCost = c => c <= 16 ? LIGHT_COST : c <= 20 ? NORMAL_COST : HEAVY_COST;

// one of their hits reaching him: blocked, parried, or it lands
function foeStrike(srcX, kind, o) {
  if (P.swim) return foeStrikeWet(srcX, kind, o);
  const flat = !!(P.swim || P.crawl);                                  // crawling or swimming: the lid's out in front of his face, never up over his head (up's just swimming up)
  const raised = (inp.up || inp.aimUp) && !flat;                       // shield up over his head: it covers what comes down on top of him, not the sides
  const covered = guardUp() && (raised ? Math.abs(srcX - P.x) < 20 : Math.sign(srcX - P.x) === P.facing);
  const lx = P.x + P.facing * (flat ? (P.swim ? 26 : 30) : 13), ly = P.y - (flat ? 12 : 26);   // where the lid is
  if (covered && P.parryT > 0) { parryFx(raised ? P.x : lx, raised ? P.y - 44 : ly); return 'parried'; }
  if (covered && o.heavy) popup(P.x, P.y - 54, 'too heavy to block', '#ff8a6b');      // (falls through to the hit)
  else if (covered) {
    if (!blockHit(weighCost(o.cost ?? tune.blockCost), srcX)) { sfx.block(); P.blockT = 0.15; P.recoilT = 0.12; P.recoilV = -P.facing * 180; hitstop = Math.max(hitstop, 0.04); spark(lx - P.facing, ly + 2); }
    P.bumpSafe = 0.4;                                                                    // a blocked hit doesn't hurt him by its body running on into him either
    return 'blocked';
  }
  if (o.soft) { P.vx = Math.sign(P.x - srcX || -P.facing) * 120; P.vy = -120; sfx.bump(); puff(P.x, P.y - 24, 4, 30); return 'bonk'; }   // the squirrel's acorns: a bonk, no harm done
  return hurt(srcX, kind, o.dmg || 1) ? 'hit' : 'avoided';                            // avoided: rolled through it, or still flashing from the last hit. No grab, no slow
}
// under water the lid points any of 8 ways (10/16/2026): it covers what comes at it from that side, about 70 degrees
// either way of where it points. Where the hit came from: the attack's own height if it says, else the nearest one of that kind
function foeStrikeWet(srcX, kind, o) {
  const A = P.aimV || [P.facing, 0], cx = P.x, cy = P.y - 9;
  let sy = o.y;
  if (sy === undefined) { let best = null, bd = 1e9; for (const f of foes) { if (f.kind !== kind || f.state === 'down') continue; const d = Math.abs(f.x - srcX) + Math.abs(f.y - cy) * 0.2; if (d < bd) { bd = d; best = f; } } sy = best ? (foeBox(best).t + foeBox(best).b) / 2 : cy; }
  const vx = srcX - cx, vy = sy - cy, d = Math.hypot(vx, vy);
  const covered = guardUp() && (d < 6 || (vx * A[0] + vy * A[1]) / d > 0.34);
  const lx = cx + A[0] * 24, ly = cy + A[1] * 24;                                       // where the lid is
  if (covered && P.parryT > 0) { parryFx(lx, ly); return 'parried'; }
  if (covered && o.heavy) popup(P.x, P.y - 54, 'too heavy to block', '#ff8a6b');
  else if (covered) {
    if (!blockHit(weighCost(o.cost ?? tune.blockCost), srcX)) { sfx.block(); P.blockT = 0.15; P.vx -= A[0] * 150; P.vy -= A[1] * 150; hitstop = Math.max(hitstop, 0.04); spark(lx, ly); }
    P.bumpSafe = 0.4;
    return 'blocked';
  }
  if (o.soft) { P.vx = Math.sign(P.x - srcX || -P.facing) * 120; P.vy = -120; sfx.bump(); return 'bonk'; }
  return hurt(srcX, kind, o.dmg || 1) ? 'hit' : 'avoided';
}
function parryFx(sx, sy) {
  P.parryT = 0; P.parryCD = 0; P.blockT = 0.25;
  P.stam = 100; P.stamDelay = 0; P.stamFlash = 0.35;          // a good parry tops his shield stamina back up
  hitstop = 0.13; shakeT = 0.14; shakeA = 2; sfx.parry();
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; part(sx, sy, Math.cos(a) * 170, Math.sin(a) * 170, 0.22, i % 2 ? '#fff6d8' : '#ffd36b', 2, 0); }
  popup(P.x, P.y - 54, 'parried', '#ffd36b');
}
function foeStagger(f, time) { setFoeState(f, 'stagger'); f.stagT = time; f.yoff = 0; }

function updateFoes(dt) {
  if (P.bumpSafe > 0) P.bumpSafe -= dt;
  updateImpacts(dt);
  for (const f of foes) {
    f.t += dt; f.flash = Math.max(0, f.flash - dt); f.cd -= dt; if (f.atkT > 0) f.atkT -= dt;
    // one lying still, so the first of its kind can be met on its own (the teaching audit, 10/18/2026: three shoelaces at
    // once, or four swimmers, before he'd seen one). It wakes once the one before it (after: its number in the room) is
    // beaten, or he comes close (wake: how close), or it's hit. Asleep it does nothing and touching it doesn't hurt
    if (f.state === 'asleep') {
      const lead = f.after != null ? foes.find(o => o.i === f.after) : null, leadDone = f.after != null && (!lead || lead.state === 'down');
      if (leadDone || (phillAround() && Math.abs(P.x - f.x) < f.wake && Math.abs(P.y - f.y) < f.wake * 0.75)) {
        setFoeState(f, 'walk'); f.cd = 0.9; puff(f.x, f.y - 4, 4, 24); if (typeof heard !== 'function' || heard(f)) sfx.rustle && sfx.rustle(0.4);
      }
      continue;
    }
    if (f.react && (f.react.t += dt) >= f.react.dur) f.react = null;
    if (FLY_UNSTICK.has(f.kind) && f.state !== 'down' && !pinnedBy(f) && f.state !== 'wrap' && f.state !== 'inflate' && f.state !== 'blast') {   // (blown up, the bag's bigger for a moment: touching a wall then is fine)
      const b = foeBox(f);
      if (!boxSolid(b.l, b.t, b.r, b.b)) { f.okX = f.x; f.okY = f.y; f.stuckT = 0; }
      else if ((f.stuckT = (f.stuckT || 0) + dt) > 0.3 && f.okX !== undefined) { f.x = f.okX; f.y = f.okY; f.stuckT = 0; }
    }
    if (f.shoveT > 0) f.shoveT -= dt; if (f.bumpGrace > 0) f.bumpGrace -= dt;
    if (f.vel) {                                                                       // knocked back: it slides, and a wall stops it (a heavy hit had shoved a maple spinner into the rock for good, the enemy audit 10/17/2026)
      const nx = Math.max(f.range[0], Math.min(f.range[1], f.x + f.vel * dt)), d = nx - f.x;
      if (d) { const b = foeBox(f), fly = FOE[f.kind].free, into = (o) => fly ? boxSolid(b.l + o, b.t, b.r + o, b.b) : boxSolid(b.l + o + 1, b.t + 2, b.r + o - 1, b.b - 3); if (!into(d) || into(0)) f.x = nx; else f.vel = 0; }   // (already stuck in something: it's let move, so it can get out. Something flying checks its whole body, the same as its own flying does: a trimmed check left a spinner just touching the rock, where it couldn't fly on, the 10/18/2026 review)
      f.vel *= Math.pow(0.01, dt); if (Math.abs(f.vel) < 2) f.vel = 0;          // (eases out over a few tenths: a hit moves it a real distance, not a twitch, the combat review 10/17/2026)
    }
    if (FOE[f.kind].walker) {                                                          // walkers that follow him off their ledge: keep their walk (what a hit can push them along) to the ground they're on now
      f.hopCd = (f.hopCd || 0) - dt;
      if (!f.air && ((f.rt = (f.rt || 0) - dt) <= 0)) { const r = patrol(f.x, f.y); if (r[1] >= r[0]) f.range = r; f.rt = 0.25; }
      if (f.air && f.state !== 'down' && !FOE[f.kind].ownAir) { airStep(f, dt); continue; }
    }
    const xWas = f.x;
    (FOE[f.kind].update || (f.kind === 'cap' ? updateCap : updateCan))(f, dt);
    // just knocked back: for a moment it doesn't walk back in at him (it was chasing straight back into the gap the hit
    // made, so he walked on into it). Its attacks still go: a wind up or a lunge it was already in carries on
    if (f.shoveT > 0 && !committed(f) && f.x !== xWas && Math.sign(f.x - xWas) === Math.sign(P.x - f.x) && !/lunge|charge|dive|pounce|dash|swoop|spring|roll|tumble/.test(f.state)) f.x = xWas;
    if (!FOE[f.kind].free && !(f.yoff < 0) && !f.air && f.state !== 'hidden' && tile(Math.floor(f.x / T), Math.floor((f.y - 2) / T)) !== 4) {   // along the natural ground's bumps (not in the water, not mid hop)
      const gy = groundY(f.x, f.y, 7, 7); if (gy !== null) f.y = gy;
    }
    // touching one hurts (not while it's knocked out or dazed)
    if (f.state !== 'down' && f.state !== 'stagger' && f.state !== 'hidden' && !(FOE[f.kind].harmless && FOE[f.kind].harmless(f)) && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && !(P.bumpSafe > 0) && !(f.bumpGrace > 0)) {   // (bumpGrace: he just hit this one, so its body pushing into him a moment doesn't count. Its attacks still do)
      const b = foeBox(f), me = { l: bodyL(P.x) + 2, r: bodyR(P.x) - 2, t: P.y - P.h + 4, b: P.y };
      if (overlap(b, me)) { hurt(f.x, f.kind, 1); if (wearing('burr') && f.state !== 'down') { foeStagger(f, 1.0); f.vel = -Math.sign(P.x - f.x || 1) * 60; } }   // the sticky burr pin: whatever bumped him is stuck a moment
    }
  }
  updateShots(dt); updateDrops(dt);
}
const sameLevel = (f, up = 30) => Math.abs(P.y - f.y) < up;
function updateCap(f, dt) {
  const k = FOE.cap, dx = P.x - f.x, adx = Math.abs(dx);
  if (f.yoff < 0) hopArc(f, dt);                                                     // (an old pounce in flight: it still comes down)
  if (f.air) {                                                                        // really in the air: off a ledge after him, or the pounce. It lands on whatever's under it now (10/16/2026: the pounce was drawn as a hop at its own ledge's height, so off the mound it came down in midair, hung there, then went back up onto the mound)
    const landed = airStep(f, dt);
    if (f.state === 'pounce' && f.vy > -60) strike(f, { l: f.x - 10, r: f.x + 10, t: f.y - 16, b: f.y }, 18);
    if (landed && f.state === 'pounce') { puff(f.x, f.y, 4, 30); if (heard(f)) sfx.land(); setFoeState(f, 'rest'); }
    return;
  }
  switch (f.state) {
    case 'walk':
      if (!chaseWalk(f, dt, 50)) {                                                     // after him, off its ledge if it has to; otherwise back and forth
        f.x += f.f * k.speed * dt;
        if (f.x <= f.range[0]) { f.x = f.range[0]; f.f = 1; } else if (f.x >= f.range[1]) { f.x = f.range[1]; f.f = -1; }
      }
      if (phillAround() && sameLevel(f, 40) && f.cd <= 0 && !(P.story && !P.story.free)) {
        const m = choose([[adx < 84 ? 3 : 0, 'wind'], [hasMove(f, 3) && adx > 40 && adx < 120 ? 2 : 0, 'crouch'], [hasMove(f, 4) && adx > 64 && adx < 13 * T ? 1.5 : 0, 'tip']]);
        if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); f.again = false; m === 'tip' ? sfx.clank() : sfx.chitter(0.5); }   // the lunge from where it reaches (it was 110: snapping at nothing)
      }
      break;
    case 'wind': if (f.t >= 0.42) { setFoeState(f, 'lunge'); sfx.swing(); } break;   // shudders, then...
    case 'lunge': case 'snap2': {                                                     // ...scuttles forward and snaps (blocked: it snaps again, 10/16/2026)
      if (f.state === 'snap2' && f.t < 0.14) break;                                   // (a beat to gather itself)
      f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.f * 220 * dt));
      f.hb = { l: f.x + (f.f > 0 ? 0 : -16), r: f.x + (f.f > 0 ? 16 : 0), t: f.y - 12, b: f.y }; f.atkBox = f.hb; f.atkT = 0.08;
      if (!f.hitP && phillAround() && artHit(f, f.hb)) {
        f.hitP = true; const out = foeStrike(f.x, 'cap', { cost: 18, heavy: f.heavy });
        if (out === 'parried') { foeStagger(f, 1.6); f.vel = -f.f * 120; break; }
        if (out === 'blocked') { f.vel = -f.f * 80; if (f.state === 'lunge' && hasMove(f, 2)) f.again = true; }
      }
      if (f.t >= (f.state === 'snap2' ? 0.4 : 0.26)) {
        if (f.again) { f.again = false; setFoeState(f, 'snap2'); sfx.chitter(0.8); }
        else setFoeState(f, 'rest');
      }
      break;
    }
    case 'crouch':                                                                     // bunches its legs up... (10/16/2026)
      if (f.t >= 0.35) {
        setFoeState(f, 'pounce'); f.air = true; f.vy = -300; f.yoff = 0; sfx.jump();
        const dy = Math.max(-50, P.y - f.y), tFly = (300 + Math.sqrt(300 * 300 + 2 * 800 * dy)) / 800;   // how long till it's down at his height
        f.hopVX = Math.max(-200, Math.min(200, (P.x - f.x) / tFly));
      }
      break;
    case 'pounce': setFoeState(f, 'rest'); break;                                     // (down already: the pounce's flight is above, in the air)
    case 'tip':                                                                        // up on its rim like a coin... (a 4th one, from a region out)
      if (f.t >= 0.3) { setFoeState(f, 'coin'); sfx.roll(); }
      break;
    case 'coin': {                                                                     // ...and rolls at him fast till it hits something, then wobbles over
      const nx = f.x + f.f * 200 * dt, stop = nx <= f.range[0] || nx >= f.range[1];
      f.x = Math.max(f.range[0], Math.min(f.range[1], nx)); f.spin = (f.spin || 0) + dt * 14;
      strike(f, { l: f.x - 6, r: f.x + 6, t: f.y - 22, b: f.y }, 20);
      if (stop || f.t >= 1.4) { setFoeState(f, 'wobble'); puff(f.x, f.y, 3, 24); if (heard(f)) sfx.clunk(); }
      break;
    }
    case 'wobble': if (f.t >= 0.8) { setFoeState(f, 'walk'); f.cd = 1.0 + Math.random() * 0.6; } break;   // spun silly: a free hit or two
    case 'rest': if (f.t >= 0.55) { setFoeState(f, 'walk'); f.cd = 1.1 + Math.random() * 0.8; } break;
    case 'stagger': if (f.t >= f.stagT) { setFoeState(f, 'walk'); f.cd = 0.8; } break;
    case 'hurt': if (f.t >= 0.25 && f.yoff >= 0) { setFoeState(f, 'walk'); f.cd = 0.5; } break;
  }
}
function updateCan(f, dt) {
  const dx = P.x - f.x, adx = Math.abs(dx);
  if (f.vy || f.yoff < 0) {                                                            // in the air from a hop
    f.vy += 700 * dt; f.yoff += f.vy * dt; f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.hopVX * dt));
    if (f.yoff >= 0) { f.yoff = 0; f.vy = 0; puff(f.x, f.y, 4, 30); sfx.land(); }
  }
  switch (f.state) {
    case 'walk':                                                                       // just standing there, sloshing
      if (phillAround() && adx < 220 && Math.abs(P.y - f.y) < 140 && f.cd <= 0) {
        f.f = Math.sign(dx) || f.f;
        const level = Math.abs(P.y - f.y) < 30;
        const m = adx < 50 ? choose([[1.2, 'hop'], [hasMove(f, 2) ? 1.5 : 0, 'shake']])           // too close: hops back, or shakes itself up and sprays him (10/16/2026)
          : choose([[2, 'aim'], [hasMove(f, 3) && level && adx > 70 ? 1 : 0, 'tip']]);              // or tips over and rolls at him
        if (m === 'hop') { setFoeState(f, 'hop'); f.vy = -230; f.hopVX = -f.f * 90; sfx.jump(); }
        else if (m) { setFoeState(f, m); m === 'shake' ? sfx.splort() : m === 'tip' ? sfx.clank() : sfx.windup(); }
      }
      break;
    case 'hop': if (f.t > 0.4 && f.yoff === 0) { setFoeState(f, 'walk'); f.cd = 0.4; } break;
    case 'aim': if (f.t >= 0.62) {                                                     // leans back... and spits a blob of Grime
      setFoeState(f, 'spit');
      const tx = P.x, ty = P.y - 18, sx = f.x + f.f * 4, sy = f.y - 26, time = Math.max(0.45, Math.min(0.9, Math.abs(tx - sx) / 220));
      shots.push({ kind: 'blob', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 600 * time, g: 600, from: f, reflected: false, t: 0 });
      sfx.spit();
    } break;
    case 'spit': if (f.t >= 0.3) { setFoeState(f, 'walk'); f.cd = 1.8 + Math.random() * 0.8; } break;
    case 'shake': if (f.t >= 0.4) { setFoeState(f, 'fizz'); sfx.spit(); } break;       // shaken up...
    case 'fizz': {                                                                     // ...foam spraying out the top at him, up close
      if (Math.random() < dt * 40) part(f.x + f.f * (8 + Math.random() * 30), f.y - 28 + Math.random() * 14, f.f * 60, -30 + Math.random() * 40, 0.35, Math.random() < 0.6 ? '#e0d8f0' : '#8a7aa8', 2, 100);
      strike(f, { l: Math.min(f.x + f.f * 6, f.x + f.f * 44), r: Math.max(f.x + f.f * 6, f.x + f.f * 44), t: f.y - 40, b: f.y - 14, area: true }, 16);   // (area: the foam's the bits flying out, not part of its picture)
      if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.6; }
      break;
    }
    case 'tip': if (f.t >= 0.35) { setFoeState(f, 'roll'); sfx.roll(); } break;        // tips over...
    case 'roll': {                                                                     // ...and rolls at him along its ground, then lies there a moment
      const nx = f.x + f.f * 170 * dt, stop = nx <= f.range[0] || nx >= f.range[1];
      f.x = Math.max(f.range[0], Math.min(f.range[1], nx)); f.spin = (f.spin || 0) + dt * 10;
      strike(f, { l: f.x - 10, r: f.x + 10, t: f.y - 20, b: f.y }, 18);
      if (stop || f.t >= 1.5) { setFoeState(f, 'lie'); if (heard(f)) sfx.clunk(); puff(f.x, f.y, 3, 24); }
      break;
    }
    case 'lie': if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.6; } break;   // on its side: a free hit or two
    case 'stagger': if (f.t >= f.stagT) { setFoeState(f, 'walk'); f.cd = 0.8; } break;
    case 'hurt': if (f.t >= 0.25) { setFoeState(f, 'walk'); f.cd = 0.6; } break;
  }
}

// ---- shots: Grime blobs (and the squirrel's practice acorns)
function updateShots(dt) {
  for (const s of shots) {
    if (s.dead) continue;                                                               // (used up: not one more move, hit or batted back hit before it's cleared away, the 10/18/2026 review)
    s.t += dt; if (s.upd) s.upd(s, dt); if (s.dead) continue; s.vy += s.g * dt; s.x += s.vx * dt; s.y += s.vy * dt;
    if (boxSolid(s.x - 2, s.y - 2, s.x + 2, s.y + 2) || s.t > (s.life || 4) || s.y > room.pxH || (s.done && s.done(s))) {
      s.dead = true;
      for (let i = 0; i < 6; i++) part(s.x, s.y, (Math.random() * 2 - 1) * 60, -Math.random() * 80, 0.4, s.col ? s.col : s.kind === 'blob' ? '#2c1c3c' : s.kind === 'pblob' || s.kind === 'ball' ? '#3e5a74' : '#8a5a2a', 2, 300);
      if (s.kind !== 'acorn') sfx.splort(); continue;
    }
    if (s.noHit) continue;                                                              // (one that does its own hitting: the glove's cloud)
    const sb = { l: s.x - 4, r: s.x + 4, t: s.y - 4, b: s.y + 4 };
    if (s.reflected) {                                                                  // batted back: it hits whoever it reaches
      for (const f of foes) if (f.state !== 'down' && overlap(foeBox(f), sb)) { s.dead = true; foeHurt(f, 2, Math.sign(s.vx) * 60, s.x, s.y, true); popup(f.x, f.y - 34, 'right back at you', '#ffd36b'); break; }
      if (s.onReflectHit && s.onReflectHit(s)) s.dead = true;
      continue;
    }
    if (phillAround() && overlap(sb, { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y })) {
      const out = foeStrike(s.x - Math.sign(s.vx) * 10, s.kind === 'acorn' ? 'squirrel' : 'can', { cost: tune.blockCost * 0.5, soft: s.kind === 'acorn', y: s.y - Math.sign(s.vy) * 10 });
      if (out === 'parried') reflectShot(s);
      else if (out !== 'avoided') s.dead = true;                                        // (rolled through, or he's still flashing from a hit: it carries on past him)
      if (s.onMeet) s.onMeet(out, s);
    }
  }
  for (let i = shots.length - 1; i >= 0; i--) if (shots[i].dead) shots.splice(i, 1);
}

// a parried shot goes straight back at whatever fired it (parrying has to punish the one that shot it).
// A shot can say where its 'back' is (a boss's soft spot); otherwise it's the foe that spat it, or the boss, or
// failing all that it just gets batted away
function reflectShot(s) {
  s.reflected = true;
  const tgt = s.back ? s.back() : s.from && s.from.state !== 'down' ? { x: s.from.x, y: s.from.y - (FOE[s.from.kind] ? FOE[s.from.kind].h * 0.5 : 10) } : boss ? { x: boss.x, y: boss.y - 24 } : null;
  if (tgt) { const d = Math.hypot(tgt.x - s.x, tgt.y - s.y) || 1, sp = 360; s.vx = (tgt.x - s.x) / d * sp; s.vy = (tgt.y - s.y) / d * sp; s.g = 0; s.t = Math.min(s.t, 1); }
  else { s.vx = -s.vx * 1.15; s.vy = -Math.abs(s.vy) * 0.4 - 160; s.g = 300; }
  spark(s.x, s.y);
}

// how much a beaten foe drops (a friend's playtest, 10/14/2026: every foe always paid out, often three, and the shops
// were cheap). Now it's often nothing, usually one, and two is rare. The tougher ones (the ones that used to drop two to
// three) drop a bit more often. The acorn cap pin adds one whenever anything drops at all
const DROP_CHANCE = { small: 0.65, tough: 0.8 }, DROP_TWO = { small: 0.1, tough: 0.22 };
function foeDropCount(f) {
  const tough = (FOE[f.kind].acorns || [1, 1])[1] >= 3 ? 'tough' : 'small';
  let n = Math.random() < DROP_CHANCE[tough] ? 1 : 0;
  if (n && Math.random() < DROP_TWO[tough]) n = 2;
  if (n && wearing('acorn_cap')) n++;
  return n;
}
// ---- his sword reaching them
// how it takes a hit, by what it's made of (the combat review, 10/17/2026): a bottle cap tips back on its rim, tin
// rattles, paper and plastic film crinkle and twist, anything squishy squashes flat and springs back, cloth sways, the
// glass bottle rattles with a glint, and hard plastic flexes. Drawn on top of what it's doing, not instead: it still
// carries on with its attack (that's foeHurt's call), and its hits still go by its plain drawing (artHit)
const MAT = { cap: 'tip', can: 'rattle', frog: 'rattle', reacher: 'rattle', jack: 'rattle', pike: 'glass',
  wrapper: 'crinkle', bag: 'crinkle', plane: 'crinkle', horn: 'crinkle', spinner: 'crinkle', shuttle: 'crinkle',
  sponge: 'squish', gum: 'squish', leech: 'squish', balloon: 'squish', ball: 'squish', glove: 'squish', duck: 'squish',
  lace: 'cloth', rope: 'cloth', nwing: 'cloth' };
const matOf = f => MAT[f.kind] || 'flex';
const MAT_SFX = { tip: () => sfx.hitTin(), rattle: () => sfx.hitTin(), glass: () => sfx.hitGlass(), crinkle: () => sfx.hitPaper(), squish: () => sfx.hitSquish(), cloth: () => sfx.hitCloth(), flex: () => sfx.hitPlastic() };
const MAT_BITS = { tip: ['#e6c860', '#b08a30'], rattle: ['#d0d4dc', '#8a90a0'], glass: ['#c8f0e8', '#ffffff'], crinkle: ['#f0e6d8', '#d8c8b0'], squish: ['#9cd4e8', '#c4e6f0'], cloth: ['#d8c8b8', '#a89888'], flex: ['#fff6d8', '#e8e0d0'] };
function foeReact(f, power, braced) {
  f.react = { t: 0, dur: (braced ? 0.16 : 0.22) * (0.8 + 0.25 * power), p: power, dir: Math.sign(f.x - P.x) || P.facing, mat: matOf(f), braced };
}
// knocked back (push) at x, y. opts: full (the whirl: its whole shove, not cut down), power (how hard it reads), shoveT
function foeHurt(f, dmg, push, x, y, heavy = false, opts = {}) {
  if (f.state === 'down') return true;                                                  // already out: nothing more to give
  if (f.state === 'asleep') { setFoeState(f, 'walk'); f.cd = 0.6; }                     // lying still (the teaching audit): a hit wakes it
  // a plain hit makes it flinch, not stop (10/16/2026): swings are free now, so a hit that knocked it out of
  // whatever it was doing (and held its next attack back) let mashing keep it from ever getting a turn. It takes the
  // hit, gets nudged back, and carries on: its wind-up, its attack, its next attack when it was going to. A heavy hit
  // (the charged swing, the roll swing) still knocks it out of things like before
  const mid = committed(f), holds = !heavy;
  const power = opts.power ?? (heavy ? 1.8 : 1), braced = mid && !heavy;
  const opening = /stuck|stagger|dizzy|flat|lie|wobble|tangle/.test(f.state);              // (in an opening it hardly moves: hitting it out of reach of the next hit wasted the opening, the spinner stuck in the ground)
  f.flash = 0.12; f.hp -= dmg; f.vel = (heavy || opts.full ? push : push * (mid ? 0.25 : 0.5)) * (opening ? 0.3 : 1);
  f.shoveT = Math.max(f.shoveT || 0, opts.shoveT ?? (heavy || opts.full ? 0.3 : 0.15));
  foeReact(f, power, braced);
  impact(x, y, Math.sign(f.x - P.x) || P.facing, power, braced ? 'braced' : 'clean', MAT_BITS[matOf(f)]);
  hitstop = Math.max(hitstop, heavy ? 0.08 : 0.05); shakeT = heavy ? 0.14 : 0.08; shakeA = heavy ? 2.5 : 1.5;
  sfx.hit(); (MAT_SFX[matOf(f)] || MAT_SFX.flex)(); if (braced) sfx.hitBraced();
  if (f.hp <= 0) {                                                                      // knocked out: the Grime seeps out of it for now
    f.hp = 0; setFoeState(f, 'down'); f.yoff = 0; f.vy = 0; sfx.ko && sfx.ko();
    for (let i = 0; i < 12; i++) part(f.x, f.y - 8, (Math.random() * 2 - 1) * 80, -Math.random() * 120, 0.6, i % 2 ? '#2c1c3c' : '#4a3462', 2, 300);
    const n = foeDropCount(f);
    for (let i = 0; i < n; i++) dropAcorn(f.x, f.y - 10);
    if (FOE[f.kind].onDown) FOE[f.kind].onDown(f);
    return true;
  }
  if (holds) { if (!world.flags.foeHolds && mid) { world.flags.foeHolds = true; popup(f.x, f.y - 40, "it's not stopping. block it, or hit it harder", '#cfd6e6'); } return false; }
  if (f.state !== 'stagger' && !FOE[f.kind].noHurt && !(FOE[f.kind].keepState && FOE[f.kind].keepState(f))) setFoeState(f, 'hurt');   // keepState: an opening a hit doesn't cut short
  return false;
}
// the spin and the fluff burst go by the same protection as the sword (10/18/2026: they were getting through
// the closed glove, the fish from the front, the pike and the leech while they were free, the rolling rings). Whatever the
// sword glances off right now, they glance off too, with the same tink and the same words the first time
const saysOf = t => typeof t === 'function' ? t() : t;                               // (what one says can depend on what he knows)
function specialDeflected(f, type, x, y) {
  const k = FOE[f.kind]; if (!k.deflect || !k.deflect(f, { type, hit: new Set(), t: 0 })) return false;
  impact(x, y, Math.sign(f.x - P.x) || P.facing, 1, 'armor'); foeReact(f, 0.6, true); sfx.tink();
  if (!f.told) { f.told = 1; popup(f.x, f.y - 40, fmtKeys(saysOf(k.deflectText) || 'it glances off'), '#cfd6e6'); }
  return true;
}
function foeHits(box, a) {
  for (const f of foes) {
    if (f.state === 'down' || f.state === 'hidden' || a.hit.has(f)) continue;
    const fb = foeBox(f);
    if (!overlap(box, fb) || !swordHits(fb)) continue;
    a.hit.add(f);
    const [cx, cy] = swordContact(fb);                                                  // where the blade really meets it
    if (a.type !== 'rollslash') a.stopLunge = true;                                     // it connected: the swing's own pull forward stops there (it was carrying him on into it, the combat review 10/17/2026). The roll swing's meant to travel
    if (FOE[f.kind].deflect && FOE[f.kind].deflect(f, a)) {                             // something the sword just glances off right now
      impact(cx, cy, Math.sign(f.x - P.x) || P.facing, 1, 'armor'); foeReact(f, 0.6, true); sfx.tink(); if (a.type === 'down') pogo(); else { P.recoilT = 0.1; P.recoilV = -P.facing * 200; }
      if (!f.told) { f.told = 1; popup(f.x, f.y - 40, fmtKeys(saysOf(FOE[f.kind].deflectText) || 'it glances off'), '#cfd6e6'); }
      f.bounces = (f.bounces || 0) + 1;
      if (FOE[f.kind].hint && f.bounces === 3) popup(f.x, f.y - 52, fmtKeys(saysOf(FOE[f.kind].hint)), '#ffd36b');   // still stuck on it after three: a plainer nudge (10/16/2026)
      continue;
    }
    let dmg = ((DMG[a.type] || 1) + (a.level || 0)) * swordBonus();   // (a charged swing deep in the combo: one more for each step in)
    if (FOE[f.kind].soak && !isCharged(a.type) && a.type !== 'rollslash') { dmg *= 0.5; if (!f.told) { f.told = 1; popup(f.x, f.y - 34, 'it soaks it up', '#cfd6e6'); } }   // the sponge: plain swings barely dent it
    const finisher = a.type === 'whirl';                                                 // the combo's last swing: its whole shove, so it buys him room (the combat review, 10/17/2026)
    foeHurt(f, dmg, ATK[a.type].shove ? Math.sign(f.x - P.x || P.facing) * ATK[a.type].shove : P.facing * (isCharged(a.type) ? 220 + (a.level || 0) * 40 : a.type === 'chop' ? 150 : 120), cx, cy, isCharged(a.type) || a.type === 'rollslash',
      { full: finisher, power: isCharged(a.type) ? 1.8 + (a.level || 0) * 0.3 : finisher ? 1.5 : a.type === 'chop' ? 1.2 : 1, shoveT: finisher ? 0.35 : a.type === 'chop' ? 0.18 : undefined });   // the whirl shoves whatever it catches off him, either side
    f.bumpGrace = 0.3;
    rally();
    if (a.type === 'down') pogo();
    else { P.recoilT = 0.08; P.recoilV = -P.facing * 90; }
  }
}

// ---- acorns: they pop out, bounce, and come to him when he's close
// each region has its own currency: acorns in Rootwood, smooth pebbles at the Pond. Whatever drops is the one for where he is
const COIN_KINDS = ['acorns', 'pebbles', 'marbles', 'feathers'];
const REGION_COIN = { rootwood: 'acorns', pond: 'pebbles', playground: 'marbles', oak: 'feathers' };
const COIN_SPR = { acorns: 'acorn_small', pebbles: 'pebble_small', marbles: 'marble_small', feathers: 'feather_small' }, COIN_ICON = { acorns: 'acorn_icon', pebbles: 'pebble_icon', marbles: 'marble_icon', feathers: 'feather_icon' }, COIN_COL = { acorns: '#e8c080', pebbles: '#c8ccc0', marbles: '#8ac0f0', feathers: '#b0a0e0' };
const coinHere = () => REGION_COIN[room && room.def.region] || 'acorns';
function dropAcorn(x, y, vx, vy) {
  drops.push({ x, y, vx: vx ?? (Math.random() * 2 - 1) * 90, vy: vy ?? -160 - Math.random() * 120, t: 0, spin: Math.random() * 6, kind: coinHere() });
}
function updateDrops(dt) {
  for (const d of drops) {
    d.t += dt;
    const ddx = P.x - d.x, ddy = (P.y - 16) - d.y, dist = Math.hypot(ddx, ddy);
    if (d.t > 0.35 && dist < (wearing('magnet') ? 120 : 48) && phillAround()) { d.x += ddx * Math.min(1, dt * 9); d.y += ddy * Math.min(1, dt * 9); }   // pulled in
    else if (typeof isWater === 'function' && isWater(d.x, d.y)) { d.vx *= Math.pow(0.1, dt); d.x += d.vx * dt; d.vy = isWater(d.x, d.y - 5) ? -30 : 0; d.y += d.vy * dt; }   // in the water: they float up and bob at the top
    else {
      d.vy = Math.min(d.vy + 700 * dt, 400); d.x += d.vx * dt;
      if (boxSolid(d.x - 2, d.y - 2, d.x + 2, d.y + 2)) { d.x -= d.vx * dt; d.vx = -d.vx * 0.5; }
      d.y += d.vy * dt;
      if (boxSolid(d.x - 2, d.y - 2, d.x + 2, d.y + 2) || (d.vy > 0 && boxHas(d.x - 2, d.y, d.x + 2, d.y + 1, 2) && d.y % T < 4)) { d.y -= d.vy * dt; d.vy = Math.abs(d.vy) > 80 ? -d.vy * 0.4 : 0; d.vx *= 0.7; }
    }
    if (d.t > 0.35 && dist < 12) { d.got = true; gainCoin(d.kind || 'acorns', 1); }
  }
  for (let i = drops.length - 1; i >= 0; i--) if (drops[i].got) drops.splice(i, 1);
}
let acornFlash = 0;
function gainCoin(kind, n) { world[kind] = (world[kind] || 0) + n; acornFlash = 0.4; (kind === 'pebbles' ? sfx.pebble : kind === 'marbles' ? sfx.marble : kind === 'feathers' ? sfx.paper : kind === 'seeds' ? (sfx.seed || sfx.pebble) : sfx.acorn)(); saveWorld(); }
function gainAcorns(n) { gainCoin('acorns', n); }

// ---- drawing
// every region's sprite sheet: a picture's name says which sheet it's on
const SPRITE_SHEETS = [['art/rootwood/rootwood_sprites.png', () => window.RW_SPRITES], ['art/pond/pond_sprites.png', () => window.POND_SPRITES], ['art/playground/playground_sprites.png', () => window.PG_SPRITES], ['art/oak/oak_sprites.png', () => window.OAK_SPRITES], ['art/wildlife/wildlife.png', () => window.WILD_SPRITES]];
// the region sheets are small, so they stay loaded for good: acorns spilled in the oak, a pebble pile in the Playground,
// the coin icons on the HUD all come off whichever sheet drew them first, wherever he is
for (const [src] of SPRITE_SHEETS) Assets.use(src);
function sprSource(name, sheet) {
  if (sheet === 'sol') return [Assets.get('art/rootwood/soldier.png'), (window.SOLDIER_SPRITES || {})[name]];
  const pb = (window.POND_BOSSES && window.POND_BOSSES[name]) || (window.PG_BOSSES && window.PG_BOSSES[name]) || (window.OAK_BOSSES && window.OAK_BOSSES[name]) || (window.GREENHOUSE_BOSSES && window.GREENHOUSE_BOSSES[name]) || (window.HIVE_BOSSES && window.HIVE_BOSSES[name]);
  if (pb) return [Assets.get(pb[0]), pb.slice(1)];
  for (const [src, m] of SPRITE_SHEETS) { const meta = (m() || {})[name]; if (meta) return [Assets.get(src), meta]; }
  return [null, null];
}
function spr(name, x, y, flip, alpha, sheet) {
  const [im, meta] = sprSource(name, sheet);
  if (!im || !meta) { ctx.fillStyle = '#ff00ff'; ctx.fillRect(Math.round(x) - 4, Math.round(y) - 8, 8, 8); return; }
  const [sx, sy, w, h, ax, ay] = meta;
  if (alpha !== undefined) ctx.globalAlpha = alpha;
  if (flip) { ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(-1, 1); ctx.drawImage(im, sx, sy, w, h, -ax, -ay, w, h); ctx.restore(); }
  else ctx.drawImage(im, sx, sy, w, h, Math.round(x) - ax, Math.round(y) - ay, w, h);
  ctx.globalAlpha = 1;
}
function foeFrame(f) {
  const now = performance.now() / 1000;
  if (f.kind === 'cap') {
    switch (f.state) {
      case 'walk': return 'cap_walk_' + (Math.floor(now * 8) % 2 + 1);
      case 'wind': return 'cap_wind';
      case 'lunge': return 'cap_lunge';
      case 'snap2': return f.t < 0.14 ? 'cap_wind' : 'cap_lunge';
      case 'crouch': return 'cap_wind';
      case 'pounce': return 'cap_pounce';
      case 'tip': return 'cap_rim_1';
      case 'coin': return 'cap_rim_' + (Math.floor(f.spin || 0) % 2 + 1);
      case 'down': return 'cap_down';
      case 'stagger': case 'wobble': return 'cap_dizzy';
      default: return 'cap_walk_1';
    }
  }
  switch (f.state) {
    case 'aim': case 'shake': return 'can_aim';
    case 'spit': return 'can_spit';
    case 'fizz': return 'can_fizz';
    case 'tip': return 'can_tip';
    case 'roll': case 'lie': return 'can_roll_' + (f.state === 'lie' ? 1 : Math.floor(f.spin || 0) % 2 + 1);
    case 'down': return 'can_down';
    case 'stagger': return 'can_dizzy';
    case 'hop': return 'can_hop';
    default: return 'can_idle_' + (Math.floor(now * 3 + f.x) % 2 + 1);
  }
}
function drawFoes() {
  for (const f of foes) { if (f.state === 'hidden') continue; if (f.react) { ctx.save(); reactTransform(f); drawOneFoe(f); ctx.restore(); } else drawOneFoe(f); }
  for (const s of shots) { if (s.draw) { s.draw(s); continue; } spr(s.kind === 'blob' ? 'blob' : s.kind === 'pblob' ? 'pblob' : s.kind === 'ball' ? 'pblob' : s.kind === 'sand' ? 'sandball' : 'acorn_small', s.x, s.y, false); }
  for (const d of drops) spr(COIN_SPR[d.kind] || 'acorn_small', d.x, d.y + 3, false);
  drawSweeps(); if (typeof drawSparks === 'function') drawSparks(); drawImpacts();
}
function drawOneFoe(f) {
  {
    if (FOE[f.kind].draw) { FOE[f.kind].draw(f); return; }
    const shake = /wind$/.test(f.state) || f.state === 'aim' || f.state === 'crouch' || f.state === 'tip' || f.state === 'shake' ? Math.round(Math.sin(f.t * 60)) : 0;
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, FOE[f.kind].hw + 1, 1);
    spr(foeFrame(f), f.x + shake, f.y + f.yoff, f.f > 0);
    if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(foeFrame(f), f.x, f.y + f.yoff, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
    if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 7) - 1, Math.round(f.y - FOE[f.kind].h - 6 + Math.sin(a) * 2), 2, 2); }
  }
}

// the reaction, drawn: a quick hit shape (k rises fast and eases back, with a little overshoot), turned into a tilt, a
// squash or a shudder by what it's made of. Only here, round the drawing: foePose (what its attacks hit by) draws it
// plain, so a reaction never changes where its attacks reach
function reactTransform(f) {
  const r = f.react, u = r.t / r.dur, k = (u < 0.18 ? u / 0.18 : Math.cos((u - 0.18) / 0.82 * Math.PI * 1.25) * (1 - (u - 0.18) / 0.82)) * Math.min(1.6, r.p);
  const free = FOE[f.kind].free, px = f.x, py = free ? f.y - FOE[f.kind].h / 2 + (f.yoff || 0) : f.y + (f.yoff || 0), d = r.dir;
  let rot = 0, sx = 1, sy = 1, ox = 0, oy = 0;
  if (r.braced) ox = Math.round(Math.sin(r.t * 90) * 1.5 * Math.min(1, r.p));           // bracing: a shudder, it doesn't give
  else switch (r.mat) {
    case 'tip': rot = d * 0.42 * k; oy = -2 * Math.max(0, k); break;                     // tips back on its rim
    case 'rattle': rot = d * 0.12 * k; ox = Math.round(Math.sin(r.t * 70) * 1.5 * Math.abs(k)); sx = 1 - 0.08 * k; break;
    case 'glass': rot = d * 0.1 * k; ox = Math.round(Math.sin(r.t * 80) * Math.abs(k)); break;
    case 'crinkle': rot = d * 0.22 * k * Math.cos(r.t * 40); sx = 1 - 0.22 * Math.abs(k); sy = 1 + 0.08 * Math.abs(k); break;   // twists and scrunches
    case 'squish': sx = 1 + 0.28 * k; sy = 1 - 0.26 * k; break;                         // squashes flat and springs back
    case 'cloth': rot = d * 0.18 * k; sx = 1 - 0.1 * k; break;
    default: rot = d * 0.16 * k; sx = 1 + 0.08 * k; sy = 1 - 0.08 * k;                  // hard plastic flexes away
  }
  ctx.translate(px + ox, py + oy); ctx.rotate(rot); ctx.scale(sx, sy); ctx.translate(-px, -py);
}
// where the sword meets a box: the middle of the bit of blade that's inside it (the plain box's nearest point if the
// sword's shape isn't known)
function swordContact(fb) {
  const ls = typeof swordLines === 'function' ? swordLines() : null;
  if (ls) {
    let sx = 0, sy = 0, n = 0;
    for (const [x0, y0, x1, y1] of ls) { const m = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 3)); for (let i = 0; i <= m; i++) { const x = x0 + (x1 - x0) * i / m, y = y0 + (y1 - y0) * i / m; if (x >= fb.l - 2 && x <= fb.r + 2 && y >= fb.t - 2 && y <= fb.b + 2) { sx += x; sy += y; n++; } } }
    if (n) return [sx / n, sy / n];
  }
  return [Math.max(fb.l, Math.min(fb.r, P.x + P.facing * 18)), Math.max(fb.t, Math.min(fb.b, P.y - 20))];
}

// ---- an enemy's hit is where its drawing is (10/16/2026) ----
// An attack's box says where it's meant to reach. On its own that's a plain rectangle, often reaching where nothing's
// drawn, so a hit could land before (or past) the jaws or the rope that's meant to be doing it. Now it only lands where
// the box and Phill overlap AND the enemy, as it's drawn right then, is solid there: its picture's actual pixels (from
// art/hitmasks.js), turned, flipped and stretched however it's drawn, plus anything it draws itself in solid color (a
// rope, a whip). Its shadow and anything see-through don't count. Turned on enemy by enemy (ART_HITS), region by region
const ART_HITS = new Set(['cap', 'can', 'spinner', 'wrapper', 'gum', 'lace', 'reacher', 'nwing', 'juice', 'fork', 'sponge',   // Rootwood's first
  'duck', 'bobber', 'bag', 'frog', 'straw', 'fishtoy', 'glove', 'pike', 'leech',                                    // the pond
  'teeth', 'jack', 'bucket', 'rope', 'balloon', 'horn',                                                            // the playground
  'plane', 'ball', 'shuttle', 'rings']);                                                                           // the oak
const maskCache = new Map();
function sheetMask(im) {
  if (!im || !window.HIT_MASKS) return null;
  if (maskCache.has(im)) return maskCache.get(im);
  let m = null; const src = decodeURIComponent((im.src || '').split('?')[0]);
  for (const k in HIT_MASKS) if (src.endsWith(k)) {
    const [w, h, rows] = HIT_MASKS[k], bits = new Uint8Array(w * h);
    rows.split('|').forEach((r, y) => { if (!r) return; let x = 0, on = false; for (const t of r.split(',')) { const n = parseInt(t, 36); if (on) bits.fill(1, y * w + x, y * w + x + n); x += n; on = !on; } });
    m = { w, h, bits }; break;
  }
  maskCache.set(im, m); return m;
}
const solidStyle = st => typeof st === 'string' && (!st.startsWith('rgba') || parseFloat(st.slice(st.lastIndexOf(',') + 1)) >= 0.9);
// what it draws right now, without drawing it: each picture and solid rectangle, with how it's placed (a matrix from
// the world to where it's drawn from)
function foePose(f) { return poseOf(() => drawOneFoe(f)); }
function poseOf(draw) {
  const rec = [], c = ctx, inv = () => { const m = c.getTransform().inverse(); return [m.a, m.b, m.c, m.d, m.e, m.f]; };
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0);
  c.drawImage = function (im, ...a) {
    let sx = 0, sy = 0, sw = im.width, sh = im.height, dx, dy, dw = im.width, dh = im.height;
    if (a.length >= 8) [sx, sy, sw, sh, dx, dy, dw, dh] = a; else if (a.length >= 4) [dx, dy, dw, dh] = a; else [dx, dy] = a;
    if (c.globalAlpha >= 0.5 && dw && dh) rec.push({ im, sx, sy, sw, sh, dx, dy, dw, dh, m: inv() });
  };
  c.fillRect = function (x, y, w, h) { if (c.globalAlpha >= 0.9 && solidStyle(c.fillStyle)) rec.push({ x: Math.min(x, x + w), y: Math.min(y, y + h), w: Math.abs(w), h: Math.abs(h), m: inv() }); };
  c.fill = c.stroke = c.strokeRect = c.fillText = c.strokeText = () => {};
  try { draw(); } catch (e) {}
  finally { for (const k of ['drawImage', 'fillRect', 'fill', 'stroke', 'strokeRect', 'fillText', 'strokeText']) delete c[k]; c.restore(); }
  return rec;
}
// is any of what it draws solid inside box b (the part of the attack's box that's on Phill)
function artIn(rec, b) {
  for (let y = Math.floor(b.t) + 0.5; y < b.b; y++) for (let x = Math.floor(b.l) + 0.5; x < b.r; x++) for (const d of rec) {
    const [a, bb, cc, dd, e, ff] = d.m, px = a * x + cc * y + e, py = bb * x + dd * y + ff;
    if (d.im) {
      if (px < d.dx || py < d.dy || px >= d.dx + d.dw || py >= d.dy + d.dh) continue;
      const mk = sheetMask(d.im); if (!mk) return true;                          // (a picture we've no mask for: all of it counts)
      const u = Math.floor(d.sx + (px - d.dx) * d.sw / d.dw), v = Math.floor(d.sy + (py - d.dy) * d.sh / d.dh);
      if (mk.bits[v * mk.w + u]) return true;
    } else if (px >= d.x && px < d.x + d.w && py >= d.y && py < d.y + d.h) return true;
  }
  return false;
}
// does attack box `box` really reach Phill: on him, and on something it's drawing
function artHit(f, box) {
  const body = { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y };
  if (!overlap(box, body)) return false;
  if (!ART_HITS.has(f.kind) || box.area) return true;                            // (area: a wave, a puff, something that isn't drawn as part of it)
  const rec = foePose(f); if (!rec.length) return true;
  return artIn(rec, { l: Math.max(box.l, body.l), r: Math.min(box.r, body.r), t: Math.max(box.t, body.t), b: Math.min(box.b, body.b) });
}
// the bosses the same way (10/16/2026): an attack of theirs only lands where what drawBoss() draws is on him. body: the
// part of him it's checked against (walking into the tin soldier leaves him a little room), his whole body otherwise
function bossHit(box, body) {
  body = body || { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y };
  if (!overlap(box, body)) return false;
  if (box.area) return true;
  const rec = poseOf(drawBoss); if (!rec.length) return true;
  return artIn(rec, { l: Math.max(box.l, body.l), r: Math.min(box.r, body.r), t: Math.max(box.t, body.t), b: Math.min(box.b, body.b) });
}
