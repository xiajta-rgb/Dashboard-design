import { useState } from 'react'

export default function PptFlowDiagramPage() {
  const [activeStep, setActiveStep] = useState(2)

  const steps = [
    { id: 1, title: '需求收集', desc: '收集用户需求', icon: '▤', color: '#0071e3' },
    { id: 2, title: '方案设计', desc: '设计解决方案', icon: '▣', color: '#34c759' },
    { id: 3, title: '开发实现', desc: '编码实现功能', icon: '⌘', color: '#ff9500' },
    { id: 4, title: '测试验证', desc: '测试验证质量', icon: '◉', color: '#af52de' },
    { id: 5, title: '部署上线', desc: '部署到生产环境', icon: '▲', color: '#ff3b30' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Flow Diagram · 流程图</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>产品开发流程</h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-12 left-0 right-0 h-1" style={{ background: '#e5e5e7' }} />
            <div
              className="absolute top-12 left-0 h-1 transition-all duration-500"
              style={{
                width: `${(activeStep / steps.length) * 100}%`,
                background: 'linear-gradient(90deg, #0071e3, #34c759, #ff9500, #af52de, #ff3b30)',
              }}
            />
            {steps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i + 1)}
                className="relative flex flex-col items-center cursor-pointer transition-all duration-300"
                style={{ zIndex: steps.length - i }}
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 transition-all duration-300"
                  style={{
                    background: i < activeStep ? step.color : '#ffffff',
                    border: `3px solid ${i < activeStep ? step.color : '#e5e5e7'}`,
                    transform: i + 1 === activeStep ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: i + 1 === activeStep ? `0 8px 24px ${step.color}40` : 'none',
                  }}
                >
                  {i < activeStep ? (
                    <span className="text-white text-2xl font-bold">{step.id}</span>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <h4 className="text-base font-bold mb-1" style={{ color: i < activeStep ? step.color : '#1d1d1f' }}>{step.title}</h4>
                <p className="text-xs" style={{ color: '#86868b' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Flow Diagram Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
