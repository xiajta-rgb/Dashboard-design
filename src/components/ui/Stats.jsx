import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  trend,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()

  const getTrendIcon = () => {
    if (trend === 'up' || changeType === 'positive') return <TrendingUp className="w-4 h-4" />
    if (trend === 'down' || changeType === 'negative') return <TrendingDown className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  const getTrendColor = () => {
    if (trend === 'up' || changeType === 'positive') return 'text-emerald-400'
    if (trend === 'down' || changeType === 'negative') return 'text-red-400'
    return 'text-neutral-400'
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      className={`
        bg-neutral-900/50 rounded-xl border border-white/5 p-5
        hover:border-white/10 hover:shadow-lg hover:shadow-black/20
        transition-all duration-200
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <Icon className="w-4 h-4 text-neutral-400" />
          </div>
        )}
      </div>

      <div className="text-2xl font-bold text-white mb-2 tracking-tight">
        {value}
      </div>

      {change && (
        <div className={`flex items-center gap-1.5 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-xs font-semibold">{change}</span>
        </div>
      )}
    </motion.div>
  )
}

export function StatGrid({ stats, columns = 4 }) {
  return (
    <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${columns >= 3 ? 'lg:grid-cols-3' : ''} ${columns >= 4 ? 'xl:grid-cols-4' : ''}`}>
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  )
}

export function StatTrend({ value, unit = '%', trend = 'up' }) {
  return (
    <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
      {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      <span className="text-xs font-semibold">{trend === 'up' ? '+' : ''}{value}{unit}</span>
    </div>
  )
}

export default StatCard
