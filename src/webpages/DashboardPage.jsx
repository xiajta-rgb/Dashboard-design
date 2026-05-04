import { useState } from 'react'

export default function DashboardPage() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const stats = [
    { label: '总用户', value: '12,345', change: '+12%', color: '#0071e3' },
    { label: '活跃用户', value: '8,234', change: '+8%', color: '#34c759' },
    { label: '收入', value: '¥123K', change: '+23%', color: '#ff9500' },
    { label: '转化率', value: '3.2%', change: '+0.5%', color: '#af52de' },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#1d1d1f' }}>仪表盘</h1>
            <p style={{ color: '#86868b' }}>欢迎回来，这是你的数据概览</p>
          </div>
          <button className="px-6 py-3 rounded-xl text-white font-bold" style={{ background: '#0071e3' }}>
            下载报告
          </button>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className="p-6 rounded-2xl transition-all duration-300"
              style={{
                background: '#ffffff',
                border: `2px solid ${hoveredCard === i ? stat.color : '#e5e5e7'}`,
                transform: hoveredCard === i ? 'translateY(-4px)' : 'none',
              }}
            >
              <div className="text-sm mb-2" style={{ color: '#86868b' }}>{stat.label}</div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#1d1d1f' }}>{stat.value}</div>
              <div className="text-sm font-medium" style={{ color: stat.color }}>{stat.change}</div>
            </div>
          ))}
        </div>
        <div className="bg-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1d1d1f' }}>最近活动</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full" style={{ background: '#f5f5f7' }} />
                  <div>
                    <div className="font-medium" style={{ color: '#1d1d1f' }}>用户 {i} 完成了操作</div>
                    <div className="text-sm" style={{ color: '#86868b' }}>2 小时前</div>
                  </div>
                </div>
                <span className="text-sm px-3 py-1 rounded-full" style={{ background: '#34c75915', color: '#34c759' }}>成功</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
