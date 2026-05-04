import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: 'HERMES', subtitle: 'Cyber Terminal', desc: 'Honest Tech Review Record' },
  { type: 'terminal', title: '终端记录', subtitle: 'Terminal Session', desc: '黑底 + 终端 chrome + 扫描线 + 薄荷绿 glow', cmd: '$ hermes run --trace --record', output: ['[INFO] Initializing HERMES agent...', '[TRACE] Loading model configuration...', '[OK] Agent ready. Awaiting input.'] },
  { type: 'review', title: '实测对比', subtitle: 'Honest Review', desc: '技术人 honest review 的视觉语气', items: [{ label: '性能', score: 85, color: '#7ed3a4' }, { label: '易用性', score: 72, color: '#e8a87c' }, { label: '文档', score: 90, color: '#7eb8da' }] },
  { type: 'trace', title: 'Trace 分析', subtitle: 'Long Trace', desc: '适合长 trace / long code 的场景', traces: ['[2024-01-15 10:23:41] GET /api/v1/status → 200 (42ms)', '[2024-01-15 10:23:42] POST /api/v1/run → 200 (1.2s)', '[2024-01-15 10:23:44] GET /api/v1/results → 200 (89ms)'] },
  { type: 'summary', title: '总结', subtitle: 'Verdict', desc: '技术评测的终极判断', verdict: '推荐用于 CLI / Agent / 开发者工具评测场景' },
]

export default function PptHermesCyberTerminalPage() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrent(p => Math.min(p + 1, slides.length - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrent(p => Math.max(p - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const slide = slides[current]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#0a0c10' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#0a0c10', borderRadius: '4px', overflow: 'hidden', fontFamily: "'JetBrains Mono', monospace" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', opacity: 0.3 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)' }} />
        <div className="flex-1 flex flex-col px-12 py-8 relative z-10">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/[0.08]">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            <span className="ml-4 text-xs" style={{ color: '#5a5a6a' }}>hermes-terminal — bash</span>
          </div>
          {slide.type === 'cover' && (
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#7ed3a4', textShadow: '0 0 20px rgba(126,211,164,0.4)' }}>{slide.title}</h1>
              <p className="text-xl mb-2" style={{ color: '#e8a87c' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#5a5a6a' }}>{slide.desc}</p>
            </div>
          )}
          {slide.type === 'terminal' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7ed3a4' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ color: '#7ed3a4', textShadow: '0 0 16px rgba(126,211,164,0.3)' }}>{slide.title}</h2>
              <p className="text-base mb-6" style={{ color: '#8a8a9a' }}>{slide.desc}</p>
              <div className="p-5 rounded" style={{ background: '#15151b', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="mb-3">
                  <span style={{ color: '#7ed3a4' }}>$ </span>
                  <span style={{ color: '#e8a87c' }}>{slide.cmd}</span>
                  <span className="animate-pulse" style={{ color: '#7ed3a4' }}> █</span>
                </div>
                <div className="space-y-1 mt-4 pt-4 border-t border-white/[0.06]">
                  {slide.output.map((line, i) => (
                    <div key={i} className="text-sm" style={{ color: i === 2 ? '#7ed3a4' : '#8a8a9a' }}>{line}</div>
                  ))}
                </div>
              </div>
            </>
          )}
          {slide.type === 'review' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7ed3a4' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ color: '#7ed3a4', textShadow: '0 0 16px rgba(126,211,164,0.3)' }}>{slide.title}</h2>
              <p className="text-base mb-6" style={{ color: '#8a8a9a' }}>{slide.desc}</p>
              <div className="space-y-5">
                {slide.items.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm" style={{ color: '#c4c4d4' }}>{item.label}</span>
                      <span className="text-sm font-bold" style={{ color: item.color }}>{item.score}%</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full" style={{ width: `${item.score}%`, background: item.color, boxShadow: `0 0 8px ${item.color}40` }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'trace' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7ed3a4' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ color: '#7ed3a4', textShadow: '0 0 16px rgba(126,211,164,0.3)' }}>{slide.title}</h2>
              <p className="text-base mb-6" style={{ color: '#8a8a9a' }}>{slide.desc}</p>
              <div className="p-5 rounded" style={{ background: '#15151b', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="space-y-2">
                  {slide.traces.map((trace, i) => (
                    <div key={i} className="text-sm" style={{ color: '#8a8a9a', fontFamily: "'JetBrains Mono', monospace" }}>{trace}</div>
                  ))}
                </div>
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <h1 className="text-[64px] font-bold leading-[1.05] mb-6" style={{ color: '#7ed3a4', textShadow: '0 0 20px rgba(126,211,164,0.4)' }}>{slide.title}</h1>
              <p className="text-xl mb-4" style={{ color: '#e8a87c' }}>{slide.subtitle}</p>
              <div className="px-8 py-4 rounded" style={{ background: '#15151b', border: '1px solid rgba(126,211,164,0.3)' }}>
                <p className="text-base" style={{ color: '#7ed3a4' }}>{slide.verdict}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ color: '#5a5a6a' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#7ed3a4' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
