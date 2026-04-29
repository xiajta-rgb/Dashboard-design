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

const atomColors = ['#ff4444', '#4488ff', '#44ff88', '#ffaa44', '#aa44ff']

export default function CrystalLatticeDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedAtom, setSelectedAtom] = useState(null)

  const latticePoints = []
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 3; y++) {
      for (let z = 0; z < 2; z++) {
        latticePoints.push({
          x: 80 + x * 120,
          y: 60 + y * 80,
          z: z,
          type: (x + y + z) % 5,
          id: `${x}${y}${z}`
        })
      }
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0a0e1a' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0d1220', borderRight: '1px solid #1a2540' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#ff4444' }}>CRYSTAL</h1>
          <svg width="50" height="20" viewBox="0 0 50 20" className="mt-1">
            {atomColors.map((c, i) => <circle key={i} cx={i * 12 + 5} cy="10" r="3" fill={c} />)}
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#ff4444]' : 'text-[#2a3550] hover:text-[#4a8eff80]'}`}
                style={isActive ? { background: '#ff444408', borderLeft: '2px solid #ff4444' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
        <div className="px-3 mt-4 pt-4" style={{ borderTop: '1px solid #1a2540' }}>
          <p className="text-[9px] mb-2 uppercase tracking-wider" style={{ color: '#2a3550' }}>Atom Types</p>
          {atomColors.map((c, i) => (
            <button key={i} onClick={() => setSelectedAtom(selectedAtom === i ? null : i)} className={`w-full text-left text-xs px-2 py-1 mb-1 rounded flex items-center gap-2 ${selectedAtom === i ? 'bg-white/5 font-medium' : 'text-[#2a3550]'}`}>
              <div className="w-2 h-2 rounded-full" style={{ background: c }} />Type {['Au', 'Fe', 'Ti', 'Cu', 'Ag'][i]}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0d1220', borderBottom: '1px solid #1a2540' }}>
          <h2 className="text-sm font-bold" style={{ color: '#ff4444' }}>Crystal Lattice Structure</h2>
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
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#44ff88]' : 'text-[#ff4444]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0d1220', border: '1px solid #1a2540' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#2a3550' }}>3D Lattice Visualization</h3>
              <svg viewBox="0 0 500 280" className="w-full h-56">
                <defs>
                  <filter id="atom-glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                {latticePoints.map((p, i) => {
                  const next = latticePoints[i + 1]
                  const below = latticePoints[i + 8]
                  return (
                    <g key={i}>
                      {next && next.z === p.z && <line x1={p.x} y1={p.y} x2={next.x} y2={next.y} stroke="#1a2540" strokeWidth="0.5" />}
                      {below && <line x1={p.x} y1={p.y} x2={below.x} y2={below.y} stroke="#1a2540" strokeWidth="0.5" strokeDasharray="2,2" />}
                      <circle cx={p.x} cy={p.y} r={6 + p.z * 2} fill={atomColors[p.type]} opacity={0.6 + p.z * 0.4} filter="url(#atom-glow)" />
                      <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="6" fill="#fff">{['Au', 'Fe', 'Ti', 'Cu', 'Ag'][p.type]}</text>
                    </g>
                  )
                })}
              </svg>
            </div>
            <div className="p-5" style={{ background: '#0d1220', border: '1px solid #1a2540' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#2a3550' }}>Phase Composition</h3>
              <div className="space-y-4">
                {[
                  { name: 'FCC', pct: 75, color: '#ff4444' },
                  { name: 'BCC', pct: 15, color: '#4488ff' },
                  { name: 'HCP', pct: 8, color: '#44ff88' },
                  { name: 'Amorphous', pct: 2, color: '#ffaa44' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#2a3550' }}><span>{p.name}</span><span style={{ color: p.color }}>{p.pct}%</span></div>
                    <div className="h-1" style={{ background: '#0a0e1a' }}><div className="h-1" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #1a2540' }}>
                <h3 className="text-[10px] mb-3 uppercase tracking-wider" style={{ color: '#2a3550' }}>Energy Bands</h3>
                <div className="h-20 flex items-end justify-between gap-0.5">
                  {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88].map((h, i) => (
                    <div key={i} className="flex-1" style={{ height: `${h}%`, background: atomColors[i % atomColors.length], opacity: 0.7 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0d1220', border: '1px solid #1a2540' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#2a3550' }}>Structure Registry</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#1a2540' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #1a2540' }}>{['ID', 'Structure', 'Space Group', 'Atoms', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#1a2540' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'STR-001', name: 'Au (FCC)', group: 'Fm-3m', atoms: '4', status: 'Stable' },
                  { id: 'STR-002', name: 'Fe (BCC)', group: 'Im-3m', atoms: '2', status: 'Stable' },
                  { id: 'STR-003', name: 'Ti (HCP)', group: 'P6₃/mmc', atoms: '6', status: 'Metastable' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0f1525' }}>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#4a8eff' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0e8ff' }}>{row.name}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#8ab4ff' }}>{row.group}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#2a3550' }}>{row.atoms}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium px-1.5 py-0.5" style={{ border: `1px solid ${row.status === 'Stable' ? '#44ff8830' : '#ffaa4430'}`, color: row.status === 'Stable' ? '#44ff88' : '#ffaa44' }}>{row.status}</span></td>
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
