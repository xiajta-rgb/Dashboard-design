import { useState } from 'react'

export default function PptTablePage() {
  const [hoveredRow, setHoveredRow] = useState(null)

  const data = [
    { name: '张三', role: '前端开发', status: '进行中', progress: 75 },
    { name: '李四', role: '后端开发', status: '已完成', progress: 100 },
    { name: '王五', role: 'UI 设计', status: '进行中', progress: 60 },
    { name: '赵六', role: '产品经理', status: '待开始', progress: 20 },
    { name: '孙七', role: '测试工程师', status: '进行中', progress: 45 },
  ]

  const statusColors = {
    '进行中': '#0071e3',
    '已完成': '#34c759',
    '待开始': '#86868b',
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Table · 表格页</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-8" style={{ color: '#1d1d1f' }}>团队成员状态表</h2>
          <div className="rounded-lg overflow-hidden border border-slate-200">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#fafafa' }}>
                  <th className="text-left py-4 px-6 text-sm font-semibold" style={{ color: '#86868b' }}>姓名</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold" style={{ color: '#86868b' }}>角色</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold" style={{ color: '#86868b' }}>状态</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold" style={{ color: '#86868b' }}>进度</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: hoveredRow === i ? '#f5f5f7' : '#ffffff',
                      borderTop: '1px solid #e5e5e7',
                    }}
                  >
                    <td className="py-4 px-6 text-sm font-medium" style={{ color: '#1d1d1f' }}>{row.name}</td>
                    <td className="py-4 px-6 text-sm" style={{ color: '#666666' }}>{row.role}</td>
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${statusColors[row.status]}15`, color: statusColors[row.status] }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full" style={{ background: '#e5e5e7' }}>
                          <div className="h-full rounded-full" style={{ width: `${row.progress}%`, background: statusColors[row.status] }} />
                        </div>
                        <span className="text-sm font-semibold" style={{ color: '#1d1d1f' }}>{row.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Table Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
