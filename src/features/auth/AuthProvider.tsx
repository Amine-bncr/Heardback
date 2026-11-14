import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '../../lib/supabase'
import type { Profile } from '../../shared/database'

interface AuthContextValue {
  user: { id: string; email?: string | null } | null
  profile: Profile | null
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextValue['user']>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadProfile(userId: string): Promise<Profile | null> {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    if (profileError) {
      setError(profileError.message)
      return null
    }
    return data
  }

  useEffect(() => {
    let active = true
    ;(async () => {
      const { data, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) setError(sessionError.message)
      const u = data?.session?.user ?? null
      if (!active) return
      setUser(u ? { id: u.id, email: u.email } : null)
      if (u) {
        const p = await loadProfile(u.id)
        if (active) setProfile(p)
      }
      setLoading(false)
    })()

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return
      const u = session?.user ?? null
      setUser(u ? { id: u.id, email: u.email } : null)
      if (u) {
        const p = await loadProfile(u.id)
        setProfile(p)
      } else {
        setProfile(null)
      }
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, error, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used within an AuthProvider')
  return value
}