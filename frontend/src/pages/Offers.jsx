import { useEffect, useState } from 'react'
import { getOffers, updateOffer } from '../supabase/offers'
import AddOfferModal from '../components/AddOfferModal'

export default function Offers() {
  const [offers, setOffers] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [filter, setFilter] = useState('all')

  async function fetchData() {
    try {
      const filters = {}
      if (filter === 'active') filters.is_active = true
      if (filter === 'inactive') filters.is_active = false
      const data = await getOffers(filters)
      setOffers(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter])

  async function toggleActive(offer) {
    await updateOffer(offer.id, { is_active: !offer.is_active })
    fetchData()
  }

  return (
    <div className="space-y-4 text-[#FFD700]">
      <h2 className="text-xl font-bold">Offers</h2>
      <div className="space-x-2">
        <select
          className="border border-[#800000] bg-black text-[#FFD700] p-1"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="border border-[#800000] px-2 py-1" onClick={() => setShowAdd(true)}>
          Add New Offer
        </button>
      </div>
      <table className="w-full text-left border border-[#800000]">
        <thead>
          <tr className="border-b border-[#800000]">
            <th className="p-2">Title</th>
            <th className="p-2">Discount %</th>
            <th className="p-2">Valid</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map(o => {
            const now = new Date()
            const validTo = o.valid_to ? new Date(o.valid_to) : null
            const active = o.is_active && (!validTo || validTo >= now)
            return (
              <tr key={o.id} className="border-b border-[#800000]">
                <td className="p-2">{o.title}</td>
                <td className="p-2">{o.discount_percent || 0}%</td>
                <td className="p-2">
                  {o.valid_from || '?'} → {o.valid_to || '?'}
                </td>
                <td className="p-2">{active ? 'Active' : 'Expired'}</td>
                <td className="p-2">
                  <button className="border border-[#800000] px-1" onClick={() => toggleActive(o)}>
                    {o.is_active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {showAdd && <AddOfferModal onClose={() => { setShowAdd(false) }} onAdd={() => { setShowAdd(false); fetchData() }} />}
    </div>
  )
}
