import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap,
  Gauge,
  Clock,
  Database,
  Cpu,
  HardDrive,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  LineChart,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Settings,
  Download,
  Play,
  Pause,
  Database as DatabaseIcon,
  Server,
  Cloud,
  Wifi,
  Signal,
  Battery,
  Thermometer,
  Clock3,
  Timer,
  Gauge as GaugeIcon,
  Rocket,
  Shield,
  Eye,
  Code,
  Package,
  Layers,
  Maximize2,
  Minimize2,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Globe,
  Smartphone
} from 'lucide-react'

const performanceMetrics = [
  { 
    id: 'fcp',
    name: '首次内容绘制 (FCP)',
    value: 0.8,
    unit: 's',
    target: 1.8,
    status: 'good',
    description: '从页面开始加载到第一个内容元素渲染的时间',
    icon: Eye,
  },
  { 
    id: 'lcp',
    name: '最大内容绘制 (LCP)',
    value: 2.1,
    unit: 's',
    target: 2.5,
    status: 'good',
    description: '视口中最大内容元素的渲染时间',
    icon: Maximize2,
  },
  { 
    id: 'cls',
    name: '累积布局偏移 (CLS)',
    value: 0.05,
    unit: '',
    target: 0.1,
    status: 'good',
    description: '页面加载期间的意外布局偏移',
    icon: Layers,
  },
  { 
    id: 'fid',
    name: '首次输入延迟 (FID)',
    value: 45,
    unit: 'ms',
    target: 100,
    status: 'good',
    description: '首次交互到浏览器响应的延迟',
    icon: Timer,
  },
  { 
    id: 'ttfb',
    name: '首字节时间 (TTFB)',
    value: 180,
    unit: 'ms',
    target: 800,
    status: 'good',
    description: '从请求到收到第一个字节的时间',
    icon: Clock3,
  },
  { 
    id: 'inp',
    name: '交互到下一帧 (INP)',
    value: 85,
    unit: 'ms',
    target: 200,
    status: 'good',
    description: '页面整体响应性的度量',
    icon: Zap,
  },
]

const bundleStats = [
  { name: '主包', size: 1227, gzip: 323, color: 'from-violet-500 to-purple-500' },
  { name: '组件库', size: 456, gzip: 128, color: 'from-blue-500 to-cyan-500' },
  { name: '图表库', size: 234, gzip: 78, color: 'from-emerald-500 to-teal-500' },
  { name: '动画库', size: 189, gzip: 62, color: 'from-amber-500 to-orange-500' },
]

const optimizationTechniques = [
  { 
    id: 'code-splitting',
    title: '代码分割',
    description: '使用动态 import() 实现按需加载',
    status: 'applied',
    impact: 'high',
    icon: Layers,
  },
  { 
    id: 'lazy-loading',
    title: '懒加载',
    description: '图片和组件延迟加载，减少初始加载时间',
    status: 'applied',
    impact: 'high',
    icon: Clock3,
  },
  { 
    id: 'tree-shaking',
    title: '摇树优化',
    description: '移除未使用的代码，减小包体积',
    status: 'applied',
    impact: 'medium',
    icon: Code,
  },
  { 
    id: 'compression',
    title: '压缩优化',
    description: 'Gzip/Brotli 压缩，减少传输体积',
    status: 'applied',
    impact: 'high',
    icon: Database,
  },
  { 
    id: 'caching',
    title: '缓存策略',
    description: '合理的缓存头配置，提升重复访问速度',
    status: 'applied',
    impact: 'high',
    icon: HardDrive,
  },
  { 
    id: 'image-optimization',
    title: '图片优化',
    description: 'WebP/AVIF 格式，响应式图片，懒加载',
    status: 'applied',
    impact: 'medium',
    icon: Package,
  },
]

const renderMetrics = [
  { time: '0ms', label: '导航开始' },
  { time: '120ms', label: 'DOM 完成' },
  { time: '180ms', label: 'TTFB' },
  { time: '450ms', label: 'FCP' },
  { time: '1200ms', label: 'LCP' },
  { time: '2100ms', label: '页面可交互' },
]

const stats = [
  { label: '性能评分', value: '98', icon: GaugeIcon, color: 'text-emerald-400' },
  { label: '加载时间', value: '1.2s', icon: Clock, color: 'text-blue-400' },
  { label: '包体积', value: '2.1MB', icon: Package, color: 'text-violet-400' },
  { label: '请求数', value: '24', icon: Signal, color: 'text-amber-400' },
]

export default function PerformanceOptimizationPage() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [performanceData, setPerformanceData] = useState([
    { time: 0, fcp: 0.8, lcp: 2.1, cls: 0.05 },
    { time: 1, fcp: 0.75, lcp: 2.05, cls: 0.04 },
    { time: 2, fcp: 0.82, lcp: 2.15, cls: 0.06 },
    { time: 3, fcp: 0.78, lcp: 2.08, cls: 0.05 },
    { time: 4, fcp: 0.85, lcp: 2.2, cls: 0.07 },
  ])

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setPerformanceData(prev => [
          ...prev.slice(1),
          {
            time: prev[prev.length - 1].time + 1,
            fcp: 0.7 + Math.random() * 0.2,
            lcp: 2.0 + Math.random() * 0.3,
            cls: 0.04 + Math.random() * 0.03,
          }
        ])
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-emerald-400 bg-emerald-500/20'
      case 'needs-improvement': return 'text-amber-400 bg-amber-500/20'
      case 'poor': return 'text-red-400 bg-red-500/20'
      default: return 'text-neutral-400 bg-neutral-500/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return <CheckCircle2 className="w-4 h-4" />
      case 'needs-improvement': return <AlertCircle className="w-4 h-4" />
      case 'poor': return <XCircle className="w-4 h-4" />
      default: return null
    }
  }

  const totalSize = bundleStats.reduce((sum, b) => sum + b.size, 0)
  const totalGzip = bundleStats.reduce((sum, b) => sum + b.gzip, 0)

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Rocket className="w-8 h-8 text-violet-400" />
                性能优化
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                监控和分析应用性能指标，持续优化用户体验
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isMonitoring 
                    ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                    : 'bg-neutral-800 border border-white/10 text-neutral-400'
                }`}
              >
                {isMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isMonitoring ? '监控中' : '开始监控'}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                <Download className="w-4 h-4" />
                导出报告
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
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-white">Core Web Vitals</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      全部达标
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {performanceMetrics.map((metric, index) => {
                    const MetricIcon = metric.icon
                    return (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 bg-neutral-800/50 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <MetricIcon className="w-5 h-5 text-violet-400" />
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                            {getStatusIcon(metric.status)}
                            {metric.status === 'good' ? '良好' : metric.status === 'needs-improvement' ? '需改进' : '较差'}
                          </span>
                        </div>
                        <div className="mb-1">
                          <span className="text-2xl font-bold text-white">{metric.value}</span>
                          <span className="text-sm text-neutral-500 ml-1">{metric.unit}</span>
                        </div>
                        <div className="text-xs text-neutral-500 mb-2">{metric.name}</div>
                        <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              metric.status === 'good' ? 'bg-emerald-500' : 
                              metric.status === 'needs-improvement' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((metric.target / metric.value) * 50, 100)}%` }}
                          />
                        </div>
                        <div className="mt-1 text-xs text-neutral-600">目标: {metric.target}{metric.unit}</div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">性能趋势</h2>
                <div className="h-48 flex items-end gap-2">
                  {performanceData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col-reverse gap-0.5 h-36">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(1 - data.fcp / 3) * 100}%` }}
                          transition={{ duration: 0.5 }}
                          className="w-full bg-gradient-to-t from-violet-500 to-purple-500 rounded-t"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(1 - data.lcp / 3) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(1 - data.cls / 0.1) * 100}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="w-full bg-gradient-to-t from-amber-500 to-orange-500 rounded-t"
                        />
                      </div>
                      <span className="text-xs text-neutral-500">{data.time}s</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                    <span className="text-neutral-400">FCP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <span className="text-neutral-400">LCP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                    <span className="text-neutral-400">CLS</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">渲染时间线</h2>
                <div className="relative h-8 bg-neutral-800/50 rounded-lg overflow-hidden">
                  {renderMetrics.map((metric, index) => {
                    const percentage = (index / (renderMetrics.length - 1)) * 100
                    return (
                      <div
                        key={metric.label}
                        className="absolute top-0 bottom-0 flex flex-col items-center"
                        style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
                      >
                        <div className="absolute top-0 bottom-0 w-0.5 bg-violet-500/30" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-500 border-2 border-neutral-900 z-10" />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 whitespace-nowrap">
                          {metric.time}
                        </div>
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap">
                          {metric.label}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-sm font-medium text-white mb-4">Bundle 分析</h2>
                <div className="space-y-3 mb-4">
                  {bundleStats.map((bundle, index) => (
                    <div key={bundle.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${bundle.color}`} />
                          <span className="text-sm text-white">{bundle.name}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-white font-medium">{bundle.size}KB</span>
                          <span className="text-neutral-500 ml-1">({bundle.gzip}KB gzip)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(bundle.size / totalSize) * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={`h-full bg-gradient-to-r ${bundle.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">总计</span>
                    <div className="text-sm">
                      <span className="text-white font-bold">{totalSize}KB</span>
                      <span className="text-neutral-500 ml-1">({totalGzip}KB gzip)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-sm font-medium text-white mb-4">优化技术</h2>
                <div className="space-y-2">
                  {optimizationTechniques.map((tech, index) => {
                    const TechIcon = tech.icon
                    return (
                      <motion.div
                        key={tech.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-3 rounded-xl border transition-all ${
                          tech.status === 'applied' 
                            ? 'bg-emerald-500/10 border-emerald-500/30' 
                            : tech.status === 'pending'
                            ? 'bg-amber-500/10 border-amber-500/30'
                            : 'bg-neutral-800/50 border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${
                              tech.status === 'applied' ? 'bg-emerald-500/20' : 'bg-neutral-700'
                            }`}>
                              <TechIcon className={`w-4 h-4 ${
                                tech.status === 'applied' ? 'text-emerald-400' : 'text-neutral-500'
                              }`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{tech.title}</div>
                              <div className="text-xs text-neutral-500 mt-0.5">{tech.description}</div>
                            </div>
                          </div>
                          {tech.status === 'applied' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-sm font-medium text-white mb-4">性能建议</h2>
                <div className="space-y-3">
                  {[
                    { 
                      title: '进一步优化图片',
                      desc: '考虑使用 WebP 格式，预计可减少 30% 图片体积',
                      priority: 'medium',
                      icon: Package,
                    },
                    { 
                      title: '预连接关键资源',
                      desc: '添加 preconnect 到字体和 CDN 服务商',
                      priority: 'low',
                      icon: Globe,
                    },
                    { 
                      title: '减少第三方脚本',
                      desc: '当前有 3 个第三方脚本影响加载性能',
                      priority: 'high',
                      icon: Code,
                    },
                  ].map((suggestion, index) => {
                    const SuggestionIcon = suggestion.icon
                    return (
                      <div key={index} className="p-3 bg-neutral-800/50 rounded-xl">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            suggestion.priority === 'high' ? 'bg-red-500/20' :
                            suggestion.priority === 'medium' ? 'bg-amber-500/20' : 'bg-blue-500/20'
                          }`}>
                            <SuggestionIcon className={`w-4 h-4 ${
                              suggestion.priority === 'high' ? 'text-red-400' :
                              suggestion.priority === 'medium' ? 'text-amber-400' : 'text-blue-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{suggestion.title}</div>
                            <div className="text-xs text-neutral-500 mt-0.5">{suggestion.desc}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
