import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Futbol Manager - Gestión de Equipo",
  description: "Sistema de gestión para equipos de fútbol",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  ⚽ Futbol Manager
                </Link>

                <div className="hidden md:flex space-x-6">
                  <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Dashboard
                  </Link>
                  <Link href="/jugadores" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Jugadores
                  </Link>
                  <Link href="/partidos" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Partidos
                  </Link>
                  <Link href="/estadisticas" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Estadísticas
                  </Link>
                  <Link href="/citaciones" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Citaciones
                  </Link>
                  <Link href="/formaciones" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Formaciones
                  </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button className="text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="bg-white border-t mt-12">
            <div className="container mx-auto px-6 py-8">
              <div className="text-center text-gray-600">
                <p>&copy; 2024 Futbol Manager. Sistema de gestión deportiva.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
