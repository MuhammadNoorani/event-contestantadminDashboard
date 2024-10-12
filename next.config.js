/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['gateway.pinata.cloud'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;