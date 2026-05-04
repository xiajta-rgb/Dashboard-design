import { useState, useEffect } from 'react'

const bgColors = [
  { bg: 'linear-gradient(135deg, #4f46e5, #6366f1)', accent: '#818cf8', label: 'Indigo' },
  { bg: 'linear-gradient(135deg, #fef3c7, #fde68a)', accent: '#92400e', label: 'Cream' },
  { bg: 'linear-gradient(135deg, #dc2626, #ef4444)', accent: '#fca5a5', label: 'Crimson' },
  { bg: 'linear-gradient(135deg, #059669, #10b981)', accent: '#6ee7b7', label: 'Emerald' },
  { bg: 'linear-gradient(135deg, #64748b, #94a3b8)', accent: '#e2e8f0', label: 'Slate' },
  { bg: 'linear-gradient(135deg, #7c3aed, #8b5cf6)', accent: '#c4b5fd', label: 'Violet' },
  { bg: 'linear-gradient(135deg, #ffffff, #f8fafc)', accent: '#0f172a', label: 'White' },
  { bg: 'linear-gradient(135deg, #1f2937, #374151)', accent: '#d1d5db', label: 'Charcoal' },
]

const slideContent = [
  { title: '方向键导航', subtitle: '极简演讲', desc: '每张幻灯片只讲一件事', list: ['纯粹排版节奏', '巨大标题推进注意力', '无多余视觉元素'] },
  { title: '呼吸感', subtitle: 'Negative Space', desc: '留白是最好的设计语言', list: ['大量空白区域', '单一焦点', '无干扰元素'] },
  { title: '排版节奏', subtitle: 'Typography Rhythm', desc: '用字体大小和重量推进叙事', list: ['160px 超大标题', '4px 短粗分割线', '等宽列表前缀'] },
  { title: '单色聚焦', subtitle: 'Mono Focus', desc: '每张幻灯片一个独立背景色', list: ['独立配色方案', '单一强调色', '统一视觉语言'] },
  { title: '键盘交互', subtitle: 'Keyboard Navigation', desc: '方向键切换，零学习成本', list: ['← → 切换', '无鼠标依赖', '演讲者友好'] },
  { title: '极简美学', subtitle: 'Minimal Editorial', desc: '少即是多的设计哲学', list: ['去除一切装饰', '内容即视觉', '纯粹信息传递'] },
  { title: 'Keynote 气质', subtitle: 'Keynote Style', desc: 'Apple Keynote 式的演讲体验', list: ['专业演讲感', '高质量排版', '沉浸式体验'] },
  { title: '谢谢', subtitle: 'Thank You', desc: '← → 方向键切换幻灯片', list: [] },
]

export default function PptDirKeyNavMinimalPage() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrent(p => Math.min(p + 1, bgColors.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrent(p => Math.max(p - 1, 0))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const theme = bgColors[current]
  const content = slideContent[current]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#1a1a2e' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: theme.bg, borderRadius: '0px', overflow: 'hidden', fontFamily: "'JetBrains Mono', 'Inter', monospace" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12">
          <h1 className="text-[120px] font-bold leading-[0.95] mb-6 tracking-tight" style={{ color: theme.accent, fontFamily: "'Inter', sans-serif" }}>{content.title}</h1>
          <div className="w-16 h-1 mb-6" style={{ background: theme.accent, borderRadius: '2px' }} />
          <p className="text-2xl font-light mb-2" style={{ color: theme.accent, opacity: 0.8 }}>{content.subtitle}</p>
          <p className="text-base mb-8" style={{ color: theme.accent, opacity: 0.6 }}>{content.desc}</p>
          {content.list.length > 0 && (
            <ul className="space-y-3">
              {content.list.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg" style={{ color: theme.accent, opacity: 0.7 }}>
                  <span className="text-xl" style={{ color: theme.accent }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="absolute bottom-6 left-8 flex items-center gap-2 text-xs" style={{ color: theme.accent, opacity: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
          <span>←</span>
          <span>→</span>
          <span className="ml-2">键盘导航</span>
        </div>
        <div className="absolute bottom-6 right-8 text-xs font-bold" style={{ color: theme.accent, opacity: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>
          {theme.label} · {current + 1}/{bgColors.length}
        </div>
      </div>
    </div>
  )
}
