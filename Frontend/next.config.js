const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // This allows production builds to complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Allowed because your error shows http
        hostname: 'backend-sealco.runasp.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-sealco.runasp.net',
        pathname: '/**',
      },
      // Keep your existing patterns below
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '49206',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '49206',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.sealco-leb.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api-v2.sealco-leb.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
