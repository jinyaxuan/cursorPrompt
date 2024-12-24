/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  env: {
    KIMI_API_KEY: process.env.KIMI_API_KEY,
  }
}

module.exports = nextConfig 