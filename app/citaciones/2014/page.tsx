"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

// Datos de jugadores
const jugadores = [
  { id: 1, nombre: "Lautaro Martínez", posicion: "Delantero", telefono: "+5491123456789" },
  { id: 2, nombre: "Julián Álvarez", posicion: "Delantero", telefono: "+5491123456790" },
  { id: 3, nombre: "Enzo Fernández", posicion: "Mediocampista", telefono: "+5491123456791" },
  { id: 4, nombre: "Alexis Mac Allister", posicion: "Mediocampista", telefono: "+5491123456792" },
  { id: 5, nombre: "Rodrigo De Paul", posicion: "Mediocampista", telefono: "+5491123456793" },
  { id: 6, nombre: "Leandro Paredes", posicion: "Mediocampista", telefono: "+5491123456794" },
  { id: 7, nombre: "Nicolás Otamendi", posicion: "Defensor", telefono: "+5491123456795" },
  { id: 8, nombre: "Cristian Romero", posicion: "Defensor", telefono: "+5491123456796" },
  { id: 9, nombre: "Nahuel Molina", posicion: "Defensor", telefono: "+5491123456797" },
  { id: 10, nombre: "Marcos Acuña", posicion: "Defensor", telefono: "+5491123456798" },
  { id: 11, nombre: "Emiliano Martínez", posicion: "Arquero", telefono: "+5491123456799" },
  { id: 12, nombre: "Franco Armani", posicion: "Arquero", telefono: "+5491123456800" },
  { id: 13, nombre: "Ángel Di María", posicion: "Mediocampista", telefono: "+5491123456801" },
  { id: 14, nombre: "Paulo Dybala", posicion: "Delantero", telefono: "+5491123456802" },
  { id: 15, nombre: "Lautaro Blanco", posicion: "Defensor", telefono: "+5491123456803" },
  { id: 16, nombre: "Valentín Carboni", posicion: "Mediocampista", telefono: "+5491123456804" },
  { id: 17, nombre: "Facundo Buonanotte", posicion: "Mediocampista", telefono: "+5491123456805" },
  { id: 18, nombre: "Valentín Barco", posicion: "Defensor", telefono: "+5491123456806" },
  { id: 19, nombre: "Thiago Almada", posicion: "Mediocampista", telefono: "+5491123456807" },
  { id: 20, nombre: "Matías Soulé", posicion: "Delantero", telefono: "+5491123456808" },
]

// Próximos partidos
const proximosPartidos = [
  { id: 1, rival: "TEMPERLEY", fecha: "2024-12-30", hora: "15:00", local: true },
  { id: 2, rival: "ESTUDIANTES", fecha: "2024-01-06", hora: "10:00", local: false },
  { id: 3, rival: "PLATENSE", fecha: "2024-01-13", hora: "15:30", local: true },
]

export default function Citaciones2014Page() {
  const router = useRouter()
  const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState<number[]>([])
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<number>(1)

  const toggleJugador = (id: number) => {
    setJugadoresSeleccionados((prev) => (prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]))
  }

  const seleccionarTodos = () => {
    setJugadoresSeleccionados(jugadores.map((j) => j.id))
  }

  const seleccionarNinguno = () => {
    setJugadoresSeleccionados([])
  }

  const seleccionarTipica = () => {
    // Seleccionar una formación típica (11 jugadores)
    const formacionTipica = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13]
    setJugadoresSeleccionados(formacionTipica)
  }

  const partido = proximosPartidos.find((p) => p.id === partidoSeleccionado)
  const jugadoresCitados = jugadores.filter((j) => jugadoresSeleccionados.includes(j.id))

  const generarMensaje = () => {
    if (!partido) return ""

    const fecha = new Date(partido.fecha).toLocaleDateString("es-AR")
    const ubicacion = partido.local ? "LOCAL" : `vs ${partido.rival}`

    return `🏆 CITACIÓN OFICIAL 🏆

📅 Partido: ${partido.rival}
📍 ${ubicacion}
🕐 Fecha: ${fecha} - ${partido.hora}hs

👥 JUGADORES CITADOS:
${jugadoresCitados.map((j, i) => `${i + 1}. ${j.nombre} (${j.posicion})`).join("\n")}

⚽ ¡Nos vemos en la cancha!
💪 #VamosEquipo`
  }

  const enviarWhatsApp = () => {
    const mensaje = generarMensaje()
    const numeroGrupo = "+5491123456789" // Número del grupo de WhatsApp
    const url = `https://wa.me/${numeroGrupo}?text=${encodeURIComponent(mensaje)}`
    window.open(url, "_blank")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">📋 Citaciones 2014</h1>
          <p className="text-gray-600 mt-1">Crear y enviar citaciones por WhatsApp</p>
        </div>
        <button
          onClick={() => router.push("/citaciones")}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          ← Volver a Citaciones
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selección de Partido */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">📅 Seleccionar Partido</h3>
          </div>
          <div className="p-6 space-y-3">
            {proximosPartidos.map((partido) => (
              <div
                key={partido.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  partidoSeleccionado === partido.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPartidoSeleccionado(partido.id)}
              >
                <div className="font-semibold">vs {partido.rival}</div>
                <div className="text-sm text-gray-600">
                  {new Date(partido.fecha).toLocaleDateString("es-AR")} - {partido.hora}
                </div>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    partido.local ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {partido.local ? "LOCAL" : "VISITANTE"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selección de Jugadores */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">👥 Seleccionar Jugadores</h3>
            <div className="flex gap-2 mt-3">
              <button
                onClick={seleccionarTodos}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Todos
              </button>
              <button
                onClick={seleccionarNinguno}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Ninguno
              </button>
              <button
                onClick={seleccionarTipica}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Típica
              </button>
            </div>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-2">
              {jugadores.map((jugador) => (
                <div key={jugador.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={jugadoresSeleccionados.includes(jugador.id)}
                    onChange={() => toggleJugador(jugador.id)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{jugador.nombre}</div>
                    <div className="text-sm text-gray-500">{jugador.posicion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vista Previa y Envío */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2">📱 Vista Previa</h3>
            <p className="text-sm text-gray-600">{jugadoresSeleccionados.length} jugadores seleccionados</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <pre className="text-sm whitespace-pre-wrap font-mono">{generarMensaje()}</pre>
            </div>

            <div className="space-y-2">
              <button
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                onClick={enviarWhatsApp}
                disabled={jugadoresSeleccionados.length === 0}
              >
                📱 Enviar por WhatsApp
              </button>

              <button
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                onClick={() => {
                  navigator.clipboard.writeText(generarMensaje())
                  alert("Mensaje copiado al portapapeles")
                }}
                disabled={jugadoresSeleccionados.length === 0}
              >
                📋 Copiar Mensaje
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{jugadores.length}</div>
            <div className="text-sm text-gray-600">Total Jugadores</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{jugadoresSeleccionados.length}</div>
            <div className="text-sm text-gray-600">Seleccionados</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{proximosPartidos.length}</div>
            <div className="text-sm text-gray-600">Próximos Partidos</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-gray-600">Sistema Activo</div>
          </div>
        </div>
      </div>
    </div>
  )
}
