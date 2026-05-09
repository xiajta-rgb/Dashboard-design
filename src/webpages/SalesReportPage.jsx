import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const salesData = [
  { month: '1月', sales: 125, target: 100, actual: 125 },
  { month: '2月', sales: 98, target: 110, actual: 98 },
  { month: '3月', sales: 156, target: 120, actual: 156 },
  { month: '4月', sales: 189, target: 130, actual: 189 },
  { month: '5月', sales: 145, target: 140, actual: 145 },
  { month: '6月', sales: 178, target: 150, actual: 178 },
]

const regionData = [
  { region: '华东地区', sales: 450, percentage: 35, change: 12 },
  { region: '华南地区', sales: 320, percentage: 25, change: 8 },
  { region: '华北地区', sales: 280, percentage: 22, change: -3 },
  { region: '西南地区', sales: 150, percentage: 12, change: 15 },
  { region: '西北地区', sales: 80, percentage: 6, change: 5 },
]

const productData = [
  { name: '智能手表 Pro', sales: 280, growth: 25 },
  { name: '无线耳机 Max', sales: 420, growth: 18 },
  { name: '便携音箱 Mini', sales: 180, growth: -5 },
  { name: '充电宝 Ultra', sales: 350, growth: 12 },
]

const stats = [
  { 
    label: '本月销售额', 
    value: '¥128.5万', 
    change: '+15.8%', 
    trend: 'up',
    icon: DollarSign,
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    label: '完成率', 
    value: '96.8%', 
    change: '+2.3%', 
    trend: 'up',
    icon: Target,
    color: 'from-violet-500 to-purple-500'
  },
  { 
    label: '新客户', 
    value: '42', 
    change: '+18%', 
    trend: 'up',
    icon: Users,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    label: '平均客单价', 
    value: '¥8.2万', 
    change: '-3.2%', 
    trend: 'down',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-500'
  },
]

export default function SalesReportPage() {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedPeriod, setSelectedPeriod] = useState('2026年5月')

  const maxSales = Math.max(...regionData.map(d => d.sales))
  const totalSales = regionData.reduce((sum, d) => sum + d.sales, 0)

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">销售报表</h1>
              <p className="text-sm text-neutral-500 mt-1">全面的销售数据分析与洞察</p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-neutral-800 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-violet-500/50"
              >
                <option value="week">本周</option>
                <option value="month">本月</option>
                <option value="quarter">本季度</option>
                <option value="year">本年</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出报表
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-neutral-900/50 rounded-2xl border border-white/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">销售趋势</h2>
                <select className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none">
                  <option>近6个月</option>
                  <option>近12个月</option>
                </select>
              </div>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={data.month} className="flex items-center gap-4">
                    <span className="w-12 text-sm text-neutral-500">{data.month}</span>
                    <div className="flex-1 relative">
                      <div className="h-8 bg-neutral-800 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(data.actual / maxSales) * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg"
                        />
                      </div>
                      <div 
                        className="absolute top-0 h-full border-l-2 border-dashed border-amber-400"
                        style={{ left: `${(data.target / maxSales) * 100}%` }}
                      />
                    </div>
                    <span className="w-16 text-sm text-right font-medium text-white">
                      ¥{data.sales}万
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-violet-500 to-purple-500" />
                  <span className="text-xs text-neutral-500">实际销售额</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-400" />
                  <span className="text-xs text-neutral-500">目标销售额</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">区域分布</h2>
                <span className="text-sm text-neutral-500">总计 ¥{totalSales}万</span>
              </div>
              <div className="space-y-4">
                {regionData.map((region, index) => (
                  <motion.div
                    key={region.region}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-20 text-sm text-neutral-400">{region.region}</span>
                    <div className="flex-1">
                      <div className="h-6 bg-neutral-800 rounded-lg overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${region.percentage}%` }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="w-32 flex items-center justify-between">
                      <span className="text-sm font-medium text-white">¥{region.sales}万</span>
                      <span className={`text-xs flex items-center gap-1 ${
                        region.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {region.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(region.change)}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">产品销售排行</h2>
                <button className="text-sm text-violet-400 hover:text-violet-300">查看全部</button>
              </div>
              <div className="space-y-4">
                {productData.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-neutral-800/50 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{product.name}</p>
                      <p className="text-xs text-neutral-500">销量 {product.sales} 件</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">¥{(product.sales * 299).toLocaleString()}</p>
                        <p className={`text-xs flex items-center justify-end gap-1 ${
                          product.growth >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {product.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {Math.abs(product.growth)}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">销售漏斗</h2>
              <div className="space-y-3">
                {[
                  { stage: '线索', value: 1000, color: 'from-blue-500 to-cyan-500' },
                  { stage: '商机', value: 580, color: 'from-violet-500 to-purple-500' },
                  { stage: '报价', value: 320, color: 'from-amber-500 to-orange-500' },
                  { stage: '成交', value: 186, color: 'from-emerald-500 to-teal-500' },
                ].map((item, index) => (
                  <motion.div
                    key={item.stage}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-400">{item.stage}</span>
                      <span className="text-sm font-medium text-white">{item.value}</span>
                    </div>
                    <div className="h-8 bg-neutral-800 rounded-lg overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-lg`}
                        style={{ width: `${(item.value / 1000) * 100}%` }}
                      />
                    </div>
                    {index < 3 && (
                      <div className="absolute -bottom-1.5 left-0 right-0 flex justify-center">
                        <svg className="w-4 h-4 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5">
                <p className="text-sm text-neutral-500 mb-2">平均转化率</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">32.4%</span>
                  <span className="text-sm text-emerald-400">+5.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}