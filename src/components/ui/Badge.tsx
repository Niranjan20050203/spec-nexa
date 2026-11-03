import React from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'primary' | 'neutral'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  pill?: boolean
}

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-green-500/15 text-green-400 border border-green-500/25',
  warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  error: 'bg-red-500/15 text-red-400 border border-red-500/25',
  info: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
  primary: 'bg-primary/15 text-primary-400 border border-primary/25',
  neutral: 'bg-surface-elevated text-slate-400 border border-border',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className,
  pill = false,
}) => {
  return (
    <span
      className={cn(
        'badge inline-flex items-center font-medium',
        variantClasses[variant],
        sizeClasses[size],
        pill ? 'rounded-full' : 'rounded-lg',
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}

export default Badge
