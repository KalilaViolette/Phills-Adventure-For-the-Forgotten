// fountain: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "fountain",
 "region": "playground",
 "w": 60,
 "h": 28,
 "music": "playground",
 "viewBottom": 448,
 "art": {
  "main": "art/playground/fountain.png#main",
  "pack": "art/playground/fountain.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    448
   ],
   "L0": [
    0,
    448,
    1386,
    564
   ],
   "L1": [
    0,
    1012,
    1300,
    541
   ],
   "L2": [
    0,
    1553,
    1204,
    516
   ],
   "L3": [
    0,
    2069,
    1098,
    487
   ],
   "piece_cover_fountain_mud_pass": [
    0,
    2556,
    92,
    118
   ],
   "piece_cover_fountain_mud_wall": [
    0,
    2674,
    34,
    118
   ]
  },
  "layers": [
   {
    "src": "art/playground/fountain.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/fountain.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/fountain.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/fountain.png#L3",
    "f": 0.72
   }
  ],
  "pieces": {
   "cover_fountain_mud_pass": [
    868,
    293,
    92,
    118
   ],
   "cover_fountain_mud_wall": [
    862,
    293,
    34,
    118
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
   "id": "up",
   "edge": "top",
   "a": 768,
   "b": 832,
   "to": "picnic",
   "toDoor": "down",
   "x": 792.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  },
  {
   "id": "pipe",
   "edge": "right",
   "a": 320,
   "b": 384,
   "to": "pipe",
   "toDoor": "fountain",
   "x": 936.0,
   "y": 384,
   "f": -1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "memory_wand",
   "x": 136.0,
   "y": 384,
   "kind": "memory"
  },
  {
   "id": "marble_fountain_pocket_0",
   "x": 920.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_fountain_pocket_1",
   "x": 920.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_fountain_pocket_2",
   "x": 920.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_fountain_pocket_3",
   "x": 920.0,
   "y": 384,
   "kind": "marble"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################....########",
  "################################################....########",
  "............................................................",
  "............................................................",
  "................................................====........",
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
  "......................................................######",
  "......................................................######",
  "........................................======..............",
  "............................................................",
  "..............######........................................",
  "..............######........................................",
  "###########################.....############################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  918,
  128
 ],
 "floor": "chips",
 "shade": {
  "a": 0.45,
  "lights": [
   [
    320,
    116,
    150,
    0.75
   ],
   [
    792,
    10,
    120,
    0.8
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
   "id": "fountain_mud",
   "x0": 54,
   "y0": 20,
   "x1": 55,
   "y1": 23,
   "hp": 3,
   "look": "mud"
  }
 ],
 "wildlife": [
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 781,
   "y0": -192,
   "y1": -91,
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
   "y0": -213,
   "y1": -112,
   "every": [
    12,
    30
   ],
   "first": 9
  }
 ],
 "covers": {
  "fountain_mud": {
   "wall": [
    54,
    20,
    55,
    23
   ],
   "pas": [
    56,
    20,
    59,
    23
   ]
  }
 },
 "foes": [
  {
   "kind": "teeth",
   "x": 360.0,
   "y": 384,
   "f": -1
  },
  {
   "kind": "rope",
   "x": 600.0,
   "y": 384,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   60,
   61,
   62,
   63,
   64,
   65,
   66,
   67,
   68,
   69,
   71,
   72,
   76,
   77,
   78,
   79,
   80,
   82,
   83,
   84,
   85,
   87,
   88,
   90,
   91,
   92,
   93,
   94,
   95,
   97,
   98,
   100,
   101,
   103,
   104,
   115,
   116,
   120,
   121,
   125,
   126,
   127,
   130,
   132,
   133,
   134,
   135,
   136,
   138,
   139,
   140,
   141,
   142,
   146,
   148,
   149,
   151,
   152,
   154,
   156,
   157,
   158,
   159,
   160,
   162,
   164,
   165,
   166,
   173,
   174,
   177,
   178,
   179,
   1134
  ],
  "bits": "////////////////////////////////////8P/A/wD//////////////////////////////////3//P/8P/////////////////////////////////////////4/A/////////////////////////////////////+H/AB//////////////////////////////////////////+P///////////////////////////////////////3P///////////////////////////////////////////7///////////////////////////////////////8H////////////////////////////////////+D/gD8AD/////////////////////////////////////////gf///////////////////////////////////////+f////////////////////////////////////9//gf+B/////////////////////////////////////////8GD///////////////////////////////////////8Px////////////////////////////////////////v/4/////////////////////////////////////wH/AH/////////////////////////////////////////7/////////////////////////////////////////wP/////////////////////////////////////////8A//////////////////////////////////////8H8AAP///////////////////////////////////////2H/////////////////////z/+H/4f/B/4D/gP+A/wBwAD///////////////////////////////////////8/////////////////////////////////////////+IAA/////////////////////////////////////x//A/////////////////////////////////////////j/sP////////////////////////////////////8GBwAA////////////////////////////////////////H///////////////////////////////////////////n/////////////////////////////////////fNg8AB////////////////////////////////3//f/5//n///////////////////////////////////////////D////////////////////////////////////////4H//////////////////////////////////////////4f///////////////////////////////////////8D///////////////////////////////////////+AeAA//////////////////////////////////////P/AANwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/AHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//cA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH+ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8D8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//g/8B/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//A/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8H/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//YAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4D+APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/4A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/z//f/9//////////////////////////////////w=="
 }
});
