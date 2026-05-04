import { useState } from 'react'
import { LayoutDashboard, Users, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'content', label: '内容管理', icon: FileText },
    { id: 'settings', label: '系统设置', icon: Settings },
  ]

  return (
    <div className="w-full h-full flex" style={{ background: '#f5f5f7', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
      <div
        className="flex flex-col transition-all duration-300"
        style={{
          width: sidebarOpen ? '240px' : '64px',
          background: '#1d1d1f',
        }}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <div className="text-white font-bold text-lg">Admin</div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <div className="flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                activeTab === item.id ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className="text-white" />
              {sidebarOpen && <span className="text-white text-sm">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1d1d1f' }}>
          {menuItems.find(i => i.id === activeTab)?.label}
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl">
              <div className="text-sm mb-2" style={{ color: '#86868b' }}>指标 {i}</div>
              <div className="text-3xl font-bold" style={{ color: '#1d1d1f' }}>{i * 1000}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
