"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  posicion: string;
  telefono?: string;
  categoria: string;
}

interface Partido {
  id: number;
  fecha: string;
  rival: string;
  local: boolean;
  estado: string;
  categoria: string;
}

export default function Citaciones2014Page() {
  const router = useRouter();
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState<number[]>([]);
  const [partidoSeleccionado, setPartidoSeleccionado] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [jugadoresRes, partidosRes] = await Promise.all([
          fetch("/api/jugadores?categoria=2014"),
          fetch("/api/partidos?categoria=2014"),
        ]);
        if (!jugadoresRes.ok || !partidosRes.ok) throw new Error("Error fetching data");
        const jugadoresData = await jugadoresRes.json();
        const partidosData = await partidosRes.json();
        setJugadores(jugadoresData);
        setPartidos(partidosData.filter((p: Partido) => p.estado === "programado"));
        if (partidosData.length > 0) setPartidoSeleccionado(partidosData[0].id);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleJugador = (id: number) => {
    setJugadoresSeleccionados((prev) => (prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]));
  };

  const seleccionarTodos = () => {
    setJugadoresSeleccionados(jugadores.map((j) => j.id));
  };

  const seleccionarNinguno = () => {
    setJugadoresSeleccionados([]);
  };

  const seleccionarTipica = () => {
    const formacionTipica = jugadores.slice(0, 11).map((j) => j.id);
    setJugadoresSeleccionados(formacionTipica);
  };

  const partido = partidos.find((p) => p.id === partidoSeleccionado);
  const jugadoresCitados = jugadores.filter((j) => jugadoresSeleccionados.includes(j.id));

  const generarMensaje = () => {
    if (!partido) return "";
    const fecha = new Date(partido.fecha).toLocaleDateString("es-AR");
    const ubicacion = partido.local ? "LOCAL" : `vs ${partido.rival}`;
    return `🏆 CITACIÓN OFICIAL 🏆

📅 Partido: ${partido.rival}
📍 ${ubicacion}
🕐 Fecha: ${fecha}

👥 JUGADORES CITADOS:
${jugadoresCitados.map((j, i) => `${i + 1}. ${j.nombre} ${j.apellido} (${j.posicion})`).join("\n")}

⚽ ¡Nos vemos en la cancha!
💪 #VamosEquipo`;
  };

  const enviarWhatsApp = () => {
    const mensaje = generarMensaje();
    const numeroGrupo = "+5491123456789"; // Cambiar por un número dinámico si es necesario
    const url = `https://wa.me/${numeroGrupo}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return <div className="p-6">Cargando datos...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">📋 Citaciones 2014</h1>
          <p className="text-gray-600 mt-1">Crear y enviar citaciones por WhatsApp</p>
        </div>
        <Button
          onClick={() => router.push("/citaciones")}
          variant="outline"
        >
          ← Volver a Citaciones
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📅 Seleccionar Partido</CardTitle>
          </CardHeader>
          <CardContent>
            {partidos.map((partido) => (
              <div
                key={partido.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  partidoSeleccionado === partido.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setPartidoSeleccionado(partido.id)}
              >
                <div className="font-semibold">vs {partido.rival}</div>
                <div className="text-sm text-gray-600">
                  {new Date(partido.fecha).toLocaleDateString("es-AR")}
                </div>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    partido.local ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {partido.local ? "LOCAL" : "VISITANTE"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👥 Seleccionar Jugadores</CardTitle>
            <div className="flex gap-2 mt-3">
              <Button
                onClick={seleccionarTodos}
                variant="outline"
              >
                Todos
              </Button>
              <Button
                onClick={seleccionarNinguno}
                variant="outline"
              >
                Ninguno
              </Button>
              <Button
                onClick={seleccionarTipica}
                variant="outline"
              >
                Típica
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {jugadores.map((jugador) => (
                <div key={jugador.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={jugadoresSeleccionados.includes(jugador.id)}
                    onChange={() => toggleJugador(jugador.id)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{jugador.nombre} {jugador.apellido}</div>
                    <div className="text-sm text-gray-500">{jugador.posicion}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📱 Vista Previa</CardTitle>
            <p className="text-sm text-gray-600">{jugadoresSeleccionados.length} jugadores seleccionados</p>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <pre className="text-sm whitespace-pre-wrap font-mono">{generarMensaje()}</pre>
            </div>
            <div className="space-y-2 mt-4">
              <Button
                className="w-full"
                onClick={enviarWhatsApp}
                disabled={jugadoresSeleccionados.length === 0}
              >
                📱 Enviar por WhatsApp
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(generarMensaje());
                  alert("Mensaje copiado al portapapeles");
                }}
                disabled={jugadoresSeleccionados.length === 0}
              >
                📋 Copiar Mensaje
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{jugadores.length}</div>
            <div className="text-sm text-gray-600">Total Jugadores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{jugadoresSeleccionados.length}</div>
            <div className="text-sm text-gray-600">Seleccionados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{partidos.length}</div>
            <div className="text-sm text-gray-600">Próximos Partidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-gray-600">Sistema Activo</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}