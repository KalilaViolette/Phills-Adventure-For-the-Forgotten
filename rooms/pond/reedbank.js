// reedbank: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "reedbank",
 "region": "pond",
 "w": 60,
 "h": 26,
 "music": "pond",
 "viewBottom": 416,
 "art": {
  "main": "art/pond/reedbank.png#main",
  "pack": "art/pond/reedbank.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    416
   ],
   "L0": [
    0,
    416,
    1386,
    560
   ],
   "L1": [
    0,
    976,
    1300,
    532
   ],
   "L2": [
    0,
    1508,
    1204,
    500
   ],
   "L3": [
    0,
    2008,
    1098,
    464
   ],
   "L4": [
    0,
    2472,
    1252,
    544
   ]
  },
  "layers": [
   {
    "src": "art/pond/reedbank.png#L0",
    "f": 0.12
   },
   {
    "src": "art/pond/reedbank.png#L1",
    "f": 0.3
   },
   {
    "src": "art/pond/reedbank.png#L2",
    "f": 0.5
   },
   {
    "src": "art/pond/reedbank.png#L3",
    "f": 0.72
   },
   {
    "src": "art/pond/reedbank.png#L4",
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
   "id": "moss",
   "edge": "right",
   "a": 192,
   "b": 256,
   "to": "mossbank",
   "toDoor": "pond",
   "x": 936.0,
   "y": 256,
   "f": -1,
   "swim": false
  },
  {
   "id": "shallows",
   "edge": "left",
   "a": 256,
   "b": 320,
   "to": "shallows",
   "toDoor": "reeds",
   "x": 24.0,
   "y": 320,
   "f": 1,
   "swim": false,
   "needs": "charged"
  }
 ],
 "items": [
  {
   "id": "pebble_reedbank_pebbles_0",
   "x": 510.0,
   "y": 208,
   "kind": "pebble"
  },
  {
   "id": "pebble_reedbank_pebbles_1",
   "x": 520.0,
   "y": 208,
   "kind": "pebble"
  },
  {
   "id": "pebble_reedbank_pebbles_2",
   "x": 530.0,
   "y": 208,
   "kind": "pebble"
  }
 ],
 "hints": [
  {
   "text": "a root, hard as iron, grown right across. it needs everything he has",
   "l": 448,
   "t": 160,
   "r": 608,
   "b": 304,
   "x": 512,
   "y": 176,
   "until": "charged"
  },
  {
   "text": "{down} + {jump} drops through",
   "l": 448,
   "t": 96,
   "r": 608,
   "b": 224,
   "x": 528,
   "y": 144,
   "until": "dropShelfOnce"
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "############################################################",
  "############################################################",
  "############################################################",
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
  "..............................======........................",
  "............................................................",
  "........=====...............................................",
  "................................................############",
  "......................................######################",
  "................####........################################",
  "................####........################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  -172,
  88
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
 "breaks": [
  {
   "id": "hardroot",
   "x0": 26,
   "y0": 3,
   "x1": 27,
   "y1": 19,
   "hp": 1,
   "look": "hardroot",
   "need": "charged"
  }
 ],
 "wildlife": [
  {
   "kind": "heron",
   "at": "L1",
   "x0": 224,
   "x1": 512,
   "y": 252,
   "every": [
    40,
    90
   ]
  },
  {
   "kind": "turtle",
   "at": "back",
   "y": 320,
   "x": 384,
   "every": [
    30,
    70
   ],
   "dir": -1
  }
 ],
 "foes": [
  {
   "kind": "duck",
   "x": 680.0,
   "y": 272,
   "f": -1
  },
  {
   "kind": "duck",
   "x": 168.0,
   "y": 320,
   "f": 1
  },
  {
   "kind": "straw",
   "x": 360.0,
   "y": 320,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   949,
   950,
   951,
   952,
   953,
   954,
   955,
   956,
   999,
   1000,
   1001,
   1002,
   1003,
   1004,
   1005,
   1006,
   1007,
   1049,
   1050,
   1051,
   1052,
   1053,
   1054,
   1055,
   1056,
   1057,
   1143,
   1144,
   1145,
   1146,
   1147,
   1148,
   1149,
   1150,
   1151,
   1152,
   1153,
   1154,
   1155,
   1160,
   1161,
   1162,
   1163,
   1164
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAPAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/w//7/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAH//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA/8D/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AP+A//j//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///AAAAAAAAAAAAAAAAAAAAAAADAAcADwA/AP8///////8ADwB/Af8D/w//P/9//////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAcAHwB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD/////AAAAAAAAAAAAAAAAAAAAAAADAAcADwA/AP8B//////8ADwB/Af8D/w//P/9//////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAHAB8A/w//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAH/8/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD+AP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAHwD/B/8AAAAAAAAAAAAAAAAAAAAAAAAAAAH/H////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAgAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD//v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD+AA=="
 }
});
