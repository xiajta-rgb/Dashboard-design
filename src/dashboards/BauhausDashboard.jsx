import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Menu, Search, Bell } from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, navItems } from '../data/mockData'

const COLORS = ['#ff0000', '#0000ff', '#ffff00', '#000000']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white border-2 border-black px-3 py-2 text-xs shadow-none">
      <p className="text-black mb-1 font-bold">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-black font-semibold">
          {entry.dataKey}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function BauhausDashboard() {
  const [activeNav, setActiveNav] = useState('overview')

  const kpis = kpiData.slice(0, 4)

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#ffffff' }}>
      <nav className="flex items-center justify-between px-10 h-14 border-b-2 border-black shrink-0">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6" style={{ background: '#ff0000' }}></div>
            <span className="text-sm font-bold tracking-tight text-black">
              Bauhaus
            </span>
          </div>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`text-xs tracking-wide font-bold transition-all ${
                  activeNav === item.key
                    ? 'text-black underline underline-offset-4'
                    : 'text-black/50 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search size={14} className="text-black/50" />
          <Bell size={14} className="text-black/50" />
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <div className="grid grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, index) => (
            <div
              key={kpi.title}
              className="p-5 border-2 border-black transition-all hover:translate-x-1 hover:translate-y-1"
              style={{ background: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-black">{kpi.title}</p>
                <div 
                  className="w-3 h-3" 
                  style={{ background: COLORS[index % COLORS.length] }}
                ></div>
              </div>
              <p className="text-2xl font-bold mb-1 text-black">{kpi.value}</p>
              <p className="text-xs font-semibold text-black/60">{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="col-span-2 p-6 border-2 border-black" style={{ background: '#ffffff' }}>
            <h3 className="text-sm font-bold mb-4 text-black">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#000000" fontSize={12} tickLine={false} />
                <YAxis stroke="#000000" fontSize={12} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#ff0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 border-2 border-black" style={{ background: '#ffffff' }}>
            <h3 className="text-sm font-bold mb-4 text-black">Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={barChartData.slice(0, 4)}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  dataKey="value"
                  stroke="#000000"
                  strokeWidth={2}
                >
                  {barChartData.slice(0, 4).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 border-2 border-black" style={{ background: '#f5f5f5' }}>
          <h3 className="text-sm font-bold mb-4 text-black">Recent Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            {tableData.slice(0, 6).map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border-2 border-black bg-white">
                <span className="text-xs font-bold text-black">{item.name}</span>
                <div className="flex items-center gap-3">
                  <div 
                    className="h-2" 
                    style={{ 
                      width: `${(item.value / 100) * 100}px`, 
                      background: COLORS[i % COLORS.length] 
                    }}
                  ></div>
                  <span className="text-xs font-bold text-black">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
