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
  Download,
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

const kpiIcons = [DollarSign, Users, Activity, Clock]

export default function SwissDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden" style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, sans-serif" }}>
      <div className="grid" style={{ gridTemplateColumns: '220px 1fr', flex: 1, minHeight: 0 }}>
        {/* Left sidebar - strict grid */}
        <aside className="bg-neutral-50 border-r border-neutral-200 p-6 flex flex-col">
          <div className="mb-8">
            <h1 className="text-xl font-black tracking-tight text-black" style={{ letterSpacing: '-0.03em' }}>
              MERIDIAN
            </h1>
            <p className="text-[10px] text-neutral-400 uppercase tracking-[0.2em] mt-1">
              Analytics Suite
            </p>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {sidebarItems.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setActiveNav(key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  activeNav === key
                    ? 'text-black bg-neutral-200'
                    : 'text-neutral-500 hover:text-black hover:bg-neutral-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-neutral-200">
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Version</p>
            <p className="text-xs font-mono text-neutral-600">2.4.1-stable</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="h-14 border-b border-neutral-200 flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-6">
              {['Overview', 'Analytics', 'Users', 'Reports'].map(item => (
                <button key={item} className="text-xs font-medium text-neutral-400 hover:text-black transition-colors duration-150 cursor-pointer">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-neutral-200">
                <Search size={12} className="text-neutral-400" />
                <input type="text" placeholder="Search" className="text-xs text-black placeholder-neutral-400 border-none outline-none bg-transparent w-32" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-medium cursor-pointer">
                <Download size={10} />
                Export
              </button>
            </div>
          </header>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* KPI section - strict 4 column grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {kpiData.slice(0, 4).map((kpi, i) => {
                const Icon = kpiIcons[i]
                return (
                  <div key={kpi.title} className="pb-4 border-b-2 border-black">
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={18} className="text-neutral-400" />
                      <span className={`text-xs font-bold ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-3xl font-black tracking-tight text-black" style={{ letterSpacing: '-0.03em' }}>
                      {kpi.value}
                    </p>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-[0.15em] mt-1">
                      {kpi.title}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border border-neutral-200 p-5">
                <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-4">Revenue</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" tick={{ fill: '#737373', fontSize: 9 }} axisLine={{ stroke: '#e5e5e5' }} tickLine={false} />
                    <YAxis tick={{ fill: '#737373', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ border: '1px solid #e5e5e5', borderRadius: '0', fontSize: '10px', fontFamily: "'Inter', sans-serif" }} />
                    <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: '#000' }} name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="border border-neutral-200 p-5">
                <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-4">Activity</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="name" tick={{ fill: '#737373', fontSize: 9 }} axisLine={{ stroke: '#e5e5e5' }} tickLine={false} />
                    <YAxis tick={{ fill: '#737373', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ border: '1px solid #e5e5e5', borderRadius: '0', fontSize: '10px', fontFamily: "'Inter', sans-serif" }} />
                    <Bar dataKey="value" fill="#000" radius={[0, 0, 0, 0]} barSize={24} name="Sessions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table section */}
            <div className="border border-neutral-200">
              <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="text-xs font-bold text-black uppercase tracking-wider">Team Members</h3>
                <span className="text-[10px] text-neutral-400">{tableData.length} records</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50">
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Email</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Role</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-150">
                      <td className="px-5 py-3 text-sm font-medium text-black">{row.name}</td>
                      <td className="px-5 py-3 text-xs text-neutral-500">{row.email}</td>
                      <td className="px-5 py-3 text-xs text-neutral-500">{row.role}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          row.status === 'Active' ? 'text-emerald-700 bg-emerald-50' :
                          row.status === 'Pending' ? 'text-amber-700 bg-amber-50' :
                          'text-neutral-500 bg-neutral-100'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-neutral-400">{row.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
