import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export async function GET() {
  try {
    // Suponiendo que tienes una tabla 'citaciones' en schema.ts
    const citaciones = await db
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
        partido_rival: schema.partidos.rival,
        partido_fecha: schema.partidos.fecha,
        partido_local: schema.partidos.local,
      })
      .from(schema.citaciones)
      .leftJoin(schema.jugadores, schema.eq(schema.citaciones.jugador_id, schema.jugadores.id))
      .leftJoin(schema.partidos, schema.eq(schema.citaciones.partido_id, schema.partidos.id));

    return NextResponse.json(citaciones);
  } catch (error) {
    console.error("Error fetching citaciones:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}