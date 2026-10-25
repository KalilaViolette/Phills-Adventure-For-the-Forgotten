// bearhome: made by Source/Rooms, don't edit by hand (change the room's .py file and run Make-Rooms.bat)
ROOM({
 "id": "bearhome",
 "region": "rootwood",
 "w": 29,
 "h": 12,
 "music": "bear",
 "viewBottom": 192,
 "art": {
  "main": "art/rootwood/painted/bearhome.png#main",
  "pack": "art/rootwood/painted/bearhome.png",
  "parts": {
   "main": [
    0,
    0,
    464,
    192
   ]
  },
  "uses": [
   "art/rootwood/rootwood_sprites.png",
   "art/rootwood/rootwood_items.png"
  ],
  "items": "art/rootwood/rootwood_items.png"
 },
 "doors": [
  {
   "id": "down",
   "edge": "bottom",
   "a": 80,
   "b": 128,
   "to": "eastedge",
   "toDoor": "bearhole",
   "x": 176,
   "y": 141,
   "f": 1,
   "keepX": false,
   "far": true
  }
 ],
 "items": [],
 "hints": [],
 "gates": [],
 "events": [],
 "spawn": null,
 "tiles": [
  "#############################",
  "#############################",
  "###.......................###",
  "##.........................##",
  "#..........................##",
  "#..........................##",
  "#..........................##",
  "#....................======##",
  "#..........................##",
  "#####..######################",
  "#####..######################",
  "#####..######################"
 ],
 "mapAt": [
  358,
  100
 ],
 "floor": "dirt",
 "shade": {
  "a": 0.25,
  "lights": [
   [
    568,
    192,
    90,
    0.8
   ],
   [
    328,
    192,
    120,
    0.9
   ],
   [
    504,
    256,
    70,
    0.5
   ]
  ]
 },
 "ambient": [
  "spores"
 ],
 "ramps": [
  [
   [
    256,
    144
   ],
   [
    328.0,
    105.6
   ]
  ]
 ],
 "rest": {
  "x": 248.0,
  "y": 144
 },
 "foes": []
});
