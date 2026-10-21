'use strict';
// ---------- the bear (10/20/2026) ----------
// The forgotten teddy bear. He never got a name: the kid who got him dropped him in the park less than five minutes in.
// Phill first sees him right after the tin soldier, at the east edge, looking like he's just minding his own business.
// He's the one who got the Grime into the soldier in the first place. He was watching the whole fight from the back of the
// clearing, and once the soldier fell he went on ahead like he had nothing to do with it. Phill never sees that part.
// At the start he's approachable, with a slight smile: he finally has company that doesn't know his past and accepts him.
// When Phill asks his name it hurts, and he flinches. His frames are made by Sprites/bear_sprites.py
const BEAR_SHEET = 'art/bear/bear.png';
const BEAR_AT = {
  meet: { room: 'eastedge', x: 274, y: 448, talk: 110, clear: [220, 100] },   // where he stands at the east edge (past the big trunk, so he shows against the dark), how close Phill comes to start the meeting, and how far round him the Grime things have to be gone first
  watch: { room: 'clearing', layer: 1, x: 200, y: 224, scale: 0.5 },       // watching the soldier fight, far back on the clearing's second layer (in the shade, off to the side of the light)
  invite: { room: 'eastedge', x: 684, y: 448, go: 40 },                     // waiting under his hole after Phill's first boss, and how far in from where Phill comes in before he calls out
  home: { room: 'bearhome', x: 27 * 16, y: 18 * 16 },                     // in his home, between the seats and his bed
};
// his picture is loaded with the rooms he's in, like the rest of a room's pictures
(() => {
  const _ROOM = window.ROOM;
  window.ROOM = def => {
    if ((def.id === BEAR_AT.meet.room || def.id === BEAR_AT.watch.room || def.id === BEAR_AT.home.room) && def.art) def.art.uses = [...(def.art.uses || []), BEAR_SHEET];
    _ROOM(def);
  };
})();
const bearWaiting = () => !!(world.flags.soldierDown && !world.flags.metBear);
const firstBossDown = () => !!(world.flags.sailboatDown || world.flags.topDown);       // the sailboat or the spinning top, whichever he did first
const inviteWaiting = () => firstBossDown() && !world.flags.bearInvited;

// his breath (10/21/2026): slow, in two steps and out again, most of the time resting. It was a hard swap every 0.75 s
// between in and out, and that read as his whole body lurching
const BREATH = [[1.7, 0], [0.3, 1], [1.0, 2], [0.4, 1]];                             // how long at each step, and the step (0 rest, 1 a little in, 2 all the way in)
const BREATH_T = BREATH.reduce((n, [d]) => n + d, 0);
function breathAt(t) { let u = t % BREATH_T; for (const [d, k] of BREATH) { if (u < d) return k; u -= d; } return 0; }
// which picture: a pose a scene holds (the flinch), his mouth going while his words are still coming up, a blink now
// and then, otherwise breathing. The blink and the talking are drawn at whatever step of the breath he's at
function bearFrame(a) {
  const f = a.face || 'L', b = breathAt(a.t);
  if (a.pose) return a.pose + '_' + f;
  if (a.walk) return 'walk_' + (Math.floor(a.walk.t / BEAR_STEP) % BEAR_WALK_N) + '_' + f;
  const line = talk && talk.who === 'bear' ? talk.lines[talk.i] : null;
  if (line && talk.n < line.length) return (Math.floor(a.t / 0.13) % 2 ? 'talk_' : 'idle_') + b + '_' + f;
  if (a.t % 3.7 < 0.12) return 'blink_' + b + '_' + f;
  return 'idle_' + b + '_' + f;
}
// walking (10/21/2026): a waddle, 8 pictures, slow. bearWalkTo is a scene step: he turns the way he's going and walks
// there at his own pace, then stands
const BEAR_STEP = 0.09, BEAR_PACE = 30, BEAR_WALK_N = 8;
const bearWalkTo = (x, pace = BEAR_PACE) => {
  let mv = null;
  return (t, dt) => {
    const a = actors.bear; if (!a) return true;
    if (t === 0) { a.face = x < a.x ? 'L' : 'R'; a.walk = { t: 0 }; mv = moveActor('bear', x, a.y, Math.max(0.05, Math.abs(x - a.x) / pace), { linear: true }); }
    a.walk.t += dt || 0;
    if (mv(t, dt)) { a.walk = null; return true; }
    return false;
  };
};
// climbing the lace (10/21/2026): bearClimb is a scene step. From under the lace he goes up it, a pull every BEAR_PULL
// seconds, till he's in his hole, then he's peeking out of it
const BEAR_PULL = 0.3, BEAR_CLIMB_PACE = 34;
const bearClimb = () => (t, dt) => {
  const a = actors.bear, h = room.def.bearhole; if (!a || !h) return true;
  if (t === 0) { a.climb = { t: 0 }; a.face = h.cx < a.x ? 'L' : 'R'; a.x = h.x + (a.face === 'L' ? 16 : -16); }   // (the lace runs up 4 px in from the side of his picture that he's facing: both paws on it)
  const was = Math.floor(a.climb.t / BEAR_PULL); a.climb.t += dt || 0; a.y -= BEAR_CLIMB_PACE * (dt || 0);
  if (Math.floor(a.climb.t / BEAR_PULL) !== was && a.y > h.cy + 16) sfx.rustle(0.25);   // a little rustle each pull, while he's still out on the lace
  if (a.y <= h.cy - 18) { a.climb = null; a.peek = true; a.face = 'L'; a.pose = null; return true; }   // his feet past the top of the hole: he's in
  return false;
};
function drawBearPic(im, name, x, y) {
  const F = window.BEAR_FRAMES, fr = F && F.frames[name];
  if (!fr) return;
  ctx.drawImage(im, fr[0], fr[1], F.w, F.h, Math.round(x - F.feet[0]), Math.round(y - F.feet[1]), F.w, F.h);
}
// him as a scene actor (scene.js draws actors of kind 'bear' with this)
function drawBear(a) {
  const im = Assets.get(BEAR_SHEET);
  if (!im) return;
  const h = room.def.bearhole;
  if (a.peek && h) {                                                                   // his head poking out of his hole, paws on the rim (10/21/2026: its own picture)
    ctx.save(); ctx.beginPath(); ctx.ellipse(h.cx, h.cy, 12, 16, 0, 0, Math.PI * 2); ctx.clip();
    drawBearPic(im, 'peek_' + (a.face || 'L'), h.cx + 2, h.cy + 56);
    ctx.restore(); return;
  }
  if (a.climb && h) {                                                                  // going up the lace into his hole: only what's below the hole or inside it shows, so he goes in (10/21/2026)
    ctx.save(); ctx.beginPath(); ctx.rect(h.cx - 200, h.cy + 16, 400, 600); ctx.ellipse(h.cx, h.cy, 12, 16, 0, 0, Math.PI * 2); ctx.clip();
    drawBearPic(im, 'climb_' + (Math.floor(a.climb.t / BEAR_PULL) % 2 + 1) + '_' + (a.face || 'L'), a.x, a.y);
    ctx.restore(); return;
  }
  groundShadow(a.x, a.y, 60, 13);
  drawBearPic(im, bearFrame(a), a.x, a.y);
}

// ---- watching the soldier fight from the back of the clearing. Small and hazy that far back, turned toward the fight.
// Gone the moment the soldier's down
const _drawWildlifeB = drawWildlife;
drawWildlife = (at, camX, camY) => {
  _drawWildlifeB(at, camX, camY);
  const w = BEAR_AT.watch, L = room && room.def.art.layers && room.def.art.layers[w.layer];
  if (!L || at !== 'L' + w.layer || room.def.id !== w.room || world.flags.soldierDown) return;
  const im = Assets.get(BEAR_SHEET); if (!im) return;
  const X = w.x - camX * L.f, Y = w.y - camY * (L.fy ?? L.f);
  if (X < -60 || X > VW + 60) return;
  const t = performance.now() / 1000, toward = boss && boss.x !== undefined ? boss.x : P.x;
  const f = toward > X + camX ? 'R' : 'L';
  ctx.save(); ctx.globalAlpha = Math.min(1, 0.25 + L.f * 0.8);           // the same haze as the animals that far back
  ctx.translate(Math.round(X), Math.round(Y)); ctx.scale(w.scale, w.scale);
  drawBearPic(im, (t % 4.1 < 0.12 ? 'blink_' : 'idle_') + breathAt(t) + '_' + f, 0, 0);
  ctx.restore();
};

// ---- the east edge: he's there till Phill's met him. The meeting only starts once the Grime things round him are beaten
// (10/20/2026), so nothing comes at Phill while they talk
function setupBearRoom() {
  const m = BEAR_AT.meet, iv = BEAR_AT.invite, id = room.def.id;
  room.bearEntry = { x: P.x, y: P.y };
  setupBearBridge();
  if (id === iv.room && inviteWaiting()) {                                             // after Phill's first boss: waiting under his hole for him. Not a Grime thing in the
    foes.length = 0;                                                                   // room this time (they're back next time), and he doesn't say why
    addActor('bear', { kind: 'bear', x: iv.x, y: iv.y, face: P.x < iv.x ? 'L' : 'R', layer: 'back' });
    return;
  }
  if (id === iv.room && world.flags.bearInvited && !world.flags.bearVisited)           // asked him in: still peeking out, waiting for him to come up
    addActor('bear', { kind: 'bear', peek: true, x: 0, y: 0, face: 'L', layer: 'back' });
  if (id === BEAR_AT.home.room) {                                                      // he's home whenever Phill comes up (10/20/2026)
    const hm = BEAR_AT.home;
    addActor('bear', { kind: 'bear', x: hm.x, y: hm.y, face: 'L', layer: 'back' });
    if (!world.flags.bearVisited) playScene(SCENES.bearHome(room.def));                 // the first time
    return;
  }
  if (id !== m.room || !bearWaiting()) return;
  addActor('bear', { kind: 'bear', x: m.x, y: m.y, face: 'R', layer: 'back' });   // facing away, busy with nothing much
}
const _setupPondRoomBear = setupPondRoom;
setupPondRoom = () => { _setupPondRoomBear(); setupBearRoom(); };
const bearClear = () => { const m = BEAR_AT.meet; return !foes.some(f => f.hp > 0 && f.state !== 'down' && Math.abs(f.x - m.x) < m.clear[0] && Math.abs(f.y - m.y) < m.clear[1]); };
function checkBear() {
  const m = BEAR_AT.meet, a = actors.bear;
  if (!a || a.peek || inviteWaiting() || room.def.id !== m.room || !bearWaiting() || P.story || sceneRunning() || P.ko > 0 || !P.ground) return;
  if (Math.abs(P.x - m.x) > m.talk || Math.abs(P.y - m.y) > 40 || !bearClear()) return;
  world.flags.metBear = true; saveWorld();
  playScene(SCENES.bearMeet(room.def));
}
// the invite: it can't be missed, so it starts a few steps in from whichever way Phill came in (10/20/2026)
function checkInvite() {
  const iv = BEAR_AT.invite, a = actors.bear, e = room.bearEntry;
  if (!a || a.peek || room.def.id !== iv.room || !inviteWaiting() || P.story || sceneRunning() || P.ko > 0 || !P.ground || !e) return;
  if (Math.hypot(P.x - e.x, P.y - e.y) < iv.go) return;
  playScene(SCENES.bearInvite(room.def));
}
// once he's asked, his home is the way on: going for either way out of the east edge, he calls Phill back (10/20/2026)
const mustGoUp = () => room && room.def.id === BEAR_AT.invite.room && !!world.flags.bearInvited && !world.flags.bearVisited;
function checkLeave() {
  if (!mustGoUp() || P.story || sceneRunning() || P.ko > 0) return;
  const left = P.x < 3 * T && P.y > 20 * T, right = P.x > 46.5 * T && P.y < 13 * T;    // nearly out through the clearing's way, or up at the Playground's
  if (left || right) playScene(SCENES.bearThisWay(room.def, left ? 6 * T : 44.5 * T));
}
const _goToB = goTo;
goTo = (id, door) => {                                                                // (and if he gets to a way out anyway, he doesn't go through it)
  if (mustGoUp() && id !== BEAR_AT.home.room) { if (!sceneRunning()) playScene(SCENES.bearThisWay(room.def, P.x < room.pxW / 2 ? 6 * T : 44.5 * T)); return; }
  _goToB(id, door);
};
// in his home he turns to look at Phill
function faceBearHome() {
  const a = actors.bear;
  if (!a || a.pose || a.walk || room.def.id !== BEAR_AT.home.room) return;
  if (Math.abs(P.x - a.x) > 6) a.face = P.x < a.x ? 'L' : 'R';
}
const _checkEventsBear = checkEvents;
checkEvents = dt => { _checkEventsBear(dt); checkBear(); checkInvite(); checkLeave(); faceBearHome(); };

// ---- meeting him (the lines are a first draft, 10/20/2026)
const bearDo = fn => run(() => { const a = actors.bear; if (a) fn(a); });
SCENES.bearMeet = def => {
  const m = BEAR_AT.meet, side = P.x < m.x ? -1 : 1;                       // (whichever side of him Phill's on)
  return [
    bars(true), run(() => { P.vx = 0; music.play('bear'); }),
    walkTo(m.x + side * 58), faceTo(m.x), camTo(m.x + side * 30, m.y - 50, 0.8),
    wait(0.5),
    bearDo(a => { a.face = side < 0 ? 'L' : 'R'; sfx.bump(); }), wait(0.6),   // he turns round
    say('bear', 'Oh. Hello.', "I didn't hear you come up. Not many come out this way."),
    say('bear', 'Did you come through the clearing? Past the tin soldier?'),
    ...nod(),
    say('bear', "Then you're the one who knocked him over. I could hear him clanking all the way out here.",
      "Nobody's gotten past him in a long time. You're braver than you look."),
    say('bear', "It's nice to have someone to talk to. It gets quiet out here."),
    run(() => { popup(P.x, P.y - 54, '?', '#e8e6f0', true); sfx.tick(); }), wait(0.9),   // Phill asks his name
    bearDo(a => { a.pose = 'flinch'; }), wait(1.0),                        // it hurts
    bearDo(a => { a.pose = null; }), wait(0.6),
    say('bear', 'My name?', "I don't have one.", 'Never got the chance.'),
    wait(0.5),
    say('bear', "It doesn't matter. You don't need a name to be friends, right?"),
    ...nod(),
    say('bear', "Good. That's good.", "The playground's up past the gate. Be careful up there.", "I'll be around. Come find me whenever you want."),
    wait(0.3),
    bearWalkTo(m.x + 84),                                                     // and off he goes, toward where his home turns out to be (10/21/2026)
    fadeTo(1, 0.45), run(() => { delete actors.bear; }), wait(0.3), fadeTo(0, 0.45),   // (a short fade still covers the rest of the way: it's a long walk out of the picture at his pace)
    camBack(), bars(false), run(() => music.play(room.def.music)),
  ];
};

// ---- his home (10/20/2026): a hole he dug up into the bank at the east edge, the toys' old bootlace hanging out of it,
// tied to a twig in its lip. It's pulled up out of sight till he asks Phill in, then it stays down
const bearLaceDown = () => !!world.flags.bearInvited;
function drawBearLace(h, len) {
  const now = performance.now() / 1000, sw = Math.sin(now * 1.1) * 2;
  for (let i = 0; i <= len; i += 2) {
    const k = i / len, x = Math.round(h.x + sw * k * k), y = h.y + i;
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x - 2, y, 4, 2);
    ctx.fillStyle = i % 6 < 3 ? '#d8cfb8' : '#bdb39a'; ctx.fillRect(x - 1, y, 2, 2);         // an old white lace gone grubby
    if (i % 16 === 14) { ctx.fillStyle = '#2a2030'; ctx.fillRect(x - 3, y - 1, 6, 4); ctx.fillStyle = '#d8cfb8'; ctx.fillRect(x - 2, y, 4, 2); }   // a knot to climb by
  }
  const ex = Math.round(h.x + sw), ey = h.y + len;
  ctx.fillStyle = '#2a2030'; ctx.fillRect(ex - 2, ey, 4, 6); ctx.fillStyle = '#9aa0b0'; ctx.fillRect(ex - 1, ey + 1, 2, 4);   // its plastic tip
}
const BEAR_LACE = 112;                                                                  // down to where Phill can reach it from the ground
const _drawNpcB = drawNpc;
drawNpc = () => {
  _drawNpcB();
  const h = room && room.def.bearhole;
  if (h && (bearLaceDown() || (actors.bear && inviteWaiting()))) drawBearLace(h, BEAR_LACE);   // (he came down it to wait for Phill)
  if (room && room.def.id === BEAR_BRIDGE.room && (bridgeUp() || world.flags.bearBridgeGone)) drawBearBridge(!bridgeUp());
};

// ---- the way over the brambles (10/20/2026): ready for when he asks Phill home (after Phill's first boss), the bear's laid two old wooden rulers end
// to end over the thorns at the east edge, propped on two cotton reels in the bramble, with a ruler leaning up to it at
// each end, so Phill can come and go without getting scratched. After the fight around 60% he breaks it
// (bearBridgeGone, set by that fight when it's built): the pieces are left lying in the thorns
const BEAR_BRIDGE = { room: 'eastedge', top: 26 * 16, x0: 19 * 16, x1: 34 * 16, l: 15.5 * 16, r: 39 * 16, reels: [23 * 16, 30 * 16] };   // (the right end comes down past the little rise in the ground there)
const bridgeUp = () => (firstBossDown() || !!world.flags.bearInvited) && !world.flags.bearBridgeGone;
function groundAt(x) { let y = BEAR_BRIDGE.top; while (y < room.pxH && !solidPx(x, y)) y++; return y; }
function setupBearBridge() {
  const b = BEAR_BRIDGE;
  if (room.def.id !== b.room || !bridgeUp()) return;
  b.gl = groundAt(b.l); b.gr = groundAt(b.r);
  const pts = [[Math.round(b.l), b.gl - 2], [b.x0, b.top], [b.x1, b.top], [Math.round(b.r), b.gr - 2]];   // one one-way slope, up, across and down, its ends just over the ground (any lower and he snags on the ground stepping off)
  const x0 = pts[0][0], x1 = pts[3][0], ys = new Float32Array(x1 - x0 + 1); let k = 0;
  for (let x = x0; x <= x1; x++) {
    while (k < pts.length - 2 && pts[k + 1][0] < x) k++;
    const [ax, ay] = pts[k], [bx, by] = pts[k + 1];
    ys[x - x0] = ay + (by - ay) * (x - ax) / (bx - ax);
  }
  room.ramps.push({ x0, x1, ys, bearBridge: true });
}
function ruler(xa, ya, xb, yb, th = 5) {                                               // an old wooden ruler, its marks along the top
  const n = Math.max(1, Math.abs(xb - xa));
  for (let i = 0; i <= n; i++) {
    const x = Math.round(xa + (xb - xa) * i / n), y = Math.round(ya + (yb - ya) * i / n);
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x, y - 1, 1, th + 2);
    ctx.fillStyle = i % 2 ? '#d2ae64' : '#d8b46a'; ctx.fillRect(x, y, 1, th);
    ctx.fillStyle = '#e8cc88'; ctx.fillRect(x, y, 1, 1);
    if (i % 4 === 0) { ctx.fillStyle = '#5a4428'; ctx.fillRect(x, y, 1, i % 16 === 0 ? 3 : 2); }
  }
}
function reel(x, top, bottom) {                                                         // an empty cotton reel standing in the bramble
  const h = bottom - top;
  ctx.fillStyle = '#2a2030'; ctx.fillRect(x - 11, top, 22, 5); ctx.fillRect(x - 11, bottom - 5, 22, 5); ctx.fillRect(x - 7, top + 4, 14, h - 8);
  ctx.fillStyle = '#a87a4a'; ctx.fillRect(x - 10, top + 1, 20, 3); ctx.fillRect(x - 10, bottom - 4, 20, 3);
  ctx.fillStyle = '#8a6238'; ctx.fillRect(x - 6, top + 5, 12, h - 10); ctx.fillStyle = '#a87a4a'; ctx.fillRect(x - 6, top + 5, 3, h - 10);
}
function lashing(x, y) { ctx.fillStyle = '#b83a3a'; for (let k = 0; k < 5; k++) { ctx.fillRect(x - 2 + k, y + k, 1, 1); ctx.fillRect(x + 2 - k, y + k, 1, 1); } }
function drawBearBridge(broken) {
  const b = BEAR_BRIDGE, gl = b.gl || 446, gr = b.gr || 446;
  if (!broken) {
    for (const x of b.reels) reel(x, b.top + 5, 448);
    ruler(b.l, gl, b.x0, b.top); ruler(b.x1, b.top, b.r, gr);
    ruler(b.x0, b.top, (b.x0 + b.x1) / 2, b.top); ruler((b.x0 + b.x1) / 2, b.top, b.x1, b.top);
    lashing(b.x0, b.top); lashing((b.x0 + b.x1) / 2, b.top); lashing(b.x1, b.top);
    return;
  }
  ruler(b.l, gl, b.l + 34, gl - 10); ruler(330, 442, 396, 447); ruler(452, 446, 512, 437); ruler(b.r - 30, gr - 7, b.r, gr);   // snapped and dropped in the thorns
  ctx.fillStyle = '#2a2030'; ctx.fillRect(458, 433, 27, 15); ctx.fillStyle = '#8a6238'; ctx.fillRect(459, 438, 25, 9); ctx.fillStyle = '#a87a4a'; ctx.fillRect(459, 434, 4, 13); ctx.fillRect(480, 434, 4, 13);   // a reel knocked on its side
}

// up the lace, once he's asked: {up} under it and Phill climbs up into his home
function laceHere() {
  const h = room && room.def.bearhole, d = h && room.def.doors.find(o => o.id === 'bearhole');
  if (!d || !bearLaceDown() || scene) return null;
  return P.x > h.x - 30 && P.x < h.x + 12 && Math.abs(P.y - d.y) < 12 ? h : null;   // (the bank's foot starts right under it, so mostly from the left)
}
function bearHere() {                                                               // in his home, close enough to talk to
  const a = actors.bear;
  if (!a || a.peek || scene || room.def.id !== BEAR_AT.home.room || !world.flags.bearVisited) return null;
  return Math.abs(P.x - a.x) < 44 && Math.abs(P.y - a.y) < 30 ? a : null;
}
const _nearbyB = nearby;
nearby = () => (laceHere() ? { kind: 'bearlace', label: '{up}: climb' } : bearHere() ? { kind: 'beartalk', label: '{up}: talk' } : _nearbyB());
const _interactB = interact;
interact = () => {
  if (bearHere() && !scene) { P.vx = 0; playScene(SCENES.bearChat()); return true; }
  const h = laceHere();
  if (h && !scene) {
    P.vx = 0;
    playScene([walkTo(Math.min(h.x, room.def.doors.find(o => o.id === 'bearhole').x)), faceTo(h.x), pose('look_up', 0.45), pose('grab', 0.3), run(() => { sfx.rustle(0.6); goTo('bearhome', 'down'); }), pose('climb', 1)]);
    return true;
  }
  return _interactB();
};

// ---- asking Phill home (10/20/2026, the lines are a first draft). Right after his first boss: the bear heard it go quiet
SCENES.bearInvite = def => {
  const iv = BEAR_AT.invite, h = def.bearhole, side = P.x < iv.x ? -1 : 1;
  const which = world.flags.sailboatDown && world.flags.topDown ? '' : world.flags.sailboatDown ? 'sailboat' : 'top';
  const heard = which === 'sailboat' ? ["The sailboat's gone quiet out on the pond.", 'That was you, wasn\'t it?']
    : which === 'top' ? ['The spinning top in the sandbox finally stopped.', 'That was you, wasn\'t it?']
    : ["Things are going quiet out there.", "That's you, isn't it?"];
  return [
    bars(true), run(() => { P.vx = 0; music.play('bear'); }),
    faceTo(iv.x), camTo(iv.x + side * 20, iv.y - 60, 1.0), wait(0.3),
    bearDo(a => { a.face = side < 0 ? 'L' : 'R'; }), wait(0.3),
    say('bear', 'There you are.', ...heard),
    ...nod(),
    say('bear', "I was hoping you'd come back this way.", "I want to show you something. Nobody's ever seen it before."),
    bearDo(a => { a.face = 'R'; }), camTo(h.cx - 20, h.cy + 30, 0.8), wait(0.4),         // up at his hole
    say('bear', "That's my place, up there. I dug it out myself.", 'Nothing can get at me up there.'),
    bearDo(a => { a.face = side < 0 ? 'L' : 'R'; }), camTo(iv.x + side * 20, iv.y - 60, 0.6),
    say('bear', 'You can come up.', 'If you want to.'),
    ...nod(),
    camTo((BEAR_BRIDGE.x0 + BEAR_BRIDGE.x1) / 2, BEAR_BRIDGE.top - 30, 0.8), wait(0.3),          // the way over the brambles he's put down
    say('bear', 'I put that over the brambles for you.', "So you don't get scratched, coming and going."),
    camTo(iv.x + side * 20, iv.y - 60, 0.6),
    say('bear', 'Okay. Okay, good.', "Give me a second. I'll tidy up a bit."),
    bearWalkTo(h.x + 16), wait(0.3),                                              // over to the lace (10/21/2026), the far side of it so he climbs facing Phill's way
    together(bearClimb(), camTo(h.cx - 20, h.cy + 30, 2.5)),                     // and up it, into his hole
    run(() => { world.flags.bearInvited = true; world.flags.metBear = true; saveWorld(); }),
    wait(0.5),
    say('bear', 'Come on up.'),
    camBack(), bars(false), run(() => music.play(room.def.music)),
  ];
};

// ---- Phill's first time in his home (10/20/2026, the lines are a first draft). Proud of it, nervous, glad of the company
SCENES.bearHome = def => {
  const hm = BEAR_AT.home, T_ = 16;
  return [
    bars(true), run(() => { P.vx = 0; }), wait(0.6),
    say('bear', 'Welcome in.', "It's not much. I dug it all out myself, a pawful at a time."),
    say('bear', "Sorry, it's a bit of a mess."),
    ...shakeNo(),                                                                       // it isn't
    say('bear', 'No? You think so?'),
    wait(0.3), walkTo(21.5 * T_), faceTo(23.5 * T_), wait(0.3),
    say('bear', 'I made that seat for company.', "You're the first one to sit in it."),
    faceTo(11 * T_), wait(0.4),                                                       // the days on the wall
    run(() => { popup(P.x, P.y - 54, '?', '#e8e6f0', true); sfx.tick(); }), wait(0.9),
    say('bear', 'Those? Those are the days.', 'Since I got left out here.'),
    say('bear', "I keep thinking I'll stop counting. I never do."),
    wait(0.5),
    say('bear', 'Everything in here is something somebody dropped. Nobody ever came back for any of it.', "Kids lose things all the time. They don't even notice."),
    wait(0.6),
    faceTo(hm.x),
    say('bear', "But that's okay.", 'You came back.'),
    say('bear', 'Stop in whenever you need to. Sit a while, rest up. I don\'t mind.', "Go on. The park's waiting for you."),
    run(() => { world.flags.bearVisited = true; saveWorld(); }),
    bars(false),
  ];
};

// ---- calling Phill back to the lace if he goes for a way out before he's been up (10/20/2026, a first draft)
SCENES.bearThisWay = (def, backTo) => {
  const h = def.bearhole, first = !room.calledBack; room.calledBack = true;
  return [
    run(() => { P.vx = 0; sfx.bearTalk && sfx.bearTalk(); }), bars(true),
    camTo(h.cx - 20, h.cy + 30, 0.6),
    say('bear', ...(first ? ['Hey. Up here.', 'This way. Up the lace.'] : ['Up here.', 'This way.'])),
    camBack(), walkTo(backTo), bars(false),
  ];
};

// ---- talking to him at home: optional, a little more about him every time, light things first and harder ones the more
// Phill keeps coming back to him (10/20/2026, the lines are a first draft)
const BEAR_CHAT = [
  () => [say('bear', "Oh, the cups? There's no tea. I don't have any tea.", "They're just nice to have out. In case.")],
  () => [say('bear', 'I found the mitten by the fence, the first winter. Some kid\'s hand was cold that day, I bet.', 'I sleep better in it than I ever did on a shelf.')],
  () => [say('bear', "Seven caps. I wanted eight, so it'd come out even.", "I'll find the last one. I'm good at finding things.")],
  () => [say('bear', 'My stitches? I sewed them up myself.', "They're not pretty. But they keep the stuffing in. That's the important part.")],
  () => [say('bear', "I know every corner of this park.", "Where it's warm, where the rain doesn't get in.", "Where not to go after dark.")],
  () => [say('bear', 'Before the park? A shelf. A long one, with a lot of us on it.', 'Then a kid picked me. Carried me right out the door.'), wait(0.8), say('bear', "...That part doesn't matter.")],
  () => [say('bear', 'I tried out names once. Said them out loud to see how they sounded.', "None of them stuck. They didn't feel like mine.")],
  () => [say('bear', 'Do you have a kid? Somebody waiting for you?'), ...nod(), wait(0.6), say('bear', "That's nice.", 'They must miss you a lot.')],
  () => [say('bear', "There's other toys under the big oak, you know. A whole town of them, dug in.", 'I went there once.'), wait(0.8), say('bear', "It doesn't matter. I've got my own place now.")],
  () => [say('bear', "The Grime things don't bother me much out here.", 'I keep to myself. They keep to themselves.')],
];
const BEAR_IDLE = [["It's nice, you being here."], ['Stay as long as you like.'], ['Careful out there.'], ["Come back soon, okay?"], ['Sit down, if you want. That seat\'s for you.']];
SCENES.bearChat = () => {
  const n = world.bearChat || 0;
  const lines = n < BEAR_CHAT.length ? BEAR_CHAT[n]() : [say('bear', ...BEAR_IDLE[Math.floor(Math.random() * BEAR_IDLE.length)])];
  return [faceTo(actors.bear.x), ...lines, run(() => { if (n < BEAR_CHAT.length) { world.bearChat = n + 1; saveWorld(); } })];
};
