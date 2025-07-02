"use client"

import Link from "next/link"

export default function Jugadores2015Page() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#333", margin: "0 0 10px 0" }}>📅 Plantel Categoría 2015</h1>
            <p style={{ color: "#666", margin: 0 }}>Gestión de jugadores nacidos en 2015</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
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
        <span style={{ fontWeight: "bold" }}>Categoría 2015</span>
      </div>

      {/* Estado de preparación */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#fff3e0",
          borderRadius: "12px",
          border: "2px solid #ffcc02",
          margin: "40px 0",
        }}
      >
        <div style={{ fontSize: "72px", marginBottom: "20px" }}>🚧</div>
        <h2 style={{ color: "#e65100", margin: "0 0 15px 0" }}>Categoría 2015 en Preparación</h2>
        <p style={{ color: "#bf360c", fontSize: "18px", margin: "0 0 25px 0" }}>
          Esta sección estará disponible cuando se complete la carga de la base de datos.
        </p>

        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ffcc02",
            marginBottom: "25px",
          }}
        >
          <h3 style={{ color: "#e65100", margin: "0 0 15px 0" }}>📋 Próximos pasos:</h3>
          <div style={{ textAlign: "left", color: "#bf360c" }}>
            <p style={{ margin: "5px 0" }}>✅ Estructura de base de datos configurada</p>
            <p style={{ margin: "5px 0" }}>✅ Interfaz de usuario preparada</p>
            <p style={{ margin: "5px 0" }}>⏳ Pendiente: Carga de datos de jugadores 2015</p>
            <p style={{ margin: "5px 0" }}>⏳ Pendiente: Configuración de fixtures 2015</p>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <Link
            href="/jugadores"
            style={{
              backgroundColor: "#ff9800",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ← Volver a Categorías
          </Link>
          <Link
            href="/jugadores/2014"
            style={{
              backgroundColor: "#2196f3",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Ver Categoría 2014 →
          </Link>
        </div>
      </div>

      {/* Información técnica */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <h3 style={{ color: "#333", margin: "0 0 15px 0" }}>ℹ️ Información Técnica</h3>
        <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
          <p style={{ margin: "0 0 10px 0" }}>
            <strong>Estado actual:</strong> La estructura está lista para recibir los datos de la categoría 2015.
          </p>
          <p style={{ margin: "0 0 10px 0" }}>
            <strong>Funcionalidades preparadas:</strong> Gestión de jugadores, estadísticas, citaciones y formaciones.
          </p>
          <p style={{ margin: "0" }}>
            <strong>Próxima actualización:</strong> Una vez cargados los datos, esta página mostrará el plantel
            completo.
          </p>
        </div>
      </div>
    </div>
  )
}
