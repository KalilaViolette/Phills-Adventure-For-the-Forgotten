// eastedge: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "eastedge",
 "region": "rootwood",
 "w": 50,
 "h": 34,
 "music": "rootwood",
 "viewBottom": 544,
 "art": {
  "main": "art/rootwood/eastedge.png#main",
  "pack": "art/rootwood/eastedge.png",
  "parts": {
   "main": [
    0,
    0,
    800,
    544
   ],
   "L0": [
    0,
    544,
    1367,
    576
   ],
   "L1": [
    0,
    1120,
    1252,
    570
   ],
   "L2": [
    0,
    1690,
    1124,
    564
   ],
   "L3": [
    0,
    2254,
    983,
    556
   ],
   "L4": [
    0,
    2810,
    1044,
    711
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/eastedge.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/eastedge.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/eastedge.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/eastedge.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/eastedge.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/rootwood/rootwood_sprites.png",
   "art/rootwood/rootwood_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/rootwood/rootwood_items.png"
 },
 "doors": [
  {
   "id": "clearing",
   "edge": "left",
   "a": 384,
   "b": 448,
   "to": "clearing",
   "toDoor": "east",
   "x": 24.0,
   "y": 448,
   "f": 1
  },
  {
   "id": "playground",
   "edge": "right",
   "a": 96,
   "b": 160,
   "to": "gate",
   "toDoor": "eastedge",
   "x": 776.0,
   "y": 160,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "cotton_eastedge",
   "x": 328.0,
   "y": 160,
   "kind": "cotton",
   "needs": "airdodge"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##################################################",
  "##################################################",
  "##################################################",
  "##################################################",
  "##................................................",
  "##................................................",
  "##................................................",
  "##................................................",
  "##................................................",
  "##................................................",
  "##..............========..............############",
  "##....................................############",
  "##..............................======############",
  "##......................................##########",
  "##.......................................#########",
  "##........................................########",
  "##......................======.............#######",
  "##..........................................######",
  "##..........................................######",
  "##...........................................#####",
  "##..............======.......................#####",
  "##............................................####",
  "##............................................####",
  "##............................................####",
  "........=====..................................###",
  "...............................................###",
  "...............................................###",
  "....................^^^^^^^^^^^^^..............###",
  "##################################################",
  "##################################################",
  "##################################################",
  "##################################################",
  "##################################################",
  "##################################################"
 ],
 "mapAt": [
  348,
  112
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.42,
  "lights": []
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "wildlife": [
  {
   "kind": "deer",
   "at": "L2",
   "x0": 160,
   "x1": 560,
   "y": 314,
   "every": [
    50,
    100
   ]
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 32,
   "x1": 288,
   "y": 448
  },
  {
   "kind": "fox",
   "at": "L1",
   "x0": 224,
   "x1": 464,
   "y": 260,
   "every": [
    90,
    180
   ]
  }
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 168.0,
   "y": 448,
   "f": 1
  },
  {
   "kind": "can",
   "x": 664.0,
   "y": 448,
   "f": -1
  },
  {
   "kind": "cap",
   "x": 328.0,
   "y": 320,
   "f": 1
  },
  {
   "kind": "spinner",
   "x": 424.0,
   "y": 272,
   "f": -1
  },
  {
   "kind": "wrapper",
   "x": 552.0,
   "y": 192,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   153,
   154,
   155,
   156,
   157,
   159,
   160,
   161,
   162,
   163,
   164,
   165,
   166,
   167,
   168,
   169,
   173,
   174,
   175,
   178,
   179,
   180,
   181,
   183,
   184,
   187,
   188,
   189,
   190,
   192,
   196,
   199,
   202,
   203,
   208,
   209,
   210,
   211,
   212,
   215,
   216,
   217,
   219,
   220,
   221,
   222,
   223,
   225,
   226,
   227,
   233,
   234,
   235,
   236,
   237,
   238,
   241,
   243,
   244,
   247,
   248,
   301,
   351,
   402,
   451,
   489,
   490,
   491,
   492,
   493,
   494,
   495,
   496,
   502,
   538,
   588,
   602,
   638,
   639,
   652,
   689,
   690,
   701,
   702,
   740,
   741,
   791,
   792,
   801,
   842,
   843,
   851,
   893,
   902,
   944,
   951,
   994,
   995,
   1001,
   1045,
   1052,
   1095,
   1102,
   1145,
   1196,
   1246,
   1247,
   1296,
   1297,
   1346,
   1347,
   1353,
   1354,
   1355,
   1356,
   1357,
   1358,
   1359,
   1360,
   1361,
   1362,
   1363,
   1364,
   1365,
   1366,
   1367,
   1368,
   1369,
   1383,
   1384,
   1385,
   1386,
   1387,
   1388,
   1389,
   1390,
   1391,
   1392,
   1393,
   1394,
   1395,
   1396
  ],
  "bits": "///////////////////////////////+//7//P/4//D//////////////////////////3//P/8f/x//D/8H////////////////////////////////////8//h5wAH///////////////////////////////////////48AD/////////////////////////////////////8H8AAf/////////////////////////////////////////9//////////////////////8//j/+H/4P/g/+B/4D/gP///////////////////////////////////////8AP//////////////////////////////////////////8////////////////////////////////////////AAD//////////////////////////////////////z8AA//////////////////////////////////////////g////////////////////////////////////////P/////////////////////////////////////////n/gP///////////////////////////////////////z//////////////////////////////////////////g///////////////////////////////////////////+P///////////////////////////////////////3//////////////////////////////////////////gP/////////////////////////////f/Af4A/gD8AHgAf///////////////////////////////////////w8f///////////////////////////////v/+//7//vf8D///////////////////////////////////////8AD//////////////////////////////////////////4////////////////////////////////////////AA////////////////////////////////////////+P//////////////////////////////////////////8A///////////////////////////////////////wAAD/////////////////////////////////////f/8AD////////////////////////////////////////wAf/////////////////////////////////////////g/////////////////////////////////////////wH/////jwAOAA4ADAAMAAgACAAIAAgACAAIAAgACAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//w4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/8AfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v/+//7//v///////////////////////////////v/+//7//v/+//7//////////v/+//7/////////////AAAAAAAAAACAAIAAgACAAIAAgACAAAAAAAAAAAAAAAD//v/+//7//v/+//7//v/+//7//v/+//7//v/+/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAD4/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD8AP/A//gAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//P/9//3//////////////////////////f/9//////////////////////////////////////////3//P/+AAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//P/8//x//H/8//z//P/8//3//f/8//x//D/8H/wBw/////////////////////////////////////z//B/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAAB/AB8ADwAHAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//f/9//z//H/8PfwB/AH////////////////////////7//v/+//7//v/+//7//oAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8APwAPAAcAAwADAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//f/8//x//H/8P/w//B/8AfwD/AP8AfwAfAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//f/9//z//H/8P/wf/AH////////////////////////////////7//v/+//7//gA/AB8ADwAHAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//P/8//x//H/8P/wf/AH///v/+//7//v/+//7//v/+//7//////////////////wB/AD8AHwAfAA8ADwAHAAcABwAHAAcAAwADAAMAAQABAAAAAAAAAAAAAAAAgACAAIAAgACAAAAAAAAAAAAAAAD/////f/9//3//P/8//z//H/8f/x//H/8f/w//Af8Af/////////////7//v/+//7//v/+//7//v/+//7//v/+AD8AHwAPAAcAAwADAAEAAQAAAAAAAAAAAAAAAAAAAAD///////////////////////////////9//3//f/9////+//7//v/+//7//v/+//7/////////////////////f/9//3//f///////f/9//3//f/8//z//H/8P/wf/AH8AAAAAAACAAIAAgACAAMAAwADAAIAAgAAAAAAAAAAAAAB/AH8APwAfAA8ABwAHAAcABwAHAAcAAwADAAEAAQABAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAAAAAAAAAP////9//3//P/8//x//H/8P/w//D/8H/wf/A/8D/wB/AH8APwAfAA8AAwADAAEAAQAAAAAAAAAAAAAAAAAAAAD///////////////////////9//3//f/9//3//f/9//wAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABf/9//3//f/////////////////////////////////8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////f/9//3//f/9//3//f/8//z//P/9//3//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgP//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gP/8////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP8///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwf//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP4A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//f///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAPwA//j/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAD4/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP//////////AAAAAAAAAAAAAQADAAcADwAPAB8APwB///////////8="
 }
});
