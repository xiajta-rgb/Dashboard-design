import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Editorial', subtitle: '杂志风衬线', desc: '高级 · 优雅 · 印刷品质' },
  { type: 'bullets', title: '风格特征', items: ['#8a2a1c 深红主色', '#c97a4a 琥珀辅色', 'Playfair Display 衬线字体', '极简留白 + 高级排版'] },
  { type: 'stat', title: '主题参数', stats: [{ value: '#faf7f2', label: '背景' }, { value: '#8a2a1c', label: '主色' }, { value: '#c97a4a', label: '辅色' }, { value: '#1b1410', label: '文字' }] },
  { type: 'quote', quote: '好的排版，让文字自己说话。', author: 'Editorial Design' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptEditorialSerifPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#faf7f2' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#faf7f2', borderRadius: '4px', boxShadow: '0 2px 12px rgba(40,28,18,.06)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#8a7868', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4 italic" style={{ color: '#1b1410', fontFamily: "'Playfair Display', 'Noto Serif SC', serif", letterSpacing: '-0.02em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#8a2a1c', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8a7868' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#8a2a1c,#c97a4a)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#f3efe6' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1] italic" style={{ color: '#1b1410', fontFamily: "'Playfair Display', 'Noto Serif SC', serif", letterSpacing: '-0.02em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#5c4a3e' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#8a2a1c', '#c97a4a', '#3f7d4f', '#b07a1f'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1] italic" style={{ color: '#1b1410', fontFamily: "'Playfair Display', 'Noto Serif SC', serif", letterSpacing: '-0.02em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#ffffff', borderRadius: '4px', boxShadow: '0 2px 12px rgba(40,28,18,.06)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#8a2a1c', '#c97a4a', '#1b1410', '#3f7d4f'][i], fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#8a7868' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#8a2a1c,#c97a4a)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light italic" style={{ color: '#1b1410', fontFamily: "'Playfair Display', 'Noto Serif SC', serif" }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#8a7868' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2 italic" style={{ color: '#1b1410', fontFamily: "'Playfair Display', 'Noto Serif SC', serif", letterSpacing: '-0.02em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#8a7868' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#8a7868' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#ffffff', borderRadius: '2px', boxShadow: '0 2px 12px rgba(40,28,18,.06)' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#8a7868' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#8a7868' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#ffffff', borderRadius: '2px', boxShadow: '0 2px 12px rgba(40,28,18,.06)' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#5c4a3e' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#8a2a1c' } : { background: 'rgba(138,42,28,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#ffffff', borderRadius: '2px', boxShadow: '0 2px 12px rgba(40,28,18,.06)' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#5c4a3e' }} />
        </button>
      </div>
    </div>
  )
}
