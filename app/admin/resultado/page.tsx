"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
}

export default function AdminResultadosPage() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState<number | null>(null)

  useEffect(() => {
    cargarPartidos()
  }, [])

  const cargarPartidos = async () => {
    try {
      const response = await fetch("/api/partidos")
      const data = await response.json()
      setPartidos(data)
    } catch (error) {
      console.error("Error cargando partidos:", error)
    } finally {
      setLoading(false)
    }
  }

  const actualizarResultado = async (partidoId: number, resultadoLocal: number, resultadoVisitante: number) => {
    setGuardando(partidoId)

    try {
      const response = await fetch(`/api/partidos/${partidoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resultado_local: resultadoLocal,
          resultado_visitante: resultadoVisitante,
          estado: "Jugado",
        }),
      })

      if (response.ok) {
        await cargarPartidos() // Recargar datos
        alert("✅ Resultado guardado correctamente")
      } else {
        throw new Error("Error guardando resultado")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("❌ Error guardando resultado")
    } finally {
      setGuardando(null)
    }
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">⚽ Cargar Resultados</h1>
          <p className="text-gray-600">Actualiza los resultados de los partidos jugados</p>
        </div>
        <Link href="/admin">
          <Button variant="outline">← Volver al Admin</Button>
        </Link>
      </div>

      {/* Lista de Partidos */}
      <div className="space-y-4">
        {partidos
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
          .map((partido) => (
            <Card key={partido.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[80px]">
                      <div className="text-sm text-gray-500">{formatearFecha(partido.fecha)}</div>
                      <Badge variant={partido.local ? "default" : "secondary"}>
                        {partido.local ? "LOCAL" : "VISITANTE"}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{partido.local ? "🏠" : "✈️"}</div>
                      <div>
                        <h3 className="text-lg font-semibold">vs {partido.rival}</h3>
                        <p className="text-sm text-gray-600">
                          Estado: <span className="font-medium">{partido.estado}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Formulario de Resultado */}
                    <ResultadoForm
                      partido={partido}
                      onGuardar={actualizarResultado}
                      guardando={guardando === partido.id}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

// Componente para el formulario de resultado
function ResultadoForm({
  partido,
  onGuardar,
  guardando,
}: {
  partido: Partido
  onGuardar: (id: number, local: number, visitante: number) => void
  guardando: boolean
}) {
  const [golesLocal, setGolesLocal] = useState(partido.resultado_local?.toString() || "")
  const [golesVisitante, setGolesVisitante] = useState(partido.resultado_visitante?.toString() || "")

  const handleGuardar = () => {
    const local = Number.parseInt(golesLocal) || 0
    const visitante = Number.parseInt(golesVisitante) || 0
    onGuardar(partido.id, local, visitante)
  }

  const tieneResultado = partido.resultado_local !== null && partido.resultado_local !== undefined

  return (
    <div className="flex items-center gap-3">
      {/* Mostrar resultado actual si existe */}
      {tieneResultado && (
        <div className="text-center mr-4">
          <div className="text-2xl font-bold text-blue-600">
            {partido.resultado_local}-{partido.resultado_visitante}
          </div>
          <div className="text-xs text-gray-500">Resultado actual</div>
        </div>
      )}

      {/* Inputs para nuevo resultado */}
      <div className="flex items-center gap-2">
        <div className="text-center">
          <input
            type="number"
            min="0"
            max="20"
            value={golesLocal}
            onChange={(e) => setGolesLocal(e.target.value)}
            className="w-16 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-md"
            placeholder="0"
          />
          <div className="text-xs text-gray-500 mt-1">{partido.local ? "Nosotros" : partido.rival}</div>
        </div>

        <div className="text-2xl font-bold text-gray-400">-</div>

        <div className="text-center">
          <input
            type="number"
            min="0"
            max="20"
            value={golesVisitante}
            onChange={(e) => setGolesVisitante(e.target.value)}
            className="w-16 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-md"
            placeholder="0"
          />
          <div className="text-xs text-gray-500 mt-1">{partido.local ? partido.rival : "Nosotros"}</div>
        </div>
      </div>

      <Button
        onClick={handleGuardar}
        disabled={guardando || golesLocal === "" || golesVisitante === ""}
        className="ml-4"
      >
        {guardando ? "⏳ Guardando..." : "💾 Guardar"}
      </Button>
    </div>
  )
}
