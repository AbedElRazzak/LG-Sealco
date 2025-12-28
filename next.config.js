/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '49206', // Match your API port exactly
        pathname: '/user-content/**',
      },
    ],
  },
};

module.exports = nextConfig;