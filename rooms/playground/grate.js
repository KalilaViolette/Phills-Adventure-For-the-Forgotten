// grate: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "grate",
 "region": "playground",
 "w": 40,
 "h": 40,
 "music": "playground",
 "viewBottom": 640,
 "art": {
  "main": "art/playground/grate.png#main",
  "pack": "art/playground/grate.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    640
   ],
   "L0": [
    0,
    640,
    1348,
    587
   ],
   "L1": [
    0,
    1227,
    1204,
    599
   ],
   "L2": [
    0,
    1826,
    1044,
    612
   ],
   "L3": [
    0,
    2438,
    868,
    626
   ],
   "L4": [
    0,
    3064,
    836,
    836
   ],
   "front": [
    0,
    3900,
    128,
    224
   ]
  },
  "layers": [
   {
    "src": "art/playground/grate.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/grate.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/grate.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/grate.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/grate.png#L4",
    "f": 1.3
   }
  ],
  "front": "art/playground/grate.png#front",
  "frontAt": [
   256,
   416
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
   "id": "tent",
   "edge": "left",
   "a": 352,
   "b": 416,
   "to": "partytent",
   "toDoor": "grate",
   "x": 24.0,
   "y": 416,
   "f": 1,
   "swim": false
  },
  {
   "id": "storm",
   "edge": "bottom",
   "a": 272,
   "b": 368,
   "to": "stormdrain_pg",
   "toDoor": "playground",
   "x": 312.0,
   "y": 624,
   "f": 1,
   "keepX": true,
   "swim": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################",
  "################~~~~~~~~################"
 ],
 "mapAt": [
  1218,
  96
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    104,
    400,
    90,
    0.85
   ],
   [
    544,
    106,
    150,
    0.95
   ],
   [
    265,
    163,
    26,
    0.4
   ],
   [
    541,
    226,
    26,
    0.4
   ],
   [
    338,
    269,
    26,
    0.4
   ],
   [
    217,
    304,
    26,
    0.4
   ],
   [
    576,
    77,
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
 "rest": {
  "x": 104.0,
  "y": 416
 },
 "wildlife": [
  {
   "kind": "moth",
   "at": "back",
   "y": 90,
   "x": 544,
   "every": [
    3,
    9
   ]
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 94,
   "x": 550,
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
   "x1": 550,
   "y0": 177,
   "y1": 278,
   "every": [
    8,
    22
   ]
  },
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 550,
   "y0": 156,
   "y1": 256,
   "every": [
    12,
    30
   ],
   "first": 9
  },
  {
   "kind": "raccoon",
   "at": "back",
   "x0": 384,
   "x1": 624,
   "y": 416,
   "every": [
    50,
    110
   ]
  }
 ],
 "foes": [
  {
   "kind": "horn",
   "x": 520.0,
   "y": 416,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1003,
   1004,
   1008,
   1009,
   1010,
   1011,
   1012,
   1025,
   1026,
   1027,
   1028,
   1029,
   1030,
   1031,
   1032,
   1033,
   1034,
   1035,
   1036,
   1037,
   1038,
   1039,
   1055,
   1064,
   1095,
   1104,
   1135,
   1175,
   1215,
   1304,
   1335,
   1344,
   1375,
   1384,
   1415,
   1424,
   1464
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8f//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+D//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/8D/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/AD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8H/3///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD8AP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/z//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7/////////8P/8//7//v/////////////////////////+//z//g//P/9//3//////////////////////////f/9//3////7//v/+//7//v/+//////////////////////////9//z//P/8//z//P/8//z//P/8//z//P/8//3//f/9////////////+//7//P/8//z//P/8//7//v/+//7//v////////////////////////////////////////////7//v/8//z//P/8//z//v/+//7/////////////////////////////////////////////f/9//3//P/8//z/////////+//7//v/8//z//P/8//z//P/8//z//v/+//4//z//P/8//z//H/8f/x//H/8f/z//P/8//3//f/9////8//z//P/+//7//v/+//7//v/+//7//v//////////f/9//3//f/9//3//f/9//3//f/9//3//f/9//3/////////////////////////////////////////+//7///////////////////////////////////////9//3//f/8//z//P/8//z//P/8//z//P/8//z//f/////////8="
 }
});
