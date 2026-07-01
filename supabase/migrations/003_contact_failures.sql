-- ================================================================
-- USQAY — Registro de incidencias en intentos de contacto fallidos
-- Ejecutar en Supabase SQL Editor
-- ================================================================

CREATE TABLE IF NOT EXISTS contact_failures (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  fecha         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  nombre        TEXT,
  email         TEXT,
  telefono      TEXT,
  tipo_negocio  TEXT,
  tipo_error    TEXT        NOT NULL,   -- 'servidor' | 'red' | 'supabase' | 'desconocido'
  detalle       TEXT,                   -- mensaje de error o descripción
  status_code   INTEGER,               -- HTTP status (ej. 422, 500)
  user_agent    TEXT,
  url_origen    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_failures_created_at  ON contact_failures (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_failures_tipo_error  ON contact_failures (tipo_error);
CREATE INDEX IF NOT EXISTS idx_failures_email       ON contact_failures (email);

-- RLS
ALTER TABLE contact_failures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_failures"
  ON contact_failures FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_read_failures"
  ON contact_failures FOR SELECT TO anon USING (true);

CREATE POLICY "anon_delete_failures"
  ON contact_failures FOR DELETE TO anon USING (true);
