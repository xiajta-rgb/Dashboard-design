import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  {
    type: 'cover',
    title: '东京夜',
    subtitle: 'Tokyo Night',
    desc: '深蓝 · 紫光 · 霓虹',
  },
  {
    type: 'bullets',
    title: '设计语言',
    items: ['#1a1b26 深蓝底色，沉浸感极强', '#7aa2f7 蓝紫主色 + #bb9af7 紫色辅色', '#7dcfff 青色点缀，信息层次分明', '适合开发者工具与夜间模式展示'],
  },
  {
    type: 'stat',
    title: '色板参数',
    stats: [
      { value: '#1a1b26', label: '背景色' },
      { value: '#7aa2f7', label: '主色调' },
      { value: '#bb9af7', label: '辅助色' },
      { value: '#7dcfff', label: '强调色' },
    ],
  },
  {
    type: 'quote',
    quote: '夜色不是终点，而是另一种开始。',
    author: 'Tokyo Night Theme',
  },
  {
    type: 'end',
    title: 'おやすみ',
    subtitle: 'Good Night',
  },
]

export default function PptTokyoNightPage() {
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
        background: 'radial-gradient(ellipse at 30% 20%, rgba(122,162,247,.15), transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(187,154,247,.12), transparent 50%), #1a1b26',
      }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{
          aspectRatio: fullscreen ? undefined : '16/9',
          background: '#1a1b26',
          borderRadius: '14px',
          border: '1px solid rgba(122,162,247,.15)',
          boxShadow: '0 20px 60px rgba(0,0,0,.5)',
        }}>

        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#565f89' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ color: '#c0caf5', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#7aa2f7' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#565f89' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#7aa2f7,#bb9af7 55%,#f7768e)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: 'rgba(122,162,247,.15)' }} />
              </div>
            </>
          )}

          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#c0caf5', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#a9b1d6' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: '#7aa2f7' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#c0caf5', letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5"
                    style={{
                      background: '#24283b',
                      border: '1px solid rgba(122,162,247,.15)',
                      borderRadius: '14px',
                    }}>
                    <div className="text-lg font-bold mb-2 font-mono" style={{ color: '#7dcfff' }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#565f89' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#7aa2f7,#bb9af7 55%,#f7768e)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#a9b1d6' }}>
                "{slide.quote}"
              </blockquote>
              <div className="mt-6 text-sm" style={{ color: '#565f89' }}>— {slide.author}</div>
            </div>
          )}

          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ color: '#c0caf5', letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#565f89' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-6 flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#565f89' }}>{current + 1} / {slides.length}</span>
        </div>

        <button onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer"
          style={{ background: '#24283b', borderRadius: '8px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#565f89' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#565f89' }} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: '#24283b', border: '1px solid rgba(122,162,247,.15)', borderRadius: '8px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#a9b1d6' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current
              ? { background: '#7aa2f7' }
              : { background: 'rgba(122,162,247,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: '#24283b', border: '1px solid rgba(122,162,247,.15)', borderRadius: '8px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#a9b1d6' }} />
        </button>
      </div>
    </div>
  )
}
