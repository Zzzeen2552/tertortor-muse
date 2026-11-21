// studio-chat.mjs: the Chat panel in TERTORTOR Studio, TERTORTOR MUSE edition. Muse (Meta's agent in Muse.app) is the
// one who works in this folder, and Muse.app has no headless mode a script can drive. So a message sent from the panel
// is handed over to Muse.app: the text (with the "[Studio: …]" page line) goes to the clipboard, Muse.app comes to the
// front (macOS: open -a; Windows: Start menu app), and the user pastes it (⌘V / Ctrl+V, Enter). With MUSE_AUTOPASTE=1 in .env Studio also pastes and sends it through
// System Events (macOS only; needs Accessibility permission for the app that runs Studio).
// Muse reads MUSE.md for every workflow here; its answers stay in Muse.app.
// State in .studio-chat.json (gitignored): { messages: [{ role: user|info|error, text, at }] }.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, renameSync, mkdirSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ROOT } from "./lib.mjs";

const FILE = join(ROOT, ".studio-chat.json");
const ARCHIVE = join(ROOT, ".studio-chat");
const APP = process.env.MUSE_APP || "Muse";
const MAX_MESSAGES = 400;

function load() {
  try { return JSON.parse(readFileSync(FILE, "utf8")); } catch { return { messages: [] }; }
}
function save(s) {
  s.messages = s.messages.slice(-MAX_MESSAGES);
  writeFileSync(FILE + ".tmp", JSON.stringify(s, null, 1));
  renameSync(FILE + ".tmp", FILE);
}
function push(msg) { const s = load(); s.messages.push({ ...msg, at: new Date().toISOString() }); save(s); }

export function state() {
  const s = load();
  return { sessionId: null, running: false, startedAt: null, queued: [], messages: s.messages, engine: "muse-app" };
}

// Windows: clip.exe garbles UTF-8 (…, é); PowerShell reads a UTF-8 temp file and sets the clipboard as Unicode
function copy(text) {
  if (process.platform === "darwin") return spawnSync("pbcopy", [], { input: text }).status === 0;
  if (process.platform === "win32") {
    const f = join(tmpdir(), `tertortor-chat-${process.pid}.txt`);
    writeFileSync(f, text, "utf8");
    try {
      return spawnSync("powershell", ["-NoProfile", "-Command", `Get-Content -Raw -Encoding UTF8 -LiteralPath '${f.replace(/'/g, "''")}' | Set-Clipboard`], { windowsHide: true }).status === 0;
    } finally { try { unlinkSync(f); } catch {} }
  }
  return spawnSync("xclip", ["-selection", "clipboard"], { input: text }).status === 0;
}

// macOS: open -a Muse. Windows: Muse from the Start menu by its AppID (Get-StartApps), name in MUSE_APP (default "Muse")
function openMuse() {
  if (process.platform === "darwin") return spawnSync("open", ["-a", APP], {}).status === 0;
  if (process.platform === "win32") {
    const ps = `$a = Get-StartApps | Where-Object { $_.Name -eq '${APP.replace(/'/g, "''")}' } | Select-Object -First 1; if ($a) { Start-Process ('shell:AppsFolder\\' + $a.AppID); exit 0 } else { exit 1 }`;
    return spawnSync("powershell", ["-NoProfile", "-Command", ps], { windowsHide: true }).status === 0;
  }
  return false;
}

// paste + Enter into the front window (Muse.app, just activated); refused without Accessibility permission
function autoPaste() {
  if (process.platform !== "darwin" || process.env.MUSE_AUTOPASTE !== "1") return false;
  const script = `delay 0.8
tell application "System Events"
  keystroke "v" using command down
  delay 0.2
  key code 36
end tell`;
  return spawnSync("osascript", ["-e", script], {}).status === 0;
}

export function send(text, context = "") {
  text = String(text || "").trim();
  if (!text) throw new Error("Pesan kosong.");
  if (text.length > 20000) throw new Error("Pesan terlalu panjang.");
  context = String(context || "").slice(0, 300);
  push({ role: "user", text });
  const full = `${context ? `[Studio: ${context}]\n\n` : ""}${text}\n\n(Dari panel Chat TERTORTOR MUSE, folder ${ROOT}. Ikuti MUSE.md.)`;
  if (!copy(full)) { push({ role: "error", text: "Gagal menyalin pesan ke clipboard." }); return state(); }
  const opened = openMuse();
  if (opened && autoPaste()) push({ role: "info", text: "Terkirim ke Muse.app. Jawaban Muse ada di Muse.app." });
  else if (opened) push({ role: "info", text: `Pesan sudah disalin dan Muse dibuka: tempel (${process.platform === "darwin" ? "⌘V" : "Ctrl+V"}) lalu Enter. Jawaban Muse ada di aplikasi Muse.` });
  else push({ role: "info", text: "Pesan sudah disalin. Buka aplikasi Muse, tempel, lalu Enter." });
  return state();
}

export function stop() { return state(); }

export function reset() {
  const s = load();
  if (s.messages.length) {
    mkdirSync(ARCHIVE, { recursive: true });
    writeFileSync(join(ARCHIVE, `${new Date().toISOString().replace(/[:.]/g, "-")}.json`), JSON.stringify(s, null, 1));
  }
  save({ messages: [] });
  return state();
}
