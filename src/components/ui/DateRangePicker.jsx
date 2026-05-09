import { forwardRef, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import IconButton from './IconButton'
import Calendar from './Calendar'

const DateRangePicker = forwardRef(({
  value,
  onChange,
  placeholder = ['开始日期', '结束日期'],
  minDate,
  maxDate,
  disabledDates = [],
  disabled = false,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState(value || { start: null, end: null })
  const containerRef = useRef(null)

  const inputId = id || `daterangepicker-${Math.random().toString(36).substr(2, 9)}`

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
      month: '2-digit',
      day: '2-digit',
    })
  }

  const handleDateChange = (range) => {
    setSelectedRange(range)
    if (range.start && range.end) {
      onChange?.(range)
      setIsOpen(false)
    }
  }

  const displayValue = () => {
    if (selectedRange.start && selectedRange.end) {
      return `${formatDate(selectedRange.start)} - ${formatDate(selectedRange.end)}`
    } else if (selectedRange.start) {
      return `${formatDate(selectedRange.start)} - ${placeholder[1] || '结束日期'}`
    }
    return placeholder.join(' - ')
  }

  const clearSelection = (e) => {
    e.stopPropagation()
    setSelectedRange({ start: null, end: null })
    onChange?.({ start: null, end: null })
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
          <ChevronDown className="w-4 h-4 text-neutral-400" />
          <span className={selectedRange.start ? 'text-white' : 'text-neutral-500'}>
            {displayValue()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {selectedRange.start && (
            <button
              type="button"
              onClick={clearSelection}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="清除选择"
            >
              <span className="text-xs text-neutral-400">×</span>
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
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
            <div className="bg-neutral-900 rounded-xl border border-white/10 shadow-2xl shadow-black/50 p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-sm">
                    {selectedRange.start ? formatDate(selectedRange.start) : '开始日期'}
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500" />
                  <div className="px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-sm">
                    {selectedRange.end ? formatDate(selectedRange.end) : '结束日期'}
                  </div>
                </div>
              </div>

              <Calendar
                mode="range"
                selectedRange={selectedRange}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
              />

              {selectedRange.start && selectedRange.end && (
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onChange?.(selectedRange)
                      setIsOpen(false)
                    }}
                    className="px-4 py-2 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-600 transition-colors"
                  >
                    确认
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

DateRangePicker.displayName = 'DateRangePicker'

export default DateRangePicker