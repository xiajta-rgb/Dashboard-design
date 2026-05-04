import { useState } from 'react'

export default function PptChartPage() {
  const [hoveredBar, setHoveredBar] = useState(null)

  const data = [
    { label: '一月', value: 65, color: '#0071e3' },
    { label: '二月', value: 78, color: '#34c759' },
    { label: '三月', value: 90, color: '#ff9500' },
    { label: '四月', value: 81, color: '#af52de' },
    { label: '五月', value: 96, color: '#ff3b30' },
    { label: '六月', value: 110, color: '#5ac8fa' },
  ]

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Chart · 图表页</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ color: '#1d1d1f' }}>月度业绩增长趋势</h2>
          <div className="flex items-end gap-8 h-64">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center gap-3 cursor-pointer"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="text-sm font-bold" style={{ color: hoveredBar === i ? '#1d1d1f' : '#86868b' }}>
                  {item.value}K
                </div>
                <div
                  className="w-full rounded-t-lg transition-all duration-300"
                  style={{
                    height: `${(item.value / maxValue) * 200}px`,
                    background: item.color,
                    opacity: hoveredBar === i ? 1 : 0.8,
                    transform: hoveredBar === i ? 'scaleY(1.05)' : 'none',
                    transformOrigin: 'bottom',
                  }}
                />
                <div className="text-sm font-medium" style={{ color: '#666666' }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between p-4 rounded-lg" style={{ background: '#fafafa' }}>
            <div className="text-sm" style={{ color: '#86868b' }}>总增长</div>
            <div className="text-2xl font-bold" style={{ color: '#34c759' }}>↑ 69.2%</div>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Chart Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
