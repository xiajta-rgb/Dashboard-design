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
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Search,
  Bell,
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

const kpiIcons = [DollarSign, Users, Activity, Clock]

// Apple Liquid Glass - refined frosted glass with subtle depth, SF-like feel
const liquidCard = {
  background: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)',
}

const liquidCardSubtle = {
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(30px) saturate(150%)',
  WebkitBackdropFilter: 'blur(30px) saturate(150%)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '14px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
}

export default function LiquidGlassDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans" style={{ background: '#000' }}>
      {/* Apple-style gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-40 blur-[100px]"
          style={{
            top: '-15%',
            right: '-10%',
            background: 'radial-gradient(circle, rgba(120,119,198,0.6), rgba(80,70,180,0.3), transparent 70%)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[80px]"
          style={{
            bottom: '10%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(61,90,254,0.5), rgba(30,60,200,0.2), transparent 70%)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[70px]"
          style={{
            top: '40%',
            left: '40%',
            background: 'radial-gradient(circle, rgba(255,150,100,0.3), rgba(255,100,50,0.1), transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Navigation - Liquid Glass */}
        <nav className="flex-shrink-0 flex items-center justify-between px-6 py-3" style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
            }}>
              <span className="text-white font-semibold text-sm">L</span>
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">Liquid</span>
          </div>

          <div className="flex items-center gap-6">
            {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
              <button key={item} className="px-2 py-1 text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer">
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
                className="pl-9 pr-4 py-1.5 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              />
            </div>
            <button className="p-2 rounded-xl text-white/40 hover:text-white/70 transition-all duration-200 cursor-pointer" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <Bell className="w-4.5 h-4.5" />
            </button>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-52 flex-shrink-0 py-5 px-3 flex flex-col" style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div className="flex flex-col gap-1 flex-1">
              {sidebarItems.map((item) => {
                const Icon = sidebarIcons[item.key] || LayoutDashboard
                const isActive = activeNav === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                    style={isActive ? {
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                    } : {}}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h1 className="font-semibold text-2xl text-white tracking-tight">Dashboard</h1>
              <p className="text-white/35 text-sm mt-0.5">Performance metrics and analytics overview</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { ...kpiData[0], gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
                { ...kpiData[1], gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
                { ...kpiData[2], gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
                { ...kpiData[3], gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
              ].map((kpi, i) => {
                const Icon = kpiIcons[i]
                return (
                  <div
                    key={i}
                    className="p-5 transition-all duration-300 cursor-default"
                    style={{
                      ...liquidCard,
                      background: 'rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                        background: kpi.gradient,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                      }}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={`flex items-center text-xs font-semibold ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {kpi.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                        {kpi.change}
                      </span>
                    </div>
                    <p className="font-semibold text-2xl text-white tracking-tight">{kpi.value}</p>
                    <p className="text-white/40 text-xs mt-1">{kpi.title}</p>
                  </div>
                )
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5" style={liquidCard}>
                <h3 className="font-semibold text-white text-sm mb-4">Revenue Overview</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="liquidPurple" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#667eea" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#667eea" strokeWidth={2} fill="url(#liquidPurple)" name="Revenue" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="p-5" style={liquidCard}>
                <h3 className="font-semibold text-white text-sm mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barChartData}>
                    <defs>
                      <linearGradient id="liquidBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px' }} />
                    <Bar dataKey="value" fill="url(#liquidBar)" radius={[8, 8, 0, 0]} barSize={28} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table */}
            <div className="p-5" style={liquidCard}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm">Team Members</h3>
                <button className="text-white/40 hover:text-white/70 text-xs transition-colors duration-200 cursor-pointer">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-medium text-white/30 uppercase tracking-wider">Email</th>
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
                      <td className="px-4 py-3 text-xs text-white/35">{row.email}</td>
                      <td className="px-4 py-3 text-xs text-white/50">{row.role}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium" style={{
                          background: row.status === 'Active' ? 'rgba(52,199,89,0.2)' : row.status === 'Pending' ? 'rgba(255,204,0,0.2)' : 'rgba(142,142,147,0.2)',
                          color: row.status === 'Active' ? '#34C759' : row.status === 'Pending' ? '#FFCC00' : '#8E8E93',
                        }}>
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
