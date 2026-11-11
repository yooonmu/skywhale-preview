// 묶음 4·5 시안용 부품 그림 (SVG) — rewards_b/build_art.mjs와 같은 결: 짙은 자두색 외곽선 + 여러 단 그라데이션 + 윗빛 · 아랫그늘.
// 시안 전용이라 batch45_adventure/a/s/ 에만 쓴다 (게임 assets/는 건드리지 않음).
// node design/mockups/feedback70/batch45_adventure/build_art.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "a/s");
mkdirSync(out, { recursive: true });
const OL = "#4a2b45";
const f = (n) => Math.round(n * 100) / 100;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n${body}\n</svg>\n`;
const save = (name, s) => writeFileSync(resolve(out, name), s);
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const P = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const pts = (a) => a.map((p) => `${f(p[0])},${f(p[1])}`).join(" ");
// 색: hex ↔ hsl
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (r) => "#" + r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const shade = (h, k) => { const c = hex2rgb(h); return rgb2hex(c.map((v) => (k >= 0 ? v + (255 - v) * k : v * (1 + k)))); };
const GOLD = (id, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="#fff6d2"/><stop offset=".3" stop-color="#ffd877"/><stop offset=".62" stop-color="#e4a63c"/><stop offset=".86" stop-color="#b8761c"/><stop offset="1" stop-color="#e9bd5c"/></linearGradient>`;
const METAL = (id, base) => `<linearGradient id="${id}" x1="0" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="${shade(base, 0.75)}"/><stop offset=".32" stop-color="${shade(base, 0.25)}"/><stop offset=".62" stop-color="${base}"/><stop offset=".86" stop-color="${shade(base, -0.35)}"/><stop offset="1" stop-color="${shade(base, 0.1)}"/></linearGradient>`;
const star4 = (cx, cy, r, k = 0.28, rot = -90) => { const a = []; for (let i = 0; i < 8; i++) a.push(P(cx, cy, i % 2 ? r * k : r, rot + i * 45)); return a; };
// 벽돌 한 장: 모서리가 이따금 깨진 둥근 사각형
const brick = (x, y, w, h, fill, chip) => {
  const r = 3;
  let d;
  if (chip === 1) d = `M${x + r},${y} H${x + w - 7} L${x + w},${y + 6} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  else if (chip === 2) d = `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + 8} L${x},${y + h - 5} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  else d = `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  return `<path d="${d}" fill="${fill}" stroke="${OL}" stroke-opacity=".28" stroke-width="1"/>` +
    `<path d="M${x + 3},${y + 1.6} H${x + w - 4}" stroke="#fff" stroke-opacity=".42" stroke-width="1.6" stroke-linecap="round"/>` +
    `<path d="M${x + 3},${y + h - 1.4} H${x + w - 3}" stroke="${OL}" stroke-opacity=".22" stroke-width="2" stroke-linecap="round"/>` +
    (rnd() < 0.25 ? `<circle cx="${f(x + 6 + rnd() * (w - 12))}" cy="${f(y + 5 + rnd() * (h - 10))}" r="${f(0.8 + rnd())}" fill="${OL}" opacity=".18"/>` : "");
};

// ---------- 잿빛성: 성벽 한 칸 (잿빛 / 물든 6색) ----------
const WALL_W = 220, WALL_H = 210, TOP = 34;
const wallSeg = (name, base, ash) => {
  seed = 11;
  let b = "";
  const mortar = shade(base, -0.38);
  // 몸통 바탕(줄눈)
  b += `<path d="M0,${TOP} H${WALL_W} V${WALL_H} H0 Z" fill="${mortar}"/>`;
  // 벽돌
  const bh = 22, bw = 46;
  for (let row = 0, y = TOP + 16; y < WALL_H - 2; row++, y += bh + 3) {
    for (let x = row % 2 ? -bw / 2 : 2; x < WALL_W; x += bw + 3) {
      const k = (rnd() - 0.5) * 0.26 - (y / WALL_H) * 0.1;
      const x0 = Math.max(1, x), x1 = Math.min(WALL_W - 1, x + bw);
      if (x1 - x0 < 8) continue;
      b += brick(f(x0), f(y), f(x1 - x0), Math.min(bh, WALL_H - 2 - y), shade(base, k), rnd() < 0.18 ? 1 + (rnd() < 0.5 ? 1 : 0) : 0);
    }
  }
  // 처마 돌띠
  b += `<rect x="-2" y="${TOP}" width="${WALL_W + 4}" height="14" rx="3" fill="url(#cap)" stroke="${OL}" stroke-width="2"/>`;
  b += `<path d="M2,${TOP + 3} H${WALL_W - 2}" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/>`;
  // 성가퀴 (네 개)
  for (let i = 0; i < 4; i++) {
    const mx = 10 + i * 54, mw = 36;
    b += `<path d="M${mx},${TOP} V8 Q${mx},4 ${mx + 4},4 H${mx + mw - 4} Q${mx + mw},4 ${mx + mw},8 V${TOP} Z" fill="url(#mer)" stroke="${OL}" stroke-width="2"/>`;
    b += `<path d="M${mx + 4},8 H${mx + mw - 6}" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>`;
    b += `<path d="M${mx + 10},${TOP - 4} V16 M${mx + 22},${TOP - 4} V20" stroke="${OL}" stroke-opacity=".18" stroke-width="1.4"/>`;
  }
  // 빛: 위는 밝게, 아래는 그늘 (위에서 오는 부드러운 빛)
  b += `<rect x="0" y="${TOP}" width="${WALL_W}" height="${WALL_H - TOP}" fill="url(#lt)"/>`;
  if (ash) {
    // 금 · 재 얼룩
    b += `<path d="M60,${TOP + 20} l6,14 -4,10 8,16 -3,12" fill="none" stroke="${OL}" stroke-opacity=".45" stroke-width="1.6" stroke-linejoin="round"/>`;
    b += `<path d="M170,${TOP + 60} l-5,12 6,9 -4,14" fill="none" stroke="${OL}" stroke-opacity=".4" stroke-width="1.4"/>`;
    b += `<ellipse cx="120" cy="${WALL_H - 18}" rx="80" ry="16" fill="#3a3550" opacity=".18"/>`;
  } else {
    // 물든 칸: 붓 자국 결 + 반짝임 두어 개
    b += `<path d="M8,${TOP + 40} C60,${TOP + 30} 120,${TOP + 52} 212,${TOP + 38}" stroke="#fff" stroke-opacity=".22" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    b += `<polygon points="${pts(star4(184, TOP + 30, 7, 0.25))}" fill="#fff"/><polygon points="${pts(star4(40, TOP + 96, 5, 0.25))}" fill="#fff" opacity=".85"/>`;
  }
  // 칸 사이 기둥 그늘
  b += `<rect x="${WALL_W - 4}" y="${TOP}" width="4" height="${WALL_H - TOP}" fill="${OL}" opacity=".25"/>`;
  save(name, svg(WALL_W, WALL_H, `<defs>
<linearGradient id="cap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(base, 0.45)}"/><stop offset="1" stop-color="${shade(base, -0.12)}"/></linearGradient>
<linearGradient id="mer" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${shade(base, 0.35)}"/><stop offset=".6" stop-color="${base}"/><stop offset="1" stop-color="${shade(base, -0.2)}"/></linearGradient>
<linearGradient id="lt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1e1636" stop-opacity=".32"/></linearGradient></defs>
${b}`));
};
wallSeg("wall_ash.svg", "#a7abbd", true);
[["wall_p1.svg", "#f6b3c8"], ["wall_p2.svg", "#f9cf96"], ["wall_p3.svg", "#f3e08a"], ["wall_p4.svg", "#ade4b8"], ["wall_p5.svg", "#a6cff5"], ["wall_p6.svg", "#c6b2f4"]].forEach(([n, c]) => wallSeg(n, c, false));

// ---------- 성문: 돌 아치 + 나무 문 + 쇠띠 ----------
{
  seed = 3;
  const W = 170, H = 200, cx = 85, R = 62, base = 132;
  let vs = "";
  for (let i = 0; i <= 8; i++) {
    const a0 = 180 + i * 22.5 - 11, a1 = a0 + 22.5;
    const o0 = P(cx, base, R + 22, a0), o1 = P(cx, base, R + 22, a1), i1 = P(cx, base, R, a1), i0 = P(cx, base, R, a0);
    vs += `<path d="M${pts([o0])} A${R + 22},${R + 22} 0 0 1 ${pts([o1])} L${pts([i1])} A${R},${R} 0 0 0 ${pts([i0])} Z" fill="${shade("#b8bccc", (rnd() - 0.5) * 0.3)}" stroke="${OL}" stroke-width="1.6"/>`;
  }
  let planks = "";
  for (let i = 0; i < 6; i++) {
    const x = cx - R + i * (R * 2 / 6);
    planks += `<rect x="${f(x)}" y="${base - R}" width="${f(R * 2 / 6)}" height="${H - base + R}" fill="${shade("#8a5a3a", (rnd() - 0.5) * 0.3)}"/><path d="M${f(x + 3)},${base - R + 8} V${H - 4}" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>`;
  }
  const bands = [base - 10, base + 34].map((y) => `<rect x="${cx - R}" y="${y}" width="${R * 2}" height="9" fill="#4a4258"/><path d="M${cx - R},${y + 2} H${cx + R}" stroke="#fff" stroke-opacity=".3"/>` + [0.15, 0.4, 0.6, 0.85].map((k) => `<circle cx="${f(cx - R + R * 2 * k)}" cy="${y + 4.5}" r="2.4" fill="#c9c2d8" stroke="${OL}" stroke-width=".8"/>`).join("")).join("");
  save("gate.svg", svg(W, H, `<defs><clipPath id="door"><path d="M${cx - R},${H} V${base} A${R},${R} 0 0 1 ${cx + R},${base} V${H} Z"/></clipPath>
<radialGradient id="lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3c4"/><stop offset=".5" stop-color="#ffd36b" stop-opacity=".6"/><stop offset="1" stop-color="#ffd36b" stop-opacity="0"/></radialGradient>
<linearGradient id="dsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1636" stop-opacity=".55"/><stop offset=".4" stop-color="#1e1636" stop-opacity=".1"/><stop offset="1" stop-color="#1e1636" stop-opacity=".35"/></linearGradient></defs>
<path d="M${cx - R - 22},${H} V${base} A${R + 22},${R + 22} 0 0 1 ${cx + R + 22},${base} V${H} Z" fill="#9aa0b4" stroke="${OL}" stroke-width="2.5"/>
${vs}
<g clip-path="url(#door)">${planks}${bands}<rect x="${cx - 1.5}" y="${base - R}" width="3" height="${H}" fill="${OL}" opacity=".5"/><rect x="${cx - R}" y="${base - R}" width="${R * 2}" height="${H}" fill="url(#dsh)"/></g>
<path d="M${cx - R},${H} V${base} A${R},${R} 0 0 1 ${cx + R},${base} V${H}" fill="none" stroke="${OL}" stroke-width="2.5"/>
<circle cx="${cx - 12}" cy="${base + 18}" r="6" fill="none" stroke="#e9bd5c" stroke-width="2.4"/><circle cx="${cx + 12}" cy="${base + 18}" r="6" fill="none" stroke="#e9bd5c" stroke-width="2.4"/>
<path d="M${cx - 9},${base - R - 22} h18 l-3,-12 h-12 Z" fill="${shade("#b8bccc", 0.3)}" stroke="${OL}" stroke-width="2"/>
<circle cx="${cx}" cy="${base - R - 2}" r="26" fill="url(#lamp)"/>
<rect x="${cx - 7}" y="${base - R - 14}" width="14" height="18" rx="3" fill="#ffe9a8" stroke="${OL}" stroke-width="1.8"/><path d="M${cx - 9},${base - R - 14} h18 M${cx},${base - R - 22} v8" stroke="${OL}" stroke-width="1.8"/>`));
}

// ---------- 망루 깃발 (칸 위 보상 표시) ----------
const pennant = (name, col) => save(name, svg(90, 110, `<defs><linearGradient id="c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(col, 0.35)}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${shade(col, -0.2)}"/></linearGradient>${GOLD("g", 0, 1)}</defs>
<rect x="12" y="10" width="5" height="96" rx="2.5" fill="url(#g)" stroke="${OL}" stroke-width="1.8"/>
<circle cx="14.5" cy="9" r="6" fill="url(#g)" stroke="${OL}" stroke-width="1.8"/>
<path d="M17,18 C40,12 60,26 84,20 L70,38 L84,56 C60,62 40,48 17,56 Z" fill="url(#c)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M22,24 C40,20 56,30 74,26" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M22,50 C40,44 56,54 72,50" stroke="${OL}" stroke-opacity=".2" stroke-width="3" fill="none" stroke-linecap="round"/>`));
[["pen_1.svg", "#ff9fbf"], ["pen_2.svg", "#ffbf6b"], ["pen_3.svg", "#f2cf4e"], ["pen_4.svg", "#6fd39a"], ["pen_5.svg", "#6fb6f2"], ["pen_6.svg", "#a98bf2"], ["pen_ash.svg", "#9aa0b4"]].forEach(([n, c]) => pennant(n, c));

// ---------- 모래시계 틀 (놋쇠 뚜껑 + 꼬인 나무 기둥 + 유리 윤곽) ----------
{
  const W = 240, H = 440;
  let beads = "";
  for (let i = 0; i < 9; i++) beads += `<circle cx="${30 + i * 22.5}" cy="34" r="3" fill="#fff6d2" stroke="#a86e1a" stroke-width=".8"/><circle cx="${30 + i * 22.5}" cy="${H - 34}" r="3" fill="#fff6d2" stroke="#a86e1a" stroke-width=".8"/>`;
  const post = (x) => { let s = `<rect x="${x - 7}" y="44" width="14" height="${H - 88}" rx="7" fill="url(#wood)" stroke="${OL}" stroke-width="2"/>`; for (let y = 56; y < H - 50; y += 18) s += `<path d="M${x - 7},${y} Q${x},${y + 9} ${x + 7},${y + 2}" stroke="${OL}" stroke-opacity=".35" stroke-width="1.4" fill="none"/>`; return s; };
  const bulb = `M40,52 C40,150 104,186 112,${H / 2} C104,${H - 186} 40,${H - 150} 40,${H - 52} H200 C200,${H - 150} 136,${H - 186} 128,${H / 2} C136,186 200,150 200,52 Z`;
  save("hourglass.svg", svg(W, H, `<defs>${GOLD("g", 0, 1)}
<linearGradient id="wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4a2a"/><stop offset=".4" stop-color="#c89060"/><stop offset="1" stop-color="#6a3a20"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".25" stop-color="#fff" stop-opacity=".08"/><stop offset=".7" stop-color="#fff" stop-opacity=".02"/><stop offset=".9" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/></linearGradient></defs>
<path d="${bulb}" fill="url(#glass)" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M54,70 C56,140 92,176 104,206" stroke="#fff" stroke-opacity=".75" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M56,${H - 70} C58,${H - 120} 80,${H - 160} 98,${H - 190}" stroke="#fff" stroke-opacity=".5" stroke-width="4" fill="none" stroke-linecap="round"/>
${post(22)}${post(W - 22)}
<rect x="6" y="16" width="${W - 12}" height="36" rx="10" fill="url(#g)" stroke="${OL}" stroke-width="2.6"/>
<rect x="6" y="${H - 52}" width="${W - 12}" height="36" rx="10" fill="url(#g)" stroke="${OL}" stroke-width="2.6"/>
<rect x="18" y="4" width="${W - 36}" height="16" rx="6" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/>
<rect x="18" y="${H - 20}" width="${W - 36}" height="16" rx="6" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/>
<path d="M14,22 H${W - 14}" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>${beads}`));
}

// ---------- 등급전 계급 엠블럼 6종 (방패 + 보석 + 날개) ----------
{
  const tiers = [["br", "#c88a58", "B", 0], ["si", "#a9b6c9", "S", 0], ["go", "#f2b632", "G", 1], ["pl", "#3fd1c0", "P", 1], ["di", "#6ec6ff", "D", 2], ["ma", "#ff5fb0", "M", 2]];
  for (const [k, c, L, wing] of tiers) {
    const sh = "M60,14 L100,26 C100,70 88,96 60,112 C32,96 20,70 20,26 Z";
    const wings = wing ? [-1, 1].map((s) => { let w = ""; for (let i = 0; i < 3 + wing; i++) { const y = 34 + i * 12; w += `<path d="M${60 + s * 34},${y} C${60 + s * (50 + i * 4)},${y - 14} ${60 + s * (66 + i * 2)},${y - 4} ${60 + s * (70 - i * 3)},${y + 10} C${60 + s * 56},${y + 12} ${60 + s * 44},${y + 10} ${60 + s * 34},${y + 6} Z" fill="url(#wg)" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>`; } return w; }).join("") : "";
    save(`emb_${k}.svg`, svg(120, 124, `<defs>${METAL("m", c)}${GOLD("g")}
<linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${shade(c, 0.5)}"/></linearGradient>
<radialGradient id="gem" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="${shade(c, 0.3)}"/><stop offset="1" stop-color="${shade(c, -0.45)}"/></radialGradient>
<linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
${wings}
<path d="${sh}" fill="url(#m)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M60,22 L92,32 C92,68 82,90 60,104 C38,90 28,68 28,32 Z" fill="none" stroke="${shade(c, 0.6)}" stroke-width="2"/>
<path d="M60,22 L92,32 C92,46 90,54 86,60 L34,60 C30,54 28,46 28,32 Z" fill="url(#gl)"/>
<circle cx="60" cy="58" r="17" fill="url(#gem)" stroke="${OL}" stroke-width="2.2"/>
<text x="60" y="65" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="20" fill="#fff" stroke="${OL}" stroke-width="2.4" paint-order="stroke">${L}</text>
<path d="M50,14 L60,2 L70,14 Z" fill="url(#g)" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<polygon points="${pts(star4(92, 22, 6, 0.25))}" fill="#fff"/>`));
  }
}

// ---------- 장미창 (스테인드글라스, 색 / 잿빛) ----------
const rose = (name, ash) => {
  const C = 160, cols = ["#ff9fbf", "#ffc77a", "#ffe57a", "#8fe0a8", "#7cc4ff", "#b39bff"];
  let g = "";
  for (let i = 0; i < 12; i++) {
    const a0 = i * 30 - 90, a1 = a0 + 30, am = a0 + 15;
    const p0 = P(C, C, 58, a0), p1 = P(C, C, 58, a1), q = P(C, C, 150, am), c0 = P(C, C, 140, a0 + 4), c1 = P(C, C, 140, a1 - 4);
    const col = ash ? shade("#b8b4c6", (i % 2) * 0.12) : cols[i % 6];
    g += `<path d="M${pts([p0])} C${pts([c0])} ${pts([q])} ${pts([q])} C${pts([q])} ${pts([c1])} ${pts([p1])} Z" fill="${col}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
    const r1 = P(C, C, 100, am);
    g += `<circle cx="${f(r1[0])}" cy="${f(r1[1])}" r="12" fill="${ash ? "#d8d4e2" : shade(cols[(i + 3) % 6], 0.25)}" stroke="${OL}" stroke-width="2.4"/>`;
    const s = P(C, C, 76, am);
    g += `<path d="M${pts([s])} L${pts([P(C, C, 128, am)])}" stroke="#fff" stroke-opacity="${ash ? 0.2 : 0.45}" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  let inner = "";
  for (let i = 0; i < 6; i++) { const a = i * 60; const p = P(C, C, 34, a); inner += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="17" fill="${ash ? "#cfcbda" : cols[i]}" stroke="${OL}" stroke-width="2.4"/>`; }
  save(name, svg(320, 320, `<defs>
<radialGradient id="st" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#e8dcc4"/><stop offset="1" stop-color="#bba98a"/></radialGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity="${ash ? 0 : 0.55}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<circle cx="${C}" cy="${C}" r="156" fill="url(#st)" stroke="${OL}" stroke-width="3.5"/>
<circle cx="${C}" cy="${C}" r="146" fill="${ash ? "#8a8698" : "#3a2a5a"}" stroke="${OL}" stroke-width="2"/>
${g}${inner}
<circle cx="${C}" cy="${C}" r="16" fill="${ash ? "#e6e2ee" : "#fff6d2"}" stroke="${OL}" stroke-width="2.6"/>
<circle cx="${C}" cy="${C}" r="150" fill="url(#glow)"/>
<path d="M60,90 A120,120 0 0 1 150,40" stroke="#fff" stroke-opacity=".55" stroke-width="5" fill="none" stroke-linecap="round"/>`));
};
rose("rose_c.svg", false);
rose("rose_a.svg", true);

// ---------- 시상대 (대리석 단 1·2·3) ----------
{
  const block = (x, w, top, n, c) => `<g><rect x="${x}" y="${top}" width="${w}" height="${300 - top}" fill="url(#mar)" stroke="${OL}" stroke-width="2.6"/>
<rect x="${x - 6}" y="${top - 14}" width="${w + 12}" height="18" rx="4" fill="url(#mar2)" stroke="${OL}" stroke-width="2.4"/>
<path d="M${x - 2},${top - 10} H${x + w + 2}" stroke="#fff" stroke-opacity=".8" stroke-width="2"/>
<rect x="${x + 8}" y="${top + 16}" width="${w - 16}" height="4" fill="url(#g)"/>
<path d="M${x + 20},${top + 40} C${x + 40},${top + 70} ${x + 30},${top + 110} ${x + 60},${top + 140}" stroke="#b9aecb" stroke-width="1.4" fill="none" opacity=".7"/>
<circle cx="${x + w / 2}" cy="${top + 64}" r="30" fill="url(#g)" stroke="${OL}" stroke-width="2.6"/>
<circle cx="${x + w / 2}" cy="${top + 64}" r="23" fill="${c}" stroke="${OL}" stroke-width="1.8"/>
<text x="${x + w / 2}" y="${top + 75}" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="30" fill="#fff" stroke="${OL}" stroke-width="3" paint-order="stroke">${n}</text>
<rect x="${x + w - 12}" y="${top}" width="12" height="${300 - top}" fill="${OL}" opacity=".12"/></g>`;
  save("podium.svg", svg(600, 300, `<defs>${GOLD("g")}
<linearGradient id="mar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#f1ebfa"/><stop offset="1" stop-color="#d6cbe8"/></linearGradient>
<linearGradient id="mar2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dcd2ee"/></linearGradient></defs>
${block(14, 180, 120, 2, "#9aa8bb")}${block(406, 180, 160, 3, "#c88a58")}${block(204, 192, 70, 1, "#f2b632")}`));
}

// ---------- 성화 그릇 ----------
save("brazier.svg", svg(260, 200, `<defs>${GOLD("g")}
<linearGradient id="br" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9b8"/><stop offset=".35" stop-color="#d9a24a"/><stop offset=".8" stop-color="#8a5a24"/><stop offset="1" stop-color="#b8823a"/></linearGradient>
<radialGradient id="in" cx=".5" cy=".2" r=".7"><stop offset="0" stop-color="#fff3c4"/><stop offset=".5" stop-color="#ffb347"/><stop offset="1" stop-color="#8a3a1a"/></radialGradient></defs>
<path d="M100,120 L86,186 H174 L160,120 Z" fill="url(#br)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
<rect x="70" y="182" width="120" height="14" rx="5" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/>
<path d="M18,36 C18,110 70,132 130,132 C190,132 242,110 242,36 Z" fill="url(#br)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="130" cy="36" rx="112" ry="20" fill="url(#in)" stroke="${OL}" stroke-width="2.8"/>
<path d="M30,52 C50,96 90,112 130,114" stroke="#fff" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round"/>
${[0, 1, 2, 3, 4].map((i) => `<path d="M${50 + i * 40},70 q6,10 0,20 q-6,-10 0,-20" fill="#fff6d2" stroke="${OL}" stroke-width="1.4"/>`).join("")}
<path d="M20,46 H240" stroke="url(#g)" stroke-width="6"/>`));

// ---------- 금 액자 (기억 복도) ----------
save("frame.svg", svg(120, 144, `<defs>${GOLD("g")}${GOLD("g2", 1, 0)}</defs>
<path d="M0,0 H120 V144 H0 Z M14,14 V130 H106 V14 Z" fill="url(#g)" fill-rule="evenodd" stroke="${OL}" stroke-width="2.6"/>
<path d="M6,6 H114 V138 H6 Z M14,14 V130 H106 V14 Z" fill="none" stroke="#fff6d2" stroke-width="1.6" opacity=".9"/>
<path d="M14,14 L4,4 M106,14 L116,4 M14,130 L4,140 M106,130 L116,140" stroke="${OL}" stroke-opacity=".35" stroke-width="1.6"/>
${[[0, 0], [120, 0], [0, 144], [120, 144]].map(([x, y]) => `<circle cx="${x ? x - 7 : 7}" cy="${y ? y - 7 : 7}" r="5.5" fill="url(#g2)" stroke="${OL}" stroke-width="1.8"/>`).join("")}
<rect x="14" y="14" width="92" height="116" fill="none" stroke="${OL}" stroke-width="2.2"/>`));

// ---------- 책 등 (가죽 + 금박 띠) ----------
["#b0607e", "#c8844a", "#4f9a72", "#8a86a0", "#4a4064"].forEach((c, i) => save(`spine_${i}.svg`, svg(50, 340, `<defs>
<linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(c, -0.35)}"/><stop offset=".3" stop-color="${shade(c, 0.12)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -0.45)}"/></linearGradient>${GOLD("g", 1, 0)}</defs>
<rect x="1.5" y="1.5" width="47" height="337" rx="5" fill="url(#l)" stroke="${OL}" stroke-width="2.4"/>
${[22, 30, 300, 308].map((y) => `<rect x="4" y="${y}" width="42" height="4" fill="url(#g)" stroke="${OL}" stroke-width=".8"/>`).join("")}
<path d="M10,40 V290" stroke="#fff" stroke-opacity=".18" stroke-width="3"/>
<path d="M25,46 l5,6 -5,6 -5,-6 Z M25,276 l5,6 -5,6 -5,-6 Z" fill="url(#g)" stroke="${OL}" stroke-width=".8"/>`)));

// ---------- 요일 회전판 테두리 (나무 테 + 놋쇠 못 + 눈금) ----------
{
  const C = 240;
  let s = "";
  for (let i = 0; i < 7; i++) { const p = P(C, C, 228, i * (360 / 7) - 90 - 360 / 14); s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="7" fill="url(#g)" stroke="${OL}" stroke-width="2"/>`; }
  for (let i = 0; i < 70; i++) { const a = i * (360 / 70) - 90; const p0 = P(C, C, 214, a), p1 = P(C, C, i % 10 === 5 ? 204 : 209, a); s += `<path d="M${pts([p0])} L${pts([p1])}" stroke="${OL}" stroke-opacity=".45" stroke-width="1.4"/>`; }
  save("dial_rim.svg", svg(480, 480, `<defs>${GOLD("g")}
<linearGradient id="w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9c48e"/><stop offset=".5" stop-color="#b47a44"/><stop offset="1" stop-color="#7a4a2a"/></linearGradient></defs>
<circle cx="${C}" cy="${C}" r="232" fill="none" stroke="url(#w)" stroke-width="22"/>
<circle cx="${C}" cy="${C}" r="243" fill="none" stroke="${OL}" stroke-width="3"/>
<circle cx="${C}" cy="${C}" r="221" fill="none" stroke="${OL}" stroke-width="2.6"/>
<path d="M60,140 A200,200 0 0 1 200,30" stroke="#fff" stroke-opacity=".45" stroke-width="5" fill="none" stroke-linecap="round"/>
${s}`));
}
save("dial_ptr.svg", svg(60, 74, `<defs>${GOLD("g", 0, 1)}</defs><path d="M30,72 L6,22 C6,8 18,2 30,2 C42,2 54,8 54,22 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><circle cx="30" cy="22" r="9" fill="#ff9fbf" stroke="${OL}" stroke-width="2"/><path d="M14,16 C18,8 26,6 32,6" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>`));

// ---------- 성곽 길 (잿빛성 C 타임라인): 돌 다리 ----------
{
  seed = 5;
  const W = 1100, H = 70;
  let st = "";
  for (let x = 0; x < W; ) { const w = 30 + rnd() * 26; st += `<rect x="${f(x)}" y="18" width="${f(Math.min(w, W - x) - 2)}" height="26" rx="4" fill="${shade("#9aa0b4", (rnd() - 0.5) * 0.3)}" stroke="${OL}" stroke-opacity=".35"/><path d="M${f(x + 3)},20 h${f(w - 8)}" stroke="#fff" stroke-opacity=".35" stroke-width="1.6"/>`; x += w; }
  let arches = "";
  for (let x = 40; x < W; x += 110) arches += `<path d="M${x},70 V58 A26,14 0 0 1 ${x + 52},58 V70 Z" fill="#2a2440" opacity=".55"/>`;
  save("bridge.svg", svg(W, H, `<rect x="0" y="14" width="${W}" height="56" fill="#6f7589" stroke="${OL}" stroke-width="2.4"/>${st}<rect x="0" y="44" width="${W}" height="26" fill="#7c8296"/>${arches}<path d="M0,14 H${W}" stroke="${OL}" stroke-width="3"/><rect x="0" y="8" width="${W}" height="10" rx="3" fill="#c9cdd9" stroke="${OL}" stroke-width="2"/>`));
}
// 작은 망루 (정거장)
const tower = (name, roof, body) => save(name, svg(90, 130, `<defs><linearGradient id="r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(roof, 0.3)}"/><stop offset=".6" stop-color="${roof}"/><stop offset="1" stop-color="${shade(roof, -0.3)}"/></linearGradient>
<linearGradient id="b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(body, 0.25)}"/><stop offset=".55" stop-color="${body}"/><stop offset="1" stop-color="${shade(body, -0.3)}"/></linearGradient></defs>
<rect x="20" y="52" width="50" height="76" fill="url(#b)" stroke="${OL}" stroke-width="2.4"/>
${[64, 82, 100, 118].map((y, i) => `<path d="M20,${y} H70" stroke="${OL}" stroke-opacity=".25" stroke-width="1.4"/><path d="M${i % 2 ? 36 : 46},${y - 18} V${y}" stroke="${OL}" stroke-opacity=".2" stroke-width="1.2"/>`).join("")}
<path d="M38,128 V108 A7,7 0 0 1 52,108 V128 Z" fill="#2a2440"/>
<rect x="34" y="72" width="22" height="16" rx="8" fill="#ffe9a8" stroke="${OL}" stroke-width="1.8"/>
<path d="M12,56 L45,10 L78,56 Z" fill="url(#r)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M22,50 L45,18" stroke="#fff" stroke-opacity=".5" stroke-width="2.4" stroke-linecap="round"/>
<path d="M45,10 V0" stroke="${OL}" stroke-width="2"/>`));
tower("tower_c.svg", "#b39bff", "#e6e2ee");
tower("tower_a.svg", "#8a86a0", "#b8bccc");

// ---------- 천 깃발 (세로, 등급전 사다리 기둥) ----------
save("banner_v.svg", svg(200, 560, `<defs><linearGradient id="c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2e2150"/><stop offset=".18" stop-color="#4a3480"/><stop offset=".5" stop-color="#3a2868"/><stop offset=".8" stop-color="#4a3480"/><stop offset="1" stop-color="#241a44"/></linearGradient>${GOLD("g", 1, 0)}</defs>
<rect x="0" y="0" width="200" height="16" rx="8" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/>
<path d="M14,14 H186 V520 L100,556 L14,520 Z" fill="url(#c)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M24,22 H176 V514 L100,546 L24,514 Z" fill="none" stroke="#e9bd5c" stroke-opacity=".7" stroke-width="1.4"/>
${[60, 140, 220, 300, 380, 460].map((y) => `<path d="M30,${y} C80,${y + 10} 120,${y - 6} 170,${y + 4}" stroke="#fff" stroke-opacity=".05" stroke-width="18" fill="none"/>`).join("")}`));

// ---------- 양피지 증명서 + 밀랍 도장 ----------
{
  seed = 9;
  let edge = "M20,14";
  for (let x = 20; x <= 540; x += 20) edge += ` L${x},${f(10 + rnd() * 6)}`;
  for (let y = 20; y <= 360; y += 20) edge += ` L${f(552 + rnd() * 6)},${y}`;
  for (let x = 540; x >= 20; x -= 20) edge += ` L${x},${f(364 + rnd() * 6)}`;
  for (let y = 360; y >= 20; y -= 20) edge += ` L${f(6 + rnd() * 6)},${y}`;
  save("parchment.svg", svg(564, 378, `<defs><radialGradient id="p" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#fffaf0"/><stop offset=".7" stop-color="#f6ead2"/><stop offset="1" stop-color="#e2cfa8"/></radialGradient>${GOLD("g")}</defs>
<path d="${edge} Z" fill="url(#p)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<rect x="34" y="30" width="496" height="318" rx="6" fill="none" stroke="url(#g)" stroke-width="3"/>
<rect x="42" y="38" width="480" height="302" rx="4" fill="none" stroke="#c94a85" stroke-opacity=".45" stroke-width="1.4"/>
${[[42, 38], [522, 38], [42, 340], [522, 340]].map(([x, y]) => `<polygon points="${pts(star4(x, y, 9, 0.28))}" fill="url(#g)" stroke="${OL}" stroke-width="1.4"/>`).join("")}`));
  let wax = "M60,8";
  for (let i = 1; i <= 24; i++) { const p = P(60, 60, i % 2 ? 50 + rnd() * 4 : 54, -90 + i * 15); wax += ` L${f(p[0])},${f(p[1])}`; }
  save("seal.svg", svg(120, 150, `<defs><radialGradient id="w" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9fcf"/><stop offset=".5" stop-color="#d93a86"/><stop offset="1" stop-color="#8a1a50"/></radialGradient></defs>
<path d="M44,96 L30,146 L48,136 L56,150 L62,100 Z M76,96 L90,146 L72,136 L64,150 L58,100 Z" fill="#9a6bff" stroke="${OL}" stroke-width="2"/>
<path d="${wax} Z" fill="url(#w)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<circle cx="60" cy="60" r="34" fill="none" stroke="#ffd0e8" stroke-width="2.4" stroke-dasharray="3 4"/>
<polygon points="${pts(star4(60, 60, 20, 0.3))}" fill="#ffe3f0" stroke="${OL}" stroke-width="1.6"/>
<path d="M30,34 C38,24 50,20 60,20" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>`));
}

// ---------- 결투장 아치 문 ----------
{
  seed = 4;
  let vs = "";
  for (let i = 0; i <= 10; i++) { const a0 = 180 + i * 18 - 9, a1 = a0 + 18; const o0 = P(135, 135, 135, a0), o1 = P(135, 135, 135, a1), i1 = P(135, 135, 113, a1), i0 = P(135, 135, 113, a0); vs += `<path d="M${pts([o0])} A135,135 0 0 1 ${pts([o1])} L${pts([i1])} A113,113 0 0 0 ${pts([i0])} Z" fill="${shade("#ecdcc6", (rnd() - 0.5) * 0.2)}" stroke="${OL}" stroke-width="1.8"/>`; }
  let bl = "";
  for (let y = 140; y < 330; y += 24) for (const x of [0, 248]) bl += `<rect x="${x + 1}" y="${y}" width="21" height="22" rx="3" fill="${shade("#e2d0b6", (rnd() - 0.5) * 0.22)}" stroke="${OL}" stroke-opacity=".4"/>`;
  save("arch.svg", svg(270, 330, `<defs>${GOLD("g")}</defs>${vs}${bl}
<path d="M0,330 V135 A135,135 0 0 1 270,135 V330" fill="none" stroke="${OL}" stroke-width="3"/>
<path d="M22,330 V135 A113,113 0 0 1 248,135 V330" fill="none" stroke="${OL}" stroke-width="2.6"/>
<path d="M120,2 H150 L144,30 H126 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M30,120 A105,105 0 0 1 120,32" stroke="#fff" stroke-opacity=".55" stroke-width="4" fill="none" stroke-linecap="round"/>`));
}

// ---------- 펼친 책 (회랑 B) ----------
save("book_open.svg", svg(470, 490, `<defs><linearGradient id="l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3e6cc"/><stop offset=".85" stop-color="#fffaf0"/><stop offset="1" stop-color="#d9c8a6"/></linearGradient>
<linearGradient id="r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9c8a6"/><stop offset=".15" stop-color="#fffaf0"/><stop offset="1" stop-color="#f1e2c4"/></linearGradient>
<linearGradient id="cv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a3a5a"/><stop offset="1" stop-color="#4a1f3a"/></linearGradient>${GOLD("g")}</defs>
<path d="M8,30 Q120,8 235,30 Q350,8 462,30 V478 Q350,456 235,482 Q120,456 8,478 Z" fill="url(#cv)" stroke="${OL}" stroke-width="2.8"/>
<path d="M20,26 Q124,6 235,24 V470 Q124,450 20,468 Z" fill="url(#l)" stroke="${OL}" stroke-width="2"/>
<path d="M450,26 Q346,6 235,24 V470 Q346,450 450,468 Z" fill="url(#r)" stroke="${OL}" stroke-width="2"/>
${[0, 1, 2].map((i) => `<path d="M${22 + i * 2},${470 + i * 2} Q124,${452 + i * 2} 235,${472 + i * 2} Q346,${452 + i * 2} ${448 - i * 2},${470 + i * 2}" fill="none" stroke="#c9b48a" stroke-width="1.4"/>`).join("")}
<path d="M235,24 V470" stroke="${OL}" stroke-opacity=".3" stroke-width="3"/>
<path d="M228,10 H242 V70 L235,62 L228,70 Z" fill="#c94a85" stroke="${OL}" stroke-width="1.8"/>
<polygon points="${pts(star4(40, 46, 7, 0.28))}" fill="url(#g)"/><polygon points="${pts(star4(430, 46, 7, 0.28))}" fill="url(#g)"/>`));

// ---------- 결정 (원소섬 결과 C) ----------
save("crystal.svg", svg(220, 280, `<defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eafff2"/><stop offset=".5" stop-color="#5fdc9a"/><stop offset="1" stop-color="#17704a"/></linearGradient>
<linearGradient id="b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff5d6"/><stop offset="1" stop-color="#2bb673"/></linearGradient>
<linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2bb673"/><stop offset="1" stop-color="#0e4a30"/></linearGradient></defs>
<path d="M110,6 L198,72 L170,232 L110,274 L50,232 L22,72 Z" fill="url(#c)" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/>
<path d="M110,6 L22,72 L70,110 Z" fill="url(#a)"/><path d="M110,6 L198,72 L150,110 Z" fill="url(#b)"/>
<path d="M110,6 L70,110 H150 Z" fill="#dffbea"/><path d="M70,110 L50,232 L110,274 Z" fill="url(#b)" opacity=".85"/><path d="M150,110 L170,232 L110,274 Z" fill="#1f8a58"/>
<path d="M70,110 H150 L110,274 Z" fill="url(#a)" opacity=".7"/>
<path d="M110,6 L22,72 L50,232 L110,274 L170,232 L198,72 Z M22,72 L70,110 H150 L198,72 M70,110 L110,274 L150,110 M70,110 L50,232 M150,110 L170,232" fill="none" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<path d="M40,80 L74,104" stroke="#fff" stroke-width="4" stroke-linecap="round"/><polygon points="${pts(star4(150, 52, 12, 0.22))}" fill="#fff"/>`));

// ---------- 메달 방석 ----------
save("cushion.svg", svg(320, 110, `<defs><radialGradient id="c" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#ff9fcf"/><stop offset=".6" stop-color="#c94a85"/><stop offset="1" stop-color="#7a2050"/></radialGradient>${GOLD("g")}</defs>
<path d="M14,52 C10,22 60,10 160,10 C260,10 310,22 306,52 C310,86 260,100 160,100 C60,100 10,86 14,52 Z" fill="url(#c)" stroke="${OL}" stroke-width="2.8"/>
<path d="M40,40 C80,24 240,24 280,40" stroke="#fff" stroke-opacity=".45" stroke-width="5" fill="none" stroke-linecap="round"/>
${[[14, 52], [306, 52], [160, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="url(#g)" stroke="${OL}" stroke-width="2"/>`).join("")}
<path d="M30,62 C100,82 220,82 290,62" stroke="url(#g)" stroke-width="3" fill="none" stroke-dasharray="2 6"/>`));

// ---------- 신전 계급장 8 (메달 원판 + 숫자) ----------
{
  const R = [["0", "#c9b8f4", "견습"], ["1", "#ffd36b", "3등"], ["2", "#8fd6ff", "2등"], ["3", "#8fe0a8", "1등"], ["4", "#ffb38a", "부선장"], ["5", "#ff9fbf", "선장"], ["6", "#b39bff", "대선장"], ["7", "rb", "전설"]];
  for (const [k, c, t] of R) {
    let rim = "";
    for (let i = 0; i < 20; i++) { const a0 = i * 18 - 90, a1 = a0 + 18; const s = P(60, 60, 50, a0), e = P(60, 60, 50, a1), q = P(60, 60, 58, a0 + 9); rim += (i ? "" : `M${pts([s])}`) + ` Q${pts([q])} ${pts([e])}`; }
    const face = c === "rb" ? `url(#rb)` : `url(#en)`;
    save(`rank_${k}.svg`, svg(120, 120, `<defs>${GOLD("g")}
<radialGradient id="en" cx=".4" cy=".34" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="${c === "rb" ? "#fff" : c}"/><stop offset="1" stop-color="${c === "rb" ? "#9a6bff" : shade(c, -0.4)}"/></radialGradient>
<linearGradient id="rb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9fbf"/><stop offset=".25" stop-color="#ffd36b"/><stop offset=".5" stop-color="#8fe0a8"/><stop offset=".75" stop-color="#7cc4ff"/><stop offset="1" stop-color="#b39bff"/></linearGradient></defs>
<path d="${rim} Z" fill="url(#g)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<circle cx="60" cy="60" r="40" fill="${face}" stroke="${OL}" stroke-width="2.2"/>
<circle cx="60" cy="60" r="33" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="1.4" stroke-dasharray="2 4"/>
<path d="M32,48 C38,32 52,24 66,24" stroke="#fff" stroke-opacity=".75" stroke-width="4" fill="none" stroke-linecap="round"/>
<text x="60" y="${t.length > 2 ? 66 : 68}" text-anchor="middle" font-family="Pretendard,Malgun Gothic,sans-serif" font-weight="900" font-size="${t.length > 2 ? 15 : 20}" fill="#fff" stroke="${OL}" stroke-width="3" paint-order="stroke">${t}</text>
<polygon points="${pts(star4(60, 9, 8, 0.3))}" fill="url(#g)" stroke="${OL}" stroke-width="1.4"/>`));
  }
}
// ---------- 늘어나는 무지개 리본 (타임라인 채움, 비율 무시하고 늘림) ----------
save("trail.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="40" viewBox="0 0 1000 40" preserveAspectRatio="none">
<defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffb3c7"/><stop offset=".25" stop-color="#ffd59a"/><stop offset=".45" stop-color="#fff0a0"/><stop offset=".65" stop-color="#ade4b8"/><stop offset=".82" stop-color="#a6cff5"/><stop offset="1" stop-color="#c6b2f4"/></linearGradient></defs>
<path d="M0,10 C120,4 200,16 330,9 C460,2 560,16 690,9 C820,3 900,14 1000,9 V31 C900,36 820,25 690,31 C560,37 460,24 330,31 C200,37 120,26 0,31 Z" fill="url(#t)" stroke="${OL}" stroke-width="2.4" vector-effect="non-scaling-stroke"/>
<path d="M0,14 C120,8 200,19 330,13 C460,7 560,19 690,13 C820,8 900,17 1000,13" stroke="#fff" stroke-opacity=".7" stroke-width="2.4" fill="none" vector-effect="non-scaling-stroke"/></svg>`);
console.log("ok");
