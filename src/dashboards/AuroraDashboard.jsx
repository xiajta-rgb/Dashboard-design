import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { Search, Zap } from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, navItems } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 text-xs shadow-sm">
      <p className="text-white/60 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-white">
          {entry.dataKey}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function AuroraDashboard() {
  const [activeNav, setActiveNav] = useState('overview')

  const kpis = kpiData.slice(0, 4)

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0f0f2a 50%, #1a2a4a 100%)' }}>
      <nav className="flex items-center justify-between px-10 h-14 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-10">
          <span className="text-sm font-semibold tracking-tight" style={{ color: '#00ff88' }}>
            Aurora
          </span>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveNav(item.key)}
                className={`text-xs tracking-wide transition-all duration-300 ${
                  activeNav === item.key
                    ? 'text-white opacity-100'
                    : 'text-white/40 opacity-70 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search size={14} className="text-white/30" />
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <div className="grid grid-cols-4 gap-6 mb-10">
          {kpis.map((kpi) => (
            <div
              key={kpi.title}
              className="p-5 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <p className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{kpi.title}</p>
              <p className="text-2xl font-bold mb-1" style={{ color: '#ffffff' }}>{kpi.value}</p>
              <p className="text-xs" style={{ color: '#00ff88' }}>{kpi.change}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="col-span-2 p-6 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#ffffff' }}>Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="auroraGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#00ff88" fill="url(#auroraGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#ffffff' }}>Activity</h3>
            <div className="space-y-3">
              {tableData.slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.name}</span>
                  <span className="text-xs font-semibold" style={{ color: '#00ff88' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
