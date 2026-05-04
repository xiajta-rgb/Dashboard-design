import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: '安全警报', subtitle: 'Testing Safety Alert', desc: 'Critical security vulnerability notification' },
  { type: 'alert', title: '严重漏洞', subtitle: 'Critical Alert', desc: 'CVE-2024-XXXX: Remote Code Execution', severity: 'CRITICAL', cvss: '9.8' },
  { type: 'impact', title: '影响范围', subtitle: 'Impact Scope', desc: 'All versions prior to 2.4.1 are affected', versions: ['v1.0.0 - v1.9.x', 'v2.0.0 - v2.3.x', 'v2.4.0'], safe: 'v2.4.1+' },
  { type: 'fix', title: '修复方案', subtitle: 'Remediation', desc: 'Immediate action required', steps: ['升级到 v2.4.1 或更高版本', '应用临时补丁（如无法立即升级）', '监控日志中的异常访问模式', '报告任何可疑活动'] },
  { type: 'timeline', title: '时间线', subtitle: 'Timeline', desc: 'Responsible disclosure process', events: [{ date: '2024-01-10', event: '漏洞发现' }, { date: '2024-01-12', event: '报告厂商' }, { date: '2024-01-20', event: '补丁发布' }, { date: '2024-01-25', event: '公开披露' }] },
  { type: 'summary', title: '总结', subtitle: 'Summary', desc: '立即采取行动保护您的系统', action: '升级至 v2.4.1+ 并验证修复' },
]

export default function PptTestingSafetyAlertPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#1a0a0a' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: 'linear-gradient(180deg, #1a0a0a, #0f0505)', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#ef4444' }}>Security Advisory</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#ef4444' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#9ca3af' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'alert' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#ef4444' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-6" style={{ color: '#ef4444' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#9ca3af' }}>{slide.desc}</p>
              <div className="flex gap-6">
                <div className="p-6 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <div className="text-sm mb-1" style={{ color: '#9ca3af' }}>Severity</div>
                  <div className="text-3xl font-bold" style={{ color: '#ef4444' }}>{slide.severity}</div>
                </div>
                <div className="p-6 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                  <div className="text-sm mb-1" style={{ color: '#9ca3af' }}>CVSS Score</div>
                  <div className="text-3xl font-bold" style={{ color: '#ef4444' }}>{slide.cvss}</div>
                </div>
              </div>
            </>
          )}
          {slide.type === 'impact' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#ef4444' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#9ca3af' }}>{slide.desc}</p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-semibold mb-3" style={{ color: '#ef4444' }}>Affected Versions</div>
                  <div className="space-y-2">
                    {slide.versions.map((v, i) => (
                      <div key={i} className="p-3 rounded" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <span className="text-sm" style={{ color: '#fca5a5' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-3" style={{ color: '#22c55e' }}>Safe Version</div>
                  <div className="p-6 rounded-lg text-center" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <div className="text-3xl font-bold" style={{ color: '#22c55e' }}>{slide.safe}</div>
                  </div>
                </div>
              </div>
            </>
          )}
          {slide.type === 'fix' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#ef4444' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#9ca3af' }}>{slide.desc}</p>
              <div className="space-y-3">
                {slide.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'rgba(239,68,68,0.05)', borderLeft: '3px solid #ef4444' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#ef4444', color: '#fff' }}>{i + 1}</div>
                    <span style={{ color: '#e5e7eb' }}>{step}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'timeline' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#ef4444' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#9ca3af' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.events.map((event, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-28 text-sm font-mono" style={{ color: '#ef4444' }}>{event.date}</div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                    <div className="flex-1 h-px" style={{ background: 'rgba(239,68,68,0.3)' }} />
                    <span className="text-base" style={{ color: '#e5e7eb' }}>{event.event}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[64px] font-bold leading-[1.05] mb-6" style={{ color: '#ef4444' }}>{slide.title}</h1>
              <p className="text-xl mb-4" style={{ color: '#9ca3af' }}>{slide.subtitle}</p>
              <p className="text-lg mb-8" style={{ color: '#6b7280' }}>{slide.desc}</p>
              <div className="px-8 py-4 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <p className="text-lg font-semibold" style={{ color: '#ef4444' }}>{slide.action}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ color: '#4b5563' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#ef4444' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
