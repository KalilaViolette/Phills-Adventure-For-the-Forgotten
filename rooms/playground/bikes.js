// bikes: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "bikes",
 "region": "playground",
 "w": 60,
 "h": 32,
 "music": "playground",
 "viewBottom": 512,
 "art": {
  "main": "art/playground/bikes.png#main",
  "pack": "art/playground/bikes.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    512
   ],
   "L0": [
    0,
    512,
    1386,
    572
   ],
   "L1": [
    0,
    1084,
    1300,
    560
   ],
   "L2": [
    0,
    1644,
    1204,
    548
   ],
   "L3": [
    0,
    2192,
    1098,
    533
   ],
   "L4": [
    0,
    2725,
    1252,
    669
   ]
  },
  "layers": [
   {
    "src": "art/playground/bikes.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/bikes.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/bikes.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/bikes.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/bikes.png#L4",
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
   "id": "tires",
   "edge": "left",
   "a": 352,
   "b": 416,
   "to": "tires",
   "toDoor": "bikes",
   "x": 24.0,
   "y": 416,
   "f": 1,
   "swim": false
  },
  {
   "id": "chips",
   "edge": "right",
   "a": 352,
   "b": 416,
   "to": "woodchips",
   "toDoor": "bikes",
   "x": 936.0,
   "y": 416,
   "f": -1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "marble_bikes_marbles_0",
   "x": 670.0,
   "y": 160,
   "kind": "marble"
  },
  {
   "id": "marble_bikes_marbles_1",
   "x": 680.0,
   "y": 160,
   "kind": "marble"
  },
  {
   "id": "marble_bikes_marbles_2",
   "x": 690.0,
   "y": 160,
   "kind": "marble"
  }
 ],
 "hints": [
  {
   "text": "the gate's latched. the latch is way up on the post",
   "l": 576,
   "t": 256,
   "r": 768,
   "b": 416,
   "x": 672,
   "y": 320,
   "until": "latchBikes"
  }
 ],
 "gates": [
  {
   "x0": 48,
   "y0": 0,
   "x1": 49,
   "y1": 25,
   "flag": "latchBikes",
   "look": "fence"
  }
 ],
 "events": [],
 "spawn": null,
 "tiles": [
  "..............................................##............",
  "..............................................##............",
  "..............................................##............",
  "..............................................##............",
  "..............................................##............",
  "..............................................##............",
  "..............................................##............",
  "..............................................##............",
  "............................................................",
  "............................................................",
  ".......................................=======..............",
  "................................======......................",
  "............................................................",
  "............................................................",
  "........................======..............................",
  "............................................................",
  "............................................................",
  "............................................................",
  "................======......................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "........=======.............................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  638,
  96
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    72,
    74,
    150,
    0.95
   ],
   [
    457,
    244,
    26,
    0.4
   ],
   [
    388,
    334,
    26,
    0.4
   ],
   [
    16,
    355,
    26,
    0.4
   ],
   [
    676,
    298,
    26,
    0.4
   ],
   [
    771,
    111,
    26,
    0.4
   ],
   [
    787,
    251,
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
   "id": "latchBikes",
   "x0": 46,
   "y0": 8,
   "x1": 47,
   "y1": 9,
   "hp": 1,
   "look": "latch",
   "flag": "latchBikes"
  }
 ],
 "wildlife": [
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 781,
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
   "x1": 781,
   "y0": 156,
   "y1": 256,
   "every": [
    12,
    30
   ],
   "first": 9
  }
 ],
 "foes": [
  {
   "kind": "teeth",
   "x": 328.0,
   "y": 416,
   "f": -1
  },
  {
   "kind": "horn",
   "x": 552.0,
   "y": 416,
   "f": -1
  },
  {
   "kind": "balloon",
   "x": 488.0,
   "y": 96,
   "f": -1
  },
  {
   "kind": "bucket",
   "x": 680.0,
   "y": 416,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1503,
   1504,
   1505,
   1506,
   1507,
   1508,
   1509,
   1510,
   1511,
   1512,
   1513,
   1514,
   1515,
   1516,
   1517,
   1518,
   1519,
   1520,
   1521,
   1522,
   1523,
   1524,
   1526,
   1528,
   1529,
   1530,
   1531,
   1532,
   1533,
   1534,
   1535,
   1536,
   1537,
   1538,
   1539,
   1540,
   1541,
   1542,
   1543,
   1544,
   1545,
   1546,
   1551,
   1552,
   1553,
   1554,
   1555,
   1556
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA8AfwP/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAA/AD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP+A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4f////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+f//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP/A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////////////wAAAAAAAAAAAAAAAAAAAAAAAAAA4AD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP4A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgf///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+D//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAB//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD/4P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8D//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/gP/8//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/z///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/gD/wP/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/D/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA"
 }
});
