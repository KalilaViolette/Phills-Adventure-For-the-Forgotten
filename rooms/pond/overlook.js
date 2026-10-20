// overlook: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "overlook",
 "region": "pond",
 "w": 40,
 "h": 44,
 "music": "pond",
 "viewBottom": 704,
 "art": {
  "main": "art/pond/overlook.png#main",
  "pack": "art/pond/overlook.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    704
   ],
   "L0": [
    0,
    704,
    1348,
    595
   ],
   "L1": [
    0,
    1299,
    1204,
    618
   ],
   "L2": [
    0,
    1917,
    1044,
    644
   ],
   "L3": [
    0,
    2561,
    868,
    672
   ],
   "L4": [
    0,
    3233,
    836,
    919
   ]
  },
  "layers": [
   {
    "src": "art/pond/overlook.png#L0",
    "f": 0.12
   },
   {
    "src": "art/pond/overlook.png#L1",
    "f": 0.3
   },
   {
    "src": "art/pond/overlook.png#L2",
    "f": 0.5
   },
   {
    "src": "art/pond/overlook.png#L3",
    "f": 0.72
   },
   {
    "src": "art/pond/overlook.png#L4",
    "f": 1.3
   }
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
   "id": "meadow",
   "edge": "right",
   "a": 224,
   "b": 288,
   "to": "dragonfly",
   "toDoor": "willow",
   "x": 616.0,
   "y": 288,
   "f": -1,
   "swim": false
  },
  {
   "id": "high",
   "edge": "right",
   "a": 80,
   "b": 144,
   "to": "dragonfly",
   "toDoor": "high",
   "x": 616.0,
   "y": 144,
   "f": -1,
   "swim": false,
   "glide": true
  },
  {
   "id": "drop",
   "edge": "bottom",
   "a": 64,
   "b": 160,
   "to": "sailboat",
   "toDoor": "willow",
   "x": 112.0,
   "y": 688,
   "f": 1,
   "keepX": true,
   "swim": false,
   "falling": false,
   "exitOnly": true
  }
 ],
 "items": [
  {
   "id": "crayon_pond",
   "x": 88.0,
   "y": 96,
   "kind": "crayon",
   "col": "#3a6ad0"
  },
  {
   "id": "pin_feather",
   "x": 600.0,
   "y": 144,
   "kind": "pin",
   "pin": "feather",
   "glide": true
  },
  {
   "id": "pebble_overlook_pocket_0",
   "x": 332.0,
   "y": 480,
   "kind": "pebble"
  },
  {
   "id": "pebble_overlook_pocket_1",
   "x": 340.0,
   "y": 480,
   "kind": "pebble"
  },
  {
   "id": "pebble_overlook_pocket_2",
   "x": 348.0,
   "y": 480,
   "kind": "pebble"
  },
  {
   "id": "pebble_overlook_pocket_3",
   "x": 356.0,
   "y": 480,
   "kind": "pebble"
  },
  {
   "id": "cotton_overlook",
   "x": 40.0,
   "y": 512,
   "kind": "cotton",
   "needs": "velcro"
  },
  {
   "id": "pebble_overlook_hollow_0",
   "x": 28.0,
   "y": 512,
   "kind": "pebble",
   "needs": "velcro"
  },
  {
   "id": "pebble_overlook_hollow_1",
   "x": 52.0,
   "y": 512,
   "kind": "pebble",
   "needs": "velcro"
  }
 ],
 "hints": [
  {
   "text": "the willow's bark. rough enough to climb, if his hands would stick",
   "l": 32,
   "t": 384,
   "r": 192,
   "b": 512,
   "x": 112,
   "y": 416,
   "until": "velcro"
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "########################################",
  "########################################",
  "########################################",
  "........................................",
  "........................................",
  "........................................",
  "....======..............................",
  "........................................",
  "........................................",
  "............======................######",
  "........................................",
  "........................................",
  "........................................",
  "....................======..............",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "####..............######################",
  "####..............######################",
  "####..............######################",
  "####..............######################",
  "####..............######################",
  "####..............######################",
  "####........======######################",
  "####..............######################",
  "####....................################",
  "####.=====..............################",
  "#.......................################",
  "#.......................################",
  "#.........##############################",
  "#.........##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################",
  "####......##############################"
 ],
 "mapAt": [
  -412,
  56
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
 "npc": {
  "kind": "bullfrog",
  "x": 232.0,
  "y": 480,
  "f": 1
 },
 "breaks": [
  {
   "id": "foam_pocket",
   "x0": 18,
   "y0": 26,
   "x1": 18,
   "y1": 29,
   "hp": 1,
   "look": "foam",
   "need": "squeak"
  }
 ],
 "grip": [
  [
   3,
   18,
   3,
   43
  ]
 ],
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
  }
 ],
 "foes": [
  {
   "kind": "duck",
   "x": 488.0,
   "y": 288,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   699,
   700,
   701,
   702,
   703,
   704,
   705,
   706,
   707,
   708,
   709,
   710,
   711,
   712,
   713,
   714,
   715,
   716,
   738,
   778,
   818,
   857,
   898,
   937,
   1020,
   1021,
   1022,
   1023,
   1060,
   1062,
   1063,
   1064,
   1104,
   1171,
   1172,
   1176,
   1210,
   1250,
   1290,
   1329,
   1330,
   1369,
   1370,
   1410,
   1449,
   1489,
   1569,
   1609
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8f/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAP4D/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/z//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA/8D/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8Afw//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///////////wAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAD//v////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA8AD/AP/wD/8//3//f///////////////////////////////////////f/9//3//f/9//z//P/8//z//P/9///////////////////////////////////////9//3//f/9//3//AAAAAAAAAAAAAQABAAEAAQABAAAAAAAAAAAAAAAAAAD/////f/9//3//f/9//3//f////////////////////wAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAwADAAMAAwAB////////////////////////////////////////7///////////////////////////////////////8B/AB/////////////////////////////////////n/wP+A/////////////////////////////////////wP/AAMAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcADwAPAAcAAwADAAEAAQABAAEAAQABAAAAAAAAAAD/////////////////////////////////////f/9//z//P/8//z//f/9//3//f/9//3//////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgA/4D/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD/8//3//f/////////////////////////9//z//P/8f/x//H/8//3//////////////////////////////////f/9//z//P/8//z//f/9/////////////////////AAAAAAAAAAAAAAABAAEAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////9//3//f/9//3//f/9//wAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQAAf/9//3//f/9/////////////////////////////////////f/9//z//P/8//z//P/8//z//P/9//3//f////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQADAAMAAwADAAMAAwAB"
 }
});
