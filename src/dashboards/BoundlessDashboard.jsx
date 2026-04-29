import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard, BarChart3, Users as UsersIcon, Package, ShoppingCart, MessageSquare, Settings,
  Search, Bell, TrendingUp, TrendingDown,
} from 'lucide-react'
import { sidebarItems } from '../data/mockData'

const sidebarIcons = {
  dashboard: LayoutDashboard, analytics: BarChart3, customers: UsersIcon,
  products: Package, orders: ShoppingCart, messages: MessageSquare, settings: Settings,
}

export default function BoundlessDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#ffffff' }}>
      <aside className="w-48 flex-shrink-0 py-12 px-4 flex flex-col">
        <div className="px-2 mb-12">
          <h1 className="text-xs font-medium tracking-[0.3em]" style={{ color: '#000' }}>BOUNDLESS</h1>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer ${isActive ? 'font-medium text-[#000]' : 'font-light text-[#bbb] hover:text-[#888]'}`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-12 py-8">
          <h2 className="text-4xl font-light" style={{ color: '#000', letterSpacing: '-0.02em' }}>Overview</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ccc]" />
              <input type="text" placeholder="Search" className="pl-7 pr-4 py-2 text-sm font-light focus:outline-none w-40" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #eee', color: '#000' }} />
            </div>
            <button className="p-1 text-[#ccc] cursor-pointer"><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="px-12 pb-12">
          <div className="grid grid-cols-4 gap-16 mb-16">
            {[
              { label: 'Revenue', value: '$48,295', change: '+12.5%', up: true },
              { label: 'Users', value: '24,589', change: '+8.2%', up: true },
              { label: 'Orders', value: '1,847', change: '-2.4%', up: false },
              { label: 'Growth', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i}>
                <p className="text-[10px] font-medium mb-3" style={{ color: '#ccc', letterSpacing: '0.15em' }}>{kpi.label}</p>
                <p className="text-3xl font-light mb-2" style={{ color: '#000', letterSpacing: '-0.02em' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-light ${kpi.up ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h3 className="text-xs font-medium mb-8" style={{ color: '#ccc', letterSpacing: '0.2em' }}>Monthly Revenue</h3>
            <div className="h-52 flex items-end justify-between" style={{ gap: '2px' }}>
              {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full" style={{
                    height: `${h}%`,
                    background: '#000',
                    borderRadius: '1px',
                  }} />
                  <span className="text-[8px] font-light" style={{ color: '#ddd' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-xs font-medium mb-8" style={{ color: '#ccc', letterSpacing: '0.2em' }}>Distribution</h3>
            <div className="grid grid-cols-2 gap-20">
              {[
                { name: 'Product A', pct: 75 },
                { name: 'Product B', pct: 58 },
                { name: 'Product C', pct: 42 },
                { name: 'Product D', pct: 30 },
              ].map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-light mb-2" style={{ color: '#999' }}>
                    <span>{p.name}</span><span>{p.pct}%</span>
                  </div>
                  <div className="h-px" style={{ background: '#f0f0f0' }}>
                    <div className="h-px" style={{ width: `${p.pct}%`, background: '#000' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium mb-8" style={{ color: '#ccc', letterSpacing: '0.2em' }}>Recent Activity</h3>
            <div className="space-y-6">
              {[
                { name: 'Alice Chen', action: 'completed order', detail: '#3210', time: '2h ago' },
                { name: 'Bob Wang', action: 'submitted review for', detail: '#3209', time: '5h ago' },
                { name: 'Carol Li', action: 'updated project', detail: '#3208', time: '8h ago' },
              ].map((row, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-sm font-medium" style={{ color: '#000' }}>{row.name}</span>
                  <span className="text-sm font-light" style={{ color: '#bbb' }}>{row.action}</span>
                  <span className="text-sm font-medium" style={{ color: '#000' }}>{row.detail}</span>
                  <span className="text-xs font-light ml-auto" style={{ color: '#ddd' }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}