'use strict';
// ---------- everything in the room that isn't Phill, once per step ----------
function stepWorld(dt) {
  updatePopups(dt);
  for (const gh of ghosts) gh.life -= dt;
  for (let i = ghosts.length - 1; i >= 0; i--) if (ghosts[i].life <= 0) ghosts.splice(i, 1);
  updateParts(dt);
  for (const ip of itemPops) ip.t += dt;
  for (let i = itemPops.length - 1; i >= 0; i--) if (itemPops[i].t > 1.3) itemPops.splice(i, 1);
  if (bubble) { bubble.t += dt; if (bubble.t >= bubble.dur || !bubble.ids.length) bubble = null; }
  updateBall(dt);
  updateFoes(dt); if (typeof updateBoss === 'function') updateBoss(dt);
  if (typeof updateSparks === 'function') updateSparks(dt);                     // his static sparks flying (moves2.js)
  if (typeof updatePond === 'function') updatePond(dt);
  if (typeof updateWildlife === 'function') updateWildlife(dt);
  updateMap(dt); updatePins(dt); updateTalk(dt); updateNearby(dt);   // the map first: talking clears the presses it hasn't used
  for (const b of room.breaks) b.shake = Math.max(0, b.shake - dt);
  checkPiles();
  updateScene(dt); updateActors(dt); updateLetterbox(dt);
  checkItems();
  checkEvents(dt);
  updateHints(dt);
  shakeT = Math.max(0, shakeT - dt);
  // walking off the edge of the room through a door
  if (trans.state === 'none' && P.ko <= 0 && !bossLocked() && !P.walkIn) for (const d of room.def.doors) {
    if (d.walkIn && P.ground && !P.atk && !P.hang) {                   // a hole in the back wall: walking at it from in front, he goes in
      const w = d.walkIn, s = d.edge === 'left' ? -1 : 1;
      if (P.vx * s > 0 && (P.x - w.turn[0]) * s >= 0 && Math.abs(P.y - w.turn[1]) <= 12) { startWalkIn(d, false); break; }
    }
    const yIn = P.y > d.a && P.y <= d.b + 1;
    const xIn = P.x > d.a && P.x <= d.b;
    if ((d.edge === 'right' && P.x > room.pxW - 4 && yIn) || (d.edge === 'left' && P.x < 4 && yIn)
      || (d.edge === 'bottom' && P.y - P.h > room.pxH && xIn) || (d.edge === 'top' && P.y < 0 && xIn)) { goTo(d.to, d.toDoor); break; }
  }
  updateCam(dt);
}

// ---------- start ----------
// Each start owns the world it was started with and a number. Picking another slot while the first room is still
// loading starts again with a new number, and the old wait sees it isn't the latest any more and gives up (the save
// audit, 10/17/2026: the title's first load finishing late used to walk into the slot picked after it, a second time,
// and start the bedroom wake up there). A room that won't load: back to where he rested, or it stops trying
let startGen = 0;
function startGame() {
  const gen = ++startGen, w = world;
  // new game: asleep in the bedroom. Otherwise back where he was
  const fresh = !Object.keys(w.has).length && w.room === 'bedroom' && !w.door;
  useSheets(w.has.gear ? 'gear' : 'nogear');
  room = null; P.x = undefined;
  let id = w.room, door = w.door;
  Rooms.load(id);
  const go = () => {
    if (gen !== startGen || w !== world) return;
    if (Rooms.failed(id)) {
      if (w.rest && w.rest.room !== id) { id = w.rest.room; door = '@rest'; Rooms.load(id); }
      else { console.warn('could not start in', id); return; }
    }
    if (!Rooms.ready(id)) { setTimeout(go, 30); return; }
    enterRoom(id, door);
    if (fresh) startStory('sleep');
  };
  go();
}

function begin() {
  if (started) return;
  started = true; audio(); setTimeout(() => music.start(), 120);
  document.getElementById('start').hidden = true;
  C.focus && C.focus();
}
document.getElementById('start').addEventListener('click', begin);
// browsers only allow sound after a click or a key press (a controller button doesn't count), so any click or key
// anywhere on the page wakes the sound up. If he was started with the controller, a note says to click once
for (const ev of ['pointerdown', 'keydown', 'touchend']) window.addEventListener(ev, () => { if (started) audio(); }, true);
const soundBlocked = () => started && !muted && actx && actx.state !== 'running';

let last = performance.now(), acc = 0;
function loop(now) {
  let dt = (now - last) / 1000; last = now;
  if (dt > 0.1) dt = 0.1;
  fps += (1 / Math.max(dt, 0.001) - fps) * 0.05;
  pollPad();
  if (started && !paused && room) {
    acc += dt;
    while (acc >= STEP) {
      if (cutscene) { updateCutscene(STEP, inp.jumpP || inp.atkP); inp.jumpP = inp.atkP = 0; }
      else if (trans.state !== 'wait') update(STEP);
      updateTrans(STEP);
      inp.any = 0;
      acc -= STEP;
    }
  }
  if (!window.__testNoDraw) render(started && !paused ? acc / STEP : 1);   // (the tests turn drawing off till they take a picture: much faster)
  requestAnimationFrame(loop);
}
buildTune();
resize();
const hadSave = loadWorld();
document.getElementById('startNote').textContent = hadSave ? 'Picks up where you left off.' : 'Phill is still asleep.';
requestAnimationFrame(loop);   // (the loop first: if starting ever throws, the title and the other slots still work)
startGame();
window.__phill = { get foes() { return foes; }, get talk() { return talk; }, get mapView() { return mapView; }, get boss() { return typeof boss !== 'undefined' ? boss : null; }, P, tune, inp, cam, keys, get room() { return room; }, get world() { return world; }, Rooms, Assets, goTo, trans, get cutscene() { return cutscene; }, get actors() { return typeof actors !== 'undefined' ? actors : {}; }, setUnlock(v) { unlockAll = v; } };   // handy for testing
