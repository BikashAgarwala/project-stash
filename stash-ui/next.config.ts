/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'standalone',

  compress: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  // compiler: {
  //   removeConsole: true,
  // },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'https', hostname: '*' },
      { protocol: 'http', hostname: '*' },
    ],
  },

  experimental: {
    optimizePackageImports: [
      'lodash-es',
      '@radix-ui/react-*',
      'react-icons',
      '@headlessui/react'
    ],
    optimizeCss: true,
    optimizeServerReact: true,
  },

};

export default nextConfig;