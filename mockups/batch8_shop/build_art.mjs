// 묶음 8 「상점 · 교환」 시안 부품 — 그림 결(값 잡음 PNG → JPG) + 게임 결 SVG(짙은 자두색 외곽선 · 여러 단 그라데이션 · 윗빛 · 아랫그늘).
// batch6_school/build_art.mjs와 같은 결. 시안 전용이라 batch8_shop/a/s/ 에만 쓴다 (게임 assets/는 건드리지 않음).
//   node design/mockups/feedback70/batch8_shop/build_art.mjs
import { writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { tmpdir } from "node:os";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "a/s");
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "b8art-"));
const OL = "#4a2b45";
const f = (n) => Math.round(n * 100) / 100;
const svg = (w, h, body, extra = "") => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"${extra}>\n${body}\n</svg>\n`;
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
const SH = (id, dy = 6, sd = 6, op = 0.35) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${sd}" flood-color="#2a1636" flood-opacity="${op}"/></filter>`;

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

// 나무 판 (판자마다 톤 · 결 · 옹이 · 닳은 자국)
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
    const kx = (joints[pk] * 1.7 + 130) % T, ky = pk * PH + PH * 0.5;
    const dk = Math.hypot((x - kx) * 0.6, (y - ky) * 1.6);
    if (dk < 14) v -= (1 - dk / 14) * 0.28 * (0.6 + 0.4 * Math.sin(dk * 1.4));
    const sc = n3((x / T) * 40, (y / T) * 14, 40, 14);
    if (sc > 0.78) v += (sc - 0.78) * 0.9;
    if (yy < 2) v -= 0.42; else if (yy < 4) v += 0.1; else if (yy > PH - 7) v -= (yy - (PH - 7)) * 0.025;
    const jx = joints[pk];
    if (Math.abs(x - jx) < 1.5 || Math.abs(x - ((jx + T / 2) % T)) < 1.5) v -= 0.36;
    return ramp(cols, v);
  });
}
// 화방 선반 = 꿀빛 단풍나무, 계산대 = 호두나무, 진열장 바닥 = 크림 칠 나무
wood("tex_maple", [[0, H("#8a5230")], [0.42, H("#c98d58")], [0.7, H("#e8b77e")], [1, H("#fbe1b4")]], false, 128);
wood("tex_walnut", [[0, H("#3a2016")], [0.45, H("#6c3f28")], [0.75, H("#93603a")], [1, H("#b98552")]], false, 96);
wood("tex_floor", [[0, H("#8a5a3a")], [0.45, H("#c08a5c")], [0.75, H("#e0b182")], [1, H("#f6d8ae")]], false, 42);

// 벨벳 (결 방향 광택 · 눌린 자국) — kind: 자두(머리줄) · 밤하늘 남색(보석 쟁반) · 장미
function velvet(name, cols, sd) {
  const T = 512, n1 = noise(sd), n2 = noise(sd + 6), n3 = noise(sd + 13);
  tex(name, T, T, (x, y) => {
    let v = 0.5 + (fbm(n1, (x / T) * 4, (y / T) * 4, 4, 4, 5) - 0.5) * 0.55;
    v += (fbm(n2, (x / T) * 2, (y / T) * 14, 2, 14, 3) - 0.5) * 0.3;
    v += (n3((x / T) * 256, (y / T) * 256, 256, 256) - 0.5) * 0.16;
    return ramp(cols, v);
  });
}
velvet("tex_vel_plum", [[0, H("#2a0f22")], [0.45, H("#5a2346")], [0.75, H("#7e3a63")], [1, H("#b0668e")]], 101);
velvet("tex_vel_navy", [[0, H("#0f0d2e")], [0.45, H("#26205a")], [0.75, H("#3c3384")], [1, H("#6c60b8")]], 131);
velvet("tex_vel_rose", [[0, H("#7a2848")], [0.45, H("#b4486e")], [0.75, H("#d7708f")], [1, H("#f2a6bd")]], 151);
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
// 아마천 (라벤더 크림 · 씨실 날실)
{
  const T = 512, n1 = noise(71), n2 = noise(73);
  tex("tex_linen", T, T, (x, y) => {
    const wx = Math.sin(x * 1.5708) * 0.5 + 0.5, wy = Math.sin(y * 1.5708) * 0.5 + 0.5;
    let v = 0.55 + (fbm(n1, (x / T) * 6, (y / T) * 6, 6, 6, 4) - 0.5) * 0.3;
    v += ((x + y) % 4 < 2 ? wx : wy) * 0.1 - 0.05;
    v += (n2((x / T) * 128, (y / T) * 4, 128, 4) - 0.5) * 0.12 + (n2((x / T) * 4, (y / T) * 128, 4, 128) - 0.5) * 0.12;
    return ramp([[0, H("#d9cdea")], [0.5, H("#efe8f6")], [1, H("#fffaff")]], v);
  });
}
// 크림 대리석 (보석상 계산대 위)
{
  const T = 512, n1 = noise(83), n2 = noise(89);
  tex("tex_marble", T, T, (x, y) => {
    const w = fbm(n1, (x / T) * 3, (y / T) * 3, 3, 3, 5);
    const vein = Math.abs(Math.sin((x / T) * 9 + (y / T) * 4 + w * 9));
    let v = 0.72 + (fbm(n2, (x / T) * 8, (y / T) * 8, 8, 8, 4) - 0.5) * 0.2;
    if (vein < 0.06) v -= (0.06 - vein) * 4.2;
    return ramp([[0, H("#b9a3c4")], [0.5, H("#efe6ef")], [1, H("#fffcf8")]], v);
  });
}
// 벽지 (분홍 크림 줄무늬 + 은은한 꽃 무늬 · 흙손 얼룩) — 화방 뒷벽
{
  const T = 512, n1 = noise(19), n2 = noise(43);
  tex("tex_wall", T, T, (x, y) => {
    let v = 0.6 + (fbm(n1, (x / T) * 5, (y / T) * 5, 5, 5, 5) - 0.5) * 0.26;
    const sx = x % 64;
    if (sx < 22) v -= 0.06; else if (sx < 24) v += 0.05;
    const cx = (Math.floor(x / 64) * 64 + 43), cy = ((Math.floor(x / 64) % 2 ? 32 : 96) + Math.floor(y / 128) * 128);
    const dd = Math.hypot(x - cx, (y % 128) - (cy % 128));
    if (dd < 7) v -= (1 - dd / 7) * 0.08 * (0.6 + 0.4 * Math.cos(Math.atan2(y - cy, x - cx) * 5));
    v += (n2((x / T) * 200, (y / T) * 60, 200, 60) - 0.5) * 0.05;
    return ramp([[0, H("#e3c6d6")], [0.5, H("#f6e6ee")], [1, H("#fff8fb")]], v);
  });
}
// 밤하늘 양피지 (별자리 지도: 짙은 남색 · 은하수 · 가장자리 그을림)
{
  const W = 1200, Hh = 600, n1 = noise(23), n2 = noise(61), n3 = noise(97);
  tex("tex_night", W, Hh, (x, y) => {
    let v = 0.36 + (fbm(n1, (x / W) * 7, (y / Hh) * 4, 7, 4, 5) - 0.5) * 0.3;
    const band = Math.exp(-(((y / Hh) - 0.62 + (x / W) * 0.36 - 0.2) ** 2) / 0.02);
    v += band * 0.22 * fbm(n2, (x / W) * 12, (y / Hh) * 6, 12, 6, 4);
    if (n3(x * 0.7, y * 0.7, 512, 512) > 0.982) v += 0.5;
    const ex = Math.min(x, W - x, y, Hh - y);
    if (ex < 80) v -= ((1 - ex / 80) ** 2) * 0.3;
    return ramp([[0, H("#0d0b26")], [0.35, H("#1f1b52")], [0.55, H("#3a3080")], [0.75, H("#7b6cc4")], [1, H("#fff4d6")]], v);
  }, 2);
}

// ================= SVG 부품 =================
// ---------- 유리 병 (소환 결과의 별가루 병 · 신화 조각 병과 같은 꼴: 둥근 네모 몸 + 짧은 목 + 뚜껑) ----------
// 병은 세 겹: 뒤 유리(jar_back) → HTML 속 내용(별가루 · 무지개 물감 · 채색석) → 앞 유리(jar_front_<뚜껑>). 속 모양 = jar_mask
const JAR_IN = "M26,74 C26,64 32,60 42,60 H158 C168,60 174,64 174,74 V214 C174,236 160,248 138,248 H62 C40,248 26,236 26,214 Z";
save("jar_mask.svg", svg(200, 260, `<path d="${JAR_IN}" fill="#fff"/>`));
save("jar_back.svg", svg(200, 260, `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfd8ff" stop-opacity=".55"/><stop offset=".5" stop-color="#f2efff" stop-opacity=".2"/><stop offset="1" stop-color="#b9b0ea" stop-opacity=".55"/></linearGradient></defs>
<ellipse cx="100" cy="252" rx="86" ry="8" fill="#1b0f2c" opacity=".35"/>
<path d="M20,72 C20,58 28,52 42,52 H158 C172,52 180,58 180,72 V214 C180,240 164,254 138,254 H62 C36,254 20,240 20,214 Z" fill="url(#g)"/>`));
const jarFront = (name, lidA, lidB, band) => save(name, svg(200, 260, `<defs>
<linearGradient id="lid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(lidA, 0.55)}"/><stop offset=".35" stop-color="${lidA}"/><stop offset=".8" stop-color="${lidB}"/><stop offset="1" stop-color="${shade(lidB, -0.25)}"/></linearGradient>
<linearGradient id="edge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".12" stop-color="#fff" stop-opacity=".15"/><stop offset=".85" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>
<linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<path d="M20,72 C20,58 28,52 42,52 H158 C172,52 180,58 180,72 V214 C180,240 164,254 138,254 H62 C36,254 20,240 20,214 Z" fill="none" stroke="#5a4a86" stroke-opacity=".7" stroke-width="2.6"/>
<path d="M20,72 C20,58 28,52 42,52 H158 C172,52 180,58 180,72 V214 C180,240 164,254 138,254 H62 C36,254 20,240 20,214 Z" fill="none" stroke="url(#edge)" stroke-width="7"/>
<path d="M36,84 C36,74 40,70 46,70 V226 C40,222 36,214 36,204 Z" fill="url(#gl)" opacity=".9"/>
<path d="M156,92 C162,94 164,100 164,108 V150" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6" fill="none"/>
<ellipse cx="100" cy="246" rx="62" ry="5" fill="#fff" opacity=".25"/>
<rect x="44" y="40" width="112" height="16" rx="6" fill="${shade(lidB, -0.2)}" stroke="${OL}" stroke-width="2.4"/>
<rect x="38" y="10" width="124" height="34" rx="10" fill="url(#lid)" stroke="${OL}" stroke-width="2.8"/>
${Array.from({ length: 15 }, (_, i) => `<path d="M${46 + i * 7.6},16 V38" stroke="${shade(lidB, -0.35)}" stroke-opacity=".35" stroke-width="2"/>`).join("")}
<path d="M44,16 H156" stroke="#fff" stroke-opacity=".7" stroke-width="2.6" stroke-linecap="round"/>
${band ? `<path d="M40,30 H160" stroke="${band}" stroke-width="5" opacity=".9"/>` : ""}
<polygon points="${pts(star4(166, 70, 10, 0.24))}" fill="#fff"/>`));
jarFront("jar_front_gold.svg", "#ffd877", "#c88a24", "");
jarFront("jar_front_lav.svg", "#d8c8ff", "#8a72e0", "");

// ---------- 물감 병 (채색석 묶음: 코르크 + 리본 + 둥근 어깨 유리) ----------
const BOT_IN = "M24,96 C24,84 40,78 46,72 V60 H74 V72 C80,78 96,84 96,96 V176 C96,186 90,192 80,192 H40 C30,192 24,186 24,176 Z";
save("bot_mask.svg", svg(120, 200, `<path d="${BOT_IN}" fill="#fff"/>`));
save("bot_back.svg", svg(120, 200, `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dfe2ff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#c4b6ee" stop-opacity=".55"/></linearGradient></defs>
<ellipse cx="60" cy="196" rx="48" ry="5" fill="#1b0f2c" opacity=".35"/>
<path d="M18,96 C18,80 36,74 42,68 V56 H78 V68 C84,74 102,80 102,96 V178 C102,190 94,198 82,198 H38 C26,198 18,190 18,178 Z" fill="url(#g)"/>`));
const botFront = (name, rib) => save(name, svg(120, 200, `<defs>
<linearGradient id="c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b98552"/><stop offset=".4" stop-color="#e8c08a"/><stop offset="1" stop-color="#8a5a34"/></linearGradient>
<linearGradient id="edge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".14" stop-color="#fff" stop-opacity=".1"/><stop offset=".86" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".6"/></linearGradient>
<linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(rib, 0.4)}"/><stop offset="1" stop-color="${shade(rib, -0.2)}"/></linearGradient></defs>
<path d="M18,96 C18,80 36,74 42,68 V56 H78 V68 C84,74 102,80 102,96 V178 C102,190 94,198 82,198 H38 C26,198 18,190 18,178 Z" fill="none" stroke="#5a4a86" stroke-opacity=".75" stroke-width="2.4"/>
<path d="M18,96 C18,80 36,74 42,68 V56 H78 V68 C84,74 102,80 102,96 V178 C102,190 94,198 82,198 H38 C26,198 18,190 18,178 Z" fill="none" stroke="url(#edge)" stroke-width="6"/>
<path d="M30,100 C30,92 34,88 38,86 V180 C33,178 30,174 30,168 Z" fill="#fff" opacity=".7"/>
<path d="M40,30 C40,22 80,22 80,30 V58 C80,62 40,62 40,58 Z" fill="url(#c)" stroke="${OL}" stroke-width="2.4"/>
<ellipse cx="60" cy="28" rx="20" ry="5" fill="#f2d4a4" stroke="${OL}" stroke-width="2"/>
${Array.from({ length: 6 }, () => `<circle cx="${f(46 + rnd() * 28)}" cy="${f(36 + rnd() * 20)}" r="1.2" fill="#6a4020" opacity=".5"/>`).join("")}
<path d="M38,64 C50,70 70,70 82,64 L82,72 C70,78 50,78 38,72 Z" fill="url(#r)" stroke="${OL}" stroke-width="2"/>
<path d="M60,70 C50,58 34,58 34,66 C34,74 50,74 60,70 Z M60,70 C70,58 86,58 86,66 C86,74 70,74 60,70 Z" fill="url(#r)" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>
<path d="M57,72 L48,92 L53,89 L55,95 L61,74 Z M63,72 L72,92 L67,89 L65,95 L59,74 Z" fill="${shade(rib, -0.1)}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>
<circle cx="60" cy="70" r="5" fill="${shade(rib, 0.5)}" stroke="${OL}" stroke-width="1.8"/>
<polygon points="${pts(star4(92, 104, 8, 0.24))}" fill="#fff"/>`));
botFront("bot_front_rose.svg", "#ff7fae");
botFront("bot_front_lav.svg", "#9a7bff");
botFront("bot_front_gold.svg", "#f2b632");

// ---------- 값표 (구멍 + 끈 · 끝은 뾰족하게 접힌 종이) ----------
save("tag.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="70" viewBox="0 0 180 70" preserveAspectRatio="none"><defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset=".7" stop-color="#f6ead2"/><stop offset="1" stop-color="#e6d3b0"/></linearGradient></defs>
<path d="M22,6 H170 C174,6 176,8 176,12 V58 C176,62 174,64 170,64 H22 L4,35 Z" fill="url(#p)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M24,11 H170 M24,59 H170" stroke="#e4a63c" stroke-opacity=".75" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
<circle cx="20" cy="35" r="5" fill="#cdb894" stroke="${OL}" stroke-width="1.6"/></svg>`);

// ---------- 선반 받침 (둥근 까치발, 기둥 없음) ----------
save("bracket.svg", svg(60, 70, `<defs>${GOLD("g")}</defs><path d="M6,4 H54 V12 C40,14 26,26 20,44 C16,56 14,62 10,66 C6,60 6,40 6,4 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/><path d="M12,10 C12,30 14,46 12,58" stroke="#fff" stroke-opacity=".6" stroke-width="2" fill="none"/><circle cx="16" cy="22" r="6" fill="none" stroke="${OL}" stroke-opacity=".5" stroke-width="1.6"/>`));

// ---------- 차양 (분홍 · 크림 줄 · 물결 끝 · 금 술) ----------
{
  const W = 1200; let d = "M0,0 H1200 V34"; const n = 30;
  for (let i = n; i > 0; i--) { const x1 = (i - 1) * (W / n), xm = x1 + W / n / 2; d += ` Q${f(xm)},70 ${f(x1)},34`; }
  let st = ""; for (let i = 0; i < n; i++) st += `<rect x="${i * 40}" y="0" width="20" height="80" fill="#fff6f0" opacity=".9"/>`;
  let tz = ""; for (let i = 0; i < n; i++) tz += `<circle cx="${i * 40 + 20}" cy="60" r="3.4" fill="#ffd877" stroke="${OL}" stroke-width="1.2"/>`;
  save("awning.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="74" viewBox="0 0 1200 74" preserveAspectRatio="none"><defs><clipPath id="c"><path d="${d} Z"/></clipPath>
<linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c94a7a"/><stop offset=".7" stop-color="#e57aa0"/><stop offset="1" stop-color="#b03c6a"/></linearGradient>
<linearGradient id="sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".85" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".15"/></linearGradient></defs>
<g clip-path="url(#c)"><rect width="1200" height="80" fill="url(#r)"/>${st}<rect width="1200" height="80" fill="url(#sh)"/></g>
<path d="${d}" fill="none" stroke="${OL}" stroke-width="2.4" vector-effect="non-scaling-stroke"/>${tz}</svg>`);
}

// ---------- 선물 상자 (몸 · 뚜껑 · 리본 매듭 · 풀린 리본 따로: 풀리는 연출) ----------
save("box_body.svg", svg(260, 190, `<defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6fb"/><stop offset=".55" stop-color="#f3d8ea"/><stop offset="1" stop-color="#d6a8c8"/></linearGradient>
<linearGradient id="s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c79abb"/><stop offset="1" stop-color="#a87298"/></linearGradient>
<linearGradient id="rb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a62d8"/><stop offset=".45" stop-color="#b9a2ff"/><stop offset="1" stop-color="#6b55c8"/></linearGradient>${SH("d", 10, 8, 0.4)}</defs>
<g filter="url(#d)"><path d="M14,30 H200 V180 H14 Z" fill="url(#f)" stroke="${OL}" stroke-width="3"/>
<path d="M200,30 L246,12 V160 L200,180 Z" fill="url(#s)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
${Array.from({ length: 16 }, (_, i) => `<circle cx="${f(30 + (i % 4) * 46 + (Math.floor(i / 4) % 2) * 22)}" cy="${f(52 + Math.floor(i / 4) * 34)}" r="5" fill="#ffffff" opacity=".7"/><circle cx="${f(30 + (i % 4) * 46 + (Math.floor(i / 4) % 2) * 22)}" cy="${f(52 + Math.floor(i / 4) * 34)}" r="2.4" fill="#ffc7de"/>`).join("")}
<rect x="94" y="30" width="28" height="150" fill="url(#rb)" stroke="${OL}" stroke-width="2.4"/>
<path d="M98,34 V176" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>
<path d="M214,24 L232,17 V166 L214,174 Z" fill="#8f74e0" stroke="${OL}" stroke-width="2"/>
<path d="M18,36 H196" stroke="#fff" stroke-width="3" opacity=".8"/></g>`));
save("box_lid.svg", svg(280, 90, `<defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f6e2ef"/><stop offset="1" stop-color="#ddb2d0"/></linearGradient>
<linearGradient id="t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff8fc"/><stop offset="1" stop-color="#e8c6dc"/></linearGradient>
<linearGradient id="rb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a62d8"/><stop offset=".45" stop-color="#b9a2ff"/><stop offset="1" stop-color="#6b55c8"/></linearGradient>${GOLD("g", 1, 0)}</defs>
<path d="M4,40 L50,20 H272 L226,40 Z" fill="url(#t)" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M4,40 H226 V74 H4 Z" fill="url(#f)" stroke="${OL}" stroke-width="3"/>
<path d="M226,40 L272,20 V54 L226,74 Z" fill="#cfa0c2" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>
<path d="M98,40 H128 V74 H98 Z M108,40 L154,20 H170 L128,40 Z" fill="url(#rb)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M6,70 H224" stroke="url(#g)" stroke-width="3"/><path d="M10,46 H220" stroke="#fff" stroke-width="2.4" opacity=".85"/>`));
save("bow.svg", svg(170, 110, `<defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8c8ff"/><stop offset=".55" stop-color="#9a7ff0"/><stop offset="1" stop-color="#6a52cf"/></linearGradient>${SH("d", 4, 3, 0.35)}</defs>
<g filter="url(#d)"><path d="M80,58 L58,100 L66,95 L69,106 L86,62 Z M90,58 L112,100 L104,95 L101,106 L84,62 Z" fill="#7d63dc" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M85,56 C64,20 18,12 12,36 C6,60 46,70 85,56 Z" fill="url(#a)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>
<path d="M85,56 C106,20 152,12 158,36 C164,60 124,70 85,56 Z" fill="url(#a)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>
<path d="M24,34 C30,24 46,22 60,30" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".8"/>
<path d="M146,34 C140,26 128,24 116,28" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".55"/>
<path d="M40,46 C54,52 70,54 82,54 M130,46 C116,52 100,54 88,54" stroke="${OL}" stroke-opacity=".35" stroke-width="1.8" fill="none"/>
<ellipse cx="85" cy="56" rx="13" ry="11" fill="#b9a2ff" stroke="${OL}" stroke-width="2.6"/><path d="M78,52 C80,49 84,48 88,49" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></g>`));
save("ribbon_loose.svg", svg(320, 120, `<defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a62d8"/><stop offset=".5" stop-color="#c6b2ff"/><stop offset="1" stop-color="#7a62d8"/></linearGradient></defs>
<path d="M6,70 C60,20 110,110 170,60 S270,20 314,54 L306,66 C268,38 230,76 172,76 C112,124 62,40 14,82 Z" fill="url(#a)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M20,70 C64,38 104,96 166,64" stroke="#fff" stroke-opacity=".6" stroke-width="2.4" fill="none"/>`));

// ---------- 영수증 (위아래 톱니 끝 · 구멍 · 결) ----------
{
  const W = 340, Hh = 460; let d = "M0,10";
  for (let x = 0; x < W; x += 10) d += ` L${x + 5},0 L${x + 10},10`;
  d += ` V${Hh - 10}`;
  for (let x = W; x > 0; x -= 10) d += ` L${x - 5},${Hh} L${x - 10},${Hh - 10}`;
  save("receipt_mask.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Hh}" viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none"><path d="${d} Z" fill="#fff"/></svg>`);
}

// ---------- 놋쇠 이름판 (나사 넷 · 둥근 끝) ----------
save("plaque.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="56" viewBox="0 0 220 56" preserveAspectRatio="none"><defs>${GOLD("g", 0, 1)}<linearGradient id="i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4a10"/><stop offset="1" stop-color="#3a2008"/></linearGradient></defs>
<path d="M14,4 H206 C214,4 216,10 216,14 V42 C216,48 212,52 206,52 H14 C8,52 4,48 4,42 V14 C4,8 8,4 14,4 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.4" vector-effect="non-scaling-stroke"/>
<path d="M18,10 H202 C206,10 208,12 208,16 V40 C208,44 206,46 202,46 H18 C14,46 12,44 12,40 V16 C12,12 14,10 18,10 Z" fill="none" stroke="#fff4c8" stroke-opacity=".8" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg>`);

// ---------- 매다는 저울 (위 고리에서 내려오는 사슬 · 들보 · 두 접시 — 세운 기둥 없음) ----------
{
  const chain = (x0, y0, x1, y1) => { let s = ""; const n = 9; for (let i = 0; i < n; i++) { const x = x0 + ((x1 - x0) * i) / n, y = y0 + ((y1 - y0) * i) / n; s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="3.2" ry="5" fill="none" stroke="url(#g)" stroke-width="2.2" transform="rotate(${f((Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI - 90)} ${f(x)} ${f(y)})"/>`; } return s; };
  save("scale_beam.svg", svg(760, 120, `<defs>${GOLD("g")}${SH("d", 6, 5, 0.35)}</defs><g filter="url(#d)">
<path d="M380,6 C390,6 396,14 392,22 L388,30" fill="none" stroke="url(#g)" stroke-width="5" stroke-linecap="round"/>
<path d="M30,52 C200,40 560,40 730,52 L730,62 C560,52 200,52 30,62 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M40,54 C200,45 560,45 720,54" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none"/>
<circle cx="380" cy="46" r="20" fill="url(#g)" stroke="${OL}" stroke-width="2.6"/><circle cx="380" cy="46" r="8" fill="#fff6d2" stroke="${OL}" stroke-width="1.8"/>
<path d="M380,26 L372,12 H388 Z" fill="url(#g)" stroke="${OL}" stroke-width="2"/>
<circle cx="30" cy="57" r="9" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/><circle cx="730" cy="57" r="9" fill="url(#g)" stroke="${OL}" stroke-width="2.2"/>
${[0, 1, 2, 3, 4].map((i) => `<polygon points="${pts(star4(180 + i * 100, 50, 5, 0.3))}" fill="#fff6d2" opacity=".8"/>`).join("")}</g>`));
  save("scale_pan.svg", svg(300, 150, `<defs>${GOLD("g")}<linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c4"/><stop offset=".5" stop-color="#e4a63c"/><stop offset="1" stop-color="#9a5e14"/></linearGradient>${SH("d", 8, 6, 0.35)}</defs>
<g filter="url(#d)">${chain(150, 4, 30, 112)}${chain(150, 4, 270, 112)}<circle cx="150" cy="6" r="6" fill="url(#g)" stroke="${OL}" stroke-width="2"/>
<path d="M14,112 H286 C280,136 230,146 150,146 C70,146 20,136 14,112 Z" fill="url(#p)" stroke="${OL}" stroke-width="2.8" stroke-linejoin="round"/>
<ellipse cx="150" cy="112" rx="136" ry="12" fill="#fff0c0" stroke="${OL}" stroke-width="2.6"/><ellipse cx="150" cy="112" rx="120" ry="7" fill="#e9bd5c" opacity=".6"/>
<path d="M40,124 C80,134 140,136 200,132" stroke="#fff" stroke-opacity=".6" stroke-width="2.4" fill="none"/></g>`));
}

// ---------- 보장 메달 셋 (금테 + 라벤더 법랑 + 그림) ----------
const medal = (name, inner, c) => save(name, svg(120, 120, `<defs>${GOLD("g")}<radialGradient id="e" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="${shade(c, 0.6)}"/><stop offset=".6" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -0.35)}"/></radialGradient>${SH("d", 4, 4, 0.35)}</defs>
<g filter="url(#d)">${Array.from({ length: 16 }, (_, i) => `<polygon points="${pts([P(60, 60, 56, i * 22.5 - 6), P(60, 60, 50, i * 22.5), P(60, 60, 56, i * 22.5 + 6)])}" fill="url(#g)" stroke="${OL}" stroke-width="1.2"/>`).join("")}
<circle cx="60" cy="60" r="50" fill="url(#g)" stroke="${OL}" stroke-width="2.6"/><circle cx="60" cy="60" r="42" fill="url(#e)" stroke="${OL}" stroke-width="2"/>
<circle cx="60" cy="60" r="38" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.4"/>${inner}
<path d="M30,44 C36,32 48,24 62,24" stroke="#fff" stroke-width="3.4" stroke-linecap="round" fill="none" opacity=".65"/></g>`));
medal("medal_pity.svg", `<path d="M60,36 L80,44 V62 C80,76 70,84 60,88 C50,84 40,76 40,62 V44 Z" fill="#fff6d2" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/><path d="M52,62 L58,68 L70,54" stroke="#8a5a14" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`, "#8a72e0");
medal("medal_ten.svg", `${[0, 1, 2].map((i) => `<rect x="${38 + i * 12}" y="${38 + i * 4}" width="26" height="36" rx="4" fill="${["#fff", "#f6efff", "#fff6d2"][i]}" stroke="${OL}" stroke-width="2" transform="rotate(${-10 + i * 10} ${51 + i * 12} ${56 + i * 4})"/>`).join("")}<text x="74" y="76" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="17" fill="#6a3fb4" stroke="#fff" stroke-width="3" paint-order="stroke">A↑</text>`, "#d0609a");
medal("medal_spark.svg", `<circle cx="60" cy="60" r="24" fill="none" stroke="#fff6d2" stroke-width="5" stroke-dasharray="110 40" transform="rotate(-90 60 60)" stroke-linecap="round"/><polygon points="${pts(star4(60, 60, 14, 0.3))}" fill="#fff6d2" stroke="${OL}" stroke-width="1.4"/>`, "#3f9fd0");

// ---------- 별자리 별 (금테 별 · 빛 고리) ----------
save("star_node.svg", svg(80, 80, `<defs>${GOLD("g")}<radialGradient id="h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d2" stop-opacity=".9"/><stop offset="1" stop-color="#fff6d2" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="40" r="38" fill="url(#h)"/><polygon points="${pts([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => P(40, 41, i % 2 ? 7 : 17, -90 + i * 36)))}" fill="url(#g)" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><polygon points="${pts(star4(40, 40, 30, 0.08))}" fill="#fff" opacity=".8"/>`));

// ---------- 제비꼬리 이름 띠 (끝이 뾰족하게 갈라짐) ----------
const banner = (name, c1, c2) => save(name, `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="72" viewBox="0 0 420 72" preserveAspectRatio="none"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(c2, -0.2)}"/><stop offset="1" stop-color="${shade(c2, -0.45)}"/></linearGradient></defs>
<path d="M2,22 H52 V62 H2 L18,42 Z" fill="url(#d)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M418,22 H368 V62 H418 L402,42 Z" fill="url(#d)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M36,8 C140,2 280,2 384,8 V52 C280,46 140,46 36,52 Z" fill="url(#b)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M44,15 C140,9 280,9 376,15" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/>
<path d="M44,45 C140,39 280,39 376,45" stroke="#ffe7a6" stroke-opacity=".9" stroke-width="1.4" fill="none" vector-effect="non-scaling-stroke"/></svg>`);
banner("ban_rose.svg", "#ffa3c2", "#c8457a"); banner("ban_lav.svg", "#b39bff", "#6b55d8"); banner("ban_navy.svg", "#5a4fae", "#26205a"); banner("ban_gold.svg", "#ffe08a", "#c8861c");

// ---------- 가는 금 모서리 · 도장 ----------
save("corner.svg", svg(60, 60, `<defs>${GOLD("g")}</defs><path d="M4,56 V18 C4,10 10,4 18,4 H56" fill="none" stroke="url(#g)" stroke-width="2"/><path d="M12,56 V22 C12,16 16,12 22,12 H56" fill="none" stroke="url(#g)" stroke-width="1" opacity=".7"/><polygon points="${pts(star4(12, 12, 7, 0.28))}" fill="url(#g)" stroke="${OL}" stroke-width=".8"/>`));
const stamp = (name, c, txt) => save(name, svg(150, 150, `<defs><filter id="r"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.6 1.4"/><feComposite in="SourceGraphic" operator="in"/></filter></defs>
<g filter="url(#r)" transform="rotate(-12 75 75)"><circle cx="75" cy="75" r="66" fill="none" stroke="${c}" stroke-width="5"/><circle cx="75" cy="75" r="56" fill="none" stroke="${c}" stroke-width="2"/>${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<polygon points="${pts(star4(...P(75, 75, 61, i * 45 - 90), 4, 0.3))}" fill="${c}"/>`).join("")}
<text x="75" y="86" text-anchor="middle" font-family="'Malgun Gothic',sans-serif" font-weight="800" font-size="30" fill="${c}">${txt}</text></g>`));
stamp("stamp_paid.svg", "#d0457e", "받음");
stamp("stamp_done.svg", "#6b55d8", "교환");

// ---------- 무지개 조각 (신화 조각: 소환 결과 줄의 무지개 프리즘과 같은 꼴) ----------
save("shard.svg", svg(60, 80, `<defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8fc4"/><stop offset=".3" stop-color="#ffd36b"/><stop offset=".55" stop-color="#7fe0b8"/><stop offset=".8" stop-color="#7fb8ff"/><stop offset="1" stop-color="#b58bff"/></linearGradient><linearGradient id="b" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<path d="M30,4 L52,26 L42,74 L18,74 L8,26 Z" fill="url(#a)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M30,4 L30,74 M8,26 L30,36 L52,26 M18,74 L30,36 L42,74" stroke="#fff" stroke-opacity=".55" stroke-width="1.4" fill="none"/>
<path d="M30,6 L48,26 L30,34 Z" fill="url(#b)"/><polygon points="${pts(star4(48, 14, 8, 0.24))}" fill="#fff"/>`));

// ---------- 별가루 주머니 꼬리표 (병 앞에 붙는 라벨) ----------
save("label.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="44" viewBox="0 0 140 44" preserveAspectRatio="none"><defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#f0dfbe"/></linearGradient></defs><path d="M10,4 H130 L136,22 L130,40 H10 L4,22 Z" fill="url(#p)" stroke="${OL}" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><path d="M14,9 H126 M14,35 H126" stroke="#e4a63c" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>`);

rmSync(tmp, { recursive: true, force: true });
console.log("ok");
