import { useEffect, useState } from 'react'
import { logKingAction } from './supabase'
import Home from './pages/Home'
import Reports from './pages/Reports'
import KingDashboard from './pages/KingDashboard'

function App() {
  const [isKing, setIsKing] = useState(() => {
    return localStorage.getItem('isKing') === 'true'
  })
  const [showModal, setShowModal] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [page, setPage] = useState('home')

  useEffect(() => {
    localStorage.setItem('isKing', isKing)
  }, [isKing])

  return (
    <div className='p-6 min-h-screen relative'>
      {isKing ? (
        <>
          <button
            className='absolute top-2 right-2 border border-yellow-400 px-2 py-1 text-yellow-400'
            onClick={() => {
              setIsKing(false)
              logKingAction('deactivate king mode')
            }}
          >
            Exit Royal Mode
          </button>
          <KingDashboard />
        </>
      ) : (
        <>
          {page === 'home' ? (
            <Home onViewReports={() => setPage('reports')} />
          ) : (
            <Reports onBack={() => setPage('home')} />
          )}
          <button
            className='fixed bottom-4 right-4 text-sm text-gray-400 underline'
            onClick={() => setShowModal(true)}
          >
            King Login
          </button>
        </>
      )}

      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded text-black space-y-2'>
            <input
              type='password'
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              className='border p-2 w-64'
              placeholder='Enter king password'
            />
            <div className='text-right space-x-2'>
              <button
                className='px-3 py-1 border'
                onClick={() => {
                  setShowModal(false)
                  setPasswordInput('')
                }}
              >
                Cancel
              </button>
              <button
                className='px-3 py-1 border bg-black text-white'
                onClick={() => {
                  if (passwordInput === import.meta.env.VITE_KING_PASSWORD) {
                    setIsKing(true)
                    logKingAction('king mode activated')
                  }
                  setShowModal(false)
                  setPasswordInput('')
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
