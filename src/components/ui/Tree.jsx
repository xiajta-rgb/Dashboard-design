import { forwardRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, Plus, Trash2, Edit2 } from 'lucide-react'
import IconButton from './IconButton'

const Tree = forwardRef(({
  data = [],
  selectedId,
  onSelect,
  expandedIds = [],
  onExpand,
  selectable = true,
  showLine = false,
  className = '',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()

  const handleToggle = (nodeId) => {
    if (onExpand) {
      if (expandedIds.includes(nodeId)) {
        onExpand(expandedIds.filter(id => id !== nodeId))
      } else {
        onExpand([...expandedIds, nodeId])
      }
    }
  }

  const renderNode = (node, level = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedIds.includes(node.id)
    const isSelected = selectedId === node.id
    const isLeaf = !hasChildren

    return (
      <div key={node.id}>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            group flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer
            transition-colors select-none
            ${isSelected ? 'bg-violet-500/20 text-violet-400' : 'hover:bg-white/5'}
          `}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onClick={() => {
            if (selectable) {
              onSelect?.(node)
            }
            if (hasChildren) {
              handleToggle(node.id)
            }
          }}
        >
          {showLine && (
            <div 
              className="absolute left-0 top-0 bottom-0 w-px bg-white/10"
              style={{ marginLeft: `${level * 20}px` }}
            />
          )}

          {hasChildren ? (
            <span className="text-neutral-500">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          ) : (
            <span className="w-4" />
          )}

          <span className="flex-shrink-0">
            {node.icon || (hasChildren ? (
              isExpanded ? (
                <FolderOpen className="w-4 h-4 text-amber-400" />
              ) : (
                <Folder className="w-4 h-4 text-amber-400" />
              )
            ) : (
              <File className="w-4 h-4 text-neutral-500" />
            ))}
          </span>

          <span className="flex-1 text-sm truncate">
            {node.label}
          </span>

          {node.count !== undefined && (
            <span className="text-xs text-neutral-500">
              {node.count}
            </span>
          )}

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {node.actions?.map((action, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  action.onClick(node)
                }}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {action.icon === 'add' && <Plus className="w-3 h-3" />}
                {action.icon === 'delete' && <Trash2 className="w-3 h-3" />}
                {action.icon === 'edit' && <Edit2 className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {node.children.map(child => renderNode(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div ref={ref} className={`space-y-1 ${className}`} {...props}>
      {data.length === 0 ? (
        <div className="py-8 text-center">
          <Folder className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
          <p className="text-sm text-neutral-500">暂无数据</p>
        </div>
      ) : (
        data.map(node => renderNode(node))
      )}
    </div>
  )
})

Tree.displayName = 'Tree'

export default Tree