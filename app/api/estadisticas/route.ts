import { NextResponse } from "next/server"
import { obtenerEstadisticasGenerales } from "../../../lib/database"

export async function GET() {
  try {
    const estadisticas = await obtenerEstadisticasGenerales()

    // Procesar estadísticas para el dashboard
    const jugadoresConEstadisticas = estadisticas.jugadores.map((jugador) => {
      const statsJugador = estadisticas.estadisticas.filter((e) => e.jugador_id === jugador.id)

      return {
        ...jugador,
        partidos: statsJugador.length,
        goles: statsJugador.reduce((sum, e) => sum + e.goles, 0),
        asistencias: statsJugador.reduce((sum, e) => sum + e.asistencias, 0),
        amarillas: statsJugador.reduce((sum, e) => sum + e.tarjetas_amarillas, 0),
        rojas: statsJugador.reduce((sum, e) => sum + e.tarjetas_rojas, 0),
        minutos_totales: statsJugador.reduce((sum, e) => sum + e.minutos_jugados, 0),
      }
    })

    const partidosJugados = estadisticas.partidos.filter((p) => p.estado === "Jugado").length
    const partidosProgramados = estadisticas.partidos.filter((p) => p.estado === "Programado").length

    const totalGoles = estadisticas.estadisticas.reduce((sum, e) => sum + e.goles, 0)
    const totalTarjetas = estadisticas.estadisticas.reduce((sum, e) => sum + e.tarjetas_amarillas + e.tarjetas_rojas, 0)

    return NextResponse.json({
      jugadores: jugadoresConEstadisticas,
      partidos: estadisticas.partidos,
      resumen: {
        totalJugadores: estadisticas.jugadores.length,
        partidosJugados,
        partidosProgramados,
        totalGoles,
        totalTarjetas,
      },
    })
  } catch (error) {
    console.error("Error en API estadísticas:", error)
    return NextResponse.json({ error: "Error obteniendo estadísticas" }, { status: 500 })
  }
}
