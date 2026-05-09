import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { Star, StarHalf } from 'lucide-react'

export function Rating({
  value = 0,
  max = 5,
  size = 'md',
  showValue = true,
  allowHalf = true,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion()

  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const renderStar = (index) => {
    const starValue = index + 1
    const isFilled = value >= starValue
    const isHalf = !isFilled && value >= starValue - 0.5 && allowHalf

    return (
      <motion.span
        key={index}
        initial={prefersReducedMotion ? {} : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className={`
          ${sizes[size]}
          ${isFilled || isHalf ? 'text-amber-400' : 'text-neutral-600'}
        `}
      >
        {isFilled ? (
          <Star className="w-full h-full fill-current" />
        ) : isHalf ? (
          <StarHalf className="w-full h-full fill-current" />
        ) : (
          <Star className="w-full h-full" />
        )}
      </motion.span>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => renderStar(i))}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-neutral-300">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export function ReviewCard({
  author,
  avatar,
  rating,
  date,
  content,
  title,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-5 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
            {author?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{author}</h4>
            {date && <p className="text-xs text-neutral-500">{date}</p>}
          </div>
        </div>
        <Rating value={rating} size="sm" />
      </div>

      {title && (
        <h5 className="text-sm font-semibold text-white/90 mb-2">{title}</h5>
      )}

      <p className="text-sm text-neutral-400 leading-relaxed">
        {content}
      </p>
    </motion.div>
  )
}

export default Rating
