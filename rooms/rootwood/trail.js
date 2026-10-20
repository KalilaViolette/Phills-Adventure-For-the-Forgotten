// trail: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "trail",
 "region": "rootwood",
 "w": 40,
 "h": 30,
 "music": "rootwood",
 "viewBottom": 480,
 "art": {
  "main": "art/rootwood/trail.png#main",
  "pack": "art/rootwood/trail.png",
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
    1348,
    568
   ],
   "L1": [
    0,
    1048,
    1204,
    551
   ],
   "L2": [
    0,
    1599,
    1044,
    532
   ],
   "L3": [
    0,
    2131,
    868,
    510
   ],
   "L4": [
    0,
    2641,
    836,
    628
   ]
  },
  "layers": [
   {
    "src": "art/rootwood/trail.png#L0",
    "f": 0.12
   },
   {
    "src": "art/rootwood/trail.png#L1",
    "f": 0.3
   },
   {
    "src": "art/rootwood/trail.png#L2",
    "f": 0.5
   },
   {
    "src": "art/rootwood/trail.png#L3",
    "f": 0.72
   },
   {
    "src": "art/rootwood/trail.png#L4",
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
  "##....................=====...........##",
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
   "f": -1
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
   129,
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
  "bits": "/////////////////j/+H/wH/AH8APgA+AD4APAA8AD//////////////////////////3//f/8//w//Af8A/////////////////////////////////////////4+A///////////////////////////////////////fAB///////////////////////////////////////3/wP//////////////////////////////////////////g////////////////////////////4/+D/wH+Af4AAAD///////////////////////////+//4//gf+A/4D/gP////////////////////////////////////9//3AA//////////////////////5//j/8P/w/uD8APwA/AD//////////////////////////////////////////wP///////////////////////////////////////x/////////////////////////////////////////4/8D//////////////////////////+//7//P/8//T/8P//////////////////////////////////////////h//////////////////////////////////////////87//////////////////////////////////P/4//AAAP//////////////////////////////5//Df8M/gR4A/////////////////////////////////h/8BwAHAAf///////////////////////////8//j/8H9wPwA/AAP/////////////////////////////////////w/8Af//////////////////////////////////////////7///////////////////////////////////////8AA///////////////////////////////////////8P/g/////////////////////////////////////3//H////////////////////////////////////////+D/gP////////////////////////////////////8//wH////////////////////////////////////h/8D/AH/////////////////////////////////////////4AP//////////////////////////////////////hwwB+AD4APAA4ADAAMAAgACAAAAAAACAAIAAgACAAMAAwAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAPAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4D4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4A8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8H8ADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/8/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/AA8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//A/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAPAA8ABwADAAMAAQABAAEAAQABAAEAAQAAAAAAAP////////////////////////////7//v/8//z//P/8wADAAMAAwADAAMAAwACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAf//////////////////f/9//3//f/////////////////z//P/8//7//v/+//7//v/+//z//P/8//7//v/+//4AAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////9//3//f/9/////////////AAAAAAAAAAAAAAAAAAAAAAAAgACAAMAAwADgAOAAwADAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAMAAwAHAAcABwADAAMAAwAD/////////////////////v/+//z//P/8//z//v/+//6AAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQADAAMAAwADAAMAAwADAAMAAwAD//7///////////////////////////////////////8AAAAAAAAAAAAAAAAAAIAAgACAAIAAwADAAOAA4ADgAAADAAMAAwADAAMAAwADAAMAAwADAAMAAQABAAAAAAAAwADAAIAAgAAAAAAAAAAAAAAAgACAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAMAAwADAAMAAwADAAEAAf////////////////////////////7//v/8//z//P/8gACAAIAAgACAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/+//7//v/+//7//v/+//z//P/+//7/////////////AAAAAQABAAEAAQABAAEAAQABAAEAAQABAAMAAwADAAMAAwADAAMAAQABAAEAAQABAAEAAwADAAMAAwADAAMAAwAAAAAAAAAAAAAAAAAAgACAAIAAgACAAIAAgACAAIAAAAMAAwADAAMAAwADAAMAAwABAAEAAQAAAAAAAAAAAAD////////////+//7//v/+//7//v/+//7//v///////wAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAP/z//f/9////////////////////////////////////w//z//v/+///////////////////////////////+/////3//f/8//x//H/8f/x//P/8//3//f/9//////////v/+//7//v/+/////////////////////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8D/x//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/A//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/4D//v///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AP/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAHAAf/////////////////////////////f/9//3///////////////wAAAAAAAAAAAAAAAAAAgADAAOAA8AD4APwA/x//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA/8D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB/3////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4P///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD/wP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAf/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/7//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP/+/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AP//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+A="
 }
});
