'use strict';
// ---------- the world state: the only thing that lasts from room to room, and what gets saved ----------
// Rooms themselves are thrown away when Phill leaves them. Anything that has to be remembered
// (what he's picked up, what he's learned, which gates are open) lives here instead. It's tiny.
// three save slots (the title menu, 10/17/2026). Slot 1 keeps the old save's name, so a save from before carries on.
// The last slot played is remembered and is the one Continue picks up
const SAVE_SLOTS = 3;
const slotKey = n => n === 1 ? 'phill-forgotten-save' : 'phill-forgotten-save-' + n;
let saveSlot = 1;
try { saveSlot = Math.min(SAVE_SLOTS, Math.max(1, parseInt(localStorage.getItem('phill-forgotten-slot'), 10) || 1)); } catch (e) {}
function useSlot(n) { saveSlot = n; try { localStorage.setItem('phill-forgotten-slot', String(n)); } catch (e) {} }
// (the one reader for the title's slot list and for loading: checkSave below says what's usable)
function readSlot(n) {
  let raw = null; try { raw = localStorage.getItem(slotKey(n)); } catch (e) { return null; }
  if (!raw) return null;
  let s = null; try { s = checkSave(JSON.parse(raw)); } catch (e) {}
  if (!s) keepBroken(n, raw);
  return s;
}
function deleteSlot(n) { try { localStorage.removeItem(slotKey(n)); } catch (e) {} }
const NEW_WORLD = () => ({
  v: 1,
  room: 'bedroom', door: null,     // where he is (door: which way he came in, null = the room's starting spot)
  has: {},                          // things he's picked up: backpack, paper, crayons, gear (sword and shield)
  learned: {},                      // moves he's figured out: roll
  flags: {},                        // little things that happened once (watched the ball, rolled under the bookcase)
  maxHealth: 5,
  acorns: 0,                        // Rootwood's currency
  pebbles: 0,                       // the Pond's (smooth pebbles)
  feathers: 0,                      // the Old Oak's (crow feathers)
  marbles: 0,                       // the Playground's
  seen: {},                         // rooms he's been in (the black crayon draws them on his map)
  rest: null,                       // the last place he rested: { room, x, y }. Knocked out, he wakes up there
  piles: [],                        // acorns spilled where he got knocked out: { room, x, y, n }. Never lost
  marks: [],                        // things marked on his map after the squirrel told him where they are
  pins: {}, wearing: [], slots: 2,  // pins and buttons he owns, the ones he's wearing, and how many he can wear
  sword: 0,                         // the beetle's work on his sword, how many steps of js/sword.js are done: 0 plain, 1 the oak gall's stain, 2 cherry, 3 etched
  swordV: 2,                        // (saves from before 10/30/2026 counted 1 cherry and 2 etched, with no oak gall: checkSave moves them up one)
  cotton: 0,                        // cotton tufts bought (three make a puff)
  playSec: 0,                       // time played (shown on the save slots)
  savedAt: 0,                       // when it was last saved
});
let world = NEW_WORLD();
let unlockAll = false;              // the "Unlock all moves" button, for testing. Not saved

function loadWorld() {
  const s = readSlot(saveSlot);
  if (s) { world = s; return true; }
  return false;
}

// ---------- checking a save, and putting back anything a reload cut off (the save audit, 10/17/2026) ----------
// A save from an older build fills in whatever it's missing from a new game. One that's broken (a room that doesn't
// exist, a list that isn't a list) isn't offered at all: the slot shows empty, and its text is kept under its own name
// (the slot's name plus -unreadable) so starting over in that slot doesn't lose it
const isObj = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const roomOk = id => typeof id === 'string' && Object.prototype.hasOwnProperty.call(window.ROOM_FILES || {}, id);
const COTTON_COUNTS = ['cottonBought', 'snailCotton', 'owlCotton', 'monkeyCotton', 'mabelCotton', 'beeCotton', 'hiveBeeCotton'];   // cotton bought from each seller
const SAVED_COUNTS = ['buttons', 'seeds', 'sprinkles', ...COTTON_COUNTS];
function checkSave(s) {
  if (!isObj(s) || s.v !== 1) return null;
  const w = NEW_WORLD();
  for (const k in w) {
    if (s[k] === undefined || w[k] === null) continue;                     // missing: the new game's. (room and door, rest: below)
    const want = w[k], got = s[k];
    if (isObj(want) ? !isObj(got) : Array.isArray(want) ? !Array.isArray(got) : typeof want === 'number' ? !Number.isFinite(got) : typeof got !== typeof want) return null;
  }
  for (const k of SAVED_COUNTS) if (s[k] !== undefined && !Number.isFinite(s[k])) return null;
  if (s.door !== undefined && s.door !== null && typeof s.door !== 'string') return null;
  const out = Object.assign(w, s);
  if (s.swordV === undefined) {                                                              // a save from before the oak gall: what the beetle did for acorns is one step later now,
    out.swordV = 2;                                                                          // and the gall counts as found and used (10/30/2026)
    if (out.sword > 0) { out.sword = Math.min(3, out.sword + 1); out.has.gall = true; }
  }
  out.piles = out.piles.filter(p => isObj(p) && roomOk(p.room) && Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.n));
  out.marks = out.marks.filter(m => isObj(m) && roomOk(m.room) && Number.isFinite(m.x) && Number.isFinite(m.y));     // the same for what's marked on his map (a broken one stopped the game opening the map: the fix check, 10/18/2026)
  out.wearing = [...new Set(out.wearing.filter(id => typeof id === 'string'))];
  if (out.rest !== null && !(isObj(out.rest) && roomOk(out.rest.room))) out.rest = null;      // a resting spot that's no good: just forgotten
  if (!roomOk(out.room)) {                                                                    // a room that isn't there: back to where he rested, if there's one
    if (!out.rest) return null;
    out.room = out.rest.room; out.door = '@rest';
  }
  settleWorld(out);
  return out;
}
function keepBroken(n, raw) { try { const k = slotKey(n) + '-unreadable'; if (localStorage.getItem(k) !== raw) localStorage.setItem(k, raw); } catch (e) {} }

// What he picked up (or the lesson he saw) is saved the moment it happens, and what it gives him comes a little after,
// at the end of its scene. A reload in between kept the one and lost the other, for good. Loading puts it back, worked
// out from what's saved, so loading twice gives nothing twice:
// - a lesson he saw: its move
// - the raincoat and the sneaker: waterproof and the velcro grip (the cape's crow comes back in the nest: oak.js)
// - cotton: one tuft for every one picked up and every one bought, and a puff for each three
// - a memory picked up: its puff (health is 5, one for each memory, one for each three tufts)
// Nothing's ever taken away here: anything that's already more stays as it is
const AFTER_SEEN = { sawWoodpecker: 'charge', sawDragonfly: 'airdodge', rodeSpinner: 'spin', sawDandelion: 'burst', sawPillbug: 'rollslash', learnedSpark: 'spark', learnedFlap: 'flap', learnedFlop: 'flop' };
const AFTER_HAS = { raincoat: 'waterproof', sneaker: 'velcro' };
function settleWorld(w) {
  for (const f in AFTER_SEEN) if (w.flags[f]) w.learned[AFTER_SEEN[f]] = true;
  for (const id in AFTER_HAS) if (w.has[id]) w.learned[AFTER_HAS[id]] = true;
  const got = Object.keys(w.has).filter(k => w.has[k]);
  const tufts = got.filter(k => k.startsWith('cotton_')).length + COTTON_COUNTS.reduce((n, k) => n + (w[k] || 0), 0);
  if (w.cotton < tufts) w.cotton = tufts;
  const puffs = 5 + got.filter(k => k.startsWith('memory_')).length + Math.floor(w.cotton / 3);
  if (w.maxHealth < puffs) w.maxHealth = puffs;
  return w;
}
// (nothing's saved till he's actually playing: the game loads the slot's room behind the title menu, and that alone
// shouldn't make an empty slot look used or move a slot's saved time)
function saveWorld() { if (!started) return; world.savedAt = Date.now(); try { localStorage.setItem(slotKey(saveSlot), JSON.stringify(world)); } catch (e) {} }
function resetWorld() { world = NEW_WORLD(); try { localStorage.removeItem(slotKey(saveSlot)); } catch (e) {} }
const hasAll = list => (list || []).every(id => world.has[id]);

// what he can do right now. He starts with very little: running, jumping, crawling, grabbing ledges.
// The rest comes as he finds his things and learns.
const MOVES = {
  attack: () => !!world.has.gear,     // swinging his sword (side, up, down bounce, low)
  guard: () => !!world.has.gear,      // the shield
  roll: () => !!world.learned.roll,   // figured out in the hallway
  airDodge: () => !!world.learned.airdodge,   // watching the dragonfly (the Pond)
  squeak: () => !!world.learned.squeak,       // the old bullfrog (the Pond)
  swim: () => !!world.learned.waterproof,     // waterproof: deep water doesn't sink him (comes from another region)
  glide: () => !!world.has.cape && (!GLIDE_IN_CANOPY || !!world.learned.glide),   // the handkerchief cape (the Old Oak)
  velcro: () => !!world.learned.velcro,       // velcro patches on his hands: clings to rough walls (the Old Oak)
  flap: () => !!world.learned.flap,           // the cape flap, a jump in midair (the Greenhouse)
  spin: () => !!world.learned.spin,           // riding the merry-go-round (the Playground)
  burst: () => !!world.learned.burst,         // the dandelion clocks (the Playground)
  parry: () => !!world.learned.parry,     // the squirrel teaches it (Rootwood)
  charge: () => !!world.learned.charge,   // watching the woodpecker (Rootwood)
  rollSlash: () => !!world.learned.rollslash,   // the big lunging swing out of a roll (the pill bug, in the Old Oak)
  spark: () => !!world.learned.spark,         // static spark: a ranged shot (the Greenhouse, not built yet)
  flop: () => !!world.learned.flop,           // the belly flop (the Hive, not built yet)
};
// The glide comes later than the cape (10/23/2026): he ties the cape on at the oak, but it's only a cape till he learns
// to glide with it in the Canopy, riding on Purl's back. The Canopy isn't built yet, so for now the cape still glides
// from the start (or the Pond's and the Playground's glide gates would shut him in). Once it's built: true here, and
// world.learned.glide set by the ride
const GLIDE_IN_CANOPY = false;
const can = m => unlockAll || (MOVES[m] ? MOVES[m]() : false);

// ---------- keeping saves safe (10/29/2026) ----------
// The saves live in the browser's own storage for this site. Two things look after them:
// - the browser's asked to keep that storage for good, so it won't clear it on its own when the computer or phone is
//   low on space (some do, phones most of all). Clearing the browser's data by hand still clears it
// - a save can go out to a file (Downloads, like any other file) and come back in from one, from the pause menu and
//   the title menu. That's a backup that survives the browser's data being cleared, and the way to take a save to
//   another computer or a phone
function keepSaves() {
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => { if (!p) navigator.storage.persist(); }).catch(() => {}); } catch (e) {}
}
const pad2 = n => String(n).padStart(2, '0');
function saveFileName(n, w) {
  const d = new Date(w && w.savedAt || Date.now()), h = d.getHours();
  return `Phill's Adventure - slot ${n} - ${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}-${d.getFullYear()} ${(h % 12) || 12}-${pad2(d.getMinutes())} ${h < 12 ? 'AM' : 'PM'}.json`;
}
// the slot's save as a file in Downloads (playing: saved first, so it's right up to now)
function saveToFile(n = saveSlot) {
  if (started && n === saveSlot) saveWorld();
  const w = readSlot(n); if (!w) return false;
  const text = JSON.stringify({ game: "Phill's Adventure: For the Forgotten", slot: n, save: w }, null, 1);
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = saveFileName(n, w);
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return true;
}
// pick a save file and read it: done(world) with a good one, done(null, why) with anything else (nothing's changed yet)
function pickSaveFile(done) {
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json'; inp.style.display = 'none';
  inp.addEventListener('change', () => {
    const f = inp.files && inp.files[0]; inp.remove();
    if (!f) return done(null, 'none');
    if (f.size > 2e6) return done(null, "That file's too big to be a save.");
    f.text().then(t => {
      let j = null; try { j = JSON.parse(t); } catch (e) {}
      const w = j && checkSave(j.save !== undefined ? j.save : j);                     // (a bare save works too)
      done(w || null, w ? null : "That file isn't a save from this game, or it's broken.");
    }, () => done(null, "That file couldn't be read."));
  });
  document.body.appendChild(inp); inp.click();
}
// a save from a file into a slot, and the game picked up from it
function loadFromFile(w, n = saveSlot) {
  try { localStorage.setItem(slotKey(n), JSON.stringify(w)); } catch (e) { return false; }
  useSlot(n); if (!loadWorld()) return false;
  if (typeof foesAllBack === 'function') foesAllBack();
  startGame();
  return true;
}
