import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
  children?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-primary text-white font-semibold
    hover:bg-primary-700 active:bg-primary-800
    focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
    shadow-sm hover:shadow-glow-primary
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
  `,
  secondary: `
    bg-surface-elevated text-slate-200 font-semibold
    border border-border hover:border-primary/50 hover:bg-surface hover:text-white
    focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-background
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  ghost: `
    text-slate-300 font-medium
    hover:bg-white/5 hover:text-white
    focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 focus:ring-offset-background
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  danger: `
    bg-red-500/10 text-red-400 font-semibold
    border border-red-500/30
    hover:bg-red-500 hover:text-white hover:border-red-500
    focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-background
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  children,
  className,
  disabled,
  onClick,
  type = 'button',
  ...rest
}) => {
  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      whileTap={isDisabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-inter',
        'outline-none transition-all duration-200 ease-in-out select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      {loading ? (
        <Loader2
          className="animate-spin flex-shrink-0"
          size={size === 'sm' ? 14 : size === 'md' ? 16 : 18}
          aria-hidden="true"
        />
      ) : icon ? (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}

      {children && <span>{children}</span>}

      {!loading && iconRight && (
        <span className="flex-shrink-0" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </motion.button>
  )
}

export default Button
