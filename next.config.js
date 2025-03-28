/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't fail the build on ESLint warnings
    ignoreDuringBuilds: true
  },
  typescript: {
    // Don't fail the build on TypeScript errors
    ignoreBuildErrors: true
  },
  async rewrites() {
    return [
      {
        source: '/api/map/:path*',
        destination: 'https://ceylonminebackend.up.railway.app/map/:path*'
      }
    ];
  },
  // Enable detailed logging for debugging
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

module.exports = nextConfig; 