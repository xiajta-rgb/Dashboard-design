import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: 'Product Launch', subtitle: 'Launch Event', desc: 'Product launch presentation with bold visual impact' },
  { type: 'reveal', title: '产品揭晓', subtitle: 'The Reveal', desc: 'One more thing... 震撼发布', highlight: '全新产品' },
  { type: 'features', title: '核心功能', subtitle: 'Key Features', desc: 'Three pillars of innovation', features: [{ icon: '⚡', title: '极速', desc: '性能提升 10 倍' }, { icon: '◎', title: '精准', desc: '准确率 99.9%' }, { icon: '⌘', title: '安全', desc: '企业级加密' }] },
  { type: 'demo', title: '现场演示', subtitle: 'Live Demo', desc: 'See it in action', steps: ['打开应用', '输入指令', '查看结果', '分享输出'] },
  { type: 'pricing', title: '定价方案', subtitle: 'Pricing', desc: 'Simple, transparent pricing', plans: [{ name: 'Free', price: '$0', features: ['基础功能', '社区支持'] }, { name: 'Pro', price: '$29/mo', features: ['全部功能', '优先支持', 'API 访问'], highlight: true }, { name: 'Enterprise', price: 'Custom', features: ['定制方案', '专属支持', 'SLA'] }] },
  { type: 'cta', title: '立即开始', subtitle: 'Get Started Today', desc: 'Join thousands of early adopters', cta: '访问 product.example.com' },
]

export default function PptProductLaunchPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#000000' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: 'linear-gradient(180deg, #000000, #0a0a0a)', borderRadius: '12px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#635bff' }}>Introducing</div>
              <h1 className="text-[80px] font-bold leading-[1.05] mb-4" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#888888' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#555555' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'reveal' && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-8" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h1 className="text-[96px] font-bold leading-[1.05] mb-6" style={{ background: 'linear-gradient(90deg, #635bff, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.highlight}</h1>
              <p className="text-xl" style={{ color: '#888888' }}>{slide.desc}</p>
            </div>
          )}
          {slide.type === 'features' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#888888' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-8">
                {slide.features.map((f, i) => (
                  <div key={i} className="text-center">
                    <div className="text-5xl mb-4">{f.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>{f.title}</h3>
                    <p className="text-sm" style={{ color: '#888888' }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'demo' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#888888' }}>{slide.desc}</p>
              <div className="grid grid-cols-4 gap-4">
                {slide.steps.map((step, i) => (
                  <div key={i} className="p-6 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center font-bold" style={{ background: '#635bff', color: '#fff' }}>{i + 1}</div>
                    <span className="text-sm" style={{ color: '#cccccc' }}>{step}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'pricing' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#635bff' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ color: '#ffffff' }}>{slide.title}</h2>
              <p className="text-lg mb-8" style={{ color: '#888888' }}>{slide.desc}</p>
              <div className="grid grid-cols-3 gap-6">
                {slide.plans.map((plan, i) => (
                  <div key={i} className="p-6 rounded-lg text-center" style={{ background: plan.highlight ? 'rgba(99,91,255,0.15)' : 'rgba(255,255,255,0.03)', border: `1px solid ${plan.highlight ? '#635bff' : 'rgba(255,255,255,0.1)'}` }}>
                    <div className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>{plan.name}</div>
                    <div className="text-4xl font-bold mb-4" style={{ color: plan.highlight ? '#635bff' : '#ffffff' }}>{plan.price}</div>
                    <div className="space-y-2">
                      {plan.features.map((f, j) => (
                        <div key={j} className="text-sm" style={{ color: '#888888' }}>{f}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'cta' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[72px] font-bold leading-[1.05] mb-6" style={{ color: '#ffffff' }}>{slide.title}</h1>
              <p className="text-xl mb-8" style={{ color: '#888888' }}>{slide.subtitle}</p>
              <p className="text-lg mb-8" style={{ color: '#555555' }}>{slide.desc}</p>
              <div className="px-8 py-4 rounded-full text-lg font-semibold" style={{ background: '#635bff', color: '#ffffff' }}>{slide.cta}</div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ color: '#444444' }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#635bff' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
