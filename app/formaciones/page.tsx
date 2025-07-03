"use client"

import { useRouter } from "next/navigation"

export default function FormacionesPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">⚽ Formaciones</h1>
          <p className="text-gray-600 mt-1">Gestiona las formaciones y tácticas por categoría</p>
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
            <div className="text-4xl mb-2">⚽</div>
            <h2 className="text-2xl font-bold">Formaciones 2014</h2>
            <p className="text-gray-600">Tácticas y formaciones categoría 2014</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <p className="text-sm text-gray-600">Formaciones guardadas</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">4-4-2</div>
                <p className="text-sm text-gray-600">Formación principal</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-500">⚽</span>
                <span>Formación titular configurada</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-500">📊</span>
                <span>Variantes tácticas disponibles</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-purple-500">👥</span>
                <span>20 jugadores disponibles</span>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/formaciones/2014")}
            >
              ⚽ Gestionar Formaciones 2014
            </button>
          </div>
        </div>

        {/* Categoría 2015 */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow opacity-75">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">⚽</div>
            <h2 className="text-2xl font-bold">Formaciones 2015</h2>
            <p className="text-gray-600">Tácticas y formaciones categoría 2015</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-400">0</div>
                <p className="text-sm text-gray-600">Formaciones</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">-</div>
                <p className="text-sm text-gray-600">Sin configurar</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>⚠️</span>
                <span>Próximamente</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>👥</span>
                <span>Plantel en preparación</span>
              </div>
            </div>

            <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
              ⚽ Gestionar Formaciones 2015
            </button>
          </div>
        </div>
      </div>

      {/* Información sobre Formaciones */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">⚽ Sistema de Formaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-1">🎯 Formaciones Tácticas</h4>
            <p className="text-gray-700">Configura diferentes esquemas tácticos: 4-4-2, 4-3-3, 3-5-2, etc.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">👥 Gestión de Jugadores</h4>
            <p className="text-gray-700">Asigna jugadores a posiciones específicas según sus características.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">📊 Análisis Táctico</h4>
            <p className="text-gray-700">Visualiza formaciones en campo y analiza rendimiento por posición.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
