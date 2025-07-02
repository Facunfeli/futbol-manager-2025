"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">⚙️ Panel de Administración</h1>
          <p className="text-gray-600">Gestiona resultados, estadísticas y configuraciones</p>
        </div>
        <Link href="/">
          <Button variant="outline">← Volver al Dashboard</Button>
        </Link>
      </div>

      {/* Opciones de Administración */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gestión de Resultados */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="text-4xl mb-2">⚽</div>
            <CardTitle>Cargar Resultados</CardTitle>
            <CardDescription>Actualizar resultados de partidos jugados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Seleccionar partido</div>
              <div className="text-sm text-gray-600">• Ingresar resultado</div>
              <div className="text-sm text-gray-600">• Actualizar automáticamente</div>
            </div>
            <Link href="/admin/resultados">
              <Button className="w-full">⚽ Cargar Resultados</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Estadísticas de Jugadores */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="text-4xl mb-2">📊</div>
            <CardTitle>Estadísticas Jugadores</CardTitle>
            <CardDescription>Registrar goles, tarjetas y minutos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Goles por jugador</div>
              <div className="text-sm text-gray-600">• Tarjetas amarillas/rojas</div>
              <div className="text-sm text-gray-600">• Minutos jugados</div>
            </div>
            <Link href="/admin/estadisticas">
              <Button className="w-full">📊 Gestionar Stats</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Gestión de Partidos */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="text-4xl mb-2">📅</div>
            <CardTitle>Gestión de Partidos</CardTitle>
            <CardDescription>Crear, editar y programar partidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Agregar nuevos partidos</div>
              <div className="text-sm text-gray-600">• Modificar fechas/horarios</div>
              <div className="text-sm text-gray-600">• Cambiar estados</div>
            </div>
            <Link href="/admin/partidos">
              <Button className="w-full">📅 Gestionar Partidos</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Gestión de Jugadores */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="text-4xl mb-2">👥</div>
            <CardTitle>Gestión de Jugadores</CardTitle>
            <CardDescription>Editar información de jugadores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Actualizar datos personales</div>
              <div className="text-sm text-gray-600">• Cambiar estados físicos</div>
              <div className="text-sm text-gray-600">• Modificar posiciones</div>
            </div>
            <Link href="/admin/jugadores">
              <Button className="w-full">👥 Editar Jugadores</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Respaldos */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="text-4xl mb-2">💾</div>
            <CardTitle>Respaldos</CardTitle>
            <CardDescription>Exportar e importar datos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Exportar a Excel</div>
              <div className="text-sm text-gray-600">• Respaldar base de datos</div>
              <div className="text-sm text-gray-600">• Importar datos</div>
            </div>
            <Button className="w-full" disabled>
              💾 Próximamente
            </Button>
          </CardContent>
        </Card>

        {/* Configuraciones */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="text-4xl mb-2">⚙️</div>
            <CardTitle>Configuraciones</CardTitle>
            <CardDescription>Ajustes generales del sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="text-sm text-gray-600">• Configurar temporada</div>
              <div className="text-sm text-gray-600">• Ajustar categorías</div>
              <div className="text-sm text-gray-600">• Personalizar sistema</div>
            </div>
            <Button className="w-full" disabled>
              ⚙️ Próximamente
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Acceso Rápido */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">🚀 Acceso Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/admin/resultados">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                ⚽ Resultado Rápido
              </Button>
            </Link>
            <Link href="/admin/estadisticas">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                📊 Stats Rápidas
              </Button>
            </Link>
            <Link href="/jugadores/2014/nuevo">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                👥 Nuevo Jugador
              </Button>
            </Link>
            <Link href="/citaciones/2014">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                📱 Citación WhatsApp
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
