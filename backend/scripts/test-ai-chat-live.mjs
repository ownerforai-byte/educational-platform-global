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

const env = { ...loadEnv(resolve(__dirname, "../.env")) };
for (const [k, v] of Object.entries(env)) {
  process.env[k] = v;
}

// Dynamically import the compiled or TS service
async function testService() {
  const { AIService } = await import("../dist/ai/service.js");
  const ai = new AIService();
  console.log("Providers available:", ai.getProviders());
  console.log("Default provider:", ai.getDefaultProvider());

  console.log("\nTesting AI Chat response for physics question...");
  const reply = await ai.chat("gemini", [
    { role: "user", content: "What is Newton's second law of motion? Give formula and 1 sentence explanation." }
  ]);
  console.log("\nAI Reply:\n", reply);
}

testService().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
