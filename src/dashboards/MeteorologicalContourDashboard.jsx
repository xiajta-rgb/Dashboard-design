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

export default function MeteorologicalContourDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0c1828' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0f1e32', borderRight: '1px solid #1a3050' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#4a9eff' }}>METEO</h1>
          <svg width="50" height="16" viewBox="0 0 50 16" className="mt-1">
            <path d="M0,12 Q8,4 16,8 Q24,12 32,6 Q40,0 50,4" fill="none" stroke="#4a9eff" strokeWidth="0.8" />
            <path d="M0,14 Q8,8 16,10 Q24,14 32,8 Q40,4 50,8" fill="none" stroke="#4a9eff" strokeWidth="0.4" opacity="0.4" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#4a9eff]' : 'text-[#1a3a5a] hover:text-[#4a9eff80]'}`}
                style={isActive ? { background: '#4a9eff08', borderLeft: '2px solid #4a9eff' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0f1e32', borderBottom: '1px solid #1a3050' }}>
          <h2 className="text-sm font-bold" style={{ color: '#4a9eff' }}>Contour Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#1a3050' }} /><input type="text" placeholder="Search fields..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#0c1828', border: '1px solid #1a3050', color: '#4a9eff' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#1a3050' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Pressure', value: '1013.2 hPa', change: '-2.1', up: false },
              { label: 'Temperature', value: '22.4°C', change: '+1.8', up: true },
              { label: 'Wind Speed', value: '14.2 m/s', change: '+3.5', up: true },
              { label: 'Humidity', value: '68%', change: '-5%', up: false },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
                <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>{kpi.label}</p>
                <p className="text-lg font-bold mb-1" style={{ color: '#e0f0ff' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#4aaa6a]' : 'text-[#ff6a4a]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Temperature Field (°C)</h3>
              <div className="h-40 relative" style={{ background: 'linear-gradient(135deg, #0a2040 0%, #1a4060 25%, #2a6080 50%, #3a80a0 75%, #4aa0c0 100%)' }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="absolute rounded-full" style={{
                    left: `${15+i*15}%`, top: `${20+i*10}%`,
                    width: `${60-i*8}%`, height: `${70-i*10}%`,
                    border: `1px solid rgba(74,158,255,${0.15+i*0.05})`,
                    background: 'transparent'
                  }} />
                ))}
                <div className="absolute bottom-2 right-2 flex items-end gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="w-3 h-6" style={{ background: `hsl(${200+i*15}, 70%, ${25+i*10}%)` }} />
                  ))}
                  <span className="text-[7px] ml-1" style={{ color: '#4a9eff80' }}>°C</span>
                </div>
              </div>
            </div>
            <div className="p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Pressure Levels</h3>
              <div className="space-y-3">
                {[
                  { name: '1000 hPa', pct: 95, color: '#4a9eff' },
                  { name: '850 hPa', pct: 78, color: '#3a8aee' },
                  { name: '500 hPa', pct: 55, color: '#2a7add' },
                  { name: '300 hPa', pct: 30, color: '#1a6acc' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#1a3a5a' }}><span>{p.name}</span><span style={{ color: p.color }}>{p.pct}%</span></div>
                    <div className="h-0.5" style={{ background: '#0a1525' }}><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Observation Stations</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#1a3050' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #1a3050' }}>{['Station', 'Lat/Lon', 'Pressure', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#1a3a5a' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'STN-54511', loc: '39.9°N/116.4°E', pres: '1018.2 hPa', status: 'Online' },
                  { id: 'STN-58362', loc: '31.2°N/121.5°E', pres: '1015.8 hPa', status: 'Online' },
                  { id: 'STN-59287', loc: '23.1°N/113.3°E', pres: '1010.4 hPa', status: 'Maintenance' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0c1828' }}>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#4a9eff' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#6ab0ff' }}>{row.loc}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0f0ff' }}>{row.pres}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium" style={{ color: row.status === 'Online' ? '#4aaa6a' : '#ffaa4a' }}>{row.status}</span></td>
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