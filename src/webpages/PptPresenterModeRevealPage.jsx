import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: 'Presenter Mode', subtitle: 'Reveal Presentation', desc: 'Professional reveal.js style presentation' },
  { type: 'vertical', title: '垂直导航', subtitle: 'Vertical Navigation', desc: 'Navigate up and down through slide sections', hint: '使用 ↑ ↓ 键垂直导航' },
  { type: 'fragments', title: '渐进显示', subtitle: 'Fragments', desc: 'Reveal content piece by piece for better engagement', items: ['第一点：问题背景', '第二点：解决方案', '第三点：实施效果', '第四点：未来展望'] },
  { type: 'overview', title: '全局概览', subtitle: 'Slide Overview', desc: 'Press ESC to see all slides at once', grid: ['Cover', '垂直导航', '渐进显示', '全局概览', '代码高亮', '总结'] },
  { type: 'code', title: '代码演示', subtitle: 'Code Highlight', desc: 'Syntax highlighted code blocks', code: { comment: '// Reveal.js initialization', init: 'Reveal.initialize({', config1: '  controls: true,', config2: '  fragments: true,', config3: '  transition: "slide"', end: '});' } },
  { type: 'summary', title: '谢谢', subtitle: 'Thank You', desc: 'Questions & Discussion' },
]

export default function PptPresenterModeRevealPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#1a1a2e' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #1a1a2e, #16213e)', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#e94560' }}>Presentation</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#e94560' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8888aa' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'vertical' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#e94560' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8888aa' }}>{slide.desc}</p>
              <div className="p-6 rounded-lg text-center" style={{ background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.2)' }}>
                <span className="text-xl" style={{ color: '#e94560' }}>{slide.hint}</span>
              </div>
            </>
          )}
          {slide.type === 'fragments' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#e94560' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8888aa' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', opacity: i <= current % slide.items.length ? 1 : 0.3 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: '#e94560', color: '#fff' }}>{i + 1}</div>
                    <span className="text-base" style={{ color: '#ccccdd' }}>{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'overview' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#e94560' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8888aa' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-4">
                {slide.grid.map((item, i) => (
                  <div key={i} className="p-4 rounded-lg text-center text-sm" style={{ background: i === current % slide.grid.length ? 'rgba(233,69,96,0.15)' : 'rgba(255,255,255,0.03)', border: `1px solid ${i === current % slide.grid.length ? 'rgba(233,69,96,0.3)' : 'rgba(255,255,255,0.08)'}`, color: i === current % slide.grid.length ? '#e94560' : '#8888aa' }}>
                    {item}
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'code' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#e94560' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8888aa' }}>{slide.desc}</p>
              <div className="p-5 rounded-lg" style={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'JetBrains Mono', monospace" }}>
                <div className="text-sm mb-2" style={{ color: '#666688' }}><span style={{ color: '#666688', fontStyle: 'italic' }}>{slide.code.comment}</span></div>
                <div className="space-y-1">
                  <div><span style={{ color: '#e94560' }}>{slide.code.init}</span></div>
                  <div><span style={{ color: '#7eb8da' }}>{slide.code.config1}</span></div>
                  <div><span style={{ color: '#7eb8da' }}>{slide.code.config2}</span></div>
                  <div><span style={{ color: '#7eb8da' }}>{slide.code.config3}</span></div>
                  <div><span style={{ color: '#e94560' }}>{slide.code.end}</span></div>
                </div>
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-xl mb-2" style={{ color: '#e94560' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8888aa' }}>{slide.desc}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ color: '#484f58' }}>← → ↑ ↓ 切换 | ESC 概览</span>
          <span className="text-xs font-bold" style={{ color: '#e94560' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
