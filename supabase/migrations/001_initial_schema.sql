-- ================================================================
-- USQAY LANDING PAGE — Esquema inicial de base de datos
-- Ejecutar en Supabase SQL Editor:
-- https://app.supabase.com → tu proyecto → SQL Editor
-- ================================================================

-- ── Tabla de visitas ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS visits (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  ip          TEXT,
  country     TEXT,
  city        TEXT,
  region      TEXT,
  isp         TEXT,
  device      TEXT,
  browser     TEXT,
  page        TEXT        DEFAULT '/',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_ip         ON visits (ip);
CREATE INDEX IF NOT EXISTS idx_visits_country    ON visits (country);

-- ── Tabla de leads / formularios ─────────────────────────────
CREATE TABLE IF NOT EXISTS submissions (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre       TEXT        NOT NULL,
  telefono     TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  tipo_negocio TEXT,
  mensaje      TEXT,
  estado       TEXT        DEFAULT 'Nuevo',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_estado     ON submissions (estado);
CREATE INDEX IF NOT EXISTS idx_submissions_email      ON submissions (email);

-- ── Row Level Security ────────────────────────────────────────
-- visits: cualquier visitante puede insertar, solo el admin lee
ALTER TABLE visits     ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Política: visitantes pueden insertar registros
CREATE POLICY "public_insert_visits"
  ON visits FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "public_insert_submissions"
  ON submissions FOR INSERT TO anon WITH CHECK (true);

-- Política: lectura pública para el panel admin (client-side)
-- En producción: restringir con JWT claims de Supabase Auth
CREATE POLICY "public_read_visits"
  ON visits FOR SELECT TO anon USING (true);

CREATE POLICY "public_read_submissions"
  ON submissions FOR SELECT TO anon USING (true);

-- Política: actualizar estado de leads
CREATE POLICY "public_update_submissions_estado"
  ON submissions FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- ── Vista: estadísticas diarias ───────────────────────────────
CREATE OR REPLACE VIEW daily_stats AS
SELECT
  DATE(created_at)          AS day,
  COUNT(*)                  AS total_visits,
  COUNT(DISTINCT ip)        AS unique_ips,
  COUNT(*) FILTER (WHERE device = 'Móvil')       AS mobile_visits,
  COUNT(*) FILTER (WHERE device = 'Escritorio')  AS desktop_visits
FROM visits
GROUP BY DATE(created_at)
ORDER BY day DESC;

-- ── Vista: leads por tipo de negocio ──────────────────────────
CREATE OR REPLACE VIEW leads_by_type AS
SELECT
  COALESCE(tipo_negocio, 'sin_tipo') AS tipo,
  COUNT(*)                           AS total,
  COUNT(*) FILTER (WHERE estado = 'Nuevo')          AS nuevos,
  COUNT(*) FILTER (WHERE estado = 'Contactado')     AS contactados,
  COUNT(*) FILTER (WHERE estado = 'En seguimiento') AS en_seguimiento,
  COUNT(*) FILTER (WHERE estado = 'Cerrado')        AS cerrados
FROM submissions
GROUP BY tipo_negocio
ORDER BY total DESC;
