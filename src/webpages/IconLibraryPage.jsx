import { useState } from 'react'
import { copyToClipboard } from '../utils/colorUtils'
import { motion } from 'framer-motion'
import { 
  Search,
  Copy,
  Download,
  Check,
  Grid3x3,
  List,
  Filter,
  Tag,
  Heart,
  Star,
  Clock,
  Eye,
  Sparkles,
  Folder,
  File,
  Image,
  Video,
  Music,
  Code,
  Type,
  Mail,
  Phone,
  User,
  Users,
  Home,
  Settings,
  Bell,
  Calendar,
  Clock as ClockIcon,
  MapPin,
  Globe,
  Link,
  Lock,
  Shield,
  Eye as EyeIcon,
  EyeOff,
  Trash2,
  Edit,
  Plus,
  Minus,
  X,
  Check as CheckIcon,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Search as SearchIcon,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  ExternalLink,
  Upload,
  Download as DownloadIcon,
  Share2,
  Copy as CopyIcon,
  Bookmark,
  BookmarkIcon,
  Tag as TagIcon,
  CreditCard,
  ShoppingCart,
  DollarSign,
  Percent,
  Gift,
  Award,
  Trophy,
  Target,
  Zap,
  Flashlight,
  Battery,
  Wifi,
  Bluetooth,
  Signal,
  Cloud,
  CloudOff,
  Database,
  Server,
  HardDrive,
  Cpu,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  Speaker,
  Volume,
  Volume2,
  Mic,
  Camera,
  Video as VideoIcon,
  Image as ImageIcon,
  FileText,
  Folder as FolderIcon,
  FolderOpen,
  Archive,
  Package,
  Box,
  Truck,
  Anchor,
  Plane,
  Car,
  Bike,
  Compass,
  Map,
  Navigation,
  Send,
  MessageSquare,
  MessageCircle,
  Phone as PhoneIcon,
  Voicemail,
  AtSign,
  Hash,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List as ListIcon,
  ListOrdered,
  Quote,
  Code as CodeIcon,
  Terminal,
  Braces,
  Parentheses,
  SearchCode,
  Bug,
  Terminal as TerminalIcon,
  Palette,
  Paintbrush,
  Eraser,
  Pen,
  Pencil,
  Highlighter,
  Crop,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Layers,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Sunrise,
  Sunset,
  Thermometer,
  Droplet,
  Wind,
  Flame,
  Zap as ZapIcon,
  Activity,
  Heart as HeartIcon,
  UserCheck,
  UserPlus,
  UserMinus,
  UserX,
  Users as UsersIcon,
  Contact,
  IdCard,
  BadgeCheck,
  Award as AwardIcon,
  Crown,
  Gem,
  Shirt,
  ShoppingBag,
  Store,
  Building,
  Building2,
  Factory,
  Warehouse,
  Landmark,
  Coins,
  Receipt,
  Calculator,
  PieChart,
  BarChart,
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  ScatterChart,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  GitFork,
  Workflow,
  Blocks,
  Puzzle,
  AppWindow,
  Layout,
  LayoutGrid,
  Sidebar,
  SidebarIcon,
  PanelLeft,
  PanelRight,
  FootprintsIcon,
  Footprints,
  MousePointer
} from 'lucide-react'

const iconCategories = [
  { name: '全部', count: 280, icon: Grid3x3 },
  { name: '界面', count: 45, icon: Layout },
  { name: '操作', count: 38, icon: MousePointer },
  { name: '通讯', count: 32, icon: MessageSquare },
  { name: '文件', count: 28, icon: FileText },
  { name: '设备', count: 25, icon: Smartphone },
  { name: '图表', count: 22, icon: BarChart3 },
  { name: '品牌', count: 20, icon: Star },
]

const popularIcons = [
  { name: 'Home', icon: Home },
  { name: 'User', icon: User },
  { name: 'Settings', icon: Settings },
  { name: 'Search', icon: SearchIcon },
  { name: 'Bell', icon: Bell },
  { name: 'Heart', icon: HeartIcon },
  { name: 'Star', icon: Star },
  { name: 'Mail', icon: Mail },
  { name: 'Calendar', icon: Calendar },
  { name: 'MapPin', icon: MapPin },
  { name: 'Globe', icon: Globe },
  { name: 'Link', icon: Link },
  { name: 'Lock', icon: Lock },
  { name: 'Eye', icon: EyeIcon },
  { name: 'Trash', icon: Trash2 },
  { name: 'Edit', icon: Edit },
  { name: 'Plus', icon: Plus },
  { name: 'Check', icon: CheckIcon },
  { name: 'X', icon: X },
  { name: 'Alert', icon: AlertCircle },
]

const allIcons = [
  { name: 'Home', component: Home, category: '界面' },
  { name: 'User', component: User, category: '界面' },
  { name: 'Users', component: UsersIcon, category: '界面' },
  { name: 'Settings', component: Settings, category: '界面' },
  { name: 'Grid', component: LayoutGrid, category: '界面' },
  { name: 'Sidebar', component: PanelLeft, category: '界面' },
  { name: 'Menu', component: ListIcon, category: '操作' },
  { name: 'Plus', component: Plus, category: '操作' },
  { name: 'Minus', component: Minus, category: '操作' },
  { name: 'X', component: X, category: '操作' },
  { name: 'Check', component: CheckIcon, category: '操作' },
  { name: 'Edit', component: Edit, category: '操作' },
  { name: 'Trash', component: Trash2, category: '操作' },
  { name: 'Copy', component: CopyIcon, category: '操作' },
  { name: 'Download', component: DownloadIcon, category: '操作' },
  { name: 'Upload', component: Upload, category: '操作' },
  { name: 'Search', component: SearchIcon, category: '通讯' },
  { name: 'Bell', component: Bell, category: '通讯' },
  { name: 'Mail', component: Mail, category: '通讯' },
  { name: 'Phone', component: PhoneIcon, category: '通讯' },
  { name: 'Message', component: MessageSquare, category: '通讯' },
  { name: 'AtSign', component: AtSign, category: '通讯' },
  { name: 'Hash', component: Hash, category: '通讯' },
  { name: 'File', component: FileText, category: '文件' },
  { name: 'Folder', component: FolderIcon, category: '文件' },
  { name: 'Image', component: ImageIcon, category: '文件' },
  { name: 'Video', component: VideoIcon, category: '文件' },
  { name: 'Music', component: Music, category: '文件' },
  { name: 'Code', component: CodeIcon, category: '文件' },
  { name: 'Terminal', component: TerminalIcon, category: '文件' },
  { name: 'Monitor', component: Monitor, category: '设备' },
  { name: 'Smartphone', component: Smartphone, category: '设备' },
  { name: 'Tablet', component: Tablet, category: '设备' },
  { name: 'Laptop', component: Laptop, category: '设备' },
  { name: 'Tv', component: Tv, category: '设备' },
  { name: 'Camera', component: Camera, category: '设备' },
  { name: 'Cpu', component: Cpu, category: '设备' },
  { name: 'Database', component: Database, category: '设备' },
  { name: 'Server', component: Server, category: '设备' },
  { name: 'BarChart', component: BarChart3, category: '图表' },
  { name: 'PieChart', component: PieChart, category: '图表' },
  { name: 'LineChart', component: LineChart, category: '图表' },
  { name: 'TrendingUp', component: TrendingUp, category: '图表' },
  { name: 'TrendingDown', component: TrendingDown, category: '图表' },
  { name: 'Activity', component: Activity, category: '图表' },
  { name: 'Star', component: Star, category: '品牌' },
  { name: 'Heart', component: HeartIcon, category: '品牌' },
  { name: 'Award', component: AwardIcon, category: '品牌' },
  { name: 'Trophy', component: Trophy, category: '品牌' },
  { name: 'Target', component: Target, category: '品牌' },
  { name: 'Zap', component: ZapIcon, category: '品牌' },
  { name: 'Sun', component: Sun, category: '其他' },
  { name: 'Moon', component: Moon, category: '其他' },
  { name: 'Globe', component: Globe, category: '其他' },
  { name: 'Map', component: Map, category: '其他' },
  { name: 'Calendar', component: Calendar, category: '其他' },
  { name: 'Clock', component: ClockIcon, category: '其他' },
  { name: 'Lock', component: Lock, category: '其他' },
  { name: 'Shield', component: Shield, category: '其他' },
  { name: 'Eye', component: EyeIcon, category: '其他' },
  { name: 'EyeOff', component: EyeOff, category: '其他' },
]

const stats = [
  { label: '图标总数', value: '280', icon: Grid3x3 },
  { label: '分类数', value: '8', icon: Folder },
  { label: '最近使用', value: '12', icon: Clock },
  { label: '收藏', value: '24', icon: Heart },
]

export default function IconLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [viewMode, setViewMode] = useState('grid')
  const [copiedIcon, setCopiedIcon] = useState(null)
  const [favorites, setFavorites] = useState(['Home', 'Settings', 'Search', 'Bell'])

  const filteredIcons = allIcons.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || icon.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCopyIcon = (iconName) => {
    const code = `import { ${iconName} } from 'lucide-react'`
    copyToClipboard(code)
    setCopiedIcon(iconName)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

  const toggleFavorite = (iconName) => {
    setFavorites(prev => 
      prev.includes(iconName) 
        ? prev.filter(n => n !== iconName)
        : [...prev, iconName]
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">图标库</h1>
              <p className="text-sm text-neutral-500 mt-1">浏览和搜索 Lucide 图标</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-neutral-800 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-violet-500 text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  <ListIcon className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <DownloadIcon className="w-4 h-4" />
                导出全部
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
                <stat.icon className="w-5 h-5 text-violet-400 mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">分类</h3>
                <div className="space-y-1">
                  {iconCategories.map((category) => {
                    const CategoryIcon = category.icon
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                          selectedCategory === category.name 
                            ? 'bg-violet-500/20 text-violet-400' 
                            : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="w-4 h-4" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <span className="text-xs text-neutral-500">{category.count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4 mt-4">
                <h3 className="text-sm font-medium text-white mb-4">常用图标</h3>
                <div className="flex flex-wrap gap-2">
                  {popularIcons.slice(0, 8).map((icon) => {
                    const Icon = icon.icon
                    return (
                      <button
                        key={icon.name}
                        onClick={() => handleCopyIcon(icon.name)}
                        className="p-2 bg-neutral-800/50 rounded-lg hover:bg-neutral-800 transition-colors"
                        title={icon.name}
                      >
                        <Icon className="w-5 h-5 text-neutral-400" />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4 mb-4">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="搜索图标..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <span className="text-sm text-neutral-400">找到 {filteredIcons.length} 个图标</span>
                  <select className="px-3 py-1.5 bg-neutral-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none">
                    <option>按名称排序</option>
                    <option>按分类排序</option>
                    <option>最近添加</option>
                  </select>
                </div>

                {viewMode === 'grid' ? (
                  <div className="p-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {filteredIcons.map((icon, index) => {
                      const IconComponent = icon.component
                      const isCopied = copiedIcon === icon.name
                      const isFavorite = favorites.includes(icon.name)
                      return (
                        <motion.div
                          key={icon.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.01 }}
                          className="group relative"
                        >
                          <button
                            onClick={() => handleCopyIcon(icon.name)}
                            className="w-full aspect-square p-4 bg-neutral-800/50 rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center"
                          >
                            <IconComponent className="w-6 h-6 text-neutral-400 group-hover:text-white transition-colors" />
                          </button>
                          <button
                            onClick={() => toggleFavorite(icon.name)}
                            className="absolute top-1 right-1 p-1 bg-neutral-900/80 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <HeartIcon className={`w-3 h-3 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`} />
                          </button>
                          {isCopied && (
                            <div className="absolute inset-0 bg-violet-500/20 rounded-xl flex items-center justify-center">
                              <CheckIcon className="w-6 h-6 text-violet-400" />
                            </div>
                          )}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 border border-white/10 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-10">
                            {icon.name}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="p-2">
                    {filteredIcons.map((icon, index) => {
                      const IconComponent = icon.component
                      const isCopied = copiedIcon === icon.name
                      const isFavorite = favorites.includes(icon.name)
                      return (
                        <motion.div
                          key={icon.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.01 }}
                          className="flex items-center justify-between p-3 hover:bg-neutral-800/50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 p-2 bg-neutral-800/50 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-neutral-400" />
                            </div>
                            <div>
                              <div className="text-sm text-white font-medium">{icon.name}</div>
                              <div className="text-xs text-neutral-500">{icon.category}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => toggleFavorite(icon.name)}
                              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                              <HeartIcon className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`} />
                            </button>
                            <button
                              onClick={() => handleCopyIcon(icon.name)}
                              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                              {isCopied ? (
                                <CheckIcon className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <CopyIcon className="w-4 h-4 text-neutral-400" />
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
