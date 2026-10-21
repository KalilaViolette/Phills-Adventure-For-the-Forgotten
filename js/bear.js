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
  meet: { room: 'eastedge', x: 274, y: 448, l: 72, r: 200 },               // where he stands at the east edge (past the big trunk, so he shows against the dark), and where Phill walking in starts the meeting
  watch: { room: 'clearing', layer: 1, x: 200, y: 224, scale: 0.5 },       // watching the soldier fight, far back on the clearing's second layer (in the shade, off to the side of the light)
};
// his picture is loaded with the rooms he's in, like the rest of a room's pictures
(() => {
  const _ROOM = window.ROOM;
  window.ROOM = def => {
    if ((def.id === BEAR_AT.meet.room || def.id === BEAR_AT.watch.room) && def.art) def.art.uses = [...(def.art.uses || []), BEAR_SHEET];
    _ROOM(def);
  };
})();
const bearWaiting = () => !!(world.flags.soldierDown && !world.flags.metBear);

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

// ---- the east edge: he's there till Phill's met him. The room's Grime things stay still while he's around
function setupBearRoom() {
  const m = BEAR_AT.meet;
  if (room.def.id !== m.room || !bearWaiting()) return;
  addActor('bear', { kind: 'bear', x: m.x, y: m.y, face: 'R', layer: 'back' });   // facing away, busy with nothing much
  for (const f of foes) if (f.state !== 'down') { f.bearHold = true; f.state = 'asleep'; f.wake = -1; }
  room.events.push({ kind: 'scene', name: 'bearMeet', flag: 'metBear', l: m.l, r: m.r, t: m.y - 80, b: m.y, cool: 0, inside: false });
}
const _setupPondRoomBear = setupPondRoom;
setupPondRoom = () => { _setupPondRoomBear(); setupBearRoom(); };

// ---- meeting him (the lines are a first draft, 10/20/2026)
const bearDo = fn => run(() => { const a = actors.bear; if (a) fn(a); });
SCENES.bearMeet = def => {
  const m = BEAR_AT.meet;
  return [
    bars(true), run(() => { P.vx = 0; music.play('bear'); }),
    walkTo(m.x - 58), faceTo(m.x), camTo(m.x - 30, m.y - 50, 0.8),
    wait(0.5),
    bearDo(a => { a.face = 'L'; sfx.bump(); }), wait(0.6),                 // he turns round
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
    run(() => {                                                             // and he's gone
      delete actors.bear;
      for (const f of foes) if (f.bearHold) { f.bearHold = false; setFoeState(f, 'walk'); f.cd = 1.2; }
    }),
    wait(0.3), fadeTo(0, 0.5), camBack(), bars(false), run(() => music.play(room.def.music)),
  ];
};
