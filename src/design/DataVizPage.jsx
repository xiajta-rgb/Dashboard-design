import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Badge, Card, Button, ProgressBar } from '../components/ui'
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Layers,
  Download,
  Copy,
  Check,
  Eye,
  Gauge,
  Zap,
  Clock,
  Database,
  Globe,
  MapPin,
  ScatterChart,
  Radar,
  GaugeCircle,
  LayoutGrid,
  Grid,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart as RechartsScatter,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadarComponent,
  Treemap as RechartsTreemap,
} from 'recharts'

const chartTypes = [
  {
    id: 'area',
    name: '面积图',
    icon: Activity,
    description: '展示数据趋势和变化，常用于时间序列数据',
    bestFor: ['趋势分析', '时间序列', '对比分析'],
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 'bar',
    name: '柱状图',
    icon: BarChart3,
    description: '比较不同类别之间的数值大小',
    bestFor: ['类别对比', '排名展示', '分布分析'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'pie',
    name: '饼图',
    icon: PieChart,
    description: '展示各部分占总体的比例关系',
    bestFor: ['比例展示', '构成分析', '占比比较'],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'line',
    name: '折线图',
    icon: TrendingUp,
    description: '展示数据随时间变化的趋势',
    bestFor: ['趋势追踪', '变化分析', '预测展示'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'scatter',
    name: '散点图',
    icon: ScatterChart,
    description: '展示两个变量之间的相关性',
    bestFor: ['相关性分析', '分布展示', '异常检测'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'radar',
    name: '雷达图',
    icon: Radar,
    description: '展示多维度数据的综合表现',
    bestFor: ['能力评估', '对比分析', '综合评分'],
    color: 'from-cyan-500 to-sky-500',
  },
  {
    id: 'treemap',
    name: '树图',
    icon: Grid,
    description: '展示层次结构和比例关系',
    bestFor: ['文件大小', '组织结构', '分类占比'],
    color: 'from-indigo-500 to-violet-500',
  },
]

const advancedChartTypes = [
  {
    id: 'dashboard',
    name: '仪表盘图表',
    description: '综合展示多个指标的专业图表布局',
    examples: ['KPI 卡片', '实时监控', '趋势面板'],
  },
  {
    id: 'geographic',
    name: '地理可视化',
    description: '基于地理位置的数据展示',
    examples: ['中国地图', '世界地图', '热力图'],
  },
  {
    id: 'network',
    name: '网络关系图',
    description: '展示实体之间的关系',
    examples: ['社交网络', '组织架构', '知识图谱'],
  },
  {
    id: 'timeline',
    name: '时间线',
    description: '按时间顺序展示事件',
    examples: ['项目进度', '历史事件', '甘特图'],
  },
  {
    id: 'hierarchy',
    name: '层次结构',
    description: '展示层级关系',
    examples: ['树形图', '旭日图', '嵌套饼图'],
  },
  {
    id: 'comparison',
    name: '对比分析',
    description: '多维度数据对比',
    examples: ['分组对比', '时间对比', '区域对比'],
  },
]

const chartPrinciples = [
  {
    name: '清晰度',
    description: '图表应易于理解和解读',
    icon: Eye,
    metrics: '3秒原则',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: '准确性',
    description: '数据展示应准确反映实际情况',
    icon: Target,
    metrics: '100% 准确',
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: '性能',
    description: '图表渲染应流畅无卡顿',
    icon: Gauge,
    metrics: '< 16ms',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: '交互性',
    description: '支持用户与数据的交互',
    icon: Zap,
    metrics: '实时响应',
    color: 'from-pink-500 to-rose-500',
  },
]

const chartData = {
  area: [
    { name: '1月', value: 4000, second: 2400 },
    { name: '2月', value: 3000, second: 1398 },
    { name: '3月', value: 2000, second: 9800 },
    { name: '4月', value: 2780, second: 3908 },
    { name: '5月', value: 1890, second: 4800 },
    { name: '6月', value: 2390, second: 3800 },
    { name: '7月', value: 3490, second: 4300 },
  ],
  bar: [
    { name: '产品A', value: 4000 },
    { name: '产品B', value: 3000 },
    { name: '产品C', value: 2000 },
    { name: '产品D', value: 2780 },
    { name: '产品E', value: 1890 },
    { name: '产品F', value: 2390 },
  ],
  pie: [
    { name: '直接访问', value: 4000 },
    { name: '自然搜索', value: 3000 },
    { name: '付费推广', value: 2000 },
    { name: '社交媒体', value: 2780 },
    { name: '推荐链接', value: 1890 },
  ],
  line: [
    { name: '周一', value: 4000 },
    { name: '周二', value: 3000 },
    { name: '周三', value: 4500 },
    { name: '周四', value: 2780 },
    { name: '周五', value: 5000 },
    { name: '周六', value: 3200 },
    { name: '周日', value: 4100 },
  ],
  scatter: [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 300 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ],
  radar: [
    { subject: '销售额', A: 120, B: 110, fullMark: 150 },
    { subject: '用户数', A: 98, B: 130, fullMark: 150 },
    { subject: '转化率', A: 86, B: 95, fullMark: 150 },
    { subject: '好评率', A: 99, B: 90, fullMark: 150 },
    { subject: '复购率', A: 85, B: 85, fullMark: 150 },
  ],
  treemap: [
    { name: '手机', size: 4000 },
    { name: '电脑', size: 3000 },
    { name: '平板', size: 2000 },
    { name: '配件', size: 1500 },
    { name: '服装', size: 2500 },
    { name: '食品', size: 1800 },
  ],
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e']

function ChartPreview({ type, data, isActive }) {
  if (!isActive) return null

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-neutral-800 border border-white/10 rounded-lg p-3 shadow-xl">
        <p className="text-xs text-neutral-400 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold text-white">
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsPie>
      </ResponsiveContainer>
    )
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  if (type === 'scatter') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsScatter>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis type="number" dataKey="x" stroke="rgba(255,255,255,0.4)" fontSize={12} name="X" />
          <YAxis type="number" dataKey="y" stroke="rgba(255,255,255,0.4)" fontSize={12} name="Y" />
          <Tooltip content={<CustomTooltip />} />
          <Scatter name="散点数据" data={data} fill="#f43f5e" />
        </RechartsScatter>
      </ResponsiveContainer>
    )
  }

  if (type === 'radar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadar>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <PolarRadiusAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
          <RechartsRadarComponent name="产品A" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
          <RechartsRadarComponent name="产品B" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
          <Tooltip content={<CustomTooltip />} />
        </RechartsRadar>
      </ResponsiveContainer>
    )
  }

  return null
}

function ChartTypeCard({ chart, index, isActive, onClick }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = chart.icon

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className={`
        bg-neutral-900/50 rounded-xl border p-6 cursor-pointer transition-all
        ${isActive ? 'border-violet-500 shadow-lg' : 'border-white/5 hover:border-white/20'}
      `}
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${chart.color} flex items-center justify-center mb-4`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{chart.name}</h3>
      <p className="text-sm text-neutral-400 mb-4">{chart.description}</p>
      <div className="flex flex-wrap gap-2">
        {chart.bestFor.map((item, i) => (
          <Badge key={i} variant="default" size="sm">
            {item}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

function AdvancedChartCard({ chart, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <h3 className="text-lg font-semibold text-white mb-2">{chart.name}</h3>
      <p className="text-sm text-neutral-400 mb-4">{chart.description}</p>
      <div className="space-y-2">
        <p className="text-xs text-neutral-500">示例：</p>
        {chart.examples.map((example, i) => (
          <Badge key={i} variant="outline" size="sm">
            {example}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

function PrincipleCard({ principle, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = principle.icon

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{principle.name}</h3>
          <p className="text-sm text-neutral-400 mb-3">{principle.description}</p>
          <Badge variant="default" size="sm">
            {principle.metrics}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}

function ChartShowcase({ type, data }) {
  return (
    <Card className="p-6">
      <ChartPreview type={type} data={data} isActive={true} />
    </Card>
  )
}

function DataVisualizationPage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeChart, setActiveChart] = useState('area')

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-neutral-400">Data Visualization System</span>
            </div>

            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              数据<span className="text-gradient">可视化</span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              专业的图表组件库，支持面积图、柱状图、饼图、折线图、雷达图等 30+ 图表类型。
              基于 Recharts 构建，提供流畅的交互体验和丰富的自定义选项。
            </p>
          </motion.header>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              设计<span className="text-gradient">原则</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chartPrinciples.map((principle, index) => (
                <PrincipleCard key={principle.name} principle={principle} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              图表<span className="text-gradient">类型</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {chartTypes.map((chart, index) => (
                <ChartTypeCard
                  key={chart.id}
                  chart={chart}
                  index={index}
                  isActive={activeChart === chart.id}
                  onClick={() => setActiveChart(chart.id)}
                />
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {chartTypes.find(c => c.id === activeChart)?.name} 预览
              </h3>
              <ChartShowcase
                type={activeChart}
                data={chartData[activeChart]}
              />
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              高级<span className="text-gradient">图表</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedChartTypes.map((chart, index) => (
                <AdvancedChartCard key={chart.id} chart={chart} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              图表<span className="text-gradient">色彩</span>
            </h2>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">序列色彩</h3>
              <p className="text-sm text-neutral-400 mb-4">
                用于展示单一变量的序列变化，从浅到深表示数据从小到大
              </p>
              <div className="flex gap-2 mb-6">
                {['#f5f3ff', '#ddd6fe', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6'].map((color, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">分类色彩</h3>
              <p className="text-sm text-neutral-400 mb-4">
                用于区分不同类别，每个颜色应有明显区分度
              </p>
              <div className="flex gap-2 mb-6">
                {COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <h3 className="text-lg font-semibold text-white mb-4">语义色彩</h3>
              <p className="text-sm text-neutral-400 mb-4">
                用于表示成功、警告、错误等语义状态
              </p>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-full h-12 rounded-lg bg-emerald-500 mb-2" />
                  <p className="text-xs text-white">成功</p>
                  <p className="text-xs text-neutral-500">#22c55e</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded-lg bg-amber-500 mb-2" />
                  <p className="text-xs text-white">警告</p>
                  <p className="text-xs text-neutral-500">#f59e0b</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded-lg bg-red-500 mb-2" />
                  <p className="text-xs text-white">错误</p>
                  <p className="text-xs text-neutral-500">#ef4444</p>
                </div>
                <div className="text-center">
                  <div className="w-full h-12 rounded-lg bg-blue-500 mb-2" />
                  <p className="text-xs text-white">信息</p>
                  <p className="text-xs text-neutral-500">#3b82f6</p>
                </div>
              </div>
            </Card>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              交互<span className="text-gradient">设计</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tooltip</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  悬停时显示详细数据信息
                </p>
                <div className="bg-neutral-800 rounded-lg p-4 border border-white/10">
                  <p className="text-xs text-neutral-500 mb-1">悬停查看数据</p>
                  <p className="text-sm text-white">hover me</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Legend</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  点击图例可切换系列显示
                </p>
                <div className="flex gap-4">
                  {COLORS.slice(0, 3).map((color, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-xs text-neutral-400">系列{i + 1}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Zoom</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  支持缩放和平移查看细节
                </p>
                <div className="bg-neutral-800 rounded-lg p-4 border border-white/10 flex items-center justify-center">
                  <span className="text-xs text-neutral-500">拖拽缩放</span>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Brush</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  区域选择筛选数据范围
                </p>
                <div className="bg-neutral-800 rounded-lg p-4 border border-white/10 flex items-center justify-center">
                  <span className="text-xs text-neutral-500">区域选择器</span>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">DataZoom</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  时间轴缩放查看不同时段
                </p>
                <div className="bg-neutral-800 rounded-lg p-4 border border-white/10 flex items-center justify-center">
                  <span className="text-xs text-neutral-500">时间缩放</span>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Export</h3>
                <p className="text-sm text-neutral-400 mb-4">
                  导出图表为图片或数据
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    PNG
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    SVG
                  </Button>
                </div>
              </Card>
            </div>
          </motion.section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              响应式<span className="text-gradient">设计</span>
            </h2>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">断点适配</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-sm font-medium text-white">桌面端 (≥1024px)</p>
                      <p className="text-xs text-neutral-500">完整图表，横向布局</p>
                    </div>
                  </div>
                  <Badge variant="default" size="sm">大尺寸</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Tablet className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-sm font-medium text-white">平板端 (768px-1023px)</p>
                      <p className="text-xs text-neutral-500">中等尺寸，简化图例</p>
                    </div>
                  </div>
                  <Badge variant="default" size="sm">中等尺寸</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-sm font-medium text-white">移动端 (小于768px)</p>
                      <p className="text-xs text-neutral-500">小尺寸，垂直布局</p>
                    </div>
                  </div>
                  <Badge variant="default" size="sm">小尺寸</Badge>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DataVisualizationPage
