import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { obtenerCitaciones } from "@/lib/database";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");

    let query = db
      .select({
        id: schema.citaciones.id,
        partido_id: schema.citaciones.partido_id,
        jugador_id: schema.citaciones.jugador_id,
        citado: schema.citaciones.citado,
        confirmado: schema.citaciones.confirmado,
        motivo_ausencia: schema.citaciones.motivo_ausencia,
        fecha_citacion: schema.citaciones.fecha_citacion,
        jugador_nombre: schema.jugadores.apellido_nombre,
        jugador_posicion: schema.jugadores.posicion,
        jugador_categoria: schema.jugadores.categoria, // Añadido
        partido_rival: schema.partidos.rival,
        partido_fecha: schema.partidos.fecha,
        partido_local: schema.partidos.local,
      })
      .from(schema.citaciones)
      .leftJoin(schema.jugadores, eq(schema.citaciones.jugador_id, schema.jugadores.id))
      .leftJoin(schema.partidos, eq(schema.citaciones.partido_id, schema.partidos.id));

    if (categoria) {
      query = query.where(eq(schema.jugadores.categoria, categoria));
    }

    const citaciones = await query;

    return NextResponse.json(citaciones);
  } catch (error) {
    console.error("Error fetching citaciones:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");
    const partidoId = searchParams.get("partidoId") ? Number(searchParams.get("partidoId")) : undefined;

    const citaciones = await obtenerCitaciones(partidoId, categoria);
    return NextResponse.json(citaciones);
  } catch (error) {
    console.error("Error fetching citaciones:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}