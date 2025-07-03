"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Partido {
  id: number
  fecha: string
  rival: string
  local: boolean
  estado: string
  resultado_propio?: number
  resultado_rival?: number
  categoria: string
}

export default function ResultadosPage() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPartido, setSelectedPartido] = useState<Partido | null>(null)
  const [resultadoPropio, setResultadoPropio] = useState<string>("")
  const [resultadoRival, setResultadoRival] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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

  const handleSelectPartido = (partido: Partido) => {
    setSelectedPartido(partido)
    setResultadoPropio(partido.resultado_propio?.toString() || "")
    setResultadoRival(partido.resultado_rival?.toString() || "")
    setSuccessMessage(null)
  }

  const handleGuardarResultado = async () => {
    if (!selectedPartido) return

    try {
      setSaving(true)

      const response = await fetch(`/api/partidos/${selectedPartido.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resultado_propio: Number.parseInt(resultadoPropio),
          resultado_rival: Number.parseInt(resultadoRival),
          estado: "Jugado",
        }),
      })

      if (!response.ok) {
        throw new Error("Error guardando resultado")
      }

      await cargarPartidos()
      setSuccessMessage("Resultado guardado correctamente")

      setTimeout(() => {
        setSelectedPartido(null)
        setSuccessMessage(null)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando partidos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar partidos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={cargarPartidos}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Carga de Resultados</h1>
          <p className="text-gray-600">Administra los resultados de los partidos</p>
        </div>
        <Link href="/admin">
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
            Volver al Admin
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-4 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Partidos Pendientes</h2>

          {partidos.filter((p) => p.estado === "Programado").length === 0 ? (
            <p className="text-gray-500 text-center py-4">No hay partidos pendientes</p>
          ) : (
            <div className="space-y-2">
              {partidos
                .filter((p) => p.estado === "Programado")
                .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
                .map((partido) => (
                  <div
                    key={partido.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPartido?.id === partido.id
                        ? "bg-blue-100 border border-blue-300"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    }`}
                    onClick={() => handleSelectPartido(partido)}
                  >
                    <div className="font-medium">vs {partido.rival}</div>
                    <div className="text-sm text-gray-600 flex justify-between">
                      <span>
                        {new Date(partido.fecha).toLocaleDateString("es-AR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                        {partido.categoria}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{partido.local ? "Local" : "Visitante"}</div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2 bg-white p-4 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Cargar Resultado</h2>

          {!selectedPartido ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">👈</div>
              <p>Selecciona un partido para cargar el resultado</p>
            </div>
          ) : (
            <div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-lg mb-2">
                  {selectedPartido.local ? "Local" : "Visitante"} vs {selectedPartido.rival}
                </h3>
                <div className="text-sm text-gray-600">
                  Fecha:{" "}
                  {new Date(selectedPartido.fecha).toLocaleDateString("es-AR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="text-sm text-gray-600">Categoría: {selectedPartido.categoria}</div>
              </div>

              {successMessage && (
                <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg mb-4">
                  ✅ {successMessage}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Resultado</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-600 text-sm mb-1">
                      {selectedPartido.local ? "Nosotros" : "Rival"}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={resultadoRival}
                      onChange={(e) => setResultadoRival(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-xl font-bold">-</div>
                  <div className="flex-1">
                    <label className="block text-gray-600 text-sm mb-1">
                      {selectedPartido.local ? "Rival" : "Nosotros"}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={resultadoPropio}
                      onChange={(e) => setResultadoPropio(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedPartido(null)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarResultado}
                  disabled={saving || !resultadoPropio || !resultadoRival}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Guardando..." : "Guardar Resultado"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-lg shadow border">
        <h2 className="text-lg font-semibold mb-4">Últimos Resultados</h2>

        {partidos.filter((p) => p.estado === "Jugado").length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay resultados cargados</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rival
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condición
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resultado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {partidos
                  .filter((p) => p.estado === "Jugado")
                  .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                  .map((partido) => (
                    <tr key={partido.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(partido.fecha).toLocaleDateString("es-AR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{partido.rival}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          {partido.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {partido.local ? "Local" : "Visitante"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`font-bold ${
                            (partido.local && (partido.resultado_propio ?? 0) > (partido.resultado_rival ?? 0)) ||
                            (!partido.local && (partido.resultado_rival ?? 0) > (partido.resultado_propio ?? 0))
                              ? "text-green-600"
                              : (partido.local && (partido.resultado_propio ?? 0) < (partido.resultado_rival ?? 0)) ||
                                  (!partido.local && (partido.resultado_rival ?? 0) < (partido.resultado_propio ?? 0))
                                ? "text-red-600"
                                : "text-yellow-600"
                          }`}
                        >
                          {partido.local
                            ? `${partido.resultado_propio ?? 0} - ${partido.resultado_rival ?? 0}`
                            : `${partido.resultado_rival ?? 0} - ${partido.resultado_propio ?? 0}`}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
