"use client"

import { useRouter } from "next/navigation"

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
        <button
          onClick={() => router.push("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          ← Volver al Dashboard
        </button>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Categoría 2014 */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <div className="p-6 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-2xl font-bold mb-2">Formaciones 2014</h2>
            <p className="text-gray-600 mb-4">Armador táctico para la categoría 2014</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">20</div>
                <p className="text-sm text-gray-500">Jugadores disponibles</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">5</div>
                <p className="text-sm text-gray-500">Formaciones guardadas</p>
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

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/formaciones/2014")}
            >
              🏆 Armar Formación 2014
            </button>
          </div>
        </div>

        {/* Categoría 2015 */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 opacity-75">
          <div className="p-6 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-2xl font-bold mb-2">Formaciones 2015</h2>
            <p className="text-gray-600 mb-4">Armador táctico para la categoría 2015</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-500">Jugadores</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-500">Formaciones</p>
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

            <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
              🏆 Armar Formación 2015
            </button>
          </div>
        </div>
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
