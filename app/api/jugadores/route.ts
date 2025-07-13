import { NextRequest, NextResponse } from "next/server";
import { obtenerJugadores } from "@/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const jugadores = await obtenerJugadores(categoria || undefined);
    return NextResponse.json(jugadores);
  } catch (error) {
    console.error("Error in GET /api/jugadores:", error);
    return NextResponse.json({ error: "Error fetching jugadores" }, { status: 500 });
  }
}