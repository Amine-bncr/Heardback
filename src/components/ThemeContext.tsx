import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  mode: ThemeMode
  resolved: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'hearback-theme'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

function systemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)
  const [resolved, setResolved] = useState<'light' | 'dark'>('light')

  function apply(next: ThemeMode) {
    setMode(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }

  useEffect(() => {
    const next = mode === 'system' ? systemTheme() : mode
    setResolved(next)
    const root = document.documentElement
    root.setAttribute('data-theme', next)
    root.style.colorScheme = next
  }, [mode])

  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setResolved(e.matches ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light'
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolved, setMode: apply }),
    [mode, resolved],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext)
  if (!value) throw new Error('useTheme must be used within a ThemeProvider')
  return value
}