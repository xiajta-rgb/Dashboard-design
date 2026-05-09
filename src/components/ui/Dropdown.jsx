import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState, forwardRef } from 'react'

const Dropdown = forwardRef(({
  trigger,
  children,
  align = 'left',
  width = 'w-56',
  className = '',
}, ref) => {
  const [isOpen, setIsOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const alignments = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            className={`
              absolute ${alignments[align]} top-full mt-2 z-50
              ${width}
              bg-neutral-900 rounded-xl border border-white/10 shadow-2xl shadow-black/40
              py-1 overflow-hidden
            `}
          >
            <div onClick={() => setIsOpen(false)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
})

Dropdown.displayName = 'Dropdown'

export const DropdownItem = ({
  children,
  icon: Icon,
  onClick,
  danger = false,
  disabled = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left
        transition-colors duration-150
        ${disabled
          ? 'opacity-50 cursor-not-allowed text-neutral-500'
          : danger
            ? 'text-red-400 hover:bg-red-500/10'
            : 'text-neutral-300 hover:text-white hover:bg-white/5'
        }
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  )
}

export const DropdownDivider = () => (
  <div className="h-px bg-white/5 my-1" />
)

export const DropdownLabel = ({ children }) => (
  <div className="px-4 py-2 text-xs text-neutral-500 font-medium uppercase tracking-wider">
    {children}
  </div>
)

export default Dropdown
