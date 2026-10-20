// gate: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "gate",
 "region": "playground",
 "w": 60,
 "h": 30,
 "music": "playground",
 "viewBottom": 480,
 "art": {
  "main": "art/playground/gate.png#main",
  "pack": "art/playground/gate.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    480
   ],
   "L0": [
    0,
    480,
    1386,
    568
   ],
   "L1": [
    0,
    1048,
    1300,
    551
   ],
   "L2": [
    0,
    1599,
    1204,
    532
   ],
   "L3": [
    0,
    2131,
    1098,
    510
   ],
   "L4": [
    0,
    2641,
    1252,
    628
   ]
  },
  "layers": [
   {
    "src": "art/playground/gate.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/gate.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/gate.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/gate.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/gate.png#L4",
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
   "id": "eastedge",
   "edge": "left",
   "a": 320,
   "b": 384,
   "to": "eastedge",
   "toDoor": "playground",
   "x": 24.0,
   "y": 384,
   "f": 1,
   "swim": false
  },
  {
   "id": "bins",
   "edge": "right",
   "a": 320,
   "b": 384,
   "to": "bins",
   "toDoor": "gate",
   "x": 936.0,
   "y": 384,
   "f": -1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "marble_gate_marbles_0",
   "x": 126.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_gate_marbles_1",
   "x": 136.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_gate_marbles_2",
   "x": 146.0,
   "y": 384,
   "kind": "marble"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##........................................",
  "..................##...............................======...",
  "..................##........................................",
  "..................##..........................###...........",
  "..............................................###...........",
  "..............................................###...........",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  398,
  98
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    416,
    106,
    150,
    0.95
   ]
  ],
  "tint": "#2a1a3a"
 },
 "ambient": [
  "motes",
  "fireflies"
 ],
 "wildlife": [
  {
   "kind": "moth",
   "at": "back",
   "y": 90,
   "x": 416,
   "every": [
    3,
    9
   ]
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 94,
   "x": 422,
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
   "y0": 154,
   "y1": 255,
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
   "y0": 132,
   "y1": 233,
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
   "y": 236,
   "every": [
    45,
    110
   ]
  },
  {
   "kind": "pigeon",
   "at": "back",
   "x0": 32,
   "x1": 704,
   "y": 384,
   "every": [
    25,
    60
   ]
  },
  {
   "kind": "raccoon",
   "at": "back",
   "x0": 480,
   "x1": 928,
   "y": 384,
   "every": [
    60,
    130
   ]
  }
 ],
 "foes": [
  {
   "kind": "teeth",
   "x": 488.0,
   "y": 384,
   "f": -1
  },
  {
   "kind": "jack",
   "x": 840.0,
   "y": 384,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1383,
   1384,
   1385,
   1391,
   1392,
   1393,
   1394,
   1395,
   1396,
   1397,
   1398,
   1399,
   1400,
   1401,
   1402,
   1403,
   1404,
   1405,
   1406,
   1407,
   1408,
   1409,
   1410,
   1411,
   1412,
   1413,
   1414,
   1415,
   1416,
   1417,
   1418,
   1419,
   1420,
   1421,
   1422,
   1423,
   1424,
   1425,
   1429,
   1430,
   1431,
   1432,
   1433,
   1434,
   1435,
   1436
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwD/D/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD8AP/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAf//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D/z////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4B//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8f///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP8P//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D/x//////////AAAAAAAAAAAAAAAAAAAAAAAAAAD/wP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/gP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAA/A/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAf//////////////wAAAAAAAAAAAAAAAAAAAAAAAAAA//z/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAA8AD+AP/A//g="
 }
});
