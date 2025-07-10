import { NextResponse } from "next/server";
import { obtenerJugadores } from "@/lib/database";

export async function GET() {
  try {
    const jugadores = await obtenerJugadores();
    return NextResponse.json(jugadores);
  } catch (error) {
    console.error("Error obteniendo jugadores:", error);
    return NextResponse.json({ error: "Error obteniendo jugadores" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const jugadorData = await request.json();
    const nuevoJugador = await crearJugador(jugadorData);
    return NextResponse.json(nuevoJugador, { status: 201 });
  } catch (error) {
    console.error("Error creando jugador:", error);
    return NextResponse.json({ error: "Error creando jugador" }, { status: 500 });
  }
}