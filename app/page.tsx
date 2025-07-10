"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button" 
import { Badge } from "@/components/ui/badge" 

interface DashboardStats {
  totalJugadores: number
  partidosJugados: number
  partidosProgramados: number
  golesAFavor: number
  golesEnContra: number
  victorias: number
  empates: number
  derrotas: number
}

interface ProximoPartido {
  id: number
  fecha: string
  rival: string
  local: boolean
}

interface UltimoPartido {
  id: number
  fecha: string
  rival: string
  local: boolean
  resultado_local: number
  resultado_visitante: number
}

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [proximoPartido, setProximoPartido] = useState<ProximoPartido | null>(null)
  const [ultimoPartido, setUltimoPartido] = useState<UltimoPartido | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch jugadores
      const jugadoresRes = await fetch("/api/jugadores")
      const jugadores = await jugadoresRes.json()

      // Fetch partidos
      const partidosRes = await fetch("/api/partidos")
      const partidos = await partidosRes.json()

      // Calcular estadísticas
      const partidosJugados = partidos.filter((p: any) => p.estado === "Finalizado")
      const partidosProgramados = partidos.filter((p: any) => p.estado === "Programado")

      let golesAFavor = 0
      let golesEnContra = 0
      let victorias = 0
      let empates = 0
      let derrotas = 0

      partidosJugados.forEach((partido: any) => {
        if (partido.resultado_local !== null && partido.resultado_visitante !== null) {
          const nuestrosGoles = partido.local ? partido.resultado_local : partido.resultado_visitante
          const golesRival = partido.local ? partido.resultado_visitante : partido.resultado_local

          golesAFavor += nuestrosGoles
          golesEnContra += golesRival

          if (nuestrosGoles > golesRival) victorias++
          else if (nuestrosGoles < golesRival) derrotas++
          else empates++
        }
      })

      setStats({
        totalJugadores: jugadores.length,
        partidosJugados: partidosJugados.length,
        partidosProgramados: partidosProgramados.length,
        golesAFavor,
        golesEnContra,
        victorias,
        empates,
        derrotas,
      })

      // Próximo partido
      const proximosPartidos = partidosProgramados.sort(
        (a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime(),
      )
      if (proximosPartidos.length > 0) {
        setProximoPartido(proximosPartidos[0])
      }

      // Último partido
      const ultimosPartidos = partidosJugados.sort(
        (a: any, b: any) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
      )
      if (ultimosPartidos.length > 0) {
        setUltimoPartido(ultimosPartidos[0])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getResultadoBadge = (partido: UltimoPartido) => {
    const nuestrosGoles = partido.local ? partido.resultado_local : partido.resultado_visitante
    const golesRival = partido.local ? partido.resultado_visitante : partido.resultado_local

    if (nuestrosGoles > golesRival) {
      return <Badge className="bg-green-500">Victoria</Badge>
    } else if (nuestrosGoles < golesRival) {
      return <Badge variant="destructive">Derrota</Badge>
    } else {
      return (
        <Badge variant="secondary" className="bg-yellow-500">
          Empate
        </Badge>
      )
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard del Equipo</h1>
        <p className="text-gray-600">Resumen general de la temporada</p>
      </div>

      {/* Estadísticas Principales */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jugadores</p>
                  <p className="text-3xl font-bold">{stats.totalJugadores}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Partidos Jugados</p>
                  <p className="text-3xl font-bold">{stats.partidosJugados}</p>
                </div>
                <div className="text-4xl">⚽</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Goles a Favor</p>
                  <p className="text-3xl font-bold text-green-600">{stats.golesAFavor}</p>
                </div>
                <div className="text-4xl">🥅</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Goles en Contra</p>
                  <p className="text-3xl font-bold text-red-600">{stats.golesEnContra}</p>
                </div>
                <div className="text-4xl">🚫</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resultados */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.victorias}</div>
              <div className="text-sm text-gray-600">Victorias</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.empates}</div>
              <div className="text-sm text-gray-600">Empates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{stats.derrotas}</div>
              <div className="text-sm text-gray-600">Derrotas</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Próximo y Último Partido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {proximoPartido && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔜</span>
                Próximo Partido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">vs {proximoPartido.rival}</span>
                  <Badge variant={proximoPartido.local ? "default" : "outline"}>
                    {proximoPartido.local ? "LOCAL" : "VISITANTE"}
                  </Badge>
                </div>
                <div className="text-gray-600">
                  {new Date(proximoPartido.fecha).toLocaleDateString("es-AR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex gap-2">
                  <Link href={`/partidos/${proximoPartido.id}`}>
                    <Button size="sm">Ver Detalles</Button>
                  </Link>
                  <Link href="/citaciones">
                    <Button size="sm" variant="outline">
                      Citaciones
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {ultimoPartido && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📊</span>
                Último Partido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">vs {ultimoPartido.rival}</span>
                  {getResultadoBadge(ultimoPartido)}
                </div>
                <div className="text-2xl font-bold text-center">
                  {ultimoPartido.local
                    ? `${ultimoPartido.resultado_local} - ${ultimoPartido.resultado_visitante}`
                    : `${ultimoPartido.resultado_visitante} - ${ultimoPartido.resultado_local}`}
                </div>
                <div className="text-gray-600 text-center">
                  {new Date(ultimoPartido.fecha).toLocaleDateString("es-AR")}
                </div>
                <Link href={`/partidos/${ultimoPartido.id}`}>
                  <Button size="sm" className="w-full">
                    Ver Estadísticas
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Accesos Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/jugadores">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <span className="text-2xl">👥</span>
                <span>Jugadores</span>
              </Button>
            </Link>
            <Link href="/partidos">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <span className="text-2xl">⚽</span>
                <span>Partidos</span>
              </Button>
            </Link>
            <Link href="/estadisticas">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <span className="text-2xl">📊</span>
                <span>Estadísticas</span>
              </Button>
            </Link>
            <Link href="/formaciones">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <span className="text-2xl">🎯</span>
                <span>Formaciones</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
