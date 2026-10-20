'use strict';
// ---------- the Hive's candy: Grime candy spilled out of the split piñata (New regions.md, 10/18/2026) ----------
// A gumdrop, a little gummy worm, a lollipop, a jawbreaker, a lump of taffy and a swarm of candy corn. Region level 2,
// so each has five attacks (the first always, the rest by hasMove), every one with its own wind up, and one the shield
// doesn't answer (HEAVY: the red !!). Helpers (near, strike, baseState, heard) are in pond.js, freeMove and fallDown in
// rootwood.js, drawFoe2 and tellOnce in rootwood_foes2.js, chaseWalk, groundStep, hopArc, hopTo, pinHim in foes.js.

(() => {
const GRIMEC = '#4a2a62';
function shot(f, kind, x, y, vx, vy, g, draw, extra) { shots.push(Object.assign({ kind, col: GRIMEC, x, y, vx, vy, g, from: f, reflected: false, t: 0, life: 2.4, draw }, extra || {})); }
const drawGlob = s => { ctx.fillStyle = '#2a2030'; ellipse(s.x, s.y, 3.5, 3.5); ctx.fillStyle = '#7a3a8a'; ellipse(s.x, s.y, 2.5, 2.5); ctx.fillStyle = '#c08ad0'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 2, 1, 1); };
const drawMini = s => { ctx.fillStyle = '#2a2030'; ellipse(s.x, s.y, 4, 3.5); ctx.fillStyle = '#d8487e'; ellipse(s.x, s.y, 3, 2.6); ctx.fillStyle = '#ffecf0'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 2, 1, 1); };
const drawShard = s => { ctx.fillStyle = '#1a2a6a'; ctx.fillRect(Math.round(s.x) - 2, Math.round(s.y) - 1, 4, 3); ctx.fillStyle = '#8ab4f8'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 1, 2, 1); };
const drawCornShot = s => spr('corn_dive', s.x, s.y, s.vx > 0);
// a ripple along the ground both ways from x (jump it)
function groundWave(f, x, y, sp = 170, col = '#d8487e') {
  for (const d of [-1, 1]) shot(f, 'wave', x + d * 8, y - 4, d * sp, 0, 0, s => { ctx.fillStyle = col; const k = Math.sin(s.t * 30) > 0 ? 1 : 0; ctx.fillRect(Math.round(s.x) - 3, Math.round(s.y) - 2 - k, 6, 3 + k); ctx.fillStyle = '#ffecf0'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 3 - k, 2, 1); },
    { life: 1.1, upd: s => { if (!solidPx(s.x + Math.sign(s.vx) * 6, s.y + 6)) s.dead = true; } });
}
const shake = f => Math.round(Math.sin(f.t * 60));
const shadow = (f, w) => { ctx.fillStyle = 'rgba(0,0,0,0.22)'; ellipse(f.x, f.y, w, 1); };
function hopStart(f, tx, vy0 = -300) { f.vy = vy0; f.yoff = -0.01; f.hopVX = Math.max(-170, Math.min(170, hopTo(f, tx, vy0))); }
function walkAbout(f, dt, sp, keep) {
  if (chaseWalk(f, dt, sp, keep)) return;
  const res = groundStep(f, f.f, sp * 0.45, dt);
  if (res !== 'ok' || f.x <= f.range[0] || f.x >= f.range[1]) f.f = -f.f;
}
const pick = (f, opts) => { const m = choose(opts); const dx = P.x - f.x; if (m) { f.f = Math.sign(dx) || f.f; setFoeState(f, m); } else f.cd = 0.4; return m; };

for (const k of ['gumdrop', 'gworm', 'lolly', 'jaw', 'taffy', 'corns']) ART_HITS.add(k);
Object.assign(COMMIT, {
  gumdrop: { squash: 0, bounce: 0, flatten: 0, launch: 0, slam: 0, rollwind: 0, roll: 0, spit: 0, splitwind: 0 },
  gworm: { stretchwind: 0, stretch: 0, whipwind: 0, whip: 0, lassowind: 0, lasso: 0, burrow: 0, pop: 0, spitwind: 0 },
  lolly: { spinwind: 0, spin: 0, swingwind: 0, swing: 0, throwwind: 0, thrown: 0, pogowind: 0, pogo: 0, twirlwind: 0 },
  jaw: { rollwind: 0, roll: 0, bouncewind: 0, bounce: 0, crackwind: 0, crash: 0, shatterwind: 0, spinwind: 0, dash: 0 },
  taffy: { reachwind: 0, reach: 0, smackwind: 0, smack: 0, stretchup: 0, drop: 0, pullwind: 0, pull: 0, wadwind: 0 },
  corns: { divewind: 0, dive: 0, circle: 0, converge: 0, volley: 0, wallwind: 0, wall: 0, scatterwind: 0 },
});
Object.assign(HEAVY, {
  gumdrop: ['flatten', 'launch', 'slam'], gworm: ['lassowind', 'lasso'], lolly: ['swingwind', 'swing'], jaw: ['crackwind', 'crash'], taffy: ['reachwind', 'reach'], corns: ['wallwind', 'wall'],
});

Object.assign(FOE, {
  // ---- the gumdrop: bounces after him. Squashes and bounces onto him; spits a glob of Grime; tips over and rolls at
  // him; spits out little gumdrops that bounce along the floor; and (the heavy one) flattens right down, springs up
  // high and slams down on him so the floor ripples both ways
  gumdrop: { hp: 3, hw: 8, h: 16, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 0.8 + Math.random() * 0.6; },
    box: f => (f.state === 'roll' ? { l: f.x - 8, r: f.x + 8, t: f.y - 16, b: f.y } : { l: f.x - 8, r: f.x + 8, t: f.y - 16 + f.yoff, b: f.y + f.yoff }),
    harmless: f => !['walk', 'bounce', 'roll'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 260, 90);
      if (f.state === 'walk') {
        if (f.yoff < 0) { if (hopArc(f, dt)) { f.yoff = 0; } }
        else { walkAbout(f, dt, 40, 30); if (Math.random() < dt * 2) { f.vy = -120; f.yoff = -0.01; f.hopVX = f.f * 30; } }   // a little bounce now and then as it goes
        if (on && f.cd <= 0 && Math.abs(dy) < 40 && f.yoff === 0) {
          const m = pick(f, [[adx < 90 ? 1.4 : 0, 'squash'], [hasMove(f, 2) && adx > 50 && adx < 200 ? 1.1 : 0, 'spit'], [hasMove(f, 3) && adx > 40 && adx < 200 ? 1 : 0, 'rollwind'],
            [hasMove(f, 4) && adx < 160 ? 0.9 : 0, 'splitwind'], [hasMove(f, 5) && adx < 130 ? 1 : 0, 'flatten']]);
          if (m === 'spit') f.spat = false;
          if (m && heard(f)) sfx.boing();
        }
      } else if (f.state === 'squash') { if (f.t >= 0.3) { setFoeState(f, 'bounce'); hopStart(f, P.x, -280); if (heard(f)) sfx.jump(); } }
      else if (f.state === 'bounce') {
        strike(f, { l: f.x - 8, r: f.x + 8, t: f.y - 16 + f.yoff, b: f.y + f.yoff }, 16);
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.1 + Math.random() * 0.5; puff(f.x, f.y, 3, 20); }
      } else if (f.state === 'spit') {
        if (f.t >= 0.4 && !f.spat) { f.spat = true; const tt = 0.7; shot(f, 'glob', f.x + f.f * 6, f.y - 12, (P.x - f.x) / tt, -260, 600, drawGlob); if (heard(f)) sfx.splort(); }
        if (f.t >= 0.75) { setFoeState(f, 'walk'); f.cd = 1.4 + Math.random() * 0.5; }
      } else if (f.state === 'rollwind') { if (f.t >= 0.35) { setFoeState(f, 'roll'); if (heard(f)) sfx.whoosh(); } }
      else if (f.state === 'roll') {
        const res = groundStep(f, f.f, 180, dt);
        strike(f, { l: f.x - 8, r: f.x + 8, t: f.y - 16, b: f.y }, 16);
        if (res !== 'ok' || f.t >= 0.9) { setFoeState(f, 'walk'); f.cd = 1.3; }
      } else if (f.state === 'splitwind') {                                                  // splitting down the middle...
        if (f.t >= 0.5) {                                                                     // ...three little ones bouncing off along the floor
          setFoeState(f, 'walk'); f.cd = 1.6; if (heard(f)) sfx.splort();
          for (const v of [-1, 1, Math.sign(dx) || 1]) shot(f, 'mini', f.x, f.y - 8, v * (90 + Math.random() * 40), -180, 700, drawMini,
            { life: 2.2, upd: (s, dt2) => { if (solidPx(s.x, s.y + 3) && s.vy > 0) { s.y -= 2; s.vy = -s.vy * 0.7; if (Math.abs(s.vy) < 60) s.vy = -160; } } });
        }
      } else if (f.state === 'flatten') { if (f.t >= 0.5) { setFoeState(f, 'launch'); hopStart(f, P.x, -420); if (heard(f)) sfx.boing(); } }   // (the red !!)
      else if (f.state === 'launch') {
        if (hopArc(f, dt)) { setFoeState(f, 'slam'); shakeT = 0.12; shakeA = 2; if (heard(f)) sfx.thud(); puff(f.x, f.y, 8, 50); strike(f, { l: f.x - 14, r: f.x + 14, t: f.y - 20, b: f.y + 2 }, 24); groundWave(f, f.x, f.y, 170); }
      } else if (f.state === 'slam' && f.t >= 0.6) { setFoeState(f, 'walk'); f.cd = 1.7; }
    },
    frame: f => 'gumdrop_' + (f.yoff < -2 && ['walk', 'bounce', 'launch'].includes(f.state) ? 'hop' : ({ walk: 'walk_' + (Math.floor(f.t * 4) % 2 + 1), squash: 'squash', bounce: 'hop', spit: 'spit', rollwind: 'squash', roll: 'roll_' + (Math.floor(f.t * 10) % 2 + 1), splitwind: 'split', flatten: 'squash', launch: 'hop', slam: 'squash', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'walk_1' }[f.state] || 'walk_1')),
    draw(f) { shadow(f, 8); drawFoe2(f, FOE.gumdrop.frame(f), f.x, f.y + f.yoff, ['squash', 'rollwind', 'splitwind', 'flatten'].includes(f.state) ? shake(f) : 0); } },

  // ---- the gummy worm: wriggles after him. Stretches out a long way at him and snaps back; rears up and whips down;
  // ducks into the floor and pops up under him; spits sour sugar; and (the heavy one) throws a loop of itself over him
  // and holds on (mash to get loose)
  gworm: { hp: 3, hw: 12, h: 8, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 0.8 + Math.random() * 0.6; },
    box: f => {
      if (f.state === 'stretch') return { l: Math.min(f.x, f.x + f.f * 48), r: Math.max(f.x, f.x + f.f * 48), t: f.y - 8, b: f.y };
      if (f.state === 'whip') return { l: f.x - 12, r: f.x + 12, t: f.y - 24, b: f.y };
      if (f.state === 'burrow') return { l: f.x - 6, r: f.x + 6, t: f.y - 4, b: f.y };
      if (f.state === 'pop') return { l: f.x - 6, r: f.x + 6, t: f.y - 22, b: f.y };
      return { l: f.x - 12, r: f.x + 12, t: f.y - 9, b: f.y };
    },
    harmless: f => !['walk'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (pinnedBy(f)) P.pinned = null; return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') return;
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 260, 80);
      if (f.state === 'walk') {
        walkAbout(f, dt, 46, 30);
        if (on && f.cd <= 0 && Math.abs(dy) < 34) {
          const m = pick(f, [[adx < 70 ? 1.4 : 0, 'stretchwind'], [hasMove(f, 2) && adx < 40 ? 1.2 : 0, 'whipwind'], [hasMove(f, 3) && adx > 50 && adx < 180 ? 1.1 : 0, 'burrow'],
            [hasMove(f, 4) && adx > 60 && adx < 200 ? 1 : 0, 'spitwind'], [hasMove(f, 5) && adx < 80 ? 1 : 0, 'lassowind']]);
          if (m && heard(f)) sfx.hiss();
        }
      } else if (f.state === 'stretchwind') { if (f.t >= 0.4) { setFoeState(f, 'stretch'); sfx.whip(); } }
      else if (f.state === 'stretch') {                                                      // out a long way at him... and snapping back
        if (f.t < 0.25) strike(f, { l: Math.min(f.x, f.x + f.f * 52), r: Math.max(f.x, f.x + f.f * 52), t: f.y - 9, b: f.y + 1 }, 16);
        if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.2 + Math.random() * 0.5; }
      } else if (f.state === 'whipwind') { if (f.t >= 0.35) { setFoeState(f, 'whip'); sfx.whip(); } }
      else if (f.state === 'whip') { if (f.t < 0.2) strike(f, { l: f.x - 14, r: f.x + 14, t: f.y - 28, b: f.y }, 16); if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.2; } }
      else if (f.state === 'burrow') {                                                       // down into the floor, after him under it...
        groundStep(f, Math.sign(dx) || f.f, 90, dt);
        if (Math.random() < dt * 20) part(f.x, f.y - 1, (Math.random() * 2 - 1) * 30, -30, 0.3, '#a0621c', 1, 300);
        if (f.t >= 0.4 && (adx < 8 || f.t >= 1.4)) { setFoeState(f, 'pop'); if (heard(f)) sfx.boing(); puff(f.x, f.y, 4, 30); }
      } else if (f.state === 'pop') {                                                        // ...and up under him
        if (f.t < 0.25) strike(f, { l: f.x - 7, r: f.x + 7, t: f.y - 26, b: f.y }, 18);
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.3; }
      } else if (f.state === 'spitwind') {
        if (f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.4; if (heard(f)) sfx.splort(); for (let i = -1; i <= 1; i++) { const tt = 0.6 + i * 0.1; shot(f, 'glob', f.x + f.f * 10, f.y - 6, (P.x + i * 18 - f.x) / tt, -230, 640, drawGlob); } }
      } else if (f.state === 'lassowind') { if (f.t >= 0.45) { setFoeState(f, 'lasso'); hopStart(f, P.x, -200); sfx.grab ? sfx.grab() : sfx.whip(); } }
      else if (f.state === 'lasso') {                                                        // a loop of itself thrown over him (the red !!)...
        const out = strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 22 + f.yoff, b: f.y + f.yoff }, 18);
        if (out === 'hit' && P.health > 0) { pinHim(f, 7); setFoeState(f, 'latch'); f.yoff = 0; tellOnce('wormWrap', f, 'mash to wriggle loose', 40); return; }
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'latch') {                                                      // ...squeezing
        if (!pinnedBy(f)) { setFoeState(f, 'walk'); f.cd = 1.5; setBeside(f, -P.facing * 30); return; }
        f.x = P.x; f.y = P.y; P.pinned.x = P.x;
        if (f.t >= 1.5) { P.pinned = null; hurt(f.x, 'gworm', 1); setFoeState(f, 'walk'); f.cd = 1.6; setBeside(f, -P.facing * 30); }
      }
    },
    frame: f => 'gworm_' + (f.yoff < -2 ? 'lasso' : ({ walk: 'slither_' + (Math.floor(f.t * 7) % 2 + 1), stretchwind: 'coil', stretch: f.t < 0.3 ? 'stretch' : 'coil', whipwind: 'coil', whip: 'whip', burrow: 'burrow', pop: 'pop', spitwind: 'spit', lassowind: 'coil', lasso: 'lasso', latch: 'latch', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'slither_1' }[f.state] || 'slither_1')),
    draw(f) {
      if (f.state === 'latch') { drawFoe2(f, 'gworm_latch', P.x, P.y - 4, Math.round(Math.sin(f.t * 30))); return; }
      if (f.state !== 'burrow') shadow(f, 12);
      drawFoe2(f, FOE.gworm.frame(f), f.x, f.y + f.yoff, ['stretchwind', 'whipwind', 'lassowind', 'spitwind'].includes(f.state) ? shake(f) : 0);
    } },

  // ---- the lollipop: hops along on its stick. Spins its head round like a mace; hops at him on its stick like a pogo;
  // flings itself spinning and comes back; twirls along at him; and (the heavy one) raises right up and smashes its
  // head down in front of it so the floor cracks
  lolly: { hp: 4, hw: 9, h: 34, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 1 + Math.random() * 0.6; },
    box: f => {
      if (f.state === 'spin' || f.state === 'twirl') return { l: f.x - 16, r: f.x + 16, t: f.y - 34, b: f.y };
      if (f.state === 'swing') return { l: Math.min(f.x, f.x + f.f * 22), r: Math.max(f.x, f.x + f.f * 22), t: f.y - 34, b: f.y };
      if (f.state === 'thrown') return { l: f.x - 12, r: f.x + 12, t: f.y - 24, b: f.y - 4 };
      return { l: f.x - 9, r: f.x + 9, t: f.y - 34 + f.yoff, b: f.y + f.yoff };
    },
    harmless: f => !['walk', 'spin', 'twirl', 'thrown', 'pogo'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 280, 90);
      if (f.state === 'walk') {
        walkAbout(f, dt, 36, 40);
        if (on && f.cd <= 0 && Math.abs(dy) < 44) {
          const m = pick(f, [[adx < 50 ? 1.4 : 0, 'spinwind'], [hasMove(f, 2) && adx > 40 && adx < 160 ? 1.1 : 0, 'pogowind'], [hasMove(f, 3) && adx > 60 && adx < 220 ? 1.1 : 0, 'throwwind'],
            [hasMove(f, 4) && adx < 120 ? 1 : 0, 'twirlwind'], [hasMove(f, 5) && adx < 60 ? 1.1 : 0, 'swingwind']]);
          if (m && heard(f)) sfx.whoosh();
        }
      } else if (f.state === 'spinwind') { if (f.t >= 0.4) { setFoeState(f, 'spin'); if (heard(f)) sfx.whirl && sfx.whirl(); } }
      else if (f.state === 'spin') {
        if (Math.floor(f.t * 5) !== Math.floor((f.t - dt) * 5)) f.hitP = false;
        strike(f, { l: f.x - 17, r: f.x + 17, t: f.y - 34, b: f.y - 10 }, 16);
        if (f.t >= 0.8) { setFoeState(f, 'walk'); f.cd = 1.3; }
      } else if (f.state === 'pogowind') { if (f.t >= 0.35) { setFoeState(f, 'pogo'); hopStart(f, P.x, -300); if (heard(f)) sfx.boing(); } }
      else if (f.state === 'pogo') {
        strike(f, { l: f.x - 9, r: f.x + 9, t: f.y - 34 + f.yoff, b: f.y + f.yoff }, 16);
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.2; puff(f.x, f.y, 3, 20); }
      } else if (f.state === 'throwwind') { if (f.t >= 0.45) { setFoeState(f, 'thrown'); f.tx0 = f.x; f.gvx = f.f * 240; if (heard(f)) sfx.whirl && sfx.whirl(); } }
      else if (f.state === 'thrown') {                                                       // flung end over end... and coming back
        f.gvx -= f.f * 480 * dt;
        const nx = f.x + f.gvx * dt; if (!boxSolid(nx - 8, f.y - 24, nx + 8, f.y - 6)) f.x = nx; else f.gvx = -f.gvx * 0.3;
        if (Math.floor(f.t * 6) !== Math.floor((f.t - dt) * 6)) f.hitP = false;
        strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 26, b: f.y - 4 }, 16);
        if (f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'twirlwind') { if (f.t >= 0.35) { setFoeState(f, 'twirl'); } }
      else if (f.state === 'twirl') {
        groundStep(f, Math.sign(dx) || f.f, 70, dt);
        if (Math.floor(f.t * 6) !== Math.floor((f.t - dt) * 6)) f.hitP = false;
        strike(f, { l: f.x - 16, r: f.x + 16, t: f.y - 34, b: f.y }, 14);
        if (f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'swingwind') { if (f.t >= 0.5) { setFoeState(f, 'swing'); if (heard(f)) sfx.whoosh(); } }   // (the red !!)
      else if (f.state === 'swing') {
        if (f.t < 0.15) strike(f, { l: Math.min(f.x, f.x + f.f * 26), r: Math.max(f.x, f.x + f.f * 26), t: f.y - 30, b: f.y + 1 }, 24);
        if (f.t >= 0.15 && !f.landed) { f.landed = true; shakeT = 0.1; shakeA = 2; if (heard(f)) sfx.thud(); puff(f.x + f.f * 20, f.y, 6, 40); groundWave(f, f.x + f.f * 20, f.y, 160, '#e04070'); }
        if (f.t >= 0.7) { f.landed = false; setFoeState(f, 'walk'); f.cd = 1.6; }
      }
    },
    frame: f => 'lolly_' + ({ walk: Math.floor(f.t * 4) % 2 ? 'idle_2' : 'idle_1', spinwind: 'spinwind', spin: 'spin', pogowind: 'idle_2', pogo: 'pogo', throwwind: 'spinwind', thrown: 'throw', twirlwind: 'spinwind', twirl: 'spin', swingwind: 'swingwind', swing: 'swing', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'idle_1' }[f.state] || 'idle_1'),
    draw(f) {
      shadow(f, 8);
      if (f.state === 'thrown') { ctx.save(); ctx.translate(Math.round(f.x), Math.round(f.y - 16)); ctx.rotate(f.t * 14 * f.f); spr('lolly_throw', 0, 16, f.f > 0); ctx.restore(); return; }
      drawFoe2(f, FOE.lolly.frame(f), f.x, f.y + f.yoff, ['spinwind', 'pogowind', 'throwwind', 'swingwind', 'twirlwind'].includes(f.state) ? shake(f) : 0);
    } },

  // ---- the jawbreaker: hard as a rock (tough). Rolls at him; bounces at him; breaks bits of its shell off in a spray;
  // spins on the spot then dashes; and (the heavy one) cracks open a little, winds up, and comes crashing down on him
  jaw: { hp: 6, hw: 11, h: 22, acorns: [2, 3], walker: true,
    setup(f) { f.cd = 1 + Math.random() * 0.6; },
    box: f => ({ l: f.x - 11, r: f.x + 11, t: f.y - 22 + f.yoff, b: f.y + f.yoff }),
    harmless: f => !['walk', 'roll', 'bounce', 'dash'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 300, 90);
      if (f.state === 'walk') {
        walkAbout(f, dt, 30, 40);
        if (on && f.cd <= 0 && Math.abs(dy) < 40) {
          const m = pick(f, [[adx > 50 && adx < 240 ? 1.4 : 0, 'rollwind'], [hasMove(f, 2) && adx < 140 ? 1.1 : 0, 'bouncewind'], [hasMove(f, 3) && adx < 120 ? 1 : 0, 'shatterwind'],
            [hasMove(f, 4) && adx > 60 && adx < 220 ? 1 : 0, 'spinwind'], [hasMove(f, 5) && adx < 120 ? 1.1 : 0, 'crackwind']]);
          if (m && heard(f)) sfx.clunk ? sfx.clunk() : sfx.thud();
        }
      } else if (f.state === 'rollwind') { if (f.t >= 0.4) { setFoeState(f, 'roll'); if (heard(f)) sfx.whoosh(); } }
      else if (f.state === 'roll') {
        const res = groundStep(f, f.f, 200, dt);
        strike(f, FOE.jaw.box(f), 20);
        if (res !== 'ok' || f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.4; if (res === 'wall') { shakeT = 0.08; shakeA = 2; if (heard(f)) sfx.thud(); } }
      } else if (f.state === 'bouncewind') { if (f.t >= 0.35) { setFoeState(f, 'bounce'); f.n = 0; hopStart(f, f.x + Math.sign(dx) * Math.min(adx, 60), -260); } }
      else if (f.state === 'bounce') {                                                       // two big bounces at him
        strike(f, FOE.jaw.box(f), 18);
        if (hopArc(f, dt)) { puff(f.x, f.y, 4, 30); if (heard(f)) sfx.thud(); if (++f.n < 2) { f.hitP = false; hopStart(f, f.x + (Math.sign(P.x - f.x) || f.f) * Math.min(Math.abs(P.x - f.x), 60), -240); } else { setFoeState(f, 'walk'); f.cd = 1.3; } }
      } else if (f.state === 'shatterwind') {                                                // cracking...
        if (f.t >= 0.5) { setFoeState(f, 'walk'); f.cd = 1.6; if (heard(f)) sfx.crumble(); for (let i = 0; i < 6; i++) { const a = -Math.PI + (i + 0.5) * Math.PI / 6; shot(f, 'shard', f.x, f.y - 14, Math.cos(a) * 170, Math.sin(a) * 170, 500, drawShard, { life: 1.4 }); } }   // ...bits of its shell flying off
      } else if (f.state === 'spinwind') { if (f.t >= 0.55) { setFoeState(f, 'dash'); f.gvx = (Math.sign(dx) || f.f) * 260; if (heard(f)) sfx.whoosh(); } }
      else if (f.state === 'dash') {
        const res = groundStep(f, Math.sign(f.gvx), Math.abs(f.gvx), dt);
        strike(f, FOE.jaw.box(f), 20);
        if (res !== 'ok' || f.t >= 0.6) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'crackwind') { if (f.t >= 0.55) { setFoeState(f, 'crash'); hopStart(f, P.x, -380); if (heard(f)) sfx.boing(); } }   // (the red !!)
      else if (f.state === 'crash') {
        if (hopArc(f, dt)) { shakeT = 0.18; shakeA = 3; if (heard(f)) sfx.slam ? sfx.slam() : sfx.thud(); puff(f.x, f.y, 10, 60); strike(f, { l: f.x - 16, r: f.x + 16, t: f.y - 26, b: f.y + 2 }, 26); groundWave(f, f.x, f.y, 180, '#4a7ae0'); setFoeState(f, 'walk'); f.cd = 1.8; }
      }
    },
    frame: f => 'jaw_' + ({ walk: 'roll_' + (Math.floor(f.x / 8) % 2 + 1), rollwind: 'squash', roll: 'roll_' + (Math.floor(f.t * 12) % 2 + 1), bouncewind: 'squash', bounce: 'idle', shatterwind: 'crackwind', spinwind: 'roll_' + (Math.floor(f.t * 20) % 2 + 1), dash: 'roll_' + (Math.floor(f.t * 14) % 2 + 1), crackwind: 'crackwind', crash: 'idle', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'idle' }[f.state] || 'idle'),
    draw(f) { shadow(f, 11); drawFoe2(f, FOE.jaw.frame(f), f.x, f.y + f.yoff, ['rollwind', 'bouncewind', 'shatterwind', 'crackwind'].includes(f.state) ? shake(f) : 0); } },

  // ---- the taffy: oozes after him. Slaps out at him; stretches up tall and drops on him; sticks to the floor and
  // snaps itself across at him; throws a sticky wad that slows him; and (the heavy one) stretches an arm right across
  // to him and grabs (mash to get loose)
  taffy: { hp: 4, hw: 10, h: 18, acorns: [1, 2], walker: true,
    setup(f) { f.cd = 1 + Math.random() * 0.6; },
    box: f => {
      if (f.state === 'reach') return { l: Math.min(f.x, f.x + f.f * 46), r: Math.max(f.x, f.x + f.f * 46), t: f.y - 22, b: f.y - 6 };
      if (f.state === 'stretchup') return { l: f.x - 10, r: f.x + 10, t: f.y - 34, b: f.y };
      return { l: f.x - 10, r: f.x + 10, t: f.y - 18 + f.yoff, b: f.y + f.yoff };
    },
    harmless: f => !['walk', 'pull'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { if (f.yoff < 0) hopArc(f, dt); if (pinnedBy(f)) P.pinned = null; return; }
      baseState(f, dt);
      if (f.state === 'stagger' || f.state === 'hurt') { if (f.yoff < 0) hopArc(f, dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), dy = P.y - f.y, on = near(f, 260, 80);
      if (f.state === 'walk') {
        walkAbout(f, dt, 30, 30);
        if (on && f.cd <= 0 && Math.abs(dy) < 40) {
          const m = pick(f, [[adx < 40 ? 1.4 : 0, 'smackwind'], [hasMove(f, 2) && adx < 50 ? 1.1 : 0, 'stretchup'], [hasMove(f, 3) && adx > 50 && adx < 160 ? 1.1 : 0, 'pullwind'],
            [hasMove(f, 4) && adx > 60 && adx < 200 ? 1 : 0, 'wadwind'], [hasMove(f, 5) && adx > 20 && adx < 60 ? 1.2 : 0, 'reachwind']]);
          if (m && heard(f)) sfx.splort();
        }
      } else if (f.state === 'smackwind') { if (f.t >= 0.35) { setFoeState(f, 'smack'); sfx.whip(); } }
      else if (f.state === 'smack') { if (f.t < 0.2) strike(f, { l: Math.min(f.x, f.x + f.f * 26), r: Math.max(f.x, f.x + f.f * 26), t: f.y - 20, b: f.y - 2 }, 16); if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.2; } }
      else if (f.state === 'stretchup') { if (f.t >= 0.5) { setFoeState(f, 'drop'); hopStart(f, P.x, -120); } }   // up tall...
      else if (f.state === 'drop') {                                                         // ...and over on top of him
        strike(f, { l: f.x - 12, r: f.x + 12, t: f.y - 20 + f.yoff, b: f.y + f.yoff }, 18);
        if (hopArc(f, dt)) { setFoeState(f, 'walk'); f.cd = 1.3; puff(f.x, f.y, 4, 30); if (heard(f)) sfx.splort(); }
      } else if (f.state === 'pullwind') { if (f.t >= 0.45) { setFoeState(f, 'pull'); f.gvx = (Math.sign(dx) || f.f) * 280; if (heard(f)) sfx.whoosh(); } }   // stuck to the floor, stretching back...
      else if (f.state === 'pull') {                                                         // ...and it snaps itself across at him
        const res = groundStep(f, Math.sign(f.gvx), Math.abs(f.gvx), dt); f.gvx *= Math.pow(0.1, dt);
        strike(f, FOE.taffy.box(f), 18);
        if (res !== 'ok' || f.t >= 0.6) { setFoeState(f, 'walk'); f.cd = 1.3; }
      } else if (f.state === 'wadwind') {
        if (f.t >= 0.45) { setFoeState(f, 'walk'); f.cd = 1.6; if (heard(f)) sfx.splort(); const tt = 0.75;   // a sticky wad lobbed at him: slow going for a bit if it lands
          shot(f, 'wad', f.x + f.f * 10, f.y - 18, (P.x - f.x) / tt, -260, 620, s => { ctx.fillStyle = '#2a2030'; ellipse(s.x, s.y, 4, 4); ctx.fillStyle = '#e890aa'; ellipse(s.x, s.y, 3, 3); }, { onMeet: out => { if (out === 'hit') P.slowT = Math.max(P.slowT || 0, 2); } }); }
      } else if (f.state === 'reachwind') { if (f.t >= 0.5) { setFoeState(f, 'reach'); sfx.grab ? sfx.grab() : sfx.whip(); } }   // (the red !!)
      else if (f.state === 'reach') {
        if (f.t < 0.25) {
          const out = strike(f, { l: Math.min(f.x, f.x + f.f * 50), r: Math.max(f.x, f.x + f.f * 50), t: f.y - 24, b: f.y - 4 }, 18);
          if (out === 'hit' && P.health > 0) { pinHim(f, 7); setFoeState(f, 'latch'); tellOnce('taffyGrab', f, 'mash to pull free', 40); return; }
        }
        if (f.t >= 0.55) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'latch') {                                                      // holding on, and pulling him in
        if (!pinnedBy(f)) { setFoeState(f, 'walk'); f.cd = 1.5; return; }
        P.pinned.x += (f.x + f.f * 16 - P.pinned.x) * Math.min(1, dt * 2); P.x = P.pinned.x;
        if (f.t >= 1.4) { P.pinned = null; hurt(f.x, 'taffy', 1); setFoeState(f, 'walk'); f.cd = 1.6; }
      }
    },
    frame: f => 'taffy_' + ({ walk: Math.floor(f.t * 3) % 2 ? 'idle_2' : 'idle_1', smackwind: 'idle_2', smack: 'smack', stretchup: 'stretchup', drop: 'stretchup', pullwind: 'pull', pull: 'idle_2', wadwind: 'wad', reachwind: 'idle_2', reach: 'reach', latch: 'latch', down: 'down', stagger: 'dizzy', asleep: 'down', hurt: 'idle_1' }[f.state] || 'idle_1'),
    draw(f) { shadow(f, 11); drawFoe2(f, FOE.taffy.frame(f), f.x, f.y + f.yoff, ['smackwind', 'pullwind', 'wadwind', 'reachwind'].includes(f.state) ? shake(f) : 0); } },

  // ---- the candy corn: a little swarm of five, flying together. Dives at him; circles round him and closes in;
  // fires off one at a time at him; spreads out over him and rains down; and (the heavy one) lines up into a wall and
  // sweeps along low (jump it, or a roll)
  corns: { hp: 3, hw: 12, h: 12, acorns: [1, 2], free: true,
    setup(f) { f.hx = f.x; f.hy = f.y - 40; f.y = f.hy; f.cd = 1 + Math.random() * 0.6; f.ang = 0; },
    box: f => (f.state === 'wall' ? { l: f.x - 6, r: f.x + 6, t: f.y - 36, b: f.y + 4 } : { l: f.x - 12, r: f.x + 12, t: f.y - 8, b: f.y + 8 }),
    harmless: f => !['walk', 'dive', 'converge', 'wall'].includes(f.state),
    update(f, dt) {
      if (f.state === 'down') { fallDown(f, dt); return; }
      baseState(f, dt);
      if (f.state === 'stagger') { freeMove(f, 0, 20 * dt); return; }
      const dx = P.x - f.x, adx = Math.abs(dx), on = near(f, 300, 200);
      f.ang += dt * 4;
      if (f.state === 'walk') {
        const tx = on ? P.x - Math.sign(dx || 1) * 50 : f.hx + Math.sin(f.t * 0.8) * 40, ty = on ? P.y - 50 : f.hy + Math.sin(f.t * 1.4) * 10;
        freeMove(f, Math.sign(tx - f.x) * Math.min(Math.abs(tx - f.x), 70 * dt), Math.sign(ty - f.y) * Math.min(Math.abs(ty - f.y), 60 * dt));
        f.f = Math.sign(dx) || f.f;
        if (on && f.cd <= 0) {
          const m = pick(f, [[adx < 140 ? 1.4 : 0, 'divewind'], [hasMove(f, 2) && adx < 120 ? 1.1 : 0, 'circle'], [hasMove(f, 3) && adx < 220 ? 1.1 : 0, 'volley'],
            [hasMove(f, 4) && adx < 160 ? 1 : 0, 'scatterwind'], [hasMove(f, 5) && adx < 200 ? 1 : 0, 'wallwind']]);
          if (m === 'volley') f.n = 0; if (m === 'circle') { f.ca = Math.atan2(f.y - P.y, f.x - P.x); }
          if (m && heard(f)) sfx.buzz ? sfx.buzz() : sfx.whoosh();
        }
      } else if (f.state === 'divewind') { freeMove(f, 0, -30 * dt); if (f.t >= 0.4) { setFoeState(f, 'dive'); const d = Math.hypot(dx, P.y - 14 - f.y) || 1; f.svx = dx / d * 220; f.svy = (P.y - 14 - f.y) / d * 220; } }
      else if (f.state === 'dive') {
        if (!freeMove(f, f.svx * dt, f.svy * dt) || f.t >= 0.7) { setFoeState(f, 'walk'); f.cd = 1.2; }
        strike(f, FOE.corns.box(f), 14);
      } else if (f.state === 'circle') {                                                     // round him...
        if (f.ca == null) f.ca = Math.atan2(f.y - P.y, f.x - P.x);
        f.ca += dt * 4; const R = Math.max(26, 70 - f.t * 30);
        freeMove(f, P.x + Math.cos(f.ca) * R - f.x, P.y - 18 + Math.sin(f.ca) * R * 0.6 - f.y);
        if (f.t >= 1.2) { setFoeState(f, 'converge'); }
      } else if (f.state === 'converge') {                                                   // ...and in on him
        freeMove(f, (P.x - f.x) * Math.min(1, dt * 8), (P.y - 16 - f.y) * Math.min(1, dt * 8));
        strike(f, FOE.corns.box(f), 14);
        if (f.t >= 0.4) { setFoeState(f, 'walk'); f.cd = 1.4; }
      } else if (f.state === 'volley') {                                                     // one at a time, at him
        if (f.t >= 0.25 + f.n * 0.2 && f.n < 4) { f.n++; const d = Math.hypot(dx, P.y - 14 - f.y) || 1; shot(f, 'corn', f.x, f.y, dx / d * 200, (P.y - 14 - f.y) / d * 200, 0, drawCornShot, { life: 1.6 }); if (heard(f)) sfx.tink(); }
        if (f.t >= 1.2) { setFoeState(f, 'walk'); f.cd = 1.5; }
      } else if (f.state === 'scatterwind') {                                                // spreading out over him...
        freeMove(f, (P.x - f.x) * Math.min(1, dt * 3), (P.y - 90 - f.y) * Math.min(1, dt * 3));
        if (f.t >= 0.6) { setFoeState(f, 'walk'); f.cd = 1.5; for (let i = 0; i < 4; i++) shot(f, 'corn', f.x + (i - 1.5) * 18, f.y, 0, 60, 500, drawCornShot, { life: 1.6 }); }   // ...and they rain down
      } else if (f.state === 'wallwind') {                                                   // lining up into a wall at the floor... (the red !!)
        const gy = groundFoot(f.x, P.y) ?? P.y;
        freeMove(f, 0, (gy - 4 - f.y) * Math.min(1, dt * 5));
        if (f.t >= 0.6) { setFoeState(f, 'wall'); f.gvx = (Math.sign(dx) || f.f) * 200; }
      } else if (f.state === 'wall') {                                                       // ...and sweeping along it
        if (!freeMove(f, f.gvx * dt, 0) || f.t >= 1.0) { setFoeState(f, 'walk'); f.cd = 1.6; }
        strike(f, FOE.corns.box(f), 20);
      }
    },
    draw(f) {
      const now = f.ang || 0, down = f.state === 'down', wall = f.state === 'wall' || f.state === 'wallwind', fr = down ? 'corn_down' : f.state === 'dive' || f.state === 'converge' ? 'corn_dive' : 'corn_' + (Math.floor(f.t * 10) % 2 + 1);
      const n = f.state === 'volley' ? 5 - (f.n || 0) : 5;
      for (let i = 0; i < n; i++) {
        const a = now + i * 1.26;
        const x = wall ? f.x : f.x + Math.cos(a) * (down ? 6 : 10), y = wall ? f.y - i * 8 : f.y + Math.sin(a) * (down ? 2 : 6);
        drawFoe2(f, fr, x, y + (down ? 4 : 0), 0);
      }
    } },
});
FOE.corns.frame = f => 'corn_1';
})();
