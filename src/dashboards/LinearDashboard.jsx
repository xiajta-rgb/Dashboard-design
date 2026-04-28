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
  Active: 'bg-emerald-500/20 text-emerald-400',
  Inactive: 'bg-gray-500/20 text-gray-400',
  Pending: 'bg-amber-500/20 text-amber-400',
}

const cardStyle = 'bg-[#161923] border border-[#1E2130] rounded-md'

export default function LinearDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-[#0F1117]">
      <div className="relative z-10 flex flex-col h-full">
        <nav className="flex-shrink-0 flex items-center justify-between px-4 h-14 bg-[#0F1117] border-b border-[#1E2130]">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-[#F7F8F8] text-sm tracking-tight">Linear</span>
            <div className="flex items-center gap-1">
              {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
                <button
                  key={item}
                  className="px-2.5 py-1 text-xs text-[#8A8F98] hover:text-[#F7F8F8] transition-colors duration-150 cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#565A63]" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1 w-48 bg-[#161923] border border-[#1E2130] rounded text-[#8A8F98] text-xs placeholder-[#565A63] focus:outline-none focus:border-[#2A2D3A] transition-colors duration-150"
              />
            </div>
            <button className="p-1.5 rounded hover:bg-[#1E2130] text-[#565A63] hover:text-[#8A8F98] transition-colors duration-150 cursor-pointer">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-52 flex-shrink-0 bg-[#0F1117] border-r border-[#1E2130] py-4 px-2 flex flex-col">
            <div className="flex flex-col gap-0.5 flex-1">
              {sidebarItems.map((item) => {
                const Icon = sidebarIcons[item.key] || LayoutDashboard
                const isActive = activeNav === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded text-sm transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'text-[#F7F8F8] bg-[#1E2130]'
                        : 'text-[#8A8F98] hover:text-[#F7F8F8] hover:bg-[#161923]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 ml-auto text-[#565A63]" />}
                  </button>
                )
              })}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-5 space-y-5">
            <div>
              <h1 className="text-lg font-semibold text-[#F7F8F8]">Dashboard</h1>
              <p className="text-xs text-[#565A63] mt-0.5">Performance metrics and analytics overview</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {kpiData.slice(0, 4).map((kpi, i) => (
                <div key={i} className={`${cardStyle} p-4`}>
                  <p className="text-xs text-[#565A63] mb-1">{kpi.title}</p>
                  <p className="text-xl font-semibold text-[#F7F8F8]">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className={`text-xs ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className={`${cardStyle} p-4`}>
                <h3 className="text-xs font-medium text-[#F7F8F8] mb-3">Revenue</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2130" />
                    <XAxis dataKey="name" tick={{ fill: '#565A63', fontSize: 10 }} axisLine={{ stroke: '#1E2130' }} tickLine={false} />
                    <YAxis tick={{ fill: '#565A63', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#161923', border: '1px solid #1E2130', borderRadius: '4px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#F7F8F8" strokeWidth={1.5} fill="rgba(247,248,248,0.05)" name="Revenue" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className={`${cardStyle} p-4`}>
                <h3 className="text-xs font-medium text-[#F7F8F8] mb-3">Weekly</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2130" />
                    <XAxis dataKey="name" tick={{ fill: '#565A63', fontSize: 10 }} axisLine={{ stroke: '#1E2130' }} tickLine={false} />
                    <YAxis tick={{ fill: '#565A63', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#161923', border: '1px solid #1E2130', borderRadius: '4px', fontSize: '11px' }} />
                    <Bar dataKey="value" fill="#8A8F98" radius={[2, 2, 0, 0]} barSize={24} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`${cardStyle} p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-medium text-[#F7F8F8]">Team Members</h3>
                <button className="text-xs text-[#565A63] hover:text-[#8A8F98] transition-colors duration-150 cursor-pointer">View All</button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1E2130]">
                    <th className="text-left px-3 py-2 text-[10px] font-medium text-[#565A63] uppercase tracking-wider">Name</th>
                    <th className="text-left px-3 py-2 text-[10px] font-medium text-[#565A63] uppercase tracking-wider">Role</th>
                    <th className="text-left px-3 py-2 text-[10px] font-medium text-[#565A63] uppercase tracking-wider">Status</th>
                    <th className="text-left px-3 py-2 text-[10px] font-medium text-[#565A63] uppercase tracking-wider">Last Active</th>
                    <th className="text-right px-3 py-2 text-[10px] font-medium text-[#565A63] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-b border-[#1E2130] hover:bg-[#1E2130]/50 transition-colors duration-150">
                      <td className="px-3 py-2.5 text-sm text-[#F7F8F8]">{row.name}</td>
                      <td className="px-3 py-2.5 text-xs text-[#8A8F98]">{row.role}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs ${statusStyles[row.status]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'Active' ? 'bg-emerald-400' : row.status === 'Pending' ? 'bg-amber-400' : 'bg-gray-400'}`} />
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-[#565A63]">{row.lastActive}</td>
                      <td className="px-3 py-2.5 text-right">
                        <button className="text-[#565A63] hover:text-[#8A8F98] transition-colors duration-150 cursor-pointer">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
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
