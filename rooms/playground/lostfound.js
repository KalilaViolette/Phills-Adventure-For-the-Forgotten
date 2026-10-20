// lostfound: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "lostfound",
 "region": "playground",
 "w": 40,
 "h": 30,
 "music": "playground",
 "viewBottom": 480,
 "art": {
  "main": "art/playground/lostfound.png#main",
  "pack": "art/playground/lostfound.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    480
   ],
   "L0": [
    0,
    480,
    1348,
    568
   ],
   "L1": [
    0,
    1048,
    1204,
    551
   ],
   "L2": [
    0,
    1599,
    1044,
    532
   ],
   "L3": [
    0,
    2131,
    868,
    510
   ],
   "L4": [
    0,
    2641,
    836,
    628
   ]
  },
  "layers": [
   {
    "src": "art/playground/lostfound.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/lostfound.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/lostfound.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/lostfound.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/lostfound.png#L4",
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
   "id": "sandbox",
   "edge": "left",
   "a": 288,
   "b": 352,
   "to": "sandbox",
   "toDoor": "lost",
   "x": 24.0,
   "y": 352,
   "f": 1,
   "swim": false
  },
  {
   "id": "balloons",
   "edge": "right",
   "a": 288,
   "b": 352,
   "to": "balloonwall",
   "toDoor": "lost",
   "x": 616.0,
   "y": 352,
   "f": -1,
   "swim": false
  },
  {
   "id": "slide",
   "edge": "top",
   "a": 480,
   "b": 640,
   "to": "slide",
   "toDoor": "down",
   "x": 560,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
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
  ".........................####...........",
  ".....................########...........",
  ".....................########...........",
  "...........#####.##############.........",
  "...........#####.##############.........",
  "...........#####.##############.........",
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
  818,
  100
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    24,
    90,
    150,
    0.95
   ],
   [
    72,
    336,
    90,
    0.85
   ],
   [
    618,
    209,
    26,
    0.4
   ],
   [
    303,
    199,
    26,
    0.4
   ],
   [
    491,
    333,
    26,
    0.4
   ],
   [
    269,
    115,
    26,
    0.4
   ],
   [
    240,
    67,
    26,
    0.4
   ],
   [
    412,
    334,
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
  "x": 72.0,
  "y": 352
 },
 "npc": {
  "kind": "monkey",
  "x": 584.0,
  "y": 352,
  "f": -1
 },
 "wildlife": [
  {
   "kind": "moth",
   "at": "back",
   "y": 58,
   "x": 480,
   "every": [
    3,
    9
   ]
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 62,
   "x": 486,
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
   "y0": 131,
   "y1": 232,
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
   "y0": 109,
   "y1": 210,
   "every": [
    12,
    30
   ],
   "first": 9
  },
  {
   "kind": "cat",
   "at": "L2",
   "x0": 412,
   "x1": 480,
   "y": 220,
   "every": [
    45,
    110
   ]
  },
  {
   "kind": "pigeon",
   "at": "back",
   "x0": 504,
   "x1": 608,
   "y": 352,
   "every": [
    25,
    60
   ]
  },
  {
   "kind": "mouse",
   "at": "back",
   "x0": 504,
   "x1": 608,
   "y": 352,
   "every": [
    25,
    60
   ]
  }
 ],
 "foes": [],
 "detail": {
  "tiles": [
   846,
   847,
   848,
   849,
   850,
   856,
   871,
   872,
   873,
   874
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8P//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHz//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4Af////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAA/+A="
 }
});
