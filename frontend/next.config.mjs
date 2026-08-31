import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  outputFileTracingRoot: path.resolve(__dirname, ".."),
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
    config.resolve.alias = {
      ...config.resolve.alias,
      "hast-util-from-html-isomorphic": path.resolve(
        __dirname,
        "lib/hast-util-from-html-isomorphic.js"
      ),
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
  async redirects() {
    return [
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
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
};

export default nextConfig;
