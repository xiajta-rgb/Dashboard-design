import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Badge, Card, Button } from '../components/ui'
import { 
  Palette,
  Sun,
  Moon,
  Sparkles,
  Check,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Zap,
  Layers,
  Paintbrush,
  Contrast,
  SunMoon,
  MonitorSmartphone,
  PaletteIcon,
  Download,
} from 'lucide-react'

const themes = {
  dark: {
    id: 'dark',
    name: '深色主题',
    description: '适合夜间使用和沉浸式体验',
    preview: {
      background: '#09090b',
      surface: '#0c0c0e',
      accent: '#6366f1',
      text: '#ffffff',
    },
    bestFor: ['开发者工具', '媒体应用', '沉浸式体验'],
  },
  light: {
    id: 'light',
    name: '浅色主题',
    description: '适合长时间阅读和专业环境',
    preview: {
      background: '#ffffff',
      surface: '#f9fafb',
      accent: '#3b82f6',
      text: '#111827',
    },
    bestFor: ['文档应用', '电商平台', '办公软件'],
  },
  blue: {
    id: 'blue',
    name: '蓝色主题',
    description: '专业，科技感强',
    preview: {
      background: '#0c1929',
      surface: '#1e3a5f',
      accent: '#3b82f6',
      text: '#ffffff',
    },
    bestFor: ['企业应用', '金融系统', '科技产品'],
  },
  emerald: {
    id: 'emerald',
    name: '翡翠主题',
    description: '清新，自然、健康',
    preview: {
      background: '#022c22',
      surface: '#064e3b',
      accent: '#10b981',
      text: '#ffffff',
    },
    bestFor: ['健康应用', '环保主题', '自然产品'],
  },
  purple: {
    id: 'purple',
    name: '紫罗兰主题',
    description: '优雅、创意、艺术',
    preview: {
      background: '#0f0720',
      surface: '#1a0f2e',
      accent: '#8b5cf6',
      text: '#ffffff',
    },
    bestFor: ['创意工具', '设计软件', '艺术平台'],
  },
  orange: {
    id: 'orange',
    name: '日落主题',
    description: '温暖、活力、友好',
    preview: {
      background: '#1a0f0a',
      surface: '#2d1a12',
      accent: '#f97316',
      text: '#ffffff',
    },
    bestFor: ['社交应用', '生活方式', '美食应用'],
  },
}

const advancedThemes = [
  {
    id: 'midnight',
    name: '午夜蓝',
    description: '深邃的午夜色调，营造专注氛围',
    colors: {
      primary: '#1e3a8a',
      secondary: '#3b82f6',
      accent: '#60a5fa',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      muted: '#64748b',
      border: '#334155',
    },
    bestFor: ['夜间阅读', '代码编辑器', '音乐应用'],
  },
  {
    id: 'forest',
    name: '森林绿',
    description: '自然清新的绿色调',
    colors: {
      primary: '#166534',
      secondary: '#22c55e',
      accent: '#86efac',
      background: '#052e16',
      surface: '#064e3b',
      text: '#f0fdf4',
      muted: '#6b7280',
      border: '#14532d',
    },
    bestFor: ['健康追踪', '冥想应用', '自然日记'],
  },
  {
    id: 'sunset',
    name: '日落渐变',
    description: '温暖的橙红色调',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      accent: '#fdba74',
      background: '#1c1917',
      surface: '#292524',
      text: '#fef3c7',
      muted: '#78716c',
      border: '#44403c',
    },
    bestFor: ['摄影应用', '旅行应用', '创意工具'],
  },
  {
    id: 'aurora',
    name: '极光',
    description: '神秘的蓝紫渐变',
    colors: {
      primary: '#7c3aed',
      secondary: '#8b5cf6',
      accent: '#c4b5fd',
      background: '#0c0a1d',
      surface: '#1a103d',
      text: '#f5f3ff',
      muted: '#8b5cf6',
      border: '#2e1065',
    },
    bestFor: ['设计工具', '艺术应用', '创意写作'],
  },
  {
    id: 'coral',
    name: '珊瑚色',
    description: '活力四射的珊瑚色调',
    colors: {
      primary: '#e11d48',
      secondary: '#f43f5e',
      accent: '#fda4af',
      background: '#fff1f2',
      surface: '#ffe4e6',
      text: '#881337',
      muted: '#9f1239',
      border: '#fecdd3',
    },
    bestFor: ['时尚应用', '美妆应用', '生活方式'],
  },
  {
    id: 'monochrome',
    name: '单色灰',
    description: '极简主义的灰色调',
    colors: {
      primary: '#404040',
      secondary: '#525252',
      accent: '#737373',
      background: '#fafafa',
      surface: '#f5f5f5',
      text: '#171717',
      muted: '#a3a3a3',
      border: '#e5e5e5',
    },
    bestFor: ['企业官网', '文档站点', '简约应用'],
  },
]

const themePrinciples = [
  {
    name: '一致性',
    description: '主题色彩在所有组件中保持一致',
    icon: Layers,
    metrics: '100%',
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: '可访问性',
    description: '确保足够的对比度和可读性',
    icon: Eye,
    metrics: 'WCAG AA',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: '灵活性',
    description: '支持品牌定制和多主题切换',
    icon: Zap,
    metrics: '无限',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: '性能',
    description: '主题切换无卡顿，即时响应',
    icon: Sparkles,
    metrics: '< 50ms',
    color: 'from-pink-500 to-rose-500',
  },
]

const themeConfiguration = [
  {
    category: '色彩配置',
    items: [
      { name: 'primary', description: '品牌主色，用于主要交互元素', example: '按钮、链接、焦点状态' },
      { name: 'secondary', description: '辅助色，用于次要元素', example: '标签、徽章、次要按钮' },
      { name: 'accent', description: '强调色，用于突出显示', example: '高亮、装饰、成功状态' },
      { name: 'background', description: '背景色，页面底层颜色', example: '页面背景、卡片背景' },
      { name: 'surface', description: '表面色，悬浮元素颜色', example: '弹窗、下拉菜单、工具提示' },
      { name: 'text', description: '文本色，主要文字颜色', example: '标题、正文、标签文字' },
      { name: 'muted', description: '次要文本色，辅助信息', example: '占位符、次要说明' },
      { name: 'border', description: '边框色，分割线和边框', example: '卡片边框、输入框边框' },
    ],
  },
  {
    category: '圆角配置',
    items: [
      { name: 'radius-sm', value: '4px', description: '小圆角，用于小元素', example: '徽章、小按钮' },
      { name: 'radius-md', value: '8px', description: '中等圆角，用于普通元素', example: '按钮、输入框' },
      { name: 'radius-lg', value: '12px', description: '大圆角，用于卡片和容器', example: '卡片、面板' },
      { name: 'radius-xl', value: '16px', description: '特大圆角，用于特殊容器', example: '模态框、大卡片' },
      { name: 'radius-full', value: '9999px', description: '全圆角，用于圆形元素', example: '头像、图标按钮' },
    ],
  },
  {
    category: '阴影配置',
    items: [
      { name: 'shadow-sm', description: '小阴影，微妙的层次感', example: '输入框、小的悬浮状态' },
      { name: 'shadow-md', description: '中等阴影，卡片悬浮', example: '卡片、dropdown' },
      { name: 'shadow-lg', description: '大阴影，弹出元素', example: '弹窗、通知' },
      { name: 'shadow-glow', description: '发光效果，聚焦状态', example: '按钮焦点、选中状态' },
    ],
  },
]

const themeFeatures = [
  {
    name: '实时预览',
    title: 'Live Preview',
    description: '选择主题时实时预览效果，无需保存即可看到变化',
    icon: Eye,
  },
  {
    name: '自动切换',
    title: 'Auto Switch',
    description: '根据系统偏好自动切换深色/浅色主题',
    icon: SunMoon,
  },
  {
    name: '品牌定制',
    title: 'Brand Custom',
    description: '支持上传品牌色彩，自动生成完整主题',
    icon: PaletteIcon,
  },
  {
    name: '多端同步',
    title: 'Multi-device Sync',
    description: '主题偏好自动同步到所有设备',
    icon: MonitorSmartphone,
  },
  {
    name: '对比度检测',
    title: 'Contrast Check',
    description: '自动检测色彩对比度，确保可访问性',
    icon: Contrast,
  },
  {
    name: '导出代码',
    title: 'Export Code',
    description: '一键导出主题配置文件，支持 CSS/JSON/SCSS',
    icon: Download,
  },
]

function ThemePreview({ theme, isSelected, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer
        border-2 transition-all duration-200
        ${isSelected ? 'border-violet-500 shadow-lg shadow-violet-500/20' : 'border-transparent hover:border-white/20'}
      `}
    >
      <div className="aspect-[4/3] relative">
        <div className="absolute inset-0" style={{ backgroundColor: theme.preview.background }} />
        
        <div className="absolute top-3 left-3 right-3 h-8 rounded-lg" style={{ backgroundColor: theme.preview.surface }} />
        
        <div className="absolute top-14 left-3 w-1/3 h-16 rounded-lg" style={{ backgroundColor: theme.preview.surface }} />
        <div className="absolute top-14 right-3 w-1/3 h-16 rounded-lg" style={{ backgroundColor: theme.preview.surface }} />
        
        <div className="absolute bottom-3 left-3 right-3 h-12 rounded-lg" style={{ backgroundColor: theme.preview.surface }}>
          <div 
            className="absolute top-1/2 left-3 -translate-y-1/2 w-16 h-4 rounded"
            style={{ backgroundColor: theme.preview.accent }}
          />
        </div>

        <div 
          className="absolute top-3 right-3 w-3 h-3 rounded-full"
          style={{ backgroundColor: theme.preview.accent }}
        />

        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center"
          >
            <Check className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-neutral-900">
        <h4 className="text-sm font-semibold text-white mb-1">{theme.name}</h4>
        <p className="text-xs text-neutral-500">{theme.description}</p>
      </div>
    </motion.div>
  )
}

function AdvancedThemeCard({ theme, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <h3 className="text-lg font-semibold text-white mb-2">{theme.name}</h3>
      <p className="text-sm text-neutral-400 mb-4">{theme.description}</p>

      <div className="flex gap-2 mb-4">
        <div 
          className="w-8 h-8 rounded-lg" 
          style={{ backgroundColor: theme.colors.primary }}
          title="Primary"
        />
        <div 
          className="w-8 h-8 rounded-lg" 
          style={{ backgroundColor: theme.colors.secondary }}
          title="Secondary"
        />
        <div 
          className="w-8 h-8 rounded-lg" 
          style={{ backgroundColor: theme.colors.accent }}
          title="Accent"
        />
        <div 
          className="w-8 h-8 rounded-lg" 
          style={{ backgroundColor: theme.colors.background }}
          title="Background"
        />
        <div 
          className="w-8 h-8 rounded-lg" 
          style={{ backgroundColor: theme.colors.surface }}
          title="Surface"
        />
      </div>

      <div className="space-y-2">
        <p 
          className="text-sm font-medium"
          style={{ color: theme.colors.text }}
        >
          文本示例
        </p>
        <p 
          className="text-xs"
          style={{ color: theme.colors.muted }}
        >
          次要文本
        </p>
        <div 
          className="h-px"
          style={{ backgroundColor: theme.colors.border }}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {theme.bestFor.map((item, i) => (
          <Badge key={i} variant="default" size="sm">
            {item}
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

function ConfigurationSection({ config }) {
  return (
    <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{config.category}</h3>
      <div className="space-y-4">
        {config.items.map((item, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-sm text-violet-400 font-mono">{item.name}</code>
                {item.value && (
                  <Badge variant="outline" size="sm">
                    {item.value}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-neutral-500 mb-1">{item.description}</p>
              {item.example && (
                <p className="text-xs text-neutral-600">例如：{item.example}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ feature, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors group"
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1">{feature.name}</h3>
      <p className="text-xs text-violet-400 mb-2">{feature.title}</p>
      <p className="text-xs text-neutral-500">{feature.description}</p>
    </motion.div>
  )
}

function LiveThemeDemo({ theme }) {
  return (
    <div 
      className="rounded-xl p-6 border border-white/10"
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text 
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button 
            className="px-4 py-2 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: theme.colors.primary,
              color: '#ffffff'
            }}
          >
            主要按钮
          </button>
          <button 
            className="px-4 py-2 rounded-lg font-medium border transition-colors"
            style={{ 
              borderColor: theme.colors.border,
              color: theme.colors.text
            }}
          >
            次要按钮
          </button>
        </div>

        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border 
          }}
        >
          <h4 className="font-semibold mb-2">卡片标题</h4>
          <p className="text-sm" style={{ color: theme.colors.muted }}>
            这是一段次要文本内容，用于展示文本在当前主题下的显示效果。
          </p>
        </div>

        <div className="flex gap-2">
          <Badge 
            size="sm"
            style={{ 
              backgroundColor: theme.colors.primary,
              color: '#ffffff'
            }}
          >
            主要
          </Badge>
          <Badge 
            size="sm"
            style={{ 
              backgroundColor: theme.colors.secondary,
              color: '#ffffff'
            }}
          >
            次要
          </Badge>
          <Badge 
            size="sm"
            style={{ 
              backgroundColor: theme.colors.accent,
              color: theme.colors.background
            }}
          >
            强调
          </Badge>
        </div>

        <div 
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <div 
            className="h-full rounded-full"
            style={{ 
              width: '60%',
              backgroundColor: theme.colors.primary 
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function ThemePage() {
  const prefersReducedMotion = useReducedMotion()
  const [selectedTheme, setSelectedTheme] = useState('dark')
  const [selectedAdvancedTheme, setSelectedAdvancedTheme] = useState(0)

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
              <Palette className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-neutral-400">Theme Customization System</span>
            </div>

            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              主题<span className="text-gradient">定制</span>系统
            </h1>

            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              灵活的主题定制方案，支持多主题切换、品牌定制和用户偏好设置。
              只需几行配置，即可为产品打造独特的视觉风格。
            </p>
          </motion.header>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              主题<span className="text-gradient">原则</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {themePrinciples.map((principle, index) => (
                <PrincipleCard key={principle.name} principle={principle} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              预设<span className="text-gradient">主题</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(themes).map((theme) => (
                <ThemePreview
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedTheme === theme.id}
                  onSelect={() => setSelectedTheme(theme.id)}
                />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              高级<span className="text-gradient">主题</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {advancedThemes.map((theme, index) => (
                <AdvancedThemeCard key={theme.id} theme={theme} index={index} />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">主题实时预览</h3>
                <LiveThemeDemo theme={advancedThemes[selectedAdvancedTheme]} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">选择其他主题</h3>
                <div className="space-y-2">
                  {advancedThemes.map((theme, index) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedAdvancedTheme(index)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg transition-all
                        ${selectedAdvancedTheme === index 
                          ? 'bg-white/10 border border-violet-500' 
                          : 'bg-neutral-900/50 border border-transparent hover:border-white/10'}
                      `}
                    >
                      <div className="flex gap-1">
                        <div 
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div 
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-white">{theme.name}</p>
                        <p className="text-xs text-neutral-500">{theme.description}</p>
                      </div>
                      {selectedAdvancedTheme === index && (
                        <Check className="w-4 h-4 text-violet-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              主题<span className="text-gradient">配置</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themeConfiguration.map((config, index) => (
                <ConfigurationSection key={config.category} config={config} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              主题<span className="text-gradient">功能</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themeFeatures.map((feature, index) => (
                <FeatureCard key={feature.name} feature={feature} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              深色<span className="text-gradient">主题</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Moon className="w-5 h-5 text-violet-400" />
                  <h3 className="text-lg font-semibold text-white">深色主题特点</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">减少眼睛疲劳，尤其在低光环境下</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">降低屏幕功耗，延长设备续航</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">突出内容层次，增强视觉焦点</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">适合媒体应用和沉浸式体验</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sun className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-semibold text-white">浅色主题特点</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">清晰明亮，适合长时间阅读</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">专业正式，符合办公环境需求</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">打印友好，可直接打印使用</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-neutral-400">适合文档和电商类应用</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              主题<span className="text-gradient">代码</span>
            </h2>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">CSS 变量示例</h3>
              <pre className="bg-neutral-900 rounded-lg p-4 text-sm text-neutral-300 font-mono overflow-x-auto">
{`:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #a78bfa;
  --color-background: #09090b;
  --color-surface: #0c0c0e;
  --color-text: #ffffff;
  --color-muted: #71717a;
  --color-border: #27272a;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
}`}
              </pre>

              <div className="flex gap-2 mt-4">
                <Button variant="secondary" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  复制代码
                </Button>
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  导出文件
                </Button>
              </div>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
