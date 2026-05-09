import { forwardRef, useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, Check, Search, X } from 'lucide-react'

const Select = forwardRef(({
  value,
  onChange,
  options = [],
  placeholder = '选择选项',
  searchable = false,
  clearable = false,
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

  const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`
  const listboxId = `${inputId}-listbox`

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options
    const query = searchQuery.toLowerCase()
    return options.filter(option => 
      option.label.toLowerCase().includes(query) ||
      option.value.toLowerCase().includes(query)
    )
  }, [options, searchQuery])

  const selectedOption = options.find(opt => opt.value === value)

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

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
      const element = document.getElementById(`${listboxId}-${highlightedIndex}`)
      element?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex, isOpen, filteredOptions.length])

  const handleKeyDown = (event) => {
    if (disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (isOpen && highlightedIndex >= 0) {
          event.preventDefault()
          handleSelect(filteredOptions[highlightedIndex])
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
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
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
    onChange?.(option.value)
    setIsOpen(false)
    setSearchQuery('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange?.('')
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
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedOption?.icon && (
            <span className="flex-shrink-0">{selectedOption.icon}</span>
          )}
          <span className={`truncate ${selectedOption ? 'text-white' : 'text-neutral-500'}`}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          {clearable && selectedOption && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="清除选择"
            >
              <X className="w-3 h-3 text-neutral-400" />
            </button>
          )}
          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

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
                className="max-h-60 overflow-y-auto py-1"
              >
                {filteredOptions.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-neutral-500 text-center">
                    未找到匹配选项
                  </li>
                ) : (
                  filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      id={`${listboxId}-${index}`}
                      role="option"
                      aria-selected={option.value === value}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`
                        flex items-center gap-2 px-4 py-2.5 cursor-pointer transition-colors
                        ${highlightedIndex === index ? 'bg-white/10' : ''}
                        ${option.value === value ? 'bg-violet-500/20 text-violet-400' : 'text-white'}
                      `}
                    >
                      {option.icon && (
                        <span className="flex-shrink-0">{option.icon}</span>
                      )}
                      <span className="flex-1">{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-neutral-500">{option.description}</span>
                      )}
                      {option.value === value && (
                        <Check className="w-4 h-4 text-violet-400" />
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

Select.displayName = 'Select'

export default Select