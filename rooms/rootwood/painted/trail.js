// trail: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "trail",
 "region": "rootwood",
 "w": 40,
 "h": 30,
 "music": "rootwood",
 "viewBottom": 480,
 "art": {
  "main": "art/rootwood/painted/trail.webp#main",
  "pack": "art/rootwood/painted/trail.webp",
  "parts": {
   "main": [
    0,
    0,
    640,
    480
   ],
   "L0": [
    0,
    480,
    640,
    398
   ],
   "L1": [
    0,
    878,
    640,
    415
   ],
   "L2": [
    0,
    1293,
    640,
    434
   ],
   "L3": [
    0,
    1727,
    640,
    456
   ],
   "L4": [
    0,
    2183,
    127,
    509
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/painted/trail.webp#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/painted/trail.webp#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/painted/trail.webp#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/painted/trail.webp#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/painted/trail.webp#L4",
    "f": 1.3,
    "x": 203
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
   "id": "woodpecker",
   "edge": "left",
   "a": 288,
   "b": 352,
   "to": "woodpecker",
   "toDoor": "trail",
   "x": 24.0,
   "y": 352,
   "f": 1
  },
  {
   "id": "clearing",
   "edge": "right",
   "a": 288,
   "b": 352,
   "to": "clearing",
   "toDoor": "trail",
   "x": 616.0,
   "y": 352,
   "f": -1
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
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "##....................................##",
  "........................................",
  "..............######....................",
  "..............######....................",
  "..............######....................",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################",
  "########################################"
 ],
 "mapAt": [
  262,
  118
 ],
 "floor": "leaves",
 "shade": {
  "a": 0.42,
  "lights": []
 },
 "ambient": [
  "fireflies",
  "spores"
 ],
 "wildlife": [
  {
   "kind": "deer",
   "at": "L2",
   "x0": 160,
   "x1": 480,
   "y": 266
  },
  {
   "kind": "rabbit",
   "at": "back",
   "x0": 352,
   "x1": 576,
   "y": 352
  },
  {
   "kind": "squirrel2",
   "at": "L3",
   "x0": 90,
   "x1": 550,
   "y": 304,
   "every": [
    30,
    80
   ]
  }
 ],
 "ramps": [
  [
   [
    352,
    256
   ],
   [
    353,
    256
   ],
   [
    354,
    256
   ],
   [
    355,
    256
   ],
   [
    356,
    256
   ],
   [
    357,
    256
   ],
   [
    358,
    256
   ],
   [
    359,
    256
   ],
   [
    360,
    256
   ],
   [
    361,
    256
   ],
   [
    362,
    256
   ],
   [
    363,
    256
   ],
   [
    364,
    256
   ],
   [
    365,
    256
   ],
   [
    366,
    256
   ],
   [
    367,
    256
   ],
   [
    368,
    256
   ],
   [
    369,
    256
   ],
   [
    370,
    256
   ],
   [
    371,
    256
   ],
   [
    372,
    256
   ],
   [
    373,
    256
   ],
   [
    374,
    256
   ],
   [
    375,
    256
   ],
   [
    376,
    256
   ],
   [
    377,
    256
   ],
   [
    378,
    256
   ],
   [
    379,
    256
   ],
   [
    380,
    256
   ],
   [
    381,
    256
   ],
   [
    382,
    256
   ],
   [
    383,
    256
   ],
   [
    384,
    256
   ],
   [
    385,
    256
   ],
   [
    386,
    256
   ],
   [
    387,
    256
   ],
   [
    388,
    256
   ],
   [
    389,
    256
   ],
   [
    390,
    256
   ],
   [
    391,
    256
   ],
   [
    392,
    256
   ],
   [
    393,
    256
   ],
   [
    394,
    256
   ],
   [
    395,
    256
   ],
   [
    396,
    256
   ],
   [
    397,
    256
   ],
   [
    398,
    256
   ],
   [
    399,
    256
   ],
   [
    400,
    256
   ],
   [
    401,
    256
   ],
   [
    402,
    256
   ],
   [
    403,
    256
   ],
   [
    404,
    256
   ],
   [
    405,
    256
   ],
   [
    406,
    256
   ],
   [
    407,
    256
   ],
   [
    408,
    256
   ],
   [
    409,
    256
   ],
   [
    410,
    256
   ],
   [
    411,
    256
   ],
   [
    412,
    256
   ],
   [
    413,
    256
   ],
   [
    414,
    256
   ],
   [
    415,
    256
   ],
   [
    416,
    256
   ],
   [
    417,
    256
   ],
   [
    418,
    256
   ],
   [
    419,
    256
   ],
   [
    420,
    256
   ],
   [
    421,
    256
   ],
   [
    422,
    256
   ],
   [
    423,
    256
   ],
   [
    424,
    256
   ],
   [
    425,
    256
   ],
   [
    426,
    256
   ],
   [
    427,
    256
   ],
   [
    428,
    256
   ],
   [
    429,
    256
   ],
   [
    430,
    256
   ],
   [
    431,
    256
   ]
  ]
 ],
 "foes": [
  {
   "kind": "cap",
   "x": 200.0,
   "y": 352,
   "f": 1
  },
  {
   "kind": "cap",
   "x": 504.0,
   "y": 352,
   "f": -1
  },
  {
   "kind": "can",
   "x": 280.0,
   "y": 304,
   "f": -1
  },
  {
   "kind": "spinner",
   "x": 136.0,
   "y": 240,
   "f": -1
  },
  {
   "kind": "spinner",
   "x": 424.0,
   "y": 224,
   "f": -1,
   "beat": "soldierDown"
  }
 ],
 "detail": {
  "tiles": [
   122,
   123,
   124,
   125,
   126,
   127,
   128,
   130,
   131,
   133,
   134,
   135,
   136,
   137,
   140,
   141,
   142,
   143,
   144,
   147,
   148,
   149,
   150,
   151,
   152,
   153,
   155,
   156,
   157,
   162,
   165,
   166,
   167,
   169,
   171,
   172,
   174,
   175,
   176,
   177,
   178,
   179,
   180,
   183,
   184,
   185,
   186,
   189,
   190,
   191,
   192,
   194,
   195,
   196,
   197,
   201,
   202,
   237,
   238,
   241,
   277,
   278,
   282,
   322,
   357,
   361,
   362,
   397,
   401,
   402,
   437,
   442,
   477,
   481,
   482,
   517,
   521,
   557,
   597,
   602,
   637,
   641,
   677,
   735,
   736,
   737,
   738,
   774,
   779,
   814,
   819,
   843,
   844,
   845,
   846,
   847,
   848,
   849,
   850,
   851,
   852,
   853,
   854,
   860,
   861,
   862,
   863,
   864,
   865,
   866,
   867,
   868,
   869,
   870,
   871,
   872,
   873,
   874,
   875,
   876
  ],
  "bits": "//////////////////////////////////////gA8AD/////////////////////////////////////f/8B/////////////////////////////////////////4+A////////////////////////////////////////AH//////////////////////////////////////////P//////////////////////////////////////////g////////////////////////////////////////AAD////////////////////////////////////////wAP///////////////////////////////////////z///////////////////////////////////////////8D///////////////////////////////////////8f////////////////////////////////////////+P/A/////////////////////////////////////3//H//////////////////////////////////////////4f//////////////////////////////////////////O////////////////////////////////////////AAD/////////////////////////////////////////wP////////////////////////////////////8H/wAf/////////////////////////////////////////4D/////////////////////////////////////8P/AH//////////////////////////////////////////+////////////////////////////////////////AAP///////////////////////////////////////D/4P////////////////////////////////////9//x/////////////////////////////////////////g/4D/////////////////////////////////////P/8B////////////////////////////////////4f/A/wB/////////////////////////////////////////+AD//////////////////////////////////////4cMAfgA+ADwAOAAwADAAIAAgAAAAAAAgACAAIAAgADAAMAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+APAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//B/AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//P8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4D+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcADwAPAAcAAwADAAEAAQABAAEAAQABAAEAAAAAAAD////////////////////////////+//7//P/8//z//MAAwADAAMAAwADAAMAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAH//////////////////3//f/9//3/////////////////8//z//P/+//7//v/+//7//v/8//z//P/+//7//v/+AAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////f/9//3//f////////////wAAAAAAAAAAAAAAAAAAAAAAAIAAgADAAMAA4ADgAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQADAAMABwAHAAcAAwADAAMAA/////////////////////7//v/8//z//P/8//7//v/+gACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAwADAAMAAwADAAMAAwADAAMAA//+////////////////////////////////////////AAAAAAAAAAAAAAAAAACAAIAAgACAAMAAwADgAOAA4AAAAwADAAMAAwADAAMAAwADAAMAAwADAAEAAQAAAAAAAMAAwACAAIAAAAAAAAAAAAAAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQADAAMAAwADAAMAAwABAAH////////////////////////////+//7//P/8//z//IAAgACAAIAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v/+//7//v/+//7//v/8//z//v/+/////////////wAAAAEAAQABAAEAAQABAAEAAQABAAEAAQADAAMAAwADAAMAAwADAAEAAQABAAEAAQABAAMAAwADAAMAAwADAAMAAAAAAAAAAAAAAAAAAIAAgACAAIAAgACAAIAAgACAAAADAAMAAwADAAMAAwADAAMAAQABAAEAAAAAAAAAAAAA/////////////v/+//7//v/+//7//v/+//7///////8AAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAD/8//3//f///////////////////////////////////8P/8//7//v///////////////////////////////v////9//3//P/8f/x//H/8f/z//P/9//3//f/////////7//v/+//7//v////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/A/8f/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf///////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A//7///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAD/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAMABwAH/////////////////////////////3//f/9///////////////8AAAAAAAAAAAAAAAAAAIAAwADgAPAA+AD8AP8f/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AP/A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAf9/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA/8D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAH//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD//v////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g"
 }
});
