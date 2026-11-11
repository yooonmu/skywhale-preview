// 시안(summon_c · summon_flow_na)의 장면을 1280×720 · 1600×720 한 장씩으로 찍는다 (시안 ↔ 게임 비교용, mock/).
// 시안 HTML을 임시 폴더에 복사해(같은 그림을 쓰도록 <base>) 그 장면(.scr)만 화면에 원래 크기로 두고, 움직임을 정한 시각(ms)에 멈춘 뒤
// Edge(없으면 Chrome) 헤드리스로 찍는다.  node design/mockups/feedback70/summon_apply/build_mock.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync, mkdtempSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "mock");
mkdirSync(out, { recursive: true });
const browser = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Google/Chrome/Application/chrome.exe"].find(existsSync);
const tmp = mkdtempSync(join(tmpdir(), "summon-mock-"));

// [시안 폴더, .scr 번호, 멈출 시각(ms), 이름]
const SHOTS = [
  ["summon_c", 0, 2600, "c_flora"],
  ["summon_c", 1, 2600, "c_aria"],
  ["summon_c", 2, 2600, "c_ignis"],
  ["summon_c", 3, 2600, "c_serena"],
  ["summon_flow_na", 0, 2100, "na_paint"],
  ["summon_flow_na", 1, 700, "na_grades"],
  ["summon_flow_na", 2, 3300, "na_ss_line"],
  ["summon_flow_na", 3, 3300, "na_ss_reveal"],
  ["summon_flow_na", 4, 1300, "na_dupe_stamp"],
  ["summon_flow_na", 4, 2600, "na_dupe_crumble"],
  ["summon_flow_na", 4, 5400, "na_dupe_toast"],
  ["summon_flow_na", 5, 1400, "na_ten_stamp"],
  ["summon_flow_na", 5, 2500, "na_ten_crumble"],
  ["summon_flow_na", 5, 7200, "na_ten_sum"],
];

for (const [dir, n, t, name] of SHOTS) {
  const src = join(here, "..", dir, "index.html");
  const base = pathToFileURL(join(here, "..", dir) + "/").href;
  for (const w of [1280, 1600]) {
    let html = readFileSync(src, "utf8").replace("<head>", `<head><base href="${base}">`);
    html = html.replace("</body>", `<script>
addEventListener('load', () => {
  document.documentElement.style.setProperty('--w', ${w});
  const s = document.querySelectorAll('.scr')[${n}];
  s.classList.add('go');
  s.style.transform = 'none';
  s.style.position = 'fixed';
  s.style.left = '0'; s.style.top = '0';
  document.body.innerHTML = '';
  document.body.style.margin = '0';
  document.body.appendChild(s);
  requestAnimationFrame(() => document.getAnimations().forEach(a => { a.currentTime = ${t}; a.pause(); }));
});
</script></body>`);
    const page = join(tmp, `${name}_${w}.html`);
    writeFileSync(page, html);
    const png = join(out, `${name}_${w}x720.png`);
    execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      `--window-size=${w},720`, "--virtual-time-budget=4000", `--screenshot=${png}`, pathToFileURL(page).href], { stdio: "ignore" });
    console.log("MOCK", png);
  }
}
