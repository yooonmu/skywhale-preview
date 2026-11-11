// 묶음 6 적용 비교 페이지 영상 (design/mockups/feedback70/batch6_apply/media).
// 입력: tools/batch6_apply_capture.gd 가 B6_RAW 에 남긴 <before|after>_<이름>_<W>/NNNN.jpg + times.txt (찍은 순간, 초)
// 찍는 틈이 고르지 않아 times.txt 로 칸마다 길이를 주고 30fps 로 고르게 묶는다.
// 영상은 H.264 · 텔레비전 범위(16~235) · BT.709 태그 (전체 범위 RGB 그대로면 브라우저마다 검정 · 흰색이 들뜨거나 뭉개진다)
// node design/mockups/feedback70/batch6_apply/build_media.mjs <raw>
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const raw = resolve(process.argv[2]);
const site = dirname(fileURLToPath(import.meta.url));
const out = join(site, "media");
mkdirSync(out, { recursive: true });
const ff = (args) => execFileSync(process.env.FFMPEG || "ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
const TV = ["-vf", "fps=30,scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p",
  "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"];

const made = [];
for (const tag of ["before", "after"]) {
  for (const name of ["school_open", "school_done", "whale_up", "note_room", "note_both"]) {
    for (const w of [1280, 1600]) {
      const dir = join(raw, `${tag}_${name}_${w}`);
      if (!existsSync(join(dir, "times.txt"))) continue;
      const t = readFileSync(join(dir, "times.txt"), "utf8").trim().split(/\r?\n/).map(Number);
      const lines = ["ffconcat version 1.0"];
      t.forEach((v, i) => {
        lines.push(`file '${join(dir, String(i).padStart(4, "0") + ".jpg").replace(/\\/g, "/")}'`);
        lines.push(`duration ${Math.max(0.005, (t[i + 1] ?? v + 1 / 30) - v).toFixed(4)}`);
      });
      const list = join(dir, "list.ffconcat");
      writeFileSync(list, lines.join("\n") + "\n");
      const base = join(out, `${tag}_${name}_${w}`);
      // 16편 합계 25MB 안: crf 28 + 그림 화면용 조율 (판 · 글자 가장자리는 유지, 전투 잡티만 줄어든다)
      ff(["-f", "concat", "-safe", "0", "-i", list, ...TV, "-c:v", "libx264", "-crf", process.env.CRF || "28", "-preset", "slow", "-tune", "animation",
        "-movflags", "+faststart", "-an", base + ".mp4"]);
      ff(["-i", join(dir, "0000.jpg"), "-q:v", "4", base + ".jpg"]);
      made.push(`${tag}_${name}_${w} ${t.length}f ${t.at(-1).toFixed(2)}s`);
    }
  }
}
console.log("B6 MEDIA ok\n" + made.join("\n"));
