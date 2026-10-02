import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
function loadEnv(p) {
  const v = {};
  try {
    for (const l of readFileSync(p, "utf8").split(/\r?\n/)) {
      const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !l.trim().startsWith("#")) v[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {}
  return v;
}

const env = { ...loadEnv(resolve(__dirname, "../../.env")), ...loadEnv(resolve(__dirname, "../.env")) };

async function testGemini(model) {
  const key = env.GEMINI_API_KEY;
  if (!key) return { model, ok: false, error: "no key" };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "Answer in 5 words: What is acceleration?" }] }],
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { model, ok: false, status: res.status, error: data?.error?.message || JSON.stringify(data) };
    }
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return { model, ok: true, reply: text?.trim() };
  } catch (err) {
    return { model, ok: false, error: err.message };
  }
}

async function run() {
  console.log("=== Testing Gemini Models ===");
  const geminiModels = [
    "gemini-flash-latest",
    "gemini-2.0-flash",
    "gemini-2.0-flash-001",
    "gemini-2.5-flash",
    "gemini-3.6-flash",
    "gemini-1.5-flash",
    "gemini-pro"
  ];
  for (const m of geminiModels) {
    const r = await testGemini(m);
    console.log(`Gemini ${m}:`, r.ok ? `✅ ${r.reply}` : `❌ ${r.error?.slice(0, 100)}`);
  }
}

run();
