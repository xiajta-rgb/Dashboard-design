import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'
import { Badge, Card, Button, IconButton, TabList, Tab } from '../components/ui'
import { 
  Zap,
  Play,
  Pause,
  MousePointer,
  Hand,
  Sparkles,
  Layers,
  RotateCcw,
  ChevronRight,
  Copy,
  Check,
  Heart,
  ThumbsUp,
  Download,
  Clock,
  Timer,
  Activity,
  TrendingUp,
  Gauge,
  Eye,
  Clock3,
  MousePointer2,
  RefreshCw,
  SkipForward,
  Repeat,
  Target,
  Feather,
  Rocket,
  Blend,
  Box,
  Layout,
  Move,
} from 'lucide-react'

const animationCategories = {
  'entrance': {
    title: '入场动画',
    description: '元素进入视图时的动画效果',
    animations: [
      {
        name: 'Fade In',
        description: '淡入效果，最基础的动画',
        code: `{ opacity: 0 } → { opacity: 1 }`,
        duration: '0.3s',
        useCase: '列表项、卡片、内容块',
      },
      {
        name: 'Slide Up',
        description: '从下方滑入，常用入场效果',
        code: `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }`,
        duration: '0.4s',
        useCase: '模态框、通知、工具提示',
      },
      {
        name: 'Scale In',
        description: '缩放进入，视觉冲击力强',
        code: `{ opacity: 0, scale: 0.9 } → { opacity: 1, scale: 1 }`,
        duration: '0.3s',
        useCase: '图片、图标、重要元素',
      },
      {
        name: 'Bounce In',
        description: '弹跳进入，充满活力',
        code: `{ opacity: 0, scale: 0.3 } → { opacity: 1, scale: 1 }`,
        duration: '0.5s',
        useCase: '成功提示、庆祝动画',
      },
      {
        name: 'Flip In',
        description: '翻转进入，现代感强',
        code: `{ opacity: 0, rotateX: 90 } → { opacity: 1, rotateX: 0 }`,
        duration: '0.4s',
        useCase: '3D卡片、翻转切换',
      },
    ],
  },
  'exit': {
    title: '退场动画',
    description: '元素离开视图时的动画效果',
    animations: [
      {
        name: 'Fade Out',
        description: '淡出效果，柔和消失',
        code: `{ opacity: 1 } → { opacity: 0 }`,
        duration: '0.2s',
        useCase: '页面切换、内容隐藏',
      },
      {
        name: 'Slide Down',
        description: '向下滑出，自然退出',
        code: `{ opacity: 1, y: 0 } → { opacity: 0, y: 20 }`,
        duration: '0.3s',
        useCase: '通知、提示框',
      },
      {
        name: 'Scale Out',
        description: '缩放退出，紧凑感',
        code: `{ opacity: 1, scale: 1 } → { opacity: 0, scale: 0.9 }`,
        duration: '0.2s',
        useCase: '弹窗关闭、删除确认',
      },
    ],
  },
  'interaction': {
    title: '交互动画',
    description: '用户与元素交互时的反馈',
    animations: [
      {
        name: 'Hover Scale',
        description: '悬停放大，表示可交互',
        code: 'whileHover: { scale: 1.05 }',
        duration: '0.15s',
        useCase: '按钮、卡片、图片',
      },
      {
        name: 'Press Scale',
        description: '按下缩小，确认操作',
        code: 'whileTap: { scale: 0.95 }',
        duration: '0.1s',
        useCase: '按钮、图标按钮',
      },
      {
        name: 'Hover Glow',
        description: '悬停发光，吸引注意',
        code: 'whileHover: { boxShadow: glow }',
        duration: '0.2s',
        useCase: 'CTA按钮、重要操作',
      },
      {
        name: 'Shimmer',
        description: '流光效果，加载完成',
        code: 'background: linear-gradient shimmer',
        duration: '1.5s',
        useCase: '加载状态、skeleton',
      },
    ],
  },
  'transition': {
    title: '页面过渡',
    description: '页面和组件切换时的动画',
    animations: [
      {
        name: 'Fade Transition',
        description: '渐变过渡，简洁自然',
        code: 'opacity: 0 → 1, y: 8 → 0',
        duration: '0.3s',
        useCase: '页面切换、Tab切换',
      },
      {
        name: 'Slide Transition',
        description: '滑动过渡，方向感强',
        code: 'x: 20 → 0, opacity: 0 → 1',
        duration: '0.3s',
        useCase: '路由切换、侧滑菜单',
      },
      {
        name: 'Scale Transition',
        description: '缩放过渡，聚焦效果',
        code: 'scale: 0.95 → 1, opacity: 0 → 1',
        duration: '0.25s',
        useCase: '模态框、弹窗',
      },
    ],
  },
}

const timingFunctions = [
  { name: 'Ease Out', value: '[0.16, 1, 0.3, 1]', description: '快速开始，缓慢结束，适合入场动画', curve: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  { name: 'Ease In', value: '[0.7, 0, 0.84, 0]', description: '缓慢开始，快速结束，适合退场动画', curve: 'cubic-bezier(0.7, 0, 0.84, 0)' },
  { name: 'Ease In Out', value: '[0.65, 0, 0.35, 1]', description: '缓慢开始和结束，适合双向动画', curve: 'cubic-bezier(0.65, 0, 0.35, 1)' },
  { name: 'Linear', value: '[0, 0, 1, 1]', description: '匀速运动，适合进度条', curve: 'linear' },
  { name: 'Bounce', value: '[0.34, 1.56, 0.64, 1]', description: '弹性效果，适合趣味交互', curve: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
]

const durations = [
  { name: 'Instant', value: 0, description: '即时，无动画', usage: '禁用动画' },
  { name: 'Fast', value: 0.15, description: '快速，150ms，适合微交互', usage: '按钮点击、图标切换' },
  { name: 'Normal', value: 0.2, description: '标准，200ms，适合一般过渡', usage: 'Hover效果、简单动画' },
  { name: 'Slow', value: 0.3, description: '缓慢，300ms，适合复杂动画', usage: '页面元素、模态框' },
  { name: 'Very Slow', value: 0.5, description: '非常慢，500ms，适合页面过渡', usage: '页面切换、路由动画' },
]

const advancedMotionPatterns = [
  {
    name: 'Stagger Animation',
    title: '错开动画',
    description: '多个元素依次入场，创造流畅的视觉效果',
    code: `staggerChildren: 0.1`,
    example: '列表项依次出现',
    icon: Layers,
  },
  {
    name: 'Layout Animation',
    title: '布局动画',
    description: '元素位置变化时自动添加过渡动画',
    code: "layout",
    example: '拖拽排序',
    icon: Layout,
  },
  {
    name: 'Shared Element',
    title: '共享元素',
    description: '元素在不同页面间平滑过渡',
    code: `layoutId`,
    example: '图片放大查看',
    icon: Move,
  },
  {
    name: 'Scroll Animation',
    title: '滚动动画',
    description: '元素随滚动位置变化而变化',
    code: `useScroll, useTransform`,
    example: '视差效果',
    icon: Activity,
  },
  {
    name: 'Gesture Animation',
    title: '手势动画',
    description: '支持拖拽、滑动等手势操作',
    code: `useDrag, usePan`,
    example: '滑动删除',
    icon: MousePointer2,
  },
  {
    name: 'Morph Animation',
    title: '变形动画',
    description: 'SVG 路径变形和图标切换',
    code: "path(), SVG",
    example: '播放按钮变形',
    icon: Blend,
  },
]

const motionPrinciples = [
  {
    name: '物理真实',
    description: '动画应符合物理世界的运动规律',
    icon: Feather,
    metrics: '自然感',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: '意图明确',
    description: '每个动画都应传达明确的意图',
    icon: Target,
    metrics: '清晰度',
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: '反馈及时',
    description: '用户操作应获得即时视觉反馈',
    icon: Zap,
    metrics: '< 100ms',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: '性能优先',
    description: '优先使用 GPU 加速的属性',
    icon: Gauge,
    metrics: '60fps',
    color: 'from-pink-500 to-rose-500',
  },
]

const motionTokens = {
  durations: {
    'duration-instant': '0ms',
    'duration-fast': '150ms',
    'duration-normal': '200ms',
    'duration-slow': '300ms',
    'duration-slower': '500ms',
    'duration-slowest': '700ms',
  },
  easings: {
    'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'ease-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
    'ease-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
    'ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  springs: {
    'spring-bouncy': 'spring(bounce: 0.4, stiffness: 300, damping: 20)',
    'spring-snappy': 'spring(bounce: 0.2, stiffness: 400, damping: 30)',
    'spring-gentle': 'spring(bounce: 0.1, stiffness: 200, damping: 25)',
  },
}

const microinteractions = [
  { name: '点赞', icon: Heart, color: 'from-pink-500 to-rose-500', type: 'heart' },
  { name: '下载', icon: Download, color: 'from-emerald-500 to-teal-500', type: 'download' },
  { name: '刷新', icon: RefreshCw, color: 'from-blue-500 to-cyan-500', type: 'refresh' },
  { name: '播放', icon: Play, color: 'from-violet-500 to-purple-500', type: 'play' },
]

function AnimationDemo({ animation, isPlaying, onToggle }) {
  const prefersReducedMotion = useReducedMotion()

  const animationVariants = {
    fadeIn: { opacity: 0, animate: { opacity: 1 } },
    slideUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    scaleIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
    bounceIn: { initial: { opacity: 0, scale: 0.3 }, animate: { opacity: 1, scale: 1 } },
    fadeOut: { animate: { opacity: 0 } },
    slideDown: { animate: { opacity: 0, y: 20 } },
    scaleOut: { animate: { opacity: 0, scale: 0.9 } },
    hoverScale: { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
  }

  const variant = animationVariants[animation.variant] || animationVariants.fadeIn

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white mb-1">{animation.name}</h4>
          <p className="text-xs text-neutral-500">{animation.description}</p>
        </div>
        <IconButton
          label={isPlaying ? '暂停' : '播放'}
          variant="secondary"
          size="sm"
          onClick={onToggle}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </IconButton>
      </div>

      <div className="relative h-32 bg-neutral-800/50 rounded-xl overflow-hidden mb-4">
        <motion.div
          key={isPlaying ? 'playing' : 'idle'}
          {...variant}
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
            repeatType: 'reverse',
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl"
        />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">时长</span>
          <Badge variant="default" size="sm">{animation.duration}</Badge>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">使用场景</span>
          <span className="text-neutral-400">{animation.useCase}</span>
        </div>
      </div>

      <code className="block bg-neutral-900/50 rounded-lg p-3 text-xs text-neutral-400 font-mono">
        {animation.code}
      </code>
    </Card>
  )
}

function TimingCurveDemo({ timing }) {
  const [progress, setProgress] = useState(0)

  const curvePoints = {
    '[0.16, 1, 0.3, 1]': 'M0,100 C16,100 30,0 100,0',
    '[0.7, 0, 0.84, 0]': 'M0,100 C70,100 84,0 100,0',
    '[0.65, 0, 0.35, 1]': 'M0,100 C65,100 35,0 100,0',
    '[0, 0, 1, 1]': 'M0,100 L100,0',
    '[0.34, 1.56, 0.64, 1]': 'M0,100 C34,100 64,156 100,0',
  }

  return (
    <Card className="p-6">
      <h4 className="text-sm font-semibold text-white mb-2">{timing.name}</h4>
      <p className="text-xs text-neutral-500 mb-4">{timing.description}</p>

      <div className="relative h-32 bg-neutral-800/50 rounded-xl overflow-hidden mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d={curvePoints[timing.value]}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg"
            animate={{
              left: `${progress}%`,
              top: `${100 - progress}%`,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: timing.value === '[0, 0, 1, 1]' ? 'linear' : timing.value,
            }}
          />
        </svg>
      </div>

      <code className="block bg-neutral-900/50 rounded-lg p-3 text-xs text-neutral-400 font-mono">
        {timing.curve}
      </code>

      <Button
        variant="secondary"
        size="sm"
        className="w-full mt-4"
        onClick={() => setProgress(prev => prev >= 100 ? 0 : prev + 10)}
      >
        演示动画
      </Button>
    </Card>
  )
}

function AdvancedPatternCard({ pattern, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = pattern.icon

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{pattern.name}</h3>
          <p className="text-sm text-violet-400">{pattern.title}</p>
        </div>
      </div>

      <p className="text-sm text-neutral-400 mb-4">{pattern.description}</p>

      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">代码</h4>
          <code className="block bg-neutral-800/50 rounded-lg p-2 text-xs text-emerald-400 font-mono">
            {pattern.code}
          </code>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">示例</h4>
          <p className="text-xs text-neutral-400">{pattern.example}</p>
        </div>
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

function StaggerAnimationDemo() {
  const items = [1, 2, 3, 4, 5]

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center gap-3 p-4 bg-neutral-800/50 rounded-xl"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <span className="text-sm font-bold text-white">{item}</span>
          </div>
          <p className="text-sm text-neutral-400">错开动画示例 {item}</p>
        </motion.div>
      ))}
    </div>
  )
}

function ScrollAnimationDemo() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={ref} className="h-64 flex items-center justify-center bg-neutral-800/50 rounded-xl">
      <motion.div
        style={{ scale, opacity, rotate }}
        className="w-24 h-24 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-2xl flex items-center justify-center"
      >
        <Sparkles className="w-12 h-12 text-white" />
      </motion.div>
    </div>
  )
}

function GestureAnimationDemo() {
  const constraintsRef = useRef(null)

  return (
    <div
      ref={constraintsRef}
      className="h-48 bg-neutral-800/50 rounded-xl relative overflow-hidden"
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        whileDrag={{ scale: 1.1 }}
        className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        <Hand className="w-8 h-8 text-white" />
      </motion.div>
      <p className="absolute bottom-4 left-4 text-xs text-neutral-500">拖拽我！</p>
    </div>
  )
}

function MicrointeractionDemo({ interaction }) {
  const prefersReducedMotion = useReducedMotion()
  const [isActive, setIsActive] = useState(false)
  const Icon = interaction.icon

  return (
    <Card hoverable className="p-6 text-center">
      <motion.button
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
        onClick={() => setIsActive(!isActive)}
        className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isActive ? `bg-gradient-to-br ${interaction.color}` : 'bg-neutral-700'
        }`}
      >
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
      </motion.button>
      <p className="text-sm text-white mt-4">{interaction.name}</p>
      <p className="text-xs text-neutral-500 mt-1">
        {isActive ? '已激活' : '点击激活'}
      </p>
    </Card>
  )
}

export default function MotionPage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('entrance')
  const [playingAnimations, setPlayingAnimations] = useState({})
  const [isDemoPlaying, setIsDemoPlaying] = useState(false)

  const toggleAnimation = (index) => {
    setPlayingAnimations(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.header
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-neutral-400">Advanced Motion System</span>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">
              动效<span className="text-gradient">设计</span>系统
            </h1>

            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              精细的微交互动画库，涵盖入场、退场、交互和过渡效果。
              基于 Framer Motion 的专业动画解决方案。
            </p>
          </motion.header>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                动效<span className="text-gradient">原则</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {motionPrinciples.map((principle, index) => (
                <PrincipleCard key={principle.name} principle={principle} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                动画<span className="text-gradient">类别</span>
              </h2>
            </div>

            <TabList className="flex flex-wrap gap-2 mb-8">
              {Object.entries(animationCategories).map(([key, category]) => (
                <Tab
                  key={key}
                  active={activeCategory === key}
                  onClick={() => setActiveCategory(key)}
                >
                  {category.title}
                </Tab>
              ))}
            </TabList>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {animationCategories[activeCategory].animations.map((animation, index) => (
                <AnimationDemo
                  key={animation.name}
                  animation={animation}
                  isPlaying={playingAnimations[index]}
                  onToggle={() => toggleAnimation(index)}
                />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Clock3 className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                时间<span className="text-gradient">函数</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              不同的缓动函数带来不同的运动感受。选择合适的缓动函数可以让动画更加自然流畅。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timingFunctions.map((timing) => (
                <TimingCurveDemo key={timing.name} timing={timing} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Timer className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                动画<span className="text-gradient">时长</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              根据动画复杂度选择合适的时长。过长的动画会导致用户等待，过短则用户可能无法感知。
            </p>

            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {durations.map((duration) => (
                  <div key={duration.name} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-neutral-800/50 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{duration.value}s</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{duration.name}</h4>
                    <p className="text-xs text-neutral-500 mb-2">{duration.description}</p>
                    <Badge variant="outline" size="sm">{duration.usage}</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setIsDemoPlaying(!isDemoPlaying)}
                  leftIcon={isDemoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                >
                  {isDemoPlaying ? '暂停演示' : '播放时长演示'}
                </Button>
              </div>
            </Card>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                高级<span className="text-gradient">模式</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              复杂场景下的高级动画模式，掌握这些模式可以创建更加丰富的用户体验。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedMotionPatterns.map((pattern, index) => (
                <AdvancedPatternCard key={pattern.name} pattern={pattern} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                交互式<span className="text-gradient">演示</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              点击按钮查看各种高级动画效果
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">错开动画</h3>
                <StaggerAnimationDemo />
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">滚动动画</h3>
                <ScrollAnimationDemo />
                <p className="text-xs text-neutral-500 mt-2">滚动查看效果</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">手势动画</h3>
                <GestureAnimationDemo />
              </Card>
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                微交互<span className="text-gradient">示例</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              常见的微交互效果集合，这些小细节可以大大提升用户体验。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {microinteractions.map((interaction) => (
                <MicrointeractionDemo key={interaction.name} interaction={interaction} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Box className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                动效<span className="text-gradient">令牌</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              动效设计令牌，定义动画的时间、缓动和弹簧参数，确保全站动画一致性。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">时长令牌</h3>
                <div className="space-y-3">
                  {Object.entries(motionTokens.durations).map(([token, value]) => (
                    <div key={token} className="flex items-center justify-between">
                      <code className="text-xs text-neutral-400">{token}</code>
                      <Badge variant="outline" size="sm">{value}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">缓动令牌</h3>
                <div className="space-y-3">
                  {Object.entries(motionTokens.easings).map(([token, value]) => (
                    <div key={token} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <code className="text-xs text-neutral-400">{token}</code>
                      </div>
                      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2, repeat: Infinity, ease: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">弹簧令牌</h3>
                <div className="space-y-3">
                  {Object.entries(motionTokens.springs).map(([token, value]) => (
                    <div key={token} className="flex items-center justify-between">
                      <code className="text-xs text-neutral-400">{token}</code>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="mt-8 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">CSS 变量导出</h3>
              <pre className="bg-neutral-800/50 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300">
{`:root {
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-slowest: 700ms;
  
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  --spring-bouncy: spring(bounce: 0.4, stiffness: 300, damping: 20);
  --spring-snappy: spring(bounce: 0.2, stiffness: 400, damping: 30);
  --spring-gentle: spring(bounce: 0.1, stiffness: 200, damping: 25);
}`}</pre>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}