import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Swiss', subtitle: '瑞士网格', desc: 'Helvetica · 网格线 · 极简主义' },
  { type: 'bullets', title: '设计要素', items: ['12列网格背景', '零圆角零阴影', '红色强调色', 'Helvetica 字体感'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#d6001c', label: '瑞士红' }, { value: '#111', label: '黑色' }, { value: '#888', label: '灰色' }, { value: '#fff', label: '白色' }] },
  { type: 'quote', quote: '网格，是秩序的诗歌。', author: 'Swiss Grid' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptSwissGridPage() {
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
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '0', boxShadow: 'none',
          backgroundImage: 'linear-gradient(90deg,rgba(0,0,0,.04) 1px,transparent 1px)', backgroundSize: 'calc(100%/12) 100%' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-bold tracking-[0.2em] uppercase" style={{ color: '#888888' }}>SWISS DESIGN</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#111111', letterSpacing: '-0.04em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#d6001c' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#888888' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-20 h-0.5" style={{ background: '#111111' }} />
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#111111', letterSpacing: '-0.04em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#444444' }}>
                    <span className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ background: ['#d6001c', '#111111', '#888888', '#0f8a2f'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#111111', letterSpacing: '-0.04em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ borderTop: '2px solid #111', borderBottom: '1px solid #111' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#d6001c', '#111111', '#888888', '#0f8a2f'][i], letterSpacing: '-0.04em' }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#888888' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-20 h-0.5 mb-8" style={{ background: '#111111' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#444444', letterSpacing: '-0.04em' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-bold" style={{ color: '#d6001c' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-bold mb-2" style={{ color: '#111111', letterSpacing: '-0.04em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#888888' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#888888' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#f4f4f4' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#888888' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#888888' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f4f4f4' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#444444' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#d6001c' } : { background: 'rgba(214,0,28,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f4f4f4' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#444444' }} />
        </button>
      </div>
    </div>
  )
}
