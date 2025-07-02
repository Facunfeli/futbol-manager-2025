import { type NextRequest, NextResponse } from "next/server"
import { obtenerJugadores, crearJugador } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const anio = searchParams.get("anio")

    const jugadores = await obtenerJugadores(anio ? Number.parseInt(anio) : undefined)

    return NextResponse.json(jugadores)
  } catch (error) {
    console.error("Error en API jugadores:", error)
    return NextResponse.json({ error: "Error obteniendo jugadores" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jugadorData = await request.json()

    const nuevoJugador = await crearJugador(jugadorData)

    return NextResponse.json(nuevoJugador, { status: 201 })
  } catch (error) {
    console.error("Error creando jugador:", error)
    return NextResponse.json({ error: "Error creando jugador" }, { status: 500 })
  }
}
