// boiler: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "boiler",
 "region": "greenhouse",
 "w": 40,
 "h": 24,
 "music": "greenhouse",
 "viewBottom": 384,
 "art": {
  "main": "art/greenhouse/boiler.png#main",
  "pack": "art/greenhouse/boiler.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    384
   ],
   "L0": [
    0,
    384,
    1348,
    493
   ],
   "L1": [
    0,
    877,
    1204,
    455
   ],
   "L2": [
    0,
    1332,
    1044,
    426
   ],
   "L3": [
    0,
    1758,
    868,
    407
   ]
  },
  "layers": [
   {
    "src": "art/greenhouse/boiler.png#L0",
    "f": 0.12,
    "fy": 0.45
   },
   {
    "src": "art/greenhouse/boiler.png#L1",
    "f": 0.3,
    "fy": 0.65
   },
   {
    "src": "art/greenhouse/boiler.png#L2",
    "f": 0.5,
    "fy": 0.8
   },
   {
    "src": "art/greenhouse/boiler.png#L3",
    "f": 0.72,
    "fy": 0.9
   }
  ],
  "uses": [
   "art/greenhouse/greenhouse_sprites.png",
   "art/greenhouse/greenhouse_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/greenhouse/greenhouse_items.png"
 },
 "doors": [
  {
   "id": "fern",
   "edge": "top",
   "a": 288,
   "b": 352,
   "to": "fernhouse",
   "toDoor": "boiler",
   "x": 320.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "crayon_greenhouse",
   "x": 520.0,
   "y": 160,
   "kind": "crayon",
   "col": "#f07aa8"
  },
  {
   "id": "seed_boiler_arrive_0",
   "x": 368.0,
   "y": 320,
   "kind": "seed"
  },
  {
   "id": "seed_boiler_arrive_1",
   "x": 376.0,
   "y": 320,
   "kind": "seed"
  },
  {
   "id": "seed_boiler_arrive_2",
   "x": 384.0,
   "y": 320,
   "kind": "seed"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##################....##################",
  "##################....##################",
  "#......................................#",
  "#......................................#",
  "#......................................#",
  "#......................................#",
  "#...............========...............#",
  "#......................................#",
  "#......................................#",
  "#......................................#",
  "#.........................=========....#",
  "#......................................#",
  "#########..............................#",
  "#########..............................#",
  "#########..............................#",
  "#########.....===========..............#",
  "#########..............................#",
  "#########..............................#",
  "#########..............................#",
  "#########..............................#",
  "########################################",
  "########################################",
  "########################################",
  "########################################"
 ],
 "mapAt": [
  1360,
  32
 ],
 "floor": "tile",
 "shade": {
  "a": 0.62,
  "lights": [
   [
    312,
    32,
    120,
    0.8
   ]
  ],
  "tint": "#0c2014"
 },
 "ambient": [
  "drips",
  "motes"
 ],
 "wildlife": [
  {
   "kind": "woodlouse",
   "at": "back",
   "x0": 224,
   "x1": 576,
   "y": 320,
   "every": [
    20,
    50
   ]
  }
 ],
 "foes": [
  {
   "kind": "sprinkler",
   "x": 488.0,
   "y": 320,
   "f": -1
  }
 ]
});
