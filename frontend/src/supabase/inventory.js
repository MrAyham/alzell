import { supabase } from '../supabase'

export async function getInventory() {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('low_stock_alert', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addItem(item) {
  const { error } = await supabase.from('inventory').insert(item)
  if (error) throw error
}

export async function updateItem(id, data) {
  const { error } = await supabase.from('inventory').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteItem(id) {
  const { error } = await supabase.from('inventory').delete().eq('id', id)
  if (error) throw error
}
