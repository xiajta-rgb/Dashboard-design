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

export default function AcademicCollageDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#ffffff' }}>
      <aside className="w-52 flex-shrink-0 py-6 px-3 flex flex-col" style={{ borderRight: '2px solid #333' }}>
        <div className="px-2 mb-8">
          <h1 className="text-sm font-black tracking-[0.1em]" style={{ color: '#333', fontFamily: 'Georgia, serif' }}>REVIEW</h1>
          <div className="mt-1 h-0.5 w-8 bg-[#333]" />
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#333] font-bold' : 'text-[#aaa] hover:text-[#666]'}`}
                style={isActive ? { borderLeft: '3px solid #333' } : { borderLeft: '3px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '2px solid #333' }}>
          <h2 className="text-lg font-black" style={{ color: '#333', fontFamily: 'Georgia, serif' }}>Literature Review</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aaa]" /><input type="text" placeholder="Search papers..." className="pl-8 pr-3 py-1.5 text-xs bg-transparent border-b-2 border-[#333] text-[#333] focus:outline-none w-40" /></div>
            <button className="p-1 text-[#aaa] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Papers', value: '248', change: '+12', up: true },
              { label: 'Citations', value: '4,589', change: '+8.2%', up: true },
              { label: 'Figures', value: '847', change: '+24', up: true },
              { label: 'H-Index', value: '42', change: '+2', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ border: '1px solid #ddd' }}>
                <p className="text-[9px] text-[#aaa] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-xl font-black text-[#333] mb-1">{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${kpi.up ? 'text-[#2d8a4e]' : 'text-[#c44040]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-5" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#aaa] mb-4 uppercase tracking-wider font-bold">Publication Timeline</h3>
              <div className="h-36 flex items-end justify-between gap-2">
                {[35,52,41,67,55,73,62,81,70,88,75,95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: i % 2 === 0 ? '#333' : '#999' }} />
                    <span className="text-[7px] text-[#aaa]">{['18','19','20','21','22','23','24','25','26','27','28','29'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#aaa] mb-4 uppercase tracking-wider font-bold">Research Domains</h3>
              <div className="space-y-3">
                {[
                  { name: 'Materials Science', pct: 35, color: '#333' },
                  { name: 'Condensed Matter', pct: 28, color: '#666' },
                  { name: 'Chemistry', pct: 22, color: '#999' },
                  { name: 'Engineering', pct: 15, color: '#bbb' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#999' }}><span>{p.name}</span><span>{p.pct}%</span></div>
                    <div className="h-1 bg-[#eee]"><div className="h-1" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ border: '1px solid #ddd' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#aaa] uppercase tracking-wider font-bold">Figure Registry</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#aaa] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '2px solid #333' }}>{['Fig.', 'Type', 'Source', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#aaa] uppercase tracking-wider font-bold">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'Fig. 1', type: 'Schematic', src: 'Smith et al. 2024', status: 'Published' },
                  { id: 'Fig. 2', type: 'SEM Image', src: 'Wang et al. 2023', status: 'Draft' },
                  { id: 'Fig. 3', type: 'XRD Plot', src: 'Lee et al. 2024', status: 'Review' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td className="py-2.5 px-3 text-xs font-bold text-[#333]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#666]">{row.type}</td>
                    <td className="py-2.5 px-3 text-xs italic text-[#666]">{row.src}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] font-bold ${row.status === 'Published' ? 'text-[#2d8a4e]' : row.status === 'Draft' ? 'text-[#c4a35a]' : 'text-[#666]'}`}>{row.status}</span></td>
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