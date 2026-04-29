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

export default function SchematicMinimalDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex bg-white">
      <aside className="w-48 flex-shrink-0 py-6 px-2 flex flex-col" style={{ borderRight: '1px solid #eee' }}>
        <div className="px-3 mb-8">
          <svg width="60" height="30" viewBox="0 0 60 30"><rect x="5" y="5" width="20" height="20" fill="none" stroke="#333" strokeWidth="1" /><line x1="25" y1="15" x2="35" y2="15" stroke="#333" strokeWidth="1" /><circle cx="45" cy="15" r="10" fill="none" stroke="#333" strokeWidth="1" /></svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#333] font-semibold' : 'text-[#ccc] hover:text-[#999]'}`}
                style={isActive ? { borderLeft: '1.5px solid #333' } : { borderLeft: '1.5px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid #eee' }}>
          <h2 className="text-sm font-medium text-[#333]">Schematic View</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#ccc]" /><input type="text" placeholder="Search" className="pl-8 pr-3 py-1.5 text-xs bg-transparent border-b border-[#eee] text-[#333] focus:outline-none w-32" /></div>
            <button className="p-1 text-[#ccc] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-8 mb-10">
            {[
              { label: 'Components', value: '48' },
              { label: 'Connections', value: '95' },
              { label: 'Layers', value: '6' },
              { label: 'Feedback', value: '3' },
            ].map((kpi, i) => (
              <div key={i}>
                <p className="text-[9px] text-[#ccc] mb-2 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-2xl font-light text-[#333]">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-10" style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
            <h3 className="text-[9px] text-[#ccc] mb-6 uppercase tracking-wider">Process Flow</h3>
            <div className="h-32 flex items-end justify-between gap-3">
              {[35,52,41,67,55,73,62,81,70,88,75,95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full" style={{ height: `${h}%`, border: '1px solid #333', background: 'transparent' }} />
                  <span className="text-[7px] text-[#ccc]">{['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-[9px] text-[#ccc] mb-4 uppercase tracking-wider">Structure A</h3>
              <svg width="100%" height="120" viewBox="0 0 300 120">
                <rect x="20" y="20" width="60" height="80" fill="none" stroke="#333" strokeWidth="1" />
                <line x1="80" y1="60" x2="120" y2="60" stroke="#333" strokeWidth="1" />
                <circle cx="150" cy="60" r="30" fill="none" stroke="#333" strokeWidth="1" />
                <line x1="180" y1="60" x2="220" y2="60" stroke="#333" strokeWidth="1" />
                <polygon points="220,40 260,60 220,80" fill="none" stroke="#333" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="5" stroke="#333" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="150" y1="30" x2="150" y2="15" stroke="#333" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="240" y1="40" x2="240" y2="25" stroke="#333" strokeWidth="0.5" strokeDasharray="3,3" />
              </svg>
            </div>
            <div>
              <h3 className="text-[9px] text-[#ccc] mb-4 uppercase tracking-wider">Structure B</h3>
              <div className="space-y-4">
                {[
                  { name: 'Input Layer', pct: 100 },
                  { name: 'Hidden Layer', pct: 65 },
                  { name: 'Output Layer', pct: 40 },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] text-[#999] mb-1"><span>{p.name}</span></div>
                    <div className="h-px bg-[#eee]"><div className="h-px bg-[#333]" style={{ width: `${p.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
            <h3 className="text-[9px] text-[#ccc] mb-4 uppercase tracking-wider">Component List</h3>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #eee' }}>{['ID', 'Type', 'I/O', 'State'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#ccc] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'C-01', type: 'Receptor', io: '2→1', state: 'Active' },
                  { id: 'C-02', type: 'Transducer', io: '1→3', state: 'Idle' },
                  { id: 'C-03', type: 'Effector', io: '3→1', state: 'Active' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td className="py-2.5 px-3 text-xs text-[#999]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#333]">{row.type}</td>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#666]">{row.io}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] ${row.state === 'Active' ? 'text-[#333]' : 'text-[#ccc]'}`}>{row.state}</span></td>
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