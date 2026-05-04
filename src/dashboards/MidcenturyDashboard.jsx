import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { Search, Bell } from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, navItems } from '../data/mockData'

const COLORS = ['#c47a5a', '#e8c8b0', '#a85a3a', '#d4a574']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="px-3 py-2 text-xs shadow-md" style={{ background: '#faf5f0', border: '1px solid #e8c8b0' }}>
      <p className="mb-1" style={{ color: '#5a4a3a' }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: '#c47a5a', fontWeight: 600 }}>
          {entry.dataKey}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function MidcenturyDashboard() {
  const [activeNav, setActiveNav] = useState('overview')

  const kpis = kpiData.slice(0, 4)

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#faf5f0' }}>
      <nav className="flex items-center justify-between px-10 h-14 border-b shrink-0" style={{ background: '#f0ebe3', borderColor: '#e8c8b0' }}>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full" style={{ background: '#c47a5a' }}></div>
            <span className="text-sm font-semibold tracking-tight" style={{ color: '#5a4a3a' }}>
              Midcentury
            </span>
          </div>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`text-xs tracking-wide transition-all ${
                  activeNav === item.key
                    ? 'font-semibold'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ color: '#5a4a3a' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search size={14} style={{ color: '#a89a8a' }} />
          <Bell size={14} style={{ color: '#a89a8a' }} />
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <div className="grid grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi, index) => (
            <div
              key={kpi.title}
              className="p-5 transition-all duration-500 hover:scale-105"
              style={{ 
                background: index % 2 === 0 ? '#ffffff' : '#f0ebe3',
                border: '1px solid #e8c8b0',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(196, 122, 90, 0.15)'
              }}
            >
              <p className="text-xs mb-2" style={{ color: '#a89a8a' }}>{kpi.title}</p>
              <p className="text-2xl font-bold mb-1" style={{ color: '#5a4a3a' }}>{kpi.value}</p>
              <p className="text-xs font-medium" style={{ color: '#c47a5a' }}>{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="col-span-2 p-6" style={{ background: '#ffffff', border: '1px solid #e8c8b0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(196, 122, 90, 0.15)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#5a4a3a' }}>Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="midcenturyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c47a5a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#c47a5a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#a89a8a" fontSize={12} />
                <YAxis stroke="#a89a8a" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#c47a5a" fill="url(#midcenturyGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6" style={{ background: '#e8c8b0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(196, 122, 90, 0.2)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#5a4a3a' }}>Performance</h3>
            <div className="space-y-4">
              {barChartData.slice(0, 5).map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: '#5a4a3a' }}>{item.name}</span>
                    <span className="text-xs font-semibold" style={{ color: '#c47a5a' }}>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: '#f0ebe3' }}>
                    <div 
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ 
                        width: `${(item.value / 100) * 100}%`, 
                        background: COLORS[i % COLORS.length] 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6" style={{ background: '#ffffff', border: '1px solid #e8c8b0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(196, 122, 90, 0.15)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#5a4a3a' }}>Recent Activity</h3>
          <div className="grid grid-cols-3 gap-4">
            {tableData.slice(0, 6).map((item, i) => (
              <div key={i} className="p-4" style={{ background: '#f0ebe3', borderRadius: '12px' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium" style={{ color: '#a89a8a' }}>{item.name}</span>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: COLORS[i % COLORS.length] }}
                  >
                    <span className="text-sm font-bold" style={{ color: '#ffffff' }}>{item.value}</span>
                  </div>
                </div>
                <div className="h-1 rounded-full" style={{ background: '#e8c8b0' }}>
                  <div 
                    className="h-1 rounded-full transition-all duration-700"
                    style={{ 
                      width: `${(item.value / 100) * 100}%`, 
                      background: COLORS[i % COLORS.length] 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
