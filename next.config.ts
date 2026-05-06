import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rematedeploy-production.up.railway.app',
      },
    ],
  },
};

export default nextConfig;
