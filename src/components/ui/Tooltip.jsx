import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const positions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrows = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-neutral-800 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-neutral-800 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-neutral-800 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-neutral-800 border-t-transparent border-b-transparent border-l-transparent',
}

function Tooltip({
  children,
  content,
  position = 'top',
  delay = 200,
  disabled = false,
  className = '',
}) {
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  if (disabled) {
    return children
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50
              ${positions[position]}
              pointer-events-none
              ${className}
            `}
            role="tooltip"
          >
            <div className="bg-neutral-800 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl border border-white/10 whitespace-nowrap">
              {content}
            </div>
            <div
              className={`absolute w-0 h-0 border-4 ${arrows[position]}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tooltip
