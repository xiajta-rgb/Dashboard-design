import { useState } from 'react'
import { copyToClipboard } from '../utils/colorUtils'
import { motion } from 'framer-motion'
import { 
  Palette,
  Copy,
  Download,
  Check,
  RefreshCw,
  Eye,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Save,
  Share2,
  Layers,
  Type,
  Droplet,
  Box,
  Layout,
  MousePointer,
  Zap,
  Hexagon,
  Circle,
  Square,
  Triangle
} from 'lucide-react'

const presetThemes = [
  {
    id: 'violet-dark',
    name: '紫罗兰暗色',
    preview: { bg: '#09090b', accent: '#8b5cf6', text: '#ffffff' },
    colors: { primary: '#8b5cf6', secondary: '#a78bfa', accent: '#06b6d4', background: '#09090b', surface: '#18181b', text: '#ffffff', muted: '#71717a' }
  },
  {
    id: 'emerald-light',
    name: '翡翠亮色',
    preview: { bg: '#ffffff', accent: '#10b981', text: '#1f2937' },
    colors: { primary: '#10b981', secondary: '#34d399', accent: '#6366f1', background: '#ffffff', surface: '#f9fafb', text: '#1f2937', muted: '#6b7280' }
  },
  {
    id: 'amber-warm',
    name: '琥珀暖色',
    preview: { bg: '#1c1917', accent: '#f59e0b', text: '#fef3c7' },
    colors: { primary: '#f59e0b', secondary: '#fbbf24', accent: '#ef4444', background: '#1c1917', surface: '#292524', text: '#fef3c7', muted: '#a8a29e' }
  },
  {
    id: 'rose-modern',
    name: '玫瑰现代',
    preview: { bg: '#0f172a', accent: '#ec4899', text: '#fdf2f8' },
    colors: { primary: '#ec4899', secondary: '#f472b6', accent: '#8b5cf6', background: '#0f172a', surface: '#1e293b', text: '#fdf2f8', muted: '#94a3b8' }
  },
  {
    id: 'blue-corporate',
    name: '蓝色企业',
    preview: { bg: '#f8fafc', accent: '#3b82f6', text: '#0f172a' },
    colors: { primary: '#3b82f6', secondary: '#60a5fa', accent: '#10b981', background: '#f8fafc', surface: '#ffffff', text: '#0f172a', muted: '#64748b' }
  },
  {
    id: 'cyan-tech',
    name: '青色科技',
    preview: { bg: '#030712', accent: '#06b6d4', text: '#ecfeff' },
    colors: { primary: '#06b6d4', secondary: '#22d3ee', accent: '#8b5cf6', background: '#030712', surface: '#0f172a', text: '#ecfeff', muted: '#64748b' }
  },
]

const colorPalettes = {
  'primary': [
    { name: '紫罗兰', value: '#8b5cf6' },
    { name: '蓝色', value: '#3b82f6' },
    { name: '青色', value: '#06b6d4' },
    { name: '翡翠', value: '#10b981' },
    { name: '琥珀', value: '#f59e0b' },
    { name: '玫瑰', value: '#ec4899' },
    { name: '红色', value: '#ef4444' },
    { name: '靛蓝', value: '#6366f1' },
  ],
  'neutral': [
    { name: '灰色 50', value: '#f9fafb' },
    { name: '灰色 100', value: '#f3f4f6' },
    { name: '灰色 200', value: '#e5e7eb' },
    { name: '灰色 300', value: '#d1d5db' },
    { name: '灰色 400', value: '#9ca3af' },
    { name: '灰色 500', value: '#6b7280' },
    { name: '灰色 600', value: '#4b5563' },
    { name: '灰色 700', value: '#374151' },
    { name: '灰色 800', value: '#1f2937' },
    { name: '灰色 900', value: '#111827' },
    { name: '灰色 950', value: '#030712' },
  ],
  'accent': [
    { name: '橙色', value: '#f97316' },
    { name: '黄色', value: '#eab308' },
    { name: '绿色', value: '#22c55e' },
    { name: '紫色', value: '#a855f7' },
    { name: '粉色', value: '#d946ef' },
    { name: '天蓝', value: '#0ea5e9' },
  ],
}

const fontOptions = [
  { label: 'Inter', value: 'Inter, system-ui, sans-serif', category: 'modern' },
  { label: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans, system-ui, sans-serif', category: 'modern' },
  { label: 'Noto Sans SC', value: 'Noto Sans SC, system-ui, sans-serif', category: 'chinese' },
  { label: 'JetBrains Mono', value: 'JetBrains Mono, monospace', category: 'monospace' },
  { label: 'Playfair Display', value: 'Playfair Display, serif', category: 'serif' },
]

const borderRadiusOptions = [
  { label: '无', value: '0px' },
  { label: '小', value: '4px' },
  { label: '中', value: '8px' },
  { label: '大', value: '12px' },
  { label: '特大', value: '16px' },
  { label: '全圆', value: '9999px' },
]

const stats = [
  { label: '预设主题', value: '6', icon: Layers },
  { label: '自定义颜色', value: '24', icon: Droplet },
  { label: '字体选项', value: '5', icon: Type },
  { label: '圆角风格', value: '6', icon: Circle },
]

export default function ThemeEditorPage() {
  const [selectedTheme, setSelectedTheme] = useState(presetThemes[0])
  const [customColors, setCustomColors] = useState(selectedTheme.colors)
  const [copied, setCopied] = useState(false)
  const [previewMode, setPreviewMode] = useState('desktop')
  const [activeTab, setActiveTab] = useState('colors')

  const handleColorChange = (key, value) => {
    setCustomColors(prev => ({ ...prev, [key]: value }))
  }

  const handlePresetSelect = (theme) => {
    setSelectedTheme(theme)
    setCustomColors(theme.colors)
  }

  const handleReset = () => {
    setCustomColors(selectedTheme.colors)
  }

  const handleCopyCode = () => {
    const cssCode = `
:root {
  --color-primary: ${customColors.primary};
  --color-secondary: ${customColors.secondary};
  --color-accent: ${customColors.accent};
  --color-background: ${customColors.background};
  --color-surface: ${customColors.surface};
  --color-text: ${customColors.text};
  --color-muted: ${customColors.muted};
}
    `.trim()
    copyToClipboard(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateCSS = () => {
    return `:root {
  /* Primary Colors */
  --color-primary: ${customColors.primary};
  --color-primary-light: ${customColors.secondary};
  --color-accent: ${customColors.accent};
  
  /* Background Colors */
  --color-background: ${customColors.background};
  --color-surface: ${customColors.surface};
  
  /* Text Colors */
  --color-text: ${customColors.text};
  --color-muted: ${customColors.muted};
  
  /* Component Styles */
  --border-radius: 12px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}`
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">主题编辑器</h1>
              <p className="text-sm text-neutral-500 mt-1">创建和定制您的专属设计主题</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors">
                <Share2 className="w-4 h-4" />
                分享
              </button>
              <button onClick={handleCopyCode} className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? '已复制' : '复制代码'}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('colors')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === 'colors' ? 'text-white bg-neutral-800/50' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    颜色
                  </button>
                  <button
                    onClick={() => setActiveTab('typography')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === 'typography' ? 'text-white bg-neutral-800/50' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    字体
                  </button>
                  <button
                    onClick={() => setActiveTab('spacing')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === 'spacing' ? 'text-white bg-neutral-800/50' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    间距
                  </button>
                  <button
                    onClick={() => setActiveTab('effects')}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                      activeTab === 'effects' ? 'text-white bg-neutral-800/50' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    效果
                  </button>
                </div>

                <div className="p-6">
                  {activeTab === 'colors' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">主色调</label>
                        <div className="flex gap-4">
                          {colorPalettes.primary.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => handleColorChange('primary', color.value)}
                              className={`w-12 h-12 rounded-xl transition-all ${
                                customColors.primary === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110' : 'hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-3">中性色</label>
                        <div className="flex flex-wrap gap-2">
                          {colorPalettes.neutral.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => handleColorChange('muted', color.value)}
                              className={`w-10 h-10 rounded-lg transition-all ${
                                customColors.muted === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110' : 'hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-3">强调色</label>
                        <div className="flex gap-4">
                          {colorPalettes.accent.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => handleColorChange('accent', color.value)}
                              className={`w-12 h-12 rounded-xl transition-all ${
                                customColors.accent === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900 scale-110' : 'hover:scale-105'
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">背景色</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={customColors.background}
                              onChange={(e) => handleColorChange('background', e.target.value)}
                              className="w-12 h-12 rounded-lg cursor-pointer border-0"
                            />
                            <input
                              type="text"
                              value={customColors.background}
                              onChange={(e) => handleColorChange('background', e.target.value)}
                              className="flex-1 px-3 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">文字色</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={customColors.text}
                              onChange={(e) => handleColorChange('text', e.target.value)}
                              className="w-12 h-12 rounded-lg cursor-pointer border-0"
                            />
                            <input
                              type="text"
                              value={customColors.text}
                              onChange={(e) => handleColorChange('text', e.target.value)}
                              className="flex-1 px-3 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'typography' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">字体系列</label>
                        <div className="space-y-2">
                          {fontOptions.map((font) => (
                            <button
                              key={font.value}
                              onClick={() => {}}
                              className="w-full p-4 bg-neutral-800/50 border border-white/10 rounded-xl text-left hover:bg-neutral-800 transition-colors"
                              style={{ fontFamily: font.value }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-white">{font.label}</span>
                                <span className="text-xs text-neutral-500">{font.category}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'spacing' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">圆角半径</label>
                        <div className="flex gap-3">
                          {borderRadiusOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {}}
                              className="flex-1 p-4 bg-neutral-800/50 border border-white/10 rounded-xl text-center hover:bg-neutral-800 transition-colors"
                            >
                              <div className="w-10 h-10 mx-auto mb-2 bg-neutral-700" style={{ borderRadius: option.value }} />
                              <span className="text-sm text-neutral-400">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'effects' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">阴影预设</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['sm', 'md', 'lg', 'xl', '2xl', 'inner'].map((shadow) => (
                            <button
                              key={shadow}
                              onClick={() => {}}
                              className="p-4 bg-neutral-800/50 border border-white/10 rounded-xl text-center hover:bg-neutral-800 transition-colors"
                            >
                              <div className={`w-10 h-10 mx-auto mb-2 bg-neutral-700 rounded-lg shadow-${shadow}`} />
                              <span className="text-sm text-neutral-400">Shadow {shadow}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-medium text-white mb-4">CSS 代码预览</h3>
                <pre className="p-4 bg-neutral-950 rounded-xl overflow-x-auto text-sm text-neutral-300">
                  <code>{generateCSS()}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">预设主题</h3>
                <div className="space-y-2">
                  {presetThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handlePresetSelect(theme)}
                      className={`w-full p-3 rounded-xl transition-all ${
                        selectedTheme.id === theme.id 
                          ? 'bg-violet-500/20 border border-violet-500/30' 
                          : 'bg-neutral-800/50 border border-transparent hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex gap-1">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.preview.accent }} />
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.preview.text }} />
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.preview.bg }} />
                        </div>
                        <span className="text-sm text-white">{theme.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-white mb-4">实时预览</h3>
                <div 
                  className="rounded-xl overflow-hidden border border-white/10"
                  style={{ backgroundColor: customColors.background }}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: customColors.primary }} />
                      <span style={{ color: customColors.text }} className="font-medium">标题文字</span>
                    </div>
                    <p className="text-sm mb-4" style={{ color: customColors.muted }}>
                      这是一段示例文字，用于预览主题效果。
                    </p>
                    <div className="flex gap-2 mb-4">
                      <button 
                        className="px-4 py-2 rounded-lg text-white text-sm"
                        style={{ backgroundColor: customColors.primary }}
                      >
                        主要按钮
                      </button>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm border"
                        style={{ borderColor: customColors.primary, color: customColors.primary }}
                      >
                        次要按钮
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: customColors.accent }} />
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: customColors.secondary }} />
                      <div className="w-6 h-6 rounded" style={{ backgroundColor: customColors.muted }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 text-white rounded-xl hover:bg-neutral-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  重置
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                  <Save className="w-4 h-4" />
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
