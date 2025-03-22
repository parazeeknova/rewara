/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@prisma/client'],
  webpack: (config: { externals: (string | RegExp)[] }) => {
    config.externals = [...config.externals, '@prisma/client'];
    return config;
  },
};

module.exports = nextConfig;
