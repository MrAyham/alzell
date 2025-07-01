import { supabase } from '../supabase'

export async function getStaff(filters = {}) {
  let query = supabase.from('staff').select('*').order('created_at', { ascending: false })
  if (filters.shift) query = query.eq('shift', filters.shift)
  if (filters.role) query = query.eq('role', filters.role)
  if (filters.status) query = query.eq('status', filters.status)
  const { data, error } = await query
  if (error) throw error
  return data
}

export async function addStaff(data) {
  const { data: result, error } = await supabase
    .from('staff')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return result
}

export async function updateStaff(id, data) {
  const { data: result, error } = await supabase
    .from('staff')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return result
}

export async function deleteStaff(id) {
  const { error } = await supabase.from('staff').delete().eq('id', id)
  if (error) throw error
}
