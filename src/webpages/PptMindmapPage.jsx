import { useState } from 'react'

export default function PptMindmapPage() {
  const [expandedNode, setExpandedNode] = useState(null)

  const mindmap = {
    center: 'html-ppt',
    branches: [
      {
        title: '主题系统',
        color: '#0071e3',
        children: ['24+ 主题', 'CSS 变量驱动', '一键切换'],
      },
      {
        title: '布局模板',
        color: '#34c759',
        children: ['30+ 布局', '响应式设计', '键盘导航'],
      },
      {
        title: '动画效果',
        color: '#ff9500',
        children: ['25+ 动画', 'fade/slide/zoom', '可配置'],
      },
      {
        title: '导出功能',
        color: '#af52de',
        children: ['PNG 导出', 'PDF 导出', 'headless Chrome'],
      },
    ],
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Mindmap · 思维导图</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>html-ppt 功能架构</h2>
          <div className="flex items-center justify-center gap-12">
            <div className="relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: '#1d1d1f', color: '#ffffff' }}>
                {mindmap.center}
              </div>
              {mindmap.branches.map((branch, i) => {
                const angle = (i / mindmap.branches.length) * 2 * Math.PI - Math.PI / 2
                const radius = 180
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius
                return (
                  <div key={i} className="absolute" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
                    <div
                      onClick={() => setExpandedNode(expandedNode === i ? null : i)}
                      className="cursor-pointer transition-all duration-300"
                    >
                      <div
                        className="px-6 py-3 rounded-full text-base font-bold mb-2"
                        style={{
                          background: branch.color,
                          color: '#ffffff',
                          boxShadow: expandedNode === i ? `0 8px 24px ${branch.color}40` : 'none',
                          transform: expandedNode === i ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        {branch.title}
                      </div>
                      {expandedNode === i && (
                        <div className="space-y-1">
                          {branch.children.map((child, j) => (
                            <div
                              key={j}
                              className="px-4 py-2 rounded-lg text-sm"
                              style={{ background: `${branch.color}15`, color: branch.color }}
                            >
                              {child}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Mindmap Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
