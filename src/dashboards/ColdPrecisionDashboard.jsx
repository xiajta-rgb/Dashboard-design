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

export default function ColdPrecisionDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#f0f2f5' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col bg-white" style={{ borderRight: '1px solid #c8ccd4' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.2em]" style={{ color: '#4a5568' }}>PRECISION</h1>
          <div className="mt-1 flex items-center gap-0.5">
            {[0,1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-0.5 flex-1" style={{ background: i < 6 ? '#4a5568' : '#d0d4dc' }} />)}
          </div>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#4a5568] font-semibold' : 'text-[#a0a8b4] hover:text-[#6a7588]'}`}
                style={isActive ? { borderLeft: '2px solid #4a5568' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3 bg-white" style={{ borderBottom: '1px solid #c8ccd4' }}>
          <h2 className="text-sm font-bold text-[#4a5568]">Engineering Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a0a8b4]" /><input type="text" placeholder="Search specs..." className="pl-8 pr-3 py-1.5 text-xs bg-[#f0f2f5] border border-[#c8ccd4] text-[#4a5568] focus:outline-none w-36" /></div>
            <button className="p-1.5 text-[#a0a8b4] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Tolerance', value: '±0.002mm', change: 'Grade IT4', up: true },
              { label: 'Surface', value: 'Ra 0.8', change: 'N6', up: true },
              { label: 'Deflection', value: '0.12mm', change: '-0.03', up: true },
              { label: 'Safety', value: '2.45', change: '+0.15', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4 bg-white" style={{ border: '1px solid #c8ccd4' }}>
                <p className="text-[9px] text-[#a0a8b4] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-lg font-bold text-[#4a5568] mb-1 font-mono">{kpi.value}</p>
                <span className="inline-flex items-center gap-0.5 text-[10px] text-[#6a8a7a]">
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
              <h3 className="text-[10px] text-[#a0a8b4] mb-4 uppercase tracking-wider">Stress-Strain Curve</h3>
              <div className="h-40 relative">
                <div className="absolute left-0 top-0 bottom-6 w-px bg-[#c8ccd4]" />
                <div className="absolute bottom-0 left-6 right-0 h-px bg-[#c8ccd4]" />
                <svg width="100%" height="100%" viewBox="0 0 300 140" className="absolute inset-0">
                  <text x="5" y="75" fill="#a0a8b4" fontSize="7" transform="rotate(-90,5,75)">σ (MPa)</text>
                  <text x="150" y="138" fill="#a0a8b4" fontSize="7">ε (mm/mm)</text>
                  {[20,40,60,80,100,120].map(y => <line key={y} x1="20" y1={140-y} x2="280" y2={140-y} stroke="#e8eaee" strokeWidth="0.5" />)}
                  <path d="M20,120 Q60,100 100,80 Q140,60 180,55 Q220,52 260,50" fill="none" stroke="#4a5568" strokeWidth="1.5" />
                  <line x1="100" y1="80" x2="100" y2="140" stroke="#4a5568" strokeWidth="0.5" strokeDasharray="3,3" />
                  <text x="95" y="138" fill="#4a5568" fontSize="6">σy</text>
                </svg>
              </div>
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
              <h3 className="text-[10px] text-[#a0a8b4] mb-4 uppercase tracking-wider">Material Properties</h3>
              <div className="space-y-3">
                {[
                  { name: 'E (GPa)', pct: 95, color: '#4a5568' },
                  { name: 'σy (MPa)', pct: 72, color: '#6a7588' },
                  { name: 'σu (MPa)', pct: 58, color: '#8a94a4' },
                  { name: 'Elong. (%)', pct: 35, color: '#a0a8b4' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#a0a8b4' }}><span>{p.name}</span><span>{p.pct}%</span></div>
                    <div className="h-0.5 bg-[#e8eaee]"><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#a0a8b4] uppercase tracking-wider">Component Specs</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#a0a8b4] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #c8ccd4' }}>{['Part', 'Material', 'Tolerance', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#a0a8b4] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'SHAFT-01', mat: '42CrMo4', tol: '±0.005mm', status: 'Pass' },
                  { id: 'GEAR-02', mat: '20MnCr5', tol: '±0.008mm', status: 'Pass' },
                  { id: 'HOUSING-03', mat: 'GG-25', tol: '±0.020mm', status: 'Rework' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e8eaee' }}>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#4a5568]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#6a7588]">{row.mat}</td>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#4a5568]">{row.tol}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] font-bold ${row.status === 'Pass' ? 'text-[#6a8a7a]' : 'text-[#9a7a5a]'}`}>{row.status}</span></td>
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