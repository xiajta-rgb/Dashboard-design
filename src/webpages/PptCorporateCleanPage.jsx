import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Corporate', subtitle: '企业商务', desc: '专业 · 简洁 · 商务蓝' },
  { type: 'bullets', title: '商务要点', items: ['深蓝+白色配色', '6px圆角', '轻量投影', '适合企业汇报'] },
  { type: 'stat', title: '业务指标', stats: [{ value: '98%', label: '满意度' }, { value: '2.4x', label: '增长率' }, { value: '156', label: '客户数' }, { value: '$4.2M', label: '营收' }] },
  { type: 'quote', quote: '专业，从每一个细节开始。', author: 'Corporate Design' },
  { type: 'end', title: '谢谢', subtitle: 'Thank You' },
]

export default function PptCorporateCleanPage() {
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
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#ffffff', borderRadius: '6px', boxShadow: '0 4px 12px rgba(10,37,64,.1),0 16px 40px rgba(10,37,64,.08)' }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{ background: 'linear-gradient(135deg,#0a2540,#1d4ed8)', borderRadius: '50%', transform: 'translate(30%,-30%)' }} />
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#1d4ed8' }}>BUSINESS</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#0a2540' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#1d4ed8' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8898aa' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-14 h-1 rounded-sm" style={{ background: '#0a2540' }} />
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#0a2540' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#425466' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: ['#0a2540', '#1d4ed8', '#64748b', '#0e9f6e'][i] }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#0a2540' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5" style={{ background: '#f5f7fa', borderRadius: '6px', boxShadow: '0 1px 3px rgba(10,37,64,.08)' }}>
                    <div className="text-4xl font-bold mb-2" style={{ color: ['#0a2540', '#1d4ed8', '#0e9f6e', '#d97706'][i] }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#8898aa' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-14 h-1 rounded-sm mb-8" style={{ background: '#0a2540' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#425466' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#8898aa' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-bold mb-2" style={{ color: '#0a2540' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#8898aa' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3"><span className="text-xs font-mono" style={{ color: '#8898aa' }}>{current + 1} / {slides.length}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer" style={{ background: '#f5f7fa', borderRadius: '4px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#8898aa' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#8898aa' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f5f7fa', borderRadius: '4px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#425466' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#0a2540' } : { background: 'rgba(10,37,64,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: '#f5f7fa', borderRadius: '4px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#425466' }} />
        </button>
      </div>
    </div>
  )
}
