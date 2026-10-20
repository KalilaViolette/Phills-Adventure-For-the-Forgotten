'use strict';
// ---------- the Greenhouse's litter: the Grime got into the gardening things (10/18/2026) ----------
// A seed packet, a plastic plant pot, a plant label, a twist tie, a gardening glove and a sprinkler head. Region level 2,
// so each has five attacks (the first always, the rest by hasMove), every one with its own wind up. Each has one the
// shield doesn't answer (HEAVY: the red !!). Helpers (near, strike, baseState, heard, hopFoe) are in pond.js, freeMove in
// rootwood.js, drawFoe2 and tellOnce in rootwood_foes2.js, chaseWalk, groundStep, airStep, pinHim in foes.js.

(() => {
// ---- shots they share
const drawSeed = s => { const x = Math.round(s.x), y = Math.round(s.y); ctx.fillStyle = '#2a2420'; ctx.fillRect(x - 2, y - 1, 4, 3); ctx.fillStyle = '#e6dcc4'; ctx.fillRect(x - 1, y - 1, 2, 1); };
const drawClod = s => { ctx.fillStyle = '#1e140c'; ellipse(s.x, s.y, 4, 3); ctx.fillStyle = '#4a3626'; ellipse(s.x - 1, s.y - 1, 2, 1.5); };
const drawDrop = s => { ctx.fillStyle = 'rgba(40,24,60,0.9)'; ellipse(s.x, s.y, 2.5, 2.5); ctx.fillStyle = '#8a5ac0'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 1, 1, 1); };
function shot(f, kind, x, y, vx, vy, g, draw, extra) { shots.push(Object.assign({ kind, col: kind === 'clod' ? '#4a3626' : kind === 'drop' ? '#6a4a8a' : '#d8ccb0', x, y, vx, vy, g, from: f, reflected: false, t: 0, life: 2.6, draw }, extra || {})); }
// a ripple along the ground both ways from x (jump it). Stops at walls and drops
function groundWave(f, x, y, sp = 170, col = '#8a5ac0') {
  for (const d of [-1, 1]) shot(f, 'wave', x + d * 8, y - 4, d * sp, 0, 0, s => { ctx.fillStyle = col; const k = Math.sin(s.t * 30) > 0 ? 1 : 0; ctx.fillRect(Math.round(s.x) - 3, Math.round(s.y) - 2 - k, 6, 3 + k); ctx.fillStyle = '#d8f0ff'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 3 - k, 2, 1); },
    { life: 1.1, upd: s => { if (!solidPx(s.x + Math.sign(s.vx) * 6, s.y + 6)) s.dead = true; } });
}
const shake = f => Math.round(Math.sin(f.t * 60));
const shadow = (f, w) => { ctx.fillStyle = 'rgba(0,0,0,0.22)'; ellipse(f.x, f.y, w, 1); };
// a little hop drawn as yoff, landing back where it started its walk (the cap's pounce)
function hopStart(f, tx, vy0 = -300) { f.vy = vy0; f.yoff = -0.01; f.hopVX = Math.max(-160, Math.min(160, hopTo(f, tx, vy0))); }
// the walk every ground one shares: after him along the ground (up steps, off ledges), back and forth when he's not about
function walkAbout(f, dt, sp, keep) {
  if (chaseWalk(f, dt, sp, keep)) return;
  const res = groundStep(f, f.f, sp * 0.45, dt);
  if (res !== 'ok' || f.x <= f.range[0] || f.x >= f.range[1]) f.f = -f.f;
}

for (const k of ['packet', 'pot', 'label', 'tie', 'gglove', 'sprinkler']) ART_HITS.add(k);   // their hits land where they're drawn, like everyone else's
Object.assign(COMMIT, {
  packet: { tear: 0, spray: 0, scatterwind: 0, scatter: 0, rise: 0, glide: 0, burstwind: 0, burst: 0, hopwind: 0, hop: 0 },
  pot: { rollwind: 0, roll: 0, crouch: 0, flip: 0, slam: 0, stack: 0, topple: 0, spinwind: 0, spin: 0, spitwind: 0 },
  label: { bump: 0, stab: 0, lean: 0, lunge: 0, aim: 0, dart: 0, triple: 0, spinwind: 0, spin: 0 },
  tie: { coil: 0, whip: 0, grabwind: 0, grab: 0, springwind: 0, spring: 0, flat: 0, snap: 0, twirlwind: 0, twirl: 0 },
  gglove: { raise: 0, slap: 0, lungewind: 0, lunge: 0, crouch: 0, leap: 0, flickwind: 0, drumwind: 0, drum: 0 },
  sprinkler: { ringwind: 0, aim: 0, jet: 0, arcwind: 0, popwind: 0, pop: 0, whirlwind: 0, whirl: 0 },
});
Object.assign(HEAVY, {
  packet: ['burstwind', 'burst'], pot: ['crouch', 'flip', 'slam'], label: ['bump', 'stab'], tie: ['grabwind', 'grab'], gglove: ['lungewind', 'lunge'], sprinkler: ['popwind', 'pop'],
});

Object.assign(FOE, {
  // ---- the seed packet: walks on its corners. Hops at him; tears its top open and sprays seeds at him; throws a
  // handful high so they rain down; lifts off and sails at him like a card; and (the heavy one) rips right open and
  // bursts seeds out low along the floor both ways (jump them)
  packet: { hp: 3, hw: 9, h: 22, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 0.8 + Math.random() * 0.6; },
    box: f => (f.state === 'glide' ? { l: f.x - 13, r: f.x + 13, t: f.y - 18 + f.yoff, b: f.y - 8 + f.yoff } : { l: f.x - 9, r: f.x + 9, t: f.y - 22 + f.yoff, b: f.y + f.yoff }),
    harmless: f => !['walk', 'hop'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 260, 90);
      if (f.state === 'walk') {
        walkAbout(f, dt, 42, 50);
        if (on && f.cd <= 0 && Math.abs(dy) < 40) {
          const m = choose([[adx < 80 ? 1.4 : 0, 'hopwind'], [hasMove(f, 2) && adx > 50 && adx < 200 ? 1.3 : 0, 'tear'], [hasMove(f, 3) && adx > 60 && adx < 220 ? 1 : 0, 'scatterwind'],
            [hasMove(f, 4) && adx > 70 && adx < 200 ? 1 : 0, 'rise'], [hasMove(f, 5) && adx < 120 ? 0.9 : 0, 'burstwind']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); if (heard(f)) sfx.paper(); } else f.cd = 0.4;
        }
      } else if (f.state === 'hopwind') { if (f.t >= 0.3) { setFoeState(f, 'hop'); hopStart(f, P.x, -260); if (heard(f)) sfx.jump(); } }
      else if (f.state === 'hop') {
        strike(f, { l: f.x - 9, r: f.x + 9, t: f.y - 22 + f.yoff, b: f.y + f.yoff }, 16);
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.1 + Math.random() * 0.5; puff(f.x, f.y, 3, 20); }
      } else if (f.state === 'tear') {                                                       // its top torn open, leaning back...
        if (f.t >= 0.45) {                                                                   // ...and a fan of seeds at him
          setFoeState(f, 'spray'); if (heard(f)) sfx.splort();
          const a0 = Math.atan2(P.y - 18 - (f.y - 22), dx);
          for (let i = -1; i <= 1; i++) { const a = a0 + i * 0.22; shot(f, 'seed', f.x + f.f * 6, f.y - 22, Math.cos(a) * 200, Math.sin(a) * 200 - 40, 260, drawSeed); }
        }
      } else if (f.state === 'spray' && f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.6; }
      else if (f.state === 'scatterwind') {                                                 // shaking itself...
        if (f.t >= 0.5) {                                                                     // ...seeds thrown high, raining down round him
          setFoeState(f, 'scatter'); if (heard(f)) sfx.paper();
          for (let i = 0; i < 4; i++) { const tx = P.x + (i - 1.5) * 26, tt = 1.0; shot(f, 'seed', f.x, f.y - 22, (tx - f.x) / tt, -330, 600, drawSeed, { life: 2.4 }); }
        }
      } else if (f.state === 'scatter' && f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.5 + Math.random() * 0.6; }
      else if (f.state === 'rise') {                                                        // up off the ground, flattening out...
        f.yoff = -f.t * 50;
        if (f.t >= 0.4) { setFoeState(f, 'glide'); f.yoff = -20; f.gvx = f.f * 170; if (heard(f)) sfx.whoosh(); }
      } else if (f.state === 'glide') {                                                     // ...and sails at him, coming down as it goes
        f.yoff = Math.min(0, -20 + f.t * 28);
        const nx = f.x + f.gvx * dt; if (nx > f.range[0] - 30 && nx < f.range[1] + 30 && !boxSolid(nx - 10, f.y - 20 + f.yoff, nx + 10, f.y - 10 + f.yoff)) f.x = nx; else f.gvx = 0;
        strike(f, { l: f.x - 13, r: f.x + 13, t: f.y - 18 + f.yoff, b: f.y - 6 + f.yoff }, 16);
        if (f.t >= 0.75 || f.yoff >= 0) { f.yoff = 0; setFoeState(f, 'walk'); f.cd = 1.4; f.rt = 0; }
      } else if (f.state === 'burstwind') { if (f.t >= 0.6) { setFoeState(f, 'burst'); if (heard(f)) sfx.splort(); groundWave(f, f.x, f.y, 180, '#d8ccb0'); for (let i = 0; i < 5; i++) { const a = -Math.PI + (i + 0.5) * Math.PI / 5; shot(f, 'seed', f.x, f.y - 20, Math.cos(a) * 150, Math.sin(a) * 150, 420, drawSeed); } } }
      else if (f.state === 'burst' && f.t >= 0.6) { setFoeState(f, 'walk'); f.cd = 1.8 + Math.random() * 0.6; }
    },
    frame: f => 'packet_' + (f.air ? 'walk_1' : ({ walk: 'walk_' + (Math.floor(f.t * 6) % 2 + 1), hopwind: 'tear', hop: 'walk_2', tear: 'tear', spray: 'spray', scatterwind: 'tear', scatter: 'scatter', rise: 'rise', glide: 'glide', burstwind: 'tear', burst: 'burst', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'walk_1' }[f.state] || 'walk_1')),
    draw(f) { shadow(f, 10); drawFoe2(f, FOE.packet.frame(f), f.x, f.y + f.yoff, ['tear', 'scatterwind', 'burstwind', 'hopwind'].includes(f.state) ? shake(f) : 0); } },

  // ---- the plant pot: hops along after him. Tips over and rolls at him; jumps up, flips and slams down over him upside
  // down (the heavy one); stacks up tall on a pot of Grime and topples over onto him; spins on its rim at him; and
  // tips back and lobs a clod of soil
  pot: { hp: 5, hw: 10, h: 18, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 1 + Math.random() * 0.6; },
    box: f => {
      if (f.state === 'roll') return { l: f.x - 13, r: f.x + 13, t: f.y - 18, b: f.y };
      if (f.state === 'stack') return { l: f.x - 10, r: f.x + 10, t: f.y - 32, b: f.y };
      if (f.state === 'topple') return { l: Math.min(f.x, f.x + f.f * 34), r: Math.max(f.x, f.x + f.f * 34), t: f.y - 18, b: f.y };
      return { l: f.x - 10, r: f.x + 10, t: f.y - 18 + f.yoff, b: f.y + f.yoff };
    },
    harmless: f => !['walk', 'roll', 'spin'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 280, 90);
      if (f.state === 'walk') {
        walkAbout(f, dt, 38, 40);
        if (on && f.cd <= 0 && Math.abs(dy) < 40) {
          const m = choose([[adx > 50 && adx < 220 ? 1.4 : 0, 'rollwind'], [hasMove(f, 2) && adx < 110 ? 1.2 : 0, 'crouch'], [hasMove(f, 3) && adx < 60 ? 1.2 : 0, 'stack'],
            [hasMove(f, 4) && adx < 140 ? 1 : 0, 'spinwind'], [hasMove(f, 5) && adx > 70 && adx < 240 ? 1 : 0, 'spitwind']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); if (heard(f)) sfx.bump(); } else f.cd = 0.4;
        }
      } else if (f.state === 'rollwind') { if (f.t >= 0.4) { setFoeState(f, 'roll'); if (heard(f)) sfx.whoosh(); } }
      else if (f.state === 'roll') {                                                         // over on its side, rolling at him
        const res = groundStep(f, f.f, 190, dt);
        strike(f, { l: f.x - 13, r: f.x + 13, t: f.y - 18, b: f.y }, 18);
        if (res !== 'ok' || f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; if (res === 'wall' && heard(f)) sfx.thud(); }
      } else if (f.state === 'crouch') { if (f.t >= 0.45) { setFoeState(f, 'flip'); hopStart(f, P.x, -380); if (heard(f)) sfx.boing(); } }   // squashed down... (the red !!)
      else if (f.state === 'flip') {                                                         // ...up, over...
        if (hopArc(f, dt)) {                                                                  // ...and down upside down over him
          setFoeState(f, 'slam'); shakeT = 0.12; shakeA = 2; if (heard(f)) sfx.thud(); puff(f.x, f.y, 8, 50);
          strike(f, { l: f.x - 16, r: f.x + 16, t: f.y - 22, b: f.y + 2 }, 24);
        }
      } else if (f.state === 'slam' && f.t >= 0.7) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.5; }
      else if (f.state === 'stack') {                                                        // a second pot of Grime wells up under it, tall, swaying...
        if (f.t >= 0.6) { setFoeState(f, 'topple'); if (heard(f)) sfx.whoosh(); }
      } else if (f.state === 'topple') {                                                     // ...and it topples over onto him
        if (f.t < 0.25) strike(f, { l: Math.min(f.x, f.x + f.f * 44), r: Math.max(f.x, f.x + f.f * 44), t: f.y - 30 + f.t * 60, b: f.y }, 20);
        if (f.t >= 0.25 && !f.landed) { f.landed = true; puff(f.x + f.f * 30, f.y, 6, 40); if (heard(f)) sfx.thud(); }
        if (f.t >= 0.8) { f.landed = false; setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'spinwind') { if (f.t >= 0.35) { setFoeState(f, 'spin'); if (heard(f)) sfx.whirl && sfx.whirl(); } }
      else if (f.state === 'spin') {                                                         // spinning on its rim, skating at him
        groundStep(f, Math.sign(dx) || f.f, 70, dt);
        if (Math.floor(f.t * 6) !== Math.floor((f.t - dt) * 6)) f.hitP = false;               // (catches him again every so often)
        strike(f, { l: f.x - 13, r: f.x + 13, t: f.y - 18, b: f.y }, 14);
        if (f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.5; }
      } else if (f.state === 'spitwind') {                                                   // tipped back...
        if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.6 + Math.random() * 0.5; const tt = 0.8; shot(f, 'clod', f.x + f.f * 6, f.y - 18, (P.x - f.x) / tt, -300, 680, drawClod, { life: 2 }); if (heard(f)) sfx.splort(); }   // ...a clod of soil lobbed at him
      }
    },
    frame: f => 'pot_' + (f.air ? 'hop' : ({ walk: Math.floor(f.t * 4) % 2 ? 'hop' : 'idle', rollwind: 'crouch', roll: 'roll_' + (Math.floor(f.t * 10) % 2 + 1), crouch: 'crouch', flip: 'flip', slam: 'slam', stack: 'stack', topple: 'topple', spinwind: 'crouch', spin: 'spin', spitwind: 'spit', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'idle' }[f.state] || 'idle')),
    draw(f) {
      shadow(f, 11);
      if (f.state === 'spin') { ctx.save(); ctx.translate(Math.round(f.x), Math.round(f.y)); ctx.scale(Math.cos(f.t * 22) > 0 ? 1 : -1, 1); spr('pot_spin', 0, 0, false); ctx.restore(); return; }
      drawFoe2(f, FOE.pot.frame(f), f.x, f.y + f.yoff, ['rollwind', 'crouch', 'stack', 'spinwind'].includes(f.state) ? shake(f) : 0);
    } },

  // ---- the plant label: lives down in the soil, only its tip showing, following him along under the floor. Stabs up
  // out of the ground under him (the heavy one: the ground cracks first); hops out at him; flicks itself at him like a
  // dart and sticks in the floor; stabs three times along the floor toward him; and whirls like a windmill
  label: { hp: 3, hw: 6, h: 28, acorns: [1, 2],
    setup(f) { f.state = 'hidden'; f.cd = 1 + Math.random(); f.out = 0; },
    box: f => {
      if (f.state === 'dart') return { l: f.x - 16, r: f.x + 16, t: f.y - 10, b: f.y };
      if (f.state === 'spin') return { l: f.x - 18, r: f.x + 18, t: f.y - 30, b: f.y };
      if (f.state === 'stuck') return { l: f.x - 10, r: f.x + 10, t: f.y - 22, b: f.y };
      return { l: f.x - 6, r: f.x + 6, t: f.y - 28 + f.yoff, b: f.y + f.yoff };
    },
    harmless: f => f.state !== 'stand',
    keepState: f => f.state === 'stuck',
    update(f, dt) {
      if (f.state === 'down') return;
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') return;
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 300, 70);
      if (f.state === 'hidden' || f.state === 'walk') {                                      // under the floor, following him along
        if (f.state === 'walk') { setFoeState(f, 'hidden'); return; }
        if (on) { const res = groundStep(f, Math.sign(dx) || f.f, 60, dt); f.f = Math.sign(dx) || f.f; }
        if (on && f.cd <= 0 && Math.abs(dy) < 30) {
          const m = choose([[adx < 30 ? 2 : 0, 'bump'], [hasMove(f, 4) && adx > 40 && adx < 150 ? 1 : 0, 'triple'], [adx >= 30 && adx < 160 ? (adx > 70 ? 1.4 : 0.8) : 0, 'rise']]);
          if (m === 'rise') { setFoeState(f, 'rise'); puff(f.x, f.y, 4, 20); if (heard(f)) sfx.dig ? sfx.dig() : sfx.thud(); }
          else if (m === 'bump') { setFoeState(f, 'bump'); f.tx = P.x; if (heard(f)) sfx.dig ? sfx.dig() : sfx.thud(); }
          else if (m === 'triple') { setFoeState(f, 'triple'); f.n = 0; f.tx = f.x; }
          else f.cd = 0.3;
        }
      } else if (f.state === 'bump') {                                                       // the ground cracking under him (the red !!)
        if (f.tx == null) f.tx = P.x;
        f.x += Math.sign(f.tx - f.x) * Math.min(Math.abs(f.tx - f.x), 80 * dt);
        if (Math.random() < dt * 30) part(f.x + (Math.random() * 2 - 1) * 6, f.y - 1, 0, -30, 0.3, '#4a3626', 1, 300);
        if (f.t >= 0.55) { setFoeState(f, 'stab'); if (heard(f)) sfx.snap ? sfx.snap() : sfx.whip(); puff(f.x, f.y, 6, 40); }
      } else if (f.state === 'stab') {                                                       // up out of the ground, point first
        f.yoff = 0;
        strike(f, { l: f.x - 7, r: f.x + 7, t: f.y - 34, b: f.y + 2 }, 22);
        if (f.t >= 0.25) { f.yoff = 0; setFoeState(f, 'stand'); }
      } else if (f.state === 'rise') { if (f.t >= 0.35) setFoeState(f, 'stand'); }
      else if (f.state === 'stand') {                                                        // standing up out of the soil: its moment to be hit, and it's thinking
        f.f = Math.sign(dx) || f.f;
        if (f.t >= 0.5 && on && Math.abs(dy) < 40) {
          const m = choose([[hasMove(f, 2) && adx < 90 ? 1.2 : 0, 'lean'], [hasMove(f, 3) && adx > 50 && adx < 220 ? (adx > 80 ? 1.6 : 1.1) : 0, 'aim'], [hasMove(f, 5) && adx < 50 ? 1 : 0, 'spinwind'], [0.9, 'sink']]);
          if (m === 'sink') { setFoeState(f, 'hidden'); f.cd = 0.9 + Math.random() * 0.6; puff(f.x, f.y, 3, 20); }
          else { setFoeState(f, m); if (heard(f)) sfx.hiss(); }
        } else if (f.t >= 1.6) { setFoeState(f, 'hidden'); f.cd = 1; }
      } else if (f.state === 'lean') { if (f.t >= 0.35) { setFoeState(f, 'lunge'); hopStart(f, P.x, -200); if (heard(f)) sfx.whoosh(); } }
      else if (f.state === 'lunge') {
        strike(f, { l: f.x - 9, r: f.x + 9, t: f.y - 26 + f.yoff, b: f.y + f.yoff }, 16);
        if (hopArc(f, dt)) setFoeState(f, 'stand');
      } else if (f.state === 'aim') { if (f.t >= 0.45) { setFoeState(f, 'dart'); f.gvx = f.f * 260; if (heard(f)) sfx.whip(); } }
      else if (f.state === 'dart') {                                                         // flung along low like a dart...
        const nx = f.x + f.gvx * dt, gy = groundFoot(nx, f.y);
        if (gy !== null && Math.abs(gy - f.y) < 10 && !boxSolid(nx - 4, f.y - 12, nx + 4, f.y - 4) && nx > 2 * T && nx < room.pxW - 2 * T) { f.x = nx; f.y = gy; } else f.t = 99;
        strike(f, { l: f.x - 16, r: f.x + 16, t: f.y - 12, b: f.y }, 18);
        if (f.t >= 0.45) { setFoeState(f, 'stuck'); puff(f.x, f.y, 4, 30); if (heard(f)) sfx.thud(); }   // ...and stuck in the floor
      } else if (f.state === 'stuck') { if (f.t >= 1.1) { setFoeState(f, 'hidden'); f.cd = 0.8; } }
      else if (f.state === 'triple') {                                                       // three stabs up along the floor toward him
        if (f.n == null) { f.n = 0; f.tx = f.x; }
        const k = Math.floor(f.t / 0.32);
        if (k > f.n && f.n < 3) {
          f.n = k; f.tx += Math.sign(dx || f.f) * 26;
          const x = f.tx; puff(x, f.y, 4, 30); if (heard(f)) sfx.snap ? sfx.snap() : sfx.whip();
          shot(f, 'stake', x, f.y - 12, 0, 0, 0, s => { const h = Math.min(1, s.t / 0.08) * 22 * (s.t < 0.25 ? 1 : Math.max(0, 1 - (s.t - 0.25) / 0.15)); ctx.fillStyle = '#4a4e4e'; ctx.fillRect(Math.round(s.x) - 3, Math.round(f.y - h), 6, Math.round(h)); ctx.fillStyle = '#e6eae6'; ctx.fillRect(Math.round(s.x) - 2, Math.round(f.y - h), 4, Math.round(h)); },
            { life: 0.4, noHit: true, upd: (s) => { if (s.t < 0.25 && !s.hit && phillAround() && overlap({ l: s.x - 5, r: s.x + 5, t: f.y - 24, b: f.y }, { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y })) { s.hit = true; foeStrike(s.x, 'label', { cost: 18 }); } } });
        }
        if (f.t >= 1.2) { setFoeState(f, 'hidden'); f.cd = 1.4; }
      } else if (f.state === 'spinwind') { if (f.t >= 0.4) { setFoeState(f, 'spin'); if (heard(f)) sfx.whirl && sfx.whirl(); } }
      else if (f.state === 'spin') {                                                         // whirling like a windmill
        if (Math.floor(f.t * 5) !== Math.floor((f.t - dt) * 5)) f.hitP = false;
        strike(f, { l: f.x - 20, r: f.x + 20, t: f.y - 32, b: f.y }, 16);
        if (f.t >= 0.9) setFoeState(f, 'stand');
      }
    },
    frame: f => 'label_' + ({ hidden: 'under', bump: 'under', triple: 'under', stab: 'stab', rise: 'rise', stand: 'stand', lean: 'lean', lunge: 'lunge', aim: 'lean', dart: 'dart', stuck: 'stuck', spinwind: 'lean', spin: 'spin_' + (Math.floor(f.t * 12) % 2 + 1), down: 'down', stagger: 'dizzy', asleep: 'under', hurt: 'stand' }[f.state] || 'stand'),
    draw(f) { if (f.state !== 'hidden' && f.state !== 'bump' && f.state !== 'triple') shadow(f, 7); drawFoe2(f, FOE.label.frame(f), f.x, f.y + f.yoff, ['bump', 'lean', 'aim', 'spinwind'].includes(f.state) ? shake(f) : 0); } },

  // ---- the twist tie: wriggles after him like a worm. Coils and whips at him; lunges and wraps round him (the heavy
  // one: mash to get loose before it squeezes); coils up and springs at him through the air; lies flat in a loop on the
  // floor (step in it and it snaps shut on him); and stands up on its middle with its ends whirling over its head
  tie: { hp: 3, hw: 14, h: 8, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 0.8 + Math.random() * 0.6; },
    box: f => {
      if (f.state === 'whip') return { l: Math.min(f.x, f.x + f.f * 34), r: Math.max(f.x, f.x + f.f * 34), t: f.y - 12, b: f.y };
      if (f.state === 'twirl') return { l: f.x - 14, r: f.x + 14, t: f.y - 26, b: f.y };
      if (f.state === 'flat') return { l: f.x - 14, r: f.x + 14, t: f.y - 4, b: f.y };
      return { l: f.x - 14, r: f.x + 14, t: f.y - 9 + f.yoff, b: f.y + f.yoff };
    },
    harmless: f => !['walk'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); if (pinnedBy(f)) P.pinned = null; return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 260, 80);
      if (f.state === 'walk') {
        walkAbout(f, dt, 50, 30);
        if (on && f.cd <= 0 && Math.abs(dy) < 34) {
          const m = choose([[adx < 50 ? 1.5 : 0, 'coil'], [hasMove(f, 2) && adx < 70 ? 1.1 : 0, 'grabwind'], [hasMove(f, 3) && adx > 60 && adx < 180 ? 1.1 : 0, 'springwind'],
            [hasMove(f, 4) && adx > 50 && adx < 140 ? 0.8 : 0, 'flat'], [hasMove(f, 5) && adx < 40 ? 1 : 0, 'twirlwind']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); if (m === 'flat') { f.armed = false; } if (heard(f)) sfx.hiss(); } else f.cd = 0.4;
        }
      } else if (f.state === 'coil') { if (f.t >= 0.4) { setFoeState(f, 'whip'); sfx.whip(); } }
      else if (f.state === 'whip') { if (f.t < 0.2) strike(f, { l: Math.min(f.x, f.x + f.f * 40), r: Math.max(f.x, f.x + f.f * 40), t: f.y - 12, b: f.y + 1 }, 16); if (f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.5; } }
      else if (f.state === 'grabwind') { if (f.t >= 0.45) { setFoeState(f, 'grab'); hopStart(f, P.x, -160); sfx.grab(); } }
      else if (f.state === 'grab') {                                                         // flung at him to wrap round him...
        const out = strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 22 + f.yoff, b: f.y + f.yoff }, 18);
        if (out === 'hit' && P.health > 0) { pinHim(f, 7); setFoeState(f, 'latch'); f.yoff = 0; tellOnce('tieWrap', f, 'mash to wriggle loose', 40); return; }
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'latch') {                                                      // ...wrapped round him, squeezing
        if (!pinnedBy(f)) { setFoeState(f, 'walk'); f.cd = 1.5; setBeside(f, -P.facing * 30); return; }
        f.x = P.x; f.y = P.y; P.pinned.x = P.x;
        if (f.t >= 1.5) { P.pinned = null; hurt(f.x, 'tie', 1); setFoeState(f, 'walk'); f.cd = 1.6; setBeside(f, -P.facing * 30); }
      } else if (f.state === 'springwind') { if (f.t >= 0.4) { setFoeState(f, 'spring'); hopStart(f, P.x, -330); if (heard(f)) sfx.boing(); } }
      else if (f.state === 'spring') {
        strike(f, { l: f.x - 14, r: f.x + 14, t: f.y - 18 + f.yoff, b: f.y + f.yoff }, 16);
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.3; puff(f.x, f.y, 3, 20); }
      } else if (f.state === 'flat') {                                                       // a snare on the floor, waiting
        if (!f.armed && f.t > 0.3) f.armed = true;
        if (f.armed && phillAround() && P.ground && Math.abs(P.x - f.x) < 12 && Math.abs(P.y - f.y) < 6 && P.inv <= 0 && !dodgeSafe()) {
          setFoeState(f, 'snap'); sfx.snap ? sfx.snap() : sfx.whip(); pinHim(f, 7); tellOnce('tieSnare', f, 'mash to wriggle loose', 40);
        }
        if (f.t >= 2.6) { setFoeState(f, 'walk'); f.cd = 1.0; }
      } else if (f.state === 'snap') {
        if (!pinnedBy(f)) { setFoeState(f, 'walk'); f.cd = 1.5; return; }
        P.pinned.x = f.x;
        if (f.t >= 1.3) { P.pinned = null; hurt(f.x, 'tie', 1); setFoeState(f, 'walk'); f.cd = 1.6; P.vy = -180; }
      } else if (f.state === 'twirlwind') { if (f.t >= 0.35) { setFoeState(f, 'twirl'); if (heard(f)) sfx.whirl && sfx.whirl(); } }
      else if (f.state === 'twirl') {                                                        // up on its middle, its ends whirling over its head (it catches him jumping over it)
        if (Math.floor(f.t * 5) !== Math.floor((f.t - dt) * 5)) f.hitP = false;
        strike(f, { l: f.x - 16, r: f.x + 16, t: f.y - 40, b: f.y - 14 }, 16);
        if (f.t >= 0.8) { setFoeState(f, 'walk'); f.cd = 1.3; }
      }
    },
    frame: f => 'tie_' + (f.air ? 'spring' : ({ walk: 'slither_' + (Math.floor(f.t * 7) % 2 + 1), coil: 'coil', whip: 'whip', grabwind: 'coil', grab: 'spring', latch: 'latch', springwind: 'coil', spring: 'spring', flat: 'flat', snap: 'snap', twirlwind: 'coil', twirl: 'twirl', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'slither_1' }[f.state] || 'slither_1')),
    draw(f) {
      if (f.state === 'latch') { drawFoe2(f, 'tie_latch', P.x, P.y - 4, Math.round(Math.sin(f.t * 30))); return; }
      shadow(f, 14); drawFoe2(f, FOE.tie.frame(f), f.x, f.y + f.yoff, ['coil', 'grabwind', 'springwind', 'twirlwind'].includes(f.state) ? shake(f) : 0);
    } },

  // ---- the gardening glove: scuttles on its fingers like a spider, a Grime eye in its cuff. Rears up and slaps down;
  // lunges and grabs him, squeezes and throws him (the heavy one); crouches and leaps on him from across the room;
  // flicks dirt at him; and drums its fingers so ripples run along the floor both ways (jump them)
  gglove: { hp: 4, hw: 12, h: 16, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 0.8 + Math.random() * 0.6; },
    box: f => (f.state === 'raise' ? { l: f.x - 12, r: f.x + 14, t: f.y - 26, b: f.y } : { l: f.x - 13, r: f.x + 14, t: f.y - 18 + f.yoff, b: f.y + f.yoff }),
    harmless: f => !['walk', 'leap'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); if (pinnedBy(f)) P.pinned = null; return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 280, 90);
      if (f.state === 'walk') {
        walkAbout(f, dt, 64, 34);
        if (on && f.cd <= 0 && Math.abs(dy) < 40) {
          const m = choose([[adx < 50 ? 1.5 : 0, 'raise'], [hasMove(f, 2) && adx < 80 ? 1.1 : 0, 'lungewind'], [hasMove(f, 3) && adx > 90 && adx < 220 ? 1.1 : 0, 'crouch'],
            [hasMove(f, 4) && adx > 60 && adx < 200 ? 1 : 0, 'flickwind'], [hasMove(f, 5) && adx < 160 ? 0.9 : 0, 'drumwind']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); if (heard(f)) sfx.hitCloth ? sfx.hitCloth() : sfx.bump(); } else f.cd = 0.4;
        }
      } else if (f.state === 'raise') { if (f.t >= 0.4) { setFoeState(f, 'slap'); sfx.swish(); } }
      else if (f.state === 'slap') { if (f.t < 0.18) strike(f, { l: Math.min(f.x, f.x + f.f * 30), r: Math.max(f.x, f.x + f.f * 30), t: f.y - 14, b: f.y + 1 }, 18); if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.4; } }
      else if (f.state === 'lungewind') { if (f.t >= 0.45) { setFoeState(f, 'lunge'); sfx.grab(); } }
      else if (f.state === 'lunge') {                                                        // fingers out, lunging to grab him...
        groundStep(f, f.f, 200, dt);
        const out = strike(f, { l: Math.min(f.x, f.x + f.f * 22), r: Math.max(f.x, f.x + f.f * 22), t: f.y - 22, b: f.y + 1 }, 18);
        if (out === 'hit' && P.health > 0) { pinHim(f, 6); setFoeState(f, 'grab'); tellOnce('ggloveGrab', f, 'mash to wriggle free', 40); return; }
        if (f.t >= 0.32) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.4; }
      } else if (f.state === 'grab') {                                                       // ...squeezing him, then a throw
        if (!pinnedBy(f)) { setFoeState(f, 'walk'); f.cd = 1.5; return; }
        P.pinned.x = f.x + f.f * 16 + Math.sin(f.t * 25) * 2; P.pinned.y = f.y - 6;
        if (f.t >= 1.3) { P.pinned = null; hurt(f.x, 'gglove', 1); P.vx = f.f * 200; P.vy = -260; setFoeState(f, 'walk'); f.cd = 1.8; }
      } else if (f.state === 'crouch') { if (f.t >= 0.4) { setFoeState(f, 'leap'); hopStart(f, P.x, -380); if (heard(f)) sfx.jump(); } }
      else if (f.state === 'leap') {
        strike(f, { l: f.x - 13, r: f.x + 13, t: f.y - 18 + f.yoff, b: f.y + f.yoff }, 18);
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.4; puff(f.x, f.y, 4, 24); if (heard(f)) sfx.thud(); }
      } else if (f.state === 'flickwind') {                                                  // fingers back...
        if (f.t >= 0.4) { setFoeState(f, 'flick'); if (heard(f)) sfx.splort(); const a0 = Math.atan2(P.y - 14 - (f.y - 10), dx); for (let i = -1; i <= 1; i++) { const a = a0 + i * 0.25; shot(f, 'clod', f.x + f.f * 10, f.y - 10, Math.cos(a) * 190, Math.sin(a) * 190 - 60, 420, drawClod); } }   // ...three flicks of dirt
      } else if (f.state === 'flick' && f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; }
      else if (f.state === 'drumwind') { if (f.t >= 0.5) { setFoeState(f, 'drum'); f.n = 0; } }
      else if (f.state === 'drum') {                                                         // drumming its fingers: ripples along the floor
        const k = Math.floor(f.t / 0.35);
        if (k >= f.n && f.n < 2) { f.n++; groundWave(f, f.x, f.y, 160, '#6a4a8a'); if (heard(f)) sfx.drumTap ? sfx.drumTap() : sfx.thud(); }
        if (f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.6; }
      }
    },
    frame: f => 'gglove_' + (f.air ? 'leap' : ({ walk: 'crawl_' + (Math.floor(f.t * 8) % 2 + 1), raise: 'raise', slap: 'slap', lungewind: 'crouch', lunge: 'lunge', grab: 'grab', crouch: 'crouch', leap: 'leap', flickwind: 'flickwind', flick: 'flick', drumwind: 'raise', drum: 'drum', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'crawl_1' }[f.state] || 'crawl_1')),
    draw(f) { shadow(f, 13); drawFoe2(f, FOE.gglove.frame(f), f.x, f.y + f.yoff, ['raise', 'lungewind', 'crouch', 'flickwind', 'drumwind'].includes(f.state) ? shake(f) : 0); } },

  // ---- the sprinkler head: sits in the ground, a Grime eye in it, and Grime instead of water. Sprays low along the floor
  // both ways (jump it); rises on its riser and shoots a jet straight at him; lobs drops up in a fan; pops right up
  // under him when he's on top of it or jumping over (the heavy one); and spins, spraying every way at once
  sprinkler: { hp: 4, hw: 10, h: 14, acorns: [1, 2],
    setup(f) { f.cd = 1 + Math.random() * 0.6; },
    box: f => (f.state === 'pop' ? { l: f.x - 10, r: f.x + 10, t: f.y - 34, b: f.y } : { l: f.x - 10, r: f.x + 10, t: f.y - 14, b: f.y }),
    harmless: f => f.state !== 'walk',
    update(f, dt) {
      if (f.state === 'down') return;
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') return;
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 300, 120);
      if (f.state === 'walk') {
        if (on && adx > 120) { const res = groundStep(f, Math.sign(dx), 18, dt); f.f = Math.sign(dx) || f.f; }   // shuffles along a little in its socket of soil
        if (on && f.cd <= 0) {
          const m = choose([[Math.abs(dy) < 30 && adx < 200 ? 1.3 : 0, 'ringwind'], [hasMove(f, 2) && Math.abs(dy) < 50 && adx > 40 ? 1.2 : 0, 'aim'], [hasMove(f, 3) && adx > 50 && adx < 220 ? 1 : 0, 'arcwind'],
            [hasMove(f, 4) && adx < 34 && (dy < -4 || adx < 18) ? 2 : 0, 'popwind'], [hasMove(f, 5) && adx < 120 ? 0.9 : 0, 'whirlwind']]);
          if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); if (heard(f)) sfx.gurgle ? sfx.gurgle() : sfx.splort(); } else f.cd = 0.4;
        }
      } else if (f.state === 'ringwind') { if (f.t >= 0.5) { setFoeState(f, 'ring'); groundWave(f, f.x, f.y, 150); if (heard(f)) sfx.splort(); } }
      else if (f.state === 'ring' && f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.3 + Math.random() * 0.5; }
      else if (f.state === 'aim') { if (f.t >= 0.5) { setFoeState(f, 'jet'); f.ja = Math.atan2(P.y - 16 - (f.y - 16), dx); if (heard(f)) sfx.splort(); } }
      else if (f.state === 'jet') {                                                          // a jet straight at him, for a moment
        const x0 = f.x, y0 = f.y - 16; let x1 = x0, y1 = y0;
        for (let d = 0; d < 180; d += 6) { const x = x0 + Math.cos(f.ja) * d, y = y0 + Math.sin(f.ja) * d; if (solidPx(x, y)) break; x1 = x; y1 = y; }
        f.jet = [x0, y0, x1, y1];
        if (f.t < 0.5 && phillAround()) {
          const me = { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y };
          for (let k = 0; k <= 1; k += 0.1) { const x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k; if (overlap({ l: x - 3, r: x + 3, t: y - 3, b: y + 3 }, me)) { strike(f, { l: x - 3, r: x + 3, t: y - 3, b: y + 3, area: true }, 16); break; } }
        }
        if (f.t >= 0.6) { f.jet = null; setFoeState(f, 'walk'); f.cd = 1.5 + Math.random() * 0.5; }
      } else if (f.state === 'arcwind') {                                                    // gurgling up...
        if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.5 + Math.random() * 0.5; for (let i = 0; i < 5; i++) { const tx = P.x + (i - 2) * 22, tt = 0.9; shot(f, 'drop', f.x, f.y - 18, (tx - f.x) / tt, -280, 620, drawDrop, { life: 2 }); } if (heard(f)) sfx.splort(); }   // ...a fan of drops lobbed over
      } else if (f.state === 'popwind') { if (f.t >= 0.4) { setFoeState(f, 'pop'); if (heard(f)) sfx.boing(); } }      // (the red !!)
      else if (f.state === 'pop') {                                                          // up on its riser, right under him
        if (f.t < 0.25) strike(f, { l: f.x - 10, r: f.x + 10, t: f.y - 48, b: f.y - 8 }, 22);
        if (f.t >= 0.7) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'whirlwind') { if (f.t >= 0.45) { setFoeState(f, 'whirl'); f.n = 0; } }
      else if (f.state === 'whirl') {                                                        // spinning, Grime every way
        const k = Math.floor(f.t / 0.2);
        if (k >= f.n && f.n < 3) { f.n++; for (let i = 0; i < 6; i++) { const a = -Math.PI + (i + 0.5 + f.n * 0.33) * Math.PI / 6; shot(f, 'drop', f.x, f.y - 14, Math.cos(a) * 150, Math.sin(a) * 150, 300, drawDrop, { life: 1.6 }); } if (heard(f)) sfx.splort(); }
        if (f.t >= 0.8) { setFoeState(f, 'walk'); f.cd = 1.7; }
      }
    },
    frame: f => 'sprinkler_' + ({ walk: 'idle', ringwind: 'rise', ring: 'spin_' + (Math.floor(f.t * 10) % 2 + 1), aim: 'aim', jet: 'jet', arcwind: 'arcwind', popwind: 'rise', pop: 'pop', whirlwind: 'rise', whirl: 'whirl', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'idle' }[f.state] || 'idle'),
    draw(f) {
      if (f.jet) { const [x0, y0, x1, y1] = f.jet; ctx.strokeStyle = 'rgba(40,24,60,0.85)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.strokeStyle = '#8a5ac0'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0 - 1); ctx.lineTo(x1, y1 - 1); ctx.stroke(); }
      drawFoe2(f, FOE.sprinkler.frame(f), f.x, f.y, ['ringwind', 'aim', 'popwind', 'whirlwind', 'arcwind'].includes(f.state) ? shake(f) : 0);
    } },
});
})();
