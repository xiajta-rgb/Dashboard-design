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

export default function BionicMechanismDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#f5f2ec' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#faf8f4', borderRight: '1px solid #d8d0c4' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#5a7a4a' }}>BIONIC</h1>
          <svg width="40" height="20" viewBox="0 0 40 20" className="mt-1">
            <path d="M0,10 Q10,0 20,10 Q30,20 40,10" fill="none" stroke="#5a7a4a" strokeWidth="0.8" />
            <path d="M0,10 Q10,5 20,10 Q30,15 40,10" fill="none" stroke="#5a7a4a" strokeWidth="0.4" opacity="0.5" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#5a7a4a] font-semibold' : 'text-[#a8a090] hover:text-[#7a8a6a]'}`}
                style={isActive ? { borderLeft: '2px solid #5a7a4a' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#faf8f4', borderBottom: '1px solid #d8d0c4' }}>
          <h2 className="text-sm font-bold text-[#5a7a4a]">Bionic Research</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a8a090]" /><input type="text" placeholder="Search organisms..." className="pl-8 pr-3 py-1.5 text-xs bg-[#f5f2ec] border border-[#d8d0c4] text-[#5a7a4a] focus:outline-none w-36" /></div>
            <button className="p-1.5 text-[#a8a090] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Specimens', value: '342', change: '+18', up: true },
              { label: 'Biomimetic', value: '89', change: '+5', up: true },
              { label: 'Efficiency', value: '94.2%', change: '+1.3%', up: true },
              { label: 'Adaptation', value: '0.87', change: '+0.04', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ background: '#faf8f4', border: '1px solid #d8d0c4' }}>
                <p className="text-[9px] text-[#a8a090] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-lg font-bold text-[#4a5a3a] mb-1">{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#5a8a4a]' : 'text-[#9a6a5a]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#faf8f4', border: '1px solid #d8d0c4' }}>
              <h3 className="text-[10px] text-[#a8a090] mb-4 uppercase tracking-wider">Bio-Inspired Performance</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {[35,52,41,67,55,73,62,81,70,88,75,95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: `linear-gradient(180deg, #5a7a4a 0%, #5a7a4a20 100%)` }} />
                    <span className="text-[7px] text-[#a8a090]">{['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ background: '#faf8f4', border: '1px solid #d8d0c4' }}>
              <h3 className="text-[10px] text-[#a8a090] mb-4 uppercase tracking-wider">Natural Patterns</h3>
              <div className="space-y-3">
                {[
                  { name: 'Honeycomb', pct: 82, color: '#5a7a4a' },
                  { name: 'Lotus Effect', pct: 68, color: '#7a9a6a' },
                  { name: 'Shark Skin', pct: 55, color: '#9aaa8a' },
                  { name: 'Gecko Feet', pct: 40, color: '#b8c0a8' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#a8a090' }}><span>{p.name}</span><span style={{ color: p.color }}>{p.pct}%</span></div>
                    <div className="h-0.5" style={{ background: '#e8e0d4' }}><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#faf8f4', border: '1px solid #d8d0c4' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#a8a090] uppercase tracking-wider">Specimen Registry</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#a8a090] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #d8d0c4' }}>{['Specimen', 'Organism', 'Mechanism', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#a8a090] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'BIO-001', org: 'Nepenthes', mech: 'Slippery Surface', status: 'Replicated' },
                  { id: 'BIO-002', org: 'Morpho Butterfly', mech: 'Structural Color', status: 'Modeling' },
                  { id: 'BIO-003', org: 'Woodpecker', mech: 'Shock Absorption', status: 'Testing' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e8e0d4' }}>
                    <td className="py-2.5 px-3 text-xs font-bold text-[#5a7a4a]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs italic text-[#6a7a5a]">{row.org}</td>
                    <td className="py-2.5 px-3 text-xs text-[#4a5a3a]">{row.mech}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] font-medium ${row.status === 'Replicated' ? 'text-[#5a8a4a]' : row.status === 'Modeling' ? 'text-[#8a8a5a]' : 'text-[#7a7a7a]'}`}>{row.status}</span></td>
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