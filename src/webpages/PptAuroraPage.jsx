import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Aurora', subtitle: '极光渐变', desc: '翠绿 · 天蓝 · 紫罗兰' },
  { type: 'bullets', title: '视觉特征', items: ['#5ef2c6 翠绿主色', '#7aa2ff 天蓝辅色', '#c984ff 紫罗兰点缀', 'backdrop-blur 24px 磨砂玻璃'] },
  { type: 'stat', title: '色板参数', stats: [{ value: '#06091c', label: '背景' }, { value: '#5ef2c6', label: '主色' }, { value: '#7aa2ff', label: '辅色' }, { value: '#c984ff', label: '强调' }] },
  { type: 'quote', quote: '极光不是光，而是天空的呼吸。', author: 'Aurora Borealis' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptAuroraPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'radial-gradient(60% 50% at 20% 10%,rgba(94,242,198,.35),transparent 70%), radial-gradient(55% 50% at 80% 20%,rgba(122,162,255,.32),transparent 70%), radial-gradient(70% 60% at 50% 100%,rgba(201,132,255,.3),transparent 70%), #06091c' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(24px) saturate(160%)', WebkitBackdropFilter: 'blur(24px) saturate(160%)', border: '1px solid rgba(180,220,255,.14)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.08)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#6a7a9e' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(135deg,#5ef2c6,#7aa2ff 50%,#c984ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#5ef2c6' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#6a7a9e' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#5ef2c6,#7aa2ff 50%,#c984ff)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: 'rgba(255,255,255,.05)' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#e8f0ff', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#b4c4e4' }}>
                    <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: ['#5ef2c6', '#7aa2ff', '#c984ff', '#ffd27a'][i], opacity: 0.6 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#e8f0ff', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(24px) saturate(160%)', border: '1px solid rgba(180,220,255,.14)', borderRadius: '20px' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#5ef2c6', '#7aa2ff', '#c984ff', '#ffd27a'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#6a7a9e' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#5ef2c6,#7aa2ff 50%,#c984ff)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#b4c4e4' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#6a7a9e' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(135deg,#5ef2c6,#7aa2ff 50%,#c984ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#6a7a9e' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#6a7a9e' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(24px) saturate(160%)', border: '1px solid rgba(180,220,255,.14)', borderRadius: '14px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#6a7a9e' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#6a7a9e' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(24px) saturate(160%)', border: '1px solid rgba(180,220,255,.14)', borderRadius: '14px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#b4c4e4' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#5ef2c6' } : { background: 'rgba(255,255,255,.1)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(255,255,255,.05)', backdropFilter: 'blur(24px) saturate(160%)', border: '1px solid rgba(180,220,255,.14)', borderRadius: '14px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#b4c4e4' }} />
        </button>
      </div>
    </div>
  )
}
