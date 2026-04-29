import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard, BarChart3, Users as UsersIcon, Package, ShoppingCart, MessageSquare, Settings,
  Search, Bell, TrendingUp, TrendingDown, Filter,
} from 'lucide-react'
import { sidebarItems } from '../data/mockData'

const sidebarIcons = {
  dashboard: LayoutDashboard, analytics: BarChart3, customers: UsersIcon,
  products: Package, orders: ShoppingCart, messages: MessageSquare, settings: Settings,
}

export default function NeoChineseDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#f5f0e8' }}>
      <aside className="w-56 flex-shrink-0 py-6 px-3 flex flex-col" style={{ background: '#ebe5d9', borderRight: '1px solid #d4cbb8' }}>
        <div className="px-3 mb-8">
          <h1 className="text-lg font-bold tracking-widest" style={{ color: '#5a4a3a', fontFamily: 'serif' }}>雅 · 境</h1>
          <div className="mt-1 h-px" style={{ background: 'linear-gradient(90deg, #8b7355, transparent)' }} />
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer ${isActive ? 'text-[#8b2500]' : 'text-[#7a6a5a] hover:text-[#5a4a3a]'}`}
                style={isActive ? { background: 'rgba(139,37,0,0.06)', borderLeft: '2px solid #8b2500' } : { borderLeft: '2px solid transparent' }}
              >
                <Icon className="w-4 h-4" />
                <span style={{ letterSpacing: '0.1em' }}>{item.label}</span>
              </button>
            )
          })}
        </div>
        <div className="px-3 pt-4" style={{ borderTop: '1px solid #d4cbb8' }}>
          <p className="text-xs" style={{ color: '#a09080', letterSpacing: '0.2em' }}>山水之间</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ background: '#f5f0e8', borderBottom: '1px solid #d4cbb8' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#3a2a1a', letterSpacing: '0.15em' }}>数据总览</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#a09080' }} />
              <input type="text" placeholder="搜索..." className="pl-10 pr-4 py-2 text-sm focus:outline-none w-48" style={{ background: '#ebe5d9', border: '1px solid #d4cbb8', color: '#5a4a3a', borderRadius: '4px' }} />
            </div>
            <button className="p-2 cursor-pointer" style={{ color: '#7a6a5a' }}><Bell className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-5 mb-8">
            {[
              { label: '总营收', value: '¥328,500', change: '+12.5%', up: true },
              { label: '活跃用户', value: '24,589', change: '+8.2%', up: true },
              { label: '新增订单', value: '1,847', change: '-2.4%', up: false },
              { label: '转化率', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-5" style={{ background: '#faf7f2', border: '1px solid #d4cbb8', borderRadius: '2px' }}>
                <p className="text-sm mb-1" style={{ color: '#8a7a6a', letterSpacing: '0.1em' }}>{kpi.label}</p>
                <p className="text-2xl font-bold mb-2" style={{ color: '#3a2a1a' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${kpi.up ? 'text-[#2d6a4f]' : 'text-[#8b2500]'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="col-span-2 p-6" style={{ background: '#faf7f2', border: '1px solid #d4cbb8', borderRadius: '2px' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#3a2a1a', letterSpacing: '0.15em' }}>月度营收</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: 'linear-gradient(180deg, #8b7355 0%, #a09080 100%)', borderRadius: '1px 1px 0 0' }} />
                    <span className="text-[9px]" style={{ color: '#a09080' }}>{['一','二','三','四','五','六','七','八','九','十','十一','十二'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{ background: '#faf7f2', border: '1px solid #d4cbb8', borderRadius: '2px' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#3a2a1a', letterSpacing: '0.15em' }}>品类分布</h3>
              <div className="space-y-4">
                {[
                  { name: '瓷器', pct: 75, color: '#8b7355' },
                  { name: '丝绸', pct: 58, color: '#8b2500' },
                  { name: '茶叶', pct: 42, color: '#2d6a4f' },
                  { name: '漆器', pct: 30, color: '#5a4a3a' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1" style={{ color: '#7a6a5a' }}>
                      <span style={{ letterSpacing: '0.1em' }}>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-1.5" style={{ background: '#ebe5d9', borderRadius: '1px' }}>
                      <div className="h-full" style={{ width: `${p.pct}%`, background: p.color, borderRadius: '1px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6" style={{ background: '#faf7f2', border: '1px solid #d4cbb8', borderRadius: '2px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: '#3a2a1a', letterSpacing: '0.15em' }}>近期订单</h3>
              <button className="flex items-center gap-1 text-xs cursor-pointer" style={{ color: '#8a7a6a' }}><Filter className="w-3 h-3" />筛选</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid #d4cbb8' }}>
                  {['订单号', '客户', '金额', '状态'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-xs font-medium uppercase" style={{ color: '#a09080', letterSpacing: '0.1em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#甲三二一', name: '王明远', amount: '¥2,450', status: '已完成' },
                  { id: '#甲三二〇', name: '李清照', amount: '¥1,890', status: '处理中' },
                  { id: '#甲三一九', name: '赵无极', amount: '¥4,320', status: '已完成' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #ebe5d9' }}>
                    <td className="py-3 px-3 text-sm" style={{ color: '#7a6a5a' }}>{row.id}</td>
                    <td className="py-3 px-3 text-sm" style={{ color: '#5a4a3a' }}>{row.name}</td>
                    <td className="py-3 px-3 text-sm font-medium" style={{ color: '#3a2a1a' }}>{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-medium px-2 py-0.5" style={{
                        borderRadius: '2px',
                        background: row.status === '已完成' ? 'rgba(45,106,79,0.1)' : 'rgba(139,37,0,0.08)',
                        color: row.status === '已完成' ? '#2d6a4f' : '#8b2500',
                      }}>{row.status}</span>
                    </td>
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