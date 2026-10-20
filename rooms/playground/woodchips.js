// woodchips: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "woodchips",
 "region": "playground",
 "w": 60,
 "h": 56,
 "music": "playground",
 "viewBottom": 896,
 "art": {
  "main": "art/playground/woodchips.png#main",
  "pack": "art/playground/woodchips.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    896
   ],
   "L0": [
    0,
    896,
    1386,
    618
   ],
   "L1": [
    0,
    1514,
    1300,
    676
   ],
   "L2": [
    0,
    2190,
    1204,
    740
   ],
   "L3": [
    0,
    2930,
    1098,
    810
   ],
   "L4": [
    0,
    3740,
    1252,
    1168
   ]
  },
  "layers": [
   {
    "src": "art/playground/woodchips.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/woodchips.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/woodchips.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/woodchips.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/woodchips.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/playground/playground_sprites.png",
   "art/playground/playground_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/playground/playground_items.png"
 },
 "doors": [
  {
   "id": "bikes",
   "edge": "left",
   "a": 736,
   "b": 800,
   "to": "bikes",
   "toDoor": "chips",
   "x": 24.0,
   "y": 800,
   "f": 1,
   "swim": false
  },
  {
   "id": "sandbox",
   "edge": "right",
   "a": 736,
   "b": 800,
   "to": "sandbox",
   "toDoor": "chips",
   "x": 936.0,
   "y": 800,
   "f": -1,
   "swim": false
  },
  {
   "id": "spinner",
   "edge": "right",
   "a": 288,
   "b": 352,
   "to": "spinner",
   "toDoor": "chips",
   "x": 936.0,
   "y": 352,
   "f": -1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "marble_woodchips_stash_0",
   "x": 313.0,
   "y": 448,
   "kind": "marble",
   "glide": true
  },
  {
   "id": "marble_woodchips_stash_1",
   "x": 319.0,
   "y": 448,
   "kind": "marble",
   "glide": true
  },
  {
   "id": "marble_woodchips_stash_2",
   "x": 325.0,
   "y": 448,
   "kind": "marble",
   "glide": true
  },
  {
   "id": "marble_woodchips_stash_3",
   "x": 331.0,
   "y": 448,
   "kind": "marble",
   "glide": true
  },
  {
   "id": "marble_woodchips_stash_4",
   "x": 337.0,
   "y": 448,
   "kind": "marble",
   "glide": true
  },
  {
   "id": "marble_woodchips_stash_5",
   "x": 343.0,
   "y": 448,
   "kind": "marble",
   "glide": true
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
  "....................................................########",
  "....................................................########",
  "............................................................",
  "............................................................",
  "................................................======......",
  "............................................................",
  "..................=====.....................................",
  "............................................................",
  "........................................======..............",
  "............................................................",
  "............................................................",
  "............................................................",
  "................................................======......",
  "............................................................",
  "............................................................",
  "............................................................",
  "........................................======..............",
  "............................................................",
  "............................................................",
  "............................................................",
  "................................................======......",
  "............................................................",
  "............................................................",
  "............................................................",
  "........................................======..............",
  "..................=============.............................",
  ".........#####..............................................",
  ".......#########.................#####.##################...",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  698,
  72
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    328,
    466,
    150,
    0.95
   ],
   [
    939,
    80,
    26,
    0.4
   ],
   [
    697,
    328,
    26,
    0.4
   ],
   [
    904,
    284,
    26,
    0.4
   ],
   [
    882,
    140,
    26,
    0.4
   ],
   [
    955,
    287,
    26,
    0.4
   ],
   [
    176,
    248,
    26,
    0.4
   ],
   [
    606,
    68,
    26,
    0.4
   ],
   [
    372,
    54,
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
 "wildlife": [
  {
   "kind": "moth",
   "at": "back",
   "y": 450,
   "x": 328,
   "every": [
    3,
    9
   ]
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 454,
   "x": 334,
   "every": [
    5,
    12
   ],
   "first": 6
  },
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 781,
   "y0": 454,
   "y1": 554,
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
   "y0": 432,
   "y1": 533,
   "every": [
    12,
    30
   ],
   "first": 9
  },
  {
   "kind": "pigeon",
   "at": "back",
   "x0": 32,
   "x1": 256,
   "y": 800,
   "every": [
    25,
    60
   ]
  }
 ],
 "foes": [
  {
   "kind": "teeth",
   "x": 184.0,
   "y": 768,
   "f": 1
  },
  {
   "kind": "bucket",
   "x": 424.0,
   "y": 800,
   "f": -1
  },
  {
   "kind": "horn",
   "x": 568.0,
   "y": 784,
   "f": -1
  },
  {
   "kind": "balloon",
   "x": 488.0,
   "y": 576,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   2830,
   2831,
   2832,
   2887,
   2888,
   2894,
   2895,
   2914,
   2915,
   2916,
   2920,
   2921,
   2922,
   2923,
   2924,
   2925,
   2926,
   2927,
   2928,
   2929,
   2930,
   2931,
   2932,
   2933,
   2934,
   2935,
   2943,
   2944,
   2945,
   2946,
   2956,
   2957,
   2958,
   2959,
   2960,
   2961,
   2962,
   2963,
   2964,
   2965,
   2966,
   2967,
   2968,
   2969,
   2970,
   2971,
   2972
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPg///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD4AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAcADwA/AP8ABwAfAH8A/wP/B/8P/x//P/9//////////////////+AA+AD+AP8A/8D/4P/w//j//P/+////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA4ADwAPwA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAB8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwA/+D/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAHAD8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AP/w////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+D//v////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwf//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4D/+P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPf+//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfw//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAEABwAPAB8P/////////wAPAH8B/wP/D/8f/z//////////////////////////8AD8AP8A/8D/4P/4//z//v////////////////////8AAAAAAAAAAAAAAAAAAAAAgADAAOAA+AD8AP/w/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP+A////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADP/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAf+/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP/8////////AAAAAAAAAAAAAAAAAAAAAAADAAcADwA/AP/x//////8ADwB/Af8D/w//P/9//////////////////////////w=="
 }
});
