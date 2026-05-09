import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Copy, Check, AlertCircle, Info, Palette, Droplet, Sun, Moon, Eye, Heart, Zap, Shield, Sparkles, Target, Layers, Contrast } from 'lucide-react'
import { Badge, Card, TabList, Tab } from '../components/ui'

const colorSchemes = {
  monochromatic: {
    name: '单色系',
    description: '同一色相的不同亮度/饱和度组合',
    colors: [
      { hex: '#6366f1', name: '基础色' },
      { hex: '#818cf8', name: '浅色' },
      { hex: '#a5b4fc', name: '亮色' },
      { hex: '#c7d2fe', name: '淡色' },
      { hex: '#4f46e5', name: '深色' },
      { hex: '#3730a3', name: '暗色' },
    ]
  },
  complementary: {
    name: '互补色',
    description: '180° 对立位置的两种色相',
    colors: [
      { hex: '#6366f1', name: '靛蓝' },
      { hex: '#f59e0b', name: '琥珀' },
      { hex: '#818cf8', name: '浅靛蓝' },
      { hex: '#fbbf24', name: '浅琥珀' },
    ]
  },
  analogous: {
    name: '类似色',
    description: '色轮上相邻的 3-5 种色相',
    colors: [
      { hex: '#6366f1', name: '靛蓝' },
      { hex: '#8b5cf6', name: '紫色' },
      { hex: '#a855f7', name: '洋红' },
      { hex: '#d946ef', name: '品红' },
      { hex: '#ec4899', name: '粉色' },
    ]
  },
  triadic: {
    name: '三色系',
    description: '色轮上等距分布的三种色相',
    colors: [
      { hex: '#6366f1', name: '靛蓝' },
      { hex: '#22c55e', name: '绿色' },
      { hex: '#f43f5e', name: '玫瑰' },
    ]
  },
  splitComplementary: {
    name: '分裂互补',
    description: '互补色的两侧色相',
    colors: [
      { hex: '#6366f1', name: '靛蓝' },
      { hex: '#f59e0b', name: '琥珀' },
      { hex: '#fb923c', name: '橙色' },
    ]
  },
  tetradic: {
    name: '四色系',
    description: '色轮上形成矩形/方形的四种色相',
    colors: [
      { hex: '#6366f1', name: '靛蓝' },
      { hex: '#22c55e', name: '绿色' },
      { hex: '#f59e0b', name: '琥珀' },
      { hex: '#ec4899', name: '粉色' },
    ]
  },
}

const accessibilityGuidelines = [
  {
    level: 'AAA',
    ratio: '7:1',
    description: '最高对比度标准，适合所有用户',
    usage: '重要文字、小字号',
    color: 'emerald',
  },
  {
    level: 'AA',
    ratio: '4.5:1',
    description: '标准对比度要求',
    usage: '正文、UI 文字',
    color: 'sky',
  },
  {
    level: 'AA Large',
    ratio: '3:1',
    description: '大文本和 UI 组件的最低要求',
    usage: '标题、大按钮图标',
    color: 'amber',
  },
]

const colorPalettes = [
  {
    name: '专业蓝',
    base: '#3b82f6',
    colors: ['#dbeafe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'],
  },
  {
    name: '活力紫',
    base: '#8b5cf6',
    colors: ['#ede9fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'],
  },
  {
    name: '自然绿',
    base: '#22c55e',
    colors: ['#dcfce7', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
  },
  {
    name: '温暖橙',
    base: '#f97316',
    colors: ['#ffedd5', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c'],
  },
  {
    name: '经典红',
    base: '#ef4444',
    colors: ['#fee2e2', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c'],
  },
  {
    name: '极简灰',
    base: '#6b7280',
    colors: ['#f9fafb', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#374151'],
  },
]

const colorSpaces = [
  {
    name: 'RGB',
    description: '红绿蓝加色模型',
    model: '加法混色',
    usage: '屏幕显示、数字图像',
    icon: Sun,
    features: ['屏幕原生支持', '广泛兼容性', '直观理解'],
  },
  {
    name: 'HSL',
    description: '色相-饱和度-亮度',
    model: '极坐标',
    usage: '设计师友好、颜色调整',
    icon: Palette,
    features: ['直觉操作', '饱和度控制', '亮度调整'],
  },
  {
    name: 'HSV/HSB',
    description: '色相-饱和度-明度',
    model: '圆柱坐标',
    usage: '软件取色器',
    icon: Droplet,
    features: ['Adobe 系列标准', '亮度定义不同', '绘画友好'],
  },
  {
    name: 'OKLCH',
    description: '感知均匀色彩空间',
    model: '现代 perceptual',
    usage: '高级色彩系统、设计系统',
    icon: Eye,
    features: ['视觉均匀', ' gamut 控制', '未来标准'],
  },
]

const colorHarmonyRules = [
  {
    name: '60-30-10 法则',
    description: '主色60%、辅助色30%、强调色10%',
    ratio: '60:30:10',
    usage: '通用设计原则',
    principles: [
      '主色占主导地位但不压迫',
      '辅助色支持但不过度抢眼',
      '强调色用于引导注意力',
    ],
  },
  {
    name: '中性色平衡',
    description: '使用中性色平衡彩色区域',
    ratio: '可变',
    usage: '界面设计、卡片布局',
    principles: [
      '中性色作为背景和容器',
      '彩色用于焦点和交互元素',
      '避免所有元素都是彩色',
    ],
  },
  {
    name: '色彩权重',
    description: '重要元素使用更饱和的颜色',
    ratio: '可变',
    usage: '信息层级、可访问性',
    principles: [
      '主要操作使用品牌色',
      '次要元素降低饱和度',
      '背景使用中性色或低饱和色',
    ],
  },
]

const advancedPalettes = [
  {
    name: 'Material Design',
    description: 'Google Material Design 色彩系统',
    colors: [
      { name: 'Primary', hex: '#6200EE' },
      { name: 'Primary Variant', hex: '#3700B3' },
      { name: 'Secondary', hex: '#03DAC6' },
      { name: 'Secondary Variant', hex: '#018786' },
      { name: 'Background', hex: '#FFFFFF' },
      { name: 'Surface', hex: '#FFFFFF' },
      { name: 'Error', hex: '#B00020' },
      { name: 'On Primary', hex: '#FFFFFF' },
      { name: 'On Secondary', hex: '#000000' },
      { name: 'On Background', hex: '#000000' },
      { name: 'On Surface', hex: '#000000' },
      { name: 'On Error', hex: '#FFFFFF' },
    ],
  },
  {
    name: 'Tailwind CSS',
    description: 'Tailwind 默认色彩系统',
    colors: [
      { name: 'Blue 500', hex: '#3B82F6' },
      { name: 'Violet 500', hex: '#8B5CF6' },
      { name: 'Emerald 500', hex: '#10B981' },
      { name: 'Amber 500', hex: '#F59E0B' },
      { name: 'Rose 500', hex: '#F43F5E' },
      { name: 'Slate 900', hex: '#0F172A' },
      { name: 'Slate 700', hex: '#334155' },
      { name: 'Slate 500', hex: '#64748B' },
      { name: 'Slate 300', hex: '#CBD5E1' },
      { name: 'Slate 100', hex: '#F1F5F9' },
      { name: 'Slate 50', hex: '#F8FAFC' },
      { name: 'White', hex: '#FFFFFF' },
    ],
  },
  {
    name: 'Semantic Colors',
    description: '语义化色彩命名系统',
    colors: [
      { name: 'success', hex: '#22C55E' },
      { name: 'warning', hex: '#F59E0B' },
      { name: 'error', hex: '#EF4444' },
      { name: 'info', hex: '#3B82F6' },
      { name: 'neutral', hex: '#6B7280' },
      { name: 'brand', hex: '#8B5CF6' },
      { name: 'highlight', hex: '#EC4899' },
      { name: 'muted', hex: '#9CA3AF' },
      { name: 'border', hex: '#E5E7EB' },
      { name: 'background', hex: '#F9FAFB' },
      { name: 'surface', hex: '#FFFFFF' },
      { name: 'text', hex: '#111827' },
    ],
  },
]

const colorPsychology = [
  { color: '#EF4444', name: '红色', emotions: ['热情', '能量', '紧急', '爱'], usage: '促销、警告、重要操作', icon: Heart },
  { color: '#F97316', name: '橙色', emotions: ['活力', '创意', '友好', '自信'], usage: 'CTA按钮、创意品牌', icon: Zap },
  { color: '#F59E0B', name: '黄色', emotions: ['乐观', '温暖', '注意', '快乐'], usage: '提示、高亮、警告', icon: Sun },
  { color: '#22C55E', name: '绿色', emotions: ['自然', '成长', '安全', '健康'], usage: '成功状态、环保主题', icon: Shield },
  { color: '#3B82F6', name: '蓝色', emotions: ['信任', '专业', '平静', '可靠'], usage: '企业网站、金融科技', icon: Shield },
  { color: '#8B5CF6', name: '紫色', emotions: ['创意', '神秘', '高端', '想象'], usage: '创意品牌、奢侈品', icon: Sparkles },
  { color: '#EC4899', name: '粉色', emotions: ['浪漫', '温柔', '年轻', '甜美'], usage: '女性品牌、美妆', icon: Heart },
  { color: '#6B7280', name: '灰色', emotions: ['中立', '专业', '沉稳', '现代'], usage: '背景、边框、次要文字', icon: Layers },
]

const gradientTypes = [
  {
    name: '线性渐变',
    css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    usage: '背景、按钮、卡片',
  },
  {
    name: '径向渐变',
    css: 'radial-gradient(circle, #667eea 0%, #764ba2 100%)',
    preview: 'radial-gradient(circle, #667eea 0%, #764ba2 100%)',
    usage: '聚光效果、光晕',
  },
  {
    name: '锥形渐变',
    css: 'conic-gradient(from 0deg, #667eea, #764ba2, #667eea)',
    preview: 'conic-gradient(from 0deg, #667eea, #764ba2, #667eea)',
    usage: '进度环、色轮',
  },
  {
    name: '多色渐变',
    css: 'linear-gradient(90deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
    preview: 'linear-gradient(90deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
    usage: '品牌展示、Hero区域',
  },
]

const colorBlindnessTypes = [
  { name: '正常视觉', type: 'normal', description: '三色视觉正常' },
  { name: '红色盲', type: 'protanopia', description: '无法感知红色' },
  { name: '绿色盲', type: 'deuteranopia', description: '无法感知绿色' },
  { name: '蓝黄色盲', type: 'tritanopia', description: '无法感知蓝色' },
]

function ColorSwatch({ hex, name, size = 'md', showCopy = true }) {
  const [copied, setCopied] = useState(false)

  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleCopy}
        className={`
          ${sizes[size]} rounded-xl border border-white/10 
          hover:border-white/20 hover:scale-105 
          transition-all duration-200 relative group overflow-hidden
        `}
        style={{ backgroundColor: hex }}
        title={`点击复制 ${hex}`}
      >
        {showCopy && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
            {copied ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <Copy className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        )}
      </button>
      {name && (
        <div className="text-center">
          <p className="text-xs font-mono text-neutral-400">{hex}</p>
          <p className="text-xs text-neutral-500">{name}</p>
        </div>
      )}
    </div>
  )
}

function ColorSpaceCard({ space, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = space.icon

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{space.name}</h3>
          <p className="text-xs text-neutral-500">{space.model}</p>
        </div>
      </div>

      <p className="text-sm text-neutral-400 mb-4">{space.description}</p>

      <div className="mb-4">
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          适用场景
        </h4>
        <p className="text-sm text-white">{space.usage}</p>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          特性
        </h4>
        <div className="flex flex-wrap gap-2">
          {space.features.map((feature, i) => (
            <Badge key={i} variant="default" size="sm">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function HarmonyRuleCard({ rule, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{rule.name}</h3>
          <p className="text-sm text-neutral-400">{rule.description}</p>
        </div>
        <Badge variant="outline" size="sm">
          {rule.ratio}
        </Badge>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          使用场景
        </h4>
        <p className="text-sm text-white">{rule.usage}</p>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          原则
        </h4>
        <ul className="space-y-1">
          {rule.principles.map((principle, i) => (
            <li key={i} className="text-sm text-neutral-400 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
              {principle}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

function AdvancedPaletteCard({ palette, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [copied, setCopied] = useState(false)

  const handleCopyAll = () => {
    const colorString = palette.colors.map(c => `${c.name}: ${c.hex}`).join('\n')
    navigator.clipboard.writeText(colorString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{palette.name}</h3>
          <p className="text-sm text-neutral-500">{palette.description}</p>
        </div>
        <button
          onClick={handleCopyAll}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${copied 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}
          `}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-2">
        {palette.colors.map((color, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg border border-white/10 flex-shrink-0"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">{color.name}</p>
              <p className="text-xs text-neutral-500 font-mono">{color.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ContrastChecker({ bgColor, fgColor, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const getLuminance = (hex) => {
    const rgb = hex.match(/[A-Fa-f0-9]{2}/g).map(x => parseInt(x, 16) / 255)
    const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  const getContrastRatio = (bg, fg) => {
    const l1 = getLuminance(bg)
    const l2 = getLuminance(fg)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2)
  }

  const ratio = getContrastRatio(bgColor, fgColor)
  const meetsAAA = parseFloat(ratio) >= 7
  const meetsAA = parseFloat(ratio) >= 4.5
  const meetsAALarge = parseFloat(ratio) >= 3

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col gap-2"
    >
      <div
        className="p-4 rounded-xl border border-white/10"
        style={{ backgroundColor: bgColor }}
      >
        <p className="text-lg font-semibold" style={{ color: fgColor }}>
          前景文字示例
        </p>
        <p className="text-sm" style={{ color: fgColor }}>
          辅助说明文本
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant={meetsAAA ? 'success' : meetsAA ? 'warning' : 'error'} size="sm">
            AAA {meetsAAA ? '✓' : '✗'}
          </Badge>
          <Badge variant={meetsAA ? 'success' : 'error'} size="sm">
            AA {meetsAA ? '✓' : '✗'}
          </Badge>
          <Badge variant={meetsAALarge ? 'success' : 'error'} size="sm">
            AA Large {meetsAALarge ? '✓' : '✗'}
          </Badge>
        </div>
        <p className="text-lg font-bold text-white">{ratio}:1</p>
      </div>
    </motion.div>
  )
}

function ColorPsychologyCard({ item, index }) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = item.icon

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: item.color }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
          <p className="text-xs text-neutral-500">{item.usage}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {item.emotions.map((emotion, i) => (
          <Badge key={i} variant="default" size="sm">
            {emotion}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

function GradientCard({ gradient, index }) {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(gradient.css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{gradient.name}</h3>
        <button
          onClick={handleCopy}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${copied 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}
          `}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <div 
        className="h-24 rounded-xl mb-4"
        style={{ background: gradient.preview }}
      />

      <p className="text-xs text-neutral-500 mb-2">适用场景: {gradient.usage}</p>
      <code className="block bg-neutral-800/50 rounded-lg p-2 text-xs text-neutral-300 font-mono overflow-x-auto">
        {gradient.css}
      </code>
    </motion.div>
  )
}

export default function ColorPage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeScheme, setActiveScheme] = useState('monochromatic')

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
              <Palette className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-neutral-400">Color Science System</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              色彩<span className="text-gradient">科学</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              基于色彩理论的配色系统，包含 6 种经典配色方案、
              WCAG 可访问性标准和完整的色阶系统。
            </p>
          </motion.header>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                配色<span className="text-gradient">方案</span>
              </h2>
            </div>

            <TabList className="flex flex-wrap gap-2 mb-8">
              {Object.entries(colorSchemes).map(([key, scheme]) => (
                <Tab 
                  key={key}
                  active={activeScheme === key}
                  onClick={() => setActiveScheme(key)}
                >
                  {scheme.name}
                </Tab>
              ))}
            </TabList>

            <motion.div
              key={activeScheme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/50 rounded-2xl border border-white/5 p-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {colorSchemes[activeScheme].name}
                  </h3>
                  <p className="text-neutral-400">
                    {colorSchemes[activeScheme].description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 justify-center">
                {colorSchemes[activeScheme].colors.map((color, index) => (
                  <ColorSwatch
                    key={index}
                    hex={color.hex}
                    name={color.name}
                    size="lg"
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                {colorSchemes[activeScheme].colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="px-6 py-4 rounded-xl border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  >
                    <p className="text-xs font-mono opacity-80">#{color.hex.slice(1)}</p>
                    <p className="text-sm font-medium opacity-90">{color.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                色彩<span className="text-gradient">心理学</span>
              </h2>
            </div>

            <p className="text-neutral-400 mb-8 max-w-2xl">
              不同颜色会引发不同的情感反应。了解色彩心理学可以帮助你选择合适的颜色来传达品牌信息和引导用户行为。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colorPsychology.map((item, index) => (
                <ColorPsychologyCard key={item.name} item={item} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                渐变<span className="text-gradient">系统</span>
              </h2>
            </div>

            <p className="text-neutral-400 mb-8 max-w-2xl">
              渐变可以增加视觉深度和吸引力。现代设计趋势中，渐变被广泛应用于背景、按钮和品牌元素。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gradientTypes.map((gradient, index) => (
                <GradientCard key={gradient.name} gradient={gradient} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              色彩<span className="text-gradient">空间</span>
            </h2>

            <p className="text-neutral-400 mb-8 max-w-2xl">
              不同的色彩空间适合不同的使用场景。现代设计系统推荐使用 OKLCH 色彩空间，
              它是基于人类视觉感知的均匀色彩空间。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {colorSpaces.map((space, index) => (
                <ColorSpaceCard key={space.name} space={space} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Contrast className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                对比度<span className="text-gradient">检测</span>
              </h2>
            </div>

            <p className="text-neutral-400 mb-8 max-w-2xl">
              WCAG (Web Content Accessibility Guidelines) 定义了三种对比度等级。
              确保文本和背景之间有足够的对比度，以保证所有用户都能清晰阅读内容。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {accessibilityGuidelines.map((guideline, index) => (
                <motion.div
                  key={guideline.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-900/50 rounded-xl border border-white/5 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={guideline.color} size="lg">
                      WCAG {guideline.level}
                    </Badge>
                    <span className="text-2xl font-bold text-white">{guideline.ratio}</span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-2">{guideline.description}</p>
                  <p className="text-sm text-white">{guideline.usage}</p>
                </motion.div>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-white mb-4">对比度示例</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ContrastChecker bgColor="#FFFFFF" fgColor="#000000" index={0} />
              <ContrastChecker bgColor="#1F2937" fgColor="#FFFFFF" index={1} />
              <ContrastChecker bgColor="#3B82F6" fgColor="#FFFFFF" index={2} />
              <ContrastChecker bgColor="#10B981" fgColor="#FFFFFF" index={3} />
              <ContrastChecker bgColor="#F59E0B" fgColor="#000000" index={4} />
              <ContrastChecker bgColor="#EF4444" fgColor="#FFFFFF" index={5} />
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              色彩<span className="text-gradient">和谐</span>
            </h2>

            <p className="text-neutral-400 mb-8 max-w-2xl">
              遵循色彩和谐原则可以创建视觉上令人愉悦的界面设计。这些规则经过多年的设计实践验证，
              能够帮助你快速建立专业的色彩体系。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {colorHarmonyRules.map((rule, index) => (
                <HarmonyRuleCard key={rule.name} rule={rule} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                高级<span className="text-gradient">色板</span>
              </h2>
            </div>

            <p className="text-neutral-400 mb-8 max-w-2xl">
              业界领先的设计系统色彩方案。这些色板经过精心设计，包含了完整的中性色系统和语义化色彩命名。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advancedPalettes.map((palette, index) => (
                <AdvancedPaletteCard key={palette.name} palette={palette} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              色彩<span className="text-gradient">系统</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colorPalettes.map((palette, index) => (
                <motion.div
                  key={palette.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-900/50 rounded-xl border border-white/5 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">{palette.name}</h3>
                  <div className="flex gap-2 mb-4">
                    {palette.colors.map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-12 rounded-lg border border-white/10"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((color, i) => (
                      <Badge key={i} variant="default" size="sm">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <Card className="mt-8 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">CSS 变量导出</h3>
              <pre className="bg-neutral-800/50 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300">
{`:root {
  --color-primary: #8B5CF6;
  --color-primary-light: #A78BFA;
  --color-primary-dark: #7C3AED;
  
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  --color-neutral-50: #F9FAFB;
  --color-neutral-100: #F3F4F6;
  --color-neutral-200: #E5E7EB;
  --color-neutral-300: #D1D5DB;
  --color-neutral-400: #9CA3AF;
  --color-neutral-500: #6B7280;
  --color-neutral-600: #4B5563;
  --color-neutral-700: #374151;
  --color-neutral-800: #1F2937;
  --color-neutral-900: #111827;
}`}</pre>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}