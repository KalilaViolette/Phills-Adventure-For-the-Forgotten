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

// which picture: a pose a scene holds (the flinch), his mouth going while his words are still coming up, a blink now
// and then, otherwise breathing
function bearFrame(a) {
  const f = a.face || 'L';
  if (a.pose) return a.pose + '_' + f;
  const line = talk && talk.who === 'bear' ? talk.lines[talk.i] : null;
  if (line && talk.n < line.length) return (Math.floor(a.t / 0.13) % 2 ? 'talk' : 'idle_1') + '_' + f;
  if (a.t % 3.7 < 0.12) return 'blink_' + f;
  return (Math.floor(a.t / 0.75) % 2 ? 'idle_2' : 'idle_1') + '_' + f;
}
function drawBearPic(im, name, x, y) {
  const F = window.BEAR_FRAMES, fr = F && F.frames[name];
  if (!fr) return;
  ctx.drawImage(im, fr[0], fr[1], F.w, F.h, Math.round(x - F.feet[0]), Math.round(y - F.feet[1]), F.w, F.h);
}
// him as a scene actor (scene.js draws actors of kind 'bear' with this)
function drawBear(a) {
  const im = Assets.get(BEAR_SHEET);
  if (!im) return;
  if (a.peek) {                                                                        // just his head, poking out of his hole
    const h = room.def.bearhole; if (!h) return;
    ctx.save(); ctx.beginPath(); ctx.ellipse(h.cx, h.cy, 12, 16, 0, 0, Math.PI * 2); ctx.clip();
    drawBearPic(im, bearFrame(a), h.cx + 2, h.cy + 62);
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
  drawBearPic(im, (t % 4.1 < 0.12 ? 'blink' : Math.floor(t / 0.8) % 2 ? 'idle_2' : 'idle_1') + '_' + f, 0, 0);
  ctx.restore();
};

// ---- the east edge: he's there till Phill's met him. The meeting only starts once the Grime things round him are beaten
// (10/20/2026), so nothing comes at Phill while they talk
function setupBearRoom() {
  const m = BEAR_AT.meet, iv = BEAR_AT.invite, id = room.def.id;
  room.bearEntry = { x: P.x, y: P.y };
  if (id === iv.room && inviteWaiting()) {                                             // after Phill's first boss: waiting under his hole for him. Not a Grime thing in the
    foes.length = 0;                                                                   // room this time (they're back next time), and he doesn't say why
    addActor('bear', { kind: 'bear', x: iv.x, y: iv.y, face: P.x < iv.x ? 'L' : 'R', layer: 'back' });
    return;
  }
  if (id === iv.room && world.flags.bearInvited && !world.flags.bearVisited)           // asked him in: still peeking out, waiting for him to come up
    addActor('bear', { kind: 'bear', peek: true, x: 0, y: 0, face: 'L', layer: 'back' });
  if (id === BEAR_AT.home.room && !world.flags.bearVisited) {                         // the first time Phill comes up into his home
    const hm = BEAR_AT.home;
    addActor('bear', { kind: 'bear', x: hm.x, y: hm.y, face: 'L', layer: 'back' });
    playScene(SCENES.bearHome(room.def));
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
const _checkEventsBear = checkEvents;
checkEvents = dt => { _checkEventsBear(dt); checkBear(); checkInvite(); };

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
    fadeTo(1, 0.5),
    run(() => { delete actors.bear; }),                                     // and he's gone
    wait(0.3), fadeTo(0, 0.5), camBack(), bars(false), run(() => music.play(room.def.music)),
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
};

// up the lace, once he's asked: {up} under it and Phill climbs up into his home
function laceHere() {
  const h = room && room.def.bearhole, d = h && room.def.doors.find(o => o.id === 'bearhole');
  if (!d || !bearLaceDown() || scene) return null;
  return P.x > h.x - 30 && P.x < h.x + 12 && Math.abs(P.y - d.y) < 12 ? h : null;   // (the bank's foot starts right under it, so mostly from the left)
}
const _nearbyB = nearby;
nearby = () => (laceHere() ? { kind: 'bearlace', label: '{up}: climb' } : _nearbyB());
const _interactB = interact;
interact = () => {
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
    say('bear', 'Okay. Okay, good.', "Give me a second. I'll tidy up a bit."),
    fadeTo(1, 0.4),
    run(() => { const a = actors.bear; if (a) Object.assign(a, { peek: true, face: 'L', pose: null }); world.flags.bearInvited = true; world.flags.metBear = true; saveWorld(); }),
    wait(0.4), fadeTo(0, 0.4), camTo(h.cx - 20, h.cy + 30, 0.6), wait(0.3),
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
