// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // necessário para deploy em S3/CloudFront
  },
};

module.exports = nextConfig;
