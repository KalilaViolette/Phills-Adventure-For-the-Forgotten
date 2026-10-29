// culvert: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "culvert",
 "region": "playground",
 "w": 60,
 "h": 32,
 "music": "deep",
 "viewBottom": 512,
 "art": {
  "main": "art/playground/culvert.webp#main",
  "pack": "art/playground/culvert.webp",
  "parts": {
   "main": [
    0,
    0,
    960,
    512
   ],
   "L0": [
    0,
    512,
    681,
    402
   ],
   "L1": [
    0,
    914,
    738,
    425
   ],
   "L2": [
    0,
    1339,
    802,
    329
   ],
   "L3": [
    0,
    1668,
    862,
    471
   ],
   "L4": [
    0,
    2139,
    995,
    55
   ],
   "L5": [
    0,
    2194,
    911,
    54
   ],
   "front": [
    0,
    2248,
    656,
    64
   ]
  },
  "layers": [
   {
    "src": "art/playground/culvert.webp#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/culvert.webp#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/culvert.webp#L2",
    "f": 0.5,
    "y": 121
   },
   {
    "src": "art/playground/culvert.webp#L3",
    "f": 0.72,
    "x": 11,
    "y": 8
   },
   {
    "src": "art/playground/culvert.webp#L4",
    "f": 1.35,
    "x": 107,
    "y": 536
   },
   {
    "src": "art/playground/culvert.webp#L5",
    "f": 1.35,
    "fy": 1.0,
    "x": 193
   }
  ],
  "front": "art/playground/culvert.webp#front",
  "frontAt": [
   0,
   384
  ],
  "uses": [
   "art/playground/playground_sprites.png",
   "art/playground/playground_items.png",
   "art/pond/pond_sprites.png"
  ],
  "items": "art/playground/playground_items.png"
 },
 "doors": [
  {
   "id": "pipe",
   "edge": "left",
   "a": 352,
   "b": 448,
   "to": "pipe",
   "toDoor": "culvert",
   "x": 24.0,
   "y": 408.0,
   "f": 1,
   "swim": true
  },
  {
   "id": "up",
   "edge": "top",
   "a": 704,
   "b": 768,
   "to": "dandelions",
   "toDoor": "grate",
   "x": 728.0,
   "y": 32,
   "f": 1,
   "keepX": true,
   "falling": true
  }
 ],
 "items": [
  {
   "id": "marble_culvert_marbles_0",
   "x": 820.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_culvert_marbles_1",
   "x": 828.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_culvert_marbles_2",
   "x": 836.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_culvert_marbles_3",
   "x": 844.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_culvert_marbles_4",
   "x": 852.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "marble_culvert_marbles_5",
   "x": 860.0,
   "y": 384,
   "kind": "marble"
  },
  {
   "id": "cotton_culvert",
   "x": 904.0,
   "y": 384,
   "kind": "cotton"
  }
 ],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "############################################....############",
  "############################################....############",
  "############################################====############",
  "############################################....############",
  "############################################....############",
  "############################################....############",
  "############################################....############",
  "############################################====############",
  "############################################....############",
  "############################################....############",
  "############################################....############",
  "############################################....############",
  "............................................====............",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................====............",
  "............................................................",
  "............................................................",
  "............................................................",
  "................................................====........",
  "............................................................",
  "............................................................",
  "............................................................",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~###################",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~###################",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~###################",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~###################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  1038,
  128
 ],
 "floor": "chips",
 "shade": {
  "a": 0.56,
  "lights": [
   [
    736,
    10,
    110,
    0.8
   ]
  ],
  "tint": "#1a2a4a"
 },
 "ambient": [
  "bubbles"
 ],
 "drips": [
  [
   728,
   192,
   384,
   1.4
  ]
 ],
 "foes": [
  {
   "kind": "sponge",
   "x": 328.0,
   "y": 432,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   223,
   227,
   283,
   343,
   344,
   347,
   348,
   403,
   404,
   408,
   463,
   468,
   524,
   527,
   528,
   583,
   584,
   587,
   588,
   643,
   647,
   648,
   660,
   661,
   662,
   663,
   665,
   666,
   668,
   669,
   670,
   671,
   672,
   673,
   674,
   675,
   676,
   677,
   678,
   679,
   681,
   683,
   684,
   685,
   686,
   687,
   689,
   690,
   691,
   692,
   693,
   694,
   695,
   697,
   698,
   700,
   701,
   703,
   708,
   709,
   710,
   711,
   716,
   717,
   720,
   721,
   723,
   724,
   725,
   726,
   727,
   728,
   729,
   732,
   734,
   738,
   739,
   740,
   741,
   742,
   743,
   744,
   745,
   746,
   747,
   748,
   750,
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
   768,
   770,
   771,
   772,
   773,
   774,
   775,
   777,
   778,
   779,
   1481,
   1601,
   1661
  ],
  "bits": "//////////7//P/+//7//v/+/////////////v////8AAAAAAAAAAAABAAEAAQADAAMAAwADAAMAAQABAAEAAP///////////////v/+//7//v/8//z//P/8//z//v/+///////////////////////////////+//7//v/+//4AAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAA//////////////////////////////////9//3//f////v/+/////////////////////////////////////gAAAAAAAAAAgACAAMAAwADAAMAAwADAAMAAgAAAAAAAf/9//3//f/9//3//f/9//3//f////////////////////v/+//z//P/8//z//P/+////////////////////////////////////////////////f/9//z//P/8//z//gADAAMAAgACAAAAAAAAAAIAAgACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAMAAz//P/8//z//P/8//x//H/8//z//f////////////////////////////////////////////////////v/+//7AAMAAwADAAIAAgACAAIAAgACAAAAAAAAAAAAAAAAAAAADAAMAAwADAAMAAQABAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////3//f/9//3///////v/+//7//v/+//7//P/8//z/+P/4//j//P/8//z//AAAAAAAAAABAAEAAQABAAEAAAAAAAAAAAAAAAAAAAAA////////////////////////////////f/9//z//P///////////////////////////////////////////4P/////////////////////////////////////////+//////////////////////////////////////8HAAD///////////////////////////////////////9//////////////////////////////////////////8AA////////////////////////////////////////M//////////////////////////////////////x/+D/4P///////////////////////////////+f/x/8H/wf/////////////////////////////////////////z////////////////////////////////////v/9/5/4D/////////////////////////////9///////////////////////////////////////////////////8/gAP/////////////////////////////////////////3P//////////////////////////////////j/8APwAf//////////////////////////////////////4H+AD//////////////////////////////////8D/AD8AAP///////////////////////////////////////3vy////////////////////////////////////////H///////////////////////////////////////////wP////////////////////////////////////////Af/////////////////////////////////////////8D/////////////////////////////////////gf8Af////////////////////////////////////z//CP4A//////////////////////////////////8D/wD/AD//////////////////////////////////////wfuAAP///////////////////////////////////////3////////////////////////////////////////////j///////////////////////////////////////8D///////////////////////////////////////////g////////////////////////////////////////f//////////////////////////////////////////wD////////////////////////////////////////wH/////////////////////////////////////////wB///////////////////////////////////////4f/AP///////////////////////////////////////w////z//P/8//z//P/8//z//P/8//7//v/8//j/8P/g8AB//3//f/9//z//P/8//z//P/9//3//P/8f/w//B/8AcP///////////////////////////////////////wAA////////////////////////////////////////H///////////////////////////////////////////D/////////////////////////////z/4P/g/AD4AOAA//////////////////////////8//x//H/8f/w//B///AP4AfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/gP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wP8APgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//z+fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//h+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8AHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//4A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wA/AAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA8ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AHkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+A7gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/wP/APwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/z//f/9//////////////////////////////////////////////////////////////////3//f/9//3//f/////////////////////////////////////////8="
 }
});
