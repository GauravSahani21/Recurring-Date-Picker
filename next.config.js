/** @type {import('next').NextConfig} */
const nextConfig = {
  
  experimental: {
    
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
