'use strict';
// ---------- the Hive's bosses (New regions.md, Hive.md; 10/18/2026) ----------

(() => {
const S = n => { if (sfx[n]) sfx[n](); };
const live = () => phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story;
const quad = (a, c, b, k) => { const u = 1 - k; return [u * u * a[0] + 2 * u * k * c[0] + k * k * b[0], u * u * a[1] + 2 * u * k * c[1] + k * k * b[1]]; };
const WG = ['#1e5a1e', '#3a8a2a', '#6ac040', '#a8e070'], WO = ['#7a3a0a', '#c06a14', '#f09a2c', '#ffd070'];

// ---------------------------------------------------------------- the Gummy Worm
// A huge sour gummy worm living down in the honey stores, green fading to orange, dusted in sour sugar, a Grime eye in
// its head. The floor's honey the whole fight (slow going, low jumps), with old comb up the far wall to get out of it.
// It stretches right across the room at him low along the floor and snaps back (jump it, get up the comb, or parry it:
// then it's stunned, its head down in the honey), rears up and slams down where he's standing (shield up over his head)
// and its head sticks in the honey a moment, spits sour globs, and (the red !!) dives under the honey and comes up under
// him. Its head's where it can be hurt, and it only really counts while it's stuck or stunned: moving, it's half.
// Halfway it sours: quicker, and it comes up under him twice. Beaten, the drip at the far end's open
BOSS_KINDS.worm = {
  soundStates: ['spitWind'],
  name: 'the Gummy Worm', hp: 34, song: 'worm', phase2: 'it sours', downText: 'the Gummy Worm is down', starsY: 40,
  wakeSound: () => { S('splort'); setTimeout(() => S('splort'), 200); }, downSound: () => { S('splort'); S('thud'); },
  setup(def) { pbSetup(def, { base: def.y, hx: def.x, hy: def.y - 40, rx: def.x + 40, bag: null }); if (boss.state === 'dormant') { boss.hy = def.y + 20; } },
  head: () => ({ l: boss.hx - 14, r: boss.hx + 14, t: boss.hy - 14, b: boss.hy + 12 }),
  camY: () => Math.max(P.y, boss.base - 50),
  update(dt) {
    const b = boss, K = this, fast = b.phase === 2 ? 1.3 : 1, dx = P.x - b.hx, a = bossArena(), base = b.base;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    const sway = () => { b.hx += ((Math.max(a.l + 160, Math.min(a.r - 80, P.x + 150)) ) - b.hx) * Math.min(1, dt * 1.2); b.hy += (base - 48 + Math.sin(b.t * 2) * 6 - b.hy) * Math.min(1, dt * 4); b.rx += (b.hx + 50 - b.rx) * Math.min(1, dt * 2); };
    switch (b.state) {
      case 'dormant': if (P.ground && P.ko <= 0 && !scene) { b.hy = base + 20; playScene(pbIntro([b.hx, base - 60])); } break;
      case 'wake': b.hy += (base - 48 - b.hy) * Math.min(1, dt * 3); break;
      case 'idle':
        sway();
        if (b.cd <= 0) {
          const ok = m => m === 'rear' ? Math.abs(dx) > 30 : true;
          if (!b.bag || !b.bag.length) { b.bag = ['stretch', 'rear', 'dive', 'spit', 'stretch'].concat(b.phase === 2 ? ['dive', 'rear'] : []); for (let i = b.bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b.bag[i], b.bag[j]] = [b.bag[j], b.bag[i]]; } }
          let i = b.bag.findIndex(ok); if (i < 0) i = 0;
          const m = b.bag.splice(i, 1)[0];
          if (m === 'stretch') { bossState('stretchWind'); S('hiss'); popup(b.hx, b.hy - 30, '!', '#ff6b5a', true); }
          else if (m === 'rear') { bossState('rearWind'); b.tx = P.x; S('creak'); popup(b.hx, b.hy - 30, '!', '#ff6b5a', true); }
          else if (m === 'dive') { bossState('dive'); b.dives = b.phase === 2 ? 2 : 1; S('splort'); }
          else { bossState('spitWind'); S('splort'); }
        }
        break;
      case 'stretchWind': b.hx += (b.rx - 20 - b.hx) * Math.min(1, dt * 4); b.hy += (base - 20 - b.hy) * Math.min(1, dt * 4); if (b.t >= 0.6 / fast) { bossState('stretch'); b.sx = b.hx; b.dir = Math.sign(P.x - b.hx) || -1; S('whip'); } break;
      case 'stretch': {                                                                    // right across the room at him, low along the honey...
        const k = Math.min(1, b.t / (0.4 / fast));
        b.hx = Math.max(a.l + 12, Math.min(a.r - 12, b.sx + b.dir * 420 * (1 - (1 - k) * (1 - k)))); b.hy = base - 12;
        if (!b.hitP && b.t > 0.03 && live() && bossHit({ l: Math.min(b.hx, b.rx) - 10, r: Math.max(b.hx, b.rx), t: base - 22, b: base, area: true }, { l: bodyL(P.x), r: bodyR(P.x), t: P.y - P.h, b: P.y })) {
          b.hitP = true; const out = foeStrike(b.hx, 'worm', { cost: 20 });
          if (out === 'parried') { pbStagger(1.6, 'it flops down in the honey'); b.hy = base - 8; break; }
        }
        if (k >= 1) bossState('snap');
        break;
      }
      case 'snap': b.hx += (b.rx - 30 - b.hx) * Math.min(1, dt * 8); b.hy += (base - 40 - b.hy) * Math.min(1, dt * 6); if (b.t >= 0.4) { bossState('idle'); b.cd = (0.7 + Math.random() * 0.4) / fast; } break;
      case 'rearWind':                                                                     // up tall over him...
        if (b.t < 0.5 / fast) b.tx += (Math.max(a.l + 20, Math.min(a.r - 20, P.x)) - b.tx) * Math.min(1, dt * 5);
        b.hx += (b.tx - b.hx) * Math.min(1, dt * 3); b.hy += (base - 170 - b.hy) * Math.min(1, dt * 4);
        if (b.t >= 0.7 / fast) { bossState('slam'); S('whoosh'); }
        break;
      case 'slam':                                                                         // ...and down
        b.hy = Math.min(base - 10, b.hy + 1300 * dt);
        if (!b.hitP && live() && bossHit({ l: b.hx - 14, r: b.hx + 14, t: b.hy - 14, b: b.hy + 14, area: true })) {
          b.hitP = true; const out = foeStrike(b.hx, 'worm', { cost: 22 });
          if (out === 'parried') { pbStagger(1.6, 'it flops down in the honey'); break; }
        }
        if (b.hy >= base - 10) { bossState('stuck'); shakeT = 0.18; shakeA = 3; S('splort'); S('thud'); puff(b.hx, base, 10, 70, '#e8a020'); }
        break;
      case 'stuck': b.hy = base - 10; if (b.t >= (b.phase === 2 ? 0.9 : 1.2)) { bossState('snap'); } break;   // its head stuck in the honey: hit it
      case 'dive': b.hy += 260 * dt; if (b.hy > base + 30) { bossState('under'); b.ux = b.hx; S('splort'); } break;
      case 'under': {                                                                      // under the honey, bubbling along after him (the red !! when it locks on)
        if (b.t < 0.9 / fast) b.ux += Math.sign(P.x - b.ux) * Math.min(Math.abs(P.x - b.ux), 260 * dt);
        else if (!b.told2) { b.told2 = true; bossBigTell(b.ux, base - 50); }
        if (Math.random() < dt * 30) part(b.ux + (Math.random() * 2 - 1) * 10, base - 3, 0, -40, 0.4, '#e8a020', 2, 200);
        b.hx = b.ux; b.hy = base + 30; b.rx = b.ux + 30;
        if (b.t >= 1.2 / fast) { bossState('erupt'); b.told2 = false; S('splort'); puff(b.ux, base, 12, 80, '#e8a020'); }
        break;
      }
      case 'erupt':                                                                        // up out of the honey right under him
        b.hy = Math.max(base - 70, b.hy - 900 * dt); b.hx = b.ux;
        if (!b.hitP && live() && bossHit({ l: b.ux - 14, r: b.ux + 14, t: b.hy - 14, b: base, area: true })) {
          b.hitP = true; const out = bossHeavy(P.x + P.facing, 'worm', 1);   // (from right under him: his shield's in the way whichever way he faces)
          if (out === 'parried') { pbStagger(1.6, 'it flops down in the honey'); break; }
        }
        if (b.t >= 0.6) { if (--b.dives > 0) { bossState('dive'); } else { bossState('idle'); b.cd = 0.8 / fast; } }
        break;
      case 'spitWind':
        sway();
        if (b.t >= 0.5 / fast) {
          for (let i = -1; i <= 1; i++) { const tx = P.x + i * 40, tt = 0.8; shots.push({ kind: 'glob', col: '#6ac040', x: b.hx, y: b.hy - 6, vx: (tx - b.hx) / tt, vy: -300, g: 600, from: null, boss: true, reflected: false, t: 0, life: 2,
            onReflectHit: s => { if (boss && boss.def.kind === 'worm' && overlap({ l: s.x - 4, r: s.x + 4, t: s.y - 4, b: s.y + 4 }, BOSS_KINDS.worm.head())) { pbDamage(2); boss.flash = 0.12; popup(boss.hx, boss.hy - 30, 'right back at it', '#ffd36b'); return true; } return false; },
            draw: s => { ctx.fillStyle = '#2a2030'; ellipse(s.x, s.y, 4, 4); ctx.fillStyle = '#6ac040'; ellipse(s.x, s.y, 3, 3); ctx.fillStyle = '#e8f8c0'; ctx.fillRect(Math.round(s.x) - 1, Math.round(s.y) - 2, 1, 1); } }); }
          bossState('idle'); b.cd = (1 + Math.random() * 0.4) / fast; S('splort');
        }
        break;
      case 'stagger': b.hy += (base - 8 - b.hy) * Math.min(1, dt * 6); if (b.t >= b.stagT) bossState('snap'); break;
    }
    // into its head or along its body: a bump
    if (['idle', 'stretchWind', 'rearWind', 'spitWind', 'snap'].includes(b.state) && live() && bossBumpOk() && bossHit(K.head())) hurt(b.hx, 'worm', 1);
  },
  hits(box, a) {
    const b = boss;
    if (!['idle', 'stretchWind', 'stretch', 'snap', 'rearWind', 'slam', 'stuck', 'erupt', 'spitWind', 'stagger'].includes(b.state)) return;
    const hb = this.head();
    if (!overlap(box, hb)) return;
    const open = b.state === 'stuck' || b.state === 'stagger';
    pbHit(box, a, hb, null, open ? 1 : 0.5);
  },
  squeaked(x, y, r) { const b = boss; if (!boxReach(this.head(), x, y, r) || b.state === 'stagger') return false; pbStagger(1.0, 'it shudders'); return true; },
  // its body: a chain of round segments from where it comes up out of the honey to its head, only the bit above the
  // honey drawn (the rest's down in it)
  draw() {
    const b = boss; if (!b) return;
    if (b.walled) for (const [x0, y0, x1, y1] of b.def.walls) drawGateLook({ look: 'wax', x0, y0, x1, y1 });
    const base = b.base;
    if (b.state === 'gone') { for (let i = 0; i < 12; i++) { const x = b.def.x - 60 + i * 11; ctx.fillStyle = '#2a2030'; ellipse(x, base - 4, 7, 5); ctx.fillStyle = i < 6 ? WG[1] : WO[1]; ellipse(x, base - 5, 6, 4); } return; }
    const root = [b.rx, base + 14], head = [b.hx, b.hy], ctl = [(b.rx + b.hx) / 2 + (b.state === 'stretch' ? 0 : 30), Math.min(b.hy, base) - (b.state === 'stretch' ? 0 : 50)];
    ctx.save(); ctx.beginPath(); ctx.rect(b.hx - 600, -1000, 1400, base - 3 + 1000); ctx.clip();
    const n = 16;
    for (let i = n; i >= 0; i--) {                                                          // tail end first, so the head's on top
      const k = i / n, [x, y] = quad(head, ctl, root, k), r = 11 - k * 4;
      const pal = k < 0.5 ? WG : WO;
      ctx.fillStyle = '#16200e'; ellipse(x, y, r + 1, r + 1); ctx.fillStyle = pal[1]; ellipse(x, y, r, r); ctx.fillStyle = pal[2]; ellipse(x - r * 0.3, y - r * 0.3, r * 0.6, r * 0.55);
      if (i % 2 === 0) { ctx.fillStyle = '#f4ffe0'; ctx.fillRect(Math.round(x - 2), Math.round(y - r + 2), 1, 1); ctx.fillRect(Math.round(x + 3), Math.round(y - r + 4), 1, 1); }
    }
    // its head: bigger, the Grime eye, a sour mouth
    const hx = b.hx, hy = b.hy, f = Math.sign(P.x - hx) || -1, flash = b.flash > 0;
    ctx.fillStyle = '#16200e'; ellipse(hx, hy, 14, 13); ctx.fillStyle = flash ? '#f0ffe0' : WG[2]; ellipse(hx, hy, 13, 12); ctx.fillStyle = WG[3]; ellipse(hx - 4, hy - 4, 6, 5);
    ctx.fillStyle = '#2c1c3c'; ellipse(hx + f * 4, hy - 2, 5, 5); ctx.fillStyle = '#96ffbe'; ellipse(hx + f * 4, hy - 2, 2.5, 2.5); ctx.fillStyle = '#e8fff0'; ctx.fillRect(Math.round(hx + f * 4 - 1), Math.round(hy - 4), 1, 1);
    ctx.fillStyle = '#3a1418'; ctx.fillRect(Math.round(hx + f * 6 - 3), Math.round(hy + 5), 6, 2);
    ctx.restore();
    if (b.state === 'stagger') for (let i = 0; i < 4; i++) { const a2 = b.t * 7 + i * 1.6; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(hx + Math.cos(a2) * 14) - 1, Math.round(hy - 20 + Math.sin(a2) * 3), 2, 2); }
    if (b.state === 'rearWind') { ctx.fillStyle = 'rgba(30,14,4,0.5)'; ctx.fillRect(Math.round(b.tx) - 10, base - 3, 20, 3); }      // where it'll come down
    if (b.state === 'under') { ctx.fillStyle = 'rgba(255,220,120,0.6)'; ellipse(b.ux, base - 3, 10 + Math.sin(b.t * 20) * 2, 2); }
  },
  dropAt: () => [boss.hx, boss.base - 30],
};

// ---------------------------------------------------------------- the Piñata
// A donkey piñata from some kid's birthday party, stuck in the big hall hanging by its string, full of Grime. It swings
// at him on its string (jump it, get up on a ledge, or parry it: then it spins dizzy), and a swing that goes far enough
// smacks it into the wall and it spins on its string, dizzy: that's when hits really count. It shakes itself so candy
// rains down, and (the red !!) slides over him and drops on him off the end of its string. Every hit knocks a bit of
// candy out of it that gets up and joins in. Halfway its string frays: it hangs lower and swings wider
BOSS_KINDS.pinata = {
  soundStates: ['shakeWind'],
  name: 'the Piñata', hp: 40, song: 'pinata', phase2: 'its string frays', downText: 'the Piñata is down', starsY: 0,
  wakeSound: () => { S('paper'); setTimeout(() => S('creak'), 250); }, downSound: () => { S('paper'); S('crumble'); S('thud'); },
  setup(def) { const L0 = def.y - 3 * 16 - 56 - 54; pbSetup(def, { base: def.y, ax: def.x, ay: 3 * 16, L: L0, L0, a: 0, bag: null, candy: 0 }); },   // (hanging just over his head)
  at() { const b = boss; return [b.ax + Math.sin(b.a) * b.L, b.ay + Math.cos(b.a) * b.L]; },          // where the string ties on its back
  body() {                                                                           // turned with it on its string
    const b = boss, [x, y] = this.at(), s = Math.sin(b.a), c = Math.cos(b.a), cx = x - 3 * c + 33 * s, cy = y + 3 * s + 33 * c, hw = 27 * Math.abs(c) + 23 * Math.abs(s), hh = 23 * Math.abs(c) + 27 * Math.abs(s);
    return { l: cx - hw, r: cx + hw, t: cy - hh, b: cy + hh };
  },
  // a swing doesn't go round in a circle: its string pays out so it sweeps right along over the floor (low enough it has
  // to be jumped, or waited out up on a ledge), and right into the wall if it goes far enough
  sweepH: () => boss.base - 6 - 56 - boss.ay,
  sweepL(a) { return (this.sweepH() - 30 * Math.abs(Math.sin(a))) / Math.cos(a); },   // (turned, its legs reach lower: it's lifted that bit so they don't go through the floor)
  wallA() { const b = boss, a = bossArena(); return Math.atan(Math.min(b.ax - a.l - 36, a.r - b.ax - 36) / this.sweepH()); },
  camY: () => Math.max(P.y, boss.base - 40),
  update(dt) {
    const b = boss, K = this, fast = b.phase === 2 ? 1.25 : 1;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    if (b.phase === 2 && !b.frayed) { b.frayed = true; b.L0 += 14; b.L = Math.max(b.L, b.L0); shakeT = 0.2; shakeA = 2; S('paper'); for (let i = 0; i < 12; i++) part(b.ax, b.ay + 40, (Math.random() * 2 - 1) * 60, Math.random() * 60, 0.8, ['#ee7a9a', '#5ab0e8', '#f0d040'][i % 3], 2, 300); }
    const hitBody = (cost, heavy) => {
      if (b.hitP || !live() || !bossHit(K.body())) return null;
      b.hitP = true; const [x] = K.at();
      return heavy ? bossHeavy(P.x + P.facing, 'pinata', 1) : foeStrike(x, 'pinata', { cost });
    };
    switch (b.state) {
      case 'dormant': if (P.ground && P.ko <= 0 && !scene) playScene(pbIntro([b.ax, b.base - 100])); break;
      case 'wake': b.a = Math.sin(b.t * 20) * 0.05; break;
      case 'idle':
        b.a += (Math.sin(b.t * 1.4) * 0.12 - b.a) * Math.min(1, dt * 3);
        if (b.cd <= 0) {
          if (!b.bag || !b.bag.length) { b.bag = ['swing', 'swing', 'shake', 'drop'].concat(b.phase === 2 ? ['swing', 'drop'] : []); for (let i = b.bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b.bag[i], b.bag[j]] = [b.bag[j], b.bag[i]]; } }
          const m = b.bag.shift();
          if (m === 'swing') {
            b.dir = Math.sign(P.x - b.ax) || 1;
            const want = Math.atan((P.x - b.ax) / K.sweepH()) + b.dir * (0.3 + (b.phase === 2 ? 0.15 : 0));
            b.amp = Math.min(Math.abs(want), K.wallA() + 0.05); bossState('swingWind'); S('creak'); popup(K.at()[0], K.at()[1] - 10, '!', '#ff6b5a', true);
          } else if (m === 'shake') { bossState('shakeWind'); S('paper'); }
          else { bossState('dropWind'); bossBigTell(P.x, b.base - 90); }
        }
        break;
      case 'swingWind': b.a += (-b.dir * 0.45 - b.a) * Math.min(1, dt * 5); if (b.t >= 0.6 / fast) { bossState('swing'); b.a0 = b.a; S('whoosh'); } break;
      case 'swing': {                                                                    // right across on its string
        const k = Math.min(1, b.t / (0.95 / fast)), target = b.dir * b.amp;
        b.a = b.a0 + (target - b.a0) * (1 - Math.cos(Math.PI * k)) / 2;
        b.L += (K.sweepL(b.a) - b.L) * Math.min(1, dt * 14);
        const out = hitBody(20);
        if (out === 'parried') { bossState('spin'); popup(K.at()[0], K.at()[1], 'it spins off on its string', '#ffd36b'); S('paper'); break; }
        if (Math.abs(b.a) >= K.wallA() - 0.005) { bossState('spin'); b.wall = true; shakeT = 0.2; shakeA = 3; S('thud'); S('paper'); const [x, y] = K.at(); puff(x + b.dir * 30, y + 30, 10, 70); popup(x, y, 'smack. it spins on its string', '#ffd36b'); break; }   // into the wall
        if (k >= 1) bossState('swingBack');
        break;
      }
      case 'swingBack': b.a += (0 - b.a) * Math.min(1, dt * 2.5); b.L += (b.L0 - b.L) * Math.min(1, dt * 4); { const out = hitBody(18); if (out === 'parried') { bossState('spin'); break; } } if (b.t >= 0.8) { bossState('idle'); b.cd = (0.7 + Math.random() * 0.4) / fast; } break;
      case 'spin': b.a += (0 - b.a) * Math.min(1, dt * 2); b.L += (K.sweepL(b.a) - b.L) * Math.min(1, dt * 5); if (b.t >= (b.phase === 2 ? 1.8 : 2.2)) { bossState('reel'); b.wall = false; } break;   // dizzy, low down by the floor: hit it
      case 'shakeWind':
        b.a = Math.sin(b.t * 40) * 0.06;
        if (b.t >= 0.6 / fast) {                                                         // candy raining down round him
          const [x, y] = K.at();
          for (let i = 0; i < 6; i++) { const tx = P.x + (i - 2.5) * 34, tt = 0.9; shots.push({ kind: 'candy', col: '#d8487e', x, y: y + 40, vx: (tx - x) / tt, vy: -260, g: 640, from: null, boss: true, reflected: false, t: 0, life: 2,
            draw: s => { ctx.fillStyle = '#2a2030'; ellipse(s.x, s.y, 3.5, 3.5); ctx.fillStyle = ['#ee7a9a', '#5ab0e8', '#f0d040', '#6ac868'][Math.floor(s.x) % 4]; ellipse(s.x, s.y, 2.5, 2.5); } }); }
          bossState('idle'); b.cd = (1 + Math.random() * 0.4) / fast; S('paper');
        }
        break;
      case 'dropWind': {                                                                 // sliding over him on its string... (the red !!)
        const want = Math.asin(Math.max(-0.9, Math.min(0.9, (P.x - b.ax) / b.L0)));
        if (b.t < 0.6 / fast) b.a += (want - b.a) * Math.min(1, dt * 4);
        if (b.t >= 0.85 / fast) { bossState('drop'); S('whoosh'); }
        break;
      }
      case 'drop': {                                                                     // ...and dropping on him off the end of it
        const floorL = (b.base - b.ay) / Math.cos(b.a) - 58;
        b.L = Math.min(floorL, b.L + 900 * dt);
        const out = hitBody(0, true);
        if (out === 'parried') { bossState('stuck'); break; }
        if (b.L >= floorL) { bossState('stuck'); shakeT = 0.18; shakeA = 3; S('thud'); S('paper'); const [x] = K.at(); puff(x, b.base, 12, 80); }
        break;
      }
      case 'stuck': if (b.t >= 0.9) bossState('reel'); break;                             // down on the floor a moment: hit it
      case 'reel': b.L += (b.L0 - b.L) * Math.min(1, dt * 5); b.a += (0 - b.a) * Math.min(1, dt * 2); if (Math.abs(b.L - b.L0) < 2 || b.t >= 0.8) { b.L = b.L0; bossState('idle'); b.cd = 0.7 / fast; } break;
      case 'stagger': if (b.t >= b.stagT) bossState('idle'); break;
    }
    if (['idle', 'swingWind', 'shakeWind', 'dropWind'].includes(b.state) && live() && bossBumpOk() && bossHit(K.body())) hurt(K.at()[0], 'pinata', 1);
  },
  // every hit knocks a bit of candy out, and it gets up and joins in (no more than a couple at once)
  candy() {
    const b = boss, alive = foes.filter(f => f.fromPinata && f.state !== 'down').length;
    if (alive >= (b.phase === 2 ? 3 : 2) || Math.random() < 0.4) return;
    const [x, y] = this.at(), kind = 'gumdrop', k = FOE[kind];
    const f = { room: room.def.id, i: 200 + (b.candy++), kind, x: x + (Math.random() * 2 - 1) * 10, y: b.base, x0: x, y0: b.base, f: Math.sign(P.x - x) || -1, hp: foeHP(k), state: 'walk', t: 0, cd: 1.2, flash: 0, vel: 0, yoff: -(b.base - y - 40), vy: -120, hb: null, hitP: false, range: patrol(x, b.base), fromPinata: true };
    f.moves = movesFor(kind); f.hopVX = 0; if (k.setup) k.setup(f, {}); foes.push(f);
  },
  hits(box, a) {
    const b = boss, K = this;
    if (['dormant', 'wake', 'falling', 'gone'].includes(b.state)) return;
    const hb = K.body(); if (!overlap(box, hb)) return;
    const open = b.state === 'spin' || b.state === 'stuck' || b.state === 'stagger';
    const was = b.hp;
    pbHit(box, a, hb, null, open ? 1 : 0.5);
    if (b.hp < was && a.type !== 'spark') K.candy();
  },
  squeaked(x, y, r) { const b = boss; if (!boxReach(this.body(), x, y, r) || b.state === 'spin') return false; bossState('spin'); popup(this.at()[0], this.at()[1], 'it spins on its string', '#ffd36b'); return true; },
  draw() {
    const b = boss; if (!b) return;
    if (b.walled) for (const [x0, y0, x1, y1] of b.def.walls) drawGateLook({ look: 'wax', x0, y0, x1, y1 });
    if (b.state === 'gone') { spr('pinata_down', b.ax, b.base, false); return; }
    if (b.down) { spr('pinata_down', this.at()[0], b.base, false); return; }
    const [x, y] = this.at();
    ctx.strokeStyle = 'rgba(236,228,206,0.9)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(b.ax, 0); ctx.lineTo(x, y); ctx.stroke();   // its string, up into the dark
    const fr = b.state === 'spin' ? 'pinata_spin' : b.flash > 0 ? 'pinata_hurt' : b.state === 'swing' || b.state === 'swingBack' ? 'pinata_swing' : b.frayed ? 'pinata_frayed' : (Math.sin(b.t * 2) > 0 ? 'pinata_hang_1' : 'pinata_hang_2');
    const flip = b.state === 'swing' ? b.dir > 0 : P.x > x, spinning = b.state === 'spin';
    ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(-b.a);
    if (spinning) ctx.scale(Math.cos(b.t * 14) >= 0 ? 1 : -1, 1);
    pbDraw(fr, 0, 0, flip && !spinning);
    ctx.restore();
    if (b.state === 'dropWind') { ctx.fillStyle = 'rgba(30,14,4,0.5)'; ctx.fillRect(Math.round(x) - 22, b.base - 3, 44, 3); }
  },
  dropAt: () => [boss.ax, boss.base - 30],
};
})();
