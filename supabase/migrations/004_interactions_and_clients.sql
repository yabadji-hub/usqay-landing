-- ================================================================
-- USQAY — Bitácora de interacciones y tabla de clientes
-- ================================================================

-- ── Bitácora de interacciones con leads ───────────────────────
CREATE TABLE IF NOT EXISTS interactions (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_email  TEXT        NOT NULL,
  submission_id     UUID,
  tipo              TEXT        NOT NULL,  -- 'llamada' | 'email' | 'whatsapp' | 'reunion' | 'nota'
  resultado         TEXT,                  -- 'exitoso' | 'sin_respuesta' | 'rechazado' | 'reprogramar'
  notas             TEXT,
  fecha_interaccion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  creado_por        TEXT        DEFAULT 'admin',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_interactions_email      ON interactions (submission_email);
CREATE INDEX IF NOT EXISTS idx_interactions_created_at ON interactions (created_at DESC);

ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_interactions" ON interactions FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_interactions" ON interactions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_delete_interactions" ON interactions FOR DELETE TO anon USING (true);

-- ── Clientes convertidos ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS clients (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre            TEXT        NOT NULL,
  email             TEXT        NOT NULL UNIQUE,
  telefono          TEXT,
  tipo_negocio      TEXT,
  plan_contratado   TEXT,
  fecha_conversion  TIMESTAMPTZ DEFAULT NOW(),
  notas_conversion  TEXT,
  origen_lead_id    UUID,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clients_email      ON clients (email);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients (created_at DESC);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_select_clients" ON clients FOR SELECT TO anon USING (true);
CREATE POLICY "anon_insert_clients" ON clients FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_clients" ON clients FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_clients" ON clients FOR DELETE TO anon USING (true);
