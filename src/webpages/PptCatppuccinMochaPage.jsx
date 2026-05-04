import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Catppuccin', subtitle: 'Mocha 深咖', desc: '薰衣草 · 天空蓝 · 薄荷绿' },
  { type: 'bullets', title: '配色方案', items: ['#cba6f7 薰衣草紫', '#89b4fa 天空蓝', '#f5c2e7 粉色', '#a6e3a1 薄荷绿'] },
  { type: 'stat', title: '主题参数', stats: [{ value: '#1e1e2e', label: '背景' }, { value: '#cba6f7', label: '主色' }, { value: '#89b4fa', label: '辅色' }, { value: '#94e2d5', label: '强调' }] },
  { type: 'quote', quote: '温柔的颜色，治愈每一个深夜。', author: 'Catppuccin Theme' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptCatppuccinMochaPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#1e1e2e' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#1e1e2e', borderRadius: '14px', boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#7f849c' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(135deg,#cba6f7,#89b4fa 50%,#94e2d5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#cba6f7' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#7f849c' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#cba6f7,#89b4fa 50%,#94e2d5)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#313244' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#cdd6f4', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#a6adc8' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#cba6f7', '#89b4fa', '#f5c2e7', '#a6e3a1'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#cdd6f4', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#313244', borderRadius: '14px' }}>
                    <div className="text-lg font-bold mb-2 font-mono" style={{ color: ['#cba6f7', '#89b4fa', '#f5c2e7', '#94e2d5'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#7f849c' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#cba6f7,#89b4fa 50%,#94e2d5)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#cdd6f4' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#7f849c' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(135deg,#cba6f7,#89b4fa 50%,#94e2d5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#7f849c' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#7f849c' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#313244', borderRadius: '10px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#7f849c' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#7f849c' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#313244', borderRadius: '10px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#a6adc8' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#cba6f7' } : { background: 'rgba(203,166,247,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#313244', borderRadius: '10px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#a6adc8' }} />
        </button>
      </div>
    </div>
  )
}
