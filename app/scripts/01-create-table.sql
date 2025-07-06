-- Tabla principal de jugadores
CREATE TABLE IF NOT EXISTS jugadores (
    id SERIAL PRIMARY KEY,
    dni TEXT UNIQUE NOT NULL,
    apellido_nombre TEXT NOT NULL,
    numero_socio TEXT,
    fichado TEXT,
    posicion TEXT NOT NULL,
    pierna_habil TEXT NOT NULL,
    telefono TEXT,
    email TEXT,
    fecha_nacimiento DATE,
    altura INTEGER,
    peso DECIMAL(5,2),
    numero_camiseta INTEGER,
    fecha_incorporacion DATE DEFAULT CURRENT_DATE,
    estado_fisico TEXT DEFAULT 'Disponible',
    observaciones TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de partidos/fixtures
CREATE TABLE IF NOT EXISTS partidos (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    rival TEXT NOT NULL,
    local BOOLEAN DEFAULT true,
    resultado_local INTEGER,
    resultado_visitante INTEGER,
    observaciones TEXT,
    estado TEXT DEFAULT 'Programado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estadísticas por partido
CREATE TABLE IF NOT EXISTS estadisticas_partidos (
    id SERIAL PRIMARY KEY,
    jugador_id INTEGER,
    partido_id INTEGER,
    titular BOOLEAN DEFAULT false,
    minutos_jugados INTEGER DEFAULT 0,
    goles INTEGER DEFAULT 0,
    asistencias INTEGER DEFAULT 0,
    tarjetas_amarillas INTEGER DEFAULT 0,
    tarjetas_rojas INTEGER DEFAULT 0,
    autogoles INTEGER DEFAULT 0,
    penales_convertidos INTEGER DEFAULT 0,
    penales_errados INTEGER DEFAULT 0,
    FOREIGN KEY (jugador_id) REFERENCES jugadores(id),
    FOREIGN KEY (partido_id) REFERENCES partidos(id)
);

-- Tabla de citaciones
CREATE TABLE IF NOT EXISTS citaciones (
    id SERIAL PRIMARY KEY,
    partido_id INTEGER,
    jugador_id INTEGER,
    citado BOOLEAN DEFAULT true,
    confirmado BOOLEAN DEFAULT false,
    motivo_ausencia TEXT,
    fecha_citacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (partido_id) REFERENCES partidos(id),
    FOREIGN KEY (jugador_id) REFERENCES jugadores(id)
);

-- Tabla de formaciones
CREATE TABLE IF NOT EXISTS formaciones (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    esquema TEXT NOT NULL,
    partido_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (partido_id) REFERENCES partidos(id)
);
