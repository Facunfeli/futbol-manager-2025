import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos de datos
export interface Jugador {
  id: number
  dni: string
  apellido_nombre: string
  numero_socio?: string
  fichado?: string
  posicion: string
  pierna_habil: string
  telefono?: string
  email?: string
  fecha_nacimiento?: string
  altura?: number
  peso?: number
  numero_camiseta?: number
  fecha_incorporacion?: string
  estado_fisico: string
  observaciones?: string
  activo: boolean
  created_at?: string
  anio_nacimiento?: number
}

export interface Partido {
  id: number
  fecha: string
  rival: string
  local: boolean
  resultado_local?: number
  resultado_visitante?: number
  observaciones?: string
  estado: string
  created_at?: string
}

export interface EstadisticaPartido {
  id: number
  jugador_id: number
  partido_id: number
  titular: boolean
  minutos_jugados: number
  goles: number
  asistencias: number
  tarjetas_amarillas: number
  tarjetas_rojas: number
  autogoles: number
  penales_convertidos: number
  penales_errados: number
}

export interface Citacion {
  id: number
  partido_id: number
  jugador_id: number
  citado: boolean
  confirmado: boolean
  motivo_ausencia?: string
  fecha_citacion: string
}

// Funciones para Jugadores
export async function obtenerJugadores(anio?: number): Promise<Jugador[]> {
  let query = supabase.from("jugadores").select("*").eq("activo", true).order("apellido_nombre")

  if (anio) {
    query = query.eq("anio_nacimiento", anio)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error obteniendo jugadores:", error)
    throw error
  }

  return data || []
}

export async function obtenerJugadorPorId(id: number): Promise<Jugador | null> {
  const { data, error } = await supabase.from("jugadores").select("*").eq("id", id).single()

  if (error) {
    console.error("Error obteniendo jugador:", error)
    return null
  }

  return data
}

export async function crearJugador(jugador: Omit<Jugador, "id" | "created_at">): Promise<Jugador> {
  const { data, error } = await supabase.from("jugadores").insert([jugador]).select().single()

  if (error) {
    console.error("Error creando jugador:", error)
    throw error
  }

  return data
}

export async function actualizarJugador(id: number, jugador: Partial<Jugador>): Promise<Jugador> {
  const { data, error } = await supabase.from("jugadores").update(jugador).eq("id", id).select().single()

  if (error) {
    console.error("Error actualizando jugador:", error)
    throw error
  }

  return data
}

export async function eliminarJugador(id: number): Promise<void> {
  const { error } = await supabase.from("jugadores").update({ activo: false }).eq("id", id)

  if (error) {
    console.error("Error eliminando jugador:", error)
    throw error
  }
}

// Funciones para Partidos
export async function obtenerPartidos(): Promise<Partido[]> {
  const { data, error } = await supabase.from("partidos").select("*").order("fecha", { ascending: true })

  if (error) {
    console.error("Error obteniendo partidos:", error)
    throw error
  }

  return data || []
}

export async function obtenerPartidoPorId(id: number): Promise<Partido | null> {
  const { data, error } = await supabase.from("partidos").select("*").eq("id", id).single()

  if (error) {
    console.error("Error obteniendo partido:", error)
    return null
  }

  return data
}

export async function crearPartido(partido: Omit<Partido, "id" | "created_at">): Promise<Partido> {
  const { data, error } = await supabase.from("partidos").insert([partido]).select().single()

  if (error) {
    console.error("Error creando partido:", error)
    throw error
  }

  return data
}

export async function actualizarPartido(id: number, partido: Partial<Partido>): Promise<Partido> {
  const { data, error } = await supabase.from("partidos").update(partido).eq("id", id).select().single()

  if (error) {
    console.error("Error actualizando partido:", error)
    throw error
  }

  return data
}

// Funciones para Estadísticas
export async function obtenerEstadisticasJugador(jugadorId: number): Promise<EstadisticaPartido[]> {
  const { data, error } = await supabase
    .from("estadisticas_partidos")
    .select(`
      *,
      partidos (
        fecha,
        rival,
        local,
        resultado_local,
        resultado_visitante
      )
    `)
    .eq("jugador_id", jugadorId)
    .order("id", { ascending: false })

  if (error) {
    console.error("Error obteniendo estadísticas:", error)
    throw error
  }

  return data || []
}

export async function obtenerEstadisticasPartido(partidoId: number): Promise<EstadisticaPartido[]> {
  const { data, error } = await supabase
    .from("estadisticas_partidos")
    .select(`
      *,
      jugadores (
        apellido_nombre,
        posicion,
        numero_camiseta
      )
    `)
    .eq("partido_id", partidoId)

  if (error) {
    console.error("Error obteniendo estadísticas del partido:", error)
    throw error
  }

  return data || []
}

export async function guardarEstadisticaPartido(
  estadistica: Omit<EstadisticaPartido, "id">,
): Promise<EstadisticaPartido> {
  const { data, error } = await supabase.from("estadisticas_partidos").upsert([estadistica]).select().single()

  if (error) {
    console.error("Error guardando estadística:", error)
    throw error
  }

  return data
}

// Funciones para Citaciones
export async function obtenerCitacionesPartido(partidoId: number): Promise<Citacion[]> {
  const { data, error } = await supabase
    .from("citaciones")
    .select(`
      *,
      jugadores (
        apellido_nombre,
        posicion,
        telefono
      )
    `)
    .eq("partido_id", partidoId)

  if (error) {
    console.error("Error obteniendo citaciones:", error)
    throw error
  }

  return data || []
}

export async function crearCitacion(citacion: Omit<Citacion, "id" | "fecha_citacion">): Promise<Citacion> {
  const { data, error } = await supabase
    .from("citaciones")
    .insert([{ ...citacion, fecha_citacion: new Date().toISOString() }])
    .select()
    .single()

  if (error) {
    console.error("Error creando citación:", error)
    throw error
  }

  return data
}

export async function actualizarCitacion(id: number, citacion: Partial<Citacion>): Promise<Citacion> {
  const { data, error } = await supabase.from("citaciones").update(citacion).eq("id", id).select().single()

  if (error) {
    console.error("Error actualizando citación:", error)
    throw error
  }

  return data
}

// Funciones de estadísticas agregadas
export async function obtenerEstadisticasGenerales() {
  const { data: jugadores, error: errorJugadores } = await supabase
    .from("jugadores")
    .select("id, apellido_nombre, posicion")
    .eq("activo", true)

  const { data: partidos, error: errorPartidos } = await supabase.from("partidos").select("*")

  const { data: estadisticas, error: errorEstadisticas } = await supabase.from("estadisticas_partidos").select("*")

  if (errorJugadores || errorPartidos || errorEstadisticas) {
    console.error("Error obteniendo estadísticas generales")
    throw new Error("Error obteniendo estadísticas generales")
  }

  return {
    jugadores: jugadores || [],
    partidos: partidos || [],
    estadisticas: estadisticas || [],
  }
}
