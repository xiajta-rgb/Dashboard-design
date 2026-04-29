import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Users as UsersIcon,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Filter,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function DashboardDataDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0f1117' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#131620', borderRight: '1px solid #1e2230' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-semibold tracking-[0.15em]" style={{ color: '#6366f1' }}>DATABOARD</h1>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium cursor-pointer ${isActive ? 'text-[#6366f1] bg-[#6366f110]' : 'text-[#4a4f5e] hover:text-[#6366f180]'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#131620', borderBottom: '1px solid #1e2230' }}>
          <h2 className="text-sm font-semibold text-[#e2e4ea]">Analytics</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a4f5e]" />
              <input type="text" placeholder="Search metrics..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-44" style={{ background: '#0f1117', border: '1px solid #1e2230', color: '#8b8fa3', borderRadius: '4px' }} />
            </div>
            <button className="p-1.5 text-[#4a4f5e] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true, icon: Activity, accent: '#6366f1' },
              { label: 'Active Users', value: '24,589', change: '+8.2%', up: true, icon: UsersIcon, accent: '#22c55e' },
              { label: 'Error Rate', value: '0.24%', change: '-2.4%', up: true, icon: AlertTriangle, accent: '#f59e0b' },
              { label: 'Uptime', value: '99.98%', change: '+0.1%', up: true, icon: CheckCircle, accent: '#06b6d4' },
            ].map((kpi, i) => {
              const KpiIcon = kpi.icon
              return (
                <div key={i} className="p-4" style={{ background: '#131620', border: '1px solid #1e2230', borderRadius: '6px' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-[#4a4f5e] uppercase tracking-wider">{kpi.label}</p>
                    <KpiIcon className="w-3.5 h-3.5" style={{ color: kpi.accent }} />
                  </div>
                  <p className="text-xl font-bold mb-1" style={{ color: '#e2e4ea' }}>{kpi.value}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-medium ${kpi.up ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                    {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="col-span-2 p-4" style={{ background: '#131620', border: '1px solid #1e2230', borderRadius: '6px' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] text-[#4a4f5e] uppercase tracking-wider">Revenue Trend</h3>
                <div className="flex gap-3">
                  {['1D','1W','1M','1Y'].map((t,i) => (
                    <span key={i} className={`text-[9px] font-medium cursor-pointer ${i === 2 ? 'text-[#6366f1]' : 'text-[#2a2f3e]'}`}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="h-36 flex items-end justify-between gap-1">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{
                      height: `${h}%`,
                      background: `linear-gradient(180deg, #6366f1 0%, #6366f130 100%)`,
                      borderRadius: '2px 2px 0 0',
                    }} />
                    <span className="text-[7px] text-[#2a2f3e]">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4" style={{ background: '#131620', border: '1px solid #1e2230', borderRadius: '6px' }}>
              <h3 className="text-[10px] text-[#4a4f5e] uppercase tracking-wider mb-3">Traffic Sources</h3>
              <div className="space-y-3">
                {[
                  { name: 'Direct', pct: 75, color: '#6366f1' },
                  { name: 'Organic', pct: 58, color: '#22c55e' },
                  { name: 'Referral', pct: 42, color: '#f59e0b' },
                  { name: 'Social', pct: 30, color: '#06b6d4' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] text-[#4a4f5e] mb-0.5">
                      <span>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-1" style={{ background: '#1e2230', borderRadius: '1px' }}>
                      <div className="h-1" style={{ width: `${p.pct}%`, background: p.color, borderRadius: '1px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4" style={{ background: '#131620', border: '1px solid #1e2230', borderRadius: '6px' }}>
              <h3 className="text-[10px] text-[#4a4f5e] uppercase tracking-wider mb-3">Recent Events</h3>
              <div className="space-y-2">
                {[
                  { title: 'Server CPU spike detected', time: '2m ago', type: 'warning' },
                  { title: 'New user signup: alice@corp.io', time: '5m ago', type: 'info' },
                  { title: 'Payment processed: $2,450', time: '12m ago', type: 'success' },
                  { title: 'API rate limit reached', time: '18m ago', type: 'error' },
                ].map((e, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5" style={{ borderBottom: '1px solid #1e2230' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{
                      background: e.type === 'warning' ? '#f59e0b' : e.type === 'info' ? '#6366f1' : e.type === 'success' ? '#22c55e' : '#ef4444',
                    }} />
                    <span className="text-[10px] text-[#8b8fa3] flex-1">{e.title}</span>
                    <span className="text-[9px] text-[#2a2f3e] flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />{e.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4" style={{ background: '#131620', border: '1px solid #1e2230', borderRadius: '6px' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] text-[#4a4f5e] uppercase tracking-wider">Top Queries</h3>
                <button className="flex items-center gap-1 text-[9px] text-[#2a2f3e] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #1e2230' }}>
                    {['Query', 'Count', 'Avg Time'].map(h => (
                      <th key={h} className="py-1.5 px-2 text-left text-[8px] text-[#2a2f3e] uppercase tracking-wider font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { query: 'SELECT * FROM users', count: '12.4K', time: '24ms' },
                    { query: 'INSERT INTO orders', count: '8.2K', time: '45ms' },
                    { query: 'UPDATE sessions SET', count: '5.7K', time: '18ms' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #1a1e2a' }}>
                      <td className="py-2 px-2 text-[10px] font-mono text-[#6366f1]">{row.query}</td>
                      <td className="py-2 px-2 text-[10px] text-[#8b8fa3]">{row.count}</td>
                      <td className="py-2 px-2 text-[10px] text-[#22c55e]">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}