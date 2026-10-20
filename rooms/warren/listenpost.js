// listenpost: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "listenpost",
 "region": "warren",
 "w": 52,
 "h": 26,
 "music": "warren",
 "viewBottom": 416,
 "art": {
  "main": "art/warren/listenpost.png#main",
  "pack": "art/warren/listenpost.png",
  "parts": {
   "main": [
    0,
    0,
    832,
    416
   ],
   "L0": [
    0,
    416,
    1127,
    565
   ],
   "L1": [
    0,
    981,
    1127,
    420
   ],
   "L2": [
    0,
    1401,
    957,
    452
   ]
  },
  "layers": [
   {
    "src": "art/warren/listenpost.png#L0",
    "f": 1.35
   },
   {
    "src": "art/warren/listenpost.png#L1",
    "f": 1.35,
    "fy": 1.0
   },
   {
    "src": "art/warren/listenpost.png#L2",
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
   "id": "square",
   "edge": "top",
   "a": 256,
   "b": 320,
   "to": "townsquare",
   "toDoor": "hatch",
   "x": 280.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  },
  {
   "id": "deep",
   "edge": "bottom",
   "a": 640,
   "b": 704,
   "to": "deepdig",
   "toDoor": "listen",
   "x": 664.0,
   "y": 384,
   "f": 1,
   "keepX": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [
  {
   "x0": 40,
   "y0": 18,
   "x1": 43,
   "y1": 18,
   "flag": "deepHatch",
   "look": "hatch"
  }
 ],
 "events": [],
 "spawn": null,
 "tiles": [
  "################....################################",
  "################....################################",
  "################====################################",
  "################....################################",
  "################....################################",
  "################====################################",
  "################....################################",
  "################....################################",
  "####............====..............................##",
  "####..............................................##",
  "####..............................................##",
  "####............====..............................##",
  "####..............................................##",
  "####..............................................##",
  "####............====..............................##",
  "####..............................................##",
  "####..............................................##",
  "####..............................................##",
  "########################################====########",
  "########################################....########",
  "########################################....########",
  "########################################====########",
  "########################################....########",
  "########################################....########",
  "########################################====########",
  "########################################....########"
 ],
 "mapAt": [
  172,
  186
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.56,
  "tint": "#0c0810",
  "lights": [
   [
    416,
    208,
    80,
    0.8
   ],
   [
    96,
    208,
    50,
    0.4
   ],
   [
    416,
    154,
    72,
    0.75
   ],
   [
    424,
    141,
    16,
    0.4
   ],
   [
    764,
    135,
    16,
    0.4
   ],
   [
    249,
    136,
    16,
    0.4
   ],
   [
    219,
    136,
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
   "kind": "dot",
   "x": 424.0,
   "y": 288,
   "f": 1
  },
  {
   "kind": "sarge",
   "x": 600.0,
   "y": 288,
   "f": -1
  }
 ],
 "bell": {
  "x": 504.0,
  "y": 288
 },
 "signs": [
  {
   "x": 38,
   "y": 134,
   "text": "do not open",
   "c": "#c8322c"
  },
  {
   "x": 416,
   "y": 176,
   "text": "quiet. listening",
   "c": "#3a5aa0"
  }
 ],
 "foes": [],
 "detail": {
  "tiles": [
   172,
   175,
   224,
   228,
   327,
   328,
   331,
   332,
   369,
   370,
   371,
   372,
   374,
   375,
   376,
   377,
   378,
   379,
   384,
   385,
   386,
   394,
   395,
   396,
   398,
   401,
   402,
   403,
   404,
   405,
   406,
   407,
   408,
   409,
   410,
   411,
   412,
   420,
   421,
   422,
   425,
   426,
   427,
   439,
   443,
   445,
   446,
   449,
   451,
   452,
   453,
   454,
   455,
   456,
   457,
   459,
   460,
   461,
   462,
   463,
   464,
   465,
   472,
   517,
   518,
   523,
   570,
   576,
   622,
   673,
   674,
   680,
   726,
   731,
   732,
   777,
   783,
   830,
   835,
   882,
   888,
   889,
   890,
   891,
   892,
   893,
   894,
   895,
   896,
   897,
   898,
   899,
   900,
   901,
   902,
   903,
   904,
   905,
   906,
   907,
   908,
   912,
   913,
   917,
   918,
   919,
   929,
   930,
   931,
   932,
   933,
   934,
   1084,
   1131,
   1136,
   1183,
   1184,
   1188
  ],
  "bits": "AAAAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAAAAAAAAAIAAgACAAIAAgACAAMAAwACAAIAAgACAAMAAwACAAIAA//////////////////////////////////9//3/////////////////////////+//7//v/8//z//P/8//z//IAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////f/9//3//f/9//3//f/9//3//f/9//////////////////////////////////////////v/w///////////////////////////3/+P4wfjB+AH4Afj/////////////////////////7/APAA8ADwAPAA8AAP///////////////////////////////////////wAH/////////////////////////////////////////+D///////////////////////////////////////8///////////////////////////////////////////g////////////////////////////////////////+/+D/////////////////////////////////////AP8AAP/8//z//P/8//z//P/8//z//P/8//z//P/4//D/4P4Af/9//3//f/9//3//f/9//z//P/8f/x//D/8H/wDwAAD/////////////////////////////////////P/8B//////////////////////////////////////////z///////////////////////////////////////////H/////////////////////////9//3/+P/4//B/8H/wP///////////////////////////////////////wAB////////////////////////////////////////gAf///////////////////////////////////////8D///////////////////////////////////////////4////////////////////////////////////////P//////////////////////////3/+P/4/PD4cHhAcEAwf/////////////////////////////+f/A/8B/wD/AP/////////////////////////////////////////wf//////////////////////////////////////////P////////////////////////////////////8H/wD////////////////////////////////////////+//D//////////////////////////5//D/8D/wH/Af8AB//////////////////////////////////////////g////////////////////////////////////////A/////4A8ADgAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//w//Af8APwAfAA8ABwADAAMAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAIAAgACAAMAAwADAAMAAgACAAIAAAAAAAAAAAAAAAAABAAEAAQAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////f/9///////////////7//v/+//7//v//////////////////f/9//3//f/9//3//f/9//3////////////////////+AAIAAgAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgAAAAP///////3//f/9//3//f/9//3///////3//f///////AAAAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////f/9//3//f/9//3//f/9//3//f/9//wAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAf/9//3//f/9//3//f/9//3//f/9//3////////////////////////////////////////////////////7//sAAwADAAMAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v/+//7//v/+//7//v///////////////////////////////////////////////////////////////3////////////7//v/+//7//v/+//////////////////9//3//f///////////////////////////////f/9//wAAAAAAAAAAAACAAMAAwADgAPAA+AD8AP4A////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//z//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQP///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA//j//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8D//wAAAAMABwAHAA8AHwAfAD8AfwB/Af8D/wf/D/8f////f/9/////////////////////////////////////////////////////////////////////////////f/9//////////////////v/+//7//v/+//7/////////////f/9//3//f/9//3//f/9//3//f//////////////////////////////////////////////+//7//v///////4AAwADAAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAAAA//9//3//f/9//3//f/9//3//f/9//3//f/////////8="
 }
});
