import { supabase } from '../supabase'

export async function getOffers(filters = {}) {
  let query = supabase.from('offers').select('*').order('created_at', { ascending: false })
  if (filters.is_active !== undefined) query = query.eq('is_active', filters.is_active)
  if (filters.date) {
    query = query.lte('valid_from', filters.date).gte('valid_to', filters.date)
  }
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function addOffer(data) {
  const { error } = await supabase.from('offers').insert(data)
  if (error) throw error
}

export async function updateOffer(id, data) {
  const { error } = await supabase.from('offers').update(data).eq('id', id)
  if (error) throw error
}
