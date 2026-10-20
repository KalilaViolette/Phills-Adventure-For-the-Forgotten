// drifts: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "drifts",
 "region": "playground",
 "w": 60,
 "h": 32,
 "music": "playground",
 "viewBottom": 512,
 "art": {
  "main": "art/playground/drifts.png#main",
  "pack": "art/playground/drifts.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    512
   ],
   "L0": [
    0,
    512,
    1386,
    572
   ],
   "L1": [
    0,
    1084,
    1300,
    560
   ],
   "L2": [
    0,
    1644,
    1204,
    548
   ],
   "L3": [
    0,
    2192,
    1098,
    533
   ],
   "L4": [
    0,
    2725,
    1252,
    669
   ]
  },
  "layers": [
   {
    "src": "art/playground/drifts.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/drifts.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/drifts.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/drifts.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/drifts.png#L4",
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
   "id": "dandelions",
   "edge": "left",
   "a": 352,
   "b": 416,
   "to": "dandelions",
   "toDoor": "drifts",
   "x": 24.0,
   "y": 416,
   "f": 1,
   "swim": false
  },
  {
   "id": "tent",
   "edge": "right",
   "a": 352,
   "b": 416,
   "to": "partytent",
   "toDoor": "drifts",
   "x": 936.0,
   "y": 416,
   "f": -1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "marble_drifts_marbles_0",
   "x": 92.0,
   "y": 272,
   "kind": "marble",
   "needs": "flap"
  },
  {
   "id": "marble_drifts_marbles_1",
   "x": 100.0,
   "y": 272,
   "kind": "marble",
   "needs": "flap"
  },
  {
   "id": "marble_drifts_marbles_2",
   "x": 108.0,
   "y": 272,
   "kind": "marble",
   "needs": "flap"
  },
  {
   "id": "marble_drifts_marbles_3",
   "x": 116.0,
   "y": 272,
   "kind": "marble",
   "needs": "flap"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "....=====.########################################..........",
  "..........########################################..........",
  "..........########################################..........",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  1098,
  96
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    880,
    138,
    150,
    0.95
   ],
   [
    891,
    102,
    26,
    0.4
   ],
   [
    932,
    122,
    26,
    0.4
   ],
   [
    446,
    327,
    26,
    0.4
   ],
   [
    342,
    206,
    26,
    0.4
   ],
   [
    155,
    346,
    26,
    0.4
   ],
   [
    946,
    101,
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
 "breaks": [
  {
   "id": "drift_drift1",
   "x0": 17,
   "y0": 20,
   "x1": 19,
   "y1": 25,
   "hp": 1,
   "look": "sand",
   "need": "burst"
  },
  {
   "id": "drift_drift2",
   "x0": 37,
   "y0": 20,
   "x1": 39,
   "y1": 25,
   "hp": 1,
   "look": "sand",
   "need": "burst"
  }
 ],
 "wildlife": [
  {
   "kind": "moth",
   "at": "back",
   "y": 90,
   "x": 64,
   "every": [
    3,
    9
   ]
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 94,
   "x": 70,
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
   "y0": 177,
   "y1": 278,
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
   "y0": 156,
   "y1": 256,
   "every": [
    12,
    30
   ],
   "first": 9
  }
 ],
 "foes": [
  {
   "kind": "bucket",
   "x": 456.0,
   "y": 416,
   "f": -1
  },
  {
   "kind": "teeth",
   "x": 872.0,
   "y": 416,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   49,
   109,
   129,
   169,
   170,
   189,
   229,
   230,
   249,
   250,
   290,
   309,
   350,
   369,
   370,
   409,
   430,
   470,
   489,
   490,
   530,
   550,
   589,
   610,
   649,
   650,
   670,
   709,
   710,
   730,
   770,
   789,
   790,
   829,
   830,
   850,
   890,
   909,
   950,
   969,
   970,
   1009,
   1010,
   1029,
   1030,
   1069,
   1070,
   1090,
   1130,
   1149,
   1150,
   1152,
   1154,
   1155,
   1162,
   1163,
   1165,
   1166,
   1167,
   1168,
   1169,
   1170,
   1173,
   1175,
   1181,
   1182,
   1186,
   1187,
   1188,
   1189,
   1210,
   1211,
   1212,
   1213,
   1214,
   1221,
   1222,
   1223,
   1224,
   1225,
   1227,
   1228,
   1229,
   1230,
   1231,
   1232,
   1233,
   1234,
   1235,
   1242,
   1243,
   1245,
   1246,
   1247,
   1248,
   1503,
   1504,
   1505,
   1506,
   1507,
   1508,
   1509,
   1510,
   1511,
   1512,
   1513,
   1514,
   1515,
   1521,
   1522,
   1523,
   1524,
   1525,
   1526,
   1527,
   1528,
   1529,
   1530,
   1531,
   1532,
   1533,
   1534,
   1535,
   1542,
   1543,
   1544,
   1545,
   1546,
   1547,
   1548,
   1549,
   1550,
   1551,
   1552,
   1553,
   1554,
   1555,
   1556
  ],
  "bits": "///////////////////////////////+//7//P/8//z//v/+//7//v/+/////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAD//7//v/+//////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADAAAAHAAcABwAHAAcABwAHAAcABwAHAAcAAwADAAMAAwAD///////////////////////+//7//v/+//7//v/+//7AAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAMAAwABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////3//f/9//3////8AAAAAAAAAAAAAgACAAIAAgAAAAIAAgACAAIAAgACAAAAAAAAAAQADAAMABwAHAAMAAwADAAMAAQABAAEAAAAAwADAAMAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAwADAAMAAwADAAMAAQABAAAAAH///////////////////////////////////////////////v/+//7//v///////v/+//7//v/+/////////////3//f/9//3//f/9//3//f/9//3//f/8//z//P/9//wAAAACAAIAAAAAAAIAAgACAAMAAwADAAIAAgACAAIAAAAEAAwADAAcABwAHAAcAAwADAAEAAAAAAAAAAAAAAAD//////////////////////////////////3//f/8//4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAAAP/8//z//P/8//z//H/8f/x//D/8f/x//P/9//3//f////////////////////////////v/+//7//v/+//7//n//f/9//3//f/9//3//f/9//3////////////////////7//v/+//7//v/+//////////////////////////8AAAAAAAAAAAAAAAAAAAAAgACAAIAAwADAAOAA4ADgAP///////3//f/9//3/////////////////////////////////////////////////+//7//v/+//7////////gAOAA4ADgAMAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAH//P/8//z//H/8f/x//H/8f/z//P/8//z//P/9//3//AAAAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAH//f/9//////////////////3//f/9//3//f/9//3///////////////////////v/+//7//v/+//7//v/+//+AAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//f/9//3//f/8//z//P/8//3//f/9//3//////////AAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAgAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAwADAAMAA8AAwACAAIAAgAAAAAAAgACAAIAAgACAAIAAgACAAIAAAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////f/9//3//f/8//z//P/8//z//f/9///////////////////////7//v/+//7//v/8//z//P/8gACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAH//f/9//3//f/9///////////////////////////////z//P/8//7//v/+//////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAP//f/9//3//f/9//3//f/9//3//f/9/////////////gACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//3//f/8//x//D/8H/wB/////////////////////////////////////////4////////////////////////////////////////9//AP/////////////////////////////////////wDwAH///////////////////////////////////////7+AD///////////////////////////////////////8f/////////////////////////////////////////P/A////////////////////////////////////////AAD/////////////////////////////////////A/8B///////////////////////////////////////+f8A/////////////////////////////////////z/+D/wD///////////////////////////////////////9//////////////////////////////////////////4A//////////////////////////////////////////wf////////////////////////////////////////v8P///////////////////////////////////////x////////////////////////////////////////////z///////////////////////////////////////8A/////////////////////////////////////////vwA/////////////v/+//z//P/4//j/8P/w//Dh4ABgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8ABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4A8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8P/wH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/APwAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgA8AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+APgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn/8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AH8AHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH///////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAA+AD/AP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAHwH/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAwB/A/8f//////8AAAAAAAAAAAAAAAAAAAAAAAAAAP/+/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8f/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD/gP/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD/8P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgD///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD+AP/w"
 }
});
