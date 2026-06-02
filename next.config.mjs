/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Modo standalone: cria um servidor Node.js autossuficiente em .next/standalone
  // Usado pelo Dockerfile (EasyPanel). Ignorado automaticamente pela Vercel.
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
