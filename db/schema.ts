import { pgTable, serial, varchar, boolean, integer, text, timestamp } from "drizzle-orm/pg-core";

export const jugadores = pgTable("jugadores", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 100 }).notNull(),
  apellido: varchar("apellido", { length: 100 }).notNull(),
  fecha_nacimiento: varchar("fecha_nacimiento", { length: 10 }).notNull(),
  posicion: varchar("posicion", { length: 50 }).notNull(),
  numero_camiseta: integer("numero_camiseta"),
  telefono: varchar("telefono", { length: 20 }),
  email: varchar("email", { length: 100 }),
  direccion: text("direccion"),
  categoria: varchar("categoria", { length: 20 }).notNull(),
  activo: boolean("activo").notNull().default(true),
  observaciones: text("observaciones"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const partidos = pgTable("partidos", {
  id: serial("id").primaryKey(),
  fecha: varchar("fecha", { length: 10 }).notNull(),
  rival: varchar("rival", { length: 100 }).notNull(),
  local: boolean("local").notNull(),
  resultado_local: integer("resultado_local"),
  resultado_visitante: integer("resultado_visitante"),
  estado: varchar("estado", { length: 20 }).notNull(),
  observaciones: text("observaciones"),
  categoria: varchar("categoria", { length: 20 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const estadisticas = pgTable("estadisticas", {
  id: serial("id").primaryKey(),
  jugador_id: integer("jugador_id").references(() => jugadores.id).notNull(),
  partido_id: integer("partido_id").references(() => partidos.id).notNull(),
  goles: integer("goles").notNull().default(0),
  asistencias: integer("asistencias").notNull().default(0),
  tarjetas_amarillas: integer("tarjetas_amarillas").notNull().default(0),
  tarjetas_rojas: integer("tarjetas_rojas").notNull().default(0),
  minutos_jugados: integer("minutos_jugados").notNull().default(0),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const citaciones = pgTable("citaciones", {
  id: serial("id").primaryKey(),
  partido_id: integer("partido_id").references(() => partidos.id).notNull(),
  jugador_id: integer("jugador_id").references(() => jugadores.id).notNull(),
  citado: boolean("citado").notNull(),
  confirmado: boolean("confirmado").notNull(),
  motivo_ausencia: varchar("motivo_ausencia", { length: 100 }),
  fecha_citacion: varchar("fecha_citacion", { length: 10 }).notNull(),
  observaciones: text("observaciones"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});