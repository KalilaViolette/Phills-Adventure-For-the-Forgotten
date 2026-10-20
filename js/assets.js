'use strict';
// ---------- pictures: loaded when something needs them, thrown away when nothing does ----------
// Every room (and Phill) says which pictures it's using. A picture stays loaded while anything is still using it,
// and gets freed the moment the last user lets go, so memory doesn't creep up over a long play session.
// A room's pictures (the room, its parallax layers, the bits in front) come packed in one file, stacked up: the room
// file says where each part sits. A part is asked for as "art/<region>/<room>.png#L0" and comes back cut out on its
// own canvas. Once every part a room asked for is cut out, the packed picture itself is let go.
const Assets = (() => {
  const imgs = new Map();   // src -> { im, n (how many things are using it), ok, err }  (and for a pack: parts, rects, cut)
  const rects = new Map();  // pack src -> { part: [x, y, w, h] }
  function pack(src, parts) { if (src && parts) rects.set(src, parts); }
  function split(src) { const i = src.indexOf('#'); return i < 0 ? [src, null] : [src.slice(0, i), src.slice(i + 1)]; }
  function cut(e) {                                                    // cut out every part that's been asked for and not cut yet
    const r = rects.get(e.src) || {};
    for (const part of e.want) {
      if (e.parts.has(part) || !r[part]) continue;
      const [x, y, w, h] = r[part], c = document.createElement('canvas');
      c.width = w; c.height = h; c.getContext('2d').drawImage(e.im, x, y, w, h, 0, 0, w, h);
      e.parts.set(part, c);
    }
    e.cut = true;
    e.im.onload = e.im.onerror = null; e.im.removeAttribute('src');   // the packed picture's done its job: drop the decoded pixels
  }
  function load(e) {
    const im = new Image(); e.im = im; e.ok = e.err = false; e.cut = false;
    im.onload = () => { e.ok = true; if (e.parts) cut(e); };
    im.onerror = () => { e.err = true; console.warn('could not load', e.src); };
    im.src = e.src + (window.BUILD ? (e.src.includes('?') ? '&' : '?') + 'v=' + window.BUILD : '');   // (the build tag: a fresh copy after every update)
  }
  function use(src) {
    const [base, part] = split(src);
    let e = imgs.get(base);
    if (!e) {
      e = { src: base, n: 0, ok: false, err: false };
      if (part) { e.parts = new Map(); e.want = new Set(); }
      imgs.set(base, e); load(e);
    }
    e.n++;
    if (part) {
      e.want.add(part);
      if (e.ok && !e.parts.has(part)) { if (e.cut) load(e); else cut(e); }   // asked for after the pack was already cut up: load it again
    }
    return e.im;
  }
  function release(src) {
    const [base] = split(src);
    const e = imgs.get(base);
    if (!e) return;
    if (--e.n > 0) return;
    e.im.onload = e.im.onerror = null;
    e.im.removeAttribute('src');   // lets the browser drop the decoded picture
    if (e.parts) { for (const c of e.parts.values()) { c.width = c.height = 0; } e.parts.clear(); }
    imgs.delete(base);
  }
  const get = src => { const [base, part] = split(src); const e = imgs.get(base); if (!e) return null; if (part) return e.parts.get(part) || null; return e.ok ? e.im : null; };
  const ready = src => { if (!src) return true; const [base, part] = split(src); const e = imgs.get(base); return !!(e && (e.err || (part ? e.parts.has(part) : e.ok))); };
  function stats() {   // for the debug view
    let bytes = 0; const list = [];
    for (const [src, e] of imgs) {
      let b = 0;
      if (e.parts) { for (const c of e.parts.values()) b += c.width * c.height * 4; if (e.ok && !e.cut) b += e.im.naturalWidth * e.im.naturalHeight * 4; }
      else if (e.ok) b = e.im.naturalWidth * e.im.naturalHeight * 4;
      bytes += b; list.push({ src, n: e.n, b, ok: e.ok });
    }
    return { count: imgs.size, bytes, list };
  }
  return { use, release, get, ready, stats, pack };
})();
