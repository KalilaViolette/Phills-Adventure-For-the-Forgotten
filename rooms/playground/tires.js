// tires: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "tires",
 "region": "playground",
 "w": 60,
 "h": 48,
 "music": "playground",
 "viewBottom": 768,
 "art": {
  "main": "art/playground/tires.png#main",
  "pack": "art/playground/tires.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    768
   ],
   "L0": [
    0,
    768,
    1386,
    603
   ],
   "L1": [
    0,
    1371,
    1300,
    637
   ],
   "L2": [
    0,
    2008,
    1204,
    676
   ],
   "L3": [
    0,
    2684,
    1098,
    718
   ],
   "L4": [
    0,
    3402,
    1252,
    1002
   ],
   "piece_cover_tirepocket_pass": [
    0,
    4404,
    151,
    102
   ],
   "piece_cover_tirepocket_wall": [
    0,
    4506,
    34,
    96
   ]
  },
  "layers": [
   {
    "src": "art/playground/tires.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/tires.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/tires.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/tires.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/tires.png#L4",
    "f": 1.3
   }
  ],
  "pieces": {
   "cover_tirepocket_pass": [
    549,
    597,
    151,
    102
   ],
   "cover_tirepocket_wall": [
    672,
    603,
    34,
    96
   ]
  },
  "uses": [
   "art/playground/playground_sprites.png",
   "art/playground/playground_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/playground/playground_items.png"
 },
 "doors": [
  {
   "id": "puddle",
   "edge": "left",
   "a": 608,
   "b": 672,
   "to": "puddle",
   "toDoor": "tires",
   "x": 24.0,
   "y": 672,
   "f": 1,
   "swim": false
  },
  {
   "id": "bikes",
   "edge": "right",
   "a": 608,
   "b": 672,
   "to": "bikes",
   "toDoor": "tires",
   "x": 936.0,
   "y": 672,
   "f": -1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "marble_tires_stash_0",
   "x": 601.0,
   "y": 672,
   "kind": "marble",
   "behind": "tirepocket"
  },
  {
   "id": "marble_tires_stash_1",
   "x": 607.0,
   "y": 672,
   "kind": "marble",
   "behind": "tirepocket"
  },
  {
   "id": "marble_tires_stash_2",
   "x": 613.0,
   "y": 672,
   "kind": "marble",
   "behind": "tirepocket"
  },
  {
   "id": "marble_tires_stash_3",
   "x": 619.0,
   "y": 672,
   "kind": "marble",
   "behind": "tirepocket"
  },
  {
   "id": "marble_tires_stash_4",
   "x": 625.0,
   "y": 672,
   "kind": "marble",
   "behind": "tirepocket"
  },
  {
   "id": "marble_tires_stash_5",
   "x": 631.0,
   "y": 672,
   "kind": "marble",
   "behind": "tirepocket"
  },
  {
   "id": "marble_tires_marbles_0",
   "x": 158.0,
   "y": 544,
   "kind": "marble"
  },
  {
   "id": "marble_tires_marbles_1",
   "x": 168.0,
   "y": 544,
   "kind": "marble"
  },
  {
   "id": "marble_tires_marbles_2",
   "x": 178.0,
   "y": 544,
   "kind": "marble"
  },
  {
   "id": "marble_tires_marbles2_0",
   "x": 782.0,
   "y": 528,
   "kind": "marble"
  },
  {
   "id": "marble_tires_marbles2_1",
   "x": 792.0,
   "y": 528,
   "kind": "marble"
  },
  {
   "id": "marble_tires_marbles2_2",
   "x": 802.0,
   "y": 528,
   "kind": "marble"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "...........................######...........................",
  "...........................######...........................",
  "...........................######...........................",
  "...........................######...........................",
  "........................############........................",
  "........................############........................",
  "........................############........................",
  "........................############...........=====........",
  "........=====.......####################....................",
  "....................####################....................",
  "....................####################....................",
  "....................####################....................",
  "................############################................",
  "............====####################........====............",
  "................####################........................",
  "................####################........................",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  578,
  80
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    24,
    362,
    150,
    0.95
   ],
   [
    427,
    192,
    26,
    0.4
   ],
   [
    873,
    285,
    26,
    0.4
   ],
   [
    84,
    415,
    26,
    0.4
   ],
   [
    72,
    147,
    26,
    0.4
   ],
   [
    71,
    356,
    26,
    0.4
   ],
   [
    809,
    347,
    26,
    0.4
   ]
  ],
  "tint": "#2a1a3a"
 },
 "ambient": [
  "motes",
  "fireflies"
 ],
 "breaks": [
  {
   "id": "tirepocket",
   "x0": 42,
   "y0": 39,
   "x1": 43,
   "y1": 41,
   "hp": 2,
   "look": "mud"
  }
 ],
 "wildlife": [
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 781,
   "y0": 361,
   "y1": 462,
   "every": [
    8,
    22
   ]
  },
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 781,
   "y0": 340,
   "y1": 441,
   "every": [
    12,
    30
   ],
   "first": 9
  }
 ],
 "covers": {
  "tirepocket": {
   "wall": [
    42,
    39,
    43,
    41
   ],
   "pas": [
    36,
    39,
    41,
    41
   ]
  }
 },
 "foes": [
  {
   "kind": "teeth",
   "x": 488.0,
   "y": 416,
   "f": -1
  },
  {
   "kind": "balloon",
   "x": 488.0,
   "y": 224,
   "f": -1
  },
  {
   "kind": "jack",
   "x": 840.0,
   "y": 672,
   "f": -1
  },
  {
   "kind": "balloon",
   "x": 168.0,
   "y": 320,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   2463,
   2464,
   2465,
   2466,
   2467,
   2468,
   2469,
   2470,
   2471,
   2472,
   2473,
   2474,
   2475,
   2505,
   2506,
   2507,
   2508,
   2509,
   2510,
   2511,
   2512,
   2513,
   2514,
   2515,
   2516
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4P//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/w//P///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP/w/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQB///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAfAP8P/wAAAAAAAAAAAAAAAAAAAAAAAAAAAD8P////////////AAAAAAAAAAAAAAAAAAAAAAAAAACAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////wAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAD/wP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAB/8/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA//g="
 }
});
