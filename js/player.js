'use strict';
// ---------- Phill ----------
// Ported from Phill's Test Room. Everything he does is here; which moves he's allowed is in world.js (can()).
const STAND_H = 36, ROLL_H = 20, HW = 8, CLIMB_T = 0.3;
let HANG_FEET = 37;                                // how far his feet hang below his hand (set from the sprite sheet)
const P = {};
function newPlayer(x, y, f) {
  for (const k in P) delete P[k];
  Object.assign(P, {
    x, y, vx: 0, vy: 0, h: STAND_H, facing: f, ground: true, wasGround: true,
    coyoteT: 0, jumpBufT: 0, atkBufT: 0, dodgeBufT: 0, jumpHeld: false,
    atk: null, atkCD: 0, roll: 0, rollDir: 1, rollCD: 0, dash: 0, dashUsed: false, dropT: 0,
    inv: 0, hurtT: 0, respawnT: 0, health: world.maxHealth, landT: 0, turnT: 0, lookT: 0, recoilT: 0, recoilV: 0,
    maxHealth: world.maxHealth, safeX: x, safeY: y, safeT: 0, runDist: 0, guardDist: 0, dashRec: 0, ghostT: 0, hang: null, reach: null, regrabT: 0, rollEndT: 0, crawl: false, crawlDist: 0, guardOut: false, stamFlash: 0, stam: 100, stamDelay: 0, en: 100, enDelay: 0, enFlash: 0, winded: false, tiredT: 0, gbreak: 0, charge: 0, atkHeldT: 0, downCD: 0, splat: 0, fallTop: y, winceT: 0, winceNext: 1, ko: 0, koLanded: false, fadeIn: 0, parryT: 0, parryCD: 0, guardWas: false, edgeT: 0, teeter: false, wallPogoUsed: false, guardLock: false, idleT: 0, blockT: 0, px: x, py: y,
    story: null, worn: 0, loose: 0, looseBits: 0,
  });
}
// coming in through a door: same Phill (health, stamina), new spot, anything he was in the middle of is dropped
function placePlayer(x, y, f) {
  if (P.x === undefined) newPlayer(x, y, f);
  const keep = { health: P.health, maxHealth: P.maxHealth, en: P.en, stam: P.stam, story: P.story, worn: P.worn || 0, loose: P.loose || 0, looseBits: P.looseBits || 0, looseT: P.looseT || 0, looseMax: P.looseMax || 0, slid: P.slid || false, sheathed: P.sheathed || false, calmT: P.calmT || 0 };   // (gear put away stays put away through a door)
  newPlayer(x, y, f); Object.assign(P, keep);
  P.crawl = !hasHeadroom(STAND_H); if (P.crawl) P.h = ROLL_H;
}
const ghosts = [];
const CRITICAL = 0.3;   // at or under this much of his health he's hurting
const critical = () => P.health / P.maxHealth <= CRITICAL;

const hasHeadroom = h => !boxSolid(P.x - HW, P.y - h, P.x + HW, P.y);   // (standing up: the standing box, where he'll be)
// lying down, crawling or swimming, his box runs from his feet to the end of his nose (10/15/2026: it was the
// standing width, so his head went into walls). Measured off the frames: crawling, 11 px behind where he stands and 31
// in front; swimming, 21 behind and 22 in front. Straight up or down in the water (dive) he's narrow again
const CRAWL_BACK = 11, CRAWL_FRONT = 31, SWIM_BACK = 21, SWIM_FRONT = 22, CRAWL_MID = (CRAWL_FRONT - CRAWL_BACK) / 2;
const lying = () => (P.swim && !P.dive) || (P.crawl && !P.swim);
function bodyExt() {                                     // [behind, in front] of where he stands
  if (P.swim && !P.dive) return [SWIM_BACK, SWIM_FRONT];
  if (P.crawl) return [CRAWL_BACK, CRAWL_FRONT];
  return [HW, HW];
}
const bodyL = x => { const [b, f] = bodyExt(); return x - (P.facing > 0 ? b : f); };
const bodyR = x => { const [b, f] = bodyExt(); return x + (P.facing > 0 ? f : b); };
// what he rests on: under his belly crawling (so he tips off a ledge at his middle, not hanging out over it on his
// nose), all of him swimming, his feet otherwise
const restL = x => P.crawl && !P.swim ? x + P.facing * CRAWL_MID - HW : P.swim && !P.dive ? bodyL(x) : x - HW;
const restR = x => P.crawl && !P.swim ? x + P.facing * CRAWL_MID + HW : P.swim && !P.dive ? bodyR(x) : x + HW;
// would he be into something with his feet at x, between top and bot? Crawling, his head and feet stick out past his
// belly, and those ends don't count the bottom 8 px (a little bump in the floor under his chin doesn't stop him, a wall does)
const CRAWL_LIFT = 8;
function bodyHit(x, top, bot) {
  if (P.crawl && !P.swim) return boxSolid(restL(x), top, restR(x), bot) || boxSolid(bodyL(x), top, bodyR(x), bot - CRAWL_LIFT);
  return boxSolid(bodyL(x), top, bodyR(x), bot);
}
// stuck inside something, however he got there (10/15/2026: rolled up under a low roof he ended up in it, and the
// landing kept lifting him 3 px a frame till he was out the top of the room). Out to the nearest spot he fits, sideways
// or down before up (push him the way there's nothing solid), never more than 24 px
const UNSTICK = (() => {
  const c = [];
  for (let dy = -24; dy <= 24; dy++) for (let dx = -24; dx <= 24; dx++) if (dx || dy) c.push([dx, dy, Math.hypot(dx, dy) + (dy < 0 ? 0.5 : 0)]);
  return c.sort((a, b) => a[2] - b[2]);
})();
function unstick() {
  // only something in him above his feet counts: feet a pixel or two into the ground is just standing (the landing and the
  // step up sort that out). The case in my video was his head in the roof (10/15/2026)
  if (P.hang || P.cling || P.held || P.reach || P.ko > 0 || !bodyHit(P.x, P.y - P.h, P.y - STEP_UP)) return false;
  if (P.ground && !P.crawl && !P.swim && P.roll <= 0 && P.dash <= 0) {        // on the ground with no room to stand: down on his belly if that fits
    const h0 = P.h; P.crawl = true; P.h = ROLL_H;
    if (!bodyHit(P.x, P.y - P.h, P.y)) { P.crawlDist = 0; P.vx = 0; P.atk = null; return true; }
    P.crawl = false; P.h = h0;
  }
  // the one-way slopes he's on or above: wherever he's moved to, he has to still be on or above them (never under one)
  const lineAt = (rp, x) => { const xi = Math.round(x); return xi < rp.x0 || xi > rp.x1 ? null : rp.ys[xi - rp.x0]; };
  const over = P.dropT <= 0 && room.ramps ? room.ramps.filter(rp => { const ly = lineAt(rp, P.x); return ly !== null && P.y <= ly + 0.5; }) : [];
  for (const [dx, dy] of UNSTICK) {
    if (bodyHit(P.x + dx, P.y + dy - P.h, P.y + dy)) continue;
    if (over.some(rp => { const ly = lineAt(rp, P.x + dx); return ly !== null && P.y + dy > ly + 0.5; })) continue;
    P.x += dx; P.y += dy; if (dy < 0) P.vy = Math.max(P.vy, 0); return true;
  }
  return false;
}
// stuck into something after lying down, turning round or getting in the water: slide out along the way he's lying
function fitBody() {
  if (!lying() || !bodyHit(P.x, P.y - P.h, P.y)) return;
  for (let k = 1; k <= 26; k++) for (const s of [-P.facing, P.facing]) {
    if (!bodyHit(P.x + s * k, P.y - P.h, P.y)) { P.x += s * k; return; }
  }
}
// a bump on a wall's face (10/15/2026): since the natural ground the walls have little bumps on them, and
// he could hop up a wall bump by bump without the velcro. A bump is a few pixels of ground under one side of his feet
// with the wall going on up right beside them. That isn't somewhere he can stand: he slides off it, away from the wall.
// Floors, slopes, the dirt packed into corners and the lips of ledges all have more under him or no wall beside them,
// so they're the same as before. Returns which way he slides off (0: it's real ground)
const NUB_MAX = 4, NUB_WALL = [8, 14, 20];
function nubAt(x, y) {
  let l = 0, r = 0;
  const top = Math.abs(y - Math.round(y / T) * T) < 0.01;
  for (let px = Math.floor(x - HW); px < x + HW; px++) {
    if (solidPx(px, y) || solidPx(px, y + 0.999) || (top && tile(Math.floor(px / T), Math.round(y / T)) === 2) || rampY(px, y, 0.6, 0.6) !== null) { if (px < x) l++; else r++; }
  }
  const sup = l + r;
  if (!sup || sup > NUB_MAX) return 0;
  const s = r >= l ? 1 : -1;
  for (const k of NUB_WALL) {
    let wall = false;
    for (let d = HW; d <= HW + 4 && !wall; d++) wall = solidPx(x + s * d, y - k);
    if (!wall) return 0;
  }
  return -s;
}
const onRamp = () => P.dropT <= 0 && rampY(P.x, P.y, 0.6, 0.6) !== null;   // standing on a one-way slope
function onShelf() {   // standing right on top of a shelf
  if (onRamp() && !boxSolid(restL(P.x), P.y, restR(P.x), P.y + 1)) return true;
  if (P.y % T > 0.01) return false;
  const ty = P.y / T;
  return boxHas(restL(P.x), P.y, restR(P.x), P.y + 1, 2) && !boxSolid(restL(P.x), P.y, restR(P.x), P.y + 1) && tile(Math.floor(P.x / T), ty) !== 1;
}
function groundBelow() {
  if (onRamp()) return true;
  if (boxSolid(restL(P.x), P.y, restR(P.x), P.y + 1)) return !nubAt(P.x, P.y);
  return P.dropT <= 0 && Math.abs(P.y - Math.round(P.y / T) * T) < 0.01 && boxHas(restL(P.x), P.y, restR(P.x), P.y + 1, 2);
}

// moving him through the room a pixel at a time, so he meets the ground exactly where it's drawn (10/15/2026: the
// natural ground isn't whole tiles any more). Walking into a little rise he steps up onto it (STEP_UP), and walking
// over the top of one or down a dip he stays planted (the snap down in update)
const STEP_UP = 6, STEP_UP_AIR = 3, STEP_DOWN = 7;
// getting down to crawl because the way on is too low to stand (on a slope, where the usual check by his feet can't see
// it coming): only if he'd fit lying down there
function crawlInto(nx, ny) {
  const h0 = P.h;
  P.crawl = true; P.h = ROLL_H;
  if (bodyHit(nx, ny - P.h, ny)) { P.crawl = false; P.h = h0; return false; }     // back to however tall he was (10/15/2026: mid roll this stood him up into the roof)
  P.crawlDist = 0; P.vx *= 0.4; puff(P.x, P.y, 3, 20); sfx.land();
  return true;
}
function moveX(dx) {
  if (!dx) return;
  const s = Math.sign(dx);
  let left = Math.abs(dx);
  while (left > 0) {
    const d = Math.min(1, left) * s; left -= Math.abs(d);
    const nx = P.x + d;
    if (P.ground && P.dropT <= 0 && room.ramps.length) {                     // along a one-way slope, or stepping up onto one
      const on = onRamp(), sy = rampY(nx, P.y, on ? 4 : 0.5, STEP_UP);
      if (sy !== null) {
        if (!bodyHit(nx, sy - P.h, sy)) { P.x = nx; P.y = sy; continue; }
        // the slope runs up under something too low to stand: he gets down and crawls on up it (10/15/2026),
        // and only stops where there's no room even lying down. Walking on at the same height put him under the slope
        if (!P.crawl && !P.swim && !P.atk && P.roll <= 0 && P.dash <= 0 && P.charge <= 0 && crawlInto(nx, sy)) { P.x = nx; P.y = sy; continue; }
        if (on) { P.vx = 0; return; }
      }
    }
    if (!P.ground && P.dropT <= 0 && room.ramps.length) {                    // in the air (a hop, a dash, falling at a slant): his feet crossing
      const sy = rampCross(P.x, nx, P.y);                                     // down through a one-way slope from above put him back on top of it
      if (sy !== null) {
        if (!bodyHit(nx, sy - P.h, sy)) { P.x = nx; P.y = sy; continue; }
        P.vx = 0; return;                                                     // no room over it (the roof comes down low): it stops him like a wall
      }
    }
    if (!bodyHit(nx, P.y - P.h, P.y)) { P.x = nx; continue; }
    const up = P.ground ? STEP_UP : P.vy >= 0 ? STEP_UP_AIR : 0;
    let stepped = false;
    for (let k = 1; k <= up; k++) {
      if (!bodyHit(nx, P.y - k - P.h, P.y - k)) {
        if (nubAt(nx, P.y - k)) break;                                        // not up onto a bump on a wall
        P.x = nx; P.y -= k; stepped = true; break;
      }
    }
    if (stepped) continue;
    // a little rise with a low roof over it: too low to stand up on, room to crawl up onto it. He gets down and crawls,
    // the same as walking into a low gap (the terrain audit, 10/17/2026: he stopped there, and only a roll got him through)
    if (P.ground && !P.crawl && !P.swim && !P.atk && P.roll <= 0 && P.dash <= 0 && P.charge <= 0 && !(typeof DBG !== 'undefined' && (DBG.fly || DBG.noclip))) {
      for (let k = 1; k <= up && !stepped; k++) if (!nubAt(nx, P.y - k) && crawlInto(nx, P.y - k)) { P.x = nx; P.y -= k; stepped = true; }
    }
    if (stepped) continue;
    // in the air with his head catching a crumb of a roof's crumbly edge (not a real tile): duck under it, up to 4px
    if (!P.ground && !boxHas(bodyL(nx), P.y - P.h, bodyR(nx), P.y - P.h + 5, 1)) {
      const ry = P.dropT <= 0 && room.ramps.length ? rampY(nx, P.y, 4.5, 0.5) : null;     // never ducking his feet down through a one-way slope
      for (let k = 1; k <= 4; k++) {
        if (ry !== null && P.y + k > ry) break;
        if (!bodyHit(nx, P.y + k - P.h, P.y + k)) { P.x = nx; P.y += k; stepped = true; break; }
      }
    }
    if (stepped) continue;
    P.vx = 0; return;
  }
}
function moveY(dy) {
  if (!dy) return false;
  const s = Math.sign(dy);
  let left = Math.abs(dy);
  while (left > 0) {
    const d = Math.min(1, left) * s; left -= Math.abs(d);
    const ny = P.y + d;
    if (s > 0) {
      if (boxSolid(restL(P.x), ny - P.h, restR(P.x), ny)) {                     // landed: feet right on the ground's top pixel
        let y = Math.floor(ny);
        for (let k = 0; k < 3 && boxSolid(restL(P.x), y - P.h, restR(P.x), y); k++) y--;
        const away = nubAt(P.x, Math.max(y, Math.min(P.y, y)));
        if (away) {                                                           // a bump on a wall: slide off it and keep falling
          let slid = false;
          for (let k = 1; k <= 3 && !slid; k++) if (!boxSolid(restL(P.x + away * k), ny - P.h, restR(P.x + away * k), ny)) { P.x += away * k; P.y = ny; slid = true; }
          if (slid) continue;
        }
        P.y = Math.max(y, Math.min(P.y, y)); return true;
      }
      if (P.dropT <= 0 && room.ramps.length) {                                 // landing on a one-way slope
        const sy = rampY(P.x, P.y, ny - P.y + 0.01, 0.5);                     // (half a pixel of give above: he can be a hair under it from rounding)
        if (sy !== null && ny >= sy) { P.y = sy; return true; }
      }
      const row = Math.floor((ny - 0.001) / T);
      if (P.dropT <= 0 && P.y <= row * T + 0.01 && ny > row * T && boxHas(restL(P.x), row * T, restR(P.x), row * T + 1, 2)) { P.y = row * T; return true; }   // a shelf
      P.y = ny;
    } else {
      if (bodyHit(P.x, ny - P.h, ny)) {
        // bumped a crumb of the roof's crumbly edge: slide past it if it's only a pixel or so. Only past the edge's
        // bits (a real tile still bonks his head like always), and no more than 3px in one jump
        if (!boxHas(bodyL(P.x), ny - P.h, bodyR(P.x), ny, 1)) {
          const slid = P.cornerSlid || 0;
          for (const n of [1, -1, 2, -2, 3, -3]) {
            if (Math.abs(n) + slid > 3) continue;
            if (!bodyHit(P.x + n, ny - P.h, ny)) { P.x += n; P.y = ny; P.cornerSlid = slid + Math.abs(n); return false; }
          }
        }
        let y = Math.ceil(ny);
        for (let k = 0; k < 3 && bodyHit(P.x, y - P.h, y); k++) y++;
        if (!bodyHit(P.x, y - P.h, y)) P.y = Math.max(y, P.y - Math.abs(d));   // (wedged with no room under him either: stays put rather than being pushed down into the floor, 10/16/2026)
        P.vy = 0; return false;
      }
      P.y = ny;
    }
  }
  return false;
}
// walking over the top of a bump or down into a dip: keep his feet on the ground instead of stepping off into the air
function snapDown() {
  if (groundBelow()) return;
  const sy = P.dropT <= 0 ? rampY(P.x, P.y, STEP_DOWN, 0) : null;            // a one-way slope going down under him
  for (let k = 1; k <= STEP_DOWN; k++) {
    if (sy !== null && sy <= P.y + k - 1) { P.y = sy; return; }
    if (boxSolid(restL(P.x), P.y + k - 1, restR(P.x), P.y + k)) { if (!nubAt(P.x, P.y + k - 1)) P.y += k - 1; return; }
  }
  if (sy !== null) P.y = sy;
}

// blocking costs shield stamina. Run out and the guard breaks: lid knocked aside, dazed and open for a moment. After
// the first bit of it (GBREAK_FREE) he can roll out of the daze, or swing, instead of standing there
// (10/16/2026: rolling's the escape, and it costs a roll). The shield stays off till its bar's back to half either way
const GBREAK = 1.1, GBREAK_FREE = 0.33;
function blockHit(cost, fromX) {
  P.stam -= cost * (wearing('thimble') ? 0.6 : 1); P.stamDelay = 1.0;   // the thimble pin: blocks cost less
  if (P.stam > 0) return false;
  P.stam = 0; P.gbreak = GBREAK; P.guardOut = true; P.atk = null; P.charge = 0;   // guardOut: no shield until the bar's back to half (tune.guardBack)
  P.vx = Math.sign(P.x - fromX || -P.facing) * 120; P.recoilT = 0;
  hitstop = Math.max(hitstop, 0.1); shakeT = 0.15; shakeA = 3; sfx.guardbreak();
  for (let i = 0; i < 10; i++) addPart({ x: P.x + P.facing * 12, y: P.y - 26, vx: (Math.random() * 2 - 1) * 120, vy: -40 - Math.random() * 100, life: 0.4, max: 0.4, c: i % 2 ? '#c8925a' : '#e2b47e', s: 2, g: 400 });
  popup(P.x, P.y - 54, 'guard broken!', '#ff8a6b');
  return true;
}
// dodges are only untouchable in the middle: too early or too late and you still get hit
function dodgeSafe() {
  if (P.roll > 0) { const e = tune.rollTime * (P.rollTired ? 0.7 : 1) - P.roll; return e >= tune.iframeStart && e < tune.iframeStart + tune.iframeLen * (P.rollTired ? 0.4 : 1); }   // (out of breath: barely)
  if (P.dash > 0) { const e = 0.15 * (P.dashTired ? 0.6 : 1) - P.dash; return e >= 0.02 && e < (P.dashTired ? 0.05 : 0.10); }
  if (P.swim && P.swimDash > 0) { const e = (P.dashTired ? 0.12 : 0.2) - P.swimDash; return e >= 0.02 && e < (P.dashTired ? 0.06 : 0.14); }   // the dash underwater gets him through things too (the bath fish's lunge)
  return false;
}
// true when the hit really landed. False when it didn't (mid roll, still flashing from the last hit): then whatever came
// with it, a grab, a slow, a pull, doesn't happen either (the enemy audit, 10/17/2026: the sand bucket was pinning him
// through a roll that the hit itself missed)
function hurt(fromX, kind, dmg = 1) {
  if (P.inv > 0 || dodgeSafe() || P.respawnT > 0 || P.ko > 0 || P.chute) return false;   // nothing gets him on the way down the slide
  if (mapView) closeMapNow();
  // his fluff: what this hit knocks out he can still win back by fighting. Anything still loose from the hit before is
  // locked in now: it wears his most health down until he sews himself up at a resting spot
  if (P.loose > 0) { P.worn = Math.min(world.maxHealth - 1, P.worn + P.loose); P.maxHealth = world.maxHealth - P.worn; }
  P.loose = Math.min(dmg, P.health); P.looseBits = 0; P.looseT = tune.rallyTime; P.looseMax = tune.rallyTime;
  // the first time any's knocked loose, a note over him says what it is (the teaching audit, 10/18/2026: it only ever said
  // so after he'd already won some back). It stays up till he's won a puff back once
  if (P.loose > 0 && P.health > 0 && !world.flags.rallyTold && !world.flags.ralliedOnce && world.has.gear && room) {
    world.flags.rallyTold = true; saveWorld();
    room.hints.push({ text: 'fluff knocked loose can still be won back. hit back before it settles. resting sews him up', l: 0, t: 0, r: room.pxW, b: room.pxH + 40, follow: true, a: 0, until: 'ralliedOnce', life: 9 });
  }
  P.combo = 0; P.health = Math.max(0, P.health - dmg); P.inv = 1.1; P.hurtT = 0.3; P.atk = null; P.roll = 0; P.dash = 0; P.atkPress = false; P.charge = 0; if (!P.swim) { P.h = hasHeadroom(STAND_H) ? STAND_H : ROLL_H; P.crawl = !hasHeadroom(STAND_H); } P.hang = null; P.cling = null; P.reach = null; P.regrabT = 0.4; P.splat = 0; P.airHang = null; P.flop = null; P.sparkT = 0; if (P.health <= 0) P.pinned = null;   // (in the water he stays swimming size)
  const dir = Math.sign(P.x - fromX) || -P.facing;
  P.vx = dir * 170; P.vy = -230; P.facing = -dir;
  if (wearing('shell')) { P.vx = dir * 50; P.vy = -90; }            // the snail shell pin: hits hardly move him
  if (kind === 'water') { P.vx = 0; P.vy = 0; P.hurtT = 0; if (P.health <= 0) { P.x = P.safeX; P.y = P.safeY; P.px = P.x; P.py = P.y; cam.snap = true; } }   // sank: he comes up where he last stood
  hitstop = 0.06; shakeT = 0.18; shakeA = 3;
  puff(P.x, P.y - 22, 8, 70, '#ffffff', 80);           // a bit of his fluff comes out
  sfx.hurt();
  if (P.health <= 0) {                               // knocked out: flung back, then flat out for a bit
    P.ko = 0.001; P.koBy = kind; P.koLanded = false; P.vy = -280; P.vx = dir * 150; P.inv = 9; hitstop = 0.15; shakeT = 0.2; shakeA = 3;
    puff(P.x, P.y - 22, 16, 110, '#ffffff', 120); sfx.ko();
  } else if (kind === 'tacks') P.respawnT = 0.45;
  else if (kind === 'water') P.respawnT = 0.5;
  return true;
}

// frames: when each picture ends. on/off: when the sword can hit. lunge: when the swing drags him forward.
// reach: how long a down swing can still catch the ground under him for a bounce
const ATK = {
  side: { name: 'slash', frames: [0.06, 0.13, 0.24, 0.34], on: 0.06, off: 0.15, lunge: [0.04, 0.17] },
  up:   { name: 'up', frames: [0.05, 0.13, 0.30], on: 0.05, off: 0.16, reach: 16 },   // reach: more past the drawn blade than a plain swing (keeps what each one reached before its hits followed the sword, 10/16/2026)
  down: { name: 'down', frames: [0.04, 0.12, 0.28], on: 0.04, off: 0.13, reach: 0.12 },   // only the swing itself bounces: the sword hanging down afterward doesn't count
  low:  { name: 'low', frames: [0.06, 0.13, 0.30], on: 0.07, off: 0.16, lunge: [0.05, 0.14] },
  // out of a roll or air dodge: he throws everything into it and carries on in the direction he was going
  rollslash: { name: 'rollslash', frames: [0.05, 0.15, 0.27, 0.42], on: 0.05, off: 0.2, lunge: [0, 0.22], lungeSpeed: 210, float: 0.16, reach: 10 },
  // the charged attack: everything he's got, a huge sweep out in front
  charged: { name: 'rollslash', frames: [0.06, 0.18, 0.32, 0.5], on: 0.06, off: 0.26, lunge: [0.02, 0.26], lungeSpeed: 270, float: 0.2, reach: 26, charged: true },
  // lying down (10/15/2026): a jab along the floor out past his nose, low and long
  crawl: { name: 'crawlatk', frames: [0.07, 0.15, 0.27, 0.36], on: 0.07, off: 0.18 },
  // the combo (10/16/2026): the slash, then a chop, then a whirl, each press soon after the last. He's a plush,
  // so they're clumsy: the chop flops him forward onto it, the whirl takes him round too far and leaves him seeing stars
  chop: { name: 'chop', frames: [0.09, 0.16, 0.28, 0.40], on: 0.09, off: 0.22, lunge: [0.07, 0.17], lungeSpeed: 90 },
  whirl: { name: 'whirl', frames: [0.10, 0.17, 0.24, 0.38, 0.52], on: 0.10, off: 0.26, shove: 260 },
  // the combo's charged steps (10/16/2026: swing, swing, charge should be a charged whirl): the chop and the
  // whirl with everything he's got behind them. Charged from rest it's still the big sweep above (charged)
  chargedchop: { name: 'chop', frames: [0.08, 0.16, 0.31, 0.48], on: 0.08, off: 0.26, lunge: [0.05, 0.2], lungeSpeed: 220, float: 0.2, reach: 16, charged: true },
  chargedwhirl: { name: 'whirl', frames: [0.08, 0.15, 0.23, 0.38, 0.58], on: 0.08, off: 0.3, lunge: [0.04, 0.2], lungeSpeed: 120, reach: 16, shove: 340, charged: true },   // (frame 3 is frame 2 drawn the other way round: the back half of going round)
};
// which swing comes next in the combo, and how long after a swing finishes the next press still carries it on
const COMBO = ['side', 'chop', 'whirl'], COMBO_GAP = 0.4;
// the lid up with nothing else going on (crawling and swimming use it; on his feet it's worked out where he moves)
const guardHeld = () => inp.guardH && !P.atk && P.gbreak <= 0 && !P.guardOut;
// his own stamina (separate from the shield's): only the roll and the air dodge use it (10/16/2026: swings
// costing it too meant mashing a few swings spent the roll he needed, and running dry left him unable to swing back.
// Swings are free now, held back by how long they take, and enemies keep attacking through plain hits instead).
// A full bar is three rolls. Rolling with less than a roll's worth left still rolls, just a short, clumsy one that's
// barely untouchable, so pressing it never does nothing
const COST = { roll: 'rollCost', airdodge: 'airDodgeCost' };
function spend(what) {
  const c = COST[what]; if (!c) return true;                                    // (a swing: free)
  const cost = tune[c];
  P.tiredDodge = P.en < cost;
  if (P.tiredDodge) {
    P.enFlash = 0.3; sfx.tired();
    if (P.tiredT <= 0) { popup(P.x, P.y - 54, 'out of breath', '#cfd6e6'); P.tiredT = 1.2; }
  }
  P.en = Math.max(0, P.en - cost); P.enDelay = tune.enDelay;
  if (P.en <= 0) { P.winded = true; P.enDelay = tune.enDelay + 0.6; }
  return true;
}
// charging starts the moment the button goes down (10/16/2026: it used to swing first, then charge). A press
// only waits like that when a charged swing could come of it: on his feet with nothing else held, or in the water.
// Up or down with it, in the air, crawling, straight out of a roll: it swings on the press like it always did
const CHARGE_SHOW = 0.1;                                                         // (a quick tap doesn't flash the charging pose first)
function holdToCharge() {
  if (!can('charge') || P.story || P.crawl || P.hang || P.cling || P.reach || P.roll > 0 || P.dash > 0 || P.ko > 0 || guardHeld()) return false;
  if (P.pinned || P.splat > 0 || P.sinkT > 0 || P.chute || P.held || P.respawnT > 0) return false;   // (mashing free of a hold, getting up after a fall: every press counts as it goes down)
  if (P.rollEndT > 0 && can('rollSlash')) return false;
  return P.swim || (P.ground && !inp.up && !inp.down && !inp.aimUp && !inp.aimDown);
}
function comboNext(step) { P.combo = (step + 1) % COMBO.length; P.comboT = ATK[P.atk.type].frames[ATK[P.atk.type].frames.length - 1] + COMBO_GAP; }
function chargedBurst(lv) {                                                      // a bigger flash of it the further into the combo
  shakeT = 0.12 + lv * 0.04; shakeA = 2 + lv;
  for (let i = 0; i < 10 * lv; i++) { const a = Math.random() * Math.PI * 2; addPart({ x: P.x + P.facing * 18, y: P.y - 26, vx: Math.cos(a) * (150 + lv * 50), vy: Math.sin(a) * (150 + lv * 50), life: 0.3, max: 0.3, c: i % 2 ? '#fff6d8' : '#ffd36b', s: 2, g: 0 }); }
}
function startAttack(type) {
  P.atk = { type, t: 0, hit: new Set(), whiff: true };
  P.atkCD = tune.attackCooldown + (type === 'rollslash' ? 0.08 : type === 'whirl' ? 0.2 : type === 'chop' ? 0.04 : 0); P.atkBufT = 0;   // the whirl leaves him dizzy a moment: mashing all three isn't free
  if (isCharged(type)) {
    if (!world.flags.chargedOnce) { world.flags.chargedOnce = true; saveWorld(); }
    P.atkCD = Math.max(0.55, ATK[type].frames[ATK[type].frames.length - 1] + 0.05); sfx.clack(); sfx.bigswing(); if (type === 'chargedwhirl') sfx.whirl(); puff(P.x - P.facing * 10, P.y, 12, 80); shakeT = 0.12; shakeA = 2;
    for (let i = 0; i < 18; i++) { const a = (i / 18) * Math.PI * 2; addPart({ x: P.x + P.facing * 14, y: P.y - 26, vx: Math.cos(a) * 160, vy: Math.sin(a) * 160, life: 0.25, max: 0.25, c: i % 2 ? '#fff6d8' : '#ffd36b', s: 2, g: 0 }); }
  } else if (type === 'rollslash') { sfx.bigswing(); puff(P.x - P.facing * 8, P.y, 6, 50); } else sfx.swing();
  // a swing in the air holds him about where he was for a moment (10/16/2026): not stopped dead, just going up
  // or down a lot slower while it's out. Less each swing till he lands again, so mashing it can't keep him up there
  if (!P.ground && !P.swim && !P.hang && !P.cling && (type === 'side' || type === 'chop' || type === 'up')) {
    const k = [1, 0.65, 0.35, 0.15][Math.min(3, P.hangN || 0)] * tune.airHang;
    P.hangN = (P.hangN || 0) + 1;
    if (k > 0) { P.airHang = { t: 0.28, k }; P.vy *= 1 - 0.55 * k; }
  }
}
function isCharged(t) { return !!(ATK[t] && ATK[t].charged); }
const CHARGED_STEP = ['charged', 'chargedchop', 'chargedwhirl'];               // charged on each step of the combo: the big sweep, the chop, the whirl
const atkLive = a => a.t >= ATK[a.type].on && a.t < ATK[a.type].off;
// where the sword is: the lines out from his hand that this frame's picture says (10/16/2026: the hits go where
// the sword goes, so each swing matters). Each one's stretched past the drawn blade by tune.swordReach (it's drawn short,
// for a plush, and his reach is what every enemy's tuned around) and fattened a few pixels either side (SWORD_R)
const SWORD_R = 5;
function swordLines() {
  const a = P.atk; if (!a || P.swim || P.crawl || typeof META === 'undefined' || !META || !META.hit) return null;
  const hits = META.hit[frameName()]; if (!hits) return null;
  const ox = Math.round(P.x) - (P.facing > 0 ? 30.5 : 33.5), oy = Math.round(P.y) - META.baseline, extra = (tune.swordReach ?? 14) + (ATK[a.type].reach || 0) + (a.level || 0) * 10;
  return hits.map(([hx, hy, tx, ty]) => { const dx = tx - hx, dy = ty - hy, L = Math.hypot(dx, dy) || 1, k = (L + extra) / L; return [ox + hx, oy + hy, ox + hx + dx * k, oy + hy + dy * k]; });
}
// a charged swing marks its sweep as it goes (combat readability, 10/17/2026): across the lines this frame's picture
// gives (the arc the blade's going through), from where the drawn blade ends out to the edge of where it hits (its
// stretch, plus SWORD_R). Once per picture and place. Just the picture of it (fx.js): the hits don't look at it
function sweepMark() {
  const a = P.atk, ls = swordLines(); if (!ls || !ls.length) return;
  const extra = (tune.swordReach ?? 14) + (ATK[a.type].reach || 0) + (a.level || 0) * 10;
  let mx = 0, my = 0;
  const lines = ls.map(([x0, y0, x1, y1]) => { const L = Math.hypot(x1 - x0, y1 - y0) || 1, ux = (x1 - x0) / L, uy = (y1 - y0) / L; mx += ux; my += uy; return { x0, y0, L, ux, uy }; });
  const m = Math.atan2(my, mx), ang = l => { let d = Math.atan2(l.uy, l.ux) - m; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
  lines.sort((p, q) => ang(p) - ang(q));
  const fan = lines.map(l => { const r = Math.max(0, l.L - extra); return [l.x0 + l.ux * r, l.y0 + l.uy * r, l.x0 + l.ux * (l.L + SWORD_R), l.y0 + l.uy * (l.L + SWORD_R)]; });
  const side = (l, s) => { const r = Math.max(0, l.L - extra), px = -l.uy * s * SWORD_R, py = l.ux * s * SWORD_R;   // its two ends widened by SWORD_R too, the way the hits are
    return [l.x0 + l.ux * r + px, l.y0 + l.uy * r + py, l.x0 + l.ux * (l.L + SWORD_R) + px, l.y0 + l.uy * (l.L + SWORD_R) + py]; };
  fan.unshift(side(lines[0], -1)); fan.push(side(lines[lines.length - 1], 1));
  sweepAdd(a, frameName() + ':' + Math.round(P.x) + ':' + Math.round(P.y), fan);
}
function swordHits(b) {                                                          // does the sword, as it is this frame, touch box b
  const ls = swordLines(); if (!ls) return true;                                 // (nothing to go on: the plain box decides)
  for (const [x0, y0, x1, y1] of ls) {
    const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 3));
    for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n; if (x >= b.l - SWORD_R && x <= b.r + SWORD_R && y >= b.t - SWORD_R && y <= b.b + SWORD_R) return true; }
  }
  return false;
}
function attackBox() {
  const a = P.atk, f = P.facing;
  const ls = swordLines();
  if (ls) { let l = 1e9, r = -1e9, t = 1e9, b = -1e9; for (const [x0, y0, x1, y1] of ls) { l = Math.min(l, x0, x1); r = Math.max(r, x0, x1); t = Math.min(t, y0, y1); b = Math.max(b, y0, y1); } return { l: l - SWORD_R, r: r + SWORD_R, t: t - SWORD_R, b: b + SWORD_R }; }
  const side = (x0, x1, t, b) => ({ l: Math.min(P.x + f * x0, P.x + f * x1), r: Math.max(P.x + f * x0, P.x + f * x1), t: P.y + t, b: P.y + b });
  if (P.swim) {                                                    // under water: out the way it's pointed, any of 8 (10/16/2026). Level, it's what it was: low and long out ahead
    const ax = a.ax ?? f, ay = a.ay ?? 0, big = a.type === 'charged' ? 1.35 : 1, cx = P.x + ax * 20 * big, cy = P.y - 9 + ay * 20 * big;
    const hx = (ax && ay ? 23 : ax ? 26 : 19) * big, hy = (ax && ay ? 23 : ay ? 26 : 19) * big;
    return { l: cx - hx, r: cx + hx, t: cy - hy, b: cy + hy };
  }
  if (a.type === 'crawl') return side(8, 50, -18, 2);          // lying down: a jab along the floor out past his nose
  if (a.type === 'charged') return side(-8, 76, -64, 8);
  if (a.type === 'rollslash') return side(-4, 58, -48, 4);
  if (a.type === 'side') return side(-8, 44, -56, 4);          // wide arc: from low behind him, under and out in front, rising up
  if (a.type === 'up') return side(-26, 26, -92, -20);
  if (a.type === 'low') return side(0, 42, -30, 4);
  return { l: P.x - 20, r: P.x + 20, t: P.y - 10, b: P.y + 24 };   // as far as the sword actually reaches under him
}

function update(dt) {
  maskInput();
  if (P.held) {                                      // carried by something in a scene: he goes where it goes
    const a = actors[P.held];
    if (a) { P.px = P.x; P.py = P.y; P.x = a.x; P.y = a.y + 40; }
    P.vx = P.vy = 0; P.fallTop = P.y; P.atk = null;
    updateStory(dt); stepWorld(dt); return;
  }
  updateIdle(dt);                                    // left standing around a while: one of his little idle bits (anything pressed stops it)
  updateSheathe(dt);                                 // his sword and shield going away on his back, or coming back out
  // presses become short buffers, so an early press still counts
  if (inp.jumpP) P.jumpBufT = tune.jumpBuffer;
  if (inp.atkP) {                                                                 // a swing that can be charged waits for the button to come back up (it swings then, or lets the charge go)
    if (!holdToCharge()) P.atkBufT = 0.12;
    else if (tune.pressSwing) { P.atkBufT = 0.12; P.atkPress = true; P.pressSwung = true; }   // (the other way to try, in Tuning: it swings on the press, and holding on after charges the next one)
    else P.atkPress = true;
  }
  if (inp.dodgeP) P.dodgeBufT = 0.1;
  if (P.slowT > 0 && (inp.atkP || inp.jumpP)) P.slowT = Math.max(0, P.slowT - 0.3);   // wrapped up or gummed: every press shakes some of it off (10/16/2026)
  if (inp.lockP && inp.guardH && !P.guardOut) { P.guardLock = !P.guardLock; sfx.lock(); }
  // the parry window starts when the lid can actually come up (the combat review, 10/17/2026: pressed during a swing, its
  // window ran out before the swing was done, so it never got a chance). Pressed mid swing, it waits for the swing's
  // hitting part to end (a little while at most), then the window opens
  // The cooldown only starts when a window actually opens (the input audit, 10/17/2026): a press mid swing let go before
  // the lid could come up used to spend it anyway, so a fresh press right as the swing ended couldn't parry
  if (inp.guardH && can('parry') && !P.guardWas && P.parryCD <= 0 && !P.guardOut && P.gbreak <= 0) {
    if (P.atk && P.atk.t < ATK[P.atk.type].off) P.parryQ = Math.min(0.3, ATK[P.atk.type].off - P.atk.t + 0.05);
    else { P.parryT = tune.parryWindow; P.parryCD = 0.35; }
  }
  P.guardWas = inp.guardH;
  if (!inp.guardH) P.guardLock = false;
  const upP = inp.upP, mapP = inp.mapP;
  if (inp.squeakP) { P.squeakBuf = 0.15; P.squeakDown = !!inp.down; } if (inp.spinP) P.spinBuf = 0.15;   // (squeakDown: down held as it was pressed means the burst, whatever's held by the time it goes)           // (kept a moment, like the other presses: one made during a hit's little pause was being lost, the combat review 10/17/2026)
  if (inp.sparkP) P.sparkBuf = 0.15;
  inp.jumpP = inp.atkP = inp.dodgeP = inp.lockP = inp.upP = inp.downP = inp.mapP = inp.guardP = inp.squeakP = inp.spinP = inp.sparkP = 0;
  if (hitstop > 0) { hitstop -= dt; return; }
  P.squeakBuf = Math.max(0, (P.squeakBuf || 0) - dt); P.spinBuf = Math.max(0, (P.spinBuf || 0) - dt);
  const squeakP = P.squeakBuf > 0 && P.squeakCD <= 0, spinP = P.spinBuf > 0 && P.squeakCD <= 0;
  // the shield comes up once a swing's hitting part is over, like the roll (it waited for the whole swing to finish)
  if (inp.guardH && P.atk && P.atk.t >= ATK[P.atk.type].off && can('guard') && P.gbreak <= 0 && !P.guardOut && !P.swim) P.atk = null;
  if (P.parryQ > 0) { P.parryQ -= dt; if (!P.atk && inp.guardH && !P.guardOut && P.gbreak <= 0) { P.parryT = tune.parryWindow; P.parryCD = 0.35; P.parryQ = 0; } else if (P.parryQ <= 0 || !inp.guardH) P.parryQ = 0; }
  P.px = P.x; P.py = P.y;
  for (const k of ['jumpBufT', 'atkBufT', 'dodgeBufT', 'atkCD', 'rollCD', 'inv', 'landT', 'turnT', 'dropT', 'recoilT', 'blockT', 'dashRec', 'regrabT', 'rollEndT', 'parryT', 'parryCD', 'fadeIn', 'downCD', 'stamFlash', 'wallJumpT', 'clingCD', 'slowT']) P[k] = Math.max(0, (P[k] || 0) - dt);
  if (P.soggyT > 0 || P.dripT > 0) {                                                         // wrung out at the pond (slow with it), or just out of a swim: water dripping off him for a while
    P.soggyT = Math.max(0, (P.soggyT || 0) - dt); P.dripT = Math.max(0, (P.dripT || 0) - dt);
    if (!P.swim && Math.random() < dt * (P.soggyT > 2 ? 9 : 4)) part(P.x + (Math.random() * 2 - 1) * 8, P.y - 6 - Math.random() * 22, (Math.random() * 2 - 1) * 6, 30, 0.5, Math.random() < 0.5 ? '#9cd4e8' : '#c4e6f0', 1, 400);
  }
  P.leapT = Math.max(0, (P.leapT || 0) - dt);
  // rally only lasts a few seconds after the hit (a friend's playtest, 10/14/2026: he could get hit, walk off a few
  // screens and win it all back off the next enemy). Hit back in time or it's gone: the loose fluff gets worn in
  if (P.loose > 0 && !(P.story && !P.story.free) && P.ko <= 0) {
    P.looseT = (P.looseT || 0) - dt;
    if (P.looseT <= 0) {
      P.worn = Math.min(world.maxHealth - 1, P.worn + P.loose); P.maxHealth = world.maxHealth - P.worn;
      P.loose = 0; P.looseBits = 0; sfx.tired();
    }
  }
  P.squeakT = Math.max(0, (P.squeakT || 0) - dt); P.squeakCD = Math.max(0, (P.squeakCD || 0) - dt); P.spinT = Math.max(0, (P.spinT || 0) - dt); P.burstT = Math.max(0, (P.burstT || 0) - dt);
  if (!inp.jumpH) P.jumpHeld = false;
  // his stamina comes back once he stops for a moment. Winded (ran it dry): panting until it's back to a third
  P.tiredT = Math.max(0, P.tiredT - dt); P.enFlash = Math.max(0, P.enFlash - dt);
  if (P.enDelay > 0) P.enDelay -= dt;
  else P.en = Math.min(100, P.en + tune.enRegen * dt);                               // (swinging and charging don't hold it back)
  if (P.winded && P.en >= 34) P.winded = false;
  if (P.winded && Math.random() < dt * 5 && P.ko <= 0) addPart({ x: P.x + P.facing * 12, y: P.y - 26, vx: P.facing * 18, vy: -14, life: 0.45, max: 0.45, c: '#e8eef6', s: 1, g: -10, a: 0.7 });
  // shield stamina refills slowly with the shield up, much faster once he lowers it
  if (P.gbreak <= 0) {
    if (P.stamDelay > 0) P.stamDelay -= dt;
    else P.stam = Math.min(100, P.stam + (inp.guardH && !P.guardOut ? tune.stamRegen * 0.1 : tune.stamRegen) * dt);
    if (P.guardOut && P.stam >= tune.guardBack) { P.guardOut = false;   // (half the bar, 10/16/2026: it was all of it, and with more enemies and faster fights that was too long without it)
      sfx.lock(); popup(P.x, P.y - 54, 'guard back', '#cfd6e6'); }
  }
  const dir = inp.right - inp.left;

  updateStory(dt);
  if (!P.story && P.ground && !P.atk && P.roll <= 0 && P.ko <= 0 && !P.crawl && P.hurtT <= 0 && P.charge <= 0) {
    if (upP && interact()) return stepWorld(dt);                 // talk to someone, rest
    if (mapP) openMap();
  }
  if (P.respawnT > 0) {
    P.respawnT -= dt;
    if (P.respawnT <= 0 && trans.state !== 'none') P.respawnT = 0;              // half way through a door: he's not coming back
    else if (P.respawnT <= 0) { P.pinned = null; P.x = P.safeX; P.y = P.safeY; P.vx = P.vy = 0; P.hurtT = 0; P.inv = 0.8; P.px = P.x; P.py = P.y; cam.snap = true; P.sinkT = 0; P.swim = false; P.h = STAND_H; }
    if (P.hurtT > 0) { P.hurtT -= dt; P.vy = Math.min(P.vy + gravity() * dt, tune.maxFall); moveX(P.vx * dt); if (moveY(P.vy * dt)) P.vy = 0; }
    stepWorld(dt); return;
  }

  if (P.ground) { P.hangN = 0; P.airHang = null; }                                 // back on his feet: a swing in the air holds him up full again
  if (P.ko > 0) { updateKO(dt); stepWorld(dt); return; }
  if (P.chute || (room.def.chute && typeof chuteStart === 'function' && chuteStart(dir))) { updateChute(dt); stepWorld(dt); return; }   // going down the slide (playground.js)
  if (P.splat > 0) {
    P.splat += dt; P.vx = 0;
    if (P.splat < SPLAT[3] && Math.random() < dt * 3)   // fluff drifting off him while he's down
      addPart({ x: P.x + (Math.random() * 2 - 1) * 12, y: P.y - 8, vx: (Math.random() * 2 - 1) * 10, vy: -14 - Math.random() * 10, life: 1.0, max: 1.0, c: '#ffffff', s: 1, g: -3 });
    if (P.splat > 0.3 && P.splat < SPLAT[2] && (P.jumpBufT > 0 || P.atkBufT > 0 || P.dodgeBufT > 0 || inp.left || inp.right)) { P.splat = SPLAT[2]; P.jumpBufT = P.atkBufT = P.dodgeBufT = 0; }
    if (P.splat >= SPLAT[4]) P.splat = 0;
    stepWorld(dt); return;
  }
  if (P.pinned) {                                    // held (the reacher's grab, the rings' snag, 10/16/2026): mash anything to wriggle loose before it squeezes
    const pn = P.pinned;
    if (P.jumpBufT > 0 || P.atkBufT > 0 || P.dodgeBufT > 0) { pn.left--; P.jumpBufT = P.atkBufT = P.dodgeBufT = 0; puff(P.x, P.y - 18, 2, 30); sfx.squeak(); }
    if (pn.left <= 0 || !pn.by || pn.by.state === 'down' || !foes.includes(pn.by) || P.health <= 0) { P.pinned = null; P.inv = Math.max(P.inv, 0.5); if (pn.left <= 0) { pn.freed = true; popup(P.x, P.y - 54, 'wriggled free', '#cfd6e6'); } }
    else { if (pn.x !== undefined) { P.x = pn.x; P.y = pn.y; } P.vx = P.vy = 0; P.atk = null; P.roll = 0; P.dash = 0; P.charge = 0; P.fallTop = P.y; P.px = P.x; P.py = P.y; }
    stepWorld(dt); return;
  }
  if (P.reach) { updateReach(dt); stepWorld(dt); return; }
  if (P.hang) { updateHang(dt); stepWorld(dt); return; }
  if (P.cling) { updateCling(dt, dir); stepWorld(dt); return; }
  if (squeakP && (!P.story || P.story.free) && P.squeakCD <= 0 && P.charge <= 0) { P.squeakBuf = 0; startSpecial(null, P.squeakDown); }     // the squeak, or the fluff burst (down)
  else if (spinP && (!P.story || P.story.free) && P.squeakCD <= 0 && P.charge <= 0) { P.spinBuf = 0; startSpecial('spin'); }   // the spin, on its own button
  P.sparkBuf = Math.max(0, (P.sparkBuf || 0) - dt);
  if (P.sparkBuf > 0 && (!P.story || P.story.free) && P.charge <= 0 && !(P.sparkCD > 0)) { P.sparkBuf = 0; startSpark(); }   // static spark (10/18/2026)
  updateSparkMove(dt);
  if (swimStep(dt, dir)) { stepWorld(dt); return; }                                 // in deep water: swimming, or sinking if he isn't waterproof

  let g = gravity();
  if (P.gbreak > 0 && P.gbreak <= GBREAK - GBREAK_FREE && (P.dodgeBufT > 0 || P.atkBufT > 0 || P.atkPress)) P.gbreak = 0;   // rolling or swinging out of the daze
  if (P.gbreak > 0) {
    P.gbreak -= dt;
    P.vx += (0 - P.vx) * Math.min(1, dt * 6);
    P.vy = Math.min(P.vy + g * dt, tune.maxFall);
    if (P.gbreak <= 0) P.stamDelay = 0.2;
  } else if (P.hurtT > 0) {
    P.hurtT -= dt;
    P.vx += (0 - P.vx) * Math.min(1, dt * 4);
    P.vy = Math.min(P.vy + g * dt, tune.maxFall);
  } else if (P.crawl) {
    const busy = P.atk && P.atk.t < ATK[P.atk.type].off;
    const turnTo = inp.aim ? inp.aimX : dir;                                // (the right stick turns him lying down too, and holds him facing that way while he crawls backwards)
    if (turnTo && turnTo !== P.facing && !busy) {                           // turning round lying down: he pivots on his middle
      const was = onRamp(), x0 = P.x, y0 = P.y, f0 = P.facing;
      P.facing = turnTo; P.vx = 0;
      let x = x0 + f0 * 2 * CRAWL_MID, y = y0;
      if (was) { const ry = rampY(x, y0, 24, 24); if (ry !== null) y = ry; }   // on a slope: still on it where his feet end up
      if (!bodyHit(x, y - P.h, y)) { P.x = x; P.y = y; }                     // no room for that (a slope up under a low roof): he turns where he is,
      else if (bodyHit(x0, y0 - P.h, y0)) P.facing = f0;                     // or not at all if that doesn't fit either
    }
    if (turnTo && !busy) P.facing = turnTo;
    const guarding = guardHeld();                                           // the lid up lying down (10/15/2026): shuffling along slower behind it
    const target = P.atk ? 0 : dir * tune.crawlSpeed * (guarding ? 0.5 : 1) * (dir && dir === -P.facing ? tune.backSpeed : 1), dv = target - P.vx;
    P.vx += Math.sign(dv) * Math.min(Math.abs(dv), 900 * dt);
    P.vy = Math.min(P.vy + g * dt, tune.maxFall);
    P.crawlDist += Math.abs(P.vx) * dt;
    P.jumpBufT = 0;
    if (P.atkBufT > 0 && P.atkCD <= 0 && !P.atk && !guarding) { if (spend('crawl')) startAttack('crawl'); else P.atkBufT = 0; }   // a jab out along the floor
    if (hasHeadroom(STAND_H) && !P.atk) { P.crawl = false; P.h = STAND_H; puff(P.x, P.y, 3, 20); }
    else if (P.crawl && !P.atk && P.ground && dir === P.facing && bodyHit(P.x + dir, P.y - P.h, P.y)) {
      // his nose is up against something and there's room to stand a little way along his body (10/17/2026:
      // out from under the bed, nose on the nightstand, his feet still under the bed's edge and no way to get up): he
      // gets up where his body is instead of where his feet are
      for (let k = 1; k <= CRAWL_FRONT - HW; k++) {
        const x = P.x + dir * k;
        if (!boxSolid(x - HW, P.y - STAND_H, x + HW, P.y) && boxSolid(x - HW, P.y, x + HW, P.y + 2)) { P.x = x; P.crawl = false; P.h = STAND_H; P.vx = 0; puff(P.x, P.y, 3, 20); break; }
      }
    }
    else if (P.dodgeBufT > 0 && P.rollCD <= 0 && P.ground && can('roll')) {
      const d = dir || P.facing;
      if (!(P.atk && P.atk.t < ATK[P.atk.type].off) && spend('roll')) { P.crawl = false; P.roll = tune.rollTime * (P.tiredDodge ? 0.7 : 1); P.rollTired = P.tiredDodge; P.rollDir = d; P.facing = d; P.rollCD = tune.rollTime + (P.tiredDodge ? 0.5 : 0.25); sfx.roll(); }
      P.dodgeBufT = 0;
    }
  } else if (P.roll > 0) {
    P.roll -= dt;
    const k = P.roll / tune.rollTime;
    P.vx = P.rollDir * tune.rollSpeed * (P.rollTired ? 0.7 : 1) * (k > 0.3 ? 1 : 0.35 + 0.65 * k / 0.3);   // (out of breath: a short, slow one)
    P.vy = Math.min(P.vy + g * dt, tune.maxFall);
    if (P.jumpBufT > 0 && P.ground && k < 0.55 && hasHeadroom(STAND_H)) { P.roll = 0; P.h = STAND_H; doJump(); }
    else if (P.atkBufT > 0 && k < 0.75 && can('rollSlash') && hasHeadroom(STAND_H)) { if (spend('rollslash')) { P.roll = 0; P.h = STAND_H; P.facing = P.rollDir; startAttack('rollslash'); } else P.atkBufT = 0; }
    else if (!P.ground && P.vy > 60) { P.roll = 0; if (hasHeadroom(STAND_H)) P.h = STAND_H; }
    if (P.roll <= 0) {
      if (hasHeadroom(STAND_H)) { P.roll = 0; P.h = STAND_H; P.rollCD = 0.1; P.rollEndT = 0.15; }
      else { P.roll = 0; P.crawl = true; P.h = ROLL_H; P.vx *= 0.3; P.rollCD = 0.15; }   // still under something low: down on his belly
    }
  } else if (P.dash > 0) {
    P.dash -= dt;
    P.vx = P.rollDir * tune.airDashSpeed; P.vy = 0; g = 0;
    if (P.atkBufT > 0 && P.dash < 0.12 && can('rollSlash') && hasHeadroom(STAND_H)) { if (spend('rollslash')) { P.dash = 0; P.h = STAND_H; P.facing = P.rollDir; P.vx *= 0.6; startAttack('rollslash'); } else P.atkBufT = 0; }
    P.ghostT -= dt;
    if (P.ghostT <= 0) { P.ghostT = 0.045; ghosts.push({ x: P.x, y: P.y - ROLL_H / 2, name: sheathedFrame(frameName()), life: 0.16 }); }
    if (P.dash <= 0 && !P.atk) { P.vx *= 0.55; P.h = STAND_H; P.dashRec = 0.09; P.rollEndT = 0.15; if (!hasHeadroom(STAND_H)) { P.crawl = true; P.h = ROLL_H; } }
  } else {
    const guarding = inp.guardH && !P.atk && P.gbreak <= 0 && !P.guardOut;
    const midSwing = P.atk && P.atk.t < ATK[P.atk.type].off;
    if (inp.aimX && !midSwing && P.facing !== inp.aimX) { P.facing = inp.aimX; if (P.ground && Math.abs(P.vx) < 40) P.turnT = 0.06; }   // the right stick turns him that way, on the ground or in the air (10/16/2026)
    const locked = midSwing || inp.aim || (guarding && P.guardLock);   // facing holds mid swing, while the right stick's held, or when the guard's locked with R3
    if (dir && !locked && dir !== P.facing) {
      if (P.ground && Math.abs(P.vx) < 40) P.turnT = 0.06;
      if (P.ground && Math.abs(P.vx) > 120) puff(P.x - P.facing * 4, P.y, 3, 30);
      P.facing = dir;
    }
    let target = dir * (guarding ? tune.guardSpeed : P.charge >= CHARGE_SHOW ? tune.runSpeed * 0.3 : tune.runSpeed);
    if (inp.aim && dir && dir === -P.facing) target *= tune.backSpeed;                     // going backwards (facing one way with the right stick, walking the other): slower (10/16/2026)
    if (P.soggyT > 0) target *= 0.55;
    if (P.slowT > 0) target *= 0.5;                                                           // a candy wrapper round him, or gum on his feet                                                         // soaked through: heavy, and slow till he's dripped dry
    // backing up with the guard locked: he's nervous about stepping off an edge he can't see. Hold back long enough and he goes
    P.teeter = false;
    if ((inp.aim || (guarding && P.guardLock)) && P.ground && dir && dir === -P.facing) {
      const heel = P.x + dir * (HW - 2) + dir * 2;
      if (!boxSolid(heel - 1, P.y, heel + 1, P.y + 6) && !boxHas(heel - 1, P.y, heel + 1, P.y + 6, 2) && !(room.ramps.length && rampY(heel, P.y, 6, STEP_UP) !== null)) {   // nothing under his heel (it read the tile row his feet were in, and on ground that sits a hair high, a flat floor counted as an edge). A shelf or a one-way slope under it is ground too: backing along the hollow's root he froze every few steps, the terrain audit 10/17/2026
        P.edgeT += dt;
        if (P.edgeT < tune.edgeHesitate) { target = 0; P.vx = 0; P.teeter = true; if (P.edgeT - dt <= 0) sfx.teeter(); }
      } else P.edgeT = 0;
    } else P.edgeT = 0;
    if (P.wallJumpT > 0) target = P.vx;                                     // just jumped off a wall: carried away from it for a moment
    const speeding = Math.abs(target) > 0.1 && (Math.sign(target) === Math.sign(P.vx) || Math.abs(P.vx) < 1);
    const time = P.ground ? (speeding ? tune.accelTime : tune.decelTime) : (speeding ? tune.airAccelTime : tune.airDecelTime);
    const rate = tune.runSpeed / Math.max(time, 0.001);
    const dv = target - P.vx;
    P.vx += Math.sign(dv) * Math.min(Math.abs(dv), rate * dt);

    // walking into a gap too low to stand in: he gets down and crawls under it
    if (P.ground && dir && !P.atk && P.charge <= 0) {
      const nx = P.x + dir * 3;
      if (boxSolid(nx - HW, P.y - STAND_H, nx + HW, P.y - 1) && !boxSolid(nx - HW, P.y - ROLL_H, nx + HW, P.y)) {
        P.crawl = true; P.h = ROLL_H; P.crawlDist = 0; P.vx *= 0.4; puff(P.x, P.y, 3, 20); sfx.land();
      }
    }
    if (P.jumpBufT > 0 && (P.ground || P.coyoteT > 0) && !P.crawl) {
      if (inp.down && P.ground && onShelf()) { P.dropT = 0.22; P.y += 1; P.ground = false; P.jumpBufT = 0; P.coyoteT = 0; }
      else doJump();
    } else if (P.jumpBufT > 0 && inp.down && canFlop()) startFlop();                      // the belly flop: {down} + {jump} in the air (before the flap, 10/18/2026)
    else if (P.jumpBufT > 0 && !P.ground && P.coyoteT <= 0 && !P.crawl && can('flap') && !P.flapUsed && !P.swim && P.hurtT <= 0) doFlap();   // the cape flap: one more jump in midair
    if (!P.jumpHeld && P.vy < 0 && P.cut === false) { P.vy *= tune.jumpCut; P.cut = true; }
    // the big swing's little hang: slows his fall, and gives a bit of extra lift if he's still rising (the roll leap).
    // leapLift sets how much: 0 none, 1 the full original launch
    if (P.airHang) {                                                                         // a swing in the air: held up near where he swung
      const k = P.airHang.k; g *= 1 - 0.6 * k;
      if (P.vy > 0) P.vy = Math.min(P.vy, 220 - 160 * k); else P.vy = Math.max(P.vy, -(300 - 200 * k));
      if ((P.airHang.t -= dt) <= 0) P.airHang = null;
    }
    if (P.atk && ATK[P.atk.type].float && P.atk.t < ATK[P.atk.type].float && !P.ground) {
      if (P.vy >= 0) { g *= 0.25; if (P.vy > 60) P.vy = 60; }
      else g *= 1 - 0.75 * tune.leapLift;
    }
    else if (P.vy > 0) g *= tune.fallMult;
    else if (P.jumpHeld && Math.abs(P.vy) < 55) g *= 0.6;     // a little float at the top while X is held
    P.vy = Math.min(P.vy + g * dt, tune.maxFall);
    if (gliding()) { P.vy = Math.min(P.vy, wearing('feather') ? 34 : 52); P.glideT = (P.glideT || 0) + dt; P.fallTop = P.y; } else P.glideT = 0;   // the cape: holding jump on the way down. A glide is a controlled fall, so the splat height counts from where he stopped gliding (glide, let go 220px up, fall, and he still splats)
    if (P.squeakT > 0 || P.burstT > 0) P.vx *= 0.8;
    if (P.spinT > 0 && !P.ground && P.vy > 40) P.vy = 40;                                    // spinning slows his fall

    P.comboT = Math.max(0, (P.comboT || 0) - dt); if (P.comboT <= 0 && !P.atk && P.charge <= 0) P.combo = 0;
    if (P.atkBufT > 0 && P.atkCD <= 0) {
      let type = inp.up || inp.aimUp ? 'up' : inp.down || inp.aimDown ? (P.ground ? 'low' : 'down') : (P.rollEndT > 0 && can('rollSlash') ? 'rollslash' : 'side');
      const step = type === 'side' ? (P.ground ? (P.combo || 0) : (P.combo || 0) % 2) : -1;   // in the air: the slash and the chop back and forth (no whirl off the ground)
      if (step >= 0) { type = COMBO[step]; P.lastStep = step; }
      // one down swing per fall: another only after the cooldown (long falls), or once a bounce lands
      if (type === 'down' && P.downCD > 0) P.atkBufT = 0;
      else if (!spend(type)) P.atkBufT = 0;
      else { startAttack(type); if (type === 'down') P.downCD = tune.downCooldown; if (step >= 0) comboNext(step); else P.combo = 0; }
    }
    // the swing button held: charging, from the moment it went down. Let go before it's full and it's a plain swing (the
    // next one in the combo); let go full and it's the charged swing, that step of the combo charged (bigger each step)
    if (inp.atkH) P.atkHeldT += dt; else P.atkHeldT = 0;
    if (P.atkPress) {
      if (P.hurtT > 0 || P.dodgeBufT > 0 || guarding || P.roll > 0) { P.atkPress = false; P.charge = 0; P.pressSwung = false; }
      else if (!inp.atkH) {                                                        // let go
        if (P.charge >= tune.chargeTime && P.ground && spend('charged')) { const lv = P.chargeLv || 0; startAttack(CHARGED_STEP[lv] || 'charged'); P.atk.level = lv; comboNext(lv); if (lv) chargedBurst(lv); }
        else if (!P.pressSwung) P.atkBufT = Math.max(0.12, (P.atkCD || 0) + 0.06);   // (let go during the last swing: it waits for that one to finish, so a press in the combo isn't lost)
        P.atkPress = false; P.charge = 0; P.pressSwung = false;
      } else if (!P.ground) P.charge = 0;                                         // jumped holding it: no charging in the air (let go up there and it's a swing)
      else if (P.atk) {}                                                           // still finishing the last swing: it starts once that's done
      else if (P.charge <= 0) { P.charge = 0.001; P.chargeLv = P.combo || 0; }
      else {
        const was = P.charge; P.charge += dt;
        if (was < CHARGE_SHOW && P.charge >= CHARGE_SHOW) sfx.chargeStart();
        if (was < tune.chargeTime && P.charge >= tune.chargeTime) { sfx.charged(); spark(P.x - P.facing * 10, P.y - 30); }
        if (P.charge >= CHARGE_SHOW) {
          P.vx *= 0.82;                                            // plants his feet while charging
          if (Math.random() < dt * (P.charge >= tune.chargeTime ? 30 : 16)) {   // energy gathering in toward the sword
            const a = Math.random() * Math.PI * 2, r = 22 + Math.random() * 10;
            const tx = P.x - P.facing * 10, ty = P.y - 22;
            addPart({ x: tx + Math.cos(a) * r, y: ty + Math.sin(a) * r, vx: -Math.cos(a) * r * 3.2, vy: -Math.sin(a) * r * 3.2, life: 0.3, max: 0.3, c: P.charge >= tune.chargeTime ? '#fff6d8' : '#ffd36b', s: 1, g: 0 });
          }
        }
      }
    }
    // a swing commits him (10/16/2026): the roll comes out once the swing's hitting part is over, not
    // through it. The press waits for it
    const swingBusy = P.atk && P.atk.t < ATK[P.atk.type].off;
    if (swingBusy && P.dodgeBufT > 0) P.dodgeBufT = Math.max(P.dodgeBufT, ATK[P.atk.type].off - P.atk.t + 0.05);
    if (P.dodgeBufT > 0 && !swingBusy && P.rollCD <= 0 && (P.ground ? can('roll') : can('airDodge') && !P.dashUsed)) {
      const d = dir || P.facing;
      if ((P.ground || !P.dashUsed) && !spend(P.ground ? 'roll' : 'airdodge')) P.dodgeBufT = 0;
      else if (P.ground) {
        P.roll = tune.rollTime * (P.tiredDodge ? 0.7 : 1); P.rollTired = P.tiredDodge; P.rollDir = d; P.facing = d; P.h = ROLL_H; P.combo = 0;
        P.atk = null; P.dodgeBufT = 0; P.rollCD = tune.rollTime + (P.tiredDodge ? 0.5 : 0.25); puff(P.x - d * 6, P.y, 5, 40); sfx.roll();
      } else if (!P.dashUsed) {
        P.dash = (wearing('dfwing') ? 0.2 : 0.15) * (P.tiredDodge ? 0.6 : 1); P.dashTired = P.tiredDodge; P.rollDir = d; P.facing = d; P.dashUsed = true; P.vy = 0; P.h = ROLL_H; P.ghostT = 0; P.airHang = null;
        P.atk = null; P.dodgeBufT = 0; P.rollCD = 0.35; sfx.airdodge();
        P.fallTop = P.y;                                                               // the air dodge catches him: the splat height counts from here, the same as a glide (10/21/2026)
        if (!world.flags.airDodgedOnce) { world.flags.airDodgedOnce = true; saveWorld(); }
        puff(P.x - d * 6, P.y - 10, 12, 90, '#ffffff', 70);
      }
    }
  }

  // move: a few small steps so nothing gets skipped at high speed
  let lunge = 0;
  if (P.atk && ATK[P.atk.type].lunge && !P.atk.stopLunge) { const [a, b] = ATK[P.atk.type].lunge; if (P.atk.t >= a && P.atk.t < b) lunge = P.facing * (ATK[P.atk.type].lungeSpeed || tune.swingLunge) * (P.ground || ATK[P.atk.type].lungeSpeed ? 1 : 0.35); }
  fitBody(); unstick();
  const vx = P.vx + (P.recoilT > 0 ? P.recoilV : 0) + lunge;
  const n = Math.max(1, Math.ceil(Math.max(Math.abs(vx), Math.abs(P.vy)) * dt / 4));
  let landed = false;
  if (P.flop || P.flopLag > 0) flopMotion(dt);                                          // the belly flop sets how he moves (moves2.js)
  P.airT = P.ground ? 0 : (P.airT || 0) + dt;
  const vyBefore = P.vy;
  const wasOn = P.ground;
  for (let i = 0; i < n; i++) { moveX(vx * dt / n); if (moveY(P.vy * dt / n)) landed = true; }
  if (landed && P.vy > 0) P.vy = 0;
  if (wasOn && P.vy >= 0 && !landed && !P.swim && P.dropT <= 0) snapDown();
  P.wasGround = P.ground;
  P.ground = P.vy >= 0 && groundBelow();
  if (P.ground) {
    P.cornerSlid = 0;
    if (!P.wasGround) {
      if (P.flop) flopLand();                                                               // a belly flop coming down (no splat: that's the point of it)
      else if (P.slid) { P.slid = false; P.landT = 0.085; puff(P.x, P.y, 8, 60); sfx.land(); }   // off the end of the slide: he lands on his feet, however far the drop
      else if (P.y - P.fallTop >= tune.splatHeight && P.hurtT <= 0) {
        // too far to land on his feet: splat (no damage, he's a plush)
        P.splat = 0.001; P.vx = 0; P.atk = null; P.roll = 0; P.h = STAND_H;
        puff(P.x, P.y, 14, 90); shakeT = 0.16; shakeA = 3; sfx.splat(); sfx.squeak();
        for (let i = 0; i < 12; i++)        // a bit of his fluff knocked loose
          addPart({ x: P.x + (Math.random() * 2 - 1) * 10, y: P.y - 6, vx: (Math.random() * 2 - 1) * 60, vy: -40 - Math.random() * 70, life: 1.2 + Math.random() * 0.5, max: 1.7, c: Math.random() < 0.6 ? '#ffffff' : '#e9e4da', s: Math.random() < 0.4 ? 2 : 1, g: 30 });
      } else if (vyBefore > 260) { P.landT = 0.085; puff(P.x, P.y, 6, 50); sfx.land(); }
      P.dashUsed = false; P.wallPogoUsed = false; P.downCD = 0;
    }
    P.flapUsed = false;
    P.vy = 0; P.coyoteT = tune.coyote; P.fallTop = P.y;
  } else { P.coyoteT = Math.max(0, P.coyoteT - dt); P.fallTop = Math.min(P.fallTop, P.y); }

  if (!P.ground && P.hurtT <= 0 && !tryGrab(dir)) tryCling(dir);

  // last safe spot, for after the tacks
  const solidUnder = boxSolid(P.x - HW, P.y, P.x - HW + 1, P.y + 1) && boxSolid(P.x + HW - 1, P.y, P.x + HW, P.y + 1);
  if (P.ground && solidUnder && !boxHas(P.x - 24, P.y - 16, P.x + 24, P.y + 16, 3) && !boxHas(P.x - 24, P.y - 16, P.x + 24, P.y + 16, 5)) { P.safeT += dt; if (P.safeT > 0.15) { P.safeX = P.x; P.safeY = P.y; } }
  else P.safeT = 0;

  if (critical()) {
    // he keeps wincing, and the odd tear drips off his cheek
    P.winceNext -= dt; P.winceT = Math.max(0, P.winceT - dt);
    if (P.winceNext <= 0) { P.winceT = 0.16 + Math.random() * 0.14; P.winceNext = 0.7 + Math.random() * 0.9; }
    if (Math.random() < dt * 0.9 && !P.roll && !P.dash && !P.hang)
      addPart({ x: P.x + P.facing * 7, y: P.y - 27, vx: P.vx * 0.3, vy: 10, life: 0.6, max: 0.6, c: '#96d2ff', s: 1, g: 260, a: 0.55 });
  }
  if (critical() && Math.random() < dt * 1.6)
    addPart({ x: P.x + (Math.random() * 2 - 1) * 7, y: P.y - 14 - Math.random() * 16, vx: -P.facing * (6 + Math.random() * 10), vy: -6 - Math.random() * 8, life: 1.0, max: 1.0, c: Math.random() < 0.5 ? '#ffffff' : '#e9e4da', s: 1, g: -2 });

  // run cycle follows distance so his feet keep pace
  if (P.ground && Math.abs(P.vx) > 20 && !P.roll) {
    const was = Math.floor(P.runDist / 22); P.runDist += Math.abs(P.vx) * dt;
    if (Math.floor(P.runDist / 22) !== was) sfx.step(room.def.floor);             // a footstep each time a foot comes down
  } else if (!P.roll) P.runDist = 0;
  P.guardDist += P.vx * P.facing * dt;
  P.idleT += dt;
  P.lookT = P.ground && !dir && !P.atk && !inp.guardH && (inp.up || inp.down) ? P.lookT + dt : 0;

  // the swing
  if (P.atk) {
    const a = P.atk, info = ATK[a.type];
    a.t += dt;
    if (atkLive(a)) { doHits(); if (isCharged(a.type)) sweepMark(); }
    if (a.type === 'down' && a.t >= info.on && a.t < info.reach && !P.ground && P.vy > 0 && !a.hit.has('ground')) {
      const box = attackBox();
      let floor = false;
      for (let row = Math.floor(P.y / T); row <= Math.floor((box.b - 0.001) / T) && !floor; row++) {
        if (row * T < P.y - 0.01) continue;
        for (let col = Math.floor((P.x - HW + 2) / T); col <= Math.floor((P.x + HW - 2.001) / T); col++) {
          const t = tile(col, row);
          if ((t === 1 || (t === 2 && P.dropT <= 0)) && tile(col, row - 1) !== 1) { floor = true; break; }
        }
      }
      if (floor) { a.hit.add('ground'); puff(P.x, box.b - 6, 6, 60); spark(P.x, box.b - 8); pogo(); }
      else if (!a.hit.has('wall') && boxSolid(box.l, box.t, box.r, box.b)) {
        // a wall beside him: one bounce off a wall per jump, after that the sword just glances off it
        a.hit.add('wall');
        const wallLeft = boxSolid(box.l, box.t, P.x, box.b);
        const away = wallLeft ? 1 : -1, sx = wallLeft ? box.l + 4 : box.r - 4;
        const bark = room.grip.size && boxGrip(wallLeft ? box.l : P.x, box.t, wallLeft ? P.x : box.r, box.b);   // rough bark gives nothing to bounce off: it's the velcro's, or nothing (the bark shaft could be bounced up without it)
        if (!P.wallPogoUsed && !bark) { P.wallPogoUsed = true; a.hit.add('ground'); spark(sx, P.y + 8); pogo(); }
        else { P.recoilT = 0.12; P.recoilV = away * 160; spark(sx, P.y + 8); sfx.tink(); }
      }
    }
    if (a.type === 'low' && a.t >= info.on && !a.hit.has('floor') && P.ground) {
      a.hit.add('floor'); puff(P.x + P.facing * 32, P.y, 5, 40); sfx.thunk();
    }
    if (a.t >= info.frames[info.frames.length - 1]) P.atk = null;
  }
  // tacks hurt unless he's bouncing off them
  if (P.inv <= 0 && (boxHas(P.x - HW + 2, P.y - 6, P.x + HW - 2, P.y, 3) || boxHas(P.x - HW + 2, P.y - 6, P.x + HW - 2, P.y, 5))) {   // thorns, Grime, or a slick of it
    const ty = Math.floor((P.y - 1) / T);
    if (P.y > ty * T + T - 7) hurt(P.x - P.facing, 'tacks');
  }
  if (P.y > room.pxH + 40 && trans.state === 'none') { P.respawnT = 0.01; }   // fell out of the room with no door under him (never while he's falling through one)
  stepWorld(dt);
}

// ledge grab: falling, holding toward a ledge that's right at his hand. His whole hanging body has to fit
// above whatever's below, so a short drop doesn't count.
const GRAB_REACH = 14, GRAB_ABOVE = 9, GRAB_BELOW = 13;   // how far from a ledge he can still snap onto it   // how forgiving the grab is (px)
function tryGrab(dir) {
  if (P.ground || P.vy < -30 || P.atk || P.hurtT > 0 || P.roll > 0 || P.dash > 0 || P.regrabT > 0 || !dir || dir !== P.facing || inp.down || inp.guardH) return false;
  const edge = dir > 0 ? P.x + HW : P.x - HW;
  const cols = [...new Set([1, 7, GRAB_REACH].map(d => Math.floor((edge + dir * d) / T)))];
  for (const col of cols) if (grabAt(dir, col, edge)) return true;
  return rampGrab(dir, edge);
}
// the end of a one-way slope is a ledge too (10/15/2026): the squirrel's root's curl, the tip of the grime pool's
// root. Facing right he can catch a slope's left end, facing left its right end, the same reach and room as a tile ledge
function rampGrab(dir, edge) {
  if (!room.ramps || !room.ramps.length) return false;
  const handY = P.y - HANG_FEET;
  for (const rp of room.ramps) {
    const cx = dir > 0 ? rp.x0 : rp.x1 + 1, cy = dir > 0 ? rp.ys[0] : rp.ys[rp.ys.length - 1];
    if ((cx - edge) * dir < -1 || Math.abs(cx - edge) > GRAB_REACH) continue;
    if (cy < handY - GRAB_ABOVE || cy > handY + GRAB_BELOW) continue;
    const l = dir > 0 ? cx - 2 * HW : cx, r = dir > 0 ? cx : cx + 2 * HW;
    if (boxSolid(l, cy - 12, r, cy + HANG_FEET - 12) || boxHas(l, cy + 1, r, cy + HANG_FEET + 6, 2)) continue;   // room to hang there
    const tx = cx - dir * HW, ty = cy + HANG_FEET, pl = Math.min(P.x, tx) - HW, pr = Math.max(P.x, tx) + HW;
    if (boxSolid(pl, Math.min(P.y, ty) - STAND_H + 6, pr, Math.max(P.y, ty) - 2)) continue;
    P.vx = P.vy = 0; P.facing = dir; P.atk = null;
    startHang(dir, cx, cy); P.hang.ramp = true;
    return true;
  }
  return false;
}
function grabAt(dir, col, edge) {
  const cx = dir > 0 ? col * T : (col + 1) * T;
  if ((cx - edge) * dir < -1 || Math.abs(cx - edge) > GRAB_REACH) return false;
  const handY = P.y - HANG_FEET;
  for (let row = Math.floor((handY - GRAB_ABOVE) / T); row <= Math.floor((handY + GRAB_BELOW) / T); row++) {
    const cy = row * T;
    if (cy < handY - GRAB_ABOVE || cy > handY + GRAB_BELOW) continue;
    const t = tile(col, row), above = tile(col, row - 1);
    if ((t !== 1 && t !== 2) || above === 1 || above === 2) continue;
    const l = dir > 0 ? cx - 2 * HW : cx, r = dir > 0 ? cx : cx + 2 * HW;
    // his hands and body need clear ground (to the pixel), but whether the drop's too short to bother is judged by
    // the tiles like always, so a lump of packed dirt at the bottom of the wall doesn't stop the grab (10/15/2026)
    const room = !boxSolid(l, cy - 12, r, cy + HANG_FEET - 12) && !boxHas(l, cy + 1, r, cy + HANG_FEET + 6, 1) && !boxHas(l, cy + 1, r, cy + HANG_FEET + 6, 2) && !boxHas(l, cy + 1, r, cy + HANG_FEET + 6, 3);
    if (!room) continue;
    // the way back to the ledge has to be clear too
    const tx = cx - dir * HW, ty = cy + HANG_FEET;
    const pl = Math.min(P.x, tx) - HW, pr = Math.max(P.x, tx) + HW;
    if (boxSolid(pl, Math.min(P.y, ty) - STAND_H + 6, pr, Math.max(P.y, ty) - 2)) continue;
    P.vx = P.vy = 0; P.facing = dir; P.atk = null;
    startHang(dir, cx, cy);                         // close enough: he snaps right onto it
    return true;
  }
  return false;
}
// fighting back: every hit he lands pushes a bit of the loose fluff back in. Three hits for each cotton puff
function rally() {
  if (P.loose <= 0) return;
  P.looseBits++;
  for (let i = 0; i < 5; i++) part(P.x + (Math.random() * 2 - 1) * 20, P.y - 20 + (Math.random() * 2 - 1) * 14, 0, 0, 0.3, '#ffffff', 1, 0);
  P.looseT = Math.min(P.looseMax || tune.rallyTime, (P.looseT || 0) + 0.75);          // every hit buys a little more time
  if (P.looseBits >= (wearing('stitch') ? 2 : 3)) {                                   // the lucky stitch pin: two hits
    P.looseBits = 0; P.loose--; P.health = Math.min(P.maxHealth, P.health + 1);
    sfx.stitch(); puff(P.x, P.y - 22, 8, 40, '#ffffff', 40); popup(P.x, P.y - 50, 'fluff back in', '#fbf7ec');
    if (!world.flags.ralliedOnce) { world.flags.ralliedOnce = true; saveWorld(); }
  }
}
// sewing himself up at a resting spot: back to full, nothing loose, nothing worn
function sewUp() { if (typeof foesAllBack === 'function') foesAllBack(); P.worn = 0; P.loose = 0; P.looseBits = 0; P.maxHealth = world.maxHealth; P.health = P.maxHealth; }
const KO_TIME = 3.2;
// the door he comes back at, knocked out with nowhere rested: the one he came in by, unless that's a hole in the floor
// he climbed up through (10/17/2026: put back over the yo-yo's shaft's hole, he just fell straight back out of the room).
// Then a door at the side, or the room's own starting spot
function koDoor() {
  const d = world.door && room.def.doors.find(o => o.id === world.door);
  if (!d || d.edge !== 'bottom' || d.swim) return world.door;
  const side = room.def.doors.find(o => o.edge === 'left' || o.edge === 'right');
  return room.def.spawn || !side ? null : side.id;
}
const SPLAT = [0.12, 0.22, 0.72, 0.86, 1.02];   // belly flop squished, bounce, lying dazed, pushing up, getting up
function updateKO(dt) {
  P.ko += dt;
  P.vx += (0 - P.vx) * Math.min(1, dt * (P.ground ? 9 : 1.2));
  P.vy = Math.min(P.vy + gravity() * tune.fallMult * dt, tune.maxFall);
  if (typeof isWater === 'function' && isWater(P.x, P.y - 8)) { P.vy = Math.min(P.vy, 30); if (P.y > room.pxH - 8) P.y = room.pxH - 8; }   // knocked out in the water: drifting down slowly
  moveX(P.vx * dt);
  if (moveY(P.vy * dt)) {
    if (!P.koLanded) { P.koLanded = true; P.koLandT = P.ko; puff(P.x, P.y, 10, 70); shakeT = 0.12; shakeA = 2; sfx.land(); }
    P.vy = 0;
  }
  P.ground = groundBelow();
  // bits of fluff drifting up off him while he's down
  if (P.koLanded && Math.random() < dt * 3) addPart({ x: P.x + (Math.random() * 2 - 1) * 8, y: P.y - 10, vx: (Math.random() * 2 - 1) * 12, vy: -18 - Math.random() * 14, life: 1.1, max: 1.1, c: Math.random() < 0.5 ? '#ffffff' : '#e9e4da', s: Math.random() < 0.4 ? 2 : 1, g: -4 });
  if (P.ko >= KO_TIME) {                             // back up where he last rested (or where he came into this room), sewn up
    for (const kind of COIN_KINDS) {                             // a third of each currency spills out of his backpack. Never lost
      const spill = Math.ceil((world[kind] || 0) / 3);
      if (spill <= 0) continue;
      world[kind] -= spill; let at = { x: Math.round(P.x), y: Math.round(P.y) };
      if (wetAt(at.x, at.y)) at = !wetAt(P.safeX, P.safeY) ? { x: Math.round(P.safeX), y: Math.round(P.safeY) } : dryGround(at.x, at.y) || at;   // went down in grime or deep water: they land back on the dry ground he was last on
      world.piles.push({ room: room.id, x: at.x + (kind === 'pebbles' ? 10 : 0), y: at.y, n: spill, kind, dry: true }); pileLock = 1.5;
    }
    if (world.rest) {
      Object.assign(P, { guardOut: false, stam: 100, en: 100, winded: false, ko: 0, koBy: null, koLanded: false, vx: 0, vy: 0, inv: 1.2, hurtT: 0, fadeIn: 0.45, h: STAND_H });
      // where he's going is saved along with the spill (the save audit, 10/17/2026): saved with this room still in it, a
      // reload during the fade put him back where he went down instead of where he rested
      sewUp(); world.room = world.rest.room; world.door = '@rest'; saveWorld(); trans.state = 'none'; goTo(world.rest.room, '@rest');
      return;
    }
    // in the middle of a boss fight: the room starts over, boss and all, the same as coming back from a resting spot
    // (10/17/2026: put back at the door, the arena's wall was still up between him and the fight, so he got shoved into
    // the wall, and the boss kept all the damage it had taken)
    if (typeof bossLocked === 'function' && bossLocked()) {
      Object.assign(P, { guardOut: false, stam: 100, en: 100, winded: false, ko: 0, koBy: null, koLanded: false, vx: 0, vy: 0, inv: 1.2, hurtT: 0, fadeIn: 0.45 });
      sewUp(); saveWorld(); trans.state = 'none'; goTo(room.id, koDoor());
      return;
    }
    const kd = koDoor(), d = kd && room.def.doors.find(o => o.id === kd), at = d ? { x: d.x, y: d.y, f: d.f } : room.def.spawn || { x: P.safeX, y: P.safeY, f: P.facing };
    // a fresh start on the spot, the same as coming in a door (the save audit): he used to be stood up but left swimming,
    // so a knockout in deep water brought him back a full height swimmer. Now the water (or a low roof) decides again
    sewUp(); placePlayer(at.x, at.y, at.f);
    Object.assign(P, { stam: 100, en: 100, inv: 1.2, fadeIn: 0.45, story: null });
    cam.snap = true; saveWorld();
  }
}
function startHang(dir, cx, cy) {
  P.reach = null;
  P.hang = { dir, cx, cy, t: 0, climb: null }; P.hangN = 0; P.airHang = null; P.fallTop = cy + HANG_FEET;
  P.x = cx - dir * HW; P.y = cy + HANG_FEET; P.vx = P.vy = 0; P.facing = dir; P.dashUsed = false; P.atk = null;
  puff(cx, cy, 4, 30); sfx.grab();
}
function updateReach(dt) {
  const r = P.reach, tx = r.cx - r.dir * HW, ty = r.cy + HANG_FEET;
  const step = (a, b, v) => a + Math.sign(b - a) * Math.min(Math.abs(b - a), v);
  P.x = step(P.x, tx, 520 * dt); P.y = step(P.y, ty, 420 * dt); P.vx = P.vy = 0;
  if (P.x === tx && P.y === ty) startHang(r.dir, r.cx, r.cy);
}
function updateHang(dt) {
  const h = P.hang;
  h.t += dt; P.vx = P.vy = 0; P.ground = false;
  if (h.climb !== null) {
    h.climb += dt;
    const k = Math.min(1, h.climb / CLIMB_T);
    if (k < 0.6) { P.x = h.cx - h.dir * HW; P.y = h.y0 + (h.cy - h.y0) * (k / 0.6); }               // pulling himself up from where he hung (the same as before, unless it's onto a higher step)
    else { P.y = h.cy; P.x = h.cx - h.dir * HW + h.dir * (2 * HW + 2) * ((k - 0.6) / 0.4); }
    if (k >= 1) {
      P.hang = null; P.y = h.cy; P.x = h.cx + h.dir * (HW + 2); P.ground = true; P.landT = 0.08; P.coyoteT = tune.coyote;
      if (h.ramp) { const ry = rampY(P.x, P.y, 10, 10); if (ry !== null) P.y = ry; }        // up onto a slope's end: on the slope where his feet are
      for (let n = 0; n < 8 && boxSolid(P.x - HW, P.y - P.h, P.x + HW, P.y); n++) P.y -= 1;   // up onto the ground if it's a little higher there
    }
    return;
  }
  if (h.t < 0.1) return;
  if (inp.down || P.dodgeBufT > 0) {                // let go
    P.hang = null; P.regrabT = 0.35; P.dodgeBufT = 0; P.jumpBufT = 0; P.vy = 20;
    return;
  }
  if (inp.up || P.jumpBufT > 0) {                   // climb up, if there's room to stand up there
    const room_ = cy => !boxSolid(h.cx + (h.dir > 0 ? 1 : -2 * HW - 3), cy - STAND_H, h.cx + (h.dir > 0 ? 2 * HW + 3 : -1), cy)
             && !boxSolid(P.x - HW, cy - STAND_H, P.x + HW, h.cy);
    let top = room_(h.cy);
    // the ledge steps up again right past the edge (the rock in the grotto, 10/14/2026: he hung there and
    // couldn't get up): climb onto the higher step instead, if there's room to stand on that
    if (!top && !h.ramp && boxSolid(h.cx + (h.dir > 0 ? 1 : -2 * HW - 3), h.cy - T, h.cx + (h.dir > 0 ? 2 * HW + 3 : -1), h.cy - 1) && room_(h.cy - T)) { h.cy -= T; top = true; }
    if (top) { h.climb = 0; h.y0 = P.y; P.jumpBufT = 0; puff(h.cx, h.cy, 5, 40); sfx.grab(); }
  }
}

function doJump() {
  P.vy = -jumpVel(); P.ground = false; P.coyoteT = 0; P.jumpBufT = 0; P.jumpHeld = true; P.cut = false;
  puff(P.x, P.y, 4, 35); sfx.jump();
}

// the cape flap (from the Greenhouse): one more jump in midair, the cape snapping down under him
function doFlap() {
  P.vy = -jumpVel() * 0.9; P.flapUsed = true; P.jumpBufT = 0; P.jumpHeld = true; P.cut = false; P.dashUsed = false; P.flapT = 0.22;
  P.fallTop = P.y;                                                                     // a fresh jump: the splat height counts from here, the same as a glide (10/21/2026)
  for (let i = 0; i < 10; i++) addPart({ x: P.x + (Math.random() * 2 - 1) * 12, y: P.y - 4, vx: (Math.random() * 2 - 1) * 70, vy: 40 + Math.random() * 60, life: 0.35, max: 0.35, c: i % 2 ? '#f4ecd8' : '#d8c8b0', s: 2, g: 0 });
  sfx.flap ? sfx.flap() : sfx.jump();
}
// the velcro grip (from the Old Oak): patches on his hands catch on rough walls like bark and old wood. He hangs on,
// slides down slowly, and can jump off. Jumping off and coming back to the same wall climbs it a bit at a time
const gripAt = (c, r) => tile(c, r) === 1 && room.grip && room.grip.has(c + ',' + r);
function gripBeside(d) {
  const c = Math.floor((d > 0 ? P.x + HW + 1 : P.x - HW - 1) / T);
  return gripAt(c, Math.floor((P.y - 30) / T)) && gripAt(c, Math.floor((P.y - 8) / T));
}
function tryCling(dir) {
  if (!can('velcro') || !dir || P.ground || P.atk || P.roll > 0 || P.dash > 0 || P.swim || P.clingCD > 0 || P.vy < -140 || inp.down || inp.guardH) return false;
  if (!gripBeside(dir)) return false;
  const wx = dir > 0 ? Math.floor((P.x + HW + 1) / T) * T : Math.ceil((P.x - HW - 1) / T) * T;   // the face of the wall
  P.cling = { dir, t: 0, cx: wx, cy: P.y - HANG_FEET }; P.hangN = 0; P.airHang = null; P.vx = 0; P.vy = Math.min(Math.max(P.vy, 0), 30); P.facing = dir; P.flapUsed = false; P.dashUsed = false; P.downCD = 0;
  puff(P.x + dir * HW, P.y - 20, 3, 20); sfx.grab();
  return true;
}
function updateCling(dt, dir) {
  const c = P.cling; c.t += dt;
  P.vx = 0; P.facing = c.dir;
  const slide = wearing('bark_chip') ? 14 : 34;
  P.vy = Math.min(slide, P.vy + 300 * dt);
  if (moveY(P.vy * dt)) { P.cling = null; P.ground = true; P.vy = 0; P.landT = 0.06; return; }   // slid all the way down to the ground
  c.cy = P.y - HANG_FEET;
  if (Math.random() < dt * 6) addPart({ x: P.x + c.dir * HW, y: P.y - 20, vx: -c.dir * 10, vy: -10, life: 0.4, max: 0.4, c: '#e9e4da', s: 1, g: 40 });
  if (P.jumpBufT > 0) {                              // jump off the wall
    P.cling = null; P.jumpBufT = 0; P.vx = -c.dir * 190; P.vy = -jumpVel() * 0.95; P.facing = -c.dir; P.wallJumpT = 0.14; P.clingCD = 0.1;
    P.jumpHeld = true; P.cut = false; P.ground = false; puff(P.x + c.dir * HW, P.y - 16, 4, 30); sfx.jump(); return;
  }
  if (dir === -c.dir || inp.down || P.dodgeBufT > 0 || !gripBeside(c.dir)) { P.cling = null; P.clingCD = 0.25; P.dodgeBufT = 0; return; }   // let go
}

function pogo() {
  P.fallTop = P.y; P.downCD = 0;   // a bounce earns another down swing (once this one finishes)
  P.vy = -tune.pogo; P.jumpHeld = false; P.cut = true; P.dashUsed = false; P.flapUsed = false; P.ground = false; sfx.pogo();
}

// his sword and shield go away on his back after a while with no fighting, and come straight back out the moment he
// swings or raises the shield (10/20/2026). The wait only counts down while nothing's after him: no enemy close by,
// no boss fight, and he's not just been hit
const SHEATHE_AFTER = 10, CALM_X = 260, CALM_Y = 180;
function inFight() {
  if (P.hurtT > 0 || P.inv > 0) return true;
  if (typeof bossLocked === 'function' && bossLocked()) return true;
  return foes.some(f => f.hp > 0 && f.state !== 'down' && f.state !== 'dormant' && f.state !== 'asleep' && Math.abs(f.x - P.x) < CALM_X && Math.abs(f.y - P.y) < CALM_Y);
}
function updateSheathe(dt) {
  P.stowT = Math.max(0, (P.stowT || 0) - dt);
  if (!world.has.gear) { P.sheathed = false; P.calmT = 0; return; }
  if (inp.atkP || inp.atkH || inp.guardH || inp.spinP || P.atk || P.charge > 0 || P.spinT > 0) {   // out they come, straight into the swing or the block
    if (P.sheathed) { P.sheathed = false; P.stowT = 0; sfx.bump(); }
    P.calmT = 0; return;
  }
  if (inFight()) { P.calmT = 0; return; }
  P.calmT = (P.calmT || 0) + dt;
  if (!P.sheathed && P.calmT >= SHEATHE_AFTER && !P.story && !P.idleBit) {
    P.sheathed = true; sfx.bump();
    if (P.ground && Math.abs(P.vx) < 20 && !P.swim && !P.crawl) P.stowT = 0.3;   // standing there: a moment reaching back over his shoulder to strap them on
  }
}
// the picture on the sheet for a frame: with the gear put away, its copy with them on his back (s_ frames, and the
// idle bits' b_ ones for standing, looking up or down and landing). Crawling and swimming already have them on his back
function sheathedFrame(n) {
  if (!n || !P.sheathed || sheetKind !== 'gear') return n;
  const f = n.slice(-1), m = /^idle_(\d)_[RL]$/.exec(n);
  if (m) return P.stowT > 0 ? 'b_stow_' + f : `b_idle_${m[1]}_${f}`;
  if (/^(look_up|look_down|land)_[RL]$/.test(n)) return 'b_' + n;
  return META.frames['s_' + n] ? 's_' + n : n;
}

function frameName() {
  const f = P.facing > 0 ? 'R' : 'L';
  if (P.story) { const sf = storyFrame(f); if (sf) return sf; }
  if (P.chute) return (Math.floor(P.chute.k * 6) % 2 ? 'slide_2_' : 'slide_1_') + f;
  if (P.idleBit) { const fb = idleFrame(f); if (fb) return fb; }
  if (P.gbreak > 0) return 'hurt_' + f;
  if (P.splat > 0) return `splat_${SPLAT.findIndex(e => P.splat < e) + 1 || 5}_${f}`;
  if (P.ko > 0) return (P.koLanded && P.ko - P.koLandT > 0.12 ? 'ko_2_' : 'ko_1_') + f;
  if (P.respawnT > 0 && P.hurtT <= 0) return null;
  if (P.sinkT > 0) return 'hurt_' + f;
  if (P.swim && P.atk) {                                                   // swinging under water: flat out, all arm
    const info = ATK[P.atk.type]; let k = info.frames.findIndex(e => P.atk.t < e) + 1; if (k <= 0) k = info.frames.length;
    return `swimatk_${Math.min(4, k)}_${f}`;
  }
  if (P.swim && P.charge >= CHARGE_SHOW) return `swimatk_1_${f}`;                     // pulled back, charging
  if (P.swim && guardHeld()) return `swimguard_${Math.floor((P.swimDist || 0) / 8) % 2 + 1}_${f}`;   // the lid up under water
  if (P.swim) return Math.abs(P.vx) + Math.abs(P.vy) > 25 ? `swim_${(Math.floor((P.swimDist || 0) / 5) % 8) + 1}_${f}` : `float_${(Math.floor(performance.now() / 260) % 4) + 1}_${f}`;
  if (P.spinT > 0) return 'rollslash_2_' + (Math.floor(P.spinT / 0.06) % 2 ? 'L' : 'R');
  if ((P.squeakT > 0 || P.burstT > 0) && !P.atk) return 'land_' + f;
  if (P.reach) return 'rise_' + f;
  if (P.cling) return 'hang_2_' + f;
  if (P.hang) {
    const h = P.hang;
    if (h.climb !== null) return h.climb / CLIMB_T < 0.6 ? 'climb_' + f : 'land_' + f;
    // swings hard when he catches it, then settles into a little sway
    const a = 4 + 13 * Math.exp(-2.4 * h.t) * Math.sin(Math.PI * 2 * 1.5 * h.t) + 2.5 * Math.sin(Math.PI * 2 * 0.55 * h.t);
    return `hang_${Math.max(1, Math.min(5, Math.round((a + 6) / 6) + 1))}_${f}`;
  }
  if (P.crawl && P.atk) {                                                  // the jab lying down
    const info = ATK[P.atk.type]; let k = info.frames.findIndex(e => P.atk.t < e) + 1; if (k <= 0) k = info.frames.length;
    return `crawlatk_${Math.min(4, k)}_${f}`;
  }
  if (P.crawl && guardHeld()) return `crawlguard_${Math.floor(P.crawlDist / 5) % 2 + 1}_${f}`;   // the lid up, a little wobble shuffling along
  if (P.crawl && P.lookT > 0) return (inp.up ? 'crawl_up_' : 'crawl_down_') + f;
  if (P.crawl) return `crawl_${(Math.floor(P.crawlDist / 1.75) % 16) + 1}_${f}`;
  if (P.flop) return 'roll_' + f;                                         // the belly flop: tucked up (10/18/2026)
  if (P.flopLag > 0) return 'splat_2_' + f;                               // and flat on his tummy after
  if (P.sparkT > 0) return 'land_' + f;                                   // fuzzing himself up for the spark
  if (P.roll > 0) return 'roll_' + f;
  if (P.dash > 0) return (P.dash > 0.05 ? 'airdodge_1_' : 'airdodge_2_') + f;
  if (P.dashRec > 0 && !P.ground && !P.atk) return 'airdodge_2_' + f;
  if (P.hurtT > 0) return 'hurt_' + f;
  if (P.atk) {
    const info = ATK[P.atk.type];
    let k = info.frames.findIndex(e => P.atk.t < e) + 1;
    if (k <= 0) k = info.frames.length;
    if (info.name === 'whirl') return k === 3 ? `whirl_2_${f === 'R' ? 'L' : 'R'}` : `whirl_${k > 3 ? k - 1 : k}_${f}`;
    return `${info.name}_${k}_${f}`;
  }
  if (P.charge >= CHARGE_SHOW) return 'slash_1_' + f;
  if (inp.guardH && P.gbreak <= 0 && !P.guardOut) {
    const up = inp.up || inp.aimUp ? 'guardup' : 'guard';
    if (P.teeter) return `${up}walk_${Math.floor(P.edgeT / 0.09) % 2 ? 2 : 4}_${f}`;   // wobbling at the edge
    if (P.ground && Math.abs(P.vx) > 10) return `${up}walk_${(((Math.floor(P.guardDist / 9) % 4) + 4) % 4) + 1}_${f}`;
    return up + '_' + f;
  }
  if (P.glideT > 0) return 'glide_' + f;
  if (P.leapT > 0 && !P.ground && P.vy < 60 && !P.atk) return 'leap_' + f;              // bursting up out of the water
  if (!P.ground) return (P.vy < -110 ? 'rise_' : P.vy < 110 ? 'top_' : 'fall_') + f;
  if (P.landT > 0) return 'land_' + f;
  if (P.turnT > 0) return 'turn';
  if (Math.abs(P.vx) > 20) return `run_${(Math.floor(P.runDist / 11) % 4) + 1}_${f}`;
  if (P.lookT > 0) return (inp.up ? 'look_up_' : 'look_down_') + f;
  const cyc = [0.45, 0.25, 0.45, 0.25], tot = 1.4;
  let tt = P.idleT % tot, i = 0;
  while (tt > cyc[i]) { tt -= cyc[i]; i++; }
  return `idle_${i + 1}_${f}`;
}

// what his sword hits: walls (a spark and a little bounce back), the ball, and anything else in the room later
function doHits() {
  const box = attackBox(), a = P.atk;
  if ((a.type === 'side' || a.type === 'rollslash' || a.type === 'charged') && !a.hit.has('wall')) {
    const f = P.facing, x0 = P.x + f * HW, x1 = P.x + f * 40;
    const l = Math.min(x0, x1), r = Math.max(x0, x1);
    if (boxSolid(l, P.y - 44, r, P.y - 10)) {
      let wx = x0;
      while (Math.abs(wx - x0) < 40 && !boxSolid(wx - 0.5, P.y - 44, wx + 0.5, P.y - 10)) wx += f;
      a.hit.add('wall'); a.stopLunge = true;
      P.recoilT = 0.1; P.recoilV = -f * 240; hitstop = Math.max(hitstop, 0.03); shakeT = 0.06; shakeA = 1;
      spark(wx, P.y - 26); sfx.tink();
    }
  }
  const b = room.ball;
  if (b && !a.hit.has('ball') && overlap(box, { l: b.x - b.r, r: b.x + b.r, t: b.y - b.r, b: b.y + b.r })) {   // whack the ball
    a.hit.add('ball');
    b.vx = P.facing * (a.type === 'up' ? 60 : 300); b.vy = a.type === 'down' ? 200 : a.type === 'up' ? -380 : -160;
    sfx.bwong(); spark(b.x, b.y); hitstop = Math.max(hitstop, 0.03);
    if (a.type === 'down') pogo();
  }
  foeHits(box, a);
  hitBreaks(box, a);
  if (typeof bossHits === 'function') bossHits(box, a);
  if (a.type === 'down' && !a.hit.has('tacks') && boxHas(box.l, box.t, box.r, box.b, 3)) {
    a.hit.add('tacks'); spark(P.x, box.b - 10); pogo(); sfx.ding();
  }
}
