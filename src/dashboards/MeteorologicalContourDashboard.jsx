import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Filter,
  Wind,
  Thermometer,
  Droplets,
  Cloud,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function MeteorologicalContourDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedVariable, setSelectedVariable] = useState('temperature')
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef(null)

  const timeSeriesData = [
    { time: '00:00', temp: 18.2, pressure: 1015.8, wind: 12.4, humidity: 75 },
    { time: '03:00', temp: 16.8, pressure: 1016.5, wind: 10.8, humidity: 80 },
    { time: '06:00', temp: 15.4, pressure: 1017.2, wind: 9.2, humidity: 85 },
    { time: '09:00', temp: 18.6, pressure: 1016.8, wind: 11.5, humidity: 78 },
    { time: '12:00', temp: 22.4, pressure: 1015.2, wind: 14.2, humidity: 68 },
    { time: '15:00', temp: 24.8, pressure: 1013.8, wind: 16.8, humidity: 62 },
    { time: '18:00', temp: 22.2, pressure: 1013.2, wind: 14.5, humidity: 65 },
    { time: '21:00', temp: 19.8, pressure: 1014.0, wind: 12.2, humidity: 72 },
  ]

  const stationData = [
    { id: 'STN-54511', lat: 39.9, lon: 116.4, temp: 22.4, pressure: 1018.2, wind: 14.2, humidity: 68, status: 'Online' },
    { id: 'STN-58362', lat: 31.2, lon: 121.5, temp: 24.1, pressure: 1015.8, wind: 16.5, humidity: 72, status: 'Online' },
    { id: 'STN-59287', lat: 23.1, lon: 113.3, temp: 26.8, pressure: 1010.4, wind: 18.8, humidity: 78, status: 'Maintenance' },
    { id: 'STN-59431', lat: 30.6, lon: 104.1, temp: 20.2, pressure: 1020.1, wind: 10.2, humidity: 65, status: 'Online' },
    { id: 'STN-57494', lat: 22.5, lon: 114.1, temp: 27.1, pressure: 1009.5, wind: 20.1, humidity: 80, status: 'Online' },
  ]

  const windRoseData = [
    { dir: 'N', freq: 12, speed: 14 },
    { dir: 'NE', freq: 8, speed: 10 },
    { dir: 'E', freq: 15, speed: 16 },
    { dir: 'SE', freq: 20, speed: 18 },
    { dir: 'S', freq: 18, speed: 15 },
    { dir: 'SW', freq: 10, speed: 12 },
    { dir: 'W', freq: 7, speed: 9 },
    { dir: 'NW', freq: 10, speed: 11 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const time = animating ? Date.now() / 1000 : 0

    const drawContour = (centerX, centerY, radius, color, alpha) => {
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${color}, ${alpha})`
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const tempColors = [
      [255, 100, 74], [255, 153, 51], [255, 204, 51], [204, 255, 51], [153, 255, 51],
      [51, 255, 102], [51, 255, 204], [51, 204, 255], [51, 153, 255], [74, 100, 255]
    ]

    const centers = [
      { x: 120 + Math.sin(time) * 5, y: 80 + Math.cos(time * 0.8) * 3 },
      { x: 320 - Math.sin(time * 0.7) * 4, y: 120 - Math.cos(time) * 5 },
      { x: 220 + Math.sin(time * 1.2) * 3, y: 160 + Math.cos(time * 0.6) * 4 },
    ]

    centers.forEach((center, cIdx) => {
      for (let i = 0; i < 6; i++) {
        const radius = 30 + i * 25
        const color = tempColors[(cIdx * 3 + i) % tempColors.length]
        drawContour(center.x, center.y, radius, color.join(','), 0.3 + i * 0.1)
      }
    })

    stationData.forEach((station, i) => {
      const x = 60 + (station.lon - 104) * 15
      const y = 200 - (station.lat - 22) * 10
      
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = station.status === 'Online' ? '#4aaa6a' : '#ffaa4a'
      ctx.fill()
      
      const windAngle = (i * 45 + time * 20) * Math.PI / 180
      const windLength = station.wind * 1.5
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.sin(windAngle) * windLength, y - Math.cos(windAngle) * windLength)
      ctx.strokeStyle = '#4a9eff'
      ctx.lineWidth = 1.5
      ctx.stroke()
      
      ctx.fillStyle = '#4a9eff'
      ctx.font = '7px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(`${station.temp.toFixed(1)}°C`, x, y + 15)
    })

  }, [animating, selectedVariable])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0c1828' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0f1e32', borderRight: '1px solid #1a3050' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#4a9eff' }}>METEO</h1>
          <svg width="50" height="16" viewBox="0 0 50 16" className="mt-1">
            <path d="M0,12 Q8,4 16,8 Q24,12 32,6 Q40,0 50,4" fill="none" stroke="#4a9eff" strokeWidth="0.8" />
            <path d="M0,14 Q8,8 16,10 Q24,14 32,8 Q40,4 50,8" fill="none" stroke="#4a9eff" strokeWidth="0.4" opacity="0.4" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#4a9eff]' : 'text-[#1a3a5a] hover:text-[#4a9eff80]'}`}
                style={isActive ? { background: '#4a9eff08', borderLeft: '2px solid #4a9eff' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0f1e32', borderBottom: '1px solid #1a3050' }}>
          <h2 className="text-sm font-bold" style={{ color: '#4a9eff' }}>Contour Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded" style={{ background: '#0c1828', border: '1px solid #1a3050' }}>
              <button onClick={() => setAnimating(!animating)} className="p-0.5 cursor-pointer">
                {animating ? <Wind className="w-3.5 h-3.5" style={{ color: '#4a9eff' }} /> : <Cloud className="w-3.5 h-3.5" style={{ color: '#4a9eff' }} />}
              </button>
              <span className="text-xs font-mono" style={{ color: '#4a9eff' }}>{animating ? 'Animating' : 'Static'}</span>
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#1a3a5a' }} /><input type="text" placeholder="Search fields..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#0c1828', border: '1px solid #1a3050', color: '#4a9eff' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#1a3a5a' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Pressure', value: '1013.2 hPa', change: '-2.1', up: false, icon: Wind },
              { label: 'Temperature', value: '22.4°C', change: '+1.8', up: true, icon: Thermometer },
              { label: 'Wind Speed', value: '14.2 m/s', change: '+3.5', up: true, icon: Wind },
              { label: 'Humidity', value: '68%', change: '-5%', up: false, icon: Droplets },
            ].map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <div key={i} className="p-4" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
                  <Icon className="w-4 h-4 mb-1" style={{ color: '#4a9eff' }} />
                  <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>{kpi.label}</p>
                  <p className="text-lg font-bold mb-1" style={{ color: '#e0f0ff' }}>{kpi.value}</p>
                  <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#4aaa6a]' : 'text-[#ff6a4a]'}`}>
                    {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Figure A. Temperature Field (°C)</h3>
                <select 
                  value={selectedVariable}
                  onChange={(e) => setSelectedVariable(e.target.value)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: '#0c1828', border: '1px solid #1a3050', color: '#4a9eff' }}
                >
                  <option value="temperature">Temperature</option>
                  <option value="pressure">Pressure</option>
                  <option value="wind">Wind</option>
                  <option value="humidity">Humidity</option>
                </select>
              </div>
              <canvas ref={canvasRef} width={480} height={240} className="w-full rounded" style={{ background: '#0a1525', border: '1px solid #1a3050' }} />
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-end gap-1">
                  {[0,1,2,3,4,5,6,7,8,9].map(i => (
                    <div key={i} className="w-3 h-5" style={{ background: `hsl(${200-i*12}, 80%, ${25+i*8}%)` }} />
                  ))}
                  <span className="text-[7px] ml-2" style={{ color: '#4a9eff80' }}>15°C - 28°C</span>
                </div>
              </div>
            </div>
            <div className="p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Figure B. Wind Rose</h3>
              <svg viewBox="0 0 160 160" className="w-full">
                {[0,1,2,3,4,5,6,7].map(i => (
                  <g key={i}>
                    <line x1="80" y1="80" x2={80+Math.sin(i*Math.PI/4)*65} y2={80-Math.cos(i*Math.PI/4)*65} stroke="#1a3050" strokeWidth="0.5" />
                    <text x={80+Math.sin(i*Math.PI/4)*75} y={80-Math.cos(i*Math.PI/4)*75+3} textAnchor="middle" fill="#4a9eff" fontSize="7">{windRoseData[i].dir}</text>
                  </g>
                ))}
                {[1,2,3,4].map(i => (
                  <circle key={i} cx="80" cy="80" r={i*16} fill="none" stroke="#1a3050" strokeWidth="0.5" />
                ))}
                {windRoseData.map((data, i) => {
                  const angle = i*Math.PI/4
                  const barWidth = Math.PI/5
                  const barLength = data.freq*2.5
                  return (
                    <g key={i}>
                      <path d={`M80,80 L${80+Math.sin(angle-barWidth/2)*barLength},${80-Math.cos(angle-barWidth/2)*barLength} A${barLength},${barLength} 0 0,0 ${80+Math.sin(angle+barWidth/2)*barLength},${80-Math.cos(angle+barWidth/2)*barLength} Z`} fill={`rgba(74,158,255,${0.3+i*0.05})`} stroke="#4a9eff" strokeWidth="0.5" />
                    </g>
                  )
                })}
              </svg>
              <div className="mt-3 space-y-1">
                {windRoseData.slice(0,4).map((data, i) => (
                  <div key={i} className="flex justify-between text-[7px]" style={{ color: '#4a9eff80' }}>
                    <span>{data.dir}</span>
                    <span>Freq: {data.freq}%, Speed: {data.speed}m/s</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Figure C. Time Series (24h)</h3>
              <svg viewBox="0 0 400 140" className="w-full">
                {[0,1,2,3,4,5].map(i => (
                  <g key={i}>
                    <line x1="40" y1={120-i*20} x2="380" y2={120-i*20} stroke="#1a3050" strokeWidth="0.5" />
                    <text x="35" y={120-i*20+3} fill="#4a9eff" fontSize="7">{(15+i*2.5).toFixed(1)}°C</text>
                  </g>
                ))}
                {timeSeriesData.map((data, i) => (
                  <text key={i} x={50+i*46} y="135" textAnchor="middle" fill="#4a9eff" fontSize="7">{data.time}</text>
                ))}
                <path d={timeSeriesData.map((d, i) => `${i===0?'M':'L'}${50+i*46},${120-(d.temp-15)*8}`).join(' ')} fill="none" stroke="#4a9eff" strokeWidth="2" />
                <path d={timeSeriesData.map((d, i) => `${i===0?'M':'L'}${50+i*46},${120-(d.humidity-60)*2}`).join(' ')} fill="none" stroke="#4aaa6a" strokeWidth="2" strokeDasharray="4,2" />
                {timeSeriesData.map((d, i) => (
                  <g key={i}>
                    <circle cx={50+i*46} cy={120-(d.temp-15)*8} r="3" fill="#4a9eff" />
                    <circle cx={50+i*46} cy={120-(d.humidity-60)*2} r="3" fill="#4aaa6a" />
                  </g>
                ))}
                <line x1="40" y1="120" x2="380" y2="120" stroke="#1a3050" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="120" stroke="#1a3050" strokeWidth="1" />
                <text x="390" y="135" textAnchor="end" fill="#4a9eff" fontSize="7">Time</text>
              </svg>
            </div>
            <div className="p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Figure D. Pressure Levels</h3>
              <div className="space-y-3">
                {[
                  { name: '1000 hPa', temp: '18.5°C', height: '110m', color: '#4a9eff' },
                  { name: '850 hPa', temp: '10.2°C', height: '1500m', color: '#3a8aee' },
                  { name: '500 hPa', temp: '-7.8°C', height: '5500m', color: '#2a7add' },
                  { name: '300 hPa', temp: '-32.4°C', height: '9200m', color: '#1a6acc' },
                  { name: '200 hPa', temp: '-50.1°C', height: '12000m', color: '#0a5abb' },
                ].map((p, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#0c1828' }}>
                    <div className="flex justify-between text-[9px] mb-1" style={{ color: p.color }}>
                      <span className="font-bold">{p.name}</span>
                      <span>{p.height}</span>
                    </div>
                    <div className="text-[7px]" style={{ color: '#1a3a5a' }}>Temperature: {p.temp}</div>
                    <div className="h-1 mt-1" style={{ background: '#0a1525' }}><div className="h-1" style={{ width: `${100-i*20}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0f1e32', border: '1px solid #1a3050' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#1a3a5a' }}>Observation Stations</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#1a3a5a' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #1a3050' }}>{['Station', 'Lat/Lon', 'Temp (°C)', 'Pressure (hPa)', 'Wind (m/s)', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#1a3a5a' }}>{h}</th>))}</tr></thead>
              <tbody>
                {stationData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0c1828' }}>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#4a9eff' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#6ab0ff' }}>{row.lat.toFixed(1)}°N/{row.lon.toFixed(1)}°E</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0f0ff' }}>{row.temp.toFixed(1)}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0f0ff' }}>{row.pressure.toFixed(1)}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#e0f0ff' }}>{row.wind.toFixed(1)}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium" style={{ color: row.status === 'Online' ? '#4aaa6a' : '#ffaa4a' }}>{row.status}</span></td>
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