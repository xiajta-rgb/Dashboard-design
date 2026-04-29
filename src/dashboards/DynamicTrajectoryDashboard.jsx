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



export default function DynamicTrajectoryDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0a0a14' }}>
      <style>{`
        @keyframes traj-flow { 0%{stroke-dashoffset:20} 100%{stroke-dashoffset:0} }
      `}</style>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0e0e1a', borderRight: '1px solid #1a1a30' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#ff6b35' }}>TRAJECTORY</h1>
          <svg width="50" height="12" className="mt-1"><path d="M0,10 Q10,0 25,6 Q40,12 50,2" fill="none" stroke="#ff6b35" strokeWidth="1" strokeDasharray="4,2" style={{ animation: 'traj-flow 1s linear infinite' }} /></svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#ff6b35]' : 'text-[#2a2a40] hover:text-[#ff6b3580]'}`}
                style={isActive ? { background: '#ff6b3508', borderLeft: '2px solid #ff6b35' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0e0e1a', borderBottom: '1px solid #1a1a30' }}>
          <h2 className="text-sm font-bold" style={{ color: '#ff6b35' }}>Motion Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#1a1a30' }} /><input type="text" placeholder="Search trajectories..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#0a0a14', border: '1px solid #1a1a30', color: '#ff6b35' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#1a1a30' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Particles', value: '12,482', change: '+5.3%', up: true },
              { label: 'Avg Velocity', value: '2.41 m/s', change: '+0.12', up: true },
              { label: 'Collisions', value: '847', change: '-3.2%', up: true },
              { label: 'Entropy', value: '0.842', change: '+0.03', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
                <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#2a2a40' }}>{kpi.label}</p>
                <p className="text-lg font-bold mb-1" style={{ color: '#e0e0f0' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#ff6b35]' : 'text-[#4a8eff]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#2a2a40' }}>Velocity Distribution</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {[35,52,41,67,55,73,62,81,70,88,75,95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: `linear-gradient(180deg, #ff6b35 0%, #ff6b3515 100%)` }} />
                    <span className="text-[7px]" style={{ color: '#1a1a30' }}>{['0.1','0.2','0.3','0.4','0.5','0.6','0.7','0.8','0.9','1.0','1.1','1.2'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#2a2a40' }}>Motion Types</h3>
              <div className="space-y-3">
                {[
                  { name: 'Brownian', pct: 45, color: '#ff6b35' },
                  { name: 'Ballistic', pct: 30, color: '#ffaa35' },
                  { name: 'Diffusive', pct: 18, color: '#4a8eff' },
                  { name: 'Trapped', pct: 7, color: '#8a4aff' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#2a2a40' }}><span>{p.name}</span><span style={{ color: p.color }}>{p.pct}%</span></div>
                    <div className="h-0.5" style={{ background: '#0a0a14' }}><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#2a2a40' }}>Trajectory Log</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#1a1a30' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #1a1a30' }}>{['ID', 'Type', 'Duration', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#1a1a30' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'TRJ-001', type: 'Brownian', dur: '2.4s', status: 'Complete' },
                  { id: 'TRJ-002', type: 'Ballistic', dur: '0.8s', status: 'Running' },
                  { id: 'TRJ-003', type: 'Diffusive', dur: '5.1s', status: 'Complete' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0c0c18' }}>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#ff6b35' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0e0f0' }}>{row.type}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#ffaa35' }}>{row.dur}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium px-1.5 py-0.5" style={{ border: `1px solid ${row.status === 'Complete' ? '#ff6b3530' : '#4a8eff30'}`, color: row.status === 'Complete' ? '#ff6b35' : '#4a8eff' }}>{row.status}</span></td>
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