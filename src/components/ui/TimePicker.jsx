import { forwardRef, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Clock, ChevronDown, ChevronUp } from 'lucide-react'

const TimePicker = forwardRef(({
  value,
  onChange,
  placeholder = '选择时间',
  format = '24h',
  minuteStep = 1,
  disabled = false,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [period, setPeriod] = useState('AM')
  const containerRef = useRef(null)

  const inputId = id || `timepicker-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':')
      setHours(h || '00')
      setMinutes(m || '00')
      if (format === '12h' && h) {
        setPeriod(parseInt(h) >= 12 ? 'PM' : 'AM')
      }
    }
  }, [value, format])

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

  const hourOptions = format === '12h' 
    ? Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
    : Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))

  const minuteOptions = Array.from({ length: 60 / minuteStep }, (_, i) => 
    String(i * minuteStep).padStart(2, '0')
  )

  const handleHourChange = (hour) => {
    setHours(hour)
    updateValue(hour, minutes, period)
  }

  const handleMinuteChange = (minute) => {
    setMinutes(minute)
    updateValue(hours, minute, period)
  }

  const handlePeriodChange = (p) => {
    setPeriod(p)
    updateValue(hours, minutes, p)
  }

  const updateValue = (h, m, p) => {
    let finalHour = h
    if (format === '12h') {
      const hourNum = parseInt(h)
      if (p === 'PM' && hourNum !== 12) {
        finalHour = String(hourNum + 12)
      } else if (p === 'AM' && hourNum === 12) {
        finalHour = '00'
      }
    }
    onChange?.(`${finalHour}:${m}`)
  }

  const displayValue = () => {
    if (!value) return placeholder
    if (format === '12h') {
      const h = parseInt(hours)
      const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h
      return `${displayHour}:${minutes} ${period}`
    }
    return `${hours}:${minutes}`
  }

  const adjustHours = (delta) => {
    let newHour = parseInt(hours)
    newHour = (newHour + delta + (format === '12h' ? 12 : 24)) % (format === '12h' ? 12 : 24)
    if (format === '12h' && newHour === 0) newHour = 12
    handleHourChange(String(newHour).padStart(2, '0'))
  }

  const adjustMinutes = (delta) => {
    let newMinute = parseInt(minutes)
    newMinute = (newMinute + delta + 60) % 60
    if (newMinute % minuteStep !== 0) {
      newMinute = Math.round(newMinute / minuteStep) * minuteStep
      if (newMinute >= 60) newMinute = 0
    }
    handleMinuteChange(String(newMinute).padStart(2, '0'))
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
          <Clock className="w-4 h-4 text-neutral-400" />
          <span className={value ? 'text-white' : 'text-neutral-500'}>
            {displayValue()}
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
            <div className="bg-neutral-900 rounded-xl border border-white/10 shadow-2xl shadow-black/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => adjustHours(1)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    aria-label="增加小时"
                  >
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                  </button>
                  <div className="px-3 py-2 bg-neutral-800 rounded-lg">
                    <span className="text-xl font-mono text-white">{hours}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustHours(-1)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    aria-label="减少小时"
                  >
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>

                <span className="text-2xl text-neutral-500 font-light">:</span>

                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => adjustMinutes(minuteStep)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    aria-label="增加分钟"
                  >
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                  </button>
                  <div className="px-3 py-2 bg-neutral-800 rounded-lg">
                    <span className="text-xl font-mono text-white">{minutes}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustMinutes(-minuteStep)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    aria-label="减少分钟"
                  >
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>

                {format === '12h' && (
                  <div className="flex flex-col ml-2">
                    <button
                      type="button"
                      onClick={() => handlePeriodChange('AM')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        period === 'AM' 
                          ? 'bg-violet-500 text-white' 
                          : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                      }`}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePeriodChange('PM')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        period === 'PM' 
                          ? 'bg-violet-500 text-white' 
                          : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                      }`}
                    >
                      PM
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onChange?.('09:00')
                    setHours('09')
                    setMinutes('00')
                  }}
                  className="flex-1 px-3 py-2 bg-neutral-800 rounded-lg text-sm text-neutral-400 hover:bg-neutral-700 transition-colors"
                >
                  上午
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.('18:00')
                    setHours('18')
                    setMinutes('00')
                  }}
                  className="flex-1 px-3 py-2 bg-neutral-800 rounded-lg text-sm text-neutral-400 hover:bg-neutral-700 transition-colors"
                >
                  下午
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const now = new Date()
                    onChange?.(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`)
                  }}
                  className="flex-1 px-3 py-2 bg-violet-500/20 rounded-lg text-sm text-violet-400 hover:bg-violet-500/30 transition-colors"
                >
                  现在
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

TimePicker.displayName = 'TimePicker'

export default TimePicker