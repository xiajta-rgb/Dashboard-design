import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
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

const kpiIcons = [DollarSign, Users, Activity, Clock]
const m3Colors = {
  primary: '#6750A4',
  primaryContainer: '#EADDFF',
  secondary: '#625B71',
  secondaryContainer: '#E8DEF8',
  tertiary: '#7D5260',
  tertiaryContainer: '#FFD8E4',
  surface: '#FEF7FF',
  surfaceVariant: '#E7E0EC',
  outline: '#79747E',
  onSurface: '#1C1B1F',
  onSurfaceVariant: '#49454F',
  error: '#B3261E',
}

export default function Material3Dashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ fontFamily: "'Inter', 'Google Sans', 'Roboto', system-ui, sans-serif", background: m3Colors.surface }}>
      {/* Top App Bar */}
      <nav className="h-16 flex items-center justify-between px-4 shrink-0" style={{ background: m3Colors.surface }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: m3Colors.primary }}>
            <LayoutDashboard size={20} color="#fff" />
          </div>
          <span className="text-xl font-normal" style={{ color: m3Colors.onSurface }}>Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: m3Colors.surfaceVariant }}>
            <Search size={16} color={m3Colors.onSurfaceVariant} />
            <input type="text" placeholder="Search..." className="text-sm border-none outline-none bg-transparent w-40" style={{ color: m3Colors.onSurface }} />
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer" style={{ background: m3Colors.surfaceVariant }}>
            <Bell size={18} color={m3Colors.onSurfaceVariant} />
          </button>
          <div className="w-8 h-8 rounded-full" style={{ background: m3Colors.primaryContainer, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="text-xs font-medium" style={{ color: m3Colors.primary }}>SC</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Rail */}
        <aside className="w-20 flex-shrink-0 py-4 flex flex-col items-center gap-1" style={{ background: m3Colors.surface }}>
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeNav === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveNav(item.key)}
                className="w-14 py-2 rounded-2xl flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer"
                style={{
                  background: isActive ? m3Colors.secondaryContainer : 'transparent',
                }}
              >
                <Icon size={20} color={isActive ? m3Colors.onSurface : m3Colors.onSurfaceVariant} />
                <span className="text-[10px] font-medium" style={{ color: isActive ? m3Colors.onSurface : m3Colors.onSurfaceVariant }}>
                  {item.label.slice(0, 5)}
                </span>
              </button>
            )
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Chips row */}
          <div className="flex items-center gap-2">
            {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item, i) => (
              <button
                key={item}
                onClick={item === 'Settings' ? openLayoutLib : undefined}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  i === 0 ? 'border' : ''
                }`}
                style={i === 0 ? {
                  borderColor: m3Colors.outline,
                  background: m3Colors.secondaryContainer,
                  color: m3Colors.onSurface,
                } : {
                  background: m3Colors.surfaceVariant,
                  color: m3Colors.onSurfaceVariant,
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* KPI Cards - Material 3 Cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { color: m3Colors.primary, container: m3Colors.primaryContainer },
              { color: m3Colors.tertiary, container: m3Colors.tertiaryContainer },
              { color: '#0061A4', container: '#D1E4FF' },
              { color: '#36618E', container: '#C2E7FF' },
            ].map((accent, i) => {
              const Icon = kpiIcons[i]
              const kpi = kpiData[i]
              return (
                <div
                  key={i}
                  className="p-5 cursor-default transition-all duration-200 hover:shadow-md"
                  style={{
                    background: accent.container,
                    borderRadius: '16px',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent.color}15` }}>
                      <Icon size={20} color={accent.color} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: kpi.trend === 'up' ? '#1B8A42' : m3Colors.error }}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: m3Colors.onSurface }}>{kpi.value}</p>
                  <p className="text-xs mt-1" style={{ color: m3Colors.onSurfaceVariant }}>{kpi.title}</p>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5" style={{ background: m3Colors.surfaceVariant, borderRadius: '16px' }}>
              <h3 className="text-sm font-medium mb-4" style={{ color: m3Colors.onSurface }}>Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={m3Colors.outline} strokeOpacity={0.15} />
                  <XAxis dataKey="name" tick={{ fill: m3Colors.onSurfaceVariant, fontSize: 10 }} axisLine={{ stroke: m3Colors.outline, strokeOpacity: 0.2 }} tickLine={false} />
                  <YAxis tick={{ fill: m3Colors.onSurfaceVariant, fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', border: `1px solid ${m3Colors.outline}30` }} />
                  <Line type="monotone" dataKey="revenue" stroke={m3Colors.primary} strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: m3Colors.primary }} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5" style={{ background: m3Colors.surfaceVariant, borderRadius: '16px' }}>
              <h3 className="text-sm font-medium mb-4" style={{ color: m3Colors.onSurface }}>Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={m3Colors.outline} strokeOpacity={0.15} />
                  <XAxis dataKey="name" tick={{ fill: m3Colors.onSurfaceVariant, fontSize: 10 }} axisLine={{ stroke: m3Colors.outline, strokeOpacity: 0.2 }} tickLine={false} />
                  <YAxis tick={{ fill: m3Colors.onSurfaceVariant, fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px', border: `1px solid ${m3Colors.outline}30` }} />
                  <Bar dataKey="value" fill={m3Colors.primary} radius={[8, 8, 0, 0]} barSize={28} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table - Material 3 */}
          <div className="p-5" style={{ background: m3Colors.surfaceVariant, borderRadius: '16px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium" style={{ color: m3Colors.onSurface }}>Team Members</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm cursor-pointer border" style={{
                  borderColor: m3Colors.outline,
                  color: m3Colors.onSurfaceVariant,
                }}>
                  <Filter size={12} />
                  Filter
                </button>
                <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm cursor-pointer" style={{
                  background: m3Colors.primary,
                  color: '#fff',
                }}>
                  <Download size={12} />
                  Export
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: m3Colors.outline, opacity: 0.3 }}>
                  {['Name', 'Email', 'Role', 'Status', 'Last Active'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider" style={{ color: m3Colors.onSurfaceVariant }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-black/5 transition-colors duration-150" style={{ borderColor: m3Colors.outline, opacity: 0.15 }}>
                    <td className="px-4 py-3 text-sm" style={{ color: m3Colors.onSurface }}>{row.name}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: m3Colors.onSurfaceVariant }}>{row.email}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: m3Colors.onSurfaceVariant }}>{row.role}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium" style={{
                        background: row.status === 'Active' ? '#E6F4EA' : row.status === 'Pending' ? '#FCE8E6' : '#F2F2F2',
                        color: row.status === 'Active' ? '#1B8A42' : row.status === 'Pending' ? '#D93025' : '#666',
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: m3Colors.onSurfaceVariant }}>{row.lastActive}</td>
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
