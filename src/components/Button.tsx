import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-button font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-orange text-[#14213D] hover:opacity-90 dark:bg-orange dark:text-[#0D1526]',
        secondary: 'bg-card text-text border border-border hover:bg-border/40',
        ghost: 'text-muted hover:text-text hover:bg-card',
        danger: 'text-status-rejected hover:bg-status-rejected/10',
      },
      size: {
        sm: 'min-h-[36px] px-3 text-sm',
        md: 'min-h-[44px] px-4 text-sm',
        lg: 'min-h-[48px] px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}