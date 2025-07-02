"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PartidosPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">📅 Fixtures y Partidos</h1>
          <p className="text-gray-600 mt-1">Selecciona la categoría para ver el calendario de partidos</p>
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
            <div className="text-4xl mb-2">📅</div>
            <CardTitle className="text-2xl">Partidos 2014</CardTitle>
            <CardDescription>Fixture y resultados categoría 2014</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">6</div>
                <p className="text-sm text-muted-foreground">Partidos jugados</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <p className="text-sm text-muted-foreground">Próximos partidos</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-500">⚽</span>
                <span>Próximo: vs TEMPERLEY</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">📊</span>
                <span>Resultados completos</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-500">📅</span>
                <span>Calendario actualizado</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => router.push("/partidos/2014")}>
              📅 Ver Fixture 2014
            </Button>
          </CardContent>
        </Card>

        {/* Categoría 2015 */}
        <Card className="hover:shadow-lg transition-shadow opacity-75">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">📅</div>
            <CardTitle className="text-2xl">Partidos 2015</CardTitle>
            <CardDescription>Fixture y resultados categoría 2015</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-muted-foreground">Partidos programados</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-muted-foreground">Resultados</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>⚠️</span>
                <span>Próximamente</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>📅</span>
                <span>Fixture en preparación</span>
              </div>
            </div>

            <Button className="w-full" variant="secondary" disabled>
              📅 Ver Fixture 2015
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer Info */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">📅 Gestión de Partidos</h3>
        <p className="text-gray-700">
          Sistema completo para gestionar fixtures, resultados y estadísticas de partidos por categoría.
        </p>
      </div>
    </div>
  )
}
