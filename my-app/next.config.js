/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
         port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "trueog.id",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "down-id.img.susercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "filebroker-cdn.lazada.co.id",
        port: "",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "asset.kompas.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.tokopedia.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.somersetworkwear.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static0.pocketlintimages.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lozy.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
