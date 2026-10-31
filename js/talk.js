'use strict';
// ---------- talking ----------
// Everyone but Phill talks. Their words come up a letter at a time in a box at the bottom, with a little sound for
// their voice. X goes on. Phill answers by nodding or shaking his head.
// Each of them talks at their own pace with their own sound (a friend's playtest, 10/14/2026: they all sounded like
// the same voice): the squirrel fast and chittery, the snail slow and low, and so on. A sound written into a line
// between stars (*chk chk*, *brrrup*) shows in their color without the stars, and makes that noise as it comes up
let talk = null;
const VOICE = {
  squirrel: { name: 'squirrel', col: '#e8b07a', speed: 62, every: 2, blip: () => sfx.chitter(1), noise: () => { sfx.chitter(1.5); setTimeout(() => sfx.chitter(1.6), 70); setTimeout(() => sfx.chitter(1.4), 140); } },
  beetle: { name: 'beetle', col: '#d8a070', speed: 34, every: 3, blip: () => sfx.click(), noise: () => { sfx.click(); setTimeout(() => sfx.click(), 110); } },
  snail: { name: 'snail', col: '#c8b48a', speed: 22, every: 4, blip: () => sfx.snailTalk(), noise: () => sfx.snailHum() },
  bullfrog: { name: 'bullfrog', col: '#a8c070', speed: 30, every: 3, blip: () => sfx.frogTalk(), noise: () => sfx.croak() },
  monkey: { name: 'old monkey', col: '#e0b070', speed: 46, every: 3, blip: () => sfx.monkeyTalk(), noise: () => sfx.clang() },
  owl: { name: 'owl', col: '#d8c0a0', speed: 36, every: 4, blip: () => sfx.owlTalk(), noise: () => sfx.hoot() },
  crow: { name: 'the crow', col: '#b0a0e0', speed: 40, every: 3, blip: () => sfx.crowTalk(), noise: () => sfx.caw(0.7) },
  bear: { name: 'the bear', col: '#d8b88a', speed: 32, every: 3, blip: () => sfx.bearTalk(), noise: () => sfx.bearTalk() },   // (10/20/2026: no name yet, he never got one)
};
// "*kraa* There." -> the text without the stars, and where the sound words are in it
// A face written into a line in square brackets ([amused], [worried], [idle] for back to normal) isn't shown either:
// it's where the speaker's face changes, as the words get to it (10/31/2026). It lasts till the next one or the end
// of the talk. Anyone with that face drawn shows it (talkFace below), anyone without just keeps their own
function parseTalk(raw) {
  let text = '', spans = [], at = -1, faces = [];
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === '[') {
      const m = /^\[([a-z]+)\]/.exec(raw.slice(i));
      if (m) { faces.push([text.length, m[1]]); i += m[0].length - 1; if ((!text || text.endsWith(' ')) && raw[i + 1] === ' ') i++; continue; }
    }
    if (ch === '*') { if (at < 0) at = text.length; else { spans.push([at, text.length]); at = -1; } continue; }
    text += ch;
  }
  return { text, spans, faces };
}
function startTalk(who, raw, extra) {
  const ps = raw.map(parseTalk);
  talk = Object.assign({ who, lines: ps.map(p => p.text), spans: ps.map(p => p.spans), faces: ps.map(p => p.faces), i: 0, n: 0, t: 0, blipN: 0, played: 0 }, extra || {});
  talkIn.press = 0;
}
// the face whoever's talking has on right now ('amused', 'worried'...), or null for their own. who: their voice
function talkFace(who) {
  const tk = talk; if (!tk || tk.who !== who || !tk.faces) return null;
  let face = null;
  for (let li = 0; li <= tk.i; li++) for (const [pos, f] of tk.faces[li] || []) if (li < tk.i || pos <= tk.n) face = f;
  return face === 'idle' ? null : face;
}
// a sprite's frame with that face on, if there's a picture for it (squirrel_talk_1_amused, or squirrel_amused for
// one that does for every frame), else the frame as it was
function withFace(fr, who, kind = who) {
  const f = talkFace(who); if (!f) return fr;
  for (const name of [fr + '_' + f, kind + '_' + f]) if (sprSource(name)[1]) return name;
  return fr;
}
// a scene step: says the lines, done when the last one's been read
const say = (who, ...lines) => t => {
  if (t === 0) startTalk(who, lines);
  return !talk;
};
// the same, with the box at the top of the screen, for when Phill's down at the bottom and would be under it (10/30/2026)
const sayTop = (who, ...lines) => t => {
  if (t === 0) startTalk(who, lines, { top: true });
  return !talk;
};
// a scene step: a question with choices. pick(i) is called with what he chose (back out = the last one)
const ask = (who, line, options, pick) => t => {
  if (t === 0) { startTalk(who, [line], { options, sel: 0, pick }); talkIn.up = talkIn.down = talkIn.back = 0; }
  return !talk;
};
function updateTalk(dt) {
  if (!talk) { if (!sceneText) talkIn.press = talkIn.up = talkIn.down = talkIn.back = 0; return; }
  const tk = talk, line = tk.lines[tk.i];
  tk.t += dt;
  if (tk.n < line.length) {
    const v = VOICE[tk.who], every = (v && v.every) || 3, spans = (tk.spans && tk.spans[tk.i]) || [];
    tk.n = Math.min(line.length, tk.n + dt * ((v && v.speed) || 42));
    const k = Math.floor(tk.n);
    while (tk.played < spans.length && k > spans[tk.played][0]) { if (v && v.noise) v.noise(); tk.played++; }   // a sound word coming up
    const inSound = spans.some(([a, b]) => k > a && k <= b);
    if (Math.floor(tk.n / every) > tk.blipN) { tk.blipN = Math.floor(tk.n / every); if (v && !inSound && line[k - 1] !== ' ') v.blip(); }
  }
  const done = tk.n >= line.length;
  if (tk.options && done) {
    if (talkIn.up) tk.sel = (tk.sel + tk.options.length - 1) % tk.options.length, sfx.tick();
    if (talkIn.down) tk.sel = (tk.sel + 1) % tk.options.length, sfx.tick();
    if (talkIn.back) { tk.sel = tk.options.length - 1; talkIn.press = 1; }
  }
  if (talkIn.press && tk.t > 0.15) {
    if (!done) tk.n = line.length;
    else if (tk.options) { talk = null; sfx.tick(); tk.pick(tk.sel); }
    else if (++tk.i >= tk.lines.length) talk = null;
    else { tk.n = 0; tk.blipN = 0; tk.played = 0; }
  }
  talkIn.press = talkIn.up = talkIn.down = talkIn.back = 0;
}
function wrapText(text, w) {
  const words = text.split(' '), out = []; let cur = '';
  for (const wd of words) { const tryS = cur ? cur + ' ' + wd : wd; if (ctx.measureText(tryS).width > w && cur) { out.push(cur); cur = wd; } else cur = tryS; }
  if (cur) out.push(cur);
  return out;
}
function drawTalk() {
  if (!talk) return;
  const tk = talk, v = VOICE[tk.who] || { name: tk.who, col: '#e8e6f0' };
  ctx.font = '600 8px "Pixelify Sans", ui-monospace, monospace';
  const w = Math.min(420, VW - 40), x = Math.round((VW - w) / 2), LH = 12;
  const shown = tk.lines[tk.i].slice(0, Math.floor(tk.n));
  const rows = wrapRead(tk.lines[tk.i], w - 24), opt = tk.options && tk.n >= tk.lines[tk.i].length ? tk.options : null;
  const h = 30 + rows.length * LH + (opt ? opt.length * LH + 6 : 0), y = tk.top ? 34 : VH - h - 34;
  ctx.fillStyle = 'rgba(8,9,14,0.9)'; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#3a3448'; ctx.fillRect(x, y, w, 1); ctx.fillRect(x, y + h - 1, w, 1); ctx.fillRect(x, y, 1, h); ctx.fillRect(x + w - 1, y, 1, h);
  ctx.fillStyle = v.col; ctx.fillText(v.name, x + 12, y + 13);                     // who's talking stays in the UI font
  let left = shown.length, at = 0;                                                  // the words themselves in the reading font
  const spans = (tk.spans && tk.spans[tk.i]) || [];
  rows.forEach((row, i) => {
    const part = row.slice(0, Math.max(0, left)); left -= row.length + 1;
    let rx = x + 12, run = '', runSound = null;
    const flush = () => { if (run) { readText(run, rx, y + 29 + i * LH, runSound ? v.col : '#f0ece2'); rx += readWidth(run) + FONT_GAP; run = ''; } };
    for (let c = 0; c < part.length; c++) {
      const snd = spans.some(([a, b]) => at + c >= a && at + c < b);                  // sound words in the speaker's color
      if (snd !== runSound) { flush(); runSound = snd; }
      run += part[c];
    }
    flush(); at += row.length + 1;
  });
  if (opt) opt.forEach((o, i) => readText((i === tk.sel ? '> ' : '  ') + o, x + 18, y + 35 + rows.length * LH + i * LH, i === tk.sel ? '#ffd36b' : '#9aa0bb'));
  else if (tk.n >= tk.lines[tk.i].length && Math.floor(performance.now() / 300) % 2) { ctx.fillStyle = '#9aa0bb'; ctx.fillText('v', x + w - 16, y + h - 6); }
}
