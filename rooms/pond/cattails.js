// cattails: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "cattails",
 "region": "pond",
 "w": 40,
 "h": 48,
 "music": "pond",
 "viewBottom": 768,
 "art": {
  "main": "art/pond/cattails.png#main",
  "pack": "art/pond/cattails.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    768
   ],
   "L0": [
    0,
    768,
    1348,
    603
   ],
   "L1": [
    0,
    1371,
    1204,
    637
   ],
   "L2": [
    0,
    2008,
    1044,
    676
   ],
   "L3": [
    0,
    2684,
    868,
    718
   ],
   "L4": [
    0,
    3402,
    836,
    1002
   ]
  },
  "layers": [
   {
    "src": "art/pond/cattails.png#L0",
    "f": 0.12
   },
   {
    "src": "art/pond/cattails.png#L1",
    "f": 0.3
   },
   {
    "src": "art/pond/cattails.png#L2",
    "f": 0.5
   },
   {
    "src": "art/pond/cattails.png#L3",
    "f": 0.72
   },
   {
    "src": "art/pond/cattails.png#L4",
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
   "id": "dock",
   "edge": "right",
   "a": 576,
   "b": 640,
   "to": "dock",
   "toDoor": "cattails",
   "x": 616.0,
   "y": 640,
   "f": -1,
   "swim": false
  },
  {
   "id": "meadow",
   "edge": "left",
   "a": 160,
   "b": 224,
   "to": "dragonfly",
   "toDoor": "cattails",
   "x": 24.0,
   "y": 224,
   "f": 1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "pebble_cattails_pebbles_0",
   "x": 208.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "pebble_cattails_pebbles_1",
   "x": 216.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "pebble_cattails_pebbles_2",
   "x": 224.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "cotton_cattails",
   "x": 600.0,
   "y": 208,
   "kind": "cotton",
   "glide": true
  }
 ],
 "hints": [],
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
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "............=====.......................",
  "...................................#####",
  "#########...............................",
  "#########...............................",
  "....................======..............",
  "........................................",
  "........................................",
  "........................................",
  ".............======.....................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "....................======..............",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  ".............======..........======.....",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "....................======..............",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
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
  -332,
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
   "kind": "sparrow",
   "at": "back",
   "x0": 320,
   "x1": 416,
   "y": 560,
   "every": [
    14,
    34
   ]
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 208,
   "x1": 304,
   "y": 320,
   "every": [
    14,
    34
   ]
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 464,
   "x1": 560,
   "y": 480,
   "every": [
    14,
    34
   ]
  }
 ],
 "foes": [
  {
   "kind": "frog",
   "x": 248.0,
   "y": 480,
   "f": 1
  },
  {
   "kind": "frog",
   "x": 360.0,
   "y": 256,
   "f": -1
  },
  {
   "kind": "straw",
   "x": 488.0,
   "y": 640,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   523,
   524,
   525,
   526,
   527,
   568,
   600,
   601,
   603,
   604,
   605,
   606,
   607,
   608,
   642,
   643,
   645,
   646,
   647,
   1560,
   1561,
   1562,
   1563,
   1564,
   1565,
   1566,
   1567,
   1568,
   1569,
   1570,
   1571,
   1572,
   1573,
   1574,
   1575,
   1576,
   1577,
   1578,
   1579,
   1580,
   1581,
   1582,
   1583,
   1584,
   1585,
   1586,
   1587,
   1588,
   1589,
   1590,
   1591,
   1592,
   1593,
   1594,
   1595,
   1596
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAA8AfwP/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAPgA/8D//v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA//kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP/w//z//v/+////////////////////////////////////////////////////////////////////8AAAAAD/////////////////////////////////Pw4/AB8AAv/////////////////////////////////////////+/////////////////////////////////////+B/AAf/////////////////////////////////////////wP///////////////////////////////////////x4////////////////////////////////////////w/wD////////////////////+//7//v/+//z/+P/wf+AOAP/AfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA+D///////////wAAAAAAAAAAAAAAAAAAAAAAAAAA+AD/wP/+////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8P////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+H/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP+/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgf//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/A////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8A/wf///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+f////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA/4D/+A=="
 }
});
