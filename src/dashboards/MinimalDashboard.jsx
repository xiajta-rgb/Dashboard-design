import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Search } from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, navItems } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 text-xs shadow-sm">
      <p className="text-gray-500 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-gray-900">
          {entry.dataKey}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white border border-gray-200 px-3 py-2 text-xs shadow-sm">
      <p className="text-gray-500 mb-1">{label}</p>
      <p className="text-gray-900">{payload[0].value.toLocaleString()}</p>
    </div>
  )
}

export default function MinimalDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeNav, setActiveNav] = useState('overview')

  const kpis = kpiData.slice(0, 4)

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <nav className="flex items-center justify-between px-10 h-14 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-10">
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            Meridian
          </span>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveNav(item.key)}
                className={`text-xs tracking-wide transition-opacity duration-150 ${
                  activeNav === item.key
                    ? 'text-gray-900 opacity-100'
                    : 'text-gray-400 opacity-70 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search size={14} className="text-gray-300" />
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <div className="grid grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="py-5 transition-opacity duration-150 hover:opacity-80"
            >
              <p className="text-3xl font-light tracking-tight text-gray-900 mb-1">
                {kpi.value}
              </p>
              <p className="text-xs text-gray-400 tracking-wide mb-1">
                {kpi.title}
              </p>
              <p
                className={`text-xs tracking-wide ${
                  kpi.change.startsWith('+')
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {kpi.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div>
            <p className="text-xs text-gray-400 tracking-wide mb-5">
              Revenue &mdash; 12 Month
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={chartData}
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  dx={-5}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#111111"
                  strokeWidth={1.2}
                  dot={false}
                  activeDot={{ r: 2, fill: '#111111', strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2563EB"
                  strokeWidth={1.2}
                  dot={false}
                  activeDot={{ r: 2, fill: '#2563EB', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <p className="text-xs text-gray-400 tracking-wide mb-5">
              Weekly Volume
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={barChartData}
                margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
                barCategoryGap="30%"
              >
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  dx={-5}
                />
                <Tooltip content={<BarTooltip />} />
                <Bar
                  dataKey="value"
                  fill="#111111"
                  radius={[1, 1, 0, 0]}
                  maxBarSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-gray-400 tracking-wide mb-5">
            Team Members
          </p>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-normal text-gray-400 tracking-wide pb-3 pr-4">
                  Name
                </th>
                <th className="text-left text-xs font-normal text-gray-400 tracking-wide pb-3 pr-4">
                  Email
                </th>
                <th className="text-left text-xs font-normal text-gray-400 tracking-wide pb-3 pr-4">
                  Role
                </th>
                <th className="text-left text-xs font-normal text-gray-400 tracking-wide pb-3 pr-4">
                  Status
                </th>
                <th className="text-left text-xs font-normal text-gray-400 tracking-wide pb-3">
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 transition-opacity duration-150 hover:opacity-70"
                >
                  <td className="py-3 pr-4 text-sm text-gray-900">
                    {row.name}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-400">
                    {row.email}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-400">
                    {row.role}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-900">
                    {row.status}
                  </td>
                  <td className="py-3 text-sm text-gray-400">
                    {row.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-6 pt-2 pb-6">
          <button className="text-xs text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors duration-150">
            View all members
          </button>
          <button className="text-xs text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors duration-150">
            Export data
          </button>
          <button className="text-xs text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors duration-150">
            Generate report
          </button>
        </div>
      </main>
    </div>
  )
}
