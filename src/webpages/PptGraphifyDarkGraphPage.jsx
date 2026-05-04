import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: 'Graphify', subtitle: 'Dark Graph', desc: 'Knowledge Graph Visualization' },
  { type: 'feature', title: '力导向图谱', subtitle: 'Force-Directed Graph', desc: 'Deep-night dark background with floating orb halos and glass cards', features: ['#06060c → #0e1020 斜向渐变', '三颗 400-520px blur orb 慢飘动', 'SVG 力导向图谱背景', 'Rainbow shift 渐变标题'] },
  { type: 'glass', title: '温暖玻璃拟态', subtitle: 'Warm Glassmorphism', desc: 'Glass cards with top highlight and subtle inner shadow', cards: [{ color: '#e8a87c', label: '琥珀' }, { color: '#7ed3a4', label: '薄荷' }, { color: '#7eb8da', label: '雾蓝' }, { color: '#b8a4d6', label: '丁香' }] },
  { type: 'terminal', title: '命令行', subtitle: 'Command Line', desc: 'JetBrains Mono 的 .cmd-glow 命令行', cmd: '$ graphify init --knowledge-graph' },
  { type: 'summary', title: 'AI Native + 科技感 + 温度', subtitle: 'Summary', desc: '介绍开发者工具、知识图谱、数据可视化项目的完美选择' },
]

export default function PptGraphifyDarkGraphPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#06060c' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #06060c, #0e1020)', borderRadius: '16px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[520px] h-[520px] rounded-full blur-[400px] opacity-20 animate-pulse" style={{ background: '#7c3aed', top: '-10%', left: '-10%' }} />
          <div className="absolute w-[480px] h-[480px] rounded-full blur-[450px] opacity-15 animate-pulse" style={{ background: '#3b82f6', bottom: '-15%', right: '-5%' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[380px] opacity-10 animate-pulse" style={{ background: '#10b981', top: '40%', left: '50%' }} />
        </div>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <h1 className="text-[80px] font-bold leading-[1.05] mb-4" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399, #a855f7)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradient-shift 3s ease infinite' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#7ed3a4' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8a8a9a' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'feature' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7ed3a4' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h2>
              <div className="grid grid-cols-2 gap-4">
                {slide.features.map((f, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
                    <span className="text-sm" style={{ color: '#c4c4d4' }}>{f}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'glass' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7ed3a4' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h2>
              <p className="text-lg mb-6" style={{ color: '#8a8a9a' }}>{slide.desc}</p>
              <div className="grid grid-cols-4 gap-4">
                {slide.cards.map((card, i) => (
                  <div key={i} className="p-6 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-3" style={{ background: card.color }} />
                    <span className="text-sm font-medium" style={{ color: card.color }}>{card.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'terminal' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7ed3a4' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-8" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h2>
              <p className="text-lg mb-6" style={{ color: '#8a8a9a' }}>{slide.desc}</p>
              <div className="p-5 rounded-lg" style={{ background: '#010409', border: '1px solid rgba(255,255,255,0.1)', fontFamily: "'JetBrains Mono', monospace" }}>
                <span style={{ color: '#7ed3a4', textShadow: '0 0 8px rgba(126,211,164,0.5)' }}>$ </span>
                <span style={{ color: '#e8a87c' }}>{slide.cmd}</span>
                <span className="animate-pulse" style={{ color: '#7ed3a4' }}> █</span>
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[64px] font-bold leading-[1.1] mb-6" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-xl mb-4" style={{ color: '#7ed3a4' }}>{slide.subtitle}</p>
              <p className="text-base max-w-lg" style={{ color: '#8a8a9a' }}>{slide.desc}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#5a5a6a' }}>← → 方向键切换</span>
          <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#7ed3a4' }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
