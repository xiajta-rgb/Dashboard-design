import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { Badge, Card, Button, TabList, Tab } from '../components/ui'
import { 
  LayoutGrid,
  Columns,
  Rows,
  Square,
  Layers,
  ArrowRight,
  Check,
  Maximize2,
  List,
  Navigation,
  Anchor,
  GitBranch,
  ChevronRight,
  Code,
  Copy,
  Smartphone,
  Tablet,
  Monitor,
  Boxes
} from 'lucide-react'

const layoutPatterns = [
  {
    id: 'bento',
    name: 'Bento 网格',
    description: '现代卡片式布局，灵活的网格系统，源自 Google Material Design',
    icon: LayoutGrid,
    preview: { type: 'bento' },
    bestFor: ['仪表盘', '作品集', '首页', '内容聚合'],
    features: ['响应式', '灵活性高', '视觉冲击', '模块化'],
    category: 'grid',
    code: '.container { grid-template-columns: repeat(3, 1fr); gap: 1rem; }',
  },
  {
    id: 'sidebar',
    name: '侧边栏布局',
    description: '经典的后台管理系统布局，主内容区与导航分离',
    icon: Columns,
    preview: { type: 'sidebar' },
    bestFor: ['管理后台', 'SaaS应用', '电商后台', '文档系统'],
    features: ['导航清晰', '内容区大', '可折叠', '多级菜单'],
    category: 'navigation',
    code: '.layout { display: flex; } .sidebar { width: 256px; } .content { flex: 1; }',
  },
  {
    id: 'magazine',
    name: '杂志布局',
    description: '编辑感强的内容展示布局，适合长阅读内容',
    icon: Square,
    preview: { type: 'magazine' },
    bestFor: ['博客', '新闻', '内容平台', '文档中心'],
    features: ['视觉层次', '留白充足', '阅读感强', '沉浸式'],
    category: 'content',
    code: '.article { grid-template-columns: 1fr 2fr; gap: 2rem; }',
  },
  {
    id: 'cards',
    name: '卡片网格',
    description: '统一的卡片排列布局，适合展示列表数据',
    icon: Layers,
    preview: { type: 'cards' },
    bestFor: ['产品列表', '服务展示', '案例集', '团队成员'],
    features: ['一致性强', '扩展性好', '简洁清晰', '可点击'],
    category: 'grid',
    code: '.cards { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }',
  },
  {
    id: 'split',
    name: '分屏布局',
    description: '左右或上下分屏展示，适合对比或双栏内容',
    icon: Rows,
    preview: { type: 'split' },
    bestFor: ['对比展示', '详情页', '多任务', '登录页'],
    features: ['对比清晰', '空间利用', '操作便捷', '焦点集中'],
    category: 'content',
    code: '.split { grid-template-columns: 1fr 1fr; } @media(max-width: 768px) { grid-template-columns: 1fr; }',
  },
  {
    id: 'fullheight',
    name: '全高布局',
    description: '占据整个视口高度的沉浸式布局',
    icon: Maximize2,
    preview: { type: 'fullheight' },
    bestFor: ['落地页', 'Hero区域', '登录页', '全屏应用'],
    features: ['视觉冲击力', '沉浸式体验', '聚焦核心', '强品牌感'],
    category: 'hero',
    code: '.hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }',
  },
  {
    id: 'waterfall',
    name: '瀑布流',
    description: '不规则高度的卡片流式布局',
    icon: GitBranch,
    preview: { type: 'waterfall' },
    bestFor: ['图片画廊', 'Pinterest风格', '内容流', '社交feed'],
    features: ['错落有致', '高效利用空间', '无限滚动', '视觉趣味'],
    category: 'grid',
    code: '.waterfall { column-count: 3; column-gap: 1rem; } .card { break-inside: avoid; }',
  },
  {
    id: 'sticky',
    name: '粘性布局',
    description: '滚动时元素保持固定位置',
    icon: Anchor,
    preview: { type: 'sticky' },
    bestFor: ['导航栏', '侧边目录', '购物车', '进度指示器'],
    features: ['便捷访问', '持续可见', '上下文保持', '减少滚动'],
    category: 'navigation',
    code: '.sticky { position: sticky; top: 1rem; z-index: 100; }',
  },
]

const spacingScales = [
  { name: 'xs', value: 4, css: '0.25rem', color: 'bg-violet-500' },
  { name: 'sm', value: 8, css: '0.5rem', color: 'bg-blue-500' },
  { name: 'md', value: 12, css: '0.75rem', color: 'bg-emerald-500' },
  { name: 'lg', value: 16, css: '1rem', color: 'bg-amber-500' },
  { name: 'xl', value: 24, css: '1.5rem', color: 'bg-rose-500' },
  { name: '2xl', value: 32, css: '2rem', color: 'bg-cyan-500' },
  { name: '3xl', value: 48, css: '3rem', color: 'bg-purple-500' },
  { name: '4xl', value: 64, css: '4rem', color: 'bg-orange-500' },
  { name: '5xl', value: 80, css: '5rem', color: 'bg-pink-500' },
  { name: '6xl', value: 96, css: '6rem', color: 'bg-indigo-500' },
]

const gridSystems = [
  { columns: 12, name: '12列网格', description: '最常用的网格系统', useCase: '仪表盘、电商、企业网站' },
  { columns: 8, name: '8列网格', description: '中等密度布局', useCase: '博客、内容平台' },
  { columns: 6, name: '6列网格', description: '低密度布局', useCase: '作品集、展示页' },
  { columns: 4, name: '4列网格', description: '极简布局', useCase: '移动端、简洁页面' },
]

const responsiveBreakpoints = [
  { name: 'xs', min: 0, max: 639, label: '< 640px', device: '超小屏手机', icon: Smartphone },
  { name: 'sm', min: 640, max: 767, label: '640px+', device: '大屏手机', icon: Smartphone },
  { name: 'md', min: 768, max: 1023, label: '768px+', device: '平板', icon: Tablet },
  { name: 'lg', min: 1024, max: 1279, label: '1024px+', device: '小屏笔记本', icon: Monitor },
  { name: 'xl', min: 1280, max: 1535, label: '1280px+', device: '标准屏幕', icon: Monitor },
  { name: '2xl', min: 1536, max: null, label: '1536px+', device: '超大屏', icon: Monitor },
]

function LayoutPreview({ pattern }) {
  const prefersReducedMotion = useReducedMotion()

  if (pattern.id === 'bento') {
    return (
      <div className="grid grid-cols-3 gap-2 h-40">
        <motion.div 
          className="col-span-2 row-span-2 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        />
        <motion.div 
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
        <motion.div 
          className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        <motion.div 
          className="col-span-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />
      </div>
    )
  }

  if (pattern.id === 'sidebar') {
    return (
      <div className="flex h-40 gap-2">
        <motion.div 
          className="w-1/4 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        />
        <motion.div 
          className="flex-1 grid grid-cols-2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30" />
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30" />
          <div className="col-span-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30" />
        </motion.div>
      </div>
    )
  }

  if (pattern.id === 'magazine') {
    return (
      <div className="grid grid-cols-3 gap-2 h-40">
        <motion.div 
          className="col-span-2 row-span-2 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        />
        <motion.div 
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        />
        <motion.div 
          className="col-span-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>
    )
  }

  if (pattern.id === 'cards') {
    return (
      <div className="grid grid-cols-3 gap-2 h-40">
        {[...Array(6)].map((_, i) => (
          <motion.div 
            key={i}
            className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
    )
  }

  if (pattern.id === 'split') {
    return (
      <div className="flex h-40 gap-2">
        <motion.div 
          className="flex-1 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        />
        <motion.div 
          className="flex-1 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        />
      </div>
    )
  }

  if (pattern.id === 'fullheight') {
    return (
      <div className="h-40 rounded-lg border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-violet-500/30 flex items-center justify-center">
            <Maximize2 className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-xs text-neutral-400">全高内容区</span>
        </motion.div>
      </div>
    )
  }

  if (pattern.id === 'waterfall') {
    return (
      <div className="h-40 flex gap-2">
        <div className="flex-1 flex flex-col gap-2">
          <motion.div className="h-1/2 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-lg border border-violet-500/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          <motion.div className="h-2/3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <motion.div className="h-2/3 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }} />
          <motion.div className="h-1/2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <motion.div className="h-1/3 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-lg border border-rose-500/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} />
          <motion.div className="h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
        </div>
      </div>
    )
  }

  if (pattern.id === 'sticky') {
    return (
      <div className="relative h-40">
        <motion.div 
          className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-lg border border-violet-500/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        />
        <motion.div 
          className="absolute top-14 left-0 right-0 bottom-0 grid grid-cols-2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30" />
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30" />
        </motion.div>
      </div>
    )
  }

  return null
}

function LayoutPatternCard({ pattern, isSelected, onClick }) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = pattern.icon

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onClick={onClick}
      className={`
        cursor-pointer rounded-2xl border-2 transition-all duration-200 overflow-hidden
        ${isSelected ? 'border-violet-500 shadow-lg shadow-violet-500/20' : 'border-transparent hover:border-white/20'}
      `}
    >
      <div className="p-4 bg-neutral-900">
        <LayoutPreview pattern={pattern} />
      </div>
      <div className="p-4 bg-neutral-900/80">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-white">{pattern.name}</h4>
          </div>
          {isSelected && (
            <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <p className="text-sm text-neutral-400 mb-3">{pattern.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {pattern.bestFor.map((use, i) => (
            <Badge key={i} variant="default" size="sm">{use}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {pattern.features.map((feature, i) => (
            <Badge key={i} variant="primary" size="sm">{feature}</Badge>
          ))}
        </div>
        <div className="relative">
          <code className="block text-xs text-neutral-500 bg-neutral-800/50 px-3 py-2 rounded-lg overflow-x-auto">
            {pattern.code}
          </code>
        </div>
      </div>
    </motion.div>
  )
}

function GridVisualizer({ columns }) {
  return (
    <div className="bg-neutral-800/30 rounded-lg p-4">
      <div className="text-center mb-3">
        <span className="text-sm font-medium text-white">{columns}列网格</span>
      </div>
      <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            className="h-12 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded border border-violet-500/30 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-xs text-neutral-500">{i + 1}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BreakpointCard({ breakpoint }) {
  const Icon = breakpoint.icon
  
  return (
    <Card className="p-6 text-center hover:border-violet-500/30 transition-colors">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-violet-400" />
        <span className="text-lg font-bold text-violet-400">{breakpoint.name}</span>
      </div>
      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-4 border border-violet-500/30">
        <span className="text-sm font-semibold text-white">{breakpoint.label}</span>
      </div>
      <p className="text-sm text-neutral-400">{breakpoint.device}</p>
    </Card>
  )
}

export default function LayoutPage() {
  const prefersReducedMotion = useReducedMotion()
  const [selectedLayout, setSelectedLayout] = useState('bento')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', 'grid', 'navigation', 'content', 'hero']
  const categoryNames = {
    all: '全部',
    grid: '网格布局',
    navigation: '导航布局',
    content: '内容布局',
    hero: 'Hero布局',
  }

  const filteredPatterns = activeCategory === 'all' 
    ? layoutPatterns 
    : layoutPatterns.filter(p => p.category === activeCategory)

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
              <LayoutGrid className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-neutral-400">Layout Patterns Library</span>
            </div>

            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              布局<span className="text-gradient">模式</span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              精选的现代布局模式库，包含间距系统、网格系统和响应式策略。
              从基础到高级，打造专业级界面布局。
            </p>
          </motion.header>

          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  布局<span className="text-gradient">模式</span>
                </h2>
                <p className="text-neutral-400">
                  选择适合你项目的布局模式
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <TabList className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Tab 
                      key={cat} 
                      active={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {categoryNames[cat]}
                    </Tab>
                  ))}
                </TabList>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatterns.map((pattern) => (
                <LayoutPatternCard
                  key={pattern.id}
                  pattern={pattern}
                  isSelected={selectedLayout === pattern.id}
                  onClick={() => setSelectedLayout(pattern.id)}
                />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              网格<span className="text-gradient">系统</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              基于列的布局系统，灵活适配各种内容需求
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gridSystems.map((grid) => (
                <Card key={grid.columns} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-violet-400">{grid.columns}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{grid.name}</h4>
                      <p className="text-xs text-neutral-500">{grid.description}</p>
                    </div>
                  </div>
                  <GridVisualizer columns={grid.columns} />
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-neutral-400">适用场景: {grid.useCase}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              间距<span className="text-gradient">系统</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              基于 4px 倍数的间距系统，确保一致性和灵活性
            </p>

            <Card className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-white mb-6">间距尺度</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {spacingScales.map((scale) => (
                      <motion.div
                        key={scale.name}
                        className="text-center p-4 bg-neutral-800/50 rounded-lg border border-white/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: spacingScales.indexOf(scale) * 0.05 }}
                      >
                        <div className="mb-3">
                          <div 
                            className={`mx-auto rounded ${scale.color}`}
                            style={{ width: `${scale.value * 1.5}px`, height: '8px' }}
                          />
                        </div>
                        <p className="text-sm font-medium text-white">{scale.name}</p>
                        <p className="text-xs text-neutral-500">{scale.value}px</p>
                        <p className="text-xs text-violet-400">{scale.css}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">使用指南</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-violet-500" />
                        <span className="text-xs text-neutral-500">紧凑间距</span>
                      </div>
                      <p className="text-sm text-white font-medium">4px - 12px</p>
                      <p className="text-xs text-neutral-400 mt-1">图标与文字、元素内部间距、紧凑布局</p>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-xs text-neutral-500">标准间距</span>
                      </div>
                      <p className="text-sm text-white font-medium">16px - 24px</p>
                      <p className="text-xs text-neutral-400 mt-1">组件内边距、元素间距、卡片间距</p>
                    </div>
                    <div className="p-4 bg-neutral-800/50 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-xs text-neutral-500">宽松间距</span>
                      </div>
                      <p className="text-sm text-white font-medium">32px - 64px</p>
                      <p className="text-xs text-neutral-400 mt-1">区块间距、页面留白、Hero区域</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              响应式<span className="text-gradient">断点</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              移动优先的响应式设计断点系统
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {responsiveBreakpoints.map((bp, i) => (
                <motion.div
                  key={bp.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <BreakpointCard breakpoint={bp} />
                </motion.div>
              ))}
            </div>

            <Card className="mt-8 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-5 h-5 text-violet-400" />
                <h3 className="text-lg font-semibold text-white">CSS 断点示例</h3>
              </div>
              <pre className="bg-neutral-800/50 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300">
{`:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }`}
              </pre>
            </Card>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              布局<span className="text-gradient">组件</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              基础布局组件，构建灵活的页面结构
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Container', desc: '居中容器，限制最大宽度', icon: Boxes, code: '<Container maxWidth="xl" />' },
                { name: 'Stack', desc: '垂直/水平堆叠布局', icon: Layers, code: '<Stack spacing="lg" direction="row" />' },
                { name: 'Grid', desc: '响应式网格布局', icon: LayoutGrid, code: '<Grid columns={12} gap="md" />' },
                { name: 'Flex', desc: '灵活的弹性布局', icon: Columns, code: '<Flex justify="center" items="center" />' },
              ].map((comp, i) => {
                const Icon = comp.icon
                return (
                  <motion.div
                    key={comp.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6 hover:border-violet-500/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-violet-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{comp.name}</h4>
                      <p className="text-sm text-neutral-400 mb-4">{comp.desc}</p>
                      <code className="text-xs text-neutral-500 bg-neutral-800/50 px-3 py-2 rounded-lg block">
                        {comp.code}
                      </code>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-2">
              设计<span className="text-gradient">建议</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              布局设计的最佳实践和原则
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: '移动优先', desc: '先设计移动端布局，再逐步扩展到平板和桌面端', icon: Smartphone, color: 'violet' },
                { title: '内容层次', desc: '通过视觉层次引导用户注意力，重要内容更突出', icon: Boxes, color: 'blue' },
                { title: '呼吸空间', desc: '适当留白让界面更舒适，避免内容过于拥挤', icon: Square, color: 'emerald' },
                { title: '对齐一致', desc: '保持元素对齐一致性，使用网格确保对齐关系', icon: Columns, color: 'amber' },
              ].map((tip, i) => {
                const Icon = tip.icon
                const colorMap = {
                  violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
                  blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                  emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                  amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                }
                return (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className={`w-12 h-12 rounded-xl ${colorMap[tip.color]} flex items-center justify-center mb-4 border`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{tip.title}</h3>
                      <p className="text-sm text-neutral-400">{tip.desc}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}