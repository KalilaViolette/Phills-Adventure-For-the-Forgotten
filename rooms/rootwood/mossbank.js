// mossbank: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "mossbank",
 "region": "rootwood",
 "w": 48,
 "h": 38,
 "music": "rootwood",
 "viewBottom": 608,
 "art": {
  "main": "art/rootwood/mossbank.png#main",
  "pack": "art/rootwood/mossbank.png",
  "parts": {
   "main": [
    0,
    0,
    768,
    608
   ],
   "L0": [
    0,
    608,
    1363,
    583
   ],
   "L1": [
    0,
    1191,
    1242,
    589
   ],
   "L2": [
    0,
    1780,
    1108,
    596
   ],
   "L3": [
    0,
    2376,
    960,
    603
   ],
   "L4": [
    0,
    2979,
    1002,
    794
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/mossbank.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/mossbank.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/mossbank.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/mossbank.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/mossbank.png#L4",
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
   "id": "ferns",
   "edge": "right",
   "a": 352,
   "b": 416,
   "to": "ferns",
   "toDoor": "moss",
   "x": 744.0,
   "y": 416,
   "f": -1
  },
  {
   "id": "pond",
   "edge": "left",
   "a": 448,
   "b": 512,
   "to": "reedbank",
   "toDoor": "moss",
   "x": 24.0,
   "y": 512,
   "f": 1
  }
 ],
 "items": [
  {
   "id": "acorn_mb0",
   "x": 256,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_mb1",
   "x": 266,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_mb2",
   "x": 276,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_mb3",
   "x": 286,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_mb4",
   "x": 296,
   "y": 224,
   "kind": "acorn"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##..............====..........................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##....................====....................##",
  "##............................................##",
  "##............................................##",
  "##............................................##",
  "##...........................######.............",
  "##..........................########............",
  "##.........................##########...........",
  "##.........................##########...........",
  "##.........................#####################",
  "##.........................#####################",
  "..........................######################",
  ".........................#######################",
  "..............##################################",
  ".............###################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################"
 ],
 "mapAt": [
  -112,
  72
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.42,
  "lights": [
   [
    118,
    476,
    110,
    1.0
   ],
   [
    118,
    462,
    46,
    0.55
   ]
  ]
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "rest": {
  "x": 104.0,
  "y": 512
 },
 "wildlife": [
  {
   "kind": "deer",
   "at": "L2",
   "x0": 160,
   "x1": 544,
   "y": 346,
   "every": [
    50,
    110
   ]
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 16,
   "x1": 192,
   "y": 512
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 224,
   "x1": 384,
   "y": 480,
   "every": [
    12,
    28
   ]
  }
 ],
 "foes": [
  {
   "kind": "can",
   "x": 328.0,
   "y": 480,
   "f": 1
  },
  {
   "kind": "cap",
   "x": 504.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "spinner",
   "x": 232.0,
   "y": 352,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   146,
   147,
   149,
   150,
   151,
   153,
   155,
   156,
   159,
   160,
   161,
   162,
   165,
   170,
   172,
   173,
   174,
   175,
   176,
   177,
   178,
   179,
   180,
   181,
   182,
   183,
   184,
   185,
   193,
   194,
   195,
   196,
   197,
   198,
   199,
   200,
   201,
   202,
   203,
   206,
   207,
   211,
   212,
   213,
   214,
   215,
   216,
   217,
   218,
   219,
   222,
   223,
   224,
   225,
   226,
   228,
   229,
   231,
   232,
   233,
   234,
   235,
   236,
   237,
   241,
   242,
   285,
   286,
   290,
   333,
   337,
   338,
   381,
   386,
   429,
   430,
   434,
   477,
   481,
   482,
   525,
   529,
   530,
   573,
   577,
   578,
   622,
   625,
   669,
   670,
   673,
   718,
   722,
   765,
   766,
   769,
   813,
   814,
   818,
   862,
   865,
   910,
   913,
   914,
   958,
   961,
   962,
   1005,
   1009,
   1010,
   1058,
   1105,
   1106,
   1153,
   1201,
   1202,
   1237,
   1238,
   1239,
   1240,
   1241,
   1249,
   1250,
   1284,
   1369,
   1407,
   1408,
   1409,
   1410,
   1412,
   1413,
   1414,
   1415,
   1416,
   1453,
   1491,
   1492,
   1496,
   1497,
   1498,
   1499,
   1500
  ],
  "bits": "//////////////////////////////////////////j/////////////////////////////////////8/8Af////////////////////////////////////z/8B8AH/////////////////////////////////////////8D///////////////////////////////////////8H/////////////////////////////////////////z/////////////////////////////////////////4+AD///////////////////////////////+f/w//A/8Af//////////////////////////8/+D/gP4A/AD4AOAA////////////////////////P/8//x//D/8H/wH/AAD///////////////////////////////////////8AIP///////////////////////////////////////wAf////////////////////////////////////9//z/+H//////////////////////////////////3//P/8f/////////////////////////////////////////x////////////////////////////7/+P/w/+D/wP+A8gD/////////////////////H/8P/wf/B/8H/wP/A/8D////////////////////////////////////////n/8H/////////////////////////////////////////+D///////////////////////////////////////5//P///////////////////////////////5//D/8P/wf//////////////////////////////////////////8D///////////////////////////////////////8P///////////////////////////////////////////g//////////////////////////////////////4AAAD///////////////////////////////////////8D///////////////////////////////////////////g/////////////////////////////////////5//AA///////////////////////////////////v/+//7//v/g/wD8APgA8ADgAMAAwACAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//gf4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8AfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/j/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADz8AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8ABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wH/AB8ABwADAAEAAQABAAAAAAAAAAEAAQAAAAD//v/+//7//v/+//7//v///////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAwADAAP//3//f/9//3///////////////////////////////4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAEAAQABAAEAAwADAAMAAwABAAEAAQABAAEAAQAAAAH//////////////////////////v/+//7//v/+//7//oAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAB/////3//f/9//3//f/9//3//f//////////////////AAMAAwACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQADAAMAAwADAAMAAwADAAMAAQABAAEAAQAB//7//v/+//7//v/+//7//v/+//7///////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAAABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////+//7//v////////////+AAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAAAAAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAA//////////////////////////7//v/+//7//v/+//6AAMAAwADAAMAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAH//f/9//3//f/9//3//f/9//3//f/9//3////////////7///////////////////////////////7//v/+//4AAAAAAAEAAQABAAMAAwADAAEAAQABAAEAAAAAAAAAAP////////////////////////////////////9//3////7//v/+//z//P/8//7//v/+//7///////////////9//3//f/9//////////////////////////////////wAAgACAAAAAAAAAAAAAAACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAF//3//f/8//z//f/9//3//f/////////////////////////////////////////7//v/+//7/////////////AAEAAQABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////f/9//wAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAf/9//3//P/8//z//P/8//z//P/8//z//P/8//3//f//////////////+//7//v/+//7//v/+//7//P/8//z//n//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3////7//v/+//7//v/+//7//v/+//////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAH//f/9//3//f/9//3//f/9//3//f/9//3//f//////////////////////////////////////+//7//v/+//6AAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAA//7//v/+//////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAAAAAAAAA/////////////////////////////////////v/+//4AAAAAAAAAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAP/+//z//P/8//z//P/8//7//v/+//7//v/+//7//v////////////////////////////////////7//v/+//4AAIAAgACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEADwD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP/g//7//v/+/////////////////////////////////////wAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAD/8//3//f/////////////////////////////////8AAwAPAB8AHwA/AH8AfwD/Af8D/wP/B/8P/w//H/9//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABP////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////AAAAAAAAAAAAAAAAAAAAAAADAAcH//////////////8ADwB/Af8D/w//P/9//////////////////////////wADAA8AHwAfAD8AfwB/AP8B/wP/A/8H/w//D/8f/3//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/D/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAP8H/x//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAP/g/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAf//////////AAcAHwB/AP8D/wf/D/8f/z//f/////////////////8="
 }
});
