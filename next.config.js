/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,

  transpilePackages: ["mongoose"],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "images.clerk.dev" },
      { protocol: "https", hostname: "uploadthing.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
