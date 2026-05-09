import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  Copy,
  Download,
  Check,
  Eye,
  Code,
  Palette,
  MousePointer,
  Layout,
  Box,
  Layers,
  Grid3x3,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Maximize2,
  Settings,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react'
import { Button, Badge, Card, Input, Select, Checkbox, Radio, Switch, Textarea, Avatar, ProgressBar } from '../components/ui'

const componentCategories = [
  { name: '基础组件', components: ['Button', 'Badge', 'Avatar', 'ProgressBar'] },
  { name: '表单组件', components: ['Input', 'Select', 'Checkbox', 'Radio', 'Switch', 'Textarea'] },
  { name: '布局组件', components: ['Card'] },
]

const previewThemes = [
  { id: 'light', name: '亮色主题', icon: Sun },
  { id: 'dark', name: '暗色主题', icon: Moon },
]

const previewDevices = [
  { id: 'desktop', name: '桌面端', icon: Monitor },
  { id: 'tablet', name: '平板', icon: Tablet },
  { id: 'mobile', name: '移动端', icon: Smartphone },
]

const stats = [
  { label: '组件总数', value: '24', icon: Box },
  { label: '分类', value: '6', icon: Layers },
  { label: '变体', value: '48', icon: Grid3x3 },
  { label: '尺寸', value: '4', icon: Layout },
]

export default function ComponentPreviewPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('基础组件')
  const [selectedComponent, setSelectedComponent] = useState('Button')
  const [previewTheme, setPreviewTheme] = useState('dark')
  const [previewDevice, setPreviewDevice] = useState('desktop')
  const [isLivePreview, setIsLivePreview] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState(['基础组件', '表单组件', '布局组件'])

  const toggleCategory = (category) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const getDeviceWidth = () => {
    switch (previewDevice) {
      case 'mobile': return '375px'
      case 'tablet': return '768px'
      default: return '100%'
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">组件预览器</h1>
              <p className="text-sm text-neutral-500 mt-1">预览和测试所有UI组件</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLivePreview(!isLivePreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isLivePreview 
                    ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400' 
                    : 'bg-neutral-800 border border-white/10 text-neutral-400'
                }`}
              >
                {isLivePreview ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                实时预览
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Download className="w-4 h-4" />
                导出代码
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="搜索组件..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-800/50 border border-white/10 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>

                <div className="space-y-1">
                  {componentCategories.map((category) => (
                    <div key={category.name}>
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex items-center justify-between p-2 text-sm font-medium text-white hover:bg-neutral-800/50 rounded-lg transition-colors"
                      >
                        <span>{category.name}</span>
                        {expandedCategories.includes(category.name) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      {expandedCategories.includes(category.name) && (
                        <div className="ml-2 mt-1 space-y-0.5">
                          {category.components.map((component) => (
                            <button
                              key={component}
                              onClick={() => setSelectedComponent(component)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                selectedComponent === component
                                  ? 'bg-violet-500/20 text-violet-400'
                                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
                              }`}
                            >
                              {component}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-white">{selectedComponent}</h3>
                    <Badge variant="primary" size="sm">组件</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                      <Code className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {previewThemes.map((theme) => {
                      const ThemeIcon = theme.icon
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setPreviewTheme(theme.id)}
                          className={`p-2 rounded-lg transition-all ${
                            previewTheme === theme.id 
                              ? 'bg-violet-500/20 text-violet-400' 
                              : 'text-neutral-500 hover:bg-neutral-800'
                          }`}
                          title={theme.name}
                        >
                          <ThemeIcon className="w-4 h-4" />
                        </button>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    {previewDevices.map((device) => {
                      const DeviceIcon = device.icon
                      return (
                        <button
                          key={device.id}
                          onClick={() => setPreviewDevice(device.id)}
                          className={`p-2 rounded-lg transition-all ${
                            previewDevice === device.id 
                              ? 'bg-violet-500/20 text-violet-400' 
                              : 'text-neutral-500 hover:bg-neutral-800'
                          }`}
                          title={device.name}
                        >
                          <DeviceIcon className="w-4 h-4" />
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div 
                  className={`p-8 transition-all duration-300 ${
                    previewTheme === 'dark' ? 'bg-neutral-900' : 'bg-white'
                  }`}
                  style={{ minHeight: '400px' }}
                >
                  <div 
                    className="mx-auto transition-all duration-300"
                    style={{ maxWidth: getDeviceWidth() }}
                  >
                    <div className="space-y-6">
                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          尺寸变体
                        </h4>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button size="xs" variant={previewTheme === 'dark' ? 'default' : 'secondary'}>超小按钮</Button>
                          <Button size="sm" variant={previewTheme === 'dark' ? 'default' : 'secondary'}>小按钮</Button>
                          <Button size="md" variant={previewTheme === 'dark' ? 'default' : 'secondary'}>默认按钮</Button>
                          <Button size="lg" variant={previewTheme === 'dark' ? 'default' : 'secondary'}>大按钮</Button>
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          样式变体
                        </h4>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button variant="default">默认</Button>
                          <Button variant="primary">主要</Button>
                          <Button variant="secondary">次要</Button>
                          <Button variant="outline">描边</Button>
                          <Button variant="ghost">幽灵</Button>
                          <Button variant="destructive">危险</Button>
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          状态
                        </h4>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button>正常</Button>
                          <Button disabled>禁用</Button>
                          <Button isLoading>加载中</Button>
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          带图标
                        </h4>
                        <div className="flex flex-wrap items-center gap-3">
                          <Button leftIcon={<Box className="w-4 h-4" />}>左侧图标</Button>
                          <Button rightIcon={<Box className="w-4 h-4" />}>右侧图标</Button>
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Badge 徽章
                        </h4>
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge variant="default">默认</Badge>
                          <Badge variant="primary">主要</Badge>
                          <Badge variant="secondary">次要</Badge>
                          <Badge variant="success">成功</Badge>
                          <Badge variant="warning">警告</Badge>
                          <Badge variant="destructive">危险</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Avatar 头像
                        </h4>
                        <div className="flex items-center gap-3">
                          <Avatar size="xs" fallback="张" />
                          <Avatar size="sm" fallback="李" />
                          <Avatar size="md" fallback="王" />
                          <Avatar size="lg" fallback="刘" />
                          <Avatar size="xl" fallback="陈" />
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Progress 进度条
                        </h4>
                        <div className="space-y-3 max-w-md">
                          <ProgressBar value={25} />
                          <ProgressBar value={50} variant="primary" />
                          <ProgressBar value={75} variant="success" />
                          <ProgressBar value={100} variant="warning" />
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Card 卡片
                        </h4>
                        <Card className="max-w-sm">
                          <Card.Header>
                            <Card.Title>卡片标题</Card.Title>
                            <Card.Description>这是一段描述文本</Card.Description>
                          </Card.Header>
                          <Card.Body>
                            <p className={`text-sm ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                              卡片内容区域，可以包含任意内容。
                            </p>
                          </Card.Body>
                          <Card.Footer>
                            <Button size="sm" variant="secondary">取消</Button>
                            <Button size="sm">确认</Button>
                          </Card.Footer>
                        </Card>
                      </div>

                      <div>
                        <h4 className={`text-sm font-medium mb-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Tabs 标签页
                        </h4>
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit">
                          <button className="px-5 py-2 rounded-lg text-sm font-medium bg-white/10 text-white shadow-sm">
                            标签一
                          </button>
                          <button className="px-5 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-300">
                            标签二
                          </button>
                          <button className="px-5 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:text-neutral-300">
                            标签三
                          </button>
                        </div>
                        <p className={`text-sm mt-3 ${previewTheme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          这是标签页一的内容
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-4">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">组件信息</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-neutral-500">名称</label>
                    <div className="text-sm text-white">{selectedComponent}</div>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500">分类</label>
                    <div className="text-sm text-white">{selectedCategory}</div>
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500">变体数</label>
                    <div className="text-sm text-white">{selectedComponent === 'Button' ? '8' : '4'}</div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">属性</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">size</span>
                    <select className="px-2 py-1 bg-neutral-800 border border-white/10 rounded text-sm text-white">
                      <option>sm</option>
                      <option>md</option>
                      <option>lg</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">variant</span>
                    <select className="px-2 py-1 bg-neutral-800 border border-white/10 rounded text-sm text-white">
                      <option>default</option>
                      <option>primary</option>
                      <option>secondary</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">disabled</span>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">loading</span>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">代码片段</h3>
                <pre className="p-3 bg-neutral-950 rounded-lg text-xs text-neutral-300 overflow-x-auto">
                  {`<Button
  size="md"
  variant="primary"
>
  按钮文本
</Button>`}
                </pre>
                <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors text-sm">
                  <Copy className="w-4 h-4" />
                  复制代码
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
