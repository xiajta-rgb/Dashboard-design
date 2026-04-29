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



export default function MagazineLayoutDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#faf8f5' }}>
      <aside className="w-56 flex-shrink-0 py-8 px-4 flex flex-col" style={{ background: '#faf8f5', borderRight: '1px solid #e8e2d8' }}>
        <div className="px-2 mb-10">
          <h1 className="text-2xl font-black tracking-tight" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Éditorial</h1>
          <div className="mt-2 h-0.5 w-12" style={{ background: '#1a1a1a' }} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer ${isActive ? 'font-bold text-[#1a1a1a]' : 'font-normal text-[#999] hover:text-[#666]'}`}
                style={isActive ? { borderLeft: '3px solid #1a1a1a' } : { borderLeft: '3px solid transparent' }}
              >
                <Icon className="w-4 h-4" />
                <span style={{ letterSpacing: '0.02em' }}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-10 py-5" style={{ borderBottom: '3px solid #1a1a1a' }}>
          <h2 className="text-3xl font-black" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Overview</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]" />
              <input type="text" placeholder="Search stories..." className="pl-10 pr-4 py-2 text-sm focus:outline-none w-48" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #ccc', color: '#1a1a1a' }} />
            </div>
            <button className="p-2 text-[#999] cursor-pointer"><Bell className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="p-10">
          <div className="mb-10" style={{ borderBottom: '1px solid #e8e2d8', paddingBottom: '2rem' }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#c4a35a' }}>Featured</p>
            <h3 className="text-4xl font-black mb-3" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>Revenue Surges<br/>Past Expectations</h3>
            <p className="text-sm" style={{ color: '#666', maxWidth: '500px', lineHeight: 1.7 }}>The latest quarterly figures reveal a remarkable uptick across all major segments, driven by strong consumer demand and strategic market expansion.</p>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-10">
            {[
              { label: 'Revenue', value: '$48,295', change: '+12.5%', up: true },
              { label: 'Readers', value: '24,589', change: '+8.2%', up: true },
              { label: 'Stories', value: '1,847', change: '-2.4%', up: false },
            ].map((kpi, i) => (
              <div key={i} style={{ borderLeft: i === 0 ? '4px solid #1a1a1a' : '1px solid #e8e2d8', paddingLeft: '1.5rem' }}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#999' }}>{kpi.label}</p>
                <p className="text-3xl font-black mb-1" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-sm font-bold ${kpi.up ? 'text-[#2d8a4e]' : 'text-[#c44040]'}`}>
                  {kpi.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="mb-10" style={{ borderTop: '3px solid #1a1a1a', paddingTop: '2rem' }}>
            <h3 className="text-lg font-black mb-6" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Monthly Performance</h3>
            <div className="h-48 flex items-end justify-between gap-2">
              {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full" style={{
                    height: `${h}%`,
                    background: i === 11 ? '#1a1a1a' : '#e8e2d8',
                  }} />
                  <span className="text-[9px] font-bold uppercase" style={{ color: '#999' }}>{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e8e2d8', paddingTop: '2rem' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black" style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Latest Stories</h3>
              <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer" style={{ color: '#999' }}><Filter className="w-3 h-3" />Filter</button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { id: '01', title: 'The Rise of Digital Commerce', desc: 'How online platforms are reshaping consumer behavior and market dynamics.', status: 'Published' },
                { id: '02', title: 'Behind the Numbers', desc: 'A deep dive into the analytics driving this quarter\'s performance metrics.', status: 'Draft' },
                { id: '03', title: 'Global Market Outlook', desc: 'Regional trends and forecasts that are shaping investment strategies.', status: 'Published' },
                { id: '04', title: 'Innovation Index', desc: 'Tracking the latest developments in technology and their market impact.', status: 'Review' },
              ].map((row, i) => (
                <div key={i} className="flex gap-4 py-4" style={{ borderBottom: '1px solid #e8e2d8' }}>
                  <span className="text-3xl font-black" style={{ color: '#e8e2d8', fontFamily: 'Georgia, serif', lineHeight: 1 }}>{row.id}</span>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold mb-1" style={{ color: '#1a1a1a' }}>{row.title}</h4>
                    <p className="text-xs mb-2" style={{ color: '#999', lineHeight: 1.5 }}>{row.desc}</p>
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${row.status === 'Published' ? 'text-[#2d8a4e]' : row.status === 'Draft' ? 'text-[#c4a35a]' : 'text-[#666]'}`}>{row.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}