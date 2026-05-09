import { forwardRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TabList = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={`inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] ${className}`}
    {...props}
  >
    {children}
  </div>
))

TabList.displayName = 'TabList'

const Tab = forwardRef(({
  children,
  active = false,
  onClick,
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      ref={ref}
      role="tab"
      id={id}
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={active ? 0 : -1}
      onClick={onClick}
      disabled={disabled}
      whileHover={prefersReducedMotion ? {} : { scale: disabled ? 1 : 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: disabled ? 1 : 0.98 }}
      className={`
        flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${active ? 'bg-white/10 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Tab.displayName = 'Tab'

const TabPanel = forwardRef(({
  children,
  id,
  active = false,
  className = '',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      role="tabpanel"
      id={id}
      aria-hidden={!active}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`${!active ? 'hidden' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
})

TabPanel.displayName = 'TabPanel'

export { TabList, Tab, TabPanel }
