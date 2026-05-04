import { useState } from 'react'

export default function PptKpiGridPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const kpis = [
    { label: 'Revenue', value: '1248K', change: '↑ 38% YoY', good: true },
    { label: 'Active Users', value: '82K', change: '↑ 12% QoQ', good: true },
    { label: 'Retention', value: '74%', change: '↑ 3 pts', good: true },
    { label: 'NPS', value: '61', change: '→ 持平', good: false },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Metrics · 关键数字</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>这一季度，我们做到了什么</h2>
          <div className="grid grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: hoveredIndex === i ? '#f5f5f7' : '#fafafa',
                  border: '1px solid #e5e5e7',
                  transform: hoveredIndex === i ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredIndex === i ? '0 12px 24px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <div className="text-sm mb-2" style={{ color: '#86868b' }}>{kpi.label}</div>
                <div className="text-[56px] font-bold leading-none mb-3" style={{ color: '#1d1d1f' }}>{kpi.value}</div>
                <div className="text-sm font-medium" style={{ color: kpi.good ? '#34c759' : '#ff9500' }}>{kpi.change}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>KPI Grid Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
