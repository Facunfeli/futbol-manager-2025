"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" // Corregido: usar @
import { Badge } from "@/components/ui/badge" // Corregido: usar @

interface Citacion {
  id: number
  partido_id: number
  jugador_id: number
  citado: boolean
  confirmado: boolean
  motivo_ausencia: string | null
  fecha_citacion: string
  jugador_nombre: string
  jugador_posicion: string
  partido_rival: string
  partido_fecha: string
  partido_local: boolean
}

interface Partido {
  id: number
  fecha: string
  rival: string
  local: boolean
  estado: string
}

export default function CitacionesPage() {
  const [citaciones, setCitaciones] = useState<Citacion[]>([])
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [citacionesRes, partidosRes] = await Promise.all([fetch("/api/citaciones"), fetch("/api/partidos")])

      const citacionesData = await citacionesRes.json()
      const partidosData = await partidosRes.json()

      setCitaciones(citacionesData)
      setPartidos(partidosData.filter((p: Partido) => p.estado === "Programado"))

      // Seleccionar el próximo partido por defecto
      const proximoPartido = partidosData
        .filter((p: Partido) => p.estado === "Programado")
        .sort((a: Partido, b: Partido) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())[0]

      if (proximoPartido) {
        setPartidoSeleccionado(proximoPartido.id)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const citacionesFiltradas = partidoSeleccionado ? citaciones.filter((c) => c.partido_id === partidoSeleccionado) : []

  const partidoActual = partidos.find((p) => p.id === partidoSeleccionado)

  const citados = citacionesFiltradas.filter((c) => c.citado).length
  const confirmados = citacionesFiltradas.filter((c) => c.confirmado).length
  const ausentes = citacionesFiltradas.filter((c) => !c.citado || c.motivo_ausencia).length

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando citaciones...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Citaciones</h1>
        <Button>Nueva Citación</Button>
      </div>

      {/* Selector de Partido */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Seleccionar Partido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partidos.map((partido) => (
              <div
                key={partido.id}
                onClick={() => setPartidoSeleccionado(partido.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  partidoSeleccionado === partido.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">vs {partido.rival}</h3>
                  <Badge variant={partido.local ? "default" : "outline"}>{partido.local ? "LOCAL" : "VISITANTE"}</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(partido.fecha).toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {partidoActual && (
        <>
          {/* Resumen de Citaciones */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{citacionesFiltradas.length}</div>
                <div className="text-sm text-gray-600">Total Jugadores</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{citados}</div>
                <div className="text-sm text-gray-600">Citados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{confirmados}</div>
                <div className="text-sm text-gray-600">Confirmados</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">{ausentes}</div>
                <div className="text-sm text-gray-600">Ausentes</div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Citaciones */}
          <Card>
            <CardHeader>
              <CardTitle>
                Citaciones para vs {partidoActual.rival}
                <span className="text-sm font-normal text-gray-600 ml-2">
                  ({new Date(partidoActual.fecha).toLocaleDateString("es-AR")})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {citacionesFiltradas.length > 0 ? (
                <div className="space-y-3">
                  {citacionesFiltradas.map((citacion) => (
                    <div key={citacion.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-medium">{citacion.jugador_nombre}</h4>
                          <Badge variant="outline" className="text-xs">
                            {citacion.jugador_posicion}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {citacion.motivo_ausencia && (
                          <div className="text-sm text-red-600">{citacion.motivo_ausencia}</div>
                        )}

                        <Badge variant={citacion.citado ? "default" : "secondary"}>
                          {citacion.citado ? "Citado" : "No citado"}
                        </Badge>

                        {citacion.citado && (
                          <Badge
                            variant={citacion.confirmado ? "default" : "outline"}
                            className={citacion.confirmado ? "bg-green-500" : ""}
                          >
                            {citacion.confirmado ? "Confirmado" : "Pendiente"}
                          </Badge>
                        )}

                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No hay citaciones para este partido.</p>
                  <Button>Crear Citaciones</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {partidos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay partidos programados para citar jugadores.</p>
        </div>
      )}
    </div>
  )
}