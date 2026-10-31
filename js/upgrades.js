'use strict';
// ---------- his upgrades: more rolls, a tougher shield (10/31/2026) ----------
// From the fairness plan (To do.md): a simple upgrade system, things like an extra roll or more shield. Enemies are
// tuned against Phill with none of these and checked again with all of them, so they're room to breathe, never a
// way past an enemy's answer. Two kinds so far, one line each:
//   roll     one more roll's worth of stamina. The stamina bar gets a piece longer, and the shield bar stretches to
//            match, so the two always line up (that's not more shield, only so they line up)
//   shield   blocks wear the shield down less (block: how much of the usual a block takes off). The bar stays the
//            same length: more shield is each block costing less, the way the thimble pin works, and they stack
//            with it
// Who gives each one, where, and for what isn't settled, so nothing in the game hands them out yet. giveUpgrade(id)
// is how whoever does will, and the dev tab can give or take them away to try them.
//   id     its name in the save (world.ups)
//   name   what the popup says he got
//   what   what it does, for the menus
const UPGRADES = [
  { id: 'roll_1', kind: 'roll', name: 'a fourth roll', what: 'one more roll before he runs out of breath' },
  { id: 'shield_1', kind: 'shield', block: 0.8, name: 'a tougher shield', what: 'blocks wear his shield down less' },
  { id: 'shield_2', kind: 'shield', block: 0.8, name: 'a tougher shield still', what: 'blocks wear his shield down less again' },
];
const hasUpgrade = id => !!(world.ups && world.ups[id]);
const upgradesOf = kind => UPGRADES.filter(u => u.kind === kind && hasUpgrade(u.id));
// his stamina when it's full: 100 for the three rolls everyone starts with, and a roll's worth more for each extra
const enMax = () => 100 + upgradesOf('roll').length * tune.rollCost;
// how much of the usual a block takes off his shield (the thimble pin is on top of this, in player.js)
const shieldBlock = () => upgradesOf('shield').reduce((k, u) => k * u.block, 1);
function giveUpgrade(id, quiet) {
  const u = UPGRADES.find(x => x.id === id); if (!u || hasUpgrade(id)) return false;
  world.ups = world.ups || {}; world.ups[id] = true; saveWorld();
  if (u.kind === 'roll' && typeof P !== 'undefined') P.en = enMax();                     // (filled up with it)
  if (!quiet) { popup(P.x, P.y - 54, 'got ' + u.name, '#ffd36b', true); if (sfx.idea) sfx.idea(); }
  return true;
}
function takeUpgrade(id) {
  if (!hasUpgrade(id)) return false;
  delete world.ups[id]; saveWorld();
  if (typeof P !== 'undefined') P.en = Math.min(P.en, enMax());
  return true;
}
