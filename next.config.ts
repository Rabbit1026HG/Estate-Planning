import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    ZAPIER_WEBHOOK_URL: process.env.ZAPIER_WEBHOOK_URL,
  },
};

export default nextConfig;


