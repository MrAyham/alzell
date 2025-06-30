import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import './index.css'

function App() {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    async function fetchMenu() {
      const { data } = await supabase.from('menu_items').select()
      setMenu(data || [])
    }
    fetchMenu()
  }, [])

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center text-red-700'>Welcome to ChefMind 👨‍🍳</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
