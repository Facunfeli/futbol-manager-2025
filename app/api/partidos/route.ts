import { NextRequest, NextResponse } from "next/server";
import { obtenerPartidos } from "@/database";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const partidos = await obtenerPartidos(categoria || undefined);
    return NextResponse.json(partidos);
  } catch (error) {
    console.error("Error in GET /api/partidos:", error);
    return NextResponse.json({ error: "Error fetching partidos" }, { status: 500 });
  }
}