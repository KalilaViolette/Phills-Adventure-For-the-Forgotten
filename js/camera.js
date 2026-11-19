'use strict';
// ---------- camera: follows Phill, leads a little the way he's facing, stays inside the room ----------
const cam = { x: 0, y: 0, px: 0, py: 0, look: 40, peek: 0, snap: true, vx: 0, vy: 0 };
// the follow try-out (tune.feelCam). As it is, the view closes a set part of the gap to where it's going every step: it's
// off at full pace the moment he moves and slows the whole way in. With the try-out on it's a spring with no bounce
// instead, so it picks up speed as well as losing it (CAM_EASE is about how long it takes to get there), the lead the
// way he's facing is shorter and swings across at a steady pace, and a roll or air dodge pushes it out further
const CAM_EASE = 0.15, CAM_LEAD = 28, CAM_LEAD_PACE = 168, CAM_ROLL_LEAD = 42, CAM_ROLL_FAST = 140;
function easeTo(at, to, v, time, dt) {                       // where it is and how fast it's going a step on: [at, v]
  const w = 2 / time, x = w * dt, k = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const gap = at - to, push = (v + w * gap) * dt;
  let next = to + (gap + push) * k, nv = (v - w * push) * k;
  if ((to - at > 0) === (next > to)) { next = to; nv = 0; }  // (never past it)
  return [next, nv];
}
function updateCam(dt) {
  if (!room) return;
  cam.px = cam.x; cam.py = cam.y;
  const eased = !!tune.feelCam && !cam.target;
  if (eased) {
    const fast = (P.roll > 0 || P.dash > 0) && Math.abs(P.vx) > CAM_ROLL_FAST ? Math.sign(P.vx) * CAM_ROLL_LEAD : 0;
    const to = P.facing * CAM_LEAD, by = CAM_LEAD_PACE * dt, lead = (cam.lead ?? to) + Math.max(-by, Math.min(by, to - (cam.lead ?? to)));
    cam.lead = lead; cam.look = lead + fast;
  } else { cam.look += (P.facing * 44 - cam.look) * (1 - Math.exp(-2.6 * dt)); cam.lead = null; }
  const peekTo = P.lookT > 0.22 ? (inp.up ? -56 : 56) : 0;
  cam.peek += (peekTo - cam.peek) * (1 - Math.exp(-4 * dt));
  const W = room.pxW, H = room.pxH;
  // a cutscene can point the camera somewhere else, or at one of its actors
  const tg = cam.target, ta = tg && tg.actor && actors[tg.actor];
  const fx = ta ? ta.x : tg && tg.x != null ? tg.x : P.x + cam.look;
  let fy = ta ? ta.y + 60 : tg && tg.y != null ? tg.y + 60 : P.y;
  if (!tg && typeof bossCamY === 'function') { const y = bossCamY(); if (y != null) fy = y; }   // a boss fight can hold the view up or down (the Bramble heart keeps its floor in sight)
  // a room narrower or shorter than the screen sits in the middle of it
  const tx = W <= VW ? (W - VW) / 2 : Math.max(0, Math.min(W - VW, fx - VW / 2));
  // the normal view stops a little under the floor (viewBottom); the rest only shows while he's looking down.
  // During a cutscene it goes as far again as the black bars are tall, so the bottom bar doesn't cover his feet
  const clampY = (y, h) => Math.max(0, Math.min(h - VH, y));
  const ty = H <= VH ? (H - VH) / 2 : clampY(clampY(fy - 60 - VH / 2 + (P.vy > 300 && !tg ? 30 : 0), Math.max(VH, room.viewBottom + Math.round(letterbox.a * 26))) + cam.peek, H);
  if (cam.snap) { cam.x = cam.px = tx; cam.y = cam.py = ty; cam.vx = cam.vy = 0; cam.snap = false; return; }
  if (eased) { [cam.x, cam.vx] = easeTo(cam.x, tx, cam.vx, CAM_EASE, dt); [cam.y, cam.vy] = easeTo(cam.y, ty, cam.vy, CAM_EASE, dt); return; }
  cam.vx = cam.vy = 0;
  const rx = tg ? tg.rate : 9, ry = tg ? tg.rate : (P.vy > 200 ? 10 : 6);
  cam.x += (tx - cam.x) * (1 - Math.exp(-rx * dt));
  cam.y += (ty - cam.y) * (1 - Math.exp(-ry * dt));
}
