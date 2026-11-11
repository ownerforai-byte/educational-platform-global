/**
 * Undici 8.x reads `zlib.createZstdDecompress` at module load. Some Node
 * builds (notably certain Windows installs) lack zstd — stub so Vitest workers
 * can import `next/server` without crashing.
 */
import zlib from "node:zlib";

const z = zlib as typeof zlib & {
  createZstdDecompress?: typeof zlib.createBrotliDecompress;
};

if (typeof z.createZstdDecompress !== "function") {
  Object.defineProperty(z, "createZstdDecompress", {
    configurable: true,
    value(options?: zlib.ZlibOptions) {
      return zlib.createBrotliDecompress(options);
    },
  });
}
