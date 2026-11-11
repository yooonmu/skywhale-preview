// 로고 마크(엠블럼) 시안 C — build.cjs가 불러 index.html의 C 섹션과 logos/mark_*.svg · lockup_*_b1.svg 를 만든다
// 모두 손으로 좌표를 잡은 벡터 패스 (AI 래스터 없음). 금색은 실선(≤1.6)으로만 — 등급 규칙.
// 짝 글자는 PD 확정 B1 물감 붓글씨 하나뿐.
module.exports = (K) => {
  const { word, layer, wcFilter, star, brush, whale, goldGrad, logoBrush, INK, RAIN, R, NB, GB } = K;
  const CREAM = '#fffaf2';
  const SHADOW = 'rgba(46,35,80,.45)';
  // 타이틀의 네 소녀 속성 (별 · 빛 · 생명 · 불꽃, game_data.gd ELEMENT_COLORS를 파스텔로)
  const ELEM = ['#b89cff', '#ffe07a', '#8fe0a6', '#ff9a8a'];

  const skyGrad = (id, y1, y2) => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}"><stop offset="0" stop-color="#6c58cc"/><stop offset=".42" stop-color="#a28cff"/><stop offset=".78" stop-color="#ffd9ea"/><stop offset="1" stop-color="#fff2d8"/></linearGradient>`;
  const starD = (r) => { const k = r * 0.22; return `M0 ${-r}Q${k} ${-k} ${r} 0Q${k} ${k} 0 ${r}Q${-k} ${k} ${-r} 0Q${-k} ${-k} 0 ${-r}Z`; };
  const tw = (o, x, y, r, d) => o.small ? '' : star(x, y, r, o.anim ? 'twinkle' : '', d, CREAM);
  const sweepE = (p, clip) => `<linearGradient id="${p}sw" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><g clip-path="url(#${clip})"><rect class="sweepE" x="-150" y="-20" width="70" height="280" fill="url(#${p}sw)"/></g>`;
  const cub = (P, t) => { const u = 1 - t; return [0, 1].map(j => u * u * u * P[0][j] + 3 * u * u * t * P[1][j] + 3 * u * t * t * P[2][j] + t * t * t * P[3][j]); };
  // 중심선(3차 곡선)을 따라 두께가 변하는 붓 획 면
  function taper(P, half, n = 48) {
    const top = [], bot = [], pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n, a = cub(P, Math.max(0, t - 0.002)), b = cub(P, Math.min(1, t + 0.002)), m = cub(P, t);
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, nx = -(b[1] - a[1]) / l, ny = (b[0] - a[0]) / l, h = half(t);
      pts.push({ m, nx, ny });
      top.push(`${R(m[0] + nx * h)} ${R(m[1] + ny * h)}`); bot.unshift(`${R(m[0] - nx * h)} ${R(m[1] - ny * h)}`);
    }
    return { d: `M${top.join('L')}L${bot.join('L')}Z`, pts };
  }
  // 물감 방울: 9점을 2차 곡선으로 이은 고르지 않은 동그라미
  function blob(cx, cy, r, s) {
    const n = 9, pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + s, rr = r * (1 + 0.13 * Math.sin(i * 2.3 + s * 5)); pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    const mid = (a, b) => `${R((a[0] + b[0]) / 2)} ${R((a[1] + b[1]) / 2)}`;
    let d = `M${mid(pts[n - 1], pts[0])}`;
    for (let i = 0; i < n; i++) d += `Q${R(pts[i][0])} ${R(pts[i][1])} ${mid(pts[i], pts[(i + 1) % n])}`;
    return d + 'Z';
  }
  // 원 둘레를 따라 글자 하나씩 (dir +1 = 위쪽 시계 방향, -1 = 아래쪽 바로 읽히게)
  function arcText(font, text, size, r, cx, cy, center, dir, track, attrs) {
    const g = [...text].map(ch => ({ ch, adv: font.charToGlyph(ch).advanceWidth * size / font.unitsPerEm }));
    const L = g.reduce((a, x) => a + x.adv + track, -track), c0 = center * Math.PI / 180;
    let x = 0, out = '';
    for (const it of g) {
      const mid = x + it.adv / 2, th = dir > 0 ? c0 - L / 2 / r + mid / r : c0 + L / 2 / r - mid / r;
      if (it.ch !== ' ') {
        const d = font.charToGlyph(it.ch).getPath(-it.adv / 2, 0, size).toPathData(2);
        out += `<path transform="translate(${R(cx + r * Math.cos(th))} ${R(cy + r * Math.sin(th))}) rotate(${R(th * 180 / Math.PI + (dir > 0 ? 90 : -90))})" d="${d}" ${attrs}/>`;
      }
      x += it.adv + track;
    }
    return out;
  }
  const clouds = (list, shade = '#d6cbf6') => `<g>${list.map(([x, y, r]) => `<circle cx="${x}" cy="${y + 4}" r="${r}" fill="${shade}"/>`).join('')}${list.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${CREAM}"/>`).join('')}</g>`;

  // ---------- C1 고래 문장: 방패꼴 문장 안, 붓으로 칠한 무지개를 뚫고 헤엄치는 구름고래 ----------
  function crest(p, o) {
    const k = o.small ? 1.5 : 1;
    const S = 'M30 46Q120 2 210 46L210 128C210 176 172 206 120 230C68 206 30 176 30 128Z';
    const IN = 'translate(120 124) scale(.86) translate(-120 -124)';
    const arcs = RAIN.slice(0, 6).map((c, i) => { const r = 86 - i * 7; return `<path d="M${120 - r} 198A${r} ${r} 0 0 1 ${120 + r} 198" fill="none" stroke="${c}" stroke-width="7.6"/>`; }).join('');
    return `<defs>${skyGrad(p + 'sky', 36, 216)}${goldGrad(p + 'gold', 30, 210)}${wcFilter(p + 'wc', 4, 3)}
<clipPath id="${p}in"><path d="${S}" transform="${IN}"/></clipPath><clipPath id="${p}tail"><rect x="160" y="0" width="80" height="240"/></clipPath></defs>
<path d="${S}" transform="translate(0 5)" fill="${SHADOW}"/>
<path d="${S}" fill="${CREAM}" stroke="${INK}" stroke-width="${8 * k}" stroke-linejoin="round"/>
${o.small ? '' : `<path d="${S}" transform="translate(120 124) scale(.93) translate(-120 -124)" fill="none" stroke="url(#${p}gold)" stroke-width="1.4"/>`}
<path d="${S}" transform="${IN}" fill="url(#${p}sky)"/>
<g clip-path="url(#${p}in)">
<ellipse cx="84" cy="62" rx="74" ry="34" fill="#fff" opacity=".16"/>
<g filter="url(#${p}wc)" opacity=".92">${arcs}</g>
<g class="${o.anim ? 'bob' : ''}">${whale(64, 100, 1.12)}</g>
<g clip-path="url(#${p}tail)" filter="url(#${p}wc)" opacity=".92">${arcs}</g>
${clouds([[58, 206, 20], [88, 199, 22], [120, 205, 24], [152, 199, 22], [182, 206, 20], [104, 220, 22], [138, 220, 22]])}
${tw(o, 66, 70, 6, 0)}${tw(o, 178, 62, 5, 1.2)}${tw(o, 150, 48, 3.5, 2.1)}
${o.anim ? sweepE(p, p + 'in') : ''}</g>
<path d="${S}" transform="${IN}" fill="none" stroke="${INK}" stroke-width="${2.4 * k}" stroke-linejoin="round"/>
<path transform="translate(120 22)" d="${starD(18)}" fill="${CREAM}" stroke="${INK}" stroke-width="${3.2 * k}" stroke-linejoin="round"/>
<path transform="translate(120 22)" d="${starD(7)}" fill="#c9b8ff"/>`;
  }

  // ---------- C2 팔레트 고래: 네 소녀의 물감 + 한 붓에 그은 무지개 획이 그대로 고래 (꼬리를 친다) ----------
  const PAL = 'M118 30C172 26 214 62 216 112C218 160 182 204 132 208C108 210 100 194 108 178C116 162 104 148 86 154C64 162 36 156 28 124C18 78 62 34 118 30Z';
  const HOLE = 'M68 112A12 12 0 1 0 44 112A12 12 0 1 0 68 112Z';
  function palette(p, o) {
    const k = o.small ? 1.5 : 1;
    const P = [[100, 124], [124, 156], [174, 160], [192, 118]];
    const body = taper(P, t => t < 0.16 ? 20 * Math.sqrt(1 - (1 - t / 0.16) ** 2) : 20 - 16 * ((t - 0.16) / 0.84) ** 1.1);
    const ang = R(Math.atan2(P[3][1] - P[2][1], P[3][0] - P[2][0]) * 180 / Math.PI);
    const FL = 'M-3 -3C2 -12 6 -22 17 -29C15 -19 13 -9 7 0C13 9 15 19 17 29C6 22 2 12 -3 3Z';
    const fl = (a) => `<g transform="translate(${P[3][0]} ${P[3][1]}) rotate(${ang})"><g class="${o.anim ? 'wag' : ''}"><path d="${FL}" ${a}/></g></g>`;
    const whaleLayers = (a) => `<path d="${body.d}" ${a}/>${fl(a)}`;
    const e = body.pts[5];
    const eye = [e.m[0] - e.nx * 6, e.m[1] - e.ny * 6];
    const dabs = [[70, 76, 15, 0.3], [106, 50, 14, 1.1], [148, 46, 14, 2.0], [186, 64, 13, 2.7]];
    return `<defs>${goldGrad(p + 'gold', 30, 216)}${wcFilter(p + 'wc', 7, 3)}
<linearGradient id="${p}pal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf8"/><stop offset="1" stop-color="#efe6ff"/></linearGradient>
<linearGradient id="${p}paint" gradientUnits="userSpaceOnUse" x1="96" y1="150" x2="214" y2="94"><stop offset="0" stop-color="#ff9ab4"/><stop offset=".2" stop-color="#ffb36b"/><stop offset=".4" stop-color="#ffe07a"/><stop offset=".58" stop-color="#8fe0a6"/><stop offset=".76" stop-color="#7cc8ff"/><stop offset="1" stop-color="#a68cff"/></linearGradient>
<clipPath id="${p}clip"><path d="${body.d}"/></clipPath></defs>
<path d="${PAL}${HOLE}" fill-rule="evenodd" transform="translate(0 5)" fill="${SHADOW}"/>
<path d="${PAL}${HOLE}" fill-rule="evenodd" fill="url(#${p}pal)" stroke="${INK}" stroke-width="${7 * k}" stroke-linejoin="round"/>
${o.small ? '' : `<path d="${PAL}" transform="translate(122 118) scale(.92) translate(-122 -118)" fill="none" stroke="url(#${p}gold)" stroke-width="1.3"/>`}
<g filter="url(#${p}wc)">${dabs.map(([x, y, r, s], i) => `<path d="${blob(x, y, r, s)}" fill="${ELEM[i]}"/>`).join('')}</g>
${dabs.map(([x, y, r]) => `<ellipse cx="${x - r * 0.35}" cy="${y - r * 0.35}" rx="${R(r * 0.3)}" ry="${R(r * 0.18)}" fill="#fff" opacity=".7" transform="rotate(-30 ${x - r * 0.35} ${y - r * 0.35})"/>`).join('')}
${whaleLayers(`fill="${INK}" stroke="${INK}" stroke-width="${7 * k}" stroke-linejoin="round"`)}
${whaleLayers(`fill="${CREAM}" stroke="${CREAM}" stroke-width="${3.4 * k}" stroke-linejoin="round"`)}
<g filter="url(#${p}wc)">${whaleLayers(`fill="url(#${p}paint)"`)}</g>
<path d="M${R(body.pts[8].m[0])} ${R(body.pts[8].m[1] - 9)}Q${R(body.pts[20].m[0])} ${R(body.pts[20].m[1] - 12)} ${R(body.pts[34].m[0])} ${R(body.pts[34].m[1] - 7)}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.4" stroke-linecap="round"/>
<circle cx="${R(eye[0])}" cy="${R(eye[1])}" r="3.4" fill="${INK}"/><circle cx="${R(eye[0] - 1)}" cy="${R(eye[1] - 1)}" r="1.1" fill="#fff"/>
<ellipse cx="${R(eye[0] + 4)}" cy="${R(eye[1] + 9)}" rx="4.4" ry="2.4" fill="#ff7fa0" opacity=".7"/>
${o.anim ? sweepE(p, p + 'clip') : ''}
${tw(o, 214, 86, 7, 0.4)}${tw(o, 40, 64, 5, 1.6)}${tw(o, 130, 196, 4, 2.4)}`;
  }

  // ---------- C3 레아 인장: 둥근 도장. 고리에 RAINBOW ATELIER · 부제, 가운데 칠한 무지개 위 B1 붓글씨 「레아」 ----------
  function seal(p, o) {
    const k = o.small ? 1.5 : 1, RI = o.small ? 92 : 78;
    const le = word(NB, '레아', o.small ? 64 : 62, 120, o.small ? 120 : 124, o.small ? 0 : 4);
    const tf = [{ r: -5, dy: 2 }, { r: 4, dy: -2 }];
    const pairs = [['#ff9ab4', '#ffb36b'], ['#7cc8ff', '#a68cff']];
    const arcs = RAIN.slice(0, 6).map((c, i) => { const r = (o.small ? 74 : 62) - i * (o.small ? 7 : 6); return `<path d="M${120 - r} 164A${r} ${r} 0 0 1 ${120 + r} 164" fill="none" stroke="${c}" stroke-width="${o.small ? 6.6 : 5.6}"/>`; }).join('');
    return `<defs>${skyGrad(p + 'sky', 120 - RI, 120 + RI)}${goldGrad(p + 'gold', 10, 230)}${wcFilter(p + 'wc', 12, 3)}
${pairs.map((c, i) => `<linearGradient id="${p}g${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6ea"/><stop offset=".22" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('')}
<clipPath id="${p}in"><circle cx="120" cy="120" r="${RI}"/></clipPath></defs>
<circle cx="120" cy="125" r="110" fill="${SHADOW}"/>
<circle cx="120" cy="120" r="108" fill="${CREAM}" stroke="${INK}" stroke-width="${7 * k}"/>
${o.small ? '' : `<circle cx="120" cy="120" r="102" fill="none" stroke="url(#${p}gold)" stroke-width="1.4"/>
${arcText(GB, 'RAINBOW ATELIER', 15.5, 85, 120, 120, -90, 1, 2.2, `fill="${INK}"`)}
${arcText(GB, '하늘을 물들이는 소녀들', 12.5, 98, 120, 120, 90, -1, 1.6, `fill="${INK}"`)}
<path transform="translate(29 120)" d="${starD(6)}" fill="#8f7be8"/><path transform="translate(211 120)" d="${starD(6)}" fill="#8f7be8"/>`}
<circle cx="120" cy="120" r="${RI}" fill="url(#${p}sky)"/>
<g clip-path="url(#${p}in)">
<ellipse cx="96" cy="70" rx="60" ry="26" fill="#fff" opacity=".16"/>
<g filter="url(#${p}wc)" opacity=".9">${arcs}</g>
${clouds(o.small ? [[46, 166, 16], [66, 172, 14], [194, 166, 16], [174, 172, 14], [120, 204, 30]] : [[56, 164, 13], [72, 170, 11], [184, 164, 13], [168, 170, 11], [120, 196, 26]])}
${layer(le, `fill="${INK}" stroke="${INK}" stroke-width="${o.small ? 14 : 11}" stroke-linejoin="round"`, tf)}
${layer(le, `fill="${CREAM}" stroke="${CREAM}" stroke-width="${o.small ? 6 : 5}" stroke-linejoin="round"`, tf)}
<g filter="url(#${p}wc)">${layer(le, i => `fill="url(#${p}g${i})" stroke="url(#${p}g${i})" stroke-width="2" stroke-linejoin="round"`, tf)}</g>
${tw(o, 70, 82, 6, 0)}${tw(o, 170, 78, 5, 1.3)}
${o.anim ? sweepE(p, p + 'in') : ''}</g>
<circle cx="120" cy="120" r="${RI}" fill="none" stroke="${INK}" stroke-width="${2.4 * k}"/>
${o.small ? '' : `<circle cx="120" cy="120" r="${RI - 4}" fill="none" stroke="url(#${p}gold)" stroke-width="1.1" opacity=".9"/>`}`;
  }

  // ---------- C4 붓과 리본: 하늘에 무지개를 긋는 붓 + RAINBOW ATELIER 리본 ----------
  function brushMark(p, o) {
    const k = o.small ? 1.5 : 1;
    const arcs = (cls) => RAIN.slice(0, 6).map((c, i) => { const r = 70 - i * 6; return `<path class="${cls}" pathLength="1" ${cls ? 'stroke-dasharray="1 1"' : ''} d="M${112 - r} 150A${r} ${r} 0 0 1 ${112 + r} 150" fill="none" stroke="${c}" stroke-width="5.8" stroke-linecap="round"/>`; }).join('');
    // 붓: brush()는 170x30, 끝이 +x 쪽. 끝을 무지개 오른발(167,150)에, 대는 오른쪽 위로 원 밖까지
    const s = 0.82, th = Math.atan2(150 - 30, 167 - 236), tip = [170 * s, 15 * s];
    const tx = 167 - (tip[0] * Math.cos(th) - tip[1] * Math.sin(th)), ty = 150 - (tip[0] * Math.sin(th) + tip[1] * Math.cos(th));
    const band = 'M34 158Q120 182 206 158L206 188Q120 212 34 188Z';
    const rib = word(GB, 'RAINBOW ATELIER', 10.5, 120, 185, 1.4);
    const rtf = rib.syl.map(g => { const t = (g.cx - 34) / 172; return { dy: R(173 + 48 * t * (1 - t) - 185 + 0), r: R(Math.atan(48 * (1 - 2 * t) / 172) * 180 / Math.PI) }; });
    const tail = (x, dir) => `<path d="M${x} 166L${x + dir * 30} 168L${x + dir * 20} 182L${x + dir * 32} 198L${x} 196Z" fill="#7d68d8" stroke="${o.small ? INK : `url(#${p}gold)`}" stroke-width="${o.small ? 2.4 : 1.3}" stroke-linejoin="round"/><path d="M${x} 196L${x + dir * 8} 188L${x + dir * 8} 172Z" fill="#4e3d9e"/>`;
    return `<defs>${skyGrad(p + 'sky', 34, 206)}${goldGrad(p + 'gold', 20, 220)}${wcFilter(p + 'wc', 15, 3)}
<linearGradient id="${p}band" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9c86f2"/><stop offset=".5" stop-color="#b6a2ff"/><stop offset="1" stop-color="#8b74e8"/></linearGradient>
<clipPath id="${p}in"><circle cx="120" cy="118" r="86"/></clipPath></defs>
<circle cx="120" cy="123" r="99" fill="${SHADOW}"/>
${tail(40, -1)}${tail(200, 1)}
<circle cx="120" cy="118" r="97" fill="${CREAM}" stroke="${INK}" stroke-width="${7 * k}"/>
${o.small ? '' : `<circle cx="120" cy="118" r="91.5" fill="none" stroke="url(#${p}gold)" stroke-width="1.4"/>`}
<circle cx="120" cy="118" r="86" fill="url(#${p}sky)" stroke="${INK}" stroke-width="${2.2 * k}"/>
<g clip-path="url(#${p}in)">
<ellipse cx="92" cy="66" rx="64" ry="28" fill="#fff" opacity=".16"/>
<g filter="url(#${p}wc)" opacity=".92">${arcs(o.anim ? 'draw' : '')}</g>
${clouds([[48, 150, 14], [66, 156, 12], [156, 156, 10]])}
${tw(o, 64, 70, 6, 0)}${tw(o, 112, 52, 4, 1.4)}${tw(o, 150, 96, 3.5, 2.2)}
${o.anim ? sweepE(p, p + 'in') : ''}</g>
<g class="${o.anim ? 'nod' : ''}">${brush(R(tx), R(ty), R(th * 180 / Math.PI), s, '#a68cff')}</g>
<path d="${band}" transform="translate(0 3)" fill="${SHADOW}"/>
<path d="${band}" fill="url(#${p}band)" stroke="${o.small ? INK : `url(#${p}gold)`}" stroke-width="${o.small ? 2.4 : 1.4}" stroke-linejoin="round"/>
<path d="M34 162Q120 186 206 162" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2"/>
${o.small ? '' : layer(rib, `fill="${CREAM}"`, rtf)}`;
  }

  const OPTS = [
    { id: 'mark_crest', n: 'C1', name: '고래 문장', fn: crest, rec: true,
      stance: '방패꼴 문장 안에서 구름고래가 붓으로 칠한 무지개를 뚫고 헤엄친다 (머리는 무지개 앞, 꼬리는 뒤). 세계관(고래 위 분교 · 하늘 칠하기)을 한 장에 담은 정통 가챠 문장. 방패와 꼭대기 별로 실루엣이 단순해서 48px에서도 「보라 방패 + 고래 + 무지개」로 읽힌다.',
      motion: '고래가 천천히 오르내리고, 빛 한 줄이 방패를 훑고, 하늘에 별 셋이 차례로 반짝인다.' },
    { id: 'mark_palette', n: 'C2', name: '팔레트 고래', fn: palette,
      stance: '크림 팔레트 위에 네 소녀의 물감(별 · 빛 · 생명 · 불꽃)을 짜 두고, 한 붓에 그은 무지개 획이 그대로 고래가 되어 꼬리를 친다. 「아틀리에」 쪽에 가장 가깝고 가장 귀엽다. 대신 방패 · 원보다 윤곽이 자유로워 문장 같은 무게감은 덜하다.',
      motion: '꼬리가 좌우로 살랑이고, 획 위로 빛이 훑고, 팔레트 둘레에서 반짝인다.' },
    { id: 'mark_seal', n: 'C3', name: '레아 인장', fn: seal,
      stance: '둥근 인장. 바깥 고리에 RAINBOW ATELIER · 하늘을 물들이는 소녀들, 가운데는 칠한 무지개 위에 B1과 같은 붓글씨로 쓴 「레아」. 글자 로고와 한 가족으로 보이고 SNS 프로필 · 도장으로 쓰기 좋다. 작은 판에서는 고리 글자를 빼고 「레아」를 키운다.',
      motion: '빛이 원판을 훑고 무지개 위에서 별이 반짝인다 (글자 고리는 읽기 위해 돌리지 않음).' },
    { id: 'mark_brush', n: 'C4', name: '붓과 리본', fn: brushMark,
      stance: '기울인 붓이 하늘에 무지개를 긋고, RAINBOW ATELIER 리본이 둥근 판 앞을 가로지른다. 「하늘을 물들이는」 동작이 가장 분명. 대신 요소가 셋(붓 · 무지개 · 리본)이라 작아질수록 붓과 리본만 남는다.',
      motion: '무지개가 붓 끝에서 그려졌다가 사라지기를 되풀이하고, 붓이 살짝 까딱인다.' },
  ];

  // ---------- 조립 ----------
  const markSvg = (o, p, opt, cls = 'mark') => `<svg class="${cls}" viewBox="-12 -12 264 264" overflow="visible" xmlns="http://www.w3.org/2000/svg">${o.fn(p, opt)}</svg>`;
  const b1Nested = (p, anim) => logoBrush(p, anim).replace(/^<svg class="logo"[^>]*>/, '<svg x="0" y="0" width="900" height="250" viewBox="0 0 900 250" overflow="visible">');
  // 가로 짝: 마크(210단위)를 B1 왼쪽에. B1 좌표계(900×250) 그대로, 화면에선 0.9배
  const LOCK_VB = '-175 -12 1095 274';
  const lockup = (o, p, anim) => `<svg class="lockup" viewBox="${LOCK_VB}" overflow="visible" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-155 13) scale(.875)">${o.fn(p + 'm', { anim })}</g>${b1Nested(p + 'w', anim)}</svg>`;
  const b1Svg = (p, anim) => logoBrush(p, anim);

  // 타이틀: 지금 로고 자리 (B1 상자 왼쪽 W/2-405, 위 6, ×0.9). 마크가 붙으면 짝 전체를 화면 가운데로 (B1은 오른쪽으로 72px)
  const tshot = (w, inner) => `<figure><div class="shot s${w}"><div class="stage" style="width:${w}px;background-image:url(plates/bare_${w}.png)">${inner}</div></div><figcaption>${w}×720</figcaption></figure>`;
  const onTitle = (o, w, p) => o ? `<div class="lbox" style="left:${R(w / 2 - 488.25)}px">${lockup(o, p, true)}</div>` : `<div class="box" style="left:${w / 2 - 405}px">${b1Svg(p, true)}</div>`;
  const icon = (o, p, size) => {
    const inner = o ? markSvg(o, p, { small: size < 100 }, 'mk') : b1Svg(p, false);
    return `<div class="ic ic${size}">${inner}</div>`;
  };
  const smalls = (o, p) => `<div class="smalls">
<figure><div class="icbg">${icon(o, p + 'i1', 192)}</div><figcaption>앱 아이콘 192px</figcaption></figure>
<figure><div class="icbg dark"><div class="home">${icon(o, p + 'i2', 48)}<span>레인보우…</span></div><div class="home">${icon(o, p + 'i3', 48)}</div></div><div class="icbg lite">${icon(o, p + 'i4', 48)}</div><figcaption>48px (실제 크기 · 작은 판${o ? '' : ' 없음'})</figcaption></figure>
<figure><div class="ld"><div class="ldtx">하늘을 칠하는 중… 62%<div class="bar"><i></i></div></div><div class="ldmk${o ? '' : ' word'}">${o ? markSvg(o, p + 'l', { anim: true, small: false }, 'mk breathe') : b1Svg(p + 'l', false)}</div></div><figcaption>로딩 화면 오른쪽 아래 (1:1, 마크 72px · 예시 문구)</figcaption></figure>
<figure><div class="bn"><div class="bnin">${o ? lockup(o, p + 'b', false) : b1Svg(p + 'b', false)}</div></div><figcaption>스토어 배너 1024×500 (½로 보임)</figcaption></figure></div>`;

  const parts = [];
  parts.push(`<section class="opt" id="mark_none" data-choice="mark_none" data-choice-group="mark" data-choice-label="C0 마크 없음 (B1만)">
<h2><span class="tag">C0</span> 마크 없음 — B1 글자만</h2>
<p class="stance">지금 자리 그대로 B1만. 타이틀이 가장 가볍지만, 앱 아이콘 · 로딩 구석처럼 작은 자리에 둘 「얼굴」이 없다 (48px에서는 글자가 뭉개짐). 이걸 고르면 B1을 바로 게임에 넣는다.</p>
<div class="pair">${tshot(1280, onTitle(null, 1280, 'n_a_'))}${tshot(1600, onTitle(null, 1600, 'n_b_'))}</div>
${smalls(null, 'n_')}</section>`);
  OPTS.forEach(o => {
    const q = o.id + '_';
    parts.push(`<section class="opt${o.rec ? ' rec' : ''}" id="${o.id}" data-choice="${o.id}" data-choice-group="mark" data-choice-label="${o.n} ${o.name}${o.rec ? ' (추천)' : ''} + B1">
<h2><span class="tag">${o.n}</span> ${o.name}${o.rec ? ' <span class="star">추천</span>' : ''}</h2><p class="stance">${o.stance}</p>
<div class="pair"><figure><div class="solo">${markSvg(o, q + 's1', { anim: true })}</div><figcaption>마크만</figcaption></figure>
<figure><div class="solo dark">${markSvg(o, q + 's2', { anim: true })}</div><figcaption>어두운 바탕</figcaption></figure>
<figure><div class="lock">${lockup(o, q + 'k', true)}</div><figcaption>B1 붓글씨와 가로 짝</figcaption></figure></div>
<div class="pair">${tshot(1280, onTitle(o, 1280, q + 'ta'))}${tshot(1600, onTitle(o, 1600, q + 'tb'))}</div>
${smalls(o, q)}
<p class="motion"><b>살짝 움직임</b> ${o.motion}</p>
<p class="file">내보내기 (투명 SVG · 움직임 없음): <a href="logos/${o.id}.svg">logos/${o.id}.svg</a> · 작은 판 <a href="logos/${o.id}_small.svg">logos/${o.id}_small.svg</a> · B1 짝 <a href="logos/lockup_${o.id}_b1.svg">logos/lockup_${o.id}_b1.svg</a></p></section>`);
  });

  const html = `<h1 class="part">C. 로고 마크 <small>PD 확정 글자 B1 물감 붓글씨와 짝지은 마크 4안 + 마크 없음. 각 안: 마크만 · B1 가로 짝 · 타이틀 1280/1600 · 앱 아이콘 192/48 · 로딩 구석 · 스토어 배너. 모두 손으로 좌표를 잡은 벡터 (금색은 실선만).</small></h1>
${parts.join('\n')}`;

  const css = `.lbox{position:absolute;top:-4.8px;width:985.5px;height:246.6px}.lbox svg{width:100%;height:100%;display:block}
.solo{width:250px;height:250px;border-radius:12px;background:linear-gradient(#fffaf2,#f1eaff);display:grid;place-items:center}.solo.dark{background:linear-gradient(#2e2350,#4a3a8a)}
.solo svg{width:210px;height:210px;overflow:visible}
.lock{width:560px;height:250px;border-radius:12px;background:linear-gradient(170deg,#6f5bd0,#a28cff 60%,#ffe3ee);display:grid;place-items:center;padding:0 14px}.lock svg{width:100%;overflow:visible}
.smalls{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end;margin-top:10px}
.icbg{display:flex;gap:14px;align-items:center;padding:12px;border-radius:12px;background:#f3eefc}.icbg.dark{background:#1f1a33}.icbg.lite{background:#fff}
.ic{display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 30% 22%,#fff3fb,rgba(255,243,251,0) 55%),linear-gradient(160deg,#7d68d8,#b9a6ff 55%,#ffeedd)}
.ic192{width:192px;height:192px;border-radius:44px}.ic192 svg.mk{width:166px;height:166px}.ic192 svg.logo{width:180px}
.ic48{width:48px;height:48px;border-radius:11px}.ic48 svg.mk{width:44px;height:44px}.ic48 svg.logo{width:46px}
.ic svg{overflow:visible}
.home{display:flex;flex-direction:column;align-items:center;gap:3px;color:#fff;font-size:11px}
.ld{position:relative;width:460px;height:170px;border-radius:8px;overflow:hidden;background:url(plates/bare_1280.png) 30% 8%/1280px 720px}
.ld::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(28,20,60,.78),rgba(28,20,60,.55))}
.ldtx{position:absolute;left:20px;bottom:30px;width:260px;color:#fffaf2;font-size:14px;font-weight:700}
.bar{margin-top:6px;height:6px;border-radius:3px;background:rgba(255,255,255,.22)}.bar i{display:block;width:62%;height:100%;border-radius:3px;background:linear-gradient(90deg,#ff8aa8,#ffe07a,#8fe0a6,#7cc8ff,#a68cff)}
.ldmk{position:absolute;right:22px;bottom:18px;width:72px;height:72px}.ldmk svg{width:72px;height:72px;overflow:visible}.ldmk.word{width:190px;height:auto;right:14px}.ldmk.word svg{width:190px;height:auto}
.bn{width:512px;height:250px;border-radius:8px;overflow:hidden;position:relative}
.bnin{position:absolute;left:0;top:0;width:1024px;height:500px;transform:scale(.5);transform-origin:0 0;background:url(plates/bare_1600.png) center top/auto 640px;display:flex;justify-content:center;padding-top:20px}
.bnin svg{width:560px;height:auto;align-self:flex-start;overflow:visible}
.sweepE{animation:sweepE 5.5s ease-in-out infinite}
@keyframes sweepE{0%{transform:skewX(-20deg) translateX(0)}40%,100%{transform:skewX(-20deg) translateX(460px)}}
.wag{transform-box:fill-box;transform-origin:0% 50%;animation:wag 2.6s ease-in-out infinite}
@keyframes wag{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
.draw{animation:draw 6s ease-in-out infinite}
@keyframes draw{0%{stroke-dashoffset:1}40%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
.nod{transform-box:fill-box;transform-origin:100% 0%;animation:nod 3s ease-in-out infinite}
@keyframes nod{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
.breathe{animation:breathe 3.4s ease-in-out infinite;transform-origin:center}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@media (prefers-reduced-motion:reduce){.sweepE,.wag,.draw,.nod,.breathe{animation:none}}`;

  const files = {};
  for (const o of OPTS) {
    const solo = (small) => `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 264 264" width="264" height="264">${o.fn(o.id + '_', { small })}</svg>`;
    files[`${o.id}.svg`] = solo(false);
    files[`${o.id}_small.svg`] = solo(true);
    files[`lockup_${o.id}_b1.svg`] = `<?xml version="1.0" encoding="UTF-8"?>\n` + lockup(o, o.id + '_x', false).replace(/^<svg class="lockup" viewBox="([^"]+)" overflow="visible"/, '<svg viewBox="$1" width="1095" height="274"');
  }
  return { html, css, files };
};
