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
  // Configuración para Netlify
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Optimizaciones
  experimental: {
    optimizeCss: true,
  },
  // Configuración para rutas
  async rewrites() {
    return [
      {
        source: '/jugadores/:id',
        destination: '/jugadores/[id]',
      },
    ]
  },
}

export default nextConfig