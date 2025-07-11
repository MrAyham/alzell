import { supabase } from '../lib/supabase'

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addOrder(data) {
  const { error } = await supabase.from('orders').insert(data)
  if (error) throw error
}

export async function updateOrder(id, data) {
  const { error } = await supabase.from('orders').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteOrder(id) {
  const { error } = await supabase.from('orders').delete().eq('id', id)
  if (error) throw error
}
