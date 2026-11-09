"use strict";

/**
 * Self-test for the hardened extract-zip replacement.
 *
 * Builds small in-memory zip archives (stored entries, no compression) so the
 * extraction paths can be exercised without network access:
 *
 *   node android-twa/vendor/secure-extract-zip/self-test.js
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { promisify } = require("node:util");
const extract = require("./index.js");
const { resolveEntryPath } = extract;

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0 ^ -1;
  for (let index = 0; index < buffer.length; index += 1) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buffer[index]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

/** @param {Array<{name: string, data?: string, mode?: number}>} files */
function buildZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const name = Buffer.from(file.name, "utf8");
    const data = Buffer.from(file.data || "", "utf8");
    const mode = file.mode || (file.name.endsWith("/") ? 0o40755 : 0o100644);
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(0x031e, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE((mode << 16) >>> 0, 38);
    central.writeUInt32LE(offset, 42);

    localParts.push(local, name, data);
    centralParts.push(central, name);
    offset += local.length + name.length + data.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralDirectory, end]);
}

function workdir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "secure-extract-"));
}

function writeZip(dir, buffer, name = "archive.zip") {
  const file = path.join(dir, name);
  fs.writeFileSync(file, buffer);
  return file;
}

const tests = [];
function test(name, fn) {
  tests.push({ name, fn });
}

test("extracts nested directories and files (promisified, like Bubblewrap)", async () => {
  const sandbox = workdir();
  const zipPath = writeZip(
    sandbox,
    buildZip([
      { name: "sdk/" },
      { name: "sdk/tools/" },
      { name: "sdk/tools/source.properties", data: "Pkg.Revision=9.0\n" },
      { name: "sdk/readme.txt", data: "hello" },
    ]),
  );
  const destination = path.join(sandbox, "out");

  await promisify(extract)(zipPath, { dir: destination });

  assert.equal(fs.readFileSync(path.join(destination, "sdk/readme.txt"), "utf8"), "hello");
  assert.equal(
    fs.readFileSync(path.join(destination, "sdk/tools/source.properties"), "utf8"),
    "Pkg.Revision=9.0\n",
  );
});

test("supports the plain callback form", async () => {
  const sandbox = workdir();
  const zipPath = writeZip(sandbox, buildZip([{ name: "a.txt", data: "cb" }]));
  const destination = path.join(sandbox, "out");

  await new Promise((resolve, reject) => {
    extract(zipPath, { dir: destination }, (error) => (error ? reject(error) : resolve()));
  });

  assert.equal(fs.readFileSync(path.join(destination, "a.txt"), "utf8"), "cb");
});

test("fails closed on parent-directory traversal and writes nothing outside", async () => {
  const sandbox = workdir();
  const zipPath = writeZip(
    sandbox,
    buildZip([
      { name: "safe.txt", data: "ok" },
      { name: "../escaped.txt", data: "pwned" },
    ]),
  );
  const destination = path.join(sandbox, "deep", "out");

  await assert.rejects(promisify(extract)(zipPath, { dir: destination }));
  assert.equal(fs.existsSync(path.join(sandbox, "deep", "escaped.txt")), false);
  assert.equal(fs.existsSync(path.join(sandbox, "escaped.txt")), false);
});

test("fails closed on absolute and drive-qualified entry names", async () => {
  const sandbox = workdir();

  for (const name of ["/etc/passwd", "C:/Windows/evil.txt"]) {
    const zipPath = writeZip(sandbox, buildZip([{ name, data: "pwned" }]), `bad-${name.replace(/\W+/g, "_")}.zip`);
    await assert.rejects(promisify(extract)(zipPath, { dir: path.join(sandbox, "out") }));
  }
});

test("path guard rejects every escape shape it is given", () => {
  const dir = path.resolve(os.tmpdir(), "secure-extract-guard");

  for (const name of [
    "../escaped.txt",
    "..\\escaped.txt",
    "deep/../../escaped.txt",
    "/etc/passwd",
    "C:\\Windows\\evil.txt",
  ]) {
    assert.throws(() => resolveEntryPath(dir, name), /refusing to extract/, `expected rejection for ${name}`);
  }

  assert.equal(resolveEntryPath(dir, "sdk/tools/bin/avdmanager"), path.join(dir, "sdk/tools/bin/avdmanager"));
  assert.equal(resolveEntryPath(dir, ""), dir);
});

test("skips symlink entries instead of creating them", async () => {
  const sandbox = workdir();
  const zipPath = writeZip(
    sandbox,
    buildZip([
      { name: "real.txt", data: "real" },
      { name: "link.txt", data: "../../outside.txt", mode: 0o120777 },
      { name: "link-dir/", mode: 0o120777 },
    ]),
  );
  const destination = path.join(sandbox, "out");

  await promisify(extract)(zipPath, { dir: destination });

  assert.equal(fs.readFileSync(path.join(destination, "real.txt"), "utf8"), "real");
  assert.equal(fs.existsSync(path.join(destination, "link.txt")), false);
  assert.equal(fs.existsSync(path.join(destination, "link-dir")), false);
});

test("reports every entry through onEntry", async () => {
  const sandbox = workdir();
  const zipPath = writeZip(sandbox, buildZip([{ name: "one.txt" }, { name: "two.txt" }]));
  const seen = [];

  await promisify(extract)(zipPath, {
    dir: path.join(sandbox, "out"),
    onEntry: (entry) => seen.push(entry.fileName),
  });

  assert.deepEqual(seen, ["one.txt", "two.txt"]);
});

(async () => {
  let failed = 0;
  for (const { name, fn } of tests) {
    try {
      await fn();
      console.log(`✔ ${name}`);
    } catch (error) {
      failed += 1;
      console.error(`✘ ${name}\n  ${error.message}`);
    }
  }
  console.log(`\n${tests.length - failed}/${tests.length} passed`);
  process.exit(failed === 0 ? 0 : 1);
})();
