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
  LayoutDashboard,
  BarChart2,
  Users,
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Clock,
  Eye,
} from 'lucide-react'
import { kpiData, chartData, barChartData, tableData, sidebarItems } from '../data/mockData'

const BG = '#E0E5EC'
const SHADOW_LIGHT = '#ffffff'
const SHADOW_DARK = '#bebebe'
const ACCENT = '#6B7FD7'
const ACCENT_LIGHT = '#8B9FE7'
const TEXT_PRIMARY = '#2D3748'
const TEXT_SECONDARY = '#718096'
const TEXT_MUTED = '#A0AEC0'

const neuRaised = {
  background: BG,
  boxShadow: `8px 8px 16px ${SHADOW_DARK}, -8px -8px 16px ${SHADOW_LIGHT}`,
  borderRadius: '16px',
}

const neuRaisedSm = {
  background: BG,
  boxShadow: `4px 4px 8px ${SHADOW_DARK}, -4px -4px 8px ${SHADOW_LIGHT}`,
  borderRadius: '12px',
}

const neuInset = {
  background: BG,
  boxShadow: `inset 4px 4px 8px ${SHADOW_DARK}, inset -4px -4px 8px ${SHADOW_LIGHT}`,
  borderRadius: '12px',
}

const neuInsetSm = {
  background: BG,
  boxShadow: `inset 2px 2px 4px ${SHADOW_DARK}, inset -2px -2px 4px ${SHADOW_LIGHT}`,
  borderRadius: '8px',
}

const neuFlat = {
  background: BG,
  boxShadow: `6px 6px 12px ${SHADOW_DARK}, -6px -6px 12px ${SHADOW_LIGHT}`,
  borderRadius: '14px',
}

const sidebarIconMap = {
  dashboard: LayoutDashboard,
  analytics: BarChart2,
  customers: Users,
  products: Package,
  orders: ShoppingCart,
  messages: MessageSquare,
  settings: Settings,
}

const kpiIconMap = [
  { icon: DollarSign, color: ACCENT },
  { icon: Users, color: '#48BB78' },
  { icon: Activity, color: '#ED8936' },
  { icon: Clock, color: ACCENT },
]

function NeuButton({ children, active, onClick, style = {} }) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        ...(pressed || active ? neuInsetSm : neuRaisedSm),
        border: 'none',
        padding: '8px 20px',
        cursor: 'pointer',
        color: active ? ACCENT : TEXT_PRIMARY,
        fontWeight: 600,
        fontSize: '0.85rem',
        fontFamily: "'Inter', sans-serif",
        transition: 'all 200ms ease',
        outline: 'none',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

function SidebarItem({ item, active, onClick }) {
  const Icon = sidebarIconMap[item.key] || LayoutDashboard
  const [pressed, setPressed] = useState(false)
  return (
    <button
      onClick={() => onClick(item.key)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        ...(pressed || active ? neuInsetSm : neuRaisedSm),
        border: 'none',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        cursor: 'pointer',
        color: active ? ACCENT : TEXT_SECONDARY,
        fontWeight: active ? 600 : 500,
        fontSize: '0.875rem',
        fontFamily: "'Inter', sans-serif",
        transition: 'all 200ms ease',
        outline: 'none',
        background: BG,
      }}
    >
      <Icon size={18} strokeWidth={active ? 2.5 : 2} />
      <span>{item.label}</span>
    </button>
  )
}

function KpiCard({ data, index }) {
  const { icon: Icon, color } = kpiIconMap[index % kpiIconMap.length]
  const isUp = data.trend === 'up'
  return (
    <div
      style={{
        ...neuRaised,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'all 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `10px 10px 20px ${SHADOW_DARK}, -10px -10px 20px ${SHADOW_LIGHT}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `8px 8px 16px ${SHADOW_DARK}, -8px -8px 16px ${SHADOW_LIGHT}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: TEXT_SECONDARY,
            fontFamily: "'Inter', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {data.title}
        </span>
        <div
          style={{
            ...neuInsetSm,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} color={color} />
        </div>
      </div>
      <div
        style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          color: TEXT_PRIMARY,
          fontFamily: "'Space Grotesk', sans-serif",
          lineHeight: 1.2,
        }}
      >
        {data.value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {isUp ? (
          <TrendingUp size={14} color="#48BB78" />
        ) : (
          <TrendingDown size={14} color="#F56565" />
        )}
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: isUp ? '#48BB78' : '#F56565',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {data.change}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            color: TEXT_MUTED,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          vs last month
        </span>
      </div>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div
      style={{
        ...neuRaised,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: TEXT_PRIMARY,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

function StatusBadge({ status }) {
  const colors = {
    Active: { bg: '#E0E5EC', shadow1: '#bebebe', shadow2: '#ffffff', text: '#48BB78' },
    Inactive: { bg: '#E0E5EC', shadow1: '#bebebe', shadow2: '#ffffff', text: '#A0AEC0' },
    Pending: { bg: '#E0E5EC', shadow1: '#bebebe', shadow2: '#ffffff', text: '#ED8936' },
  }
  const c = colors[status] || colors.Active
  return (
    <span
      style={{
        ...neuInsetSm,
        padding: '4px 12px',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: c.text,
        fontFamily: "'Inter', sans-serif",
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  return (
    <div
      style={{
        ...neuRaisedSm,
        padding: '10px 14px',
        fontSize: '0.8rem',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <p style={{ color: TEXT_PRIMARY, fontWeight: 600, marginBottom: '4px' }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color || ACCENT }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}

export default function NeumorphismDashboard() {
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Top Navigation */}
      <header
        style={{
          ...neuFlat,
          borderRadius: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
          flexShrink: 0,
          boxShadow: `0 4px 12px ${SHADOW_DARK}, 0 -2px 8px ${SHADOW_LIGHT}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: ACCENT,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            Neumorph
          </h1>
          <div
            style={{
              width: '1px',
              height: '24px',
              background: `linear-gradient(to bottom, transparent, ${SHADOW_DARK}, transparent)`,
            }}
          />
          <span
            style={{
              fontSize: '0.85rem',
              color: TEXT_SECONDARY,
              fontWeight: 500,
            }}
          >
            Dashboard
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              ...(searchFocused ? neuInset : neuInsetSm),
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              width: '280px',
              transition: 'all 200ms ease',
            }}
          >
            <Search size={16} color={TEXT_MUTED} />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.85rem',
                color: TEXT_PRIMARY,
                width: '100%',
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>

          <button
            style={{
              ...neuRaisedSm,
              border: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 200ms ease',
              outline: 'none',
              background: BG,
            }}
          >
            <Bell size={18} color={TEXT_SECONDARY} />
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: ACCENT,
                border: `2px solid ${BG}`,
              }}
            />
          </button>

          <div
            style={{
              ...neuRaisedSm,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px 6px 6px',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Eye size={16} color="#fff" />
            </div>
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: TEXT_PRIMARY,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Admin
            </span>
            <ChevronDown size={14} color={TEXT_MUTED} />
          </div>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '240px',
            flexShrink: 0,
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto',
          }}
        >
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: TEXT_MUTED,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '0 8px',
              marginBottom: '8px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Navigation
          </p>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              item={item}
              active={activeSidebar === item.key}
              onClick={setActiveSidebar}
            />
          ))}

          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <div
              style={{
                ...neuRaised,
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  ...neuInsetSm,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                <Settings size={20} color={ACCENT} />
              </div>
              <p
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: TEXT_PRIMARY,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textAlign: 'center',
                }}
              >
                Quick Settings
              </p>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: TEXT_MUTED,
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}
              >
                Customize your dashboard preferences
              </p>
              <NeuButton>Configure</NeuButton>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: '24px 32px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Page Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: TEXT_PRIMARY,
                  fontFamily: "'Space Grotesk', sans-serif",
                  lineHeight: 1.2,
                }}
              >
                Dashboard Overview
              </h2>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: TEXT_SECONDARY,
                  marginTop: '4px',
                }}
              >
                Welcome back. Here is your performance summary.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <NeuButton>Export</NeuButton>
              <NeuButton
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                  color: '#fff',
                  boxShadow: `4px 4px 8px ${SHADOW_DARK}, -4px -4px 8px ${SHADOW_LIGHT}`,
                }}
              >
                New Report
              </NeuButton>
            </div>
          </div>

          {/* KPI Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
            }}
          >
            {kpiData.slice(0, 4).map((kpi, i) => (
              <KpiCard key={kpi.title} data={kpi} index={i} />
            ))}
          </div>

          {/* Charts Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
            }}
          >
            <ChartCard title="Revenue Trend">
              <div style={{ width: '100%', height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d0d5dd" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: TEXT_SECONDARY, fontSize: 12, fontFamily: 'Inter' }}
                      axisLine={{ stroke: '#d0d5dd' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: TEXT_SECONDARY, fontSize: 12, fontFamily: 'Inter' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke={ACCENT}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{
                        r: 6,
                        fill: ACCENT,
                        stroke: BG,
                        strokeWidth: 3,
                      }}
                      name="Revenue"
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#48BB78"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{
                        r: 5,
                        fill: '#48BB78',
                        stroke: BG,
                        strokeWidth: 3,
                      }}
                      name="Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Weekly Activity">
              <div style={{ width: '100%', height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d0d5dd" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: TEXT_SECONDARY, fontSize: 12, fontFamily: 'Inter' }}
                      axisLine={{ stroke: '#d0d5dd' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: TEXT_SECONDARY, fontSize: 12, fontFamily: 'Inter' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      fill={ACCENT}
                      radius={[6, 6, 0, 0]}
                      barSize={32}
                      name="Activity"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Data Table */}
          <div
            style={{
              ...neuRaised,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: TEXT_PRIMARY,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Team Members
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <NeuButton>Filter</NeuButton>
                <NeuButton>Add Member</NeuButton>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'separate',
                  borderSpacing: '0 4px',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <thead>
                  <tr>
                    {['Name', 'Email', 'Role', 'Status', 'Last Active', 'Action'].map(
                      (header) => (
                        <th
                          key={header}
                          style={{
                            textAlign: 'left',
                            padding: '12px 16px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: TEXT_MUTED,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            borderBottom: `1px solid ${SHADOW_DARK}`,
                          }}
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr
                      key={row.id}
                      style={{
                        transition: 'all 200ms ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `linear-gradient(135deg, rgba(107,127,215,0.04), rgba(107,127,215,0.08))`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <td
                        style={{
                          padding: '14px 16px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: TEXT_PRIMARY,
                          borderBottom: `1px solid rgba(190,190,190,0.3)`,
                        }}
                      >
                        {row.name}
                      </td>
                      <td
                        style={{
                          padding: '14px 16px',
                          fontSize: '0.85rem',
                          color: TEXT_SECONDARY,
                          borderBottom: `1px solid rgba(190,190,190,0.3)`,
                        }}
                      >
                        {row.email}
                      </td>
                      <td
                        style={{
                          padding: '14px 16px',
                          fontSize: '0.85rem',
                          color: TEXT_SECONDARY,
                          borderBottom: `1px solid rgba(190,190,190,0.3)`,
                        }}
                      >
                        {row.role}
                      </td>
                      <td
                        style={{
                          padding: '14px 16px',
                          borderBottom: `1px solid rgba(190,190,190,0.3)`,
                        }}
                      >
                        <StatusBadge status={row.status} />
                      </td>
                      <td
                        style={{
                          padding: '14px 16px',
                          fontSize: '0.85rem',
                          color: TEXT_MUTED,
                          borderBottom: `1px solid rgba(190,190,190,0.3)`,
                        }}
                      >
                        {row.lastActive}
                      </td>
                      <td
                        style={{
                          padding: '14px 16px',
                          borderBottom: `1px solid rgba(190,190,190,0.3)`,
                        }}
                      >
                        <NeuButton style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                          View
                        </NeuButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
