import { useEffect, useState } from 'react'
import { useRole } from '../../RoleContext'
import { useAuth } from '../../hooks/useAuth'
import { getInventory } from '../../supabase/inventory'

interface InventoryItem {
  id: number
  item_name: string
  quantity: number
  unit: string
  low_stock_alert: boolean
  created_at: string
}

export default function InventoryPage() {
  const { role } = useRole()
  const { user } = useAuth()
  if (user === null) return <p className="text-white">Loading...</p>
  const [items, setItems] = useState<InventoryItem[]>([])
  const [search, setSearch] = useState('')
  const [lowOnly, setLowOnly] = useState(false)
  const [sortAsc, setSortAsc] = useState(true)

  async function fetchData() {
    try {
      const data = await getInventory()
      setItems(data as InventoryItem[])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const filtered = items
    .filter((i) => i.item_name.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => !lowOnly || i.low_stock_alert)
    .sort((a, b) =>
      sortAsc ? a.quantity - b.quantity : b.quantity - a.quantity
    )

  return (
    <div className="space-y-4 text-[#FFD700]">
      <h2 className="text-xl font-bold">Inventory</h2>
      <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 space-y-2 sm:space-y-0">
        <input
          type="text"
          className="bg-black border border-[#800000] p-1"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={lowOnly}
            onChange={(e) => setLowOnly(e.target.checked)}
          />
          <span>Low Stock Only</span>
        </label>
        <select
          value={sortAsc ? 'asc' : 'desc'}
          onChange={(e) => setSortAsc(e.target.value === 'asc')}
          className="bg-black border border-[#800000] p-1"
        >
          <option value="asc">Qty Asc</option>
          <option value="desc">Qty Desc</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border-2 border-[#800000] bg-gray-900 p-4 rounded"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{item.item_name}</h3>
              {item.low_stock_alert && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">
                  Low
                </span>
              )}
            </div>
            <div className="text-2xl font-semibold">
              {item.quantity} <span className="text-base font-normal">{item.unit}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Added {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
