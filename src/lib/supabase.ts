import { createClient } from '@supabase/supabase-js'
import type { Database } from '../shared/database'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!url || !anonKey) {
  throw new Error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. See .env.example and README.md.',
  )
}

// Public client. Tokens are never read or stored here — auth state lives in
// Supabase auth cookies and RLS enforces per-user access server-side.
export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})