"use strict";

/**
 * Minimal, hardened replacement for `extract-zip`.
 *
 * Bubblewrap calls this through `util.promisify()`:
 *
 *     const extractZipPromise = promisify(extractZip);
 *     await extractZipPromise(zipFile, { dir: destinationPath });
 *
 * so the exported function must stay callback-shaped `(source, options, cb)`
 * (a promise is returned when no callback is supplied, as extract-zip does).
 *
 * Why this exists instead of the upstream package: the published extract-zip
 * releases have unpatched advisories (GHSA-jmr9-qjv8-65gv, GHSA-7pqw-9j4j-h8q3)
 * and the upstream fix is still an unmerged pull request. Rather than depend on
 * an unreviewed fork, this wrapper keeps the same behaviour for well-formed
 * archives while enforcing two invariants the advisories are about:
 *
 *   1. every extracted path resolves inside the destination directory
 *      (no `..` traversal, no absolute or drive-qualified entry names), and
 *   2. symlink entries are skipped instead of being materialised and followed.
 */

const fs = require("node:fs");
const path = require("node:path");
const yauzl = require("yauzl");

const S_IFMT = 0o170000;
const S_IFLNK = 0o120000;

const DEFAULT_DIR_MODE = 0o755;
const DEFAULT_FILE_MODE = 0o644;

/**
 * Resolves an archive entry name to a path inside `dir`, or throws.
 *
 * @param {string} dir Absolute destination directory.
 * @param {string} entryName Raw name from the zip central directory.
 * @returns {string} Absolute path that is guaranteed to live under `dir`.
 */
function resolveEntryPath(dir, entryName) {
  const normalized = String(entryName).replace(/\\/g, "/");

  if (normalized === "" || normalized === "./") {
    return dir;
  }
  if (normalized.startsWith("/") || /^[A-Za-z]:/.test(normalized)) {
    throw new Error(`refusing to extract absolute entry path: ${entryName}`);
  }

  const target = path.resolve(dir, normalized);
  const relative = path.relative(dir, target);

  if (relative === "") {
    return target;
  }
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`refusing to extract entry outside the destination: ${entryName}`);
  }

  return target;
}

/**
 * Extracts a zip archive into `options.dir`.
 *
 * @param {string} source Path to the .zip file.
 * @param {{dir?: string, onEntry?: (entry: object) => void,
 *          defaultDirMode?: number, defaultFileMode?: number}} [options]
 * @param {(error: Error | null) => void} [callback]
 * @returns {Promise<void> | undefined}
 */
function extract(source, options, callback) {
  let opts = options;
  let cb = callback;

  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  if (opts == null) {
    opts = {};
  }
  if (cb != null && typeof cb !== "function") {
    throw new TypeError("callback must be a function");
  }

  const destination = path.resolve(opts.dir || ".");
  const dirMode = opts.defaultDirMode == null ? DEFAULT_DIR_MODE : opts.defaultDirMode;
  const fileMode = opts.defaultFileMode == null ? DEFAULT_FILE_MODE : opts.defaultFileMode;
  const onEntry = typeof opts.onEntry === "function" ? opts.onEntry : null;

  const run = new Promise((resolve, reject) => {
    yauzl.open(source, { lazyEntries: true }, (openError, zipfile) => {
      if (openError) {
        reject(openError);
        return;
      }

      let settled = false;

      const fail = (error) => {
        if (settled) return;
        settled = true;
        try {
          zipfile.close();
        } catch {
          // The archive may already be closed; nothing useful to do here.
        }
        reject(error);
      };

      const next = (error) => {
        if (error) {
          fail(error);
          return;
        }
        zipfile.readEntry();
      };

      zipfile.on("error", fail);
      zipfile.on("end", () => {
        if (settled) return;
        settled = true;
        resolve();
      });

      zipfile.on("entry", (entry) => {
        if (settled) return;

        let target;
        try {
          target = resolveEntryPath(destination, entry.fileName);
        } catch (error) {
          fail(error);
          return;
        }

        if (onEntry) {
          onEntry(entry);
        }

        const unixMode = (entry.externalFileAttributes >>> 16) & 0xffff;
        const isSymlink = (unixMode & S_IFMT) === S_IFLNK;

        // Symlinks are attacker-controlled redirections: skip them entirely so
        // later entries cannot be written through a link that points elsewhere.
        if (isSymlink) {
          next();
          return;
        }

        if (entry.fileName.endsWith("/")) {
          try {
            fs.mkdirSync(target, { recursive: true, mode: dirMode });
          } catch (error) {
            fail(error);
            return;
          }
          next();
          return;
        }

        try {
          fs.mkdirSync(path.dirname(target), { recursive: true, mode: dirMode });
        } catch (error) {
          fail(error);
          return;
        }

        const extractedMode = (unixMode & 0o777) === 0 ? fileMode : unixMode & 0o777;

        zipfile.openReadStream(entry, (streamError, readStream) => {
          if (streamError) {
            next(streamError);
            return;
          }

          const writeStream = fs.createWriteStream(target, { mode: extractedMode });
          let streamDone = false;

          const finish = (error) => {
            if (streamDone) return;
            streamDone = true;
            if (error) {
              writeStream.destroy();
              next(error);
              return;
            }
            next();
          };

          readStream.on("error", finish);
          writeStream.on("error", finish);
          writeStream.on("close", () => finish());

          readStream.pipe(writeStream);
        });
      });

      zipfile.readEntry();
    });
  });

  if (cb) {
    run.then(
      () => cb(null),
      (error) => cb(error),
    );
    return undefined;
  }

  return run;
}

module.exports = extract;
module.exports.default = extract;
// Exposed for the self-test; not part of the extract-zip API surface.
module.exports.resolveEntryPath = resolveEntryPath;
