import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: 'Pitch Deck', subtitle: 'VC Presentation', desc: 'Professional investor pitch deck template' },
  { type: 'problem', title: '问题', subtitle: 'The Problem', desc: 'Clear problem statement that investors need to understand', points: ['市场痛点明确', '用户需求强烈', '现有方案不足'] },
  { type: 'solution', title: '解决方案', subtitle: 'Our Solution', desc: 'How we solve the problem better than anyone else', features: ['创新技术架构', '用户体验优先', '可扩展性强'] },
  { type: 'market', title: '市场规模', subtitle: 'Market Size', desc: 'TAM: $50B · SAM: $12B · SOM: $2B', metrics: [{ label: 'TAM', value: '$50B', desc: '总可用市场' }, { label: 'SAM', value: '$12B', desc: '可服务市场' }, { label: 'SOM', value: '$2B', desc: '可获得市场' }] },
  { type: 'team', title: '团队', subtitle: 'The Team', desc: 'Experienced founders with proven track record', members: [{ role: 'CEO', name: '创始人 A', bg: 'exp' }, { role: 'CTO', name: '创始人 B', bg: 'tech' }, { role: 'CPO', name: '创始人 C', bg: 'product' }] },
  { type: 'ask', title: '融资需求', subtitle: 'The Ask', desc: 'Raising $5M Series A to scale operations', details: ['融资金额: $5M', '资金用途: 产品开发 + 市场拓展', '预期里程碑: 12 个月内达到 PMF'] },
]

export default function PptPitchDeckPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#0a2540' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: 'linear-gradient(180deg, #0a2540, #0d1b2a)', borderRadius: '8px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#635bff' }}>Confidential</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#635bff' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8892b0' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 w-20 h-1" style={{ background: '#635bff' }} />
            </>
          )}
          {slide.type === 'problem' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8892b0' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'rgba(99,91,255,0.08)', border: '1px solid rgba(99,91,255,0.2)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ background: '#635bff', color: '#fff' }}>{i + 1}</div>
                    <span className="text-lg" style={{ color: '#ccd6f6' }}>{point}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'solution' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8892b0' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.features.map((feature, i) => (
                  <div key={i} className="p-6 rounded-lg text-center" style={{ background: 'rgba(99,91,255,0.08)', border: '1px solid rgba(99,91,255,0.2)' }}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold" style={{ background: '#635bff', color: '#fff' }}>{i + 1}</div>
                    <span className="text-base" style={{ color: '#ccd6f6' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'market' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8892b0' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.metrics.map((m, i) => (
                  <div key={i} className="p-6 rounded-lg text-center" style={{ background: 'rgba(99,91,255,0.08)', border: '1px solid rgba(99,91,255,0.2)' }}>
                    <div className="text-[48px] font-bold mb-2" style={{ color: '#635bff' }}>{m.value}</div>
                    <div className="text-lg font-semibold mb-1" style={{ color: '#ffffff' }}>{m.label}</div>
                    <div className="text-sm" style={{ color: '#8892b0' }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'team' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8892b0' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.members.map((m, i) => (
                  <div key={i} className="p-6 rounded-lg text-center" style={{ background: 'rgba(99,91,255,0.08)', border: '1px solid rgba(99,91,255,0.2)' }}>
                    <div className="w-16 h-16 rounded-full mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #635bff, #8b5cf6)' }} />
                    <div className="text-lg font-semibold mb-1" style={{ color: '#ffffff' }}>{m.name}</div>
                    <div className="text-sm px-3 py-1 rounded-full inline-block" style={{ background: 'rgba(99,91,255,0.2)', color: '#635bff' }}>{m.role}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'ask' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#8892b0' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'rgba(99,91,255,0.08)', borderLeft: '3px solid #635bff' }}>
                    <span className="text-lg" style={{ color: '#ccd6f6' }}>{detail}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ color: '#484f58' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#635bff' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
