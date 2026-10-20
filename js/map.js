'use strict';
// ---------- Phill's map ----------
// He draws it himself. With the black crayon he outlines every room he's been in, in its real shape. Each region has its
// own colored crayon hidden somewhere in it: until he finds it, the region is just black outlines and he doesn't know
// where he is in it. Once he has it, he colors it in and he shows up on the map.
// Opening it, he sits down and gets his paper out; while it's open he scribbles away. M or Q (or Share / the touchpad).
let mapView = null;
const REGION_CRAYON = { rootwood: 'crayon_rootwood', pond: 'crayon_pond', playground: 'crayon_playground', oak: 'crayon_oak' };
const REGION_COLOR = { rootwood: '#5aa84a', oak: '#a8703f', pond: '#4a8ad8', playground: '#e8843a' };
const REGION_NAME = { rootwood: 'rootwood', oak: 'the old oak', pond: 'the pond', playground: 'the playground' };
const BLACK = '#1e1a24';
const quickSit = () => [pose('turn', 0.06), pose('sit_1', 0.07), pose('sit_2', 0.07), pose('sit_3', 0.1)];
const quickStand = () => [pose('sit_3', 0.08), pose('sit_1', 0.08), pose('turn', 0.06), pose(null)];
let mapWant = 0;                   // M pressed this frame with the map shut (a scene where he's already sitting can use it)
const canMap = () => !!(world.has.crayon_black && room.def.mapAt && window.MAP_ROOMS);
// from sitting: paper out of the backpack, scribble away while the map's open, paper back in. He's still sitting after
const mapFromSitting = () => [
  pose('paper_1', 0.1), pose('paper_1b', 0.08), pose('paper_2', 0.1), pose('paper_3', 0.12),
  run(() => { mapView = { t: 0, closing: false }; P.paper = { marks: {} }; P.crayon = BLACK; sfx.paper(); if (!world.flags.openedMap) { world.flags.openedMap = true; saveWorld(); } }),
  t => { P.story = { kind: 'scene', frame: DRAW[Math.floor(t * 8) % 8], t }; return !mapView; },   // scribbling while it's open
  run(() => { P.paper = null; P.crayon = null; sfx.paper(); }),
  pose('paper_3', 0.08), pose('paper_2', 0.1), pose('paper_1b', 0.08), pose('paper_1', 0.1), pose('sit_3', 0.1),
];

function openMap() {
  if (!canMap() || scene || P.held) return;
  P.vx = 0;
  playScene([...quickSit(), ...mapFromSitting(), ...quickStand()]);
}
function closeMapNow() { mapView = null; if (scene) endScene(); P.story = null; P.paper = null; P.crayon = null; }
function updateMap(dt) {
  if (!mapView) { mapWant = talkIn.map; talkIn.map = 0; return; }
  mapView.t += dt;
  if (mapView.closing) { mapView.k -= dt * 6; if (mapView.k <= 0) mapView = null; }
  else if (mapView.t > 0.25 && (talkIn.map || talkIn.back || talkIn.press)) { mapView.closing = true; mapView.k = 1; }
  talkIn.map = 0; talkIn.back = 0; talkIn.press = 0;
}

// each room drawn once into two little pictures: a crayon line round its edge, and its inside (paper, or the region's
// color once he has its crayon). All the lines go down first and then all the insides, so where two rooms meet at a
// door the line's covered and you can see the way through
const mapCache = {};
function roomPic(id, s, colored) {
  const key = id + s + colored;
  if (mapCache[key]) return mapCache[key];
  const m = window.MAP_ROOMS[id], w = Math.ceil(m.w * s) + 6, h = Math.ceil(m.h * s) + 6;
  const mk = () => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const line = mk(), fill = mk(), lg = line.getContext('2d'), fg = fill.getContext('2d');
  const open = (x, y) => x >= 0 && y >= 0 && x < m.w && y < m.h && m.rows[y][x] !== '#';
  let seed = id.length * 97 + 13;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const th = s < 2 ? 2 : 3;
  lg.fillStyle = BLACK;
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) if (open(x, y)) lg.fillRect(Math.floor(3 + x * s - th / 2 - 0.5), Math.floor(3 + y * s - th / 2 - 0.5), Math.ceil(s) + th, Math.ceil(s) + th);
  const col = colored ? REGION_COLOR[m.region] || '#9aa0bb' : '#f4ecd8';
  for (let y = 0; y < m.h; y++) for (let x = 0; x < m.w; x++) if (open(x, y)) {
    fg.fillStyle = colored && rnd() < 0.25 ? shadeHex(col, 1.12) : col;
    fg.fillRect(Math.floor(3 + x * s), Math.floor(3 + y * s), Math.ceil(s), Math.ceil(s));
  }
  if (colored) {                                       // crayon strokes over the color
    fg.globalCompositeOperation = 'source-atop'; fg.strokeStyle = shadeHex(col, 0.82); fg.lineWidth = 1;
    for (let k = -h; k < w; k += 4) { fg.beginPath(); fg.moveTo(k, h); fg.lineTo(k + h * 0.6, 0); fg.stroke(); }
    fg.globalCompositeOperation = 'source-over';
  }
  const d = lg.getImageData(0, 0, w, h), px = d.data;                       // the line is a little patchy, like crayon
  for (let i = 0; i < px.length; i += 4) if (px[i + 3] && rnd() < 0.1) px[i + 3] = 150;
  lg.putImageData(d, 0, 0);
  return (mapCache[key] = { line, fill });
}

function drawMap() {
  if (!mapView) return;
  const k = mapView.closing ? mapView.k : Math.min(1, mapView.t / 0.2);
  const rooms = Object.keys(world.seen).filter(id => window.MAP_ROOMS[id]);
  if (!rooms.length) return;
  ctx.globalAlpha = k;
  ctx.fillStyle = 'rgba(6,7,12,0.6)'; ctx.fillRect(0, 0, VW, VH);
  // the sheet of paper, a little crumpled from his backpack
  const pw = Math.min(VW - 40, 560), ph = Math.min(VH - 40, 300), px0 = Math.round((VW - pw) / 2), py0 = Math.round((VH - ph) / 2) + Math.round((1 - k) * 20);
  ctx.fillStyle = '#c8bca4'; ctx.fillRect(px0 + 3, py0 + 4, pw, ph);
  ctx.fillStyle = '#f4ecd8'; ctx.fillRect(px0, py0, pw, ph);
  ctx.fillStyle = '#e6dcc6'; ctx.fillRect(px0 + Math.round(pw / 2), py0, 1, ph); ctx.fillRect(px0, py0 + Math.round(ph / 2), pw, 1);   // fold lines
  // fit everything he's seen on the sheet
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const id of rooms) { const m = MAP_ROOMS[id]; x0 = Math.min(x0, m.x); y0 = Math.min(y0, m.y); x1 = Math.max(x1, m.x + m.w); y1 = Math.max(y1, m.y + m.h); }
  const s = Math.min((pw - 40) / (x1 - x0), (ph - 50) / (y1 - y0), 2.2);
  const ox = px0 + Math.round((pw - (x1 - x0) * s) / 2), oy = py0 + 30 + Math.round((ph - 40 - (y1 - y0) * s) / 2);
  const toMap = (wx, wy) => [Math.round(ox + (wx - x0) * s), Math.round(oy + (wy - y0) * s)];
  for (const pass of ['line', 'fill']) for (const id of rooms) {
    const m = MAP_ROOMS[id], colored = !!world.has[REGION_CRAYON[m.region]];
    const [mx, my] = toMap(m.x, m.y);
    ctx.drawImage(roomPic(id, s, colored)[pass], mx - 3, my - 3);
  }
  const here = room.def.mapAt, reg = room.def.region;
  ctx.font = '600 16px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center';
  ctx.fillStyle = BLACK; ctx.fillText(REGION_NAME[reg] || reg, px0 + pw / 2, py0 + 22);
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace';
  // what the squirrel told him about, resting spots he's used, acorns he spilled
  for (const mk of world.marks) {
    const m = mk && MAP_ROOMS[mk.room]; if (!m || !Number.isFinite(mk.x) || !Number.isFinite(mk.y)) continue;   // (one that's no good is just skipped)
    const [mx, my] = toMap(m.x + mk.x / T, m.y + mk.y / T);
    ctx.fillStyle = '#c8322c'; ctx.fillRect(mx - 3, my - 3, 2, 2); ctx.fillRect(mx + 1, my - 3, 2, 2); ctx.fillRect(mx - 1, my - 1, 2, 2); ctx.fillRect(mx - 3, my + 1, 2, 2); ctx.fillRect(mx + 1, my + 1, 2, 2);   // an x
  }
  for (const id of rooms) {                                       // resting spots he's used: a little mushroom
    const m = MAP_ROOMS[id]; if (!m.rest || !(world.rested || {})[id]) continue;
    const [mx, my] = toMap(m.x + m.rest[0] / T, m.y + m.rest[1] / T);
    ctx.fillStyle = BLACK; ctx.fillRect(mx - 4, my - 7, 9, 4); ctx.fillRect(mx - 1, my - 3, 3, 4);
    ctx.fillStyle = '#66d0a4'; ctx.fillRect(mx - 3, my - 6, 7, 2);
  }
  for (const p of world.piles) {
    const m = MAP_ROOMS[p.room]; if (!m) continue;
    const [mx, my] = toMap(m.x + p.x / T, m.y + p.y / T);
    ctx.fillStyle = '#8a5a2a'; ctx.fillRect(mx - 3, my - 5, 6, 6); ctx.fillStyle = '#5a3a1a'; ctx.fillRect(mx - 2, my - 6, 4, 1); ctx.fillRect(mx - 3, my - 2, 6, 1);   // a little backpack
  }
  // Phill: only once he's found this region's crayon
  if (here && world.has[REGION_CRAYON[reg]]) {
    const [mx, my] = toMap(here[0] + P.x / T, here[1] + P.y / T);
    const bob = Math.round(Math.sin(performance.now() / 200));
    ctx.fillStyle = BLACK; ctx.fillRect(mx - 4, my - 9 + bob, 9, 9);
    ctx.fillStyle = '#7cc470'; ctx.fillRect(mx - 3, my - 8 + bob, 7, 7);
    ctx.fillStyle = BLACK; ctx.fillRect(mx - 2, my - 6 + bob, 1, 2); ctx.fillRect(mx + 2, my - 6 + bob, 1, 2);
  } else if (here && reg === 'rootwood') {
    ctx.fillStyle = '#8a8070'; ctx.fillText("he doesn't know where he is in here yet", px0 + pw / 2, py0 + ph - 12);
  }
  ctx.fillStyle = '#8a8070'; ctx.textAlign = 'right'; ctx.fillText(fmtKeys('{map} or {dodge}: put it away'), px0 + pw - 10, py0 + 14); ctx.textAlign = 'left';
  ctx.globalAlpha = 1;
}
