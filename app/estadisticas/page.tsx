"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EstadisticaJugador {
  jugador_id: number
  apellido_nombre: string
  posicion: string
  partidos_jugados: number
  minutos_totales: number
  goles: number
  asistencias: number
  tarjetas_amarillas: number
  tarjetas_rojas: number
  promedio_minutos: number
}

export default function EstadisticasPage() {
  const [estadisticas, setEstadisticas] = useState<EstadisticaJugador[]>([])
  const [loading, setLoading] = useState(true)
  const [ordenPor, setOrdenPor] = useState("goles")

  useEffect(() => {
    fetchEstadisticas()
  }, [])

  const fetchEstadisticas = async () => {
    try {
      const response = await fetch("/api/estadisticas")
      const data = await response.json()
      setEstadisticas(data)
    } catch (error) {
      console.error("Error fetching estadisticas:", error)
    } finally {
      setLoading(false)
    }
  }

  const estadisticasOrdenadas = [...estadisticas].sort((a, b) => {
    switch (ordenPor) {
      case "goles":
        return b.goles - a.goles
      case "asistencias":
        return b.asistencias - a.asistencias
      case "partidos":
        return b.partidos_jugados - a.partidos_jugados
      case "minutos":
        return b.minutos_totales - a.minutos_totales
      default:
        return 0
    }
  })

  const totalGoles = estadisticas.reduce((sum, est) => sum + est.goles, 0)
  const totalAsistencias = estadisticas.reduce((sum, est) => sum + est.asistencias, 0)
  const totalTarjetasAmarillas = estadisticas.reduce((sum, est) => sum + est.tarjetas_amarillas, 0)
  const totalTarjetasRojas = estadisticas.reduce((sum, est) => sum + est.tarjetas_rojas, 0)

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando estadísticas...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Estadísticas del Equipo</h1>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{totalGoles}</div>
            <div className="text-sm text-gray-600">Goles Totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{totalAsistencias}</div>
            <div className="text-sm text-gray-600">Asistencias Totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{totalTarjetasAmarillas}</div>
            <div className="text-sm text-gray-600">Tarjetas Amarillas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{totalTarjetasRojas}</div>
            <div className="text-sm text-gray-600">Tarjetas Rojas</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros de Ordenamiento */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setOrdenPor("goles")}
          className={`px-4 py-2 rounded ${ordenPor === "goles" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Por Goles
        </button>
        <button
          onClick={() => setOrdenPor("asistencias")}
          className={`px-4 py-2 rounded ${ordenPor === "asistencias" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Por Asistencias
        </button>
        <button
          onClick={() => setOrdenPor("partidos")}
          className={`px-4 py-2 rounded ${ordenPor === "partidos" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Por Partidos
        </button>
        <button
          onClick={() => setOrdenPor("minutos")}
          className={`px-4 py-2 rounded ${ordenPor === "minutos" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Por Minutos
        </button>
      </div>

      {/* Tabla de Estadísticas */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas por Jugador</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Jugador</th>
                  <th className="text-left p-2">Posición</th>
                  <th className="text-center p-2">PJ</th>
                  <th className="text-center p-2">Min</th>
                  <th className="text-center p-2">Goles</th>
                  <th className="text-center p-2">Asist</th>
                  <th className="text-center p-2">TA</th>
                  <th className="text-center p-2">TR</th>
                  <th className="text-center p-2">Prom Min</th>
                </tr>
              </thead>
              <tbody>
                {estadisticasOrdenadas.map((jugador, index) => (
                  <tr key={jugador.jugador_id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                        <span className="font-medium">{jugador.apellido_nombre}</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="outline" className="text-xs">
                        {jugador.posicion}
                      </Badge>
                    </td>
                    <td className="text-center p-2">{jugador.partidos_jugados}</td>
                    <td className="text-center p-2">{jugador.minutos_totales}</td>
                    <td className="text-center p-2">
                      <span className="font-bold text-green-600">{jugador.goles}</span>
                    </td>
                    <td className="text-center p-2">
                      <span className="font-bold text-blue-600">{jugador.asistencias}</span>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-yellow-600">{jugador.tarjetas_amarillas}</span>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-red-600">{jugador.tarjetas_rojas}</span>
                    </td>
                    <td className="text-center p-2">
                      <span className="text-sm text-gray-600">{jugador.promedio_minutos.toFixed(0)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {estadisticas.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay estadísticas disponibles.</p>
        </div>
      )}
    </div>
  )
}
