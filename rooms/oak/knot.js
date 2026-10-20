// knot: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "knot",
 "region": "oak",
 "w": 44,
 "h": 30,
 "music": "oak",
 "viewBottom": 480,
 "art": {
  "main": "art/oak/knot.png#main",
  "pack": "art/oak/knot.png",
  "parts": {
   "main": [
    0,
    0,
    704,
    480
   ],
   "L0": [
    0,
    480,
    1355,
    568
   ],
   "L1": [
    0,
    1048,
    1223,
    551
   ],
   "L2": [
    0,
    1599,
    1076,
    532
   ],
   "L3": [
    0,
    2131,
    914,
    510
   ],
   "L4": [
    0,
    2641,
    919,
    628
   ]
  },
  "layers": [
   {
    "src": "art/oak/knot.png#L0",
    "f": 0.12
   },
   {
    "src": "art/oak/knot.png#L1",
    "f": 0.3
   },
   {
    "src": "art/oak/knot.png#L2",
    "f": 0.5
   },
   {
    "src": "art/oak/knot.png#L3",
    "f": 0.72
   },
   {
    "src": "art/oak/knot.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/rootwood/rootwood_sprites.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "heart",
   "edge": "left",
   "a": 352,
   "b": 416,
   "to": "heartwood",
   "toDoor": "knot",
   "x": 24.0,
   "y": 416,
   "f": 1
  },
  {
   "id": "web",
   "edge": "bottom",
   "a": 448,
   "b": 512,
   "to": "hollow",
   "toDoor": "web",
   "x": 472.0,
   "y": 448,
   "f": 1,
   "keepX": true
  },
  {
   "id": "bough",
   "edge": "right",
   "a": 160,
   "b": 224,
   "to": "lowbough",
   "toDoor": "knot",
   "x": 680.0,
   "y": 224,
   "f": -1
  },
  {
   "id": "rot",
   "edge": "top",
   "a": 576,
   "b": 640,
   "to": "rot",
   "toDoor": "knot",
   "x": 600.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "feather_knot_stash_0",
   "x": 41.0,
   "y": 128,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_knot_stash_1",
   "x": 51.0,
   "y": 128,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_knot_stash_2",
   "x": 61.0,
   "y": 128,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_knot_stash_3",
   "x": 71.0,
   "y": 128,
   "kind": "feather",
   "needs": "velcro"
  },
  {
   "id": "feather_knot_feathers_0",
   "x": 414.0,
   "y": 288,
   "kind": "feather"
  },
  {
   "id": "feather_knot_feathers_1",
   "x": 424.0,
   "y": 288,
   "kind": "feather"
  },
  {
   "id": "feather_knot_feathers_2",
   "x": 434.0,
   "y": 288,
   "kind": "feather"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "####################################....####",
  "####################################....####",
  "####################################....####",
  "####################################....####",
  "##........................................##",
  "##........................................##",
  "##........................................##",
  "##........................................##",
  "##====....................................##",
  "##........................................##",
  "##..........................................",
  "##..........................................",
  "##..........................................",
  "##..........................................",
  "##..................................########",
  "##..............................====########",
  "##..................................########",
  "##..................................########",
  "##......................=====.......########",
  "##....=======.......................########",
  "##..................................########",
  "##..................................########",
  "................=====...............########",
  "....................................########",
  "....................................########",
  "....................................########",
  "############################....############",
  "############################....############",
  "############################====############",
  "############################....############"
 ],
 "mapAt": [
  108,
  46
 ],
 "floor": "bark",
 "shade": {
  "a": 0.4,
  "lights": [
   [
    152,
    284,
    90,
    0.7
   ],
   [
    315,
    410,
    46,
    0.55
   ],
   [
    320,
    407,
    46,
    0.55
   ]
  ],
  "tint": "#2a1a10"
 },
 "ambient": [
  "motes",
  "dust"
 ],
 "grip": [
  [
   1,
   4,
   1,
   17
  ]
 ],
 "npc": {
  "kind": "owl",
  "x": 152.0,
  "y": 304,
  "f": -1
 },
 "wildlife": [
  {
   "kind": "beetle",
   "at": "back",
   "x0": 64,
   "x1": 640,
   "y": 416
  },
  {
   "kind": "moth",
   "at": "back",
   "y": 272,
   "x": 148,
   "every": [
    4,
    10
   ]
  }
 ],
 "foes": [
  {
   "kind": "gum",
   "x": 488.0,
   "y": 64,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   135,
   136,
   138,
   139,
   141,
   142,
   144,
   145,
   148,
   149,
   150,
   151,
   152,
   153,
   157,
   158,
   159,
   160,
   161,
   162,
   163,
   166,
   167,
   168,
   172,
   173,
   179,
   180,
   181,
   182,
   183,
   184,
   185,
   186,
   187,
   189,
   190,
   191,
   192,
   193,
   195,
   197,
   198,
   199,
   200,
   201,
   204,
   206,
   208,
   209,
   210,
   217,
   261,
   262,
   305,
   306,
   349,
   394,
   609,
   610,
   611,
   612,
   652,
   696,
   740,
   784,
   794,
   827,
   828,
   837,
   838,
   871,
   881,
   915,
   916,
   959,
   960,
   1003,
   1047,
   1048,
   1091,
   1103,
   1104,
   1105,
   1106,
   1107,
   1108,
   1109,
   1110,
   1111,
   1112,
   1113,
   1114,
   1115,
   1116,
   1117,
   1118,
   1119,
   1120,
   1121,
   1122,
   1123,
   1124,
   1125,
   1133,
   1134,
   1135,
   1171,
   1176
  ],
  "bits": "//////////////////////////////////////////D///////////////////////////////////////8fv//////////////////////////////////////////+/////////////////////////////////////4//Af///////////////////////////////////////4P8AP/////////////////////////////////////j/wD//////////////////////////////////////4D/AAD///////////////////////////////////////8/////////////////////////////////////g/+B/4AH///////////////////////////////////////A/wD/////////////////////////////////////H/AAAP////////////////////////////////////8D/wH//////////////////////////////////////+P/AAD/////////////////////////////////////+B8AB////////////////////////////////////v/wfwA///////////////////////////////////////////H//////////////////////////////////////wf8AP///////////////////////////////////////3////////////////////////////////////////+f+AP///////////////////////////////////////P/wv/////////////////////////////////////g/wA//////////////////////////////////////////4D////////////////////+//7//v/+//z/+P/wH+AGAIAAwADAAMAAgACAAIAAwAAAAAAAAAAAAAAAAAAAAAAA////////f/9//3//f/9//3//f/9//z//H/8P/wf/AHD/////////////////////////////////////H58AB/gAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4D8ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACADwADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//B/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//A/wA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//B/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/gB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8D/wB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////4HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8ADwAPAAcAAwADAAEAAQAAAAAAAAAAAAAAAAAAAAEAAQADAAMAAwADAAMAAQABAAEAAAAAAAAAAAAAAAAAAP//////////////////////////////////f/9//3//AAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAF//////////////////////////////////////////wABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAA/////////////////////////////3//f/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAfwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/g//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wA//P/9//3////////////////////////////////////9//3//f/9//3//f/9//////////////////////////////////////////////////////////3//f/9//z//P/8f/x//P/8//x//H/8f/x//H/8f/x//H/8//z//gACAAIAAgADAAMAAwADAAMAAwADAAMAAwADAAIAAgAAAAAAAAAAAAAABAAEAAQADAAMAAwADAAMAAQABAAEAAX//f/////////////////////////////////////////////////////////////////////////////////6AAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAMAAwADAAMAAwADAAMAAwADAAMABwAHAAMAAwAB//7//v/+//7//v/+//7//v/+//7//v/+//7///////8AAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////9//3//P/8//3//f/9//3//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF//3//f/9//3///////////////////////////////wABAAEAAQADAAMAAwADAAMAAwABAAEAAQABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAP///////9//z//P/8//z//P/9//////////////////wADAAcABwAHAAcABwAHAAMAAwABAAEAAQABAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/4//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/A//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/g//8AAAAAAAAAAAAAAAAAAAAAAAEAAQADAAcADwAfAH/////w//z//v/+////////////////////////////////D/8//3//f/////////////////////////////////8="
 }
});
