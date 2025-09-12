// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // permite usar next/image no next export
  },
  output: 'export', // garante que o build vai gerar estáticos
};

module.exports = nextConfig;
