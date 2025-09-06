import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const hostnames = (process.env.NEXT_PUBLIC_HOSTNAMES || '').split(',').map(hostname => hostname.trim());

// #region remotePatterns
const remotePatterns: RemotePattern[] =  [
      ...hostnames.map(hostname => ({
        protocol: 'https' as 'https',
        hostname: hostname,
        port: '',
        pathname: '/**',
      })),
    ]
    // #endregion

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
