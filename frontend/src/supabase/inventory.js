import { supabase } from '../supabase'

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
 codex/build-inventory-management-page
    low_stock_alert: item.quantity < 5

    low_stock_alert: item.quantity < LOW_STOCK_THRESHOLD
 main
  }
  const { error } = await supabase.from('inventory').insert(record)
  if (error) throw error
}

export async function updateItem(id, data) {
  const record = {
    ...data,
 codex/build-inventory-management-page
    low_stock_alert: data.quantity < 5

    low_stock_alert: data.quantity < LOW_STOCK_THRESHOLD
 main
  }
  const { error } = await supabase.from('inventory').update(record).eq('id', id)
  if (error) throw error
}

export async function deleteItem(id) {
  const { error } = await supabase.from('inventory').delete().eq('id', id)
  if (error) throw error
}
