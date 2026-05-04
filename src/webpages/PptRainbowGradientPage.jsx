import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Rainbow', subtitle: '彩虹渐变', desc: '白底 · 彩虹渐变 · 活力' },
  { type: 'bullets', title: '设计要素', items: ['纯白背景', '彩虹渐变文字', '16px大圆角', '紫色投影'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#ff4d8b', label: '粉红' }, { value: '#7a5cff', label: '紫色' }, { value: '#36b6ff', label: '天蓝' }, { value: '#ffffff', label: '白色' }] },
  { type: 'quote', quote: '色彩，是世界的语言。', author: 'Rainbow Gradient' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptRainbowGradientPage() {
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
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '16px', boxShadow: '0 12px 32px rgba(124,92,255,.1)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#9096a8' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4 gradient-text"
                style={{ background: 'linear-gradient(90deg,#ff0080,#ff4d00,#ff9900,#ffe600,#00c853,#0091ea,#6200ea,#ff0080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'rbflow 6s linear infinite' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#7a5cff' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#9096a8' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#ff0080,#ff4d00,#ff9900,#ffe600,#00c853,#0091ea,#6200ea,#ff0080)' }} />
                <div className="w-8 h-1 rounded-full" style={{ background: '#f8f8fb' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#0c0d10' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#4d5162' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#ff4d8b', '#7a5cff', '#36b6ff', '#1aaf6c'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#0c0d10' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#f8f8fb', borderRadius: '16px', boxShadow: '0 8px 20px rgba(124,92,255,.06)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#ff4d8b', '#7a5cff', '#36b6ff', '#1aaf6c'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#9096a8' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-full mb-8" style={{ background: 'linear-gradient(90deg,#ff0080,#ff4d00,#ff9900,#ffe600,#00c853,#0091ea,#6200ea,#ff0080)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#4d5162' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#9096a8' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2 gradient-text"
                style={{ background: 'linear-gradient(90deg,#ff0080,#ff4d00,#ff9900,#ffe600,#00c853,#0091ea,#6200ea,#ff0080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200% auto', animation: 'rbflow 6s linear infinite' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#9096a8' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#9096a8' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#f8f8fb', borderRadius: '10px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#9096a8' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#9096a8' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f8f8fb', borderRadius: '10px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#4d5162' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: 'linear-gradient(90deg,#ff0080,#ff4d00,#ff9900,#ffe600,#00c853,#0091ea,#6200ea,#ff0080)' } : { background: 'rgba(124,92,255,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f8f8fb', borderRadius: '10px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#4d5162' }} />
        </button>
      </div>
    </div>
  )
}
