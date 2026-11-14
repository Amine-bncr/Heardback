import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from './ThemeContext'
import { cn } from '../lib/utils'

const options = [
  { value: 'light' as const, label: 'Light', icon: Sun },
  { value: 'dark' as const, label: 'Dark', icon: Moon },
  { value: 'system' as const, label: 'System', icon: Monitor },
]

export function ThemeToggle() {
  const { mode, setMode } = useTheme()

  return (
    <div
      role="group"
      aria-label="Theme"
      className="inline-flex rounded-button border border-border bg-card p-0.5"
    >
      {options.map((opt) => {
        const Icon = opt.icon
        const active = mode === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={active}
            aria-label={opt.label}
            onClick={() => setMode(opt.value)}
            className={cn(
              'flex min-h-[36px] min-w-[36px] items-center justify-center rounded-[10px] transition-colors',
              active ? 'bg-action text-text' : 'text-muted hover:text-text',
            )}
          >
            <Icon size={16} aria-hidden="true" />
            <span className="sr-only">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}