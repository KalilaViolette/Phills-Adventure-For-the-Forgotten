// litterpath: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "litterpath",
 "region": "rootwood",
 "w": 90,
 "h": 24,
 "music": "rootwood",
 "viewBottom": 384,
 "art": {
  "main": "art/rootwood/litterpath.png#main",
  "pack": "art/rootwood/litterpath.png",
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
    556
   ],
   "L1": [
    0,
    940,
    1444,
    522
   ],
   "L2": [
    0,
    1462,
    1444,
    484
   ],
   "L3": [
    0,
    1946,
    1444,
    441
   ],
   "L4": [
    0,
    2387,
    1876,
    503
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/litterpath.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/litterpath.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/litterpath.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/litterpath.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/litterpath.png#L4",
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
   "id": "acorn_lp8",
   "x": 136,
   "y": 288,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp11",
   "x": 184,
   "y": 288,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp34",
   "x": 552,
   "y": 256,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp53",
   "x": 856,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp63",
   "x": 1016,
   "y": 208,
   "kind": "acorn"
  },
  {
   "id": "acorn_lp77",
   "x": 1240,
   "y": 288,
   "kind": "acorn"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##########################......##########################################################",
  "##########################......##########################################################",
  "##########################......##########################################################",
  "##########################......##########################################################",
  "##....................................................................................####",
  "##....................................................................................####",
  "##....................................................................................####",
  "##....................................................................................####",
  "##....................................................................................####",
  "##....................................................................................####",
  "##....................................................................................####",
  "##....................................................................................####",
  "##....................................................................................####",
  "##........................................................#########...................####",
  "....................................................====..#########...................####",
  "..............................####........................#########...................####",
  "..............................#######....................###########..................####",
  "..............#########.......#######...........####################..................####",
  "########################################^^^^^#########################^^^^######......####",
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
  "a": 0.42,
  "lights": [
   [
    858,
    264,
    46,
    0.55
   ],
   [
    864,
    267,
    46,
    0.55
   ],
   [
    1336,
    284,
    46,
    0.55
   ],
   [
    1342,
    280,
    46,
    0.55
   ],
   [
    1346,
    281,
    46,
    0.55
   ]
  ]
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
   "x1": 880,
   "y": 234
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 32,
   "x1": 208,
   "y": 288
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 944,
   "x1": 1056,
   "y": 208,
   "every": [
    10,
    25
   ]
  },
  {
   "kind": "beetle",
   "at": "back",
   "x0": 928,
   "x1": 1056,
   "y": 208
  }
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 328.0,
   "y": 272,
   "f": -1
  },
  {
   "kind": "cap",
   "x": 856.0,
   "y": 272,
   "f": 1
  },
  {
   "kind": "can",
   "x": 1224.0,
   "y": 288,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   272,
   273,
   274,
   275,
   276,
   277,
   278,
   279,
   281,
   282,
   283,
   284,
   285,
   286,
   288,
   289,
   290,
   291,
   294,
   295,
   296,
   301,
   302,
   303,
   304,
   305,
   306,
   308,
   309,
   310,
   311,
   312,
   313,
   314,
   315,
   316,
   317,
   318,
   319,
   321,
   322,
   323,
   324,
   325,
   328,
   329,
   331,
   332,
   333,
   334,
   335,
   336,
   338,
   339,
   340,
   341,
   342,
   343,
   344,
   346,
   347,
   348,
   349,
   350,
   351,
   352,
   353,
   354,
   355,
   362,
   363,
   370,
   371,
   376,
   377,
   378,
   382,
   383,
   384,
   393,
   394,
   396,
   397,
   398,
   399,
   400,
   401,
   403,
   404,
   405,
   406,
   409,
   410,
   413,
   415,
   416,
   417,
   418,
   420,
   422,
   423,
   424,
   426,
   427,
   431,
   434,
   435,
   436,
   437,
   438,
   439,
   440,
   441,
   443,
   445,
   452,
   535,
   536,
   541,
   542,
   625,
   626,
   631,
   715,
   716,
   721,
   805,
   806,
   811,
   895,
   902,
   985,
   986,
   992,
   1075,
   1081,
   1082,
   1139,
   1140,
   1141,
   1165,
   1166,
   1228,
   1236,
   1256,
   1291,
   1292,
   1346,
   1380,
   1407,
   1416,
   1417,
   1435,
   1436,
   1455,
   1456,
   1457,
   1458,
   1459,
   1460,
   1461,
   1476,
   1489,
   1490,
   1491,
   1492,
   1493,
   1494,
   1495,
   1496,
   1507,
   1525,
   1533,
   1534,
   1535,
   1536,
   1543,
   1553,
   1554,
   1555,
   1556,
   1557,
   1558,
   1559,
   1560,
   1567,
   1568,
   1576,
   1577,
   1597,
   1598,
   1615,
   1699,
   1706,
   1789,
   1795,
   1880,
   1885
  ],
  "bits": "/////////////////////////////////z/8H/wB/AD///////////////////////////////////////9/////////////////////////////////8//x/+D/4MAA/////////////////////////////////////wD/AB///////////////////////////////////////A8AA////////////////////////////////////////oAG////////////////////////////////j/8D/wD/AD///////////////////////////////////////4f8Af//////////////////////f/9//n/+f/5//H/8D9gA////////////////////////////////////z/8AAAD///////////////////////////////////////gP4P////////////////////////////////////9AHwAA////////////////////////////////////////AAD///////////////////////////////////////9///////////////////////////////////////////gA//////////////////////////////////////wA8AD/////////////////////////////////////Af8AAf/////////////////////////////////////8P8AB///////////////////////////////////////9/4D////////////////////+//7//v/+//z/+P/w4eAAAAAAgACAAIAAgADAAMAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////9//3/3f+N/4T/hH8APwAfAAAAAAP///////////////////////////////3//P/8f/w/////////////////////////////////8//D/8P8A+AD///////////////////////////9/fj88HxweHAwAAP//////////////////////////////////f/9//wH//////////////////////////////////////////8D/////////////////////////////////////j/8H/////////////////////////////////////////8H//////////////////////////////////////v/+//7////////////////////////////////7/wH/AP8AA//////////////////////////////////////////4////////////////////////////////////////f////////////////////////5//j/+H/4P/gf+A/4D/gP////////////////////////////j/8Ofgx+AH4Afg////////////////////////z/8H/wP/Af8B/wD5AAD/////////////////////////////////////+AcAAP///////////////////////////////////////z4/////////////////////////////////////////gAD///////////////////////////////////////8AAP/////////////////////////////////v/+D/4P/g////////////////////////////////f/8//yF/AAD///////////////////////////////////////97//////////////////////////////////////////B/////////////////////////////////////4/8B8AD///////////////////////////////////////j/gP////////////////////////////////////8D/wD//////////////////////////////////////////+D/////////////////////////////////////v/8B///////////////////////////////////////w/4AA////////////////////////////////////////AB////////////////////////////////////////z/gP///////////////////////////4P/Af4A/gAMAAAA//////////////////////////////////9//z//HwD///////////////////////////////////////8//////////////////////////////////////////oAA/////////////////////////////////////wA/AAD///////////////////////////////////////8///////////////////////////////////////////wf/////////////////////////////////////////wD///////////////////////////////////////8D//////////////////////////////////////n/4P+A////////////////////////////////////f35/AD////////////////////////////////////X/8H/wAP///////////////////////////////////////wAH//////////////////////////////////////////j///////////////////////////////////4//gEAAP///////////////////////////////////////w///AD4APAA4ADAAMAAgACAAIAAgADAAMAAwADAAIAAgAAf/AfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//D/8AHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOD/AB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AfgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+HwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A/wAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//f8AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4D4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8B+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8ABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AHwAPAAcAAwADAAMAAwAHAAcABwAHAAcAAwADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgADAAOAA4ADgAAABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////3//f/8//z//P/8//z//P/8//z//P////////////////////////////////////v/+//7//uAAwADAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAF//3//f//////////////////////////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+AAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////////////////////3//f/9//3//f/9////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAM//z//P/8//z//P/8//3//f/9////////////////////+//7//v/+//7/////////////////////////////AAMAAwADAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQAB//////////9//3//f/9///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAwADAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAAAAAAAAAAAA/////////////////////////////v/+//7////////AAOAA4ADgAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/gD/8AABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////3//f/9//3//f/8P/z//f/9////////////////////////////////////w//z//v/+////////////////////////////////f/9//3//f/9//3//f/9//3//f/9//3//P/8//z//P/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAP/8//z//P/8//3//f/8//z//P/8//z//f/9//3//f/8P/z//f/9//////////////////////////////////wAAAAAAAAAAAAAAAAAAAAEAAwAHAA8AHwB/AP8D/wf////////+//7//v/+//7//v/+//7//v////////////8AAAAAAAAAAAAAAAAAAAAAAABgAPAA+AD8AP8A/4D/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQADAAMAAwADf/8//z//P/9//3//f/9///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP/w//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA+AD/AP/w//z//v/+////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAPAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAHAA8AHwB///8ABwA/AP8B/wP/D/8f/z//f//////////////////////w//z//v/+////////////////////////////////AAMAAwABAAEAAQADAAMAAwADAAMAAwADAAMAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8f/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8B/x//4AD4AP4A/wD/wP/g//D/+P/8//7///////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD/wP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMP/////////AAAAAAAAAAAAAAAAAAAAAAADAAcADwAf//////////9//z//P////////////////////////////////////wAAAAAAAAAAAAAAAAAAAACAAIAA4AD//v//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADgAPgA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAcADwAfAH8D/wAHAD8A/wH/A/8P/x//P/9///////////////////////////////////////////////7//v/8//7///////8AAAAAAACAAMAA4ADgAPAA+AD8APwA/wD/gP/A/+D/+AABAAEAAQABAAEAAwADAAMAAwADAAMAAwABAAAAAAAA//D//P/+//7//////////////////////////v/+//7///////9//3//f/9//z//P/8//z//P/9//3/////////8//z//P/8//7//v/+//7//v/+////////////////AAEAAQADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAAABAAAAAAAAAAAAAAAAAAAAAQABAAEAAwADAAMAAwAB"
 }
});
