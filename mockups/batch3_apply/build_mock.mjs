// 시안(batch3_return)의 PD 고른 안(D3-1 C · D3-2 C · D3-4 C)을 상태마다 1280×720 · 1600×720 한 장씩 찍는다 (mock/*.jpg).
// 시안 HTML을 임시 폴더에 복사해(<base>로 같은 그림) 폭 · 상태 단추를 누른 뒤 그 장면(.scr)만 원래 크기로 두고 움직임을 멈춰 찍는다.
//   node design/mockups/feedback70/batch3_apply/build_mock.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "mock");
mkdirSync(out, { recursive: true });
const browser = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const tmp = mkdtempSync(join(tmpdir(), "batch3-mock-"));
const dir = join(here, "..", "batch3_return");
const base = pathToFileURL(dir).href + "/";
// [이름, 섹션, 상태 단추 data-st, 고른 안, 멈출 시각(ms)]
const SHOTS = [
  ["ask", "d31", "", "d31_c", 2600], ["guide_ask", "d31", "q", "d31_c", 2600],
  ["short_s1", "d32", "s1", "d32_c", 1600], ["short_s3", "d32", "s3", "d32_c", 1600],
  ["reward", "d34", "", "d34_c", 3000], ["reward_record", "d34", "rc", "d34_c", 3000], ["guide_reward", "d34", "qd", "d34_c", 5600],
];
for (const [name, scn, st, pick, at] of SHOTS) {
  for (const w of [1280, 1600]) {
    const js = `<script>addEventListener('load', () => {
  ${w === 1600 ? "document.querySelector('#wsel [data-w=\"1600\"]').click();" : ""}
  document.querySelector('section[data-scn="${scn}"] .st button[data-st="${st}"]').click();
  const s = document.querySelector('.opt[data-choice="${pick}"] .scr');
  s.style.transform = 'none'; s.style.position = 'fixed'; s.style.left = '0'; s.style.top = '0';
  document.body.innerHTML = ''; document.body.style.margin = '0'; document.body.appendChild(s);
  setTimeout(() => document.getAnimations().forEach(a => { try { a.currentTime = ${at}; a.pause(); } catch (e) {} }), 60);
});</script></body>`;
    const page = join(tmp, `${name}_${w}.html`);
    writeFileSync(page, readFileSync(join(dir, "index.html"), "utf8").replace("<head>", `<head><base href="${base}">`).replace("</body>", js));
    const png = join(tmp, `${name}_${w}.png`);
    execFileSync(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      `--window-size=${w},720`, "--virtual-time-budget=6000", `--screenshot=${png}`, pathToFileURL(page).href], { stdio: "ignore" });
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", png, "-q:v", "4", join(out, `${name}_${w}x720.jpg`)]);
    console.log("MOCK", name, w);
  }
}
rmSync(tmp, { recursive: true, force: true });
