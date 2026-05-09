import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useState } from 'react'
import { Badge, Card, Button } from '../components/ui'
import {
  Layers,
  Sparkles,
  TrendingUp,
  MousePointer,
  Grid3x3,
  Rocket,
  Palette,
  Type,
  Zap,
  Gauge,
  Code,
  BookOpen,
  Target,
  CheckCircle2,
  Clock,
  Users,
  PenTool,
  LayoutGrid,
  Database,
  Smartphone,
  Globe,
  Brain,
  Eye,
  Fingerprint,
  Atom,
  Cpu,
  Workflow,
  TestTube,
  Package,
  Puzzle,
  Shirt,
  Frame,
  Boxes,
  Wand2,
  Mic,
  Camera,
  Music,
  Vibrate,
  Touchpad,
  Move,
  Timer,
  Activity,
  Cloud,
  Server,
  Scan,
  Download,
  Upload,
  Lock,
  Unlock,
  Shield,
  Eye as EyeIcon,
  Users as UsersIcon,
  Contact,
  BadgeCheck,
  Award,
  Trophy,
  Crown,
  Gem,
  Orbit,
  Plane,
  Car,
  Accessibility,
  Building,
  TreePine,
  Flower2,
  Leaf,
  Mountain,
  Waves,
  Sun,
  Moon,
  Cloud as CloudIcon,
  Droplet,
  Flame,
  Snowflake,
  Wind,
  Bug,
  Feather,
  Fish,
  Bird,
  Ghost,
  Skull,
  Frown,
  Meh,
  Smile,
  Laugh,
  Angry,
  User,
  UserCheck,
  UserPlus,
  UserX,
  UserCircle,
  BadgeDollarSign,
  Medal,
  Rocket as RocketIcon,
  Accessibility as Accessibility2,
  PersonStanding,
  Fingerprint as FingerprintIcon,
  Hand,
  HandMetal,
  Handshake,
  ThumbsUp,
  ThumbsDown,
  Pencil,
  Highlighter,
  Eraser,
  Pen,
  PenTool as PenToolIcon,
  Ruler,
  Compass,
  Calculator,
  DollarSign,
  Euro,
  JapaneseYen,
  Bitcoin,
  Coins,
  Wallet,
  CreditCard,
  Banknote,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Store,
  Barcode,
  QrCode,
  ScanFace,
  Search,
  Filter,
  SlidersHorizontal,
  SortAsc,
  SortDesc,
  ArrowUpDown,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Minus,
  X,
  Check,
  CheckCheck,
  CircleCheck,
  CircleX,
  CircleAlert,
  Info,
  HelpCircle,
  FileSearch,
  FolderSearch,
  Inbox,
  Box,
  Archive,
  Trash,
  Trash2,
  Recycle,
  CloudUpload,
  CloudDownload,
  HardDrive,
  ServerCog,
  Table,
  LayoutGrid as LayoutGridIcon,
  LayoutTemplate,
  LayoutDashboard,
  LayoutList,
  SplitSquareHorizontal,
  SplitSquareVertical,
  Combine,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Settings2,
  Sliders,
  CheckSquare,
  Square,
  Star,
  Heart,
  Sparkle,
  Sunrise,
  Sunset,
} from 'lucide-react'

const roadmapMonths = [
  {
    month: 'Month 1-2',
    title: 'Foundation',
    description: '建立设计系统基础架构',
    progress: 40,
    items: [
      { name: '设计令牌系统', status: 'completed', description: '完成色彩、间距、字体等基础令牌' },
      { name: '核心组件库', status: 'completed', description: 'Button、Card、Input、Badge 等基础组件' },
      { name: '布局系统', status: 'completed', description: '网格系统、间距规范、响应式断点' },
      { name: '设计文档', status: 'in_progress', description: '组件使用规范、设计原则文档' },
    ],
    icon: Layers,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    month: 'Month 3-4',
    title: 'Visual Enhancement',
    description: '增强视觉表现力',
    progress: 0,
    items: [
      { name: '高级动效系统', status: 'pending', description: '微交互、过渡动画、手势反馈' },
      { name: '主题系统', status: 'pending', description: '深色/浅色主题、多品牌主题' },
      { name: '图标系统', status: 'pending', description: '图标规范、图标使用指南' },
      { name: '插画系统', status: 'pending', description: '品牌插画、装饰元素' },
    ],
    icon: Sparkles,
    color: 'from-violet-500 to-purple-500',
  },
  {
    month: 'Month 5-6',
    title: 'Data Visualization',
    description: '数据可视化体系',
    progress: 0,
    items: [
      { name: '图表设计原则', status: 'pending', description: '图表类型选择、色彩应用' },
      { name: '交互式图表', status: 'pending', description: '可交互的数据展示组件' },
      { name: '信息图组件', status: 'pending', description: '统计卡片、进度指示' },
      { name: '地图可视化', status: 'pending', description: '地理位置数据展示' },
    ],
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    month: 'Month 7-8',
    title: 'Advanced Patterns',
    description: '高级交互模式',
    progress: 0,
    items: [
      { name: '表单系统', status: 'pending', description: '复杂表单、验证规则' },
      { name: '导航模式', status: 'pending', description: '多级导航、面包屑' },
      { name: '反馈系统', status: 'pending', description: 'Toast、Modal、Alert' },
      { name: '空状态设计', status: 'pending', description: '空状态、加载状态、错误状态' },
    ],
    icon: MousePointer,
    color: 'from-amber-500 to-orange-500',
  },
  {
    month: 'Month 9-10',
    title: 'Specialized Components',
    description: '专业化组件',
    progress: 0,
    items: [
      { name: '表格组件', status: 'pending', description: '数据表格、虚拟滚动' },
      { name: '日历组件', status: 'pending', description: '日期选择、日程安排' },
      { name: '编辑器组件', status: 'pending', description: '富文本编辑器、代码编辑器' },
      { name: '拖拽系统', status: 'pending', description: '拖拽排序、拖放操作' },
    ],
    icon: Grid3x3,
    color: 'from-pink-500 to-rose-500',
  },
  {
    month: 'Month 11-12',
    title: 'Ecosystem',
    description: '生态体系建设',
    progress: 0,
    items: [
      { name: 'Figma 组件库', status: 'pending', description: '与代码同步的 Figma 设计' },
      { name: '文档站点', status: 'pending', description: '交互式文档、自动生成' },
      { name: 'CLI 工具', status: 'pending', description: '组件生成、主题生成' },
      { name: '质量检测', status: 'pending', description: '可访问性检测、设计审计' },
    ],
    icon: Rocket,
    color: 'from-red-500 to-pink-500',
  },
]

const advancedModules = [
  {
    id: 'typography-system',
    title: '高级字体系统',
    subtitle: 'Typography System',
    description: '精细化字体排版体系，包含字体层级、字号系统、行高规范、字重体系',
    complexity: 'advanced',
    phases: ['Month 1-2', 'Month 3-4'],
    icon: Type,
    color: 'from-violet-500 to-purple-500',
    features: [
      { name: '字体家族系统', status: 'completed', description: '中英文搭配、可变字体支持' },
      { name: '字号层级体系', status: 'completed', description: '12级字号规范、响应式缩放' },
      { name: '行高与段落', status: 'in_progress', description: '行高倍数、段落间距、换行规则' },
      { name: '字重变体系统', status: 'pending', description: '100-900字重、精细控制' },
      { name: '字体加载策略', status: 'pending', description: '字体子集、FOIT/FOUT控制' },
      { name: '可访问性字体', status: 'pending', description: '阅读障碍友好字体、 dyslexia font' },
    ],
  },
  {
    id: 'color-system',
    title: '科学色彩体系',
    subtitle: 'Scientific Color System',
    description: '基于色彩科学的配色系统，包含色轮理论、配色方案、可访问性对比度',
    complexity: 'advanced',
    phases: ['Month 1-2', 'Month 3-4', 'Month 5-6'],
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    features: [
      { name: '色彩理论基础', status: 'completed', description: 'HSL/OKLCH色彩空间、色轮图示' },
      { name: '主色系统', status: 'completed', description: '10级色阶，品牌色定义' },
      { name: '语义色系统', status: 'in_progress', description: '成功/警告/错误/信息色' },
      { name: '中性色系统', status: 'pending', description: '灰色阶、冷暖中性色' },
      { name: '对比度检测', status: 'pending', description: 'WCAG AA/AAA 自动检测' },
      { name: '配色生成器', status: 'pending', description: '单色/互补/分裂互补/三元/四角' },
    ],
  },
  {
    id: 'motion-system',
    title: '动效设计系统',
    subtitle: 'Motion Design System',
    description: '完整的动效设计体系，包含动画原则、缓动曲线、过渡模式、微交互库',
    complexity: 'expert',
    phases: ['Month 3-4', 'Month 5-6', 'Month 7-8'],
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    features: [
      { name: '动效设计原则', status: 'completed', description: '物理真实、意图明确、反馈及时' },
      { name: '缓动曲线库', status: 'in_progress', description: '50+预定义缓动曲线' },
      { name: '动画时长时间', status: 'pending', description: '快速/正常/慢速动画时序' },
      { name: '过渡动画模式', status: 'pending', description: '页面过渡、元素进出' },
      { name: '微交互库', status: 'pending', description: '200+微交互模式' },
      { name: '手势动画', status: 'pending', description: '触摸滑动、拖拽、长按' },
      { name: '可访问性运动', status: 'pending', description: 'prefers-reduced-motion 支持' },
    ],
  },
  {
    id: 'icon-system',
    title: '图标设计系统',
    subtitle: 'Icon Design System',
    description: '统一图标设计语言，包含图标网格、笔画系统、尺寸规范、状态变化',
    complexity: 'advanced',
    phases: ['Month 3-4', 'Month 5-6'],
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-500',
    features: [
      { name: '图标网格系统', status: 'completed', description: '24x24基础网格、像素对齐' },
      { name: '笔画规范', status: 'completed', description: '2px统一笔画、圆角半径' },
      { name: '图标尺寸层级', status: 'in_progress', description: 'xs/s/m/l/xl/2xl六档尺寸' },
      { name: '图标状态', status: 'pending', description: 'default/hover/active/disabled' },
      { name: '图标变体', status: 'pending', description: 'outline/filled/doube/dashed' },
      { name: '图标动效', status: 'pending', description: '图标过渡动画' },
    ],
  },
  {
    id: 'layout-system',
    title: '高级布局系统',
    subtitle: 'Advanced Layout System',
    description: '专业级布局解决方案，包含网格系统、容器规范、响应式策略',
    complexity: 'advanced',
    phases: ['Month 1-2', 'Month 3-4'],
    icon: LayoutGrid,
    color: 'from-emerald-500 to-teal-500',
    features: [
      { name: '网格系统', status: 'completed', description: '12列/8列/4列网格系统' },
      { name: '间距系统', status: 'completed', description: '4px基准间距、8点网格' },
      { name: '响应式断点', status: 'completed', description: 'sm/md/lg/xl/2xl断点' },
      { name: '容器系统', status: 'in_progress', description: '流式/固定/全宽容器' },
      { name: '安全区域', status: 'pending', description: 'iOS刘海屏、Android异形屏' },
      { name: '布局模式库', status: 'pending', description: '经典/现代/网格式布局' },
    ],
  },
  {
    id: 'theme-system',
    title: '主题定制系统',
    subtitle: 'Theme Customization System',
    description: '灵活的主题定制方案，支持多主题切换，品牌定制、用户偏好',
    complexity: 'expert',
    phases: ['Month 3-4', 'Month 5-6', 'Month 7-8'],
    icon: Palette,
    color: 'from-violet-500 to-indigo-500',
    features: [
      { name: '主题架构', status: 'completed', description: 'CSS变量、设计令牌映射' },
      { name: '主题预设', status: 'completed', description: '默认/暗黑/高对比主题' },
      { name: '多品牌主题', status: 'in_progress', description: '多租户品牌定制' },
      { name: '主题编辑器', status: 'pending', description: '可视化主题定制工具' },
      { name: '主题导出', status: 'pending', description: 'CSS/SCSS/JSON格式导出' },
      { name: '用户偏好保存', status: 'pending', description: 'localStorage/云端同步' },
    ],
  },
  {
    id: 'data-viz',
    title: '数据可视化体系',
    subtitle: 'Data Visualization System',
    description: '全面的数据可视化组件库，包含图表类型、设计规范、交互模式',
    complexity: 'expert',
    phases: ['Month 5-6', 'Month 7-8', 'Month 9-10'],
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-500',
    features: [
      { name: '图表类型库', status: 'completed', description: '30+图表类型完整覆盖' },
      { name: '色彩应用规范', status: 'in_progress', description: '序列/分类/多维度配色' },
      { name: '交互设计', status: 'pending', description: 'tooltip/zoom/pan/select' },
      { name: '动画过渡', status: 'pending', description: '数据更新过渡动画' },
      { name: '无障碍图表', status: 'pending', description: '屏幕阅读器支持、数据表替代' },
      { name: '实时数据', status: 'pending', description: 'WebSocket/轮询数据流' },
      { name: '地图可视化', status: 'pending', description: '中国地图/世界地图/热力图' },
    ],
  },
  {
    id: 'component-patterns',
    title: '高级组件模式',
    subtitle: 'Advanced Component Patterns',
    description: '复杂业务场景组件模式，包含表单、表格、导航、反馈等完整方案',
    complexity: 'expert',
    phases: ['Month 7-8', 'Month 9-10', 'Month 11-12'],
    icon: Layers,
    color: 'from-pink-500 to-rose-500',
    features: [
      { name: '表单系统', status: 'in_progress', description: '复杂表单、动态表单、表单生成器' },
      { name: '表格组件', status: 'pending', description: '虚拟滚动、单元格渲染、固定列' },
      { name: '树形组件', status: 'pending', description: '树形列表、虚拟化、拖拽' },
      { name: '选择器', status: 'pending', description: '单选/多选/级联选择' },
      { name: '日期时间', status: 'pending', description: '日期/时间/范围/快捷选择' },
      { name: '拖拽系统', status: 'pending', description: '拖拽排序、列表拖拽、网格拖拽' },
    ],
  },
  {
    id: 'animation-library',
    title: '动画库与交互模式',
    subtitle: 'Animation Library & Interaction Patterns',
    description: '丰富的动画效果和交互模式库，支持复杂场景的专业级动画方案',
    complexity: 'expert',
    phases: ['Month 5-6', 'Month 7-8'],
    icon: Wand2,
    color: 'from-violet-500 to-purple-500',
    features: [
      { name: '入场动画', status: 'completed', description: 'fade/slide/scale/bounce' },
      { name: '交互动画', status: 'completed', description: 'hover/click/swipe/tap' },
      { name: '滚动动画', status: 'in_progress', description: 'scroll-triggered/parallax' },
      { name: '加载动画', status: 'pending', description: 'skeleton/shimmer/progress' },
      { name: '成功反馈', status: 'pending', description: 'confetti/success/sparkle' },
      { name: '错误动画', status: 'pending', description: 'shake/wiggle/error shake' },
      { name: '数字动画', status: 'pending', description: 'countUp/tick/roll' },
    ],
  },
  {
    id: 'accessibility',
    title: '无障碍设计系统',
    subtitle: 'Accessibility Design System',
    description: '完整的无障碍设计解决方案，确保产品对所有用户的可用性',
    complexity: 'expert',
    phases: ['Month 3-4', 'Month 5-6', 'Month 7-8', 'Month 9-10'],
    icon: Accessibility,
    color: 'from-emerald-500 to-teal-500',
    features: [
      { name: 'ARIA规范', status: 'completed', description: 'ARIA roles/states/properties' },
      { name: '键盘导航', status: 'completed', description: '焦点管理、键盘快捷键' },
      { name: '屏幕阅读器', status: 'in_progress', description: '语义化标记、替代文本' },
      { name: '视觉无障碍', status: 'pending', description: '对比度、色盲友好、字体缩放' },
      { name: '运动无障碍', status: 'pending', description: 'prefers-reduced-motion' },
      { name: '认知无障碍', status: 'pending', description: '清晰度、简化、一致性' },
      { name: '无障碍测试', status: 'pending', description: '自动化检测、人工审核' },
    ],
  },
  {
    id: 'responsive-design',
    title: '响应式设计系统',
    subtitle: 'Responsive Design System',
    description: '跨设备响应式设计方案，覆盖桌面、平板、手机等多端适配',
    complexity: 'advanced',
    phases: ['Month 1-2', 'Month 3-4'],
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
    features: [
      { name: '断点系统', status: 'completed', description: 'sm/md/lg/xl/2xl断点' },
      { name: '流体排版', status: 'completed', description: 'clamp()字体大小、响应式间距' },
      { name: '容器查询', status: 'in_progress', description: 'CSS Container Queries' },
      { name: '移动端适配', status: 'pending', description: '手势、触摸、视口单位' },
      { name: '平板适配', status: 'pending', description: '平板横竖屏、键盘处理' },
      { name: '多设备测试', status: 'pending', description: '设备实验室、模拟器' },
    ],
  },
  {
    id: 'performance',
    title: '性能优化系统',
    subtitle: 'Performance Optimization System',
    description: 'UI性能优化方案，包含渲染优化、加载策略、动画性能',
    complexity: 'expert',
    phases: ['Month 5-6', 'Month 7-8', 'Month 9-10'],
    icon: Gauge,
    color: 'from-orange-500 to-amber-500',
    features: [
      { name: '代码分割', status: 'completed', description: '路由级/组件级分割' },
      { name: '图片优化', status: 'completed', description: 'WebP/AVIF/懒加载' },
      { name: 'CSS优化', status: 'in_progress', description: '关键CSS、样式隔离' },
      { name: '动画性能', status: 'pending', description: 'transform/opacity、will-change' },
      { name: '渲染优化', status: 'pending', description: '虚拟列表、窗口化' },
      { name: '缓存策略', status: 'pending', description: 'Service Worker、CDN' },
    ],
  },
]

const designPrinciples = [
  {
    title: '一致性',
    description: '整个系统中保持视觉和行为的一致性',
    icon: CheckCircle2,
    metrics: '95%',
    color: 'text-emerald-400',
  },
  {
    title: '可访问性',
    description: '确保所有用户都能使用，包括残障人士',
    icon: Target,
    metrics: 'WCAG 2.1 AA',
    color: 'text-blue-400',
  },
  {
    title: '性能',
    description: '保持 UI 响应迅速，动画流畅',
    icon: Gauge,
    metrics: '< 100ms',
    color: 'text-violet-400',
  },
  {
    title: '可扩展性',
    description: '设计系统能够适应未来的需求变化',
    icon: Rocket,
    metrics: '∞',
    color: 'text-amber-400',
  },
]

function ModuleCard({ module, index, isActive }) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = module.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative group cursor-pointer ${isActive ? 'ring-2 ring-violet-500' : ''}`}
    >
      <Card className="h-full p-6 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-300">
        <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl`} />

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <Badge variant="outline" className="text-xs border-violet-500/30 text-violet-400">
              {module.complexity}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-white mb-1">{module.title}</h3>
          <p className="text-sm text-neutral-500 mb-3">{module.subtitle}</p>
          <p className="text-sm text-neutral-400 mb-4 leading-relaxed">{module.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {module.phases.map((phase) => (
              <span key={phase} className="px-2 py-0.5 text-xs bg-white/5 text-neutral-400 rounded">
                {phase}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {module.features.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  feature.status === 'completed' ? 'bg-emerald-400' :
                  feature.status === 'in_progress' ? 'bg-amber-400' : 'bg-neutral-600'
                }`} />
                <span className="text-neutral-400">{feature.name}</span>
              </div>
            ))}
            {module.features.length > 4 && (
              <p className="text-xs text-neutral-500">+{module.features.length - 4} more</p>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function RoadmapCard({ phase, index, isActive }) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = phase.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative ${index % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%]'} mb-8`}
    >
      <div className={`absolute top-6 ${index % 2 === 0 ? 'lg:left-[calc(50%-12px)]' : 'lg:right-[calc(50%-12px)]'} hidden lg:block`}>
        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${phase.color} ring-4 ring-neutral-900`} />
      </div>

      <Card className={`lg:mr-8 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8 lg:order-2'}`}>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{phase.month}</h3>
              <p className="text-xs text-neutral-500">{phase.title}</p>
            </div>
          </div>

          <p className="text-sm text-neutral-400 mb-3">{phase.description}</p>

          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-500">Progress</span>
              <span className="text-white">{phase.progress}%</span>
            </div>
            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${phase.progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full bg-gradient-to-r ${phase.color} rounded-full`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            {phase.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                  item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                  item.status === 'in_progress' ? 'bg-amber-500/20 text-amber-400' : 'bg-neutral-800 text-neutral-500'
                }`}>
                  {item.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                  {item.status === 'in_progress' && <Clock className="w-3 h-3" />}
                  {item.status === 'pending' && <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />}
                </span>
                <span className={`text-xs ${item.status === 'completed' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function PrincipleCard({ principle, index }) {
  const prefersReducedMotion = useReducedMotion()
  const Icon = principle.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="p-5 bg-neutral-900/50 backdrop-blur-xl border border-white/5">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center`}>
            <Icon className={`w-5 h-5 ${principle.color}`} />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-white mb-1">{principle.title}</h4>
            <p className="text-xs text-neutral-500 mb-2">{principle.description}</p>
            <p className={`text-lg font-bold ${principle.color}`}>{principle.metrics}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function RoadmapPage() {
  const [selectedModule, setSelectedModule] = useState(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">长期迭代路线图</h1>
          </div>
          <p className="text-neutral-400 text-sm">
            12 个月视觉体系系统建设计划 - 慢工出细活，精雕细琢每个细节
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {designPrinciples.map((principle, index) => (
            <PrincipleCard key={principle.title} principle={principle} index={index} />
          ))}
        </div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">高级视觉系统模块</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedModules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                isActive={selectedModule === module.id}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">12 个月迭代计划</h2>

          <div className="relative">
            <div className="absolute left-3 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-cyan-500 to-emerald-500" />

            <div className="space-y-8">
              {roadmapMonths.map((phase, index) => (
                <RoadmapCard key={phase.month} phase={phase} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="p-6 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">设计哲学</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                  我们相信，真正的设计系统不是一蹴而就的。它需要时间的沉淀、不断的打磨、以及对细节的执着追求。
                  每一个组件、每一条规范、每一次迭代，都是为了让用户体验更加美好。
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-violet-500/30 text-violet-400">
                    慢工出细活
                  </Badge>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                    精雕细琢
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    长期主义
                  </Badge>
                  <Badge variant="outline" className="border-amber-500/30 text-amber-400">
                    追求卓越
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default RoadmapPage
