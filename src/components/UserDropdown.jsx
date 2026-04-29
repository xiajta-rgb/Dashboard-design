import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { User, LogOut, ChevronDown, LayoutGrid, Paintbrush } from 'lucide-react'
import { isColorDark } from '../utils/colorUtils'

export default function UserDropdown({ style }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const c = style.colors
  const isDark = isColorDark(c.primary)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
        aria-label="用户菜单"
        aria-expanded={open}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})` }}
        >
          <User className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
          Admin
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full mt-1.5 w-48 rounded-xl shadow-xl border overflow-hidden z-[60]"
            style={{
              backgroundColor: isDark ? '#1a1a2e' : '#ffffff',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            }}
          >
            <div className="p-2.5 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})` }}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: isDark ? '#fff' : '#000' }}>Admin User</p>
                  <p className="text-[10px]" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>admin@example.com</p>
                </div>
              </div>
            </div>
            <div className="p-1.5">
              {[
                { icon: User, label: 'Profile' },
                { icon: LayoutGrid, label: 'Dashboard' },
                { icon: Paintbrush, label: 'Appearance' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer"
                  style={{
                    color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="p-1.5 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <button
                onClick={() => setOpen(false)}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-red-400 transition-colors cursor-pointer hover:bg-red-500/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
