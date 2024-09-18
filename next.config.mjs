/** @type {import('next').NextConfig} */

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
};

export default nextConfig;
