-- Verificar partidos insertados
SELECT 
    id,
    fecha,
    rival,
    CASE WHEN local = true THEN 'LOCAL' ELSE 'VISITANTE' END as ubicacion,
    CASE 
        WHEN resultado_local IS NOT NULL THEN CONCAT(resultado_local, '-', resultado_visitante)
        ELSE 'Sin resultado'
    END as resultado,
    estado
FROM partidos 
ORDER BY fecha;

-- Contar partidos por estado
SELECT 
    estado,
    COUNT(*) as cantidad
FROM partidos 
GROUP BY estado;
