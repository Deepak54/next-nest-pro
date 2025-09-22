import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@projeto1/ui", "@projeto1/types"],
  async rewrites() {
    const target = process.env.API_ORIGIN || "http://localhost:4000";
    return [
      { source: "/auth/:path*", destination: `${target}/auth/:path*` },
      { source: "/users/:path*", destination: `${target}/users/:path*` }
    ];
  },
};

export default nextConfig;
