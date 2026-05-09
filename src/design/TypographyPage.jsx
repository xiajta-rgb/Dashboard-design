import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Copy, Check, Info, AlertCircle, Type, AlignLeft, Move, Eye, Settings } from 'lucide-react'
import { useState, useRef } from 'react'
import { Badge, Card, TabList, Tab, Input } from '../components/ui'

const fontCategories = {
  'sans-serif': {
    title: '无衬线字体',
    description: '现代、简洁、易读，适合数字界面',
    fonts: [
      { name: 'Inter', weights: [300, 400, 500, 600, 700, 800, 900], use: '界面文字、标题、正文', metrics: { xHeight: 0.52, capHeight: 0.73 } },
      { name: 'Plus Jakarta Sans', weights: [400, 500, 600, 700, 800], use: '标题、品牌文字', metrics: { xHeight: 0.50, capHeight: 0.71 } },
      { name: 'DM Sans', weights: [400, 500, 700], use: '正文、说明文字', metrics: { xHeight: 0.51, capHeight: 0.72 } },
      { name: 'Outfit', weights: [300, 400, 500, 600, 700, 800], use: '现代风格界面', metrics: { xHeight: 0.53, capHeight: 0.74 } },
      { name: 'Sora', weights: [300, 400, 500, 600, 700, 800], use: '科技感界面', metrics: { xHeight: 0.54, capHeight: 0.75 } },
      { name: 'Manrope', weights: [300, 400, 500, 600, 700, 800], use: '通用无衬线', metrics: { xHeight: 0.51, capHeight: 0.72 } },
    ]
  },
  'serif': {
    title: '衬线字体',
    description: '传统、优雅、经典，适合编辑内容和品牌',
    fonts: [
      { name: 'Playfair Display', weights: [400, 500, 600, 700, 800, 900], use: '标题、引用、杂志', metrics: { xHeight: 0.48, capHeight: 0.70 } },
      { name: 'Crimson Pro', weights: [300, 400, 500, 600, 700, 800, 900], use: '正文、长文阅读', metrics: { xHeight: 0.47, capHeight: 0.69 } },
      { name: 'Libre Baskerville', weights: [400, 700], use: '经典编辑风格', metrics: { xHeight: 0.46, capHeight: 0.68 } },
      { name: 'Cormorant Garamond', weights: [300, 400, 500, 600, 700], use: '优雅文学风格', metrics: { xHeight: 0.45, capHeight: 0.67 } },
      { name: 'Fraunces', weights: [300, 400, 500, 600, 700, 800, 900], use: '表现力标题', metrics: { xHeight: 0.49, capHeight: 0.71 } },
      { name: 'EB Garamond', weights: [400, 500, 600, 700, 800], use: '传统书籍排版', metrics: { xHeight: 0.46, capHeight: 0.68 } },
    ]
  },
  'display': {
    title: '展示字体',
    description: '独特、创意、醒目，适合大标题和品牌',
    fonts: [
      { name: 'Bebas Neue', weights: [400], use: '海报、大标题', metrics: { xHeight: 0.55, capHeight: 0.78 } },
      { name: 'Anton', weights: [400], use: '运动感标题', metrics: { xHeight: 0.54, capHeight: 0.77 } },
      { name: 'Archivo Black', weights: [400], use: '粗犷标题', metrics: { xHeight: 0.52, capHeight: 0.75 } },
      { name: 'Righteous', weights: [400], use: '复古标题', metrics: { xHeight: 0.50, capHeight: 0.73 } },
      { name: 'Permanent Marker', weights: [400], use: '手写风格标题', metrics: { xHeight: 0.48, capHeight: 0.71 } },
      { name: 'Abril Fatface', weights: [400], use: '优雅展示标题', metrics: { xHeight: 0.49, capHeight: 0.72 } },
    ]
  },
  'mono': {
    title: '等宽字体',
    description: '规整、专业、技术，适合代码和数据',
    fonts: [
      { name: 'JetBrains Mono', weights: [300, 400, 500, 600, 700, 800], use: '代码、技术文档', metrics: { xHeight: 0.54, capHeight: 0.76 } },
      { name: 'Fira Code', weights: [300, 400, 500, 600, 700], use: '编程字体', metrics: { xHeight: 0.53, capHeight: 0.75 } },
      { name: 'Source Code Pro', weights: [300, 400, 500, 600, 700, 800, 900], use: '代码和数据展示', metrics: { xHeight: 0.52, capHeight: 0.74 } },
      { name: 'IBM Plex Mono', weights: [300, 400, 500, 600, 700], use: '企业技术风格', metrics: { xHeight: 0.51, capHeight: 0.73 } },
      { name: 'Space Mono', weights: [400, 700], use: '科技感代码', metrics: { xHeight: 0.55, capHeight: 0.77 } },
      { name: 'Roboto Mono', weights: [300, 400, 500, 700], use: '通用等宽', metrics: { xHeight: 0.52, capHeight: 0.74 } },
    ]
  },
  'chinese': {
    title: '中文衬线',
    description: '宋体风格，适合正文阅读和书籍排版',
    fonts: [
      { name: 'Noto Serif SC', weights: [300, 400, 500, 600, 700, 800, 900], use: '正式文档、长文阅读' },
      { name: 'ZCOOL XiaoWei', weights: [400], use: '文艺风格标题' },
      { name: 'Ma Shan Zheng', weights: [400], use: '书法风格' },
      { name: 'ZCOOL QingKe HuangYou', weights: [400], use: '个性标题' },
      { name: 'Long Cang', weights: [400], use: '楷书风格' },
      { name: 'Liu Jian Mao Cao', weights: [400], use: '潦草手写风格' },
    ]
  },
  'chinese-sans': {
    title: '中文无衬线',
    description: '黑体风格，适合界面文字和现代设计',
    fonts: [
      { name: 'Noto Sans SC', weights: [300, 400, 500, 700, 900], use: '界面文字、正文' },
      { name: 'Source Han Sans CN', weights: [300, 400, 500, 600, 700, 900], use: '企业级界面' },
      { name: 'PingFang SC', weights: [300, 400, 500, 600, 700], use: '苹果系统中文' },
      { name: 'Microsoft YaHei', weights: [300, 400, 500, 700, 900], use: 'Windows 系统中文' },
      { name: 'HarmonyOS Sans SC', weights: [300, 400, 500, 600, 700], use: '华为鸿蒙系统' },
      { name: 'OPPO Sans', weights: [300, 400, 500, 700, 900], use: 'OPPO 品牌字体' },
    ]
  },
}

const fontWeights = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
}

const typeScale = [
  { name: 'Display', size: '48px', lineHeight: '1.1', weight: 800, tracking: '-0.02em', usage: 'Hero 标题、全站主标题', cssVar: '--text-display' },
  { name: 'H1', size: '36px', lineHeight: '1.2', weight: 700, tracking: '-0.01em', usage: '页面主标题', cssVar: '--text-h1' },
  { name: 'H2', size: '30px', lineHeight: '1.25', weight: 700, tracking: '-0.01em', usage: '章节标题', cssVar: '--text-h2' },
  { name: 'H3', size: '24px', lineHeight: '1.3', weight: 600, tracking: '0', usage: '子章节标题', cssVar: '--text-h3' },
  { name: 'H4', size: '20px', lineHeight: '1.35', weight: 600, tracking: '0', usage: '小标题', cssVar: '--text-h4' },
  { name: 'H5', size: '18px', lineHeight: '1.4', weight: 500, tracking: '0', usage: '卡片标题', cssVar: '--text-h5' },
  { name: 'Body Large', size: '18px', lineHeight: '1.6', weight: 400, tracking: '0', usage: '重要正文、引导文字', cssVar: '--text-body-lg' },
  { name: 'Body', size: '16px', lineHeight: '1.6', weight: 400, tracking: '0', usage: '普通正文内容', cssVar: '--text-body' },
  { name: 'Body Small', size: '14px', lineHeight: '1.5', weight: 400, tracking: '0', usage: '辅助说明、次要内容', cssVar: '--text-body-sm' },
  { name: 'Caption', size: '12px', lineHeight: '1.5', weight: 400, tracking: '0.01em', usage: '标签、注释、图例', cssVar: '--text-caption' },
  { name: 'Overline', size: '10px', lineHeight: '1.5', weight: 600, tracking: '0.1em', usage: '分类标签、全大写文字', cssVar: '--text-overline' },
]

const fontLoadingStrategies = [
  {
    name: 'FOUT',
    title: 'Flash of Unstyled Text',
    description: '先显示系统字体，字体加载完成后切换',
    code: 'display=swap',
    pros: ['首屏渲染快', '无布局跳动'],
    cons: ['字体切换时闪烁', '体验不够流畅'],
    recommended: true,
  },
  {
    name: 'FOIT',
    title: 'Flash of Invisible Text',
    description: '字体加载完成前不显示文字',
    code: 'display=block',
    pros: ['避免文字跳动', '字体样式统一'],
    cons: ['首屏白屏', '用户体验差'],
    recommended: false,
  },
  {
    name: 'Optional',
    title: '可选字体加载',
    description: '字体可用时使用，否则使用系统字体',
    code: 'display=optional',
    pros: ['最佳性能', '无任何风险'],
    cons: ['可能永远不加载', '控制性差'],
    recommended: false,
  },
]

const accessibilityFonts = [
  {
    name: 'OpenDyslexic',
    description: '专为阅读障碍者设计的字体',
    url: 'https://opendyslexic.org/',
    features: ['加重字母底部', '独特字母形状', '减少字母混淆'],
    usage: '阅读障碍用户、特殊教育场景',
  },
  {
    name: 'Atkinson Hyperlegible',
    description: '高可读性字体，注重字符区分',
    url: 'https://brailleinstitute.org/freefont',
    features: ['高对比度设计', '字符区分度高', '适合低视力用户'],
    usage: '视力障碍、老年用户',
  },
  {
    name: 'Lexie Readable',
    description: '优化字母间距的易读字体',
    url: 'https://www.fonts.com/font/fontspring/lexie-readable',
    features: ['宽字母设计', '清晰字形', '宽松间距'],
    usage: '长文本阅读、无障碍设计',
  },
]

const responsiveTypography = [
  { breakpoint: 'xs', multiplier: 0.75, example: 'Display: 36px' },
  { breakpoint: 'sm', multiplier: 0.85, example: 'Display: 41px' },
  { breakpoint: 'md', multiplier: 0.9, example: 'Display: 43px' },
  { breakpoint: 'lg', multiplier: 1, example: 'Display: 48px' },
  { breakpoint: 'xl', multiplier: 1.1, example: 'Display: 53px' },
  { breakpoint: '2xl', multiplier: 1.2, example: 'Display: 58px' },
]

const fontPairings = [
  {
    title: '标题 + 正文',
    heading: 'Inter',
    body: 'Noto Sans SC',
    preview: { heading: '标题文字', body: '这是正文内容，使用无衬线中文字体保证可读性。' },
    useCase: '企业网站、SaaS应用',
  },
  {
    title: '编辑 + 引用',
    heading: 'Playfair Display',
    body: 'Crimson Pro',
    preview: { heading: '优雅标题', body: '衬线字体适合长文阅读和引用内容。' },
    useCase: '博客、杂志、新闻',
  },
  {
    title: '代码展示',
    heading: 'JetBrains Mono',
    body: 'JetBrains Mono',
    preview: { heading: 'const code', body: 'function example() { return true; }' },
    useCase: '技术文档、开发者工具',
  },
  {
    title: '现代科技',
    heading: 'Sora',
    body: 'Noto Sans SC',
    preview: { heading: '科技标题', body: '科技感十足的现代界面设计。' },
    useCase: '科技公司、创新产品',
  },
  {
    title: '品牌展示',
    heading: 'Plus Jakarta Sans',
    body: 'Noto Sans SC',
    preview: { heading: '品牌标题', body: '专业品牌形象展示字体组合。' },
    useCase: '品牌官网、营销页面',
  },
  {
    title: '中文传统',
    heading: 'ZCOOL XiaoWei',
    body: 'Noto Serif SC',
    preview: { heading: '文艺标题', body: '宋体风格，适合文学艺术类内容。' },
    useCase: '文化网站、艺术展示',
  },
]

const letterSpacingGuide = [
  { name: '紧凑', value: '-0.02em', use: '大标题、Display级别', example: 'DESIGN SYSTEM' },
  { name: '标准', value: '0', use: '正文、小标题', example: 'Design System' },
  { name: '宽松', value: '0.01em', use: '小字号、Caption', example: 'Design System' },
  { name: '超宽', value: '0.1em', use: 'Overline、全大写', example: 'DESIGN SYSTEM' },
]

function FontCard({ font, category, index }) {
  const prefersReducedMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${font.name.replace(/ /g, '+')}:wght@${font.weights.join(';')}&display=swap`

  const handleCopy = () => {
    navigator.clipboard.writeText(`<link href="${googleFontsUrl}" rel="stylesheet">`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{font.name}</h3>
            <p className="text-sm text-neutral-400">{font.use}</p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            className={`
              p-2 rounded-lg transition-all duration-200
              ${copied 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'}
            `}
            title="复制 Google Fonts 链接"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="mb-4">
          <p className="text-3xl font-bold text-white" style={{ fontFamily: font.name }}>
            设计与字体 {font.name}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {font.weights.map(weight => (
            <Badge key={weight} variant="default" size="sm">
              {weight} {fontWeights[weight]}
            </Badge>
          ))}
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-6 pb-6 border-t border-white/5 pt-4"
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">字体预览</h4>
              <div className="space-y-3">
                {[300, 400, 500, 700, 900].filter(w => font.weights.includes(w)).map(weight => (
                  <div key={weight} className="flex items-center gap-4">
                    <span className="text-xs text-neutral-500 w-12">{weight}</span>
                    <span 
                      className="text-lg text-white"
                      style={{ fontFamily: font.name, fontWeight: weight }}
                    >
                      ABCDEFG abcdefg 012345 {font.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">中文预览</h4>
              <p className="text-2xl text-white leading-relaxed" style={{ fontFamily: font.name }}>
                设计与创意字体排版
              </p>
            </div>

            {font.metrics && (
              <div>
                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">字体度量</h4>
                <div className="flex gap-4">
                  <Badge variant="outline" size="sm">x-Height: {font.metrics.xHeight}</Badge>
                  <Badge variant="outline" size="sm">Cap-Height: {font.metrics.capHeight}</Badge>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">代码引用</h4>
              <code className="block bg-neutral-800/50 rounded-lg p-3 text-xs text-neutral-300 font-mono overflow-x-auto">
                {`<link href="${googleFontsUrl}" rel="stylesheet">`}
              </code>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

function TypeScaleCard({ scale, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-neutral-900/50 rounded-xl border border-white/5 p-6 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{scale.name}</h3>
          <p className="text-xs text-neutral-500">{scale.usage}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-violet-400 font-mono">{scale.size}</p>
          <p className="text-xs text-neutral-500">行高 {scale.lineHeight}</p>
        </div>
      </div>

      <p 
        className="text-white mb-4"
        style={{ 
          fontSize: scale.size,
          lineHeight: scale.lineHeight,
          fontWeight: scale.weight,
          letterSpacing: scale.tracking,
        }}
      >
        {scale.name} 文本预览
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="outline" size="sm">
          字重 {scale.weight}
        </Badge>
        <Badge variant="outline" size="sm">
          字间距 {scale.tracking}
        </Badge>
        <Badge variant="primary" size="sm">
          {scale.cssVar}
        </Badge>
      </div>
    </motion.div>
  )
}

function FontLoadingStrategyCard({ strategy, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`bg-neutral-900/50 rounded-xl border p-6 ${
        strategy.recommended 
          ? 'border-emerald-500/30 bg-emerald-500/5' 
          : 'border-white/5'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {strategy.name}
          </h3>
          <p className="text-sm text-neutral-500">{strategy.title}</p>
        </div>
        {strategy.recommended && (
          <Badge variant="success" size="sm">
            推荐
          </Badge>
        )}
      </div>

      <p className="text-sm text-neutral-400 mb-4">{strategy.description}</p>

      <div className="mb-4">
        <code className="block bg-neutral-800/50 rounded-lg p-2 text-xs text-emerald-400 font-mono">
          {strategy.code}
        </code>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-semibold text-emerald-400 mb-2">优点</h4>
          <ul className="space-y-1">
            {strategy.pros.map((pro, i) => (
              <li key={i} className="text-xs text-neutral-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-amber-400 mb-2">缺点</h4>
          <ul className="space-y-1">
            {strategy.cons.map((con, i) => (
              <li key={i} className="text-xs text-neutral-400 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function AccessibilityFontCard({ font, index }) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(font.url)
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
          <h3 className="text-lg font-semibold text-white mb-1">{font.name}</h3>
          <p className="text-sm text-neutral-500">{font.description}</p>
        </div>
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

      <p 
        className="text-2xl text-white mb-4 leading-relaxed"
        style={{ fontFamily: font.name }}
      >
        设计与创意字体排版系统
      </p>

      <div className="mb-4">
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          特性
        </h4>
        <div className="flex flex-wrap gap-2">
          {font.features.map((feature, i) => (
            <Badge key={i} variant="default" size="sm">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          适用场景
        </h4>
        <p className="text-sm text-neutral-400">{font.usage}</p>
      </div>
    </motion.div>
  )
}

function FontPairingCard({ pairing, index }) {
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
      <h3 className="text-lg font-semibold text-white mb-3">{pairing.title}</h3>
      <div className="space-y-2 mb-4">
        <p className="text-2xl font-bold text-white" style={{ fontFamily: pairing.heading }}>
          {pairing.preview.heading}
        </p>
        <p className="text-sm text-neutral-400" style={{ fontFamily: pairing.body }}>
          {pairing.preview.body}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="default" size="sm">{pairing.heading} + {pairing.body}</Badge>
        <Badge variant="outline" size="sm">{pairing.useCase}</Badge>
      </div>
    </motion.div>
  )
}

export default function TypographyPage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('sans-serif')

  const categories = Object.entries(fontCategories)

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.header
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Type className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-neutral-400">Typography Design System</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              字体设计<span className="text-gradient">系统</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              精选 Google Fonts 字体库，包含 30+ 专业字体家族。
              从无衬线到衬线，从英文到中文，覆盖所有设计场景。
            </p>
          </motion.header>

          <div className="flex items-center justify-center mb-12 overflow-x-auto">
            <TabList className="flex flex-wrap gap-2">
              {categories.map(([key, category]) => (
                <Tab 
                  key={key}
                  active={activeCategory === key}
                  onClick={() => setActiveCategory(key)}
                >
                  {category.title}
                </Tab>
              ))}
            </TabList>
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {fontCategories[activeCategory].title}
              </h2>
              <p className="text-neutral-400">
                {fontCategories[activeCategory].description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {fontCategories[activeCategory].fonts.map((font, index) => (
                <FontCard
                  key={font.name}
                  font={font}
                  category={activeCategory}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h2 className="text-3xl font-bold text-white">
                字号层级<span className="text-gradient">系统</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              12 级字号层级体系，基于 1.25 倍率递增。从 Overline 的 10px 到 Display 的 48px，
              覆盖所有界面场景。每个层级都定义了精确的行高、字重和字间距。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typeScale.map((scale, index) => (
                <TypeScaleCard key={scale.name} scale={scale} index={index} />
              ))}
            </div>

            <Card className="mt-8 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">CSS 变量导出</h3>
              <pre className="bg-neutral-800/50 rounded-lg p-4 overflow-x-auto text-sm text-neutral-300">
{`:root {
  --font-sans: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
  --font-serif: 'Playfair Display', 'Noto Serif SC', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  --text-display: 48px;
  --text-h1: 36px;
  --text-h2: 30px;
  --text-h3: 24px;
  --text-h4: 20px;
  --text-h5: 18px;
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-body-sm: 14px;
  --text-caption: 12px;
  --text-overline: 10px;
}`}</pre>
            </Card>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <Move className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                字间距<span className="text-gradient">指南</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              字间距影响文字的可读性和视觉节奏。大标题需要紧凑的字间距，
              而小字号和全大写文字需要更宽松的间距。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {letterSpacingGuide.map((guide, index) => (
                <motion.div
                  key={guide.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-900/50 rounded-xl border border-white/5 p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{guide.name}</h3>
                  <p className="text-sm text-violet-400 font-mono mb-2">{guide.value}</p>
                  <p className="text-xs text-neutral-500 mb-4">{guide.use}</p>
                  <p 
                    className="text-xl text-white"
                    style={{ letterSpacing: guide.value }}
                  >
                    {guide.example}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Info className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                字体加载<span className="text-gradient">策略</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              Google Fonts 提供三种加载策略：FOUT、FOIT 和 Optional。
              推荐使用 FOUT（display=swap）策略，兼顾首屏性能和用户体验。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fontLoadingStrategies.map((strategy, index) => (
                <FontLoadingStrategyCard 
                  key={strategy.name} 
                  strategy={strategy} 
                  index={index} 
                />
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                响应式<span className="text-gradient">字体</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              根据屏幕尺寸动态调整字体大小，确保在各种设备上都有最佳的阅读体验。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {responsiveTypography.map((rt, index) => (
                <motion.div
                  key={rt.breakpoint}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-900/50 rounded-xl border border-white/5 p-4 text-center"
                >
                  <p className="text-lg font-bold text-violet-400 mb-2">{rt.breakpoint}</p>
                  <p className="text-sm text-white mb-1">{rt.multiplier}x</p>
                  <p className="text-xs text-neutral-500">{rt.example}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                可访问性<span className="text-gradient">字体</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              为阅读障碍和视力障碍用户设计的特殊字体。这些字体通过独特的设计提高可读性，
              确保所有用户都能获得良好的阅读体验。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessibilityFonts.map((font, index) => (
                <AccessibilityFontCard key={font.name} font={font} index={index} />
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <AlignLeft className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                字体配对<span className="text-gradient">指南</span>
              </h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
              专业的字体配对可以创造视觉层次和品牌个性。以下是经过验证的字体组合，
              适用于各种设计场景。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fontPairings.map((pairing, index) => (
                <FontPairingCard key={pairing.title} pairing={pairing} index={index} />
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}