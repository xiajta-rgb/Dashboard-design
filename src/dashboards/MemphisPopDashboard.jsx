import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { Search, Bell, Star } from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, navItems } from '../data/mockData'

const COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white border-3 border-black px-3 py-2 text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <p className="text-black mb-1 font-bold">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-black font-semibold">
          {entry.dataKey}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function MemphisPopDashboard() {
  const [activeNav, setActiveNav] = useState('overview')

  const kpis = kpiData.slice(0, 4)

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#ffffff' }}>
      <nav className="flex items-center justify-between px-10 h-14 border-b-3 border-black shrink-0" style={{ background: '#fff5f5' }}>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full" style={{ background: '#ff6b6b' }}></div>
            <span className="text-sm font-bold tracking-tight text-black">
              Memphis Pop
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

      <main className="flex-1 overflow-y-auto px-10 py-8" style={{ background: '#ffffff' }}>
        <div className="grid grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, index) => (
            <div
              key={kpi.title}
              className="p-5 border-3 border-black transition-all hover:translate-x-1 hover:translate-y-1"
              style={{ 
                background: COLORS[index % COLORS.length],
                boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                borderRadius: '8px'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-black">{kpi.title}</p>
                <Star size={16} className="text-black" fill="black" />
              </div>
              <p className="text-2xl font-bold mb-1 text-black">{kpi.value}</p>
              <p className="text-xs font-semibold text-black/70">{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="col-span-2 p-6 border-3 border-black" style={{ background: '#ffffff', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', borderRadius: '8px' }}>
            <h3 className="text-sm font-bold mb-4 text-black">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#000000" fontSize={12} tickLine={false} />
                <YAxis stroke="#000000" fontSize={12} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#4ecdc4" strokeWidth={4} dot={{ fill: '#ff6b6b', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 border-3 border-black" style={{ background: '#ffe66d', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', borderRadius: '8px' }}>
            <h3 className="text-sm font-bold mb-4 text-black">Top Products</h3>
            <div className="space-y-3">
              {barChartData.slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white border-2 border-black" style={{ borderRadius: '8px' }}>
                  <span className="text-xs font-bold text-black">{item.name}</span>
                  <span className="text-xs font-bold text-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-3 border-black" style={{ background: '#95e1d3', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', borderRadius: '8px' }}>
          <h3 className="text-sm font-bold mb-4 text-black">Recent Activity</h3>
          <div className="grid grid-cols-3 gap-4">
            {tableData.slice(0, 6).map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-between p-4 bg-white border-3 border-black" style={{ borderRadius: '8px', boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)' }}>
                <span className="text-xs font-bold text-black mb-2">{item.name}</span>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: COLORS[i % COLORS.length] }}
                >
                  <span className="text-lg font-bold text-black">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
