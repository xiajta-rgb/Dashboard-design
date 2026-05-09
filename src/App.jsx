import { useState, Suspense, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, PanelRightOpen, PanelRightClose, LayoutGrid } from 'lucide-react'
import { DashboardProvider } from './context/DashboardContext'
import { styles, groupedStyles, getDashboardComponent } from './dashboards'
import { webPages, webPageGroups, groupedWebPages, getWebPageComponent } from './webPages'
import HomePage from './components/HomePage'
import StyleListModal from './components/StyleListModal'
import LayoutLibraryPanel from './components/LayoutLibraryPanel'
import UserDropdown from './components/UserDropdown'
import StyleSpecsPanel from './components/StyleSpecsPanel'
import DesignPage from './design/DesignPage'
import TypographyPage from './design/TypographyPage'
import ColorPage from './design/ColorPage'
import LayoutPage from './design/LayoutPage'
import DesignSystemPage from './design/DesignSystemPage'
import MotionPage from './design/MotionPage'
import ThemePage from './design/ThemePage'
import DataVizPage from './design/DataVizPage'
import RoadmapPage from './design/RoadmapPage'

function App() {
  const [activeStyle, setActiveStyle] = useState(null)
  const [activeWebPage, setActiveWebPage] = useState(null)
  const [activeDesignPage, setActiveDesignPage] = useState(null)
  const [showSpecs, setShowSpecs] = useState(false)
  const [showLayoutLib, setShowLayoutLib] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const mainRef = useRef(null)

  const ActiveDashboard = activeStyle ? getDashboardComponent(activeStyle) : null
  const ActiveWebPage = activeWebPage ? getWebPageComponent(activeWebPage) : null
  const activeStyleData = styles.find(s => s.id === activeStyle)
  const activeWebPageData = webPages.find(p => p.id === activeWebPage)

  const isViewingSomething = activeStyle || activeWebPage
  const isDesignPage = activeDesignPage

  const designPages = {
    'design': DesignPage,
    'typography': TypographyPage,
    'color': ColorPage,
    'layout': LayoutPage,
    'design-system': DesignSystemPage,
    'motion': MotionPage,
    'theme': ThemePage,
    'data-viz': DataVizPage,
    'roadmap': RoadmapPage,
  }

  const ActiveDesignPage = designPages[activeDesignPage]

  const handleBack = useCallback(() => {
    setActiveStyle(null)
    setActiveWebPage(null)
    setShowSpecs(false)
    setShowLayoutLib(false)
  }, [])

  const handleBackFromDesign = useCallback(() => {
    setActiveDesignPage(null)
  }, [])

  useEffect(() => {
    if (!isViewingSomething && !isDesignPage) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isDesignPage) {
          handleBackFromDesign()
        } else {
          handleBack()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isViewingSomething, isDesignPage, handleBack, handleBackFromDesign])

  useEffect(() => {
    if (isViewingSomething && mainRef.current) {
      mainRef.current.focus()
    }
  }, [isViewingSomething])

  if (isDesignPage) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#09090b] flex flex-col" ref={mainRef} tabIndex={-1}>
        <nav className="flex-shrink-0 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl z-50">
          <div className="flex items-center h-11 px-3">
            <button
              onClick={handleBackFromDesign}
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
                Design Knowledge
              </span>
            </div>
            <div className="ml-3 flex items-center gap-0.5 overflow-x-auto flex-1 scrollbar-none" role="tablist" aria-label="页面切换">
              {Object.entries(designPages).map(([key, Component]) => (
                <button
                  key={key}
                  onClick={() => setActiveDesignPage(key)}
                  role="tab"
                  aria-selected={activeDesignPage === key}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
                    activeDesignPage === key
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {key === 'design' && '概览'}
                  {key === 'typography' && '字体库'}
                  {key === 'color' && '色彩科学'}
                  {key === 'layout' && '排版技法'}
                  {key === 'design-system' && '设计系统'}
                  {key === 'motion' && '动效设计'}
                  {key === 'theme' && '主题系统'}
                  {key === 'data-viz' && '数据可视化'}
                  {key === 'roadmap' && '迭代路线图'}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDesignPage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="tabpanel"
            >
              <Suspense fallback={<div className="h-full w-full bg-neutral-900 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" role="status" aria-label="加载中" />
              </div>}>
                {ActiveDesignPage && <ActiveDesignPage />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (!isViewingSomething) {
    return <HomePage onSelectStyle={setActiveStyle} onSelectWebPage={setActiveWebPage} onSelectDesignPage={setActiveDesignPage} />
  }

  if (activeWebPage) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#09090b] flex flex-col" ref={mainRef} tabIndex={-1}>
        <nav className="flex-shrink-0 border-b border-white/[0.06] bg-[#09090b]/80 nav-blur z-50" aria-label="Web页面导航">
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
                Web Design Gallery
              </span>
            </div>
            <div className="ml-3 flex items-center gap-0.5 overflow-x-auto flex-1 scrollbar-none" role="tablist" aria-label="页面切换">
              {Object.entries(groupedWebPages).map(([group, items]) => (
                <div key={group} className="flex items-center gap-0.5 flex-shrink-0">
                  {items.map((page) => (
                    <button
                      key={page.id}
                      onClick={() => setActiveWebPage(page.id)}
                      role="tab"
                      aria-selected={activeWebPage === page.id}
                      aria-label={`切换到 ${page.labelZh} 页面`}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 active:scale-[0.97] ${
                        activeWebPage === page.id
                          ? 'bg-white/10 text-white shadow-sm'
                          : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                      }`}
                    >
                      {page.labelZh}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            {activeWebPageData && <UserDropdown style={activeWebPageData} />}
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto relative" style={{ transform: 'translate3d(0,0,0)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWebPage}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="tabpanel"
              aria-label={`${activeWebPageData?.labelZh || ''} 页面`}
            >
              <Suspense fallback={<div className="h-full w-full bg-neutral-900 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" role="status" aria-label="加载中" /></div>}>
                {ActiveWebPage && <ActiveWebPage />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
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
