import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Clock,
  Zap,
  Server,
  Database,
  Wifi,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Maximize2,
  Settings,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Signal,
  Cpu,
  HardDrive,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'

const liveData = {
  visitors: { value: 12847, change: 12.5 },
  orders: { value: 847, change: 8.3 },
  revenue: { value: 285680, change: 15.2 },
  conversion: { value: 6.58, change: -2.1 },
}

const trafficSources = [
  { source: '直接访问', value: 35, color: 'from-violet-500 to-purple-500' },
  { source: '搜索引擎', value: 28, color: 'from-blue-500 to-cyan-500' },
  { source: '社交媒体', value: 22, color: 'from-emerald-500 to-teal-500' },
  { source: '外部链接', value: 10, color: 'from-amber-500 to-orange-500' },
  { source: '邮件营销', value: 5, color: 'from-pink-500 to-rose-500' },
]

const recentOrders = [
  { id: 'ORD-20260509001', customer: '张明', amount: 2899, status: 'completed', time: '刚刚' },
  { id: 'ORD-20260509002', customer: '李华', amount: 1599, status: 'processing', time: '2分钟前' },
  { id: 'ORD-20260509003', customer: '王芳', amount: 4599, status: 'completed', time: '5分钟前' },
  { id: 'ORD-20260509004', customer: '刘洋', amount: 899, status: 'pending', time: '8分钟前' },
  { id: 'ORD-20260509005', customer: '陈静', amount: 3299, status: 'completed', time: '12分钟前' },
]

const deviceStats = [
  { type: '桌面端', icon: Monitor, value: 58, change: 3.2 },
  { type: '移动端', icon: Smartphone, value: 38, change: 5.8 },
  { type: '平板', icon: Tablet, value: 4, change: -2.1 },
]

const serverMetrics = [
  { name: 'API服务器', status: 'healthy', uptime: 99.98, response: 45, cpu: 32 },
  { name: '数据库', status: 'healthy', uptime: 99.95, response: 12, cpu: 28 },
  { name: '缓存服务', status: 'healthy', uptime: 99.99, response: 2, cpu: 15 },
  { name: 'CDN', status: 'healthy', uptime: 100, response: 8, cpu: 8 },
]

const hourlyData = [
  { hour: '00:00', visitors: 1200, orders: 45 },
  { hour: '02:00', visitors: 800, orders: 28 },
  { hour: '04:00', visitors: 600, orders: 22 },
  { hour: '06:00', visitors: 900, orders: 35 },
  { hour: '08:00', visitors: 2500, orders: 98 },
  { hour: '10:00', visitors: 4200, orders: 165 },
  { hour: '12:00', visitors: 3800, orders: 142 },
  { hour: '14:00', visitors: 3500, orders: 128 },
  { hour: '16:00', visitors: 3200, orders: 115 },
  { hour: '18:00', visitors: 2800, orders: 95 },
  { hour: '20:00', visitors: 2400, orders: 82 },
  { hour: '22:00', visitors: 1800, orders: 65 },
]

function Tablet({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

export default function RealtimeDashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [data, setData] = useState(liveData)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      if (autoRefresh) {
        setData(prev => ({
          visitors: { ...prev.visitors, value: prev.visitors.value + Math.floor(Math.random() * 20) },
          orders: { ...prev.orders, value: prev.orders.value + Math.floor(Math.random() * 3) },
          revenue: { ...prev.revenue, value: prev.revenue.value + Math.floor(Math.random() * 500) },
          conversion: prev.conversion,
        }))
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [autoRefresh])

  const maxVisitors = Math.max(...hourlyData.map(d => d.visitors))

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <h1 className="text-2xl font-bold text-white">实时数据大屏</h1>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString('zh-CN')}</span>
                <span className="text-neutral-600">|</span>
                <span>{currentTime.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                  autoRefresh 
                    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' 
                    : 'bg-neutral-800 border-white/10 text-neutral-400'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                自动刷新
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
                {isFullscreen ? '退出全屏' : '全屏'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: '实时访客', value: data.visitors.value.toLocaleString(), change: data.visitors.change, icon: Users, color: 'from-violet-500 to-purple-500' },
              { label: '实时订单', value: data.orders.value.toLocaleString(), change: data.orders.change, icon: ShoppingCart, color: 'from-blue-500 to-cyan-500' },
              { label: '实时营收', value: `¥${(data.revenue.value / 10000).toFixed(2)}万`, change: data.revenue.change, icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
              { label: '转化率', value: `${data.conversion.value}%`, change: data.conversion.change, icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5 relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-3xl`} />
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="w-6 h-6 text-white/80" />
                  <span className={`flex items-center gap-1 text-sm ${stat.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">24小时趋势</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                    <span className="text-neutral-400">访客数</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <span className="text-neutral-400">订单数</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-48">
                {hourlyData.map((hour, index) => {
                  const visitorsHeight = (hour.visitors / maxVisitors) * 100
                  const ordersHeight = (hour.orders / 165) * 100
                  const isCurrent = index === hourlyData.length - 1
                  return (
                    <div key={hour.hour} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col-reverse gap-0.5 h-36">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${ordersHeight}%` }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-sm"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${visitorsHeight}%` }}
                          transition={{ delay: index * 0.05 }}
                          className={`w-full bg-gradient-to-t from-violet-500 to-purple-500 rounded-t-sm ${isCurrent ? 'ring-2 ring-white/30' : ''}`}
                        />
                      </div>
                      <span className="text-xs text-neutral-500">{hour.hour}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
              <h3 className="text-lg font-medium text-white mb-4">流量来源</h3>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <motion.div
                    key={source.source}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-neutral-400">{source.source}</span>
                      <span className="text-sm text-white font-medium">{source.value}%</span>
                    </div>
                    <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${source.value}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        className={`h-full bg-gradient-to-r ${source.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">实时订单</h3>
                <span className="text-sm text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  实时更新中
                </span>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        order.status === 'completed' ? 'bg-emerald-500/20' :
                        order.status === 'processing' ? 'bg-blue-500/20' :
                        'bg-amber-500/20'
                      }`}>
                        {order.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                        {order.status === 'processing' && <RefreshCw className="w-5 h-5 text-blue-400" />}
                        {order.status === 'pending' && <Clock className="w-5 h-5 text-amber-400" />}
                      </div>
                      <div>
                        <div className="text-sm text-white font-medium">{order.id}</div>
                        <div className="text-xs text-neutral-500">{order.customer} · {order.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white font-medium">¥{order.amount.toLocaleString()}</div>
                      <div className={`text-xs ${
                        order.status === 'completed' ? 'text-emerald-400' :
                        order.status === 'processing' ? 'text-blue-400' :
                        'text-amber-400'
                      }`}>
                        {order.status === 'completed' ? '已完成' : order.status === 'processing' ? '处理中' : '待支付'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">设备分布</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {deviceStats.map((device, index) => {
                  const DeviceIcon = device.icon
                  return (
                    <motion.div
                      key={device.type}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-neutral-800/50 rounded-xl text-center"
                    >
                      <DeviceIcon className="w-8 h-8 text-white/80 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{device.value}%</div>
                      <div className="text-xs text-neutral-500 mb-1">{device.type}</div>
                      <div className={`text-xs ${device.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {device.change >= 0 ? '+' : ''}{device.change}%
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '58%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/60 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">系统监控</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-400">所有服务正常</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {serverMetrics.map((server, index) => (
                <motion.div
                  key={server.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-neutral-800/50 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Server className="w-5 h-5 text-violet-400" />
                      <span className="text-sm text-white font-medium">{server.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${server.status === 'healthy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">可用率</span>
                      <span className="text-emerald-400">{server.uptime}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${server.uptime}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">响应时间</span>
                      <span className="text-white">{server.response}ms</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500">CPU</span>
                      <span className="text-white">{server.cpu}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
