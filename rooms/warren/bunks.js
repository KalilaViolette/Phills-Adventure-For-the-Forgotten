// bunks: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "bunks",
 "region": "warren",
 "w": 44,
 "h": 26,
 "music": "warren",
 "viewBottom": 416,
 "art": {
  "main": "art/warren/bunks.png#main",
  "pack": "art/warren/bunks.png",
  "parts": {
   "main": [
    0,
    0,
    704,
    416
   ],
   "L0": [
    0,
    416,
    954,
    565
   ],
   "L1": [
    0,
    981,
    954,
    420
   ],
   "L2": [
    0,
    1401,
    855,
    452
   ]
  },
  "layers": [
   {
    "src": "art/warren/bunks.png#L0",
    "f": 1.35
   },
   {
    "src": "art/warren/bunks.png#L1",
    "f": 1.35,
    "fy": 1.0
   },
   {
    "src": "art/warren/bunks.png#L2",
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
   "id": "lane",
   "edge": "left",
   "a": 224,
   "b": 288,
   "to": "mendlane",
   "toDoor": "bunks",
   "x": 24.0,
   "y": 288,
   "f": 1
  }
 ],
 "items": [
  {
   "id": "button_bunks_0",
   "x": 264,
   "y": 288,
   "kind": "button"
  },
  {
   "id": "button_bunks_1",
   "x": 480,
   "y": 288,
   "kind": "button"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "#.......................................####",
  "#.......................................####",
  "#.......................................####",
  "#.......................................####",
  "#.......................................####",
  "#.....=========.....=========...........####",
  "#.........................................##",
  "#.........................................##",
  "......=========.....=========.............##",
  "..........................................##",
  "..........................................##",
  "......=========.....=========.............##",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################"
 ],
 "mapAt": [
  276,
  154
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.56,
  "tint": "#0c0810",
  "lights": [
   [
    160,
    128,
    70,
    0.6
   ],
   [
    608,
    240,
    50,
    0.5
   ],
   [
    272,
    273,
    84,
    0.85
   ],
   [
    509,
    106,
    16,
    0.4
   ],
   [
    33,
    103,
    16,
    0.4
   ],
   [
    261,
    110,
    16,
    0.4
   ],
   [
    238,
    106,
    16,
    0.4
   ],
   [
    518,
    106,
    16,
    0.4
   ],
   [
    64,
    103,
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
   "x": 504.0,
   "y": 288,
   "f": -1,
   "post": "bunks"
  },
  {
   "kind": "fleece",
   "x": 296.0,
   "y": 288,
   "f": -1
  }
 ],
 "sickbay": {
  "x": 616.0,
  "y": 288,
  "f": -1
 },
 "bunkspots": [
  [
   164,
   224,
   1
  ],
  [
   212,
   176,
   1
  ],
  [
   388,
   176,
   1
  ],
  [
   436,
   224,
   1
  ],
  [
   152,
   272,
   1
  ],
  [
   376,
   272,
   1
  ]
 ],
 "signs": [
  {
   "x": 600,
   "y": 168,
   "text": "sick bay. don't touch",
   "c": "#c8322c"
  }
 ],
 "patientspots": [
  [
   72.0,
   288,
   1
  ]
 ],
 "foes": [],
 "detail": {
  "tiles": [
   222,
   223,
   224,
   229,
   230,
   231,
   233,
   234,
   235,
   236,
   237,
   238,
   239,
   242,
   248,
   249,
   251,
   252,
   253,
   254,
   256,
   264,
   265,
   269,
   270,
   272,
   273,
   276,
   277,
   278,
   280,
   281,
   285,
   286,
   287,
   288,
   289,
   290,
   292,
   294,
   295,
   298,
   299,
   300,
   302,
   303,
   308,
   309,
   347,
   352,
   353,
   391,
   435,
   436,
   440,
   441,
   479,
   485,
   524,
   525,
   528,
   569,
   613,
   614,
   657,
   658,
   702,
   745,
   781,
   782,
   783,
   784,
   788,
   789
  ],
  "bits": "//////////////////////////////////////wfAAD///////////////////////////////////////8PwP///////////////////////////////////////wA//////////////////////////////////////////wD//////////////////////////////////////wAAAP///////////////////////////////////////wDx/////////////////////////////////////////+D///////////////////////////////////////8H/////////////////////////////////////////8D/////////////////////////////////////////+B//////////////////////////////////////////+P/////////////////////////////////////8DwAA////////////////////////////////////////A//////////////////////////////////////////5/////////////////////////////////////////P/w//////////////////////////////////////8fAAH///////////////////////////////////////+//////////////////////////////////////////4/////////////////////////////////3/8D/gP4A8AD/////////////////////////////////////////B/////////////////////////////////////////4P/////////////////////////////v/+//7//v/+//7//P/A+ADgAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAAH/AA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4B8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8P/wH/AH8APwAfAAcABwADAAMAAQABAAEAAQABAAH//v///////////////////////////////////////wAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAD//////////v/+//z//P/8//z//v/+//7//v/+//7//oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////////////3//f/9//////////////////v/+//7//v/+//////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAAAAAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAD///////9//3//P/8//z//P/8//x//D/8D/wD/AAEAAP///////////////////////////////////////z///////////////v/+//7//v/+//7//v/+//7///////8A/wA/AB8ADwAHAAcABwADAAMAAQABAAEAAwADAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////9//3//f/9//3////////////////////8AAQABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/9//3//f/8//3//f/8AAAAAAAAAAQABAAEAAQABAAEAAwADAAMAAwABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4D8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAEAAQADAAcADwAfAB8APwB/AP8B/wP/D////w=="
 }
});
