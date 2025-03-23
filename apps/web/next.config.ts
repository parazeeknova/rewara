/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
  },
  transpilePackages: ['@prisma/client'],
  webpack: (config: { externals: (string | RegExp)[] }) => {
    config.externals = [...config.externals, '@prisma/client'];
    return config;
  },
};

module.exports = nextConfig;
