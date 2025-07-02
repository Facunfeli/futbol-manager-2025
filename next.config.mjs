/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuración para deployment estático
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Remover experimental.appDir que ya no es necesario en Next.js 14
}

export default nextConfig
