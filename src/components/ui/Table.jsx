import { forwardRef, useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Checkbox from './Checkbox'
import Badge from './Badge'
import Button from './Button'
import IconButton from './IconButton'

const Table = forwardRef(({
  columns = [],
  data = [],
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  sortable = true,
  filterable = false,
  pagination = false,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  loading = false,
  emptyText = '暂无数据',
  className = '',
  ...props
}, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [filterQuery, setFilterQuery] = useState('')
  const [expandedRows, setExpandedRows] = useState([])

  const filteredData = useMemo(() => {
    let result = [...data]

    if (filterQuery && filterable) {
      result = result.filter(row => {
        return columns.some(col => {
          const value = row[col.key]
          if (value == null) return false
          return String(value).toLowerCase().includes(filterQuery.toLowerCase())
        })
      })
    }

    if (sortColumn && sortable) {
      result.sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]

        if (aVal == null) return 1
        if (bVal == null) return -1

        let comparison = 0
        if (typeof aVal === 'string') {
          comparison = aVal.localeCompare(bVal)
        } else if (typeof aVal === 'number') {
          comparison = aVal - bVal
        } else if (aVal instanceof Date && bVal instanceof Date) {
          comparison = aVal.getTime() - bVal.getTime()
        } else {
          comparison = String(aVal).localeCompare(String(bVal))
        }

        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return result
  }, [data, filterQuery, sortColumn, sortDirection, columns, filterable, sortable])

  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, pagination, currentPage, pageSize])

  const totalPages = Math.ceil(filteredData.length / pageSize)

  const handleSort = (columnKey) => {
    if (!sortable) return
    const column = columns.find(c => c.key === columnKey)
    if (column && column.sortable === false) return

    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(paginatedData.map((row, idx) => row.id || row.key || idx))
    }
  }

  const handleSelectRow = (rowId) => {
    if (selectedRows.includes(rowId)) {
      onSelectionChange(selectedRows.filter(id => id !== rowId))
    } else {
      onSelectionChange([...selectedRows, rowId])
    }
  }

  const handleExpandRow = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter(id => id !== rowId))
    } else {
      setExpandedRows([...expandedRows, rowId])
    }
  }

  const getSortIcon = (columnKey) => {
    if (sortColumn !== columnKey) {
      return <ChevronsUpDown className="w-4 h-4 text-neutral-500" />
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-violet-400" />
      : <ChevronDown className="w-4 h-4 text-violet-400" />
  }

  return (
    <div ref={ref} className={`w-full ${className}`} {...props}>
      {filterable && (
        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="搜索..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-800/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 focus:bg-white/5"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full">
          <thead className="bg-neutral-900/50">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
                    onChange={handleSelectAll}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < paginatedData.length}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={
                    'px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider' +
                    (column.sortable !== false && sortable ? ' cursor-pointer select-none hover:text-white' : '')
                  }
                  style={{ width: column.width }}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sortable !== false && sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {selectable && <td className="px-4 py-3"><div className="w-5 h-5 bg-neutral-800 rounded" /></td>}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 bg-neutral-800 rounded w-24" />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center">
                      <Search className="w-6 h-6 text-neutral-500" />
                    </div>
                    <p className="text-neutral-400">{emptyText}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowId = row.id || row.key || rowIndex
                const isSelected = selectedRows.includes(rowId)
                const isExpanded = expandedRows.includes(rowId)

                return (
                  <motion.tr
                    key={rowId}
                    initial={prefersReducedMotion ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: rowIndex * 0.02 }}
                    className={
                      'transition-colors' +
                      (isSelected ? ' bg-violet-500/10' : ' hover:bg-white/5')
                    }
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleSelectRow(rowId)}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const CellComponent = column.render || ((value) => value)
                      const cellValue = row[column.key]
                      const tdClass = 'px-4 py-3'

                      if (column.expandable) {
                        return (
                          <td key={column.key} className={tdClass}>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleExpandRow(rowId)}
                                className="hover:bg-white/10 rounded transition-colors"
                              >
                                <ChevronDown className={'w-4 h-4 text-neutral-400 transition-transform' + (isExpanded ? '' : ' -rotate-90')} />
                              </button>
                              <span className={column.className || ''}>
                                {CellComponent(cellValue, row)}
                              </span>
                            </div>
                          </td>
                        )
                      }

                      return (
                        <td key={column.key} className={tdClass}>
                          <span className={column.className || ''}>
                            {CellComponent(cellValue, row)}
                          </span>
                        </td>
                      )
                    })}
                  </motion.tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-neutral-400">
            显示 {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, filteredData.length)} 条，共 {filteredData.length} 条
          </p>
          <div className="flex items-center gap-2">
            <IconButton
              variant="ghost"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </IconButton>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={
                    'w-8 h-8 rounded-lg text-sm font-medium transition-colors' +
                    (currentPage === pageNum ? ' bg-violet-500 text-white' : ' text-neutral-400 hover:bg-white/10')
                  }
                >
                  {pageNum}
                </button>
              )
            })}
            <IconButton
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  )
})

Table.displayName = 'Table'

export default Table