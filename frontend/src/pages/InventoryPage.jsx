import { useEffect, useState } from 'react'
import { useRole } from '../RoleContext'
import InventoryTable from '../components/InventoryTable'
import AddInventoryModal from '../components/AddInventoryModal'
import EditInventoryModal from '../components/EditInventoryModal'
import { getInventory, addItem, updateItem, deleteItem } from '../supabase/inventory'

export default function InventoryPage() {
  const { role } = useRole()
  const [items, setItems] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] = useState(null)

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

  return (
    <div className="space-y-4 text-[#FFD700]">
      <h2 className="text-xl font-bold">Inventory Management</h2>
      <InventoryTable
        items={items}
        onEdit={item => setEditItem(item)}
        onDelete={handleDelete}
        canDelete={role === 'King'}
        lowThreshold={5}
      />
      <button className="border border-[#800000] px-2 py-1" onClick={() => setShowAdd(true)}>
        Add Inventory Item
      </button>
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
