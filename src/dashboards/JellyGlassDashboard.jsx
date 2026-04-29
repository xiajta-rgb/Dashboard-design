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



export default function JellyGlassDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: 'linear-gradient(135deg, #ff6b9d 0%, #c44dff 30%, #6e5cff 60%, #00d4ff 100%)' }}>
      <style>{`
        @keyframes jelly-wobble { 0%,100%{transform:scale(1)} 25%{transform:scale(1.02)} 75%{transform:scale(0.98)} }
      `}</style>
      <aside className="w-56 flex-shrink-0 py-6 px-4 flex flex-col" style={{
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(30px)',
        borderRight: '1px solid rgba(255,255,255,0.2)',
      }}>
        <div className="px-3 mb-8">
          <h1 className="text-lg font-bold" style={{ color: '#fff', textShadow: '0 2px 10px rgba(255,255,255,0.3)' }}>JellyGlass</h1>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium cursor-pointer ${isActive ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
                style={isActive ? {
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: '14px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)',
                  border: '1px solid rgba(255,255,255,0.3)',
                } : { borderRadius: '14px' }}
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
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.15)',
        }}>
          <h2 className="text-lg font-bold text-white">Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2.5 text-sm focus:outline-none w-52" style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                borderRadius: '16px',
              }} />
            </div>
            <button className="p-2.5 cursor-pointer" style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.7)',
            }}><Bell className="w-4 h-4" /></button>
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
              <div key={i} className="p-5" style={{
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)',
                animation: 'jelly-wobble 4s ease-in-out infinite',
                animationDelay: `${i * 0.3}s`,
              }}>
                <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>{kpi.label}</p>
                <p className="text-2xl font-bold mb-2 text-white">{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${kpi.up ? 'text-[#80ffcc]' : 'text-[#ff8a9e]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="col-span-2 p-6" style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}>
              <h3 className="text-sm font-semibold mb-4 text-white/80">Monthly Revenue</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{
                      height: `${h}%`,
                      background: 'rgba(255,255,255,0.35)',
                      borderRadius: '8px 8px 4px 4px',
                      boxShadow: '0 0 10px rgba(255,255,255,0.15)',
                    }} />
                    <span className="text-[9px] text-white/40">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}>
              <h3 className="text-sm font-semibold mb-4 text-white/80">Categories</h3>
              <div className="space-y-4">
                {[
                  { name: 'Design', pct: 75 },
                  { name: 'Dev', pct: 58 },
                  { name: 'Marketing', pct: 42 },
                  { name: 'Sales', pct: 30 },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5 text-white/60">
                      <span>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: 'rgba(255,255,255,0.4)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6" style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white/80">Recent Orders</h3>
              <button className="flex items-center gap-1 text-xs cursor-pointer text-white/50"><Filter className="w-3 h-3" />Filter</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['Order', 'Customer', 'Amount', 'Status'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-xs font-medium text-white/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#3210', name: 'Alice Chen', amount: '$245', status: 'Done' },
                  { id: '#3209', name: 'Bob Wang', amount: '$189', status: 'Pending' },
                  { id: '#3208', name: 'Carol Li', amount: '$432', status: 'Done' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <td className="py-3 px-3 text-sm text-white/50">{row.id}</td>
                    <td className="py-3 px-3 text-sm text-white/70">{row.name}</td>
                    <td className="py-3 px-3 text-sm font-medium text-white">{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-medium px-2.5 py-1" style={{
                        borderRadius: '12px',
                        background: row.status === 'Done' ? 'rgba(128,255,204,0.15)' : 'rgba(255,200,100,0.15)',
                        color: row.status === 'Done' ? '#80ffcc' : '#ffc864',
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