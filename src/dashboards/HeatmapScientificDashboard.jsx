import { useState } from 'react'
import { kpiData, chartData } from '../data/mockData'

export default function HeatmapScientificDashboard() {
  const [activeMetric, setActiveMetric] = useState('temperature')

  const heatmapData = Array.from({ length: 8 }, () =>
    Array.from({ length: 12 }, () => Math.random() * 100)
  )

  const metrics = [
    { id: 'temperature', name: 'Temperature' },
    { id: 'pressure', name: 'Pressure' },
    { id: 'humidity', name: 'Humidity' },
    { id: 'velocity', name: 'Velocity' },
    { id: 'density', name: 'Density' },
    { id: 'concentration', name: 'Concentration' }
  ]

  const heatmapColors = [
    '#1a0a2e', '#2d1b69', '#5b21b6', '#7c3aed', '#a78bfa',
    '#c4b5fd', '#fbbf24', '#f59e0b', '#ef4444', '#dc2626'
  ]

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#0a0a14' }}>
      <style>{`
        @keyframes heatmap-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes data-refresh {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(1.05); }
          100% { transform: scaleY(1); }
        }
        .heatmap-cell {
          transition: all 0.2s ease;
        }
        .heatmap-cell:hover {
          transform: scale(1.1);
          z-index: 10;
          box-shadow: 0 0 10px rgba(255, 170, 0, 0.5);
        }
      `}</style>

      {/* Sidebar */}
      <div className="w-64 h-full border-r flex flex-col" style={{ borderColor: '#1a1a30', background: '#0e0e1a' }}>
        <div className="p-4 border-b" style={{ borderColor: '#1a1a30' }}>
          <h1 className="text-lg font-semibold" style={{ color: '#ffaa00' }}>Heatmap Analysis</h1>
          <p className="text-xs mt-1" style={{ color: '#888' }}>Data Density Visualization</p>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs mb-3 font-medium" style={{ color: '#666' }}>METRICS</p>
          {metrics.slice(0, 6).map((metric, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer rounded mb-1 ${
                activeMetric === metric.id ? 'font-medium' : 'hover:opacity-80'
              }`}
              style={{
                background: activeMetric === metric.id ? '#1a1a30' : 'transparent',
                color: activeMetric === metric.id ? '#ffaa00' : '#888'
              }}
              onClick={() => setActiveMetric(metric.id)}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: heatmapColors[i % heatmapColors.length] }} />
              {metric.name}
            </div>
          ))}
        </div>

        {/* Color Legend */}
        <div className="p-4 border-t" style={{ borderColor: '#1a1a30' }}>
          <p className="text-xs mb-2" style={{ color: '#666' }}>SCALE</p>
          <div className="flex h-3 rounded overflow-hidden">
            {heatmapColors.map((color, i) => (
              <div key={i} className="flex-1" style={{ background: color }} />
            ))}
          </div>
          <div className="flex justify-between text-xs mt-1" style={{ color: '#666' }}>
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#1a1a30', background: '#0e0e1a' }}>
          <div>
            <h2 className="text-sm font-medium" style={{ color: '#ddd' }}>Thermal Distribution Map</h2>
            <p className="text-xs mt-1" style={{ color: '#666' }}>12×8 grid • Real-time data</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs" style={{ color: '#666' }}>Max Value</p>
              <p className="text-lg font-bold" style={{ color: '#ef4444' }}>98.7°C</p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: '#666' }}>Avg Value</p>
              <p className="text-lg font-bold" style={{ color: '#ffaa00' }}>54.2°C</p>
            </div>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-12 gap-1 max-w-4xl mx-auto">
            {heatmapData.map((row, rowIdx) =>
              row.map((value, colIdx) => {
                const colorIdx = Math.floor((value / 100) * (heatmapColors.length - 1))
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className="heatmap-cell aspect-square rounded-sm cursor-pointer"
                    style={{
                      background: heatmapColors[colorIdx],
                      animation: `heatmap-pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                    title={`(${colIdx}, ${rowIdx}): ${value.toFixed(1)}°C`}
                  />
                )
              })
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="p-4 border-t grid grid-cols-4 gap-4" style={{ borderColor: '#1a1a30', background: '#0e0e1a' }}>
          {[
            { label: 'Data Points', value: '96', color: '#a78bfa' },
            { label: 'Resolution', value: '0.5mm', color: '#fbbf24' },
            { label: 'Update Rate', value: '60Hz', color: '#ef4444' },
            { label: 'Accuracy', value: '±0.1°', color: '#22c55e' }
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
