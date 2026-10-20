// well: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "well",
 "region": "rootwood",
 "w": 54,
 "h": 52,
 "music": "rootwood",
 "viewBottom": 832,
 "art": {
  "main": "art/rootwood/well.png#main",
  "pack": "art/rootwood/well.png",
  "parts": {
   "main": [
    0,
    0,
    864,
    832
   ],
   "L0": [
    0,
    832,
    1374,
    610
   ],
   "L1": [
    0,
    1442,
    1271,
    656
   ],
   "L2": [
    0,
    2098,
    1156,
    708
   ],
   "L3": [
    0,
    2806,
    1029,
    764
   ],
   "L4": [
    0,
    3570,
    1127,
    1085
   ],
   "L5": [
    0,
    4655,
    948,
    800
   ],
   "L6": [
    0,
    5455,
    1127,
    1085
   ],
   "L7": [
    0,
    6540,
    1127,
    836
   ],
   "L8": [
    0,
    7376,
    1300,
    1252
   ],
   "L9": [
    0,
    8628,
    1300,
    836
   ],
   "front": [
    0,
    9464,
    832,
    521
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/well.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/well.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/well.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/well.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/well.png#L4",
    "f": 1.3
   },
   {
    "src": "art/rootwood/well.png#L5",
    "f": 0.86
   },
   {
    "src": "art/rootwood/well.png#L6",
    "f": 1.3
   },
   {
    "src": "art/rootwood/well.png#L7",
    "f": 1.3,
    "fy": 1.0
   },
   {
    "src": "art/rootwood/well.png#L8",
    "f": 1.5
   },
   {
    "src": "art/rootwood/well.png#L9",
    "f": 1.5,
    "fy": 1.0
   }
  ],
  "front": "art/rootwood/well.png#front",
  "frontAt": [
   19,
   248
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
   "id": "hollow",
   "edge": "left",
   "a": 192,
   "b": 256,
   "to": "hollow",
   "toDoor": "well",
   "x": 24.0,
   "y": 256,
   "f": 1
  },
  {
   "id": "bramble",
   "edge": "right",
   "a": 416,
   "b": 512,
   "to": "bramble",
   "toDoor": "well",
   "x": 840.0,
   "y": 512,
   "f": -1
  },
  {
   "id": "rootlattice",
   "edge": "left",
   "a": 704,
   "b": 768,
   "to": "rootlattice",
   "toDoor": "well",
   "x": 24.0,
   "y": 768,
   "f": 1
  },
  {
   "id": "woodpecker",
   "edge": "right",
   "a": 704,
   "b": 768,
   "to": "woodpecker",
   "toDoor": "well",
   "x": 840.0,
   "y": 768,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "pin_watch",
   "x": 840.0,
   "y": 688,
   "kind": "pin",
   "pin": "watch",
   "needs": "burst"
  },
  {
   "id": "acorn_w14_20",
   "x": 232,
   "y": 320,
   "kind": "acorn"
  },
  {
   "id": "acorn_w26_28",
   "x": 424,
   "y": 448,
   "kind": "acorn"
  },
  {
   "id": "acorn_w20_40",
   "x": 328,
   "y": 640,
   "kind": "acorn"
  },
  {
   "id": "acorn_w38_32",
   "x": 616,
   "y": 512,
   "kind": "acorn"
  }
 ],
 "hints": [
  {
   "text": "dead leaves, packed in tight. a good puff of air would scatter them",
   "l": 672,
   "t": 576,
   "r": 800,
   "b": 704,
   "x": 736,
   "y": 608,
   "until": "burst"
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "######################################################",
  "#########################...##########################",
  "########################.....#########################",
  "########################.....#########################",
  "#######.....######...............########....#########",
  "#######.......###..................####......#########",
  "#####..........................................#######",
  "#####..........................................#######",
  "####...........................................#######",
  "####............................................######",
  "####............................................######",
  "####...........................................#######",
  "...............................................#######",
  "...............................................#######",
  "...............................................#######",
  "................................................######",
  "#############...................................######",
  "##########........................................####",
  "########..........................................####",
  "######............................................####",
  "####........===...................................####",
  "####..............................................####",
  "####..............................................####",
  "####..............................................####",
  "######.............===............................####",
  "######............................................####",
  "#######...............................................",
  "#######...............................................",
  "#######.................======........................",
  "#######...............................................",
  "######................................................",
  "######................................................",
  "####...............===..............======..##########",
  "####.........................................#########",
  "####..........................................########",
  "#####..........................................#######",
  "#####.......===...............=====..............#####",
  "######............................................####",
  "######............................................####",
  "######............................................####",
  "#####..............===..............======............",
  "#####.................................................",
  "####..................................................",
  "####........................................##########",
  "............===.............######...........#########",
  "............................######....................",
  "............................######....................",
  "............................######....................",
  "######################################################",
  "######################################################",
  "######################################################",
  "######################################################"
 ],
 "mapAt": [
  152,
  92
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.56,
  "lights": [
   [
    424,
    56,
    70,
    0.6
   ],
   [
    424,
    758,
    60,
    0.5
   ],
   [
    88,
    240,
    22,
    0.35
   ],
   [
    201,
    246,
    22,
    0.35
   ],
   [
    204,
    246,
    22,
    0.35
   ],
   [
    209,
    247,
    22,
    0.35
   ],
   [
    196,
    250,
    22,
    0.35
   ],
   [
    394,
    439,
    22,
    0.35
   ],
   [
    586,
    505,
    22,
    0.35
   ],
   [
    572,
    501,
    22,
    0.35
   ],
   [
    587,
    498,
    22,
    0.35
   ],
   [
    766,
    164,
    22,
    0.35
   ],
   [
    768,
    161,
    22,
    0.35
   ],
   [
    752,
    160,
    22,
    0.35
   ],
   [
    826,
    681,
    46,
    0.55
   ],
   [
    562,
    766,
    46,
    0.55
   ],
   [
    605,
    768,
    46,
    0.55
   ],
   [
    432,
    454,
    46,
    0.55
   ],
   [
    624,
    518,
    46,
    0.55
   ],
   [
    520,
    582,
    46,
    0.55
   ],
   [
    624,
    646,
    46,
    0.55
   ],
   [
    436,
    762,
    46,
    0.55
   ],
   [
    442,
    759,
    46,
    0.55
   ],
   [
    450,
    760,
    46,
    0.55
   ],
   [
    541,
    764,
    46,
    0.55
   ],
   [
    550,
    762,
    46,
    0.55
   ],
   [
    171,
    761,
    18,
    0.3
   ],
   [
    165,
    751,
    18,
    0.3
   ],
   [
    141,
    746,
    18,
    0.3
   ],
   [
    188,
    755,
    18,
    0.3
   ],
   [
    180,
    749,
    18,
    0.3
   ],
   [
    168,
    754,
    18,
    0.3
   ],
   [
    130,
    751,
    18,
    0.3
   ],
   [
    120,
    754,
    18,
    0.3
   ],
   [
    664,
    503,
    18,
    0.3
   ],
   [
    653,
    502,
    18,
    0.3
   ],
   [
    633,
    495,
    18,
    0.3
   ],
   [
    619,
    500,
    18,
    0.3
   ],
   [
    613,
    504,
    18,
    0.3
   ],
   [
    676,
    504,
    18,
    0.3
   ],
   [
    663,
    496,
    18,
    0.3
   ],
   [
    658,
    501,
    18,
    0.3
   ]
  ]
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "breaks": [
  {
   "id": "curtain",
   "x0": 4,
   "y0": 12,
   "x1": 5,
   "y1": 15,
   "hp": 2,
   "look": "curtain",
   "oneway": "right",
   "flag": "curtainOpen"
  },
  {
   "id": "well_leaves",
   "x0": 48,
   "y0": 40,
   "x1": 49,
   "y1": 42,
   "hp": 1,
   "look": "leaves",
   "need": "burst",
   "pile": [
    50.2,
    6.2,
    3.1
   ]
  }
 ],
 "wildlife": [
  {
   "kind": "mouse",
   "at": "back",
   "x0": 96,
   "x1": 704,
   "y": 768
  },
  {
   "kind": "beetle",
   "at": "back",
   "x0": 208,
   "x1": 640,
   "y": 768
  }
 ],
 "frontglow": [
  [
   94.4,
   1043.4,
   1.5,
   1.0608144383895375,
   "#9ff2dc"
  ],
  [
   167.5,
   1057.8,
   1.5,
   0.8064110446510178,
   "#9ff2dc"
  ],
  [
   151.2,
   1054.7,
   1.5,
   0.7792458648479522,
   "#9ff2dc"
  ],
  [
   121.9,
   1055.1,
   1.5,
   0.7792458648479522,
   "#9ff2dc"
  ],
  [
   32.9,
   1030.6,
   1.5,
   2.9,
   "#9ff2dc"
  ],
  [
   272.3,
   1053.3,
   1.5,
   1.4490428893910554,
   "#9ff2dc"
  ],
  [
   278.0,
   1039.2,
   1.5,
   0.9896185394129721,
   "#9ff2dc"
  ],
  [
   264.5,
   1041.2,
   1.5,
   0.9896185394129721,
   "#9ff2dc"
  ],
  [
   262.6,
   1053.6,
   1.5,
   0.9896185394129721,
   "#9ff2dc"
  ],
  [
   273.3,
   1032.7,
   1.5,
   1.2178733938301698,
   "#9ff2dc"
  ],
  [
   250.5,
   1050.5,
   1.5,
   1.2178733938301698,
   "#9ff2dc"
  ],
  [
   338.7,
   1018.7,
   1.5,
   4.1,
   "#9ff2dc"
  ],
  [
   740.2,
   1042.9,
   1.5,
   3.2,
   "#9ff2dc"
  ],
  [
   728.4,
   1046.1,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   718.1,
   1045.0,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   688.8,
   1040.5,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   945.6,
   1033.9,
   1.5,
   1.507915651741059,
   "#9ff2dc"
  ],
  [
   1007.9,
   1042.0,
   1.5,
   1.4842071931801684,
   "#9ff2dc"
  ],
  [
   999.5,
   1042.5,
   1.5,
   4.0,
   "#9ff2dc"
  ],
  [
   960.7,
   1039.1,
   1.5,
   1.1131996284761778,
   "#9ff2dc"
  ],
  [
   949.3,
   1026.3,
   1.5,
   1.1131996284761778,
   "#9ff2dc"
  ],
  [
   922.7,
   1035.8,
   1.5,
   1.1131996284761778,
   "#9ff2dc"
  ],
  [
   913.4,
   1042.1,
   1.5,
   1.1131996284761778,
   "#9ff2dc"
  ],
  [
   1305.4,
   1037.7,
   1.5,
   1.0425214438715378,
   "#9ff2dc"
  ],
  [
   1292.2,
   1051.9,
   1.5,
   1.0425214438715378,
   "#9ff2dc"
  ],
  [
   1291.1,
   1059.4,
   1.5,
   1.0425214438715378,
   "#9ff2dc"
  ],
  [
   1278.6,
   1039.8,
   1.5,
   1.13162578160604,
   "#9ff2dc"
  ],
  [
   1271.7,
   1058.9,
   1.5,
   1.13162578160604,
   "#9ff2dc"
  ],
  [
   1349.0,
   1033.5,
   1.5,
   3.2,
   "#9ff2dc"
  ],
  [
   1351.8,
   1045.6,
   1.5,
   3.0,
   "#9ff2dc"
  ],
  [
   1315.1,
   1050.9,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   1297.0,
   1036.0,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   1284.0,
   1053.6,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   1283.9,
   1036.9,
   1.5,
   2.9,
   "#9ff2dc"
  ],
  [
   88.1,
   240.5,
   1,
   1.1,
   "#d8fff4"
  ],
  [
   201.0,
   246.2,
   1,
   0.4411721365560768,
   "#d8fff4"
  ],
  [
   204.1,
   246.2,
   1,
   0.5179285063721525,
   "#d8fff4"
  ],
  [
   209.1,
   246.8,
   1,
   0.5077596167085668,
   "#d8fff4"
  ],
  [
   195.6,
   249.9,
   1,
   0.5077596167085668,
   "#d8fff4"
  ],
  [
   394.1,
   439.2,
   1,
   0.4883865112265471,
   "#d8fff4"
  ],
  [
   585.5,
   504.7,
   1,
   0.4768032376080489,
   "#d8fff4"
  ],
  [
   572.5,
   501.1,
   1,
   0.4768032376080489,
   "#d8fff4"
  ],
  [
   586.6,
   497.9,
   1,
   1.6,
   "#d8fff4"
  ],
  [
   765.8,
   164.2,
   1,
   0.43364924507025226,
   "#d8fff4"
  ],
  [
   768.5,
   161.1,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   751.6,
   160.0,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   171.4,
   760.9,
   1,
   0.3990769144479122,
   "#d8fff4"
  ],
  [
   165.3,
   751.3,
   1,
   0.3990769144479122,
   "#d8fff4"
  ],
  [
   140.9,
   746.3,
   1,
   0.6,
   "#d8fff4"
  ],
  [
   188.5,
   754.7,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   179.5,
   748.9,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   168.0,
   754.4,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   129.8,
   751.3,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   119.5,
   754.3,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   664.5,
   503.4,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   652.7,
   501.9,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   633.0,
   495.4,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   618.6,
   500.0,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   613.0,
   504.3,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   676.0,
   504.5,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   663.1,
   495.6,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   657.8,
   501.0,
   1,
   0.5,
   "#d8fff4"
  ]
 ],
 "drips": [
  [
   424,
   16,
   768,
   1.2
  ]
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 328.0,
   "y": 768,
   "f": 1
  },
  {
   "kind": "can",
   "x": 680.0,
   "y": 768,
   "f": -1
  },
  {
   "kind": "gum",
   "x": 824.0,
   "y": 640,
   "f": -1
  },
  {
   "kind": "spinner",
   "x": 520.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "dewlash",
   "x": 152.0,
   "y": 768,
   "f": 1
  },
  {
   "kind": "dewlash",
   "x": 648.0,
   "y": 512,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   25,
   26,
   27,
   78,
   79,
   80,
   81,
   82,
   131,
   132,
   136,
   170,
   171,
   172,
   183,
   184,
   185,
   191,
   192,
   193,
   204,
   205,
   223,
   226,
   227,
   228,
   233,
   234,
   235,
   236,
   237,
   247,
   248,
   249,
   255,
   256,
   257,
   258,
   259,
   260,
   276,
   282,
   283,
   284,
   285,
   286,
   287,
   304,
   305,
   306,
   307,
   308,
   309,
   314,
   315,
   329,
   330,
   340,
   370,
   371,
   382,
   425,
   436,
   479,
   490,
   544,
   641,
   695,
   749,
   803,
   817,
   818,
   819,
   820,
   821,
   857,
   875,
   876,
   911,
   912,
   927,
   928,
   967,
   978,
   979,
   980,
   1021,
   1030,
   1031,
   1032,
   1076,
   1084,
   1129,
   1137,
   1138,
   1184,
   1191,
   1192,
   1246,
   1301,
   1345,
   1355,
   1356,
   1400,
   1410,
   1454,
   1518,
   1572,
   1626,
   1679,
   1680,
   1719,
   1720,
   1721,
   1722,
   1723,
   1724,
   1772,
   1785,
   1826,
   1827,
   1881,
   1882,
   1894,
   1936,
   1937,
   1949,
   1991,
   1992,
   1993,
   2003,
   2047,
   2057,
   2102,
   2111,
   2157,
   2158,
   2159,
   2165,
   2218,
   2272,
   2313,
   2314,
   2325,
   2351,
   2352,
   2353,
   2354,
   2366,
   2379,
   2404,
   2409,
   2420,
   2421,
   2423,
   2424,
   2425,
   2458,
   2512,
   2518,
   2541,
   2542,
   2543,
   2544,
   2545,
   2546,
   2547,
   2548,
   2549,
   2550,
   2551,
   2552,
   2553,
   2554,
   2555,
   2557,
   2558,
   2559,
   2560,
   2561,
   2562,
   2564,
   2565,
   2566,
   2572,
   2573,
   2574,
   2575,
   2576,
   2577,
   2578,
   2579,
   2580,
   2581,
   2582
  ],
  "bits": "///////////////////////////////8//j/8P/w/+D//////////////////////////x//D/8P/w//D/8P/v///////////////////////////////////////wf//////////////////////v/8//z/+P/w/+D/wP+A/gD/gP4A+ADwAOAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8A/wB/AB8ADwADAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//f/9//39/Pn8OfwR/AH8Af//////////////////////////////////+//7//v/+/gD+APwA+ADwAOAAwACAAIAAAAAAAAAAAAAAAAAAAAAAfwB/AD8ADwAHAAcABwADAAMAAwABAAEAAAAAAAAAAP////////////////////////////////////////AD//////////////////////////f/8//j/8P/g//B+AD///////////////////////////////////////8f////////////////////////////////8//z//H/8P/w////////////////////////////////7//n/8P/AAD//v/+//z//P/8//z//P/4//j/8P/w//D/4P/g/8AGAP///////////////3//f/9//z//H/8f/w//D/8H/wB////////////////////////////////////////4/4D///////////////////////////////////////8f//////////////////////////////////////////+A////////////////////////////////////////f////v4A8ADgAMAAwACAAIAAAAAAAAAAgACAAIAAgAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9//wA/AA8AAwADAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//f/9//3//P/8f/w//B/8Af//////////////////+//7//v/8//z/+P/w/8D/gP4A////8P/A+ADAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//HB8ADwAHAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAA/////////////3//P/8//x//Bf8A/wB/AH8APwA/AD//////////////////////////////////////////8P////////////////////7//v/+/+D8APAA4ADgAAAA//////8A8ADAAMAAgAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8B/wA/AB8AHwAPAA8ADwAPAAcABwADAAMAAQABAAH////+//7//v/+//7//P/8//z/+P/w//D/4P/g/8D+AAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8P/wA/AA8ABwADAAEAAAAAAAAAAAAAAAAAAAAAAAD/////////////f/9//3//f/9//3//P/8f/w//B/8Afv/////////////////////////////x/+H/wMfABwAH///////+//7//v/+//z//P/8//z/+P/4//j/8P/g/gD8APgA8ADgAMAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAP//Bz8ADwAHAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////f/9//3//P/8//x//D/8D/wH/AD//////////////////////////9//z/+P/4f/B/8DAAP//////////////////9//z/+P/4ffh48HDwAMAAQAA///////////////+//7//P/8//j/+P/g/8D/AP4AOAD/APgA8ADgAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////f/9//3//P/8//x//D/8P/wP/AP8AfwAfAA/////w/8D4APAA4ADAAIAAgACAAIAAgACAAIAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wB/AD8AHwAPAAcAAwADAAEAAAAAAAAAAAAAAAAAAP///////////////////////////////////////3/////////+//7//v/+//7//v/+//7//P/4//D/4P/A/gB//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9///8A/wD+APwA+ADwAOAAwADAAIAAgACAAIAAgACAAIAAf/9//3//f/9///////9//3//f/9//z//H/8P/wf/AH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAD/8//3//f////////////////////////////////////3//f/////////////////////////////////////////////////////////////////9//3//f/9//3//f/9//3//f/9//3//P/8//z//H/8f/w//B/8D/wH/AH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/D/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADwAP4AAH8APwAfAA8ADwAHAAcAAwADAAEAAQADAAMAAwADAAH//////////////////////////////////////8DAAP/w//z//v/+//////////7//v/+//7//P/4//AAAAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////3//P/8//x//H/8P/wf/Af8AfwAfAAcAAP////////////////////7/+P/g/8D/gP8A/ADwAOAA//z/8P/g/wDwAMAAgAAAAAAAAAAAAAAAAAAAAAAAAAAH/wH/AD8ADwAPAAcABwAHAAMAAwADAAMAAwADAAMAA//////////////////////////////////////////5//////////////////7//v/8//j/+P/w/+D/gP8A8AD/+PwA8ADgAMAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEAAQABAAEAAQABAAEAAQABAAEAAAAAAAAAAAAA//////////////////////////////////////////D////////////////////+//7//v/+//z/+P/w/4AAAP/A/wD+APwA+ADwAPAA4AAAAAAAAAAAAAAAAAAAAAAA////////////////////////f/9//3//f///////////gPwA+ADwAOAA4ADAAMAAwADAAMAAwADAAMAAwACAAAAAAAAAAAAAAAAAAQABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////7//v/+//////////6AAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////3//f/9//3//f/9///////////////7//v/+//7//v/+//////////////////////////8AAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAACAAIAAwADgAPAA8AD8AP4A/wD/gP/g//D//P/+//7//////////////////////////v/8//wAAAABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8//z//P/8//7//v//////////////////////////AAAAAAAAAAAAAMAA4ADgAPAA/AD+AP4A/4D/4P/w//D///////9//3//f/9//3//f/8//z//H/8f/w//A/8Af//w//z//v/+////////////////////////////////AD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7///////7//v/+//7//v/+//7//P/4/+D/gP4A/gD8APAA8ADgAMAAgACAAIAAgACAAIAAgACAAIAAgAD////////////////////+//7//v/8//j/8P/g4AAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAPAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP/g//7/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP/4D/8//3//f/////////9//3//f/9//z//H/8P/wA/AD/////////////+//7//v/+//z//P/+//7//v/+/////wA/AB8AHwAPAAcABwADAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//f/9//x//B/8B/wB/AD8APwAfAA8ADwAHAAcAAwAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//3//f/8//x//D/8H/wB///D//P/+//7///////////////////////////////8A/wD/AH8APwAfAAMAAQAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//3//P/8f/w//B/8A/wAfAAAAAIAAgADAAOAA4AD4APwA/gD/AP+A/8D/8P/4//gAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//f/8B/wD/AD8AAwAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////f/8//x//D/8P/w//D/8H/wf/AH//8P/8//7//v///////////////////////////////wB/AD8AHwAPAA8ABwAHAAMAAQABAAEAAAAAAAAAAAAA/////////////v/+//7//v/+//7//v/+//7///////////////////////////////////////9//////////////////////////v/+//z//P/4//D/8P/g/8D/AP4A////////////////////////////////////////7/j///////////////////////////////////////8f//////////////////////////////////////////wA/gD+APwA/AD4APgA8ADgAOAAwADAAIAAgACAAIAAgAD//////////////////v/+//7//P/8//j/+P/w/8D+APwA+ADwAOAAwADAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAPAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8A/+D/+P/+//7//v/+//7//v/+//7//v/+//7//P/4/8D/APwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABwAfAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/D//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADgAPwA/wAP/z//f/9//////////3//f/9//3//P/8f/w//Af8Af8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8//3//f/////////////////////////9//3//f///8P/8//7//v///////////////////////////////wA/AB8ADwAHAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//z//H/8H/wP/Af8AfwA/AB/////////////////////////////////////////+AP///////////////////////////////////////wD//////////////////////////////////////////99//3//////////////////f/9//3//f/9//3//f/8//z//P/8//3//f///////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8H/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/H/////////8AAAAAAAAAAAAAAAAAAAAAAAAAADwA//j//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAA/AD/8P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8P/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/8P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/D///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/H/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD/8P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/wP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAD8f/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPx//////////AAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////wAAAAAAAAAAAAAAAAAAAAAAAAAA/8D//P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD8AP/A//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAEAAwADAAcADwA/AH8B/4f///9///////////////////////////////////////8AAIAAwADgAOAA8ADwAPgA/AD+AP8A/4D/wP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwHz//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+HwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAf////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP//"
 }
});
