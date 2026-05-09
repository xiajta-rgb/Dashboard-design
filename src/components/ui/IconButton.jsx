import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const IconButton = forwardRef(({
  children,
  variant = 'ghost',
  size = 'md',
  label,
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ariaPressed,
  ariaExpanded,
  ariaControls,
  role = 'button',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const variants = {
    ghost: 'text-neutral-400 hover:text-white hover:bg-white/10',
    primary: 'bg-violet-500/20 text-violet-400 hover:bg-violet-500/30',
    secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/20',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
    success: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30',
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      role={role}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={prefersReducedMotion ? {} : { scale: disabled ? 1 : 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: disabled ? 1 : 0.95 }}
      aria-label={label}
      aria-busy={isLoading}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={`
        inline-flex items-center justify-center rounded-xl
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${sizeClasses[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className={`${iconSizes[size]} animate-spin`} aria-hidden="true" role="status">
          <svg className="animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </span>
      ) : (
        <span className={iconSizes[size]} aria-hidden="true">{children}</span>
      )}
    </motion.button>
  )
})

IconButton.displayName = 'IconButton'

export default IconButton