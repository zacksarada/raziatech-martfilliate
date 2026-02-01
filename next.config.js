/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
  },
  // Add webpack config to prevent recursion
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    
    // Disable source maps
    config.devtool = false;
    
    return config;
  },
};

module.exports = nextConfig;
