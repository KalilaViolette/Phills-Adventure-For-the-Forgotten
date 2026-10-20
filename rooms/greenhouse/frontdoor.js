// frontdoor: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "frontdoor",
 "region": "greenhouse",
 "w": 44,
 "h": 24,
 "music": "greenhouse",
 "viewBottom": 384,
 "art": {
  "main": "art/greenhouse/frontdoor.png#main",
  "pack": "art/greenhouse/frontdoor.png",
  "parts": {
   "main": [
    0,
    0,
    704,
    384
   ],
   "L0": [
    0,
    384,
    1355,
    493
   ],
   "L1": [
    0,
    877,
    1223,
    455
   ],
   "L2": [
    0,
    1332,
    1076,
    426
   ],
   "L3": [
    0,
    1758,
    914,
    407
   ],
   "L4": [
    0,
    2165,
    919,
    503
   ]
  },
  "layers": [
   {
    "src": "art/greenhouse/frontdoor.png#L0",
    "f": 0.12,
    "fy": 0.45
   },
   {
    "src": "art/greenhouse/frontdoor.png#L1",
    "f": 0.3,
    "fy": 0.65
   },
   {
    "src": "art/greenhouse/frontdoor.png#L2",
    "f": 0.5,
    "fy": 0.8
   },
   {
    "src": "art/greenhouse/frontdoor.png#L3",
    "f": 0.72,
    "fy": 0.9
   },
   {
    "src": "art/greenhouse/frontdoor.png#L4",
    "f": 1.3
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
   "id": "hill",
   "edge": "left",
   "a": 224,
   "b": 288,
   "to": "hillpath",
   "toDoor": "door",
   "x": 24.0,
   "y": 288,
   "f": 1
  },
  {
   "id": "bench",
   "edge": "right",
   "a": 224,
   "b": 288,
   "to": "pottingbench",
   "toDoor": "door",
   "x": 680.0,
   "y": 288,
   "f": -1
  },
  {
   "id": "cold",
   "edge": "bottom",
   "a": 480,
   "b": 544,
   "to": "coldframes",
   "toDoor": "door",
   "x": 584.0,
   "y": 288,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "seed_frontdoor_pots_0",
   "x": 336.0,
   "y": 160,
   "kind": "seed"
  },
  {
   "id": "seed_frontdoor_pots_1",
   "x": 344.0,
   "y": 160,
   "kind": "seed"
  },
  {
   "id": "seed_frontdoor_pots_2",
   "x": 352.0,
   "y": 160,
   "kind": "seed"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [
  {
   "kind": "flag",
   "flag": "enteredGreenhouse",
   "l": 32,
   "t": 64,
   "r": 160,
   "b": 288
  }
 ],
 "spawn": null,
 "tiles": [
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "#..........................................#",
  "#..........................................#",
  "#..........................................#",
  "#..........................................#",
  "#..........................................#",
  "#..........................................#",
  "#.................=======..................#",
  "#..........................................#",
  "#..........................................#",
  "#.......=======............................#",
  "............................................",
  "............................................",
  "............................................",
  "............................................",
  "##############################....##########",
  "##############################....##########",
  "##############################....##########",
  "##############################....##########",
  "##############################....##########",
  "##############################....##########"
 ],
 "mapAt": [
  1200,
  8
 ],
 "floor": "tile",
 "shade": {
  "a": 0.12,
  "lights": [],
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
   "x0": 64,
   "x1": 640,
   "y": 288,
   "every": [
    20,
    50
   ]
  }
 ],
 "foes": [
  {
   "kind": "pot",
   "x": 392.0,
   "y": 288,
   "f": -1
  }
 ]
});
