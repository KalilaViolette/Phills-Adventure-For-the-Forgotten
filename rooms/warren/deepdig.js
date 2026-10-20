// deepdig: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "deepdig",
 "region": "warren",
 "w": 60,
 "h": 30,
 "music": "warrendeep",
 "viewBottom": 480,
 "art": {
  "main": "art/warren/deepdig.png#main",
  "pack": "art/warren/deepdig.png",
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
    1300,
    652
   ],
   "L1": [
    0,
    1132,
    1300,
    484
   ],
   "L2": [
    0,
    1616,
    1060,
    503
   ]
  },
  "layers": [
   {
    "src": "art/warren/deepdig.png#L0",
    "f": 1.35
   },
   {
    "src": "art/warren/deepdig.png#L1",
    "f": 1.35,
    "fy": 1.0
   },
   {
    "src": "art/warren/deepdig.png#L2",
    "f": 0.8
   }
  ],
  "uses": [
   "art/warren/warren_sprites.png",
   "art/warren/warren_items.png",
   "art/rootwood/rootwood_sprites.png"
  ],
  "items": "art/warren/warren_items.png"
 },
 "doors": [
  {
   "id": "listen",
   "edge": "top",
   "a": 704,
   "b": 768,
   "to": "listenpost",
   "toDoor": "deep",
   "x": 728.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "button_deep_0",
   "x": 80,
   "y": 384,
   "kind": "button"
  },
  {
   "id": "button_deep_1",
   "x": 384,
   "y": 384,
   "kind": "button"
  },
  {
   "id": "button_deep_2",
   "x": 880,
   "y": 320,
   "kind": "button"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "############################################....############",
  "############################################....############",
  "############################################====############",
  "############################################....############",
  "############################################....############",
  "############################################====############",
  "############################################....############",
  "############################################....############",
  "############################################====############",
  "############################################....############",
  "##########................................................##",
  "##########..................................====..........##",
  "##########................................................##",
  "##########................................................##",
  "##########..................................====..........##",
  "##########................................................##",
  "##########................................................##",
  "##########..................................====..........##",
  "##########................................................##",
  "##########................................................##",
  "##.................................####^^^##################",
  "##................................##########################",
  "##.............................#############################",
  "##............................##############################",
  "###############^^^^#########################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  168,
  212
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.62,
  "tint": "#120818",
  "lights": [
   [
    720,
    64,
    60,
    0.6
   ],
   [
    80,
    352,
    40,
    0.3
   ]
  ]
 },
 "ambient": [
  "dust"
 ],
 "npcs": [],
 "breaks": [
  {
   "id": "cavein",
   "x0": 8,
   "y0": 20,
   "x1": 9,
   "y1": 23,
   "hp": 4,
   "look": "cavein"
  }
 ],
 "trapped": {
  "x": 72.0,
  "y": 384
 },
 "pool": [
  [
   240,
   304,
   384
  ],
  [
   624,
   672,
   320
  ]
 ],
 "foes": [
  {
   "kind": "gum",
   "x": 328.0,
   "y": 160,
   "f": -1
  },
  {
   "kind": "juice",
   "x": 360.0,
   "y": 384,
   "f": -1
  },
  {
   "kind": "cap",
   "x": 808.0,
   "y": 320,
   "f": -1
  },
  {
   "kind": "cap",
   "x": 200.0,
   "y": 384,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   224,
   228,
   283,
   288,
   403,
   404,
   407,
   463,
   464,
   467,
   528,
   553,
   555,
   556,
   557,
   558,
   559,
   560,
   561,
   562,
   563,
   564,
   565,
   566,
   567,
   570,
   571,
   573,
   574,
   576,
   580,
   581,
   582,
   583,
   588,
   590,
   591,
   592,
   610,
   611,
   612,
   614,
   620,
   621,
   626,
   627,
   628,
   631,
   632,
   634,
   635,
   636,
   637,
   638,
   639,
   642,
   649,
   653,
   655,
   656,
   657,
   717,
   729,
   777,
   778,
   837,
   850,
   898,
   910,
   957,
   958,
   970,
   1017,
   1030,
   1077,
   1089,
   1138,
   1142,
   1143,
   1144,
   1145,
   1146,
   1185,
   1186,
   1187,
   1188,
   1189,
   1190,
   1191,
   1192,
   1193,
   1197,
   1202,
   1204,
   1205,
   1234,
   1262,
   1292,
   1293,
   1350,
   1382,
   1383,
   1391,
   1392,
   1393,
   1400,
   1401,
   1402,
   1406,
   1407,
   1408,
   1409
  ],
  "bits": "gACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////f/9//3//f/9////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v//f/9//3//f/9//////////////////////////////////////////////////////////////////////////oAAwADAAMAAgACAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAEAAQABAAH//v/+//7//v/+//7//////////////////////////wAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAD///////////////9//3//f/9//3//f/9//3//////////////////////////////////////////5//D/4P//////////////////////////////////////////B/////////////////////////////////////////wAP///////////////////////////////////////wH///////////////////////////////////////////D///////////////////////////////////////9gf///////////////////////////////////8//h/8B///////////////////////////////////////////j////////////////////////////h/4D/AP4A/gAAAP///////////////////////////////3//f/8/8D/A/////////////////////////////////////z//B//////////////////////////////////////8//z/+P//////////////////////////////////D/0P/A/8//////////////////////////f/5//j/8N/wz/DH4H/////////////////////////////////////////+///////////////////////////////////////P+AP////////////////////////////////////////AAD///////////////////////////////////////8f/////////////////////////////////////////4A/////////////////////////////////////////wAf////////////////////////////////////////8AP///////////////////////////////////////x/////////////////+//7//P/4//D/4P/A/4D/APgAwAB//3//f/9//z//H/8f/x//H/8f/x//D/8P/wf/A/8Af/////////////////////////////////////////8A///////////////////////////////////////8APD///////////////////////////////////////8Af////AD4APAA4ADAAMAAwADAAIAAgACAAIAAgAAAAAAA//8D8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+B8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AHwAPAAcAAwADAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////////////v/+//7//v/+AAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAF//3//f////////////////////////////////////wABAAEAAQABAAEAAQABAAEAAwADAAMAAQABAAEAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAD//////////3//f/9//3//f/9//3//f/9//3//f/9//4AAgACAAIAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAF///////9//3//f/9//////////////////////////4AAgACAAIAAgACAAIAAgACAAIAAgACAAMAAwADAAMAAAAEAAQABAAEAAQAAAAAAAAABAAEAAQABAAEAAQABAAGAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAMAAwADAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAA///////+//7//v/+//7//v/+//7//v/+//7//////////3//f/9//3//f/8//z//P/8//z//f/9//3/////////////////////////////////////////////////4///////////////////////////////////////gAAD/////////////////////////////////////H/8H///////////////////////////////////////////w////////////////////////////////////////AAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP4A//AAAAAAAAAAAAABAAEABwAPAA8AHwA/AH8A/wP/B/8f///g/wD8APgA8ADwAPAA4ADgAOAAwADAAIAAgACAAIAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAA8AHwAfAD8AfwB/AP8B/wP/A/8H/w//D/8f/3//gACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABwAPAB8AfwD/A/8f/wAPAH8B/wP/D/8f/z//////////////////////////AAMADwAfAB8APwB/AH8A/wH/A/8D/wf/D/8P/x//f/8AAAAAAAAAAAAAgACAAIAAwADgAPAA8AD8AP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD8AP/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwD/D/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAM/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwA/B/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAwAH////////AAcAPwB/Af8D/wf/D/8f/3////////////////////8="
 }
});
