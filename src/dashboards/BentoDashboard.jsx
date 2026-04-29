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
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Eye,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  Filter,
  RefreshCw,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, navItems } from '../data/mockData'

const accentColors = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', stroke: '#4f46e5' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-500', stroke: '#10b981' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-500', stroke: '#f59e0b' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-500', stroke: '#f43f5e' },
}

const kpiConfig = [
  { icon: DollarSign, color: 'indigo' },
  { icon: Users, color: 'emerald' },
  { icon: Activity, color: 'amber' },
  { icon: Clock, color: 'rose' },
  { icon: Eye, color: 'indigo' },
  { icon: BarChart3, color: 'emerald' },
]

const sideMetrics = [
  { label: 'Customer Satisfaction', value: 92, color: 'indigo' },
  { label: 'Team Performance', value: 87, color: 'emerald' },
  { label: 'Revenue Target', value: 73, color: 'amber' },
  { label: 'User Retention', value: 68, color: 'rose' },
  { label: 'System Uptime', value: 99, color: 'emerald' },
  { label: 'Task Completion', value: 81, color: 'indigo' },
]

const activityItems = [
  { user: 'Sarah Chen', action: 'updated the project timeline', time: '2 min ago' },
  { user: 'Marcus Rivera', action: 'approved the budget proposal', time: '15 min ago' },
  { user: 'Elena Volkov', action: 'commented on the design review', time: '1 hour ago' },
  { user: 'James Park', action: 'deployed v2.4.1 to production', time: '3 hours ago' },
]

const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #f0f0f0',
  borderRadius: '12px',
  fontSize: '11px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
}

function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-600',
    Inactive: 'bg-gray-100 text-gray-500',
    Pending: 'bg-amber-50 text-amber-600',
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${
        styles[status] || 'bg-gray-100 text-gray-500'
      }`}
    >
      {status}
    </span>
  )
}

function KpiCard({ kpi, index }) {
  const config = kpiConfig[index] || kpiConfig[0]
  const accent = accentColors[config.color]
  const Icon = config.icon
  const isUp = kpi.trend === 'up'

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <div
          className={`w-7 h-7 rounded-lg ${accent.bg} flex items-center justify-center`}
        >
          <Icon className={`w-3.5 h-3.5 ${accent.text}`} />
        </div>
        <span
          className={`flex items-center text-[11px] font-medium ${
            isUp ? 'text-emerald-500' : 'text-rose-500'
          }`}
        >
          {isUp ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {kpi.change}
        </span>
      </div>
      <div className="mt-2">
        <span className="font-display text-lg font-bold text-[#1A1A2E]">
          {kpi.value}
        </span>
        <div className="text-[10px] text-gray-400 mt-0.5">{kpi.title}</div>
      </div>
    </div>
  )
}

export default function BentoDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeNav, setActiveNav] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div
      className="h-full w-full overflow-y-auto bg-[#F8F9FA]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center h-14 px-6">
          <div className="flex items-center gap-2.5 mr-8">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-[#1A1A2E] text-sm tracking-tight">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveNav(item.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeNav === item.key
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-500 hover:text-[#1A1A2E] hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 w-48 rounded-lg border border-gray-200 bg-gray-50 text-xs text-[#1A1A2E] placeholder-gray-400 focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all duration-200"
              />
            </div>
            <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
              <Bell className="w-4 h-4 text-gray-500" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
          </div>
        </div>
      </nav>

      <div className="p-6">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridAutoRows: 'minmax(80px, auto)',
          }}
        >
          {/* Hero KPI - col 1-6, row 1-2 */}
          <div
            className="col-span-6 row-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-8 h-8 rounded-xl ${accentColors.indigo.bg} flex items-center justify-center`}
                >
                  <DollarSign
                    className={`w-4 h-4 ${accentColors.indigo.text}`}
                  />
                </div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {kpiData[0].title}
                </span>
              </div>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="font-display text-4xl font-bold text-[#1A1A2E]">
                  {kpiData[0].value}
                </span>
                <span
                  className={`flex items-center text-sm font-medium ${
                    kpiData[0].trend === 'up'
                      ? 'text-emerald-500'
                      : 'text-rose-500'
                  }`}
                >
                  {kpiData[0].trend === 'up' ? (
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  {kpiData[0].change}
                </span>
              </div>
            </div>
            <div className="h-24 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="heroGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#4f46e5"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="100%"
                        stopColor="#4f46e5"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fill="url(#heroGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* KPI 2 - col 7-8, row 1 */}
          <div className="col-span-2 row-span-1">
            <KpiCard kpi={kpiData[1]} index={1} />
          </div>

          {/* KPI 3 - col 9-10, row 1 */}
          <div className="col-span-2 row-span-1">
            <KpiCard kpi={kpiData[2]} index={2} />
          </div>

          {/* KPI 4 - col 11-12, row 1 */}
          <div className="col-span-2 row-span-1">
            <KpiCard kpi={kpiData[3]} index={3} />
          </div>

          {/* Quick Actions - col 7-10, row 2 */}
          <div
            className="col-span-4 row-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <h3 className="font-display text-sm font-semibold text-[#1A1A2E] mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: Plus, label: 'New', color: 'indigo' },
                { icon: Download, label: 'Export', color: 'emerald' },
                { icon: Filter, label: 'Filter', color: 'amber' },
                { icon: RefreshCw, label: 'Sync', color: 'rose' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${accentColors[action.color].bg} flex items-center justify-center`}
                  >
                    <action.icon
                      className={`w-3.5 h-3.5 ${accentColors[action.color].text}`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* KPI 5 - col 11-12, row 2 */}
          <div className="col-span-2 row-span-1">
            <KpiCard kpi={kpiData[4]} index={4} />
          </div>

          {/* Area Chart - col 1-8, row 3-4 */}
          <div
            className="col-span-8 row-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-semibold text-[#1A1A2E]">
                Revenue & Users
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span className="text-[10px] text-gray-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-gray-500">Users</span>
                </div>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="revenueGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#4f46e5"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="100%"
                        stopColor="#4f46e5"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="usersGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#10b981"
                        stopOpacity={0.15}
                      />
                      <stop
                        offset="100%"
                        stopColor="#10b981"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    fill="url(#revenueGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#usersGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Metrics - col 9-12, row 3-4 */}
          <div
            className="col-span-4 row-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <h3 className="font-display text-sm font-semibold text-[#1A1A2E] mb-4">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              {sideMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-600">
                      {metric.label}
                    </span>
                    <span className="text-xs font-semibold text-[#1A1A2E]">
                      {metric.value}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metric.color === 'indigo'
                          ? 'bg-indigo-600'
                          : metric.color === 'emerald'
                          ? 'bg-emerald-500'
                          : metric.color === 'amber'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart - col 1-5, row 5-6 */}
          <div
            className="col-span-5 row-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <h3 className="font-display text-sm font-semibold text-[#1A1A2E] mb-4">
              Weekly Activity
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar
                    dataKey="value"
                    fill="#4f46e5"
                    radius={[6, 6, 0, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table - col 6-12, row 5-6 */}
          <div
            className="col-span-7 row-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <h3 className="font-display text-sm font-semibold text-[#1A1A2E] mb-4">
              Team Members
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">
                      Name
                    </th>
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">
                      Role
                    </th>
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">
                      Status
                    </th>
                    <th className="text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wider pb-2.5">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors duration-150"
                    >
                      <td className="py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-[10px] font-semibold text-indigo-600">
                              {row.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-[#1A1A2E]">
                              {row.name}
                            </div>
                            <div className="text-[10px] text-gray-400">
                              {row.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <span className="text-xs text-gray-600">
                          {row.role}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="py-2.5">
                        <span className="text-xs text-gray-400">
                          {row.lastActive}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Feed - col 1-8, row 7 */}
          <div
            className="col-span-8 row-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <h3 className="font-display text-sm font-semibold text-[#1A1A2E] mb-3">
              Recent Activity
            </h3>
            <div className="space-y-2.5">
              {activityItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <span className="text-[8px] font-semibold text-gray-500">
                      {item.name
                        ? item.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                        : item.user
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-gray-600">
                      <span className="font-medium text-[#1A1A2E]">
                        {item.user}
                      </span>{' '}
                      {item.action}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* KPI 6 - col 9-12, row 7 */}
          <div
            className="col-span-4 row-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 rounded-xl ${accentColors.emerald.bg} flex items-center justify-center flex-shrink-0`}
            >
              <BarChart3
                className={`w-5 h-5 ${accentColors.emerald.text}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                {kpiData[5].title}
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-display text-xl font-bold text-[#1A1A2E]">
                  {kpiData[5].value}
                </span>
                <span
                  className={`flex items-center text-[11px] font-medium ${
                    kpiData[5].trend === 'up'
                      ? 'text-emerald-500'
                      : 'text-rose-500'
                  }`}
                >
                  {kpiData[5].trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {kpiData[5].change}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
