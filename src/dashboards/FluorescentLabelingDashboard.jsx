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

export default function FluorescentLabelingDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#050510' }}>
      <style>{`
        @keyframes fluor-pulse { 0%,100%{opacity:.7;filter:brightness(1)} 50%{opacity:1;filter:brightness(1.3)} }
      `}</style>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#080818', borderRight: '1px solid #1a1a40' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#00ff88', textShadow: '0 0 8px #00ff8860' }}>FLUOR</h1>
          <div className="mt-1 flex gap-1">
            {['#00ff88','#ff3366','#3388ff','#ffcc00'].map((c,i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}80`, animation: `fluor-pulse ${1.5+i*0.3}s infinite`, animationDelay: `${i*0.2}s` }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#00ff88]' : 'text-[#334] hover:text-[#00ff8880]'}`}
                style={isActive ? { background: '#00ff8808', borderLeft: '2px solid #00ff88' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#080818', borderBottom: '1px solid #1a1a40' }}>
          <h2 className="text-sm font-bold" style={{ color: '#00ff88', textShadow: '0 0 6px #00ff8840' }}>Cell Imaging</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#1a1a40' }} /><input type="text" placeholder="Search markers..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#050510', border: '1px solid #1a1a40', color: '#00ff88' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#1a1a40' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'DAPI', value: '12,482', change: '+5.3%', up: true, color: '#3388ff' },
              { label: 'FITC', value: '8,291', change: '+8.1%', up: true, color: '#00ff88' },
              { label: 'TRITC', value: '3,847', change: '-2.4%', up: false, color: '#ff3366' },
              { label: 'Cy5', value: '1,442', change: '+0.8%', up: true, color: '#cc44ff' },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ background: '#080818', border: `1px solid ${kpi.color}20` }}>
                <div className="flex items-center gap-1.5 mb-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: kpi.color, boxShadow: `0 0 4px ${kpi.color}80` }} /><p className="text-[9px] uppercase tracking-wider" style={{ color: kpi.color }}>{kpi.label}</p></div>
                <p className="text-lg font-bold mb-1" style={{ color: '#e0e0ff', textShadow: `0 0 4px ${kpi.color}30` }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#080818', border: '1px solid #1a1a40' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#00ff8880' }}>Fluorescence Intensity</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {[35,52,41,67,55,73,62,81,70,88,75,95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: `linear-gradient(180deg, #00ff88 0%, #00ff8820 100%)`, boxShadow: '0 0 6px #00ff8830' }} />
                    <span className="text-[7px]" style={{ color: '#1a1a40' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ background: '#080818', border: '1px solid #1a1a40' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#ff336680' }}>Channel Ratio</h3>
              <div className="space-y-3">
                {[
                  { name: 'Green/Red', pct: 75, color: '#00ff88' },
                  { name: 'Blue/Green', pct: 58, color: '#3388ff' },
                  { name: 'Red/Far-Red', pct: 42, color: '#ff3366' },
                  { name: 'Co-localization', pct: 30, color: '#ffcc00' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#334' }}><span>{p.name}</span><span style={{ color: p.color }}>{p.pct}%</span></div>
                    <div className="h-0.5" style={{ background: '#111' }}><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color, boxShadow: `0 0 4px ${p.color}40` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#080818', border: '1px solid #1a1a40' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#00ff8880' }}>Marker Registry</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#1a1a40' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #1a1a40' }}>{['Marker', 'Channel', 'Intensity', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#223' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'GFP', ch: 'FITC', int: '24,500 AU', status: 'Active' },
                  { id: 'mCherry', ch: 'TRITC', int: '18,900 AU', status: 'Active' },
                  { id: 'Hoechst', ch: 'DAPI', int: '43,200 AU', status: 'Bleached' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0a0a20' }}>
                    <td className="py-2.5 px-3 text-xs font-bold" style={{ color: '#00ff88' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#3388ff' }}>{row.ch}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0e0ff' }}>{row.int}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium px-1.5 py-0.5" style={{ border: `1px solid ${row.status === 'Active' ? '#00ff8830' : '#ff336630'}`, color: row.status === 'Active' ? '#00ff88' : '#ff3366' }}>{row.status}</span></td>
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