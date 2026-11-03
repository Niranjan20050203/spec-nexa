import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ScoreRingProps {
  score: number // 0-100
  size?: number // px, default 56
  strokeWidth?: number
  label?: string
  showLabel?: boolean
  animate?: boolean
  className?: string
}

const getColor = (score: number): { stroke: string; glow: string } => {
  if (score >= 80) return { stroke: '#22C55E', glow: 'rgba(34,197,94,0.25)' }
  if (score >= 60) return { stroke: '#F59E0B', glow: 'rgba(245,158,11,0.25)' }
  return { stroke: '#EF4444', glow: 'rgba(239,68,68,0.25)' }
}

const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 56,
  strokeWidth = 4,
  label,
  showLabel = true,
  animate = true,
  className,
}) => {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)))
  const { stroke, glow } = getColor(clampedScore)

  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (clampedScore / 100) * circumference

  const fontSize = size < 48 ? size * 0.28 : size * 0.25
  const labelFontSize = size < 48 ? size * 0.18 : size * 0.16
  const cx = size / 2
  const cy = size / 2

  return (
    <div
      role="img"
      aria-label={`Score: ${clampedScore} out of 100${label ? ` – ${label}` : ''}`}
      className={cn('score-ring select-none', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden="true"
      >
        {/* Glow filter */}
        <defs>
          <filter id={`glow-${clampedScore}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="rgba(38,52,73,0.9)"
          strokeWidth={strokeWidth}
        />

        {/* Animated progress arc */}
        {animate ? (
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            transform={`rotate(-90 ${cx} ${cy})`}
            filter={`url(#glow-${clampedScore})`}
            style={{ filter: `drop-shadow(0 0 4px ${glow})` }}
          />
        ) : (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ filter: `drop-shadow(0 0 4px ${glow})` }}
          />
        )}

        {/* Score number */}
        <text
          x={cx}
          y={showLabel && label ? cy - labelFontSize * 0.6 : cy + fontSize * 0.38}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="Outfit, sans-serif"
          fill="#F8FAFC"
        >
          {clampedScore}
        </text>

        {/* Optional label below the number */}
        {showLabel && label && (
          <text
            x={cx}
            y={cy + fontSize * 0.38 + labelFontSize * 1.2}
            textAnchor="middle"
            fontSize={labelFontSize}
            fontWeight="500"
            fontFamily="Inter, sans-serif"
            fill="#94A3B8"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  )
}

export { ScoreRing }
export default ScoreRing
