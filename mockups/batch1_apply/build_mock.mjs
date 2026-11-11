// 시안(batch1_heroes · batch1_rev)의 고른 장면을 1280×720 · 1600×720 한 장씩 찍는다 (시안 ↔ 게임 비교용, mock/*.jpg).
// 시안 HTML을 임시 폴더에 복사해(같은 그림을 쓰도록 <base>) 상태 단추를 누른 뒤 그 장면(.scr)만 화면 원점에 원래 크기로 두고,
// 움직임을 끝 시각에 멈춰 Chrome(없으면 Edge) 헤드리스로 찍는다.  node design/mockups/feedback70/batch1_apply/build_mock.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "mock");
mkdirSync(out, { recursive: true });
const browser = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const tmp = mkdtempSync(join(tmpdir(), "batch1-mock-"));

// batch1_heroes: [.scr 번호, 누를 상태 단추 [묶음, 키, 값]..., 이름]
const HEROES = [
  ...["heroes", "formation", "summon", "adventure", "school", "shop"].map(h => [0, [["hub_frame", "hub", h]], `frame_${h}`]),
  [5, [], "list"],
  ...["serena", "aria", "karen", "flora"].map(p => [6, [["growth", "pick", p]], `grow_${p}`]),
  [9, [], "gear"],
  [12, [["awaken", "who", "ss"], ["awaken", "st", "3"]], "awaken_ss"],
  [12, [["awaken", "who", "s"], ["awaken", "st", "3"]], "awaken_s"],
  [12, [["awaken", "who", "myth"], ["awaken", "st", "max"]], "awaken_myth"],
];
// batch1_rev: 연성 결과 A의 상태
const REV = ["up", "merge", "chain", "none", "pot"];

function shoot(name, w, html) {
  const page = join(tmp, `${name}_${w}.html`);
  writeFileSync(page, html);
  const png = join(tmp, `${name}_${w}x720.png`);
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
    `--window-size=${w},720`, "--virtual-time-budget=6000", `--screenshot=${png}`, pathToFileURL(page).href], { stdio: "ignore" });
  const jpg = join(out, `${name}_${w}x720.jpg`);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", png, "-q:v", "4", jpg]);
  console.log("MOCK", jpg);
}

const lift = (pick, w) => `<script>
addEventListener('load', () => {
  ${pick}
  const s = __scr;
  s.classList.remove('go'); void s.offsetWidth; s.classList.add('go');
  s.style.transform = 'none';
  s.style.position = 'fixed';
  s.style.left = '0'; s.style.top = '0';
  document.body.innerHTML = '';
  document.body.style.margin = '0';
  document.body.appendChild(s);
  setTimeout(() => document.getAnimations().forEach(a => { try { a.currentTime = 2600; a.pause(); } catch (e) {} }), 60);
});
</script></body>`;

for (const [n, states, name] of HEROES) {
  const dir = join(here, "..", "batch1_heroes");
  const base = pathToFileURL(dir).href + "/";
  for (const w of [1280, 1600]) {
    const clicks = states.map(([g, k, v]) => `document.querySelector('.states[data-group="${g}"] button[data-k="${k}"][data-v="${v}"]')?.click();`).join("\n  ");
    const pick = `document.querySelector('.bar [data-res="${w}"]')?.click();
  document.documentElement.style.setProperty('--w', ${w}); document.documentElement.dataset.w = '${w}';
  ${clicks}
  const __scr = document.querySelectorAll('.scr')[${n}];`;
    const html = readFileSync(join(dir, "index.html"), "utf8").replace("<head>", `<head><base href="${base}">`).replace("</body>", lift(pick, w));
    shoot(name, w, html);
  }
}
for (const st of REV) {
  const dir = join(here, "..", "batch1_rev");
  const base = pathToFileURL(dir).href + "/";
  for (const w of [1280, 1600]) {
    const pick = `W = ${w}; build();
  const __scr = document.querySelector('.vp[data-o="A"][data-s="${st}"] .scr');`;
    const html = readFileSync(join(dir, "index.html"), "utf8").replace("<head>", `<head><base href="${base}">`).replace("</body>", lift(pick, w));
    shoot(`merge_${st}`, w, html);
  }
}
rmSync(tmp, { recursive: true, force: true });
