// dandelions: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "dandelions",
 "region": "playground",
 "w": 60,
 "h": 32,
 "music": "playground",
 "viewBottom": 512,
 "art": {
  "main": "art/playground/dandelions.png#main",
  "pack": "art/playground/dandelions.png",
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
    "src": "art/playground/dandelions.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/dandelions.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/dandelions.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/dandelions.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/dandelions.png#L4",
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
   "id": "swings",
   "edge": "left",
   "a": 352,
   "b": 416,
   "to": "swings",
   "toDoor": "dandelions",
   "x": 24.0,
   "y": 416,
   "f": 1,
   "swim": false
  },
  {
   "id": "drifts",
   "edge": "right",
   "a": 352,
   "b": 416,
   "to": "drifts",
   "toDoor": "dandelions",
   "x": 936.0,
   "y": 416,
   "f": -1,
   "swim": false
  },
  {
   "id": "grate",
   "edge": "bottom",
   "a": 704,
   "b": 768,
   "to": "culvert",
   "toDoor": "up",
   "x": 728.0,
   "y": 448,
   "f": 1,
   "keepX": true
  }
 ],
 "items": [
  {
   "id": "cotton_dandelions",
   "x": 888.0,
   "y": 288,
   "kind": "cotton",
   "glide": true
  }
 ],
 "hints": [],
 "gates": [],
 "events": [
  {
   "kind": "scene",
   "name": "dandelion",
   "flag": "sawDandelion",
   "l": 288,
   "t": 0,
   "r": 576,
   "b": 416
  }
 ],
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
  "....................................=====...................",
  "............................................................",
  "............................................................",
  "............................................................",
  "..............................=====.........................",
  "............................................................",
  "....................................................=======.",
  "............................................................",
  "........................=====...............................",
  "............................................................",
  "................=====.......................................",
  ".......########.............................................",
  "......##########....................................######..",
  ".....############.................................########..",
  "############################################....############",
  "############################################....############",
  "############################################====############",
  "############################################....############",
  "############################################....############",
  "############################################....############"
 ],
 "mapAt": [
  1038,
  96
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    184,
    352,
    90,
    0.85
   ],
   [
    475,
    221,
    26,
    0.4
   ],
   [
    777,
    148,
    26,
    0.4
   ],
   [
    308,
    263,
    26,
    0.4
   ],
   [
    467,
    160,
    26,
    0.4
   ],
   [
    389,
    150,
    26,
    0.4
   ],
   [
    161,
    244,
    26,
    0.4
   ],
   [
    858,
    262,
    26,
    0.4
   ],
   [
    609,
    153,
    26,
    0.4
   ],
   [
    416,
    93,
    26,
    0.4
   ],
   [
    700,
    140,
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
  "x": 184.0,
  "y": 368
 },
 "clock": {
  "x": 456.0,
  "y": 416
 },
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
  },
  {
   "kind": "cat",
   "at": "L2",
   "x0": 160,
   "x1": 640,
   "y": 252,
   "every": [
    45,
    110
   ]
  },
  {
   "kind": "pigeon",
   "at": "back",
   "x0": 112,
   "x1": 224,
   "y": 368,
   "every": [
    25,
    60
   ]
  }
 ],
 "foes": [
  {
   "kind": "rope",
   "x": 584.0,
   "y": 416,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1328,
   1329,
   1386,
   1395,
   1433,
   1434,
   1435,
   1436,
   1445,
   1456,
   1490,
   1491,
   1503,
   1504,
   1517,
   1518,
   1519,
   1520,
   1521,
   1522,
   1523,
   1524,
   1525,
   1526,
   1527,
   1528,
   1529,
   1530,
   1531,
   1532,
   1533,
   1534,
   1535,
   1536,
   1538,
   1539,
   1540,
   1541,
   1542,
   1548,
   1549,
   1603,
   1608,
   1663,
   1668,
   1723,
   1728
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/8AADAA8AHwAfAD8AfwB/AP8B/wP/A/8H/w//D/8f/3//wADwAPgA+AD8AP4A/gD/AP+A/8D/wP/g//D/8P/4//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD+AAADAA8AHwAfAD8AfwB/AP8B/wP/A/8H/w//D/8f/3//wADwAPgA+AD8AP4A/gD/AP+A/8D/wP/g//D/8P/4//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABwAPAD8A/wAHAB8AfwD/A/8H/w//H/8//3//////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////AA/AD/AP/A/+D/+P/8//7/////////////////////AAAAAAAAAAAAAAAAAAAAAIAAwADgAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAH///////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAA/AP/4//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP/+/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfw//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP/g//7/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/f///////AAAAAAAAAAAAAAAAAAAAAAAAAAAH+H////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AD/gP/w//7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAABAAcADwAfAH8A/wP/B/8ADwB/Af8D/w//H/8////////////////////////////w//z//v/+/////////////////////////////v/+D/8//3//f/////////////////////////9//3//f////v/8//z//v/+/////////////////////////////z//P/8//z//P/8//z//P/9//////////////////////////////////v/+//7//P/8//z//P/8//7/////////////////////////////////////f/9//////////w=="
 }
});
