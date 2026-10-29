'use strict';
// ---------- the title menu (10/17/2026): Continue, New game, Load, The story, Options and Controls over the title
// card. Keyboard, mouse, controller and touch all work it: up and down (or the stick, the d-pad, W and S) to move, Enter,
// Space, Z or Cross to pick, Esc, Backspace or Circle to go back, left and right to change an option. Tab moves through it
// too, and the picked row really has the focus, so a screen reader follows along. Three save slots (world.js). A music
// box plays the home tune once there's been a click or a key (browsers won't play anything before that). The tests skip
// it (window.__testSkipTitle): clicking the start screen or any key just starts, like before. The menu stays hidden till
// the first key, click, tap or controller button (10/20/2026), so the painting shows on its own first. Moving the mouse
// or a stick doesn't count ----------
// the controls, one view for the keyboard and one for a controller (the touch buttons are laid out like the controller).
// The pause menu shows them too (pause.js)
// which of a volume's ten bars a click is on (the title menu's and the pause menu's): the very left edge is 0
const pipAt = (pp, e) => { const r = pp.getBoundingClientRect(), f = (e.clientX - r.left) / Math.max(1, r.width); return f < 0.03 ? 0 : Math.max(1, Math.min(10, Math.ceil(f * 10))); };
window.CONTROLS_LIST = {
  Keyboard: [['Move', 'Arrow keys or WASD'], ['Jump', 'Z or Space'], ['Swing', 'X'], ['Shield', 'Hold V or Shift'], ['Roll', 'C'],
    ['Squeak', 'F'], ['Spin', 'G'], ['Map', 'M'], ['Look up or down', 'Hold up or down'], ['Pause', 'Esc or P'], ['Tuning', 'Tab']],
  Controller: [['Move', 'Left stick or D-pad'], ['Jump', 'X'], ['Swing', 'R1'], ['Shield', 'Hold L1, right stick aims'], ['Turn round', 'Right stick'], ['Roll', 'Circle'],
    ['Squeak', 'Triangle'], ['Spin', 'Square'], ['Map', 'Share'], ['Look up or down', 'Hold up or down'], ['Pause', 'Options']],
};
const titleMenu = window.titleMenu = (() => {                                // (on window too: input.js checks it)
  const api = { open: false };
  if (window.__testSkipTitle) return api;
  const startEl = document.getElementById('start');
  startEl.removeEventListener('click', begin); startEl.removeAttribute('role'); startEl.removeAttribute('tabindex');
  document.body.classList.add('titlemenu');
  const root = document.createElement('div'); root.id = 'title'; root.classList.add('waiting'); startEl.appendChild(root);
  const waitNote = document.createElement('span'); waitNote.className = 'tm-wait'; waitNote.setAttribute('aria-hidden', 'true'); waitNote.textContent = 'Press any button';
  startEl.appendChild(waitNote);
  api.open = true;
  // ---- the first key, click, tap or button brings the menu up (and does nothing else, so a key can't pick Continue)
  let shown = false;
  function reveal() {
    if (shown) return false;
    shown = true; root.classList.remove('waiting'); waitNote.remove();
    place(); focus(at, true);
    return true;
  }

  // ---- the story: just the setup, the rest is for playing (10/17/2026)
  const STORY = [
    "Phill is a little green plush. He lives in a cozy house with his kid, who loves him to bits.",
    "One sunny morning the back door's left open. Phill waddles out into the yard to see what's out there, and a crow spots something small and green in the grass. It snatches him up and carries him off over the fence, into the park.",
    "When you're as small as Phill, the park is a dark forest that goes on forever. Something's wrong out here, too. Black Grime is seeping up out of the ground, the animals are scared, and the toys that got left behind have all gone into hiding. Home is a long way off.",
  ];
  const CONTROLS = window.CONTROLS_LIST;
  const MOVES_TEXT = 'Walk into a low gap to crawl under it. Fall past a ledge and hold toward it to grab on, then press up to climb. Down and jump drops through shelves.';

  // ---- the save slots
  const regionName = id => { const f = (window.ROOM_FILES || {})[id]; const r = f && f.split('/')[1]; const hit = (typeof AREA_REGIONS !== 'undefined' ? AREA_REGIONS : []).find(x => x[0] === r); return hit ? hit[1] : ''; };
  const placeName = id => (typeof AREA_NAMES !== 'undefined' && AREA_NAMES[id]) || id;
  const playTime = s => { const m = Math.floor((s || 0) / 60), h = Math.floor(m / 60); return h ? `${h}h ${m % 60}m` : `${m}m`; };
  const when = t => { if (!t) return ''; const d = new Date(t), h = d.getHours(); return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()} ${(h % 12) || 12}:${String(d.getMinutes()).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
  const slotLine = s => s ? [placeName(s.room), regionName(s.room), playTime(s.playSec)].filter(Boolean).join(' · ') : 'Empty';
  const slotWhen = s => s && s.savedAt ? 'Saved ' + when(s.savedAt) : '';

  // ---- the music: the title's own song while the menu's up. Anything the game asks to play meanwhile (the room behind the
  // menu) is kept for when he starts, and then the title song fades into it
  const _playTitle = music.play;
  let roomSong;
  music.play = (name, fade) => { if (api.open) { if (name !== undefined) roomSong = name; return; } return _playTitle(name, fade); };
  let woke = false;
  function wake() {                                                                   // the first click, tap or key: sound's allowed now
    audio();                                                                          // (every time: a touch only counts once the finger lifts)
    if (woke) return; woke = true;
    _playTitle('title'); setTimeout(() => music.start(), 60);
  }

  // ---- starting the game
  function go() { begin(); }
  // anything that starts the game (the menu, Start over, the tuning button) puts the menu away
  const _beginTitle = begin;
  begin = function () {
    if (api.open) {
      api.open = false; root.hidden = true; document.body.classList.remove('titlemenu'); music.play = _playTitle;
      _playTitle(roomSong !== undefined ? roomSong : room && room.def ? room.def.music : 'home', 0.7);
    }
    return _beginTitle();
  };
  function startNew(n) { useSlot(n); resetWorld(); if (typeof foesAllBack === 'function') foesAllBack(); startGame(); go(); }
  function loadSlot(n) {
    if (n !== saveSlot || !readSlot(n)) { useSlot(n); if (!loadWorld()) resetWorld(); if (typeof foesAllBack === 'function') foesAllBack(); startGame(); }
    go();                                                                             // (the slot that's already loaded behind the menu just carries on)
  }

  // ---- the screens
  let screen = 'main', items = [], at = 0, opts = {}, last = matchMedia('(hover: none)').matches ? 'touch' : 'key';    // (a phone starts out saying tap)
  let keysView = null;                                                                // which controls the Controls screen shows (null: whatever was used last)
  const opt = (id, label, val) => {                                                   // an option shown by one of the menu bar's own buttons, so they stay in step
    const b = () => document.getElementById(id);
    return { label, value: val || (() => { const t = (b() && b().textContent) || ''; return (t.split(/:\s*| /).pop() || '').replace(/^./, c => c.toUpperCase()); }),
      act: () => { if (b()) b().click(); }, hide: () => !b() };
  };
  // a phone or a tablet (touch, no mouse): only there do the touch controls and the buzz show up in Options (10/17/2026)
  const handheld = () => matchMedia('(hover: none) and (pointer: coarse)').matches;
  // a volume, 0 to 10. Music at 0 turns the music off, and turning it up again turns it back on
  const volOpt = (k, label) => {
    const get = () => k === 'music' && !music.on ? 0 : Math.round(VOL[k] * 10);
    const set = v => {
      v = Math.max(0, Math.min(10, v));
      if (k === 'music') {
        if (v === 0) { if (music.on) document.getElementById('musicBtn').click(); return; }
        setVolume('music', v / 10); if (!music.on) document.getElementById('musicBtn').click();
      } else { setVolume('sfx', v / 10); if (sfx.tick) sfx.tick(); }
      if (typeof syncVolumes === 'function') syncVolumes();
    };
    return { label, vol: get, setTo: set, left: () => set(get() - 1), right: () => set(get() + 1), act: () => set(get() >= 10 ? 0 : get() + 1), stay: true };
  };
  const SCREENS = {
    main: () => {
      const s = readSlot(saveSlot), any = [1, 2, 3].some(n => readSlot(n));
      return { side: true, items: [
        s && { label: 'Continue', sub: slotLine(s), act: () => loadSlot(saveSlot) },
        { label: 'New game', act: () => { const free = [1, 2, 3].find(n => !readSlot(n)); if (!any) startNew(saveSlot); else show('newslot', { free }); } },
        any && { label: 'Load', act: () => show('load') },
        { label: 'The story', act: () => show('story', { page: 0 }) },
        { label: 'Options', act: () => show('options') },
        { label: 'Controls', act: () => show('controls') },
        { label: 'Load a save file', act: () => pickSaveFile((w, why) => {          // (a save brought from another device, or a backup: 10/29/2026)
          if (!w) { if (why !== 'none') show('filebad', { why }); return; }
          if (readSlot(saveSlot)) show('confirm', { n: saveSlot, kind: 'file', w }); else { loadFromFile(w, saveSlot); go(); }
        }) },
      ].filter(Boolean) };
    },
    load: () => ({ title: 'Load', items: [1, 2, 3].map(n => { const s = readSlot(n); return { label: `Slot ${n}`, sub: slotLine(s), sub2: slotWhen(s), mark: n === saveSlot && s ? 'last played' : '', act: () => s ? show('slot', { n }) : show('confirm', { n, kind: 'new' }) }; }).concat([{ label: 'Back', act: back, back: true }]) }),
    slot: () => { const s = readSlot(opts.n); return { title: `Slot ${opts.n}`, text: [slotLine(s), slotWhen(s)].filter(Boolean).join('\n'), items: [
      { label: 'Play', act: () => loadSlot(opts.n) },
      { label: 'Delete', act: () => show('confirm', { n: opts.n, kind: 'delete' }) },
      { label: 'Back', act: back, back: true }] }; },
    newslot: () => ({ title: 'New game', text: 'Which slot should it go in?', items: [1, 2, 3].map(n => { const s = readSlot(n); return { label: `Slot ${n}`, sub: slotLine(s), sub2: slotWhen(s), act: () => s ? show('confirm', { n, kind: 'replace' }) : startNew(n) }; }).concat([{ label: 'Back', act: back, back: true }]), focus: opts.free ? opts.free - 1 : 0 }),
    confirm: () => {
      const s = readSlot(opts.n), what = s ? `${slotLine(s)}${s.savedAt ? ', ' + slotWhen(s).toLowerCase() : ''}` : '';
      if (opts.kind === 'delete') return { title: `Delete slot ${opts.n}?`, text: `This clears ${what}. It can't be undone.`, items: [
        { label: 'Delete it', act: () => { deleteSlot(opts.n); sfx.crumble && sfx.crumble(); show('load'); } }, { label: 'Keep it', act: back, back: true }], focus: 1 };
      if (opts.kind === 'file') return { title: `Load the file into slot ${opts.n}?`, text: `The save in it now goes (${what}). The file's save: ${slotLine(opts.w)}.`, items: [
        { label: 'Load it', act: () => { loadFromFile(opts.w, opts.n); go(); } }, { label: 'Back', act: back, back: true }], focus: 1 };
      if (opts.kind === 'replace') return { title: `Start over in slot ${opts.n}?`, text: `The save in it goes (${what}).`, items: [
        { label: 'Start a new game', act: () => startNew(opts.n) }, { label: 'Back', act: back, back: true }], focus: 1 };
      return { title: `New game in slot ${opts.n}?`, items: [{ label: 'Start a new game', act: () => startNew(opts.n) }, { label: 'Back', act: back, back: true }] };
    },
    filebad: () => ({ title: "Couldn't load that", text: opts.why, items: [{ label: 'Back', act: back, back: true }] }),
    story: () => {
      const p = opts.page, lastPage = p === STORY.length - 1;
      const turn = d => () => { const q = p + d; if (q >= 0 && q < STORY.length) show('story', { page: q }, false, true); };
      return { title: 'The story', story: true, text: STORY[p], page: `${p + 1} / ${STORY.length}`, items: [
        !lastPage && { label: 'Next', act: turn(1), left: turn(-1), right: turn(1) },
        p > 0 && { label: 'Back a page', act: turn(-1), left: turn(-1), right: turn(1) },
        { label: 'Back to the menu', act: back, back: true, left: turn(-1), right: turn(1) },
      ].filter(Boolean), focus: opts.focus };
    },
    options: () => ({ title: 'Options', items: [volOpt('music', 'Music volume'), volOpt('sfx', 'Effects volume')]
      .concat([opt('muteBtn', 'All sound'), opt('maxBtn', 'Full screen', () => document.body.classList.contains('max') ? 'On' : 'Off')]   // (full screen goes by the page itself: the button's words only change once the browser's done going full screen, after the menu had already looked)
        .concat(handheld() ? [opt('touchBtn', 'Touch controls'), opt('buzzBtn', 'Buzz on a phone')] : [])
        .filter(o => !o.hide()).map(o => ({ label: o.label, value: o.value, act: o.act, left: o.act, right: o.act, stay: true })))
      .concat([{ label: 'Back', act: back, back: true }]) }),
    controls: () => {
      const view = keysView || (last === 'key' || last === 'mouse' ? 'Keyboard' : 'Controller');
      const flip = () => { keysView = view === 'Keyboard' ? 'Controller' : 'Keyboard'; };
      const known = typeof knownMoves === 'function' ? knownMoves(view === 'Keyboard' ? 'key' : 'pad').map(m => [m.name, m.how + '. ' + m.what]) : [];   // (and what he's learned in the save that's up)
      return { title: 'Controls', table: CONTROLS[view].concat(known), text: MOVES_TEXT + (view === 'Controller' && document.body.classList.contains('touch') ? ' On a phone or tablet the buttons on screen are laid out like the controller.' : ''),
        items: [{ label: 'Showing', value: () => view, act: flip, left: flip, right: flip, stay: true, top: true }, { label: 'Back', act: back, back: true }] };
    },
  };
  const PARENT = { load: 'main', slot: 'load', newslot: 'main', story: 'main', options: 'main', controls: 'main', filebad: 'main' };
  function back() {
    if (screen === 'main') return;
    const prev = screen === 'confirm' && opts.kind === 'file' ? ['main', {}] : screen === 'confirm' ? (opts.kind === 'delete' ? ['slot', { n: opts.n }] : opts.kind === 'replace' ? ['newslot', {}] : ['load', {}]) : [PARENT[screen] || 'main', {}];
    show(prev[0], prev[1], true); sfx.click && sfx.click();
  }
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pips = v => `<span class="tm-pips" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i class="${i < v ? 'f' : ''}"></i>`).join('')}</span>`;
  function show(name, o = {}, backward, keepRow) {
    const from = screen, label = keepRow && items[at] ? items[at].label : null;
    screen = name; opts = o;
    const def = SCREENS[name](); items = def.items;
    at = def.focus != null ? def.focus : backward && PARENT[from] === name ? Math.max(0, items.findIndex(it => it.label.toLowerCase().startsWith({ load: 'load', story: 'the story', options: 'options', controls: 'controls', newslot: 'new game', slot: 'slot' }[from] || '#'))) : 0;
    if (name === 'load' && backward && from === 'slot') at = (o.n || 1) - 1;
    if (label) { const k = items.findIndex(it => it.label === label); at = k >= 0 ? k : Math.max(0, items.findIndex(it => it.back)); }   // (turning a story page keeps the same button picked)
    root.className = (def.side ? 'side' : 'center' + (def.story ? ' story' : '') + (def.table ? ' keys' : '')) + (shown ? '' : ' waiting');
    const title = def.title || 'Title menu';
    root.innerHTML = `<div class="tm-panel" role="dialog" aria-label="${esc(title)}">`
      + (def.title ? `<h2>${esc(def.title)}</h2>` : '')
      + (def.page ? `<div class="tm-page">${def.page}</div>` : '')
      + (items.some(it => it.top) ? `<div class="tm-items tm-top"></div>` : '')
      + (def.text && !def.table ? `<div class="tm-text" aria-live="polite">${esc(def.text).split('\n').map(l => `<p>${l}</p>`).join('')}</div>` : '')
      + (def.table ? `<div class="tm-keys" role="table" aria-label="${esc(title)}">${def.table.map(r => `<div class="tm-k" role="row"><span role="cell">${esc(r[0])}</span><span role="cell">${esc(r[1])}</span></div>`).join('')}</div>`
        + (def.text ? `<div class="tm-text tm-note">${esc(def.text)}</div>` : '') : '')
      + `<div class="tm-items" role="menu" aria-label="${esc(title)}">${items.map((it, i) => {
        const val = it.vol ? String(it.vol()) : it.value ? it.value() : '';
        const side = it.left || it.right;
        return `<button type="button" class="tm-item${it.back ? ' tm-back' : ''}" role="menuitem" data-i="${i}"${val ? ` aria-label="${esc(it.label + ': ' + val)}"` : ''}>`
        + `<span class="tm-label">${esc(it.label)}</span>`
        + (it.vol ? `<span class="tm-value">${side ? '<span class="tm-arr" data-d="-1">‹</span>' : ''}${pips(it.vol())}${side ? '<span class="tm-arr" data-d="1">›</span>' : ''}</span>`
          : it.value ? `<span class="tm-value">${side ? '<span class="tm-arr" data-d="-1">‹</span>' : ''}${esc(it.value())}${side ? '<span class="tm-arr" data-d="1">›</span>' : ''}</span>` : '')
        + (it.mark ? `<span class="tm-mark">${esc(it.mark)}</span>` : '')
        + (it.sub ? `<span class="tm-sub">${esc(it.sub)}</span>` : '') + (it.sub2 ? `<span class="tm-sub">${esc(it.sub2)}</span>` : '') + `</button>`; }).join('')}</div>`
      + `</div>`;
    const top = root.querySelector('.tm-top');
    if (top) items.forEach((it, i) => { if (it.top) top.appendChild(root.querySelector(`.tm-item[data-i="${i}"]`)); });
    for (const b of root.querySelectorAll('.tm-item')) {
      const i = +b.dataset.i;
      b.addEventListener('click', e => {
        e.stopPropagation(); wake(); if (e.pointerType) setLast(e.pointerType === 'touch' ? 'touch' : 'mouse');
        const arr = e.target.closest && e.target.closest('.tm-arr'), pp = e.target.closest && e.target.closest('.tm-pips');
        focus(i, true);
        if (pp && items[i].setTo && e.detail !== 0) { items[i].setTo(pipAt(pp, e)); if (sfx.tick) sfx.tick(); if (api.open) show(screen, opts, false, true); return; }   // (a click on the bars sets it right there: left of where it is turns it down, right of it up, 10/29/2026)
        if (arr && e.detail !== 0) side(+arr.dataset.d); else pick();                 // (the little arrows on an option turn it that way)
      });
      b.addEventListener('focus', () => { if (at !== i) { at = i; mark(); } });       // (Tab, or a screen reader, moving the focus)
    }
    focus(at, true);
    place();                                                                          // (every screen: the picture's edges fade by where it is now. In Options, going full screen left them where the picture used to be, 10/17/2026)
  }
  function mark() { root.querySelectorAll('.tm-item').forEach((b, k) => b.classList.toggle('on', k === at)); }
  function focus(i, quiet) {
    if (!items.length) return;
    at = (i + items.length) % items.length;
    mark();
    const b = root.querySelector(`.tm-item[data-i="${at}"]`);
    if (b && document.activeElement !== b && api.open && shown) { try { b.focus({ preventScroll: true }); } catch (e) {} }
    if (b && b.scrollIntoView) b.scrollIntoView({ block: 'nearest' });
    if (!quiet && sfx.tick) sfx.tick();
  }
  function pick() {
    const it = items[at]; if (!it) return;
    if (sfx.pop) sfx.pop();
    it.act();
    if (it.stay && api.open) show(screen, opts, false, true);                        // (an option changed: show its new value, same row)
  }
  function side(d) {
    const it = items[at]; if (!it) return;
    const f = d < 0 ? it.left : it.right; if (!f) return;
    if (sfx.tick) sfx.tick(); f();
    if (it.stay && api.open) show(screen, opts, false, true);
  }
  function setLast(k) { last = k; }                                                  // (what was used last: the Controls screen shows that one first)

  // ---- keyboard
  window.addEventListener('keydown', e => {
    if (!api.open || tuneOpen()) return;
    if (e.target && /^(SELECT|INPUT|TEXTAREA)$/.test(e.target.tagName)) return;        // (the menu bar's own pickers)
    if (e.target && e.target.closest && e.target.closest('#bar')) return;              // (or its buttons, when Tab's gone down there)
    wake();
    if (!shown) { reveal(); setLast('key'); if (!/^F\d+$/.test(e.code)) e.preventDefault(); return; }
    const c = e.code; let used = true;
    if (['ArrowUp', 'KeyW'].includes(c)) focus(at - 1);
    else if (['ArrowDown', 'KeyS'].includes(c)) focus(at + 1);
    else if (['ArrowLeft', 'KeyA'].includes(c)) side(-1);
    else if (['ArrowRight', 'KeyD'].includes(c)) side(1);
    else if (['Enter', 'NumpadEnter', 'Space', 'KeyZ'].includes(c)) { if (!e.repeat) pick(); }
    else if (['Escape', 'Backspace', 'KeyC'].includes(c)) back();
    else used = false;
    if (used) { e.preventDefault(); setLast('key'); }
  });

  // ---- controller (read straight off the pad: the game's own reading only starts once he's playing)
  let prev = [], held = 0, heldFor = 0, lastT = performance.now();
  function padLoop(now) {
    if (!api.open) return;
    const dt = Math.min(0.1, (now - lastT) / 1000); lastT = now;
    const gp = activePad();                                                             // (the same controller the game reads: input.js)
    if (gp && !tuneOpen()) {
      const b = i => !!(gp.buttons[i] && gp.buttons[i].pressed), pressed = i => b(i) && !prev[i];
      const ay = gp.axes[1] || 0, ax = gp.axes[0] || 0;
      const dir = b(12) || ay < -0.55 ? -1 : b(13) || ay > 0.55 ? 1 : 0, hdir = b(14) || ax < -0.6 ? -1 : b(15) || ax > 0.6 ? 1 : 0;
      const any = dir || hdir || [0, 1, 9].some(pressed);
      if (any) setLast('pad');
      const code = dir * 10 + hdir;
      if (!shown) {                                                                     // (any button just brings the menu up. The sticks don't)
        if (gp.buttons.some((x, i) => x.pressed && !prev[i])) reveal();
        held = code; prev = gp.buttons.map(x => x.pressed); requestAnimationFrame(padLoop); return;
      }
      if (code !== held) { held = code; heldFor = 0; if (dir) focus(at + dir); else if (hdir) side(hdir); }
      else if (code) { heldFor += dt; if (heldFor > 0.4) { heldFor = 0.28; if (dir) focus(at + dir); else if (hdir) side(hdir); } }
      if (pressed(0) || pressed(9)) pick();
      else if (pressed(1)) back();
      prev = gp.buttons.map(x => x.pressed);
    }
    requestAnimationFrame(padLoop);
  }
  requestAnimationFrame(padLoop);

  // ---- touch: a tap is a click (above); remember it was a finger
  root.addEventListener('pointerdown', e => { mx = e.clientX; my = e.clientY; wake(); if (e.pointerType === 'touch') setLast('touch'); });
  for (const ev of ['pointerdown', 'click', 'touchend']) startEl.addEventListener(ev, e => { if (!api.open) return; wake(); if (ev === 'pointerdown' && e.pointerType) setLast(e.pointerType === 'touch' ? 'touch' : 'mouse'); reveal(); });

  // ---- mouse: the row under it lights up when it moves. Only a real move counts: the browser also sends one when the
  // menu changes under a mouse that's sitting still, and that shouldn't steal the row from the keys or the controller
  let mx = -1, my = -1;
  root.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || (e.clientX === mx && e.clientY === my)) return;
    mx = e.clientX; my = e.clientY;
    const b = e.target.closest && e.target.closest('.tm-item'); if (!b) return;
    setLast('mouse'); if (+b.dataset.i !== at) focus(+b.dataset.i, true);
  });

  // ---- a way back to the title from the menu bar
  const tb = document.createElement('button'); tb.type = 'button'; tb.id = 'titleBtn'; tb.textContent = 'Title screen';
  tb.addEventListener('click', () => { if (started) saveWorld(); location.reload(); });
  const saveRow = document.querySelector('#gSave .row'); if (saveRow) saveRow.prepend(tb);

  // ---- time played, for the save slots
  const _updTitle = update;
  update = function (dt) { if (started && !paused) world.playSec = (world.playSec || 0) + dt; return _updTitle(dt); };

  // ---- where the title card is on screen, for placing the main list on it. It's fitted inside the start screen, so there
  // can be bars at the sides or top. Held upright, the picture's drawn a little bigger than the width (its sides are just
  // trees) and the picture and the menu sit together in the middle, the dark blue of the night filling round them
  const CARD = 1672 / 941;
  function place() {
    const W = startEl.clientWidth, H = startEl.clientHeight; if (!W || !H) return;
    const upright = W / H < 1, phoneWide = !upright && H <= 500 && matchMedia('(hover: none)').matches;
    let iw = Math.min(W, H * CARD), ih = iw / CARD, ix = (W - iw) / 2, iy = (H - ih) / 2;
    startEl.style.backgroundSize = ''; startEl.style.backgroundPosition = '';
    if (upright) {
      iw = W * 1.16; ih = iw / CARD; ix = (W - iw) / 2;
      const panel = root.querySelector('.side .tm-panel'), ph = panel ? panel.offsetHeight : 0, overlap = Math.min(ih * 0.12, 30);
      iy = Math.max(12, (H - (ih + ph - overlap)) / 2);
      if (panel) panel.style.top = (iy + ih - overlap) + 'px';
      startEl.style.backgroundSize = `${iw}px auto, cover`; startEl.style.backgroundPosition = `center ${iy}px, 0 0`;
    } else if (phoneWide) {                                                              // a phone held sideways: the picture to the right, the menu at the left
      ix = W - iw; startEl.style.backgroundPosition = 'right center, 0 0';
    }
    root.classList.toggle('upright', upright); root.classList.toggle('phonewide', phoneWide);
    root.style.setProperty('--ix', ix + 'px'); root.style.setProperty('--iy', iy + 'px');
    root.style.setProperty('--iw', iw + 'px'); root.style.setProperty('--ih', ih + 'px');
  }
  window.addEventListener('resize', () => setTimeout(() => { if (api.open) show(screen, opts, false, true); }, 30));   // (and the options show full screen's new state once the browser's switched)
  document.addEventListener('fullscreenchange', () => setTimeout(() => { if (api.open) show(screen, opts, false, true); }, 60));
  show('main');
  api.reveal = reveal; api.shown = () => shown; api.show = show; api.pick = pick; api.focus = i => focus(i, true); api.screen = () => screen; api.items = () => items.map(i => i.label);
  return api;
})();
