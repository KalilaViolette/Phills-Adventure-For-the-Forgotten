'use strict';
// ---------- the tin soldier ----------
// A big wind-up toy soldier full of Grime, guarding the way out of Rootwood. He's tin all over, so the sword just clanks
// off him. Parry his bayonet thrust and he's knocked off his feet for a moment: that's when hits count, and a wound up
// big swing counts the most. He also brings his rifle down in a slam that sends a wave along the ground (jump it),
// and once he's hurt he winds himself up tighter: faster, thrusts in threes, and a charge across the clearing.
let boss = null;
const BOSS_KINDS = {};          // the other regions' bosses add themselves here: { setup, update, hits, draw, name, hp, squeaked }
const bossKind = () => boss && boss.def.kind && BOSS_KINDS[boss.def.kind];
const SOL = { hp: 14, walk: 44, reach: 66, wind: 0.62, wind2: 0.46, thrust: 0.15, recover: 0.5, raise: 0.8, slam: 0.14, stagger: 2.2, combo2: 2 };   // (10/23/2026: 20 down to 14, down for 2.2 s not 1.8, thrusts in twos once he's wound up, not threes: the first boss was about six clean parries)
const BOSS_DMG = { side: 1, up: 1, low: 1, down: 1, rollslash: 2, charged: 4, chargedchop: 4, chargedwhirl: 4 };
function setupBoss() {
  boss = null;
  const b = room.def.boss;
  if (!b) return;
  if (b.kind && BOSS_KINDS[b.kind]) { BOSS_KINDS[b.kind].setup(b); return; }
  if (world.flags[b.flag]) { boss = { def: b, x: b.x - 40, y: b.y, f: -1, state: 'gone', t: 0 }; return; }
  boss = { def: b, x: b.x, y: b.y, f: b.f, hp: SOL.hp, state: 'dormant', t: 0, cd: 1.0, flash: 0, vel: 0, hb: null, hitP: false, phase: 1, combo: 0, waves: [], clanks: 0, key: 0 };
}
// ---------- every boss arena (no leaving, no resting, till it's down) ----------
// The arena runs between the boss's walls (or a room can give its own, like the swan's pool). The fight only starts
// once he's properly inside it, a few tiles in from either side, whichever way he came. From then till the boss is down
// he's held inside it, every way out of the room is shut (top and bottom too), and resting and the crow are off
function bossArena() {
  const d = boss.def;
  if (d.arena) return { l: d.arena[0] * T, r: (d.arena[1] + 1) * T };
  const mid = room.W / 2, ws = d.walls || [];
  const lw = ws.filter(w => w[2] < mid), rw = ws.filter(w => w[0] >= mid);
  return { l: lw.length ? (Math.max(...lw.map(w => w[2])) + 1) * T : 0, r: rw.length ? Math.min(...rw.map(w => w[0])) * T : room.pxW };
}
// only a boss that's in the middle of its fight reacts to the squeak (squeaking near the beaten sailboat woke it
// back up and it came at me). Not one that's beaten, sinking, or still asleep before the fight
const bossFighting = () => !!(boss && boss.state !== 'dormant' && boss.state !== 'gone' && boss.state !== 'falling' && boss.state !== 'wake' && !boss.down && !world.flags[boss.def.flag]);
// A squeak at a boss (10/18/2026): it used to knock every one of them off balance for most of a second, every
// time, which made it the way out of anything. Now it only startles one caught in its moment, the wind-up its soundStates
// names (a cannon being lined up, a honk being drawn in, a lure dangling), and anything else it shrugs off. His heart
// takes it further later (squeakStage().bossAny). The fluff burst keeps the old rule: it's a push, not a noise
function bossHeard(x, y, r, how) {
  if (!bossFighting()) return false;
  const k = bossKind();
  if (!k) return soldierSqueaked(x, y, r);
  if (!k.squeaked) return false;
  if (how === 'squeak' && !squeakStage().bossAny && !(k.soundStates || []).includes(boss.state)) {
    if (!boss.toldShrug && Math.hypot(boss.x - x, boss.y - 40 - y) < r + 70) { boss.toldShrug = true; popup(boss.x, boss.y - 100, "it doesn't flinch. not right now", '#cfd6e6'); }
    return false;
  }
  return k.squeaked(x, y, r);
}
// where the camera looks up and down while a fight's on, if the boss says (camY): null leaves it following him
function bossCamY() { const k = bossKind(); return bossLocked() && k && k.camY ? k.camY() : null; }
const bossLocked = () => !!(boss && boss.state !== 'dormant' && boss.state !== 'gone' && !boss.down && !world.flags[boss.def.flag]);
const inArena = (m = 3 * T) => { const a = bossArena(); return P.x > a.l + m && P.x < a.r - m; };
function holdInArena() {
  if (!bossLocked()) return;
  const a = bossArena();
  if (bodyL(P.x) < a.l) { P.x += a.l - bodyL(P.x); if (P.vx < 0) P.vx = 0; }
  if (bodyR(P.x) > a.r) { P.x -= bodyR(P.x) - a.r; if (P.vx > 0) P.vx = 0; }
}
function bossState(s) { boss.state = s; boss.t = 0; boss.hb = null; boss.hitP = false; boss.snapped = false; boss.landed = false; }   // (each attack's own once-only latches start fresh too: a parried reel was leaving the next one's snap already used, the enemy audit 10/17/2026)
function bossWalls(on) {
  for (const [x0, y0, x1, y1] of boss.def.walls) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) room.map[y * room.W + x] = on ? 1 : 0;
  boss.walled = on;
}
const bossBox = () => ({ l: boss.x - 15, r: boss.x + 15, t: boss.y - 84, b: boss.y });
// ---- every boss by Phill's rules now (10/16/2026: the boss combat audit) ----
const swingOn = (box, hb) => overlap(box, hb) && swordHits(hb);                 // his hit lands where the sword is as it's drawn, like on the regular enemies
const bossDmg = (table, a) => (table[a.type] || 1) + (a.level || 0);            // a charged step deep in the combo: one more for each step in
function bossBigTell(x, y) { popup(x, y, '!!', '#ff6b5a', true); sfx.heavyWindup(); }   // winding up the move the shield can't take
// that move landing: too heavy to block (it says so), a parry still answers it, a roll gets out of the way
const bossHeavy = (x, kind, dmg, y) => foeStrike(x, kind, { cost: 34, heavy: true, dmg, y });
const bossBumpOk = () => !(P.bumpSafe > 0);                                     // just after a block, bumping into it doesn't hurt him either
// how close a point is to a box (for the squeak and the fluff burst: a ring reaches the boss's body, not just its middle
// side to side. Five of them were reacting to a squeak way above or below them, the enemy audit 10/17/2026)
const boxReach = (hb, x, y, r) => Math.hypot(Math.max(hb.l - x, 0, x - hb.r), Math.max(hb.t - y, 0, y - hb.b)) <= r;
// beaten: everything it had going stops for good. Its waves, lures and shots go, and it comes down if it was in the air
// (a lure was still hurting him during the tangle's down scene, and a swan beaten mid bounce landed and slammed again)
function bossEnd() {
  const b = boss; if (!b) return;
  b.waves = []; b.lures = []; b.shots = 0; b.lashEnd = null;
  if (b.air) { b.air = false; b.vy = 0; if (b.base !== undefined) b.y = b.base; }
  for (const s of shots) s.dead = true;
}

function updateBoss(dt) {
  const b = boss;
  if (!b || b.state === 'gone') return;
  if (b.state === 'dormant' && !inArena()) return;                               // not till he's properly in
  holdInArena();
  if (bossKind()) {
    if (b.state === 'falling' || b.down) { b.t += dt; b.flash = Math.max(0, (b.flash || 0) - dt); if (bossKind().falling) bossKind().falling(dt); return; }   // beaten: just its going-down animation, no more fighting
    bossKind().update(dt); return;
  }
  b.t += dt; b.flash = Math.max(0, b.flash - dt); b.cd -= dt;
  b.key += dt * (b.state === 'dormant' ? 0 : b.phase === 2 ? 9 : 5);
  if (b.vel) { b.x = Math.max(4 * T, Math.min(room.pxW - 4 * T, b.x + b.vel * dt)); b.vel *= Math.pow(0.004, dt); if (Math.abs(b.vel) < 3) b.vel = 0; }
  if (b.state !== 'dormant' && b.state !== 'falling' && Math.random() < dt * 4) part(b.x - b.f * 6 + (Math.random() * 2 - 1) * 8, b.y - 40 - Math.random() * 30, 0, 20, 0.8, '#2c1c3c', 2, 200);   // Grime dripping out of him
  for (const w of b.waves) {                                                     // the slam's wave running along the ground
    w.x += w.v * dt; w.t += dt;
    if (Math.random() < dt * 30) part(w.x, b.y - 2, 0, -60 - Math.random() * 40, 0.3, '#4a3462', 2, 300);
    if (!w.hit && phillAround() && P.y > b.y - 16 && Math.abs(P.x - w.x) < 10) { w.hit = true; hurt(w.x - Math.sign(w.v), 'soldier', 1); }
    if (w.x < 2 * T || w.x > room.pxW - 2 * T) w.dead = true;
  }
  b.waves = b.waves.filter(w => !w.dead);
  const dx = P.x - b.x, dist = Math.abs(dx);
  const facePhill = () => { b.f = Math.sign(dx) || b.f; };
  switch (b.state) {
    case 'dormant':
      // no parry yet: the fight doesn't start (it can't be won: his tin only opens up when his bayonet's parried, and
      // the arena would shut him in, the progression audit 10/17/2026). He stays asleep, Phill gets a nudge back and a hint
      if (P.x > b.def.start && P.ko <= 0 && !scene && !can('parry')) {
        P.x = Math.min(P.x, b.def.start - 6); if (P.vx > 0) P.vx = -60;
        if ((b.toldParry || 0) <= 0) { b.toldParry = 4; sfx.clank(); popup(P.x, P.y - 54, 'his tin is way too thick. the squirrel back in the hollow might know a way past that bayonet', '#cfd6e6'); }
      } else if (P.x > b.def.start && P.ko <= 0 && !scene) playScene(bossIntro());
      if (b.toldParry > 0) b.toldParry -= dt;
      break;
    case 'idle':
      if (b.cd > 0) break;
      facePhill();
      if (b.phase === 2 && dist > 150 && Math.random() < 0.6) { bossState('chargeWind'); sfx.ticking(); bossBigTell(b.x, b.y - 100); break; }
      if (dist > SOL.reach + 6) { bossState('march'); break; }
      if (Math.random() < 0.32) { bossState('raise'); sfx.heavyWindup(); popup(b.x, b.y - 100, '!!', '#ff6b5a', true); break; }
      b.combo = b.phase === 2 ? 3 : 1; bossState('aim'); sfx.windup();
      break;
    case 'march': {
      facePhill();
      b.x += b.f * SOL.walk * (b.phase === 2 ? 1.3 : 1) * dt;
      if (Math.floor(b.t / 0.32) !== Math.floor((b.t - dt) / 0.32)) sfx.stomp();
      if (dist <= SOL.reach) { b.combo = b.phase === 2 ? SOL.combo2 : 1; bossState('aim'); sfx.windup(); }
      else if (b.t > 2.2) { bossState('raise'); sfx.heavyWindup(); popup(b.x, b.y - 100, '!!', '#ff6b5a', true); }
      break;
    }
    case 'aim': {                                                                // rifle back, bayonet glinting... then the thrust
      const wind = b.phase === 2 ? SOL.wind2 : SOL.wind;
      if (b.t >= wind - 0.14 && !b.glint) { b.glint = true; spark(b.x + b.f * 50, b.y - 52); sfx.glint(); }
      if (b.t >= wind) { b.glint = false; bossState('thrust'); sfx.stab(); }
      break;
    }
    case 'thrust': {
      b.x = Math.max(4 * T, Math.min(room.pxW - 4 * T, b.x + b.f * 260 * dt));
      b.hb = { l: b.f > 0 ? b.x + 10 : b.x - SOL.reach, r: b.f > 0 ? b.x + SOL.reach : b.x - 10, t: b.y - 46, b: b.y - 6 };   // the thrust goes in low at him now (it's drawn that way: it went over his head)
      if (!b.hitP && phillAround() && bossHit(b.hb)) {
        b.hitP = true;
        const out = foeStrike(b.x, 'soldier', { cost: 20 });                    // a normal hit to block: three in a row empties the shield, it doesn't break it
        if (out === 'parried') { bossStagger(SOL.stagger); popup(b.x, b.y - 100, 'knocked off his feet', '#ffd36b'); break; }
        if (out === 'blocked') { P.vx = -P.facing * 160; }
      }
      if (b.t >= SOL.thrust) {
        if (--b.combo > 0) { bossState('aim'); b.t = SOL.wind2 * 0.45; facePhill(); }
        else bossState('recover');
      }
      break;
    }
    case 'recover': if (b.t >= SOL.recover) { bossState('idle'); b.cd = 0.35 + Math.random() * 0.4; } break;
    case 'raise': if (b.t >= SOL.raise * (b.phase === 2 ? 0.8 : 1)) { bossState('slam'); } break;
    case 'slam':
      if (!b.slammed) {
        b.slammed = true; shakeT = 0.3; shakeA = 4; sfx.slam(); puff(b.x + b.f * 30, b.y, 14, 90, '#4a3462');
        b.waves.push({ x: b.x + b.f * 30, v: b.f * 250, t: 0 }); if (b.phase === 2) b.waves.push({ x: b.x - b.f * 10, v: -b.f * 250, t: 0 });
        b.hb = { l: b.x + (b.f > 0 ? 0 : -50), r: b.x + (b.f > 0 ? 50 : 0), t: b.y - 40, b: b.y };
        if (phillAround() && bossHit(b.hb) && bossHeavy(b.x, 'soldier', 2) === 'parried') { b.slammed = false; bossStagger(SOL.stagger); popup(b.x, b.y - 100, 'knocked off his feet', '#ffd36b'); break; }
      }
      if (b.t >= 0.7) { b.slammed = false; bossState('idle'); b.cd = 0.5; }
      break;
    case 'chargeWind':                                                           // winds his key right up, then runs at you
      if (b.t >= 0.75) { bossState('charge'); sfx.whoosh(); }
      break;
    case 'charge': {
      b.x += b.f * 330 * dt;
      b.hb = { l: b.f > 0 ? b.x : b.x - 50, r: b.f > 0 ? b.x + 50 : b.x, t: b.y - 64, b: b.y - 20 };
      if (!b.hitP && phillAround() && bossHit(b.hb)) {
        b.hitP = true;
        if (bossHeavy(b.x, 'soldier', 2) === 'parried') { bossStagger(2.4); popup(b.x, b.y - 100, 'knocked flat', '#ffd36b'); break; }   // (the normal parry window now, not its own tighter one)
      }
      if (b.x < 4 * T + 2 || b.x > room.pxW - 4 * T - 2) {                        // into the wall: clang, dazed
        b.x = Math.max(4 * T, Math.min(room.pxW - 4 * T, b.x)); shakeT = 0.3; shakeA = 4; sfx.clank(); sfx.thud();
        bossStagger(1.2);
      }
      break;
    }
    case 'stagger': if (b.t >= b.stagT) { bossState('idle'); b.cd = 0.4; } break;
    case 'falling': break;
  }
  // walking into him hurts. Rolling doesn't: he's tall and there's a gap between his legs, so a roll (or crawling, or just
  // coming up out of one) takes Phill under him to the other side (a friend's playtest, 10/14/2026)
  const under = P.roll > 0 || P.rollEndT > 0 || P.h <= ROLL_H;
  if (b.state !== 'stagger' && b.state !== 'falling' && b.state !== 'dormant' && !under && phillAround() && P.inv <= 0 && !dodgeSafe() && !P.story && bossBumpOk() && bossHit(bossBox(), { l: bodyL(P.x) + 3, r: bodyR(P.x) - 3, t: P.y - P.h + 4, b: P.y })) hurt(b.x, 'soldier', 1);
}
// a squeak at him: he's tin, it just rings off him (it did nothing before, and nothing said so)
function soldierSqueaked(x, y, r) {
  const b = boss; if (Math.abs(b.x - x) > r + 30) return false;
  sfx.clank(); if (!b.toldSqueak) { b.toldSqueak = 1; popup(b.x, b.y - 100, 'it just rings off his tin', '#cfd6e6'); }
  return true;
}
function bossStagger(time) { bossState('stagger'); boss.stagT = time; boss.vel = -boss.f * 90; sfx.clank(); }

function bossHits(box, a) {
  const b = boss;
  if (!b || b.state === 'gone' || b.state === 'falling' || b.state === 'dormant' || a.hit.has('boss')) return;
  if (bossKind()) { bossKind().hits(box, a); return; }
  if (!swingOn(box, bossBox())) return;
  a.hit.add('boss'); a.stopLunge = true;
  const [cx, cy] = swordContact(bossBox());
  if (b.state !== 'stagger') {                                                 // tin all over: clank
    impact(cx, cy, P.facing, 1, 'armor'); sfx.clank(); P.recoilT = 0.1; P.recoilV = -P.facing * 200; hitstop = Math.max(hitstop, 0.04);
    if (b.clanks++ % 4 === 0) popup(P.x, P.y - 54, b.clanks < 4 ? 'clank. knock him off his feet first' : 'clank', '#cfd6e6');
    if (a.type === 'down') pogo();
    return;
  }
  b.hp -= bossDmg(BOSS_DMG, a) * swordBonus() * (a.scale || 1); b.flash = 0.12; impact(cx, cy, P.facing, isCharged(a.type) ? 1.8 : 1.2, 'clean', ['#d0d4dc', '#8a90a0']); sfx.hitTin();
  hitstop = Math.max(hitstop, isCharged(a.type) ? 0.12 : 0.06); shakeT = 0.12; shakeA = 2; sfx.hit(); rally();
  if (a.type === 'down') pogo();
  for (let i = 0; i < 6; i++) part(cx, cy, (Math.random() * 2 - 1) * 90, -Math.random() * 90, 0.5, '#2c1c3c', 2, 300);
  if (b.phase === 1 && b.hp <= SOL.hp / 2) {                                   // winds himself up tighter
    b.phase = 2; bossState('idle'); b.cd = 0.9; sfx.ticking(); popup(b.x, b.y - 100, 'he winds himself up tighter', '#ff8a6b');
    for (let i = 0; i < 24; i++) part(b.x, b.y - 50, (Math.random() * 2 - 1) * 160, -Math.random() * 160, 0.8, '#2c1c3c', 2, 300);
  }
  if (b.hp <= 0) playScene(bossDown());
}

// the fight starting: the way back closes behind him (Bramble shoots up across it), the soldier jerks into life
function bossIntro() {
  const b = boss;
  return [
    run(() => { bossWalls(true); sfx.thorns(); shakeT = 0.3; shakeA = 2; music.play(null); }),
    bars(true), camTo(b.x - 60, b.y - 70, 0.8), wait(0.5),
    run(() => { sfx.ticking(); }), wait(0.9),
    run(() => { bossState('wake'); sfx.clank(); shakeT = 0.2; shakeA = 2; }), wait(0.7),
    run(() => { music.play('soldier'); }), camBack(), wait(0.4), bars(false),
    run(() => { bossState('idle'); b.cd = 0.6; }),
  ];
}
// beaten: the Grime bursts out of him, his key winds down, and over he goes
function bossDown() {
  const b = boss;
  return [
    run(() => { bossState('falling'); bossEnd(); hitstop = 0.25; music.play(null); sfx.clank(); P.vx = 0; }),
    bars(true), camTo(b.x, b.y - 60, 0.6),
    (t, dt) => { if (Math.random() < dt * 60) part(b.x + (Math.random() * 2 - 1) * 12, b.y - 30 - Math.random() * 50, (Math.random() * 2 - 1) * 140, -Math.random() * 180, 0.9, Math.random() < 0.5 ? '#2c1c3c' : '#4a3462', 2, 300); return t > 1.4; },
    run(() => { b.down = true; shakeT = 0.4; shakeA = 4; sfx.thud(); sfx.clank(); puff(b.x, b.y, 20, 110); }),
    wait(0.9),
    run(() => {
      world.flags[b.def.flag] = true; saveWorld(); bossWalls(false); sfx.idea();
      for (let i = 0; i < 18; i++) dropAcorn(b.x, b.y - 30);
      popup(b.x, b.y - 70, 'the tin soldier is down', '#ffd36b', true);
      b.state = 'gone';
    }),
    wait(0.8), camBack(), bars(false), run(() => music.play(room.def.music)),
  ];
}

function bossFrame() {
  const b = boss, now = performance.now() / 1000;
  switch (b.state) {
    case 'dormant': return 'sol_stand';
    case 'wake': return 'sol_wake';
    case 'march': return 'sol_march_' + (Math.floor(b.t / 0.16) % 4 + 1);
    case 'aim': return 'sol_aim';
    case 'thrust': return 'sol_thrust';
    case 'recover': return 'sol_recover';
    case 'raise': return 'sol_raise';
    case 'slam': return 'sol_slam';
    case 'chargeWind': return 'sol_aim';
    case 'charge': return 'sol_charge';
    case 'stagger': return 'sol_dizzy';
    case 'falling': return b.down ? 'sol_down' : 'sol_dizzy';
    case 'gone': return 'sol_down';
    default: return Math.floor(now * 2) % 2 ? 'sol_stand' : 'sol_stand2';
  }
}
function drawBoss() {
  const b = boss;
  if (!b) return;
  if (bossKind()) { bossKind().draw(); return; }
  if (b.walled) for (const [x0, y0, x1, y1] of b.def.walls) drawBrambleWall(x0 * T, y0 * T, (x1 - x0 + 1) * T, (y1 - y0 + 1) * T);
  const shake = b.state === 'raise' || b.state === 'chargeWind' ? Math.round(Math.sin(b.t * 50)) : b.state === 'stagger' ? Math.round(Math.sin(b.t * 12) * 2) : 0;
  ctx.fillStyle = 'rgba(0,0,0,0.3)'; ellipse(b.x, b.y, 22, 2);
  const fr = bossFrame();
  spr(fr, b.x + shake, b.y, b.f > 0, undefined, 'sol');
  if (b.flash > 0) { ctx.globalCompositeOperation = 'lighter'; spr(fr, b.x, b.y, b.f > 0, 0.55, 'sol'); ctx.globalCompositeOperation = 'source-over'; }
  if (b.state !== 'gone' && b.state !== 'falling' && b.state !== 'dormant') {     // his key, turning in his back
    const kx = b.x - b.f * 11, ky = b.y - 74, a = b.key;
    ctx.fillStyle = '#2a2030'; ctx.fillRect(Math.round(kx - b.f * 3) - 1, ky - 1, 4, 3);
    const w = Math.round(Math.abs(Math.cos(a)) * 6) + 1;
    ctx.fillStyle = '#c8a040'; ctx.fillRect(Math.round(kx - b.f * 6) - 1, ky - 5, 3, 11); ctx.fillRect(Math.round(kx - b.f * 6) - 1 - (w > 3 ? 1 : 0), ky - 5, w > 3 ? 4 : 2, 3); ctx.fillRect(Math.round(kx - b.f * 6) - 1 - (w > 3 ? 1 : 0), ky + 3, w > 3 ? 4 : 2, 3);
  }
  if (b.state === 'stagger') for (let i = 0; i < 4; i++) { const a = b.t * 7 + i * 1.6; ctx.fillStyle = '#ffd36b'; ctx.fillRect(Math.round(b.x + Math.cos(a) * 14) - 1, Math.round(b.y - 96 + Math.sin(a) * 3), 2, 2); }
  for (const w of b.waves || []) { ctx.fillStyle = '#4a3462'; ctx.fillRect(Math.round(w.x) - 4, b.y - 10, 8, 10); ctx.fillStyle = '#6a4a8a'; ctx.fillRect(Math.round(w.x) - 2, b.y - 14, 4, 6); ctx.fillStyle = '#2c1c3c'; ctx.fillRect(Math.round(w.x) - 6, b.y - 4, 12, 4); }
}
function drawBrambleWall(x, y, w, h) {
  ctx.fillStyle = '#1e0e16'; ctx.fillRect(x, y, w, h);
  for (let k = 0; k < 4; k++) { ctx.fillStyle = k % 2 ? '#4e2436' : '#341826'; for (let yy = 0; yy < h; yy += 2) ctx.fillRect(x + 3 + k * 7 + Math.round(Math.sin((yy + k * 9) * 0.25) * 3), y + yy, 3, 2); }
  ctx.fillStyle = '#cdb8a8'; for (let yy = 4; yy < h; yy += 9) { ctx.fillRect(x + (yy * 7) % w, y + yy, 3, 1); ctx.fillRect(x + ((yy * 13) % w), y + yy + 4, 1, 3); }
}
function drawBossBar() {
  const b = boss;
  if (!b || b.state === 'gone' || b.state === 'dormant' || scene && b.state !== 'falling' && b.state !== 'wake') return;
  const w = Math.min(260, VW - 120), x = Math.round((VW - w) / 2), y = VH - 30;
  const K = bossKind();
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#e8e6f0'; ctx.fillText(K ? K.name : 'the tin soldier', VW / 2, y - 4); ctx.textAlign = 'left';
  ctx.fillStyle = '#0e0f18'; ctx.fillRect(x - 1, y - 1, w + 2, 6);
  ctx.fillStyle = '#2a2234'; ctx.fillRect(x, y, w, 4);
  ctx.fillStyle = b.phase === 2 ? '#c8483a' : '#c8a040'; ctx.fillRect(x, y, Math.round(w * Math.max(0, b.hp) / (K ? K.hp : SOL.hp)), 4);
}
