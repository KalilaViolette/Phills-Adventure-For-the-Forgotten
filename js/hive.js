'use strict';
// ---------- the Hive: the wild bees' knothole in the Old Oak ----------
// From New regions.md (Hive.md in the notes, building 10/18/2026). A piñata blew up into it and split, and the Grime
// candy spilled out all through the hive. The guard bees at the mouth bump him back out till he shows he's here to
// help. The bumblebee in the comb hall shows him the belly flop (it just drops), and the crust right after only breaks
// under one. The honey on the stores' floor is slow going. The bees go about their work all through it, and never hurt
// him. Loaded after the Greenhouse's files: it hooks into the room's setup, its items and its events.

(() => {
// ---------- the region ----------
SPRITE_SHEETS.push(['art/hive/hive_sprites.png', () => window.HIVE_SPRITES]); Assets.use('art/hive/hive_sprites.png');
COIN_KINDS.push('sprinkles'); REGION_COIN.hive = 'sprinkles'; COIN_SPR.sprinkles = 'sprinkle_small'; COIN_ICON.sprinkles = 'sprinkle_icon'; COIN_COL.sprinkles = '#f06a8a';
REGION_ITEMS.hive = { crayon_hive: 0, sprinkle: 1, memory_candle: 2, cotton: 3 };
REGION_CRAYON.hive = 'crayon_hive'; REGION_COLOR.hive = '#f4d038'; REGION_NAME.hive = 'the hive';

Object.assign(sfx, {
  hum: () => { tone(110, 112, 0.6, 'sawtooth', 0.006); tone(220, 224, 0.5, 'triangle', 0.004); },
  sprinkle: () => { const f = 1500 + Math.random() * 300; tone(f, f * 1.3, 0.04, 'triangle', 0.02); setTimeout(() => tone(f * 1.2, f * 1.5, 0.03, 'triangle', 0.014), 40); },
  queenTalk: () => { const f = 180 + Math.random() * 20; tone(f, f * 0.97, 0.16, 'triangle', 0.012); },
});
Object.assign(VOICE, {
  hivebee: { name: 'the bumblebee', col: '#f0c848', speed: 22, every: 4, blip: () => sfx.beeTalk(), noise: () => sfx.buzz() },
  queen: { name: 'the queen', col: '#f0b860', speed: 18, every: 4, blip: () => sfx.queenTalk(), noise: () => sfx.hum() },
});

const inHive = () => room && room.def.region === 'hive';

// ---------- sprinkles: scooped up as he goes ----------
const _takeItemH = takeItem;
takeItem = it => {
  if (it.kind === 'sprinkle') { world.has[it.id] = true; saveWorld(); it.got = 2; gainCoin('sprinkles', 1); twinkle(it.x, it.y - 6, 4, COIN_COL.sprinkles); sfx.sprinkle(); return; }
  _takeItemH(it);
  if (it.id === 'crayon_hive') { popup(P.x, P.y - 54, 'the yellow crayon', '#f4d038', true); setTimeout(() => sfx.idea(), 200); }
  if (it.id === 'memory_candle') setTimeout(() => { if (SCENES.memoryCandle) playScene(SCENES.memoryCandle(it)); }, 380);
};

// ---------- the bees: going about their work, all through the hive ----------
// each group flits about its stretch (x0..x1 round y). They're only drawn: they can't be hit and never touch him
const BEE_KINDS = { guard: 'hbee_guard_fly_', nurse: 'hbee_nurse_fly_', worker: 'hbee_worker_fly_' };
function drawBees() {
  if (!inHive()) return;
  const now = performance.now() / 1000;
  for (const [gi, g] of (room.def.bees || []).entries()) {
    for (let i = 0; i < g.n; i++) {
      const ph = gi * 3.1 + i * 1.7, w = g.x1 - g.x0;
      const x = g.x0 + w * (0.5 + 0.5 * Math.sin(now * (0.23 + i * 0.07) + ph)), y = g.y + Math.sin(now * 1.3 + ph * 2) * 14 + Math.sin(now * 5 + ph) * 2;
      const vx = Math.cos(now * (0.23 + i * 0.07) + ph);
      spr(BEE_KINDS[g.kind] + (Math.floor(now * 24 + i) % 2 + 1), x, y, vx > 0);
    }
  }
  // the guard bees at the mouth, hovering across the way in till he's shown he's here to help
  const gd = room.def.beeGuards;
  if (gd && !world.flags.hiveWelcome) {
    for (let i = 0; i < 4; i++) {
      const bump = room.guardBump > 0 ? Math.sin(room.guardBump * 30) * 3 : 0;
      spr('hbee_guard_fly_' + (Math.floor(now * 24 + i) % 2 + 1), gd.x + 8 + Math.sin(now * 2 + i) * 3 + bump, gd.y - 10 - i * 14 + Math.sin(now * 3 + i * 2) * 2, false);
    }
  } else if (gd) {
    for (let i = 0; i < 2; i++) spr('hbee_guard_fly_' + (Math.floor(now * 24 + i) % 2 + 1), gd.x + 40 + i * 30 + Math.sin(now + i) * 4, gd.y - 40 - i * 10, i === 1);   // stood aside, keeping watch
  }
  // the lump of Grime candy on the landing board, till he's knocked it off
  if (gd && !world.flags.hiveWelcome && !room.candyGone) {
    const [cx, cy] = gd.candy; ctx.fillStyle = '#2a2030'; ellipse(cx, cy - 6, 9, 7); ctx.fillStyle = '#7a3a8a'; ellipse(cx, cy - 6, 8, 6); ctx.fillStyle = '#b06ac0'; ellipse(cx - 2, cy - 8, 4, 3);
    ctx.fillStyle = '#2c1c3c'; ctx.fillRect(Math.round(cx) - 5, Math.round(cy) - 1, 10, 2);
  }
}
const _drawNpcH = drawNpc;
drawNpc = () => { drawBees(); _drawNpcH(); };

// ---------- the guards at the mouth ----------
// he walks up, and they bump him back out, buzzing. There's a lump of the Grime candy stuck on their landing board.
// He knocks it off (into the drop), and they buzz, look at each other, and let him in
SCENES.hiveGuards = def => {
  const g = def.beeGuards, [cx, cy] = g.candy;
  return [
    bars(true), run(() => { P.vx = 0; }), camTo(g.x + 40, g.y - 30, 0.6),
    walkTo(g.x + 22), wait(0.1),
    run(() => { sfx.buzz(); room.guardBump = 0.5; P.vx = 220; P.vy = -120; P.ground = false; popup(g.x, g.y - 70, 'bzzz', '#f0c848'); }), wait(0.7),
    faceTo(g.x), wait(0.3), pose('look_down', 0.5), faceTo(cx), wait(0.3),
    walkTo(cx - 22), faceTo(cx),
    pose('reach', 0.3), run(() => {                                                           // the candy goes flying off the board
      room.candyGone = true; sfx.thud(); puff(cx, cy - 6, 6, 50, '#b06ac0', 60);
      for (let i = 0; i < 8; i++) part(cx, cy - 6, 60 + Math.random() * 120, -80 - Math.random() * 80, 0.8, i % 2 ? '#7a3a8a' : '#b06ac0', 2, 400);
    }), pose(null), wait(0.5),
    faceTo(g.x), run(() => { sfx.buzz(); popup(g.x, g.y - 80, 'bzz? bzzm', '#f0c848'); }), wait(0.9),
    run(() => { world.flags.hiveWelcome = true; saveWorld(); applyGates(room); sfx.hum(); popup(P.x, P.y - 54, 'they let him in', '#e8e6f0'); }), wait(0.8),
    camBack(), wait(0.3), bars(false),
  ];
};

// ---------- the bumblebee: the belly flop ----------
// it's sitting up on a wax ledge. It'll show him how it gets down: it buzzes its little wings as hard as it can, gets
// nowhere, and just drops. Lands like a sack, *thump*, and the gumdrop next to it goes flying. It doesn't get up.
// He tries it: up, then down and jump in the air
SCENES.bellyflop = def => {
  const L = def.flopLesson, [bx, by] = L.bee, [wx, wy] = L.watch, n = def.npc;
  return [
    bars(true), run(() => { P.vx = 0; }), walkTo(wx + 12 * T), faceTo(bx), camTo(bx + 90, by + 110, 0.7),   // (out from under the ledges, so his try comes down on the floor)
    say('hivebee', "*bzzm*... oh. You again. From the greenhouse. I get around.", "You want down from high up quick? I'll show you how I do it. Watch."),
    run(() => { npcPose = { frame: 'hivebee_buzz', t: 1.0 }; sfx.buzz(); }), wait(1.0),
    run(() => { popup(bx, by - 50, 'bzz... bzzz...', '#f0c848'); npcPose = { frame: 'hivebee_buzz', t: 0.8 }; sfx.buzz(); }), wait(0.9),
    run(() => { n._vy = 0; }),
    (t, dt) => {                                                                             // ...and it just drops
      n._vy = (n._vy || 0) + 900 * dt; n.y = Math.min(wy, n.y + n._vy * dt);
      npcPose = { frame: 'hivebee_idle_1', t: 0.1 };
      return n.y >= wy;
    },
    run(() => { shakeT = 0.18; shakeA = 3; sfx.thud(); puff(n.x, wy, 14, 90); popup(n.x, wy - 44, 'thump', '#e8e6f0');
      for (let i = 0; i < 6; i++) part(n.x + 20, wy - 6, 140 + Math.random() * 60, -160 - Math.random() * 60, 0.9, i % 2 ? '#7a3a8a' : '#b06ac0', 2, 500); }),
    wait(0.8), run(() => { npcPose = { frame: 'hivebee_doze', t: 1.2 }; }), wait(1.2),
    say('hivebee', "See? Just drop. Like a sack. Anything under you won't like it much. Bzzm."),
    pose('look_up', 0.5), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); }), wait(0.4), pose(null),
    run(() => { P.vy = -jumpVel(); P.ground = false; sfx.jump(); }), wait(0.32),
    run(() => { world.learned.flop = true; startFlop(); }), until(() => P.ground && !P.flop), wait(0.4),
    run(() => { saveWorld(); popup(P.x, P.y - 54, 'the belly flop. {down} + {jump} in the air', '#96d2ff', true); sfx.idea(); twinkle(P.x, P.y - 40, 12); }),
    wait(0.8), camBack(), wait(0.3), bars(false),
    run(() => room.hints.push({ text: '{down} + {jump} in the air: the belly flop. it breaks crusts', l: 0, t: 0, r: room.pxW, b: room.pxH, x: P.x, y: P.y - 70, a: 0, until: 'floppedOnce' })),
  ];
};

// ---------- the bumblebee: sells what it knows, for sprinkles ----------
const HIVE_SHOP = [
  { id: 'toldCrayonHive', what: 'where the yellow crayon is', cost: 12, done: () => world.has.crayon_hive, mark: { room: 'waxworks', x: 42.5 * 16, y: 8 * 16 },
    line: "Up past the little ones' room, where they're building. Right at the top of the new wax. Yellow. Like everything in here. Bzzm." },
];
const HIVE_COTTON = [20, 28];
// (what it talks about keeps up with him: once the worm or the piñata's down it stops warning him about them)
const HIVE_CHAT = [
  { l: ["The bees here don't mind me. I'm too slow to be trouble."] },
  { l: ["Something big came in through the knothole. Bright paper, a funny shape. It's hanging in their big hall now, full of the Grime. The candy came out of it."], until: 'pinataDown' },
  { l: ["The queen's shut away at the back. Behind the sticky wall. The bees made it to keep her safe. Bzzm."], until: 'pinataDown' },
  { l: ["There's something long in the honey store. I don't go down there. I'd get stuck. Then it'd find me."], until: 'wormDown' },
  { l: ["The honey store's quiet now. I went and looked. Then I came back. Bzzm."], after: 'wormDown' },
  { l: ["The paper thing's just lying there now. The bees keep taking little bits of it for the walls. Pink bits."], after: 'pinataDown' },
  { l: ["The queen came out. First time I've seen her. She's bigger than I thought. Bzzm."], after: 'pinataDown' },
];
function hiveBeeList() {
  const out = [];
  for (const s of HIVE_SHOP) if (!world.flags[s.id] && !(s.done && s.done())) out.push(s);
  const c = world.hiveBeeCotton || 0;
  if (c < HIVE_COTTON.length) out.push({ cotton: true, what: 'some fluff off a dandelion', cost: HIVE_COTTON[c], line: c ? 'More fluff. Bzzm. I sit on it sometimes. It\'s fine.' : "Dandelion fluff. For the hole in you. Still got a hole in you. Bzzm." });
  return out;
}
SCENES.hivebee = npc => {
  const steps = [walkTo(npc.x - 3 * T), faceTo(npc.x)];
  const chat = HIVE_CHAT.filter(c => !(c.until && world.flags[c.until]) && !(c.after && !world.flags[c.after]));
  steps.push(say('hivebee', ...chat[Math.floor(Math.random() * chat.length)].l));
  const left = hiveBeeList();
  if (!left.length) return [...steps, say('hivebee', "That's all I know in here. Bzzm.")];
  let picked = -1;
  steps.push(ask('hivebee', `Mm? You've got ${world.sprinkles || 0} sprinkles. I like the pink ones.`, [...left.map(s => `${s.what} (${s.cost} sprinkles)`), 'nothing, bye'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const s = left[picked];
    if (!s) return true;
    if ((world.sprinkles || 0) < s.cost) { scene.steps.splice(scene.i + 1, 0, say('hivebee', "Bzzm. Not enough sprinkles. I counted. Twice.")); return true; }
    world.sprinkles -= s.cost; sfx.paper();
    const after = [];
    if (s.cotton) { world.hiveBeeCotton = (world.hiveBeeCotton || 0) + 1; after.push(run(() => addCotton())); }
    else { world.flags[s.id] = true; world.marks.push(s.mark); after.push(run(() => popup(P.x, P.y - 54, 'marked on his map', '#e8e6f0'))); }
    saveWorld();
    scene.steps.splice(scene.i + 1, 0, say('hivebee', s.line), run(() => { npcPose = { frame: 'hivebee_buzz', t: 0.5 }; sfx.buzz(); }), ...after, ...nod());
    return true;
  });
  return steps;
};

// ---------- the queen (once the Piñata's down) ----------
SCENES.queen = npc => {
  const steps = [walkTo(npc.x + 4 * T), faceTo(npc.x)];
  if (!world.flags.pinataDown) return [...steps, say('queen', '...')];
  if (!world.flags.metQueen) {
    world.flags.metQueen = true; saveWorld();
    return [...steps, say('queen', 'So you are the one who brought the hive its hum back.', 'We shut ourselves away and waited. We are good at waiting. We were not good at that thing in the hall.',
      'Take what is by my cell. It came in with that paper creature, from a party, long ago. I think it was meant for someone like you.')];
  }
  return [...steps, say('queen', 'The hive is yours to come and go. Mind the little ones.')];
};

// ---------- the memory: a birthday candle ----------
SCENES.memoryCandle = it => [
  bars(true), wait(0.4),
  run(() => { sceneFade.warm = true; sfx.memory(); }),
  showText(['a birthday candle, half burnt down. a crumb of cake still stuck to it.', 'his kid blew out six of these once, with him sat right next to the cake.', 'they made a wish. they never said what. they hugged him after, so maybe he was in it.']),
  run(() => {
    world.maxHealth += 1; P.maxHealth = world.maxHealth - (P.worn || 0); P.health = Math.min(P.maxHealth, P.health + 1); saveWorld();
    sceneFade.warm = false; puff(P.x, P.y - 22, 14, 60, '#ffffff', 60); sfx.stitch();
    popup(P.x, P.y - 54, 'one more cotton puff', '#fbf7ec', true);
  }),
  wait(1.0), bars(false),
];

// ---------- the walls the Hive is shut with ----------
const _drawGateLookH = drawGateLook;
drawGateLook = gt => {
  const x0 = gt.x0 * T, y0 = gt.y0 * T, w = (gt.x1 - gt.x0 + 1) * T, h = (gt.y1 - gt.y0 + 1) * T;
  if (gt.look === 'bees') return;                                                           // (the guards themselves: drawBees)
  if (gt.look === 'wax' || gt.look === 'propolis') {                                        // sealed: a plug of wax, or the bees' dark red resin
    const pal = gt.look === 'wax' ? ['#2a2030', '#8a5a1c', '#b07a28', '#d8a440'] : ['#1a0806', '#4a1c10', '#6a2c18', '#94502c'];
    ctx.fillStyle = pal[0]; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = pal[1]; ctx.fillRect(x0 + 1, y0 + 1, w - 2, h - 2);
    for (let y = y0 + 3, k = 0; y < y0 + h - 3; y += 9, k++) for (let x = x0 + 2 + (k % 2) * 5; x < x0 + w - 4; x += 10) { ctx.fillStyle = pal[2]; ctx.fillRect(x, y, 7, 6); ctx.fillStyle = pal[3]; ctx.fillRect(x, y, 7, 1); }
    if (gt.look === 'propolis') { ctx.fillStyle = 'rgba(255,220,180,0.25)'; for (let y = y0 + 6; y < y0 + h; y += 23) ctx.fillRect(x0 + 3, y, 2, 10); }   // a shine on the resin
    return;
  }
  _drawGateLookH(gt);
};
const _drawSoftWallH = drawSoftWall;
drawSoftWall = (b, jx) => {
  if (b.look === 'crust') {                                                                 // old honey gone hard: pale gold, crystals, a crack or two
    const x0 = b.x0 * T + jx, y0 = b.y0 * T, w = (b.x1 - b.x0 + 1) * T, h = (b.y1 - b.y0 + 1) * T;
    const rnd = s => { const v = Math.sin(s * 127.1 + b.x0 * 311.7) * 43758.5453; return v - Math.floor(v); };
    ctx.fillStyle = '#2a2030'; ctx.fillRect(x0, y0, w, h);
    ctx.fillStyle = '#b8902e'; ctx.fillRect(x0 + 1, y0 + 1, w - 2, h - 2);
    ctx.fillStyle = '#e0c068'; ctx.fillRect(x0 + 1, y0 + 1, w - 2, 3); ctx.fillStyle = '#f6e6a8'; ctx.fillRect(x0 + 1, y0 + 1, w - 2, 1);
    for (let i = 0; i < w * h / 40; i++) { ctx.fillStyle = rnd(i) < 0.5 ? '#f6e6a8' : '#8a6a20'; ctx.fillRect(Math.round(x0 + 2 + rnd(i + 9) * (w - 4)), Math.round(y0 + 4 + rnd(i + 19) * (h - 6)), 2, 1); }
    ctx.fillStyle = '#6a4a14'; for (let i = 0; i < w / 40; i++) { const cx = x0 + 10 + rnd(i + 33) * (w - 20); for (let k = 0; k < 8; k++) ctx.fillRect(Math.round(cx + Math.sin(k + i) * 3), y0 + 3 + k * 3, 1, 3); }
    return;
  }
  _drawSoftWallH(b, jx);
};

// ---------- setting up a room ----------
function setupHiveRoom() {
  if (!inHive()) return;
  const d = room.def;
  if (world.flags.hiveMet && !world.flags.hiveWelcome) { world.flags.hiveWelcome = true; saveWorld(); }   // (a reload partway through the guards: they've let him in)
  if (d.flopLesson && d.npc && world.flags.learnedFlop) { d.npc.y = d.flopLesson.watch[1]; }               // the bumblebee stays where it dropped
  room.guardBump = 0; room.candyGone = false;
  applyGates(room, true);
}
const _setupPondRoomH = setupPondRoom;
setupPondRoom = () => { _setupPondRoomH(); setupHiveRoom(); };

// honey: the drips, and slow going on a floor of it. The guards' bump wearing off
const _checkEventsH = checkEvents;
checkEvents = dt => {
  _checkEventsH(dt);
  if (!inHive()) return;
  if (room.guardBump > 0) room.guardBump -= dt;
  for (const e of room.events) {
    if (e.kind !== 'drip') continue;
    e.t = (e.t || 0) - dt;
    if (e.t <= 0) { e.t = e.every * (0.7 + Math.random() * 0.6); part(e.x, e.y, 0, 50, 2.2, '#e8a020', 2, 300); }
  }
  const inHoney = (room.def.honey || []).some(([l, t, r, b]) => P.x > l && P.x < r && P.y > t && P.y <= b + 1);
  if (inHoney && P.ground) {                                                                // stuck in it: slow, and the next jump's a low one
    P.honey = 0.2; if (Math.abs(P.vx) > 70) P.vx = Math.sign(P.vx) * 70;
    if (Math.random() < dt * 6 && Math.abs(P.vx) > 10) part(P.x, P.y - 1, 0, -20, 0.4, '#e8a020', 1, 200);
  } else if (P.honey > 0) {
    P.honey -= dt;
    if (P.vy < -10 && !P.honeyJump) { P.vy *= 0.55; P.honeyJump = true; }
  }
  if (P.ground && !inHoney) P.honeyJump = false;
  if (inHoney && P.ground) P.honeyJump = false;
};
})();
