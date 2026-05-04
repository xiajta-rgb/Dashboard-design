import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Bauhaus', subtitle: '包豪斯', desc: '几何 · 原色 · 现代主义' },
  { type: 'bullets', title: '设计原则', items: ['红黄蓝三原色', '几何图形构成', '零圆角零阴影', '粗黑边框'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#e03c27', label: '红' }, { value: '#f4c430', label: '黄' }, { value: '#1d4eaf', label: '蓝' }, { value: '#111', label: '黑' }] },
  { type: 'quote', quote: '少即是多。', author: 'Bauhaus' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptBauhausPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f4efe3' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '0', boxShadow: '8px 8px 0 #111' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-0 right-0 w-40 h-40" style={{ background: '#e03c27' }} />
              <div className="absolute bottom-0 left-0 w-32 h-32" style={{ background: '#1d4eaf' }} />
              <div className="absolute top-20 left-40 w-20 h-20 rounded-full" style={{ background: '#f4c430' }} />
              <h1 className="text-[72px] font-black leading-[1.05] mb-4 relative z-10" style={{ color: '#111111', letterSpacing: '-0.03em' }}>{slide.title}</h1>
              <p className="text-2xl font-bold mb-2 relative z-10" style={{ color: '#e03c27' }}>{slide.subtitle}</p>
              <p className="text-sm relative z-10" style={{ color: '#666666' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-black mb-10 leading-[1.1]" style={{ color: '#111111', letterSpacing: '-0.03em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-medium" style={{ color: '#333333' }}>
                    <span className="w-4 h-4 flex-shrink-0" style={{ background: ['#e03c27', '#f4c430', '#1d4eaf', '#111111'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-black mb-12 leading-[1.1]" style={{ color: '#111111', letterSpacing: '-0.03em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '2px solid #111', boxShadow: '4px 4px 0 #111' }}>
                    <div className="text-4xl font-black mb-2" style={{ color: ['#e03c27', '#f4c430', '#1d4eaf', '#111111'][i] }}>{s.value}</div>
                    <div className="text-xs font-bold" style={{ color: '#666666' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 mb-8" style={{ background: 'linear-gradient(135deg,#e03c27 0 33%,#f4c430 33% 66%,#1d4eaf 66% 100%)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-black" style={{ color: '#111111', letterSpacing: '-0.03em' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-bold" style={{ color: '#666666' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-black mb-2" style={{ color: '#111111', letterSpacing: '-0.03em' }}>{slide.title}</h1>
              <p className="text-xl font-bold" style={{ color: '#666666' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono font-bold" style={{ color: '#666666' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ border: '2px solid #111' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#111' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#111' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2px solid #111' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#111' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#e03c27', border: '1px solid #111' } : { background: '#f4efe3', border: '1px solid #111' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2px solid #111' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#111' }} />
        </button>
      </div>
    </div>
  )
}
