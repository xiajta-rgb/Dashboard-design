import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Dracula', subtitle: '德古拉暗色', desc: '紫粉青 · 经典暗色主题' },
  { type: 'bullets', title: '配色方案', items: ['#bd93f9 紫色主调', '#ff79c6 粉色点缀', '#8be9fd 青色辅助', '#50fa7b 绿色状态'] },
  { type: 'stat', title: '主题参数', stats: [{ value: '#282a36', label: '背景' }, { value: '#bd93f9', label: '主色' }, { value: '#ff79c6', label: '辅色' }, { value: '#8be9fd', label: '强调' }] },
  { type: 'quote', quote: '暗色不是黑暗，而是另一种光明。', author: 'Dracula Theme' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptDraculaPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#282a36' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#282a36', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,.4)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#6272a4' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ background: 'linear-gradient(135deg,#bd93f9,#ff79c6 55%,#8be9fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#bd93f9' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#6272a4' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#bd93f9,#ff79c6 55%,#8be9fd)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#343746' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#f8f8f2', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#bdbde0' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#bd93f9', '#ff79c6', '#8be9fd', '#50fa7b'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#f8f8f2', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#343746', borderRadius: '12px' }}>
                    <div className="text-lg font-bold mb-2 font-mono" style={{ color: ['#bd93f9', '#ff79c6', '#8be9fd', '#50fa7b'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#6272a4' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#bd93f9,#ff79c6 55%,#8be9fd)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#f8f8f2' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#6272a4' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ background: 'linear-gradient(135deg,#bd93f9,#ff79c6 55%,#8be9fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#6272a4' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#6272a4' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#343746', borderRadius: '8px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#6272a4' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#6272a4' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#343746', borderRadius: '8px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#bdbde0' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#bd93f9' } : { background: 'rgba(189,147,249,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#343746', borderRadius: '8px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#bdbde0' }} />
        </button>
      </div>
    </div>
  )
}
