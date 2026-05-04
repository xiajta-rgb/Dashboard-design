import { useState, useEffect } from 'react'

const slides = [
  { type: 'cover', title: '教学模块', subtitle: 'Course Module', desc: 'Online Learning Unit', meta: 'Module 01' },
  { type: 'objectives', title: '学习目标', items: ['理解核心概念', '掌握关键技能', '完成实践练习', '通过知识测验'] },
  { type: 'concept', title: '核心概念', subtitle: 'Core Concept', desc: 'Structured, quiet, encouraging — like opening a good textbook to a chapter.', content: 'Warm off-white paper with Playfair Display display type, green/terracotta accent pair. A persistent left sidebar lists learning objectives and checks them off as you progress.' },
  { type: 'example', title: '示例讲解', subtitle: 'Worked Example', desc: 'Step-by-step walkthrough with clear visual hierarchy.', steps: ['第一步：理解问题背景', '第二步：分析关键要素', '第三步：应用核心概念', '第四步：验证解决方案'] },
  { type: 'exercise', title: '实践练习', subtitle: 'Exercise', desc: 'Apply what you have learned to solve a real problem.' },
  { type: 'quiz', title: '知识测验', subtitle: 'Check Your Understanding', question: '以下哪个选项正确描述了核心概念？', options: ['选项 A：描述一', '选项 B：描述二', '选项 C：描述三（正确）', '选项 D：描述四'], correctIndex: 2 },
  { type: 'summary', title: '课程总结', subtitle: 'Summary', desc: 'Key takeaways from this module.', items: ['核心概念已掌握', '关键技能已练习', '知识测验已通过'] },
]

export default function PptCourseModulePage() {
  const [current, setCurrent] = useState(0)
  const [completed, setCompleted] = useState([0])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrent(p => Math.min(p + 1, slides.length - 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrent(p => Math.max(p - 1, 0))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (!completed.includes(current)) {
      setCompleted(p => [...p, current])
    }
  }, [current, completed])

  const slide = slides[current]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#fbfaf6' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#fbfaf6', borderRadius: '14px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex" style={{ gap: '56px' }}>
          {slide.type !== 'cover' && slide.type !== 'summary' && (
            <div className="w-[260px] flex-shrink-0 border-r border-[rgba(60,45,20,0.12)] pr-8 py-8">
              <div className="text-[22px] font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: '#2d7d6e' }}>
                <span style={{ color: '#d88a3a' }}>✦ </span>Course
              </div>
              <h5 className="text-[11px] font-bold uppercase tracking-[0.12em] mb-3 mt-8" style={{ color: '#8a7f68' }}>Objectives</h5>
              <ul className="list-none p-0 m-0 text-[13px]" style={{ color: '#5a5140', lineHeight: 1.5 }}>
                {slides[1].items.map((item, i) => (
                  <li key={i} className="py-2 pl-6 relative border-b border-dashed border-[rgba(60,45,20,0.12)]" style={{ color: completed.includes(i + 1) ? '#2d7d6e' : '#5a5140', fontWeight: current === i + 1 ? 700 : 400 }}>
                    <span className="absolute left-0 top-2" style={{ color: completed.includes(i + 1) ? '#2d7d6e' : current === i + 1 ? '#d88a3a' : '#2d7d6e' }}>
                      {completed.includes(i + 1) ? '●' : current === i + 1 ? '▸' : '○'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center px-12 py-8 min-w-0">
            {slide.type === 'cover' && (
              <>
                <div className="text-[13px] font-bold tracking-[0.14em] mb-4" style={{ color: '#d88a3a' }}>{slide.meta}</div>
                <h1 className="text-[88px] font-bold leading-[1.02] mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: '#2a2418' }}>{slide.title}</h1>
                <p className="text-2xl font-light mb-2" style={{ color: '#2d7d6e' }}>{slide.subtitle}</p>
                <p className="text-sm" style={{ color: '#8a7f68' }}>{slide.desc}</p>
              </>
            )}
            {slide.type === 'objectives' && (
              <>
                <div className="text-[13px] font-bold tracking-[0.14em] mb-4" style={{ color: '#d88a3a' }}>LEARNING OBJECTIVES</div>
                <h1 className="text-[72px] font-bold leading-[1.02] mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: '#2a2418' }}>{slide.title}</h1>
                <div className="space-y-4">
                  {slide.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: '#ffffff', border: '1px solid rgba(60,45,20,0.12)', boxShadow: '0 12px 30px rgba(60,45,20,0.07)' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: '#2d7d6e', color: '#fff' }}>{i + 1}</div>
                      <span className="text-lg" style={{ color: '#2a2418' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {slide.type === 'concept' && (
              <>
                <div className="text-[13px] font-bold tracking-[0.14em] mb-4" style={{ color: '#d88a3a' }}>{slide.subtitle}</div>
                <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#2a2418' }}>{slide.title}</h2>
                <p className="text-xl mb-6" style={{ color: '#5a5140', lineHeight: 1.7 }}>{slide.desc}</p>
                <div className="p-6 rounded-lg" style={{ background: '#ffffff', border: '1px solid rgba(60,45,20,0.12)', boxShadow: '0 12px 30px rgba(60,45,20,0.07)' }}>
                  <h4 className="text-lg font-bold mb-3" style={{ color: '#2d7d6e' }}>Key Insight</h4>
                  <p className="text-base" style={{ color: '#5a5140', lineHeight: 1.7 }}>{slide.content}</p>
                </div>
                <div className="mt-4 p-5 rounded-r-lg border-l-4" style={{ background: '#f6f3ea', borderColor: '#d88a3a' }}>
                  <p className="text-sm" style={{ color: '#5a5140' }}><b style={{ color: '#d88a3a' }}>Note:</b> This concept forms the foundation for the exercises ahead.</p>
                </div>
              </>
            )}
            {slide.type === 'example' && (
              <>
                <div className="text-[13px] font-bold tracking-[0.14em] mb-4" style={{ color: '#d88a3a' }}>{slide.subtitle}</div>
                <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#2a2418' }}>{slide.title}</h2>
                <p className="text-xl mb-6" style={{ color: '#5a5140' }}>{slide.desc}</p>
                <div className="space-y-3">
                  {slide.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: '#ffffff', border: '1px solid rgba(60,45,20,0.12)' }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: '#2d7d6e', color: '#fff' }}>{i + 1}</div>
                      <span style={{ color: '#2a2418' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {slide.type === 'exercise' && (
              <>
                <div className="text-[13px] font-bold tracking-[0.14em] mb-4" style={{ color: '#d88a3a' }}>{slide.subtitle}</div>
                <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#2a2418' }}>{slide.title}</h2>
                <div className="p-6 rounded-lg border-[1.5px] border-dashed" style={{ background: '#fff8ed', borderColor: '#d88a3a' }}>
                  <div className="text-[12px] font-bold tracking-[0.12em] mb-3 uppercase" style={{ color: '#d88a3a' }}>✎ Exercise</div>
                  <p className="text-base" style={{ color: '#5a5140', lineHeight: 1.7 }}>{slide.desc}</p>
                </div>
              </>
            )}
            {slide.type === 'quiz' && (
              <>
                <div className="text-[13px] font-bold tracking-[0.14em] mb-4" style={{ color: '#d88a3a' }}>{slide.subtitle}</div>
                <h2 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#2a2418' }}>{slide.title}</h2>
                <p className="text-lg mb-6" style={{ color: '#2a2418' }}>{slide.question}</p>
                <div className="space-y-3">
                  {slide.options.map((opt, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer ${i === slide.correctIndex ? 'border-[#2d7d6e] bg-[rgba(45,125,110,0.06)]' : 'border-[rgba(60,45,20,0.12)]'}`} style={{ background: i === slide.correctIndex ? undefined : '#ffffff', border: '1px solid' }}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: i === slide.correctIndex ? '#2d7d6e' : 'transparent', border: `2px solid ${i === slide.correctIndex ? '#2d7d6e' : '#8a7f68'}`, color: i === slide.correctIndex ? '#fff' : '#5a5140' }}>{String.fromCharCode(65 + i)}</div>
                      <span style={{ color: '#2a2418' }}>{opt}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {slide.type === 'summary' && (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-[13px] font-bold tracking-[0.14em] mb-4" style={{ color: '#d88a3a' }}>{slide.subtitle}</div>
                <h1 className="text-[88px] font-bold leading-[1.02] mb-6 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", color: '#2a2418' }}>{slide.title}</h1>
                <p className="text-xl mb-8" style={{ color: '#5a5140' }}>{slide.desc}</p>
                <div className="space-y-3">
                  {slide.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xl" style={{ color: '#2d7d6e' }}>●</span>
                      <span className="text-lg" style={{ color: '#2a2418' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-[rgba(60,45,20,0.12)]">
          <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#8a7f68' }}>← → 方向键切换幻灯片</span>
          <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#2d7d6e' }}>{current + 1} / {slides.length}</span>
        </div>
      </div>
    </div>
  )
}
