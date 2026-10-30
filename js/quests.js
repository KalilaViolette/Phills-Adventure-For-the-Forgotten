'use strict';
// ---------- the quests: the main story, side quests and the contracts on Tock's board (10/29/2026) ----------
// Everything the journal knows is in this one list, so a new story beat is a few lines here, not code somewhere else.
// The journal (Quests in the pause menu) works out where every quest is from the save itself: nothing extra is kept.
// Dev's Story progress puts the save at any step, and changes the flags to match (js/questlog.js).
//
// A quest:
//   id      a short name, never changed once it's in (saves don't store it, but the dev picker does)
//   kind    'main', 'side' or 'contract'
//   who     'phill' or 'purl': whose quest it is (Purl's are the parts you play as Purl, and the jobs Purl takes on)
//   title   what the journal calls it
//   region  where it happens, for the journal
//   from    contracts: who's asking for help (the note on the board is theirs)
//   starts  what has to have happened for it to show in the journal (left out: it shows once any step is done;
//           a main quest left out shows once the main quest before it is done)
//   steps   in order. Each one:
//     text  what he has to do, the way the journal says it
//     done  what has to be true for it to count as done (see below)
//     also  anything else that happens at that step, that Story progress should set too (a move he learns there)
//     room  where it happens: Story progress puts him there when it's the step he's on
//     dummy true while the story beat isn't in the game yet. Its flags are made up (they start with q_) and
//           nothing sets them, so the quest can't be finished till the beat's built and the real flag goes in
//
// What goes in done, also and starts (each one a word, all of them have to be true):
//   name          a story flag (world.flags.name), like soldierDown
//   has:name      something he's carrying (world.has.name), like has:cape
//   learned:name  a move he knows, like learned:parry
//   name>=3       a count kept in the save (world.name), like sword>=1 or tockMet>=3
//   a|b           either one (sailboatDown|topDown: whichever boss he beat first)
//   -has:name     also only: takes it away (the crow's snatch leaves his sword and shield behind)
const QUESTS = [
  // ---------------- the main story ----------------
  { id: 'home', kind: 'main', who: 'phill', title: 'Home', region: 'Home', starts: [],
    steps: [
      { text: 'Get his backpack, his paper and his crayons', done: ['has:backpack', 'has:paper', 'has:crayons'], room: 'bedroom' },
      { text: 'Watch where the ball rolls', done: ['watchedBall'], also: ['learned:roll'], room: 'bedroom' },
      { text: 'Pick up his sword and shield', done: ['has:gear'], room: 'bedroom' },
      { text: 'Go out into the backyard', done: ['yardAwe'], room: 'backyard' },
      { text: 'Get carried off by the crow', done: ['snatched'], also: ['lostGear', '-has:gear'], room: 'backyard' },
    ] },
  { id: 'nest', kind: 'main', who: 'phill', title: 'The fall', region: 'The Old Oak', starts: ['snatched'],
    steps: [
      { text: 'Wake up in the nest', done: ['wokeInNest'], room: 'nest' },
      { text: 'Get away from the crow', done: ['branchSnapped'], room: 'nest' },
      { text: 'Fall all the way down', done: ['landed'], room: 'oakfall' },
      { text: 'Pick his sword and shield back up', done: ['has:gear'], room: 'oakfall' },
    ] },
  { id: 'rootwood', kind: 'main', who: 'phill', title: 'Rootwood', region: 'Rootwood', starts: ['landed'],
    steps: [
      { text: 'Find the black crayon', done: ['has:crayon_black'], room: 'roots' },
      { text: 'Purl shows up while he scribbles with the black crayon', done: ['q_metPurl'], room: 'roots', dummy: true },
      { text: 'Look at his map', done: ['openedMap'], room: 'roots' },
      { text: 'Meet the squirrel', done: ['metSquirrel'], also: ['learned:parry'], room: 'hollow' },
      { text: 'Beat the tin soldier', done: ['soldierDown'], room: 'clearing' },
      { text: 'Meet the bear at the east edge', done: ['metBear'], room: 'eastedge' },
    ] },
  { id: 'pond', kind: 'main', who: 'phill', title: 'The Pond', region: 'The Pond', starts: ['soldierDown'],
    steps: [
      { text: 'Learn the air dodge from the dragonfly', done: ['sawDragonfly'], also: ['learned:airdodge'], room: 'dragonfly' },
      { text: 'Beat the sailboat', done: ['sailboatDown'], room: 'sailboat' },
      { text: 'Learn the squeak from the bullfrog', done: ['metBullfrog'], also: ['learned:squeak'], room: 'overlook' },
      { text: 'Beat the tangle', done: ['tangleDown'], room: 'fishline' },
      { text: 'Beat the swan', done: ['swanDown'], room: 'swan' },
    ] },
  { id: 'playground', kind: 'main', who: 'phill', title: 'The Playground', region: 'The Playground', starts: ['soldierDown'],
    steps: [
      { text: 'Ride the spinner', done: ['rodeSpinner'], also: ['learned:spin'], room: 'spinner' },
      { text: 'Beat the spinning top', done: ['topDown'], room: 'sandbox' },
      { text: 'Get the raincoat', done: ['has:raincoat'], also: ['learned:waterproof'], room: 'sandbox' },
      { text: 'Learn the burst from the dandelions', done: ['sawDandelion'], also: ['learned:burst'], room: 'dandelions' },
      { text: 'Beat the marionette', done: ['marionetteDown'], room: 'swings' },
      { text: 'Beat the clown', done: ['clownDown'], room: 'partytent' },
    ] },
  { id: 'bear', kind: 'main', who: 'phill', title: 'The bear asks him in', region: 'Rootwood', starts: ['sailboatDown|topDown'],
    steps: [
      { text: 'Go up when the bear asks him in', done: ['bearInvited'], room: 'eastedge' },
      { text: 'Visit the bear at home', done: ['bearVisited'], room: 'bearhome' },
    ] },
  { id: 'oak', kind: 'main', who: 'phill', title: 'Back up the Old Oak', region: 'The Old Oak', starts: ['sailboatDown|topDown'],
    steps: [
      { text: 'Learn the roll slash from the pill bug', done: ['sawPillbug'], also: ['learned:rollslash'], room: 'rot' },
      { text: 'Find the sneaker', done: ['has:sneaker'], also: ['learned:velcro'], room: 'heartwood' },
      { text: 'Beat the yo-yo', done: ['yoyoDown'], room: 'heartwood' },
      { text: 'Find the cape in the nest', done: ['has:cape'], room: 'nest' },
      { text: 'Make friends with the crow', done: ['crowFriend'], room: 'nest' },
      { text: 'Beat the kite', done: ['kiteDown'], room: 'highbranch' },
      { text: 'Choose to stay and help', done: ['q_choseToStay'], room: 'nest', dummy: true },
    ] },
  { id: 'warren', kind: 'main', who: 'phill', title: 'The Warren', region: 'The Warren', starts: ['tockMet>=1'],
    steps: [
      { text: 'Find Tock out in the park three times', done: ['tockMet>=3'] },
      { text: 'Get let into the Warren', done: ['warrenOpen'], room: 'chest' },
      { text: "Read Tock's board", done: ['boardRead'], room: 'townsquare' },
    ] },
  { id: 'canopy', kind: 'main', who: 'phill', title: 'The Canopy, with Purl', region: 'The Canopy', starts: ['crowFriend'],
    steps: [
      { text: 'Purl asks him to come up with her', done: ['q_canopyAsked'], dummy: true },
      { text: 'Learn to glide in the treetops', done: ['q_canopyGlide'], dummy: true },
      { text: 'Help with her job in the empty nests', done: ['q_canopyJob'], dummy: true },
    ] },
  { id: 'hive', kind: 'main', who: 'phill', title: 'The Hive', region: 'The Hive', starts: ['has:cape'],
    steps: [
      { text: 'Find the way into the Hive', done: ['hiveMet'], room: 'westdrop' },
      { text: 'Get let in', done: ['hiveWelcome'], room: 'knothole' },
      { text: 'Learn the belly flop', done: ['learnedFlop'], also: ['learned:flop'], room: 'combhall' },
      { text: 'Meet the queen', done: ['metQueen'], room: 'queen' },
      { text: 'Beat the worm in the stores', done: ['wormDown'], room: 'stores' },
      { text: 'Beat the piñata', done: ['pinataDown'], room: 'pinata' },
    ] },
  { id: 'greenhouse', kind: 'main', who: 'phill', title: 'The Greenhouse', region: 'The Greenhouse', starts: ['has:cape'],
    steps: [
      { text: 'Go into the Greenhouse', done: ['enteredGreenhouse'], room: 'frontdoor' },
      { text: 'Learn the static spark', done: ['learnedSpark'], also: ['learned:spark'], room: 'lambsear' },
      { text: 'Learn the cape flap', done: ['learnedFlap'], also: ['learned:flap'], room: 'chrysalis' },
      { text: 'Beat the bramble', done: ['brambleDown'], room: 'bramblecore' },
    ] },
  { id: 'betrayal', kind: 'main', who: 'phill', title: 'The bear turns', region: 'Rootwood', starts: ['brambleDown'],
    steps: [
      { text: 'The bear turns on him', done: ['q_bearTurned'], dummy: true },
      { text: 'The Grime carries him off into the dark', done: ['q_carriedOff'], dummy: true },
    ] },
  { id: 'outofdark', kind: 'main', who: 'purl', title: 'Out of the dark', region: 'The dark', starts: ['q_carriedOff'],
    steps: [
      { text: 'Go down into the dark for him (she was paid to)', done: ['q_purlWentDown'], dummy: true },
      { text: 'Find him', done: ['q_purlFoundHim'], dummy: true },
      { text: 'Get him out', done: ['q_outOfDark'], dummy: true },
    ] },
  { id: 'invasion', kind: 'main', who: 'phill', title: 'The Grime in the Warren', region: 'The Warren', starts: ['q_outOfDark'],
    steps: [
      { text: 'The Grime gets into the Warren', done: ['q_warrenBreached'], dummy: true },
      { text: 'Help the toys', done: ['q_warrenHelped'], dummy: true },
      { text: 'Go back through the starting areas, taken over', done: ['q_startRetaken'], dummy: true },
    ] },
  { id: 'seep', kind: 'main', who: 'phill', title: 'The Seep', region: 'The Seep', starts: ['q_warrenHelped'],
    steps: [
      { text: 'Go down into the Seep', done: ['q_seepIn'], dummy: true },
      { text: 'Get the glow', done: ['q_glow'], dummy: true },
      { text: "Close the Seep's valve", done: ['q_seepValve'], dummy: true },
    ] },
  { id: 'drain', kind: 'main', who: 'phill', title: 'The Storm Drain', region: 'The Storm Drain', starts: ['q_warrenHelped'],
    steps: [
      { text: 'Go into the Storm Drain', done: ['q_drainIn'], dummy: true },
      { text: 'Learn the kick to swim against the water', done: ['q_kick'], dummy: true },
      { text: "Close the Storm Drain's valve", done: ['q_drainValve'], dummy: true },
    ] },
  { id: 'purlsline', kind: 'main', who: 'phill', title: "Purl's line", region: 'The Sump', starts: ['q_seepValve', 'q_drainValve'],
    steps: [
      { text: "Watch Purl's line give out", done: ['q_lineSnapped'], dummy: true },
      { text: 'Get down the bramble shaft', done: ['q_shaftDown'], dummy: true },
      { text: 'Carry her payment the rest of the way', done: ['q_carriedPayment'], dummy: true },
    ] },
  { id: 'sump', kind: 'main', who: 'phill', title: 'The Sump', region: 'The Sump', starts: ['q_shaftDown'],
    steps: [
      { text: 'Beat the bear', done: ['q_bearBeaten'], dummy: true },
      { text: 'The Grime leaves the bear', done: ['q_grimeLeft'], dummy: true },
      { text: 'Take the Grime into his heart', done: ['q_grimeInHeart'], dummy: true },
      { text: "Forgive the bear, and sew up his rip with Purl's yarn", done: ['q_bearForgiven'], dummy: true },
    ] },
  { id: 'ending', kind: 'main', who: 'phill', title: 'A home', region: 'The park', starts: ['q_bearForgiven'],
    steps: [
      { text: 'Lead the toys out of the park', done: ['q_toysLedOut'], dummy: true },
      { text: 'Find them a home', done: ['q_newHome'], dummy: true },
      { text: 'His animal friends come to visit', done: ['q_friendsVisit'], dummy: true },
    ] },

  // ---------------- side quests ----------------
  { id: 'beetle', kind: 'side', who: 'phill', title: "The beetle's work", region: 'Rootwood', starts: ['metBeetle'],
    steps: [
      { text: 'Have the beetle stain his sword', done: ['sword>=1'] },
      { text: 'Have the beetle etch it', done: ['sword>=2'] },
    ] },
  { id: 'memories', kind: 'side', who: 'phill', title: 'Memories', region: 'All over the park',
    steps: [
      { text: 'The balloon, in Rootwood', done: ['has:memory_balloon'], room: 'burrow' },
      { text: 'The bucket, at the Pond', done: ['has:memory_bucket'], room: 'fenceside' },
      { text: 'The wand, in the Playground', done: ['has:memory_wand'], room: 'fountain' },
      { text: 'The page, up the Old Oak', done: ['has:memory_page'], room: 'highbranch' },
      { text: 'The flower, in the Greenhouse', done: ['has:memory_flower'], room: 'bramblecore' },
      { text: 'The candle, in the Hive', done: ['has:memory_candle'], room: 'queen' },
    ] },
  { id: 'supplies', kind: 'side', who: 'phill', title: 'What the Warren needs', region: 'The Warren', starts: ['boardRead'],
    steps: [
      { text: 'Bring Clank a battery', done: ['gave_battery'], also: ['has:supply_battery', 'musicBoxFixed'] },
      { text: 'Bring Mabel a spool of thread', done: ['gave_thread'], also: ['has:supply_thread'] },
      { text: 'Bring Peg a sliver of soap', done: ['gave_soap'], also: ['has:supply_soap'] },
      { text: 'Bring the mole birthday candles', done: ['gave_candles'], also: ['has:supply_candles'] },
    ] },
  { id: 'mole', kind: 'side', who: 'phill', title: "The mole's shop", region: 'The Warren', starts: ['warrenOpen'],
    steps: [
      { text: 'Help the mole back home', done: ['moleHome'], room: 'moleshop' },
    ] },
  { id: 'mending', kind: 'side', who: 'purl', title: 'The mending', region: 'The Warren', starts: ['q_canopyJob'],
    steps: [
      { text: 'See Purl mending, from a distance', done: ['q_mendSeen'], dummy: true },
      { text: 'Hold the end for her', done: ['q_mendHeld'], dummy: true },
      { text: 'Bring her wool from Fleece', done: ['q_mendWool'], dummy: true },
    ] },

  // ---------------- contracts: the notes on Tock's board. Phill takes one by drawing on it ----------------
  { id: 'c_nests', kind: 'contract', who: 'purl', title: 'The empty nests', region: 'The Canopy', from: 'the birds', starts: ['boardRead'],
    steps: [
      { text: 'Purl takes the note (her yarn through the pin)', done: ['q_tookNests'], dummy: true },
      { text: 'Beat the shiny nest in the dead tree', done: ['q_nestsDown'], dummy: true },
      { text: 'Collect the buttons it hoarded', done: ['q_nestsPaid'], dummy: true },
    ] },
  { id: 'c_pool', kind: 'contract', who: 'phill', title: 'Something in the grime pool', region: 'Rootwood', from: 'the squirrel', starts: ['boardRead'],
    steps: [
      { text: 'Draw on the note to take it', done: ['q_tookPool'], dummy: true },
      { text: 'Beat what pulls things under', done: ['q_poolDown'], room: 'grimepool', dummy: true },
      { text: 'Tell the squirrel', done: ['q_poolPaid'], dummy: true },
    ] },
  { id: 'c_eel', kind: 'contract', who: 'phill', title: 'The eel in the deep water', region: 'The Pond', from: 'the frogs', starts: ['boardRead'],
    steps: [
      { text: 'Draw on the note to take it', done: ['q_tookEel'], dummy: true },
      { text: 'Beat the pool noodle eel', done: ['q_eelDown'], room: 'deepwater', dummy: true },
      { text: 'Tell the frogs', done: ['q_eelPaid'], dummy: true },
    ] },
  { id: 'c_kite', kind: 'contract', who: 'phill', title: 'The black kite', region: 'The Playground', from: 'the tin monkey', starts: ['boardRead'],
    steps: [
      { text: 'Draw on the note to take it', done: ['q_tookKite'], dummy: true },
      { text: 'Beat the kite in the wires', done: ['q_kiteWiresDown'], dummy: true },
      { text: 'Tell the tin monkey', done: ['q_kitePaid'], dummy: true },
    ] },
];
