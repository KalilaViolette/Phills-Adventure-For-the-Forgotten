'use strict';
// ---------- rooms: loaded one at a time, next door ones ahead of time, everything else thrown away ----------
// Each room lives in its own file (rooms/<region>/<room>.js) that just calls ROOM({...}).
// While Phill's in a room, the rooms its doors lead to get loaded quietly in the background (their file and
// their pictures), so walking through a door is instant behind a short fade. Anything farther away gets unloaded:
// its file's data is dropped, its script tag removed, and its pictures let go.
const Rooms = (() => {
  const defs = {};       // room files that are loaded, by id
  const tags = {};       // the <script> tag for each one
  const waiting = {};    // callbacks waiting on a room that's still loading
  const failed = {};     // rooms whose file couldn't be loaded (or that don't exist), so whatever's waiting on one can give up
  let wanted = new Set();
  const artOf = def => { const a = def.art || {}; return [a.far, ...(a.layers || []).map(l => l.src), a.main, a.front, ...Object.keys(a.pieces || {}).map(k => a.pack + '#piece_' + k), ...(a.uses || [])].filter(Boolean); };

  window.ROOM = def => {
    if (!wanted.has(def.id)) { tags[def.id] && tags[def.id].remove(); delete tags[def.id]; return; }   // not needed anymore by the time it arrived
    def._art = artOf(def);
    if (def.art && def.art.pack) Assets.pack(def.art.pack, def.art.parts);   // where each picture sits in the room's packed file
    for (const src of def._art) Assets.use(src);
    defs[def.id] = def;
    for (const f of waiting[def.id] || []) f(def);
    delete waiting[def.id];
  };
  function load(id, cb) {
    wanted.add(id);
    if (defs[id]) { if (cb) cb(defs[id]); return; }
    if (cb) (waiting[id] = waiting[id] || []).push(cb);
    if (tags[id]) return;
    const file = (window.ROOM_FILES || {})[id];
    if (!file) { console.warn('no room called', id); failed[id] = true; return; }
    delete failed[id];
    const s = document.createElement('script');
    s.src = file + (window.BUILD ? '?v=' + window.BUILD : ''); s.async = true;   // (the build tag: a fresh copy after every update)
    s.onerror = () => { console.warn('could not load room', id); failed[id] = true; if (tags[id] === s) { s.remove(); delete tags[id]; } };   // (the tag goes, so asking again tries again)
    document.head.appendChild(s); tags[id] = s;
  }
  function unload(id) {
    wanted.delete(id);
    const def = defs[id];
    if (def) for (const src of def._art) Assets.release(src);
    delete defs[id]; delete waiting[id];
    if (tags[id]) { tags[id].remove(); delete tags[id]; }
  }
  // keep just these rooms (the one he's in and the ones next door), load any that aren't loaded yet
  function keep(ids) {
    for (const id of [...wanted]) if (!ids.has(id)) unload(id);
    for (const id of ids) load(id);
  }
  const ready = id => { const d = defs[id]; return !!d && d._art.every(src => Assets.ready(src)); };
  return { load, unload, keep, ready, failed: id => !!failed[id], get: id => defs[id], loaded: () => Object.keys(defs), wanted: () => [...wanted] };
})();

// ---------- the room he's in right now (built fresh from its file every time he walks in) ----------
let room = null;
function buildRoom(def) {
  const r = {
    def, id: def.id, W: def.w, H: def.h, pxW: def.w * T, pxH: def.h * T, viewBottom: def.viewBottom || def.h * T,
    map: new Uint8Array(def.w * def.h),
    items: (def.items || []).filter(it => !world.has[it.id]).map(it => Object.assign({ bob: Math.random() * 6, got: 0, hidden: !!(it.after && !world.flags[it.after]) }, it)),   // `after`: not there till that flag is set (a boss's reward)
    events: (def.events || []).map(e => Object.assign({ cool: 0, inside: false }, e)),
    hints: (def.hints || []).map(h => Object.assign({ a: 0 }, h)),
    ball: null,
  };
  if (typeof practiceHints === 'function') practiceHints(r);
  const code = { '.': 0, '#': 1, '=': 2, '^': 3, '~': 4, '%': 5 };   // ~ deep water, % a slick of Grime (hurts like thorns, but nothing to bounce off)
  def.tiles.forEach((row, y) => { for (let x = 0; x < def.w; x++) r.map[y * def.w + x] = code[row[x]] || 0; });
  // the natural ground (10/15/2026): where the ground's edge runs through a tile (a bump, dirt packed in a corner, a
  // ledge's rounded lip) the room file has that tile pixel by pixel, so he stands on what's drawn
  r.detail = null;
  if (def.detail) {
    const bin = atob(def.detail.bits); r.detail = new Array(def.w * def.h);
    def.detail.tiles.forEach((idx, k) => {
      const m = new Uint8Array(256);
      for (let i = 0; i < 256; i++) m[i] = (bin.charCodeAt(k * 32 + (i >> 3)) >> (7 - (i & 7))) & 1;
      r.detail[idx] = m;
    });
  }
  // one-way slopes (10/15/2026): a line along the top of something drawn, like the squirrel's root. He walks up and
  // down it, jumps up through it from underneath, and drops through it with down and jump, same as a shelf
  // (a side way, 10/27/2026: a slope the room marks in rampsUp is one he only walks onto holding up, so walking along
  // the main way he passes where it branches off. Landing on it or already on it, it's like any other)
  const sideWays = new Set(def.rampsUp || []);
  r.ramps = (def.ramps || []).map((pts, i) => [pts, sideWays.has(i)]).filter(([p]) => p.length > 1).map(([pts, up]) => {
    const x0 = pts[0][0], x1 = pts[pts.length - 1][0], ys = new Float32Array(x1 - x0 + 1); let k = 0;
    for (let x = x0; x <= x1; x++) {
      while (k < pts.length - 2 && pts[k + 1][0] < x) k++;
      const [ax, ay] = pts[k], [bx, by] = pts[k + 1];
      ys[x - x0] = bx === ax ? ay : ay + (by - ay) * (x - ax) / (bx - ax);
    }
    return { x0, x1, ys, up };
  });
  r.grip = new Set();                                         // rough walls the velcro grip catches on (bark, old wood)
  for (const [x0, y0, x1, y1] of def.grip || []) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) r.grip.add(x + ',' + y);
  r.gates = (def.gates || []).map(g => ({ ...g, open: false }));
  applyGates(r, true);
  // walls that break: crumbly roots, the root curtain, the hardened log. Once broken they stay broken
  r.breaks = (def.breaks || []).map(b => ({ ...b, hp0: b.hp, broken: !!world.flags[b.flag || b.id], shake: 0 }));
  // secrets: a wall drawn as plain ground (with a crack), and the passage behind it painted over till he's been through
  for (const b of r.breaks) { const c = (def.covers || {})[b.id]; if (c && def.art.pieces) { b.cover = c; b.coverA = world.flags['seen_' + b.id] ? 0 : 1; } }
  for (const b of r.breaks) for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) r.map[y * r.W + x] = b.broken ? 0 : 1;   // broken ones stay open next time too
  return r;
}
// gates: tiles that stay solid until he has what they need (the bedroom door won't let him out without his things)
function applyGates(r, quiet) {
  for (const g of r.gates) {
    const open = g.flag ? !!world.flags[g.flag] : hasAll(g.need);
    if (open === g.open && !quiet) continue;
    g.open = open;
    for (let y = g.y0; y <= g.y1; y++) for (let x = g.x0; x <= g.x1; x++) r.map[y * r.W + x] = open ? 0 : 1;
  }
}
// outside the room counts as solid, except where a door opens onto that edge
function tile(tx, ty) {
  if (!room) return 1;
  if (ty < 0 || ty >= room.H) {                       // doors in the floor or ceiling (falling down into the next room)
    if (typeof bossLocked === 'function' && bossLocked()) return 1;   // shut while a boss fight's on
    const edge = ty < 0 ? 'top' : 'bottom', x = tx * T + T / 2;
    for (const d of room.def.doors) if (d.edge === edge && x >= d.a && x < d.b) return 0;
    return 1;
  }
  if (tx < 0 || tx >= room.W) {
    if (typeof bossLocked === 'function' && bossLocked()) return 1;
    const edge = tx < 0 ? 'left' : 'right', y = ty * T + T / 2;
    for (const d of room.def.doors) if (d.edge === edge && y >= d.a && y < d.b) return 0;
    return 1;
  }
  return room.map[ty * room.W + tx];
}
function boxSolid(l, t, r, b) {
  const x0 = Math.floor(l / T), x1 = Math.floor((r - 0.001) / T), y0 = Math.floor(t / T), y1 = Math.floor((b - 0.001) / T);
  const det = room && room.detail;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const m = det && x >= 0 && x < room.W && y >= 0 && y < room.H ? det[y * room.W + x] : null;
    if (m) {                                                   // a tile the ground's edge runs through: check its pixels
      const px0 = Math.max(0, Math.floor(l) - x * T), px1 = Math.min(T - 1, Math.floor(r - 0.001) - x * T);
      const py0 = Math.max(0, Math.floor(t) - y * T), py1 = Math.min(T - 1, Math.floor(b - 0.001) - y * T);
      for (let py = py0; py <= py1; py++) for (let px = px0; px <= px1; px++) if (m[py * T + px]) return true;
    } else if (tile(x, y) === 1) return true;
  }
  return false;
}
// is this one pixel ground
function solidPx(x, y) {
  const tx = Math.floor(x / T), ty = Math.floor(y / T);
  const m = room && room.detail && tx >= 0 && tx < room.W && ty >= 0 && ty < room.H ? room.detail[ty * room.W + tx] : null;
  if (m) return !!m[(Math.floor(y) - ty * T) * T + Math.floor(x) - tx * T];
  return tile(tx, ty) === 1;
}
// the top of the ground under x, looking down from y (up to `down` px) and up a little (up to `up` px): where
// something standing at x should have its feet. null if there's nothing there
function groundY(x, y, down = 24, up = 8) {
  let yy = Math.floor(y);
  if (solidPx(x, yy)) { let k = 0; while (k < up && solidPx(x, yy - 1)) { yy--; k++; } return solidPx(x, yy - 1) ? null : yy; }
  for (let k = 0; k < down; k++) { yy++; if (solidPx(x, yy)) return yy; }
  return null;
}
// the top of a one-way slope at x, if there's one between y - above and y + below (the nearest one to y)
function rampY(x, y, below = 0.5, above = 0.5, mainOnly = false) {
  if (!room || !room.ramps || !room.ramps.length) return null;
  const xi = Math.round(x); let best = null;
  for (const rp of room.ramps) {
    if (xi < rp.x0 || xi > rp.x1 || (mainOnly && rp.up)) continue;   // (mainOnly: not the side ways, see rampsUp)
    const sy = rp.ys[xi - rp.x0];
    if (sy >= y - above && sy <= y + below && (best === null || Math.abs(sy - y) < Math.abs(best - y))) best = sy;
  }
  return best;
}
// moving sideways from x0 to x1 with his feet at y: if they were on or above a one-way slope at x0 and would be
// under it at x1, the slope's top at x1 (so he rides up onto it instead of passing through). null if not. A slope
// rising more than 8 px in one step is more like a wall, and he goes on through that
function rampCross(x0, x1, y, mainOnly = false) {
  if (!room || !room.ramps || !room.ramps.length) return null;
  const a = Math.round(x0), b = Math.round(x1); if (a === b) return null;
  let best = null;
  for (const rp of room.ramps) {
    if (a < rp.x0 || a > rp.x1 || b < rp.x0 || b > rp.x1 || (mainOnly && rp.up)) continue;
    const ya = rp.ys[a - rp.x0], yb = rp.ys[b - rp.x0];
    if (y <= ya + 0.5 && y > yb && y - yb <= 8 && (best === null || yb > best)) best = yb;
  }
  return best;
}
function boxGrip(l, t, r, b) {                      // any rough bark (velcro grip) in the box
  const x0 = Math.floor(l / T), x1 = Math.floor((r - 0.001) / T), y0 = Math.floor(t / T), y1 = Math.floor((b - 0.001) / T);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (room.grip.has(x + ',' + y)) return true;
  return false;
}
function boxHas(l, t, r, b, v) {
  const x0 = Math.floor(l / T), x1 = Math.floor((r - 0.001) / T), y0 = Math.floor(t / T), y1 = Math.floor((b - 0.001) / T);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (tile(x, y) === v) return true;
  return false;
}

// ---------- walking through a door: fade out, swap rooms, fade in ----------
const FADE = 0.2;
const trans = { state: 'none', t: 0, to: null, door: null };
function goTo(id, door) {
  if (trans.state !== 'none') return;
  Object.assign(trans, { state: 'out', t: 0, to: id, door });
  Rooms.load(id);
}
function updateTrans(dt) {
  if (trans.state === 'out') { trans.t += dt; if (trans.t >= FADE) { trans.state = 'wait'; trans.t = 0; } }
  if (trans.state === 'wait') {
    trans.t += dt;
    if (Rooms.ready(trans.to)) { enterRoom(trans.to, trans.door); trans.state = 'in'; trans.t = 0; }
  } else if (trans.state === 'in') { trans.t += dt; if (trans.t >= FADE) trans.state = 'none'; }
}
// ---------- a doorway that's a hole in the back wall (10/27/2026) ----------
// Walking at one, he turns his back to us and walks up into it, smaller as he goes and lost in the dark, then the room
// changes. Coming in through one he walks out of it toward us, then turns the way the door faces. The door's walkIn
// (from the room builder): turn, the spot on the floor in front of it; into, where he's gone; scale, his size there
const WALKIN_SPEED = 38, WALKIN_TURN = 0.15;         // px a second along the way in, and the moment he stands turned first
function startWalkIn(d, out) {
  const w = d.walkIn, len = Math.hypot(w.into[0] - w.turn[0], w.into[1] - w.turn[1]);
  P.walkIn = { d, out, t: 0, dur: len / WALKIN_SPEED + WALKIN_TURN };
  P.vx = P.vy = 0; P.atk = null; P.roll = 0; P.dash = 0; P.charge = 0; P.idleBit = null; P.ground = true;
  const at = out ? w.into : w.turn; P.x = P.px = at[0]; P.y = P.py = at[1]; P.fallTop = P.y;
}
function walkInK() {                                 // how far along: 0 at the turn spot, 1 at the far end (going in, after the turn)
  const wi = P.walkIn, k = Math.max(0, Math.min(1, (wi.out ? wi.t : wi.t - WALKIN_TURN) / (wi.dur - WALKIN_TURN)));
  return wi.out ? 1 - k : k;
}
function updateWalkIn(dt) {
  const wi = P.walkIn, w = wi.d.walkIn;
  wi.t += dt; P.px = P.x; P.py = P.y;
  const k = walkInK();
  P.x = w.turn[0] + (w.into[0] - w.turn[0]) * k; P.y = w.turn[1] + (w.into[1] - w.turn[1]) * k; P.fallTop = P.y;
  if (wi.t < wi.dur) return;
  if (wi.out) { P.walkIn = null; P.facing = wi.d.f || P.facing; }
  else if (trans.state === 'none') goTo(wi.d.to, wi.d.toDoor);
}
const transDark = () => trans.state === 'out' ? trans.t / FADE : trans.state === 'wait' ? 1 : trans.state === 'in' ? 1 - trans.t / FADE : 0;

function enterRoom(id, doorId) {
  const def = Rooms.get(id);
  if (def.stub) { showCard(def); return; }    // not built yet
  room = buildRoom(def);
  setupRoomThings();                           // the room's own things, set up from what's already happened
  if (typeof setupWildlife === 'function') setupWildlife();
  const d = doorId && doorId !== '@rest' && doorId !== '@perch' && def.doors.find(o => o.id === doorId);
  const at = doorId === '@rest' && def.rest ? { x: def.rest.x - 12, y: def.rest.y, f: 1 } : doorId === '@perch' && def.perch ? { x: def.perch.x - 36, y: def.perch.y, f: 1 } : d ? { x: d.keepX && P.x != null ? Math.max(d.a + 8, Math.min(d.b - 8, P.x)) : d.x, y: d.y, f: d.keepX && P.facing ? P.facing : d.f } : def.spawn || def.doors[0];   // no starting spot: the first door   // keepX: carries on from where he fell
  const fell = P.fallTop != null && P.y != null ? Math.max(0, P.y - P.fallTop) : 0, vy0 = P.vy || 0;   // how far he'd already fallen, and how fast, in the room he's leaving
  placePlayer(at.x, at.y, at.f);
  P.walkIn = null; if (d && d.walkIn) startWalkIn(d, true);           // in through a hole in the back wall: out of it toward us
  // still falling from the room above: he carries on at the speed he was going, and the splat counts only how far he's
  // really fallen (10/15/2026: dropping a few tiles down into the mole's workshop he splatted, because a
  // way in from the top used to count as a 400 px fall already). A long fall through a few rooms still adds up
  if (d && d.falling) { P.vy = Math.min(tune.maxFall, Math.max(vy0, 120)); P.ground = false; P.fallTop = at.y - fell; }
  clearParts(); motes.length = 0; itemPops.length = 0; bubble = null;
  endScene(); clearActors(); P.held = null; P.pinned = null; P.slowT = 0; P.paper = null; P.crayon = null; sceneFade.a = 0; letterbox.a = 0;
  cam.snap = true; updateCam(0);
  world.room = id; world.door = d ? doorId : doorId === '@rest' || doorId === '@perch' ? doorId : null;
  if (def.mapAt) world.seen[id] = true;
  saveWorld();
  spawnFoes(); talk = null; mapView = null; if (typeof setupBoss === 'function') setupBoss(); if (typeof setupRootwoodRoom === 'function') setupRootwoodRoom(); if (typeof setupPondRoom === 'function') setupPondRoom();
  music.play(def.music, 'bar');                                      // (room to room: the new song waits for the old one's bar)
  // this room and the ones next door stay loaded, everything else goes
  Rooms.keep(new Set([id, ...def.doors.map(o => o.to), ...(def.next || [])]));
  // the room's own cutscene, if it has one (it decides from what's already happened whether to play)
  const sc = def.scene && SCENES[def.scene] && SCENES[def.scene](def);
  if (sc) playScene(sc.steps || sc, sc.opts);
}
