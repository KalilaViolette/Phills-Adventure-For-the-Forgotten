// pipe: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "pipe",
 "region": "playground",
 "w": 60,
 "h": 28,
 "music": "deep",
 "viewBottom": 448,
 "art": {
  "main": "art/playground/pipe.png#main",
  "pack": "art/playground/pipe.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    448
   ],
   "L0": [
    0,
    448,
    1386,
    564
   ],
   "L1": [
    0,
    1012,
    1300,
    541
   ],
   "L2": [
    0,
    1553,
    1204,
    516
   ],
   "L3": [
    0,
    2069,
    1098,
    487
   ],
   "L4": [
    0,
    2556,
    1300,
    608
   ],
   "L5": [
    0,
    3164,
    1300,
    452
   ],
   "front": [
    0,
    3616,
    672,
    64
   ]
  },
  "layers": [
   {
    "src": "art/playground/pipe.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/pipe.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/pipe.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/pipe.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/pipe.png#L4",
    "f": 1.35
   },
   {
    "src": "art/playground/pipe.png#L5",
    "f": 1.35,
    "fy": 1.0
   }
  ],
  "front": "art/playground/pipe.png#front",
  "frontAt": [
   288,
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
   "id": "fountain",
   "edge": "left",
   "a": 320,
   "b": 384,
   "to": "fountain",
   "toDoor": "pipe",
   "x": 24.0,
   "y": 384,
   "f": 1,
   "swim": false
  },
  {
   "id": "culvert",
   "edge": "right",
   "a": 352,
   "b": 448,
   "to": "culvert",
   "toDoor": "pipe",
   "x": 936.0,
   "y": 408.0,
   "f": -1,
   "swim": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "##################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "##################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "##################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "##################~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
 ],
 "mapAt": [
  978,
  128
 ],
 "floor": "chips",
 "shade": {
  "a": 0.56,
  "lights": [
   [
    96,
    224,
    90,
    0.6
   ],
   [
    928,
    288,
    180,
    0.7
   ]
  ],
  "tint": "#1a2a4a"
 },
 "ambient": [
  "bubbles"
 ],
 "drips": [
  [
   392,
   192,
   374,
   1.8
  ],
  [
   632,
   192,
   374,
   2.3
  ]
 ],
 "foes": [
  {
   "kind": "sponge",
   "x": 648.0,
   "y": 432,
   "f": -1
  },
  {
   "kind": "bobber",
   "x": 488.0,
   "y": 384,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   660,
   662,
   663,
   664,
   665,
   666,
   668,
   669,
   671,
   672,
   673,
   674,
   675,
   676,
   677,
   680,
   683,
   684,
   687,
   688,
   690,
   691,
   692,
   693,
   694,
   695,
   696,
   700,
   701,
   702,
   704,
   705,
   710,
   714,
   716,
   717,
   719,
   721,
   722,
   723,
   724,
   725,
   727,
   729,
   730,
   731,
   732,
   735,
   736,
   737,
   738,
   739,
   740,
   741,
   742,
   743,
   745,
   746,
   747,
   749,
   751,
   752,
   753,
   755,
   757,
   758,
   759,
   760,
   761,
   762,
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
   777,
   778,
   779,
   1457,
   1517,
   1577,
   1637
  ],
  "bits": "////////////////////////////////////////AA///////////////////////+//x//D/QP8A/wB/AH8AP////////////////////////////////////Ef4QBh/////////////////////////////////////////4/////////////////////////////////////8/+D/wP//////////////////////////////////H/8H/wD////////////////////////////////////////w8AD/////////////////////////////////////D/8AP///////////////////////////////////////P/gP/////////////////////////////////////////8D///////////////////////////////////////9//P////////////////////////////////////8B/wAf///////////////////////////////////////9/+D///////////////////////////////////////8//////////////////////////////////////////9//////////////////////////////////////////8f//////////////////////////////////////////8P////////////////////////////////////+AHwAH///////////////////////////////////////9//D///////////////////////////////////////8A//////////////////////////////////////n/4PwA////////////////////////////////////////P////////////////////////////////////////4P4AP///////////////////////////////////////P/4/////////////////////////////////////w//Af/////////////////////////////////////////AP/////////////////////////////////////////AD///////////////////////////////////w/8A/AA////////////////////////P/4P/A/+D/8P/4//z/8P///////////////////////3//P/8f/x//D/8P/wP////////////////////////////////9//3//P/8//z/////////////////////////////////////f/8////////////////////////////////////////////w/////////////////////////////////////////4f///////////////////////f/4//h/+H/wPAA4ACAAP///////////////////////////////3//P/8D/wP////////////////////////////////+//7//v/+//4f/wP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+APwAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8f4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAcAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+APwAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/8P/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+A/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/wB/AA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////jwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8APwAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+APAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/5MOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9w/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+P+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wH8ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgPAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j/wB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///+HBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/88/gA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//x//A4EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////zw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8H8ADwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/A/wA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+AHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/DwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//D/8HgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8H+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/gA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/w//z//v/+//////////////////////////7//v///////////////////////////////v/+//z//P/8//z//P/8//z//P/4//j//P/8//7//v/+//7//v/+//7//P/8//z//P/+//7/////////////////////////////"
 }
});
