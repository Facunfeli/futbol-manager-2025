"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Partido {
  id: number;
  fecha: string;
  rival: string;
  local: boolean;
  resultado_local?: number;
  resultado_visitante?: number;
  estado: string;
  observaciones?: string;
  categoria: string;
  created_at: string;
  updated_at: string;
}

export default function PartidosPage() {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartidos() {
      try {
        const res = await fetch("/api/partidos");
        if (!res.ok) throw new Error("Error fetching partidos");
        const data = await res.json();
        setPartidos(data);
      } catch (error) {
        console.error("Error fetching partidos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPartidos();
  }, []);

  if (loading) {
    return <div className="p-6">Cargando partidos...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Partidos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Partidos</CardTitle>
        </CardHeader>
        <CardContent>
          {partidos.length === 0 ? (
            <p>No hay partidos disponibles.</p>
          ) : (
            <div className="space-y-4">
              {partidos.map((partido) => (
                <div key={partido.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">vs {partido.rival}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(partido.fecha).toLocaleDateString("es-AR")} - {partido.categoria}
                      </p>
                      <Badge variant={partido.local ? "default" : "outline"}>
                        {partido.local ? "LOCAL" : "VISITANTE"}
                      </Badge>
                    </div>
                    <div>
                      {partido.resultado_local !== undefined && partido.resultado_visitante !== undefined ? (
                        <p className="font-bold">
                          {partido.resultado_local} - {partido.resultado_visitante}
                        </p>
                      ) : (
                        <p>Sin resultado</p>
                      )}
                    </div>
                  </div>
                  <Link href={`/partidos/${partido.id}`}>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Ver Detalles
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}