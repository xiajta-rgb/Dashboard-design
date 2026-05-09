import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const Card = forwardRef(({
  children,
  variant = 'default',
  hoverable = true,
  padding = 'md',
  className = '',
  onClick,
  tabIndex = onClick ? 0 : undefined,
  role = onClick ? 'button' : undefined,
  ariaLabel,
  ariaDescribedBy,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    default: 'bg-[#0c0c0e] border-white/[0.06]',
    glass: 'bg-white/10 backdrop-blur-xl border-white/20',
    elevated: 'bg-neutral-900 border-white/[0.06] shadow-xl shadow-black/20',
    outlined: 'bg-transparent border-white/10',
  }

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const InteractiveCard = hoverable || onClick ? motion.div : 'div'

  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick(e)
    }
  }

  const cardProps = hoverable || onClick ? {
    whileHover: prefersReducedMotion ? {} : { y: -4, scale: 1.01 },
    whileTap: prefersReducedMotion ? {} : { scale: 0.99 },
    onClick,
    onKeyDown: onClick ? handleKeyDown : undefined,
    tabIndex,
    role,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
  } : {}

  return (
    <InteractiveCard
      ref={ref}
      className={`
        rounded-xl overflow-hidden
        border
        transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
        ${hoverable || onClick ? 'cursor-pointer' : ''}
        ${variants[variant]}
        ${paddings[padding]}
        ${className}
      `}
      {...cardProps}
      {...props}
    >
      {children}
    </InteractiveCard>
  )
})

Card.displayName = 'Card'

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex items-center justify-between mb-4 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = '', as: Component = 'h3' }) => (
  <Component className={`font-semibold text-white ${className}`}>
    {children}
  </Component>
)

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-neutral-400 text-sm ${className}`}>
    {children}
  </p>
)

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
)

const CardFooter = ({ children, className = '' }) => (
  <div className={`flex items-center gap-2 mt-4 pt-4 border-t border-white/5 ${className}`}>
    {children}
  </div>
)

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Body = CardContent
Card.Footer = CardFooter

export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

export default Card