import { useState } from 'react'
import Home from './pages/Home'
import Reports from './pages/Reports'
import Alerts from './pages/Alerts'
import KingDashboard from './pages/KingDashboard'
import DailyTasks from './pages/DailyTasks'
import InventoryPage from './pages/InventoryPage'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useRole } from './RoleContext'

function App() {
  const { role } = useRole()
  const [page, setPage] = useState('home')

  let content
  if (role === 'King' && page === 'king') {
    content = <KingDashboard />
  } else if (page === 'reports') {
    content = <Reports onBack={() => setPage('home')} />
  } else if (page === 'inventory') {
    content = <InventoryPage />
 codex/build-smart-alerts-system-in-chefmind
  } else if (page === 'alerts') {
    content = <Alerts />
=======
  } else if (page === 'tasks') {
    content = <DailyTasks />
 main
  } else {
    content = <Home onViewReports={() => setPage('reports')} />
  }

  return (
    <div className='p-6 min-h-screen flex'>
      <Sidebar onNavigate={setPage} />
      <div className='flex-1'>
        <Header />
        {content}
      </div>
    </div>
  )
}

export default App
