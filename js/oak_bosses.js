'use strict';
// ---------- the Old Oak's bosses: the yo-yo in the hollow trunk, the kite in the high branches ----------

// ---------------------------------------------------------------- the yo-yo
// A big wooden yo-yo hanging in the shaft on its string, nobody holding it. It drops on you (get out from under it),
// sleeps spinning at the bottom and rolls along the floor after you (jump it), then snaps back up. Rolling into a wall,
// or a parried roll, stalls it: it wobbles there, and that's when the sword counts. Spinning, the sword glances off.
BOSS_KINDS.yoyo = {
  soundStates: ['sleep', 'swing'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the yo-yo', hp: 32, song: 'yoyo', phase2: 'its string pulls tighter', downText: 'the yo-yo is down', starsY: 70,
  wakeSound: () => { sfx.whirl(); setTimeout(() => sfx.creak(), 250); }, downSound: () => { sfx.clunk(); sfx.thud(); },
  setup(def) { pbSetup(def, { base: def.y, top: def.y - 36 * 16, ax: def.x, vx: 0 }); },
  box: () => ({ l: boss.x - 26, r: boss.x + 26, t: boss.y - 52, b: boss.y }),
  update(dt) {
    const b = boss, dx = P.x - b.x, fast = b.phase === 2 ? 1.3 : 1, lo = b.def.start + 2 * T, hi = b.def.end - 2 * T;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    switch (b.state) {
      // (only once he's down near its floor: coming in at the top of the shaft it woke up and shut him in while he was still
      // on the top shelf, a long way above it. The enemy audit's open question, checked 10/17/2026)
      case 'dormant': if (Math.abs(dx) < 240 && P.y > b.base - 6 * T && P.ko <= 0 && !scene) { b.y = b.base - 150; playScene(pbIntro([b.x, b.y - 40])); } break;
      case 'wake': b.y = b.base - 150 + Math.sin(b.t * 20) * 4; break;
      case 'idle':                                                                           // hanging part way down, swaying over to him
        b.y += (b.base - 150 - b.y) * Math.min(1, dt * 3); b.ax += Math.sign(P.x - b.ax) * 60 * dt * fast; b.ax = Math.max(lo, Math.min(hi, b.ax)); b.x = b.ax + Math.sin(b.t * 3) * 6;
        if (b.cd <= 0) {
          const r = Math.random();
          if (r < 0.55) { bossState('drop'); b.vy = 0; sfx.whirl(); bossBigTell(b.x, b.y - 70); }
          else { bossState('swingWind'); b.from = b.x; b.to = Math.max(lo, Math.min(hi, b.x + Math.sign(dx || 1) * 220)); sfx.creak(); popup(b.x, b.y - 70, '!', '#ff6b5a', true); }
        }
        break;
      case 'drop':                                                                           // straight down on its string
        b.vy = Math.min(b.vy + 1200 * dt, 560); b.y = Math.min(b.base, b.y + b.vy * dt);
        if (b.y >= b.base) { shakeT = 0.25; shakeA = 3; sfx.slam(); puff(b.x, b.base, 12, 70); if (!b.hitP && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossHit(this.box()) && bossHeavy(b.x, 'yoyo', 1) === 'parried') { bossState('stall'); b.vx = 0; popup(b.x, b.y - 70, 'knocked off its string', '#ffd36b'); break; } bossState('sleep'); b.vx = Math.sign(dx || b.f) * 150 * fast; b.f = Math.sign(b.vx) || b.f; }
        else if (!b.hitP && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossHit(this.box())) { b.hitP = true; if (bossHeavy(b.x, 'yoyo', 1) === 'parried') { bossState('stall'); b.y = b.base; b.vx = 0; popup(b.x, b.y - 70, 'knocked off its string', '#ffd36b'); } }   // its move the shield can't take, once a drop
        break;
      case 'sleep': {                                                                        // spinning on the floor, walking the dog after him
        b.y = b.base; b.x += b.vx * dt; b.ax = b.x;
        if (Math.random() < dt * 20) part(b.x - Math.sign(b.vx) * 24, b.base - 2, -b.vx * 0.3, -40 - Math.random() * 60, 0.4, '#a89a78', 1, 200);
        if (b.x <= lo || b.x >= hi) { b.x = Math.max(lo, Math.min(hi, b.x)); bossState('stall'); shakeT = 0.2; shakeA = 2; sfx.clunk(); popup(b.x, b.y - 70, 'it stalls', '#ffd36b'); }
        else if (b.t >= 2.2 / fast) { bossState('snap'); sfx.reel(); }
        if (!b.hitP && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossHit(this.box())) {   // once a roll (it checked every frame it touched him, so a block broke his guard on the spot)
          b.hitP = true; const out = foeStrike(b.x, 'yoyo', { cost: 20 });
          if (out === 'parried') { bossState('stall'); b.vx = 0; popup(b.x, b.y - 70, 'knocked off its string', '#ffd36b'); }
        }
        break;
      }
      case 'stall': b.y = b.base; if (b.t >= 1.8) { bossState('snap'); sfx.reel(); } break;      // wobbling on the spot: hit it
      case 'snap': b.y = Math.max(b.base - 150, b.y - 700 * dt); if (b.y <= b.base - 150) { bossState('idle'); b.cd = 0.6 + Math.random() * 0.5; } break;
      case 'swingWind': if (b.t >= 0.4 / fast) { bossState('swing'); sfx.whoosh(); } break;
      case 'swing': {                                                                        // a wide pendulum swing across the shaft, low
        const k = Math.min(1, b.t / (0.8 / fast));
        b.x = b.from + (b.to - b.from) * k; b.ax = b.x; b.y = b.base - 150 + Math.sin(Math.PI * k) * 120;
        if (!b.hitP && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossHit(this.box())) {   // once a swing
          b.hitP = true; const out = foeStrike(b.x, 'yoyo', { cost: 20 });
          if (out === 'parried') { bossState('stall'); b.y = b.base; popup(b.x, b.y - 70, 'knocked off its string', '#ffd36b'); break; }
        }
        if (k >= 1) { bossState('idle'); b.cd = 0.5; }
        break;
      }
      case 'stagger': b.y = b.base; if (b.t >= b.stagT) { bossState('snap'); sfx.reel(); } break;
    }
  },
  hits(box, a) {
    const b = boss;
    if (!swingOn(box, this.box())) return;
    if (b.state === 'stall' || b.state === 'stagger' || b.state === 'falling') { pbHit(box, a, this.box()); return; }
    a.hit.add('boss'); a.stopLunge = true; spark(P.x + P.facing * 16, P.y - 20); sfx.tink(); P.recoilT = 0.1; P.recoilV = -P.facing * 200; if (a.type === 'down') pogo();   // spinning: the sword glances off
    if (!b.told) { b.told = 1; popup(P.x, P.y - 54, 'it just spins off the sword. wait till it stalls', '#cfd6e6'); }
  },
  squeaked(x, y, r) { const b = boss; if (Math.hypot(b.x - x, b.y - 26 - y) > r + 30 || b.state === 'stall' || b.state === 'stagger') return false; if (b.state === 'sleep' || b.state === 'swing') { bossState('stall'); b.y = b.base; } else pbStagger(1.0, 'it wobbles'); return true; },
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    const top = 0;
    if (b.state === 'gone') { spr('yoyo_down', b.x, b.base, false); return; }
    ctx.strokeStyle = 'rgba(236,232,220,0.85)'; ctx.lineWidth = 2;                             // its string, straight up out of sight
    const slack = b.state === 'sleep' || b.state === 'stall' || b.state === 'stagger' || b.down;
    ctx.beginPath(); ctx.moveTo(b.ax, top); ctx.quadraticCurveTo(b.ax + (slack ? 20 : 0), (top + b.y - 52) / 2, b.x, b.y - 52); ctx.stroke();
    const fr = b.down ? 'yoyo_down' : b.state === 'drop' ? 'yoyo_drop' : b.state === 'sleep' ? (b.vx ? 'yoyo_walk' : 'yoyo_sleep') : b.state === 'stall' ? 'yoyo_stall' : b.state === 'stagger' || b.state === 'falling' ? 'yoyo_hurt' : 'yoyo_hang';
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(b.x, b.base, 26, 3);
    const wob = b.state === 'stall' ? Math.round(Math.sin(b.t * 30) * 2) : 0;
    pbDraw(fr, b.x, b.y, b.f > 0, wob);
  },
  dropAt: () => [boss.x, boss.base - 30],
};

// ---------------------------------------------------------------- the kite
// A big diamond kite caught in the high branches, its string snagged on a twig up and off to the left, a long tail of
// rag bows. It swoops down along the branch on its string (duck it, or parry it and it tumbles into the twigs), snaps
// its tail at you, and dives straight down where you stand. Tangled in the twigs it's open; up in the air it's half.
// the rest of its tail (10/16/2026: the picture's tail stopped at the bottom of its cell, and the tail snap had nothing
// drawn at all, so it hit by a plain box). Rag bows on a string, hanging and swaying, curling back on the wind up and
// whipping across under it on the snap. Drawn in solid colors so the snap hits where the bows are
function kiteTail(b, flip) {
  const sx = b.x + (flip ? -5 : 5), sy = b.y + 18, side = Math.sign(P.x - b.x) || 1, n = 7, seg = 12;
  let a = Math.sin(b.t * 2.2) * 0.15;                                            // hanging, swaying a little (from straight down)
  if (b.state === 'tailWind') a = -side * 0.9 * Math.min(1, b.t / 0.25);
  else if (b.state === 'tail') { const k = Math.max(0, Math.min(1, (b.t - 0.08) / 0.28)); a = -side * 1.2 + side * 2.4 * k; }
  let x = sx, y = sy;
  for (let i = 0; i < n; i++) {
    const ai = a * (0.6 + 0.6 * i / n), nx = x + Math.sin(ai) * seg, ny = y + Math.cos(ai) * seg;
    ctx.fillStyle = '#ece8dc'; for (let j = 1; j < 4; j++) ctx.fillRect(Math.round(x + (nx - x) * j / 4), Math.round(y + (ny - y) * j / 4), 1, 1);
    x = nx; y = ny;
    const bx = Math.round(x), by = Math.round(y), [dk, md, lt] = i % 2 ? ['#7a1e22', '#c83a3a', '#ec7a6a'] : ['#24502e', '#4a9a5a', '#8ad08a'];
    ctx.fillStyle = dk; ctx.fillRect(bx - 4, by - 2, 3, 5); ctx.fillRect(bx + 2, by - 2, 3, 5);     // a little rag bow: two wings and the knot
    ctx.fillStyle = md; ctx.fillRect(bx - 3, by - 1, 2, 3); ctx.fillRect(bx + 2, by - 1, 2, 3); ctx.fillRect(bx - 1, by - 1, 3, 3);
    ctx.fillStyle = lt; ctx.fillRect(bx - 3, by - 1, 1, 1); ctx.fillRect(bx + 2, by - 1, 1, 1); ctx.fillRect(bx, by, 1, 1);
  }
}
BOSS_KINDS.kite = {
  soundStates: ['diveWind'],                                                   // when a squeak startles it (boss.js bossHeard)
  name: 'the kite', hp: 36, song: 'kite', phase2: 'the wind picks up', downText: 'the kite is down', starsY: 70,
  wakeSound: () => { sfx.paper(); setTimeout(() => sfx.whoosh(), 200); }, downSound: () => { sfx.paper(); sfx.thud(); },
  setup(def) { pbSetup(def, { base: def.y, ax: def.x - 180, ay: def.y - 320, hx: def.x, hy: def.y - 150 }); boss.x = boss.hx; boss.y = boss.hy; },
  box: () => ({ l: boss.x - 26, r: boss.x + 26, t: boss.y - 56, b: boss.y - 4 }),
  update(dt) {
    const b = boss, dx = P.x - b.x, fast = b.phase === 2 ? 1.3 : 1, lo = b.def.start + 2 * T, hi = b.def.end - 2 * T;
    b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
    const hover = () => { b.hx = Math.max(lo + 40, Math.min(hi - 40, b.hx + Math.sign(P.x - b.hx) * 70 * dt * fast)); b.x += (b.hx - b.x) * Math.min(1, dt * 3); b.y += (b.hy + Math.sin(b.t * 2.2) * 12 - b.y) * Math.min(1, dt * 3); };
    switch (b.state) {
      case 'dormant': if (Math.abs(dx) < 260 && P.ko <= 0 && !scene) playScene(pbIntro([b.x, b.y - 20])); break;
      case 'wake': b.x += Math.sin(b.t * 30) * 2; break;
      case 'idle':
        hover();
        if (b.cd <= 0) {
          const r = Math.random();
          if (r < 0.45) { bossState('swoopWind'); b.from = [b.x, b.y]; b.to = Math.max(lo, Math.min(hi, b.x + Math.sign(dx || 1) * 260)); sfx.paper(); popup(b.x, b.y - 70, '!', '#ff6b5a', true); }
          else if (r < 0.75) { bossState('diveWind'); b.from = [b.x, b.y]; sfx.paper(); bossBigTell(b.x, b.y - 70); }
          else { bossState('tailWind'); sfx.whoosh(); }
        }
        break;
      case 'swoopWind': b.y -= 60 * dt; if (b.t >= 0.45 / fast) { bossState('swoop'); sfx.whoosh(); } break;
      case 'swoop': {                                                                        // down along the branch and up the other side
        const k = Math.min(1, b.t / (0.9 / fast));
        b.x = b.from[0] + (b.to - b.from[0]) * k; b.y = b.from[1] + Math.sin(Math.PI * k) * (b.base - 36 - b.from[1]);
        if (!b.hitP && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossHit(this.box())) {   // once a swoop (it checked every frame)
          b.hitP = true; const out = foeStrike(b.x, 'kite', { cost: 20 });
          if (out === 'parried') { bossState('tangle'); b.y = b.base - 70; popup(b.x, b.y - 70, 'tangled in the twigs', '#ffd36b'); sfx.snap(); break; }
        }
        if (k >= 1) { b.hx = b.x; bossState('idle'); b.cd = 0.5 + Math.random() * 0.4; }
        break;
      }
      case 'diveWind': b.x += (P.x - b.x) * Math.min(1, dt * 4); b.y -= 40 * dt; if (b.t >= 0.5 / fast) { bossState('dive'); b.vy = 0; sfx.whoosh(); } break;
      case 'dive':                                                                           // nose first, straight down
        b.vy = Math.min(b.vy + 1400 * dt, 620); b.y = Math.min(b.base - 20, b.y + b.vy * dt);
        if (!b.hitP && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossHit(this.box())) {   // its move the shield can't take
          b.hitP = true; if (bossHeavy(b.x, 'kite', 1) === 'parried') { bossState('tangle'); b.y = b.base - 70; popup(b.x, b.y - 70, 'tangled in the twigs', '#ffd36b'); sfx.snap(); break; }
        }
        if (b.y >= b.base - 20) { shakeT = 0.2; shakeA = 3; sfx.thud(); puff(b.x, b.base, 10, 60); bossState('stuck'); }
        break;
      case 'stuck': b.y = b.base - 20; if (b.t >= 1.0) { bossState('rise'); } break;             // nose in the branch: open for a moment
      case 'rise': b.y -= 240 * dt; if (b.y <= b.hy) { b.y = b.hy; bossState('idle'); b.cd = 0.4; } break;
      case 'tailWind': hover(); if (b.t >= 0.4 / fast) { bossState('tail'); sfx.whip(); } break;
      case 'tail': {                                                                         // its tail snaps down and across the branch under it
        // it stays where it is once the tail's going (it used to keep drifting after him, so the tail followed him
        // after he'd already stepped out of it. The enemy audit's open question, checked 10/17/2026). It aims during the wind up
        b.hx = b.x; b.y += (b.hy + Math.sin(b.t * 2.2) * 12 - b.y) * Math.min(1, dt * 3);
        const hb = { l: b.x - 70, r: b.x + 70, t: b.y + 10, b: b.y + 90 };   // (it hits where the tail's drawn now: kiteTail)
        if (b.t > 0.1 && b.t < 0.4 && !b.hitP && phillAround() && bossHit(hb)) { b.hitP = true; foeStrike(b.x, 'kite', { cost: 20 }); }
        if (b.t >= 0.6) { bossState('idle'); b.cd = 0.7; }
        break;
      }
      case 'tangle': if (b.t >= 2.2) { bossState('rise'); } break;
      case 'stagger': if (b.t >= b.stagT) { bossState('rise'); } break;
    }
    if (['idle', 'swoopWind', 'diveWind', 'tailWind'].includes(b.state) && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossBumpOk() && bossHit(this.box())) hurt(b.x, 'kite', 1);
  },
  hits(box, a) {
    const b = boss;
    if (!swingOn(box, this.box())) return;
    const open = b.state === 'tangle' || b.state === 'stuck' || b.state === 'stagger' || b.state === 'falling';
    pbHit(box, a, this.box(), null, open ? 1 : 0.5);                                           // up in the air it's half as hurt
  },
  squeaked(x, y, r) { const b = boss; if (Math.hypot(b.x - x, b.y - 30 - y) > r + 30 || b.state === 'tangle' || b.state === 'stagger') return false; pbStagger(1.0, 'it flaps about'); return true; },
  draw() {
    const b = boss; pbWalls(); if (!b) return;
    if (b.state === 'gone') { spr('kite_down', b.x, b.base, false); return; }
    ctx.strokeStyle = 'rgba(236,232,220,0.8)'; ctx.lineWidth = 1;                             // its string, off to the twig it's snagged on
    ctx.beginPath(); ctx.moveTo(b.ax, b.ay); ctx.quadraticCurveTo((b.ax + b.x) / 2, (b.ay + b.y) / 2 + 30, b.x, b.y - 56); ctx.stroke();
    ctx.fillStyle = '#6e4a30'; ctx.fillRect(Math.round(b.ax - 6), Math.round(b.ay - 2), 12, 4);
    const fr = b.down ? 'kite_down' : b.state === 'swoop' || b.state === 'dive' ? 'kite_swoop' : b.state === 'tangle' || b.state === 'stuck' ? 'kite_tangle' : b.state === 'stagger' || b.state === 'falling' ? 'kite_hurt' : 'kite_fly_' + (Math.floor(b.t * 3) % 2 + 1);
    const flip = b.state === 'swoop' ? b.to < b.from[0] : P.x > b.x;
    if (!b.down) kiteTail(b, flip);
    pbDraw(fr, b.x, b.y, flip);
  },
  dropAt: () => [boss.x, boss.base - 30],
};
