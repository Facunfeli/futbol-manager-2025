"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Jugador {
  id: number
  dni: string
  apellido_nombre: string
  numero_socio: string
  fichado: string
  posicion: string
  pierna_habil: string
  telefono: string
  email: string
  fecha_nacimiento: string
  altura: number
  peso: number
  numero_camiseta: number
  estado_fisico: string
  activo: boolean
}

export default function JugadoresPage() {
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState("todos")

  useEffect(() => {
    fetchJugadores()
  }, [])

  const fetchJugadores = async () => {
    try {
      const response = await fetch("/api/jugadores")
      const data = await response.json()
      setJugadores(data)
    } catch (error) {
      console.error("Error fetching jugadores:", error)
    } finally {
      setLoading(false)
    }
  }

  const jugadoresFiltrados = jugadores.filter((jugador) => {
    if (filtro === "todos") return true
    return jugador.posicion.toLowerCase() === filtro.toLowerCase()
  })

  const posiciones = ["todos", "arquero", "defensor", "mediocampista", "delantero"]

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando jugadores...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plantel de Jugadores</h1>
        <Link href="/nuevo-jugador">
          <Button>Agregar Jugador</Button>
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {posiciones.map((posicion) => (
          <Button
            key={posicion}
            variant={filtro === posicion ? "default" : "outline"}
            onClick={() => setFiltro(posicion)}
            className="capitalize"
          >
            {posicion}
          </Button>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{jugadores.length}</div>
            <div className="text-sm text-gray-600">Total Jugadores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{jugadores.filter((j) => j.posicion === "Arquero").length}</div>
            <div className="text-sm text-gray-600">Arqueros</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{jugadores.filter((j) => j.posicion === "Defensor").length}</div>
            <div className="text-sm text-gray-600">Defensores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{jugadores.filter((j) => j.posicion === "Mediocampista").length}</div>
            <div className="text-sm text-gray-600">Mediocampistas</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Jugadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jugadoresFiltrados.map((jugador) => (
          <Card key={jugador.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{jugador.apellido_nombre}</CardTitle>
                <Badge variant="secondary">#{jugador.numero_camiseta}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posición:</span>
                  <Badge variant="outline">{jugador.posicion}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Pierna hábil:</span>
                  <span className="text-sm">{jugador.pierna_habil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estado:</span>
                  <Badge variant={jugador.estado_fisico === "Disponible" ? "default" : "destructive"}>
                    {jugador.estado_fisico}
                  </Badge>
                </div>
                {jugador.altura && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Altura:</span>
                    <span className="text-sm">{jugador.altura} cm</span>
                  </div>
                )}
                {jugador.peso && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Peso:</span>
                    <span className="text-sm">{jugador.peso} kg</span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link href={`/jugadores/${jugador.id}`}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Ver Detalles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jugadoresFiltrados.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron jugadores con el filtro seleccionado.</p>
        </div>
      )}
    </div>
  )
}

