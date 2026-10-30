'use strict';
// ---------- his sword's upgrades (10/30/2026) ----------
// The beetle under the oak does the work, and every step needs something Phill finds out in the park to do it with,
// not acorns. The first is the old oak gall under the fallen log on the litter path: oaks grow these and they were
// used for ink and wood stain, so the beetle makes a dark stain from it. The steps after it (the cherry stain and the
// etching that were there before) are one step later now, so they're stronger when they come. What each of those
// needs isn't settled yet, so they can't be done yet.
//
// One line a step, in order (world.sword is how many are done):
//   needs   what Phill has to have found (world.has), or null while it isn't settled
//   offer   what the beetle's question says for it
//   line    what he says while he works
//   done    what pops up over Phill after
//   hint    what the beetle says when Phill hasn't got what it needs yet
//   sheet   which of Phill's gear sheets has the sword looking like this ('' the plain one)
//   hits    how hard the sword hits, times the plain sword
const SWORD_WORK = [
  { needs: 'gall', offer: 'stain it with the gall', sheet: '_gall', hits: 1.15,             // (dark umber, the hilt kept warm: phill_gear_gall_*.png)
    line: "Oak gall. Crush it, soak it, and it makes the darkest stain there is. Hold it still.",
    done: 'his sword, stained dark with the oak gall',
    hint: "There's an old oak gall under the fallen log out on the litter path. Bring me that and I'll make you a stain." },
  { needs: null, offer: 'stain it cherry', sheet: '_s1', hits: 1.35,
    line: "Cherry stain over the gall. Soaks in deep, hardens the grain. Hold it still.",
    done: 'his sword, stained a deep cherry',
    hint: "Could go darker and harder still. I'd need something to make it from, though. Haven't seen it round here." },
  { needs: null, offer: 'etch it', sheet: '_s2', hits: 1.6,
    line: "Going to burn a pattern down the blade. Burned wood's tougher. Always has been.",
    done: 'his sword, etched down the blade',
    hint: "I could burn a pattern into it. Need something to do it with, though. Keep your eyes open." },
];
const swordLevel = () => Math.max(0, Math.min(SWORD_WORK.length, world.sword || 0));
const swordNext = () => SWORD_WORK[swordLevel()] || null;
const swordReady = () => { const w = swordNext(); return !!(w && w.needs && world.has[w.needs]); };
const swordSheet = () => { const l = swordLevel(); return l ? SWORD_WORK[l - 1].sheet : ''; };
const swordPower = () => { const l = swordLevel(); return l ? SWORD_WORK[l - 1].hits : 1; };

// the oak gall as he finds it: a little round woody ball, dark and knobbly, with the hole the wasp left. It's hidden
// under the log, so from outside it's just a dark lump like the litter round it. Once he's down there with it, it
// warms up: a soft gold glow round it, a bright rim along the top, and now and then a glint off it, so it reads as
// something special without giving away where it is from anywhere else (10/30/2026)
const GALL_NEAR = 90;                                                                   // how close he has to be (across, and about level with it) for it to shine
function drawGall(x, y, near, g = ctx) {                                                         // the gall itself, drawn with the items
  const k = near === undefined ? gallNear(x, y) : near;
  const P0 = '#2e2018', P1 = '#5a4230', P2 = '#7a5c40', P3 = '#9c7a56';
  const px = (cx, cy, c) => { g.fillStyle = c; g.fillRect(Math.round(x + cx), Math.round(y + cy), 1, 1); };
  for (let yy = -6; yy <= 5; yy++) for (let xx = -6; xx <= 5; xx++) {
    const d = Math.hypot(xx + 0.5, yy + 0.5);
    if (d > 6) continue;
    px(xx, yy, d > 5.2 ? P0 : (xx + yy < -5 ? P3 : xx + yy < 0 ? P2 : P1));
  }
  px(-3, -2, P0); px(2, 1, P0); px(-1, 3, P0); px(3, -3, P0);                           // knobbly
  px(1, -2, P0); px(0, -2, P0); px(1, -1, P0); px(0, -1, '#1a120c');                    // the little hole
  px(-3, -4, '#b89870');
  if (near !== undefined) drawGallShine(x, y, k, g);                                       // (floating up when he picks it up: shining all the way)
}
// its shine, drawn on top of everything in the room (the log in front of it fades as he goes under, but not all the
// way, and the shine has to show through): the glow breathing, the light along its top edge, and a glint now and then
function drawGallShine(x, y, k, g = ctx) {
  if (!(k > 0)) return;
  const t = performance.now() / 1000, RIM = '#f4c45c', RIM2 = '#c89040', HI = '#fff6d0';
  const px = (cx, cy, c, a = 1) => { g.globalAlpha = Math.max(0, Math.min(1, a)); g.fillStyle = c; g.fillRect(Math.round(x + cx), Math.round(y + cy), 1, 1); g.globalAlpha = 1; };
  const pulse = 0.7 + 0.3 * Math.sin(t * 2.4), r = 15 + 2 * pulse;                    // a warm glow round it (not over it, so it doesn't wash it out)
  const gr = g.createRadialGradient(x, y, 5, x, y, r);
  gr.addColorStop(0, `rgba(255, 196, 96, ${0.55 * k * pulse})`); gr.addColorStop(1, 'rgba(255, 196, 96, 0)');
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); g.restore();
  for (let yy = -6; yy <= 5; yy++) for (let xx = -6; xx <= 5; xx++) {                   // the light catching it: a gold edge along the top, a softer one in from it
    const d = Math.hypot(xx + 0.5, yy + 0.5), lit = xx * 0.6 + yy;
    if (d > 5.2 && d <= 6 && lit < 0.5) px(xx, yy, RIM, k);
    else if (d > 4.2 && d <= 5.2 && lit < -1.5) px(xx, yy, RIM2, 0.9 * k);
  }
  px(-3, -4, HI, k); px(-2, -4, HI, 0.8 * k); px(-3, -3, HI, 0.6 * k); px(-1, -5, HI, 0.5 * k);   // its highlight
  for (let i = 0; i < 3; i++) {                                                         // a few gold motes drifting up off it
    const ph = ((t * 0.45 + i / 3) % 1), mx = Math.sin(t * 1.3 + i * 2.1) * 4 + (i - 1) * 4, my = -4 - ph * 16;
    px(mx, my, RIM, Math.sin(ph * Math.PI) * 0.9 * k);
  }
  const cyc = 1.4, ph = (t % cyc) / cyc, n = Math.floor(t / cyc), spot = [[-3, -4], [3, -3], [-1, -5], [4, 0]][n % 4];
  if (ph < 0.4) {                                                                       // a glint: a four point star, a different spot each time
    const a = Math.sin(ph / 0.4 * Math.PI) * k, L = ph < 0.2 ? 3 : 4;
    g.save(); g.globalCompositeOperation = 'lighter';
    px(spot[0], spot[1], HI, a);
    for (let i = 1; i <= L; i++) { const f = a * (1 - i / (L + 1)); px(spot[0] + i, spot[1], HI, f); px(spot[0] - i, spot[1], HI, f); px(spot[0], spot[1] + i, HI, f); px(spot[0], spot[1] - i, HI, f); }
    g.restore();
  }
}
function drawGallsShine() {                                                             // (called after everything in front of him: render.js)
  for (const it of room.items) if (it.kind === 'gall' && it.got !== 2 && !it.hidden) drawGallShine(it.x, it.y - 7, gallNear(it.x, it.y - 7));
}
// how much it shines: all of it with him right there under the log, fading out as he moves off, none from outside
function gallNear(x, y) {
  if (typeof P === 'undefined' || P.x === undefined) return 0;
  const dx = Math.abs(P.x - x), dy = Math.abs(P.y - (y + 7));
  if (dy > 20) return 0;
  return Math.max(0, Math.min(1, (GALL_NEAR - dx) / 40));
}
