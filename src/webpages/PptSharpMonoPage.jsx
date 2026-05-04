import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Sharp', subtitle: '锐利黑白', desc: '高对比 · 零圆角 · 极简' },
  { type: 'bullets', title: '设计要素', items: ['纯黑白对比', '8px硬投影', '零圆角', '大写字母标题'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#000', label: '黑色' }, { value: '#fff', label: '白色' }, { value: '#ff2200', label: '强调红' }, { value: '4px', label: '边框' }] },
  { type: 'quote', quote: '黑白之间，是无限可能。', author: 'Sharp Mono' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptSharpMonoPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#ffffff' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '0', boxShadow: '8px 8px 0 #000' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-bold tracking-[0.25em] uppercase" style={{ color: '#4a4a4a' }}>PRESENTATION</div>
              <h1 className="text-[72px] font-black leading-[1.05] mb-4" style={{ color: '#000000', fontFamily: "'Archivo Black', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase', letterSpacing: '-0.04em' }}>{slide.title}</h1>
              <p className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>{slide.subtitle}</p>
              <p className="text-sm font-bold" style={{ color: '#4a4a4a' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-20 h-1" style={{ background: '#000000' }} />
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-black mb-10 leading-[1.1]" style={{ color: '#000000', fontFamily: "'Archivo Black', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-bold" style={{ color: '#1a1a1a' }}>
                    <span className="w-4 h-4 flex-shrink-0" style={{ background: ['#000000', '#000000', '#ff2200', '#008800'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-black mb-12 leading-[1.1]" style={{ color: '#000000', fontFamily: "'Archivo Black', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '2px solid #000', boxShadow: '4px 4px 0 #000' }}>
                    <div className="text-4xl font-black mb-2" style={{ color: ['#000000', '#000000', '#ff2200', '#008800'][i], fontFamily: "'Archivo Black', sans-serif" }}>{s.value}</div>
                    <div className="text-xs font-bold" style={{ color: '#4a4a4a' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-1 mb-8" style={{ background: '#000000' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-black" style={{ color: '#000000', fontFamily: "'Archivo Black', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-bold" style={{ color: '#4a4a4a' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-black mb-2" style={{ color: '#000000', fontFamily: "'Archivo Black', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase', letterSpacing: '-0.04em' }}>{slide.title}</h1>
              <p className="text-xl font-bold" style={{ color: '#4a4a4a' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono font-bold" style={{ color: '#4a4a4a' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ border: '2px solid #000' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#4a4a4a' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#4a4a4a' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2px solid #000' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#1a1a1a' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#000000' } : { background: 'rgba(0,0,0,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2px solid #000' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#1a1a1a' }} />
        </button>
      </div>
    </div>
  )
}
