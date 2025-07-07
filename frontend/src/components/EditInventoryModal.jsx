import { useState } from 'react'

export default function EditInventoryModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    quantity: item.quantity,
    unit: item.unit
  })

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      ...form,
      quantity: Number(form.quantity)
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-4 space-y-2 border-2 border-[#800000] text-[#FFD700]">
        <h2 className="text-lg font-bold">Edit Item</h2>
        <div>Name: {item.item_name}</div>
        <input
          name="quantity"
          type="number"
          className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          name="unit"
          className="border border-[#800000] bg-black text-[#FFD700] p-1 w-full"
          placeholder="Unit"
          value={form.unit}
          onChange={handleChange}
        />
        <div className="space-x-2 text-right">
          <button type="submit" className="border border-[#800000] px-2 py-1">Save</button>
          <button type="button" className="border border-[#800000] px-2 py-1" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
