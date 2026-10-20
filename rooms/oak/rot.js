// rot: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "rot",
 "region": "oak",
 "w": 44,
 "h": 46,
 "music": "oak",
 "viewBottom": 736,
 "art": {
  "main": "art/oak/rot.png#main",
  "pack": "art/oak/rot.png",
  "parts": {
   "main": [
    0,
    0,
    704,
    736
   ],
   "L0": [
    0,
    736,
    1355,
    599
   ],
   "L1": [
    0,
    1335,
    1223,
    628
   ],
   "L2": [
    0,
    1963,
    1076,
    660
   ],
   "L3": [
    0,
    2623,
    914,
    695
   ],
   "L4": [
    0,
    3318,
    919,
    960
   ]
  },
  "layers": [
   {
    "src": "art/oak/rot.png#L0",
    "f": 0.12
   },
   {
    "src": "art/oak/rot.png#L1",
    "f": 0.3
   },
   {
    "src": "art/oak/rot.png#L2",
    "f": 0.5
   },
   {
    "src": "art/oak/rot.png#L3",
    "f": 0.72
   },
   {
    "src": "art/oak/rot.png#L4",
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
   "id": "shaft",
   "edge": "left",
   "a": 320,
   "b": 384,
   "to": "shaft",
   "toDoor": "rot",
   "x": 24.0,
   "y": 384,
   "f": 1
  },
  {
   "id": "knot",
   "edge": "bottom",
   "a": 576,
   "b": 640,
   "to": "knot",
   "toDoor": "rot",
   "x": 600.0,
   "y": 720,
   "f": 1,
   "keepX": true,
   "exitOnly": true
  },
  {
   "id": "face",
   "edge": "right",
   "a": 128,
   "b": 192,
   "to": "barkface",
   "toDoor": "rot",
   "x": 680.0,
   "y": 192,
   "f": -1
  }
 ],
 "items": [
  {
   "id": "feather_rot_feathers_0",
   "x": 398.0,
   "y": 480,
   "kind": "feather"
  },
  {
   "id": "feather_rot_feathers_1",
   "x": 408.0,
   "y": 480,
   "kind": "feather"
  },
  {
   "id": "feather_rot_feathers_2",
   "x": 418.0,
   "y": 480,
   "kind": "feather"
  },
  {
   "id": "feather_rot_feathers2_0",
   "x": 558.0,
   "y": 416,
   "kind": "feather"
  },
  {
   "id": "feather_rot_feathers2_1",
   "x": 568.0,
   "y": 416,
   "kind": "feather"
  },
  {
   "id": "feather_rot_feathers2_2",
   "x": 578.0,
   "y": 416,
   "kind": "feather"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [
  {
   "kind": "scene",
   "name": "pillbug",
   "flag": "sawPillbug",
   "l": 192,
   "t": 480,
   "r": 480,
   "b": 672
  }
 ],
 "spawn": null,
 "tiles": [
  "############################################",
  "############################################",
  "############################################",
  "############################################",
  "##........................................##",
  "##........................................##",
  "##........................................##",
  "##........................................##",
  "##..........................................",
  "##..........................................",
  "##..........................................",
  "##..........................................",
  "##................................========##",
  "##........................................##",
  "##........................................##",
  "##........................................##",
  "##........................................##",
  "##..........................======........##",
  "##........................................##",
  "##........................................##",
  "..........................................##",
  "..........................................##",
  "........................======............##",
  "..........................................##",
  "######....................................##",
  "######....................................##",
  "######..........................=======...##",
  "######....................................##",
  "##=====...................................##",
  "######....................................##",
  "######..=====.........======..............##",
  "######....................................##",
  "######....................................##",
  "######....................................##",
  "###=====......................======......##",
  "######....................................##",
  "######....................................##",
  "######....................................##",
  "######..=====.......=======...............##",
  "######....................................##",
  "######....................................##",
  "######....................................##",
  "####################################....####",
  "####################################....####",
  "####################################....####",
  "####################################....####"
 ],
 "mapAt": [
  108,
  0
 ],
 "floor": "bark",
 "shade": {
  "a": 0.4,
  "lights": [
   [
    456,
    665,
    46,
    0.55
   ],
   [
    466,
    667,
    46,
    0.55
   ],
   [
    348,
    663,
    46,
    0.55
   ],
   [
    356,
    666,
    46,
    0.55
   ],
   [
    363,
    665,
    46,
    0.55
   ],
   [
    443,
    666,
    46,
    0.55
   ],
   [
    446,
    663,
    46,
    0.55
   ],
   [
    497,
    667,
    46,
    0.55
   ],
   [
    175,
    667,
    46,
    0.55
   ],
   [
    182,
    664,
    46,
    0.55
   ],
   [
    189,
    668,
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
 "pillbug": {
  "x": 328.0,
  "y": 672
 },
 "wildlife": [
  {
   "kind": "mouse",
   "at": "back",
   "x0": 64,
   "x1": 544,
   "y": 672
  },
  {
   "kind": "beetle",
   "at": "back",
   "x0": 320,
   "x1": 560,
   "y": 544,
   "every": [
    15,
    40
   ]
  },
  {
   "kind": "inchworm",
   "at": "back",
   "x0": 352,
   "x1": 432,
   "y": 480,
   "every": [
    20,
    50
   ]
  }
 ],
 "foes": [
  {
   "kind": "rings",
   "x": 392.0,
   "y": 672,
   "f": -1
  },
  {
   "kind": "ball",
   "x": 520.0,
   "y": 544,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   136,
   137,
   138,
   139,
   140,
   141,
   142,
   143,
   144,
   145,
   146,
   147,
   148,
   150,
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
   166,
   167,
   168,
   171,
   173,
   178,
   179,
   180,
   183,
   184,
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
   202,
   203,
   206,
   207,
   208,
   209,
   210,
   212,
   213,
   214,
   215,
   216,
   217,
   218,
   221,
   261,
   262,
   265,
   266,
   305,
   306,
   310,
   354,
   397,
   441,
   485,
   486,
   529,
   530,
   573,
   614,
   617,
   618,
   658,
   662,
   702,
   705,
   706,
   745,
   746,
   749,
   789,
   790,
   793,
   794,
   833,
   834,
   878,
   922,
   965,
   966,
   1009,
   1010,
   1053,
   1061,
   1097,
   1098,
   1142,
   1149,
   1185,
   1186,
   1190,
   1191,
   1192,
   1193,
   1230,
   1233,
   1273,
   1274,
   1281,
   1317,
   1318,
   1325,
   1361,
   1362,
   1369,
   1370,
   1405,
   1414,
   1449,
   1455,
   1456,
   1457,
   1493,
   1498,
   1537,
   1538,
   1545,
   1582,
   1589,
   1625,
   1626,
   1633,
   1669,
   1670,
   1677,
   1678,
   1714,
   1721,
   1758,
   1765,
   1802,
   1810,
   1811,
   1812,
   1813,
   1814,
   1815,
   1816,
   1817,
   1819,
   1820,
   1821,
   1822,
   1823,
   1824,
   1825,
   1826,
   1827,
   1828,
   1829,
   1830,
   1831,
   1832,
   1833,
   1834,
   1835,
   1836,
   1837,
   1838,
   1845,
   1846,
   1883,
   1888
  ],
  "bits": "//////////////////////////////////////////n////////////////////////////////////////wfv///////////////////////////////////////x///////////////////////////////////////+f/w/////////////////////////////////////////j/4P/////////////////////////z/+P/4//Bf8EPAAAA/////////////////////////////////////3D/AD///////////////////////3//D/4H/gP8A/wD/AGAAf////////////////////////////////f/4//j/8AA/////////////////////////////////////4P/AA/////////////////////////////////////////+Af//////////////////////////////////////4P/A/////////////////////////////////////7//P//////////////////////////////////////n/8P/wf//////////////////////////////////f/8/gAAA/////////////////////////////////////wf/AP///////////////////////////////////////w/4AP///////////////////////////////////////w////////////////////////////////////////wH4AH//////////////////////////////////////////P///////////////////////////////////////x///////////////////////////////////57+DP4A/gD//////////////////////////////////3//f/8/4P/////////////////////////////////////////w////////////////////////////////////////f////////////////////////////////+P/wf/B/4H+Af/////////////////////////////////////////+////////////////////////////////////jsAAAAD//////////////////////////////////z//D/8P///////////////////////////////////////////P//////////////////////////////////////8f8Af9//gA8ADgAMAAwACAAMAAwADAAMAAwACAAIAAAAAAAAAPAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+DgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4A+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//A8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8P4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAODwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8D/AHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI//AD8ADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//wPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAPAA8ADwAHAAMAAwABAAAAAAAAAAAAAAAAAAAAAAAA//////////////////9//3//f/9//3//f/9//3//f/////////////////7//v/+//7//v/+//7//v/+//z//AAAAAAAAAAAAAAAAAABAAEAAQABAAEAAwADAAMAAwADP/8//3///////////////////////////////////////P/8//7//v/+//7//////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////9//3//P/8//z//P/9//////////wAAAAAAAAAAgACAAIAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAD//////////////////v/+//7//v/+//7//////////P/8//z//P/+//7//v/+//j/+P/4//j/+P/4//z//P/8//z//P/8//7//v/+//7///////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgACAAP/////////////////////////+//7//v/+//7//v/+wADgAOAA4ADgAOAAwACAAAAAAAAAAAAAAAAAAAAAAAD//v/+//7//v/+//7//v/+//7//v/8//z//P/8//z//P///////3////////////////////////////////////z//v/+//7//v/+//////////////////////////8AAAAAAAAAAAAAAAAAAIAAwADAAMAAwADAAIAAgACAAP////////////////////////////////////9//3//gACAAIAAgADAAMAAwADAAIAAgACAAIAAgACAAIAAgAA//z//P/8//z//P/8//z//P/9//3//f/9//3//f/9///////////////////////////////////////7/////wADAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAX//f/9//3//f/9//3//f/9//////////////////////////////////////////v/+//7//v/+//7//v/+//4AAQABAAMAAwADAAEAAQAAAAAAAAAAAAAAAAAAAAAAAP////////////////////9//3//P/8//3//f/9//3////7///////////////////////////////////////8AAAAAAACAAMAA4ADgAOAA4ADAAMAAwADAAMAAwACAAAAAAAAAAAAAAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAf///////////////////////////////f/9//3//P/8//z//P/8//3//f/9/////////////////////////////////////f/9//3//f/9//3//f/9//3//f/9//3//AAAAAAAAAAAAAAABAAEAAAAAAAAAAAAAAAAAAAAAAAB//3//f/////////////////9//3//f/9//3//f/9//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQAAAAAAAAAAf/9//3//f/9//3////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAf/w//z//v/+////////////////////////////////AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////f/9//3//f/8//z//P/8//3//f/9//3//f/9//3//f/9//3//f/8//z//P/8//z/////////////////////////////////////////+//4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAT//P/9//3///////////////////////////////////////////////////////////////////////8P/gf///////////////////////////////////////7/AD///////////////////////////////////////g/4A//7//v/+//z//P/+//7//v/+//7//v/8//j/8P/g/gD/////f/9//////////////////////////////////////////v/+//7//P/8//z//P/+//7/////////////AAAAAAABAAEAAQADAAMAAwADAAEAAQABAAEAAAAAAAD/////////////////////////////////////f/9////w//z//v/+////////////////////////////////AAAAAAAAAAAAAAAAAAEAAwADAAMAAwABAAEAAQABAAF//3//f/9////////////////////////////////////////////////////////////+//7//v/+//7//v/+AAEAAwADAAMAAQABAAEAAQABAAEAAAAAAAAAAAAAAAD/////////////////////////////////////f//////+//7//v/+////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAYAAgACAAIAAgADAAMAAwADAAMAAwADAAMAAgACAAIAAAAEAAAAAAAEAAQADAAMAAwABAAEAAQABAAAAAAAAAAH/////////////////////////////////////8f/AcP///////////////////////////////////////wAA///////+//7//P/8//z//P/8//7//v/8//j/8P/gAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAf///////v/+//7//P/8//z/+P/4//z//P/+////////AAMAAwADAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////9//3//f/9//3//f/9//3//f/8////w//z//v/+////////////////////////////////P/8//z//P/8//z//P/8//z//P/8f/x//H/8f/x//P//////////////////////////////////////+//7//gAAAAAAAAAAAAEAAQABAAEAAwADAAMAAwADAAEAAQAAf////////////////////////////////////////////v/+//7//v/+//z//P/8//z//P/8//z//P/8//z//gAAAAAAAAAAAAAAAAAAAAEAAQABAAMAAwABAAEAAQAB/////3//f/9//////////////////////////////////v///////////////////////////////////////gAAAAAAAAAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAA//////////9//3//P/8//x//H/8f/x//P/8//z//f////v/+//7//v/+/////v/+//7//v/+//7//v/+//7//H//////////////////f/9//z//P/8//z//P/9//3////z//P/8//z//P/+//7//v////////////////////9///////////////////////9//3//f/9//z//P/9//wAAAAAAAAAAAACAAIAAwADgAPAA+AD8AP4A/wD/gP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABz/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHj/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//v////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAABAAEAAQADAAcADwAfAD8AfwH/A/8P/x////9////////////////////////////////////////////w//z//v/+////////////////////////////////D/8//3//f/////////////////////////////////8="
 }
});
