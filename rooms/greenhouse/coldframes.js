// coldframes: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "coldframes",
 "region": "greenhouse",
 "w": 40,
 "h": 24,
 "music": "greenhouse",
 "viewBottom": 384,
 "art": {
  "main": "art/greenhouse/coldframes.png#main",
  "pack": "art/greenhouse/coldframes.png",
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
   ],
   "L4": [
    0,
    2165,
    836,
    503
   ]
  },
  "layers": [
   {
    "src": "art/greenhouse/coldframes.png#L0",
    "f": 0.12,
    "fy": 0.45
   },
   {
    "src": "art/greenhouse/coldframes.png#L1",
    "f": 0.3,
    "fy": 0.65
   },
   {
    "src": "art/greenhouse/coldframes.png#L2",
    "f": 0.5,
    "fy": 0.8
   },
   {
    "src": "art/greenhouse/coldframes.png#L3",
    "f": 0.72,
    "fy": 0.9
   },
   {
    "src": "art/greenhouse/coldframes.png#L4",
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
   "id": "door",
   "edge": "top",
   "a": 160,
   "b": 224,
   "to": "frontdoor",
   "toDoor": "cold",
   "x": 192.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "cotton_coldframes",
   "x": 568.0,
   "y": 208,
   "kind": "cotton"
  },
  {
   "id": "seed_coldframes_down_0",
   "x": 195.0,
   "y": 208,
   "kind": "seed"
  },
  {
   "id": "seed_coldframes_down_1",
   "x": 205.0,
   "y": 208,
   "kind": "seed"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##########....##########################",
  "##########....##########################",
  "#......................................#",
  "#......................................#",
  "#......................................#",
  "#.......========.......................#",
  "#......................................#",
  "#......................................#",
  "#......................................#",
  "#.=======.......=======.....=======....#",
  "#..............#...........#...........#",
  "#..............#...........#...........#",
  "#..............#...........#...........#",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################"
 ],
 "mapAt": [
  1220,
  32
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
   "kind": "toad",
   "at": "back",
   "x0": 480,
   "x1": 576,
   "y": 208,
   "every": [
    30,
    70
   ]
  },
  {
   "kind": "woodlouse",
   "at": "back",
   "x0": 32,
   "x1": 576,
   "y": 208,
   "every": [
    20,
    50
   ]
  }
 ],
 "foes": [
  {
   "kind": "gglove",
   "x": 360.0,
   "y": 208,
   "f": -1
  }
 ]
});
