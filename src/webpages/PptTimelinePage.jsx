import { useState } from 'react'

export default function PptTimelinePage() {
  const [activeIndex, setActiveIndex] = useState(2)

  const events = [
    { year: '2025 Q3', title: '起源', desc: '一套个人 reveal.js 模板' },
    { year: '2025 Q4', title: 'tokens 化', desc: '把颜色全部收进 :root' },
    { year: '2026 Q1', title: 'Agent 接入', desc: '开放为 AgentSkill' },
    { year: '2026 Q2', title: '24 themes', desc: '从克制到霓虹一应俱全' },
    { year: '2026 Q3', title: '渲染管线', desc: 'headless Chrome PNG 出稿' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Roadmap · 时间线</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>html-ppt 是怎么长大的</h2>
          <div className="relative" style={{ marginTop: '40px' }}>
            <div className="absolute left-0 right-0 top-[48px] h-0.5" style={{ background: '#e5e5e7' }} />
            <div className="grid grid-cols-5 gap-6">
              {events.map((event, i) => (
                <div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="relative text-center cursor-pointer transition-all duration-300"
                  style={{ paddingTop: '80px' }}
                >
                  <div className="absolute top-0 left-0 right-0 text-sm font-semibold tracking-wider" style={{ color: '#86868b' }}>{event.year}</div>
                  <div
                    className="absolute top-[36px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
                    style={{
                      background: i <= activeIndex ? '#0071e3' : '#e5e5e7',
                      border: '4px solid #ffffff',
                      boxShadow: i <= activeIndex ? '0 0 0 2px #0071e3' : 'none',
                    }}
                  />
                  <h4 className="text-lg font-semibold mb-1" style={{ color: i <= activeIndex ? '#1d1d1f' : '#86868b' }}>{event.title}</h4>
                  <p className="text-sm" style={{ color: '#86868b' }}>{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Timeline Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
