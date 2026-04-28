import { useState } from 'react'
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
  Users as UsersIcon,
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
  customers: UsersIcon,
  products: Package,
  orders: ShoppingCart,
  messages: MessageSquare,
  settings: Settings,
}

const cardStyle = 'bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl'

export default function AuroraDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-[#0c0a1a]">
      {/* Aurora background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
          style={{
            top: '-20%',
            left: '-10%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
            animation: 'aurora-float1 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-25 blur-[100px]"
          style={{
            top: '20%',
            right: '-5%',
            background: 'linear-gradient(135deg, #06b6d4, #0ea5e9, #3b82f6)',
            animation: 'aurora-float2 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[90px]"
          style={{
            bottom: '-15%',
            left: '30%',
            background: 'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
            animation: 'aurora-float3 30s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes aurora-float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 30px) scale(1.05); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes aurora-float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 20px) scale(1.08); }
          66% { transform: translate(30px, -30px) scale(0.92); }
        }
        @keyframes aurora-float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.03); }
          66% { transform: translate(-50px, 20px) scale(0.97); }
        }
      `}</style>

      <div className="relative z-10 flex flex-col h-full">
        <nav className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">A</span>
            </div>
            <span className="font-display font-semibold text-white text-lg tracking-tight">
              Aurora
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
              <button
                key={item}
                className="px-2 py-1 text-sm text-white/40 hover:text-white/70 transition-colors duration-200 cursor-pointer"
              >
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
                className="pl-9 pr-4 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors duration-200"
              />
            </div>
            <button className="p-2 rounded-xl hover:bg-white/10 text-white/40 hover:text-white/70 transition-all duration-200 cursor-pointer">
              <Bell className="w-4.5 h-4.5" />
            </button>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-52 flex-shrink-0 bg-white/5 backdrop-blur-xl border-r border-white/10 py-5 px-3 flex flex-col">
            <div className="flex flex-col gap-1 flex-1">
              {sidebarItems.map((item) => {
                const Icon = sidebarIcons[item.key] || LayoutDashboard
                const isActive = activeNav === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-violet-300' : 'text-white/30'}`} />
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
              <p className="text-white/40 text-sm mt-0.5">Performance metrics and analytics overview</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { ...kpiData[0], icon: DollarSign, gradient: 'from-violet-500 to-purple-600' },
                { ...kpiData[1], icon: Users, gradient: 'from-cyan-500 to-blue-600' },
                { ...kpiData[2], icon: Activity, gradient: 'from-emerald-500 to-teal-600' },
                { ...kpiData[3], icon: Clock, gradient: 'from-amber-500 to-orange-600' },
              ].map((kpi, i) => (
                <div
                  key={i}
                  className={`${cardStyle} p-5 hover:bg-white/15 transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center shadow-lg`}>
                      <kpi.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`flex items-center text-xs font-medium ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="font-display font-bold text-2xl text-white tracking-tight">{kpi.value}</p>
                  <p className="text-white/40 text-xs mt-1">{kpi.title}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`${cardStyle} p-5`}>
                <h3 className="font-display font-semibold text-white text-sm mb-4">Revenue Overview</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="auroraViolet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="auroraCyan" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(12,10,26,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#auroraViolet)" name="Revenue" />
                    <Area type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} fill="url(#auroraCyan)" name="Users" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className={`${cardStyle} p-5`}>
                <h3 className="font-display font-semibold text-white text-sm mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barChartData}>
                    <defs>
                      <linearGradient id="auroraBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(12,10,26,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px' }} />
                    <Bar dataKey="value" fill="url(#auroraBar)" radius={[6, 6, 0, 0]} barSize={28} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`${cardStyle} p-5`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-white text-sm">Team Members</h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white/40 hover:text-white/70 text-xs transition-colors duration-200 cursor-pointer">
                    <Filter className="w-3 h-3" />
                    Filter
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white/40 hover:text-white/70 text-xs transition-colors duration-200 cursor-pointer">
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
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 flex items-center justify-center">
                            <span className="text-white text-[10px] font-semibold">
                              {row.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm text-white/80">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-white/40">{row.role}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          row.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' :
                          row.status === 'Pending' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
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
