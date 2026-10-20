'use strict';
// ---------- cutscenes ----------
// A scene is a list of steps that run one after another. Each step is a function called every frame with how long
// it's been running, and it returns true when it's done. While a scene runs, the player's controls are off,
// but Phill still moves and falls normally, so a scene can walk him somewhere or let him drop.
// The helpers below (wait, walkTo, pose, moveActor...) make the steps. The scenes themselves are in js/scenes.
let scene = null;
function playScene(steps, opts = {}) {
  scene = { steps: steps.filter(Boolean), i: 0, t: 0, keepControl: !!opts.keepControl };
  if (!scene.keepControl) P.story = P.story && P.story.kind === 'scene' ? P.story : { kind: 'scene', frame: null, t: 0 };
}
function updateScene(dt) {
  if (!scene) return;
  const st = scene.steps[scene.i];
  if (!st) { endScene(); return; }
  if (st(scene.t, dt)) { scene.i++; scene.t = 0; if (scene.i >= scene.steps.length) endScene(); }
  else scene.t += dt;
}
function endScene() {
  scene = null; P.autoX = null;
  if (P.story && P.story.kind === 'scene') P.story = null;
  cam.target = null; letterbox.want = 0;
}
const sceneRunning = () => !!scene;

// ---- steps
const wait = sec => t => t >= sec;
const run = fn => () => { fn(); return true; };
const until = cond => () => cond();
// a list of steps run as one step (so a step can start a little scene of its own partway through)
const seq = steps => { let i = 0, st = 0; return (t, dt) => {
  if (t === 0) { i = 0; st = 0; }
  while (i < steps.length) { if (steps[i](st, dt)) { i++; st = 0; } else { st += dt; return false; } }
  return true;
}; };
const together = (...steps) => { const done = steps.map(() => false); return (t, dt) => { steps.forEach((s, i) => { if (!done[i]) done[i] = s(t, dt); }); return done.every(Boolean); }; };
// Phill walks himself to x (the scene's way of pressing left or right)
const walkTo = x => {
  let lastX = null, stuck = 0;
  return (t, dt) => {
    if (t === 0) { P.autoX = x; lastX = P.x; stuck = 0; }
    stuck = Math.abs(P.x - lastX) < 0.2 ? stuck + (dt || 0) : 0; lastX = P.x;
    if (Math.abs(P.x - x) < 3 || t > 8 || stuck > 0.35) { P.autoX = null; P.vx *= 0.3; return true; }   // gives up if something's in the way
    return false;
  };
};
// hold a picture of Phill for a while (null: back to his normal moving pictures)
const pose = (frame, sec = 0, facing) => t => {
  if (t === 0) { P.story = { kind: 'scene', frame, t: 0 }; if (facing) P.facing = facing; }
  return t >= sec;
};
const face = dir => run(() => { P.facing = dir; });
// flip through some pictures of Phill for a while (sec 0 or less: forever, until the next step... so use it in together())
const anim = (frames, fps, sec) => t => {
  P.story = { kind: 'scene', frame: frames[Math.floor(t * fps) % frames.length], t };
  return sec > 0 && t >= sec;
};

// ---- sitting down to draw (facing us). Also what he does when you look at the map.
// sitDown: turns to face you and plops down. getPaper: pulls his paper out of his backpack, opens it, lays it down,
// grabs a crayon. drawFor: scribbles away, rocking side to side. putAway / standUp: the same backwards
const DRAW = ['draw_1', 'draw_2', 'draw_3', 'draw_4', 'draw_5', 'draw_6', 'draw_7', 'draw_8'];
const sitDown = () => [pose('turn', 0.12), pose('sit_1', 0.13), run(() => sfx.bump()), pose('sit_2', 0.12), pose('sit_3', 0.35)];
const getPaper = (col = '#e2604a') => [
  pose('paper_1', 0.28), pose('paper_1b', 0.2), run(() => sfx.pickup()), pose('paper_2', 0.35),
  pose('paper_3', 0.55), pose('paper_4', 0.12), run(() => { P.paper = { marks: {} }; }), pose('paper_4', 0.3),
  pose('paper_1', 0.25), run(() => { P.crayon = col; }),
];
const drawFor = sec => anim(DRAW, 8, sec);
const putAway = () => [
  run(() => { P.crayon = null; }), pose('paper_4', 0.25), run(() => { P.paper = null; }), pose('paper_3', 0.3),
  pose('paper_2', 0.25), pose('paper_1b', 0.15), pose('paper_1', 0.18), pose('sit_3', 0.2),
];
const standUp = () => [pose('sit_1', 0.13), pose('turn', 0.12), pose(null)];
const camTo = (x, y, sec = 0.8) => t => { if (t === 0) cam.target = { x, y, rate: 3 / Math.max(0.2, sec) }; return t >= sec; };
const camFollow = name => run(() => { cam.target = { actor: name, rate: 5 }; });
const camBack = () => run(() => { cam.target = null; });
const bars = on => run(() => { letterbox.want = on ? 1 : 0; });
const fadeTo = (a, sec) => t => { if (t === 0) sceneFade.from = sceneFade.a; sceneFade.a = sceneFade.from + (a - sceneFade.from) * Math.min(1, t / Math.max(0.01, sec)); return t >= sec; };

// ---------- actors: things a scene moves around (the crow, falling crayons) ----------
const actors = {};
function addActor(name, o) { actors[name] = Object.assign({ x: 0, y: 0, frame: null, anim: null, fps: 8, t: 0, flip: false, layer: 'front', hidden: false, rot: 0 }, o); return actors[name]; }
function clearActors() { for (const k in actors) delete actors[k]; }
const actorSet = (name, o) => run(() => Object.assign(actors[name], o));
const ease = k => k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
// glide an actor to (x, y) over sec seconds. arc lifts it into a curve on the way (negative = up)
const moveActor = (name, x, y, sec, opts = {}) => t => {        // x can be a function: where to go is worked out as the step starts
  const a = actors[name];
  if (t === 0) { a._from = [a.x, a.y]; a._to = typeof x === 'function' ? x() : x; }
  const k = Math.min(1, t / sec), e = opts.linear ? k : ease(k);
  a.x = a._from[0] + (a._to - a._from[0]) * e;
  a.y = a._from[1] + (y - a._from[1]) * e + (opts.arc || 0) * Math.sin(Math.PI * k) + (opts.wave || 0) * Math.sin(t * 2.2);
  if (opts.flipToward) a.flip = a._to < a._from[0];
  return k >= 1;
};
function updateActors(dt) {
  for (const k in actors) {
    const a = actors[k];
    a.t += dt;
    if (a.anim) a.frame = a.anim[Math.floor(a.t * a.fps) % a.anim.length];
    if (a.path) { const p = a.path(a.t); a.x = p[0]; a.y = p[1]; a.flip = p[2]; }   // something going round and round (the bird circling far off)
    if (a.vy !== undefined) {               // simple falling things (crayons)
      a.vy = Math.min(a.vy + 600 * dt, 380); a.x += (a.vx || 0) * dt; a.y += a.vy * dt; a.rot += (a.spin || 0) * dt;
      if (a.y > room.pxH + 40) delete actors[k];
    }
  }
}
function drawActors(layer) {
  const crow = room.def.art.uses && room.def.art.uses.includes('art/crow/crow.png') ? Assets.get('art/crow/crow.png') : null;
  for (const k in actors) {
    const a = actors[k];
    if (a.hidden || a.layer !== layer) continue;
    if (a.kind === 'crayon') {              // a little crayon tumbling through the air
      ctx.save(); ctx.translate(Math.round(a.x), Math.round(a.y)); ctx.rotate(a.rot);
      ctx.fillStyle = '#2a2030'; ctx.fillRect(-5, -2, 10, 4); ctx.fillStyle = a.col; ctx.fillRect(-4, -1, 8, 2); ctx.fillRect(4, -1, 2, 2);
      ctx.fillStyle = '#fbf7ec'; ctx.fillRect(-2, -1, 3, 2); ctx.restore();
      continue;
    }
    if (a.kind === 'sword' || a.kind === 'shield') {   // his things tumbling out of his backpack
      ctx.save(); ctx.translate(Math.round(a.x), Math.round(a.y)); ctx.rotate(a.rot);
      if (a.kind === 'sword') { ctx.fillStyle = '#2a2030'; ctx.fillRect(-9, -2, 18, 4); ctx.fillStyle = '#d8c8a8'; ctx.fillRect(-8, -1, 11, 2); ctx.fillStyle = '#6e4a30'; ctx.fillRect(3, -1, 5, 2); ctx.fillStyle = '#8a6040'; ctx.fillRect(2, -3, 2, 6); }
      else { ctx.fillStyle = '#2a2030'; ctx.beginPath(); ctx.arc(0, 0, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#c8925a'; ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#8a6040'; ctx.beginPath(); ctx.arc(0, 0, 2, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
      continue;
    }
    if (a.kind === 'twig' && a.piece) {     // a bit of the room drawn by the room builder (the thin end of the branch), hinged at its right end so it can fall away
      const im = Assets.get(a.piece);
      if (im) { ctx.save(); ctx.translate(Math.round(a.x + a.w), Math.round(a.y + 8)); ctx.rotate(a.rot); ctx.drawImage(im, -a.w, -8); ctx.restore(); }
      continue;
    }
    if (a.kind === 'twig') {                // a branch end, thin at the tip and thicker where it joins (can snap off and fall)
      ctx.save(); ctx.translate(Math.round(a.x + a.len / 2), Math.round(a.y + 6)); ctx.rotate(a.rot);
      const L = a.len, hx = -L / 2;
      ctx.fillStyle = '#2a2030'; ctx.beginPath(); ctx.moveTo(hx, -7); ctx.lineTo(hx + L, -8); ctx.lineTo(hx + L, 24); ctx.lineTo(hx, 6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#553824'; ctx.beginPath(); ctx.moveTo(hx + 1, -6); ctx.lineTo(hx + L, -7); ctx.lineTo(hx + L, 22); ctx.lineTo(hx + 1, 5); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#6e4a30'; ctx.fillRect(hx + 2, -6, L - 2, 3);
      ctx.fillStyle = '#3a2618'; for (let x = hx + 12; x < hx + L - 8; x += 22) ctx.fillRect(x, -2, 6, 1);
      ctx.fillStyle = '#3f8a48'; ctx.fillRect(hx + 18, -10, 5, 3); ctx.fillRect(hx + 21, -12, 3, 2);   // a little leaf at the tip
      ctx.restore();
      continue;
    }
    if (a.kind === 'shadow') {              // the crow's shadow sweeping over the grass
      ctx.fillStyle = `rgba(10, 12, 24, ${a.alpha || 0.35})`; ellipse(a.x, a.y, a.rx || 40, a.ry || 5);
      continue;
    }
    if (a.kind === 'rw') { if (a.frame) spr(a.frame, a.x, a.y, a.flip); continue; }   // something from Rootwood's sheet (the woodpecker)
    if (!crow || !a.frame) continue;
    const CF = window.CROW_FRAMES, fr = CF.frames[a.frame];
    const anchor = a.frame.startsWith('perch') || a.frame === 'caw' ? CF.feet : CF.body;
    const s = a.scale || 1;
    ctx.save(); ctx.translate(Math.round(a.x), Math.round(a.y)); if (a.flip) ctx.scale(-1, 1); if (s !== 1) ctx.scale(s, s);
    if (a.alpha !== undefined) ctx.globalAlpha = a.alpha;
    ctx.drawImage(crow, fr[0], fr[1], CF.w, CF.h, -anchor[0], -anchor[1], CF.w, CF.h);
    ctx.restore();
  }
}

// ---------- letterbox bars and the scene's own fade ----------
const letterbox = { a: 0, want: 0 };
const sceneFade = { a: 0, from: 0 };
function updateLetterbox(dt) { letterbox.a += (letterbox.want - letterbox.a) * Math.min(1, dt * 5); }
function drawLetterbox() {
  const h = Math.round(letterbox.a * 26);
  if (h > 0) { ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, VW, h); ctx.fillRect(0, VH - h, VW, h); }
  if (sceneFade.a > 0.001) { ctx.fillStyle = `rgba(5, 6, 10, ${sceneFade.a})`; ctx.fillRect(0, 0, VW, VH); }
}

// ---------- scenes for each room, by name (the room file says which one) ----------
const SCENES = {};
