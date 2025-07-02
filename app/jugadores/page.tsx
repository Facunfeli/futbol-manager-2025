"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Datos de tus jugadores basados en tu planilla
const jugadores = [
  {
    id: 1,
    nombre: "ZARATE MARTIN",
    dni: "54.062.160",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO/SEG GRUPO",
    numero_socio: "",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
    anio_nacimiento: 2014,
  },
  {
    id: 2,
    nombre: "AMARILLO MARTIN",
    dni: "53.972.046",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "56438",
    partidos: 6,
    goles: 0,
    amarillas: 1,
    rojas: 0,
    estado: "Disponible",
    anio_nacimiento: 2014,
  },
  // ... other players with anio_nacimiento property
]

const getPosicionColor = (posicion: string) => {
  switch (posicion) {
    case "ARQUERO":
      return { backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeaa7" }
    case "DEFENSOR":
      return { backgroundColor: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" }
    case "VOLANTE":
      return { backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }
    case "DELANTERO":
      return { backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }
    default:
      return { backgroundColor: "#e2e3e5", color: "#383d41", border: "1px solid #d6d8db" }
  }
}

export default function JugadoresPage() {
  const jugadores2014 = jugadores.filter((j) => j.anio_nacimiento === 2014)
  const jugadores2015 = jugadores.filter((j) => j.anio_nacimiento === 2015)

  const arqueros2014 = jugadores2014.filter((j) => j.posicion === "ARQUERO").length
  const defensores2014 = jugadores2014.filter((j) => j.posicion === "DEFENSOR").length
  const volantes2014 = jugadores2014.filter((j) => j.posicion === "VOLANTE").length
  const delanteros2014 = jugadores2014.filter((j) => j.posicion === "DELANTERO").length

  const arqueros2015 = jugadores2015.filter((j) => j.posicion === "ARQUERO").length
  const defensores2015 = jugadores2015.filter((j) => j.posicion === "DEFENSOR").length
  const volantes2015 = jugadores2015.filter((j) => j.posicion === "VOLANTE").length
  const delanteros2015 = jugadores2015.filter((j) => j.posicion === "DELANTERO").length

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#333", margin: "0 0 10px 0" }}>👥 Gestión de Jugadores</h1>
            <p style={{ color: "#666", margin: 0 }}>Selecciona la categoría que deseas gestionar</p>
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
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>📅</div>
            <CardTitle className="text-2xl text-blue-700">Categoría 2014</CardTitle>
            <CardDescription className="text-lg">Jugadores nacidos en 2014</CardDescription>
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
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#1976d2" }}>{jugadores2014.length}</div>
              <div style={{ fontSize: "14px", color: "#666" }}>Jugadores registrados</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", fontSize: "12px" }}>
              <div
                style={{ backgroundColor: "#fff3cd", padding: "8px", borderRadius: "4px", border: "1px solid #ffeaa7" }}
              >
                <div style={{ fontWeight: "bold", color: "#856404" }}>{arqueros2014}</div>
                <div style={{ color: "#856404" }}>Arqueros</div>
              </div>
              <div
                style={{ backgroundColor: "#d1ecf1", padding: "8px", borderRadius: "4px", border: "1px solid #bee5eb" }}
              >
                <div style={{ fontWeight: "bold", color: "#0c5460" }}>{defensores2014}</div>
                <div style={{ color: "#0c5460" }}>Defensores</div>
              </div>
              <div
                style={{ backgroundColor: "#d4edda", padding: "8px", borderRadius: "4px", border: "1px solid #c3e6cb" }}
              >
                <div style={{ fontWeight: "bold", color: "#155724" }}>{volantes2014}</div>
                <div style={{ color: "#155724" }}>Volantes</div>
              </div>
              <div
                style={{ backgroundColor: "#f8d7da", padding: "8px", borderRadius: "4px", border: "1px solid #f5c6cb" }}
              >
                <div style={{ fontWeight: "bold", color: "#721c24" }}>{delanteros2014}</div>
                <div style={{ color: "#721c24" }}>Delanteros</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/jugadores/2014" style={{ textDecoration: "none" }}>
                <Button className="w-full" size="lg">
                  👥 Ver Plantel 2014
                </Button>
              </Link>
              <Link href="/jugadores/2014/nuevo" style={{ textDecoration: "none" }}>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  ➕ Agregar Jugador 2014
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Categoría 2015 */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-200">
          <CardHeader className="text-center pb-4">
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>📅</div>
            <CardTitle className="text-2xl text-green-700">Categoría 2015</CardTitle>
            <CardDescription className="text-lg">Jugadores nacidos en 2015</CardDescription>
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
              <div style={{ fontSize: "36px", fontWeight: "bold", color: "#388e3c" }}>{jugadores2015.length}</div>
              <div style={{ fontSize: "14px", color: "#666" }}>Jugadores registrados</div>
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
              Base de datos pendiente de carga
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Button className="w-full" size="lg" disabled style={{ backgroundColor: "#e0e0e0", color: "#9e9e9e" }}>
                👥 Ver Plantel 2015
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="sm"
                disabled
                style={{ borderColor: "#e0e0e0", color: "#9e9e9e" }}
              >
                ➕ Agregar Jugador 2015
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
        <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>ℹ️ Información del Sistema</h3>
        <p style={{ margin: "0 0 15px 0", color: "#666", fontSize: "14px" }}>
          El sistema está configurado para manejar múltiples categorías de jugadores. Actualmente tienes acceso completo
          a la categoría 2014.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "12px", color: "#666" }}>
          <div>✅ Categoría 2014: Activa</div>
          <div>⏳ Categoría 2015: En preparación</div>
        </div>
      </div>
    </div>
  )
}
