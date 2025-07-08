import { useState } from 'react'

export default function AddInventoryModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    item_name: '',
    quantity: 0,
    unit: ''
  })

  function handleChange(e) {
    const value = e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAdd({
      ...form,
      quantity: Number(form.quantity),
      low_stock_alert: Number(form.quantity) < 5
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="card-royal space-y-2">
        <h2 className="text-lg font-bold text-gold">Add Item</h2>
        <input
          name="item_name"
          className="border border-gold bg-dark text-gold p-1 w-full"
          placeholder="Name"
          value={form.item_name}
          onChange={handleChange}
        />
        <input
          name="quantity"
          type="number"
          className="border border-gold bg-dark text-gold p-1 w-full"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          name="unit"
          className="border border-gold bg-dark text-gold p-1 w-full"
          placeholder="Unit"
          value={form.unit}
          onChange={handleChange}
        />
        <div className="space-x-2 text-right">
          <button type="submit" className="btn-royal">Save</button>
          <button type="button" className="btn-royal" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
