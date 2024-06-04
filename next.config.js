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
      },
      {
        source:'/',
        destination:'/f1-race-flood-lights/index.html'
      },
      {
        source:'/',
        destination:'/interactive-shape/index.html'
      }
    ]
  }
}

module.exports = nextConfig
