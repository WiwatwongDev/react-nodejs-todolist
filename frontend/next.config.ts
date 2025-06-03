import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: 'export' // หรือ 'standalone'
};

export default nextConfig;
