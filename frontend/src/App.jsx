import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function Auth({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) {
      onLogin()
    } else {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-4 space-y-2">
      <input
        className="text-black p-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="text-black p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-white text-black px-4 py-2" type="submit">Login</button>
    </form>
  )
}

function DataTable({ table }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({})

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from(table).select('*').order('created_at')
      setItems(data)
      setLoading(false)
    }
    load()
  }, [table])

  const addItem = async (e) => {
    e.preventDefault()
    await supabase.from(table).insert(form)
    const { data } = await supabase.from(table).select('*').order('created_at')
    setItems(data)
    setForm({})
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4">
      <form onSubmit={addItem} className="space-x-2 mb-4">
        {Object.keys(items[0] || {}).filter(k => k !== 'id').map(key => (
          <input
            key={key}
            className="text-black p-1"
            placeholder={key}
            value={form[key] || ''}
            onChange={e => setForm({...form, [key]: e.target.value})}
          />
        ))}
        <button className="bg-white text-black px-2" type="submit">Add</button>
      </form>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            {Object.keys(items[0] || {}).map(key => (
              <th key={key} className="border px-2 py-1">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              {Object.keys(it).map(k => (
                <td key={k} className="border px-2 py-1">{it[k]?.toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const tables = [
  { name: 'Menu', table: 'menu_items' },
  { name: 'Staff', table: 'staff' },
  { name: 'Inventory', table: 'inventory' },
  { name: 'Reports', table: 'daily_reports' },
]

function App() {
  const [session, setSession] = useState(null)
  const [tab, setTab] = useState(tables[0])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!session) {
    return <Auth onLogin={() => {}} />
  }

  return (
    <div>
      <nav className="flex space-x-4 p-4 bg-gray-800">
        {tables.map(t => (
          <button key={t.table} onClick={() => setTab(t)} className={tab.table === t.table ? 'underline' : ''}>
            {t.name}
          </button>
        ))}
      </nav>
      <DataTable table={tab.table} />
    </div>
  )
}

export default App
