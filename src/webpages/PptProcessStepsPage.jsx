import { useState } from 'react'

export default function PptProcessStepsPage() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { num: '01', title: '安装依赖', desc: '通过 npm 或 git clone 获取项目文件', detail: 'npm install 或 git clone https://github.com/lewislulu/html-ppt-skill' },
    { num: '02', title: '选择主题', desc: '从 24+ 主题中选择适合的风格', detail: '修改 data-theme 属性或 CSS 变量即可切换主题' },
    { num: '03', title: '配置内容', desc: '编辑 HTML 文件填入你的内容', detail: '支持 Markdown 语法，可自定义布局和动画' },
    { num: '04', title: '预览导出', desc: '在浏览器中预览或导出为 PNG/PDF', detail: '使用 headless Chrome 可批量导出高质量图片' },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Process Steps · 流程步骤</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>快速上手指南</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                onClick={() => setActiveStep(i)}
                className="flex items-start gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  background: activeStep === i ? '#fafafa' : '#ffffff',
                  border: `2px solid ${activeStep === i ? '#0071e3' : '#e5e5e7'}`,
                }}
              >
                <div className="text-4xl font-bold" style={{ color: activeStep === i ? '#0071e3' : '#e5e5e7' }}>{step.num}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1" style={{ color: '#1d1d1f' }}>{step.title}</h3>
                  <p className="text-sm mb-2" style={{ color: '#86868b' }}>{step.desc}</p>
                  {activeStep === i && (
                    <p className="text-sm font-medium" style={{ color: '#0071e3' }}>{step.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Process Steps Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
