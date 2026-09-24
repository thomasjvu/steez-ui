import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@steez-ui/ui", "@steez-ui/icons", "@steez-ui/theme"],
};

export default nextConfig;
