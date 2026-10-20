#!/usr/bin/env node
/**
 * Repair a malformed JSON content file.
 *
 * The content pipeline writes JSON from generated payloads, and a truncated
 * write (interrupted generator, bad string escaping, BOM from a Windows edit)
 * leaves a file that JSON.parse refuses. This tool recovers what it can
 * without inventing content:
 *
 *   1. strips a UTF-8 BOM
 *   2. replaces raw control characters that leaked inside string literals
 *      (a literal newline inside a JSON string is invalid JSON)
 *   3. closes a truncated array/object at the end of the file
 *   4. reports whether the result parses, and with --write rewrites the file
 *      as pretty-printed JSON
 *
 * It never adds, removes or rewrites *content* — a payload that is present
 * stays present, and a payload that is missing stays missing. Backfilling
 * authored material is content work, not repair work.
 *
 * Usage:
 *   node scripts/repair-json.mjs <file>            # report only
 *   node scripts/repair-json.mjs <file> --write    # repair in place
 *   node scripts/repair-json.mjs <file> --check    # exit 1 if unrepairable
 *
 * Exit codes: 0 = valid (or repaired successfully with --write), 1 = still
 * invalid JSON, 2 = usage error.
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const write = args.includes("--write");
const check = args.includes("--check");
const target = args.find((arg) => !arg.startsWith("--"));

if (!target) {
  console.error("usage: node scripts/repair-json.mjs <file> [--write] [--check]");
  process.exit(2);
}

const file = path.resolve(process.cwd(), target);
if (!fs.existsSync(file)) {
  console.error(`not found: ${file}`);
  process.exit(2);
}

const original = fs.readFileSync(file, "utf8");
const changes = [];

/** 1. BOM */
let text = original;
if (text.charCodeAt(0) === 0xfeff) {
  text = text.slice(1);
  changes.push("stripped UTF-8 BOM");
}

/**
 * 2. Raw control characters inside string literals.
 * A literal newline or tab inside a JSON string is invalid; the escape form
 * (\n, \t) is what the format requires.
 */
function escapeControlCharsInStrings(source) {
  let inString = false;
  let escaped = false;
  let out = "";
  let fixed = 0;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (escaped) {
      out += char;
      escaped = false;
      continue;
    }
    if (char === "\\") {
      out += char;
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      out += char;
      continue;
    }
    if (inString && (char === "\n" || char === "\r" || char === "\t")) {
      out += char === "\t" ? "\\t" : "\\n";
      fixed += 1;
      continue;
    }
    out += char;
  }

  return { out, fixed };
}

const sanitised = escapeControlCharsInStrings(text);
if (sanitised.fixed > 0) {
  text = sanitised.out;
  changes.push(
    `escaped ${sanitised.fixed} raw control character(s) inside string literals`,
  );
}

/** 3. Close a truncated array/object at the end of the file. */
function closeTruncated(source) {
  const stack = [];
  let inString = false;
  let escaped = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (char === "{" || char === "[") stack.push(char);
    else if (char === "}" || char === "]") stack.pop();
  }

  if (stack.length === 0) return { out: source, closed: 0 };

  const closers = stack
    .reverse()
    .map((opener) => (opener === "{" ? "}" : "]"))
    .join("");

  return { out: source + closers, closed: closers.length };
}

function parse(source) {
  try {
    return { ok: true, value: JSON.parse(source) };
  } catch (error) {
    return { ok: false, error };
  }
}

let result = parse(text);
if (!result.ok) {
  const closed = closeTruncated(text);
  if (closed.closed > 0) {
    const retry = parse(closed.out);
    if (retry.ok) {
      text = closed.out;
      result = retry;
      changes.push(`closed ${closed.closed} truncated bracket(s) at end of file`);
    }
  }
}

if (!result.ok) {
  console.error(`STILL INVALID: ${file}`);
  console.error(`  ${result.error.message}`);
  const position = /position (\d+)/.exec(result.error.message);
  if (position) {
    const at = Number(position[1]);
    console.error(
      `  context: ${JSON.stringify(text.slice(Math.max(0, at - 60), at + 60))}`,
    );
  }
  process.exit(1);
}

if (check) {
  if (changes.length === 0) {
    console.log(`VALID: ${path.relative(process.cwd(), file)}`);
    process.exit(0);
  }
  console.error(
    `REPAIRABLE: ${path.relative(process.cwd(), file)} — ${changes.join("; ")}`,
  );
  process.exit(1);
}

if (changes.length === 0) {
  console.log(`OK (already valid, nothing changed): ${path.relative(process.cwd(), file)}`);
  process.exit(0);
}

if (write) {
  fs.writeFileSync(file, `${JSON.stringify(result.value, null, 2)}\n`, "utf8");
  console.log(
    `REPAIRED: ${path.relative(process.cwd(), file)} — ${changes.join("; ")}`,
  );
} else {
  console.log(
    `REPAIRABLE (not written, pass --write): ${path.relative(
      process.cwd(),
      file,
    )} — ${changes.join("; ")}`,
  );
}
