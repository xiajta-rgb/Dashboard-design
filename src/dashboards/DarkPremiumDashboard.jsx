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
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  MessageSquare,
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
  Active: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  Inactive: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  Pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#161622] border border-[#2A2A3E] rounded-lg px-4 py-3 shadow-lg">
      <p className="text-gray-400 text-xs font-medium mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-white text-sm font-semibold">
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function DarkPremiumDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const { openLayoutLib } = useDashboard()
  const firstFourKpi = kpiData.slice(0, 4)

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-[#0A0A0F]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#0D0D14] to-[#0A0A0F]" />

      <div className="relative z-10 flex flex-col h-full">
        <nav className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-[#0D0D14] border-b border-[#1A1A2E]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#64748b] to-[#475569] flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">D</span>
              </div>
              <span className="font-display font-semibold text-white text-lg tracking-tight">
                Darkboard
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
                <button
                  key={item}
                  onClick={item === 'Settings' ? openLayoutLib : undefined}
                  className="px-3.5 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-[#1A1A2E] transition-all duration-200 cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-52 pl-9 pr-4 py-1.5 rounded-lg bg-[#161622] border border-[#2A2A3E] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:bg-[#1A1A2E] transition-all duration-200"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-[#1A1A2E] text-gray-400 hover:text-white transition-all duration-200 cursor-pointer">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#64748b] to-[#475569] border border-[#2A2A3E] flex items-center justify-center">
              <span className="text-white text-xs font-semibold">SC</span>
            </div>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-56 flex-shrink-0 bg-[#0D0D14] border-r border-[#1A1A2E] py-5 px-3 flex flex-col">
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
                        ? 'bg-[#1A1A2E] text-white shadow-[0_0_15px_rgba(100,116,139,0.15)] border border-[#2A2A3E]'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-[#1A1A2E]/50'
                    }`}
                  >
                    <Icon
                      className={`w-[18px] h-[18px] transition-colors duration-200 ${
                        isActive ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'
                      }`}
                    />
                    <span>{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-500" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-auto pt-4 border-t border-[#1A1A2E]">
              <div className="bg-[#161622] border border-[#2A2A3E] rounded-xl p-4">
                <p className="text-gray-400 text-xs font-medium mb-1">Storage Used</p>
                <p className="text-white font-display font-semibold text-lg">67.2 GB</p>
                <div className="mt-2.5 w-full h-1.5 rounded-full bg-[#1A1A2E] overflow-hidden">
                  <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-[#64748b] to-[#475569]" />
                </div>
                <p className="text-gray-500 text-[11px] mt-1.5">of 100 GB</p>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0A0A0F]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold text-2xl text-white tracking-tight">
                  Dashboard
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Welcome back, Sarah. Here is your overview.
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#161622] border border-[#2A2A3E] rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 text-sm cursor-pointer">
                  <Filter className="w-3.5 h-3.5" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#161622] border border-[#2A2A3E] rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 text-sm cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#161622] border border-[#2A2A3E] rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 text-sm cursor-pointer">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {firstFourKpi.map((kpi, i) => (
                <div
                  key={i}
                  className="bg-[#161622] border border-[#2A2A3E] rounded-xl p-5 hover:border-gray-500 transition-all duration-200 group cursor-default"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                      {kpi.title}
                    </p>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-600 hover:text-gray-400 cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
                    <span className="text-gray-600 text-xs">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#161622] border border-[#2A2A3E] rounded-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-display font-semibold text-white text-base">
                      Revenue Overview
                    </h2>
                    <p className="text-gray-500 text-xs mt-0.5">Monthly revenue and user trends</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#64748b]" />
                      <span className="text-gray-500">Revenue</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                      <span className="text-gray-500">Users</span>
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="gradDarkSlate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748b" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradDarkSlateLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#94a3b8" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#64748b"
                      strokeWidth={2}
                      fill="url(#gradDarkSlate)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      fill="url(#gradDarkSlateLight)"
                      name="Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-[#161622] border border-[#2A2A3E] rounded-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-display font-semibold text-white text-base">
                      Weekly Activity
                    </h2>
                    <p className="text-gray-500 text-xs mt-0.5">Daily sessions this week</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barChartData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      name="Sessions"
                      radius={[6, 6, 0, 0]}
                      fill="url(#barGradDark)"
                    />
                    <defs>
                      <linearGradient id="barGradDark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-[#161622] border border-[#2A2A3E] rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-display font-semibold text-white text-base">
                    Team Members
                  </h2>
                  <p className="text-gray-500 text-xs mt-0.5">Recent user activity and roles</p>
                </div>
                <button className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-200 cursor-pointer">
                  View All
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-[#1A1A2E]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#1A1A2E]/50">
                      <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                        Name
                      </th>
                      <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                        Role
                      </th>
                      <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="text-right px-5 py-3 text-gray-500 text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr
                        key={row.id}
                        className="border-t border-[#1A1A2E] hover:bg-[#1A1A2E]/30 transition-colors duration-200"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#2A2A3E] flex items-center justify-center text-gray-300 text-xs font-semibold border border-[#3A3A4E]">
                              {row.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{row.name}</p>
                              <p className="text-gray-500 text-xs">{row.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-gray-400 text-sm">{row.role}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusStyles[row.status]
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-gray-500 text-sm">{row.lastActive}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button className="text-gray-600 hover:text-gray-400 transition-colors duration-200 cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
