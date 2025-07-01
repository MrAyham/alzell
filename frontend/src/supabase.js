import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function logKingAction(action) {
  try {
    await supabase.from('king_activity_log').insert({ action })
  } catch (err) {
    console.error('Failed to log king action', err)
  }
}
