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

  const processFlow = [
    { stage: 'Input', value: 100, desc: 'Raw signal acquisition' },
    { stage: 'Filter', value: 85, desc: 'Noise reduction' },
    { stage: 'Amplify', value: 72, desc: 'Signal amplification' },
    { stage: 'Convert', value: 65, desc: 'A/D conversion' },
    { stage: 'Process', value: 58, desc: 'Digital processing' },
    { stage: 'Output', value: 45, desc: 'Final output' },
  ]

  const components = [
    { id: 'C-01', type: 'Receptor', io: '2→1', state: 'Active', efficiency: 98 },
    { id: 'C-02', type: 'Transducer', io: '1→3', state: 'Active', efficiency: 94 },
    { id: 'C-03', type: 'Amplifier', io: '1→2', state: 'Active', efficiency: 91 },
    { id: 'C-04', type: 'Converter', io: '2→4', state: 'Idle', efficiency: 87 },
    { id: 'C-05', type: 'Processor', io: '4→1', state: 'Active', efficiency: 96 },
  ]

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex bg-white">
      <aside className="w-48 flex-shrink-0 py-6 px-2 flex flex-col" style={{ borderRight: '1px solid #eee' }}>
        <div className="px-3 mb-8">
          <svg width="60" height="30" viewBox="0 0 60 30">
            <rect x="5" y="5" width="20" height="20" fill="none" stroke="#333" strokeWidth="1" />
            <line x1="25" y1="15" x2="35" y2="15" stroke="#333" strokeWidth="1" />
            <circle cx="45" cy="15" r="10" fill="none" stroke="#333" strokeWidth="1" />
          </svg>
          <p className="text-[8px] text-[#ccc] mt-2 tracking-wider">SCHEMATIC</p>
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
          <h2 className="text-sm font-medium text-[#333]">System Architecture</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#ccc]" /><input type="text" placeholder="Search" className="pl-8 pr-3 py-1.5 text-xs bg-transparent border-b border-[#eee] text-[#333] focus:outline-none w-32" /></div>
            <button className="p-1 text-[#ccc] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-8">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-8 mb-10">
            {[
              { label: 'Components', value: '48' },
              { label: 'Connections', value: '95' },
              { label: 'Layers', value: '6' },
              { label: 'Feedback Loops', value: '3' },
            ].map((kpi, i) => (
              <div key={i}>
                <p className="text-[9px] text-[#ccc] mb-2 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-2xl font-light text-[#333]">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Process Flow Diagram */}
          <div className="mb-10" style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
            <h3 className="text-[9px] text-[#ccc] mb-6 uppercase tracking-wider">Signal Processing Flow</h3>
            <div className="flex items-center gap-4">
              {processFlow.map((stage, i) => (
                <div key={i} className="flex-1">
                  <div className="p-3 border" style={{ borderColor: '#eee' }}>
                    <p className="text-xs font-medium text-[#333]">{stage.stage}</p>
                    <p className="text-[8px] text-[#999] mt-1">{stage.desc}</p>
                    <div className="mt-2 h-1 bg-[#f5f5f5]">
                      <div className="h-1 bg-[#333]" style={{ width: `${stage.value}%` }} />
                    </div>
                    <p className="text-[8px] text-[#666] mt-1">{stage.value}%</p>
                  </div>
                  {i < processFlow.length - 1 && (
                    <div className="absolute" style={{ right: '-16px', top: '50%' }}>
                      <svg width="12" height="12"><path d="M2,6 L10,6 M7,3 L10,6 L7,9" fill="none" stroke="#ccc" strokeWidth="1" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="grid grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-[9px] text-[#ccc] mb-4 uppercase tracking-wider">System Block Diagram</h3>
              <svg width="100%" height="140" viewBox="0 0 400 140">
                <rect x="10" y="50" width="60" height="40" fill="none" stroke="#333" strokeWidth="1" />
                <text x="40" y="74" textAnchor="middle" fontSize="8" fill="#666">Sensor</text>
                <line x1="70" y1="70" x2="110" y2="70" stroke="#333" strokeWidth="1" />
                <path d="M107,67 L110,70 L107,73" fill="none" stroke="#333" strokeWidth="1" />
                
                <rect x="110" y="30" width="60" height="40" fill="none" stroke="#333" strokeWidth="1" />
                <text x="140" y="54" textAnchor="middle" fontSize="8" fill="#666">Filter</text>
                <rect x="110" y="90" width="60" height="40" fill="none" stroke="#333" strokeWidth="1" />
                <text x="140" y="114" textAnchor="middle" fontSize="8" fill="#666">Amp</text>
                
                <line x1="170" y1="50" x2="210" y2="70" stroke="#333" strokeWidth="1" />
                <line x1="170" y1="110" x2="210" y2="70" stroke="#333" strokeWidth="1" />
                
                <circle cx="240" cy="70" r="25" fill="none" stroke="#333" strokeWidth="1" />
                <text x="240" y="74" textAnchor="middle" fontSize="8" fill="#666">ADC</text>
                
                <line x1="265" y1="70" x2="305" y2="70" stroke="#333" strokeWidth="1" />
                <path d="M302,67 L305,70 L302,73" fill="none" stroke="#333" strokeWidth="1" />
                
                <polygon points="305,50 360,70 305,90" fill="none" stroke="#333" strokeWidth="1" />
                <text x="330" y="74" textAnchor="middle" fontSize="8" fill="#666">DSP</text>
              </svg>
            </div>
            <div>
              <h3 className="text-[9px] text-[#ccc] mb-4 uppercase tracking-wider">Component Efficiency</h3>
              <div className="space-y-4">
                {components.map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] text-[#666] mb-1">
                      <span>{c.id} - {c.type}</span>
                      <span>{c.efficiency}%</span>
                    </div>
                    <div className="h-1 bg-[#f5f5f5]">
                      <div className="h-1 bg-[#333]" style={{ width: `${c.efficiency}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Component Table */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
            <h3 className="text-[9px] text-[#ccc] mb-4 uppercase tracking-wider">Component Registry</h3>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #eee' }}>{['ID', 'Type', 'I/O', 'State', 'Efficiency'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#ccc] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {components.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td className="py-2.5 px-3 text-xs text-[#999]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#333]">{row.type}</td>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#666]">{row.io}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] ${row.state === 'Active' ? 'text-[#333] font-medium' : 'text-[#ccc]'}`}>{row.state}</span></td>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#666]">{row.efficiency}%</td>
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
