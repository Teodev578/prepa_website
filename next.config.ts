import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.78'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qhvkomzmofxecbdtmdgv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
