// ferns: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "ferns",
 "region": "rootwood",
 "w": 64,
 "h": 26,
 "music": "rootwood",
 "viewBottom": 416,
 "art": {
  "main": "art/rootwood/painted/ferns.webp#main",
  "pack": "art/rootwood/painted/ferns.webp",
  "parts": {
   "main": [
    0,
    0,
    1024,
    416
   ],
   "L0": [
    0,
    416,
    689,
    390
   ],
   "L1": [
    0,
    806,
    758,
    396
   ],
   "L2": [
    0,
    1202,
    834,
    402
   ],
   "L3": [
    0,
    1604,
    919,
    410
   ],
   "L4": [
    0,
    2014,
    793,
    426
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/painted/ferns.webp#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/painted/ferns.webp#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/painted/ferns.webp#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/painted/ferns.webp#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/painted/ferns.webp#L4",
    "f": 1.3,
    "x": 135
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
   "id": "oak",
   "edge": "right",
   "a": 224,
   "b": 352,
   "to": "oakfall",
   "toDoor": "west",
   "x": 1000.0,
   "y": 352,
   "f": -1
  },
  {
   "id": "moss",
   "edge": "left",
   "a": 160,
   "b": 224,
   "to": "mossbank",
   "toDoor": "ferns",
   "x": 24.0,
   "y": 224,
   "f": 1
  },
  {
   "id": "down",
   "edge": "bottom",
   "a": 320,
   "b": 416,
   "to": "grimepool",
   "toDoor": "up",
   "x": 352,
   "y": 336,
   "f": 1,
   "keepX": true,
   "falling": true
  },
  {
   "id": "oakwest",
   "edge": "top",
   "a": 928,
   "b": 992,
   "to": "westdrop",
   "toDoor": "ferns",
   "x": 952.0,
   "y": 288,
   "f": 1,
   "keepX": true,
   "falling": true,
   "needs": "velcro"
  }
 ],
 "items": [
  {
   "id": "acorn_f5",
   "x": 88,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_f9",
   "x": 152,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_f34",
   "x": 552,
   "y": 352,
   "kind": "acorn"
  },
  {
   "id": "acorn_f52",
   "x": 840,
   "y": 352,
   "kind": "acorn"
  }
 ],
 "hints": [
  {
   "text": "the oak's bark. he can't climb it. not yet",
   "l": 864,
   "t": 64,
   "r": 992,
   "b": 320,
   "x": 928,
   "y": 192,
   "until": "velcro"
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##########################################################....##",
  "##########################################################....##",
  "##########################################################....##",
  "##########################################################....##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "..............................................................##",
  "..............................................................##",
  "..............................................................##",
  "..............................................................##",
  "############....................................................",
  "############....................................................",
  "############....................................................",
  "############....................................................",
  "####################............................................",
  "####################............................................",
  "####################............................................",
  "####################............................................",
  "####################......######################################",
  "####################......######################################",
  "####################......######################################",
  "####################......######################################"
 ],
 "mapAt": [
  -64,
  84
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.42,
  "lights": [
   [
    472,
    345,
    46,
    0.55
   ],
   [
    476,
    342,
    46,
    0.55
   ],
   [
    484,
    347,
    46,
    0.55
   ]
  ]
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "grip": [
  [
   62,
   0,
   62,
   13
  ]
 ],
 "wildlife": [
  {
   "kind": "deer",
   "at": "L2",
   "x0": 160,
   "x1": 672,
   "y": 266
  },
  {
   "kind": "hedgehog",
   "at": "back",
   "x0": 448,
   "x1": 896,
   "y": 352
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 480,
   "x1": 960,
   "y": 352,
   "every": [
    30,
    70
   ]
  }
 ],
 "ramps": [
  [
   [
    896,
    288
   ],
   [
    897,
    288
   ],
   [
    898,
    288
   ],
   [
    899,
    288
   ],
   [
    900,
    288
   ],
   [
    901,
    288
   ],
   [
    902,
    288
   ],
   [
    903,
    288
   ],
   [
    904,
    288
   ],
   [
    905,
    288
   ],
   [
    906,
    288
   ],
   [
    907,
    288
   ],
   [
    908,
    288
   ],
   [
    909,
    288
   ],
   [
    910,
    288
   ],
   [
    911,
    288
   ],
   [
    912,
    288
   ],
   [
    913,
    288
   ],
   [
    914,
    288
   ],
   [
    915,
    288
   ],
   [
    916,
    288
   ],
   [
    917,
    288
   ],
   [
    918,
    288
   ],
   [
    919,
    288
   ],
   [
    920,
    288
   ],
   [
    921,
    288
   ],
   [
    922,
    288
   ],
   [
    923,
    288
   ],
   [
    924,
    288
   ],
   [
    925,
    288
   ],
   [
    926,
    288
   ],
   [
    927,
    288
   ],
   [
    928,
    288
   ],
   [
    929,
    288
   ],
   [
    930,
    288
   ],
   [
    931,
    288
   ],
   [
    932,
    288
   ],
   [
    933,
    288
   ],
   [
    934,
    288
   ],
   [
    935,
    288
   ],
   [
    936,
    288
   ],
   [
    937,
    288
   ],
   [
    938,
    288
   ],
   [
    939,
    288
   ],
   [
    940,
    288
   ],
   [
    941,
    288
   ],
   [
    942,
    288
   ],
   [
    943,
    288
   ],
   [
    944,
    288
   ],
   [
    945,
    288
   ],
   [
    946,
    288
   ],
   [
    947,
    288
   ],
   [
    948,
    288
   ],
   [
    949,
    288
   ],
   [
    950,
    288
   ],
   [
    951,
    288
   ],
   [
    952,
    288
   ],
   [
    953,
    288
   ],
   [
    954,
    288
   ],
   [
    955,
    288
   ],
   [
    956,
    288
   ],
   [
    957,
    288
   ],
   [
    958,
    288
   ],
   [
    959,
    288
   ],
   [
    960,
    288
   ],
   [
    961,
    288
   ],
   [
    962,
    288
   ],
   [
    963,
    288
   ],
   [
    964,
    288
   ],
   [
    965,
    288
   ],
   [
    966,
    288
   ],
   [
    967,
    288
   ],
   [
    968,
    288
   ],
   [
    969,
    288
   ],
   [
    970,
    288
   ],
   [
    971,
    288
   ],
   [
    972,
    288
   ],
   [
    973,
    288
   ],
   [
    974,
    288
   ],
   [
    975,
    288
   ],
   [
    976,
    288
   ],
   [
    977,
    288
   ],
   [
    978,
    288
   ],
   [
    979,
    288
   ],
   [
    980,
    288
   ],
   [
    981,
    288
   ],
   [
    982,
    288
   ],
   [
    983,
    288
   ],
   [
    984,
    288
   ],
   [
    985,
    288
   ],
   [
    986,
    288
   ],
   [
    987,
    288
   ],
   [
    988,
    288
   ],
   [
    989,
    288
   ],
   [
    990,
    288
   ],
   [
    991,
    288
   ]
  ],
  [
   [
    320,
    304
   ],
   [
    321,
    304
   ],
   [
    322,
    304
   ],
   [
    323,
    304
   ],
   [
    324,
    304
   ],
   [
    325,
    304
   ],
   [
    326,
    304
   ],
   [
    327,
    304
   ],
   [
    328,
    304
   ],
   [
    329,
    304
   ],
   [
    330,
    304
   ],
   [
    331,
    304
   ],
   [
    332,
    304
   ],
   [
    333,
    304
   ],
   [
    334,
    304
   ],
   [
    335,
    304
   ],
   [
    336,
    304
   ],
   [
    337,
    304
   ],
   [
    338,
    304
   ],
   [
    339,
    304
   ],
   [
    340,
    304
   ],
   [
    341,
    304
   ],
   [
    342,
    304
   ],
   [
    343,
    304
   ],
   [
    344,
    304
   ],
   [
    345,
    304
   ],
   [
    346,
    304
   ],
   [
    347,
    304
   ],
   [
    348,
    304
   ],
   [
    349,
    304
   ],
   [
    350,
    304
   ],
   [
    351,
    304
   ],
   [
    352,
    304
   ],
   [
    353,
    304
   ],
   [
    354,
    304
   ],
   [
    355,
    304
   ],
   [
    356,
    304
   ],
   [
    357,
    304
   ],
   [
    358,
    304
   ],
   [
    359,
    304
   ],
   [
    360,
    304
   ],
   [
    361,
    304
   ],
   [
    362,
    304
   ],
   [
    363,
    304
   ],
   [
    364,
    304
   ],
   [
    365,
    304
   ],
   [
    366,
    304
   ],
   [
    367,
    304
   ],
   [
    368,
    304
   ],
   [
    369,
    304
   ],
   [
    370,
    304
   ],
   [
    371,
    304
   ],
   [
    372,
    304
   ],
   [
    373,
    304
   ],
   [
    374,
    304
   ],
   [
    375,
    304
   ],
   [
    376,
    304
   ],
   [
    377,
    304
   ],
   [
    378,
    304
   ],
   [
    379,
    304
   ],
   [
    380,
    304
   ],
   [
    381,
    304
   ],
   [
    382,
    304
   ],
   [
    383,
    304
   ],
   [
    384,
    304
   ],
   [
    385,
    304
   ],
   [
    386,
    304
   ],
   [
    387,
    304
   ],
   [
    388,
    304
   ],
   [
    389,
    304
   ],
   [
    390,
    304
   ],
   [
    391,
    304
   ],
   [
    392,
    304
   ],
   [
    393,
    304
   ],
   [
    394,
    304
   ],
   [
    395,
    304
   ],
   [
    396,
    304
   ],
   [
    397,
    304
   ],
   [
    398,
    304
   ],
   [
    399,
    304
   ],
   [
    400,
    304
   ],
   [
    401,
    304
   ],
   [
    402,
    304
   ],
   [
    403,
    304
   ],
   [
    404,
    304
   ],
   [
    405,
    304
   ],
   [
    406,
    304
   ],
   [
    407,
    304
   ],
   [
    408,
    304
   ],
   [
    409,
    304
   ],
   [
    410,
    304
   ],
   [
    411,
    304
   ],
   [
    412,
    304
   ],
   [
    413,
    304
   ],
   [
    414,
    304
   ],
   [
    415,
    304
   ]
  ]
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 584.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "cap",
   "x": 808.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "spinner",
   "x": 712.0,
   "y": 240,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   194,
   195,
   196,
   198,
   199,
   200,
   202,
   203,
   204,
   206,
   207,
   209,
   210,
   212,
   213,
   214,
   216,
   218,
   219,
   220,
   221,
   223,
   224,
   225,
   227,
   228,
   229,
   230,
   231,
   232,
   233,
   234,
   235,
   236,
   239,
   242,
   243,
   245,
   246,
   247,
   249,
   258,
   260,
   261,
   265,
   266,
   267,
   268,
   269,
   270,
   271,
   272,
   273,
   274,
   275,
   276,
   277,
   279,
   280,
   281,
   282,
   283,
   284,
   286,
   287,
   288,
   290,
   291,
   292,
   296,
   297,
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
   310,
   311,
   312,
   313,
   321,
   322,
   385,
   450,
   513,
   835,
   839,
   907,
   1099,
   1100,
   1101,
   1102,
   1103,
   1104,
   1105,
   1106,
   1171,
   1235,
   1299,
   1363,
   1371,
   1372,
   1373,
   1374,
   1375,
   1376,
   1380,
   1381,
   1382,
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
   1399,
   1400,
   1401,
   1402,
   1403,
   1404,
   1428,
   1434
  ],
  "bits": "/////////////////////////////////////////4D///////////////////////////////////////8f/P///////////////////////////////////////wB/////////////////////f/4//j/8H/wH/Af4A/gDAAD///////////////////////////////////////8A/v/////////////////////////////////////gfwAP//////////////////////8//j/+P/wf/B/4D/gM+AD/////////////////////////////////////P/8P//////////////////////////////////5//H/8Ofgg//////////////////////////////////////////j/////////////////////////////////////8f8Af////////////////////////////////////////v/+/////////////////////////////////////x//H/////////////////////////////////////////8P//////////////////////////////////////////4A////////////////////////////////////////fw//////////////////////////////8//x/+AD4AHgAP/////////////////////////////z/+H/4OHgAOAA////////////////////////////////9//h/2A/AAf///////////////////////////////////////j/8P////////////////////////////////////8ADwAD/////////////////////////////////////////+////////////////////////////////////////7/wP/////////////////////////////j/+D/4P8AvwAH/////////////////////////////////////////8D///////////////////////////////////////8f////////////////////////////////////////BwAA////////////////////////////////////////AAf////////////////////////////////////////wAP////////////////////////////////////8H/wH//////////////////////////////////////////gf////////////////////////////////////////4Af/////////////////////////////////////////4////////////////////////////////////////AP//////////////////////////////////////////+//////////////////////////////////////////4////////////////////////////////////////AD//////////////////////////////////////+f/AP//////////////////////////////////////+APgA/////////////////////////////////////wH/AH///////////v/////////+//7//v/+//z/+P/w/+D+APwA+ADwAOAAwADAAIAAgACAAIAAgACAAIAAgACAAIAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8B+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wP+APgAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/8//wBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/B8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v/APgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//A/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j/AH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAPAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA4ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//AfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gP8ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/D/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8B8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//H/8D8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8D8AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////wfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////////////////////v/+gADAAMAAwADAAMAAwACAAIAAgACAAAAAAAAAAAAAAAD//v/+//7//////////////////////////////////wAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAA//////////7//v/+//7//v/+//7//v/+//7///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgA/4//D//P/+//7///////////////////////////////////////////////////////7//v///////////////wAAAAAAAAAAgADAAOAA4ADwAPgA/AD+AP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAA/AD/8f//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8D//v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADgAP4A//D//P/+//7//////////////////////////////////////////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//////////////////7//v/+//7//v/+//7//v////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAHAD8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8A//z/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD8AP+A//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMADwB/A/8f/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwA////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfP/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADx///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/AD/AP/g//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP+A//gAAAAAAACAAIAAgACAAIAAwADAAMAAwADgAOAAwACAAA//P/9//3//////////////////////////////////"
 }
});
