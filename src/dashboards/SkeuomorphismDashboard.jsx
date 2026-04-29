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



export default function SkeuomorphismDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: 'linear-gradient(135deg, #2c2c3a 0%, #1a1a28 50%, #252535 100%)' }}>
      <aside className="w-56 flex-shrink-0 py-6 px-3 flex flex-col" style={{
        background: 'linear-gradient(180deg, #3a3a4a 0%, #2a2a3a 100%)',
        boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.05), inset -1px 0 0 rgba(0,0,0,0.3), 4px 0 8px rgba(0,0,0,0.4)',
      }}>
        <div className="px-3 mb-8">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{
            background: 'linear-gradient(135deg, #c9a84c 0%, #a8872e 50%, #d4b65a 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)',
          }}>
            <span className="text-sm font-bold text-[#1a1a28]">Luxe Panel</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer"
                style={isActive ? {
                  background: 'linear-gradient(135deg, #4a4a5a 0%, #3a3a4a 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  color: '#c9a84c',
                } : {
                  color: 'rgba(255,255,255,0.5)',
                  borderRadius: '8px',
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{
          background: 'linear-gradient(180deg, #3a3a4a 0%, #2e2e3e 100%)',
          boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.3)',
        }}>
          <h2 className="text-lg font-semibold text-white/90">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 text-sm text-white/70 placeholder-white/30 focus:outline-none w-56" style={{
                background: 'linear-gradient(135deg, #2a2a3a 0%, #222232 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)',
              }} />
            </div>
            <button className="p-2 text-white/50 cursor-pointer" style={{
              background: 'linear-gradient(135deg, #3a3a4a 0%, #2e2e3e 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.3)',
              borderRadius: '8px',
            }}><Bell className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Revenue', value: '$48,295', change: '+12.5%', up: true },
              { label: 'Users', value: '24,589', change: '+8.2%', up: true },
              { label: 'Orders', value: '1,847', change: '-2.4%', up: false },
              { label: 'Growth', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-5" style={{
                background: 'linear-gradient(145deg, #3a3a4a 0%, #2e2e3e 100%)',
                borderRadius: '12px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 4px 4px 8px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <p className="text-sm text-white/50 mb-1">{kpi.label}</p>
                <p className="text-2xl font-bold text-white/90 mb-2">{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold ${kpi.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 p-6" style={{
              background: 'linear-gradient(145deg, #3a3a4a 0%, #2e2e3e 100%)',
              borderRadius: '12px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 4px 4px 8px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <h3 className="text-sm font-semibold text-white/80 mb-4">Monthly Revenue</h3>
              <div className="h-48 flex items-end justify-between gap-1">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{
                      height: `${h}%`,
                      background: 'linear-gradient(180deg, #c9a84c 0%, #a8872e 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.3)',
                      borderRadius: '2px 2px 0 0',
                    }} />
                    <span className="text-[9px] text-white/30">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{
              background: 'linear-gradient(145deg, #3a3a4a 0%, #2e2e3e 100%)',
              borderRadius: '12px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 4px 4px 8px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <h3 className="text-sm font-semibold text-white/80 mb-4">Leather Gauge</h3>
              <div className="space-y-5 pt-4">
                {[75, 58, 42, 30].map((w, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs text-white/40 mb-2">
                      <span>{['Premium', 'Standard', 'Basic', 'Trial'][i]}</span><span>{w}%</span>
                    </div>
                    <div className="h-3 rounded-full" style={{
                      background: 'linear-gradient(135deg, #1a1a28 0%, #222232 100%)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                    }}>
                      <div className="h-full rounded-full" style={{
                        width: `${w}%`,
                        background: 'linear-gradient(135deg, #c9a84c 0%, #d4b65a 50%, #a8872e 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.3)',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6" style={{
            background: 'linear-gradient(145deg, #3a3a4a 0%, #2e2e3e 100%)',
            borderRadius: '12px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 4px 4px 8px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white/80">Recent Orders</h3>
              <button className="flex items-center gap-1 text-xs text-white/40 cursor-pointer" style={{
                background: 'linear-gradient(135deg, #3a3a4a 0%, #2e2e3e 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.3)',
                borderRadius: '6px', padding: '4px 10px',
              }}><Filter className="w-3 h-3" />Filter</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Order', 'Customer', 'Amount', 'Status'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-xs font-semibold text-white/30 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#3210', name: 'Alice Chen', amount: '$245', status: 'Done' },
                  { id: '#3209', name: 'Bob Wang', amount: '$189', status: 'Pending' },
                  { id: '#3208', name: 'Carol Li', amount: '$432', status: 'Done' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td className="py-3 px-3 text-sm text-white/50">{row.id}</td>
                    <td className="py-3 px-3 text-sm text-white/60">{row.name}</td>
                    <td className="py-3 px-3 text-sm text-white/80 font-medium">{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-semibold px-2 py-0.5" style={{
                        borderRadius: '4px',
                        background: row.status === 'Done' ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)',
                        color: row.status === 'Done' ? '#34d399' : '#fbbf24',
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