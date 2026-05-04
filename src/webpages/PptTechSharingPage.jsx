import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: '技术分享', subtitle: 'Tech Sharing', desc: 'Technical deep-dive presentation' },
  { type: 'context', title: '背景', subtitle: 'Context', desc: 'Why this matters and what problem we are solving', points: ['现有技术瓶颈', '行业趋势变化', '我们的机遇'] },
  { type: 'architecture', title: '技术架构', subtitle: 'Architecture', desc: 'System design and component breakdown', layers: ['Presentation Layer', 'Business Logic', 'Data Access', 'Infrastructure'] },
  { type: 'code', title: '核心代码', subtitle: 'Core Code', desc: 'Key implementation details', code: { comment: '// Core algorithm implementation', line1: 'function optimize(data) {', line2: '  const result = data.map(transform);', line3: '  return result.filter(isValid);', line4: '}' } },
  { type: 'results', title: '实验结果', subtitle: 'Results', desc: 'Performance benchmarks and comparisons', metrics: [{ label: '响应时间', before: '120ms', after: '12ms', improvement: '10x' }, { label: '吞吐量', before: '1K/s', after: '10K/s', improvement: '10x' }, { label: '错误率', before: '2.1%', after: '0.01%', improvement: '210x' }] },
  { type: 'summary', title: '总结', subtitle: 'Takeaways', desc: 'Key learnings and next steps', items: ['技术方案可行', '性能提升显著', '下一步：生产环境验证'] },
]

export default function PptTechSharingPage() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrent(p => Math.min(p + 1, slides.length - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrent(p => Math.max(p - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const slide = slides[current]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#0f172a' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#0f172a', borderRadius: '12px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#38bdf8' }}>Technical Deep-Dive</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#38bdf8' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#94a3b8' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'context' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#38bdf8' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#94a3b8' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: '#38bdf8', color: '#0f172a' }}>{i + 1}</div>
                    <span className="text-lg" style={{ color: '#e2e8f0' }}>{point}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'architecture' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#38bdf8' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#94a3b8' }}>{slide.desc}</p>
              <div className="space-y-3">
                {slide.layers.map((layer, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)' }}>
                    <div className="w-10 h-10 rounded flex items-center justify-center font-bold" style={{ background: '#38bdf8', color: '#0f172a' }}>L{i + 1}</div>
                    <span className="text-lg" style={{ color: '#e2e8f0' }}>{layer}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'code' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#38bdf8' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#94a3b8' }}>{slide.desc}</p>
              <div className="p-5 rounded-lg" style={{ background: '#1e293b', border: '1px solid rgba(56,189,248,0.15)', fontFamily: "'JetBrains Mono', monospace" }}>
                <div className="text-sm mb-2" style={{ color: '#64748b' }}><span style={{ color: '#64748b', fontStyle: 'italic' }}>{slide.code.comment}</span></div>
                <div className="space-y-1">
                  <div><span style={{ color: '#c084fc' }}>{slide.code.line1}</span></div>
                  <div><span style={{ color: '#38bdf8' }}>{slide.code.line2}</span></div>
                  <div><span style={{ color: '#38bdf8' }}>{slide.code.line3}</span></div>
                  <div><span style={{ color: '#c084fc' }}>{slide.code.line4}</span></div>
                </div>
              </div>
            </>
          )}
          {slide.type === 'results' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#38bdf8' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#94a3b8' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.metrics.map((m, i) => (
                  <div key={i} className="p-6 rounded-lg text-center" style={{ background: 'rgba(56,189,248,0.05)', border: '1px solid rgba(56,189,248,0.15)' }}>
                    <div className="text-sm mb-3" style={{ color: '#94a3b8' }}>{m.label}</div>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <span className="text-lg line-through" style={{ color: '#64748b' }}>{m.before}</span>
                      <span className="text-xs" style={{ color: '#64748b' }}>→</span>
                      <span className="text-2xl font-bold" style={{ color: '#38bdf8' }}>{m.after}</span>
                    </div>
                    <div className="text-sm font-semibold px-3 py-1 rounded-full inline-block" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>{m.improvement}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#38bdf8' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#94a3b8' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <span className="text-xl" style={{ color: '#22c55e' }}>✓</span>
                    <span className="text-lg" style={{ color: '#e2e8f0' }}>{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ color: '#475569' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#38bdf8' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
