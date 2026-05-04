import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: '周报', subtitle: 'Weekly Report', desc: 'Team progress and key metrics' },
  { type: 'overview', title: '本周概览', subtitle: 'Week Overview', desc: 'Key highlights from this week', metrics: [{ label: '完成任务', value: '24', change: '+12%' }, { label: '代码提交', value: '156', change: '+8%' }, { label: 'Bug 修复', value: '18', change: '+25%' }] },
  { type: 'progress', title: '项目进度', subtitle: 'Project Progress', desc: 'Current status of ongoing projects', projects: [{ name: '用户系统重构', progress: 85, status: 'on-track' }, { name: 'API 性能优化', progress: 60, status: 'on-track' }, { name: '移动端适配', progress: 35, status: 'at-risk' }] },
  { type: 'issues', title: '问题与风险', subtitle: 'Issues & Risks', desc: 'Items requiring attention', items: [{ level: 'high', title: '移动端适配进度滞后', action: '增加 1 名前端资源' }, { level: 'medium', title: '第三方 API 响应不稳定', action: '添加缓存层' }] },
  { type: 'next', title: '下周计划', subtitle: 'Next Week', desc: 'Planned tasks and priorities', tasks: ['完成用户系统重构上线', 'API 性能优化进入测试阶段', '移动端适配方案评审', '季度技术分享准备'] },
  { type: 'summary', title: '总结', subtitle: 'Summary', desc: 'Overall team health and momentum', health: '良好' },
]

export default function PptWeeklyReportPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f8fafc' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '12px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#3b82f6' }}>Team Update</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#0f172a' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#3b82f6' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#64748b' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'overview' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#3b82f6' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#0f172a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#64748b' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.metrics.map((m, i) => (
                  <div key={i} className="p-6 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div className="text-sm mb-2" style={{ color: '#64748b' }}>{m.label}</div>
                    <div className="text-4xl font-bold mb-2" style={{ color: '#0f172a' }}>{m.value}</div>
                    <div className="text-sm font-medium" style={{ color: '#22c55e' }}>{m.change}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'progress' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#3b82f6' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#0f172a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#64748b' }}>{slide.desc}</p>
              <div className="space-y-5">
                {slide.projects.map((p, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-medium" style={{ color: '#0f172a' }}>{p.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{p.progress}%</span>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: p.status === 'on-track' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: p.status === 'on-track' ? '#22c55e' : '#ef4444' }}>{p.status === 'on-track' ? '正常' : '风险'}</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: '#e2e8f0' }}>
                      <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.status === 'on-track' ? '#3b82f6' : '#ef4444' }} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'issues' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#3b82f6' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#0f172a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#64748b' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.items.map((item, i) => (
                  <div key={i} className="p-5 rounded-lg" style={{ background: item.level === 'high' ? 'rgba(239,68,68,0.03)' : 'rgba(245,158,11,0.03)', border: `1px solid ${item.level === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)'}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: item.level === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)', color: item.level === 'high' ? '#ef4444' : '#f59e0b' }}>{item.level === 'high' ? '高' : '中'}</span>
                      <span className="text-base font-medium" style={{ color: '#0f172a' }}>{item.title}</span>
                    </div>
                    <div className="text-sm" style={{ color: '#64748b' }}>行动: {item.action}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'next' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#3b82f6' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#0f172a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#64748b' }}>{slide.desc}</p>
              <div className="space-y-3">
                {slide.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#3b82f6', color: '#fff' }}>{i + 1}</div>
                    <span className="text-base" style={{ color: '#0f172a' }}>{task}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[64px] font-bold leading-[1.05] mb-6" style={{ color: '#0f172a' }}>{slide.title}</h1>
              <p className="text-xl mb-4" style={{ color: '#3b82f6' }}>{slide.subtitle}</p>
              <p className="text-lg mb-8" style={{ color: '#64748b' }}>{slide.desc}</p>
              <div className="px-8 py-4 rounded-lg" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <p className="text-lg font-semibold" style={{ color: '#22c55e' }}>团队健康度: {slide.health}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100 relative z-10">
          <span className="text-xs" style={{ color: '#94a3b8' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#3b82f6' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
