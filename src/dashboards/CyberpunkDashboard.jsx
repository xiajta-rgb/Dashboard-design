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

export default function CyberpunkDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0a0010' }}>
      <style>{`
        @keyframes cyber-flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:.3} 94%{opacity:1} 96%{opacity:.5} 97%{opacity:1} }
        @keyframes cyber-scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
      `}</style>
      <aside className="w-56 flex-shrink-0 py-6 px-3 flex flex-col" style={{
        background: 'linear-gradient(180deg, #0f0018 0%, #0a0010 100%)',
        borderRight: '1px solid #ff003c40',
        boxShadow: 'inset -1px 0 0 #00f0ff20',
      }}>
        <div className="px-3 mb-8">
          <h1 className="text-lg font-black tracking-[0.2em]" style={{ color: '#ff003c', textShadow: '0 0 10px #ff003c80, 0 0 30px #ff003c40', animation: 'cyber-flicker 3s infinite' }}>CYBR</h1>
          <div className="mt-1 h-px" style={{ background: 'linear-gradient(90deg, #ff003c, #00f0ff, transparent)' }} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold cursor-pointer ${isActive ? '' : ''}`}
                style={isActive ? {
                  background: 'linear-gradient(90deg, rgba(255,0,60,0.15), transparent)',
                  borderLeft: '2px solid #ff003c',
                  color: '#ff003c',
                  textShadow: '0 0 8px #ff003c60',
                } : {
                  color: '#4a4060',
                  borderLeft: '2px solid transparent',
                }}
              >
                <Icon className="w-4 h-4" />
                <span style={{ letterSpacing: '0.1em' }}>{item.label.toUpperCase()}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.03 }}>
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #ff003c 2px, #ff003c 3px)',
            animation: 'cyber-scan 8s linear infinite',
          }} />
        </div>

        <header className="relative flex items-center justify-between px-8 py-4" style={{
          background: 'rgba(10,0,16,0.9)',
          borderBottom: '1px solid #ff003c30',
          boxShadow: '0 2px 20px rgba(255,0,60,0.1)',
        }}>
          <h2 className="text-lg font-black tracking-[0.15em]" style={{ color: '#00f0ff', textShadow: '0 0 10px #00f0ff60' }}>NET_DASHBOARD</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#ff003c60' }} />
              <input type="text" placeholder="SEARCH_NET..." className="pl-10 pr-4 py-2 text-xs font-bold uppercase focus:outline-none w-52" style={{ background: '#0f0018', border: '1px solid #ff003c40', color: '#00f0ff', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }} />
            </div>
            <button className="p-2.5 cursor-pointer" style={{ background: '#0f0018', border: '1px solid #ff003c40', color: '#ff003c', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="relative p-8">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'CREDITS', value: '₵48,295', change: '+12.5%', up: true },
              { label: 'NETRUNNERS', value: '24,589', change: '+8.2%', up: true },
              { label: 'BREACHES', value: '1,847', change: '-2.4%', up: false },
              { label: 'OVERCLOCK', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{
                background: 'linear-gradient(135deg, #0f0018 0%, #150020 100%)',
                border: '1px solid #ff003c30',
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                boxShadow: '0 0 15px rgba(255,0,60,0.08), inset 0 0 15px rgba(0,240,255,0.03)',
              }}>
                <p className="text-[10px] font-black mb-1 tracking-[0.15em]" style={{ color: '#ff003c' }}>{kpi.label}</p>
                <p className="text-xl font-black mb-2" style={{ color: '#00f0ff', textShadow: '0 0 8px #00f0ff40' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${kpi.up ? 'text-[#00ff88]' : 'text-[#ff003c]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0f0018', border: '1px solid #ff003c25', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
              <h3 className="text-[10px] font-black mb-4 tracking-[0.2em]" style={{ color: '#00f0ff', textShadow: '0 0 6px #00f0ff40' }}>CREDIT_FLOW</h3>
              <div className="h-44 flex items-end justify-between gap-1">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{
                      height: `${h}%`,
                      background: i % 2 === 0 ? '#ff003c' : '#00f0ff',
                      boxShadow: `0 0 8px ${i % 2 === 0 ? '#ff003c40' : '#00f0ff40'}`,
                    }} />
                    <span className="text-[7px] font-bold" style={{ color: '#4a4060' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5" style={{ background: '#0f0018', border: '1px solid #ff003c25', clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
              <h3 className="text-[10px] font-black mb-4 tracking-[0.2em]" style={{ color: '#ff003c' }}>FACTIONS</h3>
              <div className="space-y-3">
                {[
                  { name: 'MILITECH', pct: 75, color: '#ff003c' },
                  { name: 'ARASAKA', pct: 58, color: '#00f0ff' },
                  { name: 'KANG_TAO', pct: 42, color: '#ff003c' },
                  { name: 'BIOTECH', pct: 30, color: '#00f0ff' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] font-black mb-1" style={{ color: '#4a4060', letterSpacing: '0.1em' }}>
                      <span>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-1" style={{ background: '#1a0020' }}>
                      <div className="h-full" style={{ width: `${p.pct}%`, background: p.color, boxShadow: `0 0 6px ${p.color}40` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0f0018', border: '1px solid #ff003c25', clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black tracking-[0.2em]" style={{ color: '#00f0ff' }}>RECENT_BREACHES</h3>
              <button className="flex items-center gap-1 text-[9px] font-bold cursor-pointer" style={{ color: '#ff003c' }}><Filter className="w-3 h-3" />FILTER</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #ff003c20' }}>
                  {['ID', 'RUNNER', 'CREDITS', 'STATUS'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-[9px] font-black tracking-[0.15em]" style={{ color: '#4a4060' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#NX-3210', name: 'V', amount: '₵245K', status: 'BREACHED' },
                  { id: '#NX-3209', name: 'Judy', amount: '₵189K', status: 'PENDING' },
                  { id: '#NX-3208', name: 'Panam', amount: '₵432K', status: 'BREACHED' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #ff003c10' }}>
                    <td className="py-3 px-3 text-sm font-bold" style={{ color: '#ff003c' }}>{row.id}</td>
                    <td className="py-3 px-3 text-sm font-bold" style={{ color: '#00f0ff' }}>{row.name}</td>
                    <td className="py-3 px-3 text-sm font-black" style={{ color: '#fff' }}>{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-[9px] font-black px-2 py-0.5" style={{
                        background: row.status === 'BREACHED' ? '#ff003c15' : '#00f0ff10',
                        color: row.status === 'BREACHED' ? '#ff003c' : '#00f0ff',
                        border: `1px solid ${row.status === 'BREACHED' ? '#ff003c30' : '#00f0ff25'}`,
                        letterSpacing: '0.1em',
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