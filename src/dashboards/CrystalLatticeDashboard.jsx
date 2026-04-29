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

export default function CrystalLatticeDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0a0e1a' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0d1220', borderRight: '1px solid #1a2540' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#4a8eff' }}>CRYSTAL</h1>
          <svg width="50" height="20" viewBox="0 0 50 20" className="mt-1">
            {[0,10,20,30,40].map(x => <circle key={x} cx={x+5} cy="10" r="2" fill="none" stroke="#4a8eff" strokeWidth="0.5" />)}
            {[0,10,20,30].map(x => <line key={x} x1={x+5} y1="10" x2={x+15} y2="10" stroke="#4a8eff" strokeWidth="0.3" />)}
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#4a8eff]' : 'text-[#2a3550] hover:text-[#4a8eff80]'}`}
                style={isActive ? { background: '#4a8eff08', borderLeft: '2px solid #4a8eff' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0d1220', borderBottom: '1px solid #1a2540' }}>
          <h2 className="text-sm font-bold" style={{ color: '#4a8eff' }}>Lattice Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#1a2540' }} /><input type="text" placeholder="Search structures..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#0a0e1a', border: '1px solid #1a2540', color: '#4a8eff' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#1a2540' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Unit Cells', value: '4,829', change: '+2.1%', up: true },
              { label: 'Symmetry', value: 'Fm-3m', change: 'Cubic', up: true },
              { label: 'Defects', value: '0.04%', change: '-0.01%', up: true },
              { label: 'a₀ (Å)', value: '4.0495', change: '+0.002', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ background: '#0d1220', border: '1px solid #1a2540' }}>
                <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#2a3550' }}>{kpi.label}</p>
                <p className="text-lg font-bold mb-1" style={{ color: '#e0e8ff' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#4a8eff]' : 'text-[#ff4a4a]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0d1220', border: '1px solid #1a2540' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#2a3550' }}>Energy Band Structure</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {[35,52,41,67,55,73,62,81,70,88,75,95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: `linear-gradient(180deg, #4a8eff 0%, #4a8eff15 100%)` }} />
                    <span className="text-[7px]" style={{ color: '#1a2540' }}>{['Γ','X','W','K','Γ','L','U','W','L','K','Γ','X'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ background: '#0d1220', border: '1px solid #1a2540' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#2a3550' }}>Phase Composition</h3>
              <div className="space-y-3">
                {[
                  { name: 'FCC', pct: 75, color: '#4a8eff' },
                  { name: 'BCC', pct: 15, color: '#8ab4ff' },
                  { name: 'HCP', pct: 8, color: '#2a5ab0' },
                  { name: 'Amorphous', pct: 2, color: '#1a3570' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#2a3550' }}><span>{p.name}</span><span style={{ color: p.color }}>{p.pct}%</span></div>
                    <div className="h-0.5" style={{ background: '#0a0e1a' }}><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0d1220', border: '1px solid #1a2540' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#2a3550' }}>Structure Registry</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#1a2540' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #1a2540' }}>{['ID', 'Structure', 'Space Group', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#1a2540' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'STR-001', name: 'Au (FCC)', group: 'Fm-3m', status: 'Stable' },
                  { id: 'STR-002', name: 'Fe (BCC)', group: 'Im-3m', status: 'Stable' },
                  { id: 'STR-003', name: 'Ti (HCP)', group: 'P6₃/mmc', status: 'Metastable' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0f1525' }}>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#4a8eff' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0e8ff' }}>{row.name}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#8ab4ff' }}>{row.group}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium px-1.5 py-0.5" style={{ border: `1px solid ${row.status === 'Stable' ? '#4a8eff30' : '#ffcc0030'}`, color: row.status === 'Stable' ? '#4a8eff' : '#ffcc00' }}>{row.status}</span></td>
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