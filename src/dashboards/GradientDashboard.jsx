import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  DollarSign,
  Users,
  Target,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Bell,
  Search,
  LayoutDashboard,
  PieChart,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Download,
  Filter,
} from 'lucide-react'
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
import { kpiData, chartData, barChartData, tableData, sidebarItems } from '../data/mockData'

const gradientAccents = [
  { from: '#2563eb', to: '#1d4ed8', label: 'blue' },
  { from: '#059669', to: '#047857', label: 'emerald' },
  { from: '#d97706', to: '#b45309', label: 'amber' },
  { from: '#dc2626', to: '#b91c1c', label: 'red' },
]

const kpiIcons = [DollarSign, Users, Target, Clock]

const sidebarIcons = [LayoutDashboard, PieChart, Users, ShoppingBag, BarChart3, MessageSquare, Settings]

const statusBadgeStyles = {
  Active: 'bg-emerald-100 text-emerald-700',
  Inactive: 'bg-gray-100 text-gray-500',
  Pending: 'bg-amber-100 text-amber-700',
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold text-gray-800">
          {entry.name}: {entry.name === 'conversion' ? `${entry.value}%` : entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function GradientDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeNav, setActiveNav] = useState('overview')
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="h-full w-full flex overflow-hidden relative" style={{ background: '#f8fafc' }}>
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(37,99,235,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(5,150,105,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(217,119,6,0.05) 0%, transparent 50%)',
        }}
      />

      <aside className="w-56 flex-shrink-0 relative z-10 flex flex-col bg-white border-r border-gray-100">
        <div className="h-16 flex items-center px-5 gap-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-gray-800 text-sm tracking-tight">Prism</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarItems.map((item, i) => {
            const Icon = sidebarIcons[i] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-gray-800 bg-gray-100'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer">
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 bg-white border-b border-gray-100">
          <div className="flex items-center gap-6">
            {['overview', 'analytics', 'users', 'reports', 'settings'].map((item) => (
              <button
                key={item}
                onClick={() => item === 'settings' ? openLayoutLib() : setActiveNav(item)}
                className={`relative pb-1 text-sm font-medium capitalize transition-colors duration-200 cursor-pointer ${
                  activeNav === item ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item}
                {activeNav === item && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 w-48 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 transition-all duration-200"
              />
            </div>
            <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
              <Bell className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="font-display font-bold text-2xl text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Welcome back, Sarah. Here is your overview.</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {kpiData.slice(0, 4).map((kpi, i) => {
              const Icon = kpiIcons[i]
              const accent = gradientAccents[i]
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all duration-200 cursor-default"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${accent.from}15` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: accent.from }} />
                    </div>
                    <span
                      className={`flex items-center text-xs font-medium ${
                        kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-0.5" />
                      )}
                      {kpi.change}
                    </span>
                  </div>
                  <p className="font-display font-bold text-xl text-gray-900">{kpi.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{kpi.title}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-semibold text-gray-900">Revenue Overview</h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-gray-500">Revenue</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-400" />
                    <span className="text-gray-500">Users</span>
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradGray" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6b7280" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#6b7280" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fill="url(#gradBlue)" name="Revenue" />
                  <Area type="monotone" dataKey="users" stroke="#6b7280" strokeWidth={2} fill="url(#gradGray)" name="Users" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm font-semibold text-gray-900">Weekly Activity</h3>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={28} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-semibold text-gray-900">Team Members</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <Filter className="w-3 h-3" />
                  Filter
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">Name</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">Role</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">Status</th>
                  <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-gray-600">
                            {row.name.split(' ').map((n) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-900">{row.name}</div>
                          <div className="text-[10px] text-gray-400">{row.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 text-xs text-gray-600">{row.role}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium ${statusBadgeStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-xs text-gray-400">{row.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
