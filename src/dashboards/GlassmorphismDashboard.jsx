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
  LayoutDashboard,
  Users,
  Settings,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Download,
  RefreshCw,
  Filter,
  MoreHorizontal,
} from 'lucide-react'
import { Button, IconButton, SearchInput, StatusBadge, Avatar, Card, CardHeader, CardTitle } from '../components/ui'
import { kpiData, chartData, barChartData, tableData, sidebarItems , sidebarIcons } from '../data/mockData'

const glassCard = 'bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-3 shadow-lg">
      <p className="text-white/70 text-xs font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-white text-sm font-semibold">
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function GlassmorphismDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const { openLayoutLib } = useDashboard()
  const firstFourKpi = kpiData.slice(0, 4)

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c1445] via-[#0f172a] to-[#1e293b]" />

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-slate-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-8%] w-[400px] h-[400px] rounded-full bg-slate-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[30%] w-[450px] h-[450px] rounded-full bg-slate-700/10 blur-[110px] pointer-events-none" />
      <div className="absolute top-[60%] left-[10%] w-[300px] h-[300px] rounded-full bg-slate-400/5 blur-[90px] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <nav className="flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">G</span>
              </div>
              <span className="font-display font-semibold text-white text-lg tracking-tight">
                Glassboard
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  size="sm"
                  onClick={item === 'Settings' ? openLayoutLib : undefined}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <SearchInput 
              placeholder="Search..." 
              className="w-52"
            />
            <IconButton 
              label="通知" 
              variant="ghost" 
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <Bell className="w-4.5 h-4.5" />
            </IconButton>
            <Avatar 
              name="Sarah Connor" 
              size="sm" 
              className="bg-gradient-to-br from-slate-300 to-slate-500"
            />
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-56 flex-shrink-0 bg-white/5 backdrop-blur-xl border-r border-white/10 py-5 px-3 flex flex-col">
            <div className="flex flex-col gap-1 flex-1">
              {sidebarItems.map((item) => {
                const Icon = sidebarIcons[item.key] || LayoutDashboard
                const isActive = activeNav === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveNav(item.key)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/15 text-white shadow-[0_4px_16px_rgba(100,116,139,0.2)] border border-white/20'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors duration-200 ${
                        isActive ? 'text-slate-300' : 'text-white/40 group-hover:text-white/60'
                      }`}
                    />
                    <span>{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/40" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-white/10">
              <Card variant="glass" padding="sm">
                <p className="text-white/80 text-xs font-medium mb-1">Storage Used</p>
                <p className="text-white font-display font-semibold text-lg">67.2 GB</p>
                <div className="mt-2.5 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-slate-400 to-slate-500" />
                </div>
                <p className="text-white/40 text-[11px] mt-1.5">of 100 GB</p>
              </Card>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold text-2xl text-white tracking-tight">
                  Dashboard
                </h1>
                <p className="text-white/40 text-sm mt-0.5">
                  Welcome back, Sarah. Here is your overview.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Filter className="w-3.5 h-3.5" />}
                  className="bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
                >
                  Filter
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  className="bg-white/10 text-white/70 hover:text-white hover:bg-white/15"
                >
                  Export
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700"
                >
                  Refresh
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {firstFourKpi.map((kpi, i) => (
                <Card key={i} variant="glass" hoverable>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
                      {kpi.title}
                    </p>
                    <IconButton 
                      label="更多选项" 
                      variant="ghost" 
                      size="xs"
                      className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/60"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </IconButton>
                  </div>
                  <p className="font-display font-bold text-2xl text-white tracking-tight">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                    )}
                    <span
                      className={`text-xs font-semibold ${
                        kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {kpi.change}
                    </span>
                    <span className="text-white/30 text-xs">vs last month</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card variant="glass">
                <CardHeader className="mb-5">
                  <div>
                    <CardTitle className="font-display text-base">Revenue Overview</CardTitle>
                    <p className="text-white/40 text-xs mt-0.5">Monthly revenue and user trends</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                      <span className="text-white/50">Revenue</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="text-white/50">Users</span>
                    </span>
                  </div>
                </CardHeader>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="gradSlate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748b" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradSlateLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#64748b"
                      strokeWidth={2}
                      fill="url(#gradSlate)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      fill="url(#gradSlateLight)"
                      name="Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card variant="glass">
                <CardHeader className="mb-5">
                  <div>
                    <CardTitle className="font-display text-base">Weekly Activity</CardTitle>
                    <p className="text-white/40 text-xs mt-0.5">Daily sessions this week</p>
                  </div>
                </CardHeader>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barChartData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      name="Sessions"
                      radius={[6, 6, 0, 0]}
                      fill="url(#barGradSlate)"
                    />
                    <defs>
                      <linearGradient id="barGradSlate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card variant="glass">
              <CardHeader className="mb-5">
                <div>
                  <CardTitle className="font-display text-base">Team Members</CardTitle>
                  <p className="text-white/40 text-xs mt-0.5">Recent user activity and roles</p>
                </div>
                <Button variant="ghost" size="sm" className="text-white/40 hover:text-white/70">
                  View All
                </Button>
              </CardHeader>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">
                        Role
                      </th>
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="text-right px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr
                        key={row.id}
                        className="border-t border-white/5 hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              name={row.name} 
                              size="sm" 
                              className="bg-gradient-to-br from-slate-500/60 to-slate-600/60"
                            />
                            <div>
                              <p className="text-white text-sm font-medium">{row.name}</p>
                              <p className="text-white/35 text-xs">{row.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-white/60 text-sm">{row.role}</td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={row.status.toLowerCase()} />
                        </td>
                        <td className="px-5 py-3.5 text-white/40 text-sm">{row.lastActive}</td>
                        <td className="px-5 py-3.5 text-right">
                          <IconButton 
                            label="更多选项" 
                            variant="ghost" 
                            size="xs"
                            className="text-white/30 hover:text-white/60"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}