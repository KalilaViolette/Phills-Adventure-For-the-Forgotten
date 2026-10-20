// heartwood: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "heartwood",
 "region": "oak",
 "w": 64,
 "h": 40,
 "music": "oak",
 "viewBottom": 640,
 "art": {
  "main": "art/oak/heartwood.png#main",
  "pack": "art/oak/heartwood.png",
  "parts": {
   "main": [
    0,
    0,
    1024,
    640
   ],
   "L0": [
    0,
    640,
    1394,
    587
   ],
   "L1": [
    0,
    1227,
    1319,
    599
   ],
   "L2": [
    0,
    1826,
    1236,
    612
   ],
   "L3": [
    0,
    2438,
    1144,
    626
   ],
   "L4": [
    0,
    3064,
    1335,
    836
   ],
   "piece_cover_rotwood_pass": [
    0,
    3900,
    96,
    134
   ],
   "piece_cover_rotwood_wall": [
    0,
    4034,
    18,
    134
   ]
  },
  "layers": [
   {
    "src": "art/oak/heartwood.png#L0",
    "f": 0.12
   },
   {
    "src": "art/oak/heartwood.png#L1",
    "f": 0.3
   },
   {
    "src": "art/oak/heartwood.png#L2",
    "f": 0.5
   },
   {
    "src": "art/oak/heartwood.png#L3",
    "f": 0.72
   },
   {
    "src": "art/oak/heartwood.png#L4",
    "f": 1.3
   }
  ],
  "pieces": {
   "cover_rotwood_pass": [
    0,
    469,
    96,
    134
   ],
   "cover_rotwood_wall": [
    80,
    469,
    18,
    134
   ]
  },
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/rootwood/rootwood_sprites.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "bark",
   "edge": "bottom",
   "a": 240,
   "b": 320,
   "to": "roots",
   "toDoor": "bark",
   "x": 280.0,
   "y": 608,
   "f": 1,
   "keepX": true
  },
  {
   "id": "knothole",
   "edge": "bottom",
   "a": 656,
   "b": 720,
   "to": "roots",
   "toDoor": "knothole",
   "x": 680.0,
   "y": 608,
   "f": 1,
   "keepX": true
  },
  {
   "id": "knot",
   "edge": "right",
   "a": 384,
   "b": 448,
   "to": "knot",
   "toDoor": "heart",
   "x": 1000.0,
   "y": 448,
   "f": -1
  },
  {
   "id": "up",
   "edge": "top",
   "a": 64,
   "b": 160,
   "to": "shaft",
   "toDoor": "heart",
   "x": 104.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true,
   "optional": true
  }
 ],
 "items": [
  {
   "id": "sneaker",
   "x": 840.0,
   "y": 576,
   "kind": "sneaker"
  },
  {
   "id": "feather_heartwood_feathers_0",
   "x": 382.0,
   "y": 432,
   "kind": "feather"
  },
  {
   "id": "feather_heartwood_feathers_1",
   "x": 392.0,
   "y": 432,
   "kind": "feather"
  },
  {
   "id": "feather_heartwood_feathers_2",
   "x": 402.0,
   "y": 432,
   "kind": "feather"
  },
  {
   "id": "feather_heartwood_stash_0",
   "x": 28.0,
   "y": 576,
   "kind": "feather",
   "behind": "rotwood"
  },
  {
   "id": "feather_heartwood_stash_1",
   "x": 34.0,
   "y": 576,
   "kind": "feather",
   "behind": "rotwood"
  },
  {
   "id": "feather_heartwood_stash_2",
   "x": 40.0,
   "y": 576,
   "kind": "feather",
   "behind": "rotwood"
  },
  {
   "id": "feather_heartwood_stash_3",
   "x": 46.0,
   "y": 576,
   "kind": "feather",
   "behind": "rotwood"
  },
  {
   "id": "feather_heartwood_stash_4",
   "x": 52.0,
   "y": 576,
   "kind": "feather",
   "behind": "rotwood"
  }
 ],
 "hints": [
  {
   "text": "fungus has grown right over the top. the way up's somewhere else",
   "l": 32,
   "t": 0,
   "r": 192,
   "b": 160,
   "x": 112,
   "y": 80,
   "until": "yoyoDown"
  },
  {
   "text": "the bark goes up and up. he can't climb it. not yet",
   "l": 32,
   "t": 288,
   "r": 224,
   "b": 576,
   "x": 128,
   "y": 352,
   "until": "velcro"
  }
 ],
 "gates": [
  {
   "x0": 4,
   "y0": 0,
   "x1": 9,
   "y1": 1,
   "flag": "yoyoDown",
   "look": "plug"
  }
 ],
 "events": [],
 "spawn": null,
 "tiles": [
  "####......######################################################",
  "####......######################################################",
  "####......######################################################",
  "####......######################################################",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "####......##..................................................##",
  "##............................................................##",
  "##......................................................=====.##",
  "##............................................................##",
  "##...=====......................................................",
  "##..............................................................",
  "##..........................................=====...............",
  "##....................======....................................",
  "#####...................................................########",
  "#####...................................................########",
  "#####.........======....................................########",
  "#.......................................................########",
  "#.................................................=====.########",
  "#.......=====...........................................########",
  "#.......................................................########",
  "#.......................................................########",
  "###############.....#####################....###################",
  "###############.....#####################....###################",
  "###############=====#####################====###################",
  "###############.....#####################....###################"
 ],
 "mapAt": [
  44,
  44
 ],
 "floor": "bark",
 "shade": {
  "a": 0.4,
  "lights": [
   [
    116,
    540,
    110,
    1.0
   ],
   [
    628,
    568,
    46,
    0.55
   ],
   [
    636,
    570,
    46,
    0.55
   ],
   [
    646,
    569,
    46,
    0.55
   ]
  ],
  "tint": "#2a1a10"
 },
 "ambient": [
  "motes",
  "dust"
 ],
 "grip": [
  [
   3,
   0,
   3,
   20
  ],
  [
   10,
   0,
   10,
   20
  ],
  [
   1,
   4,
   1,
   30
  ],
  [
   62,
   4,
   62,
   35
  ]
 ],
 "rest": {
  "x": 136.0,
  "y": 576
 },
 "breaks": [
  {
   "id": "rotwood",
   "x0": 5,
   "y0": 31,
   "x1": 5,
   "y1": 35,
   "hp": 3,
   "look": "rot"
  }
 ],
 "wildlife": [
  {
   "kind": "beetle",
   "at": "back",
   "x0": 64,
   "x1": 960,
   "y": 576
  },
  {
   "kind": "beetle",
   "at": "back",
   "x0": 352,
   "x1": 432,
   "y": 432,
   "every": [
    14,
    40
   ],
   "first": 12
  },
  {
   "kind": "mouse",
   "at": "back",
   "x0": 320,
   "x1": 896,
   "y": 576,
   "every": [
    30,
    70
   ]
  }
 ],
 "covers": {
  "rotwood": {
   "wall": [
    5,
    31,
    5,
    35
   ],
   "pas": [
    1,
    31,
    4,
    35
   ]
  }
 },
 "foes": [
  {
   "kind": "fork",
   "x": 488.0,
   "y": 576,
   "f": -1
  },
  {
   "kind": "wrapper",
   "x": 584.0,
   "y": 320,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   396,
   524,
   588,
   652,
   716,
   780,
   844,
   908,
   1036,
   1100,
   1164,
   1228,
   1347,
   1785,
   1786,
   1787,
   1788,
   1796,
   1848,
   1860,
   1912,
   1976,
   1984,
   1985,
   1987,
   2039,
   2040,
   2049,
   2103,
   2112,
   2167,
   2168,
   2232,
   2250,
   2251,
   2252,
   2261,
   2262,
   2263,
   2264,
   2265,
   2266,
   2267,
   2268,
   2269,
   2270,
   2271,
   2272,
   2273,
   2274,
   2275,
   2276,
   2277,
   2278,
   2279,
   2286,
   2287,
   2288,
   2289,
   2290,
   2294,
   2295,
   2296,
   2318,
   2324,
   2344,
   2349
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAwADAAMAAwADAAIAAgACAAAAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAwADAAMAAwADAAMAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/+//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP/w//z//v/+//////////////////////////7//P/8D/8//3//f/////////////////////////9//z//P////P/8//7//v/+/////////////////////////////x//H/8//z//f/9//3///////////////////////////////3//P/8//x//H/8f/x//H/8f/x//P/8//3//f////////////v/+//7//v////////////////////////wA+ADwAOAAQAAAAAAAAAAAAAAAgACAAIAAAACAAIAAP/8P3gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAX//////////////////////////////////////////gACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAAAAQADAAMAAwABAAEAAQABAAMAAwADAAMAAwADAAMAA/////////////7//v/+//7//v/+//7//v/+////////AAMAAwADAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////////////3//f/9//3//f/8//z//P/8//z//P/9//3//////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/5//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABP/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQA/D/8AAAAAAAAAAAAGAA8ADwAfAD8AfwD/Af8D/////////3//f/9//3//f/9//3//f/9//3//f/9//3////////////D//P/+//7///////////////////////////////8P/z//f/9////////////////////////////////////w//z//v/+////////////////////////////////D/8//3//f/////////////////////////////////8="
 }
});
