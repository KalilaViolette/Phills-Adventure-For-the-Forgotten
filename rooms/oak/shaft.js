// shaft: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "shaft",
 "region": "oak",
 "w": 64,
 "h": 44,
 "music": "oak",
 "viewBottom": 704,
 "art": {
  "main": "art/oak/shaft.png#main",
  "pack": "art/oak/shaft.png",
  "parts": {
   "main": [
    0,
    0,
    1024,
    704
   ],
   "L0": [
    0,
    704,
    1394,
    595
   ],
   "L1": [
    0,
    1299,
    1319,
    618
   ],
   "L2": [
    0,
    1917,
    1236,
    644
   ],
   "L3": [
    0,
    2561,
    1144,
    672
   ],
   "L4": [
    0,
    3233,
    1335,
    919
   ]
  },
  "layers": [
   {
    "src": "art/oak/shaft.png#L0",
    "f": 0.12
   },
   {
    "src": "art/oak/shaft.png#L1",
    "f": 0.3
   },
   {
    "src": "art/oak/shaft.png#L2",
    "f": 0.5
   },
   {
    "src": "art/oak/shaft.png#L3",
    "f": 0.72
   },
   {
    "src": "art/oak/shaft.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/oak/boss_yoyo.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "heart",
   "edge": "bottom",
   "a": 64,
   "b": 160,
   "to": "heartwood",
   "toDoor": "up",
   "x": 104.0,
   "y": 672,
   "f": 1,
   "keepX": true,
   "optional": true
  },
  {
   "id": "crown",
   "edge": "top",
   "a": 736,
   "b": 832,
   "to": "crown",
   "toDoor": "shaft",
   "x": 776.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  },
  {
   "id": "rot",
   "edge": "right",
   "a": 320,
   "b": 384,
   "to": "rot",
   "toDoor": "shaft",
   "x": 1000.0,
   "y": 384,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "feather_shaft_feathers_0",
   "x": 62.0,
   "y": 512,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_shaft_feathers_1",
   "x": 72.0,
   "y": 512,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_shaft_feathers_2",
   "x": 82.0,
   "y": 512,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "crayon_oak",
   "x": 72.0,
   "y": 192,
   "kind": "crayon",
   "col": "#a8703f",
   "needs": "velcro"
  }
 ],
 "hints": [],
 "gates": [
  {
   "x0": 4,
   "y0": 40,
   "x1": 9,
   "y1": 41,
   "flag": "yoyoDown",
   "look": "plug"
  }
 ],
 "events": [],
 "spawn": null,
 "tiles": [
  "##############################################......############",
  "##############################################......############",
  "##............................................................##",
  "##............................................======..........##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................======..........##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##======......................................................##",
  "##..................................................======....##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..............................................................",
  "##..............................................................",
  "##======........................................................",
  "##..............................................................",
  "##.....................................................=======##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##................................................=====.......##",
  "##............................................................##",
  "##............................................................##",
  "##======......................................................##",
  "##......................................................======##",
  "##............................................................##",
  "##............................................................##",
  "##.................................................=====......##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "####......######################################################",
  "####......######################################################",
  "####======######################################################",
  "####......######################################################"
 ],
 "mapAt": [
  44,
  0
 ],
 "floor": "bark",
 "shade": {
  "a": 0.4,
  "lights": [
   [
    512,
    640,
    300,
    0.5
   ],
   [
    182,
    630,
    46,
    0.55
   ],
   [
    190,
    632,
    46,
    0.55
   ],
   [
    194,
    631,
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
   1,
   2,
   1,
   39
  ],
  [
   62,
   2,
   62,
   19
  ],
  [
   62,
   24,
   62,
   39
  ]
 ],
 "boss": {
  "kind": "yoyo",
  "x": 520.0,
  "y": 640,
  "f": -1,
  "flag": "yoyoDown",
  "start": 96,
  "end": 928,
  "walls": [
   [
    0,
    36,
    1,
    39
   ],
   [
    62,
    36,
    63,
    39
   ]
  ]
 },
 "wildlife": [
  {
   "kind": "beetle",
   "at": "back",
   "x0": 64,
   "x1": 960,
   "y": 640
  },
  {
   "kind": "beetle",
   "at": "back",
   "x0": 32,
   "x1": 112,
   "y": 352,
   "every": [
    20,
    50
   ],
   "first": 15
  }
 ],
 "foes": [],
 "detail": {
  "tiles": [
   67,
   68,
   71,
   72,
   73,
   74,
   75,
   76,
   77,
   78,
   80,
   81,
   82,
   84,
   85,
   86,
   87,
   88,
   89,
   90,
   91,
   92,
   93,
   94,
   95,
   96,
   97,
   99,
   100,
   101,
   102,
   104,
   105,
   106,
   107,
   108,
   117,
   119,
   120,
   121,
   122,
   123,
   132,
   133,
   134,
   137,
   138,
   139,
   140,
   141,
   143,
   146,
   147,
   148,
   150,
   151,
   152,
   153,
   155,
   156,
   157,
   158,
   159,
   160,
   161,
   162,
   163,
   164,
   165,
   166,
   167,
   168,
   169,
   170,
   171,
   181,
   182,
   183,
   184,
   186,
   187,
   188
  ],
  "bits": "////////////////////////////////////////4AD///////////////////////////////////////8P/////////////////////////////////////////wAP///////////////////////////////////////+/gD//////////////////////////////////7//H/8P/////////////////////////////////////////+A/////////////////////////////////////////8f/////////////////////////////////////x/8D/AP///////////////////////////////////////j/4////////////////////////////////////5wPHAA/////////////////////////////////////4//CAAP//////////////////////////////////H/8H/wB8////////////////////////////////////////AB////////////////////////////////////////+//////////////////////////////////////////48H////////////////////////////////////////+////////////////////////////////////////////v///////////////////////////////////////wf///////////////////////////////////////////z///////////////////////////8n/wP+Af4A/gBgAP////////////////////////f/5//D/8P/gf8A/wD/////////////////////////////f/4//j/8P/gf+Af////////////////////////////////////////4AP///////////////////////////////////////wB////////////////////////////////h//H/+fz98Af////////////////////////5//g/+B/4D/gH+Af4AP///////////////////////////////////////x/////////////////////////////////////////A/4D//////////////////////////////////wf/Af8Af////////////////////////////////////////P/A/////////////////////////////////////x//B////////////////////////////////////////////P///////////////////////////////////////z/8////////////////////////////////////////D//////////////////////////////////////////8f/////////////////////////////////////////nn////////////////////////////////////////7//////////////////////////////////////////n//////////////////////////////////////////+A////////////////////////////////////////AAb/////////////////////////////////////v/8f///////////////////////////////////////4H8APAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//w8HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8H+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/eBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+ABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8APwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/w/4A8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//x/8B+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
 }
});
