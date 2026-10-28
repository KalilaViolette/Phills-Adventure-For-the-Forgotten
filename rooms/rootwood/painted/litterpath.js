// litterpath: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "litterpath",
 "region": "rootwood",
 "w": 90,
 "h": 24,
 "music": "rootwood",
 "viewBottom": 384,
 "art": {
  "main": "art/rootwood/painted/litterpath.png#main",
  "pack": "art/rootwood/painted/litterpath.png",
  "parts": {
   "main": [
    0,
    0,
    1440,
    384
   ],
   "L0": [
    0,
    384,
    1444,
    522
   ],
   "L1": [
    0,
    906,
    1444,
    493
   ],
   "L2": [
    0,
    1399,
    1444,
    464
   ],
   "L3": [
    0,
    1863,
    1659,
    445
   ],
   "front": [
    0,
    2308,
    1025,
    92
   ],
   "piece_time_0_dawn": [
    0,
    2400,
    1440,
    384
   ],
   "piece_time_0_dusk": [
    0,
    2784,
    1440,
    384
   ],
   "piece_time_0_night": [
    0,
    3168,
    1440,
    384
   ],
   "piece_reveal_log_near_side": [
    0,
    3552,
    180,
    56
   ],
   "piece_plant_leaf_tide_plant_01": [
    0,
    3608,
    29,
    18
   ],
   "piece_plant_leaf_tide_plant_02": [
    0,
    3626,
    23,
    16
   ],
   "piece_plant_leaf_tide_plant_03": [
    0,
    3642,
    25,
    17
   ],
   "piece_plant_leaf_tide_plant_04": [
    0,
    3659,
    27,
    18
   ],
   "piece_plant_leaf_tide_plant_05": [
    0,
    3677,
    28,
    17
   ],
   "piece_plant_leaf_tide_plant_06": [
    0,
    3694,
    30,
    28
   ],
   "piece_plant_leaf_tide_plant_07": [
    0,
    3722,
    28,
    24
   ],
   "piece_plant_leaf_tide_plant_08": [
    0,
    3746,
    24,
    28
   ],
   "piece_glow_0": [
    0,
    3774,
    196,
    99
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/painted/litterpath.png#L0",
    "f": 0.3,
    "times": {
     "dawn": "art/rootwood/painted/litterpath.png#piece_time_0_dawn",
     "dusk": "art/rootwood/painted/litterpath.png#piece_time_0_dusk",
     "night": "art/rootwood/painted/litterpath.png#piece_time_0_night"
    }
   },
   {
    "src": "art/rootwood/painted/litterpath.png#L1",
    "f": 0.45
   },
   {
    "src": "art/rootwood/painted/litterpath.png#L2",
    "f": 0.6
   },
   {
    "src": "art/rootwood/painted/litterpath.png#L3",
    "f": 1.15
   }
  ],
  "front": "art/rootwood/painted/litterpath.png#front",
  "frontAt": [
   200,
   196
  ],
  "pieces": {
   "time_0_dawn": [
    0,
    0,
    1440,
    384
   ],
   "time_0_dusk": [
    0,
    0,
    1440,
    384
   ],
   "time_0_night": [
    0,
    0,
    1440,
    384
   ],
   "reveal_log_near_side": [
    788,
    236,
    180,
    56
   ],
   "plant_leaf_tide_plant_01": [
    216,
    268,
    29,
    18
   ],
   "plant_leaf_tide_plant_02": [
    554,
    117,
    23,
    16
   ],
   "plant_leaf_tide_plant_03": [
    694,
    188,
    25,
    17
   ],
   "plant_leaf_tide_plant_04": [
    1107,
    265,
    27,
    18
   ],
   "plant_leaf_tide_plant_05": [
    1206,
    257,
    28,
    17
   ],
   "plant_leaf_tide_plant_06": [
    315,
    209,
    30,
    28
   ],
   "plant_leaf_tide_plant_07": [
    636,
    183,
    28,
    24
   ],
   "plant_leaf_tide_plant_08": [
    1176,
    240,
    24,
    28
   ],
   "glow_0": [
    367,
    44,
    196,
    99
   ]
  },
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
   "a": 224,
   "b": 288,
   "to": "hollow",
   "toDoor": "litter",
   "x": 24.0,
   "y": 288,
   "f": 1
  },
  {
   "id": "down",
   "edge": "bottom",
   "a": 1280,
   "b": 1376,
   "to": "bramble",
   "toDoor": "up",
   "x": 1312,
   "y": 352,
   "f": 1,
   "keepX": true,
   "falling": true
  },
  {
   "id": "bough",
   "edge": "top",
   "a": 416,
   "b": 512,
   "to": "lowbough",
   "toDoor": "drop",
   "x": 456.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "acorn_lp7",
   "x": 120,
   "y": 289,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp11",
   "x": 176,
   "y": 288,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp28",
   "x": 456,
   "y": 196,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp54",
   "x": 872,
   "y": 288,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp59",
   "x": 956,
   "y": 198,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp74",
   "x": 1196,
   "y": 265,
   "kind": "acorn"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  ".......................##.......##........................................................",
  ".......................##.......##........................................................",
  ".......................##.......##........................................................",
  ".......................##.......##........................................................",
  ".......................##.......##........................................................",
  ".......................##.......##........................................................",
  ".......................##.......###.......................................................",
  ".......................###......###.......................................................",
  ".......................###......###.......................................................",
  "###.......................................................................................",
  "#####.....................................................................................",
  "#####.....................................................................................",
  "######...................#########.......###...............##.............................",
  "######................########################....###########.............................",
  ".....................##########################..############.............................",
  "...................##########################################..........................###",
  ".................##################################......................#............####",
  "...............####################################.............^^^^..#########.......####",
  "################################################################################......####",
  "################################################################################......####",
  "################################################################################......####",
  "################################################################################......####",
  "################################################################################......####",
  "################################################################################......####"
 ],
 "mapAt": [
  152,
  68
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.25,
  "lights": []
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "ramps": [
  [
   [
    976,
    227
   ],
   [
    977,
    227
   ],
   [
    978,
    226
   ],
   [
    979,
    227
   ],
   [
    980,
    227
   ],
   [
    981,
    227
   ],
   [
    982,
    227
   ],
   [
    983,
    227
   ],
   [
    984,
    227
   ],
   [
    985,
    227
   ],
   [
    986,
    227
   ],
   [
    987,
    227
   ],
   [
    988,
    227
   ],
   [
    989,
    227
   ],
   [
    990,
    228
   ],
   [
    991,
    228
   ],
   [
    992,
    228
   ],
   [
    993,
    228
   ],
   [
    994,
    228
   ],
   [
    995,
    228
   ],
   [
    996,
    228
   ],
   [
    997,
    228
   ],
   [
    998,
    228
   ],
   [
    999,
    228
   ],
   [
    1000,
    228
   ],
   [
    1001,
    229
   ],
   [
    1002,
    231
   ]
  ],
  [
   [
    990,
    255
   ],
   [
    991,
    255
   ],
   [
    992,
    254
   ],
   [
    993,
    255
   ],
   [
    994,
    255
   ],
   [
    995,
    255
   ],
   [
    996,
    255
   ],
   [
    997,
    255
   ],
   [
    998,
    255
   ],
   [
    999,
    255
   ],
   [
    1000,
    255
   ],
   [
    1001,
    255
   ],
   [
    1002,
    255
   ],
   [
    1003,
    255
   ],
   [
    1004,
    255
   ],
   [
    1005,
    255
   ],
   [
    1006,
    255
   ],
   [
    1007,
    256
   ],
   [
    1008,
    256
   ],
   [
    1009,
    256
   ],
   [
    1010,
    256
   ],
   [
    1011,
    256
   ],
   [
    1012,
    256
   ],
   [
    1013,
    256
   ],
   [
    1014,
    256
   ],
   [
    1015,
    256
   ],
   [
    1016,
    256
   ],
   [
    1017,
    256
   ],
   [
    1018,
    256
   ],
   [
    1019,
    256
   ],
   [
    1020,
    256
   ],
   [
    1021,
    257
   ],
   [
    1022,
    259
   ]
  ]
 ],
 "tock": {
  "x": 456,
  "y": 196,
  "caps": [
   404,
   520,
   546
  ],
  "key": {
   "x": 600,
   "y": 212
  }
 },
 "wildlife": [
  {
   "kind": "deer",
   "at": "L2",
   "x0": 128,
   "x1": 992,
   "y": 245
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 32,
   "x1": 200,
   "y": 289
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 800,
   "x1": 970,
   "y": 205,
   "every": [
    10,
    25
   ]
  },
  {
   "kind": "beetle",
   "at": "back",
   "x0": 810,
   "x1": 960,
   "y": 205
  }
 ],
 "outside": true,
 "reveals": [
  [
   "reveal_log_near_side",
   [
    806,
    250,
    978,
    292
   ]
  ]
 ],
 "plants": [
  [
   "plant_leaf_tide_plant_01",
   -1,
   230,
   285,
   1.0,
   0.72,
   4.0,
   0.0
  ],
  [
   "plant_leaf_tide_plant_02",
   -1,
   565,
   132,
   1.5,
   1.07,
   4.0,
   1.7
  ],
  [
   "plant_leaf_tide_plant_03",
   -1,
   706,
   205,
   0.8,
   0.86,
   4.0,
   3.4
  ],
  [
   "plant_leaf_tide_plant_04",
   -1,
   1120,
   282,
   1.2,
   1.22,
   4.0,
   5.1
  ],
  [
   "plant_leaf_tide_plant_05",
   -1,
   1220,
   273,
   1.0,
   0.63,
   4.0,
   0.52
  ],
  [
   "plant_leaf_tide_plant_06",
   1,
   330,
   237,
   0.7,
   0.95,
   2.0,
   2.22
  ],
  [
   "plant_leaf_tide_plant_07",
   1,
   650,
   206,
   1.4,
   0.8,
   2.0,
   3.92
  ],
  [
   "plant_leaf_tide_plant_08",
   1,
   1188,
   267,
   0.9,
   1.15,
   2.0,
   5.62
  ]
 ],
 "glow": [
  [
   "glow_0",
   0.06,
   0.6,
   0.0,
   "back",
   [
    "night"
   ]
  ]
 ],
 "noGrab": [
  [
   1272,
   286,
   1284,
   298
  ]
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 604,
   "y": 214,
   "f": -1
  },
  {
   "kind": "cap",
   "x": 880,
   "y": 204,
   "f": 1
  },
  {
   "kind": "can",
   "x": 1162,
   "y": 263,
   "f": -1,
   "beat": "soldierDown"
  }
 ],
 "detail": {
  "tiles": [
   23,
   25,
   32,
   34,
   113,
   115,
   122,
   124,
   203,
   205,
   212,
   214,
   293,
   295,
   302,
   304,
   383,
   385,
   392,
   394,
   473,
   475,
   482,
   484,
   562,
   565,
   572,
   574,
   652,
   655,
   662,
   664,
   665,
   743,
   744,
   745,
   752,
   753,
   754,
   755,
   810,
   811,
   812,
   813,
   834,
   835,
   842,
   843,
   904,
   905,
   995,
   1085,
   1086,
   1103,
   1104,
   1105,
   1106,
   1107,
   1108,
   1109,
   1110,
   1111,
   1112,
   1113,
   1114,
   1115,
   1120,
   1121,
   1122,
   1123,
   1124,
   1132,
   1133,
   1134,
   1135,
   1136,
   1137,
   1138,
   1139,
   1140,
   1141,
   1170,
   1171,
   1172,
   1173,
   1174,
   1175,
   1176,
   1177,
   1191,
   1192,
   1193,
   1206,
   1207,
   1208,
   1209,
   1214,
   1215,
   1216,
   1219,
   1220,
   1221,
   1230,
   1231,
   1279,
   1280,
   1281,
   1306,
   1307,
   1308,
   1309,
   1320,
   1321,
   1348,
   1349,
   1368,
   1369,
   1397,
   1398,
   1410,
   1411,
   1436,
   1437,
   1456,
   1457,
   1458,
   1490,
   1510,
   1511,
   1512,
   1513,
   1514,
   1515,
   1526,
   1541,
   1542,
   1543,
   1544,
   1545,
   1546,
   1580,
   1598,
   1599,
   1600,
   1606,
   1607,
   1608,
   1609,
   1616,
   1623,
   1624,
   1625,
   1626,
   1627,
   1628,
   1699,
   1706,
   1789,
   1879,
   1886,
   1969,
   1976,
   2059,
   2066,
   2149,
   2156
  ],
  "bits": "D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4AA//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P//gA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgAD/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4AA//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P//gA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgAD/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4AA//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8f//gA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgAD/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD8AB//H/8f/x//H/8//z//P/8//3//f/9//3//////////+AD4APgA+AD4APgA+AD4APwA/AD8APwA/AD8APwA/AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P//wA/AD8APwA/AD+AP4A/gD+AP4A/wD/AP8A/wD/gP+AAAEAAQABAAMAAwAHAAcABwAPAA8AHwAfAB8APwA/AH/8APwA/AD8APwA/gD+AP4A/gD+AP4A/gD+AP4A/gD+AA//D/8P/w//D/8f/x//H/8f/x//H/8f/x//H/8f/x///4D/wP/A/8D/4P/g/+D/8P/w//j/+P/4//z//P/+//4AfwD/AP8A/wB/AH8APwA/AA8ABwAHAAcABwADAAEAAP8A/wD/AP8A/wD/AP8A/wD/AP+A/4D/gP+A/4D/gP+AH/8f/x//H/8f/x//H/8f/x//H/8f/x//H/8f/x//H////v///////////////////////////////////////wAAAAAAAIAAgADAAMAA4ADgAOAA8ADwAPgA+AD8APwAf/8//x//H/8P/w//D/8P/wf/A/8D/wP/A/8D/wAAAAD/////////////////////////////////////f/8D//+A/8D/wP/A/8D/wP/A/8D/wP/g/+D/4P/g/+D/4P/gH/8//z//P/8//z//P/8//z//P/8//z//P/8//z//P/////////////////////////////////////////j/gP////////////////////////////////+A4AAAAAAA/gD+AP8A/wD/gP+A/8D/wP/g/+D/+MAYAAgAAAAAAAAAAAAAAAAAeAf/P////////////////////////////wAAAAAAAP//////////////////////////////////AAAAAAAA8AD/IP/8//////////////////////////8AAAAAAAAAAAAAAAAAAMAA8AD8APwA/wD/wP/w//z//gA/AAcAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+D/4P/gf+Af4AfgAeAA4AAgAAAAAAAAAAAAAAAAAAA//z//P/8//D/wP8A+ADgAIAAAAAAAAAAAAAAAAAAAAPwA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADAAPAA+AD8AP4A/4D/wP/g//D/+P/8//7///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAMAAwADgAPAA+AD8APwA/gD/AP8A/4D/wP/g/+D/8P/4//j//P/+//7///////////////////////////////8AAAAAAAAAAAAAgACAAMAA4ADwAPAA+AD8APwA/gD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAB8A/wP/AAAAAAAAAAAAAAAAAAAADwB/A/8f//////////////8AAAAAAAAAAAAAAAd//////////////////////////wAAAAAAAAAAAAD/////////////////////////////AAAAAAAAAAA///////////////////////////////8AAAAAAAAAAP///////////////////////////////wAAAAAAAAAA////////////////////////////////AAAAAAAAAAD///////////////////////////////8AAAAAAAAAAOAA/////////////////////////////wAAAAAAAAAAAAD/z///////////////////////////AAAAAAAAAAAAAN5w//////////////////////////8AAAAAAAAAAAAAAAAAAPgA/4D/+P/8/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP4A/+D/8P/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAPAH8A/wP/H/8AAAAAAAAAAAAAAAAAAwB/A/8//////////////////wAAAAAAAAAAAAAAAP//////////////////////////AAAAAAAAAAAAAAAAAAD/gP/+//////////////////8AAAAAAAAAAAAAAAAAAAAAQADwAPwA/wD/wP/g//D/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAHP////////////wAAAAAAAAAAAAAAAAAAAAEB/3//////////////////AAAAAAAAAAAAAAAAAAP///////////////////////8AAAAAAAAAAAAAAAD/4P/4//z//////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAgADAAMAA4ADgAOAA////////////////////////////////////////AAD///////////////////////////////////////8AAP///////////////////////////////////////wAA//////////////////////////////////////gAAAD/////////////////////////////////4IAAAAAAAP/////////////////////////w/ACAAAAAAAAAAAAA/4D/wP/g//D/+P/8//////4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAA8AHwB/AAAAAAAAAAAAAQAHAB8AfwH/F/9///////////////8P/x//f////////////////////////////////////8AA+AD/gP/8////////////////////////////////AAAAAAAAAADAAOAA/wD///////////////////////8AAAAAAAAAAAAPAP8//////////////////////////wATAf8f//////////////////////////////////////7///////////////////////////////////////8AAAAA4AD4APwA/gD/gP/A/+D/8P/4//z//v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAOAAAAAAAAAAAAAAAAAPAP8A/wD/AP8B/wP/B/8H/w//D/8AAAAAA/8f/////////////////////////////////wB////////////////////////////////////////////////////////////////+//j//P/+///////////gAMAAwADAAMAAwADAAAAAAAAAAAAAAACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABAAMABwAfAD8A/wf/H/8///////8B/wf/D/8///////////////////////////////////AA+AD8AP8A/4D/4P/w//z/////////////////////AAAAAAAAAAAAAAAAAAAAAAAAgADgAPgA/gD/gP/g//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAx//H/8//z//f/9//3/////////////////////////////////////////////////+//j/8P/g//D/+P/8//6AAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAB8B/2//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/w//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAQADAA8APwB/Af8H/wAHAA8APwD/Af8H/w//P/9///////////////////////7///////////////////////////////////////8AA8AD+AP/A//z//////////////////////////////////////////////////////////7//P/4//j/8P/AAACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQADAAcADwAPAB8AHwADAD8B/wH/A/8P/x//P///////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMADwA/AP8AAAAAAAAAAwAPAD8AfwH/B/8f/z///////////////x//P/////////////////////////////////////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAADAP8D/x//P///////AAAAAAAAAAAAAAAAAAAAAQAHz/////////////////8AAAAAAAAAAAAAAAAAAP/+/////////////////////wAAAAAAAAAAAAAAAAAAAADgAP4A/8D//P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADwAP8A//gAPwA/AH8AfwD/AP8B/wH/A/8D/wP/A/8H/wf/B/8P/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfD////wAAAAAAAAAAAAAAAAAAAAAAAAAHAD8Af+f/////////AAAAAAAAAAEABwA/Af8P//////////////////////8D/w//P//////////////////////////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAB8AAAAAAAAAAAAAAAAAAAAAAAEAAwAPAH8D/x///////wAHAB8APwB/AP8D/w//P///////////////////////8AD/4P////////////////////////////////////8AAAAAwAD/gP///////////////////////////////wAAAAAAAAAAAACAAPgA/+D//v//////////////////AAAAAAAAAAAAAAAAAAAAAAAAwADwAPwA/gD/gP/A/+AP/w//D/8f/x//H/8f/x//H/8//z//P/8//z//P/8///8A////////////////////////////////////////AADgAP/g//////////////////////////////////8AAAABAD///////////////////////////////////wAA/wH/////////////////////////////////////AAD///////////////////////////////////////8AB//////////////////////////////////////////w//j//P/+////////////////////////////////P/9//3//f/9//3//f/9//3//f/9//3//f/9//3///////////////v/+//7//v/8//z//P/8//z/+P/4//j/+P/w//D/8P/w//D/8P/g/+D/4P/g/+D/4P/g/+D/wP/A/////////////////////3//f/9//3//P/8//z//P///wP/A/8D/wP/A/4D/gP+A/4D/gP+A/4D/gP+A/8D/wB//H/8f/w//D/8P/w//B/8H/wf/B/8H/wf/B/8H/wf//8D/wP/A/8D/wP/A/8D/wP/A/+D/4P/g/+D/4P/g/+AH/wf/A/8D/wP/A/8D/wP/A/8D/wP/A/8D/wf/B/8H///w//D/8P/w//j/+P/4//z//P/8//z//v/+//7//v//B/8P/w//D/8P/w//H/8f/x//H/8//z//f/9//3////8="
 }
});
