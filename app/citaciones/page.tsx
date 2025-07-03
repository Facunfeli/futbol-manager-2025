"use client"

import { useRouter } from "next/navigation"

export default function CitacionesPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">📋 Citaciones</h1>
          <p className="text-gray-600 mt-1">Selecciona la categoría para gestionar citaciones</p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors flex items-center gap-2"
        >
          ← Volver al Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📋</div>
            <h2 className="text-2xl font-bold">Citaciones 2014</h2>
            <p className="text-gray-600">Sistema de citaciones para la categoría 2014</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">20</div>
                <p className="text-sm text-gray-500">Jugadores activos</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <p className="text-sm text-gray-500">Próximos partidos</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-500">⚽</span>
                <span>Próximo: vs TEMPERLEY</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">📱</span>
                <span>WhatsApp integrado</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-500">📊</span>
                <span>Seguimiento completo</span>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/citaciones/2014")}
            >
              📋 Ver Citaciones 2014
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg opacity-75 p-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📋</div>
            <h2 className="text-2xl font-bold">Citaciones 2015</h2>
            <p className="text-gray-600">Sistema de citaciones para la categoría 2015</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-500">Jugadores</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-500">Partidos</p>
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
              📋 Ver Citaciones 2015
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">📋 Gestión de Citaciones</h3>
        <p className="text-gray-700">
          Sistema completo para crear y enviar citaciones por WhatsApp, con seguimiento de confirmaciones y gestión por
          categoría.
        </p>
      </div>
    </div>
  )
}
