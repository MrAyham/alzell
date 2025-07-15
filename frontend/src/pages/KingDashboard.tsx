import React, { useEffect, useState } from 'react'
import { useRole, usePermissions } from '../RoleContext'
import RequireRole from '../components/RequireRole'
import { getStaff, updateStaff, deleteStaff } from '../supabase/staff'
import { useNavigate } from 'react-router-dom'

function KingDashboardContent() {
  const { role } = useRole()
  const { isKing } = usePermissions()
  const navigate = useNavigate()
  const [staff, setStaff] = useState<any[]>([])

  useEffect(() => { if (isKing()) load() }, [])

  async function load() {
    const data = await getStaff()
    setStaff(data || [])
  }

  async function changeRole(id: string, newRole: string) {
    await updateStaff(id, { role: newRole })
    load()
  }

  async function remove(id: string) {
    if (!confirm('Delete this user?')) return
    await deleteStaff(id)
    load()
  }

  if (!isKing()) {
    return <div>You do not have access to this page.</div>
  }

  return (
    <div className="min-h-screen bg-black p-6 text-[#FFD700] space-y-4">
      <h1 className="text-lg font-semibold">لوحة تحكم الملك</h1>
      <button
        className="border-2 border-[#800000] px-3 py-1"
        onClick={() => navigate('/add-user')}
      >
        إضافة مستخدم جديد
      </button>
      <table className="w-full text-left border border-[#800000]">
        <thead>
          <tr className="border-b border-[#800000]">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id} className="border-b border-[#800000]">
              <td className="p-2">{s.name}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2">
                <select
                  value={s.role}
                  onChange={e => changeRole(s.id, e.target.value)}
                  className="bg-black border border-[#800000] p-1"
                >
                  <option value="Chef">Chef</option>
                  <option value="Cashier">Cashier</option>
                  <option value="King">King</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  className="border px-2"
                  onClick={() => remove(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function KingDashboard() {
  return (
    <RequireRole roles={["King"]}>
      <KingDashboardContent />
    </RequireRole>
  )
}
