import { useState, useEffect } from 'react'
import { LayoutDashboard, ListChecks, Palette } from 'lucide-react'

const slides = [
  { type: 'cover', title: '小红书图文', subtitle: 'XHS Post', desc: 'Image-text post style for Xiaohongshu' },
  { type: 'hook', title: '吸引眼球', subtitle: 'The Hook', desc: 'First 3 seconds determine whether users stay', tips: ['大标题 + 高对比色彩', '情绪化表达引发共鸣', '数字/清单体增加点击率'] },
  { type: 'content', title: '内容结构', subtitle: 'Content Structure', desc: 'Clear structure for maximum engagement', structure: ['痛点引入（为什么）', '解决方案（怎么做）', '详细步骤（123）', '总结收藏（行动号召）'] },
  { type: 'visual', title: '视觉设计', subtitle: 'Visual Design', desc: 'Consistent visual style builds brand recognition', elements: [{ name: '统一封面风格', icon: LayoutDashboard }, { name: '清晰排版层次', icon: ListChecks }, { name: '品牌色贯穿', icon: Palette }] },
  { type: 'cta', title: '行动号召', subtitle: 'Call to Action', desc: 'Guide users to engage with your content', actions: ['点赞收藏备用', '关注获取更多', '评论区互动'] },
]

export default function PptXhsPostPage() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrent(p => Math.min(p + 1, slides.length - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setCurrent(p => Math.max(p - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const slide = slides[current]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#ff2442' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '16px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="absolute top-0 left-0 right-0 h-2" style={{ background: '#ff2442' }} />
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-bold tracking-[0.16em] uppercase mb-4" style={{ color: '#ff2442' }}>Content Strategy</div>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ color: '#1a1a1a' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#ff2442' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#888888' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'hook' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#ff2442' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#1a1a1a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="space-y-4">
                {slide.tips.map((tip, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#fff5f5', border: '1px solid rgba(255,36,66,0.1)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: '#ff2442', color: '#fff' }}>{i + 1}</div>
                    <span className="text-base" style={{ color: '#1a1a1a' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'content' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#ff2442' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#1a1a1a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="space-y-3">
                {slide.structure.map((step, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: i % 2 === 0 ? '#fff5f5' : '#f8f8f8' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold" style={{ background: '#ff2442', color: '#fff' }}>{i + 1}</div>
                    <span className="text-base font-medium" style={{ color: '#1a1a1a' }}>{step}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'visual' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#ff2442' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#1a1a1a' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.elements.map((el, i) => (
                  <div key={i} className="p-6 rounded-xl text-center" style={{ background: '#fff5f5', border: '1px solid rgba(255,36,66,0.1)' }}>
                    <el.icon size={40} className="mx-auto mb-3" style={{ color: '#ff2442' }} />
                    <span className="text-base font-medium" style={{ color: '#1a1a1a' }}>{el.name}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'cta' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[64px] font-bold leading-[1.05] mb-4" style={{ color: '#1a1a1a' }}>{slide.title}</h1>
              <p className="text-xl mb-8" style={{ color: '#666666' }}>{slide.desc}</p>
              <div className="space-y-3">
                {slide.actions.map((action, i) => (
                  <div key={i} className="px-8 py-3 rounded-full text-lg font-semibold" style={{ background: i === 0 ? '#ff2442' : '#f8f8f8', color: i === 0 ? '#ffffff' : '#1a1a1a' }}>
                    {action}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100 relative z-10">
          <span className="text-xs" style={{ color: '#999999' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#ff2442' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
