// barkface: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "barkface",
 "region": "oak",
 "w": 60,
 "h": 40,
 "music": "wind",
 "viewBottom": 640,
 "art": {
  "main": "art/oak/barkface.png#main",
  "pack": "art/oak/barkface.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    640
   ],
   "L0": [
    0,
    640,
    1405,
    585
   ],
   "L1": [
    0,
    1225,
    1348,
    592
   ],
   "L2": [
    0,
    1817,
    1252,
    605
   ],
   "L3": [
    0,
    2422,
    1132,
    621
   ],
   "L4": [
    0,
    3043,
    1252,
    836
   ],
   "front": [
    0,
    3879,
    154,
    87
   ]
  },
  "layers": [
   {
    "src": "art/oak/barkface.png#L0",
    "f": 0.08
   },
   {
    "src": "art/oak/barkface.png#L1",
    "f": 0.2
   },
   {
    "src": "art/oak/barkface.png#L2",
    "f": 0.4
   },
   {
    "src": "art/oak/barkface.png#L3",
    "f": 0.65
   },
   {
    "src": "art/oak/barkface.png#L4",
    "f": 1.3
   }
  ],
  "front": "art/oak/barkface.png#front",
  "frontAt": [
   806,
   21
  ],
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
   "id": "drey",
   "edge": "right",
   "a": 288,
   "b": 352,
   "to": "drey",
   "toDoor": "face",
   "x": 936.0,
   "y": 352,
   "f": -1
  },
  {
   "id": "rot",
   "edge": "left",
   "a": 64,
   "b": 128,
   "to": "rot",
   "toDoor": "face",
   "x": 24.0,
   "y": 128,
   "f": 1
  }
 ],
 "items": [
  {
   "id": "feather_barkface_feathers_0",
   "x": 148.0,
   "y": 144,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_barkface_feathers_1",
   "x": 156.0,
   "y": 144,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_barkface_feathers2_0",
   "x": 318.0,
   "y": 448,
   "kind": "feather"
  },
  {
   "id": "feather_barkface_feathers2_1",
   "x": 328.0,
   "y": 448,
   "kind": "feather"
  },
  {
   "id": "feather_barkface_feathers2_2",
   "x": 338.0,
   "y": 448,
   "kind": "feather"
  }
 ],
 "hints": [
  {
   "text": "bark, all the way up to a knothole",
   "l": 64,
   "t": 416,
   "r": 256,
   "b": 576,
   "x": 128,
   "y": 480
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "####=====...................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.................................................",
  "####.....##.......................................##########",
  "####.....##.......................................##########",
  "####.....##.............................======..............",
  "####.....##.................................................",
  "####.....##..................=%%%==.........................",
  "####.....##.................................======..........",
  "####.....##.......======....................................",
  "####.....##.................................................",
  "####.....##======...........................................",
  "####.....##.................................................",
  "####................................======..................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  152,
  4
 ],
 "floor": "bark",
 "shade": {
  "a": 0.08,
  "lights": [],
  "tint": null
 },
 "ambient": [
  "leaves",
  "dust"
 ],
 "grip": [
  [
   3,
   8,
   3,
   35
  ],
  [
   9,
   9,
   10,
   31
  ]
 ],
 "wildlife": [
  {
   "kind": "beetle",
   "at": "back",
   "x0": 176,
   "x1": 256,
   "y": 480,
   "every": [
    14,
    40
   ]
  },
  {
   "kind": "squirrel2",
   "at": "back",
   "x0": 640,
   "x1": 944,
   "y": 352,
   "every": [
    30,
    70
   ]
  },
  {
   "kind": "hawk",
   "at": "L1",
   "x0": 0,
   "x1": 1348,
   "y0": 30,
   "y1": 80,
   "every": [
    60,
    130
   ]
  }
 ],
 "foes": [
  {
   "kind": "juice",
   "x": 664.0,
   "y": 384,
   "f": -1
  },
  {
   "kind": "plane",
   "x": 616.0,
   "y": 224,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   2105,
   2106,
   2107,
   2108,
   2109,
   2110,
   2111,
   2112,
   2113,
   2114,
   2115,
   2116,
   2117,
   2118,
   2119,
   2120,
   2121,
   2122,
   2123,
   2124,
   2125,
   2126,
   2127,
   2128,
   2129,
   2130,
   2131,
   2132,
   2133,
   2134,
   2135,
   2136,
   2137,
   2138,
   2139,
   2140,
   2141,
   2142,
   2143,
   2144,
   2145,
   2146,
   2147,
   2148,
   2149,
   2150,
   2151,
   2152,
   2153,
   2154,
   2155,
   2156,
   2157,
   2158,
   2159
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAHwB/B/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+D//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP8A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP/4/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD//P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAwH///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA//z/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP8A////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP8A/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAcD////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+//////////8="
 }
});
