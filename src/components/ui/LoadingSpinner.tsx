import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  label?: string
  fullPage?: boolean
}

const sizeMap = {
  sm: { outer: 20, inner: 14, stroke: 2, text: 'text-xs' },
  md: { outer: 32, inner: 22, stroke: 2.5, text: 'text-sm' },
  lg: { outer: 48, inner: 34, stroke: 3, text: 'text-base' },
  xl: { outer: 64, inner: 46, stroke: 3.5, text: 'text-lg' },
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label,
  fullPage = false,
}) => {
  const { outer, inner, stroke, text } = sizeMap[size]
  const r = outer / 2
  const circumference = 2 * Math.PI * (r - stroke / 2)

  const spinner = (
    <div
      role="status"
      aria-label={label ?? 'Loading…'}
      className={cn('flex flex-col items-center justify-center gap-3', className)}
    >
      <div className="relative" style={{ width: outer, height: outer }}>
        {/* Track ring */}
        <svg
          width={outer}
          height={outer}
          viewBox={`0 0 ${outer} ${outer}`}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <circle
            cx={r}
            cy={r}
            r={r - stroke / 2}
            fill="none"
            stroke="rgba(38,52,73,0.8)"
            strokeWidth={stroke}
          />
        </svg>

        {/* Spinning arc */}
        <motion.svg
          width={outer}
          height={outer}
          viewBox={`0 0 ${outer} ${outer}`}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <circle
            cx={r}
            cy={r}
            r={r - stroke / 2}
            fill="none"
            stroke="url(#spinner-gradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.72}
          />
          <defs>
            <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Inner glow dot */}
        <div
          className="absolute rounded-full bg-gradient-to-br from-primary to-secondary opacity-80"
          style={{
            width: inner * 0.18,
            height: inner * 0.18,
            top: stroke / 2,
            left: r - (inner * 0.09),
          }}
        />
      </div>

      {label && (
        <p className={cn('text-slate-400 font-inter animate-pulse', text)}>{label}</p>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default LoadingSpinner
