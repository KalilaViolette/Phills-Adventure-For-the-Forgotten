// townsquare: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "townsquare",
 "region": "warren",
 "w": 56,
 "h": 36,
 "music": "warren",
 "viewBottom": 576,
 "art": {
  "main": "art/warren/townsquare.png#main",
  "pack": "art/warren/townsquare.png",
  "parts": {
   "main": [
    0,
    0,
    896,
    576
   ],
   "L0": [
    0,
    576,
    1213,
    781
   ],
   "L1": [
    0,
    1357,
    1213,
    580
   ],
   "L2": [
    0,
    1937,
    1008,
    580
   ]
  },
  "layers": [
   {
    "src": "art/warren/townsquare.png#L0",
    "f": 1.35
   },
   {
    "src": "art/warren/townsquare.png#L1",
    "f": 1.35,
    "fy": 1.0
   },
   {
    "src": "art/warren/townsquare.png#L2",
    "f": 0.8
   }
  ],
  "uses": [
   "art/warren/warren_sprites.png",
   "art/warren/warren_items.png"
  ],
  "items": "art/warren/warren_items.png"
 },
 "doors": [
  {
   "id": "tunnel",
   "edge": "left",
   "a": 240,
   "b": 304,
   "to": "maintunnel",
   "toDoor": "square",
   "x": 24.0,
   "y": 304,
   "f": 1
  },
  {
   "id": "lane",
   "edge": "right",
   "a": 288,
   "b": 352,
   "to": "mendlane",
   "toDoor": "square",
   "x": 872.0,
   "y": 352,
   "f": -1
  },
  {
   "id": "hatch",
   "edge": "bottom",
   "a": 256,
   "b": 320,
   "to": "listenpost",
   "toDoor": "square",
   "x": 280.0,
   "y": 496,
   "f": 1,
   "keepX": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "####................................................####",
  "####................................................####",
  "####................................................####",
  "####................................................####",
  "####................................................####",
  "####................................................####",
  "####=====...........................................####",
  "####................................................####",
  "####................................................####",
  "....................................................####",
  "....................................................####",
  "....................................................####",
  "........................................................",
  "##########..............................................",
  "##########..............................................",
  "##########..............................................",
  "##########===...............................############",
  "####........................................############",
  "####........................................############",
  "####......===...........................====############",
  "####........................................############",
  "####........................................############",
  "####......===.............#####.........====############",
  "####......................#####.............############",
  "####......................#####.............############",
  "################====####################################",
  "################....####################################",
  "################....####################################",
  "################====####################################",
  "################....####################################"
 ],
 "mapAt": [
  172,
  150
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.56,
  "tint": "#0c0810",
  "lights": [
   [
    448,
    416,
    120,
    0.95
   ],
   [
    128,
    432,
    70,
    0.7
   ],
   [
    768,
    288,
    80,
    0.7
   ],
   [
    32,
    256,
    50,
    0.4
   ],
   [
    233,
    291,
    36,
    0.5
   ],
   [
    253,
    280,
    30,
    0.45
   ],
   [
    393,
    291,
    36,
    0.5
   ],
   [
    413,
    280,
    30,
    0.45
   ],
   [
    537,
    291,
    36,
    0.5
   ],
   [
    557,
    280,
    30,
    0.45
   ],
   [
    327,
    197,
    36,
    0.5
   ],
   [
    344,
    190,
    30,
    0.45
   ],
   [
    475,
    197,
    36,
    0.5
   ],
   [
    492,
    190,
    30,
    0.45
   ],
   [
    720,
    312,
    30,
    0.45
   ],
   [
    736,
    312,
    30,
    0.45
   ],
   [
    272,
    184,
    72,
    0.75
   ],
   [
    480,
    212,
    72,
    0.75
   ],
   [
    688,
    172,
    72,
    0.75
   ],
   [
    368,
    481,
    84,
    0.85
   ],
   [
    406,
    102,
    16,
    0.4
   ],
   [
    733,
    103,
    16,
    0.4
   ],
   [
    393,
    106,
    16,
    0.4
   ],
   [
    367,
    104,
    16,
    0.4
   ],
   [
    389,
    102,
    16,
    0.4
   ],
   [
    721,
    108,
    16,
    0.4
   ],
   [
    167,
    103,
    16,
    0.4
   ],
   [
    517,
    100,
    16,
    0.4
   ],
   [
    757,
    104,
    16,
    0.4
   ],
   [
    87,
    378,
    16,
    0.4
   ],
   [
    727,
    106,
    16,
    0.4
   ],
   [
    100,
    374,
    16,
    0.4
   ],
   [
    637,
    104,
    16,
    0.4
   ],
   [
    243,
    104,
    16,
    0.4
   ]
  ]
 },
 "ambient": [
  "dust"
 ],
 "npcs": [
  {
   "kind": "ballerina",
   "x": 456.0,
   "y": 448,
   "f": -1
  },
  {
   "kind": "tock",
   "x": 568.0,
   "y": 496,
   "f": -1,
   "after": "warrenOpen"
  },
  {
   "kind": "teddy",
   "x": 88.0,
   "y": 496,
   "f": 1
  },
  {
   "kind": "bunny",
   "x": 136.0,
   "y": 496,
   "f": -1
  },
  {
   "kind": "duck",
   "x": 744.0,
   "y": 352,
   "f": 1
  },
  {
   "kind": "sock",
   "x": 824.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "drummer",
   "x": 104.0,
   "y": 192,
   "f": 1
  }
 ],
 "rest": {
  "x": 376.0,
  "y": 496
 },
 "board": {
  "x": 600.0,
  "y": 496
 },
 "school": {
  "x": 792.0,
  "y": 352
 },
 "signs": [
  {
   "x": 80,
   "y": 232,
   "text": "don't go out alone",
   "c": "#4a8a3a"
  }
 ],
 "patientspots": [
  [
   184.0,
   496,
   1
  ],
  [
   664.0,
   496,
   -1
  ]
 ],
 "shutters": [
  [
   248,
   276,
   10,
   9
  ],
  [
   408,
   276,
   10,
   9
  ],
  [
   552,
   276,
   10,
   9
  ],
  [
   340,
   186,
   8,
   7
  ],
  [
   488,
   186,
   8,
   7
  ],
  [
   714,
   306,
   12,
   12
  ],
  [
   730,
   306,
   12,
   12
  ],
  [
   228,
   449,
   12,
   10
  ],
  [
   278,
   449,
   12,
   10
  ],
  [
   508,
   463,
   10,
   8
  ],
  [
   74,
   288,
   10,
   8
  ]
 ],
 "foes": [],
 "detail": {
  "tiles": [
   284,
   285,
   286,
   288,
   289,
   291,
   292,
   293,
   294,
   295,
   296,
   297,
   298,
   299,
   300,
   301,
   302,
   303,
   304,
   305,
   306,
   307,
   308,
   309,
   312,
   313,
   314,
   317,
   318,
   319,
   320,
   321,
   322,
   326,
   327,
   328,
   329,
   339,
   340,
   341,
   342,
   343,
   344,
   345,
   346,
   347,
   348,
   351,
   352,
   357,
   359,
   361,
   362,
   366,
   368,
   369,
   370,
   371,
   377,
   378,
   379,
   380,
   381,
   383,
   386,
   387,
   395,
   443,
   451,
   500,
   507,
   555,
   563,
   611,
   619,
   667,
   668,
   723,
   724,
   732,
   780,
   787,
   891,
   892,
   948,
   1003,
   1004,
   1011,
   1012,
   1013,
   1014,
   1015,
   1073,
   1185,
   1238,
   1239,
   1240,
   1241,
   1276,
   1292,
   1293,
   1332,
   1348,
   1403,
   1444,
   1459,
   1500,
   1515,
   1555,
   1571,
   1594,
   1598,
   1612,
   1650,
   1654,
   1667,
   1693,
   1694,
   1705,
   1706,
   1711,
   1712,
   1713,
   1719,
   1723,
   1724,
   1751,
   1756,
   1807,
   1812
  ],
  "bits": "/////////////////////////////////////////+H///////////////////////////////////////z/gP////////////////////////////////////8//w////////////////////////////////////////////j/////////////////////////////////////H/8D///////////////////////////////////////////4///////////////////////////////////v/wD/AH/////////////////////////////////////////4AP///////////////////////////////////////wAB//////////////////////////////////////////D///////////////////////////////////////8//v////////////////////////////////////+A/wAA////////////////////////////////////////f4D///////////////////////////g/8D/wD+AP4AcAAP///////////////////////////////////////3/A////////////////////////////////////////P/////////////////////////////////////////8Af/////////////////////////////////////////9///////////////////////////////H/4H/AP8AfwAf//////////////////////////////////////////P///////////////////////////////////////3/////////////////////////////////////////+D/7////////////////////////+//w/8D+AHwAPAAEAAP///////////////////////////////////////wP/////////////////////////////////////////8H///////////////////////////////////////////P///////////////////////////////////////w///////////////////////////////////////////8D//////////////////////////////////////h8AAP////////////////////////////////////z/AAAA//////////////////////////////////9//3//P+D///////////////////////////////////////9///////////////////////////////////////////f////////////////////////////////////////++A///////////////////////////////////z//P/8//////////////////////////////////////////zwA////////////////////////////////////////AH///////////////////////////////////v/+//////+A/wD+APgA4ADAAMAAgAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4DwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMf/AH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//B/8AHwAPAA8ABwADAAEAAQAAAAAAAAAAAAAAAAAA/////////////////////v/+//7//v/+//7//v/+//4AAAABAAEAAQAAAAAAAAABAAEAAQABAAEAAQABAAEAAP/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+/////3//f/9//z//P/8//3//f/9//3//f/9//////////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//gAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQAB/////////////v/+//////////////////////////8AAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAf/////////////////+//7//v/+//7//v/+//7/////AAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAH/////////////////////f/9//3///////////////wABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////3//f/9//3//f/+AAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//P/8//z//P/8//z//f/9//3////////////////////7//v/+//7//v/+//7//v/+//7//v/8//j/4P4A+AAAAQABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////9//3//f/9//3//P/8//z//P/9//3//f/9//3//f/9///////////////8AAAABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//z//P/8P/wP/Af8A/wAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AP/w//z//v/+///////////////////////////////////////////////+//7//P/8//z//P/8//7//v/+//7//////////////////////////////////////4DgAP///////////////////////////////////////wA//////////////////////////////////////////8D//v/+//z//P/8//z//P/8//z//P/8//j/8P/A/gAAAA//P/9//3//////////////////////////f/8//3//////8P8A/gD4APAA4ADgAOAAwADAAMAAgACAAIAAgAD/zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//f/9//3//f/9/////////////////////////////gACAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAD///////7//v/+//7//v/+//z//P/8//7//v/+//7//v///////////////////////////////////////3////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//5//3//f/9//3//f/9//3//f//////////////////////+//////////7//v/+////////////////////////AAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAH//////////v/+//7//v/+//7//v/+//7//////////w//P/9//3//////////////////////////f/9//3////D//P/+//7//////////////////////////v/+//7//////////3//f/9//3//f/9//3//f////////////3//f/9///////////////////////////////////////7//v/+//7///////////////////////////////8AAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAEAAwADAAcAHwD/Af8P////f/9//3//////////////////////////////////AAAAAAAAAAAAAAAAAACAAMAA4ADwAPgA/gb///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAABAAMAAwAHAA8AHwA/AP8D////f/9///////////////////////////////////////D//P/+//7//////////////////////////v/+//4P/z//f/9//////////////////////////3//P/8////+//7//v/+//7//v/+//7//v/+////////////////f/9//3//f/9//3//f/9//3//f/9//3//f/////////8="
 }
});
