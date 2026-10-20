'use strict';
// ---------- Rootwood's harder litter ----------
// The main way through Rootwood only has bottle caps and soda cans. These ones live behind the gates (up in the
// branches, down in the flooded roots, in the pockets only an ability opens) and the odd dead end, so they come in
// once he's ready for them. Helpers (near, strike, baseState, hopFoe) are in pond.js.
// a big move goes a few pixels at a time, stopping where it meets something: one big step could land it clean on the far
// side of a wall (the bag's gust, blocked a moment, then jumped 38 px through a tile, the terrain audit 10/17/2026)
const freeMove = (f, dx, dy) => {
  const n = Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 3);
  if (n <= 1) return freeStep(f, dx, dy);
  let full = true;
  for (let i = 0; i < n; i++) { const x0 = f.x, y0 = f.y; if (!freeStep(f, dx / n, dy / n)) { full = false; if (f.x === x0 && f.y === y0) break; } }   // (sliding along a wall it keeps going; stopped dead, it stops)
  return full;
};
const freeStep = (f, dx, dy) => {                                  // something flying: moves unless that puts it in a wall
  const b = FOE[f.kind].box(f), nx = f.x + dx, ny = f.y + dy;
  if (!boxSolid(b.l + dx, b.t + dy, b.r + dx, b.b + dy) && nx > T && nx < room.pxW - T) { f.x = nx; f.y = ny; return true; }
  if (!boxSolid(b.l + dx, b.t, b.r + dx, b.b) && nx > T && nx < room.pxW - T) { f.x = nx; return false; }
  if (!boxSolid(b.l, b.t + dy, b.r, b.b + dy)) f.y = ny;
  return false;
};
const fallDown = (f, dt) => {                                      // knocked out in midair: it drops to the ground
  f.vy = Math.min((f.vy || 0) + 700 * dt, 400);
  const ny = f.y + f.vy * dt;
  if (onFloorAt(f.x, Math.floor(ny / T) * T) && Math.floor(ny / T) * T >= f.y - 0.01) { f.y = Math.floor(ny / T) * T; f.vy = 0; }
  else if (ny < room.pxH - T) f.y = ny;
};

// the ceiling over x, if there's one within 8 tiles with open air all the way up to it (the gum climbing back up)
function ceilAbove(x, y) {
  const c = Math.floor(x / T);
  for (let r = Math.floor((y - 20) / T); r > 0 && r > Math.floor(y / T) - 9; r--) {
    if (tile(c, r) === 1) return (r + 1) * T + 2 * T < y ? (r + 1) * T : null;
    if (solidPx(x - 8, r * T + 8) || solidPx(x + 8, r * T + 8)) return null;
  }
  return null;
}

Object.assign(FOE, {
  // a candy wrapper: flutters about on its twisted ends, lines up over him, and swoops down. Its newer tricks (10/16/2026):
  // a dive it pulls out of to make him flinch before the real one, a spin that flings scraps of foil, and (a region out)
  // a dive that wraps itself round him and slows him till he shakes it off
  wrapper: { hp: 3, hw: 10, h: 14, acorns: [1, 2], free: true,
    setup(f) { let k = 3 * T; while (k > 0 && boxSolid(f.x - 10, f.y - k - 20, f.x + 10, f.y - k - 4)) k -= 4; f.y -= k; f.hx = f.x; f.hy = f.y; },   // up off the ground, but not into the ceiling (one was stuck in it)
    box: f => (f.state === 'wrap' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 10, r: f.x + 10, t: f.y - 18, b: f.y - 6 }),
    harmless: f => f.state === 'dive' || f.state === 'feint' || f.state === 'wrap',
    update(f, dt) {
      if (f.state === 'down') { fallDown(f, dt); return; }
      baseState(f, dt);
      const dx = P.x - f.x, dy = (P.y - 30) - f.y;
      if (f.state === 'walk' || f.state === 'hurt' || f.state === 'stagger') {
        if (f.state === 'stagger') { freeMove(f, 0, Math.sin(f.t * 20) * 8 * dt); return; }
        const tx = near(f, 260, 200) ? P.x - Math.sign(dx || 1) * 50 : f.hx, ty = near(f, 260, 200) ? P.y - 90 : f.hy;
        freeMove(f, Math.sign(tx - f.x) * Math.min(Math.abs(tx - f.x), 60 * dt), Math.sign(ty - f.y) * Math.min(Math.abs(ty - f.y), 50 * dt) + Math.sin(f.t * 5) * 20 * dt);
        if (f.state === 'walk' && f.cd <= 0 && near(f, 110, 150) && P.y > f.y + 20) {
          const m = choose([[2, 'aim'], [hasMove(f, 2) ? 1.2 : 0, 'feintaim'], [hasMove(f, 3) && near(f, 140, 130) ? 1.2 : 0, 'spin']]);
          f.f = Math.sign(dx) || f.f; setFoeState(f, m === 'feintaim' ? 'aim' : m); f.feint = m === 'feintaim'; m === 'spin' ? sfx.whirl() : sfx.paper();
        }
      } else if (f.state === 'aim') {
        if (f.t >= (f.again ? 0.28 : 0.4)) {                                                 // (after a feint 0.28 s, it was 0.18: the dive's a heavy now and needs time to read, 10/17/2026)
          f.again = false;
          const d = Math.hypot(dx, P.y - 16 - f.y) || 1; f.vx = dx / d * 250; f.vy = (P.y - 16 - f.y) / d * 250; sfx.whoosh();
          setFoeState(f, f.feint ? 'feint' : 'dive'); f.feint = false;
        }
      } else if (f.state === 'feint') {                                             // comes down at him... and pulls up short
        freeMove(f, f.vx * dt * (f.t < 0.2 ? 1 : 0.2), f.vy * dt * (f.t < 0.2 ? 1 : -0.6));
        if (f.t >= 0.36) { setFoeState(f, 'aim'); f.again = true; }
      } else if (f.state === 'dive') {
        const moved = freeMove(f, f.vx * dt, f.vy * dt);
        const out = strike(f, FOE.wrapper.box(f), 16);
        if (out === 'hit' && hasMove(f, 4) && P.health > 0) {                        // wrapped round him: he's slow till he shakes it off
          setFoeState(f, 'wrap'); P.slowT = 2.6; P.slowBy = f; sfx.paper(); tellOnce('wrapperWrap', f, 'mash to shake it off', 50); return;
        }
        if (!moved || f.t >= 0.7) { setFoeState(f, 'rise'); }
      } else if (f.state === 'wrap') {
        f.x = P.x; f.y = P.y - 6;
        if (P.slowT <= 0 || P.slowBy !== f || !phillAround()) {
          P.slowT = 0; setFoeState(f, 'stagger'); f.stagT = 0.9;
          // shaken off up beside him, somewhere open: it was put back inside the ceiling in the low rooms up the oak (the audit rerun, 10/16/2026)
          const b = -P.facing || 1, tries = [[b * 20, -40], [0, -40], [-b * 20, -40], [b * 20, -26], [-b * 20, -26], [0, -26], [b * 16, -14], [-b * 16, -14]];
          const ok = tries.find(([ox, oy]) => !boxSolid(P.x + ox - 10, P.y + oy - 18, P.x + ox + 10, P.y + oy - 6)) || [0, -6];
          f.x = P.x + ok[0]; f.y = P.y + ok[1]; puff(f.x, f.y, 4, 30, '#8a4ab4');
        }
      } else if (f.state === 'spin') {                                              // spinning up...
        freeMove(f, 0, Math.sin(f.t * 12) * 10 * dt);
        if (f.t >= 0.6) {                                                           // ...and flinging foil scraps at him in a fan
          const a0 = Math.atan2(P.y - 18 - f.y, dx);
          for (let i = -2; i <= 2; i++) { const a = a0 + i * 0.28; shots.push({ kind: 'shard', col: '#c08ae0', x: f.x, y: f.y - 12, vx: Math.cos(a) * 170, vy: Math.sin(a) * 170, g: 40, from: f, reflected: false, t: 0, draw: sh => spr('wrapper_shard', sh.x, sh.y, sh.vx > 0) }); }
          sfx.paper(); setFoeState(f, 'rise'); f.vx = -Math.sign(dx || 1) * 30;
        }
      } else if (f.state === 'rise') {
        freeMove(f, -Math.sign(f.vx || 1) * 30 * dt, -70 * dt);
        if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.8; }
      }
    },
    draw(f) {
      if (f.state === 'wrap') return;                                              // (drawn over him: drawOnPhill in pond.js)
      const fr = FOE.wrapper.frame(f), sh = f.state === 'aim' || f.state === 'spin' ? Math.round(Math.sin(f.t * 60)) : 0;
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 11, 1);
      spr(fr, f.x + sh, f.y, f.f > 0);
      if (f.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, f.x, f.y, f.f > 0, 0.6); ctx.globalCompositeOperation = 'source-over'; }
    },
    frame: f => 'wrapper_' + ({ walk: 'fly_' + (Math.floor(f.t * 9) % 2 + 1), rise: 'fly_' + (Math.floor(f.t * 12) % 2 + 1), aim: 'fly_2', dive: 'dive', feint: 'dive', spin: 'spin_' + (Math.floor(f.t * (f.t < 0.3 ? 10 : 20)) % 2 + 1), down: 'down', stagger: 'dizzy', hurt: 'fly_1' }[f.state] || 'fly_1') },

  // chewed gum full of Grime: stuck to the ceiling, it stretches down and drops on him, then oozes along after him
  gum: { hp: 2, hw: 11, h: 9, acorns: [1, 2], free: true, walker: true, ownAir: true,
    setup(f) {
      let y = f.y - T;
      while (y > 0 && tile(Math.floor(f.x / T), Math.floor(y / T)) !== 1) y -= T;
      f.ceil = (Math.floor(y / T) + 1) * T; f.floorY = f.y; f.y = f.ceil; f.state = 'ceil'; f.stretch = 0;
    },
    box: f => (f.state === 'ceil' || f.state === 'stretch' ? { l: f.x - 8, r: f.x + 8, t: f.y + f.stretch, b: f.y + f.stretch + 15 } : { l: f.x - 11, r: f.x + 11, t: f.y - 9, b: f.y }),
    harmless: f => f.state === 'climb' || f.state === 'fall',
    update(f, dt) {
      if (f.state === 'down') { if (f.y < f.floorY) fallDown(f, dt); return; }
      if (f.state === 'stagger' && f.t >= f.stagT) { setFoeState(f, f.onGround ? 'walk' : 'ceil'); f.cd = 0.8; }
      if (f.state === 'hurt' && f.t >= 0.25) { setFoeState(f, f.onGround ? 'walk' : 'ceil'); f.cd = 0.5; }
      if (f.state === 'ceil') {
        f.stretch = Math.max(0, f.stretch - 30 * dt);
        if (f.climbed && near(f, 10 * T, 12 * T) && Math.abs(P.x - f.x) > 6) {                // back up from the ground: it creeps along the ceiling to get over him
          const nx = f.x + Math.sign(P.x - f.x) * 36 * dt, c = Math.floor(nx / T), r = Math.floor((f.ceil - 1) / T);
          if (tile(c, r) === 1 && !boxSolid(nx - 8, f.ceil + 1, nx + 8, f.ceil + 14)) { f.x = nx; f.f = Math.sign(P.x - f.x) || f.f; }
        }
        if (f.cd <= 0 && phillAround() && !(P.story && !P.story.free) && Math.abs(P.x - f.x) < 34 && P.y > f.y && P.y - f.y < 260) { setFoeState(f, 'stretch'); sfx.squelch ? sfx.squelch() : sfx.splort(); }
      } else if (f.state === 'stretch') {
        f.stretch = Math.min(18, f.t * 40);
        if (f.t >= 0.45) { setFoeState(f, 'fall'); f.y += f.stretch + 14; f.stretch = 0; f.vy = 60; f.air = true; f.hopVX = 0; f.range = [f.x - 1, f.x + 1]; }
      } else if (f.state === 'fall') {
        strike(f, { l: f.x - 10, r: f.x + 10, t: f.y - 12, b: f.y }, 18);
        if (hopFoe(f, dt)) { f.onGround = true; setFoeState(f, 'splat'); f.range = patrol(f.x, f.y); sfx.splort(); puff(f.x, f.y, 6, 40, '#ec7aac'); }
      } else if (f.state === 'splat') { if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = f.after || 0.3; f.after = 0; } }
      else if (f.state === 'spitwind') {                                                    // rears up... and spits a glob of itself: it sticks to his feet
        if (f.t >= 0.4) {
          const sx = f.x + f.f * 10, sy = f.y - 12, tx = P.x, ty = P.y - 10, time = Math.max(0.4, Math.min(0.8, Math.abs(tx - sx) / 200));
          shots.push({ kind: 'glob', col: '#ec7aac', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 600 * time, g: 600, from: f, reflected: false, t: 0,
            draw: sh => spr('gum_glob', sh.x, sh.y, false), onMeet: out => { if (out === 'hit') { P.slowT = 1.8; P.slowBy = 'gum'; tellOnce('gumFeet', f, 'gum on his feet. mash to shake it', 50); } } });
          sfx.spit(); setFoeState(f, 'splat'); f.t = 0.2; f.after = 1.6 + Math.random() * 0.6;
        }
      } else if (f.state === 'blow') {                                                      // blowing a bubble... it floats off after him and pops on him
        if (f.t >= 0.8) {
          shots.push({ kind: 'bubble', col: '#ffb4d2', life: 5, x: f.x + f.f * 12, y: f.y - 14, vx: f.f * 30, vy: -20, g: 0, from: f, reflected: false, t: 0, r: 7,
            upd: (sh, dt2) => { if (!sh.reflected) { const ddx = P.x - sh.x, ddy = P.y - 22 - sh.y, d = Math.hypot(ddx, ddy) || 1; sh.vx += (ddx / d * 46 - sh.vx) * dt2 * 1.2; sh.vy += (ddy / d * 46 - sh.vy) * dt2 * 1.2 + Math.sin(sh.t * 4) * 20 * dt2; } },
            draw: sh => { const r = 7 + Math.sin(sh.t * 6) * 0.6; ctx.fillStyle = 'rgba(255,160,205,0.45)'; ctx.beginPath(); ctx.arc(sh.x, sh.y, r, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#c44a84'; ctx.lineWidth = 1; ctx.stroke(); ctx.fillStyle = '#fff'; ctx.fillRect(Math.round(sh.x - 3), Math.round(sh.y - 4), 2, 2); } });
          sfx.pop(); setFoeState(f, 'splat'); f.t = 0.1; f.after = 2.2 + Math.random() * 0.6;
        }
      } else if (f.state === 'climb') {                                                     // a strand of itself flicked up to the ceiling, and it hauls itself back up there
        if (f.t >= 0.25) f.y = Math.max(f.ceil, f.y - 260 * dt);
        if (f.y <= f.ceil) { f.y = f.ceil; f.onGround = false; f.stretch = 0; setFoeState(f, 'ceil'); f.climbed = true; f.cd = 0.6; f.range = [2 * T, room.pxW - 2 * T]; }
      }
      else if (f.state === 'walk') {                                                       // oozing after him, off its ledge too
        if (f.air) { if (airStep(f, dt)) f.air = false; return; }
        if (f.cd <= 0 && near(f, 9 * T, 60)) {                                             // its newer tricks (10/16/2026): a sticky glob, a bubble, and (a region out) back up onto the ceiling
          const up = hasMove(f, 4) ? ceilAbove(f.x, f.y) : null;
          const m = choose([[hasMove(f, 2) && Math.abs(P.x - f.x) > 30 ? 1.5 : 0, 'spitwind'], [hasMove(f, 3) && Math.abs(P.x - f.x) > 50 ? 1 : 0, 'blow'], [up !== null && Math.abs(P.x - f.x) > 40 ? 1 : 0, 'climb']]);
          if (m) { f.f = Math.sign(P.x - f.x) || f.f; setFoeState(f, m); if (m === 'climb') { f.ceil = up; f.floorY = f.y; sfx.boing(); } else sfx.squelch ? sfx.squelch() : sfx.splort(); return; }
          f.cd = 0.4;
        }
        if (!chaseWalk(f, dt, 22 + 10 * Math.max(0, Math.sin(f.t * 5)), 4)) {
          f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.f * (22 + 10 * Math.max(0, Math.sin(f.t * 5))) * dt));
          if (f.x <= f.range[0] || f.x >= f.range[1]) f.f = -f.f;
        }
      }
    },
    draw(f) {
      const hang = f.state === 'ceil' || f.state === 'stretch' || ((f.state === 'hurt' || f.state === 'stagger') && !f.onGround);
      if (f.state === 'climb') { ctx.fillStyle = '#ec7aac'; ctx.fillRect(Math.round(f.x) - 1, f.ceil, 2, Math.max(0, Math.round(f.y - f.ceil - 6))); spr('gum_splat', f.x, f.y, f.f > 0); return; }
      if (hang) {
        if (f.stretch > 0) { ctx.fillStyle = '#ec7aac'; ctx.fillRect(Math.round(f.x) - 1, f.y, 2, Math.round(f.stretch) + 2); }
        spr('gum_hang', f.x + (f.state === 'stretch' ? Math.round(Math.sin(f.t * 50)) : 0), f.y + f.stretch, f.f > 0);
      } else {
        const fr = 'gum_' + ({ walk: 'crawl_' + (Math.floor(f.t * 4) % 2 + 1), spitwind: 'spit', blow: 'blow', splat: 'splat', fall: 'splat', down: 'down', stagger: 'dizzy', hurt: 'crawl_1' }[f.state] || 'crawl_1');
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(f.x, f.y, 11, 1);
        spr(fr, f.x, f.y, f.f > 0);
      }
      if (f.flash > 0) { ctx.fillStyle = 'rgba(255,255,255,0.4)'; const b = FOE.gum.box(f); ctx.fillRect(b.l, b.t, b.r - b.l, b.b - b.t); }
    } },

  // a juice box: squeezes itself and squirts a stream of Grime out of its straw (parry the drops right back). Newer
  // (10/16/2026): an arc of it lobbed up over a wall or a ledge onto him, a slurp that sucks him in close for a burst
  // in his face, and (a region out) a hop right on top of him
  juice: { hp: 4, hw: 8, h: 26, acorns: [2, 3],
    harmless: f => f.state === 'leap',
    update(f, dt) {
      baseState(f, dt);
      if (f.air) {
        const was = f.vy;
        if (hopFoe(f, dt)) { f.air = false; if (heard(f)) sfx.land(); if (f.state === 'leap') { puff(f.x, f.y, 6, 40); setFoeState(f, 'hop'); } }
        else if (f.state === 'leap' && was > -80) strike(f, { l: f.x - 9, r: f.x + 9, t: f.y - 26, b: f.y }, 20);
      }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y;
      if (f.state === 'walk') {
        if (f.cd > 0 || f.air) return;
        if (near(f, 50, 40) && !(hasMove(f, 3) && Math.random() < 0.5)) { f.f = Math.sign(dx) || f.f; setFoeState(f, 'hop'); f.air = true; f.vy = -220; f.hopVX = -f.f * 100; sfx.jump(); return; }
        const m = choose([[near(f, 280, 60) && Math.abs(dy) < 40 ? 2 : 0, 'squeeze'], [hasMove(f, 2) && near(f, 260, 150) && (Math.abs(dy) >= 30 || adx > 60) ? (Math.abs(dy) >= 30 ? 3 : 1) : 0, 'lobwind'],
          [hasMove(f, 3) && adx < 110 && Math.abs(dy) < 30 ? 1.5 : 0, 'slurp'], [hasMove(f, 4) && adx > 40 && adx < 150 && Math.abs(dy) < 50 ? 1.2 : 0, 'leapwind']]);
        if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); m === 'slurp' ? sfx.inhale() : sfx.windup(); }
      } else if (f.state === 'hop') { if (!f.air && f.t > 0.3) { setFoeState(f, 'walk'); f.cd = f.after || 0.2; f.after = 0; } }
      else if (f.state === 'squeeze') { if (f.t >= 0.55) { setFoeState(f, 'squirt'); f.shot = 0; } }
      else if (f.state === 'squirt') {
        while (f.shot < 3 && f.t >= f.shot * 0.09) {
          shots.push({ kind: 'blob', x: f.x + f.f * 10, y: f.y - 38, vx: f.f * 250, vy: -40 + f.shot * 15, g: 160, from: f, reflected: false, t: 0 });
          f.shot++; sfx.spit();
        }
        if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 2.2 + Math.random() * 0.6; }
      } else if (f.state === 'lobwind') { if (f.t >= 0.5) { setFoeState(f, 'lob'); f.shot = 0; } }
      else if (f.state === 'lob') {                                                       // three drops up in a high arc, landing round where he is
        while (f.shot < 3 && f.t >= f.shot * 0.12) {
          const sx = f.x + f.f * 6, sy = f.y - 40, tx = P.x + (f.shot - 1) * 18, ty = P.y - 12, time = 0.9 + f.shot * 0.05;
          shots.push({ kind: 'blob', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 600 * time, g: 600, from: f, reflected: false, t: 0 });
          f.shot++; sfx.spit();
        }
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 2.0 + Math.random() * 0.6; }
      } else if (f.state === 'slurp') {                                                   // sucking hard through its straw: it pulls him in...
        if (Math.random() < dt * 20) part(f.x + f.f * (30 + Math.random() * 40), f.y - 30 + Math.random() * 20, -f.f * 90, 0, 0.3, '#c8e6d2', 1, 0);
        if (Math.abs(dy) < 40 && adx < 140) pullHim(f.x + f.f * 22, 70, dt);
        if (f.t >= 0.9) { setFoeState(f, 'burst'); sfx.splort(); sfx.spit(); }
      } else if (f.state === 'burst') {                                                   // ...and lets it all out at once, right in his face
        if (Math.random() < dt * 50) part(f.x + f.f * (10 + Math.random() * 30), f.y - 34 + Math.random() * 12, f.f * 120, (Math.random() - 0.5) * 60, 0.3, Math.random() < 0.5 ? '#2c1c3c' : '#4a3462', 2, 100);
        strike(f, { l: Math.min(f.x + f.f * 6, f.x + f.f * 42), r: Math.max(f.x + f.f * 6, f.x + f.f * 42), t: f.y - 44, b: f.y - 16, area: true }, 28);   // (area: the spray's the bits flying out, not part of its picture)
        if (f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.8 + Math.random() * 0.6; }
      } else if (f.state === 'leapwind') {                                                // crouches down on its feet...
        if (f.t >= 0.35) { setFoeState(f, 'leap'); f.air = true; f.vy = -330; f.hopVX = Math.max(-200, Math.min(200, (P.x - f.x) / (2 * 330 / 700))); sfx.jump(); f.after = 1.4; }
      }
    },
    frame: f => 'juice_' + ({ walk: 'idle_' + (Math.floor(f.t * 2.5) % 2 + 1), squeeze: 'squeeze', squirt: 'squirt', lobwind: 'lobwind', lob: 'lob', slurp: 'slurp', burst: 'squirt', leapwind: 'leapwind', leap: 'hop', hop: 'hop', down: 'down', stagger: 'dizzy', hurt: 'idle_1' }[f.state] || 'idle_1') },

  // a plastic fork on its tines, handle up behind it like a tail: it swings the handle over to stab, and the swing
  // goes over its head first, so jumping over it doesn't help. Newer (10/16/2026): a low sweep of the handle along the
  // ground (jump it), a long lunge with the handle out like a lance, and (a region out) a vault right over him on its
  // handle to stab him in the back
  fork: { hp: 5, hw: 9, h: 28, acorns: [2, 3], walker: true,
    harmless: f => f.state === 'vault' || f.state === 'lunge',
    update(f, dt) {
      baseState(f, dt);
      if (f.yoff < 0 && f.state !== 'vault') hopArc(f, dt);
      const dx = P.x - f.x, adx = Math.abs(dx);
      if (f.state === 'walk') {
        if (!chaseWalk(f, dt, 40, 24)) {                                               // (right up to him: its tines and handle only reach about 25 px, now its hits are where it's drawn, 10/16/2026)
          f.x += f.f * 32 * dt;
          if (f.x <= f.range[0]) { f.x = f.range[0]; f.f = 1; } else if (f.x >= f.range[1]) { f.x = f.range[1]; f.f = -1; }
        }
        if (f.cd <= 0 && near(f, 9 * T, 110)) {
          const level = Math.abs(P.y - f.y) < 30;
          // each one only from where its drawing really reaches him (its hits are where it's drawn now, 10/16/2026): the stab
          // reaches 23 px, the sweep 28, the lunge about 78 with its push forward (his body's 8 either side of him)
          const m = choose([[adx < 30 ? 2 : 0, 'wind'], [hasMove(f, 2) && adx < 34 && level ? 1.4 : 0, 'sweepwind'], [hasMove(f, 3) && adx > 40 && adx < 80 && level ? 1.4 : 0, 'lungewind'],
            [hasMove(f, 4) && adx > 20 && adx < 90 && level ? 1 : 0, 'vaultwind']]);   // the stab from where it reaches (was 120)
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); sfx.windup(); }
        }
      } else if (f.state === 'wind') { if (f.t >= 0.5) { setFoeState(f, 'stab'); sfx.whoosh(); } }
      else if (f.state === 'stab') {
        if (f.t < 0.25) {
          const over = { l: f.x - 14, r: f.x + 14, t: f.y - 70, b: f.y - 24 }, front = { l: Math.min(f.x, f.x + f.f * 46), r: Math.max(f.x, f.x + f.f * 46), t: f.y - 34, b: f.y - 6 };
          strike(f, f.t < 0.1 ? over : front, 20);
        }
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.3 + Math.random() * 0.6; }
      } else if (f.state === 'sweepwind') { if (f.t >= 0.4) { setFoeState(f, 'sweep'); sfx.swish(); } }
      else if (f.state === 'sweep') {                                                     // the handle swung round low along the ground: jump it
        if (f.t < 0.2) strike(f, { l: Math.min(f.x, f.x + f.f * 54), r: Math.max(f.x, f.x + f.f * 54), t: f.y - 12, b: f.y + 2 }, 18);
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.6; }
      } else if (f.state === 'lungewind') { if (f.t >= 0.45) { setFoeState(f, 'lunge'); sfx.whoosh(); } }
      else if (f.state === 'lunge') {                                                     // legs pushing off, handle out in front like a lance
        f.x = Math.max(f.range[0], Math.min(f.range[1], f.x + f.f * 260 * (1 - f.t / 0.4) * dt));
        if (f.t < 0.32) strike(f, { l: Math.min(f.x, f.x + f.f * 32), r: Math.max(f.x, f.x + f.f * 32), t: f.y - 22, b: f.y - 8 }, 20);
        if (f.t >= 0.55) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.6; }
      } else if (f.state === 'vaultwind') { if (f.t >= 0.35) { setFoeState(f, 'vault'); f.vy = -340; f.hopVX = hopTo(f, P.x + f.f * 18, -340); f.yoff = -0.01; sfx.boing(); } }
      else if (f.state === 'vault') {                                                     // up and over on its handle... (landing just behind him, close enough for the stab to reach: it was 34 px, past its tines)
        if (hopArc(f, dt)) { f.f = -f.f; setFoeState(f, 'backwind'); puff(f.x, f.y, 4, 30); if (heard(f)) sfx.land(); }
      } else if (f.state === 'backwind') { f.f = Math.sign(P.x - f.x) || f.f; if (f.t >= 0.2) { setFoeState(f, 'stab'); sfx.whoosh(); } }   // ...and round for a stab in his back
    },
    frame: f => 'fork_' + ({ walk: 'walk_' + (Math.floor(f.t * 6) % 2 + 1), wind: 'wind', stab: 'stab', sweepwind: 'sweepwind', sweep: 'sweep', lungewind: 'lungewind', lunge: 'lunge', vaultwind: 'vaultwind', vault: 'vault', backwind: 'wind', down: 'down', stagger: 'dizzy', hurt: 'walk_1' }[f.state] || 'walk_1') },

  // six-pack rings curled into a hoop, rolling back and forth. The sword glances off while it rolls (bounce on it
  // from above, though). Rolling into a wall or off the end of its ground tips it over flat for a moment: hit it then.
  // Only in the Old Oak, so it has all four (10/16/2026): the roll, a hop onto him, a loop flung out on a strand that
  // snags him and reels him in (mash free), and a loop thrown like a frisbee that comes back
  rings: { hp: 5, hw: 13, h: 28, acorns: [2, 3],
    deflectText: 'it just rolls on. wait till it tips over',
    deflect: (f, a) => (f.state === 'walk' || f.state === 'wake') && a.type !== 'down',
    noHurt: true, harmless: f => ['flat', 'hop', 'snag', 'reel', 'snagwind', 'throwwind', 'wait'].includes(f.state),
    update(f, dt) {
      baseState(f, dt);
      if (f.yoff < 0 && f.state !== 'hop') hopArc(f, dt);
      const dx = P.x - f.x, adx = Math.abs(dx), level = Math.abs(P.y - f.y) < 36, facing = Math.sign(dx) === f.f;
      if (f.state === 'walk') {
        const fast = near(f, 200, 40) && facing;
        f.x += f.f * (fast ? 170 : 100) * dt; f.spin = (f.spin || 0) + f.f * dt * 8;
        if (f.x <= f.range[0] || f.x >= f.range[1]) {
          f.x = Math.max(f.range[0], Math.min(f.range[1], f.x)); setFoeState(f, 'flat'); if (heard(f)) sfx.clunk ? sfx.clunk() : sfx.land(); puff(f.x, f.y, 6, 40);
        } else if (f.cd <= 0 && level && facing && phillAround() && !(P.story && !P.story.free)) {
          const m = choose([[hasMove(f, 2) && adx > 40 && adx < 120 ? 1 : 0, 'hop'], [hasMove(f, 3) && adx > 34 && adx < 64 ? 1.5 : 0, 'snagwind'], [hasMove(f, 4) && adx > 90 && adx < 220 ? 1 : 0, 'throwwind']]);
          if (m === 'hop') { setFoeState(f, 'hop'); f.vy = -320; f.hopVX = hopTo(f, P.x, -320); f.yoff = -0.01; sfx.boing(); }
          else if (m) { setFoeState(f, m); sfx.twang(); }
        }
      } else if (f.state === 'flat') { if (f.t >= 1.4) { setFoeState(f, 'wake'); } }
      else if (f.state === 'wake') { if (f.t >= 0.3) { f.f = -f.f; setFoeState(f, 'walk'); f.cd = Math.max(f.cd, 0.3); } }
      else if (f.state === 'hop') {                                                       // bounding up and coming down on him
        f.spin = (f.spin || 0) + f.f * dt * 10;
        const landed = hopArc(f, dt, 900);
        if (f.vy > -80) strike(f, { l: f.x - 12, r: f.x + 12, t: f.y + f.yoff - 26, b: f.y + f.yoff }, 20);
        if (landed) { puff(f.x, f.y, 6, 40); if (heard(f)) sfx.land(); setFoeState(f, 'flat'); f.t = 0.5; f.cd = 1.6; }
      } else if (f.state === 'snagwind') { if (f.t >= 0.35) { setFoeState(f, 'snag'); sfx.whip(); } }
      else if (f.state === 'snag') {                                                      // one loop flung out on a strand...
        const out = f.t < 0.2 ? strike(f, { l: Math.min(f.x + f.f * 14, f.x + f.f * 66), r: Math.max(f.x + f.f * 14, f.x + f.f * 66), t: f.y - 30, b: f.y - 4 }, 18) : null;
        if (out === 'hit' && P.health > 0) { pinHim(f, 6); setFoeState(f, 'reel'); tellOnce('ringsSnag', f, 'mash to wriggle free', 56); return; }
        if (f.t >= 0.45) { setFoeState(f, 'flat'); f.t = 0.6; f.cd = 1.4; }
      } else if (f.state === 'reel') {                                                    // ...that's caught him: it reels him in and squeezes
        if (!pinnedBy(f)) { setFoeState(f, 'flat'); f.t = 0.2; f.cd = 1.6; return; }   // wriggled out: it flops over, tangled
        P.pinned.x += Math.sign(f.x + f.f * 20 - P.pinned.x) * Math.min(Math.abs(f.x + f.f * 20 - P.pinned.x), 40 * dt);
        if (!solidPx(P.pinned.x, P.pinned.y - 20)) P.x = P.pinned.x; else P.pinned.x = P.x;
        if (f.t >= 1.6) { P.pinned = null; hurt(f.x, 'rings', 1); setFoeState(f, 'flat'); f.t = 0.4; f.cd = 1.6; }
      } else if (f.state === 'throwwind') { if (f.t >= 0.3) {                             // a loop thrown like a frisbee: out, and back
        setFoeState(f, 'wait'); const dir = f.f;
        shots.push({ kind: 'loop', col: '#c8d6ae', x: f.x + dir * 10, y: f.y - 20, vx: dir * 260, vy: 0, g: 0, from: f, reflected: false, t: 0, life: 2.4,
          upd: (sh, dt2) => { if (!sh.reflected) { sh.vx -= dir * 300 * dt2; sh.vy = (f.y - 20 - sh.y) * 2; } },
          done: sh => sh.t > 0.6 && Math.abs(sh.x - f.x) < 12 && Math.sign(sh.vx) === -dir,
          draw: sh => spr('rings_loop_' + (Math.floor(sh.t * 12) % 2 + 1), sh.x, sh.y, false) });
        sfx.whoosh();
      } }
      else if (f.state === 'wait') { if (f.t >= 1.7 || !shots.some(sh => sh.from === f && sh.kind === 'loop')) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.6; } }
    },
    box: f => (f.state === 'flat' || f.state === 'down' ? { l: f.x - 14, r: f.x + 14, t: f.y - 8, b: f.y } : { l: f.x - 13, r: f.x + 13, t: f.y - 28 + f.yoff, b: f.y + f.yoff }),
    frame: f => 'rings_' + ({ walk: 'roll_' + (Math.floor(Math.abs(f.spin || 0)) % 2 + 1), hop: 'roll_' + (Math.floor(Math.abs(f.spin || 0)) % 2 + 1), flat: 'flat', wake: 'wake', snagwind: 'wake', snag: 'snag', reel: 'snag', throwwind: 'wake', wait: 'wake', down: 'down', stagger: 'flat', hurt: 'flat' }[f.state] || 'roll_1') },
});
