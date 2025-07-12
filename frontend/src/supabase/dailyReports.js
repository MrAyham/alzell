import { supabase } from '../lib/supabase'

export async function getReports() {
  const { data, error } = await supabase
    .from('daily_reports')
    .select('id, date, shift, notes, issues, created_at, staff_id, staff(name)')
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function addReport(report) {
  const { data: existing, error: existError } = await supabase
    .from('daily_reports')
    .select('id')
    .eq('date', report.date)
    .eq('shift', report.shift)
    .maybeSingle()
  if (existError) throw existError
  if (existing) throw new Error('Report already exists for this shift and date')

  const { error } = await supabase.from('daily_reports').insert(report)
  if (error) throw error
}

export async function updateReport(id, data) {
  const { error } = await supabase.from('daily_reports').update(data).eq('id', id)
  if (error) throw error
}

export async function deleteReport(id) {
  const { error } = await supabase.from('daily_reports').delete().eq('id', id)
  if (error) throw error
}
