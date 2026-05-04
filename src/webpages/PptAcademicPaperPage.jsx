import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Academic', subtitle: '学术论文', desc: '严肃 · 衬线 · 无装饰' },
  { type: 'bullets', title: '研究要点', items: ['拉丁现代罗马字体', '深蓝+黑色配色', '无阴影无圆角', '适合学术答辩'] },
  { type: 'stat', title: '论文数据', stats: [{ value: '128', label: '样本数' }, { value: '0.05', label: 'P值' }, { value: '95%', label: '置信区间' }, { value: '3.2', label: '影响因子' }] },
  { type: 'quote', quote: '学术的严谨，从排版开始。', author: 'Academic Design' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptAcademicPaperPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fdfcf8' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#fdfcf8', borderRadius: '0px' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#1a3a7a', fontStyle: 'italic' }}>Presentation</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#1a3a7a' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#707070' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-0.5" style={{ background: '#0a0a0a' }} />
                <div className="w-8 h-0.5" style={{ background: '#707070' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#333333' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#1a3a7a', '#0a0a0a', '#8a1a1a', '#1a5a2a'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ border: '1px solid rgba(20,20,20,.14)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#1a3a7a', '#0a0a0a', '#8a1a1a', '#1a5a2a'][i], fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#707070' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-0.5 mb-8" style={{ background: '#0a0a0a' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light italic" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#707070' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-bold mb-2" style={{ color: '#0a0a0a', fontFamily: "'Playfair Display', 'Noto Serif SC', Georgia, serif" }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#707070' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#707070' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#ffffff', border: '1px solid rgba(20,20,20,.14)' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#707070' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#707070' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#ffffff', border: '1px solid rgba(20,20,20,.14)' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#333333' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#1a3a7a' } : { background: 'rgba(26,58,122,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#ffffff', border: '1px solid rgba(20,20,20,.14)' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#333333' }} />
        </button>
      </div>
    </div>
  )
}
