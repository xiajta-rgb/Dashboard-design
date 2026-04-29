import { useState, useRef, useEffect } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  Filter,
  Zap,
  RefreshCw,
  Activity,
  Waves,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function SpectralAnalysisDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedPeak, setSelectedPeak] = useState('peak1')
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef(null)

  const spectralColors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#8b00ff']

  const spectrumData = Array.from({ length: 60 }, (_, i) => ({
    wavelength: 380 + i * 8,
    intensity: Math.sin(i * 0.25) * 30 + Math.cos(i * 0.4) * 25 + 40 + Math.random() * 8
  }))

  const peakData = [
    { id: 'peak1', wavelength: 435.8, intensity: 78, label: 'Hg I', element: 'Mercury', color: '#ff7700' },
    { id: 'peak2', wavelength: 546.1, intensity: 95, label: 'Hg II', element: 'Mercury', color: '#ffff00' },
    { id: 'peak3', wavelength: 577.0, intensity: 82, label: 'Na I', element: 'Sodium', color: '#00ff00' },
    { id: 'peak4', wavelength: 656.3, intensity: 88, label: 'Hα', element: 'Hydrogen', color: '#0000ff' },
    { id: 'peak5', wavelength: 690.0, intensity: 65, label: 'O₂', element: 'Oxygen', color: '#8b00ff' }
  ]

  const resolutionData = Array.from({ length: 20 }, (_, i) => ({
    delta: i * 0.5,
    resolution: Math.max(0.1, 0.05 + Math.sin(i * 0.3) * 0.08 + Math.random() * 0.03)
  }))

  const elementData = [
    { name: 'Hydrogen', abundance: 45.2, color: '#0000ff' },
    { name: 'Oxygen', abundance: 32.8, color: '#8b00ff' },
    { name: 'Mercury', abundance: 12.5, color: '#ff7700' },
    { name: 'Sodium', abundance: 9.5, color: '#00ff00' }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const time = animating ? Date.now() / 1000 : 0
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const dataLength = spectrumData.length
    const xStep = canvas.width / dataLength
    
    spectrumData.forEach((point, i) => {
      const x = i * xStep
      const normalizedIntensity = point.intensity / 100
      const y = canvas.height - normalizedIntensity * canvas.height
      
      const hue = 250 - (point.wavelength - 380) / 400 * 200
      ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.7)`
      
      const wave = Math.sin(i * 0.1 + time) * 3
      ctx.beginPath()
      ctx.arc(x + wave, y, 2, 0, Math.PI * 2)
      ctx.fill()
    })
    
    peakData.forEach((peak, i) => {
      const x = ((peak.wavelength - 380) / 400) * canvas.width
      const normalizedIntensity = peak.intensity / 100
      const y = canvas.height - normalizedIntensity * canvas.height
      
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = peak.color
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(x, y, 12 + Math.sin(time * 3 + i) * 3, 0, Math.PI * 2)
      ctx.strokeStyle = peak.color
      ctx.lineWidth = 2
      ctx.stroke()
    })
    
  }, [animating])

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#080810' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col" style={{ background: '#0c0c18', borderRight: '1px solid #181830' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#ff3366' }}>SPECTRAL</h1>
          <svg width="50" height="16" viewBox="0 0 50 16" className="mt-1">
            <circle cx="25" cy="8" r="6" fill="none" stroke="#ff3366" strokeWidth="0.5" />
            <ellipse cx="25" cy="8" rx="12" ry="4" fill="none" stroke="#ff3366" strokeWidth="0.3" transform="rotate(-20,25,8)" />
            <circle cx="25" cy="8" r="2" fill="#ff3366" opacity="0.3" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#ff3366]' : 'text-[#181830] hover:text-[#ff336680]'}`}
                style={isActive ? { background: '#ff336608', borderLeft: '2px solid #ff3366' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3" style={{ background: '#0c0c18', borderBottom: '1px solid #181830' }}>
          <h2 className="text-sm font-bold" style={{ color: '#ff3366' }}>Emission Spectrum Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded" style={{ background: '#080810', border: '1px solid #181830' }}>
              <button onClick={() => setAnimating(!animating)} className="p-0.5 cursor-pointer">
                {animating ? <Waves className="w-3.5 h-3.5" style={{ color: '#ff3366' }} /> : <RefreshCw className="w-3.5 h-3.5" style={{ color: '#ff3366' }} />}
              </button>
              <span className="text-xs font-mono" style={{ color: '#ff3366' }}>{animating ? 'Animating' : 'Static'}</span>
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#181830' }} /><input type="text" placeholder="Search elements..." className="pl-8 pr-3 py-1.5 text-xs focus:outline-none w-36" style={{ background: '#080810', border: '1px solid #181830', color: '#ff3366' }} /></div>
            <button className="p-1.5 cursor-pointer" style={{ color: '#181830' }}><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Resolution', value: '0.1nm', icon: Zap, color: '#00ff00' },
              { label: 'SNR', value: '120dB', icon: Activity, color: '#0000ff' },
              { label: 'Range', value: '200-1100nm', icon: Waves, color: '#ff7700' },
              { label: 'Peaks', value: '5', icon: Filter, color: '#8b00ff' }
            ].map((kpi, i) => {
              const Icon = kpi.icon
              return (
                <div key={i} className="p-4" style={{ background: '#0c0c18', border: '1px solid #181830' }}>
                  <Icon className="w-4 h-4 mb-1" style={{ color: kpi.color }} />
                  <p className="text-[9px] mb-1 uppercase tracking-wider" style={{ color: '#666' }}>{kpi.label}</p>
                  <p className="text-lg font-bold mb-1" style={{ color: '#ff3366' }}>{kpi.value}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5" style={{ background: '#0c0c18', border: '1px solid #181830' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure A. Full Spectrum</h3>
                <select 
                  value={selectedPeak}
                  onChange={(e) => setSelectedPeak(e.target.value)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: '#080810', border: '1px solid #181830', color: '#ff3366' }}
                >
                  {peakData.map(peak => (
                    <option key={peak.id} value={peak.id}>{peak.label}</option>
                  ))}
                </select>
              </div>
              <canvas ref={canvasRef} width={480} height={200} className="w-full rounded" style={{ background: '#0c0c18', border: '1px solid #181830' }} />
              <div className="flex items-end gap-0.5 mt-3 justify-end">
                {spectralColors.map((color, i) => (
                  <div key={i} className="w-6 h-3" style={{ background: color }} />
                ))}
                <span className="text-[7px] ml-1" style={{ color: '#666' }}>380-780nm</span>
              </div>
            </div>
            <div className="p-5" style={{ background: '#0c0c18', border: '1px solid #181830' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure B. Peak Identification</h3>
              <div className="space-y-3">
                {peakData.map((peak, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#080810' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ background: peak.color }} />
                      <span className="text-xs font-bold" style={{ color: peak.color }}>{peak.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[7px]" style={{ color: '#666' }}>
                      <span>Element: {peak.element}</span>
                      <span>Wavelength: {peak.wavelength}nm</span>
                    </div>
                    <div className="h-1 mt-1" style={{ background: '#080810' }}><div className="h-1" style={{ width: `${peak.intensity}%`, background: peak.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-5" style={{ background: '#0c0c18', border: '1px solid #181830' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure C. Resolution Analysis</h3>
              <svg viewBox="0 0 400 160" className="w-full">
                {[0, 0.05, 0.1, 0.15].map(y => (
                  <g key={y}>
                    <line x1="40" y1={140-y*800} x2="380" y2={140-y*800} stroke="#181830" strokeWidth="0.5" />
                    <text x="35" y={140-y*800+3} fill="#666" fontSize="7">{y.toFixed(2)}nm</text>
                  </g>
                ))}
                {resolutionData.slice(0, 15).map((data, i) => (
                  <text key={i} x={50+i*24} y="155" textAnchor="middle" fill="#666" fontSize="7">{data.delta.toFixed(1)}</text>
                ))}
                <path d={resolutionData.slice(0, 15).map((d, i) => `${i===0?'M':'L'}${50+i*24},${140-d.resolution*800}`).join(' ')} fill="none" stroke="#00ff00" strokeWidth="2" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#181830" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="140" stroke="#181830" strokeWidth="1" />
                <text x="390" y="155" textAnchor="end" fill="#666" fontSize="7">Δλ (nm)</text>
              </svg>
            </div>
            <div className="p-5" style={{ background: '#0c0c18', border: '1px solid #181830' }}>
              <h3 className="text-[10px] mb-4 uppercase tracking-wider" style={{ color: '#666' }}>Figure D. Element Abundance</h3>
              <div className="space-y-3">
                {elementData.map((elem, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#080810' }}>
                    <div className="flex justify-between text-[9px] mb-1">
                      <span style={{ color: '#ddd' }} className="font-bold">{elem.name}</span>
                      <span style={{ color: elem.color }}>{elem.abundance}%</span>
                    </div>
                    <div className="h-1.5 mt-1" style={{ background: '#080810' }}><div className="h-1.5" style={{ width: `${elem.abundance}%`, background: elem.color }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ background: '#0c0c18', border: '1px solid #181830' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] uppercase tracking-wider" style={{ color: '#666' }}>Spectral Readings Log</h3>
              <button className="flex items-center gap-1 text-[9px] cursor-pointer" style={{ color: '#181830' }}><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #181830' }}>{['Peak ID', 'Wavelength', 'Intensity', 'Element', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] uppercase tracking-wider font-medium" style={{ color: '#666' }}>{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'P001', wavelength: '435.8nm', intensity: '78%', element: 'Mercury', status: 'Detected' },
                  { id: 'P002', wavelength: '546.1nm', intensity: '95%', element: 'Mercury', status: 'Detected' },
                  { id: 'P003', wavelength: '577.0nm', intensity: '82%', element: 'Sodium', status: 'Detected' },
                  { id: 'P004', wavelength: '656.3nm', intensity: '88%', element: 'Hydrogen', status: 'Detected' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #080810' }}>
                    <td className="py-2.5 px-3 text-xs font-bold" style={{ color: '#ff3366' }}>{row.id}</td>
                    <td className="py-2.5 px-3 text-xs font-mono" style={{ color: '#666' }}>{row.wavelength}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#00ff00' }}>{row.intensity}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: '#0000ff' }}>{row.element}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium" style={{ color: '#4aaa6a' }}>{row.status}</span></td>
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