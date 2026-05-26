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

// ── Stats helpers ──────────────────────────────────────────────
export async function fetchDailyStats() {
  if (!supabase) return [];
  const { data } = await supabase
    .from('daily_stats')
    .select('*')
    .limit(7);
  return data ?? [];
}
