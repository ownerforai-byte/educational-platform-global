#!/usr/bin/env node
// scripts/graphify.mjs — cross-platform wrapper for the graphify CLI.
// Usage: node scripts/graphify.mjs <graphify args...>   (or: npm run graphify -- <args>)
// Locates the graphify executable (uv tool / pipx / PATH) and forwards.

import { execSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

function findExe(name) {
  const home = os.homedir();
  const candidates = [
    path.join(home, ".local", "bin", name + (process.platform === "win32" ? ".exe" : "")),
    path.join(home, ".local", "bin", name),
    path.join(home, ".local", "share", "uv", "tools", name, "bin", name + (process.platform === "win32" ? ".exe" : "")),
    path.join(home, "bin", name),
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  // fall back to PATH
  try {
    const out = execSync(process.platform === "win32" ? `where ${name} 2>nul` : `command -v ${name} 2>/dev/null`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim()
      .split(/\r?\n/)[0];
    if (out && fs.existsSync(out)) return out;
  } catch {}
  return null;
}

const exe = findExe("graphify");
const args = process.argv.slice(2);
if (!exe) {
  console.error(
    "[graphify] CLI not found. Install it with:  uv tool install graphifyy   (or: pipx install graphifyy)\n" +
      `[graphify] Then the binary is at one of: ${os.homedir()}/.local/bin/graphify${process.platform === "win32" ? ".exe" : ""}\n`
  );
  process.exit(1);
}
const cmd = `"${exe}" ${args.map((a) => `"${a.replace(/"/g, '\\"')}"`).join(" ")}`;
try {
  execSync(cmd, { stdio: "inherit", cwd: process.cwd() });
} catch (e) {
  process.exit(e.status ?? 1);
}
