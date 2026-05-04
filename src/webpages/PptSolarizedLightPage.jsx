import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Solarized', subtitle: '日光浅调', desc: '经典配色 · 舒适 · 开发者最爱' },
  { type: 'bullets', title: '设计要素', items: ['#fdf6e3 暖白背景', '#268bd2 蓝色主色', '#2aa198 青色辅色', '经典日光配色'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#268bd2', label: '蓝' }, { value: '#2aa198', label: '青' }, { value: '#859900', label: '绿' }, { value: '#d33682', label: '粉' }] },
  { type: 'quote', quote: '舒适，是最好的设计。', author: 'Solarized Light' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptSolarizedLightPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fdf6e3' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '10px', boxShadow: '0 6px 20px rgba(88,110,117,.14)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#93a1a1' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(135deg,#268bd2,#2aa198 50%,#859900)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#268bd2' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#93a1a1' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#268bd2,#2aa198 50%,#859900)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#eee8d5' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#073642' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#586e75' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#268bd2', '#2aa198', '#859900', '#d33682'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#073642' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#f5efd7', borderRadius: '10px', boxShadow: '0 4px 12px rgba(88,110,117,.1)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#268bd2', '#2aa198', '#859900', '#d33682'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#93a1a1' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#268bd2,#2aa198 50%,#859900)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#586e75' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#93a1a1' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(135deg,#268bd2,#2aa198 50%,#859900)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#93a1a1' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#93a1a1' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#f5efd7', borderRadius: '6px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#93a1a1' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#93a1a1' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f5efd7', borderRadius: '6px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#586e75' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#268bd2' } : { background: 'rgba(38,139,210,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f5efd7', borderRadius: '6px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#586e75' }} />
        </button>
      </div>
    </div>
  )
}
