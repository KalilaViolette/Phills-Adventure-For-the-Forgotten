'use strict';
// ---------- go to an area: a picker at the front of the menu that takes Phill straight to any room
// (10/17/2026, for testing, on a phone too). Grouped by region, in the order you'd come to them ----------
const AREA_NAMES = {
  bedroom: 'bedroom', hallway: 'hallway', backyard: 'backyard',
  flight: 'the flight', nest: "the crow's nest", oakfall: 'the fall from the oak',
  roots: 'under the oak', hollow: "the squirrel's hollow", litterpath: 'the litter path', bramble: 'the bramble thicket', burrow: 'the hidden burrow',
  well: 'the mushroom well', woodpecker: "the woodpecker's tree", clearing: 'the clearing', mossbank: 'the moss bank', ferns: 'the ferns',
  grimepool: 'the grime pool', undercroft: 'the undercroft', rootlattice: 'the root lattice', sunkroots: 'the sunk roots', trail: "the tin soldier's trail", eastedge: 'up and out of rootwood',
  reedbank: 'the reed bank', dock: 'the dock', lilypads: 'the lily pads', deepwater: 'deep water', stormdrain: 'the storm drain', shallows: 'the shallows', cattails: 'the cattails',
  dragonfly: 'the dragonfly', overlook: 'the overlook', sailboat: 'the sailboat', fishline: 'the fishing line', grotto: 'the grotto', sunken: 'the sunken', drainmouth: 'the drain mouth',
  foamline: 'the foam line', swan: 'the swan', fenceside: 'by the fence', silt: 'the silt',
  gate: 'the gate', woodchips: 'the woodchips', sandbox: 'the sandbox', spinner: 'the spinner', stormdrain_pg: 'the storm drain (playground)', slide: 'the slide',
  lostfound: 'lost and found', balloonwall: 'the balloon wall', picnic: 'the picnic', fountain: 'the fountain', swings: 'the swings', dandelions: 'the dandelions', drifts: 'the drifts',
  partytent: 'the party tent', jungle: 'the jungle gym', grate: 'the grate', underpass: 'the underpass', pipe: 'the pipe', culvert: 'the culvert', bins: 'the bins', puddle: 'the puddle',
  tires: 'the tires', bikes: 'the bikes',
  heartwood: 'the heartwood', knot: 'the knot', lowbough: 'the low bough', shaft: 'the shaft', rot: 'the rot', crown: 'the crown', highbranch: 'the high branch', westbough: 'the west bough',
  westdrop: 'the west drop', treetop: 'the treetop', boughend: "the bough's end", drey: "the squirrels' drey", barkface: 'the bark face',
  hillpath: 'the hill path', frontdoor: 'the front door', coldframes: 'the cold frames', pottingbench: 'the potting bench', lambsear: "the lamb's ear", tallhouse: 'the tall house',
  fernhouse: 'the fern house', boiler: 'the boiler room', bramblecore: 'the heart of the bramble', chrysalis: 'the chrysalis', orchids: 'the orchids', roofwalk: 'the roof',
  knothole: 'the knothole', landing: 'the landing', combhall: 'the comb hall', crust: 'the crust', stores: 'the honey stores', hoard: 'the hoard', drip: 'the drip',
  brood: 'the nursery', waxworks: 'the waxworks', pinata: "the piñata's hall", queen: "the queen's chamber", propolis: 'the propolis wall',
  chest: 'the chest', maintunnel: 'the main tunnel', townsquare: 'the town square', mendlane: 'mend lane', bunks: 'the bunks', moleshop: "the mole's shop", listenpost: 'the listening post', deepdig: 'the deep dig',
};
const AREA_REGIONS = [['home', 'Home'], ['oak', 'The Old Oak'], ['rootwood', 'Rootwood'], ['pond', 'The Pond'], ['playground', 'The Playground'], ['warren', 'The Warren'], ['greenhouse', 'The Greenhouse'], ['hive', 'The Hive']];   // (the headers in the list, 10/17/2026)
const _enterRoom0 = enterRoom;
enterRoom = function (id, doorId) {
  if (doorId === '@area') { const def = Rooms.get(id); const d = def && !def.spawn && (def.doors.find(o => !o.falling && !o.exitOnly && !o.swim) || def.doors[0]); doorId = d ? d.id : null; }
  return _enterRoom0(id, doorId);
};
(() => {
  const sel = document.createElement('select'); sel.id = 'areaSel'; sel.setAttribute('aria-label', 'Go to an area');
  const files = window.ROOM_FILES || {};
  let html = '<option value="">Go to area...</option>';
  for (const [reg, label] of AREA_REGIONS) {
    const ids = Object.keys(files).filter(id => files[id].split('/')[1] === reg);
    if (!ids.length) continue;
    html += `<optgroup label="${label}">` + ids.map(id => `<option value="${id}">${AREA_NAMES[id] || id}</option>`).join('') + '</optgroup>';
  }
  sel.innerHTML = html;
  sel.addEventListener('change', () => {
    const id = sel.value; sel.value = ''; sel.blur();
    if (!id || !started) return;
    P.story = null; P.pinned = null; P.ko = 0; P.respawnT = 0; P.health = Math.max(P.health, 1);
    if (typeof cutscene !== 'undefined' && cutscene) cutscene = null;
    trans.state = 'none'; goTo(id, '@area');                                        // (in at the room's own starting spot, or its first way in)
    document.body.classList.remove('tmenu');
  });
  const row = document.querySelector('#gGo .row');
  row.insertBefore(sel, row.firstChild);                                            // first, so it's easy to find
})();
