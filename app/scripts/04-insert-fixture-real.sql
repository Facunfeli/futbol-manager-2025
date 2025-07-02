-- Limpiar partidos existentes
DELETE FROM partidos;

-- Insertar el fixture real basado en la imagen
INSERT INTO partidos (id, fecha, rival, local, resultado_local, resultado_visitante, estado, observaciones) VALUES
-- FECHA 1 - VELEZ (V) - Resultado: 1-1 (Empate)
(1, '2024-03-02', 'VELEZ', 0, 1, 1, 'Jugado', 'Visitante - Empate'),

-- FECHA 2 - QUILMES (L) - Resultado: 1-0 (Derrota)
(2, '2024-03-09', 'QUILMES', 1, 1, 0, 'Jugado', 'Local - Derrota'),

-- FECHA 3 - HURACAN (V) - Resultado: 2-0 (Victoria)
(3, '2024-03-16', 'HURACAN', 0, 2, 0, 'Jugado', 'Visitante - Victoria'),

-- FECHA 4 - VELEZ B (L) - Resultado: 0-1 (Derrota)
(4, '2024-03-23', 'VELEZ B', 1, 0, 1, 'Jugado', 'Local - Derrota'),

-- FECHA 5 - RIVER (V) - Resultado: 0-3 (Derrota)
(5, '2024-03-30', 'RIVER', 0, 0, 3, 'Jugado', 'Visitante - Derrota'),

-- FECHA 6 - TIGRE (L) - Resultado: 2-0 (Victoria)
(6, '2024-04-06', 'TIGRE', 1, 2, 0, 'Jugado', 'Local - Victoria'),

-- FECHA 7 - TEMPERLEY (V) - Programado
(7, '2024-04-13', 'TEMPERLEY', 0, NULL, NULL, 'Programado', 'Visitante'),

-- FECHA 8 - PLATENSE (V) - Programado
(8, '2024-04-20', 'PLATENSE', 0, NULL, NULL, 'Programado', 'Visitante'),

-- FECHA 9 - BOCA (L) - Programado
(9, '2024-04-27', 'BOCA', 1, NULL, NULL, 'Programado', 'Local'),

-- FECHA 10 - BANFIELD (V) - Programado
(10, '2024-05-04', 'BANFIELD', 0, NULL, NULL, 'Programado', 'Visitante'),

-- FECHA 11 - RACING (L) - Programado
(11, '2024-05-11', 'RACING', 1, NULL, NULL, 'Programado', 'Local'),

-- FECHA 12 - INDEPENDIENTE (V) - Programado
(12, '2024-05-18', 'INDEPENDIENTE', 0, NULL, NULL, 'Programado', 'Visitante'),

-- FECHA 13 - SAN LORENZO (L) - Programado
(13, '2024-05-25', 'SAN LORENZO', 1, NULL, NULL, 'Programado', 'Local'),

-- FECHA 14 - GIMNASIA (V) - Programado
(14, '2024-06-01', 'GIMNASIA', 0, NULL, NULL, 'Programado', 'Visitante'),

-- FECHA 15 - ESTUDIANTES (L) - Programado
(15, '2024-06-08', 'ESTUDIANTES', 1, NULL, NULL, 'Programado', 'Local'),

-- FECHA 16 - FERRO (V) - Programado
(16, '2024-06-15', 'FERRO', 0, NULL, NULL, 'Programado', 'Visitante'),

-- FECHA 17 - ARSENAL (L) - Programado
(17, '2024-06-22', 'ARSENAL', 1, NULL, NULL, 'Programado', 'Local'),

-- FECHA 18 - ARGENTINOS JRS (VELEZ B) - Programado
(18, '2024-06-29', 'ARGENTINOS JRS', 0, NULL, NULL, 'Programado', 'Visitante');
