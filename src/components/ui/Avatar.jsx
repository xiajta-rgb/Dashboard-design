import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

function Avatar({
  src,
  alt,
  size = 'md',
  name,
  status,
  className = '',
}) {
  const [imageError, setImageError] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const initials = name
    ? name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-neutral-500',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  }

  return (
    <div className="relative inline-flex">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          rounded-full overflow-hidden
          flex items-center justify-center
          font-semibold text-white
          bg-gradient-to-br from-violet-500 to-cyan-500
          border-2 border-white/20
          ${sizes[size]}
          ${className}
        `}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </motion.div>

      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-neutral-900 ${statusColors[status] || statusColors.offline} ${
            size === 'xs' || size === 'sm' ? 'w-1.5 h-1.5' : 'w-3 h-3'
          }`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  )
}

export const AvatarGroup = ({ avatars, max = 4, size = 'md' }) => {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className="flex -space-x-2">
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="ring-2 ring-neutral-900 rounded-full">
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remainingCount > 0 && (
        <motion.div
          initial={prefersReducedMotion => ({ opacity: 0, scale: 0 })}
          animate={{ opacity: 1, scale: 1 }}
          className={`
            rounded-full
            flex items-center justify-center
            font-semibold text-white
            bg-neutral-700
            border-2 border-neutral-900
            ring-2 ring-neutral-900
            ${sizes[size]}
          `}
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  )
}

export default Avatar
