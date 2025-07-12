import { useState } from 'react'
import Home from './pages/Home'
import DailyReports from './pages/DailyReports'
import Alerts from './pages/Alerts'
import KingDashboard from './pages/KingDashboard'
import DailyTasks from './pages/DailyTasks'
import InventoryPage from './pages/inventory/InventoryPage'
import StaffPage from './pages/StaffPage'
import ShiftScheduler from './pages/ShiftScheduler'
import Shifts from './pages/Shifts'
import UpsellCenter from './pages/UpsellCenter'
import Offers from './pages/Offers'
import OrdersPage from './pages/OrdersPage'
import NotificationsPage from './pages/NotificationsPage'
import AIAssistant from './pages/AIAssistant'
import KingControlCenter from './pages/KingControlCenter'
import ConfigSettings from './pages/ConfigSettings'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { useRole } from './RoleContext'
import { useAuth } from './hooks/useAuth'

function App() {
  const { role } = useRole()
  const { user } = useAuth()
  const [page, setPage] = useState('home')

  if (!user?.confirmed_at) {
    return <p className='text-white'>Please verify your email to access the app.</p>
  }

  let content
  if (page === 'king') {
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
  } else if (page === 'upsell') {
    content = <UpsellCenter />
  } else if (page === 'offers') {
    content = <Offers />
  } else if (page === 'orders') {
    content = <OrdersPage />
  } else if (page === 'notifications') {
    content = <NotificationsPage />
  } else if (page === 'ai') {
    content = <AIAssistant />
  } else if (page === 'king-control') {
    content = <KingControlCenter />
  } else if (page === 'config') {
    content = <ConfigSettings />
  } else {
    content = <Home onViewReports={() => setPage('dailyReports')} />
  }

  return (
    <div className='p-6 min-h-screen flex'>
      <Sidebar onNavigate={setPage} />
      <div className='flex-1'>
        <Navbar />
        {content}
      </div>
    </div>
  )
}

export default App
