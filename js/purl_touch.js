'use strict';
// ---------- touch controls for Purl's test run (10/23/2026) ----------
// The same kind of gamepad the game has (js/touch.js), drawn over the page on phones and tablets: a stick on the left
// that comes to wherever the thumb lands, and four buttons on the right in a diamond, laid out the way the controller
// has them (jump on cross at the bottom, the hook on circle, the thrust on square, sewing on triangle). Each button holds
// down the key it stands for, so purl_proto.js doesn't know the difference. Small restart and full screen buttons sit
// at the top. It comes up on its own on a touchscreen; the Touch button in the corner turns it on or off (remembered).
(() => {
  let mode = 'auto';
  try { mode = localStorage.getItem('purl-test-touch') || 'auto'; } catch (e) {}
  const touchFirst = () => {
    try { if (window.matchMedia && matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches) return true; } catch (e) {}
    return (navigator.maxTouchPoints || 0) > 0 && !(window.matchMedia && matchMedia('(hover: hover)').matches);
  };
  const isOn = () => mode === 'on' || (mode === 'auto' && touchFirst());

  const el = document.createElement('div'); el.id = 'touchpad'; el.setAttribute('aria-hidden', 'true');
  const btn = (act, word, cls = 'face') => `<button class="tb ${cls}" data-act="${act}"><span>${word}</span></button>`;
  el.innerHTML = `
    <div class="tzone"><div class="tbase"><i></i><div class="tknob"></div></div></div>
    ${btn('jump', 'jump')}${btn('hook', 'hook')}${btn('attack', 'thrust')}${btn('sew', 'sew')}
    ${btn('reset', 'restart', 'tiny')}${btn('max', 'full screen', 'tiny')}`;
  document.body.appendChild(el);
  const tog = document.createElement('button'); tog.id = 'touchToggle'; document.body.appendChild(tog);

  const KEY = { jump: 'KeyZ', hook: 'KeyC', attack: 'KeyX', sew: 'KeyV', reset: 'KeyR', left: 'ArrowLeft', right: 'ArrowRight', down: 'ArrowDown' };
  // each thing holding a key is kept track of on its own, so letting go of one doesn't let go of a key something else still holds
  const held = {};
  function key(act, down, src) {
    const code = KEY[act]; if (!code) return;
    const own = held[code] || (held[code] = new Set());
    if (down) own.add(src); else own.delete(src);
    keys[code] = own.size > 0;
  }
  const B = a => el.querySelector(`[data-act="${a}"]`);
  const zone = el.querySelector('.tzone'), base = zone.querySelector('.tbase'), knob = base.querySelector('.tknob');

  let R = 40, home = [0, 0];
  function layout() {
    const W0 = el.clientWidth, H0 = el.clientHeight; if (!W0 || !H0) return;
    // kept in from the sides, where a swipe in from the edge is the phone's back gesture (the same as js/touch.js)
    const gx = Math.round(Math.min(44, Math.max(26, W0 * 0.045))), gy = 8, W = W0 - gx * 2, H = H0 - gy * 2;
    zone.style.left = gx + 'px'; zone.style.bottom = gy + 'px'; zone.style.width = (W * 0.45) + 'px'; zone.style.height = (H * 0.7) + 'px';
    const u = Math.max(44, Math.min(H * 0.15, W * 0.085, 76));                     // one button
    const put = (b, x, y, w, h = w) => { b.style.left = (gx + x - w / 2) + 'px'; b.style.top = (gy + y - h / 2) + 'px'; b.style.width = w + 'px'; b.style.height = h + 'px'; };
    const edge = u * 0.5 + Math.max(8, H * 0.02), g = u * 1.02;
    const dX = W - edge - g, dY = H - edge - g;                                     // the middle of the diamond, low on the right
    put(B('sew'), dX, dY - g, u); put(B('jump'), dX, dY + g, u); put(B('attack'), dX - g, dY, u); put(B('hook'), dX + g, dY, u);
    for (const b of el.querySelectorAll('.tb.face span')) b.style.fontSize = Math.round(Math.max(11, u * (b.textContent.length > 5 ? 0.2 : 0.25))) + 'px';
    const rad = Math.max(44, Math.min(u * 1.15, H * 0.18)); R = rad * 0.5;
    base.style.width = base.style.height = rad * 2 + 'px'; base.style.margin = -rad + 'px 0 0 ' + -rad + 'px';
    knob.style.width = knob.style.height = rad * 0.96 + 'px'; knob.style.margin = -rad * 0.48 + 'px 0 0 ' + -rad * 0.48 + 'px';
    home = [edge + rad, zone.clientHeight - rad - Math.max(8, H * 0.02)];
    if (stickId === null) { base.style.left = home[0] + 'px'; base.style.top = home[1] + 'px'; }
    const th = 34, tw = 104;
    put(B('reset'), W / 2 - tw / 2 - 6, th / 2 + 8, tw, th); put(B('max'), W / 2 + tw / 2 + 6, th / 2 + 8, tw, th);
  }

  // the stick: left and right, and down (down drops her through a twig)
  let stickId = null, cx = 0, cy = 0;
  const local = e => { const r = zone.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  function stickAt(x, y) {
    let dx = x - cx, dy = y - cy; const d = Math.hypot(dx, dy);
    if (d > R) { dx *= R / d; dy *= R / d; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    key('left', dx / R < -0.3, 'stick'); key('right', dx / R > 0.3, 'stick'); key('down', dy / R > 0.6, 'stick');
  }
  function stickHome() {
    stickId = null; knob.style.transform = ''; base.classList.remove('on');
    base.style.left = home[0] + 'px'; base.style.top = home[1] + 'px';
    for (const a of ['left', 'right', 'down']) key(a, false, 'stick');
  }
  zone.addEventListener('pointerdown', e => {
    if (stickId !== null) return;
    e.preventDefault(); stickId = e.pointerId; try { zone.setPointerCapture(e.pointerId); } catch (er) {}
    [cx, cy] = local(e); base.style.left = cx + 'px'; base.style.top = cy + 'px'; base.classList.add('on'); stickAt(cx, cy);
  });
  zone.addEventListener('pointermove', e => { if (e.pointerId === stickId) { e.preventDefault(); stickAt(...local(e)); } });
  for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) zone.addEventListener(ev, e => { if (e.pointerId === stickId) stickHome(); });

  // the buttons
  for (const b of el.querySelectorAll('.tb')) {
    const act = b.dataset.act;
    b.addEventListener('pointerdown', e => {
      e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (er) {} b.classList.add('on');
      if (act === 'max') { fullScreen(); return; }
      key(act, true, 'b' + e.pointerId);
    });
    const up = e => { b.classList.remove('on'); key(act, false, 'b' + e.pointerId); };
    b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
    b.addEventListener('contextmenu', e => e.preventDefault());
  }
  function fullScreen() {
    const d = document, root = d.documentElement;
    if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
    else {
      const p = (root.requestFullscreen || root.webkitRequestFullscreen); if (!p) return;
      Promise.resolve(p.call(root)).then(() => { try { screen.orientation.lock('landscape').catch(() => {}); } catch (e) {} }).catch(() => {});
    }
  }

  function apply() {
    const on = isOn();
    document.body.classList.toggle('touch', on);
    tog.textContent = 'Touch: ' + mode;
    if (!on) { stickHome(); for (const c in held) { held[c].clear(); keys[c] = false; } }
    setTimeout(() => { layout(); window.dispatchEvent(new Event('resize')); }, 0);
  }
  tog.addEventListener('click', () => {
    mode = mode === 'auto' ? 'on' : mode === 'on' ? 'off' : 'auto';
    try { localStorage.setItem('purl-test-touch', mode); } catch (e) {}
    apply();
  });
  addEventListener('resize', () => setTimeout(layout, 60));
  addEventListener('blur', () => { stickHome(); for (const c in held) { held[c].clear(); keys[c] = false; } });
  apply();
})();
