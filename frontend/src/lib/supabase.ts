import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ?? import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey =
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  import.meta.env.VITE_SUPABASE_ANON_KEY

const globalAny = globalThis as any

export const supabase =
  globalAny.supabase || createClient(supabaseUrl, supabaseAnonKey)

if (!globalAny.supabase) {
  globalAny.supabase = supabase
}
