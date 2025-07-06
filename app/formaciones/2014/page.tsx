"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Jugador {
  id: number
  apellido_nombre: string
  posicion: string
  numero_camiseta?: number
  estado_fisico: string
}

interface PosicionCancha {
  x: number
  y: number
  jugador?: Jugador
}

export default function Formaciones2014Page() {
  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [esquemaSeleccionado, setEsquemaSeleccionado] = useState("4-4-2")
  const [posiciones, setPosiciones] = useState<PosicionCancha[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchJugadores() {
      try {
        const response = await fetch("/api/jugadores?categoria=2014")
        if (!response.ok) {
          throw new Error("Error al cargar jugadores")
        }
        const data = await response.json()
        setJugadores(data.filter((j: Jugador) => j.estado_fisico === "Disponible"))
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchJugadores()
  }, [])

  useEffect(() => {
    // Configurar posiciones según el esquema
    const configurarPosiciones = () => {
      const nuevasPosiciones: PosicionCancha[] = []

      switch (esquemaSeleccionado) {
        case "4-4-2":
          // Arquero
          nuevasPosiciones.push({ x: 50, y: 90 })
          // Defensores
          nuevasPosiciones.push({ x: 20, y: 70 })
          nuevasPosiciones.push({ x: 40, y: 70 })
          nuevasPosiciones.push({ x: 60, y: 70 })
          nuevasPosiciones.push({ x: 80, y: 70 })
          // Mediocampistas
          nuevasPosiciones.push({ x: 20, y: 45 })
          nuevasPosiciones.push({ x: 40, y: 45 })
          nuevasPosiciones.push({ x: 60, y: 45 })
          nuevasPosiciones.push({ x: 80, y: 45 })
          // Delanteros
          nuevasPosiciones.push({ x: 35, y: 20 })
          nuevasPosiciones.push({ x: 65, y: 20 })
          break
        case "4-3-3":
          // Arquero
          nuevasPosiciones.push({ x: 50, y: 90 })
          // Defensores
          nuevasPosiciones.push({ x: 20, y: 70 })
          nuevasPosiciones.push({ x: 40, y: 70 })
          nuevasPosiciones.push({ x: 60, y: 70 })
          nuevasPosiciones.push({ x: 80, y: 70 })
          // Mediocampistas
          nuevasPosiciones.push({ x: 30, y: 45 })
          nuevasPosiciones.push({ x: 50, y: 45 })
          nuevasPosiciones.push({ x: 70, y: 45 })
          // Delanteros
          nuevasPosiciones.push({ x: 20, y: 20 })
          nuevasPosiciones.push({ x: 50, y: 20 })
          nuevasPosiciones.push({ x: 80, y: 20 })
          break
        case "3-5-2":
          // Arquero
          nuevasPosiciones.push({ x: 50, y: 90 })
          // Defensores
          nuevasPosiciones.push({ x: 30, y: 70 })
          nuevasPosiciones.push({ x: 50, y: 70 })
          nuevasPosiciones.push({ x: 70, y: 70 })
          // Mediocampistas
          nuevasPosiciones.push({ x: 15, y: 45 })
          nuevasPosiciones.push({ x: 35, y: 45 })
          nuevasPosiciones.push({ x: 50, y: 45 })
          nuevasPosiciones.push({ x: 65, y: 45 })
          nuevasPosiciones.push({ x: 85, y: 45 })
          // Delanteros
          nuevasPosiciones.push({ x: 40, y: 20 })
          nuevasPosiciones.push({ x: 60, y: 20 })
          break
        default:
          // 4-4-2 por defecto
          nuevasPosiciones.push({ x: 50, y: 90 })
          nuevasPosiciones.push({ x: 20, y: 70 }, { x: 40, y: 70 }, { x: 60, y: 70 }, { x: 80, y: 70 })
          nuevasPosiciones.push({ x: 20, y: 45 }, { x: 40, y: 45 }, { x: 60, y: 45 }, { x: 80, y: 45 })
          nuevasPosiciones.push({ x: 35, y: 20 }, { x: 65, y: 20 })
      }

      setPosiciones(nuevasPosiciones)
    }

    configurarPosiciones()
  }, [esquemaSeleccionado])

  const asignarJugador = (posicionIndex: number, jugador: Jugador) => {
    const nuevasPosiciones = [...posiciones]
    // Remover jugador de otras posiciones
    nuevasPosiciones.forEach((pos) => {
      if (pos.jugador?.id === jugador.id) {
        pos.jugador = undefined
      }
    })
    // Asignar a nueva posición
    nuevasPosiciones[posicionIndex].jugador = jugador
    setPosiciones(nuevasPosiciones)
  }

  const removerJugador = (posicionIndex: number) => {
    const nuevasPosiciones = [...posiciones]
    nuevasPosiciones[posicionIndex].jugador = undefined
    setPosiciones(nuevasPosiciones)
  }

  const jugadoresDisponibles = jugadores.filter((jugador) => !posiciones.some((pos) => pos.jugador?.id === jugador.id))

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando formación...</p>
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Formaciones Categoría 2014</h1>
            <Link href="/formaciones" className="text-green-600 hover:text-green-800 font-medium">
              ← Volver a Formaciones
            </Link>
          </div>
          <p className="text-gray-600 mt-2">Arrastra y suelta jugadores para crear tu formación táctica</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selector de esquema */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Esquema Táctico</h2>
              <select
                value={esquemaSeleccionado}
                onChange={(e) => setEsquemaSeleccionado(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="4-4-2">4-4-2 - Clásico</option>
                <option value="4-3-3">4-3-3 - Ofensivo</option>
                <option value="3-5-2">3-5-2 - Mediocampo</option>
                <option value="4-2-3-1">4-2-3-1 - Moderno</option>
                <option value="5-3-2">5-3-2 - Defensivo</option>
              </select>
            </div>

            {/* Jugadores disponibles */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Jugadores Disponibles ({jugadoresDisponibles.length})
              </h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {jugadoresDisponibles.map((jugador) => (
                  <div
                    key={jugador.id}
                    className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("jugador", JSON.stringify(jugador))
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{jugador.apellido_nombre}</h3>
                        <p className="text-sm text-gray-600">{jugador.posicion}</p>
                      </div>
                      {jugador.numero_camiseta && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          #{jugador.numero_camiseta}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {jugadoresDisponibles.length === 0 && (
                  <p className="text-gray-500 text-center py-4">Todos los jugadores están asignados</p>
                )}
              </div>
            </div>
          </div>

          {/* Cancha de fútbol */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cancha - Esquema {esquemaSeleccionado}</h2>
              <div
                className="relative bg-green-400 rounded-lg mx-auto"
                style={{
                  width: "400px",
                  height: "600px",
                  backgroundImage: `
                    linear-gradient(90deg, rgba(255,255,255,0.1) 50%, transparent 50%),
                    linear-gradient(rgba(255,255,255,0.1) 50%, transparent 50%)
                  `,
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Líneas de la cancha */}
                <div className="absolute inset-0">
                  {/* Línea del medio */}
                  <div className="absolute w-full h-0.5 bg-white top-1/2 transform -translate-y-1/2"></div>
                  {/* Círculo central */}
                  <div className="absolute w-16 h-16 border-2 border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  {/* Áreas */}
                  <div className="absolute w-32 h-20 border-2 border-white top-2 left-1/2 transform -translate-x-1/2"></div>
                  <div className="absolute w-32 h-20 border-2 border-white bottom-2 left-1/2 transform -translate-x-1/2"></div>
                  {/* Arcos */}
                  <div className="absolute w-16 h-8 border-2 border-white border-b-0 top-0 left-1/2 transform -translate-x-1/2"></div>
                  <div className="absolute w-16 h-8 border-2 border-white border-t-0 bottom-0 left-1/2 transform -translate-x-1/2"></div>
                </div>

                {/* Posiciones de jugadores */}
                {posiciones.map((posicion, index) => (
                  <div
                    key={index}
                    className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${posicion.x}%`,
                      top: `${posicion.y}%`,
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      const jugadorData = e.dataTransfer.getData("jugador")
                      if (jugadorData) {
                        const jugador = JSON.parse(jugadorData)
                        asignarJugador(index, jugador)
                      }
                    }}
                  >
                    {posicion.jugador ? (
                      <div
                        className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg hover:bg-blue-700 transition-colors"
                        onClick={() => removerJugador(index)}
                        title={`${posicion.jugador.apellido_nombre} - Click para remover`}
                      >
                        {posicion.jugador.numero_camiseta ||
                          posicion.jugador.apellido_nombre.split(" ")[0].substring(0, 2)}
                      </div>
                    ) : (
                      <div className="w-full h-full border-2 border-dashed border-white rounded-full flex items-center justify-center text-white text-xs opacity-70 hover:opacity-100 transition-opacity">
                        +
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Controles */}
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Jugadores asignados: {posiciones.filter((p) => p.jugador).length}/{posiciones.length}
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                    onClick={() => setPosiciones(posiciones.map((p) => ({ ...p, jugador: undefined })))}
                  >
                    Limpiar Todo
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    disabled={posiciones.filter((p) => p.jugador).length < 11}
                  >
                    Guardar Formación
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de jugadores asignados */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Alineación Actual</h3>
              <div className="grid grid-cols-2 gap-4">
                {posiciones.map((posicion, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">Posición {index + 1}</span>
                    {posicion.jugador ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{posicion.jugador.apellido_nombre}</span>
                        <button
                          onClick={() => removerJugador(index)}
                          className="text-red-600 hover:text-red-800 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Sin asignar</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

