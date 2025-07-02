"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EstadisticasGenerales {
  jugadores: any[]
  partidos: any[]
  resumen: {
    totalJugadores: number
    partidosJugados: number
    partidosProgramados: number
    totalGoles: number
    totalTarjetas: number
  }
}

export default function DashboardPage() {
  const [estadisticas, setEstadisticas] = useState<EstadisticasGenerales | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    cargarEstadisticas()
  }, [])

  const cargarEstadisticas = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/estadisticas")

      if (!response.ok) {
        throw new Error("Error cargando estadísticas")
      }

      const data = await response.json()
      setEstadisticas(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={cargarEstadisticas}>Reintentar</Button>
        </div>
      </div>
    )
  }

  const topGoleadores =
    estadisticas?.jugadores
      .filter((j) => j.goles > 0)
      .sort((a, b) => b.goles - a.goles)
      .slice(0, 3) || []

  const proximosPartidos =
    estadisticas?.partidos
      .filter((p) => p.estado === "Programado")
      .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
      .slice(0, 3) || []

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">⚽ Gestión Deportiva</h1>
        <p className="text-gray-600">Sistema integral para la gestión de equipos de fútbol</p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{estadisticas?.resumen.totalJugadores || 0}</div>
            <div className="text-sm text-gray-600">Jugadores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{estadisticas?.resumen.partidosJugados || 0}</div>
            <div className="text-sm text-gray-600">Partidos Jugados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">{estadisticas?.resumen.partidosProgramados || 0}</div>
            <div className="text-sm text-gray-600">Programados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{estadisticas?.resumen.totalGoles || 0}</div>
            <div className="text-sm text-gray-600">Goles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-yellow-600">{estadisticas?.resumen.totalTarjetas || 0}</div>
            <div className="text-sm text-gray-600">Tarjetas</div>
          </CardContent>
        </Card>
      </div>

      {/* Menú Principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="text-4xl mb-2">👥</div>
            <CardTitle>Gestión de Jugadores</CardTitle>
            <CardDescription>Administra el plantel completo por categorías</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Categoría 2014:</span>
                <span className="font-medium">
                  {estadisticas?.jugadores.filter((j) => j.anio_nacimiento === 2014).length || 0} jugadores
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Categoría 2015:</span>
                <span className="font-medium">En preparación</span>
              </div>
            </div>
            <Link href="/jugadores">
              <Button className="w-full">Gestionar Jugadores</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="text-4xl mb-2">📅</div>
            <CardTitle>Fixtures y Partidos</CardTitle>
            <CardDescription>Calendario de partidos y resultados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Jugados:</span>
                <span className="font-medium">{estadisticas?.resumen.partidosJugados || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Programados:</span>
                <span className="font-medium">{estadisticas?.resumen.partidosProgramados || 0}</span>
              </div>
            </div>
            <Link href="/partidos">
              <Button className="w-full">Ver Fixtures</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="text-4xl mb-2">📱</div>
            <CardTitle>Citaciones WhatsApp</CardTitle>
            <CardDescription>Sistema de citaciones automáticas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Selección de jugadores</div>
              <div className="text-sm text-gray-600">• Mensajes personalizados</div>
              <div className="text-sm text-gray-600">• Enlaces directos WhatsApp</div>
            </div>
            <Link href="/citaciones">
              <Button className="w-full">Crear Citaciones</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="text-4xl mb-2">🏆</div>
            <CardTitle>Formaciones</CardTitle>
            <CardDescription>Armador táctico interactivo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• 5 esquemas tácticos</div>
              <div className="text-sm text-gray-600">• Armador visual</div>
              <div className="text-sm text-gray-600">• Guardado de formaciones</div>
            </div>
            <Link href="/formaciones">
              <Button className="w-full">Armar Formaciones</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="text-4xl mb-2">📊</div>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>Análisis y reportes detallados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Total goles:</span>
                <span className="font-medium">{estadisticas?.resumen.totalGoles || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tarjetas:</span>
                <span className="font-medium">{estadisticas?.resumen.totalTarjetas || 0}</span>
              </div>
            </div>
            <Link href="/estadisticas">
              <Button className="w-full">Ver Estadísticas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="text-4xl mb-2">⚙️</div>
            <CardTitle>Configuración</CardTitle>
            <CardDescription>Ajustes del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Configuración general</div>
              <div className="text-sm text-gray-600">• Respaldos de datos</div>
              <div className="text-sm text-gray-600">• Usuarios y permisos</div>
            </div>
            <Button className="w-full" disabled>
              Próximamente
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Información Rápida */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Goleadores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🥇 Top Goleadores</CardTitle>
          </CardHeader>
          <CardContent>
            {topGoleadores.length > 0 ? (
              <div className="space-y-3">
                {topGoleadores.map((jugador, index) => (
                  <div key={jugador.id} className="flex items-center gap-3">
                    <div className="text-lg font-bold text-yellow-600 w-8">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{jugador.apellido_nombre}</div>
                      <div className="text-sm text-gray-600">{jugador.posicion}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{jugador.goles}</div>
                      <div className="text-xs text-gray-600">goles</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">No hay goleadores registrados</p>
            )}
          </CardContent>
        </Card>

        {/* Próximos Partidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📅 Próximos Partidos</CardTitle>
          </CardHeader>
          <CardContent>
            {proximosPartidos.length > 0 ? (
              <div className="space-y-3">
                {proximosPartidos.map((partido) => (
                  <div key={partido.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{partido.local ? "🏠" : "✈️"}</div>
                    <div className="flex-1">
                      <div className="font-medium">vs {partido.rival}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(partido.fecha).toLocaleDateString("es-AR", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">{partido.local ? "Local" : "Visitante"}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">No hay partidos programados</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Estado del Sistema */}
      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="font-medium text-gray-900 mb-2">🔗 Sistema Conectado</h3>
          <p className="text-sm text-gray-600 mb-3">
            Base de datos activa y sincronizada. Todos los datos se actualizan en tiempo real.
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Base de datos conectada
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              APIs funcionando
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Sincronización activa
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
