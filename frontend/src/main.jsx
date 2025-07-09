import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RoleProvider } from './RoleContext'
import { AuthProvider } from './hooks/useAuth'
import Confirm from './pages/Confirm'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/confirm" element={<Confirm />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>,
)
