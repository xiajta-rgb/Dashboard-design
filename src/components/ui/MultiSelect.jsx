import { forwardRef, useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Check, Search, X, Plus } from 'lucide-react'

const MultiSelect = forwardRef(({
  value = [],
  onChange,
  options = [],
  placeholder = '选择选项',
  searchable = false,
  clearable = false,
  maxSelections,
  disabled = false,
  error,
  className = '',
  containerClassName = '',
  id,
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef(null)
  const searchInputRef = useRef(null)

  const inputId = id || `multiselect-${Math.random().toString(36).substr(2, 9)}`
  const listboxId = `${inputId}-listbox`

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options
    const query = searchQuery.toLowerCase()
    return options.filter(option => 
      option.label.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query)
    )
  }, [options, searchQuery])

  const selectedOptions = useMemo(() => {
    return options.filter(opt => value.includes(opt.value))
  }, [options, value])

  const availableOptions = useMemo(() => {
    return filteredOptions.filter(opt => !value.includes(opt.value))
  }, [filteredOptions, value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  const handleKeyDown = (event) => {
    if (disabled) return

    switch (event.key) {
      case 'Enter':
        if (isOpen && highlightedIndex >= 0) {
          if (highlightedIndex < availableOptions.length) {
            handleSelect(availableOptions[highlightedIndex])
          }
        } else {
          setIsOpen(true)
        }
        break
      case ' ':
        event.preventDefault()
        if (isOpen && highlightedIndex >= 0) {
          if (highlightedIndex < availableOptions.length) {
            handleSelect(availableOptions[highlightedIndex])
          }
        } else {
          setIsOpen(true)
        }
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev => 
            prev < availableOptions.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'Backspace':
        if (!searchQuery && selectedOptions.length > 0) {
          handleRemove(selectedOptions[selectedOptions.length - 1].value)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchQuery('')
        break
      case 'Tab':
        setIsOpen(false)
        setSearchQuery('')
        break
    }
  }

  const handleSelect = (option) => {
    if (maxSelections && value.length >= maxSelections) return
    onChange?.([...value, option.value])
  }

  const handleRemove = (optionValue) => {
    onChange?.(value.filter(v => v !== optionValue))
  }

  const handleClearAll = () => {
    onChange?.([])
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setHighlightedIndex(0)
  }

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      <button
        ref={ref}
        type="button"
        id={inputId}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          w-full flex items-center justify-between gap-2
          px-4 py-2.5 rounded-xl
          bg-white/5 border
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-neutral-950
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error 
            ? 'border-red-500/50 focus:border-red-500' 
            : 'border-white/10 focus:border-white/30 focus:bg-white/10'
          }
          ${className}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap">
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions.slice(0, 3).map(opt => (
                <span 
                  key={opt.value}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-violet-500/20 text-violet-400 rounded-lg text-sm"
                >
                  {opt.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemove(opt.value)
                    }}
                    className="hover:bg-violet-500/30 rounded transition-colors"
                    aria-label={`移除 ${opt.label}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedOptions.length > 3 && (
                <span className="px-2 py-1 text-sm text-neutral-500">
                  +{selectedOptions.length - 3} 更多
                </span>
              )}
            </>
          ) : (
            <span className="text-neutral-500">{placeholder}</span>
          )}
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          {clearable && selectedOptions.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleClearAll()
              }}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="清除所有选择"
            >
              <X className="w-3 h-3 text-neutral-400" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {maxSelections && (
        <p className="mt-1.5 text-xs text-neutral-500">
          已选择 {value.length}/{maxSelections}
        </p>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div className="bg-neutral-900 rounded-xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
              {searchable && (
                <div className="p-2 border-b border-white/5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="搜索..."
                      className="w-full pl-9 pr-3 py-2 bg-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                  </div>
                </div>
              )}

              <ul
                id={listboxId}
                role="listbox"
                aria-labelledby={inputId}
                aria-multiselectable="true"
                className="max-h-60 overflow-y-auto py-1"
              >
                {availableOptions.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-neutral-500 text-center">
                    未找到匹配选项
                  </li>
                ) : (
                  availableOptions.map((option, index) => (
                    <li
                      key={option.value}
                      id={`${listboxId}-${index}`}
                      role="option"
                      aria-selected={value.includes(option.value)}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors
                        ${highlightedIndex === index ? 'bg-white/10' : ''}
                        ${value.includes(option.value) ? 'bg-violet-500/20 text-violet-400' : 'text-white'}
                        ${maxSelections && value.length >= maxSelections ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <span className={`
                        w-5 h-5 rounded border flex items-center justify-center flex-shrink-0
                        ${value.includes(option.value) 
                          ? 'bg-violet-500 border-violet-500' 
                          : 'border-white/30'
                        }
                      `}>
                        {value.includes(option.value) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </span>
                      {option.icon && (
                        <span className="flex-shrink-0">{option.icon}</span>
                      )}
                      <span className="flex-1">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-neutral-500">{option.description}</span>
                      )}
                    </li>
                  ))
                )}
              </ul>

              {selectedOptions.length > 0 && (
                <div className="p-2 border-t border-white/5">
                  <p className="text-xs text-neutral-500 mb-2">已选择 ({selectedOptions.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOptions.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleRemove(opt.value)}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-violet-500/20 text-violet-400 rounded-lg text-xs hover:bg-violet-500/30 transition-colors"
                      >
                        {opt.label}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

MultiSelect.displayName = 'MultiSelect'

export default MultiSelect