import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'
import type { ApplicationStatus } from '../shared/database'

// Status is conveyed by icon + text label as well as colour. Never colour alone.
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-badge px-2.5 py-1 text-xs font-medium',
  {
    variants: {
      status: {
        Pending: 'bg-status-pending/15 text-status-pending',
        Assessment: 'bg-status-assessment/15 text-status-assessment',
        Interview: 'bg-status-interview/15 text-status-interview',
        Offer: 'bg-status-offer/15 text-status-offer',
        Accepted: 'bg-status-accepted/15 text-status-accepted',
        Rejected: 'bg-status-rejected/15 text-status-rejected',
        Withdrawn: 'bg-status-withdrawn/15 text-status-withdrawn',
      },
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  status?: ApplicationStatus
}

export function Badge({ status, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ status: status as never, className }))}
      {...props}
    >
      {children}
    </span>
  )
}