import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-gradient-to-r from-violet-500 to-violet-600 text-white hover:from-violet-600 hover:to-violet-700 shadow-lg shadow-violet-500/25',
  secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/20 backdrop-blur-sm',
  ghost: 'text-neutral-400 hover:text-white hover:bg-white/5',
  danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30',
  success: 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaControls,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={prefersReducedMotion ? {} : { scale: disabled ? 1 : 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: disabled ? 1 : 0.98 }}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-xl
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" role="status" />
      ) : leftIcon ? (
        <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {rightIcon && !isLoading && (
        <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button