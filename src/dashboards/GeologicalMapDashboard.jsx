import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  Filter,
  MapPin,
  Zap,
  RefreshCw,
  Activity,
  Compass,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function GeologicalMapDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedStrat, setSelectedStrat] = useState('strat1')
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef(null)

  const terrainColors = ['#2d5016', '#4a7c23', '#8b9a46', '#c4b367', '#d4a574', '#c48b5a', '#a0522d', '#8b4513', '#696969', '#808080']

  const stratData = [
    { id: 'strat1', layer: 'Quaternary', depth: '0-50m', age: '2.6Ma', color: '#d4a574' },
    { id: 'strat2', layer: 'Tertiary', depth: '50-200m', age: '66Ma', color: '#c48b5a' },
    { id: 'strat3', layer: 'Cretaceous', depth: '200-500m', age: '145Ma', color: '#a0522d' },
    { id: 'strat4', layer: 'Jurassic', depth: '500-800m', age: '201Ma', color: '#8b4513' },
    { id: 'strat5', layer: 'Triassic', depth: '800-1200m', age: '252Ma', color: '#696969' }
  ]

  const sampleData = [
    { id: 'S-001', type: 'Granite', age: '145Ma', x: 20, y: 30, color: '#ff0000' },
    { id: 'S-002', type: 'Sandstone', age: '66Ma', x: 45, y: 55, color: '#00ff00' },
    { id: 'S-003', type: 'Limestone', age: '201Ma', x: 70, y: 25, color: '#0000ff' },
    { id: 'S-004', type: 'Basalt', age: '25Ma', x: 35, y: 70, color: '#ffff00' },
    { id: 'S-005', type: 'Shale', age: '100Ma', x: 60, y: 45, color: '#ff00ff' }
  ]

  const depthData = Array.from({ length: 15 }, (_, i) => ({
    depth: i * 100,
    density: 2.2 + Math.sin(i * 0.4) * 0.5 + Math.random() * 0.3,
    temperature: 15 + i * 2.5 + Math.cos(i * 0.3) * 5
  }))

  const generateTerrain = (rows, cols, time) => Array.from({ length: rows }, (_, rowIdx) =>
    Array.from({ length: cols }, (_, colIdx) => {
      const centerX = cols / 2
      const centerY = rows / 2
      const dist = Math.sqrt(Math.pow(colIdx - centerX, 2) + Math.pow(rowIdx - centerY, 2))
      const wave = Math.sin(dist * 0.25 + time * 0.4) * 15
      return 25 + dist * 2.5 + wave + Math.random() * 12
    })
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const time = animating ? Date.now() / 1000 : 0
    
    const terrain = generateTerrain(20, 28, time)
    const cellWidth = canvas.width / 28
    const cellHeight = canvas.height / 20
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    terrain.forEach((row, rowIdx) => {
      row.forEach((value, colIdx) => {
        const normalizedValue = Math.min(Math.max((value - 20) / 80, 0), 1)
        const colorIdx = Math.floor(normalizedValue * (terrainColors.length - 1))
        ctx.fillStyle = terrainColors[colorIdx]
        ctx.fillRect(colIdx * cellWidth, rowIdx * cellHeight, cellWidth, cellHeight)
      })
    })
    
    for (let i = 0; i < 8; i++) {
      const x = 50 + (i % 4) * 100 + Math.sin(time + i) * 20
      const y = 60 + Math.floor(i / 4) * 80 + Math.cos(time + i * 1.5) * 15
      const radius = 30 + i * 8
      
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.stroke()
      ctx.setLineDash([])
    }
    
    sampleData.forEach((sample, i) => {
      const x = sample.x * 4.8
      const y = sample.y * 2.4
      
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.fillStyle = sample.color
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()
      
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 8px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(sample.id.split('-')[1], x, y + 3)
    })
    
  }, [animating])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#f5f0e8' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#faf8f4', borderRight: '1px solid #e0d8c8' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#8b5e3c' }}>GEOLOGIC</h1>
          <svg width="50" height="16" viewBox="0 0 50 16" className="mt-1">
            <circle cx="25" cy="8" r="6" fill="none" stroke="#8b5e3c" strokeWidth="0.5" />
            <ellipse cx="25" cy="8" rx="12" ry="4" fill="none" stroke="#8b5e3c" strokeWidth="0.3" transform="rotate(-20,25,8)" />
            <circle cx="25" cy="8" r="2" fill="#8b5e3c" opacity="0.3" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#8b5e3c]' : 'text-[#888888] hover:text-[#8b5e3c90]'}`}
                style={isActive ? { background: '#8b5e3c08', borderLeft: '2px solid #8b5e3c' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#faf8f4', borderBottom: '1px solid #e0d8c8' }}>
          <h2 className="text-sm font-bold" style={{ color: '#8b5e3c' }}>Geological Survey Map</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded" style={{ background: '#f5f0e8', border: '1px solid #e0d8c8' }}>
              <button onClick={() => setAnimating(!animating)} className="p-0.5 cursor-pointer">
                {animating ? <Compass className="w-3.5 h-3.5" style={{ color: '#8b5e3c' }} /> : <RefreshCw className="w-3.5 h-3.5" style={{ color: '#8b5e3c' }} />}
              </button>
              <span className="text-xs font-mono" style={{ color: '#8b5e3c' }}>{animating ? 'Animating' : 'Static'}</span>
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#888888' }} /><input type="text" placeholder="Search formations..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#f5f0e8', border: '1px solid #e0d8c8', color: '#8b5e3c' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#888888' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Area', value: '250km²', icon: MapPin, color: '#8b5e3c' },
              { label: 'Samples', value: '5', icon: Zap, color: '#4a7c23' },
              { label: 'Rock Types', value: '6', icon: Activity, color: '#c48b5a' },
              { label: 'Date', value: '2024-03', icon: Filter, color: '#a0522d' }
            ].map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <div key={i} className="p-4" style={{ background: '#faf8f4', border: '1px solid #e0d8c8' }}>
                  <Icon className="w-4 h-4 mb-1" style={{ color: kpi.color }} />
                  <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#888888' }}>{kpi.label}</p>
                  <p className="text-lg font-bold mb-1" style={{ color: '#8b5e3c' }}>{kpi.value}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#faf8f4', border: '1px solid #e0d8c8' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#888888' }}>Figure A. Topographic Map</h3>
                <select 
                  value={selectedStrat}
                  onChange={(e) => setSelectedStrat(e.target.value)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: '#f5f0e8', border: '1px solid #e0d8c8', color: '#8b5e3c' }}
                >
                  {stratData.map(strat => (
                    <option key={strat.id} value={strat.id}>{strat.layer}</option>
                  ))}
                </select>
              </div>
              <canvas ref={canvasRef} width={480} height={240} className="w-full rounded" style={{ background: '#faf8f4', border: '1px solid #e0d8c8' }} />
              <div className="flex items-end gap-0.5 mt-3 justify-end">
                {terrainColors.map((color, i) => (
                  <div key={i} className="w-2 h-3" style={{ background: color }} />
                ))}
                <span className="text-[7px] ml-1" style={{ color: '#888888' }}>Elevation</span>
              </div>
            </div>
            <div className="p-5" style={{ background: '#faf8f4', border: '1px solid #e0d8c8' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#888888' }}>Figure B. Stratigraphic Column</h3>
              <div className="space-y-2">
                {stratData.map((strat, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#f5f0e8' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ background: strat.color }} />
                      <span className="text-xs font-bold" style={{ color: i < 3 ? '#333333' : '#ffffff' }}>{strat.layer}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[7px]" style={{ color: '#888888' }}>
                      <span>Depth: {strat.depth}</span>
                      <span>Age: {strat.age}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5" style={{ background: '#faf8f4', border: '1px solid #e0d8c8' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#888888' }}>Figure C. Depth Profile</h3>
              <svg viewBox="0 0 400 160" className="w-full">
                {[0, 2, 4, 6].map(y => (
                  <g key={y}>
                    <line x1="40" y1={140-y*20} x2="380" y2={140-y*20} stroke="#e0d8c8" strokeWidth="0.5" />
                    <text x="35" y={140-y*20+3} fill="#888888" fontSize="7">{(y*500)}m</text>
                  </g>
                ))}
                {depthData.slice(0, 12).map((data, i) => (
                  <text key={i} x={50+i*29} y="155" textAnchor="middle" fill="#888888" fontSize="7">{data.depth}</text>
                ))}
                <path d={depthData.slice(0, 12).map((d, i) => `${i===0?'M':'L'}${50+i*29},${140-(d.density-2)*50}`).join(' ')} fill="none" stroke="#8b5e3c" strokeWidth="2" />
                <path d={depthData.slice(0, 12).map((d, i) => `${i===0?'M':'L'}${50+i*29},${140-d.temperature*1.2}`).join(' ')} fill="none" stroke="#4a7c23" strokeWidth="2" strokeDasharray="4,2" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#e0d8c8" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="140" stroke="#e0d8c8" strokeWidth="1" />
                <text x="390" y="155" textAnchor="end" fill="#888888" fontSize="7">Depth (m)</text>
              </svg>
            </div>
            <div className="p-5" style={{ background: '#faf8f4', border: '1px solid #e0d8c8' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#888888' }}>Figure D. Sample Locations</h3>
              <div className="space-y-2">
                {sampleData.map((sample, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#f5f0e8' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ background: sample.color }} />
                      <span className="text-xs font-bold" style={{ color: '#333333' }}>{sample.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[7px]" style={{ color: '#888888' }}>
                      <span>Type: {sample.type}</span>
                      <span>Age: {sample.age}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#faf8f4', border: '1px solid #e0d8c8' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#888888' }}>Sample Analysis Log</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#888888' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #e0d8c8' }}>{['Sample ID', 'Type', 'Age', 'Location', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#888888' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'S-001', type: 'Granite', age: '145Ma', location: 'Grid A3', status: 'Analyzed' },
                  { id: 'S-002', type: 'Sandstone', age: '66Ma', location: 'Grid B5', status: 'Analyzed' },
                  { id: 'S-003', type: 'Limestone', age: '201Ma', location: 'Grid C2', status: 'In Progress' },
                  { id: 'S-004', type: 'Basalt', age: '25Ma', location: 'Grid A7', status: 'Analyzed' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f5f0e8' }}>
                    <td className="py-2.5 px-3 text-xs font-bold" style={{ color: '#8b5e3c' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#4a7c23' }}>{row.type}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#888888' }}>{row.age}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#c48b5a' }}>{row.location}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium" style={{ color: row.status === 'Analyzed' ? '#4aaa6a' : '#ffaa4a' }}>{row.status}</span></td>
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