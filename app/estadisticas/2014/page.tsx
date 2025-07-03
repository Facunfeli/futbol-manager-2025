"use client"

import Link from "next/link"
import { useState } from "react"

// Datos extendidos de jugadores con velocidad en 100m
const jugadoresCompletos = [
  {
    id: 1,
    nombre: "ZARATE MARTIN",
    posicion: "DEFENSOR",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.8,
    minutos_totales: 0,
  },
  {
    id: 2,
    nombre: "AMARILLO MARTIN",
    posicion: "DEFENSOR",
    partidos: 6,
    goles: 0,
    amarillas: 1,
    rojas: 0,
    velocidad_100m: 13.2,
    minutos_totales: 540,
  },
  {
    id: 3,
    nombre: "ALVAREZ LORENZO",
    posicion: "DEFENSOR",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.9,
    minutos_totales: 90,
  },
  {
    id: 4,
    nombre: "BREY FEDERICO",
    posicion: "DEFENSOR",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 13.1,
    minutos_totales: 90,
  },
  {
    id: 5,
    nombre: "BENITEZ BENJAMIN",
    posicion: "ARQUERO",
    partidos: 5,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 14.2,
    minutos_totales: 450,
  },
  {
    id: 6,
    nombre: "CABALLERO THIAGO",
    posicion: "VOLANTE",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.8,
    minutos_totales: 90,
  },
  {
    id: 7,
    nombre: "LOZANO LORENZO",
    posicion: "DEFENSOR",
    partidos: 5,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.7,
    minutos_totales: 450,
  },
  {
    id: 8,
    nombre: "DORADO MATEO",
    posicion: "VOLANTE",
    partidos: 6,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.1,
    minutos_totales: 540,
  },
  {
    id: 9,
    nombre: "CATALAN FRANCO",
    posicion: "DELANTERO",
    partidos: 6,
    goles: 1,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.5,
    minutos_totales: 540,
  },
  {
    id: 10,
    nombre: "OCHOA ALEJO",
    posicion: "DELANTERO",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.9,
    minutos_totales: 90,
  },
  {
    id: 11,
    nombre: "TORRES THIAGO",
    posicion: "DELANTERO",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.7,
    minutos_totales: 180,
  },
  {
    id: 12,
    nombre: "SOSA CIRO",
    posicion: "DELANTERO",
    partidos: 3,
    goles: 1,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.6,
    minutos_totales: 270,
  },
  {
    id: 13,
    nombre: "ZABALA BENICIO",
    posicion: "VOLANTE",
    partidos: 4,
    goles: 2,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.0,
    minutos_totales: 360,
  },
  {
    id: 14,
    nombre: "UMAÑO SIMON",
    posicion: "VOLANTE",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.3,
    minutos_totales: 0,
  },
  {
    id: 15,
    nombre: "ORTIZ CIRILO AARON",
    posicion: "VOLANTE",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.2,
    minutos_totales: 0,
  },
]

// Datos de partidos con formaciones utilizadas
const partidosConFormacion = [
  { id: 1, rival: "Club Atlético Rival", resultado: "Victoria", formacion: "4-4-2", goles_favor: 2, goles_contra: 1 },
  { id: 2, rival: "Deportivo Central", resultado: "Empate", formacion: "4-3-3", goles_favor: 1, goles_contra: 1 },
  { id: 3, rival: "Racing Local", resultado: "Victoria", formacion: "4-4-2", goles_favor: 3, goles_contra: 0 },
  { id: 4, rival: "Club Unidos", resultado: "Derrota", formacion: "3-5-2", goles_favor: 0, goles_contra: 2 },
  { id: 5, rival: "Atlético Sur", resultado: "Victoria", formacion: "4-4-2", goles_favor: 2, goles_contra: 1 },
  { id: 6, rival: "Deportivo Norte", resultado: "Victoria", formacion: "4-3-3", goles_favor: 4, goles_contra: 2 },
]

const getPosicionColor = (posicion: string) => {
  switch (posicion) {
    case "ARQUERO":
      return "#ffc107"
    case "DEFENSOR":
      return "#007bff"
    case "VOLANTE":
      return "#28a745"
    case "DELANTERO":
      return "#dc3545"
    default:
      return "#6c757d"
  }
}

export default function EstadisticasPage() {
  const [vistaActiva, setVistaActiva] = useState("general")

  // Cálculos de estadísticas
  const topGoleadores = jugadoresCompletos
    .filter((j) => j.goles > 0)
    .sort((a, b) => b.goles - a.goles)
    .slice(0, 5)

  const masPartidos = jugadoresCompletos
    .filter((j) => j.partidos > 0)
    .sort((a, b) => b.partidos - a.partidos)
    .slice(0, 5)

  const masRapidos = jugadoresCompletos.sort((a, b) => a.velocidad_100m - b.velocidad_100m).slice(0, 5)

  const estadisticasPorPosicion = {
    ARQUERO: jugadoresCompletos.filter((j) => j.posicion === "ARQUERO"),
    DEFENSOR: jugadoresCompletos.filter((j) => j.posicion === "DEFENSOR"),
    VOLANTE: jugadoresCompletos.filter((j) => j.posicion === "VOLANTE"),
    DELANTERO: jugadoresCompletos.filter((j) => j.posicion === "DELANTERO"),
  }

  // Estadísticas por formación
  const estadisticasFormacion = Object.entries(
    partidosConFormacion.reduce((acc: Record<string, any>, partido) => {
      if (!acc[partido.formacion]) {
        acc[partido.formacion] = { victorias: 0, empates: 0, derrotas: 0, total: 0, goles_favor: 0, goles_contra: 0 }
      }
      const resultado = partido.resultado.toLowerCase()
      if (resultado === "victoria") {
        acc[partido.formacion].victorias++
      } else if (resultado === "empate") {
        acc[partido.formacion].empates++
      } else {
        acc[partido.formacion].derrotas++
      }
      acc[partido.formacion].total++
      acc[partido.formacion].goles_favor += partido.goles_favor
      acc[partido.formacion].goles_contra += partido.goles_contra
      return acc
    }, {}),
  )
    .map(([formacion, stats]: [string, any]) => ({
      formacion,
      victorias: stats.victorias,
      empates: stats.empates,
      derrotas: stats.derrotas,
      total: stats.total,
      goles_favor: stats.goles_favor,
      goles_contra: stats.goles_contra,
      efectividad: (((stats.victorias + stats.empates * 0.5) / stats.total) * 100).toFixed(1),
    }))
    .sort((a, b) => Number.parseFloat(b.efectividad) - Number.parseFloat(a.efectividad))

  return (
    <div className="p-5 font-sans">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-3xl text-gray-800 mb-2">📊 Estadísticas 2014</h1>
            <p className="text-gray-600">Análisis completo de rendimiento de la categoría 2014</p>
          </div>
          <Link
            href="/estadisticas"
            className="bg-gray-500 text-white px-5 py-2 rounded text-sm no-underline hover:bg-gray-600"
          >
            ← Volver a Estadísticas
          </Link>
        </div>
      </div>

      {/* Navegación de pestañas */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: "general", label: "📊 General", icon: "📊" },
          { id: "jugadores", label: "👥 Jugadores", icon: "👥" },
          { id: "posiciones", label: "⚽ Por Posición", icon: "⚽" },
          { id: "formaciones", label: "🏆 Formaciones", icon: "🏆" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setVistaActiva(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              vistaActiva === tab.id
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido según pestaña activa */}
      {vistaActiva === "general" && (
        <div>
          {/* Resumen General */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
              <h3 className="mb-2 text-gray-800">⚽ Total Goles</h3>
              <div className="text-3xl font-bold text-green-600">
                {jugadoresCompletos.reduce((sum, j) => sum + j.goles, 0)}
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
              <h3 className="mb-2 text-gray-800">🏃‍♂️ Más Rápido</h3>
              <div className="text-xl font-bold text-blue-600">{masRapidos[0]?.velocidad_100m}s</div>
              <div className="text-xs text-gray-600">{masRapidos[0]?.nombre.split(" ")[0]}</div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
              <h3 className="mb-2 text-gray-800">🟨 Tarjetas</h3>
              <div className="text-3xl font-bold text-yellow-500">
                {jugadoresCompletos.reduce((sum, j) => sum + j.amarillas, 0)}
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg border border-gray-200 text-center">
              <h3 className="mb-2 text-gray-800">🏆 Mejor Formación</h3>
              <div className="text-xl font-bold text-purple-600">{estadisticasFormacion[0]?.formacion}</div>
              <div className="text-xs text-gray-600">{estadisticasFormacion[0]?.efectividad}% efectividad</div>
            </div>
          </div>

          {/* Top Goleadores */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 mb-5">
            <h3 className="mb-5 text-gray-800">🥇 Top Goleadores</h3>
            <div className="space-y-3">
              {topGoleadores.map((jugador, index) => (
                <div key={jugador.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-yellow-500 min-w-8">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}°`}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{jugador.nombre}</div>
                    <div className="text-xs text-gray-600">{jugador.posicion}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{jugador.goles}</div>
                    <div className="text-xs text-gray-600">goles</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {vistaActiva === "jugadores" && (
        <div>
          {/* Más Partidos Jugados */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 mb-5">
            <h3 className="mb-5 text-gray-800">🏃‍♂️ Más Partidos Jugados</h3>
            <div className="space-y-3">
              {masPartidos.map((jugador, index) => (
                <div key={jugador.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600 min-w-8">{index + 1}°</div>
                  <div className="flex-1">
                    <div className="font-bold">{jugador.nombre}</div>
                    <div className="text-xs text-gray-600">{jugador.posicion}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{jugador.partidos}</div>
                    <div className="text-xs text-gray-600">partidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-600">{jugador.minutos_totales}</div>
                    <div className="text-xs text-gray-600">minutos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jugadores Más Rápidos */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="mb-5 text-gray-800">⚡ Ranking de Velocidad (100m)</h3>
            <div className="space-y-3">
              {masRapidos.map((jugador, index) => (
                <div key={jugador.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-red-600 min-w-8">{index === 0 ? "🏃‍♂️" : `${index + 1}°`}</div>
                  <div className="flex-1">
                    <div className="font-bold">{jugador.nombre}</div>
                    <div className="text-xs text-gray-600">{jugador.posicion}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{jugador.velocidad_100m}s</div>
                    <div className="text-xs text-gray-600">100 metros</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {vistaActiva === "posiciones" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(estadisticasPorPosicion).map(([posicion, jugadores]) => (
            <div key={posicion} className="bg-white p-5 rounded-lg border border-gray-200">
              <h3 className="mb-4 flex items-center gap-3" style={{ color: getPosicionColor(posicion) }}>
                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: getPosicionColor(posicion) }}></div>
                {posicion}S ({jugadores.length})
              </h3>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Estadísticas Generales:</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>• Partidos: {jugadores.reduce((sum, j) => sum + j.partidos, 0)}</div>
                  <div>• Goles: {jugadores.reduce((sum, j) => sum + j.goles, 0)}</div>
                  <div>• Tarjetas: {jugadores.reduce((sum, j) => sum + j.amarillas, 0)}</div>
                  <div>• Minutos: {jugadores.reduce((sum, j) => sum + j.minutos_totales, 0)}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-3">Más Destacado:</div>
                {jugadores.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="font-bold text-sm">
                      {jugadores.sort((a, b) => b.partidos + b.goles - (a.partidos + a.goles))[0]?.nombre}
                    </div>
                    <div className="text-xs text-gray-600">
                      {jugadores.sort((a, b) => b.partidos + b.goles - (a.partidos + a.goles))[0]?.partidos} partidos,{" "}
                      {jugadores.sort((a, b) => b.partidos + b.goles - (a.partidos + a.goles))[0]?.goles} goles
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {vistaActiva === "formaciones" && (
        <div>
          <div className="bg-white p-5 rounded-lg border border-gray-200 mb-5">
            <h3 className="mb-5 text-gray-800">🏆 Efectividad por Formación</h3>
            <div className="space-y-4">
              {estadisticasFormacion.map((stat, index) => (
                <div key={stat.formacion} className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{stat.formacion}</h4>
                      <div className="text-sm text-gray-600">{stat.total} partidos jugados</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${index === 0 ? "text-green-600" : "text-blue-600"}`}>
                        {stat.efectividad}%
                      </div>
                      <div className="text-xs text-gray-600">efectividad</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">{stat.victorias}</div>
                      <div className="text-xs text-gray-600">Victorias</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-yellow-500">{stat.empates}</div>
                      <div className="text-xs text-gray-600">Empates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-red-600">{stat.derrotas}</div>
                      <div className="text-xs text-gray-600">Derrotas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">{stat.goles_favor}</div>
                      <div className="text-xs text-gray-600">Goles a favor</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-600">{stat.goles_contra}</div>
                      <div className="text-xs text-gray-600">Goles en contra</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h4 className="mb-2 text-blue-800">💡 Recomendación Táctica</h4>
            <p className="text-blue-800">
              Basado en los resultados, la formación <strong>{estadisticasFormacion[0]?.formacion}</strong> ha sido la
              más efectiva con un {estadisticasFormacion[0]?.efectividad}% de efectividad. Considera usarla en partidos
              importantes.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
