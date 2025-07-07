import { supabase } from '../supabase'

export async function getUpsellItems() {
  const { data, error } = await supabase
    .from('upsell_items')
    .select('id, title, description, price, image_url')
    .eq('available', true)
  if (error) throw error
  return data || []
}

export async function addOrderItem(itemId) {
  const { error } = await supabase.from('orders').insert({ item_id: itemId })
  if (error) throw error
}

export async function getTopSellers() {
  const { data, error } = await supabase.from('orders').select('item_name')
  if (error) throw error
  const counts = {}
  for (const row of data || []) {
    counts[row.item_name] = (counts[row.item_name] || 0) + 1
  }
  return Object.entries(counts)
    .map(([item, count]) => ({ item, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getLatestNote() {
  const { data, error } = await supabase
    .from('daily_notes')
    .select('note')
    .order('date', { ascending: false })
    .limit(1)
    .single()
  if (error) throw error
  return data
}
