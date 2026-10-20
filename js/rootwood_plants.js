'use strict';
// ---------- Rootwood's plant traps (10/17/2026) ----------
// Plants that grew down here and eat whatever wanders too close. Based on real meat eating plants but made
// for under the oak. They never move and each has just one attack (no extra moves by region like the rest), they're
// rare (most rooms have none), and cut down they stay down for good (world.flags 'cut_<room>_<i>').
// Helpers (strike, tellOnce, pinHim, pinnedBy, drawFoe2) are in pond.js, foes.js and rootwood_foes2.js.

const plantCut = f => 'cut_' + f.room + '_' + f.i;
function plantSetup(f, d) {
  f.x = d.x; f.y = d.y; f.x0 = d.x; f.vel = 0; f.cd = 0.6;
  if (world.flags[plantCut(f)]) { f.state = 'down'; f.hp = 0; f.t = 99; }
}
function plantDown(f) { world.flags[plantCut(f)] = true; }

// ---- the plant traps' own sounds (10/17/2026): each one sounds like what it is. The wind ups are
// quiet, just enough for someone careful to catch; the catches are meant to make you panic. Built from the same tiny
// synth as the rest (audio.js), with a few more pieces: envelopes with an attack, a growl (a waveshaper), and things
// timed a little apart
const plantSfx = (() => {
  const ok = () => actx && !muted && (actx.state === 'running' || window.__plantSfxRender);
  let curve = null;
  function growlCurve() {                                                            // soft clipping, for the growls
    if (curve) return curve;
    curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; curve[i] = Math.tanh(x * 6) * 0.9; }
    return curve;
  }
  function out(vol, at, a, d, dest) {                                                // a gain with an attack and a fall
    const g = actx.createGain();
    g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + Math.max(0.004, a)); g.gain.exponentialRampToValueAtTime(0.0001, at + a + d);
    g.connect(dest || sfxOut()); return g;
  }
  function osc(type, f0, f1, delay, a, d, vol, o = {}) {
    const t = actx.currentTime + delay, os = actx.createOscillator();
    os.type = type; os.frequency.setValueAtTime(f0, t); os.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + a + d);
    if (o.detune) os.detune.value = o.detune;
    let node = os;
    if (o.vib) { const l = actx.createOscillator(), lg = actx.createGain(); l.frequency.value = o.vib[0]; lg.gain.value = o.vib[1]; l.connect(lg).connect(os.frequency); l.start(t); l.stop(t + a + d + 0.05); }
    if (o.growl) { const w = actx.createWaveShaper(); w.curve = growlCurve(); node.connect(w); node = w; }
    if (o.lp) { const f = actx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(o.lp[0], t); f.frequency.exponentialRampToValueAtTime(o.lp[1] || o.lp[0], t + a + d); f.Q.value = o.q || 1; node.connect(f); node = f; }
    node.connect(out(vol, t, a, d)); os.start(t); os.stop(t + a + d + 0.05);
  }
  function nz(delay, a, d, vol, type, f0, f1, q = 1, o = {}) {
    noiseBuffer();
    const t = actx.currentTime + delay, s = actx.createBufferSource(), f = actx.createBiquadFilter();
    s.buffer = noiseBuf; s.loop = true; s.playbackRate.value = o.rate || 1;
    f.type = type; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + a + d);
    let node = s.connect(f);
    if (o.trem) { const g2 = actx.createGain(), l = actx.createOscillator(), lg = actx.createGain(); g2.gain.value = 0.5; l.frequency.value = o.trem; lg.gain.value = 0.5; l.connect(lg).connect(g2.gain); node.connect(g2); node = g2; l.start(t); l.stop(t + a + d + 0.05); }
    node.connect(out(vol, t, a, d)); s.start(t, Math.random() * 0.4); s.stop(t + a + d + 0.05);
  }
  const clicks = (delay, n, gap, vol, f) => { for (let i = 0; i < n; i++) nz(delay + i * gap * (0.7 + Math.random() * 0.6), 0.002, 0.02, vol * (0.6 + Math.random() * 0.4), 'bandpass', f * (0.8 + Math.random() * 0.4), f, 6); };
  const sting = (delay, base, vol, len = 0.9) => {                                   // the panic: a cluster of tones a half step apart, sliding down, growling
    for (const [m, dt] of [[1, 0], [1.059, 0.01], [1.414, 0.02], [0.5, 0]]) osc('sawtooth', base * m, base * m * 0.7, delay + dt, 0.02, len, vol * (m === 0.5 ? 1.2 : 0.7), { growl: true, lp: [4000, 900] });
  };
  return {
    heart(fast = false) { if (!ok()) return; osc('sine', 70, 50, 0, 0.005, 0.14, 0.16); osc('sine', 64, 46, fast ? 0.16 : 0.2, 0.005, 0.12, 0.11); },   // his heart pounding while he's caught
    // the snapjaw: leaves and sap. Its wind up: the leaves crinkling as they tense, a stem creaking. Its catch: the two
    // leaves cracking shut like a trap, a wet crunch, and the sting. Held: chewing
    snapjawWind() { if (!ok()) return; nz(0, 0.08, 0.3, 0.025, 'highpass', 5000, 3500, 0.7, { trem: 23 }); osc('sawtooth', 70, 95, 0.05, 0.2, 0.15, 0.012, { lp: [500] }); clicks(0.1, 4, 0.06, 0.03, 2600); },
    snapjawCatch() {
      if (!ok()) return;
      nz(0, 0.001, 0.05, 0.3, 'highpass', 2500, 1500, 0.5); osc('triangle', 240, 70, 0, 0.002, 0.12, 0.22);                      // CRACK
      nz(0.04, 0.01, 0.35, 0.22, 'bandpass', 900, 300, 1.5, { trem: 14 }); clicks(0.05, 8, 0.03, 0.12, 1800);                   // a wet crunch
      sting(0.06, 233, 0.07);
      nz(0.25, 0.08, 0.8, 0.1, 'lowpass', 300, 120, 2, { trem: 6 });                                                            // a gurgle down in it
    },
    snapjawMiss() { if (!ok()) return; nz(0, 0.001, 0.05, 0.3, 'highpass', 2500, 1500, 0.5); osc('triangle', 240, 70, 0, 0.002, 0.12, 0.2); },   // shut on nothing: just the crack
    snapjawChew() { if (!ok()) return; nz(0, 0.01, 0.16, 0.08, 'bandpass', 700, 300, 2); clicks(0.02, 3, 0.04, 0.05, 1500); },
    // the dewlash: sticky hairs. Its wind up: a hair peeling back off the others, tiny sticky ticks and a thin stretch.
    // The lash: a wet whip. The catch: a gloopy slap and the dew dragging at his feet
    dewlashWind() { if (!ok()) return; clicks(0, 5, 0.05, 0.025, 3800); osc('sine', 1700, 2300, 0.05, 0.1, 0.25, 0.006, { vib: [9, 60] }); },
    dewlashLash() { if (!ok()) return; nz(0, 0.003, 0.09, 0.14, 'bandpass', 5000, 1400, 0.8); osc('sine', 900, 2600, 0, 0.003, 0.06, 0.03); nz(0.05, 0.005, 0.08, 0.06, 'lowpass', 900, 300, 3); },
    dewlashCatch() {
      if (!ok()) return;
      nz(0, 0.003, 0.18, 0.3, 'lowpass', 1400, 250, 4); osc('sine', 300, 120, 0, 0.003, 0.15, 0.12);                           // splat
      nz(0.08, 0.05, 0.7, 0.08, 'bandpass', 2400, 600, 3, { trem: 30 }); clicks(0.1, 10, 0.06, 0.05, 2200);                     // sticky, dragging
      for (const [f, dt] of [[1245, 0], [1319, 0.03]]) osc('sine', f, f * 0.8, 0.04 + dt, 0.01, 0.7, 0.025, { vib: [7, 25] });   // a thin, wrong whine
    },
    // the gluecap: glue. Its wind up: a slow bubble of glue swelling, a drip. The drop: a gloop. The catch: a heavy
    // splat, the glue stretching and holding, a low drone of being stuck
    gluecapWind() { if (!ok()) return; osc('sine', 110, 230, 0, 0.3, 0.2, 0.02, { vib: [11, 8], lp: [600] }); osc('sine', 900, 600, 0.42, 0.003, 0.06, 0.02); },
    gluecapDrop() { if (!ok()) return; osc('sine', 500, 180, 0, 0.005, 0.12, 0.04); },
    gluecapCatch() {
      if (!ok()) return;
      nz(0, 0.002, 0.25, 0.35, 'lowpass', 1000, 180, 5); osc('sine', 160, 55, 0, 0.004, 0.25, 0.22);                            // SPLAT
      nz(0.12, 0.2, 1.1, 0.07, 'bandpass', 1600, 300, 4, { trem: 18 }); clicks(0.2, 12, 0.08, 0.04, 1900);                      // stretching, sticking
      for (const m of [1, 1.059]) osc('sawtooth', 55 * m, 52 * m, 0.05, 0.3, 1.2, 0.05, { growl: true, lp: [350] });              // the drone of being stuck
      osc('sine', 880, 830, 0.06, 0.02, 0.6, 0.02, { vib: [6, 30] });
    },
    // the glintmaw: its lure chimes like a real pickup, only out of tune and wavering (the careful ones hear it's
    // wrong). The catch: the ground erupting, a roar, a shriek, teeth
    glintmawLure() { if (!ok()) return; osc('sine', 1568 * 1.03, 1568 * 0.99, 0, 0.005, 0.6, 0.012, { vib: [5, 22] }); osc('sine', 2093 * 0.97, 2093 * 0.95, 0.09, 0.005, 0.5, 0.008, { vib: [5, 30] }); },
    glintmawBurst() {                                                                 // up out of the ground: earth bursting, a roar, a shriek
      if (!ok()) return;
      nz(0, 0.005, 0.7, 0.36, 'lowpass', 220, 60, 1.5); clicks(0, 16, 0.025, 0.1, 900);
      osc('sawtooth', 150, 55, 0.03, 0.04, 0.9, 0.16, { growl: true, lp: [1800, 400], vib: [32, 30] });
      osc('sawtooth', 112, 42, 0.05, 0.05, 0.9, 0.12, { growl: true, lp: [1200, 300], vib: [27, 20] });
      for (const [f, dt] of [[1900, 0], [2010, 0.01], [2690, 0.02]]) osc('sawtooth', f, f * 1.4, 0.04 + dt, 0.02, 0.45, 0.03, { lp: [6000] });
    },
    glintmawBite() {                                                                  // ...and it has him: teeth shutting, the sting
      if (!ok()) return;
      nz(0, 0.002, 0.08, 0.3, 'highpass', 2000, 1200, 0.6); osc('triangle', 300, 90, 0, 0.002, 0.1, 0.2); clicks(0.02, 6, 0.03, 0.1, 1400);
      sting(0.03, 185, 0.06, 1.1);
    },
    glintmawChew() { if (!ok()) return; nz(0, 0.01, 0.2, 0.1, 'bandpass', 500, 200, 2); osc('sawtooth', 90, 60, 0, 0.02, 0.2, 0.03, { growl: true, lp: [500] }); clicks(0.03, 3, 0.05, 0.06, 1200); },
  };
})();

// the scare when one gets him: the edges of the screen go dark red for a moment and pulse with his heart
let plantScareT = 0;
function plantScare(k = 1) { plantScareT = Math.max(plantScareT, 0.9 * k); shakeT = Math.max(shakeT, 0.22); shakeA = Math.max(shakeA, 3); hitstop = Math.max(hitstop, 0.08); }
function drawPlantScare() {
  const held = P.pinned && P.pinned.by && FOE[P.pinned.by.kind] && FOE[P.pinned.by.kind].plant;
  if (plantScareT <= 0 && !held) return;
  const k = Math.max(plantScareT / 0.9, held ? 0.35 + 0.15 * Math.sin(performance.now() / 1000 * 13) : 0);
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const w = ctx.canvas.width, h = ctx.canvas.height, g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7);
  g.addColorStop(0, 'rgba(60,0,8,0)'); g.addColorStop(1, `rgba(60,0,8,${(0.75 * Math.min(1, k)).toFixed(2)})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); ctx.restore();
}
// his own frames while one's got him (10/17/2026): the trap says which of his pictures to show, or to hide
// him (when he's all the way inside it and it draws the bits of him that stick out)
function plantPose(f, name) { P.plantBy = f; P.plantFrame = name; P.plantHide = false; }
function plantHide(f) { P.plantBy = f; P.plantFrame = null; P.plantHide = true; }
function plantLetGo(f) { if (P.plantBy === f) { P.plantBy = null; P.plantFrame = null; P.plantHide = false; } }
const _frameName0 = frameName;
frameName = function () {
  if (P.plantBy && (!foes.includes(P.plantBy) || P.plantBy.state === 'down' || P.health <= 0)) { P.plantBy = null; P.plantFrame = null; P.plantHide = false; }
  if (P.plantBy && P.plantHide) return null;
  if (P.plantBy && P.plantFrame) return P.plantFrame + '_' + (P.facing > 0 ? 'R' : 'L');
  return _frameName0();
};
function plantRealize(f) {                                                          // he's realized what he's standing on
  if (P.plantBy && P.plantBy !== f) return;
  plantPose(f, 'jolt'); popup(P.x, P.y - 44, '!', '#ffffff', true);
}
function plantHeld(f, dt, chew, every) {                                            // while one has him: his heart pounding, it chewing
  f.beat = (f.beat || 0) - dt; if (f.beat <= 0) { f.beat = 0.42; plantSfx.heart(true); }
  f.chewT = (f.chewT || 0) - dt; if (f.chewT <= 0) { f.chewT = every; chew(); f.chews = (f.chews || 0) + 1; if (f.chews % 2 === 1) sfx.squeak(); }   // (his squeaker going off as it chews on him)
}

HEAVY.glintmaw = ['burst'];                                                          // (no wind up at all: that's the point of it)
HEAVY.snapjaw = ['shudder', 'snap'];                                                 // the snap can't be blocked: red !! on the shudder (the dewlash's lash is light: the shield takes it)

Object.assign(FOE, {
  // ---- the snapjaw (a flytrap): two leaves lying open on the floor with a glowing lure bulb between them. Step onto
  // it and it shudders (the tell), then snaps shut. The leaves are sticky, so walking off it is slow: jump or roll. Caught, it holds him and squeezes: mash to get out. Can't be
  // blocked, so jump over it or roll out. Snapping shut on nothing (or getting wriggled out of) leaves it stuck shut
  // and dazed for a moment, and that's the time to hit it
  snapjaw: { plant: true, ownWindup: true, hp: 4, hw: 16, h: 10, acorns: [1, 2], ownSpot: true, noHurt: true, harmless: () => true,
    setup: plantSetup, onDown: plantDown,
    box: f => (f.state === 'open' || f.state === 'walk' || f.state === 'shudder' || f.state === 'spit' ? { l: f.x - 18, r: f.x + 18, t: f.y - 9, b: f.y }
      : f.state === 'down' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 12, r: f.x + 12, t: f.y - 28, b: f.y }),
    update(f, dt) {
      f.vel = 0; f.x = f.x0;
      if (f.state === 'down') return;
      if (f.state === 'walk') setFoeState(f, 'open');
      const dx = P.x - f.x;
      if ((f.state === 'open' || f.state === 'shudder') && Math.abs(dx) < 18 && P.ground && Math.abs(P.y - f.y) < 6) {   // its leaves are sticky: walking off it is slow going (jump or roll out)
        P.slowT = Math.max(P.slowT || 0, 0.25); P.slowBy = 'snapjaw'; tellOnce('snapjawSticky', f, 'sticky. jump or roll out', 68);
      }
      if (f.state === 'open') {
        const on = phillAround() && !(P.story && !P.story.free) && !P.pinned && Math.abs(dx) < 18 && P.y > f.y - 8 && P.y < f.y + 6;
        if (on && f.cd <= 0) { setFoeState(f, 'shudder'); plantSfx.snapjawWind(); f.told = false; }
      } else if (f.state === 'shudder') {
        if (!f.told && f.t > 0.08 && Math.abs(dx) < 22 && P.ground) { f.told = true; plantRealize(f); }   // he looks down: oh no
        if (f.t >= 0.4) { setFoeState(f, 'snap'); f.caught = false; shakeT = 0.06; shakeA = 1; f.missSnd = true; }
      } else if (f.state === 'snap') {
        if (f.t < 0.1 && !f.caught) {
          const out = strike(f, { l: f.x - 18, r: f.x + 18, t: f.y - 30, b: f.y }, 22);
          if (out === 'hit' && P.health > 0) {                                        // got him: he tries to jump clear, and it closes over him
            f.caught = true; pinHim(f, 7); P.pinned.x = P.x; P.pinned.y = P.y; f.gx = P.x; setFoeState(f, 'gulp'); plantPose(f, 'leap');
            plantSfx.snapjawCatch(); plantScare(); f.beat = 0.3; f.chewT = 0.5; f.chews = 0; tellOnce('snapjawHold', f, 'mash to wriggle free', 50); return;
          }
          if (out === 'parried') { plantLetGo(f); setFoeState(f, 'stuck'); f.stagT = 2.2; f.dizzy = true; return; }
        }
        if (f.t >= 0.3) { plantLetGo(f); setFoeState(f, 'stuck'); f.stagT = 1.6; f.dizzy = false; tellOnce('snapjawStuck', f, "it's stuck shut. hit it", 50); }
        if (f.missSnd && f.t >= 0.1) { f.missSnd = false; if (!f.caught && heard(f)) plantSfx.snapjawMiss(); }
      } else if (f.state === 'gulp') {                                                // his jump, cut short: up a little, then dragged down into it
        if (!pinnedBy(f)) { plantLetGo(f); setFoeState(f, 'stuck'); f.stagT = 1.6; f.dizzy = true; return; }
        const k = f.t / 0.24; P.pinned.x = f.gx + (f.x - f.gx) * Math.min(1, k); P.pinned.y = f.y - Math.sin(Math.min(1, k) * Math.PI) * 9;
        if (f.t >= 0.24) { setFoeState(f, 'hold'); plantHide(f); }
      } else if (f.state === 'hold') {                                                // chewing on him, his arm and sword sticking out of the top
        if (!pinnedBy(f)) { plantLetGo(f); P.vy = -260; setFoeState(f, 'stuck'); f.stagT = 1.6; f.dizzy = true; return; }   // he got out: it's left dazed
        P.pinned.x = f.x; P.pinned.y = f.y;
        plantHeld(f, dt, plantSfx.snapjawChew, 0.36);
        if (f.t >= 1.6) {                                                            // and spits him out
          P.pinned = null; plantLetGo(f); hurt(f.x, 'snapjaw', 1); P.vx = (Math.sign(dx) || -f.f) * 180; P.vy = -380; P.facing = -Math.sign(P.vx) || P.facing;
          setFoeState(f, 'spit'); if (typeof sfx.spit === 'function') sfx.spit(); plantSfx.snapjawChew();
        }
      } else if (f.state === 'spit') {
        if (f.t >= 0.45) { setFoeState(f, 'open'); f.cd = 1.6; }
      } else if (f.state === 'stuck') {
        if (f.t >= f.stagT) { setFoeState(f, 'reopen'); if (heard(f)) plantSfx.snapjawWind(); }
      } else if (f.state === 'reopen') {
        if (f.t >= 0.5) { setFoeState(f, 'open'); f.cd = 0.8; }
      } else if (f.state === 'hurt' || f.state === 'stagger') setFoeState(f, 'stuck');
    },
    frame: f => 'snapjaw_' + (f.state === 'down' ? 'down' : f.state === 'shudder' ? 'shudder' : f.state === 'snap' || f.state === 'gulp' ? 'snap'
      : f.state === 'hold' ? 'caught_hold_' + 'abcb'[Math.floor(f.t / 0.18) % 4] : f.state === 'spit' ? 'caught_spit'
      : f.state === 'stuck' ? (f.dizzy ? 'dizzy' : 'stuck') : f.state === 'reopen' ? 'reopen' : (Math.floor(f.t * 1.6) % 2 ? 'open_2' : 'open_1')),
    draw(f) {
      if (f.state === 'gulp') return;                                                  // drawn over him instead (below)
      drawFoe2(f, FOE.snapjaw.frame(f), f.x, f.y + 2, f.state === 'shudder' ? Math.round(Math.sin(f.t * 60)) : f.state === 'hold' ? Math.round(Math.sin(f.t * 24) * 1.5) : 0);
    },
    overPhill(f) { if (f.state === 'gulp') drawFoe2(f, 'snapjaw_snap', f.x, f.y + 2, 0); } },

  // ---- the dewlash (a sundew): a tuft of red hairs with a glowing drop of dew on every tip. When he's on its level and
  // in reach it draws one hair right back (the tell), then whips it out low along the ground at him. A light hit, so the
  // shield takes it; if it lands his feet are stuck in the dew a moment (mash to shake it off). After a lash its hairs
  // droop while it gathers itself, and that's the time to get in and hit it
  dewlash: { plant: true, ownWindup: true, hp: 3, hw: 8, h: 26, acorns: [1, 2], ownSpot: true, noHurt: true, harmless: () => true,
    setup: plantSetup, onDown: plantDown,
    box: f => (f.state === 'down' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 9, r: f.x + 9, t: f.y - (f.state === 'recoil' || f.state === 'stagger' ? 14 : 26), b: f.y }),
    update(f, dt) {
      f.vel = 0; f.x = f.x0;
      if (f.state === 'down') return;
      if (f.state === 'walk' || f.state === 'hurt') setFoeState(f, 'idle');
      const dx = P.x - f.x, adx = Math.abs(dx);
      if (f.state === 'idle') {
        const on = phillAround() && !(P.story && !P.story.free) && adx > 14 && adx < 72 && Math.abs(P.y - f.y) < 20;
        if (on && f.cd <= 0) { f.f = Math.sign(dx) || f.f; setFoeState(f, 'wind'); if (heard(f)) plantSfx.dewlashWind(); }
      } else if (f.state === 'wind') {
        if (f.t >= 0.45) { setFoeState(f, 'lash'); if (heard(f)) plantSfx.dewlashLash(); }
      } else if (f.state === 'lash') {
        if (f.t < 0.15) {
          const reach = 66 * Math.min(1, f.t / 0.08);
          const out = strike(f, { l: Math.min(f.x, f.x + f.f * reach), r: Math.max(f.x, f.x + f.f * reach), t: f.y - 18, b: f.y - 2 }, 14);
          if (out === 'hit') { P.slowT = Math.max(P.slowT || 0, 1.8); P.slowBy = 'dew'; plantSfx.dewlashCatch(); plantScare(0.5); plantPose(f, 'jolt'); f.poseT = 0.35; tellOnce('dewFeet', f, 'dew on his feet. mash to shake it off', 50); }
          if (out === 'parried') { setFoeState(f, 'stagger'); f.stagT = 1.8; return; }
        }
        if (f.t >= 0.35) setFoeState(f, 'recoil');
      } else if (f.state === 'recoil') {
        if (f.poseT > 0 && (f.poseT -= dt) <= 0) plantLetGo(f);
        if (f.t >= 0.9) { setFoeState(f, 'idle'); f.cd = 1.2 + Math.random() * 0.6; }
      } else if (f.state === 'stagger') {
        if (f.t >= (f.stagT || 1.4)) { setFoeState(f, 'idle'); f.cd = 1.0; }
      }
    },
    frame: f => 'dewlash_' + (f.state === 'down' ? 'down' : f.state === 'wind' ? 'wind' : f.state === 'lash' ? 'lash' : f.state === 'recoil' ? 'recoil'
      : f.state === 'stagger' ? 'dizzy' : (Math.floor(f.t * 1.2) % 2 ? 'idle_2' : 'idle_1')),
    draw(f) { drawFoe2(f, FOE.dewlash.frame(f), f.x, f.y + 1, f.state === 'wind' ? Math.round(Math.sin(f.t * 50)) : 0); },
    overPhill(f) {                                                                      // the dew stuck on his feet
      if (P.slowT > 0 && P.slowBy === 'dew' && f === foes.find(o => o.kind === 'dewlash')) {
        const px = Math.round(P.x), py = Math.round(P.y);
        for (const [ox, oy] of [[-7, -2], [-3, -1], [2, -2], [6, -1]]) { ctx.fillStyle = 'rgba(159,242,220,0.85)'; ctx.fillRect(px + ox, py + oy, 2, 2); ctx.fillStyle = '#f0fffa'; ctx.fillRect(px + ox, py + oy, 1, 1); }
      }
    } },

  // ---- the gluecap (a butterwort): a rosette of pale greasy leaves hanging under a root, glistening with glue. When
  // he goes under it a glob swells out of the middle (the tell) and drops. It sticks him where he stands a moment
  // (mash to pull free), or misses and leaves a sticky splat on the ground for a few seconds. The shield held up over
  // his head takes it, a parry knocks it off and leaves the plant reeling. Then it takes a while to grow another glob
  gluecap: { plant: true, ownWindup: true, hp: 3, hw: 12, h: 0, acorns: [1, 2], free: true, ownSpot: true, noHurt: true, harmless: () => true,
    setup: plantSetup, onDown: plantDown,
    box: f => (f.state === 'down' ? { l: -999, r: -998, t: -999, b: -998 } : { l: f.x - 13, r: f.x + 13, t: f.y, b: f.y + 14 }),
    update(f, dt) {
      f.vel = 0; f.x = f.x0; f.y = f.y0;
      if (f.splat) { f.splat.t -= dt; if (f.splat.t <= 0) f.splat = null; else if (P.ground && Math.abs(P.x - f.splat.x) < 14 && Math.abs(P.y - f.splat.y) < 4) { P.slowT = Math.max(P.slowT || 0, 0.3); P.slowBy = 'glue'; } }
      if (f.glob) {                                                                     // the glob falling
        const g = f.glob; g.vy = Math.min(g.vy + 900 * dt, 420); g.y += g.vy * dt;
        const me = { l: P.x - 8, r: P.x + 8, t: P.y - P.h, b: P.y };
        if (phillAround() && g.x + 5 > me.l && g.x - 5 < me.r && g.y + 5 > me.t && g.y - 5 < me.b) {
          f.glob = null;
          const out = foeStrike(g.x, 'gluecap', { cost: 14, y: g.y });
          if (out === 'hit' && P.health > 0) { pinHim(f, 4); P.pinned.x = P.x; P.pinned.y = P.y; f.glueT = 0; plantSfx.gluecapCatch(); plantScare(0.8); f.beat = 0.3; f.chewT = 9; plantPose(f, 'squeeze'); tellOnce('glueStuck', f, 'stuck in glue. mash to pull free', -P.y + f.y + 40); }
          if (out === 'parried') { setFoeState(f, 'stagger'); f.stagT = 1.8; }
          if (out !== 'hit') puff(g.x, g.y, 5, 40, '#e0e0b0');
        } else if (solidPx(g.x, g.y + 5) || g.y > room.pxH) {
          const gy = groundY(g.x, g.y - 8, 16, 8);
          f.glob = null; if (gy !== null) { f.splat = { x: g.x, y: gy, t: 3 }; if (heard(f)) plantSfx.gluecapDrop(); }
        }
      }
      if (pinnedBy(f)) { f.glueT = (f.glueT || 0) + dt; plantHeld(f, dt, () => {}, 9); if (f.glueT >= 1.6) { P.pinned = null; P.inv = Math.max(P.inv, 0.4); } }
      else if (P.plantBy === f) plantLetGo(f);
      if (f.state === 'down') return;
      if (f.state === 'walk' || f.state === 'hurt') setFoeState(f, 'hang');
      const dx = P.x - f.x;
      if (f.state === 'hang') {
        const under = phillAround() && !(P.story && !P.story.free) && !P.pinned && Math.abs(dx) < 18 && P.y > f.y + 20 && P.y - f.y < 230 && sightLine(f.x, f.y + 16, f.x, P.y - 30);
        if (under && f.cd <= 0) { setFoeState(f, 'swell'); plantSfx.gluecapWind(); }
      } else if (f.state === 'swell') {
        if (f.t >= 0.5) { setFoeState(f, 'drop'); f.glob = { x: f.x, y: f.y + 16, vy: 40 }; plantSfx.gluecapDrop(); }
      } else if (f.state === 'drop') {
        if (f.t >= 0.4) setFoeState(f, 'regrow');
      } else if (f.state === 'regrow') {
        if (f.t >= 2.2) { setFoeState(f, 'hang'); f.cd = 0.5; }
      } else if (f.state === 'stagger') {
        if (f.t >= (f.stagT || 1.4)) { setFoeState(f, 'regrow'); }
      }
    },
    frame: f => 'gluecap_' + (f.state === 'down' ? 'down' : f.state === 'swell' ? 'swell' : f.state === 'drop' ? 'drop' : f.state === 'regrow' ? 'regrow'
      : f.state === 'stagger' ? 'dizzy' : (Math.floor(f.t * 1.4) % 2 ? 'hang_2' : 'hang_1')),
    draw(f) {
      if (f.splat) { ctx.globalAlpha = Math.min(1, f.splat.t * 2); spr('glue_splat', f.splat.x, f.splat.y + 1, false); ctx.globalAlpha = 1; }
      drawFoe2(f, FOE.gluecap.frame(f), f.x, f.y, f.state === 'swell' ? Math.round(Math.sin(f.t * 40)) : 0);
      if (f.glob) spr('glue_glob', f.glob.x, f.glob.y, false);
    },
    overPhill(f) {                                                                      // glue all over him while he's stuck
      if (pinnedBy(f)) spr('glue_wrap_' + (Math.floor(f.glueT * 6) % 2 + 1), Math.round(P.x) + Math.round(Math.sin(f.glueT * 30) * (f.glueT < 0.3 ? 1.5 : 0.5)), Math.round(P.y) + 1, P.facing > 0);   // glue all over him, wobbling as he struggles
    } },

  // ---- the glintmaw: an angler of a plant. It lies buried with only its lure showing, a shiny gold star on a little
  // mound, just where you'd hope to find treasure. Go up to it (or swing at the star) and it bursts up out of the
  // ground and has him before he can do a thing (a quick, unfair grab, to punish being curious). Mash out
  // and it's left dazed: hit it then. Its only tells: the star sways, and its glint breathes slowly where a real
  // pickup twinkles
  glintmaw: { plant: true, ownWindup: true, hp: 4, hw: 10, h: 8, acorns: [2, 3], ownSpot: true, noHurt: true, harmless: () => true,
    setup: plantSetup, onDown: plantDown,
    box: f => (f.state === 'down' ? { l: -999, r: -998, t: -999, b: -998 } : f.state === 'lure' || f.state === 'walk' ? { l: f.x - 5, r: f.x + 5, t: f.y - 13, b: f.y - 3 }
      : { l: f.x - 16, r: f.x + 16, t: f.y - (f.state === 'sink' ? 26 : 54), b: f.y }),
    update(f, dt) {
      f.vel = 0; f.x = f.x0;
      if (f.state === 'down') return;
      if (f.state === 'walk') setFoeState(f, 'lure');
      if (f.state === 'hurt') setFoeState(f, 'dazed');
      const dx = P.x - f.x;
      if (f.state === 'lure') {
        f.chime = (f.chime || 1) - dt; if (f.chime <= 0) { f.chime = 2.4 + Math.random() * 0.8; if (Math.abs(dx) < 140 && Math.abs(P.y - f.y) < 60 && phillAround()) plantSfx.glintmawLure(); }
        const near_ = phillAround() && !(P.story && !P.story.free) && !P.pinned && Math.abs(dx) < 26 && Math.abs(P.y - f.y) < 30;
        if ((near_ || f.flash > 0) && f.cd <= 0) { f.f = Math.sign(dx) || f.f; setFoeState(f, 'burst'); f.caught = false; plantSfx.glintmawBurst(); shakeT = 0.2; shakeA = 3; puff(f.x, f.y, 10, 70, '#543a26'); }
      } else if (f.state === 'burst') {
        if (f.t < 0.14 && !f.caught) {
          const out = strike(f, { l: f.x - 20, r: f.x + 20, t: f.y - 52, b: f.y }, 22);
          if (out === 'hit' && P.health > 0) {                                        // got him: snatched up head first
            f.caught = true; pinHim(f, 6); P.pinned.x = P.x; P.pinned.y = P.y; f.gx = P.x; setFoeState(f, 'gulp'); plantPose(f, 'jolt');
            plantSfx.glintmawBite(); plantScare(1.2); f.beat = 0.25; f.chewT = 0.5; f.chews = 0; tellOnce('glintmawHold', f, 'that was no treasure. mash to wriggle free', 74); return;
          }
          if (out === 'parried') { setFoeState(f, 'dazed'); f.stagT = 2.2; return; }
        }
        if (f.t >= 0.6) setFoeState(f, 'sink');
      } else if (f.state === 'gulp') {                                                 // yanked up into its mouth
        if (!pinnedBy(f)) { plantLetGo(f); setFoeState(f, 'dazed'); f.stagT = 1.8; return; }
        const k = Math.min(1, f.t / 0.16); P.pinned.x = f.gx + (f.x + f.f * 9 - f.gx) * k; P.pinned.y = f.y - 26 * k;
        if (f.t >= 0.16) { setFoeState(f, 'hold'); plantHide(f); }
      } else if (f.state === 'hold') {                                                 // got him: chewing, his legs kicking out of its mouth
        if (!pinnedBy(f)) { plantLetGo(f); P.vy = -220; setFoeState(f, 'dazed'); f.stagT = 1.8; return; }
        P.pinned.x = f.x + f.f * 9; P.pinned.y = f.y - 26;
        plantHeld(f, dt, plantSfx.glintmawChew, 0.42);
        if (f.t >= 1.5) {                                                             // and spits him out
          P.pinned = null; plantLetGo(f); hurt(f.x, 'glintmaw', 1); P.vx = (Math.sign(dx) || f.f) * 220; P.vy = -360; P.facing = -Math.sign(P.vx) || P.facing;
          setFoeState(f, 'spit'); plantSfx.glintmawChew();
        }
      } else if (f.state === 'spit') {
        if (f.t >= 0.45) setFoeState(f, 'sink');
      } else if (f.state === 'dazed') {
        if (f.t >= (f.stagT || 1.6)) setFoeState(f, 'sink');
      } else if (f.state === 'sink') {
        if (f.t >= 0.6) { setFoeState(f, 'lure'); f.cd = 2.5; }
      }
    },
    frame: f => 'glintmaw_' + (f.state === 'down' ? 'down' : f.state === 'burst' || f.state === 'gulp' ? 'burst' : f.state === 'hold' ? 'caught_hold_' + 'abcb'[Math.floor(f.t / 0.11) % 4] : f.state === 'spit' ? 'caught_spit' : f.state === 'dazed' ? 'dazed'
      : f.state === 'sink' ? 'sink' : (Math.floor(f.t * 0.9) % 2 ? 'lure_2' : 'lure_1')),
    draw(f) {
      if (f.state === 'gulp') return;                                                  // drawn over him (below): he's being yanked up into its jaws
      if (f.state === 'lure' || f.state === 'walk') {                                  // the glint: a slow breath of light, not a twinkle
        const k = 0.5 + 0.5 * Math.sin(f.t * 1.6), x = Math.round(f.x), y = Math.round(f.y - 8);
        ctx.fillStyle = `rgba(255,220,120,${(0.08 + 0.1 * k).toFixed(2)})`; ctx.fillRect(x - 6, y - 4, 13, 9); ctx.fillRect(x - 4, y - 6, 9, 13);
      }
      drawFoe2(f, FOE.glintmaw.frame(f), f.x, f.y + 1, f.state === 'dazed' ? Math.round(Math.sin(f.t * 8)) : f.state === 'hold' ? Math.round(Math.sin(f.t * 20) * 1.5) : 0);
    },
    overPhill(f) {
      if (f.state === 'gulp') drawFoe2(f, 'glintmaw_burst', f.x, f.y + 1, 0);
    } },
});

// the traps that close over him are drawn after him, so he's inside them
const _drawOnPhill0 = drawOnPhill;
drawOnPhill = function (px, py) {
  _drawOnPhill0(px, py);
  for (const f of foes) if (FOE[f.kind].overPhill) FOE[f.kind].overPhill(f);
  plantScareT = Math.max(0, plantScareT - 1 / 60);
  drawPlantScare();
};
