import { supabase } from '../lib/supabase'
import { supabaseAdmin } from '../lib/supabaseAdmin'

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

export async function createStaffAccount(data) {
  const { email, password, name, role, shift, status } = data
  const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })
  if (userError) throw userError

  const uid = userData.user.id
  const { error } = await supabase.from('staff').insert({
    uid,
    email,
    name,
    role,
    shift,
    status
  })
  if (error) throw error
  return userData
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
