/** @type {import('next').NextConfig} */
import path from 'path';

const hostnames = (process.env.NEXT_PUBLIC_HOSTNAMES || '').split(',').map(hostname => hostname.trim());

const nextConfig = {
  images: {
    remotePatterns: [
      ...hostnames.map(hostname => ({
        protocol: 'https',
        hostname: hostname,
        port: '',
        pathname: '/**',
      })),
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src');
    return config;
  },
};

export default nextConfig;
