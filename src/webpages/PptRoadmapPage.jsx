import { useState } from 'react'

export default function PptRoadmapPage() {
  const [hoveredPhase, setHoveredPhase] = useState(null)

  const phases = [
    { phase: 'Phase 1', title: '基础架构', items: ['技术选型', '架构设计', '原型开发'], status: 'completed', color: '#34c759' },
    { phase: 'Phase 2', title: '核心功能', items: ['用户系统', '数据模型', 'API 开发'], status: 'active', color: '#0071e3' },
    { phase: 'Phase 3', title: '功能完善', items: ['性能优化', '安全加固', '文档编写'], status: 'pending', color: '#86868b' },
    { phase: 'Phase 4', title: '发布上线', items: ['测试验收', '部署上线', '运营推广'], status: 'pending', color: '#86868b' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Roadmap · 路线图</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>产品发展路线图</h2>
          <div className="grid grid-cols-4 gap-6">
            {phases.map((phase, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredPhase(i)}
                onMouseLeave={() => setHoveredPhase(null)}
                className="relative p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: hoveredPhase === i ? '#fafafa' : '#ffffff',
                  border: `2px solid ${phase.status === 'completed' ? '#34c759' : phase.status === 'active' ? '#0071e3' : '#e5e5e7'}`,
                  transform: hoveredPhase === i ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredPhase === i ? '0 12px 24px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <div className="text-xs font-semibold tracking-wider mb-2" style={{ color: phase.color }}>{phase.phase}</div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1d1d1f' }}>{phase.title}</h3>
                <div className="space-y-2">
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: phase.color }} />
                      <span className="text-sm" style={{ color: '#666666' }}>{item}</span>
                    </div>
                  ))}
                </div>
                {phase.status === 'completed' && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#34c759' }}>
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Roadmap Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
