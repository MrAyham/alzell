import { supabase } from '../lib/supabase'

const LOW_STOCK_THRESHOLD = 5

export async function getInventory() {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('quantity', { ascending: true })
  if (error) throw error
  return data || []
}

export async function addItem(item) {
  const record = {
    ...item,
    low_stock_alert: item.quantity < LOW_STOCK_THRESHOLD
  }
  const { error } = await supabase.from('inventory').insert(record)
  if (error) throw error
}

export async function updateItem(id, data) {
  const record = {
    ...data,
    low_stock_alert: data.quantity < LOW_STOCK_THRESHOLD
  }
  const { error } = await supabase.from('inventory').update(record).eq('id', id)
  if (error) throw error
}

export async function deleteItem(id) {
  const { error } = await supabase.from('inventory').delete().eq('id', id)
  if (error) throw error
}
