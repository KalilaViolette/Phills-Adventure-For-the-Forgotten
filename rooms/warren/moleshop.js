// moleshop: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "moleshop",
 "region": "warren",
 "w": 44,
 "h": 26,
 "music": "warren",
 "viewBottom": 416,
 "art": {
  "main": "art/warren/moleshop.webp#main",
  "pack": "art/warren/moleshop.webp",
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
    745,
    75
   ],
   "L1": [
    0,
    491,
    82,
    73
   ],
   "L2": [
    0,
    564,
    694,
    412
   ]
  },
  "layers": [
   {
    "src": "art/warren/moleshop.webp#L0",
    "f": 1.35,
    "x": 65,
    "y": 394
   },
   {
    "src": "art/warren/moleshop.webp#L1",
    "f": 1.35,
    "fy": 1.0,
    "x": 259
   },
   {
    "src": "art/warren/moleshop.webp#L2",
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
   "id": "tunnel",
   "edge": "top",
   "a": 160,
   "b": 224,
   "to": "maintunnel",
   "toDoor": "shop",
   "x": 184.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "##########....##############################",
  "##########....##############################",
  "##########====##############################",
  "##########....##############################",
  "##########....##############################",
  "##########====##############################",
  "##########....##############################",
  "##########....##############################",
  "##........====............................##",
  "##........................................##",
  "##........................................##",
  "##........====............................##",
  "##........................................##",
  "##........................................##",
  "##........====............................##",
  "##======..................................##",
  "##........................................##",
  "##........====............................##",
  "##........................................##",
  "##........................................##",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "############################################"
 ],
 "mapAt": [
  116,
  176
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.56,
  "tint": "#0c0810",
  "lights": [
   [
    272,
    240,
    90,
    0.85
   ],
   [
    480,
    224,
    70,
    0.6
   ],
   [
    352,
    274,
    84,
    0.85
   ],
   [
    443,
    138,
    16,
    0.4
   ],
   [
    488,
    138,
    16,
    0.4
   ],
   [
    264,
    131,
    16,
    0.4
   ],
   [
    147,
    134,
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
   "kind": "mole",
   "x": 392.0,
   "y": 320,
   "f": -1,
   "after": "moleHome"
  }
 ],
 "molehill": {
  "x": 536.0,
  "y": 320,
  "name": "the mole's workshop, in the warren"
 },
 "signs": [
  {
   "x": 528,
   "y": 248,
   "text": "knock",
   "c": "#3a5aa0"
  }
 ],
 "patientspots": [
  [
   456.0,
   320,
   -1
  ]
 ],
 "foes": [],
 "detail": {
  "tiles": [
   141,
   146,
   186,
   190,
   273,
   277,
   310,
   311,
   312,
   314,
   315,
   316,
   317,
   321,
   322,
   326,
   328,
   330,
   331,
   332,
   333,
   334,
   335,
   336,
   338,
   339,
   340,
   341,
   345,
   346,
   347,
   348,
   354,
   357,
   358,
   368,
   369,
   371,
   373,
   380,
   381,
   385,
   386,
   387,
   388,
   390,
   391,
   392,
   393,
   398,
   437,
   441,
   481,
   482,
   485,
   486,
   526,
   529,
   570,
   573,
   614,
   617,
   618,
   658,
   702,
   706,
   746,
   749,
   790,
   793,
   794,
   833,
   834,
   838,
   839,
   840,
   841,
   842,
   843,
   844,
   845,
   846,
   847,
   848,
   850,
   851,
   852,
   853,
   854,
   855,
   856,
   862,
   866,
   867,
   871,
   872,
   873,
   874,
   875,
   876,
   877
  ],
  "bits": "//////////7//v/+//7//v/+//7//v/+//7///////////////9//3//f/9//3//f/9//3//f////////////wAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA////////////////f/9//3//f/9//3//f////////////v/8//z//P/8//z//P/8//z//P/8//7//v/+//7//gABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAA///////////////////////////////////////w/8D/////////////////////////////////////P/8AAP///////////////////////////////////////x////////////////////////////////////////////z/////////////////////////////////////zwAAAP////////////////////////////////////9gAQAA//7//////////v/+//7//P/4//D/4P/A/wD4AMAAAAAAAAABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/8//z//H/8P/wf/A/8A/wA///////////////////////////////////////h/wA/////////////////////////////////////////wAP/////////////////////////3/wP+AfwA/AD4AIgA////////////////////////////////x/8B/wA/AB/////////////////////////////////////////4Af////////////////////////////////////////+A////////////////////////////////////////B//////////////////////////////////////////4AP////////////////////////////////j/8P/w/wD////////////////////////////////////////g/AD///////////////////////////////////////8D////////////////////////////////////////8OAA////////////////////////////////9//j/+P/A////////////////////////////////////v/+//zh/P//////////////////////////f/8f/w//B/8D/wH//////////////////////////////f/4/5D/AP8A/gD/////////////////////////////P/8//z/nP8M/wf+A/wD+APgA8ADgAMAAwACAAIAAgACAAIAAwADAAIAAf/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//B4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8B/wB/AD8AHwAPAAcABwAHAAMAAwABAAEAAAAAAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAEAAQAB/////////////////////////////////////v/+//4AAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////////////////////f/9//3//f/9//3////7//v/+//7///////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgAAAAH////////////////////////////////////////////////////////////////////7//v/+//7//v/+//7/////////////////////////////f/9//3//f/9///////////////////////////////////////7//v/+f/9//3//P/8//z//P/8//3//f/9//////////////////v/+//7//v/+/////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAA////////////////f/9//3//f/9//3//f/9//3//f/9//z//P/8//z//P/9//3//f/9//////////////////4AAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////f/9//3//f/9//3//f/9//3//f/////////////////7//v/+//7//v/+//7//v/8//z//n//P/8//z//P/8//z//P/9//3//f/9//3//f/9//3////7//v/+//7//v/+//////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAQABAAEAAAAAAAAAAQABAAEAAQABf/9//3////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAwADgAOAA8AD8AP/A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+H//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+OD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/w//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAB8H/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8f////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAQABAAMABwAPAB+AH////////w=="
 }
});
