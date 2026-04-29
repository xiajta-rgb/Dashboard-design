// Dashboard Component Template
// Use this as a starting point for creating new dashboards
// This template will be processed by the generate-dashboard.py script

import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import { LayoutDashboard, BarChart3, Users, Package, ShoppingCart, MessageSquare, Settings, Search, Bell, TrendingUp } from 'lucide-react'
import { sidebarItems } from '../data/mockData'

const sidebarIcons = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  customers: Users,
  products: Package,
  orders: ShoppingCart,
  messages: MessageSquare,
  settings: Settings,
}

// Example mock data - customize for your style
const statsData = [
  { label: 'Total Revenue', value: '$128,430', change: '+12.5%', trend: 'up' },
  { label: 'Active Users', value: '2,847', change: '+5.2%', trend: 'up' },
  { label: 'Conversion Rate', value: '3.42%', change: '-0.8%', trend: 'down' },
  { label: 'Avg. Order Value', value: '$84.20', change: '+2.1%', trend: 'up' },
]

const chartData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  value: 40 + Math.sin(i * 0.8) * 25 + Math.random() * 15,
}))

export default function StyleNameDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef(null)

  // Canvas effect - customize visuals for your style
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const time = animating ? Date.now() / 1000 : 0

    // Example: Draw a simple gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Example: Draw animated circles
    for (let i = 0; i < 8; i++) {
      const x = 50 + (i % 4) * 110 + Math.sin(time + i * 0.5) * 10
      const y = 40 + Math.floor(i / 4) * 120 + Math.cos(time + i * 0.3) * 8
      const radius = 25 + i * 4
      const alpha = 0.3 + Math.sin(time + i) * 0.2

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      ctx.fill()
    }
  }, [animating])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#060810' }}>
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0a0e18', borderRight: '1px solid #141c2c' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#88aaff' }}>
            StyleName
          </h1>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${
                  isActive ? 'text-[#88aaff]' : 'text-[#1a2440] hover:text-[#88aaff80]'
                }`}
                style={isActive ? { background: '#88aaff08', borderLeft: '2px solid #88aaff' } : { borderLeft: '2px solid transparent' }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0a0e18', borderBottom: '1px solid #141c2c' }}>
          <h2 className="text-sm font-bold" style={{ color: '#88aaff' }}>
            StyleName Dashboard
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded" style={{ background: '#060810', border: '1px solid #141c2c' }}>
              <button onClick={() => setAnimating(!animating)} className="p-0.5 cursor-pointer">
                {animating ? (
                  <Bell className="w-3.5 h-3.5" style={{ color: '#88aaff' }} />
                ) : (
                  <Search className="w-3.5 h-3.5" style={{ color: '#88aaff' }} />
                )}
              </button>
              <span className="text-xs font-mono" style={{ color: '#88aaff' }}>
                {animating ? 'Animating' : 'Static'}
              </span>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, i) => (
              <div key={i} className="p-4 rounded" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
                <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#1a2440' }}>
                  {stat.label}
                </p>
                <p className="text-lg font-bold mb-1" style={{ color: '#d0e0ff' }}>
                  {stat.value}
                </p>
                <span
                  className="inline-flex items-center gap-0.5 text-[10px]"
                  style={{ color: stat.trend === 'up' ? '#22c55e' : '#ef4444' }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Visualization Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-1 p-5 rounded" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>
                Visualization
              </h3>
              <canvas
                ref={canvasRef}
                width={400}
                height={200}
                className="w-full rounded"
                style={{ background: '#060810', border: '1px solid #141c2c' }}
              />
            </div>
            <div className="p-5 rounded" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>
                Chart Data
              </h3>
              <div className="space-y-2">
                {chartData.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[10px]" style={{ color: '#88aaff' }}>
                      {item.month}
                    </span>
                    <div className="flex-1 mx-3 h-2 rounded" style={{ background: '#141c2c' }}>
                      <div
                        className="h-full rounded"
                        style={{ width: `${item.value}%`, background: '#88aaff' }}
                      />
                    </div>
                    <span className="text-[10px]" style={{ color: '#a3a3a3' }}>
                      {Math.round(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 rounded" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
            <h3 className="text-[10px] uppercase tracking-wider mb-4" style={{ color: '#1a2440' }}>
              Additional Content
            </h3>
            <p className="text-sm" style={{ color: '#a3a3a3' }}>
              This is a template dashboard for StyleName. Customize this section with your own content,
              charts, tables, or any other components that fit your style.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
