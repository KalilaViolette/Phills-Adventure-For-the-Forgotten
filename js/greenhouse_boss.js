'use strict';
// ---------- the Bramble heart (10/18/2026) ----------
// Where the Bramble's thickest, a great knot of it against the far wall, wrapped round an old garden gnome full of Grime
// that holds it all together. The sword just tangles in it. Strands are wrapped across the gnome: the static spark
// frays one and a second spark snaps it, and with them all gone the knot pulls open and the gnome's showing. That's
// when the sword counts. Then it grows them back. Parrying a lash, or cutting a vine while it's stuck in the floor,
// snaps a strand outright.
// It lashes low along the floor (jump it), slams a vine down on him from over the top (shield up over his head, or out
// of the way), grabs up out of whatever he's standing on (the red !!: it drags him into the thorns), and grows thorns
// out across the floor (up on the benches, or spark them back). Halfway, the knot pulls tighter: four strands, quicker,
// thorns for good along the floor by the way in, and thorns shaken down out of the roof.
(() => {
const S = n => { if (sfx[n]) sfx[n](); };
const GNX = -6, GNY = -12;                                                   // where the gnome sits in it, from its foot
const VC = ['#1e0e16', '#4e2436', '#6a3446'], VT = '#b8a294';                // a cane drawn in the game: outline, cane, light along it, thorns
// a thorny vine along pts, drawn in solid squares so what it hits is where it's drawn (bossHit goes by the drawing)
function vine(pts, w = 6, thorns = true, cols = VC) {
  const stamp = (c, ww) => { ctx.fillStyle = c; for (let i = 0; i < pts.length - 1; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
    for (let j = 0; j < n; j++) { const k = j / n, x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k, wi = Math.max(1, Math.round(ww * (1 - 0.5 * (i + k) / pts.length))); ctx.fillRect(Math.round(x - wi / 2), Math.round(y - wi / 2), wi, wi); } } };
  stamp(cols[0], w + 2); stamp(cols[1], w);
  ctx.fillStyle = cols[2]; for (let i = 0; i < pts.length - 1; i++) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; ctx.fillRect(Math.round(x0), Math.round(y0 - w / 2 + 1), Math.max(1, Math.round(x1 - x0)) || 1, 1); }
  if (!thorns) return;
  ctx.fillStyle = VT; let d = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], l = Math.hypot(x1 - x0, y1 - y0) || 1, ux = (x1 - x0) / l, uy = (y1 - y0) / l;
    for (let j = 0; j < l; j++) { d++; if (d % 7) continue; const sd = (d / 7) % 2 ? 1 : -1, x = x0 + ux * j, y = y0 + uy * j, o = w / 2 + 2;
      ctx.fillRect(Math.round(x - uy * sd * o), Math.round(y + ux * sd * o), 1, 1); ctx.fillRect(Math.round(x - uy * sd * (o - 1)), Math.round(y + ux * sd * (o - 1)), 1, 1); }
  }
}
const quad = (a, c, b, n = 14) => { const out = []; for (let i = 0; i <= n; i++) { const k = i / n, u = 1 - k; out.push([u * u * a[0] + 2 * u * k * c[0] + k * k * b[0], u * u * a[1] + 2 * u * k * c[1] + k * k * b[1]]); } return out; };
// a low tangle of thorns along the floor from x0 to x1 (the creep, and the hedge by the way in)
function thornsAlong(x0, x1, y, seed = 0) {
  if (x1 - x0 < 2) return;
  ctx.fillStyle = 'rgba(70,30,90,0.35)'; ctx.fillRect(Math.round(x0), y - 3, Math.round(x1 - x0), 3);         // a sickly glow of Grime along under it
  for (let x = Math.floor(x0 / 7) * 7; x < x1; x += 7) {
    const r = Math.abs(Math.sin((x + seed) * 12.9898) * 43758.5453) % 1, h = 9 + r * 10;
    vine(quad([Math.max(x0, x - 7), y], [x + 2, y - h], [Math.min(x1, x + 10), y - 1], 6), 4, true);
    if (x + 3 < x1) { ctx.fillStyle = '#e2d2c2'; ctx.fillRect(x + 3, Math.round(y - h * 0.75) - 3, 1, 3); ctx.fillRect(x + 2, Math.round(y - h * 0.75), 3, 1); }   // a thorn sticking up off it
  }
}
function drawThornWall(x, y, w, h) { thornsAlong(x - 4, x + w + 4, y + h, 3); for (let k = 0; k < 3; k++) vine(quad([x + 2 + k * 10, y + h], [x + w / 2 + (k - 1) * 6, y + h / 2], [x + w - 2 - k * 8, y - 4], 8), 4); }

BOSS_KINDS.bramble = {
  soundStates: ['grabWind'],                                                         // a squeak startles it out of a grab
  name: 'the Bramble heart', hp: 36, song: 'bramble', phase2: 'the knot pulls tighter', downText: 'the Bramble lets go', starsY: 90,
  wakeSound: () => { S('thorns'); setTimeout(() => S('creak'), 300); }, downSound: () => { S('crumble'); S('thud'); },
  setup(def) { pbSetup(def, { base: def.y, wraps: 3, creep: null, drops: [], cuts: 0 }); },
  camY: () => Math.max(P.y, boss.base - 60),                                         // up on a bench the view stays down far enough to see the floor (and its thorns) over the bar
  gnome: () => ({ l: boss.x + GNX - 12, r: boss.x + GNX + 12, t: boss.base + GNY - 50, b: boss.base + GNY }),
  body: () => (['opening', 'open'].includes(boss.state) ? { l: boss.x + 8, r: boss.x + 72, t: boss.base - 122, b: boss.base } : { l: boss.x - 64, r: boss.x + 72, t: boss.base - 122, b: boss.base }),
  front: () => ({ l: boss.x - 70, r: boss.x + 20, t: boss.base - 100, b: boss.base }),
  creepFront: () => boss.x - 64 - (boss.creep ? boss.creep.len : 0),
  hedge: () => { const a = bossArena(); return [a.l, a.l + 7 * T]; },
  // a strand snapping: the last one and the knot pulls open
  // a spark only frays one (a second one through it snaps it): a parry or a cut vine snaps one outright
  snap(x, y, msg, fray) {
    const b = boss; if (b.wraps <= 0) return;
    if (fray && !b.frayed) { b.frayed = true; S('crumble'); for (let i = 0; i < 5; i++) part(x, y, (Math.random() * 2 - 1) * 80, -Math.random() * 80, 0.4, i % 2 ? '#4e2436' : '#fff6a0', 1, 300); if (!b.toldFray) { b.toldFray = true; popup(b.x - 20, b.base - 130, 'it frays. again', '#ffd36b'); } return; }
    b.wraps--; b.cuts++; b.frayed = false; S('snap'); S('crumble');
    for (let i = 0; i < 10; i++) part(x, y, (Math.random() * 2 - 1) * 120, -Math.random() * 120, 0.5, i % 2 ? '#4e2436' : '#b8a294', 2, 300);
    if (b.wraps <= 0) { bossState('opening'); S('thorns'); popup(b.x - 20, b.base - 130, 'it pulls open', '#ffd36b'); }
    else if (msg && b.cuts < 3) popup(b.x - 20, b.base - 130, msg, '#ffd36b');
  },
  update(dt) {
    const b = boss, K = this, fast = b.phase === 2 ? 1.28 : 1, dx = P.x - b.x, a = bossArena();
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt; b.gflash = Math.max(0, (b.gflash || 0) - dt);
    const live = () => phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story;
    if (b.phase === 2 && !b.tight && b.state !== 'dormant' && b.state !== 'wake') {   // halfway: the knot pulls tighter
      b.tight = true; b.wraps = 4; b.frayed = false; b.bag = null; shakeT = 0.4; shakeA = 3; S('thorns'); S('creak'); bossState('flinch'); b.cd = 1;
      for (let i = 0; i < 24; i++) part(b.x - 10, b.base - 60, (Math.random() * 2 - 1) * 180, -Math.random() * 160, 0.8, i % 3 ? '#4e2436' : '#2c1c3c', 2, 300);
    }
    // the creep along the floor: grows out, stays a while, withers back
    const c = b.creep;
    if (c) {
      c.t += dt;
      if (c.st === 'grow') { c.len = Math.min(c.max, c.len + 190 * dt); if (Math.random() < dt * 30) part(K.creepFront(), b.base - 2, 0, -50, 0.3, '#4a3626', 1, 200); if (c.len >= c.max) { c.st = 'hold'; c.t = 0; } }
      else if (c.st === 'hold' && c.t >= (b.phase === 2 ? 4 : 3.2)) { c.st = 'wither'; }
      else if (c.st === 'wither') { c.len -= 230 * dt; if (c.len <= 0) b.creep = null; }
    }
    const onFloorIn = (x0, x1) => P.ground && Math.abs(P.y - b.base) < 3 && P.x + 6 > x0 && P.x - 6 < x1;
    if (live() && b.creep && b.creep.len > 8 && onFloorIn(K.creepFront(), b.x - 64) && bossHit({ l: K.creepFront(), r: b.x - 60, t: b.base - 16, b: b.base })) hurt(P.x + 1, 'bramble', 1);
    if (live() && b.tight) { const [h0, h1] = K.hedge(); if (onFloorIn(h0, h1)) hurt(P.x - 1, 'bramble', 1); }
    // thorns shaken down out of the roof
    for (const d of b.drops) {
      d.t += dt;
      if (d.t < d.wait) continue;
      d.vy += 900 * dt; d.y += d.vy * dt;
      if (!d.hit && phillAround() && bossHit({ l: d.x - 2, r: d.x + 2, t: d.y - 8, b: d.y, area: true })) { d.hit = true; d.dead = true; foeStrike(d.x, 'bramble', { cost: 12 }); }
      if (solidPx(d.x, d.y + 1) || d.y > b.base) { d.dead = true; puff(d.x, b.base, 3, 30); }
    }
    b.drops = b.drops.filter(d => !d.dead);
    switch (b.state) {
      case 'dormant': if (P.x > b.def.start && P.ko <= 0 && !scene) playScene(pbIntro([b.x - 30, b.base - 70])); break;
      case 'wake': break;
      case 'idle':
        if (b.wraps <= 0) { bossState('opening'); break; }                              // (nothing left holding it shut)
        if (b.cd <= 0) {
          // what it does next: everything it has, shuffled, once each before any comes round again (so he sees it all,
          // and never the same one three times running). One that doesn't fit right now waits for the next round
          const ok = m => m === 'slam' ? P.x < b.x - 70 : m === 'creep' ? !b.creep : true;
          if (!b.bag || !b.bag.length) { b.bag = ['sweep', 'slam', 'grab', 'creep', 'sweep'].concat(b.phase === 2 ? ['rain', 'slam'] : []); for (let i = b.bag.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b.bag[i], b.bag[j]] = [b.bag[j], b.bag[i]]; } }
          let i = b.bag.findIndex(ok); if (i < 0) i = b.bag.indexOf('sweep'); if (i < 0) { b.bag = null; break; }
          const m = b.bag.splice(i, 1)[0];
          b.last = m;
          if (m === 'sweep') { bossState('sweepWind'); S('rustle'); popup(b.x - 60, b.base - 90, '!', '#ff6b5a', true); }
          else if (m === 'slam') { bossState('slamWind'); b.tx = P.x; S('creak'); popup(b.x - 30, b.base - 140, '!', '#ff6b5a', true); }
          else if (m === 'grab') { bossState('grabWind'); b.gx = b.x - 80; b.gy = b.base; bossBigTell(P.x, P.y - 60); }
          else if (m === 'creep') { bossState('creepWind'); S('rustle'); S('thorns'); }
          else { bossState('rainWind'); S('creak'); S('rustle'); }
        }
        break;
      case 'sweepWind': if (b.t >= 0.55 / fast) { bossState('sweep'); S('whip'); } break;
      case 'sweep': {                                                                    // a vine whipped out low along the floor
        const k = Math.min(1, b.t / (0.45 / fast)), reach = b.phase === 2 ? 600 : 520;
        b.tip = b.x - 90 - reach * (1 - (1 - k) * (1 - k));
        if (!b.hitP && b.t > 0.03 && live() && bossHit({ l: b.tip - 4, r: b.x - 60, t: b.base - 16, b: b.base })) {
          b.hitP = true; const out = foeStrike(b.x, 'bramble', { cost: 20 });
          if (out === 'parried') { K.snap(P.x + P.facing * 14, P.y - 10, 'a strand snaps loose'); if (b.state === 'sweep') bossState('flinch'); break; }
        }
        if (k >= 1) { bossState('recoil'); }
        break;
      }
      case 'recoil': if (b.t >= 0.35) { bossState('idle'); b.cd = (0.7 + Math.random() * 0.4) / fast; } break;
      case 'slamWind':                                                                   // a vine up over the top, aiming at him
        if (b.t < 0.42 / fast) b.tx += (Math.max(a.l + 20, Math.min(b.x - 80, P.x)) - b.tx) * Math.min(1, dt * 6);
        if (b.t >= 0.6 / fast) { bossState('slam'); S('whoosh'); }
        break;
      case 'slam': {                                                                     // ...and down
        const k = Math.min(1, b.t / 0.12); b.tipY = b.base - 170 + 166 * k;
        if (!b.hitP && live() && bossHit({ l: b.tx - 9, r: b.tx + 9, t: b.tipY - 46, b: b.tipY + 2 })) {
          b.hitP = true; const out = foeStrike(b.tx, 'bramble', { cost: 22 });
          if (out === 'parried') { K.snap(b.tx, b.base - 30, 'a strand snaps loose'); if (b.state === 'slam') bossState('flinch'); break; }
        }
        if (k >= 1) { bossState('stuck'); shakeT = 0.15; shakeA = 2; S('slam'); puff(b.tx, b.base, 8, 60); }
        break;
      }
      case 'stuck': if (b.t >= (b.phase === 2 ? 0.8 : 1.1)) { bossState('recoil'); } break;          // stuck in the floor: cut it
      case 'grabWind': {                                                                 // the floor cracking along after him (the red !!)
        const gy = P.ground ? P.y : b.gy;
        if (b.t < 0.62 / fast) { b.gx += Math.sign(P.x - b.gx) * Math.min(Math.abs(P.x - b.gx), 230 * dt); b.gy = gy; }
        if (Math.random() < dt * 30) part(b.gx + (Math.random() * 2 - 1) * 8, b.gy - 1, 0, -40, 0.3, '#4a3626', 1, 300);
        if (b.t >= 0.82 / fast) { bossState('grab'); S('snap'); puff(b.gx, b.gy, 6, 50); }
        break;
      }
      case 'grab': {                                                                     // up out of whatever he's standing on
        b.gh = 66 * Math.min(1, b.t / 0.1);
        if (!b.hitP && b.t < 0.3 && live() && bossHit({ l: b.gx - 10, r: b.gx + 10, t: b.gy - b.gh, b: b.gy })) {
          b.hitP = true; const out = bossHeavy(P.x + P.facing, 'bramble', 1);   // (from right under him: his shield's in the way whichever way he faces)
          if (out === 'parried') { K.snap(b.gx, b.gy - 30, 'a strand snaps loose'); if (b.state === 'grab') bossState('flinch'); break; }
          if (out === 'hit') { P.vx = 240; P.vy = -300; popup(P.x, P.y - 54, 'dragged into the thorns', '#ff8a6b'); }   // flung at the knot
        }
        if (b.t >= 0.5) { bossState('idle'); b.cd = (0.8 + Math.random() * 0.4) / fast; }
        break;
      }
      case 'creepWind': if (b.t >= 0.45 / fast) { b.creep = { len: 0, max: b.phase === 2 ? 420 : 280, t: 0, st: 'grow' }; bossState('idle'); b.cd = 0.7 / fast; } break;
      case 'rainWind':
        if (b.t >= 0.5 / fast) {
          const xs = [P.x, P.x - 70, P.x + 70, a.l + 40 + Math.random() * (b.x - 120 - a.l)];
          for (const [i, x] of xs.entries()) if (x > a.l + 8 && x < b.x - 70) b.drops.push({ x, y: Math.max(6 * T + 4, cam.y - 12), vy: 0, t: 0, wait: 0.7 + i * 0.12 });   // (from just over the top of the view: from up at the roof they were hardly on screen before they landed)
          bossState('idle'); b.cd = 0.9 / fast;
        }
        break;
      case 'flinch': if (b.t >= 0.6) { bossState(b.wraps <= 0 ? 'opening' : 'idle'); b.cd = 0.6; } break;
      case 'opening': if (b.t >= 0.35) bossState('open'); break;
      case 'open': if (b.t >= (b.phase === 2 ? 3 : 3.6)) { bossState('closing'); S('thorns'); S('creak'); } break;   // the gnome's showing: hit it
      case 'closing': if (b.t >= 0.7) { b.wraps = b.phase === 2 ? 4 : 3; b.frayed = false; bossState('idle'); b.cd = 0.9; } break;
      case 'stagger': if (b.t >= b.stagT) { bossState(b.wraps <= 0 ? 'open' : 'idle'); b.cd = 0.5; } break;
    }
    // walking into it: thorns
    if (!['dormant', 'wake'].includes(b.state) && live() && bossBumpOk() && bossHit(K.body())) hurt(P.x + 1, 'bramble', 1);   // (thrown back out, away from it)
  },
  hits(box, a) {
    const b = boss, K = this;
    if (b.state === 'falling' || b.down || b.ending) return;
    if (['opening', 'open', 'closing'].includes(b.state) && !(b.state === 'closing' && b.t > 0.4) && overlap(box, K.gnome())) { pbHit(box, a, K.gnome(), () => { b.gflash = 0.15; }); return; }
    const isSpark = a.type === 'spark';
    if (b.state === 'stuck' && overlap(box, { l: b.tx - 26, r: b.tx + 26, t: b.base - 44, b: b.base + 2 })) {   // the vine stuck in the floor: cut it
      a.hit.add('boss'); a.stopLunge = true; K.snap(b.tx, b.base - 10, 'cut. a strand goes with it'); if (b.state === 'stuck') bossState('recoil'); impact(b.tx, b.base - 10, P.facing, 1, 'clean'); return;
    }
    if (isSpark && b.creep && b.creep.len > 0 && overlap(box, { l: K.creepFront(), r: b.x - 60, t: b.base - 26, b: b.base + 2 })) {   // sparking the creep back
      a.hit.add('boss'); b.creep.len = Math.max(0, b.creep.len - 150); if (b.creep.st === 'grow') b.creep.st = 'hold'; S('crumble');   // each one burns a good way of it back
      for (let i = 0; i < 8; i++) part(K.creepFront() + Math.random() * 20, b.base - 4, (Math.random() * 2 - 1) * 60, -Math.random() * 90, 0.4, i % 2 ? '#4e2436' : '#fff6a0', 1, 300); return;
    }
    if (overlap(box, K.front()) || overlap(box, K.body())) {
      a.hit.add('boss');
      if (isSpark && b.wraps > 0 && !['opening', 'open'].includes(b.state)) { K.snap((box.l + box.r) / 2, (box.t + box.b) / 2, 'a strand snaps', true); return; }
      if (isSpark) return;
      a.stopLunge = true; spark(P.x + P.facing * 16, P.y - 20); S('tink'); P.recoilT = 0.1; P.recoilV = -P.facing * 200; if (a.type === 'down') pogo();   // the sword just tangles in it
      if (!b.told) { b.told = 1; popup(P.x, P.y - 54, 'the thorns tangle the sword. zap the strands holding it. {spark}: static spark', '#cfd6e6'); }
    }
  },
  squeaked(x, y, r) {
    const b = boss; if (!boxReach(this.body(), x, y, r) && !boxReach({ l: b.gx - 10, r: b.gx + 10, t: b.gy - 20, b: b.gy }, x, y, r)) return false;
    if (b.state !== 'grabWind') return false;
    bossState('flinch'); popup(b.x - 20, b.base - 130, 'it flinches', '#ffd36b'); return true;
  },
  draw() {
    const b = boss; if (!b) return;
    if (b.walled) for (const [x0, y0, x1, y1] of b.def.walls) drawThornWall(x0 * T, y0 * T, (x1 - x0 + 1) * T, (y1 - y0 + 1) * T);
    if (b.state === 'gone') { spr('bramble_knot_dead', b.x, b.base, false); spr('bramble_gnome_down', b.x - 92, b.base, false); return; }
    const K = this, base = b.base;
    if (b.tight) { const [h0, h1] = K.hedge(); thornsAlong(h0, h1, base, 7); }
    if (b.creep && b.creep.len > 2) thornsAlong(K.creepFront(), b.x - 56, base, 1);
    // the grab's cracks, and the vine bursting up
    if (b.state === 'grabWind') {                                                       // a crack across the floor under him, glowing
      const gx = Math.round(b.gx), gy = Math.round(b.gy), on = Math.floor(b.t * 12) % 2;
      ctx.fillStyle = on ? 'rgba(170,110,230,0.8)' : 'rgba(150,96,210,0.5)'; ctx.fillRect(gx - 18, gy - 3, 36, 3); ctx.fillRect(gx - 10, gy - 5, 20, 2);
      ctx.fillStyle = '#140a10'; for (let i = -14; i <= 14; i += 2) ctx.fillRect(gx + i, gy - 1 - (Math.abs(i * 5) % 3), 2, 2);
      ctx.fillStyle = '#c8a0f0'; if (on) { ctx.fillRect(gx - 1, gy - 2, 2, 1); ctx.fillRect(gx - 7, gy - 1, 1, 1); ctx.fillRect(gx + 6, gy - 2, 1, 1); } }
    if (b.state === 'grab') { const h = b.gh, pts = []; for (let i = 0; i <= 10; i++) pts.push([b.gx + Math.sin(i * 0.9 + b.t * 10) * 3 * (i / 10), b.gy - h * i / 10]); vine(pts, 7); }
    // the knot
    const open = ['opening', 'open'].includes(b.state) || (b.state === 'closing' && b.t < 0.4), flinch = ['flinch', 'wake', 'stagger'].includes(b.state) || b.state === 'creepWind' || b.state === 'rainWind';
    const fr = b.down ? 'bramble_knot_dead' : open ? 'bramble_knot_part' : b.tight ? 'bramble_knot_tight' : (Math.sin(b.t * 2.4) > 0 ? 'bramble_knot_1' : 'bramble_knot_2');
    const sh = flinch ? Math.round(Math.sin(b.t * 40) * 1.5) : 0;
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(b.x, base, 70, 4);
    pbDraw(fr, b.x, base, false, sh);
    // the gnome in the middle of it
    if (!b.down) {
      const gf = b.gflash > 0 || b.state === 'falling' ? 'bramble_gnome_hurt' : open ? (Math.floor(b.t * 4) % 2 ? 'bramble_gnome_free_1' : 'bramble_gnome_free_2') : 'bramble_gnome_held';
      spr(gf, b.x + GNX + sh, base + GNY, false);
      if (b.gflash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(gf, b.x + GNX, base + GNY, false, 0.55); ctx.globalCompositeOperation = 'source-over'; }
      // the strands wrapped across him (they grow back over him while it closes)
      const n = b.state === 'closing' ? Math.floor((b.phase === 2 ? 4 : 3) * Math.min(1, b.t / 0.6)) : open ? 0 : b.wraps;
      for (let i = 0; i < n; i++) { const y = base + GNY - 44 + i * (b.phase === 2 ? 11 : 14), sd = i % 2 ? 1 : -1, gx = b.x + GNX + sh;
        const fr = b.frayed && i === n - 1 && b.state !== 'closing';                          // the frayed one: thin, and broken in the middle
        if (fr) { vine([[gx - 26, y - sd * 5], [gx - 6, y + sd * 3]], 3, false); vine([[gx + 2, y], [gx + 26, y + sd * 5]], 3, false); }
        else vine([[gx - 26, y - sd * 5], [gx - 8, y + sd * 2], [gx + 8, y - sd * 1], [gx + 26, y + sd * 5]], 5); }
    }
    // its vines: the low lash, the slam
    const kx = b.x - 54, ky = base - 44;
    if (b.state === 'sweepWind') { const k = Math.min(1, b.t / 0.4); vine(quad([kx, ky], [kx - 30, ky - 30 * k], [kx - 14 - 16 * k, ky - 50 * k], 10), 6); }
    if (b.state === 'sweep' || b.state === 'recoil') {
      const tip = b.state === 'recoil' ? b.tip + (b.x - 90 - b.tip) * Math.min(1, b.t / 0.3) : b.tip, y = base - 7, pts = quad([kx, ky], [kx - 30, y - 2], [kx - 50, y], 6);
      for (let x = kx - 56; x > tip; x -= 12) pts.push([x, y + Math.sin(x * 0.2 + b.t * 30) * 1.5]);
      pts.push([tip, y]); vine(pts, 7);
    }
    const top = [b.x - 26, base - 104];
    if (b.state === 'slamWind') { const k = Math.min(1, b.t / 0.4); vine(quad(top, [(top[0] + b.tx) / 2, base - 150 - 70 * k], [b.tx + 20 * (1 - k), base - 170 * k - 100 * (1 - k)], 16), 6);
      ctx.fillStyle = 'rgba(30,14,22,0.5)'; ctx.fillRect(Math.round(b.tx) - 8, base - 2, 16, 2); }   // where it'll come down
    if (b.state === 'slam') vine(quad(top, [(top[0] + b.tx) / 2, base - 220], [b.tx, b.tipY], 16), 7);
    if (b.state === 'stuck') vine(quad(top, [(top[0] + b.tx) / 2, base - 150], [b.tx, base - 5], 16), 7);
    // thorns out of the roof
    for (const d of b.drops) {
      if (d.t < d.wait) { ctx.fillStyle = 'rgba(20,8,14,' + (0.25 + 0.5 * d.t / d.wait).toFixed(2) + ')'; ctx.fillRect(Math.round(d.x) - 6, base - 2, 12, 2); ctx.fillRect(Math.round(d.x) - 3, base - 3, 6, 1); continue; }
      const dx_ = Math.round(d.x), dy_ = Math.round(d.y);                                   // a broken bit of cane, point first
      ctx.fillStyle = '#1e0e16'; ctx.fillRect(dx_ - 3, dy_ - 14, 6, 12); ctx.fillStyle = '#4e2436'; ctx.fillRect(dx_ - 2, dy_ - 14, 4, 11); ctx.fillStyle = '#6a3446'; ctx.fillRect(dx_ - 2, dy_ - 14, 1, 10);
      ctx.fillStyle = '#e2d2c2'; ctx.fillRect(dx_ - 1, dy_ - 3, 2, 3); ctx.fillRect(dx_ - 4, dy_ - 10, 1, 2); ctx.fillRect(dx_ + 3, dy_ - 7, 1, 2);
    }
  },
  dropAt: () => [boss.x - 90, boss.base - 30],
};
})();
