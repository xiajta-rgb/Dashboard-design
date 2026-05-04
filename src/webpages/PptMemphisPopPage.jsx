import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Memphis', subtitle: '孟菲斯波普', desc: '彩色圆点 · 粗边框 · 波普艺术' },
  { type: 'bullets', title: '设计要素', items: ['彩色圆点背景', '2.5px粗黑边框', '5px硬投影', 'Space Grotesk 字体'] },
  { type: 'stat', title: '色彩系统', stats: [{ value: '#ff3d8b', label: '粉红' }, { value: '#37c2d7', label: '青蓝' }, { value: '#ffcc00', label: '明黄' }, { value: '#6ac04c', label: '绿' }] },
  { type: 'quote', quote: '艺术，就是大胆的色彩。', author: 'Memphis Pop' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptMemphisPopPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fef6e8',
      backgroundImage: 'radial-gradient(circle at 10% 20%,#ff3d8b 3px,transparent 4px), radial-gradient(circle at 80% 40%,#37c2d7 3px,transparent 4px), radial-gradient(circle at 30% 80%,#ffcc00 3px,transparent 4px)',
      backgroundSize: '200px 200px,220px 220px,260px 260px' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '10px', boxShadow: '5px 5px 0 #111' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-bold tracking-[0.2em] uppercase" style={{ color: '#ff3d8b' }}>POP ART</div>
              <h1 className="text-[72px] font-black leading-[1.05] mb-4" style={{ color: '#111111', fontFamily: "'Archivo Black', sans-serif" }}>{slide.title}</h1>
              <p className="text-2xl font-bold mb-2" style={{ color: '#ff3d8b' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-3">
                <div className="w-8 h-8 rounded-full" style={{ background: '#ff3d8b' }} />
                <div className="w-8 h-8 rounded-full" style={{ background: '#37c2d7' }} />
                <div className="w-8 h-8 rounded-full" style={{ background: '#ffcc00' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-black mb-10 leading-[1.1]" style={{ color: '#111111', fontFamily: "'Archivo Black', sans-serif" }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg font-bold" style={{ color: '#333333' }}>
                    <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: ['#ff3d8b', '#37c2d7', '#ffcc00', '#6ac04c'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-black mb-12 leading-[1.1]" style={{ color: '#111111', fontFamily: "'Archivo Black', sans-serif" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '2.5px solid #111', borderRadius: '10px', boxShadow: '5px 5px 0 #111' }}>
                    <div className="text-4xl font-black mb-2" style={{ color: ['#ff3d8b', '#37c2d7', '#ffcc00', '#6ac04c'][i] }}>{s.value}</div>
                    <div className="text-xs font-bold" style={{ color: '#666666' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="flex gap-3 mb-8">
                <div className="w-6 h-6 rounded-full" style={{ background: '#ff3d8b' }} />
                <div className="w-6 h-6 rounded-full" style={{ background: '#37c2d7' }} />
                <div className="w-6 h-6 rounded-full" style={{ background: '#ffcc00' }} />
              </div>
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-black" style={{ color: '#111111', fontFamily: "'Archivo Black', sans-serif" }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm font-bold" style={{ color: '#666666' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-black mb-2" style={{ color: '#111111', fontFamily: "'Archivo Black', sans-serif" }}>{slide.title}</h1>
              <p className="text-xl font-bold" style={{ color: '#666666' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono font-bold" style={{ color: '#666666' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ border: '2.5px solid #111', borderRadius: '6px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#111' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#111' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2.5px solid #111', borderRadius: '6px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#111' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: ['#ff3d8b', '#37c2d7', '#ffcc00', '#6ac04c', '#111'][i % 5] } : { background: '#fff1d1', border: '1px solid #111' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ border: '2.5px solid #111', borderRadius: '6px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#111' }} />
        </button>
      </div>
    </div>
  )
}
