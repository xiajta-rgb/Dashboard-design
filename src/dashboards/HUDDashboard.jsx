import { useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Shield,
  Activity,
  Cpu,
  Network,
  Server,
  Terminal,
  Settings,
  Search,
  Bell,
  Download,
  Filter,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData } from '../data/mockData'

const BG = '#020A12'
const ACCENT = '#00D4FF'
const ACCENT2 = '#0088CC'
const GRID_COLOR = 'rgba(0,212,255,0.08)'
const BORDER_COLOR = 'rgba(0,212,255,0.15)'
const TEXT_PRIMARY = '#00D4FF'
const TEXT_SECONDARY = '#0088CC'
const TEXT_MUTED = 'rgba(0,212,255,0.4)'
const FONT_MONO = "'JetBrains Mono', monospace"

const cardStyle = {
  background: 'rgba(0,20,40,0.6)',
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: '0',
}

const scanlineStyle = {
  position: 'absolute',
  inset: 0,
  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.03) 2px, rgba(0,212,255,0.03) 4px)',
  pointerEvents: 'none',
  zIndex: 5,
}

const sidebarItems = [
  { key: 'systems', label: 'Systems', Icon: Shield },
  { key: 'analytics', label: 'Analytics', Icon: Activity },
  { key: 'compute', label: 'Compute', Icon: Cpu },
  { key: 'network', label: 'Network', Icon: Network },
  { key: 'servers', label: 'Servers', Icon: Server },
  { key: 'terminal', label: 'Terminal', Icon: Terminal },
  { key: 'settings', label: 'Settings', Icon: Settings },
]

function StatusDot({ status }) {
  const color = status === 'Active' ? '#00FF88' : status === 'Pending' ? '#FFAA00' : '#555'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: FONT_MONO, fontSize: '0.7rem' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
      {status.toUpperCase()}
    </span>
  )
}

export default function HUDDashboard() {
  const [activeNav, setActiveNav] = useState('systems')

  return (
    <div style={{ width: '100%', height: '100%', background: BG, display: 'flex', flexDirection: 'column', fontFamily: FONT_MONO, overflow: 'hidden' }}>
      <div style={scanlineStyle} />

      <nav style={{ borderBottom: `1px solid ${BORDER_COLOR}`, padding: '0 20px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: TEXT_PRIMARY, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            SYS://DASHBOARD
          </span>
          <div style={{ display: 'flex', gap: '1px' }}>
            {['SYS', 'NET', 'SEC', 'LOG'].map(item => (
              <button key={item} style={{
                background: 'none', border: `1px solid ${BORDER_COLOR}`, padding: '2px 10px',
                fontSize: '0.65rem', color: TEXT_MUTED, cursor: 'pointer', transition: 'all 150ms',
              }}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            border: `1px solid ${BORDER_COLOR}`, padding: '4px 10px',
          }}>
            <Search size={12} color={TEXT_MUTED} />
            <input type="text" placeholder="QUERY..." style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '0.65rem', color: TEXT_PRIMARY, width: '140px',
              fontFamily: FONT_MONO,
            }} />
          </div>
          <span style={{ fontSize: '0.6rem', color: TEXT_MUTED }}>
            {new Date().toISOString().slice(0, 19)}Z
          </span>
        </div>
      </nav>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{ width: '180px', borderRight: `1px solid ${BORDER_COLOR}`, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
          {sidebarItems.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                background: activeNav === key ? 'rgba(0,212,255,0.1)' : 'transparent',
                border: 'none', borderLeft: activeNav === key ? `2px solid ${ACCENT}` : '2px solid transparent',
                color: activeNav === key ? TEXT_PRIMARY : TEXT_MUTED,
                fontSize: '0.7rem', cursor: 'pointer', transition: 'all 150ms',
              }}
            >
              <Icon size={14} />
              <span>{label.toUpperCase()}</span>
            </button>
          ))}

          <div style={{ marginTop: 'auto', padding: '12px', borderTop: `1px solid ${BORDER_COLOR}` }}>
            <div style={{ fontSize: '0.6rem', color: TEXT_MUTED, marginBottom: '6px' }}>CPU LOAD</div>
            <div style={{ height: '3px', background: 'rgba(0,212,255,0.1)', borderRadius: '0' }}>
              <div style={{ height: '100%', width: '67%', background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
            </div>
            <div style={{ fontSize: '0.6rem', color: TEXT_PRIMARY, marginTop: '4px' }}>67.2%</div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '16px 20px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '1rem', color: TEXT_PRIMARY, fontWeight: 700, margin: 0, letterSpacing: '0.05em' }}>
                SYSTEM OVERVIEW
              </h1>
              <p style={{ fontSize: '0.65rem', color: TEXT_MUTED, marginTop: '4px' }}>
                All systems operational | Last sync: 12s ago
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                ...cardStyle, border: `1px solid ${BORDER_COLOR}`, padding: '4px 12px',
                color: TEXT_SECONDARY, fontSize: '0.65rem', cursor: 'pointer',
              }}>
                <Filter size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                FILTER
              </button>
              <button style={{
                ...cardStyle, border: `1px solid ${BORDER_COLOR}`, padding: '4px 12px',
                color: TEXT_SECONDARY, fontSize: '0.65rem', cursor: 'pointer',
              }}>
                <Download size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                EXPORT
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
            {kpiData.slice(0, 4).map((kpi) => (
              <div key={kpi.title} style={{ ...cardStyle, padding: '16px' }}>
                <p style={{ fontSize: '0.6rem', color: TEXT_MUTED, marginBottom: '8px', letterSpacing: '0.1em' }}>
                  {kpi.title.toUpperCase()}
                </p>
                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: TEXT_PRIMARY, margin: 0, textShadow: `0 0 10px ${ACCENT}40` }}>
                  {kpi.value}
                </p>
                <p style={{ fontSize: '0.6rem', color: kpi.trend === 'up' ? '#00FF88' : '#FF4444', marginTop: '6px' }}>
                  {kpi.change}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ ...cardStyle, padding: '16px' }}>
              <h3 style={{ fontSize: '0.7rem', color: TEXT_PRIMARY, margin: '0 0 12px', letterSpacing: '0.05em' }}>
                THROUGHPUT
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="2 4" stroke={GRID_COLOR} />
                  <XAxis dataKey="name" tick={{ fill: TEXT_MUTED, fontSize: 9, fontFamily: FONT_MONO }} axisLine={{ stroke: BORDER_COLOR }} tickLine={false} />
                  <YAxis tick={{ fill: TEXT_MUTED, fontSize: 9, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: BG, border: `1px solid ${BORDER_COLOR}`, fontSize: '0.65rem', fontFamily: FONT_MONO }} />
                  <Line type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={1.5} dot={false} name="REV" />
                  <Line type="monotone" dataKey="users" stroke={ACCENT2} strokeWidth={1} dot={false} name="USR" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ ...cardStyle, padding: '16px' }}>
              <h3 style={{ fontSize: '0.7rem', color: TEXT_PRIMARY, margin: '0 0 12px', letterSpacing: '0.05em' }}>
                LOAD DISTRIB
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="2 4" stroke={GRID_COLOR} />
                  <XAxis dataKey="name" tick={{ fill: TEXT_MUTED, fontSize: 9, fontFamily: FONT_MONO }} axisLine={{ stroke: BORDER_COLOR }} tickLine={false} />
                  <YAxis tick={{ fill: TEXT_MUTED, fontSize: 9, fontFamily: FONT_MONO }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: BG, border: `1px solid ${BORDER_COLOR}`, fontSize: '0.65rem', fontFamily: FONT_MONO }} />
                  <Bar dataKey="value" fill={ACCENT} radius={[0, 0, 0, 0]} barSize={20} name="LOAD" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ ...cardStyle, padding: '16px' }}>
            <h3 style={{ fontSize: '0.7rem', color: TEXT_PRIMARY, margin: '0 0 12px', letterSpacing: '0.05em' }}>
              NODE STATUS
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['NODE', 'ROLE', 'STATUS', 'UPTIME'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: '0.6rem', color: TEXT_MUTED, letterSpacing: '0.1em', borderBottom: `1px solid ${BORDER_COLOR}` }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map(row => (
                  <tr key={row.id} style={{ transition: 'background 100ms' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,212,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '8px 10px', fontSize: '0.7rem', color: TEXT_PRIMARY, borderBottom: `1px solid rgba(0,212,255,0.06)` }}>{row.name}</td>
                    <td style={{ padding: '8px 10px', fontSize: '0.65rem', color: TEXT_SECONDARY, borderBottom: `1px solid rgba(0,212,255,0.06)` }}>{row.role}</td>
                    <td style={{ padding: '8px 10px', borderBottom: `1px solid rgba(0,212,255,0.06)` }}>
                      <StatusDot status={row.status} />
                    </td>
                    <td style={{ padding: '8px 10px', fontSize: '0.65rem', color: TEXT_MUTED, borderBottom: `1px solid rgba(0,212,255,0.06)` }}>{row.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
