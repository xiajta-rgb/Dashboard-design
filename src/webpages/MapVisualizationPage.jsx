import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Filter,
  Download,
  ZoomIn,
  ZoomOut,
  MapPin,
  Layers,
  Globe,
  Navigation,
  Maximize2,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Map,
  Radio,
  Target,
  Circle,
  Hexagon,
  Square
} from 'lucide-react'

const regions = [
  { 
    id: 'north', 
    name: '华北地区', 
    cities: ['北京', '天津', '石家庄', '太原', '呼和浩特'],
    stats: { sales: 1250, growth: 18.5, customers: 8500, orders: 45000 },
    color: '#6366f1',
    position: { top: 25, left: 50 }
  },
  { 
    id: 'northeast', 
    name: '东北地区', 
    cities: ['沈阳', '大连', '长春', '哈尔滨'],
    stats: { sales: 680, growth: 12.3, customers: 4200, orders: 28000 },
    color: '#8b5cf6',
    position: { top: 20, left: 75 }
  },
  { 
    id: 'east', 
    name: '华东地区', 
    cities: ['上海', '南京', '杭州', '宁波', '苏州', '青岛'],
    stats: { sales: 2180, growth: 22.8, customers: 15600, orders: 82000 },
    color: '#06b6d4',
    position: { top: 40, left: 72 }
  },
  { 
    id: 'central', 
    name: '华中地区', 
    cities: ['武汉', '长沙', '郑州', '南昌', '合肥'],
    stats: { sales: 890, growth: 15.6, customers: 6800, orders: 38000 },
    color: '#10b981',
    position: { top: 45, left: 58 }
  },
  { 
    id: 'south', 
    name: '华南地区', 
    cities: ['广州', '深圳', '福州', '厦门', '南宁', '海口'],
    stats: { sales: 1850, growth: 25.2, customers: 12800, orders: 68000 },
    color: '#f59e0b',
    position: { top: 60, left: 65 }
  },
  { 
    id: 'southwest', 
    name: '西南地区', 
    cities: ['重庆', '成都', '昆明', '贵阳', '拉萨'],
    stats: { sales: 720, growth: 19.8, customers: 5200, orders: 32000 },
    color: '#ef4444',
    position: { top: 55, left: 42 }
  },
  { 
    id: 'northwest', 
    name: '西北地区', 
    cities: ['西安', '兰州', '西宁', '银川', '乌鲁木齐'],
    stats: { sales: 450, growth: 8.5, customers: 3200, orders: 18000 },
    color: '#ec4899',
    position: { top: 35, left: 28 }
  },
]

const cities = [
  { name: '北京', position: { top: 28, left: 62 }, sales: 580, growth: 15.2 },
  { name: '上海', position: { top: 48, left: 74 }, sales: 720, growth: 18.5 },
  { name: '广州', position: { top: 65, left: 62 }, sales: 520, growth: 22.3 },
  { name: '深圳', position: { top: 63, left: 65 }, sales: 480, growth: 25.8 },
  { name: '杭州', position: { top: 50, left: 70 }, sales: 380, growth: 28.5 },
  { name: '成都', position: { top: 52, left: 45 }, sales: 320, growth: 20.1 },
  { name: '重庆', position: { top: 48, left: 42 }, sales: 280, growth: 18.9 },
  { name: '武汉', position: { top: 45, left: 58 }, sales: 260, growth: 16.4 },
  { name: '西安', position: { top: 38, left: 45 }, sales: 220, growth: 12.8 },
  { name: '南京', position: { top: 42, left: 68 }, sales: 240, growth: 14.2 },
]

const hotSpots = [
  { id: 1, name: '京津冀城市群', position: { top: 30, left: 58 }, intensity: 95 },
  { id: 2, name: '长三角城市群', position: { top: 46, left: 72 }, intensity: 98 },
  { id: 3, name: '珠三角城市群', position: { top: 62, left: 64 }, intensity: 92 },
  { id: 4, name: '成渝城市群', position: { top: 50, left: 44 }, intensity: 78 },
  { id: 5, name: '长江中游城市群', position: { top: 44, left: 58 }, intensity: 72 },
]

const stats = [
  { label: '全国销售额', value: '¥8,020万', change: '+18.5%', trend: 'up', icon: DollarSign },
  { label: '覆盖城市', value: '286', change: '+12', trend: 'up', icon: MapPin },
  { label: '活跃客户', value: '58,300', change: '+8.2%', trend: 'up', icon: Users },
  { label: '订单总量', value: '311,000', change: '+15.6%', trend: 'up', icon: ShoppingCart },
]

const distributionData = [
  { category: '一线城市', value: 35, color: 'from-violet-500 to-purple-500' },
  { category: '新一线城市', value: 28, color: 'from-blue-500 to-cyan-500' },
  { category: '二线城市', value: 22, color: 'from-emerald-500 to-teal-500' },
  { category: '三线城市', value: 10, color: 'from-amber-500 to-orange-500' },
  { category: '其他城市', value: 5, color: 'from-pink-500 to-rose-500' },
]

export default function MapVisualizationPage() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [hoveredCity, setHoveredCity] = useState(null)
  const [viewMode, setViewMode] = useState('sales')
  const [showHotSpots, setShowHotSpots] = useState(true)
  const [showRegions, setShowRegions] = useState(true)
  const [mapZoom, setMapZoom] = useState(1)

  const selectedRegionData = regions.find(r => r.id === selectedRegion)

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">地图可视化</h1>
              <p className="text-sm text-neutral-500 mt-1">全国销售网络分布和区域数据分析</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-neutral-800 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('sales')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'sales' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  销售额
                </button>
                <button
                  onClick={() => setViewMode('customers')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'customers' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  客户数
                </button>
                <button
                  onClick={() => setViewMode('growth')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'growth' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  增长率
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-violet-400" />
                  <span className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowRegions(!showRegions)}
                      className={`p-2 rounded-lg transition-all ${showRegions ? 'bg-violet-500/20 text-violet-400' : 'text-neutral-500 hover:bg-neutral-800'}`}
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowHotSpots(!showHotSpots)}
                      className={`p-2 rounded-lg transition-all ${showHotSpots ? 'bg-red-500/20 text-red-400' : 'text-neutral-500 hover:bg-neutral-800'}`}
                    >
                      <Target className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-neutral-400">图层控制</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMapZoom(Math.max(0.5, mapZoom - 0.2))}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-neutral-400 w-16 text-center">{Math.round(mapZoom * 100)}%</span>
                  <button
                    onClick={() => setMapZoom(Math.min(2, mapZoom + 0.2))}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative p-4" style={{ height: '500px' }}>
                <div 
                  className="relative w-full h-full bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 rounded-xl border border-white/5 overflow-hidden"
                  style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
                >
                  <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-neutral-800 opacity-30" />

                  {showRegions && regions.map((region) => (
                    <motion.div
                      key={region.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: region.id.charCodeAt(0) * 0.05 }}
                      className="absolute cursor-pointer group"
                      style={{ 
                        top: `${region.position.top}%`, 
                        left: `${region.position.left}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                      onMouseEnter={() => setSelectedRegion(region.id)}
                      onMouseLeave={() => setSelectedRegion(null)}
                    >
                      <div 
                        className={`relative transition-all duration-300 ${
                          selectedRegion === region.id ? 'scale-125' : 'group-hover:scale-110'
                        }`}
                      >
                        <Hexagon 
                          className="w-20 h-20 transition-all duration-300"
                          style={{ fill: region.color + '30', stroke: region.color, strokeWidth: 2 }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-white font-medium opacity-80">{region.name.slice(0, 2)}</span>
                        </div>
                      </div>
                      {selectedRegion === region.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-neutral-900 border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap z-10"
                        >
                          <div className="text-sm font-medium text-white">{region.name}</div>
                          <div className="text-xs text-neutral-400">销售额 ¥{region.stats.sales}万</div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {cities.map((city) => (
                    <motion.div
                      key={city.name}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: cities.indexOf(city) * 0.05 }}
                      className="absolute cursor-pointer"
                      style={{ 
                        top: `${city.position.top}%`, 
                        left: `${city.position.left}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                    >
                      <div className="relative">
                        <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse" />
                        {hoveredCity?.name === city.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-neutral-900 border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap z-10"
                          >
                            <div className="text-sm font-medium text-white">{city.name}</div>
                            <div className="text-xs text-neutral-400">销售额 ¥{city.sales}万 | 增长率 {city.growth}%</div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {showHotSpots && hotSpots.map((spot) => (
                    <motion.div
                      key={spot.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: spot.id * 0.2 }}
                      className="absolute pointer-events-none"
                      style={{ 
                        top: `${spot.position.top}%`, 
                        left: `${spot.position.left}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div 
                        className="rounded-full animate-ping"
                        style={{ 
                          width: `${spot.intensity}px`, 
                          height: `${spot.intensity}px`,
                          background: `radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0) 70%)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-neutral-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded" />
                    <span className="text-xs text-neutral-400">销售区域</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse" />
                    <span className="text-xs text-neutral-400">重点城市</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500/50 to-transparent rounded-full animate-ping" />
                    <span className="text-xs text-neutral-400">城市群热力</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">区域销售排行</h3>
                <div className="space-y-3">
                  {regions.sort((a, b) => b.stats.sales - a.stats.sales).map((region, index) => (
                    <motion.div
                      key={region.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        selectedRegion === region.id ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-neutral-800/30 hover:bg-neutral-800/50'
                      }`}
                      onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                          <span className="text-sm text-white">{region.name}</span>
                        </div>
                        <span className="text-sm text-white font-medium">¥{region.stats.sales}万</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">{region.cities.length} 个城市</span>
                        <span className={`${region.stats.growth >= 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          +{region.stats.growth}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">城市等级分布</h3>
                <div className="space-y-3">
                  {distributionData.map((item, index) => (
                    <div key={item.category}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-neutral-400">{item.category}</span>
                        <span className="text-sm text-white font-medium">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRegionData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-4"
                >
                  <h3 className="text-sm font-medium text-white mb-3">{selectedRegionData.name}</h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="p-2 bg-neutral-800/50 rounded-lg">
                      <div className="text-lg font-bold text-white">¥{selectedRegionData.stats.sales}万</div>
                      <div className="text-xs text-neutral-500">销售额</div>
                    </div>
                    <div className="p-2 bg-neutral-800/50 rounded-lg">
                      <div className="text-lg font-bold text-emerald-400">+{selectedRegionData.stats.growth}%</div>
                      <div className="text-xs text-neutral-500">增长率</div>
                    </div>
                    <div className="p-2 bg-neutral-800/50 rounded-lg">
                      <div className="text-lg font-bold text-white">{selectedRegionData.stats.customers.toLocaleString()}</div>
                      <div className="text-xs text-neutral-500">客户数</div>
                    </div>
                    <div className="p-2 bg-neutral-800/50 rounded-lg">
                      <div className="text-lg font-bold text-white">{selectedRegionData.stats.orders.toLocaleString()}</div>
                      <div className="text-xs text-neutral-500">订单数</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedRegionData.cities.map((city) => (
                      <span key={city} className="px-2 py-1 bg-neutral-800/50 rounded text-xs text-neutral-400">
                        {city}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
