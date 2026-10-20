// spinner: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "spinner",
 "region": "playground",
 "w": 60,
 "h": 28,
 "music": "playground",
 "viewBottom": 448,
 "art": {
  "main": "art/playground/spinner.png#main",
  "pack": "art/playground/spinner.png",
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
   "L4": [
    0,
    2556,
    1252,
    586
   ]
  },
  "layers": [
   {
    "src": "art/playground/spinner.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/spinner.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/spinner.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/spinner.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/spinner.png#L4",
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
   "id": "chips",
   "edge": "left",
   "a": 320,
   "b": 384,
   "to": "woodchips",
   "toDoor": "spinner",
   "x": 24.0,
   "y": 384,
   "f": 1,
   "swim": false
  },
  {
   "id": "slide",
   "edge": "right",
   "a": 320,
   "b": 384,
   "to": "slide",
   "toDoor": "spinner",
   "x": 936.0,
   "y": 384,
   "f": -1,
   "swim": false
  }
 ],
 "items": [],
 "hints": [],
 "gates": [
  {
   "x0": 56,
   "y0": 0,
   "x1": 57,
   "y1": 23,
   "flag": "gateSpinner",
   "look": "fence"
  }
 ],
 "events": [
  {
   "kind": "scene",
   "name": "spinner",
   "flag": "rodeSpinner",
   "l": 352,
   "t": 0,
   "r": 608,
   "b": 384
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
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  ".......########...............................#########.....",
  "......##########.............................###########....",
  ".....############...........................############....",
  "##################....################...###################",
  "###################...################..####################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  758,
  70
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    128,
    74,
    150,
    0.95
   ],
   [
    877,
    85,
    26,
    0.4
   ],
   [
    534,
    176,
    26,
    0.4
   ],
   [
    921,
    149,
    26,
    0.4
   ],
   [
    429,
    201,
    26,
    0.4
   ],
   [
    367,
    290,
    26,
    0.4
   ],
   [
    843,
    240,
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
 "cranks": [
  {
   "id": "gateSpinner",
   "x": 808.0,
   "y": 336,
   "tx": 50,
   "ty": 21,
   "flag": "gateSpinner"
  }
 ],
 "ride": {
  "x": 488.0,
  "y": 384
 },
 "wildlife": [
  {
   "kind": "moth",
   "at": "back",
   "y": 58,
   "x": 128,
   "every": [
    3,
    9
   ]
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 62,
   "x": 134,
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
   "y0": 477,
   "y1": 577,
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
   "y0": 455,
   "y1": 556,
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
   "y": 460,
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
   "y": 336,
   "every": [
    25,
    60
   ]
  }
 ],
 "foes": [
  {
   "kind": "rope",
   "x": 184.0,
   "y": 336,
   "f": -1
  },
  {
   "kind": "balloon",
   "x": 728.0,
   "y": 224,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1208,
   1209,
   1210,
   1211,
   1212,
   1213,
   1247,
   1248,
   1249,
   1250,
   1251,
   1252,
   1266,
   1275,
   1305,
   1325,
   1336,
   1364,
   1383,
   1384,
   1397,
   1422,
   1423,
   1458,
   1480,
   1519,
   1520,
   1521,
   1538,
   1539
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMADwA/AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP/g/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wf///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP/AAAMADwAfAB8APwB/AH8A/wH/A/8D/wf/D/8P/x//f//AAPAA+AD4APwA/gD+AP8A/4D/wP/A/+D/8P/w//j//gADAA8AHwAfAD8AfwB/AP8B/wP/A/8H/w//D/8f/3//AAMADwAfAB8APwB/AH8A/wH/A/8D/wf/D/8P/x//f//AAPAA+AD4APwA/gD+AP8A/4D/wP/A/+D/8P/w//j//gADAA8AHwAfAD8AfwB/AP8B/wP/A/8H/w//D/8f/3//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAcADwA/Af8ABwAfAH8A/wP/B/8P/x//P/9//////////////////8AA8AD4APgA/AD+AP4A/wD/gP/A/8D/4P/w//D/+P/+AAAAAAAAAAAAAAAAAAAAAAAAAAEABwAPAB8AfwH/B/8ADwA/AP8D/wf/D/8//3///////////////////////8AA8AD4APgA/AD+AP4A/wD/gP/A/8D/4P/w//D/+P/+AAMADwAfAB8APwB/AH8A/wH/A/8D/wf/D/8P/x//f//wAPwA/wD/gP/g//D/+P/8/////////////////////wAAAAAAAAAAAAAAAAAAAAAAAIAAwADgAPgA/AD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAP/8/////////////wAHAB8AfwD/A/8H/w//H/8//3//////////////////"
 }
});
