'use strict';
// ---------- input: keyboard and controller (PlayStation layout) ----------
const keys = new Set();
const inp = { left: 0, right: 0, up: 0, down: 0, jumpH: 0, guardH: 0, atkH: 0, aim: 0, aimX: 0, aimY: 0, aimUp: 0, aimDown: 0, jumpP: 0, atkP: 0, dodgeP: 0, lockP: 0, upP: 0, downP: 0, mapP: 0, guardP: 0, squeakP: 0, spinP: 0, sparkP: 0, any: 0 };
const talkIn = { press: 0, up: 0, down: 0, back: 0, map: 0, move: 0, guard: 0 };   // presses for talking and menus (read before a scene clears the input)
const KEYMAP = {
  left: ['ArrowLeft', 'KeyA'], right: ['ArrowRight', 'KeyD'], up: ['ArrowUp', 'KeyW'], down: ['ArrowDown', 'KeyS'],
  jump: ['KeyZ', 'Space', 'KeyK'], atk: ['KeyX', 'KeyJ'], dodge: ['KeyC', 'KeyL'], guard: ['KeyV', 'ShiftLeft', 'ShiftRight', 'KeyI'], lock: ['KeyR'], map: ['KeyM', 'KeyQ'], squeak: ['KeyF', 'KeyU'], spin: ['KeyG', 'KeyO'], spark: ['KeyE'],
};
const keyIs = (code, act) => KEYMAP[act].includes(code);
// what the buttons are called, for whichever the player last used. Hints write them as {jump}, {atk} and so on
const BTN_NAMES = {
  key: { jump: 'z', atk: 'x', dodge: 'c', guard: 'v', map: 'm', squeak: 'f', spin: 'g', spark: 'e', up: 'up', down: 'down', left: 'left', right: 'right', lock: 'r' },
  pad: { jump: 'x', atk: 'r1', dodge: 'circle', guard: 'l1', map: 'share', squeak: 'triangle', spin: 'square', spark: 'r2', up: 'up', down: 'down', left: 'left', right: 'right', lock: 'r3' },
};
let device = null;
const fmtKeys = s => s.replace(/\{(\w+)\}/g, (m, a) => BTN_NAMES[device || 'key'][a] || a);
function useDevice(d) {
  if (d === device) return;
  device = d; if (typeof knownSig !== 'undefined') knownSig = '';
  const el = document.querySelector('#bar .keys');
  if (el) el.innerHTML = d === 'pad'
    ? '<span><b>X</b> jump</span><span>Walk into a low gap to crawl under it</span><span>Fall past a ledge and hold toward it to grab it. <b>Up</b> climbs, <b>Down</b> lets go</span><span><b>Down + X</b> drop through shelves</span><span>Hold <b>Up</b> or <b>Down</b> to look around</span><span><b>Circle</b> roll (once he figures it out)</span><span><b>R1</b> swing, <b>L1</b> shield (once he has them)</span><span><b>Right stick</b> turns him to face that way, so he can swing or hold his shield one way while walking the other (a bit slower). Up or down points the swing that way too</span><span><b>Triangle</b> squeak (once he learns it)</span><span><b>Square</b> spin (once he learns it)</span><span><b>Share</b> map</span>'
    : '<span><b>Z</b> jump</span><span>Walk into a low gap to crawl under it</span><span>Fall past a ledge and hold toward it to grab it. <b>Up</b> climbs, <b>Down</b> lets go</span><span><b>Down + Z</b> drop through shelves</span><span>Hold <b>Up</b> or <b>Down</b> to look around</span><span><b>C</b> roll (once he figures it out)</span><span><b>X</b> swing, <b>V</b> shield (once he has them)</span><span><b>F</b> squeak (once he learns it)</span><span><b>G</b> spin (once he learns it)</span><span><b>M</b> map</span>';
}
let started = false, paused = false, showBoxes = false, showDebug = false;
// the page's own controls that use the arrow keys and typing themselves (the input audit, 10/17/2026)
const ownsKeys = t => !!t && t.nodeType === 1 && (t.isContentEditable || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA' || (t.tagName === 'INPUT' && !['button', 'submit', 'reset', 'checkbox', 'radio'].includes(t.type)));
window.addEventListener('keydown', e => {
  if (e.code === 'Tab') { if (!started && window.titleMenu && titleMenu.open) return; e.preventDefault(); if (started && !e.repeat) toggleTune(); return; }   // (on the title menu Tab moves through it. Held down it opens once: the input audit, 10/17/2026)
  if (e.code === 'KeyH' && started) { showBoxes = !showBoxes; return; }
  if (e.code === 'F3') { e.preventDefault(); showDebug = !showDebug; return; }   // G is the spin now (a friend's playtest, 10/14/2026), so what's loaded is F3 or its button
  if (ownsKeys(e.target)) return;   // a slider (or a box to type in) that's picked takes its own keys: the arrows were moving Phill instead of the volume
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && !tuneOpen()) e.preventDefault();
  if (!started) { if (!(window.titleMenu && titleMenu.open)) begin(); return; }   // (the title menu takes the keys itself)
  if (e.repeat) return;
  keys.add(e.code); inp.any = 1; useDevice('key');
  if (keyIs(e.code, 'jump')) inp.jumpP = 1;
  if (keyIs(e.code, 'atk')) inp.atkP = 1;
  if (keyIs(e.code, 'dodge')) inp.dodgeP = 1;
  if (keyIs(e.code, 'lock')) inp.lockP = 1;
  if (keyIs(e.code, 'up')) inp.upP = 1;
  if (keyIs(e.code, 'down')) inp.downP = 1;
  if (keyIs(e.code, 'map')) inp.mapP = 1;
  if (keyIs(e.code, 'guard')) inp.guardP = 1;
  if (keyIs(e.code, 'squeak')) inp.squeakP = 1;
  if (keyIs(e.code, 'spin')) inp.spinP = 1;
  if (keyIs(e.code, 'spark')) inp.sparkP = 1;
});
window.addEventListener('keyup', e => keys.delete(e.code));
// picking a slider (or a box to type in) takes the keyboard off him: game keys already held down stop counting and
// presses not used yet are dropped, so he doesn't keep walking while the volume's being set (the fix check, 10/18/2026).
// Touch buttons ('T:') and the controller carry on. Holding a key through leaving it again needs a fresh press
window.addEventListener('focusin', e => {
  if (!ownsKeys(e.target)) return;
  for (const c of [...keys]) if (!c.startsWith('T:')) keys.delete(c);
  inp.jumpP = inp.atkP = inp.dodgeP = inp.lockP = inp.upP = inp.downP = inp.mapP = inp.guardP = inp.squeakP = inp.spinP = inp.sparkP = 0;
});
useDevice('key');                                    // keyboard names until a controller gets used
window.addEventListener('blur', () => keys.clear());

const prevBtn = [];
// some embedded viewers don't let pages see controllers at all
let padBlocked = false;
try { const fp = document.permissionsPolicy || document.featurePolicy; if (fp && fp.allowsFeature && !fp.allowsFeature('gamepad')) padBlocked = true; } catch (e) {}
try { if (navigator.getGamepads) navigator.getGamepads(); } catch (e) { padBlocked = true; }
let padId = null, padPrevY = 0, padWant = 0, padWantT = 0, padDir = 0;
function pollPad() {
  let pads = [];
  try { pads = navigator.getGamepads ? navigator.getGamepads() : []; } catch (e) { pads = []; }
  let gp = null;
  for (const p of pads) if (p && p.connected) { gp = p; break; }
  const padEl = document.getElementById('pad');
  if ((gp && gp.id) !== padId) {
    padId = gp ? gp.id : null;
    prevBtn.length = 0; padPrevY = 0;   // a new controller (or the same one back) starts fresh: one held as it comes back counts as pressed, same as the first time (the input audit: what the old one had down swallowed it)
    padEl.textContent = gp ? 'Controller: ' + gp.id.replace(/\(.*?\)/g, '').trim().slice(0, 40) : (padBlocked ? 'Controllers are blocked in this viewer: open the downloaded file' : 'No controller yet');
    padEl.className = gp ? '' : 'none';
  }
  const b = i => !!(gp && gp.buttons[i] && gp.buttons[i].pressed);
  const pressed = i => b(i) && !prevBtn[i];
  const ax = gp ? gp.axes[0] || 0 : 0, ay = gp ? gp.axes[1] || 0 : 0;
  const k = act => keys.has('T:' + act) || KEYMAP[act].some(c => keys.has(c));   // (a touch button holds 'T:' and its action: touch.js)
  if (gp && !started && !(window.titleMenu && titleMenu.open)) { for (let i = 0; i < gp.buttons.length; i++) if (pressed(i)) { begin(); break; } }
  if (gp && started && pressed(9)) toggleTune();
  if (tuneOpen()) { tunePad(gp, b, pressed, ay); }
  else {
    // the stick: a new direction counts once it's been held a moment, or straight away when it's pushed most of the way.
    // Letting go of a push swings the stick back through the middle and a little past it, and that flick was turning
    // him round the wrong way, so a short, soft swing is ignored
    const now = performance.now(), want = ax < -0.4 ? -1 : ax > 0.4 ? 1 : 0;
    if (want !== padWant) { padWant = want; padWantT = now; }
    padDir = want && (want === padDir || Math.abs(ax) > 0.85 || now - padWantT >= 60) ? want : 0;
    inp.left = k('left') || b(14) || padDir < 0 ? 1 : 0;
    inp.right = k('right') || b(15) || padDir > 0 ? 1 : 0;
    inp.up = k('up') || b(12) || ay < -0.55 ? 1 : 0;
    inp.down = k('down') || b(13) || ay > 0.55 ? 1 : 0;
    inp.jumpH = k('jump') || b(0) ? 1 : 0;
    // the right stick turns him to face the way it's pushed (10/16/2026: it used to hold the shield out that
    // way). His legs go on taking the left stick, so he can swing while backing off, and L1 holds the shield out the way
    // he's facing. Up or down with it points the swing (and the shield) up or down, like the direction keys do
    const rx = gp ? gp.axes[2] || 0 : 0, ry = gp ? gp.axes[3] || 0 : 0;
    inp.aim = Math.hypot(rx, ry) > 0.5 ? 1 : 0;
    inp.aimX = inp.aim && Math.abs(rx) > 0.4 ? Math.sign(rx) : 0;
    inp.aimUp = inp.aim && ry < -0.55 && Math.abs(rx) < 0.75 ? 1 : 0;
    inp.aimDown = inp.aim && ry > 0.55 && Math.abs(rx) < 0.75 ? 1 : 0;
    inp.aimY = inp.aim && Math.abs(ry) > 0.4 ? Math.sign(ry) : 0;                      // (under water the lid points all 8 ways, 10/16/2026)
    inp.guardH = k('guard') || b(4) ? 1 : 0;
    inp.atkH = k('atk') || b(5) ? 1 : 0;
    if (pressed(0)) inp.jumpP = 1;
    if (pressed(5)) inp.atkP = 1;
    if (pressed(1)) inp.dodgeP = 1;
    if (pressed(11)) inp.lockP = 1;
    if (pressed(12) || (ay < -0.55 && padPrevY >= -0.55)) inp.upP = 1;
    if (pressed(13) || (ay > 0.55 && padPrevY <= 0.55)) inp.downP = 1;
    if (pressed(8) || pressed(17)) inp.mapP = 1;
    if (pressed(4)) inp.guardP = 1;
    if (pressed(3)) inp.squeakP = 1;
    if (pressed(7)) inp.sparkP = 1;                                // R2: static spark (10/18/2026)
    if (pressed(2)) inp.spinP = 1;                                 // square: the spin, its own button (a friend's playtest, 10/14/2026)
    padPrevY = ay;
    if (gp) for (let i = 0; i < 16; i++) if (pressed(i)) { inp.any = 1; useDevice('pad'); }
    if (gp && (Math.abs(ax) > 0.5 || Math.abs(ay) > 0.5 || padDir || inp.aim)) useDevice('pad');   // (a soft push that moves him, or just the right stick, counts too)
    if (inp.left || inp.right) inp.any = 1;
  }
  if (gp) for (let i = 0; i < gp.buttons.length; i++) prevBtn[i] = b(i);
}

// moves he hasn't learned yet (or can't use right now) just don't happen
function maskInput() {
  talkIn.press = talkIn.press || inp.jumpP || inp.atkP; talkIn.up = talkIn.up || inp.upP; talkIn.down = talkIn.down || inp.downP; talkIn.back = talkIn.back || inp.dodgeP; talkIn.map = talkIn.map || inp.mapP; talkIn.guard = talkIn.guard || inp.guardP; talkIn.move = inp.left || inp.right || inp.jumpP;
  guardHeldRaw = inp.guardH;
  if (P.story && P.story.free) {                       // a little scene that leaves him his controls (the squirrel's lesson)
    if (!can('attack')) { inp.atkH = 0; inp.atkP = 0; }
    return;
  }
  if (P.story || cutscene) {
    for (const k in inp) if (k !== 'any') inp[k] = 0;
    if (P.autoX != null) { const d = P.autoX - P.x; inp.right = d > 2 ? 1 : 0; inp.left = d < -2 ? 1 : 0; if (P.hang) inp.up = 1; }   // a scene walking him (and up over any ledge he grabs)
    return;
  }
  if (!can('attack')) { inp.atkH = 0; inp.atkP = 0; }
  if (!can('guard')) { inp.guardH = 0; inp.lockP = 0; }
  if (!can('squeak') && !can('burst')) inp.squeakP = 0;   // the squeak button does the squeak, and the fluff burst with {down}
  if (!can('spin')) inp.spinP = 0;                       // the spin has its own button
  if (!can('spark')) inp.sparkP = 0;
}
