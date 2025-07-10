import { type NextRequest, NextResponse } from "next/server"; // Corregido: usar / en lugar de \
import { obtenerJugadorPorId, actualizarJugador, eliminarJugador } from "@/lib/database"; // Corregido: usar @

export async function GET(request: NextRequest) {
  try {
    // Ejemplo: Obtener todos los jugadores
    const jugadores = await obtenerJugadorPorId(); // Ajusta según la función real
    return NextResponse.json(jugadores);
  } catch (error) {
    console.error("Error obteniendo jugadores:", error);
    return NextResponse.json({ error: "Error obteniendo jugadores" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const jugadorData = await request.json();
    const nuevoJugador = await actualizarJugador(0, jugadorData); // Ajusta según la función real
    return NextResponse.json(nuevoJugador, { status: 201 });
  } catch (error) {
    console.error("Error creando jugador:", error);
    return NextResponse.json({ error: "Error creando jugador" }, { status: 500 });
  }
}