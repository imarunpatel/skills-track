import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'dev-to-uploads.s3.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: "lnwjsbypumdciihzbozt.supabase.co"
      }
    ],
  }
};

export default nextConfig;
