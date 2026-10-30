'use strict';
// ---------- what he's found (10/30/2026) ----------
// Picking up something that's meant for someone, a window comes up over the game saying what it is, what it's for,
// and who to take it to and where they are, with a button to say he's got it. The game waits till it's pressed.
// The words are kept here, one entry an item, so the inventory can say the same things when it's made.
//   name   what it's called
//   found  what it is
//   use    what it's for
//   who    who to take it to, and where   where: the room id, for the inventory's "where" later
//   draw   how to draw its picture (x, y: its middle, g: where to draw it)
//   used   true once it's been given or used up (it leaves his things then)
const SUPPLY_SHEET = new Image(); SUPPLY_SHEET.src = 'art/warren/warren_sprites.png';      // (the town's needs are on the Warren's sheet)
const supplyPic = name => (x, y, g) => {
  const f = window.WARREN_SPRITES && WARREN_SPRITES[name]; if (!f || !SUPPLY_SHEET.complete || !SUPPLY_SHEET.naturalWidth) return;
  g.drawImage(SUPPLY_SHEET, f[0], f[1], f[2], f[3], Math.round(x - f[4]), Math.round(y - f[5] + f[3] / 2), f[2], f[3]);
};
const ITEM_INFO = {
  gall: {
    name: 'An old oak gall',
    found: 'A hard little ball the old oak grew a long time ago. Crushed and soaked, it makes a dark stain for wood.',
    use: "The beetle could stain Phill's sword with it. A stained sword hits harder.",
    who: 'Take it to the beetle, under the oak in Rootwood.', where: 'roots',
    draw: (x, y, g) => drawGall(x, y, 1, g), used: () => swordLevel() >= 1,
  },
  // what the Warren needs, from Tock's board (10/30/2026)
  supply_battery: {
    name: 'A battery',
    found: "A battery with some juice left in it. Clank's been saying the night lights are nearly flat.",
    use: "Clank can keep the Warren's night lights on with it, and get at the music box at last.",
    who: 'Take it to Clank, at his stall on Mend Lane in the Warren.', where: 'mendlane',
    draw: supplyPic('sup_battery'), used: () => !!world.flags.gave_battery,
  },
  supply_thread: {
    name: 'A spool of thread',
    found: "Thread, nearly a whole spool of it. Mabel hasn't had a scrap to mend with in a long time.",
    use: 'Mabel can mend with it. Torn toys can be fixed again.',
    who: 'Take it to Mabel, at her stall on Mend Lane in the Warren.', where: 'mendlane',
    draw: supplyPic('sup_thread'), used: () => !!world.flags.gave_thread,
  },
  supply_soap: {
    name: 'A sliver of soap',
    found: 'A little sliver of soap, still with some suds in it.',
    use: 'Peg scrubs the Grime off everyone who comes into the Warren. She can keep doing it with this.',
    who: 'Take it to Peg, just inside the toy chest.', where: 'chest',
    draw: supplyPic('sup_soap'), used: () => !!world.flags.gave_soap,
  },
  supply_candles: {
    name: 'Birthday candles',
    found: 'A handful of birthday candles, hardly burned.',
    use: 'The mole can melt the wax into the cracks in his tunnels.',
    who: "Take them to the mole, at his workshop under the Warren.", where: 'moleshop',
    draw: supplyPic('sup_candles'), used: () => !!world.flags.gave_candles,
  },
};

const itemCard = window.itemCard = (() => {
  const api = { open: false, id: null, pending: 0 };
  const stage = document.getElementById('stage');
  const root = document.createElement('div'); root.id = 'itemcard'; root.hidden = true;
  root.innerHTML = `<section class="ic-panel" role="dialog" aria-modal="true" aria-labelledby="ic-name">
    <canvas class="ic-pic" width="30" height="30" aria-hidden="true"></canvas>
    <h2 id="ic-name"></h2><p class="ic-found"></p><p class="ic-use"></p><p class="ic-who"></p>
    <button type="button" class="ic-ok">Got it</button><div class="ic-keys"></div></section>`;
  stage.appendChild(root);
  const $ = s => root.querySelector(s), pic = $('.ic-pic'), ok = $('.ic-ok');
  let wasPaused = false, held = null, armed = false;
  function place() {
    const dpr = window.devicePixelRatio || 1;
    root.style.setProperty('--gx', offX / dpr + 'px'); root.style.setProperty('--gy', offY / dpr + 'px');
    root.style.setProperty('--gw', VW * S / dpr + 'px'); root.style.setProperty('--gh', VH * S / dpr + 'px');
  }
  function show(id) {
    const info = ITEM_INFO[id]; if (!info || api.open) return;
    api.open = true; api.id = id; wasPaused = paused; paused = true; held = null; armed = false;
    $('#ic-name').textContent = info.name; $('.ic-found').textContent = info.found; $('.ic-use').textContent = info.use; $('.ic-who').textContent = info.who;
    const g = pic.getContext('2d'); g.clearRect(0, 0, pic.width, pic.height); g.imageSmoothingEnabled = false;
    if (info.draw) info.draw(pic.width / 2, pic.height / 2, g);
    $('.ic-keys').textContent = device === 'pad' ? 'Cross: got it' : device === 'touch' || document.body.classList.contains('touch') ? '' : 'Enter or Space: got it';
    place(); root.hidden = false; requestAnimationFrame(() => root.classList.add('on'));
    try { ok.focus({ preventScroll: true }); } catch (e) {}
    if (sfx.pop) sfx.pop();
  }
  function close() {
    if (!api.open) return;
    api.open = false; root.classList.remove('on'); setTimeout(() => { if (!api.open) root.hidden = true; }, 200);
    paused = wasPaused; keys.clear(); if (sfx.tick) sfx.tick();
    try { C.focus && C.focus(); } catch (e) {}
  }
  ok.addEventListener('click', e => { e.stopPropagation(); close(); });
  for (const ev of ['pointerdown', 'touchstart']) root.addEventListener(ev, e => e.stopPropagation());
  // the keyboard: Enter, Space, Esc or his jump or attack key says got it, and nothing else gets the key while it's up
  window.addEventListener('keydown', e => {
    if (!api.open) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.repeat) return;
    if (['Enter', 'Space', 'Escape', 'NumpadEnter'].includes(e.code) || (KEYMAP.jump || []).includes(e.code) || (KEYMAP.atk || []).includes(e.code)) close();
  }, true);
  window.addEventListener('keyup', e => { if (api.open) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  // a controller: Cross, Circle or Options, on letting go (so it isn't still held down when the game carries on)
  const _pollPad = pollPad;
  pollPad = () => {
    if (!api.open) { _pollPad(); return; }
    const gp = typeof activePad === 'function' ? activePad() : null; if (!gp) return;
    const down = [0, 1, 9].filter(i => gp.buttons[i] && gp.buttons[i].pressed);
    if (held === null) { held = new Set(down); return; }                                // (whatever was held as it came up doesn't count till it's let go)
    if (down.some(i => !held.has(i))) armed = true;
    held = new Set(down);
    if (armed && !down.length) close();
  };
  window.addEventListener('resize', () => { if (api.open) place(); });
  api.show = show; api.close = close;
  return api;
})();

// picking one up: the window comes up once it's floated up over his head
const _takeItemCard = takeItem;
takeItem = it => {
  _takeItemCard(it);
  if (ITEM_INFO[it.id]) { itemCard.pending++; setTimeout(() => { itemCard.pending--; itemCard.show(it.id); }, 1000); }   // (pending: a journal note waits for it too)
};

// ---- on his map: who's waiting on him (10/30/2026). A quest step can say whose face goes on his map and where
// (map: { face, x, y } with the step's room), and while it's the step he's on, that face shows there, moving a little
// so it catches the eye, with a gold ring going out from it now and then. Only in rooms he's been in. The faces are
// drawn here, a few pixels each, one for each character as they're needed: MAP_FACES
function drawMapWants(toMap) {
  if (typeof QUEST === 'undefined') return;
  const t = performance.now() / 1000;
  for (const q of QUEST.list()) {
    const st = QUEST.status(q); if (st.state !== 'active') continue;
    q.steps.forEach((step, i) => {
      const mk = step.map, id = step.room;
      if (!mk || !id || !world.seen[id] || !MAP_FACES[mk.face]) return;
      if (step.done.every(w => QUEST.test(w))) return;
      if (mk.carry ? !world.has[mk.carry] : i !== st.at) return;                          // (carry: while he has it with him. Otherwise: while it's the step he's on)
      const m = window.MAP_ROOMS && MAP_ROOMS[id]; if (!m) return;
      const [mx, my] = toMap(m.x + mk.x / T, m.y + mk.y / T);
      const ph = ((t + i * 0.4) % 1.6) / 1.6, rr = 6 + ph * 10;                            // the ring going out
      ctx.save(); ctx.globalAlpha *= (1 - ph) * 0.8; ctx.strokeStyle = '#e8b040'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(mx + 0.5, my - 8, rr, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      MAP_FACES[mk.face](mx, my + Math.round(Math.sin(t * 5 + i) * 0.8), t + i);
    });
  }
}
const MAP_BEETLE = [                                                                      // his head side on, looking left: the big jaws, the gold rim round his eye
  '....OOOOOO....',
  'O..ObbbbbbO...',
  'OO.ObbGGGbBO..',
  '.OOObbGEGBBBO.',
  '..OObbGGGBBBO.',
  '.OOOBBBBBBBBO.',
  'OO..OBBBBBBO..',
  'O....OOOOOO...',
];
// the Warren's: Clank (his tin head, the blue visor, the red light on his feeler), Mabel (the rag doll's orange curls),
// Peg (the clothes peg, her red cap) and the mole (side on, his pink nose). k is an eye: they blink now and then
const FACE_TPL = {
  clank: { cols: { O: '#2a2e3a', g: '#8a98a8', G: '#b4c0cc', k: '#6ad0f0', r: '#e04030' }, skin: 'g', rows: [
    '.....r......', '.....O......', '..OOOOOOOO..', '..OGGGGGgO..', '..OkkOOkkO..', '..OggggggO..', '..OgOOOOgO..', '..OOOOOOOO..'] },
  mabel: { cols: { H: '#a04a20', h: '#e07830', w: '#f4ecdc', k: '#2a1a14', r: '#d04040' }, skin: 'w', rows: [
    '..HhhhhhH..', '.HhhhhhhhH.', 'HhhwwwwwhhH', 'HhwkwwwkwhH', 'HhwwwwwwwhH', '.Hhwrrrwhh.', '..HwwwwwH..', '...HHHHH...'] },
  peg: { cols: { O: '#4a2a14', r: '#c83a30', R: '#e05a48', n: '#a8703c', k: '#2a1a10', m: '#7a4a24' }, skin: 'n', rows: [
    '...OOOOO...', '..ORRrrrO..', '.OrrrrrrrO.', '..OnnnnnO..', '..OnknknO..', '..OnnnnnO..', '..OnnmnnO..', '...OOOOO...'] },
  mole: { cols: { O: '#1a161e', d: '#3a3440', D: '#5a5262', p: '#e89aa0', k: '#c8c0d0' }, skin: 'd', rows: [
    '....OOOOOO...', '..OODDDdddO..', 'pOODddddddddO', 'ppddkdddddddO', '.OOdddddddddO', '...OOOOOOOO..'] },
};
function drawFace(tpl, x, y, t) {
  const rows = tpl.rows, w = rows[0].length, x0 = x - Math.floor(w / 2), y0 = y - 4 - rows.length;
  const blink = (t % 3.3) < 0.14;
  rows.forEach((row, j) => { for (let i = 0; i < row.length; i++) { let ch = row[i]; if (ch === 'k' && blink) ch = tpl.skin; const c = tpl.cols[ch]; if (c) { ctx.fillStyle = c; ctx.fillRect(x0 + i, y0 + j, 1, 1); } } });
}
const MAP_FACES = { beetle: (x, y, t) => drawMapBeetle(x, y, t) };
for (const k in FACE_TPL) MAP_FACES[k] = (x, y, t) => drawFace(FACE_TPL[k], x, y, t);
function drawMapBeetle(x, y, t) {
  const col = { O: '#2a140c', B: '#62341c', b: '#8c5030', G: '#e8c060', E: '#2a140c' };
  const x0 = x - 7, y0 = y - 12;                                                          // (sat just above the spot, so it doesn't cover the line)
  MAP_BEETLE.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const c = col[row[i]]; if (c) { ctx.fillStyle = c; ctx.fillRect(x0 + i, y0 + j, 1, 1); } } });
  const tw = Math.sin(t * 9) > 0.6;                                                       // his feeler, twitching
  ctx.fillStyle = col.O;
  if (tw) { ctx.fillRect(x0 + 8, y0 - 1, 1, 1); ctx.fillRect(x0 + 9, y0 - 2, 1, 1); ctx.fillRect(x0 + 10, y0 - 2, 1, 1); }
  else { ctx.fillRect(x0 + 8, y0 - 1, 1, 1); ctx.fillRect(x0 + 8, y0 - 2, 1, 1); ctx.fillRect(x0 + 9, y0 - 3, 1, 1); }
}
