import { forwardRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const Radio = forwardRef(({
  label,
  checked = false,
  onChange,
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  id,
  name,
  value,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none ${containerClassName}`}
      htmlFor={inputId}
    >
      <div className="relative">
        <input
          ref={ref}
          type="radio"
          id={inputId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="sr-only"
          {...props}
        />

        <motion.div
          className={`
            w-5 h-5 rounded-full border-2 flex items-center justify-center
            transition-colors duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${checked
              ? 'bg-violet-500 border-violet-500'
              : 'bg-white/5 border-white/20 hover:border-white/40'
            }
          `}
          whileHover={prefersReducedMotion ? {} : !disabled ? { scale: 1.05 } : {}}
          whileTap={prefersReducedMotion ? {} : !disabled ? { scale: 0.95 } : {}}
        >
          {checked && (
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={prefersReducedMotion ? {} : { scale: 1 }}
              transition={{ duration: 0.15 }}
              className="w-2.5 h-2.5 rounded-full bg-white"
            />
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

Radio.displayName = 'Radio'

export default Radio