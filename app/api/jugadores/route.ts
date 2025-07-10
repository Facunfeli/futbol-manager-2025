import { type NextRequest, NextResponse } from "next\server"
import { obtenerJugadorPorId, actualizarJugador, eliminarJugador } from "..\..\..\..\lib\database.ts"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const jugador = await obtenerJugadorPorId(id)

    if (!jugador) {
      return NextResponse.json({ error: "Jugador no encontrado" }, { status: 404 })
    }

    return NextResponse.json(jugador)
  } catch (error) {
    console.error("Error obteniendo jugador:", error)
    return NextResponse.json({ error: "Error obteniendo jugador" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const jugadorData = await request.json()

    const jugadorActualizado = await actualizarJugador(id, jugadorData)

    return NextResponse.json(jugadorActualizado)
  } catch (error) {
    console.error("Error actualizando jugador:", error)
    return NextResponse.json({ error: "Error actualizando jugador" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    await eliminarJugador(id)

    return NextResponse.json({ message: "Jugador eliminado correctamente" })
  } catch (error) {
    console.error("Error eliminando jugador:", error)
    return NextResponse.json({ error: "Error eliminando jugador" }, { status: 500 })
  }
}
