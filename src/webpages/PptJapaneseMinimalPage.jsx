import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: '和风', subtitle: 'Japanese Minimal', desc: '侘寂 · 留白 · 东方美学' },
  { type: 'bullets', title: '设计要素', items: ['零圆角零阴影', '红黑金配色', '大量留白', '衬线字体'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#fafaf5', label: '背景' }, { value: '#d93a2a', label: '朱红' }, { value: '#1a1a18', label: '墨黑' }, { value: '#c9a961', label: '金' }] },
  { type: 'quote', quote: '少即是多，留白即美。', author: 'Japanese Minimal' },
  { type: 'end', title: '谢谢', subtitle: 'ありがとう' },
]

export default function PptJapaneseMinimalPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fafaf5' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '0px', boxShadow: '0 1px 0 rgba(40,30,20,.12)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] tracking-[0.2em]" style={{ color: '#d93a2a' }}>プレゼンテーション</div>
              <h1 className="text-[72px] font-medium leading-[1.05] mb-4" style={{ color: '#1a1a18', letterSpacing: '0.04em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#d93a2a' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#9c958a' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-12 h-0.5" style={{ background: '#d93a2a' }} />
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-medium mb-10 leading-[1.1]" style={{ color: '#1a1a18', letterSpacing: '0.04em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#5c564c' }}>
                    <span className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ background: ['#d93a2a', '#1a1a18', '#c9a961', '#4a6b3e'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-medium mb-12 leading-[1.1]" style={{ color: '#1a1a18', letterSpacing: '0.04em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '1px solid rgba(40,30,20,.1)' }}>
                    <div className="text-4xl font-medium mb-2" style={{ color: ['#d93a2a', '#1a1a18', '#c9a961', '#4a6b3e'][i], fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#9c958a' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-0.5 mb-8" style={{ background: '#d93a2a' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#1a1a18', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#9c958a' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-medium mb-2" style={{ color: '#1a1a18', letterSpacing: '0.04em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#9c958a' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#9c958a' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ border: '1px solid rgba(40,30,20,.1)' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#9c958a' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#9c958a' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '1px solid rgba(40,30,20,.1)' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#5c564c' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#d93a2a' } : { background: 'rgba(217,58,42,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '1px solid rgba(40,30,20,.1)' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#5c564c' }} />
        </button>
      </div>
    </div>
  )
}
