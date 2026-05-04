import { useState } from 'react'

export default function PptComparisonPage() {
  const [hoveredSide, setHoveredSide] = useState(null)

  const comparison = {
    left: {
      title: '传统方案',
      subtitle: 'Traditional Approach',
      items: [
        { text: '手动编写 HTML/CSS', icon: '✗', color: '#ff3b30' },
        { text: '重复劳动多', icon: '✗', color: '#ff3b30' },
        { text: '风格不统一', icon: '✗', color: '#ff3b30' },
        { text: '维护成本高', icon: '✗', color: '#ff3b30' },
        { text: '学习曲线陡', icon: '✗', color: '#ff3b30' },
      ],
      color: '#86868b'
    },
    right: {
      title: 'html-ppt 方案',
      subtitle: 'Modern Solution',
      items: [
        { text: '模板驱动生成', icon: '✓', color: '#34c759' },
        { text: '一次配置多用', icon: '✓', color: '#34c759' },
        { text: '风格统一一致', icon: '✓', color: '#34c759' },
        { text: '维护成本低', icon: '✓', color: '#34c759' },
        { text: '开箱即用', icon: '✓', color: '#34c759' },
      ],
      color: '#0071e3'
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Comparison · 对比页</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>方案对比分析</h2>
          <div className="grid grid-cols-2 gap-8">
            <div
              onMouseEnter={() => setHoveredSide('left')}
              className="p-8 rounded-2xl transition-all duration-300"
              style={{
                background: hoveredSide === 'left' ? '#fafafa' : '#ffffff',
                border: `2px solid ${comparison.left.color}`,
              }}
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: comparison.left.color }}>{comparison.left.title}</h3>
              <p className="text-sm mb-6" style={{ color: '#86868b' }}>{comparison.left.subtitle}</p>
              <div className="space-y-4">
                {comparison.left.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${item.color}15`, color: item.color }}>
                      {item.icon}
                    </div>
                    <span className="text-base" style={{ color: '#666666' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              onMouseEnter={() => setHoveredSide('right')}
              className="p-8 rounded-2xl transition-all duration-300"
              style={{
                background: hoveredSide === 'right' ? '#fafafa' : '#ffffff',
                border: `2px solid ${comparison.right.color}`,
              }}
            >
              <h3 className="text-2xl font-bold mb-2" style={{ color: comparison.right.color }}>{comparison.right.title}</h3>
              <p className="text-sm mb-6" style={{ color: '#86868b' }}>{comparison.right.subtitle}</p>
              <div className="space-y-4">
                {comparison.right.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${item.color}15`, color: item.color }}>
                      {item.icon}
                    </div>
                    <span className="text-base font-medium" style={{ color: '#1d1d1f' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Comparison Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
