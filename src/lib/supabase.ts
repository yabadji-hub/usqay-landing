import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL  ?? '';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ── Types ──────────────────────────────────────────────────────
export interface Visit {
  id?:        string;
  ip:         string;
  country:    string;
  city:       string;
  region:     string;
  isp:        string;
  device:     string;
  browser:    string;
  page:       string;
  created_at?: string;
}

export interface Submission {
  id?:          string;
  nombre:       string;
  telefono:     string;
  email:        string;
  tipo_negocio: string;
  mensaje:      string;
  estado:       string;
  created_at?:  string;
}

// ── Visit helpers ──────────────────────────────────────────────
export async function insertVisit(visit: Omit<Visit, 'id' | 'created_at'>): Promise<void> {
  if (!supabase) return;
  await supabase.from('visits').insert([visit]);
}

export async function fetchVisits(limit = 500): Promise<Visit[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('visits')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('fetchVisits:', error.message); return []; }
  return data ?? [];
}

export async function fetchVisitsToday(): Promise<Visit[]> {
  if (!supabase) return [];
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { data, error } = await supabase
    .from('visits')
    .select('*')
    .gte('created_at', todayStart.toISOString())
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchVisitsToday:', error.message); return []; }
  return data ?? [];
}

// ── Submission helpers ─────────────────────────────────────────
export async function insertSubmission(sub: Omit<Submission, 'id' | 'created_at'>): Promise<void> {
  if (!supabase) return;
  await supabase.from('submissions').insert([sub]);
}

export async function fetchSubmissions(): Promise<Submission[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchSubmissions:', error.message); return []; }
  return data ?? [];
}

export async function updateSubmissionStatus(id: string, estado: string): Promise<void> {
  if (!supabase) return;
  await supabase.from('submissions').update({ estado }).eq('id', id);
}

export async function deleteSubmission(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('submissions').delete().eq('id', id);
  return { error: error?.message ?? null };
}

// ── Clear helpers ──────────────────────────────────────────────
export async function clearVisits(): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('visits').delete().gte('created_at', '2000-01-01T00:00:00Z');
  return { error: error?.message ?? null };
}

export async function clearSubmissions(): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('submissions').delete().gte('created_at', '2000-01-01T00:00:00Z');
  return { error: error?.message ?? null };
}

// ── Interactions (bitácora) helpers ───────────────────────────
export interface Interaction {
  id?:                string;
  submission_email:   string;
  submission_id?:     string;
  tipo:               'llamada' | 'email' | 'whatsapp' | 'reunion' | 'nota';
  resultado?:         'exitoso' | 'sin_respuesta' | 'rechazado' | 'reprogramar' | '';
  notas?:             string;
  fecha_interaccion?: string;
  creado_por?:        string;
  created_at?:        string;
}

export async function fetchInteractions(email: string): Promise<Interaction[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('interactions')
    .select('*')
    .eq('submission_email', email)
    .order('fecha_interaccion', { ascending: false });
  if (error) { console.error('fetchInteractions:', error.message); return []; }
  return data ?? [];
}

export async function insertInteraction(interaction: Omit<Interaction, 'id' | 'created_at'>): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('interactions').insert([interaction]);
  return { error: error?.message ?? null };
}

export async function deleteInteraction(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('interactions').delete().eq('id', id);
  return { error: error?.message ?? null };
}

// ── Clients helpers ────────────────────────────────────────────
export interface Client {
  id?:               string;
  nombre:            string;
  email:             string;
  telefono?:         string;
  tipo_negocio?:     string;
  plan_contratado?:  string;
  fecha_conversion?: string;
  notas_conversion?: string;
  origen_lead_id?:   string;
  created_at?:       string;
}

export async function fetchClients(): Promise<Client[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('fecha_conversion', { ascending: false });
  if (error) { console.error('fetchClients:', error.message); return []; }
  return data ?? [];
}

export async function convertLeadToClient(client: Omit<Client, 'id' | 'created_at'>): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('clients').upsert([client], { onConflict: 'email' });
  return { error: error?.message ?? null };
}

export async function deleteClient(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('clients').delete().eq('id', id);
  return { error: error?.message ?? null };
}

// ── Contact failure helpers ────────────────────────────────────
export interface ContactFailure {
  id?:           string;
  fecha?:        string;
  nombre?:       string;
  email?:        string;
  telefono?:     string;
  tipo_negocio?: string;
  tipo_error:    'servidor' | 'red' | 'supabase' | 'desconocido';
  detalle?:      string;
  status_code?:  number;
  user_agent?:   string;
  url_origen?:   string;
  created_at?:   string;
}

export async function insertFailure(failure: Omit<ContactFailure, 'id' | 'created_at'>): Promise<void> {
  // Siempre guardar en localStorage como respaldo
  try {
    const local: ContactFailure[] = JSON.parse(localStorage.getItem('usqay_failures') ?? '[]');
    local.push({ ...failure, fecha: failure.fecha ?? new Date().toISOString() });
    // Conservar máximo 200 registros locales
    if (local.length > 200) local.splice(0, local.length - 200);
    localStorage.setItem('usqay_failures', JSON.stringify(local));
  } catch { /* ignore */ }

  if (!supabase) return;
  await supabase.from('contact_failures').insert([{
    ...failure,
    fecha: failure.fecha ?? new Date().toISOString(),
  }]);
}

export async function fetchFailures(limit = 200): Promise<ContactFailure[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('contact_failures')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) { console.error('fetchFailures:', error.message); return []; }
  return data ?? [];
}

export async function clearFailures(): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase
    .from('contact_failures')
    .delete()
    .gte('created_at', '2000-01-01T00:00:00Z');
  return { error: error?.message ?? null };
}

// ── Admin users helpers ────────────────────────────────────────
export interface AdminUser {
  id?:                  string;
  nombre:               string;
  email:                string;
  rol:                  'admin' | 'lectura';
  verificado:           boolean;
  token_verificacion?:  string;
  token_expira_at?:     string;
  invitado_por?:        string;
  ultimo_acceso?:       string;
  created_at?:          string;
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, nombre, email, rol, verificado, invitado_por, ultimo_acceso, created_at')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchAdminUsers:', error.message); return []; }
  return data ?? [];
}

export async function createAdminUser(user: Omit<AdminUser, 'id' | 'created_at'>): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('admin_users').insert([user]);
  return { error: error?.message ?? null };
}

export async function verifyAdminUserToken(token: string): Promise<{ user: AdminUser | null; error: string | null }> {
  if (!supabase) return { user: null, error: 'Supabase no configurado' };
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('token_verificacion', token)
    .single();
  if (error || !data) return { user: null, error: 'Token inválido o expirado' };
  if (data.verificado) return { user: data, error: null };
  const expira = data.token_expira_at ? new Date(data.token_expira_at) : null;
  if (expira && expira < new Date()) return { user: null, error: 'El enlace de verificación ha expirado' };
  // Marcar como verificado
  await supabase.from('admin_users')
    .update({ verificado: true, token_verificacion: null, token_expira_at: null })
    .eq('id', data.id);
  return { user: data, error: null };
}

export async function deleteAdminUser(id: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('admin_users').delete().eq('id', id);
  return { error: error?.message ?? null };
}

// ── Stats helpers ──────────────────────────────────────────────
export async function fetchDailyStats() {
  if (!supabase) return [];
  const { data } = await supabase
    .from('daily_stats')
    .select('*')
    .limit(7);
  return data ?? [];
}
