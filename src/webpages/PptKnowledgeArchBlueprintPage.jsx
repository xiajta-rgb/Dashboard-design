import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: 'Knowledge Architecture', subtitle: 'Blueprint', desc: 'Technical Architecture Blueprint' },
  { type: 'overview', title: '架构概览', subtitle: 'System Overview', desc: 'Blueprint engineering style with dark blue background, grid pattern, and dashed borders', components: ['API Gateway', 'Auth Service', 'Data Layer', 'Cache Layer', 'Message Queue', 'Monitoring'] },
  { type: 'detail', title: '核心模块', subtitle: 'Core Module', desc: 'Detailed breakdown of system components', modules: [{ name: '数据处理', status: 'stable', version: 'v2.4' }, { name: '用户认证', status: 'stable', version: 'v3.1' }, { name: '消息服务', status: 'beta', version: 'v1.8' }] },
  { type: 'flow', title: '数据流', subtitle: 'Data Flow', desc: 'Request → Process → Response pipeline', steps: ['Client Request', 'API Gateway', 'Auth Check', 'Data Processing', 'Cache Update', 'Response'] },
  { type: 'summary', title: '总结', subtitle: 'Summary', desc: 'Engineering blueprint for technical architecture documentation' },
]

export default function PptKnowledgeArchBlueprintPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#0b3a6f' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#0b3a6f', borderRadius: '2px', overflow: 'hidden', fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace" }}>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#aee1ff' }}>Architecture</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#aee1ff' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#7a9ab8' }}>{slide.desc}</p>
              <div className="absolute bottom-12 left-16 flex gap-2">
                <div className="w-16 h-0.5" style={{ background: '#ffffff' }} />
                <div className="w-8 h-0.5" style={{ background: '#7a9ab8' }} />
              </div>
            </>
          )}
          {slide.type === 'overview' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#aee1ff' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-base mb-6" style={{ color: '#7a9ab8' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-4">
                {slide.components.map((comp, i) => (
                  <div key={i} className="p-4 rounded" style={{ background: '#0a3260', border: '1px dashed rgba(174,225,255,0.3)' }}>
                    <div className="text-sm font-medium" style={{ color: '#ffffff' }}>{comp}</div>
                    <div className="text-[10px] mt-1" style={{ color: '#7a9ab8' }}>Component {i + 1}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'detail' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#aee1ff' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-base mb-6" style={{ color: '#7a9ab8' }}>{slide.desc}</p>
              <div className="space-y-3">
                {slide.modules.map((mod, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded" style={{ background: '#0a3260', border: '1px solid rgba(174,225,255,0.2)' }}>
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#ffffff' }}>{mod.name}</div>
                      <div className="text-[10px] mt-1" style={{ color: '#7a9ab8' }}>{mod.version}</div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded" style={{ background: mod.status === 'stable' ? 'rgba(126,211,164,0.2)' : 'rgba(232,168,124,0.2)', color: mod.status === 'stable' ? '#7ed3a4' : '#e8a87c', border: `1px solid ${mod.status === 'stable' ? 'rgba(126,211,164,0.3)' : 'rgba(232,168,124,0.3)'}` }}>{mod.status}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'flow' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#aee1ff' }}>{slide.subtitle}</div>
              <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-base mb-6" style={{ color: '#7a9ab8' }}>{slide.desc}</p>
              <div className="flex items-center gap-3">
                {slide.steps.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div className="px-4 py-3 rounded text-xs font-medium" style={{ background: '#0a3260', border: '1px dashed rgba(174,225,255,0.3)', color: '#ffffff' }}>{step}</div>
                    {i < slide.steps.length - 1 && <div className="w-6 h-0.5 mx-1" style={{ background: '#aee1ff' }} />}
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[64px] font-bold leading-[1.05] mb-6" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-xl mb-4" style={{ color: '#aee1ff' }}>{slide.subtitle}</p>
              <p className="text-base max-w-lg" style={{ color: '#7a9ab8' }}>{slide.desc}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.1] relative z-10">
          <span className="text-xs" style={{ color: '#7a9ab8' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#aee1ff' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
