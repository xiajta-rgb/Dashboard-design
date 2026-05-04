import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Midcentury', subtitle: '世纪中期', desc: '复古暖调 · 橙绿配色 · 经典' },
  { type: 'bullets', title: '设计要素', items: ['暖色米黄背景', '橙绿撞色', '4px硬投影', '2px圆角'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#d4902a', label: '琥珀' }, { value: '#2a7a7f', label: '松绿' }, { value: '#c7502a', label: '砖红' }, { value: '#f3ead8', label: '米黄' }] },
  { type: 'quote', quote: '经典，永不褪色。', author: 'Midcentury Modern' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptMidcenturyPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f3ead8' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#f9f2e0', borderRadius: '2px', boxShadow: '6px 6px 0 rgba(40,25,10,.12),0 10px 24px rgba(40,25,10,.14)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#9a8868' }}>Presentation</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#c7502a', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#2a7a7f' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#9a8868' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-20 h-1" style={{ background: '#d4902a' }} />
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#201810', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#5a4830' }}>
                    <span className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ background: ['#d4902a', '#2a7a7f', '#c7502a', '#5a7a3a'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#201810', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '1.5px solid rgba(60,40,20,.4)', borderRadius: '2px' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#d4902a', '#2a7a7f', '#c7502a', '#5a7a3a'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#9a8868' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-1 mb-8" style={{ background: '#d4902a' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#5a4830', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#9a8868' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-bold mb-2" style={{ color: '#c7502a', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#9a8868' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#9a8868' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#e8dcbe', borderRadius: '0px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#9a8868' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#9a8868' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#e8dcbe', borderRadius: '0px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#5a4830' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#d4902a' } : { background: 'rgba(212,144,42,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#e8dcbe', borderRadius: '0px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#5a4830' }} />
        </button>
      </div>
    </div>
  )
}
