import { useState } from 'react'
import { useDashboard } from '../context/DashboardContext'
import {
  LayoutDashboard,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Filter,
} from 'lucide-react'
import { sidebarItems , sidebarIcons } from '../data/mockData'



export default function GuochaoRetroDashboard() {
  const { openLayoutLib } = useDashboard()
  const [activeSidebar, setActiveSidebar] = useState('dashboard')

  return (
    <div className="w-full h-screen overflow-hidden font-sans flex" style={{ background: '#1a0a0a' }}>
      <style>{`
        @keyframes guochao-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      `}</style>
      <aside className="w-56 flex-shrink-0 py-6 px-3 flex flex-col" style={{ background: '#2a1010', borderRight: '2px solid #c41e3a' }}>
        <div className="px-3 mb-8">
          <h1 className="text-xl font-black tracking-wider" style={{ color: '#ffd700', textShadow: '2px 2px 0 #c41e3a' }}>国潮</h1>
          <div className="mt-2 flex gap-1">
            {['#c41e3a','#ffd700','#1a0a0a'].map((c,i) => (
              <div key={i} className="h-1 flex-1" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {sidebarItems.map((item) => {
            const Icon = sidebarIcons[item.key] || LayoutDashboard
            const isActive = activeSidebar === item.key
            return (
              <button
                key={item.key}
                onClick={() => item.key === 'settings' ? openLayoutLib() : setActiveSidebar(item.key)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-bold cursor-pointer ${isActive ? 'text-[#ffd700]' : 'text-[#c41e3a]/70 hover:text-[#c41e3a]'}`}
                style={isActive ? { background: 'rgba(196,30,58,0.2)', borderLeft: '3px solid #ffd700' } : { borderLeft: '3px solid transparent' }}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between px-8 py-4" style={{ background: '#2a1010', borderBottom: '2px solid #c41e3a' }}>
          <h2 className="text-lg font-black tracking-wider" style={{ color: '#ffd700' }}>数据大盘</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c41e3a]/50" />
              <input type="text" placeholder="搜索..." className="pl-10 pr-4 py-2 text-sm focus:outline-none w-48" style={{ background: '#1a0a0a', border: '1px solid #c41e3a', color: '#ffd700', borderRadius: '0px' }} />
            </div>
            <button className="p-2 cursor-pointer" style={{ color: '#c41e3a' }}><Bell className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: '总营收', value: '¥328,500', change: '+12.5%', up: true },
              { label: '活跃用户', value: '24,589', change: '+8.2%', up: true },
              { label: '新增订单', value: '1,847', change: '-2.4%', up: false },
              { label: '转化率', value: '3.42%', change: '+5.1%', up: true },
            ].map((kpi, i) => (
              <div key={i} className="p-5" style={{
                background: '#2a1010',
                border: '2px solid #c41e3a',
                borderRadius: '0px',
                boxShadow: '4px 4px 0 #c41e3a',
                animation: 'guochao-float 3s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
              }}>
                <p className="text-sm font-bold mb-1" style={{ color: '#c41e3a' }}>{kpi.label}</p>
                <p className="text-2xl font-black mb-2" style={{ color: '#ffd700' }}>{kpi.value}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="col-span-2 p-6" style={{ background: '#2a1010', border: '2px solid #c41e3a', borderRadius: '0px' }}>
              <h3 className="text-sm font-black mb-4" style={{ color: '#ffd700' }}>月度营收</h3>
              <div className="h-48 flex items-end justify-between gap-2">
                {[35, 52, 41, 67, 55, 73, 62, 81, 70, 88, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full" style={{ height: `${h}%`, background: i % 2 === 0 ? '#c41e3a' : '#ffd700', borderRadius: '0px' }} />
                    <span className="text-[9px] font-bold" style={{ color: '#c41e3a' }}>{['一','二','三','四','五','六','七','八','九','十','十一','十二'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6" style={{ background: '#2a1010', border: '2px solid #c41e3a', borderRadius: '0px' }}>
              <h3 className="text-sm font-black mb-4" style={{ color: '#ffd700' }}>热门品类</h3>
              <div className="space-y-4">
                {[
                  { name: '汉服', pct: 85, color: '#c41e3a' },
                  { name: '国风文创', pct: 68, color: '#ffd700' },
                  { name: '传统手作', pct: 52, color: '#c41e3a' },
                  { name: '国潮联名', pct: 38, color: '#ffd700' },
                ].map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs font-bold mb-1" style={{ color: p.color }}>
                      <span>{p.name}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-2" style={{ background: '#1a0a0a' }}>
                      <div className="h-full" style={{ width: `${p.pct}%`, background: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6" style={{ background: '#2a1010', border: '2px solid #c41e3a', borderRadius: '0px' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black" style={{ color: '#ffd700' }}>近期订单</h3>
              <button className="flex items-center gap-1 text-xs font-bold cursor-pointer" style={{ color: '#c41e3a' }}><Filter className="w-3 h-3" />筛选</button>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '2px solid #c41e3a' }}>
                  {['订单号', '客户', '金额', '状态'].map(h => (
                    <th key={h} className="py-2 px-3 text-left text-xs font-black uppercase" style={{ color: '#c41e3a' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#甲三二一', name: '王明远', amount: '¥2,450', status: '已完成' },
                  { id: '#甲三二〇', name: '李清照', amount: '¥1,890', status: '处理中' },
                  { id: '#甲三一九', name: '赵无极', amount: '¥4,320', status: '已完成' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #3a1515' }}>
                    <td className="py-3 px-3 text-sm font-bold" style={{ color: '#c41e3a' }}>{row.id}</td>
                    <td className="py-3 px-3 text-sm font-bold" style={{ color: '#ffd700' }}>{row.name}</td>
                    <td className="py-3 px-3 text-sm font-black" style={{ color: '#ffd700' }}>{row.amount}</td>
                    <td className="py-3 px-3">
                      <span className="text-xs font-bold px-2 py-0.5" style={{
                        background: row.status === '已完成' ? '#c41e3a' : '#ffd700',
                        color: row.status === '已完成' ? '#ffd700' : '#1a0a0a',
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