import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Copy, Zap, Palette, Sparkles, Layers } from 'lucide-react'
import { styles, groupedStyles } from '../dashboards'
import { categoryDescriptions } from '../data/categoryData'
import StyleCard from './StyleCard'
import StyleListModal from './StyleListModal'

export default function HomePage({ onSelectStyle }) {
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

  return (
    <div className="h-full w-full overflow-y-auto bg-[#09090b]">
      <div className="hero-gradient min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <motion.header
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-violet-500/25 mb-8 animate-float"
            />

            <h1 className="font-display font-bold text-5xl sm:text-6xl text-white tracking-tight mb-4">
              Dashboard{' '}
              <span className="text-gradient">Gallery</span>
            </h1>

            <p className="text-neutral-400 text-base max-w-xl mx-auto mb-4 leading-relaxed">
              {styles.length} professional dashboard designs across 4 categories.
              Click any card to explore the full interactive dashboard.
            </p>

            <p className="text-neutral-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              每个风格包含完整的设计规范、色彩系统、核心CSS代码，一键复制即可投喂AI快速复刻。
            </p>

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
          </motion.header>

          {Object.entries(groupedStyles).map(([group, items], groupIndex) => {
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

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReducedMotion ? 0 : 1 }}
            className="text-center mt-20 pt-8 border-t border-white/5"
          >
            <p className="text-xs text-neutral-600">
              Built with React, Tailwind CSS, Framer Motion & Recharts
            </p>
          </motion.footer>
        </div>
      </div>

      <StyleListModal isOpen={showStyleList} onClose={() => setShowStyleList(false)} />
    </div>
  )
}
