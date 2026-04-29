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



export default function MatteLuxuryDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#1a1816' }}>
      <aside className="w-56 flex-shrink-0 py-6 px-4 flex flex-col" style={{ background: '#1e1c1a', borderRight: '1px solid #2a2725' }}>
        <div className="px-2 mb-8">
          <h1 className="text-base font-light tracking-[0.25em]" style={{ color: '#c8b898' }}>LUXE</h1>
          <div className="mt-1.5 h-px w-10" style={{ background: 'linear-gradient(90deg, #8a7a5a, transparent)' }} />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-light cursor-pointer ${isActive ? 'text-[#c8b898]' : 'text-[#5a5248] hover:text-[#8a7a5a]'}`}
                style={isActive ? { background: 'rgba(200,184,152,0.04)', borderLeft: '1px solid #8a7a5a' } : { borderLeft: '1px solid transparent' }}
              >
                <Icon className="w-4 h-4" />
                <span style={{ letterSpacing: '0.08em' }}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ background: '#1e1c1a', borderBottom: '1px solid #2a2725' }}>
          <h2 className="text-base font-light tracking-[0.15em]" style={{ color: '#c8b898' }}>Overview</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#5a5248' }} />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 text-sm font-light focus:outline-none w-48" style={{ background: '#1a1816', border: '1px solid #2a2725', color: '#8a7a5a', borderRadius: '2px' }} />
            </div>
            <button className="p-2 cursor-pointer" style={{ color: '#5a5248' }}><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-5 mb-8">
            {[
              { label: 'Revenue', value: '$48,295', change: '+12.5%', up: true },
              { label: 'Clients', value: '24,589', change: '+8.2%', up: true },
              { label: 'Projects', value: '1,847', change: '-2.4%', up: false },
              { label: 'Growth', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-5" style={{ background: '#1e1c1a', border: '1px solid #2a2725', borderRadius: '2px' }}>
                <p className="text-xs font-light mb-2" style={{ color: '#5a5248', letterSpacing: '0.1em' }}>{kpi.label}</p>
                <p className="text-2xl font-light mb-2" style={{ color: '#e8dcc8' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-light ${kpi.up ? 'text-[#8a9a6a]' : 'text-[#9a6a5a]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="col-span-2 p-6" style={{ background: '#1e1c1a', border: '1px solid #2a2725', borderRadius: '2px' }}>
              <h3 className="text-xs font-light mb-4" style={{ color: '#5a5248', letterSpacing: '0.15em' }}>Monthly Revenue</h3>
              <div className="h-44 flex items-end justify-between gap-2">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: 'linear-gradient(180deg, #8a7a5a 0%, #3a3528 100%)', borderRadius: '1px 1px 0 0' }} />
                    <span className="text-[8px]" style={{ color: '#3a3528' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{ background: '#1e1c1a', border: '1px solid #2a2725', borderRadius: '2px' }}>
              <h3 className="text-xs font-light mb-4" style={{ color: '#5a5248', letterSpacing: '0.15em' }}>Sectors</h3>
              <div className="space-y-4">
                {[
                  { name: 'Finance', pct: 75, color: '#8a7a5a' },
                  { name: 'Real Estate', pct: 58, color: '#c8b898' },
                  { name: 'Legal', pct: 42, color: '#8a7a5a' },
                  { name: 'Consulting', pct: 30, color: '#c8b898' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-light mb-1" style={{ color: '#5a5248', letterSpacing: '0.08em' }}>
                      <span>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-0.5" style={{ background: '#2a2725' }}>
                      <div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6" style={{ background: '#1e1c1a', border: '1px solid #2a2725', borderRadius: '2px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-light" style={{ color: '#5a5248', letterSpacing: '0.15em' }}>Recent Projects</h3>
              <button className="flex items-center gap-1 text-[10px] font-light cursor-pointer" style={{ color: '#3a3528' }}><Filter className="w-3 h-3" />Filter</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #2a2725' }}>
                  {['Project', 'Client', 'Value', 'Status'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-[10px] font-light uppercase" style={{ color: '#3a3528', letterSpacing: '0.12em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'PRJ-001', name: 'Meridian Holdings', amount: '$245K', status: 'Active' },
                  { id: 'PRJ-002', name: 'Atlas Capital', amount: '$189K', status: 'Review' },
                  { id: 'PRJ-003', name: 'Vanguard Trust', amount: '$432K', status: 'Active' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #222018' }}>
                    <td className="py-3 px-3 text-sm font-light" style={{ color: '#8a7a5a' }}>{row.id}</td>
                    <td className="py-3 px-3 text-sm font-light" style={{ color: '#c8b898' }}>{row.name}</td>
                    <td className="py-3 px-3 text-sm font-light" style={{ color: '#e8dcc8' }}>{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-light px-2 py-0.5" style={{
                        border: '1px solid',
                        borderColor: row.status === 'Active' ? '#8a9a6a30' : '#8a7a5a30',
                        color: row.status === 'Active' ? '#8a9a6a' : '#8a7a5a',
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