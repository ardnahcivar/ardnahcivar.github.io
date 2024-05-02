/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized:true
  },
  rewrites: async () => {
    return[
      {
        source:'/',
        destination:'/lift-sim/index.html'
      }
    ]
  }
}

module.exports = nextConfig
