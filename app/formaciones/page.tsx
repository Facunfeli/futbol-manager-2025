"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Formacion {
  id: number
  nombre: string
  esquema: string
  partido_id: number | null
  created_at: string
}

interface Partido {
  id: number
  fecha: string
  rival: string
  local: boolean
}

export default function FormacionesPage() {
  const [formaciones, setFormaciones] = useState<Formacion[]>([])
  const [partidos, setPartidos] = useState<Partido[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [formacionesRes, partidosRes] = await Promise.all([fetch("/api/formaciones"), fetch("/api/partidos")])

      const formacionesData = await formacionesRes.json()
      const partidosData = await partidosRes.json()

      setFormaciones(formacionesData)
      setPartidos(partidosData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPartidoInfo = (partidoId: number | null) => {
    if (!partidoId) return null
    return partidos.find((p) => p.id === partidoId)
  }

  const esquemasPredefinidos = [
    { nombre: "4-4-2", descripcion: "Formación clásica equilibrada" },
    { nombre: "4-3-3", descripcion: "Formación ofensiva con extremos" },
    { nombre: "3-5-2", descripcion: "Formación con mediocampo reforzado" },
    { nombre: "4-2-3-1", descripcion: "Formación moderna con mediapunta" },
    { nombre: "5-3-2", descripcion: "Formación defensiva" },
    { nombre: "4-1-4-1", descripción: "Formación con volante de contención" },
  ]

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando formaciones...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Formaciones Tácticas</h1>
        <Button>Nueva Formación</Button>
      </div>

      {/* Esquemas Predefinidos */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Esquemas Tácticos Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {esquemasPredefinidos.map((esquema, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{esquema.nombre}</h3>
                  <Button size="sm" variant="outline">
                    Usar
                  </Button>
                </div>
                <p className="text-sm text-gray-600">{esquema.descripcion}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formaciones Guardadas */}
      <Card>
        <CardHeader>
          <CardTitle>Formaciones Guardadas ({formaciones.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {formaciones.length > 0 ? (
            <div className="space-y-4">
              {formaciones.map((formacion) => {
                const partido = getPartidoInfo(formacion.partido_id)
                return (
                  <div key={formacion.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{formacion.nombre}</h3>
                        <Badge variant="outline" className="mt-1">
                          {formacion.esquema}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline">
                          Usar
                        </Button>
                      </div>
                    </div>

                    {partido && (
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Partido:</span> vs {partido.rival} -{" "}
                        {new Date(partido.fecha).toLocaleDateString("es-AR")}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Creada: {new Date(formacion.created_at).toLocaleDateString("es-AR")}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No hay formaciones guardadas aún.</p>
              <Button>Crear Primera Formación</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campo de Fútbol Visual */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Vista Previa del Campo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-100 border-2 border-green-300 rounded-lg p-8 min-h-96 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">⚽</div>
                <p>Selecciona una formación para ver la disposición de jugadores</p>
              </div>
            </div>

            {/* Líneas del campo */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-white opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-white rounded-full opacity-50"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
