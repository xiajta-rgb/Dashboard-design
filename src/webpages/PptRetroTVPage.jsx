import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Retro TV', subtitle: '复古显像管', desc: '扫描线 · 暖色 · 怀旧' },
  { type: 'bullets', title: '设计要素', items: ['CRT扫描线效果', '暖色复古背景', '橙红渐变', '圆角+硬投影'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#e67e14', label: '橙色' }, { value: '#c73a1f', label: '红棕' }, { value: '#f2b544', label: '金黄' }, { value: '#f5ecd7', label: '米白' }] },
  { type: 'quote', quote: '怀旧，是最好的滤镜。', author: 'Retro TV' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptRetroTVPage() {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const go = useCallback((dir) => setCurrent((c) => Math.max(0, Math.min(slides.length - 1, c + dir))), [])
  useEffect(() => {
    const handler = (e) => { if (e.key === 'ArrowRight' || e.key === ' ') go(1); else if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])
  const slide = slides[current]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5ecd7',
      backgroundImage: 'repeating-linear-gradient(0deg,rgba(80,40,0,.06) 0 2px,transparent 2px 4px), radial-gradient(ellipse at center,#f7ecd0 0%,#e8d9b0 85%,#c9b888 100%)' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#fbf5e2', borderRadius: '10px', boxShadow: '0 6px 0 rgba(80,40,0,.12),0 12px 28px rgba(80,40,0,.15)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg,rgba(0,0,0,.035) 0 2px,transparent 2px 4px)', zIndex: 1 }} />
          <div className="relative z-2">
            {slide.type === 'cover' && (
              <>
                <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#a68656' }}>BROADCAST</div>
                <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#c73a1f', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h1>
                <p className="text-2xl font-light mb-2" style={{ color: '#e67e14' }}>{slide.subtitle}</p>
                <p className="text-sm" style={{ color: '#a68656' }}>{slide.desc}</p>
                <div className="absolute bottom-12 left-16 w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#c73a1f,#e67e14 55%,#f2b544)' }} />
              </>
            )}
            {slide.type === 'bullets' && (
              <>
                <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#2a1a08', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h2>
                <ul className="space-y-5">
                  {slide.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#6b4a22' }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#e67e14', '#c73a1f', '#f2b544', '#3e8940'][i] }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {slide.type === 'stat' && (
              <>
                <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#2a1a08', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h2>
                <div className="grid grid-cols-4 gap-6">
                  {slide.stats.map((s, i) => (
                    <div key={i} className="text-center p-5" style={{ background: '#efe3c2', borderRadius: '10px', boxShadow: '0 4px 12px rgba(80,40,0,.1)' }}>
                      <div className="text-4xl font-bold mb-2" style={{ color: ['#e67e14', '#c73a1f', '#f2b544', '#3e8940'][i] }}>{s.value}</div>
                      <div className="text-xs" style={{ color: '#a68656' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {slide.type === 'quote' && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#c73a1f,#e67e14 55%,#f2b544)' }} />
                <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#6b4a22', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>"{slide.quote}"</blockquote>
                <div className="mt-6 text-sm" style={{ color: '#a68656' }}>— {slide.author}</div>
              </div>
            )}
            {slide.type === 'end' && (
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-[72px] font-bold mb-2" style={{ color: '#c73a1f', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h1>
                <p className="text-xl" style={{ color: '#a68656' }}>{slide.subtitle}</p>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#a68656' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer z-2" style={{ background: '#efe3c2', borderRadius: '6px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#a68656' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#a68656' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#efe3c2', borderRadius: '6px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#6b4a22' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#e67e14' } : { background: 'rgba(230,126,20,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#efe3c2', borderRadius: '6px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#6b4a22' }} />
        </button>
      </div>
    </div>
  )
}
