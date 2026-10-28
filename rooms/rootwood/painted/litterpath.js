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
    503
   ],
   "piece_reveal_log_near_side": [
    0,
    887,
    179,
    53
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/painted/litterpath.png#L0",
    "f": 0.4
   }
  ],
  "pieces": {
   "reveal_log_near_side": [
    788,
    236,
    179,
    53
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
  "......................####......###.......................................................",
  "......................####......###.......................................................",
  "###.......................................................................................",
  "#####.....................................................................................",
  "#####.....................................................................................",
  "######...................#########.......###...............##.............................",
  "######................########################...############.............................",
  ".....................##########################..############.............................",
  "...................##########################################.........................####",
  ".................##################################......................#............####",
  "...............####################################.............^^^^..##########......####",
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
  "a": 0.06,
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
 "noGrab": [
  [
   1272,
   274,
   1284,
   286
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
   741,
   742,
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
   831,
   832,
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
   1231,
   1279,
   1280,
   1281,
   1306,
   1307,
   1309,
   1321,
   1347,
   1348,
   1349,
   1368,
   1369,
   1397,
   1398,
   1399,
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
   1623,
   1624,
   1625,
   1626,
   1627,
   1628
  ],
  "bits": "D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4AA//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P//gA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgAD/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4AA//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P//gA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgAD/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4AA//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8f//gA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgAD/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D//4APgA+AD4APgA+AD4APgA+AD4APgA+AD4APgA+AD8AB//H/8f/x//H/8//z//P/8//3//f/9//3//////////+AD4APgA+AD4APgA+AD4APwA/AD8APwA/AD8APwA/AAP/w//D/8P/w//D/8P/w//D/8P/w//D/8P/w//D/8P//wA/AD8APwA/AD+AP4A/gD+AP4A/wD/AP8A/wD/gP+AAAEAAQABAAMAAwAHAAcABwAPAA8AHwAfAB8APwA/AH/8APwA/AD8APwA/gD+AP4A/gD+AP4A/gD+AP4A/gD+AA//D/8P/w//D/8f/x//H/8f/x//H/8f/x//H/8f/x///4D/wP/A/8D/4P/g/+D/8P/w//j/+P/4//z//P/+//4AfwD/AP8B/wH/A/8D/wf/B/8P/w//H/8f/z//P/9///8A/wD/AP8A/wD/AP8A/wD/AP+A/4D/gP+A/4D/gP+AH/8f/x//H/8f/x//H/8f/x//H/8f/x//H/8f/x//H////v///////////////////////////////////////wAAAAAAAIAAgADAAMAA4ADgAOAA8ADwAPgA+AD8APwAAAAAAAAAAAEAAwADAAcABwAPAA8AHwAfAD8APwA/AD9//////////////////////////////////////////v/////////////////////////////////////wAAAA/////////////////////////////////////3//A///gP/A/8D/wP/A/8D/wP/A/8D/4P/g/+D/4P/g/+D/4B//P/8//z//P/8//z//P/8//z//P/8//z//P/8//z/////////////////////////////////////////4/4D/////////////////////////////////gOAAAAAAAP4A/gD/AP8A/4D/gP/A/8D/4P/g//jAGAAIAAAAAAAAAAAAAAAAAHgH/z////////////////////////////8AAAAAAAD//////////////////////////////////wAAAAAAAPAA/yD//P//////////////////////////AAAAAAAAAAAAAAAAAADAAPAA/AD8AP8A/8D/8P/8//4APwA/AD8APwA/AD8APAA4ACAAAAAAAAAAAAAAAAAAAP/g/wD8APAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8ABwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P/g/+B/4B/gB+AB4ADgACAAAAAAAAAAAAAAAAAAAD//P/8//z/8P/A/wD4AOAAgAAAAAAAAAAAAAAAAAAAA/ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAMAA8AD4APwA/gD/gP/A/+D/8P/4//z//v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAwADAAOAA8AD4APwA/AD+AP8A/wD/gP/A/+D/4P/w//j/+P/8//7//v///////////////////////////////wAAAAAAAAAAAACAAIAAwADgAPAA8AD4APwA/AD+AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAHwD/A/8AAAAAAAAAAAAAAAAAAAAPAH8D/x///////////////wAAAAAAAAAAAAAAB3//////////////////////////AAAAAAAAAAAAAP////////////////////////////8AAAAAAAAAAD///////////////////////////////wAAAAAAAAAA////////////////////////////////AAAAAAAAAAD///////////////////////////////8AAAAAAAAAAP///////////////////////////////wAAAAAAAAAA4AD/////////////////////////////AAAAAAAAAAAAAP/P//////////////////////////8AAAAAAAAAAAAA3nD//////////////////////////wAAAAAAAAAAAAAAAAAA+AD/gP/4//z/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/gD/4P/w//wAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA8AfwD/A/8f/wAAAAAAAAAAAAAAAAADAH8D/z//////////////////AAAAAAAAAAAAAAAA//////////////////////////8AAAAAAAAAAAAAAAAAAP+A//7//////////////////wAAAAAAAAAAAAAAAAAAAABAAPAA/AD/AP/A/+D/8P/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgH//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADn/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAc/////////////AAAAAAAAAAAAAAAAAAAAAQH/f/////////////////8AAAAAAAAAAAAAAAAAA////////////////////////wAAAAAAAAAAAAAAf///////////////////////////AAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAIAAgAD///////////////////////////////////////8AAP///////////////////////////////////////wAA////////////////////////////////////////AAD/////////////////////////////////////+AAAAP/////////////////////////////////ggAAAAAAA//////////////////////////D8AIAAAAAAAAAAAAD/gP/A/+D/8P/4//z//////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMADwAfAH8AAAAAAAAAAAABAAcAHwB/Af8X/3///////////////w//H/9/////////////////////////////////////wAD4AP+A//z///////////////////////////////8AAAAAAAAAAMAA4AD/AP///////////////////////wAAAAAAAAAAAA8A/z//////////////////////////ABMB/x///////////////////////////////////////v///////////////////////////////////////wAAAADgAPgA/AD+AP+A/8D/4P/w//j//P/+////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA4AAAAAAAAAAAAAAfAf8//z//P/8//z//P/8//z//P/8//wAAAAAAB///////////////////////////////////AH////////////////////////////////////////+AAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABAAMABwAfAD8A/wf/H/8///////8B/wf/D/8///////////////////////////////////AA+AD8AP8A/4D/4P/w//z/////////////////////AAAAAAAAAAAAAAAAAAAAAAAAgADgAPgA/gD/gP/g//g//z//P/8//z//P/8//z//P/8//z//P/8//z//P/8//4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAB/AH8f/x///////wAAAAAAAAAAAAAAAAAAAAAAAAAA/wD/+P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAEAAwAPAD8AfwH/B/8ABwAPAD8A/wH/B/8P/z//f//////////////////////+////////////////////////////////////////AADAAPgA/wD/8P////////////////////////////8//z//P/8//z//P/////////////////////////////////////////////////////////7//P/4//j/8P/AgACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAACAA8ADwB/Af8H/x//f////////////////////x3/////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMADwA/AP8AAAAAAAAAAwAPAD8AfwH/B/8f/z///////////////x//P/////////////////////////////////////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAADAP8D/x//P///////AAAAAAAAAAAAAAAAAAAAAQAHz/////////////////8AAAAAAAAAAAAAAAAAAP/+/////////////////////wAAAAAAAAAAAAAAAAAAAADgAP4A/8D//P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADwAP8A//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHw////8AAAAAAAAAAAAAAAAAAAAAAAAABwA/AH/n/////////wAAAAAAAAABAAcAPwH/D///////////////////////A/8P/z///////////////////////////////////////v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAfAAAAAAAAAAAAAAAAAAAAAAABAAMADwB/A/8f//////8ABwAfAD8AfwD/A/8P/z///////////////////////+AA/4D//v//////////////////////////////////AAAAAAAA/AD//P////////////////////////////8AAAAAAAAAAAAAgAD/AP///////////////////////wAAAAAAAAAAAAAAAAAA+AD//////////////////////wD///////////////////////////////////////8AAOAA/+D//////////////////////////////////wAAAAEAP///////////////////////////////////AAD/Af////////////////////////////////////8AAP///////////////////////////////////////wAH////////////////////////////////////////"
 }
});
