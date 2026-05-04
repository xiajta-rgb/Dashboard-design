import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'

const slides = [
  { type: 'cover', title: 'Terminal', subtitle: '终端绿屏', desc: '纯绿 · 等宽 · 极客' },
  { type: 'bullets', title: '系统特性', items: ['#00ff88 纯绿发光文字', 'JetBrains Mono 等宽字体', '纯黑底色 + 绿色扫描线', '适合技术分享与黑客演示'] },
  { type: 'stat', title: '运行状态', stats: [{ value: '00ff88', label: 'PHOSPHOR' }, { value: '100%', label: 'UPTIME' }, { value: '0ms', label: 'PING' }, { value: 'root', label: 'USER' }] },
  { type: 'quote', quote: '在终端里，每一行都是命令。', author: 'Terminal Philosophy' },
  { type: 'end', title: 'exit 0', subtitle: '进程结束' },
]

export default function PptTerminalGreenPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#030a04' }}>
      <div className={`relative flex flex-col ${fullscreen ? 'w-full h-full' : 'w-full max-w-4xl'}`}
        style={{ aspectRatio: fullscreen ? undefined : '16/9', background: '#030a04', borderRadius: '4px', border: '1px solid rgba(0,255,120,.22)', boxShadow: '0 0 30px rgba(0,255,136,.15)' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,120,.1) 2px, rgba(0,255,120,.1) 4px)' }} />
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10 overflow-hidden">
          {slide.type === 'cover' && (
            <>
              <div className="absolute top-8 left-16 text-[13px] font-medium tracking-[0.16em] uppercase" style={{ color: '#2f8a4d', fontFamily: "'JetBrains Mono', monospace" }}>$ ./presentation --start</div>
              <h1 className="text-[72px] font-extrabold leading-[1.05] mb-4" style={{ color: '#00ff88', textShadow: '0 0 12px rgba(0,255,136,.5), 0 0 30px rgba(0,255,136,.2)', fontFamily: "'JetBrains Mono', monospace" }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#67ffd0' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#2f8a4d' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-1 rounded-sm" style={{ background: 'linear-gradient(135deg,#00ff88,#67ffd0)', boxShadow: '0 0 12px rgba(0,255,136,.4)' }} />
                <div className="w-8 h-1 rounded-sm" style={{ background: 'rgba(0,255,120,.1)' }} />
              </div>
            </>
          )}
          {slide.type === 'bullets' && (
            <>
              <h2 className="text-[54px] font-bold mb-10 leading-[1.1]" style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0,255,136,.4)', fontFamily: "'JetBrains Mono', monospace" }}>{slide.title}</h2>
              <ul className="space-y-4">
                {slide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg" style={{ color: '#8cff9a', fontFamily: "'JetBrains Mono', monospace" }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: '#00ff88' }}>{'>'}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          {slide.type === 'stat' && (
            <>
              <h2 className="text-[54px] font-bold mb-12 leading-[1.1]" style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0,255,136,.4)', fontFamily: "'JetBrains Mono', monospace" }}>{slide.title}</h2>
              <div className="grid grid-cols-4 gap-6">
                {slide.stats.map((s, i) => (
                  <div key={i} className="text-center p-4" style={{ background: 'rgba(10,27,16,.6)', border: '1px solid rgba(0,255,120,.3)', borderRadius: '4px' }}>
                    <div className="text-lg font-bold mb-2 font-mono" style={{ color: '#00ff88', textShadow: '0 0 8px rgba(0,255,136,.4)' }}>{s.value}</div>
                    <div className="text-[10px] tracking-[0.12em]" style={{ color: '#2f8a4d' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'quote' && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-1 rounded-sm mb-8" style={{ background: 'linear-gradient(135deg,#00ff88,#67ffd0)', boxShadow: '0 0 12px rgba(0,255,136,.4)' }} />
              <blockquote className="text-[32px] text-center leading-[1.2] max-w-lg font-light font-mono" style={{ color: '#8cff9a', textShadow: '0 0 4px rgba(0,255,136,.3)' }}>"{slide.quote}"</blockquote>
              <div className="mt-6 text-sm" style={{ color: '#2f8a4d' }}>— {slide.author}</div>
            </div>
          )}
          {slide.type === 'end' && (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-[72px] font-extrabold mb-2" style={{ color: '#00ff88', textShadow: '0 0 12px rgba(0,255,136,.5)', fontFamily: "'JetBrains Mono', monospace" }}>{slide.title}</h1>
              <p className="text-lg" style={{ color: '#2f8a4d' }}>{slide.subtitle}</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 right-6 flex items-center gap-3 z-10"><span className="text-xs font-mono" style={{ color: '#2f8a4d' }}>{String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span></div>
        <button onClick={() => setFullscreen(!fullscreen)} className="absolute top-4 right-4 p-1.5 transition-colors cursor-pointer z-10" style={{ borderRadius: '2px', background: 'rgba(10,27,16,.6)' }}>
          {fullscreen ? <Minimize2 className="w-4 h-4" style={{ color: '#2f8a4d' }} /> : <Maximize2 className="w-4 h-4" style={{ color: '#2f8a4d' }} />}
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button onClick={() => go(-1)} disabled={current === 0} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(10,27,16,.6)', border: '1px solid rgba(0,255,120,.3)', borderRadius: '4px' }}>
          <ChevronLeft className="w-4 h-4" style={{ color: '#00ff88' }} />
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : ''}`}
            style={i === current ? { background: '#00ff88', boxShadow: '0 0 8px #00ff88' } : { background: 'rgba(0,255,120,.15)' }} />
        ))}
        <button onClick={() => go(1)} disabled={current === slides.length - 1} className="p-2 disabled:opacity-30 transition cursor-pointer disabled:cursor-default" style={{ background: 'rgba(10,27,16,.6)', border: '1px solid rgba(0,255,120,.3)', borderRadius: '4px' }}>
          <ChevronRight className="w-4 h-4" style={{ color: '#00ff88' }} />
        </button>
      </div>
    </div>
  )
}
