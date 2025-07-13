import { useEffect, useState } from 'react'
import { useRole, usePermissions } from '../RoleContext'
import InventoryTable from '../components/InventoryTable'
import AddInventoryModal from '../components/AddInventoryModal'
import EditInventoryModal from '../components/EditInventoryModal'
import { getInventory, addItem, updateItem, deleteItem } from '../supabase/inventory'
import { exportToCsv } from '../utils/export'

export default function InventoryPage() {
  const { role } = useRole()
  const { isKing, canAccessPage } = usePermissions()
  const [items, setItems] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [showLowOnly, setShowLowOnly] = useState(false)

  async function fetchData() {
    try {
      const data = await getInventory()
      setItems(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function handleAdd(data) {
    await addItem(data)
    setShowAdd(false)
    fetchData()
  }

  async function handleEdit(id, data) {
    await updateItem(id, data)
    setEditItem(null)
    fetchData()
  }

  async function handleDelete(item) {
    if (confirm('Delete item?')) {
      await deleteItem(item.id)
      fetchData()
    }
  }

  const displayed = showLowOnly ? items.filter(i => i.low_stock_alert) : items

  return (
    <div className="space-y-4 text-[#FFD700]">
      <h2 className="text-xl font-bold">Inventory</h2>
      <label className="block">
        <input
          type="checkbox"
          checked={showLowOnly}
          onChange={e => setShowLowOnly(e.target.checked)}
          className="mr-1"
        />
        Show Low Stock Only
      </label>

      <h2 className="text-xl font-bold">Inventory Management</h2>
 main
      <InventoryTable
        items={displayed}
        onEdit={item => setEditItem(item)}
        onDelete={handleDelete}
        canDelete={isKing()}
        lowThreshold={5}
      />
      <div className="space-x-2">
        <button className="border border-[#800000] px-2 py-1" onClick={() => setShowAdd(true)}>
          Add Inventory Item
        </button>
        <button className="border border-[#800000] px-2 py-1" onClick={() => exportToCsv('inventory.csv', items)}>
          Export CSV
        </button>
      </div>
      {showAdd && (
        <AddInventoryModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />
      )}
      {editItem && (
        <EditInventoryModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={data => handleEdit(editItem.id, data)}
        />
      )}
    </div>
  )
}
