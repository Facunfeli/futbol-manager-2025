import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

export interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  posicion: string;
  numero_camiseta?: number;
  telefono?: string;
  email?: string;
  direccion?: string;
  categoria: string;
  activo: boolean;
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

export interface Partido {
  id: number;
  fecha: string;
  rival: string;
  local: boolean;
  resultado_local?: number;
  resultado_visitante?: number;
  estado: string;
  observaciones?: string;
  categoria: string;
  created_at: string;
  updated_at: string;
}

export interface Estadistica {
  id: number;
  jugador_id: number;
  partido_id: number;
  goles: number;
  asistencias: number;
  tarjetas_amarillas: number;
  tarjetas_rojas: number;
  minutos_jugados: number;
  created_at: string;
  updated_at: string;
}

export interface Citacion {
  id: number;
  partido_id: number;
  jugador_id: number;
  citado: boolean;
  confirmado: boolean;
  motivo_ausencia?: string;
  fecha_citacion: string;
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

// Funciones para Jugadores
export async function obtenerJugadores(categoria?: string): Promise<Jugador[]> {
  try {
    let query = db.select().from(schema.jugadores).where(eq(schema.jugadores.activo, true));
    if (categoria) {
      query = query.where(eq(schema.jugadores.categoria, categoria));
    }
    query = query.orderBy(schema.jugadores.apellido, schema.jugadores.nombre);
    const result = await query;
    return result as Jugador[];
  } catch (error) {
    console.error("Error obteniendo jugadores:", error);
    throw new Error("Error obteniendo jugadores");
  }
}

export async function obtenerJugadorPorId(id: number): Promise<Jugador | null> {
  try {
    const result = await db
      .select()
      .from(schema.jugadores)
      .where(eq(schema.jugadores.id, id))
      .limit(1);
    return result.length > 0 ? (result[0] as Jugador) : null;
  } catch (error) {
    console.error("Error obteniendo jugador:", error);
    throw new Error("Error obteniendo jugador");
  }
}

export async function crearJugador(
  jugador: Omit<Jugador, "id" | "created_at" | "updated_at">,
): Promise<Jugador> {
  try {
    const result = await db
      .insert(schema.jugadores)
      .values({
        nombre: jugador.nombre,
        apellido: jugador.apellido,
        fecha_nacimiento: jugador.fecha_nacimiento,
        posicion: jugador.posicion,
        numero_camiseta: jugador.numero_camiseta,
        telefono: jugador.telefono,
        email: jugador.email,
        direccion: jugador.direccion,
        categoria: jugador.categoria,
        activo: jugador.activo,
        observaciones: jugador.observaciones,
      })
      .returning();
    return result[0] as Jugador;
  } catch (error) {
    console.error("Error creando jugador:", error);
    throw new Error("Error creando jugador");
  }
}

export async function actualizarJugador(
  id: number,
  jugador: Partial<Omit<Jugador, "id" | "created_at" | "updated_at">>,
): Promise<Jugador> {
  try {
    const result = await db
      .update(schema.jugadores)
      .set({ ...jugador, updated_at: new Date().toISOString() })
      .where(eq(schema.jugadores.id, id))
      .returning();
    return result[0] as Jugador;
  } catch (error) {
    console.error("Error actualizando jugador:", error);
    throw new Error("Error actualizando jugador");
  }
}

export async function eliminarJugador(id: number): Promise<void> {
  try {
    await db
      .update(schema.jugadores)
      .set({ activo: false })
      .where(eq(schema.jugadores.id, id));
  } catch (error) {
    console.error("Error eliminando jugador:", error);
    throw new Error("Error eliminando jugador");
  }
}

// Funciones para Partidos
export async function obtenerPartidos(categoria?: string): Promise<Partido[]> {
  try {
    let query = db.select().from(schema.partidos);
    if (categoria) {
      query = query.where(eq(schema.partidos.categoria, categoria));
    }
    query = query.orderBy(schema.partidos.fecha.desc());
    const result = await query;
    return result as Partido[];
  } catch (error) {
    console.error("Error obteniendo partidos:", error);
    throw new Error("Error obteniendo partidos");
  }
}

export async function obtenerPartidoPorId(id: number): Promise<Partido | null> {
  try {
    const result = await db
      .select()
      .from(schema.partidos)
      .where(eq(schema.partidos.id, id))
      .limit(1);
    return result.length > 0 ? (result[0] as Partido) : null;
  } catch (error) {
    console.error("Error obteniendo partido:", error);
    throw new Error("Error obteniendo partido");
  }
}

export async function crearPartido(
  partido: Omit<Partido, "id" | "created_at" | "updated_at">,
): Promise<Partido> {
  try {
    const result = await db
      .insert(schema.partidos)
      .values({
        fecha: partido.fecha,
        rival: partido.rival,
        local: partido.local,
        resultado_local: partido.resultado_local,
        resultado_visitante: partido.resultado_visitante,
        estado: partido.estado,
        observaciones: partido.observaciones,
        categoria: partido.categoria,
      })
      .returning();
    return result[0] as Partido;
  } catch (error) {
    console.error("Error creando partido:", error);
    throw new Error("Error creando partido");
  }
}

export async function actualizarPartido(
  id: number,
  partido: Partial<Omit<Partido, "id" | "created_at" | "updated_at">>,
): Promise<Partido> {
  try {
    const result = await db
      .update(schema.partidos)
      .set({ ...partido, updated_at: new Date().toISOString() })
      .where(eq(schema.partidos.id, id))
      .returning();
    return result[0] as Partido;
  } catch (error) {
    console.error("Error actualizando partido:", error);
    throw new Error("Error actualizando partido");
  }
}

// Funciones para Estadísticas
export async function obtenerEstadisticas(
  jugadorId?: number,
  partidoId?: number,
): Promise<Estadistica[]> {
  try {
    let query = db.select().from(schema.estadisticas);
    if (jugadorId) {
      query = query.where(eq(schema.estadisticas.jugador_id, jugadorId));
    }
    if (partidoId) {
      query = query.where(eq(schema.estadisticas.partido_id, partidoId));
    }
    query = query.orderBy(schema.estadisticas.created_at.desc());
    const result = await query;
    return result as Estadistica[];
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    throw new Error("Error obteniendo estadísticas");
  }
}

export async function crearEstadistica(
  estadistica: Omit<Estadistica, "id" | "created_at" | "updated_at">,
): Promise<Estadistica> {
  try {
    const result = await db
      .insert(schema.estadisticas)
      .values({
        jugador_id: estadistica.jugador_id,
        partido_id: estadistica.partido_id,
        goles: estadistica.goles,
        asistencias: estadistica.asistencias,
        tarjetas_amarillas: estadistica.tarjetas_amarillas,
        tarjetas_rojas: estadistica.tarjetas_rojas,
        minutos_jugados: estadistica.minutos_jugados,
      })
      .returning();
    return result[0] as Estadistica;
  } catch (error) {
    console.error("Error creando estadística:", error);
    throw new Error("Error creando estadística");
  }
}

// Funciones para Citaciones
export async function obtenerCitaciones(partidoId?: number, categoria?: string): Promise<Citacion[]> {
  try {
    let query = db
      .select({
        id: schema.citaciones.id,
        partido_id: schema.citaciones.partido_id,
        jugador_id: schema.citaciones.jugador_id,
        citado: schema.citaciones.citado,
        confirmado: schema.citaciones.confirmado,
        motivo_ausencia: schema.citaciones.motivo_ausencia,
        fecha_citacion: schema.citaciones.fecha_citacion,
        observaciones: schema.citaciones.observaciones,
        created_at: schema.citaciones.created_at,
        updated_at: schema.citaciones.updated_at,
      })
      .from(schema.citaciones)
      .leftJoin(schema.jugadores, eq(schema.citaciones.jugador_id, schema.jugadores.id));
    if (partidoId) {
      query = query.where(eq(schema.citaciones.partido_id, partidoId));
    }
    if (categoria) {
      query = query.where(eq(schema.jugadores.categoria, categoria));
    }
    query = query.orderBy(schema.citaciones.created_at.desc());
    const result = await query;
    return result as Citacion[];
  } catch (error) {
    console.error("Error obteniendo citaciones:", error);
    throw new Error("Error obteniendo citaciones");
  }
}

export async function crearCitacion(
  citacion: Omit<Citacion, "id" | "created_at" | "updated_at">,
): Promise<Citacion> {
  try {
    const result = await db
      .insert(schema.citaciones)
      .values({
        partido_id: citacion.partido_id,
        jugador_id: citacion.jugador_id,
        citado: citacion.citado,
        confirmado: citacion.confirmado,
        motivo_ausencia: citacion.motivo_ausencia,
        fecha_citacion: citacion.fecha_citacion,
        observaciones: citacion.observaciones,
      })
      .returning();
    return result[0] as Citacion;
  } catch (error) {
    console.error("Error creando citación:", error);
    throw new Error("Error creando citación");
  }
}

// Función para obtener estadísticas generales
export async function obtenerEstadisticasGenerales() {
  try {
    const [jugadores, partidos, estadisticas] = await Promise.all([
      obtenerJugadores(),
      obtenerPartidos(),
      obtenerEstadisticas(),
    ]);

    return {
      jugadores,
      partidos,
      estadisticas,
    };
  } catch (error) {
    console.error("Error obteniendo estadísticas generales:", error);
    throw new Error("Error obteniendo estadísticas generales");
  }
}