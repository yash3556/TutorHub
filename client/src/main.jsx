import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from "react-router-dom";
import './styles/global.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
