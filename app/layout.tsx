import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fútbol Manager 2024 - Gestión Deportiva",
  description:
    "Sistema integral para la gestión de equipos de fútbol. Administra jugadores, fixtures, estadísticas y citaciones.",
  keywords: ["futbol", "deportes", "gestion", "equipos", "estadisticas"],
  authors: [{ name: "Tu Nombre" }],
  creator: "Tu Nombre",
  publisher: "Tu Nombre",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // PWA
  manifest: "/manifest.json",
  // Mobile optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  // Open Graph
  openGraph: {
    title: "Fútbol Manager 2024",
    description: "Sistema integral de gestión deportiva",
    type: "website",
    locale: "es_AR",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FutbolManager" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        <main style={{ minHeight: "100vh" }}>{children}</main>
      </body>
    </html>
  )
}
