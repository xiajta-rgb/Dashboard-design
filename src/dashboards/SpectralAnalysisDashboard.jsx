import { useState } from 'react'

export default function SpectralAnalysisDashboard() {
  const [activeBand, setActiveBand] = useState('visible')

  const spectralColors = [
    '#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'
  ]

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#080810' }}>
      <style>{`
        @keyframes wavelength-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spectral-glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        .spectral-line {
          transition: all 0.3s ease;
        }
        .spectral-line:hover {
          filter: brightness(1.5);
        }
      `}</style>

      {/* Sidebar */}
      <div className="w-64 h-full border-r flex flex-col" style={{ borderColor: '#181830', background: '#0c0c18' }}>
        <div className="p-4 border-b" style={{ borderColor: '#181830' }}>
          <h1 className="text-lg font-semibold" style={{ color: '#ff3366' }}>Spectral Analysis</h1>
          <p className="text-xs mt-1" style={{ color: '#888' }}>Wavelength Research</p>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs mb-3 font-medium" style={{ color: '#666' }}>SPECTRAL BANDS</p>
          {['UV', 'Visible', 'Near-IR', 'Mid-IR', 'Far-IR'].map((band, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer rounded mb-1 ${
                activeBand === band.toLowerCase() ? 'font-medium' : 'hover:opacity-80'
              }`}
              style={{
                background: activeBand === band.toLowerCase() ? '#181830' : 'transparent',
                color: activeBand === band.toLowerCase() ? '#ff3366' : '#888'
              }}
              onClick={() => setActiveBand(band.toLowerCase())}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: spectralColors[i % spectralColors.length] }} />
              {band}
            </div>
          ))}
        </div>

        {/* Spectrum Bar */}
        <div className="p-4 border-t" style={{ borderColor: '#181830' }}>
          <p className="text-xs mb-2" style={{ color: '#666' }}>SPECTRUM</p>
          <div className="flex h-4 rounded overflow-hidden">
            {spectralColors.map((color, i) => (
              <div key={i} className="flex-1" style={{ background: color }} />
            ))}
          </div>
          <div className="flex justify-between text-xs mt-1" style={{ color: '#666' }}>
            <span>380nm</span>
            <span>780nm</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#181830', background: '#0c0c18' }}>
          <div>
            <h2 className="text-sm font-medium" style={{ color: '#ddd' }}>Emission Spectrum</h2>
            <p className="text-xs mt-1" style={{ color: '#666' }}>Sample: Unknown Compound A</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs" style={{ color: '#666' }}>Peak λ</p>
              <p className="text-lg font-bold" style={{ color: '#ff3366' }}>546.1nm</p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: '#666' }}>Intensity</p>
              <p className="text-lg font-bold" style={{ color: '#00ff88' }}>94.7%</p>
            </div>
          </div>
        </div>

        {/* Spectrum Chart */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <svg viewBox="0 0 800 300" className="w-full">
              {/* Grid */}
              {[0, 50, 100, 150, 200, 250, 300].map(y => (
                <line key={y} x1="50" y1={y} x2="750" y2={y} stroke="#181830" strokeWidth="1" />
              ))}
              
              {/* Spectrum Line */}
              <path
                d="M50,280 Q100,250 150,200 T250,150 T350,100 T450,80 T550,120 T650,200 T750,280"
                fill="none"
                stroke="url(#spectrum-gradient)"
                strokeWidth="3"
                className="spectral-line"
              />
              
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="spectrum-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  {spectralColors.map((color, i) => (
                    <stop key={i} offset={`${(i / (spectralColors.length - 1)) * 100}%`} stopColor={color} />
                  ))}
                </linearGradient>
              </defs>

              {/* Peak Markers */}
              {[
                { x: 200, y: 180, label: '435.8nm' },
                { x: 350, y: 100, label: '546.1nm' },
                { x: 500, y: 90, label: '577.0nm' },
                { x: 600, y: 150, label: '690.0nm' }
              ].map((peak, i) => (
                <g key={i}>
                  <line x1={peak.x} y1={peak.y} x2={peak.x} y2="280" stroke={spectralColors[i % spectralColors.length]} strokeWidth="1" strokeDasharray="4,4" />
                  <circle cx={peak.x} cy={peak.y} r="4" fill={spectralColors[i % spectralColors.length]} style={{ animation: 'spectral-glow 2s ease-in-out infinite' }} />
                  <text x={peak.x} y={peak.y - 10} textAnchor="middle" fill={spectralColors[i % spectralColors.length]} fontSize="10">{peak.label}</text>
                </g>
              ))}

              {/* Axis Labels */}
              <text x="400" y="295" textAnchor="middle" fill="#666" fontSize="12">Wavelength (nm)</text>
              <text x="15" y="150" textAnchor="middle" fill="#666" fontSize="12" transform="rotate(-90, 15, 150)">Intensity (a.u.)</text>
            </svg>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="p-4 border-t grid grid-cols-4 gap-4" style={{ borderColor: '#181830', background: '#0c0c18' }}>
          {[
            { label: 'Resolution', value: '0.1nm', color: '#ff3366' },
            { label: 'SNR', value: '120dB', color: '#00ff88' },
            { label: 'Range', value: '200-1100nm', color: '#ffaa00' },
            { label: 'Peaks', value: '4', color: '#00ffff' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xs" style={{ color: '#666' }}>{stat.label}</p>
              <p className="text-lg font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
