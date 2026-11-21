// setup-hooks.mjs (package.json postinstall): turn on the repo's own git hooks (.githooks/) for this clone, then make
// the Desktop shortcut. Git does not copy hooks on clone, so `npm install` is what switches them on: from then on every
// `git pull` refreshes the shortcut (.githooks/post-merge, post-rewrite). Never fails npm install.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
try {
  if (existsSync(join(ROOT, ".git"))) {
    const r = spawnSync("git", ["config", "core.hooksPath", ".githooks"], { cwd: ROOT, encoding: "utf8", windowsHide: true });
    console.log(r.status === 0 ? "git hooks: .githooks aktif (shortcut diperbarui setiap git pull)" : `git hooks: gagal (${(r.stderr || "").trim()})`);
  }
  spawnSync(process.execPath, [join(ROOT, "tools", "shortcut.mjs")], { cwd: ROOT, stdio: "inherit", windowsHide: true });
} catch (e) {
  console.log(`setup-hooks: ${e.message}`);
}
