import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const Switch = forwardRef(({
  label,
  defaultChecked = false,
  checked,
  onChange,
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const inputId = id || `switch-${Math.random().toString(36).substr(2, 9)}`
  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : defaultChecked
  const thumbPosition = isChecked ? '22px' : '4px'

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
          {...(isControlled ? { checked: isChecked } : { defaultChecked: isChecked })}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="sr-only"
          role="switch"
          aria-checked={isChecked}
          {...props}
        />

        <motion.div
          className={`
            w-11 h-6 rounded-full relative
            transition-colors duration-300
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${isChecked ? 'bg-violet-500' : 'bg-white/10'}
          `}
          whileTap={prefersReducedMotion ? {} : !disabled ? { scale: 0.95 } : {}}
        >
          <motion.div
            className={`
              absolute top-1 w-4 h-4 rounded-full
              transition-colors duration-200
              ${isChecked ? 'bg-white' : 'bg-white/40'}
            `}
            animate={prefersReducedMotion ? {} : {
              left: thumbPosition
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
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

Switch.displayName = 'Switch'

export default Switch