import { Suspense, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ExternalLink, Copy, Check } from 'lucide-react'
import { copyToClipboard } from '../utils/colorUtils'
import { generateStylePrompt } from '../utils/styleGenerator'
import { styleKeywords } from '../data/categoryData'
import { getPreviewComponent } from '../dashboards'

export default function StyleCard({ style, onClick, index }) {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback((e) => {
    e.stopPropagation()
    const text = generateStylePrompt(style, styleKeywords)
    copyToClipboard(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [style])

  const PreviewComponent = getPreviewComponent(style.id)

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.03, duration: prefersReducedMotion ? 0.1 : 0.3 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`查看 ${style.label} 风格详情`}
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
          <span className="text-[10px] text-white/50 font-mono bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-sm">{style.id}</span>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? '已复制风格代码' : `复制 ${style.label} 风格代码`}
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
          <h3 className="text-sm font-semibold text-white">{style.label}</h3>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
        </div>
        <p className="text-xs text-neutral-500 leading-relaxed mb-2.5 line-clamp-2">{style.descriptionZh}</p>
        <div className="flex items-center gap-1.5 mb-3">
          {style.useCases.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[10px] text-neutral-400 bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-neutral-600 font-medium uppercase tracking-wider">{style.group}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.04] text-neutral-500 border border-white/[0.06]">
              WCAG {style.contrast}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5" aria-label={`复杂度 ${style.complexity}/5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i <= style.complexity ? 'bg-violet-500' : 'bg-white/[0.06]'}`} />
              ))}
            </div>
            <div className="w-px h-3 bg-white/[0.06]" aria-hidden="true" />
            <div className="flex items-center gap-0.5" aria-label="色彩搭配">
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.primary }} aria-label={`主色调 ${style.colors.primary}`} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.secondary }} aria-label={`辅色调 ${style.colors.secondary}`} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.accent }} aria-label={`强调色 ${style.colors.accent}`} />
              <div className="w-3 h-3 rounded-full border border-white/10 shadow-sm" style={{ backgroundColor: style.colors.highlight }} aria-label={`点缀色 ${style.colors.highlight}`} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
