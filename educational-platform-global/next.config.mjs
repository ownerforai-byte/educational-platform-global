import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL("./", import.meta.url)),
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config) {
    // hast-util-from-html-isomorphic (used by rehype-katex) ships a browser
    // variant that calls `new DOMParser()` at module scope. Edge bundles pick
    // it via the `browser` export condition, but the edge runtime has no DOM.
    // Force the parse5-based node variant everywhere — parse5 is pure JS and
    // already used on the edge by rehype-raw/hast-util-raw.
    config.resolve.alias = {
      ...config.resolve.alias,
      "hast-util-from-html-isomorphic": fileURLToPath(
        new URL(
          "./node_modules/hast-util-from-html-isomorphic/lib/index.js",
          import.meta.url,
        ),
      ),
    };
    return config;
  },
};

export default nextConfig;
