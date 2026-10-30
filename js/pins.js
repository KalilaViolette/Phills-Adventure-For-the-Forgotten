'use strict';
// ---------- pins and buttons: little perks he wears ----------
// He buys them (the squirrel has a few) and pins them on at a resting spot: sitting on the cushion, the shield
// button gets out his pin board. He can wear two at once for now.
const PINS = {
  acorn_cap: { name: 'acorn cap pin', what: 'one more acorn whenever an enemy drops any', cell: 0, cost: 24 },
  magnet: { name: 'fridge magnet', what: 'acorns come to you from farther away', cell: 1, cost: 16 },
  thimble: { name: 'thimble', what: 'blocking wears your shield down slower', cell: 2, cost: 34 },
  stitch: { name: 'lucky stitch', what: 'two hits win back a puff instead of three', cell: 3, cost: 40 },
  dfwing: { name: 'dragonfly wing', what: 'the air dodge carries farther', cell: 4, cost: 30 },
  shell: { name: 'snail shell', what: 'hits hardly knock you back', cell: 5, cost: 35 },
  feather: { name: "wren's feather", what: 'gliding sinks slower', cell: 6, cost: 0 },
  bark_chip: { name: 'bark chip', what: 'he slides down walls slower', cell: 9, cost: 27 },
  burr: { name: 'sticky burr', what: 'anything that bumps into him gets stuck a moment', cell: 10, cost: 0 },
  party_hat: { name: 'party hat', what: 'the squeak, spin and fluff burst cost less breath', cell: 7, cost: 32 },
  tiny_top: { name: 'tiny top', what: 'the spin lasts longer', cell: 8, cost: 27 },
  watch: { name: 'pocket watch', what: 'the squeak, spin and fluff burst come back sooner', cell: 11, cost: 0 },   // found, not bought: behind the dead leaves in the well's wall (10/14/2026)
};
const PIN_SHEET = 'art/pins.png';
Assets.use(PIN_SHEET);
const pinSlots = () => world.slots || 2;
const wearing = id => (world.wearing || []).includes(id);
const ownedPins = () => Object.keys(PINS).filter(id => (world.pins || {})[id]);

let pinBoard = null, pinWant = 0;
function updatePins(dt) {
  if (!pinBoard) { pinWant = talkIn.guard; talkIn.guard = 0; return; }
  const pb = pinBoard, list = ownedPins();
  pb.t += dt;
  if (pb.closing) { pb.k -= dt * 6; if (pb.k <= 0) pinBoard = null; }
  else if (pb.t > 0.2) {
    if (talkIn.up) { pb.sel = (pb.sel + list.length - 1) % list.length; sfx.tick(); }
    if (talkIn.down) { pb.sel = (pb.sel + 1) % list.length; sfx.tick(); }
    if (talkIn.press) {
      const id = list[pb.sel];
      world.wearing = world.wearing || [];
      if (wearing(id)) { world.wearing = world.wearing.filter(w => w !== id); sfx.paper(); }
      else if (world.wearing.length < pinSlots()) { world.wearing.push(id); sfx.lock(); }
      else { sfx.nope(); pb.full = 1; }
      saveWorld();
    }
    if (talkIn.back || talkIn.guard) { pb.closing = true; pb.k = 1; }
  }
  if (pb.full) pb.full = Math.max(0, pb.full - dt);
  talkIn.up = talkIn.down = talkIn.press = talkIn.back = talkIn.guard = 0;
}
function drawPins() {
  if (!pinBoard) return;
  const pb = pinBoard, k = pb.closing ? pb.k : Math.min(1, pb.t / 0.2), list = ownedPins();
  ctx.globalAlpha = k;
  ctx.fillStyle = 'rgba(6,7,12,0.55)'; ctx.fillRect(0, 0, VW, VH);
  const w = Math.min(VW - 40, 300), h = 44 + list.length * 24, x0 = Math.round((VW - w) / 2), y0 = Math.round((VH - h) / 2) + Math.round((1 - k) * 16);
  ctx.fillStyle = '#5a3a24'; ctx.fillRect(x0 + 3, y0 + 4, w, h);                         // a little corkboard
  ctx.fillStyle = '#b8895a'; ctx.fillRect(x0, y0, w, h);
  ctx.fillStyle = '#a87a4c'; for (let i = 0; i < 40; i++) ctx.fillRect(x0 + ((i * 53) % (w - 4)) + 2, y0 + ((i * 37) % (h - 4)) + 2, 2, 1);
  ctx.fillStyle = '#6a4a2c'; ctx.fillRect(x0, y0, w, 2); ctx.fillRect(x0, y0 + h - 2, w, 2); ctx.fillRect(x0, y0, 2, h); ctx.fillRect(x0 + w - 2, y0, 2, h);
  ctx.font = '600 16px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'left'; ctx.fillStyle = '#2a1a10';
  ctx.fillText('pins', x0 + 10, y0 + 18);
  const worn = (world.wearing || []).length;
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'right';
  ctx.fillStyle = pb.full ? '#c8322c' : '#3a2416'; ctx.fillText(`wearing ${worn} of ${pinSlots()}`, x0 + w - 10, y0 + 16);
  const sheet = Assets.get(PIN_SHEET);
  list.forEach((id, i) => {
    const pin = PINS[id], y = y0 + 28 + i * 24, sel = i === pb.sel;
    if (sel) { ctx.fillStyle = 'rgba(255,240,200,0.35)'; ctx.fillRect(x0 + 6, y - 2, w - 12, 22); }
    if (sheet) ctx.drawImage(sheet, pin.cell * 32, 0, 32, 32, x0 + 10, y - 1, 20, 20);
    readText(pin.name, x0 + 36, y + 7, wearing(id) ? '#2a1a10' : '#4a3424');
    readText(pin.what, x0 + 36, y + 17, '#5a4030');
    if (wearing(id)) { ctx.fillStyle = '#c8322c'; ctx.fillRect(x0 + w - 22, y + 4, 8, 8); ctx.fillStyle = '#ff8a70'; ctx.fillRect(x0 + w - 21, y + 5, 3, 2); }   // a red pin head: it's on
    else { ctx.fillStyle = '#7a5a3a'; ctx.fillRect(x0 + w - 21, y + 7, 6, 2); }
  });
  ctx.textAlign = 'center'; ctx.fillStyle = '#3a2416';
  ctx.fillText(fmtKeys('{jump}: put on or take off   {dodge}: done'), VW / 2, y0 + h - 6);
  ctx.textAlign = 'left'; ctx.globalAlpha = 1;
}
// from sitting on a resting cushion: the board comes out, and he's still sitting after
const pinsFromSitting = () => [
  pose('paper_1', 0.1), pose('paper_2', 0.1),
  run(() => { pinBoard = { t: 0, sel: 0, closing: false }; sfx.paper(); }),
  t => { P.story = { kind: 'scene', frame: 'paper_3', t }; return !pinBoard; },
  pose('paper_2', 0.08), pose('paper_1', 0.08), pose('sit_3', 0.1),
];

// cotton tufts the squirrel sells: three of them stuffed in and he's got one more puff
function addCotton() {
  world.cotton = (world.cotton || 0) + 1;
  if (world.cotton % 3 === 0) {
    world.maxHealth += 1; P.maxHealth = world.maxHealth - (P.worn || 0); P.health = Math.min(P.maxHealth, P.health + 1);
    puff(P.x, P.y - 22, 14, 60, '#ffffff', 60); sfx.stitch(); popup(P.x, P.y - 54, 'one more cotton puff', '#fbf7ec', true);
  } else popup(P.x, P.y - 54, `a tuft of cotton (${world.cotton % 3} of 3)`, '#fbf7ec');
  saveWorld();
}
// the beetle's work on his sword: each step hits a bit harder
const swordBonus = () => swordPower();   // how hard each of the beetle's steps makes it hit is in js/sword.js (10/30/2026: the oak gall first, the cherry stain and the etching after)
