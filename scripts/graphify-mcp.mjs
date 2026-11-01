#!/usr/bin/env node
// scripts/graphify-mcp.mjs — launches the graphify MCP server over stdio.
// Usage: npm run graphify:mcp   (agents connect this as an MCP server)
// Or manual: graphify-mcp --graph graphify-out/graph.json

import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

function findExe(name) {
  const home = os.homedir();
  const candidates = [
    path.join(home, ".local", "bin", name + (process.platform === "win32" ? ".exe" : "")),
    path.join(home, ".local", "bin", name),
    path.join(home, ".local", "share", "uv", "tools", name, "bin", name + (process.platform === "win32" ? ".exe" : "")),
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  return name; // fall back to PATH
}

const exe = findExe("graphify-mcp");
const args = process.argv.slice(2);
const child = spawn(exe, ["--graph", "graphify-out/graph.json", ...args], {
  stdio: "inherit",
  cwd: process.cwd(),
});
child.on("close", (code) => process.exit(code ?? 0));
