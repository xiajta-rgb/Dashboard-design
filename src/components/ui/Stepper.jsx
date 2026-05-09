import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

export function Stepper({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  size = 'md',
  disabled = false,
  label,
  showValue = true,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()

  const sizes = {
    sm: { button: 'w-7 h-7', icon: 'w-3 h-3', text: 'text-sm' },
    md: { button: 'w-9 h-9', icon: 'w-4 h-4', text: 'text-base' },
    lg: { button: 'w-11 h-11', icon: 'w-5 h-5', text: 'text-lg' },
  }

  const handleDecrement = () => {
    if (value > min) {
      onChange?.(Math.max(value - step, min))
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange?.(Math.min(value + step, max))
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-neutral-300">{label}</label>
      )}

      <div className={`flex items-center bg-neutral-800/50 rounded-lg border border-white/10 ${disabled ? 'opacity-50' : ''}`}>
        <button
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className={`
            ${sizes[size].button} flex items-center justify-center
            text-neutral-400 hover:text-white hover:bg-white/5
            transition-colors duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
            rounded-l-lg
          `}
          aria-label="减少"
        >
          <Minus className={sizes[size].icon} />
        </button>

        {showValue && (
          <motion.span
            key={value}
            initial={prefersReducedMotion ? {} : { scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`
              ${sizes[size].text} font-semibold text-white
              min-w-[3rem] text-center px-2
            `}
          >
            {value}
          </motion.span>
        )}

        <button
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className={`
            ${sizes[size].button} flex items-center justify-center
            text-neutral-400 hover:text-white hover:bg-white/5
            transition-colors duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
            rounded-r-lg
          `}
          aria-label="增加"
        >
          <Plus className={sizes[size].icon} />
        </button>
      </div>
    </div>
  )
}

export function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  showValue = true,
  variant = 'default',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()
  const percentage = ((value - min) / (max - min)) * 100

  const variants = {
    default: 'bg-gradient-to-r from-violet-500 to-violet-600',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600',
    danger: 'bg-gradient-to-r from-red-500 to-red-600',
  }

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-sm font-medium text-neutral-300">{label}</label>
          )}
          {showValue && (
            <span className="text-sm font-mono text-violet-400">{value}</span>
          )}
        </div>
      )}

      <div className="relative h-2 bg-neutral-800/50 rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className={`absolute inset-y-0 left-0 rounded-full ${variants[variant]}`}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <motion.div
          initial={prefersReducedMotion ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          style={{ left: `${percentage}%` }}
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-violet-500 pointer-events-none"
        />
      </div>
    </div>
  )
}

export default Stepper
