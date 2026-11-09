"use strict";

/**
 * CommonJS bridge to `file-type`.
 *
 * Why this exists: `@jimp/core` (used by Bubblewrap for icon and splash
 * generation) does `require("file-type")` at module scope and awaits
 * `FileType.fromBuffer(buffer)` to sniff image MIME types. The only fixed
 * file-type release (>= 21.3.1, for GHSA-5v7r-6r5c-r473) is ESM-only, so a
 * plain version override would crash on `require`.
 *
 * This bridge keeps the CommonJS call shape Jimp expects and only loads the
 * ESM implementation lazily, through `import()`, the first time Jimp actually
 * sniffs a buffer. The real package is installed under its own alias
 * (`file-type-next`) so overriding `file-type` itself cannot resolve in a loop.
 *
 * The exported object intentionally does not set `__esModule`, so Babel's
 * `_interopRequireDefault()` wrapper keeps working: it hands back
 * `{ default: module.exports }`, which is how Jimp reaches `.fromBuffer`.
 */

let modulePromise = null;

function loadFileType() {
  if (modulePromise === null) {
    modulePromise = import("file-type-next");
  }
  return modulePromise;
}

/**
 * Mirrors `file-type@16`'s `fromBuffer()` result shape: `{ ext, mime }`, or
 * `undefined` when the buffer format is unknown.
 *
 * @param {Buffer | Uint8Array} buffer
 * @returns {Promise<{ ext: string, mime: string } | undefined>}
 */
async function fromBuffer(buffer) {
  const { fileTypeFromBuffer } = await loadFileType();
  const detected = await fileTypeFromBuffer(buffer);

  if (detected === null || detected === undefined) {
    return undefined;
  }

  return { ext: detected.ext, mime: detected.mime };
}

module.exports = { fromBuffer };
