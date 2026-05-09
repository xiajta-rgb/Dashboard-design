import { forwardRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  placeholder,
  className = '',
  containerClassName = '',
  disabled = false,
  required = false,
  rows = 4,
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${inputId}-error` : undefined
  const helperId = helperText ? `${inputId}-helper` : undefined

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-white/80 mb-1.5"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={inputId}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
        className={`
          w-full px-4 py-2.5 rounded-xl resize-none
          bg-white/5 border border-white/10
          text-white placeholder-white/30
          transition-all duration-200
          focus:outline-none focus:border-white/30 focus:bg-white/10
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500/50 focus:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={errorId}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
            role="alert"
          >
            {error}
          </motion.p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mt-1.5 text-xs text-neutral-500">
            {helperText}
          </p>
        )}
      </AnimatePresence>
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea