-- Verificar que los datos se insertaron correctamente
SELECT 'Jugadores' as tabla, COUNT(*) as cantidad FROM jugadores
UNION ALL
SELECT 'Partidos' as tabla, COUNT(*) as cantidad FROM partidos
UNION ALL
SELECT 'Estadísticas' as tabla, COUNT(*) as cantidad FROM estadisticas_partidos
UNION ALL
SELECT 'Citaciones' as tabla, COUNT(*) as cantidad FROM citaciones
UNION ALL
SELECT 'Formaciones' as tabla, COUNT(*) as cantidad FROM formaciones;

-- Ver algunos jugadores
SELECT id, apellido_nombre, posicion, numero_camiseta FROM jugadores LIMIT 10;

-- Ver algunos partidos
SELECT id, fecha, rival, local, resultado_local, resultado_visitante, estado FROM partidos LIMIT 10;

-- Ver estadísticas del primer partido
SELECT 
    j.apellido_nombre,
    j.posicion,
    ep.titular,
    ep.minutos_jugados,
    ep.goles,
    ep.asistencias,
    ep.tarjetas_amarillas
FROM estadisticas_partidos ep
JOIN jugadores j ON ep.jugador_id = j.id
WHERE ep.partido_id = 1
ORDER BY ep.titular DESC, j.posicion;
