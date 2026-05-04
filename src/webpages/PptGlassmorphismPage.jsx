import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  {
    type: 'cover',
    title: '毛玻璃',
    subtitle: 'Glassmorphism',
    desc: '模糊 · 通透 · 光斑',
  },
  {
    type: 'bullets',
    title: '视觉特征',
    items: ['磨砂玻璃面板，backdrop-blur 28px', '半透明层次叠加 saturate 180%', '三色光斑：蓝 / 紫 / 粉', '适合 Apple 式发布会与产品展示'],
  },
  {
    type: 'stat',
    title: '技术指标',
    stats: [
      { value: '28px', label: '模糊半径' },
      { value: '180%', label: '饱和度' },
      { value: '22px', label: '圆角大小' },
      { value: '3层', label: '光斑深度' },
    ],
  },
  {
    type: 'quote',
    quote: '透明不是缺失，而是另一种存在方式。',
    author: 'Glass Design Philosophy',
  },
  {
    type: 'end',
    title: '谢谢',
    subtitle: 'Thank You',
  },
]

export default function PptGlassmorphismPage() {
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const go = useCallback((dir) => {
    setCurrent((c) => Math.max(0, Math.min(slides.length - 1, c + dir)))
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  const slide = slides[current]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'radial-gradient(60% 60% at 20% 20%, rgba(125,211,252,.3), transparent 60%), radial-gradient(50% 50% at 80% 30%, rgba(192,132,252,.28), transparent 60%), radial-gradient(60% 60% at 60% 90%, rgba(240,171,252,.25), transparent 60%), #0b1024',
      }}>

      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{
          aspectRatio: fullscreen ? undefined : '16/9',
          background: 'rgba(255,255,255,.06)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid rgba(255,255,255,.18)',
          borderRadius: '22px',
          boxShadow: '0 20px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.12)',
        }}>

        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#8287a8' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ color: '#f2f4ff', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#7dd3fc' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8287a8' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#7dd3fc,#c084fc 55%,#f0abfc)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: 'rgba(255,255,255,.1)' }} />
              </div>
            </>
          )}

          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#f2f4ff', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#c3c8e6' }}>
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#c084fc', opacity: 0.6 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#f2f4ff', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5"
                    style={{
                      background: 'rgba(255,255,255,.06)',
                      backdropFilter: 'blur(28px) saturate(180%)',
                      border: '1px solid rgba(255,255,255,.18)',
                      borderRadius: '22px',
                    }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: '#f2f4ff' }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#8287a8' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#7dd3fc,#c084fc 55%,#f0abfc)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#c3c8e6' }}>
                "{slide.quote}"
              </blockquote>
              <div className="mt-6 text-sm" style={{ color: '#8287a8' }}>— {slide.author}</div>
            </div>
          )}

          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ color: '#f2f4ff', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#8287a8' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-6 flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#8287a8' }}>{current + 1} / {slides.length}</span>
        </div>

        <button onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer"
          style={{ background: 'rgba(255,255,255,.06)', borderRadius: '14px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#8287a8' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#8287a8' }} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: 'rgba(255,255,255,.06)', backdropFilter: 'blur(28px) saturate(180%)', border: '1px solid rgba(255,255,255,.18)', borderRadius: '14px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#c3c8e6' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current
              ? { background: '#c084fc' }
              : { background: 'rgba(255,255,255,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: 'rgba(255,255,255,.06)', backdropFilter: 'blur(28px) saturate(180%)', border: '1px solid rgba(255,255,255,.18)', borderRadius: '14px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#c3c8e6' }} />
        </button>
      </div>
    </div>
  )
}
