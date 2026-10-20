// westbough: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "westbough",
 "region": "oak",
 "w": 64,
 "h": 30,
 "music": "wind",
 "viewBottom": 480,
 "art": {
  "main": "art/oak/westbough.png#main",
  "pack": "art/oak/westbough.png",
  "parts": {
   "main": [
    0,
    0,
    1024,
    480
   ],
   "L0": [
    0,
    480,
    1410,
    572
   ],
   "L1": [
    0,
    1052,
    1360,
    560
   ],
   "L2": [
    0,
    1612,
    1277,
    541
   ],
   "L3": [
    0,
    2153,
    1173,
    517
   ],
   "L4": [
    0,
    2670,
    1335,
    628
   ],
   "front": [
    0,
    3298,
    110,
    126
   ]
  },
  "layers": [
   {
    "src": "art/oak/westbough.png#L0",
    "f": 0.08
   },
   {
    "src": "art/oak/westbough.png#L1",
    "f": 0.2
   },
   {
    "src": "art/oak/westbough.png#L2",
    "f": 0.4
   },
   {
    "src": "art/oak/westbough.png#L3",
    "f": 0.65
   },
   {
    "src": "art/oak/westbough.png#L4",
    "f": 1.3
   }
  ],
  "front": "art/oak/westbough.png#front",
  "frontAt": [
   905,
   259
  ],
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "nest",
   "edge": "right",
   "a": 368,
   "b": 432,
   "to": "nest",
   "toDoor": "west",
   "x": 1000.0,
   "y": 432,
   "f": -1
  },
  {
   "id": "drop",
   "edge": "bottom",
   "a": 928,
   "b": 992,
   "to": "westdrop",
   "toDoor": "bough",
   "x": 952.0,
   "y": 432,
   "f": 1,
   "keepX": true
  }
 ],
 "items": [
  {
   "id": "feather_westbough_feathers_0",
   "x": 382.0,
   "y": 432,
   "kind": "feather"
  },
  {
   "id": "feather_westbough_feathers_1",
   "x": 392.0,
   "y": 432,
   "kind": "feather"
  },
  {
   "id": "feather_westbough_feathers_2",
   "x": 402.0,
   "y": 432,
   "kind": "feather"
  },
  {
   "id": "cotton_westbough",
   "x": 72.0,
   "y": 320,
   "kind": "cotton",
   "needs": "flap"
  }
 ],
 "hints": [
  {
   "text": "home. it's right over there",
   "l": 0,
   "t": 256,
   "r": 224,
   "b": 448,
   "x": 96,
   "y": 352
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################################",
  "################################################################",
  "################################################################",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "..=====.........................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "##########################################################====##",
  "##########################################################....##",
  "##########################################################....##"
 ],
 "mapAt": [
  -64,
  -30
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
 "wildlife": [
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 32,
   "x1": 96,
   "y": 320,
   "every": [
    12,
    30
   ]
  },
  {
   "kind": "squirrel2",
   "at": "back",
   "x0": 320,
   "x1": 992,
   "y": 432,
   "every": [
    30,
    70
   ]
  },
  {
   "kind": "robin",
   "at": "back",
   "x0": 384,
   "x1": 896,
   "y": 432,
   "every": [
    18,
    40
   ]
  },
  {
   "kind": "hawk",
   "at": "L1",
   "x0": 0,
   "x1": 1360,
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
   "kind": "plane",
   "x": 488.0,
   "y": 320,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   128,
   130,
   131,
   132,
   133,
   135,
   136,
   137,
   138,
   139,
   141,
   142,
   143,
   144,
   145,
   148,
   150,
   152,
   153,
   154,
   156,
   157,
   158,
   161,
   163,
   164,
   165,
   166,
   168,
   169,
   170,
   171,
   172,
   173,
   174,
   175,
   177,
   180,
   181,
   182,
   183,
   184,
   188,
   189,
   192,
   193,
   194,
   197,
   198,
   200,
   201,
   202,
   203,
   204,
   205,
   207,
   208,
   213,
   214,
   215,
   216,
   218,
   219,
   220,
   222,
   223,
   224,
   225,
   226,
   229,
   231,
   233,
   234,
   235,
   237,
   238,
   240,
   241,
   242,
   243,
   247,
   248,
   249,
   251,
   252,
   253,
   254,
   255
  ],
  "bits": "////////////////////////////////////////AD///////////////////////////////////////////v///////////////////////////////////4f+AAAA////////////////////////////////////gPAAAAD//////////////////////////////////z//B/8AH/////////////////////////////////////////+B/////////////////////////////////////v/8//D//////////////////////////////////x//B/8B/////////////////////////////////////////f/w////////////////////////////////////////f////////////////////////////////////////////P////////////////////////////////////9//wf/////////////////////////////////////////Af///////////////////////////////////////////v///////////////////////////////////////w//////////////////////////////////////////j/////////////////////////////////////////8D////////////////////////////////////////3vgA///////////////////////////////////D/wDwAAD/////////////////////////////////////f/8P/////////////////////////////////////////v/4/////////////////////////////////////w/8AGD/////////////////////////////////////Af8Af/////////////////////////////////////////4///////////////////////////////////////g/gAf///////////////////////////////////////8OH//////////////////////////////////////////+/////////////////////////////////////+D/AAD///////////////////////////////////w/4AOAAP///////////////////////////////////////3//////////////////////////////////////////Af///////////////////////////////////////////P////////////////////////////////////////wP/////////////////////////////////////////8D///////////////////////////////////////9//////////////////////////////////////////wAA/////////////////////////////////////////gP//////////////////////////////////////wfwAP///////////////////////////////////////3/////////////////////////////////////////54AD///////////////////////////////////////8////////////////////////////////////////////w///////////////////////////////////7/+D/gD//////////////////////////////////////////gQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//zgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wB8ABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+ABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wf/A4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///4B+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/x8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AH4AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8ADwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4PgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//g/4A8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//A/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
 }
});
