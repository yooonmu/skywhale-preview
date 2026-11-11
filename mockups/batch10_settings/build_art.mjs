// 묶음 10 「설정」 시안 부품 — 그림 결(값 잡음 PNG → JPG) + 게임 결 SVG(짙은 자두색 외곽선 · 여러 단 그라데이션 · 윗빛 · 아랫그늘).
// batch8_shop/build_art.mjs와 같은 결. 시안 전용이라 batch10_settings/a/s/ 에만 쓴다 (게임 assets/는 건드리지 않음).
//   node design/mockups/feedback70/batch10_settings/build_art.mjs
import { writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { tmpdir } from "node:os";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "a/s");
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "b10art-"));
const OL = "#4a2b45";
const f = (n) => Math.round(n * 100) / 100;
const svg = (w, h, body, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"${extra}>\n${body}\n</svg>\n`;
const save = (name, s) => writeFileSync(resolve(out, name), s);
let seed = 11;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const P = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const pts = (a) => a.map((p) => `${f(p[0])},${f(p[1])}`).join(" ");
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (r) => "#" + r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const shade = (h, k) => { const c = hex2rgb(h); return rgb2hex(c.map((v) => (k >= 0 ? v + (255 - v) * k : v * (1 + k)))); };
const GOLD = (id, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="#fff6d2"/><stop offset=".3" stop-color="#ffd877"/><stop offset=".62" stop-color="#e4a63c"/><stop offset=".86" stop-color="#b8761c"/><stop offset="1" stop-color="#e9bd5c"/></linearGradient>`;
const star4 = (cx, cy, r, k = 0.28, rot = -90) => { const a = []; for (let i = 0; i < 8; i++) a.push(P(cx, cy, i % 2 ? r * k : r, rot + i * 45)); return a; };
const SH = (id, dy = 6, sd = 6, op = 0.35) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${sd}" flood-color="#2a1636" flood-opacity="${op}"/></filter>`;
const RG = (id, c, cx = ".38", cy = ".32") => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".78"><stop offset="0" stop-color="${shade(c, 0.72)}"/><stop offset=".45" stop-color="${shade(c, 0.2)}"/><stop offset=".85" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -0.32)}"/></radialGradient>`;
const LG = (id, a, b, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${shade(a, 0.5)}"/><stop offset=".4" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

// ================= 질감 (값 잡음 · fbm → PNG → JPG) =================
const crcT = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc = (b) => { let c = -1; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
function tex(name, w, h, fn, q = 3) {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 3 + 1)] = 0;
    for (let x = 0; x < w; x++) {
      const c = fn(x, y);
      const o = y * (w * 3 + 1) + 1 + x * 3;
      raw[o] = Math.max(0, Math.min(255, c[0])); raw[o + 1] = Math.max(0, Math.min(255, c[1])); raw[o + 2] = Math.max(0, Math.min(255, c[2]));
    }
  }
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2;
  const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ih), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
  const p = join(tmp, name + ".png");
  writeFileSync(p, png);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", p, "-q:v", String(q), resolve(out, name + ".jpg")]);
}
function noise(sd) {
  const t = new Float32Array(512 * 512); let s = sd;
  for (let i = 0; i < t.length; i++) { s = (s * 16807) % 2147483647; t[i] = s / 2147483647; }
  const g = (a, b, px, py) => t[((((a % px) + px) % px) & 511) * 512 + ((((b % py) + py) % py) & 511)];
  return (x, y, px, py) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = g(xi, yi, px, py), b = g(xi + 1, yi, px, py), c = g(xi, yi + 1, px, py), d = g(xi + 1, yi + 1, px, py);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
}
const fbm = (n, x, y, px, py, oct = 4) => { let s = 0, a = 0.5, k = 1, tot = 0; for (let o = 0; o < oct; o++) { s += a * n(x * k, y * k, px * k, py * k); tot += a; a *= 0.5; k *= 2; } return s / tot; };
const mix3 = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const ramp = (stops, t) => { t = Math.max(0, Math.min(1, t)); for (let i = 1; i < stops.length; i++) if (t <= stops[i][0]) { const [t0, c0] = stops[i - 1], [t1, c1] = stops[i]; return mix3(c0, c1, (t - t0) / (t1 - t0)); } return stops[stops.length - 1][1]; };
const H = (h) => hex2rgb(h);

// 가죽 (주름 · 모공 · 닳은 광) — 교무수첩 겉장 (라벤더 자두) · 음악 상자 안 (남색)
function leather(name, cols, sd) {
  const T = 512, n1 = noise(sd), n2 = noise(sd + 4), n3 = noise(sd + 9);
  tex(name, T, T, (x, y) => {
    const cell = fbm(n1, (x / T) * 24, (y / T) * 24, 24, 24, 2);
    const crease = Math.abs(fbm(n2, (x / T) * 6, (y / T) * 6, 6, 6, 4) - 0.5);
    let v = 0.52 + (fbm(n3, (x / T) * 3, (y / T) * 3, 3, 3, 4) - 0.5) * 0.5;
    v += (cell - 0.5) * 0.32;
    if (crease < 0.025) v -= (0.025 - crease) * 6;
    v += (n3((x / T) * 256, (y / T) * 256, 256, 256) - 0.5) * 0.1;
    return ramp(cols, v);
  });
}
leather("tex_leather", [[0, H("#2c1838")], [0.45, H("#5b3a7a")], [0.72, H("#7d5aa6")], [1, H("#b49ad8")]], 201);
leather("tex_leather_navy", [[0, H("#120f2c")], [0.45, H("#2a2560")], [0.72, H("#3d3684")], [1, H("#6f66b8")]], 221);
// 종이 (크림 · 섬유 · 얼룩)
function paper(name, cols, sd) {
  const T = 512, n1 = noise(sd), n2 = noise(sd + 24), n3 = noise(sd + 46);
  tex(name, T, T, (x, y) => {
    let v = 0.5 + (fbm(n1, (x / T) * 8, (y / T) * 8, 8, 8, 4) - 0.5) * 0.5;
    v += (n2((x / T) * 160, (y / T) * 40, 160, 40) - 0.5) * 0.18 + (n2((x / T) * 40, (y / T) * 160, 40, 160) - 0.5) * 0.18;
    v += (n3((x / T) * 256, (y / T) * 256, 256, 256) - 0.5) * 0.1;
    return ramp(cols, v);
  });
}
paper("tex_paper", [[0, H("#e9dcc0")], [0.5, H("#f8f0de")], [1, H("#fffcf3")]], 13);
paper("tex_paper_lav", [[0, H("#e2d8f0")], [0.5, H("#f4effb")], [1, H("#fffdff")]], 17);
// 아마천 (씨실 날실) — 탭 수첩 바탕
{
  const T = 512, n1 = noise(71), n2 = noise(73);
  tex("tex_linen", T, T, (x, y) => {
    const wx = Math.sin(x * 1.5708) * 0.5 + 0.5, wy = Math.sin(y * 1.5708) * 0.5 + 0.5;
    let v = 0.55 + (fbm(n1, (x / T) * 6, (y / T) * 6, 6, 6, 4) - 0.5) * 0.3;
    v += ((x + y) % 4 < 2 ? wx : wy) * 0.1 - 0.05;
    v += (n2((x / T) * 128, (y / T) * 4, 128, 4) - 0.5) * 0.12 + (n2((x / T) * 4, (y / T) * 128, 4, 128) - 0.5) * 0.12;
    return ramp([[0, H("#c9b9e2")], [0.5, H("#e6dcf3")], [1, H("#fbf7ff")]], v);
  });
}
// 펠트 (보풀) — 카드 게시판
{
  const T = 512, n1 = noise(91), n2 = noise(93), n3 = noise(97);
  tex("tex_felt", T, T, (x, y) => {
    let v = 0.5 + (fbm(n1, (x / T) * 5, (y / T) * 5, 5, 5, 5) - 0.5) * 0.4;
    v += (n2((x / T) * 300, (y / T) * 300, 300, 300) - 0.5) * 0.28;
    v += (fbm(n3, (x / T) * 30, (y / T) * 30, 30, 30, 2) - 0.5) * 0.2;
    return ramp([[0, H("#4a3a86")], [0.5, H("#6f5cb4")], [1, H("#9c8ad8")]], v);
  });
}
// 책 천 (남색 씨실 · 금박 닳음) — 그림책 겉장
{
  const T = 512, n1 = noise(101), n2 = noise(103);
  tex("tex_cloth", T, T, (x, y) => {
    const weave = ((x >> 1) + (y >> 1)) % 2 ? 0.06 : -0.06;
    let v = 0.5 + weave + (fbm(n1, (x / T) * 7, (y / T) * 7, 7, 7, 4) - 0.5) * 0.36;
    v += (n2((x / T) * 256, (y / T) * 2, 256, 2) - 0.5) * 0.14;
    return ramp([[0, H("#1b1840")], [0.5, H("#34307a")], [1, H("#5a52a8")]], v);
  });
}
// 나무 (호두 · 결 · 옹이) — 축음기 받침 · 음악 상자 · 전시실 징두리
function wood(name, cols, PH = 96) {
  const T = 512, n1 = noise(11), n2 = noise(29), n3 = noise(53);
  const tones = Array.from({ length: T / PH }, () => (rnd() - 0.5) * 0.16);
  tex(name, T, T, (x, y) => {
    const pk = Math.floor(y / PH), yy = y % PH;
    const low = fbm(n1, (x / T) * 3, (y / T) * 8, 3, 8, 3);
    const streak = fbm(n2, (x / T) * 4, (y / T) * 120, 4, 120, 3);
    const ring = Math.sin((y + low * 70 + pk * 23) * 0.42);
    const mott = fbm(n3, (x / T) * 6, (y / T) * 6, 6, 6, 4);
    let v = 0.56 + (streak - 0.5) * 0.42 + tones[pk % tones.length] + (mott - 0.5) * 0.18;
    if (ring > 0.82) v -= (ring - 0.82) * 0.9;
    if (yy < 2) v -= 0.3; else if (yy < 4) v += 0.08;
    return ramp(cols, v);
  });
}
wood("tex_walnut", [[0, H("#3a2016")], [0.45, H("#6c3f28")], [0.75, H("#93603a")], [1, H("#b98552")]]);
wood("tex_rose", [[0, H("#5a2a3a")], [0.45, H("#93506a")], [0.75, H("#b87590")], [1, H("#e0a6bc")]], 128);
// 전시실 벽지 (라벤더 다이아 격자 + 작은 별 · 흙손 얼룩)
{
  const T = 512, n1 = noise(19), n2 = noise(43);
  tex("tex_gallery", T, T, (x, y) => {
    let v = 0.6 + (fbm(n1, (x / T) * 5, (y / T) * 5, 5, 5, 5) - 0.5) * 0.24;
    const u = ((x + y) % 64), w = ((x - y + 512) % 64);
    if (u < 1.6 || w < 1.6) v += 0.07;
    const cx = (x % 64) - 32, cy = (y % 64) - 32;
    const d = Math.abs(cx) + Math.abs(cy);
    if (d < 5) v += (1 - d / 5) * 0.12;
    v += (n2((x / T) * 200, (y / T) * 60, 200, 60) - 0.5) * 0.05;
    return ramp([[0, H("#9a86c8")], [0.5, H("#c8b8e8")], [1, H("#ece4fb")]], v);
  });
}
// 밤하늘 (흐르는 크레딧)
{
  const W = 1200, Hh = 600, n1 = noise(23), n2 = noise(61), n3 = noise(97);
  tex("tex_night", W, Hh, (x, y) => {
    let v = 0.36 + (fbm(n1, (x / W) * 7, (y / Hh) * 4, 7, 4, 5) - 0.5) * 0.3;
    const band = Math.exp(-(((y / Hh) - 0.5 + (x / W) * 0.4 - 0.2) ** 2) / 0.03);
    v += band * 0.24 * fbm(n2, (x / W) * 12, (y / Hh) * 6, 12, 6, 4);
    if (n3(x * 0.7, y * 0.7, 512, 512) > 0.982) v += 0.5;
    v += (1 - y / Hh) * -0.06;
    return ramp([[0, H("#0d0b26")], [0.35, H("#1f1b52")], [0.55, H("#3a3080")], [0.75, H("#7b6cc4")], [1, H("#fff4d6")]], v);
  }, 2);
}
// 놋쇠 (헤어라인 · 얼룩)
{
  const T = 512, n1 = noise(131), n2 = noise(137);
  tex("tex_brass", T, T, (x, y) => {
    let v = 0.55 + (n1((x / T) * 2, (y / T) * 200, 2, 200) - 0.5) * 0.3;
    v += (fbm(n2, (x / T) * 4, (y / T) * 4, 4, 4, 4) - 0.5) * 0.3;
    return ramp([[0, H("#8a5a14")], [0.4, H("#c8922e")], [0.7, H("#ecc66a")], [1, H("#fff2c4")]], v);
  });
}
// 모눈종이 (개발 판)
{
  const T = 512, n1 = noise(151), n2 = noise(157);
  tex("tex_graph", T, T, (x, y) => {
    let v = 0.62 + (fbm(n1, (x / T) * 6, (y / T) * 6, 6, 6, 4) - 0.5) * 0.3 + (n2((x / T) * 256, (y / T) * 256, 256, 256) - 0.5) * 0.08;
    const c = ramp([[0, H("#dfe4f0")], [0.5, H("#f2f4fa")], [1, H("#ffffff")]], v);
    const gx = x % 16, gy = y % 16, mx = x % 64, my = y % 64;
    if (mx < 1.2 || my < 1.2) return mix3(c, H("#7c8fd0"), 0.45);
    if (gx < 1 || gy < 1) return mix3(c, H("#9fb0e6"), 0.25);
    return c;
  });
}

// ================= SVG 부품 =================
// ---------- 물감 붓질 (켬 · 고른 칸 · 볼륨 채움): 끝이 붓 털로 갈라지고, 결 · 윗빛 · 마른 붓 자국 ----------
function swash(name, c1, c2, c3) {
  const W = 240, Hh = 64; let top = "M10,14", bot = "";
  for (let x = 10; x <= 226; x += 12) top += ` L${f(x)},${f(10 + Math.sin(x * 0.05) * 2 + rnd() * 3)}`;
  // 오른쪽 끝: 붓 털 갈래
  top += " L232,12 L238,20 L229,24 L236,31 L228,36 L235,44 L226,48 L231,54";
  for (let x = 222; x >= 14; x -= 12) bot += ` L${f(x)},${f(54 + Math.sin(x * 0.07) * 2 - rnd() * 3)}`;
  const d = `${top}${bot} L8,50 C2,42 2,22 10,14 Z`;
  const streaks = Array.from({ length: 9 }, (_, i) => { const y = 16 + i * 4.4 + rnd() * 2; const x0 = 14 + rnd() * 30, x1 = 160 + rnd() * 66; return `<path d="M${f(x0)},${f(y)} C${f(x0 + 60)},${f(y - 1.5)} ${f(x1 - 60)},${f(y + 1.5)} ${f(x1)},${f(y)}" stroke="${i % 3 ? shade(c2, -0.18) : shade(c1, 0.5)}" stroke-opacity="${i % 3 ? 0.35 : 0.5}" stroke-width="${f(0.8 + rnd() * 1.4)}" fill="none"/>`; }).join("");
  save(name, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Hh}" viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(c1, 0.35)}"/><stop offset=".35" stop-color="${c1}"/><stop offset=".75" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient><linearGradient id="h" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".25" stop-color="#fff" stop-opacity=".65"/><stop offset=".8" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><clipPath id="c"><path d="${d}"/></clipPath></defs>
<path d="${d}" fill="url(#g)"/><g clip-path="url(#c)">${streaks}<path d="M16,18 C80,13 160,14 222,18" stroke="url(#h)" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M14,50 C90,54 170,53 224,49" stroke="${c3}" stroke-opacity=".5" stroke-width="3" fill="none"/></g>
<path d="${d}" fill="none" stroke="${shade(c3, -0.35)}" stroke-opacity=".55" stroke-width="1.4" vector-effect="non-scaling-stroke"/>
<circle cx="236" cy="57" r="2.4" fill="${c2}"/><circle cx="229" cy="61" r="1.4" fill="${c2}" opacity=".8"/></svg>`);
}
swash("swash_lav.svg", "#a58cf6", "#7d63dc", "#5b44b8");
swash("swash_gray.svg", "#c9c1d8", "#a69cbc", "#867b9e");
swash("swash_coral.svg", "#ffb08a", "#f0734f", "#c9533a");
swash("swash_gold.svg", "#ffe08a", "#e4a63c", "#b8761c");
swash("swash_mint.svg", "#9fe6cf", "#4fbf9f", "#2f8f78");

// ---------- 볼륨 손잡이 (금테 + 크림 얼굴 + 물감 한 점) ----------
save("knob.svg", svg(44, 44, `<defs>${GOLD("g")}<radialGradient id="c" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#f6efff"/><stop offset="1" stop-color="#d9cdee"/></radialGradient>${SH("d", 2, 2, 0.4)}</defs>
<g filter="url(#d)"><circle cx="22" cy="21" r="17" fill="url(#g)" stroke="${OL}" stroke-width="2"/><circle cx="22" cy="21" r="12.5" fill="url(#c)" stroke="${OL}" stroke-opacity=".5" stroke-width="1.2"/>
<path d="M17,19 C17,15 21,14 23,16 C26,13 30,16 28,20 C27,24 22,26 18,24 Z" fill="#9a7ff0" stroke="#5b44b8" stroke-width="1"/><path d="M19,18 C20,16.5 22,16.5 23,17.5" stroke="#fff" stroke-width="1.4" fill="none" stroke-linecap="round"/>
<path d="M10,14 C13,9 18,7 23,7" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".8"/></g>`));

// ---------- 책갈피 끈 (제비꼬리 끝) ----------
save("ribbon.svg", svg(40, 200, `<defs><linearGradient id="r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c94a7a"/><stop offset=".45" stop-color="#ff8fb4"/><stop offset="1" stop-color="#a8365f"/></linearGradient>${SH("d", 3, 2, 0.35)}</defs>
<g filter="url(#d)"><path d="M6,0 H34 V188 L20,172 L6,188 Z" fill="url(#r)" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><path d="M11,0 V176" stroke="#fff" stroke-opacity=".45" stroke-width="1.6"/><path d="M29,0 V178" stroke="#6a1f40" stroke-opacity=".4" stroke-width="1"/>
${Array.from({ length: 18 }, (_, i) => `<path d="M8,${i * 10 + 4} H32" stroke="#fff" stroke-opacity=".08" stroke-width="1"/>`).join("")}</g>`));

// ---------- 금 모서리 · 클립 · 압정 · 마스킹 테이프 ----------
save("corner.svg", svg(60, 60, `<defs>${GOLD("g")}</defs><path d="M4,56 V18 C4,10 10,4 18,4 H56" fill="none" stroke="url(#g)" stroke-width="2.4"/><path d="M12,56 V22 C12,16 16,12 22,12 H56" fill="none" stroke="url(#g)" stroke-width="1.2" opacity=".75"/><polygon points="${pts(star4(12, 12, 7, 0.28))}" fill="url(#g)" stroke="${OL}" stroke-width=".8"/>`));
save("cap.svg", svg(56, 56, `<defs>${GOLD("g")}${SH("d", 2, 2, 0.4)}</defs><g filter="url(#d)"><path d="M2,2 H52 C52,10 46,14 40,14 H22 C17,14 14,17 14,22 V40 C14,46 10,52 2,52 Z" fill="url(#g)" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/><path d="M6,6 H44 M6,6 V44" stroke="#fff6d2" stroke-width="1.6" opacity=".9"/><circle cx="9" cy="9" r="3" fill="#fff6d2" stroke="${OL}" stroke-width="1"/></g>`));
save("clip.svg", svg(34, 80, `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8761c"/><stop offset=".4" stop-color="#fff2c4"/><stop offset=".7" stop-color="#e4a63c"/><stop offset="1" stop-color="#9a5e14"/></linearGradient>${SH("d", 2, 1.5, 0.35)}</defs>
<g filter="url(#d)" fill="none" stroke-linecap="round"><path d="M10,60 V14 C10,6 24,6 24,14 V66 C24,76 6,76 6,66 V22" stroke="${OL}" stroke-width="5.6"/><path d="M10,60 V14 C10,6 24,6 24,14 V66 C24,76 6,76 6,66 V22" stroke="url(#g)" stroke-width="3.4"/></g>`));
save("pin.svg", svg(36, 40, `<defs>${RG("g", "#e4a63c")}${SH("d", 3, 2, 0.4)}</defs><g filter="url(#d)"><path d="M18,22 L20,38" stroke="#7a6a8a" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="18" cy="24" rx="10" ry="3.6" fill="#b8761c" stroke="${OL}" stroke-width="1.4"/><circle cx="18" cy="14" r="11" fill="url(#g)" stroke="${OL}" stroke-width="1.8"/><ellipse cx="14" cy="10" rx="4" ry="2.6" fill="#fff" opacity=".85"/></g>`));
{
  let e1 = "M0,4", e2 = ""; for (let y = 4; y <= 28; y += 3) e1 += ` L${f(rnd() * 4)},${y}`;
  for (let y = 28; y >= 4; y -= 3) e2 += ` L${f(116 + rnd() * 4)},${y}`;
  const d = `${e1} V30 L120,30 ${e2} L120,2 L0,2 Z`;
  const tape = (name, c, dot) => save(name, `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="32" viewBox="0 0 120 32"><defs><pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${c}"/><circle cx="5" cy="5" r="1.6" fill="${dot}" opacity=".7"/></pattern><linearGradient id="h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></linearGradient></defs><path d="${d}" fill="url(#p)" opacity=".88"/><path d="${d}" fill="url(#h)"/></svg>`);
  tape("tape_lav.svg", "#cbbaf6", "#fff");
  tape("tape_gold.svg", "#ffe3a0", "#e4a63c");
  tape("tape_dev.svg", "#ffd54f", "#3a2f5c");
}

// ---------- 자물쇠 배지 (LockGate와 같은 꼴: 남색 동그라미 + 흰 테 + 크림 자물쇠) ----------
save("lock.svg", svg(40, 40, `<defs><radialGradient id="b" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#6e5fb0"/><stop offset="1" stop-color="#2d2460"/></radialGradient><linearGradient id="l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8ec"/><stop offset="1" stop-color="#e9d9b8"/></linearGradient></defs>
<circle cx="20" cy="20" r="18" fill="#fff"/><circle cx="20" cy="20" r="15.6" fill="url(#b)"/><path d="M14.5,18 V15 C14.5,9 25.5,9 25.5,15 V18" fill="none" stroke="#fff8ec" stroke-width="2.6"/><rect x="11.5" y="17.5" width="17" height="12.5" rx="2.6" fill="url(#l)"/><circle cx="20" cy="23" r="1.8" fill="#2d2460"/><path d="M20,24 V26.6" stroke="#2d2460" stroke-width="1.6" stroke-linecap="round"/>`));

// ---------- 설정 그림 (게임 결: 짙은 외곽선 · 여러 단 그라데 · 윗빛 · 반짝) ----------
const icon = (name, body, defs = "") => save(name, svg(96, 96, `<defs>${GOLD("gd")}${defs}${SH("sd", 3, 3, 0.35)}</defs><g filter="url(#sd)">${body}</g><polygon points="${pts(star4(80, 16, 8, 0.24))}" fill="#fff" opacity=".95"/><polygon points="${pts(star4(14, 74, 5, 0.26))}" fill="#fff" opacity=".8"/>`));
icon("ic_bgm.svg", `<path d="M38,22 L76,12 V62" fill="none" stroke="${OL}" stroke-width="9" stroke-linejoin="round"/><path d="M38,22 L76,12 V62" fill="none" stroke="url(#gd)" stroke-width="5.4" stroke-linejoin="round"/><path d="M38,22 V70" stroke="${OL}" stroke-width="9"/><path d="M38,22 V70" stroke="url(#gd)" stroke-width="5.4"/>
<ellipse cx="28" cy="72" rx="13" ry="10" transform="rotate(-18 28 72)" fill="url(#n)" stroke="${OL}" stroke-width="2.6"/><ellipse cx="66" cy="64" rx="13" ry="10" transform="rotate(-18 66 64)" fill="url(#n)" stroke="${OL}" stroke-width="2.6"/><path d="M38,28 L76,18 V26 L38,36 Z" fill="url(#gd)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<ellipse cx="24" cy="68" rx="5" ry="3" fill="#fff" opacity=".8" transform="rotate(-18 24 68)"/><ellipse cx="62" cy="60" rx="5" ry="3" fill="#fff" opacity=".8" transform="rotate(-18 62 60)"/>`, RG("n", "#9a7ff0"));
icon("ic_sfx.svg", `<path d="M16,38 H32 L54,20 V76 L32,58 H16 C12,58 10,56 10,52 V44 C10,40 12,38 16,38 Z" fill="url(#s)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><path d="M16,42 H30" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
${[[64, 14], [74, 24], [84, 34]].map(([x, r], i) => `<path d="M${x},${48 - r} C${x + r * 0.55},${48 - r * 0.5} ${x + r * 0.55},${48 + r * 0.5} ${x},${48 + r}" fill="none" stroke="${OL}" stroke-width="7.4" stroke-linecap="round"/><path d="M${x},${48 - r} C${x + r * 0.55},${48 - r * 0.5} ${x + r * 0.55},${48 + r * 0.5} ${x},${48 + r}" fill="none" stroke="${["#ff9fc4", "#c9b8ff", "#8fd8ff"][i]}" stroke-width="4" stroke-linecap="round"/>`).join("")}`, LG("s", "#f6efff", "#b9a6ee"));
icon("ic_cutin.svg", `<path d="M10,30 L80,16 L86,62 L16,76 Z" fill="url(#c)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><path d="M14,36 L80,22" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>
${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${f(16 + i * 11.4)}" y="${f(29 - i * 2.3)}" width="6" height="5" rx="1" fill="#2f2654" opacity=".55" transform="rotate(-11 ${f(19 + i * 11.4)} ${f(31 - i * 2.3)})"/>`).join("")}
<polygon points="${pts([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => P(48, 50, i % 2 ? 9 : 21, -90 + i * 36)))}" fill="url(#gd)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/><polygon points="${pts(star4(48, 50, 30, 0.08))}" fill="#fff" opacity=".7"/>`, `<linearGradient id="c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb3cf"/><stop offset=".5" stop-color="#b49bff"/><stop offset="1" stop-color="#6b55d8"/></linearGradient>`);
icon("ic_fps.svg", `<path d="M12,62 A36,36 0 1 1 84,62 Z" fill="url(#f)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><path d="M20,60 A28,28 0 0 1 76,60" fill="none" stroke="#fff" stroke-width="7" opacity=".9"/>
<path d="M20,60 A28,28 0 0 1 34,36" fill="none" stroke="#7fe0b8" stroke-width="7"/><path d="M34,36 A28,28 0 0 1 62,36" fill="none" stroke="#ffd877" stroke-width="7"/><path d="M62,36 A28,28 0 0 1 76,60" fill="none" stroke="#ff9fbf" stroke-width="7"/>
<path d="M48,62 L66,38" stroke="${OL}" stroke-width="6" stroke-linecap="round"/><path d="M48,62 L66,38" stroke="#fff6d2" stroke-width="2.6" stroke-linecap="round"/><circle cx="48" cy="62" r="8" fill="url(#gd)" stroke="${OL}" stroke-width="2.4"/><path d="M14,70 H82 C82,76 78,80 72,80 H24 C18,80 14,76 14,70 Z" fill="url(#gd)" stroke="${OL}" stroke-width="2.4"/>`, LG("f", "#8a72e0", "#3c3384"));
icon("ic_idle.svg", `<path d="M58,12 C40,14 26,30 26,48 C26,68 42,84 62,84 C72,84 80,80 86,74 C60,76 44,58 46,38 C47,26 52,18 58,12 Z" fill="url(#m)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><path d="M38,40 C38,32 42,24 48,20" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".85"/>
<text x="70" y="38" font-family="Georgia,serif" font-weight="700" font-size="20" fill="#fff6d2" stroke="${OL}" stroke-width="3" paint-order="stroke">z</text><text x="78" y="24" font-family="Georgia,serif" font-weight="700" font-size="14" fill="#fff6d2" stroke="${OL}" stroke-width="2.6" paint-order="stroke">z</text>
<circle cx="56" cy="62" r="3" fill="#e4a63c" opacity=".55"/><circle cx="42" cy="68" r="2" fill="#e4a63c" opacity=".45"/>`, `<linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6d2"/><stop offset=".5" stop-color="#ffd877"/><stop offset="1" stop-color="#e4a63c"/></linearGradient>`);
icon("ic_notify.svg", `<path d="M48,14 C30,14 22,28 22,44 V58 L14,68 H82 L74,58 V44 C74,28 66,14 48,14 Z" fill="url(#gd)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><path d="M30,44 C30,32 36,24 44,22" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".85"/>
<circle cx="48" cy="12" r="5" fill="url(#gd)" stroke="${OL}" stroke-width="2.2"/><path d="M38,70 C38,80 58,80 58,70" fill="#c9b8ff" stroke="${OL}" stroke-width="2.4"/><path d="M14,68 H82" stroke="${OL}" stroke-width="2.8" stroke-linecap="round"/><path d="M20,64 H76" stroke="#b8761c" stroke-width="2" opacity=".6"/>`);
icon("ic_lang.svg", `<circle cx="48" cy="48" r="34" fill="url(#w)" stroke="${OL}" stroke-width="2.8"/><ellipse cx="48" cy="48" rx="14" ry="34" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="2.4"/><path d="M14,48 H82 M20,30 H76 M20,66 H76" stroke="#fff" stroke-opacity=".75" stroke-width="2.4"/><path d="M48,14 V82" stroke="#fff" stroke-opacity=".75" stroke-width="2.4"/>
<path d="M28,24 C34,18 42,16 48,16" stroke="#fff" stroke-width="3.6" stroke-linecap="round" fill="none"/><path d="M52,58 C60,52 72,54 76,62 C70,72 58,76 52,72 Z" fill="#7fe0b8" stroke="${OL}" stroke-width="1.6" opacity=".9"/><path d="M24,36 C30,30 38,34 36,42 C32,46 26,44 24,36 Z" fill="#7fe0b8" stroke="${OL}" stroke-width="1.6" opacity=".9"/>`, RG("w", "#5ea8f0"));
icon("ic_account.svg", `<rect x="10" y="30" width="44" height="30" rx="15" fill="none" stroke="${OL}" stroke-width="12"/><rect x="10" y="30" width="44" height="30" rx="15" fill="none" stroke="url(#gd)" stroke-width="7"/>
<rect x="42" y="36" width="44" height="30" rx="15" fill="none" stroke="${OL}" stroke-width="12"/><rect x="42" y="36" width="44" height="30" rx="15" fill="none" stroke="url(#a)" stroke-width="7"/><path d="M48,33 C40,33 34,38 32,44" stroke="${OL}" stroke-width="12" fill="none"/><path d="M48,33 C40,33 34,38 32,44" stroke="url(#gd)" stroke-width="7" fill="none"/><path d="M18,34 C22,31 28,30 34,30" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"/>`, LG("a", "#c9b8ff", "#7d63dc", 1, 1));
icon("ic_support.svg", `<rect x="10" y="24" width="76" height="52" rx="8" fill="url(#e)" stroke="${OL}" stroke-width="2.8"/><path d="M12,28 L48,54 L84,28" fill="none" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/><path d="M12,74 L38,50 M84,74 L58,50" stroke="${OL}" stroke-opacity=".5" stroke-width="2"/>
<path d="M48,62 C40,54 36,46 42,42 C46,40 48,44 48,44 C48,44 50,40 54,42 C60,46 56,54 48,62 Z" fill="#ff8fb4" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/><path d="M42,46 C43,44 45,44 46,45" stroke="#fff" stroke-width="1.8" stroke-linecap="round" fill="none"/>`, LG("e", "#fffdf6", "#efdfc0"));
icon("ic_coupon.svg", `<path d="M12,24 H84 V40 C78,40 76,44 76,48 C76,52 78,56 84,56 V72 H12 V56 C18,56 20,52 20,48 C20,44 18,40 12,40 Z" fill="url(#k)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><path d="M62,28 V68" stroke="${OL}" stroke-opacity=".55" stroke-width="2.2" stroke-dasharray="4 4"/><path d="M16,30 H80" stroke="#fff" stroke-width="2.6" opacity=".8"/>
<polygon points="${pts([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => P(38, 49, i % 2 ? 6 : 14, -90 + i * 36)))}" fill="url(#gd)" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><circle cx="72" cy="40" r="2.6" fill="${OL}" opacity=".4"/><circle cx="72" cy="56" r="2.6" fill="${OL}" opacity=".4"/>`, LG("k", "#ffc3da", "#f07fa8"));
icon("ic_terms.svg", `<path d="M22,14 H72 C78,14 80,18 80,22 V80 H28 C22,80 18,76 18,70 V18 C18,16 20,14 22,14 Z" fill="url(#t)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>${[30, 40, 50, 60].map((y, i) => `<path d="M30,${y} H${i === 3 ? 54 : 68}" stroke="#9a8ab8" stroke-width="3" stroke-linecap="round"/>`).join("")}
<path d="M18,70 C18,64 22,62 28,62 H86 V70 C86,76 82,80 76,80 H28 C22,80 18,76 18,70 Z" fill="url(#gd)" stroke="${OL}" stroke-width="2.4"/><circle cx="66" cy="68" r="11" fill="#d0457e" stroke="${OL}" stroke-width="2.2"/><polygon points="${pts(star4(66, 68, 7, 0.32))}" fill="#ffe0ec"/>`, LG("t", "#fffdf6", "#efdfc0"));
icon("ic_credits.svg", `<path d="M20,70 C10,60 12,34 30,22 C46,12 72,14 82,30 C90,44 80,52 70,50 C62,48 58,56 64,64 C70,72 60,82 46,82 C34,82 26,78 20,70 Z" fill="url(#p)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>
${[["#ff7a9a", 32, 36], ["#ffd36b", 46, 26], ["#7fe0b8", 62, 28], ["#7fb8ff", 30, 54], ["#b58bff", 42, 68]].map(([c, x, y]) => `<circle cx="${x}" cy="${y}" r="6.4" fill="${c}" stroke="${OL}" stroke-width="1.6"/><circle cx="${x - 2}" cy="${y - 2}" r="2" fill="#fff" opacity=".85"/>`).join("")}
<path d="M54,62 L86,22" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path d="M54,62 L86,22" stroke="#b49bff" stroke-width="4.4" stroke-linecap="round"/><path d="M50,68 C48,62 52,58 56,60 C58,64 56,70 50,68 Z" fill="#fff6d2" stroke="${OL}" stroke-width="2"/>`, LG("p", "#fff2dc", "#e7c08c", 1, 1));
icon("ic_gear.svg", `<path d="${(() => { let d = ""; for (let i = 0; i < 16; i++) { const a = -90 + i * 22.5, r = i % 2 ? 26 : 34; const [x, y] = P(48, 48, r, a - 5), [x2, y2] = P(48, 48, r, a + 5); d += `${i ? "L" : "M"}${f(x)},${f(y)} L${f(x2)},${f(y2)} `; } return d + "Z"; })()}" fill="url(#gd)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><circle cx="48" cy="48" r="14" fill="url(#h)" stroke="${OL}" stroke-width="2.4"/><path d="M30,32 C34,26 40,22 46,21" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>`, RG("h", "#9a7ff0"));
icon("ic_dev.svg", `<path d="M66,14 C56,14 50,22 52,32 L18,66 C14,70 14,76 18,80 C22,84 28,84 32,80 L66,46 C76,48 84,42 84,32 L74,38 L64,34 L62,24 Z" fill="url(#w)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/><circle cx="25" cy="73" r="3.4" fill="${OL}" opacity=".5"/><path d="M58,26 C60,20 64,18 68,18" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none"/>`, LG("w", "#e2e6f2", "#8f99b8", 1, 1));
icon("ic_record.svg", `<circle cx="48" cy="48" r="36" fill="#231c3e" stroke="${OL}" stroke-width="2.8"/>${[30, 25, 20].map((r) => `<circle cx="48" cy="48" r="${r}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="1.4"/>`).join("")}<circle cx="48" cy="48" r="13" fill="url(#gd)" stroke="${OL}" stroke-width="2"/><circle cx="48" cy="48" r="2.6" fill="${OL}"/><path d="M22,34 C26,26 34,20 42,18" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round" fill="none"/>`);

// ---------- 레코드 (HTML에서 납작하게 눌러 돌린다) ----------
save("record.svg", svg(300, 300, `<defs><radialGradient id="v" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#2a2244"/><stop offset=".95" stop-color="#14102a"/><stop offset="1" stop-color="#0a0818"/></radialGradient><linearGradient id="sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".42" stop-color="#d8c8ff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset=".6" stop-color="#ffc8e0" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<circle cx="150" cy="150" r="146" fill="url(#v)" stroke="${OL}" stroke-width="3"/>${Array.from({ length: 34 }, (_, i) => `<circle cx="150" cy="150" r="${f(58 + i * 2.6)}" fill="none" stroke="#fff" stroke-opacity="${f(0.03 + (i % 5 === 0 ? 0.06 : 0))}" stroke-width="1"/>`).join("")}
<circle cx="150" cy="150" r="146" fill="url(#sh)"/><circle cx="150" cy="150" r="54" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="4"/>`));

// ---------- 축음기 2 (세 장이 같은 500×560 화면 좌표: 몸 → 나팔 → [레코드는 HTML] → 바늘 팔) ----------
// 몸: 3/4 시점 호두 상자 + 놋쇠 턴테이블 · 앞판 무지개 명판 · 태엽 손잡이 · 공 다리
{
  const grain = Array.from({ length: 7 }, (_, i) => { const y = 462 + i * 9 + rnd() * 3; return `<path d="M20,${f(y)} C120,${f(y - 3 + rnd() * 6)} 300,${f(y + 3 - rnd() * 6)} 460,${f(y + rnd() * 2)}" stroke="#2a140c" stroke-opacity="${f(0.12 + rnd() * 0.1)}" stroke-width="${f(0.8 + rnd())}" fill="none"/>`; }).join("");
  const tgrain = Array.from({ length: 8 }, (_, i) => { const y = 326 + i * 15 + rnd() * 4; const k = (y - 318) / 134; const x0 = 62 - k * 48, x1 = 398 + k * 68; return `<path d="M${f(x0 + 6)},${f(y)} C${f(x0 + 120)},${f(y - 2)} ${f(x1 - 120)},${f(y + 2)} ${f(x1 - 6)},${f(y)}" stroke="#4a2414" stroke-opacity=".14" stroke-width="1.2" fill="none"/>`; }).join("");
  const foot = (x) => `<ellipse cx="${x}" cy="537" rx="17" ry="10" fill="url(#bz)" stroke="${OL}" stroke-width="2"/><ellipse cx="${x - 5}" cy="533" rx="5" ry="2.4" fill="#fff6d2" opacity=".8"/>`;
  save("gramo2_body.svg", svg(500, 560, `<defs>${GOLD("g", 1, 0)}${GOLD("gv", 0, 1)}${RG("bz", "#e4a63c")}
<linearGradient id="fr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a26a40"/><stop offset=".45" stop-color="#6c3f28"/><stop offset="1" stop-color="#3a2016"/></linearGradient>
<linearGradient id="tp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5634"/><stop offset=".6" stop-color="#b47c4c"/><stop offset="1" stop-color="#c99260"/></linearGradient>
<radialGradient id="ft" cx=".46" cy=".4" r=".7"><stop offset="0" stop-color="#5e3f7a"/><stop offset=".7" stop-color="#3a2456"/><stop offset="1" stop-color="#22142f"/></radialGradient>
<linearGradient id="rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9fbf"/><stop offset=".25" stop-color="#ffd877"/><stop offset=".5" stop-color="#9fe6cf"/><stop offset=".75" stop-color="#8fc8ff"/><stop offset="1" stop-color="#b49bff"/></linearGradient>
<filter id="bl" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>${SH("d", 6, 5, 0.4)}</defs>
<ellipse cx="240" cy="548" rx="236" ry="13" fill="#140a1c" opacity=".5" filter="url(#bl)"/>
${foot(46)}${foot(434)}
<g filter="url(#d)">
<path d="M14,452 H466 V512 Q466,532 446,532 H34 Q14,532 14,512 Z" fill="url(#fr)" stroke="${OL}" stroke-width="2.8"/>${grain}
<path d="M40,466 H440 Q448,466 448,474 V510 Q448,518 440,518 H40 Q32,518 32,510 V474 Q32,466 40,466 Z" fill="#2c160e" fill-opacity=".35" stroke="url(#g)" stroke-width="2.4"/>
<path d="M44,470 H436" stroke="#ffe3a0" stroke-opacity=".35" stroke-width="1.2"/>
<path d="M188,512 A52,40 0 0 1 292,512 Z" fill="url(#rb)" stroke="${OL}" stroke-width="1.6"/><path d="M204,512 A36,26 0 0 1 276,512 Z" fill="#3a2016"/><path d="M178,514 H302" stroke="url(#g)" stroke-width="3" stroke-linecap="round"/>
<polygon points="${pts(star4(240, 488, 9, 0.3))}" fill="#fff6d2"/>
${[[60, 492], [420, 492]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="url(#bz)" stroke="${OL}" stroke-width="1.4"/><path d="M${x - 3},${y} H${x + 3}" stroke="${OL}" stroke-width="1.2"/>`).join("")}
<path d="M62,318 H398 L466,452 H14 Z" fill="url(#tp)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>${tgrain}
<path d="M66,322 H394" stroke="#ffd9a8" stroke-opacity=".5" stroke-width="2"/>
<path d="M10,446 H470 V458 H10 Z" fill="url(#gv)" stroke="${OL}" stroke-width="2"/><path d="M14,449 H466" stroke="#fff6d2" stroke-width="1.4" opacity=".9"/>
<ellipse cx="232" cy="396" rx="172" ry="58" fill="#2a140c" opacity=".45"/>
<ellipse cx="232" cy="390" rx="170" ry="56" fill="url(#g)" stroke="${OL}" stroke-width="2.6"/>
<ellipse cx="232" cy="388" rx="160" ry="50" fill="url(#ft)" stroke="#8a5a14" stroke-width="1.4"/>
<path d="M90,372 A160,50 0 0 1 300,340" stroke="#fff6d2" stroke-width="2" fill="none" opacity=".7"/>
<ellipse cx="404" cy="358" rx="24" ry="9" fill="#2a140c" opacity=".4"/>
<path d="M384,340 V352 A20,8 0 0 0 424,352 V340 Z" fill="url(#g)" stroke="${OL}" stroke-width="2"/><ellipse cx="404" cy="340" rx="20" ry="8" fill="url(#bz)" stroke="${OL}" stroke-width="2"/>
<path d="M466,486 H486 V462" fill="none" stroke="${OL}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M466,486 H486 V462" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="478" y="440" width="16" height="26" rx="8" fill="#ffc3da" stroke="${OL}" stroke-width="2"/><path d="M483,445 V458" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
<circle cx="466" cy="486" r="6" fill="url(#bz)" stroke="${OL}" stroke-width="1.6"/>
</g>`));
}
// 나팔: 꽃잎 나팔(안쪽은 라벤더 · 크림 꽃잎을 번갈아 칠한 그림, 바깥은 놋쇠) + 휜 목 → 상자 뒤 받침
{
  const C = [196, 150], rx = 156, ry = 120, th = (-14 * Math.PI) / 180;
  const E = (deg) => { const t = (deg * Math.PI) / 180; return [C[0] + rx * Math.cos(t) * Math.cos(th) - ry * Math.sin(t) * Math.sin(th), C[1] + rx * Math.cos(t) * Math.sin(th) + ry * Math.sin(t) * Math.cos(th)]; };
  const T = [340, 262], TR = 12;
  const ax = [T[0] - C[0], T[1] - C[1]], L = Math.hypot(ax[0], ax[1]), ux = [ax[0] / L, ax[1] / L], vx = [-ux[1], ux[0]];
  const toA = (p) => [(p[0] - C[0]) * ux[0] + (p[1] - C[1]) * ux[1], (p[0] - C[0]) * vx[0] + (p[1] - C[1]) * vx[1]];
  const fromA = (u, v) => [C[0] + u * ux[0] + v * vx[0], C[1] + u * ux[1] + v * vx[1]];
  // 나팔 바깥 옆선: 입에서 급히 좁아져 목까지 거의 나란히 (지수 나팔꼴)
  const prof = (R, sgn) => { const [u, v] = toA(R); const p1 = fromA(u + 0.22 * (L - u), v * 0.42), p2 = fromA(u + 0.62 * (L - u), sgn * TR * 1.35), p3 = fromA(L, sgn * TR); return `C${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])} ${f(p3[0])},${f(p3[1])}`; };
  const tA = -58, tB = 132;
  const RA = E(tA), RB = E(tB);
  const outer = `M${f(RA[0])},${f(RA[1])} ${prof(RA, -1)} L${f(fromA(L, TR)[0])},${f(fromA(L, TR)[1])} ${(() => { const [u, v] = toA(RB); const p1 = fromA(u + 0.22 * (L - u), v * 0.42), p2 = fromA(u + 0.62 * (L - u), TR * 1.35); return `C${f(p2[0])},${f(p2[1])} ${f(p1[0])},${f(p1[1])} ${f(RB[0])},${f(RB[1])}`; })()} A${rx},${ry} ${-14} 0 0 ${f(RA[0])},${f(RA[1])} Z`;
  const ribs = [-30, 0, 30, 60, 90, 112].map((t) => { const R = E(t); const [u, v] = toA(R); const p1 = fromA(u + 0.22 * (L - u), v * 0.42), p2 = fromA(u + 0.62 * (L - u), Math.sign(v) * TR * 0.9), p3 = fromA(L, Math.sign(v) * TR * 0.6); return `<path d="M${f(R[0])},${f(R[1])} C${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])} ${f(p3[0])},${f(p3[1])}" stroke="${OL}" stroke-opacity=".28" stroke-width="1.5" fill="none"/>`; }).join("");
  const Hh = [C[0] + ax[0] * 0.34, C[1] + ax[1] * 0.34];
  const N = 12, petals = [], flowers = [];
  for (let i = 0; i < N; i++) {
    const a0 = (i * 360) / N, a1 = ((i + 1) * 360) / N, P0 = E(a0), P1 = E(a1);
    const ctl = (P) => { const m = [(P[0] + Hh[0]) / 2, (P[1] + Hh[1]) / 2]; const d = [Hh[0] - P[0], Hh[1] - P[1]]; const k = 10 / Math.hypot(d[0], d[1]); return [m[0] - d[1] * k, m[1] + d[0] * k]; };
    const c0 = ctl(P0), c1 = ctl(P1);
    petals.push(`<path d="M${f(Hh[0])},${f(Hh[1])} Q${f(c0[0])},${f(c0[1])} ${f(P0[0])},${f(P0[1])} A${rx},${ry} -14 0 1 ${f(P1[0])},${f(P1[1])} Q${f(c1[0])},${f(c1[1])} ${f(Hh[0])},${f(Hh[1])} Z" fill="url(#${i % 2 ? "pc" : "pl"})"/>`);
    petals.push(`<path d="M${f(P0[0])},${f(P0[1])} Q${f(c0[0])},${f(c0[1])} ${f(Hh[0])},${f(Hh[1])}" stroke="#8a5a14" stroke-opacity=".55" stroke-width="1.3" fill="none"/>`);
    // 골마다 한쪽 가장자리에 빛 — 접힌 꽃잎의 골이 보이게
    petals.push(`<path d="M${f(P1[0])},${f(P1[1])} Q${f(c1[0])},${f(c1[1])} ${f(Hh[0])},${f(Hh[1])}" stroke="#fff" stroke-opacity="${i % 2 ? 0.45 : 0.3}" stroke-width="5" fill="none" transform="translate(${f((Hh[0] - P1[0]) * 0.012 - 2)},${f((Hh[1] - P1[1]) * 0.012 - 2)})" stroke-linecap="round" stroke-dasharray="0 14 90 400"/>`);
    if (i % 2) { const am = (a0 + a1) / 2, Pm = E(am), q = [Pm[0] + (Hh[0] - Pm[0]) * 0.24, Pm[1] + (Hh[1] - Pm[1]) * 0.24]; const r = 7; flowers.push(`<g transform="translate(${f(q[0])},${f(q[1])}) rotate(${f(am)})">${[0, 72, 144, 216, 288].map((a) => { const [x, y] = P(0, 0, r, a); return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="4.4" ry="3" transform="rotate(${a} ${f(x)} ${f(y)})" fill="#ff9fbf" stroke="#c94a7a" stroke-width=".8"/>`; }).join("")}<circle r="2.6" fill="#ffd877" stroke="#b8761c" stroke-width=".8"/></g>`); }
  }
  const NK = `M${T[0]},${T[1]} C362,280 404,298 404,334`;
  save("gramo2_horn.svg", svg(500, 560, `<defs>${GOLD("g", 1, 1)}
<linearGradient id="ob" gradientUnits="userSpaceOnUse" x1="${f(fromA(L * 0.5, -60)[0])}" y1="${f(fromA(L * 0.5, -60)[1])}" x2="${f(fromA(L * 0.5, 60)[0])}" y2="${f(fromA(L * 0.5, 60)[1])}"><stop offset="0" stop-color="#fff2c4"/><stop offset=".35" stop-color="#ecc66a"/><stop offset=".7" stop-color="#c8922e"/><stop offset="1" stop-color="#7a4a10"/></linearGradient>
<radialGradient id="pl" gradientUnits="userSpaceOnUse" cx="${f(Hh[0])}" cy="${f(Hh[1])}" r="170"><stop offset="0" stop-color="#1e1440"/><stop offset=".18" stop-color="#3d2b7a"/><stop offset=".55" stop-color="#7d63dc"/><stop offset=".85" stop-color="#b9a3f6"/><stop offset="1" stop-color="#e6dcff"/></radialGradient>
<radialGradient id="pc" gradientUnits="userSpaceOnUse" cx="${f(Hh[0])}" cy="${f(Hh[1])}" r="170"><stop offset="0" stop-color="#2a1a20"/><stop offset=".18" stop-color="#6a4a3a"/><stop offset=".55" stop-color="#d9b98a"/><stop offset=".85" stop-color="#f6e6c4"/><stop offset="1" stop-color="#fffaf0"/></radialGradient>
<radialGradient id="dp" gradientUnits="userSpaceOnUse" cx="${f(Hh[0])}" cy="${f(Hh[1])}" r="90"><stop offset="0" stop-color="#0c0818" stop-opacity=".85"/><stop offset=".5" stop-color="#0c0818" stop-opacity=".3"/><stop offset="1" stop-color="#0c0818" stop-opacity="0"/></radialGradient>
<linearGradient id="nk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff2c4"/><stop offset=".45" stop-color="#e4a63c"/><stop offset="1" stop-color="#8a5a14"/></linearGradient>
<clipPath id="mo"><ellipse cx="${C[0]}" cy="${C[1]}" rx="${rx}" ry="${ry}" transform="rotate(-14 ${C[0]} ${C[1]})"/></clipPath>${SH("d", 8, 7, 0.4)}</defs>
<g filter="url(#d)">
<path d="${NK}" fill="none" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="${NK}" fill="none" stroke="url(#nk)" stroke-width="23" stroke-linecap="round"/><path d="M336,256 C358,272 396,290 398,326" fill="none" stroke="#fff6d2" stroke-width="4" stroke-linecap="round" opacity=".75"/>
<ellipse cx="404" cy="330" rx="17" ry="8" fill="url(#g)" stroke="${OL}" stroke-width="2"/>
<path d="${outer}" fill="url(#ob)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>${ribs}
<g clip-path="url(#mo)">${petals.join("")}${flowers.join("")}<ellipse cx="${f(Hh[0])}" cy="${f(Hh[1])}" rx="120" ry="96" fill="url(#dp)"/>
<ellipse cx="${f(Hh[0])}" cy="${f(Hh[1])}" rx="11" ry="8.5" fill="#05030c"/>
<path d="M${f(E(150)[0])},${f(E(150)[1])} A${rx - 14},${ry - 12} -14 0 1 ${f(E(250)[0] + 6)},${f(E(250)[1] + 10)}" stroke="#fff" stroke-opacity=".5" stroke-width="10" fill="none" stroke-linecap="round" transform="translate(10,8)"/></g>
<ellipse cx="${C[0]}" cy="${C[1]}" rx="${rx}" ry="${ry}" transform="rotate(-14 ${C[0]} ${C[1]})" fill="none" stroke="${OL}" stroke-width="10"/>
<ellipse cx="${C[0]}" cy="${C[1]}" rx="${rx}" ry="${ry}" transform="rotate(-14 ${C[0]} ${C[1]})" fill="none" stroke="url(#g)" stroke-width="6.4"/>
<ellipse cx="${C[0]}" cy="${C[1]}" rx="${rx}" ry="${ry}" transform="rotate(-14 ${C[0]} ${C[1]})" fill="none" stroke="#fff6d2" stroke-width="2" stroke-dasharray="120 900" stroke-dashoffset="-560"/>
<ellipse cx="${T[0] + 2}" cy="${T[1] + 2}" rx="17" ry="15" transform="rotate(40 ${T[0]} ${T[1]})" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/>
</g>
<polygon points="${pts(star4(E(205)[0], E(205)[1], 12, 0.22))}" fill="#fff"/><polygon points="${pts(star4(E(300)[0] + 4, E(300)[1] - 4, 7, 0.26))}" fill="#fff" opacity=".9"/>`));
}
// 바늘 팔: 받침 위에서 휘어 레코드 위 사운드박스(운모 얼굴)까지 — 정지하면 HTML이 받침을 축으로 돌려 들어 올린다
save("gramo2_arm.svg", svg(500, 560, `<defs>${GOLD("g", 1, 1)}<radialGradient id="mi" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eae4fb"/><stop offset="1" stop-color="#b9b0d8"/></radialGradient>${SH("d", 5, 3, 0.45)}</defs>
<g filter="url(#d)"><path d="M404,338 C394,360 352,356 322,370" fill="none" stroke="${OL}" stroke-width="13" stroke-linecap="round"/><path d="M404,338 C394,360 352,356 322,370" fill="none" stroke="url(#g)" stroke-width="8.6" stroke-linecap="round"/><path d="M400,342 C390,356 356,352 326,366" fill="none" stroke="#fff6d2" stroke-width="2" stroke-linecap="round" opacity=".8"/>
<ellipse cx="404" cy="336" rx="12" ry="6" fill="url(#g)" stroke="${OL}" stroke-width="1.8"/>
<path d="M306,394 L308,406" stroke="#c9c6d8" stroke-width="2.4" stroke-linecap="round"/>
<ellipse cx="308" cy="380" rx="16" ry="19" transform="rotate(22 308 380)" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/><ellipse cx="308" cy="380" rx="10.5" ry="13" transform="rotate(22 308 380)" fill="url(#mi)" stroke="#8a5a14" stroke-width="1.2"/><circle cx="308" cy="380" r="2.4" fill="#8a5a14"/><path d="M302,372 C304,369 308,368 311,369" stroke="#fff" stroke-width="1.6" stroke-linecap="round" fill="none"/></g>`));

// ---------- 음악 상자 (장미나무 상자 몸 · 열린 뚜껑 안쪽 그림 자리 · 놋쇠 원통 + 빗) ----------
save("mbox_body.svg", svg(560, 220, `<defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b87590"/><stop offset=".5" stop-color="#93506a"/><stop offset="1" stop-color="#5a2a3a"/></linearGradient><linearGradient id="in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2560"/><stop offset="1" stop-color="#4a3f94"/></linearGradient>${GOLD("g", 1, 0)}${SH("d", 12, 10, 0.5)}</defs>
<g filter="url(#d)"><path d="M20,40 L70,8 H490 L540,40 Z" fill="url(#in)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M20,40 H540 V196 C540,206 532,212 522,212 H38 C28,212 20,206 20,196 Z" fill="url(#f)" stroke="${OL}" stroke-width="3"/><path d="M36,58 H524 V194 H36 Z" fill="none" stroke="url(#g)" stroke-width="2.4"/><path d="M46,68 H514 V184 H46 Z" fill="none" stroke="url(#g)" stroke-width="1" opacity=".7"/>
<path d="M22,42 H538" stroke="#ffe0ec" stroke-opacity=".5" stroke-width="2.4"/>${[0, 1].map((s) => `<g transform="translate(${s ? 524 : 36},58) scale(${s ? -1 : 1},1)"><path d="M0,0 C30,0 40,10 40,30" stroke="url(#g)" stroke-width="3" fill="none"/><polygon points="${pts(star4(8, 8, 7, 0.3))}" fill="url(#g)"/></g>`).join("")}
<ellipse cx="280" cy="126" rx="44" ry="26" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/><path d="M262,126 C262,114 298,114 298,126 C298,138 262,138 262,126 Z" fill="#3a2016" opacity=".35"/><path d="M276,120 L286,126 L276,132 Z" fill="#fff6d2"/></g>`));
save("mbox_mech.svg", svg(440, 90, `<defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c4"/><stop offset=".35" stop-color="#ffd877"/><stop offset=".7" stop-color="#c8922e"/><stop offset="1" stop-color="#7a4a10"/></linearGradient><linearGradient id="m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f4ff"/><stop offset=".5" stop-color="#b9bcd8"/><stop offset="1" stop-color="#7a7ea0"/></linearGradient></defs>
<rect x="20" y="10" width="260" height="56" rx="28" fill="url(#c)" stroke="${OL}" stroke-width="2.6"/>${Array.from({ length: 60 }, () => `<circle cx="${f(34 + rnd() * 232)}" cy="${f(16 + rnd() * 44)}" r="1.6" fill="#5a3a10" opacity=".8"/>`).join("")}<path d="M34,20 H266" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>
<path d="M290,8 H400 C410,8 420,14 420,24 V58 C420,68 410,74 400,74 H290 Z" fill="url(#m)" stroke="${OL}" stroke-width="2.4"/>${Array.from({ length: 18 }, (_, i) => `<path d="M296,${f(12 + i * 3.4)} H${f(330 + (i % 6) * 12)}" stroke="#5a5e80" stroke-width="1.4"/>`).join("")}
<circle cx="10" cy="38" r="9" fill="url(#c)" stroke="${OL}" stroke-width="2"/><rect x="282" y="20" width="10" height="36" rx="3" fill="url(#c)" stroke="${OL}" stroke-width="1.6"/>`));
// 뚜껑 안감: 단추로 누른 라벤더 공단 (48px 무늬 한 칸, 이음매 없이 반복)
save("satin.svg", svg(48, 48, `<defs><radialGradient id="c" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".6" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="b" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff6d2"/><stop offset=".6" stop-color="#e4a63c"/><stop offset="1" stop-color="#8a5a14"/></radialGradient></defs>
<rect width="48" height="48" fill="#c4b0ee"/>${[[24, 0], [0, 24], [48, 24], [24, 48]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="20" ry="20" fill="url(#c)"/>`).join("")}
<path d="M0,0 L48,48 M48,0 L0,48" stroke="#5b448f" stroke-opacity=".38" stroke-width="1.4"/><path d="M1,2 L47,48 M47,2 L1,48" stroke="#fff" stroke-opacity=".22" stroke-width="1"/>
${[[0, 0], [48, 0], [0, 48], [48, 48], [24, 24]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#5b448f" opacity=".35"/><circle cx="${x}" cy="${y - 0.6}" r="2.6" fill="url(#b)"/>`).join("")}`));
// 고래 인형 받침: 거울 윗면 + 별 새긴 놋쇠 띠 (돌림판)
save("plinth.svg", svg(200, 70, `<defs>${GOLD("g", 1, 0)}<linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#e6dcff"/><stop offset=".6" stop-color="#b9a3f6"/><stop offset="1" stop-color="#f6efff"/></linearGradient>${SH("d", 4, 3, 0.4)}</defs>
<g filter="url(#d)"><path d="M10,26 V42 A90,20 0 0 0 190,42 V26 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/>${[40, 70, 100, 130, 160].map((x) => `<polygon points="${pts(star4(x, 40 + Math.sin(((x - 100) / 90) * 1.4) * 3, 4.4, 0.3))}" fill="#fff6d2" opacity=".85"/>`).join("")}
<ellipse cx="100" cy="26" rx="90" ry="20" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/><ellipse cx="100" cy="25" rx="80" ry="15" fill="url(#m)" stroke="#8a5a14" stroke-width="1.2"/><path d="M38,22 C60,14 100,12 130,14" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".9"/></g>`));
// 솜구름 (게임 결 외곽선 + 아래 라벤더 그늘)
save("puff.svg", svg(160, 70, `<defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f6efff"/><stop offset="1" stop-color="#cdbdf2"/></linearGradient></defs>
<path d="M18,58 C4,58 4,40 18,38 C16,24 34,18 44,26 C50,10 76,8 84,22 C94,12 116,16 116,32 C132,28 146,40 138,52 C150,56 144,64 134,64 H24 C16,64 12,60 18,58 Z" fill="url(#c)" stroke="#7d63b8" stroke-opacity=".6" stroke-width="2"/>
<path d="M30,34 C34,28 42,28 46,32 M62,22 C68,16 78,16 82,24 M96,26 C102,22 110,24 112,30" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>`));
save("crank.svg", svg(90, 90, `<defs>${GOLD("g")}</defs><path d="M20,70 L66,26" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M20,70 L66,26" stroke="url(#g)" stroke-width="6" stroke-linecap="round"/><circle cx="20" cy="70" r="12" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/><rect x="58" y="10" width="20" height="26" rx="10" fill="#ffc3da" stroke="${OL}" stroke-width="2.4"/><path d="M63,15 V28" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`));
// 구멍 뚫린 악보 띠 (트랙)
save("punch.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="70" viewBox="0 0 300 70" preserveAspectRatio="none"><defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#efdfc0"/></linearGradient></defs><path d="M4,6 H286 L296,35 L286,64 H4 C8,50 8,20 4,6 Z" fill="url(#p)" stroke="${OL}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>${Array.from({ length: 28 }, () => `<rect x="${f(150 + rnd() * 120)}" y="${f(12 + Math.floor(rnd() * 8) * 6)}" width="${f(4 + rnd() * 10)}" height="3" rx="1.5" fill="#5a3a6a" opacity=".55"/>`).join("")}</svg>`);

// ---------- 전시실 (금 액자 · 놋쇠 명판) ----------
save("frame.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260" preserveAspectRatio="none"><defs>${GOLD("g")}<linearGradient id="i" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8761c"/><stop offset=".5" stop-color="#fff2c4"/><stop offset="1" stop-color="#8a5a14"/></linearGradient></defs>
<path d="M0,0 H400 V260 H0 Z M26,26 V234 H374 V26 Z" fill="url(#g)" fill-rule="evenodd" stroke="${OL}" stroke-width="2.4" vector-effect="non-scaling-stroke"/><path d="M10,10 H390 V250 H10 Z" fill="none" stroke="#fff6d2" stroke-width="2" vector-effect="non-scaling-stroke"/><path d="M20,20 H380 V240 H20 Z" fill="none" stroke="#8a5a14" stroke-width="1.6" vector-effect="non-scaling-stroke"/><path d="M26,26 H374 V234 H26 Z" fill="none" stroke="url(#i)" stroke-width="3" vector-effect="non-scaling-stroke"/></svg>`);
save("frame_orn.svg", svg(80, 80, `<defs>${GOLD("g")}</defs><path d="M6,40 C6,20 20,6 40,6 C34,14 30,22 30,30 C22,30 14,34 6,40 Z" fill="url(#g)" stroke="${OL}" stroke-width="2"/><circle cx="18" cy="18" r="7" fill="url(#g)" stroke="${OL}" stroke-width="1.8"/><polygon points="${pts(star4(18, 18, 5, 0.3))}" fill="#fff6d2"/>`));
save("plaque.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="120" viewBox="0 0 300 120" preserveAspectRatio="none"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c4"/><stop offset=".2" stop-color="#ecc66a"/><stop offset=".6" stop-color="#c8922e"/><stop offset="1" stop-color="#8a5a14"/></linearGradient><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d3378"/><stop offset="1" stop-color="#231c4e"/></linearGradient></defs>
<path d="M20,2 H280 C292,2 298,8 298,20 V100 C298,112 292,118 280,118 H20 C8,118 2,112 2,100 V20 C2,8 8,2 20,2 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.2" vector-effect="non-scaling-stroke"/><path d="M22,12 H278 C284,12 288,16 288,22 V98 C288,104 284,108 278,108 H22 C16,108 12,104 12,98 V22 C12,16 16,12 22,12 Z" fill="url(#f)" stroke="#fff2c4" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg>`);
// 전시실 선반 소품: 펼친 방명록 + 깃펜 잉크병, 꽃 꽂은 라벤더 도자기 병
save("guestbook.svg", svg(240, 110, `<defs><linearGradient id="cv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d5aa6"/><stop offset="1" stop-color="#3d2560"/></linearGradient><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#ecdcbc"/></linearGradient><linearGradient id="ink" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3d3684"/><stop offset=".45" stop-color="#7d6ad8"/><stop offset="1" stop-color="#231c4e"/></linearGradient>${GOLD("g", 1, 0)}${SH("d", 4, 3, 0.4)}</defs>
<g filter="url(#d)"><path d="M8,96 L18,52 C50,44 86,46 106,56 C126,46 162,44 194,52 L204,96 C170,90 132,92 106,100 C80,92 42,90 8,96 Z" fill="url(#cv)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M106,54 C84,42 48,40 20,48 L14,88 C44,82 82,84 106,94 Z" fill="url(#pg)" stroke="${OL}" stroke-width="1.6"/><path d="M106,54 C128,42 164,40 192,48 L198,88 C168,82 130,84 106,94 Z" fill="url(#pg)" stroke="${OL}" stroke-width="1.6"/>
${[0, 1, 2, 3].map((i) => `<path d="M${28 - i},${f(58 + i * 8)} C52,${f(53 + i * 8)} 80,${f(54 + i * 8)} ${96 - i * 6},${f(62 + i * 8)}" stroke="#9a8ab8" stroke-width="1.4" fill="none" stroke-dasharray="${i % 2 ? "30 6 14 4" : "22 5 30 6"}"/><path d="M${116 + i * 4},${f(62 + i * 8)} C136,${f(54 + i * 8)} 160,${f(53 + i * 8)} ${184 + i},${f(58 + i * 8)}" stroke="#9a8ab8" stroke-width="1.4" fill="none" stroke-dasharray="${i % 2 ? "18 6 26 5" : "28 4 12 6"}"/>`).join("")}
<path d="M106,94 L104,108 L108,104 L112,108 L110,94" fill="#ff8fb4" stroke="${OL}" stroke-width="1.2"/>
<path d="M200,98 C196,90 196,74 204,70 H226 C234,74 234,90 230,98 Z" fill="url(#ink)" stroke="${OL}" stroke-width="2"/><rect x="206" y="62" width="18" height="10" rx="2" fill="url(#g)" stroke="${OL}" stroke-width="1.6"/><path d="M206,78 C206,74 210,72 212,72" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".8"/>
<path d="M214,66 C200,40 186,20 170,4 C180,24 196,44 212,68 Z" fill="#e6dcff" stroke="${OL}" stroke-width="1.6"/><path d="M214,66 C198,42 184,22 170,4" stroke="#9a7ff0" stroke-width="1.4" fill="none"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${f(206 - i * 7)},${f(54 - i * 10)} l${f(-7 + i)},2" stroke="#9a7ff0" stroke-width="1" opacity=".7"/>`).join("")}</g>`));
save("vase.svg", svg(120, 160, `<defs><radialGradient id="v" cx=".38" cy=".38" r=".7"><stop offset="0" stop-color="#f6efff"/><stop offset=".45" stop-color="#b9a3f6"/><stop offset="1" stop-color="#5b44b8"/></radialGradient>${GOLD("g", 1, 0)}${SH("d", 4, 3, 0.4)}</defs>
<g filter="url(#d)">
${[[60, 92, 36, 18, "#ff9fbf", "#c94a7a"], [60, 92, 80, 30, "#fff6d2", "#d9a64a"], [60, 92, 58, 6, "#c9b8ff", "#7d63dc"]].map(([x0, y0, x1, y1, c, s]) => `<path d="M${x0},${y0} C${x0},${(y0 + y1) / 2} ${x1},${y1 + 30} ${x1},${y1 + 12}" stroke="#4f9a78" stroke-width="2.4" fill="none"/>`).join("")}
<path d="M58,70 C44,64 36,52 40,44 C50,48 58,58 58,70 Z" fill="#7fc8a0" stroke="${OL}" stroke-width="1.2"/><path d="M64,62 C78,56 88,46 86,38 C74,40 66,50 64,62 Z" fill="#7fc8a0" stroke="${OL}" stroke-width="1.2"/>
${[[36, 30, "#ff9fbf", "#c94a7a", 13], [80, 42, "#fff6d2", "#d9a64a", 12], [58, 18, "#c9b8ff", "#7d63dc", 14]].map(([x, y, c, s, r]) => `<g>${[0, 72, 144, 216, 288].map((a) => { const [px, py] = P(x, y, r * 0.55, a - 90); return `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(r * 0.52)}" ry="${f(r * 0.38)}" transform="rotate(${a} ${f(px)} ${f(py)})" fill="${c}" stroke="${s}" stroke-width="1.2"/>`; }).join("")}<circle cx="${x}" cy="${y}" r="${f(r * 0.28)}" fill="#ffd877" stroke="#b8761c" stroke-width="1"/></g>`).join("")}
<path d="M46,88 H74 C74,96 70,98 72,104 C94,110 102,130 92,146 C86,154 34,154 28,146 C18,130 26,110 48,104 C50,98 46,96 46,88 Z" fill="url(#v)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M30,126 C50,132 72,132 90,126" stroke="url(#g)" stroke-width="4" fill="none"/><path d="M30,126 C50,132 72,132 90,126" stroke="${OL}" stroke-width=".8" fill="none" opacity=".5"/>
<polygon points="${pts(star4(60, 141, 6, 0.3))}" fill="#fff6d2"/><ellipse cx="42" cy="116" rx="6" ry="10" fill="#fff" opacity=".55" transform="rotate(20 42 116)"/><ellipse cx="60" cy="88" rx="15" ry="4" fill="url(#g)" stroke="${OL}" stroke-width="1.6"/></g>`));
save("screw.svg", svg(16, 16, `<defs>${RG("g", "#e4a63c")}</defs><circle cx="8" cy="8" r="6" fill="url(#g)" stroke="${OL}" stroke-width="1.2"/><path d="M4.5,8 H11.5" stroke="${OL}" stroke-width="1.4"/>`));
save("spot.svg", svg(400, 200, `<defs><radialGradient id="g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d2" stop-opacity=".75"/><stop offset=".5" stop-color="#fff0c0" stop-opacity=".25"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient></defs><ellipse cx="200" cy="100" rx="200" ry="100" fill="url(#g)"/>`));
save("lamp.svg", svg(120, 40, `<defs>${GOLD("g", 0, 1)}${SH("d", 4, 3, 0.4)}</defs><g filter="url(#d)"><path d="M10,10 C30,4 90,4 110,10 L104,26 C80,32 40,32 16,26 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/><path d="M18,12 C40,8 80,8 102,12" stroke="#fff" stroke-width="2" opacity=".8" fill="none"/><ellipse cx="60" cy="28" rx="40" ry="5" fill="#fff6d2"/></g>`));

// ---------- 그림책 (책 천 겉장 위 종이 쪽, 쪽 말림 · 판권 띠) ----------
save("seal.svg", svg(120, 120, `<defs><radialGradient id="w" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ff9fbf"/><stop offset=".6" stop-color="#c94a7a"/><stop offset="1" stop-color="#7a1f48"/></radialGradient></defs>
<path d="${(() => { let d = ""; for (let i = 0; i < 24; i++) { const [x, y] = P(60, 60, 52 + (i % 2 ? 4 : -2) + rnd() * 3, i * 15); d += `${i ? "L" : "M"}${f(x)},${f(y)} `; } return d + "Z"; })()}" fill="url(#w)" stroke="${OL}" stroke-width="2"/><circle cx="60" cy="60" r="38" fill="none" stroke="#ffe0ec" stroke-opacity=".7" stroke-width="2"/><circle cx="60" cy="60" r="33" fill="none" stroke="#7a1f48" stroke-opacity=".5" stroke-width="1.4"/><path d="M28,40 C36,28 50,22 62,22" stroke="#fff" stroke-opacity=".6" stroke-width="4" stroke-linecap="round" fill="none"/>`));

// ---------- 오른쪽 위 메뉴 구슬 (게임 B2.menu_orb 결: 크림 구슬 + 금테) ----------
save("orb.svg", svg(60, 60, `<defs>${GOLD("g")}<radialGradient id="c" cx=".42" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".65" stop-color="#f6f0ff"/><stop offset="1" stop-color="#ddd0f2"/></radialGradient>${SH("d", 3, 3, 0.4)}</defs><g filter="url(#d)"><circle cx="30" cy="29" r="26" fill="url(#g)" stroke="${OL}" stroke-opacity=".7" stroke-width="1.6"/><circle cx="30" cy="29" r="22" fill="url(#c)"/><path d="M14,20 C18,12 25,8 33,8" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>`));

// ---------- 말풍선 꼬리 (뾰족) — 드롭다운 카드 ----------
save("tail_up.svg", svg(40, 22, `<path d="M2,22 L22,2 L38,22 Z" fill="#fffdf6" stroke="#e4c27a" stroke-width="2" stroke-linejoin="round"/><path d="M0,21 H40" stroke="#fffdf6" stroke-width="3"/>`));

rmSync(tmp, { recursive: true, force: true });
console.log("ok");
