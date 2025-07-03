"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

interface Jugador {
  id: number
  nombre: string
  posicion: string
  partidos: number
  goles: number
  amarillas: number
  rojas: number
}

interface EstadisticasEquipo {
  totalPartidos: number
  victorias: number
  empates: number
  derrotas: number
  golesAFavor: number
  golesEnContra: number
}

export default function Estadisticas2014Page() {
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [estadisticasEquipo, setEstadisticasEquipo] = useState<EstadisticasEquipo>({
    totalPartidos: 0,
    victorias: 0,
    empates: 0,
    derrotas: 0,
    golesAFavor: 0,
    golesEnContra: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    cargarEstadisticas()
  }, [])

  const cargarEstadisticas = async () => {
    try {
      setLoading(true)
      const [jugadoresRes, estadisticasRes] = await Promise.all([fetch("/api/jugadores"), fetch("/api/estadisticas")])

      if (!jugadoresRes.ok || !estadisticasRes.ok) {
        throw new Error("Error cargando estadísticas")
      }

      const jugadoresData = await jugadoresRes.json()
      const estadisticasData = await estadisticasRes.json()

      setJugadores(jugadoresData)
      setEstadisticasEquipo(estadisticasData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  const getPosicionColor = (posicion: string) => {
    switch (posicion) {
      case "ARQUERO":
        return "bg-yellow-100 text-yellow-800"
      case "DEFENSOR":
        return "bg-blue-100 text-blue-800"
      case "VOLANTE":
        return "bg-green-100 text-green-800"
      case "DELANTERO":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const goleadores = jugadores
    .filter((j) => j.goles > 0)
    .sort((a, b) => b.goles - a.goles)
    .slice(0, 5)

  const masPartidos = jugadores.sort((a, b) => b.partidos - a.partidos).slice(0, 5)

  const tarjeteros = jugadores
    .filter((j) => j.amarillas > 0 || j.rojas > 0)
    .sort((a, b) => b.amarillas + b.rojas * 2 - (a.amarillas + a.rojas * 2))
    .slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error al cargar estadísticas</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={cargarEstadisticas}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 Estadísticas 2014</h1>
          <p className="text-gray-600">Estadísticas completas de la categoría 2014</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={cargarEstadisticas}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            🔄 Actualizar
          </button>
          <Link href="/estadisticas">
            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
              ← Volver
            </button>
          </Link>
        </div>
      </div>

      {/* Estadísticas del Equipo */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{estadisticasEquipo.totalPartidos}</div>
          <div className="text-sm text-gray-600">Partidos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-green-600">{estadisticasEquipo.victorias}</div>
          <div className="text-sm text-gray-600">Victorias</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-yellow-600">{estadisticasEquipo.empates}</div>
          <div className="text-sm text-gray-600">Empates</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-red-600">{estadisticasEquipo.derrotas}</div>
          <div className="text-sm text-gray-600">Derrotas</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-blue-600">{estadisticasEquipo.golesAFavor}</div>
          <div className="text-sm text-gray-600">Goles a Favor</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border text-center">
          <div className="text-2xl font-bold text-gray-600">{estadisticasEquipo.golesEnContra}</div>
          <div className="text-sm text-gray-600">Goles en Contra</div>
        </div>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Goleadores */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">⚽ Top Goleadores</h2>
          {goleadores.length > 0 ? (
            <div className="space-y-3">
              {goleadores.map((jugador, index) => (
                <div key={jugador.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                    <div>
                      <div className="font-medium">{jugador.nombre}</div>
                      <span className={`px-2 py-1 rounded text-xs ${getPosicionColor(jugador.posicion)}`}>
                        {jugador.posicion}
                      </span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-600">{jugador.goles}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No hay goles registrados</p>
          )}
        </div>

        {/* Más Partidos */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🏃 Más Partidos</h2>
          {masPartidos.length > 0 ? (
            <div className="space-y-3">
              {masPartidos.map((jugador, index) => (
                <div key={jugador.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                    <div>
                      <div className="font-medium">{jugador.nombre}</div>
                      <span className={`px-2 py-1 rounded text-xs ${getPosicionColor(jugador.posicion)}`}>
                        {jugador.posicion}
                      </span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-blue-600">{jugador.partidos}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No hay partidos registrados</p>
          )}
        </div>

        {/* Tarjetas */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">🟨 Tarjetas</h2>
          {tarjeteros.length > 0 ? (
            <div className="space-y-3">
              {tarjeteros.map((jugador, index) => (
                <div key={jugador.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                    <div>
                      <div className="font-medium">{jugador.nombre}</div>
                      <span className={`px-2 py-1 rounded text-xs ${getPosicionColor(jugador.posicion)}`}>
                        {jugador.posicion}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {jugador.amarillas > 0 && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">🟨 {jugador.amarillas}</span>
                    )}
                    {jugador.rojas > 0 && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">🟥 {jugador.rojas}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No hay tarjetas registradas</p>
          )}
        </div>
      </div>

      {/* Tabla Completa de Jugadores */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">📋 Estadísticas Completas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jugador
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posición
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partidos
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goles
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">🟨</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">🟥</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jugadores.map((jugador) => (
                <tr key={jugador.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{jugador.nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs ${getPosicionColor(jugador.posicion)}`}>
                      {jugador.posicion}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">{jugador.partidos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-green-600">
                    {jugador.goles}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-yellow-600">
                    {jugador.amarillas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600">{jugador.rojas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Información del Sistema */}
      <div className="bg-gray-50 p-6 rounded-lg border text-center">
        <h3 className="font-medium text-gray-900 mb-2">📊 Estadísticas Categoría 2014</h3>
        <p className="text-sm text-gray-600 mb-3">
          Datos actualizados en tiempo real desde la base de datos. Incluye todas las estadísticas del torneo.
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {jugadores.length} jugadores
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            {estadisticasEquipo.totalPartidos} partidos
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Datos sincronizados
          </span>
        </div>
      </div>
    </div>
  )
}
