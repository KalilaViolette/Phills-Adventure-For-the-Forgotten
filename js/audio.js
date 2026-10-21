'use strict';
// ---------- sound (tiny synth, starts after the first click) ----------
let actx = null, muted = false;
// the volumes, music and effects apart (the title menu's Options, 10/17/2026). 0 to 1, kept between visits
const VOL = { music: 1, sfx: 1 };
try { for (const k of ['music', 'sfx']) { const v = parseFloat(localStorage.getItem('phill-forgotten-vol-' + k)); if (v >= 0 && v <= 1) VOL[k] = v; } } catch (e) {}
let sfxBus = null;
function sfxOut() {                                 // every sound effect goes through this, so the effects volume turns them all
  if (!sfxBus || sfxBus.context !== actx) { sfxBus = actx.createGain(); sfxBus.gain.value = VOL.sfx; sfxBus.connect(actx.destination); }
  return sfxBus;
}
function setVolume(k, v) {
  VOL[k] = Math.max(0, Math.min(1, Math.round(v * 10) / 10));
  try { localStorage.setItem('phill-forgotten-vol-' + k, String(VOL[k])); } catch (e) {}
  if (k === 'sfx' && sfxBus) sfxBus.gain.setTargetAtTime(VOL.sfx, actx.currentTime, 0.03);
  if (k === 'music') music.mute(muted);
}
function audio() {
  if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; } }
  if (actx && actx.state === 'suspended') actx.resume().catch(() => {});
}
function tone(f0, f1, dur, type = 'square', vol = 0.06) {
  if (!actx || muted || actx.state !== 'running') return;
  const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(sfxOut()); o.start(t); o.stop(t + dur + 0.02);
}
let noiseBuf = null;
function noiseBuffer() {
  if (!noiseBuf) { noiseBuf = actx.createBuffer(1, actx.sampleRate * 0.5, actx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
  return noiseBuf;
}
function noise(dur, f0, f1, vol = 0.08, q = 1.2) {
  if (!actx || muted || actx.state !== 'running') return;
  noiseBuffer();
  const t = actx.currentTime, s = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
  s.buffer = noiseBuf; f.type = 'bandpass'; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(sfxOut()); s.start(t); s.stop(t + dur + 0.02);
}
const sfx = {
  jump: () => tone(260, 520, 0.09, 'square', 0.035),
  land: () => noise(0.07, 500, 200, 0.07),
  bigswing: () => { noise(0.22, 2600, 380, 0.13, 0.6); tone(180, 90, 0.12, 'triangle', 0.06); },
  swing: () => noise(0.16, 2200, 500, 0.1, 0.7),
  hit: () => { tone(160, 60, 0.12, 'triangle', 0.14); noise(0.06, 900, 300, 0.1); },
  grab: () => { noise(0.06, 900, 400, 0.08); tone(220, 160, 0.06, 'triangle', 0.06); },
  teeter: () => tone(520, 380, 0.09, 'triangle', 0.05),
  parry: () => { tone(1800, 1200, 0.18, 'triangle', 0.12); tone(2700, 2200, 0.12, 'square', 0.03); noise(0.08, 5000, 2500, 0.06); },
  windup: () => tone(300, 420, 0.25, 'triangle', 0.04),
  thwack: () => { noise(0.12, 1500, 300, 0.1, 0.7); },
  chitter: (k = 1) => { const f = 1500 + Math.random() * 700 * k; tone(f, f * 1.3, 0.035, 'square', 0.018); },   // the squirrel talking
  spit: () => { noise(0.12, 900, 300, 0.09, 1.5); tone(300, 140, 0.1, 'triangle', 0.05); },
  splort: () => { noise(0.1, 500, 160, 0.08, 2); },
  acorn: () => { tone(1250, 1500, 0.05, 'triangle', 0.04); setTimeout(() => tone(1700, 1900, 0.06, 'triangle', 0.03), 40); },
  crumble: () => { noise(0.18, 700, 180, 0.12, 0.8); tone(110, 60, 0.12, 'triangle', 0.08); },
  stitch: () => { tone(900, 1300, 0.07, 'sine', 0.05); setTimeout(() => tone(1300, 1800, 0.08, 'sine', 0.045), 70); },
  yawn: () => { tone(420, 300, 0.4, 'sine', 0.03); },
  paper: () => { noise(0.14, 3200, 1400, 0.05, 0.9); },
  tick: () => tone(1800, 1700, 0.025, 'square', 0.02),
  click: () => { tone(240 + Math.random() * 60, 200, 0.03, 'square', 0.03); noise(0.02, 1800, 900, 0.03, 2); },   // the beetle talking: low clicks
  tok: () => { noise(0.03, 2200, 1400, 0.12, 3); tone(700, 500, 0.03, 'square', 0.03); },
  memory: () => { [0, 4, 7, 12].forEach((s2, i) => setTimeout(() => tone(523 * Math.pow(2, s2 / 12), 523 * Math.pow(2, s2 / 12), 0.9, 'sine', 0.04), i * 160)); },
  glint: () => { tone(3200, 4200, 0.12, 'sine', 0.035); },
  clank: () => { tone(780, 700, 0.18, 'square', 0.05); tone(1170, 1100, 0.14, 'triangle', 0.04); noise(0.06, 4000, 2500, 0.07, 2); },
  ticking: () => { for (let i = 0; i < 8; i++) setTimeout(() => tone(2400, 2300, 0.02, 'square', 0.025), i * 70); },
  thorns: () => { noise(0.35, 1800, 400, 0.1, 0.7); tone(160, 90, 0.3, 'sawtooth', 0.03); },
  ding: () => {    // sword tip on the metal tacks: a bright little shing
    tone(2350, 2250, 0.38, 'triangle', 0.07); tone(3520, 3400, 0.28, 'sine', 0.035); tone(4700, 4600, 0.16, 'sine', 0.018);
    noise(0.04, 7000, 4000, 0.05, 1.5);
  },
  clack: () => {    // wooden sword let loose: a big satisfying clack
    noise(0.05, 3200, 1800, 0.22, 2.5); tone(820, 520, 0.07, 'square', 0.09); tone(190, 80, 0.16, 'triangle', 0.16);
  },
  chargeStart: () => tone(220, 330, 0.18, 'triangle', 0.035),
  charged: () => { tone(1320, 1320, 0.12, 'triangle', 0.07); tone(1980, 1980, 0.18, 'sine', 0.04); },
  splat: () => { tone(160, 60, 0.18, 'triangle', 0.14); noise(0.16, 700, 150, 0.1, 0.8); },
  squeak: () => {   // his squeaker going off inside him
    if (!actx || muted || actx.state !== 'running') return;
    const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain(), f = actx.createBiquadFilter();
    const lfo = actx.createOscillator(), depth = actx.createGain();
    o.type = 'square'; f.type = 'lowpass'; f.frequency.value = 3200;
    o.frequency.setValueAtTime(1050, t); o.frequency.exponentialRampToValueAtTime(1850, t + 0.06); o.frequency.exponentialRampToValueAtTime(1250, t + 0.24);
    lfo.frequency.value = 34; depth.gain.value = 70; lfo.connect(depth).connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
    o.connect(f).connect(g).connect(sfxOut()); o.start(t); lfo.start(t); o.stop(t + 0.28); lfo.stop(t + 0.28);
  },
  ko: () => { tone(420, 110, 0.6, 'triangle', 0.08); noise(0.2, 900, 200, 0.07); },
  guardbreak: () => { noise(0.18, 1400, 200, 0.16, 0.8); tone(340, 90, 0.3, 'square', 0.06); },
  heavyWindup: () => { tone(180, 260, 0.45, 'sawtooth', 0.04); tone(360, 520, 0.45, 'triangle', 0.03); },
  slam: () => { tone(110, 45, 0.25, 'triangle', 0.18); noise(0.18, 600, 120, 0.12, 0.7); },
  lock: () => tone(660, 990, 0.06, 'square', 0.035),
  // a hit landing, by what it's made of (10/17/2026: every hit was the same thump)
  hitTin: () => { tone(1900, 1500, 0.07, 'square', 0.03); tone(2900, 2600, 0.05, 'triangle', 0.025); noise(0.04, 6000, 3500, 0.04, 2); },
  hitGlass: () => { tone(2600, 2400, 0.12, 'sine', 0.035); tone(3900, 3700, 0.08, 'sine', 0.02); },
  hitPaper: () => { noise(0.07, 3800, 1800, 0.07, 0.8); noise(0.05, 2400, 1200, 0.05, 1.2); },
  hitSquish: () => { tone(240, 110, 0.12, 'sine', 0.08); noise(0.09, 900, 300, 0.07, 0.8); },
  hitCloth: () => { noise(0.08, 1400, 600, 0.08, 0.7); tone(180, 120, 0.06, 'triangle', 0.04); },
  hitPlastic: () => { tone(520, 300, 0.05, 'square', 0.03); noise(0.04, 2600, 1400, 0.06, 1.5); },
  hitBraced: () => { tone(110, 80, 0.1, 'square', 0.04); noise(0.05, 500, 300, 0.05, 1); },   // it took it and kept coming
  tink: () => { tone(1500, 900, 0.06, 'square', 0.04); noise(0.05, 4000, 2000, 0.05); },
  roar: () => {    // big, low and rumbly
    if (!actx || muted || actx.state !== 'running') return;
    const t = actx.currentTime, o = actx.createOscillator(), o2 = actx.createOscillator(), lfo = actx.createOscillator(), ld = actx.createGain(), f = actx.createBiquadFilter(), g = actx.createGain();
    o.type = 'sawtooth'; o2.type = 'square'; o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(60, t + 1.3); o2.frequency.setValueAtTime(56, t); o2.frequency.exponentialRampToValueAtTime(38, t + 1.3);
    lfo.frequency.value = 23; ld.gain.value = 18; lfo.connect(ld).connect(o.frequency);
    f.type = 'lowpass'; f.frequency.value = 900; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.12); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    o.connect(f); o2.connect(f); f.connect(g).connect(sfxOut()); for (const x of [o, o2, lfo]) { x.start(t); x.stop(t + 1.5); }
    noise(1.2, 900, 200, 0.12, 0.6);
  },
  stomp: () => { tone(70, 40, 0.18, 'triangle', 0.16); noise(0.08, 400, 120, 0.08); },
  windupBig: () => { tone(120, 180, 0.4, 'sawtooth', 0.035); },
  flap: () => noise(0.16, 500, 180, 0.09, 0.6),
  inhale: () => noise(0.85, 300, 2200, 0.05, 0.8),
  breath: (dur) => { noise(Math.min(0.5, dur), 1200, 700, 0.1, 0.5); setTimeout(() => noise(dur, 900, 500, 0.09, 0.4), 120); tone(90, 70, dur, 'sawtooth', 0.025); },
  fireball: () => { noise(0.25, 1500, 500, 0.08, 0.6); tone(260, 120, 0.2, 'triangle', 0.04); },
  fireHit: () => { noise(0.22, 900, 200, 0.1, 0.7); tone(120, 60, 0.15, 'triangle', 0.08); },
  sizzle: () => noise(0.3, 6000, 3000, 0.04, 1.2),
  ignite: () => { noise(0.3, 2500, 600, 0.09, 0.6); tone(600, 300, 0.12, 'square', 0.03); },
  dragonHit: () => { tone(110, 55, 0.18, 'triangle', 0.16); noise(0.08, 700, 250, 0.1); },
  tired: () => { noise(0.12, 900, 400, 0.05, 0.8); tone(240, 180, 0.08, 'triangle', 0.03); },
  draw: () => tone(380, 620, 0.4, 'triangle', 0.025),                                   // bowstring creaking back
  twang: () => { tone(260, 120, 0.14, 'square', 0.05); noise(0.06, 2500, 900, 0.05, 1.5); },
  hop: () => noise(0.08, 900, 1800, 0.05, 0.8),
  charge: () => { tone(500, 1000, 0.5, 'sine', 0.03); tone(750, 1500, 0.5, 'sine', 0.015); },
  magic: () => { tone(990, 1980, 0.18, 'sine', 0.05); tone(1480, 2960, 0.14, 'triangle', 0.02); },
  chime: () => { tone(1320, 1320, 0.3, 'sine', 0.04); tone(1760, 1760, 0.4, 'sine', 0.03); tone(2640, 2640, 0.25, 'sine', 0.015); },
  pop: () => { tone(900, 260, 0.08, 'square', 0.04); noise(0.05, 5000, 3000, 0.05, 1.5); },
  poof: () => { noise(0.22, 3200, 700, 0.08, 0.7); tone(600, 1300, 0.12, 'sine', 0.03); },
  rune: () => tone(150, 230, 0.8, 'sine', 0.06),
  zap: () => { noise(0.28, 4200, 700, 0.11, 0.8); tone(300, 1300, 0.22, 'sawtooth', 0.03); },
  bwong: () => { tone(420, 300, 0.22, 'sine', 0.09); tone(840, 620, 0.16, 'sine', 0.03); },
  stab: () => { noise(0.06, 3200, 1300, 0.08, 1.4); tone(720, 500, 0.05, 'square', 0.03); },
  swish: () => noise(0.12, 2600, 700, 0.08, 0.7),
  whoosh: () => noise(0.2, 1600, 450, 0.08, 0.6),
  throwIt: () => noise(0.1, 3000, 1300, 0.06, 1.0),
  block: () => { tone(980, 700, 0.05, 'triangle', 0.1); noise(0.05, 3000, 1500, 0.05); },
  splash: (v = 1) => noise(0.18, 2500, 500, 0.06 * v, 0.7),
  pickup: () => { tone(880, 1320, 0.09, 'triangle', 0.05); setTimeout(() => tone(1320, 1760, 0.14, 'triangle', 0.045), 80); },
  idea: () => { tone(1046, 1046, 0.1, 'sine', 0.05); setTimeout(() => tone(1568, 1568, 0.22, 'sine', 0.05), 110); },
  nope: () => { tone(330, 260, 0.1, 'triangle', 0.05); setTimeout(() => tone(330, 250, 0.12, 'triangle', 0.05), 150); },
  open: () => { noise(0.12, 800, 300, 0.06); tone(300, 600, 0.15, 'triangle', 0.04); },
  bump: () => { tone(200, 120, 0.06, 'triangle', 0.06); },
  // a soft plush snore: just a quiet hush of air through the stuffing on the way in, and a tiny soft squeak from his
  // squeaker on the way out. No low end and nothing that sweeps (the first one sounded like a car revving)
  snore: (out) => {
    if (!actx || muted || actx.state !== 'running') return;
    const t = actx.currentTime, d = out ? 0.7 : 0.9;
    const s = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
    s.buffer = noiseBuffer(); s.loop = true; f.type = 'bandpass'; f.Q.value = 0.8; f.frequency.value = out ? 1300 : 1600;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(out ? 0.001 : 0.0015, t + d * 0.45); g.gain.linearRampToValueAtTime(0.0001, t + d);   // the breath: barely there (turned down twice)
    s.connect(f).connect(g).connect(sfxOut()); s.start(t); s.stop(t + d + 0.02);
    if (out) {                                                       // the little squeak, soft as it gets
      const w = actx.createOscillator(), wg = actx.createGain(), lfo = actx.createOscillator(), dep = actx.createGain();
      const pf = 1140 + Math.random() * 80;                         // never quite the same twice
      w.type = 'sine'; w.frequency.setValueAtTime(pf, t + 0.15); w.frequency.linearRampToValueAtTime(pf - 100, t + 0.5);
      lfo.frequency.value = 9; dep.gain.value = 18; lfo.connect(dep).connect(w.frequency);
      wg.gain.setValueAtTime(0.0001, t); wg.gain.setValueAtTime(0.0001, t + 0.15); wg.gain.linearRampToValueAtTime(0.0045, t + 0.25); wg.gain.linearRampToValueAtTime(0.0001, t + 0.5);
      w.connect(wg).connect(sfxOut()); w.start(t); w.stop(t + 0.55); lfo.start(t); lfo.stop(t + 0.55);
    }
  },
  step: (floor) => {   // a soft little footstep, different on each kind of ground
    if (floor === 'grass') noise(0.05, 2600, 1400, 0.018, 0.8);
    else if (floor === 'leaves') noise(0.07, 3200, 1600, 0.026, 0.6);
    else if (floor === 'bark') { noise(0.03, 900, 500, 0.022, 1.2); tone(180, 150, 0.03, 'triangle', 0.012); }
    else { tone(220 + Math.random() * 40, 160, 0.03, 'triangle', 0.016); noise(0.025, 1400, 900, 0.012, 1.4); }
  },
  chirp: () => { tone(700, 1250, 0.09, 'triangle', 0.045); tone(1250, 1050, 0.06, 'triangle', 0.03); },   // the crow, curious or talking
  hoot: () => { tone(420, 380, 0.22, 'sine', 0.07); tone(400, 360, 0.18, 'triangle', 0.03); },             // the owl
  caw: (v = 1) => {   // a crow's harsh caw: a rough nasal note bending down, with breathy noise on top
    if (!actx || muted || actx.state !== 'running') return;
    const t = actx.currentTime;
    for (const [d, f0] of [[0, 1], [0.32, 0.94]]) {
      const o = actx.createOscillator(), o2 = actx.createOscillator(), f = actx.createBiquadFilter(), f2 = actx.createBiquadFilter(), g = actx.createGain();
      o.type = 'sawtooth'; o2.type = 'square';
      o.frequency.setValueAtTime(520 * f0, t + d); o.frequency.linearRampToValueAtTime(610 * f0, t + d + 0.05); o.frequency.exponentialRampToValueAtTime(380 * f0, t + d + 0.24);
      o2.frequency.setValueAtTime(262 * f0, t + d); o2.frequency.exponentialRampToValueAtTime(190 * f0, t + d + 0.24);
      f.type = 'bandpass'; f.frequency.value = 1350; f.Q.value = 2.5; f2.type = 'bandpass'; f2.frequency.value = 2600; f2.Q.value = 3;
      g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.16 * v, t + d + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.27);
      o.connect(f); o2.connect(f); o.connect(f2); f.connect(g); f2.connect(g); g.connect(sfxOut());
      o.start(t + d); o2.start(t + d); o.stop(t + d + 0.3); o2.stop(t + d + 0.3);
      setTimeout(() => noise(0.22, 2400, 1100, 0.07 * v, 1.2), d * 1000);
    }
  },
  snap: () => { noise(0.05, 3800, 2200, 0.2, 2.5); tone(900, 300, 0.06, 'square', 0.06); setTimeout(() => noise(0.25, 1500, 400, 0.08, 0.7), 60); },
  rustle: (v = 1) => noise(0.35, 3200, 1400, 0.05 * v, 0.5),
  sting: () => { tone(196, 185, 0.9, 'sawtooth', 0.035); tone(277, 262, 0.9, 'sawtooth', 0.03); tone(98, 92, 1.0, 'triangle', 0.08); },
  thud: () => { tone(90, 40, 0.3, 'triangle', 0.18); noise(0.3, 600, 150, 0.12, 0.7); },
  roll: () => noise(0.16, 700, 1400, 0.05, 0.6),
  airdodge: () => { noise(0.12, 3000, 900, 0.07, 0.7); tone(700, 300, 0.08, 'triangle', 0.04); },
  thunk: () => { tone(140, 70, 0.08, 'triangle', 0.1); noise(0.05, 600, 250, 0.06); },
  hurt: () => { tone(500, 140, 0.22, 'square', 0.05); noise(0.12, 1200, 400, 0.06); },
  pogo: () => { tone(300, 700, 0.1, 'square', 0.04); noise(0.05, 2400, 1200, 0.05); },
  // the Pond
  pebble: () => { tone(1900, 1600, 0.04, 'sine', 0.04); setTimeout(() => tone(2600, 2300, 0.04, 'sine', 0.03), 35); noise(0.03, 5000, 3000, 0.03, 2); },   // two little stones clicking
  bloop: () => { tone(320, 760, 0.12, 'sine', 0.06); },
  plop: () => { tone(900, 300, 0.08, 'sine', 0.05); noise(0.08, 2400, 900, 0.04, 1); },
  squeakBig: () => {   // squeezing his squeaker as hard as he can: loud, and a wobble that rings out
    sfx.squeak(); setTimeout(() => sfx.squeak(), 60);
    tone(1400, 900, 0.35, 'square', 0.035); tone(2100, 1500, 0.3, 'triangle', 0.03);
  },
  honk: () => { tone(330, 290, 0.35, 'sawtooth', 0.07); tone(660, 560, 0.3, 'square', 0.03); noise(0.25, 900, 500, 0.06, 1.4); },
  hiss: () => noise(0.5, 5200, 2600, 0.06, 0.8),              // air leaking out
  creak: () => { tone(160, 120, 0.4, 'sawtooth', 0.025); noise(0.3, 600, 300, 0.04, 2); },
  reel: () => { for (let i = 0; i < 10; i++) setTimeout(() => tone(2600, 2500, 0.015, 'square', 0.018), i * 35); },
  whip: () => { noise(0.1, 4500, 1200, 0.09, 0.7); tone(900, 2400, 0.06, 'sine', 0.02); },
  boom: () => { tone(90, 40, 0.35, 'triangle', 0.16); noise(0.3, 900, 150, 0.12, 0.6); },
  snailHum: () => { tone(220, 200, 0.45, 'sine', 0.04); tone(330, 300, 0.4, 'sine', 0.015); },   // the snail's long low mm
  owlTalk: () => { const f = 340 + Math.random() * 40; tone(f, f * 0.92, 0.08, 'sine', 0.04); },   // the owl talking: soft low hoo-ish notes
  crowTalk: () => { const f = 480 + Math.random() * 80; tone(f, f * 0.82, 0.05, 'sawtooth', 0.016); noise(0.04, 1600, 800, 0.02, 1.5); },   // the crow talking: short and rough
  snailTalk: () => { const f = 300 + Math.random() * 60; tone(f, f * 0.9, 0.09, 'sine', 0.03); },   // the snail: slow, low and soft
  bearTalk: () => { const f = 190 + Math.random() * 40; tone(f, f * 0.94, 0.1, 'triangle', 0.035); },   // the bear: low and woody, like his tune's lead
  frogTalk: () => { const f = 110 + Math.random() * 30; tone(f, f * 0.8, 0.07, 'sawtooth', 0.03); noise(0.05, 400, 200, 0.03, 2); },
  croak: () => { tone(120, 85, 0.35, 'sawtooth', 0.06); tone(60, 45, 0.35, 'square', 0.04); },
  buzz: () => { tone(220, 240, 0.25, 'sawtooth', 0.012); },
  // the Playground
  marble: () => { tone(2400, 2200, 0.05, 'sine', 0.04); setTimeout(() => tone(3000, 2900, 0.06, 'sine', 0.03), 45); },   // glass on glass
  whirl: () => { noise(0.35, 900, 2600, 0.06, 0.8); tone(300, 600, 0.3, 'triangle', 0.02); },
  clunk: () => { tone(140, 90, 0.12, 'square', 0.06); noise(0.08, 900, 400, 0.08, 1.4); },
  chomp: () => { for (let i = 0; i < 4; i++) setTimeout(() => { tone(900, 700, 0.03, 'square', 0.025); noise(0.02, 3000, 2000, 0.03, 2); }, i * 55); },
  boing: () => { tone(180, 520, 0.2, 'sine', 0.06); tone(360, 1040, 0.15, 'triangle', 0.02); },
  inflate: () => noise(0.5, 600, 2400, 0.05, 1.0),
  screech: () => { tone(1400, 1700, 0.45, 'sawtooth', 0.025); noise(0.4, 3000, 3600, 0.04, 2); },
  clang: () => { tone(1800, 1750, 0.5, 'triangle', 0.04); tone(2650, 2600, 0.4, 'sine', 0.025); noise(0.15, 6000, 4000, 0.04, 2); },
  monkeyTalk: () => { const f = 700 + Math.random() * 200; tone(f, f * 1.1, 0.04, 'triangle', 0.025); },
  whee: () => { tone(520, 980, 0.55, 'triangle', 0.035); tone(1040, 1900, 0.5, 'sine', 0.012); },   // going down the slide
  laugh: () => { for (let i = 0; i < 4; i++) setTimeout(() => tone(600 - i * 40, 500 - i * 40, 0.08, 'sawtooth', 0.03), i * 110); },
};

// ---------- music ----------
// room: 16 bars in F, played A (vibes on the tune), B (piano takes the tune, vibes answer), A again, then C (marimba noodling)
const music = (() => {
  let on = true, master = null, wet = null, timer = null, step = 0, nextT = 0, pass = 0, song = 'home', want = 'home', stingT = 0;
  // each song plays into its own bus (and its own send to the reverb), so changing songs can fade the old one out on its
  // own, notes it already had lined up included, while the new one comes in at full (10/17/2026)
  let bus = null, verb = null, atBar = false;                  // atBar: a change waiting for the old song's next bar
  const level = () => (on && !muted) ? 0.5 * VOL.music : 0;
  try { on = localStorage.getItem('phill-forgotten-music') !== 'off'; } catch (e) {}
  let BEAT = 60 / 108, SWING = 0.63;
  const N = s => { const m = s.match(/^([A-G])(b|#)?(\d)$/); return 12 * (+m[3] + 1) + { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === 'b' ? -1 : m[2] === '#' ? 1 : 0); };
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  // chords: root (for the bass) and the voicing the piano plays
  const CH = {
    Fmaj7: ['F2', 'A3 C4 E4 G4'], Dm7: ['D2', 'F3 A3 C4 E4'], Gm7: ['G2', 'F3 A3 Bb3 D4'], C7: ['C2', 'E3 Bb3 D4 G4'],
    Am7: ['A2', 'G3 C4 E4 G4'], D7: ['D2', 'F#3 C4 E4 A4'], Bbmaj7: ['Bb1', 'A3 D4 F4 C5'], Bbm6: ['Bb1', 'G3 Db4 F4 Bb4'],
    D7b9: ['D2', 'F#3 C4 Eb4 A4'], C9: ['C2', 'E3 Bb3 D4 G4'], Gm7C7: ['G2', 'F3 A3 Bb3 D4'],
  };
  const PROG = ['Fmaj7', 'Dm7', 'Gm7', 'C7', 'Am7', 'D7', 'Gm7', 'C7', 'Bbmaj7', 'Bbm6', 'Am7', 'D7b9', 'Gm7', 'C9', 'Fmaj7', 'Gm7C7'];
  // the tune: eight swung eighths a bar ('.' rest, '-' hold the last note)
  const TUNE = [
    'A4 . C5 E5 - - D5 C5', 'A4 - - . F4 . A4 .', 'Bb4 . D5 F5 - - E5 D5', 'E5 - C5 . Bb4 . G4 .',
    'C5 . E5 G5 - . E5 C5', 'F#5 - - . D5 . C5 .', 'Bb4 - D5 . F5 . E5 D5', 'C5 - - - . . . .',
    'D5 . F5 A5 - - G5 F5', 'Db5 - - . Bb4 . G4 .', 'C5 . E5 - G5 . E5 C5', 'Eb5 - D5 . C5 . A4 .',
    'Bb4 . D5 - F5 . A5 -', 'G5 - E5 . D5 . Bb4 .', 'A4 . C5 . E5 - F5 .', '. . G4 A4 Bb4 . C5 .',
  ].map(b => b.split(' '));
  const COMP = [[0, 3], [1.5], [0, 2.5], [0.5, 2], [1, 2.5, 3.5], [0, 1.5, 3]];   // when the piano hits, in beats (Charleston-ish, varied)
  let rnd = 7;
  const rand = () => (rnd = (rnd * 16807) % 2147483647) / 2147483647;

  function out() {
    if (!master) {
      master = actx.createGain(); master.gain.value = level(); master.connect(actx.destination);
      // a little room around it
      const len = actx.sampleRate * 1.6, ir = actx.createBuffer(2, len, actx.sampleRate);
      for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
      verb = actx.createConvolver(); verb.buffer = ir; verb.connect(master); bus = null;
    }
    if (!bus) { bus = actx.createGain(); bus.connect(master); wet = actx.createGain(); wet.gain.value = 0.22; wet.connect(verb); }
    return bus;
  }
  // fade the playing song's bus out (from time t, over secs) and let it go. The next note gets a fresh bus
  function retire(secs, t) {
    if (!bus || !actx) return;
    const b = bus, w = wet; t = Math.max(t || 0, actx.currentTime);
    for (const g of [b.gain, w.gain]) { g.cancelScheduledValues(t); g.setValueAtTime(g.value || 1e-4, t); g.linearRampToValueAtTime(0, t + secs); }
    setTimeout(() => { try { b.disconnect(); w.disconnect(); } catch (e) {} }, (t - actx.currentTime + secs + 0.3) * 1000);
    bus = null; out();
  }
  function env(g, t, a, peak, dec) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec); }
  function voice(t, f, type, peak, dec, dest, lp) {
    const o = actx.createOscillator(), g = actx.createGain(); o.type = type; o.frequency.value = f;
    env(g, t, 0.006, peak, dec);
    if (lp) { const fl = actx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl).connect(g); } else o.connect(g);
    g.connect(dest); g.connect(wet); o.start(t); o.stop(t + dec + 0.05);
    return g;
  }
  function vibes(t, m, dur, vol = 0.07) {      // soft bar with a slow wobble
    const g = actx.createGain(), trem = actx.createOscillator(), td = actx.createGain();
    trem.frequency.value = 5.2; td.gain.value = 0.35; trem.connect(td).connect(g.gain); g.gain.value = 0.65; g.connect(out()); g.connect(wet);
    voice(t, hz(m), 'sine', vol, Math.max(0.6, dur * 1.6), g);
    voice(t, hz(m) * 4, 'sine', vol * 0.18, 0.18, g);
    trem.start(t); trem.stop(t + dur * 1.6 + 0.7);
  }
  function epiano(t, m, vol = 0.028) {         // warm electric piano
    voice(t, hz(m), 'sine', vol, 0.9, out(), 2400);
    voice(t, hz(m) * 2, 'triangle', vol * 0.25, 0.35, out(), 2400);
    voice(t, hz(m) * 7.02, 'sine', vol * 0.06, 0.06, out());
  }
  function marimba(t, m, vol = 0.06) { voice(t, hz(m), 'sine', vol, 0.32, out()); voice(t, hz(m) * 3.98, 'sine', vol * 0.25, 0.05, out()); }
  function bass(t, m, vol = 0.12) { voice(t, hz(m), 'triangle', vol, 0.5, out(), 700); voice(t, hz(m) / 2, 'sine', vol * 0.5, 0.4, out()); }
  function brush(t, vol, f0, dec) {
    if (!noiseBuf) noise(0.001, 1000, 1000, 0.0001);
    const s = actx.createBufferSource(), fl = actx.createBiquadFilter(), g = actx.createGain();
    s.buffer = noiseBuf; fl.type = 'bandpass'; fl.frequency.value = f0; fl.Q.value = 0.8; env(g, t, 0.004, vol, dec);
    s.connect(fl).connect(g).connect(out()); s.start(t, Math.random() * 0.3); s.stop(t + dec + 0.05);
  }
  // when each of the 8 eighths in a bar lands, swung
  const at = (bar0, e) => bar0 + Math.floor(e / 2) * BEAT + (e % 2 ? SWING * BEAT : 0);
  function playBar(bar, t0) {
    const name = PROG[bar], [root, voicing] = CH[name], kind = ['A', 'B', 'A', 'C'][pass % 4];
    const notes = voicing.split(' ').map(N), r = N(root);
    // piano comping
    const comp = COMP[(bar * 5 + pass * 3) % COMP.length];
    for (const b of comp) { const tt = t0 + Math.floor(b) * BEAT + (b % 1 ? SWING * BEAT : 0); notes.forEach((n, i) => epiano(tt + i * 0.006, n, kind === 'B' ? 0.02 : 0.026)); }
    if (name === 'Gm7C7') { const c7 = CH.C7[1].split(' ').map(N); for (const n of c7) epiano(t0 + 2 * BEAT + SWING * BEAT, n, 0.024); }
    // walking bass: root, chord tones, then a step into the next bar's root
    const nextRoot = N(CH[PROG[(bar + 1) % 16]][0]);
    const third = notes[0] % 12, line = [r, r + ((third - r % 12 + 12) % 12), r + 7, nextRoot + (rand() < 0.5 ? 1 : -1)];
    if (name === 'Gm7C7') { line[2] = N('C2'); line[3] = N('E2'); }
    line.forEach((m, i) => bass(t0 + i * BEAT, m));
    // brushes: a soft ride on the swung eighths, a swish on 2 and 4, a light kick
    for (let e = 0; e < 8; e++) if (e % 2 === 0 || e === 3 || e === 7) brush(at(t0, e), e % 2 ? 0.012 : 0.02, 7000, 0.09);
    brush(t0 + BEAT, 0.03, 2400, 0.22); brush(t0 + 3 * BEAT, 0.03, 2400, 0.22);
    voice(t0, 62, 'sine', 0.09, 0.18, out()); voice(t0 + 2 * BEAT, 58, 'sine', 0.06, 0.16, out());
    // the tune
    const line8 = TUNE[bar];
    const play = (fn, shift, vol) => {
      for (let e = 0; e < 8; e++) {
        const n = line8[e]; if (n === '.' || n === '-') continue;
        let len = 1; while (e + len < 8 && line8[e + len] === '-') len++;
        fn(at(t0, e), N(n) + shift, len * BEAT / 2, vol);
      }
    };
    if (kind === 'A') play(vibes, 0, 0.07);
    else if (kind === 'B') {
      play((t, m) => { epiano(t, m, 0.045); epiano(t, m - 12, 0.02); }, 0);
      if (bar % 2 === 1) { const m = notes[3] + 12; vibes(at(t0, 4), m, BEAT, 0.04); vibes(at(t0, 6), m - 3, BEAT, 0.035); }   // vibes answer back
    } else {
      // breather: the marimba noodles up and down the chord
      const arp = notes.concat(notes.map(n => n + 12));
      for (let e = 0; e < 8; e++) if (rand() < 0.62) marimba(at(t0, e), arp[(e * 3 + bar) % arp.length] + 12, 0.045);
    }
  }
  // the test room's light, bouncy jazz loop (only used there)
  // wind high up in the trees: slow gusts rising and falling, now and then a creak of a branch
  function gust(t, dur, f0, f1, vol) {
    if (!noiseBuf) noise(0.001, 1000, 1000, 0.0001);
    const s = actx.createBufferSource(), fl = actx.createBiquadFilter(), g = actx.createGain();
    s.buffer = noiseBuf; s.loop = true; fl.type = 'bandpass'; fl.Q.value = 0.7;
    fl.frequency.setValueAtTime(f0, t); fl.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.55); fl.frequency.exponentialRampToValueAtTime(f0 * 0.8, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.45); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(fl).connect(g).connect(out()); s.start(t, Math.random() * 0.3); s.stop(t + dur + 0.05);
  }
  function playWind(bar, t0) {
    gust(t0, 4.6, 260 + rand() * 120, 700 + rand() * 500, 0.05 + rand() * 0.03);
    if (bar % 2) gust(t0 + 1.6, 3.2, 900, 1800 + rand() * 600, 0.018);
    if (bar % 4 === 3) { const o = actx.createOscillator(), g = actx.createGain(), tt = t0 + 2.2; o.type = 'triangle';   // a branch creaking
      o.frequency.setValueAtTime(140, tt); o.frequency.linearRampToValueAtTime(118, tt + 0.5); env(g, tt, 0.08, 0.012, 0.45); o.connect(g).connect(out()); o.start(tt); o.stop(tt + 0.6); }
  }
  // rootwood: slow and a little uneasy. Soft chords breathing in and out, a music box picking out a few notes, a knock now and then
  const ROOT_PROG = [['D2', 'D3 F3 A3 C4'], ['Bb1', 'D3 F3 A3 Bb3'], ['G1', 'D3 G3 Bb3 C4'], ['A1', 'C#3 E3 G3 A3']];
  const ROOT_TUNE = ['A4 . . F4 . . E4 .', 'D4 . . . . . . .', 'D5 . C5 . Bb4 . . A4', 'E4 . . . . G4 . .'];
  function pad(t, m, dur, vol) {
    const o = actx.createOscillator(), o2 = actx.createOscillator(), g = actx.createGain(), fl = actx.createBiquadFilter();
    o.type = 'triangle'; o2.type = 'sine'; o.frequency.value = hz(m); o2.frequency.value = hz(m) * 1.003; fl.type = 'lowpass'; fl.frequency.value = 900;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + dur * 1.05);
    o.connect(fl); o2.connect(fl); fl.connect(g); g.connect(out()); g.connect(wet); o.start(t); o2.start(t); o.stop(t + dur * 1.1); o2.stop(t + dur * 1.1);
  }
  function musicbox(t, m, vol = 0.03) { voice(t, hz(m), 'sine', vol, 1.2, out()); voice(t, hz(m) * 3, 'sine', vol * 0.15, 0.3, out()); }
  function playRoot(bar, t0) {
    const [root, chord] = ROOT_PROG[bar % 4], notes = chord.split(' ').map(N);
    for (const n of notes) pad(t0, n, 4 * BEAT, 0.012);
    voice(t0, hz(N(root)), 'sine', 0.06, 4 * BEAT * 0.9, out());
    if (pass % 2 === 1 || bar >= 4) {
      const line = ROOT_TUNE[bar % 4].split(' ');
      line.forEach((n, e) => { if (n !== '.') musicbox(t0 + e * BEAT / 2, N(n) + (bar >= 8 ? 12 : 0)); });
    }
    if (bar % 4 === 3) brush(t0 + 3.5 * BEAT, 0.05, 600, 0.12);                       // a knock on wood, somewhere off in the dark
    if (rand() < 0.4) { const tt = t0 + rand() * 3 * BEAT; for (let i = 0; i < 3; i++) voice(tt + i * 0.05, 4200 + rand() * 300, 'sine', 0.004, 0.04, out()); }   // something chirping
  }
  // the tin soldier: a wind-up march. Snare and bass drum, a low brassy line going round and round, a toy glockenspiel tune
  const MARCH_BASS = ['D2 D2 A1 D2', 'D2 D2 F2 E2', 'Bb1 Bb1 F2 Bb1', 'A1 A1 C#2 E2'];
  const MARCH_TUNE = ['D5 . F5 . A5 . . A5', 'G5 . F5 . E5 . . .', 'F5 . D5 . Bb4 . D5 F5', 'E5 . C#5 . A4 . . .'];
  function snare(t, vol) { brush(t, vol, 2600, 0.11); voice(t, 190, 'triangle', vol * 0.6, 0.06, out()); }
  function kick(t) { const o = actx.createOscillator(), g = actx.createGain(); o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15); env(g, t, 0.002, 0.14, 0.16); o.connect(g).connect(out()); o.start(t); o.stop(t + 0.2); }
  function brass(t, m, dur, vol = 0.04) { voice(t, hz(m), 'sawtooth', vol, dur, out(), 700); voice(t, hz(m) * 2, 'square', vol * 0.2, dur * 0.6, out(), 900); }
  function playMarch(bar, t0) {
    kick(t0); kick(t0 + 2 * BEAT);
    for (let e = 0; e < 8; e++) if (e % 2 === 1 || (bar % 4 === 3 && e > 4)) snare(t0 + e * BEAT / 2, e % 4 === 3 ? 0.05 : 0.025);
    if (bar % 4 === 3) for (let i = 0; i < 6; i++) snare(t0 + 3 * BEAT + i * BEAT / 6, 0.018 + i * 0.004);   // a roll into the next phrase
    MARCH_BASS[bar % 4].split(' ').forEach((n, i) => brass(t0 + i * BEAT, N(n), BEAT * 0.8));
    if (bar >= 4) MARCH_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') marimba(t0 + e * BEAT / 2, N(n) + (bar >= 12 ? 12 : 0), 0.05); });
  }
  // home: a warm, easy morning tune in G. Plucked guitar rolling under it, a glockenspiel singing the tune the first time
  // round, a soft flute the second, then just a felt piano and the guitar with birds outside the window
  const HOME_CH = [['G2', 'G3 B3 D4'], ['F#2', 'F#3 A3 D4'], ['E2', 'E3 G3 B3'], ['C2', 'C3 E3 G3'], ['G2', 'G3 B3 D4'], ['A2', 'A3 C4 E4 G4'], ['D2', 'D3 F#3 A3 C4'], ['G2', 'G3 B3 D4'],
                   ['C2', 'C3 E3 G3'], ['B1', 'B2 D3 G3'], ['A2', 'A3 C4 E4'], ['D2', 'D3 F#3 A3'], ['E2', 'E3 G3 B3'], ['C2', 'C3 E3 G3'], ['A2', 'A3 C4 E4'], ['G2', 'G3 B3 D4']];
  const HOME_TUNE = [
    'D5 . B4 . G4 . B4 D5', 'E5 - D5 . A4 . . .', 'B4 . G4 . E4 . G4 B4', 'C5 - B4 . G4 . . .',
    'D5 . G5 . F#5 . E5 D5', 'E5 - C5 . A4 . C5 E5', 'D5 . A4 . C5 . B4 A4', 'G4 - - - . . . .',
    'E5 . G5 . E5 . C5 .', 'D5 . B4 . D5 . G5 .', 'C5 . E5 . A5 . G5 E5', 'F#5 - - . E5 . D5 .',
    'G5 . E5 . B4 . E5 G5', 'A5 - G5 . E5 . C5 .', 'B4 . A4 . C5 . F#4 .', 'G4 - - - . . D4 .',
  ].map(b => b.split(' '));
  function pluck(t, m, vol = 0.03) { voice(t, hz(m), 'triangle', vol, 0.55, out(), 1800); voice(t, hz(m) * 2, 'sine', vol * 0.3, 0.12, out()); }
  function glock(t, m, vol = 0.035) { voice(t, hz(m), 'sine', vol, 1.0, out()); voice(t, hz(m) * 2.76, 'sine', vol * 0.35, 0.25, out()); voice(t, hz(m) * 5.4, 'sine', vol * 0.12, 0.08, out()); }
  function flute(t, m, dur, vol = 0.03) {
    const o = actx.createOscillator(), g = actx.createGain(), vib = actx.createOscillator(), vd = actx.createGain();
    o.type = 'sine'; o.frequency.value = hz(m); vib.frequency.value = 5; vd.gain.value = hz(m) * 0.006; vib.connect(vd).connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.07); g.gain.setValueAtTime(vol, t + Math.max(0.08, dur * 0.7)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.15);
    o.connect(g); g.connect(out()); g.connect(wet); o.start(t); vib.start(t); o.stop(t + dur + 0.2); vib.stop(t + dur + 0.2);
    brush(t, vol * 0.25, 3000, 0.05);                                                     // a little breath on the start
  }
  function feltPiano(t, m, vol = 0.05) { voice(t, hz(m), 'sine', vol, 1.1, out(), 1200); voice(t, hz(m) * 2, 'triangle', vol * 0.15, 0.4, out(), 1200); }
  function playHome(bar, t0) {
    const [root, chord] = HOME_CH[bar], notes = chord.split(' ').map(N), r = N(root), kind = ['A', 'B', 'C'][pass % 3];
    feltPiano(t0, r, 0.085); feltPiano(t0 + 2 * BEAT, r + 7, 0.055);                       // bass on 1 and 3
    const arp = [notes[0], notes[1], notes[2], notes[1] + 12, notes[2], notes[1] + 12, notes[0] + 12, notes[2]];
    arp.forEach((m, e) => pluck(t0 + e * BEAT / 2, m, e === 0 ? 0.048 : 0.032));        // the guitar rolling along
    const line = HOME_TUNE[bar];
    const each = fn => { for (let e = 0; e < 8; e++) { const n = line[e]; if (n === '.' || n === '-') continue; let len = 1; while (e + len < 8 && line[e + len] === '-') len++; fn(t0 + e * BEAT / 2, N(n), len * BEAT / 2); } };
    if (kind === 'A') each((t, m) => glock(t, m, 0.05));
    else if (kind === 'B') { each((t, m, d) => flute(t, m, d, 0.045)); if (bar % 4 === 3) glock(t0 + 2 * BEAT, notes[2] + 24, 0.02); }
    else {
      each((t, m, d) => { if (rand() < 0.55) feltPiano(t, m, 0.045); });                  // the piano just hints at the tune
      if (rand() < 0.5) { const tt = t0 + rand() * 3 * BEAT; for (let i = 0; i < 2 + Math.floor(rand() * 3); i++) voice(tt + i * 0.09, 3200 + rand() * 900, 'sine', 0.006, 0.07, out()); }   // birds outside
    }
  }
  // the title: the home tune on a music box, quiet and roomy, out in the park at night (from the "A Warm Memory"
  // sketch in Music studies, on the game's own instruments). A soft felt note under each bar and a few plucked chord notes, no
  // drums. It goes round in three passes of 16 bars:
  //   1: the music box alone with the tune, the plucks coming in for the second half
  //   2: the same, and where the tune stops to breathe a flute answers it with its last few notes
  //   3: barely there, the box playing the first half an octave down and every other bar, then back to the top
  function playTitle(bar, t0) {
    const [root, chord] = HOME_CH[bar], notes = chord.split(' ').map(N), r = N(root), line = HOME_TUNE[bar], round = pass % 3;
    feltPiano(t0, r, round === 2 ? 0.04 : 0.055);
    if (round !== 2 && (bar >= 8 || round === 1)) { pluck(t0 + BEAT, notes[1] + 12, 0.012); pluck(t0 + 2.5 * BEAT, notes[2] + 12, 0.010); }
    const each = fn => { for (let e = 0; e < 8; e++) { const n = line[e]; if (n !== '.' && n !== '-') fn(t0 + e * BEAT / 2, N(n), e); } };
    if (round === 2) { if (bar < 8 && bar % 2 === 0) each((t, m) => musicbox(t, m - 12, 0.034)); }
    else each((t, m) => musicbox(t, m, 0.04));
    // the answer: the tune rests at the end of the bar, so the flute echoes the bar's last notes there, softly
    if (round === 1 && line[5] === '.' && line[6] === '.' && line[7] === '.') {
      const ns = line.slice(0, 5).filter(n => n !== '.' && n !== '-').slice(-2);
      ns.forEach((n, i) => flute(t0 + (2.5 + i) * BEAT, N(n), BEAT * 0.9, 0.022));
    }
    if (rand() < 0.4) { const tt = t0 + rand() * 3 * BEAT; for (let i = 0; i < 3; i++) voice(tt + i * 0.06, 4300 + rand() * 200, 'sine', 0.003, 0.03, out()); }   // a cricket
  }
  // the Pond: easy and sunny. A plucked uke rolling along, a marimba with the tune, and water dripping off the reeds
  const POND_CH = [['A2', 'A3 C#4 E4'], ['F#2', 'F#3 A3 C#4'], ['D2', 'D3 F#3 A3'], ['E2', 'E3 G#3 B3'], ['A2', 'A3 C#4 E4'], ['C#2', 'C#3 E3 G#3'], ['D2', 'D3 F#3 A3 B3'], ['E2', 'E3 G#3 B3 D4']];
  const POND_TUNE = ['E5 . C#5 . A4 . C#5 .', 'F#5 - E5 . C#5 . . .', 'D5 . F#5 . A5 . F#5 D5', 'E5 - - . B4 . . .',
                     'C#5 . E5 . A5 . G#5 F#5', 'E5 - G#4 . B4 . . .', 'A4 . B4 . D5 . F#5 E5', 'D5 - C#5 . B4 . . .'].map(b => b.split(' '));
  function drip(t, vol = 0.02) { const f = 900 + rand() * 700; voice(t, f, 'sine', vol, 0.08, out()); voice(t + 0.02, f * 1.6, 'sine', vol * 0.5, 0.05, out()); }
  function playPond(bar, t0) {
    const [root, chord] = POND_CH[bar % 8], notes = chord.split(' ').map(N), r = N(root), kind = ['A', 'B', 'C'][pass % 3];
    bass(t0, r, 0.09); bass(t0 + 2.5 * BEAT, r + 7, 0.05);
    [0, 1, 2, 1, 0, 2, 1, 2].forEach((k, e) => pluck(t0 + e * BEAT / 2, notes[k] + 12, e % 2 ? 0.022 : 0.03));
    const line = POND_TUNE[bar % 8];
    const each = fn => { for (let e = 0; e < 8; e++) { const n = line[e]; if (n === '.' || n === '-') continue; let len = 1; while (e + len < 8 && line[e + len] === '-') len++; fn(t0 + e * BEAT / 2, N(n), len * BEAT / 2); } };
    if (kind === 'A') each((t, m) => marimba(t, m, 0.05));
    else if (kind === 'B') each((t, m, d) => flute(t, m, d, 0.035));
    else each((t, m) => { if (rand() < 0.5) glock(t, m + 12, 0.025); });
    if (rand() < 0.7) drip(t0 + rand() * 3.5 * BEAT);
    if (bar % 4 === 3) brush(t0 + 3 * BEAT, 0.02, 1800, 0.2);
  }
  // under the water: the same chords, slow and muffled, bubbles going up
  function playDeep(bar, t0) {
    const [root, chord] = POND_CH[(bar >> 1) % 8], notes = chord.split(' ').map(N);
    if (bar % 2 === 0) { for (const n of notes) pad(t0, n - 12, 8 * BEAT, 0.014); voice(t0, hz(N(root) - 12), 'sine', 0.07, 7 * BEAT, out()); }
    if (rand() < 0.6) { const tt = t0 + rand() * 3 * BEAT; for (let i = 0; i < 3; i++) voice(tt + i * 0.07, 500 + i * 140 + rand() * 60, 'sine', 0.02, 0.06, out()); }
    if (bar % 2 === 1) POND_TUNE[(bar >> 1) % 8].forEach((n, e) => { if (n !== '.' && n !== '-' && e % 2 === 0) musicbox(t0 + e * BEAT / 2, N(n) - 12, 0.025); });
  }
  // the toy sailboat: a jaunty shanty, accordion-ish squeezebox chords and a stomp
  const SHANTY = [['D2', 'D3 F3 A3'], ['C2', 'C3 E3 G3'], ['D2', 'D3 F3 A3'], ['A1', 'A2 C#3 E3']];
  const SHANTY_TUNE = ['A4 . D5 . D5 E5 F5 .', 'E5 . C5 . C5 D5 E5 .', 'F5 . E5 . D5 . A4 .', 'C#5 . E5 . A4 . . .'];
  function squeezebox(t, m, dur, vol = 0.02) { voice(t, hz(m), 'sawtooth', vol, dur, out(), 1400); voice(t, hz(m) * 1.004, 'square', vol * 0.5, dur, out(), 1100); }
  function playShanty(bar, t0) {
    const [root, chord] = SHANTY[bar % 4], notes = chord.split(' ').map(N);
    kick(t0); kick(t0 + 2 * BEAT); snare(t0 + BEAT, 0.03); snare(t0 + 3 * BEAT, 0.03);
    bass(t0, N(root), 0.1); bass(t0 + 2 * BEAT, N(root) + 7, 0.07);
    for (const b of [0.5, 1.5, 2.5, 3.5]) for (const n of notes) squeezebox(t0 + b * BEAT, n + 12, BEAT * 0.4, 0.012);
    SHANTY_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') marimba(t0 + e * BEAT / 2, N(n) + (bar >= 8 ? 12 : 0), 0.05); });
  }
  // the tangle: low and creepy, plucked strings pulled tight, things creaking in the dark water
  const TANGLE = [['E2', 'E3 G3 B3'], ['F2', 'F3 A3 C4'], ['E2', 'E3 G3 B3'], ['D#2', 'D#3 F#3 A3']];
  function playTangle(bar, t0) {
    const [root, chord] = TANGLE[bar % 4], notes = chord.split(' ').map(N);
    for (const n of notes) pad(t0, n - 12, 4 * BEAT, 0.012);
    for (let e = 0; e < 8; e++) if (e % 3 === 0 || rand() < 0.25) pluck(t0 + e * BEAT / 2, notes[(e + bar) % 3] + (rand() < 0.3 ? 12 : 0), 0.035);
    kick(t0); if (bar % 2) kick(t0 + 2.5 * BEAT);
    if (bar % 4 === 3) { const o = actx.createOscillator(), g = actx.createGain(), tt = t0 + 2 * BEAT; o.type = 'sawtooth'; o.frequency.setValueAtTime(110, tt); o.frequency.linearRampToValueAtTime(92, tt + 0.6); env(g, tt, 0.1, 0.012, 0.55); o.connect(g).connect(out()); o.start(tt); o.stop(tt + 0.7); }
  }
  // the swan: a big bouncy waltz on a toy organ, oom-pah-pah
  const WALTZ = [['F2', 'A3 C4 F4'], ['C2', 'G3 Bb3 E4'], ['C2', 'G3 Bb3 E4'], ['F2', 'A3 C4 F4'], ['Bb1', 'Bb3 D4 F4'], ['F2', 'A3 C4 F4'], ['C2', 'G3 Bb3 E4'], ['F2', 'A3 C4 F4']];
  const WALTZ_TUNE = ['C5 . A4 . F4 .', 'G4 . Bb4 . C5 .', 'E5 . D5 . C5 .', 'A4 . . . . .', 'D5 . F5 . D5 .', 'C5 . A4 . F4 .', 'G4 . E4 . C5 .', 'F4 . . . . .'];
  function organ(t, m, dur, vol = 0.02) { voice(t, hz(m), 'square', vol, dur, out(), 1600); voice(t, hz(m) * 2, 'sine', vol * 0.6, dur, out()); }
  function playWaltz(bar, t0) {
    const [root, chord] = WALTZ[bar % 8], notes = chord.split(' ').map(N);
    bass(t0, N(root), 0.11); for (const b of [1, 2]) for (const n of notes) organ(t0 + b * BEAT, n, BEAT * 0.5, 0.01);
    kick(t0); snare(t0 + BEAT, 0.015); snare(t0 + 2 * BEAT, 0.015);
    WALTZ_TUNE[bar % 8].split(' ').forEach((n, e) => { if (n !== '.') glock(t0 + e * BEAT / 2, N(n) + (bar >= 8 ? 12 : 0), 0.045); });
  }
  // the Playground at dusk: a slow music box waltz, a little out of tune, an ice cream truck long gone
  const DUSK_CH = [['D2', 'D3 F#3 A3'], ['B1', 'B2 D3 F#3'], ['G1', 'G2 B2 D3'], ['A1', 'A2 C#3 E3'], ['D2', 'D3 F#3 A3'], ['F#1', 'F#2 A2 C#3'], ['G1', 'G2 B2 D3'], ['A1', 'A2 C#3 G3']];
  const DUSK_TUNE = ['F#5 . E5 . D5 .', 'D5 . C#5 . B4 .', 'B4 . D5 . G5 .', 'E5 . . . . .', 'A5 . F#5 . D5 .', 'C#5 . E5 . A4 .', 'B4 . G4 . D5 .', 'C#5 . . . . .'];
  function playDusk(bar, t0) {
    const [root, chord] = DUSK_CH[bar % 8], notes = chord.split(' ').map(N), kind = pass % 2;
    voice(t0, hz(N(root)), 'sine', 0.06, 2.2 * BEAT, out()); for (const b of [1, 2]) for (const n of notes) musicbox(t0 + b * BEAT, n + 12, 0.008);
    DUSK_TUNE[bar % 8].split(' ').forEach((n, e) => { if (n !== '.') musicbox(t0 + e * BEAT / 2, N(n) - (kind ? 0 : 12) + (rand() < 0.08 ? 1 : 0), 0.04); });   // the odd note slightly off
    if (rand() < 0.3) { const tt = t0 + rand() * 2 * BEAT; voice(tt, 4400 + rand() * 400, 'sine', 0.004, 0.05, out()); }   // a cricket
  }
  // the spinning top: a fast polka going round and round
  const POLKA = [['C2', 'E3 G3 C4'], ['G1', 'D3 F3 B3'], ['G1', 'D3 F3 B3'], ['C2', 'E3 G3 C4']];
  const POLKA_TUNE = ['G5 E5 G5 E5 C5 . E5 G5', 'F5 D5 F5 D5 B4 . D5 F5', 'D5 B4 D5 F5 G5 F5 D5 B4', 'C5 . G4 . C5 . . .'];
  function playPolka(bar, t0) {
    const [root, chord] = POLKA[bar % 4], notes = chord.split(' ').map(N);
    for (let b = 0; b < 4; b++) { if (b % 2 === 0) bass(t0 + b * BEAT, N(root) + (b ? 7 : 0), 0.1); else for (const n of notes) squeezebox(t0 + b * BEAT, n, BEAT * 0.4, 0.012); }
    kick(t0); kick(t0 + 2 * BEAT); snare(t0 + BEAT, 0.03); snare(t0 + 3 * BEAT, 0.03);
    POLKA_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') glock(t0 + e * BEAT / 2, N(n) + (bar >= 8 ? 12 : 0), 0.04); });
  }
  // the marionette: a creepy waltz on a music box winding down, strings creaking
  const PUPPET_CH = [['A1', 'A2 C3 E3'], ['E1', 'E2 G#2 B2'], ['A1', 'A2 C3 E3'], ['D2', 'D3 F3 A3'], ['A1', 'A2 C3 E3'], ['F1', 'F2 A2 C3'], ['E1', 'E2 G#2 B2'], ['A1', 'A2 C3 E3']];
  const PUPPET_TUNE = ['E5 . A5 . C6 .', 'B5 . G#5 . E5 .', 'A5 . C6 . E6 .', 'D6 . . . A5 .', 'C6 . B5 . A5 .', 'F5 . A5 . C6 .', 'B5 . E5 . G#5 .', 'A5 . . . . .'];
  function playPuppet(bar, t0) {
    const [root, chord] = PUPPET_CH[bar % 8], notes = chord.split(' ').map(N);
    bass(t0, N(root), 0.09); for (const b of [1, 2]) for (const n of notes) pluck(t0 + b * BEAT, n + 12, 0.014);
    PUPPET_TUNE[bar % 8].split(' ').forEach((n, e) => { if (n !== '.') musicbox(t0 + e * BEAT / 2, N(n) - 12, 0.045); });
    if (bar % 4 === 3) { const o = actx.createOscillator(), g = actx.createGain(), tt = t0 + BEAT; o.type = 'sawtooth'; o.frequency.setValueAtTime(220, tt); o.frequency.linearRampToValueAtTime(180, tt + 0.5); env(g, tt, 0.1, 0.008, 0.45); o.connect(g).connect(out()); o.start(tt); o.stop(tt + 0.6); }
  }
  // the clown box: a lurching circus march, slightly off-key
  const CIRCUS = [['C2', 'E3 G3 Bb3'], ['F1', 'F3 A3 C4'], ['C2', 'E3 G3 Bb3'], ['G1', 'F3 B3 D4']];
  const CIRCUS_TUNE = ['C5 . E5 G5 C6 . Bb5 G5', 'A5 . F5 . C5 . A4 .', 'E5 . G5 Bb5 C6 . Bb5 G5', 'F5 . D5 . B4 . G4 .'];
  function playCircus(bar, t0) {
    const [root, chord] = CIRCUS[bar % 4], notes = chord.split(' ').map(N);
    for (let b = 0; b < 4; b++) { if (b % 2 === 0) brass(t0 + b * BEAT, N(root) + (b ? 7 : 0), BEAT * 0.7, 0.04); else for (const n of notes) organ(t0 + b * BEAT, n, BEAT * 0.4, 0.01); }
    kick(t0); kick(t0 + 2 * BEAT); snare(t0 + BEAT, 0.03); snare(t0 + 3 * BEAT, 0.03);
    CIRCUS_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') organ(t0 + e * BEAT / 2, N(n) + (rand() < 0.1 ? 1 : 0), BEAT * 0.45, 0.02); });
  }
  // the Old Oak, inside the trunk: slow, hollow, woody. A low creaking drone, a thumb piano picking out a tune that
  // echoes, the odd knock and tick of the wood settling
  const OAK_CH = [['A1', 'A2 E3 A3'], ['F1', 'F2 C3 A3'], ['G1', 'G2 D3 B3'], ['E1', 'E2 B2 G#3']];
  const OAK_TUNE = ['E4 . . A4 . . B4 .', 'C5 . . . A4 . . .', 'D5 . . B4 . . G4 .', 'E4 . . . . . . .'];
  function kalimba(t, m, vol = 0.035) { voice(t, hz(m), 'triangle', vol, 1.4, out(), 1800); voice(t, hz(m) * 2, 'sine', vol * 0.3, 0.5, out()); voice(t + 0.22, hz(m), 'sine', vol * 0.35, 0.9, out()); }
  function playOak(bar, t0) {
    const [root, chord] = OAK_CH[bar % 4], notes = chord.split(' ').map(N);
    voice(t0, hz(N(root)), 'sine', 0.07, 4 * BEAT * 0.95, out());
    for (const n of notes) pad(t0 + BEAT * 0.5, n, 3.5 * BEAT, 0.008);
    if (pass % 2 === 1 || bar >= 4) OAK_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') kalimba(t0 + e * BEAT / 2, N(n) + (bar >= 8 ? 12 : 0)); });
    if (bar % 2 === 1) brush(t0 + 2.5 * BEAT + rand() * BEAT, 0.04, 500, 0.1);                                      // the wood ticking and settling
    if (bar % 4 === 2) { const o = actx.createOscillator(), g = actx.createGain(), tt = t0 + 1.2; o.type = 'triangle';   // a slow creak
      o.frequency.setValueAtTime(120, tt); o.frequency.linearRampToValueAtTime(96, tt + 0.7); env(g, tt, 0.1, 0.01, 0.7); o.connect(g).connect(out()); o.start(tt); o.stop(tt + 0.8); }
  }
  // the yo-yo: a quick, bouncy tune that keeps dropping and winding back up, plucked strings and a woodblock
  const YOYO_BASS = ['A1 A1 E2 A1', 'F1 F1 C2 F1', 'G1 G1 D2 G1', 'E1 E1 B1 E1'];
  const YOYO_TUNE = ['A5 G5 E5 C5 A4 . C5 E5', 'A5 G5 F5 C5 A4 . . .', 'B5 A5 G5 D5 B4 . D5 G5', 'B5 . E5 . E6 . . .'];
  function woodblock(t, vol = 0.05) { voice(t, 900, 'square', vol, 0.04, out(), 2400); brush(t, vol * 0.5, 1800, 0.03); }
  function playYoyo(bar, t0) {
    YOYO_BASS[bar % 4].split(' ').forEach((n, i) => bass(t0 + i * BEAT, N(n), 0.1));
    for (let e = 0; e < 8; e++) if (e % 2 === 0) woodblock(t0 + e * BEAT / 2, e % 4 === 0 ? 0.05 : 0.03);
    YOYO_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') kalimba(t0 + e * BEAT / 2, N(n), 0.03); });
    if (bar % 4 === 3) for (let i = 0; i < 8; i++) voice(t0 + 2 * BEAT + i * BEAT / 4, 300 + i * 90, 'triangle', 0.02, 0.1, out());   // winding back up
  }
  // the kite: windy and high. Gusts underneath, a bright tune on a whistle that swoops, the string humming
  const KITE_CH = [['D2', 'D3 A3 F#4'], ['G2', 'G3 D4 B4'], ['A2', 'A3 E4 C#5'], ['D2', 'D3 A3 F#4']];
  const KITE_TUNE = ['F#5 . A5 . D6 . . C#6', 'B5 . . G5 . . . .', 'A5 . C#6 . E6 . . .', 'D6 . . A5 . F#5 . .'];
  function whistle(t, m, dur, vol = 0.03) { const f = hz(m); voice(t, f * 0.98, 'sine', vol, dur, out()); voice(t + 0.05, f, 'sine', vol * 0.8, dur, out()); }
  function playKite(bar, t0) {
    gust(t0 + rand() * BEAT, 2.6, 300 + rand() * 200, 900 + rand() * 500, 0.03);
    const [root, chord] = KITE_CH[bar % 4], notes = chord.split(' ').map(N);
    voice(t0, hz(N(root)), 'sine', 0.05, 4 * BEAT * 0.9, out());
    for (const n of notes) pad(t0, n, 4 * BEAT, 0.01);
    KITE_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') whistle(t0 + e * BEAT / 2, N(n), BEAT * 0.5); });
    voice(t0, 2200 + rand() * 200, 'sine', 0.006, 4 * BEAT, out());                                                   // the string humming
    for (let e = 0; e < 4; e++) brush(t0 + e * BEAT, 0.02, 3000, 0.05);
  }
  // the Greenhouse: warm and close and still, the air thick. Slow lush chords like the light through green glass, a
  // harp rolling up each one, water dripping somewhere, now and then a few notes on a soft flute. And once in a while a
  // dry scrape under it all: the Bramble, moving
  const GH_CH = [['Eb2', 'G3 Bb3 D4'], ['C2', 'Eb3 G3 Bb3 D4'], ['Ab1', 'C3 Eb3 G3'], ['Bb1', 'D3 F3 Ab3 C4'], ['Eb2', 'G3 Bb3 D4'], ['G1', 'F3 Bb3 D4'], ['Ab1', 'C3 Eb3 G3 Bb3'], ['Bb1', 'Eb3 F3 Ab3']];
  const GH_TUNE = ['G5 . . F5 Eb5 . . .', 'D5 . Eb5 . F5 . . .', 'Eb5 . . C5 G4 . . .', 'Ab4 . Bb4 . C5 . D5 .', 'G5 . . Bb5 . G5 . .', 'F5 . . D5 . . . .', 'Eb5 . C5 . G4 . Bb4 .', 'Ab4 . . G4 . . . .'];
  function playGreenhouse(bar, t0) {
    const [root, chord] = GH_CH[bar % 8], notes = chord.split(' ').map(N);
    voice(t0, hz(N(root)), 'sine', 0.06, 4 * BEAT * 0.95, out());
    for (const n of notes) pad(t0, n, 4 * BEAT, 0.008);
    notes.forEach((n, i) => pluck(t0 + i * BEAT / 2, n + 12, 0.018));                                              // the harp rolling up
    if (pass % 2 === 1 || bar >= 8) GH_TUNE[bar % 8].split(' ').forEach((n, e) => { if (n !== '.') whistle(t0 + e * BEAT / 2, N(n), BEAT * 0.9, 0.018); });
    for (let i = 0; i < 2; i++) if (rand() < 0.7) { const tt = t0 + rand() * 4 * BEAT, f = 1800 + rand() * 1400; voice(tt, f, 'sine', 0.012, 0.12, out()); voice(tt + 0.02, f * 1.5, 'sine', 0.005, 0.06, out()); }   // drips
    if (bar % 8 === 6) brush(t0 + 1.5 * BEAT, 0.03, 700, 0.6);                                                    // a scrape of thorns
  }
  // the Bramble heart: a heartbeat under it all, the knot's (a low double thump), a plucked low line going round and
  // round like it's winding tighter, scrapes of thorns on the offbeats, and a high thin tune over it that won't settle
  const BR_BASS = ['C2 C2 Eb2 C2 G1 . Bb1 .', 'Ab1 Ab1 C2 Ab1 G1 . B1 .', 'C2 C2 Eb2 C2 F2 . Eb2 .', 'Ab1 . G1 . F1 . G1 .'];
  const BR_TUNE = ['G5 . Ab5 . G5 . . Eb5', 'F5 . . D5 . . . .', 'G5 . C6 . Bb5 . Ab5 .', 'G5 . . F5 . D5 . .'];
  function playBramble(bar, t0) {
    for (const b of [0, 2]) { voice(t0 + b * BEAT, 52, 'sine', 0.13, 0.22, out()); voice(t0 + b * BEAT + 0.16, 46, 'sine', 0.09, 0.2, out()); }   // the heartbeat
    BR_BASS[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') pluck(t0 + e * BEAT / 2, N(n) + 12, 0.04); });
    for (let e = 1; e < 8; e += 2) if (rand() < 0.6) brush(t0 + e * BEAT / 2, 0.025, 900 + rand() * 600, 0.12);   // thorns scraping
    if (pass % 2 === 1 || bar >= 4) BR_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') whistle(t0 + e * BEAT / 2, N(n), BEAT * 0.45, 0.016); });
    pad(t0, N(bar % 4 === 1 || bar % 4 === 3 ? 'Ab2' : 'C3'), 4 * BEAT, 0.006);
  }
  // the Hive: warm and busy. A low hum under everything that swells and falls, plucked strings going about their work
  // like bees (quick little runs up and down), a soft pad, and now and then a few notes of a music box (it was a
  // birthday, once)
  const HIVE_CH = [['F2', 'A3 C4 F4'], ['D2', 'F3 A3 D4'], ['Bb1', 'D3 F3 Bb3'], ['C2', 'E3 G3 C4']];
  const HIVE_RUN = ['F4 A4 C5 A4', 'D4 F4 A4 F4', 'Bb3 D4 F4 D4', 'C4 E4 G4 Bb4'];
  const HIVE_BOX = ['C5 . A4 . F4 . . .', 'D5 . . C5 A4 . . .', 'F5 . D5 . Bb4 . . .', 'E5 . C5 . G4 . . .'];
  function playHive(bar, t0) {
    const [root, chord] = HIVE_CH[bar % 4], notes = chord.split(' ').map(N);
    voice(t0, hz(N(root)), 'sine', 0.05, 4 * BEAT * 0.95, out());
    voice(t0, 110, 'sawtooth', 0.004, 4 * BEAT, out(), 500); voice(t0 + BEAT * 2, 112, 'sawtooth', 0.004, 2 * BEAT, out(), 500);   // the hum
    for (const n of notes) pad(t0, n, 4 * BEAT, 0.006);
    const run_ = HIVE_RUN[bar % 4].split(' ').map(N);
    for (let e = 0; e < 8; e++) pluck(t0 + e * BEAT / 2, run_[e % 4] + (e >= 4 ? 12 : 0), 0.014);                    // the strings, busy
    if (bar % 8 >= 4 || pass % 2 === 1) HIVE_BOX[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') musicbox(t0 + e * BEAT / 2, N(n) + 12, 0.02); });
    if (rand() < 0.5) brush(t0 + rand() * 4 * BEAT, 0.012, 2600, 0.08);
  }
  // the Gummy Worm: sour and stretchy. A bass that slides up and down like something being pulled, quick plucks, a
  // squelch on the off beat
  const WORM_BASS = ['D2 . F2 . G2 . A2 G2', 'D2 . F2 . C2 . D2 .', 'Bb1 . D2 . F2 . E2 D2', 'A1 . C#2 . E2 . A2 .'];
  const WORM_TUNE = ['A4 D5 F5 D5 A4 . F4 .', 'G4 C5 E5 C5 G4 . E4 .', 'F4 Bb4 D5 Bb4 F4 . D4 .', 'E4 A4 C#5 E5 A5 . . .'];
  function playWorm(bar, t0) {
    WORM_BASS[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') bass(t0 + e * BEAT / 2, N(n), 0.09); });
    WORM_TUNE[bar % 4].split(' ').forEach((n, e) => { if (n !== '.') pluck(t0 + e * BEAT / 2, N(n), 0.022); });
    for (let e = 1; e < 8; e += 2) brush(t0 + e * BEAT / 2, 0.03, 500 + rand() * 300, 0.07);
  }
  // the Piñata: a party gone wrong. An oom-pah in three that won't quite keep time, a squeaky party horn tune over
  // it, and the odd crash of something falling off a table
  const PIN_BASS = ['G2', 'D2', 'G2', 'C2', 'D2', 'G2', 'A2', 'D2'];
  const PIN_TUNE = ['B4 D5 G5', 'F#5 . D5', 'B4 D5 G5', 'E5 . C5', 'D5 F#5 A5', 'G5 . D5', 'C#5 E5 A5', 'F#5 . D5'];
  function playPinata(bar, t0) {
    bass(t0, N(PIN_BASS[bar % 8]), 0.1); for (const b of [1, 2]) { pluck(t0 + b * BEAT + rand() * 0.02, N(PIN_BASS[bar % 8]) + 16, 0.02); pluck(t0 + b * BEAT, N(PIN_BASS[bar % 8]) + 19, 0.016); }
    PIN_TUNE[bar % 8].split(' ').forEach((n, e) => { if (n !== '.') { voice(t0 + e * BEAT, hz(N(n)), 'square', 0.012, BEAT * 0.8, out(), 2400); } });
    if (bar % 8 === 7) brush(t0 + 2 * BEAT, 0.05, 1200, 0.3);
  }
  // the Warren: the music box in the square. A lullaby in three, a little out of tune, its spring tired so it drags
  // (slower every night till somebody fixes it). A low hum of the earth under it, the odd tick of a wind-up toy
  const WARREN_CH = [['F2', 'F3 A3 C4'], ['C2', 'E3 G3 C4'], ['D2', 'D3 F3 A3'], ['A1', 'C3 E3 A3'], ['Bb1', 'D3 F3 Bb3'], ['F2', 'C3 F3 A3'], ['G1', 'Bb2 D3 G3'], ['C2', 'E3 G3 Bb3']];
  const WARREN_TUNE = ['C5 . A4 . F4 .', 'G4 . . . E4 .', 'F4 . A4 . D5 .', 'C5 . . . . .', 'D5 . Bb4 . F4 .', 'A4 . C5 . F4 .', 'G4 . Bb4 . D5 .', 'C5 . . . E4 .'];
  function playWarren(bar, t0) {
    const [root, chord] = WARREN_CH[bar % 8], notes = chord.split(' ').map(N), tired = !(typeof world !== 'undefined' && world.flags && world.flags.musicBoxFixed);
    voice(t0, hz(N(root)), 'sine', 0.05, 2.6 * BEAT, out());
    for (const b of [1, 2]) for (const n of notes) musicbox(t0 + b * BEAT + (tired ? rand() * 0.04 : 0), n + 12, 0.007);
    const tune = WARREN_TUNE[bar % 8].split(' ');
    tune.forEach((n, e) => { if (n !== '.') musicbox(t0 + e * BEAT / 2 + (tired ? e * 0.012 : 0), N(n) + (tired && rand() < 0.12 ? -1 : 0), 0.038); });
    // a bit livelier (10/15/2026): a light pluck on the "pah" of the oom-pah-pah, a thimble tapped on the
    // beat, and where the tune rests at the end of a bar, a soft note leading into the next one
    pluck(t0 + 2 * BEAT, N(root) + 19, 0.016);
    brush(t0, 0.010, 4200, 0.035); brush(t0 + BEAT, 0.005, 5600, 0.03); brush(t0 + 2 * BEAT, 0.006, 5600, 0.03);
    const next = WARREN_TUNE[(bar + 1) % 8].split(' ')[0];
    if (tune[5] === '.' && next !== '.') {
      const lead = Math.max(...[0, 12, 24, 36].flatMap(o => notes.map(n => n + o)).filter(m => m < N(next)));   // the chord's note just under it
      musicbox(t0 + 2.5 * BEAT, lead, 0.018);
    }
    if (rand() < 0.35) { const tt = t0 + rand() * 2 * BEAT; voice(tt, 2600 + rand() * 300, 'square', 0.003, 0.03, out(), 4000); }   // somebody's spring ticking
  }
  // the deep tunnels: dark, a low drone, drips, the Grime gurgling somewhere off
  function playWarrenDeep(bar, t0) {
    voice(t0, hz(N(bar % 2 ? 'D2' : 'C#2')), 'sine', 0.06, 4 * BEAT * 0.95, out());
    pad(t0, N('A2'), 4 * BEAT, 0.006);
    if (rand() < 0.6) { const tt = t0 + rand() * 4 * BEAT; voice(tt, 1400 + rand() * 600, 'sine', 0.012, 0.15, out()); }        // a drip
    if (bar % 4 === 2) { const tt = t0 + BEAT; brush(tt, 0.03, 220, 0.5); }                                                     // a gurgle, far off
  }
  // the bear, meeting him (10/20/2026, from "The bear, meeting him" in Music studies): three beats instead of Home's four,
  // a lower wooden lead instead of the music box, and the chord held under him instead of rolling. His little figure is
  // a note said twice, a breath, then a step up and an answer. Friendly, nothing hiding in it yet. The flute answers him in
  // the gaps the second time round
  const BEAR_CH = [['G2', 'G3 B3 D4'], ['E2', 'E3 G3 B3'], ['C2', 'C3 E3 G3'], ['D2', 'D3 F#3 A3'], ['G2', 'G3 B3 D4'], ['E2', 'E3 G3 B3'], ['A2', 'A3 C4 E4'], ['D2', 'D3 F#3 A3'],
                   ['G2', 'G3 B3 D4'], ['E2', 'E3 G3 B3'], ['C2', 'C3 E3 G3'], ['D2', 'D3 F#3 A3'], ['G2', 'G3 B3 D4'], ['C2', 'C3 E3 G3'], ['D2', 'D3 F#3 A3 C4'], ['G2', 'G3 B3 D4']];
  const BEAR_TUNE = ['B4 B4 . E5 - D5', 'B4 - - . . .', 'A4 A4 . D5 - C5', 'A4 - - . . D4', 'B4 B4 . E5 - G5', 'E5 - D5 . B4 .', 'C5 - A4 . B4 C5', 'D5 - - . . .',
                     'B4 B4 . E5 - D5', 'B4 - - . G4 A4', 'A4 A4 . D5 - E5', 'F#5 - - . E5 D5', 'D5 B4 . G4 - A4', 'E5 - - . D5 C5', 'B4 - A4 . F#4 A4', 'G4 - - - . .'];
  // his lead: a soft mallet on wood (a damped triangle with a knock on the front). Held notes ring a little longer
  function wood(t, m, dur, vol = 0.05) { voice(t, hz(m), 'triangle', vol, Math.min(0.9, 0.35 + dur * 0.5), out(), 1300); voice(t, hz(m) * 0.5, 'sine', vol * 0.35, 0.5, out()); brush(t, vol * 0.18, 1800, 0.02); }
  function playBear(bar, t0) {
    const E = BEAT / 2, [root, ch] = BEAR_CH[bar], line = BEAR_TUNE[bar].split(' ');
    feltPiano(t0, N(root), 0.05);
    for (const m of ch.split(' ').map(N)) pad(t0, m, 6 * E, 0.011);                     // the chord held under him, the whole bar
    for (let e = 0; e < line.length; e++) {
      const n = line[e]; if (n === '.' || n === '-') continue;
      let len = 1; while (e + len < line.length && line[e + len] === '-') len++;
      wood(t0 + e * E, N(n), len * E, 0.036);
    }
    const fl = pass % 2 ? { 1: ['G5', 'A5'], 7: ['F#5', 'A5'], 9: ['G5', 'E5'] }[bar] : null;
    if (fl) fl.forEach((n, k) => flute(t0 + (3.2 + k * 1.1) * E, N(n), E * 0.9, 0.022));
  }
  // each region gets its own song. wind: up in the oak
  const SONGS = { title: { beat: 60 / 80, swing: 0.5, bar: playTitle }, home: { beat: 60 / 92, swing: 0.5, bar: playHome }, jazz: { beat: 60 / 108, swing: 0.63, bar: (b, t) => playBar(b, t) }, wind: { beat: 1, swing: 0.5, bar: playWind },
    rootwood: { beat: 60 / 70, swing: 0.5, bar: playRoot }, soldier: { beat: 60 / 116, swing: 0.5, bar: playMarch }, bear: { beat: 60 / 96, swing: 0.5, bar: playBear, beats: 3 },
    pond: { beat: 60 / 96, swing: 0.56, bar: playPond }, deep: { beat: 60 / 72, swing: 0.5, bar: playDeep }, sailboat: { beat: 60 / 132, swing: 0.6, bar: playShanty },
    tangle: { beat: 60 / 100, swing: 0.5, bar: playTangle }, swan: { beat: 60 / 150, swing: 0.5, bar: playWaltz, beats: 3 },
    playground: { beat: 60 / 84, swing: 0.5, bar: playDusk, beats: 3 }, top: { beat: 60 / 160, swing: 0.5, bar: playPolka }, marionette: { beat: 60 / 120, swing: 0.5, bar: playPuppet, beats: 3 },
    clown: { beat: 60 / 128, swing: 0.55, bar: playCircus },
    oak: { beat: 60 / 66, swing: 0.5, bar: playOak }, warren: { get beat() { return 60 / (typeof world !== 'undefined' && world.flags && world.flags.musicBoxFixed ? 82 : 68); }, swing: 0.5, bar: playWarren, beats: 3 }, warrendeep: { beat: 60 / 60, swing: 0.5, bar: playWarrenDeep }, yoyo: { beat: 60 / 150, swing: 0.55, bar: playYoyo }, kite: { beat: 60 / 108, swing: 0.5, bar: playKite }, greenhouse: { beat: 60 / 74, swing: 0.5, bar: playGreenhouse }, bramble: { beat: 60 / 132, swing: 0.5, bar: playBramble }, hive: { beat: 60 / 96, swing: 0.55, bar: playHive }, worm: { beat: 60 / 138, swing: 0.55, bar: playWorm }, pinata: { beat: 60 / 160, swing: 0.5, bar: playPinata, beats: 3 } };
  function tick() {
    if (!actx || actx.state !== 'running') return;
    if (stingT && actx.currentTime < stingT - 0.25) return;     // let the fanfare ring out
    if (want !== song && !(atBar && song)) { song = want; step = 0; pass = 0; nextT = Math.max(actx.currentTime + 0.05, stingT || 0); }
    stingT = 0;
    if (!song) return;                                           // quiet (a scene stopped the music)
    let S2 = SONGS[song]; BEAT = S2.beat; SWING = S2.swing;
    // behind (the page stopped running for a while but the sound card's clock didn't: a debugger pause, the browser
    // stalling it): the bars it missed are skipped without playing them, the song carrying on from where it would be
    // by now. It used to play every one it missed all at once, the longer the pause the more (the performance audit, 10/18/2026)
    const late = actx.currentTime - 0.1;
    while (nextT < actx.currentTime + 0.3) {
      if (atBar && want !== song) {                              // a room change: the new song starts where the old one's bar ends
        atBar = false; retire(0.5, nextT); song = want; step = 0; pass = 0;
        if (!song) return;
        S2 = SONGS[song]; BEAT = S2.beat; SWING = S2.swing;
        if (nextT < late) nextT = actx.currentTime + 0.05;       // (that bar's long gone: the new song starts now instead)
      }
      if (nextT < late) {                                        // whole bars missed: counted past in one go, nothing played
        const len = (S2.beats || 4) * BEAT, n = Math.ceil((late - nextT) / len);
        nextT += n * len; step += n; pass += Math.floor(step / 16); step %= 16;
        continue;
      }
      S2.bar(step, nextT);
      nextT += (S2.beats || 4) * BEAT; step++;
      if (step >= 16) { step = 0; pass++; }
    }
  }
  function start() {
    if (!actx || timer || !on) return;
    out(); master.gain.value = level();
    nextT = actx.currentTime + 0.15; step = 0;
    timer = setInterval(tick, 60); tick();
  }
  function stop() { clearInterval(timer); timer = null; if (master) master.gain.setTargetAtTime(0, actx.currentTime, 0.1); }
  return {
    start, stop,
    get on() { return on; },
    toggle() {
      on = !on; try { localStorage.setItem('phill-forgotten-music', on ? 'on' : 'off'); } catch (e) {}
      if (on) { audio(); if (master) master.gain.setTargetAtTime(level(), actx.currentTime, 0.1); start(); } else stop();
    },
    // switch songs (null: quiet). how: left out, straight away (scenes and bosses: the old song's notes fade in a blink).
    // 'bar': wait for the old song's next bar, then it fades as the new one starts (going room to room; if that bar's more
    // than a second and a half off it fades out sooner instead). A number: fade the old one over that many seconds, the
    // new one coming in halfway through (the title menu into the game)
    play(name, how) {
      if (name === undefined || (name !== null && !SONGS[name])) return;
      if (name === want && !(atBar && name === song)) return;
      atBar = false;
      const live = actx && timer && actx.state === 'running' && song;
      if (!live) { want = name; return; }
      if (how === 'bar' && name && nextT - actx.currentTime <= 1.5) { want = name; atBar = name !== song; return; }
      const secs = typeof how === 'number' ? how : how === 'bar' ? 0.6 : 0.12;
      retire(secs); want = song = name; step = 0; pass = 0; nextT = actx.currentTime + (typeof how === 'number' ? secs * 0.5 : how === 'bar' ? 0.3 : 0.05); tick();
    },
    get song() { return want; },
    mute(m) { if (master) master.gain.setTargetAtTime(m || !on ? 0 : 0.5 * VOL.music, actx.currentTime, 0.05); },
    __render(bars, from, name) { master = null; bus = null; out(); master.gain.value = 0.5; pass = from || 0; const S2 = SONGS[name || 'home']; BEAT = S2.beat; SWING = S2.swing; let tt = 0.1; for (let b = 0; b < bars; b++) { S2.bar(b % 16, tt); tt += (S2.beats || 4) * BEAT; if (b % 16 === 15) pass++; } },   // testing: lay bars out on an offline context
  };
})();
