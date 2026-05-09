import { forwardRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { GripVertical, MoreHorizontal, Trash2, Edit2, Copy, ChevronDown, ChevronRight } from 'lucide-react'
import Badge from './Badge'
import IconButton from './IconButton'

const List = forwardRef(({
  items = [],
  onItemClick,
  onItemDelete,
  onItemEdit,
  draggable = false,
  selectable = false,
  selectedItems = [],
  onSelectionChange,
  className = '',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  const handleItemClick = (item, index) => {
    if (selectable) {
      const itemId = item.id || index
      if (selectedItems.includes(itemId)) {
        onSelectionChange?.(selectedItems.filter(id => id !== itemId))
      } else {
        onSelectionChange?.([...selectedItems, itemId])
      }
    }
    onItemClick?.(item, index)
  }

  const renderItem = (item, index) => {
    const itemId = item.id || index
    const isSelected = selectedItems.includes(itemId)
    const isDraggable = draggable && item.draggable !== false

    return (
      <motion.div
        key={itemId}
        layout
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className={`
          group flex items-center gap-3 p-4 rounded-xl
          transition-colors cursor-pointer
          ${isSelected ? 'bg-violet-500/10 border border-violet-500/30' : 'bg-neutral-900/50 border border-transparent hover:border-white/10'}
        `}
        onClick={() => handleItemClick(item, index)}
      >
        {isDraggable && (
          <div className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="w-4 h-4 text-neutral-500" />
          </div>
        )}

        {item.leading && (
          <div className="flex-shrink-0">
            {typeof item.leading === 'function' ? item.leading(item) : item.leading}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium">
                {item.badge}
              </span>
            )}
            <h4 className="text-sm font-medium text-white truncate">
              {item.title}
            </h4>
          </div>
          {item.description && (
            <p className="text-xs text-neutral-500 mt-0.5 truncate">
              {item.description}
            </p>
          )}
          {item.meta && (
            <div className="flex items-center gap-4 mt-1">
              {item.meta.map((m, i) => (
                <span key={i} className="text-xs text-neutral-500">{m}</span>
              ))}
            </div>
          )}
        </div>

        {item.trailing && (
          <div className="flex-shrink-0">
            {typeof item.trailing === 'function' ? item.trailing(item) : item.trailing}
          </div>
        )}

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onItemEdit && (
            <IconButton
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onItemEdit(item, index)
              }}
            >
              <Edit2 className="w-3 h-3" />
            </IconButton>
          )}
          {onItemDelete && (
            <IconButton
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onItemDelete(item, index)
              }}
            >
              <Trash2 className="w-3 h-3" />
            </IconButton>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div ref={ref} className={`space-y-2 ${className}`} {...props}>
      <AnimatePresence mode="popLayout">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-neutral-800/50 flex items-center justify-center mb-3">
              <MoreHorizontal className="w-6 h-6 text-neutral-500" />
            </div>
            <p className="text-neutral-400">暂无数据</p>
          </motion.div>
        ) : (
          items.map((item, index) => renderItem(item, index))
        )}
      </AnimatePresence>
    </div>
  )
})

List.displayName = 'List'

const VirtualList = forwardRef(({
  items = [],
  height = 400,
  itemHeight = 60,
  renderItem,
  className = '',
  ...props
}, ref) => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef(null)

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(
    startIndex + Math.ceil(height / itemHeight) + 1,
    items.length
  )

  const visibleItems = items.slice(startIndex, endIndex)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={handleScroll}
      {...props}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => renderItem(item, startIndex + index))}
        </div>
      </div>
    </div>
  )
})

VirtualList.displayName = 'VirtualList'

export { List, VirtualList }
export default List