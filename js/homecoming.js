'use strict';
// ---------- bringing them home (10/31/2026) ----------
// The toys-come-home rule (Warren.md): lost toys out in the park, and Phill bringing them back to the Warren, where
// they stay and the town shows it. This is that as one kind of quest, so each new one is a few lines in HOMECOMING
// and nothing else: the pieces lying out in the park, whoever in the town knows them, and what changes once they're
// home. The game does the rest the same way every time:
//   - each piece lies where it's put, moving a little so it catches the eye, and picking it up brings up the item
//     window (js/itemcard.js) saying what it is and who to take it to
//   - his journal (js/quests.js) gets the quest the first time he picks one up, with four steps: find one, show it to
//     whoever knows it, find the rest, bring them all back. Their face goes on his map while he's carrying any
//   - talking to them with a piece on him: what they say the first time, while there are more to find, and when he's
//     got them all. Then they're home, and drawn where they live from then on
// One entry a quest:
//   id       its name in the save (hc_<id>: how many pieces he's found, hc_<id>_shown, hc_<id>_home)
//   title, region   for his journal
//   who      the voice and the one he takes them to (the kind of character: mabel, clank...), whoRoom where they are,
//            whoAt where they stand there (for the face on his map)
//   piece    the item window's words (name, found, use, take) and draw(g, x, y, t, k): one piece, its feet at x, y
//   pieces   where each one lies: { room, x, y }. Empty means none are out yet, and the quest doesn't start
//   lines    what they say: first (shown the first one), more (with some still out there), all (taking them all back)
//   home     where they live after, and how they're drawn there: { room, x, y, draw(g, x, y, t) }
const HOMECOMING = [
  // the paper dolls (Warren.md, "The paper dolls"): a chain of five torn apart and blown round the Playground. Mabel
  // tapes them back together, and they live on the wall by Tock's board. Where the pieces are isn't picked yet, so
  // none are out, and the lines and the doll pictures are first goes
  {
    id: 'paperdolls', title: 'The paper dolls', region: 'The Warren',
    who: 'mabel', whoRoom: 'mendlane', whoAt: { x: 216, y: 288 },
    piece: {
      name: 'A torn paper doll',
      found: 'A paper doll, cut out of a cereal box, with a crayon face. One hand is still holding a scrap of the next doll.',
      use: 'There were more of them once, a whole chain. Somebody in the Warren would know where they belong.',
      take: 'Take it to Mabel, at her stall on Mend Lane in the Warren.',
      draw: (g, x, y, t, k) => drawPaperDoll(g, x, y, k, Math.sin(t * 3.1) * 0.35, true),
    },
    pieces: [],
    lines: {
      first: ["Oh. Oh, that's one of the paper dolls. Five of them, there were, all holding hands.",
        "They hung on the wall by Tock's board till the wind had them. Blew them right out over the Playground.",
        "Find me the rest and I'll tape them up again. I keep tape for exactly this sort of thing."],
      more: ['Still some of them out there. Five, all holding hands.'],
      all: ['[happy] All five. Hold that end. No, the other end. There.', "Hand in hand again. I'll put them back up by the board on my way home."],
    },
    home: { room: 'townsquare', x: 600, y: 438, draw: (g, x, y, t) => {
      g.fillStyle = 'rgba(8,6,10,0.4)'; g.fillRect(x - 27, y - 15, 58, 16);                // their shadow on the wall
      for (let i = 0; i < 5; i++) {
        drawPaperDoll(g, x - 22 + i * 11, y, i, Math.sin(t * 1.2 + i * 0.8) * 0.04);
        if (i) { g.fillStyle = 'rgba(230,230,210,0.75)'; g.fillRect(x - 28 + i * 11, y - 9, 2, 3); }   // a bit of tape at each join
      }
    } },
  },
];

// a paper doll, about 12 wide and 15 tall, its feet at (x, y): cut from a cereal box, a crayon face and dress. k: which
// one (its crayon). tilt: radians. torn: the scrap of the next one's hand still on it
function drawPaperDoll(g, x, y, k = 0, tilt = 0, torn = false) {
  const PAPER = '#efe4c8', EDGE = '#5a4630', SHADE = '#cdbf9c', FACE = '#3a2a20', CRAYON = ['#d04040', '#3a7ad0', '#3a9a4a', '#e0a020', '#9a4ac0'];
  g.save(); g.translate(Math.round(x), Math.round(y)); g.rotate(tilt);
  const px = (a, b, w, h, c) => { g.fillStyle = c; g.fillRect(a, b, w, h); };
  px(-3, -15, 6, 1, EDGE); px(-4, -14, 8, 5, EDGE); px(-3, -14, 6, 4, PAPER);               // the head
  px(-6, -9, 12, 1, EDGE); px(-6, -8, 12, 3, EDGE); px(-5, -8, 10, 2, PAPER);               // the arms out to the sides, holding hands
  px(-3, -6, 6, 1, EDGE); px(-4, -5, 8, 3, EDGE); px(-3, -5, 6, 2, PAPER);                  // the body
  px(-4, -2, 3, 2, EDGE); px(1, -2, 3, 2, EDGE); px(-3, -2, 1, 1, PAPER); px(2, -2, 1, 1, PAPER);   // the legs
  px(-3, -11, 6, 1, SHADE);                                                              // a fold across it
  px(-2, -13, 1, 1, FACE); px(1, -13, 1, 1, FACE); px(-1, -11, 2, 1, CRAYON[k % 5]);         // a crayon face
  px(-3, -5, 6, 1, CRAYON[k % 5]);                                                       // and a crayon dress
  if (torn) { px(6, -9, 3, 1, EDGE); px(6, -8, 2, 2, EDGE); px(6, -8, 1, 1, PAPER); px(8, -7, 1, 1, EDGE); }
  g.restore();
}

const HOME = window.HOME = (() => {
  const key = h => 'hc_' + h.id;
  const found = h => world[key(h)] || 0;
  const isHome = h => !!world.flags[key(h) + '_home'];
  const gotPiece = (h, i) => !!world.flags[key(h) + '_p' + i];
  const carrying = h => !!world.has[key(h)];

  // the item window's words and the journal's quest, one each
  function build(h) {
    ITEM_INFO[key(h)] = { name: h.piece.name, found: h.piece.found, use: h.piece.use, who: h.piece.take, where: h.whoRoom,
      draw: (x, y, g) => h.piece.draw(g, x, y + 8, 0, 0), used: () => !carrying(h) };
    const n = Math.max(1, h.pieces.length), face = MAP_FACES[h.who] ? { face: h.who, x: h.whoAt.x, y: h.whoAt.y, carry: key(h) } : undefined;
    const q = { id: key(h), kind: 'side', who: 'phill', title: h.title, region: h.region, starts: [key(h) + '>=1'],
      steps: [
        { text: 'Find ' + h.piece.name.replace(/^An? /, 'a '), done: [key(h) + '>=1'] },
        { text: 'Show it to ' + h.who[0].toUpperCase() + h.who.slice(1), done: [key(h) + '_shown'], room: h.whoRoom, map: face },
        { text: n > 1 ? `Find the rest of them (${n} in all)` : 'Find the rest of them', done: [key(h) + '>=' + n] },
        { text: 'Bring them all back', done: [key(h) + '_home'], room: h.whoRoom, map: face },
      ] };
    const at = QUESTS.findIndex(x => x.id === q.id);
    if (at >= 0) QUESTS[at] = q; else QUESTS.push(q);
  }
  HOMECOMING.forEach(build);
  // where one's pieces lie, put out from somewhere else (a test, the dev tab): its quest's count goes with it
  function setPieces(id, list) { const h = HOMECOMING.find(x => x.id === id); if (!h) return; h.pieces = list; build(h); }

  // picking a piece up
  function pickUp(h, i, p) {
    world.flags[key(h) + '_p' + i] = true; world[key(h)] = found(h) + 1; world.has[key(h)] = true; saveWorld();
    sfx.pickup(); twinkle(p.x, p.y - 10, 10);
    popup(P.x, P.y - 54, h.piece.name.toLowerCase(), '#e8e6f0', true);
    if (window.itemCard && found(h) === 1) { itemCard.pending++; setTimeout(() => { itemCard.pending--; itemCard.show(key(h)); }, 1000); }   // (the window the first time: it says the same after)
  }
  function update() {
    if (!room || scene || talk) return;
    for (const h of HOMECOMING) h.pieces.forEach((p, i) => {
      if (p.room === room.id && !gotPiece(h, i) && !isHome(h) && Math.abs(P.x - p.x) < 14 && Math.abs(P.y - p.y) < 24) pickUp(h, i, p);
    });
  }
  function draw() {
    if (!room) return;
    const t = performance.now() / 1000;
    for (const h of HOMECOMING) {
      h.pieces.forEach((p, i) => {
        if (p.room !== room.id || gotPiece(h, i) || isHome(h)) return;
        h.piece.draw(ctx, p.x, p.y - 1 - Math.max(0, Math.sin(t * 1.7 + i)) * 3, t + i, i);   // caught in a draught: lifting and settling
        if (Math.sin(t * 3 + p.x) > 0.97) twinkle(p.x, p.y - 14, 1);
      });
      if (isHome(h) && h.home.room === room.id) h.home.draw(ctx, h.home.x, h.home.y, t);
    }
  }

  // talking to whoever knows them, with a piece on him
  function talkSteps(h, n) {
    const say = lines => t => { if (t === 0) startTalk(h.who, lines, { npc: n }); return !talk; };
    const steps = [walkTo(n.x + (P.x < n.x ? -2.6 : 2.6) * T), faceTo(n.x)];
    const all = found(h) >= Math.max(1, h.pieces.length);
    if (all) return [...steps,
      run(() => { delete world.has[key(h)]; world.flags[key(h) + '_shown'] = true; saveWorld(); sfx.pickup(); popup(P.x, P.y - 54, 'gave them back', '#e8e6f0'); }),
      pose('reach', 0.3), pose(null), say(h.lines.all),
      run(() => { world.flags[key(h) + '_home'] = true; saveWorld(); if (sfx.idea) sfx.idea(); popup(P.x, P.y - 54, 'home again', '#ffd36b', true); })];
    if (!world.flags[key(h) + '_shown']) return [...steps, say(h.lines.first), run(() => { world.flags[key(h) + '_shown'] = true; saveWorld(); })];
    return [...steps, say(h.lines.more)];
  }
  const knows = n => n && HOMECOMING.find(h => h.who === n.kind && carrying(h) && !isHome(h));
  const _interact = interact;
  interact = () => {
    const near = nearby(), n = near && near.kind === 'npc' && near.npc, h = !scene && knows(n);
    if (h) { P.vx = 0; playScene(talkSteps(h, n)); return true; }
    return _interact();
  };
  const _check = checkEvents;
  checkEvents = dt => { _check(dt); update(); };
  const _draw = drawNpc;
  drawNpc = () => { _draw(); draw(); };
  return { list: HOMECOMING, found, isHome, carrying, setPieces };
})();
