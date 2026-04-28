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
  DollarSign,
  Users,
  Activity,
  Clock,
  TrendingUp,
  TrendingDown,
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Search,
  Bell,
  Download,
  Filter,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, sidebarItems } from '../data/mockData'

const sidebarIcons = {
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  customers: Users,
  products: Package,
  orders: ShoppingCart,
  messages: MessageSquare,
  settings: Settings,
}

const BG = '#F5F0EB'
const CARD_BG = '#FAF7F2'
const ACCENT = '#E8985E'
const ACCENT2 = '#7EB8A0'
const ACCENT3 = '#C490D4'
const ACCENT4 = '#87CEEB'
const TEXT_PRIMARY = '#3D3D3D'
const TEXT_SECONDARY = '#7A7A7A'
const TEXT_MUTED = '#A8A8A8'

const clayCard = {
  background: CARD_BG,
  borderRadius: '24px',
  boxShadow: `8px 8px 16px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.7), inset 0 2px 4px rgba(255,255,255,0.5)`,
}

const clayCardSm = {
  background: CARD_BG,
  borderRadius: '16px',
  boxShadow: `4px 4px 8px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.7), inset 0 1px 2px rgba(255,255,255,0.5)`,
}

const kpiIcons = [DollarSign, Users, Activity, Clock]
const kpiAccents = [ACCENT, ACCENT2, ACCENT3, ACCENT4]

function KpiCard({ data, index }) {
  const Icon = kpiIcons[index]
  const accent = kpiAccents[index]
  const isUp = data.trend === 'up'

  return (
    <div style={{ ...clayCard, padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `inset 0 2px 4px rgba(255,255,255,0.6), 2px 2px 4px rgba(0,0,0,0.06)`,
        }}>
          <Icon size={24} color={accent} />
        </div>
        <span style={{
          fontSize: '0.8rem', fontWeight: 600,
          color: isUp ? '#48BB78' : '#F56565',
        }}>
          {isUp ? '+' : ''}{data.change}
        </span>
      </div>
      <p style={{ fontSize: '1.5rem', fontWeight: 700, color: TEXT_PRIMARY, margin: 0, fontFamily: "'Inter', sans-serif" }}>
        {data.value}
      </p>
      <p style={{ fontSize: '0.75rem', color: TEXT_SECONDARY, margin: '4px 0 0', fontFamily: "'Inter', sans-serif" }}>
        {data.title}
      </p>
    </div>
  )
}

const tooltipStyle = {
  backgroundColor: CARD_BG,
  border: '1px solid rgba(0,0,0,0.06)',
  borderRadius: '12px',
  fontSize: '11px',
  fontFamily: "'Inter', sans-serif",
  boxShadow: '4px 4px 8px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.5)',
}

export default function ClaymorphismDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div style={{ width: '100%', height: '100%', background: BG, display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>
      <header style={{
        ...clayCardSm, borderRadius: '0 0 20px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '56px', margin: '0 0 16px',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: '-0.02em' }}>
            Clayboard
          </span>
          <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.08)' }} />
          {sidebarItems.slice(0, 4).map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveNav(item.key)}
              style={{
                background: 'none', border: 'none', padding: '4px 10px',
                fontSize: '0.8rem', cursor: 'pointer',
                color: activeNav === item.key ? ACCENT : TEXT_SECONDARY,
                fontWeight: activeNav === item.key ? 600 : 500,
                transition: 'color 150ms ease',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            ...clayCardSm, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <Search size={14} color={TEXT_MUTED} />
            <input type="text" placeholder="Search..." style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '0.8rem', color: TEXT_PRIMARY, width: '160px',
            }} />
          </div>
          <button style={{
            ...clayCardSm, width: '36px', height: '36px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer',
          }}>
            <Bell size={16} color={TEXT_SECONDARY} />
          </button>
        </div>
      </header>

      <main style={{ flex: 1, padding: '0 24px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: TEXT_PRIMARY, margin: 0 }}>
            Dashboard Overview
          </h1>
          <p style={{ fontSize: '0.8rem', color: TEXT_SECONDARY, marginTop: '4px' }}>
            Your performance metrics at a glance
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {kpiData.slice(0, 4).map((kpi, i) => <KpiCard key={kpi.title} data={kpi} index={i} />)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ ...clayCard, padding: '24px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: TEXT_PRIMARY, margin: '0 0 12px' }}>Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" tick={{ fill: TEXT_SECONDARY, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: TEXT_SECONDARY, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="revenue" stroke={ACCENT} strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: ACCENT }} name="Revenue" />
                <Line type="monotone" dataKey="users" stroke={ACCENT2} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: ACCENT2 }} name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ ...clayCard, padding: '24px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: TEXT_PRIMARY, margin: '0 0 12px' }}>Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" tick={{ fill: TEXT_SECONDARY, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: TEXT_SECONDARY, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill={ACCENT} radius={[8, 8, 0, 0]} barSize={28} name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ ...clayCard, padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: TEXT_PRIMARY, margin: 0 }}>Team Members</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                ...clayCardSm, border: 'none', padding: '6px 14px',
                fontSize: '0.75rem', cursor: 'pointer', color: TEXT_SECONDARY, fontWeight: 600,
              }}>
                <Filter size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Filter
              </button>
              <button style={{
                ...clayCardSm, border: 'none', padding: '6px 14px',
                fontSize: '0.75rem', cursor: 'pointer', color: '#fff', fontWeight: 600,
                background: `linear-gradient(135deg, ${ACCENT}, #E8A06E)`,
              }}>
                <Download size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                Export
              </button>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Name', 'Role', 'Status', 'Last Active'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: '0.7rem', fontWeight: 600, color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                <tr key={row.id} style={{ transition: 'background 150ms ease' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px', fontSize: '0.85rem', fontWeight: 600, color: TEXT_PRIMARY, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{row.name}</td>
                  <td style={{ padding: '12px', fontSize: '0.8rem', color: TEXT_SECONDARY, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{row.role}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 600,
                      background: row.status === 'Active' ? '#E8F5E9' : row.status === 'Pending' ? '#FFF3E0' : '#F5F5F5',
                      color: row.status === 'Active' ? '#48BB78' : row.status === 'Pending' ? '#ED8936' : '#A0AEC0',
                    }}>
                      {row.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.8rem', color: TEXT_MUTED, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{row.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
