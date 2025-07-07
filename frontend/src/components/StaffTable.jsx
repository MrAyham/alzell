import { useEffect, useState, Fragment } from 'react'
import { getStaff, deleteStaff } from '../supabase/staff'
import AddStaffModal from './AddStaffModal'
import EditStaffModal from './EditStaffModal'
import { useRole } from '../RoleContext'

export default function StaffTable() {
  const { role } = useRole()
  const [staff, setStaff] = useState([])
  const [filters, setFilters] = useState({ status: '' })
  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const roleIcons = { Chef: '🍳', Cashier: '💰', Server: '🍽️' }

  useEffect(() => {
    fetchStaff()
  }, [filters])

  async function fetchStaff() {
    const data = await getStaff(filters)
    setStaff(data || [])
  }

  async function handleDelete(id) {
    if (!confirm('Delete this staff member?')) return
    await deleteStaff(id)
    fetchStaff()
  }

  const statuses = Array.from(new Set(staff.map(s => s.status).filter(Boolean)))

  const grouped = staff.reduce((acc, m) => {
    const sh = m.shift || 'Unassigned'
    if (!acc[sh]) acc[sh] = []
    acc[sh].push(m)
    return acc
  }, {})
  const shiftNames = Object.keys(grouped).sort()

  return (
    <div className="space-y-2">
      <div className="space-x-2">
        <select
          className="border border-[#800000] bg-black text-[#FFD700] p-1"
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          className="border border-[#800000] px-2 py-1"
          onClick={() => setShowAdd(true)}
        >
          Add Staff
        </button>
      </div>
      <table className="w-full text-left border border-[#800000]">
        <thead>
          <tr className="border-b border-[#800000]">
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Shift</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shiftNames.map(shift => (
            <Fragment key={shift}>
              <tr className="bg-gray-700">
                <td colSpan="6" className="p-2 font-bold">{shift}</td>
              </tr>
              {grouped[shift].map(s => (
                <tr key={s.id} className="border-b border-[#800000]">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2 flex items-center space-x-1">
                    <span>{roleIcons[s.role] || '👤'}</span>
                    <span>{s.role}</span>
                  </td>
                  <td className="p-2">{s.shift}</td>
                  <td className="p-2">{s.status}</td>
                  <td className="p-2">{new Date(s.created_at).toLocaleString()}</td>
                  <td className="p-2 space-x-1">
                    <button
                      className="border border-[#800000] px-1"
                      onClick={() => setEditItem(s)}
                    >
                      Edit
                    </button>
                    {role === 'King' && (
                      <button
                        className="border border-[#800000] px-1"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
      <AddStaffModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onAdded={fetchStaff}
      />
      <EditStaffModal
        isOpen={!!editItem}
        staff={editItem}
        onClose={() => setEditItem(null)}
        onUpdated={fetchStaff}
      />
    </div>
  )
}
