import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface Jugador {
  id: number
  nombre: string
  apellido: string
  fecha_nacimiento: string
  posicion: string
  numero_camiseta?: number
  telefono?: string
  email?: string
  direccion?: string
  categoria: string
  activo: boolean
  observaciones?: string
  created_at: string
  updated_at: string
}

export interface Partido {
  id: number
  fecha: string
  rival: string
  local: boolean
  resultado_local?: number
  resultado_visitante?: number
  estado: string
  observaciones?: string
  categoria: string
  created_at: string
  updated_at: string
}

export interface Estadistica {
  id: number
  jugador_id: number
  partido_id: number
  goles: number
  asistencias: number
  tarjetas_amarillas: number
  tarjetas_rojas: number
  minutos_jugados: number
  created_at: string
  updated_at: string
}

export interface Citacion {
  id: number
  partido_id: number
  jugador_id: number
  citado: boolean
  confirmado: boolean
  observaciones?: string
  created_at: string
  updated_at: string
}

// Funciones para Jugadores
export async function obtenerJugadores(categoria?: string): Promise<Jugador[]> {
  try {
    let query = "SELECT * FROM jugadores WHERE activo = true"
    const params: any[] = []

    if (categoria) {
      query += " AND categoria = $1"
      params.push(categoria)
    }

    query += " ORDER BY apellido, nombre"

    const result = await sql(query, params)
    return result as Jugador[]
  } catch (error) {
    console.error("Error obteniendo jugadores:", error)
    throw new Error("Error obteniendo jugadores")
  }
}

export async function obtenerJugadorPorId(id: number): Promise<Jugador | null> {
  try {
    const result = await sql("SELECT * FROM jugadores WHERE id = $1", [id])
    return result.length > 0 ? (result[0] as Jugador) : null
  } catch (error) {
    console.error("Error obteniendo jugador:", error)
    throw new Error("Error obteniendo jugador")
  }
}

export async function crearJugador(jugador: Omit<Jugador, "id" | "created_at" | "updated_at">): Promise<Jugador> {
  try {
    const result = await sql(
      `INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, posicion, numero_camiseta, telefono, email, direccion, categoria, activo, observaciones)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        jugador.nombre,
        jugador.apellido,
        jugador.fecha_nacimiento,
        jugador.posicion,
        jugador.numero_camiseta,
        jugador.telefono,
        jugador.email,
        jugador.direccion,
        jugador.categoria,
        jugador.activo,
        jugador.observaciones,
      ],
    )
    return result[0] as Jugador
  } catch (error) {
    console.error("Error creando jugador:", error)
    throw new Error("Error creando jugador")
  }
}

export async function actualizarJugador(
  id: number,
  jugador: Partial<Omit<Jugador, "id" | "created_at" | "updated_at">>,
): Promise<Jugador> {
  try {
    const fields = Object.keys(jugador)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ")

    const values = Object.values(jugador)

    const result = await sql(
      `UPDATE jugadores SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values],
    )

    return result[0] as Jugador
  } catch (error) {
    console.error("Error actualizando jugador:", error)
    throw new Error("Error actualizando jugador")
  }
}

export async function eliminarJugador(id: number): Promise<void> {
  try {
    await sql("UPDATE jugadores SET activo = false WHERE id = $1", [id])
  } catch (error) {
    console.error("Error eliminando jugador:", error)
    throw new Error("Error eliminando jugador")
  }
}

// Funciones para Partidos
export async function obtenerPartidos(categoria?: string): Promise<Partido[]> {
  try {
    let query = "SELECT * FROM partidos"
    const params: any[] = []

    if (categoria) {
      query += " WHERE categoria = $1"
      params.push(categoria)
    }

    query += " ORDER BY fecha DESC"

    const result = await sql(query, params)
    return result as Partido[]
  } catch (error) {
    console.error("Error obteniendo partidos:", error)
    throw new Error("Error obteniendo partidos")
  }
}

export async function obtenerPartidoPorId(id: number): Promise<Partido | null> {
  try {
    const result = await sql("SELECT * FROM partidos WHERE id = $1", [id])
    return result.length > 0 ? (result[0] as Partido) : null
  } catch (error) {
    console.error("Error obteniendo partido:", error)
    throw new Error("Error obteniendo partido")
  }
}

export async function crearPartido(partido: Omit<Partido, "id" | "created_at" | "updated_at">): Promise<Partido> {
  try {
    const result = await sql(
      `INSERT INTO partidos (fecha, rival, local, resultado_local, resultado_visitante, estado, observaciones, categoria)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        partido.fecha,
        partido.rival,
        partido.local,
        partido.resultado_local,
        partido.resultado_visitante,
        partido.estado,
        partido.observaciones,
        partido.categoria,
      ],
    )
    return result[0] as Partido
  } catch (error) {
    console.error("Error creando partido:", error)
    throw new Error("Error creando partido")
  }
}

export async function actualizarPartido(
  id: number,
  partido: Partial<Omit<Partido, "id" | "created_at" | "updated_at">>,
): Promise<Partido> {
  try {
    const fields = Object.keys(partido)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ")

    const values = Object.values(partido)

    const result = await sql(
      `UPDATE partidos SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values],
    )

    return result[0] as Partido
  } catch (error) {
    console.error("Error actualizando partido:", error)
    throw new Error("Error actualizando partido")
  }
}

// Funciones para Estadísticas
export async function obtenerEstadisticas(jugadorId?: number, partidoId?: number): Promise<Estadistica[]> {
  try {
    let query = "SELECT * FROM estadisticas WHERE 1=1"
    const params: any[] = []
    let paramIndex = 1

    if (jugadorId) {
      query += ` AND jugador_id = $${paramIndex}`
      params.push(jugadorId)
      paramIndex++
    }

    if (partidoId) {
      query += ` AND partido_id = $${paramIndex}`
      params.push(partidoId)
      paramIndex++
    }

    query += " ORDER BY created_at DESC"

    const result = await sql(query, params)
    return result as Estadistica[]
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error)
    throw new Error("Error obteniendo estadísticas")
  }
}

export async function crearEstadistica(
  estadistica: Omit<Estadistica, "id" | "created_at" | "updated_at">,
): Promise<Estadistica> {
  try {
    const result = await sql(
      `INSERT INTO estadisticas (jugador_id, partido_id, goles, asistencias, tarjetas_amarillas, tarjetas_rojas, minutos_jugados)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        estadistica.jugador_id,
        estadistica.partido_id,
        estadistica.goles,
        estadistica.asistencias,
        estadistica.tarjetas_amarillas,
        estadistica.tarjetas_rojas,
        estadistica.minutos_jugados,
      ],
    )
    return result[0] as Estadistica
  } catch (error) {
    console.error("Error creando estadística:", error)
    throw new Error("Error creando estadística")
  }
}

// Funciones para Citaciones
export async function obtenerCitaciones(partidoId?: number): Promise<Citacion[]> {
  try {
    let query = "SELECT * FROM citaciones"
    const params: any[] = []

    if (partidoId) {
      query += " WHERE partido_id = $1"
      params.push(partidoId)
    }

    query += " ORDER BY created_at DESC"

    const result = await sql(query, params)
    return result as Citacion[]
  } catch (error) {
    console.error("Error obteniendo citaciones:", error)
    throw new Error("Error obteniendo citaciones")
  }
}

export async function crearCitacion(citacion: Omit<Citacion, "id" | "created_at" | "updated_at">): Promise<Citacion> {
  try {
    const result = await sql(
      `INSERT INTO citaciones (partido_id, jugador_id, citado, confirmado, observaciones)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [citacion.partido_id, citacion.jugador_id, citacion.citado, citacion.confirmado, citacion.observaciones],
    )
    return result[0] as Citacion
  } catch (error) {
    console.error("Error creando citación:", error)
    throw new Error("Error creando citación")
  }
}

// Función para obtener estadísticas generales
export async function obtenerEstadisticasGenerales() {
  try {
    const [jugadores, partidos, estadisticas] = await Promise.all([
      obtenerJugadores(),
      obtenerPartidos(),
      obtenerEstadisticas(),
    ])

    return {
      jugadores,
      partidos,
      estadisticas,
    }
  } catch (error) {
    console.error("Error obteniendo estadísticas generales:", error)
    throw new Error("Error obteniendo estadísticas generales")
  }
}
