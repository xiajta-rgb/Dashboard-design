import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  Filter,
  Satellite,
  Zap,
  RefreshCw,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function SatelliteCloudDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedChannel, setSelectedChannel] = useState('ir')
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef(null)

  const satelliteData = [
    { id: 'FY-4A', ch: 'AGRI', res: '500m', orbit: 'GEO', lat: 105, status: 'Active' },
    { id: 'Himawari-9', ch: 'AHI', res: '500m', orbit: 'GEO', lat: 140, status: 'Active' },
    { id: 'GOES-16', ch: 'ABI', res: '1km', orbit: 'GEO', lat: -75, status: 'Standby' },
    { id: 'METEOSAT-11', ch: 'SEVIRI', res: '3km', orbit: 'GEO', lat: 0, status: 'Active' },
  ]

  const channelData = [
    { name: 'IR', wavelength: '10.8 μm', bt: 245, cloud: 62, color: '#88aaff' },
    { name: 'WV', wavelength: '6.2 μm', bt: 220, cloud: 45, color: '#6a8acc' },
    { name: 'VIS', wavelength: '0.65 μm', alb: 78, cloud: 60, color: '#aaccee' },
    { name: 'SWIR', wavelength: '1.6 μm', bt: 260, cloud: 35, color: '#88bbdd' },
  ]

  const timeSeriesData = Array.from({ length: 12 }, (_, i) => ({
    time: `${(12+i)%24}:00`,
    bt: 230 + i*2 - Math.sin(i*0.5)*15,
    cloud: 50 + i*1.5 - Math.cos(i*0.4)*10,
  }))

  const cloudTypeData = [
    { name: 'Cb (Cumulonimbus)', pct: 15, alt: 12000, temp: -55, color: '#88aaff' },
    { name: 'Ci (Cirrus)', pct: 30, alt: 8000, temp: -35, color: '#6a8acc' },
    { name: 'Sc (Stratocumulus)', pct: 25, alt: 2000, temp: 15, color: '#4a6a9a' },
    { name: 'St (Stratus)', pct: 20, alt: 800, temp: 22, color: '#2a4a7a' },
    { name: 'Cu (Cumulus)', pct: 10, alt: 3000, temp: 10, color: '#5a7aaa' },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const time = animating ? Date.now() / 1000 : 0

    const generateCloud = (cx, cy, radius, color, phase) => {
      ctx.save()
      ctx.translate(cx, cy)
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, radius)
      
      const getColorWithAlpha = (baseColor, alphaHex) => {
        if (baseColor.startsWith('hsl(')) {
          const alpha = parseInt(alphaHex, 16) / 255
          return baseColor.replace('hsl(', `hsla(`).replace(')', `, ${alpha})`)
        }
        return `${baseColor}${alphaHex}`
      }
      
      grd.addColorStop(0, getColorWithAlpha(color, 'cc'))
      grd.addColorStop(0.5, getColorWithAlpha(color, '44'))
      grd.addColorStop(1, getColorWithAlpha(color, '00'))
      
      ctx.fillStyle = grd
      ctx.beginPath()
      for (let a = 0; a < Math.PI*2; a += 0.1) {
        const r = radius * (0.7 + 0.3*Math.sin(a*3 + phase))
        const x = r * Math.cos(a)
        const y = r * Math.sin(a)
        a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    for (let i = 0; i < 8; i++) {
      const cx = 60 + (i%4)*130 + Math.sin(time+i*0.5)*10
      const cy = 50 + Math.floor(i/4)*140 + Math.cos(time+i*0.3)*8
      const radius = 40 + i*5
      const hue = 200 + i*8
      generateCloud(cx, cy, radius, `hsl(${hue},60%,60%)`, time+i)
    }

    for (let y = 0; y < canvas.height; y += 3) {
      for (let x = 0; x < canvas.width; x += 3) {
        const noise = Math.sin(x*0.1+time*0.5)*Math.cos(y*0.08+time*0.3)*0.5
        const brightness = 0.3 + 0.4*Math.abs(Math.sin((x+y)*0.01))
        const hue = 200 + noise*20
        ctx.fillStyle = `hsla(${hue},50%,${20+brightness*30}%,0.6)`
        ctx.fillRect(x,y,2,2)
      }
    }

  }, [animating, selectedChannel])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#060810' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0a0e18', borderRight: '1px solid #141c2c' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#88aaff' }}>SATELLITE</h1>
          <svg width="50" height="16" viewBox="0 0 50 16" className="mt-1">
            <circle cx="25" cy="8" r="6" fill="none" stroke="#88aaff" strokeWidth="0.5" />
            <ellipse cx="25" cy="8" rx="12" ry="4" fill="none" stroke="#88aaff" strokeWidth="0.3" transform="rotate(-20,25,8)" />
            <circle cx="25" cy="8" r="2" fill="#88aaff" opacity="0.3" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#88aaff]' : 'text-[#1a2440] hover:text-[#88aaff80]'}`}
                style={isActive ? { background: '#88aaff08', borderLeft: '2px solid #88aaff' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0a0e18', borderBottom: '1px solid #141c2c' }}>
          <h2 className="text-sm font-bold" style={{ color: '#88aaff' }}>Cloud Image Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded" style={{ background: '#060810', border: '1px solid #141c2c' }}>
              <button onClick={() => setAnimating(!animating)} className="p-0.5 cursor-pointer">
                {animating ? <Zap className="w-3.5 h-3.5" style={{ color: '#88aaff' }} /> : <RefreshCw className="w-3.5 h-3.5" style={{ color: '#88aaff' }} />}
              </button>
              <span className="text-xs font-mono" style={{ color: '#88aaff' }}>{animating ? 'Animating' : 'Static'}</span>
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#141c2c' }} /><input type="text" placeholder="Search channels..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#060810', border: '1px solid #141c2c', color: '#88aaff' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#141c2c' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {channelData.map((kpi, i) => {
              const Icon = i === 0 ? Satellite : i === 1 ? Zap : i === 2 ? RefreshCw : Search
              return (
                <div key={i} className="p-4" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
                  <Icon className="w-4 h-4 mb-1" style={{ color: kpi.color }} />
                  <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#1a2440' }}>{kpi.name} Channel</p>
                  <p className="text-lg font-bold mb-1" style={{ color: '#d0e0ff' }}>{kpi.wavelength}</p>
                  <span className="inline-flex items-center gap-0.5 text-[10px]" style={{ color: kpi.color }}>
                    <TrendingUp className="w-3 h-3" />BT {kpi.bt}K
                  </span>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>Figure A. Pseudo-Color Enhancement</h3>
                <select 
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: '#060810', border: '1px solid #141c2c', color: '#88aaff' }}
                >
                  <option value="ir">IR (10.8 μm)</option>
                  <option value="wv">WV (6.2 μm)</option>
                  <option value="vis">VIS (0.65 μm)</option>
                  <option value="swir">SWIR (1.6 μm)</option>
                </select>
              </div>
              <canvas ref={canvasRef} width={480} height={240} className="w-full rounded" style={{ background: '#0a0e18', border: '1px solid #141c2c' }} />
              <div className="flex items-end gap-0.5 mt-2 justify-end">
                {Array.from({length:8}).map((_, i) => (
                  <div key={i} className="w-2 h-5" style={{ background: `hsl(${200+i*8}, ${60+i*3}%, ${15+i*8}%)` }} />
                ))}
                <span className="text-[7px] ml-1" style={{ color: '#88aaff60' }}>200K-280K</span>
              </div>
            </div>
            <div className="p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>Figure B. Cloud Classification</h3>
              <div className="space-y-3">
                {cloudTypeData.map((p, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#060810' }}>
                    <div className="flex justify-between text-[9px] mb-1" style={{ color: p.color }}>
                      <span className="font-bold">{p.name}</span>
                      <span>{p.pct}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[7px]" style={{ color: '#1a2440' }}>
                      <span>Alt: {p.alt}m</span>
                      <span>Temp: {p.temp}°C</span>
                    </div>
                    <div className="h-1 mt-1" style={{ background: '#060810' }}><div className="h-1" style={{ width: `${p.pct}%`, background: p.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>Figure C. Time Series (24h)</h3>
              <svg viewBox="0 0 400 140" className="w-full">
                {[0,1,2,3,4,5].map(i => (
                  <g key={i}>
                    <line x1="40" y1={120-i*20} x2="380" y2={120-i*20} stroke="#1a2440" strokeWidth="0.5" />
                    <text x="35" y={120-i*20+3} fill="#88aaff" fontSize="7">{(200+i*20)}K</text>
                  </g>
                ))}
                {timeSeriesData.map((data, i) => (
                  <text key={i} x={50+i*30} y="135" textAnchor="middle" fill="#88aaff" fontSize="7">{data.time}</text>
                ))}
                <path d={timeSeriesData.map((d, i) => `${i===0?'M':'L'}${50+i*30},${120-(d.bt-200)*0.8}`).join(' ')} fill="none" stroke="#88aaff" strokeWidth="2" />
                <path d={timeSeriesData.map((d, i) => `${i===0?'M':'L'}${50+i*30},${120-(d.cloud*0.8)}`).join(' ')} fill="none" stroke="#6a8acc" strokeWidth="2" strokeDasharray="4,2" />
                {timeSeriesData.map((d, i) => (
                  <g key={i}>
                    <circle cx={50+i*30} cy={120-(d.bt-200)*0.8} r="3" fill="#88aaff" />
                    <circle cx={50+i*30} cy={120-(d.cloud*0.8)} r="3" fill="#6a8acc" />
                  </g>
                ))}
                <line x1="40" y1="120" x2="380" y2="120" stroke="#1a2440" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="120" stroke="#1a2440" strokeWidth="1" />
                <text x="390" y="135" textAnchor="end" fill="#88aaff" fontSize="7">Time</text>
              </svg>
            </div>
            <div className="p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#1a2440' }}>Figure D. Satellite Constellation</h3>
              <svg viewBox="0 0 200 140" className="w-full">
                <ellipse cx="100" cy="70" rx="90" ry="30" fill="none" stroke="#1a2440" strokeWidth="1" />
                {satelliteData.map((sat, i) => {
                  const angle = (sat.lat/180)*Math.PI
                  const x = 100 + Math.cos(angle)*80
                  const y = 70 - Math.sin(angle)*25
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="8" fill={sat.status === 'Active' ? '#4aaa6a' : '#ffaa4a'} opacity="0.3" />
                      <circle cx={x} cy={y} r="5" fill={sat.status === 'Active' ? '#4aaa6a' : '#ffaa4a'} />
                      <text x={x} y={y+20} textAnchor="middle" fill="#88aaff" fontSize="7">{sat.id}</text>
                    </g>
                  )
                })}
                <line x1="100" y1="20" x2="100" y2="120" stroke="#141c2c" strokeWidth="1" strokeDasharray="3,3" />
                <text x="10" y="72" fill="#1a2440" fontSize="6">0°</text>
                <text x="185" y="72" fill="#1a2440" fontSize="6">180°</text>
              </svg>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0a0e18', border: '1px solid #141c2c' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#1a2440' }}>Satellite Pass Log</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#141c2c' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #141c2c' }}>{['Satellite', 'Orbit', 'Channel', 'Resolution', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#1a2440' }}>{h}</th>))}</tr></thead>
              <tbody>
                {satelliteData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #080c14' }}>
                    <td className="py-2.5 px-3 text-xs font-bold" style={{ color: '#88aaff' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#6a8acc' }}>{row.orbit}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#6a8acc' }}>{row.ch}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#d0e0ff' }}>{row.res}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium" style={{ color: row.status === 'Active' ? '#4aaa6a' : '#ffaa4a' }}>{row.status}</span></td>
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