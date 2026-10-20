// clearing: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "clearing",
 "region": "rootwood",
 "w": 46,
 "h": 26,
 "music": "rootwood",
 "viewBottom": 416,
 "art": {
  "main": "art/rootwood/clearing.png#main",
  "pack": "art/rootwood/clearing.png",
  "parts": {
   "main": [
    0,
    0,
    736,
    416
   ],
   "L0": [
    0,
    416,
    1359,
    560
   ],
   "L1": [
    0,
    976,
    1232,
    532
   ],
   "L2": [
    0,
    1508,
    1092,
    500
   ],
   "L3": [
    0,
    2008,
    937,
    464
   ],
   "L4": [
    0,
    2472,
    960,
    544
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/clearing.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/clearing.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/clearing.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/clearing.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/clearing.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/rootwood/rootwood_sprites.png",
   "art/rootwood/rootwood_items.png",
   "art/rootwood/soldier.png",
   "art/crow/crow.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/rootwood/rootwood_items.png"
 },
 "doors": [
  {
   "id": "trail",
   "edge": "left",
   "a": 256,
   "b": 320,
   "to": "trail",
   "toDoor": "clearing",
   "x": 24.0,
   "y": 320,
   "f": 1
  },
  {
   "id": "east",
   "edge": "right",
   "a": 256,
   "b": 320,
   "to": "eastedge",
   "toDoor": "clearing",
   "x": 712.0,
   "y": 320,
   "f": -1
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##############################################",
  "##############################################",
  "##############################################",
  "##############################################",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "..............................................",
  "##############################################",
  "##############################################",
  "##############################################",
  "##############################################",
  "##############################################",
  "##############################################"
 ],
 "mapAt": [
  302,
  120
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.42,
  "lights": [
   [
    320,
    224,
    220,
    0.9
   ]
  ]
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "boss": {
  "kind": "soldier",
  "x": 520.0,
  "y": 320,
  "f": -1,
  "flag": "soldierDown",
  "start": 320,
  "walls": [
   [
    0,
    16,
    1,
    19
   ],
   [
    44,
    16,
    45,
    19
   ]
  ]
 },
 "perch": {
  "x": 136.0,
  "y": 306
 },
 "wildlife": [
  {
   "kind": "fox",
   "at": "L1",
   "x0": 224,
   "x1": 445,
   "y": 222
  },
  {
   "kind": "deer",
   "at": "L2",
   "x0": 160,
   "x1": 528,
   "y": 250,
   "every": [
    60,
    120
   ]
  }
 ],
 "foes": [],
 "detail": {
  "tiles": [
   139,
   140,
   141,
   142,
   143,
   144,
   145,
   147,
   148,
   149,
   151,
   152,
   157,
   158,
   159,
   161,
   162,
   165,
   166,
   167,
   169,
   170,
   171,
   172,
   173,
   175,
   176,
   177,
   178,
   179,
   180,
   181,
   182,
   183,
   184,
   185,
   188,
   189,
   190,
   191,
   192,
   193,
   194,
   195,
   196,
   197,
   198,
   199,
   200,
   201,
   202,
   203,
   204,
   205,
   206,
   207,
   209,
   210,
   211,
   213,
   214,
   215,
   219,
   220,
   221,
   223,
   224,
   225,
   228
  ],
  "bits": "//////////////////////////f/8//z//H/8f/x//D//////////////////////////////////+f/A/8AAP//////////////////////////////////////nwAA////////////////////////////////////////D///////////////////////////h/8H/wf/B/4H/geAB//////////////////////////////////////////+/////////////////////////////////////wf/Af//////////////////////////////////////////8P///////////////////////////////////////2D////////////////////////////////////8H/AH4AP/////////////////////////////////P/494BkAAf//////////////////////////////////v3++P74////////////////////////////////n/+P/wP8A/gD//////////////////////////////////z//P/8///////////////////////////////////////////4P/////////////////////////////////////v/49/D//////////////////////////////////x//B/8AYf//////////////////////////////////////4f+A////////////////////////////////////////H/z///////////////////////////////////////8P///////////////////////////////////////////8/////////////////////////////////////wAfAAD/////////////////////////////////9//g+eAAAP/////////////////////////////+J4ADAAMAAAAA/////////////////////////////////////x//AH///////////////////////////////n/+P/4//hD+AP////////////////////////////////////8f/w8H////////////////////////////////////////v///////////////////////////////////////z38AP/////////////////////////////3/wP8A/gD4APAA//////////////////////////9//z//P/8f/x//AAD//////////////////////////////////////////v///////////////////////////////////////w/+///////////////////////////////////9/8AfAAcB/wAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4D+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwfwAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//f/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8ABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//x/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8ADwADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+APgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///9/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8//wADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
 }
});
