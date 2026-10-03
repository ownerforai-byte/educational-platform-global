import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // Fresh deploys must win — but only for DOCUMENTS. A blanket no-store on
  // "/:path*" also hit everything served out of /public, including the 6 MB
  // notes manifest the app fetches at runtime: that turned a cached edge
  // payload into a full re-download on every visit. So the rules are split by
  // what the browser asked for (`Accept: text/html` means a page navigation):
  //   1. HTML documents → no-store, a new deploy is served immediately
  //   2. everything else → revalidate, the behaviour these had before
  // Hashed bundles under /_next/static are deliberately NOT listed: Vercel
  // already serves them as immutable, and a custom header there only makes
  // Next warn that it can break its own cache behaviour.
  async headers() {
    const HTML_NAVIGATION = ".*text/html.*";
    return [
      {
        source: "/:path*",
        has: [{ type: "header", key: "accept", value: HTML_NAVIGATION }],
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
      {
        source: "/:path*",
        missing: [{ type: "header", key: "accept", value: HTML_NAVIGATION }],
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
  // The KaTeX note pipeline (lib/content/pipeline.ts → rehype-katex) must be
  // required natively in the RSC layer instead of bundled: with a workspace
  // root node_modules present, the bundler rewrites rehype-katex's bare import
  // of hast-util-from-html-isomorphic to a deep `lib/index.js` path that the
  // package's exports map forbids → "Module not found" on every server page
  // rendering math (graphs, legend, theorems). Client/SSR layers are unaffected.
  serverExternalPackages: ["rehype-katex", "hast-util-from-html-isomorphic"],

  // hast-util-from-html-isomorphic's exports map only exposes the package root,
  // but Next's bundler can rewrite rehype-katex's bare import to the deep
  // `lib/index.js` path, which the exports map forbids → "Module not found".
  // Alias the bare specifier (and the deep path) to the real entry so the
  // KaTeX note pipeline resolves identically in every route and layer.

  turbopack: {
    root: path.resolve(__dirname, ".."),
    resolveAlias: {
      "hast-util-from-html-isomorphic": path.resolve(
        __dirname,
        "node_modules/hast-util-from-html-isomorphic/index.js",
      ),
    },
  },
  typescript: {
    // Build must fail on type errors. This used to be `true` to let a deploy
    // ship despite pre-existing lab-component errors, which is exactly how an
    // undefined `ShieldCheck`/`ownerItems`/`historyState` reached production as
    // a Vercel build failure: nothing failed until the static export evaluated
    // the module. `npm run typecheck` is clean again, so the safety net is back.
    ignoreBuildErrors: false,
  },
  outputFileTracingRoot: path.resolve(__dirname, ".."),

  // Ensure serverless/Vercel/Cloudflare bundles the content/ directory
  // so server-side reads (theorems.ts, legend.ts, etc.) don't 404 at runtime.
  outputFileTracingIncludes: {
    "**/*": ["./content/**/*"],
  },
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
  webpack: (config) => {
    const entry = path.resolve(
      __dirname,
      "node_modules/hast-util-from-html-isomorphic/index.js",
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      "hast-util-from-html-isomorphic": entry,
      "hast-util-from-html-isomorphic/lib/index.js": entry,
    };
    return config;
  },
  async rewrites() {
    // Backend origin — rn01.onrender.com is the live deployment (verified 200
    // on /health). Override with NEXT_PUBLIC_API_URL for local/other targets.
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://rn01.onrender.com";
    return [
      {
        source: "/api/:path*",
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/site-index",
        permanent: false,
      },
      {
        source: "/everything-index",
        destination: "/site-index",
        permanent: false,
      },
      {
        source: "/lab/physics/optics",
        destination: "/lab/ph-3d-optics",
        permanent: false,
      },
      {
        source: "/r-notes",
        destination: "/notes",
        permanent: false,
      },
      {
        source: "/ravikishan-notes",
        destination: "/notes",
        permanent: false,
      },
      {
        source: "/class-11e/:path*",
        destination: "/class-11-notes/:path*",
        permanent: false,
      },
      {
        source: "/class-11-more/:path*",
        destination: "/class-11-notes/:path*",
        permanent: false,
      },
      {
        source: "/class-12e/:path*",
        destination: "/class-12-notes/:path*",
        permanent: false,
      },
      {
        source: "/class-12-more/:path*",
        destination: "/class-12-notes/:path*",
        permanent: false,
      },
      {
        source: "/class-11e",
        destination: "/class-11-notes",
        permanent: false,
      },
      {
        source: "/class-11-more",
        destination: "/class-11-notes",
        permanent: false,
      },
      {
        source: "/class-12e",
        destination: "/class-12-notes",
        permanent: false,
      },
      {
        source: "/class-12-more",
        destination: "/class-12-notes",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
