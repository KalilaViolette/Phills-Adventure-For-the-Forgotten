'use strict';
// ---------- the pictures in his picture book (10/29/2026) ----------
// Sitting with his book open in his lap, every page he turns has new pictures on it, the kind of cute things you'd
// find in a children's picture book. The first two pages are the sun and the fish that are drawn into his frames;
// after that the game draws each new pair on the open pages, over the frame, only where the pages show (not under his
// hands or the page that's turning). While a page is turning, the side it's lifting off already shows the next one
// underneath. When he gets the book out again he opens it where he left off (kept in the save), and after the last
// pages it goes round to the sun and the fish again. He turns the same number of pages as always.
const BOOK = (() => {
  const PAPER = ['#6e5838', '#c4b286', '#e2d4aa', '#f4eccc'];                       // (the book's own paper colors, phill_props.py)
  const INK = { g: '#6ea860', G: '#52884c', b: '#6092ce', r: '#ce463c', y: '#f0c446', k: '#463834', o: '#e8843c', w: '#faf8ec', p: '#c478aa',
    n: '#aa6e46', c: '#a8b4c6', P: '#e8a0b4' };
  // each picture is 7 across and 6 down
  const PICS = {
    duck: ['...yy..', '...ykoo', 'y..yy..', 'yyyyyy.', '.yyyy..', 'bbbbbbb'],
    flower: ['..ppp..', '.ppypp.', '..ppp..', '...g...', '.gg.g..', '...g...'],
    cat: ['o.....o', 'oo...oo', 'okoooko', 'oooPooo', '.ooooo.', '.......'],
    heart: ['.rr.rr.', 'rrrrrrr', 'rrrrrrr', '.rrrrr.', '..rrr..', '...r...'],
    moon: ['y....y.', '..yy...', '.yy...y', '.yy....', '..yy.y.', 'y......'],
    star: ['...y...', '..yyy..', 'yyyyyyy', '.yyyyy.', '.yy.yy.', 'y.....y'],
    apple: ['...kg..', '...k...', '.rrkrr.', 'rrrrrrr', 'rrrrrrr', '.rr.rr.'],
    butterfly: ['pp...pp', 'ppp.ppp', 'pppkppp', '.pbkbp.', 'bb.k.bb', 'b.....b'],
    rainbow: ['..rrr..', '.rooor.', 'royyyor', 'oyg.gyo', 'yg...gy', 'g.....g'],
    cloud: ['..ccc..', '.ccccc.', 'ccccccc', '.......', '.b.b.b.', 'b.b.b..'],
    bear: ['n.....n', 'nnnnnnn', 'nknnnkn', 'nnnknnn', '.nnnnn.', '..n.n..'],
    balloon: ['..rrr..', '.rrrrr.', '.rrwrr.', '..rrr..', '...k...', '..k....'],
    house: ['...r...', '..rrr..', '.rrrrr.', '.nnnnn.', '.nbnkn.', '.nnnkn.'],
    tree: ['..ggg..', '.gGggg.', 'ggggGgg', '.gggg..', '...n...', '...n...'],
    bunny: ['..P.P..', '..c.c..', '..ccc..', '.ckckc.', '.ccccc.', '..ccc..'],
    carrot: ['..g.g..', '...g...', '..ooo..', '..oo...', '..oo...', '...o...'],
    frog: ['.g...g.', 'gkg.gkg', 'ggggggg', 'gGrrrGg', '.ggggg.', 'g.g.g.g'],
    ladybug: ['...k...', '.rrkrr.', 'rkrkrkr', 'rrrkrrr', '.rkrkr.', '..rrr..'],
    sailboat: ['...ry..', '..rryy.', '.rrryyy', '...k...', 'nnnnnnn', 'bbbbbbb'],
    whale: ['......b', '.bbbb.b', 'bbbbbbb', 'bkbbbbb', '.bbbbb.', '.......'],
    mushroom: ['.rrrrr.', 'rrwrrwr', 'rrrrrrr', '..ccc..', '..ccc..', '.ccccc.'],
    strawberry: ['..ggg..', '.rgrgr.', 'rrrrrrr', 'ryrrryr', '.rrrrr.', '..rrr..'],
    owl: ['n.....n', 'nnnnnnn', 'yknnnky', 'nnnonnn', '.nnnnn.', '..o.o..'],
    caterpillar: ['.......', '.....rr', '.gg.gkr', 'gGggGrr', 'g.g.g..', '.......'],
    turtle: ['.......', '..GgG..', '.GgGgGg', 'GGGGGkg', '.g...g.', '.......'],
    bee: ['..c.c..', '...c...', '.ykyko.', 'ykykyky', '.ykyky.', '.......'],
    car: ['.......', '..bbb..', '.bwbwb.', 'bbbbbbb', '.k...k.', '.......'],
    kite: ['...p...', '..pyp..', '.pyypp.', '..pyp..', '...p.k.', '....k.k'],
    cupcake: ['...r...', '.PPPPP.', 'PPPPPPP', '.ooooo.', '.onono.', '..ooo..'],
    penguin: ['..kkk..', '.kwkwk.', '.kkokk.', 'kkwwwkk', '.kwwwk.', '.o...o.'],
    snowman: ['..kkk..', '..ccc..', '..ckc..', '.ccccc.', '.ckccc.', '.ccccc.'],
    umbrella: ['..rrr..', '.rbrbr.', 'rbrbrbr', '...k...', '...k...', '..kk...'],
  };
  const SPREADS = [['duck', 'flower'], ['cat', 'heart'], ['moon', 'star'], ['apple', 'butterfly'], ['rainbow', 'cloud'], ['bear', 'balloon'], ['house', 'tree'], ['bunny', 'carrot'],
    ['frog', 'ladybug'], ['sailboat', 'whale'], ['mushroom', 'strawberry'], ['owl', 'caterpillar'], ['turtle', 'bee'], ['car', 'kite'], ['cupcake', 'penguin'], ['snowman', 'umbrella']];   // (the second eight added the same day)
  // where the open pages show in each of his book frames (the frame's top layer, 64 x 64): columns 22 to 40, rows 39
  // to 47, '#' where the page shows. Worked out from phill_sit.py's own drawing, his hands and the turning page left out
  const X0 = 22, Y0 = 39, SPINE = 31, LEFT = 24, RIGHT = 32, PY = 41;              // (the pictures go at columns 24 and 32, rows 41 to 46)
  const MASKS = {
    lap_1: ['...................', '#########.#########', '#########.#########', '.########.########.', '..#######.#######..', '..#######.#######..', '..#######.#######..', '..#######.#######..', '.########.########.'],
    flip_1: ['...................', '#########..........', '#########..........', '.########..........', '..#######.........#', '..#######.......###', '..#######.....#####', '..#######...#######', '.########.#########'],
    flip_2: ['...................', '#####......########', '######....#########', '.######...#########', '..######..#########', '..######..#########', '..######..#########', '..#######.#########', '.########.#########'],
    flip_3: ['...................', '..........#########', '..........#########', '..........#########', '..........#########', '..........#########', '..#.......#########', '..###.....#########', '.#######..#########'],
    happy_1: ['...................', '#########.#########', '#########.#########', '#########.#########', '#########.#########', '#########.#########', '#########.#########', '#########.#########', '#########.#########'],
  };
  MASKS.lap_2 = MASKS.lap_1; MASKS.happy_2 = MASKS.happy_1;
  const cache = new Map();
  function pageColor(x, y, pic, px0) {
    const p = pic && PICS[pic], lx = x - px0, ly = y - PY;
    if (p && ly >= 0 && ly < 6 && lx >= 0 && lx < 7) { const ch = p[ly][lx]; if (ch !== '.') return INK[ch]; }
    const xx = x - X0, yy = y - (Y0 + 1);
    return xx === 9 ? PAPER[1] : (xx + yy) % 6 ? PAPER[2] : PAPER[3];
  }
  // a frame's pages with these two pictures on them (null: that side's left as the frame has it)
  function overlay(frame, left, right) {
    const key = frame + '|' + left + '|' + right;
    let c = cache.get(key); if (c) return c;
    c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), m = MASKS[frame];
    for (let r = 0; r < m.length; r++) for (let i = 0; i < m[r].length; i++) {
      if (m[r][i] !== '#') continue;
      const x = X0 + i, y = Y0 + r, side = x < SPINE ? left : x > SPINE ? right : null;
      if (side === null) continue;
      g.fillStyle = pageColor(x, y, side, x < SPINE ? LEFT : RIGHT); g.fillRect(x, y, 1, 1);
    }
    cache.set(key, c); return c;
  }
  const ALL = SPREADS.length + 1;                                                   // (and the sun and the fish, as drawn: page 0)
  const st = { next: null, get spread() { return ((world.bookPage || 0) % ALL + ALL) % ALL; }, set spread(v) { world.bookPage = v % ALL; } };
  const pics = n => (n % ALL) === 0 ? [null, null] : SPREADS[(n % ALL) - 1];
  function draw(name, fx, fy) {
    const m = /^r[sf]_(lap_1|lap_2|flip_1|flip_2|flip_3|happy_1|happy_2|lap_closed)_[RL]$/.exec(name);
    if (!m) return;
    const f = m[1];
    if (f === 'lap_closed') { if (st.next !== null) { st.spread = st.next; st.next = null; } return; }   // (shut: it opens on the same pages next time)
    if (f.startsWith('flip')) { if (st.next === null) st.next = st.spread + 1; }
    else if (st.next !== null) { st.spread = st.next; st.next = null; }
    const [l, r] = pics(st.spread), nr = st.next !== null ? pics(st.next)[1] : r;   // (turning: the right side already shows the next one underneath)
    if (!l && !nr) return;
    ctx.drawImage(overlay(f, l, nr), fx, fy);
  }
  return { draw, PICS, SPREADS, st };
})();
