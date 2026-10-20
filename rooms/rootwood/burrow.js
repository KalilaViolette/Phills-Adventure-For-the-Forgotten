// burrow: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "burrow",
 "region": "rootwood",
 "w": 40,
 "h": 24,
 "music": "rootwood",
 "viewBottom": 384,
 "art": {
  "main": "art/rootwood/burrow.png#main",
  "pack": "art/rootwood/burrow.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    384
   ],
   "L0": [
    0,
    384,
    1348,
    556
   ],
   "L1": [
    0,
    940,
    1204,
    522
   ],
   "L2": [
    0,
    1462,
    1044,
    484
   ],
   "L3": [
    0,
    1946,
    868,
    441
   ],
   "L4": [
    0,
    2387,
    836,
    503
   ],
   "L5": [
    0,
    2890,
    756,
    414
   ],
   "L6": [
    0,
    3304,
    836,
    503
   ],
   "L7": [
    0,
    3807,
    836,
    388
   ],
   "L8": [
    0,
    4195,
    964,
    580
   ],
   "L9": [
    0,
    4775,
    964,
    388
   ],
   "front": [
    0,
    5163,
    366,
    15
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/burrow.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/burrow.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/burrow.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/burrow.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/burrow.png#L4",
    "f": 1.3
   },
   {
    "src": "art/rootwood/burrow.png#L5",
    "f": 0.86
   },
   {
    "src": "art/rootwood/burrow.png#L6",
    "f": 1.3
   },
   {
    "src": "art/rootwood/burrow.png#L7",
    "f": 1.3,
    "fy": 1.0
   },
   {
    "src": "art/rootwood/burrow.png#L8",
    "f": 1.5
   },
   {
    "src": "art/rootwood/burrow.png#L9",
    "f": 1.5,
    "fy": 1.0
   }
  ],
  "front": "art/rootwood/burrow.png#front",
  "frontAt": [
   32,
   306
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
   "id": "bramble",
   "edge": "left",
   "a": 256,
   "b": 320,
   "to": "bramble",
   "toDoor": "burrow",
   "x": 24.0,
   "y": 320,
   "f": 1
  }
 ],
 "items": [
  {
   "id": "memory_balloon",
   "x": 296.0,
   "y": 320,
   "kind": "memory"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "######..................################",
  "####......................##############",
  "###........................#############",
  "###........................#############",
  "##..........................############",
  "##..........................############",
  "##..........................############",
  "............................############",
  "...........................#############",
  "...........................#############",
  "..........................##############",
  "########################################",
  "########################################",
  "########################################",
  "########################################"
 ],
 "mapAt": [
  254,
  92
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.56,
  "lights": [
   [
    296,
    300,
    90,
    1.0
   ],
   [
    240,
    179,
    192,
    0.85
   ],
   [
    196,
    305,
    22,
    0.35
   ],
   [
    181,
    310,
    22,
    0.35
   ],
   [
    316,
    309,
    22,
    0.35
   ],
   [
    303,
    305,
    22,
    0.35
   ],
   [
    287,
    299,
    22,
    0.35
   ],
   [
    478,
    -6,
    46,
    0.55
   ],
   [
    483,
    -6,
    46,
    0.55
   ],
   [
    118,
    314,
    46,
    0.55
   ],
   [
    126,
    312,
    46,
    0.55
   ],
   [
    130,
    314,
    46,
    0.55
   ],
   [
    393,
    314,
    46,
    0.55
   ],
   [
    399,
    312,
    46,
    0.55
   ],
   [
    334,
    306,
    20,
    0.35
   ],
   [
    392,
    291,
    20,
    0.35
   ]
  ]
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "wildlife": [
  {
   "kind": "mouse",
   "at": "back",
   "x0": 80,
   "x1": 384,
   "y": 320,
   "every": [
    12,
    30
   ]
  }
 ],
 "frontglow": [
  [
   64.2,
   369.8,
   1.5,
   1.3055153941036848,
   "#9ff2dc"
  ],
  [
   64.8,
   374.2,
   1.5,
   2.7,
   "#9ff2dc"
  ],
  [
   40.7,
   384.1,
   1.5,
   0.9750589900184812,
   "#9ff2dc"
  ],
  [
   53.4,
   361.6,
   1.5,
   2.6,
   "#9ff2dc"
  ],
  [
   229.6,
   359.4,
   1.5,
   1.3612158429311068,
   "#9ff2dc"
  ],
  [
   278.0,
   382.8,
   1.5,
   1.4809252511635014,
   "#9ff2dc"
  ],
  [
   220.9,
   379.2,
   1.5,
   1.4809252511635014,
   "#9ff2dc"
  ],
  [
   182.8,
   368.2,
   1.5,
   3.4,
   "#9ff2dc"
  ],
  [
   191.0,
   368.5,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   172.3,
   363.2,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   135.0,
   353.1,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   199.3,
   372.4,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   174.3,
   363.2,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   145.0,
   359.8,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   162.3,
   349.7,
   1.5,
   3.0,
   "#9ff2dc"
  ],
  [
   633.8,
   384.0,
   1.5,
   1.3087752574684863,
   "#9ff2dc"
  ],
  [
   587.8,
   364.0,
   1.5,
   3.2,
   "#9ff2dc"
  ],
  [
   577.6,
   381.3,
   1.5,
   0.8564874843578713,
   "#9ff2dc"
  ],
  [
   573.0,
   380.5,
   1.5,
   0.8564874843578713,
   "#9ff2dc"
  ],
  [
   604.9,
   371.3,
   1.5,
   0.7626245082820088,
   "#9ff2dc"
  ],
  [
   841.1,
   365.3,
   1.5,
   1.1903592738104516,
   "#9ff2dc"
  ],
  [
   847.1,
   361.9,
   1.5,
   1.0997320086611813,
   "#9ff2dc"
  ],
  [
   882.8,
   371.9,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   860.1,
   364.8,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   849.4,
   376.2,
   1.5,
   0.5,
   "#9ff2dc"
  ],
  [
   833.8,
   344.5,
   1.5,
   0.6,
   "#9ff2dc"
  ],
  [
   196.2,
   305.2,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   180.8,
   309.8,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   315.7,
   309.2,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   302.6,
   305.2,
   1,
   0.5,
   "#d8fff4"
  ],
  [
   287.2,
   299.2,
   1,
   1.5,
   "#d8fff4"
  ],
  [
   334.4,
   306.5,
   1,
   1.3,
   "#d8fff4"
  ],
  [
   391.6,
   291.2,
   1,
   1.3,
   "#d8fff4"
  ]
 ],
 "glowworms": [
  [
   150,
   151
  ],
  [
   149,
   169
  ],
  [
   352,
   150
  ],
  [
   351,
   162
  ],
  [
   268,
   158
  ],
  [
   268,
   173
  ],
  [
   268,
   187
  ],
  [
   150,
   156
  ],
  [
   150,
   168
  ],
  [
   340,
   155
  ],
  [
   135,
   157
  ],
  [
   135,
   150
  ],
  [
   136,
   170
  ],
  [
   140,
   153
  ],
  [
   141,
   163
  ],
  [
   237,
   151
  ],
  [
   237,
   164
  ],
  [
   237,
   185
  ],
  [
   237,
   202
  ],
  [
   311,
   150
  ],
  [
   312,
   172
  ],
  [
   333,
   152
  ],
  [
   332,
   171
  ],
  [
   177,
   149
  ],
  [
   176,
   169
  ],
  [
   195,
   150
  ],
  [
   194,
   171
  ],
  [
   194,
   180
  ],
  [
   330,
   156
  ],
  [
   178,
   159
  ],
  [
   178,
   170
  ],
  [
   178,
   181
  ],
  [
   274,
   150
  ],
  [
   274,
   162
  ],
  [
   275,
   183
  ],
  [
   275,
   192
  ],
  [
   275,
   202
  ],
  [
   208,
   154
  ],
  [
   207,
   170
  ],
  [
   207,
   187
  ],
  [
   207,
   200
  ],
  [
   315,
   158
  ],
  [
   315,
   171
  ],
  [
   286,
   153
  ],
  [
   286,
   168
  ],
  [
   286,
   186
  ],
  [
   332,
   157
  ],
  [
   261,
   155
  ],
  [
   260,
   168
  ],
  [
   295,
   152
  ],
  [
   295,
   166
  ],
  [
   294,
   176
  ],
  [
   357,
   152
  ],
  [
   156,
   156
  ],
  [
   156,
   176
  ],
  [
   147,
   157
  ],
  [
   146,
   176
  ],
  [
   223,
   150
  ],
  [
   223,
   173
  ],
  [
   223,
   186
  ],
  [
   223,
   202
  ],
  [
   180,
   157
  ],
  [
   180,
   173
  ],
  [
   222,
   149
  ],
  [
   221,
   170
  ],
  [
   221,
   183
  ],
  [
   221,
   198
  ],
  [
   220,
   206
  ],
  [
   196,
   152
  ],
  [
   196,
   175
  ],
  [
   197,
   186
  ],
  [
   147,
   152
  ],
  [
   147,
   170
  ],
  [
   131,
   150
  ],
  [
   130,
   161
  ],
  [
   236,
   159
  ],
  [
   236,
   181
  ],
  [
   236,
   194
  ],
  [
   236,
   208
  ],
  [
   312,
   152
  ],
  [
   312,
   169
  ],
  [
   312,
   178
  ],
  [
   126,
   159
  ],
  [
   277,
   155
  ],
  [
   277,
   175
  ],
  [
   277,
   188
  ],
  [
   278,
   198
  ],
  [
   172,
   154
  ],
  [
   172,
   171
  ],
  [
   306,
   149
  ],
  [
   307,
   164
  ],
  [
   307,
   174
  ],
  [
   351,
   157
  ],
  [
   341,
   154
  ],
  [
   340,
   164
  ],
  [
   257,
   155
  ],
  [
   258,
   172
  ]
 ],
 "foes": [
  {
   "kind": "lace",
   "x": 200.0,
   "y": 320,
   "f": 1
  },
  {
   "kind": "lace",
   "x": 344.0,
   "y": 320,
   "f": -1,
   "asleep": true,
   "after": 0,
   "wake": 56
  },
  {
   "kind": "lace",
   "x": 392.0,
   "y": 320,
   "f": -1,
   "asleep": true,
   "after": 0,
   "wake": 56
  },
  {
   "kind": "glintmaw",
   "x": 376.0,
   "y": 320,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   326,
   331,
   332,
   333,
   335,
   336,
   337,
   338,
   339,
   340,
   341,
   343,
   364,
   365,
   366,
   367,
   368,
   369,
   370,
   371,
   374,
   376,
   377,
   379,
   382,
   383,
   384,
   385,
   403,
   404,
   425,
   426,
   442,
   443,
   466,
   467,
   482,
   506,
   507,
   521,
   522,
   547,
   548,
   561,
   562,
   587,
   588,
   627,
   667,
   668,
   707,
   746,
   747,
   763,
   764,
   765,
   766,
   767,
   768,
   769,
   770,
   771,
   772,
   773,
   774,
   775,
   776,
   780,
   781,
   782,
   783,
   784,
   785
  ],
  "bits": "//////////////////////////////////////wH+AP//////////////////////////////////////g/wAP///////////////////////////////////////w/w//////////////////////////////////////D/AAf/////////////////////////////////////////gP/////////////////////////////////////AfwAH///////////////////////////////////////A/4D/////////////////////////////////////AP0AAP///////////////////////////////////////w/////////////////////////////////////w/8APAAD///////////////////////////////////////8AAP//////////////////////////////////////n84P//////////////////////////////////////+f/gf//////////////////v/+//z/+P/4//j/8P/g/4D+APgB+ADwAOAAwACAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9/4DwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wP+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8B/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+AeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+APgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAfAA8ABwADAAMAAQAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//3//f/8//x//D/8HDwAA///////////////////////////////////+//AfAAf////////////////////+//7//v/+//z/+P/w/+D4APwA+ADwAOAAwADAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ADwAPAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////9//3//P/8//z//f/9//3//P/8f/w//B/8Af/////////////////////////////////////7//v/++AD4APAA4ADAAMAAgACAAIAAgAAAAAAAAAAAAAAAAAAAPwAfAA8ABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////9//z//P/8f/z//P/8//3//f/9//3//f/9//3///////////////v/+//7//v/+//7//v/8//j/8P/g/gAAAAABAAEAAwADAAMAAQAAAAAAAAAAAAAAAAAAAAAAAP//////////////////f/9//3//f/8//x//D/8H/wB///////////////////////////////////7//v/8//78APgA8ADgAMAAwACAAIAAgACAAAAAAAAAAAAAAAAAAAA/AB8ADwAHAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAA////////////////f/9//3//f/9//3//P/8//z//P////v/+//7//v///////////////////////////////wAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAAAAAAAAAE//3//f/9//3//f////////////////////////////wADAAMAAwADAAMAAwADAAEAAQABAAEAAQABAAEAAQABAAMAAwAHAA8ADwAfAD8AfwB/AP8B/wf/D/8f/x//H/////////////////9//3//f/9//3//f/9//////////w//P/9//3//////////////////////////////////AAAAAQADAAMABwAPAA8AHwA/AH8A/wH/A/8H/x//f////////////3//f/9//3//f/9//3///////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA8Afw//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP8A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD/wP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4H//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAPg/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP/g////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAPgA/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwB/A/8f/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////wAAAAAAAAAAAAAAAAAAAAAAAQADAAf/////////////AA8APwD/A/8H/x//P/9///////////////////////8="
 }
});
