'use strict';
// ---------- the Greenhouse: the old glass greenhouse up the hill behind the playground ----------
// The plan from 10/18/2026 (Greenhouse.md in the notes). The Bramble has it worse in here than anywhere in the
// park. Static spark is learned in the bed of lamb's ear (he rolls through the fuzzy leaves and comes out all
// staticky), and it cuts the Bramble. The cape flap is learned up in the roof, watching a butterfly come out of its
// chrysalis on a warm pipe. The bumblebee on the orchid shelf sells what it knows for seeds.
// Loaded after warren.js: it hooks into the room's setup, its items and its events.

(() => {
// ---------- the region: its sheet, its money, its crayon, its color on the map ----------
SPRITE_SHEETS.push(['art/greenhouse/greenhouse_sprites.png', () => window.GREENHOUSE_SPRITES]); Assets.use('art/greenhouse/greenhouse_sprites.png');
COIN_KINDS.push('seeds'); REGION_COIN.greenhouse = 'seeds'; COIN_SPR.seeds = 'seed_small'; COIN_ICON.seeds = 'seed_icon'; COIN_COL.seeds = '#d8b878';
REGION_ITEMS.greenhouse = { crayon_greenhouse: 0, seed: 1, memory_flower: 2, cotton: 3 };
REGION_CRAYON.greenhouse = 'crayon_greenhouse'; REGION_COLOR.greenhouse = '#f07aa8'; REGION_NAME.greenhouse = 'the greenhouse';

Object.assign(sfx, {
  beeTalk: () => { const f = 130 + Math.random() * 18; tone(f, f * 0.96, 0.13, 'sawtooth', 0.01); },
  buzz: () => { tone(170, 190, 0.45, 'sawtooth', 0.012); setTimeout(() => tone(190, 165, 0.3, 'sawtooth', 0.01), 200); },
  zap: () => { noise(0.06, 4200, 6400, 0.07, 3); tone(1900, 500, 0.09, 'square', 0.018); },
  crackle: () => { for (let i = 0; i < 3; i++) setTimeout(() => noise(0.025, 5000, 7000, 0.035, 4), i * 50 + Math.random() * 30); },
  seed: () => { const f = 1300 + Math.random() * 200; tone(f, f * 1.25, 0.05, 'triangle', 0.022); },
  rustleSoft: () => { noise(0.25, 1200, 2400, 0.03, 1.2); },
});
Object.assign(VOICE, {
  bee: { name: 'the bumblebee', col: '#f0c848', speed: 22, every: 4, blip: () => sfx.beeTalk(), noise: () => sfx.buzz() },
});

const inGreenhouse = () => room && room.def.region === 'greenhouse';

// ---------- seeds: scooped up as he goes, like the other regions' money ----------
const _takeItemG = takeItem;
takeItem = it => {
  if (it.kind === 'seed') { world.has[it.id] = true; saveWorld(); it.got = 2; gainCoin('seeds', 1); twinkle(it.x, it.y - 6, 4, COIN_COL.seeds); return; }
  _takeItemG(it);
  if (it.id === 'crayon_greenhouse') { popup(P.x, P.y - 54, 'the pink crayon', '#f07aa8', true); setTimeout(() => sfx.idea(), 200); }
  if (it.id === 'memory_flower') setTimeout(() => { if (SCENES.memoryFlower) playScene(SCENES.memoryFlower(it)); }, 380);
};

// ---------- a crackle of static round him (in the lesson) ----------
function crackleAt(x, y, n = 6, r = 16) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, d = Math.random() * r;
    part(x + Math.cos(a) * d, y + Math.sin(a) * d, Math.cos(a) * 40, Math.sin(a) * 40 - 20, 0.18, Math.random() < 0.5 ? '#d8f0ff' : '#fff6a0', 1, 0);
  }
}
function zapLine(x0, y0, x1, y1) {                                                         // a little jag of static from one spot to another
  const n = 7;
  for (let i = 0; i <= n; i++) {
    const k = i / n, j = i && i < n ? (Math.random() * 2 - 1) * 5 : 0;
    part(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k + j, 0, 0, 0.16, i % 2 ? '#d8f0ff' : '#ffffff', 2, 0);
  }
}

// ---------- the lamb's ear: static spark ----------
// he rolls right through the bed of soft fuzzy leaves, gets up with his fluff standing on end, reaches for the old tin
// watering can and *snap*. He looks at his hand. He rubs his tummy, points at the can, and a crackle jumps across
SCENES.lambsear = def => {
  const L = def.lamb, [bx, by] = L.bed, [cx, cy] = L.can;
  let x0 = 0;
  return [
    bars(true), run(() => { P.vx = 0; }), camTo(bx, by - 30, 0.6),
    walkTo(bx - 60), faceTo(bx), wait(0.2),
    run(() => { x0 = P.x; sfx.rustleSoft(); }),
    t => {                                                                                // rolling through the leaves
      P.story = { kind: 'scene', frame: 'roll', t }; P.x = x0 + Math.min(1, t / 0.8) * 70; P.facing = 1;
      if (Math.random() < 0.5) part(P.x + (Math.random() * 2 - 1) * 8, P.y - 6, (Math.random() * 2 - 1) * 40, -30 - Math.random() * 30, 0.5, Math.random() < 0.5 ? '#c8d0ca' : '#e4eae4', 1, 120);   // fuzz flying
      return t >= 0.8;
    },
    pose('jolt', 0.5), run(() => { sfx.crackle(); crackleAt(P.x, P.y - 20, 10, 18); popup(P.x, P.y - 54, 'all fuzzy', '#e8e6f0'); }),
    together(pose('idle_1', 0.9), t => { if (Math.random() < 0.3) crackleAt(P.x, P.y - 22, 1, 16); return t > 0.9; }),
    walkTo(cx - 34), faceTo(cx),
    pose('reach', 0.35), run(() => { zapLine(P.x + 10, P.y - 22, cx - 6, cy - 14); sfx.zap(); shakeT = 0.08; shakeA = 1; }),
    pose('surprised', 0.4), pose('look_down', 0.8), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); }), wait(0.3),
    pose('rub_1', 0.25), run(() => crackleAt(P.x, P.y - 16, 3, 10)), pose('rub_2', 0.25), run(() => crackleAt(P.x, P.y - 16, 3, 10)), pose('rub_1', 0.25), run(() => { crackleAt(P.x, P.y - 16, 5, 12); sfx.crackle(); }),
    pose('reach', 0.2), run(() => { P.sparkAim = 'side'; fireSpark(); }), wait(0.25),
    run(() => { sfx.tink(); twinkle(cx - 10, cy - 18, 6, '#d8f0ff'); }), pose('reach', 0.3),
    run(() => { world.learned.spark = true; saveWorld(); popup(P.x, P.y - 54, 'static spark. {spark}: zap', '#96d2ff', true); sfx.idea(); twinkle(P.x, P.y - 40, 10); }),
    wait(1.0), pose(null), camBack(), wait(0.3), bars(false),
    run(() => room.hints.push({ text: '{spark}: static spark. {up} or {down} aims it. it cuts bramble', l: 0, t: 0, r: room.pxW, b: room.pxH, x: P.x, y: P.y - 70, a: 0, until: 'sparkedOnce' })),
  ];
};

// ---------- the chrysalis: the cape flap ----------
// a butterfly working its way out of its chrysalis on the warm pipe. It hangs there drying its wings, a few slow
// beats, then lifts off in a little hop through the air, and another. He watches, then tries it with his cape
SCENES.chrysalis = def => {
  const c = def.chrysalis, b = () => actors.bfly;
  if (!b()) addActor('bfly', { kind: 'rw', x: c.x, y: c.y, frame: 'bfly_chrysalis', layer: 'back' });
  return [
    bars(true), run(() => { P.vx = 0; }), faceTo(c.x), camTo(c.x, c.y + 20, 0.7), wait(0.5),
    run(() => { b().frame = 'bfly_chrysalis_crack'; sfx.tok && sfx.tok(); }),
    t => { b().x = c.x + (Math.floor(t * 18) % 2 ? 1 : -1) * (t < 0.6 ? 1 : 0); return t > 0.9; },   // it twitches
    run(() => { b().x = c.x; b().frame = 'bfly_emerge'; sfx.paper && sfx.paper(); }), pose('look_up', 1.4),
    run(() => { b().frame = 'bfly_dry'; }), wait(1.4),
    run(() => { const a = b(); a.anim = ['bfly_open_1', 'bfly_open_2']; a.fps = 1.6; }), wait(2.2),
    run(() => { const a = b(); a.anim = ['bfly_fly_1', 'bfly_fly_2']; a.fps = 10; a.layer = 'front'; sfx.flap && sfx.flap(); }),
    moveActor('bfly', c.x + 26, c.y - 18, 0.45, { arc: -14 }), wait(0.15),
    moveActor('bfly', c.x + 60, c.y - 44, 0.45, { arc: -14 }), wait(0.3),
    pose('look_up', 0.4), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); }), wait(0.5),
    pose(null), run(() => { P.vy = -jumpVel(); P.ground = false; sfx.jump(); }), wait(0.3),
    run(() => doFlap()), until(() => P.ground), wait(0.2),
    run(() => { world.learned.flap = true; saveWorld(); popup(P.x, P.y - 54, 'the cape flap. {jump} again in the air', '#96d2ff', true); sfx.idea(); twinkle(P.x, P.y - 40, 12); }),
    moveActor('bfly', c.x + 260, c.y - 200, 1.6, { arc: -30 }), run(() => { b().hidden = true; }),
    camBack(), wait(0.4), bars(false),
    run(() => room.hints.push({ text: '{jump}, then {jump} again in the air: the cape flap', l: 0, t: 0, r: room.pxW, b: room.pxH, x: P.x, y: P.y - 70, a: 0, until: 'flappedOnce' })),
  ];
};

// ---------- the bumblebee: sells what it knows, for seeds ----------
// Lazy and easygoing, too round to fly well, a slow drone of a voice. Has been to every flower in here, even the ones
// buried in the Bramble now. Not from here: it just visits, everywhere (it turns up again in the Hive)
const BEE_SHOP = [
  { id: 'toldCrayonGreenhouse', what: 'where the pink crayon went', cost: 10, done: () => world.has.crayon_greenhouse, mark: { room: 'boiler', x: 32.5 * 16, y: 10 * 16 },
    line: "*bzzm* Down the steps, under the ferns. The cold room. Up on the pipes, the top one. Pink, like the roses used to be. Before. Bzzm." },
  { id: 'toldLambPocket', what: 'something behind the thorns', cost: 8, done: () => world.flags.lambpocket, mark: { room: 'lambsear', x: 3 * 16, y: 20 * 16 },
    line: "In the lamb's ear, round the left side. Behind the thorns. Somebody left seeds back there. Not mine. I don't plant things, I just visit them." },
];
const BEE_COTTON = [18, 26, 34];
const BEE_CHAT = [
  ["Too round to fly far. That's alright. Everything good is close by, if you look. Bzzm."],
  ['The thorns came in through the broken glass. A little more every year. The flowers never stood a chance.'],
  ["I don't live here. I just visit. I visit everywhere. There's a hive across the park... bzzm. Another time."],
  ["There's an old garden gnome in the middle of all that bramble. Something in him that isn't him."],
];
function beeList() {
  const out = [];
  for (const s of BEE_SHOP) if (!world.flags[s.id] && !(s.done && s.done())) out.push(s);
  const c = world.beeCotton || 0;
  if (world.learned.flap && c < BEE_COTTON.length) out.push({ cotton: true, what: 'a bit of fluff off an old seed head', cost: BEE_COTTON[c], line: c ? 'More fluff. The thistles grow it faster than I can sit on it.' : "Thistle fluff. You've got a hole in you. Bzzm. Stuff it in, it's soft." });
  return out;
}
SCENES.bee = npc => {
  const steps = [walkTo(npc.x - 3 * T), faceTo(npc.x)];
  if (!world.flags.metBee) {
    world.flags.metBee = true; saveWorld();
    steps.push(run(() => { npcPose = { frame: 'bee_buzz', t: 0.6 }; sfx.buzz(); }), wait(0.7),
      say('bee', "*bzzzm*... oh. Hello. Didn't hear you. I was resting my eyes. And my wings. Mostly my wings.",
        "I've been to every flower in here. Every one. Even the ones under the thorns now. I remember where they all are.",
        'What I know, I trade. For seeds. Sunflower, if you have them. Any kind, really. Bzzm.'));
  } else steps.push(say('bee', ...BEE_CHAT[Math.floor(Math.random() * BEE_CHAT.length)]));
  const left = beeList();
  if (!left.length) return [...steps, say('bee', "That's all I know. Come sit by the orchids sometime. Bzzm.")];
  let picked = -1;
  steps.push(ask('bee', `Mm? You've got ${world.seeds || 0} seeds.`, [...left.map(s => `${s.what} (${s.cost} seeds)`), 'nothing, bye'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const s = left[picked];
    if (!s) return true;
    if ((world.seeds || 0) < s.cost) { scene.steps.splice(scene.i + 1, 0, say('bee', "Bzzm. That's not enough seeds. I can count. Slowly. But I can.")); return true; }
    world.seeds -= s.cost; sfx.paper();
    const after = [];
    if (s.cotton) { world.beeCotton = (world.beeCotton || 0) + 1; after.push(run(() => addCotton())); }
    else { world.flags[s.id] = true; world.marks.push(s.mark); after.push(run(() => popup(P.x, P.y - 54, 'marked on his map', '#e8e6f0'))); }
    saveWorld();
    scene.steps.splice(scene.i + 1, 0, say('bee', s.line), run(() => { npcPose = { frame: 'bee_buzz', t: 0.5 }; sfx.buzz(); }), ...after, ...nod());
    return true;
  });
  return steps;
};

// ---------- the memory: a flower pressed in an old seed packet ----------
SCENES.memoryFlower = it => [
  bars(true), wait(0.4),
  run(() => { sceneFade.warm = true; sfx.memory(); }),
  showText(["an old seed packet. there's a flower pressed flat inside it.", 'his kid planted seeds like these once, in a cup on the windowsill. watered them every morning.', 'when the first one came up, they held him up to the window to see.']),
  run(() => {
    world.maxHealth += 1; P.maxHealth = world.maxHealth - (P.worn || 0); P.health = Math.min(P.maxHealth, P.health + 1); saveWorld();
    sceneFade.warm = false; puff(P.x, P.y - 22, 14, 60, '#ffffff', 60); sfx.stitch();
    popup(P.x, P.y - 54, 'one more cotton puff', '#fbf7ec', true);
  }),
  wait(1.0), bars(false),
];

// ---------- setting up a room ----------
let dripT = 0;
function setupGreenhouseRoom() {
  if (!inGreenhouse()) return;
  const d = room.def;
  if (d.chrysalis && !world.flags.learnedFlap) addActor('bfly', { kind: 'rw', x: d.chrysalis.x, y: d.chrysalis.y, frame: 'bfly_chrysalis', layer: 'back' });
  dripT = 0;
}
const _setupPondRoomG = setupPondRoom;
setupPondRoom = () => { _setupPondRoomG(); setupGreenhouseRoom(); };

// the first time he flaps, the hint about it can go. And the leak in the fern house: a drop now and then
const _checkEventsG = checkEvents;
checkEvents = dt => {
  _checkEventsG(dt);
  if (P.flapT > 0 && !world.flags.flappedOnce) { world.flags.flappedOnce = true; saveWorld(); }
  if (!inGreenhouse()) return;
  for (const e of room.events) {
    if (e.kind !== 'drip') continue;
    e.t = (e.t || 0) - dt;
    if (e.t <= 0) { e.t = e.every * (0.7 + Math.random() * 0.6); part(e.x, e.y, 0, 60, 1.4, '#cfe8f0', 2, 380); }
  }
};
})();
