import { useState } from 'react'
import { addOffer } from '../supabase/offers'

export default function AddOfferModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    discount_percent: 0,
    valid_from: '',
    valid_to: '',
    is_active: true
  })

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await addOffer({
      ...form,
      discount_percent: Number(form.discount_percent)
    })
    onAdd()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-4 space-y-2 border-2 border-[#800000] text-[#FFD700]">
        <h2 className="text-lg font-bold">Add Offer</h2>
        <input
          name="title"
          className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="discount_percent"
          type="number"
          className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
          placeholder="Discount %"
          value={form.discount_percent}
          onChange={handleChange}
        />
        <input
          type="date"
          name="valid_from"
          className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
          value={form.valid_from}
          onChange={handleChange}
        />
        <input
          type="date"
          name="valid_to"
          className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
          value={form.valid_to}
          onChange={handleChange}
        />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
          <span>Active</span>
        </label>
        <div className="space-x-2">
          <button type="submit" className="border border-[#800000] px-2 py-1">Save</button>
          <button type="button" className="border border-[#800000] px-2 py-1" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
