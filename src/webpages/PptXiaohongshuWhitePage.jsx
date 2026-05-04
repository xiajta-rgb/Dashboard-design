import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  {
    type: 'cover',
    title: '小红书白',
    subtitle: 'Xiaohongshu White',
    desc: '暖白 · 柔粉 · 生活感',
  },
  {
    type: 'bullets',
    title: '设计理念',
    items: ['#fffdfb 暖白底色，温柔不刺眼', '#ff2742 品牌红 + #ff7a90 柔粉', 'Noto Serif SC 衬线标题，文艺气质', '适合生活方式与内容分享场景'],
  },
  {
    type: 'stat',
    title: '核心参数',
    stats: [
      { value: '20px', label: '圆角半径' },
      { value: '#ff2742', label: '品牌色' },
      { value: '衬线', label: '标题字体' },
      { value: '暖白', label: '底色基调' },
    ],
  },
  {
    type: 'quote',
    quote: '生活不在别处，就在此刻。',
    author: '小红书',
  },
  {
    type: 'end',
    title: '谢谢',
    subtitle: 'Thank You',
  },
]

export default function PptXiaohongshuWhitePage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fff6f1' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{
          aspectRatio: fullscreen ? undefined : '16/9',
          background: '#fffdfb',
          borderRadius: '20px',
          boxShadow: '0 1px 2px rgba(26,18,16,.04), 0 8px 24px rgba(26,18,16,.06)',
        }}>

        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#a08d85' }}>Presentation</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ color: '#1a1210', letterSpacing: '-0.035em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#ff2742' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#a08d85' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#ff2742,#ff7a90 55%,#ffb38a)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: '#fff6f1' }} />
              </div>
            </>
          )}

          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#1a1210', letterSpacing: '-0.035em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#4f3a32' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: '#ff2742' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#1a1210', letterSpacing: '-0.035em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-5"
                    style={{
                      background: '#fff6f1',
                      border: '1px solid rgba(26,18,16,.06)',
                      borderRadius: '20px',
                    }}>
                    <div className="text-4xl font-bold mb-2 font-mono" style={{ color: '#ff2742' }}>{s.value}</div>
                    <div className="text-xs" style={{ color: '#a08d85' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#ff2742,#ff7a90 55%,#ffb38a)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light" style={{ color: '#1a1210', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>
                "{slide.quote}"
              </blockquote>
              <div className="mt-6 text-sm" style={{ color: '#a08d85' }}>— {slide.author}</div>
            </div>
          )}

          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ color: '#1a1210', letterSpacing: '-0.035em', fontFamily: "'Noto Serif SC', 'Playfair Display', serif" }}>{slide.title}</h1>
              <p className="text-xl" style={{ color: '#a08d85' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-6 flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: '#a08d85' }}>{current + 1} / {slides.length}</span>
        </div>

        <button onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer"
          style={{ background: '#fff6f1', borderRadius: '12px' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#a08d85' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#a08d85' }} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: '#fffdfb', border: '1px solid rgba(26,18,16,.06)', borderRadius: '12px', boxShadow: '0 1px 2px rgba(26,18,16,.04)' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#4f3a32' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current
              ? { background: '#ff2742' }
              : { background: 'rgba(255,39,66,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: '#fffdfb', border: '1px solid rgba(26,18,16,.06)', borderRadius: '12px', boxShadow: '0 1px 2px rgba(26,18,16,.04)' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#4f3a32' }} />
        </button>
      </div>
    </div>
  )
}
