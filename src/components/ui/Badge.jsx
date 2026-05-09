import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const variants = {
  default: 'bg-white/10 text-white border-white/20',
  primary: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  danger: 'bg-red-500/20 text-red-400 border-red-500/30',
  info: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
}

const sizes = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.span
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`
        inline-flex items-center gap-1.5
        font-medium rounded-md border
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {dot && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${variant === 'success' ? 'bg-emerald-400' : variant === 'warning' ? 'bg-amber-400' : variant === 'danger' ? 'bg-red-400' : 'bg-white/50'}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${variant === 'success' ? 'bg-emerald-400' : variant === 'warning' ? 'bg-amber-400' : variant === 'danger' ? 'bg-red-400' : 'bg-white/50'}`} />
        </span>
      )}
      {children}
    </motion.span>
  )
}

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { variant: 'success', label: 'Active', dot: true },
    inactive: { variant: 'default', label: 'Inactive', dot: false },
    pending: { variant: 'warning', label: 'Pending', dot: true },
    error: { variant: 'danger', label: 'Error', dot: true },
    success: { variant: 'success', label: 'Success', dot: false },
    info: { variant: 'info', label: 'Info', dot: false },
  }

  const config = statusConfig[status?.toLowerCase()] || statusConfig.inactive

  return (
    <Badge variant={config.variant} dot={config.dot}>
      {config.label}
    </Badge>
  )
}

export default Badge
