import createJiti from "jiti";
import { fileURLToPath } from "url";

createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  transpilePackages: [
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/ui",
    "@acme/validators",
  ],

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  output: "standalone",

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        stream: false,
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        pg: false,
        "pg-native": false,
      };
    }
    return config;
  },
};

export default config;
