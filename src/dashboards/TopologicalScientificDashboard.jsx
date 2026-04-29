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

export default function TopologicalScientificDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#fafafa' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col bg-white" style={{ borderRight: '1px solid #ddd' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#333' }}>TOPOLOGY</h1>
          <svg width="40" height="12" className="mt-1"><line x1="0" y1="6" x2="40" y2="6" stroke="#333" strokeWidth="0.5" /><circle cx="0" cy="6" r="2" fill="#333" /><circle cx="20" cy="6" r="2" fill="#666" /><circle cx="40" cy="6" r="2" fill="#333" /></svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#333] font-semibold' : 'text-[#999] hover:text-[#666]'}`}
                style={isActive ? { borderLeft: '2px solid #333' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3 bg-white" style={{ borderBottom: '1px solid #ddd' }}>
          <h2 className="text-sm font-bold text-[#333]">Network Topology</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#bbb]" /><input type="text" placeholder="Search nodes..." className="pl-8 pr-3 py-1.5 text-xs bg-[#fafafa] border border-[#ddd] text-[#333] focus:outline-none w-36" /></div>
            <button className="p-1.5 text-[#999] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Nodes', value: '2,482', change: '+5.3%', up: true },
              { label: 'Edges', value: '5,891', change: '+8.1%', up: true },
              { label: 'Clusters', value: '47', change: '-2', up: false },
              { label: 'Modularity', value: '0.842', change: '+0.03', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4 bg-white" style={{ border: '1px solid #ddd' }}>
                <p className="text-[9px] text-[#999] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-lg font-bold text-[#333] mb-1">{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#2d8a4e]' : 'text-[#c44040]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5 bg-white" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#999] mb-4 uppercase tracking-wider">Degree Distribution</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {[95,72,55,40,30,22,16,12,8,5,3,2].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: '#333', opacity: 0.6 + (i * 0.03) }} />
                    <span className="text-[7px] text-[#bbb]">{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#999] mb-4 uppercase tracking-wider">Network Metrics</h3>
              <div className="space-y-3">
                {[
                  { name: 'Betweenness', pct: 82, color: '#333' },
                  { name: 'Closeness', pct: 65, color: '#666' },
                  { name: 'Eigenvector', pct: 48, color: '#999' },
                  { name: 'PageRank', pct: 35, color: '#bbb' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] text-[#999] mb-0.5"><span>{p.name}</span><span>{p.pct}%</span></div>
                    <div className="h-0.5 bg-[#eee]"><div className="h-0.5" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 bg-white" style={{ border: '1px solid #ddd' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#999] uppercase tracking-wider">Node Registry</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#999] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #eee' }}>{['ID', 'Label', 'Degree', 'Cluster'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#999] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'N-001', name: 'Alpha Hub', degree: '24', cluster: 'C1' },
                  { id: 'N-002', name: 'Beta Bridge', degree: '18', cluster: 'C2' },
                  { id: 'N-003', name: 'Gamma Leaf', degree: '6', cluster: 'C1' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td className="py-2.5 px-3 text-xs text-[#666]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#333]">{row.name}</td>
                    <td className="py-2.5 px-3 text-xs font-semibold text-[#333]">{row.degree}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium px-1.5 py-0.5" style={{ border: '1px solid #ddd', color: '#666' }}>{row.cluster}</span></td>
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