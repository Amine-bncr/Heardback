import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

// Supabase handles the OAuth exchange in the URL hash; this page just waits
// for the session to settle, then sends the user back to the dashboard.
export function CallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    ;(async () => {
      // Allow Supabase to parse the callback URL.
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        if (active) void navigate('/dashboard', { replace: true })
        return
      }
      // Poll briefly in case the session lands a tick later.
      const start = Date.now()
      while (Date.now() - start < 5000) {
        const r = await supabase.auth.getSession()
        if (r.data.session) {
          if (active) void navigate('/dashboard', { replace: true })
          return
        }
        await new Promise((r) => setTimeout(r, 250))
      }
      if (active) void navigate('/connect', { replace: true })
    })()
    return () => {
      active = false
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-text-muted">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-[#2F5D9B]" />
        <p className="text-sm">Finishing sign-in…</p>
      </div>
    </div>
  )
}