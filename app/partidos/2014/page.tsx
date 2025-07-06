"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Partido {
  id: number
  fecha: string
  rival: string
  local: boolean
  resultado_local?: number
  resultado_visitante?: number
  observaciones?: string
  estado: string
  created_at?: string
}

export default function Partidos2014Page() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPartidos() {
      try {
        const response = await fetch("/api/partidos?categoria=2014")
        if (!response.ok) {
          throw new Error("Error al cargar partidos")
        }
        const data = await response.json()
        setPartidos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchPartidos()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando partidos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const partidosJugados = partidos.filter((p) => p.estado === "Jugado")
  const partidosProgramados = partidos.filter((p) => p.estado === "Programado")

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Partidos Categoría 2014</h1>
            <Link href="/partidos" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Volver a Partidos
            </Link>
          </div>
          <p className="text-gray-600 mt-2">Gestión completa de partidos para la categoría 2014</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/citaciones/2014"
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Citaciones</h3>
            <p className="text-blue-100">Gestionar citaciones para partidos</p>
          </Link>
          <Link
            href="/formaciones/2014"
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Formaciones</h3>
            <p className="text-green-100">Armar formaciones tácticas</p>
          </Link>
          <Link
            href="/estadisticas/2014"
            className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors text-center"
          >
            <h3 className="text-lg font-semibold mb-2">Estadísticas</h3>
            <p className="text-purple-100">Ver estadísticas de partidos</p>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Próximos Partidos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Próximos Partidos ({partidosProgramados.length})
            </h2>
            <div className="space-y-4">
              {partidosProgramados.map((partido) => (
                <div key={partido.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">vs {partido.rival}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {partido.local ? "LOCAL" : "VISITANTE"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    📅{" "}
                    {new Date(partido.fecha).toLocaleDateString("es-AR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {partido.observaciones && <p className="text-sm text-gray-500">{partido.observaciones}</p>}
                  <div className="mt-3 flex space-x-2">
                    <Link
                      href={`/citaciones/2014?partido=${partido.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Citar Jugadores
                    </Link>
                    <Link
                      href={`/formaciones/2014?partido=${partido.id}`}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Formación
                    </Link>
                  </div>
                </div>
              ))}
              {partidosProgramados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay partidos programados</p>
                </div>
              )}
            </div>
          </div>

          {/* Últimos Resultados */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Últimos Resultados ({partidosJugados.length})</h2>
            <div className="space-y-4">
              {partidosJugados.slice(0, 10).map((partido) => {
                const esVictoria =
                  (partido.local && (partido.resultado_local || 0) > (partido.resultado_visitante || 0)) ||
                  (!partido.local && (partido.resultado_visitante || 0) > (partido.resultado_local || 0))
                const esEmpate = partido.resultado_local === partido.resultado_visitante

                return (
                  <div key={partido.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">vs {partido.rival}</h3>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {partido.local
                            ? `${partido.resultado_local} - ${partido.resultado_visitante}`
                            : `${partido.resultado_visitante} - ${partido.resultado_local}`}
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            esVictoria
                              ? "bg-green-100 text-green-800"
                              : esEmpate
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {esVictoria ? "VICTORIA" : esEmpate ? "EMPATE" : "DERROTA"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">📅 {new Date(partido.fecha).toLocaleDateString("es-AR")}</p>
                    <p className="text-sm text-gray-500">{partido.local ? "Local" : "Visitante"}</p>
                    {partido.observaciones && <p className="text-sm text-gray-500 mt-2">{partido.observaciones}</p>}
                    <div className="mt-3">
                      <Link
                        href={`/estadisticas/2014?partido=${partido.id}`}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                      >
                        Ver Estadísticas
                      </Link>
                    </div>
                  </div>
                )
              })}
              {partidosJugados.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay resultados disponibles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
