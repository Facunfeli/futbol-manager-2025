"use client"

import Link from "next/link"

// Datos completos de jugadores categoría 2014 basados en tu planilla
const jugadores2014 = [
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
  },
  {
    id: 3,
    nombre: "ALVAREZ LORENZO",
    dni: "54.130.324",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "59443-1",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 4,
    nombre: "BREY FEDERICO",
    dni: "53.755.218",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "57713",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 5,
    nombre: "BENITEZ BENJAMIN",
    dni: "54.223.233",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "057727-1",
    partidos: 5,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 6,
    nombre: "CABALLERO THIAGO",
    dni: "53.879.078",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "057712-1",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 7,
    nombre: "LOZANO LORENZO",
    dni: "54.359.239",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "086339-1",
    partidos: 5,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 8,
    nombre: "DORADO MATEO",
    dni: "53.985.186",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "57714",
    partidos: 6,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 9,
    nombre: "CATALAN FRANCO",
    dni: "54.210.852",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "",
    partidos: 6,
    goles: 1,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 10,
    nombre: "SASSI LUCA",
    dni: "53.584.225",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "085466-1",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 11,
    nombre: "QUIROGA ROMAN",
    dni: "53.849.570",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "57329",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 12,
    nombre: "RETAMAR ESTEFANO",
    dni: "54.042.073",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "057718-3",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 13,
    nombre: "RYNKIEWICZ PEDRO",
    dni: "53.857.975",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "068170-1",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 14,
    nombre: "UMAÑO SIMON",
    dni: "53.892.760",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "AFA",
    numero_socio: "57879",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 15,
    nombre: "OCHOA ALEJO",
    dni: "53.991.020",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "57742",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 16,
    nombre: "ORTIZ CIRILO AARON",
    dni: "54.849.204",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "57813",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 17,
    nombre: "TORRES THIAGO",
    dni: "53.448.553",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "58801",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 18,
    nombre: "ZACHOZY BASTIAN",
    dni: "53.982.395",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "65352",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 19,
    nombre: "SOSA CIRO",
    dni: "53.836.055",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "69653-1",
    partidos: 3,
    goles: 1,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 20,
    nombre: "CABRAL MAXIMO",
    dni: "53.682.513",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "057828-2",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 21,
    nombre: "SALINAS PATRICIO",
    dni: "53.600.085",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "AFA",
    numero_socio: "077211-1",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 22,
    nombre: "ZABALA BENICIO",
    dni: "53.696.469",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "066413-1",
    partidos: 4,
    goles: 2,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 23,
    nombre: "FERNANDEZ BASTIAN",
    dni: "54.414.937",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "058503-2",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 24,
    nombre: "ORTEGA SANTINO",
    dni: "53.719.367",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "068652-1",
    partidos: 3,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 25,
    nombre: "RAMON LUCIO",
    dni: "54.270.131",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "70316",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 26,
    nombre: "PEÑIALBA MILO",
    dni: "54.210.861",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "080916-1",
    partidos: 3,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 27,
    nombre: "QUINTEROS LAUTARO",
    dni: "53.831.772",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "068447-1",
    partidos: 4,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 28,
    nombre: "PORCO BENJAMIN",
    dni: "53.676.551",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "073166-1",
    partidos: 6,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 29,
    nombre: "LEGUIZA PEDRO",
    dni: "54.103.253",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "043272-2",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 30,
    nombre: "OBELAR SIMON",
    dni: "53.762.587",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "094858-2",
    partidos: 3,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 31,
    nombre: "CARLOMANGO DANTE",
    dni: "54.229.124",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "094959-1",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 32,
    nombre: "BENTOS JULIAN",
    dni: "53.605.885",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "094949-1",
    partidos: 3,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 33,
    nombre: "VITO CASTILLO LEON",
    dni: "54.040.876",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "",
    partidos: 4,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 34,
    nombre: "TEVEZ VALENTINO",
    dni: "53.842.006",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 35,
    nombre: "CONSTANZO GINO",
    dni: "53.949.515",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "85495",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 36,
    nombre: "YTIEL SANCHEZ",
    dni: "53.948.797",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "094511-1",
    partidos: 2,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 37,
    nombre: "MARTINEZ BAUTISTA",
    dni: "54.420.429",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 38,
    nombre: "ROMERO MARCOS",
    dni: "54.457.000",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "73723-1",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 39,
    nombre: "MACRI MATIAS",
    dni: "53.682.343",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "085968-1",
    partidos: 1,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 40,
    nombre: "MOSQUERA JOAQUIN",
    dni: "54.130.348",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "059417-1",
    partidos: 4,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 41,
    nombre: "DIAZ CELESTINO TADEO",
    dni: "53.743.879",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 42,
    nombre: "ESTEVEZ NAZARENO",
    dni: "53.788.702",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "",
    numero_socio: "",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 43,
    nombre: "GONZALEZ ROMEO",
    dni: "54.269.115",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "",
    partidos: 4,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 44,
    nombre: "JIMENEZ FRANCESCO",
    dni: "53.832.551",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "AFA",
    numero_socio: "057916-2",
    partidos: 0,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
  {
    id: 45,
    nombre: "RODRIGUEZ SCHOEN LEON",
    dni: "54.229.011",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "",
    partidos: 4,
    goles: 0,
    amarillas: 0,
    rojas: 0,
    estado: "Disponible",
  },
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

export default function Jugadores2014Page() {
  const arqueros = jugadores2014.filter((j) => j.posicion === "ARQUERO").length
  const defensores = jugadores2014.filter((j) => j.posicion === "DEFENSOR").length
  const volantes = jugadores2014.filter((j) => j.posicion === "VOLANTE").length
  const delanteros = jugadores2014.filter((j) => j.posicion === "DELANTERO").length

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#333", margin: "0 0 10px 0" }}>📅 Plantel Categoría 2014</h1>
            <p style={{ color: "#666", margin: 0 }}>
              Gestión completa de jugadores nacidos en 2014 - {jugadores2014.length} jugadores registrados
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              href="/jugadores/2014/nuevo"
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "10px 20px",
                textDecoration: "none",
                borderRadius: "4px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              ➕ Nuevo Jugador 2014
            </Link>
            <Link
              href="/jugadores"
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                padding: "10px 20px",
                textDecoration: "none",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              ← Volver a Categorías
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div
        style={{
          marginBottom: "20px",
          fontSize: "14px",
          color: "#666",
          backgroundColor: "#f8f9fa",
          padding: "10px 15px",
          borderRadius: "4px",
          border: "1px solid #dee2e6",
        }}
      >
        <Link href="/" style={{ color: "#007bff", textDecoration: "none" }}>
          Dashboard
        </Link>
        {" > "}
        <Link href="/jugadores" style={{ color: "#007bff", textDecoration: "none" }}>
          Jugadores
        </Link>
        {" > "}
        <span style={{ fontWeight: "bold" }}>Categoría 2014</span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar por nombre, DNI o número de socio..."
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Stats Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <div style={{ ...getPosicionColor("ARQUERO"), padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>{arqueros}</div>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>Arqueros</p>
        </div>
        <div style={{ ...getPosicionColor("DEFENSOR"), padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>{defensores}</div>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>Defensores</p>
        </div>
        <div style={{ ...getPosicionColor("VOLANTE"), padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>{volantes}</div>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>Volantes</p>
        </div>
        <div style={{ ...getPosicionColor("DELANTERO"), padding: "15px", borderRadius: "8px", textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>{delanteros}</div>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>Delanteros</p>
        </div>
      </div>

      {/* Players List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {jugadores2014.map((jugador) => (
          <div
            key={jugador.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderLeft: "4px solid #007bff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <div style={{ flex: 1, minWidth: "300px" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}
                >
                  <h3 style={{ margin: 0, color: "#333", fontSize: "18px" }}>{jugador.nombre}</h3>
                  <span
                    style={{
                      ...getPosicionColor(jugador.posicion),
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {jugador.posicion}
                  </span>
                  <span
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#495057",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    {jugador.pierna}
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "5px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <strong>DNI:</strong> {jugador.dni}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Fichado:</strong> {jugador.fichado}
                  </p>
                  {jugador.numero_socio && (
                    <p style={{ margin: 0 }}>
                      <strong>N° Socio:</strong> {jugador.numero_socio}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                {/* Stats */}
                <div style={{ display: "flex", gap: "15px" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#007bff" }}>{jugador.partidos}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>Partidos</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#28a745" }}>{jugador.goles}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>Goles</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ffc107" }}>{jugador.amarillas}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>Amarillas</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#dc3545" }}>{jugador.rojas}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>Rojas</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <Link
                    href={`/jugadores/2014/${jugador.id}`}
                    style={{
                      backgroundColor: "white",
                      color: "#007bff",
                      padding: "6px 12px",
                      border: "1px solid #007bff",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    Ver Detalle
                  </Link>
                  <button
                    onClick={() => {}}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <p style={{ margin: 0, color: "#666" }}>
          📊 Mostrando {jugadores2014.length} jugadores de la categoría 2014.
          <Link href="/jugadores/2014/nuevo" style={{ color: "#007bff", marginLeft: "10px" }}>
            ➕ Agregar nuevo jugador
          </Link>
        </p>
      </div>
    </div>
  )
}
