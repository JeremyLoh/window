/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverActions: true, // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
  },
}

module.exports = nextConfig
