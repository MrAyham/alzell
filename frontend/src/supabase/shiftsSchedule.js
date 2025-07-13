import { supabase } from '../supabase'

export async function getSchedule() {
  const { data, error } = await supabase
    .from('shifts_schedule')
    .select('id, day, shift, staff_id, staff(name)')
  if (error) throw error
  return data || []
}

export async function addSchedule(item) {
  const { error } = await supabase.from('shifts_schedule').insert(item)
  if (error) throw error
}

export async function updateSchedule(id, data) {
  const { error } = await supabase
    .from('shifts_schedule')
    .update(data)
    .eq('id', id)
  if (error) throw error
}

export async function deleteSchedule(id) {
  const { error } = await supabase.from('shifts_schedule').delete().eq('id', id)
  if (error) throw error
}
