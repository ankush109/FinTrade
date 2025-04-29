/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.collegetransitions.com",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
       {
        protocol:"https",
        hostname:"www.wealthmorning.com"
       },
       {
protocol:"https",
hostname:"image.mux.com"
       },
       {
        protocol: "https",
        hostname: "design4users.com",
       }
      // www.ngoregistration.org,
      // "www.ngoregistration.org",
    ],
  },
};

export default nextConfig;
