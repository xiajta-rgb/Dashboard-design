import { useState } from 'react'
import { AlertCircle, Lightbulb } from 'lucide-react'

export default function PptTwoColumnPage() {
  const [activeSide, setActiveSide] = useState('left')

  const content = {
    left: {
      title: '问题',
      subtitle: 'Problem',
      items: [
        '传统 PPT 制作效率低',
        '风格难以统一',
        '修改维护成本高',
        '协作分享不便',
      ],
      icon: AlertCircle,
      color: '#ff3b30',
    },
    right: {
      title: '解决方案',
      subtitle: 'Solution',
      items: [
        '模板驱动快速生成',
        '主题系统保证一致性',
        'CSS 变量轻松修改',
        '静态文件易于分享',
      ],
      icon: Lightbulb,
      color: '#34c759',
    },
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Two Column · 两列布局</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>问题与解决方案</h2>
          <div className="grid grid-cols-2 gap-8">
            {Object.entries(content).map(([key, side]) => (
              <div
                key={key}
                onClick={() => setActiveSide(key)}
                className="p-8 rounded-2xl cursor-pointer transition-all duration-300"
                style={{
                  background: activeSide === key ? '#fafafa' : '#ffffff',
                  border: `2px solid ${activeSide === key ? side.color : '#e5e5e7'}`,
                }}
              >
                <side.icon size={48} className="mb-4" style={{ color: side.color }} />
                <h3 className="text-2xl font-bold mb-1" style={{ color: side.color }}>{side.title}</h3>
                <p className="text-sm mb-6" style={{ color: '#86868b' }}>{side.subtitle}</p>
                <div className="space-y-4">
                  {side.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: `${side.color}15`, color: side.color }}>
                        {i + 1}
                      </div>
                      <span className="text-base" style={{ color: '#666666' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Two Column Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
