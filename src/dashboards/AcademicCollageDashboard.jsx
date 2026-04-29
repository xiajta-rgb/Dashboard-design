import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Filter,
  BookOpen,
  Quote,
  FileText,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function AcademicCollageDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [selectedDomain, setSelectedDomain] = useState('all')

  const citationNetwork = [
    { id: 1, x: 100, y: 80, size: 20, label: 'Smith 2020', citations: 145, color: '#333' },
    { id: 2, x: 200, y: 60, size: 15, label: 'Wang 2021', citations: 89, color: '#666' },
    { id: 3, x: 150, y: 140, size: 18, label: 'Lee 2019', citations: 234, color: '#999' },
    { id: 4, x: 280, y: 100, size: 12, label: 'Zhang 2022', citations: 56, color: '#bbb' },
    { id: 5, x: 320, y: 160, size: 10, label: 'Chen 2023', citations: 23, color: '#ddd' },
    { id: 6, x: 250, y: 180, size: 14, label: 'Liu 2021', citations: 78, color: '#888' }
  ]

  const citationLinks = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 5], [3, 4], [3, 5]
  ]

  const publicationData = [
    { year: '2019', papers: 18, citations: 245 },
    { year: '2020', papers: 24, citations: 389 },
    { year: '2021', papers: 32, citations: 567 },
    { year: '2022', papers: 28, citations: 445 },
    { year: '2023', papers: 35, citations: 678 },
    { year: '2024', papers: 42, citations: 892 }
  ]

  const domainData = [
    { name: 'Materials Science', papers: 87, citations: 1245, hIndex: 18, color: '#333' },
    { name: 'Condensed Matter', papers: 65, citations: 987, hIndex: 15, color: '#666' },
    { name: 'Chemistry', papers: 52, citations: 756, hIndex: 12, color: '#999' },
    { name: 'Engineering', papers: 44, citations: 534, hIndex: 10, color: '#bbb' }
  ]

  const filteredDomains = selectedDomain === 'all' ? domainData : domainData.filter(d => d.name === selectedDomain)

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#ffffff' }}>
      <aside className="w-52 flex-shrink-0 py-6 px-3 flex flex-col" style={{ borderRight: '2px solid #333' }}>
        <div className="px-2 mb-8">
          <h1 className="text-sm font-black tracking-[0.1em]" style={{ color: '#333', fontFamily: 'Georgia, serif' }}>REVIEW</h1>
          <div className="mt-1 h-0.5 w-8 bg-[#333]" />
        </div>
        <div className="flex flex-col gap-0 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button key={item.key} onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isActive ? 'text-[#333] font-bold' : 'text-[#aaa] hover:text-[#666]'}`}
                style={isActive ? { borderLeft: '3px solid #333' } : { borderLeft: '3px solid transparent' }}>
                <Icon className="w-3.5 h-3.5" /><span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: '2px solid #333' }}>
          <h2 className="text-lg font-black" style={{ color: '#333', fontFamily: 'Georgia, serif' }}>Literature Review</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded" style={{ border: '1px solid #ddd' }}>
              <BookOpen className="w-3.5 h-3.5 text-[#aaa]" />
              <span className="text-xs text-[#333]">248 Papers</span>
              <Quote className="w-3.5 h-3.5 text-[#aaa]" />
              <span className="text-xs text-[#333]">4,589 Citations</span>
            </div>
            <div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#aaa]" /><input type="text" placeholder="Search papers..." className="pl-8 pr-3 py-1.5 text-xs bg-transparent border-b-2 border-[#333] text-[#333] focus:outline-none w-40" /></div>
            <button className="p-1 text-[#aaa] cursor-pointer"><Bell className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Papers', value: '248', change: '+12', up: true },
              { label: 'Citations', value: '4,589', change: '+8.2%', up: true },
              { label: 'Figures', value: '847', change: '+24', up: true },
              { label: 'H-Index', value: '42', change: '+2', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-4" style={{ border: '1px solid #ddd' }}>
                <p className="text-[9px] text-[#aaa] mb-1 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-xl font-black text-[#333] mb-1">{kpi.value}</p>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${kpi.up ? 'text-[#2d8a4e]' : 'text-[#c44040]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 p-5" style={{ border: '1px solid #ddd' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] text-[#aaa] uppercase tracking-wider font-bold">Figure A. Citation Network</h3>
                <FileText className="w-4 h-4 text-[#aaa]" />
              </div>
              <svg viewBox="0 0 400 220" className="w-full h-full">
                {citationLinks.map(([a, b], i) => (
                  <line key={i} x1={citationNetwork[a].x} y1={citationNetwork[a].y} x2={citationNetwork[b].x} y2={citationNetwork[b].y} stroke="#ddd" strokeWidth="1" />
                ))}
                {citationNetwork.map((node, i) => (
                  <g key={i}>
                    <circle cx={node.x} cy={node.y} r={node.size} fill={node.color} opacity="0.3" stroke={node.color} strokeWidth="1" />
                    <text x={node.x} y={node.y + 3} textAnchor="middle" fill={node.color} fontSize="7">{node.label}</text>
                    <text x={node.x} y={node.y + node.size + 12} textAnchor="middle" fill="#aaa" fontSize="6">{node.citations} cites</text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="p-5" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#aaa] mb-4 uppercase tracking-wider font-bold">Figure B. Domain Analysis</h3>
              <div className="space-y-3">
                {filteredDomains.map((domain, i) => (
                  <div key={i} className="p-2 rounded" style={{ background: '#f8f8f8' }}>
                    <div className="flex justify-between text-[9px] mb-1" style={{ color: '#666' }}>
                      <span>{domain.name}</span>
                      <span>h={domain.hIndex}</span>
                    </div>
                    <div className="flex gap-2 text-[8px]" style={{ color: '#aaa' }}>
                      <span>{domain.papers} papers</span>
                      <span>{domain.citations} citations</span>
                    </div>
                    <div className="h-1 bg-[#eee] mt-1"><div className="h-1" style={{ width: `${(domain.citations / 1245) * 100}%`, background: domain.color }} /></div>
                  </div>
                ))}
              </div>
              <select 
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full mt-3 text-xs px-2 py-1 bg-white border border-[#ddd] text-[#333] rounded"
              >
                <option value="all">All Domains</option>
                {domainData.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-5" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#aaa] mb-4 uppercase tracking-wider font-bold">Figure C. Publication Timeline</h3>
              <svg viewBox="0 0 400 150" className="w-full h-full">
                {[0, 30, 60, 90, 120].map(y => (
                  <line key={y} x1="40" y1={y} x2="380" y2={y} stroke="#eee" strokeWidth="0.5" />
                ))}
                <path d={publicationData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${40 + i * 68} ${130 - d.papers * 2.5}`).join(' ')} fill="none" stroke="#333" strokeWidth="2" />
                <path d={publicationData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${40 + i * 68} ${130 - d.citations / 8}`).join(' ')} fill="none" stroke="#999" strokeWidth="2" strokeDasharray="4,4" />
                {publicationData.map((d, i) => (
                  <text key={i} x={40 + i * 68} y="145" textAnchor="middle" fill="#aaa" fontSize="8">{d.year}</text>
                ))}
                <line x1="280" y1="10" x2="340" y2="10" stroke="#333" strokeWidth="2" />
                <text x="345" y="13" fill="#aaa" fontSize="7">Papers</text>
                <line x1="280" y1="25" x2="340" y2="25" stroke="#999" strokeWidth="2" strokeDasharray="4,4" />
                <text x="345" y="28" fill="#aaa" fontSize="7">Citations/8</text>
              </svg>
            </div>
            <div className="p-5" style={{ border: '1px solid #ddd' }}>
              <h3 className="text-[10px] text-[#aaa] mb-4 uppercase tracking-wider font-bold">Figure D. Impact Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Papers', value: '248', icon: FileText },
                  { label: 'Avg Citations', value: '18.5', icon: Quote },
                  { label: 'H-Index', value: '42', icon: BookOpen },
                  { label: 'i10-Index', value: '89', icon: FileText }
                ].map((metric, i) => {
                  const Icon = metric.icon
                  return (
                    <div key={i} className="p-3 rounded" style={{ background: '#f8f8f8' }}>
                      <Icon className="w-4 h-4 text-[#aaa] mb-1" />
                      <p className="text-[8px] text-[#aaa]">{metric.label}</p>
                      <p className="text-lg font-black text-[#333]">{metric.value}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="p-5" style={{ border: '1px solid #ddd' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-[#aaa] uppercase tracking-wider font-bold">Figure Registry</h3>
              <button className="flex items-center gap-1 text-[9px] text-[#aaa] cursor-pointer"><Filter className="w-2.5 h-2.5" />Filter</button>
            </div>
            <table className="w-full">
              <thead><tr style={{ borderBottom: '2px solid #333' }}>{['Fig.', 'Type', 'Source', 'Status'].map(h => (<th key={h} className="py-2 px-3 text-left text-[9px] text-[#aaa] uppercase tracking-wider font-bold">{h}</th>))}</tr></thead>
              <tbody>
                {[
                  { id: 'Fig. 1', type: 'Schematic', src: 'Smith et al. 2024', status: 'Published' },
                  { id: 'Fig. 2', type: 'SEM Image', src: 'Wang et al. 2023', status: 'Draft' },
                  { id: 'Fig. 3', type: 'XRD Plot', src: 'Lee et al. 2024', status: 'Review' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <td className="py-2.5 px-3 text-xs font-bold text-[#333]">{row.id}</td>
                    <td className="py-2.5 px-3 text-xs text-[#666]">{row.type}</td>
                    <td className="py-2.5 px-3 text-xs italic text-[#666]">{row.src}</td>
                    <td className="py-2.5 px-3"><span className={`text-[9px] font-bold ${row.status === 'Published' ? 'text-[#2d8a4e]' : row.status === 'Draft' ? 'text-[#c4a35a]' : 'text-[#666]'}`}>{row.status}</span></td>
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