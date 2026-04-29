import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  Filter,
  Thermometer,
  Zap,
  RefreshCw,
  Activity,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function HeatmapScientificDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedSensor, setSelectedSensor] = useState('sensor1')
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef(null)

  const heatmapColors = [
    '#1a0a2e', '#2d1b69', '#5b21b6', '#7c3aed', '#a78bfa',
    '#c4b5fd', '#fbbf24', '#f59e0b', '#ef4444', '#dc2626'
  ]

  const sensorData = [
    { id: 'sensor1', name: 'Sensor A', location: 'Center', type: 'Thermocouple' },
    { id: 'sensor2', name: 'Sensor B', location: 'North', type: 'IR' },
    { id: 'sensor3', name: 'Sensor C', location: 'East', type: 'Thermocouple' },
    { id: 'sensor4', name: 'Sensor D', location: 'West', type: 'IR' }
  ]

  const timeSeriesData = Array.from({ length: 30 }, (_, i) => ({
    time: `${(10+i)%24}:00`,
    temp1: 30 + Math.sin(i * 0.4) * 20 + Math.random() * 8,
    temp2: 35 + Math.cos(i * 0.3) * 18 + Math.random() * 6,
    temp3: 28 + Math.sin(i * 0.5) * 22 + Math.random() * 10,
    temp4: 32 + Math.cos(i * 0.45) * 16 + Math.random() * 7
  }))

  const experimentData = [
    { label: 'Control', temp: 45.2, std: 3.2, n: 24 },
    { label: 'Exp-1', temp: 72.5, std: 4.8, n: 24 },
    { label: 'Exp-2', temp: 68.3, std: 4.1, n: 24 },
    { label: 'Exp-3', temp: 85.1, std: 5.5, n: 24 },
    { label: 'Exp-4', temp: 61.7, std: 3.9, n: 24 }
  ]

  const generateHeatmap = (rows, cols, time) => Array.from({ length: rows }, (_, rowIdx) =>
    Array.from({ length: cols }, (_, colIdx) => {
      const centerX = cols / 2
      const centerY = rows / 2
      const dist = Math.sqrt(Math.pow(colIdx - centerX, 2) + Math.pow(rowIdx - centerY, 2))
      const wave = Math.sin(dist * 0.3 + time * 0.5) * 20
      return 30 + dist * 4 + wave + Math.random() * 10
    })
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const time = animating ? Date.now() / 1000 : 0
    
    const heatmap = generateHeatmap(16, 24, time)
    const cellWidth = canvas.width / 24
    const cellHeight = canvas.height / 16
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    heatmap.forEach((row, rowIdx) => {
      row.forEach((value, colIdx) => {
        const normalizedValue = Math.min(Math.max((value - 20) / 90, 0), 1)
        const colorIdx = Math.floor(normalizedValue * (heatmapColors.length - 1))
        ctx.fillStyle = heatmapColors[colorIdx]
        ctx.fillRect(colIdx * cellWidth, rowIdx * cellHeight, cellWidth, cellHeight)
      })
    })
    
    const centerX = (canvas.width / 2) + Math.sin(time) * 20
    const centerY = (canvas.height / 2) + Math.cos(time * 0.8) * 15
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.stroke()
    ctx.setLineDash([])
    
  }, [animating])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0a0a14' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0e0e1a', borderRight: '1px solid #1a1a30' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#ffaa00' }}>THERMAL</h1>
          <svg width="50" height="16" viewBox="0 0 50 16" className="mt-1">
            <circle cx="25" cy="8" r="6" fill="none" stroke="#ffaa00" strokeWidth="0.5" />
            <ellipse cx="25" cy="8" rx="12" ry="4" fill="none" stroke="#ffaa00" strokeWidth="0.3" transform="rotate(-20,25,8)" />
            <circle cx="25" cy="8" r="2" fill="#ffaa00" opacity="0.3" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#ffaa00]' : 'text-[#1a1a30] hover:text-[#ffaa0080]'}`}
                style={isActive ? { background: '#ffaa0008', borderLeft: '2px solid #ffaa00' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0e0e1a', borderBottom: '1px solid #1a1a30' }}>
          <h2 className="text-sm font-bold" style={{ color: '#ffaa00' }}>Thermal Analysis Results</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded" style={{ background: '#0a0a14', border: '1px solid #1a1a30' }}>
              <button onClick={() => setAnimating(!animating)} className="p-0.5 cursor-pointer">
                {animating ? <Activity className="w-3.5 h-3.5" style={{ color: '#ffaa00' }} /> : <RefreshCw className="w-3.5 h-3.5" style={{ color: '#ffaa00' }} />}
              </button>
              <span className="text-xs font-mono" style={{ color: '#ffaa00' }}>{animating ? 'Animating' : 'Static'}</span>
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#1a1a30' }} /><input type="text" placeholder="Search experiments..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#0a0a14', border: '1px solid #1a1a30', color: '#ffaa00' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#1a1a30' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Mean Temp', value: '54.2°C', icon: Thermometer, color: '#a78bfa' },
              { label: 'Std Dev', value: '±12.8', icon: Activity, color: '#fbbf24' },
              { label: 'Max Temp', value: '98.7°C', icon: Zap, color: '#ef4444' },
              { label: 'Samples', value: '96', icon: Filter, color: '#7c3aed' }
            ].map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <div key={i} className="p-4" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
                  <Icon className="w-4 h-4 mb-1" style={{ color: kpi.color }} />
                  <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#666' }}>{kpi.label}</p>
                  <p className="text-lg font-bold mb-1" style={{ color: '#ffaa00' }}>{kpi.value}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure A. Temperature Distribution</h3>
                <select 
                  value={selectedSensor}
                  onChange={(e) => setSelectedSensor(e.target.value)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: '#0a0a14', border: '1px solid #1a1a30', color: '#ffaa00' }}
                >
                  {sensorData.map(sensor => (
                    <option key={sensor.id} value={sensor.id}>{sensor.name}</option>
                  ))}
                </select>
              </div>
              <canvas ref={canvasRef} width={480} height={240} className="w-full rounded" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }} />
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs" style={{ color: '#666' }}>20°C</span>
                <div className="flex-1 flex h-2 rounded overflow-hidden">
                  {heatmapColors.map((color, i) => (
                    <div key={i} className="flex-1" style={{ background: color }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: '#666' }}>110°C</span>
              </div>
            </div>
            <div className="p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure B. Group Comparison</h3>
              <div className="space-y-3">
                {experimentData.map((exp, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#0a0a14' }}>
                    <div className="flex justify-between text-[9px] mb-1">
                      <span style={{ color: '#ddd' }} className="font-bold">{exp.label}</span>
                      <span style={{ color: heatmapColors[i * 2] }}>{exp.temp}°C</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[7px]" style={{ color: '#666' }}>
                      <span>σ: {exp.std}</span>
                      <span>n: {exp.n}</span>
                    </div>
                    <div className="h-1 mt-1" style={{ background: '#0a0a14' }}><div className="h-1" style={{ width: `${exp.temp}%`, background: heatmapColors[i * 2] }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure C. Time Series (24h)</h3>
              <svg viewBox="0 0 400 160" className="w-full">
                {[0, 20, 40, 60, 80, 100].map(y => (
                  <g key={y}>
                    <line x1="40" y1={140-y*1.2} x2="380" y2={140-y*1.2} stroke="#1a1a30" strokeWidth="0.5" />
                    <text x="35" y={140-y*1.2+3} fill="#666" fontSize="7">{(20+y)}°C</text>
                  </g>
                ))}
                {timeSeriesData.slice(0, 15).map((data, i) => (
                  <text key={i} x={50+i*24} y="155" textAnchor="middle" fill="#666" fontSize="7">{data.time}</text>
                ))}
                <path d={timeSeriesData.slice(0, 15).map((d, i) => `${i===0?'M':'L'}${50+i*24},${140-(d.temp1-20)*1.2}`).join(' ')} fill="none" stroke="#ffaa00" strokeWidth="2" />
                <path d={timeSeriesData.slice(0, 15).map((d, i) => `${i===0?'M':'L'}${50+i*24},${140-(d.temp2-20)*1.2}`).join(' ')} fill="none" stroke="#ef4444" strokeWidth="2" />
                <path d={timeSeriesData.slice(0, 15).map((d, i) => `${i===0?'M':'L'}${50+i*24},${140-(d.temp3-20)*1.2}`).join(' ')} fill="none" stroke="#a78bfa" strokeWidth="2" />
                <path d={timeSeriesData.slice(0, 15).map((d, i) => `${i===0?'M':'L'}${50+i*24},${140-(d.temp4-20)*1.2}`).join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4,2" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#1a1a30" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="140" stroke="#1a1a30" strokeWidth="1" />
                <text x="390" y="155" textAnchor="end" fill="#666" fontSize="7">Time</text>
              </svg>
            </div>
            <div className="p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure D. Sensor Network</h3>
              <div className="grid grid-cols-2 gap-3">
                {sensorData.map((sensor, i) => {
                  const colors = ['#ffaa00', '#ef4444', '#a78bfa', '#7c3aed']
                  return (
                    <div key={i} className="p-3 rounded" style={{ background: '#0a0a14', border: '1px solid #1a1a30' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: colors[i] }} />
                        <span className="text-xs font-bold" style={{ color: colors[i] }}>{sensor.name}</span>
                      </div>
                      <p className="text-[8px]" style={{ color: '#666' }}>Location: {sensor.location}</p>
                      <p className="text-[8px]" style={{ color: '#666' }}>Type: {sensor.type}</p>
                      <p className="text-[9px] font-mono mt-1" style={{ color: colors[i] }}>
                        {(30 + i * 8 + Math.sin(Date.now()/1000 + i) * 5).toFixed(1)}°C
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0e0e1a', border: '1px solid #1a1a30' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#666' }}>Sensor Readings Log</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#1a1a30' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #1a1a30' }}>{['Sensor ID', 'Time', 'Temperature', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#666' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'S001', time: '10:23:45', temp: '68.2°C', status: 'OK' },
                  { id: 'S002', time: '10:23:46', temp: '72.5°C', status: 'OK' },
                  { id: 'S003', time: '10:23:47', temp: '59.8°C', status: 'OK' },
                  { id: 'S004', time: '10:23:48', temp: '85.1°C', status: 'Warning' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0a0a14' }}>
                    <td className="py-2.5 px-3 text-xs font-bold" style={{ color: '#ffaa00' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#666' }}>{row.time}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#a78bfa' }}>{row.temp}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium" style={{ color: row.status === 'OK' ? '#4aaa6a' : '#ffaa4a' }}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}