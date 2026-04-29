import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard, BarChart3, Users as UsersIcon, Package, ShoppingCart, MessageSquare, Settings,
  Search, Bell, TrendingUp, TrendingDown, Filter,
} from 'lucide-react'
import { sidebarItems } from '../data/mockData'

const sidebarIcons = {
  dashboard: LayoutDashboard, analytics: BarChart3, customers: UsersIcon,
  products: Package, orders: ShoppingCart, messages: MessageSquare, settings: Settings,
}

export default function TechMinimalDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex bg-[#fafafa]">
      <aside className="w-52 flex-shrink-0 py-6 px-3 flex flex-col bg-white" style={{ borderRight: '1px solid #e5e5e5' }}>
        <div className="px-3 mb-8">
          <h1 className="text-sm font-semibold text-[#171717] tracking-tight">TECH</h1>
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium cursor-pointer ${isActive ? 'text-[#171717] bg-[#f5f5f5]' : 'text-[#a3a3a3] hover:text-[#737373]'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-3 bg-white" style={{ borderBottom: '1px solid #e5e5e5' }}>
          <h2 className="text-sm font-semibold text-[#171717]">Overview</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a3a3a3]" />
              <input type="text" placeholder="Search" className="pl-8 pr-3 py-1.5 text-xs bg-[#fafafa] border border-[#e5e5e5] text-[#525252] placeholder-[#a3a3a3] focus:outline-none focus:border-[#d4d4d4] w-44" />
            </div>
            <button className="p-1.5 text-[#a3a3a3] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Revenue', value: '$48,295', change: '+12.5%', up: true },
              { label: 'Users', value: '24,589', change: '+8.2%', up: true },
              { label: 'Orders', value: '1,847', change: '-2.4%', up: false },
              { label: 'Growth', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4 bg-white" style={{ border: '1px solid #e5e5e5' }}>
                <p className="text-[10px] text-[#a3a3a3] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-lg font-semibold text-[#171717] mb-1.5">{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium ${kpi.up ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5 bg-white" style={{ border: '1px solid #e5e5e5' }}>
              <h3 className="text-[10px] text-[#a3a3a3] mb-4 uppercase tracking-wider">Monthly Revenue</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-[#171717]" style={{ height: `${h}%` }} />
                    <span className="text-[7px] text-[#d4d4d4]">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #e5e5e5' }}>
              <h3 className="text-[10px] text-[#a3a3a3] mb-4 uppercase tracking-wider">Distribution</h3>
              <div className="space-y-3">
                {[
                  { name: 'Product A', pct: 75 },
                  { name: 'Product B', pct: 58 },
                  { name: 'Product C', pct: 42 },
                  { name: 'Product D', pct: 30 },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] text-[#a3a3a3] mb-0.5">
                      <span>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-px bg-[#e5e5e5]">
                      <div className="h-px bg-[#171717]" style={{ width: `${p.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 bg-white" style={{ border: '1px solid #e5e5e5' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#a3a3a3] uppercase tracking-wider">Recent Orders</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#a3a3a3] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  {['Order', 'Customer', 'Amount', 'Status'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-[9px] text-[#a3a3a3] uppercase tracking-wider font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#3210', name: 'Alice Chen', amount: '$245', status: 'Done' },
                  { id: '#3209', name: 'Bob Wang', amount: '$189', status: 'Pending' },
                  { id: '#3208', name: 'Carol Li', amount: '$432', status: 'Done' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td className="py-2.5 px-3 text-xs text-[#737373]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#525252]">{row.name}</td>
                    <td className="py-2.5 px-3 text-xs font-medium text-[#171717]">{row.amount}</td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[9px] font-medium ${row.status === 'Done' ? 'text-[#22c55e]' : 'text-[#a3a3a3]'}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}