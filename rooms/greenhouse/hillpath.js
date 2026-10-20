// hillpath: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "hillpath",
 "region": "greenhouse",
 "w": 60,
 "h": 24,
 "music": "wind",
 "viewBottom": 384,
 "art": {
  "main": "art/greenhouse/hillpath.png#main",
  "pack": "art/greenhouse/hillpath.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    384
   ],
   "L0": [
    0,
    384,
    1386,
    556
   ],
   "L1": [
    0,
    940,
    1300,
    522
   ],
   "L2": [
    0,
    1462,
    1204,
    484
   ],
   "L3": [
    0,
    1946,
    1098,
    441
   ],
   "L4": [
    0,
    2387,
    1252,
    503
   ]
  },
  "layers": [
   {
    "src": "art/greenhouse/hillpath.png#L0",
    "f": 0.12
   },
   {
    "src": "art/greenhouse/hillpath.png#L1",
    "f": 0.3
   },
   {
    "src": "art/greenhouse/hillpath.png#L2",
    "f": 0.5
   },
   {
    "src": "art/greenhouse/hillpath.png#L3",
    "f": 0.72
   },
   {
    "src": "art/greenhouse/hillpath.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/greenhouse/greenhouse_sprites.png",
   "art/greenhouse/greenhouse_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/greenhouse/greenhouse_items.png"
 },
 "doors": [
  {
   "id": "playground",
   "edge": "bottom",
   "a": 320,
   "b": 384,
   "to": "jungle",
   "toDoor": "greenhouse",
   "x": 424.0,
   "y": 320,
   "f": 1,
   "exitOnly": false
  },
  {
   "id": "door",
   "edge": "right",
   "a": 96,
   "b": 160,
   "to": "frontdoor",
   "toDoor": "hill",
   "x": 936.0,
   "y": 160,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "seed_hillpath_top_0",
   "x": 880.0,
   "y": 160,
   "kind": "seed"
  },
  {
   "id": "seed_hillpath_top_1",
   "x": 888.0,
   "y": 160,
   "kind": "seed"
  },
  {
   "id": "seed_hillpath_top_2",
   "x": 896.0,
   "y": 160,
   "kind": "seed"
  }
 ],
 "hints": [
  {
   "text": "the greenhouse. bramble's grown right down the hill",
   "l": 288,
   "t": 160,
   "r": 544,
   "b": 336,
   "x": 448,
   "y": 224,
   "until": "enteredGreenhouse"
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##........................................................##",
  "##........................................................##",
  "##........................................................##",
  "##........................................................##",
  "##........................................................##",
  "##........................................................##",
  "##..........................................................",
  "##..........................................................",
  "##..........................................................",
  "##..........................................................",
  "##..................................................########",
  "##..................................................########",
  "##..................................................########",
  "##..............................................############",
  "##..........................................#^^#############",
  "##......................................####################",
  "##......................................####################",
  "##..................................#^^#####################",
  "##..............................############################",
  "##..........................################################",
  "####################....####################################",
  "####################....####################################",
  "####################....####################################",
  "####################....####################################"
 ],
 "mapAt": [
  1140,
  16
 ],
 "floor": "grass",
 "shade": {
  "a": 0.04,
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
   "x0": 64,
   "x1": 320,
   "y": 320,
   "every": [
    12,
    30
   ]
  },
  {
   "kind": "butterfly",
   "at": "back",
   "x0": 480,
   "x1": 800,
   "y": 224,
   "every": [
    20,
    50
   ]
  },
  {
   "kind": "hawk",
   "at": "L1",
   "x0": 0,
   "x1": 1300,
   "y0": 20,
   "y1": 70,
   "every": [
    60,
    130
   ]
  }
 ],
 "foes": [
  {
   "kind": "packet",
   "x": 536.0,
   "y": 288,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1,
   61,
   122,
   182,
   242,
   301,
   302,
   361,
   362,
   421,
   422,
   482,
   541,
   602,
   652,
   662,
   769,
   770,
   771,
   781,
   827,
   841,
   842,
   881,
   882,
   883,
   901,
   902,
   940,
   961,
   999,
   1000,
   1021,
   1022,
   1053,
   1054,
   1055,
   1081,
   1082,
   1109,
   1110,
   1111,
   1141,
   1142,
   1143,
   1144,
   1145,
   1146,
   1147,
   1148,
   1149,
   1150,
   1151,
   1152,
   1153,
   1154,
   1155,
   1156,
   1157,
   1158,
   1165,
   1166,
   1167,
   1219,
   1224
  ],
  "bits": "/////////////////////////////////////v/+//7//v/8//z//P/8//z//P/8//z//P/+//7//v/+/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAMAAwACAAIAAgACAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgADAAMAAwACAAIAAgACAAP///////v/+//7//v/+////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgAD////////////////////+//7//v/8//z//P/8//z//IAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7//v/+//7///////////////////////////////8AAAAAAAAAAAAAAAAAAIAAgACAAIAAwADAAMAAwADAAMAA4ADgAOAA4ADgAMAAwACAAIAAAAAAAAAAAAAAAAAA//////////7//v/+//7//v/+//////////////////8AAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAA//P/9//3//////////////////////////////////gACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////AAAAAAAAAAAAAAAAAAEAAQAHAA8ADwAf//////////////////////////////////7//v/+//7//v/+//7//gADAA8AHwAfAD8AfwB/AP8B/wP/A/8H/w//D/8f/3////7//v////////////////////////////////////8AAAAAAAAAAAAAAACAAIAAgADAAMAAwACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAADAAcADwA/AP8B/wf///8ADwB/Af8D/w//P/9//////////////////////////////////////////////////////////v/+//7//v/+wADAAMAAwADAAMAAgACAAAAAAAAAAAAAAAAAAAAAAAAP/z//f/9////////////////////////////////////+//7//v/+//7//v/+//7//v/+//7//v/+//7//v/+AAAAAAAAAAAAAAAGAA8ADwAfAD8APwD/Af8D/w//H/////////9//3//f/9//z//f/9//3//f/9////////////+//7//v/+//7/////////////////////////////AAAAAAAAAAAAAAAAAAAAAIAAgADAAMAA4ADgAMAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAB8A/wAAAAAAAAAAAAAAAAAAAAAAAAABAAMAB3//////////AA8APwD/Af8H/w//H/8//////////////////////////////////v/+//7//v/+//7//v/+//7//v/+//7//oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcADwB/AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAB//v//////////wAHAD8AfwH/A/8H/w//H/9///////////////////////7//v/+//////////////////////////////////8AAEAA4ADwAPgA/AD8AP4A/wD/gP/A/8D/8P/4/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQA/D///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAH/8/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAD+AP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAHwD/B/8AAAAAAAAAAAAAAAAAAAAAAAAAAAH/H////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAgAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD4AP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAcADwB/P////wAHAD8A/wH/A/8P/x//P/9///////////////////////D//P/+//7///////////////////////////////8P/z//f/9//////////////////////////////////w=="
 }
});
