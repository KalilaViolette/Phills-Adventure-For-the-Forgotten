// boughend: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "boughend",
 "region": "oak",
 "w": 60,
 "h": 38,
 "music": "wind",
 "viewBottom": 608,
 "art": {
  "main": "art/oak/boughend.png#main",
  "pack": "art/oak/boughend.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    608
   ],
   "L0": [
    0,
    608,
    1405,
    582
   ],
   "L1": [
    0,
    1190,
    1348,
    586
   ],
   "L2": [
    0,
    1776,
    1252,
    592
   ],
   "L3": [
    0,
    2368,
    1132,
    600
   ],
   "L4": [
    0,
    2968,
    1252,
    794
   ],
   "front": [
    0,
    3762,
    105,
    87
   ]
  },
  "layers": [
   {
    "src": "art/oak/boughend.png#L0",
    "f": 0.08
   },
   {
    "src": "art/oak/boughend.png#L1",
    "f": 0.2
   },
   {
    "src": "art/oak/boughend.png#L2",
    "f": 0.4
   },
   {
    "src": "art/oak/boughend.png#L3",
    "f": 0.65
   },
   {
    "src": "art/oak/boughend.png#L4",
    "f": 1.3
   }
  ],
  "front": "art/oak/boughend.png#front",
  "frontAt": [
   0,
   85
  ],
  "uses": [
   "art/oak/oak_sprites.png",
   "art/oak/oak_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/oak/oak_items.png"
 },
 "doors": [
  {
   "id": "bough",
   "edge": "left",
   "a": 288,
   "b": 352,
   "to": "lowbough",
   "toDoor": "end",
   "x": 24.0,
   "y": 352,
   "f": 1
  },
  {
   "id": "drey",
   "edge": "top",
   "a": 736,
   "b": 832,
   "to": "drey",
   "toDoor": "down",
   "x": 776.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "feather_boughend_feathers_0",
   "x": 158.0,
   "y": 352,
   "kind": "feather"
  },
  {
   "id": "feather_boughend_feathers_1",
   "x": 168.0,
   "y": 352,
   "kind": "feather"
  },
  {
   "id": "feather_boughend_feathers_2",
   "x": 178.0,
   "y": 352,
   "kind": "feather"
  },
  {
   "id": "feather_boughend_stash_0",
   "x": 908.0,
   "y": 304,
   "kind": "feather"
  },
  {
   "id": "feather_boughend_stash_1",
   "x": 916.0,
   "y": 304,
   "kind": "feather"
  },
  {
   "id": "feather_boughend_stash_2",
   "x": 924.0,
   "y": 304,
   "kind": "feather"
  },
  {
   "id": "feather_boughend_stash_3",
   "x": 932.0,
   "y": 304,
   "kind": "feather"
  }
 ],
 "hints": [
  {
   "text": "the twigs go up and up",
   "l": 416,
   "t": 224,
   "r": 576,
   "b": 352,
   "x": 512,
   "y": 272
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "............................................................",
  "............................................................",
  "............................................................",
  "..............................................======........",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "....................................======..................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................======..........",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "....................................======..................",
  "......................................................======",
  "............................................................",
  "............................................................",
  "#########################...======..........................",
  "#########################...................................",
  "#########################...................................",
  "#########################...................................",
  "........................======..............................",
  "............................................................",
  "............................................................",
  "............................................................",
  "..............................======........................",
  "............................................................",
  "............................................................",
  "............................................................",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  212,
  30
 ],
 "floor": "bark",
 "shade": {
  "a": 0.08,
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
   "x0": 576,
   "x1": 656,
   "y": 288,
   "every": [
    12,
    30
   ]
  },
  {
   "kind": "squirrel2",
   "at": "back",
   "x0": 0,
   "x1": 384,
   "y": 352,
   "every": [
    25,
    60
   ]
  },
  {
   "kind": "hawk",
   "at": "L1",
   "x0": 0,
   "x1": 1348,
   "y0": 40,
   "y1": 90,
   "every": [
    60,
    130
   ]
  }
 ],
 "foes": [
  {
   "kind": "plane",
   "x": 328.0,
   "y": 192,
   "f": -1
  },
  {
   "kind": "plane",
   "x": 808.0,
   "y": 384,
   "f": 1
  },
  {
   "kind": "shuttle",
   "x": 488.0,
   "y": 96,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1980,
   1981,
   1982,
   1983,
   1984,
   1985,
   1986,
   1987,
   1988,
   1989,
   1990,
   1991,
   1992,
   1993,
   1994,
   1995,
   1996,
   1997,
   1998,
   1999,
   2000,
   2001,
   2002,
   2003,
   2004,
   2005,
   2006,
   2007,
   2008,
   2009,
   2010,
   2011,
   2012,
   2013,
   2014,
   2015,
   2016,
   2017,
   2018,
   2019,
   2020,
   2021,
   2022,
   2023,
   2024,
   2025,
   2026,
   2027,
   2028,
   2029,
   2030,
   2031,
   2032,
   2033,
   2034,
   2035,
   2036,
   2037,
   2038,
   2039
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AH//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4H///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD8P//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAf/z/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/A//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP4A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAfAP8H/wAAAAAAAAAAAAAAAAAAAAAAAAAAAf8f////////////AAAAAAAAAAAAAAAAAAAAAAAAAACAAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+P//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAH////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//z///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA//7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAH8/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHw//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAP///////////////AAAAAAAAAAAAAAAAAAAAAAAAAACAAP/4//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwP//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA/4D/+P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHz///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP3///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//D//v////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4Af//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAHwf/////////AAAAAAAAAAAAAAAAAAAAAAAAAAD///////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAMAA/+D//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+////////"
 }
});
