'use strict';
// ---------- camera: follows Phill, leads a little the way he's facing, stays inside the room ----------
const cam = { x: 0, y: 0, px: 0, py: 0, look: 40, peek: 0, snap: true };
function updateCam(dt) {
  if (!room) return;
  cam.px = cam.x; cam.py = cam.y;
  cam.look += (P.facing * 44 - cam.look) * (1 - Math.exp(-2.6 * dt));
  const peekTo = P.lookT > 0.22 ? (inp.up ? -56 : 56) : 0;
  cam.peek += (peekTo - cam.peek) * (1 - Math.exp(-4 * dt));
  const W = room.pxW, H = room.pxH;
  // a cutscene can point the camera somewhere else, or at one of its actors
  const tg = cam.target, ta = tg && tg.actor && actors[tg.actor];
  const fx = ta ? ta.x : tg && tg.x != null ? tg.x : P.x + cam.look;
  let fy = ta ? ta.y + 60 : tg && tg.y != null ? tg.y + 60 : P.y;
  if (!tg && typeof bossCamY === 'function') { const y = bossCamY(); if (y != null) fy = y; }   // a boss fight can hold the view up or down (the Bramble heart keeps its floor in sight, 10/18/2026)
  // a room narrower or shorter than the screen sits in the middle of it
  const tx = W <= VW ? (W - VW) / 2 : Math.max(0, Math.min(W - VW, fx - VW / 2));
  // the normal view stops a little under the floor (viewBottom); the rest only shows while he's looking down.
  // During a cutscene it goes as far again as the black bars are tall, so the bottom bar doesn't cover his feet
  const clampY = (y, h) => Math.max(0, Math.min(h - VH, y));
  const ty = H <= VH ? (H - VH) / 2 : clampY(clampY(fy - 60 - VH / 2 + (P.vy > 300 && !tg ? 30 : 0), Math.max(VH, room.viewBottom + Math.round(letterbox.a * 26))) + cam.peek, H);
  if (cam.snap) { cam.x = cam.px = tx; cam.y = cam.py = ty; cam.snap = false; return; }
  const rx = tg ? tg.rate : 9, ry = tg ? tg.rate : (P.vy > 200 ? 10 : 6);
  cam.x += (tx - cam.x) * (1 - Math.exp(-rx * dt));
  cam.y += (ty - cam.y) * (1 - Math.exp(-ry * dt));
}
