// balloonwall: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "balloonwall",
 "region": "playground",
 "w": 60,
 "h": 32,
 "music": "playground",
 "viewBottom": 512,
 "art": {
  "main": "art/playground/balloonwall.png#main",
  "pack": "art/playground/balloonwall.png",
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
    "src": "art/playground/balloonwall.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/balloonwall.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/balloonwall.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/balloonwall.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/balloonwall.png#L4",
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
   "id": "lost",
   "edge": "left",
   "a": 352,
   "b": 416,
   "to": "lostfound",
   "toDoor": "balloons",
   "x": 24.0,
   "y": 416,
   "f": 1,
   "swim": false
  },
  {
   "id": "picnic",
   "edge": "right",
   "a": 352,
   "b": 416,
   "to": "picnic",
   "toDoor": "balloons",
   "x": 936.0,
   "y": 416,
   "f": -1,
   "swim": false
  }
 ],
 "items": [],
 "hints": [
  {
   "text": "they won't pop for a sword",
   "l": 320,
   "t": 160,
   "r": 448,
   "b": 368,
   "x": 352,
   "y": 256,
   "until": "balloon_wall"
  }
 ],
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
  "........======................................======........",
  "............................................................",
  "..................########################..................",
  "................############################................",
  "...............##############################...............",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  858,
  96
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    880,
    106,
    150,
    0.95
   ],
   [
    41,
    231,
    26,
    0.4
   ],
   [
    19,
    208,
    26,
    0.4
   ],
   [
    938,
    138,
    26,
    0.4
   ],
   [
    935,
    245,
    26,
    0.4
   ],
   [
    849,
    54,
    26,
    0.4
   ],
   [
    706,
    208,
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
   "id": "balloon_wall",
   "x0": 28,
   "y0": 0,
   "x1": 29,
   "y1": 22,
   "hp": 1,
   "look": "balloons",
   "need": "squeak"
  }
 ],
 "wildlife": [
  {
   "kind": "moth",
   "at": "back",
   "y": 90,
   "x": 800,
   "every": [
    3,
    9
   ]
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 94,
   "x": 806,
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
   "kind": "balloon",
   "x": 200.0,
   "y": 256,
   "f": -1
  },
  {
   "kind": "teeth",
   "x": 104.0,
   "y": 416,
   "f": -1
  },
  {
   "kind": "horn",
   "x": 840.0,
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
   1545,
   1546,
   1547,
   1548,
   1549,
   1550,
   1551,
   1552,
   1553,
   1554,
   1555,
   1556
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/H///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/wD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8A//j///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAH8H//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/AD/wP/4"
 }
});
