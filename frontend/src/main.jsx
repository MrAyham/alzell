import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RoleProvider } from './RoleContext'
import { AuthProvider } from './hooks/useAuth'
import Confirm from './pages/Confirm'
import AddUser from './pages/AddUser'
import Unauthorized from './pages/Unauthorized'
import RequireRole from './components/RequireRole'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/add-user" element={
              <RequireRole roles={["King"]}>
                <AddUser />
              </RequireRole>
            } />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>,
)
