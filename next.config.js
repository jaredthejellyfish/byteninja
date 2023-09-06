/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'uploadthing.com',
      'loremflickr.com',
    ],
  },
};

module.exports = nextConfig;
