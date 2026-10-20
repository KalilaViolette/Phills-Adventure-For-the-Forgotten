// chest: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "chest",
 "region": "warren",
 "w": 48,
 "h": 30,
 "music": "warren",
 "viewBottom": 480,
 "art": {
  "main": "art/warren/chest.png#main",
  "pack": "art/warren/chest.png",
  "parts": {
   "main": [
    0,
    0,
    768,
    480
   ],
   "L0": [
    0,
    480,
    1040,
    652
   ],
   "L1": [
    0,
    1132,
    1040,
    484
   ],
   "L2": [
    0,
    1616,
    906,
    503
   ]
  },
  "layers": [
   {
    "src": "art/warren/chest.png#L0",
    "f": 1.35
   },
   {
    "src": "art/warren/chest.png#L1",
    "f": 1.35,
    "fy": 1.0
   },
   {
    "src": "art/warren/chest.png#L2",
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
   "id": "hole",
   "edge": "left",
   "a": 144,
   "b": 208,
   "to": "oakfall",
   "toDoor": "warren",
   "x": 24.0,
   "y": 208,
   "f": 1,
   "hole": true
  },
  {
   "id": "tunnel",
   "edge": "right",
   "a": 336,
   "b": 400,
   "to": "maintunnel",
   "toDoor": "chest",
   "x": 744.0,
   "y": 400,
   "f": -1
  }
 ],
 "items": [],
 "hints": [],
 "gates": [
  {
   "x0": 24,
   "y0": 17,
   "x1": 24,
   "y1": 21,
   "flag": "warrenOpen",
   "look": "lid"
  }
 ],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "############............########################",
  "#########.##............########################",
  "...........#............########################",
  "........................########################",
  "...................................#############",
  "...................................#############",
  "##########.........................#############",
  "###########........................#############",
  "############.......................#############",
  "#############...........########################",
  "##############.....................#############",
  "###############.......................##########",
  "################........................########",
  "#################..........................#####",
  "##################..............................",
  "######################################..........",
  "########################################........",
  "###########################################.....",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################"
 ],
 "mapAt": [
  60,
  144
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.56,
  "tint": "#0c0810",
  "lights": [
   [
    320,
    192,
    80,
    0.8
   ],
   [
    464,
    208,
    80,
    0.8
   ],
   [
    480,
    304,
    80,
    0.8
   ],
   [
    48,
    176,
    60,
    0.6
   ],
   [
    496,
    244,
    84,
    0.85
   ],
   [
    220,
    117,
    16,
    0.4
   ],
   [
    292,
    125,
    16,
    0.4
   ],
   [
    240,
    118,
    16,
    0.4
   ],
   [
    214,
    121,
    16,
    0.4
   ],
   [
    355,
    121,
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
   "kind": "nutcracker",
   "x": 344.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "peg",
   "x": 504.0,
   "y": 352,
   "f": -1,
   "inside": true
  },
  {
   "kind": "jack",
   "x": 488.0,
   "y": 256,
   "f": -1
  }
 ],
 "guards": [
  [
   326.0,
   352
  ],
  [
   362.0,
   352
  ]
 ],
 "scrub": {
  "l": 400,
  "r": 560,
  "t": 256,
  "b": 352,
  "x": 472.0,
  "y": 352
 },
 "lid": {
  "x": 384,
  "y": 272,
  "h": 80
 },
 "signs": [
  {
   "x": 256,
   "y": 240,
   "text": "strangers stay out",
   "c": "#c8322c"
  },
  {
   "x": 80,
   "y": 120,
   "text": "don't go out alone",
   "c": "#3a5aa0"
  },
  {
   "x": 472,
   "y": 290,
   "text": "wipe your feet",
   "c": "#4a8a3a"
  }
 ],
 "foes": [],
 "scene": "warrenGate",
 "detail": {
  "tiles": [
   301,
   302,
   303,
   306,
   307,
   308,
   310,
   348,
   349,
   350,
   351,
   352,
   353,
   354,
   356,
   357,
   358,
   359,
   384,
   387,
   389,
   390,
   391,
   392,
   394,
   395,
   407,
   433,
   434,
   435,
   436,
   437,
   438,
   439,
   440,
   442,
   443,
   455,
   504,
   505,
   506,
   508,
   509,
   510,
   512,
   513,
   553,
   554,
   555,
   556,
   558,
   559,
   561,
   562,
   576,
   577,
   578,
   579,
   580,
   581,
   582,
   583,
   584,
   610,
   634,
   658,
   683,
   706,
   732,
   746,
   747,
   748,
   752,
   753,
   754,
   781,
   794,
   795,
   796,
   800,
   801,
   802,
   830,
   847,
   850,
   851,
   852,
   879,
   900,
   901,
   902,
   903,
   928,
   951,
   952,
   953,
   977,
   1000,
   1001,
   1002,
   1003,
   1026,
   1027,
   1034,
   1035,
   1036,
   1037,
   1041,
   1042,
   1043,
   1044,
   1051,
   1052,
   1094,
   1095,
   1144,
   1145,
   1195,
   1196
  ],
  "bits": "////////////////////////////////////////4H//////////////////////////////////////////nv/////////////////////////////////////z/wA//////////////////////////////////////////A///////////////////////////////////////4H8AP///////////////////////////////////////x//////////////////////////////////////////h7/////8/AD4APAA4ADAAMAAgACAAIAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/ABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//D/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//A/8A/wB/AB8AHwAPAA8ADwAHAAcAAwABAAEAAQAB////////////////////////////////////////AB/////////////////////////////////////////gH////////////////////////////////////////8D///////////////////////////////////////////D///////////////////////////////////////8B//////////////////////7//v/+//z/+P/w/+D/wP4A//////////////////9//3//f/9//z//H/8D/wB/AB/////////////+//7//v/+//7//v/+//7//v///////wABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAB8ADwAHAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//n/+f/5//j/8D8AAAAAAAAAAAAAAAAEAAQABAAEAAQADAAMAAwABAAEAAQABAAEAAP//////////////////f/8//x//D/8H/wP/AP8AHwAB/////////////////////////////////////////8D///////////////////////////////////////8////////////////////////////////////////////w////////////////////////////////////////APz///////////////////////////////////////8AH//////////////////////////////////////////A////////////////////////////////////////A/9+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//8B8ADwAHAAMAAwADAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/3////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/4D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAPAA+AD4APwA/gD+AP8A/4D/wP/A/+D/8P/w//j//gAAAAAAAQABAAEAAQABAAEAAQABAAEAAAAAAAAAAAAAwADwAPgA+AD8AP4A/gD/AP+A/8D/wP/g//D/8P/4//4AAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAMAA8AD4APgA/AD+AP4A/wD/gP/A/8D/4P/w//D/+P/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD/AP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAABAAMAAwADAAcADwAfAD//////wADwAPgA+AD8AP4A/gD/AP+A/8D/wP/g//D/8P/4//7/////////////////////////////////////8PvgAP/////////////////////////////////////wAAAA/////////////////////////////////////wD/AD/////////////////////////////////////////4AP///////////////////////////////////////wAA////////////////////////////////////////H//AAPAA+AD4APwA/gD+AP8A/4D/wP/A/+D/8P/w//j//vwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8D/wD/AB8ADwAHAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////z//H/8P/w//B/8A/wAHAAAAAP////////////////////////////////////9//w//wADwAPgA+AD8AP4A/gD/AP+A/8D/wP/g//D/8P/4//4AfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//Af8AfwA/AB8ABwADAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//f/9//z//H/8H/wP/AHj///////////////////////////////////////8P/8AA8AD4APgA/AD+AP4A/wD/gP/A/8D/4P/w//D/+P/+Af8A/wA/AA8AAwADAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//P/8f/wf/A/8B/wD/AP8Af/////////////////////////////////////////+/wADwAPgA+AD8AP4A/gD/AP+A/8D/wP/g//D/8P/4//4ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8f/wAPAAcAAwADAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//P/8f/wP/Af8A/wB/AD8AB/AA/AD/AP/A/+D/8P/8//7/////////////////////AAAAAAAAAAAAAAAAAAAAAAAAgADgAPAA+AD+AP+A/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA/4D/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//z//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/AD+AP+A/8D/4P/w//j//v//////////////////AAAAAAAAAAAAAAAAAAAAAAAAAACAAMAA4AD4APwA/4DwAPwA/wD/gP/g//D/+P/8/////////////////////wAAAAAAAAAAAAAAAAAAAAAAAIAAwADgAPgA/AD/AP/A4AD8AP4A/4D/wP/g//D/+P/+//////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAIAAwADgAPgA/AD/gA=="
 }
});
