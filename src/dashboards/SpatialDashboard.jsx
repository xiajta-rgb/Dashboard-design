import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  DollarSign,
  Users,
  Activity,
  Clock,
  TrendingUp,
  TrendingDown,
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Download,
  Filter,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, sidebarItems } from '../data/mockData'

const sidebarIcons = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  customers: Users,
  products: Package,
  orders: ShoppingCart,
  messages: MessageSquare,
  settings: Settings,
}

const statusStyles = {
  Active: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  Inactive: 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
  Pending: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
}

export default function SpatialDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16162a 50%, #111128 100%)' }}>
      {/* Depth layers - background glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #4f46e5, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #0891b2, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col h-full">
        <nav className="flex-shrink-0 flex items-center justify-between px-6 py-3" style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{
              background: 'rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <span className="text-white font-display font-bold text-sm">S</span>
            </div>
            <span className="font-display font-semibold text-white text-lg tracking-tight">Spatial</span>
          </div>

          <div className="flex items-center gap-6">
            {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
              <button key={item} onClick={item === 'Settings' ? openLayoutLib : undefined} className="px-2 py-1 text-sm text-white/40 hover:text-white/70 transition-colors duration-200 cursor-pointer">
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none transition-colors duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              />
            </div>
            <button className="p-2 rounded-xl text-white/30 hover:text-white/60 transition-all duration-200 cursor-pointer" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <Bell className="w-4.5 h-4.5" />
            </button>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-52 flex-shrink-0 py-5 px-3 flex flex-col" style={{
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div className="flex flex-col gap-1 flex-1">
              {sidebarItems.map((item) => {
                const Icon = sidebarIcons[item.key] || LayoutDashboard
                const isActive = activeNav === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveNav(item.key)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'text-white/35 hover:text-white/60'
                    }`}
                    style={isActive ? {
                      background: 'rgba(255,255,255,0.1)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.12)',
                    } : {}}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h1 className="font-display font-bold text-2xl text-white tracking-tight">
                Dashboard
              </h1>
              <p className="text-white/35 text-sm mt-0.5">Performance metrics and analytics overview</p>
            </div>

            {/* KPI cards with different depth levels */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { ...kpiData[0], depth: 0 },
                { ...kpiData[1], depth: 1 },
                { ...kpiData[2], depth: 2 },
                { ...kpiData[3], depth: 3 },
              ].map((kpi, i) => {
                const depthStyles = [
                  { shadow: '0 2px 8px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.2), 0 16px 48px rgba(0,0,0,0.15)', bg: 'rgba(255,255,255,0.12)', border: 'rgba(255,255,255,0.15)' },
                  { shadow: '0 2px 8px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.18), 0 12px 36px rgba(0,0,0,0.1)', bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.1)' },
                  { shadow: '0 2px 6px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.14), 0 8px 24px rgba(0,0,0,0.08)', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.08)' },
                  { shadow: '0 2px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)', bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.06)' },
                ]
                const style = depthStyles[kpi.depth]
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-5 hover:translate-y-[-2px] transition-all duration-300 cursor-default"
                    style={{
                      background: style.bg,
                      boxShadow: style.shadow,
                      border: `1px solid ${style.border}`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">{kpi.title}</p>
                    <p className="font-display font-bold text-2xl text-white tracking-tight">{kpi.value}</p>
                    <div className="flex items-center gap-1.5 mt-2.5">
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                      )}
                      <span className={`text-xs font-semibold ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Charts with spatial depth */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl p-5" style={{
                background: 'rgba(255,255,255,0.06)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.16)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}>
                <h3 className="font-display font-semibold text-white text-sm mb-4">Revenue Overview</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="spatialIndigo" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#spatialIndigo)" name="Revenue" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-2xl p-5" style={{
                background: 'rgba(255,255,255,0.06)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.16)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}>
                <h3 className="font-display font-semibold text-white text-sm mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(17,17,40,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }} />
                    <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={28} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl p-5" style={{
              background: 'rgba(255,255,255,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.16)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white text-sm">Team Members</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/40 hover:text-white/70 text-xs transition-colors duration-200 cursor-pointer" style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white/40 hover:text-white/70 text-xs transition-colors duration-200 cursor-pointer" style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">Role</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold" style={{
                            background: 'rgba(255,255,255,0.1)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
                          }}>
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-white/80">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-white/40">{row.role}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyles[row.status]}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-white/30">{row.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
