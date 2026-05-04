import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Rose Pine', subtitle: '玫瑰松', desc: '暗紫底 · 玫瑰金 · 优雅' },
  { type: 'bullets', title: '设计要素', items: ['#191724 深紫背景', '#ebbcba 玫瑰金', '#c4a7e7 薰衣草紫', '#9ccfd8 薄荷青'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#191724', label: '背景' }, { value: '#ebbcba', label: '玫瑰' }, { value: '#c4a7e7', label: '薰衣' }, { value: '#9ccfd8', label: '薄荷' }] },
  { type: 'quote', quote: '优雅，在暗色中绽放。', author: 'Rose Pine' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptRosePinePage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#191724' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#26233a', borderRadius: '14px', boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#6e6a86' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(135deg,#ebbcba,#c4a7e7 55%,#9ccfd8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#ebbcba' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#6e6a86' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(135deg,#ebbcba,#c4a7e7 55%,#9ccfd8)' }} />
                <div className="w-8 h-1 rounded-full" style={{ background: '#2a2740' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#e0def4' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#c4b8d8' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#ebbcba', '#c4a7e7', '#9ccfd8', '#31748f'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#e0def4' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#2a2740', borderRadius: '14px', boxShadow: '0 6px 16px rgba(0,0,0,.3)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#ebbcba', '#c4a7e7', '#9ccfd8', '#31748f'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#6e6a86' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-full mb-8" style={{ background: 'linear-gradient(135deg,#ebbcba,#c4a7e7 55%,#9ccfd8)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#c4b8d8' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#6e6a86' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(135deg,#ebbcba,#c4a7e7 55%,#9ccfd8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#6e6a86' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#6e6a86' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#2a2740', borderRadius: '10px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#6e6a86' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#6e6a86' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#2a2740', borderRadius: '10px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#c4b8d8' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#ebbcba' } : { background: 'rgba(235,188,186,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#2a2740', borderRadius: '10px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#c4b8d8' }} />
        </button>
      </div>
    </div>
  )
}
