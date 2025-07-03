"use client"

import { useRouter } from "next/navigation"

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
        <button
          onClick={() => router.push("/")}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          ← Volver al Dashboard
        </button>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Categoría 2014 */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📅</div>
            <h2 className="text-2xl font-bold">Partidos 2014</h2>
            <p className="text-gray-600">Fixture y resultados categoría 2014</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">6</div>
                <p className="text-sm text-gray-600">Partidos jugados</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <p className="text-sm text-gray-600">Próximos partidos</p>
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

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/partidos/2014")}
            >
              📅 Ver Fixture 2014
            </button>
          </div>
        </div>

        {/* Categoría 2015 */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow opacity-75">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📅</div>
            <h2 className="text-2xl font-bold">Partidos 2015</h2>
            <p className="text-gray-600">Fixture y resultados categoría 2015</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-600">Partidos programados</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-600">Resultados</p>
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

            <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
              📅 Ver Fixture 2015
            </button>
          </div>
        </div>
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
