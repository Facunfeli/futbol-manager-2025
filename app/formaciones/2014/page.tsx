"use client"

import Link from "next/link"
import { useState } from "react"

// Datos de jugadores disponibles
const jugadoresDisponibles2014 = [
  { id: 1, nombre: "ZARATE MARTIN", posicion: "DEFENSOR", numero: 2 },
  { id: 2, nombre: "AMARILLO MARTIN", posicion: "DEFENSOR", numero: 3 },
  { id: 3, nombre: "ALVAREZ LORENZO", posicion: "DEFENSOR", numero: 4 },
  { id: 4, nombre: "BREY FEDERICO", posicion: "DEFENSOR", numero: 5 },
  { id: 5, nombre: "BENITEZ BENJAMIN", posicion: "ARQUERO", numero: 1 },
  { id: 6, nombre: "CABALLERO THIAGO", posicion: "VOLANTE", numero: 6 },
  { id: 7, nombre: "LOZANO LORENZO", posicion: "DEFENSOR", numero: 7 },
  { id: 8, nombre: "DORADO MATEO", posicion: "VOLANTE", numero: 8 },
  { id: 9, nombre: "CATALAN FRANCO", posicion: "DELANTERO", numero: 9 },
  { id: 10, nombre: "OCHOA ALEJO", posicion: "DELANTERO", numero: 10 },
  { id: 11, nombre: "TORRES THIAGO", posicion: "DELANTERO", numero: 11 },
  { id: 12, nombre: "SOSA CIRO", posicion: "DELANTERO", numero: 12 },
  { id: 13, nombre: "ZABALA BENICIO", posicion: "VOLANTE", numero: 13 },
  { id: 14, nombre: "UMAÑO SIMON", posicion: "VOLANTE", numero: 14 },
  { id: 15, nombre: "ORTIZ CIRILO AARON", posicion: "VOLANTE", numero: 15 },
]

// Esquemas tácticos predefinidos
const esquemasTacticos = {
  "4-4-2": {
    nombre: "4-4-2 Clásico",
    posiciones: [
      { id: "arquero", x: 50, y: 90, label: "ARQ" },
      { id: "def1", x: 20, y: 70, label: "DI" },
      { id: "def2", x: 40, y: 75, label: "DC" },
      { id: "def3", x: 60, y: 75, label: "DC" },
      { id: "def4", x: 80, y: 70, label: "DD" },
      { id: "vol1", x: 20, y: 45, label: "VI" },
      { id: "vol2", x: 40, y: 50, label: "MC" },
      { id: "vol3", x: 60, y: 50, label: "MC" },
      { id: "vol4", x: 80, y: 45, label: "VD" },
      { id: "del1", x: 35, y: 20, label: "DC" },
      { id: "del2", x: 65, y: 20, label: "DC" },
    ],
  },
  "4-3-3": {
    nombre: "4-3-3 Ofensivo",
    posiciones: [
      { id: "arquero", x: 50, y: 90, label: "ARQ" },
      { id: "def1", x: 20, y: 70, label: "DI" },
      { id: "def2", x: 40, y: 75, label: "DC" },
      { id: "def3", x: 60, y: 75, label: "DC" },
      { id: "def4", x: 80, y: 70, label: "DD" },
      { id: "vol1", x: 30, y: 50, label: "MC" },
      { id: "vol2", x: 50, y: 45, label: "MC" },
      { id: "vol3", x: 70, y: 50, label: "MC" },
      { id: "del1", x: 25, y: 20, label: "EI" },
      { id: "del2", x: 50, y: 15, label: "DC" },
      { id: "del3", x: 75, y: 20, label: "ED" },
    ],
  },
  "3-5-2": {
    nombre: "3-5-2 Equilibrado",
    posiciones: [
      { id: "arquero", x: 50, y: 90, label: "ARQ" },
      { id: "def1", x: 30, y: 75, label: "DC" },
      { id: "def2", x: 50, y: 80, label: "LIB" },
      { id: "def3", x: 70, y: 75, label: "DC" },
      { id: "vol1", x: 15, y: 50, label: "CI" },
      { id: "vol2", x: 35, y: 45, label: "MC" },
      { id: "vol3", x: 50, y: 40, label: "MC" },
      { id: "vol4", x: 65, y: 45, label: "MC" },
      { id: "vol5", x: 85, y: 50, label: "CD" },
      { id: "del1", x: 40, y: 20, label: "DC" },
      { id: "del2", x: 60, y: 20, label: "DC" },
    ],
  },
}

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

export default function Formaciones2014Page() {
  const [esquemaSeleccionado, setEsquemaSeleccionado] = useState<keyof typeof esquemasTacticos>("4-4-2")
  const [jugadoresEnCancha, setJugadoresEnCancha] = useState<{ [key: string]: any }>({})
  const [nombreFormacion, setNombreFormacion] = useState("")
  const [formacionGuardada, setFormacionGuardada] = useState(false)

  const esquemaActual = esquemasTacticos[esquemaSeleccionado]

  const asignarJugador = (posicionId: string, jugador: any) => {
    setJugadoresEnCancha((prev) => ({
      ...prev,
      [posicionId]: jugador,
    }))
  }

  const removerJugador = (posicionId: string) => {
    setJugadoresEnCancha((prev) => {
      const nuevo = { ...prev }
      delete nuevo[posicionId]
      return nuevo
    })
  }

  const limpiarFormacion = () => {
    setJugadoresEnCancha({})
  }

  const guardarFormacion = () => {
    if (!nombreFormacion.trim()) {
      alert("Por favor ingresa un nombre para la formación")
      return
    }

    const posicionesOcupadas = Object.keys(jugadoresEnCancha).length
    if (posicionesOcupadas < 11) {
      alert(`Faltan ${11 - posicionesOcupadas} jugadores para completar la formación`)
      return
    }

    // Aquí guardarías en la base de datos
    setFormacionGuardada(true)
    setTimeout(() => setFormacionGuardada(false), 3000)
  }

  const jugadoresUsados = Object.values(jugadoresEnCancha).map((j: any) => j?.id)
  const jugadoresLibres = jugadoresDisponibles2014.filter((j) => !jugadoresUsados.includes(j.id))

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏆 Formaciones 2014</h1>
          <p className="text-gray-600">Arma tu formación táctica para la categoría 2014</p>
        </div>
        <Link href="/formaciones">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">← Volver a Formaciones</button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cancha de Fútbol */}
        <div className="lg:col-span-2">
          {/* Controles */}
          <div className="flex flex-wrap gap-4 items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Esquema Táctico:</label>
              <select
                value={esquemaSeleccionado}
                onChange={(e) => {
                  setEsquemaSeleccionado(e.target.value as keyof typeof esquemasTacticos)
                  setJugadoresEnCancha({})
                }}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {Object.entries(esquemasTacticos).map(([key, esquema]) => (
                  <option key={key} value={key}>
                    {esquema.nombre}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={limpiarFormacion}
              className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
            >
              🗑️ Limpiar
            </button>

            <div className="ml-auto text-sm text-gray-600">Jugadores: {Object.keys(jugadoresEnCancha).length}/11</div>
          </div>

          {/* Cancha */}
          <div className="relative w-full h-[600px] bg-gradient-to-b from-green-400 to-green-500 border-4 border-white rounded-lg overflow-hidden shadow-lg">
            {/* Líneas de la cancha */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 left-[30%] right-[30%] h-16 border-2 border-white border-t-0" />
            <div className="absolute bottom-0 left-[30%] right-[30%] h-16 border-2 border-white border-b-0" />

            {/* Posiciones del esquema */}
            {esquemaActual.posiciones.map((posicion) => {
              const jugadorAsignado = jugadoresEnCancha[posicion.id]

              return (
                <div
                  key={posicion.id}
                  className="absolute w-14 h-14 rounded-full border-2 border-white flex flex-col items-center justify-center cursor-pointer text-xs font-bold shadow-md transition-all duration-200 hover:scale-110"
                  style={{
                    left: `${posicion.x}%`,
                    top: `${posicion.y}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: jugadorAsignado
                      ? getPosicionColor(jugadorAsignado.posicion)
                      : "rgba(255,255,255,0.3)",
                    color: jugadorAsignado ? "white" : "#666",
                  }}
                  onClick={() => {
                    if (jugadorAsignado) {
                      removerJugador(posicion.id)
                    }
                  }}
                  title={
                    jugadorAsignado ? `${jugadorAsignado.nombre} - Click para remover` : `${posicion.label} - Vacío`
                  }
                >
                  {jugadorAsignado ? (
                    <>
                      <div>{jugadorAsignado.numero}</div>
                      <div className="text-[8px] text-center leading-none">{jugadorAsignado.nombre.split(" ")[0]}</div>
                    </>
                  ) : (
                    <div>{posicion.label}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Jugadores Disponibles */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              👥 Jugadores Disponibles ({jugadoresLibres.length})
            </h3>
            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-lg bg-white">
              {jugadoresLibres.map((jugador) => (
                <div
                  key={jugador.id}
                  className="p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => {
                    // Buscar posición vacía compatible
                    const posicionesVacias = esquemaActual.posiciones.filter((p) => !jugadoresEnCancha[p.id])
                    if (posicionesVacias.length > 0) {
                      asignarJugador(posicionesVacias[0].id, jugador)
                    }
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: getPosicionColor(jugador.posicion) }}
                  >
                    {jugador.numero}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{jugador.nombre}</div>
                    <div className="text-xs text-gray-500">{jugador.posicion}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              💡 Click en un jugador para agregarlo a la primera posición disponible
            </p>
          </div>

          {/* Guardar Formación */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💾 Guardar Formación</h3>
            <input
              type="text"
              placeholder="Nombre de la formación..."
              value={nombreFormacion}
              onChange={(e) => setNombreFormacion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-3"
            />
            <button
              onClick={guardarFormacion}
              disabled={Object.keys(jugadoresEnCancha).length < 11}
              className={`w-full py-2 px-4 rounded ${
                Object.keys(jugadoresEnCancha).length < 11
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {Object.keys(jugadoresEnCancha).length < 11
                ? `Faltan ${11 - Object.keys(jugadoresEnCancha).length} jugadores`
                : "💾 Guardar Formación"}
            </button>

            {formacionGuardada && (
              <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
                ✅ ¡Formación guardada exitosamente!
              </div>
            )}
          </div>

          {/* Estadísticas */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">📊 Resumen</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Esquema: {esquemaActual.nombre}</div>
              <div>• Jugadores en cancha: {Object.keys(jugadoresEnCancha).length}/11</div>
              <div>• Jugadores disponibles: {jugadoresLibres.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
