import { Link } from 'react-router-dom'
import { LayoutDashboard, FileText, FolderOpen, TrendingUp } from 'lucide-react'
import { Button } from '../../components/Button'
import { Badge } from '../../components/Badge'

// M4 replaces this stub with the real stat strip, latest-replies feed and list.
export function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted">Your applications at a glance.</p>
        </div>
        <Link to="/applications">
          <Button variant="secondary">View all</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Waiting', value: '—', icon: LayoutDashboard },
          { label: 'In progress', value: '—', icon: TrendingUp },
          { label: 'Offers', value: '—', icon: FolderOpen },
          { label: 'Rejected', value: '—', icon: FileText },
        ].map(({ label, value, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className="rounded-card border border-border bg-card p-4 text-left transition-colors hover:border-action"
          >
            <Icon size={18} className="text-muted" aria-hidden="true" />
            <p className="mt-2 font-display text-xl font-semibold">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-card border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold">Latest replies</h2>
        <p className="mt-1 text-sm text-muted">
          M4 wires this feed to Supabase Realtime. For now it is a placeholder.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge status="Offer">Offer</Badge>
          <Badge status="Interview">Interview</Badge>
          <Badge status="Assessment">Assessment</Badge>
          <Badge status="Pending">Pending</Badge>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-muted">
        <p>No applications yet? Connect your inbox to get started.</p>
      </div>
    </div>
  )
}