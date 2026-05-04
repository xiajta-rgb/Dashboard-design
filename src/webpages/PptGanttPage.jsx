import { useState } from 'react'

export default function PptGanttPage() {
  const [hoveredTask, setHoveredTask] = useState(null)

  const tasks = [
    { name: '需求分析', start: 0, duration: 2, color: '#0071e3' },
    { name: 'UI 设计', start: 1, duration: 3, color: '#34c759' },
    { name: '前端开发', start: 3, duration: 4, color: '#ff9500' },
    { name: '后端开发', start: 3, duration: 5, color: '#af52de' },
    { name: '测试验收', start: 7, duration: 2, color: '#ff3b30' },
    { name: '上线部署', start: 9, duration: 1, color: '#5ac8fa' },
  ]

  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10']

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Gantt · 甘特图</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ color: '#1d1d1f' }}>项目进度甘特图</h2>
          <div className="flex gap-4">
            <div className="w-32">
              <div className="h-8 flex items-center text-sm font-semibold" style={{ color: '#86868b' }}>任务</div>
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="h-10 flex items-center text-sm font-medium"
                  style={{ color: hoveredTask === i ? '#1d1d1f' : '#666666' }}
                  onMouseEnter={() => setHoveredTask(i)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  {task.name}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-10 gap-0 mb-2">
                {weeks.map((week, i) => (
                  <div key={i} className="h-8 flex items-center justify-center text-xs font-semibold" style={{ color: '#86868b' }}>{week}</div>
                ))}
              </div>
              {tasks.map((task, i) => (
                <div
                  key={i}
                  className="grid grid-cols-10 gap-0 h-10 mb-1 relative"
                  onMouseEnter={() => setHoveredTask(i)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  {Array.from({ length: 10 }).map((_, j) => (
                    <div key={j} className="border-r border-slate-50" />
                  ))}
                  <div
                    className="absolute top-2 h-6 rounded-md transition-all duration-200"
                    style={{
                      left: `${task.start * 10}%`,
                      width: `${task.duration * 10}%`,
                      background: task.color,
                      opacity: hoveredTask === i ? 1 : 0.8,
                      transform: hoveredTask === i ? 'scaleY(1.2)' : 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Gantt Chart Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
