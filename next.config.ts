import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'docker-image-production-a568.up.railway.app',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.parklandbytheriver.com.my',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
