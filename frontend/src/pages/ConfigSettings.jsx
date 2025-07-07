import { useState } from 'react'
import { supabase } from '../supabase'

export default function ConfigSettings() {
  const [apiUrl, setApiUrl] = useState('')
  const [apiKey, setApiKey] = useState('')

  async function backup() {
    try {
      const { data: staff } = await supabase.from('staff').select('*')
      const { data: inventory } = await supabase.from('inventory').select('*')
      const { data: orders } = await supabase.from('orders').select('*')
      const json = JSON.stringify({ staff, inventory, orders }, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'backup.json'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to backup', err)
    }
  }

  return (
    <div className='space-y-4 text-[#FFD700]'>
      <h2 className='text-xl font-bold'>Config Settings</h2>
      <div className='space-y-2'>
        <input
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          placeholder='Supabase URL'
          value={apiUrl}
          onChange={e => setApiUrl(e.target.value)}
        />
        <input
          className='border border-[#800000] bg-black text-[#FFD700] p-1 w-full'
          placeholder='Supabase Key'
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
        />
      </div>
      <button className='border border-[#800000] px-2 py-1' onClick={backup}>Download Backup</button>
    </div>
  )
}
