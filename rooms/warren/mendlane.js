// mendlane: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "mendlane",
 "region": "warren",
 "w": 48,
 "h": 26,
 "music": "warren",
 "viewBottom": 416,
 "art": {
  "main": "art/warren/mendlane.webp#main",
  "pack": "art/warren/mendlane.webp",
  "parts": {
   "main": [
    0,
    0,
    768,
    416
   ],
   "L0": [
    0,
    416,
    867,
    76
   ],
   "L1": [
    0,
    492,
    823,
    76
   ],
   "L2": [
    0,
    568,
    745,
    412
   ]
  },
  "layers": [
   {
    "src": "art/warren/mendlane.webp#L0",
    "f": 1.35,
    "x": 89,
    "y": 393
   },
   {
    "src": "art/warren/mendlane.webp#L1",
    "f": 1.35,
    "fy": 1.0,
    "x": 119
   },
   {
    "src": "art/warren/mendlane.webp#L2",
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
   "id": "square",
   "edge": "left",
   "a": 224,
   "b": 288,
   "to": "townsquare",
   "toDoor": "lane",
   "x": 24.0,
   "y": 288,
   "f": 1
  },
  {
   "id": "bunks",
   "edge": "right",
   "a": 224,
   "b": 288,
   "to": "bunks",
   "toDoor": "lane",
   "x": 744.0,
   "y": 288,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "button_lane_0",
   "x": 96,
   "y": 288,
   "kind": "button"
  },
  {
   "id": "button_lane_1",
   "x": 544,
   "y": 288,
   "kind": "button"
  },
  {
   "id": "button_lane_2",
   "x": 704,
   "y": 288,
   "kind": "button"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "##########........##############################",
  "##########........########........##############",
  "##########........########........##############",
  "#..............................................#",
  "#..............................................#",
  "#..............................................#",
  "#..............................................#",
  "#..............................................#",
  "#..............................................#",
  "................................................",
  "................................................",
  "................................................",
  "................................................",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################",
  "################################################"
 ],
 "mapAt": [
  228,
  154
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.56,
  "tint": "#0c0810",
  "lights": [
   [
    208,
    160,
    90,
    0.85
   ],
   [
    464,
    176,
    80,
    0.8
   ],
   [
    640,
    224,
    60,
    0.6
   ],
   [
    158,
    196,
    30,
    0.45
   ],
   [
    242,
    196,
    30,
    0.45
   ],
   [
    208,
    100,
    72,
    0.75
   ],
   [
    375,
    137,
    16,
    0.4
   ],
   [
    319,
    140,
    16,
    0.4
   ],
   [
    76,
    142,
    16,
    0.4
   ],
   [
    581,
    141,
    16,
    0.4
   ],
   [
    57,
    132,
    16,
    0.4
   ],
   [
    237,
    87,
    16,
    0.4
   ],
   [
    410,
    137,
    16,
    0.4
   ],
   [
    360,
    273,
    84,
    0.85
   ]
  ]
 },
 "ambient": [
  "dust"
 ],
 "npcs": [
  {
   "kind": "mabel",
   "x": 216.0,
   "y": 288,
   "f": 1
  },
  {
   "kind": "clank",
   "x": 472.0,
   "y": 288,
   "f": -1
  },
  {
   "kind": "oldkey",
   "x": 648.0,
   "y": 288,
   "f": -1
  },
  {
   "kind": "patches",
   "x": 152.0,
   "y": 288,
   "f": 1
  },
  {
   "kind": "rex",
   "x": 344.0,
   "y": 288,
   "f": -1
  }
 ],
 "patientspots": [
  [
   400,
   288,
   1
  ],
  [
   584.0,
   288,
   -1
  ]
 ],
 "shutters": [
  [
   152,
   190,
   12,
   12
  ],
  [
   236,
   190,
   12,
   12
  ]
 ],
 "foes": [],
 "detail": {
  "tiles": [
   202,
   203,
   205,
   206,
   207,
   208,
   209,
   250,
   252,
   255,
   256,
   257,
   266,
   267,
   268,
   269,
   270,
   297,
   298,
   305,
   306,
   314,
   316,
   317,
   319,
   320,
   321,
   322,
   338,
   339,
   340,
   341,
   342,
   343,
   344,
   345,
   354,
   355,
   356,
   357,
   358,
   360,
   361,
   370,
   374,
   375,
   376,
   379,
   380,
   385,
   389,
   390,
   404,
   406,
   407,
   408,
   420,
   421,
   424,
   427,
   428,
   429,
   430,
   431,
   433,
   479,
   480,
   481,
   526,
   527,
   528,
   575,
   577,
   623,
   819,
   820,
   827,
   831,
   832,
   833,
   834,
   839,
   843,
   847,
   848,
   854,
   858
  ],
  "bits": "////////////////////////////////////v/+//7D/////////////////////////////8//j/+H/wf8AB//////////////////////////////////////////5/////////////////////////////////7//H/4f/g7/////////////////////////////////4//D+AMAA///////////////////////////////////////8O/g/////////////////////////////////////wf/B///gP8A/gD8APgA8ADwAOAA4ADAAMAAwADAAIAAgACAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Af8A/wB/AD8AHwAPAAMAAQABAAAAAAAAAAAAAAAA//////////////////////////////////////////7///////////////////////////////////4/zj8AAP///////////////////////////////////////wAf/////////////////////////////////////////wD/////////////////////////////////////z/8AAP///////////////////////v/+//7//v//////////gACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQAAAAAAAP///////////////////////////////////////3////D/gPwA8ADgAOAA4ADgAOAA4ADgAMAAgACAAIAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB/AD8ADwAPAAcAAwADAAMAAQABAAAAAAAAAAAAAAAA/////////////////////////////////////3//f/////////////////////////////////////////HAAP///////////////////////////////////////x/A/////////////////////////////////////w//AB////////////////////////////////////////8Af//////////////////////////j/+H/wP/A/4D4APAA/////////////////////////////3//P/8f/wP/AAD///////////////////////7//v/8//z/+P/w//A/4P/////////////////+//5//n/8P/A/wB+AHAAAAAAAf/8//z//P/8//z//H/8f/x//H/8P/wP/AfwAWAAAAAD///////////////////////////////9//z//P/8f//////////////////////////////////f/4//B/4D/////////////////////////////////////////8AH/////////////////////////////////////////wP/////////////////////////////////////////+//////////7//v/8//z/+P/4//j/8P/g/8D8APAAAAB//3//f/9//3//f/8//z//H/8H/wf/A/8B/wD/AD8AD/////////////////////////////////////////B///////////////////////////////////7/+P/4/4D//////////////////////////////////3//P/8////////////////////////////////////////////8////////////////////////////////////////Af///v/g/gDwAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AP8AfwA/AA8AAwABAAEAAQABAAAAAAAAAAAAAAAA//////////////////////////////////9//3////+AAIAAgACAAIAAAAAAAAAAAAAAAAAAgACAAIAAgACAAP//////////f/9//3//f/9//3//f/9//////////////////////////////////v/+//7//v/+//7//v/+//6AAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////9//3//f////v/+//z//P/8//z//P/8//z//P/8//7//v/+/////3//f/9//3//f/9///////9//3//f/9//3//f/9//3//AAAAAAAAAACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAB//3//f/9//3//f/9//3//f/9//3//f/9//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8A/w//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP+A//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfg"
 }
});
