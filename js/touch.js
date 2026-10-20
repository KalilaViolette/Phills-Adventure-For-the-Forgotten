'use strict';
// ---------- touch controls: a gamepad drawn over the game for phones and tablets (10/17/2026) ----------
// An analog stick on the left (a circle; the stick follows his thumb, and the circle comes to wherever the thumb lands
// on that side) and the buttons on the right. They press the same keys the keyboard would (see input.js), so
// nothing else in the game knows the difference. It comes up on its own on a touchscreen and stays hidden on a computer;
// using a keyboard or a controller hides it again, touching the screen brings it back. The Touch button in the strip
// under the game picks auto, on or off (remembered)
let hudDY = 0;                                                                      // (how far his health is moved down, game pixels, out from under the shoulder buttons)
const _drawHud0 = drawHud;
drawHud = function () { if (!hudDY) return _drawHud0(); ctx.save(); ctx.translate(0, hudDY); _drawHud0(); ctx.restore(); };
BTN_NAMES.touch = { jump: 'jump', atk: 'swing', dodge: 'roll', guard: 'shield', map: 'map', squeak: 'squeak', spin: 'spin', spark: 'R2', up: 'up', down: 'down', left: 'left', right: 'right', lock: 'lock' };
const touchUI = (() => {
  let mode = 'auto';
  try { mode = localStorage.getItem('phill-forgotten-touch') || 'auto'; } catch (e) {}
  const touchFirst = () => {
    try { if (window.matchMedia && matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches) return true; } catch (e) {}
    return (navigator.maxTouchPoints || 0) > 0 && !(window.matchMedia && matchMedia('(hover: hover)').matches);
  };
  let active = mode === 'on' || (mode === 'auto' && touchFirst());
  const el = document.createElement('div'); el.id = 'touchpad'; el.setAttribute('aria-hidden', 'true');
  const svg = inner => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
  const face = (act, glyph, word) => `<button class="tb face" data-act="${act}"><span>${word}</span></button>`;   // (just the words)
  const arm = (act, d) => `<button class="tb arm" data-act="${act}">${svg(d)}</button>`;
  const pill = (act, inner) => `<button class="tb tiny" data-act="${act}">${inner}</button>`;
  el.innerHTML = `
    <div class="tzone"><div class="tbase"><i></i><div class="tknob"></div></div></div>
    <div class="tbase right"><i></i><div class="tknob"></div></div>
    ${face('jump', '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>', 'jump')}
    ${face('spin', '<rect x="6.5" y="6.5" width="11" height="11" rx="1"/>', 'spin')}
    ${face('dodge', '<circle cx="12" cy="12" r="6"/>', 'roll')}
    ${face('squeak', '<path d="M12 5.5l6.5 11.5h-13z"/>', 'squeak')}
    ${arm('dup', '<path d="M8 14l4-4 4 4"/>')}${arm('ddown', '<path d="M8 10l4 4 4-4"/>')}${arm('dleft', '<path d="M14 8l-4 4 4 4"/>')}${arm('dright', '<path d="M10 8l4 4-4 4"/>')}
    <button class="tb shoulder" data-act="l2"><span>L2</span></button>
    <button class="tb shoulder" data-act="guard"><span>shield</span></button>
    <button class="tb shoulder" data-act="r2"><span>R2</span></button>
    <button class="tb shoulder" data-act="atk"><span>swing</span></button>
    <button class="tb stickbtn" data-act="l3"><span>L3</span></button>
    <button class="tb shoulder ring" data-act="l2"><span>L2</span></button><button class="tb shoulder ring" data-act="guard"><span>shield</span></button>
    <button class="tb shoulder ring" data-act="atk"><span>swing</span></button><button class="tb shoulder ring" data-act="r2"><span>R2</span></button>
    <button class="tb stickbtn" data-act="lock"><span>lock</span></button>
    ${pill('map', svg('<path d="M15 6l-6 6 6 6" fill="currentColor" stroke="none"/><path d="M15 6l-6 6 6 6"/>') + '<span>map</span>')}
    <button class="tb tiny icon" data-act="max">${svg('<path d="M5 9V5h4M15 5h4v4M19 15v4h-4M9 19H5v-4"/>')}</button>
    ${pill('menu', '<span>menu</span>' + svg('<path d="M9 6l6 6-6 6" fill="currentColor" stroke="none"/><path d="M9 6l6 6-6 6"/>'))}`;
  document.getElementById('stage').appendChild(el);
  const zone = el.querySelector('.tzone'), base = el.querySelector('.tzone .tbase'), knob = base.querySelector('.tknob');
  const rbase = el.querySelector('.tbase.right'), rknob = rbase.querySelector('.tknob');
  const B = a => el.querySelector(`[data-act="${a}"]:not(.ring)`), Rg = a => el.querySelector(`.ring[data-act="${a}"]`);
  // laid out like a PlayStation controller, sized to the screen, and kept out at the sides (in the dark border
  // round the game where there's room for it) so the middle stays clear: the left stick low on the left; on the right
  // the four face buttons in a diamond the way the controller has them (jump on cross at the bottom, roll on circle,
  // spin on square, squeak on triangle) and the right stick under them; the shield on L1 and the swing on R1 up on the
  // shoulders; menu, map and full screen small in the top corners
  let R = 46, RR = 40;                                                              // how far each stick goes from its middle (css px)
  let home = [0, 0], rhome = [0, 0];
  hudDY = 0;
  function layout() {                                                               // (10/17/2026: every button a circle the same size)
    const W = el.clientWidth, H = el.clientHeight; if (!W || !H) return;
    const u = Math.max(36, Math.min(H * 0.146, W * 0.07, 72));                         // one button
    const put = (b, x, y, w, h = w) => { b.style.left = (x - w / 2) + 'px'; b.style.top = (y - h / 2) + 'px'; b.style.width = w + 'px'; b.style.height = h + 'px'; };
    const edge = u * 0.5 + Math.max(5, H * 0.015);                                   // a button's middle, in from the edge
    // the shoulders, right up in the top corners
    const topY = edge;
    put(B('l2'), edge, topY, u); put(B('r2'), W - edge, topY, u);                    // the triggers out in the corners (nothing on them yet: shield bash and such later)
    put(B('guard'), edge + u * 1.9, topY, u); put(B('atk'), W - edge - u * 1.9, topY, u);   // L1 and R1 in from them
    // the sticks: low, out toward the edges, with L3 and R3 in the bottom corners beside them
    const rad = Math.max(40, Math.min(u * 1.1, H * 0.165));
    R = rad * 0.5; RR = R;
    const sy = H - rad - Math.max(4, H * 0.015), botY = H - edge;
    put(B('l3'), edge, botY, u * 0.82); put(B('lock'), W - edge, botY, u * 0.82);
    const sx = edge + u * 0.41 + 8 + rad;
    // the d-pad and the face buttons: diamonds halfway between the shoulders and the sticks (the same gap above
    // and below them)
    const top = topY + u * 0.5, bot = sy - rad, g = Math.min(u * 0.96, (bot - top - u - 8) / 2);   // (g: between the middles of neighboring buttons in a diamond)
    const dY = (top + bot) / 2, dX = edge + g;
    put(B('dup'), dX, dY - g, u); put(B('ddown'), dX, dY + g, u); put(B('dleft'), dX - g, dY, u); put(B('dright'), dX + g, dY, u);
    put(B('squeak'), W - dX, dY - g, u); put(B('jump'), W - dX, dY + g, u); put(B('spin'), W - dX - g, dY, u); put(B('dodge'), W - dX + g, dY, u);
    const zoneTop = H - zone.clientHeight;
    home = [sx, sy - zoneTop];
    for (const [bs, kn] of [[base, knob], [rbase, rknob]]) {
      bs.style.width = bs.style.height = rad * 2 + 'px';
      kn.style.width = kn.style.height = rad * 0.96 + 'px'; kn.style.margin = -rad * 0.48 + 'px 0 0 ' + -rad * 0.48 + 'px';
    }
    base.style.margin = -rad + 'px 0 0 ' + -rad + 'px';
    if (stickId === null) { base.style.left = home[0] + 'px'; base.style.top = home[1] + 'px'; }
    rhome = [W - sx, sy]; rbase.style.left = (W - sx - rad) + 'px'; rbase.style.top = (sy - rad) + 'px';
    // the shoulder buttons again, round the right stick where the thumb already is (10/17/2026): L2 up and to
    // the left of it, the shield to its left, the swing down and to the left, R2 up and to the right. The ones up top stay
    const rd = rad + u * 0.62, ring = [['l2', -113], ['guard', -154], ['atk', 160], ['r2', -30]];
    for (const [a, deg] of ring) {
      const t = deg * Math.PI / 180, bx = rhome[0] + Math.cos(t) * rd, by = Math.min(H - u * 0.5 - 4, rhome[1] + Math.sin(t) * rd);
      put(Rg(a), Math.min(W - u * 0.5 - 4, bx), by, u);
    }
    for (const b of el.querySelectorAll('.tb.face span, .tb.shoulder span, .tb.stickbtn span')) b.style.fontSize = Math.round(Math.max(10, u * (b.textContent.length > 5 ? 0.2 : 0.25))) + 'px';
    // map, full screen and menu: a little row in the middle at the top
    const th = Math.max(28, u * 0.5), tw = th * 2.4, half = tw + th * 0.8 + 8;
    // (a phone held upright is too narrow for them between L1 and R1: they drop down under the shoulders instead)
    const ty = W / 2 - half < edge + u * 2.4 + 6 ? topY + u / 2 + th * 0.65 + 10 : th / 2 + 8;
    put(B('map'), W / 2 - tw / 2 - th * 0.8 - 8, ty, tw, th); put(B('max'), W / 2, ty, th * 1.3, th * 1.3); put(B('menu'), W / 2 + tw / 2 + th * 0.8 + 8, ty, tw, th);
    // his health in the game's top left sits under the shoulder buttons: it moves down out from under them
    const dpr = window.devicePixelRatio || 1, below = (Math.max(topY + u * 0.5, ty > th ? ty + th * 0.65 : 0) + 4) * dpr;
    hudDY = active ? Math.max(0, Math.ceil((below - offY) / S) - 6) : 0;
  }
  window.addEventListener('resize', () => setTimeout(layout, 60));

  // pressing and letting go of a button: the same as its key going down and up
  const PRESS = { jump: 'jumpP', atk: 'atkP', dodge: 'dodgeP', guard: 'guardP', squeak: 'squeakP', spin: 'spinP', spark: 'sparkP', map: 'mapP', up: 'upP', down: 'downP', lock: 'lockP' };
  // (L2, R2 and L3 do nothing in the game yet, the same as on the controller: they're there for when they do)
  const DPAD = { dup: 'up', ddown: 'down', dleft: 'left', dright: 'right' };
  // Each thing holding an action is kept track of on its own (the input audit, 10/17/2026): there are two Swing buttons,
  // and letting go of either one let go of the swing even with the other still held, so a charge went off early. It's
  // only let go once the last thing holding it lets go. src: which button (or the stick, or '*' to drop them all). It's
  // held as its own name ('T:' and the action), not as a keyboard key, so a key held on the keyboard and a touch button
  // don't let go of each other either
  const held = {};
  function key(act, down, src = 'x') {
    if (DPAD[act]) act = DPAD[act];
    const own = held[act] || (held[act] = new Set()), was = own.size > 0;
    if (down) own.add(src); else if (src === '*') own.clear(); else own.delete(src);
    const now = own.size > 0;
    if (now === was) return;
    if (now) {
      if (!started) { own.clear(); begin(); return; }
      keys.add('T:' + act); inp.any = 1;
      if (PRESS[act]) inp[PRESS[act]] = 1;
    } else keys.delete('T:' + act);
  }

  // the stick
  var stickId = null; let cx = 0, cy = 0;
  const local = e => {                                                              // where the thumb is on the zone, in the game's own up and down (it may be turned sideways, see maximize)
    const r = zone.getBoundingClientRect();
    return document.body.classList.contains('rot') ? [e.clientY - r.top, r.right - e.clientX] : [e.clientX - r.left, e.clientY - r.top];
  };
  function stickAt(x, y) {
    let dx = x - cx, dy = y - cy; const d = Math.hypot(dx, dy);
    if (d > R) { dx *= R / d; dy *= R / d; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    const ax = dx / R, ay = dy / R;
    key('left', ax < -0.3, 'stick'); key('right', ax > 0.3, 'stick');
    key('up', ay < -0.55, 'stick'); key('down', ay > 0.55, 'stick');
  }
  function stickHome() {
    stickId = null; knob.style.transform = '';
    base.style.left = home[0] + 'px'; base.style.top = home[1] + 'px'; base.classList.remove('on');
    for (const a of ['left', 'right', 'up', 'down']) key(a, false, 'stick');
  }
  zone.addEventListener('pointerdown', e => {
    if (stickId !== null) return;
    e.preventDefault(); stickId = e.pointerId; zone.setPointerCapture(e.pointerId);
    [cx, cy] = local(e);
    base.style.left = cx + 'px'; base.style.top = cy + 'px'; base.classList.add('on');   // the circle comes to his thumb
    stickAt(cx, cy);
  });
  zone.addEventListener('pointermove', e => { if (e.pointerId === stickId) { e.preventDefault(); stickAt(...local(e)); } });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) zone.addEventListener(ev, e => { if (e.pointerId === stickId) stickHome(); });

  // the right stick: like a controller's, it turns him to face the way it's pushed (his legs still take the left one),
  // and up or down with it points his swing and his shield up or down. Its circle stays put; the stick follows the thumb
  const aim = { on: 0, x: 0, y: 0 }; let rid = null;
  const rlocal = e => {
    const r = rbase.getBoundingClientRect(), c = [r.left + r.width / 2, r.top + r.height / 2];
    return document.body.classList.contains('rot') ? [e.clientY - c[1], c[0] - e.clientX] : [e.clientX - c[0], e.clientY - c[1]];
  };
  function rstick(e) {
    let [dx, dy] = rlocal(e); const d = Math.hypot(dx, dy);
    if (d > RR) { dx *= RR / d; dy *= RR / d; }
    rknob.style.transform = `translate(${dx}px, ${dy}px)`;
    aim.x = dx / RR; aim.y = dy / RR; aim.on = 1;
  }
  rbase.addEventListener('pointerdown', e => { if (rid !== null) return; e.preventDefault(); rid = e.pointerId; rbase.setPointerCapture(e.pointerId); rbase.classList.add('on'); if (!started) begin(); rstick(e); });
  rbase.addEventListener('pointermove', e => { if (e.pointerId === rid) { e.preventDefault(); rstick(e); } });
  // (letting go of the right stick, or hiding the touch controls with it held: the input audit, 10/17/2026, found a
  // keyboard press hiding them left its aim on till that finger came up)
  function rstickHome() { if (rid !== null) try { rbase.releasePointerCapture(rid); } catch (e) {} rid = null; aim.on = 0; aim.x = aim.y = 0; rknob.style.transform = ''; rbase.classList.remove('on'); }
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) rbase.addEventListener(ev, e => { if (e.pointerId !== rid) return; rid = null; aim.on = 0; aim.x = aim.y = 0; rknob.style.transform = ''; rbase.classList.remove('on'); });
  const pollPad0 = pollPad;                                                          // (read after the controller each frame, the same way its right stick is)
  pollPad = function () {
    pollPad0();
    if (!active || !aim.on || tuneOpen()) return;
    const m = Math.hypot(aim.x, aim.y);
    inp.aim = m > 0.5 ? 1 : 0;
    inp.aimX = inp.aim && Math.abs(aim.x) > 0.4 ? Math.sign(aim.x) : 0;
    inp.aimUp = inp.aim && aim.y < -0.55 && Math.abs(aim.x) < 0.75 ? 1 : 0;
    inp.aimDown = inp.aim && aim.y > 0.55 && Math.abs(aim.x) < 0.75 ? 1 : 0;
    inp.aimY = inp.aim && Math.abs(aim.y) > 0.4 ? Math.sign(aim.y) : 0;
    if (inp.aim) inp.any = 1;
  };

  // a quick double tap of the shield keeps it held up (10/17/2026), so the right thumb's free for the right stick
  // to point it. One more tap lowers it. Either shield button does it
  let guardLatch = false, guardTapAt = -9, guardDownAt = 0;
  const now = () => performance.now() / 1000;
  function latchLook(on) {
    guardLatch = on;
    for (const g of el.querySelectorAll('[data-act="guard"]')) g.classList.toggle('latched', on);
    if (started && room) popup(P.x, P.y - 54, on ? 'shield held up' : 'shield down', '#cfd6e6');
  }
  function guardDown(b) {
    if (guardLatch) { latchLook(false); key('guard', false, '*'); b.dataset.lower = '1'; return; }   // (this press just lowers it)
    key('guard', true, b);
    if (now() - guardTapAt < 0.32) latchLook(true);
    guardDownAt = now();
  }
  function guardUp(b) {
    if (b.dataset.lower) { delete b.dataset.lower; guardTapAt = -9; return; }
    if (guardLatch) return;                                                         // held up: it stays
    key('guard', false, b);
    guardTapAt = now() - guardDownAt < 0.25 ? now() : -9;                           // a quick tap: the first half of a double tap
  }
  // the buttons
  let buzz = true; try { buzz = localStorage.getItem('phill-forgotten-buzz') !== 'off'; } catch (e) {}
  for (const b of el.querySelectorAll('.tb')) {
    const act = b.dataset.act; let id = null;
    b.addEventListener('pointerdown', e => {
      e.preventDefault(); id = e.pointerId; b.setPointerCapture(e.pointerId); b.classList.add('on');
      if (buzz && navigator.vibrate) try { navigator.vibrate(12); } catch (er) {}              // a little buzz for each press (10/17/2026: phones that can, Android mostly. iPhones can't from a web page)
      if (act === 'menu') { document.body.classList.toggle('tmenu'); return; }
      if (act === 'max') { maxUI.toggle(); return; }
      if (act === 'l3' || act === 'l2') return;
      if (act === 'guard') { guardDown(b); return; }
      key(act === 'r2' ? 'spark' : act, true, b);   // (R2: static spark, 10/18/2026)
    });
    const up = e => { if (e.pointerId !== id) return; id = null; b.classList.remove('on'); if (act === 'guard') { guardUp(b); return; } if (!['menu', 'max', 'l3', 'l2'].includes(act)) key(act === 'r2' ? 'spark' : act, false, b); };
    for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) b.addEventListener(ev, up);
    b.addEventListener('contextmenu', e => e.preventDefault());
  }

  function show(on) {
    active = on;
    document.body.classList.toggle('touch', on); setTimeout(() => { resize(); layout(); }, 50);
    if (!on) { hudDY = 0; stickHome(); rstickHome(); if (guardLatch) latchLook(false); for (const a in held) key(a, false, '*'); for (const b of el.querySelectorAll('.tb.on')) b.classList.remove('on'); document.body.classList.remove('tmenu'); }
    if (on && typeof useDevice === 'function') useDevice('touch');
    const btn = document.getElementById('touchBtn');
    if (btn) btn.textContent = 'Touch: ' + mode;
  }
  window.addEventListener('blur', () => { for (const a in held) held[a].clear(); });   // (the keys get cleared on blur: what's holding them goes with them)
  // a keyboard or a controller hides it (in auto), touching the screen brings it back
  window.addEventListener('keydown', () => { if (mode === 'auto' && active) show(false); }, true);
  window.addEventListener('pointerdown', e => { if (mode !== 'off' && e.pointerType === 'touch' && !active) show(true); }, true);
  const padWas = typeof useDevice === 'function' ? useDevice : null;
  if (padWas) useDevice = function (d) { padWas(d); if (d === 'pad' && mode === 'auto' && active) show(false); };
  const btn = document.createElement('button'); btn.id = 'touchBtn'; btn.type = 'button';
  btn.addEventListener('click', () => {
    mode = { auto: 'on', on: 'off', off: 'auto' }[mode];
    try { localStorage.setItem('phill-forgotten-touch', mode); } catch (e) {}
    show(mode === 'on' || (mode === 'auto' && touchFirst()));
  });
  const tb = document.getElementById('tuneBtn'); tb.parentNode.insertBefore(btn, tb);
  const bz = document.createElement('button'); bz.id = 'buzzBtn'; bz.type = 'button'; bz.textContent = 'Buzz: ' + (buzz ? 'on' : 'off');
  bz.addEventListener('click', () => { buzz = !buzz; bz.textContent = 'Buzz: ' + (buzz ? 'on' : 'off'); try { localStorage.setItem('phill-forgotten-buzz', buzz ? 'on' : 'off'); } catch (e) {} if (buzz && navigator.vibrate) try { navigator.vibrate(20); } catch (e) {} bz.blur(); });
  tb.parentNode.insertBefore(bz, tb);
  show(active);
  if (active) { const n = document.getElementById('startHow'); if (n) n.textContent = 'Tap here to start'; }   // (by its id: the first line in there is the subtitle now)
  return { show, layout, get active() { return active; } };
})();

// ---------- maximize: the game filling the whole screen (10/17/2026). On a phone it goes sideways: full screen
// and locked to landscape where the browser allows it, and where it doesn't (an iPhone, or inside a viewer that won't go
// full screen) the page fills the screen and, held upright, turns the game on its side so it's still landscape
const maxUI = (() => {
  const body = document.body;
  const portrait = () => window.innerHeight > window.innerWidth;
  function fit() { body.classList.toggle('rot', body.classList.contains('max') && touchUI.active && portrait()); setTimeout(() => { resize(); touchUI.layout(); }, 50); }
  async function on() {
    body.classList.add('max'); body.classList.remove('tmenu');
    try { if (document.documentElement.requestFullscreen && !document.fullscreenElement) await document.documentElement.requestFullscreen({ navigationUI: 'hide' }); } catch (e) {}
    try { if (touchUI.active && screen.orientation && screen.orientation.lock) await screen.orientation.lock('landscape'); } catch (e) {}
    fit(); label();
  }
  function off() {
    body.classList.remove('max', 'rot'); setTimeout(() => { resize(); touchUI.layout(); }, 50);
    try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) {}
    try { if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen(); } catch (e) {}
    label();
  }
  function label() {
    const m = body.classList.contains('max');
    const b = document.getElementById('maxBtn'); if (b) b.textContent = m ? 'Exit full screen' : 'Full screen';
    const t = document.querySelector('#touchpad [data-act="max"]'); if (t) { t.classList.toggle('on2', m); t.setAttribute('aria-label', m ? 'exit full screen' : 'full screen'); }
  }
  window.addEventListener('resize', fit); window.addEventListener('orientationchange', () => setTimeout(fit, 200));
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && body.classList.contains('max') && !touchUI.active) off(); });
  window.addEventListener('keydown', e => { if (e.code === 'Escape' && body.classList.contains('max') && !document.fullscreenElement) off(); });
  const b = document.createElement('button'); b.id = 'maxBtn'; b.type = 'button'; b.addEventListener('click', () => body.classList.contains('max') ? off() : on());
  const tch = document.getElementById('touchBtn'); tch.parentNode.insertBefore(b, tch);
  label();
  return { toggle: () => (body.classList.contains('max') ? off() : on()), on, off };
})();
