import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Filter,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function Y2KDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0a0020' }}>
      <style>{`
        @keyframes y2k-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes y2k-glow { 0%,100%{box-shadow:0 0 10px #ff00ff40} 50%{box-shadow:0 0 25px #00ffff60} }
      `}</style>
      <aside className="w-56 flex-shrink-0 py-6 px-4 flex flex-col" style={{
        background: 'linear-gradient(180deg, #1a0040 0%, #100030 100%)',
        borderRight: '2px solid',
        borderImage: 'linear-gradient(180deg, #ff00ff, #00ffff) 1',
      }}>
        <div className="mb-8 px-2">
          <h1 className="text-xl font-black tracking-wider" style={{
            background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff66ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            textShadow: '0 0 20px #ff00ff80',
          }}>Y2K</h1>
          <div className="mt-1 h-0.5" style={{ background: 'linear-gradient(90deg, #ff00ff, transparent)' }} />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold cursor-pointer ${isActive ? '' : ''}`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(255,0,255,0.15), rgba(0,255,255,0.15))',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,0,255,0.3)',
                  color: '#fff',
                  animation: 'y2k-glow 2s ease-in-out infinite',
                } : {
                  color: 'rgba(255,255,255,0.5)',
                  borderRadius: '12px',
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '1px solid rgba(255,0,255,0.2)' }}>
          <h2 className="text-lg font-black" style={{
            background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>DASHBOARD 2000</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/w-4 h-4 text-[#ff00ff]/50" />
              <input type="text" placeholder="SEARCH..." className="pl-10 pr-4 py-2.5 text-xs font-bold uppercase focus:outline-none w-52" style={{
                background: 'rgba(255,0,255,0.05)',
                border: '1px solid rgba(255,0,255,0.3)',
                color: '#fff',
                borderRadius: '20px',
              }} />
            </div>
            <button className="p-2.5 cursor-pointer" style={{
              background: 'linear-gradient(135deg, #ff00ff30, #00ffff20)',
              borderRadius: '12px',
              border: '1px solid rgba(255,0,255,0.3)',
            }}><Bell className="w-4 h-4" style={{ color: '#00ffff' }} /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-5 mb-8">
            {[
              { label: 'REVENUE', value: '$48,295', change: '+12.5%', up: true },
              { label: 'USERS', value: '24,589', change: '+8.2%', up: true },
              { label: 'ORDERS', value: '1,847', change: '-2.4%', up: false },
              { label: 'GROWTH', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-5" style={{
                background: 'linear-gradient(135deg, rgba(255,0,255,0.08), rgba(0,255,255,0.06))',
                borderRadius: '24px',
                border: '1px solid rgba(255,0,255,0.25)',
                boxShadow: '0 0 20px rgba(255,0,255,0.1), inset 0 0 20px rgba(0,255,255,0.03)',
              }}>
                <p className="text-[10px] font-black mb-2 tracking-wider" style={{ color: '#ff66ff' }}>{kpi.label}</p>
                <p className="text-xl font-black mb-2" style={{ color: '#fff' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${kpi.up ? 'text-[#00ffcc]' : 'text-[#ff3399]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="col-span-2 p-6" style={{
              background: 'rgba(255,0,255,0.04)',
              borderRadius: '24px',
              border: '1px solid rgba(255,0,255,0.2)',
            }}>
              <h3 className="text-xs font-black mb-4 tracking-wider" style={{ color: '#00ffff' }}>MONTHLY REVENUE</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-full" style={{
                      height: `${h}%`,
                      background: `linear-gradient(180deg, ${i % 2 === 0 ? '#ff00ff' : '#00ffff'} 0%, ${i % 2 === 0 ? '#ff00ff40' : '#00ffff40'} 100%)`,
                      boxShadow: `0 0 10px ${i % 2 === 0 ? '#ff00ff40' : '#00ffff40'}`,
                      borderRadius: '8px 8px 4px 4px',
                    }} />
                    <span className="text-[8px] font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{
              background: 'rgba(0,255,255,0.04)',
              borderRadius: '24px',
              border: '1px solid rgba(0,255,255,0.2)',
            }}>
              <h3 className="text-xs font-black mb-4 tracking-wider" style={{ color: '#ff66ff' }}>CATEGORIES</h3>
              <div className="space-y-4">
                {['ELECTRONICS', 'FASHION', 'FOOD', 'BOOKS'].map((cat, i) => {
                  const widths = [75, 58, 42, 30]
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        <span>{cat}</span><span>{widths[i]}%</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,0,255,0.1)', borderRadius: '10px' }}>
                        <div className="h-full rounded-full" style={{
                          width: `${widths[i]}%`,
                          background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
                          borderRadius: '10px',
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="p-6" style={{
            background: 'rgba(255,0,255,0.04)',
            borderRadius: '24px',
            border: '1px solid rgba(255,0,255,0.2)',
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black tracking-wider" style={{ color: '#00ffff' }}>RECENT ORDERS</h3>
              <button className="flex items-center gap-1 text-[10px] font-bold cursor-pointer" style={{ color: '#ff66ff' }}><Filter className="w-3 h-3" />FILTER</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,0,255,0.15)' }}>
                  {['ORDER ID', 'CUSTOMER', 'AMOUNT', 'STATUS'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-[10px] font-black tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#Y2K-001', name: 'CyberGirl', amount: '$245', status: 'ACTIVE' },
                  { id: '#Y2K-002', name: 'PixelQueen', amount: '$189', status: 'PENDING' },
                  { id: '#Y2K-003', name: 'GlowBoy', amount: '$432', status: 'ACTIVE' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,0,255,0.06)' }}>
                    <td className="py-3 px-3 text-sm font-bold" style={{ color: '#ff66ff' }}>{row.id}</td>
                    <td className="py-3 px-3 text-sm font-bold" style={{ color: '#00ffff' }}>{row.name}</td>
                    <td className="py-3 px-3 text-sm font-black" style={{ color: '#fff' }}>{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-black px-2.5 py-1" style={{
                        borderRadius: '20px',
                        background: row.status === 'ACTIVE' ? 'rgba(0,255,204,0.15)' : 'rgba(255,51,153,0.15)',
                        color: row.status === 'ACTIVE' ? '#00ffcc' : '#ff3399',
                        border: row.status === 'ACTIVE' ? '1px solid rgba(0,255,204,0.3)' : '1px solid rgba(255,51,153,0.3)',
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