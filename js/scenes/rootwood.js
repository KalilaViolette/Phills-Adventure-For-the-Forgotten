'use strict';
// ---------- Rootwood: the black crayon, resting, the squirrel, the woodpecker, a memory ----------
const nod = () => [pose('look_down', 0.14), pose('idle_1', 0.12), pose('look_down', 0.14), pose('idle_1', 0.1)];
const shakeNo = () => [run(() => sfx.nope()), pose('shake_1', 0.13), pose('shake_2', 0.13), pose('shake_1', 0.13), pose('shake_2', 0.13), pose('idle_1', 0.05)];
const faceTo = x => run(() => { P.facing = x > P.x ? 1 : -1; });
let sceneText = null;              // words over the screen (a memory coming back). They stay until you press X
const showText = lines => t => {
  if (t === 0) { sceneText = { lines, t: 0, out: 0, skip: 0 }; talkIn.press = 0; }
  const st = sceneText, full = 0.4 + lines.length * 1.0;      // every line is in by then
  st.t = t + st.skip;
  if (talkIn.press && !st.out) { if (st.t > full) st.out = st.t; else st.skip = full - t + 0.01; }   // pressing early shows the rest
  talkIn.press = 0;
  if (st.out && st.t - st.out >= 0.5) { sceneText = null; return true; }
  return false;
};
const tempHint = (text, untilFlag) => run(() => room.hints.some(h => h.practice && h.until === untilFlag) || room.hints.push({ text, l: 0, t: 0, r: room.pxW, b: room.pxH + 40, x: P.x, y: P.y - 62, a: 0, until: untilFlag }));

// the black crayon: right where it fell. He sits down and starts drawing where he's been
SCENES.blackCrayon = () => [
  run(() => { for (const id of ['nest', 'oakfall', 'roots']) world.seen[id] = true; saveWorld(); }),
  bars(true), wait(0.3), run(() => popup(P.x, P.y - 54, 'his black crayon', '#e8e6f0', true)), wait(0.8),
  ...sitDown(), ...getPaper('#1e1a24'), drawFor(2.4),
  ...putAway(), ...standUp(), bars(false),
  tempHint('{map}: look at your map', 'openedMap'),
];

// sitting on the cushion: move to get up, M to get his map out, or the shield button for his pins, all without standing up first
// A note stays up over him the whole time he's sitting saying what each button does. It used to be a popup that was
// gone in a second, so a friend couldn't find how to put pins on (playtest, 10/14/2026)
let restNote = null;
// little things he does sitting there when nothing's pressed (10/27/2026), made from the sitting pictures he has: a
// doodle on his paper, a stretch and a rub of his eyes, and now and then nodding off for a short nap. The same waits
// as standing (IDLE_WAIT in idle.js), never the same one twice in a row, anything pressed stops it. The ones that need
// new pictures (leaning back on his hands, kicking his feet, looking round, his map and book read sitting there) are
// on the to do list
const RS = (f, d, go) => ({ f, d, go });
const REST_BITS = {
  doodle: () => {
    const cols = ['#e2604a', ...Object.keys(IDLE_CRAYONS).filter(k => world.has[k]).map(k => IDLE_CRAYONS[k])], col = cols[Math.floor(Math.random() * cols.length)];
    const s = [RS('paper_1', 0.28), RS('paper_1b', 0.2, () => sfx.pickup()), RS('paper_2', 0.35), RS('paper_3', 0.55), RS('paper_4', 0.12, () => { P.paper = { marks: {} }; }),
      RS('paper_4', 0.3), RS('paper_1', 0.25, () => { P.crayon = col; })];
    const n = Math.round(rndIn(40, 64));
    for (let i = 0; i < n; i++) { s.push(RS('draw_' + ((i % 8) + 1), 0.125)); if (i === 24) s.push(RS('sit_look', 1.2)); }
    s.push(RS('sit_look', 1.0), RS('sit_3', 0.5), RS('paper_1', 0.2, () => { P.crayon = null; }), RS('paper_4', 0.25), RS('paper_3', 0.3, () => { P.paper = null; }),
      RS('paper_2', 0.25), RS('paper_1b', 0.15), RS('paper_1', 0.18), RS('sit_3', 0.3));
    return s;
  },
  stretch: () => [RS('stretch', 0.7, () => sfx.yawn()), RS('stretch_down', 0.25), RS('sit_3', 0.3), RS('rub_1', 0.1), RS('rub_2', 0.1), RS('rub_1', 0.1), RS('rub_2', 0.1), RS('rub_1', 0.1), RS('rub_2', 0.1), RS('sit_3', 0.5)],
  nap: () => {
    const s = [RS('stretch', 0.6, () => sfx.yawn()), RS('stretch_down', 0.2), RS('sit_3', 0.5), RS('wake_up', 0.25), RS('wake_lift', 0.2), RS('lie_bleary', 0.4), RS('lie_bleary_2', 0.4),
      RS('lie_open', 0.3), RS('lie_bleary', 0.3), RS('lie_bleary_2', 0.3)];
    for (let k = 0; k < 10; k++) s.push(RS(k % 2 ? 'lie_1' : 'lie_2', 1.3, () => { sfx.snore(k % 2 === 1); if (k % 2) popup(P.x - 17, P.y - 24, 'z', '#cfe0ff'); }));
    s.push(RS('lie_open', 0.15), RS('lie_1', 0.1), RS('lie_open', 0.2), RS('lie_bleary', 0.3), RS('wake_lift', 0.2), RS('wake_up', 0.3), RS('sit_3', 0.2),
      RS('stretch', 0.6), RS('stretch_down', 0.2), RS('rub_1', 0.1), RS('rub_2', 0.1), RS('rub_1', 0.1), RS('rub_2', 0.1), RS('sit_3', 0.4));
    return s;
  },
};
const REST_PICK = ['doodle', 'doodle', 'stretch', 'stretch', 'nap'];   // (the nap less often)
const restSit = () => {
  let sub = null, st = 0, bit = null, still = 0, wait = IDLE_WAIT[0], last = null;
  const stopBit = () => { if (!bit) return; bit = null; P.paper = null; P.crayon = null; P.story = { kind: 'scene', frame: 'sit_3', t: 0 }; };
  return (t, dt) => {
    if (t === 0) {
      talkIn.move = 0; sub = null; bit = null; still = 0; wait = IDLE_WAIT[0];
      const bits = [canMap() ? '{map}: map' : '', ownedPins().length ? '{guard}: pins' : '', 'move to get up'].filter(Boolean);
      restNote = { text: bits.join('   '), l: 0, t: 0, r: room.pxW, b: room.pxH + 40, x: P.x, y: P.y - 70, a: 0, sit: true };
      room.hints.push(restNote);
    }
    if (restNote) restNote.show = !sub && !bit && t > 0.9;
    if (sub) { if (sub(st, dt)) { sub = null; talkIn.move = 0; still = 0; } else st += dt; return false; }
    if (bit && (anyInput() || talkIn.move || mapWant || pinWant)) { stopBit(); still = 0; wait = IDLE_WAIT[0]; }
    if (bit) {                                                                    // one of the little things he does sitting there
      bit.st += dt;
      while (bit && bit.st >= bit.steps[bit.i].d) { bit.st -= bit.steps[bit.i].d; bit.i++; if (bit.i >= bit.steps.length) { stopBit(); still = 0; wait = IDLE_WAIT[1]; } else if (bit.steps[bit.i].go) bit.steps[bit.i].go(); }
      if (bit) P.story = { kind: 'scene', frame: bit.steps[bit.i].f, t };
      return false;
    }
    if (t > 0.3 && !anyInput() && !talkIn.move && (still += dt) >= wait) {
      const names = REST_PICK.filter(n => n !== last);
      last = names[Math.floor(Math.random() * names.length)];
      bit = { steps: REST_BITS[last](), i: 0, st: 0 };
      if (bit.steps[0].go) bit.steps[0].go();
      P.story = { kind: 'scene', frame: bit.steps[0].f, t };
      return false;
    }
    if (anyInput()) still = 0;
    if (mapWant && canMap()) { sub = seq(mapFromSitting()); st = 0; return false; }
    if (pinWant && ownedPins().length) { sub = seq(pinsFromSitting()); st = 0; return false; }
    const up = t > 0.3 && talkIn.move;
    if (up && restNote) { const n = restNote; restNote = null; n.show = false; setTimeout(() => { const i = room.hints.indexOf(n); if (i >= 0) room.hints.splice(i, 1); }, 600); }
    return up;
  };
};

// resting: he sits down on the spot and sews himself back up. He wakes up here if he gets knocked out
SCENES.rest = () => {
  const r = room.def.rest;
  return [
    walkTo(r.x - 12), face(1), ...sitDown(),
    run(() => {
      world.rest = { room: room.id, x: r.x, y: r.y }; world.rested = world.rested || {}; world.rested[room.id] = true; world.door = '@rest';
      const before = P.health; sewUp(); spawnFoes(); saveWorld();
      for (let i = 0; i < 20; i++) part(P.x + (Math.random() * 2 - 1) * 30, P.y - 10 - Math.random() * 30, 0, -10, 0.8, '#ffffff', 1, -6);
      sfx.stitch(); if (P.health > before) setTimeout(() => sfx.stitch(), 220);
      popup(P.x, P.y - 54, 'sewn up and rested', '#b4f4d4');
    }),
    wait(0.6),
    restSit(),                                                                         // stays sitting until you move
    pose('sit_1', 0.1), pose('turn', 0.08), pose(null),
  ];
};

// ---- the squirrel
// she sells what she knows (marked on his map), a few pins, and once the soldier's down, tufts of cotton
const SHOP = [
  { id: 'toldBurrow', what: 'the hidden burrow', cost: 14, done: () => world.flags.burrowWall, mark: { room: 'bramble', x: 44 * 16, y: 18 * 16 },
    line: "Okay so the thicket, past the thorns, over on the right, there's an old burrow back there. The wall in front of it's just roots. Crumbly ones. Whack it, whack it a bunch." },
  { id: 'toldCrayon', what: 'where the green crayon went', cost: 8, done: () => world.has.crayon_rootwood, mark: { room: 'bramble', x: 6.5 * 16, y: 9 * 16 },
    line: "Green. Same as your black one only green. It's up on a ledge in the thicket on the other side of the thorn pit. You can bounce off the thorns if you have to, it stings." },
  { pin: 'magnet', line: "Fridge magnet. Acorns roll right to it, I don't know why, it's been like that since I found it." },
  { pin: 'acorn_cap', line: "Acorn cap with a pin stuck through. When you wear it the litter drops more. I think. I counted once and it did." },
  { pin: 'thimble', line: "Thimble. Keeps that lid of yours from wearing out so quick when you block stuff." },
  { pin: 'stitch', line: "My aunt's needle, with the red thread. Two hits and you're patched up instead of three. She said a lot of things but that one's true." },
];
const COTTON_COST = [20, 27, 34];
const CHATTER = [
  ["*chk chk* Oh it's you. Good. Hi. Nobody comes by anymore."],
  ["Don't step in the black puddles. Or the purple ones. Or anything shiny, just don't."],
  ["I buried an acorn by the well last spring, or the one before, and I can't find it, so it's either a tree now or somebody ate it."],
  ['That woodpecker past the well. Tok tok tok tok. All day. All day long.'],
  ["There's a beetle under the oak who carves wood all day. He's grumpy. He's good though, go see him."],
];
function shopList() {
  const out = [];
  for (const s of SHOP) {
    if (s.pin) { if (!(world.pins || {})[s.pin]) out.push({ ...s, what: PINS[s.pin].name, cost: PINS[s.pin].cost }); }
    else if (!world.flags[s.id] && !(s.done && s.done())) out.push(s);   // not once he's found it himself
  }
  const c = world.cottonBought || 0;
  if (world.flags.soldierDown && c < COTTON_COST.length)
    out.push({ cotton: true, what: 'a tuft of cotton', cost: COTTON_COST[c], line: c ? 'Another one. Stuff it in somewhere.' : "Cotton. Clean cotton. I was going to line my nest with it but you need it more. Three and you've got a whole new puff." });
  return out;
}
SCENES.squirrel = npc => {
  if (!world.flags.metSquirrel) return squirrelFirst(npc);
  const steps = [walkTo(npc.x - 3 * T), faceTo(npc.x)];
  if (world.flags.soldierDown && !world.flags.squirrelRestocked) {
    world.flags.squirrelRestocked = true; saveWorld();
    steps.push(say('squirrel', "You got the soldier. *chk chk* You actually got him. Everybody's talking about it. Well, I'm talking about it, to everybody.", "I dug up some stuff I was saving. You pick first."));
  } else steps.push(say('squirrel', ...CHATTER[Math.floor(Math.random() * CHATTER.length)]));
  const left = shopList();
  if (!left.length) return [...steps, say('squirrel', "That's everything. Everything I know and everything I had. I'll bury more, come back later.")];
  let picked = -1;
  steps.push(ask('squirrel', `Okay, what do you want? You've got ${world.acorns || 0} acorns.`, [...left.map(s => `${s.what} (${s.cost} acorns)`), 'nothing, bye'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    const s = left[picked];
    if (!s) return true;
    if ((world.acorns || 0) < s.cost) { scene.steps.splice(scene.i + 1, 0, say('squirrel', "That's not enough. I counted. Twice.")); return true; }
    world.acorns -= s.cost; sfx.acorn();
    const after = [];
    if (s.pin) {
      world.pins = world.pins || {}; world.pins[s.pin] = true;
      after.push(run(() => { popup(P.x, P.y - 54, 'got the ' + PINS[s.pin].name, '#e8e6f0'); sfx.pickup(); }));
      if (!world.flags.pinHint) { world.flags.pinHint = true; after.push(say('squirrel', "Oh, you put pins on when you're resting. Sit down on a cushion and get your pins out.")); }
    } else if (s.cotton) {
      world.cottonBought = (world.cottonBought || 0) + 1;
      after.push(run(() => addCotton()));
    } else {
      world.flags[s.id] = true; world.marks.push(s.mark);
      after.push(run(() => popup(P.x, P.y - 54, 'marked on his map', '#e8e6f0')));
    }
    saveWorld();
    scene.steps.splice(scene.i + 1, 0, say('squirrel', s.line), ...after, ...nod());
    return true;
  });
  return steps;
};

// ---- the beetle under the oak: whittles all day, and for acorns he'll stain and etch Phill's sword
const SWORD_WORK = [
  { cost: 45, what: 'stain it', line: "Cherry stain. Soaks in deep, hardens the grain. Hold it still.", done: 'his sword, stained a deep cherry' },
  { cost: 90, what: 'etch it', line: "Going to burn a pattern down the blade. Burned wood's tougher. Always has been.", done: 'his sword, etched down the blade' },
];
SCENES.beetle = npc => {
  const steps = [walkTo(npc.x - 3.5 * T), faceTo(npc.x)];
  if (!world.flags.metBeetle) {
    world.flags.metBeetle = true; saveWorld();
    steps.push(run(() => { npcPose = { frame: 'beetle_idle_2', t: 0.6 }; }), wait(0.5),
      say('beetle', "*tk tk* Not a bottle cap. Good. Had enough of those chewing my roots.",
        "Let me see that stick. Pine. Somebody carved that careful. Soft, though.",
        "I can stain it. Hardens the grain, hits harder. Costs acorns."));
  } else steps.push(say('beetle', ['Mind the shavings.', '*tk* Back. Still soft, that sword?', 'Hm.'][Math.floor(Math.random() * 3)]));
  const job = SWORD_WORK[world.sword || 0];
  if (!job) return [...steps, say('beetle', "That's as good as wood from round here gets. Find me better wood somewhere else and we'll talk.")];
  let picked = -1;
  steps.push(ask('beetle', `Well? You've got ${world.acorns || 0} acorns.`, [`${job.what} (${job.cost} acorns)`, 'nothing, bye'], i => { picked = i; }));
  steps.push(t => {
    if (t > 0) return true;
    if (picked !== 0) return true;
    if ((world.acorns || 0) < job.cost) { scene.steps.splice(scene.i + 1, 0, say('beetle', "Not enough. I don't work for free.")); return true; }
    // paid and done in the same save (the save audit, 10/17/2026): the carving after is only for show. It used to save
    // the acorns gone first and the better sword at the end, so a reload in between kept the acorns and not the work
    world.acorns -= job.cost; world.sword = (world.sword || 0) + 1; sfx.acorn(); saveWorld();
    scene.steps.splice(scene.i + 1, 0, say('beetle', job.line), bars(true),
      (tt, dt) => { npcPose = { frame: 'beetle_carve_' + (Math.floor(tt * 6) % 2 + 1), t: 0.2 }; if (Math.floor(tt * 6) !== Math.floor((tt - dt) * 6)) sfx.tok(); return tt > 1.8; },
      run(() => { refreshSheets(); popup(P.x, P.y - 54, job.done, '#e8c8a0', true); twinkle(P.x + P.facing * 10, P.y - 20, 10, '#e8c8a0'); sfx.idea(); }),
      wait(0.8), bars(false), say('beetle', '*tk tk* There. Go hit something.'));
    return true;
  });
  return steps;
};
function squirrelFirst(npc) {
  return [
    bars(true), walkTo(npc.x - 4.5 * T), faceTo(npc.x),
    run(() => { npcPose = { frame: 'squirrel_alert', t: 0.8 }; sfx.chitter(1.4); }), wait(0.6),
    say('squirrel', "*chk chk chk* Oh. Oh, you're not one of them. You're soft. They're never soft.", "Sorry, sorry. I'm jumpy. Everybody down here's jumpy.", 'You came down from the big oak? Nobody comes down from there on purpose.'),
    ...nod(),
    say('squirrel', "There's this black muck coming up out of the ground, oily stuff. Grime, I call it. Everybody calls it that now. I think that was me.",
      'Where it gets into old trash the trash gets up and walks around. Bottle caps. Cans. The caps bite and the cans spit.',
      "And where it soaks in the Bramble comes up after it. Thorns. I used to have three ways home and now I've got one."),
    say('squirrel', "And the soldier. Tin one, full of the stuff. He marches up and down the clearing past the woodpecker's tree and he won't let anybody by.",
      "He's why we're all stuck down here. Me too."),
    ...nod(),
    say('squirrel', "You've got a sword. Kind of a sword. Do you know how to use that lid?"),
    ...shakeNo(),
    say('squirrel', "No. Okay. Hold it up and tap it right when something's about to hit you, right as it hits, and it knocks it back at them.", "I'll throw acorns at you. The soft ones. Mostly soft."),
    run(() => { world.learned.parry = true; world.flags.metSquirrel = true; saveWorld(); }),
    bars(false),
    ...parryLesson(npc),
    bars(true),
    say('squirrel', "*chk* That's it, that's a parry. Works on the bites, works on the cans' spit, sends it all right back.",
      "Oh, and the soldier. The only times anybody ever hurt him, he'd been knocked off his feet first. Otherwise he's tin all over.",
      "If you want to know where stuff is, ask me. I bury things everywhere so I know every hole in Rootwood. Costs acorns though."),
    bars(false),
  ];
}
// he gets his controls back while she throws: three good parries and he's got it
function parryLesson(npc) {
  let good = 0, thrown = 0, next = 1.0, said = 0;
  return [
    run(() => { P.story = { kind: 'scene', frame: null, t: 0, free: true }; scene.keepControl = true; tempHintOnce('tap {guard} right as it gets to you'); }),
    (t, dt) => {
      if (!P.story || !P.story.free) P.story = { kind: 'scene', frame: null, t: 0, free: true };
      next -= dt;
      if (next <= 0 && !shots.some(s => s.kind === 'acorn')) {
        thrown++; next = 1.5; npcPose = { frame: 'squirrel_throw', t: 0.3 }; sfx.swish();
        const sx = npc.x, sy = npc.y - 14, tx = P.x, ty = P.y - 20, time = 0.75;
        shots.push({ kind: 'acorn', x: sx, y: sy, vx: (tx - sx) / time, vy: (ty - sy) / time - 0.5 * 300 * time, g: 300, from: null, reflected: false, t: 0,
          onMeet: out => {
            if (out === 'parried') { good++; popup(npc.x, npc.y - 30, ['nice', 'again', 'there it is'][Math.min(2, good - 1)], '#e8b07a'); sfx.chitter(1.2); }
            else if (out === 'blocked') { if (said++ % 2 === 0) popup(P.x, P.y - 54, "that's a block. tap it right as it hits", '#cfd6e6'); }
            else popup(P.x, P.y - 54, 'bonk. try again', '#cfd6e6');
          },
          onReflectHit: s => { if (Math.abs(s.x - npc.x) < 12 && Math.abs(s.y - (npc.y - 10)) < 14) { npcPose = { frame: 'squirrel_alert', t: 0.5 }; sfx.bump(); return true; } return false; } });
      }
      return good >= 3;
    },
    run(() => { P.story = { kind: 'scene', frame: null, t: 0 }; scene.keepControl = false; for (const s of shots) s.dead = true; room.hints = room.hints.filter(h => h.until !== 'parryLearned_'); sfx.idea(); popup(P.x, P.y - 54, 'learned to parry', '#ffd36b', true); }),
    wait(0.8),
  ];
}
function tempHintOnce(text) { room.hints.push({ text, l: 0, t: 0, r: room.pxW, b: room.pxH + 40, x: room.def.npc.x - 60, y: room.def.npc.y - 70, a: 0, until: 'parryLearned_' }); }

// ---- the woodpecker: pulls its head way back, holds it, then hammers. Phill gets an idea
SCENES.woodpecker = def => {
  const w = def.woodpecker;
  return [
    bars(true), run(() => { P.vx = 0; }), faceTo(w.x), camTo(w.x - 40, w.y - 20, 0.8),
    run(() => { const a = actors.woodpecker; if (a) { a.anim = null; a.frame = 'wp_wind'; } sfx.windup(); }), wait(0.9),
    (t, dt) => {                                                                   // hammering away
      const a = actors.woodpecker; if (!a) return true;
      const k = Math.floor(t / 0.07);
      a.frame = k % 2 ? 'wp_peck_2' : 'wp_peck_1';
      if (k !== Math.floor((t - dt) / 0.07) && k % 2) { sfx.tok(); part(w.x + 8, w.y - 30, 40 + Math.random() * 60, -Math.random() * 60, 0.5, '#7e7870', 2, 300); }
      return t > 1.2;
    },
    run(() => { const a = actors.woodpecker; if (a) a.frame = 'wp_perch'; }),
    pose('look_up', 0.4), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.idea(); twinkle(P.x, P.y - 46, 8); }), wait(0.9),
    run(() => { world.learned.charge = true; saveWorld(); popup(P.x, P.y - 54, 'learned to wind up a big swing', '#ffd36b', true); }),
    pose(null), camBack(), wait(0.6), bars(false),
    tempHint('hold {atk} to wind up. let go when it flashes', 'chargedOnce'),
  ];
};

// ---- a memory of being loved: one more cotton puff
SCENES.memory = it => [
  bars(true), wait(0.4),
  run(() => { sceneFade.warm = true; sfx.memory(); }),
  showText(['a balloon on a string.', "his kid's birthday. balloons tied to every chair,", 'and his kid hugging him so tight his stitches creaked.']),
  run(() => {
    world.maxHealth += 1; P.maxHealth = world.maxHealth - (P.worn || 0); P.health = Math.min(P.maxHealth, P.health + 1); saveWorld();
    sceneFade.warm = false; puff(P.x, P.y - 22, 14, 60, '#ffffff', 60); sfx.stitch();
    popup(P.x, P.y - 54, 'one more cotton puff', '#fbf7ec', true);
  }),
  wait(1.0), bars(false),
];

// things a room in Rootwood sets up when he walks in
function setupRootwoodRoom() {
  const d = room.def;
  if (d.woodpecker) addActor('woodpecker', { kind: 'rw', x: d.woodpecker.x, y: d.woodpecker.y, anim: ['wp_perch', 'wp_perch', 'wp_perch', 'wp_perch', 'wp_peck_1', 'wp_peck_2', 'wp_peck_1', 'wp_perch'], fps: 4, layer: 'back' });
}
