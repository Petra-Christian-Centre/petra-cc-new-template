/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
  // Ensure proper handling of client-side routing
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig 