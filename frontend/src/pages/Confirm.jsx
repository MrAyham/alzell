import { useEffect } from 'react'
import { supabase } from '../supabase'

export default function Confirm() {
  useEffect(() => {
    const finish = async () => {
      await supabase.auth.getSession()
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('users').insert([
          { id: user.id, email: user.email }
        ])
      }
      window.location.replace('/')
    }
    finish()
  }, [])
  return <p className='text-white'>🔄 Verifying your account…</p>
}
