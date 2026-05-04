import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Magazine', subtitle: '杂志大标题', desc: '超大标题 · 衬线 · 时尚' },
  { type: 'bullets', title: '设计要素', items: ['120px超大标题', 'Playfair Display 衬线', '橙红渐变', '6px粗分割线'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#f5efe2', label: '背景' }, { value: '#ea5a1a', label: '橙红' }, { value: '#c42a10', label: '深红' }, { value: '#0a0a0a', label: '黑色' }] },
  { type: 'quote', quote: '设计，是视觉的诗歌。', author: 'Magazine Bold' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptMagazineBoldPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5efe2' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#fbf6e8', borderRadius: '0px', boxShadow: '6px 6px 0 #ea5a1a' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-bold tracking-[0.25em] uppercase" style={{ color: '#ea5a1a' }}>FEATURE</div>
              <h1 className="text-[72px] font-black leading-[0.92] mb-4" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif", letterSpacing: '-0.04em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#ea5a1a' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#6a6458' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-[90px] h-1.5" style={{ background: '#ea5a1a' }} />
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-black mb-10 leading-[1.1]" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#2a2a2a' }}>
                    <span className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ background: ['#ea5a1a', '#0a0a0a', '#c42a10', '#2a6a2a'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-black mb-12 leading-[1.1]" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '1.5px solid #0a0a0a' }}>
                    <div className="text-4xl font-black mb-2" style={{ color: ['#ea5a1a', '#0a0a0a', '#c42a10', '#2a6a2a'][i], fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#6a6458' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-[90px] h-1.5 mb-8" style={{ background: '#ea5a1a' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-black" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-bold tracking-[0.25em] uppercase" style={{ color: '#ea5a1a' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-black mb-2" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif", letterSpacing: '-0.04em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#6a6458' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono font-bold" style={{ color: '#6a6458' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ border: '1.5px solid #0a0a0a' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#6a6458' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#6a6458' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '1.5px solid #0a0a0a' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#2a2a2a' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#ea5a1a' } : { background: 'rgba(234,90,26,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '1.5px solid #0a0a0a' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#2a2a2a' }} />
        </button>
      </div>
    </div>
  )
}
