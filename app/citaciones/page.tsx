"use client"

import { useRouter } from "next/navigation"

export default function CitacionesPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">📋 Citaciones</h1>
          <p className="text-gray-600 mt-1">Selecciona la categoría para crear citaciones</p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          ← Volver al Dashboard
        </button>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Categoría 2014 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
          <div className="p-6 text-center border-b border-gray-200">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="text-2xl font-semibold">Citaciones 2014</h3>
            <p className="text-gray-600">Crear citaciones para categoría 2014</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">20</div>
                <p className="text-sm text-gray-600">Jugadores disponibles</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <p className="text-sm text-gray-600">Próximos partidos</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-500">📱</span>
                <span>Envío por WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">✅</span>
                <span>Selección automática</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-500">📋</span>
                <span>Vista previa del mensaje</span>
              </div>
            </div>

            <button
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => router.push("/citaciones/2014")}
            >
              📋 Crear Citación 2014
            </button>
          </div>
        </div>

        {/* Categoría 2015 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow opacity-75">
          <div className="p-6 text-center border-b border-gray-200">
            <div className="text-4xl mb-2">📋</div>
            <h3 className="text-2xl font-semibold">Citaciones 2015</h3>
            <p className="text-gray-600">Crear citaciones para categoría 2015</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-600">Jugadores</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-600">Partidos</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>⚠️</span>
                <span>Próximamente</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>📅</span>
                <span>Datos en preparación</span>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" disabled>
              📋 Crear Citación 2015
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">📱 Sistema de Citaciones</h3>
        <p className="text-gray-700">
          Crea citaciones personalizadas, selecciona jugadores y envía directamente por WhatsApp con un solo clic.
        </p>
      </div>
    </div>
  )
}
