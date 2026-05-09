import { forwardRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Search, Eye, EyeOff } from 'lucide-react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  type = 'text',
  placeholder,
  className = '',
  containerClassName = '',
  disabled = false,
  required = false,
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = error ? `${inputId}-error` : undefined
  const helperId = helperText ? `${inputId}-helper` : undefined

  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

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

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          className={`
            w-full px-4 py-2.5 rounded-xl
            bg-white/5 border border-white/10
            text-white placeholder-white/30
            transition-all duration-200
            focus:outline-none focus:border-white/30 focus:bg-white/10
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${(rightIcon || isPassword) ? 'pr-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label={showPassword ? '隐藏密码' : '显示密码'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}

        {rightIcon && !isPassword && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>

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

Input.displayName = 'Input'

export const SearchInput = forwardRef(({
  placeholder = '搜索...',
  className = '',
  ...props
}, ref) => {
  return (
    <Input
      ref={ref}
      type="search"
      placeholder={placeholder}
      leftIcon={<Search className="w-4 h-4" />}
      className={className}
      {...props}
    />
  )
})

SearchInput.displayName = 'SearchInput'

export default Input
