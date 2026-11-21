// gemini-api.mjs: one call to the Gemini API (key in .env GEMINI_API_KEY), used by tools/stories.mjs (Musafo story
// library), captions, and translations. Model + fallbacks: brand.json → gemini.
// TERTORTOR MUSE: there is no headless second engine. Muse.app (Meta) cannot be called from a script, so when every
// Gemini model fails the request stops with a clear message; ask Muse in Muse.app to write the text instead.
import { readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { tmpdir } from "node:os";
import { ROOT, die, loadBrand } from "./lib.mjs";

export const MODEL = loadBrand().gemini?.model ?? "gemini-2.5-flash";
const MODELS = [MODEL, ...(loadBrand().gemini?.fallback ?? [])];

const parseOut = (out, json) => (json ? JSON.parse(out.replace(/^[\s\S]*?```json\s*|```[\s\S]*$/g, "").trim()) : out.replace(/^```\w*\s*|```$/g, "").trim());

// soft: throw instead of exiting (Studio server calls this; a failed translation must not stop the server)
function failed(req, why) {
  const msg = `${why}. Minta Muse menuliskannya di Muse.app.`;
  if (req.soft) throw new Error(msg);
  die(msg);
}

// every Gemini model over quota: skip Gemini for an hour instead of trying 4 models before failing
const QUOTA = join(tmpdir(), "tertortor-gemini-quota.json");
const quotaUntil = () => { try { return JSON.parse(readFileSync(QUOTA, "utf8")).until ?? 0; } catch { return 0; } };

export async function gemini({ system, text, image, json, soft }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return failed({ system, text, image, json, soft }, `GEMINI_API_KEY belum ada di ${join(ROOT, ".env")}`);
  if (quotaUntil() > Date.now()) return failed({ system, text, image, json, soft }, `kuota Gemini habis (dicek ulang setelah ${new Date(quotaUntil()).toLocaleTimeString()})`);
  const parts = [{ text }];
  if (image) parts.push({ inline_data: { mime_type: extname(image).toLowerCase() === ".png" ? "image/png" : "image/jpeg", data: readFileSync(image).toString("base64") } });
  const body = {
    system_instruction: { parts: [{ text: system }] },
    contents: [{ role: "user", parts }],
    generationConfig: { temperature: 0.7, ...(json ? { responseMimeType: "application/json" } : {}) },
  };
  // 503 "high demand" is usually gone within seconds: retry. 429 = this model's quota is used up: try the next model
  // in brand.json → gemini.fallback (quotas are per model).
  let r, j, used;
  for (const m of MODELS) {
    used = m;
    // soft (Studio, someone waiting on a button): one 25 s try per model, then the next model
    for (let i = 0; i < (soft ? 1 : 3); i++) {
      // a hung request must not stall a whole book scan: give up after 3 minutes and treat it like "busy"
      try {
        r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, { method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": key }, body: JSON.stringify(body), signal: AbortSignal.timeout(soft ? 25000 : 180000) });
        j = await r.json();
      } catch (e) {
        r = { status: 503, ok: false };
        j = { error: { message: `no answer (${e.name})` } };
      }
      if (r.status !== 503) break;
      if (i < 2) await new Promise((ok) => setTimeout(ok, 3000 * 2 ** i));
    }
    if (r.status !== 429 && r.status !== 503) break;
    console.log(`  gemini ${m}: ${r.status}, trying the next model`);
  }
  // every Gemini model over quota / busy (or another API error): stop here
  if (r.status === 429) try { writeFileSync(QUOTA, JSON.stringify({ until: Date.now() + 3600e3 })); } catch {}
  if (!r.ok) return failed({ system, text, image, json, soft }, `Gemini ${r.status}: ${(j.error?.message ?? JSON.stringify(j)).slice(0, 160)}`);
  const out = (j.candidates?.[0]?.content?.parts ?? []).map((p) => p.text ?? "").join("").trim();
  if (!out) return failed({ system, text, image, json, soft }, `Gemini returned no text (${j.candidates?.[0]?.finishReason ?? "?"})`);
  const tokens = j.usageMetadata?.totalTokenCount;
  if (tokens) console.log(`  gemini ${used}: ${tokens} tokens`);
  return parseOut(out, json);
}
