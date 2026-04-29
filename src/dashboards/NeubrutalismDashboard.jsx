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
  LayoutDashboard,
  Settings,
  Search,
  Bell,
  Download,
  Filter,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, sidebarItems , sidebarIcons } from '../data/mockData'



const BRUTAL_COLORS = {
  yellow: { bg: '#FFD600', text: '#000', border: '#000' },
  pink: { bg: '#FF6B9D', text: '#000', border: '#000' },
  blue: { bg: '#4361EE', text: '#fff', border: '#000' },
  green: { bg: '#06D6A0', text: '#000', border: '#000' },
  orange: { bg: '#FF9F1C', text: '#000', border: '#000' },
  purple: { bg: '#7B2FF7', text: '#fff', border: '#000' },
}

const kpiColors = ['yellow', 'pink', 'blue', 'green']
const kpiIconMap = [DollarSign, Users, Activity, Clock]

const brutalShadow = '4px 4px 0px #000'
const brutalShadowHover = '6px 6px 0px #000'

export default function NeubrutalismDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#FFF9E6' }}>
      {/* Top Navigation */}
      <nav className="h-14 flex items-center justify-between px-6 border-b-4 border-black shrink-0" style={{ background: '#fff' }}>
        <div className="flex items-center gap-6">
          <div className="px-3 py-1.5 border-2 border-black font-display font-black text-lg tracking-tight" style={{ background: '#FFD600', boxShadow: brutalShadow }}>
            BRUTAL
          </div>
          {['Overview', 'Analytics', 'Users', 'Reports', 'Settings'].map((item) => (
            <button key={item} onClick={item === 'Settings' ? openLayoutLib : undefined} className="text-sm font-bold text-black hover:underline cursor-pointer">
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-white" style={{ boxShadow: brutalShadow }}>
            <Search size={14} />
            <input type="text" placeholder="Search..." className="text-sm border-none outline-none bg-transparent w-32" />
          </div>
          <button className="p-2 border-2 border-black bg-white cursor-pointer" style={{ boxShadow: brutalShadow }}>
            <Bell size={16} />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 flex-shrink-0 border-r-4 border-black py-4 px-3 flex flex-col overflow-y-auto" style={{ background: '#FFF9E6' }}>
          <div className="flex flex-col gap-2 flex-1">
            {sidebarItems.map((item) => {
              const Icon = sidebarIcons[item.key] || LayoutDashboard
              const isActive = activeNav === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveNav(item.key)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 cursor-pointer border-2 border-black"
                  style={{
                    background: isActive ? '#FFD600' : '#fff',
                    boxShadow: isActive ? brutalShadow : '2px 2px 0px #000',
                    transform: isActive ? 'translate(-1px, -1px)' : 'none',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h1 className="font-display font-black text-3xl tracking-tight">DASHBOARD</h1>
            <p className="text-sm text-gray-600 mt-1">Raw data, no filter.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            {kpiData.slice(0, 4).map((kpi, i) => {
              const Icon = kpiIconMap[i]
              const color = BRUTAL_COLORS[kpiColors[i]]
              return (
                <div
                  key={kpi.title}
                  className="p-5 border-2 border-black transition-all duration-150 cursor-default"
                  style={{ background: color.bg, boxShadow: brutalShadow }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = brutalShadowHover; e.currentTarget.style.transform = 'translate(-2px, -2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = brutalShadow; e.currentTarget.style.transform = 'translate(0, 0)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center" style={{ boxShadow: '2px 2px 0px #000' }}>
                      <Icon size={20} color="#000" />
                    </div>
                    <span className="text-sm font-black">{kpi.change}</span>
                  </div>
                  <p className="font-display font-black text-2xl tracking-tight">{kpi.value}</p>
                  <p className="text-xs font-bold mt-1 uppercase tracking-wider opacity-70">{kpi.title}</p>
                </div>
              )
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 border-2 border-black bg-white" style={{ boxShadow: brutalShadow }}>
              <h3 className="font-display font-black text-sm mb-4 uppercase tracking-wider">Revenue</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.15} />
                  <XAxis dataKey="name" tick={{ fill: '#000', fontSize: 10, fontWeight: 700 }} axisLine={{ stroke: '#000' }} tickLine={{ stroke: '#000' }} />
                  <YAxis tick={{ fill: '#000', fontSize: 10, fontWeight: 700 }} axisLine={{ stroke: '#000' }} tickLine={{ stroke: '#000' }} />
                  <Tooltip contentStyle={{ border: '2px solid #000', borderRadius: '0', fontSize: '11px', fontWeight: 600, boxShadow: brutalShadow }} />
                  <Line type="monotone" dataKey="revenue" stroke="#4361EE" strokeWidth={3} dot={false} name="Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-5 border-2 border-black bg-white" style={{ boxShadow: brutalShadow }}>
              <h3 className="font-display font-black text-sm mb-4 uppercase tracking-wider">Weekly</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000" strokeOpacity={0.15} />
                  <XAxis dataKey="name" tick={{ fill: '#000', fontSize: 10, fontWeight: 700 }} axisLine={{ stroke: '#000' }} tickLine={{ stroke: '#000' }} />
                  <YAxis tick={{ fill: '#000', fontSize: 10, fontWeight: 700 }} axisLine={{ stroke: '#000' }} tickLine={{ stroke: '#000' }} />
                  <Tooltip contentStyle={{ border: '2px solid #000', borderRadius: '0', fontSize: '11px', fontWeight: 600, boxShadow: brutalShadow }} />
                  <Bar dataKey="value" fill="#FF6B9D" stroke="#000" strokeWidth={2} radius={[0, 0, 0, 0]} barSize={28} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table */}
          <div className="p-5 border-2 border-black bg-white" style={{ boxShadow: brutalShadow }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-black text-sm uppercase tracking-wider">Team Members</h3>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-black text-xs font-bold cursor-pointer" style={{ background: '#FFD600', boxShadow: brutalShadow }}>
                  <Filter size={12} />
                  Filter
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-black text-xs font-bold cursor-pointer" style={{ background: '#4361EE', color: '#fff', boxShadow: brutalShadow }}>
                  <Download size={12} />
                  Export
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-black">
                  {['Name', 'Role', 'Status', 'Last Active'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-black uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-yellow-50 transition-colors duration-150">
                    <td className="px-4 py-3 text-sm font-bold">{row.name}</td>
                    <td className="px-4 py-3 text-sm">{row.role}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 border border-black text-[10px] font-black" style={{
                        background: row.status === 'Active' ? '#06D6A0' : row.status === 'Pending' ? '#FFD600' : '#e5e5e5',
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{row.lastActive}</td>
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
