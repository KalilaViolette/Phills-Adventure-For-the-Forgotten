// ferns: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "ferns",
 "region": "rootwood",
 "w": 64,
 "h": 26,
 "music": "rootwood",
 "viewBottom": 416,
 "art": {
  "main": "art/rootwood/ferns.png#main",
  "pack": "art/rootwood/ferns.png",
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
    1394,
    560
   ],
   "L1": [
    0,
    976,
    1319,
    532
   ],
   "L2": [
    0,
    1508,
    1236,
    500
   ],
   "L3": [
    0,
    2008,
    1144,
    464
   ],
   "L4": [
    0,
    2472,
    1335,
    544
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/ferns.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/ferns.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/ferns.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/ferns.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/ferns.png#L4",
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
   "id": "oak",
   "edge": "right",
   "a": 224,
   "b": 352,
   "to": "oakfall",
   "toDoor": "west",
   "x": 1000.0,
   "y": 352,
   "f": -1
  },
  {
   "id": "moss",
   "edge": "left",
   "a": 160,
   "b": 224,
   "to": "mossbank",
   "toDoor": "ferns",
   "x": 24.0,
   "y": 224,
   "f": 1
  },
  {
   "id": "down",
   "edge": "bottom",
   "a": 320,
   "b": 416,
   "to": "grimepool",
   "toDoor": "up",
   "x": 352,
   "y": 336,
   "f": 1,
   "keepX": true,
   "falling": true
  },
  {
   "id": "oakwest",
   "edge": "top",
   "a": 928,
   "b": 992,
   "to": "westdrop",
   "toDoor": "ferns",
   "x": 952.0,
   "y": 288,
   "f": 1,
   "keepX": true,
   "falling": true,
   "needs": "velcro"
  }
 ],
 "items": [
  {
   "id": "acorn_f5",
   "x": 88,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_f9",
   "x": 152,
   "y": 224,
   "kind": "acorn"
  },
  {
   "id": "acorn_f34",
   "x": 552,
   "y": 352,
   "kind": "acorn"
  },
  {
   "id": "acorn_f52",
   "x": 840,
   "y": 352,
   "kind": "acorn"
  }
 ],
 "hints": [
  {
   "text": "the oak's bark. he can't climb it. not yet",
   "l": 864,
   "t": 64,
   "r": 992,
   "b": 320,
   "x": 928,
   "y": 192,
   "until": "velcro"
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##########################################################....##",
  "##########################################################....##",
  "##########################################################....##",
  "##########################################################....##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "##............................................................##",
  "..............................................................##",
  "..............................................................##",
  "..............................................................##",
  "..............................................................##",
  "############....................................................",
  "############....................................................",
  "############....................................................",
  "############....................................................",
  "####################....................................======..",
  "####################======......................................",
  "####################............................................",
  "####################............................................",
  "####################......######################################",
  "####################......######################################",
  "####################......######################################",
  "####################......######################################"
 ],
 "mapAt": [
  -64,
  84
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.42,
  "lights": [
   [
    472,
    345,
    46,
    0.55
   ],
   [
    476,
    342,
    46,
    0.55
   ],
   [
    484,
    347,
    46,
    0.55
   ]
  ]
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "grip": [
  [
   62,
   0,
   62,
   13
  ]
 ],
 "wildlife": [
  {
   "kind": "deer",
   "at": "L2",
   "x0": 160,
   "x1": 672,
   "y": 266
  },
  {
   "kind": "hedgehog",
   "at": "back",
   "x0": 448,
   "x1": 896,
   "y": 352
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 480,
   "x1": 960,
   "y": 352,
   "every": [
    30,
    70
   ]
  }
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 584.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "cap",
   "x": 808.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "spinner",
   "x": 712.0,
   "y": 240,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   194,
   195,
   196,
   198,
   199,
   200,
   202,
   203,
   204,
   206,
   207,
   209,
   210,
   212,
   213,
   214,
   216,
   218,
   219,
   220,
   221,
   223,
   224,
   225,
   226,
   227,
   228,
   229,
   230,
   231,
   232,
   233,
   234,
   235,
   236,
   239,
   240,
   242,
   243,
   245,
   246,
   247,
   249,
   258,
   260,
   261,
   265,
   266,
   267,
   268,
   269,
   270,
   271,
   272,
   273,
   274,
   275,
   276,
   277,
   279,
   280,
   281,
   282,
   283,
   284,
   286,
   287,
   288,
   290,
   291,
   292,
   296,
   297,
   299,
   300,
   301,
   302,
   303,
   304,
   305,
   306,
   307,
   308,
   309,
   310,
   311,
   312,
   313,
   321,
   322,
   385,
   450,
   513,
   835,
   839,
   907,
   1099,
   1100,
   1101,
   1102,
   1103,
   1104,
   1105,
   1106,
   1171,
   1235,
   1299,
   1363,
   1371,
   1372,
   1373,
   1374,
   1375,
   1376,
   1380,
   1381,
   1382,
   1383,
   1384,
   1385,
   1386,
   1387,
   1388,
   1389,
   1390,
   1391,
   1392,
   1393,
   1394,
   1399,
   1400,
   1401,
   1402,
   1403,
   1404,
   1428,
   1434
  ],
  "bits": "/////////////////////////////////////////4D///////////////////////////////////////8f/P///////////////////////////////////////wB/////////////////////f/4//j/8H/wH/Af4A/gDAAD///////////////////////////////////////8A/v/////////////////////////////////////gfwAP//////////////////////8//j/+P/wf/B/4D/gM+AD/////////////////////////////////////P/8P//////////////////////////////////5//H/8Ofgg//////////////////////////////////////////j/////////////////////////////////////8f8Af////////////////////////////////////////v/+/////////////////////////////////////x//H/////////////////////////////////////////8P//////////////////////////////////////////4A////////////////////////////////////////fw//////////////////////////////8//x/+AD4AHgAP/////////////////////////////z/+H/4OHgAOAA////////////////////////////////9//h/2A/AAf///////////////////////////////////////j/8P////////////////////////////////////8ADwAD/////////////////////////////////////////+////////////////////////////////////////7/wP////////////////////////////fjh+AD4AEAAAAA/////////////////////////////////////7//P///////////////////////////////////////////wP///////////////////////////////////////x////////////////////////////////////////8HAAD////////////////////////////3/8D/gP8A/AAAAP////////////////////////////8//x//B/8D/wAA/////////////////////////////////////wf/Af/////////////////////////////////////////+B/////////////////////////////////////////gB///////////////////////////////////////7//D///////////////////////////////////////8A/////////////////////////////////////////v/4///////////////////////////////////////9//3/////////////////////////////////////////uP///////////////////////////////////////wA///////////////////////////////////////n/wD///////////////////////////////////////gD4AP////////////////////////////////////8B/wB///////////7//////////v/+//7//v/8//j/8P/g/gD8APgA8ADgAMAAwACAAIAAgACAAIAAgACAAIAAgACAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8D/gD4AHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//P/8AYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//DwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwfAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7/wD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/wP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4/wB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8ADwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAOAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//wH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4D/AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/w/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//AfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//D+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//x//A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/A/ABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8H8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////////////////7//oAAwADAAMAAwADAAMAAgACAAIAAgAAAAAAAAAAAAAAA//7//v/+//////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAP/////////+//7//v/+//7//v/+//7//v/+////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAD/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAP+P/w//z//v/+///////////////////////////////////////////////////////+//7///////////////8AAAAAAAAAAIAAwADgAOAA8AD4APwA/gD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAPwA//H//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/A//7///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA4AD+AP/w//z//v/+//////////////////////////////////////////7//v/+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/////////////////+//7//v/+//7//v/+//7/////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABwA/AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP/8/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/AD/gP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAA8AfwP/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/z//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAP////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHz//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8f//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAPwA/wD/4P/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/gP/4AAAAAAAAgACAAIAAgACAAMAAwADAAMAA4ADgAMAAgAAP/z//f/9//////////////////////////////////w=="
 }
});
