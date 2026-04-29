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
  DollarSign,
  Users,
  Activity,
  Clock,
  LayoutDashboard,
  Settings,
  Search,
  Bell,
  ChevronRight,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, sidebarItems , sidebarIcons } from '../data/mockData'



const kpiIcons = [DollarSign, Users, Activity, Clock]

export default function StripePremiumDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: '#F6F9FC' }}>
      {/* Top Navigation - Stripe style */}
      <nav className="h-14 flex items-center justify-between px-6 shrink-0 border-b" style={{ background: '#fff', borderColor: '#E3E8EE' }}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6" style={{ background: 'linear-gradient(135deg, #635BFF, #7A73FF)' }}>
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.27 12.825.27c-3.215 0-5.573.831-7.05 2.568C4.367 4.526 3.93 6.487 4.22 8.544c.831 5.017 4.29 7.306 8.362 8.715 1.946.67 2.718 1.23 2.718 2.173 0 .962-.806 1.521-2.272 1.521-1.766 0-4.545-.831-6.634-2.173l-.912 5.554c1.766.962 4.545 1.708 7.594 1.708 3.182 0 5.573-.788 7.142-2.43 1.551-1.66 2.173-4.018 1.883-6.837-.623-4.575-4.018-6.837-8.36-8.223l.235.026z" fill="white"/>
              </svg>
            </div>
            <span className="font-semibold text-gray-800 text-sm">Stripe</span>
          </div>
          <div className="flex items-center gap-1">
            {['Overview', 'Payments', 'Customers', 'Products', 'Settings'].map((item) => (
              <button key={item} onClick={item === 'Settings' ? openLayoutLib : undefined} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 cursor-pointer">
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-1.5 rounded-lg border text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#635BFF]/20 focus:border-[#635BFF] transition-all duration-150"
              style={{ borderColor: '#E3E8EE' }}
            />
          </div>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Bell size={16} className="text-gray-500" />
          </button>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#635BFF] to-[#7A73FF] flex items-center justify-center">
            <span className="text-white text-[10px] font-semibold">SC</span>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 bg-white border-r py-5 px-3 flex flex-col" style={{ borderColor: '#E3E8EE' }}>
          <div className="flex flex-col gap-0.5 flex-1">
            {sidebarItems.map((item) => {
              const Icon = sidebarIcons[item.key] || LayoutDashboard
              const isActive = activeNav === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveNav(item.key)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer"
                  style={{
                    color: isActive ? '#635BFF' : '#425466',
                    background: isActive ? '#F0EEFF' : 'transparent',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span style={{ fontWeight: isActive ? 600 : 400 }}>{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#635BFF]" />}
                </button>
              )
            })}
          </div>

          <div className="mt-auto pt-4 border-t" style={{ borderColor: '#E3E8EE' }}>
            <div className="p-3 rounded-lg bg-gradient-to-br from-[#635BFF]/5 to-[#7A73FF]/5 border" style={{ borderColor: '#E3E8EE' }}>
              <p className="text-xs font-medium text-gray-700">Plan</p>
              <p className="text-sm font-semibold text-[#635BFF]">Pro</p>
              <div className="mt-2 h-1 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#635BFF] to-[#7A73FF]" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">75% of limit used</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Overview</h1>
            <p className="text-sm text-gray-500 mt-0.5">Your business metrics at a glance.</p>
          </div>

          {/* KPI Cards - Stripe style */}
          <div className="grid grid-cols-4 gap-4">
            {kpiData.slice(0, 4).map((kpi, i) => {
              const Icon = kpiIcons[i]
              return (
                <div
                  key={kpi.title}
                  className="bg-white rounded-xl p-5 border transition-all duration-150 cursor-default hover:shadow-sm"
                  style={{ borderColor: '#E3E8EE' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#F0EEFF' }}>
                      <Icon size={18} color="#635BFF" />
                    </div>
                    <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                  <p className="text-xl font-semibold text-gray-900">{kpi.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{kpi.title}</p>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 border" style={{ borderColor: '#E3E8EE' }}>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Revenue</h3>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="stripeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#635BFF" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#635BFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EE" />
                  <XAxis dataKey="name" tick={{ fill: '#8898AA', fontSize: 10 }} axisLine={{ stroke: '#E3E8EE' }} tickLine={false} />
                  <YAxis tick={{ fill: '#8898AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ border: 'none', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#635BFF" strokeWidth={2} fill="url(#stripeGradient)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-5 border" style={{ borderColor: '#E3E8EE' }}>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Weekly Volume</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E3E8EE" />
                  <XAxis dataKey="name" tick={{ fill: '#8898AA', fontSize: 10 }} axisLine={{ stroke: '#E3E8EE' }} tickLine={false} />
                  <YAxis tick={{ fill: '#8898AA', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ border: 'none', borderRadius: '8px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" fill="#635BFF" radius={[4, 4, 0, 0]} barSize={28} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#E3E8EE' }}>
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E3E8EE' }}>
              <h3 className="text-sm font-medium text-gray-900">Recent Payments</h3>
              <button className="text-xs text-[#635BFF] hover:text-[#4F46E5] transition-colors duration-150 cursor-pointer">
                View All
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: '#E3E8EE' }}>
                  {['Name', 'Email', 'Role', 'Status', 'Last Active'].map(h => (
                    <th key={h} className="text-left px-5 py-2.5 text-[10px] font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 transition-colors duration-150" style={{ borderColor: '#F3F5F8' }}>
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{row.name}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{row.email}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{row.role}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium" style={{
                        background: row.status === 'Active' ? '#E6F7EE' : row.status === 'Pending' ? '#FFF4E5' : '#F3F5F8',
                        color: row.status === 'Active' ? '#1B8A42' : row.status === 'Pending' ? '#B26A00' : '#6B7C93',
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{row.lastActive}</td>
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
