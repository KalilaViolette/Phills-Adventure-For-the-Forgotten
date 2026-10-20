// dragonfly: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "dragonfly",
 "region": "pond",
 "w": 40,
 "h": 26,
 "music": "pond",
 "viewBottom": 416,
 "art": {
  "main": "art/pond/dragonfly.png#main",
  "pack": "art/pond/dragonfly.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    416
   ],
   "L0": [
    0,
    416,
    1348,
    560
   ],
   "L1": [
    0,
    976,
    1204,
    532
   ],
   "L2": [
    0,
    1508,
    1044,
    500
   ],
   "L3": [
    0,
    2008,
    868,
    464
   ],
   "L4": [
    0,
    2472,
    836,
    544
   ],
   "front": [
    0,
    3016,
    128,
    110
   ]
  },
  "layers": [
   {
    "src": "art/pond/dragonfly.png#L0",
    "f": 0.12
   },
   {
    "src": "art/pond/dragonfly.png#L1",
    "f": 0.3
   },
   {
    "src": "art/pond/dragonfly.png#L2",
    "f": 0.5
   },
   {
    "src": "art/pond/dragonfly.png#L3",
    "f": 0.72
   },
   {
    "src": "art/pond/dragonfly.png#L4",
    "f": 1.3
   }
  ],
  "front": "art/pond/dragonfly.png#front",
  "frontAt": [
   160,
   272
  ],
  "uses": [
   "art/pond/pond_sprites.png",
   "art/pond/pond_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/pond/pond_items.png"
 },
 "doors": [
  {
   "id": "cattails",
   "edge": "right",
   "a": 96,
   "b": 160,
   "to": "cattails",
   "toDoor": "meadow",
   "x": 616.0,
   "y": 160,
   "f": -1,
   "swim": false
  },
  {
   "id": "willow",
   "edge": "left",
   "a": 160,
   "b": 224,
   "to": "overlook",
   "toDoor": "meadow",
   "x": 24.0,
   "y": 224,
   "f": 1,
   "swim": false
  },
  {
   "id": "high",
   "edge": "left",
   "a": 16,
   "b": 80,
   "to": "overlook",
   "toDoor": "high",
   "x": 24.0,
   "y": 64,
   "f": 1,
   "exitOnly": true,
   "optional": true
  }
 ],
 "items": [
  {
   "id": "pebble_dragonfly_pebbles_0",
   "x": 280.0,
   "y": 128,
   "kind": "pebble",
   "needs": "flap"
  },
  {
   "id": "pebble_dragonfly_pebbles_1",
   "x": 288.0,
   "y": 128,
   "kind": "pebble",
   "needs": "flap"
  },
  {
   "id": "pebble_dragonfly_pebbles_2",
   "x": 296.0,
   "y": 128,
   "kind": "pebble",
   "needs": "flap"
  },
  {
   "id": "pebble_dragonfly_pebbles_3",
   "x": 304.0,
   "y": 128,
   "kind": "pebble",
   "needs": "flap"
  },
  {
   "id": "pebble_dragonfly_pebbles_4",
   "x": 312.0,
   "y": 128,
   "kind": "pebble",
   "needs": "flap"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [
  {
   "kind": "scene",
   "name": "dragonfly",
   "flag": "sawDragonfly",
   "l": 288,
   "t": 0,
   "r": 416,
   "b": 272
  }
 ],
 "spawn": null,
 "tiles": [
  "########################################",
  "..######################################",
  "..######################################",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "................======..................",
  "........................................",
  ".................................#######",
  ".................................#######",
  ".................................#######",
  ".................................#######",
  "##########................##############",
  "##########................##############",
  "##########........######################",
  "##########~~~~~~~~######################",
  "##########~~~~~~~~######################",
  "##########~~~~~~~~######################",
  "##########~~~~~~~~######################",
  "##########~~~~~~~~######################",
  "##########~~~~~~~~######################",
  "##########~~~~~~~~######################",
  "########################################",
  "########################################"
 ],
 "mapAt": [
  -372,
  60
 ],
 "floor": "mud",
 "shade": {
  "a": 0.12,
  "lights": [],
  "tint": null
 },
 "ambient": [
  "motes",
  "midges"
 ],
 "dragonfly": {
  "x": 360.0,
  "y": 210
 },
 "wildlife": [
  {
   "kind": "goose",
   "at": "L0",
   "x0": 0,
   "x1": 1348,
   "y0": 30,
   "y1": 90,
   "every": [
    70,
    160
   ]
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 304,
   "x1": 400,
   "y": 256,
   "every": [
    30,
    70
   ]
  }
 ],
 "foes": [
  {
   "kind": "bag",
   "x": 200.0,
   "y": 112,
   "f": -1
  },
  {
   "kind": "bag",
   "x": 56.0,
   "y": 128,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   394,
   395,
   396,
   433,
   513,
   523,
   524,
   525,
   526,
   527,
   528,
   547,
   548,
   549,
   550,
   551,
   552,
   553,
   569,
   586,
   609,
   619,
   620,
   621,
   622,
   623,
   624,
   625,
   658,
   769,
   809,
   818,
   849,
   858,
   898
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8H/3///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAPwA/wD/4P/4D/8//3//f///////////////////////////////////////////////////////f/9//3//P/8//z//P/8//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfx//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwf//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD//v////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf3////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA/wAAAAAAAAAAAAAAAAEAAQABAAMABwAPAB8APwD/Af8H/z//P/9//3////////////////////////////////////D//P/+//7///////////////////////////////8P/z//f/9//////////////////////////3//f////////////v/+//7//v/+//7/////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAfAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////8AAAAAAAAAAAAAAAAAAAAAAAAAAH/8/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP4A/4D/////AAAAAAAAAAAAAAAAAAAAAAABAAEAAwAPAB8AP/////8P/z//f/9///////////////////////////////////////////////7//v/+//7//////////////////v/+//7//v/+//z//P/8//z//P/+//7//v///////////////3//f/9//3/////////////////////////////////////////////////+//7//v/+//7//v/+//////////9//3///////////////////////3//f/9//3//f/9//3//f/9//3//f/9//3///////////////////////w=="
 }
});
