import { useState } from 'react'
import Home from './pages/Home'
import DailyReports from './pages/DailyReports'
import Alerts from './pages/Alerts'
import KingDashboard from './pages/KingDashboard'
import DailyTasks from './pages/DailyTasks'
import InventoryPage from './pages/InventoryPage'
import StaffPage from './pages/StaffPage'
import ShiftScheduler from './pages/ShiftScheduler'
import Shifts from './pages/Shifts'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useRole } from './RoleContext'

function App() {
  const { role } = useRole()
  const [page, setPage] = useState('home')

  let content
  if (role === 'King' && page === 'king') {
    content = <KingDashboard />
  } else if (page === 'dailyReports') {
    content = <DailyReports onBack={() => setPage('home')} />
  } else if (page === 'inventory') {
    content = <InventoryPage />
  } else if (page === 'alerts') {
    content = <Alerts />
  } else if (page === 'tasks') {
    content = <DailyTasks />
  } else if (page === 'staff') {
    content = <StaffPage />
  } else if (page === 'shifts') {
    content = <Shifts />
  } else if (page === 'schedule') {
    content = <ShiftScheduler />
  } else {
    content = <Home onViewReports={() => setPage('dailyReports')} />
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
