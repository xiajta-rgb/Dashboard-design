import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Pastel', subtitle: '柔和马卡龙', desc: '粉蓝紫 · 大圆角 · 甜美' },
  { type: 'bullets', title: '设计要素', items: ['24px超大圆角', '#f49bb8 粉色主色', '#b5d5f0 蓝色辅色', '柔和渐变'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#f49bb8', label: '粉色' }, { value: '#b5d5f0', label: '蓝色' }, { value: '#f7d08a', label: '黄色' }, { value: '#c4a0e8', label: '紫色' }] },
  { type: 'quote', quote: '甜美，从色彩开始。', author: 'Soft Pastel' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptSoftPastelPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fdf7fb' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '24px', boxShadow: '0 8px 28px rgba(244,155,184,.18)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#a28a99' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(135deg,#f49bb8,#b5d5f0 55%,#c4a0e8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#f49bb8' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#a28a99' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-full" style={{ background: 'linear-gradient(135deg,#f49bb8,#b5d5f0 55%,#c4a0e8)' }} />
                <div className="w-8 h-1 rounded-full" style={{ background: '#fbeef3' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#3a1f33' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#6b4d62' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#f49bb8', '#b5d5f0', '#f7d08a', '#9dd9a3'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#3a1f33' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#fdf0f5', borderRadius: '24px', boxShadow: '0 6px 16px rgba(244,155,184,.12)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#f49bb8', '#b5d5f0', '#f7d08a', '#c4a0e8'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#a28a99' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-full mb-8" style={{ background: 'linear-gradient(135deg,#f49bb8,#b5d5f0 55%,#c4a0e8)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#6b4d62' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#a28a99' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(135deg,#f49bb8,#b5d5f0 55%,#c4a0e8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#a28a99' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#a28a99' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#fdf0f5', borderRadius: '16px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#a28a99' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#a28a99' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#fdf0f5', borderRadius: '16px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#6b4d62' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#f49bb8' } : { background: 'rgba(244,155,184,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#fdf0f5', borderRadius: '16px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#6b4d62' }} />
        </button>
      </div>
    </div>
  )
}
