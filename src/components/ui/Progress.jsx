import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

function ProgressBar({
  value = 0,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  animated = true,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  }

  const variants = {
    default: 'bg-gradient-to-r from-violet-500 to-violet-600',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600',
    danger: 'bg-gradient-to-r from-red-500 to-red-600',
    info: 'bg-gradient-to-r from-sky-500 to-sky-600',
    gradient: 'bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500',
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-neutral-400">{showLabel}</span>
          <span className="text-xs font-mono text-neutral-300">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full rounded-full bg-white/10 overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={prefersReducedMotion ? {} : { width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: animated ? (prefersReducedMotion ? 0 : 0.8) : 0,
            ease: [0.16, 1, 0.3, 1]
          }}
          className={`h-full rounded-full ${variants[variant]} ${
            animated && !prefersReducedMotion ? 'relative overflow-hidden' : ''
          }`}
        >
          {animated && !prefersReducedMotion && (
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite]" />
          )}
        </motion.div>
      </div>
    </div>
  )
}

export function ProgressCard({ title, value, max = 100, variant = 'default', icon: Icon }) {
  const percentage = Math.round((value / max) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-4 hover:border-white/10 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-neutral-500" />}
      </div>
      <ProgressBar value={value} max={max} variant={variant} showLabel={false} />
      <div className="mt-2 text-right">
        <span className="text-lg font-semibold text-white">{percentage}%</span>
        <span className="text-xs text-neutral-500 ml-1">/ {max}</span>
      </div>
    </motion.div>
  )
}

export function ProgressGroup({ items, title }) {
  return (
    <div className="space-y-4">
      {title && (
        <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">{title}</h4>
      )}
      <div className="space-y-3">
        {items.map((item, i) => (
          <ProgressBar
            key={i}
            value={item.value}
            max={item.max || 100}
            variant={item.variant || 'default'}
            showLabel={item.label}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
