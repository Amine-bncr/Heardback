import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LayoutDashboard, FileText, Settings, LogOut } from 'lucide-react'
import { BRAND } from '../shared/brand'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '../features/auth/AuthProvider'
import { cn } from '../lib/utils'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/applications', label: 'Applications', icon: FileText },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <LogoMark />
            <span className="font-display text-lg font-semibold tracking-tight">{BRAND.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => {
              const active = location.pathname === item.to
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex items-center gap-2 rounded-button px-3 py-2 text-sm font-medium transition-colors',
                    active ? 'text-text' : 'text-muted hover:text-text',
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Sign out"
              onClick={() => void signOut()}
              className="hidden min-h-[44px] items-center gap-2 rounded-button px-3 text-sm text-muted hover:text-text sm:inline-flex"
            >
              <LogOut size={18} aria-hidden="true" />
              Sign out
            </button>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-button text-muted hover:text-text sm:hidden"
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="border-t border-border px-4 pb-3 sm:hidden">
            {nav.map((item) => {
              const active = location.pathname === item.to
              const Icon = item.icon
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-button px-2 py-3 text-sm',
                    active ? 'text-text' : 'text-muted',
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>

      <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted">
        <p>{BRAND.privacyPromise}</p>
      </footer>
    </div>
  )
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <rect x="8" y="20" width="104" height="80" rx="12" ry="12" stroke="currentColor" stroke-width="5" fill="none" />
      <path d="M8 24 L60 64 L112 24" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <circle cx="100" cy="18" r="11" fill="#F28C38" />
    </svg>
  )
}