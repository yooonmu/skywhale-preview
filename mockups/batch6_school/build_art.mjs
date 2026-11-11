// 묶음 6 「분교 · 고래」 시안 부품 — 그림 결(PNG → JPG 질감) + 게임 결 SVG(짙은 자두색 외곽선 · 여러 단 그라데이션 · 윗빛 · 아랫그늘).
// batch45_adventure/build_art.mjs와 같은 결. 시안 전용이라 batch6_school/a/s/ 에만 쓴다 (게임 assets/는 건드리지 않음).
//   node design/mockups/feedback70/batch6_school/build_art.mjs
import { writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { tmpdir } from "node:os";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "a/s");
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "b6art-"));
const OL = "#4a2b45";
const f = (n) => Math.round(n * 100) / 100;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n${body}\n</svg>\n`;
const save = (name, s) => writeFileSync(resolve(out, name), s);
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const P = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const pts = (a) => a.map((p) => `${f(p[0])},${f(p[1])}`).join(" ");
const hex2rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgb2hex = (r) => "#" + r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const shade = (h, k) => { const c = hex2rgb(h); return rgb2hex(c.map((v) => (k >= 0 ? v + (255 - v) * k : v * (1 + k)))); };
const GOLD = (id, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="#fff6d2"/><stop offset=".3" stop-color="#ffd877"/><stop offset=".62" stop-color="#e4a63c"/><stop offset=".86" stop-color="#b8761c"/><stop offset="1" stop-color="#e9bd5c"/></linearGradient>`;
const star4 = (cx, cy, r, k = 0.28, rot = -90) => { const a = []; for (let i = 0; i < 8; i++) a.push(P(cx, cy, i % 2 ? r * k : r, rot + i * 45)); return a; };

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
// 주기 잡음 (perX · perY 격자마다 되풀이 → 이음매 없는 타일)
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

// 나무 판 (가로 판자 64px · 판마다 톤 · 결 · 옹이 · 닳은 자국), vert = 세로 판자
function wood(name, cols, vert, PH = 64) {
  const T = 512, n1 = noise(11), n2 = noise(29), n3 = noise(53);
  const tones = Array.from({ length: T / PH }, () => (rnd() - 0.5) * 0.16);
  const joints = Array.from({ length: T / PH }, () => Math.floor(rnd() * T));
  tex(name, T, T, (X, Y) => {
    const x = vert ? Y : X, y = vert ? X : Y;
    const pk = Math.floor(y / PH), yy = y % PH;
    const low = fbm(n1, (x / T) * 3, (y / T) * 8, 3, 8, 3);
    const streak = fbm(n2, (x / T) * 4, (y / T) * 120, 4, 120, 3);
    const ring = Math.sin((y + low * 70 + pk * 23) * 0.42);
    const mott = fbm(n3, (x / T) * 6, (y / T) * 6, 6, 6, 4);
    let v = 0.56 + (streak - 0.5) * 0.42 + tones[pk] + (mott - 0.5) * 0.18;
    if (ring > 0.82) v -= (ring - 0.82) * 0.9;
    // 옹이
    const kx = (joints[pk] * 1.7 + 130) % T, ky = pk * PH + PH * 0.5;
    const dk = Math.hypot((x - kx) * 0.6, (y - ky) * 1.6);
    if (dk < 14) v -= (1 - dk / 14) * 0.28 * (0.6 + 0.4 * Math.sin(dk * 1.4));
    // 닳은 자국 (밝게)
    const sc = n3((x / T) * 40, (y / T) * 14, 40, 14);
    if (sc > 0.78) v += (sc - 0.78) * 0.9;
    // 판 이음 (위 짙은 줄 · 바로 아래 빛 · 아래쪽 그늘)
    if (yy < 2) v -= 0.42; else if (yy < 4) v += 0.1; else if (yy > PH - 7) v -= (yy - (PH - 7)) * 0.025;
    const jx = joints[pk];
    if (Math.abs(x - jx) < 1.5 || Math.abs(x - ((jx + T / 2) % T)) < 1.5) v -= 0.36;
    return ramp(cols, v);
  });
}
wood("tex_wood", [[0, H("#7a4524")], [0.42, H("#b8794a")], [0.7, H("#dca46c")], [1, H("#f5d39e")]], false);
wood("tex_walnut", [[0, H("#3a2016")], [0.45, H("#6c3f28")], [0.75, H("#93603a")], [1, H("#b98552")]], true, 128);
wood("tex_floor", [[0, H("#8a5a3a")], [0.45, H("#c08a5c")], [0.75, H("#e0b182")], [1, H("#f6d8ae")]], false, 42);

// 칠판 (짙은 초록 슬레이트 · 지운 자국 소용돌이 · 분필 먼지)
{
  const W = 900, Hh = 600, n1 = noise(5), n2 = noise(17), n3 = noise(71);
  const arcs = Array.from({ length: 9 }, () => [rnd() * W, rnd() * Hh, 60 + rnd() * 200, rnd() * 0.08 + 0.04]);
  tex("tex_chalk", W, Hh, (x, y) => {
    let v = 0.42 + (fbm(n1, (x / W) * 6, (y / Hh) * 4, 6, 4, 5) - 0.5) * 0.3;
    for (const [cx, cy, R, k] of arcs) {
      const d = Math.abs(Math.hypot(x - cx, y - cy) - R);
      if (d < 40) v += Math.exp(-((d / 16) ** 2)) * k * (0.4 + fbm(n2, (x / W) * 60, (y / Hh) * 40, 60, 40, 2));
    }
    const sw = fbm(n2, (x / W) * 3, (y / Hh) * 22, 3, 22, 3);
    v += (sw - 0.5) * 0.12;
    if (n3(x * 0.9, y * 0.9, 512, 512) > 0.985) v += 0.25;
    const ex = Math.min(x, W - x, y, Hh - y);
    if (ex < 40) v -= (1 - ex / 40) * 0.14;
    return ramp([[0, H("#162a22")], [0.4, H("#24443a")], [0.62, H("#33584a")], [1, H("#7d9c8d")]], v);
  }, 2);
}
// 코르크
{
  const T = 512, n1 = noise(3), n2 = noise(41), n3 = noise(97);
  tex("tex_cork", T, T, (x, y) => {
    const g1 = n1((x / T) * 128, (y / T) * 128, 128, 128), g2 = n2((x / T) * 64, (y / T) * 64, 64, 64);
    let v = 0.55 + (fbm(n3, (x / T) * 6, (y / T) * 6, 6, 6, 3) - 0.5) * 0.18;
    if (g1 > 0.7) v -= (g1 - 0.7) * 1.6;
    if (g2 < 0.22) v += (0.22 - g2) * 1.2;
    v += (n3((x / T) * 256, (y / T) * 256, 256, 256) - 0.5) * 0.14;
    return ramp([[0, H("#6e3f1c")], [0.45, H("#b07440")], [0.7, H("#d39d62")], [1, H("#f0c993")]], v);
  });
}
// 종이 (크림 · 섬유 · 얼룩)
{
  const T = 512, n1 = noise(13), n2 = noise(37), n3 = noise(59);
  tex("tex_paper", T, T, (x, y) => {
    let v = 0.5 + (fbm(n1, (x / T) * 8, (y / T) * 8, 8, 8, 4) - 0.5) * 0.5;
    v += (n2((x / T) * 160, (y / T) * 40, 160, 40) - 0.5) * 0.18 + (n2((x / T) * 40, (y / T) * 160, 40, 160) - 0.5) * 0.18;
    v += (n3((x / T) * 256, (y / T) * 256, 256, 256) - 0.5) * 0.1;
    return ramp([[0, H("#e9dcc0")], [0.5, H("#f8f0de")], [1, H("#fffcf3")]], v);
  });
}
// 낡은 양피지 지도 (가장자리 그을림 · 찻물 얼룩)
{
  const W = 1100, Hh = 600, n1 = noise(23), n2 = noise(61), n3 = noise(83);
  const rings = [[820, 140, 70], [210, 470, 48]];
  tex("tex_parch", W, Hh, (x, y) => {
    let v = 0.62 + (fbm(n1, (x / W) * 7, (y / Hh) * 4, 7, 4, 5) - 0.5) * 0.36;
    v += (n2((x / W) * 200, (y / Hh) * 100, 200, 100) - 0.5) * 0.08;
    const ex = Math.min(x, W - x, y, Hh - y) + (fbm(n3, (x / W) * 14, (y / Hh) * 8, 14, 8, 3) - 0.5) * 50;
    if (ex < 90) v -= ((1 - Math.max(0, ex) / 90) ** 2) * 0.55;
    for (const [cx, cy, R] of rings) { const d = Math.abs(Math.hypot(x - cx, y - cy) - R); if (d < 6) v -= (1 - d / 6) * 0.1; if (Math.hypot(x - cx, y - cy) < R) v -= 0.03; }
    return ramp([[0, H("#8a5a2e")], [0.4, H("#cfa86e")], [0.62, H("#ead3a3")], [1, H("#fbf0d6")]], v);
  });
}
// 회벽 (라벤더 크림 · 흙손 자국)
{
  const T = 512, n1 = noise(19), n2 = noise(43);
  tex("tex_plaster", T, T, (x, y) => {
    let v = 0.55 + (fbm(n1, (x / T) * 5, (y / T) * 5, 5, 5, 5) - 0.5) * 0.4;
    v += (n2((x / T) * 30, (y / T) * 12, 30, 12) - 0.5) * 0.12;
    return ramp([[0, H("#d8c8e4")], [0.5, H("#efe6f4")], [1, H("#fffaff")]], v);
  });
}
// 제도지 (설계도: 푸른 기 크림)
{
  const T = 512, n1 = noise(31), n2 = noise(67);
  tex("tex_draft", T, T, (x, y) => {
    let v = 0.55 + (fbm(n1, (x / T) * 6, (y / T) * 6, 6, 6, 5) - 0.5) * 0.36 + (n2((x / T) * 200, (y / T) * 60, 200, 60) - 0.5) * 0.1;
    return ramp([[0, H("#cfd3ea")], [0.5, H("#eceefa")], [1, H("#fbfbff")]], v);
  });
}
// 오선지 (따뜻한 크림 · 결)
{
  const T = 512, n1 = noise(47), n2 = noise(89);
  tex("tex_score", T, T, (x, y) => {
    let v = 0.55 + (fbm(n1, (x / T) * 6, (y / T) * 6, 6, 6, 4) - 0.5) * 0.34 + (n2((x / T) * 60, (y / T) * 200, 60, 200) - 0.5) * 0.1;
    return ramp([[0, H("#eadbc8")], [0.5, H("#fbf3e6")], [1, H("#fffbf4")]], v);
  });
}

// ================= SVG 부품 =================
// ---------- 인형집 분교 껍데기 (방 셋은 구멍: 위 과학실 · 아래 체육관 · 급식실) ----------
{
  seed = 21;
  const W = 720, Hh = 600;
  const rooms = [[56, 214, 608, 160], [56, 410, 296, 150], [368, 410, 296, 150]];
  const hole = rooms.map(([x, y, w, h]) => `M${x},${y} h${w} v${h} h${-w} Z`).join(" ");
  // 지붕 기와 (물결 줄)
  let tiles = "";
  for (let r = 0; r < 7; r++) {
    const y = 74 + r * 18, half = 30 + r * 50;
    let d = `M${360 - half},${y + 16}`;
    const n = Math.max(2, Math.round((half * 2) / 26));
    for (let i = 0; i < n; i++) { const x0 = 360 - half + (i * half * 2) / n, x1 = 360 - half + ((i + 1) * half * 2) / n; d += ` Q${f((x0 + x1) / 2)},${y + 26} ${f(x1)},${y + 16}`; }
    tiles += `<path d="${d}" fill="none" stroke="${OL}" stroke-opacity=".28" stroke-width="1.6"/>`;
    tiles += `<path d="M${360 - half + 6},${y + 18} L${360 + half - 6},${y + 18}" stroke="#fff" stroke-opacity=".14" stroke-width="3"/>`;
  }
  // 앞벽 돌 결
  let stones = "";
  for (let i = 0; i < 60; i++) { const x = 20 + rnd() * 680, y = 200 + rnd() * 380; if (rooms.some(([rx, ry, rw, rh]) => x > rx - 6 && x < rx + rw + 6 && y > ry - 6 && y < ry + rh + 6)) continue; stones += `<path d="M${f(x)},${f(y)} h${f(10 + rnd() * 18)}" stroke="${OL}" stroke-opacity=".12" stroke-width="1.4" stroke-linecap="round"/>`; }
  // 모서리 돌 (quoin)
  let quoin = "";
  for (let y = 206, i = 0; y < 560; y += 30, i++) for (const x of [26, W - 26 - (i % 2 ? 22 : 30)]) quoin += `<rect x="${x}" y="${y}" width="${i % 2 ? 22 : 30}" height="26" rx="3" fill="url(#qs)" stroke="${OL}" stroke-opacity=".35"/>`;
  // 꽃덤불
  const bush = (cx, cy, s) => { let b = ""; for (let i = 0; i < 9; i++) { const a = (i / 9) * Math.PI, r = 26 * s; b += `<circle cx="${f(cx + Math.cos(a) * r * 1.2 - 0)}" cy="${f(cy - Math.sin(a) * r * 0.7)}" r="${f(15 * s + rnd() * 5 * s)}" fill="url(#leaf)" stroke="${OL}" stroke-width="1.6"/>`; } for (let i = 0; i < 7; i++) { const x = cx + (rnd() - 0.5) * 60 * s, y = cy - rnd() * 22 * s; b += `<g transform="translate(${f(x)},${f(y)})">${[0, 72, 144, 216, 288].map((a) => `<circle cx="${f(Math.cos((a * Math.PI) / 180) * 3.4)}" cy="${f(Math.sin((a * Math.PI) / 180) * 3.4)}" r="3" fill="${["#ffb3d1", "#ffd6e8", "#d9c2ff"][i % 3]}"/>`).join("")}<circle r="1.8" fill="#ffe08a"/></g>`; } return b; };
  save("house.svg", svg(W, Hh + 40, `<defs>${GOLD("g")}
<linearGradient id="roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b2ff"/><stop offset=".55" stop-color="#9c84e6"/><stop offset="1" stop-color="#7a62c8"/></linearGradient>
<linearGradient id="wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset=".6" stop-color="#f6ead6"/><stop offset="1" stop-color="#e6d3b6"/></linearGradient>
<linearGradient id="qs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf7"/><stop offset="1" stop-color="#e2d2b8"/></linearGradient>
<linearGradient id="slab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9c48e"/><stop offset=".5" stop-color="#b47a44"/><stop offset="1" stop-color="#7a4a2a"/></linearGradient>
<linearGradient id="leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6e28a"/><stop offset="1" stop-color="#4f9a52"/></linearGradient>
<linearGradient id="tw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e2cfb2"/></linearGradient>
<radialGradient id="win" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff6d2"/><stop offset=".5" stop-color="#ffd6f0"/><stop offset="1" stop-color="#b39bff"/></radialGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3c4" stop-opacity=".9"/><stop offset="1" stop-color="#fff3c4" stop-opacity="0"/></radialGradient>
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#2a1a50" flood-opacity=".35"/></filter></defs>
<g filter="url(#sh)" transform="translate(0,40)">
<!-- 종탑 -->
<rect x="318" y="22" width="84" height="74" rx="6" fill="url(#tw)" stroke="${OL}" stroke-width="3"/>
<path d="M336,96 V54 A24,24 0 0 1 384,54 V96 Z" fill="#3a2d5c" stroke="${OL}" stroke-width="2.4"/>
<circle cx="360" cy="56" r="30" fill="url(#glow)"/>
<path d="M346,80 C346,62 352,52 360,52 C368,52 374,62 374,80 L378,86 H342 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<circle cx="360" cy="89" r="4" fill="url(#g)" stroke="${OL}" stroke-width="1.6"/>
<path d="M350,62 C351,58 354,55 357,55" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
<path d="M306,26 L360,-6 L414,26 Z" fill="url(#roof)" stroke="${OL}" stroke-width="3" stroke-linejoin="round" transform="translate(0,4)"/>
<path d="M360,-2 V-30" stroke="${OL}" stroke-width="2.6"/>
<path d="M361,-30 C374,-34 384,-24 398,-28 L390,-19 L398,-10 C384,-6 374,-16 361,-12 Z" fill="#ff9fbf" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<!-- 지붕 -->
<path d="M8,214 L360,62 L712,214 Z" fill="url(#roof)" stroke="${OL}" stroke-width="3.4" stroke-linejoin="round"/>
<g clip-path="url(#rc)">${tiles}</g><clipPath id="rc"><path d="M8,214 L360,62 L712,214 Z"/></clipPath>
<path d="M30,206 L360,66" stroke="#fff" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"/>
<path d="M4,216 L360,58 L716,216" fill="none" stroke="url(#g)" stroke-width="3.2" stroke-linejoin="round"/>
<!-- 다락 둥근 창 -->
<circle cx="360" cy="150" r="30" fill="url(#win)" stroke="${OL}" stroke-width="3"/>
<path d="M360,120 V180 M330,150 H390" stroke="${OL}" stroke-width="2.2"/>
<circle cx="360" cy="150" r="34" fill="none" stroke="url(#g)" stroke-width="2.4"/>
<path d="M342,134 A22,22 0 0 1 356,126" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- 몸체 (방 구멍) -->
<path d="M20,206 H700 V578 H20 Z ${hole}" fill="url(#wall)" fill-rule="evenodd" stroke="${OL}" stroke-width="3.2"/>
${stones}${quoin}
<!-- 층 바닥 (단면) -->
<rect x="44" y="374" width="632" height="36" fill="url(#slab)" stroke="${OL}" stroke-width="2.4"/>
<path d="M44,380 H676" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>
${Array.from({ length: 20 }, (_, i) => `<path d="M${54 + i * 32},386 l14,18" stroke="${OL}" stroke-opacity=".22" stroke-width="1.4"/>`).join("")}
<rect x="352" y="410" width="16" height="150" fill="url(#tw)" stroke="${OL}" stroke-width="2.2"/>
<rect x="36" y="560" width="648" height="22" rx="4" fill="url(#slab)" stroke="${OL}" stroke-width="2.6"/>
<path d="M40,565 H680" stroke="#fff" stroke-opacity=".4" stroke-width="2"/>
<!-- 처마 금 실선 · 방 테 -->
${rooms.map(([x, y, w, h]) => `<rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="3" fill="none" stroke="${OL}" stroke-width="2.6"/><rect x="${x - 7}" y="${y - 7}" width="${w + 14}" height="${h + 14}" rx="5" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.4"/>`).join("")}
<path d="M24,210 H696" stroke="url(#g)" stroke-width="2.2"/>
<!-- 꽃덤불 · 계단 -->
${bush(46, 586, 1.1)}${bush(676, 586, 1.1)}
<path d="M300,582 h120 l8,10 h-136 Z" fill="#efe2cc" stroke="${OL}" stroke-width="2"/>
</g>`));
}

// ---------- 금 종 + 짧은 리본 ----------
save("bell.svg", svg(140, 150, `<defs>${GOLD("g")}<linearGradient id="rb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7c6ff"/><stop offset="1" stop-color="#8b74e8"/></linearGradient>
<radialGradient id="in" cx=".5" cy=".2" r=".7"><stop offset="0" stop-color="#7a4a10"/><stop offset="1" stop-color="#3a2008"/></radialGradient></defs>
<path d="M70,36 C38,36 30,66 30,92 C30,104 22,110 14,116 H126 C118,110 110,104 110,92 C110,66 102,36 70,36 Z" fill="url(#g)" stroke="${OL}" stroke-width="3.2" stroke-linejoin="round"/>
<ellipse cx="70" cy="116" rx="56" ry="9" fill="url(#in)" stroke="${OL}" stroke-width="2.6"/>
<circle cx="70" cy="126" r="9" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/>
<path d="M44,92 C44,66 52,50 66,46" stroke="#fff" stroke-width="5" stroke-opacity=".8" fill="none" stroke-linecap="round"/>
<path d="M26,104 H114" stroke="${OL}" stroke-opacity=".3" stroke-width="2"/>
<path d="M70,38 C56,22 34,20 30,30 C26,40 48,42 70,38 Z M70,38 C84,22 106,20 110,30 C114,40 92,42 70,38 Z" fill="url(#rb)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M66,38 L52,64 L58,60 L60,68 L70,42 Z M74,38 L88,64 L82,60 L80,68 L70,42 Z" fill="#a993f0" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<circle cx="70" cy="37" r="7" fill="#c9b8ff" stroke="${OL}" stroke-width="2.2"/>
<polygon points="${pts(star4(116, 52, 9, 0.25))}" fill="#fff"/>`));

// ---------- 압정 · 자석 · 마스킹 테이프 (지그재그 끝) ----------
const pin = (name, c) => save(name, svg(40, 46, `<defs><radialGradient id="p" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${shade(c, 0.3)}"/><stop offset="1" stop-color="${shade(c, -0.4)}"/></radialGradient></defs>
<ellipse cx="22" cy="40" rx="10" ry="4" fill="#2a1a10" opacity=".25"/>
<path d="M20,26 L22,42" stroke="#9aa0b4" stroke-width="2.4" stroke-linecap="round"/>
<path d="M8,18 C8,8 32,8 32,18 C32,24 26,28 20,28 C14,28 8,24 8,18 Z" fill="url(#p)" stroke="${OL}" stroke-width="2"/>
<ellipse cx="20" cy="12" rx="9" ry="6" fill="url(#p)" stroke="${OL}" stroke-width="1.8"/>
<path d="M14,10 C16,8 19,7 22,8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`));
pin("pin_rose.svg", "#ff7fae"); pin("pin_lav.svg", "#9a7bff"); pin("pin_mint.svg", "#4fcfa8"); pin("pin_gold.svg", "#f2b632");
const magnet = (name, c) => save(name, svg(44, 44, `<defs><radialGradient id="m" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="${shade(c, 0.25)}"/><stop offset="1" stop-color="${shade(c, -0.35)}"/></radialGradient></defs>
<circle cx="23" cy="25" r="17" fill="#000" opacity=".25"/><circle cx="22" cy="22" r="17" fill="url(#m)" stroke="${OL}" stroke-width="2.2"/>
<path d="M12,16 C14,11 18,9 23,9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>`));
magnet("mag_rose.svg", "#ff8fb8"); magnet("mag_sky.svg", "#6fc3ff"); magnet("mag_lemon.svg", "#ffd65a"); magnet("mag_mint.svg", "#5fd8a8"); magnet("mag_lav.svg", "#a98bff");
const tape = (name, c, stripe) => { let z = "M0,4"; for (let y = 4; y <= 30; y += 4.5) z += ` L${y % 9 < 4.5 ? 0 : 4},${y}`; let z2 = ""; for (let y = 30; y >= 4; y -= 4.5) z2 += ` L${y % 9 < 4.5 ? 120 : 116},${y}`; save(name, svg(120, 34, `<path d="${z} L120,4 ${z2} Z" fill="${c}" opacity=".88"/>${stripe ? Array.from({ length: 9 }, (_, i) => `<path d="M${8 + i * 13},4 l-6,26" stroke="#fff" stroke-opacity=".45" stroke-width="4"/>`).join("") : ""}<path d="M4,7 H116" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`)); };
tape("tape_lav.svg", "#cbb8ff", true); tape("tape_rose.svg", "#ffc0d6", false); tape("tape_mint.svg", "#b8ecd6", true);

// ---------- 분필 낙서 (거친 결 필터) ----------
const CHALK = `<filter id="ch" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="3" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -2.2 1.7" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="c"/><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="8" result="w"/><feDisplacementMap in="c" in2="w" scale="3"/></filter>`;
save("chalk_star.svg", svg(60, 60, `<defs>${CHALK}</defs><g filter="url(#ch)"><polygon points="${pts([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => P(30, 32, i % 2 ? 11 : 25, -90 + i * 36)))}" fill="none" stroke="#fff6d2" stroke-width="3.4" stroke-linejoin="round"/></g>`));
save("chalk_line.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="20" viewBox="0 0 400 20" preserveAspectRatio="none"><defs>${CHALK}</defs><g filter="url(#ch)"><path d="M4,12 C80,6 160,15 240,9 S360,12 396,8" stroke="#ffffff" stroke-width="3.4" fill="none" stroke-linecap="round"/></g></svg>`);
save("chalk_circle.svg", svg(120, 70, `<defs>${CHALK}</defs><g filter="url(#ch)"><path d="M18,40 C14,14 104,8 108,34 C112,58 30,66 14,44 C10,36 22,26 34,22" stroke="#ffd6e8" stroke-width="3.2" fill="none" stroke-linecap="round"/></g>`));
save("chalk_arrow.svg", svg(120, 60, `<defs>${CHALK}</defs><g filter="url(#ch)"><path d="M8,44 C40,40 70,30 104,14 M88,10 L106,13 L98,30" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`));
save("chalk_whale.svg", svg(160, 90, `<defs>${CHALK}</defs><g filter="url(#ch)" fill="none" stroke="#cfe6ff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18,52 C20,30 60,22 96,28 C126,33 146,44 148,54 C140,70 100,76 64,72 C40,70 24,64 18,52 Z"/><path d="M18,52 C10,44 6,36 10,28 C16,36 22,40 26,44 M10,28 C4,26 2,20 6,16"/><circle cx="128" cy="48" r="2.4" fill="#cfe6ff"/><path d="M110,24 C112,14 108,8 104,6 M112,22 C118,14 124,12 128,12"/><path d="M60,72 C62,80 70,84 76,82"/></g>`));
// 분필 (조각)
const chalkPiece = (name, c) => save(name, svg(70, 20, `<defs><linearGradient id="c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -0.2)}"/></linearGradient></defs><path d="M6,4 H58 C64,4 66,8 66,10 C66,12 64,16 58,16 H6 C4,16 3,13 4,10 C3,7 4,4 6,4 Z" fill="url(#c)" stroke="${OL}" stroke-width="1.6"/><path d="M8,7 H56" stroke="#fff" stroke-width="1.6" opacity=".8"/>`));
chalkPiece("chalk_w.svg", "#f6f2ea"); chalkPiece("chalk_p.svg", "#ffc4dc"); chalkPiece("chalk_y.svg", "#ffe596");
// 칠판 지우개
save("eraser.svg", svg(110, 36, `<defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8c6ff"/><stop offset="1" stop-color="#8b74e8"/></linearGradient></defs><rect x="4" y="4" width="102" height="18" rx="5" fill="url(#f)" stroke="${OL}" stroke-width="2"/><rect x="6" y="20" width="98" height="12" rx="3" fill="#f3efe8" stroke="${OL}" stroke-width="1.8"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${12 + i * 8},22 v8" stroke="#cfc6b6" stroke-width="1.4"/>`).join("")}<path d="M10,8 H96" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`));

// ---------- 지도 깃발 핀 (제비꼬리) · 나침반 ----------
const flag = (name, c) => save(name, svg(70, 90, `<defs>${GOLD("g", 0, 1)}<linearGradient id="c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(c, 0.35)}"/><stop offset=".6" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -0.2)}"/></linearGradient></defs>
<ellipse cx="12" cy="85" rx="10" ry="3.5" fill="#3a2a10" opacity=".3"/>
<rect x="9" y="8" width="5" height="78" rx="2.5" fill="url(#g)" stroke="${OL}" stroke-width="1.6"/><circle cx="11.5" cy="7" r="5.5" fill="url(#g)" stroke="${OL}" stroke-width="1.6"/>
<path d="M14,14 C32,8 48,20 66,14 L56,30 L66,46 C48,52 32,40 14,46 Z" fill="url(#c)" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<path d="M18,20 C32,16 46,24 58,20" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none" stroke-linecap="round"/>`));
flag("flag_lab.svg", "#6f9bff"); flag("flag_gym.svg", "#ff9a5c"); flag("flag_cafe.svg", "#3fcfb8"); flag("flag_board.svg", "#a98bff");
{
  let ticks = "";
  for (let i = 0; i < 32; i++) { const a = i * 11.25; const p0 = P(80, 80, 66, a), p1 = P(80, 80, i % 4 ? 61 : 56, a); ticks += `<path d="M${pts([p0])} L${pts([p1])}" stroke="#6a4a2a" stroke-width="${i % 4 ? 1 : 1.8}"/>`; }
  const pt = (a, r1, r2, c) => `<polygon points="${pts([P(80, 80, r1, a), P(80, 80, r2, a + 90), [80, 80], P(80, 80, r2, a - 90)])}" fill="${c}" stroke="#6a4a2a" stroke-width="1.2"/>`;
  save("compass.svg", svg(160, 160, `<circle cx="80" cy="80" r="70" fill="none" stroke="#6a4a2a" stroke-width="2"/><circle cx="80" cy="80" r="66" fill="none" stroke="#6a4a2a" stroke-width="1"/>${ticks}
${[45, 135, 225, 315].map((a) => pt(a, 38, 7, "#e8cfa0")).join("")}${[0, 90, 180, 270].map((a) => pt(a - 90, 58, 10, a === 0 ? "#c86a8a" : "#f4e4c4")).join("")}
<circle cx="80" cy="80" r="5" fill="#f4e4c4" stroke="#6a4a2a" stroke-width="1.4"/><text x="80" y="10" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="700" fill="#6a4a2a">N</text>`));
}

// ---------- 계기판 (도크 B): 라벤더 법랑 테 + 가는 금 테 + 크림 유리 판 + 눈금 · 색 띠 ----------
const gauge = (name, c, label) => {
  let tk = "";
  for (let i = 0; i <= 40; i++) { const a = 135 + i * 6.75; const p0 = P(150, 150, 104, a), p1 = P(150, 150, i % 5 ? 96 : 88, a); tk += `<path d="M${pts([p0])} L${pts([p1])}" stroke="${OL}" stroke-opacity="${i % 5 ? 0.45 : 0.8}" stroke-width="${i % 5 ? 1.4 : 2.6}" stroke-linecap="round"/>`; }
  const arc = (r, a0, a1) => { const s = P(150, 150, r, a0), e = P(150, 150, r, a1); return `M${pts([s])} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${pts([e])}`; };
  let bolts = ""; for (let i = 0; i < 8; i++) { const p = P(150, 150, 132, i * 45 + 22.5); bolts += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="4.4" fill="url(#g)" stroke="${OL}" stroke-width="1.4"/>`; }
  save(name, svg(300, 300, `<defs>${GOLD("g")}
<linearGradient id="en" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4eeff"/><stop offset=".45" stop-color="#c9b8f4"/><stop offset="1" stop-color="#8a72d0"/></linearGradient>
<radialGradient id="face" cx=".45" cy=".38" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#fbf5ea"/><stop offset="1" stop-color="#e6dccb"/></radialGradient>
<linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/></linearGradient>
<filter id="s"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#1e1636" flood-opacity=".4"/></filter></defs>
<g filter="url(#s)"><circle cx="150" cy="150" r="146" fill="url(#g)" stroke="${OL}" stroke-width="3"/>
<circle cx="150" cy="150" r="141" fill="url(#en)" stroke="${OL}" stroke-width="1.6"/></g>
${bolts}
<circle cx="150" cy="150" r="120" fill="url(#face)" stroke="${OL}" stroke-width="2.6"/>
<circle cx="150" cy="150" r="124" fill="none" stroke="url(#g)" stroke-width="2.2"/>
<path d="${arc(100, 135, 405)}" stroke="#e8e0f2" stroke-width="12" fill="none" stroke-linecap="round"/>
<path d="${arc(100, 315, 405)}" stroke="${c}" stroke-opacity=".9" stroke-width="12" fill="none" stroke-linecap="round"/>
${tk}
<text x="150" y="214" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="15" fill="${OL}" fill-opacity=".55">${label}</text>
<circle cx="150" cy="150" r="120" fill="url(#gl)"/>`));
};
gauge("gauge_shield.svg", "#3fbfd8", "aegis"); gauge("gauge_heart.svg", "#ff5f7e", "cor");
save("needle.svg", svg(40, 240, `<defs>${GOLD("g", 1, 0)}</defs><path d="M20,10 L26,120 L20,134 L14,120 Z" fill="#4a2b45"/><path d="M20,12 L23,118 L20,126 Z" fill="#fff" opacity=".35"/><circle cx="20" cy="120" r="14" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/><circle cx="20" cy="120" r="5" fill="#fff6d2" stroke="${OL}" stroke-width="1.4"/>`));

// ---------- 하트 보석 (심장) ----------
save("heart.svg", svg(220, 200, `<defs>
<linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd6e2"/><stop offset=".45" stop-color="#ff6f92"/><stop offset="1" stop-color="#b8264e"/></linearGradient>
<linearGradient id="b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb3c7"/><stop offset="1" stop-color="#e0385f"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc2d4" stop-opacity=".95"/><stop offset=".6" stop-color="#ff7fa0" stop-opacity=".35"/><stop offset="1" stop-color="#ff7fa0" stop-opacity="0"/></radialGradient></defs>
<circle cx="110" cy="102" r="98" fill="url(#glow)"/>
<path d="M110,176 C60,140 26,112 26,74 C26,46 46,30 70,30 C88,30 102,40 110,54 C118,40 132,30 150,30 C174,30 194,46 194,74 C194,112 160,140 110,176 Z" fill="url(#a)" stroke="${OL}" stroke-width="3.6" stroke-linejoin="round"/>
<path d="M110,54 L84,96 L110,176 L136,96 Z" fill="url(#b)" opacity=".7"/>
<path d="M26,74 L84,96 L110,54 M194,74 L136,96 L110,54 M84,96 H136" stroke="${OL}" stroke-opacity=".35" stroke-width="1.6" fill="none"/>
<path d="M44,62 C48,46 60,40 72,40" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>
<polygon points="${pts(star4(160, 50, 14, 0.22))}" fill="#fff"/>`));

// ---------- 보호막 돔 (육각 결 비눗방울) ----------
{
  let hexes = "";
  const R = 15;
  for (let r = -10; r <= 10; r++) for (let c = -16; c <= 16; c++) { const x = 300 + c * R * 1.75 + (r % 2 ? R * 0.875 : 0), y = 170 + r * R * 1.52; hexes += `<polygon points="${pts([0, 1, 2, 3, 4, 5].map((i) => P(x, y, R * 0.98, i * 60 + 30)))}" />`; }
  save("dome.svg", svg(600, 340, `<defs><radialGradient id="d" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#bff4ff" stop-opacity="0"/><stop offset=".78" stop-color="#9be8ff" stop-opacity=".18"/><stop offset=".96" stop-color="#e8fbff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<clipPath id="e"><ellipse cx="300" cy="170" rx="292" ry="162"/></clipPath><radialGradient id="m" cx=".5" cy=".5" r=".5"><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></radialGradient>
<mask id="mk"><ellipse cx="300" cy="170" rx="292" ry="162" fill="url(#m)"/></mask></defs>
<ellipse cx="300" cy="170" rx="292" ry="162" fill="url(#d)"/>
<g clip-path="url(#e)" mask="url(#mk)" fill="none" stroke="#e8fbff" stroke-width="1.6" stroke-opacity=".9">${hexes}</g>
<ellipse cx="300" cy="170" rx="292" ry="162" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="2.4"/>
<path d="M60,110 C110,40 220,14 300,12" stroke="#fff" stroke-width="7" stroke-opacity=".7" fill="none" stroke-linecap="round"/>
<polygon points="${pts(star4(470, 60, 14, 0.22))}" fill="#fff"/>`));
}

// ---------- 도크: 등불 · 계류 말뚝(낮은 버섯형) · 깃발 줄 · 구름 방석 ----------
save("lantern.svg", svg(60, 110, `<defs>${GOLD("g")}<radialGradient id="l" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff8d8"/><stop offset=".6" stop-color="#ffd36b"/><stop offset="1" stop-color="#e09a2a"/></radialGradient><radialGradient id="h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2b8" stop-opacity=".8"/><stop offset="1" stop-color="#fff2b8" stop-opacity="0"/></radialGradient></defs>
<circle cx="30" cy="62" r="30" fill="url(#h)"/>
<path d="M30,0 V22" stroke="${OL}" stroke-width="2"/><circle cx="30" cy="22" r="5" fill="none" stroke="url(#g)" stroke-width="2.4"/>
<path d="M14,34 L30,26 L46,34 Z" fill="url(#g)" stroke="${OL}" stroke-width="2"/>
<rect x="15" y="34" width="30" height="44" rx="5" fill="url(#l)" stroke="${OL}" stroke-width="2.4"/>
<path d="M30,34 V78 M15,56 H45" stroke="${OL}" stroke-opacity=".5" stroke-width="1.6"/>
<path d="M12,80 H48 L42,88 H18 Z" fill="url(#g)" stroke="${OL}" stroke-width="2"/>
<path d="M20,40 V70" stroke="#fff" stroke-width="2.4" opacity=".7" stroke-linecap="round"/>`));
save("bollard.svg", svg(70, 60, `<defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a8a"/><stop offset=".35" stop-color="#b9a2ea"/><stop offset="1" stop-color="#4a3470"/></linearGradient>${GOLD("g", 1, 0)}</defs>
<ellipse cx="35" cy="54" rx="26" ry="6" fill="#1e1636" opacity=".3"/>
<path d="M18,22 H52 V50 C52,56 18,56 18,50 Z" fill="url(#b)" stroke="${OL}" stroke-width="2.4"/>
<ellipse cx="35" cy="20" rx="24" ry="9" fill="url(#b)" stroke="${OL}" stroke-width="2.4"/>
<ellipse cx="35" cy="18" rx="16" ry="5" fill="#d8ccf6" opacity=".7"/>
<path d="M18,34 C26,40 44,40 52,34" stroke="url(#g)" stroke-width="3" fill="none"/>`));
{
  let fl = "", d = "M0,10";
  const cols = ["#ff9fbf", "#ffd36b", "#8fe0c8", "#8fc8ff", "#c6b2f4"];
  for (let x = 0; x <= 1200; x += 60) d += ` Q${x + 30},${x % 120 ? 22 : 30} ${x + 60},10`;
  for (let i = 0; i < 20; i++) { const x = 18 + i * 60, y = 18 + Math.sin(i * 0.9) * 2; fl += `<path d="M${x},${y} H${x + 26} L${x + 13},${y + 30} Z" fill="${cols[i % 5]}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/><path d="M${x + 4},${y + 4} H${x + 20}" stroke="#fff" stroke-opacity=".6" stroke-width="1.6"/>`; }
  save("bunting.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="60" viewBox="0 0 1200 60">${fl}<path d="${d}" stroke="${OL}" stroke-width="2" fill="none"/></svg>`);
}
save("cushion.svg", svg(240, 90, `<defs><radialGradient id="c" cx=".45" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eee6ff"/><stop offset="1" stop-color="#bfaee8"/></radialGradient></defs>
<path d="M20,58 C4,58 6,36 26,36 C26,18 52,14 66,26 C76,8 108,6 120,22 C134,6 168,8 176,26 C192,14 218,20 214,38 C236,38 236,60 218,62 C190,80 50,82 20,58 Z" fill="url(#c)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M40,40 C60,30 90,30 110,34" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9"/>`));

// ---------- 고래 꼬리 음자리표 (오선 악보 C) ----------
save("clef.svg", svg(90, 200, `<defs><linearGradient id="c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a2ff"/><stop offset="1" stop-color="#5b44c8"/></linearGradient>${GOLD("g")}</defs>
<path d="M46,190 C34,190 30,180 36,172 C42,166 52,170 50,178 M46,186 C52,150 54,110 52,70 C50,40 46,22 52,10 C62,22 66,44 60,62 C52,84 26,96 22,124 C18,150 40,166 60,160 C80,154 80,128 62,122 C44,116 32,132 42,146" fill="none" stroke="url(#c)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M52,10 C44,0 30,2 26,10 C36,10 44,14 52,18 C60,14 68,10 78,10 C74,2 60,0 52,10 Z" fill="url(#c)" stroke="${OL}" stroke-width="2"/>
<polygon points="${pts(star4(74, 34, 9, 0.24))}" fill="url(#g)"/>`));

// ---------- 제비꼬리 이름 띠 (끝이 뾰족하게 갈라짐) ----------
const banner = (name, c1, c2) => save(name, `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="72" viewBox="0 0 420 72" preserveAspectRatio="none"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(c2, -0.2)}"/><stop offset="1" stop-color="${shade(c2, -0.45)}"/></linearGradient></defs>
<path d="M2,22 H52 V62 H2 L18,42 Z" fill="url(#d)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M418,22 H368 V62 H418 L402,42 Z" fill="url(#d)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M36,8 C140,2 280,2 384,8 V52 C280,46 140,46 36,52 Z" fill="url(#b)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M44,15 C140,9 280,9 376,15" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/>
<path d="M44,45 C140,39 280,39 376,45" stroke="#ffe7a6" stroke-opacity=".9" stroke-width="1.4" fill="none" vector-effect="non-scaling-stroke"/></svg>`);
banner("ban_green.svg", "#5fae84", "#2f7350"); banner("ban_lav.svg", "#b39bff", "#6b55d8"); banner("ban_rose.svg", "#ffa3c2", "#d0457e"); banner("ban_sky.svg", "#9fd8ff", "#4f8fd8");

// ---------- 둥근 도장 테 (완성!) ----------
save("stamp.svg", svg(150, 150, `<defs><filter id="r"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.6 1.4"/><feComposite in="SourceGraphic" operator="in"/></filter></defs>
<g filter="url(#r)" fill="none" stroke="#d0457e" transform="rotate(-12 75 75)"><circle cx="75" cy="75" r="66" stroke-width="5"/><circle cx="75" cy="75" r="56" stroke-width="2"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<polygon points="${pts(star4(...P(75, 75, 61, i * 45 - 90), 4, 0.3))}" fill="#d0457e" stroke="none"/>`).join("")}</g>`));

// ---------- 가는 실선 장식 모서리 (판 모서리 금 실선) ----------
save("corner.svg", svg(60, 60, `<defs>${GOLD("g")}</defs><path d="M4,56 V18 C4,10 10,4 18,4 H56" fill="none" stroke="url(#g)" stroke-width="2"/><path d="M12,56 V22 C12,16 16,12 22,12 H56" fill="none" stroke="url(#g)" stroke-width="1" opacity=".7"/><polygon points="${pts(star4(12, 12, 7, 0.28))}" fill="url(#g)" stroke="${OL}" stroke-width=".8"/>`));

rmSync(tmp, { recursive: true, force: true });
console.log("ok");
