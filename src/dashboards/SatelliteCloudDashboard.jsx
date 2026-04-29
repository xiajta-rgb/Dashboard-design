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

export default function SatelliteCloudDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#060810' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0a0e18', borderRight: '1px solid #141c2c' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#88aaff' }}>SATELLITE</h1>
          <svg width="50" height="16" viewBox="0 0 50 16" className="mt-1">
            <circle cx="25" cy="8" r="6" fill="none" stroke="#88aaff" strokeWidth="0.5" />
            <ellipse cx="25" cy="8" rx="12" ry="4" fill="none" stroke="#88aaff" strokeWidth="0.3" transform="rotate(-20,25,8)" />
            <circle cx="25" cy="8" r="2" fill="#88aaff" opacity="0.3" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#88aaff]' : 'text-[#1a2440] hover:text-[#88aaff80]'}`}
                style={isActive ? { background: '#88aaff08', borderLeft: '2px solid #88aaff' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0a0e18', borderBottom: '1px solid #141c2c' }}>
          <h2 className="text-sm font-bold" style={{ color: '#88aaff' }}>Cloud Image Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#141c2c' }} /><input type="text" placeholder="Search channels..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#060810', border: '1px solid #141c2c', color: '#88aaff' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#141c2c' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'IR Channel', value: '10.8 μm', change: 'BT 245K', up: true },
              { label: 'WV Channel', value: '6.2 μm', change: 'BT 220K', up: true },
              { label: 'VIS Channel', value: '0.65 μm', change: 'Alb 78%', up: true },
              { label: 'Cloud Cover', value: '62%', change: '+8%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
                <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#1a2440' }}>{kpi.label}</p>
                <p className="text-lg font-bold mb-1" style={{ color: '#d0e0ff' }}>{kpi.value}</p>
                <span className="inline-flex items-center gap-0.5 text-[10px]" style={{ color: '#88aaff' }}>
                  <TrendingUp className="w-3 h-3" />{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>Pseudo-Color Enhancement</h3>
              <div className="h-40 relative" style={{ background: 'linear-gradient(135deg, #0a0e18 0%, #1a2040 20%, #2a3060 35%, #3a5080 50%, #5a80a0 65%, #8ab0c0 80%, #c0d8e0 95%)' }}>
                {[0,1,2,3].map(i => (
                  <div key={i} className="absolute" style={{
                    left: `${10+i*18}%`, top: `${15+i*12}%`,
                    width: `${50-i*8}%`, height: `${60-i*10}%`,
                    background: `radial-gradient(ellipse, rgba(${100+i*40},${140+i*30},${200-i*20},0.3) 0%, transparent 70%)`,
                    borderRadius: '50%'
                  }} />
                ))}
                <div className="absolute bottom-2 right-2 flex items-end gap-0.5">
                  {Array.from({length:8}).map((_, i) => (
                    <div key={i} className="w-2 h-5" style={{ background: `hsl(${200+i*8}, ${60+i*3}%, ${15+i*8}%)` }} />
                  ))}
                  <span className="text-[7px] ml-1" style={{ color: '#88aaff60' }}>BT(K)</span>
                </div>
              </div>
            </div>
            <div className="p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>Cloud Classification</h3>
              <div className="space-y-3">
                {[
                  { name: 'Cb (Cumulonimbus)', pct: 15, color: '#88aaff' },
                  { name: 'Ci (Cirrus)', pct: 30, color: '#6a8acc' },
                  { name: 'Sc (Stratocumulus)', pct: 25, color: '#4a6a9a' },
                  { name: 'St (Stratus)', pct: 20, color: '#2a4a7a' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#1a2440' }}><span>{p.name}</span><span style={{ color: p.color }}>{p.pct}%</span></div>
                    <div className="h-0.5" style={{ background: '#060810' }}><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#1a2440' }}>Satellite Pass Log</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#141c2c' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #141c2c' }}>{['Satellite', 'Channel', 'Resolution', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#1a2440' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'FY-4A', ch: 'AGRI', res: '500m', status: 'Active' },
                  { id: 'Himawari-9', ch: 'AHI', res: '500m', status: 'Active' },
                  { id: 'GOES-16', ch: 'ABI', res: '1km', status: 'Standby' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #080c14' }}>
                    <td className="py-2.5 px-3 text-xs font-bold" style={{ color: '#88aaff' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#6a8acc' }}>{row.ch}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#d0e0ff' }}>{row.res}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium" style={{ color: row.status === 'Active' ? '#4aaa6a' : '#ffaa4a' }}>{row.status}</span></td>
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