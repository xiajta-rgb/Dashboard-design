import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, LayoutGrid, Component, Paintbrush, Ruler, FileCode } from 'lucide-react'
import { isColorDark } from '../utils/colorUtils'
import { layoutPages } from '../data/categoryData'
import Section from './Section'

const iconMap = { Component, LayoutGrid, Paintbrush, Ruler, FileCode }

export default function LayoutLibraryPanel({ style, isOpen, onClose }) {
  const [activePage, setActivePage] = useState('components')
  const prefersReducedMotion = useReducedMotion()
  const c = style.colors
  const isDark = isColorDark(c.primary)

  if (!isOpen) return null

  const panelBg = isDark ? '#111827' : '#f8fafc'
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'
  const textPrimary = isDark ? '#fff' : '#111'
  const textSecondary = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
  const textMuted = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'

  return (
    <AnimatePresence>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-30 flex"
        onClick={onClose}
      >
        <div className="flex-1" />
        <motion.div
          className="h-full w-[380px] flex-shrink-0 flex flex-col border-l overflow-hidden"
          style={{ backgroundColor: panelBg, borderColor: cardBorder }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: cardBorder }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: c.highlight + '20', color: c.highlight }}>
                <LayoutGrid className="w-3 h-3" />
              </div>
              <h3 className="text-xs font-semibold" style={{ color: textPrimary }}>
                {style.label} 标准化布局库
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer"
              style={{ color: textSecondary }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = cardBg }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
              aria-label="关闭"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex border-b" style={{ borderColor: cardBorder }}>
            {layoutPages.map((page) => {
              const Icon = iconMap[page.icon]
              const isActive = activePage === page.key
              return (
                <button
                  key={page.key}
                  onClick={() => setActivePage(page.key)}
                  className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors cursor-pointer relative"
                  style={{ color: isActive ? c.highlight : textMuted }}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{page.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{ backgroundColor: c.highlight }} />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activePage === 'components' && (
              <>
                <Section title="按钮 / Buttons" style={style} isDark={isDark}>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-white cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: c.highlight }}>
                      Primary
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer border transition-transform active:scale-95" style={{ borderColor: c.highlight, color: c.highlight }}>
                      Secondary
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: c.accent, color: isDark ? '#fff' : c.primary }}>
                      Accent
                    </button>
                    <button className="px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-transform active:scale-95" style={{ backgroundColor: cardBg, color: textSecondary, border: `1px solid ${cardBorder}` }}>
                      Ghost
                    </button>
                  </div>
                </Section>
                <Section title="标签 / Tags" style={style} isDark={isDark}>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: c.highlight + '20', color: c.highlight }}>Success</span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: c.accent + '20', color: c.accent }}>Warning</span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: c.secondary, color: isDark ? '#fff' : c.primary }}>Default</span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>Error</span>
                  </div>
                </Section>
                <Section title="输入框 / Input" style={style} isDark={isDark}>
                  <div className="flex items-center px-3 py-2 rounded-lg border text-xs" style={{ backgroundColor: cardBg, borderColor: cardBorder, color: textMuted }}>
                    Placeholder text...
                  </div>
                </Section>
                <Section title="卡片 / Card" style={style} isDark={isDark}>
                  <div className="p-3 rounded-xl border" style={{ backgroundColor: cardBg, borderColor: cardBorder }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: textPrimary }}>Card Title</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: textSecondary }}>Card description with sample content for this style.</p>
                  </div>
                </Section>
                <Section title="头像 / Avatar" style={style} isDark={isDark}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.highlight})` }}>A</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border" style={{ backgroundColor: cardBg, borderColor: cardBorder, color: textSecondary }}>B</div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ backgroundColor: c.secondary, color: isDark ? '#fff' : c.primary }}>C</div>
                  </div>
                </Section>
              </>
            )}

            {activePage === 'layout' && (
              <>
                <Section title="网格系统 / Grid System" style={style} isDark={isDark}>
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-1">
                      {[12].map(w => (
                        <div key={w} className="col-span-12 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.highlight + '15', color: c.highlight }}>12</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {[6, 6].map((w, i) => (
                        <div key={i} className="col-span-6 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.accent + '15', color: c.accent }}>{w}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {[4, 4, 4].map((w, i) => (
                        <div key={i} className="col-span-4 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.highlight + '15', color: c.highlight }}>{w}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-12 gap-1">
                      {[3, 3, 3, 3].map((w, i) => (
                        <div key={i} className="col-span-3 h-6 rounded flex items-center justify-center text-[9px] font-mono" style={{ backgroundColor: c.accent + '15', color: c.accent }}>{w}</div>
                      ))}
                    </div>
                  </div>
                </Section>
                <Section title="间距 / Spacing" style={style} isDark={isDark}>
                  <div className="space-y-1.5">
                    {[
                      { name: 'xs', value: '4px' },
                      { name: 'sm', value: '8px' },
                      { name: 'md', value: '16px' },
                      { name: 'lg', value: '24px' },
                      { name: 'xl', value: '32px' },
                      { name: '2xl', value: '48px' },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center gap-2">
                        <span className="text-[10px] font-mono w-8" style={{ color: textMuted }}>{s.name}</span>
                        <div className="h-3 rounded-sm" style={{ width: s.value, backgroundColor: c.highlight + '30' }} />
                        <span className="text-[10px] font-mono" style={{ color: textSecondary }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </Section>
                <Section title="圆角 / Border Radius" style={style} isDark={isDark}>
                  <div className="flex items-end gap-3">
                    {[
                      { name: 'sm', radius: '4px' },
                      { name: 'md', radius: '8px' },
                      { name: 'lg', radius: '16px' },
                      { name: 'xl', radius: '24px' },
                      { name: 'full', radius: '9999px' },
                    ].map((r) => (
                      <div key={r.name} className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 border" style={{ borderRadius: r.radius, borderColor: c.highlight + '40', backgroundColor: c.highlight + '10' }} />
                        <span className="text-[9px] font-mono" style={{ color: textMuted }}>{r.name}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {activePage === 'styles' && (
              <>
                <Section title="色彩系统 / Color System" style={style} isDark={isDark}>
                  <div className="space-y-2">
                    {[
                      { label: 'Primary', color: c.primary },
                      { label: 'Secondary', color: c.secondary },
                      { label: 'Accent', color: c.accent },
                      { label: 'Highlight', color: c.highlight },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg border" style={{ backgroundColor: item.color, borderColor: cardBorder }} />
                        <div>
                          <p className="text-[10px] font-medium" style={{ color: textPrimary }}>{item.label}</p>
                          <p className="text-[10px] font-mono" style={{ color: textMuted }}>{item.color}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>
                <Section title="阴影 / Shadows" style={style} isDark={isDark}>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: cardBg, boxShadow: `0 1px 3px rgba(0,0,0,0.1)` }}>
                      <p className="text-[10px]" style={{ color: textSecondary }}>Small Shadow</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: cardBg, boxShadow: `0 4px 6px rgba(0,0,0,0.15)` }}>
                      <p className="text-[10px]" style={{ color: textSecondary }}>Medium Shadow</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: cardBg, boxShadow: `0 10px 25px rgba(0,0,0,0.2)` }}>
                      <p className="text-[10px]" style={{ color: textSecondary }}>Large Shadow</p>
                    </div>
                  </div>
                </Section>
              </>
            )}

            {activePage === 'tokens' && (
              <>
                <Section title="设计变量 / Design Tokens" style={style} isDark={isDark}>
                  <div className="space-y-1">
                    {[
                      { key: 'borderRadius', label: '圆角' },
                      { key: 'spacing', label: '间距' },
                      { key: 'borderWidth', label: '边框' },
                      { key: 'shadows', label: '阴影' },
                      { key: 'animations', label: '动效' },
                      { key: 'typography', label: '字体' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded" style={{ backgroundColor: cardBg }}>
                        <span className="text-[10px]" style={{ color: textMuted }}>{item.label}</span>
                        <span className="text-[10px] font-mono" style={{ color: textSecondary }}>
                          {item.key === 'typography' ? `${style.typography.primary}` : style[item.key]}
                        </span>
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}

            {activePage === 'code' && (
              <>
                <Section title="CSS 变量 / CSS Variables" style={style} isDark={isDark}>
                  <pre className="text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ color: textSecondary }}>
{`:root {
  --color-primary: ${c.primary};
  --color-secondary: ${c.secondary};
  --color-accent: ${c.accent};
  --color-highlight: ${c.highlight};
}`}</pre>
                </Section>
                <Section title="Tailwind 配置 / Config" style={style} isDark={isDark}>
                  <pre className="text-[10px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap" style={{ color: textSecondary }}>
{`colors: {
  primary: '${c.primary}',
  secondary: '${c.secondary}',
  accent: '${c.accent}',
  highlight: '${c.highlight}',
}`}</pre>
                </Section>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
