"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Datos extendidos de jugadores con velocidad en 100m
const jugadoresCompletos = [
  {
    id: 1,
    nombre: "ZARATE MARTIN",
    posicion: "DEFENSOR",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.8,
    minutos_totales: 0,
  },
  {
    id: 2,
    nombre: "AMARILLO MARTIN",
    posicion: "DEFENSOR",
    partidos: 6,
    goles: 0,
    amarillas: 1,
    rojas: 0,
    velocidad_100m: 13.2,
    minutos_totales: 540,
  },
  {
    id: 3,
    nombre: "ALVAREZ LORENZO",
    posicion: "DEFENSOR",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.9,
    minutos_totales: 90,
  },
  {
    id: 4,
    nombre: "BREY FEDERICO",
    posicion: "DEFENSOR",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 13.1,
    minutos_totales: 90,
  },
  {
    id: 5,
    nombre: "BENITEZ BENJAMIN",
    posicion: "ARQUERO",
    partidos: 5,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 14.2,
    minutos_totales: 450,
  },
  {
    id: 6,
    nombre: "CABALLERO THIAGO",
    posicion: "VOLANTE",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.8,
    minutos_totales: 90,
  },
  {
    id: 7,
    nombre: "LOZANO LORENZO",
    posicion: "DEFENSOR",
    partidos: 5,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.7,
    minutos_totales: 450,
  },
  {
    id: 8,
    nombre: "DORADO MATEO",
    posicion: "VOLANTE",
    partidos: 6,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.1,
    minutos_totales: 540,
  },
  {
    id: 9,
    nombre: "CATALAN FRANCO",
    posicion: "DELANTERO",
    partidos: 6,
    goles: 1,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.5,
    minutos_totales: 540,
  },
  {
    id: 10,
    nombre: "OCHOA ALEJO",
    posicion: "DELANTERO",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.9,
    minutos_totales: 90,
  },
  {
    id: 11,
    nombre: "TORRES THIAGO",
    posicion: "DELANTERO",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.7,
    minutos_totales: 180,
  },
  {
    id: 12,
    nombre: "SOSA CIRO",
    posicion: "DELANTERO",
    partidos: 3,
    goles: 1,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 11.6,
    minutos_totales: 270,
  },
  {
    id: 13,
    nombre: "ZABALA BENICIO",
    posicion: "VOLANTE",
    partidos: 4,
    goles: 2,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.0,
    minutos_totales: 360,
  },
  {
    id: 14,
    nombre: "UMAÑO SIMON",
    posicion: "VOLANTE",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.3,
    minutos_totales: 0,
  },
  {
    id: 15,
    nombre: "ORTIZ CIRILO AARON",
    posicion: "VOLANTE",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    velocidad_100m: 12.2,
    minutos_totales: 0,
  },
]

// Datos de partidos con formaciones utilizadas
const partidosConFormacion = [
  { id: 1, rival: "Club Atlético Rival", resultado: "Victoria", formacion: "4-4-2", goles_favor: 2, goles_contra: 1 },
  { id: 2, rival: "Deportivo Central", resultado: "Empate", formacion: "4-3-3", goles_favor: 1, goles_contra: 1 },
  { id: 3, rival: "Racing Local", resultado: "Victoria", formacion: "4-4-2", goles_favor: 3, goles_contra: 0 },
  { id: 4, rival: "Club Unidos", resultado: "Derrota", formacion: "3-5-2", goles_favor: 0, goles_contra: 2 },
  { id: 5, rival: "Atlético Sur", resultado: "Victoria", formacion: "4-4-2", goles_favor: 2, goles_contra: 1 },
  { id: 6, rival: "Deportivo Norte", resultado: "Victoria", formacion: "4-3-3", goles_favor: 4, goles_contra: 2 },
]

const getPosicionColor = (posicion: string) => {
  switch (posicion) {
    case "ARQUERO":
      return "#ffc107"
    case "DEFENSOR":
      return "#007bff"
    case "VOLANTE":
      return "#28a745"
    case "DELANTERO":
      return "#dc3545"
    default:
      return "#6c757d"
  }
}

export default function EstadisticasPage() {
  const [vistaActiva, setVistaActiva] = useState("general")

  // Cálculos de estadísticas
  const topGoleadores = jugadoresCompletos
    .filter((j) => j.goles > 0)
    .sort((a, b) => b.goles - a.goles)
    .slice(0, 5)

  const masPartidos = jugadoresCompletos
    .filter((j) => j.partidos > 0)
    .sort((a, b) => b.partidos - a.partidos)
    .slice(0, 5)

  const masRapidos = jugadoresCompletos.sort((a, b) => a.velocidad_100m - b.velocidad_100m).slice(0, 5)

  const estadisticasPorPosicion = {
    ARQUERO: jugadoresCompletos.filter((j) => j.posicion === "ARQUERO"),
    DEFENSOR: jugadoresCompletos.filter((j) => j.posicion === "DEFENSOR"),
    VOLANTE: jugadoresCompletos.filter((j) => j.posicion === "VOLANTE"),
    DELANTERO: jugadoresCompletos.filter((j) => j.posicion === "DELANTERO"),
  }

  // Estadísticas por formación
  const estadisticasFormacion = Object.entries(
    partidosConFormacion.reduce((acc: Record<string, any>, partido) => {
      if (!acc[partido.formacion]) {
        acc[partido.formacion] = { victorias: 0, empates: 0, derrotas: 0, total: 0, goles_favor: 0, goles_contra: 0 }
      }
      const resultado = partido.resultado.toLowerCase()
      if (resultado === "victoria") {
        acc[partido.formacion].victorias++
      } else if (resultado === "empate") {
        acc[partido.formacion].empates++
      } else {
        acc[partido.formacion].derrotas++
      }
      acc[partido.formacion].total++
      acc[partido.formacion].goles_favor += partido.goles_favor
      acc[partido.formacion].goles_contra += partido.goles_contra
      return acc
    }, {}),
  )
    .map(([formacion, stats]: [string, any]) => ({
      formacion,
      victorias: stats.victorias,
      empates: stats.empates,
      derrotas: stats.derrotas,
      total: stats.total,
      goles_favor: stats.goles_favor,
      goles_contra: stats.goles_contra,
      efectividad: (((stats.victorias + stats.empates * 0.5) / stats.total) * 100).toFixed(1),
    }))
    .sort((a, b) => Number.parseFloat(b.efectividad) - Number.parseFloat(a.efectividad))

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#333", margin: "0 0 10px 0" }}>📊 Gestión de Estadísticas</h1>
            <p style={{ color: "#666", margin: 0 }}>Selecciona la categoría para ver análisis y reportes</p>
          </div>
          <Link
            href="/"
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            ← Volver al Dashboard
          </Link>
        </div>
      </div>

      {/* Selección de Categorías */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", maxWidth: "800px", margin: "0 auto" }}
      >
        {/* Categoría 2014 */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-200">
          <CardHeader className="text-center pb-4">
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>📊</div>
            <CardTitle className="text-2xl text-blue-700">Estadísticas 2014</CardTitle>
            <CardDescription className="text-lg">Análisis categoría 2014</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div
              style={{
                backgroundColor: "#e3f2fd",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #bbdefb",
              }}
            >
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#1976d2" }}>6</div>
              <div style={{ fontSize: "14px", color: "#666" }}>Partidos analizados</div>
            </div>

            <div style={{ fontSize: "14px", color: "#666", padding: "10px" }}>
              <p>📊 Estadísticas completas</p>
              <p>🏃‍♂️ Rankings de velocidad</p>
              <p>⚽ Top goleadores</p>
              <p>🏆 Análisis por formación</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/estadisticas/2014" style={{ textDecoration: "none" }}>
                <Button className="w-full" size="lg">
                  📊 Ver Estadísticas 2014
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Categoría 2015 */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-200">
          <CardHeader className="text-center pb-4">
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>📊</div>
            <CardTitle className="text-2xl text-green-700">Estadísticas 2015</CardTitle>
            <CardDescription className="text-lg">Análisis categoría 2015</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div
              style={{
                backgroundColor: "#f1f8e9",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #c8e6c9",
              }}
            >
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#388e3c" }}>0</div>
              <div style={{ fontSize: "14px", color: "#666" }}>Datos disponibles</div>
            </div>

            <div
              style={{
                backgroundColor: "#fff3e0",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ffcc02",
                fontSize: "14px",
                color: "#e65100",
              }}
            >
              ⚠️ <strong>Próximamente</strong>
              <br />
              Datos en preparación
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Button className="w-full" size="lg" disabled style={{ backgroundColor: "#e0e0e0", color: "#9e9e9e" }}>
                📊 Ver Estadísticas 2015
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>📊 Centro de Análisis</h3>
        <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}>
          Análisis detallado del rendimiento individual y del equipo por categoría.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "12px", color: "#666" }}>
          <div>✅ Categoría 2014: Datos completos</div>
          <div>⏳ Categoría 2015: En preparación</div>
        </div>
      </div>

      {/* Contenido según pestaña activa */}
      {vistaActiva === "general" && (
        <div>
          {/* Resumen General */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>⚽ Total Goles</h3>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#28a745" }}>
                {jugadoresCompletos.reduce((sum, j) => sum + j.goles, 0)}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>🏃‍♂️ Más Rápido</h3>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>
                {masRapidos[0]?.velocidad_100m}s
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>{masRapidos[0]?.nombre.split(" ")[0]}</div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>🟨 Tarjetas</h3>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#ffc107" }}>
                {jugadoresCompletos.reduce((sum, j) => sum + j.amarillas, 0)}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>🏆 Mejor Formación</h3>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#6f42c1" }}>
                {estadisticasFormacion[0]?.formacion}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {estadisticasFormacion[0]?.efectividad}% efectividad
              </div>
            </div>
          </div>

          {/* Top Goleadores */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>🥇 Top Goleadores</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {topGoleadores.map((jugador, index) => (
                <div
                  key={jugador.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ffc107", minWidth: "30px" }}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}°`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold" }}>{jugador.nombre}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>{jugador.posicion}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>{jugador.goles}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>goles</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {vistaActiva === "jugadores" && (
        <div>
          {/* Más Partidos Jugados */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>🏃‍♂️ Más Partidos Jugados</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {masPartidos.map((jugador, index) => (
                <div
                  key={jugador.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff", minWidth: "30px" }}>
                    {index + 1}°
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold" }}>{jugador.nombre}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>{jugador.posicion}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{jugador.partidos}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>partidos</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "16px", fontWeight: "bold", color: "#6c757d" }}>
                      {jugador.minutos_totales}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>minutos</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Jugadores Más Rápidos */}
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>⚡ Ranking de Velocidad (100m)</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {masRapidos.map((jugador, index) => (
                <div
                  key={jugador.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    padding: "10px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ fontSize: "20px", fontWeight: "bold", color: "#dc3545", minWidth: "30px" }}>
                    {index === 0 ? "🏃‍♂️" : `${index + 1}°`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "bold" }}>{jugador.nombre}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>{jugador.posicion}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "24px", fontWeight: "bold", color: "#dc3545" }}>
                      {jugador.velocidad_100m}s
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>100 metros</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {vistaActiva === "posiciones" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {Object.entries(estadisticasPorPosicion).map(([posicion, jugadores]) => (
            <div
              key={posicion}
              style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}
            >
              <h3
                style={{
                  margin: "0 0 15px 0",
                  color: getPosicionColor(posicion),
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getPosicionColor(posicion),
                  }}
                ></div>
                {posicion}S ({jugadores.length})
              </h3>

              <div style={{ marginBottom: "15px" }}>
                <div style={{ fontSize: "14px", color: "#666", marginBottom: "5px" }}>Estadísticas Generales:</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px" }}>
                  <div>• Partidos: {jugadores.reduce((sum, j) => sum + j.partidos, 0)}</div>
                  <div>• Goles: {jugadores.reduce((sum, j) => sum + j.goles, 0)}</div>
                  <div>• Tarjetas: {jugadores.reduce((sum, j) => sum + j.amarillas, 0)}</div>
                  <div>• Minutos: {jugadores.reduce((sum, j) => sum + j.minutos_totales, 0)}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>Más Destacado:</div>
                {jugadores.length > 0 && (
                  <div style={{ padding: "10px", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                      {jugadores.sort((a, b) => b.partidos + b.goles - (a.partidos + a.goles))[0]?.nombre}
                    </div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {jugadores.sort((a, b) => b.partidos + b.goles - (a.partidos + a.goles))[0]?.partidos} partidos,{" "}
                      {jugadores.sort((a, b) => b.partidos + b.goles - (a.partidos + a.goles))[0]?.goles} goles
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {vistaActiva === "formaciones" && (
        <div>
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>🏆 Efectividad por Formación</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {estadisticasFormacion.map((stat, index) => (
                <div
                  key={stat.formacion}
                  style={{
                    padding: "20px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: "0", color: "#333", fontSize: "18px" }}>{stat.formacion}</h4>
                      <div style={{ fontSize: "14px", color: "#666" }}>{stat.total} partidos jugados</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "24px", fontWeight: "bold", color: index === 0 ? "#28a745" : "#007bff" }}>
                        {stat.efectividad}%
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>efectividad</div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                      gap: "15px",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#28a745" }}>{stat.victorias}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>Victorias</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ffc107" }}>{stat.empates}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>Empates</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#dc3545" }}>{stat.derrotas}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>Derrotas</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>{stat.goles_favor}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>Goles a favor</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#6c757d" }}>{stat.goles_contra}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>Goles en contra</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ backgroundColor: "#e7f3ff", padding: "20px", borderRadius: "8px", border: "1px solid #b3d9ff" }}
          >
            <h4 style={{ margin: "0 0 10px 0", color: "#0066cc" }}>💡 Recomendación Táctica</h4>
            <p style={{ margin: 0, color: "#0066cc" }}>
              Basado en los resultados, la formación <strong>{estadisticasFormacion[0]?.formacion}</strong> ha sido la
              más efectiva con un {estadisticasFormacion[0]?.efectividad}% de efectividad. Considera usarla en partidos
              importantes.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
