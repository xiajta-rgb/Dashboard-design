import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Blueprint', subtitle: '蓝图工程', desc: '深蓝底 · 网格 · 工程感' },
  { type: 'bullets', title: '工程参数', items: ['蓝图网格背景', '虚线边框', 'JetBrains Mono 字体', '白色+浅蓝高对比'] },
  { type: 'stat', title: '技术指标', stats: [{ value: '#0b3a6f', label: '背景' }, { value: '#ffffff', label: '主色' }, { value: '#aee1ff', label: '辅色' }, { value: '#ffd27a', label: '警告' }] },
  { type: 'quote', quote: '工程之美，在于精确。', author: 'Blueprint Theme' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptBlueprintPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#0b3a6f' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#0b3a6f', borderRadius: '2px', boxShadow: '0 16px 40px rgba(0,0,0,.3)',
          backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px) 0 0/40px 40px, linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px) 0 0/40px 40px' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-mono tracking-[0.16em] uppercase" style={{ color: '#7da8cf' }}>ENGINEERING</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#e8f3ff', fontFamily: "'JetBrains Mono', monospace" }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#aee1ff' }}>{slide.subtitle}</p>
              <p className="text-sm font-mono" style={{ color: '#7da8cf' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#e8f3ff', fontFamily: "'JetBrains Mono', monospace" }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-mono" style={{ color: '#b8d4f0' }}>
                    <span className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ background: ['#ffffff', '#aee1ff', '#ffd27a', '#8ef0a6'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#e8f3ff', fontFamily: "'JetBrains Mono', monospace" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '1px dashed rgba(190,220,255,.45)', background: 'rgba(255,255,255,.04)' }}>
                    <div className="text-4xl font-bold mb-2 font-mono" style={{ color: ['#ffffff', '#aee1ff', '#ffd27a', '#8ef0a6'][i] }}>{s.value}</div>
                    <div className="text-xs font-mono" style={{ color: '#7da8cf' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-px mb-8" style={{ background: '#ffffff' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light font-mono" style={{ color: '#e8f3ff' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-mono" style={{ color: '#7da8cf' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-bold mb-2 font-mono" style={{ color: '#e8f3ff' }}>{slide.title}</h1>
              <p className="text-xl font-mono" style={{ color: '#7da8cf' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#7da8cf' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: 'rgba(255,255,255,.06)', borderRadius: '2px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#7da8cf' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#7da8cf' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(255,255,255,.06)', borderRadius: '2px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#b8d4f0' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#ffffff' } : { background: 'rgba(255,255,255,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(255,255,255,.06)', borderRadius: '2px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#b8d4f0' }} />
        </button>
      </div>
    </div>
  )
}
