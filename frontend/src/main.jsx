import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes'
import { RoleProvider } from './RoleContext'
import { AuthProvider } from './hooks/useAuth'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>,
)
