/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '../../.next',
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src/client'],
  }
}

module.exports = nextConfig
