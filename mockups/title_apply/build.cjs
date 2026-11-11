// 타이틀 로고 반영 생성기: PD 확정 C4 「붓과 리본」 마크(다듬은 판) + B1 물감 붓글씨
// → svg/*.svg (원본 · 투명) + assets/brand/logo/*.png (게임용 2배 래스터, SVG 필터를 미리 구움) + 아이콘 + 비교 페이지 index.html
// 모두 손으로 좌표를 잡은 벡터 패스 (AI 래스터 없음). 금색은 실선(≤1.2)으로만 — 등급 규칙.
// 실행: NODE_PATH=<opentype.js 1.3.4 · @resvg/resvg-js가 있는 node_modules> node design/mockups/feedback70/title_apply/build.cjs
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const K = require('../title_font/build.cjs');
const { word, layer, wcFilter, blurFilter, goldGrad, logoBrush, INK, RAIN, R, GB } = K;

const HERE = __dirname;
const ROOT = path.resolve(HERE, '../../../..');
const OUT = path.join(ROOT, 'assets/brand/logo');
const CREAM = '#fffaf2';
const SHADE = 'rgba(46,35,80,.42)';

// ---------- 붓과 리본 마크 (마크 좌표: 중심 120,118 · 판 반지름 97 · 틀 -12..252) ----------
const C = [120, 118];
const ARC = [118, 152];            // 무지개 원의 중심 (게임 셰이더도 이 점 기준으로 그린다)
const RO = 70, BAND = 6.5;          // 무지개 바깥 반지름 · 띠 하나 두께 (여섯 띠)
// 붓: 자루 끝 H → 붓끝 T. 게임에서 끄덕임 축은 H
const H = [236, 24], T = [168, 150];
const BRUSH_ROT = Math.atan2(T[1] - H[1], T[0] - H[0]) * 180 / Math.PI;
const BRUSH_S = Math.hypot(T[0] - H[0], T[1] - H[1]) / 172;

// 0~1 사이 값을 늘 같게 흔드는 가짜 난수 (다시 만들어도 같은 그림)
let seed = 7;
const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

// 원 둘레 점 (위쪽 반원: θ=π 왼발 → 0 오른발)
const arcPt = (r, th) => [ARC[0] + r * Math.cos(th), ARC[1] - r * Math.sin(th)];

// 무지개 한 획: 바깥/안쪽 가장자리를 손으로 그은 듯 살짝 흔들고, 끝(붓 쪽)은 물감이 고여 조금 부푼다
function rainbowPath(rOut, rIn, wob) {
  const n = 64, top = [], bot = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, th = Math.PI * (1 - t);
    const w = wob * Math.sin(t * 9.4 + 1.3) + wob * 0.6 * Math.sin(t * 23 + 0.4);
    const swell = 1.6 * Math.pow(t, 6);
    top.push(arcPt(rOut + w + swell, th)); bot.unshift(arcPt(rIn + w * 0.7 - swell, th));
  }
  return `M${top.map(p => `${R(p[0])} ${R(p[1])}`).join('L')}L${bot.map(p => `${R(p[0])} ${R(p[1])}`).join('L')}Z`;
}
function arcStroke(r, t0, t1) {
  const a = arcPt(r, Math.PI * (1 - t0)), b = arcPt(r, Math.PI * (1 - t1));
  return `M${R(a[0])} ${R(a[1])}A${r} ${r} 0 0 1 ${R(b[0])} ${R(b[1])}`;
}
// 뭉게구름: 동그라미 여러 개를 한 덩어리로 (위는 크림, 아래로 라벤더 그늘)
function cloud(p, id, parts, small) {
  const circ = (a) => parts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${a}/>`).join('');
  const ys = parts.map(q => q[1] - q[2]), ye = parts.map(q => q[1] + q[2]);
  const y0 = Math.min(...ys), y1 = Math.max(...ye);
  return `<linearGradient id="${p}${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#fdf8ff"/><stop offset=".82" stop-color="#eadff9"/><stop offset="1" stop-color="#d9c8f4"/></linearGradient>
<g transform="translate(0 2.4)" opacity=".5">${circ(`fill="${small ? INK : 'rgba(46,35,80,.55)'}"`)}</g>
${small ? `<g>${circ(`fill="${INK}" stroke="${INK}" stroke-width="5"`)}</g>` : ''}
${circ(`fill="url(#${p}${id})"`)}
${small ? '' : parts.slice(0, 3).map(([x, y, r]) => `<path d="M${R(x - r * 0.62)} ${R(y - r * 0.32)}A${r * 0.72} ${r * 0.72} 0 0 1 ${R(x + r * 0.2)} ${R(y - r * 0.7)}" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".9"/>`).join('')}`;
}
// 네 갈래 반짝이
const starD = (r) => { const k = r * 0.2; return `M0 ${-r}Q${k} ${-k} ${r} 0Q${k} ${k} 0 ${r}Q${-k} ${k} ${-r} 0Q${-k} ${-k} 0 ${-r}Z`; };
const sparkle = (x, y, r, a = 1) => `<g transform="translate(${x} ${y})" opacity="${a}"><circle r="${R(r * 0.55)}" fill="#fff" opacity=".35"/><path d="${starD(r)}" fill="#fffdf2"/></g>`;

// 다듬은 붓 (자루 끝이 원점, +x 쪽 172 길이에 붓끝): 칠한 자루 · 진주빛 물림쇠 · 무지개 물감이 묻은 털
function brushArt(p, small) {
  const hy = (x) => 3.2 + 2.0 * Math.min(1, x / 92);                 // 자루 반폭: 끝은 가늘고 물림쇠 쪽이 굵다
  const handle = `M0 ${R(-hy(0))}${[8, 24, 48, 72, 92].map(x => `L${x} ${R(-hy(x))}`).join('')}L92 ${R(hy(92))}${[72, 48, 24, 8, 0].map(x => `L${x} ${R(hy(x))}`).join('')}A${R(hy(0))} ${R(hy(0))} 0 0 1 0 ${R(-hy(0))}Z`;
  const ferrule = 'M90 -6.2L120 -5.4L120 5.4L90 6.2Z';
  const bristle = 'M118 -5.6C128 -7.6 140 -7.4 152 -4.6C162 -2.4 168 -0.6 173 0.6C167 2.4 160 4.6 150 6.2C138 7.8 127 7.2 118 5.6Z';
  const tipPaint = 'M136 -6.9C146 -5.8 156 -3.4 162 -1.8C167 -0.4 170 0.2 173 0.6C167 2.4 160 4.6 150 6.2C144 7 139 7.2 136 7.2Z';
  const ol = small ? 3.2 : 1.7;
  const outline = `<g fill="${INK}" stroke="${INK}" stroke-width="${ol * 2}" stroke-linejoin="round"><path d="${handle}"/><path d="${ferrule}"/><path d="${bristle}"/></g>`;
  if (small) {
    return `<g transform="translate(2.5 3.5)" opacity=".45">${outline}</g>${outline}
<path d="${handle}" fill="#7a63dc"/><path d="${ferrule}" fill="#efe8ff"/><path d="${bristle}" fill="#f4ead8"/>
<path d="${tipPaint}" fill="#a68cff"/><path d="M144 -3.6L170 0.4" stroke="#ff8aa8" stroke-width="2.6" stroke-linecap="round"/><path d="M142 2.2L166 1.6" stroke="#7cc8ff" stroke-width="2.6" stroke-linecap="round"/>`;
  }
  const streak = (y0, y1, c, w, o) => `<path d="M${140} ${y0}C152 ${y0 + (y1 - y0) * 0.4} 162 ${y1 * 0.6} 172 0.6" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${o}"/>`;
  return `<defs>
<linearGradient id="${p}hdl" x1="0" y1="-6" x2="0" y2="6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#a48ff6"/><stop offset=".38" stop-color="#6e57d4"/><stop offset="1" stop-color="#36277c"/></linearGradient>
<linearGradient id="${p}fer" x1="0" y1="-6" x2="0" y2="6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#f3eefc"/><stop offset=".7" stop-color="#cfc3ef"/><stop offset="1" stop-color="#9c8bd6"/></linearGradient>
<linearGradient id="${p}hair" x1="118" y1="0" x2="173" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7efe0"/><stop offset=".25" stop-color="#e9dcc4"/><stop offset=".42" stop-color="#d8c8ea"/><stop offset="1" stop-color="#8f74ee"/></linearGradient>
<linearGradient id="${p}hairV" x1="0" y1="-7" x2="0" y2="7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#2e2350" stop-opacity=".3"/></linearGradient>
<clipPath id="${p}bc"><path d="${bristle}"/></clipPath></defs>
<g transform="translate(2.6 3.6)" opacity=".38">${outline}</g>${outline}
<path d="${handle}" fill="url(#${p}hdl)"/>
<path d="M6 -2.6L88 -3.8" stroke="#fff" stroke-opacity=".6" stroke-width="1.3" stroke-linecap="round"/>
<path d="M10 -3.6L10 3.6M15 -3.7L15 3.7" stroke="#fff3c9" stroke-width="1.1"/>
<rect x="10.6" y="-3.8" width="3.8" height="7.6" fill="#f4eefe"/>
<path d="${ferrule}" fill="url(#${p}fer)"/>
<path d="M94 -6.1L94 6.1M116 -5.5L116 5.5" stroke="#e3b54a" stroke-width="1"/>
<path d="M99 -5.8L99 5.8M103 -5.7L103 5.7" stroke="#8b78c8" stroke-opacity=".35" stroke-width=".8"/>
<path d="M92 -3.4L118 -3.0" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".9"/>
<path d="${bristle}" fill="url(#${p}hair)"/>
<g clip-path="url(#${p}bc)">
<path d="${tipPaint}" fill="#a68cff" opacity=".55"/>
${streak(-6.6, -3, '#ff8aa8', 2.4, .95)}${streak(-4.6, -1.6, '#ffb36b', 2, .9)}${streak(-2.4, -0.6, '#ffe07a', 2, .95)}${streak(-0.2, 0.3, '#8fe0a6', 2, .9)}${streak(2.2, 1.2, '#7cc8ff', 2.2, .95)}${streak(4.6, 2.4, '#a68cff', 2.4, .95)}
<path d="M120 -3.2C134 -4.4 150 -2.6 168 0.2M120 -0.6C136 -1 152 -0.2 170 0.6M120 2.4C136 3.2 150 2.6 166 1.4" fill="none" stroke="#5a4796" stroke-opacity=".22" stroke-width=".7"/>
<path d="${bristle}" fill="url(#${p}hairV)"/></g>
<path d="M122 -4.4C134 -6 146 -5 156 -2.8" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
<path d="M170.5 0.6C174 1 176.8 2.6 177 5.4C177.2 8 175.2 9.6 173 9.4C170.8 9.2 169.4 7.4 169.8 5.2C170.1 3.6 170.6 2.2 170.5 0.6Z" fill="#a68cff" stroke="${INK}" stroke-width="1.2"/>
<circle cx="172.4" cy="5.2" r="1" fill="#fff" opacity=".85"/>`;
}

// 리본: 웃는 곡선 띠 (가운데선 2차 곡선), 양 끝은 접혀 판 뒤로 넘어간 꼬리
const RA = [30, 170], RC = [120, 204], RB = [210, 170], RH = 15;
const rq = (t) => { const u = 1 - t; return [u * u * RA[0] + 2 * u * t * RC[0] + t * t * RB[0], u * u * RA[1] + 2 * u * t * RC[1] + t * t * RB[1]]; };
const rtan = (t) => Math.atan2(2 * (1 - t) * (RC[1] - RA[1]) + 2 * t * (RB[1] - RC[1]), 2 * (1 - t) * (RC[0] - RA[0]) + 2 * t * (RB[0] - RC[0]));
function ribbonBand(off = 0, h = RH) {
  const tp = [], bt = [];
  for (let i = 0; i <= 32; i++) { const t = i / 32, [x, y] = rq(t), a = rtan(t); tp.push([x + Math.sin(a) * h, y - Math.cos(a) * h + off]); bt.unshift([x - Math.sin(a) * h, y + Math.cos(a) * h + off]); }
  return { d: `M${tp.map(q => `${R(q[0])} ${R(q[1])}`).join('L')}L${bt.map(q => `${R(q[0])} ${R(q[1])}`).join('L')}Z`, tp, bt };
}
const edgeLine = (pts) => `M${pts.map(q => `${R(q[0])} ${R(q[1])}`).join('L')}`;
function ribbon(p) {
  const b = ribbonBand();
  const L0 = b.tp[0], L1 = b.bt[b.bt.length - 1], R0 = b.tp[b.tp.length - 1], R1 = b.bt[0];
  // 꼬리: 띠 끝에서 바깥 아래로, 끝은 V자로 판 홈
  const tail = (top, bot, dir) => {
    const x = top[0] - dir * 8, y0 = top[1] + 8, y1 = bot[1] + 10;
    const pts = [[x, y0], [x + dir * 34, y0 - 2], [x + dir * 24, (y0 + y1) / 2 + 1], [x + dir * 36, y1 + 4], [x, y1]];
    return `<path d="M${pts.map(q => `${R(q[0])} ${R(q[1])}`).join('L')}Z" fill="url(#${p}tail)" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M${pts.map(q => `${R(q[0])} ${R(q[1])}`).join('L')}Z" fill="none" stroke="#e3b54a" stroke-width="1" stroke-linejoin="round" transform="translate(${dir * 0} 0)" opacity=".9" clip-path="url(#${p}tailc${dir > 0 ? 'r' : 'l'})"/>
<path d="M${R(top[0])} ${R(top[1])}L${R(x)} ${R(y0)}L${R(x)} ${R(y1)}L${R(bot[0])} ${R(bot[1])}Z" fill="#3f2f8f" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>`;
  };
  const rib = word(GB, 'RAINBOW ATELIER', 9.6, 120, 187, 1.5);
  const rtf = rib.syl.map(g => { const t = (g.cx - RA[0]) / (RB[0] - RA[0]); const [, y] = rq(t); return { dy: R(y + 1.4 - 187), r: R(rtan(t) * 180 / Math.PI) }; });
  return {
    back: `${tail(L0, L1, -1)}${tail(R0, R1, 1)}`,
    front: `<path d="${b.d}" transform="translate(0 3)" fill="${SHADE}"/>
<path d="${b.d}" fill="url(#${p}band)" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/>
<g clip-path="url(#${p}bandc)"><path d="${ribbonBand(-RH * 0.5, RH * 0.55).d}" fill="#fff" opacity=".12"/><rect x="20" y="150" width="200" height="80" fill="url(#${p}paperFill)" filter="url(#${p}grain)" opacity=".2"/></g>
<path d="${edgeLine(ribbonBand(0, RH - 2.6).tp)}" fill="none" stroke="#e3b54a" stroke-width="1"/>
<path d="${edgeLine(ribbonBand(0, RH - 2.6).bt)}" fill="none" stroke="#e3b54a" stroke-width="1"/>
<path d="${edgeLine(ribbonBand(0, RH - 4.4).tp)}" fill="none" stroke="#fff" stroke-width=".9" opacity=".45"/>
<g transform="translate(0 1.1)" opacity=".6">${layer(rib, `fill="${INK}"`, rtf)}</g>
${layer(rib, `fill="${CREAM}"`, rtf)}`,
  };
}

const paperDefs = (p) => `<filter id="${p}grain" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 .2  0 0 0 0 .15  0 0 0 0 .42  0 0 -1.1 0 .62" result="g"/>
<feComposite in="g" in2="SourceGraphic" operator="in"/></filter>
<filter id="${p}fiber" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency=".03 .22" numOctaves="3" seed="11" result="n"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 -2.2 0 1.25" result="g"/>
<feComposite in="g" in2="SourceGraphic" operator="in"/></filter>
<linearGradient id="${p}paperFill"><stop offset="0" stop-color="#fff"/></linearGradient>`;

// 마크 한 장. o.small = 48~96px용 단순판, o.layers = 그릴 겹 (back · rain · front · brush)
function brushMark(p, o = {}) {
  const small = !!o.small;
  const want = (n) => !o.layers || o.layers.includes(n);
  seed = 7;
  const rib = small ? null : ribbon(p);
  const bands = RAIN.slice(0, 6).map((c, k) => ({ c, ro: RO - k * BAND, ri: RO - (k + 1) * BAND }));
  const rgStops = bands.map(b => `<stop offset="${R((b.ri + 0.9) / 72)}" stop-color="${b.c}"/><stop offset="${R((b.ro - 0.9) / 72)}" stop-color="${b.c}"/>`).reverse().join('');
  const defs = `<defs>${goldGrad(p + 'gold', 20, 220)}${paperDefs(p)}${wcFilter(p + 'wc', 15, 2.6, 0.35)}${blurFilter(p + 'b4', 4)}${blurFilter(p + 'b8', 8)}
<linearGradient id="${p}sky" gradientUnits="userSpaceOnUse" x1="0" y1="32" x2="0" y2="204"><stop offset="0" stop-color="#5644b4"/><stop offset=".28" stop-color="#7a64de"/><stop offset=".55" stop-color="#a58ffc"/><stop offset=".8" stop-color="#efc3e6"/><stop offset="1" stop-color="#ffe9cf"/></linearGradient>
<radialGradient id="${p}sun" gradientUnits="userSpaceOnUse" cx="74" cy="58" r="76"><stop offset="0" stop-color="#fff7e4" stop-opacity=".75"/><stop offset=".35" stop-color="#ffe9f4" stop-opacity=".3"/><stop offset="1" stop-color="#ffe9f4" stop-opacity="0"/></radialGradient>
<radialGradient id="${p}vig" gradientUnits="userSpaceOnUse" cx="120" cy="112" r="88"><stop offset=".72" stop-color="#2e2350" stop-opacity="0"/><stop offset="1" stop-color="#2e2350" stop-opacity=".42"/></radialGradient>
<radialGradient id="${p}rim" gradientUnits="userSpaceOnUse" cx="112" cy="104" r="100"><stop offset=".8" stop-color="#fffdf8"/><stop offset=".93" stop-color="#f6ecda"/><stop offset="1" stop-color="#e6d6bd"/></radialGradient>
<linearGradient id="${p}ring" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="216"><stop offset="0" stop-color="#57449e"/><stop offset=".5" stop-color="#3b2c7a"/><stop offset="1" stop-color="#2a1f5c"/></linearGradient>
<radialGradient id="${p}rain" gradientUnits="userSpaceOnUse" cx="${ARC[0]}" cy="${ARC[1]}" r="72">${rgStops}</radialGradient>
<linearGradient id="${p}band" gradientUnits="userSpaceOnUse" x1="0" y1="${RA[1] - RH}" x2="0" y2="${RC[1] + RH}"><stop offset="0" stop-color="#b9a7ff"/><stop offset=".45" stop-color="#9a83f4"/><stop offset="1" stop-color="#6c56d0"/></linearGradient>
<linearGradient id="${p}tail" gradientUnits="userSpaceOnUse" x1="0" y1="170" x2="0" y2="215"><stop offset="0" stop-color="#8b74e8"/><stop offset="1" stop-color="#5a46b8"/></linearGradient>
<clipPath id="${p}in"><circle cx="${C[0]}" cy="${C[1]}" r="86"/></clipPath>
<clipPath id="${p}bandc"><path d="${ribbonBand().d}"/></clipPath>
<clipPath id="${p}tailcl"><rect x="-20" y="150" width="70" height="80"/></clipPath><clipPath id="${p}tailcr"><rect x="190" y="150" width="70" height="80"/></clipPath>
</defs>`;
  let s = defs;
  if (want('back')) {
    s += `<ellipse cx="${C[0]}" cy="${C[1] + 8}" rx="98" ry="96" fill="#2e2350" opacity=".38" filter="url(#${p}b4)"/>`;
    if (rib) s += rib.back;
    s += `<circle cx="${C[0]}" cy="${C[1]}" r="${small ? 99 : 97}" fill="url(#${p}ring)"/>`;
    if (!small) s += `<path d="M38 84A88 88 0 0 1 202 84" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.6" stroke-linecap="round" transform="translate(0 -9) scale(1 1)"/>`;
    s += `<circle cx="${C[0]}" cy="${C[1]}" r="${small ? 89 : 92}" fill="url(#${p}rim)"/>`;
    if (!small) s += `<circle cx="${C[0]}" cy="${C[1]}" r="92" fill="url(#${p}paperFill)" filter="url(#${p}grain)" opacity=".25"/>
<circle cx="${C[0]}" cy="${C[1]}" r="89.4" fill="none" stroke="#e3b54a" stroke-width="1"/>`;
    s += `<circle cx="${C[0]}" cy="${C[1]}" r="${small ? 83 : 86}" fill="url(#${p}sky)" stroke="${INK}" stroke-width="${small ? 3 : 1.8}"/>
<g clip-path="url(#${p}in)">
<circle cx="74" cy="58" r="76" fill="url(#${p}sun)"/>`;
    if (!small) s += `<g filter="url(#${p}b8)" opacity=".55"><ellipse cx="176" cy="74" rx="30" ry="18" fill="#ffb8d8"/><ellipse cx="54" cy="116" rx="26" ry="16" fill="#a8dcff"/><ellipse cx="138" cy="188" rx="70" ry="22" fill="#fff4e2"/></g>
<g filter="url(#${p}b4)" opacity=".5"><path d="M42 92C64 84 82 90 98 86C112 82 124 86 134 84" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M150 112C166 106 184 110 198 104" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></g>
<circle cx="${C[0]}" cy="${C[1]}" r="86" fill="url(#${p}paperFill)" filter="url(#${p}fiber)" opacity=".1"/>
<circle cx="${C[0]}" cy="${C[1]}" r="86" fill="url(#${p}paperFill)" filter="url(#${p}grain)" opacity=".22"/>`;
    s += `<circle cx="${C[0]}" cy="${C[1]}" r="86" fill="url(#${p}vig)"/></g>`;
  }
  if (want('rain')) {
    const bodyD = rainbowPath(RO, RO - 6 * BAND, small ? 0.4 : 1.1);
    s += `<g clip-path="url(#${p}in)">`;
    if (small) {
      s += `<path d="${bodyD}" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/><path d="${bodyD}" fill="url(#${p}rain)"/>`;
    } else {
      // 무지개 한 획: 뒤 빛 번짐 → 물감 면(번짐 · 고임 · 종이 결) → 붓털 자국 → 위 가장자리 빛
      const streaks = [];
      for (let i = 0; i < 16; i++) {
        const r = RO - 2 - rnd() * (6 * BAND - 4), t0 = 0.02 + rnd() * 0.25, t1 = 0.6 + rnd() * 0.4;
        const light = i % 3 !== 0;
        streaks.push(`<path d="${arcStroke(R(r), t0, t1)}" fill="none" stroke="${light ? '#fff' : '#3b2c7a'}" stroke-opacity="${R(light ? 0.16 + rnd() * 0.2 : 0.07 + rnd() * 0.06)}" stroke-width="${R(0.5 + rnd() * 0.9)}" stroke-dasharray="${R(14 + rnd() * 40)} ${R(1.5 + rnd() * 5)}" stroke-linecap="round"/>`);
      }
      s += `<path d="${bodyD}" fill="#fff" opacity=".5" filter="url(#${p}b4)"/>
<g filter="url(#${p}wc)"><path d="${bodyD}" fill="url(#${p}rain)"/></g>
<g clip-path="url(#${p}rbc)">${streaks.join('')}</g>
<path d="${arcStroke(RO - 1.6, 0.04, 0.97)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.1" stroke-linecap="round"/>
<path d="${arcStroke(RO - 6 * BAND + 1.4, 0.06, 0.96)}" fill="none" stroke="#3b2c7a" stroke-opacity=".32" stroke-width="1.2" stroke-linecap="round"/>
<clipPath id="${p}rbc"><path d="${bodyD}"/></clipPath>`;
    }
    s += `</g>`;
  }
  if (want('front')) {
    s += `<g clip-path="url(#${p}in)">${cloud(p, 'cl1', small ? [[40, 160, 18], [62, 148, 18], [84, 160, 14], [62, 166, 14]] : [[36, 160, 15], [55, 147, 16], [76, 152, 13], [90, 163, 10], [58, 166, 14]], small)}
${cloud(p, 'cl2', small ? [[170, 170, 12], [188, 166, 12]] : [[166, 172, 10], [181, 166, 11], [196, 172, 8]], small)}`;
    if (!small) s += `${sparkle(66, 74, 7)}${sparkle(112, 52, 4.5, 0.9)}${sparkle(160, 98, 3.6, 0.85)}${sparkle(184, 132, 2.6, 0.7)}${sparkle(42, 120, 2.8, 0.7)}`;
    s += `</g>`;
    if (rib) s += rib.front;
  }
  if (want('brush')) {
    s += `<g transform="translate(${H[0]} ${H[1]}) rotate(${R(BRUSH_ROT)}) scale(${R(BRUSH_S)} ${R(BRUSH_S * (small ? 1.6 : 1))})">${brushArt(p + 'br', small)}</g>`;
  }
  return s;
}

// ---------- 내보내기 ----------
const VB = [-12, -12, 264, 264];
const svgDoc = (vb, inner, w, h) => `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" width="${w}" height="${h}">${inner}</svg>`;
function png(svg, w) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: w }, background: 'rgba(0,0,0,0)' }).render().asPng();
}
// 아이콘 바탕: 라벤더 하늘 + 종이 결 + 위에서 번지는 빛 (꽉 찬 정사각형)
function iconBg(p) {
  return `<defs>${paperDefs(p)}<linearGradient id="${p}ib" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d68e0"/><stop offset=".55" stop-color="#b3a0ff"/><stop offset="1" stop-color="#ffe4ee"/></linearGradient>
<radialGradient id="${p}il" cx=".3" cy=".18" r=".7"><stop offset="0" stop-color="#fff6e6" stop-opacity=".75"/><stop offset="1" stop-color="#fff6e6" stop-opacity="0"/></radialGradient></defs>
<rect x="-12" y="-12" width="264" height="264" fill="url(#${p}ib)"/><rect x="-12" y="-12" width="264" height="264" fill="url(#${p}il)"/>
<rect x="-12" y="-12" width="264" height="264" fill="url(#${p}paperFill)" filter="url(#${p}grain)" opacity=".18"/>
${sparkle(14, 20, 6, .9)}${sparkle(226, 212, 5, .8)}${sparkle(30, 206, 3.5, .7)}`;
}
// 아이콘 = 바탕 위 마크를 k배로 가운데에 (마크 중심 C)
const iconSvg = (p, small, k, bg = true) => `${bg ? iconBg(p + 'bg') : ''}<g transform="translate(${C[0]} ${C[1]}) scale(${k}) translate(${-C[0]} ${-C[1]})">${brushMark(p, { small })}</g>`;

// B1 + 마크 가로 짝 (시안 C와 같은 자리: 마크는 짝 좌표 (-155,13)에 0.875배, B1은 0..900)
const LOCK = { x: -155, y: 13, k: 0.875 };
const b1 = (p, anim) => logoBrush(p, anim).replace(/^<svg class="logo"[^>]*>/, '').replace(/<\/svg>$/, '');
// B1 글자 면만 (빛 줄기가 지나갈 자리): 물감 면 겹을 흰색으로
function b1Face(p) {
  const s = b1(p, false);
  const defs = s.match(/<defs>[\s\S]*?<\/defs>/)[0];
  const face = s.match(new RegExp(`<g filter="url\\(#${p}wc\\)">[\\s\\S]*?</g>`))[0].replace(/url\(#[^)]+g\d\)/g, '#fff');
  return defs + face;
}

function writeAll() {
  fs.mkdirSync(path.join(HERE, 'svg'), { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  const files = {};
  // 원본 SVG (투명)
  files['svg/mark_brush.svg'] = svgDoc(VB, brushMark('m_'), 264, 264);
  files['svg/mark_brush_small.svg'] = svgDoc(VB, brushMark('s_', { small: true }), 264, 264);
  files['svg/lockup_b1.svg'] = svgDoc([-175, -12, 1095, 274], `<g transform="translate(${LOCK.x} ${LOCK.y}) scale(${LOCK.k})">${brushMark('lm_')}</g>${b1('lw_', false)}`, 1095, 274);
  files['svg/wordmark_b1.svg'] = svgDoc([-20, -20, 940, 290], b1('w_', false), 940, 290);
  files['svg/app_icon.svg'] = svgDoc(VB, iconSvg('i_', false, 0.92), 264, 264);
  files['svg/app_icon_small.svg'] = svgDoc(VB, iconSvg('j_', true, 0.94), 264, 264);
  for (const [n, s] of Object.entries(files)) fs.writeFileSync(path.join(HERE, n), s);

  // 게임용 PNG: 화면에서 짝 좌표 1 = 0.9px, 2배로 굽는다 → 짝 1.8px · 마크 1.8×0.875 = 1.575px
  const MPX = Math.round(264 * 1.575);                       // 416
  const markLayer = (n, layers) => fs.writeFileSync(path.join(OUT, n), png(svgDoc(VB, brushMark('g_', { layers }), 264, 264), MPX));
  markLayer('mark_back.png', ['back']);
  markLayer('mark_rain.png', ['rain']);
  markLayer('mark_front.png', ['front']);
  markLayer('mark_brush.png', ['brush']);
  fs.writeFileSync(path.join(OUT, 'wordmark_b1.png'), png(svgDoc([-20, -20, 940, 290], b1('gw_', false), 940, 290), Math.round(940 * 1.8)));
  fs.writeFileSync(path.join(OUT, 'wordmark_b1_face.png'), png(svgDoc([-20, -20, 940, 290], b1Face('gf_'), 940, 290), Math.round(940 * 0.9)));
  // 로딩 구석 (72px 표시 → 144px)
  fs.writeFileSync(path.join(OUT, 'mark_small_144.png'), png(svgDoc(VB, brushMark('ls_', { small: true }), 264, 264), 144));

  // 앱 아이콘: PC/프로젝트 512 · 1024, 안드로이드 기본 192, 적응형 432 앞(투명 · 안전 원 안) / 뒤(바탕)
  const icon = (n, w, small) => fs.writeFileSync(path.join(OUT, n), png(svgDoc(VB, iconSvg('ic' + w + '_', small, small ? 0.94 : 0.92), 264, 264), w));
  icon('icon_1024.png', 1024); icon('icon_512.png', 512); icon('icon_192.png', 192);
  fs.writeFileSync(path.join(OUT, 'icon_fg_432.png'), png(svgDoc(VB, iconSvg('fg_', false, 0.62, false), 264, 264), 432));
  fs.writeFileSync(path.join(OUT, 'icon_bg_432.png'), png(svgDoc(VB, iconBg('bg_'), 264, 264), 432));
  // 비교 페이지용 작은 크기 (실제 픽셀로 구운 것)
  fs.mkdirSync(path.join(HERE, 'after'), { recursive: true });
  fs.writeFileSync(path.join(HERE, 'after/icon_192.png'), fs.readFileSync(path.join(OUT, 'icon_192.png')));
  fs.writeFileSync(path.join(HERE, 'after/icon_48.png'), png(svgDoc(VB, iconSvg('i48_', true, 0.94), 264, 264), 48));
  // 윈도 아이콘: 16 · 32 · 48은 단순판, 64 이상은 본판 (PNG를 그대로 담은 ICO)
  const sizes = [16, 24, 32, 48, 64, 128, 256];
  const imgs = sizes.map(w => png(svgDoc(VB, iconSvg('w' + w + '_', w <= 48, w <= 48 ? 0.94 : 0.92), 264, 264), w));
  const head = Buffer.alloc(6 + 16 * sizes.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
  let off = head.length;
  sizes.forEach((w, i) => {
    const e = 6 + 16 * i;
    head.writeUInt8(w % 256, e); head.writeUInt8(w % 256, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6); head.writeUInt32LE(imgs[i].length, e + 8); head.writeUInt32LE(off, e + 12);
    off += imgs[i].length;
  });
  fs.writeFileSync(path.join(OUT, 'app_icon.ico'), Buffer.concat([head, ...imgs]));
  console.log('mark layers', MPX, 'px · brush pivot (mark units)', H, 'arc center', ARC, 'rot', R(BRUSH_ROT));
}

module.exports = { brushMark, iconSvg, b1, LOCK, H, ARC, C };
if (require.main === module) writeAll();
