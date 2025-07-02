"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

const posicionesDisponibles = ["ARQUERO", "DEFENSOR", "VOLANTE", "DELANTERO"]
const piernaOptions = ["DERECHO", "IZQUIERDO", "AMBIDIESTRO"]
const fichados = ["AFA", "METRO", "AFA/METRO", "METRO/SEG GRUPO", ""]
const estadosDisponibles = ["Disponible", "Lesionado", "Suspendido", "Inactivo"]

export default function NuevoJugadorPage() {
  const router = useRouter()
  const [guardando, setGuardando] = useState(false)
  const [errores, setErrores] = useState<{ [key: string]: string }>({})

  const [formData, setFormData] = useState({
    dni: "",
    apellido_nombre: "",
    numero_socio: "",
    fichado: "",
    posicion: "",
    pierna_habil: "",
    telefono: "",
    email: "",
    fecha_nacimiento: "",
    altura: "",
    peso: "",
    numero_camiseta: "",
    velocidad_100m: "",
    estado_fisico: "Disponible",
    observaciones: "",
  })

  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {}

    // Validaciones obligatorias
    if (!formData.dni.trim()) nuevosErrores.dni = "El DNI es obligatorio"
    if (!formData.apellido_nombre.trim()) nuevosErrores.apellido_nombre = "El nombre es obligatorio"
    if (!formData.posicion) nuevosErrores.posicion = "La posición es obligatoria"
    if (!formData.pierna_habil) nuevosErrores.pierna_habil = "La pierna hábil es obligatoria"

    // Validaciones de formato
    if (formData.dni && !/^\d{2}\.\d{3}\.\d{3}$/.test(formData.dni)) {
      nuevosErrores.dni = "Formato de DNI inválido (ej: 12.345.678)"
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = "Formato de email inválido"
    }

    if (formData.altura && (Number.parseInt(formData.altura) < 140 || Number.parseInt(formData.altura) > 220)) {
      nuevosErrores.altura = "La altura debe estar entre 140 y 220 cm"
    }

    if (formData.peso && (Number.parseFloat(formData.peso) < 40 || Number.parseFloat(formData.peso) > 120)) {
      nuevosErrores.peso = "El peso debe estar entre 40 y 120 kg"
    }

    if (
      formData.velocidad_100m &&
      (Number.parseFloat(formData.velocidad_100m) < 10 || Number.parseFloat(formData.velocidad_100m) > 20)
    ) {
      nuevosErrores.velocidad_100m = "La velocidad debe estar entre 10 y 20 segundos"
    }

    if (
      formData.numero_camiseta &&
      (Number.parseInt(formData.numero_camiseta) < 1 || Number.parseInt(formData.numero_camiseta) > 99)
    ) {
      nuevosErrores.numero_camiseta = "El número debe estar entre 1 y 99"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setGuardando(true)

    try {
      // Simular guardado en base de datos
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Aquí harías la llamada real a la API
      console.log("Guardando jugador:", formData)

      // Redirigir a la lista de jugadores
      router.push("/jugadores?nuevo=true")
    } catch (error) {
      console.error("Error al guardar:", error)
      alert("Error al guardar el jugador. Intenta nuevamente.")
    } finally {
      setGuardando(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[field]) {
      setErrores((prev) => ({ ...prev, [field]: "" }))
    }
  }

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#333", margin: "0 0 10px 0" }}>➕ Agregar Nuevo Jugador</h1>
            <p style={{ color: "#666", margin: 0 }}>Completa la información del nuevo jugador del plantel</p>
          </div>
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
            ← Cancelar
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Columna Izquierda - Información Personal */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  color: "#333",
                  borderBottom: "2px solid #f8f9fa",
                  paddingBottom: "10px",
                }}
              >
                👤 Información Personal
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                {/* DNI */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    DNI *
                  </label>
                  <input
                    type="text"
                    value={formData.dni}
                    onChange={(e) => handleInputChange("dni", e.target.value)}
                    placeholder="12.345.678"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: errores.dni ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  {errores.dni && (
                    <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>{errores.dni}</div>
                  )}
                </div>

                {/* Nombre */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Apellido y Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.apellido_nombre}
                    onChange={(e) => handleInputChange("apellido_nombre", e.target.value.toUpperCase())}
                    placeholder="PÉREZ JUAN"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: errores.apellido_nombre ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  {errores.apellido_nombre && (
                    <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                      {errores.apellido_nombre}
                    </div>
                  )}
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={formData.fecha_nacimiento}
                    onChange={(e) => handleInputChange("fecha_nacimiento", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Teléfono y Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+54 9 11 1234-5678"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="jugador@email.com"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: errores.email ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                    {errores.email && (
                      <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>{errores.email}</div>
                    )}
                  </div>
                </div>

                {/* Altura, Peso y Velocidad */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                      Altura (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.altura}
                      onChange={(e) => handleInputChange("altura", e.target.value)}
                      placeholder="175"
                      min="140"
                      max="220"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: errores.altura ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                    {errores.altura && (
                      <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>{errores.altura}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.peso}
                      onChange={(e) => handleInputChange("peso", e.target.value)}
                      placeholder="70.5"
                      min="40"
                      max="120"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: errores.peso ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                    {errores.peso && (
                      <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>{errores.peso}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                      Velocidad 100m (s)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.velocidad_100m}
                      onChange={(e) => handleInputChange("velocidad_100m", e.target.value)}
                      placeholder="12.5"
                      min="10"
                      max="20"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: errores.velocidad_100m ? "2px solid #dc3545" : "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    />
                    {errores.velocidad_100m && (
                      <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                        {errores.velocidad_100m}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Información Deportiva */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  color: "#333",
                  borderBottom: "2px solid #f8f9fa",
                  paddingBottom: "10px",
                }}
              >
                ⚽ Información Deportiva
              </h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                {/* Posición */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Posición *
                  </label>
                  <select
                    value={formData.posicion}
                    onChange={(e) => handleInputChange("posicion", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: errores.posicion ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      backgroundColor: formData.posicion ? getPosicionColor(formData.posicion) : "white",
                      color: formData.posicion ? "white" : "#333",
                    }}
                  >
                    <option value="">Seleccionar posición</option>
                    {posicionesDisponibles.map((pos) => (
                      <option key={pos} value={pos} style={{ backgroundColor: "white", color: "#333" }}>
                        {pos}
                      </option>
                    ))}
                  </select>
                  {errores.posicion && (
                    <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>{errores.posicion}</div>
                  )}
                </div>

                {/* Pierna Hábil */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Pierna Hábil *
                  </label>
                  <select
                    value={formData.pierna_habil}
                    onChange={(e) => handleInputChange("pierna_habil", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: errores.pierna_habil ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Seleccionar pierna</option>
                    {piernaOptions.map((pierna) => (
                      <option key={pierna} value={pierna}>
                        {pierna}
                      </option>
                    ))}
                  </select>
                  {errores.pierna_habil && (
                    <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>{errores.pierna_habil}</div>
                  )}
                </div>

                {/* Número de Camiseta */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Número de Camiseta
                  </label>
                  <input
                    type="number"
                    value={formData.numero_camiseta}
                    onChange={(e) => handleInputChange("numero_camiseta", e.target.value)}
                    placeholder="10"
                    min="1"
                    max="99"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: errores.numero_camiseta ? "2px solid #dc3545" : "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                  {errores.numero_camiseta && (
                    <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                      {errores.numero_camiseta}
                    </div>
                  )}
                </div>

                {/* Fichado */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Fichado
                  </label>
                  <select
                    value={formData.fichado}
                    onChange={(e) => handleInputChange("fichado", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">No especificado</option>
                    {fichados
                      .filter((f) => f !== "")
                      .map((fichado) => (
                        <option key={fichado} value={fichado}>
                          {fichado}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Número de Socio */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Número de Socio
                  </label>
                  <input
                    type="text"
                    value={formData.numero_socio}
                    onChange={(e) => handleInputChange("numero_socio", e.target.value)}
                    placeholder="12345-1"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Estado */}
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#333" }}>
                    Estado Físico
                  </label>
                  <select
                    value={formData.estado_fisico}
                    onChange={(e) => handleInputChange("estado_fisico", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {estadosDisponibles.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Observaciones */}
            <div
              style={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>📝 Observaciones</h3>
              <textarea
                value={formData.observaciones}
                onChange={(e) => handleInputChange("observaciones", e.target.value)}
                placeholder="Notas adicionales sobre el jugador..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "Arial, sans-serif",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #ddd",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
            <button
              type="submit"
              disabled={guardando}
              style={{
                backgroundColor: guardando ? "#6c757d" : "#28a745",
                color: "white",
                padding: "15px 30px",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: guardando ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {guardando ? "⏳ Guardando..." : "💾 Guardar Jugador"}
            </button>
            <Link
              href="/jugadores"
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                padding: "15px 30px",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              ❌ Cancelar
            </Link>
          </div>
          <p style={{ margin: "15px 0 0 0", fontSize: "12px", color: "#666" }}>* Campos obligatorios</p>
        </div>
      </form>
    </div>
  )
}
