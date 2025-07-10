import { pgTable, serial, varchar, integer, boolean, date } from "drizzle-orm/pg-core";

export const jugadores = pgTable("jugadores", {
  id: serial("id").primaryKey(),
  dni: varchar("dni", { length: 20 }),
  apellido_nombre: varchar("apellido_nombre", { length: 100 }),
  numero_socio: varchar("numero_socio", { length: 20 }),
  fichado: varchar("fichado", { length: 50 }),
  posicion: varchar("posicion", { length: 50 }),
  pierna_habil: varchar("pierna_habil", { length: 20 }),
  telefono: varchar("telefono", { length: 20 }),
  email: varchar("email", { length: 100 }),
  fecha_nacimiento: date("fecha_nacimiento"),
  altura: integer("altura"),
  peso: integer("peso"),
  numero_camiseta: integer("numero_camiseta"),
  estado_fisico: varchar("estado_fisico", { length: 50 }),
  activo: boolean("activo"),
  categoria: varchar("categoria", { length: 20 }),
  partidos: integer("partidos"),
  goles: integer("goles"),
  asistencias: integer("asistencias"),
  amarillas: integer("amarillas"),
  rojas: integer("rojas"),
  minutos_totales: integer("minutos_totales"),
});

export const partidos = pgTable("partidos", {
  id: serial("id").primaryKey(),
  fecha: date("fecha"),
  rival: varchar("rival", { length: 100 }),
  local: boolean("local"),
  resultado_local: integer("resultado_local"),
  resultado_visitante: integer("resultado_visitante"),
  estado: varchar("estado", { length: 20 }),
});