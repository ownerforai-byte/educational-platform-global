import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Build / deploy fingerprint ────────────────────────────────────────────
// Vercel injects VERCEL_* vars at build time. We mirror the useful ones into
// NEXT_PUBLIC_* so the client bundle (footer build badge) can render a live
// "which deployment am I on?" marker that changes on every deploy. Locally and
// on non-Vercel hosts these fall back to empty strings / "local" and the badge
// degrades gracefully — it never breaks the page.
const gitSha = (process.env.VERCEL_GIT_COMMIT_SHA || "").trim();
const gitRef = (process.env.VERCEL_GIT_COMMIT_REF || "").trim();
const gitMsg = (process.env.VERCEL_GIT_COMMIT_MESSAGE || "").trim();
const buildEnv = {
  NEXT_PUBLIC_BUILD_SHA: gitSha.slice(0, 7),
  NEXT_PUBLIC_BUILD_REF: gitRef,
  NEXT_PUBLIC_BUILD_MSG: gitMsg.slice(0, 64),
  NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV || "local",
  NEXT_PUBLIC_VERCEL_DEPLOY_ID: process.env.VERCEL_DEPLOYMENT_ID || "",
  NEXT_PUBLIC_VERCEL_URL: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "",
  // Optional owner-controlled counter ("increases from 0,1,2..."). If you set
  // NEXT_PUBLIC_BUILD_NO in the Vercel project it shows verbatim as the version
  // number; otherwise the footer falls back to the auto commit marker above.
  NEXT_PUBLIC_BUILD_NO: process.env.NEXT_PUBLIC_BUILD_NO || "",
  NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
};

const nextConfig = {
  // The KaTeX note pipeline (lib/content/pipeline.ts → rehype-katex) must be
  // Expose the deploy fingerprint to the client bundle (footer build badge).
  env: buildEnv,
  // Keep HTML routes out of the Vercel edge cache so a new deploy is served
  // immediately instead of a stale copy. Static assets (/_next, images, font)
  // are still cached by URL — only document responses are no-store.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
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
