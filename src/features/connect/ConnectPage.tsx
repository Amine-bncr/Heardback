import { Shield, Eye, Lock, CheckCircle2 } from 'lucide-react'
import { BRAND } from '../../shared/brand'
import { Button } from '../../components/Button'
import { useAuth } from '../auth/AuthProvider'
import { signInWithGoogle, signInWithMicrosoft } from '../auth/auth'

// M2 will replace the consent stub with the real "Connect inbox" flow.
export function ConnectPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-action" />
      </div>
    )
  }

  if (user) {
    return (
      <div className="mx-auto max-w-2xl py-12 text-center">
        <CheckCircle2 size={40} className="mx-auto mb-4 text-status-offer" aria-hidden="true" />
        <h1 className="font-display text-2xl font-semibold">You're signed in</h1>
        <p className="mt-2 text-muted">Head to the dashboard to see your applications.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl py-12">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {BRAND.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Hearback reads your inbox and turns every job application into a live
          tracker — so you always know where you stand.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          {
            icon: Lock,
            title: 'Read-only access',
            body: 'We only read. We never send, delete, label or change a single email.',
          },
          {
            icon: Eye,
            title: 'You see everything',
            body: 'Every status change is visible in your tracker, and you can correct any of them.',
          },
          {
            icon: Shield,
            title: 'Your data stays yours',
            body: 'Tokens are encrypted at rest. Delete everything with one click at any time.',
          },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-card border border-border bg-card p-5">
            <Icon size={22} className="text-action" aria-hidden="true" />
            <h2 className="mt-3 font-display text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-border bg-card p-6">
        <p className="text-sm font-medium text-text">{BRAND.privacyPromise}</p>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-muted">
          <li>Sign in with Google or Microsoft — identity only, no inbox access yet.</li>
          <li>Review the consent screen, then connect your inbox (read-only).</li>
          <li>Backfill runs, and your tracker starts filling up on its own.</li>
        </ol>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={() => void signInWithGoogle()}>
          Continue with Google
        </Button>
        <Button size="lg" variant="secondary" onClick={() => void signInWithMicrosoft()}>
          Continue with Microsoft
        </Button>
      </div>
    </div>
  )
}