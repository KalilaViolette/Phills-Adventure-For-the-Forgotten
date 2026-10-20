// grotto: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "grotto",
 "region": "pond",
 "w": 60,
 "h": 30,
 "music": "deep",
 "viewBottom": 480,
 "art": {
  "main": "art/pond/grotto.png#main",
  "pack": "art/pond/grotto.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    480
   ],
   "L0": [
    0,
    480,
    1386,
    568
   ],
   "L1": [
    0,
    1048,
    1300,
    551
   ],
   "L2": [
    0,
    1599,
    1204,
    532
   ],
   "L3": [
    0,
    2131,
    1098,
    510
   ],
   "front": [
    0,
    2641,
    960,
    256
   ],
   "piece_cover_grotto_mud_pass": [
    0,
    2897,
    64,
    118
   ],
   "piece_cover_grotto_mud_wall": [
    0,
    3015,
    18,
    118
   ]
  },
  "layers": [
   {
    "src": "art/pond/grotto.png#L0",
    "f": 0.12
   },
   {
    "src": "art/pond/grotto.png#L1",
    "f": 0.3
   },
   {
    "src": "art/pond/grotto.png#L2",
    "f": 0.5
   },
   {
    "src": "art/pond/grotto.png#L3",
    "f": 0.72
   }
  ],
  "front": "art/pond/grotto.png#front",
  "frontAt": [
   0,
   224
  ],
  "pieces": {
   "cover_grotto_mud_pass": [
    0,
    101,
    64,
    118
   ],
   "cover_grotto_mud_wall": [
    48,
    101,
    18,
    118
   ]
  },
  "uses": [
   "art/pond/pond_sprites.png",
   "art/pond/pond_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/pond/pond_items.png"
 },
 "doors": [
  {
   "id": "tangle",
   "edge": "right",
   "a": 320,
   "b": 384,
   "to": "fishline",
   "toDoor": "grotto",
   "x": 936.0,
   "y": 360.0,
   "f": -1,
   "swim": true
  },
  {
   "id": "bank",
   "edge": "top",
   "a": 496,
   "b": 560,
   "to": "foamline",
   "toDoor": "hole",
   "x": 520.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "pebble_grotto_stash_0",
   "x": 24.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "pebble_grotto_stash_1",
   "x": 24.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "pebble_grotto_stash_2",
   "x": 24.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "pebble_grotto_stash_3",
   "x": 24.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "pebble_grotto_stash_4",
   "x": 24.0,
   "y": 192,
   "kind": "pebble"
  },
  {
   "id": "pebble_grotto_ledge_0",
   "x": 863.0,
   "y": 144,
   "kind": "pebble"
  },
  {
   "id": "pebble_grotto_ledge_1",
   "x": 872.0,
   "y": 144,
   "kind": "pebble"
  },
  {
   "id": "pebble_grotto_ledge_2",
   "x": 881.0,
   "y": 144,
   "kind": "pebble"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "###############################....#########################",
  "###############################....#########################",
  "###############################====#########################",
  "#############..####..#######.............###...........#####",
  "##########...........#######.............###..............##",
  "####.................#######..............................##",
  "####..................####................................##",
  "####...........................====.......................##",
  "..........................................................##",
  "...................................................#########",
  ".....................................###....=====..#########",
  "....................................#####..........#########",
  "#################...................#####..........#########",
  "###################.................#####............#######",
  "#####################~~~~~~~~~~~~~~~#####~~~~~~~~~~~~~~~~~##",
  "#####################~~~~~~~~~~~~~~~#####~~~~~~~~~~~~~~~~~##",
  "#######################~~~~~~~~~~~~~#####~~~~~~~~~~~~~~~~~##",
  "#######################~~~~~~~~~~~~~#####~~~~~~~~~~~~~~~~~##",
  "#########################~~~~~~~~~~~#####~~~~~~~~~~~~~~~~~##",
  "#########################~~~~~~~~~~~#####~~~~~~~~~~~~~~~~~##",
  "###########################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "###########################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "#############################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "#############################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "################################~~~~~~~~~~~~~~~~~~##########",
  "##################################~~~###~#~~~~~~############",
  "###########################################~~~~#############",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  -472,
  120
 ],
 "floor": "mud",
 "shade": {
  "a": 0.52,
  "lights": [
   [
    184,
    172,
    90,
    0.8
   ],
   [
    528,
    144,
    230,
    0.65
   ],
   [
    176,
    176,
    120,
    0.35
   ]
  ],
  "tint": null
 },
 "ambient": [
  "motes",
  "midges"
 ],
 "rest": {
  "x": 184.0,
  "y": 192
 },
 "breaks": [
  {
   "id": "grotto_mud",
   "x0": 3,
   "y0": 8,
   "x1": 3,
   "y1": 11,
   "hp": 3,
   "look": "mud"
  }
 ],
 "wildlife": [
  {
   "kind": "fishswim",
   "at": "back",
   "x0": 480,
   "x1": 912,
   "y0": 324,
   "y1": 376,
   "every": [
    8,
    18
   ]
  }
 ],
 "covers": {
  "grotto_mud": {
   "wall": [
    3,
    8,
    3,
    11
   ],
   "pas": [
    0,
    8,
    2,
    11
   ]
  }
 },
 "foes": [],
 "detail": {
  "tiles": [
   133,
   134,
   140,
   149,
   156,
   158,
   159,
   160,
   164,
   165,
   166,
   167,
   168,
   169,
   170,
   172,
   173,
   191,
   192,
   195,
   196,
   198,
   201,
   207,
   208,
   215,
   217,
   220,
   221,
   224,
   228,
   229,
   230,
   231,
   234,
   235,
   236,
   247,
   248,
   249,
   250,
   256,
   257,
   258,
   260,
   261,
   267,
   268,
   281,
   282,
   283,
   284,
   296,
   297,
   298,
   303,
   304,
   305,
   306,
   309,
   321,
   326,
   327,
   357,
   358,
   364,
   381,
   382,
   384,
   385,
   386,
   417,
   418,
   420,
   421,
   443,
   444,
   445,
   478,
   480,
   537,
   591,
   665,
   666,
   667,
   668,
   669,
   673,
   674,
   675,
   711,
   737,
   738,
   771,
   772,
   799,
   800,
   832,
   833,
   835,
   836,
   837,
   860,
   898,
   958,
   982,
   1018,
   1042,
   1104,
   1138,
   1164,
   1226,
   1286,
   1348,
   1408
  ],
  "bits": "////////////////////////////////////////4f///////////////////////////////////////8P+Af///////////////////////////////////////8f//////////////////////////////////////////4/////////////////////////////////////////gB//////////////////////////////////////wf8Af//////////////////////////////////////8H/gD///////////////////////////////////n/+f85/////////////////////////////////////////+AB/////////////////////////////////////////gD/////////////////////////////////////j/8AB////////////////////////////////////8f/AIgA/////////////////////////////////////3//H////////////////////////////////////////////v/////////////////////////////////////B/wD////////////////////////////////////4/+A4AAD//////////////////////////////////x//AP8AD///////////////////////////////////////j/wA//////////7//v/+//7//v/+//7//P/8//j/8P/gAAD//////////3//f/9//3//f/9//z//P/8f/w//B/8AAP///////////////////////////////////////wD//////////////v/+//7//v/+//7//v/8//j/8P/g/gD///////////////////////////////9//3//f/9///////////////7//v/+//z//P/8//z//P/8//z//P/+/4D4APAA4ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AHwAPAAcAAwADAAEAAQABAAEAAQAAAAAAAAAAAAD//////////////////////////////////3//f/9///AA8ADwAOAAwADAAIAAgAAAAAAAAAAAAAAAAAAAAAAAD/8HwAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAfAA8ABwADAAMAAQAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//3//f/8//x//D/8H/gAA/////////////////////////////////////w//AB////////////////////////////////////////+Af//////////////////////////////////////////+/////////////////////v/+//7//v/8//j/8P/gHgD8APgA8ADgAMAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAAAAAAAf////////////////////////////////////////////v/+//7//v/////////////////////////+//7//gAAAAAAAAAAAAAAAAAAgACAAIAAgACAAAAAAAAAAAAAf/9//3//f/9//3//f/9//3//f/9//z//H/8P/wf/AD/////////////////////////////////////////+AP////////////////////7//v/+//7//P/4//D/4AAAAAAAAAAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AB8ADwAHAAMAAwABAAEAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////9//3//f/////////7///////////////////////////////////3/+ADwAOAAwADAAIAAgAAAAAAAAAAAAAAAAAAAAAAA/w8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//f/9//z//H/8P/wf/AAP////////////////////////////////////x/AD4AP/+//7//v/+//7//P/8//z//P/4//j/+P/4//A/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAwADAAN//3///////////////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAAAcADwAPAAcAAwADAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//f/9//3//P/8f/w//B/8AQf///////////////////////////////////////z///////////////////////v/+//7//v/8//j/8P/g/gD4APgA8ADgAMAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////3//f/9//3//f///////////////////////////////////////////////////AP/////////////////////////////////////3/wDnP/gH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////9///////////////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAwAHAAcADwAfAB8APwD/Af8D/x//D/8//3//f/////////////////////////9//3////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/z////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA+AD/AP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/x7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA/////////////////////////////3//f/9//3//f//gAPwA/wD/gP/A//D/+P/8//7//////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAgADgAPAA+AD+AP/AP/8//z//P/9//3////9//3//f/9//z//H/8P/wfnAAH//////////////////////////////////////8//B/AA/AD/AP/A/+D/8P/8//7/////////////////////AAAAAAAAAAAAAAAAAAAAAAAAgADgAPAA+AD+AP+A/+D+DwAPAA8ABwADAAMAAQAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//3//f/8//x//D/8D/wAf////////////////////////////////////////+AD///////////////////////////////////////9//////////////////////////////////////w/AAwAB//D//P/+//7///////////////////////////////9//x//H/8f/x//H/8f/x//P/8//z//f/9//3//f/8//z//H/8f/x//P/8//z//P/8//z//f/9//3//f/9//3////D//P/+//7///////////////////////////////9//3//f/9//3//f/9//3//f/9//3///////////////////////////////////////////////v/+//////////D//P/+//7///////////////////////////////////////////////////////9//3///////////////////////////////////////v/+//7//v////////////D//P/+//7//////////////////////////v/+//z//P/8//z//v/+///////////////////////////////w//z//v/+//////////////////////////7//v/+//7//v/+//////////////////7//v/+//7///////8="
 }
});
