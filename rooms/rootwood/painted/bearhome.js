// bearhome: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "bearhome",
 "region": "rootwood",
 "w": 29,
 "h": 12,
 "music": "bear",
 "viewBottom": 192,
 "art": {
  "main": "art/rootwood/painted/bearhome.png#main",
  "pack": "art/rootwood/painted/bearhome.png",
  "parts": {
   "main": [
    0,
    0,
    464,
    192
   ],
   "L0": [
    0,
    192,
    565,
    234
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/painted/bearhome.png#L0",
    "f": 0.9
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
   "y": 141,
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
  ".............########........",
  "...........###########.......",
  ".............................",
  ".............................",
  ".............................",
  "............................#",
  "#...........................#",
  "#...........................#",
  "#...........................#",
  "#####...#####################",
  ".####...####################.",
  "...##...#.##............##..."
 ],
 "mapAt": [
  358,
  100
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.25,
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
  "x": 248.0,
  "y": 144
 },
 "bear": {
  "x": 320.0,
  "y": 144,
  "seat": 248.0,
  "tally": 200.0
 },
 "foes": [],
 "detail": {
  "tiles": [
   10,
   11,
   12,
   13,
   14,
   15,
   16,
   17,
   18,
   19,
   20,
   21,
   22,
   38,
   39,
   40,
   41,
   42,
   43,
   44,
   45,
   46,
   47,
   48,
   49,
   50,
   51,
   52,
   144,
   145,
   173,
   174,
   202,
   203,
   231,
   232,
   260,
   261,
   265,
   269,
   289,
   290,
   291,
   294,
   298,
   299,
   303,
   304,
   310,
   318,
   320,
   321,
   322,
   323,
   327,
   328,
   329,
   330,
   331,
   332,
   334,
   335,
   336,
   337,
   338,
   339,
   340,
   341,
   342,
   343,
   344,
   345,
   346,
   347
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAf/////wAAAAAAAAAAAAAAAAAAAAAAAAABH4P/////////////AAAAAAAAAAAA/gP/B/8///////////////////////8AAAAAAAAB/gf//////////////////////////////wAAAAAAAAAAgAfgP/z/////////////////////////AAAAAADgB/////////////////////////////////8AAAAAAADwAP4A/4D/4P///////////////////////wAAAAAABwAfAP8D/3//////////////////////////AAAAAP/A//j//P/+//////////////////////////8AAAAAAAAAAAAAAAAB/If//////////////////////wAAAAAAAAAAAAAAAAAAAADAAOAA+AD/4P/8//7/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAgPfB/8P/wf/A98AAAAAAAAAAAAAAAAAAAD/A/8H/x///////////////wAAAAAAAAAAAAAAAAAA////////////////////////AAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAP///////////////////////wAAAAAAAAAAAAAAAAAA////////////////////////AAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAP///////////////////////wAAAAAAAAAAAAAAAAAA////////////////////////AAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAP///////////////////////wAAAAAAAAAAAAAAAAAA////////////////////////AAAAAAAAAAAAAAAAAAD///////////////////////8AAAAAAAAAAAAAAAAAAOAA/wD//////////////////wAAAAAAAAAAAAAAAAAAAAAAAP4A/wD/gP+A/8D/gP8AAAAAAAAAAAAAAAAAAAABAAOAB8AHwAfgB/AH8Af4B/gH/Af8B/wH/Af8B/wH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABwAPgB/wH/Af8B/wH/Af8B/wH/Af8B/wH/Af8B/wH/Af8B/wH4A/gH+Af4D/gP+A/4D/gP+A/4D/gP+A/4D/gH+Af4Af8B/wH/Af8B/wH/Af8B/wH/Af8B/wH/Af8B/wH/Af8H+Af4B/gH+Af4B/gP+A/4D/gP+A/4D/gP+A/4D/gP+AH/Af8B/wH/Af8B/wH/Af8B/wH/Af8B/wH/Af8B/gH+D/gP+A/4D/gP+A/4D/gP+A/4D/gH+Af4B/gH+AP8A/4B/gH+Af4B/wH/Af8B/wH+Af4B/gH+Af8B/wH/A/8H/wP/wf/B/8D/wP/A/8B/wH/Af8B/wH/Af8B/wH/Af8A//8A/4D/wP/g//D/8P/w//D/8P/w//D/4P/g/+D/8P/wAP8B/wP/B/8P/w//D/8P/w//D/8P/wf/B/8H/w//D///+P/4//j/+P/4//j/+P/4//z//P/8//z//P/8//j/+AB/AD8AHwAPAA8ADwAPAA8ADwAPAA8ADwAPAAcAAwAA//////////////////////////////////////P/wf//8P/4//z//P/+//7//v/+//7//P/8//z/+P/4//j/+A//H/8//z//f/9//3//f/9//z//P/8//x//H/8f/x////////////////////////////////////////////X//////////////////////////////////////////v////////////////////////////////////8A/wAD//////////////////////////////////////////H/8P/g/8D/gP+A/wD/AP4A/gD+AP4A/AD8APgA8ADgAAD/AH8ABwADAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////z9+DxgAAAAAAAAAAAAAAAAAAAD//////////////////7//H/8P/w//D/8P/w//AAAAAP/4//z//P/+//7//v/////////+//7//P/8//wAAAAAH/8//z//f/x/+H/w//D/8P/wf/B/8D/wP/A/8AAAAAD/wP+A/gD8AHgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//f/9//z//P/8f/w//B/8D/wH+APgAAAAAAAAAAAAA//////////////////z/8P/AP4AAAAAAAAAAAAAAAAD///////7//P/4H/AP4AGAAAAAAAAAAAAAAAAAAAAAAP/88PgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9//z/BH4APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////3//P/8f/w/8B/AAwAAAAAAAAAAAAAAAAP//////////////+P/wP8AAAAAAAAAAAAAAAAAAAAAA//7/+P/w/+D/wH+AHwAAAAAAAAAAAAAAAAAAAAAAAAAP/wP/AP8AfwA/AA8AAAAAAAAAAAAAAAAAAAAAAAAAAP+A/wD+APwA+ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9//x//AH8APwAfAA8AAAAAAAAAAAAAAAAAAAAAAAD//////BH4APAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAP///////3//P/8f/w/DAAEAAAAAAAAAAAAAAAAAAAAA////////////////////////P/8H/wH/AP8AfwAAAAD//////////////////////////////////wf/AAAAAP////z/+P/w/+D/wP+A/wDwAOAAwACAAIAAAAAAAAAAz/8D/wH/AP8A/wB/AD4AAAAAAAAAAAAAAAAAAAAAAADgAOAAwADAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="
 }
});
