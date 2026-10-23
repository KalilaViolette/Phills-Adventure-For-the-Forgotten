'use strict';
// ---------- the Pond's bosses: the toy sailboat, the tangle of fishing line, the swan floatie ----------
// Each one plugs into boss.js through BOSS_KINDS. Unlike the tin soldier none of them are armored: hits always count.
// Parrying their big attacks knocks them off balance for a moment, and that's when to pile on.
const PB_DMG = { side: 1, up: 1, low: 1, down: 1, rollslash: 2, charged: 4, chargedchop: 4, chargedwhirl: 4 };
const me = () => ({ l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y });
// mult: how hurt it is by this hit (the marionette and the kite up out of reach take half). It goes in before the hit's
// taken off, so whether it's beaten, or into its second half, goes by what the hit really did (the enemy audit
// 10/17/2026: they were being beaten with a quarter of a hit left, and a combo's extra wasn't halved)
function pbHit(box, a, hurtBox, onHit, mult = 1) {          // his sword reaching one of them
  const b = boss;
  if (b.state === 'falling' || b.down || b.ending) return;
  if (!swingOn(box, hurtBox)) return;
  a.hit.add('boss'); a.stopLunge = true;
  const K = bossKind(), [cx, cy] = swordContact(hurtBox);                                // (where the blade meets it)
  const dmg = bossDmg(PB_DMG, a) * swordBonus() * (b.state === 'stagger' ? 1.5 : 1) * (a.scale || 1) * mult;   // scale: the spin's follow-up hits are weaker
  b.flash = 0.12; impact(cx, cy, P.facing, isCharged(a.type) ? 1.8 : mult < 1 ? 0.8 : 1.2, mult < 1 ? 'braced' : 'clean');
  hitstop = Math.max(hitstop, isCharged(a.type) ? 0.12 : 0.05); shakeT = 0.1; shakeA = 2; sfx.hit(); rally();
  if (a.type === 'down') pogo(); else { P.recoilT = 0.08; P.recoilV = -P.facing * 120; }
  if (onHit) onHit(cx, cy);
  pbDamage(dmg);
}
// every bit of damage a Pond, Playground or Oak boss takes goes through here, a sword hit or its own shot batted back:
// into its second half at half health, beaten at none, and beaten just the once
function pbDamage(dmg) {
  const b = boss, K = bossKind();
  if (!b || b.state === 'falling' || b.down || b.ending) return;
  b.hp -= dmg;
  if (b.phase === 1 && b.hp <= K.hp / 2) { b.phase = 2; popup(b.x, b.y - 110, K.phase2, '#ff8a6b'); }
  if (b.hp <= 0) { b.ending = true; playScene(pbDown()); }
}
function pbStagger(time, msg) { if (boss.ending || boss.state === 'falling' || boss.down) return; bossState('stagger'); boss.stagT = time; if (msg) popup(boss.x, boss.y - 110, msg, '#ffd36b'); }
function pbSetup(def, extra) {
  if (world.flags[def.flag]) { boss = Object.assign({ def, x: def.x, y: def.y, f: -1, state: 'gone', t: 0 }, extra); return; }
  boss = Object.assign({ def, x: def.x, y: def.y, f: def.f || -1, hp: BOSS_KINDS[def.kind].hp, state: 'dormant', t: 0, cd: 1, flash: 0, phase: 1, hitP: false, waves: [] }, extra);
}
function pbIntro(look) {
  const b = boss, K = bossKind();
  return [
    run(() => { bossWalls(true); sfx.thorns(); music.play(null); }),
    bars(true), camTo(look[0], look[1], 0.8), wait(0.5),
    run(() => { bossState('wake'); K.wakeSound(); shakeT = 0.2; shakeA = 2; }), wait(0.9),
    run(() => { popup(b.x, b.y - 120, K.name, '#e8e6f0', true); music.play(K.song); }), wait(0.6), camBack(), bars(false),
    run(() => { bossState('idle'); b.cd = 0.8; }),
  ];
}
function pbDown() {
  const b = boss, K = bossKind();
  return [
    run(() => { bossState('falling'); bossEnd(); hitstop = 0.25; music.play(null); P.vx = 0; }),
    bars(true), camTo(b.x, b.y - 60, 0.6),
    (t, dt) => { if (Math.random() < dt * 50) part(b.x + (Math.random() * 2 - 1) * 30, b.y - 20 - Math.random() * 60, (Math.random() * 2 - 1) * 140, -Math.random() * 160, 0.9, Math.random() < 0.5 ? '#2c1c3c' : '#4a3462', 2, 300); return t > 1.2; },
    run(() => { b.down = true; shakeT = 0.4; shakeA = 4; K.downSound(); }),
    wait(1.0),
    run(() => {
      world.flags[b.def.flag] = true; saveWorld(); bossWalls(false); sfx.idea();
      for (let i = 0; i < 16; i++) dropAcorn(K.dropAt ? K.dropAt()[0] : b.x, K.dropAt ? K.dropAt()[1] : b.y - 30);
      popup(b.x, b.y - 90, K.downText, '#ffd36b', true);
      b.state = 'gone';
    }),
    wait(0.8), camBack(), bars(false), run(() => music.play(room.def.music)),
  ];
}
function pbDraw(fr, x, y, flip, shake = 0) {
  const b = boss;
  spr(fr, x + shake, y, flip);
  if (b.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, x + shake, y, flip, 0.55); ctx.globalCompositeOperation = 'source-over'; }
  if (b.state === 'stagger') for (let i = 0; i < 4; i++) { const a = b.t * 7 + i * 1.6; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(x + Math.cos(a) * 16) - 1, Math.round(y - (bossKind().starsY || 100) + Math.sin(a) * 3), 2, 2); }
}
function drawReedWall(x, y, w, h) {                // reeds springing up across the way out while the fight's on
  ctx.fillStyle = '#1a2a14'; ctx.fillRect(x, y, w, h);
  for (let k = 0; k < 6; k++) { ctx.fillStyle = k % 2 ? '#4e6a30' : '#3a5226'; ctx.fillRect(x + 1 + k * 5, y, 3, h); ctx.fillStyle = '#86a850'; ctx.fillRect(x + 1 + k * 5, y + (k * 7) % 12, 1, h - 12); }
  ctx.fillStyle = '#6a4024'; for (let k = 0; k < 3; k++) ctx.fillRect(x + 4 + k * 10, y - 6 + (k % 2) * 4, 4, 10);
}
const pbWalls = () => { if (boss.walled) for (const [x0, y0, x1, y1] of boss.def.walls) drawReedWall(x0 * T, y0 * T, (x1 - x0 + 1) * T, (y1 - y0 + 1) * T); };

// ---------------------------------------------------------------- the toy sailboat
// Sails back and forth over the open water between the lily pads. Swings its boom across the pads (jump it, or parry
// it to knock the boat over on its side), fires its little cannon (parry the ball back into it), and once it's hurt,
// rams along the water. Hit it from the pads, or bounce down off its sail.
BOSS_KINDS.sailboat = {
  soundStates: ['aim'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the toy sailboat', hp: 34,                                                    // (44 down to 34, 10/23/2026: he has no sword work yet when he gets here)
  song: 'sailboat', phase2: 'it trims its sail and picks up speed', downText: 'the sailboat is down', starsY: 118,
  wakeSound: () => { sfx.creak(); setTimeout(() => sfx.boom(), 300); }, downSound: () => { sfx.creak(); sfx.splash(2); },
  setup(def) { pbSetup(def, { vx: 0, y: def.y + 6 }); },
  hurtBox: () => ({ l: boss.x - 52, r: boss.x + 54, t: boss.y - 96, b: boss.y + 2 }),
  update(dt) {
    const b = boss, dx = P.x - b.x;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    const fast = b.phase === 2 ? 1.5 : 1;
    const sail = sp => { b.x += b.f * sp * dt; if (b.x < 5 * T) { b.x = 5 * T; b.f = 1; } if (b.x > room.pxW - 6 * T) { b.x = room.pxW - 6 * T; b.f = -1; } };
    if (b.state !== 'dormant' && b.state !== 'falling' && Math.random() < dt * 3) part(b.x + (Math.random() * 2 - 1) * 40, b.y + 2, 0, 10, 0.6, '#2c1c3c', 2, 100);   // Grime streaming off it
    switch (b.state) {
      case 'dormant': if ((Math.abs(dx) < 300 || P.x < b.def.start) && P.ko <= 0 && !scene) playScene(pbIntro([b.x, b.y - 70])); break;
      case 'idle':
        sail(60 * fast);
        if (b.cd <= 0) {
          const r = Math.random();
          if (Math.abs(dx) < 120 && r < 0.55) { bossState('swingWind'); sfx.creak(); popup(b.x, b.y - 120, '!', '#ff6b5a', true); b.f = Math.sign(dx) || b.f; }
          else if (b.phase === 2 && r < 0.35) { bossState('ramWind'); b.f = Math.sign(dx) || b.f; sfx.creak(); bossBigTell(b.x, b.y - 120); }
          else { bossState('aim'); b.f = Math.sign(dx) || b.f; sfx.windup(); b.shots = b.phase === 2 ? 2 : 1; }
        }
        break;
      case 'swingWind': if (b.t >= 0.6 / fast) { bossState('swing'); sfx.whip(); } break;
      case 'swing': {                                                                // the boom sweeping across the pads, low
        const reach = 100, hb = { l: b.f < 0 ? b.x - reach : b.x - 10, r: b.f < 0 ? b.x + 10 : b.x + reach, t: b.y - 40, b: b.y - 14 };
        if (!b.hitP && phillAround() && bossHit(hb)) {
          b.hitP = true; const out = foeStrike(b.x, 'sailboat', { cost: 20, y: (hb.t + hb.b) / 2 });   // (y: where it comes from, for the lid in the water)
          if (out === 'parried') { pbStagger(2.0, 'knocked over on its side'); break; }
        }
        if (b.t >= 0.35) { bossState('idle'); b.cd = 0.9 + Math.random() * 0.6; }
        break;
      }
      case 'aim':
        if (b.t >= 0.55) {
          sfx.boom(); bossState('fire');
          const sx = b.x + b.f * 50, sy = b.y - 30, tx = P.x, ty = P.y - 18, time = Math.max(0.6, Math.min(1.1, Math.abs(tx - sx) / 240));
          shots.push({ kind: 'ball', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 500 * time, g: 500, from: null, reflected: false, t: 0,
            back: () => { const hb = BOSS_KINDS.sailboat.hurtBox(); return { x: (hb.l + hb.r) / 2, y: (hb.t + hb.b) / 2 }; },
            onReflectHit: s => { const hb = BOSS_KINDS.sailboat.hurtBox(); if (s.x > hb.l && s.x < hb.r && s.y > hb.t && s.y < hb.b) { boss.flash = 0.15; spark(s.x, s.y); sfx.boom(); pbStagger(1.6, 'right back at it'); pbDamage(3); return true; } return false; } });
          for (let i = 0; i < 6; i++) part(sx, sy, b.f * 40 + (Math.random() * 2 - 1) * 30, -Math.random() * 40, 0.5, '#d0d0d8', 2, 0);
        }
        break;
      case 'fire': if (b.t >= 0.4) { if (--b.shots > 0) { bossState('aim'); b.t = 0.25; } else { bossState('idle'); b.cd = 1.2 + Math.random() * 0.6; } } break;
      case 'ramWind': if (b.t >= 0.7) { bossState('ram'); sfx.whoosh(); } break;
      case 'ram':
        sail(260);
        if (Math.random() < dt * 30) part(b.x - b.f * 50, b.y, -b.f * 60, -60, 0.4, '#c4e6e0', 2, 400);
        if (!b.hitP && phillAround() && P.inv <= 0 && !dodgeSafe() && bossHit({ l: b.x - 50, r: b.x + 50, t: b.y - 30, b: b.y + 4 })) { b.hitP = true; if (bossHeavy(b.x, 'sailboat', 1, b.y - 13) === 'parried') pbStagger(2.0, 'knocked over on its side'); }   // its move the shield can't take
        if (b.t >= 1.3) { bossState('idle'); b.cd = 0.8; }
        break;
      case 'stagger': if (b.t >= b.stagT) { bossState('idle'); b.cd = 0.5; } break;
    }
    // bumping into the hull
    if (b.state !== 'stagger' && b.state !== 'falling' && b.state !== 'dormant' && b.state !== 'ram' && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossBumpOk() && bossHit({ l: b.x - 44, r: b.x + 44, t: b.y - 24, b: b.y + 4 })) hurt(b.x, 'sailboat', 1);
  },
  hits(box, a) { pbHit(box, a, this.hurtBox()); },
  squeaked(x, y, r) { const b = boss; if (!boxReach(this.hurtBox(), x, y, r + 10) || b.state === 'stagger') return false; pbStagger(0.6); return true; },
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    const bob = Math.round(Math.sin(performance.now() / 400) * 1.5);
    const fr = b.state === 'gone' || b.down ? 'sailboat_sink' : b.state === 'swing' ? 'sailboat_swing' : b.state === 'fire' ? 'sailboat_fire' : b.state === 'stagger' ? 'sailboat_hurt' : b.state === 'falling' ? 'sailboat_hurt' : 'sailboat_sail_' + (Math.floor(b.t * 2) % 2 + 1);
    if (b.state === 'gone') { ctx.globalAlpha = 0.5; spr('sailboat_sink', b.x, b.y + 30, b.f > 0); ctx.globalAlpha = 1; return; }
    const shake = b.state === 'swingWind' || b.state === 'ramWind' ? Math.round(Math.sin(b.t * 50)) : 0;
    pbDraw(fr, b.x, b.y + bob + (b.down ? 20 : 0), b.f > 0, shake);
    ctx.fillStyle = 'rgba(220,240,240,0.5)'; ctx.fillRect(Math.round(b.x - 56), Math.round(b.y + 3), 112, 1);   // where it sits in the water
  },
  dropAt: () => [boss.x, boss.y - 40],
};

// ---------------------------------------------------------------- the tangle
// A mass of old fishing line hanging off the sunken branch, Phill swimming round it. Whips its loose lines at him (parry
// one and the knot loosens: hit it then), swings its lure round in a big circle, and reels him in close.
// It fights back against being hacked at (a friend's playtest, 10/14/2026: it couldn't move, so you could float there
// mashing attack and the spin, healing off it as you went). Outside an opening, hits only do half. Three hits in quick
// succession and it pulls all its lines tight: they lash out all round the knot (roll away or parry it), and the knot
// stays pulled tight for a couple of seconds where the sword just glances off. Hits while it's loose (staggered) count
// full and never set it off
const TANGLE_POKES = 3, TANGLE_POKE_TIME = 1.8, TANGLE_BRISTLE_WIND = 0.45, TANGLE_BRISTLE_R = 84, TANGLE_TIGHT = 2.2;
BOSS_KINDS.tangle = {
  soundStates: ['lure'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the tangle', hp: 28, song: 'tangle', phase2: 'it lets out more line', downText: 'the tangle is down', starsY: 4,
  wakeSound: () => { sfx.reel(); setTimeout(() => sfx.whip(), 350); }, downSound: () => { sfx.reel(); sfx.thud(); },
  setup(def) { pbSetup(def, { y: 5 * T, lures: [] }); },
  knot: () => ({ x: boss.x + (boss.sway || 0), y: boss.y + 60 }),
  hurtBox() { const k = this.knot(); return { l: k.x - 26, r: k.x + 26, t: k.y - 22, b: k.y + 22 }; },
  update(dt) {
    const b = boss, K = this;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt; b.clock = (b.clock || 0) + dt;
    b.sway = Math.sin(performance.now() / 900) * 6 + (b.state === 'lash' ? -b.f * 8 : 0) + (b.state === 'bristle' && !b.snapped ? Math.sin(b.t * 60) * 2 : 0);
    const k = K.knot(), dx = P.x - k.x, dy = (P.y - 10) - k.y;
    for (const L of b.lures) {                                                      // the lure going round
      L.a += dt * L.sp; L.x = k.x + Math.cos(L.a) * L.r; L.y = k.y + Math.sin(L.a) * L.r * 0.8;
      if (phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && Math.hypot(P.x - L.x, P.y - 10 - L.y) < 12) hurt(L.x, 'tangle', 1);
      L.life -= dt;
    }
    b.lures = b.lures.filter(L => L.life > 0);
    switch (b.state) {
      case 'dormant': if (Math.abs(P.x - b.x) < 240 && P.ko <= 0 && !scene) playScene(pbIntro([b.x, b.y + 80])); break;
      case 'idle':
        if (b.cd <= 0) {
          const r = Math.random(), d = Math.hypot(dx, dy);
          if (d < 150 && r < 0.5) { bossState('lashWind'); b.target = { x: P.x, y: P.y - 10 }; b.f = Math.sign(dx) || 1; sfx.reel(); popup(k.x, k.y - 44, '!', '#ff6b5a', true); }
          else if (r < 0.75 || !b.lures.length) { bossState('lure'); sfx.whip(); }
          else { bossState('reel'); sfx.reel(); }
        }
        break;
      case 'lashWind': if (b.t >= (b.phase === 2 ? 0.4 : 0.55)) { bossState('lash'); sfx.whip(); } break;
      case 'lash': {                                                                // a line snapping out from the knot at where he was
        const tx = b.target.x, ty = b.target.y, kk = Math.min(1, b.t / 0.12), ex = k.x + (tx - k.x) * 1.25 * kk, ey = k.y + (ty - k.y) * 1.25 * kk;
        b.lashEnd = [ex, ey];
        const px = P.x, py = P.y - 10, vx = ex - k.x, vy = ey - k.y, L2 = vx * vx + vy * vy || 1, u = Math.max(0, Math.min(1, ((px - k.x) * vx + (py - k.y) * vy) / L2));
        if (!b.hitP && phillAround() && Math.hypot(k.x + vx * u - px, k.y + vy * u - py) < 12) {
          b.hitP = true; const out = foeStrike(k.x, 'tangle', { cost: 20, y: k.y });
          if (out === 'parried') { pbStagger(2.0, 'the knot comes loose'); b.lashEnd = null; break; }
        }
        if (b.t >= 0.3) { b.lashEnd = null; bossState('idle'); b.cd = 0.6 + Math.random() * 0.5; }
        break;
      }
      case 'lure':
        if (b.t >= 0.4) {
          const n = b.phase === 2 ? 2 : 1;
          for (let i = 0; i < n; i++) b.lures.push({ a: Math.random() * 6 + i * Math.PI, r: 90 + i * 30, sp: (i ? -1 : 1) * (b.phase === 2 ? 2.4 : 1.8), life: 4, x: k.x, y: k.y });
          bossState('idle'); b.cd = 1.4;
        }
        break;
      case 'reel':                                                                  // pulling him in close, then the lines snap at him
        if (phillAround() && b.t < 1.0) { P.vx += -Math.sign(dx) * 260 * dt; P.vy += -Math.sign(dy) * 160 * dt; }
        if (b.t >= 1.0 && !b.snapped) { b.snapped = true; shakeT = 0.2; shakeA = 2; sfx.whip(); if (phillAround() && Math.hypot(dx, dy) < 60) { const out = foeStrike(k.x, 'tangle', { cost: 20, y: k.y }); if (out === 'parried') pbStagger(2.0, 'the knot comes loose'); } }
        if (b.t >= 1.4) { b.snapped = false; if (b.state === 'reel') { bossState('idle'); b.cd = 0.8; } }
        break;
      case 'stagger': if (b.t >= b.stagT) { bossState('idle'); b.cd = 0.5; } break;
      case 'bristle':                                                               // every line pulled tight, then lashing out all round
        if (b.t >= TANGLE_BRISTLE_WIND && !b.snapped) {
          b.snapped = true; shakeT = 0.25; shakeA = 3; sfx.whip(); setTimeout(() => sfx.whip(), 60);
          for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; part(k.x + Math.cos(a) * 20, k.y + Math.sin(a) * 20, Math.cos(a) * 260, Math.sin(a) * 260, 0.25, '#c8d6d6', 1, 0); }
          if (phillAround() && Math.hypot(dx, dy) < TANGLE_BRISTLE_R) { const out = bossHeavy(k.x, 'tangle', 1, k.y); if (out === 'parried') { pbStagger(2.0, 'the knot comes loose'); b.snapped = false; break; } }   // its move the shield can't take
          b.tightT = TANGLE_TIGHT;
        }
        if (b.t >= TANGLE_BRISTLE_WIND + 0.3) { b.snapped = false; bossState('idle'); b.cd = 0.5; }
        break;
    }
    b.tightT = Math.max(0, (b.tightT || 0) - dt);
    if (b.state !== 'stagger' && b.state !== 'falling' && b.state !== 'dormant' && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossBumpOk() && bossHit(K.hurtBox())) hurt(k.x, 'tangle', 1);
  },
  hits(box, a) {
    const b = boss;
    for (const L of b.lures) if (overlap(box, { l: L.x - 8, r: L.x + 8, t: L.y - 8, b: L.y + 8 })) { L.life = 0; spark(L.x, L.y); sfx.tink(); popup(L.x, L.y - 14, 'snip', '#e8e6f0'); }   // cut the lure off
    if (b.state === 'stagger' || b.state === 'falling') { pbHit(box, a, this.hurtBox()); return; }   // loose: everything counts
    if (!swingOn(box, this.hurtBox())) return;
    if (b.tightT > 0 || b.state === 'bristle') {                                   // pulled tight: the sword glances off
      a.hit.add('boss'); a.stopLunge = true; const k = this.knot(); spark(k.x - P.facing * 14, k.y); sfx.tink(); P.recoilT = 0.1; P.recoilV = -P.facing * 180;
      if (!b.toldTight) { b.toldTight = 1; popup(P.x, P.y - 54, "it's pulled tight. wait for an opening", '#cfd6e6'); }
      return;
    }
    const now = b.clock || 0;
    b.pokes = (b.pokes || []).filter(t => now - t < TANGLE_POKE_TIME); b.pokes.push(now);
    const half = Object.assign({}, a, { scale: (a.scale || 1) * 0.5 });             // hacking at it outside an opening only does half
    pbHit(box, half, this.hurtBox()); a.stopLunge = true;
    if (b.hp > 0 && b.pokes.length >= TANGLE_POKES) { b.pokes = []; bossState('bristle'); sfx.reel(); const k = this.knot(); popup(k.x, k.y - 44, 'it pulls its lines tight', '#ff8a6b'); bossBigTell(k.x, k.y - 58); }
  },
  squeaked(x, y, r) { const k = this.knot(); if (Math.hypot(k.x - x, k.y - y) > r + 30 || boss.state === 'stagger') return false; pbStagger(1.0, 'it shudders'); return true; },
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    if (b.state === 'gone') { spr('tangle_down', b.x, b.y + 200, false); return; }
    const k = this.knot();
    const fr = b.down ? 'tangle_down' : b.state === 'lash' || b.state === 'lashWind' ? 'tangle_lash' : b.state === 'reel' ? 'tangle_reel' : b.state === 'stagger' || b.state === 'falling' ? 'tangle_hurt' : 'tangle_hang_' + (Math.floor(b.t * 1.5) % 2 + 1);
    pbDraw(fr, b.x + (b.sway || 0) * 0.5, b.y + (b.down ? b.t * 40 : 0), b.f > 0);
    ctx.strokeStyle = 'rgba(200,214,214,0.9)'; ctx.lineWidth = 1;
    if (b.lashEnd) { ctx.beginPath(); ctx.moveTo(k.x, k.y); ctx.lineTo(b.lashEnd[0], b.lashEnd[1]); ctx.stroke(); }
    for (const L of b.lures) { ctx.beginPath(); ctx.moveTo(k.x, k.y); ctx.lineTo(L.x, L.y); ctx.stroke(); spr('lure', L.x, L.y - 8, false); }
    if (b.state === 'reel' && b.t < 1) { ctx.beginPath(); ctx.moveTo(k.x, k.y); ctx.lineTo(P.x, P.y - 12); ctx.stroke(); }
    if (b.state === 'bristle' || b.tightT > 0) {                                   // its lines pulled taut all round the knot
      const reach = b.state === 'bristle' && !b.snapped ? 22 + b.t / TANGLE_BRISTLE_WIND * 10 : b.state === 'bristle' ? TANGLE_BRISTLE_R : 26;
      ctx.strokeStyle = b.state === 'bristle' ? 'rgba(255,200,190,0.95)' : 'rgba(220,230,230,0.8)';
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + (b.clock || 0) * 0.3; ctx.beginPath(); ctx.moveTo(k.x + Math.cos(a) * 12, k.y + Math.sin(a) * 12); ctx.lineTo(k.x + Math.cos(a) * reach, k.y + Math.sin(a) * reach); ctx.stroke(); }
    }
  },
  dropAt: () => [boss.x, boss.y + 80],
};

// ---------------------------------------------------------------- the swan
// A huge inflatable swan pool float bobbing in the old kiddie pool. Bounces up and slams down where he is (a wave runs
// out both ways: jump it), honks a blast along the ground, and lunges its long neck to bite (parry it and its head
// flops down: pile on). Every hit lets a little more air out.
BOSS_KINDS.swan = {
  soundStates: ['honkWind'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the swan', hp: 36, song: 'swan', phase2: 'air whistles out of it. it gets angry', downText: 'the swan is down', starsY: 110,
  wakeSound: () => { sfx.honk(); }, downSound: () => { sfx.hiss(); setTimeout(() => sfx.hiss(), 300); },
  setup(def) { pbSetup(def, { y: def.y + 8, base: def.y + 8, vy: 0, air: false }); },
  hurtBox: () => ({ l: boss.x - 50, r: boss.x + 60, t: boss.y - 70, b: boss.y }),
  update(dt) {
    const b = boss, dx = P.x - b.x, SURF = 27 * T + 12;           // where he floats on the pool
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    const lo = 15 * T, hi = 45 * T, fast = b.phase === 2 ? 1.35 : 1;
    for (const w of b.waves) {
      w.x += w.v * dt;
      if (Math.random() < dt * 30) part(w.x, w.y - 2, 0, -60, 0.3, '#c8e0f0', 2, 300);
      if (!w.hit && phillAround() && Math.abs(P.y - w.y) < 18 && Math.abs(P.x - w.x) < 10) { w.hit = true; hurt(w.x - Math.sign(w.v), 'swan', 1); }
      if (w.x < 2 * T || w.x > room.pxW - 2 * T) w.dead = true;
    }
    b.waves = b.waves.filter(w => !w.dead);
    if (b.air) {                                                                     // up in the air from a bounce
      b.vy += 900 * dt; b.y += b.vy * dt; b.x += (b.tx - b.x) * Math.min(1, dt * 2.5);
      if (b.y >= b.base) {
        b.y = b.base; b.air = false; b.vy = 0; shakeT = 0.3; shakeA = 4; sfx.slam(); splash(b.x, b.base - 6, 20, 1.6);
        for (const v of [-1, 1]) { b.waves.push({ x: b.x + v * 50, y: SURF, v: v * 220 * fast }); b.waves.push({ x: b.x + v * 50, y: 26 * T, v: v * 220 * fast }); }   // along the top of the water (dive under it or leap it) and along the rim
        if (phillAround() && bossHit(this.hurtBox()) && bossHeavy(b.x, 'swan', 2, b.y - 35) === 'parried') { b.bounces = 0; pbStagger(2.0, 'it tips over'); return; }   // its move the shield can't take
        if (--b.bounces > 0) { b.air = true; b.vy = -560; b.tx = Math.max(lo, Math.min(hi, P.x)); } else { bossState('wobble'); }   // rocking about after the slam: the opening
      }
      return;
    }
    switch (b.state) {
      case 'dormant': if (Math.abs(dx) < 300 && P.ko <= 0 && !scene) playScene(pbIntro([b.x, b.y - 70])); break;
      case 'idle': {                                                                 // keeps a neck's length off him, bobbing, then comes in
        const want = P.x - Math.sign(dx || 1) * 120, step = Math.sign(want - b.x) * Math.min(Math.abs(want - b.x), 40 * dt * fast);
        b.x = Math.max(lo, Math.min(hi, b.x + step)); b.f = Math.sign(dx) || b.f;
        b.y = b.base + Math.sin(b.t * 2) * 2;
        if (b.cd <= 0) {
          const r = Math.random();
          if (Math.abs(dx) < 150 && r < 0.5) { b.x += Math.sign(dx) * Math.min(30, Math.max(0, Math.abs(dx) - 90)); bossState('biteWind'); sfx.hiss(); popup(b.x, b.y - 120, '!', '#ff6b5a', true); }
          else if (r < 0.75) { bossState('bounce'); bossBigTell(b.x, b.y - 120); }
          else { bossState('honkWind'); sfx.inhale(); }   // (a breath in: its wind up was silent)
        }
        break;
      }
      case 'wobble': b.y = b.base + Math.sin(b.t * 18) * 3; if (b.t >= 0.9) { b.y = b.base; bossState('idle'); b.cd = 0.6; } break;
      case 'bounce': if (b.t >= 0.55) { b.air = true; b.vy = -620; b.tx = Math.max(lo, Math.min(hi, P.x)); b.bounces = b.phase === 2 ? 2 : 1; sfx.hop(); } break;
      case 'honkWind': if (b.t >= 0.6 / fast) { bossState('honk'); sfx.honk(); shakeT = 0.2; shakeA = 2; for (const v of [-1, 1]) { b.waves.push({ x: b.x + v * 40, y: SURF, v: v * 260 }); b.waves.push({ x: b.x + v * 40, y: 26 * T, v: v * 260 }); } } break;
      case 'honk': if (b.t >= 0.5) { bossState('idle'); b.cd = 1.0; } break;
      case 'biteWind': if (b.t >= 0.55 / fast) { bossState('bite'); sfx.whoosh(); } break;
      case 'bite': {                                                                  // the neck lunging out low in front
        const hb = { l: b.f < 0 ? b.x - 78 : b.x + 20, r: b.f < 0 ? b.x - 20 : b.x + 78, t: b.y - 64, b: b.y - 10 };   // as far as the neck's drawn reaching
        if (!b.hitP && phillAround() && bossHit(hb)) {
          b.hitP = true; const out = foeStrike(b.x, 'swan', { cost: 20, y: (hb.t + hb.b) / 2 });
          if (out === 'parried') { pbStagger(2.0, 'its head flops down'); break; }
        }
        if (b.t >= 0.4) { bossState('idle'); b.cd = 0.8 + Math.random() * 0.5; }
        break;
      }
      case 'stagger': if (b.t >= b.stagT) { bossState('idle'); b.cd = 0.5; } break;
    }
    // (bumping into the float itself doesn't hurt: it's a pool toy. Only the slam, the bite and the waves do. It was janky)
  },
  hits(box, a) { pbHit(box, a, this.hurtBox(), () => { sfx.hiss(); for (let i = 0; i < 5; i++) part(boss.x + (Math.random() * 2 - 1) * 30, boss.y - 30, (Math.random() * 2 - 1) * 60, -40, 0.4, '#f0f4f8', 1, -10); }); },
  squeaked(x, y, r) { const b = boss; if (!boxReach(this.hurtBox(), x, y, r + 10) || b.state === 'stagger' || b.air) return false; pbStagger(0.7); return true; },
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    if (b.state === 'gone') { spr('swan_deflated', b.x, b.base, b.f > 0); return; }
    const fr = b.down ? 'swan_deflated' : b.air ? (b.vy < 0 ? 'swan_slam' : 'swan_bounce') : b.state === 'bounce' || b.state === 'wobble' ? 'swan_bounce' : b.state === 'honk' || b.state === 'honkWind' ? 'swan_honk' : b.state === 'bite' ? 'swan_bite' : b.state === 'stagger' || b.state === 'falling' ? 'swan_hurt' : 'swan_idle_' + (Math.floor(b.t * 1.5) % 2 + 1);
    const shake = b.state === 'biteWind' || b.state === 'honkWind' ? Math.round(Math.sin(b.t * 50)) : 0;
    pbDraw(fr, b.x, b.y, b.f > 0, shake);
    for (const w of b.waves) { ctx.fillStyle = '#c8e0f0'; ctx.fillRect(Math.round(w.x) - 4, w.y - 10, 8, 10); ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(w.x) - 2, w.y - 14, 4, 5); }
  },
  dropAt: () => [boss.x, 26 * T - 20],
};
