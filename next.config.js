/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'uploadthing.com',
      'loremflickr.com',
    ],
  },
};

module.exports = nextConfig;
