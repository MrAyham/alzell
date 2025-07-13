import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  (typeof process !== 'undefined' ? (process as any).env.SUPABASE_URL : undefined)
const serviceKey =
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  (typeof process !== 'undefined' ? (process as any).env.SUPABASE_SERVICE_ROLE_KEY : undefined)

export const supabaseAdmin = createClient(supabaseUrl, serviceKey)
