import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Filter,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function CreamDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#faf5f0' }}>
      <aside className="w-56 flex-shrink-0 py-6 px-4 flex flex-col" style={{ background: '#f5ede4', borderRight: '1px solid #e8ddd0' }}>
        <div className="px-3 mb-8">
          <h1 className="text-lg font-semibold" style={{ color: '#8b7e74' }}>Creamy</h1>
          <div className="mt-1.5 h-1 w-8 rounded-full" style={{ background: '#e8c8b0' }} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium cursor-pointer ${isActive ? 'text-[#8b7e74]' : 'text-[#b8a99a] hover:text-[#8b7e74]'}`}
                style={isActive ? { background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(139,126,116,0.08)' } : { borderRadius: '16px' }}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid #e8ddd0' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#6b5e54' }}>Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#c8b8a8' }} />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2.5 text-sm focus:outline-none w-52" style={{ background: '#fff', border: '1px solid #e8ddd0', color: '#6b5e54', borderRadius: '20px' }} />
            </div>
            <button className="p-2.5 cursor-pointer" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e8ddd0', color: '#b8a99a' }}><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-5 mb-8">
            {[
              { label: 'Revenue', value: '$48,295', change: '+12.5%', up: true },
              { label: 'Users', value: '24,589', change: '+8.2%', up: true },
              { label: 'Orders', value: '1,847', change: '-2.4%', up: false },
              { label: 'Growth', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-5" style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e8ddd0', boxShadow: '0 2px 12px rgba(139,126,116,0.06)' }}>
                <p className="text-sm mb-2" style={{ color: '#b8a99a' }}>{kpi.label}</p>
                <p className="text-2xl font-bold mb-2" style={{ color: '#5a4e44' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${kpi.up ? 'text-[#8bb89a]' : 'text-[#b88a8a]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="col-span-2 p-6" style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e8ddd0', boxShadow: '0 2px 12px rgba(139,126,116,0.06)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#6b5e54' }}>Monthly Revenue</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: 'linear-gradient(180deg, #e8c8b0 0%, #f0d8c4 100%)', borderRadius: '10px 10px 4px 4px' }} />
                    <span className="text-[9px]" style={{ color: '#c8b8a8' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e8ddd0', boxShadow: '0 2px 12px rgba(139,126,116,0.06)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#6b5e54' }}>Categories</h3>
              <div className="space-y-4">
                {[
                  { name: 'Design', pct: 75, color: '#e8c8b0' },
                  { name: 'Dev', pct: 58, color: '#b8c8d8' },
                  { name: 'Marketing', pct: 42, color: '#c8b8d8' },
                  { name: 'Sales', pct: 30, color: '#b8d8c8' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5" style={{ color: '#8b7e74' }}>
                      <span>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: '#f5ede4' }}>
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6" style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e8ddd0', boxShadow: '0 2px 12px rgba(139,126,116,0.06)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: '#6b5e54' }}>Recent Orders</h3>
              <button className="flex items-center gap-1 text-xs cursor-pointer" style={{ color: '#b8a99a' }}><Filter className="w-3 h-3" />Filter</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #e8ddd0' }}>
                  {['Order', 'Customer', 'Amount', 'Status'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-xs font-medium" style={{ color: '#b8a99a' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#3210', name: 'Alice Chen', amount: '$245', status: 'Done' },
                  { id: '#3209', name: 'Bob Wang', amount: '$189', status: 'Pending' },
                  { id: '#3208', name: 'Carol Li', amount: '$432', status: 'Done' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f0e8e0' }}>
                    <td className="py-3 px-3 text-sm" style={{ color: '#8b7e74' }}>{row.id}</td>
                    <td className="py-3 px-3 text-sm" style={{ color: '#5a4e44' }}>{row.name}</td>
                    <td className="py-3 px-3 text-sm font-medium" style={{ color: '#5a4e44' }}>{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-medium px-3 py-1" style={{
                        borderRadius: '12px',
                        background: row.status === 'Done' ? '#e8f5ee' : '#fef3e8',
                        color: row.status === 'Done' ? '#6b9a7a' : '#9a8b6b',
                      }}>{row.status}</span>
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