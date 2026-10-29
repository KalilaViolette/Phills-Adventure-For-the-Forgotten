// highbranch: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "highbranch",
 "region": "oak",
 "w": 64,
 "h": 36,
 "music": "wind",
 "viewBottom": 576,
 "art": {
  "main": "art/oak/highbranch.webp#main",
  "pack": "art/oak/highbranch.webp",
  "parts": {
   "main": [
    0,
    0,
    1024,
    576
   ],
   "L0": [
    0,
    576,
    673,
    402
   ],
   "L1": [
    0,
    978,
    715,
    355
   ],
   "L2": [
    0,
    1333,
    796,
    163
   ],
   "L3": [
    0,
    1496,
    892,
    423
   ],
   "L4": [
    0,
    1919,
    1334,
    624
   ]
  },
  "layers": [
   {
    "src": "art/oak/highbranch.webp#L0",
    "f": 0.08
   },
   {
    "src": "art/oak/highbranch.webp#L1",
    "f": 0.2,
    "x": 4,
    "y": 18
   },
   {
    "src": "art/oak/highbranch.webp#L2",
    "f": 0.4,
    "y": 300
   },
   {
    "src": "art/oak/highbranch.webp#L3",
    "f": 0.65,
    "y": 88
   },
   {
    "src": "art/oak/highbranch.webp#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/oak/boss_kite.png",
   "art/crow/crow.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "crown",
   "edge": "left",
   "a": 416,
   "b": 480,
   "to": "crown",
   "toDoor": "branch",
   "x": 24.0,
   "y": 480,
   "f": 1
  },
  {
   "id": "greenhouse",
   "edge": "right",
   "a": 416,
   "b": 480,
   "to": "roofwalk",
   "toDoor": "oak",
   "x": 1000.0,
   "y": 480,
   "f": -1,
   "far": true
  }
 ],
 "items": [
  {
   "id": "memory_page",
   "x": 872.0,
   "y": 480,
   "kind": "memory"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################################",
  "################################################################",
  "################################################################",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##..............................................................",
  "##......======....................................======........",
  "##..............................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################"
 ],
 "mapAt": [
  128,
  -36
 ],
 "floor": "bark",
 "shade": {
  "a": 0.08,
  "lights": [
   [
    916,
    444,
    110,
    1.0
   ]
  ],
  "tint": null
 },
 "ambient": [
  "leaves",
  "dust"
 ],
 "boss": {
  "kind": "kite",
  "x": 584.0,
  "y": 480,
  "f": -1,
  "flag": "kiteDown",
  "start": 96,
  "end": 928,
  "walls": [
   [
    0,
    26,
    1,
    29
   ],
   [
    62,
    26,
    63,
    29
   ]
  ]
 },
 "rest": {
  "x": 936.0,
  "y": 480
 },
 "wildlife": [
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 128,
   "x1": 208,
   "y": 384,
   "every": [
    12,
    30
   ]
  },
  {
   "kind": "squirrel2",
   "at": "back",
   "x0": 32,
   "x1": 960,
   "y": 480,
   "every": [
    30,
    70
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
  },
  {
   "kind": "goose",
   "at": "L0",
   "x0": 0,
   "x1": 1410,
   "y0": 40,
   "y1": 90,
   "every": [
    90,
    180
   ],
   "first": 20
  }
 ],
 "foes": [],
 "detail": {
  "tiles": [
   131,
   132,
   134,
   135,
   137,
   138,
   139,
   140,
   141,
   142,
   143,
   144,
   145,
   146,
   147,
   148,
   149,
   150,
   151,
   153,
   154,
   157,
   159,
   161,
   163,
   164,
   165,
   166,
   167,
   168,
   169,
   171,
   172,
   173,
   174,
   175,
   176,
   177,
   180,
   181,
   182,
   184,
   185,
   188,
   191,
   194,
   197,
   200,
   201,
   202,
   203,
   207,
   208,
   209,
   210,
   211,
   212,
   214,
   216,
   218,
   220,
   221,
   222,
   223,
   224,
   225,
   226,
   228,
   234,
   240,
   242,
   243,
   244,
   245,
   246,
   247,
   249,
   250,
   251,
   253,
   254,
   255,
   257,
   321,
   322,
   385,
   386,
   449,
   514,
   577,
   578,
   641,
   705,
   769,
   770,
   833,
   897,
   898,
   961,
   962,
   1025,
   1026,
   1089,
   1154,
   1218,
   1281,
   1345,
   1346,
   1410,
   1473,
   1474,
   1537
  ],
  "bits": "//////////////////////////////////////A/wAD///////////////////////////////////////8/8f////////////////////////////////////////wA//////////////////////////////////////AH4AD/////////////////////////////////////g/8AH//////////////////////////////////////////g////////////////////////////////////////H//////////////////////////////////////////h+P/////////////////////////////////////4AQAA//////////////////////////////////////AHQAD///////////////////////////////////////8Af//////////////////////////////////////////9////////////////////////////////////////8A///////////////////////////////////////////P////////////////////////////////////8//w///////////////////////////////////////////+D/////////////////////////////////////D/8AAP///////////////////////////////////////z///////////////////////////////////////8f/AB////////////////////////////////////8B+ADgAP///////////////////////////////////////z//////////////////////////////////////////+P//////////////////////////////////////////w/////////////////////////////////////////gP/////////////////////////////////////////+D///////////////////////////////////////9///////////////////////////////////////j/wPAA//////////////////////////////////8A/wAAAAD/////////////////////////////////////B/8AH//////////////////////////////////////////+//////////////////////////////////////4fAAf//////////////////////////////////////x+AAP///////////////////////////////////////wHg/////////////////////////////////////////gD///////////////////////////////////////8fj/////////////////////////////////////H/AIAA/////////////////////////////////////3//H///////////////////////////////////////////AP////////////////////////////////////////+A////////////////////////////////////////AH///////////////////////////////////////9//B/////////////////////////////////////H/AOAA/////////////////////////////////////3P/AP//////////////////////////////////////zx8AB///////////////////////////////////////+PAA/8D4APAA4ADAAMAAgACAAIAAgAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+D/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD98OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AHEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//3AeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//H/wBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Bw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgAD//////////////////v/+//7//v/+//7//v///////4AAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////////////+//7//v/+//4AAIAAwADAAMAAwADAAMAA4ADgAOAA4ADAAMAAwADAAP///////////////////////v/+//7//v/+//7//v/+wADAAMAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v/+///////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7////////////////////+//7//v/+//7///////////////////////////////8AAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAAAAAAAAAP////////////7//v/+//7//P/8//z//P/8//z//v/+//7//v/+//7///////////////7///////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAP////////////////////////////////////7//v//gACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////////////////////////////////////gAAAAAAAAAAAAAAAIAAgACAAAAAAAAAAAAAAAAAAAAA//7//v/+//7//P/8//z//P/8//7//v/+//////////8AAAAAgACAAIAAgACAAIAAgACAAIAAgADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAIAA//////////7//v/+//7//v/+//z//P/8//7//v/+//z//P/8//z//v/+/////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD//////////v/+//7//v/+//7//v/+//7//v/+//7//oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7//v/+//7//v/+//7///////////////////////8="
 }
});
