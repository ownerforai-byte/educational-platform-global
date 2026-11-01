import { spawn } from "node:child_process";
import { once } from "node:events";
import { test } from "node:test";
import assert from "node:assert/strict";

const childProcess = (script, args = []) => spawn(process.execPath, [script, ...args], { stdio: ["pipe", "pipe", "pipe"] });

test("cost CLI exits while stdin remains open", { timeout: 5000 }, async (t) => {
  const child = childProcess("scripts/tokenkit/cost.mjs", ["route", "find a symbol", "--json"]);
  t.after(() => child.kill());
  let output = "";
  child.stdout.on("data", chunk => { output += chunk; });
  const [code] = await once(child, "exit");
  assert.equal(code, 0);
  assert.ok(output.includes("model"));
});

test("MCP server responds to a JSON-RPC initialize request", { timeout: 5000 }, async (t) => {
  const child = childProcess("scripts/tokenkit/harmony-mcp.mjs");
  t.after(() => child.kill());
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize" }) + "\n");
  const [chunk] = await once(child.stdout, "data");
  const response = JSON.parse(chunk.toString().trim());
  assert.equal(response.id, 1);
  assert.equal(response.result.serverInfo.name, "tokenkit-harmony");
  child.stdin.end();
  const [code] = await once(child, "exit");
  assert.equal(code, 0);
});

test("pack_context returns bounded preview without complete text", { timeout: 5000 }, async (t) => {
  const child = childProcess("scripts/tokenkit/harmony-mcp.mjs");
  t.after(() => child.kill());
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "pack_context", arguments: { target: "scripts/tokenkit/cost.mjs" } } }) + "\n");
  const [chunk] = await once(child.stdout, "data");
  const payload = JSON.parse(JSON.parse(chunk.toString().trim()).result.content[0].text);
  assert.ok(payload.preview.length <= 800);
  assert.ok(payload.rawTokens > 0);
  assert.equal(Object.hasOwn(payload, "text"), false);
  child.stdin.end();
  const [code] = await once(child, "exit");
  assert.equal(code, 0);
});

test("typescript parser and explicit extension imports work", async () => {
  const { loadTS, parseSymbols } = await import("../lib.mjs");
  const { consumersOf } = await import("../graph-core.mjs");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tokenkit-test-"));
  try {
    const file = path.join(dir, "sample.ts");
    fs.writeFileSync(file, "let later;\nexport const answer = () => 42;\nexport function read() { return answer(); }\n");
    const ts = loadTS();
    assert.ok(ts);
    const jsx = path.join(dir, "component.tsx");
    fs.writeFileSync(jsx, "export const View = () => <div>{42}</div>;\n");
    assert.ok(parseSymbols(jsx, "component.tsx", ts).some(s => s.name === "View"));
    const symbols = parseSymbols(file, "sample.ts", ts);
    assert.ok(symbols.some(s => s.name === "answer" && s.startLine === 2));
    assert.ok(symbols.some(s => s.name === "read" && s.startLine === 3));
    assert.ok(consumersOf("scripts/tokenkit/lib.mjs").some(c => (typeof c === "string" ? c : c.file) === "scripts/tokenkit/cost.mjs"));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
