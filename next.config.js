/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/tests',
        headers: [
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
      {
        source: '/:path*{/}?',
        headers: [
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
    ];
  },
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
