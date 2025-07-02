"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormacionesPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">🏆 Formaciones</h1>
          <p className="text-gray-600 mt-1">Selecciona la categoría para armar formaciones</p>
        </div>
        <Button variant="outline" onClick={() => router.push("/")} className="flex items-center gap-2">
          ← Volver al Dashboard
        </Button>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Categoría 2014 */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <CardTitle className="text-2xl">Formaciones 2014</CardTitle>
            <CardDescription>Armador táctico para la categoría 2014</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">20</div>
                <p className="text-sm text-muted-foreground">Jugadores disponibles</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">5</div>
                <p className="text-sm text-muted-foreground">Formaciones guardadas</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-500">⚽</span>
                <span>Armador visual interactivo</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">📋</span>
                <span>Múltiples esquemas tácticos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-500">💾</span>
                <span>Guardar y cargar formaciones</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => router.push("/formaciones/2014")}>
              🏆 Armar Formación 2014
            </Button>
          </CardContent>
        </Card>

        {/* Categoría 2015 */}
        <Card className="hover:shadow-lg transition-shadow opacity-75">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">🏆</div>
            <CardTitle className="text-2xl">Formaciones 2015</CardTitle>
            <CardDescription>Armador táctico para la categoría 2015</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-muted-foreground">Jugadores</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-muted-foreground">Formaciones</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>⚠️</span>
                <span>Próximamente</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>📅</span>
                <span>Plantel en preparación</span>
              </div>
            </div>

            <Button className="w-full" variant="secondary" disabled>
              🏆 Armar Formación 2015
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">🏆 Armador de Formaciones</h3>
        <p className="text-gray-700">
          Sistema visual para crear formaciones tácticas, con drag & drop de jugadores y múltiples esquemas
          predefinidos.
        </p>
      </div>
    </div>
  )
}
