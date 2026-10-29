'use strict';
// ---------- tuning drawer (Options or Tab), and the buttons under the game ----------
const tuneEl = document.getElementById('tune'), rowsEl = document.getElementById('rows');
let tuneSel = 0, tuneRepeat = 0, tunePrevDir = 0, tuneHeld = false;
const tuneOpen = () => !tuneEl.hidden;
const fmt = (v, step) => step >= 1 ? String(Math.round(v)) : v.toFixed(2);
function buildTune() {
  rowsEl.innerHTML = '';
  TUNE_ROWS.forEach(([k, label, mn, mx, st, unit], i) => {
    const row = document.createElement('div'); row.className = 'row'; row.dataset.i = i;
    row.innerHTML = `<label for="t_${k}">${label}</label><output id="o_${k}">${fmt(tune[k], st)}${unit}</output><input id="t_${k}" type="range" min="${mn}" max="${mx}" step="${st}" value="${tune[k]}">`;
    row.querySelector('input').addEventListener('input', e => { tune[k] = parseFloat(e.target.value); refreshTune(); saveTune(); });
    row.addEventListener('pointerdown', () => { tuneSel = i; refreshTune(); });
    rowsEl.appendChild(row);
  });
  refreshTune();
}
function refreshTune() {
  TUNE_ROWS.forEach(([k, , , , st, unit], i) => {
    document.getElementById('o_' + k).textContent = fmt(tune[k], st) + unit;
    const el = document.getElementById('t_' + k); if (parseFloat(el.value) !== tune[k]) el.value = tune[k];
    rowsEl.children[i].classList.toggle('sel', i === tuneSel);
  });
  document.getElementById('resetTune').classList.toggle('sel', tuneSel === TUNE_ROWS.length);
}
function toggleTune() {
  tuneEl.hidden = !tuneEl.hidden; paused = tuneOpen() || !!(window.pauseMenu && pauseMenu.open);
  for (const k in inp) inp[k] = 0;
  if (tuneOpen()) refreshTune();
}
function tunePad(gp, b, pressed, ay) {
  if (!gp) return;
  if (pressed(13) || (ay > 0.6 && tunePrevDir !== 1)) { tuneSel = Math.min(TUNE_ROWS.length, tuneSel + 1); refreshTune(); rowsEl.children[Math.min(tuneSel, TUNE_ROWS.length - 1)].scrollIntoView({ block: 'nearest' }); }
  if (pressed(12) || (ay < -0.6 && tunePrevDir !== -1)) { tuneSel = Math.max(0, tuneSel - 1); refreshTune(); rowsEl.children[tuneSel].scrollIntoView({ block: 'nearest' }); }
  tunePrevDir = ay > 0.6 ? 1 : ay < -0.6 ? -1 : 0;
  if (tuneSel === TUNE_ROWS.length) { if (pressed(0)) resetTune(); if (pressed(1) || pressed(9)) toggleTune(); return; }
  const lr = (b(15) || (gp.axes[0] || 0) > 0.5 ? 1 : 0) - (b(14) || (gp.axes[0] || 0) < -0.5 ? 1 : 0);
  if (lr) {
    if (tuneRepeat <= 0) {
      const [k, , mn, mx, st] = TUNE_ROWS[tuneSel];
      tune[k] = Math.min(mx, Math.max(mn, Math.round((tune[k] + lr * st) / st) * st));
      refreshTune(); saveTune();
      tuneRepeat = tuneHeld ? 4 : 16; tuneHeld = true;
    } else tuneRepeat--;
  } else { tuneRepeat = 0; tuneHeld = false; }
  if (pressed(1) || pressed(9)) toggleTune();
}
function resetTune() { Object.assign(tune, DEFAULTS); saveTune(); refreshTune(); }
document.getElementById('resetTune').addEventListener('click', resetTune);
document.getElementById('closeTune').addEventListener('click', toggleTune);
document.getElementById('tuneBtn').addEventListener('click', () => { if (!started) begin(); toggleTune(); });
document.getElementById('boxBtn').addEventListener('click', () => { showBoxes = !showBoxes; });
document.getElementById('debugBtn').addEventListener('click', () => { showDebug = !showDebug; });
document.getElementById('unlockBtn').addEventListener('click', e => {
  unlockAll = !unlockAll; e.target.textContent = unlockAll ? 'All moves on' : 'Unlock all moves';
});
document.getElementById('muteBtn').addEventListener('click', e => { audio(); muted = !muted; e.target.textContent = muted ? 'Sound off' : 'Sound on'; music.mute(muted); });
const musicBtn = document.getElementById('musicBtn');
musicBtn.textContent = music.on ? 'Music on' : 'Music off';
musicBtn.addEventListener('click', () => { music.toggle(); musicBtn.textContent = music.on ? 'Music on' : 'Music off'; });
// the music and effects volumes (10/17/2026), the same ones as the title menu's Options
(() => {
  const row = document.querySelector('#gSound .row');
  for (const [k, name] of [['music', 'Music'], ['sfx', 'Effects']]) {
    const l = document.createElement('label'); l.className = 'vol';
    l.innerHTML = `${name} <input type="range" id="vol-${k}" min="0" max="10" step="1" aria-label="${name} volume">`;
    row.appendChild(l);
    const r = l.querySelector('input'); r.value = Math.round(VOL[k] * 10);
    r.addEventListener('input', () => { setVolume(k, r.value / 10); if (k === 'sfx' && sfx.tick) sfx.tick(); });
    // let go with the mouse or a finger: back to the game. With the arrow keys it stays picked so each press moves it
    // again (it let go after the first, and the next press walked Phill: the fix check, 10/18/2026). Esc or Enter lets go
    r.addEventListener('pointerup', () => setTimeout(() => r.blur(), 0));
    r.addEventListener('keydown', e => { if (e.code === 'Escape' || e.code === 'Enter' || e.code === 'NumpadEnter') { e.preventDefault(); e.stopPropagation(); r.blur(); } });
  }
})();
function syncVolumes() { for (const k of ['music', 'sfx']) { const r = document.getElementById('vol-' + k); if (r) r.value = Math.round(VOL[k] * 10); } }
// asks twice so it can't happen by accident: the first click turns the button into "Click again to start over"
let restartArmed = 0;
document.getElementById('restartBtn').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (performance.now() > restartArmed) {
    restartArmed = performance.now() + 3000; btn.textContent = 'Click again to start over';
    setTimeout(() => { if (performance.now() > restartArmed) btn.textContent = 'Start over'; }, 3100);
    return;
  }
  restartArmed = 0; btn.textContent = 'Start over';
  resetWorld(); startGame(); if (!started) begin();
});
