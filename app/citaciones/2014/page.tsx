"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
        <Button variant="outline" onClick={() => router.push("/citaciones")} className="flex items-center gap-2">
          ← Volver a Citaciones
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selección de Partido */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📅 Seleccionar Partido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
                <Badge variant={partido.local ? "default" : "secondary"}>{partido.local ? "LOCAL" : "VISITANTE"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selección de Jugadores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">👥 Seleccionar Jugadores</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={seleccionarTodos}>
                Todos
              </Button>
              <Button size="sm" variant="outline" onClick={seleccionarNinguno}>
                Ninguno
              </Button>
              <Button size="sm" variant="outline" onClick={seleccionarTipica}>
                Típica
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
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
          </CardContent>
        </Card>

        {/* Vista Previa y Envío */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">📱 Vista Previa</CardTitle>
            <CardDescription>{jugadoresSeleccionados.length} jugadores seleccionados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <pre className="text-sm whitespace-pre-wrap font-mono">{generarMensaje()}</pre>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={enviarWhatsApp}
                disabled={jugadoresSeleccionados.length === 0}
              >
                📱 Enviar por WhatsApp
              </Button>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  navigator.clipboard.writeText(generarMensaje())
                  alert("Mensaje copiado al portapapeles")
                }}
                disabled={jugadoresSeleccionados.length === 0}
              >
                📋 Copiar Mensaje
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{jugadores.length}</div>
            <div className="text-sm text-gray-600">Total Jugadores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{jugadoresSeleccionados.length}</div>
            <div className="text-sm text-gray-600">Seleccionados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{proximosPartidos.length}</div>
            <div className="text-sm text-gray-600">Próximos Partidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-gray-600">Sistema Activo</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
