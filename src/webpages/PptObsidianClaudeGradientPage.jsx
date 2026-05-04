import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: 'Obsidian × Claude', subtitle: 'Gradient Slides', desc: 'GitHub-dark with purple ambient radial and gradient text' },
  { type: 'gradient', title: '渐变文字', subtitle: 'Gradient Text', desc: 'linear #a855f7 → #60a5fa → #34d399', tags: ['MCP', 'Agent', 'Dev Tool'] },
  { type: 'code', title: '配置文件', subtitle: 'Configuration', desc: 'GitHub-ish code style with syntax highlighting', code: { comment: '# MCP Server Configuration', key1: 'server', value1: '"obsidian-claude"', key2: 'protocol', value2: '"stdio"', key3: 'enabled', value3: 'true' } },
  { type: 'steps', title: '步骤列表', subtitle: 'Step-by-Step', desc: '简洁 step 列表，紫色左边框 highlight', steps: ['安装 MCP 服务器', '配置 Claude 连接', '测试数据流', '部署到生产环境'] },
  { type: 'summary', title: '总结', subtitle: 'Summary', desc: '开发者友好的工作流，气质接近 GitHub Blog / Linear Changelog' },
]

export default function PptObsidianClaudeGradientPage() {
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
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#0d1117' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#0d1117', borderRadius: '12px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)', top: '-20%', right: '-10%' }} />
          <div className="absolute w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)', bottom: '-15%', left: '-5%' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          {slide.type === 'cover' && (
            <>
              <h1 className="text-[72px] font-bold leading-[1.05] mb-4" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-2xl font-light mb-2" style={{ color: '#7c3aed' }}>{slide.subtitle}</p>
              <p className="text-sm" style={{ color: '#8b949e' }}>{slide.desc}</p>
            </>
          )}
          {slide.type === 'gradient' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7c3aed' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-6" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h2>
              <p className="text-lg mb-6" style={{ color: '#8b949e' }}>{slide.desc}</p>
              <div className="flex gap-3">
                {slide.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', color: '#a855f7' }}>{tag}</span>
                ))}
              </div>
            </>
          )}
          {slide.type === 'code' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7c3aed' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-6" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h2>
              <p className="text-lg mb-6" style={{ color: '#8b949e' }}>{slide.desc}</p>
              <div className="p-5 rounded-lg" style={{ background: '#010409', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'JetBrains Mono', monospace" }}>
                <div className="text-sm mb-2" style={{ color: '#8b949e' }}><span style={{ color: '#8b949e', fontStyle: 'italic' }}>{slide.code.comment}</span></div>
                <div className="space-y-1">
                  <div><span style={{ color: '#79c0ff' }}>{slide.code.key1}</span>: <span style={{ color: '#a5d6ff' }}>{slide.code.value1}</span></div>
                  <div><span style={{ color: '#79c0ff' }}>{slide.code.key2}</span>: <span style={{ color: '#a5d6ff' }}>{slide.code.value2}</span></div>
                  <div><span style={{ color: '#79c0ff' }}>{slide.code.key3}</span>: <span style={{ color: '#79c0ff' }}>{slide.code.value3}</span></div>
                </div>
              </div>
            </>
          )}
          {slide.type === 'steps' && (
            <>
              <div className="text-[12px] font-bold tracking-[0.14em] mb-4 uppercase" style={{ color: '#7c3aed' }}>{slide.subtitle}</div>
              <h2 className="text-[56px] font-bold leading-[1.1] mb-6" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h2>
              <p className="text-lg mb-6" style={{ color: '#8b949e' }}>{slide.desc}</p>
              <div className="space-y-3">
                {slide.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: 'rgba(124,58,237,0.05)', borderLeft: '3px solid #7c3aed' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#7c3aed', color: '#fff' }}>{i + 1}</div>
                    <span style={{ color: '#c9d1d9' }}>{step}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {slide.type === 'summary' && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[64px] font-bold leading-[1.05] mb-6" style={{ background: 'linear-gradient(90deg, #a855f7, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{slide.title}</h1>
              <p className="text-xl mb-4" style={{ color: '#7c3aed' }}>{slide.subtitle}</p>
              <p className="text-base max-w-lg" style={{ color: '#8b949e' }}>{slide.desc}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-white/[0.06] relative z-10">
          <span className="text-xs" style={{ color: '#484f58', fontFamily: "'JetBrains Mono', monospace" }}>← → 切换</span>
          <span className="text-xs font-bold" style={{ color: '#7c3aed', fontFamily: "'JetBrains Mono', monospace" }}>{current + 1}/{slides.length}</span>
        </div>
      </div>
    </div>
  )
}
