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
import { Search, Bell, TrendingUp, AlertCircle } from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, navItems } from '../data/mockData'

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

export default function NewsBroadcastDashboard() {
  const [activeNav, setActiveNav] = useState('overview')

  const kpis = kpiData.slice(0, 4)

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Breaking News Ticker */}
      <div className="flex items-center h-8 px-10 shrink-0" style={{ background: '#dc2626' }}>
        <div className="flex items-center gap-2 mr-6">
          <AlertCircle size={14} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">BREAKING</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap animate-pulse">
            <span className="text-xs font-semibold text-white">
              Market Update: Revenue up 15% this quarter • New product launch scheduled • Customer satisfaction reaches all-time high •
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex items-center justify-between px-10 h-14 border-b-2 border-black shrink-0">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="px-2 py-1" style={{ background: '#dc2626' }}>
              <span className="text-sm font-black text-white tracking-tight">
                NEWS
              </span>
            </div>
            <span className="text-sm font-bold tracking-tight text-black">
              Dashboard
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
        {/* Headline Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-black mb-2">QUARTERLY RESULTS EXCEED EXPECTATIONS</h1>
          <p className="text-sm text-black/60">Comprehensive analysis of performance metrics and key indicators</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <div
              key={kpi.title}
              className="p-4 border-2 border-black"
              style={{ background: index === 0 ? '#dc2626' : '#ffffff' }}
            >
              <p className={`text-xs font-bold mb-2 ${index === 0 ? 'text-white' : 'text-black'}`}>{kpi.title}</p>
              <p className={`text-2xl font-black mb-1 ${index === 0 ? 'text-white' : 'text-black'}`}>{kpi.value}</p>
              <div className="flex items-center gap-1">
                <TrendingUp size={12} className={index === 0 ? 'text-white' : 'text-green-600'} />
                <p className={`text-xs font-semibold ${index === 0 ? 'text-white' : 'text-green-600'}`}>{kpi.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Main Chart */}
          <div className="col-span-2 p-6 border-2 border-black">
            <h3 className="text-sm font-black mb-4 text-black uppercase">Revenue Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#000000" fontSize={12} tickLine={false} />
                <YAxis stroke="#000000" fontSize={12} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Stories */}
          <div className="p-6 border-2 border-black" style={{ background: '#f5f5f5' }}>
            <h3 className="text-sm font-black mb-4 text-black uppercase">Top Stories</h3>
            <div className="space-y-3">
              {barChartData.slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-white border-2 border-black">
                  <div className="w-8 h-8 flex items-center justify-center text-white font-black text-xs" style={{ background: '#dc2626' }}>
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-black mb-1">{item.name}</p>
                    <p className="text-xs text-black/60">Value: {item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="p-6 border-2 border-black">
          <h3 className="text-sm font-black mb-4 text-black uppercase">Live Updates</h3>
          <div className="grid grid-cols-3 gap-4">
            {tableData.slice(0, 6).map((item, i) => (
              <div key={i} className="p-4 border-2 border-black bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-black">{item.name}</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                <p className="text-3xl font-black text-black mb-2">{item.value}</p>
                <div className="h-1 bg-gray-200">
                  <div 
                    className="h-1 transition-all duration-700"
                    style={{ 
                      width: `${(item.value / 100) * 100}%`, 
                      background: '#dc2626' 
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
