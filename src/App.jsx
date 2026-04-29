import { useState, Suspense, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, PanelRightOpen, PanelRightClose, LayoutGrid } from 'lucide-react'
import { DashboardProvider } from './context/DashboardContext'
import { styles, groupedStyles, getDashboardComponent } from './dashboards'
import HomePage from './components/HomePage'
import StyleListModal from './components/StyleListModal'
import LayoutLibraryPanel from './components/LayoutLibraryPanel'
import UserDropdown from './components/UserDropdown'
import StyleSpecsPanel from './components/StyleSpecsPanel'

function App() {
  const [activeStyle, setActiveStyle] = useState(null)
  const [showSpecs, setShowSpecs] = useState(false)
  const [showLayoutLib, setShowLayoutLib] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const mainRef = useRef(null)

  const ActiveDashboard = activeStyle ? getDashboardComponent(activeStyle) : null
  const activeStyleData = styles.find(s => s.id === activeStyle)

  const handleBack = useCallback(() => {
    setActiveStyle(null)
    setShowSpecs(false)
    setShowLayoutLib(false)
  }, [])

  useEffect(() => {
    if (!activeStyle) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleBack()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeStyle, handleBack])

  useEffect(() => {
    if (activeStyle && mainRef.current) {
      mainRef.current.focus()
    }
  }, [activeStyle])

  if (!activeStyle) {
    return <HomePage onSelectStyle={setActiveStyle} />
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#09090b] flex flex-col" ref={mainRef} tabIndex={-1}>
      <nav className="flex-shrink-0 border-b border-white/[0.06] bg-[#09090b]/80 nav-blur z-50" aria-label="仪表盘导航">
        <div className="flex items-center h-11 px-3">
          <button
            onClick={handleBack}
            aria-label="返回画廊"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97]"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Gallery
          </button>
          <div className="w-px h-4 bg-white/10 mx-2" aria-hidden="true" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-violet-500 to-cyan-500" aria-hidden="true" />
            <span className="font-display font-semibold text-white text-sm tracking-tight">
              Dashboard Gallery
            </span>
          </div>
          <div className="ml-3 flex items-center gap-0.5 overflow-x-auto flex-1 scrollbar-none" role="tablist" aria-label="风格切换">
            {Object.entries(groupedStyles).map(([group, items]) => (
              <div key={group} className="flex items-center gap-0.5 flex-shrink-0">
                {items.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setActiveStyle(style.id)}
                    role="tab"
                    aria-selected={activeStyle === style.id}
                    aria-label={`切换到 ${style.label} 风格`}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
                      activeStyle === style.id
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            aria-label={showSpecs ? '隐藏设计规范面板' : '显示设计规范面板'}
            aria-expanded={showSpecs}
            className={`ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
              showSpecs ? 'bg-violet-500/15 text-violet-400 border border-violet-500/25' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            {showSpecs ? <PanelRightClose className="w-3.5 h-3.5" aria-hidden="true" /> : <PanelRightOpen className="w-3.5 h-3.5" aria-hidden="true" />}
            设计规范
          </button>
          <button
            onClick={() => setShowLayoutLib(!showLayoutLib)}
            aria-label={showLayoutLib ? '关闭标准化布局库' : '打开标准化布局库'}
            aria-expanded={showLayoutLib}
            className={`ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
              showLayoutLib ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5 border border-transparent'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
            布局库
          </button>
          {activeStyleData && <UserDropdown style={activeStyleData} />}
        </div>
      </nav>

      <div className="flex-1 overflow-hidden relative flex">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full flex-1 relative"
            role="tabpanel"
            aria-label={`${activeStyleData?.label || ''} 仪表盘`}
          >
            <DashboardProvider openLayoutLib={() => setShowLayoutLib(true)}>
              <Suspense fallback={<div className="h-full w-full bg-neutral-900 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" role="status" aria-label="加载中" /></div>}>
                {ActiveDashboard && <ActiveDashboard />}
              </Suspense>
            </DashboardProvider>
            {activeStyleData && (
              <LayoutLibraryPanel
                style={activeStyleData}
                isOpen={showLayoutLib}
                onClose={() => setShowLayoutLib(false)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showSpecs && activeStyleData && (
            <motion.aside
              initial={prefersReducedMotion ? { opacity: 0 } : { width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { width: 0, opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-full overflow-y-auto border-l border-white/[0.06] bg-[#0c0c0e]/95 nav-blur flex-shrink-0"
              aria-label="设计规范面板"
            >
              <StyleSpecsPanel style={activeStyleData} />
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
