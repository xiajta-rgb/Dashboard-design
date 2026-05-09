import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

const Checkbox = forwardRef(({
  label,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  indeterminate = false,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none ${containerClassName}`}
      htmlFor={inputId}
    >
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          checked={checked}
          indeterminate={indeterminate}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="sr-only"
          {...props}
        />

        <motion.div
          className={`
            w-5 h-5 rounded-md border-2 flex items-center justify-center
            transition-colors duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${checked || indeterminate
              ? 'bg-violet-500 border-violet-500'
              : 'bg-white/5 border-white/20 hover:border-white/40'
            }
          `}
          whileHover={prefersReducedMotion ? {} : !disabled ? { scale: 1.05 } : {}}
          whileTap={prefersReducedMotion ? {} : !disabled ? { scale: 0.95 } : {}}
        >
          {(checked || indeterminate) && (
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={prefersReducedMotion ? {} : { scale: 1 }}
              transition={{ duration: 0.15 }}
            >
              {indeterminate ? (
                <div className="w-3 h-0.5 bg-white rounded-full" />
              ) : (
                <Check className="w-3.5 h-3.5 text-white" />
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {label && (
        <span className={`text-sm ${disabled ? 'text-neutral-500' : 'text-white/80'}`}>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </span>
      )}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox