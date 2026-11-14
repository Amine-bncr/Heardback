import { ThemeToggle } from '../../components/ThemeToggle'
import { useAuth } from '../auth/AuthProvider'

// M2 replaces the "no accounts" state with the real connect/disconnect UI.
export function SettingsPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-muted">Manage your account and preferences.</p>

      <section className="mt-6 rounded-card border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Account</h2>
        <p className="mt-1 text-sm text-muted">
          Signed in as {user?.email ?? 'unknown user'}.
        </p>
        <button
          type="button"
          onClick={() => void signOut()}
          className="mt-3 min-h-[44px] rounded-button border border-border px-4 text-sm text-status-rejected hover:bg-status-rejected/10"
        >
          Sign out
        </button>
      </section>

      <section className="mt-6 rounded-card border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Inbox connections</h2>
        <p className="mt-1 text-sm text-muted">
          M2 builds the connect/disconnect flow here. No inbox is connected yet.
        </p>
      </section>

      <section className="mt-6 rounded-card border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Appearance</h2>
        <div className="mt-3">
          <ThemeToggle />
        </div>
      </section>

      <section className="mt-6 rounded-card border border-border bg-card p-5">
        <h2 className="font-display text-lg font-semibold">Delete all my data</h2>
        <p className="mt-1 text-sm text-muted">
          M2 wires this up to a full hard delete: revoke provider access, remove all
          rows and cancel the subscription cleanly.
        </p>
        <button
          type="button"
          disabled
          className="mt-3 min-h-[44px] cursor-not-allowed rounded-button border border-border px-4 text-sm text-muted opacity-60"
        >
          Delete all my data
        </button>
      </section>
    </div>
  )
}