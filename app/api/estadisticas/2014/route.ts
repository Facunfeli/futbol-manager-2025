import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria");

    let query = db
      .select({
        id: schema.estadisticas.id,
        jugador_id: schema.estadisticas.jugador_id,
        partido_id: schema.estadisticas.partido_id,
        goles: schema.estadisticas.goles,
        asistencias: schema.estadisticas.asistencias,
        tarjetas_amarillas: schema.estadisticas.tarjetas_amarillas,
        tarjetas_rojas: schema.estadisticas.tarjetas_rojas,
        minutos_jugados: schema.estadisticas.minutos_jugados,
        created_at: schema.estadisticas.created_at,
        updated_at: schema.estadisticas.updated_at,
        jugador_nombre: schema.jugadores.nombre,
        jugador_apellido: schema.jugadores.apellido,
        posicion: schema.jugadores.posicion,
        categoria: schema.jugadores.categoria,
      })
      .from(schema.estadisticas)
      .leftJoin(schema.jugadores, eq(schema.estadisticas.jugador_id, schema.jugadores.id));

    if (categoria) {
      query = query.where(eq(schema.jugadores.categoria, categoria));
    }

    const estadisticas = await query;
    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error("Error in GET /api/estadisticas:", error);
    return NextResponse.json({ error: "Error fetching estadisticas" }, { status: 500 });
  }
}