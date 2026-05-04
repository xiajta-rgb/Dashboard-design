import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Engineering', subtitle: '工程白图', desc: '网格背景 · 工程标注 · 精确' },
  { type: 'bullets', title: '工程规范', items: ['白色网格背景', '深蓝工程标注色', '等宽字体', '零圆角'] },
  { type: 'stat', title: '技术参数', stats: [{ value: '#0a1e46', label: '深蓝' }, { value: '#1e5ac4', label: '亮蓝' }, { value: '#c42a10', label: '警告红' }, { value: '40px', label: '网格' }] },
  { type: 'quote', quote: '精确，是工程的语言。', author: 'Engineering Whiteprint' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptEngineeringWhiteprintPage() {
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
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '0px', boxShadow: '0 0 0 1px rgba(10,30,70,.22)',
          backgroundImage: 'repeating-linear-gradient(0deg,rgba(10,30,70,.07) 0 1px,transparent 1px 40px), repeating-linear-gradient(90deg,rgba(10,30,70,.07) 0 1px,transparent 1px 40px)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-mono tracking-[0.18em] uppercase" style={{ color: '#1e5ac4' }}>ENGINEERING</div>
              <h1 className="text-[72px] font-semibold leading-[1.05] mb-4" style={{ color: '#0a1e46' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#1e5ac4' }}>{slide.subtitle}</p>
              <p className="text-sm font-mono" style={{ color: '#8090a8' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-semibold mb-10 leading-[1.1]" style={{ color: '#0a1e46' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-mono" style={{ color: '#3a4a6a' }}>
                    <span className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ background: ['#0a1e46', '#1e5ac4', '#c42a10', '#1a6a3a'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-semibold mb-12 leading-[1.1]" style={{ color: '#0a1e46' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '1px solid #0a1e46', background: 'rgba(255,255,255,.85)' }}>
                    <div className="text-4xl font-bold mb-2 font-mono" style={{ color: ['#0a1e46', '#1e5ac4', '#c42a10', '#1a6a3a'][i] }}>{s.value}</div>
                    <div className="text-xs font-mono" style={{ color: '#8090a8' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-px mb-8" style={{ background: '#0a1e46' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light font-mono" style={{ color: '#0a1e46' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-mono" style={{ color: '#8090a8' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-semibold mb-2" style={{ color: '#0a1e46' }}>{slide.title}</h1>
              <p className="text-xl font-mono" style={{ color: '#8090a8' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#8090a8' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ border: '1px solid #0a1e46' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#8090a8' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#8090a8' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '1px solid #0a1e46' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#3a4a6a' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#0a1e46' } : { background: 'rgba(10,30,70,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '1px solid #0a1e46' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#3a4a6a' }} />
        </button>
      </div>
    </div>
  )
}
