// bearhome: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "bearhome",
 "region": "rootwood",
 "w": 40,
 "h": 22,
 "music": "bear",
 "viewBottom": 352,
 "art": {
  "main": "art/rootwood/bearhome.webp#main",
  "pack": "art/rootwood/bearhome.webp",
  "parts": {
   "main": [
    0,
    0,
    640,
    352
   ],
   "L0": [
    0,
    352,
    182,
    61
   ],
   "L1": [
    0,
    413,
    762,
    64
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/bearhome.webp#L0",
    "f": 1.3,
    "x": 457,
    "y": 323
   },
   {
    "src": "art/rootwood/bearhome.webp#L1",
    "f": 1.3,
    "fy": 1.0,
    "x": 72
   }
  ],
  "uses": [
   "art/rootwood/rootwood_sprites.png",
   "art/rootwood/rootwood_items.png"
  ],
  "items": "art/rootwood/rootwood_items.png"
 },
 "doors": [
  {
   "id": "down",
   "edge": "bottom",
   "a": 80,
   "b": 128,
   "to": "eastedge",
   "toDoor": "bearhole",
   "x": 176,
   "y": 285,
   "f": 1,
   "keepX": false,
   "far": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "##############............##############",
  "##########....................##########",
  "########........................########",
  "######............................######",
  "###..................................###",
  "###..................................###",
  "###..................................###",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "###..................................###",
  "###..................................###",
  "###..................................###",
  "#####...################################",
  "#####...################################",
  "#####...################################",
  "#####...################################"
 ],
 "mapAt": [
  358,
  90
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.4,
  "lights": [
   [
    568,
    192,
    90,
    0.8
   ],
   [
    328,
    192,
    120,
    0.9
   ],
   [
    504,
    256,
    70,
    0.5
   ]
  ]
 },
 "ambient": [
  "spores"
 ],
 "rest": {
  "x": 376.0,
  "y": 288
 },
 "foes": [],
 "detail": {
  "tiles": [
   136,
   138,
   139,
   141,
   143,
   144,
   173,
   174,
   175,
   177,
   179,
   180,
   181,
   182,
   183,
   184,
   185,
   186,
   187,
   188,
   209,
   210,
   211,
   212,
   228,
   229,
   230,
   231,
   247,
   248,
   249,
   271,
   272,
   285,
   286,
   287,
   313,
   314,
   315,
   323,
   324,
   356,
   362,
   363,
   397,
   402,
   437,
   442,
   477,
   481,
   482,
   517,
   522,
   557,
   558,
   562,
   597,
   602,
   637,
   642,
   677,
   683,
   689,
   690,
   691,
   692,
   693,
   694,
   695,
   696,
   697,
   698,
   699,
   700,
   701,
   705,
   706,
   707,
   708,
   709,
   710,
   711,
   712,
   713,
   714,
   715,
   716,
   724,
   728
  ],
  "bits": "////////////////////////////////////+f/z/+f////////////////////////////////////////AAP///////////////////////////////////////x///////////////////////////////////////////B/////////////////////////////////////////4cP///////////////////////////////////////w///////////////////////v/+//7//P/4//j/8P/g/gD////4/4D8APAA4ACAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//w8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wP/AP8APwAPAAMAAQAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/8//x//H/8P/wf/B/8D/wB8//////////////////////////////////////+BDAD///////////////////////////////////////8///////////////////////7//v/+//z/+P/g/8D/gP4A///4D/AA4ADAAMAAgAAAAAAAAAAAAAAAAAAAAAAAAAD//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwA/AA8ABwADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////3//P/8f/x//D/8H/wP/AP8AHwAA////////////////////////////////////////f//////////////////////+//7//v/+//z/+P5w/AD8AP///w/+APgA8ADgAOAAwAAAAAAAAAAAAAAAAAAAAAAA+ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wB/AB8ABwADAAMAAQAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/8//x//H/8P/w//A/8APwAA/////////////////////v/+//7//v/8//j/8P/gwAD8B/gA8ADgAMAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8B/wA/AB8ADwAHAAMAAAAAAAAAAAAAAAAAAAAAAAD//////////3//f/9//3//f/8//z//H/8B/wAfAAEAAP///////////////////////////////////////wA/////4P8A/AD4APAA4ADAAIAAgACAAIAAgACAAIAAgADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//D/8APwAfAA8AAwADAAEAAQABAAEAAAAAAAAAAAAA/////////////////////v/+//7//v/+//7//v/+//6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////f/9//3//f/9//3//f/9//3//f/9//3////7//v/+//7//v/+//z//P/4//j/8P/w/+D/wP+A/gB//3//f/9//3//f/9//z//P/8f/w//D/8H/wf/Af8AP/wA/AD4APAA4ADAAMAAwADAAMAAgACAAIAAAAAAAAAAAD8AHwAPAAcAAwADAAMAAwADAAMAAwADAAEAAQABAAH//v/+//7//v/+/////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAGAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAAABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////f/9//3//f/8AAAAAAAAAAIAAgADAAOAA8AD4APwA/AD/AP+A/+D/8AAAAAAAAAAAAAAAAAAAAAAAAQABAAMABwAPAB8AfwD///D//P/+//7///////////////////////////////8P/z//f/9//////////////////////////3//f/9////////////////////////////+////////////////f/////////////////////////////////////////8AAAAAAAAAAAAAAAAAAIAAgADgAPAA/gD/gP/A//j//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AD/gP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD//P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//z//wAAAAAAAAAAAAAAAAAAAAAABwAPAB8APwD/Af8P//////D//P/+//7///////////////////////////////8P/z//f/9//////////////////////////////////w=="
 }
});
