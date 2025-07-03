"use client"

import Link from "next/link"

export default function JugadoresPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Gestión de Jugadores</h1>
          <p className="text-gray-600">Selecciona la categoría que deseas gestionar</p>
        </div>
        <Link href="/">
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
            ← Volver al Dashboard
          </button>
        </Link>
      </div>

      {/* Selección de Categorías */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Categoría 2014 */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow border-blue-200">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📅</div>
            <h2 className="text-2xl font-bold text-blue-700">Categoría 2014</h2>
            <p className="text-gray-600">Jugadores nacidos en 2014</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
            <div className="text-3xl font-bold text-blue-600 text-center">20</div>
            <div className="text-sm text-gray-600 text-center">Jugadores registrados</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs mb-4">
            <div className="bg-yellow-100 p-2 rounded text-center border border-yellow-200">
              <div className="font-bold text-yellow-700">3</div>
              <div className="text-yellow-700">Arqueros</div>
            </div>
            <div className="bg-blue-100 p-2 rounded text-center border border-blue-200">
              <div className="font-bold text-blue-700">8</div>
              <div className="text-blue-700">Defensores</div>
            </div>
            <div className="bg-green-100 p-2 rounded text-center border border-green-200">
              <div className="font-bold text-green-700">6</div>
              <div className="text-green-700">Volantes</div>
            </div>
            <div className="bg-red-100 p-2 rounded text-center border border-red-200">
              <div className="font-bold text-red-700">3</div>
              <div className="text-red-700">Delanteros</div>
            </div>
          </div>

          <div className="space-y-2">
            <Link href="/jugadores/2014">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                👥 Ver Plantel 2014
              </button>
            </Link>
            <Link href="/jugadores/2014/nuevo">
              <button className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors">
                ➕ Agregar Jugador 2014
              </button>
            </Link>
          </div>
        </div>

        {/* Categoría 2015 */}
        <div className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition-shadow border-green-200 opacity-75">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">📅</div>
            <h2 className="text-2xl font-bold text-green-700">Categoría 2015</h2>
            <p className="text-gray-600">Jugadores nacidos en 2015</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
            <div className="text-3xl font-bold text-green-600 text-center">0</div>
            <div className="text-sm text-gray-600 text-center">Jugadores registrados</div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
            <div className="text-center">
              <div className="text-orange-600 font-bold">⚠️ Próximamente</div>
              <div className="text-sm text-orange-600">Base de datos pendiente de carga</div>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
              👥 Ver Plantel 2015
            </button>
            <button
              className="w-full bg-gray-200 text-gray-500 border border-gray-300 py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              ➕ Agregar Jugador 2015
            </button>
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-gray-50 p-6 rounded-lg border text-center">
        <h3 className="font-medium text-gray-900 mb-2">ℹ️ Información del Sistema</h3>
        <p className="text-sm text-gray-600 mb-3">
          El sistema está configurado para manejar múltiples categorías de jugadores. Actualmente tienes acceso completo
          a la categoría 2014.
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-500">
          <div>✅ Categoría 2014: Activa</div>
          <div>⏳ Categoría 2015: En preparación</div>
        </div>
      </div>
    </div>
  )
}