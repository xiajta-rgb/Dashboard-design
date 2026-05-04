import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  {
    type: 'cover',
    title: '赛博霓虹',
    subtitle: 'CYBERPUNK NEON',
    desc: '霓虹 · 故障 · 暗夜',
  },
  {
    type: 'bullets',
    title: '// 系统特性',
    items: ['纯黑底色 + 霓虹粉青黄三色', 'JetBrains Mono 等宽字体', '发光文字 + 故障闪烁效果', '适合黑客文化与地下科技'],
  },
  {
    type: 'code',
    title: '// 核心协议',
    code: `const NEON = {
  pink: '#ff2bd6',
  cyan: '#00f0ff',
  yellow: '#f9f871',
  mode: 'cyberpunk',
  status: 'ONLINE'
}`,
  },
  {
    type: 'stat',
    title: '// 运行状态',
    stats: [
      { value: '∞', label: 'NEON.LUMEN' },
      { value: '99.9%', label: 'UPTIME' },
      { value: '0ms', label: 'LATENCY' },
      { value: '256bit', label: 'ENCRYPT' },
    ],
  },
  {
    type: 'end',
    title: 'DISCONNECT_',
    subtitle: '系统断开',
  },
]

export default function PptCyberpunkNeonPage() {
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
        background: 'radial-gradient(ellipse at 15% 0%, rgba(255,43,214,.22), transparent 60%), radial-gradient(ellipse at 85% 100%, rgba(0,240,255,.2), transparent 60%), #000000',
      }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{
          aspectRatio: fullscreen ? undefined : '16/9',
          background: '#000000',
          borderRadius: '6px',
          border: '1px solid rgba(255,43,214,.25)',
          boxShadow: '0 0 0 1px rgba(255,43,214,.35), 0 0 24px rgba(255,43,214,.35), 0 0 48px rgba(0,240,255,.18)',
        }}>

        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,43,214,.15) 2px, rgba(255,43,214,.15) 4px)',
          }}
        />

        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10 overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase"
                style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0,240,255,.6)' }}>
                SYS.INIT &gt; PRESENTATION
              </div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4"
                style={{ color: '#f5f7ff', textShadow: '0 0 12px rgba(255,43,214,.6), 0 0 30px rgba(0,240,255,.35)', letterSpacing: '-0.035em', fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
                {slide.title}
              </h1>
              <p className="text-2xl font-light mb-2"
                style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0,240,255,.6)' }}>
                {slide.subtitle}
              </p>
              <p className="text-sm" style={{ color: '#f9f871', opacity: 0.6 }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#ff2bd6,#7a00ff 50%,#00f0ff)', boxShadow: '0 0 12px #ff2bd6' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: 'rgba(255,43,214,.2)' }} />
              </div>
            </>
          )}

          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]"
                style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0,240,255,.6)', fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
                {slide.title}
              </h2>
              <ul className="space-y-4">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#f9f871', opacity: 0.85, fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#ff2bd6' }}>{'>'}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}

          {slide.type === 'code' && (
            <>
              <h2 className="text-[54px] font-bold mb-8 leading-[1.1]"
                style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0,240,255,.6)', fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
                {slide.title}
              </h2>
              <pre className="p-6 text-sm leading-relaxed"
                style={{
                  background: 'rgba(15,15,26,.72)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,43,214,.25)',
                  borderRadius: '6px',
                  fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
                }}>
                <code style={{ color: '#b4b8d4', textShadow: '0 0 4px rgba(0,240,255,.3)' }}>{slide.code}</code>
              </pre>
            </>
          )}

          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]"
                style={{ color: '#00f0ff', textShadow: '0 0 8px rgba(0,240,255,.6)', fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
                {slide.title}
              </h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-4"
                    style={{
                      background: 'rgba(15,15,26,.72)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,43,214,.25)',
                      borderRadius: '6px',
                    }}>
                    <div className="text-4xl font-bold mb-2"
                      style={{ color: '#ff2bd6', textShadow: '0 0 12px rgba(255,43,214,.6)', fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
                      {s.value}
                    </div>
                    <div className="text-[10px] tracking-[0.12em]" style={{ color: '#00f0ff', opacity: 0.5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2"
                style={{ color: '#f5f7ff', textShadow: '0 0 12px rgba(255,43,214,.6), 0 0 30px rgba(0,240,255,.35)', fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
                {slide.title}
              </h1>
              <p className="text-lg" style={{ color: '#6b6e8a' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 right-6 flex items-center gap-3 z-10">
          <span className="text-xs font-mono" style={{ color: '#6b6e8a' }}>{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        </div>

        <button onClick={() => setFullscreen(!fullscreen)}
          className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer z-10"
          style={{ borderRadius: '3px', background: 'rgba(15,15,26,.72)' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#6b6e8a' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#6b6e8a' }} />}
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: 'rgba(15,15,26,.72)', border: '1px solid rgba(255,43,214,.25)', borderRadius: '6px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#00f0ff' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current
              ? { background: '#ff2bd6', boxShadow: '0 0 8px #ff2bd6' }
              : { background: 'rgba(255,43,214,.2)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1}
          className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default"
          style={{ background: 'rgba(15,15,26,.72)', border: '1px solid rgba(255,43,214,.25)', borderRadius: '6px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#00f0ff' }} />
        </button>
      </div>
    </div>
  )
}
