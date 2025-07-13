import { notFound } from "next/navigation";
import { obtenerJugadores, obtenerJugadorPorId } from "@/db/database";

interface Jugador {
  id: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  posicion: string;
  numero_camiseta?: number;
  telefono?: string;
  email?: string;
  direccion?: string;
  categoria: string;
  activo: boolean;
  observaciones?: string;
  created_at: string;
  updated_at: string;
}

export async function generateStaticParams() {
  const jugadores = await obtenerJugadores();
  return jugadores.map((jugador) => ({
    id: jugador.id.toString(),
  }));
}

export default async function JugadorPage({ params }: { params: { id: string } }) {
  const jugador = await obtenerJugadorPorId(Number(params.id)) as Jugador | null;
  if (!jugador) notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {jugador.nombre} {jugador.apellido}
      </h1>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Posición: <span className="font-medium">{jugador.posicion}</span></p>
            <p className="text-sm text-gray-600">Categoría: <span className="font-medium">{jugador.categoria}</span></p>
            <p className="text-sm text-gray-600">Fecha de Nacimiento: <span className="font-medium">{new Date(jugador.fecha_nacimiento).toLocaleDateString("es-AR")}</span></p>
            <p className="text-sm text-gray-600">Número de Camiseta: <span className="font-medium">{jugador.numero_camiseta || "Sin asignar"}</span></p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Teléfono: <span className="font-medium">{jugador.telefono || "No disponible"}</span></p>
            <p className="text-sm text-gray-600">Email: <span className="font-medium">{jugador.email || "No disponible"}</span></p>
            <p className="text-sm text-gray-600">Dirección: <span className="font-medium">{jugador.direccion || "No disponible"}</span></p>
            <p className="text-sm text-gray-600">Observaciones: <span className="font-medium">{jugador.observaciones || "Ninguna"}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}