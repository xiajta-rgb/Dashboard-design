import { forwardRef, useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import IconButton from './IconButton'
import Badge from './Badge'

const Calendar = forwardRef(({
  value,
  onChange,
  onDateSelect,
  minDate,
  maxDate,
  disabledDates = [],
  markedDates = [],
  selectedRange,
  mode = 'single',
  showWeekNumbers = false,
  weekStartsOn = 0,
  className = '',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date())
  const [hoverDate, setHoverDate] = useState(null)

  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  const monthData = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = (firstDay.getDay() - weekStartsOn + 7) % 7

    const days = []

    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1)
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isDisabled: isDateDisabled(prevDate),
      })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({
        date,
        isCurrentMonth: true,
        isDisabled: isDateDisabled(date),
      })
    }

    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isDisabled: isDateDisabled(nextDate),
      })
    }

    return days
  }, [currentMonth, minDate, maxDate, disabledDates])

  function isDateDisabled(date) {
    if (minDate && date < new Date(minDate)) return true
    if (maxDate && date > new Date(maxDate)) return true
    if (disabledDates.some(d => isSameDay(new Date(d), date))) return true
    return false
  }

  function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  function isInRange(date) {
    if (!selectedRange || !selectedRange.start || !selectedRange.end) return false
    const start = new Date(selectedRange.start)
    const end = new Date(selectedRange.end)
    return date >= start && date <= end
  }

  function isRangeStart(date) {
    if (!selectedRange || !selectedRange.start) return false
    return isSameDay(new Date(selectedRange.start), date)
  }

  function isRangeEnd(date) {
    if (!selectedRange || !selectedRange.end) return false
    return isSameDay(new Date(selectedRange.end), date)
  }

  function handleDateClick(date) {
    if (isDateDisabled(date.date)) return

    if (mode === 'range' && selectedRange) {
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        onChange?.({ start: date.date, end: null })
      } else {
        if (date.date < selectedRange.start) {
          onChange?.({ start: date.date, end: selectedRange.start })
        } else {
          onChange?.({ start: selectedRange.start, end: date.date })
        }
      }
    } else {
      onChange?.(date.date)
      onDateSelect?.(date.date)
    }
  }

  function isMarked(date) {
    return markedDates.some(d => isSameDay(new Date(d), date))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    const today = new Date()
    if (!isDateDisabled(today)) {
      handleDateClick({ date: today })
    }
  }

  const formatMonth = (date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
  }

  const getDayClass = (day) => {
    const classes = ['relative flex items-center justify-center w-10 h-10 rounded-full text-sm transition-all']

    if (!day.isCurrentMonth) {
      classes.push('text-neutral-600')
    }

    if (day.isDisabled) {
      classes.push('text-neutral-500 cursor-not-allowed opacity-50')
      return classes.join(' ')
    }

    if (isSameDay(day.date, new Date()) && !value) {
      classes.push('bg-violet-500/20 text-violet-400')
    } else if (isSameDay(day.date, value)) {
      classes.push('bg-violet-500 text-white')
    } else if (mode === 'range' && isInRange(day.date)) {
      classes.push('bg-violet-500/20')
    } else {
      classes.push('hover:bg-white/10 cursor-pointer')
    }

    if (mode === 'range' && (isRangeStart(day.date) || isRangeEnd(day.date))) {
      classes.push('ring-2 ring-violet-500 ring-offset-2 ring-offset-neutral-950')
    }

    return classes.join(' ')
  }

  return (
    <div ref={ref} className={`w-[320px] p-4 bg-neutral-900 rounded-xl border border-white/10 ${className}`} {...props}>
      <div className="flex items-center justify-between mb-4">
        <IconButton variant="ghost" size="sm" onClick={prevMonth}>
          <ChevronLeft className="w-4 h-4" />
        </IconButton>
        <button 
          onClick={goToToday}
          className="text-sm font-medium text-white hover:text-violet-400 transition-colors"
        >
          {formatMonth(currentMonth)}
        </button>
        <IconButton variant="ghost" size="sm" onClick={nextMonth}>
          <ChevronRight className="w-4 h-4" />
        </IconButton>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="flex items-center justify-center w-10 h-8 text-xs font-medium text-neutral-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {monthData.map((day, index) => (
          <motion.button
            key={index}
            whileHover={prefersReducedMotion ? {} : day.isCurrentMonth && !day.isDisabled ? { scale: 1.1 } : {}}
            whileTap={prefersReducedMotion ? {} : day.isCurrentMonth && !day.isDisabled ? { scale: 0.95 } : {}}
            onClick={() => handleDateClick(day)}
            onMouseEnter={() => setHoverDate(day.date)}
            onMouseLeave={() => setHoverDate(null)}
            disabled={day.isDisabled}
            className={getDayClass(day)}
            aria-label={day.date.toLocaleDateString('zh-CN')}
          >
            <span>{day.date.getDate()}</span>
            {isMarked(day.date) && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400" />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {mode === 'range' && selectedRange?.start && !selectedRange?.end && hoverDate && hoverDate > selectedRange.start && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 pt-4 border-t border-white/5"
          >
            <p className="text-xs text-neutral-500">
              选择结束日期（{hoverDate.toLocaleDateString('zh-CN')}）
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

Calendar.displayName = 'Calendar'

export default Calendar