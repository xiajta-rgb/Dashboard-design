import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  {
    type: 'cover',
    title: '极简白',
    subtitle: 'Minimal White',
    desc: '克制 · 高级 · 不抢内容',
  },
  {
    type: 'bullets',
    title: '设计理念',
    items: ['极低阴影，强文字层级', 'Inter 字体，理性克制', '白底黑字，内容为王', '适合内部汇报与技术评审'],
  },
  {
    type: 'stat',
    title: '核心数据',
    stats: [
      { value: '36', label: '主题数量' },
      { value: '31', label: '布局模板' },
      { value: '47', label: '动画效果' },
      { value: '0', label: '构建依赖' },
    ],
  },
  {
    type: 'quote',
    quote: '好的设计是尽可能少的设计。',
    author: 'Dieter Rams',
  },
  {
    type: 'end',
    title: '谢谢',
    subtitle: 'Thank You',
  },
]

export default function PptMinimalWhitePage() {
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
    <div className="w-full h-full flex items-center justify-center bg-[#f5f5f6] p-4">
      <div className={`relative bg-[#ffffff] flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', borderRadius: '14px', boxShadow: '0 1px 2px rgba(17,18,22,.04), 0 8px 24px rgba(17,18,22,.06)' }}>

        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] text-[#9ca1b0] uppercase">Presentation</div>
              <h1 className="text-[72px] font-extrabold text-[#0c0d10] leading-[1.05] mb-4" style={{ letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-2xl text-[#55596a] font-light mb-2">{slide.subtitle}</p>
              <p className="text-sm text-[#9ca1b0]">{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#111216,#3b3f4a)' }} />
                <div className="w-8 h-1 rounded-sm bg-[#f5f5f6]" />
              </div>
            </>
          )}

          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold text-[#0c0d10] mb-10 leading-[1.1]" style={{ letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <ul className="space-y-5">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg text-[#55596a]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111216] mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold text-[#0c0d10] mb-12 leading-[1.1]" style={{ letterSpacing: '-0.035em' }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-8">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-6 rounded-[14px]" style={{ background: '#f5f5f6', border: '1px solid rgba(17,18,22,.08)' }}>
                    <div className="text-5xl font-extrabold text-[#0c0d10] mb-2">{s.value}</div>
                    <div className="text-sm text-[#9ca1b0]">{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#111216,#3b3f4a)' }} />
              <blockquote className="text-[32px] text-[#0c0d10] text-center leading-[1.2] max-w-lg font-light">
                "{slide.quote}"
              </blockquote>
              <div className="mt-6 text-sm text-[#9ca1b0]">— {slide.author}</div>
            </div>
          )}

          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold text-[#0c0d10] mb-2" style={{ letterSpacing: '-0.035em' }}>{slide.title}</h1>
              <p className="text-xl text-[#9ca1b0]">{slide.subtitle}</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-6 flex items-center gap-3">
          <span className="text-xs text-[#9ca1b0] font-mono">{current + 1} / {slides.length}</span>
        </div>

        <button onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[#f5f5f6] transition-colors cursor-pointer">
          {fullscreen ? <Minimize2 className="w-4 h-4 text-[#9ca1b0]" /> : <Maximize2 className="w-4 h-4 text-[#9ca1b0]" />}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="p-2 rounded-lg bg-white hover:bg-[#f5f5f6] disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ boxShadow: '0 1px 2px rgba(17,18,22,.04), 0 8px 24px rgba(17,18,22,.06)' }}>
          <ChevronLeft className="w-4 h-4 text-[#55596a]" />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'bg-[#111216] w-6' : 'bg-[#9ca1b0]/40'}`} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1}
          className="p-2 rounded-lg bg-white hover:bg-[#f5f5f6] disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ boxShadow: '0 1px 2px rgba(17,18,22,.04), 0 8px 24px rgba(17,18,22,.06)' }}>
          <ChevronRight className="w-4 h-4 text-[#55596a]" />
        </button>
      </div>
    </div>
  )
}
