import { useEffect, useState } from 'react'
import { getUpsellItems, addOrderItem, getTopSellers, getLatestNote } from '../supabase/upsell'

export default function UpsellCenter() {
  const [items, setItems] = useState([])
  const [top, setTop] = useState([])
  const [note, setNote] = useState(null)

  useEffect(() => {
    fetchItems()
    fetchTop()
    fetchNote()
  }, [])

  async function fetchItems() {
    try {
      const data = await getUpsellItems()
      setItems(data)
    } catch (err) {
      console.error('Failed to fetch upsell items', err)
    }
  }

  async function fetchTop() {
    try {
      const data = await getTopSellers()
      setTop(data)
    } catch (err) {
      console.error('Failed to fetch top sellers', err)
    }
  }

  async function fetchNote() {
    try {
      const data = await getLatestNote()
      setNote(data)
    } catch (err) {
      console.error('Failed to fetch note', err)
    }
  }

  async function handleAdd(item) {
    try {
      await addOrderItem(item.id)
    } catch (err) {
      console.error('Failed to add to order', err)
    }
  }

  return (
    <div className='space-y-6 text-[#FFD700]'>
      <h2 className='text-xl font-bold'>Upsell Center</h2>

      <section>
        <h3 className='text-lg font-semibold mb-2'>Today\'s Offers</h3>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {items.map(item => (
            <div key={item.id} className='border border-[#800000] p-2'>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className='w-full h-32 object-cover mb-2' />
              )}
              <div className='font-bold'>{item.title} - ${item.price}</div>
              <p className='text-sm mb-2'>{item.description}</p>
              <button className='border border-[#800000] px-2 py-1' onClick={() => handleAdd(item)}>
                Add to Order
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className='text-lg font-semibold mb-2'>Top Sellers</h3>
        <ul className='list-disc pl-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
          {top.map(t => (
            <li key={t.item} className='border border-[#800000] p-2 flex justify-between'>
              <span>{t.item}</span>
              <span>{t.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className='text-lg font-semibold mb-2'>Admin Picks</h3>
        {note && <div className='border border-[#800000] p-3'>{note.note}</div>}
      </section>
    </div>
  )
}
