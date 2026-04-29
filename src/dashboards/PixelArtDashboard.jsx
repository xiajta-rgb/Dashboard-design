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

export default function PixelArtDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#1a1c2c', imageRendering: 'pixelated' }}>
      <style>{`
        @keyframes pixel-blink { 0%,100%{opacity:1} 50%{opacity:.5} }
      `}</style>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#262b44', borderRight: '4px solid #333c57' }}>
        <div className="px-2 mb-6">
          <h1 className="text-sm font-bold tracking-wider" style={{ color: '#f4f4f4', fontFamily: 'monospace' }}>&gt;PIXEL_</h1>
          <div className="mt-1 flex gap-0.5">
            {['#ef7d57','#ffcd75','#a7f070','#66c8ff'].map((c,i) => (
              <div key={i} className="w-3 h-3" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-2 py-2 text-xs font-bold cursor-pointer ${isActive ? 'text-[#1a1c2c]' : 'text-[#5d637a] hover:text-[#94b0c2]'}`}
                style={isActive ? { background: '#ef7d57', border: 'none' } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                <span style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>{item.label.toUpperCase()}</span>
              </button>
            )
          })}
        </div>
        <div className="px-2 pt-3" style={{ borderTop: '2px solid #333c57' }}>
          <p className="text-[9px] font-bold" style={{ color: '#5d637a', fontFamily: 'monospace' }}>v1.0.0</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#262b44', borderBottom: '4px solid #333c57' }}>
          <h2 className="text-sm font-bold" style={{ color: '#f4f4f4', fontFamily: 'monospace' }}>&gt; DASHBOARD</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3" style={{ color: '#5d637a' }} />
              <input type="text" placeholder="SEARCH..." className="pl-8 pr-3 py-1.5 text-[10px] font-bold uppercase focus:outline-none w-40" style={{ background: '#1a1c2c', border: '2px solid #333c57', color: '#94b0c2', fontFamily: 'monospace' }} />
            </div>
            <button className="p-1.5 cursor-pointer" style={{ background: '#1a1c2c', border: '2px solid #333c57', color: '#5d637a' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: 'GOLD', value: '48,295', change: '+12%', up: true, color: '#ffcd75' },
              { label: 'XP', value: '24,589', change: '+8%', up: true, color: '#a7f070' },
              { label: 'QUESTS', value: '1,847', change: '-2%', up: false, color: '#ef7d57' },
              { label: 'LEVEL', value: '3.42', change: '+5%', up: true, color: '#66c8ff' },
            ].map((kpi, i) => (
              <div key={i} className="p-3" style={{ background: '#262b44', border: '3px solid #333c57' }}>
                <p className="text-[9px] font-bold mb-1" style={{ color: kpi.color, fontFamily: 'monospace' }}>{kpi.label}</p>
                <p className="text-lg font-black mb-1" style={{ color: '#f4f4f4', fontFamily: 'monospace' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold ${kpi.up ? 'text-[#a7f070]' : 'text-[#ef7d57]'}`} style={{ fontFamily: 'monospace' }}>
                  {kpi.up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="col-span-2 p-4" style={{ background: '#262b44', border: '3px solid #333c57' }}>
              <h3 className="text-[10px] font-bold mb-3" style={{ color: '#94b0c2', fontFamily: 'monospace' }}>&gt; MONTHLY XP</h3>
              <div className="h-40 flex items-end justify-between gap-1">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{
                      height: `${h}%`,
                      background: i % 3 === 0 ? '#ef7d57' : i % 3 === 1 ? '#a7f070' : '#66c8ff',
                    }} />
                    <span className="text-[7px] font-bold" style={{ color: '#5d637a', fontFamily: 'monospace' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4" style={{ background: '#262b44', border: '3px solid #333c57' }}>
              <h3 className="text-[10px] font-bold mb-3" style={{ color: '#94b0c2', fontFamily: 'monospace' }}>&gt; SKILLS</h3>
              <div className="space-y-3">
                {[
                  { name: 'ATK', pct: 75, color: '#ef7d57' },
                  { name: 'DEF', pct: 58, color: '#66c8ff' },
                  { name: 'SPD', pct: 42, color: '#a7f070' },
                  { name: 'MAG', pct: 30, color: '#ffcd75' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[8px] font-bold mb-0.5" style={{ color: '#5d637a', fontFamily: 'monospace' }}>
                      <span>{p.name}</span><span>{p.pct}</span>
                    </div>
                    <div className="h-2" style={{ background: '#1a1c2c' }}>
                      <div className="h-full" style={{ width: `${p.pct}%`, background: p.color, imageRendering: 'pixelated' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4" style={{ background: '#262b44', border: '3px solid #333c57' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-bold" style={{ color: '#94b0c2', fontFamily: 'monospace' }}>&gt; INVENTORY</h3>
              <button className="flex items-center gap-1 text-[8px] font-bold cursor-pointer" style={{ color: '#5d637a', fontFamily: 'monospace' }}><Filter className="w-2.5 h-2.5" />FILTER</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '2px solid #333c57' }}>
                  {['ID', 'NAME', 'VALUE', 'STATUS'].map(h => (
                    <th key={h} className="py-1.5 px-2 text-left text-[8px] font-bold" style={{ color: '#5d637a', fontFamily: 'monospace' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#001', name: 'Iron Sword', value: '245g', status: 'EQUIPPED' },
                  { id: '#002', name: 'Health Pot', value: '189g', status: 'READY' },
                  { id: '#003', name: 'Magic Ring', value: '432g', status: 'EQUIPPED' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #333c57' }}>
                    <td className="py-2 px-2 text-[10px] font-bold" style={{ color: '#5d637a', fontFamily: 'monospace' }}>{row.id}</td>
                    <td className="py-2 px-2 text-[10px] font-bold" style={{ color: '#94b0c2', fontFamily: 'monospace' }}>{row.name}</td>
                    <td className="py-2 px-2 text-[10px] font-bold" style={{ color: '#ffcd75', fontFamily: 'monospace' }}>{row.value}</td>
                    <td className="py-2 px-2">
                      <span className="text-[8px] font-bold px-1.5 py-0.5" style={{
                        background: row.status === 'EQUIPPED' ? '#a7f07020' : '#66c8ff20',
                        color: row.status === 'EQUIPPED' ? '#a7f070' : '#66c8ff',
                        border: `1px solid ${row.status === 'EQUIPPED' ? '#a7f07040' : '#66c8ff40'}`,
                        fontFamily: 'monospace',
                      }}>{row.status}</span>
                    </td>
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