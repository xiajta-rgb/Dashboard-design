import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { Badge, Button, Card, Avatar, ProgressBar, Input, Tooltip, TabList, Tab, TabPanel } from '../components/ui'
import { 
  Layers,
  Palette,
  Type,
  LayoutGrid,
  Zap,
  Copy,
  Check,
  Info,
  Eye,
  Target,
  Code,
  FileCode,
  Settings,
  Ruler,
  CornerDownRight,
  Box,
  Circle,
  Square,
  Hexagon,
  Star,
} from 'lucide-react'

const designTokens = {
  colors: {
    primary: { value: '#6366f1', name: 'Primary', usage: '主要按钮、链接、强调元素', contrast: '#ffffff' },
    secondary: { value: '#8b5cf6', name: 'Secondary', usage: '次要元素、图标、标签', contrast: '#ffffff' },
    accent: { value: '#06b6d4', name: 'Accent', usage: '提示、成功状态、高亮', contrast: '#ffffff' },
    success: { value: '#22c55e', name: 'Success', usage: '成功、增长、正向反馈', contrast: '#ffffff' },
    warning: { value: '#f59e0b', name: 'Warning', usage: '警告、待处理、提示', contrast: '#000000' },
    danger: { value: '#ef4444', name: 'Danger', usage: '错误、危险、删除操作', contrast: '#ffffff' },
    info: { value: '#3b82f6', name: 'Info', usage: '信息、通知、帮助', contrast: '#ffffff' },
    background: { value: '#09090b', name: 'Background', usage: '页面背景', contrast: '#ffffff' },
    surface: { value: '#0c0c0e', name: 'Surface', usage: '卡片、面板背景', contrast: '#ffffff' },
    surface2: { value: '#111113', name: 'Surface 2', usage: '次级卡片背景', contrast: '#ffffff' },
    border: { value: 'rgba(255,255,255,0.06)', name: 'Border', usage: '边框、分隔线', contrast: '#ffffff' },
    borderStrong: { value: 'rgba(255,255,255,0.12)', name: 'Border Strong', usage: '强调边框', contrast: '#ffffff' },
    textPrimary: { value: '#ffffff', name: 'Text Primary', usage: '主要文字', contrast: '#000000' },
    textSecondary: { value: '#a1a1aa', name: 'Text Secondary', usage: '次要文字', contrast: '#000000' },
    textTertiary: { value: '#71717a', name: 'Text Tertiary', usage: '辅助文字、占位符', contrast: '#000000' },
    muted: { value: '#52525b', name: 'Muted', usage: '禁用状态、分割线', contrast: '#ffffff' },
  },
  spacing: {
    '0': { value: '0px', name: 'None', usage: '无间距' },
    '1': { value: '4px', name: '1 Unit', usage: '紧凑间距、图标边距' },
    '2': { value: '8px', name: '2 Units', usage: '小间距、组件内元素' },
    '3': { value: '12px', name: '3 Units', usage: '中等间距' },
    '4': { value: '16px', name: '4 Units', usage: '标准间距、卡片内边距' },
    '5': { value: '20px', name: '5 Units', usage: '较大间距' },
    '6': { value: '24px', name: '6 Units', usage: '组件间间距' },
    '8': { value: '32px', name: '8 Units', usage: '区块间距' },
    '10': { value: '40px', name: '10 Units', usage: '大区块间距' },
    '12': { value: '48px', name: '12 Units', usage: '页面级间距' },
    '16': { value: '64px', name: '16 Units', usage: '超大间距' },
  },
  typography: {
    fontFamily: {
      sans: { value: "'Inter', 'Noto Sans SC', sans-serif", name: 'Sans', usage: '标题、正文' },
      serif: { value: "'Playfair Display', 'Noto Serif SC', serif", name: 'Serif', usage: '装饰性标题' },
      mono: { value: "'JetBrains Mono', monospace", name: 'Mono', usage: '代码、数据' },
    },
    fontSize: {
      xs: { value: '12px', name: 'Extra Small', usage: '标签、注释' },
      sm: { value: '14px', name: 'Small', usage: '辅助文字' },
      base: { value: '16px', name: 'Base', usage: '正文' },
      lg: { value: '18px', name: 'Large', usage: '重要正文' },
      xl: { value: '20px', name: 'Extra Large', usage: '小标题' },
      '2xl': { value: '24px', name: '2XL', usage: 'H5标题' },
      '3xl': { value: '30px', name: '3XL', usage: 'H4标题' },
      '4xl': { value: '36px', name: '4XL', usage: 'H3标题' },
      '5xl': { value: '48px', name: '5XL', usage: 'H2标题' },
      '6xl': { value: '60px', name: '6XL', usage: 'H1标题' },
      '7xl': { value: '72px', name: '7XL', usage: 'Display标题' },
    },
    lineHeight: {
      none: { value: '1', name: 'None', usage: '紧凑文字' },
      tight: { value: '1.25', name: 'Tight', usage: '大标题' },
      snug: { value: '1.375', name: 'Snug', usage: '小标题' },
      normal: { value: '1.5', name: 'Normal', usage: '正文' },
      relaxed: { value: '1.625', name: 'Relaxed', usage: '长文本' },
      loose: { value: '2', name: 'Loose', usage: '松散文本' },
    },
    fontWeight: {
      thin: { value: '100', name: 'Thin', usage: '极细文字' },
      extralight: { value: '200', name: 'Extra Light', usage: '细文字' },
      light: { value: '300', name: 'Light', usage: '轻文字' },
      normal: { value: '400', name: 'Normal', usage: '普通文字' },
      medium: { value: '500', name: 'Medium', usage: '中等粗' },
      semibold: { value: '600', name: 'Semi Bold', usage: '半粗' },
      bold: { value: '700', name: 'Bold', usage: '粗体' },
      extrabold: { value: '800', name: 'Extra Bold', usage: '极粗' },
      black: { value: '900', name: 'Black', usage: '最粗' },
    },
    letterSpacing: {
      tighter: { value: '-0.05em', name: 'Tighter', usage: '紧凑' },
      tight: { value: '-0.025em', name: 'Tight', usage: '稍紧凑' },
      normal: { value: '0', name: 'Normal', usage: '正常' },
      wide: { value: '0.025em', name: 'Wide', usage: '稍宽' },
      wider: { value: '0.05em', name: 'Wider', usage: '宽' },
      widest: { value: '0.1em', name: 'Widest', usage: '极宽' },
    },
  },
  radius: {
    none: { value: '0px', name: 'None', usage: '直角' },
    sm: { value: '6px', name: 'Small', usage: '小元素、徽章' },
    md: { value: '8px', name: 'Medium', usage: '按钮、输入框' },
    lg: { value: '12px', name: 'Large', usage: '卡片、面板' },
    xl: { value: '16px', name: 'Extra Large', usage: '模态框、大卡片' },
    '2xl': { value: '24px', name: '2XL', usage: '超大卡片' },
    full: { value: '9999px', name: 'Full', usage: '圆形元素' },
  },
  shadow: {
    none: { value: 'none', name: 'None', usage: '无阴影' },
    sm: { value: '0 1px 2px rgba(0,0,0,0.05)', name: 'Small', usage: '输入框、小元素' },
    md: { value: '0 4px 6px rgba(0,0,0,0.1)', name: 'Medium', usage: '卡片、Dropdown' },
    lg: { value: '0 10px 15px rgba(0,0,0,0.1)', name: 'Large', usage: '弹窗、浮动面板' },
    xl: { value: '0 20px 25px rgba(0,0,0,0.15)', name: 'Extra Large', usage: '大弹窗、模态框' },
    '2xl': { value: '0 25px 50px rgba(0,0,0,0.25)', name: '2XL', usage: '超大模态框' },
    glow: { value: '0 0 20px rgba(99,102,241,0.3)', name: 'Glow', usage: '焦点状态、发光效果' },
    glowStrong: { value: '0 0 40px rgba(99,102,241,0.5)', name: 'Glow Strong', usage: '强发光效果' },
  },
  animation: {
    duration: {
      instant: { value: '0ms', name: 'Instant', usage: '无动画' },
      faster: { value: '75ms', name: 'Faster', usage: '极快动画' },
      fast: { value: '150ms', name: 'Fast', usage: '快速动画' },
      normal: { value: '200ms', name: 'Normal', usage: '标准动画' },
      slow: { value: '300ms', name: 'Slow', usage: '慢动画' },
      slower: { value: '500ms', name: 'Slower', usage: '极慢动画' },
    },
    easing: {
      easeOut: { value: '[0.16, 1, 0.3, 1]', name: 'Ease Out', usage: '入场动画' },
      easeIn: { value: '[0.7, 0, 0.84, 0]', name: 'Ease In', usage: '退场动画' },
      easeInOut: { value: '[0.65, 0, 0.35, 1]', name: 'Ease In Out', usage: '双向动画' },
      linear: { value: '[0, 0, 1, 1]', name: 'Linear', usage: '匀速动画' },
      bounce: { value: '[0.34, 1.56, 0.64, 1]', name: 'Bounce', usage: '弹性动画' },
    },
  },
  zIndex: {
    auto: { value: 'auto', name: 'Auto', usage: '自动' },
    base: { value: '1', name: 'Base', usage: '基础层' },
    dropdown: { value: '100', name: 'Dropdown', usage: '下拉菜单' },
    sticky: { value: '200', name: 'Sticky', usage: '粘性元素' },
    banner: { value: '300', name: 'Banner', usage: '顶部横幅' },
    overlay: { value: '400', name: 'Overlay', usage: '遮罩层' },
    modal: { value: '500', name: 'Modal', usage: '模态框' },
    popover: { value: '600', name: 'Popover', usage: '弹出层' },
    toast: { value: '700', name: 'Toast', usage: '通知提示' },
    tooltip: { value: '800', name: 'Tooltip', usage: '工具提示' },
  },
}

const componentGuidelines = [
  {
    name: 'Button',
    icon: 'button',
    description: '按钮用于触发操作',
    variants: ['primary', 'secondary', 'ghost', 'outline', 'danger', 'success'],
    sizes: ['sm', 'md', 'lg'],
    states: ['default', 'hover', 'active', 'disabled', 'loading'],
    code: `<Button variant="primary" size="md">点击我</Button>`,
    bestPractices: ['使用主按钮表示主要操作', '保持按钮文本简洁', '避免过多按钮'],
  },
  {
    name: 'Card',
    icon: 'card',
    description: '卡片用于组织和展示相关内容',
    variants: ['default', 'glass', 'elevated', 'outlined'],
    padding: ['none', 'sm', 'md', 'lg'],
    features: ['hoverable', 'clickable', 'shadow'],
    code: `<Card variant="glass" hoverable>内容</Card>`,
    bestPractices: ['保持卡片内容简洁', '使用适当的内边距', '考虑响应式布局'],
  },
  {
    name: 'Badge',
    icon: 'badge',
    description: '徽章用于标签、状态指示',
    variants: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    sizes: ['sm', 'md', 'lg'],
    features: ['dot indicator', 'animated'],
    code: `<Badge variant="success">在线</Badge>`,
    bestPractices: ['徽章文本尽量简短', '语义化颜色使用', '避免过多徽章'],
  },
  {
    name: 'Input',
    icon: 'input',
    description: '输入框用于收集用户信息',
    types: ['text', 'email', 'password', 'search', 'number'],
    features: ['label', 'placeholder', 'error state', 'helper text', 'icons'],
    code: `<Input label="用户名" placeholder="请输入" />`,
    bestPractices: ['提供清晰的标签', '使用占位符提示格式', '显示错误提示'],
  },
  {
    name: 'Avatar',
    icon: 'avatar',
    description: '头像用于展示用户标识',
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
    variants: ['default', 'rounded', 'circular'],
    features: ['status indicator', 'fallback', 'group'],
    code: `<Avatar src="avatar.png" alt="用户" />`,
    bestPractices: ['提供默认头像', '保持头像比例', '考虑加载状态'],
  },
  {
    name: 'Modal',
    icon: 'modal',
    description: '模态框用于重要操作或信息展示',
    variants: ['default', 'fullscreen', 'centered'],
    features: ['backdrop', 'close button', 'esc to close'],
    code: `<Modal open={isOpen} onClose={close}>内容</Modal>`,
    bestPractices: ['保持内容聚焦', '提供明确的关闭方式', '避免内容过多'],
  },
]

const designPrinciples = [
  {
    name: '一致性',
    description: '整个系统中保持视觉和行为的一致性',
    icon: Layers,
    guidelines: ['使用统一的设计令牌', '保持组件样式一致', '遵循相同的交互模式'],
  },
  {
    name: '可访问性',
    description: '确保所有用户都能使用产品',
    icon: Eye,
    guidelines: ['确保足够的对比度', '支持键盘导航', '提供替代文本'],
  },
  {
    name: '性能',
    description: '保持快速响应和流畅体验',
    icon: Zap,
    guidelines: ['优化加载时间', '减少重绘重排', '使用GPU加速'],
  },
  {
    name: '可扩展性',
    description: '设计系统能够适应未来需求',
    icon: Target,
    guidelines: ['模块化设计', '灵活的配置', '清晰的API'],
  },
]

const responsiveBreakpoints = [
  { name: 'xs', value: '0px', label: 'Extra Small', devices: ['手机竖屏'] },
  { name: 'sm', value: '640px', label: 'Small', devices: ['手机横屏'] },
  { name: 'md', value: '768px', label: 'Medium', devices: ['平板竖屏'] },
  { name: 'lg', value: '1024px', label: 'Large', devices: ['平板横屏', '小屏笔记本'] },
  { name: 'xl', value: '1280px', label: 'Extra Large', devices: ['标准桌面'] },
  { name: '2xl', value: '1536px', label: '2XL', devices: ['大屏桌面'] },
]

const spacingScale = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]

function TokenColorCard({ name, token }) {
  return (
    <div className="bg-neutral-900/50 rounded-lg border border-white/5 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-medium"
          style={{ backgroundColor: token.value, color: token.contrast }}
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{token.name}</h4>
          <p className="text-xs text-neutral-500 font-mono">{token.value}</p>
        </div>
      </div>
      <p className="text-xs text-neutral-400">{token.usage}</p>
    </div>
  )
}

function TokenCard({ name, token, type }) {
  return (
    <div className="bg-neutral-900/50 rounded-lg border border-white/5 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-sm font-semibold text-white">{token.name}</h4>
          <p className="text-xs text-neutral-500 font-mono">{token.value}</p>
        </div>
        <Badge variant="outline" size="sm">{name}</Badge>
      </div>
      {token.usage && (
        <p className="text-xs text-neutral-400">{token.usage}</p>
      )}
    </div>
  )
}

function ComponentCard({ component, index }) {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const handleCopy = () => {
    navigator.clipboard.writeText(component.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{component.name}</h3>
            <p className="text-sm text-neutral-400">{component.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {component.variants && (
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">变体</p>
              <div className="flex flex-wrap gap-2">
                {component.variants.map((v) => (
                  <Badge key={v} variant="default" size="sm">{v}</Badge>
                ))}
              </div>
            </div>
          )}
          {component.sizes && (
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">尺寸</p>
              <div className="flex flex-wrap gap-2">
                {component.sizes.map((s) => (
                  <Badge key={s} variant="outline" size="sm">{s}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {component.features && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">特性</p>
            <div className="flex flex-wrap gap-2">
              {component.features.map((f) => (
                <Badge key={f} variant="default" size="sm">{f}</Badge>
              ))}
            </div>
          </div>
        )}

        {component.states && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">状态</p>
            <div className="flex flex-wrap gap-2">
              {component.states.map((s) => (
                <Badge key={s} variant="outline" size="sm">{s}</Badge>
              ))}
            </div>
          </div>
        )}

        {component.types && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">类型</p>
            <div className="flex flex-wrap gap-2">
              {component.types.map((t) => (
                <Badge key={t} variant="outline" size="sm">{t}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="bg-neutral-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <code className="text-xs text-violet-400 font-mono">代码示例</code>
            <button
              onClick={handleCopy}
              className={`p-1 rounded transition-colors ${copied ? 'text-emerald-400' : 'text-neutral-500 hover:text-white'}`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <code className="block text-sm text-neutral-300 font-mono">{component.code}</code>
        </div>

        {component.bestPractices && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">最佳实践</p>
            <ul className="space-y-1">
              {component.bestPractices.map((practice, i) => (
                <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-violet-400 mt-1.5" />
                  {practice}
                </li>
              ))}
            </ul>
          </div>
        )}
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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{principle.name}</h3>
          <p className="text-sm text-neutral-400 mb-3">{principle.description}</p>
          <ul className="space-y-1">
            {principle.guidelines.map((guideline, i) => (
              <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1" />
                {guideline}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function SpacingDemo() {
  return (
    <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">间距比例</h3>
      <div className="space-y-2">
        {spacingScale.map((space, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-xs text-neutral-500 w-12">{space}px</span>
            <div 
              className="flex-1 bg-gradient-to-r from-violet-500/50 to-cyan-500/50 rounded"
              style={{ height: '8px', width: `${space * 3}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function RadiusDemo() {
  const radii = [0, 4, 8, 12, 16, 24, 9999]

  return (
    <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">圆角对比</h3>
      <div className="flex items-center gap-4 flex-wrap">
        {radii.map((radius, index) => (
          <div key={index} className="text-center">
            <div 
              className="w-16 h-16 bg-gradient-to-br from-violet-500 to-cyan-500 mb-2"
              style={{ borderRadius: `${radius}px` }}
            />
            <p className="text-xs text-neutral-400">{radius === 9999 ? 'full' : `${radius}px`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShadowDemo() {
  const shadows = ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'glow']

  return (
    <div className="bg-neutral-900/50 rounded-xl border border-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">阴影效果</h3>
      <div className="grid grid-cols-4 gap-4">
        {shadows.map((shadow, index) => (
          <div key={index} className="text-center">
            <div 
              className={`w-20 h-12 bg-neutral-800 rounded-lg mx-auto mb-2 ${
                shadow === 'none' ? '' :
                shadow === 'sm' ? 'shadow-[0_1px_2px_rgba(0,0,0,0.05)]' :
                shadow === 'md' ? 'shadow-[0_4px_6px_rgba(0,0,0,0.1)]' :
                shadow === 'lg' ? 'shadow-[0_10px_15px_rgba(0,0,0,0.1)]' :
                shadow === 'xl' ? 'shadow-[0_20px_25px_rgba(0,0,0,0.15)]' :
                shadow === '2xl' ? 'shadow-[0_25px_50px_rgba(0,0,0,0.25)]' :
                'shadow-[0_0_20px_rgba(99,102,241,0.3)]'
              }`}
            />
            <p className="text-xs text-neutral-400">{shadow}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DesignSystemPage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeTab, setActiveTab] = useState('colors')

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
              <Layers className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-neutral-400">Design Tokens System</span>
            </div>

            <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
              设计<span className="text-gradient">令牌</span>系统
            </h1>

            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              完整的设计令牌系统，包含色彩、间距、字体、圆角、阴影、动画等所有设计规范。
              一键导出到 CSS、SCSS、JSON 等格式。
            </p>
          </motion.header>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              设计<span className="text-gradient">原则</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designPrinciples.map((principle, index) => (
                <PrincipleCard key={principle.name} principle={principle} index={index} />
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              设计<span className="text-gradient">令牌</span>
            </h2>

            <div className="w-full">
              <TabList className="flex flex-wrap gap-2 mb-8">
                <Tab active={activeTab === 'colors'} onClick={() => setActiveTab('colors')}>色彩</Tab>
                <Tab active={activeTab === 'spacing'} onClick={() => setActiveTab('spacing')}>间距</Tab>
                <Tab active={activeTab === 'typography'} onClick={() => setActiveTab('typography')}>字体</Tab>
                <Tab active={activeTab === 'radius'} onClick={() => setActiveTab('radius')}>圆角</Tab>
                <Tab active={activeTab === 'shadow'} onClick={() => setActiveTab('shadow')}>阴影</Tab>
                <Tab active={activeTab === 'animation'} onClick={() => setActiveTab('animation')}>动画</Tab>
                <Tab active={activeTab === 'zindex'} onClick={() => setActiveTab('zindex')}>层级</Tab>
              </TabList>

              <div className="min-h-[400px]">
                {activeTab === 'colors' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(designTokens.colors).map(([key, token]) => (
                      <TokenColorCard key={key} name={key} token={token} />
                    ))}
                  </div>
                )}

                {activeTab === 'spacing' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {Object.entries(designTokens.spacing).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>
                    <SpacingDemo />
                  </div>
                )}

                {activeTab === 'typography' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(designTokens.typography.fontFamily).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Object.entries(designTokens.typography.fontSize).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(designTokens.typography.lineHeight).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
                      {Object.entries(designTokens.typography.fontWeight).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'radius' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(designTokens.radius).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>
                    <RadiusDemo />
                  </div>
                )}

                {activeTab === 'shadow' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(designTokens.shadow).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>
                    <ShadowDemo />
                  </div>
                )}

                {activeTab === 'animation' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {Object.entries(designTokens.animation.duration).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {Object.entries(designTokens.animation.easing).map(([key, token]) => (
                        <TokenCard key={key} name={key} token={token} />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'zindex' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.entries(designTokens.zIndex).map(([key, token]) => (
                      <TokenCard key={key} name={key} token={token} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              响应式<span className="text-gradient">断点</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {responsiveBreakpoints.map((breakpoint, index) => (
                <motion.div
                  key={breakpoint.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-900/50 rounded-xl border border-white/5 p-4 text-center"
                >
                  <p className="text-lg font-bold text-white mb-1">{breakpoint.value}</p>
                  <p className="text-sm text-neutral-400 mb-2">{breakpoint.label}</p>
                  <p className="text-xs text-neutral-500">{breakpoint.devices.join(', ')}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">
              组件<span className="text-gradient">规范</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {componentGuidelines.map((component, index) => (
                <ComponentCard key={component.name} component={component} index={index} />
              ))}
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              导出<span className="text-gradient">格式</span>
            </h2>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">CSS 变量格式</h3>
                <Button variant="secondary" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  复制代码
                </Button>
              </div>
              <pre className="bg-neutral-900 rounded-lg p-4 text-sm text-neutral-300 font-mono overflow-x-auto max-h-96 overflow-y-auto">
{`:root {
  /* Colors */
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #3b82f6;
  --color-background: #09090b;
  --color-surface: #0c0c0e;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a1a1aa;
  --color-text-tertiary: #71717a;
  --color-border: rgba(255,255,255,0.06);

  /* Spacing */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;

  /* Typography */
  --font-sans: 'Inter', 'Noto Sans SC', sans-serif;
  --font-serif: 'Playfair Display', 'Noto Serif SC', serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  --font-size-5xl: 48px;
  --font-size-6xl: 60px;
  --font-size-7xl: 72px;

  /* Radius */
  --radius-none: 0px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
  --shadow-2xl: 0 25px 50px rgba(0,0,0,0.25);
  --shadow-glow: 0 0 20px rgba(99,102,241,0.3);

  /* Animation */
  --duration-faster: 75ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  
  --easing-ease-out: [0.16, 1, 0.3, 1];
  --easing-ease-in: [0.7, 0, 0.84, 0];
  --easing-ease-in-out: [0.65, 0, 0.35, 1];
  --easing-linear: [0, 0, 1, 1];
  --easing-bounce: [0.34, 1.56, 0.64, 1];

  /* Z-Index */
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-banner: 300;
  --z-overlay: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-toast: 700;
  --z-tooltip: 800;
}`}
              </pre>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
