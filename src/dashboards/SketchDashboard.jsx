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
  Pencil,
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

export default function SketchDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive", background: '#FAFAFA' }}>
      {/* Paper texture background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Top Navigation - sketched border */}
      <nav className="relative h-14 flex items-center justify-between px-6 border-b-2 shrink-0 z-10" style={{ borderColor: '#666', background: '#fff' }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Pencil size={18} color="#4A90D9" />
            <span className="font-bold text-lg" style={{ color: '#4A90D9' }}>
              Sketchboard
            </span>
          </div>
          {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
            <button key={item} className="text-sm font-medium text-gray-500 hover:text-gray-800 cursor-pointer transition-colors duration-150">
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <Search size={14} className="text-gray-400" />
            <input type="text" placeholder="Search..." className="text-sm border-none outline-none bg-transparent w-32 text-gray-600 placeholder-gray-400" />
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Bell size={16} className="text-gray-500" />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0 border-r-2 border-dashed border-gray-200 py-4 px-3 flex flex-col overflow-y-auto bg-white/50">
          <div className="flex flex-col gap-1.5 flex-1">
            {sidebarItems.map((item) => {
              const Icon = sidebarIcons[item.key] || LayoutDashboard
              const isActive = activeNav === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveNav(item.key)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                    isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  style={isActive ? { borderLeft: '2px solid #4A90D9' } : {}}
                >
                  <Icon className="w-4 h-4" style={{ strokeWidth: isActive ? 2.5 : 1.5 }} />
                  <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-dashed border-gray-200">
            <div className="p-3 bg-yellow-50 rounded-lg border border-dashed border-yellow-200">
              <p className="text-xs text-yellow-700 font-medium">Quick Note</p>
              <p className="text-[10px] text-yellow-600 mt-1">Remember to review metrics before the meeting!</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h1 className="font-bold text-2xl text-gray-800" style={{ letterSpacing: '-0.01em' }}>
              Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">Rough numbers, clear insights.</p>
          </div>

          {/* KPI Cards - hand-drawn feel */}
          <div className="grid grid-cols-4 gap-4">
            {kpiData.slice(0, 4).map((kpi, i) => {
              const Icon = kpiIcons[i]
              const colors = ['#4A90D9', '#5CB85C', '#F0AD4E', '#D9534F']
              const color = colors[i]
              return (
                <div
                  key={kpi.title}
                  className="p-5 rounded-2xl transition-all duration-150 cursor-default"
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${color}40`,
                    boxShadow: `0 2px 8px ${color}10`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={20} color={color} style={{ strokeWidth: 1.5 }} />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: kpi.trend === 'up' ? '#5CB85C' : '#D9534F' }}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="font-bold text-2xl text-gray-800">{kpi.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{kpi.title}</p>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 className="font-semibold text-sm text-gray-700 mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#999', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#999', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ border: '1px solid #e0e0e0', borderRadius: '12px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#4A90D9" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#4A90D9' }} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 className="font-semibold text-sm text-gray-700 mb-4">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#999', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#999', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ border: '1px solid #e0e0e0', borderRadius: '12px', fontSize: '11px' }} />
                  <Bar dataKey="value" fill="#4A90D9" radius={[6, 6, 0, 0]} barSize={28} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="p-5 rounded-2xl bg-white border border-gray-100" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-700">Team Members</h3>
              <span className="text-xs text-gray-400">{tableData.length} records</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Name', 'Email', 'Role', 'Status', 'Last Active'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm text-gray-800">{row.name}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{row.email}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{row.role}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium" style={{
                        background: row.status === 'Active' ? '#E8F5E9' : row.status === 'Pending' ? '#FFF3E0' : '#F5F5F5',
                        color: row.status === 'Active' ? '#5CB85C' : row.status === 'Pending' ? '#F0AD4E' : '#999',
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{row.lastActive}</td>
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
