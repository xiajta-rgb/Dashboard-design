import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const sizes = {
  sm: 'h-3',
  md: 'h-4',
  lg: 'h-6',
  xl: 'h-8',
}

function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()

  if (variant === 'circle') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          rounded-full bg-white/5 animate-pulse
          ${className}
        `}
        style={{ width, height }}
      />
    )
  }

  if (variant === 'rect') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          rounded-lg bg-white/5 animate-pulse
          ${className}
        `}
        style={{ width, height }}
      />
    )
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`
        rounded bg-white/5 animate-pulse
        ${sizes[variant] || sizes.md}
        ${className}
      `}
      style={{ width }}
    />
  )
}

export const SkeletonCard = ({ lines = 3, showAvatar = false }) => {
  return (
    <div className="space-y-3 p-4 bg-neutral-900/50 rounded-xl border border-white/5">
      {showAvatar && (
        <div className="flex items-center gap-3 mb-4">
          <Skeleton variant="circle" width="40px" height="40px" />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height="12px" />
            <Skeleton width="40%" height="10px" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '70%' : '100%'}
          height="14px"
        />
      ))}
    </div>
  )
}

export const SkeletonChart = ({ height = '240px' }) => {
  return (
    <div
      className="rounded-xl border border-white/5 bg-neutral-900/50 p-5"
      style={{ height }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton width="120px" height="16px" />
          <Skeleton width="80px" height="12px" />
        </div>
        <div className="flex gap-4">
          <Skeleton width="60px" height="12px" />
          <Skeleton width="60px" height="12px" />
        </div>
      </div>
      <div className="flex items-end justify-around h-[calc(100%-60px)] gap-2">
        {[65, 80, 45, 90, 70, 85, 55].map((h, i) => (
          <Skeleton
            key={i}
            width="12%"
            height={`${h}%`}
            className="rounded-t"
          />
        ))}
      </div>
    </div>
  )
}

export default Skeleton
