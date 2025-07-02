import { type NextRequest, NextResponse } from "next/server"
import { crearCitacion } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { partidoId, jugadoresIds } = await request.json()

    const citaciones = await Promise.all(
      jugadoresIds.map((jugadorId: number) =>
        crearCitacion({
          partido_id: partidoId,
          jugador_id: jugadorId,
          citado: true,
          confirmado: false,
        }),
      ),
    )

    return NextResponse.json(citaciones, { status: 201 })
  } catch (error) {
    console.error("Error creando citaciones:", error)
    return NextResponse.json({ error: "Error creando citaciones" }, { status: 500 })
  }
}
