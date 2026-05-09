import { forwardRef, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react'
import IconButton from './IconButton'
import Calendar from './Calendar'

const DatePicker = forwardRef(({
  value,
  onChange,
  placeholder = '选择日期',
  minDate,
  maxDate,
  disabledDates = [],
  markedDates = [],
  disabled = false,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const handleDateChange = (date) => {
    onChange?.(date)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      <button
        ref={ref}
        type="button"
        id={inputId}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between gap-2
          px-4 py-2.5 rounded-xl
          bg-white/5 border border-white/10
          text-white placeholder-white/30
          transition-all duration-200
          focus:outline-none focus:border-white/30 focus:bg-white/10
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        {...props}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-neutral-400" />
          <span className={value ? 'text-white' : 'text-neutral-500'}>
            {value ? formatDate(value) : placeholder}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 z-50"
          >
            <div className="bg-neutral-900 rounded-xl border border-white/10 shadow-2xl shadow-black/50 p-2">
              <Calendar
                value={value}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                markedDates={markedDates}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker