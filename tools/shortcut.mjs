// shortcut.mjs: the "TERTORTOR MUSE" shortcut on this user's Desktop, made or refreshed automatically.
//   node tools/shortcut.mjs [--quiet] [--force]
// Runs after `npm install` (package.json postinstall, which also turns on .githooks) and after every `git pull`
// (.githooks/post-merge, post-rewrite), so a fresh clone or an update always leaves a working shortcut.
// - Windows: tools/install-shortcut.ps1 (TERTORTOR MUSE.lnk → tools/tertortor.cmd, icon tools/tertortor.ico).
// - macOS: ~/Desktop/TERTORTOR MUSE.app, an AppleScript applet (osacompile) that restarts the Studio server on 4341
//   (only a node process on that port is stopped) so it runs the latest code, then opens http://localhost:4341.
//   Icon from tools/tertortor.ico (sips). Rebuilt only when this folder or the launcher script changes (stamp file),
//   or with --force.
// Never fails the caller: a pull or npm install must not stop because the Desktop shortcut could not be made.
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const NAME = "TERTORTOR MUSE";
const PORT = 4341;
const quiet = process.argv.includes("--quiet");
const force = process.argv.includes("--force");
const say = (m) => { if (!quiet) console.log(m); };

function windows() {
  const r = spawnSync("powershell", ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", join(ROOT, "tools", "install-shortcut.ps1")], { encoding: "utf8", windowsHide: true });
  if (r.status === 0) say(r.stdout.trim()); else say(`shortcut: gagal (${(r.stderr || r.error?.message || "").trim().slice(0, 200)})`);
}

// AppleScript string literal
const q = (s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
// shell single-quoted
const sq = (s) => `'${s.replace(/'/g, `'\\''`)}'`;

function mac() {
  const app = join(homedir(), "Desktop", `${NAME}.app`);
  const sh = [
    "export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH",
    `cd ${sq(ROOT)} || exit 1`,
    // restart = the latest code after a pull (same as tools/tertortor.cmd on Windows). Stop this folder's Studio only:
    // npm, the node --watch parent and the server, matched by command AND working folder (LITE/MOTION run the same
    // command from their own folders and are left alone)
    `for p in $(pgrep -f '^(npm run studio( |$)|node --watch tools/studio/server.mjs$|[^ ]*node tools/studio/server.mjs$)'); do [ "$(lsof -a -p "$p" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p')" = "$PWD" ] && kill "$p" 2>/dev/null; done`,
    `for i in $(seq 1 10); do lsof -tiTCP:${PORT} -sTCP:LISTEN >/dev/null || break; sleep 0.5; done`,
    `nohup npm run studio > "\${TMPDIR:-/tmp}/tertortor-muse-studio.log" 2>&1 < /dev/null &`,
    `for i in $(seq 1 30); do curl -s -o /dev/null http://localhost:${PORT} && break; sleep 1; done`,
  ].join("\n");
  const script = `-- ${NAME}: start Studio (${ROOT}) and open it\ndo shell script ${q(sh)}\nopen location "http://localhost:${PORT}"\n`;
  const icon = join(ROOT, "tools", "tertortor.ico");
  const stamp = createHash("sha1").update(script).update(existsSync(icon) ? readFileSync(icon) : "").digest("hex").slice(0, 12);
  const stampFile = join(app, "Contents", "Resources", "tertortor-muse.stamp");
  if (!force && existsSync(stampFile) && readFileSync(stampFile, "utf8").trim() === stamp) return say(`shortcut: ${app} sudah terbaru`);

  const tmp = mkdtempSync(join(tmpdir(), "tertortor-shortcut-"));
  try {
    const src = join(tmp, "launcher.applescript");
    writeFileSync(src, script);
    const built = join(tmp, `${NAME}.app`);
    const c = spawnSync("osacompile", ["-o", built, src], { encoding: "utf8" });
    if (c.status !== 0) return say(`shortcut: osacompile gagal (${c.stderr.trim().slice(0, 200)})`);
    if (existsSync(icon)) {
      const png = join(tmp, "icon.png"), icns = join(tmp, "icon.icns");
      const ok = spawnSync("sips", ["-s", "format", "png", icon, "--out", png]).status === 0
        && spawnSync("sips", ["-s", "format", "icns", png, "--out", icns]).status === 0;
      if (ok) {
        copyFileSync(icns, join(built, "Contents", "Resources", "applet.icns"));
        rmSync(join(built, "Contents", "Resources", "Assets.car"), { force: true }); // newer osacompile prefers it over applet.icns
      }
    }
    writeFileSync(join(built, "Contents", "Resources", "tertortor-muse.stamp"), stamp + "\n");
    // replace only our own app (it carries the stamp file or has our name and an applet inside)
    if (existsSync(app)) rmSync(app, { recursive: true, force: true });
    const mv = spawnSync("ditto", [built, app]);
    if (mv.status !== 0) return say("shortcut: gagal menyalin ke Desktop");
    spawnSync("touch", [app]); // Finder refreshes the icon
    say(`shortcut: ${app}`);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

try {
  if (process.env.TERTORTOR_NO_SHORTCUT === "1") say("shortcut: dilewati (TERTORTOR_NO_SHORTCUT=1)");
  else if (process.platform === "win32") windows();
  else if (process.platform === "darwin") mac();
  else say("shortcut: hanya untuk Windows dan macOS");
} catch (e) {
  say(`shortcut: gagal (${e.message})`);
}
