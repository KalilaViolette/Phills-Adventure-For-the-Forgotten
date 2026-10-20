// bins: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "bins",
 "region": "playground",
 "w": 60,
 "h": 36,
 "music": "playground",
 "viewBottom": 576,
 "art": {
  "main": "art/playground/bins.png#main",
  "pack": "art/playground/bins.png",
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
    "src": "art/playground/bins.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/bins.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/bins.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/bins.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/bins.png#L4",
    "f": 1.3
   }
  ],
  "uses": [
   "art/playground/playground_sprites.png",
   "art/playground/playground_items.png",
   "art/wildlife/wildlife.png"
  ],
  "items": "art/playground/playground_items.png"
 },
 "doors": [
  {
   "id": "gate",
   "edge": "left",
   "a": 416,
   "b": 480,
   "to": "gate",
   "toDoor": "bins",
   "x": 24.0,
   "y": 480,
   "f": 1,
   "swim": false
  },
  {
   "id": "puddle",
   "edge": "right",
   "a": 416,
   "b": 480,
   "to": "puddle",
   "toDoor": "bins",
   "x": 936.0,
   "y": 480,
   "f": -1,
   "swim": false
  }
 ],
 "items": [
  {
   "id": "marble_bins_stash_0",
   "x": 808.0,
   "y": 480,
   "kind": "marble"
  },
  {
   "id": "marble_bins_stash_1",
   "x": 816.0,
   "y": 480,
   "kind": "marble"
  },
  {
   "id": "marble_bins_stash_2",
   "x": 824.0,
   "y": 480,
   "kind": "marble"
  },
  {
   "id": "marble_bins_stash_3",
   "x": 832.0,
   "y": 480,
   "kind": "marble"
  },
  {
   "id": "marble_bins_stash_4",
   "x": 840.0,
   "y": 480,
   "kind": "marble"
  },
  {
   "id": "marble_bins_marbles_0",
   "x": 510.0,
   "y": 400,
   "kind": "marble"
  },
  {
   "id": "marble_bins_marbles_1",
   "x": 520.0,
   "y": 400,
   "kind": "marble"
  },
  {
   "id": "marble_bins_marbles_2",
   "x": 530.0,
   "y": 400,
   "kind": "marble"
  }
 ],
 "hints": [
  {
   "text": "a bin on its side. something's rattling around in there",
   "l": 640,
   "t": 352,
   "r": 800,
   "b": 480,
   "x": 768,
   "y": 400
  }
 ],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
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
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "............................................................",
  "......................................=====.................",
  "............................................................",
  "............................................................",
  "......................======..####..........................",
  "..............###.............####............#########.....",
  "..............###.............####............#########.....",
  "..............###.............####....................#.....",
  "..........#################################...........#.....",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################",
  "############################################################"
 ],
 "mapAt": [
  458,
  92
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    64,
    170,
    150,
    0.95
   ],
   [
    475,
    246,
    26,
    0.4
   ],
   [
    777,
    162,
    26,
    0.4
   ],
   [
    308,
    294,
    26,
    0.4
   ],
   [
    467,
    176,
    26,
    0.4
   ],
   [
    389,
    165,
    26,
    0.4
   ],
   [
    161,
    272,
    26,
    0.4
   ]
  ],
  "tint": "#2a1a3a"
 },
 "ambient": [
  "motes",
  "fireflies"
 ],
 "wildlife": [
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 781,
   "y0": 223,
   "y1": 324,
   "every": [
    8,
    22
   ]
  },
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 781,
   "y0": 202,
   "y1": 302,
   "every": [
    12,
    30
   ],
   "first": 9
  }
 ],
 "foes": [
  {
   "kind": "teeth",
   "x": 136.0,
   "y": 480,
   "f": 1
  },
  {
   "kind": "teeth",
   "x": 424.0,
   "y": 464,
   "f": -1
  },
  {
   "kind": "jack",
   "x": 648.0,
   "y": 464,
   "f": -1
  },
  {
   "kind": "bucket",
   "x": 728.0,
   "y": 480,
   "f": -1
  },
  {
   "kind": "balloon",
   "x": 392.0,
   "y": 224,
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
   1748,
   1749,
   1783,
   1784,
   1785,
   1786,
   1787,
   1788,
   1795,
   1796
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+P//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wP/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAP+A/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD+AP/A//gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AD/gP/4"
 }
});
