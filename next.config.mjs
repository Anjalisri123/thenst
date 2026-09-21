/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
}

export default nextConfig
