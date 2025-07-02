"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Partido {
  id: number
  fecha: string
  rival: string
  local: boolean
  resultado_local?: number
  resultado_visitante?: number
  estado: string
  observaciones?: string
}

export default function Fixture2014Page() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    cargarPartidos()
  }, [])

  const cargarPartidos = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/partidos")

      if (!response.ok) {
        throw new Error("Error cargando partidos")
      }

      const data = await response.json()
      setPartidos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  const formatearFechaCorta = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
    })
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "jugado":
        return (
          <Badge variant="default" className="bg-green-600">
            ✅ Jugado
          </Badge>
        )
      case "programado":
        return <Badge variant="secondary">📅 Programado</Badge>
      case "suspendido":
        return <Badge variant="destructive">⚠️ Suspendido</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  const getResultadoColor = (local: boolean, resultado_local?: number, resultado_visitante?: number) => {
    if (resultado_local === undefined || resultado_visitante === undefined) return "text-gray-600"

    const ganamos = local ? resultado_local > resultado_visitante : resultado_visitante > resultado_local
    const empate = resultado_local === resultado_visitante

    if (empate) return "text-yellow-600"
    return ganamos ? "text-green-600" : "text-red-600"
  }

  const getResultadoTexto = (local: boolean, resultado_local?: number, resultado_visitante?: number) => {
    if (resultado_local === undefined || resultado_visitante === undefined) return "Sin resultado"

    const ganamos = local ? resultado_local > resultado_visitante : resultado_visitante > resultado_local
    const empate = resultado_local === resultado_visitante

    if (empate) return "Empate"
    return ganamos ? "Victoria" : "Derrota"
  }

  const partidosJugados = partidos.filter((p) => p.estado.toLowerCase() === "jugado")
  const partidosProgramados = partidos.filter((p) => p.estado.toLowerCase() === "programado")
  const proximoPartido = partidosProgramados.sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
  )[0]

  // Estadísticas
  const victorias = partidosJugados.filter((p) => {
    if (p.resultado_local === undefined || p.resultado_visitante === undefined) return false
    return p.local ? p.resultado_local > p.resultado_visitante : p.resultado_visitante > p.resultado_local
  }).length

  const empates = partidosJugados.filter((p) => {
    if (p.resultado_local === undefined || p.resultado_visitante === undefined) return false
    return p.resultado_local === p.resultado_visitante
  }).length

  const derrotas = partidosJugados.length - victorias - empates

  const golesAFavor = partidosJugados.reduce((sum, p) => {
    if (p.resultado_local === undefined || p.resultado_visitante === undefined) return sum
    return sum + (p.local ? p.resultado_local : p.resultado_visitante)
  }, 0)

  const golesEnContra = partidosJugados.reduce((sum, p) => {
    if (p.resultado_local === undefined || p.resultado_visitante === undefined) return sum
    return sum + (p.local ? p.resultado_visitante : p.resultado_local)
  }, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando fixture...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar fixture</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={cargarPartidos}>Reintentar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📅 Fixture 2014</h1>
          <p className="text-gray-600">Calendario completo de partidos categoría 2014</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={cargarPartidos} variant="outline">
            🔄 Actualizar
          </Button>
          <Link href="/partidos">
            <Button variant="outline">← Volver</Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas del Torneo */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{partidos.length}</div>
            <div className="text-sm text-gray-600">Total Partidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{victorias}</div>
            <div className="text-sm text-gray-600">Victorias</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{empates}</div>
            <div className="text-sm text-gray-600">Empates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{derrotas}</div>
            <div className="text-sm text-gray-600">Derrotas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{golesAFavor}</div>
            <div className="text-sm text-gray-600">Goles a Favor</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{golesEnContra}</div>
            <div className="text-sm text-gray-600">Goles en Contra</div>
          </CardContent>
        </Card>
      </div>

      {/* Próximo Partido */}
      {proximoPartido && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">🔥 Próximo Partido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">vs {proximoPartido.rival}</h3>
                <p className="text-gray-600">{formatearFecha(proximoPartido.fecha)}</p>
              </div>
              <div className="text-right">
                <Badge variant={proximoPartido.local ? "default" : "secondary"} className="text-lg px-4 py-2">
                  {proximoPartido.local ? "🏠 LOCAL" : "✈️ VISITANTE"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Partidos */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">📋 Todos los Partidos</h2>

        {partidos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay partidos registrados</h3>
              <p className="text-gray-600">Los partidos aparecerán aquí una vez que se carguen en la base de datos</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {partidos
              .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
              .map((partido, index) => (
                <Card key={partido.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[60px]">
                          <div className="text-lg font-bold text-gray-900">#{index + 1}</div>
                          <div className="text-xs text-gray-500">{formatearFechaCorta(partido.fecha)}</div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{partido.local ? "🏠" : "✈️"}</div>
                          <div>
                            <h3 className="text-lg font-semibold">vs {partido.rival}</h3>
                            <p className="text-sm text-gray-600">{formatearFecha(partido.fecha)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {partido.estado.toLowerCase() === "jugado" && (
                          <div className="text-center">
                            <div
                              className={`text-2xl font-bold ${getResultadoColor(partido.local, partido.resultado_local, partido.resultado_visitante)}`}
                            >
                              {partido.resultado_local !== undefined && partido.resultado_visitante !== undefined
                                ? `${partido.resultado_local}-${partido.resultado_visitante}`
                                : "0-0"}
                            </div>
                            <div
                              className={`text-sm ${getResultadoColor(partido.local, partido.resultado_local, partido.resultado_visitante)}`}
                            >
                              {getResultadoTexto(partido.local, partido.resultado_local, partido.resultado_visitante)}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col items-end gap-2">
                          {getEstadoBadge(partido.estado)}
                          <Badge variant="outline">{partido.local ? "LOCAL" : "VISITANTE"}</Badge>
                        </div>
                      </div>
                    </div>

                    {partido.observaciones && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">📝 {partido.observaciones}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>

      {/* Información del Sistema */}
      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="font-medium text-gray-900 mb-2">📊 Fixture Categoría 2014</h3>
          <p className="text-sm text-gray-600 mb-3">
            Datos conectados en tiempo real desde la base de datos. Actualizaciones automáticas.
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Base de datos conectada
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              {partidos.length} partidos cargados
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

