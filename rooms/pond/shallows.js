// shallows: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "shallows",
 "region": "pond",
 "w": 60,
 "h": 30,
 "music": "pond",
 "viewBottom": 480,
 "art": {
  "main": "art/pond/shallows.png#main",
  "pack": "art/pond/shallows.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    480
   ],
   "L0": [
    0,
    480,
    1386,
    568
   ],
   "L1": [
    0,
    1048,
    1300,
    551
   ],
   "L2": [
    0,
    1599,
    1204,
    532
   ],
   "L3": [
    0,
    2131,
    1098,
    510
   ],
   "L4": [
    0,
    2641,
    1252,
    628
   ],
   "front": [
    0,
    3269,
    128,
    192
   ]
  },
  "layers": [
   {
    "src": "art/pond/shallows.png#L0",
    "f": 0.12
   },
   {
    "src": "art/pond/shallows.png#L1",
    "f": 0.3
   },
   {
    "src": "art/pond/shallows.png#L2",
    "f": 0.5
   },
   {
    "src": "art/pond/shallows.png#L3",
    "f": 0.72
   },
   {
    "src": "art/pond/shallows.png#L4",
    "f": 1.3
   }
  ],
  "front": "art/pond/shallows.png#front",
  "frontAt": [
   400,
   288
  ],
  "uses": [
   "art/pond/pond_sprites.png",
   "art/pond/pond_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/pond/pond_items.png"
 },
 "doors": [
  {
   "id": "reeds",
   "edge": "right",
   "a": 192,
   "b": 256,
   "to": "reedbank",
   "toDoor": "shallows",
   "x": 936.0,
   "y": 256,
   "f": -1,
   "swim": false,
   "needs": "charged"
  },
  {
   "id": "dock",
   "edge": "left",
   "a": 224,
   "b": 288,
   "to": "dock",
   "toDoor": "shallows",
   "x": 24.0,
   "y": 288,
   "f": 1,
   "swim": false
  },
  {
   "id": "drain",
   "edge": "bottom",
   "a": 480,
   "b": 528,
   "to": "drainmouth",
   "toDoor": "up",
   "x": 504.0,
   "y": 464,
   "f": 1,
   "keepX": true,
   "swim": true,
   "falling": false,
   "exitOnly": false
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
  "............................................................",
  "..........##....................................############",
  "..........##............................####################",
  "#########################~~~##~~~###########################",
  "#########################~~~##~~~###########################",
  "#########################~~~##~~~###########################",
  "#########################~~~##~~~###########################",
  "#########################~~~##~~~###########################",
  "##########################~~##~~~###########################",
  "##########################~~##~~~###########################",
  "##########################~~##~~~###########################",
  "##########################~~##~~~###########################",
  "##############################~~~###########################",
  "##############################~~~###########################",
  "##############################~~~###########################"
 ],
 "mapAt": [
  -232,
  92
 ],
 "floor": "mud",
 "shade": {
  "a": 0.12,
  "lights": [],
  "tint": null
 },
 "ambient": [
  "motes",
  "midges"
 ],
 "wildlife": [
  {
   "kind": "heron",
   "at": "L1",
   "x0": 224,
   "x1": 512,
   "y": 233,
   "every": [
    40,
    90
   ]
  },
  {
   "kind": "turtle",
   "at": "back",
   "y": 256,
   "x": 176,
   "every": [
    30,
    70
   ]
  }
 ],
 "foes": [
  {
   "kind": "bobber",
   "x": 424.0,
   "y": 288,
   "f": -1
  },
  {
   "kind": "bobber",
   "x": 504.0,
   "y": 288,
   "f": -1
  },
  {
   "kind": "frog",
   "x": 712.0,
   "y": 272,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   949,
   950,
   951,
   952,
   953,
   954,
   955,
   956,
   970,
   971,
   1001,
   1002,
   1003,
   1004,
   1005,
   1006,
   1007,
   1023,
   1024,
   1025,
   1026,
   1027,
   1028,
   1029,
   1031,
   1032,
   1033,
   1034,
   1035,
   1036,
   1037,
   1038,
   1039,
   1040,
   1041,
   1042,
   1043,
   1054,
   1055,
   1056,
   1057,
   1058,
   1059,
   1104,
   1113,
   1164,
   1173,
   1233,
   1284,
   1344,
   1405,
   1413,
   1465,
   1473,
   1525,
   1585,
   1593,
   1647,
   1707,
   1767
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4Af/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4f///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA/8D/+A//P/9//3////////////////////////////////////D//P/+//7///////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwH///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/g////////AAAAAAAAAAAAAAAAAAAAAAABAAMABwAfAD////////8ADwA/AP8D/wf/H/8//3///////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAB8Afwf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8A//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAP/w/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgA///wAAAAEAAwADAAcADwAfAD8APwB/AP8B/wP/D/////////7//v/+//7///////////////////////////////8AAAAAAAAAAAAAgADAAOAA4AD4APwA/gD/AP/g/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwA/Af8//wAAAAAAAAAAAAAAAAAAAAAAAAAAAP8f////////////AAAAAAAAAAAAAAAAAAAAAAAAAAD/gP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+AP/8////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAPgA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/w//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAPwA/4D/4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAEABwAPAB8AfwP/AAcAPwD/Af8D/w//H/8//3//////////////////////8P/8//7//v/////////////////////////+//7//g//P/9//3////////////////////////////////////7//v/+//7//v///////v/+//7//v////////////////////////////9//3//P/8f/x//H/8f/x//H/8//z//P/8//3////////////////////////////////////////////////////7//P/8//z/+P/4//j/+P/4//j/+P/8//z//P/+//7////////////////////////////w//z//v/+//////////////////////////////////9//3//P/8//z//P/8f/x//H/8f/z//P/8//z//f//////////////+//7//v/+//z//P/8//j/+P/4//j/+H//f/9//3//f/9//3///////////////3//f/////////z//P/8//z//P/8//z//v/+//////////////////////////////////7//v/+//7//v/+//7//v////////////////////////////9//3//f/9//3////////////D//P/+//7//////////////////////////v/+//7//v/+//7//v/8//z//P/8//z//v/+//7//v/////////////////+//7//v/8//z/+P/4//j/+P/8//z//v/+"
 }
});
