// crown: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "crown",
 "region": "oak",
 "w": 64,
 "h": 40,
 "music": "wind",
 "viewBottom": 640,
 "art": {
  "main": "art/oak/crown.png#main",
  "pack": "art/oak/crown.png",
  "parts": {
   "main": [
    0,
    0,
    1024,
    640
   ],
   "L0": [
    0,
    640,
    1410,
    585
   ],
   "L1": [
    0,
    1225,
    1360,
    592
   ],
   "L2": [
    0,
    1817,
    1277,
    605
   ],
   "L3": [
    0,
    2422,
    1173,
    621
   ],
   "L4": [
    0,
    3043,
    1335,
    836
   ],
   "front": [
    0,
    3879,
    48,
    64
   ]
  },
  "layers": [
   {
    "src": "art/oak/crown.png#L0",
    "f": 0.08
   },
   {
    "src": "art/oak/crown.png#L1",
    "f": 0.2
   },
   {
    "src": "art/oak/crown.png#L2",
    "f": 0.4
   },
   {
    "src": "art/oak/crown.png#L3",
    "f": 0.65
   },
   {
    "src": "art/oak/crown.png#L4",
    "f": 1.3
   }
  ],
  "front": "art/oak/crown.png#front",
  "frontAt": [
   704,
   576
  ],
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/crow/crow.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "shaft",
   "edge": "bottom",
   "a": 416,
   "b": 512,
   "to": "shaft",
   "toDoor": "crown",
   "x": 456.0,
   "y": 608,
   "f": 1,
   "keepX": true
  },
  {
   "id": "nest",
   "edge": "left",
   "a": 416,
   "b": 512,
   "to": "nest",
   "toDoor": "crown",
   "x": 24.0,
   "y": 512,
   "f": 1
  },
  {
   "id": "branch",
   "edge": "right",
   "a": 480,
   "b": 544,
   "to": "highbranch",
   "toDoor": "crown",
   "x": 1000.0,
   "y": 544,
   "f": -1,
   "needs": "burst"
  },
  {
   "id": "treetop",
   "edge": "top",
   "a": 480,
   "b": 576,
   "to": "treetop",
   "toDoor": "crown",
   "x": 520.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true,
   "needs": "flap"
  }
 ],
 "items": [
  {
   "id": "feather_crown_feathers_0",
   "x": 350.0,
   "y": 384,
   "kind": "feather"
  },
  {
   "id": "feather_crown_feathers_1",
   "x": 360.0,
   "y": 384,
   "kind": "feather"
  },
  {
   "id": "feather_crown_feathers_2",
   "x": 370.0,
   "y": 384,
   "kind": "feather"
  },
  {
   "id": "cotton_crown",
   "x": 728.0,
   "y": 624,
   "kind": "cotton",
   "float": true,
   "needs": "waterproof"
  }
 ],
 "hints": [
  {
   "text": "dry leaves, packed in tight. a good puff of air would scatter them",
   "l": 672,
   "t": 416,
   "r": 800,
   "b": 576,
   "x": 736,
   "y": 480,
   "until": "burst"
  },
  {
   "text": "rainwater. deep enough to sink in",
   "l": 640,
   "t": 480,
   "r": 800,
   "b": 576,
   "x": 720,
   "y": 512,
   "until": "waterproof"
  },
  {
   "text": "the twigs go on up",
   "l": 416,
   "t": 64,
   "r": 640,
   "b": 192,
   "x": 528,
   "y": 96,
   "until": "flap"
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##############################......############################",
  "##############################......############################",
  "##############################......############################",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..........................==========........................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..........................======............................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..................======....................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..........................======............................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##..................======....................................##",
  "##............................................................##",
  "..............................................................##",
  "..............................................................##",
  "............................======............................##",
  "..............................................................##",
  "................................................................",
  "................................................................",
  "#########...........======......................................",
  "#########.......................................................",
  "#########...........................................############",
  "#########...........................................############",
  "##########################......############~~~#################",
  "##########################......############~~~#################",
  "##########################======############~~~#################",
  "##########################......############~~~#################"
 ],
 "mapAt": [
  64,
  -40
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
 "breaks": [
  {
   "id": "leafplug",
   "x0": 50,
   "y0": 3,
   "x1": 51,
   "y1": 35,
   "hp": 1,
   "look": "leaves",
   "need": "burst"
  }
 ],
 "wildlife": [
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 320,
   "x1": 400,
   "y": 384,
   "every": [
    12,
    30
   ]
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 448,
   "x1": 528,
   "y": 192,
   "every": [
    16,
    36
   ],
   "first": 9
  },
  {
   "kind": "inchworm",
   "at": "back",
   "x0": 320,
   "x1": 400,
   "y": 512,
   "every": [
    20,
    50
   ]
  },
  {
   "kind": "squirrel2",
   "at": "back",
   "x0": 32,
   "x1": 384,
   "y": 576,
   "every": [
    30,
    70
   ]
  },
  {
   "kind": "hawk",
   "at": "L1",
   "x0": 0,
   "x1": 1360,
   "y0": 30,
   "y1": 80,
   "every": [
    50,
    110
   ]
  },
  {
   "kind": "goose",
   "at": "L0",
   "x0": 0,
   "x1": 1410,
   "y0": 40,
   "y1": 90,
   "every": [
    80,
    170
   ]
  }
 ],
 "foes": [
  {
   "kind": "shuttle",
   "x": 264.0,
   "y": 160,
   "f": -1
  },
  {
   "kind": "shuttle",
   "x": 712.0,
   "y": 224,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   130,
   132,
   133,
   134,
   135,
   137,
   139,
   140,
   141,
   144,
   146,
   147,
   148,
   150,
   151,
   152,
   153,
   154,
   165,
   166,
   167,
   168,
   170,
   171,
   172,
   174,
   182,
   183,
   184,
   185,
   186,
   187,
   188,
   189,
   194,
   195,
   196,
   205,
   206,
   207,
   208,
   209,
   212,
   213,
   214,
   218,
   219,
   220,
   221,
   232,
   233,
   234,
   236,
   237,
   238,
   239,
   240,
   247,
   248,
   249,
   250,
   252,
   253,
   257,
   317,
   321,
   382,
   385,
   445,
   449,
   450,
   509,
   510,
   514,
   573,
   574,
   577,
   637,
   641,
   642,
   701,
   705,
   706,
   765,
   766,
   770,
   830,
   834,
   893,
   894,
   897,
   957,
   958,
   962,
   1021,
   1022,
   1026,
   1086,
   1089,
   1090,
   1150,
   1153,
   1213,
   1214,
   1217,
   1277,
   1278,
   1282,
   1341,
   1345,
   1346,
   1406,
   1409,
   1410,
   1469,
   1473,
   1474,
   1534,
   1537,
   1598,
   1726,
   1790,
   1854,
   1987,
   1988,
   1989,
   1990,
   1991,
   2056,
   2120,
   2165,
   2166,
   2167,
   2168,
   2169,
   2170,
   2171,
   2172,
   2185,
   2241,
   2242,
   2245,
   2246,
   2247,
   2248,
   2249,
   2294,
   2295,
   2296,
   2298,
   2299,
   2300,
   2301,
   2302
  ],
  "bits": "//////////////////////////////////////////j/////////////////////////////////////////gP/////////////////////////////////////5/wA////////////////////////////////////////+gED/////////////////////////////////////D/8AD////////////////////////////////////////wAP///////////////////////////////////////44AD///////////////////////////////////////9g//////////////////////////////////////////4//////////////////////////////////////////h////////////////////////////////////////+Af///////////////////////////////////////D/gA////////////////////////////////////////f/////////////////////////////////////////+D//////////////////////////////////////j44PAA/////////////////////////////////////wH/AAD/////////////////////////////////////wP8AP//////////////////////////////////////4P8AP//////////////////////////////////////AB4AD/////////////////////////////////////8P8AB///////////////////////////////////////D/gA/////////////////////////////////////7//D///////////////////////////////////////////4P/////////////////////////////////////5/wAY////////////////////////////////////////H////////////////////////////////////////w/wA/////////////////////////////////////////8A////////////////////////////////////////P//////////////////////////////////////////+D////////////////////////////////////////wc///////////////////////////////////////////7//////////////////////////////////8//A/8AH///////////////////////////////////////+P/g/////////////////////////////////////3//Af//gPwA8ADgAMAAwACAAIAAgACAAIAAgAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8H+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/gOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/jx8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPg/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wBxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+B/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AB8ADwAHAAMAAwADAAMAAwADAAMAAwABAAEAAQAB///////////////+//7///////////////////////8AAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAAAAAAAAAP////7//v/+//7//v/+//7//v/+//7//v/8//z//P/8////////f/9//3//f/9//3//f/9//////////////////P/8//7//v///////////////////////v/+//7//gAAAAAAAAAAAAEAAQABAAEAAQAAAAAAAQABAAEAAQAB//7//v/+//7//v/+//7///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADAAMAAwADAAAABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//P/8f/x//H/8f/x//P//AAMAAwADAAMAAwADAAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAAABAAMAAwADAAMAAwADAAMAAwADAAMAAwADf/////////////////////////////////////////////////////////////////7//v/+//7//v/8//7//gABAAEAAQABAAEAAQABAAEAAwADAAMAAQABAAEAAQAA//7//////////v/+//7///////////////////////8AAAAAAAAAAAAAAAAAAAAAAACAAIAAwADAAMAAwADAAAAAAAAAAAABAAEAAQAAAAAAAAAAAAAAAAAAAAEAAQAB/////////////////////v/+//7//v/+//7//v/+///AAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////f/9//3//f/9//3//f/8AAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgADAAD//P/8//z//P/8//z//P/9//3//f/9//3//////////wADAAMAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQADAAMAAwADAAEAAQABAAAAAAAAAAAAAP////////////////////////////////////9//3///////v/////////////////////////+//7//v////8AAAAAAAAAAAAAAAAAAAAAAAEAAQADAAMAAQABAAEAAT//P/8//3//f/9//3//////////////////////////AAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAwAAAAQABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////3//f/8//z//P/8//z//wADAAMAAgACAAAAAAAAAAIAAgACAAMAAwADAAMAAwAB//3//f/9////////////////////////////////////////////////////////////////////+//7//P/+wADAAMAAwADAAMAAwACAAIAAgAAAAAAAAAAAAAAAAAD/////////////////////f/9//3//f/9//3//f//////+//7/////////////////////////////////////AAAAAAAAAAAAAAABAAEAAQABAAAAAAAAAAAAAAAAAAD///////////////////////////////9//3//P/8//////////////////v/+//////////////////7//v//AAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAE//z//P/9//3///////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAD////////////+//7//v/+//7//v/+//7//v/+//7//oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9//3//f/8//z//P/8//z//f/9//3//f/9//////////v///////////////////////////////////////wAAAAAAAAAAAAAAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAD//////////////////////////////////v/+//z//AAAAAAAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAf/9//3//P/8//x//H/8f/z//P/9//3//f////////////P/8//z//v/+//7//v/+//7//v/+//7//v///////////////3//f/9//3//f/9//3//f/9/////////////f/9//3//////////////////////////////////////////////////f/9//3//f/9//3//f/9///////9//3//f/9//3//f/9//z//P/8//z//P/8//3//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAA8APwH/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAP/A/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//z///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD+AP/w//z//v/+//////////////////////////7//P/8//z//P/8//z//P/8//7//v/+/////////////v////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAcAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAcP/3//////////AAAAAAAAAAAAAAAAAAAAAAAAAAD+AP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/AP/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgAD/////////////////////////////////////////+P///////////////////////////////////////wf////////////////////////////////////////+//j/////////////////////////////////////AB8AB///////////////////////////////////////8P+A/////////////////////v/+//7//v/8//j/8P/gHgAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////////////////////////gPgA////////////////////////////////////////P4D///////////////////////////////////////8P/////////////////////////////////////////v/A///////////////////////////////////5/wADAAH/////////////////////////////////////////wP/////////////////////////////////////z/wAA////////////////////////////////////////Pw8="
 }
});
