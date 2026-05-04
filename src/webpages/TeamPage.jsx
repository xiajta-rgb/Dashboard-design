import { useState } from 'react'
import { User } from 'lucide-react'

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState(null)

  const team = [
    { name: '张三', role: 'CEO & 创始人', color: '#0071e3' },
    { name: '李四', role: 'CTO', color: '#34c759' },
    { name: '王五', role: '设计总监', color: '#ff9500' },
    { name: '赵六', role: '产品总监', color: '#af52de' },
    { name: '孙七', role: '技术负责人', color: '#ff3b30' },
    { name: '周八', role: '市场总监', color: '#5ac8fa' },
  ]

  return (
    <div className="w-full h-full overflow-auto" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1d1d1f' }}>我们的团队</h1>
          <p className="text-xl" style={{ color: '#86868b' }}>一群热爱技术的人</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
              className="p-8 rounded-2xl text-center transition-all duration-300"
              style={{
                background: '#ffffff',
                border: `2px solid ${hoveredMember === i ? member.color : '#e5e5e7'}`,
                transform: hoveredMember === i ? 'translateY(-8px)' : 'none',
                boxShadow: hoveredMember === i ? `0 16px 32px ${member.color}20` : 'none',
              }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `${member.color}15` }}>
                <User size={32} style={{ color: member.color }} />
              </div>
              <h3 className="text-xl font-bold mb-1" style={{ color: member.color }}>{member.name}</h3>
              <p className="text-sm" style={{ color: '#86868b' }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
