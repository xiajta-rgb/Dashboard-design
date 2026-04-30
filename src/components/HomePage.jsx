import { useState, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Copy, Zap, Palette, Sparkles, Layers, Globe, ExternalLink, ArrowRight, Check } from 'lucide-react'
import { styles, groupedStyles } from '../dashboards'
import { webPages, webPageGroups, groupedWebPages, getWebPageComponent } from '../webPages'
import { categoryDescriptions } from '../data/categoryData'
import { copyToClipboard } from '../utils/colorUtils'
import { generateStylePrompt } from '../utils/styleGenerator'
import { styleKeywords } from '../data/categoryData'
import StyleCard from './StyleCard'
import StyleListModal from './StyleListModal'

const webPageIcons = {
  'portfolio': Layers,
  'resume': BookOpen,
  'business-card': Zap,
  'landing-page': Sparkles,
  'official-homepage': Globe,
}

const webPageGradients = {
  'portfolio': 'from-violet-500/20 to-indigo-500/20',
  'resume': 'from-blue-500/20 to-cyan-500/20',
  'business-card': 'from-amber-500/20 to-yellow-500/20',
  'landing-page': 'from-purple-500/20 to-pink-500/20',
  'official-homepage': 'from-indigo-500/20 to-blue-500/20',
}

function WebPageCard({ page, onClick, index }) {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const PreviewComponent = getWebPageComponent(page.id)

  const handleCopy = (e) => {
    e.stopPropagation()
    const text = generateStylePrompt(page, styleKeywords)
    copyToClipboard(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: prefersReducedMotion ? 0.1 : 0.3 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`查看 ${page.labelZh} 页面详情`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      className="group card-shine glow-border cursor-pointer rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 active:scale-[0.98]"
    >
      <div className="relative overflow-hidden bg-neutral-900 aspect-video">
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-[1280px] h-[800px] origin-top-left"
               style={{ transform: 'scale(0.3125)' }}>
            <Suspense fallback={<div className="w-full h-full bg-neutral-800" />}>
              {PreviewComponent && <PreviewComponent />}
            </Suspense>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center z-10">
          <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
        </div>

        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[10px] text-white/50 font-mono bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">{page.id}</span>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? '已复制风格代码' : `复制 ${page.labelZh} 风格代码`}
          className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
            copied
              ? 'bg-emerald-500/90 text-white'
              : 'bg-black/50 text-white/70 backdrop-blur-sm hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="p-3.5 bg-[#0c0c0e]">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-sm font-semibold text-white">{page.labelZh}</h3>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed mb-2.5 line-clamp-2">{page.descriptionZh}</p>
        <div className="flex items-center gap-1.5 mb-3">
          {page.useCases.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[10px] text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">{page.group}</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5" aria-label={`复杂度 ${page.complexity}/5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i <= page.complexity ? 'bg-violet-500' : 'bg-white/[0.06]'}`} />
              ))}
            </div>
            <div className="w-px h-3 bg-white/[0.06]" aria-hidden="true" />
            <div className="flex items-center gap-0.5" aria-label="色彩搭配">
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: page.colors.primary }} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: page.colors.secondary }} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: page.colors.accent }} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: page.colors.highlight }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage({ onSelectStyle, onSelectWebPage }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showStyleList, setShowStyleList] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const categoryGradients = {
    Modern: 'from-violet-500/20 to-purple-500/20',
    SaaS: 'from-blue-500/20 to-cyan-500/20',
    Niche: 'from-amber-500/20 to-orange-500/20',
    Advanced: 'from-emerald-500/20 to-teal-500/20',
    Eastern: 'from-rose-500/20 to-pink-500/20',
    Scientific: 'from-cyan-500/20 to-blue-500/20',
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', labelZh: '仪表盘', icon: Layers },
    { id: 'web-design', label: 'Web Design', labelZh: 'Web页面设计', icon: Globe },
  ]

  return (
    <div className="h-full w-full overflow-y-auto bg-[#09090b]">
      <div className="hero-gradient min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.header
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25 mb-8 animate-float"
            />

            <h1 className="font-display font-bold text-5xl sm:text-6xl text-white tracking-tight mb-4">
              Design{' '}
              <span className="text-gradient">Gallery</span>
            </h1>

            <p className="text-neutral-400 text-base max-w-xl mx-auto mb-6 leading-relaxed">
              {activeTab === 'dashboard'
                ? `${styles.length} professional dashboard designs across 6 categories. Click any card to explore the full interactive dashboard.`
                : `${webPages.length} representative web page designs. From portfolios to landing pages, each showcases professional UI design.`
            }
            </p>

            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                {tabs.map(tab => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-white/10 text-white shadow-sm'
                          : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.labelZh}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {tab.id === 'dashboard' ? styles.length : webPages.length}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {activeTab === 'dashboard' && (
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.3 }}
                  onClick={() => setShowStyleList(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200 text-sm font-semibold shadow-lg shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 cursor-pointer active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  风格指南
                </motion.button>

                <motion.div
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.5, duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 text-sm"
                >
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>一键复制风格代码</span>
                </motion.div>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="flex items-center justify-center gap-6 mt-10">
                {Object.entries(categoryDescriptions).map(([group, info], i) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={group}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: prefersReducedMotion ? 0 : 0.6 + i * 0.08, duration: prefersReducedMotion ? 0 : 0.3 }}
                      className="flex items-center gap-2 text-neutral-500"
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-xs font-medium">{group}</span>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.header>

          {activeTab === 'dashboard' && Object.entries(groupedStyles).map(([group, items], groupIndex) => {
            const info = categoryDescriptions[group]
            const Icon = info.icon
            return (
              <motion.section
                key={group}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : groupIndex * 0.1 + 0.3, duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16"
                aria-label={`${group} 风格分类`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${categoryGradients[group] || 'from-gray-500/20 to-gray-500/20'} border border-white/5`}>
                    <Icon className="w-3.5 h-3.5 text-white/70" aria-hidden="true" />
                    <h2 className="text-xs font-semibold text-white/80 uppercase tracking-[0.12em]">{group}</h2>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  <span className="text-xs text-neutral-600 font-mono">{items.length} styles</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((style, i) => (
                    <StyleCard
                      key={style.id}
                      style={style}
                      onClick={() => onSelectStyle(style.id)}
                      index={i}
                    />
                  ))}
                </div>
              </motion.section>
            )
          })}

          {activeTab === 'web-design' && Object.entries(groupedWebPages).map(([group, items], groupIndex) => {
            const groupInfo = webPageGroups[group]
            return (
              <motion.section
                key={group}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : groupIndex * 0.1 + 0.3, duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-16"
                aria-label={`${groupInfo?.labelZh || group} 页面分类`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${groupInfo?.color || 'from-gray-500/20 to-gray-500/20'} border border-white/5`}>
                    <h2 className="text-xs font-semibold text-white/80 uppercase tracking-[0.12em]">{groupInfo?.labelZh || group}</h2>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  <span className="text-xs text-neutral-600 font-mono">{items.length} designs</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((page, i) => (
                    <WebPageCard
                      key={page.id}
                      page={page}
                      onClick={() => onSelectWebPage(page.id)}
                      index={i}
                    />
                  ))}
                </div>
              </motion.section>
            )
          })}

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1 }}
            className="text-center mt-20 pt-8 border-t border-white/5"
          >
            <p className="text-xs text-neutral-600">
              Built with React, Tailwind CSS, Framer Motion &amp; Recharts
            </p>
          </motion.footer>
        </div>
      </div>

      <StyleListModal isOpen={showStyleList} onClose={() => setShowStyleList(false)} />
    </div>
  )
}
