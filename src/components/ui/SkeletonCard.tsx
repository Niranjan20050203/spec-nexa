import React from 'react'
import { cn } from '@/utils/cn'

interface SkeletonCardProps {
  className?: string
  compact?: boolean
}

const Shimmer: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={cn(
      'rounded-lg bg-gradient-to-r from-surface via-surface-elevated to-surface animate-pulse',
      className
    )}
    aria-hidden="true"
  />
)

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className, compact = false }) => {
  return (
    <div
      role="status"
      aria-label="Loading laptop card"
      className={cn(
        'bg-surface border border-border rounded-2xl overflow-hidden',
        compact ? 'p-4' : 'p-5',
        className
      )}
    >
      {/* Image placeholder */}
      <Shimmer className={cn('w-full rounded-xl mb-4', compact ? 'h-32' : 'h-44')} />

      {/* Badge row */}
      <div className="flex items-center gap-2 mb-3">
        <Shimmer className="h-5 w-16 rounded-full" />
        <Shimmer className="h-5 w-24 rounded-full" />
      </div>

      {/* Title */}
      <Shimmer className="h-5 w-3/4 mb-2" />
      <Shimmer className="h-4 w-1/2 mb-4" />

      {/* Specs grid */}
      {!compact && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-elevated rounded-xl p-2.5">
              <Shimmer className="h-3 w-12 mb-1.5" />
              <Shimmer className="h-4 w-20" />
            </div>
          ))}
        </div>
      )}

      {/* Score ring + price row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shimmer className="h-10 w-10 rounded-full" />
          <div>
            <Shimmer className="h-3 w-14 mb-1.5" />
            <Shimmer className="h-4 w-10" />
          </div>
        </div>
        <div className="text-right">
          <Shimmer className="h-3 w-10 mb-1.5 ml-auto" />
          <Shimmer className="h-5 w-24" />
        </div>
      </div>

      {/* Button */}
      {!compact && <Shimmer className="h-10 w-full rounded-xl mt-4" />}
    </div>
  )
}

export default SkeletonCard
