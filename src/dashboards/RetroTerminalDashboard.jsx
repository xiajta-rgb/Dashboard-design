import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Terminal,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData } from '../data/mockData'

const sidebarItems = [
  { key: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { key: 'analytics', label: 'Analytics', Icon: BarChart3 },
  { key: 'products', label: 'Products', Icon: Package },
  { key: 'orders', label: 'Orders', Icon: ShoppingCart },
  { key: 'messages', label: 'Messages', Icon: MessageSquare },
  { key: 'settings', label: 'Settings', Icon: Settings },
]

const GREEN = '#33FF33'
const DIM_GREEN = '#1A9A1A'
const VERY_DIM = '#0D4D0D'
const BG = '#0A0A0A'

export default function RetroTerminalDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", background: BG }}>
      {/* CRT scanline effect */}
      <div className="absolute inset-0 pointer-events-none z-50" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(51,255,51,0.03) 2px, rgba(51,255,51,0.03) 4px)',
      }} />

      {/* CRT vignette */}
      <div className="absolute inset-0 pointer-events-none z-40" style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
      }} />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top bar */}
        <nav className="h-12 flex items-center justify-between px-6 border-b shrink-0" style={{ borderColor: VERY_DIM }}>
          <div className="flex items-center gap-4">
            <Terminal size={16} color={GREEN} />
            <span className="text-sm font-bold tracking-widest" style={{ color: GREEN, textShadow: `0 0 8px ${GREEN}` }}>
              TERMINAL v3.2.1
            </span>
            <span className="text-xs" style={{ color: DIM_GREEN }}>
              [session #{Math.floor(Math.random() * 9000 + 1000)}]
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: DIM_GREEN }}>
              {new Date().toISOString().slice(0, 19).replace('T', ' ')}
            </span>
            <div className="flex items-center gap-2 px-3 py-1 border" style={{ borderColor: VERY_DIM }}>
              <Search size={12} color={DIM_GREEN} />
              <input type="text" placeholder="query..." className="text-xs border-none outline-none bg-transparent w-32" style={{ color: GREEN }} />
            </div>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-48 flex-shrink-0 border-r py-4 px-3 flex flex-col" style={{ borderColor: VERY_DIM }}>
            <div className="flex flex-col gap-1 flex-1">
              {sidebarItems.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveNav(key)}
                  className="flex items-center gap-3 px-3 py-2 text-sm transition-all duration-150 cursor-pointer"
                  style={{
                    color: activeNav === key ? GREEN : DIM_GREEN,
                    textShadow: activeNav === key ? `0 0 6px ${GREEN}` : 'none',
                    background: activeNav === key ? 'rgba(51,255,51,0.05)' : 'transparent',
                  }}
                >
                  <Icon size={14} />
                  <span>{label.toUpperCase()}</span>
                  {activeNav === key && <span style={{ marginLeft: 'auto' }}>{'>'}</span>}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t" style={{ borderColor: VERY_DIM }}>
              <div className="text-[10px]" style={{ color: DIM_GREEN }}>
                <div>MEM: 4096MB OK</div>
                <div>DISK: 2.4TB / 4.0TB</div>
                <div>UPTIME: 99.97%</div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h1 className="text-lg font-bold tracking-wider" style={{ color: GREEN, textShadow: `0 0 10px ${GREEN}` }}>
                DASHBOARD OVERVIEW
              </h1>
              <p className="text-xs mt-1" style={{ color: DIM_GREEN }}>
                System status: ALL SYSTEMS OPERATIONAL
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
              {kpiData.slice(0, 4).map((kpi) => (
                <div
                  key={kpi.title}
                  className="p-5 border transition-all duration-150 cursor-default"
                  style={{ borderColor: VERY_DIM }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = DIM_GREEN }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = VERY_DIM }}
                >
                  <p className="text-[10px] mb-2 tracking-widest" style={{ color: DIM_GREEN }}>
                    {kpi.title.toUpperCase()}
                  </p>
                  <p className="text-2xl font-bold tracking-wider" style={{ color: GREEN, textShadow: `0 0 8px ${GREEN}80` }}>
                    {kpi.value}
                  </p>
                  <p className="text-xs mt-2" style={{ color: kpi.trend === 'up' ? GREEN : '#FF3333', textShadow: `0 0 4px ${kpi.trend === 'up' ? GREEN : '#FF3333'}` }}>
                    {kpi.trend === 'up' ? '[+]' : '[-]'} {kpi.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 border" style={{ borderColor: VERY_DIM }}>
                <h3 className="text-xs font-bold mb-4 tracking-wider" style={{ color: GREEN }}>REVENUE_STREAM</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="2 4" stroke={VERY_DIM} />
                    <XAxis dataKey="name" tick={{ fill: DIM_GREEN, fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }} axisLine={{ stroke: VERY_DIM }} tickLine={false} />
                    <YAxis tick={{ fill: DIM_GREEN, fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: BG, border: `1px solid ${VERY_DIM}`, fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }} />
                    <Line type="monotone" dataKey="revenue" stroke={GREEN} strokeWidth={1.5} dot={false} name="REV" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="p-5 border" style={{ borderColor: VERY_DIM }}>
                <h3 className="text-xs font-bold mb-4 tracking-wider" style={{ color: GREEN }}>WEEKLY_LOAD</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="2 4" stroke={VERY_DIM} />
                    <XAxis dataKey="name" tick={{ fill: DIM_GREEN, fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }} axisLine={{ stroke: VERY_DIM }} tickLine={false} />
                    <YAxis tick={{ fill: DIM_GREEN, fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: BG, border: `1px solid ${VERY_DIM}`, fontFamily: "'JetBrains Mono', monospace", fontSize: '10px' }} />
                    <Bar dataKey="value" fill={GREEN} barSize={24} name="LOAD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table */}
            <div className="p-5 border" style={{ borderColor: VERY_DIM }}>
              <h3 className="text-xs font-bold mb-4 tracking-wider" style={{ color: GREEN }}>NODE_REGISTRY</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: VERY_DIM }}>
                    {['NODE', 'EMAIL', 'ROLE', 'STATUS', 'LAST_SYNC'].map(h => (
                      <th key={h} className="text-left px-4 py-2 text-[10px] font-bold tracking-widest" style={{ color: DIM_GREEN }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-green-900/5 transition-colors duration-150" style={{ borderColor: VERY_DIM, opacity: 0.5 }}>
                      <td className="px-4 py-3 text-sm" style={{ color: GREEN }}>{row.name}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: DIM_GREEN }}>{row.email}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: DIM_GREEN }}>{row.role}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs" style={{
                          color: row.status === 'Active' ? GREEN : row.status === 'Pending' ? '#FFCC00' : '#666',
                          textShadow: row.status === 'Active' ? `0 0 4px ${GREEN}` : 'none',
                        }}>
                          [{row.status.toUpperCase()}]
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: DIM_GREEN }}>{row.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Terminal footer */}
            <div className="py-3 px-4 border-t text-xs" style={{ borderColor: VERY_DIM, color: DIM_GREEN }}>
              <span style={{ color: GREEN }}>root@dashboard:~$ </span>
              <span className="animate-pulse">_</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
