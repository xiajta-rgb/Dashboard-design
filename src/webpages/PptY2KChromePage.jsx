import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Y2K Chrome', subtitle: '千禧铬金属', desc: '银 · 蓝 · 复古未来' },
  { type: 'bullets', title: '风格特征', items: ['#8a5cff 紫罗兰', '#3ccfd8 青绿', '#ff84c4 粉色', '铬金属渐变 + 磨砂玻璃'] },
  { type: 'stat', title: '主题参数', stats: [{ value: '#dfe4ec', label: '背景' }, { value: '#8a5cff', label: '主色' }, { value: '#3ccfd8', label: '辅色' }, { value: '#ff84c4', label: '强调' }] },
  { type: 'quote', quote: '千禧年的未来，现在终于到来。', author: 'Y2K Aesthetic' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptY2KChromePage() {
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
      style={{ background: 'linear-gradient(135deg,#c4cfe0 0%,#f0f3f8 25%,#aab8d0 50%,#f5f7fb 75%,#b8c4d8 100%)' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: 'rgba(255,255,255,.72)', backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)', border: '1px solid rgba(120,135,170,.32)', borderRadius: '26px', boxShadow: '0 12px 30px rgba(70,90,130,.22), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(80,100,140,.2)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#8590a6' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(180deg,#f8faff 0%,#9aa8c4 50%,#4a5670 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#8a5cff' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8590a6' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#b8c4d8 0%,#f5f7fb 30%,#8a9ab8 55%,#e8ecf4 80%,#6b7a95 100%)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: 'rgba(255,255,255,.5)' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#1a1f2e', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#4a536a' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#8a5cff', '#3ccfd8', '#ff84c4', '#b8c4d8'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#1a1f2e', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(16px) saturate(140%)', border: '1px solid rgba(120,135,170,.32)', borderRadius: '26px', boxShadow: '0 8px 20px rgba(70,90,130,.15)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#8a5cff', '#3ccfd8', '#ff84c4', '#b8c4d8'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#8590a6' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#b8c4d8 0%,#f5f7fb 30%,#8a9ab8 55%,#e8ecf4 80%,#6b7a95 100%)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#4a536a' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#8590a6' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(180deg,#f8faff 0%,#9aa8c4 50%,#4a5670 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#8590a6' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#8590a6' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(16px) saturate(140%)', border: '1px solid rgba(120,135,170,.32)', borderRadius: '16px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#8590a6' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#8590a6' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(16px) saturate(140%)', border: '1px solid rgba(120,135,170,.32)', borderRadius: '16px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#4a536a' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#8a5cff' } : { background: 'rgba(120,135,170,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(255,255,255,.5)', backdropFilter: 'blur(16px) saturate(140%)', border: '1px solid rgba(120,135,170,.32)', borderRadius: '16px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#4a536a' }} />
        </button>
      </div>
    </div>
  )
}
