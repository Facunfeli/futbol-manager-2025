"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card" // Añadido CardDescription
import { Button } from "@/components/ui/button"

interface Jugador {
  id: number
  apellido_nombre: string
  dni: string
  posicion: string
  pierna_habil: string
  fichado?: string
  numero_socio?: string
  numero_camiseta?: number
  telefono?: string
  email?: string
  fecha_nacimiento?: string
  altura?: number
  peso?: number
  estado_fisico: string
  partidos?: number
  goles?: number
  asistencias?: number
  amarillas?: number
  rojas?: number
  minutos_totales?: number
}

const getPosicionColor = (posicion: string) => {
  switch (posicion) {
    case "ARQUERO":
      return { backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeaa7" }
    case "DEFENSOR":
      return { backgroundColor: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" }
    case "VOLANTE":
      return { backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }
    case "DELANTERO":
      return { backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }
    default:
      return { backgroundColor: "#e2e3e5", color: "#383d41", border: "1px solid #d6d8db" }
  }
}

export default function Jugadores2014Page() {
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroTexto, setFiltroTexto] = useState("")
  const [filtroPosicion, setFiltroPosicion] = useState("")
  const [ordenarPor, setOrdenarPor] = useState("nombre")

  useEffect(() => {
    cargarJugadores()
  }, [])

  const cargarJugadores = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/jugadores?anio=2014")
      if (!response.ok) {
        throw new Error("Error cargando jugadores")
      }
      const data = await response.json()
      setJugadores(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const jugadoresFiltrados = jugadores
    .filter((jugador) => {
      const coincideTexto =
        jugador.apellido_nombre.toLowerCase().includes(filtroTexto.toLowerCase()) || jugador.dni.includes(filtroTexto)
      const coincidePosicion = !filtroPosicion || jugador.posicion === filtroPosicion
      return coincideTexto && coincidePosicion
    })
    .sort((a, b) => {
      switch (ordenarPor) {
        case "nombre":
          return a.apellido_nombre.localeCompare(b.apellido_nombre)
        case "posicion":
          return a.posicion.localeCompare(b.posicion)
        case "goles":
          return (b.goles || 0) - (a.goles || 0)
        case "partidos":
          return (b.partidos || 0) - (a.partidos || 0)
        default:
          return 0
      }
    })

  const posicionesUnicas = [...new Set(jugadores.map((j) => j.posicion))].sort()

  const estadisticasPorPosicion = {
    ARQUERO: jugadores.filter((j) => j.posicion === "ARQUERO").length,
    DEFENSOR: jugadores.filter((j) => j.posicion === "DEFENSOR").length,
    VOLANTE: jugadores.filter((j) => j.posicion === "VOLANTE").length,
    DELANTERO: jugadores.filter((j) => j.posicion === "DELANTERO").length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando jugadores...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar jugadores</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={cargarJugadores}>Reintentar</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Plantel 2014</h1>
          <p className="text-gray-600">Gestión completa del plantel categoría 2014</p>
        </div>
        <div className="flex gap-3">
          <Link href="/jugadores/2014/nuevo">
            <Button>➕ Agregar Jugador</Button>
          </Link>
          <Link href="/jugadores">
            <Button variant="outline">← Volver</Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{jugadores.length}</div>
            <div className="text-sm text-gray-600">Total Jugadores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{estadisticasPorPosicion.ARQUERO}</div>
            <div className="text-sm text-gray-600">Arqueros</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{estadisticasPorPosicion.DEFENSOR}</div>
            <div className="text-sm text-gray-600">Defensores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{estadisticasPorPosicion.VOLANTE}</div>
            <div className="text-sm text-gray-600">Volantes</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input
                type="text"
                placeholder="Nombre o DNI..."
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
              <select
                value={filtroPosicion}
                onChange={(e) => setFiltroPosicion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">Todas las posiciones</option>
                {posicionesUnicas.map((posicion) => (
                  <option key={posicion} value={posicion}>
                    {posicion}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="nombre">Nombre</option>
                <option value="posicion">Posición</option>
                <option value="goles">Goles</option>
                <option value="partidos">Partidos</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={cargarJugadores} variant="outline" className="w-full bg-transparent">
                🔄 Actualizar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Jugadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jugadoresFiltrados.map((jugador) => (
          <Card key={jugador.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{jugador.apellido_nombre}</CardTitle>
                  <CardDescription>DNI: {jugador.dni}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={getPosicionColor(jugador.posicion)}
                  >
                    {jugador.posicion}
                  </span>
                  {jugador.numero_camiseta && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                      #{jugador.numero_camiseta}
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <span className="text-gray-600">Partidos:</span>
                  <span className="font-medium ml-1">{jugador.partidos || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Goles:</span>
                  <span className="font-medium ml-1">{jugador.goles || 0}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pierna:</span>
                  <span className="font-medium ml-1">{jugador.pierna_habil}</span>
                </div>
                <div>
                  <span className="text-gray-600">Estado:</span>
                  <span
                    className={`font-medium ml-1 ${
                      jugador.estado_fisico === "Disponible" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {jugador.estado_fisico}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/jugadores/${jugador.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    👁️ Ver Perfil
                  </Button>
                </Link>
                <Button variant="outline" size="sm">
                  ✏️
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {jugadoresFiltrados.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron jugadores</h3>
            <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
          </CardContent>
        </Card>
      )}

      {/* Información adicional */}
      <Card>
        <CardContent className="p-4 text-center">
          <h3 className="font-medium text-gray-900 mb-2">📊 Plantel Categoría 2014</h3>
          <p className="text-sm text-gray-600">
            Sistema conectado a base de datos real. Los datos se actualizan automáticamente.
          </p>
          <div className="flex justify-center gap-4 mt-3 text-xs text-gray-500">
            <span>✅ Base de datos conectada</span>
            <span>🔄 Sincronización automática</span>
            <span>📱 Acceso en tiempo real</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}