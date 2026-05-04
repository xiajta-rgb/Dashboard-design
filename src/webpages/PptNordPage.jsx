import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Nord', subtitle: '北欧极夜', desc: '冰蓝 · 冷灰 · 沉静' },
  { type: 'bullets', title: '配色方案', items: ['#88c0d0 冰蓝主色', '#81a1c1 蓝灰辅色', '#b48ead 紫色点缀', '#a3be8c 绿色状态'] },
  { type: 'stat', title: '主题参数', stats: [{ value: '#2e3440', label: '背景' }, { value: '#88c0d0', label: '主色' }, { value: '#81a1c1', label: '辅色' }, { value: '#b48ead', label: '强调' }] },
  { type: 'quote', quote: '北极的夜，是最安静的白。', author: 'Nord Theme' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptNordPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#2e3440' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#2e3440', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,.35)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#7b8394' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(135deg,#88c0d0,#81a1c1 50%,#b48ead)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#88c0d0' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#7b8394' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#88c0d0,#81a1c1 50%,#b48ead)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#3b4252' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#eceff4', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#d8dee9' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#88c0d0', '#81a1c1', '#b48ead', '#a3be8c'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#eceff4', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#3b4252', borderRadius: '12px' }}>
                    <div className="text-lg font-bold mb-2 font-mono" style={{ color: ['#88c0d0', '#81a1c1', '#b48ead', '#a3be8c'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#7b8394' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#88c0d0,#81a1c1 50%,#b48ead)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#eceff4' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#7b8394' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(135deg,#88c0d0,#81a1c1 50%,#b48ead)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#7b8394' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#7b8394' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#3b4252', borderRadius: '8px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#7b8394' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#7b8394' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#3b4252', borderRadius: '8px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#d8dee9' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#88c0d0' } : { background: 'rgba(136,192,208,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#3b4252', borderRadius: '8px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#d8dee9' }} />
        </button>
      </div>
    </div>
  )
}
