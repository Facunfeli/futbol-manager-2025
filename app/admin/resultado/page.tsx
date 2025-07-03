"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Partido {
  id: number
  rival: string
  fecha: string
  categoria: string
  local: boolean
  resultado_propio?: number
  resultado_rival?: number
}

export default function AdminResultadosPage() {
  const router = useRouter()
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState<number | null>(null)
  const [resultados, setResultados] = useState<{ [key: number]: { propio: string; rival: string } }>({})

  useEffect(() => {
    cargarPartidos()
  }, [])

  const cargarPartidos = async () => {
    try {
      const response = await fetch("/api/partidos")
      if (response.ok) {
        const data = await response.json()
        setPartidos(data)
      }
    } catch (error) {
      console.error("Error cargando partidos:", error)
    } finally {
      setLoading(false)
    }
  }

  const iniciarEdicion = (partido: Partido) => {
    setEditando(partido.id)
    setResultados({
      ...resultados,
      [partido.id]: {
        propio: partido.resultado_propio?.toString() || "",
        rival: partido.resultado_rival?.toString() || "",
      },
    })
  }

  const cancelarEdicion = () => {
    setEditando(null)
    setResultados({})
  }

  const guardarResultado = async (partidoId: number) => {
    const resultado = resultados[partidoId]
    if (!resultado) return

    try {
      const response = await fetch(`/api/partidos/${partidoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resultado_propio: Number.parseInt(resultado.propio) || 0,
          resultado_rival: Number.parseInt(resultado.rival) || 0,
        }),
      })

      if (response.ok) {
        await cargarPartidos()
        setEditando(null)
        setResultados({})
        alert("Resultado guardado correctamente")
      } else {
        alert("Error al guardar el resultado")
      }
    } catch (error) {
      console.error("Error guardando resultado:", error)
      alert("Error al guardar el resultado")
    }
  }

  const actualizarResultado = (partidoId: number, campo: "propio" | "rival", valor: string) => {
    setResultados({
      ...resultados,
      [partidoId]: {
        ...resultados[partidoId],
        [campo]: valor,
      },
    })
  }

  const obtenerResultadoTexto = (partido: Partido) => {
    if (partido.resultado_propio !== undefined && partido.resultado_rival !== undefined) {
      const propio = partido.resultado_propio
      const rival = partido.resultado_rival

      if (propio > rival) return { texto: "Victoria", color: "text-green-600" }
      if (propio < rival) return { texto: "Derrota", color: "text-red-600" }
      return { texto: "Empate", color: "text-yellow-600" }
    }
    return { texto: "Sin resultado", color: "text-gray-500" }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="text-lg">Cargando partidos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">⚽ Cargar Resultados</h1>
          <p className="text-gray-600 mt-1">Administrar resultados de partidos</p>
        </div>
        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          ← Volver a Admin
        </button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{partidos.length}</div>
            <div className="text-sm text-gray-600">Total Partidos</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                partidos.filter(
                  (p) =>
                    p.resultado_propio !== undefined &&
                    p.resultado_rival !== undefined &&
                    p.resultado_propio > p.resultado_rival,
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Victorias</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {
                partidos.filter(
                  (p) =>
                    p.resultado_propio !== undefined &&
                    p.resultado_rival !== undefined &&
                    p.resultado_propio === p.resultado_rival,
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Empates</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {
                partidos.filter(
                  (p) =>
                    p.resultado_propio !== undefined &&
                    p.resultado_rival !== undefined &&
                    p.resultado_propio < p.resultado_rival,
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Derrotas</div>
          </div>
        </div>
      </div>

      {/* Lista de partidos */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Partidos Programados</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {partidos.map((partido) => {
            const resultado = obtenerResultadoTexto(partido)
            const editandoEste = editando === partido.id

            return (
              <div key={partido.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-semibold text-lg">vs {partido.rival}</h4>
                        <div className="text-sm text-gray-600">
                          {new Date(partido.fecha).toLocaleDateString("es-AR")} • {partido.categoria}
                        </div>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                            partido.local ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {partido.local ? "LOCAL" : "VISITANTE"}
                        </span>
                      </div>

                      <div className="ml-8">
                        {editandoEste ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              placeholder="Nosotros"
                              value={resultados[partido.id]?.propio || ""}
                              onChange={(e) => actualizarResultado(partido.id, "propio", e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="Rival"
                              value={resultados[partido.id]?.rival || ""}
                              onChange={(e) => actualizarResultado(partido.id, "rival", e.target.value)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                          </div>
                        ) : (
                          <div className="text-center">
                            {partido.resultado_propio !== undefined && partido.resultado_rival !== undefined ? (
                              <div>
                                <div className="text-2xl font-bold">
                                  {partido.resultado_propio} - {partido.resultado_rival}
                                </div>
                                <div className={`text-sm font-medium ${resultado.color}`}>{resultado.texto}</div>
                              </div>
                            ) : (
                              <div className="text-gray-500">Sin resultado</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {editandoEste ? (
                      <>
                        <button
                          onClick={() => guardarResultado(partido.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={cancelarEdicion}
                          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => iniciarEdicion(partido)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        {partido.resultado_propio !== undefined ? "Editar" : "Cargar"} Resultado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {partidos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No hay partidos programados</div>
        </div>
      )}
    </div>
  )
}
