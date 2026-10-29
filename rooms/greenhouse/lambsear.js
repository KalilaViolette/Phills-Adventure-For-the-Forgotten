// lambsear: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "lambsear",
 "region": "greenhouse",
 "w": 40,
 "h": 24,
 "music": "greenhouse",
 "viewBottom": 384,
 "art": {
  "main": "art/greenhouse/lambsear.webp#main",
  "pack": "art/greenhouse/lambsear.webp",
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
    642,
    386
   ],
   "L1": [
    0,
    770,
    642,
    386
   ],
   "L2": [
    0,
    1156,
    642,
    386
   ],
   "L3": [
    0,
    1542,
    642,
    386
   ],
   "L4": [
    0,
    1928,
    565,
    502
   ],
   "piece_cover_lambpocket_pass": [
    0,
    2430,
    112,
    182
   ],
   "piece_cover_lambpocket_wall": [
    0,
    2612,
    18,
    118
   ]
  },
  "layers": [
   {
    "src": "art/greenhouse/lambsear.webp#L0",
    "f": 0.12,
    "fy": 0.45
   },
   {
    "src": "art/greenhouse/lambsear.webp#L1",
    "f": 0.3,
    "fy": 0.65
   },
   {
    "src": "art/greenhouse/lambsear.webp#L2",
    "f": 0.5,
    "fy": 0.8
   },
   {
    "src": "art/greenhouse/lambsear.webp#L3",
    "f": 0.72,
    "fy": 0.9
   },
   {
    "src": "art/greenhouse/lambsear.webp#L4",
    "f": 1.3,
    "x": 269
   }
  ],
  "pieces": {
   "cover_lambpocket_pass": [
    0,
    165,
    112,
    182
   ],
   "cover_lambpocket_wall": [
    96,
    229,
    18,
    118
   ]
  },
  "uses": [
   "art/greenhouse/greenhouse_sprites.png",
   "art/greenhouse/greenhouse_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/greenhouse/greenhouse_items.png"
 },
 "doors": [
  {
   "id": "bench",
   "edge": "bottom",
   "a": 224,
   "b": 288,
   "to": "pottingbench",
   "toDoor": "lamb",
   "x": 328.0,
   "y": 320,
   "f": 1
  }
 ],
 "items": [
  {
   "id": "seed_lambsear_pocket_0",
   "x": 47.0,
   "y": 320,
   "kind": "seed",
   "behind": "lambpocket"
  },
  {
   "id": "seed_lambsear_pocket_1",
   "x": 53.0,
   "y": 320,
   "kind": "seed",
   "behind": "lambpocket"
  },
  {
   "id": "seed_lambsear_pocket_2",
   "x": 59.0,
   "y": 320,
   "kind": "seed",
   "behind": "lambpocket"
  },
  {
   "id": "seed_lambsear_pocket_3",
   "x": 65.0,
   "y": 320,
   "kind": "seed",
   "behind": "lambpocket"
  }
 ],
 "hints": [
  {
   "text": "bramble. the sword just tangles in it",
   "l": 112,
   "t": 192,
   "r": 224,
   "b": 336,
   "x": 160,
   "y": 224,
   "until": "spark"
  }
 ],
 "gates": [],
 "events": [
  {
   "kind": "scene",
   "name": "lambsear",
   "flag": "learnedSpark",
   "l": 384,
   "t": 192,
   "r": 544,
   "b": 336
  }
 ],
 "spawn": null,
 "tiles": [
  "########################################",
  "########################################",
  "########################################",
  "#######................................#",
  "#######................................#",
  "#######................................#",
  "#######................................#",
  "#######................................#",
  "#######................................#",
  "#######................................#",
  "#######................................#",
  "#######................................#",
  "#.....#................................#",
  "#.....#................................#",
  "#.....#................................#",
  "#.....#................................#",
  "#......................................#",
  "#......................................#",
  "#......................................#",
  "#......................................#",
  "##############....######################",
  "##############....######################",
  "##############....######################",
  "##############....######################"
 ],
 "mapAt": [
  1250,
  -24
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
 "lamb": {
  "bed": [
   456.0,
   320
  ],
  "can": [
   568.0,
   320
  ]
 },
 "breaks": [
  {
   "id": "lambpocket",
   "x0": 6,
   "y0": 16,
   "x1": 6,
   "y1": 19,
   "hp": 1,
   "look": "bramble",
   "need": "spark"
  }
 ],
 "wildlife": [
  {
   "kind": "ladybug",
   "at": "back",
   "x0": 352,
   "x1": 544,
   "y": 320,
   "every": [
    20,
    50
   ]
  }
 ],
 "covers": {
  "lambpocket": {
   "wall": [
    6,
    16,
    6,
    19
   ],
   "pas": [
    1,
    12,
    5,
    19
   ]
  }
 },
 "foes": []
});
