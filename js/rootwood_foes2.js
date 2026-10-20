'use strict';
// ---------- Rootwood's new foes (10/15/2026) ----------
// The maple spinner (the first trip's flyer), the shoelace (in the burrow and the root lattice), and the first two of
// the Grime's nightmare things, the reacher and the night wing (the grime pool). Unlike the older litter these go after
// him: the flyers follow him round the room and steer round whatever's in the way, the shoelace follows him along the
// ground, up a step, off a ledge he's dropped from, and springs up onto one he's gone up to. The reacher follows him
// along under the pool. Helpers (near, strike, baseState, hopFoe, heard) are in pond.js, freeMove and fallDown in rootwood.js.

// is there a clear line between two points (nothing solid on it)
function sightLine(x0, y0, x1, y1) {
  const d = Math.hypot(x1 - x0, y1 - y0), n = Math.max(1, Math.ceil(d / 8));
  for (let i = 1; i < n; i++) { const t = i / n; if (solidPx(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)) return false; }
  return true;
}
// a flyer heading for (tx, ty): straight there if it can, and if something's in the way it goes up or down round it
// (or along it) for a moment instead of sitting stuck against it
function flyTo(f, tx, ty, sp, dt) {
  const dx = tx - f.x, dy = ty - f.y, d = Math.hypot(dx, dy);
  if (d < 0.5) return;
  const s = Math.min(d, sp * dt);
  let mx = dx / d * s, my = dy / d * s;
  if (f.det > 0) { f.det -= dt; mx = f.dvx * sp * dt; my = f.dvy * sp * dt; }
  const x0 = f.x, y0 = f.y;
  freeMove(f, mx, my);
  f.y = Math.max(2 * T, Math.min(room.pxH - T, f.y));
  const got = Math.hypot(f.x - x0, f.y - y0);
  if (got < s * 0.4 && !(f.det > 0)) {
    const b = FOE[f.kind].box(f);
    const opts = (Math.abs(dx) >= Math.abs(dy) ? [[0, -1], [0, 1]] : [[Math.sign(dx) || 1, 0], [-(Math.sign(dx) || 1), 0]])
      .filter(([ox, oy]) => !boxSolid(b.l + ox * 12, b.t + oy * 12, b.r + ox * 12, b.b + oy * 12));
    if (opts.length) { [f.dvx, f.dvy] = opts[0]; f.det = 0.4; }
  }
}
const toward = (f, x, y) => { const dx = x - f.x, dy = y - f.y, d = Math.hypot(dx, dy) || 1; return [dx / d, dy / d, d]; };
// a lifted flyer's shadow on the ground under it, fainter the higher it is
function flyerShadow(f, w) {
  const gy = groundY(f.x, f.y, 160, 0);
  if (gy === null) return;
  const k = 1 - (gy - f.y) / 160;
  if (k > 0) { ctx.fillStyle = `rgba(0,0,0,${(0.22 * k).toFixed(2)})`; ellipse(f.x, gy, Math.round(w * (0.5 + 0.5 * k)), 1); }
}
function drawFoe2(f, fr, x, y, shake = 0) {
  spr(fr, x + shake, y, f.f > 0);
  if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, x, y, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
}
function tellOnce(flag, f, text, dy = 66) { if (!world.flags[flag]) { world.flags[flag] = true; popup(f.x, f.y - dy, text, '#ffd36b'); } }

Object.assign(FOE, {
  // ---- the maple spinner: hangs in the air spinning on its one wing, follows him round the room keeping up over his
  // head, whirs, and drops on him seed first. Shield up over his head blocks it (or parries it). Miss, and it sticks
  // in the ground for a moment: that's the time to hit it
  spinner: { hp: 3, hw: 9, h: 12, acorns: [1, 2], free: true, ownSpot: true,
    setup(f) {
      for (let n = 0; n < 24 && boxSolid(f.x - 9, f.y - 12, f.x + 9, f.y + 6); n++) f.y += 4;
      f.hx = f.x; f.hy = f.y; f.spin = Math.random() * 6; f.off = (f.i % 2 ? 1 : -1) * (14 + (f.i % 3) * 8); f.cd = 1 + Math.random();
    },
    box: f => (f.state === 'stuck' || f.state === 'down' ? { l: f.x - 9, r: f.x + 9, t: f.y - 14, b: f.y } : { l: f.x - 9, r: f.x + 9, t: f.y - 12, b: f.y + 6 }),
    harmless: f => f.state === 'stuck' || f.state === 'down' || f.state === 'drop' || f.state === 'sweep',   // (the drop's its own hit, so the shield can take it)
    keepState: f => f.state === 'drop' || f.state === 'stuck',                   // a hit doesn't stop it falling, or pull it out of the ground
    update(f, dt) {
      if (f.state === 'down') { fallDown(f, dt); return; }
      baseState(f, dt);
      f.spin += dt * (f.state === 'whirl' ? 26 : 13);
      const dx = P.x - f.x, on = near(f, 22 * T, 15 * T) && sightLine(f.x, f.y, P.x, P.y - 20);
      if (f.state === 'walk' || f.state === 'hurt') {
        const tx = on ? P.x + f.off * 0.5 + Math.sin(f.t * 1.3) * 12 : f.hx + Math.sin(f.t * 0.5) * 30;
        const ty = on ? P.y - 96 + Math.sin(f.t * 2.1) * 6 : f.hy + Math.sin(f.t * 0.9) * 6;
        flyTo(f, tx, ty, on ? 82 : 30, dt);
        if (f.state === 'walk' && on && f.cd <= 0) {
          const over = Math.abs(dx) < 18 && P.y - f.y > 36 && P.y - f.y < 190 && sightLine(f.x, f.y + 8, f.x, P.y - 30);
          const s0 = Math.sign(f.x - P.x) || 1, lane = !boxSolid(Math.min(P.x, P.x + s0 * 96), P.y - 30, Math.max(P.x, P.x + s0 * 96), P.y - 4);   // room beside him to come in low
          const side = hasMove(f, 3) && P.ground && lane && sightLine(f.x, f.y, P.x + s0 * 84, P.y - 14) ? 1.2 : 0;
          const m = choose([[over ? 2 : 0, 'whirl'], [over && hasMove(f, 2) ? 1.4 : 0, 'lead'], [side, 'sweepwind']]);
          if (m) { f.lead = m === 'lead'; setFoeState(f, m === 'lead' ? 'whirl' : m); if (heard(f)) sfx.whirl(); f.side = Math.sign(f.x - P.x) || 1; }
        }
      } else if (f.state === 'whirl') {                                            // winding up: it lifts a little, spinning faster, still sliding over him
        const tx = f.lead ? P.x + Math.max(-70, Math.min(70, P.vx * 0.5)) : P.x;      // (the leading one aims where he's going, 10/16/2026)
        freeMove(f, Math.sign(tx - f.x) * Math.min(Math.abs(tx - f.x), (f.lead ? 70 : 30) * dt), -18 * dt);
        if (f.t >= 0.5) { setFoeState(f, 'drop'); f.vy = 80; f.y0d = f.y; sfx.whoosh(); }
      } else if (f.state === 'sweepwind') {                                        // tipping over on its side, down to his height off to one side of him
        flyTo(f, P.x + f.side * 84, P.y - 14, 140, dt);
        f.f = -f.side;
        if (f.t >= 0.6) { setFoeState(f, 'sweep'); f.vx = -f.side * 210; sfx.whoosh(); }
      } else if (f.state === 'sweep') {                                            // ...and rolls across at him like a saw blade
        const x0 = f.x; freeMove(f, f.vx * dt, 0);
        strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 22, b: f.y + 4 }, 18);
        if (Math.abs(f.x - x0) < 210 * dt * 0.4 || f.t >= 0.9) { setFoeState(f, 'rise'); if (Math.abs(f.x - x0) < 210 * dt * 0.4 && heard(f)) sfx.thunk(); }
      } else if (f.state === 'drop') {
        f.vy = Math.min(f.vy + 1100 * dt, 380);
        const ny = f.y + f.vy * dt;
        let gy = null;                                                             // the ground under its seed (and either side of it: bumpy ground)
        for (const ox of [0, -6, 6]) { const g2 = groundY(f.x + ox, f.y + 2, Math.ceil(f.vy * dt) + 8, 0); if (g2 !== null && (gy === null || g2 < gy)) gy = g2; }
        if (!(gy !== null && gy <= ny + 6) && boxSolid(f.x - 8, ny - 12, f.x + 8, ny + 6)) {   // it's come down on something: the top of it, if that's ground under it
          for (const ox of [-8, -4, 0, 4, 8]) { const g3 = groundY(f.x + ox, ny + 6, 0, 20); if (g3 !== null && g3 > f.y - 8 && (gy === null || g3 < gy || gy > ny + 6)) gy = g3; }
        }
        if (gy !== null && gy <= ny + 6) {                                         // into the ground: stuck there
          f.y = gy; setFoeState(f, 'stuck'); if (heard(f)) sfx.thunk(); puff(f.x, f.y, 5, 30, '#6a4a2a');
          tellOnce('spinnerStuck', f, "it's stuck. hit it");
        } else if (boxSolid(f.x - 8, ny - 12, f.x + 8, ny + 6) || ny > room.pxH - T || ny - f.y0d > 12 * T || f.t > 1.6) { setFoeState(f, 'rise'); f.vy = 0; }
        else f.y = ny;
        if (f.state === 'drop') {
          const out = strike(f, { l: f.x - 8, r: f.x + 8, t: f.y - 8, b: f.y + 7 }, 16);
          if (out === 'blocked') { setFoeState(f, 'rise'); f.vy = 0; puff(f.x, f.y, 3, 20, '#e8a060'); }
          if (out === 'parried') { setFoeState(f, 'stagger'); f.stagT = 1.6; f.vy = -60; }
        }
      } else if (f.state === 'stuck') {
        if (f.t >= 1.5) { setFoeState(f, 'rise'); if (heard(f)) sfx.flap(); puff(f.x, f.y, 4, 24, '#6a4a2a'); }
      } else if (f.state === 'rise') {                                             // pulling itself up out of it and back up over him
        const b = FOE.spinner.box(f);
        if (boxSolid(b.l, b.t, b.r, b.b)) f.y -= 60 * dt;                          // still in the ground: straight up out of it first
        else flyTo(f, f.x, (on ? P.y : f.y) - 90, 64, dt);
        if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 0.8 + Math.random() * 0.6; }
      } else if (f.state === 'stagger') {                                          // parried: knocked silly, it drops to the ground and lies there
        fallDown(f, dt);
        if (f.t >= f.stagT) { setFoeState(f, 'rise'); }
      }
    },
    frame: f => 'spinner_' + ({ walk: 'spin_' + (Math.floor(f.spin) % 6 + 1), hurt: 'spin_' + (Math.floor(f.spin) % 6 + 1), rise: 'spin_' + (Math.floor(f.spin) % 6 + 1),
      whirl: 'whirl_' + (Math.floor(f.t * 18) % 2 + 1), sweepwind: f.t < 0.3 ? 'whirl_' + (Math.floor(f.t * 18) % 2 + 1) : 'sweep_' + (Math.floor(f.t * 18) % 2 + 1), sweep: 'sweep_' + (Math.floor(f.t * 18) % 2 + 1), drop: 'drop_' + (Math.floor(f.t * 20) % 2 + 1), stuck: 'stuck_' + (Math.floor(f.t * (f.t < 0.5 ? 14 : 4)) % 2 + 1),
      stagger: 'dizzy', down: 'down' }[f.state] || 'spin_1'),
    draw(f) {
      if (f.state !== 'stuck' && f.state !== 'down') flyerShadow(f, 8);
      drawFoe2(f, FOE.spinner.frame(f), f.x, f.y, f.state === 'whirl' || f.state === 'sweepwind' ? Math.round(Math.sin(f.t * 70)) : 0);
    } },

  // ---- the shoelace: slithers after him along the ground, up a step, off a ledge he's dropped from, and springs up
  // onto one he's gone up to. Close in, it coils back and lashes out low along the ground: that one trips him flat.
  // Jump at it and it rears up and snaps at him in the air. Parried, it ties itself in a knot
  lace: { hp: 5, hw: 12, h: 9, acorns: [1, 2], leaps: true, baseMoves: 4,
    setup(f) { const gy = groundY(f.x, f.y, 40, 8); if (gy !== null) f.y = gy; f.home = f.x; f.rt = 0; f.cd = 0.6 + Math.random() * 0.6; },   // settled onto the ground wherever it was put
    box: f => {
      const fr = f.x + f.f * 26, bk = f.x - f.f * 20;                                 // the head's out in front of the middle
      if (f.state === 'whirl') return { l: f.x - 30, r: f.x + 30, t: f.y - 14, b: f.y };
      if (f.state === 'rear' || f.state === 'snap') return { l: f.x - (f.f < 0 ? 16 : 6), r: f.x + (f.f < 0 ? 6 : 16), t: f.y - (f.state === 'snap' ? 52 : 40), b: f.y };
      if (f.state === 'lash' || f.state === 'rest') { const tip = f.x + f.f * (f.state === 'lash' ? 46 : 30); return { l: Math.min(tip, f.x + 20 * -f.f), r: Math.max(tip, f.x + 20 * -f.f), t: f.y - 9, b: f.y }; }
      return { l: Math.min(fr, bk), r: Math.max(fr, bk), t: f.y - 10, b: f.y };
    },
    harmless: f => f.state !== 'walk' && f.state !== 'hop',                         // bumping into it hurts; once it's attacking, only the attack itself does (so the shield can take it)
    update(f, dt) {
      if (f.state === 'down') { if (f.air) airStep(f, dt); return; }
      baseState(f, dt);
      if ((f.rt -= dt) <= 0 && !f.air) { f.range = patrol(f.x, f.y); f.rt = 0.25; }        // where a hit can push it to, along the ground it's on now
      if (f.air) {                                                                       // springing up, or dropping off a ledge after him
        if (airStep(f, dt)) { if (heard(f)) sfx.thud(); setFoeState(f, 'walk'); f.cd = Math.max(f.cd, 0.25); f.rt = 0; }
        return;
      }
      const dx = P.x - f.x, dy = P.y - f.y, on = near(f, 18 * T, 8 * T);
      if (f.state === 'walk') {
        let dir = f.f, sp = 34;
        if (on) { sp = 84; if (Math.abs(dx) > 26) dir = Math.sign(dx); }
        else if (Math.abs(f.x - f.home) > 5 * T) dir = Math.sign(f.home - f.x);           // nothing to chase: it noses about near where it lives
        f.f = dir;
        if (on && f.cd <= 0 && P.ground && Math.abs(dy) < 24) {                          // its newer two (10/16/2026): a lasso that drags him in, and a whirl that hits both sides
          // (each from where its drawing really reaches him, 10/16/2026: the lash 54 px, the lasso about 95 with its throw, the whirl 34 either side)
          const m = choose([[Math.abs(dx) < 58 && Math.sign(dx || f.f) === f.f ? 2 : 0, 'coil'], [hasMove(f, 3) && Math.abs(dx) > 60 && Math.abs(dx) < 100 ? 1.4 : 0, 'throwwind'], [hasMove(f, 4) && Math.abs(dx) < 40 ? 1.4 : 0, 'whirlwind']]);
          if (m) { if (m !== 'coil') f.f = Math.sign(dx) || f.f; setFoeState(f, m); if (heard(f)) sfx.hiss(); return; }   // (the lash only at his feet while he's on them: jump and it rears instead)
        }
        if (on && f.cd <= 0 && Math.abs(dx) < 30 && dy < -26 && dy > -96) { f.f = Math.sign(dx) || f.f; setFoeState(f, 'rear'); if (heard(f)) sfx.hiss(); return; }   // (the snap reaches 24 px)
        if (on && Math.abs(dx) <= 26 && Math.abs(dy) < 24) return;                      // right on him: it holds there for its next go
        const res = groundStep(f, dir, sp, dt);
        if (res === 'edge') {
          if (on && (dy > 8 || (Math.abs(dx) > 30 && safeDip(f, dir)))) { f.air = true; f.vy = 0; f.hopVX = dir * 90; setFoeState(f, 'hop'); }   // he's below (or across a dip): off it goes after him
          else if (!on) f.f = -dir;
        } else if (res === 'wall') {
          if (on && dy < -6 && dy > -5 * T && Math.abs(dx) < 7 * T && f.cd <= 0) { setFoeState(f, 'crouch'); }   // he's up there: it springs
          else if (!on) f.f = -dir;
        }
      } else if (f.state === 'crouch') {
        if (f.t >= 0.3) { setFoeState(f, 'hop'); f.air = true; f.vy = -400; f.hopVX = f.f * 110; if (heard(f)) sfx.boing(); }
      } else if (f.state === 'coil') {
        if (f.t >= 0.42) { setFoeState(f, 'lash'); sfx.whip(); }
      } else if (f.state === 'lash') {
        const tip = f.x + f.f * 60;
        const out = strike(f, { l: Math.min(f.x + f.f * 6, tip), r: Math.max(f.x + f.f * 6, tip), t: f.y - 13, b: f.y + 2 }, 18);
        if (out === 'hit' && P.ground && P.health > 0) {                                    // tripped flat on his face
          P.hurtT = 0; P.vx = 0; P.vy = 0; P.splat = 0.001; P.atk = null; puff(P.x, P.y, 8, 50); sfx.splat();
          tellOnce('laceTrip', f, 'tripped him right up', 50);
        }
        if (out === 'parried') { tellOnce('laceKnot', f, 'it tied itself in a knot'); }
        if (f.state === 'lash' && f.t >= 0.22) setFoeState(f, 'rest');
      } else if (f.state === 'throwwind') { if (Math.abs(dx) > 8) f.f = Math.sign(dx); if (f.t >= 0.35) { setFoeState(f, 'lasso'); sfx.whip(); } }   // (keeps its eyes on him while it winds up)
      else if (f.state === 'lasso') {                                                     // a loop in its end, thrown out at him...
        if (f.t < 0.24) {                                                                 // (it throws itself forward with it, over the little bumps, not off an edge or into a wall)
          const nx = f.x + f.f * 200 * dt, gy = groundFoot(nx, f.y);
          if (gy !== null && Math.abs(gy - f.y) <= 8 && !boxSolid(nx - 6, gy - 10, nx + 6, gy - 2) && nx > 2 * T && nx < room.pxW - 2 * T) { f.x = nx; f.y = gy; }
        }
        const lx = f.x + f.f * 64;
        const out = f.t < 0.24 ? strike(f, { l: Math.min(f.x + f.f * 24, lx), r: Math.max(f.x + f.f * 24, lx), t: f.y - 40, b: f.y - 8 }, 18) : null;
        if (out === 'hit' && P.health > 0) { setFoeState(f, 'pull'); tellOnce('laceLasso', f, 'it lassoed him', 50); return; }
        if (f.t >= 0.45) setFoeState(f, 'rest');
      } else if (f.state === 'pull') {                                                    // ...and drags him in for a lash
        pullHim(f.x + f.f * 30, 230, dt);
        if (f.t >= 0.5) { setFoeState(f, 'coil'); f.t = 0.2; }
      } else if (f.state === 'whirlwind') { if (f.t >= 0.35) { setFoeState(f, 'whirl'); sfx.whirl(); } }
      else if (f.state === 'whirl') {                                                     // up on its middle, both ends whipping round
        if (f.t < 0.5) { const out = strike(f, { l: f.x - 44, r: f.x + 44, t: f.y - 24, b: f.y + 2 }, 18); if (out === 'parried') tellOnce('laceKnot', f, 'it tied itself in a knot'); }
        if (f.state === 'whirl' && f.t >= 0.7) setFoeState(f, 'rest');
      } else if (f.state === 'rear') {
        if (f.t >= 0.3) { setFoeState(f, 'snap'); sfx.snap(); }
      } else if (f.state === 'snap') {
        const hx = f.x + f.f * 10;
        strike(f, { l: hx - 14, r: hx + 14, t: f.y - 78, b: f.y - 22 }, 16);
        if (f.state === 'snap' && f.t >= 0.24) setFoeState(f, 'rest');
      } else if (f.state === 'rest') {
        if (f.t >= 0.55) { setFoeState(f, 'walk'); f.cd = 0.8 + Math.random() * 0.5; }
      }
    },
    frame: f => 'lace_' + (f.air ? 'hop' : ({ asleep: 'down', walk: 'slither_' + (Math.floor(f.t * 8) % 3 + 1), coil: 'coil', throwwind: 'coil', lasso: 'throw', pull: 'throw', whirlwind: 'coil', whirl: 'whirl_' + (Math.floor(f.t * 16) % 2 + 1), lash: 'lash', rest: 'rest', rear: 'rear', snap: 'snap', crouch: 'coil', hop: 'hop',
      stagger: 'knot', down: 'down', hurt: 'slither_1' }[f.state] || 'slither_1')),
    draw(f) {
      ctx.fillStyle = 'rgba(0,0,0,0.22)'; if (!f.air) ellipse(f.x - f.f * -2, f.y, 20, 1);
      drawFoe2(f, FOE.lace.frame(f), f.x, f.y, f.state === 'coil' || f.state === 'crouch' || f.state === 'throwwind' || f.state === 'whirlwind' ? Math.round(Math.sin(f.t * 60)) : 0);
    } },

  // ---- the reacher (a nightmare thing): an arm of Grime under the pool. It follows him along under the surface (just
  // bubbles) and when he's over it, the bubbles boil up, the eye in its palm shows through, and it shoots up and grabs
  // at him. A grab that lands flings him up in the air. Then it waits up there swaying, and swipes sideways at him if
  // he's down on the bank beside it. Parry the swipe and it flops over limp. It can't be hit while it's under
  reacher: { hp: 5, hw: 9, h: 0, acorns: [2, 3], free: true, ownSpot: true, noHurt: true, baseMoves: 4,
    setup(f, d) {
      const pl = (room.def.pool || []).find(p => f.x >= p[0] && f.x <= p[1]) || (room.def.pool || [])[0];
      f.sy = pl ? pl[2] : f.y; f.y = f.sy;
      f.lane = d && d.lane ? [d.lane[0] * T, d.lane[1] * T] : pl ? [pl[0] + 10, pl[1] - 10] : [f.x - 3 * T, f.x + 3 * T];
      f.x = Math.max(f.lane[0], Math.min(f.lane[1], f.x)); f.hx = f.x; f.state = 'lurk'; f.reach = 60; f.bub = 0; f.cd = 1;
    },
    box: f => {
      const s = f.sy;
      if (f.state === 'grab' || f.state === 'sway' || f.state === 'hold') return { l: f.x - 9, r: f.x + 9, t: s - f.reachNow - 12, b: s };
      if (f.state === 'slap') return { l: Math.min(f.x, f.x + f.f * 30) - 6, r: Math.max(f.x, f.x + f.f * 30) + 6, t: s - 34, b: s };
      if (f.state === 'wind' || f.state === 'slapwind') return { l: f.x - 9, r: f.x + 9, t: s - 70, b: s };
      if (f.state === 'swipe' || f.state === 'stagger') { return { l: Math.min(f.x, f.x + f.f * 40) - 6, r: Math.max(f.x, f.x + f.f * 40) + 6, t: s - 46, b: s }; }
      return { l: -999, r: -998, t: -999, b: -998 };                                     // under the Grime: nothing to hit
    },
    harmless: () => true,                                                                 // only its grab and its swipe hurt
    update(f, dt) {
      f.vel = 0;                                                                          // it's rooted in the pool: hits don't shove it along
      if (f.state !== 'lurk' && f.state !== 'rise' && f.ax !== undefined) f.x = f.ax;
      const s = f.sy, dx = P.x - f.x;
      const over = phillAround() && !(P.story && !P.story.free) && P.x > f.lane[0] - 64 && P.x < f.lane[1] + 64 && P.y <= s + 4 && P.y > s - 230;
      if (f.state === 'down') { f.reachNow = 0; return; }
      if (f.state === 'stagger') { if (f.t >= f.stagT) { setFoeState(f, 'sink'); } return; }   // (parried: flopped over, see draw)
      if (f.state === 'lurk' || f.state === 'rise') {                                    // following him along under the surface
        const tx = over ? Math.max(f.lane[0], Math.min(f.lane[1], P.x)) : f.hx;
        const sp = f.state === 'rise' ? (f.t < 0.35 ? 45 : 0) : over ? 100 : 30;
        f.x += Math.sign(tx - f.x) * Math.min(Math.abs(tx - f.x), sp * dt);
        if (over) f.f = Math.sign(dx) || f.f;
        f.bub -= dt;
        if (f.bub <= 0) { f.bub = f.state === 'rise' ? 0.05 : over ? 0.22 : 0.6; part(f.x + (Math.random() * 2 - 1) * (f.state === 'rise' ? 9 : 5), s - 1, 0, -18 - Math.random() * 14, 0.4, Math.random() < 0.5 ? '#4e3a6e' : '#2a1e3e', 2, -10); if (f.state === 'rise' && heard(f) && Math.random() < 0.3) sfx.bloop(); }
      }
      f.ax = f.x;
      if (f.state === 'lurk') {
        if (!over || f.cd > 0) return;
        const above = P.x > f.lane[0] - 6 && P.x < f.lane[1] + 6 && s - P.y < 132;            // he's over the pool, low enough to reach
        const bank = (P.x < f.lane[0] || P.x > f.lane[1]) && Math.abs(P.y - s) < 40 && Math.abs(dx) < 60;   // he's on the bank right beside it
        if (above && Math.abs(dx) < 14) { setFoeState(f, 'rise'); }
        else if (bank) { setFoeState(f, 'rise'); f.side = true; }
      } else if (f.state === 'rise') {                                                   // the tell: the Grime boils and the eye shows through
        if (f.t >= 0.55) {
          if (f.side) { f.side = false; f.reachNow = 60; setFoeState(f, 'wind'); f.f = Math.sign(dx) || f.f; sfx.splort(); }
          else { f.reach = Math.max(44, Math.min(116, s - (P.y - 26))); f.reachNow = 0; setFoeState(f, 'grab'); sfx.grab(); sfx.splort(); puff(f.x, s, 8, 60, '#3a2a52'); }
        }
      } else if (f.state === 'grab') {
        f.reachNow = f.reach * Math.min(1, f.t / 0.12);
        if (f.t < 0.3) {
          const out = strike(f, { l: f.x - 11, r: f.x + 11, t: s - f.reachNow - 14, b: s - 6 }, 22);
          if (out === 'hit' && hasMove(f, 3) && P.health > 0 && Math.random() < 0.5) {       // it hangs on to him and shakes (10/16/2026): mash to get loose before it squeezes
            f.caught = true; pinHim(f, 7); setFoeState(f, 'hold'); f.reachNow = f.reach; tellOnce('reacherHold', f, 'mash to wriggle free', f.reach + 20); return;
          }
          if (out === 'hit') { P.vx = 0; P.vy = -430; P.hurtT = Math.max(P.hurtT, 0.25); f.caught = true; tellOnce('reacherFling', f, 'it flung him', f.reach + 20); }
          if (out === 'parried') { setFoeState(f, 'stagger'); f.stagT = 1.8; return; }
        }
        if (f.t >= 0.4) { setFoeState(f, 'sway'); f.reachNow = Math.min(f.reach, 90); }
      } else if (f.state === 'hold') {                                                   // shaking him about in its fist
        f.reachNow = f.reach;
        if (!pinnedBy(f)) { setFoeState(f, 'stagger'); f.stagT = 1.4; tellOnce('reacherLimp', f, 'it went all limp', 104); return; }   // he got loose: it's left reeling
        P.pinned.x = f.x + Math.sin(f.t * 30) * 3; P.pinned.y = s - f.reach + 22 + Math.abs(Math.sin(f.t * 15)) * 3;
        if (f.t >= 1.7) { P.pinned = null; hurt(f.x, 'reacher', 1); P.vx = f.f * 140; P.vy = -380; setFoeState(f, 'sway'); f.reachNow = Math.min(f.reach, 90); }
      } else if (f.state === 'slapwind') { f.reachNow = 60; if (f.t >= 0.4) { setFoeState(f, 'slap'); sfx.slam(); shakeT = 0.08; shakeA = 1.5; puff(f.x + f.f * 30, s, 8, 50, '#3a2a52');   // slapped down on the pool: a wave of Grime rolls out at him
        shots.push({ kind: 'wave', col: '#4e3a6e', x: f.x + f.f * 34, y: s - 6, vx: f.f * 150, vy: 0, g: 0, from: f, reflected: false, t: 0, life: 1.8,
          draw: sh => { ctx.fillStyle = '#221630'; for (let i = 0; i < 3; i++) ctx.fillRect(Math.round(sh.x - 6 + i * 4), Math.round(sh.y - 4 + Math.abs(i - 1) * 2), 4, 8 - Math.abs(i - 1) * 2); ctx.fillStyle = '#7a64b0'; ctx.fillRect(Math.round(sh.x - 3), Math.round(sh.y - 5), 6, 1); } });
      } }
      else if (f.state === 'slap') {
        if (f.t < 0.15) { const out = strike(f, { l: Math.min(f.x + f.f * 10, f.x + f.f * 46), r: Math.max(f.x + f.f * 10, f.x + f.f * 46), t: s - 30, b: s }, 20); if (out === 'parried') { setFoeState(f, 'stagger'); f.stagT = 1.8; return; } }
        if (f.t >= 0.5) setFoeState(f, 'sink');
      } else if (f.state === 'sway') {                                                   // left up, waiting, watching him
        f.reachNow = Math.min(f.reach, 90);
        f.f = Math.sign(dx) || f.f;
        if (f.cd2 === undefined) f.cd2 = 0;
        f.cd2 -= dt;
        if (Math.abs(dx) < 62 && P.y > s - 70 && P.y < s + 10 && f.cd2 <= 0 && f.t > 0.3) { setFoeState(f, 'wind'); f.cd2 = 1.2; return; }
        if (hasMove(f, 4) && Math.abs(dx) >= 62 && Math.abs(dx) < 170 && Math.abs(P.y - s) < 50 && f.cd2 <= 0 && f.t > 0.5) { setFoeState(f, 'slapwind'); f.cd2 = 1.5; sfx.windup(); return; }
        if (f.t >= 1.6) { setFoeState(f, 'sink'); }
      } else if (f.state === 'wind') {                                                   // cocking back to swipe
        if (f.t >= 0.4) { setFoeState(f, 'swipe'); sfx.swish(); }
      } else if (f.state === 'swipe') {
        if (f.t < 0.22) {
          const out = strike(f, { l: Math.min(f.x, f.x + f.f * 60), r: Math.max(f.x, f.x + f.f * 60), t: s - 54, b: s - 4 }, 20);
          if (out === 'parried') { setFoeState(f, 'stagger'); f.stagT = 1.8; tellOnce('reacherLimp', f, 'it went all limp', 104); return; }
        }
        if (f.t >= 0.45) { setFoeState(f, 'sink'); }
      } else if (f.state === 'sink') {
        if (f.t >= 0.35) { setFoeState(f, 'lurk'); f.cd = 1.0 + Math.random() * 0.6; f.reachNow = 0; f.caught = false; }
      }
    },
    onDown(f) {                                                                           // its acorns pop out onto the bank, not into the Grime
      const lx = f.lane[0] - 20, rx = f.lane[1] + 20, bank = Math.abs(f.x - lx) < Math.abs(f.x - rx) ? lx : rx;
      for (const d of drops) if (Math.abs(d.x - f.x) < 2 && d.t === 0) { d.vx = (bank - f.x) / 0.7; d.vy = -330; d.y = f.sy - 30; }
    },
    frame: f => {
      if (f.state === 'grab') return f.t < 0.06 ? 'reacher_rise_2' : f.caught ? 'reacher_clutch' : 'reacher_grab';
      if (f.state === 'hold') return 'reacher_clutch';
      if (f.state === 'sway') return 'reacher_sway_' + (Math.floor(f.t * 2.5) % 2 + 1);
      return 'reacher_' + ({ rise: 'rise_1', wind: 'wind', slapwind: 'wind', slap: 'slap', swipe: 'swipe', stagger: 'limp', sink: 'sink', down: 'down' }[f.state] || 'sink');
    },
    draw(f) {
      const s = f.sy;
      if (f.state === 'down' && f.t > 0.7) return;
      if (f.state === 'lurk' || (f.state === 'rise' && f.t < 0.3)) {                    // just a swell in the Grime and its bubbles (and the eye, when it's about to come)
        const k = f.state === 'rise' ? 1 : 0.45;
        ctx.fillStyle = `rgba(110,86,170,${(0.35 * k).toFixed(2)})`; ellipse(f.x, s + 1, Math.round(6 + 4 * k + Math.sin(f.t * 5)), 1);
        if (f.state === 'rise') { ctx.fillStyle = 'rgba(236,234,255,0.8)'; ctx.fillRect(Math.round(f.x) - 1, s + 1, 3, 2); ctx.fillStyle = 'rgba(150,120,220,0.5)'; ctx.fillRect(Math.round(f.x) - 3, s, 7, 4); }
        return;
      }
      let fr = FOE.reacher.frame(f), y = s + 2;
      if (f.state === 'grab' || f.state === 'sway' || f.state === 'hold') {             // the arm's drawn up to however high it reached: the picture's moved down so the hand's at the top of the reach
        const top = (f.state === 'grab' && f.t >= 0.06) || f.state === 'hold' ? 104 : 84;
        y = s + 2 + Math.max(0, top - f.reachNow);
        ctx.save(); ctx.beginPath(); ctx.rect(f.x - 60, s - 140, 120, 142); ctx.clip();   // and the part below the surface doesn't show
        drawFoe2(f, fr, f.x, y, f.state === 'hold' ? Math.round(Math.sin(f.t * 30) * 2) : 0); ctx.restore(); return;
      }
      drawFoe2(f, fr, f.x, y, f.state === 'wind' || f.state === 'slapwind' ? Math.round(Math.sin(f.t * 50)) : 0);
    } },

  // ---- the night wing (a nightmare thing): asleep in the Grime till he comes near, then it peels up off the surface.
  // It circles him, folds its wings with a shriek, and shoots straight at him, then turns and does it again. After two
  // it hangs there worn out for a moment. Shooting into a wall knocks it silly. Parry a dash and it reels
  nwing: { hp: 4, hw: 10, h: 12, acorns: [2, 3], free: true, ownSpot: true,
    setup(f, d) {
      f.orb = Math.random() * 6; f.odir = f.i % 2 ? 1 : -1; f.n = 0;
      const pl = (room.def.pool || []).find(p => f.x >= p[0] && f.x <= p[1]);
      if (d && d.dormant && pl) { f.sy = pl[2]; f.y = f.sy; f.state = 'dormant'; f.wake = (d.wake || 8) * T; }
      else { for (let n = 0; n < 24 && boxSolid(f.x - 10, f.y - 10, f.x + 10, f.y + 6); n++) f.y += 4; }
      f.hx = f.x; f.hy = f.state === 'dormant' ? f.sy - 3 * T : f.y; f.cd = 1.0;
    },
    box: f => (f.state === 'dormant' || (f.state === 'emerge' && f.t < 0.4) ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 10, r: f.x + 10, t: f.y - 10, b: f.y + 6 }),
    harmless: f => ['dormant', 'emerge', 'tired', 'stagger', 'dash'].includes(f.state),          // (the dash is its own hit, so the shield can take it)
    update(f, dt) {
      if (f.state === 'down') { fallDown(f, dt); return; }
      baseState(f, dt);
      const [ux, uy, d] = toward(f, P.x, P.y - 18);
      if (f.state === 'dormant') {
        if (near(f, f.wake, 200)) { setFoeState(f, 'emerge'); if (heard(f, 500)) { sfx.splort(); sfx.flap(); } puff(f.x, f.sy, 6, 40, '#3a2a52'); }
        return;
      }
      if (f.state === 'emerge') {                                                        // peeling up off the pool
        if (f.t > 0.4) f.y -= 60 * dt;
        if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 0.8; tellOnce('nightWing', f, 'something came up out of the grime', 30); }
        return;
      }
      const on = phillAround() && !(P.story && !P.story.free) && d < 26 * T;
      if (f.state === 'walk' || f.state === 'hurt') {
        f.f = Math.sign(P.x - f.x) || f.f;
        if (on) {
          f.orb += dt * 1.0 * f.odir;
          flyTo(f, P.x + Math.cos(f.orb) * 96, P.y - 52 + Math.sin(f.orb) * 34, 125, dt);
          if (f.state === 'walk' && f.cd <= 0 && d < 220 && sightLine(f.x, f.y, P.x, P.y - 18)) {   // its newer two (10/16/2026): a shriek that shoves him back, and a spray of shadow quills
            const m = choose([[d < 200 ? 2 : 0, 'fold'], [hasMove(f, 2) && d < 120 ? 1.3 : 0, 'shriek'], [hasMove(f, 3) && d > 70 ? 1.3 : 0, 'quillwind']]);
            if (m) { setFoeState(f, m); f.n = 0; sfx.screech(); }
          }
        } else flyTo(f, f.hx + Math.sin(f.t * 0.6) * 24, f.hy + Math.sin(f.t * 1.4) * 8, 40, dt);
      } else if (f.state === 'fold') {                                                   // hanging still, wings folding back: the tell
        f.f = Math.sign(P.x - f.x) || f.f;
        freeMove(f, -ux * 14 * dt, -uy * 14 * dt);
        if (f.t >= (f.n === 0 ? 0.45 : 0.28)) { setFoeState(f, 'dash'); f.vx = ux * 340; f.vy = uy * 340; f.n++; sfx.whoosh(); }
      } else if (f.state === 'dash') {
        const x0 = f.x, y0 = f.y;
        freeMove(f, f.vx * dt, f.vy * dt);
        const moved = Math.hypot(f.x - x0, f.y - y0);
        const out = strike(f, FOE.nwing.box(f), 18);
        if (out === 'parried') { setFoeState(f, 'stagger'); f.stagT = 1.6; f.vy = 0; return; }
        if (out === 'blocked') { f.vel = 0; freeMove(f, -f.vx * 0.06, -f.vy * 0.06); setFoeState(f, f.n < 2 ? 'turn' : 'tired'); return; }   // (a block's neutral: it carries on as if the dash ended, it isn't worn out by it)
        if (moved < 340 * dt * 0.4) {                                                     // straight into the wall
          setFoeState(f, 'stagger'); f.stagT = 1.3; sfx.thud(); shakeT = 0.1; shakeA = 1.5; puff(f.x, f.y, 6, 30, '#3a2a52');
          tellOnce('nwingBonk', f, 'it flew right into the wall'); return;
        }
        if (f.t >= 0.42) { if (f.n < 2) { setFoeState(f, 'turn'); } else { setFoeState(f, 'tired'); } }
      } else if (f.state === 'shriek') {                                                 // wings thrown wide... and a shriek that shoves him back
        f.f = Math.sign(P.x - f.x) || f.f;
        if (f.t >= 0.35 && !f.hitP) {
          f.hitP = true; sfx.screech(); shakeT = 0.12; shakeA = 1.5;
          for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; part(f.x, f.y - 2, Math.cos(a) * 120, Math.sin(a) * 120, 0.3, '#b8a8f0', 1, 0); }
          if (d < 130 && phillAround() && !(P.story && !P.story.free)) {
            const covered = guardUp() && Math.sign(f.x - P.x) === P.facing;
            if (covered) { P.recoilT = 0.15; P.recoilV = -P.facing * 160; sfx.block(); }
            else if (P.inv <= 0 && !dodgeSafe()) { P.vx = Math.sign(P.x - f.x || 1) * 340; P.vy = Math.min(P.vy, -180); P.ground = false; P.hurtT = Math.max(P.hurtT, 0.2); tellOnce('nwingShriek', f, 'it shrieked him right back', 40); }
          }
        }
        if (f.t >= 0.8) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.6; }
      } else if (f.state === 'quillwind') {                                              // hunched up, bristling...
        f.f = Math.sign(P.x - f.x) || f.f; freeMove(f, 0, -10 * dt);
        if (f.t >= 0.5) {                                                                 // ...and a fan of shadow quills flung at him
          const a0 = Math.atan2(uy, ux);
          for (let i = -2; i <= 2; i++) { const a = a0 + i * 0.22; shots.push({ kind: 'quill', col: '#5c4884', x: f.x, y: f.y - 2, vx: Math.cos(a) * 230, vy: Math.sin(a) * 230, g: 0, from: f, reflected: false, t: 0,
            draw: sh => { ctx.save(); ctx.translate(Math.round(sh.x), Math.round(sh.y)); ctx.rotate(Math.atan2(sh.vy, sh.vx) + Math.PI); spr('nwing_quill', 0, 0, false); ctx.restore(); } }); }
          sfx.whoosh(); setFoeState(f, 'tired'); f.t = 0.3;
        }
      } else if (f.state === 'turn') {                                                   // swinging round for another go
        f.vx *= Math.pow(0.02, dt); f.vy *= Math.pow(0.02, dt); freeMove(f, f.vx * dt, f.vy * dt);
        f.f = Math.sign(P.x - f.x) || f.f;
        if (f.t >= 0.22) setFoeState(f, on ? 'fold' : 'walk');
      } else if (f.state === 'tired') {                                                  // worn out: hanging there, sinking a little
        freeMove(f, 0, 12 * dt);
        if (f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.6; }
      } else if (f.state === 'stagger') {
        freeMove(f, 0, 40 * dt);
      }
    },
    frame: f => 'nwing_' + ({ walk: 'flap_' + (Math.floor(f.t * 10) % 3 + 1), hurt: 'flap_2', fold: 'fold', shriek: f.t < 0.3 ? 'fold' : 'shriek', quillwind: 'fold', dash: 'dash', turn: 'flap_2', tired: 'tired',
      emerge: f.t < 0.45 ? 'emerge_1' : 'emerge_2', stagger: 'dizzy', down: 'down' }[f.state] || 'flap_1'),
    draw(f) {
      if (f.state === 'dormant') {                                                       // just a slow ripple where it's sleeping
        const k = 0.5 + 0.5 * Math.sin(f.t * 1.7);
        ctx.fillStyle = `rgba(110,86,170,${(0.15 + 0.15 * k).toFixed(2)})`; ellipse(f.x, f.sy + 1, Math.round(5 + 3 * k), 1); return;
      }
      if (f.state === 'emerge') { drawFoe2(f, FOE.nwing.frame(f), f.x, f.sy + 2); return; }
      if (f.state !== 'down') flyerShadow(f, 10);
      drawFoe2(f, FOE.nwing.frame(f), f.x, f.y, f.state === 'fold' || f.state === 'quillwind' || (f.state === 'shriek' && f.t < 0.35) ? Math.round(Math.sin(f.t * 60)) : 0);
    } },
});
