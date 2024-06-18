import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './features/auth/AuthContext.jsx'
import { NBADataProvider } from './features/NBADataContext.jsx'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <NBADataProvider>
        <ToastContainer />
        <App />
      </NBADataProvider>
    </AuthProvider>
  </React.StrictMode>,
)
