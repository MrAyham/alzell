import { useEffect, useState } from 'react'
import { getTopSellers } from '../supabase/upsell'

export default function AIAssistant() {
  const [top, setTop] = useState([])

  useEffect(() => {
    fetchTop()
  }, [])

  async function fetchTop() {
    try {
      const data = await getTopSellers()
      setTop(data)
    } catch (err) {
      console.error('Failed to fetch data', err)
    }
  }

  return (
    <div className='space-y-4 text-[#FFD700]'>
      <h2 className='text-xl font-bold'>Weekly Analysis</h2>
      <p className='text-sm'>Most sold meals this week:</p>
      <ul className='list-disc pl-6'>
        {top.map(t => (
          <li key={t.item}>{t.item} – {t.count}</li>
        ))}
      </ul>
      <div className='border border-[#800000] p-4'>
        Future AI suggestions will appear here.
      </div>
    </div>
  )
}
