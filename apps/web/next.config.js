/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable page-level static exports
  output: 'standalone',
  experimental: {
    // serverActions: true,
    // typedRoutes: true,
  },
};

export default nextConfig;
