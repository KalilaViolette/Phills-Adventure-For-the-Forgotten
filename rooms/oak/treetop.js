// treetop: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "treetop",
 "region": "oak",
 "w": 64,
 "h": 30,
 "music": "wind",
 "viewBottom": 480,
 "art": {
  "main": "art/oak/treetop.png#main",
  "pack": "art/oak/treetop.png",
  "parts": {
   "main": [
    0,
    0,
    1024,
    480
   ],
   "L0": [
    0,
    480,
    1410,
    572
   ],
   "L1": [
    0,
    1052,
    1360,
    560
   ],
   "L2": [
    0,
    1612,
    1277,
    541
   ],
   "L3": [
    0,
    2153,
    1173,
    517
   ],
   "L4": [
    0,
    2670,
    1335,
    628
   ]
  },
  "layers": [
   {
    "src": "art/oak/treetop.png#L0",
    "f": 0.08
   },
   {
    "src": "art/oak/treetop.png#L1",
    "f": 0.2
   },
   {
    "src": "art/oak/treetop.png#L2",
    "f": 0.4
   },
   {
    "src": "art/oak/treetop.png#L3",
    "f": 0.65
   },
   {
    "src": "art/oak/treetop.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "crown",
   "edge": "bottom",
   "a": 480,
   "b": 576,
   "to": "crown",
   "toDoor": "treetop",
   "x": 520.0,
   "y": 448,
   "f": 1,
   "keepX": true
  }
 ],
 "items": [
  {
   "id": "feather_treetop_feathers_0",
   "x": 172.0,
   "y": 320,
   "kind": "feather"
  },
  {
   "id": "feather_treetop_feathers_1",
   "x": 180.0,
   "y": 320,
   "kind": "feather"
  },
  {
   "id": "feather_treetop_feathers_2",
   "x": 188.0,
   "y": 320,
   "kind": "feather"
  },
  {
   "id": "feather_treetop_feathers_3",
   "x": 196.0,
   "y": 320,
   "kind": "feather"
  },
  {
   "id": "feather_treetop_feathers2_0",
   "x": 748.0,
   "y": 288,
   "kind": "feather"
  },
  {
   "id": "feather_treetop_feathers2_1",
   "x": 756.0,
   "y": 288,
   "kind": "feather"
  },
  {
   "id": "feather_treetop_feathers2_2",
   "x": 764.0,
   "y": 288,
   "kind": "feather"
  },
  {
   "id": "feather_treetop_feathers2_3",
   "x": 772.0,
   "y": 288,
   "kind": "feather"
  },
  {
   "id": "cotton_treetop",
   "x": 632.0,
   "y": 160,
   "kind": "cotton",
   "needs": "flap"
  }
 ],
 "hints": [
  {
   "text": "the whole park, from up here",
   "l": 384,
   "t": 288,
   "r": 640,
   "b": 416,
   "x": 512,
   "y": 320
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################################",
  "################################################################",
  "################################################################",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..................................=======...................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..................=======...................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..........................................=======...........##",
  "##............................................................##",
  "##......=======...............................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##############################......############################",
  "##############################......############################",
  "##############################======############################",
  "##############################......############################"
 ],
 "mapAt": [
  64,
  -70
 ],
 "floor": "bark",
 "shade": {
  "a": 0.08,
  "lights": [],
  "tint": null
 },
 "ambient": [
  "leaves",
  "dust"
 ],
 "wildlife": [
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 128,
   "x1": 224,
   "y": 320,
   "every": [
    10,
    26
   ]
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 704,
   "x1": 800,
   "y": 288,
   "every": [
    14,
    30
   ],
   "first": 7
  },
  {
   "kind": "hawk",
   "at": "L1",
   "x0": 0,
   "x1": 1360,
   "y0": 24,
   "y1": 70,
   "every": [
    40,
    90
   ],
   "first": 12
  },
  {
   "kind": "goose",
   "at": "L0",
   "x0": 0,
   "x1": 1410,
   "y0": 30,
   "y1": 80,
   "every": [
    60,
    140
   ],
   "first": 30
  }
 ],
 "foes": [],
 "detail": {
  "tiles": [
   132,
   134,
   135,
   138,
   139,
   140,
   141,
   142,
   143,
   144,
   145,
   146,
   147,
   148,
   149,
   150,
   151,
   152,
   153,
   161,
   162,
   163,
   164,
   167,
   171,
   173,
   175,
   176,
   178,
   179,
   181,
   182,
   183,
   185,
   186,
   193,
   194,
   195,
   197,
   198,
   199,
   200,
   201,
   203,
   204,
   205,
   206,
   209,
   211,
   215,
   216,
   218,
   220,
   221,
   222,
   223,
   224,
   225,
   226,
   227,
   228,
   229,
   230,
   232,
   233,
   234,
   236,
   238,
   240,
   241,
   242,
   243,
   244,
   245,
   247,
   248,
   249,
   250,
   251,
   252,
   253,
   257,
   317,
   321,
   381,
   385,
   386,
   445,
   450,
   509,
   510,
   514,
   573,
   574,
   578,
   637,
   638,
   642,
   702,
   705,
   706,
   766,
   769,
   770,
   829,
   830,
   833,
   834,
   894,
   898,
   957,
   958,
   962,
   1021,
   1022,
   1026,
   1085,
   1090,
   1149,
   1153,
   1154,
   1213,
   1217,
   1218,
   1277,
   1281,
   1282,
   1341,
   1345,
   1346,
   1406,
   1469,
   1473,
   1474,
   1534,
   1538,
   1597,
   1598,
   1600,
   1601,
   1602,
   1661,
   1662,
   1663
  ],
  "bits": "/////////////////////////////////////////A///////////////////////////////////////H/wAP////////////////////////////////////8//wf/////////////////////////////////////////Af//////////////////////////////////////////+P///////////////////////////////////////wH/////////////////////////////////////////4P//////////////////////////////////////////AP///////////////////////////////////////z4A/////////////////////////////////////wH/AB///////////////////////////////////////////P/////////////////////////////////////w/wA///////////////////////////////////////////j//////////////////////////////////////58AB//////////////////////////////////////g8QAA////////////////////////////////////4P8AeAD//////////////////////////////////3//H/8D/////////////////////////////////////////P/w////////////////////////////////////////AAf////////////////////////////////////////8AP///////////////////////////////////////x///////////////////////////////////////8D/AB//////////////////////////////////////////+f///////////////////////////////////////+AH//////////////////////////////////////////n/////////////////////////////////////8f+AD//////////////////////////////////////wfwAA////////////////////////////////////////f/////////////////////////////////////////8D//////////////////////////////////////////wB//////////////////////////////////////xw4AD/////////////////////////////////////H/8AP////////////////////////////////////////4P//////////////////////////////////////////+D///////////////////////////////////////9///////////////7//v/+//7//v/+//7//v/+//7//v/8///4D/AA4ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//D/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAPAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//wA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8APgAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/8GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM4/AAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4A+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/gfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ8HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwA/AA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+B/gAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/APwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+H8APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AB8ADwAHAAMAAwABAAEAAAAAAAAAAAAAAAAAAAAA//z//P/8//z//P/8//z//P/8//z//P/8//z//v/+//4AAAAAAAEAAQABAAEAAQAAAAAAAAAAAAAAAQABAAEAAf/8//z//P/8//j/+P/8//z//v/+//7//v/8//z//P/8AAEAAAAAAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAH//P/8//7//v///////////////////////////////wAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAMAAAAAAAAAAAAEAAQABAAMAAwADAAMAAwABAAEAAQAAAADAAOAA4ADAAMAAgACAAIAAwADAAMAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAMAAwAD/////3//f/////////////////////////////////+AAIAAgACAAMAAwADAAMAAgACAAIAAgAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAA////////////////////////////////////////f/8AAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAwADAAAAAAAAAAAAAAAAAAAAAAAAAAQADAAMAAQABAAAAAAAAf/9//3//f/9//3////////////////////////////+AAIAAgACAAIAAgACAAIAAgACAAIAAwADAAMAAwADAAP////////////////////////////9//3//f/8//z////////////////////////////7////////////////AAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//D/8P/x//P/9//3//f/8//z//P/9//3/////////////////////////////////+//7//P/8//j/+P/4//yAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAA////////////////////////////////f/8//z//P////v/+//7//v///////////////////////////////wAAAAAAAAAAAAAAAAAAAACAAIAAgADAAMAA4ADgAMAAP/9//3//////////////////////////f/9//z//P//AAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAAAAAAAAAAAAAAAAAAAAAAEAAQADAAMAAwABAAEAAAAAP/9//3////////////////////////////////////+AAIAAgACAAMAAwACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABf/9//z//P/8//z//f/9///////////////////////8AAAAAAAAAAAAAgACAAIAAwADgAOAAwADAAIAAgADAAAABAAEAAwADAAEAAQABAAEAAQABAAEAAQABAAEAAQABwADAAMAA4ADgAOAA4ADgAOAA4ADgAOAA4ADAAMAAgAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAf/////////////////+//7//v/+//7/////////////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAMAAwAAAAwADAAMAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAf///////////////////////////////////////v/+wADAAIAAgACAAIAAgADAAMAAgACAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAMAAwADAAMAAwADAAMAA//+//z//P/8//j/+P/8//z//v/+////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgAAAAQABAAEAAQABAAMAAwABAAEAAQABAAAAAAAAAAAAAP/////////////////+//7//v/+//7/////////////gACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////3//P/8//z//P/8//3//f/9//3///////wABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAA///////////////+//7//v/+//7//v/+//////////+AAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////f/9//3//f/9//z//P/8//z//f/9//3//gACAAIAAAAAAAAAAAAAAAAAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAX//f/9//3//f/9//3//f////////////////////////////////////////////////////////////////4D////////////////////+//7//v/+//z/+P/w/+B+AIAAwADAAMAAwADAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//f/9//3//P/8f/w//B/8Af//////////////////////////////////////////8"
 }
});
