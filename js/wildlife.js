'use strict';
// ---------- the park's wildlife: animals that live their own lives and never touch him ----------
// A room file lists what lives there (room.def.wildlife): what kind, which picture it sits in ('L0'.. a parallax layer
// behind the room, 'back' the room itself behind Phill, 'front' a layer in front), where it can be (x0..x1, and the
// ground y, all in that picture's own pixels), and how often it turns up. Each kind has its own little routine: a
// deer wanders through and grazes, a rabbit hops and freezes, a heron stands in the shallows and lifts off when he
// comes too close, ducks paddle past with their ducklings, geese cross the sky now and then. Nothing here has a
// hitbox. They're drawn with everything else at their depth, so the dark under the trees falls on them too.
const WILD = {
  // ground walkers: cross the range with pauses. pause: [frame, min s, max s] choices
  deer:     { kind: 'walker', speed: 16, anim: ['walk_1', 'walk_2', 'walk_3', 'walk_4', 'walk_5', 'walk_6', 'walk_7', 'walk_8'], fps: 8.3, pauses: [['stand', 1.5, 3], ['graze', 3, 6], ['graze', 3, 6]], every: [40, 90], flee: 170, fleeSpeed: 110, alert: 'alert', fawn: 0.6,   // fawn: how often a spotted fawn tags along behind her (10/19/2026)
              // my traced set (10/19/2026): an 8 frame walk, a 6 frame run when she bolts, and grazing as a little cycle
              // the run has its own beat (10/20/2026): run_2 is the leap with all four feet off the ground, held about
              // twice as long so the hang time reads, the push off before it and the landing after a touch longer than the rest
              fleeAnim: ['run_1', 'run_2', 'run_3', 'run_4', 'run_5', 'run_6'], fleeFps: 10, fleeDur: [0.09, 0.18, 0.09, 0.07, 0.07, 0.08],
              cycles: { graze: { enter: [['graze_1', 0.3]], loop: [['graze_2', 0.45], ['graze_3', 0.45]], exit: [['graze_4', 0.35]] } } },   // the fawn has the same 20 frames as the doe now (traced, 10/20/2026)
  fox:      { kind: 'walker', speed: 44, anim: ['slink_1', 'slink_2', 'slink_3', 'slink_4'], fps: 7, pauses: [['slink_1', 0.6, 1.4]], every: [70, 150], flee: 140, fleeSpeed: 120 },
  hedgehog: { kind: 'walker', speed: 9, anim: ['walk_1', 'walk_2'], fps: 4, pauses: [['walk_1', 1, 3]], every: [30, 70], scare: 70, scareFrame: 'curl', scareT: 3 },
  cat:      { kind: 'walker', speed: 26, anim: ['walk_1', 'walk_2', 'walk_3', 'walk_4'], fps: 5, pauses: [['sit', 2, 4], ['sit_2', 0.5, 1], ['sit', 2, 5]], every: [45, 100] },
  raccoon:  { kind: 'walker', speed: 22, anim: ['walk_1', 'walk_2', 'walk_3'], fps: 5, pauses: [['sit', 1, 2], ['rummage', 2, 5]], every: [60, 130], flee: 110, fleeSpeed: 80 },
  pigeon:   { kind: 'walker', speed: 14, anim: ['walk', 'peck_1'], fps: 4, pauses: [['peck_1', 0.3, 0.6], ['peck_2', 0.3, 0.6], ['peck_1', 0.3, 0.5]], every: [25, 60], flyOff: 100, flyAnim: ['fly_1', 'fly_2'] },
  raccoonbig: { kind: 'walker', speed: 34, anim: ['walk_1', 'walk_2', 'walk_3'], fps: 4, pauses: [['sit', 2, 4], ['rummage', 2, 5]], every: [60, 130], flee: 150, fleeSpeed: 110, sprite: 'raccoonbig' },   // the picnic's, drawn the size it is to him (Scale.md, 10/18/2026)
  pigeonbig: { kind: 'walker', speed: 20, anim: ['walk', 'peck_1'], fps: 4, pauses: [['peck_1', 0.3, 0.6], ['peck_2', 0.3, 0.6], ['peck_1', 0.3, 0.5]], every: [25, 60], flyOff: 130, flyAnim: ['fly_1', 'fly_2'], sprite: 'pigeonbig' },
  mouse:    { kind: 'walker', speed: 70, anim: ['scurry_1', 'scurry_2'], fps: 10, pauses: [['scurry_1', 0.4, 1.5]], every: [20, 50], flee: 60, fleeSpeed: 110 },
  beetle:   { kind: 'walker', speed: 7, anim: ['walk_1', 'walk_2'], fps: 5, pauses: [['walk_1', 1, 3]], every: [10, 30] },
  inchworm: { kind: 'walker', speed: 4, anim: ['crawl_1', 'crawl_2'], fps: 1.6, pauses: [['crawl_1', 1, 2]], every: [15, 40] },
  squirrel2:{ kind: 'walker', speed: 95, anim: ['run_1', 'run_2'], fps: 9, pauses: [['sit', 1, 2.5]], every: [25, 70], flee: 110, fleeSpeed: 150, farSprite: 'squirrelfar' },
  rabbit:   { kind: 'hopper', every: [25, 60], flee: 130, hopH: [12, 18], hopSpeed: [80, 170] },   // true size now (10/19/2026): bigger hops
  // the Greenhouse's (10/18/2026)
  ladybug:  { kind: 'walker', speed: 5, anim: ['walk_1', 'walk_2'], fps: 6, pauses: [['walk_1', 1, 3]], every: [15, 40] },
  woodlouse:{ kind: 'walker', speed: 8, anim: ['walk_1', 'walk_2'], fps: 7, pauses: [['walk_1', 0.6, 2]], every: [15, 40] },
  toad:     { kind: 'hopper', every: [30, 70], flee: 60 },
  butterfly:{ kind: 'flier', speed: 16, anim: ['fly_1', 'fly_2'], fps: 7, wave: [12, 1.4], jitter: 10, every: [15, 40] },
  // perchers: sit on a spot, hop about, fly off when he's close, come back later
  sparrow:  { kind: 'percher', every: [12, 30], flyOff: 90 },
  robin:    { kind: 'percher', every: [12, 30], flyOff: 90 },
  heron:    { kind: 'stander', every: [40, 90], flyOff: 170, anim: ['stand', 'stand', 'stand', 'step'], fps: 0.6, flyAnim: ['fly_1', 'fly_2'], flyFps: 2.2, flySpeed: 60, rise: 50 },
  turtle:   { kind: 'stander', every: [30, 70], slide: 110 },
  // fliers: cross the sky
  hawk:     { kind: 'flier', speed: 22, anim: ['soar_1', 'soar_2'], fps: 0.7, wave: [16, 0.35], every: [50, 120] },
  goose:    { kind: 'flock', speed: 58, anim: ['fly_1', 'fly_2'], fps: 4, n: 5, every: [70, 160] },
  bat:      { kind: 'flier', speed: 70, anim: ['fly_1', 'fly_2'], fps: 9, wave: [22, 2.4], jitter: 14, every: [8, 20] },
  moth:     { kind: 'moth', every: [4, 10] },
  // in the water
  mallard:  { kind: 'swimmer', speed: 18, anim: ['swim_1', 'swim_2'], fps: 2, ducklings: 3, kidStart: 46, kidGap: 22, kidYellow: 0.15, alts: [['parkduck', 0.25, 1], ['buffduck', 0.12, 1]], pauses: [['dabble', 1.2, 2.2]], every: [35, 80] },   // about her real size now (10/19/2026): the ducklings trail behind her tail
  fish:     { kind: 'fish', every: [8, 20] },
  fishswim: { kind: 'flier', speed: 34, anim: ['swim_1', 'swim_2'], fps: 5, wave: [6, 1.2], every: [6, 16], sprite: 'fish', farSprite: 'fishfar' },   // bluegill: about real size in his pane, smaller in the far water (10/19/2026)
  fishschool: { kind: 'flock', speed: 26, anim: ['swim_1', 'swim_2'], fps: 5, n: 6, school: true, every: [9, 22], sprite: 'fish', farSprite: 'fishfar' },   // a little school swimming together (the deep water felt empty)
};
const WILD_SHEET = 'art/wildlife/wildlife.png';
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];

function setupWildlife() {
  room.wild = [];
  for (const e of room.def.wildlife || []) {
    const def = WILD[e.kind]; if (!def) continue;
    const f = e.at === 'back' ? 1 : e.at === 'front' ? (room.def.art.layers.find(L => L.f > 1) || { f: 1.3 }).f : (room.def.art.layers[+e.at.slice(1)] || { f: 1 }).f;
    const w = { e, def, f, kind: e.kind, next: e.first !== undefined ? e.first : rnd(2, def.every[1] * 0.6), crit: null };
    room.wild.push(w);
  }
}
// where Phill is, in a layer's own pixels (a layer at f scrolls slower, so the same spot sits nearer the middle)
const toLayerX = (x, f) => x * f + 320 * (1 - f), toLayerY = (y, f) => y * f + 180 * (1 - f);

function spawnWild(w) {
  const e = w.e, d = w.def;
  let dir = e.dir || (Math.random() < 0.5 ? -1 : 1);
  const px = toLayerX(P.x, w.f), shy = (d.flee || d.flyOff || d.scare || d.slide || 0) * w.f;   // distances shrink with the layer
  if (shy && e.x0 !== undefined && !e.dir) {                                 // don't turn up right under his nose
    dir = Math.abs(px - e.x0) > Math.abs(px - e.x1) ? 1 : -1;               // start at the far end and walk toward the other
    if (Math.max(Math.abs(px - e.x0), Math.abs(px - e.x1)) < shy * 0.8) { w.next = rnd(4, 9); return; }
  }
  const c = { t: 0, ph: rnd(0, 6), dir, x: dir > 0 ? e.x0 : e.x1, y: e.y, state: 'move', frame: null, fi: 0, pauseT: 0, gone: false, alpha: 1 };
  const spot = () => { let x = rnd(e.x0 + 10, e.x1 - 10); for (let k = 0; k < 6 && Math.abs(x - px) < shy; k++) x = rnd(e.x0 + 10, e.x1 - 10); return x; };
  if (d.kind === 'percher' || d.kind === 'stander') { c.x = e.x !== undefined ? e.x : spot(); c.state = 'sit'; c.dir = e.dir || (Math.random() < 0.5 ? -1 : 1); c.sitT = rnd(1, 3); }
  if (d.kind === 'hopper') { c.state = 'sit'; c.sitT = rnd(1, 3); c.hops = 0; c.x = spot(); }
  if (d.kind === 'flier' || d.kind === 'flock') { c.y = e.y !== undefined ? e.y : rnd(e.y0, e.y1); c.baseY = c.y; }
  if (d.kind === 'fish') { c.x = rnd(e.x0, e.x1); c.state = 'jump'; c.dir = Math.random() < 0.5 ? -1 : 1; }
  if (d.kind === 'moth') { c.cx = e.x; c.cy = e.y; c.x = e.x; c.y = e.y; c.life = rnd(6, 14); }
  if (d.kind === 'swimmer') { c.kidYellow = d.kidYellow || 0; for (const [spr, chance, ky] of d.alts || []) if (Math.random() < chance) { c.sprite = spr; c.kidYellow = ky; break; }
    c.kids = []; for (let i = 0; i < (d.ducklings || 0); i++) c.kids.push({ ox: (d.kidStart || 13) + i * (d.kidGap || 13) + rnd(-2, 2), oy: rnd(-1, 1), ph: rnd(0, 6), yellow: Math.random() < c.kidYellow }); }   // a mallard's brood is mostly dark, the odd yellow one; a farm duck's are all yellow
  if (d.fawn && Math.random() < d.fawn) addFawn(c);
  w.crit = c;
}
// the fawn: a few steps behind its mother, catching up in little bursts, head down when hers is
function addFawn(c) { c.fawn = { x: c.x - c.dir * 46, dir: c.dir, t: rnd(0, 1), frame: 'walk_1' }; }
function updateFawn(c, d, dt) {
  const k = c.fawn, gap = c.state === 'pause' ? 38 : 44, tx = c.x - c.dir * gap, ddx = tx - k.x;
  const moving = c.state === 'move' || c.state === 'flee' || Math.abs(ddx) > 3;
  if (moving) {
    const sp = c.state === 'flee' ? d.fleeSpeed * 1.15 : d.speed * 1.7;
    if (Math.abs(ddx) > 0.5) { k.x += Math.sign(ddx) * Math.min(Math.abs(ddx), sp * dt); k.dir = Math.sign(ddx); }
    k.t += dt;
    k.frame = c.state === 'flee' && d.fleeAnim ? timedFrame(d.fleeAnim, d.fleeDur, d.fleeFps || d.fps, k.t) : d.anim[Math.floor(k.t * d.fps * 1.4) % d.anim.length];
  } else {
    k.dir = c.dir;
    const cyc = d.cycles && d.cycles[c.pauseName];                         // grazing with her, the same little cycle
    k.frame = c.frame === d.alert ? d.alert : cyc && c.state === 'pause' ? cycleFrame(cyc, c.pauseLen - c.pauseT, c.pauseLen) : 'stand';
  }
}
// frames that each have their own length (seconds), looping: the deer's run. Without lengths, fps for all of them
function timedFrame(frames, durs, fps, t) {
  if (!durs) return frames[Math.floor(t * fps) % frames.length];
  const total = durs.reduce((a, b) => a + b, 0); let u = t % total;
  for (let i = 0; i < frames.length; i++) { if (u < durs[i]) return frames[i]; u -= durs[i]; }
  return frames[frames.length - 1];
}
// a pause played as a little cycle (the doe grazing): the enter frames once, the loop frames over and over, then the exit
// frames to finish right as the pause ends. Each frame is [name, seconds]
function cycleFrame(cyc, age, len) {
  const sum = a => a.reduce((s, f) => s + f[1], 0), at = (a, t) => { for (const f of a) { if (t < f[1]) return f[0]; t -= f[1]; } return a[a.length - 1][0]; };
  const enter = cyc.enter || [], loop = cyc.loop || [], exit = cyc.exit || [];
  if (age < sum(enter)) return at(enter, age);
  if (len - age < sum(exit)) return at(exit, sum(exit) - (len - age));
  return loop.length ? at(loop, (age - sum(enter)) % sum(loop)) : (enter.length ? enter[enter.length - 1][0] : exit[0][0]);
}
// farSprite: a smaller set of pictures for when the same animal lives on a far layer (the squirrel is in his pane up the
// oak, but way back on Rootwood's layer 3)
function wildName(w, frame) { const far = w.def.farSprite && w.e.at !== 'back' && w.e.at !== 'front'; return ((w.crit && w.crit.sprite) || (far ? w.def.farSprite : (w.def.sprite || w.kind))) + '_' + frame; }   // crit.sprite: one of the def's alts (a park duck instead of the mallard)

function updateWildlife(dt) {
  if (!room.wild) return;
  for (const w of room.wild) {
    if (!w.crit) { w.next -= dt; if (w.next <= 0) spawnWild(w); continue; }
    const c = w.crit, d = w.def, e = w.e;
    c.t += dt; c.ph += dt;
    const px = toLayerX(P.x, w.f), py = toLayerY(P.y, w.f), dx = px - c.x, near = Math.abs(dx) / w.f, nearY = Math.abs(py - c.y) < 140 * w.f, busy = Math.abs(P.vx) > 40 || !P.ground || P.atk;
    const done = () => { w.crit = null; w.next = rnd(d.every[0], d.every[1]); };
    const anim = (frames, fps) => frames[Math.floor(c.t * fps) % frames.length];
    if (d.kind === 'walker') {
      if (c.fawn) updateFawn(c, d, dt);
      if (d.flee && near < d.flee && nearY && (busy || near < d.flee * 0.5) && c.state !== 'flee') { c.state = 'flee'; c.dir = dx > 0 ? -1 : 1; c.t = 0; }
      if (d.scare && near < d.scare && nearY && c.state !== 'scared') { c.state = 'scared'; c.pauseT = d.scareT; }
      if (d.flyOff && near < d.flyOff && nearY && c.state !== 'fly') { c.state = 'fly'; c.t = 0; c.vy = -40; c.dir = dx > 0 ? -1 : 1; }
      if (c.state === 'move' || c.state === 'flee') {
        const sp = c.state === 'flee' ? d.fleeSpeed : d.speed;
        c.x += c.dir * sp * dt; c.frame = c.state === 'flee' && d.fleeAnim ? timedFrame(d.fleeAnim, d.fleeDur, d.fleeFps || d.fps, c.t) : anim(d.anim, c.state === 'flee' ? d.fps * 1.6 : d.fps);
        const out = x => x < e.x0 - 30 || x > e.x1 + 30;
        if (out(c.x) && (!c.fawn || out(c.fawn.x))) { done(); continue; }
        if (c.state === 'move' && Math.random() < dt * 0.25 && d.pauses) { const [fr, a, b] = pick(d.pauses); c.state = 'pause'; c.frame = fr; c.pauseName = fr; c.pauseT = c.pauseLen = rnd(a, b); }
      } else if (c.state === 'pause' || c.state === 'scared') {
        c.pauseT -= dt;
        const cyc = d.cycles && d.cycles[c.pauseName];
        if (cyc && c.state === 'pause') c.frame = cycleFrame(cyc, c.pauseLen - c.pauseT, c.pauseLen);
        if (d.alert && d.flee && near < d.flee * 1.6 && nearY) c.frame = d.alert;
        if (c.pauseT <= 0) { c.state = 'move'; c.pauseName = null; }
      } else if (c.state === 'fly') {
        c.vy -= 60 * dt; c.y += c.vy * dt; c.x += c.dir * 90 * dt; c.frame = anim(d.flyAnim, 8);
        if (c.y < e.y - 260) { done(); continue; }
      }
    } else if (d.kind === 'hopper') {
      if (d.flee && near < d.flee && nearY && (busy || near < d.flee * 0.5) && c.state !== 'flee') { c.state = 'flee'; c.dir = dx > 0 ? -1 : 1; c.hopT = 0; }
      if (c.state === 'sit') { c.frame = c.sitT > 1.2 ? 'sit' : 'nibble'; c.sitT -= dt; if (c.sitT <= 0) { c.state = 'hop'; c.hops = 2 + Math.floor(Math.random() * 3); c.hopT = 0; if (Math.random() < 0.4) c.dir = -c.dir; } }
      else {
        const fast = c.state === 'flee', per = fast ? 0.32 : 0.5;
        c.hopT += dt; const k = (c.hopT % per) / per;
        c.x += c.dir * (fast ? (d.hopSpeed ? d.hopSpeed[1] : 150) : (d.hopSpeed ? d.hopSpeed[0] : 70)) * dt; c.hy = Math.sin(k * Math.PI) * (fast ? (d.hopH ? d.hopH[1] : 14) : (d.hopH ? d.hopH[0] : 9)); c.frame = k < 0.5 ? 'hop_1' : 'hop_2';
        if (c.hopT >= per * (fast ? 999 : c.hops)) { c.state = 'sit'; c.sitT = rnd(1.5, 4); c.hy = 0; }
        if (c.x < e.x0 - 20 || c.x > e.x1 + 20) { done(); continue; }
        if (!fast && (c.x < e.x0 + 10 || c.x > e.x1 - 10)) c.dir = -c.dir;
      }
    } else if (d.kind === 'percher') {
      if (c.state === 'sit') {
        c.frame = 'perch'; c.sitT -= dt;
        if (near < d.flyOff && nearY && (busy || near < d.flyOff * 0.5)) { c.state = 'fly'; c.t = 0; c.dir = dx > 0 ? -1 : 1; c.vy = -30; }
        else if (c.sitT <= 0) { c.state = 'hop'; c.hopT = 0.22; c.dir = Math.random() < 0.5 ? -1 : 1; c.hopFrom = c.x; }
      } else if (c.state === 'hop') {
        c.hopT -= dt; c.frame = 'hop'; c.x += c.dir * 30 * dt; c.hy = Math.sin((0.22 - c.hopT) / 0.22 * Math.PI) * 4;
        if (c.x < e.x0 || c.x > e.x1) { c.dir = -c.dir; c.x += c.dir * 2; }
        if (c.hopT <= 0) { c.state = 'sit'; c.sitT = rnd(0.8, 3); c.hy = 0; }
      } else {
        c.vy -= 70 * dt; c.y += c.vy * dt; c.x += c.dir * 80 * dt; c.frame = anim(['fly_1', 'fly_2'], 10);
        if (c.y < e.y - 220 || c.t > 4) { done(); continue; }
      }
    } else if (d.kind === 'stander') {
      if (d.slide) {                                     // the turtle: sits on its log till he's close, then slips off into the water
        if (c.state === 'sit') { c.frame = 'sit'; if (near < d.slide && nearY) { c.state = 'slide'; c.t = 0; } }
        else { c.frame = 'slide'; c.x += c.dir * 10 * dt; c.y += 26 * dt; c.alpha = Math.max(0, 1 - c.t / 0.9); if (c.t > 1) { if (typeof splash === 'function' && w.e.at === 'back') splash(c.x, c.y, 6, 0.6); done(); continue; } }
      } else {
        if (c.state === 'sit') { c.frame = anim(d.anim, d.fps); if (near < d.flyOff && nearY) { c.state = 'fly'; c.t = 0; c.dir = dx > 0 ? -1 : 1; c.vy = -d.rise; } }
        else { c.vy -= 18 * dt; c.y += c.vy * dt; c.x += c.dir * d.flySpeed * dt; c.frame = anim(d.flyAnim, d.flyFps); if (c.y < e.y - 300 || c.t > 9) { done(); continue; } }
      }
    } else if (d.kind === 'flier') {
      c.x += c.dir * d.speed * dt; c.frame = anim(d.anim, d.fps);
      c.y = c.baseY + Math.sin(c.ph * d.wave[1]) * d.wave[0] + (d.jitter ? Math.sin(c.ph * 7.3) * d.jitter * 0.3 : 0);
      if (c.x < e.x0 - 40 || c.x > e.x1 + 40) { done(); continue; }
    } else if (d.kind === 'flock') {
      c.x += c.dir * d.speed * dt; c.frame = anim(d.anim, d.fps);
      if (c.x < e.x0 - 120 || c.x > e.x1 + 120) { done(); continue; }
    } else if (d.kind === 'moth') {                      // flutters round a light
      c.life -= dt; const r = 10 + Math.sin(c.ph * 0.9) * 6;
      c.x = c.cx + Math.cos(c.ph * 3.1) * r + Math.sin(c.ph * 11) * 2; c.y = c.cy + Math.sin(c.ph * 2.3) * r * 0.6 + Math.cos(c.ph * 13) * 2;
      c.frame = anim(['fly_1', 'fly_2'], 14); c.dir = Math.cos(c.ph * 3.1) > 0 ? 1 : -1;
      if (c.life <= 0) { done(); continue; }
    } else if (d.kind === 'swimmer') {
      if (c.state === 'move') {
        c.x += c.dir * d.speed * dt; c.frame = anim(d.anim, d.fps); c.by = Math.sin(c.ph * 2.2) * 1.2;
        if (Math.random() < dt * 0.12) { const [fr, a, b] = pick(d.pauses); c.state = 'pause'; c.frame = fr; c.pauseT = rnd(a, b); }
        if (c.x < e.x0 - 60 || c.x > e.x1 + 60) { done(); continue; }
      } else { c.pauseT -= dt; if (c.pauseT <= 0) c.state = 'move'; }
    } else if (d.kind === 'fish') {                      // one jump: up out of the water in an arc, then gone
      const k = c.t / 0.7;
      c.hy = Math.sin(Math.min(1, k) * Math.PI) * 22; c.x += c.dir * 40 * dt; c.frame = k < 0.5 ? 'jump_1' : 'jump_2'; c.rot = (k - 0.5) * c.dir * 2.2;
      if (k >= 1) { if (typeof splash === 'function' && w.e.at === 'back') splash(c.x, c.y, 6, 0.6); done(); continue; }
    }
  }
}

// draw whatever lives at this depth. For a layer, screen space (the layer scrolls at its own speed); for 'back', room space
function drawWildlife(at, camX, camY) {
  if (!room.wild || !Assets.get(WILD_SHEET)) return;
  for (const w of room.wild) {
    const c = w.crit; if (!c || !c.frame || w.e.at !== at) continue;
    const sx0 = at === 'back' ? 0 : camX * w.f, sy0 = at === 'back' ? 0 : camY * w.f;
    const fog = at === 'back' || at === 'front' ? 1 : Math.min(1, 0.25 + w.f * 0.8);   // the farther back, the more the haze takes out of them
    const alphaOf = a => (a === undefined ? 1 : a) * fog;
    const draw = (name, x, y, flip, alpha) => {
      const X = x - sx0, Y = y - sy0;
      if (at !== 'back' && (X < -80 || X > VW + 80 || Y < -80 || Y > VH + 80)) return;
      if (c.rot) { ctx.save(); ctx.translate(Math.round(X), Math.round(Y)); ctx.rotate(c.rot); spr(name, 0, 0, flip, alphaOf(alpha)); ctx.restore(); }
      else spr(name, X, Y, flip, alphaOf(alpha));
    };
    const flip = c.dir > 0;                              // the pictures face left
    if (w.def.school) {                                  // a loose bunch of fish, each wobbling a bit on its own
      for (let i = 0; i < w.def.n; i++) {
        const ox = (i % 3) * 15 + (i > 2 ? 8 : 0), oy = (Math.floor(i / 3) * 9 - 5) + Math.sin(c.ph * 1.4 + i * 1.7) * 2.5;
        draw(wildName(w, w.def.anim[Math.floor((c.t * w.def.fps + i * 0.6) % 2)]), c.x - c.dir * ox + Math.sin(c.ph * 0.9 + i) * 2, c.y + oy, flip, c.alpha);
      }
      continue;
    }
    if (w.def.kind === 'flock') {                        // a V of geese behind the leader
      for (let i = 0; i < w.def.n; i++) { const k = Math.ceil(i / 2), side = i % 2 ? 1 : -1; draw(wildName(w, w.def.anim[Math.floor((c.t * w.def.fps + i * 0.7) % 2)]), c.x - c.dir * k * 22, c.y + (i ? k * 9 : 0) * (side > 0 ? 1 : 0.6), flip, c.alpha); }
      continue;
    }
    let gy = c.y;
    if (at === 'back' && w.def.kind !== 'flier' && w.def.kind !== 'moth' && !w.def.swim && c.y === w.e.y) { const g = groundY(c.x, c.y, 8, 8); if (g !== null) gy = g; }   // walking along the natural ground's bumps
    if (c.fawn && c.fawn.frame) draw('fawn_' + c.fawn.frame, c.fawn.x, gy, c.fawn.dir > 0, c.alpha);   // behind her
    draw(wildName(w, c.frame), c.x, gy - (c.hy || 0) + (c.by || 0), flip, c.alpha);
    if (c.kids) for (const k of c.kids) draw((k.yellow ? 'ducklingyellow' : 'duckling') + '_swim_' + (Math.floor((c.ph + k.ph) * 2) % 2 + 1), c.x - c.dir * k.ox, c.y + k.oy + Math.sin(c.ph * 2.2 + k.ph) * 1.2, flip, c.alpha);
  }
}
