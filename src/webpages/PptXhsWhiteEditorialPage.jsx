import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: '小红书', subtitle: 'XHS White Editorial', desc: 'Clean editorial style for Xiaohongshu posts' },
  { type: 'editorial', title: '编辑美学', subtitle: 'Editorial Aesthetic', desc: 'Clean typography with generous whitespace', quote: '好的设计是尽可能少的设计', author: 'Dieter Rams' },
  { type: 'layout', title: '排版布局', subtitle: 'Layout Design', desc: 'Grid-based layout with clear visual hierarchy', grids: ['12 列网格系统', '8px 间距基准', '响应式断点'] },
  { type: 'typography', title: '字体搭配', subtitle: 'Typography', desc: 'Serif + Sans-serif pairing for editorial feel', fonts: [{ name: 'Playfair Display', use: '标题' }, { name: 'Inter', use: '正文' }, { name: 'Noto Serif SC', use: '中文' }] },
  { type: 'color', title: '色彩系统', subtitle: 'Color System', desc: 'Minimal palette with warm accents', colors: [{ hex: '#ffffff', name: '纯白' }, { hex: '#faf9f6', name: '暖白' }, { hex: '#1a1a1a', name: '墨黑' }, { hex: '#c9a961', name: '金色' }] },
  { type: 'summary', title: '谢谢', subtitle: 'Thank You', desc: 'Follow for more design tips' },
]

export default function PptXhsWhiteEditorialPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#faf9f6' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#c9a961' }}>Editorial Design</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif", color: '#1a1a1a' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#c9a961' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#888888' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-0.5" style={{ background: '#1a1a1a' }} />
                <div className="w-8 h-0.5" style={{ background: '#c9a961' }} />
              </div>
            </>
          )}
          {slide.type === 'editorial' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-8 uppercase" style={{ color: '#c9a961' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif", color: '#1a1a1a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <blockquote className="text-3xl font-light italic leading-relaxed pl-8 border-l-4" style={{ borderColor: '#c9a961', color: '#1a1a1a', fontFamily: "'Playfair Display', serif" }}>
                "{slide.quote}"
              </blockquote>
              <p className="text-sm mt-4 pl-8" style={{ color: '#888888' }}>— {slide.author}</p>
            </>
          )}
          {slide.type === 'layout' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-8 uppercase" style={{ color: '#c9a961' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif", color: '#1a1a1a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.grids.map((g, i) => (
                  <div key={i} className="p-6 text-center" style={{ border: '1px solid #e8e8e8' }}>
                    <div className="text-3xl font-bold mb-3" style={{ color: '#1a1a1a' }}>{i + 1}</div>
                    <span className="text-sm" style={{ color: '#666666' }}>{g}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'typography' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-8 uppercase" style={{ color: '#c9a961' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif", color: '#1a1a1a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.fonts.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-5" style={{ background: '#faf9f6', border: '1px solid #e8e8e8' }}>
                    <span className="text-2xl" style={{ fontFamily: i === 2 ? "'Noto Serif SC', serif" : "'Playfair Display', serif", color: '#1a1a1a' }}>{f.name}</span>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ background: '#1a1a1a', color: '#ffffff' }}>{f.use}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'color' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-8 uppercase" style={{ color: '#c9a961' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif", color: '#1a1a1a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="grid grid-cols-4 gap-6">
                {slide.colors.map((c, i) => (
                  <div key={i} className="text-center">
                    <div className="w-20 h-20 rounded-full mx-auto mb-3" style={{ background: c.hex, border: c.hex === '#ffffff' ? '1px solid #e8e8e8' : 'none' }} />
                    <div className="text-sm font-mono mb-1" style={{ color: '#1a1a1a' }}>{c.hex}</div>
                    <div className="text-xs" style={{ color: '#888888' }}>{c.name}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ fontFamily: "'Playfair Display', 'Noto Serif SC', serif", color: '#1a1a1a' }}>{slide.title}</h1>
              <p className="text-xl mb-2" style={{ color: '#c9a961' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#888888' }}>{slide.desc}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100 relative z-10">
          <span className="text-xs" style={{ color: '#999999' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#c9a961' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
