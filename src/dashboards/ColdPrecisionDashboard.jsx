import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard, BarChart3, Users as UsersIcon, Package, ShoppingCart, MessageSquare, Settings,
  Search, Bell, TrendingUp, TrendingDown, Filter, Ruler, Target, Zap,
} from 'lucide-react'
import { sidebarItems } from '../data/mockData'

const sidebarIcons = {
  dashboard: LayoutDashboard, analytics: BarChart3, customers: UsersIcon,
  products: Package, orders: ShoppingCart, messages: MessageSquare, settings: Settings,
}

export default function ColdPrecisionDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [simulating, setSimulating] = useState(false)
  const canvasRef = useRef(null)

  const stressStrainData = [
    { strain: 0, stress: 0 },
    { strain: 0.005, stress: 100 },
    { strain: 0.01, stress: 200 },
    { strain: 0.015, stress: 300 },
    { strain: 0.02, stress: 400 },
    { strain: 0.03, stress: 550 },
    { strain: 0.04, stress: 650 },
    { strain: 0.05, stress: 720 },
    { strain: 0.06, stress: 760 },
    { strain: 0.07, stress: 780 },
    { strain: 0.08, stress: 790 },
    { strain: 0.09, stress: 795 },
    { strain: 0.1, stress: 800 },
    { strain: 0.12, stress: 805 },
    { strain: 0.14, stress: 810 },
    { strain: 0.16, stress: 815 },
    { strain: 0.18, stress: 820 },
    { strain: 0.2, stress: 825 },
    { strain: 0.22, stress: 830 },
    { strain: 0.24, stress: 835 },
    { strain: 0.26, stress: 840 },
    { strain: 0.28, stress: 845 },
    { strain: 0.3, stress: 850 },
    { strain: 0.32, stress: 855 },
    { strain: 0.34, stress: 860 },
    { strain: 0.36, stress: 865 },
    { strain: 0.38, stress: 870 },
    { strain: 0.4, stress: 875 },
    { strain: 0.42, stress: 880 },
    { strain: 0.44, stress: 885 },
    { strain: 0.46, stress: 890 },
    { strain: 0.48, stress: 895 },
    { strain: 0.5, stress: 900 }
  ]

  const materialData = [
    { name: '42CrMo4', youngModulus: 210, yieldStrength: 650, tensileStrength: 850, color: '#4a5568' },
    { name: '20MnCr5', youngModulus: 200, yieldStrength: 450, tensileStrength: 680, color: '#6a7588' },
    { name: 'GG-25', youngModulus: 100, yieldStrength: 250, tensileStrength: 350, color: '#8a94a4' },
    { name: 'AlMg3', youngModulus: 70, yieldStrength: 250, tensileStrength: 310, color: '#a0a8b4' }
  ]

  const measurementData = [
    { trial: 1, value: 0.998, deviation: -0.002 },
    { trial: 2, value: 1.001, deviation: 0.001 },
    { trial: 3, value: 1.000, deviation: 0 },
    { trial: 4, value: 0.999, deviation: -0.001 },
    { trial: 5, value: 1.002, deviation: 0.002 },
    { trial: 6, value: 0.997, deviation: -0.003 },
    { trial: 7, value: 1.000, deviation: 0 },
    { trial: 8, value: 1.001, deviation: 0.001 },
    { trial: 9, value: 0.999, deviation: -0.001 },
    { trial: 10, value: 1.000, deviation: 0 }
  ]

  const filteredMaterials = selectedMaterial === 'all' ? materialData : materialData.filter(m => m.name === selectedMaterial)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const time = simulating ? Date.now() / 1000 : 0

    ctx.strokeStyle = '#e8eaee'
    ctx.lineWidth = 0.5
    for (let x = 0; x <= canvas.width; x += 10) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y <= canvas.height; y += 10) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    ctx.fillStyle = '#4a5568'
    ctx.font = '8px monospace'
    for (let i = 0; i <= 5; i++) {
      const x = 40 + i * 96
      ctx.fillText(`${i * 2}mm`, x, canvas.height - 8)
    }
    for (let i = 0; i <= 4; i++) {
      const y = canvas.height - 40 - i * 50
      ctx.fillText(`${i * 2}mm`, 8, y + 3)
    }

    const vibration = simulating ? Math.sin(time * 20) * 2 : 0
    ctx.fillStyle = '#1a202c'
    ctx.fillRect(60, canvas.height - 60 + vibration, 300, 40)
    
    ctx.fillStyle = '#4a5568'
    ctx.beginPath()
    ctx.arc(200, canvas.height - 80 + vibration, 30, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.strokeStyle = '#2d3748'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(200, 0 + vibration)
    ctx.lineTo(200, canvas.height - 110 + vibration)
    ctx.stroke()

  }, [simulating])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#f0f2f5' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col bg-white" style={{ borderRight: '1px solid #c8ccd4' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.2em]" style={{ color: '#4a5568' }}>PRECISION</h1>
          <div className="mt-1 flex items-center gap-0.5">
            {[0,1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-0.5 flex-1" style={{ background: i < 6 ? '#4a5568' : '#d0d4dc' }} />)}
          </div>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#4a5568] font-semibold' : 'text-[#a0a8b4] hover:text-[#6a7588]'}`}
                style={isActive ? { borderLeft: '2px solid #4a5568' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3 bg-white" style={{ borderBottom: '1px solid #c8ccd4' }}>
          <h2 className="text-sm font-bold text-[#4a5568]">Engineering Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#f0f2f5] rounded" style={{ border: '1px solid #c8ccd4' }}>
              <button onClick={() => setSimulating(!simulating)} className="p-0.5 cursor-pointer">
                {simulating ? <Zap className="w-3.5 h-3.5 text-[#4a5568]" /> : <Ruler className="w-3.5 h-3.5 text-[#4a5568]" />}
              </button>
              <span className="text-xs font-mono text-[#4a5568]">{simulating ? 'Simulating' : 'Idle'}</span>
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a0a8b4]" /><input type="text" placeholder="Search specs..." className="pl-8 pr-3 py-1.5 text-xs bg-[#f0f2f5] border border-[#c8ccd4] text-[#4a5568] focus:outline-none w-36" /></div>
            <button className="p-1.5 text-[#a0a8b4] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Tolerance', value: '±0.002mm', change: 'Grade IT4', up: true, icon: Target },
              { label: 'Surface', value: 'Ra 0.8', change: 'N6', up: true, icon: Ruler },
              { label: 'Deflection', value: '0.12mm', change: '-0.03', up: true, icon: TrendingUp },
              { label: 'Safety', value: '2.45', change: '+0.15', up: true, icon: Zap },
            ].map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <div key={i} className="p-4 bg-white" style={{ border: '1px solid #c8ccd4' }}>
                  <Icon className="w-4 h-4 text-[#a0a8b4] mb-1" />
                  <p className="text-[9px] text-[#a0a8b4] mb-1 uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-lg font-bold text-[#4a5568] mb-1 font-mono">{kpi.value}</p>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#6a8a7a]">
                    {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] text-[#a0a8b4] uppercase tracking-wider">Figure A. Measurement System</h3>
                <select 
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="text-xs px-2 py-1 bg-[#f0f2f5] border border-[#c8ccd4] text-[#4a5568] rounded"
                >
                  <option value="all">All Materials</option>
                  {materialData.map((m, i) => <option key={i} value={m.name}>{m.name}</option>)}
                </select>
              </div>
              <canvas ref={canvasRef} width={520} height={200} className="w-full bg-[#fafbfc] rounded" style={{ border: '1px solid #e8eaee' }} />
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
              <h3 className="text-[10px] text-[#a0a8b4] mb-4 uppercase tracking-wider">Figure B. Material Properties</h3>
              <div className="space-y-3">
                {filteredMaterials.map((material, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#f7fafc' }}>
                    <div className="flex justify-between text-[9px] mb-1" style={{ color: '#4a5568' }}>
                      <span className="font-bold">{material.name}</span>
                      <span>E={material.youngModulus}GPa</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[8px]" style={{ color: '#a0a8b4' }}>
                      <div>Yield: {material.yieldStrength}MPa</div>
                      <div>Tensile: {material.tensileStrength}MPa</div>
                    </div>
                    <div className="h-1 bg-[#e8eaee] mt-1"><div className="h-1" style={{ width: `${(material.tensileStrength / 850) * 100}%`, background: material.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
              <h3 className="text-[10px] text-[#a0a8b4] mb-4 uppercase tracking-wider">Figure C. Stress-Strain Curve</h3>
              <svg viewBox="0 0 400 180" className="w-full h-full">
                {[0, 30, 60, 90, 120, 150].map(y => (
                  <g key={y}>
                    <line x1="50" y1={170 - y} x2="380" y2={170 - y} stroke="#e8eaee" strokeWidth="0.5" />
                    <text x="45" y={170 - y + 3} fill="#a0a8b4" fontSize="7">{y * 5}MPa</text>
                  </g>
                ))}
                {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((x, i) => (
                  <g key={i}>
                    <line x1={50 + i * 66} y1="20" x2={50 + i * 66} y2="170" stroke="#e8eaee" strokeWidth="0.5" />
                    <text x={50 + i * 66} y="178" textAnchor="middle" fill="#a0a8b4" fontSize="7">{x}</text>
                  </g>
                ))}
                <path d={stressStrainData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${50 + d.strain * 660} ${170 - d.stress * 0.18}`).join(' ')} fill="none" stroke="#4a5568" strokeWidth="2" />
                <line x1="50" y1="170" x2="380" y2="170" stroke="#2d3748" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="170" stroke="#2d3748" strokeWidth="1" />
                <text x="210" y="185" textAnchor="middle" fill="#a0a8b4" fontSize="8">Strain (mm/mm)</text>
                <text x="15" y="95" textAnchor="middle" fill="#a0a8b4" fontSize="8" transform="rotate(-90, 15, 95)">Stress (MPa)</text>
              </svg>
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
              <h3 className="text-[10px] text-[#a0a8b4] mb-4 uppercase tracking-wider">Figure D. Measurement Precision</h3>
              <div className="grid grid-cols-10 gap-1">
                {measurementData.map((m, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-full rounded-t" style={{ height: `${Math.abs(m.deviation) * 2000 + 20}px`, background: m.deviation === 0 ? '#4a5568' : m.deviation > 0 ? '#6a8a7a' : '#9a7a5a', marginTop: m.deviation < 0 ? `${Math.abs(m.deviation) * 2000}px` : 0 }} />
                    <span className="text-[6px] text-[#a0a8b4]">{m.trial}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[8px] mt-2" style={{ color: '#a0a8b4' }}>
                <span>Mean: {(measurementData.reduce((a, b) => a + b.value, 0) / measurementData.length).toFixed(3)}</span>
                <span>Std Dev: {Math.sqrt(measurementData.reduce((a, b) => a + Math.pow(b.deviation, 2), 0) / measurementData.length).toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white" style={{ border: '1px solid #c8ccd4' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#a0a8b4] uppercase tracking-wider">Component Specs</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#a0a8b4] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #c8ccd4' }}>{['Part', 'Material', 'Tolerance', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#a0a8b4] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'SHAFT-01', mat: '42CrMo4', tol: '±0.005mm', status: 'Pass' },
                  { id: 'GEAR-02', mat: '20MnCr5', tol: '±0.008mm', status: 'Pass' },
                  { id: 'HOUSING-03', mat: 'GG-25', tol: '±0.020mm', status: 'Rework' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e8eaee' }}>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#4a5568]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#6a7588]">{row.mat}</td>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#4a5568]">{row.tol}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] font-bold ${row.status === 'Pass' ? 'text-[#6a8a7a]' : 'text-[#9a7a5a]'}`}>{row.status}</span></td>
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