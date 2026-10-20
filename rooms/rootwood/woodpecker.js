// woodpecker: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "woodpecker",
 "region": "rootwood",
 "w": 56,
 "h": 24,
 "music": "rootwood",
 "viewBottom": 384,
 "art": {
  "main": "art/rootwood/woodpecker.png#main",
  "pack": "art/rootwood/woodpecker.png",
  "parts": {
   "main": [
    0,
    0,
    896,
    384
   ],
   "L0": [
    0,
    384,
    1378,
    556
   ],
   "L1": [
    0,
    940,
    1280,
    522
   ],
   "L2": [
    0,
    1462,
    1172,
    484
   ],
   "L3": [
    0,
    1946,
    1052,
    441
   ],
   "L4": [
    0,
    2387,
    1168,
    503
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/woodpecker.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/woodpecker.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/woodpecker.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/woodpecker.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/woodpecker.png#L4",
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
   "id": "well",
   "edge": "left",
   "a": 160,
   "b": 224,
   "to": "well",
   "toDoor": "woodpecker",
   "x": 24.0,
   "y": 224,
   "f": 1
  },
  {
   "id": "trail",
   "edge": "right",
   "a": 160,
   "b": 224,
   "to": "trail",
   "toDoor": "woodpecker",
   "x": 872.0,
   "y": 224,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "cotton_woodpecker",
   "x": 488.0,
   "y": 112,
   "kind": "cotton",
   "needs": "flap"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [
  {
   "kind": "scene",
   "name": "woodpecker",
   "flag": "sawWoodpecker",
   "l": 288,
   "t": 0,
   "r": 432,
   "b": 224
  }
 ],
 "spawn": null,
 "tiles": [
  "########################################################",
  "########################################################",
  "########################################################",
  "............................######......................",
  ".................................#......................",
  ".................................#......................",
  ".................................#......................",
  "............................######......................",
  "............................######......................",
  "............................######......................",
  "........................................................",
  "........................................................",
  "........................................................",
  "........................................................",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################",
  "########################################################"
 ],
 "mapAt": [
  206,
  126
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.42,
  "lights": [
   [
    210,
    190,
    110,
    1.0
   ],
   [
    214,
    194,
    110,
    1.0
   ]
  ]
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "rest": {
  "x": 200.0,
  "y": 224
 },
 "woodpecker": {
  "x": 440.0,
  "y": 112
 },
 "breaks": [
  {
   "id": "hardLog",
   "x0": 43,
   "y0": 7,
   "x1": 47,
   "y1": 13,
   "hp": 1,
   "look": "log",
   "need": "charged"
  }
 ],
 "grip": [
  [
   28,
   7,
   28,
   9
  ]
 ],
 "wildlife": [
  {
   "kind": "hedgehog",
   "at": "back",
   "x0": 32,
   "x1": 416,
   "y": 224
  },
  {
   "kind": "squirrel2",
   "at": "L3",
   "x0": 90,
   "x1": 735,
   "y": 212
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 576,
   "x1": 672,
   "y": 224,
   "every": [
    15,
    35
   ]
  }
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 568.0,
   "y": 224,
   "f": -1
  },
  {
   "kind": "can",
   "x": 664.0,
   "y": 224,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   112,
   113,
   114,
   115,
   116,
   117,
   118,
   119,
   120,
   121,
   122,
   123,
   124,
   125,
   126,
   127,
   128,
   132,
   133,
   134,
   135,
   136,
   137,
   139,
   146,
   148,
   149,
   150,
   151,
   152,
   153,
   154,
   155,
   156,
   157,
   158,
   159,
   160,
   161,
   162,
   163,
   165,
   166,
   168,
   169,
   171,
   172,
   174,
   177,
   178,
   179,
   180,
   181,
   182,
   184,
   185,
   186,
   187,
   188,
   192,
   195,
   196,
   197,
   198,
   199,
   200,
   201,
   202,
   203,
   205,
   206,
   209,
   210,
   212,
   213,
   214,
   215,
   216,
   217,
   218,
   219,
   220,
   221,
   222,
   223,
   258,
   313,
   314,
   369,
   370,
   425,
   426,
   481,
   534,
   535,
   537,
   588,
   589,
   590,
   591,
   592,
   731,
   732,
   733,
   735,
   736,
   737,
   738,
   742,
   743,
   744,
   745,
   746,
   747,
   748,
   749,
   750,
   751,
   752,
   753,
   754,
   755,
   756,
   757,
   758,
   759,
   760,
   761,
   762,
   763,
   764,
   765,
   767,
   768,
   769,
   778,
   779,
   780
  ],
  "bits": "/////////////////////////////////////wP/AD///////////////////////////////////////////v//////////////////////////////////8A/AAAAA///////////////////////////////////////xAGH////////////////////////////////////////8A////////////////////////////////v/+/v78PvAc//////////////////////////9//z//P/8f9x/zD/H////////////////////////////////z/8H/wH+AAP////////////////////////////////////+H/wA///////////////////////////7//v/8/4z/iP8A/gD///////////////////////9//z//H/8f/x//H/8f//////////////////////////4P/gf8A5wDiAOAA4AD//////////////////////////P/wP4A/gD4APgA4AD//////////////////////////3//P/8f/x//D/8P//////////////////////////////////////////+A//////////////////////////////////////8/AA////////////////////////////////////////8Af//////////////////////////////////////////4//////////////////////////z/+P/g/4D/AP8AAAD/////////////////////f/8//z//H/8f/w//D/8AH//////////////////////////////////////AAAAA/////////////////////////////////////z//H//////////////////////////////////////////4D///////////////////////////////////////D4gH////////////////////////////////9//j/+AHwAP////////////////////////////+//z//P/4/+D4AP///////////////////////3//P/8f/x5/CD8APwAf////////////////////////////////////////+B//////////////////////////////////////////gP/////////////////////////////////////n/wD//////////////////////////////////////////x//////////////////////////////////////////8P///////////////////////////////v/+//z/+P/g////////////////////////////////f/8//zD/AH/////////////////////////////////////e/8z/wP//////////////////////////////+3/5P/gf+A/4///////////////////////////3/+P/w/+D/wP/Af/////////////////////////////////////////wD////////////////////////////////////////v+A///////////////////////////j/4P/Af8A/wC/AD/////////////////////////7//v/+//5//n/+f/4//////////////////////////////////////////AD////////////////////////////////////////v/8AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4M/AA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////HwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPn/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ADwAPAAcAAwADAAEAAAAAAAAAAAAAAAAAAAAAAAD//////////////////3//f/9//3//P/8f/w//B/8Afv/////////////////////////////////////AAAAA////////////////////////////////////+f/wOcD/////////////////////////////////////f/8///////////////////////////////////////////8H/////v/+//7//v/8//z//P/8//z//v/+///////////gAPAA8ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8H8AHwAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgACAAIAAgACAAIAAAAAAAAAAAAAAAIAAgACAAP/////////////////////////////////+//7//v/+gACAAMAAwADAAMAAwADAAIAAgAAAAAAAAAAAAAAAAAD//v/+//7//v//////////f/9//3///////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAIAAgADAAMAA///////////////////////+//7//v/8//z//P/8//yAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAP/+//7//v/+///////////////+//7//v/+//7//v/8/////////////////////////////////////////4D/////////////////////////////////////H/8Dv//8//z//P/+//7//v/+//7//v/+//7//P/4//D/4P4AH+AHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAB8A/x//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA//7///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA/8D//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4H//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//7/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwH///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/g//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHv///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AD/gP/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/w"
 }
});
