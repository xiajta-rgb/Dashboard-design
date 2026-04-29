import { useState, useEffect, useRef } from 'react'
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
  Maximize2,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



const nodeData = [
  { id: 0, x: 200, y: 150, degree: 24, cluster: 0, label: 'Hub-α' },
  { id: 1, x: 350, y: 100, degree: 18, cluster: 0, label: 'Node-β' },
  { id: 2, x: 150, y: 250, degree: 12, cluster: 1, label: 'Node-γ' },
  { id: 3, x: 400, y: 200, degree: 8, cluster: 0, label: 'Node-δ' },
  { id: 4, x: 280, y: 300, degree: 15, cluster: 1, label: 'Bridge-ε' },
  { id: 5, x: 500, y: 150, degree: 6, cluster: 2, label: 'Node-ζ' },
  { id: 6, x: 100, y: 180, degree: 10, cluster: 1, label: 'Node-η' },
  { id: 7, x: 450, y: 280, degree: 5, cluster: 2, label: 'Leaf-θ' },
  { id: 8, x: 320, y: 180, degree: 20, cluster: 0, label: 'Hub-ι' },
  { id: 9, x: 250, y: 220, degree: 14, cluster: 1, label: 'Node-κ' },
  { id: 10, x: 380, y: 120, degree: 7, cluster: 0, label: 'Node-λ' },
  { id: 11, x: 180, y: 320, degree: 9, cluster: 1, label: 'Node-μ' },
]

const edgeData = [
  [0,1],[0,2],[0,8],[0,9],[1,3],[1,8],[1,10],[2,4],[2,6],[2,9],
  [3,5],[3,7],[3,10],[4,9],[4,11],[5,7],[6,11],[8,9],[8,10],[9,11]
]

const clusterColors = ['#3b82f6', '#10b981', '#f59e0b']

export default function TopologicalScientificDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [hoveredNode, setHoveredNode] = useState(null)
  const [selectedCluster, setSelectedCluster] = useState(null)
  const svgRef = useRef(null)

  const filteredNodes = selectedCluster !== null ? nodeData.filter(n => n.cluster === selectedCluster) : nodeData
  const filteredEdges = edgeData.filter(([a, b]) => {
    if (selectedCluster === null) return true
    return nodeData[a].cluster === selectedCluster && nodeData[b].cluster === selectedCluster
  })

  const degreeDist = [95, 72, 55, 40, 30, 22, 16, 12, 8, 5, 3, 2]

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#fafafa' }}>
      <aside className="w-52 flex-shrink-0 py-4 px-2 flex flex-col bg-white" style={{ borderRight: '1px solid #ddd' }}>
        <div className="px-3 mb-6">
          <h1 className="text-xs font-bold tracking-[0.15em]" style={{ color: '#333' }}>TOPOLOGY</h1>
          <svg width="40" height="12" className="mt-1">
            <line x1="0" y1="6" x2="40" y2="6" stroke="#333" strokeWidth="0.5" />
            <circle cx="0" cy="6" r="2" fill="#333" />
            <circle cx="20" cy="6" r="2" fill="#666" />
            <circle cx="40" cy="6" r="2" fill="#333" />
          </svg>
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#333] font-semibold' : 'text-[#999] hover:text-[#666]'}`}
                style={isActive ? { borderLeft: '2px solid #333' } : { borderLeft: '2px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
        <div className="px-3 mt-4 pt-4" style={{ borderTop: '1px solid #eee' }}>
          <p className="text-[9px] text-[#999] mb-2 uppercase tracking-wider">Clusters</p>
          <button onClick={() => setSelectedCluster(null)} className={`w-full text-left text-xs px-2 py-1 mb-1 rounded ${selectedCluster === null ? 'bg-gray-100 font-medium' : 'text-[#999]'}`}>All ({nodeData.length})</button>
          {[0,1,2].map(c => (
            <button key={c} onClick={() => setSelectedCluster(c === selectedCluster ? null : c)} className={`w-full text-left text-xs px-2 py-1 mb-1 rounded flex items-center gap-2 ${selectedCluster === c ? 'bg-gray-100 font-medium' : 'text-[#999]'}`}>
              <div className="w-2 h-2 rounded-full" style={{ background: clusterColors[c] }} />Cluster {c} ({nodeData.filter(n => n.cluster === c).length})
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-6 py-3 bg-white" style={{ borderBottom: '1px solid #ddd' }}>
          <h2 className="text-sm font-bold text-[#333]">Network Topology Analysis</h2>
          <div className="flex items-center gap-3">
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#bbb]" /><input type="text" placeholder="Search nodes..." className="pl-8 pr-3 py-1.5 text-xs bg-[#fafafa] border border-[#ddd] text-[#333] focus:outline-none w-36" /></div>
            <button className="p-1.5 text-[#999] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Nodes', value: '2,482', change: '+5.3%', up: true },
              { label: 'Edges', value: '5,891', change: '+8.1%', up: true },
              { label: 'Clusters', value: '47', change: '-2', up: false },
              { label: 'Modularity', value: '0.842', change: '+0.03', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4 bg-white" style={{ border: '1px solid #ddd' }}>
                <p className="text-[9px] text-[#999] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-lg font-bold text-[#333] mb-1">{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] ${kpi.up ? 'text-[#2d8a4e]' : 'text-[#c44040]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-span-2 p-5 bg-white relative" style={{ border: '1px solid #ddd' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] text-[#999] uppercase tracking-wider">Force-Directed Graph Layout</h3>
                <div className="flex gap-1">
                  <button className="p-1 cursor-pointer text-[#999] hover:text-[#333]"><ZoomIn className="w-3 h-3" /></button>
                  <button className="p-1 cursor-pointer text-[#999] hover:text-[#333]"><ZoomOut className="w-3 h-3" /></button>
                  <button className="p-1 cursor-pointer text-[#999] hover:text-[#333]"><Maximize2 className="w-3 h-3" /></button>
                </div>
              </div>
              <svg ref={svgRef} viewBox="0 0 600 350" className="w-full h-64">
                <defs>
                  <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                {filteredEdges.map(([a, b], i) => (
                  <line key={i} x1={nodeData[a].x} y1={nodeData[a].y} x2={nodeData[b].x} y2={nodeData[b].y} stroke="#ccc" strokeWidth="1" opacity="0.6" />
                ))}
                {filteredNodes.map((node, i) => (
                  <g key={i} onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)} className="cursor-pointer">
                    <circle cx={node.x} cy={node.y} r={4 + node.degree * 0.5} fill={clusterColors[node.cluster]} opacity={hoveredNode === node.id ? 1 : 0.8} filter={hoveredNode === node.id ? 'url(#glow)' : undefined} />
                    <text x={node.x} y={node.y - 10} textAnchor="middle" fontSize="8" fill="#666">{node.label}</text>
                    {hoveredNode === node.id && (
                      <g>
                        <rect x={node.x - 35} y={node.y + 15} width="70" height="28" fill="#333" rx="3" />
                        <text x={node.x} y={node.y + 27} textAnchor="middle" fontSize="8" fill="#fff">deg: {node.degree} | C{node.cluster}</text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            </div>
            <div className="p-5 bg-white" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#999] mb-4 uppercase tracking-wider">Degree Distribution</h3>
              <div className="h-32 flex items-end justify-between gap-1 mb-4">
                {degreeDist.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: '#333', opacity: 0.6 + (i * 0.03) }} />
                    <span className="text-[7px] text-[#bbb]">{i+1}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-[10px] text-[#999] mb-3 uppercase tracking-wider">Centrality Metrics</h3>
              <div className="space-y-3">
                {[
                  { name: 'Betweenness', pct: 82 },
                  { name: 'Closeness', pct: 65 },
                  { name: 'Eigenvector', pct: 48 },
                  { name: 'PageRank', pct: 35 },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] text-[#999] mb-0.5"><span>{p.name}</span><span>{p.pct}%</span></div>
                    <div className="h-1 bg-[#eee]"><div className="h-1" style={{ width: `${p.pct}%`, background: '#333' }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 bg-white" style={{ border: '1px solid #ddd' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#999] uppercase tracking-wider">Node Registry</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#999] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #eee' }}>{['ID', 'Label', 'Degree', 'Cluster', 'Betweenness'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#999] uppercase tracking-wider font-medium">{h}</th>))}</tr></thead>
              <tbody>
                {nodeData.slice(0, 6).map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td className="py-2.5 px-3 text-xs text-[#666]">N-{String(row.id).padStart(3, '0')}</td>
                    <td className="py-2.5 px-3 text-xs text-[#333]">{row.label}</td>
                    <td className="py-2.5 px-3 text-xs font-semibold text-[#333]">{row.degree}</td>
                    <td className="py-2.5 px-3"><span className="text-[9px] font-medium px-1.5 py-0.5" style={{ border: `1px solid ${clusterColors[row.cluster]}40`, color: clusterColors[row.cluster], background: `${clusterColors[row.cluster]}10` }}>C{row.cluster}</span></td>
                    <td className="py-2.5 px-3 text-xs font-mono text-[#666]">{(Math.random() * 0.5).toFixed(3)}</td>
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
