-- Crear un partido de ejemplo
INSERT INTO partidos (fecha, rival, local, estado) VALUES
('2024-01-15', 'Club Rival', 1, 'Jugado');

-- Insertar estadísticas basadas en tu tabla (usando el partido_id = 1)
INSERT INTO estadisticas_partidos (jugador_id, partido_id, titular, minutos_jugados, goles, tarjetas_amarillas, tarjetas_rojas) 
SELECT 
    j.id,
    1 as partido_id,
    1 as titular,
    90 as minutos_jugados,
    CASE 
        WHEN j.apellido_nombre = 'CATALAN FRANCO' THEN 1
        WHEN j.apellido_nombre = 'SOSA CIRO' THEN 1
        WHEN j.apellido_nombre = 'ZABALA BENICIO' THEN 2
        ELSE 0
    END as goles,
    CASE 
        WHEN j.apellido_nombre = 'AMARILLO MARTIN' THEN 1
        ELSE 0
    END as tarjetas_amarillas,
    0 as tarjetas_rojas
FROM jugadores j
WHERE j.apellido_nombre IN (
    'AMARILLO MARTIN', 'ALVAREZ LORENZO', 'BREY FEDERICO', 'BENITEZ BENJAMIN',
    'CABALLERO THIAGO', 'LOZANO LORENZO', 'DORADO MATEO', 'CATALAN FRANCO',
    'OCHOA ALEJO', 'TORRES THIAGO', 'ZACHOZY BASTIAN', 'SOSA CIRO',
    'CABRAL MAXIMO', 'ZABALA BENICIO', 'FERNANDEZ BASTIAN', 'ORTEGA SANTINO',
    'RAMON LUCIO', 'PEÑIALBA MILO', 'QUINTEROS LAUTARO', 'PORCO BENJAMIN',
    'LEGUIZA PEDRO', 'OBELAR SIMON', 'CARLOMANGO DANTE', 'BENTOS JULIAN',
    'VITO CASTILLO LEON', 'CONSTANZO GINO', 'YTIEL SANCHEZ', 'MARTINEZ BAUTISTA',
    'MACRI MATIAS', 'MOSQUERA JOAQUIN', 'GONZALEZ ROMEO', 'RODRIGUEZ SCHOEN LEON'
);
