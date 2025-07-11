import { createClient } from '@supabase/supabase-js'

// Support multiple environment variable names so the client works locally and
// when deployed (e.g. on Vercel). We check the usual `VITE_`/`NEXT_PUBLIC_`
// prefixed variables first, then fall back to plain names that may be defined
// for Node scripts or other environments.
const supabaseUrl =
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL ||
  (typeof process !== 'undefined' ? (process as any).env.SUPABASE_URL : undefined)

const supabaseAnonKey =
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== 'undefined'
    ? (process as any).env.SUPABASE_KEY
    : undefined)

const globalAny = globalThis as any

export const supabase =
  globalAny.supabase || createClient(supabaseUrl, supabaseAnonKey)

if (!globalAny.supabase) {
  globalAny.supabase = supabase
}
