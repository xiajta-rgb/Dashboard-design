import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Neo-Brutalism', subtitle: '新粗野主义', desc: '厚描边 · 硬阴影 · 明黄' },
  { type: 'bullets', title: '风格特征', items: ['#ffd400 明黄主色', '#ff5ca8 粉色辅色', '#3a7cff 蓝色点缀', '3px 粗黑描边 + 硬阴影'] },
  { type: 'stat', title: '主题参数', stats: [{ value: '#fffef0', label: '背景' }, { value: '#ffd400', label: '主色' }, { value: '#ff5ca8', label: '辅色' }, { value: '#3a7cff', label: '强调' }] },
  { type: 'quote', quote: '不完美才是完美，粗糙才是精致。', author: 'Neo-Brutalism' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptNeoBrutalismPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fffef0' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#fffef0', borderRadius: '6px', border: '3px solid #000', boxShadow: '6px 6px 0 #000' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-bold tracking-[0.16em] uppercase" style={{ color: '#555555' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ color: '#000000', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#000' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#555555' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: '#ffd400', border: '2px solid #000' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#fff38a', border: '2px solid #000' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#000000', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#222222' }}>
                    <span className="w-4 h-4 rounded-sm mt-1 flex-shrink-0" style={{ background: ['#ffd400', '#ff5ca8', '#3a7cff', '#00b36b'][i], border: '2px solid #000' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#000000', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#ffffff', border: '3px solid #000', borderRadius: '6px', boxShadow: '6px 6px 0 #000' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#ffd400', '#ff5ca8', '#3a7cff', '#00b36b'][i] }}>{s.value}</div>
                    <div className="text-xs font-bold" style={{ color: '#555555' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: '#ffd400', border: '2px solid #000', boxShadow: '3px 3px 0 #000' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#000000' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-bold" style={{ color: '#555555' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ color: '#000000', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#555555' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-bold" style={{ color: '#555555' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#ffffff', border: '2px solid #000', borderRadius: '4px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#000' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#000' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#ffffff', border: '2px solid #000', borderRadius: '4px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#000' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-sm transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#ffd400', border: '2px solid #000' } : { background: '#fff38a', border: '2px solid #000' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#ffffff', border: '2px solid #000', borderRadius: '4px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#000' }} />
        </button>
      </div>
    </div>
  )
}
