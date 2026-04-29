import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function MicroscopicTextureDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [zoom, setZoom] = useState(5000)
  const [selectedPhase, setSelectedPhase] = useState('all')
  const [hoveredGrain, setHoveredGrain] = useState(null)
  const canvasRef = useRef(null)

  const grainData = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: 40 + (i % 6) * 85 + Math.random() * 20,
    y: 30 + Math.floor(i / 6) * 65 + Math.random() * 15,
    size: 15 + Math.random() * 20,
    orientation: Math.random() * 360,
    phase: ['Austenite', 'Ferrite', 'Pearlite', 'Carbide'][Math.floor(Math.random() * 4)],
    misorientation: (Math.random() * 15).toFixed(1)
  }))

  const edsData = [
    { element: 'Fe Kα', intensity: 85.2, color: '#5a4a3a' },
    { element: 'Cr Kα', intensity: 18.7, color: '#8a7a6a' },
    { element: 'Ni Kα', intensity: 12.4, color: '#b0a898' },
    { element: 'Mo Kα', intensity: 3.2, color: '#d4cbb8' },
    { element: 'Mn Kα', intensity: 1.8, color: '#e0dcd4' }
  ]

  const phaseColors = {
    'Austenite': '#5a4a3a',
    'Ferrite': '#8a7a6a',
    'Pearlite': '#b0a898',
    'Carbide': '#d4cbb8'
  }

  const filteredGrains = selectedPhase === 'all' ? grainData : grainData.filter(g => g.phase === selectedPhase)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    filteredGrains.forEach(grain => {
      ctx.save()
      ctx.translate(grain.x, grain.y)
      ctx.rotate(grain.orientation * Math.PI / 180)
      
      ctx.beginPath()
      const sides = 6
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2
        const x = Math.cos(angle) * grain.size
        const y = Math.sin(angle) * grain.size
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fillStyle = hoveredGrain === grain.id ? phaseColors[grain.phase] + 'cc' : phaseColors[grain.phase] + '40'
      ctx.fill()
      ctx.strokeStyle = phaseColors[grain.phase]
      ctx.lineWidth = 1
      ctx.stroke()
      
      ctx.restore()
    })
  }, [filteredGrains, hoveredGrain])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#f8f6f2' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col bg-white" style={{ borderRight: '1px solid #e0dcd4' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#5a4a3a' }}>MICRO</h1>
          <div className="mt-1 h-8 w-full" style={{ background: 'repeating-conic-gradient(#d4cbb8 0% 25%, transparent 0% 50%) 0 0 / 6px 6px', opacity: 0.5 }} />
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#5a4a3a] font-semibold' : 'text-[#b0a898] hover:text-[#8a7a6a]'}`}
                style={isActive ? { borderLeft: '2px solid #5a4a3a' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3 bg-white" style={{ borderBottom: '1px solid #e0dcd4' }}>
          <h2 className="text-sm font-bold text-[#5a4a3a]">Microstructure Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-[#f8f6f2] rounded" style={{ border: '1px solid #e0dcd4' }}>
              <ZoomOut className="w-3 h-3 text-[#b0a898]" />
              <span className="text-xs font-mono text-[#5a4a3a]">{zoom}×</span>
              <ZoomIn className="w-3 h-3 text-[#b0a898]" />
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#b0a898]" /><input type="text" placeholder="Search samples..." className="pl-8 pr-3 py-1.5 text-xs bg-[#f8f6f2] border border-[#e0dcd4] text-[#5a4a3a] focus:outline-none w-36" /></div>
            <button className="p-1.5 text-[#b0a898] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Grain Size', value: '24.5 μm', change: '+1.2%', up: true },
              { label: 'Porosity', value: '3.8%', change: '-0.4%', up: true },
              { label: 'Roughness', value: 'Ra 0.42', change: '+0.05', up: false },
              { label: 'Resolution', value: '0.1 nm', change: 'HD', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4 bg-white" style={{ border: '1px solid #e0dcd4' }}>
                <p className="text-[9px] text-[#b0a898] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-lg font-bold text-[#5a4a3a] mb-1">{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#6a8a5a]' : 'text-[#9a6a5a]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5 bg-white" style={{ border: '1px solid #e0dcd4' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] text-[#b0a898] uppercase tracking-wider">Figure A. Grain Boundary Map</h3>
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedPhase}
                    onChange={(e) => setSelectedPhase(e.target.value)}
                    className="text-xs px-2 py-1 bg-[#f8f6f2] border border-[#e0dcd4] text-[#5a4a3a] rounded"
                  >
                    <option value="all">All Phases</option>
                    <option value="Austenite">Austenite</option>
                    <option value="Ferrite">Ferrite</option>
                    <option value="Pearlite">Pearlite</option>
                    <option value="Carbide">Carbide</option>
                  </select>
                  <button className="p-1 text-[#b0a898] cursor-pointer"><RotateCcw className="w-3 h-3" /></button>
                </div>
              </div>
              <canvas 
                ref={canvasRef} 
                width={520} 
                height={280} 
                className="w-full bg-[#faf8f4] rounded"
                style={{ border: '1px solid #e0dcd4' }}
              />
              <div className="flex items-center gap-4 mt-3">
                {Object.entries(phaseColors).map(([phase, color]) => (
                  <div key={phase} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
                    <span className="text-[9px] text-[#b0a898]">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #e0dcd4' }}>
              <h3 className="text-[10px] text-[#b0a898] mb-4 uppercase tracking-wider">Figure B. EDS Analysis</h3>
              <div className="space-y-3">
                {edsData.map((el, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] mb-0.5" style={{ color: '#b0a898' }}>
                      <span>{el.element}</span>
                      <span style={{ color: el.color }}>{el.intensity}%</span>
                    </div>
                    <div className="h-1.5" style={{ background: '#f0ece4' }}>
                      <div className="h-1.5" style={{ width: `${el.intensity}%`, background: el.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-2 bg-[#f8f6f2] rounded" style={{ border: '1px solid #e0dcd4' }}>
                <p className="text-[8px] text-[#b0a898] mb-1">Composition</p>
                <p className="text-xs font-mono text-[#5a4a3a]">Fe-18Cr-12Ni-3Mo</p>
                <p className="text-[8px] text-[#b0a898] mt-1">AISI 316L Stainless Steel</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-white" style={{ border: '1px solid #e0dcd4' }}>
              <h3 className="text-[10px] text-[#b0a898] mb-4 uppercase tracking-wider">Figure C. Grain Size Distribution</h3>
              <div className="h-32 flex items-end justify-between gap-1">
                {[35,52,41,67,55,73,62,81,70,88,75,95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: '#5a4a3a', opacity: 0.3 + (i * 0.05) }} />
                    <span className="text-[7px] text-[#b0a898]">{['5','10','15','20','25','30','35','40','45','50','55','60'][i]}</span>
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-[#b0a898] mt-2 text-center">Grain Diameter (μm)</p>
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #e0dcd4' }}>
              <h3 className="text-[10px] text-[#b0a898] mb-4 uppercase tracking-wider">Figure D. Misorientation Distribution</h3>
              <svg viewBox="0 0 200 100" className="w-full h-full">
                {[0, 20, 40, 60, 80].map(y => (
                  <line key={y} x1="20" y1={y} x2="180" y2={y} stroke="#e0dcd4" strokeWidth="0.5" />
                ))}
                <path d="M20,90 Q40,85 60,70 Q80,50 100,40 Q120,35 140,50 Q160,70 180,85" fill="none" stroke="#5a4a3a" strokeWidth="1.5" />
                <line x1="60" y1="70" x2="60" y2="100" stroke="#5a4a3a" strokeWidth="0.5" strokeDasharray="2,2" />
                <text x="60" y="98" textAnchor="middle" fill="#b0a898" fontSize="6">θ=15°</text>
                <text x="100" y="95" textAnchor="middle" fill="#b0a898" fontSize="6">Misorientation (°)</text>
              </svg>
            </div>
          </div>

          <div className="p-5 bg-white" style={{ border: '1px solid #e0dcd4' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#b0a898] uppercase tracking-wider">Sample Registry</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#b0a898] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #e0dcd4' }}>{['Sample', 'Material', 'Magnification', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#b0a898] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'SM-001', mat: 'Ti-6Al-4V', mag: '5000×', status: 'Analyzed' },
                  { id: 'SM-002', mat: 'Inconel 718', mag: '10000×', status: 'Scanning' },
                  { id: 'SM-003', mat: 'SS 316L', mag: '2000×', status: 'Analyzed' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f0ece4' }}>
                    <td className="py-2.5 px-3 text-xs text-[#8a7a6a]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#5a4a3a]">{row.mat}</td>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#5a4a3a]">{row.mag}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] font-medium ${row.status === 'Analyzed' ? 'text-[#6a8a5a]' : 'text-[#8a7a6a]'}`}>{row.status}</span></td>
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