import { supabase } from '../supabase'

export async function addShift(data) {
  const { error } = await supabase.from('shifts').insert(data)
  if (error) throw error
}
