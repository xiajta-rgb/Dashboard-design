import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Box,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Eye,
  EyeOff,
  Settings,
  Download,
  RefreshCw,
  Maximize2,
  Layers,
  Grid3x3,
  Circle,
  Square,
  Hexagon,
  Triangle,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  ScatterChart,
  Cpu,
  MemoryStick,
  HardDrive,
  Gauge
} from 'lucide-react'

const cubeData = [
  { id: 1, label: '销售额', value: 2850, color: '#6366f1', height: 65 },
  { id: 2, label: '订单量', value: 1245, color: '#8b5cf6', height: 45 },
  { id: 3, label: '客户数', value: 856, color: '#a78bfa', height: 35 },
  { id: 4, label: '转化率', value: 68, color: '#06b6d4', height: 55 },
  { id: 5, label: '复购率', value: 42, color: '#10b981', height: 28 },
  { id: 6, label: '好评率', value: 94, color: '#f59e0b', height: 78 },
]

const pieData = [
  { label: '华东地区', value: 35, color: '#6366f1' },
  { label: '华南地区', value: 28, color: '#8b5cf6' },
  { label: '华北地区', value: 20, color: '#06b6d4' },
  { label: '西部地区', value: 12, color: '#10b981' },
  { label: '其他地区', value: 5, color: '#f59e0b' },
]

const scatterPoints = Array.from({ length: 30 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 8,
  color: ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
}))

const areaLayers = [
  { label: '访问量', data: [120, 150, 180, 220, 280, 320, 350, 420, 480, 520], color: '#6366f1' },
  { label: '订单量', data: [80, 95, 120, 150, 180, 210, 240, 280, 320, 360], color: '#06b6d4' },
  { label: '销售额', data: [60, 75, 90, 110, 140, 165, 190, 220, 250, 280], color: '#10b981' },
]

const stats = [
  { label: '3D图表数', value: '12', change: '+2', trend: 'up', icon: Box },
  { label: '数据维度', value: '8', change: '+1', trend: 'up', icon: Layers },
  { label: '交互次数', value: '1.2k', change: '+15%', trend: 'up', icon: Activity },
  { label: '渲染帧率', value: '60fps', change: '0', trend: 'neutral', icon: Gauge },
]

export default function Visualization3DPage() {
  const [viewMode, setViewMode] = useState('bar')
  const [rotation, setRotation] = useState({ x: 15, y: 30 })
  const [zoom, setZoom] = useState(1)
  const [showLabels, setShowLabels] = useState(true)
  const [autoRotate, setAutoRotate] = useState(false)
  const [selectedChart, setSelectedChart] = useState(null)

  const handleMouseMove = (e) => {
    if (!autoRotate) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientY - rect.top) / rect.height * 60 - 30
      const y = (e.clientX - rect.left) / rect.width * 60 - 30
      setRotation({ x, y })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">3D可视化</h1>
              <p className="text-sm text-neutral-500 mt-1">沉浸式三维数据图表展示</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-neutral-800 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('bar')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'bar' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  柱状图
                </button>
                <button
                  onClick={() => setViewMode('pie')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'pie' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  饼图
                </button>
                <button
                  onClick={() => setViewMode('scatter')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'scatter' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  散点图
                </button>
                <button
                  onClick={() => setViewMode('area')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'area' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  面积图
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
                  <span className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-emerald-400' : 
                    stat.trend === 'down' ? 'text-red-400' : 'text-neutral-400'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {stat.trend === 'down' && <TrendingDown className="w-3 h-3" />}
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
                      onClick={() => setShowLabels(!showLabels)}
                      className={`p-2 rounded-lg transition-all ${
                        showLabels ? 'bg-violet-500/20 text-violet-400' : 'text-neutral-500 hover:bg-neutral-800'
                      }`}
                    >
                      {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`p-2 rounded-lg transition-all ${
                        autoRotate ? 'bg-emerald-500/20 text-emerald-400' : 'text-neutral-500 hover:bg-neutral-800'
                      }`}
                    >
                      <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                  <span className="text-sm text-neutral-400">拖拽旋转 | 滚轮缩放</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-neutral-400 w-16 text-center">{Math.round(zoom * 100)}%</span>
                  <button
                    onClick={() => setZoom(Math.min(2, zoom + 0.2))}
                    className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div 
                className="relative p-8 flex items-center justify-center"
                style={{ height: '500px', perspective: '1000px' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => !autoRotate && setRotation({ x: 15, y: 30 })}
              >
                <div 
                  className="relative w-full h-full"
                  style={{
                    transform: `rotateX(${autoRotate ? 15 : rotation.x}deg) rotateY(${autoRotate ? 30 : rotation.y}deg) scale(${zoom})`,
                    transformStyle: 'preserve-3d',
                    transition: autoRotate ? 'transform 0.1s linear' : 'transform 0.1s ease-out',
                  }}
                >
                  {viewMode === 'bar' && (
                    <div className="absolute inset-0 flex items-end justify-center gap-8" style={{ transform: 'translateZ(100px)' }}>
                      {cubeData.map((cube, index) => (
                        <motion.div
                          key={cube.id}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative group cursor-pointer"
                          onClick={() => setSelectedChart(selectedChart?.id === cube.id ? null : cube)}
                        >
                          <div 
                            className="relative"
                            style={{
                              width: '80px',
                              height: `${cube.height * 4}px`,
                              transformStyle: 'preserve-3d',
                              transform: 'rotateX(-15deg) rotateY(-30deg)',
                            }}
                          >
                            <div 
                              className="absolute inset-0 rounded-lg"
                              style={{ 
                                background: `linear-gradient(135deg, ${cube.color} 0%, ${cube.color}80 100%)`,
                                transform: 'translateZ(40px)',
                                boxShadow: `0 0 30px ${cube.color}40`,
                              }}
                            />
                            <div 
                              className="absolute inset-0 rounded-lg"
                              style={{ 
                                background: `linear-gradient(135deg, ${cube.color}80 0%, ${cube.color}40 100%)`,
                                transform: 'rotateY(90deg) translateZ(40px)',
                              }}
                            />
                            <div 
                              className="absolute inset-0 rounded-lg"
                              style={{ 
                                background: `linear-gradient(135deg, ${cube.color}40 0%, ${cube.color}20 100%)`,
                                transform: 'rotateX(90deg) translateZ(40px)',
                              }}
                            />
                          </div>
                          {showLabels && (
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="text-sm text-white font-medium">{cube.label}</div>
                              <div className="text-xs text-neutral-400">{cube.value}</div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {viewMode === 'pie' && (
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px) rotateX(20deg)' }}
                    >
                      {pieData.map((slice, index) => {
                        const angle = slice.value * 3.6
                        const prevAngle = pieData.slice(0, index).reduce((sum, s) => sum + s.value * 3.6, 0)
                        return (
                          <motion.div
                            key={slice.label}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="absolute top-1/2 left-1/2 origin-center"
                            style={{
                              width: '200px',
                              height: '200px',
                              transform: `rotate(${prevAngle}deg) skewY(-${90 - angle / 2}deg)`,
                            }}
                          >
                            <div 
                              className="absolute inset-0"
                              style={{
                                borderRadius: '100% 0 0 0',
                                background: slice.color,
                                transform: `skewY(${90 - angle / 2}deg) rotateY(-90deg) translateZ(30px)`,
                                boxShadow: `0 0 20px ${slice.color}60`,
                              }}
                            />
                            <div 
                              className="absolute inset-0"
                              style={{
                                borderRadius: '100% 0 0 0',
                                background: slice.color,
                                transform: `skewY(${90 - angle / 2}deg) translateZ(-10px)`,
                                opacity: 0.6,
                              }}
                            />
                          </motion.div>
                        )
                      })}
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-neutral-900 border-4 border-neutral-800"
                        style={{ transform: 'translateZ(40px)' }}
                      />
                    </div>
                  )}

                  {viewMode === 'scatter' && (
                    <div 
                      className="absolute inset-0"
                      style={{ transform: 'translateZ(100px) rotateX(30deg)' }}
                    >
                      {scatterPoints.map((point, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.02 }}
                          className="absolute rounded-full"
                          style={{
                            left: `${point.x}%`,
                            top: `${point.y}%`,
                            width: `${point.size}px`,
                            height: `${point.size}px`,
                            background: point.color,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: `0 0 10px ${point.color}60`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {viewMode === 'area' && (
                    <div 
                      className="absolute inset-0 flex flex-col justify-end"
                      style={{ transform: 'translateZ(50px) rotateX(15deg)' }}
                    >
                      {areaLayers.map((layer, layerIndex) => (
                        <div key={layer.label} className="relative h-24 mb-4">
                          {layer.data.map((value, index) => {
                            const height = (value / Math.max(...layer.data)) * 100
                            return (
                              <motion.div
                                key={index}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: layerIndex * 0.2 + index * 0.05 }}
                                className="absolute bottom-0 rounded-t-lg"
                                style={{
                                  left: `${index * 10}%`,
                                  width: '8%',
                                  background: `linear-gradient(180deg, ${layer.color} 0%, ${layer.color}60 100%)`,
                                  transform: `translateZ(${layerIndex * 20}px)`,
                                  boxShadow: `0 0 15px ${layer.color}40`,
                                }}
                              />
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="absolute inset-0 border border-white/10 rounded-xl" style={{ transform: 'translateZ(-100px)' }} />
                  <div className="absolute inset-0 border border-white/5 rounded-xl" style={{ transform: 'translateZ(-200px)' }} />
                </div>

                <div className="absolute bottom-4 left-4 bg-neutral-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-neutral-400">当前视图：</span>
                    <span className="text-white">
                      {viewMode === 'bar' && '3D柱状图'}
                      {viewMode === 'pie' && '3D饼图'}
                      {viewMode === 'scatter' && '3D散点图'}
                      {viewMode === 'area' && '3D面积图'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedChart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-violet-500/30 p-4"
                >
                  <h3 className="text-sm font-medium text-white mb-3">选中数据</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-10 h-10 rounded-lg"
                      style={{ background: selectedChart.color }}
                    />
                    <div>
                      <div className="text-white font-medium">{selectedChart.label}</div>
                      <div className="text-2xl font-bold text-white">{selectedChart.value}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">柱状图数据</h3>
                <div className="space-y-3">
                  {cubeData.map((cube) => (
                    <div 
                      key={cube.id}
                      className="p-3 bg-neutral-800/50 rounded-xl cursor-pointer hover:bg-neutral-800 transition-colors"
                      onClick={() => setSelectedChart(selectedChart?.id === cube.id ? null : cube)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white">{cube.label}</span>
                        <span className="text-sm text-white font-medium">{cube.value}</span>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(cube.value / Math.max(...cubeData.map(c => c.value))) * 100}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cube.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">控制面板</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">自动旋转</span>
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        autoRotate ? 'bg-violet-500' : 'bg-neutral-700'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        autoRotate ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">显示标签</span>
                    <button
                      onClick={() => setShowLabels(!showLabels)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        showLabels ? 'bg-violet-500' : 'bg-neutral-700'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        showLabels ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  <button className="w-full py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors text-sm">
                    重置视角
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
