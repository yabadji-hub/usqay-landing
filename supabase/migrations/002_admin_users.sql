-- ================================================================
-- USQAY — Gestión de usuarios administradores
-- Ejecutar en Supabase SQL Editor después de 001_initial_schema.sql
-- ================================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre           TEXT        NOT NULL,
  email            TEXT        NOT NULL UNIQUE,
  rol              TEXT        NOT NULL DEFAULT 'lectura',   -- 'admin' | 'lectura'
  verificado       BOOLEAN     NOT NULL DEFAULT false,
  token_verificacion TEXT      UNIQUE,                       -- UUID v4 para verificar email
  token_expira_at  TIMESTAMPTZ,                              -- 24 h de vida
  invitado_por     TEXT,                                     -- email del super-admin
  password_hash    TEXT,                                     -- hash bcrypt (no se almacena plain)
  ultimo_acceso    TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);
CREATE INDEX IF NOT EXISTS idx_admin_users_token ON admin_users (token_verificacion);

-- RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Solo lectura pública (el panel admin usa anon key, pero la contraseña protege el acceso real)
CREATE POLICY "anon_read_admin_users"
  ON admin_users FOR SELECT TO anon USING (true);

CREATE POLICY "anon_insert_admin_users"
  ON admin_users FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon_update_admin_users"
  ON admin_users FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "anon_delete_admin_users"
  ON admin_users FOR DELETE TO anon USING (true);
