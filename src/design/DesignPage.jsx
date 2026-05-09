import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { 
  Palette, 
  Type, 
  LayoutGrid, 
  Layers, 
  MousePointer, 
  Zap,
  ArrowRight,
  ExternalLink,
  Code,
  Figma,
  BookOpen,
  PenTool,
  Grid3x3,
  Paintbrush
} from 'lucide-react'
import { Button, Card, Badge } from '../components/ui'

const designResources = [
  {
    id: 'typography',
    title: '字体库',
    description: '精选 Google Fonts，包含 30+ 专业字体家族，覆盖无衬线、衬线、展示字体',
    icon: Type,
    color: 'from-violet-500 to-purple-500',
    path: '/typography',
    stats: '30+ 字体',
    features: ['英文精选', '中文适配', '字重预览', '代码复制'],
  },
  {
    id: 'color',
    title: '色彩科学',
    description: '基于色彩理论的配色系统，包含 6 种经典配色方案和完整色阶',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    path: '/color',
    stats: '6 配色方案',
    features: ['色轮工具', '配色方案', '对比度检查', '可访问性标准'],
  },
  {
    id: 'layout',
    title: '排版技法',
    description: '现代设计网格系统、间距规范和响应式布局原则',
    icon: LayoutGrid,
    color: 'from-cyan-500 to-blue-500',
    path: '/layout',
    stats: '5 网格系统',
    features: ['12列网格', '8列网格', '黄金比例', '响应式断点'],
  },
  {
    id: 'design-system',
    title: '设计系统',
    description: '完整的设计令牌体系、组件规范和使用指南',
    icon: Layers,
    color: 'from-emerald-500 to-teal-500',
    path: '/design-system',
    stats: '50+ 令牌',
    features: ['色彩系统', '间距规范', '圆角尺度', '阴影层次'],
  },
]

const advancedTopics = [
  {
    title: '组件规范',
    description: '按钮、卡片、输入框等核心组件的设计规范',
    icon: MousePointer,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: '动效设计',
    description: '微交互、过渡动画的设计原则和实现技巧',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
  },
  {
    title: '图标系统',
    description: '图标设计原则、风格选择和资源推荐',
    icon: PenTool,
    color: 'from-red-500 to-pink-500',
  },
  {
    title: '响应式策略',
    description: '移动优先的响应式设计方法和最佳实践',
    icon: Grid3x3,
    color: 'from-indigo-500 to-violet-500',
  },
]

const designPrinciples = [
  {
    title: '一致性',
    description: '界面元素在整个应用中保持一致的外观和行为',
    icon: Layers,
  },
  {
    title: '层次感',
    description: '通过大小、颜色、间距建立清晰的信息层级',
    icon: LayoutGrid,
  },
  {
    title: '反馈',
    description: '每个操作都应提供即时的视觉或触觉反馈',
    icon: MousePointer,
  },
  {
    title: '效率',
    description: '最小化用户完成任务所需的步骤和认知负担',
    icon: Zap,
  },
]

function ResourceCard({ resource, index }) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = resource.icon

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Card
        hoverable
        className="h-full overflow-hidden"
        onClick={() => window.location.href = resource.path}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <Badge variant="default" size="sm">{resource.stats}</Badge>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
            {resource.title}
          </h3>

          <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {resource.features.map((feature, i) => (
              <Badge key={i} variant="default" size="sm">{feature}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-violet-400 font-medium group-hover:gap-3 transition-all">
            <span>探索</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function DesignPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.header
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <Paintbrush className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-neutral-400">Design Knowledge System</span>
            </motion.div>

            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              设计<span className="text-gradient">知识</span>体系
            </h1>

            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              从字体到色彩，从排版到动效，打造完整的设计知识体系。
              理论与实践结合，助力提升设计专业度。
            </p>

            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">4</p>
                <p className="text-sm text-neutral-500">核心模块</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">100+</p>
                <p className="text-sm text-neutral-500">设计知识点</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-white">∞</p>
                <p className="text-sm text-neutral-500">持续更新</p>
              </div>
            </div>
          </motion.header>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              核心<span className="text-gradient">模块</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              覆盖设计的关键领域，每个模块都包含理论与实践
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {designResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              高级<span className="text-gradient">主题</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              深入的设计专题，持续更新中
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {advancedTopics.map((topic, i) => {
                const Icon = topic.icon
                return (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-neutral-900/50 border border-white/5 hover:border-white/10 transition-colors group cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-violet-400 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {topic.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              设计<span className="text-gradient">原则</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              指导设计决策的基本原则
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designPrinciples.map((principle, i) => {
                const Icon = principle.icon
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-neutral-900/50 border border-white/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {principle.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-2">
              设计<span className="text-gradient">资源</span>
            </h2>
            <p className="text-neutral-400 mb-8">
              精选的设计工具和学习资源
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hoverable className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Figma className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Figma</h3>
                    <p className="text-xs text-neutral-500">界面设计工具</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mb-4">
                  现代化协作设计工具，支持组件系统、自动布局和设计令牌
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  访问官网
                </Button>
              </Card>

              <Card hoverable className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Code className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Tailwind CSS</h3>
                    <p className="text-xs text-neutral-500">原子化 CSS 框架</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mb-4">
                  高效的 CSS 框架，通过组合原子类快速构建现代化界面
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  访问官网
                </Button>
              </Card>

              <Card hoverable className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">设计书籍</h3>
                    <p className="text-xs text-neutral-500">推荐阅读</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 mb-4">
                  精选设计经典著作，从理论到实践全面提升设计能力
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  查看书单
                </Button>
              </Card>
            </div>
          </section>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-12 border-t border-white/5"
          >
            <p className="text-neutral-500 mb-4">
              设计知识体系持续更新中...
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="default" size="sm">v1.0.0</Badge>
              <Badge variant="default" size="sm">Last Updated: 2024</Badge>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  )
}
