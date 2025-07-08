import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RoleProvider } from './RoleContext'
import { AuthProvider } from './hooks/useAuth'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RoleProvider>
        <App />
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>,
)
