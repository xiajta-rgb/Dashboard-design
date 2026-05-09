import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Accessibility,
  Eye,
  MousePointer,
  Keyboard,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Contrast,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Check,
  X,
  AlertTriangle,
  Info,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Settings,
  Shield,
  EyeOff,
  RotateCcw,
  Highlighter,
  Type,
  Palette,
  Gauge,
  Keyboard as KeyboardIcon,
  MousePointer as MousePointerIcon,
  Eye as EyeIcon,
  Volume,
  Accessibility as AccessibilityIcon,
  Brain,
  Heart,
  Users,
  Globe,
  Lock,
  Unlock
} from 'lucide-react'

const accessibilityFeatures = [
  {
    id: 'keyboard',
    title: '键盘导航',
    description: '支持完整的键盘操作，包括 Tab、Enter、Escape 等快捷键',
    icon: KeyboardIcon,
    status: 'supported',
    wcag: '2.1 AA',
    shortcut: 'Tab / Shift+Tab',
  },
  {
    id: 'screen-reader',
    title: '屏幕阅读器',
    description: '完整的 ARIA 标签支持，优化屏幕阅读器用户体验',
    icon: EyeIcon,
    status: 'supported',
    wcag: '2.1 AA',
    shortcut: 'Alt+1 / Alt+2',
  },
  {
    id: 'contrast',
    title: '高对比度',
    description: '支持高对比度模式，确保文字清晰可读',
    icon: Contrast,
    status: 'supported',
    wcag: 'AAA',
    shortcut: 'Ctrl+Alt+H',
  },
  {
    id: 'zoom',
    title: '缩放支持',
    description: '支持200%页面缩放，不影响布局和功能',
    icon: ZoomIn,
    status: 'supported',
    wcag: '1.4.4',
    shortcut: 'Ctrl++ / Ctrl+-',
  },
  {
    id: 'reduced-motion',
    title: '减少动画',
    description: '尊重用户偏好，减少或禁用动画效果',
    icon: Volume,
    status: 'supported',
    wcag: '2.3.3',
    shortcut: 'Ctrl+Alt+R',
  },
  {
    id: 'focus-indicator',
    title: '焦点指示器',
    description: '清晰可见的焦点指示器，帮助键盘用户定位',
    icon: MousePointerIcon,
    status: 'supported',
    wcag: '2.4.7',
    shortcut: 'Ctrl+Alt+F',
  },
]

const wcagGuidelines = [
  { level: 'A', title: '感知性', items: 12, passed: 12, color: 'emerald' },
  { level: 'AA', title: '可操作性', items: 15, passed: 14, color: 'blue' },
  { level: 'AAA', title: '可理解性', items: 9, passed: 7, color: 'violet' },
]

const accessibilityComponents = [
  { name: 'Button', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-emerald-500/20 text-emerald-400' },
  { name: 'Input', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-blue-500/20 text-blue-400' },
  { name: 'Modal', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-violet-500/20 text-violet-400' },
  { name: 'Dropdown', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-pink-500/20 text-pink-400' },
  { name: 'Tabs', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-amber-500/20 text-amber-400' },
  { name: 'Carousel', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-cyan-500/20 text-cyan-400' },
  { name: 'DataTable', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-teal-500/20 text-teal-400' },
  { name: 'Form', keyboardNav: true, screenReader: true, ariaLabel: true, color: 'bg-rose-500/20 text-rose-400' },
]

const stats = [
  { label: '无障碍评分', value: '98/100', icon: Gauge, color: 'text-emerald-400' },
  { label: 'WCAG合规', value: 'AA级', icon: Shield, color: 'text-blue-400' },
  { label: '支持特性', value: '6/6', icon: CheckCircle2, color: 'text-violet-400' },
  { label: '优化组件', value: '24', icon: AccessibilityIcon, color: 'text-pink-400' },
]

const contrastRatios = [
  { name: '主文本', foreground: '#ffffff', background: '#09090b', ratio: '21:1', wcag: 'AAA' },
  { name: '次要文本', foreground: '#a1a1aa', background: '#09090b', ratio: '10:1', wcag: 'AAA' },
  { name: '按钮背景', foreground: '#ffffff', background: '#8b5cf6', ratio: '4.8:1', wcag: 'AA' },
  { name: '链接', foreground: '#06b6d4', background: '#ffffff', ratio: '4.6:1', wcag: 'AA' },
]

export default function AccessibilityPage() {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [showKeyboardNav, setShowKeyboardNav] = useState(false)
  const [focusVisible, setFocusVisible] = useState(true)

  const handleReset = () => {
    setHighContrast(false)
    setReducedMotion(false)
    setLargeText(false)
    setFocusVisible(true)
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <AccessibilityIcon className="w-8 h-8 text-violet-400" />
                无障碍访问
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                遵循 WCAG 2.1 标准的无障碍设计指南
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-xl border border-white/10 hover:bg-neutral-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                重置设置
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors">
                <Settings className="w-4 h-4" />
                保存偏好
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
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">无障碍功能</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accessibilityFeatures.map((feature, index) => {
                    const FeatureIcon = feature.icon
                    return (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-xl border transition-all ${
                          feature.status === 'supported' 
                            ? 'bg-emerald-500/10 border-emerald-500/30' 
                            : 'bg-neutral-800/50 border-white/10'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              feature.status === 'supported' ? 'bg-emerald-500/20' : 'bg-neutral-700'
                            }`}>
                              <FeatureIcon className={`w-5 h-5 ${
                                feature.status === 'supported' ? 'text-emerald-400' : 'text-neutral-500'
                              }`} />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{feature.title}</h3>
                              <p className="text-xs text-neutral-500">{feature.shortcut}</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            feature.wcag === 'AAA' 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {feature.wcag}
                          </div>
                        </div>
                        <p className="text-sm text-neutral-400">{feature.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          {feature.status === 'supported' ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs text-emerald-400">已支持</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-neutral-500" />
                              <span className="text-xs text-neutral-500">不支持</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">WCAG 合规性</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {wcagGuidelines.map((guideline) => (
                    <div key={guideline.level} className="p-4 bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold bg-${
                          guideline.color === 'emerald' ? 'emerald' : guideline.color === 'blue' ? 'blue' : 'violet'
                        }-500/20 text-{
                          guideline.color === 'emerald' ? 'emerald' : guideline.color === 'blue' ? 'blue' : 'violet'
                        }-400`}>
                          {guideline.level}
                        </span>
                        <span className="text-sm text-neutral-500">{guideline.title}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-white">
                          {guideline.passed}/{guideline.items}
                        </span>
                        <span className="text-sm text-emerald-400">
                          {Math.round((guideline.passed / guideline.items) * 100)}%
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r from-${
                            guideline.color === 'emerald' ? 'emerald' : guideline.color === 'blue' ? 'blue' : 'violet'
                          }-500 to-${
                            guideline.color === 'emerald' ? 'teal' : guideline.color === 'blue' ? 'cyan' : 'purple'
                          }-500 rounded-full`}
                          style={{ width: `${(guideline.passed / guideline.items) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-medium text-white mb-4">对比度测试</h2>
                <div className="grid grid-cols-2 gap-4">
                  {contrastRatios.map((ratio) => (
                    <div key={ratio.name} className="p-4 bg-neutral-800/50 rounded-xl">
                      <div 
                        className="h-12 rounded-lg mb-3 flex items-center justify-center text-lg font-bold"
                        style={{ backgroundColor: ratio.background, color: ratio.foreground }}
                      >
                        Aa
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white">{ratio.name}</div>
                          <div className="text-xs text-neutral-500">{ratio.foreground} / {ratio.background}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{ratio.ratio}</div>
                          <div className={`text-xs ${
                            ratio.wcag === 'AAA' ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            WCAG {ratio.wcag}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-sm font-medium text-white mb-4">辅助功能设置</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Contrast className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm text-white">高对比度</div>
                        <div className="text-xs text-neutral-500">增强文字和背景对比</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setHighContrast(!highContrast)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        highContrast ? 'bg-violet-500' : 'bg-neutral-700'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        highContrast ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <VolumeX className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm text-white">减少动画</div>
                        <div className="text-xs text-neutral-500">最小化动画和过渡</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setReducedMotion(!reducedMotion)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        reducedMotion ? 'bg-violet-500' : 'bg-neutral-700'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        reducedMotion ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Type className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm text-white">大字体</div>
                        <div className="text-xs text-neutral-500">增加基础字体大小</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setLargeText(!largeText)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        largeText ? 'bg-violet-500' : 'bg-neutral-700'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        largeText ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <MousePointerIcon className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm text-white">焦点指示器</div>
                        <div className="text-xs text-neutral-500">显示键盘焦点</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFocusVisible(!focusVisible)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        focusVisible ? 'bg-violet-500' : 'bg-neutral-700'
                      }`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        focusVisible ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-sm font-medium text-white mb-4">组件支持</h2>
                <div className="space-y-2">
                  {accessibilityComponents.map((component) => (
                    <div 
                      key={component.name}
                      className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-xl"
                    >
                      <span className={`px-2 py-1 rounded text-xs font-medium ${component.color}`}>
                        {component.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {component.keyboardNav && (
                          <div className="flex items-center gap-1" title="键盘导航">
                            <KeyboardIcon className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}
                        {component.screenReader && (
                          <div className="flex items-center gap-1" title="屏幕阅读器">
                            <EyeIcon className="w-4 h-4 text-blue-400" />
                          </div>
                        )}
                        {component.ariaLabel && (
                          <div className="flex items-center gap-1" title="ARIA标签">
                            <Shield className="w-4 h-4 text-violet-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-sm font-medium text-white mb-4">快捷键</h2>
                <div className="space-y-2">
                  {[
                    { key: 'Tab', action: '切换焦点' },
                    { key: 'Enter', action: '激活按钮' },
                    { key: 'Escape', action: '关闭弹窗' },
                    { key: 'Space', action: '选中选项' },
                    { key: '方向键', action: '导航选项' },
                  ].map((shortcut) => (
                    <div key={shortcut.key} className="flex items-center justify-between py-2">
                      <span className="text-sm text-neutral-400">{shortcut.action}</span>
                      <kbd className="px-2 py-1 bg-neutral-800 border border-white/10 rounded text-xs text-white font-mono">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
