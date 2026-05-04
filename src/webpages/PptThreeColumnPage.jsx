import { useState } from 'react'

export default function PptThreeColumnPage() {
  const [hoveredCol, setHoveredCol] = useState(null)

  const columns = [
    {
      title: '设计',
      icon: '▣',
      items: ['24+ 主题', 'CSS 变量驱动', '响应式布局', '动画系统'],
      color: '#0071e3',
    },
    {
      title: '开发',
      icon: '⌘',
      items: ['零构建工具', '纯 HTML/CSS/JS', '模板驱动', 'Agent 集成'],
      color: '#34c759',
    },
    {
      title: '部署',
      icon: '▲',
      items: ['静态文件部署', 'CDN 加速', 'PNG/PDF 导出', '一键发布'],
      color: '#ff9500',
    },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Three Column · 三列布局</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>核心功能模块</h2>
          <div className="grid grid-cols-3 gap-8">
            {columns.map((col, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCol(i)}
                onMouseLeave={() => setHoveredCol(null)}
                className="p-8 rounded-2xl transition-all duration-300"
                style={{
                  background: hoveredCol === i ? '#fafafa' : '#ffffff',
                  border: `2px solid ${hoveredCol === i ? col.color : '#e5e5e7'}`,
                  transform: hoveredCol === i ? 'translateY(-8px)' : 'none',
                  boxShadow: hoveredCol === i ? `0 16px 32px ${col.color}20` : 'none',
                }}
              >
                <div className="text-5xl mb-4">{col.icon}</div>
                <h3 className="text-2xl font-bold mb-6" style={{ color: col.color }}>{col.title}</h3>
                <div className="space-y-3">
                  {col.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                      <span className="text-base" style={{ color: '#666666' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Three Column Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
