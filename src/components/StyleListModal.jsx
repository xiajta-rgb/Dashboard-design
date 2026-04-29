import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ExternalLink, X, BookOpen, Palette, Sparkles, Layers, Code, ChevronLeft, Copy, Check } from 'lucide-react'
import { copyToClipboard } from '../utils/colorUtils'
import { generateStylePrompt, generateCSSVars, generateTailwindConfig, generateCoreCSS } from '../utils/styleGenerator'
import { styleKeywords, categoryDescriptions } from '../data/categoryData'
import { styles, groupedStyles } from '../dashboards'

export default function StyleListModal({ isOpen, onClose }) {
  const modalRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [copied, setCopied] = useState(false)
  const selectedStyleRef = useRef(null)

  useEffect(() => {
    selectedStyleRef.current = selectedStyle
  }, [selectedStyle])

  useEffect(() => {
    if (!isOpen) return
    setSelectedStyle(null)
    setCopied(false)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedStyleRef.current) {
          setSelectedStyle(null)
          setCopied(false)
        } else {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    modalRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleCopy = useCallback(() => {
    if (!selectedStyle) return
    const text = generateStylePrompt(selectedStyle, styleKeywords)
    copyToClipboard(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [selectedStyle])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="风格指南"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <motion.div
          ref={modalRef}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#0c0c0e] border border-white/[0.06] shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Style Guide</h2>
                <p className="text-sm text-neutral-400">风格指南 / {styles.length} Styles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="关闭风格指南"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer"
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
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                    className="rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
                  >
                    <div className={`p-4 bg-gradient-to-r ${info.color}`}>
                      <div className="flex items-center gap-2 text-white">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                        <h3 className="font-semibold">{group}</h3>
                        <span className="ml-auto text-sm opacity-80">{items.length} styles</span>
                      </div>
                      <p className="text-xs text-white/80 mt-1">{info.en}</p>
                      <p className="text-xs text-white/60 mt-0.5">{info.zh}</p>
                    </div>
                    <div className="p-3 space-y-1">
                      {items.map((style, i) => (
                        <div
                          key={style.id}
                          onClick={() => setSelectedStyle(style)}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors duration-150 cursor-pointer group/item"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs font-mono text-neutral-500 flex-shrink-0 group-hover/item:border-violet-500/30 transition-colors">
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-white truncate">{style.label}</h4>
                              <ArrowRight className="w-3 h-3 text-neutral-600 group-hover/item:text-violet-400 transition-colors flex-shrink-0" aria-hidden="true" />
                            </div>
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

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-violet-500/[0.08] to-cyan-500/[0.08] border border-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <Code className="w-5 h-5 text-white" aria-hidden="true" />
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

          <AnimatePresence>
            {selectedStyle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                className="absolute inset-0 bg-[#0c0c0e]/98 backdrop-blur-sm flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setSelectedStyle(null); setCopied(false) }}
                      aria-label="返回列表"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      返回
                    </button>
                    <div className="w-px h-4 bg-white/10" aria-hidden="true" />
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md" style={{ backgroundColor: selectedStyle.colors.highlight }} />
                      <h3 className="text-sm font-semibold text-white">{selectedStyle.label}</h3>
                    </div>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                      copied
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                        : 'bg-violet-500/15 text-violet-400 border border-violet-500/25 hover:bg-violet-500/25'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? '已复制' : '复制全部代码'}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-violet-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">风格关键词 / Keywords</h4>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(styleKeywords[selectedStyle.id] || []).map((kw, i) => (
                          <span key={i} className="text-[11px] text-neutral-300 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-md">{kw}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Palette className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">色彩系统 / Color System</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { label: 'Primary', color: selectedStyle.colors.primary },
                          { label: 'Secondary', color: selectedStyle.colors.secondary },
                          { label: 'Accent', color: selectedStyle.colors.accent },
                          { label: 'Highlight', color: selectedStyle.colors.highlight },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <div className="w-6 h-6 rounded-md border border-white/10 shadow-sm" style={{ backgroundColor: item.color }} />
                            <div>
                              <p className="text-[10px] text-neutral-400 leading-tight">{item.label}</p>
                              <p className="text-[10px] text-neutral-500 font-mono leading-tight">{item.color}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">CSS 自定义属性 / CSS Variables</h4>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#0a0a0c] border border-white/[0.04] text-[11px] text-neutral-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        <code>{generateCSSVars(selectedStyle)}</code>
                      </pre>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Tailwind CSS 配置 / Config</h4>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#0a0a0c] border border-white/[0.04] text-[11px] text-neutral-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        <code>{generateTailwindConfig(selectedStyle)}</code>
                      </pre>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">核心 CSS 样式 / Core Styles</h4>
                      </div>
                      <pre className="p-4 rounded-xl bg-[#0a0a0c] border border-white/[0.04] text-[11px] text-neutral-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
                        <code>{generateCoreCSS(selectedStyle)}</code>
                      </pre>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                        <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">设计参数 / Design Tokens</h4>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { label: '圆角', value: selectedStyle.borderRadius },
                          { label: '间距系统', value: selectedStyle.spacing },
                          { label: '边框', value: selectedStyle.borderWidth },
                          { label: '阴影', value: selectedStyle.shadows },
                          { label: '动效', value: selectedStyle.animations },
                          { label: '字体', value: `${selectedStyle.typography.primary} / ${selectedStyle.typography.secondary}` },
                          { label: '对比度', value: `WCAG ${selectedStyle.contrast}` },
                          { label: '暗色模式', value: selectedStyle.darkMode },
                          { label: '响应式', value: selectedStyle.responsive },
                          { label: '性能', value: selectedStyle.performance },
                          { label: '无障碍', value: selectedStyle.accessibility },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <span className="text-[10px] text-neutral-500">{item.label}</span>
                            <span className="text-[10px] text-neutral-300 font-mono">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/[0.06] to-cyan-500/[0.06] border border-white/[0.04]">
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        💡 将以上内容投喂给AI，可快速复刻该风格的页面设计。点击右上角「复制全部代码」按钮即可一键复制完整风格规范。
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
