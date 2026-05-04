import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  {
    type: 'cover',
    title: '融资路演',
    subtitle: 'Pitch Deck VC',
    desc: '专业 · 渐变 · 说服力',
  },
  {
    type: 'bullets',
    title: '核心优势',
    items: ['#0070f3 蓝紫渐变，专业可信', 'Inter 字体，现代简洁', '强对比数据展示，说服力极强', '适合融资路演与商业计划书'],
  },
  {
    type: 'stat',
    title: '关键指标',
    stats: [
      { value: '$12M', label: '融资金额' },
      { value: '300%', label: '年增长率' },
      { value: '50K+', label: '活跃用户' },
      { value: '98%', label: '留存率' },
    ],
  },
  {
    type: 'quote',
    quote: '最好的路演不是讲故事，而是让数据自己说话。',
    author: 'VC Pitch Philosophy',
  },
  {
    type: 'end',
    title: '谢谢',
    subtitle: 'Thank You',
  },
]

export default function PptPitchDeckVCPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse at 30% 30%, rgba(0,112,243,.08), transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(121,40,202,.06), transparent 60%), #f5f5f6',
      }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{
          aspectRatio: fullscreen ? undefined : '16/9',
          background: '#ffffff',
          borderRadius: '14px',
          boxShadow: '0 1px 2px rgba(11,13,18,.04), 0 8px 24px rgba(11,13,18,.06)',
        }}>

        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#7a829e' }}>Investor Deck</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ color: '#0b0d12', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ background: 'linear-gradient(135deg,#0070f3,#7928ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#7a829e' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#0070f3,#7928ca)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#f5f5f6' }} />
              </div>
            </>
          )}

          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#0b0d12', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#4a5270' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: '#0070f3' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#0b0d12', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5"
                    style={{
                      background: '#f5f5f6',
                      border: '1px solid rgba(11,13,18,.06)',
                      borderRadius: '14px',
                    }}>
                    <div className="text-4xl font-bold mb-2" style={{ background: 'linear-gradient(135deg,#0070f3,#7928ca)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#7a829e' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#0070f3,#7928ca)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#0b0d12' }}>
                "{slide.quote}"
              </blockquote>
              <div className="mt-6 text-sm" style={{ color: '#7a829e' }}>— {slide.author}</div>
            </div>
          )}

          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ color: '#0b0d12', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#7a829e' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-6 flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#7a829e' }}>{current + 1} / {slides.length}</span>
        </div>

        <button onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer"
          style={{ background: '#f5f5f6', borderRadius: '8px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#7a829e' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#7a829e' }} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: '#ffffff', border: '1px solid rgba(11,13,18,.06)', borderRadius: '8px', boxShadow: '0 1px 2px rgba(11,13,18,.04)' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#4a5270' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current
              ? { background: '#0070f3' }
              : { background: 'rgba(0,112,243,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: '#ffffff', border: '1px solid rgba(11,13,18,.06)', borderRadius: '8px', boxShadow: '0 1px 2px rgba(11,13,18,.04)' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#4a5270' }} />
        </button>
      </div>
    </div>
  )
}
