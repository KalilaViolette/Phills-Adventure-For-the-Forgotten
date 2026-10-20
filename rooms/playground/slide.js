// slide: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "slide",
 "region": "playground",
 "w": 40,
 "h": 50,
 "music": "playground",
 "viewBottom": 800,
 "art": {
  "main": "art/playground/slide.png#main",
  "pack": "art/playground/slide.png",
  "parts": {
   "main": [
    0,
    0,
    640,
    800
   ],
   "L0": [
    0,
    800,
    1348,
    606
   ],
   "L1": [
    0,
    1406,
    1204,
    647
   ],
   "L2": [
    0,
    2053,
    1044,
    692
   ],
   "L3": [
    0,
    2745,
    868,
    741
   ],
   "L4": [
    0,
    3486,
    836,
    1044
   ]
  },
  "layers": [
   {
    "src": "art/playground/slide.png#L0",
    "f": 0.12
   },
   {
    "src": "art/playground/slide.png#L1",
    "f": 0.3
   },
   {
    "src": "art/playground/slide.png#L2",
    "f": 0.5
   },
   {
    "src": "art/playground/slide.png#L3",
    "f": 0.72
   },
   {
    "src": "art/playground/slide.png#L4",
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
   "id": "spinner",
   "edge": "left",
   "a": 640,
   "b": 704,
   "to": "spinner",
   "toDoor": "slide",
   "x": 24.0,
   "y": 704,
   "f": 1,
   "swim": false
  },
  {
   "id": "down",
   "edge": "bottom",
   "a": 480,
   "b": 640,
   "to": "lostfound",
   "toDoor": "slide",
   "x": 560,
   "y": 784,
   "f": 1,
   "keepX": true,
   "exitOnly": true
  }
 ],
 "items": [
  {
   "id": "crayon_playground",
   "x": 72.0,
   "y": 176,
   "kind": "crayon",
   "col": "#e8843a",
   "behind": "gateSlide"
  }
 ],
 "hints": [],
 "gates": [
  {
   "x0": 0,
   "y0": 16,
   "x1": 26,
   "y1": 16,
   "flag": "gateSlide",
   "look": "hatch"
  }
 ],
 "events": [],
 "spawn": null,
 "tiles": [
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "===========.............................",
  "........................................",
  "........................................",
  "........................................",
  "......======............................",
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "..............======....................",
  "........................................",
  "........................................",
  "........................................",
  "......======............................",
  "........................................",
  "........................................",
  "........................................",
  "..............======....................",
  "........................................",
  "........................................",
  "........................................",
  "......======............................",
  "........................................",
  "........................................",
  "........................................",
  "..............======....................",
  "........................................",
  "........................................",
  "........................................",
  "......======............................",
  "........................................",
  "........................................",
  "........................................",
  "##############################..........",
  "##############################..........",
  "##############################..........",
  "##############################..........",
  "##############################..........",
  "##############################.........."
 ],
 "mapAt": [
  818,
  50
 ],
 "floor": "chips",
 "shade": {
  "a": 0.26,
  "lights": [
   [
    58,
    535,
    26,
    0.4
   ],
   [
    96,
    427,
    26,
    0.4
   ],
   [
    538,
    431,
    26,
    0.4
   ],
   [
    193,
    228,
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
 "cranks": [
  {
   "id": "gateSlide",
   "x": 280.0,
   "y": 320,
   "tx": 17,
   "ty": 20,
   "flag": "gateSlide"
  }
 ],
 "chute": {
  "x0": 200.0,
  "y0": 176,
  "x1": 600.0,
  "y1": 688
 },
 "wildlife": [
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 550,
   "y0": 707,
   "y1": 808,
   "every": [
    8,
    22
   ]
  },
  {
   "kind": "bat",
   "at": "L3",
   "x0": 90,
   "x1": 550,
   "y0": 685,
   "y1": 786,
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
   "x": 360.0,
   "y": 704,
   "f": -1
  }
 ],
 "detail": {
  "tiles": [
   1723,
   1724,
   1725,
   1726,
   1727,
   1728,
   1729,
   1730,
   1731,
   1732,
   1733,
   1734,
   1735,
   1736,
   1737,
   1738,
   1739,
   1740,
   1741,
   1742,
   1743,
   1744,
   1745,
   1746,
   1747,
   1748,
   1789
  ],
  "bits": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwH/H/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAB//////////////AAAAAAAAAAAAAAAAAAAAAAAAAADAAP4A//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH7//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AD/wP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAH+A//z//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAB8A/x//////////AAAAAAAAAAAAAAAAAAAAAAAAAADgAP////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAPAA/AD/AP/w//z//v/+////////////////////////////////"
 }
});
