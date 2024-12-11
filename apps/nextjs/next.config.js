import createJiti from "jiti";
import { fileURLToPath } from "url";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/ui",
    "@acme/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  output: "standalone",

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        stream: false,
        crypto: false,
        "pg-native": false,
        "pg": false,
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        fs: false,
        path: false,
        stream: false,
        crypto: false,
        "pg-native": false,
        "pg": false,
      };
    }
    return config;
  },
};

export default config;
