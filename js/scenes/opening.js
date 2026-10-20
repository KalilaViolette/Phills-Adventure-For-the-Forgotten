'use strict';
// ---------- the opening: out into the backyard, the crow, the flight, the nest, the fall ----------
// Each room's scene decides from what's already happened whether to play. Positions are in pixels (16 per tile).
const CARRY = ['carry_1', 'carry_2', 'carry_3', 'carry_4'], FLY = ['fly_1', 'fly_2', 'fly_3', 'fly_4'];

// the backyard: he steps out and stares at everything. Way up over the park, a bird is circling
SCENES.backyard = () => {
  if (world.flags.snatched) return [run(() => goTo('flight', null))];   // came back to a save made mid-snatch
  addActor('speck', { anim: FLY, fps: 6, scale: 0.22, layer: 'back',
    path: t => { const a = t * 0.7; return [58 * 16 + Math.cos(a) * 140, 3 * 16 + Math.sin(a) * 26, Math.sin(a) > 0]; } });
  if (world.flags.yardAwe) return null;
  return [
    run(() => { world.flags.yardAwe = true; saveWorld(); }),
    bars(true), wait(0.3),
    walkTo(7 * 16),
    pose('look_up', 0, 1), camTo(20 * 16, 9 * 16, 1.1),
    run(() => twinkle(P.x + 6, P.y - 40, 10)), wait(1.6),
    pose(null), camBack(), wait(0.4), bars(false),
  ];
};

// sitting down on the warm stone to draw... and the crow. He scribbles away, a shadow sweeps over the lawn, he looks up
SCENES.snatch = () => {
  const X = 50 * 16 + 8, G = 30 * 16;
  return [
    bars(true), walkTo(X), face(1), wait(0.15),
    ...sitDown(), ...getPaper('#e2604a'),
    drawFor(1.6),
    together(drawFor(0.5), run(() => { music.play(null); delete actors.speck; })),
    together(drawFor(1.0), run(() => { addActor('shadow', { kind: 'shadow', x: X - 520, y: G + 1, rx: 52, ry: 5, layer: 'back', alpha: 0.32 }); sfx.rustle(1.4); }),
      moveActor('shadow', X + 620, G + 1, 0.8, { linear: true })),
    pose('sit_look', 0), run(() => { popup(P.x, P.y - 44, '!', '#ffd36b', true); sfx.sting(); }), wait(0.7),
    run(() => { addActor('crow', { x: X - 380, y: G - 330, frame: 'dive', layer: 'front' }); sfx.caw(); }),
    moveActor('crow', X - 26, G - 54, 0.55),
    run(() => {                                   // got him
      P.held = 'crow'; P.paper = null; P.crayon = null; Object.assign(actors.crow, { anim: CARRY, fps: 10 });
      shakeT = 0.25; shakeA = 3; sfx.squeak(); sfx.flap(); puff(X, G - 10, 12, 80, '#ffffff', 60);
      world.flags.snatched = true; saveWorld();
    }),
    camFollow('crow'),
    together(moveActor('crow', X + 560, G - 460, 1.9, { arc: -30 }), (t) => { if (Math.floor(t / 0.36) !== Math.floor((t - 1 / 120) / 0.36)) sfx.flap(); return t > 1.9; }),
    fadeTo(1, 0.4),
    run(() => goTo('flight', null)),
  ];
};

// carried off over the neighborhood and the park. His crayons slip out of his backpack one by one and fall into the trees
SCENES.flight = () => {
  P.held = 'crow';
  addActor('crow', { x: -90, y: 150, anim: CARRY, fps: 9, layer: 'front' });
  const cols = ['#e2604a', '#f08a3a', '#f5c542', '#5aa84a', '#4a7ad8', '#7a4a9a', '#a8703f', '#1e1a24'];
  const drops = [1.0, 1.7, 2.3, 2.9, 3.5, 4.1, 4.8, 5.8];      // the black one last, right by the big oak
  let dropped = 0, gearGone = false;
  return [
    run(() => { sceneFade.a = 1; music.play('wind'); }), bars(true), camFollow('crow'), fadeTo(0, 0.8),
    together(
      moveActor('crow', 2250, 140, 6.6, { linear: true, wave: 10 }),
      (t) => {
        const c = actors.crow;
        if (dropped < drops.length && t >= drops[dropped]) {
          addActor('crayon' + dropped, { kind: 'crayon', col: cols[dropped], x: c.x + 2, y: c.y + 52, vx: (Math.random() * 2 - 1) * 50, vy: -60, spin: (Math.random() < 0.5 ? -1 : 1) * (6 + Math.random() * 6), layer: 'front' });
          if (dropped === 0) popup(c.x, c.y + 6, '!', '#ffd36b', true);
          sfx.tink(); dropped++;
        }
        if (!gearGone && t >= 6.25) {                        // and last of all, the heaviest things: his sword and shield, right over the big oak
          gearGone = true;
          addActor('sword', { kind: 'sword', x: c.x + 4, y: c.y + 54, vx: 30, vy: -40, spin: 7, layer: 'front' });
          addActor('shield', { kind: 'shield', x: c.x - 2, y: c.y + 56, vx: -40, vy: -70, spin: -5, layer: 'front' });
          world.has.gear = false; world.flags.lostGear = true; saveWorld(); useSheets('nogear');
          popup(c.x, c.y + 6, '!', '#ffd36b', true); sfx.clank ? sfx.clank() : sfx.tink();
        }
        if (Math.random() < 0.5) part(c.x + 260 + Math.random() * 160, c.y - 140 + Math.random() * 300, -520, 0, 0.5, 'rgba(255,255,255,0.55)', 1, 0);   // wind rushing past
        if (Math.floor(t / 0.4) !== Math.floor((t - 1 / 120) / 0.4)) sfx.flap();
        return t > 6.6;
      }),
    moveActor('crow', 2430, 70, 1.4, { arc: -24 }),
    fadeTo(1, 0.6),
    run(() => goTo('nest', null)),
  ];
};

// the nest: he comes to and rubs his eyes, and there's the crow with its back to him, busy with the lining. It turns
// round, and sees that what it brought home isn't fluff. It hops closer for a look. He doesn't wait to find out why:
// he runs for it, left along the branch, out onto the thin end. The crow calls after him and comes after him, too late
SCENES.nest = def => {
  const c = def.crow;
  if (!world.flags.wokeInNest) addActor('crow', { x: c.x, y: c.y, anim: ['perch_1', 'perch_2', 'perch_1', 'perch_1', 'perch_2'], fps: 1.3, layer: 'back' });   // only for the wake-up: after that it's out, and it comes back to land when he finds the cape (it was sitting there waiting)
  const tw = def.art.pieces && def.art.pieces.twig;                                           // the thin end of the branch: drawn with the room, kept apart so it can fall
  if (!world.flags.branchSnapped) addActor('twig', tw ? { kind: 'twig', x: tw[0], y: tw[1], w: tw[2], h: tw[3], piece: def.art.pack + '#piece_twig', layer: 'back' } : { kind: 'twig', x: 4 * 16, y: 22 * 16, len: 10 * 16 + 2, layer: 'back' });
  if (world.flags.wokeInNest) return null;
  const BR = 22 * 16, crow = () => actors.crow;
  return [
    run(() => { sceneFade.a = 1; }), bars(true), pose('lie_1', 0, 1), wait(0.5), fadeTo(0, 1.6), pose('lie_2', 0.8),
    pose('lie_open', 0.35), pose('lie_1', 0.1), pose('lie_open', 0.45), pose('lie_bleary', 0.5), pose('wake_up', 0.3), pose('sit_3', 0.35),
    pose('rub_1', 0.3), pose('rub_2', 0.3), pose('rub_1', 0.25), pose('sit_3', 0.3), pose('sit_1', 0.12), pose(null), wait(0.25),
    face(1), wait(0.4),                                                                       // ...and there it is
    run(() => { popup(P.x + 4, P.y - 44, '!', '#ffd36b', true); sfx.squeak(); }), pose('hurt', 0.45), pose(null), wait(0.3),
    run(() => { const a = crow(); a.anim = null; a.frame = 'perch_1'; a.flip = true; }), wait(0.5),   // the crow turns round
    run(() => { popup(crow().x - 6, crow().y - 84, '?', '#ffd36b', true); sfx.chirp ? sfx.chirp() : sfx.caw(); }), wait(0.6),
    run(() => { crow().frame = 'perch_2'; }), moveActor('crow', P.x + 76, BR, 0.45, { arc: -14 }), run(() => { crow().frame = 'perch_1'; }),   // a hop closer, to see
    wait(0.35),
    run(() => { popup(P.x + 4, P.y - 44, '!', '#ff8a70', true); sfx.squeak(); }), pose('hurt', 0.25, -1), pose(null),
    run(() => { P.autoX = -60; P.scared = true; world.flags.wokeInNest = true; saveWorld(); }),   // he runs for it, crying
    together(
      seq([wait(0.45), run(() => { const a = crow(); a.frame = 'caw'; popup(a.x - 10, a.y - 84, '!', '#ffd36b', true); sfx.caw(); }), wait(0.35),
           run(() => { crow().frame = 'perch_2'; }), moveActor('crow', () => Math.max(20 * 16, P.x + 70), BR, 0.7, { arc: -30 }),   // it calls after him, and comes after him
           run(() => { crow().frame = 'caw'; sfx.caw(); }), wait(0.3),
           run(() => { crow().frame = 'perch_2'; }), moveActor('crow', () => Math.max(16 * 16, P.x + 60), BR, 0.6, { arc: -24 }),   // another hop, but it won't follow him out onto the thin end
           run(() => { crow().frame = 'caw'; })]),
      seq([until(() => P.x < 44 * 16 && P.ground), run(() => doJump()),                        // a hop over the nest's rim
           until(() => P.x < 13 * 16 + 4), run(() => { snapBranch(); P.autoX = null; })]),    // too late: the thin end goes
    ),
    until(() => false),                                                                       // the fall takes it from here
  ];
};

// down at the bottom: he picks himself up in the dark
SCENES.oakfall = () => null;
SCENES.landed = () => {
  const gear = room.items.find(it => it.id === 'gear' && !it.got);
  return [
    until(() => P.ground && P.splat <= 0 && P.ko <= 0),
    run(() => music.play(null)), bars(true), wait(0.4),
    pose('look_up', 0.9), pose(null), face(1), wait(0.35), face(-1), wait(0.35), face(1), wait(0.2),
    pose('look_down', 0.5), pose(null),
    ...(gear ? [                                                              // his sword and shield, lying where they fell
      run(() => { P.scared = false; popup(P.x + 4, P.y - 44, '!', '#ffd36b', true); sfx.sting(); }), wait(0.5),
      walkTo(gear.x - 10), face(1), pose('look_down', 0.4), pose(null),
      run(() => { if (!gear.got) takeItem(gear); }), wait(0.9),
    ] : []),
    run(() => { P.scared = false; }), bars(false),
  ];
};
