'use strict';
// ---------- the Playground's bosses: the spinning top, the marionette, the clown box ----------

// ---------------------------------------------------------------- the spinning top
// Whirls round the sandbox. While it spins, the sword just glances off it (sparks). Crashing into the sandbox's walls
// makes it wobble, and a parried charge or a squeak knocks it off balance: that's when hits land. It hops and lands
// with a spray of sand that rolls out both ways (jump it), and spins in place kicking sand at you.
BOSS_KINDS.top = {
  soundStates: ['skateWind'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the spinning top', hp: 22,                                                   // (26 down to 22, 10/23/2026: he has no sword work yet when he gets here)
  song: 'top', phase2: 'it spins faster', downText: 'the spinning top is down', starsY: 70,
  wakeSound: () => { sfx.whirl(); setTimeout(() => sfx.whirl(), 200); }, downSound: () => { sfx.thud(); sfx.clunk(); },
  setup(def) { pbSetup(def, { vx: 0, bumps: 0 }); },
  hurtBox: () => ({ l: boss.x - 26, r: boss.x + 26, t: boss.y - 50, b: boss.y }),
  update(dt) {
    const b = boss, dx = P.x - b.x, lo = boss.def.start + 3 * T, hi = boss.def.end - 3 * T, fast = b.phase === 2 ? 1.3 : 1;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    for (const w of b.waves) {
      w.x += w.v * dt;
      if (Math.random() < dt * 30) part(w.x, b.def.y - 2, 0, -60, 0.3, '#dcc08a', 2, 300);
      if (!w.hit && phillAround() && P.y > b.def.y - 16 && Math.abs(P.x - w.x) < 10) { w.hit = true; hurt(w.x - Math.sign(w.v), 'top', 1); }
      if (w.x < lo - 2 * T || w.x > hi + 2 * T) w.dead = true;
    }
    b.waves = b.waves.filter(w => !w.dead);
    if (b.air) {
      b.vy += 900 * dt; b.y += b.vy * dt; b.x = Math.max(lo, Math.min(hi, b.x + b.vx * dt));
      if (b.y >= b.def.y) {
        b.y = b.def.y; b.air = false; shakeT = 0.25; shakeA = 3; sfx.slam(); puff(b.x, b.y, 14, 90, '#dcc08a'); for (const v of [-1, 1]) b.waves.push({ x: b.x + v * 30, v: v * 230 * fast });
        if (phillAround() && bossHit(this.hurtBox()) && bossHeavy(b.x, 'top', 1) === 'parried') { pbStagger(2.2, 'knocked off balance'); return; }   // landing on him: its move the shield can't take (it didn't hurt at all before, only the waves did)
        bossState('spin'); b.cd = 0.8;
      }
      return;
    }
    const spinning = b.state === 'spin' || b.state === 'skate' || b.state === 'storm' || b.state === 'idle';
    if (spinning && Math.random() < dt * 20) part(b.x + (Math.random() * 2 - 1) * 20, b.y - 2, (Math.random() * 2 - 1) * 60, -40, 0.4, '#dcc08a', 1, 300);
    switch (b.state) {
      case 'dormant': if (P.x > b.def.start && P.x < (b.def.end ?? 1e9) && P.ko <= 0 && !scene) playScene(pbIntro([b.x, b.y - 50])); break;
      case 'idle': case 'spin':
        b.x += Math.sign(dx) * 40 * dt * fast; b.x = Math.max(lo, Math.min(hi, b.x));
        if (b.cd <= 0) {
          const r = Math.random();
          if (r < 0.45) { bossState('skateWind'); b.f = Math.sign(dx) || 1; b.bumps = 0; b.charges = 1 + Math.floor(Math.random() * 3); sfx.whirl(); popup(b.x, b.y - 80, '!', '#ff6b5a', true); }   // charges back and forth one to three times before it wobbles, so you can't just wait by the wall for it (a friend's playtest, 10/14/2026)
          else if (r < 0.75) { bossState('hopWind'); bossBigTell(b.x, b.y - 80); }
          else { bossState('storm'); sfx.whirl(); }
        }
        break;
      case 'skateWind': if (b.t >= 0.45 / fast) { bossState('skate'); sfx.whoosh(); } break;
      case 'hopWind': if (b.t >= 0.45 / fast) { b.air = true; b.vy = -540; b.vx = Math.sign(dx) * Math.min(220, Math.abs(dx) * 1.4); sfx.hop(); bossState('hop'); } break;   // a crouch before the hop (it had none)
      case 'skate': {                                                                         // charging across the sandbox
        b.x += b.f * 300 * fast * dt;
        if (!b.hitP && phillAround() && bossHit(this.hurtBox())) {
          b.hitP = true; const out = foeStrike(b.x, 'top', { cost: 20 });
          if (out === 'parried') { pbStagger(2.2, 'knocked off balance'); break; }
          if (out === 'blocked') P.vx = b.f * 200;
        }
        if (b.x <= lo || b.x >= hi) {                                                          // into the sandbox's side: wobble
          b.x = Math.max(lo, Math.min(hi, b.x)); shakeT = 0.2; shakeA = 3; sfx.clunk(); puff(b.x + b.f * 20, b.y - 20, 10, 60, '#dcc08a');
          if (++b.bumps >= (b.charges || 1)) { b.bumps = 0; pbStagger(1.8, 'it wobbles'); } else { b.f = -b.f; b.hitP = false; }
        }
        break;
      }
      case 'storm':                                                                            // spinning in place, flinging sand both ways
        if (Math.floor(b.t / 0.22) !== Math.floor((b.t - dt) / 0.22) && b.t < 1.6) {
          for (const v of [-1, 1]) shots.push({ kind: 'sand', x: b.x + v * 20, y: b.y - 20, vx: v * (120 + Math.random() * 100), vy: -200 - Math.random() * 100, g: 600, from: null, reflected: false, t: 0 });
          sfx.whoosh();
        }
        if (b.t >= 1.9) { bossState('spin'); b.cd = 0.9; }
        break;
      case 'stagger': if (b.t >= b.stagT) { bossState('spin'); b.cd = 0.6; } break;
    }
    if (b.state !== 'stagger' && b.state !== 'falling' && b.state !== 'dormant' && b.state !== 'skate' && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossBumpOk() && bossHit(this.hurtBox())) hurt(b.x, 'top', 1);
  },
  hits(box, a) {
    const b = boss;
    if (b.state === 'stagger' || b.state === 'falling') { pbHit(box, a, this.hurtBox()); return; }
    if (!swingOn(box, this.hurtBox())) return;
    a.hit.add('boss'); a.stopLunge = true; spark(b.x - P.facing * 20, P.y - 20); sfx.tink(); P.recoilT = 0.1; P.recoilV = -P.facing * 220;   // spinning: glances off
    if (a.type === 'down') pogo();
    if (!b.told) { b.told = 1; popup(P.x, P.y - 54, 'it glances off while it spins', '#cfd6e6'); }
  },
  squeaked(x, y, r) { const b = boss; if (!boxReach(this.hurtBox(), x, y, r + 10) || b.state === 'stagger' || b.air) return false; pbStagger(1.0, 'it wobbles'); return true; },
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    if (b.state === 'gone') { spr('top_fall', b.x, b.def.y, false); return; }
    const fr = b.down ? 'top_fall' : b.state === 'stagger' || b.state === 'falling' ? 'top_tilt' : b.air ? 'top_hop' : 'top_spin_' + (Math.floor(b.t * (b.state === 'skate' ? 24 : 14)) % 3 + 1);
    const shake = b.state === 'skateWind' || b.state === 'hopWind' ? Math.round(Math.sin(b.t * 50)) : b.state === 'stagger' ? Math.round(Math.sin(b.t * 9) * 3) : 0;
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(b.x, b.def.y, 22, 2);
    pbDraw(fr, b.x, b.y, b.f > 0, shake);
    for (const w of b.waves) { ctx.fillStyle = '#c4a674'; ctx.fillRect(Math.round(w.x) - 4, b.def.y - 10, 8, 10); ctx.fillStyle = '#ecd6a4'; ctx.fillRect(Math.round(w.x) - 2, b.def.y - 14, 4, 5); }
  },
  dropAt: () => [boss.x, boss.y - 30],
};

// ---------------------------------------------------------------- the marionette
// A wooden puppet hanging off the swing set's top bar by its strings, nobody holding them. It swings across on its
// strings and kicks (jump it), drops down to stomp where you are, and flails its arms. Once it's swung or stomped it
// hangs there loose for a moment, low enough to hit, and a parried kick tangles it in its own strings.
BOSS_KINDS.marionette = {
  soundStates: ['swingWind'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the marionette', hp: 32, song: 'marionette', phase2: 'its strings pull tighter', downText: 'the marionette is down', starsY: 110,
  wakeSound: () => { sfx.creak(); setTimeout(() => sfx.creak(), 300); }, downSound: () => { sfx.clunk(); sfx.thud(); },
  setup(def) { pbSetup(def, { ax: def.x, hang: 0, base: def.y }); },
  hurtBox: () => ({ l: boss.x - 16, r: boss.x + 16, t: boss.y - 100, b: boss.y - 4 }),
  update(dt) {
    const b = boss, dx = P.x - b.x, fast = b.phase === 2 ? 1.3 : 1, lo = 6 * T, hi = room.pxW - 6 * T;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    switch (b.state) {
      case 'dormant': if (Math.abs(dx) < 260 && P.ko <= 0 && !scene) playScene(pbIntro([b.x, b.y - 90])); break;
      case 'idle':                                                                           // dangling, swaying, shuffling toward him
        b.hang = Math.max(0, b.hang - dt * 40); b.y = b.base - 30 + Math.sin(b.t * 2) * 3; b.x += Math.sign(dx) * 26 * dt * fast; b.x = Math.max(lo, Math.min(hi, b.x)); b.f = Math.sign(dx) || b.f;
        if (b.cd <= 0) {
          const r = Math.random();
          if (r < 0.4) { bossState('swingWind'); b.from = b.x; b.to = Math.max(lo, Math.min(hi, b.x + Math.sign(dx || 1) * 280)); sfx.creak(); popup(b.x, b.y - 120, '!', '#ff6b5a', true); }
          else if (r < 0.75) { bossState('rise'); sfx.creak(); bossBigTell(b.x, b.y - 120); }
          else { bossState('flail'); sfx.clunk(); }
        }
        break;
      case 'swingWind': b.y = b.base - 30 - Math.min(40, b.t * 80); if (b.t >= 0.5 / fast) { bossState('swing'); sfx.whoosh(); } break;
      case 'swing': {                                                                        // a big arc across on its strings, kicking low
        const k = Math.min(1, b.t / (0.75 / fast));
        b.x = b.from + (b.to - b.from) * k; b.y = b.base - 70 + Math.sin(Math.PI * k) * 64;
        const hb = { l: b.x - 26, r: b.x + 26, t: b.y - 40, b: b.y };
        if (!b.hitP && phillAround() && bossHit(hb)) {
          b.hitP = true; const out = foeStrike(b.x, 'marionette', { cost: 20 });
          if (out === 'parried') { pbStagger(2.2, 'tangled in its own strings'); b.y = b.base; break; }
        }
        if (k >= 1) { bossState('slack'); b.y = b.base; }
        break;
      }
      case 'rise': b.y = b.base - 30 - Math.min(80, b.t * 160); b.x += (P.x - b.x) * Math.min(1, dt * 3); if (b.t >= 0.7 / fast) { bossState('stomp'); } break;
      case 'stomp':
        b.y = Math.min(b.base, b.y + 700 * dt);
        if (b.y >= b.base) {
          if (!b.landed) { b.landed = true; shakeT = 0.25; shakeA = 3; sfx.slam(); puff(b.x, b.base, 12, 80); if (phillAround() && Math.abs(P.x - b.x) < 30 && P.y > b.base - 40 && bossHeavy(b.x, 'marionette', 1) === 'parried') { b.landed = false; b.y = b.base; pbStagger(2.2, 'tangled in its own strings'); break; } }   // its move the shield can't take
          if (b.t >= 0.4) { b.landed = false; bossState('slack'); }
        }
        break;
      case 'slack': b.y = b.base; if (b.t >= 1.3) { bossState('idle'); b.cd = 0.6 + Math.random() * 0.5; } break;     // loose on the ground: hit it
      case 'flail': {
        const hb = { l: b.x - 44, r: b.x + 44, t: b.y - 90, b: b.y - 40 };
        if (b.t > 0.3 && b.t < 1.0 && !b.hitP && phillAround() && bossHit(hb)) { b.hitP = true; foeStrike(b.x, 'marionette', { cost: 20 }); }
        if (b.t >= 1.2) { bossState('idle'); b.cd = 0.8; }
        break;
      }
      case 'stagger': b.y = b.base; if (b.t >= b.stagT) { bossState('idle'); b.cd = 0.5; } break;
    }
    if (['idle', 'rise', 'swingWind'].includes(b.state) && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossBumpOk() && bossHit({ l: b.x - 12, r: b.x + 12, t: b.y - 90, b: b.y - 6 })) hurt(b.x, 'marionette', 1);
  },
  hits(box, a) {
    const b = boss;
    if (b.state === 'slack' || b.state === 'stagger' || b.state === 'falling') { pbHit(box, a, this.hurtBox()); return; }
    pbHit(box, a, this.hurtBox(), null, 0.5);                                                // up on its strings it's harder to hurt: half
  },
  squeaked(x, y, r) { const b = boss; if (!boxReach(this.hurtBox(), x, y, r + 10) || b.state === 'stagger') return false; pbStagger(0.8); b.y = b.base; return true; },
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    const top = 7 * T + 4;
    if (b.state === 'gone') { spr('marionette_slump', b.x, b.base, b.f > 0); return; }
    const loose = b.state === 'slack' || b.state === 'stagger' || b.down;
    ctx.strokeStyle = 'rgba(230,226,214,0.8)'; ctx.lineWidth = 1;                             // its strings, up to the swing set's top bar
    for (const [sx, ex, ey] of [[-30, -18, -60], [0, 0, -100], [30, 18, -60], [-12, -10, -6], [12, 10, -6]]) {
      ctx.beginPath(); ctx.moveTo(b.x + sx * 0.8, top); ctx.quadraticCurveTo(b.x + sx * 0.5 + (loose ? sx * 0.6 : 0), (top + b.y + ey) / 2 + (loose ? 30 : 0), b.x + ex, b.y + ey); ctx.stroke();
    }
    ctx.fillStyle = '#6e4a30'; ctx.fillRect(Math.round(b.x - 30), top - 3, 60, 5);         // the cross-bar they're tied to, caught on the swing set
    const fr = b.down ? 'marionette_slump' : loose ? 'marionette_slump' : b.state === 'swing' ? 'marionette_kick' : b.state === 'stomp' ? 'marionette_stomp' : b.state === 'flail' ? 'marionette_flail' : 'marionette_hang_' + (Math.floor(b.t * 2) % 2 + 1);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ellipse(b.x, b.base, 18, 2);
    pbDraw(fr, b.x, b.y, b.f > 0);
  },
  dropAt: () => [boss.x, boss.base - 30],
};

// ---------------------------------------------------------------- the clown box
// A big broken jack-in-the-box in the party tent. The clown springs out at you on its coil (parry it and the spring
// goes slack: pile on), throws party poppers in an arc, and the whole box hops across the tent and lands with a bang.
// When the clown's out, it's open to hits; shut in its box, the sword just knocks on wood.
BOSS_KINDS.clown = {
  soundStates: ['lungeWind'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the clown box', hp: 36, song: 'clown', phase2: 'its music box winds faster', downText: 'the clown box is down', starsY: 140,
  wakeSound: () => { sfx.boing(); setTimeout(() => sfx.laugh(), 250); }, downSound: () => { sfx.boing(); sfx.thud(); },
  setup(def) { pbSetup(def, { vx: 0, out: 0 }); },
  headPos() { const b = boss, ext = b.out; return { x: b.x - (b.state === 'lunge' ? b.f * -34 * (b.f > 0 ? -1 : 1) : 0), y: b.y - 48 - 70 * ext }; },
  boxBox: () => ({ l: boss.x - 30, r: boss.x + 30, t: boss.y - 48, b: boss.y }),
  headBox() { const b = boss, hx = b.state === 'lunge' ? b.x + b.f * 34 : b.x, hy = b.y - 48 - 70 * b.out; return { l: hx - 18, r: hx + 18, t: hy - 20, b: hy + 24 }; },
  update(dt) {
    const b = boss, dx = P.x - b.x, fast = b.phase === 2 ? 1.3 : 1, lo = 5 * T, hi = room.pxW - 5 * T;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    const outTo = v => { b.out += (v - b.out) * Math.min(1, dt * 10); };
    if (b.air) {
      b.vy += 900 * dt; b.y += b.vy * dt; b.x = Math.max(lo, Math.min(hi, b.x + b.vx * dt)); outTo(0.3);
      if (b.y >= b.def.y) { b.y = b.def.y; b.air = false; shakeT = 0.3; shakeA = 4; sfx.slam(); puff(b.x, b.y, 16, 90); if (phillAround() && bossHit(this.boxBox()) && bossHeavy(b.x, 'clown', 2) === 'parried') { pbStagger(2.2, 'it tips over'); return; } bossState('idle'); b.cd = 0.7; }   // landing on him: its move the shield can't take
      return;
    }
    switch (b.state) {
      case 'dormant': outTo(0); if (Math.abs(dx) < 280 && P.ko <= 0 && !scene) playScene(pbIntro([b.x, b.y - 80])); break;
      case 'wake': outTo(1); break;
      case 'idle':
        outTo(0.6); b.f = Math.sign(dx) || b.f;
        if (b.cd <= 0) {
          const r = Math.random();
          if (Math.abs(dx) < 160 && r < 0.45) { bossState('lungeWind'); sfx.ticking(); popup(b.x, b.y - 150, '!', '#ff6b5a', true); }
          else if (r < 0.7) { bossState('throw'); b.shots = b.phase === 2 ? 3 : 2; }
          else { bossState('hopWind'); bossBigTell(b.x, b.y - 150); }
        }
        break;
      case 'lungeWind': outTo(0.2); if (b.t >= 0.5 / fast) { bossState('lunge'); sfx.boing(); } break;
      case 'hopWind': outTo(0.2); if (b.t >= 0.45 / fast) { b.air = true; b.vy = -560; b.vx = Math.sign(dx) * Math.min(260, Math.abs(dx) * 1.3); sfx.boing(); bossState('hop'); } break;   // a crouch before the hop (it had none)
      case 'lunge': {                                                                         // the clown springing out at him
        outTo(1);
        const hb = this.headBox();
        if (!b.hitP && phillAround() && bossHit(hb)) {
          b.hitP = true; const out = foeStrike(b.x, 'clown', { cost: 20 });
          if (out === 'parried') { pbStagger(2.2, 'its spring goes slack'); break; }
        }
        if (b.t >= 0.5) { bossState('idle'); b.cd = 0.6 + Math.random() * 0.5; }
        break;
      }
      case 'throw':                                                                           // party poppers, lobbed
        outTo(0.85);
        if (b.t >= 0.4) {
          const sx = b.x, sy = b.y - 110, tx = P.x + (Math.random() * 2 - 1) * 30, ty = P.y - 10, time = 0.8;
          shots.push({ kind: 'popper', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 600 * time, g: 600, from: null, reflected: false, t: 0,
            draw: s => { ctx.fillStyle = '#2a2030'; ctx.fillRect(Math.round(s.x) - 3, Math.round(s.y) - 5, 7, 10); ctx.fillStyle = ['#e04a5a', '#4a8ae0', '#e8c84a'][Math.floor(s.t * 8) % 3]; ctx.fillRect(Math.round(s.x) - 2, Math.round(s.y) - 4, 5, 8); },
            back: () => { const hb = BOSS_KINDS.clown.headBox(); return { x: (hb.l + hb.r) / 2, y: (hb.t + hb.b) / 2 }; },
            onReflectHit: s => { const hb = BOSS_KINDS.clown.headBox(); if (s.x > hb.l && s.x < hb.r && s.y > hb.t && s.y < hb.b) { boss.flash = 0.15; spark(s.x, s.y); sfx.pop(); pbDamage(2); return true; } return false; } });
          sfx.throwIt();
          if (--b.shots > 0) b.t = 0.15; else { bossState('idle'); b.cd = 1.2; }
        }
        break;
      case 'stagger': outTo(0.35); if (b.t >= b.stagT) { bossState('idle'); b.cd = 0.5; } break;
      case 'falling': outTo(0.4); break;
    }
    if (b.state !== 'stagger' && b.state !== 'falling' && b.state !== 'dormant' && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossBumpOk() && bossHit(this.boxBox())) hurt(b.x, 'clown', 1);
  },
  hits(box, a) {
    const b = boss;
    if (b.state === 'stagger') {                                                              // slumped on its spring: anywhere on it counts
      const h = this.headBox(), bb = this.boxBox(), all = { l: Math.min(h.l, bb.l), r: Math.max(h.r, bb.r), t: h.t, b: bb.b };
      if (swingOn(box, all)) { pbHit(box, a, all); return; }                               // (the whole of it: a hit on just the box was being thrown away, the enemy audit 10/17/2026)
    }
    if (b.out > 0.45 && swingOn(box, this.headBox())) { pbHit(box, a, this.headBox()); return; }
    if (swingOn(box, this.boxBox())) { a.hit.add('boss'); a.stopLunge = true; spark(P.x + P.facing * 16, P.y - 20); sfx.tok(); P.recoilT = 0.1; P.recoilV = -P.facing * 200; if (a.type === 'down') pogo(); if (!b.told) { b.told = 1; popup(P.x, P.y - 54, 'knock knock. hit the clown, not the box', '#cfd6e6'); } }
  },
  squeaked(x, y, r) { const b = boss, h = this.headBox(), bb = this.boxBox(); if (!boxReach({ l: Math.min(h.l, bb.l), r: Math.max(h.r, bb.r), t: h.t, b: bb.b }, x, y, r + 10) || b.state === 'stagger' || b.air) return false; pbStagger(1.0, 'it covers its ears'); return true; },
  falling(dt) { boss.out += (0.4 - boss.out) * Math.min(1, dt * 10); },             // (beaten: its head still sags out on the spring)
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    if (b.state === 'gone') { spr('clown_down', b.x, b.def.y, b.f > 0); return; }
    const fr = b.down ? 'clown_down' : b.state === 'dormant' ? 'clown_box' : b.air ? 'clown_hop' : b.state === 'lunge' ? 'clown_lunge' : b.state === 'throw' ? 'clown_throw' : b.state === 'stagger' || b.state === 'falling' ? 'clown_hurt' : b.state === 'lungeWind' || b.state === 'hopWind' ? 'clown_hop' : 'clown_pop';
    const shake = b.state === 'lungeWind' || b.state === 'hopWind' ? Math.round(Math.sin(b.t * 50)) : 0;
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(b.x, b.def.y, 32, 2);
    pbDraw(fr, b.x, b.y, b.f > 0, shake);
  },
  dropAt: () => [boss.x, boss.def.y - 30],
};
