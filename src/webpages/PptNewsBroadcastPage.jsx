import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'News', subtitle: '新闻播报', desc: '红黑配色 · 粗体标题 · 新闻感' },
  { type: 'bullets', title: '设计要素', items: ['红色侧边栏', '粗黑边框', '6px红色底投影', 'Oswald 字体'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#e11d2d', label: '新闻红' }, { value: '#0a0a0a', label: '黑色' }, { value: '#ffd100', label: '黄色' }, { value: '#ffffff', label: '白色' }] },
  { type: 'quote', quote: '新闻，让世界更近。', author: 'News Broadcast' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptNewsBroadcastPage() {
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
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '0px', boxShadow: '6px 6px 0 #e11d2d' }}>
        <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: '#e11d2d' }} />
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden ml-2">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-bold tracking-[0.15em] uppercase px-3 py-1" style={{ background: '#e11d2d', color: '#fff' }}>BREAKING</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4 mt-8" style={{ color: '#0a0a0a', fontFamily: "'Oswald', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{slide.title}</h1>
              <p className="text-2xl font-bold mb-2" style={{ color: '#e11d2d' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#7a7a7a' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-full h-1.5" style={{ background: '#e11d2d', left: '64px', width: 'calc(100% - 64px)' }} />
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#0a0a0a', fontFamily: "'Oswald', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-bold" style={{ color: '#3a3a3a' }}>
                    <span className="w-1.5 h-1.5 mt-2.5 flex-shrink-0" style={{ background: ['#e11d2d', '#0a0a0a', '#ffd100', '#0e7c3a'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#0a0a0a', fontFamily: "'Oswald', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '2px solid #0a0a0a', boxShadow: '6px 6px 0 #e11d2d' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#e11d2d', '#0a0a0a', '#ffd100', '#0e7c3a'][i], fontFamily: "'Oswald', 'Inter', 'Noto Sans SC', sans-serif" }}>{s.value}</div>
                    <div className="text-xs font-bold" style={{ color: '#7a7a7a' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-full h-1.5 mb-8" style={{ background: '#e11d2d' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-bold" style={{ color: '#0a0a0a', fontFamily: "'Oswald', 'Inter', 'Noto Sans SC', sans-serif" }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-bold tracking-[0.15em] uppercase px-3 py-1" style={{ background: '#e11d2d', color: '#fff' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-bold mb-2" style={{ color: '#0a0a0a', fontFamily: "'Oswald', 'Inter', 'Noto Sans SC', sans-serif", textTransform: 'uppercase', letterSpacing: '-0.01em' }}>{slide.title}</h1>
              <p className="text-xl font-bold" style={{ color: '#7a7a7a' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono font-bold" style={{ color: '#7a7a7a' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ border: '2px solid #0a0a0a' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#7a7a7a' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#7a7a7a' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2px solid #0a0a0a' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#3a3a3a' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#e11d2d' } : { background: 'rgba(225,29,45,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2px solid #0a0a0a' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#3a3a3a' }} />
        </button>
      </div>
    </div>
  )
}
