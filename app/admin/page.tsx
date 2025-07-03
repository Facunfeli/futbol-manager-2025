"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

interface Partido {
  id: number
  fecha: string
  rival: string
  categoria: string
  estado: string
  resultado_propio?: number
  resultado_rival?: number
  es_local: boolean
}

interface Jugador {
  id: number
  nombre: string
  apellido: string
  categoria: string
  posicion: string
  estado_fisico: string
}

export default function AdminPage() {
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partidosRes, jugadoresRes] = await Promise.all([fetch("/api/partidos"), fetch("/api/jugadores")])

        if (partidosRes.ok) {
          const partidosData = await partidosRes.json()
          setPartidos(partidosData)
        }

        if (jugadoresRes.ok) {
          const jugadoresData = await jugadoresRes.json()
          setJugadores(jugadoresData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Estadísticas calculadas
  const partidosJugados = partidos.filter((p) => p.estado === "finalizado")
  const partidosPendientes = partidos.filter((p) => p.estado === "programado")

  const victorias = partidosJugados.filter((p) => {
    const propio = p.resultado_propio ?? 0
    const rival = p.resultado_rival ?? 0
    return propio > rival
  }).length

  const empates = partidosJugados.filter((p) => {
    const propio = p.resultado_propio ?? 0
    const rival = p.resultado_rival ?? 0
    return propio === rival
  }).length

  const derrotas = partidosJugados.filter((p) => {
    const propio = p.resultado_propio ?? 0
    const rival = p.resultado_rival ?? 0
    return propio < rival
  }).length

  const jugadoresActivos = jugadores.filter((j) => j.estado_fisico === "disponible").length
  const jugadoresLesionados = jugadores.filter((j) => j.estado_fisico === "lesionado").length

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">⚙️ Panel de Administración</h1>
          <p className="text-gray-600">Gestiona resultados, estadísticas y configuraciones</p>
        </div>
        <Link href="/">
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
            ← Volver al Dashboard
          </button>
        </Link>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{victorias}</div>
          <div className="text-sm text-green-700">Victorias</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{empates}</div>
          <div className="text-sm text-yellow-700">Empates</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">{derrotas}</div>
          <div className="text-sm text-red-700">Derrotas</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{partidosPendientes.length}</div>
          <div className="text-sm text-blue-700">Pendientes</div>
        </div>
      </div>

      {/* Opciones de Administración */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gestión de Resultados */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">⚽</div>
          <h3 className="text-xl font-bold mb-2">Cargar Resultados</h3>
          <p className="text-gray-600 mb-4">Actualizar resultados de partidos jugados</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600">• Seleccionar partido</div>
            <div className="text-sm text-gray-600">• Ingresar resultado</div>
            <div className="text-sm text-gray-600">• Actualizar automáticamente</div>
          </div>
          <Link href="/admin/resultados">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              ⚽ Cargar Resultados
            </button>
          </Link>
        </div>

        {/* Estadísticas de Jugadores */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">Estadísticas Jugadores</h3>
          <p className="text-gray-600 mb-4">Registrar goles, tarjetas y minutos</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600">• Goles por jugador</div>
            <div className="text-sm text-gray-600">• Tarjetas amarillas/rojas</div>
            <div className="text-sm text-gray-600">• Minutos jugados</div>
          </div>
          <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
            📊 Próximamente
          </button>
        </div>

        {/* Gestión de Partidos */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-bold mb-2">Gestión de Partidos</h3>
          <p className="text-gray-600 mb-4">Crear, editar y programar partidos</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600">• Agregar nuevos partidos</div>
            <div className="text-sm text-gray-600">• Modificar fechas/horarios</div>
            <div className="text-sm text-gray-600">• Cambiar estados</div>
          </div>
          <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
            📅 Próximamente
          </button>
        </div>

        {/* Gestión de Jugadores */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Gestión de Jugadores</h3>
          <p className="text-gray-600 mb-4">Editar información de jugadores</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600">• Actualizar datos personales</div>
            <div className="text-sm text-gray-600">• Cambiar estados físicos</div>
            <div className="text-sm text-gray-600">• Modificar posiciones</div>
          </div>
          <Link href="/admin/jugadores">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              👥 Editar Jugadores
            </button>
          </Link>
        </div>

        {/* Estado de Jugadores */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">🏥</div>
          <h3 className="text-xl font-bold mb-2">Estado Jugadores</h3>
          <p className="text-gray-600 mb-4">Resumen del estado físico</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-green-600">• Disponibles: {jugadoresActivos}</div>
            <div className="text-sm text-red-600">• Lesionados: {jugadoresLesionados}</div>
            <div className="text-sm text-gray-600">• Total: {jugadores.length}</div>
          </div>
          <Link href="/jugadores">
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              👥 Ver Jugadores
            </button>
          </Link>
        </div>

        {/* Configuraciones */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-xl font-bold mb-2">Configuraciones</h3>
          <p className="text-gray-600 mb-4">Ajustes generales del sistema</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm text-gray-600">• Configurar temporada</div>
            <div className="text-sm text-gray-600">• Ajustar categorías</div>
            <div className="text-sm text-gray-600">• Personalizar sistema</div>
          </div>
          <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
            ⚙️ Próximamente
          </button>
        </div>
      </div>

      {/* Acceso Rápido */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-800 mb-4">🚀 Acceso Rápido</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/admin/resultados">
            <button className="w-full bg-white border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-50 transition-colors">
              ⚽ Resultado Rápido
            </button>
          </Link>
          <Link href="/jugadores/2014/nuevo">
            <button className="w-full bg-white border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-50 transition-colors">
              👥 Nuevo Jugador
            </button>
          </Link>
          <Link href="/citaciones/2014">
            <button className="w-full bg-white border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-50 transition-colors">
              📱 Citación WhatsApp
            </button>
          </Link>
          <Link href="/partidos">
            <button className="w-full bg-white border border-blue-200 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-50 transition-colors">
              📅 Ver Partidos
            </button>
          </Link>
        </div>
      </div>

      {/* Próximos Partidos */}
      {partidosPendientes.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-xl font-bold mb-4">📅 Próximos Partidos</h3>
          <div className="space-y-3">
            {partidosPendientes.slice(0, 3).map((partido) => (
              <div key={partido.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <div className="font-semibold">{partido.rival}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(partido.fecha).toLocaleDateString("es-ES")} - {partido.categoria}
                  </div>
                </div>
                <div className="text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      partido.es_local ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {partido.es_local ? "Local" : "Visitante"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
