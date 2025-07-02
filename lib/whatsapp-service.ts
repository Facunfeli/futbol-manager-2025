// Servicio simplificado para citaciones por WhatsApp
export interface JugadorCitacion {
  id: number
  nombre: string
  telefono: string
  posicion: string
}

export interface PartidoCitacion {
  id: number
  fecha: string
  rival: string
  local: boolean
  hora: string
}

// Función para formatear fecha
function formatearFecha(fecha: string): string {
  const date = new Date(fecha)
  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Función para generar mensaje de citación
export function generarMensajeCitacion(partido: PartidoCitacion, mensajePersonalizado?: string): string {
  if (mensajePersonalizado && mensajePersonalizado.trim()) {
    return mensajePersonalizado
  }

  return `🏆 *CITACIÓN OFICIAL*

Estás citado para el partido:
📅 ${formatearFecha(partido.fecha)}
⏰ ${partido.hora}hs
${partido.local ? "🏠 LOCAL" : "✈️ VISITANTE"} vs ${partido.rival}

¡Te esperamos! ⚽💪`
}

// Función para generar enlace de WhatsApp
export function generarEnlaceWhatsApp(telefono: string, mensaje: string): string {
  // Limpiar el número de teléfono
  const numeroLimpio = telefono.replace(/[^\d]/g, "")

  // Codificar el mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje)

  // Generar enlace de WhatsApp Web
  return `https://wa.me/${numeroLimpio}?text=${mensajeCodificado}`
}

// Función para procesar citación
export async function procesarCitacion(
  partido: PartidoCitacion,
  jugadores: JugadorCitacion[],
  mensajePersonalizado?: string,
): Promise<{ jugador: JugadorCitacion; enlace: string }[]> {
  // Simular delay de procesamiento
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const mensaje = generarMensajeCitacion(partido, mensajePersonalizado)

  const enlaces = jugadores.map((jugador) => ({
    jugador,
    enlace: generarEnlaceWhatsApp(jugador.telefono, mensaje),
  }))

  return enlaces
}
