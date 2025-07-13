import { type NextRequest, NextResponse } from "next/server"
import { obtenerPartidoPorId, actualizarPartido } from "@/db/database"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const partido = await obtenerPartidoPorId(id)

    if (!partido) {
      return NextResponse.json({ error: "Partido no encontrado" }, { status: 404 })
    }

    return NextResponse.json(partido)
  } catch (error) {
    console.error("Error obteniendo partido:", error)
    return NextResponse.json({ error: "Error obteniendo partido" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const partidoData = await request.json()

    const partidoActualizado = await actualizarPartido(id, partidoData)

    return NextResponse.json(partidoActualizado)
  } catch (error) {
    console.error("Error actualizando partido:", error)
    return NextResponse.json({ error: "Error actualizando partido" }, { status: 500 })
  }
}
