"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

// Datos completos de TODOS los jugadores
const jugadoresCompletos = [
  {
    id: 1,
    nombre: "ZARATE MARTIN",
    dni: "54.062.160",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO/SEG GRUPO",
    numero_socio: "",
    numero_camiseta: 2,
    telefono: "+54 9 11 1234-5678",
    email: "zarate.martin@email.com",
    fecha_nacimiento: "2009-03-15",
    altura: 175,
    peso: 68.5,
    velocidad_100m: 12.8,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Jugador con buen físico, necesita mejorar técnica individual",
  },
  {
    id: 2,
    nombre: "AMARILLO MARTIN",
    dni: "53.972.046",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "56438",
    numero_camiseta: 3,
    telefono: "+54 9 11 2345-6789",
    email: "amarillo.martin@email.com",
    fecha_nacimiento: "2009-02-20",
    altura: 178,
    peso: 72.0,
    velocidad_100m: 13.2,
    partidos: 6,
    goles: 0,
    asistencias: 2,
    amarillas: 1,
    rojas: 0,
    minutos_totales: 540,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor sólido, buen juego aéreo",
  },
  {
    id: 3,
    nombre: "ALVAREZ LORENZO",
    dni: "54.130.324",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "59443-1",
    numero_camiseta: 4,
    telefono: "+54 9 11 3456-7890",
    email: "alvarez.lorenzo@email.com",
    fecha_nacimiento: "2009-04-12",
    altura: 176,
    peso: 70.0,
    velocidad_100m: 12.9,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor joven con potencial",
  },
  {
    id: 4,
    nombre: "BREY FEDERICO",
    dni: "53.755.218",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "57713",
    numero_camiseta: 5,
    telefono: "+54 9 11 4567-8901",
    email: "brey.federico@email.com",
    fecha_nacimiento: "2009-01-08",
    altura: 180,
    peso: 74.0,
    velocidad_100m: 13.1,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor alto, bueno en el juego aéreo",
  },
  {
    id: 5,
    nombre: "BENITEZ BENJAMIN",
    dni: "54.223.233",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "057727-1",
    numero_camiseta: 1,
    telefono: "+54 9 11 5678-9012",
    email: "benitez.benjamin@email.com",
    fecha_nacimiento: "2009-06-15",
    altura: 185,
    peso: 78.0,
    velocidad_100m: 14.2,
    partidos: 5,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 450,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Arquero titular, buenos reflejos",
  },
  {
    id: 6,
    nombre: "CABALLERO THIAGO",
    dni: "53.879.078",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "057712-1",
    numero_camiseta: 6,
    telefono: "+54 9 11 6789-0123",
    email: "caballero.thiago@email.com",
    fecha_nacimiento: "2009-03-22",
    altura: 172,
    peso: 66.0,
    velocidad_100m: 11.8,
    partidos: 1,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante técnico, zurdo hábil",
  },
  {
    id: 7,
    nombre: "LOZANO LORENZO",
    dni: "54.359.239",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "086339-1",
    numero_camiseta: 7,
    telefono: "+54 9 11 7890-1234",
    email: "lozano.lorenzo@email.com",
    fecha_nacimiento: "2009-05-30",
    altura: 177,
    peso: 71.0,
    velocidad_100m: 12.7,
    partidos: 5,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 450,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor lateral derecho, buen cruce",
  },
  {
    id: 8,
    nombre: "DORADO MATEO",
    dni: "53.985.186",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "57714",
    numero_camiseta: 8,
    telefono: "+54 9 11 8901-2345",
    email: "dorado.mateo@email.com",
    fecha_nacimiento: "2009-02-14",
    altura: 170,
    peso: 64.0,
    velocidad_100m: 12.1,
    partidos: 6,
    goles: 0,
    asistencias: 3,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 540,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante central, buen pase",
  },
  {
    id: 9,
    nombre: "CATALAN FRANCO",
    dni: "54.210.852",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "",
    numero_camiseta: 9,
    telefono: "+54 9 11 9012-3456",
    email: "catalan.franco@email.com",
    fecha_nacimiento: "2009-05-10",
    altura: 180,
    peso: 75.0,
    velocidad_100m: 11.5,
    partidos: 6,
    goles: 1,
    asistencias: 3,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 540,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero técnico, buen finalizador",
  },
  {
    id: 10,
    nombre: "SASSI LUCA",
    dni: "53.584.225",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "085466-1",
    numero_camiseta: 11,
    telefono: "+54 9 11 0123-4567",
    email: "sassi.luca@email.com",
    fecha_nacimiento: "2009-07-18",
    altura: 174,
    peso: 69.0,
    velocidad_100m: 13.0,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor suplente, en desarrollo",
  },
  {
    id: 11,
    nombre: "QUIROGA ROMAN",
    dni: "53.849.570",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "57329",
    numero_camiseta: 12,
    telefono: "+54 9 11 1234-5679",
    email: "quiroga.roman@email.com",
    fecha_nacimiento: "2009-04-25",
    altura: 178,
    peso: 73.0,
    velocidad_100m: 11.7,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero zurdo, buen remate",
  },
  {
    id: 12,
    nombre: "RETAMAR ESTEFANO",
    dni: "54.042.073",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "057718-3",
    numero_camiseta: 13,
    telefono: "+54 9 11 2345-6780",
    email: "retamar.estefano@email.com",
    fecha_nacimiento: "2009-08-03",
    altura: 175,
    peso: 70.0,
    velocidad_100m: 12.8,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor lateral izquierdo",
  },
  {
    id: 13,
    nombre: "RYNKIEWICZ PEDRO",
    dni: "53.857.975",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "068170-1",
    numero_camiseta: 14,
    telefono: "+54 9 11 3456-7891",
    email: "rynkiewicz.pedro@email.com",
    fecha_nacimiento: "2009-09-12",
    altura: 179,
    peso: 72.0,
    velocidad_100m: 12.9,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor central, buen juego aéreo",
  },
  {
    id: 14,
    nombre: "UMAÑO SIMON",
    dni: "53.892.760",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "AFA",
    numero_socio: "57879",
    numero_camiseta: 15,
    telefono: "+54 9 11 4567-8902",
    email: "umano.simon@email.com",
    fecha_nacimiento: "2009-10-20",
    altura: 173,
    peso: 67.0,
    velocidad_100m: 12.3,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante defensivo, buen marcaje",
  },
  {
    id: 15,
    nombre: "OCHOA ALEJO",
    dni: "53.991.020",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "57742",
    numero_camiseta: 16,
    telefono: "+54 9 11 5678-9013",
    email: "ochoa.alejo@email.com",
    fecha_nacimiento: "2009-11-05",
    altura: 176,
    peso: 71.0,
    velocidad_100m: 11.9,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero rápido, buen uno contra uno",
  },
  {
    id: 16,
    nombre: "ORTIZ CIRILO AARON",
    dni: "54.849.204",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "57813",
    numero_camiseta: 17,
    telefono: "+54 9 11 6789-0124",
    email: "ortiz.aaron@email.com",
    fecha_nacimiento: "2009-12-18",
    altura: 171,
    peso: 65.0,
    velocidad_100m: 12.2,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante ofensivo, zurdo técnico",
  },
  {
    id: 17,
    nombre: "TORRES THIAGO",
    dni: "53.448.553",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "58801",
    numero_camiseta: 18,
    telefono: "+54 9 11 7890-1235",
    email: "torres.thiago@email.com",
    fecha_nacimiento: "2009-01-30",
    altura: 182,
    peso: 76.0,
    velocidad_100m: 11.7,
    partidos: 2,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 180,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero alto, buen cabeceo",
  },
  {
    id: 18,
    nombre: "ZACHOZY BASTIAN",
    dni: "53.982.395",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "65352",
    numero_camiseta: 19,
    telefono: "+54 9 11 8901-2346",
    email: "zachozy.bastian@email.com",
    fecha_nacimiento: "2009-02-28",
    altura: 177,
    peso: 71.0,
    velocidad_100m: 12.6,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor versátil, puede jugar en varias posiciones",
  },
  {
    id: 19,
    nombre: "SOSA CIRO",
    dni: "53.836.055",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "69653-1",
    numero_camiseta: 20,
    telefono: "+54 9 11 9012-3457",
    email: "sosa.ciro@email.com",
    fecha_nacimiento: "2009-03-16",
    altura: 174,
    peso: 68.0,
    velocidad_100m: 11.6,
    partidos: 3,
    goles: 1,
    asistencias: 2,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 270,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero goleador, buen instinto",
  },
  {
    id: 20,
    nombre: "CABRAL MAXIMO",
    dni: "53.682.513",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "057828-2",
    numero_camiseta: 21,
    telefono: "+54 9 11 0123-4568",
    email: "cabral.maximo@email.com",
    fecha_nacimiento: "2009-04-08",
    altura: 179,
    peso: 74.0,
    velocidad_100m: 11.8,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero de área, buen remate",
  },
  {
    id: 21,
    nombre: "SALINAS PATRICIO",
    dni: "53.600.085",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "AFA",
    numero_socio: "077211-1",
    numero_camiseta: 22,
    telefono: "+54 9 11 1234-5670",
    email: "salinas.patricio@email.com",
    fecha_nacimiento: "2009-05-22",
    altura: 175,
    peso: 69.0,
    velocidad_100m: 12.4,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante box to box, buen físico",
  },
  {
    id: 22,
    nombre: "ZABALA BENICIO",
    dni: "53.696.469",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "066413-1",
    numero_camiseta: 10,
    telefono: "+54 9 11 2345-6781",
    email: "zabala.benicio@email.com",
    fecha_nacimiento: "2009-01-25",
    altura: 172,
    peso: 65.0,
    velocidad_100m: 12.0,
    partidos: 4,
    goles: 2,
    asistencias: 4,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 360,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante creativo, excelente visión de juego",
  },
  {
    id: 23,
    nombre: "FERNANDEZ BASTIAN",
    dni: "54.414.937",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "058503-2",
    numero_camiseta: 23,
    telefono: "+54 9 11 3456-7892",
    email: "fernandez.bastian@email.com",
    fecha_nacimiento: "2009-06-14",
    altura: 178,
    peso: 72.0,
    velocidad_100m: 12.7,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor central, buen anticipación",
  },
  {
    id: 24,
    nombre: "ORTEGA SANTINO",
    dni: "53.719.367",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "068652-1",
    numero_camiseta: 24,
    telefono: "+54 9 11 4567-8903",
    email: "ortega.santino@email.com",
    fecha_nacimiento: "2009-07-28",
    altura: 170,
    peso: 63.0,
    velocidad_100m: 12.1,
    partidos: 3,
    goles: 0,
    asistencias: 2,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 270,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante rápido, buen desborde",
  },
  {
    id: 25,
    nombre: "RAMON LUCIO",
    dni: "54.270.131",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "70316",
    numero_camiseta: 25,
    telefono: "+54 9 11 5678-9014",
    email: "ramon.lucio@email.com",
    fecha_nacimiento: "2009-08-11",
    altura: 181,
    peso: 75.0,
    velocidad_100m: 11.9,
    partidos: 2,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 180,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero alto, buen juego de espaldas",
  },
  {
    id: 26,
    nombre: "PEÑIALBA MILO",
    dni: "54.210.861",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "080916-1",
    numero_camiseta: 26,
    telefono: "+54 9 11 6789-0125",
    email: "penialba.milo@email.com",
    fecha_nacimiento: "2009-09-25",
    altura: 175,
    peso: 70.0,
    velocidad_100m: 11.8,
    partidos: 3,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 270,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero zurdo, buen remate de media distancia",
  },
  {
    id: 27,
    nombre: "QUINTEROS LAUTARO",
    dni: "53.831.772",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "068447-1",
    numero_camiseta: 27,
    telefono: "+54 9 11 7890-1236",
    email: "quinteros.lautaro@email.com",
    fecha_nacimiento: "2009-10-12",
    altura: 176,
    peso: 71.0,
    velocidad_100m: 12.8,
    partidos: 4,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 360,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor lateral, buen cruce y centros",
  },
  {
    id: 28,
    nombre: "PORCO BENJAMIN",
    dni: "53.676.551",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "073166-1",
    numero_camiseta: 28,
    telefono: "+54 9 11 8901-2347",
    email: "porco.benjamin@email.com",
    fecha_nacimiento: "2009-11-30",
    altura: 173,
    peso: 67.0,
    velocidad_100m: 12.2,
    partidos: 6,
    goles: 0,
    asistencias: 3,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 540,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante zurdo, buen pase largo",
  },
  {
    id: 29,
    nombre: "LEGUIZA PEDRO",
    dni: "54.103.253",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "043272-2",
    numero_camiseta: 29,
    telefono: "+54 9 11 9012-3458",
    email: "leguiza.pedro@email.com",
    fecha_nacimiento: "2009-12-07",
    altura: 183,
    peso: 76.0,
    velocidad_100m: 14.0,
    partidos: 2,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 180,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Arquero suplente, buen juego con los pies",
  },
  {
    id: 30,
    nombre: "OBELAR SIMON",
    dni: "53.762.587",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "094858-2",
    numero_camiseta: 30,
    telefono: "+54 9 11 0123-4569",
    email: "obelar.simon@email.com",
    fecha_nacimiento: "2009-01-15",
    altura: 186,
    peso: 79.0,
    velocidad_100m: 14.1,
    partidos: 3,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 270,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Arquero alto, buen alcance",
  },
  {
    id: 31,
    nombre: "CARLOMANGO DANTE",
    dni: "54.229.124",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "094959-1",
    numero_camiseta: 31,
    telefono: "+54 9 11 1234-5671",
    email: "carlomango.dante@email.com",
    fecha_nacimiento: "2009-02-22",
    altura: 184,
    peso: 77.0,
    velocidad_100m: 14.3,
    partidos: 2,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 180,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Arquero joven, en desarrollo",
  },
  {
    id: 32,
    nombre: "BENTOS JULIAN",
    dni: "53.605.885",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "094949-1",
    numero_camiseta: 32,
    telefono: "+54 9 11 2345-6782",
    email: "bentos.julian@email.com",
    fecha_nacimiento: "2009-03-18",
    altura: 174,
    peso: 68.0,
    velocidad_100m: 12.3,
    partidos: 3,
    goles: 0,
    asistencias: 2,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 270,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante zurdo, buen control de balón",
  },
  {
    id: 33,
    nombre: "VITO CASTILLO LEON",
    dni: "54.040.876",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "AFA/METRO",
    numero_socio: "",
    numero_camiseta: 33,
    telefono: "+54 9 11 3456-7893",
    email: "vito.leon@email.com",
    fecha_nacimiento: "2009-04-26",
    altura: 177,
    peso: 72.0,
    velocidad_100m: 11.7,
    partidos: 4,
    goles: 0,
    asistencias: 2,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 360,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero versátil, puede jugar por las bandas",
  },
  {
    id: 34,
    nombre: "TEVEZ VALENTINO",
    dni: "53.842.006",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "AFA/METRO",
    numero_socio: "",
    numero_camiseta: 34,
    telefono: "+54 9 11 4567-8904",
    email: "tevez.valentino@email.com",
    fecha_nacimiento: "2009-05-13",
    altura: 169,
    peso: 62.0,
    velocidad_100m: 11.9,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante técnico, buen regate",
  },
  {
    id: 35,
    nombre: "CONSTANZO GINO",
    dni: "53.949.515",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "85495",
    numero_camiseta: 35,
    telefono: "+54 9 11 5678-9015",
    email: "constanzo.gino@email.com",
    fecha_nacimiento: "2009-06-29",
    altura: 172,
    peso: 66.0,
    velocidad_100m: 12.1,
    partidos: 2,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 180,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante de marca, buen recuperador",
  },
  {
    id: 36,
    nombre: "YTIEL SANCHEZ",
    dni: "53.948.797",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "094511-1",
    numero_camiseta: 36,
    telefono: "+54 9 11 6789-0126",
    email: "ytiel.sanchez@email.com",
    fecha_nacimiento: "2009-07-16",
    altura: 175,
    peso: 70.0,
    velocidad_100m: 12.9,
    partidos: 2,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 180,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor central, buen juego aéreo",
  },
  {
    id: 37,
    nombre: "MARTINEZ BAUTISTA",
    dni: "54.420.429",
    posicion: "DEFENSOR",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "",
    numero_camiseta: 37,
    telefono: "+54 9 11 7890-1237",
    email: "martinez.bautista@email.com",
    fecha_nacimiento: "2009-08-02",
    altura: 180,
    peso: 74.0,
    velocidad_100m: 13.0,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor alto, buen cabeceo",
  },
  {
    id: 38,
    nombre: "ROMERO MARCOS",
    dni: "54.457.000",
    posicion: "DELANTERO",
    pierna: "DERECHO",
    fichado: "METRO",
    numero_socio: "73723-1",
    numero_camiseta: 38,
    telefono: "+54 9 11 8901-2348",
    email: "romero.marcos@email.com",
    fecha_nacimiento: "2009-09-19",
    altura: 178,
    peso: 73.0,
    velocidad_100m: 11.8,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero promisorio, buen físico",
  },
  {
    id: 39,
    nombre: "MACRI MATIAS",
    dni: "53.682.343",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "085968-1",
    numero_camiseta: 39,
    telefono: "+54 9 11 9012-3459",
    email: "macri.matias@email.com",
    fecha_nacimiento: "2009-10-06",
    altura: 176,
    peso: 71.0,
    velocidad_100m: 12.7,
    partidos: 1,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 90,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor lateral izquierdo, buen cruce",
  },
  {
    id: 40,
    nombre: "MOSQUERA JOAQUIN",
    dni: "54.130.348",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "059417-1",
    numero_camiseta: 40,
    telefono: "+54 9 11 0123-4570",
    email: "mosquera.joaquin@email.com",
    fecha_nacimiento: "2009-11-23",
    altura: 174,
    peso: 69.0,
    velocidad_100m: 11.6,
    partidos: 4,
    goles: 0,
    asistencias: 2,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 360,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero zurdo, buen desborde",
  },
  {
    id: 41,
    nombre: "DIAZ CELESTINO TADEO",
    dni: "53.743.879",
    posicion: "DELANTERO",
    pierna: "IZQUIERDO",
    fichado: "AFA",
    numero_socio: "",
    numero_camiseta: 41,
    telefono: "+54 9 11 1234-5672",
    email: "diaz.tadeo@email.com",
    fecha_nacimiento: "2009-12-10",
    altura: 179,
    peso: 74.0,
    velocidad_100m: 11.7,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Delantero alto, buen remate de cabeza",
  },
  {
    id: 42,
    nombre: "ESTEVEZ NAZARENO",
    dni: "53.788.702",
    posicion: "VOLANTE",
    pierna: "DERECHO",
    fichado: "",
    numero_socio: "",
    numero_camiseta: 42,
    telefono: "+54 9 11 2345-6783",
    email: "estevez.nazareno@email.com",
    fecha_nacimiento: "2009-01-27",
    altura: 171,
    peso: 65.0,
    velocidad_100m: 12.2,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante en evaluación",
  },
  {
    id: 43,
    nombre: "GONZALEZ ROMEO",
    dni: "54.269.115",
    posicion: "DEFENSOR",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "",
    numero_camiseta: 43,
    telefono: "+54 9 11 3456-7894",
    email: "gonzalez.romeo@email.com",
    fecha_nacimiento: "2009-02-14",
    altura: 177,
    peso: 72.0,
    velocidad_100m: 12.8,
    partidos: 4,
    goles: 0,
    asistencias: 1,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 360,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Defensor zurdo, buen pase largo",
  },
  {
    id: 44,
    nombre: "JIMENEZ FRANCESCO",
    dni: "53.832.551",
    posicion: "ARQUERO",
    pierna: "DERECHO",
    fichado: "AFA",
    numero_socio: "057916-2",
    numero_camiseta: 44,
    telefono: "+54 9 11 4567-8905",
    email: "jimenez.francesco@email.com",
    fecha_nacimiento: "2009-03-03",
    altura: 187,
    peso: 80.0,
    velocidad_100m: 14.4,
    partidos: 0,
    goles: 0,
    asistencias: 0,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 0,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Arquero muy alto, buen alcance",
  },
  {
    id: 45,
    nombre: "RODRIGUEZ SCHOEN LEON",
    dni: "54.229.011",
    posicion: "VOLANTE",
    pierna: "IZQUIERDO",
    fichado: "METRO",
    numero_socio: "",
    numero_camiseta: 45,
    telefono: "+54 9 11 5678-9016",
    email: "rodriguez.leon@email.com",
    fecha_nacimiento: "2009-04-20",
    altura: 173,
    peso: 67.0,
    velocidad_100m: 12.0,
    partidos: 4,
    goles: 0,
    asistencias: 3,
    amarillas: 0,
    rojas: 0,
    minutos_totales: 360,
    estado: "Disponible",
    fecha_incorporacion: "2024-01-01",
    observaciones: "Volante zurdo, excelente visión de juego",
  },
]

// Historial de partidos del jugador
const historialPartidos = [
  {
    id: 1,
    fecha: "2024-01-15",
    rival: "Club Atlético Rival",
    resultado: "Victoria 2-1",
    titular: true,
    minutos: 90,
    goles: 0,
    asistencias: 1,
    tarjetas: 0,
    calificacion: 7.5,
  },
  {
    id: 2,
    fecha: "2024-01-22",
    rival: "Deportivo Central",
    resultado: "Empate 1-1",
    titular: true,
    minutos: 85,
    goles: 1,
    asistencias: 0,
    tarjetas: 0,
    calificacion: 8.0,
  },
  {
    id: 3,
    fecha: "2024-01-29",
    rival: "Racing Local",
    resultado: "Victoria 3-0",
    titular: false,
    minutos: 25,
    goles: 0,
    asistencias: 0,
    tarjetas: 0,
    calificacion: 6.5,
  },
]

const getPosicionColor = (posicion: string) => {
  switch (posicion) {
    case "ARQUERO":
      return { backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeaa7" }
    case "DEFENSOR":
      return { backgroundColor: "#d1ecf1", color: "#0c5460", border: "1px solid #bee5eb" }
    case "VOLANTE":
      return { backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" }
    case "DELANTERO":
      return { backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }
    default:
      return { backgroundColor: "#e2e3e5", color: "#383d41", border: "1px solid #d6d8db" }
  }
}

const calcularEdad = (fechaNacimiento: string) => {
  const hoy = new Date()
  const nacimiento = new Date(fechaNacimiento)
  let edad = hoy.getFullYear() - nacimiento.getFullYear()
  const mes = hoy.getMonth() - nacimiento.getMonth()
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--
  }
  return edad
}

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function PerfilJugadorPage() {
  const params = useParams()
  const jugadorId = Number.parseInt(params.id as string)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [datosEditados, setDatosEditados] = useState<any>({})
  const [guardadoExitoso, setGuardadoExitoso] = useState(false)

  // Buscar el jugador por ID
  const jugador = jugadoresCompletos.find((j) => j.id === jugadorId)

  if (!jugador) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Jugador no encontrado</h1>
        <Link href="/jugadores">← Volver a Jugadores</Link>
      </div>
    )
  }

  const iniciarEdicion = () => {
    setDatosEditados({ ...jugador })
    setModoEdicion(true)
  }

  const cancelarEdicion = () => {
    setModoEdicion(false)
    setDatosEditados({})
  }

  const guardarCambios = () => {
    // Aquí guardarías en la base de datos
    console.log("Guardando cambios:", datosEditados)
    setModoEdicion(false)
    setGuardadoExitoso(true)
    setTimeout(() => setGuardadoExitoso(false), 3000)
  }

  const promedio = jugador.partidos > 0 ? (jugador.goles / jugador.partidos).toFixed(1) : "0.0"
  const promedioMinutos = jugador.partidos > 0 ? Math.round(jugador.minutos_totales / jugador.partidos) : 0

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <h1 style={{ fontSize: "32px", color: "#333", margin: "0 0 10px 0" }}>👤 Perfil de {jugador.nombre}</h1>
            <p style={{ color: "#666", margin: 0 }}>Información detallada y estadísticas del jugador</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {!modoEdicion ? (
              <button
                onClick={iniciarEdicion}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                ✏️ Editar
              </button>
            ) : (
              <>
                <button
                  onClick={guardarCambios}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  💾 Guardar
                </button>
                <button
                  onClick={cancelarEdicion}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  ❌ Cancelar
                </button>
              </>
            )}
            <Link
              href="/jugadores"
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                padding: "10px 20px",
                textDecoration: "none",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              ← Volver
            </Link>
          </div>
        </div>
      </div>

      {guardadoExitoso && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #c3e6cb",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          ✅ ¡Cambios guardados exitosamente!
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        {/* Columna Izquierda - Información Personal */}
        <div>
          {/* Foto y Datos Básicos */}
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {/* Foto del jugador */}
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "#f8f9fa",
                border: "3px solid #dee2e6",
                margin: "0 auto 20px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                color: "#6c757d",
              }}
            >
              👤
            </div>

            <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>{jugador.nombre}</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
              <span
                style={{
                  ...getPosicionColor(jugador.posicion),
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {jugador.posicion}
              </span>
              <span
                style={{
                  backgroundColor: "#f8f9fa",
                  color: "#495057",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  border: "1px solid #dee2e6",
                }}
              >
                #{jugador.numero_camiseta}
              </span>
            </div>

            {/* Estadísticas Rápidas */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>{jugador.partidos}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>Partidos</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745" }}>{jugador.goles}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>Goles</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#6f42c1" }}>{jugador.asistencias}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>Asistencias</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ffc107" }}>{jugador.amarillas}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>Tarjetas</div>
              </div>
            </div>
          </div>

          {/* Información Personal */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>📋 Información Personal</h3>
            {!modoEdicion ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", fontSize: "14px" }}>
                <div>
                  <strong>DNI:</strong>
                  <div style={{ color: "#666" }}>{jugador.dni}</div>
                </div>
                <div>
                  <strong>Edad:</strong>
                  <div style={{ color: "#666" }}>{calcularEdad(jugador.fecha_nacimiento)} años</div>
                </div>
                <div>
                  <strong>Fecha Nacimiento:</strong>
                  <div style={{ color: "#666" }}>{formatearFecha(jugador.fecha_nacimiento)}</div>
                </div>
                <div>
                  <strong>Pierna Hábil:</strong>
                  <div style={{ color: "#666" }}>{jugador.pierna}</div>
                </div>
                <div>
                  <strong>Altura:</strong>
                  <div style={{ color: "#666" }}>{jugador.altura} cm</div>
                </div>
                <div>
                  <strong>Peso:</strong>
                  <div style={{ color: "#666" }}>{jugador.peso} kg</div>
                </div>
                <div>
                  <strong>Velocidad 100m:</strong>
                  <div style={{ color: "#666", fontWeight: "bold" }}>{jugador.velocidad_100m}s</div>
                </div>
                <div>
                  <strong>Estado:</strong>
                  <div style={{ color: jugador.estado === "Disponible" ? "#28a745" : "#dc3545" }}>{jugador.estado}</div>
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", fontSize: "14px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Teléfono:</label>
                  <input
                    type="tel"
                    value={datosEditados.telefono || ""}
                    onChange={(e) => setDatosEditados({ ...datosEditados, telefono: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Email:</label>
                  <input
                    type="email"
                    value={datosEditados.email || ""}
                    onChange={(e) => setDatosEditados({ ...datosEditados, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Altura (cm):</label>
                  <input
                    type="number"
                    value={datosEditados.altura || ""}
                    onChange={(e) => setDatosEditados({ ...datosEditados, altura: Number.parseInt(e.target.value) })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Peso (kg):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={datosEditados.peso || ""}
                    onChange={(e) => setDatosEditados({ ...datosEditados, peso: Number.parseFloat(e.target.value) })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                    Velocidad 100m (s):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={datosEditados.velocidad_100m || ""}
                    onChange={(e) =>
                      setDatosEditados({ ...datosEditados, velocidad_100m: Number.parseFloat(e.target.value) })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Estado:</label>
                  <select
                    value={datosEditados.estado || ""}
                    onChange={(e) => setDatosEditados({ ...datosEditados, estado: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Lesionado">Lesionado</option>
                    <option value="Suspendido">Suspendido</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Información de Club */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>🏆 Información de Club</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px", fontSize: "14px" }}>
              <div>
                <strong>Fichado:</strong>
                <div style={{ color: "#666" }}>{jugador.fichado || "No especificado"}</div>
              </div>
              {jugador.numero_socio && (
                <div>
                  <strong>Número de Socio:</strong>
                  <div style={{ color: "#666" }}>{jugador.numero_socio}</div>
                </div>
              )}
              <div>
                <strong>Fecha Incorporación:</strong>
                <div style={{ color: "#666" }}>{formatearFecha(jugador.fecha_incorporacion)}</div>
              </div>
              <div>
                <strong>Teléfono:</strong>
                <div style={{ color: "#666" }}>{jugador.telefono}</div>
              </div>
              <div>
                <strong>Email:</strong>
                <div style={{ color: "#666" }}>{jugador.email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Estadísticas y Rendimiento */}
        <div>
          {/* Estadísticas de Rendimiento */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>📊 Estadísticas de Rendimiento</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
              }}
            >
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#007bff" }}>{promedio}</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Goles por Partido</div>
              </div>
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#28a745" }}>{promedioMinutos}</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Minutos por Partido</div>
              </div>
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#6f42c1" }}>{jugador.minutos_totales}</div>
                <div style={{ fontSize: "14px", color: "#666" }}>Minutos Totales</div>
              </div>
              <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
                <div style={{ fontSize: "28px", fontWeight: "bold", color: "#fd7e14" }}>
                  {jugador.partidos > 0 ? ((jugador.goles + jugador.asistencias) / jugador.partidos).toFixed(1) : "0.0"}
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>Participaciones/Partido</div>
              </div>
            </div>
          </div>

          {/* Historial de Partidos */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ margin: "0 0 20px 0", color: "#333" }}>📅 Últimos Partidos</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {historialPartidos.slice(0, 5).map((partido) => (
                <div
                  key={partido.id}
                  style={{
                    padding: "15px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>vs {partido.rival}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>{formatearFecha(partido.fecha)}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "12px", color: "#666" }}>{partido.resultado}</div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: partido.titular ? "#28a745" : "#6c757d",
                          fontWeight: "bold",
                        }}
                      >
                        {partido.titular ? "Titular" : "Suplente"}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(5, 1fr)",
                      gap: "10px",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold" }}>{partido.minutos}'</div>
                      <div style={{ color: "#666" }}>Min</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#28a745" }}>{partido.goles}</div>
                      <div style={{ color: "#666" }}>Goles</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#6f42c1" }}>{partido.asistencias}</div>
                      <div style={{ color: "#666" }}>Asist</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#ffc107" }}>{partido.tarjetas}</div>
                      <div style={{ color: "#666" }}>Tarj</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold", color: "#007bff" }}>{partido.calificacion}</div>
                      <div style={{ color: "#666" }}>Nota</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observaciones */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>📝 Observaciones</h3>
            {!modoEdicion ? (
              <p style={{ margin: 0, color: "#666", fontSize: "14px", lineHeight: "1.5" }}>
                {jugador.observaciones || "Sin observaciones registradas."}
              </p>
            ) : (
              <textarea
                value={datosEditados.observaciones || ""}
                onChange={(e) => setDatosEditados({ ...datosEditados, observaciones: e.target.value })}
                placeholder="Agregar observaciones sobre el jugador..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontFamily: "Arial, sans-serif",
                  resize: "vertical",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
