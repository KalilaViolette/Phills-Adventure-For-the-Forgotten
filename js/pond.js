'use strict';
// ---------- the Pond: deep water, swimming, the squeak, the glide, the Pond's Grime litter ----------
// Deep water (tile 4): without waterproofing he sinks, gets soggy (one puff) and comes back up where he last stood.
// Waterproof (from another region), he swims: left and right, up and down, jump at the top to climb out.

// ---- water
// deep water at a spot. Past the top or bottom of the room it's water if there's a swim door there: the water carries
// on into the next room (so he can swim up a shaft and out the top: he couldn't get back up the pipe)
function isWater(x, y) {
  if (!room) return false;
  const ty = Math.floor(y / T);
  if (ty < 0 || ty >= room.H) { const edge = ty < 0 ? 'top' : 'bottom'; return room.def.doors.some(d => d.edge === edge && d.swim && x >= d.a && x < d.b); }
  return tile(Math.floor(x / T), ty) === 4;
}
// water all the way from x0 to x1 at that height (nothing solid in between to swim through)
function wetWay(x0, x1, y) {
  const d = Math.sign(x1 - x0) * 8;
  for (let x = x0; d && Math.abs(x1 - x) > 8; x += d) if (!isWater(x, y)) return false;
  return isWater(x1, y);
}
function surfaceAt(x, y) {                         // the top of the water in this column (null if the water goes right up to a ceiling, or on into the room above)
  const c = Math.floor(x / T); let r = Math.floor(y / T);
  while (r > 0 && tile(c, r - 1) === 4) r--;
  if (r === 0 && isWater(x, -1)) return null;
  return tile(c, r - 1) === 1 ? null : r * T;
}
function splash(x, y, n = 10, big = 1) {
  for (let i = 0; i < n; i++) part(x + (Math.random() * 2 - 1) * 8, y, (Math.random() * 2 - 1) * 70 * big, -40 - Math.random() * 110 * big, 0.5, i % 3 ? '#c4e6e0' : '#ffffff', 2, 420);
  sfx.splash(big);
}
function bubblesAt(x, y, n = 1) { for (let i = 0; i < n; i++) part(x + (Math.random() * 2 - 1) * 4, y, (Math.random() * 2 - 1) * 8, -30 - Math.random() * 30, 1.0, '#d8f4f0', 1, -20); }

// ---- swimming foes: where a fish can be (in the water, not in the mud), moving it, pointing it
const FISH_FIT = [11, 16, 2];                                                               // half width, top above its feet, bottom above its feet
function fishBlock(x, y, fit = FISH_FIT) {                                                 // '' if it fits here, 'wall' if it'd be in the mud, 'air' if out of the water
  const l = x - fit[0], r = x + fit[0], t = y - fit[1], b = y - fit[2];
  if (l < T || r > room.pxW - T || t < T) return 'wall';
  if (boxSolid(l, t, r, b)) return 'wall';
  if (!isWater(l + 2, t + 2) || !isWater(r - 2, t + 2) || !isWater(x, b - 2)) return 'air';
  return '';
}
function fishMove(f, dx, dy, report) {                                                     // slides along whatever's in the way
  const fit = FOE[f.kind].fit, full = fishBlock(f.x + dx, f.y + dy, fit);
  if (!full) { f.x += dx; f.y += dy; return report ? '' : true; }
  if (!fishBlock(f.x + dx, f.y, fit)) f.x += dx; else if (!fishBlock(f.x, f.y + dy, fit)) f.y += dy;
  return report ? full : false;
}
function pikeSees(f) {                                                                     // a clear line of water from it to him
  const x0 = f.x, y0 = f.y - 8, x1 = P.x, y1 = P.y - 10;
  for (let i = 1; i < 12; i++) { const x = x0 + (x1 - x0) * i / 12, y = y0 + (y1 - y0) * i / 12; if (tile(Math.floor(x / T), Math.floor(y / T)) === 1 || !isWater(x, y)) return false; }
  return true;
}
const fishAngle = (f, ux, uy) => Math.max(-0.7, Math.min(0.7, Math.atan2(uy, Math.abs(ux)))) * (f.f > 0 ? 1 : -1);

// a step of Phill in deep water. Returns true if it took care of him this frame
function swimStep(dt, dir) {
  if (!room || P.respawnT > 0) return false;
  if (P.leapT > 0 && P.vy < 0) { if (P.swim) leaveWater(); return false; }        // on his way up out of it: the water lets go of him
  const inW = isWater(P.x, P.y - 8);
  if (!inW) { if (P.swim) leaveWater(); if (P.sinkT) P.sinkT = 0; return false; }
  if (!can('swim')) return sinkStep(dt);
  if (!P.swim) enterWater();
  if (P.hurtT > 0) P.hurtT = Math.max(0, P.hurtT - dt);                       // knocked back by a hit: it wears off in the water too (it never ran out in here, and with charging from the press it ate every swing after a hit: 10/16/2026)
  const surf = surfaceAt(P.x, P.y - 8);
  const atTop = surf !== null && P.y - 12 <= surf + 6;               // his back's just under the surface
  // the swing still works in the water
  const guarding = guardHeld();                                                   // the lid up under water (10/15/2026): slower behind it, no swinging
  // 8 ways under water (10/16/2026: fighting in the water was too hard with only left and right). He swims on
  // the diagonals, and the swing, the charged swing and the lid all point whichever of the 8 ways is held. The right
  // stick points them on its own while the left one goes on swimming. With just the direction keys they point it and
  // he swims that way behind it, slower (10/15/2026)
  const mx = dir, my = (inp.down ? 1 : 0) - (inp.up ? 1 : 0);
  let av = inp.aim && (inp.aimX || inp.aimY) ? [inp.aimX, inp.aimY] : mx || my ? [mx, my] : [P.facing, 0];
  const al = Math.hypot(av[0], av[1]); P.aimV = [av[0] / al, av[1] / al];
  const keysAim = false;
  if ((guarding || P.atkBufT > 0 || P.atkPress) && !world.flags.swimAimOnce) { world.flags.swimAimOnce = true; saveWorld(); tempPondHint('under water, the swing and the lid go whichever way you hold'); }
  const aimAtk = t => { startAttack(t); P.atk.ax = P.aimV[0]; P.atk.ay = P.aimV[1]; if (P.aimV[0]) P.facing = Math.sign(P.aimV[0]); };
  if (P.atkBufT > 0 && P.atkCD <= 0 && !P.atk && !guarding && P.charge <= 0) { if (spend('side')) { aimAtk('side'); P.vx += P.aimV[0] * 70; P.vy += P.aimV[1] * 70; P.dive = 0; } else P.atkBufT = 0; }   // the swing carries him a little the way it goes
  // the swing button held: charging from the moment it went down, like on land. Let go before it's full: a plain swing
  // that way. Let go full: he shoots that way, sword first
  if (inp.atkH) P.atkHeldT += dt; else P.atkHeldT = 0;
  if (P.atkPress) {
    if (guarding || P.dodgeBufT > 0 || P.hurtT > 0) { P.atkPress = false; P.charge = 0; }
    else if (!inp.atkH) {
      if (P.charge >= tune.chargeTime && spend('charged')) { aimAtk('charged'); P.vx = P.aimV[0] * 270; P.vy = P.aimV[1] * 270; P.swimLunge = 0.24; P.dive = 0; bubblesAt(P.x, P.y - 10, 6); }
      else P.atkBufT = Math.max(0.12, (P.atkCD || 0) + 0.06);   // (let go during the last swing: it waits for that one to finish, so a press in the combo isn't lost)
      P.atkPress = false; P.charge = 0;
    } else if (P.atk) {}
    else if (P.charge <= 0) P.charge = 0.001;
    else {
      const was = P.charge; P.charge += dt;
      if (was < CHARGE_SHOW && P.charge >= CHARGE_SHOW) sfx.chargeStart();
      if (was < tune.chargeTime && P.charge >= tune.chargeTime) { sfx.charged(); spark(P.x - P.aimV[0] * 10, P.y - 9 - P.aimV[1] * 10); }
      if (P.charge >= CHARGE_SHOW && Math.random() < dt * (P.charge >= tune.chargeTime ? 30 : 16)) {   // energy gathering in toward the sword
        const ang = Math.random() * Math.PI * 2, r = 22 + Math.random() * 10, tx = P.x - P.aimV[0] * 10, ty = P.y - 9 - P.aimV[1] * 10;
        addPart({ x: tx + Math.cos(ang) * r, y: ty + Math.sin(ang) * r, vx: -Math.cos(ang) * r * 3.2, vy: -Math.sin(ang) * r * 3.2, life: 0.3, max: 0.3, c: P.charge >= tune.chargeTime ? '#fff6d8' : '#ffd36b', s: 1, g: 0 });
      }
    }
  }
  if (P.atk) { const a = P.atk, info = ATK[a.type]; a.t += dt; if (atkLive(a)) doHits(); if (a.t >= info.frames[info.frames.length - 1]) P.atk = null; }
  const midSwing = P.atk && P.atk.t < ATK[P.atk.type].off;
  if (inp.aim) { if (P.aimV[0] && !midSwing) P.facing = Math.sign(P.aimV[0]); }            // the right stick turns him that way, any of the 8, while the left one swims (10/16/2026)
  else if (dir && !midSwing) P.facing = dir;
  // jump: out of the water at the top, or a strong kick up from underneath
  if (P.jumpBufT > 0) {
    P.jumpBufT = 0;
    if (atTop && hasHeadroom(STAND_H)) {                                             // up and out: half a jump on land (nothing to push off), the cape flap after it is a full one
      leaveWater(); P.vy = -jumpVel() * 0.71; P.leapT = 0.45; P.ground = false; P.jumpHeld = true; P.cut = false; P.flapUsed = false; P.dashUsed = false;
      splash(P.x, surf, 12, 1.0); sfx.jump(); P.fallTop = P.y; return true;
    }
    P.vy = -190; bubblesAt(P.x, P.y - 14, 3); sfx.bloop();
  }
  const swingBusy = P.atk && P.atk.t < ATK[P.atk.type].off;                      // (a swing commits him here too: the dash waits for its hitting part to be over)
  if (swingBusy && P.dodgeBufT > 0) P.dodgeBufT = Math.max(P.dodgeBufT, ATK[P.atk.type].off - P.atk.t + 0.05);
  if (P.dodgeBufT > 0 && !swingBusy && P.rollCD <= 0) {                          // the dash: whichever of the 8 ways he's swimming (10/16/2026: it only went left or right), or straight ahead
    P.dodgeBufT = 0;
    if (spend('roll')) {
      const dl = Math.hypot(mx, my), ux = dl ? mx / dl : P.facing, uy = dl ? my / dl : 0, sp = P.tiredDodge ? 220 : 320;   // (out of breath: a short, slow one)
      P.dashTired = P.tiredDodge; P.swimDash = P.tiredDodge ? 0.12 : 0.2; P.rollCD = P.tiredDodge ? 0.6 : 0.35;
      P.vx = ux * sp; P.vy = uy * sp; if (ux) P.facing = Math.sign(ux); bubblesAt(P.x, P.y - 10, 5); sfx.roll();
    }
  }
  P.swimDash = Math.max(0, (P.swimDash || 0) - dt);
  const slow = (P.leech && P.leech.state === 'latch' && foes.includes(P.leech) ? 0.55 : 1) * (guarding ? 0.55 : 1) * (P.charge >= CHARGE_SHOW ? 0.3 : 1);   // a gum leech stuck on him: heavy going. The lid up, or charging: slow too
  const diag = mx && my ? 0.72 : 1;
  const back = inp.aim && (mx || my) && mx * P.aimV[0] + my * P.aimV[1] < -0.3 ? tune.backSpeed : 1;   // swimming away from the way the right stick has him facing: slower
  const slowB = slow * back;                                                // a diagonal's as fast as straight, not faster
  const tvx = keysAim ? 0 : mx * 125 * slowB * diag, tvy = keysAim ? 0 : my < 0 ? -110 * slowB * diag : my > 0 ? 115 * slowB * diag : (surf !== null ? -40 : 0);   // left alone he floats up
  P.swimLunge = Math.max(0, (P.swimLunge || 0) - dt);
  if (P.swimDash <= 0 && P.swimLunge <= 0) P.vx += (tvx - P.vx) * Math.min(1, dt * 6);
  if (P.swimLunge <= 0 && P.swimDash <= 0) P.vy += (tvy - P.vy) * Math.min(1, dt * 4);
  if (surf !== null && P.y - 12 < surf + 2 && P.vy < 0) { P.vy = 0; if (!bodyHit(P.x, surf + 14 - P.h, surf + 14)) P.y = surf + 14; }   // bobbing along the top, head out (not down into a ledge just under the surface: the sunken toys, 10/16/2026)
  const n = Math.max(1, Math.ceil(Math.max(Math.abs(P.vx), Math.abs(P.vy)) * dt / 4));
  const vxWas = P.vx;
  fitBody();                                                                    // leveling out from a dive next to a wall: out of it first
  for (let i = 0; i < n; i++) { moveX(P.vx * dt / n); if (P.vy && moveY(P.vy * dt / n)) P.vy = 0; }   // (not moving up or down: no moveY, which reads standing still as bumping his head and shoves him down, into the bank in the sunken toys)
  // swimming into the bank at the top: he climbs out onto it
  // (or into something hanging just over the water in front of his head, like the log's top end in the lily pads: he
  // grabs its end instead of swimming on under it)
  const cAhead = Math.floor(((dir > 0 ? bodyR(P.x) : bodyL(P.x)) + dir * 2) / T), overhang = surf !== null && tile(cAhead, Math.floor((P.y - P.h - 14) / T)) === 1;
  if (dir && Math.abs(vxWas) > 30 && (P.vx === 0 || overhang) && surf !== null && P.y - 12 <= surf + 20) {
    const c = cAhead;
    for (let r = Math.floor((P.y - 66) / T); r <= Math.floor(P.y / T) + 1; r++) {          // he grabs the edge and pulls himself up, up to about 3 tiles above the water (he couldn't get up onto the root by the lily pads)
      const t0 = tile(c, r), up = tile(c, r - 1);
      if ((t0 === 1 || t0 === 2) && up !== 1 && up !== 4 && r * T >= P.y - 66) {
        if (r * T < P.y - P.h && boxSolid(P.x - HW + 2, r * T - 6, P.x + HW - 2, P.y - P.h)) break;   // something over his head (the log's top end in the lily pads): he can't pull himself up through it (a friend's playtest, 10/14/2026)
        const nx = c * T + T / 2;
        if (!boxSolid(nx - HW, r * T - STAND_H, nx + HW, r * T)) { P.x = nx; P.y = r * T; leaveWater(); P.ground = true; P.vy = 0; P.landT = 0.08; puff(P.x, P.y, 4, 30); splash(P.x - dir * 10, surf, 5, 0.6); return true; }
      }
    }
  }
  P.swimDist = (P.swimDist || 0) + (Math.abs(P.vx) + Math.abs(P.vy)) * dt;
  if (Math.abs(P.vy) > 60 && Math.abs(P.vx) < 40) P.dive = Math.sign(P.vy);          // going straight up or down: head first (drawn turned)
  else if (Math.abs(P.vy) < 30 || Math.abs(P.vx) > 70 || atTop) {
    const was = P.dive; P.dive = 0;
    if (was && bodyHit(P.x, P.y - P.h, P.y)) { fitBody(); if (bodyHit(P.x, P.y - P.h, P.y)) P.dive = was; }   // leveling out next to a wall: shuffle out from it, or stay head first if there's no room
  }
  {
    // which way he's pointed, kept as one angle all the way round (0 right, pi left) and turned smoothly toward where
    // he's going. Which way he faces comes from it, so it only flips over once he's past straight up or down. It used to
    // be a tilt on top of which way he faced, and circling the stick, the moment he faced the other way at the bottom
    // or the top of the circle he was drawn upside down for a few frames before it caught up (10/16/2026)
    const wrap = v => Math.atan2(Math.sin(v), Math.cos(v));
    let th, snap = false;
    if (P.atk && P.atk.ax !== undefined) { th = Math.atan2(P.atk.ay, P.atk.ax); snap = P.atk.t < 0.03; }   // a swing points him straight away
    else if (guarding || inp.aim || P.charge >= CHARGE_SHOW) th = Math.atan2(P.aimV[1], P.aimV[0]);
    else if (my && !atTop) th = Math.atan2(my, mx);
    else th = (mx || P.facing) > 0 ? 0 : Math.PI;                                   // level, the way he's swimming (or was)
    if (P.swimAng === undefined || P.swimAng === null) P.swimAng = P.facing > 0 ? 0 : Math.PI;
    const d = wrap(th - P.swimAng);
    if (snap || (Math.abs(d) > 2.6 && Math.abs(Math.sin(th)) < 0.5)) P.swimAng = th;   // turned right round on the level: he just turns, no slow roll through upside down
    else P.swimAng = wrap(P.swimAng + Math.sign(d) * Math.min(Math.abs(d), Math.max(Math.abs(d) * 14, 5) * dt));
    const c = Math.cos(P.swimAng);
    if (c > 0.08) P.facing = 1; else if (c < -0.08) P.facing = -1;                // (straight up or down: keeps whichever it was)
    P.swimRot = wrap(P.swimAng - (P.facing > 0 ? 0 : Math.PI));
  }
  if (Math.random() < dt * (atTop ? 0.4 : 2.2)) bubblesAt(P.x + P.facing * 8, P.y - 14);
  if (atTop && Math.abs(P.vx) > 40 && Math.random() < dt * 8) part(P.x - P.facing * 8, surf, -P.facing * 30, -30, 0.3, '#c4e6e0', 1, 300);   // a little wake
  P.ground = false; P.coyoteT = 0; P.dashUsed = false; P.fallTop = P.y;
  return true;
}
function enterWater() {
  const fast = P.vy > 150;
  P.swim = true; P.h = ROLL_H; P.roll = 0; P.dash = 0; P.crawl = false; P.hang = null; P.reach = null; P.charge = 0; P.glideT = 0; P.hangN = 0; P.airHang = null; P.swimAng = null;
  P.vy *= 0.3; P.vx *= 0.6;
  const s = surfaceAt(P.x, P.y - 8);
  if (s !== null && fast) splash(P.x, s, 12, 1.2);
  if (!world.flags.swamOnce) { world.flags.swamOnce = true; saveWorld(); tempPondHint('{up} {down} to swim. {jump} at the top to climb out'); }
}
function leaveWater() {
  P.swim = false; P.swimDash = 0; P.swimLunge = 0; P.swimRot = 0; P.swimAng = null; P.dive = 0; P.dripT = 1.6;
  if (hasHeadroom(STAND_H)) P.h = STAND_H; else { P.crawl = true; P.h = ROLL_H; }
}
// not waterproof: down he goes
function sinkStep(dt) {
  if (!P.sinkT) {
    P.sinkT = 0.001; P.atk = null; P.roll = 0; P.dash = 0; P.hang = null; P.charge = 0; P.glideT = 0;
    const s = surfaceAt(P.x, P.y - 8); splash(P.x, s === null ? P.y - 20 : s, 14, 1.3);
    if (!world.flags.sankOnce) { world.flags.sankOnce = true; saveWorld(); popup(P.x, P.y - 60, 'too deep. he sinks like a stone', '#cfd6e6'); }
  }
  P.sinkT += dt; P.vx *= Math.pow(0.05, dt); P.vy = 34;
  moveX(P.vx * dt); moveY(P.vy * dt);
  if (Math.random() < dt * 10) bubblesAt(P.x, P.y - 20);
  if (P.sinkT > 0.8) { P.sinkT = 0; P.inv = 0; P.respawnT = 0; hurt(P.x, 'water', 1); P.soggyT = 5; if (P.ko <= 0) popup(P.safeX, P.safeY - 50, 'soggy', '#96d2ff'); }   // and he's slow and dripping for a bit after (he said soggy and wasn't)
  P.ground = false;
  return true;
}
function tempPondHint(text, until) { room.hints.push({ text, l: 0, t: 0, r: room.pxW, b: room.pxH + 40, x: P.x, y: P.y - 62, a: 0, until, life: 6 }); }

// ---- the cape: hold jump on the way down to glide (from the Old Oak, not the Pond)
const gliding = () => can('glide') && !P.ground && inp.jumpH && P.vy > 0 && !P.atk && P.dash <= 0 && !P.swim && !P.hang && P.hurtT <= 0;

// ---- the squeak: he squeezes his squeaker as hard as he can. A ring of sound: knocks the litter back, pops Grime foam
const squeaks = [];
function startSqueak() {
  if (P.ko > 0 || P.respawnT > 0 || P.sinkT) return;
  if (P.en <= 0) { P.enFlash = 0.3; sfx.tired(); return; }
  P.en = Math.max(0, P.en - (typeof specialCost === 'function' ? specialCost(18) : 18)); P.enDelay = tune.enDelay; if (P.en <= 0) P.winded = true;
  P.squeakT = 0.3; P.squeakCD = 0.55; P.atk = null;
  if (typeof specialUsed === 'function') specialUsed('squeak');
  squeaks.push({ x: P.x, y: P.y - (P.swim ? 10 : 18), t: 0, hit: new Set() });
  sfx.squeakBig(); shakeT = Math.max(shakeT, 0.08); shakeA = Math.max(shakeA, 1);
  if (!world.flags.squeakedOnce) { world.flags.squeakedOnce = true; saveWorld(); }
}
const SQUEAK_R = 84, SQUEAK_FORGET = 5;
// What a squeak does grows with him (10/18/2026). Early on it's a fright, not a weapon: no damage, it doesn't
// clear shots (the fluff burst does that), the litter flinches for a moment (that's the opening for the sword), something
// in the middle of a heavy attack doesn't flinch at all, and a boss only jumps when it's caught in its moment (boss.js
// bossHeard). His heart (world.heart, 0 for now: the heart powers aren't in yet) takes it further, till at the end it's
// pure heart light pouring out of him, a ring that hurts and stuns everything round him. The later steps are a first go
const heartLv = () => Math.max(0, Math.min(3, Math.floor((typeof DBG !== 'undefined' && DBG.heart != null ? DBG.heart : world.heart) || 0)));   // (the menu's Heart button tries the later ones)
const SQUEAK_STAGE = [
  { dmg: 0, stun: 0.35, shots: false, heavy: false, bossAny: false },   // a fright
  { dmg: 0, stun: 0.5, shots: true, heavy: false, bossAny: false },     // his heart waking: it rings out brighter, puts out shots
  { dmg: 1, stun: 0.7, shots: true, heavy: false, bossAny: false },     // it stings
  { dmg: 2, stun: 1.0, shots: true, heavy: true, bossAny: true },       // pure heart light: hurts and stuns all round him, bosses too
];
const squeakStage = () => SQUEAK_STAGE[heartLv()];
function updateSqueaks(dt) {
  const st = squeakStage();
  for (const s of squeaks) {
    s.t += dt;
    const r = Math.min(SQUEAK_R, 10 + s.t * 300);
    for (const f of foes) {
      if (f.state === 'down' || f.state === 'hidden' || s.hit.has(f)) continue;
      const b = foeBox(f), cx = (b.l + b.r) / 2, cy = (b.t + b.b) / 2;
      if (Math.hypot(cx - s.x, cy - s.y) > r + 8) continue;
      s.hit.add(f);
      if (FOE[f.kind].squeaked) { FOE[f.kind].squeaked(f, s); continue; }                     // some of them take a squeak their own way
      // they get used to it (a friend's playtest, 10/14/2026): the first squeak stings and stuns, the next ones only
      // stun for less and less, and a fourth in a row they just shrug off. It wears off again after a few quiet seconds
      const res = f.squeakRes || 0;
      f.squeakRes = res + 1; f.squeakResT = SQUEAK_FORGET;
      if (res >= 3) { popup(cx, b.t - 8, 'used to it', '#cfd6e6'); continue; }
      if (f.heavy && !st.heavy) { if (!f.toldHeavy) { f.toldHeavy = 1; popup(cx, b.t - 8, "it doesn't flinch", '#cfd6e6'); } continue; }   // too far into a heavy attack to be startled
      if (st.dmg && res === 0) { if (!foeHurt(f, st.dmg, Math.sign(cx - s.x || 1) * 200, cx, cy)) foeStagger(f, st.stun); }
      else { foeStagger(f, st.stun / (1 + res)); for (let i = 0; i < 3; i++) part(cx + (i - 1) * 4, b.t - 4, (i - 1) * 30, -50, 0.35, '#fff6d8', 1, 0); }   // a little jump of fright
    }
    for (const b of room.breaks) {
      if (b.broken || s.hit.has(b) || (b.need !== 'squeak' && b.look !== 'foam')) continue;
      const nx = Math.max(b.x0 * T, Math.min((b.x1 + 1) * T, s.x)), ny = Math.max(b.y0 * T, Math.min((b.y1 + 1) * T, s.y));
      if (Math.hypot(nx - s.x, ny - s.y) > r) continue;
      s.hit.add(b); breakOpen(b);
    }
    if (st.shots) for (const sh of shots) if (!sh.reflected && Math.hypot(sh.x - s.x, sh.y - s.y) < r) { sh.dead = true; part(sh.x, sh.y, 0, -20, 0.3, '#ffffff', 2, 0); }
    if (!s.hit.has('boss') && bossHeard(s.x, s.y, r, 'squeak')) s.hit.add('boss');
  }
  for (let i = squeaks.length - 1; i >= 0; i--) if (squeaks[i].t > 0.32) squeaks.splice(i, 1);
}

// ---------- the Pond's Grime litter ----------
// they all face left in their pictures. Knocked out, they drop smooth pebbles
const onFloorAt = (x, y) => { const v = tile(Math.floor(x / T), Math.round(y / T)); return v === 1 || v === 2; };
// whether he'd hear a foe's little noises (hopping, landing): it has to be on screen and fairly close to him
// (the chattering teeth could be heard from anywhere in the room)
function heard(f, r = 300) {
  return typeof cam !== 'undefined' && f.x > cam.x - 16 && f.x < cam.x + VW + 16 && f.y > cam.y - 16 && f.y < cam.y + VH + 32
    && Math.abs(P.x - f.x) < r && Math.abs(P.y - f.y) < r;
}
// landed: its walk is the ground it's on now. Anything that walks the ground, not just the real jumpers: a sponge that
// started out in the water sank to the bottom with the walk it had up where it started, two pixels wide, and sprang
// straight up and down for good (the enemy audit, 10/17/2026)
function landRange(f) { if (FOE[f.kind].free) return; const r = patrol(f.x, f.y); if (r[1] >= r[0]) f.range = r; }
// a tile's top a hopper can land on: a one-way shelf, or plain ground whose tile hasn't been reshaped by the natural
// ground's pixels (where it has, the pixels say where the top really is, and groundY already found it). It was landing
// on the old tile line in the air over a rounded top (the terrain audit, 10/17/2026)
function coarseFloor(x, gy) { const c = Math.floor(x / T), r = Math.round(gy / T), v = tile(c, r); if (v === 2) return true; return v === 1 && !(room.detail && room.detail[r * room.W + c]); }
function hopFoe(f, dt, grav = 700) {               // something in the air: falls, lands on the ground (or a pad)
  const wet = isWater(f.x, f.y - 6);
  f.vy = Math.min(f.vy + grav * (wet ? 0.25 : 1) * dt, wet ? 90 : 500);
  if (FOE[f.kind].leaps) {                          // a real jumper (the frog): it can land up on a ledge, so a hop isn't kept to the run it started on. Walls still stop it
    let nx = f.x + (f.hopVX || 0) * dt;
    const hw = FOE[f.kind].hw || 8;                   // the real ground's shape, not just its tiles (it was hopping into the slopes and bumps, 10/16/2026)
    if (boxSolid(nx - hw + 2, f.y - 12, nx + hw - 2, f.y - 4)) { nx = f.x; f.hopVX = 0; }
    f.x = Math.max(2 * T, Math.min(room.pxW - 2 * T, nx));
  } else f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + (f.hopVX || 0) * dt));
  const prev = f.y; f.y += f.vy * dt;
  if (FOE[f.kind].leaps) {                           // coming down beside a ledge it was clear of a moment ago: slide out of its side, not into it (the teeth were ending up inside the fountain's rim: the audit rerun, 10/16/2026)
    const hw = FOE[f.kind].hw || 8, inside = x => boxSolid(x - hw + 2, f.y - 12, x + hw - 2, f.y - 4);
    if (inside(f.x)) for (let d = 1; d <= 2 * hw; d++) { const s2 = [-1, 1].find(s2 => !inside(f.x + s2 * d)); if (s2) { f.x += s2 * d; f.hopVX = 0; break; } }
  }
  if (f.vy > 0) {                                     // landing on the ground's real top where it has bumps, before the tile line
    const g2 = groundY(f.x, prev, Math.ceil(f.y - prev) + 1, 0);
    if (g2 !== null && g2 <= f.y && g2 >= prev - 0.01) { f.y = g2; f.vy = 0; f.air = false; landRange(f); return true; }
  }
  if (f.vy > 0 && room.ramps && room.ramps.length) {                                 // down onto a one-way slope (a root): up through it is fine, coming down it holds
    const ry = rampY(f.x, prev, Math.max(0.01, f.y - prev), 0.01);
    if (ry !== null && ry >= prev - 0.01 && ry <= f.y) { f.y = ry; f.vy = 0; f.air = false; landRange(f); return true; }
  }
  if (f.vy > 0) { const gy = Math.floor(f.y / T) * T; if (gy >= prev - 0.01 && coarseFloor(f.x, gy)) { f.y = gy; f.vy = 0; f.air = false; landRange(f); return true; } }
  else if (tile(Math.floor(f.x / T), Math.floor((f.y - 14) / T)) === 1) f.vy = 0;          // bumped its head
  if (f.y > room.pxH + 30) { f.y = f.y0; f.x = f.x0; f.vy = 0; f.air = false; if (!FOE[f.kind].free) f.range = patrol(f.x, f.y); return true; }   // fell out the bottom: back where it started, and landed (a frog was left mid hop for good, 10/16/2026)
  return false;
}
const near = (f, dx, dy) => phillAround() && !(P.story && !P.story.free) && Math.abs(P.x - f.x) < dx && Math.abs(P.y - f.y) < dy;
const strike = (f, box, cost = 18, dmg = 1) => {
  if (f.state !== 'down') { f.atkBox = box; f.atkT = 0.08; }                          // for the hitbox view: this attack's reach, while it's live (10/16/2026)
  if (f.state === 'down' || f.hitP || !phillAround() || (P.story && !P.story.free) || !artHit(f, box)) return null;   // not in the middle of a little scene. (On him, and on the part of it that's drawn there: artHit)
  f.hitP = true; const out = foeStrike(f.x, f.kind, { cost, dmg, y: (box.t + box.b) / 2, heavy: f.heavy });
  if (out === 'parried') { foeStagger(f, 1.4); f.vel = -f.f * 140; }
  if (out === 'blocked') { f.flash = Math.max(f.flash || 0, 0.08); if (!f.vel && !FOE[f.kind].free) f.vel = -Math.sign(P.x - f.x || f.f) * 60; }   // a block's neutral: it flinches like any hit, no opening
  return out;
};
const wobble = f => (f.state === 'stagger' ? Math.round(Math.sin(f.t * 12) * 1.5) : 0);
const baseState = (f, dt) => {                     // the states every one of them shares
  if (f.state === 'stagger' && f.t >= f.stagT) { setFoeState(f, 'walk'); f.cd = 0.8; }
  if (f.state === 'hurt' && f.t >= 0.25) { setFoeState(f, 'walk'); f.cd = 0.5; }
};
const DOWN_FRAME = { down: '_down', stagger: '_dizzy' };
// ---- bits the Pond's new attacks share (10/16/2026)
function ringOut(x, y, r, col = '#d8f0f4', n = 14) { for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; part(x + Math.cos(a) * 4, y + Math.sin(a) * 2, Math.cos(a) * r / 0.3, Math.sin(a) * r / 0.6, 0.3, col, 1, 0); } }
// a drop of water flung at him (a wring, a splash). wet: soaks him (slow and dripping, like getting wrung out)
const waterDrop = (f, x, y, vx, vy, g = 300, wet = false) => shots.push({ kind: 'drop', col: '#9cd4e8', x, y, vx, vy, g, from: f, reflected: false, t: 0,
  draw: sh => { ctx.fillStyle = '#c4e6f0'; ctx.fillRect(Math.round(sh.x) - 1, Math.round(sh.y) - 2, 3, 4); ctx.fillStyle = '#5a9ab4'; ctx.fillRect(Math.round(sh.x) - 1, Math.round(sh.y) + 1, 3, 1); },
  onMeet: out => { if (out === 'hit' && wet) P.soggyT = Math.max(P.soggyT || 0, 3); } });
// a bubble that drifts after him and pops on him (the straw's stream, the bath fish's mines)
const bubbleShot = (f, x, y, vx, vy, opts = {}) => shots.push(Object.assign({ kind: 'bubble', col: '#d8f4f0', x, y, vx, vy, g: 0, from: f, reflected: false, t: 0, life: 3, r: 4,
  upd: (sh, dt) => { if (!sh.reflected && !sh.still) { const ddx = P.x - sh.x, ddy = P.y - 18 - sh.y, d = Math.hypot(ddx, ddy) || 1; sh.vx += (ddx / d * (sh.sp || 50) - sh.vx) * dt * 0.8; sh.vy += (ddy / d * (sh.sp || 50) - sh.vy) * dt * 0.8; } sh.vy += Math.sin(sh.t * 5) * 14 * dt; },
  draw: sh => { if (sh.spr) { spr(sh.spr + (Math.floor(sh.t * 3) % 2 + 1), sh.x, sh.y, false); return; } ctx.strokeStyle = '#d8f4f0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(sh.x, sh.y, sh.r, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(sh.x - sh.r * 0.5), Math.round(sh.y - sh.r * 0.6), 1, 1); } }, opts));

Object.assign(FOE, {
  // the rubber duck: waddles back and forth, then lowers its head and charges. Newer (10/16/2026): if the charge runs
  // into a wall or the end of its ground it turns and charges straight back, a squeak up close that sends a ring out
  // along the ground (jump it), and a leap that comes down on him with a splash
  duck: { hp: 5, hw: 11, h: 20, acorns: [1, 2], walker: true,
    harmless: f => ['charge', 'leap', 'squeak'].includes(f.state),
    update(f, dt) {
      baseState(f, dt);
      if (f.yoff < 0 && f.state !== 'leap') hopArc(f, dt);
      const dx = P.x - f.x, adx = Math.abs(dx), level = Math.abs(P.y - f.y) < 30;
      if (f.state === 'walk') {
        if (!chaseWalk(f, dt, 44, 60)) {
          f.x += f.f * 30 * dt;
          if (f.x <= f.range[0]) { f.x = f.range[0]; f.f = 1; } else if (f.x >= f.range[1]) { f.x = f.range[1]; f.f = -1; }
        }
        if (f.cd <= 0 && near(f, 150, 60)) {
          const m = choose([[level && adx > 20 ? 2 : 0, 'wind'], [hasMove(f, 3) && level && adx < 56 ? (adx < 20 ? 3 : 1.6) : 0, 'puff'], [hasMove(f, 4) && adx > 40 && adx < 130 ? 1.2 : 0, 'crouch']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); f.bounced = false; m === 'puff' ? sfx.inflate() : sfx.squeak(); }
        }
      } else if (f.state === 'wind' || f.state === 'turnwind') { if (f.t >= (f.state === 'wind' ? 0.5 : 0.25)) { setFoeState(f, 'charge'); sfx.whoosh(); } }
      else if (f.state === 'charge') {
        const was = f.x; f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.f * 200 * dt));
        if (Math.random() < dt * 20) part(f.x - f.f * 10, f.y, -f.f * 30, -20, 0.3, '#c4b090', 1, 200);
        const out = strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 18, b: f.y }, 20);
        if (out === 'blocked') { f.vel = -f.f * 100; setFoeState(f, 'rest'); }
        else if (f.x === was && hasMove(f, 2) && !f.bounced) { f.bounced = true; f.f = Math.abs(P.x - f.x) > 12 ? Math.sign(P.x - f.x) : -f.f; setFoeState(f, 'turnwind'); puff(f.x - f.f * 10, f.y - 8, 4, 30); if (heard(f)) sfx.bump(); }   // into the end of its ground: round, and back again
        else if (f.t >= 0.75 || f.x === was) setFoeState(f, 'rest');
      } else if (f.state === 'puff') { if (f.t >= 0.4) { setFoeState(f, 'squeak'); sfx.squeakBig ? sfx.squeakBig() : sfx.squeak(); ringOut(f.x - f.f * 4, f.y - 4, 60, '#faf0c8'); } }
      else if (f.state === 'squeak') {                                                 // the ring rolls out along the ground both ways: jump it
        const r = 18 + Math.min(1, f.t / 0.3) * 48;
        if (f.t < 0.3) strike(f, { l: f.x - r, r: f.x + r, t: f.y - 14, b: f.y, area: true }, 16);   // (area: the ring rolling out, not its picture)
        if (f.t >= 0.6) setFoeState(f, 'rest');
      } else if (f.state === 'crouch') { if (f.t >= 0.35) { setFoeState(f, 'leap'); f.vy = -320; f.hopVX = hopTo(f, P.x, -320); f.yoff = -0.01; sfx.jump(); } }
      else if (f.state === 'leap') {
        const landed = hopArc(f, dt);
        if (f.vy > -60) strike(f, { l: f.x - 12, r: f.x + 12, t: f.y + f.yoff - 20, b: f.y + f.yoff }, 20);
        if (landed) {                                                                 // splash: a drop of water flung off each side
          splash(f.x, f.y, 8, 0.6); for (const s2 of [-1, 1]) waterDrop(f, f.x + s2 * 10, f.y - 6, s2 * 150, -120, 500);
          setFoeState(f, 'rest');
        }
      } else if (f.state === 'rest' && f.t >= 0.6) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random(); }
    },
    frame: f => ({ walk: 'duck_walk_' + (Math.floor(f.t * 7) % 2 + 1), wind: 'duck_wind', turnwind: 'duck_wind', charge: 'duck_charge', puff: 'duck_squeak', squeak: 'duck_squeak', crouch: 'duck_wind', leap: 'duck_leap',
      down: 'duck_down', stagger: 'duck_dizzy', rest: 'duck_walk_1', hurt: 'duck_walk_1' })[f.state] || 'duck_walk_1' },

  // the fishing bobber: bobs at the top of the water, ducks under, pops up near him and spits. Newer (10/16/2026): it
  // casts its hook at him and reels him in, three quick spits in a row, and (from under) pops right up under him
  bobber: { hp: 4, hw: 7, h: 14, acorns: [1, 2], free: true,
    setup(f) { const s = surfaceAt(f.x, f.y + 4); f.sy = s === null ? f.y : s; f.y = f.sy; f.homeX = f.x; },
    box: f => (f.state === 'under' || f.state === 'sneak' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 7, r: f.x + 7, t: f.y - 14, b: f.y + 4 }),
    harmless: f => f.state === 'pop',
    update(f, dt) {
      baseState(f, dt);
      const dx = P.x - f.x;
      if (f.state === 'walk') {
        f.y = f.sy + Math.sin(f.t * 3) * 1.5;
        const d = Math.sin(f.t * 0.8) * 10 * dt;
        if (isWater(f.x + d + Math.sign(d) * 7, f.sy + 4)) f.x += d;                    // (its drift kept going one way and carried it up onto the bank in a small pool)
        if (near(f, 200, 160) && f.cd <= 0) {
          const over = isWater(P.x, f.sy + 4) && P.y > f.sy - 70 && P.y < f.sy + 30 && Math.abs(P.x - f.homeX) < 8 * T && wetWay(f.x, P.x, f.sy + 4);   // he's over (or in) the water near enough to get under (its own water, not the next pool over)
          const m = choose([[2, 'under'], [hasMove(f, 2) && near(f, 170, 120) ? 1.3 : 0, 'castwind'], [hasMove(f, 3) ? 1.2 : 0, 'under3'], [hasMove(f, 4) && over ? 1.3 : 0, 'sneak']]);
          f.triple = m === 'under3';
          if (m === 'castwind') { setFoeState(f, 'castwind'); f.f = Math.sign(dx) || f.f; sfx.windup(); }
          else if (m) { setFoeState(f, m === 'sneak' ? 'sneak' : 'under'); sfx.plop(); splash(f.x, f.sy, 5, 0.5); }
        }
      } else if (f.state === 'under') {                                                    // out of sight, drifting over toward him
        const tx = Math.max(f.homeX - 7 * T, Math.min(f.homeX + 7 * T, P.x - Math.sign(dx || 1) * 50));
        const nx = f.x + Math.sign(tx - f.x) * Math.min(Math.abs(tx - f.x), 90 * dt);
        if (isWater(tx, f.sy + 4) && isWater(nx + Math.sign(tx - f.x) * 7, f.sy + 4)) f.x = nx;           // (only through water: it used to slip straight through a stump or a rock in the way and come up inside it)
        if (f.t >= 0.9) { setFoeState(f, 'aim'); f.y = f.sy; splash(f.x, f.sy, 6, 0.6); f.f = Math.sign(dx) || f.f; }
      } else if (f.state === 'sneak') {                                                    // the same, but right under him...
        const tx = Math.max(f.homeX - 8 * T, Math.min(f.homeX + 8 * T, P.x));
        const nx = f.x + Math.sign(tx - f.x) * Math.min(Math.abs(tx - f.x), 130 * dt);
        if (isWater(tx, f.sy + 4) && isWater(nx + Math.sign(tx - f.x) * 7, f.sy + 4)) f.x = nx;
        if (Math.random() < dt * 12) bubblesAt(f.x, f.sy + 6);
        if (f.t >= 0.8 && Math.abs(tx - f.x) < 6) { setFoeState(f, 'pop'); f.y = f.sy + 8; splash(f.x, f.sy, 10, 0.9); sfx.splash(1); }
        else if (f.t >= 1.6) { setFoeState(f, 'aim'); f.y = f.sy; }
      } else if (f.state === 'pop') {                                                      // ...and shoots straight up out of the water at him
        f.y = f.t < 0.2 ? f.sy + 8 - (f.t / 0.2) * 40 : Math.min(f.sy, f.y + 120 * dt);
        strike(f, { l: f.x - 8, r: f.x + 8, t: f.y - 18, b: f.y + 4 }, 20);
        if (f.t >= 0.7) { f.y = f.sy; setFoeState(f, 'spit'); f.t = 0.1; }
      } else if (f.state === 'aim') {
        f.y = f.sy - Math.min(4, f.t * 30);
        if (f.t >= 0.45) { setFoeState(f, 'spit'); f.shot = 0; }
      } else if (f.state === 'spit') {
        const n = f.triple ? 3 : 1;
        while (f.shot !== undefined && f.shot < n && f.t >= f.shot * 0.16) {
          sfx.spit();
          const tx = P.x, ty = P.y - 18, sx = f.x + f.f * 4, sy = f.y - 12, time = Math.max(0.45, Math.min(0.9, Math.abs(tx - sx) / 200));
          shots.push({ kind: 'pblob', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 600 * time, g: 600, from: f, reflected: false, t: 0 });
          f.shot++;
        }
        if (f.t >= 0.4 + (n - 1) * 0.16) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random(); f.shot = undefined; f.triple = false; }
      } else if (f.state === 'castwind') {                                                 // tipped back...
        f.y = f.sy;
        if (f.t >= 0.4) {                                                                 // ...and its hook flung out on the line at him
          setFoeState(f, 'cast'); sfx.whip();
          const sx = f.x, sy = f.sy - 18, tx = P.x, ty = P.y - 18, time = Math.max(0.35, Math.min(0.6, Math.hypot(tx - sx, ty - sy) / 300));
          shots.push({ kind: 'hook', col: '#b4bcc6', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 300 * time, g: 300, from: f, reflected: false, t: 0, life: 1.2,
            draw: sh => { ctx.strokeStyle = 'rgba(220,226,230,0.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(f.x, f.y - 16); ctx.lineTo(sh.x, sh.y); ctx.stroke(); spr('bobber_hook', sh.x, sh.y, sh.vx > 0); },
            onMeet: out => { if (out === 'hit' && f.state === 'cast') { setFoeState(f, 'reel'); tellOnce('bobberHook', f, 'hooked him', 30); } } });
        }
      } else if (f.state === 'cast') { f.y = f.sy; if (f.t >= 1.2) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random(); } }
      else if (f.state === 'reel') {                                                       // hooked: reeling him in to it
        f.y = f.sy;
        pullHim(f.x, 190, dt);
        if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random(); }
      }
    },
    draw(f) {
      if (f.state === 'under' || f.state === 'sneak') { ctx.fillStyle = 'rgba(30,60,70,0.5)'; ellipse(f.x, f.sy + 3, 5, 1); return; }
      if (f.state === 'reel') { ctx.strokeStyle = 'rgba(220,226,230,0.85)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(f.x, f.y - 16); ctx.lineTo(P.x, P.y - 18); ctx.stroke(); }
      const fr = { walk: 'bobber_bob_' + (Math.floor(f.t * 3) % 2 + 1), aim: 'bobber_spit', spit: 'bobber_spit', castwind: 'bobber_cast', cast: 'bobber_cast', reel: 'bobber_cast', pop: 'bobber_pop', down: 'bobber_down', stagger: 'bobber_dizzy' }[f.state] || 'bobber_bob_1';
      const sh = f.state === 'castwind' ? Math.round(Math.sin(f.t * 60)) : 0;
      spr(fr, f.x + wobble(f) + sh, f.y, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (Math.sin(f.t * 3) > 0.95) { ctx.fillStyle = 'rgba(220,240,240,0.6)'; ellipse(f.x, f.sy + 1, 9, 0); }       // a ripple round it
    },
    frame: () => 'bobber_bob_1' },

  // the plastic bag: drifts toward him like a jellyfish, then billows out at him. Newer (10/16/2026): a billow that
  // lands half the time wraps it round him (mash free before it squeezes), it rides a gust in a swoop across at him,
  // and it blows itself up and bursts the air out at him, shoving him back
  bag: { hp: 4, hw: 10, h: 22, acorns: [1, 1], free: true,
    setup(f) { f.y -= 20; f.hx = f.x; f.hy = f.y; },
    box: f => (f.state === 'wrap' ? { l: -999, r: -998, t: -999, b: -998 } : f.state === 'inflate' || f.state === 'blast' ? { l: f.x - 14, r: f.x + 14, t: f.y - 30, b: f.y - 4 } : { l: f.x - 10, r: f.x + 10, t: f.y - 26, b: f.y - 6 }),
    harmless: f => ['billow', 'gust', 'wrap', 'blast'].includes(f.state),
    update(f, dt) {
      baseState(f, dt);
      const dx = P.x - f.x, dy = (P.y - 20) - (f.y - 16), d = Math.hypot(dx, dy);
      if (f.state === 'walk') {
        // round walls now, not through them (10/16/2026: it was floating inside the rock a lot and looked buried)
        if (near(f, 200, 160)) { flyTo(f, P.x, P.y - 4, 26, dt); f.f = Math.sign(dx) || f.f; }
        else flyTo(f, f.hx, f.hy, 14, dt);
        freeMove(f, 0, Math.sin(f.t * 2) * 8 * dt);
        if (f.cd <= 0 && near(f, 200, 160)) {
          const m = choose([[near(f, 70, 60) ? 2 : 0, 'billow'], [hasMove(f, 3) && d > 70 && sightLine(f.x, f.y - 16, P.x, P.y - 18) ? 1.1 : 0, 'gustup'], [hasMove(f, 4) && near(f, 90, 80) ? 1.2 : 0, 'inflate']]);
          if (m === 'billow') { setFoeState(f, 'billow'); f.dx = Math.sign(dx); f.dy = Math.sign(dy) * 0.5; sfx.whoosh(); }
          else if (m) { setFoeState(f, m); f.side = Math.sign(f.x - P.x) || 1; m === 'inflate' ? sfx.inflate() : sfx.whoosh(); }
        }
      } else if (f.state === 'billow') {
        if (f.t > 0.35) {
          freeMove(f, f.dx * 170 * dt, f.dy * 120 * dt);
          const out = strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 28, b: f.y - 4 }, 14);
          if (out === 'hit' && hasMove(f, 2) && P.health > 0 && Math.random() < 0.5) { pinHim(f, 6); setFoeState(f, 'wrap'); tellOnce('bagWrap', f, 'mash to wriggle free', 40); return; }
        }
        if (f.t >= 0.8) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random(); }
      } else if (f.state === 'wrap') {                                                  // wrapped round him, squeezing
        if (!pinnedBy(f)) { setFoeState(f, 'stagger'); f.stagT = 1.2; releaseClear(f, 24, -10); return; }   // he got out: it's left crumpled up for a moment, somewhere open (it was being put inside the rock, the terrain audit 10/17/2026)
        f.x = P.x; f.y = P.y + 6;
        if (f.t >= 1.6) { P.pinned = null; hurt(f.x, 'bag', 1); setFoeState(f, 'walk'); f.cd = 2; releaseClear(f, 20, -30); }
      } else if (f.state === 'gustup') {                                                // caught on a gust, it goes up...
        freeMove(f, f.side * 20 * dt, -60 * dt);
        if (f.t >= 0.5) { setFoeState(f, 'gust'); f.gx = f.x; f.gy = f.y; f.gtx = P.x - f.side * 70; f.gty = P.y - 14; sfx.whoosh(); }
      } else if (f.state === 'gust') {                                                  // ...and swoops down across at him in an arc
        const k = Math.min(1, f.t / 0.9), nx = f.gx + (f.gtx - f.gx) * k, ny = f.gy + (f.gty - f.gy) * Math.sin(k * Math.PI) * 1.0 + (f.gty - f.gy) * 0;
        freeMove(f, nx - f.x, (f.gy + (f.gty - f.gy) * Math.sin(k * Math.PI)) - f.y);
        f.f = Math.sign(f.gtx - f.gx) || f.f;
        strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 24, b: f.y - 6 }, 16);
        if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random(); }
      } else if (f.state === 'inflate') {                                               // blowing itself up...
        if (f.t >= 0.7) {                                                               // ...and bursting it all out at him
          setFoeState(f, 'blast'); sfx.boom ? sfx.boom() : sfx.pop(); ringOut(f.x, f.y - 16, 70, '#eef6f6', 18); shakeT = 0.1; shakeA = 1.5;
          if (d < 90 && phillAround() && !(P.story && !P.story.free)) {
            const covered = guardUp() && Math.sign(f.x - P.x) === P.facing;
            if (covered) { P.recoilT = 0.15; P.recoilV = -P.facing * 200; sfx.block(); }
            else { strike(f, { l: P.x - 4, r: P.x + 4, t: P.y - 30, b: P.y, area: true }, 14);   /* (area: the blast) */ if (P.hurtT > 0 || P.inv > 0) { P.vx = Math.sign(P.x - f.x || 1) * 300; P.vy = Math.min(P.vy, -200); P.ground = false; } }
          }
        }
      } else if (f.state === 'blast') { if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.8 + Math.random(); } }
      if (f.state !== 'wrap') { f.x = Math.max(2 * T, Math.min(room.pxW - 2 * T, f.x)); f.y = Math.max(4 * T, Math.min(room.pxH - T, f.y)); }
      if (f.state === 'down') { f.y = Math.min(f.y + 40 * dt, room.pxH - T); }
    },
    draw(f) {
      if (f.state === 'wrap') return;                                                   // (drawn over him: drawOnPhill)
      const fr = FOE.bag.frame(f), sh = f.state === 'inflate' ? Math.round(Math.sin(f.t * 50)) : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 11, 1);
      spr(fr, f.x + sh, f.y, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
    },
    frame: f => ({ walk: 'bag_drift_' + (Math.floor(f.t * 2) % 2 + 1), billow: f.t > 0.35 ? 'bag_billow' : 'bag_drift_2', gustup: 'bag_drift_2', gust: 'bag_gust', inflate: 'bag_inflate', blast: 'bag_billow', down: 'bag_down', stagger: 'bag_dizzy' })[f.state] || 'bag_drift_1' },

  // the wind-up tin frog: sits, crouches, hops at him in arcs. Newer (10/16/2026): a high hop that comes down in a
  // belly flop and sends a shock along the ground (jump it), three quick hops in a row, and (a region out, so every
  // Pond frog) a huge leap right up off the screen that comes down where he is, its shadow on the ground the warning
  frog: { hp: 5, hw: 9, h: 14, acorns: [1, 2], leaps: true,
    box: f => (f.state === 'sky' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 9, r: f.x + 9, t: f.y - 14, b: f.y }),
    harmless: f => f.state === 'sky' || f.state === 'quake',
    update(f, dt) {
      baseState(f, dt);
      if (f.state === 'sky') {                                                         // up out of sight: drifting over to where he is
        if (f.t < 0.6) f.tx = Math.max(2 * T, Math.min(room.pxW - 2 * T, P.x));
        f.x += Math.sign(f.tx - f.x) * Math.min(Math.abs(f.tx - f.x), 260 * dt);
        if (f.t >= 0.95) { const gy = groundY(f.x, f.y - 8 * T, 16 * T, 0) ?? f.y0; let y = gy - 150; while (y < gy - 16 && boxSolid(f.x - 9, y - 14, f.x + 9, y)) y += 6; f.y = y; f.vy = 420; f.hopVX = 0; f.air = true; setFoeState(f, 'fall'); f.big = true; }
        return;
      }
      if (f.air) {
        if (hopFoe(f, dt)) {
          puff(f.x, f.y, 3, 25); if (heard(f)) sfx.thunk();
          if (f.flop || f.big) { setFoeState(f, 'quake'); f.flop = false; f.big = false; ringOut(f.x, f.y - 2, 50, '#c4b090'); shakeT = 0.1; shakeA = 1.5; sfx.thud(); return; }
          if (f.hops > 1) { f.hops--; setFoeState(f, 'crouch'); f.quick = true; return; }
          setFoeState(f, 'walk'); f.cd = 0.5 + Math.random() * 0.6; f.hops = 0;
        }
        strike(f, foeBox(f), 16); return;
      }
      if (f.state === 'walk' && f.cd <= 0) {
        const on = near(f, 220, 80), sees = near(f, 220, 130);                            // it sees him up on a ledge a few tiles above too, and hops up after him (the audit rerun, 10/16/2026: it hopped off the other way and lost him)
        const m = choose([[2, 'crouch'], [hasMove(f, 2) && on ? 1.2 : 0, 'flopcrouch'], [hasMove(f, 3) && on ? 1.2 : 0, 'triple'], [hasMove(f, 4) && near(f, 18 * T, 8 * T) ? 0.9 : 0, 'bigcrouch']]);
        f.f = sees ? (Math.sign(P.x - f.x) || f.f) : (Math.random() < 0.5 ? -1 : 1);
        if (!m) { f.cd = 0.3; return; }
        if (m === 'triple') { f.hops = 3; f.quick = true; setFoeState(f, 'crouch'); } else setFoeState(f, m);
        sfx.ticking();
      } else if ((f.state === 'crouch' || f.state === 'flopcrouch') && f.t >= (f.quick ? 0.16 : f.state === 'flopcrouch' ? 0.45 : 0.35)) {
        const on = near(f, 220, 130), up = on && P.y < f.y - 12, high = on && P.y < f.y - 40;   // he's up on something: a bigger hop, to get up there with him (it couldn't)
        if (on) f.f = Math.sign(P.x - f.x) || f.f;
        f.flop = f.state === 'flopcrouch'; f.quick = false;
        setFoeState(f, 'hop'); f.air = true; f.vy = f.flop ? -380 : high ? -380 : up ? -320 : -260;
        f.hopVX = on ? Math.max(-130, Math.min(130, (P.x - f.x) / (2 * -f.vy / 700))) : f.f * 70;   // after him, it aims to come down on him (it was overshooting him every time, 10/16/2026)
        if (on && Math.abs(f.hopVX) < 30) f.hopVX = f.f * 30;
        sfx.hop();
      } else if (f.state === 'bigcrouch') { if (f.t >= 0.55) { setFoeState(f, 'sky'); sfx.boing(); puff(f.x, f.y, 6, 40); f.tx = P.x; } }
      else if (f.state === 'quake') {                                                   // the shock along the ground, both ways
        if (f.t < 0.18) strike(f, { l: f.x - 52, r: f.x + 52, t: f.y - 10, b: f.y + 2, area: true }, 16);   // (area: the shock along the ground)
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 0.9 + Math.random() * 0.6; }
      }
    },
    draw(f) {
      if (f.state === 'sky' || (f.state === 'fall' && f.big)) {                         // its shadow, growing as it comes down
        const gy = groundY(f.x, (f.state === 'sky' ? f.y0 : f.y) - 4 * T, 12 * T, 0);
        if (gy !== null) { const k = f.state === 'sky' ? Math.min(1, f.t / 0.95) * 0.6 : 0.6 + Math.min(0.4, (f.t || 0)); ctx.fillStyle = `rgba(0,0,0,${(0.15 + 0.25 * k).toFixed(2)})`; ellipse(f.x, gy, Math.round(4 + 8 * k), 1); }
        if (f.state === 'sky') return;
      }
      const fr = FOE.frog.frame(f), sh = /crouch/.test(f.state) ? Math.round(Math.sin(f.t * 60)) : 0;
      if (!f.air) { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 10, 1); }
      spr(fr, f.x + sh, f.y, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 7) - 1, Math.round(f.y - 20 + Math.sin(a) * 2), 2, 2); }
    },
    frame: f => (f.air ? (f.flop && f.vy > -100 ? 'frog_flop' : 'frog_hop') : ({ crouch: 'frog_crouch', flopcrouch: 'frog_crouch', bigcrouch: 'frog_crouch', quake: 'frog_flop', down: 'frog_down', stagger: 'frog_dizzy' })[f.state] || 'frog_sit') },

  // the soggy sponge: soaks up plain swings, squishes down and springs at him. Newer (10/16/2026): it wrings itself out
  // at him (a drop of that soaks him through, slow and dripping), tumbles end over end at him, and (in the Pond and
  // further, not the sunk roots) jumps up and pounds down, the water bursting out along the ground both ways (jump it)
  sponge: { hp: 5, hw: 10, h: 16, acorns: [2, 3], soak: true,
    harmless: f => f.state === 'tumble' || f.state === 'splash',
    update(f, dt) {
      baseState(f, dt);
      const wet = isWater(f.x, f.y - 6);
      if (f.air) {
        if (hopFoe(f, dt, wet ? 500 : 800)) {
          if (f.pound) { f.pound = false; setFoeState(f, 'splash'); splash(f.x, f.y, 10, 0.8); ringOut(f.x, f.y - 2, 46, '#9cd4e8'); for (const s2 of [-1, 1]) waterDrop(f, f.x + s2 * 12, f.y - 4, s2 * 170, -90, 500, true); return; }
          setFoeState(f, 'walk'); f.cd = 0.8 + Math.random() * 0.6; puff(f.x, f.y, 4, 30, '#9ac0c8'); sfx.splort();
        }
        strike(f, foeBox(f), 20); return;
      }
      if (wet && !onFloorAt(f.x, Math.ceil((f.y + 1) / T) * T) && f.state !== 'down') { f.air = true; f.vy = 0; f.hopVX = 0; return; }   // underwater: sinking slowly to the bottom
      const dx = P.x - f.x, adx = Math.abs(dx), level = Math.abs(P.y - f.y) < 30;
      if (f.state === 'walk' && f.cd <= 0 && near(f, 180, 120)) {
        const m = choose([[2, 'squish'], [hasMove(f, 2) && adx > 36 ? 1.3 : 0, 'wring'], [hasMove(f, 3) && level && adx > 30 ? 1.2 : 0, 'tumblewind'], [hasMove(f, 4) ? 1.1 : 0, 'poundcrouch']]);
        if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); sfx.splort(); }
      }
      else if (f.state === 'squish' && f.t >= 0.4) { setFoeState(f, 'spring'); f.air = true; f.vy = wet ? -200 : -300; f.hopVX = f.f * 90; sfx.hop(); }
      else if (f.state === 'wring') {                                                  // twisting itself up...
        if (f.t >= 0.45 && !f.wrung) {                                                // ...and wringing a spray of it out at him
          f.wrung = true; sfx.splash(0.5);
          for (let i = 0; i < 3; i++) waterDrop(f, f.x + f.f * 10, f.y - 12, f.f * (200 + i * 30), -60 - i * 30, 300, true);
        }
        if (f.t >= 0.8) { f.wrung = false; setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.6; }
      } else if (f.state === 'tumblewind') { if (f.t >= 0.35) { setFoeState(f, 'tumble'); sfx.roll(); } }
      else if (f.state === 'tumble') {                                                 // end over end at him along its ground
        const nx = f.x + f.f * 150 * dt, stop = nx <= f.range[0] || nx >= f.range[1];
        f.x = Math.max(f.range[0], Math.min(f.range[1], nx)); f.spin = (f.spin || 0) + dt * 9;
        strike(f, { l: f.x - 11, r: f.x + 11, t: f.y - 18, b: f.y }, 18);
        if (stop || f.t >= 1.2) { setFoeState(f, 'rest'); puff(f.x, f.y, 4, 30, '#9ac0c8'); }
      } else if (f.state === 'rest' && f.t >= 0.7) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.6; }
      else if (f.state === 'poundcrouch' && f.t >= 0.4) { setFoeState(f, 'spring'); f.air = true; f.pound = true; f.vy = wet ? -260 : -380; f.hopVX = Math.max(-150, Math.min(150, (P.x - f.x) / (2 * -f.vy / (wet ? 500 : 800)))); sfx.hop(); }
      else if (f.state === 'splash') {
        if (f.t < 0.2) strike(f, { l: f.x - 46, r: f.x + 46, t: f.y - 10, b: f.y + 2, area: true }, 16);   // (area: the splash, not its picture)
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.6; }
      }
    },
    frame: f => (f.air ? (f.vy < 0 ? 'sponge_spring' : f.pound ? 'sponge_pound' : 'sponge_idle_1') : ({ squish: 'sponge_squish', poundcrouch: 'sponge_squish', tumblewind: 'sponge_squish', wring: 'sponge_wring', tumble: 'sponge_roll_' + (Math.floor(f.spin || 0) % 2 + 1), rest: 'sponge_dizzy', splash: 'sponge_pound', down: 'sponge_down', stagger: 'sponge_dizzy' })[f.state] || 'sponge_idle_' + (Math.floor(f.t * 2) % 2 + 1)) },

  // the bendy straw: slithers along the ground, coils up and lunges. Newer (10/16/2026): spits a blob at him through
  // itself, arches up into a hoop and flips right over him to lunge from behind, and (a region out) blows a stream of
  // bubbles that drift after him
  straw: { hp: 4, hw: 14, h: 8, acorns: [1, 1], walker: true,
    harmless: f => f.state === 'arch',
    update(f, dt) {
      baseState(f, dt);
      if (f.wet === undefined) f.wet = tile(Math.floor(f.x / T), Math.round(f.y / T) - 1) === 4;   // it lives on the bottom underwater (worked out once, where it starts)
      const wet = f.wet;
      if (f.yoff < 0 && f.state !== 'arch') hopArc(f, dt);
      const dx = P.x - f.x, adx = Math.abs(dx);
      if (f.state === 'walk') {
        if (wet || !chaseWalk(f, dt, 56)) {                                              // on land it comes after him; on the bottom it keeps to the mud
          f.x += f.f * 40 * dt;
          if (f.x <= f.range[0]) { f.x = f.range[0]; f.f = 1; } else if (f.x >= f.range[1]) { f.x = f.range[1]; f.f = -1; }
          if (wet) followBottom(f, dt);
        }
        if (f.cd <= 0 && near(f, 180, wet ? 80 : 60)) {
          const m = choose([[near(f, 90, wet ? 64 : 40) ? 2 : 0, 'coil'], [hasMove(f, 2) && adx > 50 ? 1.3 : 0, 'spitwind'], [hasMove(f, 3) && !wet && near(f, 100, 30) && adx > 24 ? 1.2 : 0, 'archwind'], [hasMove(f, 4) ? 1.1 : 0, 'blowwind']]);   // the lunge from where it reaches
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); m === 'coil' ? sfx.hiss() : sfx.windup(); }
        }
      } else if (f.state === 'coil' && f.t >= 0.45) { setFoeState(f, 'lunge'); sfx.whip(); }
      else if (f.state === 'lunge') {
        f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.f * 240 * dt)); if (wet) followBottom(f, dt);
        strike(f, { l: f.x + (f.f > 0 ? 0 : -24), r: f.x + (f.f > 0 ? 24 : 0), t: f.y - 18, b: f.y }, 16);
        if (f.t >= 0.25) setFoeState(f, 'rest');
      } else if (f.state === 'rest' && f.t >= 0.6) { setFoeState(f, 'walk'); f.cd = 1 + Math.random(); }
      else if (f.state === 'spitwind') {                                               // head up, aimed...
        f.f = Math.sign(dx) || f.f;
        if (f.t >= 0.4) {                                                             // ...a blob spat out through itself
          const sx = f.x + f.f * 20, sy = f.y - 14, tx = P.x, ty = P.y - 16, time = Math.max(0.3, Math.min(0.7, Math.abs(tx - sx) / 260));
          shots.push({ kind: 'pblob', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * (wet ? 100 : 400) * time, g: wet ? 100 : 400, from: f, reflected: false, t: 0 });
          sfx.spit(); setFoeState(f, 'rest'); f.t = 0.2;
        }
      } else if (f.state === 'archwind') { if (f.t >= 0.3) { setFoeState(f, 'arch'); f.vy = -300; f.hopVX = hopTo(f, P.x + f.f * 34, -300); f.yoff = -0.01; sfx.boing(); } }
      else if (f.state === 'arch') {                                                   // up into a hoop and over him...
        if (hopArc(f, dt)) { f.f = -f.f; setFoeState(f, 'coil'); f.t = 0.22; if (heard(f)) sfx.land(); }   // ...and straight round for a lunge from behind
      } else if (f.state === 'blowwind') { f.f = Math.sign(dx) || f.f; if (f.t >= 0.45) { setFoeState(f, 'blow'); f.shot = 0; } }
      else if (f.state === 'blow') {                                                   // a stream of bubbles out of it, drifting after him
        while (f.shot < 5 && f.t >= f.shot * 0.14) { bubbleShot(f, f.x + f.f * 20, f.y - 14, f.f * 110, -20 - f.shot * 6, { sp: wet ? 60 : 45, life: wet ? 3.2 : 2.4, r: 3 + (f.shot % 2) }); f.shot++; if (heard(f)) sfx.bloop(); }
        if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.8 + Math.random(); }
      }
    },
    frame: f => ({ walk: 'straw_slither_' + (Math.floor(f.t * 6) % 2 + 1), coil: 'straw_coil', lunge: 'straw_lunge', spitwind: 'straw_spit', archwind: 'straw_coil', arch: 'straw_arch', blowwind: 'straw_blow', blow: 'straw_blow',
      down: 'straw_down', stagger: 'straw_dizzy', rest: 'straw_slither_1' })[f.state] || 'straw_slither_1' },

  // the wind-up bath fish: a tin toy that swims after him underwater, circling and keeping its painted tin face to him
  // (the sword just clanks off that). It winds itself up, aims and lunges. Swim-dash past the lunge and it shoots on by,
  // and tin's slow to turn round: hit it from behind while it does. Lunge into the mud and it knocks itself silly
  fishtoy: { hp: 5, hw: 11, h: 15, acorns: [2, 3], free: true,
    setup(f) { f.y -= 4; f.hx = f.x; f.hy = f.y; f.ang = 0; f.last = [f.x, f.y]; f.orb = Math.random() * 6; },
    box: f => ({ l: f.x - 11, r: f.x + 11, t: f.y - 16, b: f.y - 2 }),
    deflectText: 'it clanks off its tin face. get round behind it',
    deflect: f => !['turn', 'stagger', 'hurt', 'down'].includes(f.state) && Math.sign(P.x - f.x) === f.f,
    keepState: f => f.state === 'turn',                                                     // hits while it's turning don't stop it turning: the whole opening's there to use
    squeaked: f => { if (f.state !== 'stagger') foeStagger(f, 0.9); },                       // tin: a squeak rattles it but doesn't dent it
    update(f, dt) {
      if (fishBlock(f.x, f.y)) [f.x, f.y] = f.last;                                         // knocked into the mud or out of the water by a hit: back where it was
      baseState(f, dt);
      if (f.state === 'down') { if (!fishBlock(f.x, f.y - 30 * dt)) f.y -= 30 * dt; f.ang = 0; f.last = [f.x, f.y]; return; }   // belly up, bobbing up slowly
      const dx = P.x - f.x, dy = (P.y - 10) - (f.y - 9), d = Math.hypot(dx, dy) || 1;
      const hunting = P.swim && phillAround() && !(P.story && !P.story.free) && d < 300;
      if (f.state === 'walk' || f.state === 'hurt' || f.state === 'stagger') {
        f.ang *= Math.pow(0.02, dt);
        if (f.state === 'stagger') { f.last = [f.x, f.y]; return; }
        if (hunting) {
          f.orb += dt * 0.9;                                                                 // circling round him, keeping its distance
          const tx = P.x + Math.cos(f.orb) * 80, ty = P.y - 12 + Math.sin(f.orb) * 44;
          const mx = tx - f.x, my = ty - f.y, ml = Math.hypot(mx, my) || 1;
          fishMove(f, mx / ml * Math.min(ml, 85 * dt), my / ml * Math.min(ml, 85 * dt));
          f.f = Math.sign(dx) || f.f;                                                        // always its tin face toward him
          if (f.state === 'walk' && f.cd <= 0 && d < 170) {                                // its newer three (10/16/2026): two lunges in a row, bubble mines, and a corkscrew
            const m = choose([[d < 150 ? 2 : 0, 'aim'], [hasMove(f, 3) ? 1.2 : 0, 'mineaim'], [hasMove(f, 4) ? 1.2 : 0, 'spinaim']]);
            if (m) { setFoeState(f, m); f.again = false; sfx.ticking(); }
          }
        } else {                                                                             // nothing to chase: idles about where it lives
          const mx = f.hx + Math.sin(f.t * 0.45) * 48 - f.x, my = f.hy + Math.sin(f.t * 0.8) * 10 - f.y;
          fishMove(f, Math.sign(mx) * Math.min(Math.abs(mx), 32 * dt), Math.sign(my) * Math.min(Math.abs(my), 20 * dt));
          if (Math.abs(mx) > 3) f.f = Math.sign(mx);
        }
      } else if (f.state === 'aim') {                                                        // winding itself up: backs off a little, shaking, aimed at him
        f.f = Math.sign(dx) || f.f;
        fishMove(f, -dx / d * 22 * dt, -dy / d * 22 * dt);
        f.ang = fishAngle(f, dx / d, dy / d);
        if (f.t >= 0.42 && !f.glint) { f.glint = true; spark(f.x + f.f * 13, f.y - 10); sfx.glint(); }
        if (f.t >= 0.6) { f.glint = false; f.ldx = dx / d; f.ldy = dy / d; setFoeState(f, 'lunge'); sfx.whoosh(); }
      } else if (f.state === 'reaim') {                                                      // a second go, quick: round and aimed again
        f.f = Math.sign(dx) || f.f; f.ang = fishAngle(f, dx / d, dy / d);
        if (f.t >= 0.3) { f.ldx = dx / d; f.ldy = dy / d; setFoeState(f, 'lunge'); sfx.whoosh(); }
      } else if (f.state === 'mineaim') {                                                    // backing off, shaking...
        f.f = Math.sign(dx) || f.f; fishMove(f, -dx / d * 30 * dt, -dy / d * 30 * dt);
        if (f.t >= 0.5) {                                                                    // ...and three bubble mines left hanging in the water between them
          for (let i = -1; i <= 1; i++) { const a = Math.atan2(dy, dx) + i * 0.6; bubbleShot(f, f.x + Math.cos(a) * 16, f.y - 9 + Math.sin(a) * 16, Math.cos(a) * 40, Math.sin(a) * 40, { kind: 'mine', still: true, life: 4.5, spr: 'fishtoy_mine_', upd: (sh, dt2) => { sh.vx *= Math.pow(0.2, dt2); sh.vy *= Math.pow(0.2, dt2); sh.vy += Math.sin(sh.t * 3 + i) * 6 * dt2; } }); }
          sfx.bloop(); setFoeState(f, 'turn'); f.ldx = -dx / d * 0.3; f.ldy = -dy / d * 0.3; f.t = 0.5;
        }
      } else if (f.state === 'spinaim') {
        f.f = Math.sign(dx) || f.f; f.ang += dt * 10; fishMove(f, -dx / d * 20 * dt, -dy / d * 20 * dt);
        if (f.t >= 0.5) { f.ldx = dx / d; f.ldy = dy / d; setFoeState(f, 'corkscrew'); sfx.whirl(); }
      } else if (f.state === 'corkscrew') {                                                  // spinning round and round, screwing its way at him in a spiral
        const w = Math.sin(f.t * 16) * 140;
        const block = fishMove(f, (f.ldx * 230 - f.ldy * w) * dt, (f.ldy * 230 + f.ldx * w) * dt, true);
        f.ang += dt * 18;
        strike(f, foeBox(f), 18);
        if (f.state !== 'corkscrew') { f.last = [f.x, f.y]; return; }
        if (block === 'wall' && f.t > 0.15) { foeStagger(f, 1.8); sfx.clank(); f.ang = 0; puff(f.x + f.f * 12, f.y - 8, 6, 30, '#5a4a3a'); }
        else if (f.t >= 0.85) { setFoeState(f, 'turn'); f.ang = 0; }
      } else if (f.state === 'lunge') {
        const block = fishMove(f, f.ldx * 300 * dt, f.ldy * 300 * dt, true);
        strike(f, foeBox(f), 18);
        if (f.state !== 'lunge') { f.last = [f.x, f.y]; return; }                            // parried: it's reeling
        if (block === 'wall') {                                                              // nose first into the mud: it knocks itself silly
          foeStagger(f, 1.8); sfx.clank(); shakeT = 0.12; shakeA = 1.5; puff(f.x + f.f * 12, f.y - 8, 6, 30, '#5a4a3a');
          if (!world.flags.fishBonk) { world.flags.fishBonk = true; popup(f.x, f.y - 34, 'it knocked itself silly', '#ffd36b'); }
        } else if ((block === 'air' || f.t >= 0.45) && hasMove(f, 2) && !f.again && Math.random() < 0.6) { f.again = true; setFoeState(f, 'reaim'); }   // and straight round for another (10/16/2026)
        else if (block === 'air' || f.t >= 0.45) setFoeState(f, 'turn');
      } else if (f.state === 'turn') {                                                       // tin's slow to turn round: its back's to him for a moment
        const k = Math.max(0, 1 - f.t / 0.5);
        fishMove(f, f.ldx * 140 * k * dt, f.ldy * 140 * k * dt);
        f.ang *= Math.pow(0.05, dt);
        if (f.t >= 1.15) { f.f = Math.sign(dx) || f.f; setFoeState(f, 'walk'); f.cd = 1.3 + Math.random() * 0.7; }
      }
      f.last = [f.x, f.y];
    },
    frame: f => f.state === 'down' ? 'fishtoy_down' : f.state === 'stagger' ? 'fishtoy_dizzy' : ['aim', 'reaim', 'mineaim', 'spinaim'].includes(f.state) ? 'fishtoy_aim' : f.state === 'lunge' || f.state === 'corkscrew' ? 'fishtoy_lunge'
      : f.state === 'turn' ? (f.t < 0.4 ? 'fishtoy_swim_2' : f.t < 0.95 ? 'fishtoy_turn' : 'fishtoy_swim_1') : 'fishtoy_swim_' + (Math.floor(f.t * 6) % 2 + 1),
    draw(f) {
      const fr = FOE.fishtoy.frame(f), shake = /aim$/.test(f.state) ? Math.round(Math.sin(f.t * 60)) : f.state === 'stagger' ? Math.round(Math.sin(f.t * 12) * 1.5) : 0;
      ctx.save(); ctx.translate(Math.round(f.x + shake), Math.round(f.y - 9)); ctx.rotate(f.ang || 0);
      spr(fr, 0, 9, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, 0, 9, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      ctx.restore();
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 8) - 1, Math.round(f.y - 24 + Math.sin(a) * 2), 2, 2); }
      if (f.state !== 'down' && Math.random() < 0.08) bubblesAt(f.x - f.f * 12, f.y - 10);
    } },

  // the rubber glove jelly: a washing up glove full of Grime, drifting after him underwater in little pulses like a
  // jellyfish. Touch its fingers and they sting. The sword just squishes into it. A squeak gives it a fright: it puffs
  // up like a balloon and floats up to the top, stiff and harmless, and that's when it can be hit
  glove: { hp: 4, hw: 10, h: 22, acorns: [1, 2], free: true, fit: [10, 20, -10],
    setup(f) { f.y -= 6; f.hx = f.x; f.hy = f.y; f.vx = 0; f.vy = 0; f.pt = Math.random() * 0.8; f.last = [f.x, f.y]; },
    box: f => (f.state === 'puff' ? { l: f.x - 11, r: f.x + 11, t: f.y - 20, b: f.y + 4 } : { l: f.x - 9, r: f.x + 9, t: f.y - 20, b: f.y + 12 }),
    harmless: f => ['puff', 'grab', 'hold', 'slap'].includes(f.state),
    // (before he's learned the squeak it says to leave it for now, not to use something he hasn't got: the teaching audit, 10/18/2026)
    deflectText: () => can('squeak') ? 'the sword just squishes into it. maybe give it a fright' : "the sword just squishes into it. nothing he has gets through. swim round it for now",
    hint: () => can('squeak') ? 'a squeak ({squeak}) might give it a fright' : 'something would have to give it a fright. later, maybe',
    deflect: f => f.state !== 'puff' && f.state !== 'down',
    keepState: f => f.state === 'puff',                                                    // hits don't cut the puff short
    squeaked(f) {
      if (f.state === 'down' || f.state === 'puff') return;                               // (already puffed: squeaking again doesn't keep it up longer, 10/18/2026)
      sfx.inflate(); puff(f.x, f.y - 8, 6, 30, '#faea8a');
      setFoeState(f, 'puff'); f.vx = 0; f.vy = 0;
      if (!world.flags.glovePuff) { world.flags.glovePuff = true; popup(f.x, f.y - 40, 'it puffed right up', '#ffd36b'); }
    },
    update(f, dt) {
      if (fishBlock(f.x, f.y, FOE.glove.fit)) [f.x, f.y] = f.last;                         // knocked into the mud or out of the water by a hit: back where it was
      baseState(f, dt);
      if (f.state === 'down') { fishMove(f, 0, 26 * dt); f.last = [f.x, f.y]; return; }       // empty and limp, sinking to the bottom
      if (f.state === 'puff') {                                                            // up it goes, bobbing at the top (or under a ceiling)
        if (f.t < 3) { if (!fishMove(f, Math.sin(f.t * 2) * 6 * dt, -64 * dt)) f.y += Math.sin(f.t * 5) * 6 * dt; }
        if (f.t >= 3.6) { setFoeState(f, 'walk'); f.cd = 0.6; f.pt = 0.4; if (heard(f)) sfx.whoosh(); }
        f.last = [f.x, f.y]; return;
      }
      if (f.state === 'stagger') { f.last = [f.x, f.y]; return; }
      const dx = P.x - f.x, dy = (P.y - 8) - (f.y - 2), d = Math.hypot(dx, dy) || 1;
      const hunting = P.swim && phillAround() && !(P.story && !P.story.free) && d < 260;
      // its newer three (10/16/2026): a grab that holds on and squeezes (mash free), a slap, and a cloud of Grime
      if (f.state === 'walk' && hunting && f.cd <= 0 && d < 110) {
        const m = choose([[hasMove(f, 2) && d < 70 ? 1.3 : 0, 'grabwind'], [hasMove(f, 3) && d < 40 ? 1.3 : 0, 'slapwind'], [hasMove(f, 4) ? 1 : 0, 'inkwind']]);
        if (m) { setFoeState(f, m); f.f = Math.sign(dx) || f.f; f.vx = f.vy = 0; m === 'inkwind' ? sfx.inflate() : sfx.squelch ? sfx.squelch() : sfx.splort(); }
        else f.cd = 0.4;
      }
      if (f.state === 'grabwind') { fishMove(f, -dx / d * 12 * dt, -dy / d * 12 * dt); if (f.t >= 0.35) { setFoeState(f, 'grab'); f.ldx = dx / d; f.ldy = dy / d; sfx.grab(); } f.last = [f.x, f.y]; return; }
      if (f.state === 'grab') {                                                          // fingers out, lunging to grab him
        fishMove(f, f.ldx * 200 * dt, f.ldy * 200 * dt);
        const out = strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 10, b: f.y + 16 }, 18);
        if (out === 'hit' && P.health > 0) { pinHim(f, 6); setFoeState(f, 'hold'); tellOnce('gloveGrab', f, 'mash to wriggle free', 40); f.last = [f.x, f.y]; return; }
        if (f.t >= 0.3) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; }
        f.last = [f.x, f.y]; return;
      }
      if (f.state === 'hold') {                                                          // squeezing him in its fist
        if (!pinnedBy(f)) { setFoeState(f, 'walk'); f.cd = 1.6; f.vx = -(P.facing || 1) * 90; f.last = [f.x, f.y]; return; }
        P.pinned.x = f.x + Math.sin(f.t * 25) * 2; P.pinned.y = f.y + 26;
        if (f.t >= 1.6) { P.pinned = null; hurt(f.x, 'glove', 1); setFoeState(f, 'walk'); f.cd = 1.8; }
        f.last = [f.x, f.y]; return;
      }
      if (f.state === 'slapwind') { f.f = Math.sign(dx) || f.f; if (d > 20) fishMove(f, f.f * 40 * dt, Math.sign(dy) * Math.min(Math.abs(dy), 20 * dt));   /* drifting in on the wind up: the drawn slap reaches about 17 out (10/16/2026) */ if (f.t >= 0.35) { setFoeState(f, 'slap'); sfx.swish(); } f.last = [f.x, f.y]; return; }
      if (f.state === 'slap') {                                                          // swung round flat at him
        if (f.t < 0.2) strike(f, { l: Math.min(f.x, f.x + f.f * 36), r: Math.max(f.x, f.x + f.f * 36), t: f.y - 8, b: f.y + 14 }, 18);
        if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; }
        f.last = [f.x, f.y]; return;
      }
      if (f.state === 'inkwind') {                                                       // squeezing itself...
        if (f.t >= 0.4) {                                                                // ...and a cloud of Grime gushes out, drifting at him
          setFoeState(f, 'walk'); f.cd = 2.2 + Math.random() * 0.6; f.vy = -60; sfx.splort();
          shots.push({ kind: 'ink', col: '#32204a', x: f.x, y: f.y + 16, vx: dx / d * 35, vy: dy / d * 25, g: 0, from: f, reflected: false, t: 0, life: 3, r: 8, noHit: true,
            upd: (sh, dt2) => { sh.r = Math.min(26, sh.r + 30 * dt2); sh.vx *= Math.pow(0.4, dt2); sh.vy *= Math.pow(0.4, dt2);
              if (!sh.hit && phillAround() && sh.t > 0.2 && overlap({ l: sh.x - sh.r * 0.8, r: sh.x + sh.r * 0.8, t: sh.y - sh.r * 0.7, b: sh.y + sh.r * 0.7 }, { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y })) { sh.hit = true; foeStrike(sh.x, 'glove', { cost: 10 }); }
              if (f.state !== 'down') { f.atkBox = { l: sh.x - sh.r * 0.8, r: sh.x + sh.r * 0.8, t: sh.y - sh.r * 0.7, b: sh.y + sh.r * 0.7 }; f.atkT = 0.08; } },
            draw: sh => { const a = Math.max(0, Math.min(0.75, (3 - sh.t) / 1.2)); ctx.fillStyle = `rgba(30,18,42,${(a * 0.7).toFixed(2)})`; for (const [ox, oy, k] of [[0, 0, 1], [-0.5, 0.2, 0.7], [0.5, -0.2, 0.7], [0.1, 0.5, 0.6]]) { ctx.beginPath(); ctx.arc(sh.x + ox * sh.r, sh.y + oy * sh.r, sh.r * k, 0, Math.PI * 2); ctx.fill(); } } });
        }
        f.last = [f.x, f.y]; return;
      }
      f.pt -= dt;
      if (P.inv > 0 && P.hurtT > 0 && d < 40) { f.vx = -dx / d * 80; f.vy = -dy / d * 60; f.pt = Math.max(f.pt, 0.9); }   // just stung him: it backs off a little
      else if (f.pt <= 0) {                                                                // a pulse: squeezes and shoots a little way
        f.pt = 1.05 + Math.random() * 0.25; f.pulseT = 0.3;
        if (hunting) { f.vx += dx / d * 125; f.vy += dy / d * 110; f.f = Math.sign(dx) || f.f; }
        else { const hx = f.hx - f.x, hy = f.hy - f.y, h = Math.hypot(hx, hy); if (h > 10) { f.vx += hx / h * 50; f.vy += hy / h * 50; } else f.vy -= 30; }
        bubblesAt(f.x, f.y + 6, 2);
      }
      f.pulseT = Math.max(0, (f.pulseT || 0) - dt);
      f.vx *= Math.pow(0.25, dt); f.vy *= Math.pow(0.25, dt);
      f.vy += 8 * dt;                                                                       // and between pulses it sinks, just a little
      if (!fishMove(f, f.vx * dt, f.vy * dt)) { f.vx *= 0.5; f.vy *= 0.5; }
      f.last = [f.x, f.y];
    },
    frame: f => f.state === 'down' ? 'glove_down' : f.state === 'stagger' ? 'glove_dizzy' : f.state === 'grab' || f.state === 'hold' ? 'glove_grab' : f.state === 'grabwind' ? 'glove_pulse' : f.state === 'slapwind' || f.state === 'slap' ? (f.state === 'slap' || f.t > 0.2 ? 'glove_slap' : 'glove_pulse') : f.state === 'inkwind' ? 'glove_ink' : f.state === 'puff' ? (f.t > 3 && Math.floor(f.t * 8) % 2 ? 'glove_pulse' : 'glove_puff_' + (Math.floor(f.t * 3) % 2 + 1))
      : f.pulseT > 0 ? 'glove_pulse' : 'glove_drift_' + (Math.floor(f.t * 2.5) % 2 + 1),
    draw(f) {
      const fr = FOE.glove.frame(f), sh = /wind$/.test(f.state) || f.state === 'hold' ? Math.round(Math.sin(f.t * 50)) : 0;
      spr(fr, Math.round(f.x) + sh, Math.round(f.y), f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, Math.round(f.x), Math.round(f.y), f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 8) - 1, Math.round(f.y - 28 + Math.sin(a) * 2), 2, 2); }
      if (f.state !== 'down' && Math.random() < 0.04) bubblesAt(f.x + (Math.random() * 2 - 1) * 6, f.y - 20);
    } },

  // the bottle pike: an old glass bottle with Grime in it. It hangs still in the water keeping its distance, turning
  // to keep its nose on him, then darts at him fast in a straight line. The sword bounces off the glass. Get it to
  // dart into the mud and its neck sticks in it for a couple of seconds: that's when it can be hit. A squeak while
  // it's aiming puts it off its aim
  pike: { hp: 5, hw: 14, h: 14, acorns: [2, 3], free: true, fit: [14, 14, 2],
    setup(f) { f.y -= 4; f.hx = f.x; f.hy = f.y; f.ang = 0; f.last = [f.x, f.y]; f.cd = 1.5 + Math.random(); },
    box: f => (f.state === 'split' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 15, r: f.x + 15, t: f.y - 15, b: f.y - 2 }),
    harmless: () => true,                                                                  // only the dart hurts (and that can be blocked)
    deflectText: 'it bounces off the glass',
    deflect: f => !['stuck', 'stagger', 'down'].includes(f.state),
    keepState: f => f.state === 'stuck',                                                   // hits don't pull it out of the mud
    squeaked(f) { if (f.state === 'aim') { setFoeState(f, 'walk'); f.cd = 0.9; f.glint = false; puff(f.x, f.y - 8, 4, 20, '#c4e6e0'); } },
    update(f, dt) {
      if (f.state !== 'stuck' && fishBlock(f.x, f.y, FOE.pike.fit)) [f.x, f.y] = f.last;
      baseState(f, dt);
      const turnTo = (a, rate) => { f.ang += Math.max(-rate * dt, Math.min(rate * dt, a - f.ang)); };
      if (f.state === 'down') { fishMove(f, 0, 40 * dt); turnTo(f.f * -0.3, 1); f.last = [f.x, f.y]; return; }   // empty, sinking, tipping over
      if (f.state === 'stuck') {                                                           // neck stuck in the mud, wriggling
        if (f.t >= 2.6) { f.x -= f.ldx * 6; f.y -= f.ldy * 6; if (fishBlock(f.x, f.y, FOE.pike.fit)) [f.x, f.y] = f.last; setFoeState(f, 'glide'); f.ldx = -f.ldx * 0.3; f.ldy = -f.ldy * 0.3; puff(f.x + f.f * 14, f.y - 8, 5, 25, '#5a4a3a'); }
        return;
      }
      if (f.state === 'stagger') { f.last = [f.x, f.y]; return; }
      const dx = P.x - f.x, dy = (P.y - 10) - (f.y - 8), d = Math.hypot(dx, dy) || 1;
      const hunting = P.swim && phillAround() && !(P.story && !P.story.free) && d < 320;
      const aimAng = () => Math.max(-1.2, Math.min(1.2, Math.atan2(dy, Math.abs(dx)))) * (f.f > 0 ? 1 : -1);
      if (f.state === 'walk' || f.state === 'hurt') {
        if (hunting) {
          if (Math.sign(dx) && Math.sign(dx) !== f.f && Math.abs(dx) > 10) { f.f = Math.sign(dx); f.ang = -f.ang; }
          turnTo(aimAng(), 2.2);
          const want = d < 110 ? -30 : d > 190 ? 35 : 0;                                   // keeping its distance
          fishMove(f, dx / d * want * dt, dy / d * want * dt + Math.sin(f.t * 1.5) * 4 * dt);
          if (f.state === 'walk' && f.cd <= 0 && d < 260 && pikeSees(f)) {                // its newer three (10/16/2026): a dart that bounces off the mud once, glass shards, and shattering into two halves that dart at him
            const m = choose([[2, 'aim'], [hasMove(f, 3) && d < 240 ? 1.2 : 0, 'shardwind'], [hasMove(f, 4) && d < 220 ? 1 : 0, 'splitwind']]);
            setFoeState(f, m); f.bounced = false; sfx.creak();
          }
        } else {
          turnTo(0, 1.5);
          const mx = f.hx - f.x, my = f.hy + Math.sin(f.t * 0.9) * 6 - f.y;
          fishMove(f, Math.sign(mx) * Math.min(Math.abs(mx), 20 * dt), Math.sign(my) * Math.min(Math.abs(my), 14 * dt));
        }
      } else if (f.state === 'aim') {                                                      // drawing back, nose on him
        if (Math.sign(dx) && Math.sign(dx) !== f.f && Math.abs(dx) > 10) { f.f = Math.sign(dx); f.ang = -f.ang; }
        turnTo(aimAng(), 3.5);
        fishMove(f, -dx / d * 16 * dt, -dy / d * 16 * dt);
        if (f.t >= 0.55 && !f.glint) { f.glint = true; spark(f.x + f.f * 22 * Math.cos(f.ang), f.y - 8 + 22 * Math.sin(f.ang) * f.f); sfx.glint(); }
        if (f.t >= 0.8) { f.glint = false; f.ldx = f.f * Math.cos(f.ang); f.ldy = Math.sin(f.ang) * f.f; setFoeState(f, 'dart'); sfx.whoosh(); }
      } else if (f.state === 'dart') {
        const block = fishMove(f, f.ldx * 440 * dt, f.ldy * 440 * dt, true);
        const out = strike(f, { l: f.x - 14, r: f.x + 14, t: f.y - 15, b: f.y - 2 }, 22);
        if (f.state !== 'dart') { f.last = [f.x, f.y]; return; }                           // parried: it's reeling
        if (out === 'blocked') { setFoeState(f, 'glide'); f.ldx = -f.ldx * 0.6; f.ldy = -f.ldy * 0.6; }
        else if (block === 'wall' && hasMove(f, 2) && !f.bounced) {                        // glances off the mud once and keeps going (10/16/2026)
          f.bounced = true; f.x -= f.ldx * 3; f.y -= f.ldy * 3;
          if (fishBlock(f.x + f.ldx * 8, f.y, FOE.pike.fit) === 'wall') f.ldx = -f.ldx; if (fishBlock(f.x, f.y + f.ldy * 8, FOE.pike.fit) === 'wall') f.ldy = -f.ldy;
          if (Math.sign(f.ldx) && Math.sign(f.ldx) !== f.f) { f.f = Math.sign(f.ldx); }
          f.ang = Math.max(-1.2, Math.min(1.2, Math.atan2(f.ldy, Math.abs(f.ldx)))) * (f.f > 0 ? 1 : -1);
          f.t = Math.min(f.t, 0.35); spark(f.x + f.ldx * 14, f.y - 8); sfx.clank(); puff(f.x, f.y - 8, 4, 25, '#5a4a3a');
        }
        else if (block === 'wall') {                                                       // neck first into the mud: stuck
          f.x += f.ldx * 3; f.y += f.ldy * 3; setFoeState(f, 'stuck'); sfx.thunk(); shakeT = 0.12; shakeA = 1.5;
          puff(f.x + f.ldx * 20, f.y - 8 + f.ldy * 20, 7, 35, '#5a4a3a');
          if (!world.flags.pikeStuck) { world.flags.pikeStuck = true; popup(f.x, f.y - 34, 'its neck\'s stuck in the mud', '#ffd36b'); }
          return;
        } else if (block === 'air' || f.t >= 0.7) setFoeState(f, 'glide');
        if (Math.random() < dt * 30) bubblesAt(f.x - f.ldx * 20, f.y - 8 - f.ldy * 20);
      } else if (f.state === 'shardwind') {                                                // shaking, the glass creaking...
        if (Math.sign(dx) && Math.sign(dx) !== f.f && Math.abs(dx) > 10) { f.f = Math.sign(dx); f.ang = -f.ang; }
        turnTo(aimAng(), 3.5);
        if (f.t >= 0.5) {                                                                 // ...and slivers of glass flung off it at him
          const a0 = Math.atan2(dy, dx);
          for (let i = -1.5; i <= 1.5; i++) { const a = a0 + i * 0.22; shots.push({ kind: 'shard', col: '#9ad8b0', x: f.x + Math.cos(a) * 12, y: f.y - 8 + Math.sin(a) * 12, vx: Math.cos(a) * 210, vy: Math.sin(a) * 210, g: 20, from: f, reflected: false, t: 0, life: 2,
            draw: sh => { ctx.save(); ctx.translate(Math.round(sh.x), Math.round(sh.y)); ctx.rotate(Math.atan2(sh.vy, sh.vx) + Math.PI); spr('pike_shard', 0, 0, false); ctx.restore(); } }); }
          sfx.clink ? sfx.clink() : sfx.tink(); setFoeState(f, 'glide'); f.ldx = -dx / d * 0.3; f.ldy = -dy / d * 0.3;
        }
      } else if (f.state === 'splitwind') {                                                // a crack running down it...
        turnTo(aimAng(), 3.5);
        if (f.t >= 0.6) {                                                                 // ...and it comes apart in two halves that each dart at him
          setFoeState(f, 'split'); sfx.clank(); shakeT = 0.1; shakeA = 1.5; puff(f.x, f.y - 8, 8, 40, '#9ad8b0');
          const a0 = Math.atan2(dy, dx);
          for (const [k, off] of [[1, -0.45], [2, 0.45]]) {
            const a = a0 + off;
            shots.push({ kind: 'half', col: '#9ad8b0', x: f.x + Math.cos(a) * 8, y: f.y - 8 + Math.sin(a) * 8, vx: Math.cos(a) * 60, vy: Math.sin(a) * 60, g: 0, from: f, reflected: false, t: 0, life: 1.3,
              upd: (sh, dt2) => { if (sh.t > 0.25 && !sh.gone && !sh.reflected) { if (!sh.aimed) { sh.aimed = true; const ex = P.x - sh.x, ey = P.y - 16 - sh.y, e = Math.hypot(ex, ey) || 1; sh.vx = ex / e * 340; sh.vy = ey / e * 340; } } },
              draw: sh => { ctx.save(); ctx.translate(Math.round(sh.x), Math.round(sh.y)); ctx.rotate(Math.atan2(sh.vy, sh.vx) + Math.PI); spr('pike_half_' + k, 0, 8, false); ctx.restore(); } });
          }
        }
      } else if (f.state === 'split') {                                                    // (in pieces: nothing to hit till it pulls itself back together)
        if (f.t >= 1.3) { setFoeState(f, 'reform'); puff(f.x, f.y - 8, 6, 30, '#9ad8b0'); sfx.tink(); }
      } else if (f.state === 'reform') { if (f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.6; } }
      else if (f.state === 'glide') {                                                    // shot past him: coasting to a stop
        const k = Math.max(0, 1 - f.t / 0.5);
        fishMove(f, f.ldx * 220 * k * dt, f.ldy * 220 * k * dt);
        if (f.t >= 0.75) { setFoeState(f, 'walk'); f.cd = 1.3 + Math.random() * 0.6; }
      }
      f.last = [f.x, f.y];
    },
    frame: f => ({ down: 'pike_down', stagger: 'pike_dizzy', aim: 'pike_aim', shardwind: 'pike_aim', splitwind: 'pike_aim', dart: 'pike_dart', stuck: 'pike_stuck' })[f.state] || (f.state === 'glide' && f.t < 0.2 ? 'pike_dart' : 'pike_hang_' + (Math.floor(f.t * 3) % 2 + 1)),
    draw(f) {
      if (f.state === 'split') return;                                                     // (its halves are drawn as shots)
      const fr = FOE.pike.frame(f), shake = f.state === 'aim' ? Math.round(Math.sin(f.t * 50) * 0.6) : f.state === 'shardwind' || f.state === 'splitwind' ? Math.round(Math.sin(f.t * 60)) : f.state === 'stuck' ? Math.round(Math.sin(f.t * 30)) : 0;
      ctx.save(); ctx.translate(Math.round(f.x), Math.round(f.y - 8)); ctx.rotate((f.ang || 0) + (f.state === 'stuck' ? Math.sin(f.t * 30) * 0.05 : 0)); ctx.translate(-shake * f.f, 0);
      spr(fr, 0, 8, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, 0, 8, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      ctx.restore();
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 8) - 1, Math.round(f.y - 24 + Math.sin(a) * 2), 2, 2); }
    } },

  // the gum leech: a wad of chewed bubblegum stretched out into a leech. It wiggles after him underwater and lunges,
  // and if it touches him it sticks on: he swims slow and it drinks a bit of his fluff every couple of seconds. The
  // sword just sticks in the gum. Swim-dash and it gets shaken off, flung away dazed, and that's when it can be hit
  leech: { hp: 4, hw: 9, h: 10, acorns: [1, 2], free: true, fit: [10, 12, 2],
    setup(f) { f.y -= 4; f.hx = f.x; f.hy = f.y; f.last = [f.x, f.y]; f.vx = 0; f.vy = 0; },
    box: f => (f.state === 'latch' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 12, r: f.x + 12, t: f.y - 12, b: f.y - 2 }),
    harmless: () => true,                                                                  // it doesn't hit, it sticks
    deflectText: 'the sword just sticks in the gum',
    deflect: f => f.state !== 'stagger' && f.state !== 'down',
    squeaked() {},                                                                         // gum doesn't care about noise
    update(f, dt) {
      if (f.state === 'latch') {
        if (!P.swim || P.ko > 0 || P.respawnT > 0 || !phillAround() || P.leech !== f) {   // out of the water (or knocked out): it lets go
          if (P.leech === f) P.leech = null;
          [f.x, f.y] = f.last; setFoeState(f, 'walk'); f.cd = 1.5; return;
        }
        if (P.swimDash > 0) {                                                              // the dash shakes it off: flung away, dazed
          P.leech = null; f.x = P.x - P.facing * 8; f.y = P.y; if (fishBlock(f.x, f.y, FOE.leech.fit)) [f.x, f.y] = f.last;
          foeStagger(f, 2.2); f.vx = -(Math.sign(P.vx) || P.facing) * 170; f.vy = -50; sfx.boing(); puff(f.x, f.y - 6, 5, 30, '#c4e6e0');
          if (!world.flags.leechShook) { world.flags.leechShook = true; popup(f.x, f.y - 30, 'shook it off', '#ffd36b'); }
          return;
        }
        f.x = P.x - P.facing * 4; f.y = P.y - 8; f.f = P.facing;                            // stuck on his back
        f.gulp = Math.max(0, (f.gulp || 0) - dt); f.dt += dt;
        if (f.dt >= 2.2) {                                                                 // a gulp: a bit of his fluff
          f.dt = 0; f.gulp = 0.4; const face = P.facing; P.inv = 0; hurt(f.x, 'leech', 1); if (P.ko <= 0) { P.vx = 0; P.vy = 0; P.hurtT = 0; P.inv = 0.3; P.facing = face; }
          if (P.ko > 0) { P.leech = null; [f.x, f.y] = f.last; setFoeState(f, 'walk'); f.cd = 2; }
        }
        return;
      }
      if (fishBlock(f.x, f.y, FOE.leech.fit)) [f.x, f.y] = f.last;
      baseState(f, dt);
      if (f.state === 'down') { fishMove(f, 0, 34 * dt); f.last = [f.x, f.y]; return; }
      if (f.state === 'stagger') { fishMove(f, f.vx * dt, f.vy * dt); f.vx *= Math.pow(0.08, dt); f.vy *= Math.pow(0.08, dt); f.last = [f.x, f.y]; return; }
      const dx = P.x - f.x, dy = (P.y - 6) - (f.y - 6), d = Math.hypot(dx, dy) || 1;
      const hunting = P.swim && phillAround() && !(P.story && !P.story.free) && d < 280 && !(P.leech && foes.includes(P.leech));
      if (f.state === 'walk' || f.state === 'hurt') {
        if (hunting) {
          const w = Math.sin(f.t * 6) * 22;                                                 // wiggling its way over
          fishMove(f, (dx / d * 70 - dy / d * w) * dt, (dy / d * 70 + dx / d * w) * dt);
          f.f = Math.sign(dx) || f.f;
          if (f.state === 'walk' && f.cd <= 0 && d < 200) {                                 // its newer three (10/16/2026): a glob of gum spat at him, a band it stretches out to snare him, and a bubble it traps him in
            const m = choose([[d < 60 ? 2 : 0, 'lunge'], [hasMove(f, 2) && d > 60 ? 1.2 : 0, 'spitwind'], [hasMove(f, 3) && d < 54 && Math.abs(dy) < 30 ? 1.3 : 0, 'bandwind'], [hasMove(f, 4) && d > 50 && d < 180 ? 1 : 0, 'blowwind']]);
            if (m === 'lunge') { setFoeState(f, 'lunge'); f.ldx = dx / d; f.ldy = dy / d; sfx.hiss(); }
            else if (m) { setFoeState(f, m); f.f = Math.sign(dx) || f.f; sfx.squelch ? sfx.squelch() : sfx.splort(); }
          }
        } else {
          const mx = f.hx + Math.sin(f.t * 0.5) * 40 - f.x, my = f.hy + Math.sin(f.t * 1.3) * 8 - f.y;
          fishMove(f, Math.sign(mx) * Math.min(Math.abs(mx), 30 * dt), Math.sign(my) * Math.min(Math.abs(my), 18 * dt));
          if (Math.abs(mx) > 3) f.f = Math.sign(mx);
        }
      } else if (f.state === 'lunge') {
        if (f.t > 0.15) fishMove(f, f.ldx * 220 * dt, f.ldy * 220 * dt);
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.0 + Math.random() * 0.5; }
      } else if (f.state === 'spitwind') {
        f.f = Math.sign(dx) || f.f;
        if (f.t >= 0.4) {                                                                  // a glob of itself, spat at him: it sticks to him and slows him
          shots.push({ kind: 'glob', col: '#ec7aac', x: f.x - (-f.f) * 12, y: f.y - 8, vx: dx / d * 170, vy: dy / d * 170 - 20, g: 40, from: f, reflected: false, t: 0, life: 2,
            draw: sh => spr('gum_glob', sh.x, sh.y, false), onMeet: out => { if (out === 'hit') { P.slowT = 1.8; P.slowBy = 'gum'; } } });
          sfx.spit(); setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5;
        }
      } else if (f.state === 'bandwind') { f.f = Math.sign(dx) || f.f; fishMove(f, -f.f * 14 * dt, 0); if (f.t >= 0.4) { setFoeState(f, 'band'); sfx.twang(); } }
      else if (f.state === 'band') {                                                       // stretched right out at him like a rubber band
        const out = f.t < 0.22 ? strike(f, { l: Math.min(f.x + f.f * 8, f.x + f.f * 52), r: Math.max(f.x + f.f * 8, f.x + f.f * 52), t: f.y - 14, b: f.y - 2 }, 18) : null;
        if (out === 'hit' && P.health > 0) { pinHim(f, 5); setFoeState(f, 'snare'); tellOnce('leechBand', f, 'mash to wriggle free', 34); f.last = [f.x, f.y]; return; }
        if (f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.5; }
      } else if (f.state === 'snare') {                                                    // got him: it snaps back in, dragging him with it, then squeezes
        if (!pinnedBy(f)) { foeStagger(f, 1.6); f.vx = -f.f * 60; f.vy = 0; f.last = [f.x, f.y]; return; }
        const tx = f.x + f.f * 14;
        P.pinned.x += Math.sign(tx - P.pinned.x) * Math.min(Math.abs(tx - P.pinned.x), 60 * dt); P.pinned.y += Math.sign(f.y + 4 - P.pinned.y) * Math.min(Math.abs(f.y + 4 - P.pinned.y), 40 * dt);
        if (f.t >= 1.5) { P.pinned = null; hurt(f.x, 'leech', 1); setFoeState(f, 'walk'); f.cd = 1.8; }
        f.last = [f.x, f.y]; return;
      } else if (f.state === 'blowwind') {
        f.f = Math.sign(dx) || f.f;
        if (f.t >= 0.6) {                                                                  // a bubble of gum blown off its mouth, floating at him: it traps him inside
          shots.push({ kind: 'gumbubble', col: '#ffb4d2', x: f.x - (-f.f) * 22, y: f.y - 10, vx: dx / d * 90, vy: dy / d * 90, g: 0, from: f, reflected: false, t: 0, life: 3,
            draw: sh => { ctx.fillStyle = 'rgba(255,170,210,0.4)'; ctx.beginPath(); ctx.arc(sh.x, sh.y, 7, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#c44a84'; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(Math.round(sh.x - 3), Math.round(sh.y - 4), 2, 2); },
            onMeet: out => { if (out === 'hit' && P.health > 0 && foes.includes(f) && f.state !== 'down') { pinHim(f, 6); P.pinned.bubble = true; setFoeState(f, 'bubbled'); P.inv = 0.4; tellOnce('leechBubble', f, 'mash to pop it', 40); } } });
          sfx.pop(); setFoeState(f, 'walk'); f.cd = 2 + Math.random() * 0.5;
        }
      } else if (f.state === 'bubbled') {                                                  // him in the bubble, floating up: pop it from inside before it squeezes
        if (!pinnedBy(f)) { sfx.pop(); puff(P.x, P.y - 18, 8, 40, '#ffb4d2'); setFoeState(f, 'walk'); f.cd = 1.6; f.last = [f.x, f.y]; return; }
        const ny = P.pinned.y - 18 * dt; if (isWater(P.pinned.x, ny - 30) && !boxSolid(P.pinned.x - 8, ny - 36, P.pinned.x + 8, ny - 30)) P.pinned.y = ny;
        if (f.t >= 2) { P.pinned = null; sfx.pop(); puff(P.x, P.y - 18, 8, 40, '#ffb4d2'); hurt(f.x, 'leech', 1); setFoeState(f, 'walk'); f.cd = 1.8; }
        const dd = Math.hypot(P.x - f.x, P.y - f.y); if (dd > 40) fishMove(f, (P.x - f.x) / dd * 40 * dt, (P.y - f.y) / dd * 40 * dt);
        f.last = [f.x, f.y]; return;
      }
      // touching him: it sticks on
      if ((f.state === 'walk' || f.state === 'lunge') && hunting && P.inv <= 0 && !dodgeSafe() && overlap(foeBox(f), { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y })) {
        f.last = [f.x, f.y]; setFoeState(f, 'latch'); P.leech = f; f.dt = 0; sfx.splort();
        if (!world.flags.leechStuck) { world.flags.leechStuck = true; popup(P.x, P.y - 40, 'it\'s stuck on. shake it off', '#ffd36b'); }
        else if (!world.flags.leechHint) { world.flags.leechHint = true; popup(P.x, P.y - 40, fmtKeys('a quick dash ({dodge}) should shake it off'), '#ffd36b'); }   // the second time it says how to get it off (10/16/2026)
        return;
      }
      f.last = [f.x, f.y];
    },
    frame: f => f.state === 'latch' ? (f.gulp > 0 ? 'leech_latch_2' : 'leech_latch_1') : f.state === 'lunge' ? (f.t > 0.15 ? 'leech_lunge' : 'leech_swim_1')
      : f.state === 'band' || f.state === 'snare' ? (f.state === 'band' && f.t < 0.05 ? 'leech_lunge' : 'leech_band') : f.state === 'blowwind' ? 'leech_blow' : f.state === 'bandwind' || f.state === 'spitwind' ? 'leech_lunge'
      : f.state === 'stagger' ? 'leech_dizzy' : f.state === 'down' ? 'leech_down' : 'leech_swim_' + (Math.floor(f.t * 5) % 2 + 1),
    draw(f) {
      if (f.state === 'latch') return;                                                     // drawn over him instead (drawOnPhill)
      const fr = FOE.leech.frame(f), sh = /wind$/.test(f.state) ? Math.round(Math.sin(f.t * 50)) : 0;
      spr(fr, Math.round(f.x) + sh, Math.round(f.y), f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, Math.round(f.x), Math.round(f.y), f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
      if (f.state === 'stagger') for (let i = 0; i < 3; i++) { const a = f.t * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(f.x + Math.cos(a) * 8) - 1, Math.round(f.y - 20 + Math.sin(a) * 2), 2, 2); }
    } },
});
// a gum leech stuck on him is drawn over him, on his back (it'd be hidden behind him otherwise)
function drawOnPhill(px, py) {
  // gum on his feet, and a candy wrapper wrapped round him (10/16/2026)
  if (P.slowT > 0 && P.slowBy === 'gum') { ctx.fillStyle = '#c44a84'; ctx.fillRect(Math.round(px) - 8, Math.round(py) - 3, 6, 3); ctx.fillRect(Math.round(px) + 2, Math.round(py) - 3, 6, 3); ctx.fillStyle = '#ffb4d2'; ctx.fillRect(Math.round(px) - 7, Math.round(py) - 3, 2, 1); ctx.fillRect(Math.round(px) + 3, Math.round(py) - 3, 2, 1); }
  const w = P.slowT > 0 && P.slowBy && P.slowBy.kind === 'wrapper' && P.slowBy.state === 'wrap' ? P.slowBy : null;
  if (w) spr('wrapper_wrap', Math.round(px) + Math.round(Math.sin(w.t * 30)), Math.round(py) - 16, P.facing > 0);
  if (P.pinned && P.pinned.by && P.pinned.by.kind === 'bag') spr('bag_wrap', Math.round(px) + Math.round(Math.sin(P.pinned.by.t * 30)), Math.round(py) - 18, P.facing > 0);   // the bag wrapped round him
  if (P.pinned && P.pinned.by && P.pinned.by.kind === 'teeth') spr('teeth_bite', Math.round(px - P.facing * 3 + Math.sin(P.pinned.by.t * 40) * 1.5), Math.round(py), P.facing < 0);   // the teeth clamped on his leg
  if (P.pinned && P.pinned.by && P.pinned.by.kind === 'bucket') { const b = P.pinned.by; spr('bucket_flip', Math.round(px + Math.sin(b.t * 30)), Math.round(py + 3), b.f > 0); }   // the bucket down over him
  if (P.pinned && P.pinned.bubble) {                                                       // in the leech's bubble
    const r = 22 + Math.sin(performance.now() / 120) * 1;
    ctx.fillStyle = 'rgba(255,170,210,0.28)'; ctx.beginPath(); ctx.arc(px, py - 18, r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = 'rgba(196,74,132,0.9)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.fillRect(Math.round(px - r * 0.5), Math.round(py - 18 - r * 0.6), 3, 2);
  }
  const f = P.leech;
  if (!f || f.state !== 'latch' || !foes.includes(f)) return;
  spr(FOE.leech.frame(f), Math.round(px - P.facing * 4), Math.round(py - 8 + (f.gulp > 0 ? -1 : 0)), P.facing > 0);
}
// the shared frame lookup: the new kinds bring their own
const _foeFrame = foeFrame;
foeFrame = f => (FOE[f.kind].frame ? FOE[f.kind].frame(f) : _foeFrame(f));

// ---------- walls of Grime foam (the squeak pops them) and soft mud (a few whacks) ----------
function drawSoftWall(b, jx) {
  const x0 = b.x0 * T + jx, y0 = b.y0 * T, w = (b.x1 - b.x0 + 1) * T, h = (b.y1 - b.y0 + 1) * T, now = performance.now() / 1000;
  if (b.look === 'mud') {
    ctx.fillStyle = '#241a14'; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = '#4c3b2a'; ctx.fillRect(x0 + 1, y0 + 1, w - 2, h - 2);
    ctx.fillStyle = '#3e2f22'; for (let i = 0; i < h / 6; i++) ctx.fillRect(x0 + 2 + ((i * 7) % (w - 6)), y0 + i * 6 + 2, 4, 2);
    ctx.fillStyle = '#5c4934'; ctx.fillRect(x0 + 2, y0 + 2, w - 4, 2);
    const dmg = b.hp0 - b.hp; ctx.fillStyle = '#1a120c';
    for (let k = 0; k < dmg * 3; k++) ctx.fillRect(x0 + 3 + ((k * 5) % (w - 6)), y0 + 8 + ((k * 13) % (h - 16)), 1, 6);
    return;
  }
  // foam: a heap of grayish bubbles with purple Grime through it, wobbling
  ctx.fillStyle = 'rgba(60,44,80,0.9)'; ctx.fillRect(x0 + 2, y0 + 2, w - 4, h - 2);
  const cols = ['#8a7a9e', '#b8aac8', '#d8d0e4', '#f0ecf6'];
  for (let i = 0; i < Math.ceil(w * h / 40); i++) {
    const bx = x0 + 3 + ((i * 37) % Math.max(1, w - 6)), by = y0 + 3 + ((i * 53) % Math.max(1, h - 6)), r = 2 + (i % 4);
    const wob = Math.sin(now * 2 + i) * 0.6;
    ctx.fillStyle = cols[(i * 7) % 3]; ellipse(bx + wob, by, r, r);
    ctx.fillStyle = cols[3]; ctx.fillRect(Math.round(bx - r / 2 + wob), Math.round(by - r / 2), 1, 1);
  }
  ctx.fillStyle = '#4a3462'; for (let i = 0; i < h / 10; i++) ctx.fillRect(x0 + 2 + ((i * 11) % Math.max(1, w - 4)), y0 + i * 10, 2, 4);
  if (Math.random() < 0.02) part(x0 + Math.random() * w, y0 + Math.random() * 6, 0, -20, 0.6, '#e8e0f0', 1, -10);   // a bubble floating off the top
}

// ---------- what the Pond draws over the room each frame ----------
function drawPondFx() {
  const now = performance.now() / 1000;
  // the water's surface moving: little glints sliding along the top of every pool
  if (room.def.region === 'pond' || room.waterTops) {
    if (!room.waterTops) {
      room.waterTops = [];
      for (let x = 0; x < room.W; x++) for (let y = 1; y < room.H; y++) if (room.map[y * room.W + x] === 4 && (room.map[(y - 1) * room.W + x] === 0)) room.waterTops.push([x, y]);
    }
    for (const [x, y] of room.waterTops) {
      for (let k = 0; k < 2; k++) {
        const ph = now * 0.7 + x * 1.3 + k * 2.7, px = x * T + ((ph * 9) % T + T) % T;
        ctx.fillStyle = `rgba(240,252,250,${0.35 + 0.3 * Math.sin(ph * 2)})`; ctx.fillRect(Math.round(px), y * T + (k ? 2 : 0), 3, 1);
      }
    }
  }
  for (const s of squeaks) {                                                              // the squeak ringing out
    const r = Math.min(SQUEAK_R, 10 + s.t * 300), a = Math.max(0, 1 - s.t / 0.32);
    ctx.strokeStyle = `rgba(255,246,214,${0.75 * a})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = `rgba(255,211,107,${0.5 * a})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(s.x, s.y, r * 0.7, 0, Math.PI * 2); ctx.stroke();
  }

}
function updatePond(dt) {
  if (squeaks.length) updateSqueaks(dt);
  const df = actors.dragonfly;
  if (df && df.idle && !scene) {                                                          // the dragonfly zipping about over its daisy
    df.t2 = (df.t2 || 0) - dt;
    if (df.t2 <= 0) { df.tx = df.hx + (Math.random() * 2 - 1) * 60; df.ty = df.hy - Math.random() * 40; df.t2 = 0.6 + Math.random() * 1.4; }
    df.x += (df.tx - df.x) * Math.min(1, dt * 6); df.y += (df.ty - df.y) * Math.min(1, dt * 6); df.flip = df.tx > df.x;
  }
}
function flagWorld(k) { world.flags[k] = true; saveWorld(); }

// ---------- the Pond's rooms: set up when he walks in ----------
function setupPondRoom() {
  const d = room.def;
  squeaks.length = 0; P.swim = isWater(P.x, P.y - 8) && can('swim'); if (P.swim) P.h = ROLL_H;
  if (d.region !== 'pond') return;
  if (d.npc && d.npc.spots) {                                                              // the snail's never quite in the same spot twice
    const n = d.npc.spots.length, i = ((world.snailSpot ?? -1) + 1 + Math.floor(Math.random() * (n - 1))) % n;
    world.snailSpot = i; d.npc.x = d.npc.spots[i][0]; d.npc.y = d.npc.spots[i][1];
  }
  if (d.dragonfly) {
    const df = d.dragonfly;
    addActor('dragonfly', { kind: 'rw', x: df.x, y: df.y, hx: df.x, hy: df.y, anim: ['dragonfly_fly_1', 'dragonfly_fly_2'], fps: 18, layer: 'front', idle: !!world.flags.sawDragonfly });
    if (!world.flags.sawDragonfly) Object.assign(actors.dragonfly, { anim: null, frame: 'dragonfly_perch' });
  }
}

// ---------- the dragonfly: darts sideways in midair. He watches it, and figures it out ----------
SCENES.dragonfly = def => {
  const df = def.dragonfly, a = () => actors.dragonfly;
  const dart = (x, y) => [run(() => { const d = a(); d.anim = null; d.frame = 'dragonfly_dart'; d.flip = x > d.x; sfx.airdodge(); }),
    t => { const d = a(); if (t === 0) d._f = [d.x, d.y]; const k = Math.min(1, t / 0.14); d.x = d._f[0] + (x - d._f[0]) * k; d.y = d._f[1] + (y - d._f[1]) * k;
      part(d.x, d.y, 0, 0, 0.18, '#a0f0f0', 2, 0); return k >= 1; },
    run(() => { const d = a(); d.anim = ['dragonfly_fly_1', 'dragonfly_fly_2']; }), wait(0.5)];
  return [
    bars(true), run(() => { P.vx = 0; }), faceTo(df.x), camTo(df.x - 30, df.y + 10, 0.8),
    run(() => { const d = a(); d.anim = ['dragonfly_fly_1', 'dragonfly_fly_2']; sfx.buzz(); }), moveActor('dragonfly', df.x - 10, df.y - 30, 0.6), wait(0.3),
    ...dart(df.x - 110, df.y - 34), ...dart(df.x - 40, df.y - 50), ...dart(df.x - 200, df.y - 44),
    pose('look_up', 0.3), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); twinkle(P.x, P.y - 46, 8); }), wait(0.8),
    run(() => { world.learned.airdodge = true; saveWorld(); popup(P.x, P.y - 54, 'learned the air dodge', '#ffd36b', true); }),
    moveActor('dragonfly', df.x, df.y, 1.2, { arc: -30 }), run(() => { const d = a(); d.idle = true; }),
    pose(null), camBack(), wait(0.5), bars(false),
    run(() => room.hints.push({ text: '{jump}, then {dodge} in the air to dart across', l: 0, t: 0, r: room.pxW, b: room.pxH, x: 22 * T, y: 9 * T, a: 0, until: 'crossedCreek' })),
  ];
};

// ---------- the old bullfrog under the willow: shows him how to really use his squeaker ----------
SCENES.bullfrog = npc => {
  const steps = [walkTo(npc.x + 3 * T), faceTo(npc.x)];
  if (!world.learned.squeak) {
    return [bars(true), ...steps,
      run(() => { npcPose = { frame: 'bullfrog_croak', t: 0.7 }; sfx.croak(); }), wait(0.7),
      say('bullfrog', "*brrrup* Well now. A little cloth feller. Ain't seen one of y'all down here since, oh. Ever, I reckon.",
        "I been sittin' under this willow longer than that sailboat's been sinkin'. Used to keep the litter off this whole bank myself.",
        "One good croak and they'd scatter like quail. But I'm gettin' on, and the Grime don't spook like it used to."),
      say('bullfrog', "You squeak, don't you. Heard you land. Squeak, right there in your middle."),
      ...nod(),
      say('bullfrog', "Figured. Most toys don't know what to do with theirs. Here's the trick, now. Don't let it out a little at a time. Squeeze it all at once, from the belly.",
        "Go on, then. That foam in the bank yonder, give it everything you got."),
      run(() => { world.learned.squeak = true; world.flags.metBullfrog = true; saveWorld(); }),
      bars(false),
      run(() => { room.hints.push({ text: 'press {squeak} to squeak', l: 0, t: 0, r: room.pxW, b: room.pxH, x: P.x, y: P.y - 62, a: 0, until: 'squeakedOnce' }); P.story = { kind: 'scene', frame: null, t: 0, free: true }; scene.keepControl = true; }),
      () => { if (!P.story || !P.story.free) P.story = { kind: 'scene', frame: null, t: 0, free: true }; return !!world.flags.squeakedOnce; },   // he has his controls back till he tries it
      run(() => { P.story = { kind: 'scene', frame: null, t: 0 }; scene.keepControl = false; }),
      wait(0.5),
      run(() => { npcPose = { frame: 'bullfrog_croak', t: 0.6 }; sfx.croak(); popup(P.x, P.y - 54, 'learned to squeak', '#ffd36b', true); sfx.idea(); }),
      wait(0.6),
      say('bullfrog', "*brrrup* Hah. There it is. That'll rattle the teeth right outta 'em.", "There's more of that foam on the far bank. Whole lot more. Past the sailboat, if you can get yourself past the sailboat."),
    ];
  }
  return [...steps, say('bullfrog', ...[
    ["*brrrup* Still squeakin'? Good. You keep at it."],
    ["Far bank used to be real pretty. 'Fore the foam. 'Fore that swan floated in."],
    ["Water past the sailboat's deep, now. Real deep. Don't you go in there unless you float."],
    ["Snail came by yesterday. Or last week. Hard to tell with snails."],
  ][Math.floor(Math.random() * 4)])];
};

// ---------- the snail: old and calm, it's crawled over every inch of this bank. Sells what it knows ----------
const SNAIL_SHOP = [
  { id: 'toldCrayonPond', what: 'where the blue crayon went', cost: 11, done: () => world.has.crayon_pond, mark: { room: 'overlook', x: 7 * 16, y: 6 * 16 },
    line: 'A blue one. Up in the willow, on the top branch. You will need to cross the creek first. I went the long way. It took a month.' },
  { id: 'toldGrotto', what: 'a soft wall under the bank', cost: 19, done: () => world.flags.grotto_mud, mark: { room: 'grotto', x: 2 * 16, y: 12 * 16 },
    line: 'Under the far bank there is a hollow. One wall of it is only mud. Something is behind it. I could not get in.' },
  { pin: 'dfwing', line: 'A dragonfly wing. He dropped it and grew a new one. Pin it on and you will dart farther.' },
  { pin: 'shell', line: 'My old shell. I grew out of it. Wear it and things will not push you around so much.' },
];
const SNAIL_COTTON = [22, 30, 38];
const SNAIL_CHAT = [
  ['Hello. I am on my way somewhere. I will get there.'],
  ['I have been all the way round this pond. Two times. It is big, from down here.'],
  ['*mm* The water past the sailboat is very deep. I went under once. I did not like it.'],
  ['There is a gap under the fence on the far side. Warm light comes through it. Like a kitchen.'],
];
function snailList() {
  const out = [];
  for (const s of SNAIL_SHOP) {
    if (s.pin) { if (!(world.pins || {})[s.pin]) out.push({ ...s, what: PINS[s.pin].name, cost: PINS[s.pin].cost }); }
    else if (!world.flags[s.id] && !(s.done && s.done())) out.push(s);   // not once he's found it himself
  }
  const c = world.snailCotton || 0;
  if (world.flags.sailboatDown && c < SNAIL_COTTON.length) out.push({ cotton: true, what: 'a tuft of cattail fluff', cost: SNAIL_COTTON[c], line: c ? '*mm* More fluff. It is soft.' : 'Cattail fluff. I sleep on it. You look like you are coming apart a little.' });
  return out;
}
SCENES.snail = npc => {
  const steps = [walkTo(npc.x - 3.5 * T), faceTo(npc.x)];
  if (!world.flags.metSnail) {
    world.flags.metSnail = true; saveWorld();
    steps.push(run(() => { npcPose = { frame: 'snail_hide', t: 1.0 }; }), wait(1.0),
      say('snail', '*mm* Oh. You are soft. I thought you were a bottle cap. I hide first and look after.',
        'I am old. And slow. So I have seen all of this pond. Every reed. Every stone.',
        'I will tell you where things are. For pebbles. The smooth ones, please.'));
  } else steps.push(say('snail', ...SNAIL_CHAT[Math.floor(Math.random() * SNAIL_CHAT.length)]));
  const left = snailList();
  if (!left.length) return [...steps, say('snail', 'That is all I know. I will go and find out more. Slowly.')];
  let picked = -1;
  steps.push(ask('snail', `What would you like? You have ${world.pebbles || 0} pebbles.`, [...left.map(s => `${s.what} (${s.cost} pebbles)`), 'nothing, bye'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const s = left[picked];
    if (!s) return true;
    if ((world.pebbles || 0) < s.cost) { scene.steps.splice(scene.i + 1, 0, say('snail', 'That is not enough pebbles. I counted. It took a while.')); return true; }
    world.pebbles -= s.cost; sfx.pebble();
    const after = [];
    if (s.pin) { world.pins = world.pins || {}; world.pins[s.pin] = true; after.push(run(() => { popup(P.x, P.y - 54, 'got the ' + PINS[s.pin].name, '#e8e6f0'); sfx.pickup(); })); }
    else if (s.cotton) { world.snailCotton = (world.snailCotton || 0) + 1; after.push(run(() => addCotton())); }
    else { world.flags[s.id] = true; world.marks.push(s.mark); after.push(run(() => popup(P.x, P.y - 54, 'marked on his map', '#e8e6f0'))); }
    saveWorld();
    scene.steps.splice(scene.i + 1, 0, say('snail', s.line), ...after, ...nod());
    return true;
  });
  return steps;
};

// ---------- a memory: the sand bucket ----------
SCENES.memoryBucket = it => [
  bars(true), wait(0.4),
  run(() => { sceneFade.warm = true; sfx.memory(); }),
  showText(['a blue sand bucket with a starfish on it.', 'a day at the beach. his kid built him a sandcastle,', 'and sat him on top of it like a king.']),
  run(() => {
    world.maxHealth += 1; P.maxHealth = world.maxHealth - (P.worn || 0); P.health = Math.min(P.maxHealth, P.health + 1); saveWorld();
    sceneFade.warm = false; puff(P.x, P.y - 22, 14, 60, '#ffffff', 60); sfx.stitch();
    popup(P.x, P.y - 54, 'one more cotton puff', '#fbf7ec', true);
  }),
  wait(1.0), bars(false),
];

// crossing the creek the first time: the hint can go
const _checkEventsPond = checkEvents;
checkEvents = dt => { _checkEventsPond(dt); if (room.def.id === 'dragonfly' && !world.flags.crossedCreek && P.ground && P.x < 10 * T) flagWorld('crossedCreek'); };
