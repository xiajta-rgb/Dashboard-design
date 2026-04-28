import { useState, Suspense, lazy } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ExternalLink, X, BookOpen, Zap, Palette, Sparkles, Layers, Code } from 'lucide-react'

// Lazy load all dashboard components
const DashboardImports = {
  glassmorphism: () => import('./dashboards/GlassmorphismDashboard'),
  bento: () => import('./dashboards/BentoDashboard'),
  neumorphism: () => import('./dashboards/NeumorphismDashboard'),
  'dark-premium': () => import('./dashboards/DarkPremiumDashboard'),
  gradient: () => import('./dashboards/GradientDashboard'),
  minimal: () => import('./dashboards/MinimalDashboard'),
  linear: () => import('./dashboards/LinearDashboard'),
  claymorphism: () => import('./dashboards/ClaymorphismDashboard'),
  hud: () => import('./dashboards/HUDDashboard'),
  aurora: () => import('./dashboards/AuroraDashboard'),
  swiss: () => import('./dashboards/SwissDashboard'),
  spatial: () => import('./dashboards/SpatialDashboard'),
  neubrutalism: () => import('./dashboards/NeubrutalismDashboard'),
  sketch: () => import('./dashboards/SketchDashboard'),
  'liquid-glass': () => import('./dashboards/LiquidGlassDashboard'),
  'material3': () => import('./dashboards/Material3Dashboard'),
  'retro-terminal': () => import('./dashboards/RetroTerminalDashboard'),
  stripe: () => import('./dashboards/StripePremiumDashboard'),
}

const dashboardComponents = {
  glassmorphism: lazy(DashboardImports['glassmorphism']),
  bento: lazy(DashboardImports['bento']),
  neumorphism: lazy(DashboardImports['neumorphism']),
  'dark-premium': lazy(DashboardImports['dark-premium']),
  gradient: lazy(DashboardImports['gradient']),
  minimal: lazy(DashboardImports['minimal']),
  linear: lazy(DashboardImports['linear']),
  claymorphism: lazy(DashboardImports['claymorphism']),
  hud: lazy(DashboardImports['hud']),
  aurora: lazy(DashboardImports['aurora']),
  swiss: lazy(DashboardImports['swiss']),
  spatial: lazy(DashboardImports['spatial']),
  neubrutalism: lazy(DashboardImports['neubrutalism']),
  sketch: lazy(DashboardImports['sketch']),
  'liquid-glass': lazy(DashboardImports['liquid-glass']),
  'material3': lazy(DashboardImports['material3']),
  'retro-terminal': lazy(DashboardImports['retro-terminal']),
  stripe: lazy(DashboardImports['stripe']),
}

// Eagerly loaded dashboards for preview rendering
import GlassmorphismDashboard from './dashboards/GlassmorphismDashboard'
import BentoDashboard from './dashboards/BentoDashboard'
import NeumorphismDashboard from './dashboards/NeumorphismDashboard'
import DarkPremiumDashboard from './dashboards/DarkPremiumDashboard'
import GradientDashboard from './dashboards/GradientDashboard'
import MinimalDashboard from './dashboards/MinimalDashboard'
import LinearDashboard from './dashboards/LinearDashboard'
import ClaymorphismDashboard from './dashboards/ClaymorphismDashboard'
import HUDDashboard from './dashboards/HUDDashboard'
import AuroraDashboard from './dashboards/AuroraDashboard'
import SwissDashboard from './dashboards/SwissDashboard'
import SpatialDashboard from './dashboards/SpatialDashboard'
import NeubrutalismDashboard from './dashboards/NeubrutalismDashboard'
import SketchDashboard from './dashboards/SketchDashboard'
import LiquidGlassDashboard from './dashboards/LiquidGlassDashboard'
import Material3Dashboard from './dashboards/Material3Dashboard'
import RetroTerminalDashboard from './dashboards/RetroTerminalDashboard'
import StripePremiumDashboard from './dashboards/StripePremiumDashboard'

const previewComponents = {
  glassmorphism: GlassmorphismDashboard,
  bento: BentoDashboard,
  neumorphism: NeumorphismDashboard,
  'dark-premium': DarkPremiumDashboard,
  gradient: GradientDashboard,
  minimal: MinimalDashboard,
  linear: LinearDashboard,
  claymorphism: ClaymorphismDashboard,
  hud: HUDDashboard,
  aurora: AuroraDashboard,
  swiss: SwissDashboard,
  spatial: SpatialDashboard,
  neubrutalism: NeubrutalismDashboard,
  sketch: SketchDashboard,
  'liquid-glass': LiquidGlassDashboard,
  'material3': Material3Dashboard,
  'retro-terminal': RetroTerminalDashboard,
  stripe: StripePremiumDashboard,
}

const styles = [
  { id: 'glassmorphism', label: 'Glassmorphism', group: 'Modern', description: 'Frosted glass, translucent layers, depth through blur', descriptionZh: '毛玻璃效果，半透明层次，模糊深度' },
  { id: 'bento', label: 'Bento Grid', group: 'Modern', description: 'Modular asymmetric grid, spatial hierarchy', descriptionZh: '模块化非对称网格，空间层次' },
  { id: 'neumorphism', label: 'Neumorphism', group: 'Modern', description: 'Soft UI, extruded elements, tactile depth', descriptionZh: '柔软UI，凸出元素，触感深度' },
  { id: 'dark-premium', label: 'Dark Premium', group: 'Modern', description: 'Deep blacks, subtle accents, refined contrast', descriptionZh: '深黑底色，微妙点缀，精致对比' },
  { id: 'gradient', label: 'Gradient Vibrant', group: 'Modern', description: 'Refined gradients, balanced color, dynamic energy', descriptionZh: '克制的渐变，平衡色彩，动态活力' },
  { id: 'minimal', label: 'Minimal Clean', group: 'Modern', description: 'Pure whitespace, restrained elegance, clarity', descriptionZh: '纯净留白，克制的优雅，最大化清晰' },
  { id: 'linear', label: 'Linear', group: 'SaaS', description: 'Precision borders, restrained palette, SaaS standard', descriptionZh: '精密边框，克制配色，SaaS行业标准' },
  { id: 'stripe', label: 'Stripe Premium', group: 'SaaS', description: 'Industry benchmark, polished micro-interactions', descriptionZh: '行业标杆，精致的微交互' },
  { id: 'material3', label: 'Material 3', group: 'SaaS', description: 'Google M3 Expressive, rounded containers', descriptionZh: 'Google M3表达性设计，圆角容器' },
  { id: 'claymorphism', label: 'Claymorphism', group: 'Niche', description: '3D rounded cards, warm tones, friendly feel', descriptionZh: '3D圆角卡片，温暖色调，友好质感' },
  { id: 'neubrutalism', label: 'Neubrutalism', group: 'Niche', description: 'Bold borders, solid shadows, high contrast', descriptionZh: '粗边框，实心阴影，高对比度' },
  { id: 'sketch', label: 'Sketch', group: 'Niche', description: 'Hand-drawn feel, paper texture, approachable', descriptionZh: '手绘风格，纸张质感，平易近人' },
  { id: 'hud', label: 'HUD / Sci-Fi', group: 'Niche', description: 'Futuristic interface, monochrome cyan, technical', descriptionZh: '未来界面，单色青色，技术美学' },
  { id: 'retro-terminal', label: 'Retro Terminal', group: 'Niche', description: 'CRT phosphor green, scanlines, vintage tech', descriptionZh: 'CRT磷光绿，扫描线，复古科技' },
  { id: 'aurora', label: 'Aurora', group: 'Advanced', description: 'Flowing aurora light bands, premium atmosphere', descriptionZh: '流动极光光带，高端氛围感' },
  { id: 'liquid-glass', label: 'Liquid Glass', group: 'Advanced', description: 'Apple WWDC25 liquid glass, refined frosted glass', descriptionZh: 'Apple WWDC25液态玻璃，精致毛玻璃' },
  { id: 'swiss', label: 'Swiss Modern', group: 'Advanced', description: 'Strict grid, bold typography, information density', descriptionZh: '严格网格，粗体排版，高信息密度' },
  { id: 'spatial', label: 'Spatial UI', group: 'Advanced', description: 'Depth layers, floating elements, perspective', descriptionZh: '深度层次，浮动元素，透视效果' },
]

const groupedStyles = styles.reduce((acc, style) => {
  if (!acc[style.group]) acc[style.group] = []
  acc[style.group].push(style)
  return acc
}, {})

const categoryDescriptions = {
  Modern: {
    en: 'Foundational styles with wide applicability',
    zh: '基础风格，应用广泛',
    icon: Zap,
    color: 'from-violet-500 to-purple-500',
  },
  SaaS: {
    en: 'Industry-standard styles for SaaS products',
    zh: 'SaaS产品的行业标准风格',
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
  },
  Niche: {
    en: 'Specialized styles for unique use cases',
    zh: '独特用例的专业风格',
    icon: Palette,
    color: 'from-amber-500 to-orange-500',
  },
  Advanced: {
    en: 'Cutting-edge styles pushing design boundaries',
    zh: '突破设计边界的前沿风格',
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-500',
  },
}

function StyleListModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-neutral-900 border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Style Guide</h2>
                <p className="text-sm text-neutral-400">风格指南 / 18 Styles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(85vh-100px)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedStyles).map(([group, items]) => {
                const info = categoryDescriptions[group]
                const Icon = info.icon
                return (
                  <motion.div
                    key={group}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <div className={`p-4 bg-gradient-to-r ${info.color}`}>
                      <div className="flex items-center gap-2 text-white">
                        <Icon className="w-5 h-5" />
                        <h3 className="font-semibold">{group}</h3>
                        <span className="ml-auto text-sm opacity-80">{items.length} styles</span>
                      </div>
                      <p className="text-xs text-white/80 mt-1">{info.en}</p>
                      <p className="text-xs text-white/60 mt-0.5">{info.zh}</p>
                    </div>
                    <div className="p-4 space-y-3">
                      {items.map((style, i) => (
                        <div
                          key={style.id}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-mono text-neutral-400 flex-shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">{style.label}</h4>
                            <p className="text-xs text-neutral-400 truncate">{style.description}</p>
                            <p className="text-xs text-neutral-500 truncate">{style.descriptionZh}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Technical Stack / 技术栈</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Built with React 18 + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide React.
                    All dashboards are fully interactive with real charts, tables, and animations.
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    使用 React 18 + Vite + Tailwind CSS + Framer Motion + Recharts + Lucide React 构建。
                    所有仪表盘都具有真实的图表、表格和动画效果。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function StyleCard({ style, onClick, index }) {
  const PreviewComponent = previewComponents[style.id]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/50 hover:-translate-y-1"
    >
      {/* Preview area - renders actual dashboard scaled down */}
      <div className="relative overflow-hidden bg-neutral-900 aspect-video">
        <div className="w-[1600px] h-[1000px] absolute top-0 left-0 pointer-events-none"
             style={{ transform: 'scale(0.25)', transformOrigin: 'top left' }}>
          <Suspense fallback={<div className="w-full h-full bg-neutral-800" />}>
            <PreviewComponent />
          </Suspense>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center z-10">
          <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Style ID badge */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[9px] text-white/40 font-mono bg-black/30 px-1.5 py-0.5 rounded">{style.id}</span>
        </div>
      </div>

      {/* Card info */}
      <div className="p-3 bg-neutral-900">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-white">{style.label}</h3>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
        <p className="text-[11px] text-neutral-500 leading-relaxed">{style.description}</p>
        <div className="mt-2">
          <span className="text-[9px] text-neutral-600 font-mono uppercase tracking-wider">{style.group}</span>
        </div>
      </div>
    </motion.div>
  )
}

function HomePage({ onSelectStyle }) {
  const [showStyleList, setShowStyleList] = useState(false)

  const categoryIcons = {
    Modern: <Zap className="w-4 h-4" />,
    SaaS: <Layers className="w-4 h-4" />,
    Niche: <Palette className="w-4 h-4" />,
    Advanced: <Sparkles className="w-4 h-4" />,
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500" />
            <h1 className="font-display font-bold text-3xl text-white tracking-tight">
              Dashboard Gallery
            </h1>
          </div>
          <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
            {styles.length} professional dashboard designs across 4 categories. Click any card to explore the full interactive dashboard.
          </p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            onClick={() => setShowStyleList(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            Style Guide / 风格指南
          </motion.button>
        </motion.div>

        {/* Style groups */}
        {Object.entries(groupedStyles).map(([group, items], groupIndex) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 + 0.2, duration: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.15em]">{group}</h2>
              <div className="flex-1 h-px bg-neutral-800" />
              <span className="text-[10px] text-neutral-600 font-mono">{items.length} styles</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((style, i) => (
                <StyleCard
                  key={style.id}
                  style={style}
                  onClick={() => onSelectStyle(style.id)}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-neutral-800"
        >
          <p className="text-[10px] text-neutral-600">
            Built with React, Tailwind CSS, Framer Motion & Recharts
          </p>
        </motion.div>
      </div>

      <StyleListModal isOpen={showStyleList} onClose={() => setShowStyleList(false)} />
    </div>
  )
}

function App() {
  const [activeStyle, setActiveStyle] = useState(null)
  const ActiveDashboard = activeStyle ? dashboardComponents[activeStyle] : null

  if (!activeStyle) {
    return <HomePage onSelectStyle={setActiveStyle} />
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-neutral-950 flex flex-col">
      {/* Back button */}
      <nav className="flex-shrink-0 border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl z-50">
        <div className="flex items-center h-10 px-4">
          <button
            onClick={() => setActiveStyle(null)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Gallery
          </button>
          <div className="w-px h-4 bg-neutral-800 mx-3" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-violet-500 to-cyan-500" />
            <span className="font-display font-semibold text-white text-sm tracking-tight">
              Dashboard Gallery
            </span>
          </div>
          <div className="ml-4 flex items-center gap-2">
            {Object.entries(groupedStyles).map(([group, items]) => (
              <div key={group} className="flex items-center gap-0.5">
                {items.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setActiveStyle(style.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      activeStyle === style.id
                        ? 'bg-white/15 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <ActiveDashboard />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
