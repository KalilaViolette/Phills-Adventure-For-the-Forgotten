// maintunnel: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "maintunnel",
 "region": "warren",
 "w": 64,
 "h": 26,
 "music": "warren",
 "viewBottom": 416,
 "art": {
  "main": "art/warren/maintunnel.webp#main",
  "pack": "art/warren/maintunnel.webp",
  "parts": {
   "main": [
    0,
    0,
    1024,
    416
   ],
   "L0": [
    0,
    416,
    1176,
    80
   ],
   "L1": [
    0,
    496,
    878,
    101
   ],
   "L2": [
    0,
    597,
    950,
    412
   ]
  },
  "layers": [
   {
    "src": "art/warren/maintunnel.webp#L0",
    "f": 1.35,
    "x": 107,
    "y": 389
   },
   {
    "src": "art/warren/maintunnel.webp#L1",
    "f": 1.35,
    "fy": 1.0,
    "x": 163
   },
   {
    "src": "art/warren/maintunnel.webp#L2",
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
   "id": "chest",
   "edge": "left",
   "a": 240,
   "b": 304,
   "to": "chest",
   "toDoor": "tunnel",
   "x": 24.0,
   "y": 304,
   "f": 1
  },
  {
   "id": "square",
   "edge": "right",
   "a": 240,
   "b": 304,
   "to": "townsquare",
   "toDoor": "tunnel",
   "x": 1000.0,
   "y": 304,
   "f": -1
  },
  {
   "id": "shop",
   "edge": "bottom",
   "a": 288,
   "b": 352,
   "to": "moleshop",
   "toDoor": "tunnel",
   "x": 312.0,
   "y": 400,
   "f": 1,
   "keepX": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################",
  "################################################################",
  "##############################.......###########################",
  "##############################.......###########.......#########",
  "##############################.......###########.......#########",
  "#.............................=======..........................#",
  "#..............................................................#",
  "#..............................................................#",
  "#..............................................................#",
  "................................................................",
  "................................................................",
  "................................................................",
  "................................................................",
  "##################====##########################################",
  "##################....##########################################",
  "##################....##########################################",
  "##################====##########################################",
  "##################....##########################################",
  "##################....##########################################",
  "##################====##########################################"
 ],
 "mapAt": [
  108,
  150
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.56,
  "tint": "#0c0810",
  "lights": [
   [
    816,
    160,
    90,
    0.9
   ],
   [
    528,
    160,
    60,
    0.6
   ],
   [
    160,
    240,
    50,
    0.4
   ],
   [
    400,
    205,
    72,
    0.75
   ],
   [
    688,
    205,
    72,
    0.75
   ],
   [
    816,
    164,
    84,
    0.85
   ],
   [
    424,
    185,
    16,
    0.4
   ],
   [
    140,
    180,
    16,
    0.4
   ],
   [
    937,
    188,
    16,
    0.4
   ],
   [
    699,
    188,
    16,
    0.4
   ],
   [
    467,
    188,
    16,
    0.4
   ],
   [
    740,
    182,
    16,
    0.4
   ],
   [
    755,
    186,
    16,
    0.4
   ],
   [
    223,
    180,
    16,
    0.4
   ],
   [
    720,
    190,
    16,
    0.4
   ],
   [
    169,
    189,
    16,
    0.4
   ],
   [
    652,
    182,
    16,
    0.4
   ],
   [
    284,
    180,
    16,
    0.4
   ],
   [
    103,
    184,
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
   "kind": "army",
   "x": 536.0,
   "y": 176,
   "f": -1
  },
  {
   "kind": "pip",
   "x": 56.0,
   "y": 304,
   "f": 1
  }
 ],
 "train": {
  "x0": 48,
  "x1": 976,
  "y": 304
 },
 "signs": [
  {
   "x": 208,
   "y": 224,
   "text": "no wet toys past here",
   "c": "#3a5aa0"
  },
  {
   "x": 752,
   "y": 224,
   "text": "lights out at sundown",
   "c": "#c8322c"
  }
 ],
 "foes": [],
 "detail": {
  "tiles": [
   479,
   480,
   481,
   482,
   542,
   543,
   548,
   561,
   562,
   565,
   566,
   612,
   624,
   625,
   627,
   629,
   630,
   631,
   644,
   645,
   646,
   647,
   648,
   649,
   650,
   651,
   652,
   653,
   654,
   656,
   657,
   658,
   660,
   661,
   662,
   663,
   664,
   665,
   668,
   669,
   677,
   678,
   680,
   681,
   682,
   683,
   684,
   685,
   686,
   687,
   695,
   696,
   697,
   698,
   700,
   701,
   705,
   706,
   707,
   709,
   710,
   711,
   712,
   713,
   714,
   716,
   717,
   718,
   719,
   721,
   722,
   723,
   724,
   725,
   727,
   729,
   730,
   731,
   743,
   744,
   747,
   749,
   760,
   761,
   762,
   763,
   764,
   765,
   766,
   768,
   769,
   830,
   831,
   832,
   894,
   895,
   1157,
   1158,
   1159,
   1160,
   1161,
   1162,
   1163,
   1164,
   1165,
   1166,
   1167,
   1168,
   1175,
   1176,
   1177,
   1178,
   1179,
   1180,
   1181,
   1182,
   1183,
   1184,
   1185,
   1186,
   1187,
   1188,
   1189,
   1190,
   1191,
   1192,
   1193,
   1195,
   1196,
   1197,
   1198,
   1199,
   1200,
   1201,
   1202,
   1203,
   1204,
   1205,
   1206,
   1207,
   1208,
   1209,
   1210,
   1211,
   1212,
   1233,
   1238,
   1297,
   1302,
   1361,
   1366,
   1425
  ],
  "bits": "/////////////////////////////////////////gD/////////////////////////////////////////8P/////////////////////////////////////////4//////////////////////////////////////H/AAD////4/+D/APwA+AD4APAA4ADAAMAAgACAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/8B/wB/AB8ADwAHAAcAAwADAAMAAwABAAEAAAAAAAD/////////////////////////////////////////8P///////////////////////////////////////wH///////////////////////////////////////////7/////////////////////////////////////J/8H/wAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQAB////+P+A+ADwAOAA4ADAAMAAwACAAIAAgAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wD/AH8AHwAfAA8ABwAHAAMAAwABAAEAAAAAAAAAAP////////////////////////////////////9//3////////////////////////////////////////////D///////////////////////////////////////8Af/////////////////////////////////////////wP//////////////////////////////////////////7/////////////////////////////////////4P8AH/////////////////////////////////////////j///////////////////////////////////////////D///////////////////////////////////////8B/P///////////////////////////////////////wf///////////////////////////////////////////z///////////////////////////////////////8B/////////////////////////////////////////v/g////////////////////////////////////////A//////////////////////////////////////////gH////////////////////////////////////////8D/////////////////////////////////////////+AD//////////////////////////////////////+cAAP///////////////////////////////////////3/8/////////////////////////////////////wA/AAD///////////////////////////////////////8B////////////////////////////////////////+fgA///////////////+//7//v/8//z/+P/g/8D+APAAAAD///////9//3//P/8//z//P/8//z//H/8f/w//B/8AAP///////////////////////////////////////3///////////////////////////////////////////gD///////////////////////////////////////8cAP///////////////////////////////////////wAB//////////////////////////////////////////D/////////////////////////////////////f/8ABP///////////////////////////////////////wB////////////////////////////////////////A8AD////////////+//7//P/8//z//P/4//j/4P+AAAAAAD//P/8//z//P/8//z//H/8f/w//D/8H/wf/Af8AfwAA////////////////////////////////////////AD////////////////////////////////////////H/gP///////////////////////////////////////z///////////////////////////////////////////+D///////////////////////////////////////8P///4/+D/APgA8ADgAMAAgACAAAAAAAAAAAAAAAAAAAAAcD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////Af8AfwA/AB8ADwAPAA8ADwAHAAcABwAHAAMAA//+//7//v/+//7//v//////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgAAAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////////////3//f/9//3////////////7//v/+//7//v/+//z//P/+//7///////8AAAAAAAAAAQABAAEAAQABAAEAAAAAAAAAAAAAAAAAAP///////////////////////////////3//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4f////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/D//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/z///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+D/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD8P/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP/w//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4H/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA//D/8P/8//7//v/////////////////////////+//7//w//P/9//3///////////////////////////////////////////////////////////////v/+//7//v/+//7///////////////////////////////9//3//f/9////+//7/////////////////////////////////////f/9//3//f/9//3//f/9////////////////////////////+//7//v/+//////////7//v/+//7//////////w=="
 }
});
