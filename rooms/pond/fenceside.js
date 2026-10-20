// fenceside: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "fenceside",
 "region": "pond",
 "w": 60,
 "h": 36,
 "music": "pond",
 "viewBottom": 576,
 "art": {
  "main": "art/pond/fenceside.png#main",
  "pack": "art/pond/fenceside.png",
  "parts": {
   "main": [
    0,
    0,
    960,
    576
   ],
   "L0": [
    0,
    576,
    1386,
    580
   ],
   "L1": [
    0,
    1156,
    1300,
    580
   ],
   "L2": [
    0,
    1736,
    1204,
    580
   ],
   "L3": [
    0,
    2316,
    1098,
    580
   ],
   "L4": [
    0,
    2896,
    1252,
    752
   ]
  },
  "layers": [
   {
    "src": "art/pond/fenceside.png#L0",
    "f": 0.12
   },
   {
    "src": "art/pond/fenceside.png#L1",
    "f": 0.3
   },
   {
    "src": "art/pond/fenceside.png#L2",
    "f": 0.5
   },
   {
    "src": "art/pond/fenceside.png#L3",
    "f": 0.72
   },
   {
    "src": "art/pond/fenceside.png#L4",
    "f": 1.3
   }
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
   "id": "swan",
   "edge": "right",
   "a": 416,
   "b": 480,
   "to": "swan",
   "toDoor": "fence",
   "x": 936.0,
   "y": 480,
   "f": -1,
   "swim": false
  },
  {
   "id": "home",
   "edge": "left",
   "a": 416,
   "b": 480,
   "to": "backyard",
   "toDoor": "pond",
   "x": 24.0,
   "y": 480,
   "f": 1,
   "swim": false,
   "endgame": true
  }
 ],
 "items": [
  {
   "id": "memory_bucket",
   "x": 200.0,
   "y": 480,
   "kind": "memory"
  }
 ],
 "hints": [
  {
   "text": "the fence. home's just the other side",
   "l": 64,
   "t": 160,
   "r": 256,
   "b": 480,
   "x": 128,
   "y": 352
  }
 ],
 "gates": [
  {
   "x0": 0,
   "y0": 26,
   "x1": 1,
   "y1": 29,
   "flag": "goingHome",
   "look": "none"
  }
 ],
 "events": [],
 "spawn": null,
 "tiles": [
  "############################################################",
  "############################################################",
  "############################################################",
  "............................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####........................................................",
  "####..........................=======.......................",
  "####........................................................",
  "####....###########.........................................",
  "####....###########.........................................",
  "........#...................................................",
  "........#...................................................",
  "........#.........................................####......",
  "........#.......................................########....",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  -592,
  84
 ],
 "floor": "mud",
 "shade": {
  "a": 0.12,
  "lights": [
   [
    712,
    460,
    90,
    0.8
   ]
  ],
  "tint": null
 },
 "ambient": [
  "motes",
  "midges"
 ],
 "rest": {
  "x": 712.0,
  "y": 480
 },
 "breaks": [
  {
   "id": "foam_pot",
   "x0": 18,
   "y0": 26,
   "x1": 18,
   "y1": 29,
   "hp": 1,
   "look": "foam",
   "need": "squeak"
  }
 ],
 "wildlife": [
  {
   "kind": "heron",
   "at": "L1",
   "x0": 224,
   "x1": 512,
   "y": 271,
   "every": [
    40,
    90
   ]
  },
  {
   "kind": "goose",
   "at": "L0",
   "x0": 0,
   "x1": 1386,
   "y0": 30,
   "y1": 90,
   "every": [
    70,
    160
   ]
  },
  {
   "kind": "sparrow",
   "at": "back",
   "x0": 480,
   "x1": 576,
   "y": 352,
   "every": [
    14,
    34
   ]
  }
 ],
 "foes": [
  {
   "kind": "duck",
   "x": 488.0,
   "y": 480,
   "f": -1
  },
  {
   "kind": "bag",
   "x": 360.0,
   "y": 320,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1743,
   1744,
   1745,
   1746,
   1747,
   1749,
   1750,
   1754,
   1755,
   1756,
   1760,
   1761,
   1762,
   1763,
   1764,
   1765,
   1766,
   1767,
   1768,
   1769,
   1770,
   1771,
   1772,
   1773,
   1774,
   1775,
   1776,
   1777,
   1778,
   1779,
   1780,
   1781,
   1782,
   1786,
   1787,
   1796
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMADwA/A/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAA/gD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAP+A//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwD/A/8f/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAA8AD+AP/A//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Af8P/3////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAP//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwA/+D///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//j///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA//D//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHg//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8A/wf/f////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/P////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgADwAP/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAB8AfwP/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AD+AP/w"
 }
});
