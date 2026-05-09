import { forwardRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Plus, MoreHorizontal, GripVertical, X } from 'lucide-react'
import IconButton from './IconButton'
import Badge from './Badge'

const Kanban = forwardRef(({
  columns = [],
  onCardMove,
  onCardAdd,
  onCardEdit,
  onCardDelete,
  draggable = true,
  className = '',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const [activeCard, setActiveCard] = useState(null)
  const [draggedCard, setDraggedCard] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  const handleDragStart = (e, card, columnId) => {
    if (!draggable) return
    setDraggedCard({ ...card, columnId })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    if (!draggable) return
    setDragOverColumn(columnId)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()
    if (!draggable || !draggedCard) return

    onCardMove?.({
      card: draggedCard,
      fromColumnId: draggedCard.columnId,
      toColumnId: targetColumnId,
    })

    setDraggedCard(null)
    setDragOverColumn(null)
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
    setDragOverColumn(null)
  }

  return (
    <div ref={ref} className={`flex gap-4 overflow-x-auto pb-4 ${className}`} {...props}>
      <AnimatePresence mode="popLayout">
        {columns.map((column) => (
          <motion.div
            key={column.id}
            layout
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              flex-shrink-0 w-72 bg-neutral-900/50 rounded-xl p-4
              ${dragOverColumn === column.id ? 'ring-2 ring-violet-500' : ''}
            `}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {column.color && (
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                )}
                <h3 className="text-sm font-semibold text-white">
                  {column.title}
                </h3>
                <Badge variant="default" size="sm">
                  {column.cards?.length || 0}
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                {onCardAdd && (
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => onCardAdd(column.id)}
                  >
                    <Plus className="w-4 h-4" />
                  </IconButton>
                )}
                <IconButton variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </IconButton>
              </div>
            </div>

            {column.limit && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-neutral-500">进度</span>
                  <span className="text-neutral-400">
                    {column.cards?.length || 0}/{column.limit}
                  </span>
                </div>
                <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-violet-500"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.min(((column.cards?.length || 0) / column.limit) * 100, 100)}%` 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3 min-h-[200px]">
              <AnimatePresence mode="popLayout">
                {column.cards?.map((card, index) => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    draggable={draggable}
                    onDragStart={(e) => handleDragStart(e, card, column.id)}
                    onDragEnd={handleDragEnd}
                    className={`
                      p-4 bg-neutral-800/50 rounded-xl border border-white/5
                      cursor-grab active:cursor-grabbing
                      transition-all
                      ${draggedCard?.id === card.id ? 'opacity-50' : 'hover:border-white/10'}
                    `}
                  >
                    {draggable && (
                      <div className="flex items-center gap-2 mb-2">
                        <GripVertical className="w-4 h-4 text-neutral-600" />
                      </div>
                    )}

                    {card.labels && card.labels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {card.labels.map((label, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${label.color}20`,
                              color: label.color,
                            }}
                          >
                            {label.text}
                          </span>
                        ))}
                      </div>
                    )}

                    <h4 className="text-sm font-medium text-white mb-2">
                      {card.title}
                    </h4>

                    {card.description && (
                      <p className="text-xs text-neutral-500 mb-3 line-clamp-2">
                        {card.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {card.dueDate && (
                          <span className={`
                            text-xs
                            ${new Date(card.dueDate) < new Date() ? 'text-red-400' : 'text-neutral-500'}
                          `}>
                            {card.dueDate}
                          </span>
                        )}
                        {card.priority && (
                          <Badge 
                            variant={
                              card.priority === 'high' ? 'error' : 
                              card.priority === 'medium' ? 'warning' : 'default'
                            }
                            size="sm"
                          >
                            {card.priority === 'high' ? '高' : card.priority === 'medium' ? '中' : '低'}
                          </Badge>
                        )}
                      </div>

                      {card.assignee && (
                        <div className="flex items-center gap-2">
                          {typeof card.assignee === 'string' ? (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-xs text-white">
                              {card.assignee.charAt(0)}
                            </div>
                          ) : card.assignee}
                        </div>
                      )}
                    </div>

                    {onCardEdit || onCardDelete ? (
                      <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-white/5">
                        {onCardEdit && (
                          <IconButton
                            variant="ghost"
                            size="sm"
                            onClick={() => onCardEdit(card, column.id)}
                          >
                            <span className="text-xs">编辑</span>
                          </IconButton>
                        )}
                        {onCardDelete && (
                          <IconButton
                            variant="ghost"
                            size="sm"
                            onClick={() => onCardDelete(card.id, column.id)}
                          >
                            <X className="w-3 h-3" />
                          </IconButton>
                        )}
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </AnimatePresence>

              {column.cards?.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-neutral-600">暂无卡片</p>
                </div>
              )}
            </div>

            {onCardAdd && (
              <button
                onClick={() => onCardAdd(column.id)}
                className="w-full mt-4 py-2 text-sm text-neutral-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                添加卡片
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
})

Kanban.displayName = 'Kanban'

export default Kanban