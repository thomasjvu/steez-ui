import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@steez-ui/ui", "@steez-ui/icons", "@steez-ui/theme"],
  // Package source uses explicit `.js` specifiers so emitted ESM remains valid.
  // Next consumes the same TypeScript source through workspace path aliases.
  webpack(config) {
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias ?? {}),
      ".js": [".ts", ".tsx", ".js"],
      ".jsx": [".tsx", ".jsx"],
    };
    return config;
  },
};

export default nextConfig;
