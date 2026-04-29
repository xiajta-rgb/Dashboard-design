import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  Users,
  TrendingUp,
  TrendingDown,
  LayoutDashboard,
  Settings,
  Search,
  Bell,
  Filter,
  ChevronDown,
  MoreVertical,
} from 'lucide-react'
import { kpiData, tableData, sidebarItems , sidebarIcons } from '../data/mockData'



export default function DiffusionDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-[#0a0a0f]">
      {/* 顶部弥散光带 - 参考图核心效果 */}
      <div className="absolute top-0 left-0 right-0 h-[400px] overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(34,211,238,0.25) 0%, rgba(52,211,153,0.15) 30%, rgba(16,185,129,0.08) 60%, transparent 100%)',
            filter: 'blur(80px)',
            transform: 'scaleX(1.5)',
          }}
        />
        <div
          className="absolute top-[-50px] left-[20%] w-[60%] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.3) 0%, rgba(52,211,153,0.15) 40%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'diffusion-glow1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[-30px] right-[10%] w-[40%] h-[250px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.25) 0%, rgba(52,211,153,0.1) 50%, transparent 80%)',
            filter: 'blur(50px)',
            animation: 'diffusion-glow2 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* 底部弥散光 */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-[-100px] left-[30%] w-[50%] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'diffusion-glow3 12s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes diffusion-glow1 {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.8; }
          50% { transform: translateX(30px) scaleX(1.1); opacity: 1; }
        }
        @keyframes diffusion-glow2 {
          0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.7; }
          50% { transform: translateX(-25px) scaleX(1.05); opacity: 0.9; }
        }
        @keyframes diffusion-glow3 {
          0%, 100% { transform: translateX(0) scale(1); opacity: 0.6; }
          50% { transform: translateX(20px) scale(1.08); opacity: 0.8; }
        }
      `}</style>

      <div className="relative z-10 flex h-full">
        {/* 侧边栏 */}
        <aside className="w-64 flex-shrink-0 bg-[#111118] border-r border-white/5 py-6 px-4 flex flex-col">
          <div className="flex items-center gap-3 px-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white/90 font-semibold">Pixel Mags</span>
          </div>

          <div className="text-xs text-white/30 uppercase tracking-wider px-3 mb-3">Menu</div>
          <div className="flex flex-col gap-1 mb-6">
            {sidebarItems.slice(0, 5).map((item) => {
              const Icon = sidebarIcons[item.key] || LayoutDashboard
              const isActive = activeSidebar === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/20'
                      : 'text-white/50 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="text-xs text-white/30 uppercase tracking-wider px-3 mb-3">Others</div>
          <div className="flex flex-col gap-1 flex-1">
            {sidebarItems.slice(5).map((item) => {
              const Icon = sidebarIcons[item.key] || Settings
              const isActive = activeSidebar === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/20'
                      : 'text-white/50 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 truncate">Kabir Singh</p>
                <p className="text-xs text-white/40">View Profile</p>
              </div>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 overflow-y-auto">
          {/* 顶部导航 */}
          <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
            <h1 className="text-xl font-semibold text-white/90">Dashboard Overview</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="pl-10 pr-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white/70 placeholder-white/30 focus:outline-none focus:border-cyan-400/50 w-64 transition-colors"
                />
              </div>
              <button className="relative p-2.5 text-white/50 hover:text-white/70 transition-colors cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
              </button>
            </div>
          </header>

          <div className="p-8">
            {/* KPI 卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Today's Revenue", value: '₹15,00,000', change: '+4.8%', up: true },
                { title: "Today's Orders", value: '7,506', change: '-3.5%', up: false },
                { title: "Today's Visitors", value: '17,058', change: '+9.3%', up: true },
              ].map((kpi, i) => (
                <div
                  key={i}
                  className="relative p-5 rounded-2xl border border-white/10 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-20" style={{
                    background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }} />
                  <div className="relative">
                    <p className="text-sm text-white/60 mb-2">{kpi.title}</p>
                    <p className="text-2xl font-bold text-white mb-3">{kpi.value}</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${kpi.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {kpi.change}
                      </span>
                      <span className="text-xs text-white/40">from yesterday</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div
                className="lg:col-span-2 p-6 rounded-2xl border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-white/80">Sales Analytics</h3>
                  <div className="flex items-center gap-1">
                    {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((tab, i) => (
                      <button
                        key={tab}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                          i === 3 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-48 flex items-end justify-between gap-2 px-2">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(180deg, rgba(34,211,238,0.6) 0%, rgba(52,211,153,0.3) 100%)`,
                          boxShadow: '0 0 10px rgba(34,211,238,0.3)',
                        }}
                      />
                      <span className="text-[10px] text-white/30">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="p-6 rounded-2xl border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-semibold text-white/80">Returns</h3>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>Jan - Jun '22</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
                <div className="h-48 flex items-end justify-between gap-3 px-2">
                  {[35, 25, 30, 45, 30, 48].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          background: i === 3
                            ? 'linear-gradient(180deg, rgba(34,211,238,0.8) 0%, rgba(52,211,153,0.5) 100%)'
                            : 'linear-gradient(180deg, rgba(34,211,238,0.4) 0%, rgba(52,211,153,0.2) 100%)',
                          boxShadow: i === 3 ? '0 0 15px rgba(34,211,238,0.4)' : 'none',
                        }}
                      />
                      <span className="text-[10px] text-white/30">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 表格 */}
            <div
              className="rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h3 className="text-base font-semibold text-white/80">Best Selling Products</h3>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/50 bg-white/5 rounded-lg cursor-pointer">
                    <Filter className="w-3 h-3" />
                    Filter By
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/50 bg-white/5 rounded-lg cursor-pointer">
                    Sort By: Relevance
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="py-3 px-6 text-left text-xs font-medium text-white/30 uppercase tracking-wider">Product ID</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-white/30 uppercase tracking-wider">Image</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-white/30 uppercase tracking-wider">Product Name</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-white/30 uppercase tracking-wider">Price</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-white/30 uppercase tracking-wider">Total Sales</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-white/30 uppercase tracking-wider">Stock</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-white/30 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { id: '#12598', name: 'Off-white shoulder wide s...', price: '₹4,099', sales: 48, stock: 25, status: 'In Stock', statusColor: 'emerald' },
                    { id: '#20587', name: 'Green Velvet semi-sleeve...', price: '₹10,000', sales: 76, stock: 0, status: 'Out of Stock', statusColor: 'rose' },
                    { id: '#10020', name: 'Nike air max 2099', price: '₹17,500', sales: 32, stock: 3, status: 'Restock', statusColor: 'amber' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 text-sm text-white/50">{row.id}</td>
                      <td className="py-4 px-6">
                        <div className="w-10 h-10 rounded-lg bg-white/10" />
                      </td>
                      <td className="py-4 px-6 text-sm text-white/70">{row.name}</td>
                      <td className="py-4 px-6 text-sm text-white/70">{row.price}</td>
                      <td className="py-4 px-6 text-sm text-white/50">{row.sales}</td>
                      <td className="py-4 px-6 text-sm text-white/50">{row.stock}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          row.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                          row.statusColor === 'rose' ? 'bg-rose-500/10 text-rose-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button className="p-1 text-white/30 hover:text-white/50 cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
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