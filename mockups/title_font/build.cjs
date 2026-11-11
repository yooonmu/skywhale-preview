// 타이틀 로고 글꼴 · 로고타입 시안 생성기 → index.html + logos/*.svg (움직임 없는 내보내기용, 투명 바탕)
// 손글씨 로고는 OFL 글꼴의 글자 외곽선을 패스로 바꾼 뒤 음절마다 색 · 기울기 · 겹(남색 테 · 크림 테 · 물감 면 · 금빛 실선)을 따로 입힌 벡터 그림이다.
// 실행: NODE_PATH=<opentype.js 1.3.4가 있는 node_modules> node design/mockups/feedback70/title_font/build.cjs
const fs = require('fs');
const path = require('path');
const ot = require('opentype.js');

const HERE = __dirname;
const F = n => ot.loadSync(path.join(HERE, 'fonts', n));
const GB = F('gowunbatang/GowunBatang-Bold.ttf');
const GBR = F('gowunbatang/GowunBatang-Regular.ttf');
const GD = F('gowundodum/GowunDodum-Regular.ttf');
const SM = F('songmyung/SongMyung-Regular.ttf');
const NB = F('nanumbrushscript/NanumBrushScript-Regular.ttf');

const INK = '#3b2c7a';
const RAIN = ['#ff8aa8', '#ffb36b', '#ffe07a', '#8fe0a6', '#7cc8ff', '#a68cff', '#e49cff'];
const SUB = '하늘을 물들이는 소녀들';
const R = v => Math.round(v * 100) / 100;

// ---------- 글자 → 패스 ----------
// 음절마다 패스 하나. 잉크 상자(bbox)로 높이를 맞추고 가운데에 둔다
function word(font, text, h, cx, cy, track = 0) {
  const probe = (size) => {
    let x = 0; const items = [];
    for (const ch of text) {
      if (ch === ' ') { x += size * 0.32 + track; continue; }
      const g = font.charToGlyph(ch);
      const p = g.getPath(x, 0, size);
      items.push({ ch, p, bb: p.getBoundingBox() });
      x += g.advanceWidth * size / font.unitsPerEm + track;
    }
    const bb = items.reduce((a, i) => ({ x1: Math.min(a.x1, i.bb.x1), y1: Math.min(a.y1, i.bb.y1), x2: Math.max(a.x2, i.bb.x2), y2: Math.max(a.y2, i.bb.y2) }), { x1: 1e9, y1: 1e9, x2: -1e9, y2: -1e9 });
    return { items, bb };
  };
  const base = probe(100);
  const size = 100 * h / (base.bb.y2 - base.bb.y1);
  const w = probe(size);
  const dx = cx - (w.bb.x1 + w.bb.x2) / 2, dy = cy - (w.bb.y1 + w.bb.y2) / 2;
  return {
    size, width: w.bb.x2 - w.bb.x1, x1: w.bb.x1 + dx, x2: w.bb.x2 + dx, y1: w.bb.y1 + dy, y2: w.bb.y2 + dy,
    syl: w.items.map(i => {
      const p = new ot.Path();
      for (const c of i.p.commands) {
        const m = { ...c };
        for (const k of ['x', 'y', 'x1', 'y1', 'x2', 'y2']) if (k in m) m[k] += k.startsWith('x') ? dx : dy;
        p.commands.push(m);
      }
      return { ch: i.ch, d: p.toPathData(2), cx: R((i.bb.x1 + i.bb.x2) / 2 + dx), cy: R((i.bb.y1 + i.bb.y2) / 2 + dy) };
    }),
  };
}

// 글자 폭 (SVG <text> + letter-spacing 용, 부제 옆 금선 자리)
function advance(font, text, size, spacing) {
  let x = 0;
  for (const ch of text) x += font.charToGlyph(ch).advanceWidth * size / font.unitsPerEm + spacing;
  return x - spacing;
}

// ---------- 공통 조각 ----------
function goldGrad(id, x1 = 0, x2 = 900) {
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="0" x2="${x2}" y2="0"><stop offset="0" stop-color="#c99a2e"/><stop offset=".3" stop-color="#ffe7a6"/><stop offset=".5" stop-color="#e3b54a"/><stop offset=".72" stop-color="#fff3c9"/><stop offset="1" stop-color="#c99a2e"/></linearGradient>`;
}
function rainGrad(id, x1, x2, y1 = 0, y2 = 0) {
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${RAIN.map((c, i) => `<stop offset="${R(i / 6)}" stop-color="${c}"/>`).join('')}</linearGradient>`;
}
// 물감 번짐: 가장자리를 살짝 흔들고, 테두리 쪽은 진하게 고이고, 종이 결 알갱이를 얹는다
function wcFilter(id, seed, scale = 3.2) {
  return `<filter id="${id}" x="-8%" y="-15%" width="116%" height="130%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="${seed}" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="d"/>
<feMorphology in="d" operator="erode" radius="1.6" result="er"/>
<feComposite in="d" in2="er" operator="out" result="rim"/>
<feColorMatrix in="rim" type="matrix" values=".72 0 0 0 0  0 .66 0 0 0  0 0 .8 0 0  0 0 0 .6 0" result="rimD"/>
<feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="1" seed="${seed + 11}" result="g"/>
<feColorMatrix in="g" type="matrix" values="0 0 0 0 .25  0 0 0 0 .18  0 0 0 0 .45  0 0 -1.4 0 .62" result="ga"/>
<feComposite in="ga" in2="d" operator="in" result="grain"/>
<feMerge><feMergeNode in="d"/><feMergeNode in="grain"/><feMergeNode in="rimD"/></feMerge></filter>`;
}
function blurFilter(id, sd) {
  return `<filter id="${id}" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;
}
// 네 갈래 반짝이 (r = 빛살 길이)
function star(x, y, r, cls = '', delay = 0, fill = '#fffbe6') {
  const k = r * 0.22;
  return `<g transform="translate(${R(x)} ${R(y)})"><path class="${cls}" style="animation-delay:${delay}s" fill="${fill}" d="M0 ${-r}Q${k} ${-k} ${r} 0Q${k} ${k} 0 ${r}Q${-k} ${k} ${-r} 0Q${-k} ${-k} 0 ${-r}Z"/></g>`;
}
// 게임의 작은 붓 (title.gd _draw_brush와 같은 170x30 모양)
function brush(x, y, rot, s, tip) {
  const body = (off, shade) => `<g transform="translate(0 ${off})">
<rect x="0" y="11" width="94" height="8" rx="4" fill="${shade || INK}"/>
<rect x="96" y="7" width="22" height="16" rx="2" fill="${shade || '#e3b54a'}"/>
<path d="M118 7C138 4 156 9 170 15C156 21 138 26 118 23Z" fill="${shade || tip}"/></g>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body(3, 'rgba(59,44,122,.55)')}${body(0)}
<rect x="6" y="12.5" width="38" height="2" fill="#8b74e8"/><rect x="100" y="7" width="3" height="16" fill="#fff3c9"/>
<path d="M121 12L160 14" stroke="#fff" stroke-opacity=".7" stroke-width="1.5" stroke-linecap="round"/></g>`;
}
// 부제 옆 금빛 가는 선 두 줄 (게임과 같은 70px, 바깥으로 흐려짐)
function subLines(p, half, y = 221) {
  return `<linearGradient id="${p}ln" x1="0" x2="1"><stop offset="0" stop-color="#ffe7a6" stop-opacity="0"/><stop offset="1" stop-color="#ffe7a6"/></linearGradient>
<rect x="${R(450 - half - 16 - 70)}" y="${y}" width="70" height="2" fill="url(#${p}ln)"/>
<rect x="${R(450 + half + 16)}" y="${y}" width="70" height="2" fill="url(#${p}ln)" transform="rotate(180 ${R(450 + half + 51)} ${y + 1})"/>`;
}
// 부제를 패스로 (흰 면 + 옅은 남색 테 + 그림자)
function subPath(p, font, h, track, fill = '#fff') {
  const w = word(font, SUB, h, 450, 222, track);
  const d = w.syl.map(s => s.d).join('');
  return { half: w.width / 2, svg: `<path d="${d}" fill="rgba(46,35,80,.75)" stroke="rgba(46,35,80,.75)" stroke-width="4" stroke-linejoin="round" transform="translate(0 2)"/>
<path d="${d}" fill="${fill}" stroke="rgba(59,44,122,.6)" stroke-width="4" stroke-linejoin="round" paint-order="stroke"/>` };
}
// 겹 하나: 음절 패스들을 각자 기울이고 띄워 같은 칠로 그린다
function layer(w, attrs, tf = []) {
  return w.syl.map((s, i) => {
    const t = tf[i] || {};
    const tr = `translate(0 ${t.dy || 0}) rotate(${t.r || 0} ${s.cx} ${s.cy})`;
    const a = typeof attrs === 'function' ? attrs(i) : attrs;
    return `<path transform="${tr}" d="${s.d}" ${a}/>`;
  }).join('');
}
function clipOf(id, w, tf) {
  return `<clipPath id="${id}">${layer(w, '', tf)}</clipPath>`;
}
// 글자 면을 비스듬히 훑는 빛 (지금 게임 셰이더의 빛 줄기와 같은 생각)
function sweep(p, clip, y1, y2) {
  return `<linearGradient id="${p}sw" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<g clip-path="url(#${clip})" class="anim"><rect class="sweep" x="-160" y="${y1}" width="110" height="${y2 - y1}" fill="url(#${p}sw)" transform="skewX(-24)"/></g>`;
}

// ---------- 글꼴 시안: 지금과 같은 로고 대접(무지개 붓 자국 위 · 기울인 「레인보우」 · 큰 「아틀리에」 · 부제), 글꼴만 바꿔 <text>로 ----------
const FONT_OPTS = [
  { id: 'font_gowun_batang', dir: 'gowunbatang', name: '고운바탕', fam: 'TF-GowunBatang', w: 700, font: GB, big: 108, rb: 44, sub: 21, track: 2, stance: '붓으로 쓴 듯 끝이 둥근 바탕체. 두께가 지금의 절반쯤이라 「동화책 표지」 느낌으로 가장 안전하게 차분해진다.' },
  { id: 'font_song_myung', dir: 'songmyung', name: '송명', fam: 'TF-SongMyung', w: 400, font: SM, big: 112, rb: 46, sub: 22, track: 0, stance: '먹 번짐이 살아 있는 명조. 획 굵기 대비가 커서 가늘지만 멀리서도 형태가 또렷하고, 「아틀리에」의 예술 느낌이 가장 강하다.' },
  { id: 'font_gowun_dodum', dir: 'gowundodum', name: '고운돋움', fam: 'TF-GowunDodum', w: 400, font: GD, big: 118, rb: 46, sub: 22, track: 4, stance: '손맛이 남은 부드러운 돋움. 가장 가볍고 귀엽지만, 남색 테가 없으면 그림 위에서 약해 테를 조금 더 두껍게 줬다.' },
];
function fontLogo(p, o) {
  const subW = advance(o.font, SUB, o.sub, 4) / 2;
  const t = `font-family="${o.fam}" font-weight="${o.w}"`;
  return `<svg class="logo" viewBox="0 0 900 250" overflow="visible" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="${p}face" x1="0" y1="72" x2="0" y2="172" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff"/><stop offset=".75" stop-color="#fff1c9"/><stop offset="1" stop-color="#ffd27a"/></linearGradient>
${goldGrad(p + 'gold', 200, 700)}${blurFilter(p + 'halo', 7)}</defs>
<g filter="url(#${p}halo)" opacity=".45"><text x="450" y="125" ${t} font-size="${o.big}" text-anchor="middle" dominant-baseline="central" fill="${INK}" stroke="${INK}" stroke-width="18" stroke-linejoin="round">아틀리에</text></g>
<g transform="translate(233 57) rotate(-7) skewX(-13)"><text ${t} font-size="${o.rb}" text-anchor="middle" dominant-baseline="central" letter-spacing="2" fill="${INK}" stroke="${INK}" stroke-width="8" stroke-linejoin="round" transform="translate(0 3)">레인보우</text>
<text ${t} font-size="${o.rb}" text-anchor="middle" dominant-baseline="central" letter-spacing="2" fill="#fff8ec" stroke="${INK}" stroke-width="8" stroke-linejoin="round" paint-order="stroke">레인보우</text></g>
<text x="450" y="130" ${t} font-size="${o.big}" text-anchor="middle" dominant-baseline="central" letter-spacing="${o.track}" fill="${INK}" stroke="${INK}" stroke-width="14" stroke-linejoin="round">아틀리에</text>
<text x="450" y="125" ${t} font-size="${o.big}" text-anchor="middle" dominant-baseline="central" letter-spacing="${o.track}" fill="url(#${p}face)" stroke="${INK}" stroke-width="12" stroke-linejoin="round" paint-order="stroke">아틀리에</text>
<text x="450" y="125" ${t} font-size="${o.big}" text-anchor="middle" dominant-baseline="central" letter-spacing="${o.track}" fill="none" stroke="url(#${p}gold)" stroke-width="1.6">아틀리에</text>
<text x="450" y="222" ${t} font-size="${o.sub}" text-anchor="middle" dominant-baseline="central" letter-spacing="4" fill="#fff" stroke="rgba(59,44,122,.6)" stroke-width="4" stroke-linejoin="round" paint-order="stroke">${SUB}</text>
${subLines(p, subW)}</svg>`;
}

// ---------- 손글씨 로고 ----------
// C1 물감 붓글씨: 나눔손글씨 붓 외곽선을 바탕으로, 음절마다 무지개 물감 한 쌍이 번진 수채 붓글씨 + 가는 붓 자국 밑줄
function logoBrush(p, anim) {
  const big = word(NB, '아틀리에', 122, 462, 112, 6);
  const tf = [{ r: -4, dy: 3 }, { r: 2, dy: -4 }, { r: -2, dy: 2 }, { r: 4, dy: -3 }];
  const pairs = [['#ff9ab4', '#ffb36b'], ['#ffd36b', '#8fe0a6'], ['#7cc8ff', '#a68cff'], ['#b89cff', '#f0a0ff']];
  const small = word(NB, '레인보우', 48, 250, 40, 3);
  const stf = [{ r: -9, dy: 2 }, { r: -6, dy: 0 }, { r: -8, dy: -2 }, { r: -5, dy: -3 }];
  const sub = subPath(p, GD, 19, 4.2);
  // 붓 자국 밑줄: 중심선을 따라 두께가 마른 붓처럼 줄어드는 면
  const B = (t, a, b, c, d) => { const u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; };
  const P = [[118, 186], [300, 166], [560, 200], [800, 156]];
  const top = [], bot = [], mid = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const x = B(t, P[0][0], P[1][0], P[2][0], P[3][0]), y = B(t, P[0][1], P[1][1], P[2][1], P[3][1]);
    const half = 1.5 + 11 * Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.15)), 0.7) * (1 - 0.35 * t);
    mid.push([x, y]); top.push(`${R(x)} ${R(y - half)}`); bot.unshift(`${R(x)} ${R(y + half * 0.8)}`);
  }
  const swash = `M${top.join('L')}L${bot.join('L')}Z`;
  const sparks = anim ? [0.18, 0.42, 0.66, 0.9].map((t, i) => { const [x, y] = mid[Math.round(t * 40)]; return star(x, y - 4, 8, 'twinkle', i * 0.7); }).join('') : '';
  return `<svg class="logo" viewBox="0 0 900 250" overflow="visible" xmlns="http://www.w3.org/2000/svg">
<defs>${wcFilter(p + 'wc', 3)}${wcFilter(p + 'wc2', 9, 5)}${blurFilter(p + 'halo', 8)}${rainGrad(p + 'rain', 118, 800)}
${pairs.map((c, i) => `<linearGradient id="${p}g${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6ea"/><stop offset=".22" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('')}
${clipOf(p + 'clip', big, tf)}</defs>
<g filter="url(#${p}halo)" opacity=".4">${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="22" stroke-linejoin="round"`, tf)}</g>
<path d="${swash}" fill="url(#${p}rain)" opacity=".8" filter="url(#${p}wc2)"/>
${brush(792, 128, -24, 0.62, '#a68cff')}
${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="13" stroke-linejoin="round" opacity=".55"`, tf.map(t => ({ ...t, dy: (t.dy || 0) + 5 })))}
${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="12" stroke-linejoin="round"`, tf)}
${layer(big, `fill="#fffaf2" stroke="#fffaf2" stroke-width="5.5" stroke-linejoin="round"`, tf)}
<g filter="url(#${p}wc)">${layer(big, i => `fill="url(#${p}g${i})" stroke="url(#${p}g${i})" stroke-width="2.2" stroke-linejoin="round"`, tf)}</g>
${anim ? sweep(p, p + 'clip', 40, 190) : ''}
<g transform="translate(0 3)">${layer(small, `fill="${INK}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"`, stf)}</g>
${layer(small, `fill="#fff8ec" stroke="${INK}" stroke-width="8" stroke-linejoin="round" paint-order="stroke"`, stf)}
${RAIN.slice(0, 5).map((c, i) => `<circle cx="${R(small.x2 + 14 + i * 9)}" cy="${R(46 - i * 5 + (i % 2) * 4)}" r="${R(3.4 - i * 0.4)}" fill="${c}" stroke="${INK}" stroke-width="1.2"/>`).join('')}
${sparks}${sub.svg}${subLines(p, sub.half)}</svg>`;
}

// C2 고래 리본: 송명 「아틀리에」 + 금선 리본 위 「레인보우」 + 작은 고래가 꼬리로 하늘에 무지개 물감 줄을 그으며 지나간다
const WHALE = {
  body: 'M6 30C6 14 24 4 46 6C62 8 70 18 78 20L90 9C94 6 99 9 96 14L91 24L99 30C102 33 98 36 94 35L80 31C70 41 52 47 34 45C16 43 6 38 6 30Z',
  belly: 'M9 34C22 42 46 44 66 37C54 47 26 48 9 34Z',
  fin: 'M38 37C42 46 50 49 55 46C50 42 47 39 44 36Z',
};
function whale(x, y, s, flip) {
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
<path d="${WHALE.body}" transform="translate(0 3)" fill="rgba(46,35,80,.5)"/>
<path d="${WHALE.body}" fill="#b9a6ff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
<path d="${WHALE.belly}" fill="#fff4e0"/>
<path d="M14 18C24 10 40 9 52 12" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2.4" stroke-linecap="round"/>
<path d="${WHALE.fin}" fill="#9a84f0" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
<circle cx="21" cy="24" r="2.8" fill="${INK}"/><circle cx="20.2" cy="23.2" r=".9" fill="#fff"/>
<ellipse cx="28" cy="31" rx="4" ry="2.2" fill="#ff9ab4" opacity=".75"/>
<path d="M24 4C22 -3 18 -6 13 -7M24 4C26 -4 30 -7 35 -8" fill="none" stroke="#7cc8ff" stroke-width="2.4" stroke-linecap="round"/></g>`;
}
function logoRibbon(p, anim) {
  const big = word(SM, '아틀리에', 100, 446, 130, 10);
  // 리본: 위로 살짝 휜 띠 (가운데선 2차 곡선), 양 끝은 접혀 뒤로 넘어간 꼬리
  const A = [176, 60], C = [300, 26], Bp = [424, 60], half = 21;
  const q = (t) => { const u = 1 - t; return [u * u * A[0] + 2 * u * t * C[0] + t * t * Bp[0], u * u * A[1] + 2 * u * t * C[1] + t * t * Bp[1]]; };
  const tan = (t) => Math.atan2(2 * (1 - t) * (C[1] - A[1]) + 2 * t * (Bp[1] - C[1]), 2 * (1 - t) * (C[0] - A[0]) + 2 * t * (Bp[0] - C[0]));
  const tp = [], bt = [];
  for (let i = 0; i <= 24; i++) { const t = i / 24, [x, y] = q(t), a = tan(t); tp.push(`${R(x + Math.sin(a) * half)} ${R(y - Math.cos(a) * half)}`); bt.unshift(`${R(x - Math.sin(a) * half)} ${R(y + Math.cos(a) * half)}`); }
  const band = `M${tp.join('L')}L${bt.join('L')}Z`;
  const tail = (x, y, dir) => `<path d="M${x} ${y - 17}L${x + dir * 46} ${y - 13}L${x + dir * 34} ${y + 4}L${x + dir * 48} ${y + 21}L${x} ${y + 21}Z" fill="#7d68d8" stroke="#ffe7a6" stroke-width="1.4" stroke-linejoin="round"/><path d="M${x} ${y + 21}L${x + dir * 10} ${y + 12}L${x + dir * 10} ${y - 6}Z" fill="#4e3d9e"/>`;
  const rb = word(SM, '레인보우', 30, 300, 41, 0);
  const rtf = rb.syl.map((s) => { const t = (s.cx - A[0]) / (Bp[0] - A[0]); const [, y] = q(t); return { r: R(tan(t) * 180 / Math.PI), dy: R(y - 41 - 1) }; });
  const trail = 'M700 44C610 70 560 24 470 50S300 52 214 92S126 160 96 176';
  const sub = subPath(p, SM, 19, 4.6);
  return `<svg class="logo" viewBox="0 0 900 250" overflow="visible" xmlns="http://www.w3.org/2000/svg">
<defs>${wcFilter(p + 'wc', 5, 4)}${blurFilter(p + 'halo', 7)}${goldGrad(p + 'gold', 220, 680)}
<linearGradient id="${p}face" x1="0" y1="80" x2="0" y2="180" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fffaf0"/><stop offset=".8" stop-color="#fff0c6"/><stop offset="1" stop-color="#ffd98e"/></linearGradient>
<linearGradient id="${p}band" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9c86f2"/><stop offset=".5" stop-color="#b6a2ff"/><stop offset="1" stop-color="#8b74e8"/></linearGradient>
${clipOf(p + 'clip', big)}</defs>
<g filter="url(#${p}wc)" opacity=".85" class="anim">${RAIN.slice(0, 6).map((c, i) => `<path class="flow" d="${trail}" transform="translate(0 ${(i - 2.5) * 5})" fill="none" stroke="${c}" stroke-width="5.4" stroke-linecap="round"/>`).join('')}</g>
<g filter="url(#${p}halo)" opacity=".45">${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="18" stroke-linejoin="round"`)}</g>
<g transform="translate(0 5)">${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="11" stroke-linejoin="round" opacity=".7"`)}</g>
${layer(big, `fill="url(#${p}face)" stroke="${INK}" stroke-width="10" stroke-linejoin="round" paint-order="stroke"`)}
${layer(big, `fill="none" stroke="url(#${p}gold)" stroke-width="1.5"`)}
${anim ? sweep(p, p + 'clip', 60, 200) : ''}
${tail(A[0] + 6, A[1] + 2, -1)}${tail(Bp[0] - 6, Bp[1] + 2, 1)}
<path d="${band}" transform="translate(0 3)" fill="rgba(46,35,80,.45)"/>
<path d="${band}" fill="url(#${p}band)" stroke="#ffe7a6" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M${tp.join('L')}" transform="translate(0 4)" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"/>
${layer(rb, `fill="#fff8ec" stroke="${INK}" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`, rtf)}
<g class="${anim ? 'bob' : ''}">${whale(796, 6, 1.02, true)}</g>
${anim ? star(808, 2, 7, 'twinkle', 0) + star(826, 22, 5, 'twinkle', 0.9) + star(130, 160, 7, 'twinkle', 1.6) : ''}
${sub.svg}${subLines(p, sub.half)}</svg>`;
}

// C3 금선 세리프: 고운바탕 가는 획 + 파스텔 면 + 금빛 실선 테, 가는 무지개 펜 선과 금빛 장식선
function logoSerif(p, anim) {
  const big = word(GBR, '아틀리에', 98, 450, 128, 26);
  const rb = word(GB, '레인보우', 25, 450, 44, 15);
  const sub = subPath(p, GB, 18.5, 6, '#fffaf2');
  const fl = (dir) => { const x0 = 450 + dir * (rb.width / 2 + 16); const x1 = x0 + dir * 120; return `<path d="M${x0} 44C${x0 + dir * 40} 38 ${x1 - dir * 50} 50 ${x1} 42C${x1 + dir * 12} 38 ${x1 + dir * 10} 30 ${x1} 31C${x1 - dir * 7} 32 ${x1 - dir * 6} 39 ${x1 + dir * 2} 40" fill="none" stroke="url(#${p}gold)" stroke-width="1.6" stroke-linecap="round"/><path d="M${x0 + dir * 4} 44l${dir * 5} -4l${dir * 5} 4l${dir * -5} 4Z" fill="#ffe7a6"/>`; };
  const under = (dir) => `<path d="M${450 + dir * 14} 186C${450 + dir * 80} 182 ${450 + dir * 170} 190 ${450 + dir * 236} 184" fill="none" stroke="url(#${p}gold)" stroke-width="1.5" stroke-linecap="round"/>`;
  return `<svg class="logo" viewBox="0 0 900 250" overflow="visible" xmlns="http://www.w3.org/2000/svg">
<defs>${blurFilter(p + 'halo', 6)}${goldGrad(p + 'gold', 180, 720)}${rainGrad(p + 'rain', 236, 664)}
<linearGradient id="${p}face" x1="0" y1="80" x2="0" y2="176" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fffdf8"/><stop offset=".45" stop-color="#f6eeff"/><stop offset=".75" stop-color="#ffe3ee"/><stop offset="1" stop-color="#ffe7a6"/></linearGradient>
${clipOf(p + 'clip', big)}</defs>
<path d="M236 70Q450 -36 664 70" fill="none" stroke="rgba(46,35,80,.35)" stroke-width="7" stroke-linecap="round"/>
<path d="M236 70Q450 -36 664 70" fill="none" stroke="url(#${p}rain)" stroke-width="3.4" stroke-linecap="round"/>
<path d="M236 70Q450 -36 664 70" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/>
<g filter="url(#${p}halo)" opacity=".55">${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="16" stroke-linejoin="round"`)}${layer(rb, `fill="${INK}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"`)}</g>
<g transform="translate(0 4)">${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="8" stroke-linejoin="round" opacity=".65"`)}</g>
${layer(big, `fill="url(#${p}face)" stroke="${INK}" stroke-width="7" stroke-linejoin="round" paint-order="stroke"`)}
${layer(big, `fill="none" stroke="url(#${p}gold)" stroke-width="1.7"`)}
${anim ? sweep(p, p + 'clip', 60, 200) : ''}
${layer(rb, `fill="#fff3c9" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round" paint-order="stroke"`)}
${fl(-1)}${fl(1)}${under(-1)}${under(1)}
<path d="M450 178l7 8l-7 8l-7 -8Z" fill="url(#${p}gold)" stroke="${INK}" stroke-width="1.2"/>
${anim ? star(big.x1 + 4, big.y1 + 6, 8, 'twinkle', 0) + star(big.x2 - 6, big.y1 + 2, 10, 'twinkle', 1.1) + star(664, 70, 6, 'twinkle', 2) + star(236, 70, 6, 'twinkle', 2.6) : ''}
${sub.svg}${subLines(p, sub.half, 226)}</svg>`;
}

// C4 동화책: 고운돋움을 살짝만 통통하게, 음절마다 파스텔 사탕 색 · 통통 튀는 기울기, 「레인보우」는 금테 구름 위
function logoStory(p, anim) {
  const big = word(GD, '아틀리에', 106, 452, 126, 8);
  const tf = [{ r: -5, dy: 4 }, { r: 3, dy: -4 }, { r: -2, dy: 3 }, { r: 5, dy: -3 }];
  const fills = [['#ffe0e8', '#ff8aa8'], ['#fff0cc', '#ffb36b'], ['#e2f8ea', '#6fd39a'], ['#ece6ff', '#a68cff']];
  const rbc = ['#f5769c', '#f39a3c', '#46ad7c', '#7c64e0'];
  const rb = word(GD, '레인보우', 30, 268, 40, 4);
  const cloud = [[200, 46, 22], [232, 32, 26], [270, 26, 28], [306, 32, 24], [334, 46, 20], [268, 52, 24], [222, 54, 18], [314, 54, 18]];
  const circles = (a) => cloud.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${a}/>`).join('');
  const sub = subPath(p, GD, 19, 4.2);
  return `<svg class="logo" viewBox="0 0 900 250" overflow="visible" xmlns="http://www.w3.org/2000/svg">
<defs>${blurFilter(p + 'halo', 7)}
${fills.map((c, i) => `<linearGradient id="${p}f${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('')}
${clipOf(p + 'clip', big, tf)}</defs>
<g filter="url(#${p}halo)" opacity=".42">${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="22" stroke-linejoin="round"`, tf)}</g>
${layer(big, `fill="${INK}" stroke="${INK}" stroke-width="16" stroke-linejoin="round" opacity=".55"`, tf.map(t => ({ ...t, dy: t.dy + 5 })))}
${big.syl.map((s, i) => `<g class="${anim ? 'hop' : ''}" style="animation-delay:${i * 0.18}s">${layer({ syl: [s] }, `fill="${INK}" stroke="${INK}" stroke-width="15" stroke-linejoin="round"`, [tf[i]])}${layer({ syl: [s] }, `fill="#fffaf2" stroke="#fffaf2" stroke-width="8.5" stroke-linejoin="round"`, [tf[i]])}${layer({ syl: [s] }, `fill="url(#${p}f${i})" stroke="url(#${p}f${i})" stroke-width="3.2" stroke-linejoin="round"`, [tf[i]])}</g>`).join('')}
${anim ? sweep(p, p + 'clip', 50, 200) : ''}
<g transform="translate(0 3)">${circles('fill="rgba(46,35,80,.45)"')}</g>${circles('fill="none" stroke="#e3b54a" stroke-width="5"')}${circles('fill="#fffaf2"')}
${layer(rb, i => `fill="${rbc[i]}" stroke="${rbc[i]}" stroke-width="1.4" stroke-linejoin="round"`, [{ r: -6 }, { r: 2 }, { r: -3 }, { r: 5 }])}
${brush(694, 46, -30, 0.55, '#ffb36b')}
${[[690, 92, '#ff8aa8'], [705, 104, '#ffe07a'], [176, 168, '#7cc8ff']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="5" fill="${c}" stroke="${INK}" stroke-width="1.6"/>`).join('')}
${anim ? star(big.x1 - 8, big.y1 + 18, 9, 'twinkle', 0) + star(big.x2 + 6, big.y2 - 14, 8, 'twinkle', 1) + star(360, 20, 6, 'twinkle', 1.8) : ''}
${sub.svg}${subLines(p, sub.half)}</svg>`;
}

const CUSTOM = [
  { id: 'logo_brush', name: '물감 붓글씨', fn: logoBrush, base: 'nanumbrushscript', baseName: '나눔손글씨 붓', rec: true,
    stance: '「하늘을 물들이는」 그 자체. 음절마다 무지개 물감 한 쌍이 크림 테 안에서 번지고, 그 아래 가는 붓 자국이 마르며 끝난다. 획이 가늘어 무겁지 않은데, 남색 테 + 크림 테 두 겹이라 그림 위에서도 또렷하다.',
    motion: '6초마다 빛 한 줄이 글자 면을 훑고, 붓 자국을 따라 반짝이 넷이 차례로 켜졌다 꺼진다.' },
  { id: 'logo_ribbon', name: '고래 리본', fn: logoRibbon, base: 'songmyung', baseName: '송명',
    stance: '금선 두른 라벤더 리본에 「레인보우」, 오른쪽 위 작은 구름고래가 꼬리로 하늘에 무지개 물감 줄을 그으며 지나간다. 이야기(고래 위의 분교)를 로고 안에 담은 안.',
    motion: '고래가 천천히 오르내리고, 무지개 줄이 꼬리 쪽에서 흘러나오듯 흐른다. 고래 물줄기 옆에서 반짝.' },
  { id: 'logo_serif', name: '금선 세리프', fn: logoSerif, base: 'gowunbatang', baseName: '고운바탕',
    stance: '가장 가늘고 고급스러운 안. 넓게 띄운 바탕체 「아틀리에」에 크림 → 라벤더 → 복숭아 → 금빛 면과 금빛 실선 테, 위에는 펜으로 그은 가는 무지개, 아래는 금빛 장식선 · 마름모.',
    motion: '금빛 면 위로 빛이 천천히 훑고, 무지개 양 끝과 글자 모서리에서 별이 반짝인다.' },
  { id: 'logo_story', name: '동화책', fn: logoStory, base: 'gowundodum', baseName: '고운돋움',
    stance: '그림책 표지처럼 통통 튀는 사탕 색 음절과 금테 구름 위의 「레인보우」. 지금 로고보다 획은 가늘지만 가장 귀엽고 밝다 (대신 가장 「게임 로고」스럽다).',
    motion: '음절이 하나씩 차례로 통 튀고, 빛이 훑고, 구름 둘레에 별이 반짝인다.' },
];

const FONTS = [
  { dir: 'gowunbatang', name: '고운바탕 (Gowun Batang)', who: 'Yanghee Ryu (류양희)', files: ['GowunBatang-Regular.ttf', 'GowunBatang-Bold.ttf'], src: 'https://fonts.google.com/specimen/Gowun+Batang', repo: 'https://github.com/google/fonts/tree/main/ofl/gowunbatang' },
  { dir: 'songmyung', name: '송명 (Song Myung)', who: 'JIKJI', files: ['SongMyung-Regular.ttf'], src: 'https://fonts.google.com/specimen/Song+Myung', repo: 'https://github.com/google/fonts/tree/main/ofl/songmyung' },
  { dir: 'gowundodum', name: '고운돋움 (Gowun Dodum)', who: 'Yanghee Ryu (류양희)', files: ['GowunDodum-Regular.ttf'], src: 'https://fonts.google.com/specimen/Gowun+Dodum', repo: 'https://github.com/google/fonts/tree/main/ofl/gowundodum' },
  { dir: 'nanumbrushscript', name: '나눔손글씨 붓 (Nanum Brush Script)', who: 'Sandoll / NAVER (NHN)', files: ['NanumBrushScript-Regular.ttf'], src: 'https://fonts.google.com/specimen/Nanum+Brush+Script', repo: 'https://github.com/google/fonts/tree/main/ofl/nanumbrushscript', note: 'Reserved Font Name 「Nanum」: 글꼴 파일을 고쳐 다시 배포할 때만 이름을 바꿔야 함 (로고 그림 · 그대로 넣기는 무관)' },
];
const fontOf = d => FONTS.find(f => f.dir === d);
const licLine = f => `<span class="lic">${f.name} · ${f.who} · <b>SIL OFL 1.1</b> (상업 게임 내장 · 로고 그림 사용 가능) · <a href="${f.src}">${f.src}</a> · 파일 <a href="fonts/${f.dir}/OFL.txt">fonts/${f.dir}/OFL.txt</a></span>`;

// ---------- 화면 ----------
const shot = (w, plate, svg) => `<figure><div class="shot s${w}"><div class="stage" style="width:${w}px;background-image:url(plates/${plate}_${w}.png)"><div class="box" style="left:${w / 2 - 405}px">${svg}</div></div></div><figcaption>${w}×720</figcaption></figure>`;
const shots = (plate, mk) => `<div class="pair">${shot(1280, plate, mk('a'))}${shot(1600, plate, mk('b'))}</div>`;

const sections = [];
sections.push(`<section class="opt now" data-choice="now" data-choice-group="lettering" data-choice-label="지금 (Pretendard Bold + 굵게)">
<h2><span class="tag">지금</span> Pretendard Bold + embolden</h2>
<p class="stance">비교용. 게임에서 방금 찍은 그대로 (scripts/title.gd, 시안 A). 획이 두껍고 둥글어 무겁다는 피드백.</p>
<div class="pair"><figure><img class="cap" src="plates/now_1280.png" alt=""><figcaption>1280×720</figcaption></figure><figure><img class="cap c1600" src="plates/now_1600.png" alt=""><figcaption>1600×720</figcaption></figure></div></section>`);
sections.push('<h1 class="part">A. 글꼴만 바꾸기 <small>지금 로고 그대로 (무지개 붓 자국 · 기울인 「레인보우」 · 흰→금빛 면 · 남색 테) — 글꼴만, 가는 획에 맞게 테 · 그림자를 손봄</small></h1>');
FONT_OPTS.forEach((o, i) => {
  sections.push(`<section class="opt" id="${o.id}" data-choice="${o.id}" data-choice-group="lettering" data-choice-label="A${i + 1} 글꼴 · ${o.name}">
<h2><span class="tag">A${i + 1}</span> ${o.name}</h2><p class="stance">${o.stance}</p>
${shots('plate', s => fontLogo(`${o.id}_${s}_`, o))}
<p class="spec" style="font-family:${o.fam};font-weight:${o.w}">레인보우 아틀리에 · ${SUB}</p>${licLine(fontOf(o.dir))}</section>`);
});
sections.push('<h1 class="part">B. 그려 만든 로고 <small>글자 외곽선을 패스로 바꾼 뒤 음절마다 손질한 벡터 그림 (SVG) — 붓 자국 · 붓도 로고와 한 몸으로 다시 그림</small></h1>');
CUSTOM.forEach((o, i) => {
  const f = fontOf(o.base);
  sections.push(`<section class="opt${o.rec ? ' rec' : ''}" id="${o.id}" data-choice="${o.id}" data-choice-group="lettering" data-choice-label="B${i + 1} 로고 · ${o.name}${o.rec ? ' (PD 확정)' : ''}">
<h2><span class="tag">B${i + 1}</span> ${o.name}${o.rec ? ' <span class="star">PD 확정</span>' : ''}</h2><p class="stance">${o.stance}</p>
${shots('bare', s => o.fn(`${o.id}_${s}_`, true))}
<p class="motion"><b>살짝 움직임</b> ${o.motion} <span class="dim">(이 페이지는 CSS로 보여 줌 · 게임에서는 title_logo_text 셰이더의 빛 줄기 + 작은 Tween으로 같은 동작)</span></p>
<p class="file">내보내기 원본: <a href="logos/${o.id}.svg">logos/${o.id}.svg</a> (투명 · 900×250 · 움직임 없음) — 바탕 외곽선: ${licLine(f)}</p></section>`);
});

const EM = require('./emblems.cjs')({ word, layer, wcFilter, star, brush, whale, goldGrad, logoBrush, INK, RAIN, R, NB, GB });

const fontFaces = [
  ['TF-GowunBatang', 'gowunbatang/GowunBatang-Regular.ttf', 400], ['TF-GowunBatang', 'gowunbatang/GowunBatang-Bold.ttf', 700],
  ['TF-SongMyung', 'songmyung/SongMyung-Regular.ttf', 400], ['TF-GowunDodum', 'gowundodum/GowunDodum-Regular.ttf', 400],
  ['TF-NanumBrush', 'nanumbrushscript/NanumBrushScript-Regular.ttf', 400],
].map(([f, u, w]) => `@font-face{font-family:${f};src:url("fonts/${u}") format("truetype");font-weight:${w};font-display:block}`).join('\n');

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>타이틀 로고 글꼴 · 로고타입 시안</title>
<style>
${fontFaces}
:root{--ink:#3b2c7a;--soft:#6d6496;--cream:#fffaf2;--lav:#8f7be8;--lav2:#e9e3ff;--gold:#c99a2e;--line:#e3dcf5}
*{box-sizing:border-box}
body{margin:0;background:linear-gradient(#f6f0ff,#fffaf2);color:var(--ink);font:15px/1.6 "Pretendard","Malgun Gothic",sans-serif;padding:28px 32px 60px}
header h1{margin:0 0 4px;font-size:26px}
header p{margin:2px 0;color:var(--soft)}
h1.part{font-size:20px;margin:40px 0 10px;padding-top:14px;border-top:2px solid var(--line)}
h1.part small{display:block;font-size:13px;font-weight:400;color:var(--soft)}
.opt{background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px 20px 14px;margin:16px 0;box-shadow:0 2px 0 #ece6fb}
.opt.rec{border:2px solid #e3b54a;box-shadow:0 0 0 4px #fff3c9}
.opt h2{margin:0 0 4px;font-size:19px}
.tag{display:inline-block;background:var(--ink);color:#fff;border-radius:6px;padding:0 8px;margin-right:6px;font-size:14px}
.star{background:linear-gradient(90deg,#e3b54a,#ffe7a6);color:var(--ink);border-radius:20px;padding:1px 10px;font-size:13px;margin-left:6px}
.stance{margin:2px 0 10px}
.pair{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start}
figure{margin:0}figcaption{font-size:12px;color:var(--soft)}
.shot{overflow:hidden;border-radius:8px;height:calc(720px * var(--k));position:relative}
.s1280{width:calc(1280px * var(--k))}.s1600{width:calc(1600px * var(--k))}
:root{--k:.5}
@media (min-width:1560px){:root{--k:.6}}
@media (max-width:760px){:root{--k:.24}body{padding:16px 10px 40px}.opt{overflow-x:auto;padding:12px}}
.stage{height:720px;transform:scale(var(--k));transform-origin:0 0;background-size:100% 100%;position:absolute;left:0;top:0}
.box{position:absolute;top:6px;width:810px;height:225px}
.box svg{width:810px;height:225px;display:block}
img.cap{width:calc(1280px * var(--k));border-radius:8px;display:block}img.cap.c1600{width:calc(1600px * var(--k))}
.spec{font-size:30px;margin:8px 0 2px}
.lic{font-size:12.5px;color:var(--soft)}.lic a{color:#5b47b8}
.motion,.file{font-size:13.5px;margin:6px 0 0}.dim{color:var(--soft)}
table{border-collapse:collapse;font-size:13px;margin-top:8px}td,th{border:1px solid var(--line);padding:4px 8px;text-align:left}
/* 살짝 움직임 */
.sweep{animation:sweep 6s ease-in-out infinite}
@keyframes sweep{0%{transform:skewX(-24deg) translateX(0)}35%,100%{transform:skewX(-24deg) translateX(1200px)}}
.twinkle{transform-box:fill-box;transform-origin:center;animation:tw 3.2s ease-in-out infinite;opacity:0}
@keyframes tw{0%,100%{opacity:0;transform:scale(.3) rotate(0)}18%{opacity:1;transform:scale(1) rotate(20deg)}40%{opacity:0;transform:scale(.4) rotate(45deg)}}
.bob{animation:bob 3.6s ease-in-out infinite}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
.flow{stroke-dasharray:300 26;animation:flow 2.8s linear infinite}
@keyframes flow{to{stroke-dashoffset:-326}}
.hop{animation:hop 4s ease-in-out infinite}
@keyframes hop{0%,20%,100%{transform:translateY(0)}8%{transform:translateY(-6px)}14%{transform:translateY(1px)}}
@media (prefers-reduced-motion:reduce){.sweep,.twinkle,.bob,.flow,.hop{animation:none}}
${EM.css}
</style></head><body>
<header><h1>「레인보우 아틀리에」 타이틀 로고 — 로고 마크 시안 (C) · 글자 시안 (A/B)</h1>
<p><b>PD 확정: 글자는 B1 물감 붓글씨.</b> 남은 결정은 C의 로고 마크 하나 (마크 없음 포함). 마크가 정해지면 B1과 함께 게임 타이틀에 넣는다.</p>
<p>바탕은 지금 게임 타이틀을 같은 상태로 새로 찍은 그림 (tools/title_font_plate_capture.gd · 1280 / 1600). A안은 지금 붓 자국을 남기고 글자만 숨긴 바탕, B안은 로고 전체를 숨긴 바탕 위에 새 로고를 같은 자리 · 같은 크기(900×250 상자 × 0.9)로 얹었다.</p>
<p>나머지 UI 글꼴은 Pretendard 그대로. 게임 코드는 PD가 고를 때까지 바꾸지 않음.</p></header>
${EM.html}
<h1 class="part">지난 시안 — 글자 (참고) <small>B1으로 확정됨. 비교용으로 남겨 둠</small></h1>
${sections.join('\n')}
<h1 class="part">글꼴 라이선스</h1>
<table><tr><th>글꼴</th><th>만든 이</th><th>라이선스</th><th>받은 곳</th><th>파일</th></tr>
${FONTS.map(f => `<tr><td>${f.name}</td><td>${f.who}</td><td>SIL OFL 1.1${f.note ? `<br><span class="dim">${f.note}</span>` : ''}</td><td><a href="${f.src}">${f.src}</a><br><a href="${f.repo}">${f.repo}</a></td><td>${f.files.map(x => `<a href="fonts/${f.dir}/${x}">fonts/${f.dir}/${x}</a>`).join('<br>')}<br><a href="fonts/${f.dir}/OFL.txt">OFL.txt</a></td></tr>`).join('')}
</table>
<script>/* ?only=<data-choice>: 한 안만 보기 (캡처 · 비교용) */
const only = new URLSearchParams(location.search).get('only');
if (only) document.querySelectorAll('body > *').forEach(e => { if (e.dataset.choice !== only) e.style.display = 'none'; });</script>
<p class="dim" style="font-size:13px">OFL 1.1: 상업 게임에 묶어 넣기 · 판매 허용, 글꼴 파일만 따로 파는 것은 금지, 고친 글꼴을 배포하면 같은 라이선스 · Reserved Font Name 금지. B안처럼 글자 외곽선을 그림(로고)으로 만든 결과물은 글꼴 배포가 아니어서 제약 없음 — 게임에 넣을 때는 OFL.txt 고지를 크레딧/라이선스 화면에 함께 둔다.</p>
</body></html>`;

fs.writeFileSync(path.join(HERE, 'index.html'), html);
fs.mkdirSync(path.join(HERE, 'logos'), { recursive: true });
for (const o of CUSTOM) fs.writeFileSync(path.join(HERE, 'logos', `${o.id}.svg`), `<?xml version="1.0" encoding="UTF-8"?>\n` + o.fn(`${o.id}_`, false).replace('<svg class="logo" viewBox="0 0 900 250" overflow="visible"', '<svg viewBox="-20 -20 940 290" width="940" height="290"'));
for (const [n, s] of Object.entries(EM.files)) fs.writeFileSync(path.join(HERE, 'logos', n), s);
console.log('built', sections.length, 'sections +', Object.keys(EM.files).length, 'mark files');
