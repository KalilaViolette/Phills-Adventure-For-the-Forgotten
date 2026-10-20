'use strict';
// ---------- the Warren: the toys' town dug out under the Old Oak ----------
// (10/14/2026) An old toy chest got buried under the oak years ago, tipped over and spilled the toys out,
// and when the Grime started taking toys over, the ones it hadn't got yet dug in. The chest's their front gate, and
// the only way in. At first the Nutcracker won't let a stranger through. Tock, a wind-up mouse Phill helps three times
// out in the park, vouches for him. Everyone gets scrubbed at the gate, every time. Inside, the town warms up to him
// as he goes (bosses beaten, supplies brought back, the mole found), and the mole, once he's home, digs Phill about
// underground, the way the crow flies him about up top.
// Loaded after render.js: it hooks into the room's drawing as well as its setup.

(() => {                                                                                  // all in here: its names don't clash with the rest of the game's
// ---------- the region: its sheet, its money, its crayon, its color on the map ----------
SPRITE_SHEETS.push(['art/warren/warren_sprites.png', () => window.WARREN_SPRITES]); Assets.use('art/warren/warren_sprites.png');
Assets.use(SPR);                                                                         // the bottle caps that corner Tock, wherever he is
COIN_KINDS.push('buttons'); REGION_COIN.warren = 'buttons'; COIN_SPR.buttons = 'button_small'; COIN_ICON.buttons = 'button_icon'; COIN_COL.buttons = '#e88ad0';
REGION_ITEMS.warren = { crayon_warren: 0, button: 1, key: 2, battery: 3, thread: 4, soap: 5, candles: 6, cotton: 7 };
REGION_CRAYON.warren = 'crayon_warren'; REGION_COLOR.warren = '#d87aa8'; REGION_NAME.warren = 'the warren';

// ---------- their voices ----------
Object.assign(sfx, {
  nutTalk: () => { const f = 160 + Math.random() * 30; tone(f, f * 0.9, 0.06, 'square', 0.02); },
  nutClack: () => { noise(0.04, 2400, 1800, 0.08, 4); setTimeout(() => noise(0.04, 1800, 1400, 0.06, 4), 70); },
  tockTalk: () => { const f = 2000 + Math.random() * 600; tone(f, f * 1.1, 0.025, 'square', 0.012); },
  tockTick: () => { noise(0.02, 5000, 4000, 0.05, 6); },
  moleTalk: () => { const f = 120 + Math.random() * 30; tone(f, f * 0.85, 0.11, 'triangle', 0.035); },
  moleSniff: () => { noise(0.12, 900, 2200, 0.05, 1.5); setTimeout(() => noise(0.1, 900, 2200, 0.04, 1.5), 150); },
  dollTalk: () => { const f = 520 + Math.random() * 80; tone(f, f * 0.95, 0.06, 'sine', 0.035); },
  robotTalk: () => { const f = 900 + Math.random() * 300; tone(f, f, 0.04, 'square', 0.015); },
  oldTalk: () => { const f = 220 + Math.random() * 40; tone(f, f * 0.95, 0.09, 'triangle', 0.03); },
  pegTalk: () => { const f = 700 + Math.random() * 120; tone(f, f * 1.05, 0.04, 'triangle', 0.03); },
  armyTalk: () => { const f = 300 + Math.random() * 40; tone(f, f, 0.04, 'square', 0.018); },
  jackTalk: () => { const f = 600 + Math.random() * 300; tone(f, f * 1.4, 0.05, 'triangle', 0.03); },
  boing2: () => { tone(220, 660, 0.18, 'triangle', 0.05); },
  tinkle: () => { const f = 1800 + Math.random() * 600; tone(f, f, 0.12, 'sine', 0.03); },
  softTalk: () => { const f = 440 + Math.random() * 60; tone(f, f * 0.97, 0.07, 'sine', 0.03); },
  whisper: () => { noise(0.05, 3000, 2600, 0.02, 2); },
  littleTalk: () => { const f = 1100 + Math.random() * 300; tone(f, f * 1.15, 0.035, 'triangle', 0.025); },
  drumTap: () => { noise(0.05, 300, 180, 0.07, 1.5); },
  scrub: () => { noise(0.18, 3000, 5000, 0.04, 1.2); },
  splish: () => { noise(0.2, 1200, 600, 0.06, 1); },
  gurgle: () => { tone(90, 70, 0.4, 'sine', 0.04); setTimeout(() => tone(110, 80, 0.3, 'sine', 0.03), 220); noise(0.5, 300, 150, 0.03, 2); },
  chug: () => { noise(0.06, 600, 400, 0.025, 2); },
  lidCreak: () => { tone(140, 90, 0.7, 'sawtooth', 0.015); },
  dig: () => { noise(0.12, 500, 250, 0.06, 1); },
  ring: () => { tone(2400, 2380, 0.6, 'sine', 0.035); tone(3600, 3580, 0.4, 'sine', 0.02); },
  pipTalk: () => { const f = 380 + Math.random() * 60; tone(f, f * 1.05, 0.045, 'triangle', 0.028); },
  whistle: () => { tone(2300, 2250, 0.18, 'square', 0.012); setTimeout(() => tone(2300, 2200, 0.12, 'square', 0.01), 200); },
  rexTalk: () => { const f = 95 + Math.random() * 20; tone(f, f * 0.9, 0.12, 'triangle', 0.045); },
  rumble: () => { tone(70, 55, 0.35, 'sine', 0.05); noise(0.3, 200, 140, 0.02, 1); },
  lambTalk: () => { const f = 360 + Math.random() * 40; tone(f, f * 0.94, 0.08, 'sine', 0.03); },
  bell: () => { tone(3100, 3080, 0.35, 'sine', 0.02); },
  catTalk: () => { const f = 560 + Math.random() * 90; tone(f, f * 0.85, 0.06, 'triangle', 0.026); },
  mrrp: () => { tone(420, 700, 0.12, 'triangle', 0.035); setTimeout(() => tone(640, 520, 0.1, 'triangle', 0.025), 110); },
  blub: () => { const f = 260 + Math.random() * 60; tone(f, f * 0.7, 0.08, 'sine', 0.035); },
  trunk: () => { tone(160, 240, 0.25, 'sawtooth', 0.015); },
  eep: () => { const f = 1400 + Math.random() * 300; tone(f, f * 1.2, 0.03, 'triangle', 0.025); },
  ribbit: () => { tone(900, 1300, 0.06, 'square', 0.015); setTimeout(() => tone(1100, 1500, 0.05, 'square', 0.012), 70); },
});
Object.assign(VOICE, {
  nutcracker: { name: 'the nutcracker', col: '#e8806a', speed: 36, every: 3, blip: () => sfx.nutTalk(), noise: () => sfx.nutClack() },
  tock: { name: 'tock', col: '#c8d0dc', speed: 72, every: 2, blip: () => sfx.tockTalk(), noise: () => { sfx.tockTick(); setTimeout(() => sfx.tockTick(), 80); } },
  mole: { name: 'the mole', col: '#c8a0b4', speed: 26, every: 4, blip: () => sfx.moleTalk(), noise: () => sfx.moleSniff() },
  mabel: { name: 'mabel', col: '#f0a070', speed: 44, every: 3, blip: () => sfx.dollTalk(), noise: () => sfx.dollTalk() },
  clank: { name: 'clank', col: '#a8c8e0', speed: 50, every: 3, blip: () => sfx.robotTalk(), noise: () => { sfx.robotTalk(); setTimeout(() => sfx.robotTalk(), 90); } },
  oldkey: { name: 'old key', col: '#d8b070', speed: 28, every: 4, blip: () => sfx.oldTalk(), noise: () => { sfx.tockTick(); setTimeout(() => sfx.tockTick(), 160); } },
  peg: { name: 'peg', col: '#f0b0a0', speed: 54, every: 3, blip: () => sfx.pegTalk(), noise: () => sfx.scrub() },
  army: { name: 'army man', col: '#8ac070', speed: 44, every: 3, blip: () => sfx.armyTalk(), noise: () => sfx.armyTalk() },
  sarge: { name: 'sarge', col: '#a8d08a', speed: 40, every: 3, blip: () => sfx.armyTalk(), noise: () => sfx.thud() },
  jack: { name: 'jack', col: '#f08ac8', speed: 60, every: 2, blip: () => sfx.jackTalk(), noise: () => sfx.boing2() },
  ballerina: { name: 'the ballerina', col: '#f0c8de', speed: 30, every: 4, blip: () => sfx.tinkle(), noise: () => sfx.tinkle() },
  teddy: { name: 'teddy', col: '#d8a870', speed: 34, every: 3, blip: () => sfx.softTalk(), noise: () => sfx.softTalk() },
  bunny: { name: 'bun', col: '#e0e0ea', speed: 38, every: 3, blip: () => sfx.softTalk(), noise: () => sfx.softTalk() },
  dot: { name: 'dot', col: '#e87a6a', speed: 30, every: 4, blip: () => sfx.whisper(), noise: () => sfx.whisper() },
  duck: { name: 'a little one', col: '#f0d070', speed: 56, every: 2, blip: () => sfx.littleTalk(), noise: () => sfx.littleTalk() },
  sock: { name: 'a little one', col: '#8acede', speed: 56, every: 2, blip: () => sfx.littleTalk(), noise: () => sfx.littleTalk() },
  drummer: { name: 'the drummer', col: '#e87a6a', speed: 48, every: 3, blip: () => sfx.drumTap(), noise: () => { sfx.drumTap(); setTimeout(() => sfx.drumTap(), 120); } },
  penguin: { name: 'the penguin', col: '#c8c8d8', speed: 40, every: 3, blip: () => sfx.softTalk(), noise: () => sfx.softTalk() },
  pip: { name: 'pip', col: '#8aa8e8', speed: 50, every: 3, blip: () => sfx.pipTalk(), noise: () => sfx.whistle() },
  rex: { name: 'rex', col: '#8acc6a', speed: 28, every: 4, blip: () => sfx.rexTalk(), noise: () => sfx.rumble() },
  fleece: { name: 'fleece', col: '#e8e0d0', speed: 32, every: 3, blip: () => sfx.lambTalk(), noise: () => sfx.bell() },
  patches: { name: 'patches', col: '#e8a060', speed: 46, every: 3, blip: () => sfx.catTalk(), noise: () => sfx.mrrp() },
  inky: { name: 'inky', col: '#c49ade', speed: 38, every: 3, blip: () => sfx.blub(), noise: () => { sfx.blub(); setTimeout(() => sfx.blub(), 90); } },
  peanut: { name: 'peanut', col: '#aabccc', speed: 30, every: 4, blip: () => sfx.oldTalk(), noise: () => sfx.trunk() },
  inchy: { name: 'inchy', col: '#96d870', speed: 64, every: 2, blip: () => sfx.eep(), noise: () => sfx.eep() },
  lily: { name: 'lily', col: '#7cd070', speed: 50, every: 3, blip: () => sfx.littleTalk(), noise: () => sfx.ribbit() },
});

// ---------- how much the town trusts him ----------
const BOSS_FLAGS = ['soldierDown', 'sailboatDown', 'tangleDown', 'swanDown', 'topDown', 'marionetteDown', 'clownDown', 'yoyoDown', 'kiteDown'];
const SUPPLIES = [
  { id: 'battery', room: 'bins', x: 56.5 * 16, y: 30 * 16, to: 'clank', name: 'a battery', what: 'a battery, for the night lights' },
  { id: 'thread', room: 'drey', x: 8.5 * 16, y: 26 * 16, to: 'mabel', name: 'a spool of thread', what: 'thread, for mabel' },
  { id: 'soap', room: 'shallows', x: 5.5 * 16, y: 18 * 16, to: 'peg', name: 'a sliver of soap', what: 'soap, for the scrub' },
  { id: 'candles', room: 'partytent', x: 20.5 * 16, y: 32 * 16, to: 'mole', name: 'birthday candles', what: 'candles, for the wax' },
];
const given = id => !!world.flags['gave_' + id];
function trust() {
  if (!world.flags.warrenOpen) return 0;
  return 1 + BOSS_FLAGS.filter(f => world.flags[f]).length + SUPPLIES.filter(s => given(s.id)).length + (world.flags.moleHome ? 3 : 0);
}
const inWarren = () => room && room.def.region === 'warren';
let moleAway = false;
// ---------- who's where this time (10/15/2026) ----------
// every time he comes into the Warren from outside it's a new visit: a different lot asleep in the bunks (townsfolk
// with no names, never anyone he has to talk to: anyone with a shop or a job stays at it), and one of the
// five who keep getting Grime on them is in quarantine while the other four are about the town, better. They always
// end up back in there somehow
const PATIENTS = ['penguin', 'inky', 'peanut', 'inchy', 'lily'];
const SPOT_AT = { penguin: [4, -7], inky: [5, -4], peanut: [-11, -11], inchy: [8, -8], lily: [8, -4] };   // where the plaster is on each (from their feet, facing left)
// where they turn up when they're better (the same spots as patientspots in Rooms\warren.py, which keeps the ground flat
// under them): every room's here so it comes out the same whichever room he's in
const PATIENT_SPOTS = [['townsquare', 11.5 * 16, 31 * 16, 1], ['townsquare', 41.5 * 16, 31 * 16, -1], ['mendlane', 25 * 16, 18 * 16, 1], ['mendlane', 36.5 * 16, 18 * 16, -1],
  ['bunks', 4.5 * 16, 18 * 16, 1], ['moleshop', 28.5 * 16, 20 * 16, -1]];
const SLEEP_KINDS = ['bear', 'doll', 'robot', 'bunny', 'soldier', 'duck'];
function visitRng(salt) {                                // the same picks all visit long, new ones next visit
  let a = ((world.warrenVisit || 1) * 2654435761 + salt * 97) >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const sickNow = () => PATIENTS[(((world.warrenVisit || 1) - 1) * 3) % PATIENTS.length];   // a different one each visit, round all five
function patientsHere() {
  const out = [], d = room.def, sick = sickNow();
  if (d.sickbay) out.push({ kind: sick, x: d.sickbay.x, y: d.sickbay.y, f: d.sickbay.f, sick: true, patient: true });
  // the other four, spread round the town: every spot in the Warren in a shuffled order, the first four get one each
  const spots = PATIENT_SPOTS.map(sp => [...sp]);
  const rng = visitRng(7);
  for (let i = spots.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [spots[i], spots[j]] = [spots[j], spots[i]]; }
  PATIENTS.filter(k => k !== sick).forEach((k, i) => { const sp = spots[i]; if (sp && sp[0] === room.id) out.push({ kind: k, x: sp[1], y: sp[2], f: sp[3], patient: true }); });
  return out;
}
function sleepersHere() {
  const spots = room.def.bunkspots; if (!spots) return [];
  const rng = visitRng(11), kinds = [...SLEEP_KINDS];
  for (let i = kinds.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [kinds[i], kinds[j]] = [kinds[j], kinds[i]]; }
  const order = spots.map((s, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const n = 3 + Math.floor(rng() * (spots.length - 2));                                   // three to all six bunks taken
  const flips = order.slice(0, n).map(() => rng() < 0.5);
  if (flips.every(f => f === flips[0])) flips[Math.floor(rng() * n)] = !flips[0];       // always some head to the left and some to the right
  return order.slice(0, n).map((si, i) => ({ x: spots[si][0], y: spots[si][1], kind: kinds[i % kinds.length], bag: Math.floor(rng() * 5), flip: flips[i],
    flop: !!spots[si][2],                                                               // up on a bunk: the foot flops down over the front
    // nobody in step with anybody: each their own breathing, their own shifting about, their own z's
    breath: 2.6 + rng() * 2.4, phase: rng(), shiftIn: 3 + rng() * 10, shiftT: 0, zIn: 0.3 + rng() * 2, zEvery: 1.3 + rng() * 1.4, zSway: 0.8 + rng() * 1.6, zs: [] }));
}     // the mole's off his spot in the workshop (walking over to his hill, or down it)
const moleInShop = () => room && room.id === 'moleshop' && world.flags.moleHome && (room.def.npcs || []).find(n => n.kind === 'mole');
function npcVisible(n) {
  const t = trust();
  if (n.after && !world.flags[n.after]) return false;
  if (n.kind === 'mole') return !!world.flags.moleHome && !moleAway;
  if (['teddy', 'bunny', 'duck', 'sock'].includes(n.kind)) return t >= 3;
  if (n.kind === 'drummer') return t >= 5;
  if (n.kind === 'tock' && room.id === 'chest') return false;
  return true;
}
const npcsHere = () => [...(room.def.npcs || []), ...(room.patients || [])].filter(npcVisible);

// ---------- drawing what's there ----------
let lidAnim = null;       // the lid coming down: { t }
function warrenNpcFrame(n, now) {
  const k = n.kind === 'sarge' ? 'sarge' : n.kind;
  let fr = k + '_idle_' + (Math.floor(now * 2.2 + n.x * 0.01) % 5 === 4 ? 2 : 1);
  if (k === 'ballerina') fr = 'ballerina_' + ['idle_1', 'idle_2', 'turn', 'idle_2'][Math.floor(now * (world.flags.musicBoxFixed ? 1.6 : 0.9)) % 4];
  if (k === 'drummer' && !talk) fr = 'drummer_idle_' + (Math.floor(now * 3) % 2 + 1);
  if (k === 'dot' && !talk) fr = Math.floor(now * 0.3) % 3 ? 'dot_listen' : 'dot_idle_1';
  if (k === 'mabel' && !talk && Math.floor(now * 0.5) % 3 === 0) fr = 'mabel_sew';
  if (k === 'clank' && !talk && Math.floor(now * 0.6) % 3 === 0) fr = 'clank_tinker';
  if (k === 'oldkey' && !talk && Math.floor(now * 0.4) % 4 === 0) fr = 'oldkey_wind';
  if ((k === 'teddy' || k === 'bunny') && !talk && Math.floor(now * 0.35 + (k === 'bunny' ? 1.3 : 0)) % 4 === 0) fr = k + '_sip';
  if (k === 'mole' && !talk) fr = Math.floor(now * 0.5) % 4 === 0 ? 'mole_sniff' : fr;
  if (talk && talk.who === k && (!talk.npc || talk.npc === n)) fr = talk.n < talk.lines[talk.i].length ? k + '_talk_' + (Math.floor(now * 9) % 2 + 1) : k + '_idle_1';
  if (n.pose && n.pose.t > 0) fr = n.pose.frame;
  return fr;
}
function drawLid(k) {                                                                    // k: 0 shut, 1 open. It swings open toward us on its hinge (its left edge), like a door
  const L = room.def.lid; if (!L) return;
  const [im, meta] = sprSource('lid_up'); if (!im || !meta) return;
  const [sx, sy, w, h] = meta, phi = k * Math.PI * 0.56, c = Math.cos(phi);
  ctx.save(); ctx.translate(L.x, L.y + L.h - h + 1); ctx.scale(Math.abs(c) < 0.04 ? 0.04 * Math.sign(c || 1) : c, 1);
  if (c < 0) ctx.filter = 'brightness(0.7)';                                                // the inside of the lid, in its own shadow
  ctx.drawImage(im, sx, sy, w, h, 0, 0, w, h); ctx.restore(); ctx.filter = 'none';
}
function drawSign(s) {                                                                    // a torn off scrap of cardboard box, nailed up, written on in crayon
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace';
  const w = readWidth(s.text) + 12, h = 13, hash = k => { const v = Math.sin(s.x * 12.9898 + s.y * 78.233 + k * 37.719) * 43758.5453; return v - Math.floor(v); };
  ctx.save(); ctx.translate(Math.round(s.x), Math.round(s.y)); ctx.rotate((hash(0) - 0.5) * 0.07);
  const x = -Math.round(w / 2), y = -7, edge = [];
  for (let i = 0; i <= 6; i++) edge.push([x + w * i / 6, y + (hash(i + 1) - 0.5) * 2]);                            // the torn top
  for (let i = 0; i <= 3; i++) edge.push([x + w + (hash(i + 9) - 0.3) * 2, y + h * i / 3]);                         // the right side
  for (let i = 6; i >= 0; i--) edge.push([x + w * i / 6, y + h + (hash(i + 14) - 0.5) * 2]);                        // the bottom
  for (let i = 3; i >= 0; i--) edge.push([x - (hash(i + 22) - 0.3) * 2, y + h * i / 3]);
  const shape = (dx, dy) => { ctx.beginPath(); edge.forEach(([px, py], i) => i ? ctx.lineTo(px + dx, py + dy) : ctx.moveTo(px + dx, py + dy)); ctx.closePath(); };
  ctx.fillStyle = 'rgba(8,6,10,0.45)'; shape(1, 2); ctx.fill();                                                   // its shadow on the wall
  ctx.fillStyle = '#2a2030'; shape(0, 0); ctx.fill();
  ctx.save(); shape(0, 0); ctx.clip();
  ctx.fillStyle = '#a8865a'; ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
  ctx.fillStyle = '#b8966a'; ctx.fillRect(x + 1, y + 1, w - 2, h - 3);
  ctx.fillStyle = 'rgba(90,60,30,0.18)'; for (let xx = x + 3; xx < x + w; xx += 4) ctx.fillRect(xx, y, 1, h);    // the corrugation showing through
  ctx.fillStyle = '#8a6a42'; ctx.fillRect(x - 2, y + h - 2, w + 4, 3);
  ctx.restore();
  for (const nx of [x + 3, x + w - 4]) { ctx.fillStyle = '#2a2030'; ctx.fillRect(nx - 1, y + 1, 3, 3); ctx.fillStyle = '#a8a8b0'; ctx.fillRect(nx, y + 2, 1, 1); }   // nails
  readText(s.text, x + 6, y + 9, s.c);
  ctx.restore();
}
function drawMolehill(x, y) {                                                            // a mound of fresh crumbly earth pushed up out of the ground, the hole dark at its top
  groundShadow(x, y, 10, 26);
  ctx.fillStyle = '#2a2030'; ctx.beginPath(); ctx.ellipse(x, y + 1, 23, 14, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#4e3620'; ctx.beginPath(); ctx.ellipse(x, y + 1, 22, 13, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#6a4a2c'; ctx.beginPath(); ctx.ellipse(x - 4, y - 2, 15, 9, 0, Math.PI, 0); ctx.fill();          // the lit side
  const rnd = k => { const v = Math.sin(x * 3.1 + k * 17.7) * 9137.31; return v - Math.floor(v); };
  for (let i = 0; i < 26; i++) {
    const a = rnd(i) * Math.PI, rr = 0.35 + 0.6 * rnd(i + 50);
    ctx.fillStyle = ['#8a6640', '#3a2616', '#7a5634', '#2e1e10'][i % 4];
    ctx.fillRect(Math.round(x + Math.cos(a) * 20 * rr), Math.round(y - Math.sin(a) * 12 * rr), 2, 1);
  }
  for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#4e3620' : '#6a4a2c'; ctx.fillRect(Math.round(x - 32 + rnd(i + 90) * 64), y - 1, 2, 1); }   // crumbs kicked out round it
  ctx.fillStyle = '#140c06'; ctx.beginPath(); ctx.ellipse(x + 1, y - 11, 6, 2.5, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#2e1e12'; ctx.fillRect(x - 5, y - 13, 11, 1);
}
const _drawNpcW = drawNpc;
drawNpc = () => {
  _drawNpcW();
  const now = performance.now() / 1000, d = room.def;
  // the toy chest's lid: up as the door, or down flat as a bridge, or coming down
  if (d.lid) {
    const k = lidAnim ? Math.min(1, 1 - Math.pow(1 - lidAnim.t / 1.1, 2)) : world.flags.warrenOpen ? 1 : 0;
    drawLid(k);
  }
  if (HOLES[room.id] && HOLES[room.id].rope) {                                        // the toys' bootlace hanging down out of a hole, knotted to climb
    const h = HOLES[room.id], top = h.y - 8 * T, len = 70, sw = Math.sin(now * 1.3) * 2.5;
    for (let i = 0; i <= len; i += 2) {
      const k = i / len, x = Math.round(h.x + sw * k * k), y = top + i;
      ctx.fillStyle = '#2a2030'; ctx.fillRect(x - 2, y, 4, 2);
      ctx.fillStyle = i % 6 < 3 ? '#e8e0cc' : '#cfc6b0'; ctx.fillRect(x - 1, y, 2, 2);
      if (i % 16 === 14) { ctx.fillStyle = '#2a2030'; ctx.fillRect(x - 3, y - 1, 6, 4); ctx.fillStyle = '#e8e0cc'; ctx.fillRect(x - 2, y, 4, 2); }   // a knot
    }
    const ex = Math.round(h.x + sw), ey = top + len;
    ctx.fillStyle = '#2a2030'; ctx.fillRect(ex - 2, ey, 4, 6); ctx.fillStyle = '#9aa0b0'; ctx.fillRect(ex - 1, ey + 1, 2, 4);   // its plastic tip
  }
  if (room.id === 'listenpost' && world.flags.deepHatch) spr('hatch_shut', 40 * T + 2, 18 * T + 2, false, 0.85);   // the hatch, propped open
  for (const s of d.signs || []) drawSign(s);
  if (d.shutters && trust() < 3) for (const [x, y, w, h] of d.shutters) {                // shutters shut till the town warms up to him
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
    ctx.fillStyle = '#6a4a2a'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#4a321c'; for (let yy = y + 2; yy < y + h; yy += 3) ctx.fillRect(x, yy, w, 1);
  }
  if (d.molehill && world.flags.moleHome && room.id !== 'moleshop') drawMolehill(d.molehill.x, d.molehill.y);
  const ms = MOLE_STOPS[room.id];
  if (ms && world.flags.moleHome) drawMolehill(ms.x, ms.y);
  if (room.train) {                                                                   // the toy train going up and down the main tunnel
    const tr = room.train, f = tr.dir > 0;
    groundShadow(tr.x - tr.dir * 40, tr.y, 20, 18); groundShadow(tr.x, tr.y, 20, 18);
    spr('train_car', tr.x - tr.dir * 40, tr.y, f);
    spr('train_engine_' + (Math.floor(tr.x / 6) % 2 + 1), tr.x, tr.y, f);
  }
  const SHW = { nutcracker: 9, mole: 15, jack: 0, ballerina: 0, drummer: 0, teddy: 11, bunny: 10, penguin: 9, clank: 10, oldkey: 11, mabel: 10, tock: 8, dot: 10, duck: 8, sock: 6, pip: 7, rex: 16, fleece: 11, patches: 9, inky: 12, peanut: 13, inchy: 12, lily: 11 };
  for (const s of room.sleepers || []) {                                                // asleep in the bunks, tucked into socks
    const v = (1 - Math.cos((now / s.breath + s.phase) * Math.PI * 2)) / 2, f = Math.min(3, Math.floor(v * 4));   // breathing, in and out slow
    spr((s.flop ? 'sockflop_' : 'sockbag_') + s.bag + '_' + f, s.x, s.y, s.flip);
    const hx = s.x + (s.flip ? 13 : -13), sh = s.shiftT > 0;                           // now and then they shift in their sleep
    spr('sleephead_' + s.kind + (sh ? '_shift' : ''), hx + (sh ? (s.flip ? -1 : 1) : 0), s.y - 2 - (f >= 2 ? 1 : 0), s.flip);
    ctx.textAlign = 'center';
    for (const z of s.zs) {                                                             // z's drifting up off them, away from the bunk
      const p = z.age / z.life, away = s.flip ? 1 : -1;
      const zx = hx + away * (4 + p * 10) + Math.sin(z.age * 2.4 + z.seed) * s.zSway, zy = s.y - 16 - p * 20;
      ctx.font = '600 ' + Math.round(7 + p * 6) + 'px "Pixelify Sans", ui-monospace, monospace';
      ctx.globalAlpha = Math.min(1, p * 5, (1 - p) * 2.5) * 0.9;
      ctx.fillStyle = '#0e0f18'; ctx.fillText('z', zx + 1, zy + 1); ctx.fillStyle = '#cfe0ff'; ctx.fillText('z', zx, zy);
    }
    ctx.globalAlpha = 1; ctx.textAlign = 'left';
  }
  for (const [gx, gy] of d.guards || []) { groundShadow(gx, gy, 24, 7); spr('guard_idle_' + (Math.floor(now * 1.7 + gx * 0.031) % 6 === 5 ? 2 : 1), gx, gy, P.x > gx); }   // the Nutcracker's two tin soldiers, a step behind him
  for (const n of npcsHere()) { const w = SHW[n.kind] ?? 9; if (w) groundShadow(n.x, n.y, 30, w); spr(warrenNpcFrame(n, now), n.x, n.y, n.kind !== 'ballerina' && P.x > n.x); }   // a soft shadow under each, so they stand on the floor
  for (const n of npcsHere()) if (n.sick && SPOT_AT[n.kind]) { const fl = P.x > n.x, o = SPOT_AT[n.kind]; spr('grimespot', n.x + (fl ? -o[0] : o[0]), n.y + o[1], fl); }   // the spot they're watching
  if (room.escort) groundShadow(room.escort.x, room.escort.y, 30, 8);
  if (actors.tock && !actors.tock.hidden) groundShadow(actors.tock.x, actors.tock.y, 30, 8);
  if (actors.trapped && !actors.trapped.hidden) groundShadow(actors.trapped.x, actors.trapped.y, 30, 14);
  if (room.escort) spr(room.escort.moving ? 'army_walk_' + (Math.floor(now * 6) % 2 + 1) : 'army_idle_1', room.escort.x, room.escort.y, room.escort.f > 0);
  for (const s of SUPPLIES) if (s.room === room.id && !world.has['supply_' + s.id] && !given(s.id) && world.flags.boardRead) {
    spr('sup_' + s.id, s.x, s.y - 2 + Math.round(Math.sin(now * 2.2) * 1.5), false);
    if (Math.sin(now * 3 + s.x) > 0.97) twinkle(s.x, s.y - 14, 1);
  }
  if (room.tockKey && !world.has.tock_key) spr('tockkey', room.tockKey.x, room.tockKey.y + Math.round(Math.sin(now * 2.5)), false);
};

// ---------- the chest's lid and the deep hatch, shut; the cave-in in the deep tunnels ----------
const _drawGateLookW = typeof drawGateLook === 'function' ? drawGateLook : null;
drawGateLook = gt => {
  if (gt.look === 'lid') return;                                                       // drawn with the room's own things (it comes down)
  if (gt.look === 'hatch') { spr('hatch_shut', gt.x0 * T - 2, (gt.y0 + 1) * T, false); return; }
  if (_drawGateLookW) _drawGateLookW(gt);
};
const _drawBreaksW = drawBreaks;
drawBreaks = () => {
  const caves = room.breaks.filter(b => b.look === 'cavein' && !b.broken);
  for (const b of caves) b.broken = true;
  _drawBreaksW();
  for (const b of caves) {
    b.broken = false;
    const jx = b.shake > 0 ? Math.round((Math.random() * 2 - 1) * 2) : 0;
    const x0 = b.x0 * T + jx, y0 = b.y0 * T, w = (b.x1 - b.x0 + 1) * T, h = (b.y1 - b.y0 + 1) * T, hurt = b.hp0 - b.hp;
    ctx.fillStyle = '#2a2030'; ctx.beginPath(); ctx.moveTo(x0 - 6, y0 + h); ctx.lineTo(x0 + 2, y0 + 4); ctx.lineTo(x0 + w * 0.5, y0 - 2); ctx.lineTo(x0 + w + 2, y0 + 6); ctx.lineTo(x0 + w + 6, y0 + h); ctx.fill();
    ctx.fillStyle = '#4a3220'; ctx.beginPath(); ctx.moveTo(x0 - 4, y0 + h); ctx.lineTo(x0 + 3, y0 + 6); ctx.lineTo(x0 + w * 0.5, y0); ctx.lineTo(x0 + w, y0 + 8); ctx.lineTo(x0 + w + 4, y0 + h); ctx.fill();
    const rnd = k => { const s = Math.sin(k * 127.1 + b.x0 * 31.7) * 43758.5453; return s - Math.floor(s); };
    for (let k = 0; k < 26; k++) { ctx.fillStyle = ['#6a4a2e', '#3a2618', '#8a6640', '#2a1a10'][k % 4]; ctx.fillRect(Math.round(x0 + rnd(k) * w), Math.round(y0 + 6 + rnd(k + 40) * (h - 8)), 3, 2); }
    ctx.fillStyle = '#7a5a3a'; for (let k = 0; k < 3; k++) ctx.fillRect(Math.round(x0 + 2 + rnd(k + 90) * (w - 6)), Math.round(y0 + 10 + rnd(k + 80) * (h - 16)), 6, 4);   // clods
    ctx.fillStyle = '#1e122a'; for (let k = 0; k < 3; k++) { const gx = x0 + w * (0.2 + 0.3 * k), gy = y0 + 4 + rnd(k + 7) * 10; ctx.fillRect(Math.round(gx), Math.round(gy), 2, 8 + k * 4); }   // Grime seeping through it
    ctx.fillStyle = 'rgba(8,6,10,0.5)'; for (let k = 0; k < hurt * 2; k++) ctx.fillRect(Math.round(x0 + rnd(k + 60) * w), Math.round(y0 + rnd(k + 70) * h), 1, 6);
  }
};

// ---------- what he can use: everyone in the room, the hole in the oak, a molehill, Tock out in the park ----------
// the way in: the hollow at the foot of the oak, at the bottom of the fall (10/15/2026). It was a hole up into
// the oak at the roots with the toys' bootlace hanging out of it: give a spot rope: true to have the lace back somewhere
const HOLES = { oakfall: { x: 37 * 16, y: 106 * 16, w: 40 } };
const MOLE_STOPS = {                                                                     // molehills out in the park, once the mole's home
  undercroft: { x: 40.5 * 16, y: 22 * 16, name: 'under the oak, in rootwood' },
  heartwood: { x: 30.5 * 16, y: 36 * 16, name: 'inside the old oak' },
  grotto: { x: 8.5 * 16, y: 12 * 16, name: 'the grotto, at the pond' },
  fountain: { x: 6.5 * 16, y: 24 * 16, name: 'under the fountain, at the playground' },
};
function moleStopHere() {
  if (room.def.molehill) return { x: room.def.molehill.x, y: room.def.molehill.y, name: room.def.molehill.name };
  return MOLE_STOPS[room.id] || null;
}
const _nearbyW = nearby;
nearby = () => {
  if (room && room.def.npcs) {
    let best = null, bd = 1e9;
    for (const n of npcsHere()) {
      const dx = Math.abs(P.x - n.x), dy = Math.abs(P.y - n.y);
      if (dx < 40 && dy < 44 && dx < bd) { best = n; bd = dx; }
    }
    if (best) return { kind: 'npc', npc: best };
  }
  const n = _nearbyW();
  if (n) return n;
  const h = HOLES[room.id];
  if (h && Math.abs(P.x - h.x) < (h.w || 16) && Math.abs(P.y - h.y) < 12) return { kind: 'hole', label: '{up}: go in' };
  const ms = moleStopHere();
  if (ms && world.flags.moleHome && Math.abs(P.x - ms.x) < 26 && Math.abs(P.y - ms.y) < 16) return { kind: 'molehill', label: '{up}: knock' };
  if (room.tock && room.tock.need && Math.abs(P.x - room.tock.x) < 44 && Math.abs(P.y - room.tock.y) < 30) return { kind: 'tockhelp', label: room.tock.n === 3 ? (world.has.tock_key ? '{up}: wind him up' : '{up}: look') : '{up}: help' };
  return null;
};
const _interactW = interact;
interact = () => {
  const n = nearby();
  if (n && !scene) {
    if (n.kind === 'npc' && n.npc && WSCENES[n.npc.kind]) { P.vx = 0; const sc = WSCENES[n.npc.kind](n.npc); if (sc) playScene(sc); return true; }
    if (n.kind === 'hole') { P.vx = 0; const h = HOLES[room.id]; playScene(h.rope ? [walkTo(h.x), pose('look_up', 0.45), pose('grab', 0.3), run(() => { sfx.rustle(0.6); goTo('chest', 'hole'); }), pose('climb', 1)]
      : [walkTo(h.x), run(() => { sfx.rustle(0.5); goTo('chest', 'hole'); })]); return true; }   // the hollow: he walks into the dark
    if (n.kind === 'molehill') { P.vx = 0; playScene(SCENES.molehill()); return true; }
    if (n.kind === 'tockhelp') { P.vx = 0; playScene(room.tock.n === 3 ? SCENES.tockKey() : SCENES.tockStuck()); return true; }
  }
  return _interactW();
};
const _drawPromptW = drawPrompt;
drawPrompt = (px, py, camX, camY) => {
  const n = nearby();
  if (!n || !n.label) return _drawPromptW(px, py, camX, camY);
  const text = fmtKeys(n.label), x = Math.round(px - camX), y = Math.round(py - camY - 52);
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace'; ctx.textAlign = 'center';
  const w = Math.ceil(ctx.measureText(text).width) + 10;
  ctx.fillStyle = 'rgba(20,16,30,0.35)'; ctx.fillRect(x - w / 2 + 1, y + 1, w, 12);
  ctx.fillStyle = '#fbf7ec'; ctx.fillRect(x - w / 2, y, w, 12); ctx.fillStyle = '#4a4258'; ctx.fillText(text, x, y + 9); ctx.textAlign = 'left';
};

// ---------- setting a room up as he comes in ----------
let holeArrive = false;
const _goToW = goTo;
goTo = (id, door) => { if (HOLES[id] && door === 'warren') holeArrive = true; _goToW(id, door); };
const TOCK_SPOTS = {                                                                     // where he runs into Tock out in the park: whichever he gets to first is the first time
  litterpath: { x: 25.5 * 16, y: 18 * 16, caps: [23.6, 27.6, 29.2], key: { x: 33.5 * 16, y: 18 * 16 } },     // down in the dip between the two humps
  dock: { x: 40.5 * 16, y: 24 * 16, caps: [37, 44, 46.5], key: { x: 47.5 * 16, y: 24 * 16 } },
  bins: { x: 23.5 * 16, y: 29 * 16, caps: [18.5, 27, 28.6], key: { x: 36.5 * 16, y: 29 * 16 } },              // up on the step by the bins
};
function addFoe(kind, x, y, tag) {
  const k = FOE[kind]; if (!k) return null;
  const f = { room: room.def.id, i: 900 + foes.length, kind, x, y, x0: x, y0: y, f: -1, hp: foeHP(k), state: 'walk', t: 0, cd: 1.2 + Math.random(), flash: 0, vel: 0, yoff: 0, vy: 0, hb: null, hitP: false, range: patrol(x, y), tag };
  f.moves = movesFor(kind);
  if (k.setup) k.setup(f);
  foes.push(f); return f;
}
function setupWarrenRoom() {
  const d = room.def;
  room.train = null; room.escort = null; room.tock = null; room.tockKey = null; lidAnim = null;
  for (const n of d.npcs || []) n.pose = null;
  if (inWarren() && world.lastRegion !== 'warren') { world.warrenVisit = (world.warrenVisit || 0) + 1; saveWorld(); }   // in from outside: a new visit
  if (world.lastRegion !== d.region) { world.lastRegion = d.region; saveWorld(); }
  room.patients = inWarren() ? patientsHere() : null;
  room.sleepers = inWarren() ? sleepersHere() : null;
  if (!inWarren() && world.warrenClean && !HOLES[room.id]) { world.warrenClean = false; saveWorld(); }   // out in the park again: he'll want scrubbing next time
  if (holeArrive && HOLES[room.id]) { holeArrive = false; const h = HOLES[room.id]; placePlayer(h.x, h.y, 1); world.warrenClean = false; saveWorld(); cam.snap = true; updateCam(0); }
  // lights: once the battery's in, the night lights are brighter and the Warren's less dark
  if (inWarren() && d.shade) { d._shadeA = d._shadeA ?? d.shade.a; d.shade.a = d._shadeA * (given('battery') ? 0.78 : 1); }
  if (d.train) room.train = { x: (d.train.x0 + d.train.x1) / 2, y: d.train.y, dir: 1, wait: 0, x0: d.train.x0, x1: d.train.x1, chug: 0 };
  if (inWarren() && !['chest', 'deepdig'].includes(room.id) && trust() < 4 && world.flags.warrenOpen) room.escort = { x: P.x - 50, y: P.y, f: 1, moving: false };
  // Tock, out in the park
  const sp = TOCK_SPOTS[room.id];
  world.tockSpots = world.tockSpots || {};
  if (sp && !world.tockSpots[room.id] && (world.tockMet || 0) < 3 && world.has.gear) {
    const n = (world.tockMet || 0) + 1;
    room.tock = { n, x: sp.x, y: sp.y, need: n !== 1 };
    addActor('tock', { kind: 'rw', x: sp.x, y: sp.y, frame: n === 1 ? 'tock_cower' : n === 2 ? 'tock_tangled' : 'tock_rundown', layer: 'back', flip: false });
    if (n === 1) {
      room.tock.state = 'cornered';
      for (const cx of sp.caps) addFoe('cap', cx * T, sp.y, 'tock');
    }
    if (n === 3) room.tockKey = { x: sp.key.x, y: sp.key.y };
  }
  // Tock waiting for him at the chest, after the third time
  if (room.id === 'chest' && (world.tockMet || 0) >= 3 && !world.flags.warrenOpen) addActor('tock', { kind: 'rw', x: 17.5 * T, y: 22 * T, frame: 'tock_idle_1', layer: 'back', flip: true });
  // the mole stuck in the cave-in, deep down
  if (room.id === 'deepdig' && !world.flags.moleHome && d.trapped) addActor('trapped', { kind: 'rw', x: d.trapped.x, y: d.trapped.y, frame: 'mole_stuck', layer: 'back', flip: true });
  // a molehill he's been to (the mole remembers it)
  moleAway = false;
  const ms = moleStopHere();
  if (ms && world.flags.moleHome) { world.moleStops = world.moleStops || {}; if (!world.moleStops[room.id]) { world.moleStops[room.id] = true; saveWorld(); } }
  if (world.moleIn && world.moleIn === room.id && ms) { world.moleIn = null; saveWorld(); playScene(SCENES.moleArrive(ms)); }
}
const _setupPondRoomW = setupPondRoom;
setupPondRoom = () => { _setupPondRoomW(); setupWarrenRoom(); };

// ---------- every step: the scrub at the gate, the train, the escort, Tock's trouble, things to pick up ----------
let warrenTick = 0;
const _checkEventsW = checkEvents;
checkEvents = dt => {
  _checkEventsW(dt);
  warrenTick += dt;
  const d = room.def;
  // walking down to the lid: the Nutcracker turns him away, or Tock vouches for him
  if (room.id === 'chest' && !world.flags.warrenOpen && !room.gateDone && !scene && !P.story && P.ground && P.x > 13 * T) { room.gateDone = true; const sc = gateScene(); if (sc) playScene(sc); }
  // walking into the chest: the squeeze and the scrub, every time he's come in from outside
  if (d.scrub && world.flags.warrenOpen && !world.warrenClean && !scene && !P.story && P.x > d.scrub.l && P.x < d.scrub.r && P.y > d.scrub.t && P.y <= d.scrub.b + 1) playScene(SCENES.scrub());
  if (lidAnim) { lidAnim.t += dt; if (lidAnim.t >= 1.1) { lidAnim = null; sfx.thud(); puff(room.def.lid.x - 6, room.def.lid.y + room.def.lid.h, 8, 40); } }
  // the train
  const tr = room.train;
  if (tr) {
    if (tr.wait > 0) tr.wait -= dt;
    else {
      tr.x += tr.dir * 34 * dt;
      if (tr.x > tr.x1 - 24 || tr.x < tr.x0 + 64) { tr.dir = -tr.dir; tr.wait = 2.2; tr.x = Math.max(tr.x0 + 64, Math.min(tr.x1 - 24, tr.x)); }
      tr.chug -= dt; if (tr.chug <= 0 && Math.abs(P.x - tr.x) < 260) { tr.chug = 0.35; sfx.chug(); }
    }
  }
  // the army man keeping an eye on him
  const es = room.escort;
  if (es) {
    if (trust() >= 4) room.escort = null;
    else {
      if (P.ground && !P.story) es.gy = P.y;
      const want = P.x - P.facing * 46, dx = want - es.x;
      es.moving = Math.abs(dx) > 6;
      if (es.moving) { es.x += Math.sign(dx) * Math.min(Math.abs(dx), (Math.abs(dx) > 140 ? 260 : 120) * dt); es.f = Math.sign(dx); }
      else es.f = P.x > es.x ? 1 : -1;
      if (es.gy !== undefined) es.y = es.gy;
    }
  }
  // Tock cornered by litter: once they're all down, he looks at Phill and bolts
  const tk = room.tock;
  if (tk && tk.state === 'cornered' && !scene && !foes.some(f => f.tag === 'tock' && f.hp > 0 && f.state !== 'down')) { tk.state = 'done'; playScene(SCENES.tockBolt()); }
  // his key, lying about
  if (room.tockKey && !world.has.tock_key && Math.abs(P.x - room.tockKey.x) < 14 && Math.abs(P.y - room.tockKey.y) < 24) {
    world.has.tock_key = true; saveWorld(); sfx.pickup(); twinkle(room.tockKey.x, room.tockKey.y - 8, 8);
    popup(P.x, P.y - 54, "a little winding key. tock's, it has to be", '#e8e6f0', true);
  }
  // things the town needs, lying out in the park
  for (const s of SUPPLIES) if (s.room === room.id && world.flags.boardRead && !world.has['supply_' + s.id] && !given(s.id) && Math.abs(P.x - s.x) < 14 && Math.abs(P.y - s.y) < 24) {
    world.has['supply_' + s.id] = true; saveWorld(); sfx.pickup(); twinkle(s.x, s.y - 10, 10);
    popup(P.x, P.y - 54, s.name + '. the warren needs this', '#e8e6f0', true);
  }
  // the bunks: everyone asleep. The walled up tunnel: something on the other side of it
  for (const s of room.sleepers || []) {                                                // each sleeper on their own clock
    for (const z of s.zs) z.age += dt;
    s.zs = s.zs.filter(z => z.age < z.life);
    if ((s.zIn -= dt) <= 0) { s.zIn = s.zEvery * (0.7 + Math.random() * 0.6); s.zs.push({ age: 0, life: 1.8 + Math.random() * 0.8, seed: Math.random() * 6 }); }
    if (s.shiftT > 0) s.shiftT -= dt;
    else if ((s.shiftIn -= dt) <= 0) { s.shiftT = 1 + Math.random() * 1.6; s.shiftIn = 6 + Math.random() * 12; }
  }
  if (room.id === 'listenpost' && P.x < 14 * T && Math.floor(warrenTick / 5.5) !== Math.floor((warrenTick - dt) / 5.5)) sfx.gurgle();
  for (const n of d.npcs || []) if (n.pose) { n.pose.t -= dt; if (n.pose.t <= 0) n.pose = null; }
};

// ---------- buttons, picked up ----------
const _takeItemW = takeItem;
takeItem = it => {
  if (it.kind === 'button') { world.has[it.id] = true; saveWorld(); it.got = 2; gainCoin('buttons', 1); twinkle(it.x, it.y - 6, 4, COIN_COL.buttons); return; }
  _takeItemW(it);
};

// ---------- little scene helpers ----------
const WSCENES = {};
const npcAt = kind => (room.def.npcs || []).find(n => n.kind === kind);
const npcPoseW = (kind, frame, t) => run(() => { const n = npcAt(kind); if (n) n.pose = { frame, t }; });
const sayN = (n, ...lines) => t => { if (t === 0) { startTalk(n.kind, lines, { npc: n }); } return !talk; };
const walkUp = n => [walkTo(n.x + (P.x < n.x ? -2.6 : 2.6) * T), faceTo(n.x)];
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
// a little shop: pick something, pay in buttons
function buttonShop(n, who, items, after) {
  let picked = -1;
  return [
    ask(who, `You've got ${world.buttons || 0} buttons.`, [...items.map(s => `${s.what} (${s.cost} buttons)`), 'nothing, thanks'], i => { picked = i; }),
    t => {
      if (t > 0) return true;
      const s = items[picked];
      if (!s) return true;
      if ((world.buttons || 0) < s.cost) { scene.steps.splice(scene.i + 1, 0, sayN(n, s.short || "That's not enough buttons.")); return true; }
      // what it buys is saved with the buttons it costs (the save audit, 10/17/2026), so a reload in the middle of the
      // talk after can't keep one without the other. buy() is only the talk and the show
      world.buttons -= s.cost; if (s.grant) s.grant(); sfx.paper(); saveWorld();
      scene.steps.splice(scene.i + 1, 0, ...s.buy());
      return true;
    },
  ];
}
function giveButtons(k, x, y) { gainCoin('buttons', k); popup(P.x, P.y - 54, `+${k} buttons`, COIN_COL.buttons); twinkle(x, y - 20, 8, COIN_COL.buttons); }
function deliverSteps(n, id, lines, effect) {
  return [
    run(() => { world.flags['gave_' + id] = true; delete world.has['supply_' + id]; saveWorld(); sfx.pickup(); popup(P.x, P.y - 54, 'gave ' + SUPPLIES.find(s => s.id === id).name + ' away', '#e8e6f0'); }),
    pose('reach', 0.3), pose(null),
    sayN(n, ...lines),
    run(() => { giveButtons(8, n.x, n.y); if (effect) effect(); }),
  ];
}

// ---------- the gate ----------
SCENES.warrenGate = () => null;                                                         // played from checkEvents instead, once he's walked down to the lid
function gateScene() {
  if (world.flags.warrenOpen) return null;
  const nut = npcAt('nutcracker'), jk = npcAt('jack');
  if ((world.tockMet || 0) >= 3 && actors.tock) return SCENES.vouch();
  if (world.flags.gateTurnedAway) return null;
  return [
    bars(true), run(() => { P.vx = 0; }),
    run(() => { if (jk) jk.pose = { frame: 'jack_pop', t: 1.0 }; sfx.boing2(); }), camTo(jk.x, jk.y - 30, 0.5),
    sayN(jk, 'SOMEBODY COMING! Somebody coming down the hole!'),
    camTo(nut.x, nut.y - 40, 0.6), run(() => { nut.pose = { frame: 'nutcracker_clack', t: 0.5 }; sfx.nutClack(); }),
    sayN(nut, 'Halt.', 'Who goes there? *clack*'),
    camBack(), walkTo(nut.x - 5 * T), faceTo(nut.x), wait(0.3),
    sayN(nut, "A stuffed one. Green. Never seen you before, and I've seen everyone.", 'Strangers stay out. That is the rule. It is the only rule that has kept us here.'),
    ...shakeNo(),
    sayN(nut, "No. I don't care how soft you look. The last stranger I let in was soft too, and full of Grime.", 'Turn back the way you came. *clack*'),
    run(() => { world.flags.gateTurnedAway = true; saveWorld(); }), bars(false),
    run(() => room.hints.push({ text: "somebody in there would have to vouch for him", l: 0, t: 0, r: 24 * T, b: room.pxH, x: 14 * T, y: 13 * T, a: 0, until: 'warrenOpen' })),
  ];
};
SCENES.vouch = () => {
  const nut = npcAt('nutcracker'), tk = () => actors.tock;
  return [
    bars(true), run(() => { P.vx = 0; }),
    run(() => { tk().frame = 'tock_idle_1'; tk().flip = true; sfx.tockTick(); }),
    say('tock', "There you are! I've been waiting ages. Well not ages. A while. Come on, come on."),
    walkTo(tk().x - 2.5 * T), faceTo(nut.x),
    run(() => { const a = tk(); a.anim = ['tock_run_1', 'tock_run_2']; a.fps = 10; a.flip = true; }), moveActor('tock', nut.x - 1.6 * T, 22 * T, 0.5, { linear: true }),
    run(() => { const a = tk(); a.anim = null; a.frame = 'tock_talk_1'; a.flip = true; }),
    say('tock', "He's alright. He's alright! He got me away from the bottle caps, and he got me out of a tangle, and when I'd run all the way down he found my key and he wound me up. He wound me up!"),
    run(() => { nut.pose = { frame: 'nutcracker_clack', t: 0.5 }; sfx.nutClack(); }),
    sayN(nut, "You're vouching for him. You, personally."),
    say('tock', 'I am. I-I am. Yes.'),
    wait(0.5), sayN(nut, '...', 'One wrong move in there and you go back up that hole, and you never come down it again. Understood?'),
    ...nod(),
    run(() => { nut.pose = { frame: 'nutcracker_salute', t: 1.2 }; sfx.lidCreak(); lidAnim = { t: 0 }; }), wait(1.1),
    run(() => { world.flags.warrenOpen = true; saveWorld(); applyGates(room); popup(P.x, P.y - 54, 'the lid swings open', '#ffd36b', true); sfx.idea(); }),
    say('tock', "See you in the square! Get scrubbed first. Peg'll insist. Peg always insists."),
    run(() => { const a = tk(); a.anim = ['tock_run_1', 'tock_run_2']; a.fps = 10; a.flip = true; }), moveActor('tock', 37 * T, 22 * T, 1.0, { linear: true }), run(() => { tk().hidden = true; }),
    bars(false),
  ];
};
WSCENES.nutcracker = n => {
  const steps = walkUp(n);
  if (!world.flags.warrenOpen) {
    const m = world.tockMet || 0;
    steps.push(sayN(n, ...(m === 0 ? ['Strangers stay out. *clack*', "Somebody in there would have to vouch for you. Nobody in there knows you."]
      : m === 1 ? ["Tock came back the other day talking about a soft green thing that knocked three bottle caps flat.", 'Talking about. Not vouching for. Stay out.']
      : ["Tock's been on about you again. Twice now.", "Twice isn't vouching. *clack* Stay out."])));
    return steps;
  }
  if (!world.flags.metNutInside) { world.flags.metNutInside = true; saveWorld(); steps.push(sayN(n, "You're in. Tock vouched. I'm watching you all the same.", "Out through the hole, back through the scrub. Every time. That's how we keep the Grime out.")); return steps; }
  steps.push(sayN(n, ...pick([["*clack* Nothing gets past this lid. Nothing."], ["I used to crack walnuts. Now I crack heads. Grimy ones."], ['The lookout sees them coming. I stop them coming.'], ["You smell of soap. Good."], [trust() >= 6 ? "Word is you've been a help. I'll allow it. *clack*" : 'Mind yourself in there.']])));
  return steps;
};
WSCENES.jack = n => [...walkUp(n), run(() => { n.pose = { frame: 'jack_pop', t: 0.6 }; sfx.boing2(); }),
  sayN(n, ...(!world.flags.warrenOpen ? ['I SEE YOU. I see you down there! Stay where I can see you!'] : pick([["I watch the hole. All day. All night. Somebody has to and it's me, it's always me!"], ['Anything comes down that hole, I shout. That is my whole job. I am very good at it.'], ["Don't sneak up on me! I've only got the one spring!"]])))];

// ---------- the squeeze and the scrub ----------
const SCRUB_LINES = [["Arms up. Other arm. Behind the ears. Oh, you don't have ears. Behind the... there."], ['Hold still. Every time, I know. Hold still.'], ["You've been rolling in something. Don't tell me what."], ["There. Clean as a whistle. Cleaner. Whistles are filthy."], ['Next time wipe your feet first and I won\'t have to be so thorough.']];
SCENES.scrub = () => {
  const d = room.def, nut = npcAt('nutcracker'), pg = npcAt('peg'), first = !world.flags.scrubbedOnce;
  const steps = [bars(true), run(() => { P.vx = 0; })];
  if (first) steps.push(
    face(-1), sayN(nut, 'Not so fast. *clack* Arms out.'),
    run(() => { nut.pose = { frame: 'nutcracker_squeeze', t: 1.4 }; sfx.squeak(); }), pose('squeeze', 0.5), run(() => sfx.squeak()), pose('squeeze', 0.5), pose(null),
    sayN(nut, "A toy with Grime in it oozes when it's squeezed. You didn't ooze.", 'Peg. One for you.'),
  );
  else steps.push(face(-1), run(() => { nut.pose = { frame: 'nutcracker_squeeze', t: 0.8 }; sfx.squeak(); }), pose('squeeze', 0.35), pose(null), run(() => popup(P.x, P.y - 50, 'squeezed. no ooze', '#cfd6e6')));
  steps.push(walkTo(d.scrub.x - 8), face(1));
  if (first) steps.push(sayN(pg, "Oh, look at the state of you. Come here. Into the cap.", 'Everybody gets scrubbed. Everybody, every time, no matter who vouched for them. Grime hates soap.'));
  steps.push(
    run(() => { pg.pose = { frame: 'peg_scrub_1', t: 0.2 }; }),
    t => {                                                                                  // scrubbing
      if (Math.floor(t / 0.2) !== Math.floor((t - STEP) / 0.2)) { pg.pose = { frame: 'peg_scrub_' + (Math.floor(t / 0.2) % 2 + 1), t: 0.25 }; sfx.scrub(); for (let i = 0; i < 5; i++) part(P.x + (Math.random() * 2 - 1) * 14, P.y - 6 - Math.random() * 30, (Math.random() * 2 - 1) * 30, -20 - Math.random() * 30, 0.8, i % 2 ? '#e8f4ff' : '#c8e4f4', 2, -10); }
      P.story = { kind: 'scene', frame: Math.floor(t / 0.25) % 2 ? 'look_down' : 'idle_1', t };
      return t >= (first ? 2.0 : 1.3);
    },
    run(() => { sfx.splish(); puff(P.x, P.y - 10, 12, 40, '#e8f4ff', 30); }),
    pose('shake_1', 0.12), pose('shake_2', 0.12), pose('shake_1', 0.12), pose('shake_2', 0.12), pose(null),
    sayN(pg, ...(first ? ["That'll do. Off you go. Tock's waiting for you in the square, through the hole in the back of the chest."] : given('soap') ? pick([["New soap! Doesn't it smell nice. Off you go."], ['Fresh soap and a clean toy. Nothing better.']]) : pick(SCRUB_LINES))),
    run(() => { world.warrenClean = true; world.flags.scrubbedOnce = true; saveWorld(); if (!first) popup(P.x, P.y - 54, 'scrubbed', '#c8e4f4'); }),
    bars(false),
  );
  return steps;
};
WSCENES.peg = n => {
  const steps = walkUp(n);
  if (world.has.supply_soap && !given('soap')) return [...steps, sayN(n, 'Is that... is that soap? A whole new bit?'), ...deliverSteps(n, 'soap', ["Oh, I've been scraping the last of the old one for weeks. Thank you, dear. Thank you.", "Have a button. Have two. No, one, I'm saving the other."])];
  steps.push(sayN(n, ...pick(given('soap') ? [["Still got lots of the new soap. Don't go wasting it by staying clean."], ['Toothbrush, soap, a cap of water. That\'s all it takes to keep the Grime out.']] : [["The soap's nearly gone. Down to a sliver of a sliver. If you see any up there, bring it."], ['Grime hates soap. It just slides off, nobody knows why. I don\'t ask.'], ["I scrub everybody. The Nutcracker too, and he hates it worse than you."]])));
  return steps;
};

// ---------- Tock, out in the park ----------
SCENES.tockBolt = () => {
  const tk = () => actors.tock, sp = room.tock;
  return [
    bars(true), run(() => { P.vx = 0; }), faceTo(sp.x), wait(0.3),
    run(() => { const a = tk(); a.frame = 'tock_idle_1'; a.flip = P.x > a.x; sfx.tockTick(); }), wait(0.6),
    run(() => popup(sp.x, sp.y - 30, '!', '#ffd36b', true)),
    run(() => { const a = tk(); a.anim = ['tock_run_1', 'tock_run_2']; a.fps = 12; a.flip = true; }),
    moveActor('tock', sp.x + 360, sp.y, 1.2, { linear: true }), run(() => { tk().hidden = true; }),
    run(() => { world.tockMet = 1; world.tockSpots[room.id] = true; saveWorld(); popup(P.x, P.y - 54, "a little wind-up mouse. it didn't even say thanks", '#cfd6e6', true); }),
    bars(false),
  ];
};
SCENES.tockStuck = () => {
  const tk = () => actors.tock, sp = room.tock;
  return [
    bars(true), walkTo(sp.x - 2.4 * T), faceTo(sp.x),
    say('tock', ...((world.tockMet || 0) >= 1 ? ["Oh. Oh it's you. The bottle cap one.", "I'm stuck. Don't laugh. I'm not stuck, I'm just. Stuck."] : ["Don't hurt me! I'm stuck. I'm only stuck."])),
    pose('reach', 0.3), run(() => { sfx.twang(); for (let i = 0; i < 10; i++) part(sp.x + (Math.random() * 2 - 1) * 10, sp.y - 8, (Math.random() * 2 - 1) * 60, -Math.random() * 60, 0.7, '#dce6dc', 1, 120); }),
    pose('reach', 0.3), run(() => { sfx.twang(); tk().frame = 'tock_idle_1'; tk().flip = P.x > sp.x; }), pose(null), wait(0.3),
    say('tock', "...Thanks.", "I'm Tock. I go out for parts, for... for where I live. I can't say where. I'm not supposed to talk to anybody up here.", 'Thanks though. *tk tk*'),
    run(() => { const a = tk(); a.anim = ['tock_run_1', 'tock_run_2']; a.fps = 12; a.flip = true; }),
    moveActor('tock', sp.x + 360, sp.y, 1.2, { linear: true }), run(() => { tk().hidden = true; }),
    run(() => { world.tockMet = 2; world.tockSpots[room.id] = true; room.tock = null; saveWorld(); }),
    bars(false),
  ];
};
SCENES.tockKey = () => {
  const tk = () => actors.tock, sp = room.tock;
  if (!world.has.tock_key) return [walkTo(sp.x - 2.4 * T), faceTo(sp.x), say('tock', "...my... key... it fell out... somewhere... I can't..."), run(() => popup(P.x, P.y - 54, 'he needs his key', '#cfd6e6'))];
  return [
    bars(true), walkTo(sp.x - 2 * T), faceTo(sp.x),
    pose('reach', 0.3), run(() => { delete world.has.tock_key; tk().frame = 'tock_idle_2'; sfx.click(); }),
    t => { if (Math.floor(t / 0.18) !== Math.floor((t - STEP) / 0.18)) sfx.tockTick(); P.story = { kind: 'scene', frame: Math.floor(t / 0.18) % 2 ? 'reach' : 'idle_1', t }; return t >= 1.4; },
    pose(null), run(() => { const a = tk(); a.frame = 'tock_idle_1'; a.flip = P.x > sp.x; sfx.boing2(); puff(sp.x, sp.y - 4, 6, 30); }),
    say('tock', '*tk tk tk* Oh! Oh, that\'s better. That\'s so much better.', "You wound me up. Nobody up here's ever... You keep turning up. Every time I'm in trouble, there you are.",
      "Listen. Where I live, they don't let strangers in. But you're not a stranger anymore. Not to me.",
      "The old oak. Right at the bottom of it there's a big hollow in the trunk. Go in there. I'll meet you at the gate and I'll put in a word. I'll put in all the words."),
    run(() => { const a = tk(); a.anim = ['tock_run_1', 'tock_run_2']; a.fps = 12; a.flip = true; }),
    moveActor('tock', sp.x + 360, sp.y, 1.2, { linear: true }), run(() => { tk().hidden = true; }),
    run(() => { world.tockMet = 3; world.tockSpots[room.id] = true; room.tock = null; room.tockKey = null; saveWorld(); popup(P.x, P.y - 54, 'the hollow at the bottom of the oak', '#ffd36b', true); sfx.idea(); }),
    bars(false),
  ];
};

// ---------- Tock in the square: the pink crayon, the noticeboard, what he knows ----------
const TOCK_TOLD = [
  { id: 'battery', cost: 4, line: "The bins up at the playground. Kids throw batteries in there, half full, can you believe it. Right at the far end.", mark: { room: 'bins', x: 56.5 * 16, y: 30 * 16 } },
  { id: 'thread', cost: 5, line: "There's a squirrel's drey way up in the oak's twigs, all lined with thread. A whole spool fell in there, I saw it go.", mark: { room: 'drey', x: 8.5 * 16, y: 26 * 16 } },
  { id: 'soap', cost: 4, line: "Somebody dropped soap at the pond. In the shallows, right up the left end, on the bank. It's going all soft.", mark: { room: 'shallows', x: 5.5 * 16, y: 18 * 16 } },
  { id: 'candles', cost: 6, line: "Birthday candles! In the party tent at the playground, on the floor. Nobody's having a party anymore.", mark: { room: 'partytent', x: 20.5 * 16, y: 32 * 16 } },
];
WSCENES.tock = n => {
  const steps = walkUp(n);
  if (!world.has.crayon_warren) {
    steps.push(sayN(n, 'You made it! Did Peg get behind your ears? She always gets behind your ears.',
      "Oh! Wait. Wait wait wait. I found this. Out in a puddle, before I ever met you. It smelled like you. It's yours, isn't it?"),
      pose('reach', 0.3), run(() => { world.has.crayon_warren = true; saveWorld(); sfx.pickup(); popup(P.x, P.y - 54, 'the pink crayon', '#e87aa8', true); setTimeout(() => sfx.idea(), 200); }), pose(null), ...nod(),
      sayN(n, "This is the Warren. We dug it. Well, the mole dug it, mostly. We helped. We carried dirt.",
        "Everybody's scared of you. Don't take it personal, they're scared of everybody.",
        "That's my noticeboard. It's what the town needs. Batteries, thread, soap, candles. If you find any up there, bring them to whoever needs them and they'll warm up to you, I promise.",
        'I can tell you where to look, for a few buttons. Everything costs buttons down here. Sorry.'),
      run(() => { world.flags.boardRead = true; saveWorld(); }));
    return steps;
  }
  steps.push(sayN(n, ...pick([["Everybody's talking about you. Good talking. Mostly."], ["*tk tk* I'm going out for parts later. Don't tell the Nutcracker."], ["The mole digs, Clank fixes, Mabel mends, Peg scrubs. I fetch. That's me."], [trust() < 4 ? "Give them time. They'll come out of their houses. They always do, eventually." : "See? They're coming out now. I told you they would."]])));
  const left = TOCK_TOLD.filter(s => !world.flags['toldW_' + s.id] && !given(s.id) && !world.has['supply_' + s.id]);
  if (!left.length) return steps;
  return [...steps, ...buttonShop(n, 'tock', left.map(s => ({ what: 'where ' + SUPPLIES.find(x => x.id === s.id).what.split(',')[0] + ' is', cost: s.cost, grant: () => { world.flags['toldW_' + s.id] = true; world.marks.push(s.mark); }, buy: () => [sayN(n, s.line), run(() => { popup(P.x, P.y - 54, 'marked on his map', '#e8e6f0'); })] })))];
};

// ---------- the rest of the town ----------
const MABEL_COTTON = [16, 22, 28];
WSCENES.mabel = n => {
  const steps = walkUp(n);
  if (world.has.supply_thread && !given('thread')) return [...steps, sayN(n, 'Is that thread? A whole spool of it? Oh, give it here.'), ...deliverSteps(n, 'thread', ["I can mend again. I've had half the town coming apart at the seams.", "Come back any time you've a hole in you. I'll stitch it for buttons. Not many."])];
  if (!given('thread')) { steps.push(sayN(n, ...(trust() < 2 ? ["We're closed. I mean I'm closed. To you.", "Not to be rude. I don't know you, that's all."] : ["I'd mend you if I could. I've no thread. Not a scrap.", 'Tock put it on his board. If you see any up there, think of me.']))); return steps; }
  const c = world.mabelCotton || 0;
  steps.push(sayN(n, ...pick([["Hold still, I can see stuffing coming out of you from here."], ['I mend everybody down here. Bears, dolls, a sock once. Mostly the same stitch.'], ["Before all this I was somebody's. Lucy. Her name was Lucy. I say it every day so I don't lose it."]])));
  if (c >= MABEL_COTTON.length) return steps;
  return [...steps, ...buttonShop(n, 'mabel', [{ what: 'a bit of stuffing, sewn in', cost: MABEL_COTTON[c], grant: () => { world.mabelCotton = c + 1; }, buy: () => [sayN(n, 'There. Snug.'), run(() => addCotton())] }])];
};
WSCENES.clank = n => {
  const steps = walkUp(n);
  if (world.has.supply_battery && !given('battery')) return [...steps, sayN(n, '*bip* Is that a battery? A battery with juice in it?'), ...deliverSteps(n, 'battery', ['The night lights! The night lights can stay on past sundown! *bip bip*', "And with the light I can finally get at the music box. Its spring's been going for months. Listen."], () => { world.flags.musicBoxFixed = true; saveWorld(); })];
  if (!given('battery')) { steps.push(sayN(n, ...(trust() < 2 ? ['*bip* Stall closed. Sorry. Stranger.'] : ["I can't fix anything in the dark. *bip* The night lights are nearly flat.", "A battery. Any battery. Bring me a battery and I'll fix you up something nice."]))); return steps; }
  steps.push(sayN(n, ...pick([['*bip* I fix things. Springs, keys, wheels. Hearts, no. Not that kind.'], ["The music box sounds right again. I keep stopping to listen."], ["I was a birthday present. The batteries ran out on the first day. I didn't mind. They played with me anyway."]])));
  if ((world.slots || 2) >= 3) return steps;
  return [...steps, ...buttonShop(n, 'clank', [{ what: 'a bigger pin board (wear one more)', cost: 30, grant: () => { world.slots = (world.slots || 2) + 1; }, buy: () => [sayN(n, '*bip* There. Room for one more pin. Wear it well.'), run(() => { popup(P.x, P.y - 54, 'he can wear one more pin', '#ffd36b', true); sfx.idea(); })] }])];
};
WSCENES.oldkey = n => [...walkUp(n), sayN(n, ...(!world.flags.metOldKey ? ['*tick tick* Hm? Oh. A new one. Do you need winding? No? No key on you. Lucky.',
  "I wind them all up in the morning. Every wind-up toy in the Warren. If I don't, they run down, and running down's like going to sleep, only you don't know if you'll wake.",
  "I had a kid once. A boy. His name was... it was...", "It'll come to me."] : pick([["Running down's the worst of it. You can feel it coming. Slower and slower."], ["His name was... no. Gone again. It'll come back."], ['Tock lost his key once. Wouldn\'t have woken up if you hadn\'t found it. *tick*'], ["The music box is a wind-up too, you know. Same as me. Only bigger."]]))), run(() => { world.flags.metOldKey = true; saveWorld(); })];
WSCENES.ballerina = n => [...walkUp(n), sayN(n, ...(world.flags.musicBoxFixed ? pick([["It doesn't drag anymore. Can you hear? I can dance properly again."], ['Round and round. It never gets old. Well. It gets a little old.']]) : pick([["The spring's tired. I'm tired. We turn slower every night."], ['They come and sit round the box in the evening. It helps them forget for a bit.'], ['Mind my tune. It\'s all some of them have left of home.']])))];
WSCENES.teddy = n => [...walkUp(n), sayN(n, ...pick([["Tea? It's very good tea. It's pretend, but it's very good pretend."], ["We have a party every day. It's always somebody's birthday somewhere."], ['Bun pours. I drink. It works out.']]))];
WSCENES.bunny = n => [...walkUp(n), sayN(n, ...pick([['More tea? I just made a fresh pot. Of nothing.'], ['My girl used to hold me by the ears. I didn\'t mind. I still don\'t.'], ["Teddy's had eleven cups today. He says he's not counting. I am."]]))];
WSCENES.duck = n => [...walkUp(n), sayN(n, ...pick([["Are you from up top? What's it like? Is it big? Is it bigger than the square?"], ["We're learning letters. I know A. And O. O is a circle."], ["I'm not allowed out. Nobody little's allowed out."]]))];
WSCENES.sock = n => [...walkUp(n), sayN(n, ...pick([["I don't have a kid. I was a sock first. Then somebody drew a face on me."], ['Do you want to see a trick? I can open my mouth. That\'s the trick.'], ["Teddy says you're a hero. Are you a hero?"]]))];
WSCENES.drummer = n => [...walkUp(n), sayN(n, ...pick([["We're going to put on a show! When it's all over. When there's something to celebrate."], ['*rat-a-tat* Practicing. Always practicing.'], ["Clank says a band needs more than one drum. I say a band needs a drum first."]]))];
// the sick bay lot: worried in quarantine, glad to be out the rest of the time, and somehow always ending up back in
const PATIENT_LINES = {
  penguin: { sick: [["Don't come too close. They're watching my spot. It hasn't spread. It hasn't spread, has it?"], ["I only went out for a minute. I only touched one puddle."], ["Every morning Dot looks at it and says it's no worse. I hope she's telling the truth."]],
    well: [["Dot says I'm clear. Clear clear. I'm not going near a puddle ever again."], ["I was only out for a minute. Last time I said that I ended up back in there."], ["Fleece hums to whoever's in the sick bay. I miss the humming a bit. Don't tell anyone."]] },
  inky: { sick: [["*blub* Don't come close. It's on my third leg. Or my fifth. I lose count."], ["I only reached down to see what was in the drain. One leg. Just the one."], ["It's ink. I keep telling them it's ink. They keep putting me in here anyway."]],
    well: [["*blub* Out again. Eight legs and not a spot on any of them."], ["I'm not going near the deep tunnels again. I said that last time too."], ["I hold the lanterns when they change the candles. Four at once. Showing off, really."]] },
  peanut: { sick: [["*hrmm* Got it on my trunk. I smelled a puddle. Elephants smell things, it's what we do."], ["They say a few more days. They always say a few more days."], ["Don't worry about me. I've been in here more than out, lately."]],
    well: [["*hrmm* Free again. My trunk's never been cleaner."], ["I'm not sniffing anything I don't know. Starting now."], ["Somebody has to reach the high shelves. That's me. When I'm not in the sick bay."]] },
  inchy: { sick: [["*eep* I went through a gap. It was a very small gap. It had something in it."], ["Count my segments. Is it on more than one? Don't tell me."], ["Next time I'm going round. Always round. Never through."]],
    well: [["*eep* I'm better. All of me, every segment."], ["I went round this time. Mostly round."], ["I keep ending up back in there. I don't know how. I'm very careful. I think."]] },
  lily: { sick: [["*squeak* I hopped in a puddle. It looked like a nice puddle."], ["Frogs are supposed to like puddles. Why does every puddle have to be Grime?"], ["Don't make me laugh, I squeak and then everyone looks."]],
    well: [["*squeak* Out. No puddles today. I'm being so good."], ["Fleece says that's the fourth time. I say it was the third."], ["There was a puddle on the way here. I didn't hop in it. I wanted to."]] },
};
for (const k of PATIENTS) WSCENES[k] = n => [...walkUp(n), sayN(n, ...pick(PATIENT_LINES[k][n.sick ? 'sick' : 'well']))];
// more of the town (10/15/2026)
WSCENES.pip = n => [...walkUp(n), sayN(n, ...(!world.flags.metPip ? ['*fweet* Mind the line. She\'s due at the far buffer in about a minute. Same as always.',
  "Two buffers and a lot of track between them. No stations. I keep her on time anyway.", "Somebody has to. If the train stops, folk start thinking everything's stopped."]
  : pick([['Right on time. *fweet*'], ["The wagon takes Rex's dirt down to the far end. Then it comes back. Then it goes again."], ['I had a whole set once. Hills, a tunnel, a little station with a clock. The kid lost the station first.'], ["Don't ride her. She's not that kind of train. Well. She is. But don't."]]))), run(() => { world.flags.metPip = true; saveWorld(); })];
WSCENES.rex = n => [...walkUp(n), sayN(n, ...(!world.flags.metRex ? ["*rrr* Oh. Hello. Sorry. I'm big, I know. I don't bite. My teeth are round.",
  'I carry the dirt. The mole digs, I carry. One thimble at a time.', "Pip's train takes it the rest of the way."]
  : pick([['*rrr* Another thimble. Then another one.'], ['There were twelve of us in the tube. All the same green. I was the one the kid picked to be the nice one.'], ['Mabel says I shake the whole lane when I walk. I try to walk softly.'], ['The square used to be a hole the size of a teacup. We dug it bigger. Took a long time.']]))), run(() => { world.flags.metRex = true; saveWorld(); })];
WSCENES.fleece = n => [...walkUp(n), sayN(n, ...(!world.flags.metFleece ? ["Shh. They're sleeping. Mostly.",
  "I'm Fleece. I keep the bunks. Tuck them in, count them, hum till they drop off.", "I don't sleep much. Somebody has to count them in the morning too."]
  : pick([['*ting* That\'s my bell. I keep it quiet at night.'], ['Every night I count. Every morning I count again. Same number, so far.'], ["Whoever's in the sick bay can't sleep either. I hum a little louder so they can hear it over there."], ["The little ones ask about up top. I tell them it's just like here, only with a sky."]]))), run(() => { world.flags.metFleece = true; saveWorld(); })];
WSCENES.patches = n => [...walkUp(n), sayN(n, ...(!world.flags.metPatches ? ["*mrrp* What. I'm not in anybody's way.",
  "Mabel sewed me back up. Twice. The ear's the wrong color. I didn't ask for that.", "...It's a good ear. Don't tell her I said so."]
  : pick([['*mrrp* I\'m sitting. That\'s what I do.'], ['I had a whole other back once. Orange, like the rest of me. The Grime got that bit.'], ["If she's sewing you up, sit still. She hates it when you wriggle."], ["I don't say thank you. The mole doesn't either. We get on fine."]]))), run(() => { world.flags.metPatches = true; saveWorld(); })];
WSCENES.army = n => [...walkUp(n), sayN(n, ...(trust() < 4 ? pick([["Move along. I've got my eye on you."], ['Orders are to keep you in sight. So I am.']]) : pick([['At ease. You\'re alright.'], ["Quiet shift. Quiet's good."]])))];
WSCENES.dot = n => [...walkUp(n), run(() => { n.pose = { frame: 'dot_listen', t: 1.2 }; }), wait(0.8),
  sayN(n, ...(!world.flags.moleHome ? ["Shh. I'm listening.", "The mole went down to check the deep tunnels. He's been gone too long. I can hear digging, sometimes. And something else. Gurgling."]
    : pick([["Shh. Quieter today. The mole's sealed the cracks again."], ["If I hear it coming, I ring the bell. Then everybody knows."], ["Behind that wall. Sometimes it's quiet. Sometimes it isn't. Don't go near it."]])))];
WSCENES.sarge = n => {
  const steps = walkUp(n);
  if (!world.flags.deepHatch) {
    let yes = false;
    steps.push(sayN(n, "So you're the one Tock keeps going on about.", "The mole went down to listen for the Grime. Down the hatch, into the deep tunnels. That was two days back. He's not come up.",
      "My men won't go. I won't order them. It's bad down there."),
    ask('sarge', 'Will you go?', ["I'll go", 'not yet'], i => { yes = i === 0; }),
    t => { if (t > 0) return true; scene.steps.splice(scene.i + 1, 0, ...(yes ? [...nod(), sayN(n, "...Alright. I'll unbolt it. Bring him back."), run(() => { world.flags.deepHatch = true; saveWorld(); applyGates(room); sfx.open(); popup(P.x, P.y - 54, 'the hatch is open', '#ffd36b', true); })] : [sayN(n, "Can't say I blame you.")])); return true; });
    return steps;
  }
  steps.push(sayN(n, ...(!world.flags.moleHome ? ["Hatch is open. Go careful.", 'Bring him back.'] : pick([['You brought him back. I won\'t forget that.'], ["The hatch stays bolted now. Nobody goes down there that doesn't have to."]]))));
  return steps;
};

// ---------- the mole ----------
SCENES.moleFree = () => {
  const a = () => actors.trapped, d = room.def.trapped;
  return [
    bars(true), run(() => { P.vx = 0; }), faceTo(d.x), wait(0.4),
    run(() => { a().frame = 'mole_dig_1'; sfx.dig(); }), wait(0.25), run(() => { a().frame = 'mole_dig_2'; sfx.dig(); puff(d.x, d.y, 8, 40, '#5a3e24'); }), wait(0.25), run(() => { a().frame = 'mole_idle_1'; }),
    run(() => { a().frame = 'mole_sniff'; sfx.moleSniff(); }), wait(0.8), run(() => { a().frame = 'mole_talk_1'; }),
    say('mole', '*snf snf* ...Soap. You smell of soap. And a kid\'s bedroom.', 'You\'re not from the Warren. Smell like it now, though.',
      'Roof came in on me. Grime came in after it. Thought that was me done.', "...", "Well. Don't stand there. I've got tunnels to seal."),
    run(() => { const m = a(); m.anim = ['mole_dig_1', 'mole_dig_2']; m.fps = 6; m.flip = false; }), moveActor('trapped', d.x + 3 * T, d.y, 0.8, { linear: true }),
    run(() => { sfx.dig(); puff(a().x, a().y, 14, 60, '#5a3e24'); a().hidden = true; }),
    run(() => { world.flags.moleHome = true; world.moleStops = world.moleStops || {}; world.moleStops.moleshop = true; saveWorld(); giveButtons(10, P.x, P.y); }),
    wait(0.6), run(() => popup(P.x, P.y - 54, 'the mole digs his way home', '#ffd36b', true)), bars(false),
  ];
};
const MOLE_HERE_JOKE = ["*snf* You've got a look on you. Go on, then.", "'If you can take me anywhere I've been, why not somewhere I haven't?'",
  "Fine. Where haven't you been?", "...", "Exactly. Can't take you somewhere you can't even tell me about.", "Go and be somewhere first. Then knock."];
WSCENES.mole = n => {
  const steps = walkUp(n);
  if (world.has.supply_candles && !given('candles')) return [...steps, sayN(n, '*snf* Wax. Birthday candles, by the smell.'), ...deliverSteps(n, 'candles', ["Good. I'll melt them into the cracks by the walled up tunnel. Fresh wax holds.", "...Thanks."])];
  if (!world.flags.metMoleHome) {
    world.flags.metMoleHome = true; world.moleStops = world.moleStops || {}; world.moleStops.moleshop = true; saveWorld();   // his own hole's always one he'll take you back to (10/15/2026)
    steps.push(sayN(n, '*snf* You. Soap and bedroom.', "I don't say thanks. Never have. Ask anybody.",
      "But if you ever need to get somewhere down here, under the park, knock on a molehill. I'll come up and take you. I've got holes everywhere.",
      "Only places I've dug, mind. And only ones you've been."));
    return steps;
  }
  // 10/16/2026: Phill can't talk, so the mole reads the question off his face. Told once, then it's in the rotation
  if (!world.flags.moleHereJoke) { world.flags.moleHereJoke = true; saveWorld(); steps.push(sayN(n, ...MOLE_HERE_JOKE)); return steps; }
  steps.push(sayN(n, ...pick([MOLE_HERE_JOKE, ["*snf* Knock on the molehill if you're going somewhere."], ["That wall at the bottom of the town. I dug that tunnel. I sealed it, too. Don't ask."], ['The toys took me in when the Grime got my place. So I dig for them. Fair trade.'], ["Spoons. Best thing for digging. Don't let anyone tell you different."]])));
  return steps;
};
// knock on a molehill: he comes up and takes you anywhere he's dug
SCENES.molehill = () => {
  const ms = moleStopHere(), here = room.id;
  const known = Object.keys(world.moleStops || {}).filter(id => id !== here);
  const name = id => id === 'moleshop' ? "the mole's workshop, in the warren" : (MOLE_STOPS[id] || {}).name;
  const mn = moleInShop();
  if (mn) return moleHomeKnock(ms, mn, known, name);
  const steps = [walkTo(ms.x - 2 * T), faceTo(ms.x), pose('reach', 0.15), run(() => sfx.tok()), pose(null), wait(0.12), pose('reach', 0.15), run(() => sfx.tok()), pose(null), wait(0.4),
    run(() => { addActor('peek', { kind: 'rw', x: ms.x, y: ms.y + 6, frame: 'mole_peek', layer: 'back' }); sfx.dig(); puff(ms.x, ms.y - 8, 6, 30, '#5a3e24'); }), moveActor('peek', ms.x, ms.y - 2, 0.3)];
  if (!known.length) return [...steps, say('mole', "*snf* Nowhere else I've dug that you've been. Go and see a bit of the place."), moveActor('peek', ms.x, ms.y + 10, 0.3), run(() => { delete actors.peek; })];
  let picked = -1;
  steps.push(ask('mole', '*snf* Where to?', [...known.map(name), 'nowhere. just knocking'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const to = known[picked];
    if (!to) { scene.steps.splice(scene.i + 1, 0, say('mole', 'Hm.'), moveActor('peek', ms.x, ms.y + 10, 0.3), run(() => { delete actors.peek; })); return true; }
    scene.steps.splice(scene.i + 1, 0,
      say('mole', 'Hold your breath. Not that you breathe.'),
      run(() => { sfx.dig(); puff(ms.x, ms.y - 8, 16, 50, '#5a3e24'); P.hidden = true; }), moveActor('peek', ms.x, ms.y + 12, 0.3),
      t2 => { if (Math.floor(t2 / 0.25) !== Math.floor((t2 - STEP) / 0.25)) sfx.dig(); return t2 > 0.8; },
      fadeTo(1, 0.4), run(() => { world.moleIn = to; saveWorld(); P.hidden = false; goTo(to, '@mole'); }), until(() => false));
    return true;
  });
  return steps;
};
// in his workshop he's standing right there, so knocking on his hill gets him from where he is, not up out of it
// (10/15/2026: a second mole came up out of the hill). Going somewhere, he walks over and dives in first
function moleHomeKnock(ms, mn, known, name) {
  const steps = [walkTo(ms.x - 2 * T), faceTo(ms.x), pose('reach', 0.15), run(() => sfx.tok()), pose(null), wait(0.12), pose('reach', 0.15), run(() => sfx.tok()), pose(null), wait(0.35),
    faceTo(mn.x), run(() => sfx.moleSniff())];
  if (!known.length) return [...steps, sayN(mn, "*snf* I'm right here. That's my front door you're knocking on.", "Nowhere else I've dug that you've been, anyway. Go and see a bit of the place.")];
  let picked = -1;
  steps.push(sayN(mn, "*snf* I'm right here. That's my front door you're knocking on."));
  steps.push(ask('mole', 'Where to, then?', [...known.map(name), 'nowhere. just knocking'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const to = known[picked];
    if (!to) { scene.steps.splice(scene.i + 1, 0, sayN(mn, 'Hm.')); return true; }
    const dur = Math.max(0.4, Math.abs(ms.x - mn.x) / 70);
    scene.steps.splice(scene.i + 1, 0,
      sayN(mn, 'Hold your breath. Not that you breathe.'),
      run(() => { moleAway = true; addActor('walker', { kind: 'rw', x: mn.x, y: mn.y, anim: ['mole_dig_1', 'mole_dig_2'], fps: 6, layer: 'back', flip: ms.x > mn.x }); }),
      moveActor('walker', ms.x, mn.y, dur, { linear: true }),
      run(() => { sfx.dig(); puff(ms.x, ms.y - 8, 16, 50, '#5a3e24'); actors.walker.hidden = true; }), wait(0.3),
      run(() => { sfx.dig(); puff(ms.x, ms.y - 8, 16, 50, '#5a3e24'); P.hidden = true; }),
      t2 => { if (Math.floor(t2 / 0.25) !== Math.floor((t2 - STEP) / 0.25)) sfx.dig(); return t2 > 0.8; },
      fadeTo(1, 0.4), run(() => { delete actors.walker; world.moleIn = to; saveWorld(); P.hidden = false; goTo(to, '@mole'); }), until(() => false));
    return true;
  });
  return steps;
}
SCENES.moleArrive = ms => moleInShop() ? moleArriveHome(ms, moleInShop()) : [
  run(() => { sceneFade.a = 1; P.hidden = true; addActor('peek', { kind: 'rw', x: ms.x, y: ms.y + 12, frame: 'mole_peek', layer: 'back' }); }),
  bars(true), run(() => { placePlayer(ms.x - 22, ms.y, 1); cam.snap = true; updateCam(0); }), fadeTo(0, 0.4),
  t => { if (Math.floor(t / 0.25) !== Math.floor((t - STEP) / 0.25)) sfx.dig(); return t > 0.6; },
  run(() => { P.hidden = false; puff(ms.x, ms.y - 8, 16, 50, '#5a3e24'); sfx.dig(); }), moveActor('peek', ms.x, ms.y - 2, 0.3),
  say('mole', '*snf* There.'), moveActor('peek', ms.x, ms.y + 12, 0.3), run(() => { delete actors.peek; }), bars(false),
];
// coming back to the workshop by mole: he comes up out of his hill and goes back to his spot
const moleArriveHome = (ms, mn) => [
  run(() => { moleAway = true; sceneFade.a = 1; P.hidden = true; addActor('peek', { kind: 'rw', x: ms.x, y: ms.y + 12, frame: 'mole_peek', layer: 'back' }); }),
  bars(true), run(() => { placePlayer(ms.x - 22, ms.y, 1); cam.snap = true; updateCam(0); }), fadeTo(0, 0.4),
  t => { if (Math.floor(t / 0.25) !== Math.floor((t - STEP) / 0.25)) sfx.dig(); return t > 0.6; },
  run(() => { P.hidden = false; puff(ms.x, ms.y - 8, 16, 50, '#5a3e24'); sfx.dig(); }), moveActor('peek', ms.x, ms.y - 2, 0.3),
  say('mole', '*snf* Home.'),
  run(() => { const a = actors.peek; a.frame = null; a.anim = ['mole_dig_1', 'mole_dig_2']; a.fps = 6; a.y = mn.y; a.flip = mn.x > ms.x; puff(ms.x, ms.y - 4, 8, 30, '#5a3e24'); }),
  moveActor('peek', mn.x, mn.y, Math.max(0.4, Math.abs(ms.x - mn.x) / 70), { linear: true }),
  run(() => { delete actors.peek; moleAway = false; }), bars(false),
];

// the cave-in, broken open: the mole's free
const _breakOpenW = breakOpen;
// The rescue waits till it can start: he's in the room, nothing else is going on (the map open, a scene), and he's on his
// feet. It used to try once half a second after the last hit, and if the map was open right then it never happened,
// not even coming back (the progression audit, 10/17/2026). Coming back to a broken cave-in with the mole still in
// it, the rescue starts then too
let moleWaitT = 0;
breakOpen = b => { _breakOpenW(b); if (b.id === 'cavein') moleWaitT = 0.5; };
const _updMole = update;
update = function (dt) {
  _updMole(dt);
  if (!room || room.id !== 'deepdig' || world.flags.moleHome || !actors.trapped || !room.breaks.some(b => b.id === 'cavein' && b.broken)) return;
  if ((moleWaitT -= dt) > 0) return;
  if (scene || cutscene || mapView || (typeof pinBoard !== 'undefined' && pinBoard) || P.story || P.ko > 0 || !P.ground || trans.state !== 'none' || P.pinned) return;
  playScene(SCENES.moleFree());
};

})();
