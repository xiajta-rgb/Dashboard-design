import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { Check, X, AlertCircle } from 'lucide-react'

export function ChecklistItem({
  label,
  checked = false,
  onChange,
  disabled = false,
  variant = 'default',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    default: {
      unchecked: 'border-white/20 bg-transparent',
      checked: 'border-emerald-500 bg-emerald-500',
    },
    danger: {
      unchecked: 'border-white/20 bg-transparent',
      checked: 'border-red-500 bg-red-500',
    },
    warning: {
      unchecked: 'border-white/20 bg-transparent',
      checked: 'border-amber-500 bg-amber-500',
    },
  }

  return (
    <label className={`flex items-center gap-3 cursor-pointer group ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <motion.div
        initial={prefersReducedMotion ? {} : { scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => !disabled && onChange?.(!checked)}
        className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center
          transition-all duration-200
          ${checked ? variants[variant].checked : variants[variant].unchecked}
          ${!disabled ? 'group-hover:border-white/40' : ''}
        `}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </motion.div>

      <span className={`text-sm ${checked ? 'text-neutral-400 line-through' : 'text-neutral-200'}`}>
        {label}
      </span>
    </label>
  )
}

export function Checklist({
  items,
  title,
  columns = 1,
  onChange,
  className = '',
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {title && (
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{title}</h4>
      )}
      <div className={`grid gap-2 ${columns > 1 ? `grid-cols-${columns}` : ''}`}>
        {items.map((item, i) => (
          <ChecklistItem
            key={i}
            {...item}
            onChange={onChange ? () => onChange(i) : item.onChange}
          />
        ))}
      </div>
    </div>
  )
}

export function TaskList({ tasks, title }) {
  return (
    <div className="space-y-4">
      {title && (
        <h4 className="text-sm font-semibold text-white/80">{title}</h4>
      )}
      <div className="space-y-2">
        {tasks.map((task, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
              ${task.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-400'
                : task.status === 'in-progress'
                  ? 'bg-violet-500/20 text-violet-400'
                  : 'bg-white/10 text-neutral-400'
              }
            `}>
              {task.status === 'completed' ? (
                <Check className="w-3 h-3" />
              ) : task.status === 'in-progress' ? (
                <AlertCircle className="w-3 h-3" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${task.status === 'completed' ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                {task.label}
              </p>
              {task.description && (
                <p className="text-xs text-neutral-500 truncate">{task.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ChecklistItem
