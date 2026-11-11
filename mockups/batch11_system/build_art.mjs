// 묶음 11 「시스템 안내」 시안 부품 — 그림 결(값 잡음 PNG → JPG) + 게임 결 SVG(짙은 자두색 외곽선 · 여러 단 그라데이션 · 윗빛 · 아랫그늘).
// batch8_shop/build_art.mjs와 같은 결. 시안 전용이라 batch11_system/a/s/ 에만 쓴다 (게임 assets/는 건드리지 않음).
//   node design/mockups/feedback70/batch11_system/build_art.mjs
import { writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { tmpdir } from "node:os";

const out = resolve(dirname(fileURLToPath(import.meta.url)), "a/s");
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "b11art-"));
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
const SH = (id, dy = 6, sd = 6, op = 0.35) => `<filter id="${id}" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="${dy}" stdDeviation="${sd}" flood-color="#2a1636" flood-opacity="${op}"/></filter>`;

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

// 잠든 밤하늘 (방치 절전 A): 짙은 남보라 · 은하수 띠 · 별 먼지 · 아래 구름 바다(달빛 받은 윗면) · 가장자리 어둡게.
// OLED에서 대부분 거의 검게 남도록 평균 밝기를 낮게 둔다.
{
  const W = 1600, Hh = 720, n1 = noise(23), n2 = noise(61), n3 = noise(97), n4 = noise(131);
  tex("tex_night", W, Hh, (x, y) => {
    const u = x / W, v = y / Hh;
    let val = 0.2 + (fbm(n1, u * 7, v * 3.2, 7, 4, 5) - 0.5) * 0.18 - v * 0.04;
    const band = Math.exp(-(((v - 0.42 + (u - 0.5) * 0.5)) ** 2) / 0.018);
    val += band * 0.2 * fbm(n2, u * 14, v * 6, 14, 6, 5);
    const moon = Math.exp(-((u - 0.83) ** 2 + ((v - 0.16) * 0.45) ** 2) / 0.012);
    val += moon * 0.22;
    // 별: 격자 칸마다 하나씩 자리 · 밝기 · 크기를 달리 (은하수 쪽이 더 촘촘)
    const cs = 9, cx = Math.floor(x / cs), cy = Math.floor(y / cs);
    const h1 = n3(cx * 7.13, cy * 3.71, 512, 512), h2 = n3(cx * 1.9 + 50, cy * 5.3 + 20, 512, 512);
    if (h1 > 0.7 - band * 0.12) {
      const sx = cx * cs + h2 * cs, sy = cy * cs + ((h1 * 7) % 1) * cs;
      const d = Math.hypot(x - sx, y - sy), r = 0.5 + ((h1 - 0.6) * 3) ** 2 * 1.4;
      if (d < r + 1) val += Math.max(0, 1 - d / (r + 1)) * (0.25 + h2 * 0.6);
    }
    const ex = Math.min(u, 1 - u) * 2.2;
    val -= (1 - Math.min(1, ex)) ** 2 * 0.07;
    const c = ramp([[0, H("#04030c")], [0.18, H("#0c0a24")], [0.3, H("#1a1646")], [0.45, H("#352c74")], [0.62, H("#6e5fb4")], [0.8, H("#c9b9ef")], [1, H("#fff4d6")]], val);
    // 은하수 안쪽에 옅은 장밋빛 · 아래쪽은 남보라로 (값만 같은 단색이 되지 않게)
    const pink = band * Math.max(0, fbm(n4, u * 5, v * 5, 5, 5, 4) - 0.45) * 1.6;
    return mix3(c, [c[0] * 1.35 + 18, c[1] * 0.92, c[2] * 1.05], Math.min(1, pink));
  }, 2);
}
// 일지 종이 (누렇게 바랜 결 · 얼룩 · 섬유)
{
  const T = 512, n1 = noise(13), n2 = noise(37), n3 = noise(59);
  tex("tex_parch", T, T, (x, y) => {
    let v = 0.55 + (fbm(n1, (x / T) * 6, (y / T) * 6, 6, 6, 5) - 0.5) * 0.42;
    v += (n2((x / T) * 160, (y / T) * 40, 160, 40) - 0.5) * 0.12 + (n2((x / T) * 40, (y / T) * 160, 40, 160) - 0.5) * 0.12;
    const fx = n3((x / T) * 18, (y / T) * 18, 18, 18);
    if (fx > 0.8) v -= (fx - 0.8) * 1.1;
    return ramp([[0, H("#c7a676")], [0.45, H("#ead6ae")], [0.75, H("#f7ead0")], [1, H("#fffaf0")]], v);
  });
}
// 진주빛 카드 종이 (라벤더 크림 · 고운 섬유)
{
  const T = 512, n1 = noise(71), n2 = noise(73);
  tex("tex_pearl", T, T, (x, y) => {
    let v = 0.6 + (fbm(n1, (x / T) * 5, (y / T) * 5, 5, 5, 5) - 0.5) * 0.24;
    v += (n2((x / T) * 200, (y / T) * 6, 200, 6) - 0.5) * 0.06 + (n2((x / T) * 6, (y / T) * 200, 6, 200) - 0.5) * 0.06;
    return ramp([[0, H("#d8cdee")], [0.5, H("#f1ecfa")], [1, H("#fffdf8")]], v);
  });
}
// 벨벳 (결 방향 광택 · 눌린 자국)
function velvet(name, cols, sd) {
  const T = 512, n1 = noise(sd), n2 = noise(sd + 6), n3 = noise(sd + 13);
  tex(name, T, T, (x, y) => {
    let v = 0.5 + (fbm(n1, (x / T) * 4, (y / T) * 4, 4, 4, 5) - 0.5) * 0.55;
    v += (fbm(n2, (x / T) * 2, (y / T) * 14, 2, 14, 3) - 0.5) * 0.3;
    v += (n3((x / T) * 256, (y / T) * 256, 256, 256) - 0.5) * 0.16;
    return ramp(cols, v);
  });
}
velvet("tex_vel_navy", [[0, H("#0b0a24")], [0.45, H("#1f1a4c")], [0.75, H("#352d76")], [1, H("#6458ad")]], 131);
velvet("tex_vel_crimson", [[0, H("#4a0d22")], [0.45, H("#9a2340")], [0.75, H("#cc3e5c")], [1, H("#f58da0")]], 151);
// 저녁 유리 (등불 판): 자두빛 남색 · 흐린 결 · 세로로 흐른 얼룩
{
  const T = 512, n1 = noise(201), n2 = noise(207);
  tex("tex_dusk", T, T, (x, y) => {
    let v = 0.42 + (fbm(n1, (x / T) * 3, (y / T) * 3, 3, 3, 5) - 0.5) * 0.36;
    v += (fbm(n2, (x / T) * 24, (y / T) * 2, 24, 2, 3) - 0.5) * 0.12;
    return ramp([[0, H("#140c2a")], [0.4, H("#2a1a4e")], [0.7, H("#4a2f74")], [1, H("#8a63a8")]], v);
  });
}
// 가죽 (일지 표지 · 남보라)
{
  const T = 512, n1 = noise(301), n2 = noise(307), n3 = noise(311);
  tex("tex_leather", T, T, (x, y) => {
    let v = 0.5 + (fbm(n1, (x / T) * 5, (y / T) * 5, 5, 5, 5) - 0.5) * 0.4;
    const c = n2((x / T) * 90, (y / T) * 90, 90, 90);
    v += (c - 0.5) * 0.22;
    const cr = Math.abs(fbm(n3, (x / T) * 12, (y / T) * 12, 12, 12, 3) - 0.5);
    if (cr < 0.012) v -= 0.18;
    return ramp([[0, H("#140f2c")], [0.45, H("#2c2260")], [0.75, H("#463a8a")], [1, H("#7a6cc0")]], v);
  });
}

// ================= SVG 부품 =================
// ---------- 제비꼬리 이름 띠 ----------
const banner = (name, c1, c2) => save(name, `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="72" viewBox="0 0 420 72" preserveAspectRatio="none"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(c2, -0.2)}"/><stop offset="1" stop-color="${shade(c2, -0.45)}"/></linearGradient></defs>
<path d="M2,22 H52 V62 H2 L18,42 Z" fill="url(#d)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M418,22 H368 V62 H418 L402,42 Z" fill="url(#d)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M36,8 C140,2 280,2 384,8 V52 C280,46 140,46 36,52 Z" fill="url(#b)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
<path d="M44,15 C140,9 280,9 376,15" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/>
<path d="M44,45 C140,39 280,39 376,45" stroke="#ffe7a6" stroke-opacity=".9" stroke-width="1.4" fill="none" vector-effect="non-scaling-stroke"/></svg>`);
banner("ban_lav.svg", "#b39bff", "#6b55d8"); banner("ban_navy.svg", "#5a4fae", "#26205a");

// ---------- 금 모서리 ----------
save("corner.svg", svg(60, 60, `<defs>${GOLD("g")}</defs><path d="M4,56 V18 C4,10 10,4 18,4 H56" fill="none" stroke="url(#g)" stroke-width="2"/><path d="M12,56 V22 C12,16 16,12 22,12 H56" fill="none" stroke="url(#g)" stroke-width="1" opacity=".7"/><polygon points="${pts(star4(12, 12, 7, 0.28))}" fill="url(#g)" stroke="${OL}" stroke-width=".8"/>`));

// ---------- 고래 등불 (뱃머리 등불과 같은 꼴: 둥근 지붕 · 고리 · 네 쪽 유리 · 받침) — 켜짐 / 꺼짐 ----------
const lantern = (name, lit) => save(name, svg(160, 250, `<defs>${GOLD("g")}${GOLD("g2", 0, 1)}
<radialGradient id="fl" cx=".5" cy=".62" r=".5"><stop offset="0" stop-color="#fffbe6"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".7" stop-color="#ff9a3c"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>
<linearGradient id="gl" x1="0" y1="0" x2="1" y2="0">${lit ? `<stop offset="0" stop-color="#ffd27a" stop-opacity=".75"/><stop offset=".5" stop-color="#fff2c4" stop-opacity=".95"/><stop offset="1" stop-color="#f0a850" stop-opacity=".8"/>` : `<stop offset="0" stop-color="#3a3060" stop-opacity=".85"/><stop offset=".5" stop-color="#5a4f8a" stop-opacity=".7"/><stop offset="1" stop-color="#2a2250" stop-opacity=".9"/>`}</linearGradient>
<radialGradient id="halo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe7a6" stop-opacity=".55"/><stop offset="1" stop-color="#ffe7a6" stop-opacity="0"/></radialGradient>${SH("d", 6, 5, 0.4)}</defs>
${lit ? `<circle cx="80" cy="150" r="78" fill="url(#halo)"/>` : ""}
<g filter="url(#d)">
<circle cx="80" cy="16" r="11" fill="none" stroke="url(#g)" stroke-width="5"/>
<path d="M50,64 C50,40 64,30 80,30 C96,30 110,40 110,64 Z" fill="url(#g2)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M58,58 C60,44 68,38 78,37" stroke="#fff" stroke-opacity=".7" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<rect x="40" y="62" width="80" height="14" rx="5" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/>
<path d="M46,76 L52,196 H108 L114,76 Z" fill="url(#gl)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
${lit ? `<ellipse cx="80" cy="150" rx="26" ry="40" fill="url(#fl)"/><path d="M80,118 C90,136 92,150 86,164 C83,170 77,170 74,164 C68,152 72,136 80,118 Z" fill="#fffbe6" stroke="#ffb347" stroke-width="1.6"/><path d="M80,134 C84,144 84,152 81,158 C79,160 78,158 77,154 C76,148 77,142 80,134 Z" fill="#ffd877"/>` : `<path d="M80,166 V176" stroke="#2a1d10" stroke-width="3" stroke-linecap="round"/><path d="M80,160 C72,148 90,140 80,126 C74,116 86,108 82,98" stroke="#d8cdee" stroke-opacity=".5" stroke-width="3" fill="none" stroke-linecap="round"/>`}
<path d="M66,78 L68,194 M94,78 L92,194" stroke="${OL}" stroke-width="2" opacity=".75"/>
<path d="M50,84 L54,186" stroke="#fff" stroke-opacity="${lit ? 0.75 : 0.35}" stroke-width="3" stroke-linecap="round"/>
<rect x="44" y="194" width="72" height="14" rx="5" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/>
<path d="M54,208 C58,222 70,228 80,228 C90,228 102,222 106,208 Z" fill="url(#g2)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<circle cx="80" cy="236" r="6" fill="url(#g)" stroke="${OL}" stroke-width="2"/>
<polygon points="${pts(star4(108, 70, 7, 0.26))}" fill="#fff"/></g>`));
lantern("lantern_on.svg", true);
lantern("lantern_off.svg", false);

// ---------- 경고 리본 (짙은 진홍 공단: 왼끝 금 핀 · 몸 · 오른끝 접힌 제비꼬리) — 세 조각으로 늘어난다 ----------
save("rib_l.svg", svg(46, 56, `<defs><linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8aa0"/><stop offset=".45" stop-color="#d8344f"/><stop offset="1" stop-color="#8c1630"/></linearGradient></defs>
<path d="M46,4 H22 C10,4 4,14 4,28 C4,42 10,52 22,52 H46 Z" fill="url(#r)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M46,9 H24 C14,9 10,16 10,24" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linecap="round"/>`, ` preserveAspectRatio="none"`));
save("rib_m.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="56" viewBox="0 0 200 56" preserveAspectRatio="none"><defs><linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8aa0"/><stop offset=".45" stop-color="#d8344f"/><stop offset="1" stop-color="#8c1630"/></linearGradient></defs>
<rect x="0" y="4" width="200" height="48" fill="url(#r)"/><path d="M0,4 H200 M0,52 H200" stroke="${OL}" stroke-width="2.4" vector-effect="non-scaling-stroke"/>
<path d="M0,9 H200" stroke="#fff" stroke-opacity=".5" stroke-width="2" vector-effect="non-scaling-stroke"/><path d="M0,46 H200" stroke="#ffd877" stroke-opacity=".85" stroke-width="1.4" stroke-dasharray="5 4" vector-effect="non-scaling-stroke"/></svg>`);
save("rib_r.svg", svg(58, 72, `<defs><linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8aa0"/><stop offset=".45" stop-color="#d8344f"/><stop offset="1" stop-color="#8c1630"/></linearGradient><linearGradient id="d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a1028"/><stop offset="1" stop-color="#4a0a1c"/></linearGradient></defs>
<path d="M10,30 L44,30 L56,70 L38,58 L24,70 Z" fill="url(#d)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>
<path d="M0,4 H40 L28,28 L40,52 H0 Z" fill="url(#r)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<path d="M0,9 H32" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`, ` preserveAspectRatio="none"`));
// 리본 아래 뾰족 꼬리 (누른 단추 쪽을 가리킴)
save("rib_tail.svg", svg(30, 26, `<defs><linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b52641"/><stop offset="1" stop-color="#7a1028"/></linearGradient></defs><path d="M2,0 H28 L12,24 Z" fill="url(#r)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/><path d="M2,1 H28" stroke="#d8344f" stroke-width="3"/>`));
// 금 경고 핀 (둥근 금 머리 · 느낌표 각인)
save("pin_warn.svg", svg(64, 64, `<defs>${GOLD("g")}<radialGradient id="e" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff6d2"/><stop offset="1" stop-color="#f2c75a"/></radialGradient>${SH("d", 3, 2.5, 0.45)}</defs><g filter="url(#d)">
${Array.from({ length: 12 }, (_, i) => `<polygon points="${pts([P(32, 32, 29, i * 30 - 9), P(32, 32, 25, i * 30), P(32, 32, 29, i * 30 + 9)])}" fill="url(#g)" stroke="${OL}" stroke-width="1"/>`).join("")}
<circle cx="32" cy="32" r="25" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/><circle cx="32" cy="32" r="19" fill="url(#e)" stroke="#b8761c" stroke-width="1.4"/>
<path d="M32,19 C35,19 36,21 35.6,24 L34,36 C33.8,38 30.2,38 30,36 L28.4,24 C28,21 29,19 32,19 Z" fill="#a3203c" stroke="${OL}" stroke-width="1.4"/><circle cx="32" cy="43" r="3.4" fill="#a3203c" stroke="${OL}" stroke-width="1.4"/>
<path d="M17,24 C20,17 26,13 33,13" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".75"/></g>`));

// ---------- 시계 고리 (60눈금 · 금 · 달 표지) ----------
{
  let ticks = "";
  for (let i = 0; i < 60; i++) { const big = i % 5 === 0; const a = P(200, 200, big ? 168 : 172, i * 6 - 90), b = P(200, 200, 182, i * 6 - 90); ticks += `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${big ? "#ffe7a6" : "#c9b9ef"}" stroke-opacity="${big ? 0.9 : 0.45}" stroke-width="${big ? 2.6 : 1.4}" stroke-linecap="round"/>`; }
  save("clock_ring.svg", svg(400, 400, `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6d2"/><stop offset=".4" stop-color="#e4a63c" stop-opacity=".9"/><stop offset=".7" stop-color="#8a72e0" stop-opacity=".6"/><stop offset="1" stop-color="#ffd877"/></linearGradient></defs>
<circle cx="200" cy="200" r="190" fill="none" stroke="url(#g)" stroke-width="2.2"/><circle cx="200" cy="200" r="160" fill="none" stroke="#c9b9ef" stroke-opacity=".22" stroke-width="1"/>${ticks}
${[0, 90, 180, 270].map((d) => `<polygon points="${pts(star4(...P(200, 200, 190, d - 90), 9, 0.25))}" fill="#ffe7a6"/>`).join("")}`));
}
// 초승달 (금빛 · 은은한 빛)
save("moon.svg", svg(120, 120, `<defs><radialGradient id="h" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2c4" stop-opacity=".55"/><stop offset="1" stop-color="#fff2c4" stop-opacity="0"/></radialGradient><linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset=".6" stop-color="#ffe08a"/><stop offset="1" stop-color="#e4a63c"/></linearGradient><mask id="k"><rect width="120" height="120" fill="#fff"/><circle cx="74" cy="50" r="26" fill="#000"/></mask></defs><circle cx="60" cy="60" r="58" fill="url(#h)"/><circle cx="60" cy="60" r="30" fill="url(#m)" mask="url(#k)"/>`));

// ---------- 찢긴 쪽 (일지 A): 위는 온전, 아래 끝은 들쭉날쭉 — 마스크 ----------
{
  let h = "M0,0 H600 V84"; const m = 46;
  for (let i = m - 1; i >= 0; i--) h += ` L${f((i * 600) / m)},${f(78 + (rnd() - 0.5) * 22 + Math.sin(i * 1.3) * 5)}`;
  save("torn_h.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="100" viewBox="0 0 600 100" preserveAspectRatio="none"><path d="${h} Z" fill="#fff"/></svg>`);
}
// 일지 책갈피 (금실 라벤더 리본 · 아래 V자 뾰족)
save("bookmark.svg", svg(40, 140, `<defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b55d8"/><stop offset=".5" stop-color="#b39bff"/><stop offset="1" stop-color="#6b55d8"/></linearGradient></defs><path d="M4,0 H36 V136 L20,118 L4,136 Z" fill="url(#b)" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/><path d="M9,0 V122 M31,0 V122" stroke="#ffe08a" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M12,4 V110" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>`, ` preserveAspectRatio="none"`));
// 밀랍 봉인 (라벤더 밀랍 · 별 · 「보관」)
save("seal.svg", svg(120, 120, `<defs><radialGradient id="w" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#c7b2ff"/><stop offset=".55" stop-color="#7a5ce0"/><stop offset="1" stop-color="#3e2a8a"/></radialGradient>${SH("d", 4, 3, 0.4)}</defs><g filter="url(#d)">
<path d="${(() => { let s = ""; for (let i = 0; i < 18; i++) { const r = 50 + (i % 2 ? 4 : -2) + rnd() * 5; const p = P(60, 60, r, i * 20); s += (i ? " L" : "M") + f(p[0]) + "," + f(p[1]); } return s + " Z"; })()}" fill="url(#w)" stroke="${OL}" stroke-width="2.4" stroke-linejoin="round"/>
<circle cx="60" cy="60" r="34" fill="none" stroke="#2e1d6a" stroke-opacity=".5" stroke-width="3"/><circle cx="60" cy="60" r="34" fill="none" stroke="#e6dcff" stroke-opacity=".45" stroke-width="1.2" transform="translate(-1,-1)"/>
<polygon points="${pts(star4(60, 52, 15, 0.3))}" fill="#e6dcff" stroke="#2e1d6a" stroke-width="1.4"/>
<text x="60" y="84" text-anchor="middle" font-family="'Malgun Gothic',sans-serif" font-weight="800" font-size="14" fill="#efe8ff" stroke="#2e1d6a" stroke-width="2.4" paint-order="stroke">보관</text>
<path d="M30,40 C36,30 46,24 58,23" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/></g>`));
// 방패 (단정한 시스템 카드 머리: 라벤더 법랑 + 금테 + 되감기 화살)
save("shield.svg", svg(96, 110, `<defs>${GOLD("g")}<linearGradient id="e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b8ff"/><stop offset=".6" stop-color="#7d63dc"/><stop offset="1" stop-color="#4b39a8"/></linearGradient>${SH("d", 4, 3, 0.35)}</defs><g filter="url(#d)">
<path d="M48,4 L88,18 V52 C88,80 70,98 48,106 C26,98 8,80 8,52 V18 Z" fill="url(#g)" stroke="${OL}" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M48,13 L80,24 V52 C80,74 66,89 48,96 C30,89 16,74 16,52 V24 Z" fill="url(#e)" stroke="${OL}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M64,58 A17,17 0 1 1 52,40" fill="none" stroke="#fff6d2" stroke-width="5" stroke-linecap="round"/><path d="M48,30 L60,40 L46,48 Z" fill="#fff6d2" stroke="${OL}" stroke-width="1.4" stroke-linejoin="round"/>
<path d="M22,30 C26,24 34,20 44,19" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".7"/></g>`));
// 접힌 봉투 (손상된 파일 보관)
save("envelope.svg", svg(64, 48, `<defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#e8dcc2"/></linearGradient></defs><rect x="3" y="6" width="58" height="38" rx="4" fill="url(#p)" stroke="${OL}" stroke-width="2"/><path d="M3,10 L32,30 L61,10" fill="none" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><circle cx="32" cy="29" r="6" fill="#8a72e0" stroke="${OL}" stroke-width="1.6"/><polygon points="${pts(star4(32, 29, 4, 0.3))}" fill="#e6dcff"/>`));
// 땀방울
save("drop.svg", svg(20, 28, `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6f3ff"/><stop offset="1" stop-color="#5fa8e8"/></linearGradient></defs><path d="M10,1 C14,9 19,14 19,19 C19,24 15,27 10,27 C5,27 1,24 1,19 C1,14 6,9 10,1 Z" fill="url(#g)" stroke="#3b6fa8" stroke-width="1.4"/><ellipse cx="7" cy="19" rx="2" ry="3" fill="#fff" opacity=".8"/>`));
// 반짝이 별
save("spark.svg", svg(40, 40, `<polygon points="${pts(star4(20, 20, 19, 0.2))}" fill="#fff6d2"/><polygon points="${pts(star4(20, 20, 9, 0.3, -45))}" fill="#fff" opacity=".8"/>`));
// 잠든 고래 메달 (절전 C): 남색 법랑 원 · 금테 · 초승달
save("medal_sleep.svg", svg(120, 120, `<defs>${GOLD("g")}<radialGradient id="e" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#4a3f94"/><stop offset=".7" stop-color="#1c1648"/><stop offset="1" stop-color="#0e0b2a"/></radialGradient>${SH("d", 4, 4, 0.5)}</defs><g filter="url(#d)">
<circle cx="60" cy="60" r="54" fill="url(#g)" stroke="${OL}" stroke-width="2.4"/><circle cx="60" cy="60" r="46" fill="url(#e)" stroke="${OL}" stroke-width="2"/>
${Array.from({ length: 9 }, () => `<circle cx="${f(26 + rnd() * 68)}" cy="${f(24 + rnd() * 40)}" r="${f(0.8 + rnd() * 1.3)}" fill="#fff6d2" opacity="${f(0.5 + rnd() * 0.5)}"/>`).join("")}
<path d="M30,40 C36,30 46,24 60,22" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".35"/></g>`));

rmSync(tmp, { recursive: true, force: true });
console.log("ok");
