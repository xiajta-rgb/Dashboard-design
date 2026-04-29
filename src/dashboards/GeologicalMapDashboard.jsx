import { useState } from 'react'

export default function GeologicalMapDashboard() {
  const [activeLayer, setActiveLayer] = useState('topography')

  const terrainColors = [
    '#2d5016', '#4a7c23', '#8b9a46', '#c4b367', '#d4a574',
    '#c48b5a', '#a0522d', '#8b4513', '#696969', '#808080'
  ]

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#f5f0e8' }}>
      <style>{`
        .terrain-cell {
          transition: all 0.2s ease;
        }
        .terrain-cell:hover {
          transform: scale(1.1);
          z-index: 10;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Sidebar */}
      <div className="w-64 h-full border-r flex flex-col" style={{ borderColor: '#e0d8c8', background: '#faf8f4' }}>
        <div className="p-4 border-b" style={{ borderColor: '#e0d8c8' }}>
          <h1 className="text-lg font-semibold" style={{ color: '#8b5e3c' }}>Geological Survey</h1>
          <p className="text-xs mt-1" style={{ color: '#888' }}>Terrain & Stratigraphy</p>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-xs mb-3 font-medium" style={{ color: '#666' }}>LAYERS</p>
          {['Topography', 'Geology', 'Hydrology', 'Vegetation', 'Soil'].map((layer, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer rounded mb-1 ${
                activeLayer === layer.toLowerCase() ? 'font-medium' : 'hover:opacity-80'
              }`}
              style={{
                background: activeLayer === layer.toLowerCase() ? '#e0d8c8' : 'transparent',
                color: activeLayer === layer.toLowerCase() ? '#8b5e3c' : '#888'
              }}
              onClick={() => setActiveLayer(layer.toLowerCase())}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: terrainColors[i % terrainColors.length] }} />
              {layer}
            </div>
          ))}
        </div>

        {/* Elevation Legend */}
        <div className="p-4 border-t" style={{ borderColor: '#e0d8c8' }}>
          <p className="text-xs mb-2" style={{ color: '#666' }}>ELEVATION</p>
          <div className="flex h-3 rounded overflow-hidden">
            {terrainColors.map((color, i) => (
              <div key={i} className="flex-1" style={{ background: color }} />
            ))}
          </div>
          <div className="flex justify-between text-xs mt-1" style={{ color: '#666' }}>
            <span>0m</span>
            <span>5000m</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: '#e0d8c8', background: '#faf8f4' }}>
          <div>
            <h2 className="text-sm font-medium" style={{ color: '#333' }}>Topographic Map</h2>
            <p className="text-xs mt-1" style={{ color: '#888' }}>Region: Survey Area B • Scale 1:50,000</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs" style={{ color: '#888' }}>Max Elevation</p>
              <p className="text-lg font-bold" style={{ color: '#8b5e3c' }}>4,892m</p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: '#888' }}>Min Elevation</p>
              <p className="text-lg font-bold" style={{ color: '#2d5016' }}>127m</p>
            </div>
          </div>
        </div>

        {/* Terrain Grid */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-12 gap-1 max-w-4xl mx-auto">
            {Array.from({ length: 8 }, (_, rowIdx) =>
              Array.from({ length: 12 }, (_, colIdx) => {
                const elevation = Math.sin(rowIdx * 0.5) * Math.cos(colIdx * 0.3) * 0.5 + 0.5
                const colorIdx = Math.floor(elevation * (terrainColors.length - 1))
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className="terrain-cell aspect-square rounded-sm cursor-pointer"
                    style={{ background: terrainColors[colorIdx] }}
                    title={`(${colIdx}, ${rowIdx}): ${(elevation * 5000).toFixed(0)}m`}
                  />
                )
              })
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="p-4 border-t grid grid-cols-4 gap-4" style={{ borderColor: '#e0d8c8', background: '#faf8f4' }}>
          {[
            { label: 'Area', value: '250km²', color: '#8b5e3c' },
            { label: 'Contour Interval', value: '20m', color: '#4a7c23' },
            { label: 'Rock Types', value: '6', color: '#a0522d' },
            { label: 'Survey Date', value: '2024-03', color: '#696969' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-xs" style={{ color: '#888' }}>{stat.label}</p>
              <p className="text-lg font-bold mt-1" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
