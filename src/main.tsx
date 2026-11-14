import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { ThemeProvider } from './components/ThemeContext'
import { AuthProvider } from './features/auth/AuthProvider'
import { Layout } from './components/Layout'
import { ConnectPage } from './features/connect/ConnectPage'
import { CallbackPage } from './features/auth/CallbackPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { SettingsPage } from './features/settings/SettingsPage'

const router = createHashRouter([
  {
    path: '/',
    element: <ConnectPage />,
  },
  {
    path: '/auth/callback',
    element: <CallbackPage />,
  },
  {
    path: '/dashboard',
    element: <Layout><DashboardPage /></Layout>,
  },
  {
    path: '/applications',
    element: <Layout><DashboardPage /></Layout>,
  },
  {
    path: '/settings',
    element: <Layout><SettingsPage /></Layout>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)