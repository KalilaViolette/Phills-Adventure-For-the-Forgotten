'use strict';
// ---------- Purl in the story scenes (10/30/2026) ----------
// The knitted stoat, as an actor a scene moves around: her frames from the test run's sheet (art/purl/purl_frames.js),
// her tail drawn live the same way the test run does it (four links that trail her and whip round when she turns), and
// her yarn from the plum tip of her tail to the butt of her hook. Her lines are composed, every word in its place, and
// her sound is the hook catching: *snik*. The first scene with her is the first meeting, while Phill draws with the
// black crayon he's just found (SCENES.blackCrayon, js/scenes/rootwood.js)
// her faces for talking (10/31/2026): a line can say [amused], [worried] and so on (talk.js), and while it's on, any
// frame of hers that has that face drawn shows it instead. One entry a facing and face, 'left:amused': the picture
// they're on, and where each frame's cell is on it by her frame number on purl_proto.png ({ 166: [x, y] }), the cells
// the same size as hers. None picked yet, so it's empty and she keeps the face she always had
const PURL_FACES = window.PURL_FACES = {};
const PURL = (() => {
  const sheet = new Image(); sheet.src = 'art/purl/purl_proto.png';
  const meta = () => window.PURL_FRAMES;
  // which picture of a clip, t seconds in (idle and run go round at their own pace, the rest play through by each frame's hold)
  function frameOf(clip, fac, t) {
    const A = meta().facings[fac].anims[clip]; if (!A) return meta().facings[fac].anims.idle[0];
    if (clip === 'idle') return A[Math.floor(t * 6) % A.length];
    if (clip === 'run') return A[Math.floor(t * 13) % A.length];
    let s = 0; for (const f of A) { s += (f.hold || 2) / 60; if (t < s) return f; }
    return A[A.length - 1];
  }
  // ---- her tail (the same as the test run's, js/purl_proto.js, with one tail for each Purl on screen)
  const TAIL = { links: 4, len: 8, curl: [0, 14, 43, 70], pull: [0, 150, 95, 60, 38], damp: 9, grav: 50, snap: 80 };
  const COL = { furUp: [167, 91, 50], furDown: [132, 64, 32], plumUp: [128, 42, 72], plumDown: [98, 30, 54], line: [28, 16, 12] };
  function rest(tl) {
    const out = [{ x: tl.root.x, y: tl.root.y }];
    for (let i = 0; i < TAIL.links; i++) { const a = (tl.dir + tl.sg * TAIL.curl[i]) * Math.PI / 180, l = out[out.length - 1]; out.push({ x: l.x + Math.cos(a) * TAIL.len, y: l.y + Math.sin(a) * TAIL.len }); }
    return out;
  }
  function reset(tl) { const r = rest(tl); tl.n = r.map(q => ({ x: q.x, y: q.y })); tl.prev = r.map(q => ({ x: q.x, y: q.y })); tl.was = { x: tl.root.x, y: tl.root.y }; tl.off = { x: 0, y: 0 }; tl.ok = true; }
  function place(a) {
    const fac = a.fac, fr = frameOf(a.clip, fac, a.ct), fm = meta().facings[fac];
    return { fr, fac, dx: Math.round(a.x - (fr.fx ?? fm.feet_x)), dy: Math.round(a.y - (fr.fy ?? meta().floor)) };
  }
  function updateTail(a, dt) {
    const tl = a.tail || (a.tail = { ok: false }), pl = place(a), fr = pl.fr;
    if (fr.tr) { tl.root = { x: pl.dx + fr.tr[0], y: pl.dy + fr.tr[1] }; tl.dir = fr.td; }
    else { tl.root = { x: a.x - (a.fac === 'right' ? 22 : -22), y: a.y - 14 }; tl.dir = a.fac === 'right' ? 173 : 7; }
    tl.sg = a.fac === 'right' ? 1 : -1;
    if (!tl.ok || Math.hypot(tl.root.x - tl.n[0].x, tl.root.y - tl.n[0].y) > TAIL.snap) { reset(tl); return; }
    const r = rest(tl), k = Math.exp(-TAIL.damp * dt);
    const jx = tl.root.x - tl.was.x, jy = tl.root.y - tl.was.y; tl.was = { x: tl.root.x, y: tl.root.y };
    if (Math.hypot(jx, jy) > 10) { tl.off.x -= jx; tl.off.y -= jy; }                // (a turn flips the root across: the tail sweeps round instead of flicking)
    tl.off.x *= 0.88; tl.off.y *= 0.88;
    tl.n[0] = { x: tl.root.x + tl.off.x, y: tl.root.y + tl.off.y };
    for (let i = 1; i <= TAIL.links; i++) {
      const q = tl.n[i], o = tl.prev[i], ax = (r[i].x - q.x) * TAIL.pull[i], ay = (r[i].y - q.y) * TAIL.pull[i] + TAIL.grav;
      tl.prev[i] = { x: q.x, y: q.y }; tl.n[i] = { x: q.x + (q.x - o.x) * k + ax * dt * dt, y: q.y + (q.y - o.y) * k + ay * dt * dt };
    }
    for (let pass = 0; pass < 2; pass++) for (let i = 1; i <= TAIL.links; i++) {
      const p = tl.n[i - 1], b = tl.n[i], dx = b.x - p.x, dy = b.y - p.y, d = Math.hypot(dx, dy) || 1;
      b.x = p.x + dx / d * TAIL.len; b.y = p.y + dy / d * TAIL.len;
    }
  }
  const tailCanvas = document.createElement('canvas'); tailCanvas.width = tailCanvas.height = 80;
  const tctx = tailCanvas.getContext('2d');
  function drawTail(tl) {
    if (!tl || !tl.ok) return;
    const N = tl.n, W = tailCanvas.width, ox = Math.round(N[0].x) - W / 2, oy = Math.round(N[0].y) - W / 2;
    const img = tctx.createImageData(W, W), d = img.data, kind = new Uint8Array(W * W), pts = [], total = TAIL.links * 6;
    for (let i = 0; i < TAIL.links; i++) {
      const p0 = N[Math.max(0, i - 1)], p1 = N[i], p2 = N[i + 1], p3 = N[Math.min(TAIL.links, i + 2)];
      for (let j = 0; j < 6; j++) {
        const t = j / 6, t2 = t * t, t3 = t2 * t;
        pts.push({ x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
          y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3), s: (i * 6 + j) / total });
      }
    }
    pts.push({ x: N[TAIL.links].x, y: N[TAIL.links].y, s: 1 });
    for (const q of pts) {
      const r = 2.3 - 0.8 * q.s + (q.s > 0.93 ? 0.3 : 0), cx = q.x - ox, cy = q.y - oy, plum = q.s > 0.72;
      for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
        if (x < 1 || y < 1 || x >= W - 1 || y >= W - 1 || Math.hypot(x + 0.5 - cx, y + 0.5 - cy) > r) continue;
        kind[y * W + x] = (plum ? 3 : 1) + (y + 0.5 > cy + 0.2 ? 1 : 0);
      }
    }
    const cols = [null, COL.furUp, COL.furDown, COL.plumUp, COL.plumDown];
    for (let i = 0; i < W * W; i++) {
      let c = cols[kind[i]];
      if (!c && (kind[i - 1] || kind[i + 1] || kind[i - W] || kind[i + W])) c = COL.line;
      if (c) { d[i * 4] = c[0]; d[i * 4 + 1] = c[1]; d[i * 4 + 2] = c[2]; d[i * 4 + 3] = 255; }
    }
    tctx.putImageData(img, 0, 0);
    ctx.drawImage(tailCanvas, ox, oy);
  }
  function drawYarn(from, to, slack) {                                                  // tail tip to the hook's butt, hanging a little
    const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2 + slack, n = Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / 1.5) + 2;
    for (let i = 0; i <= n; i++) {
      const t = i / n, x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * mx + t * t * to.x, y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * my + t * t * to.y;
      ctx.fillStyle = i % 9 === 0 ? '#a24c72' : '#7a2a52'; ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    }
  }
  function draw(a) {
    if (!meta() || !sheet.complete || !sheet.naturalWidth) return;
    const pl = place(a), fr = pl.fr, [cw, ch] = meta().cell, sx = (fr.i % meta().cols) * cw, sy = Math.floor(fr.i / meta().cols) * ch;
    if (a.alpha !== undefined) ctx.globalAlpha = a.alpha;
    // the yarn goes to the hook in her left paw: facing left that's the near paw, so the yarn's in front of her; facing
    // right it's the far paw and the yarn goes behind her, behind her tail too (her arm and tail cover it)
    const yarn = () => { if (fr.pts && fr.pts.hook_butt && a.tail && a.tail.ok) drawYarn(a.tail.n[TAIL.links], { x: pl.dx + fr.pts.hook_butt[0], y: pl.dy + fr.pts.hook_butt[1] }, 4); };
    if (pl.fac === 'right') yarn();
    drawTail(a.tail);
    const face = typeof talkFace === 'function' && talkFace('stoat'), fs = face && PURL_FACES[pl.fac + ':' + face], fc = fs && fs.sheet.complete && (fs.cells[fr.i] || Object.values(fs.cells)[0]);   // a face the line has on (talk.js). A face drawn for only some of her frames holds on one of those, so it doesn't flicker
    ctx.drawImage(fc ? fs.sheet : sheet, fc ? fc[0] : sx, fc ? fc[1] : sy, cw, ch, pl.dx, pl.dy, cw, ch);
    if (pl.fac === 'left') yarn();
    ctx.globalAlpha = 1;
  }
  return { draw, updateTail };
})();

// she's an actor like the crow: drawn on the scene's layers, her clock and her tail moved on with everything else's
const _drawActorsPurl = drawActors;
drawActors = layer => { _drawActorsPurl(layer); for (const k in actors) { const a = actors[k]; if (a.kind === 'purl' && !a.hidden && a.layer === layer) PURL.draw(a); } };
const _updateActorsPurl = updateActors;
updateActors = dt => { _updateActorsPurl(dt); for (const k in actors) { const a = actors[k]; if (a.kind === 'purl') { a.ct += dt; PURL.updateTail(a, dt); } } };

// her voice: soft and even, a low knit sort of click as the words come up, and the hook catching for *snik*
sfx.snik = () => { tone(2300, 3100, 0.03, 'square', 0.035); noise(0.03, 6000, 4000, 0.04, 2); setTimeout(() => tone(1700, 1500, 0.02, 'square', 0.02), 40); };
sfx.purlTalk = () => { const f = 430 + Math.random() * 40; tone(f, f * 0.95, 0.05, 'triangle', 0.028); };
VOICE.purl = { name: 'Purl', col: '#e0a070', speed: 40, every: 3, blip: () => sfx.purlTalk(), noise: () => sfx.snik() };
VOICE.stoat = Object.assign({}, VOICE.purl, { name: 'the stoat' });                    // (before he knows her name)

// ---- scene steps for her
const purlDo = fn => run(() => { const a = actors.purl; if (a) fn(a); });
const purlClip = (clip, fac) => purlDo(a => { a.clip = clip; a.ct = 0; if (fac) a.fac = fac; });
// she runs along a path of points ([x, y] where her feet go), at her pace, facing the way she's going
const purlRun = (pts, speed = 190) => {
  let seg = 0;
  return (t, dt) => {
    const a = actors.purl; if (!a) return true;
    if (t === 0) { seg = 0; a.clip = 'run'; a.ct = 0; }
    let left = speed * (dt || 0);
    while (left > 0 && seg < pts.length) {
      const [tx, ty] = pts[seg], dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy);
      if (Math.abs(dx) > 0.5) a.fac = dx > 0 ? 'right' : 'left';
      if (d <= left) { a.x = tx; a.y = ty; left -= d; seg++; } else { a.x += dx / d * left; a.y += dy / d * left; left = 0; }
    }
    return seg >= pts.length;
  };
};

// ---- the first meeting (10/30/2026, from Purl.md, "The first meeting"). She heard the branch crack and saw him fall.
// She shows up on the root above him while he's scribbling with the black crayon he's just found, says her piece, and
// she's gone up the root before he can nod. Nothing falls from the top of the oak and gets up, then she sees he's all plush
const PURL_MEET = {                                                                     // under the oak (rooms/rootwood/roots.js): the big root arching over the way in
  path: [[-40, 214], [10, 222], [60, 220], [100, 223], [138, 232], [158, 236]],        // (her feet along the top of it, coming in from the left)
};
function purlMeetSteps() {
  const back = PURL_MEET.path.slice(0, -1).reverse().concat([[-60, 212]]);
  return [
    run(() => { world.flags.metPurl = true; saveWorld();
      const p = PURL_MEET.path[0]; addActor('purl', { kind: 'purl', x: p[0], y: p[1], fac: 'right', clip: 'run', ct: 0, layer: 'back' }); }),
    together(drawFor(1.6), seq([wait(0.2), run(() => sfx.rustle(0.5)), purlRun(PURL_MEET.path.slice(1))])),
    purlClip('skid', 'right'), run(() => sfx.rustle(0.3)), wait(0.2), purlClip('snap_turn', 'right'), wait(0.2), purlClip('idle', 'left'),   // (stops just past him and turns back)
    pose('sit_look', 0.9),                                                              // he's noticed someone's there
    sayTop('stoat', "I saw you fall. I assumed you'd stay down."),
    wait(0.9),                                                                          // a look over him
    sayTop('stoat', "No. There's nothing in you to break. [amused] *snik* Pillow."),
    wait(0.3),
    sayTop('stoat', "[worried] The crow's nest. It takes soft things. I didn't know it took living ones."),
    purlClip('start_bound', 'left'), wait(0.08),
    together(purlRun(back, 230), seq([wait(0.35), pose('sit_3', 0.25), pose('sit_look', 0.18), pose('sit_3', 0.3)])),   // (his nod comes after she's gone)
    run(() => { delete actors.purl; }),
    wait(0.5),
  ];
}
