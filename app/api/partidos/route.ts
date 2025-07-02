import { type NextRequest, NextResponse } from "next/server"
import { obtenerPartidos, crearPartido } from "@/lib/database"

export async function GET() {
  try {
    const partidos = await obtenerPartidos()
    return NextResponse.json(partidos)
  } catch (error) {
    console.error("Error en API partidos:", error)
    return NextResponse.json({ error: "Error obteniendo partidos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const partidoData = await request.json()

    const nuevoPartido = await crearPartido(partidoData)

    return NextResponse.json(nuevoPartido, { status: 201 })
  } catch (error) {
    console.error("Error creando partido:", error)
    return NextResponse.json({ error: "Error creando partido" }, { status: 500 })
  }
}

