import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function AddUser() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    name: '',
    role: 'Chef',
    password: ''
  })

  const roles = ['Chef', 'Cashier']

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })
    if (authError) {
      alert(authError.message)
      return
    }
    await supabase.from('staff').insert({
      email: form.email,
      name: form.name,
      role: form.role,
      id: authData.user?.id
    })
    navigate(-1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-[#FFD700]">
      <form onSubmit={handleSubmit} className="space-y-2 bg-[#0f0f0f] p-4 rounded">
        <h2 className="text-lg">Add User</h2>
        <input
          className="border p-1 text-black w-64"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="border p-1 text-black w-64"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-1 text-black w-64"
        >
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input
          className="border p-1 text-black w-64"
          placeholder="Temp Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
        />
        <div className="flex space-x-2">
          <button type="submit" className="border px-2 py-1">Save</button>
          <button type="button" className="border px-2 py-1" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
