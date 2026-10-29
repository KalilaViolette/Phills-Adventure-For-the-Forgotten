'use strict';
// ---------- Phill's sprite sheets ----------
// Empty handed until he picks up his sword and shield, then the gear sheets (one per dirt stage: he gets
// dirtier as he loses health). Only the set he's using is loaded.
const SHEETS = {
  nogear: ['d0', 'dpain'].map(d => `art/phill/phill_nogear_${d}.png`),   // clean, and scared and crying (bolting from the crow)
  get gear() { const s = world.sword ? '_s' + world.sword : ''; return ['d0', 'd1', 'd2', 'd3', 'd4', 'dpain', 'dpainsquint'].map(d => `art/phill/phill_gear${s}_${d}.png`); },   // the beetle's sword upgrades have their own sheets
};
function refreshSheets() { const k = sheetKind; sheetKind = null; useSheets(k); }
let sheetKind = null, sheetSrcs = [], META = null, ghostSheet = null, oldSheets = null;
const sheetsHeld = new Set();        // which of the current set are loaded (the dirtier ones only load once he's hurt)
function holdSheet(src) { if (!sheetsHeld.has(src)) { sheetsHeld.add(src); Assets.use(src); } }
function useSheets(kind) {
  if (kind === sheetKind) return;
  if (sheetsHeld.size) oldSheets = { srcs: [...sheetsHeld], first: sheetSrcs[0], meta: META };   // keep drawing the old ones until the new ones are in
  sheetsHeld.clear();
  sheetKind = kind; sheetSrcs = SHEETS[kind];
  holdSheet(sheetSrcs[0]);
  META = window.PHILL_FRAMES[kind === 'nogear' ? 'nogear' : 'gear']; ghostSheet = null;
  HANG_FEET = Math.round(Math.max(...Object.values(META.hang).map(h => h[2] - h[1])));
}
const dirtLevel = () => critical() ? (P.winceT > 0 ? 6 : 5) : P.health >= P.maxHealth ? 0 : Math.min(4, Math.ceil((1 - P.health / P.maxHealth) * 4));
function phillSheet() {
  if (oldSheets && Assets.get(sheetSrcs[0])) { for (const s of oldSheets.srcs) Assets.release(s); oldSheets = null; }
  if (oldSheets) return { im: Assets.get(oldSheets.first), meta: oldSheets.meta };
  const lvl = sheetKind === 'nogear' ? (P.scared ? 1 : 0) : dirtLevel();
  if (lvl) holdSheet(sheetSrcs[lvl]);
  return { im: Assets.get(sheetSrcs[lvl]) || Assets.get(sheetSrcs[0]), meta: META };
}
// his cape: the test room's cloth, knotted at the back of his neck, one picture per frame in the same spot as the frame
// on its own sheet (made by phill_sprites.py), drawn under him. Frames he can't be wearing it in are empty there
const CAPE_SHEET = 'art/phill/phill_cape.png';
let capeHeld = false;
function capeSheet() {
  if (!world.has.cape || sheetKind !== 'gear') return null;
  if (!capeHeld) { capeHeld = true; Assets.use(CAPE_SHEET); }
  return Assets.get(CAPE_SHEET);
}
function getGhost() {     // a pale see-through copy of him (air dodge trail, charge glow). Made only when needed
  const base = Assets.get(sheetSrcs[0]);
  if (!ghostSheet && base) {
    ghostSheet = document.createElement('canvas'); ghostSheet.width = base.width; ghostSheet.height = base.height;
    const g = ghostSheet.getContext('2d'); g.drawImage(base, 0, 0);
    g.globalCompositeOperation = 'source-atop'; g.fillStyle = 'rgba(214, 248, 226, 0.85)'; g.fillRect(0, 0, base.width, base.height);
  }
  return ghostSheet;
}
const motes = [];
let vignette = null;

// ---------- drawing ----------
function render(alpha) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#0b0c12'; ctx.fillRect(0, 0, C.width, C.height);
  if (!room) return;
  ctx.save();
  ctx.beginPath(); ctx.rect(offX, offY, VW * S, VH * S); ctx.clip();
  ctx.imageSmoothingEnabled = false;
  const snap = tune.pixelSnap ? 1 : 1 / S;
  const q = v => Math.round(v / snap) * snap;
  let camX = cam.px + (cam.x - cam.px) * alpha, camY = cam.py + (cam.y - cam.py) * alpha;
  if (shakeT > 0) { camX += (Math.random() * 2 - 1) * shakeA * (shakeT / 0.18); camY += (Math.random() * 2 - 1) * shakeA * (shakeT / 0.18); }
  camX = q(camX); camY = q(camY);
  ctx.setTransform(S, 0, 0, S, offX, offY);
  const main = Assets.get(room.def.art.main), front = room.def.art.front && Assets.get(room.def.art.front);
  const far = room.def.art.far && Assets.get(room.def.art.far);
  if (far) { const f = room.def.art.farF; drawView(far, Math.round(camX * f), Math.round(camY * f)); }   // the background, scrolling slower: depth
  const layers = room.def.art.layers || [];   // (a layer's x and y: where its picture starts, cut to what the screen can ever show of it, 10/29/2026. A layer's fy: it moves up and down at that instead of f, 10/17/2026. fy 1 pins it to the room's heights)
  const tod = room.def.outside ? timeOfDay() : 'day';
  layers.forEach((L, i) => { if (L.f < 1) { const im = Assets.get((L.times && L.times[tod]) || L.src); if (im) drawView(im, Math.round(camX * L.f) - (L.x || 0), Math.round(camY * (L.fy ?? L.f)) - (L.y || 0)); if (typeof drawWildlife === 'function') drawWildlife('L' + i, camX, camY); } });   // parallax layers, farthest first, with whatever lives in each
  if (main) drawView(main, camX, camY);
  ctx.translate(-camX, -camY);
  drawCovers();
  if (typeof drawWildlife === 'function') drawWildlife('back', camX, camY);   // animals in the room itself, behind everything that moves
  drawGlowLayers(ctx, 0, 0, false, 'lighter', camX, camY);                    // the room's own light, behind him
  drawPlants(1, camX, camY);                                                   // plants behind him, swaying

  // items waiting to be picked up: bobbing a little, with a glint now and then
  const items = room.def.art.items ? Assets.get(room.def.art.items) : null;   // the region's item sheet
  const now = performance.now() / 1000;
  for (const it of room.items) {
    if (it.got === 2 || it.hidden || !items || hiddenByCover(it.x, it.y)) continue;
    const bob = Math.round(Math.sin(now * 2.2 + it.bob) * 1.5) - 1;
    if (!it.float) { ctx.fillStyle = 'rgba(16,8,16,0.22)'; ellipse(it.x, it.y, 9 + bob, 1); }   // a little shadow under it
    if (it.kind === 'pin') { const ps = Assets.get(PIN_SHEET); if (ps && PINS[it.pin]) ctx.drawImage(ps, PINS[it.pin].cell * 32, 0, 32, 32, Math.round(it.x - 16), Math.round(it.y - 32 + bob), 32, 32); }
    else ctx.drawImage(items, itemCell(it) * 32, 0, 32, 32, Math.round(it.x - 16), Math.round(it.y - 32 + bob), 32, 32);
    if (Math.sin(now * 1.3 + it.bob * 3) > 0.985) twinkle(it.x + 6, it.y - 18, 1);
  }
  if (room.ball && items) {
    const b = room.ball;
    ctx.save(); ctx.translate(Math.round(b.x), Math.round(b.y)); ctx.rotate(Math.round(b.spin * 4) / 4);
    ctx.drawImage(items, ITEM_CELL.ball * 32 + 9, 17, 15, 15, -7, -7, 15, 15); ctx.restore();
  }

  // soft shadow under him (shrinks as he jumps)
  const px2 = P.px + (P.x - P.px) * alpha, py2 = P.py + (P.y - P.py) * alpha;
  if (!P.hang && P.respawnT <= 0) {
    let gy = null;
    for (let r = Math.floor((py2 - 1) / T); r < Math.floor((py2 - 1) / T) + 10 && r < room.H; r++) { const v = tile(Math.floor(px2 / T), r); if ((v === 1 || v === 2) && r * T >= py2 - 1) { gy = r * T; break; } }
    if (gy !== null) {
      const d = gy - py2;
      if (d < 150) {
        const rx = (P.crawl || P.roll > 0 || P.splat > 0 || P.ko > 0 || (P.story && P.story.kind !== 'reach') ? 13 : 10) * (1 - d / 220), a = 0.3 * (1 - d / 170);
        ctx.fillStyle = `rgba(0,0,0,${a})`;
        for (let yy = -1; yy <= 1; yy++) { const hw = Math.round(rx * Math.sqrt(1 - (yy / 2) ** 2)); ctx.fillRect(Math.round(px2) - hw, gy + yy - 1, hw * 2, 1); }
      }
    }
  }

  // ghosts left behind by the air dodge
  const gs = ghosts.length ? getGhost() : null;
  if (gs) for (const gh of ghosts) {
    const fr = META.frames[gh.name]; if (!fr) continue;
    ctx.globalAlpha = 0.5 * gh.life / 0.16;
    drawCell(ctx, gs, fr, q(gh.x - 32), q(gh.y - 32));
  }
  ctx.globalAlpha = 1;

  drawBreaks(); drawPiles(); drawNpc();
  if (typeof drawBoss === 'function') drawBoss();
  drawFoes();
  drawActors('back');
  if (!P.held && !P.hidden) { drawIdleGround(q); drawPhill(px2, py2 + (P.idleBit ? P.idleBit.dy : 0), q); drawIdleBits(q); }
  if (typeof drawOnPhill === 'function') drawOnPhill(px2, py2);                           // things stuck on him (the gum leech)

  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center';
  for (const p of popups) { ctx.font = p.big ? '600 16px "Pixelify Sans", ui-monospace, monospace' : '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.globalAlpha = Math.min(1, p.life * 2.5); ctx.fillStyle = '#0e0f18'; const pt = fmtKeys(p.text); ctx.fillText(pt, p.x + 1, p.y + 1); ctx.fillStyle = p.col; ctx.fillText(pt, p.x, p.y); }
  ctx.globalAlpha = 1; ctx.textAlign = 'left';
  for (const p of parts) { if (!p.on) continue; ctx.globalAlpha = Math.min(1, p.life / p.max * 1.6) * p.a; ctx.fillStyle = p.c; ctx.fillRect(q(p.x), q(p.y), p.s, p.s); }
  ctx.globalAlpha = 1;
  ctx.setTransform(S, 0, 0, S, offX, offY);
  ctx.translate(-camX, -camY);
  if (front) { const at = room.def.art.frontAt || [0, 0]; if (room.def.frontFade) drawFrontFaded(front, at, camX, camY, px2, py2); else ctx.drawImage(front, at[0], at[1]); }   // things in front of him
  drawReveals();                                                               // the near side of what he's gone under, fading while he's in there
  drawPlants(-1, camX, camY);                                                  // and the plants in front of him, swaying, parting as he goes through
  if (typeof drawPondFx === 'function') drawPondFx();                              // the water's surface moving, squeaks, the cape
  drawActors('front');
  if (layers.some(L => L.f > 1)) {                // close to the camera, sliding past faster than the room
    ctx.setTransform(S, 0, 0, S, offX, offY);
    layers.forEach((L, i) => { if (L.f > 1) { const im = Assets.get(L.src); if (im) drawView(im, Math.round(camX * L.f) - (L.x || 0), Math.round(camY * (L.fy ?? L.f)) - (L.y || 0)); if (typeof drawWildlife === 'function') drawWildlife('front', camX, camY); } });
    ctx.translate(-camX, -camY);
  }

  // items he just picked up, floating up over his head
  if (items) for (const ip of itemPops) {
    const k = Math.min(1, ip.t / 0.35), x = ip.x + (px2 - ip.x) * k, y = ip.y + (py2 - 58 - ip.y) * k - Math.sin(k * Math.PI) * 14;
    ctx.globalAlpha = ip.t < 1.0 ? 1 : Math.max(0, 1 - (ip.t - 1.0) / 0.3);
    ctx.drawImage(items, itemCell(ip) * 32, 0, 32, 32, Math.round(x - 16), Math.round(y - 16), 32, 32);
  }
  ctx.globalAlpha = 1;
  if (bubble && items) drawBubble(px2, py2, items);
  drawHints(camX, camY);

  // dust drifting in the sunlight, a soft vignette
  ctx.setTransform(S, 0, 0, S, offX, offY);
  if (!vignette || vignette.width !== VW || vignette.height !== VH) {
    vignette = document.createElement('canvas'); vignette.width = VW; vignette.height = VH;
    const vg = vignette.getContext('2d'), gr = vg.createRadialGradient(VW / 2, VH * 0.55, VH * 0.4, VW / 2, VH * 0.55, VW * 0.75);
    gr.addColorStop(0, 'rgba(4,5,10,0)'); gr.addColorStop(1, 'rgba(4,5,10,0.3)'); vg.fillStyle = gr; vg.fillRect(0, 0, VW, VH);
  }
  drawAmbient(camX, camY);
  ctx.drawImage(vignette, 0, 0);

  if (showBoxes) {
    ctx.translate(-camX, -camY); ctx.lineWidth = 1 / S;
    ctx.strokeStyle = dodgeSafe() ? '#5ff0ff' : '#7cff8a'; ctx.strokeRect(bodyL(P.x), P.y - P.h, bodyR(P.x) - bodyL(P.x), P.h);
    if (P.spinBox && P.spinT > 0) { const b = P.spinBox; ctx.strokeStyle = '#ff6b6b'; ctx.strokeRect(b.l, b.t, b.r - b.l, b.b - b.t); }   // the spin's blade, on whichever side it is
    for (const f of foes) {                                                       // the enemies (10/16/2026): orange where touching it hurts, gray where it doesn't right now, red where an attack is reaching, pink for their shots
      if (f.state === 'down' || f.state === 'hidden') continue;
      const b = foeBox(f); if (b.l < -900) continue;
      const safe = f.state === 'stagger' || (FOE[f.kind].harmless && FOE[f.kind].harmless(f));
      ctx.strokeStyle = safe ? 'rgba(200,200,210,0.55)' : '#ffa040'; ctx.strokeRect(b.l, b.t, b.r - b.l, b.b - b.t);
      if (f.atkT > 0 && f.atkBox) {
        const a = f.atkBox; ctx.strokeStyle = '#ff3b3b'; ctx.strokeRect(a.l, a.t, a.r - a.l, a.b - a.t);
        if (ART_HITS.has(f.kind) && !a.area) {                                  // where it can really hit: the drawn part of it inside its box, filled in
          const rec = foePose(f); ctx.fillStyle = 'rgba(255,59,59,0.55)';
          for (let y = Math.floor(a.t); y < a.b; y++) for (let x = Math.floor(a.l); x < a.r; x++) if (artIn(rec, { l: x, r: x + 1, t: y, b: y + 1 })) ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    ctx.strokeStyle = '#ff7ad0'; for (const sh of shots) ctx.strokeRect(sh.x - 4, sh.y - 4, 8, 8);
    if (P.atk) {
      const ls = swordLines(), col = atkLive(P.atk) ? '#ff6b6b' : 'rgba(255,107,107,0.35)';
      if (ls) { ctx.strokeStyle = col; ctx.lineWidth = SWORD_R * 2; ctx.lineCap = 'round'; ctx.globalAlpha = 0.35; for (const [x0, y0, x1, y1] of ls) { ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); } ctx.globalAlpha = 1; ctx.lineWidth = 1; ctx.lineCap = 'butt'; }   // where the sword reaches this frame
      else { const b = attackBox(); ctx.strokeStyle = col; ctx.strokeRect(b.l, b.t, b.r - b.l, b.b - b.t); }
    }
    ctx.strokeStyle = 'rgba(255,211,107,0.5)';
    if (window.boxTiles !== false) for (let y = 0; y < room.H; y++) for (let x = 0; x < room.W; x++) { const v = room.map[y * room.W + x]; if (v === 1) ctx.strokeRect(x * T + 0.5, y * T + 0.5, T - 1, T - 1); else if (v === 2) { ctx.strokeStyle = 'rgba(124,255,138,0.6)'; ctx.strokeRect(x * T + 0.5, y * T + 0.5, T - 1, 2); ctx.strokeStyle = 'rgba(255,211,107,0.5)'; } }
    ctx.strokeStyle = 'rgba(124,255,138,0.8)';                                  // one-way slopes, in the shelves' green
    if (window.boxTiles !== false) for (const rp of room.ramps || []) { ctx.beginPath(); for (let x = rp.x0; x <= rp.x1; x += 2) ctx.lineTo(x, rp.ys[x - rp.x0]); ctx.stroke(); }
    ctx.setTransform(S, 0, 0, S, offX, offY);
  }
  // some places get darker the deeper he goes (falling down into the forest)
  const dk = room.def.dark;
  if (dk) {
    const a = Math.max(0, Math.min(1, (py2 - dk[0]) / (dk[1] - dk[0]))) * dk[2];
    if (a > 0) {                                  // dark, with a little light around Phill so you can always see him
      const sx = px2 - camX, sy = py2 - 18 - camY, g = ctx.createRadialGradient(sx, sy, 18, sx, sy, 150);
      g.addColorStop(0, `rgba(6, 8, 16, ${a * 0.3})`); g.addColorStop(1, `rgba(6, 8, 16, ${a})`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, VW, VH);
    }
  }
  drawShade(px2, py2, camX, camY);
  drawAmbient(camX, camY, true);
  if (!scene || (P.story && P.story.free)) drawHud();
  if (!scene && !P.story) drawPrompt(px2, py2, camX, camY);
  drawLetterbox();
  const fade = Math.max(transDark(), P.ko > KO_TIME - 0.6 ? (P.ko - (KO_TIME - 0.6)) / 0.6 : P.fadeIn > 0 ? P.fadeIn / 0.45 : 0);
  if (fade > 0) { ctx.fillStyle = `rgba(8, 9, 14, ${Math.min(1, fade)})`; ctx.fillRect(0, 0, VW, VH); }
  if (sceneFade.warm) { ctx.fillStyle = 'rgba(255, 196, 130, 0.16)'; ctx.fillRect(0, 0, VW, VH); }
  if (sceneText) drawSceneText();
  drawTalk();
  drawMap(); drawPins();
  if (typeof drawBossBar === 'function') drawBossBar();
  if (cutscene) drawCard();
  if (soundBlocked()) {                       // started with the controller: the browser is holding the sound back
    ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center';
    const msg = 'click the game once for sound', w = Math.ceil(ctx.measureText(msg).width) + 12, x = Math.round(VW / 2 - w / 2), y = VH - 22;
    ctx.fillStyle = 'rgba(14,15,24,0.8)'; ctx.fillRect(x, y, w, 14); ctx.fillStyle = '#fbf7ec'; ctx.fillText(msg, VW / 2, y + 10); ctx.textAlign = 'left';
  }
  if (showDebug) drawDebug();
  ctx.restore();
}
// draws just the part of a room picture that's on screen
function drawView(im, camX, camY) {
  const sx = Math.max(0, Math.floor(camX)), sy = Math.max(0, Math.floor(camY));
  const sw = Math.min(im.width - sx, VW + 2), sh = Math.min(im.height - sy, VH + 2);
  if (sw > 0 && sh > 0) ctx.drawImage(im, sx, sy, sw, sh, sx - camX, sy - camY, sw, sh);
}

// a soft shadow on whatever's under him, fading as he gets higher off it, so he sits on the ground instead of floating
function groundShadow(x, y, maxDrop, rx) {
  const tx = Math.floor(x / T);
  for (let yy = Math.floor(y) - 2; yy <= y + maxDrop; yy++) {               // down to the first pixel of ground (the natural ground isn't on the tile lines)
    const v = yy % T === 0 ? tile(tx, yy / T) : 0;
    if (solidPx(x, yy) || v === 2 || v === 3 || v === 5 || rampY(x, yy, 0.5, 0.5) !== null) {
      const drop = Math.max(0, yy - y); if (drop > maxDrop) return;
      const k2 = 1 - drop / maxDrop;
      ctx.fillStyle = `rgba(6,4,10,${(0.22 * k2).toFixed(3)})`; ellipse(x, yy + 1, rx * (0.55 + 0.45 * k2), 1.6 + 1.4 * k2);
      return;
    }
  }
}
let bodyAt = null;                 // where and how his body was last drawn (the charge glow goes right over it)
// one of his 64 x 64 frames at x, y. His sheets have the empty space cut out (10/29/2026): a frame is [x, y, anchor, left,
// top, width, height], just the part with anything in it, drawn at its spot in the cell. Turned (tumbling, rolling,
// swimming on a slant) it's put back in a whole cell first, so the turn picks exactly the pixels it always did
const cellCv = document.createElement('canvas'); cellCv.width = cellCv.height = 64;
function drawCell(c, im, fr, x, y) {
  if (fr.length <= 3) { c.drawImage(im, fr[0], fr[1], 64, 64, x, y, 64, 64); return; }
  if (!(fr[5] > 0)) return;
  const t = c.getTransform();
  if (!t.b && !t.c) { c.drawImage(im, fr[0], fr[1], fr[5], fr[6], x + fr[3], y + fr[4], fr[5], fr[6]); return; }
  const g = cellCv.getContext('2d'); g.clearRect(0, 0, 64, 64); g.drawImage(im, fr[0], fr[1], fr[5], fr[6], fr[3], fr[4], fr[5], fr[6]);
  c.drawImage(cellCv, 0, 0, 64, 64, x, y, 64, 64);
}
function body(im, fr, x, y) { drawCell(ctx, im, fr, x, y); bodyAt = { t: ctx.getTransform(), x, y }; }
// walking into a hole in the back wall (10/27/2026): smaller the further in he is, and going the color of the dark in
// there till he's gone. Coming out, the same the other way
const walkInCv = document.createElement('canvas'); walkInCv.width = walkInCv.height = 64;
function drawWalkIn(im, meta, fr, px, py, q) {
  if (!fr) return;
  const k = walkInK(), sc = 1 - (1 - (P.walkIn.d.walkIn.scale || 0.7)) * k, dark = Math.max(0, (k - 0.35) / 0.65);
  const g = walkInCv.getContext('2d'); g.clearRect(0, 0, 64, 64); g.globalCompositeOperation = 'source-over'; drawCell(g, im, fr, 0, 0);
  if (dark > 0) { g.globalCompositeOperation = 'source-atop'; g.fillStyle = `rgba(28,52,70,${0.85 * dark})`; g.fillRect(0, 0, 64, 64); g.globalCompositeOperation = 'source-over'; }
  if (k < 0.5) groundShadow(P.x, P.y, 110 * sc, 11 * sc);
  const s64 = Math.max(1, Math.round(64 * sc));
  ctx.globalAlpha = 1 - Math.max(0, (k - 0.75) / 0.25);
  ctx.drawImage(walkInCv, 0, 0, 64, 64, q(px - fr[2] * sc), q(py - meta.baseline * sc), s64, s64);
  ctx.globalAlpha = 1;
}
function drawPhill(px, py, q) {
  bodyAt = null;
  const name = frameName(), cell = sheathedFrame(name);           // (cell: the picture for it, the gear on his back when it's put away)
  const { im, meta } = phillSheet();
  if (!im || !name) return;
  if (P.walkIn) { drawWalkIn(im, meta, meta.frames[name], px, py, q); return; }
  if (!P.swim && !P.hang && !P.cling && !P.held && P.ko <= 0) groundShadow(P.x, P.y, 110, 11);
  const fr = meta.frames[cell];
  if (!fr) return;
  const cape = capeSheet();
  const blink = P.ko <= 0 && P.inv > 0 && P.roll <= 0 && P.dash <= 0 && P.dashRec <= 0 && Math.floor(P.inv * 16) % 2 === 0;
  ctx.globalAlpha = blink ? 0.35 : 1;
  const fallen = P.y - P.fallTop;
  if (!P.ground && !P.hang && !P.held && P.vy > 300 && fallen > 220 && !name.startsWith('roll')) {   // a long fall: he tumbles head over heels
    const f2 = meta.frames[sheathedFrame('hurt_' + (P.facing > 0 ? 'R' : 'L'))];
    ctx.save(); ctx.translate(q(px), q(py - 18)); ctx.rotate(Math.round((fallen / 40) % 8) * Math.PI / 4 * P.facing);
    drawCell(ctx, im, f2, -32, -32); ctx.restore(); ctx.globalAlpha = 1;
    return;
  }
  if (P.chute && name.startsWith('slide')) {                         // going down the slide: tipped back a little with the slope
    const top = meta.frames[name.replace(/_[RL]$/, '_top')];
    ctx.save(); ctx.translate(q(px), q(py)); ctx.rotate((P.chute.ang || 0) * 0.35);
    body(im, fr, -31.5, -meta.baseline);
    if (top) drawCell(ctx, im, top, -31.5, -meta.baseline);
    ctx.restore(); ctx.globalAlpha = 1;
    return;
  }
  if (name.startsWith('roll')) {
    const spin = Math.floor((tune.rollTime - P.roll) / tune.rollTime * 4) % 4;
    ctx.save(); ctx.translate(q(px), q(py - ROLL_H / 2 - 4)); ctx.rotate(spin * P.rollDir * Math.PI / 2);
    body(im, fr, -32, -32); ctx.restore();
  } else if (name.startsWith('hang')) {
    const [hx, hy] = meta.hang[cell], h = P.hang || P.cling;   // his hand sits right on the corner of the ledge (or flat on the bark)
    body(im, fr, Math.round(h.cx - h.dir - hx), Math.round(h.cy - hy));
  } else if (name.startsWith('airdodge')) {
    if (cape) drawCell(ctx, cape, fr, q(px - 32), q(py - P.h / 2 - 32));
    body(im, fr, q(px - 32), q(py - P.h / 2 - 32));
  } else if (P.swim && Math.abs(P.swimRot || 0) > 0.03) {             // swimming up, down or on a slant, or swinging or holding the lid that way: turned to it, head first
    const ax = P.facing > 0 ? 30.5 : 33.5;
    ctx.save(); ctx.translate(q(px), q(py - ROLL_H / 2)); ctx.rotate(P.swimRot);
    body(im, fr, -ax, -(meta.baseline - ROLL_H / 2)); ctx.restore();
  } else {
    const top = /_[RL]$/.test(name) && meta.frames[name.replace(/_[RL]$/, '_top')];   // sitting facing us: his feet and arms go on top (only frames with a facing have one: 'turn' was finding itself, and drew the gear-in-hand turn over the put-away one)
    let ax = name === 'turn' || top ? 31.5 : name.startsWith('ko') ? 32 : (P.facing > 0 ? 30.5 : 33.5);
    if (name.startsWith('crawlatk')) ax -= P.facing * 14;            // the jab's drawn shoved back in its cell so the blade fits (CRAWL_ATK_SHIFT in phill_sprites.py)
    const fx = q(px - ax), fy = q(py - meta.baseline);
    if (cape) drawCell(ctx, cape, fr, fx, fy);
    body(im, fr, fx, fy);
    if (top) {
      if (P.paper) drawPaper(im, meta, name, fx, fy);
      drawCell(ctx, im, top, fx, fy);
      if (typeof BOOK !== 'undefined') BOOK.draw(name, fx, fy);       // the pictures on his book's pages, new ones every page he turns (book.js)
      const hand = meta.sit.hands[name.replace(/_[RL]$/, '')];
      if (P.crayon && hand) drawCrayon(fx + hand[0], fy + hand[1], P.crayon);
    }
  }
  ctx.globalAlpha = 1;
  if (P.charge > 0 && !name.startsWith('hang')) {     // glowing as the energy builds
    const gs = getGhost(), full = P.charge >= tune.chargeTime;
    const k = full ? 0.35 + 0.25 * Math.sin(P.charge * 30) : 0.08 + 0.25 * (P.charge / tune.chargeTime) + 0.06 * Math.sin(P.charge * 22);
    // drawn exactly where and how his body just was (10/16/2026: it was always drawn standing upright at the
    // plain walking spot, so swimming on a slant, turning or jabbing low it sat off him at the wrong angle)
    if (gs && bodyAt) {
      const sh = full ? (Math.random() < 0.5 ? -0.5 : 0.5) : 0;
      ctx.save(); ctx.setTransform(bodyAt.t); ctx.globalAlpha = Math.max(0, k);
      drawCell(ctx, gs, fr, bodyAt.x + sh, bodyAt.y); ctx.restore(); ctx.globalAlpha = 1;
    }
  }
  if (P.gbreak > 0) for (let i = 0; i < 3; i++) { const a = P.gbreak * 9 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(q(px + Math.cos(a) * 9) - 1, q(py - 42 + Math.sin(a) * 2.5), 2, 2); }   // (a bit lower than they were: the bars are over his head now)
  if (P.splat > SPLAT[0] && P.splat < SPLAT[2]) for (let i = 0; i < 3; i++) { const a = P.splat * 8 + i * 2.1; ctx.fillStyle = '#ffd36b'; ctx.fillRect(q(px + P.facing * 12 + Math.cos(a) * 8) - 1, q(py - 22 + Math.sin(a) * 2.5), 2, 2); }
  drawGuardMeter(px, py, q);
  if (P.guardLock && inp.guardH) {                                  // the lock, just past the end of the shield's bar over his head
    const mx = q(px) + 11, my = q(py - (P.swim || P.crawl ? 22 : 38) - 16);
    ctx.fillStyle = '#0e0f18'; ctx.fillRect(mx - 1, my - 1, 8, 7);
    ctx.fillStyle = '#ffd36b'; ctx.fillRect(mx, my + 2, 6, 4); ctx.fillRect(mx + 1, my, 1, 2); ctx.fillRect(mx + 4, my, 1, 2); ctx.fillRect(mx + 1, my - 1, 4, 1);
  }
  if (P.blockT > 0) { ctx.fillStyle = 'rgba(255,255,230,0.8)'; ctx.fillRect(q(px + P.facing * 14) - 1, q(py - 30), 2, 12); }
}

// the shield's stamina and his own, floating over his head (10/16/2026, like The Adventures of Elliot does
// the shield's): where my eyes are in a fight, not up in the corner. A little shield and its bar, and under it his
// stamina (the rolls), cut into a piece per roll so it's easy to see how many are left. Each shows while it's in use
// or not full, and fades out a moment after it fills. Broken, the shield's cracked and its bar refills gray up to the
// notch where the guard comes back (tune.guardBack)
// A little see-through most of the time (so they don't hide something coming down at him, or shout over every
// background), fully solid for a moment when they matter: a block, the shield low or broken, out of breath, down to
// the last roll (10/16/2026)
const METER_SEE = 0.8;
let guardMeterT = 0, enMeterT = 0, meterLast = 0, guardHotT = 0, enHotT = 0;
function drawGuardMeter(px, py, q) {
  const now = performance.now(), dt = Math.min(0.1, (now - meterLast) / 1000); meterLast = now;
  guardMeterT = can('guard') && (inp.guardH || P.stam < 100 || P.gbreak > 0 || P.guardOut) ? 0.6 : Math.max(0, guardMeterT - dt);
  enMeterT = P.en < 100 || P.enFlash > 0 ? 0.6 : Math.max(0, enMeterT - dt);
  guardHotT = P.blockT > 0 || P.stam < 34 || P.gbreak > 0 || P.guardOut ? 0.5 : Math.max(0, guardHotT - dt);
  enHotT = P.enFlash > 0 || P.winded || P.en < tune.rollCost ? 0.5 : Math.max(0, enHotT - dt);
  const solid = t => METER_SEE + (1 - METER_SEE) * Math.min(1, t / 0.15);
  if ((guardMeterT <= 0 && enMeterT <= 0) || P.ko > 0 || P.story) return;
  const top = py - (P.swim || P.crawl ? 22 : 38) - 15, bw = 18, bx = q(px) - bw / 2, x0 = bx - 10, y0 = q(top);   // the bars centered over him, the shield just to their left
  if (guardMeterT > 0) {
    const k = Math.max(0, Math.min(1, P.stam / 100)), broken = P.gbreak > 0 || P.guardOut;
    ctx.globalAlpha = Math.min(1, guardMeterT / 0.3) * solid(guardHotT);
    // a plain traditional shield (10/16/2026: it doesn't have to be his lid). o outline, h the light rim, f the
    // face, s the shaded rim. Broken, it's split by a crack (x: a gap) and goes red
    const SHIELD = broken
      ? ['...ooo...', 'ooohhfooo', 'ohhfffxso', 'ohfffxfso', 'ohfxxffso', 'ohxffffso', 'oxfffffso', '.ohfffso.', '..ohfso..', '...ofo...', '....o....']
      : ['...ooo...', 'ooohhfooo', 'ohhffffso', 'ohfffffso', 'ohfffffso', 'ohfffffso', 'ohfffffso', '.ohfffso.', '..ohfso..', '...ofo...', '....o....'];
    const col = broken ? { o: '#0e0f18', h: '#e8c0a0', f: '#b0605a', s: '#8a4a44' } : { o: '#0e0f18', h: '#f2eab8', f: '#8fa8d8', s: '#c9c08c' };
    SHIELD.forEach((row, j) => { for (let i = 0; i < row.length; i++) if (col[row[i]]) { ctx.fillStyle = col[row[i]]; ctx.fillRect(x0 - 1 + i, y0 - 4 + j, 1, 1); } });
    const by = y0 + 1;
    ctx.fillStyle = '#0e0f18'; ctx.fillRect(bx - 1, by - 1, bw + 2, 4);
    ctx.fillStyle = '#2a2234'; ctx.fillRect(bx, by, bw, 2);
    ctx.fillStyle = P.gbreak > 0 ? (Math.floor(P.gbreak * 12) % 2 ? '#ff8a6b' : '#5a2a2a') : P.guardOut ? '#8a7a80' : k < 0.34 ? '#e0533f' : '#9fb6e0';
    ctx.fillRect(bx, by, Math.round(bw * k), 2);
    if (P.guardOut) { ctx.fillStyle = '#e8e6f0'; ctx.fillRect(bx + Math.round(bw * tune.guardBack / 100), by - 1, 1, 4); }   // where it comes back
    if (P.blockT > 0) { ctx.fillStyle = `rgba(255,255,230,${Math.min(1, P.blockT / 0.15)})`; ctx.fillRect(bx, by, bw, 2); }   // a block: the bar flashes as it takes it
  }
  if (enMeterT > 0) {                                                  // his stamina, just under it: a piece per roll
    const k = Math.max(0, Math.min(1, P.en / 100)), by = y0 + 5;
    ctx.globalAlpha = Math.min(1, enMeterT / 0.3) * solid(enHotT);
    ctx.fillStyle = '#0e0f18'; ctx.fillRect(bx - 1, by - 1, bw + 2, 4);
    ctx.fillStyle = '#2a2234'; ctx.fillRect(bx, by, bw, 2);
    ctx.fillStyle = P.winded ? (Math.floor(now / 160) % 2 ? '#c9d48a' : '#8e9a5a') : '#b8e07a';
    ctx.fillRect(bx, by, Math.round(bw * k), 2);
    ctx.fillStyle = '#0e0f18'; for (let c = tune.rollCost; c < 100 - tune.rollCost / 2; c += tune.rollCost) ctx.fillRect(bx + Math.round(bw * c / 100), by, 1, 2);   // where each roll's worth ends
    if (P.enFlash > 0) { ctx.fillStyle = `rgba(255, 110, 90, ${P.enFlash / 0.3 * 0.8})`; ctx.fillRect(bx, by, bw, 2); }
  }
  ctx.globalAlpha = 1;
}

// his paper on the ground in front of him while he sits and draws. What he draws builds up as he scribbles:
// every time his hand moves, a little line from where the crayon was to where it is now, wandering slowly
// around the paper so it doesn't all pile up in one spot. Kept in P.paper.marks (pixels on the paper)
function drawPaper(im, meta, name, fx, fy) {
  const pg = meta.frames.paper_ground, [x0, y0, w, h] = meta.sit.paper, pp = P.paper;
  drawCell(ctx, im, pg, fx, fy);
  const hand = meta.sit.hands[name.replace(/_[RL]$/, '')];
  if (hand && P.crayon && name.startsWith('draw') && pp.last !== name) {
    pp.last = name; pp.n = (pp.n || 0) + 1;
    const wx = Math.round(Math.sin(pp.n * 0.23) * 3.5), wy = Math.round(Math.sin(pp.n * 0.37 + 1) * 1.2 + (pp.n % 2 ? 1 : -1) * Math.random());
    const tip = [Math.round(hand[0] - 1 + wx) - x0, Math.round(hand[1] + 4 + wy) - y0];   // where the crayon's point is
    if (pp.tip) {
      const [ax, ay] = pp.tip, n = Math.max(Math.abs(tip[0] - ax), Math.abs(tip[1] - ay), 1);
      for (let i = 0; i <= n; i++) {
        const mx = Math.round(ax + (tip[0] - ax) * i / n), my = Math.round(ay + (tip[1] - ay) * i / n);
        if (mx >= 1 && mx < w - 1 && my >= 1 && my < h - 1) pp.marks[mx + ',' + my] = P.crayon;
      }
    }
    pp.tip = tip;
  }
  for (const k in pp.marks) { const [mx, my] = k.split(','); ctx.fillStyle = pp.marks[k]; ctx.fillRect(fx + x0 + +mx, fy + y0 + +my, 1, 1); }
}
// the crayon in his fist: the end sticking up past his thumb, the point down on the paper
function drawCrayon(hx, hy, col) {
  const top = [hx + 2.5, hy - 3], tip = [hx - 1, hy + 4], N = 10;
  const dark = shadeHex(col, 0.62), wrap = tintHex(col, 0.5), wrapDark = tintHex(col, 0.22);
  for (let k = 0; k <= N; k++) {
    const t = k / N, x = Math.floor(top[0] + (tip[0] - top[0]) * t), y = Math.floor(top[1] + (tip[1] - top[1]) * t);
    const band = k >= 2 && k <= 4;
    ctx.fillStyle = k === 0 ? dark : band ? wrap : col; ctx.fillRect(x, y, 1, 1);
    if (k < N - 1) { ctx.fillStyle = band ? wrapDark : dark; ctx.fillRect(x + 1, y, 1, 1); }
  }
}
function shadeHex(c, k) {
  const n = parseInt(c.slice(1), 16);
  return `rgb(${Math.round((n >> 16) * k)},${Math.round(((n >> 8) & 255) * k)},${Math.round((n & 255) * k)})`;
}
function tintHex(c, k) {      // toward white
  const n = parseInt(c.slice(1), 16), m = v => Math.round(v + (255 - v) * k);
  return `rgb(${m(n >> 16)},${m((n >> 8) & 255)},${m(n & 255)})`;
}

// his thought bubble: little puffs rising off his head, then a cloud with the things he's thinking about
function drawBubble(px, py, items) {
  const b = bubble, k = Math.min(1, b.t / 0.25) * Math.min(1, (b.dur - b.t) / 0.3);
  if (k <= 0 || !b.ids.length) return;
  ctx.globalAlpha = k;
  const n = b.ids.length, w = n * 24 + 18, h = 32, bx = Math.round(px - w / 2), by = Math.round(py - 66 - h);
  const xs = []; for (let x = bx + 8; x <= bx + w - 8; x += 11) xs.push(x);
  for (const pass of [1, 0]) {                          // dark outline first, then the cream fill on top
    const blob = (x, y, rx, ry) => ellipse(x, y, rx + pass, ry + pass);
    ctx.fillStyle = pass ? '#2a2030' : '#fbf7ec';
    blob(px + 3, py - 47, 2, 2); blob(px + 6, py - 55, 3, 2);
    for (const x of xs) { blob(x, by + 6, 8, 6); blob(x, by + h - 6, 8, 6); }
    blob(bx + 6, by + h / 2, 7, 10); blob(bx + w - 6, by + h / 2, 7, 10);
    if (!pass) ctx.fillRect(bx + 4, by + 5, w - 8, h - 10);
  }
  b.ids.forEach((id, i) => {
    const x = bx + 9 + i * 24 - 4, wob = Math.round(Math.sin(b.t * 5 + i * 1.7));
    ctx.drawImage(items, ITEM_CELL[id] * 32, 0, 32, 32, x, by - 2 + wob, 32, 32);
  });
  ctx.globalAlpha = 1;
}
function ellipse(cx, cy, rx, ry) {   // a crisp pixel ellipse
  for (let y = -ry; y <= ry; y++) { const hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - (y / (ry + 0.5)) ** 2))); ctx.fillRect(Math.round(cx) - hw, Math.round(cy) + y, hw * 2 + 1, 1); }
}

// lowercase hints, like a note pinned up near where you need it
function drawHints(camX, camY) {
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center';
  for (const h of room.hints) {
    if (h.a <= 0) continue;
    // a little paper note taped to the wall, written in pencil. Long ones wrap, and the note stays on the screen
    // (inside the same margin the health and acorns sit in) even when it's pinned near the edge of the room
    const lines = wrapHint(fmtKeys(h.text), 190);
    let w = 0; for (const ln of lines) w = Math.max(w, Math.ceil(ctx.measureText(ln).width));
    w += 12;
    const hh = 14 + (lines.length - 1) * 9;
    const hx = h.follow ? P.x : h.x, hy = h.follow ? P.y - 62 : h.y;                   // (follow: over him wherever he goes)
    let x = Math.round(hx - w / 2), y = Math.round(hy - 13 + (1 - h.a) * 3) - (lines.length - 1) * 9;
    x = Math.max(camX + 8, Math.min(camX + VW - 8 - w, x));
    y = Math.max(camY + 26, Math.min(camY + VH - 8 - hh, y));
    const cx = x + w / 2;
    ctx.globalAlpha = h.a;
    ctx.fillStyle = 'rgba(20,16,30,0.35)'; ctx.fillRect(x + 1, y + 2, w, hh);
    ctx.fillStyle = '#fbf7ec'; ctx.fillRect(x, y, w, hh);
    ctx.fillStyle = '#e4dcc8'; ctx.fillRect(x, y + hh - 2, w, 2);
    ctx.fillStyle = 'rgba(230,226,200,0.85)'; ctx.fillRect(Math.round(cx) - 6, y - 2, 12, 4);
    ctx.fillStyle = '#4a4258';
    lines.forEach((ln, i) => ctx.fillText(ln, cx, y + 10 + i * 9));
  }
  ctx.globalAlpha = 1; ctx.textAlign = 'left';
}
// breaks a hint into lines no wider than max px (the font is already set)
function wrapHint(text, max) {
  const words = text.split(' '), lines = []; let cur = '';
  for (const wd of words) {
    const t = cur ? cur + ' ' + wd : wd;
    if (cur && ctx.measureText(t).width > max) { lines.push(cur); cur = wd; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

// health (cotton puffs) and the stamina bars. Hidden until he has his sword and shield: nothing at home can hurt him
function drawHud() {
  if (!world.has.gear && !unlockAll) return;
  // cotton puffs: full ones, then the loose fluff he can still win back (filling in as he lands hits), then the
  // worn ones (locked in: torn and stitched until he sews himself up at a resting spot)
  for (let i = 0; i < world.maxHealth; i++) {
    const x = 12 + i * 14, y = 12, full = i < P.health, loose = !full && i < P.health + P.loose, worn = i >= P.maxHealth;
    ctx.fillStyle = '#0e0f18'; ctx.fillRect(x - 1, y, 12, 10); ctx.fillRect(x, y - 1, 10, 12);
    ctx.fillStyle = full ? '#f4f1ea' : worn ? '#241e2c' : '#3a3d52'; ctx.fillRect(x, y + 1, 10, 8); ctx.fillRect(x + 1, y, 8, 10);
    if (full) { ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 2, y + 2, 3, 2); ctx.fillStyle = '#cfc8ba'; ctx.fillRect(x + 1, y + 7, 8, 2); }
    if (loose) {                                    // faint, filling up from the bottom a third at a time
      const k = i === P.health ? P.looseBits / 3 : 0, hh = Math.round(8 * k);
      ctx.fillStyle = 'rgba(244,241,234,0.25)'; ctx.fillRect(x + 1, y + 1, 8, 8);
      if (hh) { ctx.fillStyle = '#d8d2c6'; ctx.fillRect(x + 1, y + 9 - hh, 8, hh); }
      if (Math.floor(performance.now() / 250) % 2) { ctx.fillStyle = '#ffffff'; ctx.fillRect(x + 4, y + 3, 2, 2); }
    }
    if (loose && i === P.health && P.looseMax) {      // how long he's got left to win it back: a little bar under the puff, running out
      const k = Math.max(0, Math.min(1, (P.looseT || 0) / P.looseMax));
      ctx.fillStyle = '#0e0f18'; ctx.fillRect(x - 1, y + 11, 12, 3);
      ctx.fillStyle = k < 0.3 && Math.floor(performance.now() / 120) % 2 ? '#ff8a70' : '#d8d2c6'; ctx.fillRect(x, y + 12, Math.round(10 * k), 1);
    }
    if (worn) { ctx.fillStyle = '#8a6a7a'; for (let k = 0; k < 4; k++) { ctx.fillRect(x + 2 + k * 2, y + 3 + (k % 2) * 3, 1, 1); } ctx.fillRect(x + 2, y + 5, 7, 1); }
  }
  const coin = REGION_COIN[room.def.region] || (world.acorns ? 'acorns' : null);
  if (coin) {                                                     // only the region he's in shows its currency
    const ax = 12, ay = 28;
    spr(COIN_ICON[coin], ax + 5, ay + 10, false);
    ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.fillStyle = acornFlash > 0 ? '#ffd36b' : '#e8dcc0';
    ctx.fillText(String(world[coin] || 0), ax + 14, ay + 8);
    acornFlash = Math.max(0, acornFlash - 1 / 60);
  }
  // (his stamina and the shield's are over his head now: drawGuardMeter)
  drawSpecialIcons();
}
// the special moves he's learned, top right: each one darkens and fills back in like a clock while it's waiting to be
// ready again, and flashes red if he tries it too soon (a friend's playtest, 10/14/2026)
function drawSpecialIcons() {
  if (typeof specialCD === 'undefined') return;
  const have = ['squeak', 'spin', 'burst'].filter(k => can(k));
  have.forEach((k, i) => {
    const cx = VW - 14 - (have.length - 1 - i) * 18, cy = 16, wait = SPECIAL_WAIT[k](), left = specialCD[k], ready = left <= 0;
    ctx.fillStyle = '#0e0f18'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = ready ? '#3a3d52' : '#24222e'; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill();
    if (!ready && wait > 0) {                                     // the part that's come back so far, sweeping round like a clock
      ctx.fillStyle = '#3a3d52'; ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - left / wait)); ctx.closePath(); ctx.fill();
    }
    const c = ready ? '#f4f1ea' : '#8a8ca0';
    ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = 1;
    if (k === 'squeak') {                                         // his squeaker going off: a dot and two rings of sound
      ctx.fillRect(cx - 4, cy - 1, 3, 3);
      ctx.beginPath(); ctx.arc(cx - 2, cy, 4, -0.8, 0.8); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx - 2, cy, 7, -0.7, 0.7); ctx.stroke();
    } else if (k === 'spin') {                                    // a whirl with an arrow on the end
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0.3, Math.PI * 1.8); ctx.stroke();
      ctx.fillRect(cx + 2, cy - 5, 3, 1); ctx.fillRect(cx + 4, cy - 5, 1, 3);
    } else {                                                      // a puff of fluff
      for (const [dx, dy, r] of [[-2, 1, 3], [2, 1, 3], [0, -2, 3]]) { ctx.beginPath(); ctx.arc(cx + dx, cy + dy, r, 0, Math.PI * 2); ctx.fill(); }
    }
    if (specialFlash[k] > 0) { ctx.fillStyle = `rgba(255,110,90,${specialFlash[k] / 0.35 * 0.7})`; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill(); }
  });
}

function drawCard() {
  const c = cutscene, k = Math.min(1, c.t / 0.4);
  ctx.fillStyle = `rgba(10, 11, 18, ${0.92 * k})`; ctx.fillRect(0, 0, VW, VH);
  ctx.globalAlpha = k; ctx.textAlign = 'center';
  ctx.font = '600 16px "Pixelify Sans", ui-monospace, monospace'; ctx.fillStyle = '#8fd88a';
  ctx.fillText(c.lines[0], VW / 2, VH / 2 - 10);
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.fillStyle = '#e8e6f0';
  for (let i = 1; i < c.lines.length; i++) ctx.fillText(c.lines[i], VW / 2, VH / 2 + 8 + i * 12);
  if (c.t > 0.7) { ctx.fillStyle = '#9aa0bb'; ctx.fillText(c.prompt || 'press x to go back', VW / 2, VH / 2 + 50); }
  ctx.globalAlpha = 1; ctx.textAlign = 'left';
}

// what's loaded right now, so leaks get caught early (G or F3)
let fps = 60;
function drawDebug() {
  const st = Assets.stats(), lines = [
    `room: ${room.id}   fps ${Math.round(fps)}`,
    `rooms loaded: ${Rooms.loaded().join(', ') || '-'}`,
    `pictures: ${st.count}  (${(st.bytes / 1048576).toFixed(1)} MB once drawn)`,
    ...st.list.map(e => `  ${e.src.replace('art/', '')}  x${e.n}${e.ok ? '' : '  loading'}`),
    `particles: ${liveParts()} / ${POOL}   popups ${popups.length}`,
    `x ${Math.round(P.x)}  y ${Math.round(P.y)}  speed ${Math.round(P.vx)}  fall ${Math.round(P.vy)}`,
  ];
  ctx.font = '8px ui-monospace, monospace';
  const w = 236, h = lines.length * 10 + 8, x = VW - w - 8, y = 44;
  ctx.fillStyle = 'rgba(14,15,24,0.82)'; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#e8e6f0'; lines.forEach((l, i) => ctx.fillText(l, x + 6, y + 12 + i * 10));
}

// ---------- little signs of life in each room (the room file says which) ----------
// dust: specks floating in the light indoors. yard: pollen and butterflies. leaves: leaves drifting down.
// fireflies: blinking lights in the dark at the bottom of the oak. All of it is just drawing, nothing to bump into.
let ambT = performance.now();
function glowGroups() {                                // the room's glowworms in groups: a gap of 30 px or more across starts a new one
  const pts = [...room.def.glowworms].sort((a, b) => a[0] - b[0]), out = [];
  for (const [x, y] of pts) {
    const g = out[out.length - 1];
    if (g && x - g.x1 < 30) { g.x1 = x; g.ys.push(y); g.n++; }
    else out.push({ x0: x, x1: x, ys: [y], n: 1 });
  }
  for (const g of out) { g.ys.sort((a, b) => a - b); g.y0 = g.ys[0]; g.y1 = g.ys[Math.floor(g.ys.length * 0.85)]; }   // (the bottom few, like glowing fungus on the floor nearby, left out)
  return out.filter(g => g.n >= 8);                  // (a few loose points on their own aren't a group)
}
function drawAmbient(camX, camY, glowPass) {
  if (glowPass) { drawGlow(camX, camY); return; }
  const now = performance.now(), dt = Math.min(0.05, (now - ambT) / 1000); ambT = now;
  const kinds = room.def.outside ? OUT_AMBIENT[timeOfDay()] : (room.def.ambient || ['dust']);
  if (room.def.outside) {                           // (outside, what's in the air goes by the time of day: what doesn't belong to it now is let go)
    const keep = new Set(kinds.flatMap(k => MOTE_KINDS[k] || []));
    for (let i = motes.length - 1; i >= 0; i--) if (!keep.has(motes[i].k)) motes.splice(i, 1);
  }
  const count = k => motes.reduce((n, m) => n + (m.k === k ? 1 : 0), 0);
  const rnd = (a, b) => a + Math.random() * (b - a);
  if (kinds.includes('dust') && count('dust') < 26) motes.push({ k: 'dust', x: rnd(0, VW), y: rnd(0, VH), vx: rnd(-3, 3), vy: rnd(-4, -1), ph: rnd(0, 6) });
  if (kinds.includes('yard')) {
    if (count('dust') < 18) motes.push({ k: 'dust', x: rnd(0, VW), y: rnd(0, VH), vx: rnd(4, 10), vy: rnd(-3, 1), ph: rnd(0, 6), warm: true });
    if (count('fly') < 3) motes.push({ k: 'fly', x: camX + rnd(0, VW), y: room.viewBottom - rnd(40, 110), ph: rnd(0, 6), col: ['#f5c542', '#ffffff', '#f0a0c8'][count('fly')], tx: 0, ty: 0, t: 0 });
  }
  if (kinds.includes('motes') && count('dust') < 20) motes.push({ k: 'dust', x: rnd(0, VW), y: rnd(0, VH), vx: rnd(2, 6), vy: rnd(-3, 0), ph: rnd(0, 6), warm: true });
  if (kinds.includes('midges') && count('midge') < 14) { const cx = rnd(40, VW - 40), cy = rnd(60, VH - 60); for (let i = 0; i < 7; i++) motes.push({ k: 'midge', cx, cy, ph: rnd(0, 6), sp: rnd(2, 4), r: rnd(3, 9), life: rnd(4, 9) }); }
  if (kinds.includes('bubbles') && count('bub') < 18) motes.push({ k: 'bub', x: rnd(0, VW), y: VH + rnd(0, 40), vy: rnd(-26, -12), ph: rnd(0, 6), s: Math.random() < 0.3 ? 2 : 1 });
  if (kinds.includes('leaves') && count('leaf') < 10) motes.push({ k: 'leaf', x: rnd(-20, VW), y: rnd(-60, -4), vy: rnd(14, 26), ph: rnd(0, 6), col: ['#5aa84a', '#8fd06a', '#c8b04a', '#3f8a48'][Math.floor(rnd(0, 4))] });
  if (kinds.includes('spores') && count('spore') < 22) motes.push({ k: 'spore', x: rnd(0, VW), y: rnd(0, VH), vx: rnd(-2, 2), vy: rnd(-5, -2), ph: rnd(0, 6), c: Math.random() < 0.7 ? '170,240,200' : '230,220,160' });
  if (kinds.includes('moths') && room.def.glowworms && !count('moth'))   // a moth or two round each group of glowworms (10/27/2026)
    for (const gr of glowGroups()) for (let j = 0; j < (gr.n > 40 ? 2 : 1); j++) motes.push({ k: 'moth', g: gr, x: rnd(gr.x0, gr.x1), y: rnd(gr.y0, gr.y1), tx: 0, ty: 0, t: 0, ph: rnd(0, 6) });
  if (kinds.includes('fireflies') && count('ff') < 14) {
    const fy0 = room.pxH - 340;
    motes.push({ k: 'ff', x: rnd(0, room.pxW), y: rnd(fy0, room.pxH - 30), ph: rnd(0, 6), sp: rnd(0.6, 1.4), ox: 0, oy: 0 });
  }
  for (let i = motes.length - 1; i >= 0; i--) {
    const m = motes[i]; m.ph += dt;
    if (m.k === 'dust') {
      m.x += m.vx * dt + Math.sin(m.ph * 0.6) * 0.05; m.y += m.vy * dt;
      if (m.y < -2 || m.x > VW + 4) { m.y = VH + 2; m.x = rnd(0, VW); }
      ctx.fillStyle = m.warm ? 'rgba(255,240,180,0.45)' : 'rgba(255,246,214,0.35)'; ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1);
    } else if (m.k === 'leaf') {                       // sways side to side as it falls
      m.y += m.vy * dt; const sx = m.x + Math.sin(m.ph * 1.6) * 10;
      if (m.y > VH + 6) { motes.splice(i, 1); continue; }
      ctx.fillStyle = m.col; const flip = Math.sin(m.ph * 3.2) > 0;
      ctx.fillRect(Math.round(sx), Math.round(m.y), flip ? 3 : 2, flip ? 2 : 3); ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(sx) + 1, Math.round(m.y) + 1, 1, 1);
    } else if (m.k === 'fly') {                        // a butterfly flitting around near the flowers (lives in the room, not the screen)
      m.t -= dt;
      if (m.t <= 0) { m.tx = camX + rnd(20, VW - 20); m.ty = room.viewBottom - rnd(36, 120); m.t = rnd(1.2, 2.6); }
      m.x += (m.tx - m.x) * dt * 0.9 + Math.sin(m.ph * 9) * 0.3; m.y += (m.ty - m.y) * dt * 0.9 + Math.sin(m.ph * 13) * 0.6;
      const sx = Math.round(m.x - camX), sy = Math.round(m.y - camY), up = Math.sin(m.ph * 26) > 0;
      if (sx < -10 || sx > VW + 10) { m.x = camX + rnd(0, VW); continue; }
      ctx.fillStyle = '#2a2030'; ctx.fillRect(sx, sy, 1, 2);
      ctx.fillStyle = m.col; if (up) { ctx.fillRect(sx - 2, sy - 2, 2, 2); ctx.fillRect(sx + 1, sy - 2, 2, 2); } else { ctx.fillRect(sx - 2, sy, 2, 1); ctx.fillRect(sx + 1, sy, 2, 1); }
    } else if (m.k === 'moth') {                       // fluttering round the glowworms, in the room (not the screen)
      m.t -= dt;
      if (m.t <= 0) { m.tx = rnd(m.g.x0 - 16, m.g.x1 + 16); m.ty = rnd(m.g.y0 - 6, m.g.y1 + 12); m.t = rnd(0.6, 1.8); }
      m.x += (m.tx - m.x) * dt * 1.6 + Math.sin(m.ph * 11) * 0.35; m.y += (m.ty - m.y) * dt * 1.6 + Math.sin(m.ph * 7) * 0.45;
      const sx = Math.round(m.x - camX), sy = Math.round(m.y - camY), up = Math.sin(m.ph * 30) > 0;
      if (sx < -6 || sx > VW + 6 || sy < -6 || sy > VH + 6) continue;
      ctx.fillStyle = '#3a3428'; ctx.fillRect(sx, sy, 1, 2);
      ctx.fillStyle = 'rgba(232,244,236,0.95)';                // (pale, catching the glowworms' light)
      if (up) { ctx.fillRect(sx - 3, sy - 2, 3, 2); ctx.fillRect(sx + 1, sy - 2, 3, 2); } else { ctx.fillRect(sx - 3, sy + 1, 3, 1); ctx.fillRect(sx + 1, sy + 1, 3, 1); }
    } else if (m.k === 'midge') {                     // a little cloud of midges over the water
      m.life -= dt; if (m.life <= 0) { motes.splice(i, 1); continue; }
      const x = m.cx + Math.sin(m.ph * m.sp) * m.r + Math.sin(m.ph * 0.3) * 10, y = m.cy + Math.cos(m.ph * m.sp * 1.3) * m.r * 0.6;
      ctx.fillStyle = 'rgba(30,34,30,0.7)'; ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
    } else if (m.k === 'bub') {                       // bubbles drifting up
      m.y += m.vy * dt; const x = m.x + Math.sin(m.ph * 2) * 2;
      if (m.y < -4) { motes.splice(i, 1); continue; }
      const wx = camX + x, wy = camY + m.y;
      if ((room.def.drySpots || []).some(d => wx >= d[0] && wx < d[2] && wy >= d[1] && wy < d[3])) continue;   // a pocket of air: no bubbles in there
      ctx.fillStyle = 'rgba(200,240,236,0.5)'; ctx.fillRect(Math.round(x), Math.round(m.y), m.s, m.s);
      if (m.s > 1) { ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fillRect(Math.round(x), Math.round(m.y), 1, 1); }
    } else if (m.k === 'ff') { m.dt = dt; }
    else if (m.k === 'spore') {                       // glowing spores drifting up from the mushrooms (drawn after the dark, so they glow)
      m.x += m.vx * dt + Math.sin(m.ph * 0.8) * 0.08; m.y += m.vy * dt;
      if (m.y < -2) { m.y = VH + 2; m.x = rnd(0, VW); }
    }
  }
}
// the underground rooms' little moving things (10/17/2026, the underground look): glow worm beads twinkling, and
// water dripping from a crack in the roof with a ripple where it lands, and the plants' glowing bulbs and beads. The room file says where (glowworms, drips, frontglow)
const dripState = [];
let glowT = performance.now();
function drawUnderground(camX, camY) {
  const now = performance.now() / 1000, dt = Math.min(0.05, (performance.now() - glowT) / 1000); glowT = performance.now();
  for (const [x, y] of room.def.glowworms || []) {
    const sx = Math.round(x - camX), sy = Math.round(y - camY);
    if (sx < -4 || sx > VW + 4 || sy < -4 || sy > VH + 4) continue;
    const k = 0.55 + 0.45 * Math.sin(now * 1.3 + x * 0.37 + y * 0.11);
    ctx.fillStyle = `rgba(150,235,255,${0.07 * k})`; ctx.fillRect(sx - 2, sy - 2, 5, 5);
    ctx.fillStyle = `rgba(150,235,255,${0.2 * k})`; ctx.fillRect(sx - 1, sy - 1, 3, 3);
    ctx.fillStyle = `rgba(210,250,255,${0.6 + 0.4 * k})`; ctx.fillRect(sx, sy, 1, 1);
  }
  for (const [x, y, f, s, c] of room.def.frontglow || []) {                       // the glowing bits on the underground's plants (f: which layer they're on)
    const sx = Math.round(x - Math.round(camX * f)), sy = Math.round(y - Math.round(camY * f));
    if (sx < -8 || sx > VW + 8 || sy < -8 || sy > VH + 8) continue;
    const k = 0.6 + 0.4 * Math.sin(now * 0.9 + x * 0.21 + y * 0.13), rr = Math.max(1, Math.round(s));
    const rgb = c ? [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)].join(',') : '160,240,220';
    for (const [w, a] of [[rr + 3, 0.05], [rr + 1, 0.12], [rr - 1, 0.45]]) {      // a soft round glow, pixel by pixel rings
      if (w < 0) continue; ctx.fillStyle = `rgba(${rgb},${a * k})`;
      ctx.fillRect(sx - w, sy - Math.round(w * 0.5), w * 2 + 1, Math.round(w * 0.5) * 2 + 1); ctx.fillRect(sx - Math.round(w * 0.5), sy - w, Math.round(w * 0.5) * 2 + 1, w * 2 + 1);
    }
    ctx.fillStyle = `rgba(235,255,250,${0.5 + 0.5 * k})`; ctx.fillRect(sx, sy, 1, 1);
  }
  (room.def.drips || []).forEach(([x, top, bottom, every], i) => {
    const d = dripState[i] = dripState[i] && dripState[i].room === room.id ? dripState[i] : { room: room.id, t: Math.random() * every, y: null, ring: 0 };
    if (d.y === null) { d.t -= dt; if (d.t <= 0) { d.y = top + 2; d.v = 0; } }
    else { d.v += 600 * dt; d.y += d.v * dt; if (d.y >= bottom) { d.y = null; d.t = every * (0.7 + Math.random() * 0.6); d.ring = 0.45; } }
    const sx = Math.round(x - camX);
    if (sx < -20 || sx > VW + 20) return;
    if (d.y !== null) { ctx.fillStyle = 'rgba(200,232,240,0.75)'; ctx.fillRect(sx, Math.round(d.y - camY) - 1, 1, 2); }
    if (d.ring > 0) {
      d.ring -= dt; const w = Math.round((0.45 - d.ring) * 26), a = d.ring / 0.45 * 0.6;
      ctx.fillStyle = `rgba(200,232,240,${a})`; ctx.fillRect(sx - w, Math.round(bottom - camY), 2, 1); ctx.fillRect(sx + w - 1, Math.round(bottom - camY), 2, 1);
    }
  });
}
// a painted room's plants (10/27/2026): each row of the picture slides sideways by whole pixels, nothing at the anchor
// row (where it grows from, or hangs from) and the most at the far end, so the pixels stay crisp. It sways on its own,
// and when he walks through it it's pushed aside and springs back. [piece, layer, anchor x, anchor y, sway px, speed, part px, phase]
const plantState = new Map();
let plantT = performance.now(), plantDt = 0;
function drawPlants(layer, camX, camY) {
  const list = room.def.plants;
  if (!list) return;
  if (layer === 1) { plantDt = Math.min(0.05, Math.max(0, (performance.now() - plantT) / 1000)); plantT = performance.now(); }   // (once a frame: the pass behind him comes first)
  const now = performance.now() / 1000, dt = plantDt, pcs = room.def.art.pieces || {};
  list.forEach(([n, lay, ax, ay, sway, speed, part, ph], i) => {
    if (lay !== layer) return;
    const r = pcs[n], im = r && Assets.get(room.def.art.pack + '#piece_' + n);
    if (!im || r[0] - camX > VW + 12 || r[1] - camY > VH || r[0] + r[2] - camX < -12 || r[1] + r[3] - camY < 0) return;
    const key = room.id + ':' + i;
    let st = plantState.get(key); if (!st) { st = { o: 0, v: 0 }; plantState.set(key, st); }
    let target = 0;                                                  // he's in it: pushed away from him, the closer the more
    if (part > 0 && P.x + HW > r[0] - 4 && P.x - HW < r[0] + r[2] + 4 && P.y > r[1] && P.y - P.h < r[1] + r[3]) {
      const dx = ax - P.x, w = r[2] / 2 + HW;
      target = part * (dx === 0 ? -P.facing : Math.sign(dx)) * Math.max(0.35, 1 - Math.abs(dx) / w);
    }
    st.v += ((target - st.o) * 70 - st.v * 9) * dt; st.o += st.v * dt;   // a spring: a little wobble when he's gone
    const sw = sway * Math.sin(now * speed * 2.4 + ph), far = Math.max(Math.abs(r[1] - ay), Math.abs(r[1] + r[3] - 1 - ay), 1);
    for (let yy = 0; yy < r[3]; yy++) {
      const k = Math.abs(r[1] + yy - ay) / far, dx = Math.round((sw + st.o) * k);
      ctx.drawImage(im, 0, yy, r[2], 1, r[0] + dx, r[1] + yy, r[2], 1);
    }
  });
}
// a painted room's light layers (10/27/2026), each breathing slowly at its own pace. Most are part of the room, so
// they're drawn behind him (and cut out of the dark, so they still shine through it); one marked front is drawn
// over everything, him too. g is where to draw, ox/oy what's taken off the room's x/y there, op how, cam the camera
function glowEach(camX, camY, front, fn) {
  if (!room.def.glow) return;
  const now = performance.now() / 1000, pcs = room.def.art.pieces || {};
  const tod = room.def.outside ? timeOfDay() : 'day';
  for (const [n, pulse, speed, phase, depth, times] of room.def.glow) {
    if ((depth === 'front') !== front || (times && !times.includes(tod))) continue;   // (a light for some times of day only, outside: the mushrooms' glow at night)
    const r = pcs[n], im = r && Assets.get(room.def.art.pack + '#piece_' + n);
    if (!im || r[0] - camX > VW || r[1] - camY > VH || r[0] + r[2] - camX < 0 || r[1] + r[3] - camY < 0) continue;
    fn(im, r, 1 - pulse * (0.5 + 0.5 * Math.sin(now * speed + phase)));
  }
}
function drawGlowLayers(g, ox, oy, front, op, camX = ox, camY = oy) {
  glowEach(camX, camY, front, (im, r, a) => {
    g.globalCompositeOperation = op; g.globalAlpha = a;
    g.drawImage(op === 'destination-out' ? glowMask(im) : im, r[0] - ox, r[1] - oy);   // (not rounded: the camera moves in fractions of a pixel, and the room with it)
  });
  g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
}
const glowMasks = new WeakMap();
function glowMask(im) {                              // how bright each pixel of a light layer is, as its alpha: how much it opens the dark
  let m = glowMasks.get(im);
  if (m) return m;
  m = document.createElement('canvas'); m.width = im.width; m.height = im.height;
  const g = m.getContext('2d'); g.drawImage(im, 0, 0);
  try {
    const d = g.getImageData(0, 0, m.width, m.height), p = d.data;
    for (let i = 0; i < p.length; i += 4) { p[i + 3] = Math.round(Math.max(p[i], p[i + 1], p[i + 2]) * p[i + 3] / 255); p[i] = p[i + 1] = p[i + 2] = 0; }
    g.putImageData(d, 0, 0);
  } catch (e) { m = im; }                            // (opened from a file, the browser won't let the game read pixels back: the picture's own alpha does instead)
  glowMasks.set(im, m); return m;
}
// things that glow are drawn after the room gets dark, so they shine through it
function drawGlow(camX, camY) {
  drawGlowLayers(ctx, camX, camY, true, 'lighter');
  if (room.def.glowworms || room.def.drips || room.def.frontglow) drawUnderground(camX, camY);
  for (const m of motes) {
    if (m.k === 'spore') { const a = 0.35 + 0.35 * Math.sin(m.ph * 2.3); ctx.fillStyle = `rgba(${m.c},${a})`; ctx.fillRect(Math.round(m.x), Math.round(m.y), 1, 1); continue; }
    if (m.k === 'ff') {                                // a firefly: drifts slowly, glows on and off
      m.ox = Math.sin(m.ph * 0.7 * m.sp) * 14; m.oy = Math.cos(m.ph * 0.5 * m.sp) * 10;
      const sx = Math.round(m.x + m.ox - camX), sy = Math.round(m.y + m.oy - camY);
      const glow = Math.max(0, Math.sin(m.ph * 1.8 * m.sp));
      if (sx < -8 || sx > VW + 8 || sy < -8 || sy > VH + 8 || glow < 0.05) continue;
      ctx.fillStyle = `rgba(220,255,120,${0.16 * glow})`; ctx.fillRect(sx - 2, sy - 1, 5, 3); ctx.fillRect(sx - 1, sy - 2, 3, 5);
      ctx.fillStyle = `rgba(240,255,170,${0.9 * glow})`; ctx.fillRect(sx, sy, 1, 1);
    }
  }
}

// ---------- the time of day outside (10/28/2026) ----------
// rooms under the open sky work at any time of day. The game picks day, dawn, dusk or night by where the story is
// (STORY_TIMES), the sky shows its own picture for that time, and the rest of the room gets the time's tint and dark.
// DBG.time overrides it (the Time button in the debug strip)
const TIME_SHADE = { day: null, dawn: { tint: '#2a1a40', a: 0.22, lights: [] }, dusk: { tint: '#3a1a14', a: 0.3, lights: [] }, night: { tint: '#040a20', a: 0.55, lights: [] } };
const STORY_TIMES = [];
const OUT_AMBIENT = { day: ['leaves', 'yard'], dawn: ['leaves', 'motes'], dusk: ['leaves', 'midges'], night: ['fireflies'] };   // what's in the air outside at each time: leaves and butterflies by day, midges at dusk, fireflies at night
const MOTE_KINDS = { leaves: ['leaf'], yard: ['dust', 'fly'], motes: ['dust'], midges: ['midge'], fireflies: ['ff'], spores: ['spore'], dust: ['dust'] };                     // [flag, time] in story order, the last one whose flag is set wins: empty (always day) till the story's times are decided
function timeOfDay() {
  if (typeof DBG !== 'undefined' && DBG.time) return DBG.time;
  let t = 'day';
  for (const [flag, tt] of STORY_TIMES) if (world.flags[flag]) t = tt;
  return t;
}

// ---------- the dark under the trees: lights cut out of it (glowing mushrooms, light coming down, a little around Phill) ----------
let shadeC = null;
function drawShade(px, py, camX, camY) {
  const sh = room.def.outside ? TIME_SHADE[timeOfDay()] : room.def.shade;
  if (!sh) return;
  if (!shadeC || shadeC.width !== VW || shadeC.height !== VH) { shadeC = document.createElement('canvas'); shadeC.width = VW; shadeC.height = VH; }
  const g = shadeC.getContext('2d'), now = performance.now() / 1000;
  g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, VW, VH);
  if (sh.tint) { const c = sh.tint; g.fillStyle = `rgba(${parseInt(c.slice(1, 3), 16)}, ${parseInt(c.slice(3, 5), 16)}, ${parseInt(c.slice(5, 7), 16)}, ${sh.a})`; }   // under the water: everything a murky blue
  else g.fillStyle = `rgba(4, 8, 12, ${sh.a})`;
  g.fillRect(0, 0, VW, VH);
  g.globalCompositeOperation = 'destination-out';
  const hole = (x, y, r, k) => {
    if (x < -r || x > VW + r || y < -r || y > VH + r) return;
    const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(0,0,0,${k})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  };
  hole(px - camX, py - 18 - camY, 110, 0.75);
  for (const [x, y, r, k] of sh.lights) hole(x - camX, y - camY, r, Math.min(1, k * (0.93 + 0.07 * Math.sin(now * 1.7 + x * 0.01))));
  drawGlowLayers(g, camX, camY, false, 'destination-out');                   // the room's light behind him isn't darkened
  ctx.drawImage(shadeC, 0, 0);
}

// ---------- Rootwood's things in the room: breakable walls, spilled acorns, the squirrel ----------
// the pieces that hide a secret: the passage behind a breakable wall (gone for good once he's been in there) and the
// wall itself, drawn as the ground round it
function drawCovers() {
  const pieces = room.def.art.pieces; if (!pieces) return;
  for (const b of room.breaks) {
    if (!b.cover) continue;
    const c = b.cover, inside = P.x > (c.pas[0] - 0.5) * T && P.x < (c.pas[2] + 1.5) * T && P.y > c.pas[1] * T - 4 && P.y <= (c.pas[3] + 1) * T + 4;
    if ((inside || b.broken) && !world.flags['seen_' + b.id]) { world.flags['seen_' + b.id] = true; saveWorld(); }
    if (world.flags['seen_' + b.id]) b.coverA = Math.max(0, b.coverA - 0.05);
    const draw = (name, a) => { const r = pieces[name], im = Assets.get(room.def.art.pack + '#piece_' + name); if (r && im && a > 0) { ctx.globalAlpha = a; ctx.drawImage(im, r[0], r[1]); ctx.globalAlpha = 1; } };
    draw('cover_' + b.id + '_pass', b.coverA);
    if (!b.broken) { const jx = b.shake > 0 ? Math.round((Math.random() * 2 - 1) * 2) : 0; ctx.save(); ctx.translate(jx, 0); draw('cover_' + b.id + '_wall', 1); ctx.restore(); }
  }
}
// a crack down a wall that's only ground: what gives a secret away. Faint and short to start with (it has
// to blend in), longer and more of them as it's hit
function drawCrack(b, jx) {
  const x0 = b.x0 * T + jx, y0 = b.y0 * T, w = (b.x1 - b.x0 + 1) * T, h = (b.y1 - b.y0 + 1) * T;
  const rnd = seed => { const s = Math.sin(seed * 127.1 + b.x0 * 311.7 + b.y0 * 74.7) * 43758.5453; return s - Math.floor(s); };
  const hits = b.hp0 - b.hp, n = 1 + hits, len = Math.min(0.9, 0.45 + hits * 0.2);
  ctx.strokeStyle = `rgba(8,6,10,${(0.45 + hits * 0.15).toFixed(2)})`; ctx.lineWidth = 1;
  for (let k = 0; k < n; k++) {
    let x = x0 + w * (0.3 + rnd(k) * 0.4), y = y0 + h * (0.2 + rnd(k + 3) * 0.2);
    const steps = 6;
    ctx.beginPath(); ctx.moveTo(Math.round(x) + 0.5, Math.round(y) + 0.5);
    for (let i = 0; i < steps; i++) { x += (rnd(k * 9 + i) - 0.5) * 5; y += h * len / steps + (rnd(k * 9 + i + 40) - 0.5) * 2; ctx.lineTo(Math.round(x) + 0.5, Math.round(y) + 0.5); }
    ctx.stroke();
    if (hits > 0) { const bx = x0 + w * (0.3 + rnd(k) * 0.4), by = y0 + h * 0.45; ctx.beginPath(); ctx.moveTo(Math.round(bx) + 0.5, Math.round(by) + 0.5); ctx.lineTo(Math.round(bx + (rnd(k + 7) - 0.5) * 12) + 0.5, Math.round(by + 5 + rnd(k + 8) * 5) + 0.5); ctx.stroke(); }   // side cracks once it's been hit
  }
  ctx.fillStyle = 'rgba(8,6,10,0.4)';
  for (let k = 0; k < 1 + hits; k++) ctx.fillRect(Math.round(x0 + 2 + rnd(k + 20) * (w - 5)), Math.round(y0 + 2 + rnd(k + 30) * (h - 4)), 1, 1);   // a pit or two
}
// something sitting in a hidden passage stays hidden with it (the marble showed through)
function hiddenByCover(x, y) {
  for (const b of room.breaks) {
    if (!b.cover || b.coverA < 0.3) continue;
    const c = b.cover.pas;
    if (x >= c[0] * T && x < (c[2] + 1) * T && y > c[1] * T && y <= (c[3] + 1) * T + 4) return true;
  }
  return false;
}
// a painted room's own picture for a wall that breaks or a gate (10/27/2026): the room file names it under skins by
// the flag that opens it, and it's drawn where it was painted till then, in place of the game's own drawing
function drawSkin(key, jx) {
  let n = room.def.skins && room.def.skins[key];
  const fx = room.def.skinfx && room.def.skinfx[key], now = performance.now() / 1000;
  if (n && fx && fx.frames) n = fx.frames[Math.floor(now * fx.fps) % fx.frames.length];   // a strip of frames playing in a loop (10/27/2026)
  const r = n && room.def.art.pieces && room.def.art.pieces[n];
  const im = r && Assets.get(room.def.art.pack + '#piece_' + n);
  if (!im) return false;
  if (!fx || !fx.shake) { ctx.drawImage(im, r[0] + jx, r[1]); return true; }
  const [px, speed, anchors] = fx.shake, h = Math.max(1, r[3] - 1);   // trembling: rows slide by whole pixels, the anchored rows still
  for (let yy = 0; yy < r[3]; yy++) {
    const u = yy / h, k = anchors === 'top' ? u : anchors === 'bottom' ? 1 - u : Math.sin(Math.PI * u);
    const dx = Math.round(px * k * Math.sin(now * speed * 2.4 + yy * 0.35));
    ctx.drawImage(im, 0, yy, r[2], 1, r[0] + jx + dx, r[1] + yy, r[2], 1);
  }
  return true;
}
function drawBreaks() {
  for (const b of room.breaks) {
    if (b.broken) continue;
    const jx = b.shake > 0 ? Math.round((Math.random() * 2 - 1) * 2) : 0;
    if (b.cover) { drawCrack(b, jx); continue; }
    if (drawSkin(b.flag || b.id, jx)) continue;
    if (b.look === 'foam' || b.look === 'mud' || b.look === 'balloons' || b.look === 'sand' || b.look === 'web' || b.look === 'leaves' || b.look === 'bramble' || b.look === 'rot' || b.look === 'hardroot' || b.look === 'latch' || b.look === 'crust') { drawSoftWall(b, jx); continue; }
    spr('break_' + (b.look || 'roots'), b.x0 * T + jx, (b.y1 + 1) * T, false);
  }
  for (const gt of room.gates) if (!gt.open && gt.flag && gt.look !== 'none') { if (drawSkin(gt.flag, 0)) continue; if (gt.look && typeof drawGateLook === 'function') drawGateLook(gt); else spr('break_curtain', gt.x0 * T, (gt.y1 + 1) * T, false); }
}
function drawPiles() {
  for (const p of world.piles) {
    if (p.room !== room.id) continue;
    const kind = p.kind || 'acorns';
    for (let i = 0; i < Math.min(6, p.n); i++) spr(COIN_SPR[kind], p.x - 8 + (i % 3) * 7 + (i > 2 ? 3 : 0), p.y - (i > 2 ? 4 : 0), false);
    if (Math.sin(performance.now() / 300 + p.x) > 0.97) twinkle(p.x, p.y - 8, 1, COIN_COL[kind]);
  }
}
function drawNpc() {
  const n = room.def.npc;
  if (!n || n.gone) return;
  const now = performance.now() / 1000, f = P.x > n.x ? 1 : -1;
  const k = n.kind;                                                     // squirrel_idle_1, beetle_talk_2 and so on
  let fr = k + '_idle_' + (Math.floor(now * 2.2) % 4 === 3 ? 2 : 1);
  if (k === 'beetle' && !talk && !npcPose) fr = Math.floor(now * 0.7) % 3 === 0 ? 'beetle_carve_' + (Math.floor(now * 6) % 2 + 1) : fr;   // whittling away when nobody's talking to him
  if (k === 'bullfrog' && !talk && !npcPose && Math.floor(now * 0.4) % 5 === 4) fr = 'bullfrog_croak';     // a deep croak now and then
  if (talk && talk.who === k) fr = talk.n < talk.lines[talk.i].length ? k + '_talk_' + (Math.floor(now * 9) % 2 + 1) : k + '_idle_1';
  if (npcPose && npcPose.t > 0) fr = npcPose.frame;
  spr(fr, n.x, n.y, f > 0);
}
let npcPose = null;               // a scene can hold whoever's there in a pose for a bit: { frame, t }
// "up" over whoever or whatever he can use, like a little note
function drawPrompt(px, py, camX, camY) {
  const n = nearby();
  if (!n) return;
  const text = fmtKeys(n.kind === 'rest' ? '{up}: rest' : '{up}: talk'), x = Math.round(px - camX), y = Math.round(py - camY - 52);
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center';
  const w = Math.ceil(ctx.measureText(text).width) + 10;
  ctx.fillStyle = 'rgba(20,16,30,0.35)'; ctx.fillRect(x - w / 2 + 1, y + 1, w, 12);
  ctx.fillStyle = '#fbf7ec'; ctx.fillRect(x - w / 2, y, w, 12); ctx.fillStyle = '#4a4258'; ctx.fillText(text, x, y + 9); ctx.textAlign = 'left';
}

function drawSceneText() {
  const st = sceneText, now = performance.now();
  const k = Math.min(1, st.t / 0.6) * (st.out ? Math.max(0, 1 - (st.t - st.out) / 0.5) : 1);
  ctx.globalAlpha = Math.max(0, k);
  ctx.fillStyle = 'rgba(10, 8, 12, 0.55)'; ctx.fillRect(0, VH / 2 - 34, VW, 74);
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffe8c8';
  st.lines.forEach((l, i) => { if (st.t > 0.4 + i * 1.0) readText(l, VW / 2 - readWidth(l) / 2, VH / 2 - 12 + i * 13, '#ffe8c8'); });   // the reading font
  if (st.t > 0.4 + st.lines.length * 1.0 && !st.out && Math.floor(now / 400) % 2) { ctx.fillStyle = '#9aa0bb'; ctx.fillText(fmtKeys('{jump}: go on'), VW / 2, VH / 2 + 32); }
  ctx.textAlign = 'left'; ctx.globalAlpha = 1;
}

// the near side of something he goes under or into (10/28/2026), drawn over him: it hides what's under it, fades
// away while he's inside its box and comes back when he's out. The room file: reveals [[piece, [x0, y0, x1, y1]], ...]
const revealK = {};
let revealT = 0;
function drawReveals() {
  if (!room.def.reveals) return;
  const now = performance.now() / 1000, dt = Math.min(0.1, Math.max(0, now - revealT)); revealT = now;
  const pcs = room.def.art.pieces || {};
  for (const [n, b] of room.def.reveals) {
    const cx = P.x, cy = P.y - 10, inside = cx >= b[0] && cx <= b[2] && cy >= b[1] && cy <= b[3];
    const key = room.def.id + ':' + n, k0 = revealK[key] ?? (inside ? 0 : 1), want = inside ? 0 : 1;
    const k = revealK[key] = k0 + Math.sign(want - k0) * Math.min(Math.abs(want - k0), dt * 4);   // (a quarter of a second either way)
    const r = pcs[n], im = r && Assets.get(room.def.art.pack + '#piece_' + n);
    if (!im || k <= 0.01) continue;
    ctx.globalAlpha = k; ctx.drawImage(im, r[0], r[1]); ctx.globalAlpha = 1;
  }
}

// the near layer, see-through round him (the picnic tree's near leaves and limbs, 10/18/2026: keep the tree full
// but still see him clearly). frontFade: [radius, how much of it's left right over him]
let frontFadeCv = null, frontFadeK = 0;
function drawFrontFaded(front, at, camX, camY, px, py) {
  const [rad, keep] = room.def.frontFade;
  if (!frontFadeCv || frontFadeCv.width !== VW || frontFadeCv.height !== VH) { frontFadeCv = document.createElement('canvas'); frontFadeCv.width = VW; frontFadeCv.height = VH; }
  const c = frontFadeCv.getContext('2d');
  c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, VW, VH);
  c.drawImage(front, Math.round(at[0] - camX), Math.round(at[1] - camY));
  c.globalCompositeOperation = 'destination-out';
  const cx = px - camX, cy = py - 22 - camY, g = c.createRadialGradient(cx, cy, rad * 0.35, cx, cy, rad);
  g.addColorStop(0, `rgba(0,0,0,${1 - keep})`); g.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = g; c.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
  c.globalCompositeOperation = 'source-over';
  ctx.drawImage(frontFadeCv, camX, camY);
}
