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
  // Desactivar características que no funcionan con export estático
  experimental: {
    appDir: true,
  },
}

export default nextConfig
