// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'uploadthing.com',
      'loremflickr.com',
      'octodex.github.com',
      'imgs.search.brave.com',
    ],
  },
};

module.exports = withContentlayer(nextConfig);
