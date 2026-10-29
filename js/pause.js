'use strict';
// ---------- the pause menu (10/29/2026) ----------
// Esc or P on the keyboard, Options on a controller, the pause button on a phone. The game stops right away. Where
// there's room for it, Phill turns to us and sits down right where he is, the camera moves in closer on him, and he
// keeps doing his little sitting things (a doodle, his book, his map, a stretch) on their own clock while the menu's
// being used, so changing tabs or volumes never makes him stop or stand up. Where he can't sit (in the air, swimming,
// crawling, hanging, in the middle of a swing, in a scene, with an enemy right next to him) he stays just as he was
// and the camera still moves in. The menu sits on whichever side of the screen he isn't on: next to a room's edge the
// camera can't keep him on his side, so the menu goes to the other one. Closing it, he puts away whatever he had out,
// gets up, the camera eases back, and the game picks up where it was. The painter's concept: Art\Menu\Pause Menu
// Concept 01 - 10-29-2026.
// It's the game's one menu now, too (10/29/2026): the strip that was under the game is hidden and everything in it is
// in here. Pause, Sound, Display, Controls, Tuning (Tab opens it straight there) and Dev (go to, cheats, enemies, what
// to show). Anything with a list to pick from is a dropdown.
const pauseMenu = window.pauseMenu = (() => {
  const api = { open: false };
  const ZOOMS = [['Gentle', 1.8], ['Closer', 2.4], ['Close up', 3]];
  const pref = { zoom: 1, glide: null };
  try { Object.assign(pref, JSON.parse(localStorage.getItem('phill-forgotten-pause') || '{}')); } catch (e) {}
  if (pref.glide === null) { let rm = false; try { rm = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {} pref.glide = !rm; }   // (the computer's own "less motion" setting picks the first time)
  if (!(pref.zoom >= 0 && pref.zoom < ZOOMS.length)) pref.zoom = 1;
  const savePref = () => { try { localStorage.setItem('phill-forgotten-pause', JSON.stringify(pref)); } catch (e) {} };
  const IN = 0.5, OUT = 0.35;                                  // seconds for the camera to move in, and back out

  // ---- the menu on the page
  const stage = document.getElementById('stage');
  const root = document.createElement('div'); root.id = 'pause'; root.hidden = true;
  root.innerHTML = `<section class="pm-panel" role="dialog" aria-modal="true" aria-label="Paused">
    <h2>A little rest</h2><div class="pm-where"></div>
    <div class="pm-tabs" role="tablist" aria-label="Pause menu"></div>
    <div class="pm-body" role="tabpanel"></div>
    <div class="pm-foot"></div></section>`;
  stage.appendChild(root);
  const panel = root.querySelector('.pm-panel'), tabsEl = root.querySelector('.pm-tabs'), bodyEl = root.querySelector('.pm-body');
  const whereEl = root.querySelector('.pm-where'), footEl = root.querySelector('.pm-foot');
  const TABS = [['pause', 'Pause'], ['sound', 'Sound'], ['display', 'Display'], ['controls', 'Controls'], ['tuning', 'Tuning'], ['dev', 'Dev']];
  let tab = 0, rows = [], at = 0, keysView = null;              // at -1: the row of tabs
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pips = v => `<span class="pm-pips" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i class="${i < v ? 'f' : ''}"></i>`).join('')}</span>`;
  const cap = t => String(t).replace(/^./, c => c.toUpperCase());
  // the buttons that used to be in the strip under the game (it's hidden now: everything's in here). Each one's
  // still there and still does the work; a row here just presses it and shows what it says
  const CYCLES = { Speed: ['1x', '0.5x', '0.25x', '2x'], Time: ['story', 'day', 'dawn', 'dusk', 'night'], Touch: ['auto', 'on', 'off'] };
  const mirror = b => {
    if (!b.dataset.pmLabel) b.dataset.pmLabel = b.textContent.trim();             // (its own name: a button whose words change when it's on keeps the name it started with)
    const text = b.dataset.pmLabel, m = /^(.*?):\s*(.*)$/.exec(text) || /^(Speed) (.*)$/.exec(text);
    const press = () => { b.click(); if (window.dbgSync) dbgSync(); };
    const list = CYCLES[m && m[1]];
    if (list) {                                                                       // (a button that goes round a list: a dropdown, and picking one presses it round to that)
      const cur = () => { const t = b.textContent.trim(), n = /^.*?:\s*(.*)$/.exec(t) || /^Speed (.*)$/.exec(t); return n ? n[1] : t; };
      return { label: m[1], choices: () => list.map(v => ({ label: cap(v), value: v })), current: cur,
        choose: v => { for (let i = 0; i < list.length && cur() !== v; i++) b.click(); } };
    }
    if (m) return { label: m[1], value: () => { const t = b.textContent.trim(), n = /^.*?:\s*(.*)$/.exec(t) || /^Speed (.*)$/.exec(t); return cap(n ? n[1] : t); }, act: press, left: press, right: press };
    if (b.classList.contains('tog')) return { label: text, value: () => b.classList.contains('on') ? 'On' : 'Off', act: press, left: press, right: press };
    return { label: text, act: press };
  };
  // a picker from the strip (go to an area, spawn an enemy): left and right go through what's in it, and picking one
  // does it. Going somewhere or spawning something puts the menu away first, so you see it happen
  const cursor = {};
  const picker = (sel, label, shut) => {
    const opts = [...sel.options].filter(o => o.value !== '');
    if (!opts.length) return null;
    if (cursor[sel.id] == null) cursor[sel.id] = Math.max(0, opts.findIndex(o => o.value === (sel.id === 'areaSel' && room ? room.id : sel.value)));   // (going somewhere starts on the room he's in)
    const now = () => opts[Math.min(cursor[sel.id], opts.length - 1)];
    const turn = d => () => { cursor[sel.id] = (cursor[sel.id] + d + opts.length) % opts.length; };
    const name = o => cap((o.parentElement && o.parentElement.tagName === 'OPTGROUP' ? o.parentElement.label + ': ' : '') + o.textContent);
    const group = o => o.parentElement && o.parentElement.tagName === 'OPTGROUP' ? o.parentElement.label : '';
    return { label, choices: () => opts.map(o => ({ label: cap(o.textContent), value: o.value, group: group(o) })), current: () => now().value, show: () => name(now()),
      choose: v => { cursor[sel.id] = opts.findIndex(o => o.value === v); if (shut) closeNow(); sel.value = v; sel.dispatchEvent(new Event('change', { bubbles: true })); } };
  };
  // the tuning's numbers under headings, so each one's easy to find (10/29/2026: they were one long list)
  const TUNE_GROUPS = [
    ['Walking and running', ['runSpeed', 'accelTime', 'decelTime', 'slowWalk', 'keyWalk', 'backSpeed', 'crawlSpeed']],
    ['Jumping and falling', ['jumpHeight', 'apexTime', 'jumpCut', 'coyote', 'jumpBuffer', 'fallMult', 'maxFall', 'splatHeight', 'airAccelTime', 'airDecelTime']],
    ['Sword', ['attackCooldown', 'chargeTime', 'pressSwing', 'swordReach', 'swingLunge', 'airHang', 'pogo', 'downCooldown']],
    ['Shield', ['guardSpeed', 'parryWindow', 'blockCost', 'stamRegen', 'guardBack']],
    ['Roll and air dodge', ['rollSpeed', 'rollTime', 'iframeStart', 'iframeLen', 'airDashSpeed']],
    ['Stamina', ['enRegen', 'enDelay', 'rollCost', 'airDodgeCost']],
    ['Special moves', ['rallyTime', 'cdSqueak', 'cdSpin', 'cdBurst']],
    ['Screen', ['pixelSnap']],
  ];
  const PICKERS = { areaSel: ['Go to', true], spawnSel: ['Spawn an enemy', true], spawnLvl: ['Its level', false] };
  const SKIP = new Set(['tuneBtn', 'maxBtn', 'muteBtn', 'musicBtn', 'restartBtn', 'titleBtn']);
  const handheld = () => { try { return matchMedia('(hover: none) and (pointer: coarse)').matches; } catch (e) { return false; } };
  const PHONE_ONLY = new Set(['touchBtn', 'buzzBtn']);                               // (the touch controls and the buzz only show on a phone or a tablet, the same as the title menu's Options)
  function stripRows(ids) {
    const out = [];
    for (const id of ids) {
      const g = document.getElementById(id); if (!g) continue;
      const items = [...g.querySelectorAll('button, select')].filter(e => !SKIP.has(e.id) && (!PHONE_ONLY.has(e.id) || handheld()));
      if (!items.length) continue;
      const h = g.querySelector('h3'); if (h && ids.length > 1) out.push({ head: cap(h.textContent.trim().toLowerCase()) });
      for (const e of items) { const r = e.tagName === 'SELECT' ? (PICKERS[e.id] ? picker(e, ...PICKERS[e.id]) : null) : mirror(e); if (r) out.push(r); }
    }
    return out;
  }
  const regionName = id => { const f = (window.ROOM_FILES || {})[id]; const r = f && f.split('/')[1]; const hit = (typeof AREA_REGIONS !== 'undefined' ? AREA_REGIONS : []).find(x => x[0] === r); return hit ? hit[1] : ''; };
  const playTime = s => { const m = Math.floor((s || 0) / 60), h = Math.floor(m / 60); return h ? `${h}h ${m % 60}m` : `${m}m`; };
  // a volume, 0 to 10 (the same as the title menu's: music at 0 turns the music off, and turning it up turns it back on)
  const vol = (k, label) => {
    const get = () => k === 'music' && !music.on ? 0 : Math.round(VOL[k] * 10);
    const set = v => {
      v = Math.max(0, Math.min(10, v));
      if (k === 'music') {
        if (v === 0) { if (music.on) document.getElementById('musicBtn').click(); return; }
        setVolume('music', v / 10); if (!music.on) document.getElementById('musicBtn').click();
      } else { setVolume('sfx', v / 10); if (sfx.tick) sfx.tick(); }
      if (typeof syncVolumes === 'function') syncVolumes();
    };
    return { label, vol: get, left: () => set(get() - 1), right: () => set(get() + 1), act: () => set(get() >= 10 ? 0 : get() + 1) };
  };
  const onOff = (label, get, flip) => ({ label, value: () => get() ? 'On' : 'Off', act: flip, left: flip, right: flip });
  const ROWS = {
    pause: () => {
      const rb = document.getElementById('restartBtn'), armed = rb && /again/i.test(rb.textContent);
      return [
        { label: 'Back to the adventure', act: () => close(), main: true },
        { label: 'Title screen', sub: 'Saves first', act: () => { saveWorld(); location.reload(); } },
        rb && { label: 'Start over', sub: armed ? 'Press it again to start over. This save goes back to the start' : '', act: () => { if (/again/i.test(rb.textContent)) { closeNow(); rb.click(); } else { rb.click(); setTimeout(() => { if (api.open && TABS[tab][0] === 'pause') show(true); }, 3150); } } },
      ].filter(Boolean);
    },
    sound: () => [vol('music', 'Music volume'), vol('sfx', 'Effects volume'),
      onOff('All sound', () => !muted, () => document.getElementById('muteBtn').click())],
    display: () => {
      const z = d => () => { pref.zoom = (pref.zoom + d + ZOOMS.length) % ZOOMS.length; savePref(); pickSide(); };
      return [
        { label: 'How close', choices: () => ZOOMS.map((zz, i) => ({ label: zz[0], value: i })), current: () => pref.zoom, choose: i => { pref.zoom = i; savePref(); pickSide(); } },
        onOff('Camera glides in', () => pref.glide, () => { pref.glide = !pref.glide; savePref(); }),
        document.getElementById('maxBtn') && onOff('Full screen', () => document.body.classList.contains('max'), () => document.getElementById('maxBtn').click()),
      ].filter(Boolean).concat(stripRows(['gGame']));
    },
    controls: () => {
      const view = keysView || (device === 'pad' ? 'Controller' : 'Keyboard');
      const flip = () => { keysView = view === 'Keyboard' ? 'Controller' : 'Keyboard'; };
      const pad = document.getElementById('pad');
      return [{ label: 'Showing', value: () => view, act: flip, left: flip, right: flip, table: view, note: pad ? pad.textContent : '' }];
    },
    // the tuning (it was its own drawer, on Tab): every number, left and right to change it, held down it keeps going
    tuning: () => {
      const row = ([key, label, mn, mx, stp, unit]) => {
        const turn = d => () => { tune[key] = Math.min(mx, Math.max(mn, Math.round((tune[key] + d * stp) / stp) * stp)); saveTune(); refreshTune(); };
        return { label, value: () => fmt(tune[key], stp) + unit, left: turn(-1), right: turn(1), act: turn(1) };
      };
      const out = [], used = new Set();
      for (const [head, keys] of TUNE_GROUPS) {
        const rs = keys.map(k => TUNE_ROWS.find(r => r[0] === k)).filter(Boolean);
        if (!rs.length) continue;
        out.push({ head }); for (const r of rs) { out.push(row(r)); used.add(r[0]); }
      }
      const rest = TUNE_ROWS.filter(r => !used.has(r[0]));                          // (anything new that hasn't been put under a heading yet)
      if (rest.length) { out.push({ head: 'Other' }); rest.forEach(r => out.push(row(r))); }
      return out.concat([{ head: ' ' }, { label: 'Reset to defaults', act: () => resetTune() }]);
    },
    // the dev tab: what was in the strip under the game (go to, cheats, enemies, what to show)
    dev: () => stripRows(['gGo', 'gCheat', 'gFoes', 'gShow']),
  };
  const TEXT = { pause: ['The adventure can wait.', 'Phill stays right here with you.'] };
  function show(keepRow) {
    const name = TABS[tab][0], label = keepRow && rows[at] ? rows[at].label : null;
    rows = ROWS[name]();
    if (label) { const i = rows.findIndex(r => r.label === label); at = i >= 0 ? i : at; }
    if (at >= rows.length) at = rows.length - 1;
    if (at >= 0 && rows[at] && rows[at].head) at = firstRow();
    tabsEl.innerHTML = TABS.map(([id, word], i) => `<button type="button" role="tab" class="pm-tab" data-t="${i}" aria-selected="${i === tab}" tabindex="${i === tab ? 0 : -1}">${word}</button>`).join('');
    let html = '';
    if (TEXT[name]) html += `<p class="pm-lead">${esc(TEXT[name][0])}</p><p class="pm-text">${esc(TEXT[name][1])}</p>`;
    html += `<div class="pm-rows" role="menu">${rows.map((r, i) => {
      if (r.head) return `<div class="pm-head" role="presentation">${esc(r.head)}</div>`;
      const val = r.vol ? String(r.vol()) : r.value ? r.value() : r.choices ? String((r.choices().find(c => c.value === r.current()) || {}).label || '') : '', side = r.left || r.right;
      return `<button type="button" class="pm-row${r.main ? ' pm-main' : ''}" role="menuitem" data-i="${i}"${r.choices ? ' aria-haspopup="listbox"' : ''}${val ? ` aria-label="${esc(r.label + ': ' + val)}"` : ''}>`
        + `<span class="pm-label">${esc(r.label)}</span>`
        + (r.choices ? `<span class="pm-value pm-pick">${esc(r.show ? r.show() : ((r.choices().find(c => c.value === r.current()) || {}).label || ''))}<span class="pm-caret" aria-hidden="true">▾</span></span>`
          : r.vol ? `<span class="pm-value">${side ? '<span class="pm-arr" data-d="-1">‹</span>' : ''}${pips(r.vol())}${side ? '<span class="pm-arr" data-d="1">›</span>' : ''}</span>`
          : r.value ? `<span class="pm-value">${side ? '<span class="pm-arr" data-d="-1">‹</span>' : ''}${esc(r.value())}${side ? '<span class="pm-arr" data-d="1">›</span>' : ''}</span>` : '')
        + (r.sub ? `<span class="pm-sub">${esc(r.sub)}</span>` : '') + `</button>`;
    }).join('')}</div>`;
    const t = rows.find(r => r.table);
    if (t) {
      const known = typeof knownMoves === 'function' ? knownMoves(t.table === 'Keyboard' ? 'key' : 'pad').map(m => [m.name, m.how + '. ' + m.what]) : [];
      if (t.note) html += `<p class="pm-note">${esc(t.note)}</p>`;
      html += `<div class="pm-keys" role="table" aria-label="Controls">${(window.CONTROLS_LIST ? CONTROLS_LIST[t.table] : []).concat(known).map(r => `<div class="pm-k" role="row"><span role="cell">${esc(r[0])}</span><span role="cell">${esc(r[1])}</span></div>`).join('')}</div>`;
    }
    bodyEl.innerHTML = html; drop = null;
    for (const b of tabsEl.querySelectorAll('.pm-tab')) b.addEventListener('click', e => { e.stopPropagation(); setTab(+b.dataset.t); at = -1; mark(); });
    for (const b of bodyEl.querySelectorAll('.pm-row')) {
      const i = +b.dataset.i;
      b.addEventListener('click', e => {
        e.stopPropagation(); at = i; mark();
        const arr = e.target.closest && e.target.closest('.pm-arr');
        if (arr && e.detail !== 0) side(+arr.dataset.d); else pick();
      });
    }
    whereEl.textContent = room ? [(typeof AREA_NAMES !== 'undefined' && AREA_NAMES[room.id]) || '', regionName(room.id), playTime(world.playSec)].filter(Boolean).join(' · ').replace(/^./, c => c.toUpperCase()) : '';
    footEl.textContent = device === 'pad' ? 'Options or Circle: back to the adventure' : device === 'touch' || document.body.classList.contains('touch') ? '' : 'Esc: back to the adventure';
    mark();
  }
  function mark() {
    tabsEl.querySelectorAll('.pm-tab').forEach((b, i) => b.classList.toggle('on', at === -1 && i === tab));
    bodyEl.querySelectorAll('.pm-row').forEach(b => b.classList.toggle('on', +b.dataset.i === at));
    const el = at === -1 ? tabsEl.querySelector(`.pm-tab[data-t="${tab}"]`) : bodyEl.querySelector(`.pm-row[data-i="${at}"]`);
    if (el && api.open && document.activeElement !== el) { try { el.focus({ preventScroll: true }); } catch (e) {} }
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }
  const firstRow = () => Math.max(0, rows.findIndex(r => !r.head));
  function setTab(i) { const n = (i + TABS.length) % TABS.length; if (n === tab) return; tab = n; const top = at === -1; rows = ROWS[TABS[tab][0]](); at = top ? -1 : firstRow(); show(); if (sfx.tick) sfx.tick(); }
  function move(d) {
    let n = at + d;
    while (n >= 0 && n < rows.length && rows[n].head) n += d;                       // (the little headings in the dev tab get skipped)
    if (n >= rows.length) n = at;
    n = Math.max(-1, n);
    if (n !== at) { at = n; mark(); if (sfx.tick) sfx.tick(); }
  }
  function jumpHead(d) {
    const heads = rows.map((r, i) => r.head && r.head.trim() ? i : -1).filter(i => i >= 0); if (!heads.length) return;
    const cur = heads.filter(h => h <= at).pop() ?? -1;
    const to = d > 0 ? heads.find(h => h > at) : heads.filter(h => h < cur).pop() ?? (cur >= 0 ? cur : undefined);
    if (to === undefined) return;
    at = to; move(1);
  }
  function pick() {
    if (at === -1) { at = firstRow(); mark(); return; }
    const r = rows[at]; if (!r) return;
    if (r.choices) { openDrop(at); return; }
    if (sfx.pop && !r.main) sfx.pop();
    r.act();
    if (api.open && !closing) show(true);
  }
  function side(d) {
    if (at === -1) { setTab(tab + d); at = -1; mark(); return; }
    const r = rows[at]; if (!r) return;
    if (r.choices) { const c = r.choices(), i = c.findIndex(x => x.value === r.current()), n = c[Math.max(0, Math.min(c.length - 1, i + d))];   // (left and right on a dropdown: the one before or after, without opening it, except for going somewhere or spawning)
      if (n && i >= 0 && n !== c[i] && !r.show) { if (sfx.tick) sfx.tick(); r.choose(n.value); show(true); } else if (r.show) openDrop(at); return; }
    const f = d < 0 ? r.left : r.right; if (!f) return;
    if (sfx.tick) sfx.tick(); f(); show(true);
  }
  // ---- a dropdown: opens under its row, up and down to go through it (held down it keeps going), left and right jump
  // a whole group (a region, in Go to), Enter or Cross picks, Esc or Circle shuts it again
  let drop = null;
  function openDrop(i) {
    const r = rows[i]; if (!r || !r.choices) return;
    const items = r.choices(); if (!items.length) return;
    drop = { row: i, items, at: Math.max(0, items.findIndex(c => c.value === r.current())) };
    if (sfx.pop) sfx.pop(); renderDrop();
  }
  function renderDrop() {
    const old = bodyEl.querySelector('.pm-drop'); if (old) old.remove();
    bodyEl.querySelectorAll('.pm-row').forEach(b => b.classList.remove('open'));
    if (!drop) { mark(); return; }
    const rowEl = bodyEl.querySelector(`.pm-row[data-i="${drop.row}"]`); if (!rowEl) { drop = null; return; }
    rowEl.classList.add('open'); rowEl.setAttribute('aria-expanded', 'true');
    const el = document.createElement('div'); el.className = 'pm-drop'; el.setAttribute('role', 'listbox'); el.setAttribute('aria-label', rows[drop.row].label);
    let g = null, html = '';
    drop.items.forEach((c, k) => {
      if (c.group && c.group !== g) { g = c.group; html += `<div class="pm-dgroup" role="presentation">${esc(g)}</div>`; }
      html += `<div class="pm-opt${k === drop.at ? ' on' : ''}${c.value === rows[drop.row].current() ? ' cur' : ''}" role="option" data-k="${k}" aria-selected="${k === drop.at}">${esc(c.label)}</div>`;
    });
    el.innerHTML = html; rowEl.after(el);
    el.addEventListener('click', e => { e.stopPropagation(); const o = e.target.closest('.pm-opt'); if (o) { drop.at = +o.dataset.k; dropPick(); } });
    el.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const o = e.target.closest('.pm-opt'); if (o && +o.dataset.k !== drop.at) { drop.at = +o.dataset.k; dropMark(); } });
    dropMark(true);
  }
  function dropMark(first) {
    const el = bodyEl.querySelector('.pm-drop'); if (!el || !drop) return;
    el.querySelectorAll('.pm-opt').forEach(o => { const on = +o.dataset.k === drop.at; o.classList.toggle('on', on); o.setAttribute('aria-selected', on); });
    const o = el.querySelector(`.pm-opt[data-k="${drop.at}"]`);
    if (o) { try { o.scrollIntoView({ block: first ? 'center' : 'nearest' }); } catch (e) {} }
    const rowEl = bodyEl.querySelector(`.pm-row[data-i="${drop.row}"]`); if (rowEl && first) rowEl.scrollIntoView({ block: 'nearest' });
  }
  function dropMove(d) { const n = Math.max(0, Math.min(drop.items.length - 1, drop.at + d)); if (n !== drop.at) { drop.at = n; dropMark(); if (sfx.tick) sfx.tick(); } }
  function dropGroup(d) {
    const g = drop.items[drop.at].group; if (!g && g !== '') return;
    let k = drop.at;
    if (d > 0) { while (k < drop.items.length && drop.items[k].group === g) k++; if (k >= drop.items.length) return; }
    else { while (k > 0 && drop.items[k - 1].group === g) k--; if (k === 0) { if (drop.at !== 0) { drop.at = 0; dropMark(); } return; } k--; const g2 = drop.items[k].group; while (k > 0 && drop.items[k - 1].group === g2) k--; }
    drop.at = k; dropMark(); if (sfx.tick) sfx.tick();
  }
  function dropPick() {
    const r = rows[drop.row], c = drop.items[drop.at]; drop = null;
    if (sfx.pop) sfx.pop();
    r.choose(c.value);
    if (api.open && !closing) show(true);
  }
  function dropShut() { drop = null; renderDrop(); if (sfx.tick) sfx.tick(); }
  root.addEventListener('click', () => { if (drop) dropShut(); });                    // (a click anywhere else shuts it)

  // the mouse: the row under it lights up when it really moves (not when the menu changes under a still mouse)
  let mx = -1, my = -1;
  root.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || (e.clientX === mx && e.clientY === my)) return;
    mx = e.clientX; my = e.clientY;
    const b = e.target.closest && e.target.closest('.pm-row'); if (!b) return;
    if (+b.dataset.i !== at) { at = +b.dataset.i; mark(); }
  });
  for (const ev of ['pointerdown', 'click', 'touchstart']) root.addEventListener(ev, e => e.stopPropagation());

  // where the menu goes: over the game, on the side away from him. On a phone held upright there's a big dark space
  // under the game, so it goes there instead, the whole width
  let sideNow = 'left';
  function place() {
    const dpr = window.devicePixelRatio || 1, x = offX / dpr, y = offY / dpr, w = VW * S / dpr, h = VH * S / dpr;
    root.classList.toggle('below', w < h * 1.15);                                      // (a phone held upright: the game's narrow and tall, so the menu goes across its bottom)
    root.classList.toggle('right', sideNow === 'right');
    root.style.setProperty('--gx', x + 'px'); root.style.setProperty('--gy', y + 'px');
    root.style.setProperty('--gw', w + 'px'); root.style.setProperty('--gh', h + 'px');
  }
  window.addEventListener('resize', () => setTimeout(() => { if (api.open) { pickSide(); place(); } }, 80));

  // ---- the camera: how close, and where, so he's on the side of the screen the menu isn't
  const zoomNow = () => Math.max(1, Math.round(S * ZOOMS[pref.zoom][1] * Math.min(1, VW / 560))) / S;     // (a whole number of screen pixels for each art pixel once it's in. A narrow view, a phone held upright, is already close)
  function viewFor(where) {
    const z = zoomNow(), w = VW / z, h = VH / z, W = room.pxW, H = room.pxH;
    const fx = where === 'left' ? 0.64 : 0.36, below = root.classList.contains('below');
    let x = P.x - (below ? 0.5 : fx) * w;
    x = W <= w ? (W - w) / 2 : Math.max(0, Math.min(W - w, x));
    const bottom = Math.min(H, Math.max(h, room.viewBottom || H));                   // (the view stops a little under the floor, the same as always)
    let y = P.y - (below ? 0.4 : 0.72) * h;                                          // (with the menu across the bottom, he's up above it)
    y = H <= h ? (H - h) / 2 : Math.max(0, Math.min(bottom - h, y));
    return { x, y, w, h, at: (P.x - x) / w };
  }
  function pickSide() {
    if (!room) return;
    place();
    const v = viewFor('left');
    sideNow = v.at >= 0.5 ? 'left' : 'right';                                        // near the left edge he can't get over to the right: the menu goes right
    place();
  }

  // ---- sitting down, and what he does sitting there
  let sitting = false, saved = null, seq = [], si = 0, st = 0, inBit = false, gap = 0, lastBit = null, clock = 0;
  const has = f => !!(META && META.frames[f + '_R']);
  const step = (f, d, go, huh) => ({ f, d, go, huh });
  function foeClose() {
    if (typeof foes === 'undefined') return false;
    for (const f of foes) {
      if (!f || f.state === 'down' || f.state === 'hidden' || f.gone) continue;
      let b; try { b = foeBox(f); } catch (e) { continue; }
      if (b.l < -900) continue;
      if (b.r > P.x - 120 && b.l < P.x + 120 && b.b > P.y - 110 && b.t < P.y + 60) return true;
    }
    return false;
  }
  function canSit() {
    return P.ground && !P.story && !scene && !cutscene && !talk && !mapView && !P.crawl && !P.hang && !P.cling && !P.swim && !P.atk && !P.reach
      && !(P.roll > 0) && !(P.dash > 0) && !(P.ko > 0) && !(P.hurtT > 0) && !(P.splat > 0) && !(P.respawnT > 0) && !P.walkIn && !P.chute && !P.held && !P.hidden && !P.flop
      && trans.state === 'none' && !(typeof bossLocked === 'function' && bossLocked()) && has('sit_3') && !foeClose();
  }
  function bits() {
    if (typeof REST_BITS === 'undefined') return [];
    return ['doodle', 'doodle', 'stretch', ...(world.has.crayon_black ? ['map', 'map'] : []), ...(world.has.backpack ? ['book', 'book', 'book'] : [])]
      .filter(n => REST_BITS[n] && has({ doodle: 'draw_1', stretch: 'stretch', map: 'rs_map_1', book: 'rs_lap_1' }[n]));
  }
  function nextBit() {
    const names = bits().filter(n => n !== lastBit);
    if (!names.length) { gap = 3; return; }
    lastBit = names[Math.floor(Math.random() * names.length)];
    seq = REST_BITS[lastBit]().map(s => step(s.f, s.d, s.go, s.huh)); si = 0; st = 0; inBit = true;
    begin0();
  }
  const quiet = fn => { if (!fn) return; const p = sfx.pickup; sfx.pickup = () => {}; try { fn(); } finally { sfx.pickup = p; } };   // (no pickup chime from his book while the menu's up: it sounded like getting something)
  function begin0() { const s = seq[si]; if (s) quiet(s.go); show0(); }
  function show0() { const s = seq[si]; if (!s) return; P.story = { kind: 'scene', frame: s.f, t: clock }; P.restHuh = !!s.huh; }
  function runSeq(dt) {
    clock += dt;
    if (si >= seq.length) {
      if (closing) return;
      if (inBit) { inBit = false; P.paper = null; P.crayon = null; P.restHuh = false; P.story = { kind: 'scene', frame: 'sit_3', t: clock }; gap = 3 + Math.random() * 3; }
      if ((gap -= dt) <= 0) nextBit();
      return;
    }
    st += dt;
    while (si < seq.length && st >= seq[si].d) { st -= seq[si].d; si++; if (si < seq.length) begin0(); }
    if (si < seq.length) show0();
  }

  // ---- opening and closing
  let k = 0, closing = false, lastT = performance.now();
  function canOpen() { return started && room && !api.open && !tuneOpen() && !(window.titleMenu && titleMenu.open); }
  function open(instant, onTab) {
    if (!canOpen()) return false;
    if (window.__testNoDraw) instant = true;                                         // (the tests don't draw between pictures, so nothing would move the camera in)
    api.open = true; closing = false; paused = true;
    for (const n in inp) inp[n] = 0; inp.pace = 1;
    saved = { story: P.story, restHuh: P.restHuh, paper: P.paper, crayon: P.crayon, facing: P.facing };
    sitting = canSit();
    if (sitting) {
      if (P.idleBit && typeof stopIdleBit === 'function') stopIdleBit();
      P.paper = null; P.crayon = null; clock = 0; inBit = false; lastBit = null;
      seq = instant ? [step('sit_3', 0.01)] : [step('turn', 0.12), step('sit_1', 0.13, () => sfx.bump && sfx.bump()), step('sit_2', 0.12), step('sit_3', 0.3)];
      si = 0; st = 0; gap = 1.2; begin0();
    }
    for (const id in cursor) delete cursor[id];
    tab = Math.max(0, TABS.findIndex(t => t[0] === onTab)); rows = ROWS[TABS[tab][0]](); at = firstRow(); keysView = null;
    pickSide(); show(); place();
    root.classList.toggle('still', !pref.glide);                                   // (no camera glide: no sliding panel either)
    root.hidden = false; document.body.classList.add('paused');
    requestAnimationFrame(() => root.classList.add('in'));
    k = instant || !pref.glide ? 1 : 0; lastT = performance.now();
    if (sfx.pop) sfx.pop();
    return true;
  }
  function close() {
    if (!api.open || closing) return;
    closing = true; root.classList.remove('in');
    if (document.activeElement && root.contains(document.activeElement)) document.activeElement.blur();
    if (sitting) {
      const props = !!(P.paper || P.crayon || (P.story && /^rs_/.test(P.story.frame || '')));
      seq = (props ? [step(has('rs_reach') && /^rs_/.test(P.story.frame || '') ? 'rs_reach' : 'paper_3', 0.12, () => { P.paper = null; P.crayon = null; P.restHuh = false; })] : [])
        .concat([step('sit_3', 0.08, () => { P.paper = null; P.crayon = null; P.restHuh = false; }), step('sit_1', 0.13), step('turn', 0.12)]);
      si = 0; st = 0; begin0();
    }
    if (!pref.glide || window.__testNoDraw) { k = 0; finish(); }
  }
  function finish() {
    api.open = false; closing = false;
    if (saved) { P.story = saved.story; P.restHuh = saved.restHuh; P.paper = saved.paper; P.crayon = saved.crayon; P.facing = saved.facing; }
    saved = null; sitting = false;
    if (typeof idleState !== 'undefined') idleState.still = 0;
    for (const n in inp) inp[n] = 0; inp.pace = 1;
    paused = tuneOpen();
    root.hidden = true; document.body.classList.remove('paused');
    if (C.focus) try { C.focus({ preventScroll: true }); } catch (e) {}
  }
  function closeNow() { if (!api.open) return; closing = true; root.classList.remove('in'); k = 0; finish(); }
  api.toggle = () => api.open ? close() : open();
  api.showing = () => api.open;

  // ---- drawing: the room as it was, through the camera moved in on him (render.js does the drawing; this only moves
  // the camera and how big the art pixels are for it, and puts them back after)
  const ease = t => t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
  api.draw = (render0, alpha) => {
    const now = performance.now(), dt = Math.min(0.1, (now - lastT) / 1000); lastT = now;
    if (sitting) runSeq(dt);
    if (closing) { k -= dt / OUT; if (k <= 0 && (!sitting || si >= seq.length)) { k = 0; finish(); return render0(alpha); } k = Math.max(0, k); }
    else k = Math.min(1, k + dt / IN);
    if (!room) return render0(alpha);
    const e = ease(k), v = viewFor(sideNow);
    const sv = { S, VW, VH, x: cam.x, y: cam.y, px: cam.px, py: cam.py, shakeT };
    const w = VW + (v.w - VW) * e, h = VH + (v.h - VH) * e, z = VW / w;
    S = sv.S * z; VW = w; VH = h;
    cam.x = cam.px = sv.x + (v.x - sv.x) * e; cam.y = cam.py = sv.y + (v.y - sv.y) * e; shakeT = 0;
    try { render0(1); }
    finally { S = sv.S; VW = sv.VW; VH = sv.VH; cam.x = sv.x; cam.y = sv.y; cam.px = sv.px; cam.py = sv.py; shakeT = sv.shakeT; }
  };
  // while it's up, nothing that's drawn over the game shows (his health, words, the map, a talk box): only the room and him
  const hide = name => { const f = window[name]; if (typeof f !== 'function') return; window[name] = function () { if (api.open) return; return f.apply(this, arguments); }; };
  ['drawHud', 'drawHints', 'drawPrompt', 'drawTalk', 'drawMap', 'drawPins', 'drawBossBar', 'drawCard', 'drawLetterbox', 'drawSceneText', 'drawDebug'].forEach(hide);
  const render0 = render;
  render = function (alpha) { return api.open ? api.draw(render0, alpha) : render0(alpha); };

  // ---- keys (input.js hands them here first)
  api.key = e => {
    if (!api.open) {
      if ((e.code === 'Escape' || e.code === 'KeyP') && !e.repeat && !ownsKeys(e.target) && canOpen()) { e.preventDefault(); useDevice('key'); open(); return true; }
      if (e.code === 'Tab' && started && canOpen()) { e.preventDefault(); if (!e.repeat) { useDevice('key'); open(false, 'tuning'); } return true; }   // (Tab: straight to the tuning, the way it used to open its own drawer)
      return false;
    }
    if (ownsKeys(e.target)) return false;
    e.preventDefault();
    if (closing || e.repeat && !/^Arrow|^Key[WASD]$|^Page/.test(e.code)) return true;
    const c = e.code;
    if (drop) {
      if (['Escape', 'Backspace', 'KeyC', 'Tab'].includes(c)) dropShut();
      else if (['ArrowUp', 'KeyW'].includes(c)) dropMove(-1);
      else if (['ArrowDown', 'KeyS'].includes(c)) dropMove(1);
      else if (c === 'PageUp') dropMove(-8);
      else if (c === 'PageDown') dropMove(8);
      else if (['ArrowLeft', 'KeyA'].includes(c)) dropGroup(-1);
      else if (['ArrowRight', 'KeyD'].includes(c)) dropGroup(1);
      else if (['Enter', 'NumpadEnter', 'Space', 'KeyZ'].includes(c)) dropPick();
      return true;
    }
    if (device !== 'key') { useDevice('key'); show(true); }
    if (['Escape', 'KeyP', 'Backspace', 'KeyC'].includes(c)) close();
    else if (['ArrowUp', 'KeyW'].includes(c)) move(-1);
    else if (['ArrowDown', 'KeyS'].includes(c)) move(1);
    else if (['ArrowLeft', 'KeyA'].includes(c)) side(-1);
    else if (['ArrowRight', 'KeyD'].includes(c)) side(1);
    else if (c === 'PageDown' || c === 'PageUp') jumpHead(c === 'PageDown' ? 1 : -1);   // (the next or last heading, in Tuning and Dev)
    else if (c === 'KeyQ') { setTab(tab - 1); }
    else if (c === 'KeyE') { setTab(tab + 1); }
    else if (['Enter', 'NumpadEnter', 'Space', 'KeyZ'].includes(c)) pick();
    else if (c === 'Tab') { if (e.shiftKey) { if (at === -1) setTab(tab - 1); else move(-1); } else if (at === rows.length - 1) { setTab(tab + 1); at = -1; mark(); } else move(1); }
    return true;
  };
  // ---- the controller (input.js hands it over while the menu's up): the d-pad or stick to move, held down it repeats,
  // Cross to pick, Circle or Options to close, L1 and R1 for the tabs
  let held = 0, heldFor = 0, padT = performance.now();
  api.pad = (gp, b, pressed, ax, ay) => {
    const now = performance.now(), dt = Math.min(0.1, (now - padT) / 1000); padT = now;
    if (!gp || closing) return;
    const dir = b(12) || ay < -0.55 ? -1 : b(13) || ay > 0.55 ? 1 : 0, hdir = b(14) || ax < -0.6 ? -1 : b(15) || ax > 0.6 ? 1 : 0;
    const code = dir * 10 + hdir, any = code || [0, 1, 4, 5].some(pressed);
    if (any && device !== 'pad') { useDevice('pad'); show(true); }
    const go = () => { if (drop) { if (dir) dropMove(dir); else if (hdir) dropGroup(hdir); } else if (dir) move(dir); else if (hdir) side(hdir); };
    if (code !== held) { held = code; heldFor = 0; go(); }
    else if (code) { heldFor += dt; if (heldFor > 0.4) { heldFor = drop ? 0.34 : 0.28; go(); } }
    if (drop) { if (pressed(0)) dropPick(); else if (pressed(1)) dropShut(); return; }
    if (pressed(0)) pick();
    else if (pressed(1)) close();
    else if (pressed(4)) setTab(tab - 1);
    else if (pressed(5)) setTab(tab + 1);
  };
  // switching away from the game (another tab, another window on a phone) pauses it, already sitting
  document.addEventListener('visibilitychange', () => { if (document.hidden && canOpen() && !window.__testSkipTitle) open(true); });
  api.open0 = open; api.close = close; api.tab = () => TABS[tab][0]; api.side = () => sideNow; api.sitting = () => sitting; api.rows = () => rows.map(r => r.label);
  api.setTab = i => { setTab(i); }; api.at = () => at; api.canSit = canSit; api.foeClose = foeClose;
  return api;
})();
