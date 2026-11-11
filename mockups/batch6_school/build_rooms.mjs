// 묶음 6 시안 부품 2 — 인형집 교실 속 그림(과학실 · 체육관 · 급식실), 부두 소품, 편지 봉투.
// build_art.mjs와 같은 결: 짙은 자두색 외곽선 · 여러 단 그라데이션 · 윗빛 · 아랫그늘 + 종이 결 잡음.
// 교실은 원근이 있는 상자 방(천장 · 양 옆벽 · 뒷벽 · 바닥 판자)으로 그리고, 아이가 설 자리 앞 가구는 _fg 로 따로 뺀다(아이 그림이 가구 뒤에 선다).
//   node design/mockups/feedback70/batch6_school/build_rooms.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "a/s");
const OL = "#4a2b45";
const f = (n) => Math.round(n * 100) / 100;
const svg = (w, h, body, k = 2) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w * k}" height="${h * k}" viewBox="0 0 ${w} ${h}">\n${body}\n</svg>\n`;
const save = (name, s) => writeFileSync(resolve(out, name), s);
const lg = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</linearGradient>`;
const rg = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</radialGradient>`;
// 종이 결 잡음 (흑백 · 아주 옅게 곱하기) + 부드러운 빛 번짐
const COMMON = `<filter id="nz" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="3" seed="7"/><feColorMatrix type="matrix" values="0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .35  0 0 0 -1.1 .62"/></filter>
<filter id="bl3"><feGaussianBlur stdDeviation="3"/></filter><filter id="bl6"><feGaussianBlur stdDeviation="6"/></filter><filter id="bl1"><feGaussianBlur stdDeviation="1"/></filter>
<filter id="ds" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#3a1e3a" flood-opacity=".35"/></filter>`;
const grain = (w, h, o = 0.5) => `<rect width="${w}" height="${h}" filter="url(#nz)" opacity="${o}" style="mix-blend-mode:multiply"/>`;

// 상자 방: 천장 · 옆벽 · 뒷벽 · 바닥(판자가 소실점으로 모임)
function box(W, H, o) {
  const { side, top, back, floorY, wall, sideC, ceil, floor, plank } = o;
  const vx = W / 2, vy = floorY - 70;
  let planks = "";
  for (let i = -14; i <= 14; i++) {
    const x0 = vx + i * plank, k = (H - vy) / (floorY - vy), x1 = vx + (x0 - vx) * k;
    planks += `<path d="M${f(x0)},${floorY} L${f(x1)},${H}" stroke="#7a4a2a" stroke-opacity=".28" stroke-width=".8"/>`;
  }
  // 판자 이음 (가로 줄은 아래로 갈수록 벌어짐)
  let rows = "";
  for (let j = 1; j < 6; j++) { const y = floorY + (H - floorY) * Math.pow(j / 6, 1.5); rows += `<path d="M0,${f(y)} H${W}" stroke="#7a4a2a" stroke-opacity=".16" stroke-width=".7"/>`; }
  return `<rect width="${W}" height="${H}" fill="url(#${wall})"/>
<polygon points="0,0 ${W},0 ${W - side},${top} ${side},${top}" fill="url(#${ceil})"/>
<polygon points="0,0 ${side},${top} ${side},${floorY} 0,${H}" fill="url(#${sideC})"/>
<polygon points="0,0 ${side},${top} ${side},${floorY} 0,${H}" fill="url(#${sideC})" transform="translate(${W},0) scale(-1,1)" opacity=".9"/>
<polygon points="${side},${floorY} ${W - side},${floorY} ${W},${H} 0,${H}" fill="url(#${floor})"/>
<g clip-path="url(#fl)">${planks}${rows}</g>
<clipPath id="fl"><polygon points="${side},${floorY} ${W - side},${floorY} ${W},${H} 0,${H}"/></clipPath>
<path d="M${side},${floorY} H${W - side}" stroke="#fffaf0" stroke-width="2.2"/><path d="M${side},${floorY + 1.6} H${W - side}" stroke="#7a4a2a" stroke-opacity=".45" stroke-width="1"/>
<path d="M${side},${top} V${floorY} M${W - side},${top} V${floorY} M${side},${top} H${W - side}" stroke="${OL}" stroke-opacity=".18" stroke-width="1"/>
${back || ""}`;
}
// 아치 창 (하늘 · 구름 · 십자 창살 · 커튼 한 쪽)
function arch(x, y, w, h, cur = "#b49bff") {
  const r = w / 2;
  return `<g filter="url(#ds)"><path d="M${x},${y + h} V${y + r} A${r},${r} 0 0 1 ${x + w},${y + r} V${y + h} Z" fill="#fffaf0" stroke="${OL}" stroke-width="1.2"/>
<path d="M${x + 3},${y + h - 3} V${y + r} A${r - 3},${r - 3} 0 0 1 ${x + w - 3},${y + r} V${y + h - 3} Z" fill="url(#sky)"/>
<path d="M${x + 6},${y + h * 0.62} c3,-5 9,-5 11,-1 c3,-4 9,-3 10,2 z" fill="#fff" opacity=".9"/>
<path d="M${x + r},${y + 3} V${y + h - 3} M${x + 3},${y + h * 0.55} H${x + w - 3}" stroke="#fffaf0" stroke-width="2"/>
<rect x="${x - 4}" y="${y + h - 1}" width="${w + 8}" height="4" rx="1.5" fill="#f3e6cf" stroke="${OL}" stroke-width=".9"/></g>
<path d="M${x + w - 4},${y + 2} C${x + w + 8},${y + 18} ${x + w + 2},${y + h * 0.6} ${x + w + 10},${y + h + 6} L${x + w + 2},${y + h + 6} C${x + w - 6},${y + h * 0.6} ${x + w - 2},${y + 20} ${x + w - 10},${y + 4} Z" fill="${cur}" stroke="${OL}" stroke-width="1" opacity=".95"/>
<path d="M${x + w - 2},${y + 12} C${x + w + 3},${y + 28} ${x + w},${y + h * 0.6} ${x + w + 5},${y + h + 4}" stroke="#fff" stroke-opacity=".55" stroke-width="1.2" fill="none"/>`;
}
// 햇빛 기둥이 아니라 「바닥에 떨어진 빛 웅덩이」(세로 기둥 금지): 창 아래 사다리꼴 빛 + 흐림
const sunpool = (x, y, w, fy, H) => `<polygon points="${x},${y} ${x + w},${y} ${x + w + 40},${H} ${x + 10},${H}" fill="#fff6d8" opacity=".32" filter="url(#bl6)"/><ellipse cx="${x + w / 2 + 24}" cy="${fy + (H - fy) * 0.6}" rx="${w}" ry="8" fill="#fff6d8" opacity=".45" filter="url(#bl3)"/>`;
// 매달린 등 (짧은 줄 + 종 모양 갓 + 따뜻한 번짐)
const lamp = (x, y, len = 10, c = "#ffe7a6") => `<circle cx="${x}" cy="${y + len + 10}" r="34" fill="url(#warm)" opacity=".75"/><path d="M${x},0 V${y + len}" stroke="${OL}" stroke-width=".9"/><path d="M${x - 9},${y + len + 8} C${x - 9},${y + len} ${x - 4},${y + len - 2} ${x},${y + len - 2} C${x + 4},${y + len - 2} ${x + 9},${y + len} ${x + 9},${y + len + 8} Z" fill="url(#gold)" stroke="${OL}" stroke-width="1"/><ellipse cx="${x}" cy="${y + len + 9}" rx="5" ry="2" fill="${c}"/>`;
const flask = (x, y, s, c) => `<g transform="translate(${x},${y}) scale(${s})" filter="url(#ds)"><path d="M-4,-14 V-6 C-12,-2 -13,10 -6,13 H6 C13,10 12,-2 4,-6 V-14 Z" fill="#f2f8ff" fill-opacity=".85" stroke="${OL}" stroke-width="1.3"/><path d="M-10.5,3 C-10,10 -6,12 -5,12 H5 C6,12 10,10 10.5,3 Z" fill="${c}"/><path d="M-10.5,3 C-4,1 4,5 10.5,3" stroke="#fff" stroke-opacity=".7" fill="none"/><rect x="-5.5" y="-17" width="11" height="4" rx="1.5" fill="#c99a6a" stroke="${OL}" stroke-width="1"/><path d="M-6,-3 C-8,0 -8,5 -7,8" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8" fill="none"/><circle cx="2" cy="6" r="1.2" fill="#fff" opacity=".8"/><circle cx="-2" cy="-2" r=".9" fill="#fff" opacity=".7"/></g>`;
const books = (x, y) => [["#b49bff", 6, 18], ["#ff9fbf", 5, 15], ["#8fd3ff", 7, 20], ["#ffd66e", 5, 16]].map(([c, w, h], i, a) => { const xx = x + a.slice(0, i).reduce((s, b) => s + b[1] + 0.6, 0); return `<rect x="${f(xx)}" y="${y - h}" width="${w}" height="${h}" rx="1" fill="${c}" stroke="${OL}" stroke-width=".9"/><path d="M${f(xx + 1)},${y - h + 3} h${w - 2}" stroke="#fff" stroke-opacity=".7" stroke-width=".8"/>`; }).join("");
const shelf = (x, y, w) => `<g filter="url(#ds)"><rect x="${x}" y="${y}" width="${w}" height="4" rx="1" fill="url(#wd)" stroke="${OL}" stroke-width="1"/><path d="M${x + 6},${y + 4} l4,6 h-4 z M${x + w - 10},${y + 4} l4,6 h-4 z" fill="#b8804e" stroke="${OL}" stroke-width=".8"/></g>`;
const DEFS = (extra = "") => `<defs>${COMMON}
${lg("gold", [[0, "#fff6d2"], [0.3, "#ffd877"], [0.62, "#e4a63c"], [0.86, "#b8761c"], [1, "#e9bd5c"]], 1, 1)}
${lg("sky", [[0, "#9fd0ff"], [0.6, "#d7ecff"], [1, "#ffe6f2"]])}
${rg("warm", [[0, "#fff1c2", 0.9], [1, "#fff1c2", 0]])}
${lg("wd", [[0, "#f0c690"], [0.5, "#c98b52"], [1, "#8a5530"]])}
${lg("wdf", [[0, "#e7b47c"], [1, "#a9703f"]])}
${extra}</defs>`;

// ---------- 과학실 (512 × 138): 하늘빛 마름모 벽지 · 아치 창 · 작은 칠판 · 선반 플라스크 · 실험대(앞) ----------
{
  const W = 512, H = 138, fy = 104;
  const defs = DEFS(`${lg("w1", [[0, "#eef4ff"], [0.7, "#dce8fb"], [1, "#cbdbf4"]])}${lg("s1", [[0, "#b7c8e8"], [1, "#d8e3f6"]], 1, 0)}${lg("c1", [[0, "#aebfe0"], [1, "#c9d6ee"]])}${lg("f1", [[0, "#dcb184"], [1, "#a8723f"]])}
<pattern id="dia" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M9,1 L17,9 L9,17 L1,9 Z" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".8"/><circle cx="9" cy="9" r="1.2" fill="#9db4e6" fill-opacity=".5"/></pattern>`);
  const back = `<rect x="22" y="8" width="${W - 44}" height="${fy - 8}" fill="url(#dia)"/>
<rect x="22" y="80" width="${W - 44}" height="${fy - 80}" fill="#f7f0e2"/><path d="M22,80 H${W - 22}" stroke="#fff" stroke-width="1.6"/><path d="M22,81.6 H${W - 22}" stroke="#a88f70" stroke-opacity=".6"/>
${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${30 + i * 58}" y="85" width="50" height="14" rx="1.5" fill="none" stroke="#c8b393" stroke-opacity=".7"/>`).join("")}
${sunpool(232, 70, 48, fy, H)}
${arch(234, 14, 44, 58)}
<g filter="url(#ds)"><rect x="300" y="16" width="86" height="46" rx="2" fill="url(#wd)" stroke="${OL}" stroke-width="1.1"/><rect x="304" y="20" width="78" height="38" fill="#2f5446"/><rect x="304" y="20" width="78" height="38" fill="url(#chalkglow)"/></g>
<g stroke="#f4f2e8" stroke-opacity=".85" fill="none" stroke-width="1" stroke-linecap="round"><path d="M310,30 c4,-4 8,4 12,0 M326,30 h6 M336,26 l4,8 M340,26 l-4,8"/><circle cx="360" cy="32" r="6"/><path d="M357,32 h6 M360,29 v6"/><path d="M310,46 q10,-8 20,0 t20,0 M354,48 l8,-6 l8,6"/></g>
<path d="M366,50 l2.4,4.2 4.6,.6 -3.3,3.2 .8,4.6 -4.5,-2.2 -4.1,2.2 .8,-4.6 -3.3,-3.2 4.6,-.6 z" fill="#ffe7a6" opacity=".9" transform="translate(-6,-34) scale(.7)"/>
${shelf(396, 46, 104)}${flask(410, 40, 0.75, "#ff9fd0")}${flask(430, 41, 0.62, "#8fd3ff")}${flask(448, 40, 0.75, "#c9a6ff")}${books(466, 46)}
${shelf(396, 70, 104)}<g filter="url(#ds)"><ellipse cx="416" cy="66" rx="9" ry="4.5" fill="#e6f2ff" stroke="${OL}" stroke-width="1"/><path d="M407,66 v-6 a9,4 0 0 1 18,0 v6" fill="#e6f2ff" fill-opacity=".8" stroke="${OL}" stroke-width="1"/><path d="M440,70 l6,-14 h6 l6,14 z" fill="#ffe7a6" stroke="${OL}" stroke-width="1"/><circle cx="476" cy="62" r="7" fill="url(#gl)" stroke="${OL}" stroke-width="1"/></g>
${lamp(170, 2, 6)}${lamp(440, 2, 6)}`;
  const bg = svg(W, H, `${defs}<defs>${rg("chalkglow", [[0, "#fff", 0.12], [1, "#fff", 0]], 0.4, 0.3, 0.7)}${rg("gl", [[0, "#fff"], [0.5, "#b8e4ff"], [1, "#6fa8e8"]], 0.35, 0.3, 0.7)}</defs>
${box(W, H, { side: 22, top: 8, floorY: fy, wall: "w1", sideC: "s1", ceil: "c1", floor: "f1", plank: 22, back })}
<ellipse cx="270" cy="124" rx="200" ry="10" fill="#fff6e0" opacity=".25" filter="url(#bl6)"/>${grain(W, H, 0.22)}`);
  save("room_lab_bg.svg", bg);
  // 앞: 실험대 (아이는 이 뒤에 선다) — 나무 상판 · 크림 장 · 시험관 꽂이 · 비커 거품 · 현미경
  const fg = svg(W, H, `${defs}<defs>${lg("cab", [[0, "#fffaf0"], [1, "#e8d9bf"]])}</defs>
<g filter="url(#ds)"><rect x="318" y="104" width="196" height="40" fill="url(#cab)" stroke="${OL}" stroke-width="1.2"/>
${[0, 1, 2].map((i) => `<rect x="${326 + i * 62}" y="111" width="54" height="24" rx="2" fill="none" stroke="#c8b393"/><circle cx="${353 + i * 62}" cy="123" r="1.6" fill="url(#gold)" stroke="${OL}" stroke-width=".6"/>`).join("")}
<rect x="312" y="98" width="206" height="8" rx="2" fill="url(#wd)" stroke="${OL}" stroke-width="1.2"/><path d="M314,99.5 H516" stroke="#ffe8c4" stroke-width="1"/></g>
<g filter="url(#ds)"><rect x="330" y="90" width="34" height="8" rx="1.5" fill="url(#wd)" stroke="${OL}" stroke-width="1"/>${["#ff9fd0", "#ffd66e", "#8fd3ff", "#b49bff"].map((c, i) => `<rect x="${333 + i * 8}" y="${74 + (i % 2) * 3}" width="5" height="${20 - (i % 2) * 3}" rx="2.4" fill="#f4faff" fill-opacity=".9" stroke="${OL}" stroke-width=".8"/><rect x="${333.6 + i * 8}" y="86" width="3.8" height="7" rx="1.9" fill="${c}"/>`).join("")}</g>
${flask(386, 88, 0.85, "#c9a6ff")}<g fill="#fff" opacity=".85"><circle cx="384" cy="68" r="2"/><circle cx="390" cy="62" r="1.4"/><circle cx="386" cy="56" r="1"/></g>
<g filter="url(#ds)" transform="translate(470,96)"><path d="M-14,2 H14 V-2 H-14 Z" fill="#7d63dc" stroke="${OL}" stroke-width="1"/><path d="M-2,-2 C-6,-12 -8,-22 0,-30 L6,-26 C0,-20 2,-12 6,-2 Z" fill="#9b84f0" stroke="${OL}" stroke-width="1"/><rect x="-1" y="-40" width="8" height="14" rx="2" transform="rotate(-20 3 -33)" fill="#d8ccff" stroke="${OL}" stroke-width="1"/><rect x="-8" y="-14" width="12" height="3" rx="1" fill="url(#gold)" stroke="${OL}" stroke-width=".8"/></g>
${grain(W, H, 0.15)}`);
  save("room_lab_fg.svg", fg);
}

// ---------- 체육관 (252 × 130): 살구 벽 · 높은 창 셋 · 농구 골대 · 말아 둔 매트 · 공 바구니 · 삼각 깃발 ----------
{
  const W = 252, H = 130, fy = 98;
  const defs = DEFS(`${lg("w2", [[0, "#fff1e6"], [1, "#ffdcc8"]])}${lg("s2", [[0, "#efc2a8"], [1, "#ffe0cc"]], 1, 0)}${lg("c2", [[0, "#e6b89e"], [1, "#f8d4c0"]])}${lg("f2", [[0, "#f2c58c"], [0.5, "#e2a868"], [1, "#c58448"]])}
${lg("matb", [[0, "#bfe4ff"], [0.5, "#7cbcf0"], [1, "#4f8fd0"]])}${lg("matp", [[0, "#ffd3e6"], [0.5, "#ff9fc4"], [1, "#e0709e"]])}`);
  const back = `${[0, 1, 2].map((i) => `<g filter="url(#ds)"><rect x="${120 + i * 38}" y="12" width="30" height="20" rx="2" fill="#fffaf0" stroke="${OL}" stroke-width="1"/><rect x="${122 + i * 38}" y="14" width="26" height="16" fill="url(#sky)"/><path d="M${135 + i * 38},14 v16" stroke="#fffaf0" stroke-width="1.6"/></g>`).join("")}
<polygon points="120,32 234,32 252,${H} 150,${H}" fill="#fff6d8" opacity=".22" filter="url(#bl6)"/>
<rect x="16" y="66" width="${W - 32}" height="${fy - 66}" fill="#ffe9d8"/>${Array.from({ length: 11 }, (_, i) => `<rect x="${18 + i * 20}" y="68" width="18" height="${fy - 70}" rx="4" fill="${i % 2 ? "#ffd2bd" : "#ffe2d2"}" stroke="#e8a98c" stroke-opacity=".6" stroke-width=".8"/>`).join("")}
<path d="M16,66 H${W - 16}" stroke="#fff" stroke-width="1.6"/>
<path d="M16,9 Q70,20 126,9 T${W - 16},9" stroke="${OL}" stroke-width=".7" fill="none" opacity=".6"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => { const x = 22 + i * 22, y = 9 + Math.sin((i / 9) * Math.PI * 2) * 4 + 4; const c = ["#ff9fbf", "#ffd66e", "#8fd3ff", "#b49bff", "#9be8c8"][i % 5]; return `<path d="M${x},${f(y - 3)} h10 l-5,9 z" fill="${c}" stroke="${OL}" stroke-width=".6"/>`; }).join("")}
<g filter="url(#ds)"><rect x="196" y="34" width="38" height="26" rx="2" fill="#fff" stroke="${OL}" stroke-width="1.1"/><rect x="207" y="44" width="16" height="12" fill="none" stroke="#ff7a3d" stroke-width="1.6"/></g>
<ellipse cx="215" cy="62" rx="10" ry="3" fill="none" stroke="#ff7a3d" stroke-width="2"/><path d="M206,62 l3,12 M211,63 l1,12 M215,63 v12 M219,63 l-1,12 M224,62 l-3,12 M207,68 h16" stroke="#fff" stroke-width=".9" opacity=".95"/>`;
  const court = `<g clip-path="url(#fl)"><path d="M126,${fy} C 60,${fy + 6} 40,${H} 30,${H + 10}" stroke="#fff" stroke-opacity=".7" stroke-width="1.4" fill="none"/><ellipse cx="126" cy="${H + 6}" rx="56" ry="18" stroke="#fff" stroke-opacity=".7" stroke-width="1.4" fill="none"/><path d="M0,${H - 6} H${W}" stroke="#fff" stroke-opacity=".45" stroke-width="1"/></g>
<ellipse cx="140" cy="${H - 6}" rx="90" ry="8" fill="#fff6e0" opacity=".35" filter="url(#bl6)"/>`;
  const bg = svg(W, H, `${defs}${box(W, H, { side: 16, top: 6, floorY: fy, wall: "w2", sideC: "s2", ceil: "c2", floor: "f2", plank: 14, back })}${court}
<g filter="url(#ds)"><rect x="148" y="102" width="34" height="14" rx="7" fill="url(#matb)" stroke="${OL}" stroke-width="1"/><ellipse cx="182" cy="109" rx="4" ry="7" fill="#d9efff" stroke="${OL}" stroke-width="1"/><path d="M182,104 a2,4 0 1 0 .1,0" stroke="#4f8fd0" fill="none" stroke-width=".8"/>
<rect x="152" y="89" width="30" height="13" rx="6.5" fill="url(#matp)" stroke="${OL}" stroke-width="1"/><ellipse cx="182" cy="95.5" rx="3.5" ry="6.5" fill="#ffe4ef" stroke="${OL}" stroke-width="1"/></g>
<g filter="url(#ds)"><path d="M200,96 h40 l-4,26 h-32 z" fill="#c99a6a" stroke="${OL}" stroke-width="1.1"/><path d="M202,104 h36 M203,112 h34 M210,96 l-2,26 M220,96 v26 M230,96 l2,26" stroke="#8a5530" stroke-width=".8"/>
${[[208, 92, "#fff"], [220, 90, "#ffb6d3"], [232, 93, "#fff"], [214, 86, "#ffe7a6"], [227, 85, "#fff"]].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="6" fill="${c}" stroke="${OL}" stroke-width="1"/><path d="M${x - 5},${y - 1} q5,-4 10,0 M${x - 2},${y - 6} q-3,6 1,11" stroke="#e0709e" stroke-width=".7" fill="none"/><circle cx="${x - 2}" cy="${y - 2.5}" r="1.4" fill="#fff" opacity=".9"/>`).join("")}</g>
${grain(W, H, 0.2)}`);
  save("room_gym_bg.svg", bg);
}

// ---------- 급식실 (252 × 130): 민트 타일 벽 · 오늘의 급식 칠판 · 등 둘 · 배식대(앞: 김 나는 냄비 · 밥그릇) ----------
{
  const W = 252, H = 130, fy = 98;
  const defs = DEFS(`${lg("w3", [[0, "#effcf8"], [1, "#d5f3ea"]])}${lg("s3", [[0, "#b9e3d6"], [1, "#d9f5ec"]], 1, 0)}${lg("c3", [[0, "#b0dacd"], [1, "#cdeee4"]])}${lg("f3", [[0, "#e9d6b8"], [1, "#c9a87e"]])}
<pattern id="tile" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#e3f8f2"/><path d="M0,.5 H10 M.5,0 V10" stroke="#fff" stroke-width="1"/><path d="M0,9.6 H10 M9.6,0 V10" stroke="#a9d9ca" stroke-width=".6"/></pattern>
<pattern id="chk" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect width="4" height="4" fill="#ffb6c8"/><rect x="4" y="4" width="4" height="4" fill="#ffb6c8"/></pattern>
${lg("pot", [[0, "#e8eef8"], [0.5, "#b8c4d8"], [1, "#8e9ab0"]], 1, 0)}${lg("cnt", [[0, "#fffaf0"], [1, "#e6d4b6"]])}`);
  const back = `<rect x="16" y="56" width="${W - 32}" height="${fy - 56}" fill="url(#tile)"/><path d="M16,56 H${W - 16}" stroke="#fff" stroke-width="1.6"/><path d="M16,57.6 H${W - 16}" stroke="#7fbfac" stroke-opacity=".6"/>
<g filter="url(#ds)"><rect x="146" y="12" width="56" height="36" rx="2" fill="url(#wd)" stroke="${OL}" stroke-width="1"/><rect x="149" y="15" width="50" height="30" fill="#2f5446"/></g>
<g stroke="#f4f2e8" stroke-opacity=".9" fill="none" stroke-width=".9" stroke-linecap="round"><path d="M154,22 h20 M154,29 h14 M154,36 h18 M178,29 h14"/><circle cx="188" cy="21" r="3"/></g><path d="M186,38 l1.8,3 3.4,.5 -2.5,2.4 .6,3.4 -3.3,-1.7 -3,1.7 .6,-3.4 -2.5,-2.4 3.4,-.5 z" fill="#ffd66e" transform="translate(4,-3) scale(.7)"/>
<g filter="url(#ds)"><rect x="212" y="40" width="26" height="3.5" rx="1" fill="url(#wd)" stroke="${OL}" stroke-width=".8"/>${[["#ffd66e", 214], ["#ff9fbf", 222], ["#9be8c8", 230]].map(([c, x]) => `<rect x="${x}" y="30" width="7" height="10" rx="2" fill="${c}" stroke="${OL}" stroke-width=".8"/><rect x="${x}" y="28" width="7" height="3" rx="1" fill="#fffaf0" stroke="${OL}" stroke-width=".7"/>`).join("")}</g>
${lamp(120, 1, 4, "#fff1c2")}${lamp(200, 1, 4, "#fff1c2")}`;
  const bg = svg(W, H, `${defs}${box(W, H, { side: 16, top: 6, floorY: fy, wall: "w3", sideC: "s3", ceil: "c3", floor: "f3", plank: 12, back })}

<ellipse cx="160" cy="${H - 8}" rx="90" ry="8" fill="#fff6e0" opacity=".3" filter="url(#bl6)"/>${grain(W, H, 0.2)}`);
  save("room_cafe_bg.svg", bg);
  const fg = svg(W, H, `${defs}
<g filter="url(#ds)"><rect x="138" y="96" width="116" height="40" fill="url(#cnt)" stroke="${OL}" stroke-width="1.1"/><path d="M138,104 H254" stroke="#c8b393" stroke-width=".8"/><rect x="134" y="90" width="122" height="8" rx="2" fill="url(#wd)" stroke="${OL}" stroke-width="1.1"/><path d="M136,91.5 H254" stroke="#ffe8c4"/>
<rect x="138" y="106" width="116" height="30" fill="url(#chk)" opacity=".35"/></g>
<g filter="url(#ds)"><path d="M150,90 v-14 h28 v14 z" fill="url(#pot)" stroke="${OL}" stroke-width="1"/><rect x="147" y="73" width="34" height="4" rx="2" fill="#c7d0e0" stroke="${OL}" stroke-width=".9"/><path d="M146,80 h-4 M182,80 h4" stroke="${OL}" stroke-width="1.6" stroke-linecap="round"/>
<path d="M200,90 c0,-10 22,-10 22,0 z" fill="#fff" stroke="${OL}" stroke-width="1"/><path d="M201,84 c3,-6 17,-6 20,0" fill="#fff8ec" stroke="${OL}" stroke-width=".8"/><circle cx="208" cy="82" r="1" fill="${OL}"/><path d="M225,90 c0,-7 16,-7 16,0 z" fill="#ffd66e" stroke="${OL}" stroke-width="1"/><path d="M228,86 h10" stroke="#e08a3d" stroke-width="1.2"/></g>
<g fill="none" stroke="#fff" stroke-linecap="round" opacity=".85" filter="url(#bl1)"><path d="M158,70 c-4,-6 4,-8 0,-14 c-3,-4 2,-7 1,-10" stroke-width="2.2"/><path d="M168,70 c4,-6 -4,-9 1,-15" stroke-width="1.8"/><path d="M211,78 c-3,-4 3,-6 0,-10" stroke-width="1.4"/></g>
${grain(W, H, 0.12)}`);
  save("room_cafe_fg.svg", fg);
}

// ---------- 부두 소품: 나무 상자 · 밧줄 사리 ----------
save("crate.svg", svg(90, 70, `${DEFS()}<g filter="url(#ds)"><path d="M6,18 L46,6 L86,18 L46,30 Z" fill="#e7b47c" stroke="${OL}" stroke-width="1.6"/><path d="M6,18 V56 L46,68 V30 Z" fill="#c98b52" stroke="${OL}" stroke-width="1.6"/><path d="M86,18 V56 L46,68 V30 Z" fill="#a9703f" stroke="${OL}" stroke-width="1.6"/>
<path d="M6,30 L46,42 M6,44 L46,56 M86,30 L46,42 M86,44 L46,56" stroke="#7a4a2a" stroke-width="1.2" opacity=".7"/><path d="M10,22 L42,52 M82,22 L50,52" stroke="#ffe0b8" stroke-width="1.6" opacity=".45"/><path d="M20,14 L46,22 L72,14" stroke="#fff3dc" stroke-width="1.2" fill="none" opacity=".7"/>
<circle cx="66" cy="44" r="7" fill="#b49bff" stroke="${OL}" stroke-width="1.2"/><path d="M66,39.5 l1.3,3 3.2,.3 -2.4,2.1 .7,3.1 -2.8,-1.6 -2.8,1.6 .7,-3.1 -2.4,-2.1 3.2,-.3 z" fill="#fff6d2"/></g>`, 2));
save("coil.svg", svg(90, 44, `${DEFS(lg("rp", [[0, "#f3dcb0"], [1, "#b88a52"]]))}<g filter="url(#ds)">${[0, 1, 2, 3].map((i) => `<ellipse cx="45" cy="${30 - i * 5}" rx="${38 - i * 7}" ry="${11 - i * 1.5}" fill="${i === 3 ? "#a07a4a" : "url(#rp)"}" stroke="${OL}" stroke-width="1.3"/>`).join("")}
${Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2; return `<path d="M${f(45 + Math.cos(a) * 36)},${f(30 + Math.sin(a) * 10)} l3,-2" stroke="#7a5a32" stroke-width=".9"/>`; }).join("")}
<path d="M80,30 C92,34 88,42 76,42" stroke="url(#rp)" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M80,30 C92,34 88,42 76,42" stroke="${OL}" stroke-width=".8" fill="none" opacity=".6"/></g>`, 2));

// ---------- 편지 봉투 (알림 C: 판이 접혀 봉투가 되어 하단 「분교」로 살랑 내려앉음) ----------
save("envelope.svg", svg(120, 90, `${DEFS(lg("env", [[0, "#fffdf6"], [1, "#efe2c8"]]) + lg("fl2", [[0, "#fff9ec"], [1, "#e6d4b2"]]) + rg("wax", [[0, "#c9b2ff"], [0.6, "#8f78ee"], [1, "#5b44c8"]], 0.4, 0.35, 0.7))}
<g filter="url(#ds)"><rect x="6" y="18" width="108" height="66" rx="4" fill="url(#env)" stroke="${OL}" stroke-width="1.6"/><path d="M6,84 L50,50 M114,84 L70,50" stroke="#c8b393" stroke-width="1.2"/>
<path d="M6,20 L60,58 L114,20" fill="url(#fl2)" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/><path d="M12,22 L60,54 L108,22" stroke="#fff" stroke-opacity=".7" fill="none"/>
<path d="M60,58 l-16,22 l8,-1 l3,7 l5,-14 z" fill="#ff9fbf" stroke="${OL}" stroke-width="1.2" stroke-linejoin="round"/><path d="M60,58 l16,22 l-8,-1 l-3,7 l-5,-14 z" fill="#ff8fb0" stroke="${OL}" stroke-width="1.2" stroke-linejoin="round"/>
<circle cx="60" cy="56" r="13" fill="url(#wax)" stroke="${OL}" stroke-width="1.4"/><path d="M47.5,56 c2,-2 3,2 5,0 M67.5,56 c2,-2 3,2 5,0" stroke="#5b44c8" fill="none"/>
<path d="M54,61 V53 L60,48 L66,53 V61 Z" fill="#fff3c4" stroke="#4a2b8a" stroke-width="1"/><rect x="58.4" y="56" width="3.2" height="5" fill="#8f78ee"/><path d="M53,53 L60,46.5 L67,53" stroke="#fff" stroke-width="1" fill="none"/>
<path d="M53,48 c3,-5 9,-6 14,-2" stroke="#fff" stroke-opacity=".7" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>`, 2));
console.log("rooms · props written to", out);
