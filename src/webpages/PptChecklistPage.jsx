import { useState } from 'react'

export default function PptChecklistPage() {
  const [checkedItems, setCheckedItems] = useState([true, true, true, false, false])

  const items = [
    '安装 html-ppt 依赖包',
    '选择并配置主题风格',
    '编辑幻灯片内容',
    '预览演示效果',
    '导出为 PNG/PDF',
  ]

  const toggleItem = (index) => {
    const newChecked = [...checkedItems]
    newChecked[index] = !newChecked[index]
    setCheckedItems(newChecked)
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{ background: '#f5f5f7' }}>
      <div className="relative flex flex-col w-full max-w-4xl" style={{ aspectRatio: '16/9', background: '#ffffff', borderRadius: '0px', overflow: 'hidden', fontFamily: "'Inter', 'Noto Sans SC', sans-serif" }}>
        <div className="flex-1 flex flex-col justify-center px-16 py-12 relative z-10">
          <div className="text-[13px] font-medium tracking-[0.16em] uppercase mb-4" style={{ color: '#86868b' }}>Checklist · 检查清单</div>
          <h2 className="text-[48px] font-bold leading-[1.1] mb-12" style={{ color: '#1d1d1f' }}>发布前检查清单</h2>
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                onClick={() => toggleItem(i)}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: checkedItems[i] ? '#f5f5f7' : '#ffffff',
                  border: `2px solid ${checkedItems[i] ? '#34c759' : '#e5e5e7'}`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: checkedItems[i] ? '#34c759' : '#ffffff',
                    border: `2px solid ${checkedItems[i] ? '#34c759' : '#e5e5e7'}`,
                  }}
                >
                  {checkedItems[i] && <span className="text-white text-lg">✓</span>}
                </div>
                <span className="text-xl" style={{ color: checkedItems[i] ? '#34c759' : '#1d1d1f', textDecoration: checkedItems[i] ? 'line-through' : 'none' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between p-4 rounded-lg" style={{ background: '#fafafa' }}>
            <span className="text-sm" style={{ color: '#86868b' }}>完成进度</span>
            <span className="text-lg font-bold" style={{ color: checkedItems.every(Boolean) ? '#34c759' : '#0071e3' }}>
              {checkedItems.filter(Boolean).length}/{items.length}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-t border-slate-100">
          <span className="text-xs" style={{ color: '#999999' }}>Checklist Layout</span>
          <span className="text-xs font-bold" style={{ color: '#86868b' }}>1/1</span>
        </div>
      </div>
    </div>
  )
}
