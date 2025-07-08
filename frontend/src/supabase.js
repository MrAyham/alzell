import { supabase } from './utils/auth'

export async function logKingAction(action) {
  try {
    await supabase.from('king_activity_log').insert({ action })
  } catch (err) {
    console.error('Failed to log king action', err)
  }
}
