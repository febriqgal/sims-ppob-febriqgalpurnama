/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.nutech-integrasi.app",
      },
    ],
  },
};

module.exports = nextConfig;
