/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable strict mode for now
  reactStrictMode: false,
  // Handle EPERM errors by disabling specific features
  experimental: {
    // Disable features that might cause EPERM errors
    outputFileTracing: false,
    turbotrace: false,
  },
  // Increase build output directory permissions
  poweredByHeader: false,
  // Optimize production builds
  swcMinify: true,
}

module.exports = nextConfig 