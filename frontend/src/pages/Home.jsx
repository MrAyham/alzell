import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRole } from '../RoleContext'

export default function Home({ onViewReports }) {
  const { role } = useRole()
  const [staff, setStaff] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    shift: '',
    status: ''
  })

  async function fetchStaff() {
    const { data } = await supabase.from('staff').select()
    setStaff(data || [])
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  async function addStaff(e) {
    e.preventDefault()
    await supabase.from('staff').insert(formData)
    setFormData({ name: '', role: '', shift: '', status: '' })
    setShowForm(false)
    fetchStaff()
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-bold'>Staff</h2>
      <table className='w-full text-left border'>
        <thead>
          <tr className='border-b'>
            <th className='p-2'>Name</th>
            <th className='p-2'>Role</th>
            <th className='p-2'>Shift</th>
            <th className='p-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(s => (
            <tr key={s.id} className='border-b'>
              <td className='p-2'>{s.name}</td>
              <td className='p-2'>{s.role}</td>
              <td className='p-2'>{s.shift}</td>
              <td className='p-2'>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {role !== 'Worker' && (
        showForm ? (
          <form onSubmit={addStaff} className='space-y-2'>
          <input
            className='border p-1 w-full text-black'
            placeholder='Name'
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className='border p-1 w-full text-black'
            placeholder='Role'
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
          />
          <input
            className='border p-1 w-full text-black'
            placeholder='Shift'
            value={formData.shift}
            onChange={e => setFormData({ ...formData, shift: e.target.value })}
          />
          <input
            className='border p-1 w-full text-black'
            placeholder='Status'
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
          />
          <div className='space-x-2'>
            <button type='submit' className='border px-2 py-1'>Save</button>
            <button type='button' className='border px-2 py-1' onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className='border px-2 py-1' onClick={() => setShowForm(true)}>
          Add Staff
        </button>
      ))}
      <button className='border px-2 py-1' onClick={onViewReports}>
        View Daily Reports
      </button>
    </div>
  )
}
